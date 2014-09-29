(function($) {
  var methods = {
    init: function(options) {
      var settings = $.extend({
        data: [],
        container: null,
        dataSource: null,
        sortProp: '',
        customStyle: false,
        height: 20,
        maxOptions: 100,
        scrollable: true,
        optionBackground: '#FFFFFF',
        currentBackground: '#EBE1E5',
        select: null,
        itemTpl: ''
      }, options);

      var $this = this;
      //To initialize the control
      var data = $this[0].externalData;
      var current = null;
      //if not initialized for this item
      if (!data) {
        // console.log('init')
        createStorage();
        return $this.each(function() {
          $this
          // .bind('focus.autocomplete', computeStorage)
          // .bind('keyup.autocomplete', keyHandler)
          // .bind('input paste', keyHandler);
          .bind('input paste', keyHandler);
          // .bind('blur.autocomplete', closeStorage)
        })
      }

      function createStorage() {
        var storage = $('<div class="autocomplete">');
        var conNode = $('body');
        if(settings.container){
          conNode = settings.container;
        }
        conNode.append(storage);
        //style
        if(!settings.customStyle){
            var position = {
            left: $this.offset().left,
            top: $this.offset().top + $this.height()
          }
          storage.width($this.width() - 2);
          storage.css({
            zIndex : 1000,
            position: 'absolute',
            top: position.top,
            left: position.left,
            border: '1px solid #000',
            background: '#FFF'
          });
          storage.css('max-height', settings.maxOptions * settings.height + 'px');
        }
        $this.attr('data-autocomplete', 'true');
        storage.on('mousedown.autocomplete', '.record', chooseRecord);
        if (settings.scrollable) {
          storage.css('overflow', 'auto');
        } else {
          storage.css('overflow', 'hidden')
        }
        // if (settings.maxOptions > settings.data.length) {
        //   storage.css('max-height', settings.data.length * settings.height + 'px');
        // } else {
          
        // }
        $this[0].externalData = {
          storage: storage,
          settings: settings
        };
        storage.hide();
      }

      // function closeStorage() {
      //   var storage = $this[0].externalData.storage;
      //   storage[0].scrollTop = 0;
      //   storage.hide();
      // }

      function chooseRecord(e) {
        $this.val($(e.target).text());
        //event
        var settings = $this[0].externalData.settings;
        settings.select && settings.select(e);
      }

      function updateData(){
        var settings = $this[0].externalData.settings;
        var value = $this.val();
        if(settings.dataSource){
          settings.dataSource(value, computeStorage);
        }else{
          computeStorage();
        }
      }

      function computeStorage(data) {
        var storage = $this[0].externalData.storage;
        var settings = $this[0].externalData.settings;
        var propStr = settings.sortProp;
        var value = $this.val();
        console.log(value);
        //update data
        if($.isArray(data)){//check array
          settings.data = data;
        }
        storage.empty();
        storage.hide();
        if(propStr.length>0){
          function SortByPro(a, b){
            var aProp = a[propStr].toLowerCase();
            var bProp = b[propStr].toLowerCase(); 
            return ((aProp < bProp) ? -1 : ((aProp > bProp) ? 1 : 0));
          }
          settings.data.sort(SortByPro);
        }else{
          settings.data.sort();
        }
        var item, string;
        for (var i = 0; i < settings.data.length; i++) {
          item = settings.data[i];
          if(propStr.length>0){
            string = item[propStr];
          }else{
            string = settings.data[i];  
          }
          if (string.toLowerCase().indexOf(value.toLowerCase()) != -1 && value) {
            var link = item.link ? item.link : 'javascript:;';
            var record = $('<div class="record">'+string+'</div>');
            if(settings.itemTpl.length>0){
              record = renderTpl(settings.itemTpl, item);
            }
            storage.append(record);
          }
        }
        if (storage.find('.record').length) {
          current = storage.find('.record:first-child');
          current.css('background', settings.currentBackground);
        }
        storage.show();
      }
      //simple tpl render
      function renderTpl(tpl, data){
        var result = tpl.replace(/{{(.*?)}}/igm,function($,$1) {
            return data[$1]?data[$1]:$;
        });
        return $(result);
      }

      function moveUp(scroll) {
        var storage = $this[0].externalData.storage;
        if (current.prev().length) {
          if (scroll) {
            storage[0].scrollTop -= settings.height;
          }
          current.css('background', settings.optionBackground);
          current = current.prev();
          current.css('background', settings.currentBackground);
        }
      }

      function moveDown(scroll) {
        var storage = $this[0].externalData.storage;
        if (current.next().length) {
          if (scroll) {
            storage[0].scrollTop += settings.height;
          }
          current.css('background', settings.optionBackground);
          current = current.next();
          current.css('background', settings.currentBackground);
        }
      }

      //creation diva with tips
      function keyHandler(e) {
        var storage = $this[0].externalData.storage;
        var settings = $this[0].externalData.settings;
        switch (e.keyCode) {
          case 37:
            break;
          case 39:
            break;
          case 38:
            var prev = current.index() - 1;
            if (!settings.scrollable) {
              moveUp();
            } else {
              var scroll = false;
              if (prev < storage[0].scrollTop / settings.height) {
                scroll = true;
              }
              moveUp(scroll);
            }
            break;
          case 40:
            var next = current.index() + 1;
            if (!settings.scrollable) {
              if (next < settings.maxOptions) {
                moveDown();
              }
            } else {
              var scroll = false;
              if (next >= settings.maxOptions) {
                scroll = true;
              }
              moveDown(scroll);
            }
            break;
          case 13:
            if (storage.width()) {
              $this.val(current.html());
              storage.empty();
              storage.hide();
            }
            break;
          default:
            updateData();
            break;
        }
      }
    },
    destroy: function() {
      return this.each(function() {
        $this = $(this);
        $this.unbind('.autocomplete');
        var storage = this.externalData.storage;
        $(storage).remove();
        delete this.externalData;
      })
    },
    add: function(field) {
      $this = this;

      function unique(arr) {
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
          var str = arr[i];
          obj[str] = true;
        }
        return Object.keys(obj);
      }
      //if not an array
      if (Object.prototype.toString.call(field) != '[object Array]') {
        //try to turn into an array
        field = [field];
      }

      var newArr = $this[0].externalData.settings.data.concat(field);
      newArr = unique(newArr);
      var data = $this[0].externalData;
      data.settings.data = newArr.sort();

      if (data.settings.maxOptions > data.settings.data.length) {
        data.storage.css('max-height', data.settings.data.length * data.settings.height + 'px');
      } else {
        data.storage.css('max-height', data.settings.maxOptions * data.settings.height + 'px');
      }
    },
    clean: function(){
      $this = this;
      var storage = $this[0].externalData.storage;
      storage[0].scrollTop = 0;
      storage.hide();
      $this.val('');
    }
  }

  $.fn.autoComplete = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method named ' + method + ' does not exist Zepto.autocomplete');
    }
  }

})(Zepto)