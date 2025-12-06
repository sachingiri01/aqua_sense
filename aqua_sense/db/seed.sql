-- db/seed.sql
-- Seed data: reuse_targets (idempotent - uses ON CONFLICT DO NOTHING if primary key exists)

INSERT INTO reuse_targets (reuse_type, ph_min, ph_max, turbidity_max, tds_max, do_min, temp_max)
VALUES
    ('irrigation', 6.5, 8.5, 5, 2000, 2, 35),
    ('cooling', 6.5, 8.5, 2, 1500, 4, 30),
    ('flushing', 6.0, 8.5, 10, 2500, 1, 40),
    ('discharge', 6.5, 9.0, 10, 2100, 3, 40)
ON CONFLICT (reuse_type) DO NOTHING;
