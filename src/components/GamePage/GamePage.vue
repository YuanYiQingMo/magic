<template>
    <div class="in-game">
        <div class="score">
            得分: {{ score }}   第 {{ stage }} 层
        </div>
        <!-- 战斗地图 -->
        <div class="battle-map">
            <div v-if="isEnd" class="end-game" @click="endGame">
                <div>寄</div>
                <div style="font-size: 1rem; color: black;">点击结束本局游戏</div>
            </div>
            <div style="display:flex;justify-content: space-around;margin-top:8px;">
                
                <div v-if="stage == 1" class="new-guide">点击敌人施放魔法</div>
                <div  v-if="!isEnd" style="width: 100%;display: flex;justify-content: center;">
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
                            class="single-enemy"
                            >
                            {{ enemy.name }}
                        </character>
                    </div>
                    <!-- 战利品获取 -->
                    <div v-if="isLoot" class="loot-bar">
                        <div style="font-size:1rem; margin:12px 0">选取你的奖励</div>
                        <div style="display: flex; justify-content: space-around">
                            <div class="heal attribute" @click="addAttribute('heal')">{{ stage % 10 == 0 ? '2x' : '' }}回复血量 </div>
                            <div class="heal-max attribute" @click="addAttribute('maxHealth')">{{ stage % 10 == 0 ? '2x' : '' }}最大生命</div>
                            <div class="max-MP attribute" @click="addAttribute('maxMana')">{{ stage % 10 == 0 ? '2x' : '' }}最大法力</div>
                        </div>
                        <div class="loot-title">或选择其中一个魔法</div>
                        <div class="loot-item-bar">
                            <div v-for="(item,index) in lootList" :class="'loot-item ' + item.quality" :key="index" @click="addMagic(item)">
                                {{ item.magic_name }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex; justify-content: center">
                <div class="health-bar">
                    <div id="current-health" :style="healthPer"></div>
                    HP：{{ you.health }}/{{ you.maxHealth }}
                </div>
                <div class="mana-bar">
                    <div id="current-mana" :style="manaPer"></div>
                    MP：{{ you.mana }}/{{ you.maxMana }}
                </div>
            </div>
        </div>
        <!--法杖 -->
        <div class="wand-editor">
            <div class="round-ended" @click="nextRound">
                下一回合<br/>(回复魔力)
            </div>
            <div class="wand-bar">
                <div class="wand-title">点击选切换魔法</div>
                <div style="display: flex; flex-direction: row;flex-wrap: wrap;">
                    <div
                        v-for="(wandBox,index) in wand.magicBox"
                        :class="'wandBox ' + wandBox.quality + (wandBox.magic_id == currentMagic.magic_id?' choose-magic':'')"
                        :key="index"
                        @click="useMagic(wandBox)"
                        >
                        {{ wandBox.magic_name }}
                        <Poptip  trigger="click" :title="wandBox.magic_name">
                            <Icon style="font-size: 24px" type="ios-information-circle-outline" />
                            <div slot="content">
                                <div class="magic-describe">
                                    <div class="describe">
                                        {{'消耗魔力:'+wand.magicBox[index].MP}}
                                    </div>
                                    <div class="describe">
                                        {{'伤害:'+wand.magicBox[index].damage}}
                                    </div>
                                    <div class="describe">
                                        {{wand.magicBox[index].magic_describe}}
                                    </div>
                                </div>
                            </div>
                        </Poptip>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Character from './Character.vue';
import wand from './wand.js';
import you from './you.js'
import { lootMagic, summonEnemyList } from './utils.js';
export default {
    components: { Character },
    name:'GamePage',
    data(){
        return {
            score: 0,
            you:new you(),
            enemyList:[],
            isLoot:false,
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
            this.$emit('click',3);
        },
        initGame(){
            this.score = 0;
            this.you.health = 30;
            this.you.maxHealth = 30;
            this.lootList = [];
            this.magicPool = [];
            this.stage = 1;
            this.wand.reload();
            for(let i = 0; i < 5; i++){
                this.lootList.push(lootMagic('normal'));
            }
            this.summonEnemy();
            this.currentMagic = this.wand.magicBox[0];
        },
        useMagic(item){
            this.currentMagic = item;
        },
        summonEnemy() {
            if(this.stage >= 50 && this.stage % 5 == 0){
                this.enemyList.push(...summonEnemyList('lastBoss'))
            }else if(this.stage % 10 == 0 && this.stage != 0){
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
            for(let i = 0; i < this.enemyList.length; i++){
                if(this.enemyList[i].isDied){
                    this.enemyList.splice(i,1);
                    i--;
                    this.score += this.stage / 10 * 5;
                }
            }
        },
        checkFightEnd(){
            if(this.isFightWin){
                this.summonLoot();
            }
        },
        addAttribute(type){
            switch(type){
                case 'heal':
                    this.you.heal(this.stage % 10 == 0 ? 40 : 20);
                    break;
                case 'maxHealth':
                    this.you.healMax(this.stage % 10 == 0 ? 10 : 5)
                    break;
                case 'maxMana':
                    this.you.manaMax(this.stage % 10 == 0 ? 8 : 16);
                    break;
            }
            this.isLoot = false;
            this.nextFight();
        },
        addMagic(item){
            if(this.wand.addMagic(item) == -1){
                return
            }
            this.isLoot = false;
            this.nextFight();
        },
        nextFight(){
            this.score += (Math.pow(10,Math.floor(this.stage / 10)) * (this.stage % 10) );
            this.stage++;
            this.$emit('getScore',this.score);
            this.summonEnemy();
            this.you.mana = this.you.maxMana;
        },
        summonLoot(){
            this.lootList = [];
            if(this.stage % 10 == 0 && this.stage != 0){
                for(let i = 0; i < 3; i++){
                    this.lootList.push(lootMagic('legend'));
                }
            }else if(this.stage > 50){
                for(let i = 0; i < 5; i++){
                    this.lootList.push(lootMagic('great'));
                }
            }else{
                for(let i = 0; i < 5; i++){
                    Math.random() > 0.3 ?
                    this.lootList.push(lootMagic('normal')) :
                    this.lootList.push(lootMagic('great'));
                }
            }
            this.isLoot = true;
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
            if(!this.isEnd){
                this.you.mana = this.you.maxMana;
                for(let item of this.enemyList){
                    this.you.health -= item.Active();
                }
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
            if(this.you.mana - this.currentMagic.MP < 0){
                res = false;
            }
            return res
        },
        isFightWin(){
            let res = false;
            if(this.enemyList.length == 0){
                res = true;
            }
            return res;
        },
        manaPer(){
            return this.you.getManaPer();
        },
        healthPer(){
            return this.you.getHealthPer();
        },
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
    justify-content: space-between;
    border: solid black 1px;
    min-width: 95%;
    height: 60%;
    position: relative;
}
.new-guide{
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
}
.enemy,.you{
    display: flex;
}
.round-ended{
    margin: 4px auto;
    border: black solid 1px;
    width: 80%;
    padding: 4px;
    border-radius: 24px;
    cursor: pointer;
    font-size: small;
}
.wand-editor{
    height: 40%;
}
.wand-bar {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    border: solid black 1px;
    min-height: 150px;
}

.wandBox{
    cursor: pointer;
    border: solid black 1px;
    border-radius: 10px;
    width: 40%;
    height: 50px;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}
.loot-title{
    font-size: 1.2rem;
    margin: 12px 0;
}
.loot-bar{
    display: flex;
    flex-direction: column;
    width: 95%;
}

.loot-item-bar{
    display: flex;
    flex-direction: column;
}
.loot-item{
    cursor: pointer;
    border: solid black 1px;
    border-radius: 10px;
    width: 90%;
    margin: 8px auto;
    padding:0 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
}
.health-bar{
    position: relative;
    margin: 12px;
    width: 40%;
    border: solid black 1px;
}
#current-health{
    position: absolute;
    background-color: rgb(214, 88, 88);
    height: 100%;
    z-index: -1;
}
.mana-bar{
    position: relative;
    margin: 12px;
    width: 40%;
    border: solid black 1px;
}
#current-mana{
    position: absolute;
    background-color: rgb(103, 149, 235);
    height: 100%;
    z-index: -1;
}
.choose-magic{
    border: solid red 4px;
    margin: 1px;
}
.attribute{
    font-size: 1rem;
    font-weight: bolder;
    color: rgb(79, 79, 79);
    margin: 0 2px;
    border: black solid 1px;
    width: 30%;
    padding: 2px;
    border-radius: 24px;
    cursor: pointer;
}
.heal{
    background-color: rgb(117, 223, 107);
}
.heal-max{
    background-color: rgb(219, 103, 103);
}
.max-MP{
    background-color: rgb(107, 125, 223);
}
.magic-describe{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.describe{
    display: flex;
    justify-content: flex-start;
}
.end-game{
    display: flex;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    font-size: 5rem;
    color: rgb(185, 24, 24);
    cursor: pointer;
}
// 品质颜色
</style>
<style>
.Tier1{
    background-color: #ffffff;
}
.Tier2{
    background-color: #3f3cff;
    color: white;
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