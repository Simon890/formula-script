import { Tokenizer } from "../src/Tokenizer";

test('Add operation', () => {
    const t = new Tokenizer("1 + 2.5");
    expect(t.tokenize()).toEqual([
        {type: "NumberLiteral", value: 1},
        {type: "AddOp", value: "+"},
        {type: "NumberLiteral", value: 2.5}
    ]);
});

test('Substract operation', () => {
    const t = new Tokenizer("5.99 - 91");
    expect(t.tokenize()).toEqual([
        {type: "NumberLiteral", value: 5.99},
        {type: "SubOp", value: "-"},
        {type: "NumberLiteral", value: 91}
    ]);
});

test('Multiplication operation', () => {
    const t = new Tokenizer("1.5 * 0");
    expect(t.tokenize()).toEqual([
        {type: "NumberLiteral", value: 1.5},
        {type: "MultOp", value: "*"},
        {type: "NumberLiteral", value: 0}
    ]);
});

test('Division operation', () => {
    const t = new Tokenizer("8 / 4.5");
    expect(t.tokenize()).toEqual([
        {type: "NumberLiteral", value: 8},
        {type: "DivOp", value: "/"},
        {type: "NumberLiteral", value: 4.5}
    ]);
});

test('Multiple operand operation', () => {
    const t = new Tokenizer("1 + 2 - 3.5 * 7 + ((4 - 2) / 2)");
    expect(t.tokenize()).toEqual([
        {type: "NumberLiteral", value: 1},
        {type: "AddOp", value: "+"},
        {type: "NumberLiteral", value: 2},
        {type: "SubOp", value: "-"},
        {type: "NumberLiteral", value: 3.5},
        {type: "MultOp", value: "*"},
        {type: "NumberLiteral", value: 7},
        {type: "AddOp", value: "+"},
        {type: "LeftParen", value: "("},
        {type: "LeftParen", value: "("},
        {type: "NumberLiteral", value: 4},
        {type: "SubOp", value: "-"},
        {type: "NumberLiteral", value: 2},
        {type: "RightParen", value: ")"},
        {type: "DivOp", value: "/"},
        {type: "NumberLiteral", value: 2},
        {type: "RightParen", value: ")"},
    ]);
});

test('Identifier', () => {
    const t = new Tokenizer("SUM(1.7, 23)");
    expect(t.tokenize()).toEqual([
        {type: "Identifier", value: "SUM"},
        {type: "LeftParen", value: "("},
        {type: "NumberLiteral", value: 1.7},
        {type: "Comma", value: ","},
        {type: "NumberLiteral", value: 23},
        {type: "RightParen", value: ")"},
    ]);
});