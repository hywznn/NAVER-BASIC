
// 1. 로그인 화면 접속 사용자 수 (당일 기준)
export function countLoginUsersToday(logs) {
  const today = new Date().toISOString().slice(0, 10);
  const users = new Set();
  logs.forEach(log => {
    if (log.screen === "login" && log.eventType === "screen_enter" && log.timestamp.startsWith(today)) {
      users.add(log.userId);
    }
  });
  return users.size;
}

// 2. 이벤트 광고 화면 최다 시청자
export function topAdViewer(logs) {
  const counter = {};
  logs.forEach(log => {
    if (log.screen === "event_ad" && log.eventType === "screen_enter") {
      counter[log.userId] = (counter[log.userId] || 0) + 1;
    }
  });
  return Object.entries(counter).reduce((max, [user, count]) => count > max[1] ? [user, count] : max, [null, 0]);
}

// 3. 메인 화면 가장 많이 본 시간대
export function peakMainViewHour(logs) {
  const hourCount = new Array(24).fill(0);
  logs.forEach(log => {
    if (log.screen === "main" && log.eventType === "screen_enter") {
      const hour = new Date(log.timestamp).getHours();
      hourCount[hour]++;
    }
  });
  const max = Math.max(...hourCount);
  return { hour: hourCount.indexOf(max), count: max };
}

// 4. 메뉴 전환 분석
export function mostCommonMenuTransition(logs) {
  const countMap = {};
  logs.forEach(log => {
    if (log.fromScreen && log.screen.startsWith("menu")) {
      const key = `${log.fromScreen}→${log.screen}`;
      countMap[key] = (countMap[key] || 0) + 1;
    }
  });
  return Object.entries(countMap).reduce((max, [k, v]) => v > max[1] ? [k, v] : max, ["", 0]);
}

// 5. menu2_detail → main으로 이동한 저장 횟수 (최근 7일)
export function savedToMainFromMenu2(logs) {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  let count = 0;
  logs.forEach((log, i) => {
    if (new Date(log.timestamp).getTime() >= weekAgo && log.screen === "main" && log.fromScreen === "menu2_detail") {
      const prev = logs[i - 1];
      if (prev && prev.screen === "menu2_detail" && prev.eventType === "input") {
        count++;
      }
    }
  });
  return count;
}

// 6. menu3_sub2 ON/OFF 선택 사용자 수 (당일 기준)
export function countToggleUsersToday(logs) {
  const today = new Date().toISOString().slice(0, 10);
  const users = new Set();
  logs.forEach(log => {
    if (log.timestamp.startsWith(today) && log.screen === "menu3_sub2" && log.eventType === "toggle") {
      users.add(log.userId);
    }
  });
  return users.size;
}

// 7. 가장 노출이 적은 화면 (최근 7일)
export function leastViewedScreenLastWeek(logs) {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const screenCount = {};
  logs.forEach(log => {
    if (new Date(log.timestamp).getTime() >= weekAgo && log.eventType === "screen_enter") {
      screenCount[log.screen] = (screenCount[log.screen] || 0) + 1;
    }
  });
  return Object.entries(screenCount).reduce((min, [screen, count]) => count < min[1] ? [screen, count] : min, ["", Infinity]);
}