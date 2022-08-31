<template>
    <div>
        <div @click="attack" :class="'character-name '+type">
            <slot></slot>
        </div>
        <div v-if="type == 'enemy'" class="HpBar">
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
                    this.enemy.getDamage(this.magic.damage);
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
    }
}
</script>
<style scoped>
.character-name{
    font-size: bolder;
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
</style>