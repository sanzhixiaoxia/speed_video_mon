// 本地存储封装
const localUtil = {
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
    },
};

// 判断是否在 iframe 中
function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return false;
    }
}

// 在父窗口中监听 message 事件
window.addEventListener('message', function (event) {
    const data = event.data;
    console.log(data);
});

// 封装消息发送方法
function sendMessageToParent(data) {
    data = JSON.stringify(data);
    if (isInIframe()) {
        window.parent.postMessage(data, '*');
    } else {
        localUtil.setSValue(data);
    }
}

const data = { 'key': 'value' };

sendMessageToParent(data);


function saveJSONToLocalStorage(json) {
    // 检查浏览器是否支持localStorage
    if (typeof(Storage) === "undefined") {
        console.log("浏览器不支持localStorage");
        return;
    }

    // 将JSON对象转换为键值对
    const entries = Object.entries(json);

    // 将键值对保存到localStorage中
    entries.forEach(([key, value]) => {
        localStorage.setItem(key, value);
    });

    console.log("数据保存成功");
}

// 调用示例
const json = { 'key123': '12312312', 'key456': '45645678' };
saveJSONToLocalStorage(json);
