<template>
    <div id="WordSelection" class="fbox-v mh0">
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
            <div v-for="book in books" :key="book.name" class="ws-container books fbox-h">
                <div class="icon fbox-vcenter">
                    <i :class="icon(book)"></i>
                </div>
                <div class="details fbox-vcenter f-h-expand">
                    <div class="upper-row">
                        <span class="title">{{ book.name }}</span>
                    </div>
                    <div class="lower-row fbox-h secondary">
                        <span class="description nowrap e f-h-expand">{{ book.description }}</span>
                        <span class="word-count">({{ allWords(book).length }} words)</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Only show when search bar is not empty -->
        <div v-if="search" id="word-search" class="hy-card">
            <div v-for="w of searchedWords" :key="w.title" class="ws-container words fbox-h">
                <div class="word-left fbox-vcenter f-h-expand">
                    <div class="upper">
                        <span class="term f-h-expand" v-html="w.w"></span>
                        <span class="matching" v-html="w.mf"></span>
                    </div>
                    <div class="desc secondary nowrap e" v-html="w.d"></div>
                </div>
                <div class="word-right fbox-vcenter" @click="addWord(w)">
                    <i v-if="!isAdded(w)" class="el-icon-circle-plus-outline"/>
                    <i v-else class="el-icon-success" style="color: #88d88b"/>
                </div>
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
import {highlight} from "@/logic/utils";
import {local} from "@/store";
import {checkDailyProgress} from "@/logic/algorithm";

interface SR2 extends SearchResult
{
    w?: string;
    mf?: string;
    d?: string;
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

    /**
     * Get search results
     */
    get searchedWords(): SR2[]
    {
        // Search
        const searchTerm = this.search.toLowerCase()
        const searchResults = searchWords(searchTerm, dictionaries)

        // Highlight matching places
        return searchResults.map(it =>
        {
            const sr: SR2 = it as SR2
            sr.w = sr.word.word[0]
            sr.d = sr.word.definition[0]
            sr.mf = ''

            // Only display matching form separately if matching form differs from the word
            if (sr.matchingForm == sr.w) sr.w = highlight(sr.w, searchTerm)
            else if (sr.matchInDefinition) sr.d = highlight(sr.matchingForm, searchTerm)
            else sr.mf = `(${highlight(sr.matchingForm, searchTerm)})`

            return sr
        })
    }

    /**
     * Check if a word is already added to the list
     */
    isAdded(word: SR2)
    {
        // TODO: Implement this after user word list is implemented
        return local().hasWord(word.word.word[0])
    }

    /**
     * Add a word to the user's study list
     */
    addWord(word: SR2)
    {
        const w = word.word.word[0]

        // Add
        if (!local().hasWord(w))
        {
            local().addWord(w)
            checkDailyProgress()
        }

        // Remove
        else
        {
            // @ts-ignore Send out confirmation message
            this.$confirm(`Are you sure you want to remove the word from your study list?
                This cannot be undone (unless you're a time traveler).`, {
                confirmButtonText: 'はい',
                cancelButtonText: 'いいえ'
            }).then(() => {
                local().removeWord(w)
                checkDailyProgress()

                // @ts-ignore Send out success notification
                this.$message({
                    type: 'success',
                    message: 'You removed the word'
                });
            }).catch();
        }
    }
}
</script>

<style lang="sass" scoped>
@import "src/css/global"

#WordSelection
    width: $app-width
    margin: 0 auto

.hy-card
    overflow-y: auto

.secondary
    font-size: smaller
    color: gray

.ws-container
    height: 50px
    margin: 0 20px
    border-bottom: 1px solid rgb(black, .1)
    text-align: left
    font-size: small

// Book list
.ws-container.books
    .icon
        margin-right: 15px
        font-size: medium

    .description
        margin-right: 5px

// Search result
.ws-container.words
    .term
        margin-right: 5px

    // Add (+) button
    .word-right
        font-size: large
        color: gray
        padding-left: 10px
        text-align: right

</style>
