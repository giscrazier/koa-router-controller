/**
 * 基于koa-router 的controller
 * Created by yyl on 2018/2/6.
 */

let register = require('babel-register');
//配置node识别import
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

import ControlData from './ControlData';
import Controller from './Controller';
import RequestMapping from './RequestMapping';
import RequestMethod from './RequestMethod';
import * as utils from "./utils";

const Router = require('koa-router');
const fs = require('fs');

let defaultOpts = {
    scanPath: "",
    router: new Router()
};
let opts = null;

function KoaRouterController(cfg) {
    opts = Object.assign({}, defaultOpts, cfg);

    // 得到 /controller 所有以js结尾的文件
    let files = fs.readdirSync(opts.scanPath);
    let js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    //注册controller
    for (let f of js_files) {
        console.log(`process controller: ${f}...`);
        let rule = require(opts.scanPath + '/' + f);
        if( !(rule instanceof Function)){
            continue;
        }
        let controlInstance = new rule();

        let controlModel = ControlData.get(controlInstance.constructor);
        if(controlModel && controlModel.control){
            controlModel.paths.forEach(path=>{
                //一个方法有多个访问接口，如get,post等等
                for (let i=0, len=path.method.length; i<len; i++){
                    let m = path.method[i];
                    opts.router[m](`${controlModel.root || ""}${path.path}`,
                        async (ctx) => {
                            ctx.type = "application/json; charset=utf-8";
                            const postData = await utils.parsePostData(ctx);
                            const data = await controlInstance[path.funName](postData);
                            ctx.body = data;
                        })
                }
            })
        }
    }
}

module.exports = {
    KoaRouterController,
    Controller,
    RequestMapping,
    RequestMethod
};
