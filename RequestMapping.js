/**
 *
 * Created by yyl on 2018/2/6.
 */

const ControlData = require('./ControlData');
const Model = require("./Model");

/**
 * 注解
 * @param value 请求path
 * @param method 允许的请求方法数组
 * @returns {function(*, *=, *): *}
 * @constructor
 */
function RequestMapping(value, method) {
    /**
     *
     * @param target 所在类的原型对象，即Class.prototype,修饰器的本意是要“修饰”类的实例，但是这个时候实例还没生成，所以只能去修饰原型（这不同于类的修饰，那种情况时target参数指的是类本身）
     * @param name 所要修饰的属性名
     * @param descriptor 该属性的描述对象
     *  descriptor对象原来的值如下
     *  {
     *      value: specifiedFunction,
     *      enumerable: false,
     *      configurable: true,
     *      writable: true
     *  }
     * @returns {*}
     */
    return function (target, name, descriptor) {

        let control = ControlData.get(target.constructor);
        if(!control){
            control = new Model();
            ControlData.set(target.constructor,control)
        }
        control.addPath(value, name, method);
        return descriptor;
    }
}
module.exports = RequestMapping;
