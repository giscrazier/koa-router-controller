/**
 *
 * Created by yyl on 2017/12/25.
 */
// 解析上下文里node原生请求的POST参数
const formidable = require('formidable');
var fs = require("fs");

function param2Json(ctx) {
    return new Promise((resolve, reject)=>{
        let postdata = "";
        ctx.req.addListener('data', (data) => {
            postdata += data
        });
        ctx.req.addListener("end",function(){
            //let parseData = parseQueryStr( postdata )
            let parseData ={};
            try{
                parseData = JSON.parse(postdata);
            }catch(e){
                //ctx.onerror(e);
                if(postdata.length!==0){
                    console.error("请求参数格式有误，请传递能转换为JSON格式的参数。");
                }else {
                    parseData = ctx.request.query;
                }
            }
            resolve( parseData );
        });
    });
}

async function parsePostData( ctx ) {
    let data = await new Promise((resolve, reject) => {
        try {
            switch (ctx.request.type){
                case "multipart/form-data": {
                    var form = new formidable.IncomingForm();
                    form.parse(ctx.req, function(err, fields, files) {
                        if(err){
                            resolve({});
                        }else {
                            let keys = Object.keys(files);
                            keys.forEach(k=>{
                                files[k].data = fs.readFileSync(files[k].path);
                            });
                            resolve({
                                fields,
                                files
                            });
                        }
                    });
                    break;
                }
                case "text/plain":
                case "application/json": {
                    let data = param2Json(ctx);
                    resolve(data);
                    break;
                }
                default:{
                    resolve({});
                }
            }

        } catch ( err ) {
            reject(err)
        }
    });
    return data;
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr( queryStr ) {
    let queryData = {}
    let queryStrList = queryStr.split('&')
    console.log( queryStrList )
    console.log(JSON.parse(queryStrList));

    for (  let [ index, queryStr ] of queryStrList.entries()  ) {
        let obj = JSON.parse(queryStr);
        console.log(obj)
        let itemList = queryStr.split(':')
        queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
    }
    return queryData
}

let utils = {parsePostData};
module.exports = utils;
