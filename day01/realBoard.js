// 뱀의 이동을 처리하는 함수
function snakeMovement(current, dice) {
    const next = current + dice; // 현재 위치에 주사위 값을 더한 다음 위치
    // 특정 위치에서 뱀에 의해 이동하는 경우
    if (next == 97) {
        return dice - 19; // 97에서 19 감소
    }
    else if (next == 95) {
        return dice - 39; // 95에서 39 감소
    }
    else if (next == 88) {
        return dice - 64; // 88에서 64 감소
    }
    else if (next == 62) {
        return dice - 44; // 62에서 44 감소
    }
    else if (next == 48) {
        return dice - 22; // 48에서 22 감소
    }
    else if (next == 36) {
        return dice - 30; // 36에서 30 감소
    }
    else if (next == 32) {
        return dice - 22; // 32에서 22 감소
    }
    
    return dice; // 이동이 없을 경우 원래 주사위 값 반환
}

// 사다리의 이동을 처리하는 함수
function ladderMovement(current, dice) {
    const next = current + dice; // 현재 위치에 주사위 값을 더한 다음 위치
    // 특정 위치에서 사다리에 의해 이동하는 경우
    if (next == 4) {
        return dice + 10; // 4에서 10 증가
    }
    else if (next == 8) {
        return dice + 22; // 8에서 22 증가
    }
    else if (next == 28) {
        return dice + 48; // 28에서 48 증가
    }
    else if (next == 21) {
        return dice + 21; // 21에서 21 증가
    }
    else if (next == 50) {
        return dice + 17; // 50에서 17 증가
    }
    else if (next == 71) {
        return dice + 11; // 71에서 11 증가
    }
    else if (next == 80) {
        return dice + 19; // 80에서 19 증가
    }
    
    return dice; // 이동이 없을 경우 원래 주사위 값 반환
}

// 다음 위치를 계산하는 함수
function nextPosition(current, dice) {
    const snakeResult = snakeMovement(current, dice); // 뱀 이동 결과
    const ladderResult = ladderMovement(current, dice); // 사다리 이동 결과
    // 뱀에 의해 이동했는지 확인 후 다음 위치 반환
    return current + (snakeResult !== dice ? snakeResult : ladderResult);
}

// 주사위 현황
let start = 1; // 시작 위치
let next = 1; // 다음 위치
let dice 
next = nextPosition(start, dice); // 다음 위치 계산

// 테스트 케이스 (주사위 값만 포함)
const testCases = [
    { dice: 3 },
    { dice: 6 },
    { dice: 5 },
    { dice: 2 },
    { dice: 6 },
    { dice: 4 },
    { dice: 6 },
    { dice: 5 },
];
// 각 테스트 케이스에 대해 결과 출력
testCases.forEach(({ dice }, index) => {
    next = nextPosition(start, dice); // start 위치 사용
    console.log("from=", start, ", dice=", dice, ", next=", next);
    start = next; // 다음 위치를 start로 업데이트
});
