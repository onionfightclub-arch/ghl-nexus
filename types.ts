
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

// Added Message interface for chat interactions between the user and the model
export interface Message {
  role: 'user' | 'model';
  text: string;
}
