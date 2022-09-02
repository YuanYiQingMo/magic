class enemy {
    constructor(enemy) {
        this.id = enemy.id;
        this.name = enemy.name;
        this.HP = enemy.HP;
        this.maxHP = enemy.HP;
        this.atk = enemy.atk;
        this.def = enemy.def;
        this.heal = enemy.heal;
        this.buff = enemy.buff;
        this.describe = enemy.describe;
        this.isDied = false;
        this.shield = 0;
        this.nextActive = "ATK";
    }
    died() {
        this.isDied = true;
    }
    getDamage(damage) {
        if (this.shield - damage < 0) {
            this.HP -= damage - this.shield;
        } else {
            this.shield -= damage;
        }
        if (this.HP < 1) {
            this.died();
        }
    }
    difficultModifier(stage) {
        let modifier = 1;
        modifier = 1 + ((stage - 1) / 10) * 2;
        this.maxHP = Math.floor(this.HP * modifier);
        this.HP = Math.floor(this.maxHP);
    }
    getSettlement(magic) {
        if (magic.magic_effect.length != 0) {
            for (let i = 0; i < magic.magic_effect.length; i++) {
                this.getEffect(magic.magic_effect[i], magic.damage);
            }
        } else {
            this.getDamage(magic.damage);
        }
    }
    getHealthPer() {
        let res = (this.HP / this.maxHP) * 100;
        return `width: ${res}%;`;
    }
    nexRoundActive() {
        let activeNum = Math.random();
        if (activeNum > 0.7 && this.buff.length == 0) {
            this.nextActive = "BUFF";
        } else if (activeNum > 0.4 && this.def) {
            this.nextActive = "DEF";
        } else {
            this.nextActive = "ATK";
        }
    }
    Active() {
        let damage = 0;
        this.shield = 0;
        switch (this.nextActive) {
            case "ATK":
                damage = this.atk;
                break;
            case "DEF":
                damage = 0;
                this.shield += this.def;
                break;
            case "BUFF":
                damage = 0;
                break;
        }
        this.nexRoundActive();
        return damage;
    }
    getEffect(effect, damage) {
        switch (effect) {
            case "lowFreeze":
                Math.random() > 0.9
                    ? this.getDamage(damage)
                    : this.getDamage(damage),
                    (this.describe += "冻住了,随便打"),
                    (this.atk = 0);
                break;
            case "lowDodge":
                if (Math.random() > 0.2) {
                    return;
                }
                break;
            case "RGB":
                var red = Math.floor(Math.random() * 255);
                var green = Math.floor(Math.random() * 255);
                var blue = Math.floor(Math.random() * 255);
                this.RGB = `color: rgb(${red},${green},${blue}) !important;
                            background-color:rgba(${red},${green},${blue},0.4) !important`;
        }
        this.getDamage(damage);
    }
}

export default enemy;
