
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
    otherAnswers: string[] | null;
}

export interface SampleSentence
{
    sentence: string;
    translation: string;
}
