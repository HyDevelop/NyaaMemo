<template>
    <div id="word-input">
        <div id="title">
            <div id="word">{{ card.word[0] }}</div>
            <div id="wordForm2">{{ card.word[1] }}</div>
        </div>
        <div id="subtitle"></div>
        <el-button id="btn-reveal-ans">Reveal Answer</el-button>
        <el-input id="input" v-model="input"></el-input>
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
}
</script>

<style lang="scss" scoped>
#word-input
{
    #title
    {
        margin-bottom: 50px;
        background-color: #e2eeff;

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

    #input
    {
        max-width: 400px;
        margin: auto;
    }

    #btn-reveal-ans
    {
        margin-bottom: 50px;
    }
}
</style>
