export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatContext {
  messages: Message[];
  language: string;
  model: string;
}

export interface CodeGenerationRequest {
  prompt: string;
  language: string;
  context?: string;
}

export interface CodeGenerationResponse {
  code: string;
  language: string;
  explanation: string;
}
