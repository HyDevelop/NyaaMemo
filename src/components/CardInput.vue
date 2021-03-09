<template>
    <div id="word-input">
        <div id="div-title">
            <div id="word">{{ card.word[0] }}</div>
            <div id="wordForm2">{{ card.word[1] }}</div>
        </div>
        <div id="div-answer">

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
        margin-bottom: 50px;
        background-color: #e2eeff;
        padding: 10px;

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
