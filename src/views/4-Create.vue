<template>
    <div id="Create">
        <div id="title">
            <h2>Create</h2>
            <p>This screen allows you to create dictionaries or books. Please note that this is an advanced feature,
                and creating a dictionary or book requires a lot of effort.</p>
        </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({components: {}})
export default class Create extends Vue
{

}
</script>

<style lang="sass" scoped>
@import "src/css/global"

#Create
    width: $app-width
    margin: auto
</style>
