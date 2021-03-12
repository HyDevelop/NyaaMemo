<template>
    <div id="WordSelection">
        <div id="page-desc">
            <h2>Word Selection</h2>
            <p>You can select words and add them to your list on this screen.
                You can either find words through direct searching or by adding them through a book.</p>
        </div>

        <div class="input-container">
            <HyInput placeholder="Search..." v-model="search"></HyInput>
        </div>

        <div class="hy-card">
            w
        </div>
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

    // Vertical flex
    display: flex
    flex-flow: column
    height: 100%

#page-desc
    margin-bottom: 20px

.hy-card
    width: 100%
    height: 100%
    background-color: #edf1f2
    border-radius: 15px
    margin: 20px 0
</style>
