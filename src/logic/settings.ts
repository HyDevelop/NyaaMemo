/**
 * This interface is the data model for settings. Default values can be found in /src/store/index.ts
 */
export default interface Settings
{
    /** How many words is the user willing to memorize/review per day */
    maxPerDay: number;

    /**
     * Long-term Spaced repetition system Pattern.
     *
     * x = How many days since the user last forgot the word
     * y = Δ day (how many days after the last remembrance would the user be required to recall the word)
     * ltSRddPattern[x] = y
     */
    ltSrsPattern: number[];

    /**
     * Short-term Spaced repetition system Pattern for Hard-to-remember words
     *
     * x = How many words have passed since the user last found the word hard to remember
     * y = Δ words (how many words after the last remembrance would the user be required to recall the word)
     * stSrsPatternHard[x] = y
     */
    stSrsPatternHard: number[];

    /**
     * Short-term Spaced repetition system Pattern for Forgotten words
     *
     * x = How many words have passed since the user last forgot the word
     * y = Δ words (how many words after the last remembrance would the user be required to recall the word)
     * stSrsPatternForgot[x] = y
     */
    stSrsPatternForgot: number[];

    /** Should the daily words be shuffled before presented? */
    shuffleDailyWords: boolean;
}
