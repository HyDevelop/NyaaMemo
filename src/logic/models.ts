
/**
 * A dictionary contains words and its definitions
 */
export interface Dictionary
{
    name: string;
    description: string;
    author: string;
    license: string;

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
 * Long-term word list for a user
 */
export type LTWordList = WordProgress[]

/**
 * User memorization progress for a word
 */
export interface WordProgress
{
    word: string;
    dayLog: [];
}

/**
 * Log point for one word on one day
 */
export interface DayLogPoint
{
    date: number; // IMPORTANT! Date is a number that represents the number of days since 2021-Jan-1
    rd: RememberDifficulty;
}

/**
 * How difficult is it to remember a word
 */
export enum RememberDifficulty
{
    easy, hard, forgot
}
