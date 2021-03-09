<template>
    <div id="word-input">
        <div id="div-title">
            <div id="word">{{ card.word[0] }}</div>
            <div id="wordForm2">{{ card.word[1] }}</div>
        </div>
        <div v-if="answerShown" id="div-answer">
            <div id="ans-title-definition">Definition</div>
            <div v-for="def in card.definition" :key="def">{{ def }}</div>
        </div>

        </div>

<!--        <el-button id="btn-reveal-ans">Reveal Answer</el-button>-->
        <div id="div-bottom">
            <div id="div-input">
                <el-input id="input" v-model="input"></el-input>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Options, prop, Vue} from 'vue-class-component';
import {Card} from "@/logic/models";

class Props
{
    card = prop<Card>({required: true})
}

@Options({components: {}})
export default class CardInput extends Vue.with(Props)
{
    input = ""
    answerShown = true
}
</script>

<style lang="scss" scoped>
#word-input
{
    #div-title
    {
        padding-bottom: 20px;

        // 60vw border
        margin: 0 20vw 20px;
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

    #div-answer
    {
        #ans-title-definition
        {
            font-size: medium;
            text-transform: uppercase;
            margin-bottom: 10px;
            width: 50%;
            border-bottom: 2px solid #ffd700;
        }

        text-align: left;
        width: max(50vw, min(900px, 100vw - 100px));
        padding: 0 50px;
        margin: auto;
        font-size: x-large;
    }

    #div-bottom
    {
        position: absolute;
        bottom: 0;
        width: 100vw;

        #div-input
        {
            max-width: 400px;
            margin: auto auto 50px;
        }
    }

    #btn-reveal-ans
    {
        margin-bottom: 50px;
    }
}
</style>
