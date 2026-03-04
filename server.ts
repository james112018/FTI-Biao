import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("database.sqlite");

// Initialize Database Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    slug TEXT UNIQUE,
    content TEXT,
    excerpt TEXT,
    featured_image TEXT,
    author TEXT,
    category TEXT,
    status TEXT DEFAULT 'draft',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sermons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    speaker TEXT,
    date TEXT,
    scripture TEXT,
    series TEXT,
    video_url TEXT,
    audio_url TEXT,
    notes TEXT,
    thumbnail TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    date TEXT,
    time TEXT,
    location TEXT,
    description TEXT,
    featured_image TEXT,
    status TEXT DEFAULT 'upcoming',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS ministries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    schedule TEXT,
    leader TEXT,
    icon TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS testimonies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    content TEXT,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT, -- 'contact', 'visitor', 'prayer', 'registration'
    data TEXT, -- JSON string
    status TEXT DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS donations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    donor_name TEXT,
    email TEXT,
    amount REAL,
    category TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed initial data if empty
const settingsCount = db.prepare("SELECT count(*) as count FROM settings").get() as { count: number };
if (settingsCount.count === 0) {
  const stmt = db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)");
  stmt.run("site_name", "Faith Tabernacle Inc. (Biao)");
  stmt.run("primary_color", "#1e3a8a");
  stmt.run("accent_color", "#d4af37");
  stmt.run("tagline", "Rooted in Faith. Growing in Love. Reaching the World.");
  stmt.run("address", "Biao, Community Center, City, State");
  stmt.run("phone", "+1 (555) 123-4567");
  stmt.run("email", "info@faithtabernaclebiao.org");
  stmt.run("facebook_url", "https://www.facebook.com/FTIBiaoChurch");

  // Seed some posts
  const postStmt = db.prepare("INSERT INTO posts (title, slug, content, excerpt, featured_image, author, category, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  postStmt.run("Finding Peace in the Midst of the Storm", "finding-peace-in-storm", "Life often brings unexpected challenges...", "Discover how to anchor your soul in God's promises.", "https://picsum.photos/seed/peace/800/600", "Pastor Samuel Adeyemi", "Devotionals", "published");
  postStmt.run("The Power of Community", "power-of-community", "God never intended for us to walk alone...", "Exploring the biblical foundation for church community.", "https://picsum.photos/seed/community/800/600", "Sister Grace Mensah", "Church Life", "published");

  // Seed some sermons
  const sermonStmt = db.prepare("INSERT INTO sermons (title, speaker, date, scripture, series, video_url, thumbnail) VALUES (?, ?, ?, ?, ?, ?, ?)");
  sermonStmt.run("Walking by Faith, Not by Sight", "Pastor Samuel Adeyemi", "2024-02-25", "2 Corinthians 5:7", "Faith Foundations", "https://www.youtube.com/embed/dQw4w9WgXcQ", "https://picsum.photos/seed/sermon1/800/450");
  sermonStmt.run("The Power of Persistent Prayer", "Pastor Samuel Adeyemi", "2024-02-18", "Luke 18:1-8", "Prayer Life", "https://www.youtube.com/embed/dQw4w9WgXcQ", "https://picsum.photos/seed/sermon2/800/450");

  // Seed some events
  const eventStmt = db.prepare("INSERT INTO events (title, date, time, location, description, featured_image) VALUES (?, ?, ?, ?, ?, ?)");
  eventStmt.run("Annual Women's Conference", "2024-03-15", "09:00 AM", "Main Sanctuary", "Join us for a weekend of empowerment and worship.", "https://picsum.photos/seed/women/800/600");
  eventStmt.run("Youth Revival Weekend", "2024-04-05", "06:00 PM", "Youth Center", "A high-energy weekend for teens and young adults.", "https://picsum.photos/seed/youth/800/600");

  // Seed some ministries
  const minStmt = db.prepare("INSERT INTO ministries (name, description, schedule, leader, icon) VALUES (?, ?, ?, ?, ?)");
  minStmt.run("Children's Ministry", "Nurturing young hearts with Bible stories.", "Sundays at 9:00 AM", "Sister Mary Johnson", "Baby");
  minStmt.run("Youth Ministry", "Empowering the next generation.", "Fridays at 6:30 PM", "Brother David Smith", "Users");
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  app.get("/api/settings", (req, res) => {
    const settings = db.prepare("SELECT * FROM settings").all();
    const settingsMap = settings.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settingsMap);
  });

  app.get("/api/posts", (req, res) => {
    const posts = db.prepare("SELECT * FROM posts ORDER BY created_at DESC").all();
    res.json(posts);
  });

  app.get("/api/sermons", (req, res) => {
    const sermons = db.prepare("SELECT * FROM sermons ORDER BY date DESC").all();
    res.json(sermons);
  });

  app.get("/api/events", (req, res) => {
    const events = db.prepare("SELECT * FROM events ORDER BY date ASC").all();
    res.json(events);
  });

  app.get("/api/ministries", (req, res) => {
    const ministries = db.prepare("SELECT * FROM ministries").all();
    res.json(ministries);
  });

  app.get("/api/testimonies", (req, res) => {
    const testimonies = db.prepare("SELECT * FROM testimonies").all();
    res.json(testimonies);
  });

  app.get("/api/submissions", (req, res) => {
    const submissions = db.prepare("SELECT * FROM submissions ORDER BY created_at DESC").all();
    res.json(submissions);
  });

  app.get("/api/donations", (req, res) => {
    const donations = db.prepare("SELECT * FROM donations ORDER BY date DESC").all();
    res.json(donations);
  });

  app.post("/api/submissions", (req, res) => {
    const { type, data } = req.body;
    const stmt = db.prepare("INSERT INTO submissions (type, data) VALUES (?, ?)");
    stmt.run(type, JSON.stringify(data));
    res.json({ success: true });
  });

  app.post("/api/donations", (req, res) => {
    const { donor_name, email, amount, category } = req.body;
    const stmt = db.prepare("INSERT INTO donations (donor_name, email, amount, category) VALUES (?, ?, ?, ?)");
    stmt.run(donor_name, email, amount, category);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
