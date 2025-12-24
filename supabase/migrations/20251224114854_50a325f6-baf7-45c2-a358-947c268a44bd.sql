-- Drop the restrictive policy
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.design_feedback;

-- Create a permissive policy for inserts
CREATE POLICY "Anyone can submit feedback" 
ON public.design_feedback 
FOR INSERT 
TO public
WITH CHECK (true);