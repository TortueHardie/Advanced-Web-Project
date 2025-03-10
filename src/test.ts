// test.ts

// Sample function to add two numbers
function add(a: number, b: number): number {
  return a + b;
}
//test
// Sample function to subtract two numbers
function subtract(a: number, b: number): number {
    return a - b;
}

// Sample function to multiply two numbers
function multiply(a: number, b: number): number {
    return a * b;
}

// Sample function to divide two numbers
function divide(a: number, b: number): number {
    if (b === 0) {
       throw new Error("Division by zero is not allowed.");
    }
    return a / b;
}

// Test the functions
 console.log(add(2, 3));        // Output: 5
console.log(subtract(5, 2));   // Output: 3
console.log(multiply(4, 3));   // Output: 12
console.log(divide(10, 2));    // Output: 5 