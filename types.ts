
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Plan {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}
