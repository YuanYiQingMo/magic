const DEFAULT_MAX_LENGTH = 4;

class wand{
    constructor(){
        this.magicBox=[];
        this.magicMaxLength = DEFAULT_MAX_LENGTH;
    }
    addMagic(item){
        this.magicBox.push(item);
    }
    deleteMagic(index){
        this.magicBox.splice(index, 1);
    }
    updateWand(maxLength){
        this.magicMaxLength = maxLength;
    }
    reload(){
        this.magicBox = [];
        this.magicMaxLength = DEFAULT_MAX_LENGTH;
    }
}

export default wand