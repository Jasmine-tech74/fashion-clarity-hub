-- Create waitlist signups table
CREATE TABLE public.waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  referral_code text UNIQUE DEFAULT substring(md5(random()::text) from 1 for 8),
  referred_by uuid REFERENCES public.waitlist_signups(id),
  referral_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create index for faster lookups
CREATE INDEX idx_waitlist_email ON public.waitlist_signups(email);
CREATE INDEX idx_waitlist_referral_code ON public.waitlist_signups(referral_code);
CREATE INDEX idx_waitlist_created_at ON public.waitlist_signups(created_at DESC);

-- Enable RLS
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Allow public to insert their own signups
CREATE POLICY "Anyone can sign up for waitlist"
  ON public.waitlist_signups
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public to read waitlist count (for social proof)
CREATE POLICY "Anyone can view signup count"
  ON public.waitlist_signups
  FOR SELECT
  TO public
  USING (true);

-- Function to increment referral count
CREATE OR REPLACE FUNCTION increment_referral_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referred_by IS NOT NULL THEN
    UPDATE public.waitlist_signups
    SET referral_count = referral_count + 1
    WHERE id = NEW.referred_by;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically increment referral count
CREATE TRIGGER on_waitlist_signup_with_referral
  AFTER INSERT ON public.waitlist_signups
  FOR EACH ROW
  EXECUTE FUNCTION increment_referral_count();