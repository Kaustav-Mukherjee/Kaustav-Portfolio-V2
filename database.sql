-- 1. Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    n TEXT NOT NULL,         -- Name
    t TEXT,                  -- Subtitle/Title
    summary TEXT,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    cat TEXT REFERENCES categories(id),
    type TEXT,               -- Subtitle/Type
    t TEXT NOT NULL,         -- Title
    d TEXT,                  -- Description
    tags TEXT[],
    img TEXT,
    live TEXT,
    git TEXT,
    raw_files TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Certifications Table
CREATE TABLE IF NOT EXISTS certifications (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,              -- Certificate name
    type TEXT,                       -- Category (e.g. "Professional Certificate")
    date TEXT,                       -- Display date (e.g. "OCT 12, 2023")
    img TEXT,                        -- Hover preview image URL
    certificate_image_url TEXT,      -- Actual certificate image/PDF URL
    verify_url TEXT,                 -- External verification link
    sort_order INT DEFAULT 0,        -- Controls display order
    is_visible BOOLEAN DEFAULT true, -- Toggle visibility
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
CREATE POLICY "Allow public read-only access" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read visible certifications" ON certifications FOR SELECT USING (is_visible = true);

-- 6. Seed Certifications Data
INSERT INTO certifications (name, type, date, img, sort_order) VALUES
    ('Google Data Analytics', 'Professional Certificate', 'OCT 12, 2023', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop', 1),
    ('Advanced SQL in PostgreSQL', 'Coursera Program', 'NOV 05, 2023', 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=600&auto=format&fit=crop', 2),
    ('Data Visualization with Tableau', 'Specialization', 'JAN 18, 2024', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop', 3);
