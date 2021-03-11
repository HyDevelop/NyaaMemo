import * as wanakana from 'wanakana';

// https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
export function rand<T>(array: T[], n: number)
{
    // Shuffle array
    const shuffled = array.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    return shuffled.slice(0, Math.min(n, shuffled.length));
}

/**
 * Un-focus all buttons
 */
export function blurAll()
{
    for (const el of document.getElementsByClassName('el-button'))
    {
        if (el instanceof HTMLElement) el.blur()
    }
}

/**
 * Convert okurigana to furigana
 *
 * Okurigana marks the pronunciation in parenthesis, and furigana marks the pronunciation at the top of the kanji.
 */
export function okuriganaToFurigana(okurigana: string)
{
    // Already processed
    if (okurigana.includes("<ruby>")) return okurigana

    let result = ""
    let kanjiCache = ""

    // Loop through the entire string
    for (let i = 0; i < okurigana.length; i++)
    {
        const c = okurigana[i]

        // Is kanji
        if (wanakana.isKanji(c)) kanjiCache += c

        // Kanji cache is empty, and this is not a kanji
        else if (kanjiCache == '') result += c

        // Kanji cache is not empty, and this is a starting bracket
        else if (c == '(')
        {
            // Get the index of the ending bracket
            const endI = okurigana.indexOf(')', i)

            // No end bracket found, probably it wasn't properly formatted
            if (endI == -1)
            {
                console.log(`[Kanji] An error occurred when processing ${okurigana} - Ending bracket not found at ${i}`)
                return result + kanjiCache + okurigana.substring(i + 1)
            }

            // Get the hiragana pronunciation between the brackets
            const inner = okurigana.substring(i + 1, endI)

            // Add to result, clear cache, set i to after the ending bracket
            result += `<ruby>${kanjiCache}<rt>${inner}</rt></ruby>`
            kanjiCache = ''
            i = endI
        }

        // Kanji cache is not empty, and this is not a kanji nor a starting bracket
        //   (This is technically impossible if the string is in the correct format,
        //   but maybe the string is mistyped)
        else
        {
            console.log(`[Kanji] An error occurred when processing ${okurigana} - Unexpected symbol ${c}`)
            result += kanjiCache
            kanjiCache = ''
            result += c
        }
    }

    return result + kanjiCache
}
