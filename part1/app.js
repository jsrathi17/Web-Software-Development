const array = [];
array.push("One");
array.push("Two");
array.push("Three");

console.log(array);
const shifted = array.shift();
console.log(array);
const popped = array.pop();
console.log(array);

console.log(`removed: ${shifted}, ${popped}`);