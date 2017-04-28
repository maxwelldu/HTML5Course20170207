/**
 * Created by sks on 2017/4/28.
 */

// Load and instantiate Chance
var chance = require('chance').Chance();

// Use Chance here.
var my_random_string = chance.string();
var phone = chance.phone();
console.log(my_random_string);
console.log(phone);