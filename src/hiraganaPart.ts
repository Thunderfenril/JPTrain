import readline from "readline";

import hiragana from "@data/hiragana.json"

export type AskFunction = (prompt: string) => Promise<string>;

export function readRandomJsonData(index: number): string[] {
    const randomNumber = Math.floor(Math.random() * 100);
    const hiraganaArray = hiragana[index];
    const result = [hiraganaArray[randomNumber %2], hiraganaArray[(randomNumber+1) %2]];
    return result;
}

export async function promptUserForInput(ask: AskFunction, caracterShown : string, expectedAnswers: string | string[]): Promise<boolean> {
    console.log(`Please input the matching answer(s) for: ${caracterShown}`);

    const answers = Array.isArray(expectedAnswers)
    ? expectedAnswers
    : [expectedAnswers];

    const userInputs: string[] = [];
    for (let i = 0; i < answers.length; i++) {
        const input = await ask(
        answers.length > 1 ? `Answer ${i + 1}: ` : "Your answer: "
        );
        userInputs.push(input.trim().toLowerCase());
    }

    //Normalize the input and answer to have no problem with different order
    const normalizedExpected = answers.map(a => a.trim().toLowerCase());
    const normalizedInputs = userInputs.map(a => a.trim().toLowerCase());

    const res =
        normalizedInputs.length === normalizedExpected.length &&
        normalizedInputs.every(ans => normalizedExpected.includes(ans));

    return res;
}