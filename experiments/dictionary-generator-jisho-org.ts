/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import {Book, Chapter, Dictionary, Word} from "../src/logic/models.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import {books} from "../src/logic/dictionary-prototype.ts";

console.log("Generating dictionary json from prototypes and jisho.org")

// Remember to replace /,(?!\n| )/g with ', '

// Create dictionary
const dictionary: Dictionary = {
    name: `Jisho.org (Auto-Generated on ${new Date().toLocaleDateString("en-US")})`,
    author: "Jisho.org",
    description: "",
    license: "",
    words: {}
}

// All words
const words: string[] = []

/**
 * Add chapters to the word list
 */
function scanChapter(c: Chapter)
{
    // Add words to the list
    if (c.words)
    {
        words.push(...c.words)
    }

    // Scan all sub-chapters
    if (c.subchapters)
    {
        c.subchapters.forEach((it: Chapter) => scanChapter(it))
    }
}

/**
 * Scan all words in all books into the word list
 */
for (const book of books)
{
    for (const chapter of book.chapters)
    {
        scanChapter(chapter)
    }
}

/**
 * Download a single word into the dictionary
 */
async function downloadWord(w: string)
{
    if (!w) return

    const res = await fetch(`https://jisho.org/api/v1/search/words?keyword=${w}`)
    const txt = await res.text()
    const obj = JSON.parse(txt)

    const data = obj.data[0]

    if (data == undefined)
    {
        dictionary.words[w] = {
            word: [w, 'undefined'],
            definition: ['Error: undefined'],
            sentences: []
        }

        console.log(`Data for ${w} is undefined`)
        return
    }

    // Add to dictionary
    dictionary.words[w] = {
        word: [w, data.japanese[0].reading],
        definition: data.senses.map((it: any) => it.parts_of_speech[0] + " | " + it.english_definitions),
        sentences: [],
    }
}

for (const w of words)
{
    await downloadWord(w)
}


// Done
console.log(JSON.stringify(dictionary))
