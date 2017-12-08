(function ($) {
   var template =
   '<div class="m-search-in">\
       <form target="_blank" action="#" accept-charset="UTF-8" method="get">\
       <input type="text" class="u-search" autocomplete="on" placeholder="输入搜索内容 ">\
       <a class="u-search-btn"><i class="u-search-logo"></i></a>\
       </form>\
       </div>';
   
   function Search(opt) {

       opt  = opt || {};
       // 缓存节点
       this.container = this._layout.cloneNode(true);
       this.search = this.container.querySelector('.m-search-in');
       this.text = this.container.querySelector('.u-search');
       this.btn = this.container.querySelector('.u-search-btn');
       this.sbody = document.querySelector('.m-search');

       // ...
       this.init();
       $.extend(this, opt);
   }

   $.extend(Search.prototype, {
       _layout: $.html2node(template),

       init:function () {
            this.sbody.appendChild(this.container);
            if (this.text.value.length === 0) return false;

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