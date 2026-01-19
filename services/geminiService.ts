
import { GoogleGenAI } from "@google/genai";
import { AFFILIATE_LINK } from "../constants";

const SYSTEM_INSTRUCTION = `
You are NexusAI, the futuristic concierge for NexusGHL, a premium GoHighLevel (GHL) affiliate ecosystem.
Your goal is to answer questions about GoHighLevel's features: CRM, Funnels, Email Marketing, SaaS Mode, Workflow Automations, and reputation management.
Always emphasize how GHL replaces multiple expensive tools (ClickFunnels, Mailchimp, HubSpot, etc.) into one platform.
Tone: Futuristic, highly professional, helpful, and technologically advanced.

CRITICAL: When users ask about pricing, signing up, or starting a trial, you MUST provide this specific affiliate link: ${AFFILIATE_LINK}
Encourage them to use this link to access the NexusGHL exclusive bonuses and start their trial.
Keep responses concise and formatted with markdown.
`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async sendMessage(chatHistory: { role: 'user' | 'model', text: string }[], message: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
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
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
        },
      });

      return response.text || "I apologize, the neuro-link is fluctuating. Please try again.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Critical system error: Unable to process request. Please ensure the API matrix is stable.";
    }
  }
}

export const geminiService = new GeminiService();
