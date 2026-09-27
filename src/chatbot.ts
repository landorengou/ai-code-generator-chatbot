import { Message, ChatContext, CodeGenerationRequest } from './types';
import { CodeGenerator } from './codeGenerator';

export class Chatbot {
  private context: ChatContext;
  private codeGenerator: CodeGenerator;

  constructor() {
    this.context = {
      messages: [],
      language: 'javascript',
      model: 'gpt-4'
    };
    this.codeGenerator = new CodeGenerator();
  }

  async processMessage(userInput: string): Promise<string> {
    // Add user message to context
    const userMessage: Message = {
      role: 'user',
      content: userInput,
      timestamp: new Date()
    };
    this.context.messages.push(userMessage);

    // Process the message
    let response: string;

    if (this.isCodeGenerationRequest(userInput)) {
      response = await this.handleCodeGeneration(userInput);
    } else if (this.isLanguageChange(userInput)) {
      response = this.handleLanguageChange(userInput);
    } else {
      response = this.handleGeneralConversation(userInput);
    }

    // Add assistant message to context
    const assistantMessage: Message = {
      role: 'assistant',
      content: response,
      timestamp: new Date()
    };
    this.context.messages.push(assistantMessage);

    return response;
  }

  private isCodeGenerationRequest(input: string): boolean {
    const codeKeywords = [
      'コードを生成',
      'コード生成',
      'プログラム',
      'コード書いて',
      'generate code',
      'write code',
      'create code'
    ];
    return codeKeywords.some(keyword => input.toLowerCase().includes(keyword));
  }

  private isLanguageChange(input: string): boolean {
    return input.toLowerCase().includes('言語を変更') ||
           input.toLowerCase().includes('change language');
  }

  private async handleCodeGeneration(userInput: string): Promise<string> {
    try {
      const request: CodeGenerationRequest = {
        prompt: userInput,
        language: this.context.language
      };

      const response = await this.codeGenerator.generateCode(request);

      return `\`\`\`${response.language}\n${response.code}\n\`\`\`\n\n説明：\n${response.explanation}`;
    } catch (error) {
      return `コード生成エラー：${error instanceof Error ? error.message : '不明なエラー'}`;
    }
  }

  private handleLanguageChange(userInput: string): string {
    const languages = this.codeGenerator.getSupportedLanguages();
    for (const lang of languages) {
      if (userInput.toLowerCase().includes(lang)) {
        this.context.language = lang;
        return `プログラミング言語を ${lang} に変更しました。`;
      }
    }
    return `サポートされている言語：${languages.join(', ')}`;
  }

  private handleGeneralConversation(userInput: string): string {
    return `承知しました。現在のプログラミング言語は ${this.context.language} です。\n` +
           `「コード生成」でコード生成リクエストができます。\n` +
           `「言語を変更」で別の言語に切り替えることもできます。`;
  }

  getContext(): ChatContext {
    return this.context;
  }

  clearContext(): void {
    this.context.messages = [];
  }

  getConversationHistory(): Message[] {
    return this.context.messages;
  }
}
