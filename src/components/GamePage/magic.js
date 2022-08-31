class magic{
    constructor(magicData){
        this.magic_id= magicData.magic_id;
        this.magic_name= magicData.magic_name;
        this.magic_effect_id= magicData.magic_effect_id;
        this.MP= magicData.MP;
        this.damage= magicData.damage;
        this.magic_describe= magicData.magic_describe;
        if(magicData.quality){
            this.quality = magicData.quality;
        }else{
            this.quality = 'Tier1';
        }
    }

}

export default magic;