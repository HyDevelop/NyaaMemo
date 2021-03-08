<template>
    <div id="ReviewScreen">
        <div id="div-progress">

        </div>

        <CardInput></CardInput>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import CardInput from "@/components/CardInput.vue";

@Options({components: {CardInput}})
export default class ReviewScreen extends Vue
{

}
</script>

<style lang="scss" scoped>
#div-progress
{
    height: 6vh;
    background-color: white;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    margin-bottom: 20px;
}
</style>
