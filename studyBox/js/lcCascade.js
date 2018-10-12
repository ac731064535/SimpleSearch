function LcCascade(option) {
    var _this = this;
    this.data = option.data;
    //要注意把nodelist换成节点
    this.div = document.querySelectorAll(option.lcList)[0];
    this.selectList = this.div.getElementsByTagName('select');

    this.lastLocation = [];

    this.init = function(){
        //添加一个默认参数调用函数，当发生点击事件时，把默认参数去掉再调用
        this.selectLocation(0,this.data,option.defaultLocation);
        // this.selectLocation(0,data);
    }
    this.selectLocation = function(selectIndex,data,defaultLocation){
        var _this = this
        if(!data||data.length == 0){
            ;        		return
        }
        while(this.selectList.length > selectIndex){
            this.div.removeChild(this.selectList[this.selectList.length - 1]);
        }

        var selectP = document.createElement('select');
        selectP.add(new Option('请选择'));
        selectP.options[0].style.display='none';
        // selectP.selectedIndex = -1;
        this.div.appendChild(selectP);

        selectP.addEventListener('change',function(){
            if(selectIndex == 0){
                _this.lastLocation = [];
            };
            //去掉默认参数再调用
            _this.lastLocation.splice(selectIndex,1,data[selectP.selectedIndex - 1].name);
            _this.selectLocation(selectIndex + 1,data[selectP.selectedIndex - 1].children);
        })

        for(let i = 0; i < data.length; i++){
            selectP.add(new Option(data[i].name,i));
            if(defaultLocation != undefined){
                if(data[i].name == defaultLocation[selectIndex]){
                    selectP.selectedIndex = i+1;
                    this.lastLocation.splice(selectIndex,1,data[i].name);
                    this.selectLocation(selectIndex + 1, data[i].children,defaultLocation);
                }
            }
        }
    }

    this.getLastLocation = function(){
        return this.lastLocation;
    }

    this.init();

}