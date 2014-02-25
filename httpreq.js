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
    });
});

jsonHttpTest({
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
            }]
        }
    ]});


function jsonHttpTest(payload){
    var reqBody = {
        method: payload.method||'GET',
        uri: payload.uri
    };
    request(reqBody,function(err,rep,body){
        if(rep.statusCode == 200){
            var jsObject = JSON.parse(body);
            var matches = JSON.parse(JSON.stringify(payload.matches));
            compareDeep(jsObject,matches);
        }else{
            echo('error :',rep.statusCode);
            echo(body);
        } 
    });
}
function compareDeep(object,matches){
    _.each(matches,function(match){
        var key = match.key;
        var expect = match.expect;
        var actual = object[key];
        //echo("key =",key)
        //echo("expect =",expect);
        //echo("actual =",object[key]);//,"in",object);
        //echo("hasOwnProperty=",Object.prototype.hasOwnProperty.call(object,key));
        if (actual) {
            if (_.isArray(expect)&&_.isArray(actual)){
                _.each(actual,function(a){
                    compareDeep(a,expect);
                });
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
    });
}

