import { Interpreter } from "../src/Interpreter"

test('Interpreter - Addition', () => {
    const i = new Interpreter();
    expect(i.run('5 + 8 + 2')).toEqual(15);
    expect(i.run('5 + 8 + 2 + 10.5 + 15')).toEqual(40.5);
});

test('Interpreter - Subtraction', () => {
    const i = new Interpreter();
    expect(i.run('10 - 5.7')).toEqual(4.3);
    expect(i.run('10 - 5.7 - 1 - .5')).toEqual(2.8);
});

test('Interpreter - Multiplication', () => {
    const i = new Interpreter();
    expect(i.run('5 * 3')).toEqual(15);
    expect(i.run('5 * 3 * 2.5')).toEqual(37.5);
});

test('Interpreter - Division', () => {
    const i = new Interpreter();
    expect(i.run('150 / 5')).toEqual(30);
    expect(i.run('150 / 5 / 2')).toEqual(15);
});

test('Interpreter - Bool comparison', () => {
    const i = new Interpreter();
    expect(i.run('1 = 1')).toEqual(true);
    expect(i.run('3 = 1 + 2')).toEqual(true);
    expect(i.run('1 > 5')).toEqual(false);
    expect(i.run('1 >= 5')).toEqual(false);
    expect(i.run('1 < 5')).toEqual(true);
    expect(i.run('1 <= 5')).toEqual(true);
    expect(i.run('5 <= 5')).toEqual(true);
    expect(i.run('5 < 5')).toEqual(false);
});

test('Interpreter - Concatenation', () => {
    const i = new Interpreter();
    expect(i.run("'String 1' + 'String 2'")).toEqual("String 1String 2");
    expect(i.run("'String 1' + 2")).toEqual("String 12");
    expect(i.run("20 + 'String 1'")).toEqual("20String 1");
});

test('Interpreter - Function call', () => {
    const i = new Interpreter();
    expect(i.run("ABS(-5)")).toEqual(5);
    expect(i.run("ABS(-5 + 2)")).toEqual(3);
    expect([1, 2, 3]).toContain(i.run('CHOOSE(1, 2, 3)'));
    expect(i.run("AVG(1, 5, 7, 1)")).toEqual(3.5);
    expect(i.run("AVG(1, 5, (3 + 4 * 1), 1)")).toEqual(3.5);
    expect(i.run("AVG(1, 5, 7, 1) + ABS(-5 + 2)")).toEqual(6.5);
});