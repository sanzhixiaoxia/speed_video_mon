// ==UserScript==
// @name         控制视频播放速度
// @namespace    your-namespace
// @version      1.0
// @description  控制浏览器视频播放速度，支持快捷键操作和国际化（中文和英文），并记忆当前倍速
// @match        *://*/*
// @run-at       document-end
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function () {
    'use strict';

    function saveHostName(key, val) {
        const { hostname } = new URL(window.location.href);
        let saveKV = window.GM_getValue(hostname) || {}; // 获取已保存的数据，如果不存在则初始化为空对象
        saveKV[key] = val; // 更新对应的键值对
        window.GM_setValue(hostname, saveKV); // 保存更新后的数据
    }


    function getHostName(key) {
        const { hostname } = new URL(window.location.href);
        const saveKV = window.GM_getValue(hostname);
        if (saveKV && saveKV[key]) {
            return saveKV[key];
        } else {
            return null; // 或其他默认返回值
        }
    }


    const speedStep = 0.1;
    let playbackRate = parseFloat(localStorage.getItem('playbackRate')) || 1;
    let videoIsValid = true;

    const createSpeedBar = () => {
        const speedBar = document.createElement('div');
        speedBar.style.position = 'fixed';
        speedBar.style.top = '10px';
        speedBar.style.left = '10px';
        speedBar.style.padding = '5px';
        speedBar.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        speedBar.style.color = '#fff';
        speedBar.style.fontSize = '16px';
        speedBar.style.fontWeight = 'bold';
        speedBar.style.zIndex = '9999';
        speedBar.setAttribute('id', 'speedBar');
        return speedBar;
    };

    const updateSpeedBar = (speedText) => {
        const speedBar = document.getElementById('speedBar');
        if (speedBar) {
            speedBar.innerText = speedText;
        }
    };

    const showSpeedToast = (speedText) => {
        updateSpeedBar(speedText);
        setTimeout(() => {
            updateSpeedBar('');
        }, 2000);
    };

    const changeSpeed = (newSpeed) => {
        const videos = document.querySelectorAll('video');

        videos.forEach((video) => {
            if (video.readyState > 0 && !video.paused) {
                video.playbackRate = newSpeed.toFixed(1);
            } else {
                videoIsValid = false;
            }
        });

        playbackRate = newSpeed;
        localStorage.setItem('playbackRate', newSpeed);
        showSpeedToast(`Current Speed: ${newSpeed.toFixed(1)}`);
    };

    const handleKeyPress = (event) => {
        const { key } = event;

        if (key === 'c') {
            changeSpeed(Math.max(Math.round((playbackRate + speedStep) * 10) / 10, 0.1));
        } else if (key === 'x') {
            changeSpeed(Math.max(Math.round((playbackRate - speedStep) * 10) / 10, 0.1));
        } else if (key === 'z') {
            changeSpeed(1);
        }
    };

    const handleIframeMessage = (event) => {
        if (event.data.type === 'changeSpeed') {
            changeSpeed(event.data.speed);
        }
    };

    document.addEventListener('keydown', handleKeyPress);
    window.addEventListener('message', handleIframeMessage);

    const lang = window.navigator.language.toLowerCase();
    let i18n = {};

    if (lang.includes('zh')) {
        // 中文语言包
        i18n = {
            speedText: '当前速度：',
            invalidVideoText: '视频无效，倍速设置失效',
        };
    } else {
        // 英文语言包
        i18n = {
            speedText: 'Current Speed: ',
            invalidVideoText: 'Invalid Video, Playback Speed Setting Disabled',
        };
    }

    const speedBar = createSpeedBar();
    document.body.appendChild(speedBar);

    updateSpeedBar(`${i18n.speedText}${playbackRate.toFixed(1)}`);

    // 向父级页面发送当前倍速信息
    if (window.self !== window.top) {
        window.parent.postMessage(
            {
                type: 'changeSpeed',
                speed: playbackRate,
            },
            '*'
        );
    }

    setInterval(() => {
        if (!videoIsValid) {
            showSpeedToast(i18n.invalidVideoText);
            videoIsValid = true;
        }
    }, 1000);

    // 监听视频的 loadedmetadata 事件，在刷新页面后重新设置当前倍速
    window.addEventListener('DOMContentLoaded', () => {
        const videos = document.querySelectorAll('video');
        videos.forEach((video) => {
            video.addEventListener('loadedmetadata', () => {
                video.playbackRate = playbackRate.toFixed(1);
            });
        });
    });

    // 监听全屏变化事件，在视频全屏模式下隐藏消息提示栏
    document.addEventListener('fullscreenchange', () => {
        const fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

        if (fullscreenElement) {
            speedBar.style.display = 'none';
        } else {
            speedBar.style.display = 'block';
        }
    });
})();