!(function () {

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

    function Tabs(options) {
        _.extend(this,options)
        this.index  =this.index || 0;
        // 缓存节点
        this.nTab = this.container.getElementsByTagName('ul')[0];
        this.nTabs = this.nTab.children;
        // 动态构建滑动条
        this.init();
    }

    Tabs.prototype.init = function () {
        // 绑定事件
        // 我们给每一个li节点也就是每一个tab设置mouseover和click事件，
        // 也就把我们当前hover上去高亮的效果
        // 把当前点击的tab设置为我们选中的tab
        for (var i = 0;i<this.nTabs.length;i++){
            this.nTabs[i].addEventListener('mouseenter',function (index) {
                this.highlight(index);
            }.bind(this,i));
            this.nTabs[i].addEventListener('click',function (index) {
                this.setCurrent(index);
            }.bind(this,i));
        }
        // leave 事件只需要绑定在外层节点就可以，不需要给每一个li绑定
        // 移出的时候我们需要把之前选中的tab继续高亮
        this.nTabs[i].addEventListener('mouseleave',function () {
            this.highlight(this.index);
        }.bind(this));
        this.setCurrent(this.index);
    };

    Tabs.prototype.highlight = function (index) {
        var tab = this.nTabs[index];
        this.nThumb.style.width = tab.offsetWidth + 'px';
        this.nThumb.style.left = tab.offsetLeft + 'px';
    };

    Tabs.prototype.setCurrent = function (index) {
        _.delClassName(this.tabs[this.index],'z-active');
        this.index = index;
        _.addClassName(this.tabs[index],'z-active');
        this.highlight(index);
    };
    window.C.Tabs = Tabs;
})();