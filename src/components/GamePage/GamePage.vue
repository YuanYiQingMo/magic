<template>
    <div class="inGame">
        <Button type="primary" @click="endGame">结束游戏</Button>
    </div>
</template>
<script>

export default {
    name:'inGamePage',
    methods:{
        endGame(){
            this.$emit('click',3)
        }
    }
}
</script>
<style lang="scss" scoped>
</style>