let myArray = [
    {
        id: 1,
        name: "John",
        age: 30,
        city: "New York",
        index: 0
    },
    {
        id: 2,
        name: "Mary",
        age: 25,
        city: "Paris",
        index: 1
    },
    {
        id: 3,
        name: "Mike",
        age: 27,
        city: "London",
        index: 2
    },
    {
        id: 4,
        name: "Adam",
        age: 29,
        city: "Tokyo",
        index: 3
    },
    {
        id: 5,
        name: "Peter",
        age: 28,
        city: "New York",
        index: 4
    }
];

const test = { id: 99, name: "test", age: 30, city: "New York" };
const test2 = { id: 55, name: "test2", age: 43, city: "Mozambique" }
const pusehdItem = 3;

function pushObjectElement(test, pusehdItem) {
    test.index = pusehdItem;
}
pushObjectElement(test, pusehdItem);
console.log("after pushed", test);

let positionNumber = 2;
myArray.splice(`${positionNumber}`, 0, test);


for (let i = `${positionNumber}`; i < myArray.length; i++) {
    myArray[i].index = i;
}

console.log(myArray);

positionNumber = 1;
myArray.splice(`${positionNumber}`, 0, test2);


for (let i = `${positionNumber}`; i < myArray.length; i++) {
    myArray[i].index = i;
}

console.log(myArray);
