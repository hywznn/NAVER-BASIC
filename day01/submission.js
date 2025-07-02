// 뱀의 이동을 처리하는 함수
/*
 * 해결 과정 Note 1: 로직 분리는 좋았으나, 근본적인 문제가 남아있습니다.
 *
 * [문제점]
 * 이 함수는 '최종 도착지'가 아닌, '주사위 값 - 보정치'라는 복잡한 값을 반환합니다.
 * 예를 들어, 97번에 도착하면 78번으로 가야 하는데, 'return 78'을 하는 것이 아니라
 * 'return dice - 19'를 하고 있습니다. 이로 인해 이 함수를 호출하는 쪽에서
 * '현재위치 + 반환값'이라는 추가 계산을 해야만 합니다.
 *
 * 또한, 하드코딩된 값에 오류가 있습니다. 예를 들어 88번 칸에 도착하면 64번으로
 * 가야 하므로, 보정치는 '24'가 되어야 하는데 '64'로 잘못 기록되어 있습니다.
 *
 * [개선 방향]
 * 뱀 정보를 { '97': 78, '95': 56, ... } 와 같은 객체(데이터)로 분리하고,
 * 이 함수는 '최종 도착지'를 직접 반환(return)하도록 구조를 변경해야 합니다.
*/
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
/*
 * 해결 과정 Note 2: 사다리 함수 역시 뱀 함수와 동일한 문제를 가지고 있습니다.
 *
 * [문제점]
 * '최종 도착지'가 아닌 '주사위 값 + 보정치'를 반환하여 코드를 복잡하게 만듭니다.
 *
 * [개선 방향]
 * 'ladders' 객체로 데이터를 분리했던 이전의 좋은 코딩 방식을 다시 적용해야 합니다.
 * { '4': 14, '8': 31, ... }
*/
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
    else if (next == 71) { // 버그: 71 -> 91로 가려면 보정치는 20이어야 합니다.
        return dice + 11; // 71에서 11 증가
    }
    else if (next == 80) {
        return dice + 19; // 80에서 19 증가
    }

    return dice; // 이동이 없을 경우 원래 주사위 값 반환
}

// 다음 위치를 계산하는 함수
/*
 * 해결 과정 Note 3: 두 함수의 결과를 조합하는 로직이지만, 복잡함을 그대로 물려받았습니다.
 *
 * [문제점]
 * snakeMovement와 ladderMovement가 불안정한 '보정치' 값을 반환하기 때문에,
 * 이 함수 역시 'current + ...' 라는 추가 연산을 수행해야 합니다.
 *
 * 삼항 연산자( ... ? ... : ... )를 사용해 뱀을 사다리보다 우선 처리한 것은 좋은 시도이지만,
 * 전체적인 구조가 너무 복잡하고 오류에 취약합니다.
 *
 * [개선 방향]
 * 이 함수는 (current, dice)를 받아 다음 위치를 계산한 뒤,
 * 그 위치가 '뱀/사다리 통합 데이터'에 있는지 확인하고, 있다면 변경된 위치를,
 * 없다면 원래 위치를 반환하는 단 하나의 책임만 지도록 단순화해야 합니다.
*/
function nextPosition(current, dice) {
    const snakeResult = snakeMovement(current, dice); // 뱀 이동 결과
    const ladderResult = ladderMovement(current, dice); // 사다리 이동 결과
    // 뱀에 의해 이동했는지 확인 후 다음 위치 반환
    return current + (snakeResult !== dice ? snakeResult : ladderResult);
}

// --- 메인 실행 로직 ---

// 주사위 현황
let start = 1; // 시작 위치
// 해결 과정 Note 4: 불필요한 변수와 즉시 실행 오류가 있습니다.
let next = 1; // 이 변수는 바로 아래 forEach 루프에서 재할당되므로 사실상 의미가 없습니다.
let dice; // 변수를 선언만 하고 값을 할당하지 않았습니다.

// [치명적 오류!]
// 아래 코드는 'dice' 변수에 값이 없는 상태(undefined)로 실행됩니다.
// 따라서 nextPosition 내부에서 'current + dice' 연산 시 NaN(Not a Number) 오류가 발생합니다.
// 테스트 루프가 있기 때문에, 이 라인은 삭제하는 것이 좋습니다.
// next = nextPosition(start, dice); // 삭제 대상

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

/*
 * 해결 과정 Note 5: 상태 업데이트 로직은 개선되었으나, 시작점 변수 이름이 혼란을 줄 수 있습니다.
 *
 * [좋은 점]
 * forEach 루프 마지막에 'start = next;' 코드를 추가하여,
 * 매 턴의 결과가 다음 턴의 시작점으로 올바르게 반영되도록 수정되었습니다.
 * '상태'가 올바르게 유지되고 있습니다.
 *
 * [개선 방향]
 * 'start'라는 변수 이름은 보통 게임 전체의 시작점(1)을 의미하는 경우가 많아
 * 매 턴마다 바뀌는 '현재 위치'라는 의미로는 혼란을 줄 수 있습니다.
 * 'currentPosition'과 같이 역할이 더 명확한 이름으로 바꾸면 코드가 더 깔끔해집니다.
*/
// 각 테스트 케이스에 대해 결과 출력
testCases.forEach(({ dice }, index) => {
    // nextPosition을 호출할 때 'start' 변수(현재 위치)를 올바르게 사용하고 있습니다.
    next = nextPosition(start, dice); // start 위치 사용
    console.log("from=", start, ", dice=", dice, ", next=", next);

    // 다음 턴을 위해, 이번 턴의 결과를 다음 턴의 시작 위치로 업데이트합니다. (매우 중요!)
    start = next; // 다음 위치를 start로 업데이트
});
