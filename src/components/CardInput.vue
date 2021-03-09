<template>
    <div id="word-input">
        <div id="div-title">
            <div id="word">{{ card.word[0] }}</div>
            <div id="wordForm2">{{ card.word[1] }}</div>
        </div>

        <div v-if="answerShown" class="div-answer">
            <div class="ans-title">Definition</div>
            <div v-for="def in card.definition" :key="def" v-html="def"></div>
        </div>

        <div v-if="answerShown" class="div-answer">
            <div class="ans-title">Sentences</div>
            <div v-for="s in filteredSentences" :key="s.sentence">
                <div class="sentence" v-html="s.sentence"></div>
                <div class="translation">{{ s.translation }}</div>
            </div>
        </div>

        <div v-if="!answerShown" id="div-before-answer" @click="revealAnswer">

        </div>

        <div id="div-bottom">
            <div id="div-input">
                <el-input id="input" v-model="input"></el-input>

                <div id="div-buttons">
                    <el-button type="success" plain>簡単</el-button>
                    <el-button type="warning" plain>難い</el-button>
                    <el-button type="danger"  plain>忘れた</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Options, prop, Vue} from 'vue-class-component';
import {Card, SampleSentence} from "@/logic/models";
import {rand} from "@/logic/utils";
import * as wanakana from 'wanakana';

class Props
{
    card = prop<Card>({required: true})
}

// Temporary
const kanji: {[key: string]: string} = {'猫': 'ねこ', '私': 'わたし', '田': 'た', '中': 'なか', '公': 'こう', '園': 'えん', '怖': 'こわ'}

function withKanjiPronunciations(s: string)
{
    if (s.includes('<')) return s
    let res = ""
    for (const c of s)
    {
        if (wanakana.isKanji(c)) res += `<ruby>${c}<rt>${kanji[c]}</rt></ruby>`
        else res += c
    }
    return res
}

@Options({components: {}})
export default class CardInput extends Vue.with(Props)
{
    input = ""
    answerShown = true

    get filteredSentences(): SampleSentence[]
    {
        return rand(this.card.sentences, 3).map(it =>
        {
            const n: SampleSentence = {...it}
            this.card.word.forEach(w => n.sentence =
                withKanjiPronunciations(n.sentence).replaceAll(w, `<span class="sentence-word-highlight">${w}</span>`)
            )
            return n
        })
    }

    revealAnswer()
    {
        console.log("Reveal answer area is pressed")
    }
}
</script>

<!-- Global styles -->
<style lang="scss">
.sentence-word-highlight { color: #ff7878 }
</style>

<!-- Scoped styles -->
<style lang="scss" scoped>
#word-input
{
    $ansWidth: max(50vw, min(900px, 100vw - 100px));

    #div-title
    {
        padding-bottom: 20px;

        // 60vw border
        margin: 0 20vw 10px;
        //border-bottom: 2px solid #cacaca;

        #word
        {
            font-size: xx-large;
        }

        #wordForm2
        {
            color: gray;
            font-size: large;
        }
    }

    .div-answer
    {
        .ans-title
        {
            font-size: medium;
            text-transform: uppercase;
            margin-bottom: 10px;
            width: 100%;
            border-bottom: 2px solid #f5dab1;
        }

        .translation
        {
            font-size: large;
            margin-bottom: 10px;
        }

        text-align: left;
        width: $ansWidth;
        padding: 0 50px;
        margin: 0 auto 30px;
        font-size: x-large;
    }

    #div-bottom
    {
        position: absolute;
        bottom: 50px;
        width: 100vw;

        #div-input
        {
            width: $ansWidth;
            margin: 0 auto 20px;
        }

        // Three buttons fill container width equally (https://stackoverflow.com/a/23345079/7346633)
        #div-buttons
        {
            margin: auto;
            display: flex;
            width: $ansWidth;

            button
            {
                margin-right: 20px;
                width: 100%;
            }

            button:last-child { margin-right: 0 }
        }
    }
}
</style>
