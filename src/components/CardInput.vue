<template>
    <div id="word-input">
        <div id="title">{{ 'test' }}</div>
        <el-button id="btn-reveal-ans">Reveal Answer</el-button>
        <el-input v-model="input"></el-input>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Card} from "@/logic/models";

class Props
{
    card!: Card
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
