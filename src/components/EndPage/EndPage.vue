<template>
    <div class="playAgain">
        <Button type="primary" @click="playAgain">再玩一次</Button>
    </div>
</template>
<script>

export default {
    name:'settlement',
    methods:{
        playAgain(){
            this.$emit('click',2)
        }
    }
}
</script>
<style lang="scss" scoped>
</style>