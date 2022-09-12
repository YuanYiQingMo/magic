<template>
    <div class="playAgain">
        <div class="score">得分:{{ score }}</div>
        <div class="describe">您的魔法水平:{{ describe.describe }}</div>
        <div class="comment">{{ describe.comment }}</div>
        <Button
            class="end-btn"
            shape="circle"
            size="large"
            type="dashed"
            @click="playAgain"
        >
            <div>再来一次</div>
        </Button>
    </div>
</template>
<script>
export default {
    name: "endGame",
    props: {
        score: {
            type: Number,
        },
    },
    methods: {
        playAgain() {
            this.$emit("click", 2);
        },
    },
    computed: {
        describe() {
            if (this.score < 1) {
                return {
                    describe: "婴儿",
                    comment: "怎么感觉路边的婴儿都比你强",
                };
            }
            if (this.score < 5) {
                return {
                    describe: "麻瓜",
                    comment: "看来您是一个普通到不能再普通的人",
                };
            }
            if (this.score < 10) {
                return {
                    describe: "见过魔法的麻瓜",
                    comment: "您有见识过一些魔法师施放魔法",
                };
            }
            if (this.score < 50) {
                return {
                    describe: "魔法学徒",
                    comment: "您找了个魔法老师,并且学习了一点魔法",
                };
            }
            if (this.score < 70) {
                return {
                    describe: "见习魔法师",
                    comment: "您已经从魔法学院毕业,拥有一定的魔法基础",
                };
            }
            if (this.score < 100) {
                return {
                    describe: "小魔法师",
                    comment:
                        "您对魔法已经有了一点自己的见解,并且在附近的圈子里有了些名气",
                };
            }
            if (this.score < 200) {
                return {
                    describe: "魔法师",
                    comment:
                        "您已经是一名高贵的魔法师了,数不尽的财富和名声向您而来",
                };
            }
            if (this.score < 350) {
                return {
                    describe: "大魔法师",
                    comment:
                        "现在是时候超出自己的见解了,现在你拥有了能引发奇迹的力量",
                };
            }
            if (this.score < 500) {
                return {
                    describe: "魔导师",
                    comment:
                        "法师圈子里的人无人不知您的名号,您在魔法上的造诣已经登峰造极,世界上没有您不会使用的魔法",
                };
            }
            if (this.score < 1000) {
                return {
                    describe: "大魔导师",
                    comment:
                        "您已经完全参透了魔法的奥秘,地球上找不到能够打败您的人了",
                };
            }
            if (this.score < 5000) {
                return {
                    describe: "毁天灭地的法师",
                    comment:
                        "您已经超脱于凡世,世间的一切都将由你掌控,您可以毁灭整个地球,如果您喜欢的话",
                };
            }
            if (this.score < 10000) {
                return {
                    describe: "宇宙将由您主导",
                    comment:
                        "你已经超脱于世间,化身为概念一般的存在,您可以改变物理法则、时间、因果,宇宙间的一切都有您掌控",
                };
            }
            return {
                describe: "34岁老处男",
                comment:
                    "传说中30岁之前保存童真就能成为魔法师,但是这很的值得吗?",
            };
        },
    },
};
</script>
<style lang="scss" scoped>
.playAgain {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.score {
    margin: 12px 0;
    font-size: 2rem;
}
.describe {
    margin: 12px 0;
    font-size: 1.2rem;
}
.comment {
    font-size: 1rem;
    margin-bottom: 30px;
}
.end-btn {
    font-size: 1.5rem;
    padding: 8px;
    height: auto;
    width: auto;
}
</style>
