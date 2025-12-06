
const uint8_t PIN_TURB = A0;
const uint8_t PIN_TDS  = A1;
const uint8_t PIN_PH   = A2;

const float VREF = 5.0;
const float ADCMAX = 1023.0;

// Calibration constants
float phSlope  = -3.0;
float phOffset = 14.0;

float tdsFactor = 500.0;     // ppm per Volt
float turbA = -100.0;        // NTU = a*V + b
float turbB = 400.0;

// Helper to read analog pin
float readVolt(uint8_t pin) {
  long s = 0;
  for (int i = 0; i < 4; i++) {
    s += analogRead(pin);
    delay(10);
  }
  return (s / 4.0) * (VREF / ADCMAX);
}

void setup() {
  Serial.begin(9600);
}

void loop() {

  float vTurb = readVolt(PIN_TURB);
  float vTDS  = readVolt(PIN_TDS);
  float vPH   = readVolt(PIN_PH);

  float turbNTU = turbA * vTurb + turbB;
  if (turbNTU < 0.0) turbNTU = 0.0;

  float tdsPPM  = tdsFactor * vTDS;
  float phValue = phSlope * vPH + phOffset;

  float conductivity = (tdsPPM - 55.0) / 0.65;

  float DOmgL = 3.2;    // placeholder

  unsigned long ms = millis();
  char ts[24];
  sprintf(ts, "%lu.%03lu+00:00", ms/1000, ms%1000);

  Serial.print("data: {'node_id': 'virtual-node-01', ");
  Serial.print("'timestamp': '"); Serial.print(ts); Serial.print("', ");
  Serial.print("'pH': "); Serial.print(phValue, 3); Serial.print(", ");
  Serial.print("'turbidity_NTU': "); Serial.print(turbNTU, 3); Serial.print(", ");


  Serial.print("'temperature_C': ");
  Serial.print(28.000, 3);
  Serial.print(", ");

  Serial.print("'DO_mg_L': "); Serial.print(DOmgL, 3); Serial.print(", ");
  Serial.print("'conductivity_uS_cm': "); Serial.print(conductivity, 3); Serial.print(", ");
  Serial.print("'TDS_mg_L': "); Serial.print(tdsPPM, 3); Serial.print(", ");
  Serial.print("'interval_s': 1.0");
  Serial.println("}");

  delay(1000);
}