# arduino_stream_api.py
import serial
import time
import ast
import json
import threading
from typing import Dict, Any, List

from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from datetime import datetime, timezone  # NEW

SERIAL_PORT = "/dev/ttyACM0"
BAUDRATE = 9600

app = FastAPI()

latest_data: Dict[str, Any] = {}
history: List[Dict[str, Any]] = []
MAX_HISTORY = 1000


def parse_line(line: str):
    """
    Parse a line that contains: data:{'key': 123, 'val': None}
    into a Python dict.
    """
    if "data:" not in line:
        return None

    payload = line.split("data:", 1)[1].strip()
    payload = payload.replace("null", "None")

    try:
        d = ast.literal_eval(payload)
        if isinstance(d, dict):
            return d
    except Exception:
        try:
            payload_json = payload.replace("None", "null").replace("'", '"')
            return json.loads(payload_json)
        except Exception:
            return None


def normalize_timestamp(data: Dict[str, Any]) -> None:
    """
    Ensure data['timestamp'] is in the format:
      YYYY-MM-DDTHH:MM:SS.microseconds+00:00

    If parsing fails or timestamp is missing, use current UTC time.
    """
    raw_ts = data.get("timestamp")

    dt = None
    if isinstance(raw_ts, str):
        # try to parse as ISO-8601; if it fails, fallback to now
        try:
            dt = datetime.fromisoformat(raw_ts)
        except Exception:
            dt = None

    if dt is None:
        # fallback: use current UTC time
        dt = datetime.now(timezone.utc)

    # force UTC and format with microseconds
    dt = dt.astimezone(timezone.utc)
    data["timestamp"] = dt.isoformat(timespec="microseconds")  # e.g. 2025-12-06T13:53:40.671467+00:00


def serial_reader_loop():
    """
    Background thread: continuously reads serial and updates latest_data & history.
    """
    global latest_data, history

    while True:
        try:
            ser = serial.Serial(SERIAL_PORT, BAUDRATE, timeout=2)
            time.sleep(1)
            print(f"Opened serial port {SERIAL_PORT} at {BAUDRATE}")
        except Exception as e:
            print("Serial open error:", e)
            time.sleep(5)
            continue

        while True:
            try:
                raw = ser.readline().decode(errors="replace").strip()
                if not raw:
                    continue

                print("RAW:", raw)
                data = parse_line(raw)

                if data:
                    # Ensure DO_mg_L always exists
                    if "DO_mg_L" not in data or data["DO_mg_L"] is None:
                        data["DO_mg_L"] = 5  # default value

                    # Normalize timestamp format
                    normalize_timestamp(data)

                    latest_data = data
                    history.append(data)

                    if len(history) > MAX_HISTORY:
                        history = history[-MAX_HISTORY:]

            except Exception as e:
                print("Serial read error:", e)
                try:
                    ser.close()
                except Exception:
                    pass
                time.sleep(2)
                break


@app.on_event("startup")
def on_startup():
    t = threading.Thread(target=serial_reader_loop, daemon=True)
    t.start()
    print("Serial reader thread started")


@app.get("/initial_real_sensors/data")
def get_data():
    return {
        "latest": latest_data,
        "history": history,
        "count": len(history),
    }


def sse_generator():
    while True:
        if latest_data:
            payload = str(latest_data)  # python dict style output
            yield f"data: {payload}\n\n"
        time.sleep(1)


@app.get("/initial_real_sensors/stream")
def stream_data():
    return StreamingResponse(
        sse_generator(),
        media_type="text/event-stream",
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("arduino_stream_api:app", host="0.0.0.0", port=8000, reload=True)
