// JavaScript Document
        /**
         * aqiData，存储用户输入的空气指数数据
         * 示例格式：
         * aqiData = {
         *    "北京": 90,
         *    "上海": 40
         * };
         */
        var aqiData = [];
        var cityData;
        var airData;
        /**
         * 从用户输入中获取数据，向aqiData中增加一条数据
         * 然后渲染aqi-list列表，增加新增的数据
         */
        function addAqiData() {　
            <!--取得输入的城市名称和空气质量-->
            cityData = document.getElementById("aqi-city-input").value;
            airData = document.getElementById("aqi-value-input").value;

            <!--正则:值为英文或者中文-->
            var checkCity = /^[A-Za-z\u4e00-\u9fa5]+$/;
            <!--正则:值为整数-->
            var checkAir = /^[1-9]\d*$/;

            var resultCity;
            var resultAir;

            <!--检验输入的城市名称-->
            if (cityData == "")
                alert("请输入城市名称");
            else if (checkCity.test(cityData) == false)
                alert("error:请输入英文或中文城市名称！");
            else
                resultCity = true;


            <!--检验输入的空气质量指数-->
            if (airData == "")
                alert("请输入空气质量指数");
            else if (checkAir.test(airData) == false)
                alert("error:请输入整数空气质量指数");
            else
                resultAir = true;

            <!--将值加入数列-->
            if (resultCity == true && resultAir == true)
                aqiData.push([cityData, airData]);
				
        }

        /**
         * 渲染aqi-table表格
         */
        function renderAqiList() {

            var tableLine = "<tr><th>城市</th><th>空气质量</th><th>操作</th></tr>";

            for (var i = 0; i < aqiData.length; i++) {
                var GetData = aqiData[i];
                tableLine = tableLine + "<tr><td>" + GetData[0] + "</td><td>" + GetData[1] + "</td><td><button onclick='delBtnHandle(" + i + ")' class='button_style'>删除</button></td></tr>";

            }
            document.getElementById("aqi-table").innerHTML = tableLine;
			
        }

        /**
         * 点击add-btn时的处理逻辑
         * 获取用户输入，更新数据，并进行页面呈现的更新
         */
        function addBtnHandle() {
            
			addAqiData();
            renderAqiList();
        }

        /**
         * 点击各个删除按钮的时候的处理逻辑
         * 获取哪个城市数据被删，删除数据，更新表格显示
         */
        function delBtnHandle(number) {

            //创造remove方法，找出内容相对应的Index
            Array.prototype.indexOf = function (val) {
                    for (var i = 0; i < this.length; i++) {
                        if (this[i] == val) return i;
                    }
                    return -1;
                }
                //将该内容从数列中删除
            Array.prototype.remove = function (val) {
                var index = this.indexOf(val);
                if (index > -1) {
                    this.splice(index, 1);
                }
            };

            var cityName = aqiData[number];
            alert("确认要删除城市" + cityName[0] + "的数据吗");

            //使用创造的remove方法，从aqiData数列里删除相应内容
            aqiData.remove(aqiData[number]);
            renderAqiList();
        }

        function init() {

            // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
            document.getElementById("add-btn").onclick = function () {
                addBtnHandle();
            }

        }

init();