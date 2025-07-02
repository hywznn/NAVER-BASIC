# AST 구조 표현을 위한 데이터 구조 및 탐색 방식 설계

## 1. 서론

본 보고서는 컴파일러의 핵심 중 하나인 AST(Abstract Syntax Tree)의 구조를 이해하고, 이를 표현하고 탐색하기 위한 데이터 구조와 방법을 설계하는 과정을 다룬다. 특히, 코드 한 줄을 AST 데이터 구조로 변환하여 처리하는 실습을 통해 AST에 대한 이해를 깊게 하고자 한다. 예제로 사용하는 코드는 다음과 같다:
```
var a = new A.init();
```

## 2. 컴파일러 동작 방식 이해 수준

현재 필자는 컴파일러의 주요 구성 요소(Lexer, Parser, Semantic Analyzer, Lowering)와 각 단계의 목적을 충분히 이해하고 있다. Lexer와 Parser를 통해 토큰을 생성하고, 이를 AST로 변환하여 Semantic Analysis를 진행하며, 이후 IR로 Lowering하여 최종 기계어 또는 중간 코드를 생성한다는 전반적인 흐름을 알고 있다. 또한, Chandler Carruth의 "Modernizing Compiler Design for Carbon Toolchain"에서 제시된 데이터 지향 설계에 대한 이해를 통해 전통적인 AST 구조의 단점(메모리 비효율성, 캐시 적대성)을 파악하였다.

## 3. 참고 자료 학습 및 추가 자료 조사

### 학습한 자료

MDN JavaScript AST Explorer

ESTree Spec

Babel Parser

Chandler Carruth의 발표 (CppNow 2023)

Byterun ("500 Lines or Less")

Kastree 라이브러리

### 추가 조사 방법

자료의 심화 이해를 위해 JavaScript 표준(ESTree)을 직접 탐구하고, AST 시각화 도구(AST Explorer)를 활용해 실제 AST 노드 구조를 분석했다. 또한, Python 인터프리터 구현(Byterun)을 통해 스택 기반 가상 머신의 동작 원리를 이해하였다. 마지막으로, Carbon의 데이터 지향 설계를 통해 기존 AST 설계가 가진 한계를 파악하고, 이를 보완하는 현대적 접근법을 학습하였다.

## 4. AST 구조 설계

주어진 예제 코드의 AST를 다음과 같은 구조로 설계하였다:
```
{
  "type": "VariableDeclaration",
  "declarations": [
    {
      "type": "VariableDeclarator",
      "id": {"type": "Identifier", "name": "a"},
      "init": {
        "type": "NewExpression",
        "callee": {
          "type": "MemberExpression",
          "object": {"type": "Identifier", "name": "A"},
          "property": {"type": "Identifier", "name": "init"},
          "computed": false
        },
        "arguments": []
      }
    }
  ],
  "kind": "var"
}
```

### 데이터 구조 설명
AST를 표현하는 데이터 구조는 JSON과 유사한 계층적 객체 구조를 사용하였다. 각 노드는 명확한 타입과 속성을 가지고 있으며, 하위 노드를 자식 객체로 포함한다. 이는 메모리 효율적이며, 탐색과 변형이 용이한 구조다.

## 5. 탐색 방식 설계

AST의 탐색은 깊이 우선 탐색(DFS)을 활용한다. 다음은 JavaScript로 구현한 탐색 예시 코드이다:

```
function traverseAST(node, depth = 0) {
  if (!node || typeof node !== 'object') return;

  console.log('  '.repeat(depth) + node.type);
  for (let key in node) {
    if (typeof node[key] === 'object') {
      if (Array.isArray(node[key])) {
        node[key].forEach(child => traverseAST(child, depth + 1));
      } else {
        traverseAST(node[key], depth + 1);
      }
    }
  }
}
```

## 6. 메타적/종합적 학습 성찰

본 미션을 통해 AST를 구성하는 원리와 AST가 컴파일러의 중심에서 어떤 역할을 하는지 명확히 이해하였다. 특히 전통적 포인터 기반 AST와 데이터 지향적 Compact Arrays 구조의 장단점을 비교함으로써 현대적 컴파일러 설계 방향성을 깊게 학습하였다.

### 종합적 이해를 위한 다이어그램

```
VariableDeclaration
└─ VariableDeclarator
    ├─ Identifier(a)
    └─ NewExpression
        └─ MemberExpression
            ├─ Identifier(A)
            └─ Identifier(init)
            
```

## 7. 결론

이 보고서는 AST의 기본 개념부터 현대적 최적화 방안까지 폭넓은 주제를 다루었다. AST 표현 구조와 탐색 방식의 이해는 컴파일러 설계의 핵심적 요소이며, 본 미션을 통해 이를 효과적으로 학습하고 실습할 수 있었다. 앞으로의 연구나 프로젝트에서 더욱 정교한 데이터 구조와 성능 최적화를 고려한 탐색 기법을 적용할 계획이다.

## 참고 문헌

ESTree Spec: https://github.com/estree/estree

AST Explorer: https://astexplorer.net/

Kastree: https://github.com/cretz/kastree

Byterun: https://github.com/nedbat/byterun

Carbon Language: https://github.com/carbon-language/carbon-lang

Chandler Carruth, "Modernizing Compiler Design for Carbon Toolchain", CppNow 2023.
