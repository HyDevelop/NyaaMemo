<template>
    <div id="WordSelection">
        <div id="page-desc">
            <h2>Word Selection</h2>
            <p>You can select words and add them to your list on this screen.
                You can either find words through direct searching or by adding them through a book.</p>
        </div>

        <HyInput placeholder="Search..." v-model="search"></HyInput>
        
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import HyInput from "@/components/HyInput.vue";

@Options({components: {HyInput}})
export default class WordSelection extends Vue
{
    search = ""
}
</script>

<style lang="sass" scoped>
@import "../global"

#WordSelection
    width: $app-width
    margin: 0 auto

#page-desc
    margin-bottom: 40px
</style>
