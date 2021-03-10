
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
