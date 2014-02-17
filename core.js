/*  
 *  To run the script, 
 *     - assert , a node.js native module
 *     - sprintf-js,  npm install sprintf-js -g
 *
 */
var assert = require("assert");
var format = require("sprintf-js").sprintf;

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