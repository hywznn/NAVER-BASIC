// 이벤트 로그를 저장할 메모리 배열
export const eventLogs = [];

// 이벤트 로그 기록 함수
export function logEvent({ userId, screen, eventType, fromScreen = null, stackOp = null, actionDetail = null }) {
  const timestamp = new Date().toISOString();
  const event = { userId, timestamp, screen, eventType, fromScreen, stackOp, actionDetail };
  eventLogs.push(event);
}

// 예제 이벤트 로그 입력 시나리오
export function simulateEvents() {
  logEvent({ userId: "user_001", screen: "login", eventType: "screen_enter" });
  logEvent({ userId: "user_001", screen: "main", eventType: "screen_enter", fromScreen: "login" });
  logEvent({ userId: "user_001", screen: "event_ad", eventType: "screen_enter", fromScreen: "main" });
  logEvent({ userId: "user_001", screen: "menu2_detail", eventType: "input", fromScreen: "menu2", actionDetail: { inputValue: 42 } });
  logEvent({ userId: "user_001", screen: "main", eventType: "screen_enter", fromScreen: "menu2_detail" });
  logEvent({ userId: "user_002", screen: "menu3_sub2", eventType: "toggle", fromScreen: "menu3_sub1", actionDetail: { toggle: "ON" } });
}
