<template>
    <div class="home">
        <router-link to="/review">Go to /review</router-link>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({components: {},})
export default class Home extends Vue
{
}
</script>
