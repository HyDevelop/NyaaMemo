/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import {Book, Chapter, Dictionary, Word} from "../src/logic/models.ts";
import {books} from "../src/logic/dictionary-prototype.ts";

console.log("Generating dictionary json from prototypes and jisho.org")

// Create dictionary
const dictionary: Dictionary = {
    name: `Jisho.org (Auto-Generated on ${new Date().toLocaleDateString("en-US")})`,
    author: "Jisho.org",
    description: "",
    license: "",
    words: {}
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

    // const dataList = obj.data.filter((it: any) => it.slug == w)
    //
    // if (dataList.size == 0)
    // {
    //     console.log(`Data for ${w} not found.`)
    //     return
    // }

    const data = obj.data[0]

    if (data == undefined)
    {
        console.log(`Data for ${w} is undefined`)
        return
    }

    // Add to dictionary
    dictionary.words[w] = {
        word: [w, data.japanese[0].reading],
        definition: data.senses.map((it: any) => it.parts_of_speech[0] + " | " + it.english_definitions),
        sentences: [],
    }
    console.log(JSON.stringify(dictionary))
}

/**
 * Download words in a chapter
 */
async function scanChapter(c: Chapter)
{
    // Scan all sub-chapters first
    if (c.subchapters)
    {
        c.subchapters.forEach((it: Chapter) => scanChapter(it))
    }

    // Download individual words
    if (c.words)
    {
        for (const it of c.words)
        {
            await downloadWord(it);
        }
    }
}

for (const book of books)
{
    for (const chapter of book.chapters)
    {
        await scanChapter(chapter)
    }
}


