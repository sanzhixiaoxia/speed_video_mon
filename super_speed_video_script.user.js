// ==UserScript==
// @name         视频倍速播放调整脚本
// @namespace    your-namespace
// @version      1.0
// @description  在网页视频中实现倍速播放功能和快捷键控制
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    // 检查网页视频是否有效，是否支持倍速播放
    function checkVideoValidity(video) {
        if (video && video.playbackRate !== undefined) {
            return true;
        }
        return false;
    }

    // 获取网页视频
    function getVideoElement() {
        const videos = document.querySelectorAll('video');
        for (let i = 0; i < videos.length; i++) {
            if (checkVideoValidity(videos[i])) {
                return videos[i];
            }
        }
        return null;
    }

    // 增加快捷键控制
    function addShortcutControls(video) {
        window.addEventListener('keydown', function(e) {
            const key = e.key;
            const playbackRate = video.playbackRate;

            if (key === 'x') {
                // 倍速-0.1
                video.playbackRate = Math.max(playbackRate - 0.1, 0.1);
            } else if (key === 'c') {
                // 倍速+0.1
                video.playbackRate = Math.min(playbackRate + 0.1, 2.0);
            } else if (key === 'z') {
                // 恢复正常播放
                video.playbackRate = 1.0;
            }
        });
    }

    // 在视频的右上角给出当前调整的倍速提示
    function showPlaybackRateIndicator(video) {
        const indicator = document.createElement('div');
        indicator.style.position = 'fixed';
        indicator.style.top = '10px';
        indicator.style.right = '10px';
        indicator.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        indicator.style.color = '#fff';
        indicator.style.padding = '5px 10px';
        indicator.style.borderRadius = '5px';
        indicator.style.zIndex = '9999';

        document.body.appendChild(indicator);

        function updateIndicator() {
            indicator.textContent = `当前倍速: ${video.playbackRate.toFixed(1)}`;
        }

        updateIndicator();

        video.addEventListener('ratechange', updateIndicator);
    }

    // 保存每个网站设置的倍速
    function savePlaybackRate(video) {
        const url = window.location.href;
        const playbackRate = video.playbackRate;
        GM_setValue(url, playbackRate);
    }

    // 获取上次网站设置的倍速
    function getSavedPlaybackRate(video) {
        const url = window.location.href;
        const defaultPlaybackRate = 1.0;
        const savedPlaybackRate = GM_getValue(url, defaultPlaybackRate);
        video.playbackRate = savedPlaybackRate;
    }

    // 保存每个网站设置的倍速
    function savePlaybackRate(video) {
        const url = new URL(window.location.href);
        const hostname = url.hostname.split('.').slice(-2).join('.');
        const playbackRate = video.playbackRate;
        GM_setValue(hostname, playbackRate);
    }

// 获取上次网站设置的倍速
    function getSavedPlaybackRate(video) {
        const url = new URL(window.location.href);
        const hostname = url.hostname.split('.').slice(-2).join('.');
        const defaultPlaybackRate = 1.0;
        const savedPlaybackRate = GM_getValue(hostname, defaultPlaybackRate);
        video.playbackRate = savedPlaybackRate;
    }


    // 获取包含视频的iframe
    function getVideoIframe(video) {
        let parentElement = video.parentElement;
        while (parentElement) {
            if (parentElement.tagName === 'IFRAME') {
                return parentElement;
            }
            parentElement = parentElement.parentElement;
        }
        return null;
    }

    // 兼容iframe下倍速记忆失效问题
    function handleIframeCompatibility(video) {
        const videoIframe = getVideoIframe(video);
        if (videoIframe) {
            videoIframe.addEventListener('beforeunload', function() {
                savePlaybackRate(video);
            });
            window.addEventListener('DOMContentLoaded', function() {
                getSavedPlaybackRate(video);
            });
        }
    }

    // 主逻辑
    function main() {
        const video = getVideoElement();
        if (video) {
            addShortcutControls(video);
            showPlaybackRateIndicator(video);
            handleIframeCompatibility(video);
        }
    }

    main();
})();
