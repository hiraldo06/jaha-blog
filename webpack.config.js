var path = require('path');
module.exports={
    mode:'production',
    entry:"./src/index.js",
    output:{
        filename:'bunddle.js',
        // path:path.resolve(__dirname,'dist')
        path:__dirname + "/public/dist"
    }
};