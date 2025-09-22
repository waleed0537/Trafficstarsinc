let t = null,
    a = !1,
    u = !1,
    y = !1,
    E = new Event("loadGtmGroup"),
    i = new Event("consentReady");
const s = window.location.pathname;
if (s.includes("/cookies") || s.includes("/privacy") || s.includes("/terms")) {
    document.dispatchEvent(i);
    var d = document.getElementById("preload");
    throw d && d.remove(), new Error("Cookie functionality is disabled on privacy and terms pages")
}
window.isPreload = typeof window.isPreload < "u";
const r = {
    ewc: "essential_cookies",
    pc: "performance_cookies",
    tc: "targeting_cookies",
    oc: "other_cookies"
};
var d = document.getElementById("preload");
t = localStorage.getItem("consents");

function m() {
    if (y == !1) setTimeout(m, 800);
    else if (t = localStorage.getItem("consents"), t && (t = JSON.parse(t)), a == !0) {
        if (t !== null) {
            document.querySelector(".cookie-consent").style.display = "none", document.body.classList.remove("consent-lock");
            for (let o in t) t[o] == !0 && r[o] && (window.dataLayer = window.dataLayer || [], window.dataLayer.push({
                event: r[o]
            }));
            u = !0
        }
    } else {
        document.dispatchEvent(i);
        for (let o in r) window.dataLayer = window.dataLayer || [], window.dataLayer.push({
            event: r[o]
        });
        u = !0
    }
}

function p() {
    document.querySelector(".cookie-consent").style.display = "none", document.body.classList.remove("consent-lock"), u == !1 && window.dispatchEvent(E), document.dispatchEvent(i)
}
window.addEventListener("gtmScriptLoaded", () => {
    y = !0
});
window.addEventListener("loadGtmGroup", m, {
    once: !0
});
document.addEventListener("DOMContentLoaded", () => {
    const o = Math.random();
    fetch(`/cookie-consent?t=${o}`).then(e => e.ok ? e.json() : {}).then(e => {
        e.gdpr && e.gdpr == !0 && (a = e.gdpr), window.isPreload == !1 && d.remove()
    }).then(() => {
        m(), t !== null ? document.dispatchEvent(i) : (a == !0 && document.body.classList.add("consent-lock"), document.querySelector(".cookie-consent").style.display = "block")
    }).catch(e => {
        d.remove()
    });
    const l = {
            ewc: document.getElementById("ewcConsent"),
            pc: document.getElementById("pcConsent"),
            tc: document.getElementById("tcConsent"),
            oc: document.getElementById("ocConsent")
        },
        w = document.querySelector(".btn-accept"),
        v = document.querySelector(".btn-confirm"),
        g = document.querySelector(".cc-accept");

    function f(e) {
        let c = {};
        for (let n in e) e[n], c[n] = !0;
        localStorage.setItem("consents", JSON.stringify(c)), p()
    }

    function k(e) {
        let c = {};
        for (let n in e) {
            let h = e[n];
            (n == "ewc" || n == "pc" || h.checked) && (c[n] = !0)
        }
        localStorage.setItem("consents", JSON.stringify(c)), p()
    }
    v.addEventListener("click", function() {
        k(l)
    }), w.addEventListener("click", function() {
        f(l)
    }), g.addEventListener("click", function() {
        f(l)
    })
});