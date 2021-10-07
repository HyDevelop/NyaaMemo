<template>
    <div id="word-add" class="fbox-v mh0">
        <div id="page-desc">
            <h2>Add Words</h2>
            <p>You can use this page to simply add a word with its definition. If you added something by accident, you can remove words in the word lists page.</p>
        </div>

        <div class="fbox-v">
            <div class="input-container f-v-expand">
                <input />
            </div>

            <div class="input-container f-v-expand">
                <input />
            </div>

            <el-button id="btn-add" type="success" plain>Add</el-button>
        </div>
    </div>
</template>

<script>
import {Vue} from "vue-class-component";

export default class WordAdd extends Vue
{

}
</script>

<style lang="sass" scoped>
@import "src/css/global"

#word-add
    width: $app-width
    margin: 0 auto

.input-container
    margin-bottom: 20px

    input
        width: 100%
        height: 100%
        padding: 0
        border-width: 0

#btn-add
    margin-bottom: 20px
</style>
