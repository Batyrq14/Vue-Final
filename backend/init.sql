-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample event data
INSERT INTO events (title, date, description, location) VALUES
('Welcome Week Kickoff', '2025-01-15 18:00:00', 'Join us for the official start of Welcome Week! Meet new students, enjoy free food, and learn about campus resources.', 'Student Union Building'),
('Tech Talk: AI in Education', '2025-01-20 14:00:00', 'Guest speaker from Google will discuss the future of AI in educational technology. Q&A session included.', 'Engineering Hall Room 301'),
('Campus Job Fair', '2025-01-25 10:00:00', 'Meet with over 50 employers looking to hire students for internships and full-time positions.', 'Recreation Center'),
('Movie Night: Inception', '2025-01-28 20:00:00', 'Free movie screening under the stars! Bring your blankets and friends for a classic film experience.', 'Central Quad'),
('Hackathon 2025', '2025-02-01 09:00:00', '24-hour coding competition with prizes up to $5,000. Teams of 2-4 students. Registration required.', 'Computer Science Building'),
('Spring Concert Series', '2025-02-10 19:00:00', 'Live performances by student bands and local artists. Free admission with student ID.', 'Campus Amphitheater'),
('Career Workshop: Resume Building', '2025-02-15 16:00:00', 'Learn how to craft a compelling resume that gets noticed by recruiters. Bring your laptop!', 'Career Services Center'),
('International Food Festival', '2025-02-20 12:00:00', 'Taste cuisines from around the world prepared by our diverse student community.', 'Dining Hall Plaza'),
('Guest Lecture: Climate Change', '2025-02-25 15:00:00', 'Renowned climate scientist Dr. Sarah Johnson discusses urgent environmental challenges.', 'Science Auditorium'),
('Spring Break Volunteer Day', '2025-03-05 08:00:00', 'Give back to the community! Help with local park cleanup and community garden projects.', 'Community Center'),
('Gaming Tournament', '2025-03-12 13:00:00', 'Compete in League of Legends, Valorant, and Super Smash Bros. Prizes for top 3 teams!', 'Student Gaming Lounge'),
('Study Abroad Info Session', '2025-03-18 17:00:00', 'Explore opportunities to study in Europe, Asia, and South America. Financial aid available.', 'International Programs Office');
