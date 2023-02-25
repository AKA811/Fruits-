// require mongoose
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
//connect database
mongoose.connect("mongodb://127.0.0.1:27017/fruitDB", {
  useNewUrlParser: true
});

//log connect
console.log("connect")

//create Schema
const fruitSchema = new mongoose.Schema ({
    name:{
    type:String,
    required:[true,"Please check your data entry no name speciifed!"]
  },
    score:{
    type:Number,
    min:1,
    max:10
  },
    review: String
});

//create Model
const Fruit = mongoose.model("Fruit", fruitSchema);

// create Item
const fruit = new Fruit ({
    name: "Apple",
    score: 5,
    review: "Best fruit"
});



//second Schema
const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
   favouriteFruit:fruitSchema
});

//Second Model
const Person = mongoose.model("Person", personSchema);

const pineapple=new Fruit({
  name:"Pineapple",
  score:9,
  review:"Great Fruit."
});

pineapple.save();
//Second Item
const person = new Person ({
    name: "Amy",
    age: 37,
    favouriteFruit:pineapple
});
person.save();

//creating mutliple items
const kiwi = new Fruit ({
    name: "Kiwi",
    score: 4,
    review: "The Best Fruit!"
});

const orange = new Fruit ({
    name: "Orange",
    score: 4,
    review: "Too sour for me"
});

const banana = new Fruit ({
    name: "Banana",
    score: 3,
    review: "Weird texture"
});

//insertMany items
Fruit.insertMany([kiwi, orange, banana], (err)=> {
    if (err) {
        console.log(err);
    } else {
        console.log("Succesfully saved all the fruits to the fruitDB");
    }
});
Fruit.find(function(err,Fruits)
{
if(err)
{
console.log(err);
}
else
{
Fruits.forEach(function(fruit)
{
console.log(fruit.name);
});
}
});
