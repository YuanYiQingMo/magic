<template>
    <div class="warper">
        <div
            @click="attack"
            :class="'character-name ' + type"
            :style="enemy.RGB"
        >
            <slot></slot>
            <div class="describe">{{enemy.describe}}</div>
            <br />
            <div>
                <div style="font-size: 1rem; font-weight: 550;color: rgb(214, 88, 88);">下一回合</div>
                <div v-if="enemy.nextActive == 'ATK'" style="font-size: 1rem; font-weight: 550;color: rgb(214, 88, 88);">
                    {{ `攻击:${enemy.atk}` }}
                </div>
                <div v-if="enemy.nextActive == 'DEF'" style="font-size: 1rem; font-weight: 550;color: rgb(79, 146, 221) ;">
                    {{ `防御:${enemy.def}` }}
                </div>
            </div>
            <!-- TODO 添加buff -->
            <!-- <div v-if="enemy.nextActive == 'BUFF'" style="font-size: 0.3rem">
                {{`BUFF:${enemy.buff}` }}
            </div> -->
        </div>
        <div v-if="type == 'enemy'" class="Hp-bar">
            <div
                id="current-health"
                :style="healthPer"
                :class="enemy.shield != 0 ? 'shield' : ''"
            ></div>
            {{ enemy.HP }}/{{ enemy.maxHP }}
            <template v-if="enemy.shield"> (格挡:{{ enemy.shield }}) </template>
        </div>
    </div>
</template>
<script>
import enemy from "./enemy";
import magic from "./magic";
export default {
    name: "Character",
    props: {
        type: {
            type: String,
        },
        enemy: {
            type: enemy,
        },
        stage: {
            type: Number,
        },
        settlement: {
            type: Boolean,
        },
        magic: {
            type: magic,
        },
    },
    methods: {
        attack() {
            if (this.type == "enemy") {
                if (this.settlement) {
                    this.enemy.getSettlement(this.magic);
                }
            }
            this.$emit("useMana", this.magic.MP);
        },
    },
    mounted() {
        if (this.type == "enemy") {
            this.enemy.difficultModifier(this.stage);
        }
    },
    computed: {
        healthPer() {
            return this.enemy.getHealthPer();
        },
    },
};
</script>
<style scoped>
.describe{
    font-size: 14px;
    font-weight: 400;   
}
.warper {
    width: 100%;
}
.character-name {
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    margin: 12px 6px;
    padding: 4px;
    height: 80%;
    border: solid black 1px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-content: space-between;
    justify-content: space-between;
    align-items: center;
}
.choose {
    border: solid red 4px;
    margin: 8px 20px;
}
.Hp-bar {
    position: relative;
    margin: 12px auto;
    width: 80%;
    border: solid black 1px;
}
#current-health {
    position: absolute;
    background-color: rgb(214, 88, 88);
    height: 100%;
    z-index: -1;
}
.shield {
    background-color: rgb(79, 146, 221) !important;
    width: 100% !important;
}
</style>
