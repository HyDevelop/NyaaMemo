/**
 * Get the definition of a word in the list of dictionaries
 */
import {Dictionary, Word} from "@/logic/models";
import {isAlpnum, similarity} from "@/logic/utils";
import {toRomaji} from "wanakana";

/**
 * Search result data class
 */
export interface SearchResult
{
    word: Word;
    matchingForm: string;
    match: number;

    matchInDefinition: boolean;
}

/**
 * Get the definition of a word from the first dictionary that the word exists in
 *
 * @param word A word
 * @param dictionaries A list of dictionaries ranked by preference
 */
export function getDefinition(word: string, dictionaries: Dictionary[]): Word
{
    for (const d of dictionaries) if (d.words[word]) return d.words[word]
    console.error(`Word for ${word} not found`)
    return null as never as Word
}

/**
 * Search for a word in a list of dictionaries
 *
 * @param term Search term
 * @param dictionaries A list of dictionaries ranked by preference
 */
export function searchWords(term: string, dictionaries: Dictionary[]): SearchResult[]
{
    term = term.toLowerCase()

    // No input
    if (!term) return []

    // Create result word array
    const added = new Set<string>([])
    const resultWords: SearchResult[] = []
    function addWord(w: Word, f: string, m: number, md: boolean)
    {
        added.add(w.word[0]);
        resultWords.push({ word: w, matchingForm: f, match: m, matchInDefinition: md })
    }

    // Romaji mode
    const romajiMode = isAlpnum(term)

    // Loop through all dictionaries
    for (const dict of dictionaries)
    {
        // Find exact matches
        if (!added.has(term) && dict.words[term]) addWord(dict.words[term], term, 120, false)

        // Find word-form matches
        outer:for (const [s, word] of Object.entries(dict.words))
        {
            // Word already included
            if (added.has(s)) continue

            // Search word's forms
            for (let form of word.word)
            {
                // Romaji mode, convert word form to romaji
                if (romajiMode) form = toRomaji(form)

                // Contains keyword
                if (form.includes(term))
                {
                    // Exact match or find similarity
                    if (form == term) addWord(word, form, 110, false)
                    else addWord(word, form, 100 * similarity(form, term), false)
                    continue outer
                }
            }

            // Search in definition
            if (!romajiMode) continue
            for (const def of word.definition)
            {
                // Contains keyword
                if (def.includes(term))
                {
                    let maxSimilarity = 0

                    // Split definition into words
                    for (const wordInDef of def.toLowerCase().split(/[^a-z]/g))
                    {
                        // Exact match
                        if (wordInDef == term)
                        {
                            addWord(word, def, 105, true)
                            continue outer
                        }

                        // Partial match, find max similarity
                        if (wordInDef.includes(term)) maxSimilarity = Math.max(maxSimilarity, similarity(wordInDef, term) * .5)
                    }

                    // Add partial match word
                    if (maxSimilarity != 0)
                    {
                        addWord(word, def, maxSimilarity, true)
                        continue outer
                    }
                }
            }
        }
    }

    // Sort descending
    resultWords.sort((a, b) => b.match - a.match)

    return resultWords
}
