<template>
    <div class="inGame">
        <div class="score">
            {{ score }}
        </div>
        <div class="battle-map">
            <character-name type="you">你</character-name>
            <div class="enemy" v-for="(index,enemy) in enemyList" :key="index">
                <character-name type="enemy">
                    {{ enemy.name }}
                </character-name>
            </div>
            <div class="health-bar">
                {{ health }}/{{ maxHealth }}
            </div>
        </div>
        <div class="switch-backpack">切换</div>
        <div class="backpack">
            <span v-for="(index,item) in itemList" class="item" :key="index" @click="useItem(item)">
                {{ item.name }}
            </span>
        </div>
        <div class="wand-editor">
            <div v-for="(index,wandBox) in wandBoxList" class="wandBox" :key="index">
                <div v-for="(index, wandBoxCell) in wandBox" class="wandBoxCell" :key="index">
                    {{ wandBoxCell?wandBoxCell.name:'' }}
                </div>
            </div>
        </div>
        <Button v-if="isEnd" type="primary" @click="endGame">结束游戏</Button>
    </div>
</template>
<script>
import CharacterName from './CharacterName.vue';
export default {
    components: { CharacterName },
    name:'inGamePage',
    data(){
        return {
            score: 0,
            health:30,
            maxHealth:30,
            itemList:[],
            wandBoxList:[[]],
        }
    },
    methods:{
        endGame(){
            this.$emit('click',3)
        },
        initGame(){
        }
    },
    computed:{
        isEnd(){
            let res = false;
            if(this.health <= 0){
                res = true;
            }
            return res
        }
    }
}
</script>
<style lang="scss" scoped>
</style>