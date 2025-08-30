import {readRandomJsonData, promptUserForInput} from "./kanjiPart"
import kanji from "@data/kanji.json"

describe('Read the json file', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Should import the JSON file", () => {
        expect(kanji).toBeDefined();
        expect(Array.isArray(kanji)).toBe(true);
    })

    test("Should return an array with kanji first", () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.25);
        expect(readRandomJsonData(0)[0]).toEqual("kanji")
    })

    test("Should return an array with kana first", () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.26);
        expect(readRandomJsonData(0)[0]).toEqual("kana")
    })

    test("Should return an array with roumanji first", () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.27);
        expect(readRandomJsonData(0)[0]).toEqual("roumanji")
    })

    test("Should return an array with traduction first", () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.28);
        expect(readRandomJsonData(0)[0]).toEqual("traduction")
    })

    test("Should return an array with description first", () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.24);
        expect(readRandomJsonData(0)[0]).toEqual("description")
    })
})

describe('Quizz part', () => {

    test("Should select a kanji, and giving the correct traduction and correct roumanji it should return a success", async () => {
        const mockAsk = jest.fn()
            .mockResolvedValueOnce("わたし")
            .mockResolvedValueOnce("je");

        const result = await promptUserForInput(mockAsk, "私", ["je", "わたし"]);

        expect(result).toBe(true);
    })

    test("Should select a kanji, and giving the correct traduction and correct roumanji it should return a success", async () => {
        const mockAsk = jest.fn()
            .mockResolvedValueOnce("je")
            .mockResolvedValueOnce("わたし");

        const result = await promptUserForInput(mockAsk, "私", ["je", "わたし"]);

        expect(result).toBe(true);
    })

    test("Should select a kanji, and giving the a false traduction and correct roumanji it should return a failure", async () => {
        const mockAsk = jest.fn()
            .mockResolvedValueOnce("je")
            .mockResolvedValueOnce("わたし");

        const result = await promptUserForInput(mockAsk, "私", ["ja", "わたし"]);

        expect(result).toBe(false);
    })

    test("Should select a kanji, and giving the a false traduction and correct roumanji it should return a failure", async () => {
        const mockAsk = jest.fn()
            .mockResolvedValueOnce("je")
            .mockResolvedValueOnce("わたし");

        const result = await promptUserForInput(mockAsk, "私", ["je", "わた"]);

        expect(result).toBe(false);
    })


    test("Should select a roumanji, and giving the correct traduction and correct kanji it should return a success", async () => {
        const mockAsk = jest.fn()
            .mockResolvedValueOnce("je")
            .mockResolvedValueOnce("私");

        const result = await promptUserForInput(mockAsk, "わたし", ["je", "私"]);

        expect(result).toBe(true);
    })

    test("Should select a description, and giving the correct traduction and correct kanji and correct roumanji it should return a success", async () => {
        const mockAsk = jest.fn()
            .mockResolvedValueOnce("je")
            .mockResolvedValueOnce("わたし")
            .mockResolvedValueOnce("私");

        const result = await promptUserForInput(mockAsk, "私", ["je", "私", "わたし"]);

        expect(result).toBe(true);
    })

    test("Should select a traduction, and giving the correct roumanji and correct kanji it should return a success", async () => {
        const mockAsk = jest.fn()
            .mockResolvedValueOnce("私")
            .mockResolvedValueOnce("わたし");

        const result = await promptUserForInput(mockAsk, "Je", ["わたし", "私"]);

        expect(result).toBe(true);
    })
})