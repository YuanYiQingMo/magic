<template>
    <div class="in-game">
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
        <div class="MP-bar">
            MP：{{ mana }}/{{ maxMana }}
        </div>
        <!--法杖 -->
        <div class="wand-editor">
            <div class="wand-title">点击使用魔法</div>
            <div class="wand-bar">
                <div v-for="(wandBox,index) in wand.magicBox" :class="'wandBox ' + wandBox.quality" :key="index" @click="useMagic(wandBox)">
                    {{ wandBox.magic_name }}
                    <Poptip trigger="hover" :title="wandBox.magic_name" :content="wandBox.magic_describe">
                        <Icon style="font-size: 24px" type="ios-information-circle-outline" />
                    </Poptip>
                </div>
            </div>
        </div>
        <!-- 战利品获取 -->
        <div v-if="isLoot" class="loot-bar">
            <div class="loot-title">选择其中一个魔法魔法</div>
            <div class="loot-item-bar">
                <div v-for="(item,index) in lootList" :class="'loot-item ' + item.quality" :key="index" @click="addMagic(item)">
                    {{ item.magic_name }}
                </div>
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
            mana:50,
            maxMana:50,
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
            this.lootList = [];
            this.magicPool = [];
            this.stage = 0;
            this.wand.reload();
            for(let i = 0; i < 5; i++){
                this.lootList.push(lootMagic('normal'));
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
.in-game {
    margin: 0 24px;
}
.battle-map {
    display: flex;
    justify-content: space-around;
    border: solid black 1px;
    min-height: 300px;
}
.enemy {
    display: flex;
}

.wand-bar {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    border: solid black 1px;
    min-height: 150px;
}

.wandBox{
    cursor: pointer;
    border: solid black 1px;
    border-radius: 10px;
    width: 20%;
    height: 50px;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}
.loot-bar{
    display: flex;
    flex-direction: column;
}

.loot-item-bar{
    display: flex;
    flex-direction: row;
}
.loot-item{
    cursor: pointer;
    border: solid black 1px;
    border-radius: 10px;
    width: 60%;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}
// 品质颜色
</style>
<style>
.Tier1{
    background-color: #ffffff;
}
.Tier2{
    background-color: #3f3cff;
}
.Tier3{
    background-color: #f832ee;
}
.Tier4{
    background-color: #ffae00;
}
.Tier5{
    background-color: #ff0000;
}
</style>