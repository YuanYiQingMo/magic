<template>
    <div class="start">
        <div class="github"></div>
        <div class="afdian"></div>
        <div class="title"></div>
        <div class="title">魔法师模拟器</div>
        <div class="little-title">向着成为大魔法师前进吧</div>
        <Button class="start-btn" shape="circle" size="large" type="dashed" @click="startGame">
            <div>开始游戏</div>
        </Button>
    </div>
</template>
<script>
export default {
    name: "startPage",
    methods: {
        startGame() {
            this.$emit("click", 2);
        },
    },
};
</script>
<style lang="scss" scoped>
.start {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.title{
    margin: 24px;
    font-size: 4rem;
}
.little-title{
    display: flex;
    justify-content: flex-end;
    font-size: 1rem;
    margin: 24px 0;
}
.start-btn{
    font-size: 2rem;
    padding: 24px;
    height: auto;
    background-clip: border-box;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #FF512F;
    font-weight: 700;
    text-shadow: 0px 0px 7px #ffd800;
    background-image: linear-gradient(90deg, #ffd800 0%, #ff512f 100%, #fff);
    animation: glow-animation 2s infinite linear;
    color: #FFC0CB;
    box-sizing: border-box;
    vertical-align: inherit;
}

@keyframes glow-animation{
    0%{filter:hue-rotate(-360deg)}
    100%{filter:hue-rotate(360deg)}
}
</style>
