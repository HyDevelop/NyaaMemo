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
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Options, prop, Vue} from 'vue-class-component';
import {Card, SampleSentence} from "@/logic/models";
import {rand} from "@/logic/utils";

class Props
{
    card = prop<Card>({required: true})
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
            this.card.word.forEach(w => n.sentence = n.sentence.replaceAll(w, `<span class="sentence-word-highlight">${w}</span>`))
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
            width: 70%;
            border-bottom: 2px solid #ffd700;
        }

        .translation
        {
            font-size: large;
            margin-bottom: 10px;
        }

        text-align: left;
        width: max(50vw, min(900px, 100vw - 100px));
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
            max-width: 400px;
            margin: auto;
        }
    }
}
</style>
