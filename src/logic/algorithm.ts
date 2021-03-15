import {local} from "@/store";
import {hyDate, shuffle} from "@/logic/utils";
import {DailyProgress, DailyWordProgress, LTWordProgress, RememberDifficulty as RD} from "@/logic/models";

/**
 * Check if a word needs to be reviewed.
 *
 * @return Review priority (-1 means doesn't need to be reviewed)
 */
function needToBeReviewed(word: LTWordProgress, today?: number, ltSrsP?: number[]): number
{
    if (!today) today = hyDate(new Date())
    if (!ltSrsP) ltSrsP = local().settings.ltSrsPattern
    const dl = word.dayLog
    const dl0 = dl[0]

    // If dayLog[0] doesn't exist, that means the user hasn't started memorizing the word
    // Add it to the list, with an importance below every other review category
    if (!dl0) return 1;

    // If the user forgot the word the last time the user memorized it
    if (dl0.rd == RD.forgot) return 4;

    // If the user found it hard to remember the word two days ago
    if (dl0.rd == RD.hard)
    {
        if (today - dl0.hyDate >= 2) return 3;
        else return -1;
    }

    // If the user found it easy to remember last time,
    // Count how many days since the user last forgot/found it hard
    let roundsSinceForgot = dl.findIndex(it => it.rd != RD.easy)

    // If index = -1, it means that the user have never forgot the word,
    // Then rounds would equal the total day log count
    if (roundsSinceForgot == -1) roundsSinceForgot = dl.length

    // Use the srs pattern in settings to determine how many days after the last remembrance
    // If out of bounds, that means the user already mastered the word
    if (roundsSinceForgot >= ltSrsP.length) return -1
    const dt = ltSrsP[roundsSinceForgot]

    // Check if it needs to be reviewed
    if (today - dl0.hyDate >= dt) return 2;

    // It doesn't need to be reviewed
    return -1;
}

/**
 * Check and generate daily progress
 */
export function checkDailyProgress()
{
    const l = local()
    const limit = l.settings.maxPerDay
    const today = hyDate(new Date())
    const lsSrsP = l.settings.ltSrsPattern

    // Daily progress exists
    if (l.dailyProgress)
    {
        // If the daily progress is not from today,
        //   or if it is not generated using the current long-term algorithm, remove it
        if (l.dailyProgress.day != today || l.dailyProgress.algorithm != 'anki-ng')
        {
            l.dailyProgress = undefined
        }

        // If the max per day changed, just change the value, we don't have to regenerate anything
        if (l.dailyProgress && limit != l.dailyProgress.limit)
        {
            const dp = l.dailyProgress
            dp.limit = limit
            l.dailyProgress = dp
            return
        }
    }

    // If daily progress doesn't exist, generate new daily progress list.
    const dp: DailyProgress = l.dailyProgress || { day: today, algorithm: 'anki-ng', limit: limit, done: 0, currentIndex: 0, progress: [] }
    let dps: DailyWordProgress[] = []

    // Loop through all words in long-term list
    for (const word of l.longTermProgress)
    {
        // Get how much the word needs to be reviewed
        const importance = needToBeReviewed(word, today, lsSrsP)

        // Add to list
        if (importance != -1) dps.push({importance: importance, timeLog: [], word: word.word})
    }

    // Shuffle
    dps = shuffle(dps)

    // Sort by importance, descending
    dps.sort((a, b) => b.importance - a.importance)

    // Set dp
    dp.progress = dps
    l.dailyProgress = dp
}
