window.onload = function () {
    //autocomplete输入框
    var input = 'input.input-autoComplete';
    var data = ["java", "javascript", "js", "php", "python", "c++"];
    new AutoComplete(input,data);

    //创建一个tabOption对象
    var options = {
        dom: 'div.div-tabList div',
        content: 'div.div-tabContent div',
        defaultSelected: 1,
        event: 'click',
        selected: 'selected',
        callback: function(tabIndex){
            alert(tabIndex + 'selected');
        }
    };
    new Tab(options);

    //创建一个lcCascade对象
    // var llocation = llocation; 这样复制会出错，是？
    var lcButton = document.getElementById('commit');
    var selectDiv = document.querySelector('div.div-selectedLc');
    var lcOptions = {
        lcList: 'div.div-lcList',
        data: llocation,
        defaultLocation: ['广东省','广州市','天河区']
    };
    var lcCas = new LcCascade(lcOptions);
    lcButton.addEventListener('click',function(){
        var lastLocation = lcCas.getLastLocation();
        if(confirm("确认选择：" + lastLocation.join('')+"?")){
            var i = document.createElement('i');
            i.style.display = 'block';
            var time = new Date();
            i.innerText = time.toLocaleDateString() + '---' + lastLocation.join('');
            selectDiv.appendChild(i);
        }
    });

    var autoDiv = document.querySelector('div.div-autoComplete');
    var tabDiv = document.querySelector('div.div-tabOption');
    var lcCascadeDiv = document.querySelector('div.div-lcCascade');
    autoDiv.style.display = 'none';
    tabDiv.style.display = 'none';
    lcCascadeDiv.style.display = 'none';

    var content = document.querySelector('body');
    function changeBgColor(color){
        content.style.backgroundColor = color;
    }

    var aBt = document.querySelector('ul');
    aBt.addEventListener('click', function(e){
        e.preventDefault();
        var tar = e.target;
        var pageIndex = tar.href.lastIndexOf('/');
        var page = tar.href.slice(pageIndex);

        router.go(page);

    },false);

    router.setOptions({
        // mode: "hash"
    });

    router.route("/", function(){
        autoDiv.style.display = 'none';
        tabDiv.style.display = 'none';
        lcCascadeDiv.style.display = 'none';
    });
    router.route('/autoComplete',function(){
        autoDiv.style.display = 'block';
        tabDiv.style.display = 'none';
        lcCascadeDiv.style.display = 'none';
    });
    router.route('/tabOption',function(){
        autoDiv.style.display = 'none';
        tabDiv.style.display = 'block';
        lcCascadeDiv.style.display = 'none';
    });
    router.route('/lcCascade',function(){
        autoDiv.style.display = 'none';
        tabDiv.style.display = 'none';
        lcCascadeDiv.style.display = 'block';
    });
    router.init();
}
