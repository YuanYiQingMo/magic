<template>
    <div id="app">
        <start-page class="page" v-if="gameStatue == 1" @click="changeStatue"></start-page>
        <game-page
            class="game-page page"
            v-if="gameStatue == 2"
            @click="changeStatue"
            @getScore="getScoreE"
        ></game-page>
        <end-page
            class="page"
            :score="score"
            v-if="gameStatue == 3"
            @click="changeStatue"
        ></end-page>
    </div>
</template>

<script>
import StartPage from "./components/StartPage/StartPage.vue";
import GamePage from "./components/GamePage/GamePage.vue";
import EndPage from "./components/EndPage/EndPage.vue";
export default {
    name: "App",
    components: { StartPage, GamePage, EndPage },
    data() {
        return {
            gameStatue: 1,
            score: 0,
        };
    },
    methods: {
        changeStatue(statue) {
            this.gameStatue = statue;
        },
        getScoreE(score) {
            this.score = score;
        },
    },
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    justify-content: center;
}
.game-page {
    max-width: 600px;
    margin: 0 auto;
}
.page{
    min-width: 400px;
}
</style>
