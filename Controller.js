/**
 * 注解，表示某个类是controller
 * Created by yyl on 2018/2/6.
 */
const ControlData = require('./ControlData');
const Model = require("./Model");

function Controller(root) {
    return function (target) {
        let control = ControlData.get(target.prototype.constructor);
        if(!control){
            control = new Model();
            ControlData.set(target.prototype.constructor,control);
        }
        control.setControl(target.prototype.constructor, root);
    }
}

module.exports = Controller;
