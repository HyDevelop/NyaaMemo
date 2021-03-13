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

    // Replace full-width brackets
    okurigana = okurigana.replaceAll("（", "(").replaceAll("）", ")")

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

/**
 * Find the number of changes required for one string to become another string
 * https://stackoverflow.com/a/36566052/7346633
 */
export function editDistance(s1: string, s2: string)
{
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    const costs: number[] = [];

    for (let i = 0; i <= s1.length; i++)
    {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++)
        {
            if (i == 0) costs[j] = j;
            else
            {
                if (j > 0)
                {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                    {
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    }
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0) costs[s2.length] = lastValue;
    }

    return costs[s2.length];
}

/**
 * Find the similarity proportion between two strings
 * https://stackoverflow.com/a/36566052/7346633
 */
export function similarity(s1: string, s2: string)
{
    let longer = s1;
    let shorter = s2;

    if (s1.length < s2.length)
    {
        longer = s2;
        shorter = s1;
    }

    const longerLength = longer.length;
    if (longerLength == 0) return 1.0;
    return (longerLength - editDistance(longer, shorter)) / longerLength;
}

/**
 * Check if a string only contains english alphanumeric or not
 */
export function isAlpnum(s: string)
{
    return /^[a-z0-9 -]*$/.test(s.toLowerCase())
}

/**
 * Highlight a string
 */
export function highlight(s: string, sub: string)
{
    return s.replaceAll(sub, `<span class="color-highlight">${sub}</span>`)
}


// ///////////////////// //
// Console Logging Utils //
// ///////////////////// //

const logPrefixCss = 'border-radius: 10px; padding: 1px 5px;'

export function error(s: string)
{
    console.error(`%cERROR%c ${s}`, 'background: #ffe1e1; color: red;' + logPrefixCss, 'background: unset; color: red')
}

export function warning(s: string)
{
    console.log(`%cWARN%c ${s}`, 'background: #fdf6ec; color: #E6A23C;' + logPrefixCss, 'background: unset')
}

export function info(s: string)
{
    console.log(`%cINFO%c ${s}`, 'background: #f0f9eb; color: #67C23A;' + logPrefixCss, 'background: unset')
}
