<template>
    <div id="Debug">
        <HyInput v-model="debugText" @input="onInputText" placeholder="Input Okurigana"/>
        <div v-html="debugOutput"></div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {okuriganaToFurigana} from "@/logic/utils";
import HyInput from "@/components/HyInput.vue";

@Options({components: {HyInput}})
export default class Debug extends Vue
{
    debugText = "感(かん)じ取(と)れたら手(て)を繋(つな)ごう、重(かさ)なるのは人生(じんせい)のライン and レミリア最高(さいこう)！"
    debugOutput = ""

    created()
    {
        this.onInputText()
    }

    onInputText()
    {
        this.debugOutput = okuriganaToFurigana(this.debugText)
    }
}
</script>

<style lang="sass">
@import "src/css/global"

#Debug
    width: $app-width
    margin: auto
</style>
