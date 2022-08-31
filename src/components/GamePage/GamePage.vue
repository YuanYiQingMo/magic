<template>
    <div class="in-game">
        <div class="score">
            得分: {{ score }}
        </div>
        <!-- 战斗地图 -->
        <div class="battle-map">
            <div style="display:flex;justify-content: space-between">
                <div>
                    <character type="you" :you="you">
                        你
                    </character>
                </div>
                <div>
                    <div class="enemy">
                        <character
                            v-for="enemy in enemyList"
                            :stage="stage"
                            :enemy="enemy"
                            type="enemy"
                            :key="enemy.id"
                            :magic="currentMagic"
                            :settlement="settlement"
                            @useMana="useMana"
                            >
                            {{ enemy.name }}
                        </character>
                    </div>
                </div>
            </div>
            <div>
                <div class="health-bar">
                    HP：{{ you.health }}/{{ you.maxHealth }}
                </div>
                <div class="MP-bar">
                    MP：{{ you.mana }}/{{ you.maxMana }}
                </div>
            </div>
        </div>
        <div class="round-ended" @click="nextRound">
            结束回合
        </div>
        <!--法杖 -->
        <div class="wand-editor">
            <!-- <div class="wand-title">点击选择魔法</div> -->
            <div class="wand-bar">
                <div
                    v-for="(wandBox,index) in wand.magicBox"
                    :class="'wandBox ' + wandBox.quality + (wandBox.magic_id == currentMagic.magic_id?' choose-magic':'')"
                    :key="index"
                    @click="useMagic(wandBox)"
                    >
                    {{ wandBox.magic_name }}
                    <Poptip  trigger="hover" :title="wandBox.magic_name" :content="wandBox.magic_describe">
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
import Character from './Character.vue';
import wand from './wand.js';
import { lootMagic, summonEnemyList } from './utils.js';
export default {
    components: { Character },
    name:'inGamePage',
    data(){
        return {
            score: 0,
            you:{
                mana:50,
                maxMana:50,
                health:30,
                maxHealth:30,
            },
            enemyList:[],
            isLoot:true,
            lootList:[],
            wand:new wand(),
            magicPool:[],
            stage:0,
            currentMagic:{},
            isChoose: false,
        }
    },
    methods:{
        endGame(){
            this.initGame();
            this.$emit('click',3)
        },
        initGame(){
            this.score = 0;
            this.you.health = 30;
            this.you.maxHealth = 30;
            this.lootList = [];
            this.magicPool = [];
            this.stage = 0;
            this.wand.reload();
            for(let i = 0; i < 5; i++){
                this.lootList.push(lootMagic('normal'));
            }
            this.summonEnemy();
            this.currentMagic = this.wand.magicBox[0];
        },
        addMagic(item){
            if(this.wand.addMagic(item) == -1){
                return
            }
            this.isLoot = false;
        },
        useMagic(item){
            this.currentMagic = item;
        },
        summonEnemy() {
            if(this.stage % 10 == 0 && this.stage != 0){
                this.enemyList.push(...summonEnemyList('boss'))
            }else if(this.stage > 50){
                this.enemyList.push(...summonEnemyList('elite'));
            }else{
                Math.random() > 0.5 ? 
                    this.enemyList.push(...summonEnemyList('elite')) :
                    this.enemyList.push(...summonEnemyList('normal'))
            }
        },
        checkEnemyDied(){
            for(let i =0; i < this.enemyList.length; i++){
                if(this.enemyList[i].isDied){
                    this.enemyList.splice(i,1);
                    i--;
                }
            }
        },
        checkFightEnd(){
            if(this.isFightWin){
                this.nextFight();
            }
        },
        nextFight(){
            this.score += (Math.pow(10,Math.floor(this.stage / 10)) * (this.stage % 10) );
            this.stage++;
            this.summonEnemy();
            //TODO 添加反馈机制(变强)
        },
        useMana(mana){
            this.checkEnemyDied();
            this.checkFightEnd();
            if(this.you.mana - mana >= 0){
                this.you.mana -= mana;
            }else{
                this.$Message.error('魔力不足喵');
                return
            }
        },
        nextRound(){
            this.you.mana = this.you.maxMana;
            for(let item of this.enemyList){
                this.you.health -= item.atk;
            }
        }
    },
    computed:{
        isEnd(){
            let res = false;
            if(this.you.health <= 0){
                res = true;
            }
            return res
        },
        settlement(){
            let res = true;
            if(this.you.mana - this.currentMagic.MP <= 0){
                res = false;
            }
            return res
        },
        isFightWin(){
            let res = false;
            console.log()
            if(this.enemyList.length == 0){
                res = true;
            }
            return res;
        }
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
    flex-direction: column;
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
.choose-magic{
    border: solid red 4px;
    margin: 1px;
}
.round-ended{
    margin: 12px auto;
    border: black solid 1px;
    width: 30%;
    padding: 12px;
    border-radius: 24px;
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