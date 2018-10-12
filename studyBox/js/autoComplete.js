function AutoComplete(input, Data) {
    var _this = this;
    this.inputT = document.querySelector(input);
    this.sData = Data;

    var liIndex = -1,
        setIntValue = '',
        ul = '';

    this.init = function () {
        this.inputT.addEventListener('input', onInputChange);
        this.inputT.addEventListener('keydown', onKeyDownChange);
    }

    function onInputChange(){
        //判断如果没有ul，就执行添加
        if (!ul) {
            ul = document.createElement('ul');
            ul.classList.add('ul-autoComplete');
            ul.style.left = _this.inputT.offsetLeft + 'px';
            ul.style.top = _this.inputT.offsetTop + _this.inputT.offsetHeight + 'px';
            ul.style.width = _this.inputT.clientWidth + 'px';
            _this.inputT.parentNode.appendChild(ul);

            console.log(_this.inputT.style);//此时尚未加载样式表里的样式，所以style里面没数据
            //事件委托，为ul下面的子节点提供委托事件，e.target指向被点击的节点
            ul.addEventListener('click', function (e) {
                var tar = e.target;
                _this.inputT.value = tar.innerText;
            })
        }

        var re = new RegExp("^" + _this.inputT.value + "");
        liIndex = -1;  //每次input更新，就重置指针

        //清空ul
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        for (let i = 0; i < _this.sData.length; i++) {
            if (_this.inputT.value != '' && re.test(_this.sData[i])) {
                let li = document.createElement("li");
                li.classList.add('li-autoComplete');
                li.innerText = _this.sData[i];//4.
                ul.appendChild(li);

            }
        }
    }

    function onKeyDownChange(e) {
        if(_this.inputT.value){
            switch (e.keyCode){
                case 13:
                    enterKeyDown();
                    break;
                case 38:
                    upKeyDown();
                    break;
                case 40:
                    downKeyDown();
                    break;
            }
        }
    }
    function enterKeyDown() {
        _this.inputT.value = setIntValue;
        ul.parentNode.removeChild(ul);
        ul = null
    }
    function upKeyDown() {
        // ul.children[liIndex].removeAttribute('class');
        ul.children[liIndex].classList.remove('selected');
        liIndex -= 1;
        if (liIndex < 0) {
            liIndex = ul.children.length - 1;
        }
        console.log(ul.children[liIndex]);
        // ul.children[liIndex].setAttribute('class', 'selected');
        ul.children[liIndex].classList.add('selected');
        setIntValue = ul.children[liIndex].innerText;
    }
    function downKeyDown() {
        if(liIndex != -1)
            ul.children[liIndex].classList.remove('selected');
        liIndex += 1;
        if (liIndex > ul.children.length - 1) {
            liIndex = 0;
        }
        console.log(ul.children[liIndex]);
        // ul.children[liIndex].setAttribute('class', 'selected');
        ul.children[liIndex].classList.add('selected');
        setIntValue = ul.children[liIndex].innerText;
    }
    this.init();
}