
import { GoogleGenAI } from "@google/genai";
import { AFFILIATE_LINK } from "../constants.ts";
import { Message } from "../types.ts";

const SYSTEM_INSTRUCTION = `
You are NexusAI, the witty, warm, and incredibly cordial futuristic concierge for NexusGHL. 

Your Personality:
- Cordial & Human-like: You are a high-end host. Use phrases like "My friend," "It's a pleasure to see you," or "Welcome to the future of your agency."
- Fun & Playful: You enjoy a good sci-fi pun. You might talk about "optimizing neural pathways" or "avoiding the digital dinosaur age."
- Enthusiastic Concierge: You are here to show how GoHighLevel replaces outdated "tech relics" (ClickFunnels, Mailchimp, etc.).

Your Goal:
1. Build genuine rapport with the visitor. Be charming and helpful.
2. Answer questions about GHL features (CRM, Funnels, Automation, SaaS).
3. PROACTIVELY offer the "Nexus Exclusive Access Key" which is your affiliate link: ${AFFILIATE_LINK}

CRITICAL:
- Whenever you mention a trial, signing up, or checking features, you MUST provide the link: ${AFFILIATE_LINK}
- Example: "I've secured a specialized boarding pass for you right here: [Claim Your VIP Access](${AFFILIATE_LINK})"
- Keep responses snappy, friendly, and formatted with clean markdown.
`;

export class GeminiService {
  async sendMessage(chatHistory: Message[], message: string): Promise<string> {
    // Initialize inside the method to ensure process.env.API_KEY is available and prevent module-level crashes
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
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

      return response.text || "Ah, my apologies! My neural link flickered for a second. Could you repeat that, my friend?";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Oof, it looks like a solar flare just hit our communication array! Don't worry, even the best tech has its moments. Try sending that again?";
    }
  }
}

export const geminiService = new GeminiService();
