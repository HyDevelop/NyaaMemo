
export interface Deck
{
    cards: Word[];
    wordIndex: [];
}

export interface Word
{
    word: string[];
    definition: string[];
    sentences: SampleSentence[];
    otherAnswers?: string[];
}

export interface SampleSentence
{
    s: string; // Sentence
    tr: string; // Translation
}

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
 * A book contains the order of words in a textbook, without definitions
 */
export interface Book
{
    name: string;
    description: string;
    publication: string;

    chapters: Chapter[];
}

export interface Chapter
{
    name: string;
    description?: string;

    subchapters?: Chapter[];
    words?: string[];
}
