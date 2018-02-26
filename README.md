# krc
基于koa-router的前端控制器。
## 安装
```shell
$ npm install krc --save
```
## 使用
app.js
```javascript
import Koa from 'koa';
import path from 'path';
import {KoaRouterController} from 'krc';
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

KoaRouterController({
    scanPath: path.join(__dirname, '../controller'),
    router: router
});
```
`KoaRouterController`接受一个options，`scanPath`表示krc的扫描路径会,将该路径下所有注解为`@Controller`的模块设置为一个控制器。router可选。

controller/UserController.js
```javascript
const rp = require('request-promise');
const config = require('../server/config');
import {Controller, RequestMapping, RequestMethod} from '../utils/koa-router-controller/KoaRouterController';

@Controller("/User")
class User{
	@RequestMapping("/getAll", [RequestMethod.POST])
    list (postData) {
        let options = {
            method: 'POST',
            url: 'http://localhost:8080/api/user/getAll',
            body:postData,
            json: true
        };
        return new Promise((resolve)=>{
            rp(options).then(data=>{
                resolve(data);
            })
        });
    }
}

module.exports = User;
```
`@Controller`标识该模块为控制器，参数是控制器的第一层路径，`@RequestMapping`的第一个参数是控制器的子路径，第二个参数为一个数组，用于为控制器指定多个访问方式。

`krc`中任然可以使用`ctx`，`next`等原来`koa-router`的async函数的参数。因为他们在同一个作用域链中。但是要返回给前台的JSON数据不要使用`ctx.body = data`来指定，直接`return data`即可。
