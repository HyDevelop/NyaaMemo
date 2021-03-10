
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
