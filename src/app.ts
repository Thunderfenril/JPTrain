import readline from 'readline';

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
    console.log("What do you wish to do ?\n1) Review Hiragana\n2)Review Katagana\n3)Review Kanji");

    while(true) {
        const choice = await askQuestion("Choose an option (1-3): ");
    switch (choice.trim()) {
    case '1':
      console.log("Hiragana WIP");
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
main()