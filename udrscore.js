'use strict'; //strict mode 
var _ = require("underscore");
var echo = console.log;

//3 parameters pass into echo : obj[i], i , obj aka. 1, 0, [1,2,3] 
_.each([1,2,3],echo);
//1 0 [ 1, 2, 3 ]
//2 1 [ 1, 2, 3 ]
//3 2 [ 1, 2, 3 ] 

var input = [1,2,3]
var context = ['alex','alexwu','dindin'];

var result = _.each(input,
    function(item,index){
        echo("No:",item,"Name:",this[index]);
        //echo(item,index,full);
    }
    ,context); 

echo(result);

var changed = _.each(input,
    function (item,index,list){
        echo("No:",item,"Name:",this[index]);
        if (!list.names) list.names = [];
        list.names.push(this[index]);
    },
    context);
echo(changed);

echo("Note:For Array, input.length === +input.length is always",input.length === +input.length );

var input_o = {one:1, two:2, three:3};
_.each(input_o,echo); // for js object , the parameters is value-1, key -> one, list->{one:1, two:2, three:3}

echo(_.keys(input_o)); //get all keys

//underscore use obj === Object(obj), so null is false. 
test_isObject(null); //false
test_isObject(undefined); //false
test_isObject({}); //true , Function is object
test_isObject([]); //true, Array is object.

function test_isObject(obj){
   echo("test_isObject :",obj,_.isObject(obj)?"is Object":"is not Object");
}


//Test saft referenced object
var foo = function(obj) {
    if (obj instanceof foo) return obj;
    if (!(this instanceof foo)) return new foo(obj);
    this._wrapped = obj;
 };

foo.VERSION = 2;
echo(foo(foo(1)));
echo(foo);




