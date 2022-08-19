<template>
    <div id="app">
        <start-page v-if="gameStatue == 1"></start-page>
        <game-page v-if="gameStatue == 2"></game-page>
        <end-page v-if="gameStatue == 3"></end-page>
    </div>
</template>

<script>
export default {
    name: "App",
    components: { StartPage, gamePage, endPage },
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
