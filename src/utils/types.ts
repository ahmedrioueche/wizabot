export interface User {
  id: number;
  name: string;
  whatsappNumber: string;
  creationDate: string;
  status: string;
  email: string;
  password: string;
  whatsappApiToken: string;
  whatsappBusinessId: string;
  whatsappPhoneNumber: string;
  whatsappPhoneId: string;
  openAiApi: string;
  retrievalToolName: string;
  retrievalToolDescription: string;
  Prompt: string;
  files: File[];
  activeUsers: number;
  responseRate: string;
  totalConversations: string;
}
