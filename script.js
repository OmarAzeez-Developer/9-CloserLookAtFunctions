// activate strict mode
'use strict';

// Default Parameters
/*
// empty booking array
const bookingArray = []

// new way of setting default values directly in the function
const bookingFunction = function (flightNum = 1, passengersNum = 1, flightPrice = 700 * passengersNum) {

    // // old way of setting default values
    // // use short circuiting to setting default parameter values
    // // whenever flightNum, passengersNum, flightPrice are undefined which is falsy then return the second operand which is 1 in this case
    // flightNum = flightNum || 1;
    // passengersNum = passengersNum || 1;
    // flightPrice = flightPrice || 700;
    
    const bookingObject = {
        // use the enhanced object literal syntax
        // (flightNum: flightNum) same as (flightNum)
        flightNum,
        passengersNum,
        flightPrice,
    }
    console.log(bookingObject);
    
    // push booking info (which is (bookingObject) object) into (bookingArray) array every time you run (bookingFunction) function
    bookingArray.push(bookingObject)
}

// calling function
// default values
bookingFunction();
bookingFunction("LH123", "3");
// our values
bookingFunction("LH123", "3", "2100");

// you can NOT skip argument in the middle
bookingFunction("LH123", "2100");
// to get around this just set the argument to undefined
bookingFunction("LH123", undefined, "2100");
*/

///////////////////////////////////////////////////////////////////////////////////////////////////

// How Passing Arguments Works: Value(primitive) vs. Reference
/*
const flight = "LH234";
const omar = {
    name: "Omar Azeez",
    passport: 123456789,
}

const checkInFunction = function (flightNum, passenger) {
    // change flight and name
    flightNum = "LH999";
    passenger.name = "Mr. " + passenger.name;

    if (passenger.passport === 123456789) {
        alert("Check In");
    } else {
        alert("Wrong Passport");
    }
}

checkInFunction(flight, omar);

// flight did NOT change because it is a PRIMITVE type same as doing  const flightNum = flight
console.log(flight);


// passenger changed because we are copying the reference same as doing const passenger = omar
console.log(omar);


// to explain it more in this example below
const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 10000000);
}

newPassport(omar);
checkInFunction(flight, omar);

// javascript does NOT have passing by reference only by value
*/

///////////////////////////////////////////////////////////////////////////////////////////////////

// Functions Accepting Callback Functions
/*
// low level of abstraction
const oneWord = function (str) {
    // replace all the spaces with an empty string ""
    return str.replace(/ /g, "").toLowerCase();
}

// low level of abstraction
const upperFirstWord = function (str) {
    // we split the first word of the string when we reach an empty space then assign that word to (first) 
    // and the rest of the string to (others) using (REST ==> ...others) joined all by a " "
    const [first, ...others] = str.split(" ");
    return [first.toUpperCase(), ...others].join(" ")
}

// higher-order function takes a string and a function value
// high level of abstraction
const transformer = function(str, fn) {
    console.log(`Original String: ${str}`);
    console.log(`Transformed String: ${fn(str)}`);
    console.log(`Transformed By: ${fn.name}`);
}

// passing fuction value itself NOT calling the function means ==> upperFirstWord ==> callback function
transformer("JavaScript is the best!", upperFirstWord);
console.log("--------------------------------------------------------")
transformer("JavaScript IS the BEST!", oneWord);

const perfect = function () {
    console.log("👌");
}

// addEventListener ==> higher order function
// perfect ==> callback function
document.body.addEventListener("click", perfect);

// we use callback function
["Azeez", "Omar", "Abdullah"].forEach(perfect);

// so we basically did use (Abstraction) means we hide detial of code implementation because we do NOT care
// meaning that (transformer) function did NOT care how we did it
*/

///////////////////////////////////////////////////////////////////////////////////////////////////

// Functions Returning Functions
/*
const greet = function (greetingString) {
    return function (name) {
        console.log(`${greetingString} ${name}`);
    }
}

// the first function (greet) returned a new function stored in (greeterHey) variable which is now a function
// that we can call pasing a name ==> "Azeez", "Omar", "Abdullah"
const greeterHey = greet("Hey");
greeterHey("Azeez");
greeterHey("Omar");
greeterHey("Abdullah");

// passing directly because greet is a function
greet("hello")("PPU");

// re-write greet function using arrow function
const greetArr = greetingString => name => console.log(`${greetingString} ${name}`);
greetArr("hello")("RMU");
*/

///////////////////////////////////////////////////////////////////////////////////////////////////

// The (call) and (apply) and (bind) Methods
/*
const lufthansa = {
    airlinesName: "Lufthansa",
    iataCode: "LH",
    bookings: [],
    // write a method using the enhanced object literal syntax ==> book () {} same as book: function () {}
    book (flightNum, passengerName) {
        // (this) keyword point to (lufthansa) object
        console.log(`${passengerName} booked a seat on ${this.airlinesName} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({flight: `flight ${this.iataCode}${flightNum}`, passengerName})
    },
};

lufthansa.book(377, "Azeez");
lufthansa.book(277, "Omar");
lufthansa.book(177, "Abdullah");
console.log(lufthansa);

const eurowings = {
    airlinesName: "Eurowings",
    iataCode: "EW",
    bookings: [],
}

// the goal is to make (eurowings) have same method as (lufthansa) so we are NOT gonna copy because it is a bad practice
// instead we will store it in an external function then re-use for all different airlines
const book = lufthansa.book;

// // does NOT work
// book(77, "Jamal");

// call method
// we did NOT call (book) function ourselfs,
// instead we called (call) method then (call) method called (book) function to set (this) to (eurowings)
// (eurowings) is the first argument of call method ==> book.call(eurowings, 77, "Jamal");
book.call(eurowings, 77, "Jamal");
console.log(eurowings);

// do the same thing for lufthansa
book.call(lufthansa, 777, "Omar JR");

const swiss = {
    airlinesName: "Swiss Air Lines",
    iataCode: "LX",
    bookings: [],
}
book.call(swiss, 577, "Abdullah JR");
console.log(swiss);

// apply method
const flightData = [277, "Omar Azeez"];
book.apply(swiss, flightData);
console.log(swiss);

// use call with ((...) spread operator) as below
book.call(swiss, ...flightData);
console.log(swiss);

// bind method
// this will NOT call (book) function instead will return a new function which we assigned rturned function to (bookBind) function
const bookBindEW = book.bind(eurowings);
const bookBindLH = book.bind(lufthansa);
const bookBindLX = book.bind(swiss);

bookBindEW(2695, "Omar");
bookBindEW(177, "Azeez");
bookBindEW(277, "Abdullah");

// we use (bind) method to create a function for specific airline and specific flight number
const bookBindEW77 = book.bind(eurowings, 77);
// we only pass name because airline name and flight number set to specefic (set in stone)
bookBindEW77("Azeez JR");

// use bind with event listeners
lufthansa.planes = 300;
lufthansa.buyNewPane = function () {
    console.log(this);
    // add new plane every time we click
    this.planes++;
    console.log(this.planes);
};

// // it works because (this) keyword refers to (lufthansa) object
// // it does NOT work inside addEventListener because (this) keyword refers to addEventListener
// lufthansa.buyNewPane();

// (.buy) is the class in css file
// (this) keyword refering to the element on which that handler attached to (addEventListener)
// (this) keyword will point to the button element
// we manually need (this) to point to (lufthansa)
// we use (bind) because it will return new method which is the opposite of (call) which will calls a function
document.querySelector(".buy").addEventListener("click", lufthansa.buyNewPane.bind(lufthansa));

// example on (bind) method
const addTax = (rate, value) => (value) + (value * rate);
console.log(addTax(0.10, 200));

// null here refers to (this) which we do NOT see in the code above, we do NOT even need it, we do NOT care about it
const addVAT1 = addTax.bind(null, 0.23);

console.log(addVAT1(100));

// re-write example above using one function returning another function

const addTaxRate = function(rate) {
    return function (value) {
        return (value) + (value * rate);
    }
}

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
*/

///////////////////////////////////////////////////////////////////////////////////////////////////

// Coding Challenge #1
/*
// poll object
const poll = {
    question: "What is your favourite programming language?",
    options: ["0: JavaScript", "1: Python", "2: Rust", "3: 3C++"],
    // This generates [0, 0, 0, 0]. More in the next section!
    answers: new Array(4).fill(0),

    // transform an array to a string by using the (join) method
    registerNewAnswer() {
        // get an input from the user
        const answer = Number(prompt(`${this.question}\n${this.options.join("\n")}\n(Write option number)`));

        // console.log(answer);

        // short circuiting with (&&) operator
        // if first operand true then (&&) will keep going then second operand true then third operand executed.
        // if first or second operand false then third operand will NOT be executed
        typeof answer === "number" && answer < this.options.length && this.answers[answer]++;

        this.displayResults();
        this.displayResults("string");
    },

    displayResults(type = "array") {    // assign default value of type to "array"
        if (type === "array") {
            console.log(this.answers);
        } else if (type === "string") {
            console.log(`Poll results are: ${this.answers.join(", ")}`);
        }
    }

    };

    // add event listener to the answer poll button
    document.querySelector(".poll").addEventListener("click", poll.registerNewAnswer.bind(poll));

    // bonus
    // call (displayResults) NOT with (answers) array instead with this array ==>[5, 2, 3]
    // we have to use (call) method because we will need a new (this) keyword
    // we need an object that contains the answers property because (displayResults) method uses the (this.answers) property
    poll.displayResults.call({answers: [5, 2, 3]}, "string");
    poll.displayResults.call({answers: [1, 5, 3, 9, 6, 1]}, "string");
    poll.displayResults.call({answers: [1, 5, 3, 9, 6, 1]});
    */
    
    ///////////////////////////////////////////////////////////////////////////////////////////////

    // Immediately Invoked Function Expressions (IIFE)
    /*
    const runOnce = function () {
        console.log("This will never run again!");
    }
    runOnce();
    
    // functions executed only once and never again
    // it disappeared after it's called once
    // execute funtion immediately and NOT having to save it somewhere
    // wrap it in a parentheses to trick javascript thinking that this is just an expression
    (function () {
        console.log("This will never run again!");
    });
    // we call it immediately by adding () at the end
    (function () {
        console.log("This will never run again!");
        const isPrivate = 77;
    })();

    // // access the isPrivate is NOT possible because outter(global) does NOT have access to inner(private) or (encapsulated)
    // console.log(isPrivate);

    // same will work for an arrow function
    (() => console.log("This will never run again!"))();

    {   
        // can NOT be accessed outside of the block
        const isPrivate = 7;

        // can be accessed outside of the block because we use (var) to declare the variable
        var isNotPrivate = 7;
    }

    // // can NOT be accessed
    // console.log(isPrivate);

    // can be accessed
    console.log(isNotPrivate);
    */

    ///////////////////////////////////////////////////////////////////////////////////////////////

    // Closures
    /*
    const secureBooking = function () {
        let passengerCount = 0;

        return function () {
            passengerCount++;
            console.log(`${passengerCount} passengers`);
        }
    }

    const booker = secureBooking();

    booker();
    booker();
    booker();

    console.dir(booker);
    */

    ///////////////////////////////////////////////////////////////////////////////////////////////

    // More Closure Examples
    /*
    // example 1
    let f;
    const g = function () {
        const a = 7;
        f = function() {
            console.log(a * 2);
        }
    }

    const h = function () {
        const b = 777;
        f = function () {
        console.log(b * 2);
        };
    }

    g();
    f();

    // inspect the variable environment
    console.dir(f);         // closure at this point is a which is 7

    // re-assigned
    h();
    f();

    // inspect the variable environment
    console.dir(f);         // closure at this point is b which is 777

    // example 2
    const boardPassengers = function (passengersNum, waitTimne) {
        const perGroup = passengersNum / 3;

        // use a timer
        setTimeout(function(){
            console.log(`We are now boarding all ${passengersNum} passengers`);
            console.log(`There are 3 groups, each with ${perGroup} passengers`);
        }, waitTimne * 1000);
        
        console.log(`We will start boarding in ${waitTimne} seconds`);
    }

    // closure has priority over scope chain
    // if the scope chain has priority over the scope which is NOT then callback function will use (const perGroup = 1000) on line 441
    // if we have (const perGroup = 1000) down here on line 441 it will NOT work unless we comment 
    // (const perGroup = passengersNum / 3;) on line 425 so we get rid of the closure
    // line below will NOT work unless we comment line 425
    const perGroup = 1000;

    boardPassengers(180, 7);

    // // use a timer which is literally a call back function 
    // setTimeout(function(){
    //     console.log(`TIMER`);
    // }, 1000)
    */

    ///////////////////////////////////////////////////////////////////////////////////////////////

    // Coding Challenge #2
    /*
    (function () {
        const header = document.querySelector('h1');
        header.style.color = 'red';

        document.querySelector("body").addEventListener("click", function () {
            header.style.color = "blue";
        })
        })();
    */
