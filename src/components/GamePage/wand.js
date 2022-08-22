import { Message } from "view-design";
const DEFAULT_MAGIC = require('../../assets/Pool/magic_pool.json').Tier1[0];
const DEFAULT_MAX_LENGTH = 4;

class wand{
    constructor(){
        this.magicBox=[];
        this.magicMaxLength = DEFAULT_MAX_LENGTH;
    }
    addMagic(item){
        if(this.magicBox.length < this.magicMaxLength){
            this.magicBox.push(item);
        }else{
            Message.error('你的法术容量不足');
        }
    }
    deleteMagic(index){
        this.magicBox.splice(index, 1);
    }
    updateWand(maxLength){
        this.magicMaxLength = maxLength;
    }
    reload(){
        this.magicBox = [DEFAULT_MAGIC];
        this.magicMaxLength = DEFAULT_MAX_LENGTH;
    }
}

export default wand