// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gkkwipkvezpnkodadlgd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdra3dpcGt2ZXpwbmtvZGFkbGdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMDkzMTYsImV4cCI6MjA1OTU4NTMxNn0.KwDHLnDVB5qhU34Bwq4KiHybKZW0FJaXuRDX-D-mZUE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);