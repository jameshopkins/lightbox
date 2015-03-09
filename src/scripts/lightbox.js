// By default JS dependency is handled using CommonJS and browserify
// please see 'API.md#scripts' for more info
//
// You may need other components. i.e. Run and uncomment the following :
// $ bower install dependency-name --save
// var dependency = require('../../bower_components/dependency-name/src/scripts/index');


//example function
function Main(){
    this.version = require('./utils/version.js');//keep this : each component exposes its version
}

Main.prototype.sum = function(args){
    var total = 0;
    args.forEach(function(int){
        total += int;
    });
    return total;
};


//example export
module.exports = Main;


//Globals : if required
//window['lightbox'] = module.exports;