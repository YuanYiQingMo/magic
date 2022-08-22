<template>
    <div id="app">
        <start-page v-if="gameStatue == 1" @click="changeStatue"></start-page>
        <game-page class="game-page" v-if="gameStatue == 2" @click="changeStatue"></game-page>
        <end-page v-if="gameStatue == 3" @click="changeStatue"></end-page>
    </div>
</template>

<script>
import StartPage from './components/StartPage/StartPage.vue';
import GamePage from './components/GamePage/GamePage.vue';
import EndPage from './components/EndPage/EndPage.vue';
export default {
    name: "App",
    components: { StartPage, GamePage, EndPage },
    data(){
        return{
            gameStatue:2,
        }
    },
    methods:{
        changeStatue(statue){
            this.gameStatue = statue;
        }
    }
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.game-page {
    max-width: 600px;
    margin: 0 auto;
}
</style>
