<template>
    <div id="ReviewScreen">
        <div id="div-progress">
            <router-link class="clickable f-center" to="/">
                <div class="nowrap">
                    <i class="el-icon-s-management"></i>
                    <span id="lbl-progress" class="fade-in-left">
                        <span>32</span> / <span>16</span> / <span>2</span>
                    </span>
                </div>
            </router-link>
            <router-link class="clickable f-center" to="/words"><i class="el-icon-s-unfold"></i></router-link>
            <router-link class="clickable f-center" to="/stats"><i class="el-icon-s-data"></i></router-link>
            <router-link class="clickable f-center" to="/settings"><i class="el-icon-s-tools"></i></router-link>
            <router-link class="clickable f-center" to="/create"><i class="el-icon-plus"></i></router-link>

            <router-link class="clickable f-center" style="display: none" to="/debaggu"><i class="el-icon-cpu"></i></router-link>
        </div>
        <router-view/>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import CardInput from "@/views/0-Review.vue";
import {splash} from "@/logic/constants";
import {info} from "@/logic/utils";

@Options({components: {CardInput}})
export default class App extends Vue
{
    beforeCreate()
    {
        info('App starting...')
    }

    mounted()
    {
        console.log(splash, `font-size: 18px; color: #fb8080;`, 'α-0.0.0-preview-01')
        info('App started.')
    }
}
</script>

<style lang="scss" scoped>
#ReviewScreen
{
    // Vertical Flex Alignment
    display: flex;
    flex-flow: column;
    height: 100%;

    background-color: #fff1f140;
}

// Progress bar on the top
#div-progress
{
    // Vertical Flex Alignment: flex(grow=0, shrink=0, basis=auto)
    flex: 0 0 auto;

    // Height
    height: max(6vh, 40px);

    // Shadow
    background-color: white;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    margin-bottom: 20px;

    // Horizontal flexbox
    display: flex;

    // Buttons
    .clickable
    {
        transition: all 1s ease;

        // Alignment
        height: 100%;
        width: 70px;

        // Counteract the styles for <a> tag
        text-decoration: none;
        color: #2c3e50;

        // Size
        font-size: max(2vh, 14px);

        // Bottom Border
        border-bottom: 3px solid #ffebc4;
        box-sizing: border-box;
    }

    #lbl-progress
    {
        margin-left: 5px;
        display: none;
        font-size: 14px;
    }

    // Hover animation
    i, div, span { transition: all .25s ease !important }
    .clickable:hover i, .clickable:hover div { transform: translateY(-3px) !important }

    // Active button
    .clickable.router-link-exact-active
    {
        //width: 100%;
        color: #fb8080;
        border-bottom: 3px solid #fb8080;

        flex: 1 0 auto;

        // Unhide debug view
        display: flex !important;

        // Show progress only when active
        #lbl-progress { display: inline-block }
    }
}
</style>


<style lang="sass">
@import "global"
@import "animations"
</style>
