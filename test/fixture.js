// function statement
function Test() {
  return true;
}

// function expression
var funcExpression = function functionExpression(arg) {
  return true;
};

// prototype method
Test.prototype.someMethod = function (arg1, arg2, arg3) {
  return true;
};

// prototype property
Test.prototype.someProp = 'something';

// method
Test.somePrivateMethod = function somePrivMethod(args1, args2) {
 return true;
};

// property
Test.somePrivateProp = 'somePrivateProperty';

// declaration
var some = 'testing';
