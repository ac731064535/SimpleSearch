var router = {
    options: {},
    routes: {},
    currentUrl: '',
    setOptions: function(gotMode){
        this.options.mode = gotMode.mode || 'hash';
    },
    //1.当点击浏览器的‘前进’或‘后退’时，两种方式所发生的事件
    init: function(){
        if(this.options.mode === 'hash'){
            window.onhashchange = this.onUrlChange.bind(this)//hash
        }else{
            window.onpopstate = this.onUrlChange.bind(this)//pushstate
        }
    },
    //当页面的url改变时（这里分为两种，浏览器的‘前进’或‘后退’，以及在js中修改路由），页面所发生状态的改变。
    onUrlChange: function(){
        this.currentUrl = location.href.slice(location.href.lastIndexOf('/'));
        this.routes[this.currentUrl]();
    },
    route: function(path,callback){
        this.routes[path] = callback || function(){};
    },
    //2.js代码改变路由，hash和pushstate将路由映射到地址栏的方式
    go: function(url){
        if(this.options.mode === 'hash'){
            location.hash = '#' + url;//hash的映射方式
            // this.onUrlChange(); //这个也会触发hashchange事件，所以不用调用
        }else{
            history.pushState({},'',url);//pushstate的映射方式
            this.onUrlChange();
        }
    }
}