class you {
    constructor(){
        this.mana = 50;
        this.maxMana = 50;
        this.health = 30;
        this.maxHealth = 30;
    }
    heal(Hp){
        this.health += Hp;
        if(this.health > this.maxHealth){
            this.health = this.maxHealth;
        }
    }
    healMax(Hp){
        this.maxHealth += Hp;
        this.health += Hp;
    }
    manaMax(mana){
        this.maxMana += mana
    }
    getManaPer(){
        let res = this.mana / this.maxMana * 100;
        return `width: ${res}%`;
    }
    getHealthPer(){
        let res =this.health / this.maxHealth * 100;
        return `width: ${res}%;`
    }
}

export default you