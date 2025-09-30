import { shuffleArray, promptUserForInput, AskFunction } from "./QuizzFunctions"
import hiragana from "@data/hiragana.json"
import katakana from "@data/katakana.json"
import kanaword from "@data/kana.json"
import kanji from "@data/kanji.json"

describe("hiragana", () => {
    describe('Read the json file', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Should import the JSON file", () => {
        expect(hiragana).toBeDefined();
        expect(Array.isArray(hiragana)).toBe(true);
    })

    test("returns a new array with the same elements (shuffled)", () => {
        const input = hiragana[0];
        const result = shuffleArray(input);

        // It should not be the same reference
        expect(result).not.toBe(input);

        // It should have the same elements
        expect(result.sort()).toEqual(input.sort());
    })

    test("does not mutate the original array", () => {
        const input = hiragana[0];

        const copy = [...input];
        shuffleArray(input);
        expect(input).toEqual(copy);
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
});

describe("katakana", () => {
    describe('Read the json file', () => {
        afterEach(() => {
            jest.restoreAllMocks();
        });

        test("Should import the JSON file", () => {
            expect(katakana).toBeDefined();
            expect(Array.isArray(katakana)).toBe(true);
        })

        test("returns a new array with the same elements (shuffled)", () => {
            const input = katakana[0];
            const result = shuffleArray(input);

            // It should not be the same reference
            expect(result).not.toBe(input);

            // It should have the same elements
            expect(result.sort()).toEqual(input.sort());
        })

        test("does not mutate the original array", () => {
            const input = katakana[0];

            const copy = [...input];
            shuffleArray(input);
            expect(input).toEqual(copy);
        })
    })
    

    describe("promptUserForInput", () => {
        test("Should select an katakana and given the right roumanji it should be a success", async () => {
            const mockAsk = jest.fn().mockResolvedValue("o");
            const result = await promptUserForInput(mockAsk, "お", "o");
        
            expect(result).toBe(true);
        })
        
        test("Should select an katakana and given the wrong roumanji it should be a failure", async () => {
            const mockAsk = jest.fn().mockResolvedValue("u");
            const result = await promptUserForInput(mockAsk, "お", "o");
        
            expect(result).toBe(false);
        })
    });
});

describe("kana words", () => {
    describe('Read the json file', () => {
        afterEach(() => {
            jest.restoreAllMocks();
        });
    
        test("Should import the JSON file", () => {
            expect(kanaword).toBeDefined();
            expect(Array.isArray(kanaword)).toBe(true);
        })
    
        test("returns a new array with the same elements (shuffled)", () => {
            const input = kanaword[0];
            const result = shuffleArray(input);
        
            // It should not be the same reference
            expect(result).not.toBe(input);
        
            // It should have the same elements
            expect(result.sort()).toEqual(input.sort());
        })
    
        test("does not mutate the original array", () => {
            const input = kanaword[0];
        
            const copy = [...input];
            shuffleArray(input);
            expect(input).toEqual(copy);
        })
    })

    describe("promptUserForInput", () => {
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
    });
});

describe("kanji", () => {
    describe('Read the json file', () => {
        afterEach(() => {
            jest.restoreAllMocks();
        });
    
        test("Should import the JSON file", () => {
            expect(kanji).toBeDefined();
            expect(Array.isArray(kanji)).toBe(true);
        })
    
        test("returns a new array with the same elements (shuffled)", () => {
            const input = kanji[0];
            const result = shuffleArray(input);
        
            // It should not be the same reference
            expect(result).not.toBe(input);
        
            // It should have the same elements
            expect(result.sort()).toEqual(input.sort());
        })
    
        test("does not mutate the original array", () => {
            const input = kanji[0];
        
            const copy = [...input];
            shuffleArray(input);
            expect(input).toEqual(copy);
        })
    })

    describe("promptUserForInput", () => {
        test("Should select a kanji, and giving the correct traduction, furigana and correct roumanji it should return a success", async () => {
            const mockAsk = jest.fn()
                .mockResolvedValueOnce("わたし")
                .mockResolvedValueOnce("watashi")
                .mockResolvedValueOnce("je");
            
            const result = await promptUserForInput(mockAsk, "私", ["je", "わたし", "watashi"]);
            
            expect(result).toBe(true);
        })
      
        test("Should select a kanji, and giving the a false traduction, but a correct furigana and correct roumanji it should return a failure", async () => {
            const mockAsk = jest.fn()
                .mockResolvedValueOnce("je")
                .mockResolvedValueOnce("watashi")
                .mockResolvedValueOnce("わたし");
        
            const result = await promptUserForInput(mockAsk, "私", ["ja", "watashi", "わたし"]);
        
            expect(result).toBe(false);
        })
      
        test("Should select a kanji, and giving the a false traduction but the correct furigana and correct roumanji it should return a failure", async () => {
            const mockAsk = jest.fn()
                .mockResolvedValueOnce("je")
                .mockResolvedValueOnce("watashi")
                .mockResolvedValueOnce("わたし");
        
            const result = await promptUserForInput(mockAsk, "私", ["je", "watashi", "わた"]);
        
            expect(result).toBe(false);
        })
  
  
        test("Should select a roumanji, and giving the correct traduction, furigana and correct kanji it should return a success", async () => {
            const mockAsk = jest.fn()
                .mockResolvedValueOnce("je")
                .mockResolvedValueOnce("watashi")
                .mockResolvedValueOnce("私");
  
            const result = await promptUserForInput(mockAsk, "わたし", ["je", "watashi", "私"]);
  
            expect(result).toBe(true);
        })

        test("Should select a furigana, and giving the correct traduction, roumanji and correct kanji it should return a success", async () => {
            const mockAsk = jest.fn()
                .mockResolvedValueOnce("je")
                .mockResolvedValueOnce("わたし")
                .mockResolvedValueOnce("私");
  
            const result = await promptUserForInput(mockAsk, "watashi", ["je", "わたし", "私"]);
  
            expect(result).toBe(true);
        })
    });
});