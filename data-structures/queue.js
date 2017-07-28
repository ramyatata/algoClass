/*

QUEUE

Abstract data type
FIFO - First in, first out
Collection of elements with enqueue and dequeue operations.
Note that there is a natural order. Elements are removed in the reverse order of their addition.

DO NOT use an array and the native push/shift method in your implementation. Use an object as the underlying data structure.


*** Operations:

myQueue.enqueue(value)
=> count of queue
add value to collection

myQueue.dequeue()
=> oldest element added collection
Remove item so that it is no longer in collection

myQueue.peek()
=> oldest element added collection
Similiar to dequeue, but do not remove element from collection

myQueue.count()
=> number of elements in queue


*** Additional Exercises:

Modify your queue to take a max capacity and return a string if you try to add an element when there's no more room:
myQueue.enqueue(value)
=> "Max capacity already reached. Remove element before adding a new one."

Create a contains method to check if a value is in the queue:
myQueue.contains('findme')
=> true/false
What's the time complexity?

Create an until method to get the number of dequeues until you get to a certain value:
queue values - (first)2-5-7-3-6-9(last)
myQueue.until(7)
=> 3
What's the time complexity?
*/

function Queue(capacity) {
    this._storage = {};
    this._count = 0;
    this._capacity = capacity || Infinity;
    this._dequeueIndex = -1;
    this.enqueueIndex = 0;
}

Queue.prototype.enqueue = function(value) {
    if (this._count <= this._capacity) {
        this.enqueueIndex++;
        this._storage[this.enqueueIndex] = value;
        this._dequeueIndex++;
        this._count++;
        return this._count;
    } else {
        return "Max capacity already reached. Remove element before adding a new one.";
    }
};
// Time complexity: O(1)

Queue.prototype.dequeue = function() {
    if (this._count) {
        this._count--;
        var deletedVal = this._storage[this._dequeueIndex];
        delete this._storage[this._dequeueIndex];
        this._dequeueIndex++;
        return deletedVal;
    }
};
// Time complexity: O(1)

Queue.prototype.peek = function() {
    if (this._count) {
        return this._storage[this._dequeueIndex];
    } else {
        return 'empty queue';
    }
};
// Time complexity: O(1)

Queue.prototype.count = function() {
    return this._count;
};
// Time complexity: O(1)

Queue.prototype.contains = function (value) {
    for (var keys in this._storage) {
        if (this._storage[keys] === value) {
            return true;
        }
    }
    return false;
};
// Time complexity: O(n)

Queue.prototype.until = function (value) {
    var count = 0;

    function search(storage, index, count, target) {
        count++;
        if (storage[index] === target) {
            return count;
        } else {
            if (index < this.enqueueIndex) {
                return search(storage, index + 1, count, target);
            } 
        }
    }
    if (this.contains(value)) {
        return search(this._storage, this._dequeueIndex, count, value);
    }
};
//TimeComplexity - O(2n) = O(n)

function TwoStackQueue() {
    this._stack1 = new Stack();
    this._stack2 = new Stack();
}
TwoStackQueue.prototype.enqueue = function (value) {
    if (!this._stack1.size() && !this._stack2.size()) {
        this._stack1.push(value);
        return this._stack1.size();
    } else {
        var stack = this._stack1.size() > 0 ? this._stack1 : this._stack2;
        stack.push(value);
        return stack.size();
    }
};
//TC - O(1)
TwoStackQueue.prototype.dequeue = function () {
    if (this._stack1.size() === 0 && this._stack1.size() === 0) {
        return null;
    } else {
        var filledStack = this._stack1.size() > 0 ? this._stack1 : this._stack2;
        var emptyStack = this._stack1.size() = 0 ? this._stack1 : this._stack2;

        function popStack(filledStack, emptyStack) {
            if (filledStack.size() === 0){
                return;
            }
            emptyStack.push(filledStack.pop());
            popStack(filledStack, emptyStack);    
        }
        popStack(filledStack, emptyStack);
        return emptyStack.pop();
    }
};

function doubleEndedQueue() {
    this.storage = {};
    this.count = 0;
    this.rightIndex = 0;
    this.leftIndex = 0;
}
doubleEndedQueue.prototype.rigthEnqueue = function (val) {
    this.rightIndex++
    this.storage[this.rightIndex] = val;
    this.count++;
    return this.count;
};
doubleEndedQueue.prototype.rigthDequeue = function (val) {
    if (this.count){
        var deletedVal = this.storage[this.rightIndex];
        this.count--;
        this.rightIndex--;
        return deletedVal;
    }
};
doubleEndedQueue.prototype.leftEnqueue = function (val) {
    this.storage[this.leftIndex] = val;
    this.count++;
    this.leftIndex--;
    return this.count;
};
doubleEndedQueue.prototype.leftDequeue = function (val) {
    if (this.count) {
        this.leftIndex++;
        var deletedVal = this.storage[this.leftIndex];
        this.count--;
        return deletedVal;
    }
};

/*
*** Exercises:

1. Implement a queue using two stacks.

2. Implement a double-ended queue, with the following methods: enqueueLeft, dequeueLeft, enqueueRight, dequeueRight.

3. Given a tree, print out the value of each node in breadth-first order using a queue data structure.


 */
