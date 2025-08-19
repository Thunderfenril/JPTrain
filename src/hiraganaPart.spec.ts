import {readRandomJsonData, promptUserForInput} from "./hiraganaPart";
import hiragana from "@data/hiragana.json"

describe('Read the json file', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Should import the JSON file", () => {
        expect(hiragana).toBeDefined();
        expect(Array.isArray(hiragana)).toBe(true);
    })

    test("Should return the correct element", () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.4);
        expect(readRandomJsonData(0)).toEqual(["hiragana", "roumanji"])
    })

    test("Should return the correct element in reversed order", () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.31);
        expect(readRandomJsonData(0)).toEqual(["roumanji", "hiragana"])
    })
})

describe('Quizz part', () => {

    test("Should select an hiragana and given the right roumanji it should be a success", async () => {
        const mockAsk = jest.fn().mockResolvedValue("o");
        const result = await promptUserForInput(mockAsk, "お", "o");

        expect(result).toBe(true);
    })

    test("Should select an hiragana and given the wrong roumanji it should be a failure", async () => {
        const mockAsk = jest.fn().mockResolvedValue("u");
        const result = await promptUserForInput(mockAsk, "お", "o");

        expect(result).toBe(false);
    })
})