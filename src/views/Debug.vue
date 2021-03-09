<template>
    <div id="Debug">
        <el-input v-model="debugText" @input="onInputText"></el-input>
        <div v-html="debugOutput"></div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {okuriganaToFurigana} from "@/logic/utils";

@Options({components: {}})
export default class Debug extends Vue
{
    debugText = "感(かん)じ取(と)れたら手(て)を繋(つな)ごう、重(かさ)なるのは人生(じんせい)のライン and レミリア最高(さいこう)！"
    debugOutput = ""

    onInputText()
    {
        this.debugOutput = okuriganaToFurigana(this.debugText)
    }
}
</script>

<style lang="scss" scoped>

</style>
