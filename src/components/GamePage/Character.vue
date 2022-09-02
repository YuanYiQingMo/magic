<template>
    <div>
        <div @click="attack" :class="'character-name '+type">
            <slot></slot>
            <br/>
            <div style="font-size: 0.3rem">
                ATK : {{ enemy.atk }}
            </div>
        </div>
        <div v-if="type == 'enemy'" class="Hp-bar">
            <div id="current-health" :style="healthPer"></div>
            {{ enemy.HP }}/{{ enemy.maxHP }}
        </div>
    </div>
</template>
<script>
import enemy from './enemy';
import magic from './magic'
export default {
    name:'Character',
    props:{
        you:{
            type:Object,
        },
        type: {
            type:String
        },
        enemy: {
            type:enemy
        },
        stage: {
            type:Number
        },
        settlement: {
            type:Boolean
        },
        magic: {
            type:magic
        }
    },
    methods:{
        attack(){
            if(this.type == 'enemy'){
                if(this.settlement){
                    this.enemy.getSettlement(this.magic);
                }
            }else{
                this.getDamageP(1)
            }
            this.$emit('useMana',this.magic.MP)
        },
        getDamageP(damage){
            this.you.health -= damage;
        }
    },
    mounted(){
        if(this.type == 'enemy'){
            this.enemy.difficultModifier(this.stage)
        }
    },
    computed:{
        healthPer(){
            return this.enemy.getHealthPer();
        }
    }
}
</script>
<style scoped>
.character-name{
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    margin: 12px 24px;
    padding: 10px;
    border: solid black 1px;
    border-radius: 12px;
}
.choose{
    border: solid red 4px;
    margin: 8px 20px;
}
.Hp-bar{
    position: relative;
    margin: 12px auto;
    width: 80%;
    border: solid black 1px;
}
#current-health{
    position: absolute;
    background-color: rgb(214, 88, 88);
    height: 100%;
    z-index: -1;
}
</style>