import { CodeGenerationRequest, CodeGenerationResponse } from './types';

export class CodeGenerator {
  private supportedLanguages = [
    'javascript',
    'typescript',
    'python',
    'java',
    'go',
    'rust',
    'cpp',
    'csharp'
  ];

  async generateCode(request: CodeGenerationRequest): Promise<CodeGenerationResponse> {
    // Validate language
    if (!this.supportedLanguages.includes(request.language.toLowerCase())) {
      throw new Error(`Unsupported language: ${request.language}`);
    }

    // Generate code based on prompt
    const code = this.generateCodeTemplate(request.language, request.prompt);
    const explanation = this.generateExplanation(request.prompt);

    return {
      code,
      language: request.language,
      explanation
    };
  }

  private generateCodeTemplate(language: string, prompt: string): string {
    const templates: { [key: string]: string } = {
      javascript: `// ${prompt}\nfunction solution() {\n  // TODO: Implement\n  return null;\n}`,
      typescript: `// ${prompt}\nfunction solution(): void {\n  // TODO: Implement\n}`,
      python: `# ${prompt}\ndef solution():\n    # TODO: Implement\n    pass`,
      java: `// ${prompt}\npublic class Solution {\n    public static void main(String[] args) {\n        // TODO: Implement\n    }\n}`,
      go: `// ${prompt}\nfunc solution() {\n    // TODO: Implement\n}`,
      rust: `// ${prompt}\nfn solution() {\n    // TODO: Implement\n}`,
      cpp: `// ${prompt}\nint main() {\n    // TODO: Implement\n    return 0;\n}`,
      csharp: `// ${prompt}\npublic class Solution {\n    public static void Main() {\n        // TODO: Implement\n    }\n}`
    };

    return templates[language.toLowerCase()] || templates.javascript;
  }

  private generateExplanation(prompt: string): string {
    return `このコードは以下の要件を満たしています：\n- ${prompt}\n\n詳細な実装は各言語のベストプラクティスに従って完成させてください。`;
  }

  getSupportedLanguages(): string[] {
    return this.supportedLanguages;
  }
}
