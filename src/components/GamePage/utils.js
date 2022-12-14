/* 魔法生成工具 */
const magic_pool = require('../../assets/Pool/magic_pool.json');
const enemy_pool = require("../../assets/Pool/enemy_pool.json");

// 控制生成物品品质
// rate为奖励池品质
export function randomRate(rate){
    //normal 40 30 20 4 1
    //great 10 20 40 25 5
    //legend 0 0 40 40 20
    let randomNum = Math.floor(Math.random() * 100);
    switch(rate){
        case 'normal':
            if(randomNum < 1) return 'Tier5'
            if(randomNum < 5) return 'Tier4'
            if(randomNum < 30) return 'Tier3'
            if(randomNum < 60) return 'Tier2'
            return 'Tier1'
        case 'great':
            if(randomNum < 3) return 'Tier5'
            if(randomNum < 20) return 'Tier4'
            if(randomNum < 60) return 'Tier3'
            if(randomNum < 80) return 'Tier2'
            return 'Tier1'
        case 'legend':
            if(randomNum < 10) return 'Tier5'
            if(randomNum < 70) return 'Tier4'
            return 'Tier3'
    }
}

// 生成魔法
import magic from './magic.js';
export function lootMagic(rate){
    let quality = randomRate(rate);
    let randomId = Math.floor(Math.random() * ((magic_pool[quality]).length));
    (magic_pool[quality])[randomId].quality = quality;
    let magicData = (magic_pool[quality])[randomId];
    let res = new magic(magicData);
    return res;
}
// 生成敌人
import enemy from './enemy.js'

let enemyCount = 0;
function summonEnemy(difficult){
    let randomId = Math.floor(Math.random() * ((enemy_pool[difficult]).length));
    let enemyData = JSON.parse(JSON.stringify((enemy_pool[difficult])[randomId]));
    enemyData.id = enemyCount;
    enemyCount++;
    let res = new enemy(enemyData);
    // console.log(res)
    return res
}
export function summonEnemyList(difficult){
    let res = [];
    let randomNum = Math.random() * 100;
    switch(difficult){
        case 'normal':
            for(let i = 0; i < Math.floor(Math.random() * 3) + 1; i++){
                res.push(summonEnemy('normal'))
            }
            if(randomNum < 3)
                res.push(summonEnemy('elite'))
            break;
        case 'elite':
            res.push(summonEnemy('elite'))
            for(let i = 0; i < 2; i++){
                if( randomNum > 80)
                    res.push(summonEnemy('elite'))
                else if(randomNum > 30)
                    res.push(summonEnemy('normal'))
                else
                    return res
            }
            break;
        case 'boss':
            res.push(summonEnemy('boss'));
            return res
        case 'lastBoss':
            res.push(summonEnemy('lastBoss'));
            return res;
    }
    return res;
}