const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("./models/recipe");
const Query = require("./models/query");
const app = express();

app.set("view engine", "ejs");

//middleware to allow access to static files
app.use(express.static("public"));

//Format data using express middleware urlencoded()
app.use(express.urlencoded({ extended: true }));


//connection to mongoDB
const dbURI = "mongodb+srv://shaneb3:123456abcdefg@webappca2.kwiidum.mongodb.net/myRecipe?retryWrites=true&w=majority";
//after connection, start server on port 3004
mongoose.connect(dbURI)
    //.then((result) => console.log("Successfully connected to MongoDB")) 
    .then((result) => app.listen(3004))
    .catch((error) => console.log(error));

//get main page, with recipe database imported
app.get("/", (request, response) => {
    Recipe.find().sort({ createdAt: -1 })    
    .then((result) => response.render("index", { title: "Home", recipes: result }))    
    .catch((error) => console.log(error));
});

//get contact page
app.get("/contact", (request, response) => {
    response.render("contact", { title: "contact" });  
});

//get specific recipe ID
app.get("/:id", (request, response) => {
    const id = request.params.id;  
    //mongoose method to find my id
    Recipe.findById(id)  
    .then(result => response.render("recipe", {recipe: result, title: "Single recipe" }))  
    .catch((error) => console.log(error));
});



//add new recipe to database, display on index page
app.post("/", (request, response) => {  
    //retrieve the new recipe details 
    const recipe = new Recipe(request.body); 
    recipe.save()  
    .then((result) => { response.redirect("/") })  
    .catch((error) => console.log(error));
    });

//add new recipe to database, display on index page
app.post("/contact", (request, response) => {  
    //retrieve the new recipe details 
    const query = new Query(request.body); 
    query.save()  
    .then((result) => { response.redirect("/contact") })  
    .catch((error) => console.log(error));
    });

app.post("/:id", (request, response) => {  
    //retrieve the new recipe details  
    const recipe = new Recipe(request.body);
    //parse it into two separate objects: the recipe new details and the ID  
    const newRecipeData = { recipeName: recipe.recipeName, ingredients: recipe.ingredients }  
    const id = { _id: recipe.id };
        //Mongoose method to find and update recipe details, then find the recipe and render it.
        Recipe.findOneAndUpdate(id, newRecipeData)    
            .then((result) => { Recipe.findById(id)        
            .then(result => response.render("recipe", { recipe: result, title: "Single recipe" }))    
            })    
            .catch((error) => console.log(error)); 
});

    
app.delete("/:id", (request, response) => {  
        const id = request.params.id;  
        Recipe.findByIdAndDelete(id)
        //JSON Key : Value object sent to AJAX load page
        .then((result) => { response.json({ redirect: "/" }) }) 
        .catch((error) => console.log(error));
});

//404 page
app.use((request, response) => {
    response.status(404).render("404", { title: "Error" });
});




