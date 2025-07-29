import {readHiragana} from "./readHiragana";
import hiragana from "@data/hiragana.json"

describe('Read the json file', () => {

    test("Should import the JSON file", () => {
        expect(hiragana).toBeDefined();
        expect(Array.isArray(hiragana)).toBe(true);
    })

    test("Should return the correct element", () => {
        expect(readHiragana(0)).toEqual(["hiragana", "roumanji"])
    })
})