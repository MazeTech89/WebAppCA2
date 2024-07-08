const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;
const querySchema = new Schema({  

    email: {    
        type: String,    
        required: true  
    },  
    query: {    
        type: String,    
        required: true  
    },  
 }, { timestamps: true });

 //need to name it "recipe" as it is the non-plural of recipes which is the name of our database schema (querys).
 const Query = mongoose.model("query", querySchema);

 //export it so app.js can use it
 module.exports = Query;