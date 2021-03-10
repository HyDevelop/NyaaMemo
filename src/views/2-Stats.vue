<template>
    <div id="Stats">
        <h2>Statistics</h2>
        <p>You can see your review statistics on this page. It will display how much you studied for the last few weeks,
            and how long it will take you to finish a book.</p>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({components: {}})
export default class Stats extends Vue
{

}
</script>

<style lang="sass" scoped>
@import "../global"

#Stats
    width: $app-width
    margin: auto
</style>
