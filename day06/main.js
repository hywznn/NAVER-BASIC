import { eventLogs, simulateEvents } from './eventLogger.js';
import {
  countLoginUsersToday,
  topAdViewer,
  peakMainViewHour,
  mostCommonMenuTransition,
  savedToMainFromMenu2,
  countToggleUsersToday,
  leastViewedScreenLastWeek
} from './queryFunctions.js';

simulateEvents();

console.log("1. 로그인 화면 접속 사용자 수:", countLoginUsersToday(eventLogs));
console.log("2. 이벤트 광고 최다 시청자:", topAdViewer(eventLogs));
console.log("3. 메인화면 최다 시청 시간대:", peakMainViewHour(eventLogs));
console.log("4. 최다 메뉴 전환:", mostCommonMenuTransition(eventLogs));
console.log("5. menu2→main 저장 횟수:", savedToMainFromMenu2(eventLogs));
console.log("6. menu3 ON/OFF 설정 사용자 수:", countToggleUsersToday(eventLogs));
console.log("7. 가장 적게 본 화면:", leastViewedScreenLastWeek(eventLogs));
