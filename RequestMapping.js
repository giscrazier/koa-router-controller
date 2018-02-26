/**
 *
 * Created by yyl on 2018/2/6.
 */
import ControlData from './ControlData';
import Model from './Model';

function RequestMapping(value, method) {
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