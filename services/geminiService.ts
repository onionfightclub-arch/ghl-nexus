
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
    // Check if key is available to prevent SDK throw
    const apiKey = process.env.API_KEY;
    
    if (!apiKey || apiKey === "undefined" || apiKey === "") {
      return "Ah, it seems our long-range communication array is currently offline! (Missing API Key). I'd love to chat, but my neural link needs its power source. Once the tech team plugs it in, I'll be back to help you conquer the marketing world!";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...chatHistory.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.9, // Higher temperature for more creative/human personality
          topP: 0.95,
          topK: 40,
        },
      });

      return response.text || "Ah, my apologies! My neural link flickered for a second because I was too excited about your agency's potential. Could you repeat that, my friend?";
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      if (error.message?.includes("API key")) {
        return "It looks like my access key to the mainframe is being rejected! My friend, I'm currently in 'offline mode' until the connection is restored.";
      }
      return "Oof, it looks like a solar flare just hit our communication array! Don't worry, even the best tech has its moments. Try sending that again, I'm all ears!";
    }
  }
}

export const geminiService = new GeminiService();
