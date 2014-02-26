 var request = require('request');
 var assert = require('assert');
 var _ = require('underscore');
 var echo = console.log;

 var testPUT = function(){ 
  var rand = Math.floor(Math.random()*100000000).toString();
  request(
    { method: 'PUT'
    , uri: 'http://mikeal.iriscouch.com/testjs/' + rand
    , multipart:
      [ { 'content-type': 'application/json'
        ,  body: JSON.stringify({foo: 'bar', _attachments: {'message.txt': {follows: true, length: 18, 'content_type': 'text/plain' }}})
        }
      , { body: 'I am an attachment' }
      ]
    }
  , function (error, response, body) {
      if(response.statusCode == 201){
        console.log('document saved as: http://mikeal.iriscouch.com/testjs/'+ rand)
      } else {
        console.log('error: '+ response.statusCode)
        console.log(body)
      }
    }
  );
};


(function(){
    var reqBody = {
        method: 'GET',
        uri: 'http://nodejs.org/api/http.json'
    };
    request(reqBody,function(err,rep,body){
        echo(rep.statusCode);
        var jsObject = JSON.parse(body);
        _.each(jsObject.modules[0].properties, function (e){
            echo(e.name);
        });
        _.each(jsObject.modules[0].methods, function (e){
            echo(e.textRaw);
        });
        //echo(jsObject);
        echo(jsObject.modules[0]);
    });
});//();


var payload = {
    uri:'http://nodejs.org/api/http.json',
    matches:[
        {
            key:'source',
            expect:'doc/api/http.markdown'
        },
        {
            key:'modules',
            expect: [ { 
                key: 'textRaw',
                expect: 'HTTP' 
            },{
                key: 'name',
                expect: 'http'
            },{
                key: 'stability',
                expect: 3
            },{
                key: 'stabilityText',
                expect: 'Stable'
            },{
                key: 'desc',
                expect: '_IGNORE_'
            },
            {
                key: 'properties',
                expect : [
                    {
                        key: 'name',
                        expect: 'STATUS_CODES'
                    },
                    {  
                        key: 'name',
                        expect: 'globalAgent'
                    },
                    {
                        key: 'name',
                        expect: 'IncomingMessage'
                    }
                ] 
            },{
                key: 'type',
                expect : 'module'
            }]
        }
    ]};

var matches = JSON.parse(JSON.stringify(payload.matches));
echo("matches =",matches);

(function echoDeep(matches){
    _.each(matches,function(match,index){
        var expect = match.expect;
        if (_.isArray(expect)){
            echoDeep(expect);
        }else{
            echo("key =",match.key);
            echo("expect =",match.expect);
        }
    })
}).call(this,matches);




function jsonHttpTest(payload){
    var reqBody = {
        method: payload.method||'GET',
        uri: payload.uri
    };
    request(reqBody,function(err,rep,body){
        if(rep.statusCode == 200){
            var jsObject = JSON.parse(body);
            var matches = JSON.parse(JSON.stringify(payload.matches));
            //compareDeep2(jsObject,matches);
            handleJsObject(jsObject,matches);
        }else{
            echo('error :',rep.statusCode);
            echo(body);
        } 
    });
}


function compareDeep(object,match){
    if (object === undefined ||match === undefined) return;
    var key = match.key;
    var expect = match.expect||match;
    var actual = object[key]||object;
    echo("key =",key)
    echo("expect =",expect);
    echo("actual =",actual);//,"in",object);
    echo("hasOwnProperty=",Object.prototype.hasOwnProperty.call(object,key));
    if (actual){
        if(_.isArray(expect)||actual===object){
                echo("before recure",expect,actual);
                for (var i = 0 ; i< expect.length ; i++){
                    compareDeep(actual[i],expect[i]);
                }
         }else{
                try {
                    assert.strictEqual(actual,expect);
                    echo("Tested [ "+key+" ] == '"+expect+"'","OK!");
                }catch(e){
                    echo("Tested [ "+key+" ] == '"+expect+"'","FAIL!");
                    echo("[ object ] =",object);
                    echo("[ match  ] =",match);
                    echo(e.stack)

                }
            }
        }
}


function compareDeep2(object,match){
    if (object === undefined || match === undefined) return;
    var key = match.key || 'Key not found';
    var expect = match.expect || match
    var actual = object;  
    if (Object.prototype.hasOwnProperty.call(object,key)){
        actual = object[key];
    }
    echo("key =",key)
    echo("expect =",expect);
    echo("actual =",actual);//,"in",object);
    echo("hasOwnProperty=",Object.prototype.hasOwnProperty.call(object,key));
        if (typeof expect === 'string'){
            echo("=================",key,expect,actual);
            assert.equal(actual,expect);
        }
    if (_.isArray(expect)){
        for (var i = 0 ; i < expect.length ; i++){
            actual = _.toArray(actual);
            //echo("before rec",actual,expect);
            compareDeep2(actual[i],expect[i]);
        }
    }
}

function handleJsObject(object,matches){
    echo(object);
    //inpectJsObject(object);
    compareDeep3(object,new nextMatch(matches));
}

function inpectJsObject(object,key){
    if (_.isObject(object)){
        _.each(object, function(value,key){
            inpectJsObject(value,key);
        });
    }else{
        if (key === 'desc'){
            object = object.substr(0,10);
        }
        echo("key=",key, "value=",object);
    }
}

function compareDeep3(object,matches,key){
    if (_.isObject(object)){
        _.each(object, function(value,key){
            compareDeep3(value,matches,key);
        });
    }else{
        
        if (key === 'desc'){
            object = "_IGNORE_"; //ignore all desc string;
        }
        var actualKey = key;
        var actual = object;
        var match = matches.stack.shift();
        //echo(actualKey,actual,matches,match);
        if (match === undefined){
            return //no more match , exit;
        }
        var expect = match.expect;
        var expectKey = match.key;
        try {
            assert.strictEqual(actualKey,expectKey);
            assert.strictEqual(actual,expect);
            echo("Tested [ "+key+" ] == '"+expect+"'","OK!");
        }catch(e){
            echo("Tested [ "+key+" ] == '"+expect+"'","FAIL!");
            echo("[ actual ] =",actual);
            echo("[ match  ] =",match);
            echo(e.stack)

        }

    }
}

// function nextMatch(matches) {
//     inpectJsObject(matches);
//     this.stack = _.toArray(matches);
//     echo("stack is",this.stack);
//     this.next = function next(){
//         //echo("now stack =",this.stack);
//         var current = this.stack.shift(); //get frist match;
//         if (current === undefined) return;
//         while (current.expect&&_.isArray(current.expect)){ //has next level
//             var expect = current.expect //it's array
//             for (var index = 0 ; index < expect.length ; index ++){
//                 this.stack.push(expect[index]);
//             }
//             current = this.stack.shift();
//         }
//         if (!_.isArray(current.expect)){
//             return current;
//         }
//     }
// }

var testbed = {
    uri:'http://nodejs.org/api/http.json',
    matches:{
        source:'doc/api/http.markdown',
        modules:[{ 
            textRaw:'HTTP', 
            name:'http',
            stability:3,
            stabilityText:'Stable',
            desc: '_IGNORE_',
            properties:[
                {
                    name:'STATUS_CODES'
                },
                {
                    name:'globalAgent'
                },
                {
                    name:'IncomingMessage'
                }
            ],
            type:'module'
        }]
    }
};

//jsonHttpTest(payload);

function nextMatch(matches) {
    this.stack = [];
    var that = this;
    inpsect(matches);
    function inpsect(object,key){
        if (object == undefined) return;
        if (_.isObject(object)){
            _.each(object, function(value,key){
                inpsect(value,key);
            });
        }else{
            echo("key=",key, "expect=",object);
            that.stack.push({'key':key,'expect':object});
        } 
    }
    
    this.next = function next(){
        that.stack.shift();
    }
}


echo("==========test nextMatch")
var next = new nextMatch(testbed);
echo(next.next());
echo(next.next());
echo(next.next());
echo(next.next());
echo(next.next());
echo(next.next());
echo(next.next());
echo(next.next());
echo(next.next());
echo(next.next());
echo(next.next());
echo(next.next());
echo(next.next());
echo(next.next());
echo(next.next());
echo(next.next());
echo(next.next());

function jsonHttpTest2(payload){
    var reqBody = {
        method: payload.method||'GET',
        uri: payload.uri
    };
    request(reqBody,function(err,rep,body){
        if(rep.statusCode == 200){
            var jsObject = JSON.parse(body);
            echo(jsObject);
            compareDeep3(jsObject,new nextMatch(payload.matches));
        }else{
            echo('error :',rep.statusCode);
            echo(body);
        } 
    });
}

jsonHttpTest2(testbed);
