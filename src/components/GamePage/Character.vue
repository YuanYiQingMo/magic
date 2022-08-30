<template>
    <div>
        <div @click="attack" :class="'character-name '+type+isChoose">
            <slot></slot>
        </div>
        <div v-if="type == 'enemy'" class="HpBar">
            {{ enemy.HP }}/{{ maxHP }}
        </div>
    </div>
</template>
<script>
export default {
    name:'Character',
    data(){
        return {
            isChoose: '',
            HP:0,
            maxHP: 0,
        }
    },
    props:{
        type: {
            type:String
        },
        enemy: {
            type:Object
        },
        stage: {
            type:Number
        },
        settlement: {
            type:Boolean
        },
        currentMagic: {
            type:Object,
            default:() => {
                return{
                    magic_id: 40001,
                    magic_name: "大大大火球术",
                    magic_effect_id: [1, 2],
                    MP:10,
                    damage:4,
                    magic_describe:"很牛逼的攻击魔法"
                }
            }
        }
    },
    methods:{
        attack(){
            if(this.settlement == true){
                this.$emit('useMana',this.currentMagic.MP)
                this.getDamage(this.currentMagic.damage);
            }
        },
        getDamage(damage){
            console.log(this.enemy)
            if(this.enemy.HP - damage > 0){
                this.enemy.HP -= damage;
            }else{
                this.died()
            }
        },
        died(){
            this.$emit('died');
        }
    },
    mounted(){
        if(this.type == 'enemy'){
            this.maxHP = this.enemy.HP * this.difficultModifier;
            this.HP = this.maxHP;
        }
    },
    computed:{
        difficultModifier(){
            let modifier = 1;
            modifier = 1 + this.stage / 10;
            return modifier;
        },
        isSettlement(){
            return this.settlement;
        },
    },
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