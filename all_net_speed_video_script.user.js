// ==UserScript==
// @name            视频倍速播放(追剧学习神器)
// @name:zh         视频倍速播放(追剧学习神器)
// @name:en         Super speed video all net
// @namespace       https://greasyfork.org/zh-CN/scripts/421170
// @icon            https://img-blog.csdnimg.cn/20181221195058594.gif
// @version         1.7.2
// @description     视频倍速,全网视频倍速播放脚本: ①默认快捷键： x:加速 0.1, c:减速 0.1, z:复位 1.0 ②调节右上角加速框右侧上下按钮即可调节倍率
// @description:zh  视频倍速,全网视频倍速播放脚本: ①默认快捷键： x:加速 0.1, c:减速 0.1, z:复位 1.0 ②调节右上角加速框右侧上下按钮即可调节倍率
// @description:en  Video speed doubling, full network video speed doubling playback script: ① Default shortcut keys: x: Accelerate by 0.1, c: Decelerate by 0.1, z: Reset by 1.0 ② Adjust the up and down buttons on the right side of the acceleration box in the upper right corner to adjust the magnification
// @author          wll
// @require         https://update.greasyfork.org/scripts/481939/1293842/jquery-360minjs.js
// @require         https://update.greasyfork.org/scripts/481940/1293843/sweetalert2-11019allminjs.js
// @require         https://update.greasyfork.org/scripts/447214/1065649/toastscript.js
// @resource        css1 https://cdn.jsdelivr.net/gh/sanzhixiaoxia/statics@main/toast.style.css
// @require         https://update.greasyfork.org/scripts/471299/1222923/toastifyjs.js
// @resource        css2 https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css
// @match           *://*/*
// @exclude         https://www.baidu.com/
// @run-at          document-end
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_addStyle
// @grant           GM_getResourceText
// @grant           GM_registerMenuCommand
// @grant           GM_openInTab
// @license         AGPL-3.0-or-later
// @supportURL      https://gitee.com/leiwang2010/speed_video_mon/issues/new
// @downloadURL     https://update.greasyfork.org/scripts/421170/%E8%A7%86%E9%A2%91%E5%80%8D%E9%80%9F%E6%92%AD%E6%94%BE%28%E8%BF%BD%E5%89%A7%E5%AD%A6%E4%B9%A0%E7%A5%9E%E5%99%A8%29.user.js
// @updateURL       https://update.greasyfork.org/scripts/421170/%E8%A7%86%E9%A2%91%E5%80%8D%E9%80%9F%E6%92%AD%E6%94%BE%28%E8%BF%BD%E5%89%A7%E5%AD%A6%E4%B9%A0%E7%A5%9E%E5%99%A8%29.meta.js

// ==/UserScript==

(function() {
    'use strict';

    const messages = {
        'zh': {
            'scriptInformation': '功能简介：',
            'scriptSettings': '脚本设置：',
            'scriptMysterious': '神秘区域：',
            'speedChanged': '当前倍速：',
            'speedUpdating': '倍速中...',
            'speedVersion': '最新版本 ✈ :'
        },
        'en': {
            'scriptInformation': 'Script Information：',
            'scriptSettings': 'Script settings：',
            'scriptMysterious': 'Mysterious area：',
            'speedChanged': 'Current speed：',
            'speedUpdating': 'Updating speed...',
            'speedVersion': 'new version ✈ :'
        }
    };
    const curLang = navigator.language.slice(0, 2);
    const MSG = messages[curLang] || messages.en;

    /**
     * 本地存储域数组
     * new URL(window.location.href).hostname;
     * @type {string[]}
     */
    let localUrlDataArray = [
        "www.bilibili.com"
       ,"www.iqiyi.com"
       ,"www.douyin.com"
       ,"If-zt.douyin.com"
       ,"www.youtube.com"
       ,"haokan.baidu.com"
       ,"www.youku.com"
       ,"v.youku.com"
       ,"www.iqiyi.com"
       ,"v.qq.com"
       ,"www.le.com"
        ,"127.0.0.1"
    ];

    // 自定义样式
    function addStyle() {
        let customCss=`
            #rangeId{position:fixed;top:15%;left:75%;width:3.3vw;height:1vw;z-index:2147483647!important;text-align:center;background-color:#E3EDCD!important;color:black!important;flex-shrink:0;opacity:0.6;cursor:move;user-select:none;outline: none;border:1px solid;border-radius:9px;display:inline-block;padding:0 6px 0 7px;line-height:16px;font-size:12px;margin-right:4px;transition:background 0.3s,color 0.3s;}#rangeId:hover{opacity:1;}
            .slider-container{display:flex;align-items:center;justify-content:flex-start;}.toggle-container{display:inline-block;position:relative;}.toggle-input{display:none;}.toggle-label{display:block;width:60px;height:30px;background-color:#ddd;border-radius:15px;position:relative;cursor:pointer;transition:background-color 0.3s;}
            .toggle-label:before{content:"";position:absolute;top:2px;left:2px;width:26px;height:26px;background-color:white;border-radius:50%;transition:left 0.3s;}.toggle-input:checked+.toggle-label{background-color:#66bb6a;}.toggle-input:checked+.toggle-label:before {left: calc(100% - 28px);}
            .swal2-popup{font-family:"Arial",sans-serif;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,0.1);background-color:#fff;color:#333;}.swal2-title{font-size:24px;margin-bottom:10px;}
            .swal2-content{font-size:12px;margin-bottom:20px;}.swal2-actions{display:flex;justify-content:center;}.swal2-confirm,.swal2-cancel{font-size:18px;padding:10px 20px;border-radius:5px;background-color:#ffcc00;color:#fff;border:none;cursor:pointer;transition:background-color 0.3s;}.swal2-confirm:hover,.swal2-cancel:hover{background-color:#ffdd33;}
            .swal2-close{font-size:20px;width:30px;height:30px;line-height:30px;padding:0;border-radius:50%;background-color:#fff;color:#000;}.message-content-sweetalert2{text-align:left;max-height:200px;overflow-y:auto;}
            #switch_table{border-collapse:separate;}#switch_table>table{width:100%;border-collapse:collapse;}#switch_table>table>tr{white-space:nowrap;}#switch_table td{padding-right:22px;}#switch_table td:last-child{padding-right:0;}
        `;
        GM_addStyle(customCss);
    }

    function checkInIframe(){
        if (window.self !== window.top) {
            return true;
        }else{
            return false;
        }
    }

    // 本地存储封装
    const localUtil = {
        getSValue(name) {
            return localStorage.getItem(name);
        },
        setSValue(name, value) {
            localStorage.setItem(name, value);
        },
        getGValue(name) {
            return window.GM_getValue(name);
        },
        setGValue(name, value) {
            window.GM_setValue(name, value);
        },
        getAutoValue(name) {
            let hostname = new URL(window.location.href).hostname;
            if (localUrlDataArray.includes(hostname)) {
                return localUtil.getSValue(name);
            } else {
                return localUtil.getGValue(name);
            }
        },
        setAutoValue(name, value) {
            let hostname = new URL(window.location.href).hostname;
            if (localUrlDataArray.includes(hostname)) {
                localUtil.setSValue(name, value);
            } else {
                localUtil.setGValue(name, value);
            }
        }
    };

    // 日志打印封装
    const log = {
        log: function (msg) {
            if (localStorage.getItem("speed_debug") == "true") {console.log(" ---> speed_debug: " + msg);}
        },
        info: function (msg) {
            if (localStorage.getItem("speed_debug") == "true") {console.info(" ---> speed_debug: " + msg);}
        },
        warn: function (msg) {
            if (localStorage.getItem("speed_debug") == "true") {console.warn(" ---> speed_debug: " + msg);}
        },
        error: function (msg) {
            if (localStorage.getItem("speed_debug") == "true") {console.error(" ---> speed_debug: " + msg);}
        }
    };

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

    // 自定义节点
    function addDocument() {

        const rangeId = "rangeId";
        const buttonPositionKey = "buttonPosition";

        const addButton = () => {
            const rangeInput = `<input id="${rangeId}" type="number" step="0.1" min="0.1" max="16" autofocus="autofocus" value="" />`;
            $("body").prepend(rangeInput);
        };

        const addListeners = () => {

            const element = document.getElementById(rangeId);
            const handleChange = () => {
                addToast(MSG.speedChanged + element.value);
            };
            const handleDoubleClick = () => {
                speedFun("1");
            };
            element.addEventListener("change", handleChange);
            element.addEventListener("dblclick", handleDoubleClick);

            const handleMouseDown = (e) => {
                const offsetX = e.clientX - element.offsetLeft;
                const offsetY = e.clientY - element.offsetTop;

                const dragButton = (e) => {
                    let left = e.clientX - offsetX;
                    let top = e.clientY - offsetY;

                    const windowWidth = window.innerWidth;
                    const windowHeight = window.innerHeight;
                    const buttonWidth = element.offsetWidth;
                    const buttonHeight = element.offsetHeight;

                    left = Math.max(15, Math.min(left, windowWidth - buttonWidth - 15));
                    top = Math.max(15, Math.min(top, windowHeight - buttonHeight - 15));

                    element.style.left = left + "px";
                    element.style.top = top + "px";
                };

                document.addEventListener("mousemove", dragButton);

                const handleMouseUp = () => {
                    document.removeEventListener("mousemove", dragButton);
                    saveButtonPosition();
                };

                document.addEventListener("mouseup", handleMouseUp);
            };

            element.addEventListener("mousedown", handleMouseDown);
        };

        const saveButtonPosition = () => {
            const element = document.getElementById(rangeId);
            const position = {
                top: element.offsetTop,
                left: element.offsetLeft,
            };

            try {
                localUtil.setGValue(buttonPositionKey, JSON.stringify(position));
            } catch (error) {
                console.error("保存按钮位置失败: ", error);
            }
        };

        const initializeButtonPosition = () => {
            const element = document.getElementById(rangeId);
            const buttonPosition = localUtil.getGValue(buttonPositionKey);
            if (buttonPosition) {
                const position = JSON.parse(buttonPosition);
                element.style.top = position.top + "px";
                element.style.left = position.left + "px";
            }
        };

        addButton();
        addListeners();
        initializeButtonPosition();
    }

    function handleParentKeyPress(e) {
        const videos = document.querySelectorAll("video").length;

        if (videos > 0) {
            window.parent.postMessage({ type: "keyPress", key: e.key }, "*");
        }
    }

    function isEditableTarget(target) {
        if (!target) {
            return false;
        }
        const tagName = target.tagName ? target.tagName.toUpperCase() : "";
        return target.isContentEditable || tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT";
    }

    function handleKeyPress(e) {
        if (!e || e.isComposing || isEditableTarget(e.target)) {
            return;
        }
        const videos = document.querySelectorAll("video").length;

        if (videos > 0) {
            switch (e.key.toLowerCase()) {
                case "x":
                    speedFun("-");
                    // stopPropa(e);
                    break;
                case "c":
                    speedFun("+");
                    // stopPropa(e);
                    break;
                case "t":
                case "z":
                    speedFun("1");
                    // stopPropa(e);
                    break;
            }

        }
    }

    function stopPropa(e){
        e.preventDefault(); // 取消默认行为
        e.stopPropagation(); // 阻止事件传播
    }

    function speedFun(speed) {

        // 没取到倍速框数据，则从记忆中获取
        let local_step_key = localUtil.getAutoValue("speed_step_key");
        let currentVal = (local_step_key == undefined || local_step_key == "" || local_step_key == null) ? 1 : parseFloat(local_step_key);
        let numVal;

        if (speed === "+") {
            numVal = Math.min(20, currentVal + 0.1);
        } else if (speed === "-") {
            numVal = Math.max(0.1, currentVal - 0.1);
        } else if (speed === "1") {
            numVal = 1.0;
        }

        controlVideoProperty("playbackRate", numVal);

        changeSpeend(numVal);
        addToast(MSG.speedChanged + `${numVal.toFixed(1)}`);
    }

    // 缓存每个视频的反检测状态，避免重复绑定监听器
    const videoRateGuardCache = new WeakMap();

    function getNativePlaybackRateSetter(video) {
        let proto = video;
        while (proto) {
            const descriptor = Object.getOwnPropertyDescriptor(proto, "playbackRate");
            if (descriptor && typeof descriptor.set === "function") {
                return descriptor.set;
            }
            proto = Object.getPrototypeOf(proto);
        }
        return null;
    }

    function unlockPlaybackRateDetect(video) {
        try {
            const ownDescriptor = Object.getOwnPropertyDescriptor(video, "playbackRate");
            if (ownDescriptor && ownDescriptor.configurable) {
                // 一些站点会在实例上覆盖 playbackRate 拦截，这里优先清掉
                delete video.playbackRate;
            }
        } catch (e) {
            log.warn("unlock playbackRate detect error: " + e);
        }
    }

    function forceSetPlaybackRate(video, desiredValue) {
        const targetRate = parseFloat(desiredValue);
        if (!Number.isFinite(targetRate)) {
            return;
        }

        unlockPlaybackRateDetect(video);

        const nativeSetter = getNativePlaybackRateSetter(video);
        try {
            if (nativeSetter) {
                nativeSetter.call(video, targetRate);
            } else {
                video.playbackRate = targetRate;
            }
        } catch (e) {
            try {
                video.playbackRate = targetRate;
            } catch (err) {
                log.error("force set playbackRate failed: " + err);
            }
        }
    }

    function ensurePlaybackRateGuard(video, desiredValue) {
        let guardState = videoRateGuardCache.get(video);
        if (!guardState) {
            guardState = { desiredValue: parseFloat(desiredValue) };

            const onRateChange = () => {
                if (Math.abs(video.playbackRate - guardState.desiredValue) > 0.01) {
                    forceSetPlaybackRate(video, guardState.desiredValue);
                }
            };

            video.addEventListener("ratechange", onRateChange, true);
            guardState.onRateChange = onRateChange;
            videoRateGuardCache.set(video, guardState);
        } else {
            guardState.desiredValue = parseFloat(desiredValue);
        }
    }

    function controlVideoProperty(propertyName, desiredValue) {
        const videos = document.querySelectorAll("video");

        if (videos.length > 0) {
            videos.forEach((video) => {
                if (isVideoValid(video)) {
                    if (propertyName === "playbackRate") {
                        forceSetPlaybackRate(video, desiredValue);
                        ensurePlaybackRateGuard(video, desiredValue);
                    } else {
                        video[propertyName] = desiredValue;
                    }
                }
            });
        }
    }

    // 消息提示
    function addToast(msgText) {

        // 消息提示（左上）
        if(getSwitchValueById("speed_switch_toggle4")){
            showVideoMessage(msgText);
        }

        // 消息提示（右下）
        if(getSwitchValueById("speed_switch_toggle3")){
            let toastMessage = localUtil.getGValue('toastMessage');
            if (toastMessage) {
                switch (toastMessage) {
                    case "tm01":
                        showToastMessage(msgText);
                        break;
                    case "tm02":
                        showToastifyMessage(msgText);
                        break;
                    case "tm03":
                        showSweetMessage(msgText);
                        break;
                    case "tm04":
                        showOldJsMessage(msgText);
                        break;
                    default:
                        showToastMessage(msgText);
                }
            } else {
                showToastMessage(msgText);
            }
        }

    }

    /**
     * 在视频左上角显示
     * @param msgText
     */
    function showVideoMessage(msgText) {
        let messageElement = document.createElement('div');
        messageElement.style.position = 'absolute';
        messageElement.style.top = '10px';
        messageElement.style.left = '10px';
        messageElement.style.padding = '10px';
        messageElement.style.backgroundColor = '#333';
        messageElement.style.color = 'white';
        messageElement.style.borderRadius = '5px';
        messageElement.style.opacity = '0.9';
        messageElement.style.transition = 'opacity 0.5s ease';
        messageElement.style.zIndex = '2147483647';
        messageElement.style.fontSize = '16px';
        messageElement.style.fontFamily = 'Arial, sans-serif';
        messageElement.innerText = msgText;

        try {
            document.querySelector('video').parentNode.appendChild(messageElement);
        }catch (e) {
            document.body.appendChild(messageElement);
        }finally {
            setTimeout(function () {
                messageElement.remove();
            }, 1000);
        }
    }

    /**
     * Toast 消息提示
     * @param msgText
     */
    function showToastMessage(msgText){
        GM_addStyle(GM_getResourceText("css1"));
        $.Toast(MSG.speedChanged, msgText, "success", {
            //stack: true,
            has_icon: true,
            has_close_btn: true,
            fullscreen: false,
            timeout: 1000,
            sticky: false,
            has_progress: true,
            rtl: false,
        });
    }

    /**
     * toastify 消息提示
     * @param msgText
     */
    function showToastifyMessage(msgText){
        GM_addStyle(GM_getResourceText("css2"));
        Toastify({
            text: msgText,
            duration: 1000,
            newWindow: false,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    }

    /**
     * sweetalert2 消息提示
     * @param message
     */
    function showSweetMessage(message) {
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
     * 原生js消息提示
     * @param message
     */
    function showOldJsMessage(message) {
        // 创建消息提示元素
        let messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerText = message;

        // 添加CSS样式
        messageElement.style.position = 'fixed';
        messageElement.style.bottom = '20px';
        messageElement.style.right = '20px';
        messageElement.style.padding = '10px';
        messageElement.style.backgroundColor = '#333';
        messageElement.style.color = '#fff';
        messageElement.style.borderRadius = '5px';
        messageElement.style.opacity = '0.9';
        messageElement.style.transition = 'opacity 0.5s ease';
        messageElement.style.zIndex = '9999';

        // 将消息提示元素添加到页面右下角
        document.body.appendChild(messageElement);

        // 一秒后自动消失
        setTimeout(function() {
            messageElement.remove();
        }, 1000);
    }

    /**
     * 校验节点是否是视频
     * @param nodei
     */
    function isVideoValid(nodei) {
        if (!nodei || nodei.nodeName !== "VIDEO") {
            return false;
        }
        // 兼容各类站点的视频源实现（src/currentSrc/srcObject/source 标签/媒体流）
        const hasSrc = !!(nodei.src || nodei.currentSrc || nodei.srcObject);
        const hasSourceTag = typeof nodei.querySelector === "function" && !!nodei.querySelector("source");
        const hasMediaTrack = !!(nodei.audioTracks || nodei.videoTracks);
        return hasSrc || hasSourceTag || hasMediaTrack || nodei.readyState > 0;
    }

    let stopFlag = true;
    /**
     * 执行引擎
     */
    function initRun(){

        // 跳过片头片尾
        initStartEnd();

        // 自动播放-开关
        let speedSwitchOn = getSwitchValueById("speed_switch_toggle2");

        if (speedSwitchOn && stopFlag) {
            findNodeWithSelector('video', nodei => {if(isVideoValid(nodei)){try{nodei.play();}catch(e){log.error("自动播放失败：" + e)}}});
            stopFlag = false;
        }
        if (!speedSwitchOn && !stopFlag) {
            findNodeWithSelector('video', nodei => {if(isVideoValid(nodei)) {try{nodei.pause();}catch(e){log.error("停止播放失败：" + e)}}});
            stopFlag = true;
        }

        let control_step_key = $("#rangeId").val();
        let local_step_key = localUtil.getAutoValue("speed_step_key");

        if (control_step_key == null || control_step_key == ''|| control_step_key == undefined) {
            if (local_step_key == null) {
                changeSpeend(1);
            } else {
                changeSpeend(local_step_key);
            }
        } else {
            if (control_step_key !== local_step_key) {
                changeSpeend(control_step_key);
            }
        }

        log.info("倍速播放方法启动，当前倍率为：" + control_step_key);

    }

    /**
     * 更改倍速
     * @param speed
     */
    function changeSpeend(speed) {
        speed = parseFloat(speed).toFixed(1);

        try {
            $("#rangeId").val(speed);
        }catch (e) {
            log.error("write back is error :"+e)
        }

        findNodeWithSelector('video', nodei => {
            if (isVideoValid(nodei)) {
                forceSetPlaybackRate(nodei, speed);
                ensurePlaybackRateGuard(nodei, speed);
                nodei.focus(); // 聚焦到视频元素
                nodei.preload = 'auto';// 设置preload属性为"auto"
            }
        });

        localUtil.setAutoValue("speed_step_key", speed);
    }

    /**
     * 通用查找节点方法
     * @param selector
     * @param callback
     */
    const iframeLoadListenerBound = new WeakSet();

    function findNodeWithSelector(selector, callback) {

        function handleIframeContent(iframe) {
            try {
                let iframeDoc = "";
                try {
                    iframeDoc = iframe.contentWindow.document;
                } catch (error) {
                    iframeDoc = iframe.contentDocument;
                }

                try {
                    if (iframeDoc) {
                        iframeDoc.focus();
                    }
                } catch (error) {
                    log.error("聚焦失败：" + error);
                }

                if (iframeDoc && iframeDoc.querySelectorAll) {
                    const iframeDocElement = iframeDoc.querySelectorAll(selector);
                    if (iframeDocElement.length > 0) {
                        iframeDocElement.forEach(iframeNode => {
                            callback(iframeNode);
                        });
                    }
                }
            } catch (error) {
                log.error("Error iframeElement content:", error);
            }
        }

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
                // 先尝试直接处理已加载 iframe
                handleIframeContent(iframe);
                // 每个 iframe 仅绑定一次 load 监听，避免定时任务重复叠加
                if (!iframeLoadListenerBound.has(iframe)) {
                    iframe.addEventListener("load", () => {
                        handleIframeContent(iframe);
                    });
                    iframeLoadListenerBound.add(iframe);
                }
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

    /**
     * 初始化菜单
     */
    function mokInitMenu(){

        GM_registerMenuCommand(MSG.scriptInformation, scriptInfor);
        GM_registerMenuCommand(MSG.scriptSettings, scriptSetup);
        GM_registerMenuCommand(MSG.scriptMysterious, scriptPlay);

        GM_registerMenuCommand(MSG.speedVersion, function () {window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/421170', {active: true,insert: true,setParent: true});});

    }

    /* 功能简介 */
    function scriptInfor(){
        Swal.fire({
            title: " - - ☞ ☛ 视频倍速播放 ☚ ☜ - - ",
            html:`
                <div>

                    <div style='padding: 20px;text-align: left'>
                        <div>功能简介：</div>
                        <div>
                            <div style="text-indent: 2em;" >方式一：</div>
                            <div style="text-indent: 4em;" >①调节右上角加速框右侧上下按钮即可调节倍率</div>
                            <div style="text-indent: 4em;" >②在右上角的加速框内输入加速倍率,如2、4、8、16等</div>
                        </div>
                        <div>
                            <div style="text-indent: 2em;" >方式二：</div>
                            <div style="text-indent: 4em;" >默认快捷键： x:加速 0.1, c:减速 0.1, z:复位 1.0</div>
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
                    
                    <div style='padding: 20px;text-align: left'>
                        <div>手动更新：</div>
                        <div>
                            <div style="text-indent: 2em;" >&nbsp;&nbsp;</div>
                            <div style="text-indent: 2em;" >
                                <a target="_blank" href="https://update.greasyfork.org/scripts/421170/%E8%A7%86%E9%A2%91%E5%80%8D%E9%80%9F%E6%92%AD%E6%94%BE%28%E8%BF%BD%E5%89%A7%E5%AD%A6%E4%B9%A0%E7%A5%9E%E5%99%A8%29.user.js">
                                    <img src="https://img.shields.io/badge/Latest%20version-%E5%AE%89%E8%A3%85-brig1htgreen.svg">
                                </a>
                            </div>
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
                                    <td>消息提示（左上）：</td>
                                    <td>
                                        <label class="toggle-container">
                                            <input type="checkbox" class="toggle-input" id="speed_switch_toggle4">
                                            <span class="toggle-label"></span>
                                        </label>
                                    </td>
                                    <td>三分钟真男人模式：</td>
                                    <td>
                                        <label class="toggle-container">
                                            <input type="checkbox" class="toggle-input" id="speed_switch_toggle5">
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
                                     <td>
                                        <input type="radio" name="toastMessage" id="tm01" value="tm01">&nbsp;春
                                        <input type="radio" name="toastMessage" id="tm02" value="tm02">&nbsp;花
                                        <input type="radio" name="toastMessage" id="tm03" value="tm03">&nbsp;秋
                                        <input type="radio" name="toastMessage" id="tm04" value="tm04">&nbsp;月
                                    </td>
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
                        <br>
                        <div>
                            <span style="filter:grayscale(100%);">- - 一直被模仿，从未被超越 - -</span>
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
                let switchConfig = {};
                // 获取开关元素
                let switches = document.querySelectorAll('.toggle-container input');

                // 遍历开关元素，添加事件监听器
                switches.forEach(function(switchElement) {
                    switchElement.addEventListener('change', function(event) {
                        let switchId = event.target.id;
                        let switchState = event.target.checked;
                        // 将开关状态保存到配置中
                        switchConfig[switchId] = switchState;
                        // 将配置保存到本地存储
                        localUtil.setGValue('switchConfig', JSON.stringify(switchConfig));
                        gloubleChang(switchId, switchState);
                    });
                });

                // 加载配置并设置开关状态
                function loadSwitchConfig() {
                    let savedConfig = localUtil.getGValue('switchConfig');
                    if (savedConfig) {
                        switchConfig = JSON.parse(savedConfig);
                        Object.keys(switchConfig).forEach(function(switchId) {
                            let switchElement = document.getElementById(switchId);
                            if (switchElement) {
                                switchElement.checked = switchConfig[switchId];
                            }

                            // 右下角消息提示框
                            if (switchId == "speed_switch_toggle3") {
                                if(switchConfig[switchId]){
                                    $("input[name='toastMessage']").attr({"disabled":false,"readonly":false});
                                }else{
                                    $("input[name='toastMessage']").attr({"disabled":true,"readonly":true});
                                }
                            }
                        });
                    }
                }

                loadSwitchConfig();

                //====================================配置开关监听end================================================

                //====================================消息提示单选start================================================
                // 获取单选按钮组
                let radioGroup = document.getElementsByName("toastMessage");

                // 添加事件监听器
                radioGroup.forEach(function(radio) {
                    let toastMessage = localUtil.getGValue('toastMessage');
                    if (toastMessage) {
                        // 设置默认选中的单选按钮
                        document.getElementById(toastMessage).checked = true;
                    }else {
                        let defaultToastMessage = "tm01";
                        document.getElementById(defaultToastMessage).checked = true;
                        localUtil.setGValue('toastMessage',defaultToastMessage);
                    }
                    radio.addEventListener("change", function() {
                        // 获取选中的值
                        let selectedValue = document.querySelector('input[name="toastMessage"]:checked').value;
                        log.info("选中的值：" + selectedValue);
                        localUtil.setGValue('toastMessage',selectedValue);
                    });
                });

                //====================================消息提示单选end================================================

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
                    const storedData = localUtil.getAutoValue(slider.id);
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

                        localUtil.setAutoValue(this.id, JSON.stringify(data));
                        initStartEnd();
                    });
                });
                //====================================调整跳过片头尾end================================================

            }
        });
    }

    // 根据 ID 查询开关状态值
    function getSwitchValueById(switchId) {
        let savedConfig = localUtil.getGValue('switchConfig');
        if (savedConfig) {
            let switchConfig = JSON.parse(savedConfig);
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
                $('#rangeId').css("opacity", "0.6");
            }else{
                $('#rangeId').css("opacity", "0");
            }
        }

        // 右下角消息提示框
        if (switchId == "speed_switch_toggle3") {
            if(switchState){
                $("input[name='toastMessage']").attr({"disabled":false,"readonly":false});
            }else{
                $("input[name='toastMessage']").attr({"disabled":true,"readonly":true});
            }
        }

        // 三分钟真男人模式
        if (switchId == "speed_switch_toggle5") {
            if(switchState){
                localUtil.setGValue("speed_three_male",30*60*1000);
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
                     <div>
                      <p>感谢您的支持与使用！</p>
                      <p>每天坚持一分钟，腰也不疼了，腿也不酸了，一口气也能上五楼了</p>
                      <div>
						<img style="width: 200px; height: 200px;" src="https://img-blog.csdnimg.cn/20181221195058594.gif">
						<img style="width: 200px; height: 200px;" src="https://img-blog.csdnimg.cn/20181221195058594.gif">
						<img style="width: 200px; height: 200px;" src="https://img-blog.csdnimg.cn/20181221195058594.gif">
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
            }
        });
    }

    /**
     * 运行至当前时间
     * @param speed_skip_start
     * @param speed_skip_end
     */
    function speedSkipMethod(speed_skip_start,speed_skip_end){

        speed_skip_start = parseInt(speed_skip_start);
        speed_skip_end = parseInt(speed_skip_end);

        findNodeWithSelector('video', video => {
            if (isVideoValid(video)) {
                if (parseInt(video.duration) > speed_skip_start + speed_skip_end) {
                    // 跳转到视频末尾
                    if (parseInt(video.duration) - parseInt(video.currentTime) < speed_skip_end) {
                        video.currentTime = parseInt(video.duration);
                    }
                    // 跳过视频的开始
                    if (video.currentTime > speed_skip_start) {return;}
                    video.currentTime = speed_skip_start;
                }
            }
        });

    }

    /**
     * 跳过片头片尾
     * @param speed_skip_start
     * @param speed_skip_end
     */
    function initStartEnd(){

        let storedData1 = localUtil.getAutoValue("speed_slider_start");
        let storedData2 = localUtil.getAutoValue("speed_slider_end");
        let speed_skip_start = storedData1 ? JSON.parse(storedData1).value : 0;
        let speed_skip_end = storedData2 ? JSON.parse(storedData2).value : 0;

        if (speed_skip_start > 0 || speed_skip_end > 0) {
            speedSkipMethod(speed_skip_start,speed_skip_end);
        }
    }

    // 默认开关设置
    function initConfig(){

        let gloubConfig = {
            "speed_switch_toggle1": true,
            "speed_switch_toggle2": true,
            "speed_switch_toggle3": true,
            "speed_switch_toggle4": true,
            "speed_switch_toggle5": true
        };

        let switchConfig = localUtil.getGValue('switchConfig') || JSON.stringify(gloubConfig);
        localUtil.setGValue('switchConfig', switchConfig);

    }

    // ====================================== mobile start==================================================

    const LONG_PRESS_SPEED = 2.0;
    const LONG_PRESS_DELAY_MS = 350;
    const DOUBLE_TAP_DELAY_MS = 300;
    const SWIPE_STEP_PX = 45;
    const PINCH_STEP_PX = 18;
    const mobileGestureBoundVideos = new WeakSet();
    const mobileTouchState = new WeakMap();

    function getCurrentPlaybackRate() {
        return parseFloat(localUtil.getAutoValue("speed_step_key")) || 1.0;
    }

    function getDistance(touchA, touchB) {
        const dx = touchA.clientX - touchB.clientX;
        const dy = touchA.clientY - touchB.clientY;
        return Math.hypot(dx, dy);
    }

    function restoreCurrentSpeed() {
        const currentSpeed = getCurrentPlaybackRate();
        changeSpeend(currentSpeed);
        showVideoMessage(MSG.speedChanged + currentSpeed.toFixed(1));
    }

    function bindMobileGesture(video) {
        if (!video || mobileGestureBoundVideos.has(video)) {
            return;
        }

        const state = {
            longPressTimer: null,
            longPressActive: false,
            startX: 0,
            startY: 0,
            moved: false,
            lastTapTs: 0,
            pinchDistance: 0
        };
        mobileTouchState.set(video, state);

        const clearLongPressTimer = () => {
            if (state.longPressTimer) {
                clearTimeout(state.longPressTimer);
                state.longPressTimer = null;
            }
        };

        const handleTouchStart = (event) => {
            if (event.touches.length === 1) {
                const touch = event.touches[0];
                state.startX = touch.clientX;
                state.startY = touch.clientY;
                state.moved = false;
                clearLongPressTimer();
                state.longPressTimer = setTimeout(() => {
                    state.longPressActive = true;
                    showVideoMessage(MSG.speedUpdating);
                    changeSpeend(LONG_PRESS_SPEED);
                    showVideoMessage(MSG.speedChanged + LONG_PRESS_SPEED.toFixed(1));
                }, LONG_PRESS_DELAY_MS);
            } else if (event.touches.length === 2) {
                clearLongPressTimer();
                state.pinchDistance = getDistance(event.touches[0], event.touches[1]);
            } else {
                clearLongPressTimer();
            }
        };

        const handleTouchMove = (event) => {
            if (event.touches.length === 1) {
                const touch = event.touches[0];
                const deltaX = touch.clientX - state.startX;
                const deltaY = touch.clientY - state.startY;
                if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
                    state.moved = true;
                }

                if (state.longPressActive) {
                    if (deltaX >= SWIPE_STEP_PX) {
                        speedFun("+");
                        state.startX = touch.clientX;
                    } else if (deltaX <= -SWIPE_STEP_PX) {
                        speedFun("-");
                        state.startX = touch.clientX;
                    }
                }
            } else if (event.touches.length === 2) {
                clearLongPressTimer();
                const newDistance = getDistance(event.touches[0], event.touches[1]);
                const pinchDelta = newDistance - state.pinchDistance;
                if (Math.abs(pinchDelta) >= PINCH_STEP_PX) {
                    speedFun(pinchDelta > 0 ? "+" : "-");
                    state.pinchDistance = newDistance;
                }
            } else {
                clearLongPressTimer();
            }
        };

        const handleTouchEnd = (event) => {
            clearLongPressTimer();

            if (state.longPressActive && event.touches.length === 0) {
                state.longPressActive = false;
                restoreCurrentSpeed();
                return;
            }

            if (event.touches.length === 0 && !state.moved) {
                const now = Date.now();
                if ((now - state.lastTapTs) <= DOUBLE_TAP_DELAY_MS) {
                    state.lastTapTs = 0;
                    speedFun("1");
                } else {
                    state.lastTapTs = now;
                }
            }
        };

        video.addEventListener("touchstart", handleTouchStart, { passive: true });
        video.addEventListener("touchmove", handleTouchMove, { passive: true });
        video.addEventListener("touchend", handleTouchEnd, { passive: true });
        video.addEventListener("touchcancel", () => {
            clearLongPressTimer();
            if (state.longPressActive) {
                state.longPressActive = false;
                restoreCurrentSpeed();
            }
        }, { passive: true });

        mobileGestureBoundVideos.add(video);
    }

    /**
     * 初始化长按倍速
     */
    function initTouch(){
        const videos = document.querySelectorAll('video');
        videos.forEach((video) => {
            const playbackRate = getCurrentPlaybackRate();
            video.playbackRate = playbackRate.toFixed(1);
            log.warn(`init touch is mobile to : ${video}`);
            bindMobileGesture(video);
        });
    }

    // ====================================== mobile end===================================================

    window.addEventListener("keydown", handleKeyPress, true);

    if (checkInIframe()) {
        window.addEventListener("keydown", handleParentKeyPress);
    }

    if (!checkInIframe()) {
        window.addEventListener("message", (event) => {
            if (event.data.type === "keyPress") {
                const { key } = event.data;
                handleKeyPress({ key });
            }
        });
    }

    const main = {
        before() {
            addStyle();
            mokInitMenu();
            initConfig();
        },
        init() {
            addDocument();
        },
        run() {
            initRun();
        }
    };

    // 设备判断：pc/移动
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    const setSpeed = (event) => {
        const speed = parseFloat(localUtil.getAutoValue("speed_step_key")) || 1.0;
        forceSetPlaybackRate(event.target, speed);
        ensurePlaybackRateGuard(event.target, speed);
        event.target.focus(); // 聚焦到视频元素
        event.target.preload = 'auto';// 设置preload属性为"auto"
        if (isMobileDevice()) {
            bindMobileGesture(event.target);
        }
    };

    function handleVideoNode(node) {
        if (!node) {
            return;
        }
        if (node.tagName && node.tagName.toLowerCase() === "video") {
            setSpeed({ target: node });
            return;
        }
        if (typeof node.querySelectorAll === "function") {
            const videos = node.querySelectorAll("video");
            if (videos.length > 0) {
                videos.forEach(video => setSpeed({ target: video }));
            }
        }
    }

    function observeDynamicVideos() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach((node) => {
                        handleVideoNode(node);
                    });
                }
            });
        });
        observer.observe(document.documentElement || document.body, { childList: true, subtree: true });
    }

    // 为所有现有和未来的视频元素添加事件监听器
    document.addEventListener('play', (event) => {
        if (event.target.tagName.toLowerCase() === 'video') {
            setSpeed(event);
        }
    }, true);

    // 监听视频加载完成事件
    document.addEventListener('loadeddata', (event) => {
        if (event.target.tagName.toLowerCase() === 'video') {
            setSpeed(event);
        }
    }, true);

    function bootstrap() {

        localStorage.setItem("speed_debug", "false");
        main.before();
        observeDynamicVideos();

        let speed_three_male = localUtil.getGValue("speed_three_male")||30 * 1000;
        let startStamp = new Date().getTime();
        window.initTimer = setInterval(() => {
            let videos = document.querySelectorAll("video");
            let nowStamp = new Date().getTime();
            if (videos.length > 0) {
                clearInterval(initTimer);
                main.init();
                if (isMobileDevice()) {
                    initTouch();
                }
                window.setInterval(function() {main.run();}, 1000);
            } else if ((nowStamp - startStamp) >= speed_three_male) {
                clearInterval(initTimer);
                log.error('search video is long to stop...');
            }else if (isMobileDevice()){
                clearInterval(initTimer);
                initTouch();
                log.error('check device is mobile switch to mobile ...');
            } else {
                log.error('search video is waiting ...');
            }
        }, 1000);

    }

    if (document.readyState === "complete") {
        bootstrap();
    } else {
        window.addEventListener("load", bootstrap, { once: true });
    }
})();
