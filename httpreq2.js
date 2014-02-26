var request = require('request');
var assert = require('assert');
var _ = require('underscore');
var echo = console.log;

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
                    textRaw: '`STATUS_CODES` {Object} ',
                    name:'STATUS_CODES',
                    desc:'_IGNORE_'
                },
                {
                    textRaw:'http.globalAgent',
                    name:'globalAgent',
                    desc:'_IGNORE_'
                },
                {
                    textRaw:'http.IncomingMessage',
                    name:'IncomingMessage',
                    desc:'_IGNORE_',
                    events:[{
                        textRaw:"Event: 'close'",
                        type: 'event',
                        name: 'close',
                        desc: '_IGNORE_',
                        params:[]
                    }],
                    properties:[
                    {
                        textRaw: 'message.httpVersion',
                        name: 'httpVersion',
                        desc: '_IGNORE_',
                    },
                    {
                        textRaw: 'message.headers',
                        name: 'headers',
                        desc: '_IGNORE_',
                    },
                    {
                        textRaw: 'message.trailers',
                        name: 'trailers',
                        desc: '_IGNORE_',
                    },
                    {
                        textRaw: 'message.method',
                        name: 'method', 
                        desc: '_IGNORE_',
                    },
                    {
                        textRaw: 'message.url',
                        name: 'url',
                        desc: '_IGNORE_',
                    },
                    {
                        textRaw: 'message.statusCode',
                        name: 'statusCode',
                        desc: '_IGNORE_' 
                    },
                    {
                        textRaw: 'message.socket',
                        name: 'socket',
                        desc: '_IGNORE_',
                    }
                    ],
                    methods:[
                    {
                        textRaw: 'message.setTimeout(msecs, callback)',
                        type: 'method',
                        name: 'setTimeout',
                    }
                    ]
                }
            ],
        }]
    }
};

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
            //echo("key=",key, "expect=",object);
            that.stack.push({'key':key,'expect':object});
        } 
    }
    
    this.next = function next(){
        that.stack.shift();
    }
}

function compareDeep(object,matches,key){
    if (_.isObject(object)){
        _.each(object, function(value,key){
            compareDeep(value,matches,key);
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

function jsonHttpTest(payload){
    var reqBody = {
        method: payload.method||'GET',
        uri: payload.uri
    };
    request(reqBody,function(err,rep,body){
        if(rep.statusCode == 200){
            var jsObject = JSON.parse(body);
            compareDeep(jsObject,new nextMatch(payload.matches));
        }else{
            echo('error :',rep.statusCode);
            echo(body);
        } 
    });
}

jsonHttpTest(testbed);