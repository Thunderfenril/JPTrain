import readline from 'readline';

import hiragana from "@data/hiragana.json"
import * as hiraganaQuizz from "./hiraganaPart";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(query, resolve);
  });
}

export async function main() : Promise<void> {
    console.log("What do you wish to do ?\n1) Review Hiragana\n2) Review Katagana\n3) Review Kanji");

    while(true) {
    const choicemainmenu = await askQuestion("Choose an option (1-3): ");

    switch (choicemainmenu.trim()) {
      case '1':
        await hiraganaPart();
        rl.close();
        return;
      case '2':
        console.log("Katagana WIP");
        rl.close();
        return;
      case '3':
        console.log("Kanji WIP");
        rl.close();
        return;
      default:
        console.log("Invalid option. Please try again.\n");
        break;
      }
    }
}

async function hiraganaPart() : Promise<void> {

  console.clear();

  console.log("1) Review a random hiragana.\n2) Review several hiragana at random.\n3) Full review.\n4) Exit.");
  while(true) {
    const choiceHiragana = await askQuestion("Choose an option (1-3): ");


    switch(choiceHiragana.trim()) {
      case '1':
        console.clear();
        const hiraganaLength = hiragana.length;
        const randomIndex = Math.floor(Math.random() * (hiraganaLength - 1 + 1) + 1);
        const question = hiraganaQuizz.readHiragana(randomIndex);
        const result = await hiraganaQuizz.promptUserForCharacter(askQuestion, question[0], question[1]);
        announceResult(result, question[1]);
        return;
      case '2':
        console.clear();
        console.log("WIP");
        break;
      case '3':
        console.clear();
        console.log("WIP");
        break;
      case '4':
        console.clear();
        rl.close();
        return;
      default:
        console.log("Invalid option. Please try again.\n");
        break;
    }
  }
}

function announceResult(res : boolean, answer : string) : void {
  const text = res ? "Good answer." : `Wrong, the answer was "${answer}"`;
  console.log(text);
}
main()