import {Book, Dictionary} from "@/logic/models";

export const book: Book = {
    name: "LingoDeer Japanese 1 Words",
    description: "",
    publication: "",
    chapters: [
        {
            name: 'Section 1',
            description: 'From Nationalities to Language.',
            subchapters: [
                { name: 'Nationalities', words: ['韓国人','アメリカ人','中国人','イギリス人','日本人'] },
                { name: 'Profession', words: ['学生','医者','先生','留学生','会社員'] },
                { name: 'People', words: ['女の人','男の人'] },
                { name: 'Everyday Items', words: ['手紙','雑誌','新聞','本'] },
                { name: 'My House', words: ['椅子','机','カメラ','テレビ'] },
                { name: 'Language', words: ['英語','日本語','中国語','映画'] },
            ]
        },
        {
            name: 'Section 2',
            description: 'From Possession 1 to Negation.',
            subchapters: [
                { name: 'Possession 1', words: ['傘','時計','かばん','パソコン','ハンカチ','辞書'] },
                { name: 'At School', words: ['教室','会議室','トイレ','図書館','学校','事務室'] },
                { name: 'Public Spaces', words: ['レストラン','映画館','銀行','本屋','病院','デパート','郵便局','喫茶店'] },
                { name: 'Existence 1', words: ['公園','部屋','花','石','庭'] },
                { name: 'Humans & Animals 1', words: ['子供','犬','猫','居間'] },
                { name: 'Location', words: ['下','上','前','後ろ','箱','ベッド','隣','薬','中'] },
                { name: 'Existence 2', words: ['ビール','リンゴ','冷蔵庫','紅茶','茶碗','グラス'] },
                { name: 'Humans & Animals 2', words: ['外','横','車','家','木','魚','鳥'] },
                { name: 'Negation', words: ['ペン','ペット','消しゴム','社長','財布'] },
            ]
        },
        {
            name: 'Section 3',
            description: '',
            subchapters: [
                { name: '', words: [''] },
                { name: '', words: [''] },
                { name: '', words: [''] },
            ]
        }
    ],
}

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
