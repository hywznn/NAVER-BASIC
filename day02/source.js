// 문제 풀이 부분
function play(param0) {
  return new Map([["A", '0'], ["B", '0'], ["C", '0']]);
}

// 데이터 입력/출력 부분
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
	const numArray = inputs[0].split(',').map(Number);
	const answer = play(numArray);
	for (const [key, value] of answer){
		console.log(key+"="+value);
	}
	rl.close();
});
