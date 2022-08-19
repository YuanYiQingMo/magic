<template>
    <div class="start">
        <Button type="primary" @click="startGame">开始游戏</Button>
    </div>
</template>
<script>

export default {
    name:'startPage',
    methods:{
        startGame(){
            this.$emit('click',2)
        }
    }
}
</script>
<style lang="scss" scoped>
</style>