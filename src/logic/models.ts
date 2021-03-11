
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
    publication: string;

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
 * How difficult is it to remember a word
 */
export enum RememberDifficulty
{
    easy, hard, forgot
}
