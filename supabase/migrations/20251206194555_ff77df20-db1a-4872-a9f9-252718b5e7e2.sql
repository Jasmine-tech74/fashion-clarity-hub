-- Add name column to waitlist_signups table
ALTER TABLE public.waitlist_signups
ADD COLUMN name text;