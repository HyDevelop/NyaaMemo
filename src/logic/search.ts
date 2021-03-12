/**
 * Get the definition of a word in the list of dictionaries
 */
import {Dictionary, Word} from "@/logic/models";
import {isAlpnum, similarity} from "@/logic/utils";
import {toRomaji} from "wanakana";

/**
 * Search result data class
 */
interface SearchResult
{
    title: string;
    desc: string;
    match: number;
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
    const resultWords: { word: string; match: number }[] = []
    function addWord(w: string, m: number) { added.add(w); resultWords.push({ word: w, match: m }) }

    // Romaji mode
    const romajiMode = isAlpnum(term)

    // Loop through all dictionaries
    for (const dict of dictionaries)
    {
        // Find exact matches
        if (!added.has(term) && dict.words[term]) addWord(term, 120)

        // Find word-form matches
        for (const [s, word] of Object.entries(dict.words))
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
                    if (form == term) addWord(s, 119)
                    else addWord(s, 100 * similarity(form, term))
                    break
                }
            }
        }
    }

    // Convert word list to search result lists
    return resultWords.map(it =>
    {
        const d = getDefinition(it.word, dictionaries)
        return { title: it.word, desc: d.definition[0], match: it.match }
    })
}
