<template>
    <div id="ReviewScreen">
        <div id="div-progress">
            <div class="btn-exit" @click="btnExit"><i class="el-icon-arrow-left"></i></div>
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
        definition: ["n. Cat", "n. God :o"],
        sentences: [
            {sentence: "私は猫です", translation: "I'm a cat :3"}
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
