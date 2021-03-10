import {Dictionary} from "@/logic/models";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const dictionary: Dictionary = {
    name: "Hy's Personal Dictionary",
    description: "Created for my own use, not really accurate",
    author: "Hykilpikonna",
    license: "CC0",
    words: {
        '猫': {
            word: ["猫", "ねこ"],
            definition: ["n. Cat", "<strike>n. God :o</strike>"],
            sentences: [
                {s: "私(わたし)は猫(ねこ)です", tr: "I'm a cat :3"},
                {s: "田中(たなか)さんは猫(ねこ)ではありません", tr: "Tanaka is not a cat"},
                {s: "あそこの公園(こうえん)に猫(ねこ)がたくさんいます", tr: "That park over there has a lot of cats"},
                {s: "猫(ねこ)は怖(こわ)くない", tr: "Cats are not scary"}
            ]
        }
    }
}
