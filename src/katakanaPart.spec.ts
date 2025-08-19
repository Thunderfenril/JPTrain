import {readKatakana, promptUserForCharacter} from "./katakanaPart";
import katakana from "@data/katakana.json"

describe('Read the json file', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Should import the JSON file", () => {
        expect(katakana).toBeDefined();
        expect(Array.isArray(katakana)).toBe(true);
    })

    test("Should return the correct element", () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.4);
        expect(readKatakana(0)).toEqual(["katakana", "roumanji"])
    })

    test("Should return the correct element in reversed order", () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.31);
        expect(readKatakana(0)).toEqual(["roumanji", "katakana"])
    })
})

describe('Quizz part', () => {

    test("Should select an katakana and given the right roumanji it should be a success", async () => {
        const mockAsk = jest.fn().mockResolvedValue("o");
        const result = await promptUserForCharacter(mockAsk, "お", "o");

        expect(result).toBe(true);
    })

    test("Should select an katakana and given the wrong roumanji it should be a failure", async () => {
        const mockAsk = jest.fn().mockResolvedValue("u");
        const result = await promptUserForCharacter(mockAsk, "お", "o");

        expect(result).toBe(false);
    })
})