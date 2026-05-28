/*
  # Add Open When Letters, Love Cards, and Todo List Sections

  ## Summary
  Adds three new interactive sections to apology pages:
  - "Open When" letters: 4 customizable sealed letters with trigger and message
  - "What I Love About You": flip cards with front/back text
  - "Promise Todo List": action items the sender promises to change

  ## New Columns on `apology_pages`
  - `open_when_letters` (jsonb) - array of {trigger, message} objects (up to 4)
  - `love_cards` (jsonb) - array of {front, back} objects for flip cards
  - `promise_todos` (jsonb) - array of {text, done} objects
  - `show_open_when` (boolean) - toggle for open when section
  - `show_love_cards` (boolean) - toggle for love cards section
  - `show_promise_todos` (boolean) - toggle for promise todo section

  ## Security
  - No RLS policy changes needed (policies already allow public read/insert/update)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'apology_pages' AND column_name = 'open_when_letters'
  ) THEN
    ALTER TABLE apology_pages ADD COLUMN open_when_letters jsonb DEFAULT '[{"trigger":"you feel alone","message":""},{"trigger":"you miss me","message":""},{"trigger":"you are sad","message":""},{"trigger":"you need a reminder","message":""}]'::jsonb;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'apology_pages' AND column_name = 'love_cards'
  ) THEN
    ALTER TABLE apology_pages ADD COLUMN love_cards jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'apology_pages' AND column_name = 'promise_todos'
  ) THEN
    ALTER TABLE apology_pages ADD COLUMN promise_todos jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'apology_pages' AND column_name = 'show_open_when'
  ) THEN
    ALTER TABLE apology_pages ADD COLUMN show_open_when boolean DEFAULT false;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'apology_pages' AND column_name = 'show_love_cards'
  ) THEN
    ALTER TABLE apology_pages ADD COLUMN show_love_cards boolean DEFAULT false;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'apology_pages' AND column_name = 'show_promise_todos'
  ) THEN
    ALTER TABLE apology_pages ADD COLUMN show_promise_todos boolean DEFAULT false;
  END IF;
END $$;
