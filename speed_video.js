// ==UserScript==
// @name         视频倍速播放(追剧学习神器)
// @namespace    http://tampermonkey.net/
// @icon         https://img-blog.csdnimg.cn/20181221195058594.gif
// @version      1.3.4
// @description  全网视频倍速播放，看视频播太慢，这能忍？直接倍速播放，最高速度20倍【食用方法】①调节右上角加速框右侧上下按钮即可调节倍率 ②在右上角的加速框内输入加速倍率,如2、4、8、16等。【快捷键】：①单手快捷键：“x”，“c” 恢复正常播放:“t”或“z”  ②双手快捷键：ctrl + 左右箭头
// @author       wll
// @require      https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
// @require      https://greasyfork.org/scripts/447214-toast-script/code/toastscript.js?version=1065649
// @resource     css1 https://cdn.jsdelivr.net/gh/sanzhixiaoxia/statics@main/toast.style.css
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.all.min.js
// @require      https://greasyfork.org/scripts/471299-toastify-js/code/toastifyjs.js?version=1222923
// @resource     css2 https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_registerMenuCommand
// @match        *://*/*
// @note         增加支持网站：	依照规则增加@match所在标签即可
// @note         郑重声明：	本脚本只做学习交流使用，未经作者允许，禁止转载，不得使用与非法用途，一经发现，追责到底
// @note         授权联系：	leiwang2010@163.com
// @note         版本更新	20-12-26 1.0.0	初版发布视频倍速播放
// @note         版本更新	21-02-04 1.0.1 	优化用户体验
// @note         版本更新	21-02-04 1.0.2 	优化标题，优化简介
// @note         版本更新	21-06-18 1.0.3 	增加新的倍速网址，ehuixue.cn/index/study，ehuixue.cn/index/study，chaoxing.com
// @note         版本更新	21-06-25 1.0.4 	增加新的倍速网址，douyin.com
// @note         版本更新	21-06-26 1.0.5 	增加新的倍速网址，pan.baidu.com,youku.com
// @note         版本更新	21-07-09 1.0.6 	修正哔哩哔哩网站无法暂停问题
// @note         版本更新	21-10-11 1.0.7 	由于百度云视频倍速播放收费，一时无法解决，暂时停用百度相关加速*://*.pan.baidu.com/*
// @note         版本更新	21-12-11 1.0.8  感谢用户“何佳林”，提供建议，增加快捷键控制倍速 ctrl + ->  ctrl + <-
// @note         版本更新	21-12-13 1.0.9  增加cctv支持，增加倍速控件悬浮不跟随滑动
// @note         版本更新	21-12-14 1.1.0  增加倍率记忆功能，防止页面刷新倍率重新计算
// @note         版本更新	21-12-19 1.1.1  1、增加单手快捷键: “x” 、“c”， 2、增加寄存器倍率存储，浏览器全局使用 3、增加倍速框自动聚焦
// @note         版本更新	21-12-20 1.1.2  代码脚本优化
// @note         版本更新	21-12-20 1.1.3  增加全网倍速支持，让倍速不再有障碍
// @note         版本更新	21-12-21 1.1.4  增加快捷键d,用于恢复正常播放速度
// @note         版本更新	21-12-22 1.1.5  更改快捷键t,用于恢复正常播放速度
// @note         版本更新	21-12-23 1.1.6  修正倍速无法回到正常播放问题，感谢大佬“我不想上班”提供技术支持
// @note         版本更新	21-12-24 1.1.7  修正插件自带寄存器存储赋值失效问题
// @note         版本更新	21-12-24 1.1.8  修正bilibili自动下一集倍速失效问题
// @note         版本更新	21-12-28 1.1.9  增加大写快捷键支持
// @note         版本更新	22-01-06 1.2.0  增加倍率改变提示
// @note         版本更新	22-11-30 1.2.1  增加自动播放支持，增加代码优化
// @note         版本更新	22-12-03 1.2.2  增加浏览器菜单-可以：开启/关闭“倍速框”
// @note         版本更新	22-12-03 1.2.3  优化页面倍速框，倍速药丸不能停 O(∩_∩)O哈哈~
// @note         版本更新	22-12-05 1.2.4  优化倍速框样式
// @note         版本更新	23-01-18 1.2.5  @include *:* @match *://*/*
// @note         版本更新	23-06-08 1.2.6  增加触屏支持
// @note         版本更新	23-06-08 1.2.7  增加快速还原1.0
// @note         版本更新	23-07-21 1.2.8  替换提示，去除双手快捷键
// @note         版本更新	23-08-04 1.2.9  增加滑动支持
// @note         版本更新	23-08-04 1.3.0  滑动支持优化
// @note         版本更新	23-08-28 1.3.1  增加兼容性，增加跳过片头片尾功能
// @note         版本更新	23-09-05 1.3.2  开关控制版本大升级
// @note         版本更新	23-09-06 1.3.3  增加倍速框可拖动模式，修正跳过片头尾
// @note         版本更新	23-09-07 1.3.4  增加三分钟真男人模式

// ==/UserScript==

(function() {
    'use strict';

    // 自定义样式
    function addStyle() {
        let customCss=`
            #rangeId{z-index:99999999;position:fixed;top:100px;right:100px;width:55px;background-color:#E3EDCD;display:inline-block;text-align:center;padding:0 6px 0 7px;height:16px;line-height:16px;border-radius:9px;border:1px solid var(--brand_pink);outline: none;color:var(--brand_pink);font-size:12px;margin-right:4px;transition:background 0.3s,color 0.3s;flex-shrink:0;filter: opacity(0.7);cursor:move;user-select:none;}
            #rangeId:hover{filter: opacity(1);}
            .slider-container{display:flex;align-items:center;justify-content:flex-start;}
            .toggle-container{display:inline-block;position:relative;}
            .toggle-input{display:none;}
            .toggle-label{display:block;width:60px;height:30px;background-color:#ddd;border-radius:15px;position:relative;cursor:pointer;transition:background-color 0.3s;}
            .toggle-label:before{content:"";position:absolute;top:2px;left:2px;width:26px;height:26px;background-color:white;border-radius:50%;transition:left 0.3s;}
            .toggle-input:checked+.toggle-label{background-color:#66bb6a;}
            .toggle-input:checked+.toggle-label:before {left: calc(100% - 28px);}
            #switch_table table {
              width: 100%; /* 设置表格宽度为100% */
              border-collapse: collapse; /* 合并表格边框 */
            }
            #switch_table table th, table td {
              padding: 10px; /* 设置表头和单元格的内边距为10像素 */
              white-space: nowrap; /* 设置文字不换行 */
            }
            #switch_table table th {
              background-color: #f5f5f5; /* 设置表头的背景颜色为浅灰色 */
              font-weight: bold; /* 设置表头文字加粗 */
            }
        `;
        GM_addStyle(customCss);
    }

    // 自定义节点
    function addDocument(){

        $("body").prepend('<input id="rangeId" type="number" step="0.1" min="0.1" max="20" autofocus="autofocus" value=""  />');

        let element = document.getElementById('rangeId');
        element.style.opacity = 0.7;

        element.addEventListener('change', function () {
            // 在这里执行 change 事件的处理逻辑
            element.style.opacity = 1;
            addToast("当前倍速：" + element.value);
        });
        element.addEventListener('mouseover', function() {
            element.style.opacity = 1;
        });
        element.addEventListener('mouseout', function() {
            element.style.opacity = 0.7;
        });

        // 初始化按钮位置
        var buttonPosition = localUtil.getGValue('buttonPosition');
        if (buttonPosition) {
            var position = JSON.parse(buttonPosition);
            element.style.top = position.top + 'px';
            element.style.left = position.left + 'px';
        }

        // 添加按钮拖动功能
        element.addEventListener('mousedown', function(e) {
            var offsetX = e.clientX - element.offsetLeft;
            var offsetY = e.clientY - element.offsetTop;

            document.addEventListener('mousemove', dragButton);

            function dragButton(e) {
                var left = e.clientX - offsetX;
                var top = e.clientY - offsetY;

                // 限制按钮不可移出屏幕
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                var buttonWidth = element.offsetWidth;
                var buttonHeight = element.offsetHeight;

                left = Math.max(15, Math.min(left, windowWidth - buttonWidth - 15));
                top = Math.max(15, Math.min(top, windowHeight - buttonHeight - 15));

                element.style.left = left + 'px';
                element.style.top = top + 'px';
            }

            document.addEventListener('mouseup', function() {
                document.removeEventListener('mousemove', dragButton);
                saveButtonPosition();
            });
        });

        // 保存按钮位置到本地存储
        function saveButtonPosition() {
            var position = {
                top: element.offsetTop,
                left: element.offsetLeft
            };
            localUtil.setGValue('buttonPosition', JSON.stringify(position));
        }
    }

    // 监听快捷键
    document.addEventListener("keypress", handleKeyPress);

    function handleKeyPress(e) {
        log.info("--->e.key:" + e.key);
        let videos = document.querySelectorAll("video").length;
        if (videos > 0) {
            switch (e.key.toLowerCase()) {
                case "x":
                    speedFun("-");
                    break;
                case "c":
                    speedFun("+");
                    break;
                case "t":
                case "z":
                    speedFun("1");
                    break;
            }
        }
    }

    /* PC端滑动处理 */
    var isMouseDown = false;
    var startX, startY;
    $(document).on('mousedown', function(event) {
        isMouseDown = true;
        startX = event.pageX;
        startY = event.pageY;
    });
    $(document).on('mousemove', function(event) {
        if (isMouseDown) {
            var currentX = event.pageX;
            var currentY = event.pageY;

            var distanceX = currentX - startX;
            var distanceY = currentY - startY;

            var times = Math.abs(distanceY) / 600;
            for (var i = 0; i < times; i++) {
                if (distanceY > 0) {
                    // speedFun("-");
                } else {
                    // speedFun("+");
                }
            }
        }
    });
    $(document).on('mouseup', function(event) {
        isMouseDown = false;
    });


    /* 移动端滑动处理 */
    var lastY = 0;
    var direction = ""; // 保存方向信息

    $(document).on('touchstart', function(e) {
        lastY = e.originalEvent.touches[0].clientY;
    });

    $(document).on('touchmove', function(e) {
        var currentY = e.originalEvent.touches[0].clientY;
        var deltaY = currentY - lastY;
        var times = Math.abs(deltaY) / 100;

        if (deltaY > 0) { direction = "down";} else { direction = "up";}

        for (var i = 0; i < times; i++) {
            log.info(direction);
            if (direction = "down") { speedFun("-"); }
            if (direction = "up") { speedFun("+"); }
        }

        lastY = currentY;
    });

    // 更改倍速
    function speedFun(spee) {

        log.info("this speedFun is spee:" + spee);
        controlVideoProperty('playbackRate', spee);  // 调用函数，设置播放速度为2.0

        if ("+" == spee) {
            let numVal = parseFloat(parseFloat($("#rangeId").val()) + 0.1 > 20 ? 20 : parseFloat($("#rangeId").val()) + 0.1).toFixed(1);
            addToast("当前倍速：" + numVal);
            $("#rangeId").val(numVal).trigger("change");
            return;
        }
        if ("-" == spee) {
            let numVal = parseFloat(parseFloat($("#rangeId").val()) - 0.1 < 0.1 ? 0.1 : parseFloat($("#rangeId").val()) - 0.1).toFixed(1);
            addToast("当前倍速：" + numVal);
            $("#rangeId").val(numVal).trigger("change");
            return;
        }
        if ("1" == spee) {
            $("#rangeId").val(1.0);
            addToast("当前倍速：" + 1.0);
            localUtil.setSValue("speed_step_key", null);
            return;
        }

    }

    // 消息提示
    function addToast(msgText) {
        // 消息提示（右下）
        if(getSwitchValueById("speed_switch_toggle3")){
            showtoastMessage(msgText);
        }
        // 消息提示（左上）
        if(getSwitchValueById("speed_switch_toggle4")){
            showVideoMessage(msgText);
        }
        // showtoast1Message( msgText);
        // showNotification("当前倍速：" + msgText);
    }

    /**
     * 在页面右下角显示
     * @param msgText
     */
    function showtoastMessage(msgText){
        GM_addStyle(GM_getResourceText("css2"));
        Toastify({
            text: msgText,
            duration: 1500,
            newWindow: false,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    }

    function showtoast1Message(msgText){
        GM_addStyle(GM_getResourceText("css1"));
        $.Toast("当前倍速：", msgText, "success", {
            //stack: true,
            has_icon: true,
            has_close_btn: true,
            fullscreen: false,
            timeout: 600,
            sticky: false,
            has_progress: true,
            rtl: false,
        });
    }

    /**
     * 在视频左上角显示
     * @param msgText
     */
    function showVideoMessage(msgText) {
        var messageElement = document.createElement('div');
        messageElement.style.position = 'absolute';
        messageElement.style.top = '10px';
        messageElement.style.left = '10px';
        messageElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        messageElement.style.color = 'white';
        messageElement.style.padding = '10px';
        messageElement.style.fontFamily = 'Arial, sans-serif';
        messageElement.style.fontSize = '16px';
        messageElement.innerText = msgText;

        findNodeWithSelector('video', nodei => {
            if (nodei) {
                nodei.parentNode.appendChild(messageElement);
            }
        });

        var hideMessage = function() {
            messageElement.style.display = 'none';
        };

        var showMessage = function() {
            messageElement.style.display = 'block';
            setTimeout(hideMessage, 1000); // 一秒后隐藏消息
        };

        showMessage(); // 显示消息框
    }

    // function showMessage(message) {
    //     // 创建消息提示元素
    //     var messageElement = document.createElement('div');
    //     messageElement.classList.add('message');
    //     messageElement.innerText = message;
    //
    //     // 添加CSS样式
    //     messageElement.style.position = 'fixed';
    //     messageElement.style.bottom = '20px';
    //     messageElement.style.right = '20px';
    //     messageElement.style.padding = '10px';
    //     messageElement.style.backgroundColor = '#333';
    //     messageElement.style.color = '#fff';
    //     messageElement.style.borderRadius = '5px';
    //     messageElement.style.opacity = '0.9';
    //     messageElement.style.transition = 'opacity 0.5s ease';
    //
    //     // 将消息提示元素添加到页面右下角
    //     document.body.appendChild(messageElement);
    //
    //     // 一秒后自动消失
    //     setTimeout(function() {
    //         messageElement.remove();
    //     }, 1000);
    // }
    //
    // // 使用方法
    // showMessage('这是一条消息提示');

    function showNotification(message) {
        const toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        toast.fire({
            icon: 'info',
            title: message
        });
    }

    /**
     * 数值转换为分钟
     * @param value
     * @returns {string}
     */
    function convertToMinutes(value) {
        const minutes = Math.floor(value / 60);
        const seconds = value % 60;
        const paddedMinutes = minutes.toString().padStart(2, "0");
        const paddedSeconds = seconds.toString().padStart(2, "0");
        return `${paddedMinutes}:${paddedSeconds}`;
    }

    /**
     * 初始化跳过片头片尾
     */
    function initStartEnd() {
        window.setInterval(function() {toSendCurrentTime();}, 3000);
    }

    var stopFlag = true;
    /**
     * 执行引擎
     */
    function initRun(){

        // 自动播放
        if(getSwitchValueById("speed_switch_toggle2")){
            if (stopFlag) {
                document.querySelector('video').play();
                stopFlag = false;
            }
        }

        var step = document.getElementById("rangeId").value;
        log.info("倍速播放方法启动,当前倍率为....." + step);
        var speed_step_key = localUtil.getSValue("speed_step_key");
        if ((step == null || step == '') && speed_step_key == null) {
            changeSpeend(1);
            return;
        }
        if ((step == null || step == '') && speed_step_key != null) {
            changeSpeend(speed_step_key);
            return;
        }
        if ((step != null && step != '' && step != speed_step_key) || (step == speed_step_key)) {
            changeSpeend(step);
            return;
        }
    }

    /**
     * 更改倍速
     * @param speed
     */
    function changeSpeend(speed) {

        document.getElementById("rangeId").value = speed;

        findNodeWithSelector('video', nodei => {
            if (nodei) {
                nodei.playbackRate = speed;
            }
        });

        // findNodeWithSelector('video', function (nodei) {
        //     if (nodei) {
        //         nodei.playbackRate = speed;
        //     }
        // });

        localUtil.setSValue("speed_step_key", speed);

    }

    /**
     * 通用查找节点方法
     * @param selector
     * @param callback
     */
    function findNodeWithSelector(selector, callback) {

        // 遍历页面中的所有节点并执行回调
        let selectorAllElement = document.querySelectorAll(selector);
        if (selectorAllElement.length > 0) {
            selectorAllElement.forEach(node => {
                callback(node);
            });
        }

        // 遍历页面中的所有 <iframe> 节点
        let iframeElement = document.querySelectorAll("iframe");
        if (iframeElement.length > 0) {
            iframeElement.forEach(iframe => {
                // 确保 <iframe> 加载完成后再访问其内容
                iframe.addEventListener("load", () => {
                    try {
                        // 获取 <iframe> 的文档对象
                        let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

                        // 在 <iframe> 的文档中查找节点并执行回调
                        let iframeDocElement = iframeDoc.querySelectorAll(selector);
                        if (iframeDocElement.length > 0) {
                            iframeDocElement.forEach(iframeNode => {
                                callback(iframeNode);
                            });
                        }
                    } catch (error) {
                        log.error("Error iframeElement content:", error);
                    }
                });
            });
        }

        // 获取页面中所有的 ShadowRoot 节点
        // document.querySelectorAll("shadow-root").forEach((shadowRoot) => {
        //     // 检查 ShadowRoot 是否已开启，若未开启则打开
        //     if (shadowRoot.mode === 'closed') {
        //         shadowRoot.mode = 'open'; // 异步操作
        //     }
        //
        //     // 在 ShadowRoot 中查找指定的节点
        //     const targetNode = shadowRoot.querySelector(selector);
        //
        //     // 如果找到了目标节点，则调用回调函数
        //     if (targetNode) {
        //         callback(targetNode);
        //     }
        // });

    }

    // 创建一个函数来覆盖对象的指定属性的setter方法
    function overrideSetter(object, property, desiredValue) {
        // 保存原始的setter方法
        var originalSetter = Object.getOwnPropertyDescriptor(object, property).set;

        // 覆盖setter方法
        Object.defineProperty(object, property, {
            set: function(value) {
                originalSetter.call(this, value);
            }
        });
    }

    function controlVideoProperty(propertyName, desiredValue) {

        findNodeWithSelector('video', nodei => {
            if (nodei) {
                // 使用overrideSetter函数来覆盖HTMLMediaElement.prototype的指定属性的setter方法
                overrideSetter(HTMLMediaElement.prototype, propertyName, desiredValue);

                // 创建一个MutationObserver实例来监听指定属性的变化
                var observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if (mutation.type == 'attributes' && mutation.attributeName == propertyName && nodei[propertyName] != desiredValue) {
                            nodei[propertyName] = desiredValue;  // 更改属性的值
                        }
                    });
                });

                // 配置观察器
                var config = { attributes: true };

                // 开始观察
                observer.observe(nodei, config);
            }
        });

    }

    /**
     * 初始化菜单
     */
    function mokInitMenu(){

        GM_registerMenuCommand('功能简介：', scriptInfor);
        GM_registerMenuCommand('脚本设置：', scriptSetup);
        // GM_registerMenuCommand('神秘区域：', scriptPlay);

    }

    /* 功能简介 */
    function scriptInfor(){
        Swal.fire({
            title: " - - ☞ ☛ 视频倍速播放 ☚ ☜ - - ",
            html:`
                <div>
                
                    <div style='padding: 20px;text-align: left'>
                        <div>脚本使用方式</div>
                        <br>
                        <div>
                            <div>方式一：</div>
                            <div style="text-indent: 2em;" >①调节右上角加速框右侧上下按钮即可调节倍率</div>
                            <div style="text-indent: 2em;" >②在右上角的加速框内输入加速倍率,如2、4、8、16等</div>
                        </div>
                        <br>
                        <div>
                            <div>方式二：</div>
                            <div style="text-indent: 2em;" >默认快捷键：‘x’, ‘c’, ‘z’</div>
                            <div style="text-indent: 2em;" >x: 加速 0.1</div>
                            <div style="text-indent: 2em;" >c: 减速 0.1</div>
                            <div style="text-indent: 2em;" >z: 复位 1.0</div>
                        </div>                         
                    </div>
                    
                    <div style='padding: 20px;text-align: left'>
                        <div>模式简介：</div>
                        <div>
                            <div style="text-indent: 2em;" >三分钟真男人模式：</div>
                            <div style="text-indent: 2em;" >为了响应国家节能减排，保护地球家园国策，脚本做了浅度检测（理论上够用了）</div>
                            <div style="text-indent: 2em;" >但是有一些比较特别的情况，脚本无法检测到视频，实现不了调整倍速的目的</div>
                            <div style="text-indent: 2em;" >所以做了三分钟真男人模式，持续深入检测三分钟，增强脚本可用性</div>
                        </div>
                     </div>
                     <br>

                     <span style="filter:grayscale(100%);">- 您身边的学习追剧好帮手 -</span>
                     
                </div>
            `,
            showConfirmButton: false,
            showCloseButton: true,
            background: false,
            heightAuto: true,
            width: 'auto',
            height: 'auto',
            didOpen: () => {
            }
        });
    }

    // 脚本设置
    function scriptSetup(){
        Swal.fire({
            title: " - - ☞ ☛ 脚本设置 ☚ ☜ - - ",
            html:`
                    <div>
                        <div>
                            <table style="text-align: left;" id="switch_table">
                                <tr>
                                    <td>倍速输入框：</td>
                                    <td>
                                        <label class="toggle-container">
                                            <input type="checkbox" class="toggle-input" id="speed_switch_toggle1">
                                            <span class="toggle-label"></span>
                                        </label>
                                    </td>
                                    <td>自动播放：</td>
                                    <td>
                                        <label class="toggle-container">
                                            <input type="checkbox" class="toggle-input" id="speed_switch_toggle2">
                                            <span class="toggle-label"></span>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>消息提示（右下）：</td>
                                    <td>
                                        <label class="toggle-container">
                                            <input type="checkbox" class="toggle-input" id="speed_switch_toggle3">
                                            <span class="toggle-label"></span>
                                        </label>
                                    </td>
                                    <td>消息提示（左上）：</td>
                                    <td>
                                        <label class="toggle-container">
                                            <input type="checkbox" class="toggle-input" id="speed_switch_toggle4">
                                            <span class="toggle-label"></span>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>三分钟真男人模式：</td>
                                    <td>
                                        <label class="toggle-container">
                                            <input type="checkbox" class="toggle-input" id="speed_switch_toggle5">
                                            <span class="toggle-label"></span>
                                        </label>
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                        <br>
                        <div>
                            <div>
                                <div class="slider-container">
                                    <span>跳过片头</span>&nbsp;&nbsp;
                                    <span class="progressStr" id="sliderValue1">00:00</span>&nbsp;&nbsp;
                                    <input type="range" id="speed_slider_start" min="0" max="360" step="1" value="0"/>
                                </div>
                            </div>
                            <div>
                                <div class="slider-container">
                                    <span>跳过片尾</span>&nbsp;&nbsp;
                                    <span class="progressStr" id="sliderValue2">00:00</span> &nbsp;&nbsp;
                                    <input type="range" id="speed_slider_end" min="0" max="360" step="1" value="0"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    `,
            showConfirmButton: false,
            showCloseButton: true,
            background: false,
            heightAuto: true,
            width: 'auto',
            height: 'auto',
            didOpen: () => {

                //====================================配置开关监听start==============================================
                // 保存开关状态的配置
                var switchConfig = {};
                // 获取开关元素
                var switches = document.querySelectorAll('.toggle-container input');

                // 遍历开关元素，添加事件监听器
                switches.forEach(function(switchElement) {
                    switchElement.addEventListener('change', function(event) {
                        var switchId = event.target.id;
                        var switchState = event.target.checked;
                        // 将开关状态保存到配置中
                        switchConfig[switchId] = switchState;
                        // 将配置保存到本地存储
                        localUtil.setGValue('switchConfig', JSON.stringify(switchConfig));
                        gloubleChang(switchId, switchState);
                    });
                });

                // 加载配置并设置开关状态
                function loadSwitchConfig() {
                    var savedConfig = localUtil.getGValue('switchConfig');
                    if (savedConfig) {
                        switchConfig = JSON.parse(savedConfig);
                        Object.keys(switchConfig).forEach(function(switchId) {
                            var switchElement = document.getElementById(switchId);
                            if (switchElement) {
                                switchElement.checked = switchConfig[switchId];
                            }
                        });
                    }
                }

                loadSwitchConfig();

                //====================================配置开关监听end================================================


                //====================================调整跳过片头尾start==============================================
                // 选择要修改宽度的 input 元素
                let rangeInput = $('input[type="range"]');
                // 设置宽度为 260px
                rangeInput.css('width', '260px');

                const sliders = document.querySelectorAll(".slider-container");

                sliders.forEach(function(sliderContainer) {
                    const slider = sliderContainer.querySelector("input[type='range']");
                    const sliderValue = sliderContainer.querySelector("span.progressStr");

                    // 从 localUtil 中读取滑块的值，如果存在则更新滑块和滑块值
                    const storedData = localUtil.getSValue(slider.id);
                    if (storedData) {
                        const {value,textContent} = JSON.parse(storedData);
                        slider.value = value;
                        sliderValue.textContent = textContent;
                    }

                    // 添加一个 "input" 事件监听器来更新滑块值并将其存储到 localUtil 中
                    slider.addEventListener("input", function() {
                        const value = this.value;
                        const textContent = convertToMinutes(value);
                        sliderValue.textContent = textContent;
                        const data = {value,textContent};

                        localUtil.setSValue(this.id, JSON.stringify(data));
                        toSendCurrentTime();
                    });
                });
                //====================================调整跳过片头尾end================================================

            }
        });
    }

    // 根据 ID 查询开关状态值
    function getSwitchValueById(switchId) {
        var savedConfig = localUtil.getGValue('switchConfig');
        if (savedConfig) {
            var switchConfig = JSON.parse(savedConfig);
            return switchConfig[switchId];
        }
        return null;
    }

    // 全局开关调整
    function gloubleChang(switchId, switchState) {

        log.info(`gloubleChang switchId is :${switchId} , switchState is :${switchState}`);
        if (switchId == null || switchId == undefined){return}
        if (switchState == null || switchState == undefined){return}

        // 倍速输入框
        if (switchId == "speed_switch_toggle1") {
            if(switchState){
                $('#rangeId').css("opacity", "0.7");
            }else{
                $('#rangeId').css("opacity", "0");
            }
        }

        // 三分钟真男人模式
        if (switchId == "speed_switch_toggle5") {
            if(switchState){
                localUtil.setGValue("speed_three_male",3*60*1000);
            }else{
                localUtil.setGValue("speed_three_male",30*1000);
            }
        }

    }

    // 神秘区域
    function scriptPlay(){
        Swal.fire({
            title: "神秘区域",
            html:`
                <div>
                     <div style='background-color: #f5f5f5; padding: 20px; border-radius: 10px;'>
                          神秘区域的神秘内容
                     </div>
                </div>
            `,
            showConfirmButton: false,
            showCloseButton: true,
            background: false,
            heightAuto: true,
            width: 'auto',
            height: 'auto',
            didOpen: () => {
            }
        });
    }

    /**
     * 运行至当前时间
     * @param speed_skip_start
     * @param speed_skip_end
     */
    function toRunCurrentTime(speed_skip_start,speed_skip_end){

        findNodeWithSelector('video', video => {
            if (video) {
                // 如果视频的长度大于跳过的开始和结束时间
                if (video.duration > parseInt(speed_skip_start) + parseInt(speed_skip_end)) {

                    // 已经过了片头，则不进行跳过
                    if (video.currentTime > parseInt(speed_skip_start)) {
                        return;
                    }
                    // 跳过视频的开始
                    video.currentTime = speed_skip_start;

                    // 当视频时间更新时
                    video.ontimeupdate = function () {
                        // 如果视频在跳过结束时间内
                        if (video.duration - video.currentTime <= speed_skip_end) {
                            // 跳转到视频末尾
                            video.currentTime = video.duration;
                        }
                    };
                }
            }
        });

    }

    /**
     * 运行至当前时间
     * @param speed_skip_start
     * @param speed_skip_end
     */
    function toSendCurrentTime(){

        let speed_skip_start = 0;
        let speed_skip_end = 0;

        var storedData1 = localUtil.getSValue("speed_slider_start");
        if (storedData1) {
            speed_skip_start = JSON.parse(storedData1).value;
        }

        var storedData2 = localUtil.getSValue("speed_slider_end");
        if (storedData2) {
            speed_skip_end = JSON.parse(storedData2).value;
        }

        if (speed_skip_start >= 0 || speed_skip_end >= 0) {
            toRunCurrentTime(speed_skip_start,speed_skip_end);
        }
    }

    // 日志打印封装
    var log = {
        log: function (msg) {
            if (localStorage.getItem("speed_debug") == "true") {console.log(msg);}
        },
        info: function (msg) {
            if (localStorage.getItem("speed_debug") == "true") {console.info(msg);}
        },
        warn: function (msg) {
            if (localStorage.getItem("speed_debug") == "true") {console.warn(msg);}
        },
        error: function (msg) {
            if (localStorage.getItem("speed_debug") == "true") {console.error(msg);}
        }
    };

    // 本地存储封装
    var localUtil = {
        getSValue(name) {
            return window.localStorage.getItem(name);
        },
        setSValue(name, value) {
            window.localStorage.setItem(name, value);
        },
        getGValue(name) {
            return window.GM_getValue(name);
        },
        setGValue(name, value) {
            window.GM_setValue(name, value);
        }
    }

    // 默认开关设置
    function initConfig(){

        let gloubConfig = {
            "speed_switch_toggle1": true,
            "speed_switch_toggle3": true,
            "speed_switch_toggle4": true,
            "speed_switch_toggle2": true
        };

        let switchConfig = localUtil.getGValue('switchConfig');
        if (switchConfig == null || switchConfig == undefined) {
            localUtil.setGValue('switchConfig', JSON.stringify(gloubConfig));
        }

    }
    var main = {
        before() {
            addStyle();
            mokInitMenu();
            initConfig();
        },
        init() {
            addDocument();
            initStartEnd();
        },
        run() {
            initRun();
        }
    }

    window.onload = function() {

        localStorage.setItem("speed_debug", "false");
        main.before();

        var speed_three_male = localUtil.getGValue("speed_three_male")||30 * 1000;
        var startStamp = new Date().getTime();
        window.initTimer = setInterval(() => {
            var videos = document.querySelectorAll("video");
            var nowStamp = new Date().getTime();
            if (videos.length > 0) {
                clearInterval(initTimer);
                main.init();
                window.setInterval(function() {main.run();}, 1000);
            } else if ((nowStamp - startStamp) >= speed_three_male) {
                clearInterval(initTimer);
                log.error('search video is long to stop...');
            } else {
                log.error('search video waiting...');
            }
        }, 1000);

    }
})();