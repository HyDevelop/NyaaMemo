<template>
    <div id="word-input">
        <div id="title">{{ title }}</div>
        <el-button id="btn-reveal-ans">Reveal Answer</el-button>
        <el-input v-model="input"></el-input>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({components: {}})
export default class CardInput extends Vue
{
    input = "Long time no see, it has been a while"
    title = "おひさしぶり"
}

export interface Deck
{
    cards: Card[];
    wordIndex: [];
}

export interface Card
{
    word: string[];
    definition: string[];
    sentences: SampleSentence[];
    otherAnswers: string[] | null;
}

export interface SampleSentence
{
    sentence: string;
    translation: string;
}
</script>

<style lang="scss" scoped>
#word-input
{
    max-width: 400px;
    margin: auto;

    #title
    {
        font-size: x-large;
        margin-bottom: 50px;
    }

    #btn-reveal-ans
    {
        margin-bottom: 50px;
    }
}
</style>
