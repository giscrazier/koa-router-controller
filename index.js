'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.awaitEsri = exports.importEsri = undefined;

var _esriLoader = require('esri-loader');

var gp = Promise.resolve(); /**
                             * 使用esri-loader提供的dojoRequire时，模式还是dojoRequire([],fun)的形式，
                             * 为了彻底的转到es6，该模块利用Callbacks机制，提供了esri模块新的加载方式。使得代码可以完全按照es6的形式进行组织。
                             * Created by yyl on 2017/12/8.
                             */

//这里是公用的方法


var __esri__ = Symbol();

/**
 * 为类添加静态属性esri对象，它属性为要添加进来的esri模块
 * @param classes 要添加的esri模块
 * @returns {function(*=)} 修饰器函数
 */
function importEsri(classes) {
    return function (target) {
        target[__esri__] = new Promise(function (resolve) {
            gp.then(function () {
                return (0, _esriLoader.loadModules)(classes, {
                    url: importEsri.libraryRoot
                });
            }).then(function () {
                var ags = arguments[0];
                var args = classes.map(function (cls) {
                    var clz = cls.split('/');
                    return clz[clz.length - 1];
                });
                if (target.esri) {
                    console.info('父类已经有该属性，子类重写该属性');
                    target.esri = Object.assign({}, target.esri);
                } else {
                    target.esri = {};
                }

                args.forEach(function (arg, idx) {
                    target.esri[arg] = ags[idx];
                });
                resolve(target.esri);
            }).catch(function (err) {
                console.error(err);
                target.esri = {};
                resolve(target.esri);
            });
        });
    };
}

//指定ArcGIS For JavaScript API 的入口
importEsri.libraryRoot = "https://js.arcgis.com/4.8/";

/**
 * 修饰类方法，改修饰器必须基于@importEsri类修饰器使用，它修饰类的方法，
 * 将被修饰的方法变为async函数，等esri的模块完全加载后才执行
 * @param target
 * @param name
 * @param descriptor
 * @returns {*}
 */
function awaitEsri(target, name, descriptor) {
    var oldFun = target[name];
    descriptor.value = function () {
        var _this = this,
            _arguments = arguments;

        var promise = this.__proto__.constructor[__esri__];
        return promise.then(function () {
            return Promise.resolve(oldFun.apply(_this, _arguments));
        });
    };
    return descriptor;
}

exports.importEsri = importEsri;
exports.awaitEsri = awaitEsri;