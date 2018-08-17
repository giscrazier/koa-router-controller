/**
 *
 * Created by yyl on 2018/4/14.
 */
const register = require('babel-register');
require('babel-polyfill');
//这里是重点，必须这样配置才能让node识别import
register({
    plugins:["transform-decorators-legacy"],
    presets: [ [
        "env",{
            "targets":{
                "node": "current"
            }
        }
    ]],
    extensions: [ '.js' ]
});

//项目启动
require('./server.js');
