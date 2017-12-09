(function ($) {
   var template =
   '<div class="m-search-in">\
       <form target="_blank" action="#" accept-charset="UTF-8" method="get">\
       <input type="text" class="u-search" autocomplete="on" placeholder="输入搜索内容 ">\
       <a class="u-search-btn"><button class="u-search-logo" type="submit"></button></a>\
       </form>\
       </div>';
   
   function Search() {
       // 缓存节点
       this.container = this._layout.cloneNode(true);
       this.text = this.container.querySelector('.u-search');
       this.sbody = document.querySelector('.m-search');

       this.init();
   }

   $.extend(Search.prototype, {
       _layout: $.html2node(template),

       // 1.判断输入的内容是否为空，空的话就不做搜索
       // 2.满足条件后，无论是回车还是点击button都进行搜索

       show: function (event) {
           if (this.text.value.length === 0 || this.text.value.trim() === ''){
               event.preventDefault()
           }
       },

       init:function () {
           this.sbody.appendChild(this.container);

           // 由于button在sbody里面 所以需要在外层设置submit事件
           this.sbody.addEventListener('submit',function (event) {
               this.show(event)
           }.bind(this))
       }
   });


    // ----------------------------------------------------------------------
    // 暴露API:  Amd || Commonjs  || Global

    // 支持commonjs
    if (typeof exports === 'object') {
        module.exports = Search;
        // 支持amd
    } else if (typeof define === 'function' && define.amd) {
        define(function() {
            return Search
        });
    } else {
        // 直接暴露到全局
        window.Search = Search;
    }
})(util);