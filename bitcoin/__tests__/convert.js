'use strict';

const convert = require('..');
const Big = require('big.js');

test
('should default to returning then default ifself', () => {

  expect(convert(2,'BTC','BTC')).toBe(2);
  //convert(2, 'BTC', 'BTC');

});

test('should return a number', () => {
  //convert(2, 'BTC', 'BTC', 'Number');
  expect(typeof convert(2,'BTC','BTC')).toBe('number');
  expect(convert(2,'BTC','BTC')).toBe(2);
//  throw new Error('test not yet defined... write your test here');
});

test('should return a Big number', () => {
  //convert(2, 'BTC', 'BTC', 'Big');
  expect(convert(2,'BTC','BTC','Big') instanceof Big).toBe(true);
  //throw new Error('test not yet defined... write your test here');
});

test('should return a string', () => {
  //convert(2100, 'mBTC', 'BTC', 'String');
  expect(typeof convert(2100, 'mBTC', 'BTC', 'String')).toBe('string');
  //throw new Error('test not yet defined... write your test here');
});

test('should convert a number from interger', () => {
  //convert(123456789012345, 'Satoshi', 'BTC', 'Number');
  expect (typeof convert(parseInt("123456789012345"), 'Satoshi', 'BTC', 'Number')).toBe('number')
//  throw new Error('test not yet defined... write your test here');
});

test('should convert a number from float', () => {
  //convert(1234567.89012345, 'BTC', 'Satoshi', 'Number');
    expect (typeof convert(1234567.89012345, 'Satoshi', 'BTC', 'Number')).toBe('number')
//  throw new Error('test not yet defined... write your test here');
});

test('should convert a string', () => {
  //convert('2', 'BTC', 'BTC', 'Number');
  expect (typeof convert('2', 'BTC', 'BTC', 'Number')).toBe('number')
// throw new Error('test not yet defined... write your test here');
});

test('should convert a Big number', () => {
  //convert(new Big(2), 'BTC', 'BTC', 'Number');
  expect(typeof convert(new Big(2), 'BTC', 'BTC', 'Number')).toBe('number')
  //throw new Error('test not yet defined... write your test here');
});

test('should convert a NaN to a number', () => {
  expect(typeof convert(NaN, 'BTC', 'BTC', 'Number')).toBe('number');
  expect(typeof convert(NaN, 'BTC', 'mBTC', 'Number')).toBe('number');
//  throw new Error('test not yet defined... write your test here');
});

test('should convert a NaN to a string', () => {
  expect(typeof convert(NaN, 'BTC', 'BTC', 'String')).toBe('string');
  expect(typeof convert(NaN, 'BTC', 'mBTC', 'String')).toBe('string');
  //throw new Error('test not yet defined... write your test here');
});

test('should not convert a NaN to a Big', () => {
  expect (() => convert(NaN, 'BTC', 'BTC', 'Big')).toThrow();
//  throw new Error('test not yet defined... write your test here');
});

test('should handle rounding errors', () => {
  expect (convert(4.6, 'Satoshi', 'BTC', 'Number')).not.toBe(convert(4.61, 'Satoshi', 'BTC', 'Number'));
  expect(convert(0.000000046, 'BTC', 'Satoshi', 'Number')).not.toBe(convert(0.0, 'BTC', 'Satoshi', 'Number'));
  //throw new Error('test not yet defined... write your test here');
});

test('should throw when untest is undefined', () => {
  expect (() => convert(new Big(2), 'x', 'BTC', 'Number')).toThrow();
  expect (() => convert(new Big(2), 'BTC', 'x', 'Number')).toThrow();
  expect (() => convert(NaN, 'x', 'BTC', 'Number')).toThrow();
  expect (() => convert(NaN, 'BTC', 'x', 'Number')).toThrow();
//  throw new Error('test not yet defined... write your test here');
});

test('should throw when representaion is undefined', () => {
  expect (() => convert(2, 'BTC', 'mBTC', 'x')).toThrow();
  expect(()=> convert(NaN, 'BTC', 'mBTC', 'x')).toThrow();
  //throw new Error('test not yet defined... write your test here');
});

test('should allow untest aliases', () => {
  convert(4.6, 'Satoshi', 'sat');
  convert(4.6, 'μBTC', 'bit');
  throw new Error('test not yet defined... write your test here');
});
