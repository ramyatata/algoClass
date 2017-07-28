/*

STACK

Abstract data type
LIFO - Last in, first out
Collection of elements with push and pop operations.
Note that there is a natural order. Elements are removed in the reverse order of their addition.

DO NOT use an array and the native push/pop method in your implementation. That's too easy, yeah? =P
Use an object as the underlying data structure.


*** Operations:

myStack.push(value)
=> count of stack
add value to collection

myStack.pop()
=> most recent element added collection
Remove item so that it is no longer in collection

myStack.peek()
=> most recent element added collection
Similiar to pop, but do not remove element from collection

myStack.count()
=> number of elements in stack


*** Additional Exercises:

Modify your stack to take a max capacity and return a string if you try to add an element when there's no more room:
myStack.push(value)
=> "Max capacity already reached. Remove element before adding a new one."

Create a contains method to check if a value is in the stack:
myStack.contains('findme')
=> true/false
What's the time complexity?

Create an until method to get the number of pops until you get to a certain value:
stack values - (first)2-5-7-3-6-9(last)
myStack.until(7)
=> 4
What's the time complexity?
*/

function Stack(capacity) {
    this._storage = {};
    this._count = 0;
    this._capacity = capacity || Infinity;
}

Stack.prototype.push = function(value) {
    if (this._count <= this._capacity) {
        this._storage[this._count] = value;
        this._count++;
        return this._count;
    } else {
        return 'Max capacity already reached. Remove element before adding a new one.';
    }
};
// Time complexity: O(1)

Stack.prototype.pop = function() {
    if (this._count) {
        this._count--;
        var deletedValue = this._storage[this._count];
        delete this._storage[this._count];
        return deletedValue;
    } else {
        return 'Stack is empty';
    }
};
// Time complexity: O(1)

Stack.prototype.peek = function() {
  // implement me...
    if (this._count) {
        return this._storage[this._count];
    } else {
        return 'empty stack';
    }
};
// Time complexity: O(1)

Stack.prototype.count = function() {
    return this._count;
};
// Time complexity: O(1)

Stack.prototype.contains = function (value) {
    for (var keys in this._storage) {
        if (this._storage[keys] === value) {
            return true;
        }
    }
    return false;
};
// Time complexity: O(n)

Stack.prototype.until = function (value) {
    var pops = 0

    function compare(pops, index, value) {
        pops++;
        if (this.storage[index] === value) {
            return pops;
        } 
        if (index < 0) {
            return 'not Found';
        }
        return compare(pops, --index, value);
    }

    return compare(pops, this._count - 1, value);
};
//Time complexity : O(n)





/*
*** Exercises:

1. Implement a stack with a min method which returns the minimum element currently in the stack. This method should have O(1) time complexity. Make sure your implementation handles duplicates.

2. Sort a stack so that its elements are in ascending order.

3. Given a string, determine if the parenthesis in the string are balanced.
Ex: balancedParens( 'sqrt(5*(3+8)/(4-2))' ) => true
Ex: balancedParens( 'Math.min(5,(6-3))(' ) => false

4. Towers of Hanoi - https://en.wikipedia.org/wiki/Tower_of_Hanoi
You are given three towers (stacks) and N disks, each of different size. You can move the disks according to three constraints:
   1. only one disk can be moved at a time
   2. when moving a disk, you can only use pop (remove the top element) and push (add to the top of a stack)
   3. no disk can be placed on top of a disk that is smaller than it
The disks begin on tower#1. Write a function that will move the disks from tower#1 to tower#3 in such a way that none of the constraints are violated.
 */


function MinStack(capacity) {
    this._storage = {};
    this._capacity = capacity || Infinity;
    this._count = 0;
    this._min = new Stack();
}
MinStack.prototype.push = function (value) {
    if (this._count <= this._capacity) {
        if (this._count === 0) {
            this._min.push(value);
        } else {
            if (this._min.peek() > value) {
                this._min.push(value);
            } else {
                this._min.push(this._min.peek());
            }
        }
        this._storage[this._count] = value;
        this._count++;
        return this._count++;
    }
};
MinStack.prototype.pop = function () {
    if (this._count) {
        this.count--;
        var deletedVal = this._storage[this._count];
        delete this._storage[this._count];
        this._min.pop();
        return deletedVal;
    } else {
        return 'empty stack';
    }
};
MinStack.prototype.size = function () {
    return this._count;
};
MinStack.prototype.min = function () {
    return this._min.peek();
};
//Time Complexity - O(1)
MinStack.prototype.peek = function () {
    return this._storage[this._count - 1];
};

function balancedParens(string) {
    var paranthesis = new Stack();
    for (var i = 0; i < string.length; i++){
        var current = string[i];
        if (current === '(' || current === '{' || current === '[') {
            paranthesis.push(current);
        } else if (current === ')' || current === '}' || current === ']'){
            var peek = paranthesis.peek();
            if ((peek === ')' && current === '(') || (peek === '}' && current === '{') || (peek === ']' && current === '[')){
                paranthesis.pop();
            }
        }
    }

    return paranthesis.size === 0;
}
//TimeComplexity - O(n)

