

```
// 好像是 Angular 的源码，下面用了 ngMinErr，是 Angular 的惯用命名法

function copy(source, destination, stackSource, stackDest) {
    if (isWindow(source) || isScope(source)) {
        throw ngMinErr('cpws',
            "Can't copy! Making copies of Window or Scope instances is not supported.");
    }

    // destination 判 false 的情况，比如 0, "", NaN, undefined, null 等
    // 具体参考 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness
    if (!destination) {  // 分支1
        // 默认赋值，相当于在最后加 else  [参考(1)>
        destination = source;
        if (source) {
            if (isArray(source)) {
                // 如果 source 是数据，把 destination 初始化为数组，再递归调用 copy（会进入分支②）
                destination = copy(source, [], stackSource, stackDest);
            } else if (isDate(source)) {
                // 如果是日期，直接 source 的值构造一个新的日期对象
                destination = new Date(source.getTime());
            } else if (isRegExp(source)) {
                // 复制正则表达式
                destination = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]);
                destination.lastIndex = source.lastIndex;
            } else if (isObject(source)) {
                // 如果是其它对象，把 destination 初始化为空对象，再递归调用 copy（会进入分支②）
                destination = copy(source, {}, stackSource, stackDest);
            }
            // else { destination = source } <参考(1)]
        }
    } else {    // 分支 2
        if (source === destination) throw ngMinErr('cpi',
            "Can't copy! Source and destination are identical.");

        stackSource = stackSource || [];
        stackDest = stackDest || [];

        if (isObject(source)) {
            // 看样子这里是在处理递归引用，如果在 stackSource 里找到了 source
            // 说明之前已经产生了这个对象的副本，直接从 stackDest 返回那个副本就好
            var index = indexOf(stackSource, source);
            if (index !== -1) return stackDest[index];

            // 压栈，用于以后的递归引用检查
            stackSource.push(source);
            stackDest.push(destination);
        }

        var result;
        if (isArray(source)) {
            destination.length = 0;
            for (var i = 0; i < source.length; i++) {
                // 这里递归调用 copy 主要是为了深度拷贝，
                // 因为 source[i] 也有可能是一个多么复杂的对象，或者数组，或者其它……
                result = copy(source[i], null, stackSource, stackDest);
                if (isObject(source[i])) {
                    // 拷贝完了记得压入引用栈，供以后检查
                    stackSource.push(source[i]);
                    stackDest.push(result);
                }
                destination.push(result);
            }
        } else {
            var h = destination.$$hashKey;

            // 先重置 destination
            if (isArray(destination)) {
                // 如果是数组，清空
                destination.length = 0;
            } else {
                // 如果不是数组，删除所有属性
                forEach(destination, function(value, key) {
                    delete destination[key];
                });
            }

            // 循环获取 source 的每一个属性，赋值给 destination
            // 同样需要深拷贝，同样需要缓存到引用栈
            for (var key in source) {
                result = copy(source[key], null, stackSource, stackDest);
                if (isObject(source[key])) {
                    stackSource.push(source[key]);
                    stackDest.push(result);
                }
                destination[key] = result;
            }

            // setHashKey 干啥的……我猜是 Angular 内机制要用的
            setHashKey(destination, h);
        }

    }

    // 结果返回出去，注意到上面多处递归调用 copy 都是要取返回值的
    return destination;
}
```
 其实这段代码的逻辑还是很清楚，只在 stackSource 和 stackDest 加上递归，会稍稍让人晕乎。拷贝，尤其是深拷贝，需要特别注意递归引用（就是常说的循环引用）的问题，所以这两个 stack 就是缓存引用，用来处理递归引用的。递归，这个是编程的基本技能之一，如果不懂，就只好先去看看教科书了isWindow 可以猜出来是判断是否 window 对象的，isScope 不是很明白，看它的源码应该能懂，不过这里不 care，反正就是为了判断不能拷贝的对象。
