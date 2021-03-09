<template>
<!--    <div id="nav">-->
<!--        <router-link to="/">Home</router-link>-->
<!--        |-->
<!--        <router-link to="/about">About</router-link>-->
<!--    </div>-->
    <router-view/>
</template>

<style lang="scss">
#app
{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

// Clickable text
.clickable:hover
{
    // text-decoration: underline;
    cursor: pointer;
}

// Non-selectable text
.unselectable
{
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

#nav
{
    padding: 30px;

    a
    {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active
        {
            color: #42b983;
        }
    }
}
</style>
