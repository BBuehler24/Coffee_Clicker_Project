// Coffee CLicker Notes:
// hard part: storing logic of producers & update DOM

// I want to represent Chemex coffee producer in code:
// Object:

// Best way is to create an array of objects...

// What are some global variables? total # of coffee, rate of coffee

const body = document.querySelector('body');
const div = document.querySelector('.container-right');
const coffeeButton = document.querySelector("#coffee-pic");

let sumCPS = 0;
let coffee = 0;

const coffeeProducers = [
{
    id: 1,
    name: 'Chemex',
    isVisible: false,
    quantity: 0,
    rate: 1,
    cost: 10
},

// when have 10 coffees set isVisible to true

{
    id: 2,
    name: 'FrenchPress',
    isVisible: false,
    quantity: 0,
    rate: 2,
    cost: 50
},

{
    id: 3,
    name: 'Mr. Coffee',
    isVisible: false,
    quantity: 0,
    rate: 5,
    cost: 100
},
];

function render () {
// create <h2> element for producer names:
for (producer of coffeeProducers) {
    let h2 = document.createElement('h2');
    h2.textContent = producer.name;
    // create <p> element for quantity:
    let quantity = document.createElement('p');
    quantity.textContent = 'Quantity: ' + producer.quantity;
    // create <p> element for cps:
    let coffeePerSecond = document.createElement('p');
    coffeePerSecond.textContent = 'Coffee/second: ' + producer.rate;
    // create <p> element for cost:
    let cost = document.createElement('p');
    cost.textContent = 'Cost: ' + producer.cost;
    // create a button DOM element:
    const button = document.createElement('button');
    button.textContent = 'Buy';
    // what is some info we can add to the button so we can know which button was clicked which object is coorespondes to?
    button.id = producer.id;
    button.name = producer.name;
    div.appendChild(h2);
    div.appendChild(button);
    div.appendChild(quantity);
    div.appendChild(coffeePerSecond);
    div.appendChild(cost);
}
};

render();

// Inputs: producers & coffeeTally. Iterates over coffeeProducers, turns
// isVisible to false, if coffeeTally is more or equal to 1/2 price of producer cost
// & is not already visible, turns isVisible to true.
function makeProducerVisible (coffeeProducers, coffeeTally) {
    coffeeProducers.forEach((coffeeProducer) => {
        if (coffeeTally >= coffeeProducer.cost / 2 && !coffeeProducer.isVisible) {
            coffeeProducer.isVisible = true;
        }
    });
}

// Grabs the "Coffee" tally & updates to input.
function updateCoffeeTotal (coffeeSum) {
    const coffeeTally = document.querySelector('.counting-container');
    coffeeTally.textContent = coffeeSum;
};

// Increases coffee tally +1, runs updateCoffeeTotal function to update tally, runs showProducer function
function coffeeClicker () {
    coffee++;
    updateCoffeeTotal(coffee);
}

// Iterates over coffeeProducers & returns ones that show isVisible = true;
function getVisibleProducers () {
    return coffeeProducers.filter((coffeeProducer) => {
        return coffeeProducer.isVisible;
    });
}

// console.log(getVisibleProducers())

// grabs the producer container, runs both makeProducerVisble & getVisibleProducer
// functions, iterates over appends.
// function showProducer () {
//     makeProducerVisible(coffeeProducers, coffee);
//     getVisibleProducers().forEach((producer) => {

//     });
// }

// console.log(showProducer());

function buyButton (event) {
    const target = event.target;
    // if (target.tagName !== 'button') {
    //     console.log('fart');
    // }
    if (!buyProducer(target.id.slice(4))) {
        alert('Not Enough Coffee To Buy!!')
    } else {
        showProducer();
        updateCoffeeTotal(coffee);
        totalCPSUpdate(sumCPS);
}
};

function getProducerId (producerId) {
    const producer = coffeeProducers.filter ((producer) => {
        console.log(producer)
        producer.id === producerId
        console.log(producerId);
    });
    return producer[0];
}

function checkAffordability (producerId) {
    const producer = getProducerId(producerId);
    if (coffee >= producer.cost) {
        return true;
    } else return false;
}

function buyProducer (producerId) {
    if (checkAffordability(producerId)) {
        let producer = getProducerId(producerId);
        producer.quantity++;
        coffee -= producer.cost;
        sumCPS += producer.rate;
        return true;
    }
    return false;
}

// console.log(buyProducer())

function totalCPSUpdate (cps) {
    const coffeePSecond = document.querySelector('#coffee-per-second');
    coffeePSecond.innerText = cps;
}

function coffeeTicker () {
    coffee += sumCPS;
    updateCoffeeTotal(coffee);
    // showProducer();
}

const coffeeIcon = document.getElementById('coffee-pic');
coffeeIcon.addEventListener('click', () => {
    coffeeClicker();
});

const producerPurchase = document.querySelector('#producer-container');
    producerPurchase.addEventListener('click', (event) => {
        buyButton(event);
        console.log(producerPurchase);
    });

setInterval(() => coffeeTicker(), 1000);

// 1. render producers (text)
// 2. coffeeTotal (tallys coffe's total)
// 3. coffeeClicker: increase coffee tally by 1 per click + add coffeeTotal + showProducers (isVisble)
// 4. visibleProducers: turns isVisble to true if producer qualifies if statements
// 5. getVisibleProducers: returns producers that qualify above function
// 6. canAffordProducer: returns true or false if coffeeTally >= producerprice
// 7. updateCPSView
// 8. updatePriceView
// 9. tryToBuyProducer: if canAfford, coffeTally minus producer price, add current CPS to added producer cps
// 10. buyButtonCLick function: 
// 11. tickerTracker function: coffeeTallyTotal + totalCPS + updateCoffeeView + renderProducers


// put all rendering functions together & all logic functions together