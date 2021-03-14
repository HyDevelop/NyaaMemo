<template>
    <div id="ReviewScreen" class="fbox-v h100">
        <div id="div-progress" class="fbox-h f-no-shrink">
            <router-link class="clickable fbox-center" to="/">
                <div class="nowrap">
                    <i class="el-icon-s-management"></i>
                    <div id="lbl-progress" class="fade-in-left sub-text">
                        <span>{{ dayDone }}</span> / <span>{{ dayTodo }}</span>
                    </div>
                </div>
            </router-link>
            <router-link class="clickable fbox-center" to="/words">
                <div>
                    <i class="el-icon-s-unfold"></i>
                    <div class="sub-text">{{ needToAdd }}</div>
                </div>
            </router-link>
            <router-link class="clickable fbox-center" to="/stats"><div><i class="el-icon-s-data"></i></div></router-link>
            <router-link class="clickable fbox-center" to="/settings"><div><i class="el-icon-s-tools"></i></div></router-link>
            <router-link class="clickable fbox-center" to="/create"><div><i class="el-icon-plus"></i></div></router-link>

            <router-link class="clickable fbox-center" style="display: none" to="/debaggu"><i class="el-icon-cpu"></i></router-link>
        </div>
        <router-view/>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import CardInput from "@/views/0-Review.vue";
import {splash} from "@/logic/constants";
import {info} from "@/logic/utils";
import {checkDailyProgress} from "@/logic/algorithm";
import {local} from "@/store";

@Options({components: {CardInput}})
export default class App extends Vue
{
    beforeCreate()
    {
        info('App starting...')

        info('Preparing review...')
        checkDailyProgress()
    }

    mounted()
    {
        console.log(splash, `font-size: 18px; color: #fb8080;`, 'α-0.0.0-preview-01')
        info('App started.')
    }

    get dayMax() { return local().settings.maxPerDay }
    get dayDone() { return local().dailyProgress?.done || 0 }
    get dayTodo() { return local().dailyProgress?.progress.length || 0 }

    /**
     * Get how many words does the user need to add to fulfill the daily word goal
     */
    get needToAdd(): number
    {
        return this.dayMax - this.dayDone - this.dayTodo
    }
}
</script>

<style lang="sass">
@import "css/global"
@import "css/animations"
@import "css/patches"
</style>

<style lang="sass" scoped>
@import "css/global"

#ReviewScreen
    background-color: #fff1f140

// Progress bar on the top
#div-progress
    // Height
    height: max(6vh, 40px)

    // Shadow
    background-color: white
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%)
    margin-bottom: 20px

    // Buttons
    .clickable
        transition: all 1s ease

        // Alignment
        height: 100%
        width: 70px

        // Counteract the styles for <a> tag
        text-decoration: none
        color: #2c3e50

        // Size
        font-size: max(2vh, 14px)

        // Bottom Border
        border-bottom: 3px solid #ffebc4
        box-sizing: border-box

        // Sub-text alignment
        position: relative
        .sub-text
            position: absolute
            margin-top: -5px
            font-size: x-small
            width: 100%
            left: 0

    // Hover animation
    i, div, span
        transition: all .25s ease !important
    .clickable:hover div
        transform: translateY(-3px) !important

    // Active button
    .clickable.router-link-exact-active
        color: $c-highlight
        border-bottom: 3px solid $c-highlight
        flex-grow: 1

        // Unhide debug view
        display: flex !important
</style>
