import dayjs from "dayjs";
import { Interpreter } from "../src/Interpreter"
import { BinaryOperationError } from "../src/errors/BinaryOperationError";
import { ArgumentWrongType } from "../src/errors/ArgumentWrongType";

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

test('Interpreter - Power', () => {
    const i = new Interpreter();
    expect(i.run("2^3 + AVG(5, 5, 3, 2, 1)")).toEqual(11.2);
    expect(i.run("(3^2) + 16 ^ (1/2) + SUM(1, 2, 3)")).toEqual(19);
    expect(i.run("2 ^ 4 + 5 ^ 2 - AVG(10, 20, 30)")).toEqual(21);
    expect(i.run("SUM(2, 3 ^ 2, SQRT(25) - AVG(1, 3, 5))")).toEqual(13);
    expect(i.run("(2 ^ 3 + 4^2) / SQRT(9)")).toEqual(8);
});

test("Interpreter - Literal Date Enabled", () => {
    const i = new Interpreter();
    expect(i.run("2024/05/06")).toBeInstanceOf(Date);
    expect(i.run("2024/05/066")).toBeCloseTo(6.13);
    expect(i.run("2024/05/1")).toBeCloseTo(404.8);
    expect(dayjs(i.run("2024/05/06+1") as Date).format("YYYY/MM/DD")).toEqual("2024/05/07");
    expect(dayjs(i.run("+1+2024/05/06") as Date).format("YYYY/MM/DD")).toEqual("2024/05/07");
    expect(dayjs(i.run("-1+2024/05/06+1") as Date).format("YYYY/MM/DD")).toEqual("2024/05/06");
    expect(() => i.run("2024/05/06+'hello'")).toThrow(BinaryOperationError);
    expect(i.run("2024/ 05/01")).toBeCloseTo(404.8);
    expect(i.run("20245/05/7")).toBeCloseTo(578.43);
    expect(i.run("DAY(((2024/05/15) + 1) + 2)")).toEqual(18);
    expect(i.run("2024/7/20")).toBeCloseTo(14.46);
    expect(i.run("2024 / 05 / 06")).toBeCloseTo(67.47);
});

test("Interpreter - Literal Date Disabled", () => {
    const i = new Interpreter({
        useLiteralDate: false
    });
    expect(i.run("2024/05/06")).toBeCloseTo(67.47);
    expect(i.run("2024/05/066")).toBeCloseTo(6.13);
    expect(i.run("2024/05/1")).toBeCloseTo(404.8);
    expect(i.run("2024/05/06+1")).toBeCloseTo(68.47);
    expect(i.run("+1+2024/05/06")).toBeCloseTo(68.47);
    expect(i.run("-1+2024/05/06+1")).toBeCloseTo(67.47);
    expect(i.run("2024/05/06+'hello'")).toEqual("67.46666666666667hello");
    expect(i.run("2024/ 05/01")).toBeCloseTo(404.8);
    expect(i.run("20245/05/7")).toBeCloseTo(578.43);
    expect(() => i.run("DAY(((2024/05/15) + 1) + 2)")).toThrow(ArgumentWrongType);
    expect(i.run("2024/7/20")).toBeCloseTo(14.46);
    expect(i.run("2024 / 05 / 06")).toBeCloseTo(67.47);
});

test("Interpreter - Case sensitive", () => {
    const i = new Interpreter();
    i.setCellRefHandler((name) => {
        return name;
    });
    i.setRangeHandler((left, right) => {
        return [left + "-" + right];
    });
    i.registry.register("MyFuNcTiOn", {
        call() {
            return 1;
        },
        numParams: 0
    });
    expect(i.run("SUM(1, 2, 3)")).toEqual(6);
    expect(() => i.run("sum(1, 2, 3)")).toThrow(Error);
    expect(() => i.run("SuM(1, 2, avg(1, 2, 3))")).toThrow(Error);
    expect(i.run("a1")).toEqual("a1");
    expect(i.run("A1")).toEqual("A1");
    expect(i.run("a1:bc")).toEqual(["a1-bc"]);
    expect(i.run("A1:bc")).toEqual(["A1-bc"]);
    expect(i.run("MyFuNcTiOn()")).toEqual(1);
    expect(() => i.run("MyFuNcTiON()")).toThrow(Error);
    expect(() => i.run("MYFUNCTION()")).toThrow(Error);
    expect(i.run("TRUE")).toEqual(true);
    expect(i.run("trUE")).toEqual("trUE");
});

test("Interpreter - Case insensitive", () => {
    const i = new Interpreter({
        isCaseSensitive: false
    });
    i.setCellRefHandler((name) => {
        return name;
    });
    i.setRangeHandler((left, right) => {
        return [left + "-" + right];
    });
    i.registry.register("MyFuNcTiOn", {
        call() {
            return 1;
        },
        numParams: 0
    });
    expect(i.run("SUM(1, 2, 3)")).toEqual(6);
    expect(i.run("sum(1, 2, 3)")).toEqual(6);
    expect(i.run("SuM(1, 2, avg(1, 2, 3))")).toEqual(5);
    expect(i.run("a1")).toEqual("a1");
    expect(i.run("A1")).toEqual("A1");
    expect(i.run("a1:bc")).toEqual(["a1-bc"]);
    expect(i.run("A1:bc")).toEqual(["A1-bc"]);
    expect(i.run("MyFuNcTiOn()")).toEqual(1);
    expect(i.run("MyFuNcTiON()")).toEqual(1);
    expect(i.run("MYFUNCTION()")).toEqual(1);
    expect(i.run("TRUE")).toEqual(true);
    expect(i.run("trUE")).toEqual(true);
});