// 전체적인 흐름 
// play() 메소드: 게임 엔진 역할 플레이어들의 카드 입력을 위한
// readline 모듈: 입력과 출력을 담당하는 부분
// main () 함수 : 입력 받기 -> play() 메소드 호출 -> 결과 출력


// 문제 풀이 부분
function play(param0) {
  if (param0.length % 3 !== 0) {
    return new Map([["A", '0'], ["B", '0'], ["C", '0']]);
  }

  //!! 입력의 유효성 검사
  // 여기서 3의 배수가 아니면 바로 0점으로 리턴
  // 이 조건이 중요하다고 생각함. 왜냐하면 플레이어 3명이서 하는 게임인 만큼 이 로직의 유효성이 보장되어야하기 때문임.


  const dump = [[10], [30], [50], [80]];
  const scores = new Map([["A", 0], ["B", 0], ["C", 0]]); // Map 사용으로 점수판을 관리

  for (let i = 0; i < param0.length; i += 3) { // 입력받은 카드 3장씩 끊어서 판 돌리기
    const turn = [
      { name: 'A', card: param0[i] },
      { name: 'B', card: param0[i + 1] },
      { name: 'C', card: param0[i + 2] }
    ];

    turn.sort((a, b) => a.card - b.card); // 근데 작은 숫자 부터 해야하니까 이렇게 sort문을 통해 비교하에 돌려야함


    // 조건A : 플레이어가 낸 카드 중에서 4개의 덤프 배열 중 가장 작은 차이인 곳 찾기
    for (let { name, card } of turn) {  // 각 카드를 배열 구조분해 할당으로 name과 card를 분리
      let bestIndex = -1; // 이래야 맨 앞으로 당기는 것
      let bestDiff = Infinity; // 가장 작은 차이를 찾기 위한 변수

      for (let j = 0; j < dump.length; j++) { // 덤프 배열 개수 만큼 반복할건데
        if (dump[j].length === 0) continue; // 덤프가 비어있으면 건너뛰는 건 당연하고
        let last = dump[j][dump[j].length - 1]; // 일단 순서대로 도는 덤프 배열의 마지막 카드 값이랑 비교할 건데
        let diff = Math.abs(last - card); // 그 차이를 일단 저장해
        if (
          diff < bestDiff || // 만약 차이가 더 작다면
          (diff === bestDiff && last > dump[bestIndex]?.[dump[bestIndex].length - 1]) // 그걸 비교해서 bestDiff에 넣는데 같다면 더 큰 덤프 숫자 카드 뒤에 쏙 넣을 것
        ) {
          bestDiff = diff; // 그래서 그 차이는 베스트 diff 가 되는 것이고
          bestIndex = j; // 그 인덱스는 베스트 인덱스가 되는 것
        }
      }

      if (bestIndex === -1) continue; // 일단 계속하고

      // 조건B : 만약 덤프 배열의 마지막 카드보다 작다면 그 덤프 배열에 넣고
      let targetDump = dump[bestIndex];
      let last = targetDump[targetDump.length - 1];

      if (card < last) { // 만약 카드가 덤프 배열의 마지막 카드보다 작다면
        targetDump.push(card); // 그냥 푸시 떄리면 되는데
      } else { // 만약 카드가 덤프 배열의 마지막 카드보다 크다면
        scores.set(name, scores.get(name) + targetDump.length); // 그 덤프 배열의 길이만큼 점수를 더해주고
        dump[bestIndex] = []; // 덤프 배열을 비워버리기
      }
    }

    if (dump.every(p => p.length === 0)) break; // 만약 모든 덤프 배열이 비어있다면 게임을 종료
  }

  return new Map([ // 해시맵으로 점수판을 리턴
    ["A", scores.get("A").toString()],
    ["B", scores.get("B").toString()],
    ["C", scores.get("C").toString()]
  ]);
}

// 데이터 입력/출력 부분
// 어떻게 보면 중요한 node 내장 모듈이 되는 것 맨날 지피티로 딸깍하던 나에게 잊고있던 존재
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let inputs = [];
rl.on('line', (line) => {
  inputs.push(line);
  if (inputs.length === 1) {
    rl.close();
  }
});

rl.on('close', () => {
  const numArray = inputs[0].split(/[\s,]+/).map(Number); // 이런 바보가 있나 ,로 받기로 했으면서 공백으로 입력했네
  // - const numArray = inputs[0].split(',').map(Number); // 기존에 입력했던 코드
  const answer = play(numArray);
  for (const [key, value] of answer) {
    console.log(key + "=" + value);
  }
});

