
export interface Deck
{
    cards: Card[];
    wordIndex: [];
}

export interface Card
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
