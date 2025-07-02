function nextPosition(current, dice) {
    const next = current + dice;
    if (next == 4) {
        return dice + 10;
    }
    else if (next == 8) {
        return dice + 22;
    }
    else if (next == 28) {
        return dice + 48;
    }
    else if (next == 21) {
        return dice + 21; // 계산 수정 42->21
    }
    else if (next == 50) {
        return dice + 17;
    }
    else if (next == 71) {
        return dice + 11; // 계산 수정 92->11
    }
    else if (next == 80) {
        return dice + 19;
    }
    
    return dice;    
}

let start = 1;
let next = 1;
let dice = 3;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=",dice,", next=", next);

start = next;
dice = 4;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=",dice,", next=", next);

start = next;
dice = 3;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=",dice,", next=", next);

start = next;
dice = 5;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=",dice,", next=", next);

start = next;
dice = 1;
next = start + nextPosition(start, dice);
console.log("from=",start,", dice=",dice,", next=", next);
