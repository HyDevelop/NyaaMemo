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

        <div id="books" class="hy-card">
            <div v-for="book in books" :key="book.name" class="book-container flex-h">
                <div class="icon flex-vcenter">
                    <i :class="icon(book)"></i>
                </div>
                <div class="upper-row">
                    <span class="title">{{ book.name }}</span>
                </div>
                {{ allWords(book).length }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import HyInput from "@/components/HyInput.vue";
import {books} from "@/logic/dictionary-prototype";
import {Book, Chapter} from "@/logic/models";

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

    icon(book: Book): string
    {
        switch (book.type)
        {
            case 'book': return 'el-icon-collection'
            case 'platform': return 'el-icon-mobile'
            default: return 'el-icon-files'
        }
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

.book-container
    height: 50px
    margin: 0 20px
    border-bottom: 1px solid rgb(black, .1)

</style>
