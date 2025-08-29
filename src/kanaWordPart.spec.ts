import {readRandomJsonData, promptUserForInput} from "./kanaWordPart";
import kana from "@data/kana.json"

describe('Read the json file', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Should import the JSON file", () => {
        expect(kana).toBeDefined();
        expect(Array.isArray(kana)).toBe(true);
    })

    test("Should return an array with kana first", () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.24);
        expect(readRandomJsonData(0)[0]).toEqual("kana")
    })

    test("Should return an array with roumanji first", () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.31);
        expect(readRandomJsonData(0)[0]).toEqual("roumanji")
    })

    test("Should return an array with traduction first", () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.41);
        expect(readRandomJsonData(0)[0]).toEqual("traduction")
    })
})

describe('Quizz part', () => {

    test("Should select a kana, and giving the correct traduction and correct roumanji it should return a success", async () => {
        const mockAsk = jest.fn()
            .mockResolvedValueOnce("tori")
            .mockResolvedValueOnce("oiseau");

        const result = await promptUserForInput(mockAsk, "とり", ["tori", "oiseau"]);

        expect(result).toBe(true);
    })

    test("Should select a kana, and giving the correct traduction and correct roumanji it should return a success 2", async () => {
        const mockAsk = jest.fn()
            .mockResolvedValueOnce("oiseau")
            .mockResolvedValueOnce("tori");

        const result = await promptUserForInput(mockAsk, "とり", ["oiseau", "tori"]);

        expect(result).toBe(true);
    })

    test("Should select a kana, and giving the a false traduction and correct roumanji it should return a failure", async () => {
        const mockAsk = jest.fn()
            .mockResolvedValueOnce("oiseau")
            .mockResolvedValueOnce("tori");

        const result = await promptUserForInput(mockAsk, "とり", ["porte", "tori"]);

        expect(result).toBe(false);
    })

    test("Should select a kana, and giving the a false traduction and correct roumanji it should return a failure", async () => {
        const mockAsk = jest.fn()
            .mockResolvedValueOnce("oiseau")
            .mockResolvedValueOnce("tori");

        const result = await promptUserForInput(mockAsk, "とり", ["oiseau", "teri"]);

        expect(result).toBe(false);
    })
})