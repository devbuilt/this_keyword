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
    this.person = "Leo";
}

console.log(person)//Leo

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

//NESTED OBJECTS
// What happends when we have a nested object

let people = {
    firstName: "Leo",
    sayHi: function(){
        return "Hi " + this.firstName;
    },
    determineContext: function(){
        return this === people;
    },
    dog: {
        sayHello: function(){
            return "Hello " + this.firstName;
        }
    }
}

person.sayHello()// "Hi leo"
person.determineContext()//true
//but what is the value of the keyword this right now?
person.dog.sayHello.call(person); //"Hello Leo" 
person.dog.determineContext.call(person)//true


//using call in the wild

let leo = {
    firstName: "Leo",
    sayHi: function(){
        return "Hi " + this.firstName
    }
}

let ana = {
    firstName: "Ana",// used call with this
    
}


leo.sayHi()//Hi Leo
ana.sayHi.call(ana)//Hi Ana (but we had to copy and paste the function from above..)

// How can we refactor the duplicate using call?

//how can we "borrow" the sayHi function from Leo
//and set the value of "this" to be Ana

// What about apply
let leo = {
    firstName: "Leo",
    sayHi: function () {
        return "Hi " + this.firstName
    }
}

let ana = {
    firstName: "Ana",// used call with this

}


leo.sayHi()//Hi Leo
ana.sayHi.apply(ana)//Hi Ana

//well this seems the same... but what happens when we start adding arguments?


let leo = {
    firstName: "Leo",
    sayHi: function () {
        return "Hi " + this.firstName
    },
    addNumbers: function(a,b,c,d){
        return this.firstName + " just calculated " + (a+b+c+d);
    }
}

let ana = {
    firstName: "Ana" // used call with this

}


leo.addNumbers(1,2,3,4)//Leo jus calculated
leo.addNumbers.call(ana,1,2,3,4)// Ana just calculated 10
leo.addNumbers.apply(ana,[1,2,3,4])// Ana just calculated to 10

// Bind 
//The paramenters work like call, but bind returns a function with the context
//of "this" bound already

let leo = {
    firstName: "Leo",
    sayHi: function () {
        return "Hi " + this.firstName
    },
    addNumbers: function (a, b, c, d) {
        return this.firstName + " just calculated " + (a + b + c + d);
    }
}

let ana = {
    firstName: "Ana" // used call with this

}

let anaCalc = leo.addNumbers.bind(ana,1,2,3,4)// function(){}..
anaCalc();// Ana just calculated to 10

let anaCalc2 = leo.addNumbers.bind(ana,1,2)// function(){}
anaCalc2();// Ana just calculated to 10
