/**
 *
 * Created by yyl on 2017/12/25.
 */
// 解析上下文里node原生请求的POST参数
function parsePostData( ctx ) {
	return new Promise((resolve, reject) => {
		try {
			let postdata = "";
			ctx.req.addListener('data', (data) => {
				postdata += data
			});
			ctx.req.addListener("end",function(){
				//let parseData = parseQueryStr( postdata )
				console.log(postdata);
				let parseData ={};
				try{
					parseData = JSON.parse(postdata);
				}catch(e){
					//ctx.onerror(e);
					if(postdata.length!==0){
                        console.log("请求参数格式有误，请传递能转换为JSON格式的参数。")
					}
				}
				resolve( parseData );
			})
		} catch ( err ) {
			reject(err)
		}
	})
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

