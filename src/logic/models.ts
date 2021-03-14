/**
 * A dictionary contains words and its definitions
 */
import Settings from "@/logic/settings";

export interface Dictionary
{
    name: string;
    description: string;
    author: string;
    license: string;
    wordLanguage: string;
    definitionLanguage: string;

    // words['word (main form)'] = Word
    // Indexes should be built subsequently on client side
    words: {[id: string]: Word};
}

/**
 * A word contains different forms of the word, different definitions, sample sentences,
 * and other acceptable answers beside from the word forms
 */
export interface Word
{
    word: string[];
    definition: string[];
    sentences: SampleSentence[];
    otherAnswers?: string[];
}

/**
 * A sample sentence contains a sentence and the translation for that sentence
 */
export interface SampleSentence
{
    s: string; // Sentence
    tr: string; // Translation
}

/**
 * A book contains the order of words in a textbook, without definitions
 */
export interface Book
{
    name: string;
    description: string;
    publication?: string;
    type?: string;

    chapters: Chapter[];
}

/**
 * Chapter in a book contains subchapters or words
 */
export interface Chapter
{
    name: string;
    description?: string;

    subchapters?: Chapter[];
    words?: string[];
}

/**
 * Local user data
 */
export interface LocalData
{
    /** Is user logged in */
    loggedIn: boolean;

    /** Long-term word list */
    longTermProgress: LTProgress;

    /** Daily progress */
    dailyProgress?: DailyProgress;

    /** User settings */
    settings: Settings;
}

/**
 * Progress data for today. Completed words are immediately transferred to a DayLogPoint in longTermWords.
 *
 * 1. If the day was not completed after the day ended, or if the user switched algorithms,
 *   - add the completed words to long-term list and
 *   - ignore the non-completed words, then start a new day
 */
export interface DailyProgress
{
    day: number; // Day in the form of HyDate (number of days since 2021-Jan-1)
    algorithm: string;
    wordsInProgress: DailyWordProgress[];
}

/**
 * Memorization progress for one word on this day
 */
export interface DailyWordProgress
{
    word: string;
    timeLog: DailyLogPoint;
}

/**
 * Log point for one word on a specific time
 */
export interface DailyLogPoint
{
    time: Date;
    rd: RememberDifficulty;
}

/**
 * Long-term word list for a user
 */
export type LTProgress = LTWordProgress[]

/**
 * User memorization progress for a word
 */
export interface LTWordProgress
{
    word: string;
    dayLog: LTLogPoint[];
}

/**
 * Log point for one word on one day
 */
export interface LTLogPoint
{
    hyDate: number;
    rd: RememberDifficulty;
}

/**
 * How difficult is it to remember a word
 */
export enum RememberDifficulty
{
    easy, hard, forgot
}
