<template>
    <div id="WordSelection" class="flex-v">
        <div id="page-desc">
            <h2>Word Selection</h2>
            <p>You can select words and add them to your list on this screen.
                You can either find words through direct searching or by adding them through a book.</p>
        </div>

        <div class="input-container">
            <HyInput placeholder="Search..." v-model="search"></HyInput>
        </div>

        <!-- Only show when search bar is empty -->
        <div v-if="!search" id="books" class="hy-card">
            <div v-for="book in books" :key="book.name" class="ws-container books flex-h">
                <div class="icon flex-vcenter">
                    <i :class="icon(book)"></i>
                </div>
                <div class="details flex-vcenter">
                    <div class="upper-row">
                        <span class="title">{{ book.name }}</span>
                    </div>
                    <div class="lower-row flex-h secondary">
                        <span class="description nowrap e">{{ book.description }}</span>
                        <span class="word-count">({{ allWords(book).length }} words)</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Only show when search bar is not empty -->
        <div v-if="search" id="word-search" class="hy-card">
            <div v-for="w of searchedWords" :key="w.title" class="ws-container words flex-vcenter">
                <div class="upper">
                    <span class="term" v-html="w.w"></span>
                    <span class="matching" v-html="w.mf"></span>
                </div>
                <div class="desc secondary">{{w.word.definition[0]}}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import HyInput from "@/components/HyInput.vue";
import {books, dictionaries} from "@/logic/dictionary-prototype";
import {Book, Chapter} from "@/logic/models";
import {SearchResult, searchWords} from "@/logic/search";

interface SR2 extends SearchResult
{
    w?: string;
    mf?: string;
}

@Options({components: {HyInput}})
export default class WordSelection extends Vue
{
    search = ""
    books = books

    /**
     * Get all of the words from this book
     */
    allWords(book: Book): string[]
    {
        const words: string[] = []
        function scanChapter(c: Chapter)
        {
            if (c.words) words.push(...c.words)
            if (c.subchapters) c.subchapters.forEach(it => scanChapter(it))
        }
        book.chapters.forEach(c => scanChapter(c))
        return words
    }

    /**
     * Get the element UI icon of a book
     */
    icon(book: Book): string
    {
        switch (book.type)
        {
            case 'book': return 'el-icon-collection'
            case 'platform': return 'el-icon-mobile'
            default: return 'el-icon-files'
        }
    }

    get searchedWords(): SR2[]
    {
        // Search
        const searchTerm = this.search.toLowerCase()
        const searchResults = searchWords(searchTerm, dictionaries)

        // Highlight matching places
        searchResults.map(it =>
        {
            const sr: SR2 = it as SR2
            sr.w = sr.word.word[0]
            sr.mf = sr.matchingForm.replace(searchTerm, `<span class="color-highlight">${searchTerm}</span>`)

            // Only display matching form separately if matching form differs from the word
            if (sr.matchingForm == sr.w)
            {
                sr.w = sr.mf
                sr.mf = ''
            }
            else sr.mf = `(${sr.mf})`

            return sr
        })
        console.log(searchResults)
        return searchResults
    }
}
</script>

<style lang="sass" scoped>
@import "../global"

#WordSelection
    width: $app-width
    margin: 0 auto

#page-desc
    margin-bottom: 20px

.secondary
    font-size: smaller
    color: gray

.ws-container
    height: 50px
    margin: 0 20px
    border-bottom: 1px solid rgb(black, .1)
    text-align: left
    font-size: small

.ws-container.books
    .details
        flex: 1 0

    .icon
        margin-right: 15px
        font-size: medium

    .description
        margin-right: 5px
        flex: 1 0

.ws-container.words
    .term
        margin-right: 5px
        flex: 1 0

</style>
