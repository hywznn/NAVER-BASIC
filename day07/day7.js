const readline = require('readline'); // 표준 입력 처리를 위해 readline 모듈 사용

// 입력 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let inputLines = [];

// 한 줄 입력 받으면 바로 종료 (입력 예: /a/a.xa,/b/b.zz,...)
rl.on('line', function (line) {
  inputLines.push(line);
  rl.close();
});

// 입력 다 받고 나면 실행되는 부분
rl.on('close', function () {
  // 콤마 기준으로 잘라서 배열로 만듦
  const filePathList = inputLines[0].split(',').map(str => str.trim());

  // 핵심 로직 함수 실행
  const result = match(filePathList);

  // 결과가 없으면 "!EMPTY" 출력
  if (result.size === 0) {
    console.log("!EMPTY");
    return;
  }

  // 중복된 파일명과 개수를 하나씩 출력 (예: a.xa=3)
  for (const [fileName, count] of result) {
    console.log(`${fileName}=${count}`);
  }
});

/**
 * 파일 경로 배열을 받아서
 * 1. 버전 정보 제거
 * 2. 같은 파일명(원본 기준)이 몇 번 나왔는지 세서
 * 3. 두 번 이상 나온 애들만 Map으로 리턴하는 함수
 */
function match(filePathList) {
  const fileCountMap = new Map(); // 파일명 카운트 저장용

  for (let i = 0; i < filePathList.length; i++) {
    const fullPath = filePathList[i];

    // 디렉토리 경로에서 실제 파일명만 뽑기 (맨 마지막이 파일)
    const pathParts = fullPath.split('/');
    const fileWithVersion = pathParts[pathParts.length - 1]; // 예: a_v2.xa

    // 파일명에서 확장자 분리 (확장자는 항상 두 글자니까 마지막 점 기준)
    const dotIndex = fileWithVersion.lastIndexOf('.');
    const extension = fileWithVersion.slice(dotIndex);       // 예: '.xa'
    let name = fileWithVersion.slice(0, dotIndex);           // 예: 'a_v2'

    // 버전 정보가 뒤에 붙어있으면 제거함 (_v1 ~ _v9 패턴)
    if (/_v[1-9]$/.test(name)) {
      name = name.slice(0, -3); // 예: 'a_v2' → 'a'
    }

    // 원본 파일명으로 조립 (예: a.xa)
    const originalName = name + extension;

    // Map에 개수 누적
    if (fileCountMap.has(originalName)) {
      fileCountMap.set(originalName, fileCountMap.get(originalName) + 1);
    } else {
      fileCountMap.set(originalName, 1);
    }
  }

  // 2번 이상 등장한 파일만 걸러내서 새로운 Map에 담음
  const result = new Map();
  for (const [name, count] of fileCountMap.entries()) {
    if (count >= 2) {
      result.set(name, count);
    }
  }

  return result;
}