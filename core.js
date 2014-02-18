/*  
 *  To run the script, 
 *     - assert , a node.js native module
 *     - sprintf-js,  npm install sprintf-js -g
 *
 */
var assert = require("assert");
var format = require("sprintf-js").sprintf;

/**
 * Add customize method to assert
 */
assert.true = function (msg,actual) {
	assert.equal(actual, true, "'" + msg + "' : test failed!");
	echo("'" + msg + "' : tested Ok!")
};

echo ("===============================================")
echo ("------------------Testing for var x, y --------")
echo ("===============================================")
assert.strictEqual(x, undefined, "before var x");
assert.strictEqual(y, undefined, "before var y");
assert.equal(x, undefined, "before var x");
assert.equal(y, undefined, "before var y");


assert.notStrictEqual(x, null, "before var x");
assert.notStrictEqual(y, null, "before var y");
assert.equal(x, null, "before var x");
assert.equal(y, null, "before var y");

inspect("x",x);
inspect("y",y);

var x, y; 
inspect("x",x);
inspect("y",y);
assert.strictEqual(x, undefined, "after var x");
assert.strictEqual(y, undefined, "after var y");
assert.equal(x, undefined, "after var x");
assert.equal(y, undefined, "after var y");

assert.notStrictEqual(x, null, "after var x");
assert.notStrictEqual(y, null, "after var y");
assert.equal(x, null, "after var x");
assert.equal(y, null, "after var y");

assign("x",x,1);
assert.notEqual(x, 1, "x is 0 now, becuase the function args is passed by value not reference.");
inspect("x",x);
x = assign("x",x,1);
assert.equal(x, 1, "x is 1 now");
inspect("x",x);

x = assign("x",x,0.01)
assert.equal(x, 0.01, "x is 0.01 now");
inspect("x",x);
x = assign("x",x,null);
inspect("x",x);
assert.strictEqual(x, null, "after x = null");
assert.equal(x, null, "after x = null");
assert.equal(x, undefined, "after x = null");
assert.notStrictEqual(x, undefined,  "after x = null");

y = assign("y",y,undefined);
inspect("y",y);

assert.equal(x==y,true,"== equal");
echo(format("x == y is true , since %s == %s",x,y));

assert.equal(x===y,false, "=== equal");
echo(format("x === y is false, since %s !=== %s", x, y));
echo(format("x is a %s, but y is a %s",typeof x, typeof y));

echo ("===============================================")
echo ('----------- Tests for "",\'\',null, undefined -')
echo ("===============================================")
echo(format('The "" == null is %s',""==null));
echo(format("The '' == null is %s",''==null));
echo(format("The '' ==   \"\" is %s",''==""));
echo(format("The '' ===  \"\" is %s",''===""));
echo(format("The '' ==  undefined is %s",''==undefined));
echo(format("The '' === undefined is %s",''===undefined));

echo ("===============================================")
echo ("-------------- Tests for object book ----------")
echo ("===============================================")
var book = {
	name:""
};
inspect("book",book);
inspect('book.name',book.name);
book.name="javascript";
inspect("book",book)
var book2 = assign("book2",book2,book);
inspect("book2",book2);
echo(format("The book == book2 is %s",book==book2));
echo(format("The book === book2 is %s",book===book2));
book2.name = assign("book2.name",book2.name,"nodejs");
inspect("book",book);
inspect("book2",book2);

var book3 = {
	name:"book3"
}
inspect("book3",book3);
echo(format("The book == book3 is %s",book==book3));
book3.name=assign("book3.name",book3.name,book.name);
inspect("book3",book3);
echo(format("The book == book3 is %s",book==book3));



echo ("===============================================")
echo ("-------------- Tests for String assignment ----")
echo ("-- String assign is always copy by value !      ")
echo ("===============================================")
var str1 = "hello", str2 = "hello";
inspect("str1",str1);
inspect("str2",str2);
echo(format("The str1 == str2 is %s",str1==str2));
echo(format("The str1 === str2 is %s",str1===str2));
str2 = assign("str2",str2,"world");
inspect("str1",str1);
inspect("str2",str2);
echo(format("The str1 == str2 is %s",str1===str2));
var str3 = assign("str3",str3,str1);
inspect("str3",str3)
str3 = assign("str3",str3,"hellonew");
inspect("str1",str1);
inspect("str2",str2);
inspect("str3",str3);


echo ("===============================================")
echo ("-------------- Tests for object assignment ----")
echo ("-- Object assign is always copy by reference   ")
echo ("===============================================")
var obj1 = {} , obj2 = {};
var obj3 = obj1 ;
inspect("object1",obj1);
inspect("object2",obj2);
inspect("object3",obj3);
echo(format("The obj1 == obj2 is %s",obj1==obj2));
echo(format("The obj1 == obj3 is %s",obj1==obj3));
echo(format("The obj1 === obj3 is %s",obj1===obj3));
obj1.name=assign("obj1.name",obj1.name,"hello");
inspect("object1",obj1);
inspect("object2",obj2);
inspect("object3",obj3);
echo(format("The obj1 == obj2 is %s",obj1==obj2));
echo(format("The obj1 == obj3 is %s",obj1==obj3));
echo(format("The obj1 === obj3 is %s",obj1===obj3));
obj2.name=obj1.name;
inspect("object1",obj1);
inspect("object2",obj2);
inspect("object3",obj3);
echo(format("The obj1 == obj2 is %s",obj1==obj2));
echo(format("The obj1 == obj3 is %s",obj1==obj3));
echo(format("The obj1 === obj3 is %s",obj1===obj3));

echo ("===============================================")
echo ("-------------- Tests for Build-in -------------")
echo ("===============================================")
echo (" typeof only have 5 kinds of return : ")
echo ("     undefined, boolean, number, string, funtion, object")
echo ("     undefined, boolean, number, string, null(although claim object) they are primitives, immutable")
echo ("     ")
test_buildin("undefined",undefined);
test_buildin("0", 0);
test_buildin("a",'a');
test_buildin("A","A");
test_buildin("hello",'hello'); 
test_buildin("true",true);
test_buildin("false",false);
test_buildin("null",null); //object
test_buildin("{}",{});
test_buildin("function foo() {}",function foo() {});
var a = [1,2,3];
test_buildin("[1,2,3]",a);
inspect("a",a);
inspect("a.length",a.length);
var point = [
   { x : 0, y : 1},
   { x : 1, y : 0}
]
inspect("point",point);
inspect("point[0]",point[0]);
inspect("point[0].length",point[0].length);
inspect("[point[1]].length",[point[1]].length); // the length properties is only for array object!

echo(typeof Object) // Object is a function
echo(typeof Object.prototype); //Object.prototype is a object
echo(Object.prototype.toString.call(a)); // a is a array
echo(Array.isArray(a)) //true

// null is a object is a bug for history issue, see 
// http://www.2ality.com/2013/10/typeof-null.html
// http://www.2ality.com/2013/01/categorizing-values.html
// They are two types in javascript, primative and object
 
var f1 = function foo () {};
var f2 = function foo () {};

echo(f1 === f2)  // false
echo(f1.prototype)
echo(typeof f1.prototype) ///object, not undefined
echo(f1.prototype === f2.prototype) //false
echo(Object.prototype === f1.prototype) //false
echo(String.prototype === Object.prototype) //false
echo(String.prototype == Object.prototype) //false
echo(typeof String.prototype.indexOf === "function") //true
echo(typeof Object.prototype.indexOf === "undefined") //true
echo(typeof f1.prototype.indexOf === "undefined") //true
f1.prototype = String.prototype ;
echo(typeof f1.prototype.indexOf === "function") //true
echo(f1) 
echo(String)
echo(typeof new f1())
var f3 = new f1();
echo(typeof f1 === "function");
echo(typeof f3 === "object"); //f3 is a object, 
echo(typeof f3.prototype === "undefined") //true, the f3 has no prototype now
echo(typeof f3.indexOf === "function") //true, the f3 has all functions copy from it's f1's prototype

echo ("===============================================")
echo ("-------------- Tests for Arrays   -------------")
echo ("===============================================")

assert.true("Array is a function",
	typeof Array === "function");
assert.true("Array.prototype has a push method.", 
	typeof Array.prototype.push === "function"); 
assert.true("[] is a array object", 
	typeof [] === "object");
assert.true("[].prototype is undefined, remember [] is a object",
	typeof [].prototype === 'undefined');
assert.true("[] also has a pash() method", 
	typeof [].push === "function") ; 
assert.true("They are just same !",
	Array.prototype.push === [].push);
a = [];
inspect("a",a);
assert.true("Method push() will return the new length of array, so lenght is 1",
	a.push("alex") === 1);
assert.true("now is alex",
	a[0] === 'alex');
inspect("a",a);
echo (Array.prototype.push("alex","wu")); // so push to where?



echo ("===============================================")
echo (" Tests Kinds of Object                         ")
echo ("     - Plain Object : type Object              ")
echo ("     - Array : type Array                      ")
echo ("     - Regular Express: type RegExp            ")
echo ("===============================================")





echo ("===============================================")
echo ("---- Tests for 'new' and prototype          ---")
echo ("===============================================")
function Point(x,y){
	this.x = x
	this.y = y
}
var p = new Point(1,1);
inspect('p',p);
assert.true("the p is a new Point object ",typeof p === 'object');
assert.true("p.x === 1", p.x === 1);
var p2 = Point(1,1); // p2 is just the return of calling of Point() funtion, there is no return , so undefined.
assert.true("var p2 = Point(1,1) -> p2 is just undefined!", typeof p2 === 'undefined');

var p3 = {};
echo (typeof p3);
echo (typeof p3.prototype);
echo (typeof p.prototype);
echo (typeof Point.prototype);
p3.prototype = Point.prototype;
inspect('p3',p3);

var p4 = new Point(); //new is just a create of this and assign
assert.true("p4.x and p4.y are all undefined", p4.x === undefined);

function Point2(x,y){
	this.x = x
	this.y = y
	return x+y
}
var p5 = new Point2();
var p6 = Point2();
echo(typeof p5);
echo(p5);
echo(p6);
assert.true("p6 is just a number", typeof p6 === "number");
p5.x = 1
echo(p5)
p6.x = 1 //no effect
echo (p6);
Point2.prototype.s = function() {
	if (this.x === undefined || this.y === undefined) return 0;
	return this.x + this.y ;
}
echo (p5.s())
p5.y = 2
echo (p5.s())
echo (p5)

echo ("===============================================")
echo ("---- Tests for Function                     ---")
echo ("===============================================")

var f = function() {};
assert.true("fuction is not object, it's supertype of object", typeof f === "function" );

echo ("===============================================")
echo ("---- Tests for instanceof                   ---")
echo ("===============================================")

assert.true(" {} instanceof Object ", {} instanceof Object); 
assert.true(" [] instanceof Array",   [] instanceof Array);
assert.true(" [] instanceof Object",  [] instanceof Object); //Object is supper type of Array
assert.true(" 1 NOT instanceof Number, number isn't object, it's primitive", 1 instanceof Number === false);
assert.true(" true NOT instanceof Boolean, boolean isn't object, it's primitive", true instanceof Boolean === false);
assert.true(" p instanceof Point", p instanceof Point);

echo ("===============================================")
echo ("---- Tests for Wrapper type : String        ---")
echo ("===============================================")
assert.true("  \"\"===''  ", ""==='');
assert.true('  String() === ""', String() === '');
assert.true("  String(true) === 'true' (string!)", String(true) === 'true');


echo ("===============================================")
echo ("---- Tests for Wrapper type : Boolean       ---")
echo ("===============================================")
echo ("Boolean() used as funtion to test how a value is interperted.")
assert.true("Boolean() === false",Boolean() === false);
assert.true("Boolean(0) === false",Boolean(0) === false);
assert.true("Boolean(NaN) === false",Boolean(NaN) === false);
assert.true("Boolean(\"\") === false",Boolean("") === false);
assert.true("Boolean('') === false",Boolean('') === false);
assert.true("Boolean(null) === false",Boolean(null) === false);
assert.true("Boolean(undefined) === false",Boolean(undefined) === false);
assert.true("Boolean(false) === false",Boolean(false) === false);
echo ("All other input will consider a true!!!")


echo ("===============================================")
echo ("---- Tests for Binary logical               ---")
echo ("===============================================")
function foo() {
	assert.fail("the function foo should never called!")
}
echo ("false && foo() : the function foo() is never called. ")
false && foo() 
echo ("true || foo()  : the function foo() is never called. ")
true || foo()

echo( "First && Second , first is falsy, return it, otherwise return second");
assert.true( " false && 'abc' -> false", (false && 'abc') === false);
assert.true( " '' && 'abc' -> '' ", ('' && 'abc') === ''); //NaN is falsy
assert.true( " true && 'abc' -> 'abc' ", (true && 'abc') === 'abc');
assert.true( " 123 && 'abc' -> 'abc' ",(123 && 'abc') === 'abc'); //123 is truthy
echo( "First || Second , first is truthy, return frist, otherwise return second");
assert.true( " 'abc'||123 -> 'abc'", ('abc'||123) === 'abc' );
assert.true( " ''||123 -> 123 ", (''||123)===123);


echo ("===============================================")
echo ("---- Tests for Wrapper type : Number       ----")
echo ("===============================================")
var n1 = 123
var n2 = Number(123);
var n3 = new Number(123); //never use it!
assert.true("123 is a number", typeof n1 === 'number');
assert.true("123.prototype is undefined", typeof n1.prototype === 'undefined');
assert.true("Number(123) is a number", typeof n2 === 'number');
assert.true("123 === Number(123)", n1 === n2);
assert.true("new Number(123) is object (never do is !!!)", typeof n3 === 'object');
assert.true("123 !== new Number(123)", n2 !== n3);
assert.true("Number.prototype is object", typeof Number.prototype === 'object');
assert.true("Number.prototype.valueOf() return 0, the initial value of Number object ", Number.prototype.valueOf() === 0);
assert.true("123 === new Number(123).valueOf()", n3.valueOf() === 123);
var n4 = Number('123');
assert.true("123 === Number('123'), string -> number", 123 === n4);
var n5 = Number();
var n6 = Number();
echo (n5 === n6);
echo (typeof n5 === 'number');
echo (n5.valueOf() === 0);
echo (Number() === 0);

assert.true("1 === 1.0 (All numbers are floating point!) ", 1 === 1.0);
assert.true("NaN !== NaN  (NaN, “not a number”, http://en.wikipedia.org/wiki/NaN", NaN !== NaN);
assert.true("Infinity === 1/0 ", Infinity === 1/0);
assert.true("-Infinity === -1/0", -Infinity === -1/0);
assert.true(" -0 === 0 ", -0 === 0);

echo ("===============================================")
echo ("---- Tests for bitwise flag       ----")
echo ("===============================================")
var FLAG_A = 1; // 0001
var FLAG_B = 2; // 0010
var FLAG_C = 4; // 0100
var FLAG_D = 8; // 1000
echo(FLAG_A|FLAG_B);
echo(FLAG_A|FLAG_B|FLAG_C);
echo(FLAG_A|FLAG_B|FLAG_C|FLAG_D); 

var str = "foobar"
echo(str.indexOf('foo'));
echo(~str.indexOf('foo'));
echo(str.indexOf('b'));
echo(~str.indexOf('b'));
echo(~str.indexOf('alex'));
echo(~str.indexOf('wu'));
echo(Boolean(-1));
echo(Boolean(0));
echo(1>-1);
echo(0>-1);
echo(-0>-1);
echo(format("%b",FLAG_D))

assert.true("314" , toBase2String(314) === '00000000000000000000000100111010');
assert.true("~314",toBase2String(~314) === '11111111111111111111111011000101');
assert.true("0"   ,   toBase2String(0) === '00000000000000000000000000000000');
assert.true("-1",    toBase2String(-1) === '11111111111111111111111111111111');
assert.true("-2147483648", toBase2String(-2147483648) === '10000000000000000000000000000000');
assert.true( "2147483647",  toBase2String(2147483647) === '01111111111111111111111111111111');


function toBase2String(number,length){
	var _size = 32 ;
	var _number = number;
	if (length && typeof length === 'number'){
		_size = length;
	}
	if (typeof _number === 'number') {
		var head ='';
        var bit = '0';
		if (number < 0) {
			_number  = (-_number) -1 ;
			bit = '1';  
		} 
		var result = Number(_number).toString(2);
		if (number < 0 ) {
			var _result = '';
			for (index=0; index < result.length ; index ++){
				if (result.substr(index,1) === '1') {
                    _result += '0';
				}else{
					_result += '1';
				}
			}
			result = _result;
		}
		for (index= 0 ; index < (_size-result.length) ; index ++){
			head+=bit;
		}
		return head+result;	
	}
}

function test_buildin(name,variable) {
	echo(format("%s is %s",name, typeof variable));
}

function inspect(name,variable) {
	if (typeof name != 'string') {
		assert.fail(name,undefined,format("call inspect(name,variable) error, 'name' is '%s' and 'variable' is '%s'",name,variable))
	}
	console.log(format("The variable '%s' is a '%s' :",name,typeof variable),variable);

}
function echo(msg) {
	console.log(msg);
}
function assign(name, variable, value) {
	if (name === undefined) {
		assert.fail(name,undefined,format("Calling assign(name, variable, value) error, The variable '%s' has been assign from '%s' to '%s'",name,variable,value));
	}
	var _var = variable;
	var _v = value;
    //petty print out for string	
	if (typeof variable == 'string') { _var = "'"+variable+"'"}; 
	if (typeof value == 'string') { _v = "'"+value+"'"}
    console.log(format("The variable '%s' has been assign from %s to",name,_var),_v);
    variable = value;
	return variable;
}