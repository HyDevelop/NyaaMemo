<template>
    <div id="Stats">
        <div id="page-desc">
            <h2>Statistics</h2>
            <p>You can see your review statistics on this page. It will display how much you studied for the last few weeks,
                and how long it will take you to finish a book.</p>
        </div>

        <v-calendar is-expanded :columns="$screens({ default: 1, md: 2, lg: 3})"/>
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
@import "src/css/global"

#Stats
    width: $app-width
    margin: 0 auto
</style>
