/* 魔法生成工具 */
const magic_pool = require('../../assets/Pool/magic_pool.json')

// 控制生成物品品质
// rate为奖励池品质
export function randomRate(rate){
    //normal 40 30 20 9 1
    //great 10 20 40 25 5
    //legend 0 0 40 40 20
    let randomNum = Math.floor(Math.random() * 100);
    switch(rate){
        case 'normal':
            if(randomNum < 1) return 'Tier5'
            if(randomNum < 10) return 'Tier4'
            if(randomNum < 30) return 'Tier3'
            if(randomNum < 60) return 'Tier2'
            return 'Tier1'
        case 'great':
            if(randomNum < 5) return 'Tier5'
            if(randomNum < 30) return 'Tier4'
            if(randomNum < 70) return 'Tier3'
            if(randomNum < 90) return 'Tier2'
            return 'Tier1'
        case 'legend':
            if(randomNum < 20) return 'Tier5'
            if(randomNum < 60) return 'Tier4'
            return 'Tier3'
    }
}

// 生成魔法
export function lootMagic(rate){
    let quality = randomRate(rate);
    let randomId = Math.floor(Math.random() * ((magic_pool[quality]).length));
    (magic_pool[quality])[randomId].quality = quality;
    return (magic_pool[quality])[randomId];
}
