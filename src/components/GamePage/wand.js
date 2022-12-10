import { Message } from "view-design";
import magic from './magic.js';
const default_magic_data = require('../../assets/Pool/magic_pool.json').Tier1[0];
const DEFAULT_MAGIC = new magic(default_magic_data)
const DEFAULT_MAX_LENGTH = 10;

class wand{
    constructor(){
        this.magicBox=[];
        this.magicMaxLength = DEFAULT_MAX_LENGTH;
    }
    addMagic(item){
        if(this.magicBox.length < this.magicMaxLength){
            for(let magic of this.magicBox){
                if(item.magic_id == magic.magic_id){
                    Message.error('你已经学会这个魔法了喵')
                    return -1;
                }
            }
            this.magicBox.push(item);
        }else{
            Message.error('已经塞不下魔法了喵~');
        }
    }
    deleteMagic(index){
        this.magicBox.splice(index, 1);
    }
    updateWand(maxLength){
        this.magicMaxLength += maxLength;
    }
    reload(){
        this.magicBox = [DEFAULT_MAGIC];
        this.magicMaxLength = DEFAULT_MAX_LENGTH;
    }
}

export default wand;