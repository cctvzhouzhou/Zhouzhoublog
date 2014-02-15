var Mocha = require('mocha')
mocha = new Mocha;
console.log(mocha)
var testCase = Mocha.describe
console.log(testCase)
var pre = require('mocha').before
var assertions = require('mocha').it
var assert = require('assert')

testCase('Array', function(){
  pre(function(){
    // ...
  });

  testCase('#indexOf()', function(){
    assertions('should return -1 when not present', function(){
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});