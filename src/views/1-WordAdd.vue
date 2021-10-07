<template>
    <div id="word-add" class="fbox-v mh0">
        <div id="page-desc">
            <h2>Add Words</h2>
            <p>You can use this page to simply add a word with its definition. If you added something by accident, you can remove words in the word lists page.</p>
        </div>

        <div class="input-container">
            <input />
        </div>
        <div class="input-container">
            <input />
        </div>
        <div>
            <el-button>Add</el-button>
        </div>
    </div>
</template>

<script>
import {Vue} from "vue-class-component";

export default class WordAdd extends Vue
{

}
</script>

<style scoped>

</style>
