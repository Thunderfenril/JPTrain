import readline from 'readline';

import hiragana from "@data/hiragana.json";
import katakana from "@data/katakana.json";
import kana from "@data/kana.json";
import kanji from "@data/kanji.json";
import * as Quizz from "./utils/QuizzFunctions";

const studySet = {
  hiragana: {
    main: hiragana,
    normalLength: 2
  },

  katakana: {
    main: katakana,
    normalLength: 2
  },

  kana: {
    main: kana,
    normalLength: 3
  },

  kanji: {
    main: kanji,
    normalLength: 4
  }
}

let choiceType: keyof typeof studySet = "hiragana";
let kanjiDefinition: string|null = "";
let description: string|null|undefined = "";

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

        const row = studySet[choiceType].main[randomIndex];

        console.log(row)

        if(row.length != studySet[choiceType].normalLength) {
          description = row.pop();
        }

        var question = Quizz.shuffleArray(row);

        const [_, ...answerExpected] = question;

        const result = await Quizz.promptUserForInput(askQuestion, question[0], answerExpected, description);

        //Ajouter un système d'indice. Regarder le cas de iru et aru chez les kana
        /**
         * Réflexion pour la mise en place, vérifier la longueur, si longueur > à taille normale alors le dernier élément est une description/indice
         * Dans ce cas l'ajouter en tant que dernier paramètre de la fonction
         * Dans la fonction, si le param n'est pas vide, alors afficher le texte, sinon ne pas afficher
         * 
         * To Do:
         * 1. Définir dans les objets de studySet la longueur "normale"
         * 2. Vérifier la longueur de question
         * 3. Faire l'appel
         * 
         * Possible problème: Dans le cas des mots kana, possible régression avec l'ajout d'une colonen en plus, celle-ci risque d'être sélectionné comme question
         */
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


main()