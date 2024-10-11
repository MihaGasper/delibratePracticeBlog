CREATE DATABASE blog_db;

\c blog_db

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO posts (title, excerpt, content) VALUES
('The Power of Deliberate Practice', 'Discover how deliberate practice can accelerate your learning and skill development.', 'Deliberate practice is a highly structured activity engaged in with the specific goal of improving performance. It is different from mere repetition or mindless practice. Instead, it involves focused attention and is conducted with the specific goal of improving performance. When you engage in deliberate practice, you identify the skills you want to improve, and then work on them with full concentration and effort. This often involves breaking down complex skills into smaller, manageable parts and working on them individually. Over time, this approach leads to significant improvements in performance and mastery of skills.'),
('Deliberate Practice in Music', 'Learn how musicians use deliberate practice to master their instruments and compositions.', 'In the world of music, deliberate practice is a cornerstone of mastery. Musicians don''t simply play their instruments for hours on end; they engage in focused, purposeful practice sessions. This might involve working on a difficult passage repeatedly, slowly increasing the tempo as they improve. It could also mean practicing scales with different rhythms or articulations to improve technique. Deliberate practice in music often involves recording oneself and critically listening to the playback, identifying areas for improvement. By breaking down complex pieces into manageable sections and focusing intently on each part, musicians can make rapid progress and achieve high levels of skill.'),
('Applying Deliberate Practice in Your Career', 'Explore how you can use deliberate practice principles to advance in your professional life.', 'The principles of deliberate practice can be powerfully applied to career development. Instead of simply going through the motions at work, deliberate practice involves setting specific goals for improvement and working systematically towards them. This might involve seeking out challenging projects that push you out of your comfort zone, or dedicating time each week to learning new skills relevant to your field. It could also mean asking for regular feedback from colleagues or mentors and using that feedback to focus your efforts. By approaching your work with the mindset of deliberate practice - setting clear goals, focusing intently, seeking feedback, and continuously pushing your boundaries - you can accelerate your professional growth and achieve higher levels of performance in your career.');

-- Create an admin user (password is 'admin123' - remember to change this in a real application!)
INSERT INTO users (email, password) VALUES ('admin@example.com', '$2b$10$rQnXF0Yt3Ld8Uu3ZLlVlxONGcGrFEXm.eBzZOtZpqJzO3EB4JKqCe');