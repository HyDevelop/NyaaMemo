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

    /** Should the daily words be shuffled before presented? */
    shuffleDailyWords: boolean;
}
