function nextPosition(current, dice) {
    const next = current + dice;
    if (next == 97) {
        return dice - 19;
    }
    else if (next == 95) {
        return dice - 39;
    }
    else if (next == 88) {
        return dice - 64;
    }
    else if (next == 62) {
        return dice - 44;
    }
    else if (next == 48) {
        return dice - 22;
    }
    else if (next == 36) {
        return dice - 30;
    }
    else if (next == 32) {
        return dice - 22;
    }
    
    return dice;    
}

let start = 1;
let next = 1;
let dice = 6;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=",dice,", next=", next);

start = next;
dice = 6;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=", dice,", next=", next);

start = next;
dice = 2;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=", dice,", next=", next);

start = next;
dice = 6;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=",dice,", next=", next);

start = next;
dice = 6;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=",dice,", next=", next);

start = next;
dice = 4;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=",dice,", next=", next);

start = next;
dice = 5;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=",dice,", next=", next);

start = next;
dice = 6;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=",dice,", next=", next);

start = next;
dice = 6;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=",dice,", next=", next);

start = next;
dice = 4;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=",dice,", next=", next);

start = next;
dice = 4;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=",dice,", next=", next);

start = next;
dice = 5;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=",dice,", next=", next);

start = next;
dice = 6;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=",dice,", next=", next);

start = next;
dice = 6;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=",dice,", next=", next);

start = next;
dice = 6;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=",dice,", next=", next);

start = next;
dice = 6;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=",dice,", next=", next);

