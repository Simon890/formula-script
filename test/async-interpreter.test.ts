import { AsyncInterpreter } from "../src/AsyncInterpreter"

test('Interpreter - Addition', async () => {
    const i = new AsyncInterpreter();
    expect(await i.run('5 + 8 + 2')).toEqual(15);
    expect(await i.run('5 + 8 + 2 + 10.5 + 15')).toEqual(40.5);
});

test('Interpreter - Subtraction', async () => {
    const i = new AsyncInterpreter();
    expect(await i.run('10 - 5.7')).toEqual(4.3);
    expect(await i.run('10 - 5.7 - 1 - .5')).toEqual(2.8);
});

test('Interpreter - Multiplication', async () => {
    const i = new AsyncInterpreter();
    expect(await i.run('5 * 3')).toEqual(15);
    expect(await i.run('5 * 3 * 2.5')).toEqual(37.5);
});

test('Interpreter - Division', async () => {
    const i = new AsyncInterpreter();
    expect(await i.run('150 / 5')).toEqual(30);
    expect(await i.run('150 / 5 / 2')).toEqual(15);
});

test('Interpreter - Bool comparison', async () => {
    const i = new AsyncInterpreter();
    expect(await i.run('1 = 1')).toEqual(true);
    expect(await i.run('3 = 1 + 2')).toEqual(true);
    expect(await i.run('1 > 5')).toEqual(false);
    expect(await i.run('1 >= 5')).toEqual(false);
    expect(await i.run('1 < 5')).toEqual(true);
    expect(await i.run('1 <= 5')).toEqual(true);
    expect(await i.run('5 <= 5')).toEqual(true);
    expect(await i.run('5 < 5')).toEqual(false);
});

test('Interpreter - Concatenation', async () => {
    const i = new AsyncInterpreter();
    expect(await i.run("'String 1' + 'String 2'")).toEqual("String 1String 2");
    expect(await i.run("'String 1' + 2")).toEqual("String 12");
    expect(await i.run("20 + 'String 1'")).toEqual("20String 1");
});

test('Interpreter - Function call', async () => {
    const i = new AsyncInterpreter();
    expect(await i.run("ABS(-5)")).toEqual(5);
    expect(await i.run("ABS(-5 + 2)")).toEqual(3);
    expect([1, 2, 3]).toContain(await i.run('CHOOSE(1, 2, 3)'));
    expect(await i.run("AVG(1, 5, 7, 1)")).toEqual(3.5);
    expect(await i.run("AVG(1, 5, (3 + 4 * 1), 1)")).toEqual(3.5);
    expect(await i.run("AVG(1, 5, 7, 1) + ABS(-5 + 2)")).toEqual(6.5);
});

test('Interpreter - Power', async () => {
    const i = new AsyncInterpreter();
    expect(await i.run("2^3 + AVG(5, 5, 3, 2, 1)")).toEqual(11.2);
    expect(await i.run("(3^2) + 16 ^ (1/2) + SUM(1, 2, 3)")).toEqual(19);
    expect(await i.run("2 ^ 4 + 5 ^ 2 - AVG(10, 20, 30)")).toEqual(21);
    expect(await i.run("SUM(2, 3 ^ 2, SQRT(25) - AVG(1, 3, 5))")).toEqual(13);
    expect(await i.run("(2 ^ 3 + 4^2) / SQRT(9)")).toEqual(8);
});