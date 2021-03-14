import {local} from "@/store";
import {hyDate} from "@/logic/utils";
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
