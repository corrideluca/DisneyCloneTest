-- Table to store movie/series information
CREATE TABLE IF NOT EXISTS movies_series (
  item_id INTEGER PRIMARY KEY,
  poster_path TEXT,
  type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table to store user's "My List"
CREATE TABLE IF NOT EXISTS mylist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES movies_series(item_id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_id)
);

-- Enable Row Level Security
ALTER TABLE movies_series ENABLE ROW LEVEL SECURITY;
ALTER TABLE mylist ENABLE ROW LEVEL SECURITY;

-- Policies for movies_series (allow all authenticated users to read and insert)
CREATE POLICY "Allow authenticated users to read movies_series"
  ON movies_series FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert movies_series"
  ON movies_series FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for mylist (users can only manage their own list)
CREATE POLICY "Users can view their own list"
  ON mylist FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert to their own list"
  ON mylist FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own list"
  ON mylist FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
