// Coffee CLicker Notes:
// hard part: storing logic of producers & update DOM

// I want to represent Chemex coffee producer in code:
// Object:

// Best way is to create an array of objects...

// What are some global variables? total # of coffee, rate of coffee

const body = document.querySelector('body');
const div = document.querySelector('.container-right');
const coffeeButton = document.querySelector("#coffee-pic");
const coffeeCountTally = document.querySelector('.counting-container');
const cpsTally = document.querySelector('#coffee-per-second');

let sumCPS = 0;
let coffeeScore = 0;

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
    button.addEventListener('click', (event) => {
        const producer = coffeeProducers.find(p => p.id == event.target.id); // pulls the producer id off the target, finds in the array, then passes it into buy.
        handleBuyProducer(producer);
    });
    div.appendChild(h2);
    div.appendChild(quantity);
    div.appendChild(coffeePerSecond);
    div.appendChild(cost);
    div.appendChild(button);
}
};

render();

function handleBuyProducer (producer) {
    if (coffeeScore >= producer.cost) {
        coffeeScore -= producer.cost;
        sumCPS += producer.rate;
        coffeeCountTally.innerHTML = `Coffee: ${coffeeScore}`;
        cpsTally.innerHTML = sumCPS;
    } else {
        alert('Not Enough Coffee To Buy!!')
    }
}

const coffeeIcon = document.getElementById('coffee-pic');
coffeeIcon.addEventListener('click', () => {
    coffeeScore++;
    coffeeCountTally.innerHTML = `Coffee: ${coffeeScore}`;
});

setInterval(function () {
    if (sumCPS > 0) {
        coffeeScore += sumCPS;
        coffeeCountTally.innerHTML = `Coffee: ${coffeeScore}`;
    }
}, 1000);

function resetGame () {
    window.localStorage.clear();
    location.reload();
}

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', resetGame);

// Testing Code I was not able to get working below (mostly involving isVisible logic):

// Iterates over coffeeProducers & returns ones that show isVisible = true;
// function getVisibleProducers () {
//     return coffeeProducers.filter((coffeeProducer) => {
//         return coffeeProducer.isVisible;
//     });
// }

// grabs the producer container, runs both makeProducerVisble & getVisibleProducer
// functions, iterates over appends.
// function showProducer () {
//     makeProducerVisible(coffeeProducers, coffee);
//     getVisibleProducers().forEach((producer) => {

//     });
// }

// console.log(showProducer());

// function updateCoffeeTotal (coffeeScore) {
//     const coffeeTally = document.querySelector('.counting-container');
//     coffeeTally.textContent = coffeeScore;
// };

// function coffeeClicker () {
//     coffeeScore++;
//     updateCoffeeTotal(coffeeScore);
// }

// function coffeeTicker () {
//     coffeeScore += sumCPS;
//     updateCoffeeTotal(coffeeScore);
// }

// chemexButton.addEventListener('click', function (event) {
//     if (coffeeScore >= 10) {
//         coffeeScore = coffeeScore - 10 + 1;
//         coffeeCountTally.innerHTML = coffeeScore;
//         sumCPS++;
//         cpsTally.innerHTML = sumCPS;
//     } else {
//         alert('Not Enough Coffee To Buy');
//     }
// });

// chemexButton.addEventListener('click', function (event) {
//     coffeeScore = coffeeScore + 1;
//     coffeeCountTally.innerHTML = coffeeScore;
// });

// frenchPressButton.addEventListener('click', function (event) {
//     if (coffeeScore >= 50) {
//         coffeeScore = coffeeScore - 50 + 2;
//         coffeeCountTally.innerHTML = coffeeScore;
//         sumCPS += 2;
//         cpsTally.innerHTML = sumCPS;
//     } else {
//         alert('Not Enough Coffee To Buy');
//     }
// });

// frenchPressButton.addEventListener('click', function (event) {
//     coffeeScore = coffeeScore + 2;
//     coffeeCountTally.innerHTML = coffeeScore;
// });

// mrCoffeeButton.addEventListener('click', function (event) {
//     if (coffeeScore >= 100) {
//         coffeeScore = coffeeScore - 100 + 5;
//         coffeeCountTally.innerHTML = coffeeScore;
//         sumCPS += 5;
//         cpsTally.innerHTML = sumCPS;
//     } else {
//         alert('Not Enough Coffee To Buy');
//     }
// });

// mrCoffeeButton.addEventListener('click', function (event) {
//     coffeeScore = coffeeScore + 5;
//     coffeeCountTally.innerHTML = coffeeScore;
// });


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