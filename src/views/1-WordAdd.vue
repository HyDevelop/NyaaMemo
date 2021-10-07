<template>
    <div id="word-add" class="fbox-v mh0">
        <div id="page-desc">
            <h2>Add Words</h2>
            <p>You can use this page to simply add a word with its definition. If you added something by accident, you can remove words in the word lists page.</p>
        </div>

        <div id="content" class="fbox-v">
            <div class="input-container f-v-expand" v-if="mode === 1">
                <input v-model="word"/>
            </div>

            <div class="input-container f-v-expand" v-if="mode === 1">
                <input v-model="definition"/>
            </div>

            <hy-input placeholder="Word" v-model="word" v-if="mode === 2"></hy-input>
            <hy-input placeholder="Definition" v-model="definition" v-if="mode === 2"></hy-input>
            <hy-input placeholder="Alternative Names (colon separated)" v-model="definition" v-if="mode === 2"></hy-input>
            <hy-input placeholder="" v-model="definition" v-if="mode === 2"></hy-input>
            <el-button id="btn-add" type="success" plain>Add</el-button>
        </div>
    </div>
</template>

<script>
import {Options, Vue} from "vue-class-component";
import HyInput from "@/components/HyInput";

@Options({components: {HyInput}})
export default class WordAdd extends Vue
{
    mode = 2
    word = ''
    definition = ''
}
</script>

<style lang="sass" scoped>
@import "src/css/global"

#word-add
    width: $app-width
    margin: 0 auto

    #content > *
        margin-bottom: 20px

.input-container
    margin-bottom: 20px

    input
        width: 100%
        height: 100%
        padding: 0
        border-width: 0

        background-color: #edf1f2
        border-radius: 15px

        text-align: center
        font-size: x-large

#btn-add
    margin-bottom: 20px
</style>
