!function ($) {

    // 模板部分
    var template =
        '<div class="m-tab">\
                <ul class="f-cb">\
                   <li class="z-active"><a href="./index.html">首页</a></li>\
                   <li><a href="#">作品</a></li>\
                   <li><a href="#">圈子</a></li>\
                   <li><a href="#">奇思妙想</a></li>\
                </ul>\
               <div class="tabs-track">\
                    <div class="tabs-thumb" style="width: 68px;left: 0;"></div>\
               </div>\
           </div>';

    function Tabs(index) {
        $.extend(this, index);
        this.index  =this.index || 0;
        // 缓存节点
        this.container = this._layout.cloneNode(true);
        this.nTab = this.container.getElementsByTagName('ul')[0];
        this.nbody = document.getElementsByClassName('m-tabs')[0];
        this.nTabs = this.nTab.children;
        this.nThumb = this.container.getElementsByClassName('tabs-thumb')[0];

        // 动态构建滑动条
        // this.init();
    }

    $.extend(Tabs.prototype,{

        _layout: $.html2node(template),

        setCurrent: function (index) {
            $.delClassName(this.nTabs[this.index],'z-active');
            this.index = index;
            $.addClassName(this.nTabs[index],'z-active');
            this.highlight(index);
        },

        highlight: function (index) {
            var tab = this.nTabs[index] || this.nTabs[this.index];
            this.nThumb.style.width = tab.offsetWidth + 'px';
            this.nThumb.style.left = tab.offsetLeft + 'px';
        },

        init : function () {
            this.nbody.appendChild(this.container);
            for (var i = 0; i<this.nTabs.length; i++) {
                this.nTabs[i].addEventListener('click', function (index) {
                    this.setCurrent(index)
                }.bind(this,[i]))
                this.nTabs[i].addEventListener('mouseenter', function (index) {
                    this.highlight(index)
                }.bind(this,[i]))
            }
            this.nTab.addEventListener('mouseleave',function () {
                this.highlight(this.index);
            }.bind(this));
            this.setCurrent(this.index);
        }
    });


    // ----------------------------------------------------------------------
    // 暴露API:  Amd || Commonjs  || Global

    // 支持commonjs
    if (typeof exports === 'object') {
        module.exports = Tabs;
        // 支持amd
    } else if (typeof define === 'function' && define.amd) {
        define(function() {
            return Tabs
        });
    } else {
        // 直接暴露到全局
        window.Tabs = Tabs;
    }
}(util);
