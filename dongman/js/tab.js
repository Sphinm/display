!function (_) {

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

    function Tabs(option) {
        _.extend(this, option);

        this.index  = this.index || 0;
        // 缓存节点
        this.element = this._layout.cloneNode(true);
        this.head = document.querySelector('.g-header');
        this.reforeNode = document.querySelector('.m-search');
        this.nTab = this.element.getElementsByTagName('ul')[0];
        this.nTabs = this.nTab.children;
        this.nThumb = this.element.getElementsByClassName('tabs-thumb')[0];

    }

    _.extend(Tabs.prototype,{

        _layout: _.html2node(template),

        setCurrent: function (index) {
            _.delClassName(this.nTabs[this.index],'z-active');
            this.index = index;
            _.addClassName(this.nTabs[index],'z-active');
            this.highlight(index);
        },

        highlight: function (index) {
            var tab = this.nTabs[index] || this.nTabs[this.index];
            this.nThumb.style.width = tab.offsetWidth + 'px';
            this.nThumb.style.left = tab.offsetLeft + 'px';
        },

        init : function () {
            this.head.insertBefore( this.element,this.reforeNode);
            for (var i = 0; i < this.nTabs.length; i++) {
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