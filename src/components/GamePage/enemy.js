class enemy{
    constructor(enemy){
        this.id = enemy.id
        this.name = enemy.name;
        this.HP = enemy.HP;
        this.maxHP = enemy.HP;
        this.atk = enemy.atk;
        this.def = enemy.def;
        this.heal = enemy.heal;
        this.buff= enemy.buff;
        this.describe=enemy.describe;
        this.isDied = false;
        this.shield = 0;
    }
    died(){
        this.isDied = true;
    }
    getDamage(damage){
        if(this.shield - damage < 0){
            this.HP -= (damage - this.shield)
        }else{
            this.shield -= damage
        }
        if(this.HP < 1){
            this.died()
        }
    }
    difficultModifier(stage){
        let modifier = 1;
        modifier = 1 + stage / 10;
        this.maxHP = this.HP * modifier;
        this.HP = this.maxHP;
    }
}

export default enemy;