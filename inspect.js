var _ = require('underscore');
var echo = console.log;
var testbed = 
{
    uri:'http://nodejs.org/api/http.json',
    matches:
    {
        source:'doc/api/http.markdown',
        modules:
        [{ 
            textRaw:'HTTP', 
            name:'http',
            stability:3,
            stabilityText:'Stable',
            desc: '_IGNORE_',
            properties:
            [
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
                    }]
                }
            ]
        }]
    }
}

function inspect(object,key,level){
	if (_.isObject(object)){
		if (_.isArray(object)){
			echo(tabBylevel(level),key,":");
			if (level=== undefined) level =0;
			level++;
			_.each(object, function (o){
				inspect(o,undefined,level);
			});
		}else{
			_.each(object, function (value,key){
				inspect(value,key,level);
			});
		}
	}else{
		echo(tabBylevel(level),key,object);
	}
}

function tabBylevel(count){
	var tab ='';
	for (var i=0; i<count; i++){
		tab +='\t';
	}
	return tab;
}

function compare(object,matches,callback){
	
	var stack = _loadMatches(matches);
	_inspect(object);

	function _loadMatches(object){
		var _stack = []
		_load(object);
		function _load(object,key){
			if (_.isObject(object)){
				_.each(object,function(o,k){
					_load(o,k);
				});
			}else{
				_stack.push({'key':key,'expect':object});
			}
		}
		return _stack;
	}
	function _inspect(object,key,level){
		if (_.isObject(object)){
			if (_.isArray(object)){
				echo(tabBylevel(level),key,":");
				if (level=== undefined) level =0;
				level++;
				_.each(object, function (o){
					_inspect(o,undefined,level);
				});
			}else{
				_.each(object, function (value,key){
					_inspect(value,key,level);
				});
			}
		}else{
			//echo(tabBylevel(level),key,object);
			var match = stack.shift();
			callback.call(this,key,object,level,match);
		}
	}
}

//inspect(testbed);
var matches = testbed //also use testbed

compare(testbed,matches,function(key,value,level,match){
	echo(tabBylevel(level),"doing test for",key,value,"with",match);
});

