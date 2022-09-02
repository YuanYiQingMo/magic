<template>
    <div class="playAgain">
        <div>
            得分:{{score}}
        </div>
        <Button type="primary" @click="playAgain">再玩一次</Button>
    </div>
</template>
<script>

export default {
    name:'endGame',
    props:{
        score:{
            type:Number
        }
    },
    methods:{
        playAgain(){
            this.$emit('click',2)
        }
    }
}
</script>
<style lang="scss" scoped>
</style>