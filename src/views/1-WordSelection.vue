<template>
    <div id="WordSelection">
        <h2>Word Selection</h2>
        <p>You can select words and add them to your list on this screen.
            You can either find words through direct searching or by adding them through a book.</p>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({components: {}})
export default class WordSelection extends Vue
{

}
</script>

<style lang="sass" scoped>
@import "../global"

#WordSelection
    width: $app-width
    margin: auto
</style>
