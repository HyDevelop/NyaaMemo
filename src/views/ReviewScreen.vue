<template>
    <div id="ReviewScreen">
        <div id="div-progress">
            <div class="left clickable" @click="btnExit"><i class="el-icon-arrow-left"></i></div>
            <div class="right clickable" @click="btnSettings"><i class="el-icon-s-tools"></i></div>
        </div>

        <CardInput class="card-input" :card="card"></CardInput>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import CardInput from "@/components/CardInput.vue";
import {Card} from "@/logic/models";

@Options({components: {CardInput}})
export default class ReviewScreen extends Vue
{
    card: Card = {
        word: ["猫", "ねこ"],
        definition: ["n. Cat", "<strike>n. God :o</strike>"],
        sentences: [
            {sentence: "私は猫です", translation: "I'm a cat :3"},
            {sentence: "田中さんはねこではありません", translation: "Tanaka is not a cat"},
            {sentence: "あそこの公園に猫がたくさんいます", translation: "That park over there has a lot of cats"},
            {sentence: "猫は怖くない", translation: "Cats are not scary"}
        ]
    }

    /**
     * Called when the exit button is pressed.
     */
    btnExit()
    {
        this.$router.push('/')
    }

    btnSettings()
    {
        console.log("Settings button pressed")
    }
}
</script>

<style lang="scss" scoped>
#ReviewScreen
{
    // Vertical Flex Alignment
    display: flex;
    flex-flow: column;
    height: 100vh;

    background-color: #fff1f140;
}

// Progress bar on the top
#div-progress
{
    // Vertical Flex Alignment: flex(grow=0, shrink=1, basis=auto)
    flex: 0 1 auto;

    // Height
    $navH: max(6vh, 40px);
    height: $navH;

    // Shadow
    background-color: white;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    margin-bottom: 20px;

    // Buttons
    div.clickable
    {
        // Alignment
        height: 100%;
        width: 70px;
        line-height: $navH;

        // Size
        font-size: max(2vh, 14px);
    }
}

// Card
.card-input
{
    // Vertical Flex Alignment: flex(grow=1, shrink=1, basis=auto)
    flex: 1 1 auto;
}
</style>
