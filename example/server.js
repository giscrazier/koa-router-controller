/**
 *
 * Created by yyl on 2018/4/14.
 */
import Koa from 'koa';
import path from 'path';
const Router = require('koa-router');
import {KoaRouterController} from '../index';

const app = new Koa();

//配置路由
const router = new Router();
KoaRouterController({
    scanPath: path.join(__dirname, './'),
    router: router
});

app.use(router.routes());


app.listen(8091,()=>{console.info("localhost:8091 is started")});
//npm install --global --production windows-build-tools
