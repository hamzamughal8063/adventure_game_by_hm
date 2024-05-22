#! /usr/bin/env node
//SHABANG
//------------------------------ ADVENTURE_GAME ----------------------------------//
import inquirer from "inquirer";
//------------------------------ Game_variable -----------------------------------//
let enemies = ["Skeleton", "zombie", "Warrior", "Assassin"];
let maxEnemyHealth = 75;
let enemyAttackDamageToHero = 25;
//------------------------------ Player_variable -----------------------------------//
let heroHealth = 100;
let attackDamageToEnemy = 50;
let numHealthPotion = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50;
//------------------------------ While_loop_condition -----------------------------------//
let gameRunning = true;
console.log("Wellcome to DeadZone!");
Game: while (gameRunning) {
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);
    let enemyIndex = Math.floor(Math.random() * enemies.length);
    let enemy = enemies[enemyIndex];
    console.log(`# ${enemy} has appeared #\n`);
    while (enemyHealth > 0) {
        console.log(`Your Health: ${heroHealth}`);
        console.log(`${enemy} Health: ${enemyHealth}`);
        let options = await inquirer.prompt({
            name: "ans",
            type: "list",
            message: "what would you like to do",
            choices: ["1. Attack", "2. Take Health potion", "3. Run"]
        });
        if (options.ans === "1. Attack") {
            let damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1);
            let damageToHero = Math.floor(Math.random() * enemyAttackDamageToHero + 1);
            enemyHealth -= damageToEnemy;
            heroHealth -= damageToHero;
            console.log(`you strick the ${enemy} for ${damageToEnemy}`);
            console.log(`${enemy} strick you for ${damageToHero} damage.`);
            if (heroHealth < 1) {
                console.log("you have taken too much damage. you are too weak to continue.");
                break;
            }
        }
        else if (options.ans === "2. Take Health potion") {
            if (numHealthPotion > 0) {
                heroHealth += healthPotionHealAmount;
                numHealthPotion--;
                console.log(`you use health potion for ${healthPotionHealAmount}`);
                console.log(`you now have ${heroHealth} health`);
                console.log(`you have ${numHealthPotion} health potions left.`);
            }
            else {
                console.log(`you have no health potions left. defeat enemy for a chance get health potion`);
            }
        }
        else if (options.ans === "3. Run") {
            console.log(`you run away from ${enemy}`);
            continue Game;
        }
    }
    if (heroHealth < 1) {
        console.log(`you are out from battle. you are too weak.`);
        break;
    }
    console.log(`${enemy} was defeated!`);
    console.log(`you have ${heroHealth} health.`);
    let randomNumber = Math.floor(Math.random() * 100 + 1);
    if (randomNumber < healthPotionDropChance) {
        numHealthPotion++;
        console.log(`enenmy give you health potion`);
        console.log(`your health is ${heroHealth}`);
        console.log(`your health potion is ${numHealthPotion}`);
    }
    let userOptions = await inquirer.prompt({
        name: "ans",
        type: "list",
        message: "what would you like to do now",
        choices: ["1. Continue", "2. Exit"]
    });
    if (userOptions.ans === "1. Continue") {
        console.log(`you are continue on your adventure`);
    }
    else {
        console.log("you successgully Exit from DeadZone");
        break;
    }
    console.log("Thank you for playing.\n");
}
