/*
 * name: 京东me
 * modlue: 待办列表
 * author: wisteria
 * date: 2014.07.01
 */

$(function($) {
    //utils
    var utils = {
        touchEvent: 'tap',
        emtyTxt:{
            todo: '亲，您暂时没有待办事项~',
            details: '亲，您暂时没有待办事项~',
            apply: '亲，您现在还没有申请事项~',
            search: '抱歉，没有找到您要的账号~'
        }
    };
    //toDo
    var toDo = {
        mainNode: $('#J_mainContent'),
        overlayNode: $('#J_mainContent .overlay'),
        tipPlayId: -1,
        tipPlaySign: false,
        searchPlayId: -1,
        searchRequest: null,
        indexScroll: null,
        filterScroll: null,
        itemListScroll: null,
        init:function(){
            var me = this;
            //switch
            if($('#J_tabListBd').length>0){
                me.bindHandler();
            }
            if($('#J_details').length>0){
                me.detailsBindHandler();
            }
            //itemList
            me.initSkin();
            me.initItemList();
            me.initScroll();
            // add by willhu 2014/08/04
            me.bindSwipAction();
            $('#J_tabListBd .apply-empty').hide();//init
        },
        initScroll: function(){
            var me = this;
            var config = {
                mouseWheel: true,
                click: true,
                scrollbars: true,
                fadeScrollbars: true,
                shrinkScrollbars: 'clip'
            }
            var version = parseInt($.os.version);
            if($.os.android && version<4){//system
                config.scrollbars = false;
                config.fadeScrollbars = false;
            }
            me.itemListScroll = new IScroll('#J_contentScroll', config);
            
        },
        // add by willhu 2014/08/04
        // swipeleft to show two button  swiperight to hide two botton
        bindSwipAction: function() {
            $("#J_tabListBd1").on("swipeLeft", "li", function() {
                $(this).addClass("item-current");
            });
            $("#J_tabListBd1").on("swipeRight", "li", function() {
                 $(this).removeClass("item-current");
            });
        },
        bindHandler: function(){
            var me = this;
            var viewW = $(window).width();
            var filterOffsetX = 44;
            var filterNode = $('#J_filter');
            //tabList
            $('#J_tabListHd li').on(utils.touchEvent, function(e){
                var cur = $(this);
                if(cur.hasClass('cur')){
                    return;
                }
                //scroll
                setTimeout(function () {
                    me.itemListScroll.refresh();
                }, 0);
                //clean
                $('#J_tabListHd li').removeClass('cur');
                $('#J_tabListBd .item-list').hide();
                $('#J_tabListBd .empty').hide();
                // empty-todo
                //cur
                var cls = cur.attr('class');
                cur.addClass('cur');
                $('#J_tabListBd').find('.'+cls+'-list').show();
                $('#J_tabListBd').find('.'+cls+'-empty').show();
            });
            //filter
            $('#J_btnFilter').on(utils.touchEvent, function(e){
                var duration = 400;
                //cls
                $('#J_filter').addClass('switch-filter');
                me.mainNode.addClass('switch-filter');
                //main
                me.mainNode.css({
                    '-webkit-transform' : 'translate(0px)'
                });
                me.overlayNode.show();
                var mainX = -viewW+filterOffsetX;
                me.mainNode.animate({
                    '-webkit-transform' :' translate('+mainX+'px)'
                },duration);
                //filter
                filterNode.css({
                    '-webkit-transform': 'translate('+viewW+'px)',
                    visibility: 'visible'
                });
                filterNode.animate({
                    '-webkit-transform': 'translate('+filterOffsetX+'px)',
                },duration);
            });
            me.overlayNode.on('touchend', function(e){
                e.preventDefault();
            });
            me.overlayNode.on(utils.touchEvent, function(e){
                var node = $(this);
                setTimeout(function(){
                    //cls
                    $('#J_filter').removeClass('switch-filter');
                    me.mainNode.removeClass('switch-filter');
                    //
                    node.hide();
                    var duration = 400;
                    //main
                    me.mainNode.animate({
                        '-webkit-transform': 'translate(0px)'
                    },duration);
                    //filter
                    filterNode.animate({
                        '-webkit-transform': 'translateX('+viewW+'px)'
                    },duration, function(){
                        filterNode.css('visibility','hidden');
                    });
                },350);
            });
            //searchBox
            $('#J_searchInput').on('focus', function(e){
                if(filterNode.hasClass('whole')){
                    return;
                }
                clearInterval(me.searchPlayId);
                var duration = 300;
                filterNode.find('.content').animate({
                    '-webkit-transform': 'translateY(-50px)'
                }, duration);
                filterNode.find('.cate-list').animate({
                    marginRight: 0
                })
                filterNode.animate({
                    '-webkit-transform': 'translateX(0px)'
                }, duration, function(){
                    filterNode.addClass('whole');
                    //autoComplete
                    me.searchAutoComplete();
                });
            });
            $('#J_searchCancel').on(utils.touchEvent, function(e){
                var duration = 300;
                //clean
                $('#J_searchInput').autoComplete('clean');
                $('#J_searchInput').blur();
                document.activeElement.blur();  //bugfix-hide keyboard
                $('#J_filter .empty').hide();
                filterNode.find('.content').animate({
                    // top: 50
                    '-webkit-transform': 'translateY(0px)'
                }, duration);
                filterNode.find('.cate-list').animate({
                    marginRight: filterOffsetX
                }, duration);
                filterNode.animate({
                    // left: filterOffsetX
                    '-webkit-transform': 'translateX('+filterOffsetX+'px)'
                }, duration, function(){
                    filterNode.removeClass('whole');
                });
            });
        },
        searchAutoComplete: function(){
            var me = this;
            // var url = 'a.php?query=';
            var url = "a.php"
            $('#J_searchInput').autoComplete({
                // data: ['abc','auo','eb'],
                container: $('#J_filter'),
                height: 75,
                maxOptions: 10,
                sortProp: 'name',
                customStyle: true,
                currentBackground: '#FFF',
                itemTpl: '<a class="record" href="{{link}}">{{name}}<em>{{link}}</em></a>',
                dataSource: function(request, response){
                    // console.log(request);
                    if(request.length==0){
                        me.searchCheckEmpty();
                    }
                    var loading = $('#J_search .loading');
                    loading.css('display','block');
                    me.searchRequest = $.ajax({
                        type: 'POST',
                        url: url,
                        // data: {query: request},
                        dataType: 'json',
                        beforeSend: function(xhr, settings){
                            if(me.searchRequest != null){
                                me.searchRequest.abort();
                            }
                        },
                        success: function(data, status){
                            loading.css('display','none');
                            // console.log('search',data);
                            data1 = ['a1','abc2','er','ea'];
                            data1 = [{name: '韩梅梅', link: 'details.html'}, {name: '韩国', link: '#2'}, {name: 'er', link: '#3'},{name: 'ea', link: '#4'}];
                            if(Number(data.errorCode) != 0){
                                alert(data.errorMsg);
                                return;
                            }
                            // console.log('ooooo',data1);
                            response(data1);
                            me.searchCheckEmpty();
                        },
                        error: function(xhr, type){
                            if(type == 'abort'){
                                return;
                            }
                            alert('ajax error - '+type);
                        }
                    });
                },
                select: function(event){
                    var url = $(event.currentTarget).attr('href');
                    window.location.href = url;
                    return;
                    //
                    var value = event.target.innerHTML;
                    console.log(value);
                }
            });
           
        },
        searchCheckEmpty: function(){
            var me = this;
             //empty
            var searchNode = $('#J_filter');
            var emptyNode = searchNode.find('.empty');
            if(emptyNode.length==0){
                emptyNode = me.createEmpty(utils.emtyTxt.search, searchNode);
            }
            var autocomNode = $('.autocomplete');
            emptyNode.hide();
            if($('.autocomplete').css('display') == 'block' &&autocomNode.children().length==0){
                 emptyNode.show();
            }
        },
        detailsBindHandler: function(){
            var me = this;
            var detailsNode = $('#J_details');
            var urlObj = {
                allow: 'a.php',
                reject: 'b.php',
                deny: 'http://www.geonames.org/postalCodeLookupJSON?postalcode=10504&country=US'
            };
            //bind
            detailsNode.find('.opt a').on(utils.touchEvent, function(e){
                if(me.tipPlaySign){
                    return;
                }
                var optStr = $(this).attr('data-opt');
                var url = urlObj[optStr];
                var itemId = $(this).parent().attr('data-id');
                var itemNode = $(this);
                $.ajax({
                    url: url,
                    // data: {id: itemId},
                    dataType: 'json',
                    // dataType: 'jsonp',
                    // timeout: 300,
                    jsonp: 'callback',
                    success: function(data){
                        console.log(data);
                        if(Number(data.errorCode) != 0){
                            me.detailsTip(data.errorMsg);
                            return;
                        }
                        me.detailsTip('批准成功');
                        setTimeout(function(){
                            me.detailsRemove(itemNode);
                        },3000);
                    },
                    error: function(xhr, type){
                        alert('ajax error - '+type);
                    }
                });
            });
        },
        detailsTip: function(txt){
            var me = this;
            var tipNode = $('#J_tip');
            var delayTime = 3000;
            //clean
            clearTimeout(me.tipPlayId);
            if(tipNode.length == 0){
                var tip = $('<div id="J_tip" class="tip">test</div>');
                $('body').append(tip);
                tipNode = $('#J_tip');
            }
            tipNode.text(txt);
            //
            tipNode.css({
                opacity: 0.65,
                marginTop: (-tipNode.height()/2)+'px'
            });
            me.tipPlaySign = true;
            me.tipPlayId = setTimeout(function(){
                $('#J_tip').animate({
                    'opacity': 0
                },400);
                me.tipPlaySign = false;
            },delayTime);
        },
        detailsRemove: function(node){
            var me = this;
            var bd = node.parents('dd');
            var hd = bd.prev();
            bd.css({
                height: bd.height(),
                overflow: 'hidden'
            })
            bd.animate({
                height: 0
            }, 300, function(){
                hd.animate({
                    height: 0
                }, 200, function(){
                    //next
                    if(bd.next()){
                        bd.next().trigger(utils.touchEvent);
                    }
                    //remove
                    hd.remove();
                    bd.remove();
                    me.itemCheckEmpty($('.details-list'));
                })
            });
        },
        initItemList: function(){
            var me = this;
            var mainNode = $('#J_mainContent');
            var arr = mainNode.find('.item-list');
            var item, sublist, subItem;
            for(var i=0, len=arr.length; i<len; i++){
                item = $(arr[i]);
                item.find('dt').first().find('i').addClass('tofold');
                item.find('dd').first().show();
                me.itemCheckEmpty(item);
            }
            //bindHandler
            $('.icon_back').on('tap', function(e){//bugfix->trigger-area
                var url = $(this).attr('href');
                window.location.href = url;
            });
            $('#J_mainContent .item-list').find('dt').on(utils.touchEvent, function(e){
                var duration = 400;
                var listNode = $(this).parents('.item-list');
                if(!$(this).find('i').hasClass('tofold')){
                    //clean
                    listNode.find('dt i').removeClass('tofold');
                    listNode.find('dd').hide();    
                }
                $(this).find('i').toggleClass('tofold');
                $(this).next().toggle();
                //scroll
                if(me.itemListScroll){
                    setTimeout(function () {
                        me.itemListScroll.refresh();
                    }, 0);
                }
                return;
                //old
                var oldHd = listNode.find('.tofold').parent();
                oldHd.find('i').removeClass('tofold');
                old = oldHd.next();
                me.initItemHeight(old);
                old.animate({
                    height: 0
                },duration, function(){
                    // old.hide();
                });
                //cur
                var cur = $(this).next();
                $(this).find('i').toggleClass('tofold');
                // $(this).next().toggle();
                me.initItemHeight(cur);
                var curH = cur.attr('data-sh');
                cur.animate({
                    height: curH+'px'
                }, duration);
             });
        },
        initItemHeight: function(node, sh){
            if(!node.attr('data-sh')){
                var sh = node.find('li').length*45;
                node.attr('data-sh', sh);
            }
        },
        itemCheckEmpty: function(node){
            var me = this;
            if(node.children().length == 0){
                var type = node.attr('data-list');
                var emptyNode = me.createEmpty(utils.emtyTxt[type], node.parent()).addClass(type+'-empty');
                me.cleanScroll(true);
            }else{
                //scroll
                setTimeout(function () {
                    me.itemListScroll.refresh();
                }, 10);
            }
        },
        createEmpty: function(txt, container){
            var node = $('<div class="empty"><span></span><i></i></div>');
            node.find('span').text(txt);
            container.append(node);
            //pos
            var top = node.css('top').replace('px','');
            top = Number(top);
            var sh = node.find('i').css('height').replace('px','');
            sh = Number(sh);
            var offset = 0;
            if(container.hasClass('filter')){
                offset = 50;
            }
            var pos = $(window).height() - top - $('.header').height()- sh + offset;

            if($.os.iphone){
                pos -= 20;
                pos = pos<0 ? 40 : pos;
            }
            node.find('i').css('top', pos);
            return node;
        },
        cleanScroll: function(sign){
            var me = this;
            if(sign && me.itemListScroll){
                me.itemListScroll.destroy();
                me.itemListScroll = null;
            }
        },
        initSkin: function(){
            var sw = $(window).width();
            var setH = 50;
            var imgW = 720, imgH = 160;
            var bgH = sw/imgW*imgH;
            $('.header').css({
                'backgroundSize': sw+'px '+bgH+'px'
            });
            //bindHandler
            $( window ).on('hashchange',function() {
                var hash = location.hash;
                var str = ( hash.replace( /^#/, "" ) || "skin0" );
                $('body').attr('class',str);
            });
              //init
            $( window ).trigger('hashchange');
        }
    };
    //init
    toDo.init();
    // toDo.detailsTip('werwerwesfs所发的');
});