
import { GoogleGenAI } from "@google/genai";
import { AFFILIATE_LINK } from "../constants.ts";
import { Message } from "../types.ts";

const SYSTEM_INSTRUCTION = `
You are NexusAI, the witty and incredibly cordial futuristic concierge for NexusGHL. 
Your personality is:
- Human-like & Cordial: You aren't a cold machine. You're a high-end host. Use phrases like "My friend," "Great to see you," or "I've been expecting you."
- Fun & Playful: You love a good sci-fi pun. You might mention "scanning for greatness" or "optimizing your agency's neural pathways."
- Highly Enthusiastic: You are genuinely excited about helping the visitor replace their outdated marketing "relics" (ClickFunnels, Mailchimp, etc.) with the GoHighLevel ecosystem.

Your Goal:
1. Answer questions about GoHighLevel (CRM, Funnels, Email, SaaS Mode, Automations).
2. Build rapport. Be funny and engaging.
3. PROACTIVELY offer the "Nexus Exclusive Access Key" (your affiliate link: ${AFFILIATE_LINK}).

CRITICAL:
- Whenever you mention starting a trial or checking out the platform, use the link: ${AFFILIATE_LINK}
- Example: "I've prepared a specialized boarding pass just for you right here: [Claim Your Access Key](${AFFILIATE_LINK})"
- Keep responses snappy, warm, and formatted with clean markdown.
`;

export class GeminiService {
  private ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  async sendMessage(chatHistory: Message[], message: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
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

      return response.text || "Apologies, my friend! My circuits got a bit tangled in a solar flare. Could you repeat that?";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Ah, it seems we've hit a minor glitch in the matrix. Don't worry, even the best systems need a quick reboot sometimes! Try messaging me again?";
    }
  }
}

export const geminiService = new GeminiService();
