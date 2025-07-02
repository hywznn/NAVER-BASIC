# ACME 사용자 이벤트 히스토리 시스템 설계 

## 목적

이걸 이렇게 만든 이유는 곰곰히 생각해보니 의도가 사용자들이 앱 안에서 뭘 눌렀느지, 어디 화면에서 뭘 했는지 그런거를 로그로 남겨야 할 상황이 생길 것임.
나도 창업동아리를 이끌면서 이런 고민을 매우 많이함.
아마 그래서 히스토리 시스템을 설계하라고 아닌가 생각해봄

---

1. 이벤트 데이터 구조

```
{
  userId: 'user_001', // 누가
  timestamp: '2025-07-01T08:05:12Z', // 언제
  screen: 'main', // 어디서
  eventType: 'screen_enter', // 무슨 이벤트인지 (화면 들어옴, 버튼 클릭 등)
  fromScreen: 'login', // 어디서 왔는지
  stackOp: null, // push/pop인지 여부 (화면 쌓기 구조)
  actionDetail: null // 추가 행동들 (입력값, 토글 선택 등)
}
```
그냥 배열에 하나씩 push하면서 쌓는 구조임
JSON이라 쓰기도 편하고, DB에 넣을 때도 구조 그대로 가져가면 됨

2. 코드흐름

```
logEvent({ userId: 'user_001', screen: 'login', eventType: 'screen_enter' });
logEvent({ userId: 'user_001', screen: 'main', eventType: 'screen_enter', fromScreen: 'login' });
logEvent({ userId: 'user_001', screen: 'event_ad', eventType: 'screen_enter' });
logEvent({ userId: 'user_001', screen: 'menu2_detail', eventType: 'input', actionDetail: { inputValue: 42 } });
logEvent({ userId: 'user_001', screen: 'main', eventType: 'screen_enter', fromScreen: 'menu2_detail' });
logEvent({ userId: 'user_002', screen: 'menu3_sub2', eventType: 'toggle', actionDetail: { toggle: 'ON' } });

```

이런식으로 시뮬레이션을 통해 데이터를 누적시킴

3. 질문별로 쿼리함수 만들기
1) 오늘 로그인 화면 들어온 사람 몇 명?
```
countLoginUsersToday(logs) => Set 써서 userId 중복 제거해서 length 셈
```
2) 이벤트 광고 제일 많이 본 사람?
```
topAdViewer(logs) => userId 기준으로 카운트해서 max 뽑음
```
3) 메인화면 제일 많이 보는 시간대?
```
peakMainViewHour(logs) => timestamp에서 hour 뽑아서 array[24]에 누적
```
4) 메뉴 전환 중 제일 많이 한 조합은?
```
mostCommonMenuTransition(logs) => fromScreen → screen 조합별로 카운트
```
5) 최근 7일간 menu2에서 값 저장하고 main으로 이동한 횟수?
```
savedToMainFromMenu2(logs) => 바로 앞 이벤트가 input이면 카운트
```
6) 오늘 menu3_sub2에서 ON/OFF 누른 사람 수?
```
countToggleUsersToday(logs) => userId Set으로 중복 제거 후 size
```
7) 최근 7일 중 제일 안 본 화면?
```
leastViewedScreenLastWeek(logs) => screen별로 카운트하고 min 찾음
```
4. 느낀 점
처음엔 그냥 로그 찍기만 하면 되는 줄 알았는데, 뭔가 정리하려고 하니까 스키마를 잘 잡는 게 진짜 중요함

eventType 같은 거 잘 안 잡으면, 나중에 조건 걸 때 되게 지저분해짐

화면 전환할 때 fromScreen 같이 넣어주는 게 은근히 유용함. 흐름 분석할 때 꼭 필요함

사실 DB 없이 메모리만 써도 분석은 다 되긴 하는데, 양 많아지면 MongoDB나 Firebase로 옮기는 게 맞을 듯

5. 실행법

```
simulateEvents();
console.log(countLoginUsersToday(eventLogs));
console.log(topAdViewer(eventLogs));
console.log(peakMainViewHour(eventLogs));
console.log(mostCommonMenuTransition(eventLogs));
console.log(savedToMainFromMenu2(eventLogs));
console.log(countToggleUsersToday(eventLogs));
console.log(leastViewedScreenLastWeek(eventLogs));
```

6. 마무리

솔직히 생각보다 재밌었음. 단순히 console.log() 찍는 거랑 달리, 이걸 데이터로 모으고 구조화해서 의미 있는 정보 뽑는 게 좀 분석 느낌 나서 흥미로웠음

이 구조는 그냥 연습용으로도 괜찮고, 나중에 진짜 서비스할 때도 로그 수집 파트에 써먹기 괜찮은 것 같음

필요하면 나중에 DB연동이나 시각화도 붙여보고 싶음