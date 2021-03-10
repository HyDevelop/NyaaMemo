<template>
    <div id="ReviewScreen">
        <div id="div-progress">
            <router-link class="clickable flex-vcenter" to="/"><i class="el-icon-arrow-left"></i></router-link>
            <router-link class="clickable flex-vcenter" to="/review">
                <i class="el-icon-s-management"></i>
            </router-link>
            <router-link class="clickable flex-vcenter" to="/words"><i class="el-icon-s-unfold"></i></router-link>
            <router-link class="clickable flex-vcenter" to="/stats"><i class="el-icon-s-data"></i></router-link>
            <router-link class="clickable flex-vcenter" to="/settings"><i class="el-icon-s-tools"></i></router-link>
        </div>
        <router-view/>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import CardInput from "@/views/Review.vue";

@Options({components: {CardInput}})
export default class App extends Vue
{

}
</script>

<style lang="scss" scoped>
#ReviewScreen
{
    // Vertical Flex Alignment
    display: flex;
    flex-flow: column;
    height: 100vh;

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
        // Alignment
        height: 100%;
        width: 70px;

        // Counteract the styles for <a> tag
        text-decoration: none;
        color: #2c3e50;

        // Size
        font-size: max(2vh, 14px);
    }

    // Active button
    .clickable.router-link-exact-active
    {
        //width: 100%;
        color: #fb8080;
        border-bottom: 3px solid #fb8080;

        flex: 1 0 auto;
    }
}
</style>


<style lang="sass">
@import "global"
</style>
