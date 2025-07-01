-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
('Action', 'action', 'High-octane movies and series with thrilling sequences'),
('Drama', 'drama', 'Compelling stories with emotional depth'),
('Comedy', 'comedy', 'Light-hearted entertainment to make you laugh'),
('Sci-Fi', 'sci-fi', 'Science fiction adventures and futuristic tales'),
('Horror', 'horror', 'Spine-chilling movies and series'),
('Romance', 'romance', 'Love stories and romantic comedies'),
('Thriller', 'thriller', 'Suspenseful and edge-of-your-seat entertainment'),
('Documentary', 'documentary', 'Real-life stories and educational content'),
('Animation', 'animation', 'Animated movies and series for all ages'),
('Crime', 'crime', 'Crime dramas and detective stories')
ON CONFLICT (slug) DO NOTHING;

-- Insert admin user (password: admin123)
INSERT INTO users (email, password_hash, full_name, role) VALUES
('admin@streamflix.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqO', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample movies
INSERT INTO movies (
    title, slug, description, poster_url, backdrop_url, trailer_url,
    duration, release_year, rating, genre, director, cast, status, is_featured
) VALUES
(
    'Quantum Realm',
    'quantum-realm',
    'In a dystopian future where technology and humanity collide, a group of rebels fights against corporate control in this thrilling sci-fi adventure.',
    '/placeholder.svg?height=450&width=300',
    '/placeholder.svg?height=600&width=1200',
    'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    135, 2024, 8.9, 'Sci-Fi Action', 'John Director',
    ARRAY['Actor One', 'Actor Two', 'Actor Three'],
    'published', true
),
(
    'Shadow Hunter',
    'shadow-hunter',
    'A skilled assassin must protect a young witness while being hunted by his former organization.',
    '/placeholder.svg?height=450&width=300',
    '/placeholder.svg?height=600&width=1200',
    'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    118, 2024, 8.7, 'Action Thriller', 'Jane Director',
    ARRAY['Action Star', 'Supporting Actor', 'Villain Actor'],
    'published', false
),
(
    'Digital Dreams',
    'digital-dreams',
    'A programmer discovers a virtual world that begins to merge with reality.',
    '/placeholder.svg?height=450&width=300',
    '/placeholder.svg?height=600&width=1200',
    'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    125, 2024, 8.5, 'Sci-Fi Drama', 'Tech Director',
    ARRAY['Lead Actor', 'Tech Actress', 'Mentor Actor'],
    'published', false
)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample series
INSERT INTO series (
    title, slug, description, poster_url, backdrop_url, trailer_url,
    release_year, rating, genre, creator, cast, status, is_featured, total_seasons
) VALUES
(
    'Cyber Chronicles',
    'cyber-chronicles',
    'A cyberpunk series following hackers in a dystopian future city.',
    '/placeholder.svg?height=450&width=300',
    '/placeholder.svg?height=600&width=1200',
    'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    2024, 9.1, 'Sci-Fi Drama', 'Series Creator',
    ARRAY['Series Lead', 'Supporting Cast', 'Antagonist'],
    'published', true, 2
),
(
    'Mystery Island',
    'mystery-island',
    'Survivors on a mysterious island discover dark secrets.',
    '/placeholder.svg?height=450&width=300',
    '/placeholder.svg?height=600&width=1200',
    'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    2024, 8.8, 'Mystery Thriller', 'Mystery Creator',
    ARRAY['Island Survivor', 'Mysterious Character', 'Leader'],
    'published', false, 1
)
ON CONFLICT (slug) DO NOTHING;
