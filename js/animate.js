/**
 * Created by ganruijie on 2016/9/25.
 */
/**
 * 封装多属性的函数(属性值,透明度,层级,回调函数)
 * @param obj
 * @param json
 * @param fn
 */
    function animate(obj, json,fn) {
        clearInterval(obj.timeId);
        obj.timeId = setInterval(function () {
            var flag = true;
            for(var key in json) {
                if (key == "opacity") {
                    var leader = parseInt(getStyle(obj, key) * 100) || 0;
                    var target = json[key] * 100;
                    var step = (target - leader) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    leader = leader + step;
                    obj.style[key] = leader / 100;
                } else if (key == "zIndex") {
                    var leader = parseInt(getStyle(obj, key)) || 0;
                    var target = json[key];
                    var step = (target - leader) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    obj.style[key] = target;
                } else {
                    var leader = parseInt(getStyle(obj, key)) || 0;
                    var target = json[key];
                    var step = (target - leader) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    leader = leader + step;
                    obj.style[key] = leader + "px";
                }
                if (leader != target) {
                    flag = false;
                }
            }
            if (flag) {
                clearInterval(obj.timeId);
                if (fn) {//函数的回调
                    fn();
                }
            }
        }, 15);
    }

    function getStyle(obj, arrt) {
        if (obj && obj.currentStyle) {
            return obj.currentStyle[arrt];
        } else {
            return getComputedStyle(obj, null)[arrt];
        }
    }

