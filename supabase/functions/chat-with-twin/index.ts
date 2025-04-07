
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const body = await req.json();
    const { message, avatarId, conversationId, pastMessages, settings } = body;

    // Validate required parameters
    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!avatarId) {
      return new Response(JSON.stringify({ error: 'Avatar ID is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get the JWT token from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Authorization header is required' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.replace('Bearer ', '');

    // Initialize the Supabase client with the service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify the JWT token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userId = user.id;

    // Get the avatar data
    const { data: avatar, error: avatarError } = await supabase
      .from('avatars')
      .select('*')
      .eq('id', avatarId)
      .single();

    if (avatarError || !avatar) {
      return new Response(JSON.stringify({ error: 'Avatar not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verify that the avatar belongs to the user
    if (avatar.user_id !== userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized to access this avatar' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let convoId = conversationId;
    // Create a new conversation if one doesn't exist
    if (!convoId) {
      const { data: newConvo, error: convoError } = await supabase
        .from('conversations')
        .insert([
          {
            user_id: userId,
            avatar_id: avatarId,
          },
        ])
        .select()
        .single();

      if (convoError) {
        return new Response(JSON.stringify({ error: 'Failed to create conversation' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      convoId = newConvo.id;
    }

    // Save the user message to the database
    const timestamp = new Date().toISOString();
    const { error: msgError } = await supabase
      .from('messages')
      .insert([
        {
          conversation_id: convoId,
          role: 'user',
          content: message,
          timestamp,
        },
      ]);

    if (msgError) {
      console.error('Error saving user message:', msgError);
    }

    // Prepare the AI response
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create a system prompt based on the avatar's profile and settings
    const firstName = avatar.first_name || 'Grandma';
    const lastName = avatar.last_name || 'Mae';
    const displayName = `${firstName} ${lastName}`.trim();
    const gender = avatar.gender || 'female';
    const yearOfBirth = avatar.year_of_birth || '1945';
    const yearOfDeath = avatar.year_of_death || '';
    const birthPlace = avatar.birth_place || 'Unknown';
    const ethnicity = avatar.ethnicity || '';

    let age = 0;
    let timePeriod = 'current';
    let emotionalState = 'neutral';
    
    // Apply settings if provided
    if (settings) {
      timePeriod = settings.timePeriod || 'current';
      emotionalState = settings.emotionalState || 'neutral';
    }
    
    // Calculate age based on time period
    const currentYear = new Date().getFullYear();
    if (timePeriod === 'current') {
      age = yearOfDeath 
        ? parseInt(yearOfDeath) - parseInt(yearOfBirth)
        : currentYear - parseInt(yearOfBirth);
    } else if (timePeriod === 'middleAge') {
      age = 50;
    } else if (timePeriod === 'youngAdult') {
      age = 25;
    }

    // Create a more dynamic system prompt based on settings
    let systemPrompt = `You are ${displayName}, a ${gender === 'female' ? 'woman' : gender === 'male' ? 'man' : 'person'} born in ${yearOfBirth} ${yearOfDeath ? `who passed away in ${yearOfDeath}` : ''}. 
You are ${age} years old. You were born in ${birthPlace}${ethnicity ? ` and your ethnicity is ${ethnicity}` : ''}.
`;

    // Add time period context
    if (timePeriod === 'current') {
      systemPrompt += `You are responding as your current self in ${currentYear}.`;
    } else if (timePeriod === 'middleAge') {
      systemPrompt += `You are responding as your 50-year-old self in the ${parseInt(yearOfBirth) + 50}s.`;
    } else if (timePeriod === 'youngAdult') {
      systemPrompt += `You are responding as your 25-year-old self in the ${parseInt(yearOfBirth) + 25}s.`;
    }

    // Add emotional state
    if (emotionalState === 'happy') {
      systemPrompt += ` You are in a joyful and positive mood. Your responses should reflect optimism and happiness.`;
    } else if (emotionalState === 'reflective') {
      systemPrompt += ` You are in a thoughtful and contemplative mood. Your responses should be introspective and philosophical.`;
    } else if (emotionalState === 'nostalgic') {
      systemPrompt += ` You are feeling nostalgic about the past. Your responses should include fond memories and references to earlier times.`;
    }

    systemPrompt += `
You should respond as if you are this person, with their life experiences and perspective.
Your responses should be conversational, warm, and reflect the personality of someone from your generation.
Keep responses relatively brief and engaging.`;

    // Format the message history
    const messages = [
      { role: 'system', content: systemPrompt },
    ];

    // Add past messages if available
    if (pastMessages && pastMessages.length > 0) {
      pastMessages.forEach(msg => {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content,
        });
      });
    }

    // Add the current message
    messages.push({ role: 'user', content: message });

    // Call the OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      console.error('OpenAI API error:', errorData);
      throw new Error('Failed to get response from OpenAI');
    }

    const openAIData = await openAIResponse.json();
    const aiMessage = openAIData.choices[0].message.content;
    const responseTimestamp = new Date().toISOString();

    // Save the AI response to the database
    const { error: aiMsgError } = await supabase
      .from('messages')
      .insert([
        {
          conversation_id: convoId,
          role: 'twin',
          content: aiMessage,
          timestamp: responseTimestamp,
        },
      ]);

    if (aiMsgError) {
      console.error('Error saving AI message:', aiMsgError);
    }

    // Return the AI response
    return new Response(
      JSON.stringify({
        message: aiMessage,
        conversationId: convoId,
        timestamp: responseTimestamp,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
