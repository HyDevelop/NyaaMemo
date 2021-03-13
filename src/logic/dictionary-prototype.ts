// Use this import statement when using deno:
// import {Book, Dictionary} from "./models.ts";

import {Book, Dictionary} from "@/logic/models";
import jisho from "@/logic/jisho-filtered.json"

const book: Book = {
    name: "LingoDeer Japanese 1 Words",
    description: "Around n5",
    publication: "",
    type: 'platform',
    chapters: [
        {
            name: 'Section 1',
            description: 'From Nationalities to Language.',
            subchapters: [
                { name: 'Nationalities', words: ['韓国人','アメリカ人','中国人','イギリス人','日本人'] },
                { name: 'Profession', words: ['学生','医者','先生','留学生','会社員'] },
                { name: 'People', words: ['女の人','男の人','女の子','男の子'] },
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
            description: 'From Numbers to Animals 2',
            subchapters: [
                { name: 'Numbers', words: ['一','二','三','四','五','六','七','八','九','十',
                        '二十九','六十五','十一','三十八','七十四'] },
                { name: 'Time', words: ['午前','午後','一時','四時','七時','九時',
                        '一分','二分','三分','四分','六分','八分','十分', '二時十分','十時半'] },
                { name: 'The Week', words: ['月曜日','火曜日','水曜日','木曜日','金曜日','土曜日','日曜日', '今日','明日','明後日'] },
                { name: 'Shopping', words: ['百','三百','六百','八百','千','三千','八千','万','円','幾ら'] },
                { name: 'My Family', words: ['お母さん','お父さん','お爺さん','お婆さん','お姉さん','お兄さん', '母','父','姐','兄','娘','息子'] },
                { name: 'Weather', words: [''] },
                { name: 'Seasons', words: [''] },
                { name: 'Animals 1', words: [''] },
                { name: 'Animals 2', words: [''] },
                { name: '', words: [''] },
                { name: '', words: [''] },
                { name: '', words: [''] },
            ]
        }
    ],
}

const book2: Book = {
    name: "LingoDeer Japanese 2 Words",
    description: "Around n4",
    publication: "",
    type: 'platform',
    chapters: []
}

export const dictionary: Dictionary = {
    name: "Hy's Personal Dictionary",
    description: "Created for my own use, not really accurate",
    author: "Hykilpikonna",
    license: "CC0",
    wordLanguage: "japanese",
    definitionLanguage: "english",
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

export const books: Book[] = [book, book2, { name: "标准日本语", description: "TODO", type: 'book', chapters: [] },
    { name: "Hykilpikonna's Personal Set", description: "一个很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的说明",
         chapters: [] }]
export const dictionaries: Dictionary[] = [dictionary, jisho]

// console.log(JSON.stringify(book))

