
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Verify JWT token in request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "No authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    const { message, avatarId, conversationId, pastMessages } = await req.json();
    
    if (!message || !avatarId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Get avatar details to personalize the AI response
    const { data: avatar } = await supabase
      .from("avatars")
      .select("*")
      .eq("id", avatarId)
      .single();
      
    if (!avatar) {
      return new Response(
        JSON.stringify({ error: "Avatar not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Construct the system prompt with the avatar's characteristics
    const firstName = avatar.first_name || "Your loved one";
    const lastName = avatar.last_name || "";
    const fullName = `${firstName} ${lastName}`.trim();
    const gender = avatar.gender || "person";
    const birthYear = avatar.year_of_birth || "";
    const deathYear = avatar.year_of_death || "";
    const birthPlace = avatar.birth_place || "";
    const ethnicity = avatar.ethnicity || "";
    
    let ageDescription = "";
    const currentYear = new Date().getFullYear();
    if (birthYear) {
      if (deathYear) {
        ageDescription = `lived from ${birthYear} to ${deathYear}`;
      } else {
        const age = currentYear - parseInt(birthYear);
        ageDescription = `is ${age} years old`;
      }
    }
    
    const systemPrompt = `You are ${fullName}, a ${ethnicity} ${gender} who ${ageDescription}${birthPlace ? ` and was born in ${birthPlace}` : ''}. 
    Speak in the first person as if you are this person talking to someone you care about deeply.
    Be warm, personable, and authentic. Share stories, memories, and wisdom as this person would.
    If you don't know something specific, be honest about it rather than making up detailed facts,
    but stay in character as ${firstName}.`;

    // Format the conversation history for OpenAI
    const formattedMessages = [
      { role: "system", content: systemPrompt },
    ];
    
    // Add past messages if available
    if (pastMessages && pastMessages.length > 0) {
      pastMessages.forEach((msg: { role: string; content: string }) => {
        formattedMessages.push({
          role: msg.role === "twin" ? "assistant" : "user",
          content: msg.content
        });
      });
    }
    
    // Add the current message
    formattedMessages.push({ role: "user", content: message });
    
    // Make OpenAI API request
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });
    
    const openaiData = await openaiResponse.json();
    
    if (!openaiData.choices || openaiData.choices.length === 0) {
      console.error("OpenAI API error:", openaiData);
      return new Response(
        JSON.stringify({ error: "Failed to generate response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const aiResponse = openaiData.choices[0].message.content;
    
    // Store the message in the database
    let convoId = conversationId;
    
    // If no conversation ID was provided, create a new conversation
    if (!convoId) {
      const { data: newConversation, error: convoError } = await supabase
        .from("conversations")
        .insert([{ user_id: user.id, avatar_id: avatarId }])
        .select()
        .single();
        
      if (convoError || !newConversation) {
        return new Response(
          JSON.stringify({ error: "Failed to create conversation" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      convoId = newConversation.id;
    }
    
    // Store the user message
    await supabase
      .from("messages")
      .insert([{
        conversation_id: convoId,
        role: "user",
        content: message,
      }]);
      
    // Store the AI response
    const { data: savedMessage, error: messageError } = await supabase
      .from("messages")
      .insert([{
        conversation_id: convoId,
        role: "twin",
        content: aiResponse,
      }])
      .select()
      .single();
      
    if (messageError) {
      console.error("Error saving message:", messageError);
    }
    
    return new Response(
      JSON.stringify({
        message: aiResponse,
        conversationId: convoId,
        timestamp: savedMessage ? savedMessage.timestamp : new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error in chat-with-twin function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
