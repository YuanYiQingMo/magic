<template>
    <div id="app">
        <start-page v-if="gameStatue == 1" @click="changeStatue"></start-page>
        <game-page v-if="gameStatue == 2" @click="changeStatue"></game-page>
        <end-page v-if="gameStatue == 3" @click="changeStatue"></end-page>
    </div>
</template>

<script>
export default {
    name: "App",
    components: { StartPage, gamePage, endPage },
    data(){
        return{
            gameStatue:1,

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
    margin-top: 60px;
}
</style>
