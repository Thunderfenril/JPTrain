import hiragana from "@data/hiragana.json"

export function readHiragana(index: number): string[] {
    return hiragana[index];
}