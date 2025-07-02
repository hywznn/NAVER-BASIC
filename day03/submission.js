
// 문제 요구사항 정리
// 필터 조건 요약:
// 	1.	**해당 시점(param0)**에 판매 중인지 확인하기
// → start <= param0 <= end
// 	2.	권수 조건 만족하는지 확인하기
// → count >= param1
// 	3.	출력 형식 맞추기
// → 절판이면 이름*, 아니면 그냥 이름
// → "이름(분류) 별점" 형태로 출력
// → 별점 내림차순 정렬
// 	4.	일치하는 책이 없으면 "!EMPTY" 리턴

// 도서 목록 const books 로 정의하기 전역으로 설정
const books = [
  {
    name: "Great", outOfPrint: true, category: "Novel", rating: 3.1, count: 2,
    start: "198001", end: "199912"
  },
  {
    name: "Laws", outOfPrint: true, category: "Novel", rating: 4.8, count: 3,
    start: "198101", end: "198412"
  },
  {
    name: "Dracula", outOfPrint: true, category: "Drama", rating: 2.3, count: 6,
    start: "197802", end: "198711"
  },
  {
    name: "Mario", outOfPrint: true, category: "Drama", rating: 3.8, count: 4,
    start: "198903", end: "199505"
  },
  {
    name: "House", outOfPrint: false, category: "Magazine", rating: 4.4, count: 1,
    start: "198907", end: "199910"
  },
  {
    name: "Art1", outOfPrint: true, category: "Design", rating: 4.2, count: 2,
    start: "199103", end: "199812"
  },
  {
    name: "Art2", outOfPrint: true, category: "Design", rating: 3.0, count: 3,
    start: "199305", end: "199901"
  },
  {
    name: "Wars", outOfPrint: true, category: "Novel", rating: 4.6, count: 2,
    start: "198301", end: "198809"
  },
  {
    name: "Solo", outOfPrint: false, category: "Poem", rating: 4.9, count: 2,
    start: "199902", end: "202012"
  },
  {
    name: "Lost", outOfPrint: false, category: "Web", rating: 3.2, count: 8,
    start: "199912", end: "202012"
  },
  {
    name: "Ocean", outOfPrint: true, category: "Magazine", rating: 4.3, count: 1,
    start: "198402", end: "198912"
  }
];

// 도서 검색
// parm0 기간, parm1 권수
function find(parm0, parm1) {
    let candidates = [];
    // 1. 해당 시점에 판매 중인지 확인 + 권 수 만족 확인
    for (let book of books) {
        // 판매 중인지 확인
        if (book.start <= parm0 && parm0 <= book.end && book.count >= parm1) {
            candidates.push(book);
        }
    }

    // 2. 정렬 : 별점 기준 내림차순
    candidates.sort((a, b) => b.rating - a.rating);

    // 3. 출력 문자열 생성 ( 조건에 문자열로 받아서 내라했어서 )
    let result = candidates.map(book => {
        let name = book.name + (book.outOfPrint ? "*" : "");
        return `${name}(${book.category}) ${book.rating}`;
    })

    // 4. 결과 리턴 ( 0보다 많으면 그냥 result, 없으면 "!EMPTY" )
    return result.length > 0 ? result : "!EMPTY";
}

// Node.js용 사용자 입력
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("검색할 시점 (예: YYYYMM | 198402): ", (param0) => {
    rl.question("최소 구매 권수 (예: 2): ", (param1Raw) => {
        const param1 = parseInt(param1Raw);
        const result = find(param0, param1);
        console.log(`=> 검색 결과: ${result}`);
        rl.close();
    });
});