import {
    c as ri,
    g as ii
} from "./_commonjsHelpers-725317a4.js";
var Un = {
    exports: {}
};
/*!
 * jQuery JavaScript Library v3.6.4
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-03-08T15:28Z
 */
(function(ke) {
    (function(H, ye) {
        ke.exports = H.document ? ye(H, !0) : function(Z) {
            if (!Z.document) throw new Error("jQuery requires a window with a document");
            return ye(Z)
        }
    })(typeof window < "u" ? window : ri, function(H, ye) {
        var Z = [],
            xe = Object.getPrototypeOf,
            ve = Z.slice,
            Ye = Z.flat ? function(e) {
                return Z.flat.call(e)
            } : function(e) {
                return Z.concat.apply([], e)
            },
            Je = Z.push,
            De = Z.indexOf,
            Be = {},
            Ke = Be.toString,
            _ = Be.hasOwnProperty,
            X = _.toString,
            G = X.call(Object),
            L = {},
            T = function(t) {
                return typeof t == "function" && typeof t.nodeType != "number" && typeof t.item != "function"
            },
            $ = function(t) {
                return t != null && t === t.window
            },
            I = H.document,
            je = {
                type: !0,
                src: !0,
                nonce: !0,
                noModule: !0
            };

        function Fe(e, t, n) {
            n = n || I;
            var r, o, a = n.createElement("script");
            if (a.text = e, t)
                for (r in je) o = t[r] || t.getAttribute && t.getAttribute(r), o && a.setAttribute(r, o);
            n.head.appendChild(a).parentNode.removeChild(a)
        }

        function Ee(e) {
            return e == null ? e + "" : typeof e == "object" || typeof e == "function" ? Be[Ke.call(e)] || "object" : typeof e
        }
        var Ze = "3.6.4",
            i = function(e, t) {
                return new i.fn.init(e, t)
            };
        i.fn = i.prototype = {
            jquery: Ze,
            constructor: i,
            length: 0,
            toArray: function() {
                return ve.call(this)
            },
            get: function(e) {
                return e == null ? ve.call(this) : e < 0 ? this[e + this.length] : this[e]
            },
            pushStack: function(e) {
                var t = i.merge(this.constructor(), e);
                return t.prevObject = this, t
            },
            each: function(e) {
                return i.each(this, e)
            },
            map: function(e) {
                return this.pushStack(i.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            slice: function() {
                return this.pushStack(ve.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            even: function() {
                return this.pushStack(i.grep(this, function(e, t) {
                    return (t + 1) % 2
                }))
            },
            odd: function() {
                return this.pushStack(i.grep(this, function(e, t) {
                    return t % 2
                }))
            },
            eq: function(e) {
                var t = this.length,
                    n = +e + (e < 0 ? t : 0);
                return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: Je,
            sort: Z.sort,
            splice: Z.splice
        }, i.extend = i.fn.extend = function() {
            var e, t, n, r, o, a, u = arguments[0] || {},
                c = 1,
                f = arguments.length,
                h = !1;
            for (typeof u == "boolean" && (h = u, u = arguments[c] || {}, c++), typeof u != "object" && !T(u) && (u = {}), c === f && (u = this, c--); c < f; c++)
                if ((e = arguments[c]) != null)
                    for (t in e) r = e[t], !(t === "__proto__" || u === r) && (h && r && (i.isPlainObject(r) || (o = Array.isArray(r))) ? (n = u[t], o && !Array.isArray(n) ? a = [] : !o && !i.isPlainObject(n) ? a = {} : a = n, o = !1, u[t] = i.extend(h, a, r)) : r !== void 0 && (u[t] = r));
            return u
        }, i.extend({
            expando: "jQuery" + (Ze + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(e) {
                throw new Error(e)
            },
            noop: function() {},
            isPlainObject: function(e) {
                var t, n;
                return !e || Ke.call(e) !== "[object Object]" ? !1 : (t = xe(e), t ? (n = _.call(t, "constructor") && t.constructor, typeof n == "function" && X.call(n) === G) : !0)
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e) return !1;
                return !0
            },
            globalEval: function(e, t, n) {
                Fe(e, {
                    nonce: t && t.nonce
                }, n)
            },
            each: function(e, t) {
                var n, r = 0;
                if (et(e))
                    for (n = e.length; r < n && t.call(e[r], r, e[r]) !== !1; r++);
                else
                    for (r in e)
                        if (t.call(e[r], r, e[r]) === !1) break;
                return e
            },
            makeArray: function(e, t) {
                var n = t || [];
                return e != null && (et(Object(e)) ? i.merge(n, typeof e == "string" ? [e] : e) : Je.call(n, e)), n
            },
            inArray: function(e, t, n) {
                return t == null ? -1 : De.call(t, e, n)
            },
            merge: function(e, t) {
                for (var n = +t.length, r = 0, o = e.length; r < n; r++) e[o++] = t[r];
                return e.length = o, e
            },
            grep: function(e, t, n) {
                for (var r, o = [], a = 0, u = e.length, c = !n; a < u; a++) r = !t(e[a], a), r !== c && o.push(e[a]);
                return o
            },
            map: function(e, t, n) {
                var r, o, a = 0,
                    u = [];
                if (et(e))
                    for (r = e.length; a < r; a++) o = t(e[a], a, n), o != null && u.push(o);
                else
                    for (a in e) o = t(e[a], a, n), o != null && u.push(o);
                return Ye(u)
            },
            guid: 1,
            support: L
        }), typeof Symbol == "function" && (i.fn[Symbol.iterator] = Z[Symbol.iterator]), i.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
            Be["[object " + t + "]"] = t.toLowerCase()
        });

        function et(e) {
            var t = !!e && "length" in e && e.length,
                n = Ee(e);
            return T(e) || $(e) ? !1 : n === "array" || t === 0 || typeof t == "number" && t > 0 && t - 1 in e
        }
        var qe = function(e) {
            var t, n, r, o, a, u, c, f, h, y, x, g, v, A, P, E, J, Y, ae, W = "sizzle" + 1 * new Date,
                O = e.document,
                ie = 0,
                M = 0,
                Q = Tt(),
                ft = Tt(),
                xt = Tt(),
                ue = Tt(),
                Oe = function(s, l) {
                    return s === l && (x = !0), 0
                },
                Pe = {}.hasOwnProperty,
                oe = [],
                Ae = oe.pop,
                de = oe.push,
                Ne = oe.push,
                Pn = oe.slice,
                Re = function(s, l) {
                    for (var d = 0, m = s.length; d < m; d++)
                        if (s[d] === l) return d;
                    return -1
                },
                $t = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                F = "[\\x20\\t\\r\\n\\f]",
                Me = "(?:\\\\[\\da-fA-F]{1,6}" + F + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
                Rn = "\\[" + F + "*(" + Me + ")(?:" + F + "*([*^$|!~]?=)" + F + `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + Me + "))|)" + F + "*\\]",
                zt = ":(" + Me + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + Rn + ")*)|.*)\\)|)",
                $r = new RegExp(F + "+", "g"),
                wt = new RegExp("^" + F + "+|((?:^|[^\\\\])(?:\\\\.)*)" + F + "+$", "g"),
                zr = new RegExp("^" + F + "*," + F + "*"),
                Mn = new RegExp("^" + F + "*([>+~]|" + F + ")" + F + "*"),
                Ur = new RegExp(F + "|>"),
                Vr = new RegExp(zt),
                Xr = new RegExp("^" + Me + "$"),
                Ct = {
                    ID: new RegExp("^#(" + Me + ")"),
                    CLASS: new RegExp("^\\.(" + Me + ")"),
                    TAG: new RegExp("^(" + Me + "|[*])"),
                    ATTR: new RegExp("^" + Rn),
                    PSEUDO: new RegExp("^" + zt),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + F + "*(even|odd|(([+-]|)(\\d*)n|)" + F + "*(?:([+-]|)" + F + "*(\\d+)|))" + F + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + $t + ")$", "i"),
                    needsContext: new RegExp("^" + F + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + F + "*((?:-\\d)?\\d*)" + F + "*\\)|)(?=[^-]|$)", "i")
                },
                Gr = /HTML$/i,
                Qr = /^(?:input|select|textarea|button)$/i,
                Yr = /^h\d$/i,
                lt = /^[^{]+\{\s*\[native \w/,
                Jr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                Ut = /[+~]/,
                Te = new RegExp("\\\\[\\da-fA-F]{1,6}" + F + "?|\\\\([^\\r\\n\\f])", "g"),
                Se = function(s, l) {
                    var d = "0x" + s.slice(1) - 65536;
                    return l || (d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, d & 1023 | 56320))
                },
                _n = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                Bn = function(s, l) {
                    return l ? s === "\0" ? "�" : s.slice(0, -1) + "\\" + s.charCodeAt(s.length - 1).toString(16) + " " : "\\" + s
                },
                Fn = function() {
                    g()
                },
                Kr = Et(function(s) {
                    return s.disabled === !0 && s.nodeName.toLowerCase() === "fieldset"
                }, {
                    dir: "parentNode",
                    next: "legend"
                });
            try {
                Ne.apply(oe = Pn.call(O.childNodes), O.childNodes), oe[O.childNodes.length].nodeType
            } catch {
                Ne = {
                    apply: oe.length ? function(l, d) {
                        de.apply(l, Pn.call(d))
                    } : function(l, d) {
                        for (var m = l.length, p = 0; l[m++] = d[p++];);
                        l.length = m - 1
                    }
                }
            }

            function z(s, l, d, m) {
                var p, b, w, C, S, D, N, q = l && l.ownerDocument,
                    R = l ? l.nodeType : 9;
                if (d = d || [], typeof s != "string" || !s || R !== 1 && R !== 9 && R !== 11) return d;
                if (!m && (g(l), l = l || v, P)) {
                    if (R !== 11 && (S = Jr.exec(s)))
                        if (p = S[1]) {
                            if (R === 9)
                                if (w = l.getElementById(p)) {
                                    if (w.id === p) return d.push(w), d
                                } else return d;
                            else if (q && (w = q.getElementById(p)) && ae(l, w) && w.id === p) return d.push(w), d
                        } else {
                            if (S[2]) return Ne.apply(d, l.getElementsByTagName(s)), d;
                            if ((p = S[3]) && n.getElementsByClassName && l.getElementsByClassName) return Ne.apply(d, l.getElementsByClassName(p)), d
                        }
                    if (n.qsa && !ue[s + " "] && (!E || !E.test(s)) && (R !== 1 || l.nodeName.toLowerCase() !== "object")) {
                        if (N = s, q = l, R === 1 && (Ur.test(s) || Mn.test(s))) {
                            for (q = Ut.test(s) && Xt(l.parentNode) || l, (q !== l || !n.scope) && ((C = l.getAttribute("id")) ? C = C.replace(_n, Bn) : l.setAttribute("id", C = W)), D = u(s), b = D.length; b--;) D[b] = (C ? "#" + C : ":scope") + " " + St(D[b]);
                            N = D.join(",")
                        }
                        try {
                            return Ne.apply(d, q.querySelectorAll(N)), d
                        } catch {
                            ue(s, !0)
                        } finally {
                            C === W && l.removeAttribute("id")
                        }
                    }
                }
                return f(s.replace(wt, "$1"), l, d, m)
            }

            function Tt() {
                var s = [];

                function l(d, m) {
                    return s.push(d + " ") > r.cacheLength && delete l[s.shift()], l[d + " "] = m
                }
                return l
            }

            function ge(s) {
                return s[W] = !0, s
            }

            function pe(s) {
                var l = v.createElement("fieldset");
                try {
                    return !!s(l)
                } catch {
                    return !1
                } finally {
                    l.parentNode && l.parentNode.removeChild(l), l = null
                }
            }

            function Vt(s, l) {
                for (var d = s.split("|"), m = d.length; m--;) r.attrHandle[d[m]] = l
            }

            function Wn(s, l) {
                var d = l && s,
                    m = d && s.nodeType === 1 && l.nodeType === 1 && s.sourceIndex - l.sourceIndex;
                if (m) return m;
                if (d) {
                    for (; d = d.nextSibling;)
                        if (d === l) return -1
                }
                return s ? 1 : -1
            }

            function Zr(s) {
                return function(l) {
                    var d = l.nodeName.toLowerCase();
                    return d === "input" && l.type === s
                }
            }

            function ei(s) {
                return function(l) {
                    var d = l.nodeName.toLowerCase();
                    return (d === "input" || d === "button") && l.type === s
                }
            }

            function $n(s) {
                return function(l) {
                    return "form" in l ? l.parentNode && l.disabled === !1 ? "label" in l ? "label" in l.parentNode ? l.parentNode.disabled === s : l.disabled === s : l.isDisabled === s || l.isDisabled !== !s && Kr(l) === s : l.disabled === s : "label" in l ? l.disabled === s : !1
                }
            }

            function _e(s) {
                return ge(function(l) {
                    return l = +l, ge(function(d, m) {
                        for (var p, b = s([], d.length, l), w = b.length; w--;) d[p = b[w]] && (d[p] = !(m[p] = d[p]))
                    })
                })
            }

            function Xt(s) {
                return s && typeof s.getElementsByTagName < "u" && s
            }
            n = z.support = {}, a = z.isXML = function(s) {
                var l = s && s.namespaceURI,
                    d = s && (s.ownerDocument || s).documentElement;
                return !Gr.test(l || d && d.nodeName || "HTML")
            }, g = z.setDocument = function(s) {
                var l, d, m = s ? s.ownerDocument || s : O;
                return m == v || m.nodeType !== 9 || !m.documentElement || (v = m, A = v.documentElement, P = !a(v), O != v && (d = v.defaultView) && d.top !== d && (d.addEventListener ? d.addEventListener("unload", Fn, !1) : d.attachEvent && d.attachEvent("onunload", Fn)), n.scope = pe(function(p) {
                    return A.appendChild(p).appendChild(v.createElement("div")), typeof p.querySelectorAll < "u" && !p.querySelectorAll(":scope fieldset div").length
                }), n.cssHas = pe(function() {
                    try {
                        return v.querySelector(":has(*,:jqfake)"), !1
                    } catch {
                        return !0
                    }
                }), n.attributes = pe(function(p) {
                    return p.className = "i", !p.getAttribute("className")
                }), n.getElementsByTagName = pe(function(p) {
                    return p.appendChild(v.createComment("")), !p.getElementsByTagName("*").length
                }), n.getElementsByClassName = lt.test(v.getElementsByClassName), n.getById = pe(function(p) {
                    return A.appendChild(p).id = W, !v.getElementsByName || !v.getElementsByName(W).length
                }), n.getById ? (r.filter.ID = function(p) {
                    var b = p.replace(Te, Se);
                    return function(w) {
                        return w.getAttribute("id") === b
                    }
                }, r.find.ID = function(p, b) {
                    if (typeof b.getElementById < "u" && P) {
                        var w = b.getElementById(p);
                        return w ? [w] : []
                    }
                }) : (r.filter.ID = function(p) {
                    var b = p.replace(Te, Se);
                    return function(w) {
                        var C = typeof w.getAttributeNode < "u" && w.getAttributeNode("id");
                        return C && C.value === b
                    }
                }, r.find.ID = function(p, b) {
                    if (typeof b.getElementById < "u" && P) {
                        var w, C, S, D = b.getElementById(p);
                        if (D) {
                            if (w = D.getAttributeNode("id"), w && w.value === p) return [D];
                            for (S = b.getElementsByName(p), C = 0; D = S[C++];)
                                if (w = D.getAttributeNode("id"), w && w.value === p) return [D]
                        }
                        return []
                    }
                }), r.find.TAG = n.getElementsByTagName ? function(p, b) {
                    if (typeof b.getElementsByTagName < "u") return b.getElementsByTagName(p);
                    if (n.qsa) return b.querySelectorAll(p)
                } : function(p, b) {
                    var w, C = [],
                        S = 0,
                        D = b.getElementsByTagName(p);
                    if (p === "*") {
                        for (; w = D[S++];) w.nodeType === 1 && C.push(w);
                        return C
                    }
                    return D
                }, r.find.CLASS = n.getElementsByClassName && function(p, b) {
                    if (typeof b.getElementsByClassName < "u" && P) return b.getElementsByClassName(p)
                }, J = [], E = [], (n.qsa = lt.test(v.querySelectorAll)) && (pe(function(p) {
                    var b;
                    A.appendChild(p).innerHTML = "<a id='" + W + "'></a><select id='" + W + "-\r\\' msallowcapture=''><option selected=''></option></select>", p.querySelectorAll("[msallowcapture^='']").length && E.push("[*^$]=" + F + `*(?:''|"")`), p.querySelectorAll("[selected]").length || E.push("\\[" + F + "*(?:value|" + $t + ")"), p.querySelectorAll("[id~=" + W + "-]").length || E.push("~="), b = v.createElement("input"), b.setAttribute("name", ""), p.appendChild(b), p.querySelectorAll("[name='']").length || E.push("\\[" + F + "*name" + F + "*=" + F + `*(?:''|"")`), p.querySelectorAll(":checked").length || E.push(":checked"), p.querySelectorAll("a#" + W + "+*").length || E.push(".#.+[+~]"), p.querySelectorAll("\\\f"), E.push("[\\r\\n\\f]")
                }), pe(function(p) {
                    p.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var b = v.createElement("input");
                    b.setAttribute("type", "hidden"), p.appendChild(b).setAttribute("name", "D"), p.querySelectorAll("[name=d]").length && E.push("name" + F + "*[*^$|!~]?="), p.querySelectorAll(":enabled").length !== 2 && E.push(":enabled", ":disabled"), A.appendChild(p).disabled = !0, p.querySelectorAll(":disabled").length !== 2 && E.push(":enabled", ":disabled"), p.querySelectorAll("*,:x"), E.push(",.*:")
                })), (n.matchesSelector = lt.test(Y = A.matches || A.webkitMatchesSelector || A.mozMatchesSelector || A.oMatchesSelector || A.msMatchesSelector)) && pe(function(p) {
                    n.disconnectedMatch = Y.call(p, "*"), Y.call(p, "[s!='']:x"), J.push("!=", zt)
                }), n.cssHas || E.push(":has"), E = E.length && new RegExp(E.join("|")), J = J.length && new RegExp(J.join("|")), l = lt.test(A.compareDocumentPosition), ae = l || lt.test(A.contains) ? function(p, b) {
                    var w = p.nodeType === 9 && p.documentElement || p,
                        C = b && b.parentNode;
                    return p === C || !!(C && C.nodeType === 1 && (w.contains ? w.contains(C) : p.compareDocumentPosition && p.compareDocumentPosition(C) & 16))
                } : function(p, b) {
                    if (b) {
                        for (; b = b.parentNode;)
                            if (b === p) return !0
                    }
                    return !1
                }, Oe = l ? function(p, b) {
                    if (p === b) return x = !0, 0;
                    var w = !p.compareDocumentPosition - !b.compareDocumentPosition;
                    return w || (w = (p.ownerDocument || p) == (b.ownerDocument || b) ? p.compareDocumentPosition(b) : 1, w & 1 || !n.sortDetached && b.compareDocumentPosition(p) === w ? p == v || p.ownerDocument == O && ae(O, p) ? -1 : b == v || b.ownerDocument == O && ae(O, b) ? 1 : y ? Re(y, p) - Re(y, b) : 0 : w & 4 ? -1 : 1)
                } : function(p, b) {
                    if (p === b) return x = !0, 0;
                    var w, C = 0,
                        S = p.parentNode,
                        D = b.parentNode,
                        N = [p],
                        q = [b];
                    if (!S || !D) return p == v ? -1 : b == v ? 1 : S ? -1 : D ? 1 : y ? Re(y, p) - Re(y, b) : 0;
                    if (S === D) return Wn(p, b);
                    for (w = p; w = w.parentNode;) N.unshift(w);
                    for (w = b; w = w.parentNode;) q.unshift(w);
                    for (; N[C] === q[C];) C++;
                    return C ? Wn(N[C], q[C]) : N[C] == O ? -1 : q[C] == O ? 1 : 0
                }), v
            }, z.matches = function(s, l) {
                return z(s, null, null, l)
            }, z.matchesSelector = function(s, l) {
                if (g(s), n.matchesSelector && P && !ue[l + " "] && (!J || !J.test(l)) && (!E || !E.test(l))) try {
                    var d = Y.call(s, l);
                    if (d || n.disconnectedMatch || s.document && s.document.nodeType !== 11) return d
                } catch {
                    ue(l, !0)
                }
                return z(l, v, null, [s]).length > 0
            }, z.contains = function(s, l) {
                return (s.ownerDocument || s) != v && g(s), ae(s, l)
            }, z.attr = function(s, l) {
                (s.ownerDocument || s) != v && g(s);
                var d = r.attrHandle[l.toLowerCase()],
                    m = d && Pe.call(r.attrHandle, l.toLowerCase()) ? d(s, l, !P) : void 0;
                return m !== void 0 ? m : n.attributes || !P ? s.getAttribute(l) : (m = s.getAttributeNode(l)) && m.specified ? m.value : null
            }, z.escape = function(s) {
                return (s + "").replace(_n, Bn)
            }, z.error = function(s) {
                throw new Error("Syntax error, unrecognized expression: " + s)
            }, z.uniqueSort = function(s) {
                var l, d = [],
                    m = 0,
                    p = 0;
                if (x = !n.detectDuplicates, y = !n.sortStable && s.slice(0), s.sort(Oe), x) {
                    for (; l = s[p++];) l === s[p] && (m = d.push(p));
                    for (; m--;) s.splice(d[m], 1)
                }
                return y = null, s
            }, o = z.getText = function(s) {
                var l, d = "",
                    m = 0,
                    p = s.nodeType;
                if (p) {
                    if (p === 1 || p === 9 || p === 11) {
                        if (typeof s.textContent == "string") return s.textContent;
                        for (s = s.firstChild; s; s = s.nextSibling) d += o(s)
                    } else if (p === 3 || p === 4) return s.nodeValue
                } else
                    for (; l = s[m++];) d += o(l);
                return d
            }, r = z.selectors = {
                cacheLength: 50,
                createPseudo: ge,
                match: Ct,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(s) {
                        return s[1] = s[1].replace(Te, Se), s[3] = (s[3] || s[4] || s[5] || "").replace(Te, Se), s[2] === "~=" && (s[3] = " " + s[3] + " "), s.slice(0, 4)
                    },
                    CHILD: function(s) {
                        return s[1] = s[1].toLowerCase(), s[1].slice(0, 3) === "nth" ? (s[3] || z.error(s[0]), s[4] = +(s[4] ? s[5] + (s[6] || 1) : 2 * (s[3] === "even" || s[3] === "odd")), s[5] = +(s[7] + s[8] || s[3] === "odd")) : s[3] && z.error(s[0]), s
                    },
                    PSEUDO: function(s) {
                        var l, d = !s[6] && s[2];
                        return Ct.CHILD.test(s[0]) ? null : (s[3] ? s[2] = s[4] || s[5] || "" : d && Vr.test(d) && (l = u(d, !0)) && (l = d.indexOf(")", d.length - l) - d.length) && (s[0] = s[0].slice(0, l), s[2] = d.slice(0, l)), s.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(s) {
                        var l = s.replace(Te, Se).toLowerCase();
                        return s === "*" ? function() {
                            return !0
                        } : function(d) {
                            return d.nodeName && d.nodeName.toLowerCase() === l
                        }
                    },
                    CLASS: function(s) {
                        var l = Q[s + " "];
                        return l || (l = new RegExp("(^|" + F + ")" + s + "(" + F + "|$)")) && Q(s, function(d) {
                            return l.test(typeof d.className == "string" && d.className || typeof d.getAttribute < "u" && d.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(s, l, d) {
                        return function(m) {
                            var p = z.attr(m, s);
                            return p == null ? l === "!=" : l ? (p += "", l === "=" ? p === d : l === "!=" ? p !== d : l === "^=" ? d && p.indexOf(d) === 0 : l === "*=" ? d && p.indexOf(d) > -1 : l === "$=" ? d && p.slice(-d.length) === d : l === "~=" ? (" " + p.replace($r, " ") + " ").indexOf(d) > -1 : l === "|=" ? p === d || p.slice(0, d.length + 1) === d + "-" : !1) : !0
                        }
                    },
                    CHILD: function(s, l, d, m, p) {
                        var b = s.slice(0, 3) !== "nth",
                            w = s.slice(-4) !== "last",
                            C = l === "of-type";
                        return m === 1 && p === 0 ? function(S) {
                            return !!S.parentNode
                        } : function(S, D, N) {
                            var q, R, U, j, K, ee, se = b !== w ? "nextSibling" : "previousSibling",
                                V = S.parentNode,
                                ct = C && S.nodeName.toLowerCase(),
                                dt = !N && !C,
                                fe = !1;
                            if (V) {
                                if (b) {
                                    for (; se;) {
                                        for (j = S; j = j[se];)
                                            if (C ? j.nodeName.toLowerCase() === ct : j.nodeType === 1) return !1;
                                        ee = se = s === "only" && !ee && "nextSibling"
                                    }
                                    return !0
                                }
                                if (ee = [w ? V.firstChild : V.lastChild], w && dt) {
                                    for (j = V, U = j[W] || (j[W] = {}), R = U[j.uniqueID] || (U[j.uniqueID] = {}), q = R[s] || [], K = q[0] === ie && q[1], fe = K && q[2], j = K && V.childNodes[K]; j = ++K && j && j[se] || (fe = K = 0) || ee.pop();)
                                        if (j.nodeType === 1 && ++fe && j === S) {
                                            R[s] = [ie, K, fe];
                                            break
                                        }
                                } else if (dt && (j = S, U = j[W] || (j[W] = {}), R = U[j.uniqueID] || (U[j.uniqueID] = {}), q = R[s] || [], K = q[0] === ie && q[1], fe = K), fe === !1)
                                    for (;
                                        (j = ++K && j && j[se] || (fe = K = 0) || ee.pop()) && !((C ? j.nodeName.toLowerCase() === ct : j.nodeType === 1) && ++fe && (dt && (U = j[W] || (j[W] = {}), R = U[j.uniqueID] || (U[j.uniqueID] = {}), R[s] = [ie, fe]), j === S)););
                                return fe -= p, fe === m || fe % m === 0 && fe / m >= 0
                            }
                        }
                    },
                    PSEUDO: function(s, l) {
                        var d, m = r.pseudos[s] || r.setFilters[s.toLowerCase()] || z.error("unsupported pseudo: " + s);
                        return m[W] ? m(l) : m.length > 1 ? (d = [s, s, "", l], r.setFilters.hasOwnProperty(s.toLowerCase()) ? ge(function(p, b) {
                            for (var w, C = m(p, l), S = C.length; S--;) w = Re(p, C[S]), p[w] = !(b[w] = C[S])
                        }) : function(p) {
                            return m(p, 0, d)
                        }) : m
                    }
                },
                pseudos: {
                    not: ge(function(s) {
                        var l = [],
                            d = [],
                            m = c(s.replace(wt, "$1"));
                        return m[W] ? ge(function(p, b, w, C) {
                            for (var S, D = m(p, null, C, []), N = p.length; N--;)(S = D[N]) && (p[N] = !(b[N] = S))
                        }) : function(p, b, w) {
                            return l[0] = p, m(l, null, w, d), l[0] = null, !d.pop()
                        }
                    }),
                    has: ge(function(s) {
                        return function(l) {
                            return z(s, l).length > 0
                        }
                    }),
                    contains: ge(function(s) {
                        return s = s.replace(Te, Se),
                            function(l) {
                                return (l.textContent || o(l)).indexOf(s) > -1
                            }
                    }),
                    lang: ge(function(s) {
                        return Xr.test(s || "") || z.error("unsupported lang: " + s), s = s.replace(Te, Se).toLowerCase(),
                            function(l) {
                                var d;
                                do
                                    if (d = P ? l.lang : l.getAttribute("xml:lang") || l.getAttribute("lang")) return d = d.toLowerCase(), d === s || d.indexOf(s + "-") === 0; while ((l = l.parentNode) && l.nodeType === 1);
                                return !1
                            }
                    }),
                    target: function(s) {
                        var l = e.location && e.location.hash;
                        return l && l.slice(1) === s.id
                    },
                    root: function(s) {
                        return s === A
                    },
                    focus: function(s) {
                        return s === v.activeElement && (!v.hasFocus || v.hasFocus()) && !!(s.type || s.href || ~s.tabIndex)
                    },
                    enabled: $n(!1),
                    disabled: $n(!0),
                    checked: function(s) {
                        var l = s.nodeName.toLowerCase();
                        return l === "input" && !!s.checked || l === "option" && !!s.selected
                    },
                    selected: function(s) {
                        return s.parentNode && s.parentNode.selectedIndex, s.selected === !0
                    },
                    empty: function(s) {
                        for (s = s.firstChild; s; s = s.nextSibling)
                            if (s.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(s) {
                        return !r.pseudos.empty(s)
                    },
                    header: function(s) {
                        return Yr.test(s.nodeName)
                    },
                    input: function(s) {
                        return Qr.test(s.nodeName)
                    },
                    button: function(s) {
                        var l = s.nodeName.toLowerCase();
                        return l === "input" && s.type === "button" || l === "button"
                    },
                    text: function(s) {
                        var l;
                        return s.nodeName.toLowerCase() === "input" && s.type === "text" && ((l = s.getAttribute("type")) == null || l.toLowerCase() === "text")
                    },
                    first: _e(function() {
                        return [0]
                    }),
                    last: _e(function(s, l) {
                        return [l - 1]
                    }),
                    eq: _e(function(s, l, d) {
                        return [d < 0 ? d + l : d]
                    }),
                    even: _e(function(s, l) {
                        for (var d = 0; d < l; d += 2) s.push(d);
                        return s
                    }),
                    odd: _e(function(s, l) {
                        for (var d = 1; d < l; d += 2) s.push(d);
                        return s
                    }),
                    lt: _e(function(s, l, d) {
                        for (var m = d < 0 ? d + l : d > l ? l : d; --m >= 0;) s.push(m);
                        return s
                    }),
                    gt: _e(function(s, l, d) {
                        for (var m = d < 0 ? d + l : d; ++m < l;) s.push(m);
                        return s
                    })
                }
            }, r.pseudos.nth = r.pseudos.eq;
            for (t in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) r.pseudos[t] = Zr(t);
            for (t in {
                    submit: !0,
                    reset: !0
                }) r.pseudos[t] = ei(t);

            function zn() {}
            zn.prototype = r.filters = r.pseudos, r.setFilters = new zn, u = z.tokenize = function(s, l) {
                var d, m, p, b, w, C, S, D = ft[s + " "];
                if (D) return l ? 0 : D.slice(0);
                for (w = s, C = [], S = r.preFilter; w;) {
                    (!d || (m = zr.exec(w))) && (m && (w = w.slice(m[0].length) || w), C.push(p = [])), d = !1, (m = Mn.exec(w)) && (d = m.shift(), p.push({
                        value: d,
                        type: m[0].replace(wt, " ")
                    }), w = w.slice(d.length));
                    for (b in r.filter)(m = Ct[b].exec(w)) && (!S[b] || (m = S[b](m))) && (d = m.shift(), p.push({
                        value: d,
                        type: b,
                        matches: m
                    }), w = w.slice(d.length));
                    if (!d) break
                }
                return l ? w.length : w ? z.error(s) : ft(s, C).slice(0)
            };

            function St(s) {
                for (var l = 0, d = s.length, m = ""; l < d; l++) m += s[l].value;
                return m
            }

            function Et(s, l, d) {
                var m = l.dir,
                    p = l.next,
                    b = p || m,
                    w = d && b === "parentNode",
                    C = M++;
                return l.first ? function(S, D, N) {
                    for (; S = S[m];)
                        if (S.nodeType === 1 || w) return s(S, D, N);
                    return !1
                } : function(S, D, N) {
                    var q, R, U, j = [ie, C];
                    if (N) {
                        for (; S = S[m];)
                            if ((S.nodeType === 1 || w) && s(S, D, N)) return !0
                    } else
                        for (; S = S[m];)
                            if (S.nodeType === 1 || w)
                                if (U = S[W] || (S[W] = {}), R = U[S.uniqueID] || (U[S.uniqueID] = {}), p && p === S.nodeName.toLowerCase()) S = S[m] || S;
                                else {
                                    if ((q = R[b]) && q[0] === ie && q[1] === C) return j[2] = q[2];
                                    if (R[b] = j, j[2] = s(S, D, N)) return !0
                                } return !1
                }
            }

            function Gt(s) {
                return s.length > 1 ? function(l, d, m) {
                    for (var p = s.length; p--;)
                        if (!s[p](l, d, m)) return !1;
                    return !0
                } : s[0]
            }

            function ti(s, l, d) {
                for (var m = 0, p = l.length; m < p; m++) z(s, l[m], d);
                return d
            }

            function At(s, l, d, m, p) {
                for (var b, w = [], C = 0, S = s.length, D = l != null; C < S; C++)(b = s[C]) && (!d || d(b, m, p)) && (w.push(b), D && l.push(C));
                return w
            }

            function Qt(s, l, d, m, p, b) {
                return m && !m[W] && (m = Qt(m)), p && !p[W] && (p = Qt(p, b)), ge(function(w, C, S, D) {
                    var N, q, R, U = [],
                        j = [],
                        K = C.length,
                        ee = w || ti(l || "*", S.nodeType ? [S] : S, []),
                        se = s && (w || !l) ? At(ee, U, s, S, D) : ee,
                        V = d ? p || (w ? s : K || m) ? [] : C : se;
                    if (d && d(se, V, S, D), m)
                        for (N = At(V, j), m(N, [], S, D), q = N.length; q--;)(R = N[q]) && (V[j[q]] = !(se[j[q]] = R));
                    if (w) {
                        if (p || s) {
                            if (p) {
                                for (N = [], q = V.length; q--;)(R = V[q]) && N.push(se[q] = R);
                                p(null, V = [], N, D)
                            }
                            for (q = V.length; q--;)(R = V[q]) && (N = p ? Re(w, R) : U[q]) > -1 && (w[N] = !(C[N] = R))
                        }
                    } else V = At(V === C ? V.splice(K, V.length) : V), p ? p(null, C, V, D) : Ne.apply(C, V)
                })
            }

            function Yt(s) {
                for (var l, d, m, p = s.length, b = r.relative[s[0].type], w = b || r.relative[" "], C = b ? 1 : 0, S = Et(function(q) {
                        return q === l
                    }, w, !0), D = Et(function(q) {
                        return Re(l, q) > -1
                    }, w, !0), N = [function(q, R, U) {
                        var j = !b && (U || R !== h) || ((l = R).nodeType ? S(q, R, U) : D(q, R, U));
                        return l = null, j
                    }]; C < p; C++)
                    if (d = r.relative[s[C].type]) N = [Et(Gt(N), d)];
                    else {
                        if (d = r.filter[s[C].type].apply(null, s[C].matches), d[W]) {
                            for (m = ++C; m < p && !r.relative[s[m].type]; m++);
                            return Qt(C > 1 && Gt(N), C > 1 && St(s.slice(0, C - 1).concat({
                                value: s[C - 2].type === " " ? "*" : ""
                            })).replace(wt, "$1"), d, C < m && Yt(s.slice(C, m)), m < p && Yt(s = s.slice(m)), m < p && St(s))
                        }
                        N.push(d)
                    }
                return Gt(N)
            }

            function ni(s, l) {
                var d = l.length > 0,
                    m = s.length > 0,
                    p = function(b, w, C, S, D) {
                        var N, q, R, U = 0,
                            j = "0",
                            K = b && [],
                            ee = [],
                            se = h,
                            V = b || m && r.find.TAG("*", D),
                            ct = ie += se == null ? 1 : Math.random() || .1,
                            dt = V.length;
                        for (D && (h = w == v || w || D); j !== dt && (N = V[j]) != null; j++) {
                            if (m && N) {
                                for (q = 0, !w && N.ownerDocument != v && (g(N), C = !P); R = s[q++];)
                                    if (R(N, w || v, C)) {
                                        S.push(N);
                                        break
                                    }
                                D && (ie = ct)
                            }
                            d && ((N = !R && N) && U--, b && K.push(N))
                        }
                        if (U += j, d && j !== U) {
                            for (q = 0; R = l[q++];) R(K, ee, w, C);
                            if (b) {
                                if (U > 0)
                                    for (; j--;) K[j] || ee[j] || (ee[j] = Ae.call(S));
                                ee = At(ee)
                            }
                            Ne.apply(S, ee), D && !b && ee.length > 0 && U + l.length > 1 && z.uniqueSort(S)
                        }
                        return D && (ie = ct, h = se), K
                    };
                return d ? ge(p) : p
            }
            return c = z.compile = function(s, l) {
                var d, m = [],
                    p = [],
                    b = xt[s + " "];
                if (!b) {
                    for (l || (l = u(s)), d = l.length; d--;) b = Yt(l[d]), b[W] ? m.push(b) : p.push(b);
                    b = xt(s, ni(p, m)), b.selector = s
                }
                return b
            }, f = z.select = function(s, l, d, m) {
                var p, b, w, C, S, D = typeof s == "function" && s,
                    N = !m && u(s = D.selector || s);
                if (d = d || [], N.length === 1) {
                    if (b = N[0] = N[0].slice(0), b.length > 2 && (w = b[0]).type === "ID" && l.nodeType === 9 && P && r.relative[b[1].type]) {
                        if (l = (r.find.ID(w.matches[0].replace(Te, Se), l) || [])[0], l) D && (l = l.parentNode);
                        else return d;
                        s = s.slice(b.shift().value.length)
                    }
                    for (p = Ct.needsContext.test(s) ? 0 : b.length; p-- && (w = b[p], !r.relative[C = w.type]);)
                        if ((S = r.find[C]) && (m = S(w.matches[0].replace(Te, Se), Ut.test(b[0].type) && Xt(l.parentNode) || l))) {
                            if (b.splice(p, 1), s = m.length && St(b), !s) return Ne.apply(d, m), d;
                            break
                        }
                }
                return (D || c(s, N))(m, l, !P, d, !l || Ut.test(s) && Xt(l.parentNode) || l), d
            }, n.sortStable = W.split("").sort(Oe).join("") === W, n.detectDuplicates = !!x, g(), n.sortDetached = pe(function(s) {
                return s.compareDocumentPosition(v.createElement("fieldset")) & 1
            }), pe(function(s) {
                return s.innerHTML = "<a href='#'></a>", s.firstChild.getAttribute("href") === "#"
            }) || Vt("type|href|height|width", function(s, l, d) {
                if (!d) return s.getAttribute(l, l.toLowerCase() === "type" ? 1 : 2)
            }), (!n.attributes || !pe(function(s) {
                return s.innerHTML = "<input/>", s.firstChild.setAttribute("value", ""), s.firstChild.getAttribute("value") === ""
            })) && Vt("value", function(s, l, d) {
                if (!d && s.nodeName.toLowerCase() === "input") return s.defaultValue
            }), pe(function(s) {
                return s.getAttribute("disabled") == null
            }) || Vt($t, function(s, l, d) {
                var m;
                if (!d) return s[l] === !0 ? l.toLowerCase() : (m = s.getAttributeNode(l)) && m.specified ? m.value : null
            }), z
        }(H);
        i.find = qe, i.expr = qe.selectors, i.expr[":"] = i.expr.pseudos, i.uniqueSort = i.unique = qe.uniqueSort, i.text = qe.getText, i.isXMLDoc = qe.isXML, i.contains = qe.contains, i.escapeSelector = qe.escape;
        var We = function(e, t, n) {
                for (var r = [], o = n !== void 0;
                    (e = e[t]) && e.nodeType !== 9;)
                    if (e.nodeType === 1) {
                        if (o && i(e).is(n)) break;
                        r.push(e)
                    }
                return r
            },
            Jt = function(e, t) {
                for (var n = []; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e);
                return n
            },
            Kt = i.expr.match.needsContext;

        function le(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }
        var Zt = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

        function Nt(e, t, n) {
            return T(t) ? i.grep(e, function(r, o) {
                return !!t.call(r, o, r) !== n
            }) : t.nodeType ? i.grep(e, function(r) {
                return r === t !== n
            }) : typeof t != "string" ? i.grep(e, function(r) {
                return De.call(t, r) > -1 !== n
            }) : i.filter(t, e, n)
        }
        i.filter = function(e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"), t.length === 1 && r.nodeType === 1 ? i.find.matchesSelector(r, e) ? [r] : [] : i.find.matches(e, i.grep(t, function(o) {
                return o.nodeType === 1
            }))
        }, i.fn.extend({
            find: function(e) {
                var t, n, r = this.length,
                    o = this;
                if (typeof e != "string") return this.pushStack(i(e).filter(function() {
                    for (t = 0; t < r; t++)
                        if (i.contains(o[t], this)) return !0
                }));
                for (n = this.pushStack([]), t = 0; t < r; t++) i.find(e, o[t], n);
                return r > 1 ? i.uniqueSort(n) : n
            },
            filter: function(e) {
                return this.pushStack(Nt(this, e || [], !1))
            },
            not: function(e) {
                return this.pushStack(Nt(this, e || [], !0))
            },
            is: function(e) {
                return !!Nt(this, typeof e == "string" && Kt.test(e) ? i(e) : e || [], !1).length
            }
        });
        var en, Vn = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
            Xn = i.fn.init = function(e, t, n) {
                var r, o;
                if (!e) return this;
                if (n = n || en, typeof e == "string")
                    if (e[0] === "<" && e[e.length - 1] === ">" && e.length >= 3 ? r = [null, e, null] : r = Vn.exec(e), r && (r[1] || !t))
                        if (r[1]) {
                            if (t = t instanceof i ? t[0] : t, i.merge(this, i.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : I, !0)), Zt.test(r[1]) && i.isPlainObject(t))
                                for (r in t) T(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                            return this
                        } else return o = I.getElementById(r[2]), o && (this[0] = o, this.length = 1), this;
                else return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                else {
                    if (e.nodeType) return this[0] = e, this.length = 1, this;
                    if (T(e)) return n.ready !== void 0 ? n.ready(e) : e(i)
                }
                return i.makeArray(e, this)
            };
        Xn.prototype = i.fn, en = i(I);
        var Gn = /^(?:parents|prev(?:Until|All))/,
            Qn = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        i.fn.extend({
            has: function(e) {
                var t = i(e, this),
                    n = t.length;
                return this.filter(function() {
                    for (var r = 0; r < n; r++)
                        if (i.contains(this, t[r])) return !0
                })
            },
            closest: function(e, t) {
                var n, r = 0,
                    o = this.length,
                    a = [],
                    u = typeof e != "string" && i(e);
                if (!Kt.test(e)) {
                    for (; r < o; r++)
                        for (n = this[r]; n && n !== t; n = n.parentNode)
                            if (n.nodeType < 11 && (u ? u.index(n) > -1 : n.nodeType === 1 && i.find.matchesSelector(n, e))) {
                                a.push(n);
                                break
                            }
                }
                return this.pushStack(a.length > 1 ? i.uniqueSort(a) : a)
            },
            index: function(e) {
                return e ? typeof e == "string" ? De.call(i(e), this[0]) : De.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                return this.pushStack(i.uniqueSort(i.merge(this.get(), i(e, t))))
            },
            addBack: function(e) {
                return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
            }
        });

        function tn(e, t) {
            for (;
                (e = e[t]) && e.nodeType !== 1;);
            return e
        }
        i.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && t.nodeType !== 11 ? t : null
            },
            parents: function(e) {
                return We(e, "parentNode")
            },
            parentsUntil: function(e, t, n) {
                return We(e, "parentNode", n)
            },
            next: function(e) {
                return tn(e, "nextSibling")
            },
            prev: function(e) {
                return tn(e, "previousSibling")
            },
            nextAll: function(e) {
                return We(e, "nextSibling")
            },
            prevAll: function(e) {
                return We(e, "previousSibling")
            },
            nextUntil: function(e, t, n) {
                return We(e, "nextSibling", n)
            },
            prevUntil: function(e, t, n) {
                return We(e, "previousSibling", n)
            },
            siblings: function(e) {
                return Jt((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return Jt(e.firstChild)
            },
            contents: function(e) {
                return e.contentDocument != null && xe(e.contentDocument) ? e.contentDocument : (le(e, "template") && (e = e.content || e), i.merge([], e.childNodes))
            }
        }, function(e, t) {
            i.fn[e] = function(n, r) {
                var o = i.map(this, t, n);
                return e.slice(-5) !== "Until" && (r = n), r && typeof r == "string" && (o = i.filter(r, o)), this.length > 1 && (Qn[e] || i.uniqueSort(o), Gn.test(e) && o.reverse()), this.pushStack(o)
            }
        });
        var me = /[^\x20\t\r\n\f]+/g;

        function Yn(e) {
            var t = {};
            return i.each(e.match(me) || [], function(n, r) {
                t[r] = !0
            }), t
        }
        i.Callbacks = function(e) {
            e = typeof e == "string" ? Yn(e) : i.extend({}, e);
            var t, n, r, o, a = [],
                u = [],
                c = -1,
                f = function() {
                    for (o = o || e.once, r = t = !0; u.length; c = -1)
                        for (n = u.shift(); ++c < a.length;) a[c].apply(n[0], n[1]) === !1 && e.stopOnFalse && (c = a.length, n = !1);
                    e.memory || (n = !1), t = !1, o && (n ? a = [] : a = "")
                },
                h = {
                    add: function() {
                        return a && (n && !t && (c = a.length - 1, u.push(n)), function y(x) {
                            i.each(x, function(g, v) {
                                T(v) ? (!e.unique || !h.has(v)) && a.push(v) : v && v.length && Ee(v) !== "string" && y(v)
                            })
                        }(arguments), n && !t && f()), this
                    },
                    remove: function() {
                        return i.each(arguments, function(y, x) {
                            for (var g;
                                (g = i.inArray(x, a, g)) > -1;) a.splice(g, 1), g <= c && c--
                        }), this
                    },
                    has: function(y) {
                        return y ? i.inArray(y, a) > -1 : a.length > 0
                    },
                    empty: function() {
                        return a && (a = []), this
                    },
                    disable: function() {
                        return o = u = [], a = n = "", this
                    },
                    disabled: function() {
                        return !a
                    },
                    lock: function() {
                        return o = u = [], !n && !t && (a = n = ""), this
                    },
                    locked: function() {
                        return !!o
                    },
                    fireWith: function(y, x) {
                        return o || (x = x || [], x = [y, x.slice ? x.slice() : x], u.push(x), t || f()), this
                    },
                    fire: function() {
                        return h.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!r
                    }
                };
            return h
        };

        function $e(e) {
            return e
        }

        function pt(e) {
            throw e
        }

        function nn(e, t, n, r) {
            var o;
            try {
                e && T(o = e.promise) ? o.call(e).done(t).fail(n) : e && T(o = e.then) ? o.call(e, t, n) : t.apply(void 0, [e].slice(r))
            } catch (a) {
                n.apply(void 0, [a])
            }
        }
        i.extend({
            Deferred: function(e) {
                var t = [
                        ["notify", "progress", i.Callbacks("memory"), i.Callbacks("memory"), 2],
                        ["resolve", "done", i.Callbacks("once memory"), i.Callbacks("once memory"), 0, "resolved"],
                        ["reject", "fail", i.Callbacks("once memory"), i.Callbacks("once memory"), 1, "rejected"]
                    ],
                    n = "pending",
                    r = {
                        state: function() {
                            return n
                        },
                        always: function() {
                            return o.done(arguments).fail(arguments), this
                        },
                        catch: function(a) {
                            return r.then(null, a)
                        },
                        pipe: function() {
                            var a = arguments;
                            return i.Deferred(function(u) {
                                i.each(t, function(c, f) {
                                    var h = T(a[f[4]]) && a[f[4]];
                                    o[f[1]](function() {
                                        var y = h && h.apply(this, arguments);
                                        y && T(y.promise) ? y.promise().progress(u.notify).done(u.resolve).fail(u.reject) : u[f[0] + "With"](this, h ? [y] : arguments)
                                    })
                                }), a = null
                            }).promise()
                        },
                        then: function(a, u, c) {
                            var f = 0;

                            function h(y, x, g, v) {
                                return function() {
                                    var A = this,
                                        P = arguments,
                                        E = function() {
                                            var Y, ae;
                                            if (!(y < f)) {
                                                if (Y = g.apply(A, P), Y === x.promise()) throw new TypeError("Thenable self-resolution");
                                                ae = Y && (typeof Y == "object" || typeof Y == "function") && Y.then, T(ae) ? v ? ae.call(Y, h(f, x, $e, v), h(f, x, pt, v)) : (f++, ae.call(Y, h(f, x, $e, v), h(f, x, pt, v), h(f, x, $e, x.notifyWith))) : (g !== $e && (A = void 0, P = [Y]), (v || x.resolveWith)(A, P))
                                            }
                                        },
                                        J = v ? E : function() {
                                            try {
                                                E()
                                            } catch (Y) {
                                                i.Deferred.exceptionHook && i.Deferred.exceptionHook(Y, J.stackTrace), y + 1 >= f && (g !== pt && (A = void 0, P = [Y]), x.rejectWith(A, P))
                                            }
                                        };
                                    y ? J() : (i.Deferred.getStackHook && (J.stackTrace = i.Deferred.getStackHook()), H.setTimeout(J))
                                }
                            }
                            return i.Deferred(function(y) {
                                t[0][3].add(h(0, y, T(c) ? c : $e, y.notifyWith)), t[1][3].add(h(0, y, T(a) ? a : $e)), t[2][3].add(h(0, y, T(u) ? u : pt))
                            }).promise()
                        },
                        promise: function(a) {
                            return a != null ? i.extend(a, r) : r
                        }
                    },
                    o = {};
                return i.each(t, function(a, u) {
                    var c = u[2],
                        f = u[5];
                    r[u[1]] = c.add, f && c.add(function() {
                        n = f
                    }, t[3 - a][2].disable, t[3 - a][3].disable, t[0][2].lock, t[0][3].lock), c.add(u[3].fire), o[u[0]] = function() {
                        return o[u[0] + "With"](this === o ? void 0 : this, arguments), this
                    }, o[u[0] + "With"] = c.fireWith
                }), r.promise(o), e && e.call(o, o), o
            },
            when: function(e) {
                var t = arguments.length,
                    n = t,
                    r = Array(n),
                    o = ve.call(arguments),
                    a = i.Deferred(),
                    u = function(c) {
                        return function(f) {
                            r[c] = this, o[c] = arguments.length > 1 ? ve.call(arguments) : f, --t || a.resolveWith(r, o)
                        }
                    };
                if (t <= 1 && (nn(e, a.done(u(n)).resolve, a.reject, !t), a.state() === "pending" || T(o[n] && o[n].then))) return a.then();
                for (; n--;) nn(o[n], u(n), a.reject);
                return a.promise()
            }
        });
        var Jn = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        i.Deferred.exceptionHook = function(e, t) {
            H.console && H.console.warn && e && Jn.test(e.name) && H.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
        }, i.readyException = function(e) {
            H.setTimeout(function() {
                throw e
            })
        };
        var kt = i.Deferred();
        i.fn.ready = function(e) {
            return kt.then(e).catch(function(t) {
                i.readyException(t)
            }), this
        }, i.extend({
            isReady: !1,
            readyWait: 1,
            ready: function(e) {
                (e === !0 ? --i.readyWait : i.isReady) || (i.isReady = !0, !(e !== !0 && --i.readyWait > 0) && kt.resolveWith(I, [i]))
            }
        }), i.ready.then = kt.then;

        function ht() {
            I.removeEventListener("DOMContentLoaded", ht), H.removeEventListener("load", ht), i.ready()
        }
        I.readyState === "complete" || I.readyState !== "loading" && !I.documentElement.doScroll ? H.setTimeout(i.ready) : (I.addEventListener("DOMContentLoaded", ht), H.addEventListener("load", ht));
        var we = function(e, t, n, r, o, a, u) {
                var c = 0,
                    f = e.length,
                    h = n == null;
                if (Ee(n) === "object") {
                    o = !0;
                    for (c in n) we(e, t, c, n[c], !0, a, u)
                } else if (r !== void 0 && (o = !0, T(r) || (u = !0), h && (u ? (t.call(e, r), t = null) : (h = t, t = function(y, x, g) {
                        return h.call(i(y), g)
                    })), t))
                    for (; c < f; c++) t(e[c], n, u ? r : r.call(e[c], c, t(e[c], n)));
                return o ? e : h ? t.call(e) : f ? t(e[0], n) : a
            },
            Kn = /^-ms-/,
            Zn = /-([a-z])/g;

        function er(e, t) {
            return t.toUpperCase()
        }

        function be(e) {
            return e.replace(Kn, "ms-").replace(Zn, er)
        }
        var tt = function(e) {
            return e.nodeType === 1 || e.nodeType === 9 || !+e.nodeType
        };

        function nt() {
            this.expando = i.expando + nt.uid++
        }
        nt.uid = 1, nt.prototype = {
            cache: function(e) {
                var t = e[this.expando];
                return t || (t = {}, tt(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0
                }))), t
            },
            set: function(e, t, n) {
                var r, o = this.cache(e);
                if (typeof t == "string") o[be(t)] = n;
                else
                    for (r in t) o[be(r)] = t[r];
                return o
            },
            get: function(e, t) {
                return t === void 0 ? this.cache(e) : e[this.expando] && e[this.expando][be(t)]
            },
            access: function(e, t, n) {
                return t === void 0 || t && typeof t == "string" && n === void 0 ? this.get(e, t) : (this.set(e, t, n), n !== void 0 ? n : t)
            },
            remove: function(e, t) {
                var n, r = e[this.expando];
                if (r !== void 0) {
                    if (t !== void 0)
                        for (Array.isArray(t) ? t = t.map(be) : (t = be(t), t = t in r ? [t] : t.match(me) || []), n = t.length; n--;) delete r[t[n]];
                    (t === void 0 || i.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                }
            },
            hasData: function(e) {
                var t = e[this.expando];
                return t !== void 0 && !i.isEmptyObject(t)
            }
        };
        var k = new nt,
            te = new nt,
            tr = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            nr = /[A-Z]/g;

        function rr(e) {
            return e === "true" ? !0 : e === "false" ? !1 : e === "null" ? null : e === +e + "" ? +e : tr.test(e) ? JSON.parse(e) : e
        }

        function rn(e, t, n) {
            var r;
            if (n === void 0 && e.nodeType === 1)
                if (r = "data-" + t.replace(nr, "-$&").toLowerCase(), n = e.getAttribute(r), typeof n == "string") {
                    try {
                        n = rr(n)
                    } catch {}
                    te.set(e, t, n)
                } else n = void 0;
            return n
        }
        i.extend({
            hasData: function(e) {
                return te.hasData(e) || k.hasData(e)
            },
            data: function(e, t, n) {
                return te.access(e, t, n)
            },
            removeData: function(e, t) {
                te.remove(e, t)
            },
            _data: function(e, t, n) {
                return k.access(e, t, n)
            },
            _removeData: function(e, t) {
                k.remove(e, t)
            }
        }), i.fn.extend({
            data: function(e, t) {
                var n, r, o, a = this[0],
                    u = a && a.attributes;
                if (e === void 0) {
                    if (this.length && (o = te.get(a), a.nodeType === 1 && !k.get(a, "hasDataAttrs"))) {
                        for (n = u.length; n--;) u[n] && (r = u[n].name, r.indexOf("data-") === 0 && (r = be(r.slice(5)), rn(a, r, o[r])));
                        k.set(a, "hasDataAttrs", !0)
                    }
                    return o
                }
                return typeof e == "object" ? this.each(function() {
                    te.set(this, e)
                }) : we(this, function(c) {
                    var f;
                    if (a && c === void 0) return f = te.get(a, e), f !== void 0 || (f = rn(a, e), f !== void 0) ? f : void 0;
                    this.each(function() {
                        te.set(this, e, c)
                    })
                }, null, t, arguments.length > 1, null, !0)
            },
            removeData: function(e) {
                return this.each(function() {
                    te.remove(this, e)
                })
            }
        }), i.extend({
            queue: function(e, t, n) {
                var r;
                if (e) return t = (t || "fx") + "queue", r = k.get(e, t), n && (!r || Array.isArray(n) ? r = k.access(e, t, i.makeArray(n)) : r.push(n)), r || []
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = i.queue(e, t),
                    r = n.length,
                    o = n.shift(),
                    a = i._queueHooks(e, t),
                    u = function() {
                        i.dequeue(e, t)
                    };
                o === "inprogress" && (o = n.shift(), r--), o && (t === "fx" && n.unshift("inprogress"), delete a.stop, o.call(e, u, a)), !r && a && a.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return k.get(e, n) || k.access(e, n, {
                    empty: i.Callbacks("once memory").add(function() {
                        k.remove(e, [t + "queue", n])
                    })
                })
            }
        }), i.fn.extend({
            queue: function(e, t) {
                var n = 2;
                return typeof e != "string" && (t = e, e = "fx", n--), arguments.length < n ? i.queue(this[0], e) : t === void 0 ? this : this.each(function() {
                    var r = i.queue(this, e, t);
                    i._queueHooks(this, e), e === "fx" && r[0] !== "inprogress" && i.dequeue(this, e)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    i.dequeue(this, e)
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, t) {
                var n, r = 1,
                    o = i.Deferred(),
                    a = this,
                    u = this.length,
                    c = function() {
                        --r || o.resolveWith(a, [a])
                    };
                for (typeof e != "string" && (t = e, e = void 0), e = e || "fx"; u--;) n = k.get(a[u], e + "queueHooks"), n && n.empty && (r++, n.empty.add(c));
                return c(), o.promise(t)
            }
        });
        var on = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            rt = new RegExp("^(?:([+-])=|)(" + on + ")([a-z%]*)$", "i"),
            Ce = ["Top", "Right", "Bottom", "Left"],
            Le = I.documentElement,
            ze = function(e) {
                return i.contains(e.ownerDocument, e)
            },
            ir = {
                composed: !0
            };
        Le.getRootNode && (ze = function(e) {
            return i.contains(e.ownerDocument, e) || e.getRootNode(ir) === e.ownerDocument
        });
        var gt = function(e, t) {
            return e = t || e, e.style.display === "none" || e.style.display === "" && ze(e) && i.css(e, "display") === "none"
        };

        function an(e, t, n, r) {
            var o, a, u = 20,
                c = r ? function() {
                    return r.cur()
                } : function() {
                    return i.css(e, t, "")
                },
                f = c(),
                h = n && n[3] || (i.cssNumber[t] ? "" : "px"),
                y = e.nodeType && (i.cssNumber[t] || h !== "px" && +f) && rt.exec(i.css(e, t));
            if (y && y[3] !== h) {
                for (f = f / 2, h = h || y[3], y = +f || 1; u--;) i.style(e, t, y + h), (1 - a) * (1 - (a = c() / f || .5)) <= 0 && (u = 0), y = y / a;
                y = y * 2, i.style(e, t, y + h), n = n || []
            }
            return n && (y = +y || +f || 0, o = n[1] ? y + (n[1] + 1) * n[2] : +n[2], r && (r.unit = h, r.start = y, r.end = o)), o
        }
        var un = {};

        function or(e) {
            var t, n = e.ownerDocument,
                r = e.nodeName,
                o = un[r];
            return o || (t = n.body.appendChild(n.createElement(r)), o = i.css(t, "display"), t.parentNode.removeChild(t), o === "none" && (o = "block"), un[r] = o, o)
        }

        function Ue(e, t) {
            for (var n, r, o = [], a = 0, u = e.length; a < u; a++) r = e[a], r.style && (n = r.style.display, t ? (n === "none" && (o[a] = k.get(r, "display") || null, o[a] || (r.style.display = "")), r.style.display === "" && gt(r) && (o[a] = or(r))) : n !== "none" && (o[a] = "none", k.set(r, "display", n)));
            for (a = 0; a < u; a++) o[a] != null && (e[a].style.display = o[a]);
            return e
        }
        i.fn.extend({
            show: function() {
                return Ue(this, !0)
            },
            hide: function() {
                return Ue(this)
            },
            toggle: function(e) {
                return typeof e == "boolean" ? e ? this.show() : this.hide() : this.each(function() {
                    gt(this) ? i(this).show() : i(this).hide()
                })
            }
        });
        var it = /^(?:checkbox|radio)$/i,
            sn = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
            fn = /^$|^module$|\/(?:java|ecma)script/i;
        (function() {
            var e = I.createDocumentFragment(),
                t = e.appendChild(I.createElement("div")),
                n = I.createElement("input");
            n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), L.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", L.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, t.innerHTML = "<option></option>", L.option = !!t.lastChild
        })();
        var ce = {
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
        ce.tbody = ce.tfoot = ce.colgroup = ce.caption = ce.thead, ce.th = ce.td, L.option || (ce.optgroup = ce.option = [1, "<select multiple='multiple'>", "</select>"]);

        function ne(e, t) {
            var n;
            return typeof e.getElementsByTagName < "u" ? n = e.getElementsByTagName(t || "*") : typeof e.querySelectorAll < "u" ? n = e.querySelectorAll(t || "*") : n = [], t === void 0 || t && le(e, t) ? i.merge([e], n) : n
        }

        function Dt(e, t) {
            for (var n = 0, r = e.length; n < r; n++) k.set(e[n], "globalEval", !t || k.get(t[n], "globalEval"))
        }
        var ar = /<|&#?\w+;/;

        function ln(e, t, n, r, o) {
            for (var a, u, c, f, h, y, x = t.createDocumentFragment(), g = [], v = 0, A = e.length; v < A; v++)
                if (a = e[v], a || a === 0)
                    if (Ee(a) === "object") i.merge(g, a.nodeType ? [a] : a);
                    else if (!ar.test(a)) g.push(t.createTextNode(a));
            else {
                for (u = u || x.appendChild(t.createElement("div")), c = (sn.exec(a) || ["", ""])[1].toLowerCase(), f = ce[c] || ce._default, u.innerHTML = f[1] + i.htmlPrefilter(a) + f[2], y = f[0]; y--;) u = u.lastChild;
                i.merge(g, u.childNodes), u = x.firstChild, u.textContent = ""
            }
            for (x.textContent = "", v = 0; a = g[v++];) {
                if (r && i.inArray(a, r) > -1) {
                    o && o.push(a);
                    continue
                }
                if (h = ze(a), u = ne(x.appendChild(a), "script"), h && Dt(u), n)
                    for (y = 0; a = u[y++];) fn.test(a.type || "") && n.push(a)
            }
            return x
        }
        var cn = /^([^.]*)(?:\.(.+)|)/;

        function Ve() {
            return !0
        }

        function Xe() {
            return !1
        }

        function ur(e, t) {
            return e === sr() == (t === "focus")
        }

        function sr() {
            try {
                return I.activeElement
            } catch {}
        }

        function jt(e, t, n, r, o, a) {
            var u, c;
            if (typeof t == "object") {
                typeof n != "string" && (r = r || n, n = void 0);
                for (c in t) jt(e, c, n, r, t[c], a);
                return e
            }
            if (r == null && o == null ? (o = n, r = n = void 0) : o == null && (typeof n == "string" ? (o = r, r = void 0) : (o = r, r = n, n = void 0)), o === !1) o = Xe;
            else if (!o) return e;
            return a === 1 && (u = o, o = function(f) {
                return i().off(f), u.apply(this, arguments)
            }, o.guid = u.guid || (u.guid = i.guid++)), e.each(function() {
                i.event.add(this, t, o, r, n)
            })
        }
        i.event = {
            global: {},
            add: function(e, t, n, r, o) {
                var a, u, c, f, h, y, x, g, v, A, P, E = k.get(e);
                if (tt(e))
                    for (n.handler && (a = n, n = a.handler, o = a.selector), o && i.find.matchesSelector(Le, o), n.guid || (n.guid = i.guid++), (f = E.events) || (f = E.events = Object.create(null)), (u = E.handle) || (u = E.handle = function(J) {
                            return typeof i < "u" && i.event.triggered !== J.type ? i.event.dispatch.apply(e, arguments) : void 0
                        }), t = (t || "").match(me) || [""], h = t.length; h--;) c = cn.exec(t[h]) || [], v = P = c[1], A = (c[2] || "").split(".").sort(), v && (x = i.event.special[v] || {}, v = (o ? x.delegateType : x.bindType) || v, x = i.event.special[v] || {}, y = i.extend({
                        type: v,
                        origType: P,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: o,
                        needsContext: o && i.expr.match.needsContext.test(o),
                        namespace: A.join(".")
                    }, a), (g = f[v]) || (g = f[v] = [], g.delegateCount = 0, (!x.setup || x.setup.call(e, r, A, u) === !1) && e.addEventListener && e.addEventListener(v, u)), x.add && (x.add.call(e, y), y.handler.guid || (y.handler.guid = n.guid)), o ? g.splice(g.delegateCount++, 0, y) : g.push(y), i.event.global[v] = !0)
            },
            remove: function(e, t, n, r, o) {
                var a, u, c, f, h, y, x, g, v, A, P, E = k.hasData(e) && k.get(e);
                if (!(!E || !(f = E.events))) {
                    for (t = (t || "").match(me) || [""], h = t.length; h--;) {
                        if (c = cn.exec(t[h]) || [], v = P = c[1], A = (c[2] || "").split(".").sort(), !v) {
                            for (v in f) i.event.remove(e, v + t[h], n, r, !0);
                            continue
                        }
                        for (x = i.event.special[v] || {}, v = (r ? x.delegateType : x.bindType) || v, g = f[v] || [], c = c[2] && new RegExp("(^|\\.)" + A.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = a = g.length; a--;) y = g[a], (o || P === y.origType) && (!n || n.guid === y.guid) && (!c || c.test(y.namespace)) && (!r || r === y.selector || r === "**" && y.selector) && (g.splice(a, 1), y.selector && g.delegateCount--, x.remove && x.remove.call(e, y));
                        u && !g.length && ((!x.teardown || x.teardown.call(e, A, E.handle) === !1) && i.removeEvent(e, v, E.handle), delete f[v])
                    }
                    i.isEmptyObject(f) && k.remove(e, "handle events")
                }
            },
            dispatch: function(e) {
                var t, n, r, o, a, u, c = new Array(arguments.length),
                    f = i.event.fix(e),
                    h = (k.get(this, "events") || Object.create(null))[f.type] || [],
                    y = i.event.special[f.type] || {};
                for (c[0] = f, t = 1; t < arguments.length; t++) c[t] = arguments[t];
                if (f.delegateTarget = this, !(y.preDispatch && y.preDispatch.call(this, f) === !1)) {
                    for (u = i.event.handlers.call(this, f, h), t = 0;
                        (o = u[t++]) && !f.isPropagationStopped();)
                        for (f.currentTarget = o.elem, n = 0;
                            (a = o.handlers[n++]) && !f.isImmediatePropagationStopped();)(!f.rnamespace || a.namespace === !1 || f.rnamespace.test(a.namespace)) && (f.handleObj = a, f.data = a.data, r = ((i.event.special[a.origType] || {}).handle || a.handler).apply(o.elem, c), r !== void 0 && (f.result = r) === !1 && (f.preventDefault(), f.stopPropagation()));
                    return y.postDispatch && y.postDispatch.call(this, f), f.result
                }
            },
            handlers: function(e, t) {
                var n, r, o, a, u, c = [],
                    f = t.delegateCount,
                    h = e.target;
                if (f && h.nodeType && !(e.type === "click" && e.button >= 1)) {
                    for (; h !== this; h = h.parentNode || this)
                        if (h.nodeType === 1 && !(e.type === "click" && h.disabled === !0)) {
                            for (a = [], u = {}, n = 0; n < f; n++) r = t[n], o = r.selector + " ", u[o] === void 0 && (u[o] = r.needsContext ? i(o, this).index(h) > -1 : i.find(o, this, null, [h]).length), u[o] && a.push(r);
                            a.length && c.push({
                                elem: h,
                                handlers: a
                            })
                        }
                }
                return h = this, f < t.length && c.push({
                    elem: h,
                    handlers: t.slice(f)
                }), c
            },
            addProp: function(e, t) {
                Object.defineProperty(i.Event.prototype, e, {
                    enumerable: !0,
                    configurable: !0,
                    get: T(t) ? function() {
                        if (this.originalEvent) return t(this.originalEvent)
                    } : function() {
                        if (this.originalEvent) return this.originalEvent[e]
                    },
                    set: function(n) {
                        Object.defineProperty(this, e, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: n
                        })
                    }
                })
            },
            fix: function(e) {
                return e[i.expando] ? e : new i.Event(e)
            },
            special: {
                load: {
                    noBubble: !0
                },
                click: {
                    setup: function(e) {
                        var t = this || e;
                        return it.test(t.type) && t.click && le(t, "input") && yt(t, "click", Ve), !1
                    },
                    trigger: function(e) {
                        var t = this || e;
                        return it.test(t.type) && t.click && le(t, "input") && yt(t, "click"), !0
                    },
                    _default: function(e) {
                        var t = e.target;
                        return it.test(t.type) && t.click && le(t, "input") && k.get(t, "click") || le(t, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        e.result !== void 0 && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            }
        };

        function yt(e, t, n) {
            if (!n) {
                k.get(e, t) === void 0 && i.event.add(e, t, Ve);
                return
            }
            k.set(e, t, !1), i.event.add(e, t, {
                namespace: !1,
                handler: function(r) {
                    var o, a, u = k.get(this, t);
                    if (r.isTrigger & 1 && this[t]) {
                        if (u.length)(i.event.special[t] || {}).delegateType && r.stopPropagation();
                        else if (u = ve.call(arguments), k.set(this, t, u), o = n(this, t), this[t](), a = k.get(this, t), u !== a || o ? k.set(this, t, !1) : a = {}, u !== a) return r.stopImmediatePropagation(), r.preventDefault(), a && a.value
                    } else u.length && (k.set(this, t, {
                        value: i.event.trigger(i.extend(u[0], i.Event.prototype), u.slice(1), this)
                    }), r.stopImmediatePropagation())
                }
            })
        }
        i.removeEvent = function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n)
        }, i.Event = function(e, t) {
            if (!(this instanceof i.Event)) return new i.Event(e, t);
            e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === void 0 && e.returnValue === !1 ? Ve : Xe, this.target = e.target && e.target.nodeType === 3 ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && i.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[i.expando] = !0
        }, i.Event.prototype = {
            constructor: i.Event,
            isDefaultPrevented: Xe,
            isPropagationStopped: Xe,
            isImmediatePropagationStopped: Xe,
            isSimulated: !1,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = Ve, e && !this.isSimulated && e.preventDefault()
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = Ve, e && !this.isSimulated && e.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = Ve, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, i.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            char: !0,
            code: !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: !0
        }, i.event.addProp), i.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            i.event.special[e] = {
                setup: function() {
                    return yt(this, e, ur), !1
                },
                trigger: function() {
                    return yt(this, e), !0
                },
                _default: function(n) {
                    return k.get(n.target, e)
                },
                delegateType: t
            }
        }), i.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(e, t) {
            i.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(n) {
                    var r, o = this,
                        a = n.relatedTarget,
                        u = n.handleObj;
                    return (!a || a !== o && !i.contains(o, a)) && (n.type = u.origType, r = u.handler.apply(this, arguments), n.type = t), r
                }
            }
        }), i.fn.extend({
            on: function(e, t, n, r) {
                return jt(this, e, t, n, r)
            },
            one: function(e, t, n, r) {
                return jt(this, e, t, n, r, 1)
            },
            off: function(e, t, n) {
                var r, o;
                if (e && e.preventDefault && e.handleObj) return r = e.handleObj, i(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                if (typeof e == "object") {
                    for (o in e) this.off(o, t, e[o]);
                    return this
                }
                return (t === !1 || typeof t == "function") && (n = t, t = void 0), n === !1 && (n = Xe), this.each(function() {
                    i.event.remove(this, e, n, t)
                })
            }
        });
        var fr = /<script|<style|<link/i,
            lr = /checked\s*(?:[^=]|=\s*.checked.)/i,
            cr = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

        function dn(e, t) {
            return le(e, "table") && le(t.nodeType !== 11 ? t : t.firstChild, "tr") && i(e).children("tbody")[0] || e
        }

        function dr(e) {
            return e.type = (e.getAttribute("type") !== null) + "/" + e.type, e
        }

        function pr(e) {
            return (e.type || "").slice(0, 5) === "true/" ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
        }

        function pn(e, t) {
            var n, r, o, a, u, c, f;
            if (t.nodeType === 1) {
                if (k.hasData(e) && (a = k.get(e), f = a.events, f)) {
                    k.remove(t, "handle events");
                    for (o in f)
                        for (n = 0, r = f[o].length; n < r; n++) i.event.add(t, o, f[o][n])
                }
                te.hasData(e) && (u = te.access(e), c = i.extend({}, u), te.set(t, c))
            }
        }

        function hr(e, t) {
            var n = t.nodeName.toLowerCase();
            n === "input" && it.test(e.type) ? t.checked = e.checked : (n === "input" || n === "textarea") && (t.defaultValue = e.defaultValue)
        }

        function Ge(e, t, n, r) {
            t = Ye(t);
            var o, a, u, c, f, h, y = 0,
                x = e.length,
                g = x - 1,
                v = t[0],
                A = T(v);
            if (A || x > 1 && typeof v == "string" && !L.checkClone && lr.test(v)) return e.each(function(P) {
                var E = e.eq(P);
                A && (t[0] = v.call(this, P, E.html())), Ge(E, t, n, r)
            });
            if (x && (o = ln(t, e[0].ownerDocument, !1, e, r), a = o.firstChild, o.childNodes.length === 1 && (o = a), a || r)) {
                for (u = i.map(ne(o, "script"), dr), c = u.length; y < x; y++) f = o, y !== g && (f = i.clone(f, !0, !0), c && i.merge(u, ne(f, "script"))), n.call(e[y], f, y);
                if (c)
                    for (h = u[u.length - 1].ownerDocument, i.map(u, pr), y = 0; y < c; y++) f = u[y], fn.test(f.type || "") && !k.access(f, "globalEval") && i.contains(h, f) && (f.src && (f.type || "").toLowerCase() !== "module" ? i._evalUrl && !f.noModule && i._evalUrl(f.src, {
                        nonce: f.nonce || f.getAttribute("nonce")
                    }, h) : Fe(f.textContent.replace(cr, ""), f, h))
            }
            return e
        }

        function hn(e, t, n) {
            for (var r, o = t ? i.filter(t, e) : e, a = 0;
                (r = o[a]) != null; a++) !n && r.nodeType === 1 && i.cleanData(ne(r)), r.parentNode && (n && ze(r) && Dt(ne(r, "script")), r.parentNode.removeChild(r));
            return e
        }
        i.extend({
            htmlPrefilter: function(e) {
                return e
            },
            clone: function(e, t, n) {
                var r, o, a, u, c = e.cloneNode(!0),
                    f = ze(e);
                if (!L.noCloneChecked && (e.nodeType === 1 || e.nodeType === 11) && !i.isXMLDoc(e))
                    for (u = ne(c), a = ne(e), r = 0, o = a.length; r < o; r++) hr(a[r], u[r]);
                if (t)
                    if (n)
                        for (a = a || ne(e), u = u || ne(c), r = 0, o = a.length; r < o; r++) pn(a[r], u[r]);
                    else pn(e, c);
                return u = ne(c, "script"), u.length > 0 && Dt(u, !f && ne(e, "script")), c
            },
            cleanData: function(e) {
                for (var t, n, r, o = i.event.special, a = 0;
                    (n = e[a]) !== void 0; a++)
                    if (tt(n)) {
                        if (t = n[k.expando]) {
                            if (t.events)
                                for (r in t.events) o[r] ? i.event.remove(n, r) : i.removeEvent(n, r, t.handle);
                            n[k.expando] = void 0
                        }
                        n[te.expando] && (n[te.expando] = void 0)
                    }
            }
        }), i.fn.extend({
            detach: function(e) {
                return hn(this, e, !0)
            },
            remove: function(e) {
                return hn(this, e)
            },
            text: function(e) {
                return we(this, function(t) {
                    return t === void 0 ? i.text(this) : this.empty().each(function() {
                        (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) && (this.textContent = t)
                    })
                }, null, e, arguments.length)
            },
            append: function() {
                return Ge(this, arguments, function(e) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var t = dn(this, e);
                        t.appendChild(e)
                    }
                })
            },
            prepend: function() {
                return Ge(this, arguments, function(e) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var t = dn(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            },
            before: function() {
                return Ge(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function() {
                return Ge(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            empty: function() {
                for (var e, t = 0;
                    (e = this[t]) != null; t++) e.nodeType === 1 && (i.cleanData(ne(e, !1)), e.textContent = "");
                return this
            },
            clone: function(e, t) {
                return e = e ? ? !1, t = t ? ? e, this.map(function() {
                    return i.clone(this, e, t)
                })
            },
            html: function(e) {
                return we(this, function(t) {
                    var n = this[0] || {},
                        r = 0,
                        o = this.length;
                    if (t === void 0 && n.nodeType === 1) return n.innerHTML;
                    if (typeof t == "string" && !fr.test(t) && !ce[(sn.exec(t) || ["", ""])[1].toLowerCase()]) {
                        t = i.htmlPrefilter(t);
                        try {
                            for (; r < o; r++) n = this[r] || {}, n.nodeType === 1 && (i.cleanData(ne(n, !1)), n.innerHTML = t);
                            n = 0
                        } catch {}
                    }
                    n && this.empty().append(t)
                }, null, e, arguments.length)
            },
            replaceWith: function() {
                var e = [];
                return Ge(this, arguments, function(t) {
                    var n = this.parentNode;
                    i.inArray(this, e) < 0 && (i.cleanData(ne(this)), n && n.replaceChild(t, this))
                }, e)
            }
        }), i.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, t) {
            i.fn[e] = function(n) {
                for (var r, o = [], a = i(n), u = a.length - 1, c = 0; c <= u; c++) r = c === u ? this : this.clone(!0), i(a[c])[t](r), Je.apply(o, r.get());
                return this.pushStack(o)
            }
        });
        var qt = new RegExp("^(" + on + ")(?!px)[a-z%]+$", "i"),
            Lt = /^--/,
            vt = function(e) {
                var t = e.ownerDocument.defaultView;
                return (!t || !t.opener) && (t = H), t.getComputedStyle(e)
            },
            gn = function(e, t, n) {
                var r, o, a = {};
                for (o in t) a[o] = e.style[o], e.style[o] = t[o];
                r = n.call(e);
                for (o in t) e.style[o] = a[o];
                return r
            },
            gr = new RegExp(Ce.join("|"), "i"),
            yn = "[\\x20\\t\\r\\n\\f]",
            yr = new RegExp("^" + yn + "+|((?:^|[^\\\\])(?:\\\\.)*)" + yn + "+$", "g");
        (function() {
            function e() {
                if (h) {
                    f.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", h.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", Le.appendChild(f).appendChild(h);
                    var y = H.getComputedStyle(h);
                    n = y.top !== "1%", c = t(y.marginLeft) === 12, h.style.right = "60%", a = t(y.right) === 36, r = t(y.width) === 36, h.style.position = "absolute", o = t(h.offsetWidth / 3) === 12, Le.removeChild(f), h = null
                }
            }

            function t(y) {
                return Math.round(parseFloat(y))
            }
            var n, r, o, a, u, c, f = I.createElement("div"),
                h = I.createElement("div");
            h.style && (h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", L.clearCloneStyle = h.style.backgroundClip === "content-box", i.extend(L, {
                boxSizingReliable: function() {
                    return e(), r
                },
                pixelBoxStyles: function() {
                    return e(), a
                },
                pixelPosition: function() {
                    return e(), n
                },
                reliableMarginLeft: function() {
                    return e(), c
                },
                scrollboxSize: function() {
                    return e(), o
                },
                reliableTrDimensions: function() {
                    var y, x, g, v;
                    return u == null && (y = I.createElement("table"), x = I.createElement("tr"), g = I.createElement("div"), y.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", x.style.cssText = "border:1px solid", x.style.height = "1px", g.style.height = "9px", g.style.display = "block", Le.appendChild(y).appendChild(x).appendChild(g), v = H.getComputedStyle(x), u = parseInt(v.height, 10) + parseInt(v.borderTopWidth, 10) + parseInt(v.borderBottomWidth, 10) === x.offsetHeight, Le.removeChild(y)), u
                }
            }))
        })();

        function ot(e, t, n) {
            var r, o, a, u, c = Lt.test(t),
                f = e.style;
            return n = n || vt(e), n && (u = n.getPropertyValue(t) || n[t], c && u && (u = u.replace(yr, "$1") || void 0), u === "" && !ze(e) && (u = i.style(e, t)), !L.pixelBoxStyles() && qt.test(u) && gr.test(t) && (r = f.width, o = f.minWidth, a = f.maxWidth, f.minWidth = f.maxWidth = f.width = u, u = n.width, f.width = r, f.minWidth = o, f.maxWidth = a)), u !== void 0 ? u + "" : u
        }

        function vn(e, t) {
            return {
                get: function() {
                    if (e()) {
                        delete this.get;
                        return
                    }
                    return (this.get = t).apply(this, arguments)
                }
            }
        }
        var mn = ["Webkit", "Moz", "ms"],
            bn = I.createElement("div").style,
            xn = {};

        function vr(e) {
            for (var t = e[0].toUpperCase() + e.slice(1), n = mn.length; n--;)
                if (e = mn[n] + t, e in bn) return e
        }

        function Ht(e) {
            var t = i.cssProps[e] || xn[e];
            return t || (e in bn ? e : xn[e] = vr(e) || e)
        }
        var mr = /^(none|table(?!-c[ea]).+)/,
            br = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            wn = {
                letterSpacing: "0",
                fontWeight: "400"
            };

        function Cn(e, t, n) {
            var r = rt.exec(t);
            return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
        }

        function It(e, t, n, r, o, a) {
            var u = t === "width" ? 1 : 0,
                c = 0,
                f = 0;
            if (n === (r ? "border" : "content")) return 0;
            for (; u < 4; u += 2) n === "margin" && (f += i.css(e, n + Ce[u], !0, o)), r ? (n === "content" && (f -= i.css(e, "padding" + Ce[u], !0, o)), n !== "margin" && (f -= i.css(e, "border" + Ce[u] + "Width", !0, o))) : (f += i.css(e, "padding" + Ce[u], !0, o), n !== "padding" ? f += i.css(e, "border" + Ce[u] + "Width", !0, o) : c += i.css(e, "border" + Ce[u] + "Width", !0, o));
            return !r && a >= 0 && (f += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - a - f - c - .5)) || 0), f
        }

        function Tn(e, t, n) {
            var r = vt(e),
                o = !L.boxSizingReliable() || n,
                a = o && i.css(e, "boxSizing", !1, r) === "border-box",
                u = a,
                c = ot(e, t, r),
                f = "offset" + t[0].toUpperCase() + t.slice(1);
            if (qt.test(c)) {
                if (!n) return c;
                c = "auto"
            }
            return (!L.boxSizingReliable() && a || !L.reliableTrDimensions() && le(e, "tr") || c === "auto" || !parseFloat(c) && i.css(e, "display", !1, r) === "inline") && e.getClientRects().length && (a = i.css(e, "boxSizing", !1, r) === "border-box", u = f in e, u && (c = e[f])), c = parseFloat(c) || 0, c + It(e, t, n || (a ? "border" : "content"), u, r, c) + "px"
        }
        i.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = ot(e, "opacity");
                            return n === "" ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                gridArea: !0,
                gridColumn: !0,
                gridColumnEnd: !0,
                gridColumnStart: !0,
                gridRow: !0,
                gridRowEnd: !0,
                gridRowStart: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {},
            style: function(e, t, n, r) {
                if (!(!e || e.nodeType === 3 || e.nodeType === 8 || !e.style)) {
                    var o, a, u, c = be(t),
                        f = Lt.test(t),
                        h = e.style;
                    if (f || (t = Ht(c)), u = i.cssHooks[t] || i.cssHooks[c], n !== void 0) {
                        if (a = typeof n, a === "string" && (o = rt.exec(n)) && o[1] && (n = an(e, t, o), a = "number"), n == null || n !== n) return;
                        a === "number" && !f && (n += o && o[3] || (i.cssNumber[c] ? "" : "px")), !L.clearCloneStyle && n === "" && t.indexOf("background") === 0 && (h[t] = "inherit"), (!u || !("set" in u) || (n = u.set(e, n, r)) !== void 0) && (f ? h.setProperty(t, n) : h[t] = n)
                    } else return u && "get" in u && (o = u.get(e, !1, r)) !== void 0 ? o : h[t]
                }
            },
            css: function(e, t, n, r) {
                var o, a, u, c = be(t),
                    f = Lt.test(t);
                return f || (t = Ht(c)), u = i.cssHooks[t] || i.cssHooks[c], u && "get" in u && (o = u.get(e, !0, n)), o === void 0 && (o = ot(e, t, r)), o === "normal" && t in wn && (o = wn[t]), n === "" || n ? (a = parseFloat(o), n === !0 || isFinite(a) ? a || 0 : o) : o
            }
        }), i.each(["height", "width"], function(e, t) {
            i.cssHooks[t] = {
                get: function(n, r, o) {
                    if (r) return mr.test(i.css(n, "display")) && (!n.getClientRects().length || !n.getBoundingClientRect().width) ? gn(n, br, function() {
                        return Tn(n, t, o)
                    }) : Tn(n, t, o)
                },
                set: function(n, r, o) {
                    var a, u = vt(n),
                        c = !L.scrollboxSize() && u.position === "absolute",
                        f = c || o,
                        h = f && i.css(n, "boxSizing", !1, u) === "border-box",
                        y = o ? It(n, t, o, h, u) : 0;
                    return h && c && (y -= Math.ceil(n["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(u[t]) - It(n, t, "border", !1, u) - .5)), y && (a = rt.exec(r)) && (a[3] || "px") !== "px" && (n.style[t] = r, r = i.css(n, t)), Cn(n, r, y)
                }
            }
        }), i.cssHooks.marginLeft = vn(L.reliableMarginLeft, function(e, t) {
            if (t) return (parseFloat(ot(e, "marginLeft")) || e.getBoundingClientRect().left - gn(e, {
                marginLeft: 0
            }, function() {
                return e.getBoundingClientRect().left
            })) + "px"
        }), i.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(e, t) {
            i.cssHooks[e + t] = {
                expand: function(n) {
                    for (var r = 0, o = {}, a = typeof n == "string" ? n.split(" ") : [n]; r < 4; r++) o[e + Ce[r] + t] = a[r] || a[r - 2] || a[0];
                    return o
                }
            }, e !== "margin" && (i.cssHooks[e + t].set = Cn)
        }), i.fn.extend({
            css: function(e, t) {
                return we(this, function(n, r, o) {
                    var a, u, c = {},
                        f = 0;
                    if (Array.isArray(r)) {
                        for (a = vt(n), u = r.length; f < u; f++) c[r[f]] = i.css(n, r[f], !1, a);
                        return c
                    }
                    return o !== void 0 ? i.style(n, r, o) : i.css(n, r)
                }, e, t, arguments.length > 1)
            }
        });

        function re(e, t, n, r, o) {
            return new re.prototype.init(e, t, n, r, o)
        }
        i.Tween = re, re.prototype = {
            constructor: re,
            init: function(e, t, n, r, o, a) {
                this.elem = e, this.prop = n, this.easing = o || i.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = a || (i.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var e = re.propHooks[this.prop];
                return e && e.get ? e.get(this) : re.propHooks._default.get(this)
            },
            run: function(e) {
                var t, n = re.propHooks[this.prop];
                return this.options.duration ? this.pos = t = i.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : re.propHooks._default.set(this), this
            }
        }, re.prototype.init.prototype = re.prototype, re.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return e.elem.nodeType !== 1 || e.elem[e.prop] != null && e.elem.style[e.prop] == null ? e.elem[e.prop] : (t = i.css(e.elem, e.prop, ""), !t || t === "auto" ? 0 : t)
                },
                set: function(e) {
                    i.fx.step[e.prop] ? i.fx.step[e.prop](e) : e.elem.nodeType === 1 && (i.cssHooks[e.prop] || e.elem.style[Ht(e.prop)] != null) ? i.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                }
            }
        }, re.propHooks.scrollTop = re.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, i.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            },
            _default: "swing"
        }, i.fx = re.prototype.init, i.fx.step = {};
        var Qe, mt, xr = /^(?:toggle|show|hide)$/,
            wr = /queueHooks$/;

        function Ot() {
            mt && (I.hidden === !1 && H.requestAnimationFrame ? H.requestAnimationFrame(Ot) : H.setTimeout(Ot, i.fx.interval), i.fx.tick())
        }

        function Sn() {
            return H.setTimeout(function() {
                Qe = void 0
            }), Qe = Date.now()
        }

        function bt(e, t) {
            var n, r = 0,
                o = {
                    height: e
                };
            for (t = t ? 1 : 0; r < 4; r += 2 - t) n = Ce[r], o["margin" + n] = o["padding" + n] = e;
            return t && (o.opacity = o.width = e), o
        }

        function En(e, t, n) {
            for (var r, o = (he.tweeners[t] || []).concat(he.tweeners["*"]), a = 0, u = o.length; a < u; a++)
                if (r = o[a].call(n, t, e)) return r
        }

        function Cr(e, t, n) {
            var r, o, a, u, c, f, h, y, x = "width" in t || "height" in t,
                g = this,
                v = {},
                A = e.style,
                P = e.nodeType && gt(e),
                E = k.get(e, "fxshow");
            n.queue || (u = i._queueHooks(e, "fx"), u.unqueued == null && (u.unqueued = 0, c = u.empty.fire, u.empty.fire = function() {
                u.unqueued || c()
            }), u.unqueued++, g.always(function() {
                g.always(function() {
                    u.unqueued--, i.queue(e, "fx").length || u.empty.fire()
                })
            }));
            for (r in t)
                if (o = t[r], xr.test(o)) {
                    if (delete t[r], a = a || o === "toggle", o === (P ? "hide" : "show"))
                        if (o === "show" && E && E[r] !== void 0) P = !0;
                        else continue;
                    v[r] = E && E[r] || i.style(e, r)
                }
            if (f = !i.isEmptyObject(t), !(!f && i.isEmptyObject(v))) {
                x && e.nodeType === 1 && (n.overflow = [A.overflow, A.overflowX, A.overflowY], h = E && E.display, h == null && (h = k.get(e, "display")), y = i.css(e, "display"), y === "none" && (h ? y = h : (Ue([e], !0), h = e.style.display || h, y = i.css(e, "display"), Ue([e]))), (y === "inline" || y === "inline-block" && h != null) && i.css(e, "float") === "none" && (f || (g.done(function() {
                    A.display = h
                }), h == null && (y = A.display, h = y === "none" ? "" : y)), A.display = "inline-block")), n.overflow && (A.overflow = "hidden", g.always(function() {
                    A.overflow = n.overflow[0], A.overflowX = n.overflow[1], A.overflowY = n.overflow[2]
                })), f = !1;
                for (r in v) f || (E ? "hidden" in E && (P = E.hidden) : E = k.access(e, "fxshow", {
                    display: h
                }), a && (E.hidden = !P), P && Ue([e], !0), g.done(function() {
                    P || Ue([e]), k.remove(e, "fxshow");
                    for (r in v) i.style(e, r, v[r])
                })), f = En(P ? E[r] : 0, r, g), r in E || (E[r] = f.start, P && (f.end = f.start, f.start = 0))
            }
        }

        function Tr(e, t) {
            var n, r, o, a, u;
            for (n in e)
                if (r = be(n), o = t[r], a = e[n], Array.isArray(a) && (o = a[1], a = e[n] = a[0]), n !== r && (e[r] = a, delete e[n]), u = i.cssHooks[r], u && "expand" in u) {
                    a = u.expand(a), delete e[r];
                    for (n in a) n in e || (e[n] = a[n], t[n] = o)
                } else t[r] = o
        }

        function he(e, t, n) {
            var r, o, a = 0,
                u = he.prefilters.length,
                c = i.Deferred().always(function() {
                    delete f.elem
                }),
                f = function() {
                    if (o) return !1;
                    for (var x = Qe || Sn(), g = Math.max(0, h.startTime + h.duration - x), v = g / h.duration || 0, A = 1 - v, P = 0, E = h.tweens.length; P < E; P++) h.tweens[P].run(A);
                    return c.notifyWith(e, [h, A, g]), A < 1 && E ? g : (E || c.notifyWith(e, [h, 1, 0]), c.resolveWith(e, [h]), !1)
                },
                h = c.promise({
                    elem: e,
                    props: i.extend({}, t),
                    opts: i.extend(!0, {
                        specialEasing: {},
                        easing: i.easing._default
                    }, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: Qe || Sn(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(x, g) {
                        var v = i.Tween(e, h.opts, x, g, h.opts.specialEasing[x] || h.opts.easing);
                        return h.tweens.push(v), v
                    },
                    stop: function(x) {
                        var g = 0,
                            v = x ? h.tweens.length : 0;
                        if (o) return this;
                        for (o = !0; g < v; g++) h.tweens[g].run(1);
                        return x ? (c.notifyWith(e, [h, 1, 0]), c.resolveWith(e, [h, x])) : c.rejectWith(e, [h, x]), this
                    }
                }),
                y = h.props;
            for (Tr(y, h.opts.specialEasing); a < u; a++)
                if (r = he.prefilters[a].call(h, e, y, h.opts), r) return T(r.stop) && (i._queueHooks(h.elem, h.opts.queue).stop = r.stop.bind(r)), r;
            return i.map(y, En, h), T(h.opts.start) && h.opts.start.call(e, h), h.progress(h.opts.progress).done(h.opts.done, h.opts.complete).fail(h.opts.fail).always(h.opts.always), i.fx.timer(i.extend(f, {
                elem: e,
                anim: h,
                queue: h.opts.queue
            })), h
        }
        i.Animation = i.extend(he, {
                tweeners: {
                    "*": [function(e, t) {
                        var n = this.createTween(e, t);
                        return an(n.elem, e, rt.exec(t), n), n
                    }]
                },
                tweener: function(e, t) {
                    T(e) ? (t = e, e = ["*"]) : e = e.match(me);
                    for (var n, r = 0, o = e.length; r < o; r++) n = e[r], he.tweeners[n] = he.tweeners[n] || [], he.tweeners[n].unshift(t)
                },
                prefilters: [Cr],
                prefilter: function(e, t) {
                    t ? he.prefilters.unshift(e) : he.prefilters.push(e)
                }
            }), i.speed = function(e, t, n) {
                var r = e && typeof e == "object" ? i.extend({}, e) : {
                    complete: n || !n && t || T(e) && e,
                    duration: e,
                    easing: n && t || t && !T(t) && t
                };
                return i.fx.off ? r.duration = 0 : typeof r.duration != "number" && (r.duration in i.fx.speeds ? r.duration = i.fx.speeds[r.duration] : r.duration = i.fx.speeds._default), (r.queue == null || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                    T(r.old) && r.old.call(this), r.queue && i.dequeue(this, r.queue)
                }, r
            }, i.fn.extend({
                fadeTo: function(e, t, n, r) {
                    return this.filter(gt).css("opacity", 0).show().end().animate({
                        opacity: t
                    }, e, n, r)
                },
                animate: function(e, t, n, r) {
                    var o = i.isEmptyObject(e),
                        a = i.speed(t, n, r),
                        u = function() {
                            var c = he(this, i.extend({}, e), a);
                            (o || k.get(this, "finish")) && c.stop(!0)
                        };
                    return u.finish = u, o || a.queue === !1 ? this.each(u) : this.queue(a.queue, u)
                },
                stop: function(e, t, n) {
                    var r = function(o) {
                        var a = o.stop;
                        delete o.stop, a(n)
                    };
                    return typeof e != "string" && (n = t, t = e, e = void 0), t && this.queue(e || "fx", []), this.each(function() {
                        var o = !0,
                            a = e != null && e + "queueHooks",
                            u = i.timers,
                            c = k.get(this);
                        if (a) c[a] && c[a].stop && r(c[a]);
                        else
                            for (a in c) c[a] && c[a].stop && wr.test(a) && r(c[a]);
                        for (a = u.length; a--;) u[a].elem === this && (e == null || u[a].queue === e) && (u[a].anim.stop(n), o = !1, u.splice(a, 1));
                        (o || !n) && i.dequeue(this, e)
                    })
                },
                finish: function(e) {
                    return e !== !1 && (e = e || "fx"), this.each(function() {
                        var t, n = k.get(this),
                            r = n[e + "queue"],
                            o = n[e + "queueHooks"],
                            a = i.timers,
                            u = r ? r.length : 0;
                        for (n.finish = !0, i.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = a.length; t--;) a[t].elem === this && a[t].queue === e && (a[t].anim.stop(!0), a.splice(t, 1));
                        for (t = 0; t < u; t++) r[t] && r[t].finish && r[t].finish.call(this);
                        delete n.finish
                    })
                }
            }), i.each(["toggle", "show", "hide"], function(e, t) {
                var n = i.fn[t];
                i.fn[t] = function(r, o, a) {
                    return r == null || typeof r == "boolean" ? n.apply(this, arguments) : this.animate(bt(t, !0), r, o, a)
                }
            }), i.each({
                slideDown: bt("show"),
                slideUp: bt("hide"),
                slideToggle: bt("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(e, t) {
                i.fn[e] = function(n, r, o) {
                    return this.animate(t, n, r, o)
                }
            }), i.timers = [], i.fx.tick = function() {
                var e, t = 0,
                    n = i.timers;
                for (Qe = Date.now(); t < n.length; t++) e = n[t], !e() && n[t] === e && n.splice(t--, 1);
                n.length || i.fx.stop(), Qe = void 0
            }, i.fx.timer = function(e) {
                i.timers.push(e), i.fx.start()
            }, i.fx.interval = 13, i.fx.start = function() {
                mt || (mt = !0, Ot())
            }, i.fx.stop = function() {
                mt = null
            }, i.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, i.fn.delay = function(e, t) {
                return e = i.fx && i.fx.speeds[e] || e, t = t || "fx", this.queue(t, function(n, r) {
                    var o = H.setTimeout(n, e);
                    r.stop = function() {
                        H.clearTimeout(o)
                    }
                })
            },
            function() {
                var e = I.createElement("input"),
                    t = I.createElement("select"),
                    n = t.appendChild(I.createElement("option"));
                e.type = "checkbox", L.checkOn = e.value !== "", L.optSelected = n.selected, e = I.createElement("input"), e.value = "t", e.type = "radio", L.radioValue = e.value === "t"
            }();
        var An, at = i.expr.attrHandle;
        i.fn.extend({
            attr: function(e, t) {
                return we(this, i.attr, e, t, arguments.length > 1)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    i.removeAttr(this, e)
                })
            }
        }), i.extend({
            attr: function(e, t, n) {
                var r, o, a = e.nodeType;
                if (!(a === 3 || a === 8 || a === 2)) {
                    if (typeof e.getAttribute > "u") return i.prop(e, t, n);
                    if ((a !== 1 || !i.isXMLDoc(e)) && (o = i.attrHooks[t.toLowerCase()] || (i.expr.match.bool.test(t) ? An : void 0)), n !== void 0) {
                        if (n === null) {
                            i.removeAttr(e, t);
                            return
                        }
                        return o && "set" in o && (r = o.set(e, n, t)) !== void 0 ? r : (e.setAttribute(t, n + ""), n)
                    }
                    return o && "get" in o && (r = o.get(e, t)) !== null ? r : (r = i.find.attr(e, t), r ? ? void 0)
                }
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!L.radioValue && t === "radio" && le(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t), n && (e.value = n), t
                        }
                    }
                }
            },
            removeAttr: function(e, t) {
                var n, r = 0,
                    o = t && t.match(me);
                if (o && e.nodeType === 1)
                    for (; n = o[r++];) e.removeAttribute(n)
            }
        }), An = {
            set: function(e, t, n) {
                return t === !1 ? i.removeAttr(e, n) : e.setAttribute(n, n), n
            }
        }, i.each(i.expr.match.bool.source.match(/\w+/g), function(e, t) {
            var n = at[t] || i.find.attr;
            at[t] = function(r, o, a) {
                var u, c, f = o.toLowerCase();
                return a || (c = at[f], at[f] = u, u = n(r, o, a) != null ? f : null, at[f] = c), u
            }
        });
        var Sr = /^(?:input|select|textarea|button)$/i,
            Er = /^(?:a|area)$/i;
        i.fn.extend({
            prop: function(e, t) {
                return we(this, i.prop, e, t, arguments.length > 1)
            },
            removeProp: function(e) {
                return this.each(function() {
                    delete this[i.propFix[e] || e]
                })
            }
        }), i.extend({
            prop: function(e, t, n) {
                var r, o, a = e.nodeType;
                if (!(a === 3 || a === 8 || a === 2)) return (a !== 1 || !i.isXMLDoc(e)) && (t = i.propFix[t] || t, o = i.propHooks[t]), n !== void 0 ? o && "set" in o && (r = o.set(e, n, t)) !== void 0 ? r : e[t] = n : o && "get" in o && (r = o.get(e, t)) !== null ? r : e[t]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var t = i.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : Sr.test(e.nodeName) || Er.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            }
        }), L.optSelected || (i.propHooks.selected = {
            get: function(e) {
                var t = e.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex, null
            },
            set: function(e) {
                var t = e.parentNode;
                t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
            }
        }), i.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            i.propFix[this.toLowerCase()] = this
        });

        function He(e) {
            var t = e.match(me) || [];
            return t.join(" ")
        }

        function Ie(e) {
            return e.getAttribute && e.getAttribute("class") || ""
        }

        function Pt(e) {
            return Array.isArray(e) ? e : typeof e == "string" ? e.match(me) || [] : []
        }
        i.fn.extend({
            addClass: function(e) {
                var t, n, r, o, a, u;
                return T(e) ? this.each(function(c) {
                    i(this).addClass(e.call(this, c, Ie(this)))
                }) : (t = Pt(e), t.length ? this.each(function() {
                    if (r = Ie(this), n = this.nodeType === 1 && " " + He(r) + " ", n) {
                        for (a = 0; a < t.length; a++) o = t[a], n.indexOf(" " + o + " ") < 0 && (n += o + " ");
                        u = He(n), r !== u && this.setAttribute("class", u)
                    }
                }) : this)
            },
            removeClass: function(e) {
                var t, n, r, o, a, u;
                return T(e) ? this.each(function(c) {
                    i(this).removeClass(e.call(this, c, Ie(this)))
                }) : arguments.length ? (t = Pt(e), t.length ? this.each(function() {
                    if (r = Ie(this), n = this.nodeType === 1 && " " + He(r) + " ", n) {
                        for (a = 0; a < t.length; a++)
                            for (o = t[a]; n.indexOf(" " + o + " ") > -1;) n = n.replace(" " + o + " ", " ");
                        u = He(n), r !== u && this.setAttribute("class", u)
                    }
                }) : this) : this.attr("class", "")
            },
            toggleClass: function(e, t) {
                var n, r, o, a, u = typeof e,
                    c = u === "string" || Array.isArray(e);
                return T(e) ? this.each(function(f) {
                    i(this).toggleClass(e.call(this, f, Ie(this), t), t)
                }) : typeof t == "boolean" && c ? t ? this.addClass(e) : this.removeClass(e) : (n = Pt(e), this.each(function() {
                    if (c)
                        for (a = i(this), o = 0; o < n.length; o++) r = n[o], a.hasClass(r) ? a.removeClass(r) : a.addClass(r);
                    else(e === void 0 || u === "boolean") && (r = Ie(this), r && k.set(this, "__className__", r), this.setAttribute && this.setAttribute("class", r || e === !1 ? "" : k.get(this, "__className__") || ""))
                }))
            },
            hasClass: function(e) {
                var t, n, r = 0;
                for (t = " " + e + " "; n = this[r++];)
                    if (n.nodeType === 1 && (" " + He(Ie(n)) + " ").indexOf(t) > -1) return !0;
                return !1
            }
        });
        var Ar = /\r/g;
        i.fn.extend({
            val: function(e) {
                var t, n, r, o = this[0];
                return arguments.length ? (r = T(e), this.each(function(a) {
                    var u;
                    this.nodeType === 1 && (r ? u = e.call(this, a, i(this).val()) : u = e, u == null ? u = "" : typeof u == "number" ? u += "" : Array.isArray(u) && (u = i.map(u, function(c) {
                        return c == null ? "" : c + ""
                    })), t = i.valHooks[this.type] || i.valHooks[this.nodeName.toLowerCase()], (!t || !("set" in t) || t.set(this, u, "value") === void 0) && (this.value = u))
                })) : o ? (t = i.valHooks[o.type] || i.valHooks[o.nodeName.toLowerCase()], t && "get" in t && (n = t.get(o, "value")) !== void 0 ? n : (n = o.value, typeof n == "string" ? n.replace(Ar, "") : n ? ? "")) : void 0
            }
        }), i.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = i.find.attr(e, "value");
                        return t ? ? He(i.text(e))
                    }
                },
                select: {
                    get: function(e) {
                        var t, n, r, o = e.options,
                            a = e.selectedIndex,
                            u = e.type === "select-one",
                            c = u ? null : [],
                            f = u ? a + 1 : o.length;
                        for (a < 0 ? r = f : r = u ? a : 0; r < f; r++)
                            if (n = o[r], (n.selected || r === a) && !n.disabled && (!n.parentNode.disabled || !le(n.parentNode, "optgroup"))) {
                                if (t = i(n).val(), u) return t;
                                c.push(t)
                            }
                        return c
                    },
                    set: function(e, t) {
                        for (var n, r, o = e.options, a = i.makeArray(t), u = o.length; u--;) r = o[u], (r.selected = i.inArray(i.valHooks.option.get(r), a) > -1) && (n = !0);
                        return n || (e.selectedIndex = -1), a
                    }
                }
            }
        }), i.each(["radio", "checkbox"], function() {
            i.valHooks[this] = {
                set: function(e, t) {
                    if (Array.isArray(t)) return e.checked = i.inArray(i(e).val(), t) > -1
                }
            }, L.checkOn || (i.valHooks[this].get = function(e) {
                return e.getAttribute("value") === null ? "on" : e.value
            })
        }), L.focusin = "onfocusin" in H;
        var Nn = /^(?:focusinfocus|focusoutblur)$/,
            kn = function(e) {
                e.stopPropagation()
            };
        i.extend(i.event, {
            trigger: function(e, t, n, r) {
                var o, a, u, c, f, h, y, x, g = [n || I],
                    v = _.call(e, "type") ? e.type : e,
                    A = _.call(e, "namespace") ? e.namespace.split(".") : [];
                if (a = x = u = n = n || I, !(n.nodeType === 3 || n.nodeType === 8) && !Nn.test(v + i.event.triggered) && (v.indexOf(".") > -1 && (A = v.split("."), v = A.shift(), A.sort()), f = v.indexOf(":") < 0 && "on" + v, e = e[i.expando] ? e : new i.Event(v, typeof e == "object" && e), e.isTrigger = r ? 2 : 3, e.namespace = A.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + A.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = t == null ? [e] : i.makeArray(t, [e]), y = i.event.special[v] || {}, !(!r && y.trigger && y.trigger.apply(n, t) === !1))) {
                    if (!r && !y.noBubble && !$(n)) {
                        for (c = y.delegateType || v, Nn.test(c + v) || (a = a.parentNode); a; a = a.parentNode) g.push(a), u = a;
                        u === (n.ownerDocument || I) && g.push(u.defaultView || u.parentWindow || H)
                    }
                    for (o = 0;
                        (a = g[o++]) && !e.isPropagationStopped();) x = a, e.type = o > 1 ? c : y.bindType || v, h = (k.get(a, "events") || Object.create(null))[e.type] && k.get(a, "handle"), h && h.apply(a, t), h = f && a[f], h && h.apply && tt(a) && (e.result = h.apply(a, t), e.result === !1 && e.preventDefault());
                    return e.type = v, !r && !e.isDefaultPrevented() && (!y._default || y._default.apply(g.pop(), t) === !1) && tt(n) && f && T(n[v]) && !$(n) && (u = n[f], u && (n[f] = null), i.event.triggered = v, e.isPropagationStopped() && x.addEventListener(v, kn), n[v](), e.isPropagationStopped() && x.removeEventListener(v, kn), i.event.triggered = void 0, u && (n[f] = u)), e.result
                }
            },
            simulate: function(e, t, n) {
                var r = i.extend(new i.Event, n, {
                    type: e,
                    isSimulated: !0
                });
                i.event.trigger(r, null, t)
            }
        }), i.fn.extend({
            trigger: function(e, t) {
                return this.each(function() {
                    i.event.trigger(e, t, this)
                })
            },
            triggerHandler: function(e, t) {
                var n = this[0];
                if (n) return i.event.trigger(e, t, n, !0)
            }
        }), L.focusin || i.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var n = function(r) {
                i.event.simulate(t, r.target, i.event.fix(r))
            };
            i.event.special[t] = {
                setup: function() {
                    var r = this.ownerDocument || this.document || this,
                        o = k.access(r, t);
                    o || r.addEventListener(e, n, !0), k.access(r, t, (o || 0) + 1)
                },
                teardown: function() {
                    var r = this.ownerDocument || this.document || this,
                        o = k.access(r, t) - 1;
                    o ? k.access(r, t, o) : (r.removeEventListener(e, n, !0), k.remove(r, t))
                }
            }
        });
        var ut = H.location,
            Dn = {
                guid: Date.now()
            },
            Rt = /\?/;
        i.parseXML = function(e) {
            var t, n;
            if (!e || typeof e != "string") return null;
            try {
                t = new H.DOMParser().parseFromString(e, "text/xml")
            } catch {}
            return n = t && t.getElementsByTagName("parsererror")[0], (!t || n) && i.error("Invalid XML: " + (n ? i.map(n.childNodes, function(r) {
                return r.textContent
            }).join(`
`) : e)), t
        };
        var Nr = /\[\]$/,
            jn = /\r?\n/g,
            kr = /^(?:submit|button|image|reset|file)$/i,
            Dr = /^(?:input|select|textarea|keygen)/i;

        function Mt(e, t, n, r) {
            var o;
            if (Array.isArray(t)) i.each(t, function(a, u) {
                n || Nr.test(e) ? r(e, u) : Mt(e + "[" + (typeof u == "object" && u != null ? a : "") + "]", u, n, r)
            });
            else if (!n && Ee(t) === "object")
                for (o in t) Mt(e + "[" + o + "]", t[o], n, r);
            else r(e, t)
        }
        i.param = function(e, t) {
            var n, r = [],
                o = function(a, u) {
                    var c = T(u) ? u() : u;
                    r[r.length] = encodeURIComponent(a) + "=" + encodeURIComponent(c ? ? "")
                };
            if (e == null) return "";
            if (Array.isArray(e) || e.jquery && !i.isPlainObject(e)) i.each(e, function() {
                o(this.name, this.value)
            });
            else
                for (n in e) Mt(n, e[n], t, o);
            return r.join("&")
        }, i.fn.extend({
            serialize: function() {
                return i.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var e = i.prop(this, "elements");
                    return e ? i.makeArray(e) : this
                }).filter(function() {
                    var e = this.type;
                    return this.name && !i(this).is(":disabled") && Dr.test(this.nodeName) && !kr.test(e) && (this.checked || !it.test(e))
                }).map(function(e, t) {
                    var n = i(this).val();
                    return n == null ? null : Array.isArray(n) ? i.map(n, function(r) {
                        return {
                            name: t.name,
                            value: r.replace(jn, `\r
`)
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(jn, `\r
`)
                    }
                }).get()
            }
        });
        var jr = /%20/g,
            qr = /#.*$/,
            Lr = /([?&])_=[^&]*/,
            Hr = /^(.*?):[ \t]*([^\r\n]*)$/mg,
            Ir = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Or = /^(?:GET|HEAD)$/,
            Pr = /^\/\//,
            qn = {},
            _t = {},
            Ln = "*/".concat("*"),
            Bt = I.createElement("a");
        Bt.href = ut.href;

        function Hn(e) {
            return function(t, n) {
                typeof t != "string" && (n = t, t = "*");
                var r, o = 0,
                    a = t.toLowerCase().match(me) || [];
                if (T(n))
                    for (; r = a[o++];) r[0] === "+" ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
            }
        }

        function In(e, t, n, r) {
            var o = {},
                a = e === _t;

            function u(c) {
                var f;
                return o[c] = !0, i.each(e[c] || [], function(h, y) {
                    var x = y(t, n, r);
                    if (typeof x == "string" && !a && !o[x]) return t.dataTypes.unshift(x), u(x), !1;
                    if (a) return !(f = x)
                }), f
            }
            return u(t.dataTypes[0]) || !o["*"] && u("*")
        }

        function Ft(e, t) {
            var n, r, o = i.ajaxSettings.flatOptions || {};
            for (n in t) t[n] !== void 0 && ((o[n] ? e : r || (r = {}))[n] = t[n]);
            return r && i.extend(!0, e, r), e
        }

        function Rr(e, t, n) {
            for (var r, o, a, u, c = e.contents, f = e.dataTypes; f[0] === "*";) f.shift(), r === void 0 && (r = e.mimeType || t.getResponseHeader("Content-Type"));
            if (r) {
                for (o in c)
                    if (c[o] && c[o].test(r)) {
                        f.unshift(o);
                        break
                    }
            }
            if (f[0] in n) a = f[0];
            else {
                for (o in n) {
                    if (!f[0] || e.converters[o + " " + f[0]]) {
                        a = o;
                        break
                    }
                    u || (u = o)
                }
                a = a || u
            }
            if (a) return a !== f[0] && f.unshift(a), n[a]
        }

        function Mr(e, t, n, r) {
            var o, a, u, c, f, h = {},
                y = e.dataTypes.slice();
            if (y[1])
                for (u in e.converters) h[u.toLowerCase()] = e.converters[u];
            for (a = y.shift(); a;)
                if (e.responseFields[a] && (n[e.responseFields[a]] = t), !f && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), f = a, a = y.shift(), a) {
                    if (a === "*") a = f;
                    else if (f !== "*" && f !== a) {
                        if (u = h[f + " " + a] || h["* " + a], !u) {
                            for (o in h)
                                if (c = o.split(" "), c[1] === a && (u = h[f + " " + c[0]] || h["* " + c[0]], u)) {
                                    u === !0 ? u = h[o] : h[o] !== !0 && (a = c[0], y.unshift(c[1]));
                                    break
                                }
                        }
                        if (u !== !0)
                            if (u && e.throws) t = u(t);
                            else try {
                                t = u(t)
                            } catch (x) {
                                return {
                                    state: "parsererror",
                                    error: u ? x : "No conversion from " + f + " to " + a
                                }
                            }
                    }
                }
            return {
                state: "success",
                data: t
            }
        }
        i.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: ut.href,
                type: "GET",
                isLocal: Ir.test(ut.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Ln,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": i.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? Ft(Ft(e, i.ajaxSettings), t) : Ft(i.ajaxSettings, e)
            },
            ajaxPrefilter: Hn(qn),
            ajaxTransport: Hn(_t),
            ajax: function(e, t) {
                typeof e == "object" && (t = e, e = void 0), t = t || {};
                var n, r, o, a, u, c, f, h, y, x, g = i.ajaxSetup({}, t),
                    v = g.context || g,
                    A = g.context && (v.nodeType || v.jquery) ? i(v) : i.event,
                    P = i.Deferred(),
                    E = i.Callbacks("once memory"),
                    J = g.statusCode || {},
                    Y = {},
                    ae = {},
                    W = "canceled",
                    O = {
                        readyState: 0,
                        getResponseHeader: function(M) {
                            var Q;
                            if (f) {
                                if (!a)
                                    for (a = {}; Q = Hr.exec(o);) a[Q[1].toLowerCase() + " "] = (a[Q[1].toLowerCase() + " "] || []).concat(Q[2]);
                                Q = a[M.toLowerCase() + " "]
                            }
                            return Q == null ? null : Q.join(", ")
                        },
                        getAllResponseHeaders: function() {
                            return f ? o : null
                        },
                        setRequestHeader: function(M, Q) {
                            return f == null && (M = ae[M.toLowerCase()] = ae[M.toLowerCase()] || M, Y[M] = Q), this
                        },
                        overrideMimeType: function(M) {
                            return f == null && (g.mimeType = M), this
                        },
                        statusCode: function(M) {
                            var Q;
                            if (M)
                                if (f) O.always(M[O.status]);
                                else
                                    for (Q in M) J[Q] = [J[Q], M[Q]];
                            return this
                        },
                        abort: function(M) {
                            var Q = M || W;
                            return n && n.abort(Q), ie(0, Q), this
                        }
                    };
                if (P.promise(O), g.url = ((e || g.url || ut.href) + "").replace(Pr, ut.protocol + "//"), g.type = t.method || t.type || g.method || g.type, g.dataTypes = (g.dataType || "*").toLowerCase().match(me) || [""], g.crossDomain == null) {
                    c = I.createElement("a");
                    try {
                        c.href = g.url, c.href = c.href, g.crossDomain = Bt.protocol + "//" + Bt.host != c.protocol + "//" + c.host
                    } catch {
                        g.crossDomain = !0
                    }
                }
                if (g.data && g.processData && typeof g.data != "string" && (g.data = i.param(g.data, g.traditional)), In(qn, g, t, O), f) return O;
                h = i.event && g.global, h && i.active++ === 0 && i.event.trigger("ajaxStart"), g.type = g.type.toUpperCase(), g.hasContent = !Or.test(g.type), r = g.url.replace(qr, ""), g.hasContent ? g.data && g.processData && (g.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && (g.data = g.data.replace(jr, "+")) : (x = g.url.slice(r.length), g.data && (g.processData || typeof g.data == "string") && (r += (Rt.test(r) ? "&" : "?") + g.data, delete g.data), g.cache === !1 && (r = r.replace(Lr, "$1"), x = (Rt.test(r) ? "&" : "?") + "_=" + Dn.guid++ + x), g.url = r + x), g.ifModified && (i.lastModified[r] && O.setRequestHeader("If-Modified-Since", i.lastModified[r]), i.etag[r] && O.setRequestHeader("If-None-Match", i.etag[r])), (g.data && g.hasContent && g.contentType !== !1 || t.contentType) && O.setRequestHeader("Content-Type", g.contentType), O.setRequestHeader("Accept", g.dataTypes[0] && g.accepts[g.dataTypes[0]] ? g.accepts[g.dataTypes[0]] + (g.dataTypes[0] !== "*" ? ", " + Ln + "; q=0.01" : "") : g.accepts["*"]);
                for (y in g.headers) O.setRequestHeader(y, g.headers[y]);
                if (g.beforeSend && (g.beforeSend.call(v, O, g) === !1 || f)) return O.abort();
                if (W = "abort", E.add(g.complete), O.done(g.success), O.fail(g.error), n = In(_t, g, t, O), !n) ie(-1, "No Transport");
                else {
                    if (O.readyState = 1, h && A.trigger("ajaxSend", [O, g]), f) return O;
                    g.async && g.timeout > 0 && (u = H.setTimeout(function() {
                        O.abort("timeout")
                    }, g.timeout));
                    try {
                        f = !1, n.send(Y, ie)
                    } catch (M) {
                        if (f) throw M;
                        ie(-1, M)
                    }
                }

                function ie(M, Q, ft, xt) {
                    var ue, Oe, Pe, oe, Ae, de = Q;
                    f || (f = !0, u && H.clearTimeout(u), n = void 0, o = xt || "", O.readyState = M > 0 ? 4 : 0, ue = M >= 200 && M < 300 || M === 304, ft && (oe = Rr(g, O, ft)), !ue && i.inArray("script", g.dataTypes) > -1 && i.inArray("json", g.dataTypes) < 0 && (g.converters["text script"] = function() {}), oe = Mr(g, oe, O, ue), ue ? (g.ifModified && (Ae = O.getResponseHeader("Last-Modified"), Ae && (i.lastModified[r] = Ae), Ae = O.getResponseHeader("etag"), Ae && (i.etag[r] = Ae)), M === 204 || g.type === "HEAD" ? de = "nocontent" : M === 304 ? de = "notmodified" : (de = oe.state, Oe = oe.data, Pe = oe.error, ue = !Pe)) : (Pe = de, (M || !de) && (de = "error", M < 0 && (M = 0))), O.status = M, O.statusText = (Q || de) + "", ue ? P.resolveWith(v, [Oe, de, O]) : P.rejectWith(v, [O, de, Pe]), O.statusCode(J), J = void 0, h && A.trigger(ue ? "ajaxSuccess" : "ajaxError", [O, g, ue ? Oe : Pe]), E.fireWith(v, [O, de]), h && (A.trigger("ajaxComplete", [O, g]), --i.active || i.event.trigger("ajaxStop")))
                }
                return O
            },
            getJSON: function(e, t, n) {
                return i.get(e, t, n, "json")
            },
            getScript: function(e, t) {
                return i.get(e, void 0, t, "script")
            }
        }), i.each(["get", "post"], function(e, t) {
            i[t] = function(n, r, o, a) {
                return T(r) && (a = a || o, o = r, r = void 0), i.ajax(i.extend({
                    url: n,
                    type: t,
                    dataType: a,
                    data: r,
                    success: o
                }, i.isPlainObject(n) && n))
            }
        }), i.ajaxPrefilter(function(e) {
            var t;
            for (t in e.headers) t.toLowerCase() === "content-type" && (e.contentType = e.headers[t] || "")
        }), i._evalUrl = function(e, t, n) {
            return i.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                converters: {
                    "text script": function() {}
                },
                dataFilter: function(r) {
                    i.globalEval(r, t, n)
                }
            })
        }, i.fn.extend({
            wrapAll: function(e) {
                var t;
                return this[0] && (T(e) && (e = e.call(this[0])), t = i(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    for (var n = this; n.firstElementChild;) n = n.firstElementChild;
                    return n
                }).append(this)), this
            },
            wrapInner: function(e) {
                return T(e) ? this.each(function(t) {
                    i(this).wrapInner(e.call(this, t))
                }) : this.each(function() {
                    var t = i(this),
                        n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            },
            wrap: function(e) {
                var t = T(e);
                return this.each(function(n) {
                    i(this).wrapAll(t ? e.call(this, n) : e)
                })
            },
            unwrap: function(e) {
                return this.parent(e).not("body").each(function() {
                    i(this).replaceWith(this.childNodes)
                }), this
            }
        }), i.expr.pseudos.hidden = function(e) {
            return !i.expr.pseudos.visible(e)
        }, i.expr.pseudos.visible = function(e) {
            return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
        }, i.ajaxSettings.xhr = function() {
            try {
                return new H.XMLHttpRequest
            } catch {}
        };
        var _r = {
                0: 200,
                1223: 204
            },
            st = i.ajaxSettings.xhr();
        L.cors = !!st && "withCredentials" in st, L.ajax = st = !!st, i.ajaxTransport(function(e) {
            var t, n;
            if (L.cors || st && !e.crossDomain) return {
                send: function(r, o) {
                    var a, u = e.xhr();
                    if (u.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                        for (a in e.xhrFields) u[a] = e.xhrFields[a];
                    e.mimeType && u.overrideMimeType && u.overrideMimeType(e.mimeType), !e.crossDomain && !r["X-Requested-With"] && (r["X-Requested-With"] = "XMLHttpRequest");
                    for (a in r) u.setRequestHeader(a, r[a]);
                    t = function(c) {
                        return function() {
                            t && (t = n = u.onload = u.onerror = u.onabort = u.ontimeout = u.onreadystatechange = null, c === "abort" ? u.abort() : c === "error" ? typeof u.status != "number" ? o(0, "error") : o(u.status, u.statusText) : o(_r[u.status] || u.status, u.statusText, (u.responseType || "text") !== "text" || typeof u.responseText != "string" ? {
                                binary: u.response
                            } : {
                                text: u.responseText
                            }, u.getAllResponseHeaders()))
                        }
                    }, u.onload = t(), n = u.onerror = u.ontimeout = t("error"), u.onabort !== void 0 ? u.onabort = n : u.onreadystatechange = function() {
                        u.readyState === 4 && H.setTimeout(function() {
                            t && n()
                        })
                    }, t = t("abort");
                    try {
                        u.send(e.hasContent && e.data || null)
                    } catch (c) {
                        if (t) throw c
                    }
                },
                abort: function() {
                    t && t()
                }
            }
        }), i.ajaxPrefilter(function(e) {
            e.crossDomain && (e.contents.script = !1)
        }), i.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(e) {
                    return i.globalEval(e), e
                }
            }
        }), i.ajaxPrefilter("script", function(e) {
            e.cache === void 0 && (e.cache = !1), e.crossDomain && (e.type = "GET")
        }), i.ajaxTransport("script", function(e) {
            if (e.crossDomain || e.scriptAttrs) {
                var t, n;
                return {
                    send: function(r, o) {
                        t = i("<script>").attr(e.scriptAttrs || {}).prop({
                            charset: e.scriptCharset,
                            src: e.url
                        }).on("load error", n = function(a) {
                            t.remove(), n = null, a && o(a.type === "error" ? 404 : 200, a.type)
                        }), I.head.appendChild(t[0])
                    },
                    abort: function() {
                        n && n()
                    }
                }
            }
        });
        var On = [],
            Wt = /(=)\?(?=&|$)|\?\?/;
        i.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = On.pop() || i.expando + "_" + Dn.guid++;
                return this[e] = !0, e
            }
        }), i.ajaxPrefilter("json jsonp", function(e, t, n) {
            var r, o, a, u = e.jsonp !== !1 && (Wt.test(e.url) ? "url" : typeof e.data == "string" && (e.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && Wt.test(e.data) && "data");
            if (u || e.dataTypes[0] === "jsonp") return r = e.jsonpCallback = T(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, u ? e[u] = e[u].replace(Wt, "$1" + r) : e.jsonp !== !1 && (e.url += (Rt.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
                return a || i.error(r + " was not called"), a[0]
            }, e.dataTypes[0] = "json", o = H[r], H[r] = function() {
                a = arguments
            }, n.always(function() {
                o === void 0 ? i(H).removeProp(r) : H[r] = o, e[r] && (e.jsonpCallback = t.jsonpCallback, On.push(r)), a && T(o) && o(a[0]), a = o = void 0
            }), "script"
        }), L.createHTMLDocument = function() {
            var e = I.implementation.createHTMLDocument("").body;
            return e.innerHTML = "<form></form><form></form>", e.childNodes.length === 2
        }(), i.parseHTML = function(e, t, n) {
            if (typeof e != "string") return [];
            typeof t == "boolean" && (n = t, t = !1);
            var r, o, a;
            return t || (L.createHTMLDocument ? (t = I.implementation.createHTMLDocument(""), r = t.createElement("base"), r.href = I.location.href, t.head.appendChild(r)) : t = I), o = Zt.exec(e), a = !n && [], o ? [t.createElement(o[1])] : (o = ln([e], t, a), a && a.length && i(a).remove(), i.merge([], o.childNodes))
        }, i.fn.load = function(e, t, n) {
            var r, o, a, u = this,
                c = e.indexOf(" ");
            return c > -1 && (r = He(e.slice(c)), e = e.slice(0, c)), T(t) ? (n = t, t = void 0) : t && typeof t == "object" && (o = "POST"), u.length > 0 && i.ajax({
                url: e,
                type: o || "GET",
                dataType: "html",
                data: t
            }).done(function(f) {
                a = arguments, u.html(r ? i("<div>").append(i.parseHTML(f)).find(r) : f)
            }).always(n && function(f, h) {
                u.each(function() {
                    n.apply(this, a || [f.responseText, h, f])
                })
            }), this
        }, i.expr.pseudos.animated = function(e) {
            return i.grep(i.timers, function(t) {
                return e === t.elem
            }).length
        }, i.offset = {
            setOffset: function(e, t, n) {
                var r, o, a, u, c, f, h, y = i.css(e, "position"),
                    x = i(e),
                    g = {};
                y === "static" && (e.style.position = "relative"), c = x.offset(), a = i.css(e, "top"), f = i.css(e, "left"), h = (y === "absolute" || y === "fixed") && (a + f).indexOf("auto") > -1, h ? (r = x.position(), u = r.top, o = r.left) : (u = parseFloat(a) || 0, o = parseFloat(f) || 0), T(t) && (t = t.call(e, n, i.extend({}, c))), t.top != null && (g.top = t.top - c.top + u), t.left != null && (g.left = t.left - c.left + o), "using" in t ? t.using.call(e, g) : x.css(g)
            }
        }, i.fn.extend({
            offset: function(e) {
                if (arguments.length) return e === void 0 ? this : this.each(function(o) {
                    i.offset.setOffset(this, e, o)
                });
                var t, n, r = this[0];
                if (r) return r.getClientRects().length ? (t = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
                    top: t.top + n.pageYOffset,
                    left: t.left + n.pageXOffset
                }) : {
                    top: 0,
                    left: 0
                }
            },
            position: function() {
                if (this[0]) {
                    var e, t, n, r = this[0],
                        o = {
                            top: 0,
                            left: 0
                        };
                    if (i.css(r, "position") === "fixed") t = r.getBoundingClientRect();
                    else {
                        for (t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && i.css(e, "position") === "static";) e = e.parentNode;
                        e && e !== r && e.nodeType === 1 && (o = i(e).offset(), o.top += i.css(e, "borderTopWidth", !0), o.left += i.css(e, "borderLeftWidth", !0))
                    }
                    return {
                        top: t.top - o.top - i.css(r, "marginTop", !0),
                        left: t.left - o.left - i.css(r, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent; e && i.css(e, "position") === "static";) e = e.offsetParent;
                    return e || Le
                })
            }
        }), i.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(e, t) {
            var n = t === "pageYOffset";
            i.fn[e] = function(r) {
                return we(this, function(o, a, u) {
                    var c;
                    if ($(o) ? c = o : o.nodeType === 9 && (c = o.defaultView), u === void 0) return c ? c[t] : o[a];
                    c ? c.scrollTo(n ? c.pageXOffset : u, n ? u : c.pageYOffset) : o[a] = u
                }, e, r, arguments.length)
            }
        }), i.each(["top", "left"], function(e, t) {
            i.cssHooks[t] = vn(L.pixelPosition, function(n, r) {
                if (r) return r = ot(n, t), qt.test(r) ? i(n).position()[t] + "px" : r
            })
        }), i.each({
            Height: "height",
            Width: "width"
        }, function(e, t) {
            i.each({
                padding: "inner" + e,
                content: t,
                "": "outer" + e
            }, function(n, r) {
                i.fn[r] = function(o, a) {
                    var u = arguments.length && (n || typeof o != "boolean"),
                        c = n || (o === !0 || a === !0 ? "margin" : "border");
                    return we(this, function(f, h, y) {
                        var x;
                        return $(f) ? r.indexOf("outer") === 0 ? f["inner" + e] : f.document.documentElement["client" + e] : f.nodeType === 9 ? (x = f.documentElement, Math.max(f.body["scroll" + e], x["scroll" + e], f.body["offset" + e], x["offset" + e], x["client" + e])) : y === void 0 ? i.css(f, h, c) : i.style(f, h, y, c)
                    }, t, u ? o : void 0, u)
                }
            })
        }), i.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
            i.fn[t] = function(n) {
                return this.on(t, n)
            }
        }), i.fn.extend({
            bind: function(e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            delegate: function(e, t, n, r) {
                return this.on(t, e, n, r)
            },
            undelegate: function(e, t, n) {
                return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
            },
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        }), i.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
            i.fn[t] = function(n, r) {
                return arguments.length > 0 ? this.on(t, null, n, r) : this.trigger(t)
            }
        });
        var Br = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
        i.proxy = function(e, t) {
            var n, r, o;
            if (typeof t == "string" && (n = e[t], t = e, e = n), !!T(e)) return r = ve.call(arguments, 2), o = function() {
                return e.apply(t || this, r.concat(ve.call(arguments)))
            }, o.guid = e.guid = e.guid || i.guid++, o
        }, i.holdReady = function(e) {
            e ? i.readyWait++ : i.ready(!0)
        }, i.isArray = Array.isArray, i.parseJSON = JSON.parse, i.nodeName = le, i.isFunction = T, i.isWindow = $, i.camelCase = be, i.type = Ee, i.now = Date.now, i.isNumeric = function(e) {
            var t = i.type(e);
            return (t === "number" || t === "string") && !isNaN(e - parseFloat(e))
        }, i.trim = function(e) {
            return e == null ? "" : (e + "").replace(Br, "$1")
        };
        var Fr = H.jQuery,
            Wr = H.$;
        return i.noConflict = function(e) {
            return H.$ === i && (H.$ = Wr), e && H.jQuery === i && (H.jQuery = Fr), i
        }, typeof ye > "u" && (H.jQuery = H.$ = i), i
    })
})(Un);
var oi = Un.exports;
const B = ii(oi);
window.$ = B;

function ai() {
    var ke = document.querySelector(".line").getBoundingClientRect(),
        H = document.querySelector("#myBar").getBoundingClientRect(),
        ye = window.innerHeight / 2 + 0,
        Z = H.top - ye,
        xe = Math.abs(Z / ke.height * 100);
    xe > 100 && (xe = 100), Z > 0 && (xe = 0), document.getElementById("myBar").style.height = xe + "%"
}
B(() => {
    document.getElementById("featuredCarousel") !== null && new bootstrap.Carousel("#featuredCarousel"), document.getElementById("eventsCarousel") !== null && new bootstrap.Carousel("#eventsCarousel").cycle(), document.getElementById("formatsCarousel") !== null && (new bootstrap.Carousel("#formatsCarousel"), document.getElementById("formatsCarousel").addEventListener("slide.bs.carousel", X => {
        document.querySelectorAll(".carousel-item:not(.active) video").forEach(T => {
            T.pause(), T.currentTime = 0
        });
        const G = document.querySelectorAll("#formatsCarousel .carousel-item")[X.to],
            L = document.querySelector("#formatsCarousel #deviceTabs .nav-link.active").dataset.bsTarget.replace("#", "");
        G.querySelectorAll(".device-content").forEach(T => {
            T.classList.remove("active")
        }), G.querySelectorAll(".device-content." + L).forEach(T => {
            T.classList.add("active");
            const $ = T.querySelector("video");
            $.currentTime = 0, $.play()
        })
    })), document.getElementById("adFormatsCarousel") !== null && (new bootstrap.Carousel("#adFormatsCarousel").cycle(), document.getElementById("adFormatsCarousel").addEventListener("slide.bs.carousel", G => {
        var L = document.querySelectorAll('button[data-bs-target="#adFormatsCarousel"]');
        L.forEach(function(je) {
            je.classList.remove("active")
        });
        for (var T = parseInt(G.to), $ = 0; $ < L.length; $++) {
            var I = parseInt(L[$].getAttribute("data-bs-slide-to"));
            if (I === T) {
                L[$].classList.add("active");
                break
            }
        }
    })), document.getElementById("reviewsCarousel") !== null && (new bootstrap.Carousel("#reviewsCarousel").cycle(), document.getElementById("reviewsCarousel").addEventListener("slide.bs.carousel", G => {
        var L = document.querySelectorAll('div[data-bs-target="#reviewsCarousel"]');
        L.forEach(function(je) {
            je.classList.remove("active")
        });
        for (var T = parseInt(G.to), $ = 0; $ < L.length; $++) {
            var I = parseInt(L[$].getAttribute("data-bs-slide-to"));
            if (I === T) {
                L[$].classList.add("active");
                break
            }
        }
    })), document.getElementById("testiCarousel") !== null && new bootstrap.Carousel("#testiCarousel").cycle();
    let ke = document.querySelectorAll(".share-lnk");
    if (ke)
        for (let _ = 0; _ < ke.length; _++) ke[_].onclick = function(X) {
            X.preventDefault();
            var G = window.location.href;
            window.open("https://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(G))
        };
    let H = document.querySelectorAll(".share-fb");
    if (H)
        for (let _ = 0; _ < H.length; _++) H[_].onclick = function(X) {
            X.preventDefault();
            var G = window.location.href;
            window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(G))
        };
    let ye = document.querySelectorAll(".share-tw");
    if (ye)
        for (let _ = 0; _ < ye.length; _++) ye[_].onclick = function(X) {
            X.preventDefault();
            var G = window.location.href;
            window.open("https://twitter.com/intent/tweet?url=" + encodeURIComponent(G))
        };
    var Z = window.location.pathname;
    if (B(window).scrollTop() > 50 && B("header").addClass("active"), B(window).on("scroll", function() {
            B(window).scrollTop() > 50 ? B("header").addClass("active") : B("header").removeClass("active"), B("#myBar").length > 0 && ai()
        }), B(".language-select-mobile").length && B('.language-select-mobile a[href="' + Z + '"]').length) {
        var xe = B('.language-select-mobile a[href="' + Z + '"]').html().split("<");
        B(".language-select-mobile button span").html(xe[0])
    }
    if (B(".category-links").length > 0) {
        var ve = window.location.origin + window.location.pathname,
            Ye = window.location.pathname.split("/");
        Ye[1] != "tags" && Ye[2] != "tags" && B(".category-links a").removeClass("active"), B('.category-links a[href="' + ve + '"]').addClass("active")
    }
    B(".policies").length > 0 && B('.policies a[href="' + window.location.href + '"]').addClass("active"), B(".is-invalid").bind("focus", function() {
        B(this).addClass("is-focused")
    });

    function Je(_, X) {
        X && localStorage.setItem(_, X)
    }
    let De = ["p1", "p2", "p3", "utm_source", "utm_medium", "adgroup", "adname", "utm_term", "utm_content", "utm_campaign", "campaign_type", "device_type", "segment", "cluster", "ref", "gclid"],
        Be = new URL(window.location.href);
    De.forEach(_ => {
        let X = Be.searchParams.get(_);
        X && Je(_, X)
    });
    let Ke = document.querySelectorAll("a[href*='auth.trafficstars.com'], a[href*='admin.trafficstars.com']");
    Ke.length > 0 && Ke.forEach(_ => {
        let X = new URL(_.href);
        De.forEach(G => {
            let L = localStorage.getItem(G);
            L && X.searchParams.set(G, L)
        }), _.href = X.toString()
    }), B.fn.sticky = function(_) {
        var X = {
                topSpacing: 0,
                bottomSpacing: 0,
                debug: !1
            },
            G = B.extend({}, X, _),
            L = function(T, $, I) {
                var je = I.offset(),
                    Fe = B(window).scrollTop(),
                    Ee = $.offset().top + $.outerHeight(),
                    Ze = T.outerHeight(),
                    i = Ee - Ze - G.bottomSpacing,
                    et = B(window).height();
                Ze > et - G.topSpacing && T.css({
                    position: "relative",
                    top: ""
                }), Fe > je.top - G.topSpacing && Fe < i ? ((T.css("position") != "fixed" || !T.hasClass("active")) && (T.trigger("sticky-start"), T.addClass("active"), T.css({
                    position: "fixed",
                    top: G.topSpacing
                })), T.trigger("sticky-bottom-unreached")) : Fe >= i ? T.css("position") == "fixed" && (T.trigger("sticky-bottom-reached"), T.css({
                    position: "absolute",
                    top: i - $.offset().top + G.topSpacing + "px"
                })) : ((T.css("position") == "fixed" || T.css("position") == "absolute") && T.trigger("sticky-end"), T.removeClass("active"), T.css({
                    position: "",
                    top: ""
                }))
            };
        return this.each(function() {
            var T = B(this),
                $ = T.offsetParent(),
                I = B("<div class='sticky-holder' style='visibility: hidden;height:0;display:block'></div>").insertBefore(T);
            L(T, $, I), B(window).scroll(function() {
                L(T, $, I)
            }), B(window).resize(function() {
                L(T, $, I)
            })
        })
    }, B(".sticky-nav").sticky({
        topSpacing: 86,
        bottomSpacing: 200
    }), B(window).resize(function() {
        setTimeout(function() {
            B(window).scroll()
        }, 500)
    })
});