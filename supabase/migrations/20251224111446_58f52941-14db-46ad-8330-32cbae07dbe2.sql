-- Create design_feedback table for MVP validation
CREATE TABLE public.design_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  gender TEXT,
  outfit_type TEXT,
  fabric_type TEXT,
  fit_style TEXT,
  description TEXT,
  matched_mockup TEXT,
  matches_expectation BOOLEAN,
  additional_feedback TEXT
);

-- Enable Row Level Security
ALTER TABLE public.design_feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert feedback (public form, no auth required)
CREATE POLICY "Anyone can submit feedback"
ON public.design_feedback
FOR INSERT
WITH CHECK (true);

-- Only admins can view feedback
CREATE POLICY "Admins can view all feedback"
ON public.design_feedback
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));