'use strict'; //strict mode 
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
var echo = console.log;

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
assert.true("It's a array", Array.isArray(Array.prototype));
a = [];
inspect("a",a);
assert.true("Method push() will return the new length of array, so lenght is 1",
    a.push("alex") === 1);
assert.true("now is alex",
    a[0] === 'alex');
inspect("a",a);
echo (Array.prototype.push("alex","wu")); // so push to where? -> Array.prototype is array object itself.
assert.true("Array.prototype is a array obejct",Array.isArray(Array.prototype));
echo (Array.prototype) //now is ["alex","wu"]!
assert.deepEqual([],[]);
assert.deepEqual(Array.prototype,["alex","wu"]);



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
    this._x = x || 0 ;
    this._y = y || 0 ;
}
var p = new Point(1,1);
inspect('p',p);
assert.true("the p is a new Point object ",typeof p === 'object');
assert.true("p.x === 1", p._x === 1);
//var p2 = Point(1,1); // p2 is just the return of calling of Point() funtion, there is no return , so undefined.
// above statement is TypeError: in strict mode.
var p2 = Point.call(p,2,2);
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
//var p6 = Point2(); //TypeError in strict mode
var p6 = Point2.call(p5);

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
var str = "foobar"
assert.true("'foobar'.indexOf('') return 0", str.indexOf('') === 0);
assert.true("'foobar'.indexOf('foo') return 0", str.indexOf('foo') === 0);
assert.true("~'foobar'.indexOf('foo') return -1", ~str.indexOf('foo') === -1);
assert.true("~'foobar'.indexOf('b') return -4", ~str.indexOf('b') === -4);
assert.true("~'foobar'.indexOf('alex') return 0", ~str.indexOf('alex') === 0);
assert.true("~'foobar'.indexOf('wu') return 0", ~str.indexOf('wu') === 0); 
echo("if (str.indexOf('foo') > = 0) { //found } ");
echo("if (~str.indexOf('foo')) { //found} }");
assert.true("'foobar'.slice(1) === 'oobar'", 'foobar'.slice(1)==='oobar');
assert.strictEqual('foobar'.slice(3,5),'ba'); //from index to index
assert.strictEqual('foobar'.substr(2,3),'oba'); //from index with length
assert.strictEqual('foobar'.substring(3,5),'ba');
assert.strictEqual('foobar'.slice(3,5),'foobar'.substring(3,5));
var str = "I am Ok!"
assert.strictEqual(str.slice(-3,-1),'Ok');
echo("NOTE!, substring can't use negative value like slice do!")
assert.true("str.substring(-3,-1) is nothing!",str.substring(-3,-1)==='');
var str = "\t xyz   \n"; 
assert.strictEqual(str.trim(),'xyz'); //trim whitespace.
var str = "AbcD"
assert.strictEqual(str.toUpperCase(),'ABCD');

/*
 * http://www.2ality.com/2011/10/string-concatenation.html
 * http://www.mail-archive.com/es-discuss@mozilla.org/msg10125.html
 */
echo("NOTE! for JavaScript, += is good enough!");



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
echo ("---- Tests for bitwise flag                ----")
echo ("===============================================")

assert.true(" 314 => 00000000000000000000000100111010" , toBase2String(314) === '00000000000000000000000100111010');
assert.true("~314 => 11111111111111111111111011000101",toBase2String(~314) === '11111111111111111111111011000101');
assert.true(" 0 => 00000000000000000000000000000000"   ,   toBase2String(0) === '00000000000000000000000000000000');
assert.true("-1 => 11111111111111111111111111111111",    toBase2String(-1) === '11111111111111111111111111111111');
assert.true("-2147483648 => 10000000000000000000000000000000", toBase2String(-2147483648) === '10000000000000000000000000000000');
assert.true(" 2147483647 => 01111111111111111111111111111111",  toBase2String(2147483647) === '01111111111111111111111111111111');
echo("Bitwise AND '&' : means 1 only if both are 1");
echo("Bitwise OR  '|' : means 1 either is 1");
echo("Bitwise XOR '^' : means 1 only if they are different");
echo("Bitwise NOT '~'' : means inverted value");
assert.true("   9 => 00000000000000000000000000001001",    toBase2String(9) === '00000000000000000000000000001001');
assert.true("  -9 => 11111111111111111111111111110111",   toBase2String(-9) === '11111111111111111111111111110111');
assert.true("  14 => 00000000000000000000000000001110",   toBase2String(14) === '00000000000000000000000000001110');
assert.true("9&14 => 00000000000000000000000000001000", toBase2String(9&14) === '00000000000000000000000000001000');
assert.true("9|14 => 00000000000000000000000000001111", toBase2String(9|14) === '00000000000000000000000000001111');
assert.true("9^14 => 00000000000000000000000000000111", toBase2String(9^14) === '00000000000000000000000000000111');
assert.true("  ~9 => 11111111111111111111111111110110",   toBase2String(~9) === '11111111111111111111111111110110');

echo("Bitwise Left shift '<<' : shift numbers bits to the left")
assert.true("9<<1 => 00000000000000000000000000010010", toBase2String(9<<1) === '00000000000000000000000000010010');
assert.true("9<<2 => 00000000000000000000000000100100", toBase2String(9<<2) === '00000000000000000000000000100100');
testLeftShift(9,1);
testLeftShift(9,2);
testLeftShift(9,3);
function testLeftShift(x,y){
    assert.true(format("%s<<%s === %s*Math.pow(2,%s) === %s",x,y,x,y,toBase2String(x<<y)), x<<y === x*Math.pow(2,y)); 
}

echo("Bitwise Sign right shift '>>'  : shift to right, copy new leftmost from the previous leftmost, so sign is propagating!");
echo("Bitwise Zero right shift '>>>' : shift to right, leftmost fill with zero");
      echo('      9 => '+toBase2String(9));
assert.true("  9>>1 => 00000000000000000000000000000100",   toBase2String(9>>1) === '00000000000000000000000000000100');
assert.true("  9>>2 => 00000000000000000000000000000010",   toBase2String(9>>2) === '00000000000000000000000000000010');
assert.true(" 9>>>2 => 00000000000000000000000000000010",  toBase2String(9>>>2) === '00000000000000000000000000000010');
      echo('     -9 => '+toBase2String(-9));
assert.true(" -9>>2 => 11111111111111111111111111111101",  toBase2String(-9>>2) === '11111111111111111111111111111101');
assert.true("-9>>>2 => 00111111111111111111111111111101", toBase2String(-9>>>2) === '00111111111111111111111111111101');
echo(">> and >>> result same when numbers are non-negative.")
testSignAndZeroShift(9,1);
testSignAndZeroShift(9,2);
testSignAndZeroShift(9,3);
function testSignAndZeroShift(x,y){
    [x,y].map((function (i) {
        assert.ok(i>0,format("%s should not be non-negative!",i));
    }));
    assert.true(format("%s>>%s and %s>>>%s are same => %s",x,y,x,y,toBase2String(x>>y)), x>>y === x>>>y);
}




echo("\n-- FLAG Tests -- ");
var FLAG_A = 1; // 0001
var FLAG_B = 2; // 0010
var FLAG_C = 4; // 0100
var FLAG_D = 8; // 1000
echo("FLAG_A = 1 => " + toBase2String(FLAG_A));
echo("FLAG_B = 2 => " + toBase2String(FLAG_B));
echo("FLAG_C = 4 => " + toBase2String(FLAG_C));
echo("FLAG_D = 8 => " + toBase2String(FLAG_D));
echo("NOTE: 1<<X is useful to instead of 1,2,4,8");
[0,1,2,3].map(
    (function(x){
    assert.true(format("1<<%s === %s => %s",x,1*Math.pow(2,x),toBase2String(1<<x)), 1<<x === 1*Math.pow(2,x)); 
    })
);

echo("FLAG_A|FLAG_B               => " + (FLAG_A|FLAG_B) + " =>  " + toBase2String(FLAG_A|FLAG_B));
echo("FLAG_A|FLAG_C               => " + (FLAG_A|FLAG_C) + " =>  " + toBase2String(FLAG_A|FLAG_C));
echo("FLAG_A|FLAG_B|FLAG_C        => " + (FLAG_A|FLAG_B|FLAG_C) 
    + " =>  " + toBase2String(FLAG_A|FLAG_B|FLAG_C));
echo("FLAG_A|FLAG_B|FLAG_C|FLAG_D => " + (FLAG_A|FLAG_B|FLAG_C|FLAG_D) 
    + " => " + toBase2String(FLAG_A|FLAG_B|FLAG_C|FLAG_D));
assert.true("((FLAG_A|FLAG_B) === (FLAG_B|FLAG_A))",((FLAG_A|FLAG_B) === (FLAG_B|FLAG_A)));
assert.true("(((FLAG_A|FLAG_B)|(FLAG_A|FLAG_B|FLAG_C))) === (FLAG_A|FLAG_B|FLAG_C)",
    ((FLAG_A|FLAG_B)|(FLAG_A|FLAG_B|FLAG_C)) === (FLAG_A|FLAG_B|FLAG_C));

var mask = FLAG_A|FLAG_B;
var flag1 = FLAG_B
var flag2 = FLAG_C
echo ("if (flag&mask) { // if flag in mask , do staff }" );
echo ("mask        = FLAG_A|FLAG_B => A and B    :"+toBase2String(mask));
echo ("flag1       = FLAG_B        => i am B     :"+toBase2String(flag1));
echo ("flag1&mask  = FLAG_B        => B is here  :"+toBase2String(flag1&mask));
echo ("flag2       = FLAG_C        => i am C     :"+toBase2String(flag2));
echo ("flag2&mask  = 0             => C not here :"+toBase2String(flag2&mask));

echo ("if (flag&mask) -> test  : for example, mask=FLAG_A|FLAG_B, if flag=FLAG_A => true, if flag=FLAG_C => false  ")
echo ("flag|=mask     -> set   : for example, flag=FLAG_A, mark=FLAG_B|FLAG_C => flag=FLAG_A|FLAG_B|FLAG_C  ")
echo ("flag&=mask     -> clear : for example, flag=FLAG_A|FLAG_B mark = ~FLAG_A, => flag=FLAG_B");

function setBit(flags,mask){
    return flags |= mask;
}
function clearBit(flags,mask){
    return flags &= ~mask;
}
function toggleBit(flags,mask){
    return flags = flags^mask;
}
function flipBit(flags){
    return ~flags;
}

var all_flags = {'FLAG_A':1<<0,'FLAG_B':1<<1,'FLAG_C':1<<2,'FLAG_D':1<<3} ;
var all_inputs = {'FLAG_A|FLAG_B':1<<0|1<<1, 'FLAG_B|FLAG_D':1<<1|1<<3}
Object.keys(all_inputs).map(
    (function(m){
        var _input = m;
        echo(format("\nInput : '%s' : %s",_input, toBase2String(all_inputs[_input])));
        Object.keys(all_flags).map(
            (function (n) {
                var _flag = n
                echo(format("   setBit(%s,%s) : %s => %s",'input',_flag,toBase2String(all_inputs[_input]),
                    toBase2String(setBit(all_inputs[_input],all_flags[_flag]))));
                echo(format(" clearBit(%s,%s) : %s => %s",'input',_flag,toBase2String(all_inputs[_input]),
                    toBase2String(clearBit(all_inputs[_input],all_flags[_flag]))));
                echo(format("toggleBit(%s,%s) : %s => %s",'input',_flag,toBase2String(all_inputs[_input]),
                    toBase2String(toggleBit(all_inputs[_input],all_flags[_flag]))));
            })
        );
        echo(format("flipBit(%s) : %s => %s",'input',toBase2String(all_inputs[_input]),toBase2String(flipBit(all_inputs[_input]))));
    })
);

var sBinString = "1011";
var nMyNumber = parseInt(sBinString, 2);
echo(nMyNumber); // prints 11, i.e. 1011
var nMyNumber = 11;
var sBinString = nMyNumber.toString(2);
echo(sBinString); // prints 1011, i.e. 11

[10,-10].map(
    (function(n){
        echo(format("%s => %s",createBinaryString2(n),n));
    })
);

echo ("\n===============================================")
echo ("---- Tests for Function                     ---")
echo ("===============================================\n")

var f = function() { echo ("I am fuction")};
assert.true("fuction is not object, it's supertype of object", typeof f === "function" );

echo("\n## The function's scope :");
echo("-------------------------")
function foo(){
    var x = "foo's x";
    //echo(yy); ERROR : yy will cause a ReferenceError: yy is not defined!
    echo ("Variables are function-scoped! ('hoisted')")
    assert.equal(y, undefined);
    echo ('i am foo, I can see "'+x+'" and y, but now it is "'+y+'"'); //Notice, is not a ReferenceError.
    var b = function bar(){
        var y = "bar's y";
        echo('i am bar, I can see "'+x+'" and "'+y+'"');
    };
    return b;
}
f = foo();
f();

echo("\n## Using 'arguments' variable :")
echo("-------------------------------")
function argsTest(){
    echo("arguments is not a Array, it's a object, in the format :");
    echo(arguments);
    //looks like an array, but it's not a array, Array.isArray(arguments)==false.
    echo("there is "+arguments.length+" args");
    if (arguments.length>0){
        echo ("Athough we can use the array syntax to read element by index, for example:"+format(" arguments[0] = %s",arguments[0]) )
    }
}
argsTest();
argsTest('a','b',1,2);

echo("\n## Missing parameters are undefined :")
echo("-------------------------------------")
function argsTest2(x,y){
    echo("argsTest2 call with args :");
    echo(arguments);
    var parameters = {'x':x , 'y':y } ;
    Object.keys(parameters).forEach(
       function(x){
           if (typeof parameters[x] === 'undefined') {
               echo("\tmissing parameter: "+x+" will get the value : "+ parameters[x]);
           } 
       });
}
argsTest2();
argsTest2('a');
argsTest2('a','b');
argsTest2('a','b',1,2);

echo("\n## Set default values for Missing parameters : Using ||")
echo("-------------------------------------")
function argsTest3(x,y){
    x = x || 0  //if x set, x , otherwise (null, undefined) 0, 0 is the default value
    y = y || 0
    echo ([x,y]);
}
argsTest3();
argsTest3(1);
argsTest3(1,2);


echo("\n## Enforce an arity for Missing parameters : Using 'arguments.length' ")
echo("-------------------------------------")
function argsTest4(x,y){
    echo("argsTest4 call with args :");
    echo(arguments);
    if (arguments.length !== 2) {
        echo("need exactly 2 args");
    }
}
argsTest4();


echo ("\n## Array like Objects and toArray()")
echo("-------------------------------------")

f = function f(){
    echo("function f() is called with args:",arguments);
    echo("\t toArray  => ",toArray(arguments));
    echo("\t toArray2 => ",toArray2(arguments));
    echo("\t toArray3 => ",toArray3(arguments));
};

f();
f(1,2,3);

var f = function(){
    var _this = Object.prototype.toString.call(this);
    if (this === a){
        echo("this is passing in by call()  => ",_this,this);
    }else{
        echo("this is not pass in by call() => ",_this,"Content omitted ...");
        //what's this?
    }
    echo("args is",arguments);
}
f.call(a,'a','b'); //first is this passing, other is the args list
// but if you set first is null/undefined, the this will be golobal
f.call(undefined,'a','b');




echo ("\n===============================================")
echo ("---- Tests for Exception                     ---")
echo ("===============================================\n")

function throwEx() {
    echo("In 'throwEx():\n\tbefore throw Error");
    throw new Error('Error throwed!');
}

try {
    echo("In 'try': \n\tbefore throwEx()");
    throwEx();
    echo("Never herer!");
}catch (e){
    echo("In 'catch':");
    echo(e);
    echo(e.stack);
}finally{
    echo("In 'finally':");
    echo("    Finally means : after the 'try' and 'catch', but before the statements following the 'try'. ")
}
echo("Following the 'try'");

echo ("\n===============================================")
echo (  "---- tests for closures                     ---")
echo (  "===============================================\n")
function iAmReturnNewFunc(start){
    return function(){
        echo("start now is",start);
        return start++;
    }
}

var inc = iAmReturnNewFunc(5);
assert.equal(5,inc());
assert.equal(6,inc());
assert.equal(7,inc());

function nextElement(arraylikeObject){
    var i = 0;
    return function() {
        if (i == arraylikeObject.length ) i=0; //recycle to first.
        echo("now i ==",i);
        return arraylikeObject[i++];
    }
}
var next = nextElement([1,2,3]);
assert.equal(1,next());
assert.equal(2,next());
assert.equal(3,next());
assert.equal(1,next());
assert.equal(2,next());
assert.equal(3,next());
assert.equal(1,next());

(function () {
    //IIFE,introduces a new scope and prevents tmp from becoming global
    var tmp = "I am not global";
    echo("I am executed!");
})(); //(Immediately Invoked Function Expression), IIFE
echo("tmp is undefined =>",typeof tmp === "undefined");

var result = [];
for (var i=0; i < 3; i++) {
    result.push(function () { return i });  // unwanted shared i 
}
assert.equal(result[0](),3); //ALL are 3! 
assert.equal(result[1](),3);
assert.equal(result[2](),3);

var result = [];
for (var i=0; i < 3; i++) {
    (function(cached){
        result.push(function () { return cached }); 
    })(i); // i is copyed and passed in
}
assert.equal(result[0](),0);//Correct result by using IIFE
assert.equal(result[1](),1);
assert.equal(result[2](),2);


prtH1("Tests for inheritance")

prtH2("Extract Method");
var alex = {
    name : 'Alex Wu',
    whois : function () {
        'use strict'
        return "My name is "+this.name;
    }
}
echo(alex.name);
echo(alex.whois());
var extracted = alex.whois;

//echo(extracted()); //a TypeError here, Cannot read property 'name' of undefined 

this.name = "Just show A bug here, please don't use it"
echo(extracted.call(this)); //when there is a 'name' property in 'this', then call successed.

prtH2("Using bind() to extract method with a given 'this'"); 
//The bind() method creates a new function that, when called, 
//has its this keyword set to the provided value, 
//with a given sequence of arguments preceding 
//any provided when the new function is called.
var extracted2 = alex.whois.bind(alex);
echo(extracted2());
echo("bind to differnt object, it's just awsome!");
var dindin = {
    name : 'DinDin'
}
var extracted3 = alex.whois.bind(dindin);
echo(extracted3());
delete dindin.name
echo(extracted3()); // is undefined now!

var dindinw = {
    name : 'dindinw',
    whois : function () {
        return alex.whois.bind(this)();
        //return alex.whois.call(this); same with call() method?

    }
}
echo(dindinw.whois());

prtH2 ("Functions inside a method");
var alex = {
    name : 'Alex Wu',
    nicknames : ['dindin','dindinw'],
    whois : function () {
        'use strict';
        return "My name is "+this.name;
    },
    alias : function () {
        'use strict';
        this.nicknames.forEach(
            function (nick) {
                echo ("\t"+this.name+"'s nick name contains: "+nick); // TypeError, this has not name properties.
            }
        );
    },
    alias2 : function () {
        'use strict';
        echo("alias2(), pass in 'this' when use 'forEach'.")
        this.nicknames.forEach(
            function (nick) {
                echo ("\t"+this.name+"'s nick name contains: "+nick); //
            }
        ,this); //the second parameter will be passed in, now inside this has the property 'name'. 
    },
    alias3 : function () {
        'use strict';
        echo("alias3(), save 'this' by annother name.")
        var that = this; // use 'that' to cache 'this'
        this.nicknames.forEach(
            function (nick) {
                echo ("\t"+that.name+"'s nick name contains: "+nick); //
            }
        ); 
    }
}

//alex.alias(); //Failure
alex.alias2();
alex.alias3();

prtH2 ("Using Constructors :");

function Person(name){
    this.name = name || 'unknown'; //use default value instead of null/undefined.
}
var alex = new Person('alex');
assert.equal(alex.name,'alex');
echo("Every Object don't have prototype at first");
assert.strictEqual(alex.prototype,undefined);
echo("Every Fuction has a prototype object : ",Object.prototype.toString.call(Person.prototype));

Person.prototype.sayHi = function() {
    return "Hi "+this.name;
};

var dindin = new Person('DinDin');
var dindinw = {name:'dindinw'};
dindinw.sayHi = dindin.sayHi;
echo(dindinw);

var dindinw2 = {name:'dindinw2',sayHi:function(){ return "I am a fake sayHi, hi "+this.name}};

assert.equal(dindin.sayHi(),'Hi DinDin');
assert.equal(Person.prototype.sayHi(),'Hi undefined'); //it's undefined
assert.equal('Hi DinDin',Person.prototype.sayHi.call(dindin)); //OK
[alex,dindin,dindinw,dindinw2].forEach(
    function (p) {
        // NOTE, last two are not persons. but it's person like!
        echo ("Object:",p,p instanceof Person?"is":"is not","a instanceof Person"); 
        echo (p.sayHi());
    }
);




prtH2("Test RegExp");
var r = /^abc[0-9]$/
inspect(r.toString(),r);
assert.equal(r.test('abc'),false);
[0,1,2,3,4,5,6,7,8,9].forEach(
    function(i){assert.equal(r.test('abc'+i),true,"in testing '"+r+"'.test('abc"+i+"'), i="+i);}
);


function toArray(arrayLikeObject) {
    return [].slice.call(arrayLikeObject); // [].slice.call -> arrayLikeObject now is the this point. 
}
function toArray2(arrayLikeObject) {
    return Array.prototype.slice.call(arrayLikeObject); //slightly more performant, since no literal need be created
    // see http://stackoverflow.com/questions/11577533/array-prototype-vs-perf
}
function toArray3(arrayLikeObject) {
    return ['foo','bar'].slice.call(arrayLikeObject);
}
/**
 * from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
 */
function createBinaryString (nMask) {
  // nMask must be between -2147483648 and 2147483647
  for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32; nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
  return sMask;
}
/**
 * easy looking version for inspect, don't use it for product
 */ 
function createBinaryString2 (number) {
    var result ='';
    var shifted = number;
    echo(format("number=%s =>%s",number,toBase2String(number)))
    for (var index = 0 ; index < 32; index++) {
        result += String(shifted >>> 31);
        echo(format("shiftte>>31 = %s => %s", shifted>>>31,result));
        shifted <<= 1;
        echo(format("shifted<<=1 = %s ",shifted));
    }
    return result;
}

/**
 * By myself , ugly, by using Number.toString(2)
 */
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
            for (var index=0; index < result.length ; index ++){
                if (result.substr(index,1) === '1') {
                    _result += '0';
                }else{
                    _result += '1';
                }
            }
            result = _result;
        }
        for (var index= 0 ; index < (_size-result.length) ; index ++){
            head+=bit
        }
        return head+result; 
    }
}

function test_buildin(name,variable) {
    if (typeof variable === 'object'){
        echo(name,"is a",Object.prototype.toString.call(variable)); 
    } else {
        echo(name,"is a",typeof variable);
    }
}

function inspect(name,variable) {
    if (typeof name != 'string') {
        assert.fail(name,undefined,format("call inspect(name,variable) error, 'name' is '%s' and 'variable' is '%s'",name,variable))
    }
    echo("The variable '",name,"' is a",Object.prototype.toString.call(variable));

}

// function echo() {
//  for(var i = 0 ; i< arguments.length ; i++) {
//      console.log(arguments[i]);      
//  }
//  //console.log.call(console,arguments[0]);
// }
function assign(name, variable, value) {
    if (name === undefined) {
        assert.fail(name,undefined,format("Calling assign(name, variable, value) error, The variable '%s' has been assign from '%s' to '%s'",name,variable,value));
    }
    var _var = variable;
    var _v = value;
    //petty print out for string    
    if (typeof variable == 'string') { _var = "'"+variable+"'"}; 
    if (typeof value == 'string') { _v = "'"+value+"'"}
    echo("The variable '",name,"' has been assign from",_var,"to",_v);
    variable = value;
    return variable;
}

function prtH1(title){
    prtH(title,{seperator:'=',center:true,});
}
function prtH2(title){
    prtH("## "+title,{seperator:'-'});
}
function prtH3(title){
    prtH("### "+title,{startbar:false,endbar:false});
}

function prtH(title,options){
    var _length = options.length || 50;
    var _sptr = options.seperator || '=';
    var _center = options.center || false;
    var _startbar = options.startbar || true;
    var _endbar = options.endbar || true;
    if (_startbar) { echo(strByCount(_sptr,_length)); }
    if (_center)   { echo(strCenter(title,_length)); } else echo(title);
    if (_endbar)   { echo(strByCount(_sptr,_length)); }
}
//TODO, remove the testing statements from the function 
var _sptr = "-"
assert.equal(strByCount(_sptr,1),_sptr);
assert.equal(strByCount(_sptr,-2),'');
assert.equal(strByCount(_sptr,0),'');
assert.equal(strByCount("",100),"");

function strCenter(title,length){
    if (title.length < length){
        var magrin = " ";
        //Need to use Math.floor(number/2), beacuse All numbers in 
        //javascript are doubles.This means no integer division by default.
        for (var i = Math.floor((length - title.length)/2) ; i > 0 ; i--) 
            title = magrin + title;
    }
    return title;
}
function strByCount(word,count){
    var _w = word||'';
    if (word) {
        var _count = count||0
        if(count&&count>0) {
            for (var i = 1; i < count; i++) {
                _w += word;
            }
        }else{ return ''; }
    }
    return _w;
}