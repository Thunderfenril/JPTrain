import readline from "readline";

import hiragana from "@data/hiragana.json"

export type AskFunction = (prompt: string) => Promise<string>;

export function readRandomJsonData(index: number): string[] {
    const randomNumber = Math.floor(Math.random() * 100);
    const hiraganaArray = hiragana[index];
    const result = [hiraganaArray[randomNumber %2], hiraganaArray[(randomNumber+1) %2]];
    return result;
}

export async function promptUserForInput(ask: AskFunction, caracterShown : string, expectedAnswer : string): Promise<boolean> {
    console.log(`Please input the matching character for: ${caracterShown}`);
    const userInput = await ask("Your answer: ");
    return userInput.trim().toLowerCase() === expectedAnswer.trim().toLowerCase();
}

export function askQuestion(prompt: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}