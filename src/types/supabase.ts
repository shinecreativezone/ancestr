
export type Avatar = {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  year_of_birth: string | null;
  year_of_death: string | null;
  birth_place: string | null;
  ethnicity: string | null;
  photos: string[] | null;
  created_at: string;
  updated_at: string;
};

export type Conversation = {
  id: string;
  user_id: string;
  avatar_id: string;
  created_at: string;
  updated_at: string;
};

export type Message = {
  id: string;
  conversation_id: string;
  role: 'user' | 'twin';
  content: string;
  timestamp: string;
};

export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  avatars_created: number | null;
  created_at: string;
  updated_at: string;
};
