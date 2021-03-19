<template>
    <div v-if="w" id="word-input" class="fbox-v h100 mh0">
        <!-- Top section - The word -->
        <div id="div-title" class="f-no-shrink">
            <div id="word">{{ w.word[0] }}</div>
            <div id="wordForm2">{{ w.word[1] }}</div>
        </div>

        <!-- Middle section -->
        <div id="div-middle" class="f-grow1 mh0">
            <div v-if="answerShown" class="div-answer">
                <div class="ans-title">Definition</div>
                <div v-for="def in w.definition" :key="def" v-html="def"></div>
            </div>

            <div v-if="answerShown" class="div-answer">
                <div class="ans-title">Sentences</div>
                <div v-for="s in filteredSentences" :key="s.s">
                    <div class="sentence" v-html="s.s"></div>
                    <div class="translation">{{ s.tr }}</div>
                </div>
            </div>

            <div v-if="!answerShown" id="div-before-answer" class="clickable fbox-center h100" @click="revealAnswer">
                <div id="div-ba-inside">
                    <div style="color: gray">Please say the definition out loud.</div>
                    <div class="color-highlight">Click the screen to show the answer.</div>
                </div>
            </div>
        </div>

        <!-- Bottom section - Buttons -->
        <div v-if="answerShown" id="div-bottom">
            <div id="div-input">
                <el-input v-if="!answerShown && false /* TODO */" id="input" v-model="input"></el-input>
            </div>

            <div id="div-buttons" class="fbox-h">
                <el-button type="success" plain @click="clickDone(0)">簡単</el-button>
                <el-button type="warning" plain @click="clickDone(1)">難い</el-button>
                <el-button type="danger"  plain @click="clickDone(2)">忘れた</el-button>
            </div>
        </div>
    </div>

    <div v-else id="no-words-left" class="fbox-vcenter h100 unselectable">
        <div class="color-highlight">Congratulations!</div>
        <div style="color: gray">You have memorized all of your words.</div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Word, SampleSentence, RememberDifficulty as RD} from "@/logic/models";
import {blurAll, highlight, hyDate, okuriganaToFurigana, rand} from "@/logic/utils";
import {local} from "@/store";
import {dictionaries} from "@/logic/dictionary-prototype";
import {findWordToReview} from "@/logic/algorithm";
import {getDefinition} from "@/logic/search";

const rdValues = [RD.easy, RD.hard, RD.forgot]

@Options({components: {}})
export default class Review extends Vue
{
    input = ""
    answerShown = false
    w?: Word
    wordString = ""

    created()
    {
        this.nextWord()
    }

    /**
     * Switch to the next word
     */
    nextWord()
    {
        const word = findWordToReview()
        if (word == undefined) this.w = undefined
        else this.w = getDefinition(word, dictionaries)
        this.wordString = this.w?.word[0] || ''
    }

    get filteredSentences(): SampleSentence[]
    {
        const w = this.w
        if (!w) return []

        return rand(w.sentences, 3).map(it =>
        {
            const n: SampleSentence = {...it}
            w.word.forEach(wStr => n.s = highlight(okuriganaToFurigana(n.s), wStr))
            return n
        })
    }

    revealAnswer()
    {
        this.answerShown = true
    }

    clickDone(difficulty: number)
    {
        // Update UI
        this.answerShown = false
        blurAll()

        const rd = rdValues[difficulty]
        const dp = local().dailyProgress
        if (dp == undefined) return

        // Add rd to time log
        for (const it of dp.progress)
        {
            if (it.word == this.wordString)
            {
                it.timeLog.unshift({ time: new Date(), index: dp.currentIndex, rd: rd })
                break
            }
        }

        // Increment currentIndex
        dp.currentIndex++

        // Go to next word
        this.nextWord()
    }

    /**
     * Count total words to review
     */
    get countTotal()
    {
        const currentHyDate = hyDate(new Date())
        return local().longTermProgress.filter(it => it.dayLog[0].hyDate < currentHyDate)
    }
}
</script>

<!-- Scoped styles -->
<style lang="sass" scoped>
@import "src/css/global"

// Dynamic font size: max=24px, min=16px, middle=2.3vw
$centerFontSize: min(24px, max(16px, 3vw))

#no-words-left
    font-size: $centerFontSize

#word-input
    width: $app-width
    margin: auto

    // Title (aka. word)
    #div-title
        padding-bottom: 20px
        margin-bottom: 10px

        #word
            font-size: xx-large

        #wordForm2
            color: gray
            font-size: medium

    // Answer container
    .div-answer
        // Container properties
        text-align: left
        text-transform: capitalize
        margin-bottom: 30px
        font-size: large

        // Title of the answer container ("Definition" or "Sentences")
        .ans-title
            font-size: small
            text-transform: uppercase
            margin-bottom: 10px
            border-bottom: 2px solid #f5dab1

        // Translation for the sample sentences
        .translation
            font-size: medium
            margin-bottom: 10px

    // "Click the screen to show the answer" screen
    #div-middle
        // Vertical scroll on this one section only
        overflow-y: auto

        #div-before-answer
            font-size: $centerFontSize

    // Input field and buttons on the bottom
    #div-bottom
        margin-bottom: 5vh

        // Input field
        #div-input
            margin: 0 auto 20px

        // Three buttons fill container width equally (https://stackoverflow.com/a/23345079/7346633)
        #div-buttons
            // Alignment
            button.el-button
                margin-left: 0
                margin-right: 20px
                width: 100%

            button:last-child
                margin-right: 0
</style>
