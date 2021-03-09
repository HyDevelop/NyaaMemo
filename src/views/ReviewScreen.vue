<template>
    <div id="ReviewScreen">
        <div id="div-progress">
            <div class="btn-exit clickable" @click="btnExit"><i class="el-icon-arrow-left"></i></div>
        </div>

        <CardInput :card="card"></CardInput>
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
        console.log("Return button pressed")
    }
}
</script>

<style lang="scss" scoped>
#div-progress
{
    // Height
    $navH: max(6vh, 40px);
    height: $navH;

    // Shadow
    background-color: white;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    margin-bottom: 20px;

    // Return button
    .btn-exit
    {
        // Alignment
        height: 100%;
        width: 70px;
        float: left;
        line-height: $navH;

        // Size
        font-size: max(2vh, 14px);
    }
}

#ReviewScreen
{
    background-color: #fff1f140;
    height: 100vh;
}
</style>
