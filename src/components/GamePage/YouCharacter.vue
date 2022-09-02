<template>
    <div>
        <div @click="touch" class='character-name you'>
            <slot></slot>
        </div>
    </div>
</template>
<script>
import magic from './magic'
import you from './you';
export default {
    name:'YouCharacter',
    props:{
        you:{
            type:you,
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
        touch(){
            console.log(111);
        }
    },
    computed:{
    }
}
</script>
<style scoped>
.character-name{
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    margin: 12px 6px;
    padding: 10px;
    height: 80%;
    border: solid black 1px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-content: space-between;
    justify-content: center;
    align-items: center;
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