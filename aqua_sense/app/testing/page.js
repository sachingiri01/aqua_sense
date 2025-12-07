"use client";
import { useEffect, useState } from "react";
import ClientAuth from "../../components/auth/ClientAuth";

export default function PrimarySensorStream() {
  const [data, setData] = useState(null);
  const [streaming, setStreaming] = useState(false); 
  const [stream, setStream] = useState(null);

  useEffect(() => {
    if (!streaming) {
     
      if (stream) {
        stream.close();
        console.log("SSE Closed ❌");
      }
      return; 
    }

    console.log("Opening SSE Connection 🔥");
    const es = new EventSource(process.env.NEXT_PUBLIC_PRIMARY_SENSOR);

    es.onmessage = (event) => {
      if (!event.data) return;
      try {
        setData(JSON.parse(event.data));
      } catch (e) {
        console.error("Parse error", e);
      }
    };

    es.onerror = (err) => {
      console.error("SSE Error", err);
    };

    setStream(es);

   
    return () => {
      es.close();
      console.log("SSE Closed on unmount");
    };

  }, [streaming]);

  return (
    <ClientAuth>
    <div>
      <h1>Primary Sensor Live Data</h1>

      <button
        onClick={() => setStreaming(!streaming)}
        style={{ padding: "10px", background: "skyblue" }}
      >
        {streaming ? "Stop Stream ❌" : "Start Stream 🔥"}
      </button>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
    </ClientAuth>
  );
}
