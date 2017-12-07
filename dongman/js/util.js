var util  =(function () {

    return {

        addClassName: function (node, className) {
            var current = node.className || "";
            if ((" " + current + " ").indexOf(" " + className + " ") === -1) {
                node.className = current ? ( current + " " + className ) : className;
            }
        },

        // 删除类名
        delClassName: function (node, className){
            var current = node.className || "";
            node.className = (" " + current + " ").replace(" " + className + " ", " ").trim();
        },

        // html转node节点
        html2node:  function (str){
            var container = document.createElement('div');
            container.innerHTML = str;
            return container.children[0];
        },

         // 属性赋值
        extend: function (o1,o2){
            // console.log(o1)
        for (var i in o2) if (typeof o1[i] === 'undefined') {
                o1[i] = o2[i];
            }
            return o1;
         }
    }

})();