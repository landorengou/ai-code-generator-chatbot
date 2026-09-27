import { Chatbot } from './chatbot';
import * as readline from 'readline';

async function main() {
  const chatbot = new Chatbot();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('🤖 AIコード生成チャットボット');
  console.log('================================');
  console.log('「コード生成」でコードを生成します');
  console.log('「言語を変更」で対応言語を変更します');
  console.log('「終了」で プログラムを終了します');
  console.log('================================\n');

  const askQuestion = () => {
    rl.question('You: ', async (input) => {
      if (input.toLowerCase() === '終了' || input.toLowerCase() === 'exit') {
        console.log('さようなら！');
        rl.close();
        process.exit(0);
      }

      try {
        const response = await chatbot.processMessage(input);
        console.log(`\nBot: ${response}\n`);
      } catch (error) {
        console.error(`エラー: ${error instanceof Error ? error.message : '不明なエラー'}`);
      }

      askQuestion();
    });
  };

  askQuestion();
}

main().catch(console.error);
