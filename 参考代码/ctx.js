!function () {
    "use strict";

    function t(e) {
        return t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }, t(e)
    }

    function e(e, a, i) {
        return (a = function (e) {
            var a = function (e, a) {
                if ("object" !== t(e) || null === e) return e;
                var i = e[Symbol.toPrimitive];
                if (void 0 !== i) {
                    var o = i.call(e, "string");
                    if ("object" !== t(o)) return o;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                return String(e)
            }(e);
            return "symbol" === t(a) ? a : String(a)
        }(a)) in e ? Object.defineProperty(e, a, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[a] = i, e
    }

    const a = {
        dispatchEvent: EventTarget.prototype.dispatchEvent,
        stopImmediatePropagation: Event.prototype.stopImmediatePropagation,
        appendChild: Node.prototype.appendChild,
        map: {clear: Map.prototype.clear, set: Map.prototype.set, has: Map.prototype.has, get: Map.prototype.get},
        array: {push: Array.prototype.push, includes: Array.prototype.includes},
        Map: Map,
        ShadowRoot: ShadowRoot,
        HTMLMediaElement: HTMLMediaElement,
        CustomEvent: CustomEvent,
        JSON: {parse: JSON.parse, stringify: JSON.stringify}
    };
    let i;
    var o;
    null === (o = document.currentScript) || void 0 === o || o.remove();
    let n, r, c, l, s, p = [], u = [];

    function d(t, e, a) {
        const i = null == t ? void 0 : t.prototype[e];
        if (i) {
            t.prototype[e] = function () {
                for (var t = arguments.length, e = new Array(t), o = 0; o < t; o++) e[o] = arguments[o];
                const n = i.apply(this, e);
                return a(e, this, n), n
            };
            try {
                c.set(t.prototype[e], i)
            } catch (t) {
            }
        }
    }

    function h(t, e, i) {
        e instanceof a.HTMLMediaElement && (a.array.includes.call(p, e) || (a.array.push.call(p, e), n.wiggleOn(e)))
    }

    function y(t, e, i) {
        i instanceof a.ShadowRoot && (a.array.includes.call(u, i) || (a.array.push.call(u, i), n.wiggleOn(i)))
    }

    class m {
        constructor() {
            if (e(this, "originalFn", Function.prototype.toString), e(this, "outputMap", new Map), e(this, "set", ((t, e) => {
                try {
                    const i = this.originalFn.call(e);
                    i && a.map.set.call(this.outputMap, t, i)
                } catch (t) {
                }
            })), location.hostname.includes("twitch")) return;
            let t = this;
            Function.prototype.toString = function () {
                try {
                    const e = a.map.get.call(t.outputMap, this);
                    if (e) return e
                } catch (t) {
                }
                for (var e = arguments.length, i = new Array(e), o = 0; o < e; o++) i[o] = arguments[o];
                return t.originalFn.apply(this, i)
            }, this.set(Function.prototype.toString, this.originalFn)
        }
    }

    class f {
        constructor() {
            e(this, "active", !1), e(this, "tempTimeout", void 0), e(this, "dummyAudio", new Audio), e(this, "ogDesc", {
                playbackRate: Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, "playbackRate"),
                defaultPlaybackRate: Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, "defaultPlaybackRate")
            }), e(this, "coherence", {
                playbackRate: new Map,
                defaultPlaybackRate: new Map
            }), e(this, "activate", (() => {
                this.tempTimeout && (clearTimeout(this.tempTimeout), delete this.tempTimeout), this.active || (this.active = !0, a.map.clear.call(this.coherence.playbackRate), a.map.clear.call(this.coherence.defaultPlaybackRate), p.forEach((t => {
                    a.map.set.call(this.coherence.playbackRate, t, this.ogDesc.playbackRate.get.call(t)), a.map.set.call(this.coherence.defaultPlaybackRate, t, this.ogDesc.defaultPlaybackRate.get.call(t))
                })))
            })), e(this, "deactivate", (() => {
                this.tempTimeout && (clearTimeout(this.tempTimeout), delete this.tempTimeout), this.active && (this.active = !1)
            })), e(this, "activateFor", (t => {
                this.active || (this.activate(), this.tempTimeout = setTimeout(this.deactivate, t))
            }));
            for (let t of ["playbackRate", "defaultPlaybackRate"]) {
                const e = this.ogDesc[t];
                let i = this.coherence[t], o = this;
                try {
                    Object.defineProperty(HTMLMediaElement.prototype, t, {
                        configurable: !0,
                        enumerable: !0,
                        get: function () {
                            return o.ogDesc[t].get.call(this), o.active ? a.map.has.call(i, this) ? a.map.get.call(i, this) : 1 : e.get.call(this)
                        },
                        set: function (n) {
                            !o.active || this instanceof a.HTMLMediaElement || o.ogDesc[t].set.call(this, n);
                            try {
                                let t = e.set.call(o.active ? o.dummyAudio : this, n),
                                    r = e.get.call(o.active ? o.dummyAudio : this);
                                return a.map.set.call(i, this, r), t
                            } catch (t) {
                                throw t
                            }
                        }
                    });
                    const n = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, t);
                    c.set(n.get, e.get), c.set(n.set, e.set)
                } catch (t) {
                }
            }
        }
    }

    class g {
        constructor() {
            e(this, "parasite", document.createElement("div")), e(this, "parasiteRoot", this.parasite.attachShadow({mode: "open"})), e(this, "handle", (t => {
                let e;
                a.stopImmediatePropagation.call(t);
                try {
                    t.detail && (e = a.JSON.parse(t.detail))
                } catch (t) {
                }
                if (e) if ("SEEK_NETFLIX" === e.type) !function (t) {
                    try {
                        (function () {
                            const t = window.netflix.appContext.state.playerApp.getAPI().videoPlayer;
                            return t.getAllPlayerSessionIds().map((e => t.getVideoPlayerBySessionId(e)))
                        })().forEach((e => e.seek(1e3 * t)))
                    } catch (t) {
                    }
                }(e.value); else if ("GHOST" === e.type) e.off ? r.deactivate() : r.activate(); else if ("YT_RATE_CHANGE" === e.type) {
                    var i;
                    e.value && (null === (i = s) || void 0 === i || i(e.value))
                }
            })), e(this, "send", (t => {
                a.dispatchEvent.call(this.parasiteRoot, new a.CustomEvent("GS_SERVER", {
                    detail: a.JSON.stringify({
                        type: "MSG",
                        data: t
                    })
                }))
            })), e(this, "wiggleOn", (t => {
                a.appendChild.call(t, this.parasite), a.dispatchEvent.call(this.parasiteRoot, new a.CustomEvent("GS_SERVER", {detail: a.JSON.stringify({type: "WIGGLE"})}))
            })), this.parasite.id = "GS_PARASITE", this.parasiteRoot.addEventListener("GS_CLIENT", this.handle, {capture: !0}), document.documentElement.appendChild(this.parasite), this.parasite.dispatchEvent(new CustomEvent("GS_INIT"))
        }
    }

    !function () {
        if (i = null !== (t = i) && void 0 !== t ? t : navigator.userAgent.includes("Firefox/"), i) {
            if (window.loadedGsCtx) return;
            window.loadedGsCtx = !0, function () {
                if (!document.domain.includes("soundcloud.com")) return;
                const t = AudioContext.prototype.createMediaElementSource;
                AudioContext.prototype.createMediaElementSource = function () {
                    return t.apply(this, [document.createElement("audio")])
                }
            }()
        }
        var t;
        !function () {
            if (!location.hostname.includes("pan.baidu.com")) return;
            let t = navigator.userAgent;
            t = t.replace("Windows NT", "Windоws NT"), t = t.replace("Macintosh", "Macintоsh"), t = t.replace("Chrome", "Chrоme"), t = t.replace("Firefox", "Firefоx"), t = t.replace("Edg", "Eԁg"), t = t.replace("Safari", "Sаfari");
            const e = Object.getOwnPropertyDescriptor(Navigator.prototype, "userAgent");
            Object.defineProperty(Navigator.prototype, "userAgent", {
                ...e, get: function () {
                    return t
                }
            })
        }(), c = new m, function () {
            if (!document.domain.includes("bilibili.com")) return;
            let t = window.localStorage.getItem;
            window.localStorage.getItem = function () {
                for (var e = arguments.length, a = new Array(e), i = 0; i < e; i++) a[i] = arguments[i];
                let o = t.apply(this, a);
                try {
                    if ("bwphevc_supported" === a[0]) {
                        var n;
                        let t = JSON.parse(o);
                        if (t.supported && (null == t || null === (n = t.info) || void 0 === n || !n.isBrowserHEVCTypeSupported)) return t.supported = !1, JSON.stringify(t)
                    }
                } catch (t) {
                }
                return o
            }, c.set(window.localStorage.getItem, t)
        }(), r = new f, n = new g, "www.youtube.com" === location.hostname && window.addEventListener("timeupdate", (function () {
            var t;
            let e = document.querySelector("#movie_player");
            if (e) {
                try {
                    e.getAvailablePlaybackRates().push(16)
                } catch (t) {
                    return
                }
                s = t => {
                    if (l !== t) {
                        l = t;
                        try {
                            r.activateFor(1e3), e.setPlaybackRate(t)
                        } catch (t) {
                        }
                    }
                }, null === (t = n) || void 0 === t || t.send({type: "YT_REQUEST_RATE"})
            }
        }), {
            capture: !0,
            once: !0
        }), d(HTMLMediaElement, "play", h), d(HTMLMediaElement, "pause", h), d(HTMLMediaElement, "load", h), d(Element, "createShadowRoot", y), d(Element, "attachShadow", y)
    }()
}();