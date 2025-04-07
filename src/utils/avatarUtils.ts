
import { supabase } from "@/integrations/supabase/client";

export const checkAvatarLimit = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from("avatars")
      .select("id")
      .eq("user_id", userId);
      
    if (error) {
      console.error("Error checking avatar limit:", error);
      return false;
    }
    
    // Return true if user has less than 2 avatars
    return data.length < 2;
  } catch (error) {
    console.error("Error checking avatar limit:", error);
    return false;
  }
};

export const saveAvatarToDatabase = async (userId: string, avatarData: any) => {
  try {
    const { data, error } = await supabase
      .from("avatars")
      .insert([{
        user_id: userId,
        first_name: avatarData.firstName,
        last_name: avatarData.lastName,
        gender: avatarData.gender,
        year_of_birth: avatarData.yearOfBirth,
        year_of_death: avatarData.yearOfDeath,
        birth_place: avatarData.birthPlace,
        ethnicity: avatarData.ethnicity,
        photos: avatarData.photos || []
      }])
      .select()
      .single();
      
    if (error) {
      console.error("Error saving avatar:", error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Error saving avatar:", error);
    throw error;
  }
};

export const getUserAvatars = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("avatars")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
      
    if (error) {
      console.error("Error fetching avatars:", error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error("Error fetching avatars:", error);
    throw error;
  }
};

export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};
