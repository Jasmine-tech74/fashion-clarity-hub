-- Add user_type column to waitlist_signups table
ALTER TABLE public.waitlist_signups
ADD COLUMN user_type text DEFAULT 'client';