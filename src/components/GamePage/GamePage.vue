<template>
    <div class="inGame">
        <div class="score">
            得分: {{ score }}
        </div>
        <!-- 战斗地图 -->
        <div class="battle-map">
            <character-name type="you">你</character-name>
            <div class="enemy">
                <character-name type="enemy" v-for="(enemy,index) in enemyList" :key="index">
                    {{ enemy.name }}
                </character-name>
            </div>
        </div>
        <div class="health-bar">
            HP：{{ health }}/{{ maxHealth }}
        </div>
        <!-- 战利品获取 -->
        <div v-if="isLoot" class="loot-bar">
            <div class="loot-title">点击获取魔法</div>
            <div v-for="(item,index) in lootList" class="loot-item" :key="index" @click="addMagic(item)">
                {{ item.magic_name }}
            </div>
        </div>
        <!--法杖 -->
        <div class="wand-editor">
            <div class="wand-title">点击使用魔法</div>
            <div v-for="(wandBox,index) in wand.magicBox" class="wandBox" :key="index" @click="useMagic(item)">
                {{ wandBox.name }}
            </div>
        </div>
        <Button v-if="isEnd" type="primary" @click="endGame">结束游戏</Button>
    </div>
</template>
<script>
import CharacterName from './CharacterName.vue';
import wand from './wand.js'
import { lootMagic } from './utils.js';
export default {
    components: { CharacterName },
    name:'inGamePage',
    data(){
        return {
            score: 0,
            health:30,
            maxHealth:30,
            enemyList:[{name:'球'},{name:'啊'}],
            isLoot:true,
            lootList:[],
            wand:new wand(),
            magicPool:[],
            stage:0,
        }
    },
    methods:{
        endGame(){
            this.initGame();
            this.$emit('click',3)
        },
        initGame(){
            this.score = 0;
            this.health = 30;
            this.maxHealth = 30;
            this.wand.reload();
            this.lootList = [];
            this.magicPool = [];
            this.stage = 0;
            for(let i = 0; i < 5; i++){
                console.log(i)
                this.lootList.push(lootMagic('normal'));
                this.lootList[i].id = i;
            }
        },
        win(){
            this.score += (Math.pow(10,Math.floor(this.stage / 10)) * (this.stage % 10) );
            this.stage++;
        },
        addMagic(item){
            this.wand.addMagic(item);
        },
        useMagic(item){
            console.log(item)
        }
    },
    computed:{
        isEnd(){
            let res = false;
            if(this.health <= 0){
                res = true;
            }
            return res
        },
        // enemyList(){
        //     let res = [];
        //     return res;
        // }
    },
    mounted(){
        this.initGame();
    }
}
</script>
<style lang="scss" scoped>
.battle-map {
    display: flex;
    justify-content: space-around;
}
.enemy {
    display: flex;
}
</style>