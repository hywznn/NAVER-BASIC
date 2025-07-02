// 상태 상수 정의
const STATES = {
    IDLE: "IDLE",
    INVITED: "INVITED",
    CANCELLING: "CANCELLING",
    CANCELLED: "CANCELLED",
    FAILED: "FAILED",
    ACCEPTED: "ACCEPTED",
    AUTH_REQUESTED: "AUTH_REQUESTED",
    REDIRECTING: "REDIRECTING",
    REDIRECTED: "REDIRECTED",
    ESTABLISHED: "ESTABLISHED",
    CLOSING: "CLOSING",
    TERMINATED: "TERMINATED",
}

// 상태 전이 테이블 ( 조건문 없이 정의 ) => 이 테이블로 다음 상태를 전이하는 방법을 나타내는 것
const TRANSITIONS = {
    [STATES.IDLE]: {
        INVITE: STATES.INVITED,
    },
    [STATES.INVITED]: {
        'INVITE': STATES.INVITED,
        '180': STATES.INVITED,
        '1xx': STATES.INVITED,
        '200': STATES.ACCEPTED,
        '3xx': STATES.REDIRECTING,
        '407': STATES.AUTH_REQUESTED,
        'CANCEL': STATES.CANCELLING,
        '4xx': STATES.FAILED,
        '5xx': STATES.FAILED,
        '6xx': STATES.FAILED,
    },
    [STATES.ACCEPTED]: {
        'CANCEL': STATES.CANCELLING,
        'ACK': STATES.ESTABLISHED,
    },
    [STATES.ESTABLISHED]: {
        'BYE': STATES.CLOSING,
    },
    [STATES.CLOSING]: {
        'BYE': STATES.CLOSING,
        '200(BYE)': STATES.TERMINATED,
    },
    [STATES.CANCELLING]: {
        '200(CANCEL': STATES.CANCELLED,
    },
    [STATES.CANCELLED]: {
        '487': STATES.TERMINATED,
    },
    [STATES.AUTH_REQUESTED]: {
        'ACK': STATES.INVITED,
    },
    [STATES.REDIRECTING]: {
        'ACK': STATES.REDIRECTED,
    },
    [STATES.REDIRECTED]: {
        '<timeout>': STATES.TERMINATED,
        'INVITE': STATES.INVITED,
    },
    [STATES.FAILED]: {
        'ACK': STATES.TERMINATED,
    },
};

// 이벤트가 숫자인데 1xx, 2xx, 3xx, 4xx, 5xx, 6xx 등으로 표현되는 경우
function classify(event) {
    if (/^\d+$/.test(event)) {
        const num = parseInt(event);
        if (num >= 100 && num < 200) return '1xx';
        if (num >= 200 && num < 300) return '2xx';
        if (num >= 300 && num < 400) return '3xx';
        if (num >= 400 && num < 500) return '4xx';
        if (num >= 500 && num < 600) return '5xx';
        if (num >= 600 && num < 700) return '6xx';
    }
    return event; // 숫자가 아니거나 범위 밖인 경우 그대로 반환
}

function protocolStateMachine(events) {
    let currentState = STATES.IDLE; // 초기 상태 IDLE로 시작
    const result = [];

    for (const rawEvent of events) {
        const stateTransitions = TRANSITIONS[currentState] || {};
        const event = rawEvent.trim();
        const direct = stateTransitions[event];
        const fallback = stateTransitions[classify(event)];

        const nextState = direct || fallback;

        if (nextState) {
            currentState = nextState;
            result.push(currentState);
        }
    }
    return result;
}

// 예시 처럼 테스트 코드 하나 정도
const input = ["INVITE", "407", "ACK", "301", "ACK", "<timeout>"];
console.log(protocolStateMachine(input));