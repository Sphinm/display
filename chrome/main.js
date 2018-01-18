
/**
 *  创建chrome插件，简单去掉百度搜索的广告
 *  主要根据广告通用的类名和内容为'广告' 两个字去删除节点 YkTPiJ
 *  rNnokY m jWmsIF m ec_tuiguang_ppouter
 * */


var ad = {
    adSafe: function () {
        // 右侧区域
        var a = document.querySelector('.cr-offset');
        if (a) a.remove();

        // 顶部大广告，使用的类名不一样
        var b = document.querySelector('.zapKAj');
        if (b) b.remove();

        // 顶部大广告，使用的类名不一样
        var d = document.querySelector('.YkTPiJ');
        if (d) d.remove();

        // 删除有该类名的广告列表
        var ad = document.querySelectorAll('.ec_tuiguang_ppouter');
        if(ad.length > 0) {
            for(var i = 0; i < ad.length;i++){
                ad[i].remove()
            }
        }

        // 删除有该类名的广告列表
        var ads = document.querySelectorAll('.ec_tuiguang_pplink');
        if(ads.length > 0) {
            for(var i = 0; i < ads.length;i++){
                console.log(ads[i])
                ads[i].remove()
            }
        }

        // var _contentLeft = document.getElementById('content_left');
        // _contentLeft.style.display = 'none';
        // //屏蔽百度推广
        // var _tuiguangList = _contentLeft.getElementsByClassName('ec_tuiguang_pplink');
        // if(_tuiguangList.length > 0){
        //     for(var i = 0,l = _tuiguangList.length;i < l;i++){
        //         _tuiguangList[i].parentNode.parentNode.parentNode.style.display = "none";
        //     }
        // }
        //
        // //屏蔽大区域广告
        // var _tuiguangList2 = _contentLeft.getElementsByClassName('ec_tuiguang_ppouter');
        // if(_tuiguangList2.length > 0){
        //     for(var i = 0,l = _tuiguangList2.length;i < l;i++){
        //         _tuiguangList2[i].parentNode.style.display = "none";
        //     }
        // }
        //
        // _contentLeft.style.display = 'block';
        // document.getElementById('content_left').innerHTML = _contentLeft.innerHTML;
    },

    removeAd: function () {
        this.adSafe();
    }
};


    // 执行
    ad.removeAd();