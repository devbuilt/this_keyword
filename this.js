"use strict"
// if the keyword this is not inside a a declared object its value is global object...
console.log(this) // window

function whatIsThis(){
    return this
}
function variablesInThis(){
    //since the value of this is the window 
    // all we are doing here is creating a global variable
    // let's see what happens when we call the functions
    this.person = "Elie";
}

console.log(person)//Elie

variablesInThis() //TypeError, can't set person on undefined

whatIsThis()// undefined



//strict mode does NOT make a difference here

let person = {
    firstName: "Leo",
    sayHi: function(){
        return "HI " + this.firstName
    },
    determineContext: function(){
        return this === person
    }
}