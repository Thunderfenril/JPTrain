import readline from 'readline';

import hiragana from "@data/hiragana.json"
import * as hiraganaQuizz from "./hiraganaPart";
import katakana from "@data/katakana.json"
import * as katakanaQuizz from "./katakanaPart";
import kana from "@data/kana.json"
import * as kanaQuizz from "./kanaWordPart";
import kanji from "@data/kanji.json"
import * as kanjiQuizz from "./kanjiPart";

const studySet = {
  hiragana: {
    main: hiragana,
    quiz: hiraganaQuizz
  },

  katakana: {
    main: katakana,
    quiz: katakanaQuizz
  },

  kana: {
    main: kana,
    quiz: kanaQuizz
  },

  kanji: {
    main: kanji,
    quiz: kanjiQuizz
  }
}

let choiceType: keyof typeof studySet = "hiragana";
let kanjiDefinition: string|null = "";

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
    console.log("What do you wish to do ?\n1) Review Hiragana\n2) Review Katagana\n3) Review kana words\n4) Review Kanji");

    while(true) {
    const choicemainmenu = await askQuestion("Choose an option (1-4): ");

    switch (choicemainmenu.trim()) {
      case '1':
        choiceType = "hiragana";
        await quizzPart();
        rl.close();
        return;
      case '2':
        choiceType = "katakana";
        await quizzPart();
        rl.close();
        return;
      case '3':
        choiceType = "kana";
        await quizzPart();
        rl.close();
        return;
      case '4':
        choiceType = "kanji";
        await quizzPart();
        rl.close();
        return;
      default:
        console.log("Invalid option. Please try again.\n");
        break;
      }
    }
}

async function quizzPart() : Promise<void> {
  console.clear();

  console.log(`1) Review a random ${choiceType}.\n2) Review several ${choiceType} randomly.\n3) Full review.\n4) Exit.`);
  while(true) {
    const choicequizz = await askQuestion("Choose an option (1-3): ");


    switch(choicequizz.trim()) {
      case '1':
        console.clear();
        const jsonLength = studySet[choiceType].main.length;
        const randomIndex = Math.floor(Math.random() * (jsonLength - 1 + 1) + 1);
        var question = studySet[choiceType].quiz.readRandomJsonData(randomIndex);

        if(choiceType == "kanji") {
          removeLongestElement(question);
        }
        const [_, ...answerExpected] = question;

        const result = await studySet[choiceType].quiz.promptUserForInput(askQuestion, question[0], answerExpected);
        announceResult(result, answerExpected);
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

function announceResult(res : boolean, answers : string[]) : void {
  // const text = res ? "Good answer." : `Wrong, the answer was "${answers.join(" / ")}"`;
  let text : string|null = "";
  if(res) {
    text = "Good Answer.";

    if(choiceType == "kanji" && kanjiDefinition != "") {
      text += `\nHere is a definition: ${kanjiDefinition}`
    }
  } else {
    text = `Wrong, the answer was "${answers.join(" / ")}"`;
  }

  console.log(text);
}

function removeLongestElement(arr : string[]) : string[] {

  if(arr.length === 0) {
    return arr;
  }

  const maxLength = Math.max(...arr.map(s => s.length));
  const index = arr.findIndex(s => s.length === maxLength);

  if (index !== -1 && index != 0) {
    kanjiDefinition = arr[index];
    arr.splice(index, 1);
  }

  return arr;
}
main()