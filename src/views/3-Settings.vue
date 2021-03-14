<template>
    <div id="Settings">
        <h2>Settings</h2>
        <p>You can change the configuration here.</p>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({components: {}})
export default class SettingsView extends Vue
{

}
</script>

<style lang="sass" scoped>
@import "src/css/global"

#Settings
    width: $app-width
    margin: auto
</style>
