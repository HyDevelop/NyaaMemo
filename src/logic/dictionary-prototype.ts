// Use this import statement when using deno:
// import {Book, Dictionary} from "./models.ts";

import {Book, Dictionary} from "@/logic/models";
import jisho from "@/logic/jisho-filtered.json"

const book: Book = require('@/data/lingodeer1.json5').default as Book;
const book2: Book = require('@/data/lingodeer2.json5').default as Book;
export const dictionary: Dictionary = require('@/data/hy-personal-dict.json5').default as Dictionary

export const books: Book[] = [book, book2, { name: "标准日本语", description: "TODO", type: 'book', chapters: [] },
    { name: "Hykilpikonna's Personal Set", description: "一个很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的说明",
         chapters: [] }]
export const dictionaries: Dictionary[] = [dictionary, jisho]

// console.log(JSON.stringify(book))

