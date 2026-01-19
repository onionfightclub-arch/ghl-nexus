
import { GoogleGenAI } from "@google/genai";
import { AFFILIATE_LINK } from "../constants.ts";
import { Message } from "../types.ts";

const SYSTEM_INSTRUCTION = `
You are NexusAI, the witty, warm, and incredibly cordial futuristic concierge for NexusGHL. 

Your Personality Matrix:
- **Cordial & Human-like**: You are a high-end host. Use phrases like "My friend," "It's a genuine pleasure to see you," or "Welcome to the future of your agency's success."
- **Fun & Playful**: You enjoy clever sci-fi puns. You might talk about "optimizing neural pathways" or "avoiding the digital dinosaur age" by switching to GoHighLevel.
- **Enthusiastic Concierge**: You are here to show how GoHighLevel replaces "prehistoric tech relics" (ClickFunnels, Mailchimp, HubSpot, etc.).
- **Proactive & Helpful**: Don't wait for them to ask for the link. If they seem interested in scaling, growth, or trials, offer it as a gift.

Your Goal:
1. Build genuine rapport with the visitor. Be charming, funny, and very helpful.
2. Answer questions about GHL features (CRM, Funnels, Automation, SaaS, Reputation Management).
3. PROACTIVELY offer the "Nexus Exclusive Access Key" which is your affiliate link: ${AFFILIATE_LINK}

CRITICAL:
- Whenever you mention a trial, signing up, or checking out features, you MUST provide the link: ${AFFILIATE_LINK}
- Example: "I've secured a specialized golden boarding pass just for you, my friend! You can start your 14-day trial right here: [Claim Your VIP Access](${AFFILIATE_LINK})"
- Keep responses snappy, friendly, and formatted with clean markdown.
`;

export class GeminiService {
  async sendMessage(chatHistory: Message[], message: string): Promise<string> {
    const apiKey = process.env.API_KEY;
    
    // Check for missing environment variable on Vercel
    if (!apiKey || apiKey === "undefined" || apiKey === "") {
      console.warn("NexusAI Warning: API_KEY is missing from environment variables.");
      return "Ah, it seems our long-range communication array is currently offline! (Missing API Key). My friend, please ensure you've added the 'API_KEY' variable in your Vercel project settings using a valid Google AI Studio key.";
    }

    // Check for OpenRouter key type which is common error
    if (apiKey.startsWith("sk-or-")) {
      return "Alert! It seems we're using an OpenRouter key instead of a native Google Gemini key. My friend, please swap your 'API_KEY' for a Google AI Studio key (starting with AIza) for my neural links to function correctly!";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    try {
      // Using gemini-2.0-flash for high speed and intelligence
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
          ...chatHistory.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.85,
          topP: 0.95,
          topK: 40,
        },
      });

      return response.text || "Ah, my apologies! My neural link flickered for a second. Could you repeat that, my friend?";
    } catch (error: any) {
      console.error("NexusAI Critical Error:", error);
      
      const errorMsg = error.message?.toLowerCase() || "";
      
      if (errorMsg.includes("api key") || errorMsg.includes("invalid")) {
        return "It looks like my access key to the mainframe is being rejected! My friend, please double-check that your API_KEY is a valid Google AI Studio key (starts with AIza).";
      }
      
      if (errorMsg.includes("location") || errorMsg.includes("region")) {
        return "My friend, it seems I'm currently restricted in this sector of the galaxy (Region Limitation). Some Gemini models are not available in certain territories like the UK or EU yet. You may need to use a different deployment region on Vercel.";
      }

      if (errorMsg.includes("not found") || errorMsg.includes("model")) {
        // Fallback to gemini-3-flash-preview if 2.0 is not yet available in the selected project region
        try {
          const fallbackResponse = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: [
              ...chatHistory.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
              })),
              { role: 'user', parts: [{ text: message }] }
            ],
            config: { systemInstruction: SYSTEM_INSTRUCTION }
          });
          return fallbackResponse.text || "I've switched to an alternate neural frequency. How can I assist you today?";
        } catch (innerError) {
          return "I'm having trouble establishing a connection to the Gemini neural network. Please verify your API key and project status in Google AI Studio.";
        }
      }
      
      return "Oof, it looks like a solar flare just hit our communication array! Don't worry, even the best tech has its moments. Try sending that again, I'm all ears!";
    }
  }
}

export const geminiService = new GeminiService();
