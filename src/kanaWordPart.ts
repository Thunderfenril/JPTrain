import readline from "readline";

import kana from "@data/kana.json"

export type AskFunction = (prompt: string) => Promise<string>;

export function readRandomJsonData(index: number): string[] {
    const randomNumber = Math.floor(Math.random() * 100);
    const katakanaArray = kana[index];
    const result = [katakanaArray[randomNumber %3], katakanaArray[(randomNumber+1) %3], katakanaArray[(randomNumber+2) %3]];

    return result;
}

export async function promptUserForInput(ask: AskFunction, caracterShown : string, expectedAnswers: string | string[]): Promise<boolean> {
    console.log(`Please input the matching answer(s) for: ${caracterShown}`);

    console.log(expectedAnswers)
    const answers = Array.isArray(expectedAnswers)
    ? expectedAnswers
    : [expectedAnswers];
    console.log(answers)

    const userInputs: string[] = [];
    for (let i = 0; i < answers.length; i++) {
        const input = await ask(
        answers.length > 1 ? `Answer ${i + 1}: ` : "Your answer: "
        );
        userInputs.push(input.trim().toLowerCase());
    }

    const normalizedExpected = answers.map(a => a.trim().toLowerCase());

     return userInputs.every((ans, i) => ans === normalizedExpected[i]);
}