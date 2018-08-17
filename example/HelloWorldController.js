/**
 *
 * Created by yyl on 2018/4/14.
 */
import {Controller, RequestMapping, RequestMethod} from '../index';

@Controller("/poi")
class HelloWorldController{
    @RequestMapping("/helloWorld", [RequestMethod.POST, RequestMethod.GET])
    async helloWorld (param) {
        return `hello world say by ${param.name}`
    }
}


module.exports = HelloWorldController;
