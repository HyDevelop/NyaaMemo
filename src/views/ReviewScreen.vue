<template>
    <div id="ReviewScreen">
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
</style>
