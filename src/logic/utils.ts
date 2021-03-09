
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
