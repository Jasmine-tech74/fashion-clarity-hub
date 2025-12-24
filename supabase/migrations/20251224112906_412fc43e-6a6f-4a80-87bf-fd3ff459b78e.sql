-- Drop the restrictive policy and recreate as permissive
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.design_feedback;

CREATE POLICY "Anyone can submit feedback"
ON public.design_feedback
FOR INSERT
TO public
WITH CHECK (true);