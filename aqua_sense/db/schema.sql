-- db/schema.sql
-- FULL DB SCHEMA FOR aqua_sense (Neon Postgres)
-- Run via setupDatabase.js or psql

-- Enable UUID extension (pgcrypto for gen_random_uuid)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS "User" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  image TEXT,
  bio TEXT,
  role TEXT CHECK (role IN ('staff', 'admin')) DEFAULT 'staff'
);
---------------------------------------------------------
-- 1) batches table
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS batches (
    batch_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    initial_ph DOUBLE PRECISION,
    initial_turbidity DOUBLE PRECISION,
    initial_tds DOUBLE PRECISION,
    initial_do DOUBLE PRECISION,
    initial_temperature DOUBLE PRECISION,
    initial_conductivity DOUBLE PRECISION,

    intended_reuse TEXT,
    ai_predicted_reuse TEXT,
    required_stages TEXT[],

    current_stage TEXT,
    status TEXT CHECK (status IN ('PROCESSING','HOLDING','COMPLETED','FAILED')),
    final_result TEXT CHECK (final_result IN ('SUITABLE','NOT_SUITABLE')),
    final_report_url TEXT
);

---------------------------------------------------------
-- 2) primary_stage_readings
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS primary_stage_readings (
    id BIGSERIAL PRIMARY KEY,
    batch_id UUID REFERENCES batches(batch_id) ON DELETE CASCADE,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "window" TEXT CHECK ("window" IN ('normal','abnormal')),
    flow DOUBLE PRECISION,
    level DOUBLE PRECISION,
    turbidity DOUBLE PRECISION,
    pressure DOUBLE PRECISION,
    temperature DOUBLE PRECISION,
    raw_json JSONB
);

---------------------------------------------------------
-- 3) secondary_stage_readings
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS secondary_stage_readings (
    id BIGSERIAL PRIMARY KEY,
    batch_id UUID REFERENCES batches(batch_id) ON DELETE CASCADE,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "window" TEXT CHECK ("window" IN ('normal','abnormal')),
    "do" DOUBLE PRECISION,
    ph DOUBLE PRECISION,
    orp DOUBLE PRECISION,
    tss_mlss DOUBLE PRECISION,
    ammonia DOUBLE PRECISION,
    sludge_level DOUBLE PRECISION,
    secondary_flow DOUBLE PRECISION,
    raw_json JSONB
);

---------------------------------------------------------
-- 4) tertiary_stage_readings
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS tertiary_stage_readings (
    id BIGSERIAL PRIMARY KEY,
    batch_id UUID REFERENCES batches(batch_id) ON DELETE CASCADE,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "window" TEXT CHECK ("window" IN ('normal','abnormal')),
    conductivity DOUBLE PRECISION,
    tds DOUBLE PRECISION,
    nitrate DOUBLE PRECISION,
    residual_chlorine DOUBLE PRECISION,
    turbidity_final DOUBLE PRECISION,
    differential_pressure DOUBLE PRECISION,
    salinity DOUBLE PRECISION,
    oil_in_water DOUBLE PRECISION,
    uvt DOUBLE PRECISION,
    raw_json JSONB
);

---------------------------------------------------------
-- 5) final_stage_readings
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS final_stage_readings (
    id BIGSERIAL PRIMARY KEY,
    batch_id UUID REFERENCES batches(batch_id) ON DELETE CASCADE,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    final_ph DOUBLE PRECISION,
    final_turbidity DOUBLE PRECISION,
    final_tds DOUBLE PRECISION,
    final_do DOUBLE PRECISION,
    final_temperature DOUBLE PRECISION,
    final_conductivity DOUBLE PRECISION,
    ai_final_label TEXT,
    raw_json JSONB
);

---------------------------------------------------------
-- 6) reuse_targets (STATIC TABLE)
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS reuse_targets (
    reuse_type TEXT PRIMARY KEY,
    ph_min DOUBLE PRECISION,
    ph_max DOUBLE PRECISION,
    turbidity_max DOUBLE PRECISION,
    tds_max DOUBLE PRECISION,
    do_min DOUBLE PRECISION,
    temp_max DOUBLE PRECISION
);

---------------------------------------------------------
-- 7) hold_events
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS hold_events (
    hold_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID REFERENCES batches(batch_id) ON DELETE CASCADE,
    stage_name TEXT CHECK (stage_name IN ('PRIMARY','SECONDARY','TERTIARY')),
    reason TEXT,
    start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    end_time TIMESTAMPTZ,
    corrective_action TEXT
);

---------------------------------------------------------
-- Indexes
---------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_primary_batch ON primary_stage_readings(batch_id);
CREATE INDEX IF NOT EXISTS idx_secondary_batch ON secondary_stage_readings(batch_id);
CREATE INDEX IF NOT EXISTS idx_tertiary_batch ON tertiary_stage_readings(batch_id);
CREATE INDEX IF NOT EXISTS idx_final_batch ON final_stage_readings(batch_id);
CREATE INDEX IF NOT EXISTS idx_hold_batch ON hold_events(batch_id);
