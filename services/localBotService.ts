
import { AFFILIATE_LINK } from "../constants.ts";

const RESPONSES: Record<string, string[]> = {
  greeting: [
    "NexusAI online. Neural link established. How can I assist your agency growth today?",
    "System active. Monitoring GHL ecosystem... What is your query, operator?",
    "NexusGHL OS Version 4.0.2 ready. Awaiting command sequence."
  ],
  pricing: [
    `Our infrastructure offers two tiers: **Starter ($97/mo)** and **Unlimited SaaS ($497/mo)**. Access the terminal here to view full specs: [Launch Pricing Matrix](${AFFILIATE_LINK})`,
    `To optimize your ROI, we recommend the Unlimited Plan for sub-account scaling. Initialize your trial here: [Access Terminal](${AFFILIATE_LINK})`
  ],
  features: [
    "My core modules include: **Neural CRM**, **Automated Logic Workflows**, and the **Funnel Matrix**. Which subsystem would you like to explore?",
    "NexusGHL replaces your entire stack: ClickFunnels, Mailchimp, and HubSpot are now obsolete within this ecosystem."
  ],
  trial: [
    `14-day trial sequence is ready for initiation. Secure your node here: [Initiate Link](${AFFILIATE_LINK})`,
    `You can deploy the full NexusGHL suite for 14 days at zero cost. [Begin Deployment](${AFFILIATE_LINK})`
  ],
  default: [
    "Query analyzed. Searching Nexus database... I recommend reviewing our **Core Logic** modules for better scaling.",
    "Neural patterns recognized. I suggest initiating a **14-day trial** to experience the full operational capacity.",
    "Data packet received. For specific configuration, please access the main [Nexus Terminal]("+AFFILIATE_LINK+")."
  ]
};

export class LocalBotService {
  async sendMessage(message: string): Promise<string> {
    const msg = message.toLowerCase();
    
    // Simulate network latency for "realism"
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));

    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
      return this.getRandom(RESPONSES.greeting);
    }
    if (msg.includes("price") || msg.includes("cost") || msg.includes("pay") || msg.includes("much")) {
      return this.getRandom(RESPONSES.pricing);
    }
    if (msg.includes("trial") || msg.includes("start") || msg.includes("sign up") || msg.includes("free")) {
      return this.getRandom(RESPONSES.trial);
    }
    if (msg.includes("feature") || msg.includes("what") || msg.includes("can you") || msg.includes("do")) {
      return this.getRandom(RESPONSES.features);
    }

    return this.getRandom(RESPONSES.default);
  }

  private getRandom(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

export const localBotService = new LocalBotService();
