

export type AskFunction = (prompt: string) => Promise<string>;

/**
 * Function to return a copy of an array, which is shuffled using the Fisher-Yates shuffle
 * @param data Array from the json
 * @returns An array
 */
export function shuffleArray(data: string[]): string[] {
    const rowWithoutInformation = data.slice();

    for(let i = rowWithoutInformation.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rowWithoutInformation[i], rowWithoutInformation[j]] = [rowWithoutInformation[j], rowWithoutInformation[i]];
    }

    return rowWithoutInformation;
}

/**
 * 
 * @param ask 
 * @param caracterShown A String of the question
 * @param expectedAnswers An array of string or a string of the value expected to be the answer 
 * @param description A string, which gives a description
 * @returns A boolean value depending on the answer
 */
export async function promptUserForInput(ask: AskFunction, caracterShown : string, expectedAnswers: string | string[], description : string | undefined | null = ""): Promise<boolean> {
    console.log(`Please input the matching answer(s) for: ${caracterShown}`);
    
    if(description != "") {
        console.log(`Hint: ${description}`);
    }

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