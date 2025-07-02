// 미션명 : 해시맵과 사전
// 요약 : 
// - 자신이 사용하는 언어에 있는 Map (혹은 Dictionary) 기능에 대해 학습하고 정리한다.
// - Map과 HashMap의 차이에 대해 학습한다.
// - 해시 함수를 비교하교 효율적이고 효과적인 해시 함수에 대해 이해한다.
// - 해시맵 구조상 버킷 사이즈를 이해한다.
// - 해시 Hash 함수와 해시맵 HashMap 에 대해 학습하고, 구조를 이해하고, 나만의 해시맵을 직접 구현하는 것이 목표다.


// 전체 흐름 요약
// 1. key 값을 해시 함수에 넣어 정수 index로 변환한다.
// 2. 해당 index의 배열 위치(table[index])에 접근한다.
// 3. 해당 위치가 비어있다면 배열 생성 후 (key, value) 저장
// 4. 이미 같은 키가 있다면 덮어쓰기 (put), 없으면 추가
// 5. get, remove, containsKey는 해당 버킷에서 key 찾아 처리

const TABLE_SIZE = 100; // 해시맵의 크기
let table = new Array(TABLE_SIZE);

function hashCode(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = (hash << 5) - hash + key.charCodeAt(i);
        hash = hash & hash;
    }
    return Math.abs(hash); // 오타났어요 ReferenceError: has is not defined // has => hash
}

//put 함수 : put(String key, String value) 키-값을 추가한다.
function put(key, value) {
    const index = hashCode(key) % TABLE_SIZE;
    if (!table[index]) table[index] = [];

    for (let pair of table[index]) {
        if (pair[0] === key) {
            pair[1] = value;
            return;
        }
    }
    table[index].push([key, value]);
}

// get 함수 : get(String key) 키에 해당하는 값을 반환한다.
function get(key) {
    const index = hashCode(key) % TABLE_SIZE;
    const bucket = table[index];
    if (!bucket) return null;

    for (let pair of bucket) {
        if (pair[0] === key) return pair[1];
    }
    return null;
}

// containsKey 함수 : containsKey(String key) 키가 존재하는지 확인한다.
function containsKey(key) {
    return get(key) !== null;
}

// remove 함수 : remove(String key) 키에 해당하는 값을 삭제한다.
function remove(key) {
    const index = hashCode(key) % TABLE_SIZE;
    const bucket = table[index];
    if (!bucket) return;

    for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
            bucket.splice(i, 1);
            return;
        }
    }
}

//clear 함수 : clear() 해시맵을 초기화한다.
function clear() {
    table = new Array(TABLE_SIZE);
}
// isEmpty 함수 : isEmpty() 해시맵이 비어있는지 확인한다.
function isEmpty() {
    for (let bucket of table) {
        if (bucket && bucket.length > 0) return false;
    }
    return true;
}

// keys 함수 : keys() 해시맵의 모든 키를 배열로 반환한다.
function keys() {
    const keyList = [];
    for (let bucket of table) {
        if (bucket) { 
            for (let pair of bucket) {
                keyList.push(pair[0]);
            }
        }
    }
    return keyList;
}

//size 함수 : size() 해시맵의 크기를 반환한다.
function size() {
    let count = 0;
        for (let bucket of table) {
            if (bucket) count += bucket.length;
        }
    return count;
}


// 이번에는 굳이 readline 쓰지 않고 간단하게 하드코딩으로 직접 테스트 해보겠습니다.
put("apple", "red");
put("banana", "yellow");
console.log(get("apple"));       // red
console.log(containsKey("banana")); // true
console.log(size());             // 2
console.log(keys());             // ["apple", "banana"]
remove("banana");
console.log(containsKey("banana")); // false
clear();
console.log(isEmpty());          // true

//디버깅 시 아래와 같은 결과가 나옴
// Debugger attached.
// red
// true
// 2
// [ 'apple', 'banana' ]
// false
// true
// Waiting for the debugger to disconnect...


