/**
 *
 * Created by yyl on 2018/2/6.
 */
class Model{
    constructor(){
        this.paths=[];
    }
    setControl(control, root){
        this.control = control;
        this.root = root;
    }

    addPath(path,funName, method){
        this.paths.push({
            funName: funName,
            path:path,
            method: method
        })
    }
}
module.exports = Model;
