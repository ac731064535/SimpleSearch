function Tab(options){
    const DEFAULTS = {
        defaultSelected: 0,
        event: 'click'
    };
    options = Object.assign({},DEFAULTS,options);

    var tabList = document.querySelectorAll(options.dom);
    var contentList = document.querySelectorAll(options.content);
    var timer = '';
    var lastTabIndex = 0;
    var _this = this;

    //为Tab绑定索引
    for(let i = 0; i < tabList.length; i++){
        tabList[i].index = i;
    }

    //清除所有内容
    for(let content of contentList){
        content.style.display = 'none';
    }

    // console.log('events',tabList[1].index,contentList);

    this.init = function(){
        this.showContent(options.defaultSelected);
        checkEvent(options.event);
    }

    function checkEvent(e){
        if(e == 'click'){
            handleClick();
        }else{
            handleMouseover();
        }
    }

    function handleClick(){
        tabList[0].parentNode.addEventListener('click',function(e){
            var tar = e.target;

            _this.showContent(tar.index);
            options.callback(tar.index);
        })
    }


    function handleMouseover(){
        tabList[0].parentNode.addEventListener('mouseover',function(e){
            timer = setTimeout(function(){
                var tar = e.target;
                _this.showContent(tar.index);
                options.callback(tar.index);
            },2000)
        });
        tabList[0].parentNode.addEventListener('mouseout',function(){
            clearTimeout(timer);
        })

    }

    this.showContent = function(tabIndex){
        tabList[lastTabIndex].removeAttribute('class');
        tabList[tabIndex].setAttribute('class',options.selected);
        contentList[lastTabIndex].style.display = 'none';
        contentList[tabIndex].style.display = 'block';

        lastTabIndex = tabIndex;
    }

    this.init();
}