-- Drop the restrictive SELECT policy
DROP POLICY IF EXISTS "Admins can view all feedback" ON public.design_feedback;

-- Create a permissive SELECT policy for admins
CREATE POLICY "Admins can view all feedback" 
ON public.design_feedback 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));