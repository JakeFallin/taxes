-- Fix User Profile Script
-- Run this in your Supabase SQL Editor if you need to manually create a user profile

-- First, let's see what users exist in auth.users
SELECT id, email, created_at FROM auth.users;

-- If you need to create a user profile manually, replace 'your-user-id-here' with the actual user ID
-- and 'your-email@example.com' with the actual email

-- INSERT INTO public."user" (user_id, email, account_created_ts)
-- VALUES ('your-user-id-here', 'your-email@example.com', NOW());

-- To find your user ID, you can check the browser console when logged in
-- or run this query to see all auth users:
-- SELECT * FROM auth.users;

-- Example (uncomment and modify):
-- INSERT INTO public."user" (user_id, email, account_created_ts)
-- VALUES ('12345678-1234-1234-1234-123456789abc', 'test@example.com', NOW());
