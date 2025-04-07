
import { supabase } from "@/integrations/supabase/client";
import { Avatar } from "@/types/supabase";

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

export const generateAvatarHeadshot = async (avatarId: string, photos: string[]): Promise<string | null> => {
  try {
    if (!photos || photos.length === 0) {
      return null;
    }
    
    const { data, error } = await supabase.functions.invoke('generate-headshot', {
      body: { photos }
    });
    
    if (error) {
      console.error("Error generating headshot:", error);
      return null;
    }
    
    if (data.imageUrl) {
      // Update the avatar with the composite image
      const { error: updateError } = await supabase
        .from("avatars")
        .update({ composite_image: data.imageUrl })
        .eq("id", avatarId);
        
      if (updateError) {
        console.error("Error updating avatar with composite image:", updateError);
      }
      
      return data.imageUrl;
    }
    
    return null;
  } catch (error) {
    console.error("Error generating headshot:", error);
    return null;
  }
};

export const getUserAvatars = async (userId: string): Promise<Avatar[]> => {
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

export const textToSpeech = async (text: string, avatarProfile: any, settings?: any): Promise<string | null> => {
  try {
    const { data, error } = await supabase.functions.invoke('text-to-speech', {
      body: { text, avatarProfile, settings }
    });
    
    if (error) {
      console.error("Error converting text to speech:", error);
      return null;
    }
    
    if (data.audioData) {
      return `data:audio/mp3;base64,${data.audioData}`;
    }
    
    return null;
  } catch (error) {
    console.error("Error with text-to-speech:", error);
    return null;
  }
};
