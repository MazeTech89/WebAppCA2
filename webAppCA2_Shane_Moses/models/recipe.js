const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;
const recipeSchema = new Schema({  

    recipeName: {    
        type: String,    
        required: true  
    },  
    ingredients: {    
        type: String,    
        required: true  
    },  
 }, { timestamps: true });

 //need to name it "recipe" as it is the non-plural of recipes which is the name of our database schema (recipes).
 const Recipe = mongoose.model("recipe", recipeSchema);

 //export it so app.js can use it
 module.exports = Recipe;