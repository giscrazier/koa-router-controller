/**
 *
 * Created by yyl on 2018/2/6.
 */
const GET = "get";
const POST = "post";
const PUT = "put";
const HEAD = "head";
const OPTIONS = "options";
const DELETE = "delete";
const TRACE = "trace";
const CONNECT = "connect";

let RequestMethod = {
    GET,
    POST,
    PUT,
    HEAD,
    OPTIONS,
    DELETE,
    TRACE,
    CONNECT
};

module.exports = RequestMethod;
