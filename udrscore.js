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
_.each(input_o,echo); // for js object , the parameters is value(1), key(one), list


