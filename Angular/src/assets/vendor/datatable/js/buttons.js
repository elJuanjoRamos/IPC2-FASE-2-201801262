/*!
 Buttons for DataTables 1.5.6
 ©2016-2019 SpryMedia Ltd - datatables.net/license
*/
(function(d) { "function" === typeof define && define.amd ? define(["jquery", "datatables.net"], function(p) { return d(p, window, document) }) : "object" === typeof exports ? module.exports = function(p, o) { p || (p = window); if (!o || !o.fn.dataTable) o = require("datatables.net")(p, o).$; return d(o, p, p.document) } : d(jQuery, window, document) })(function(d, p, o, n) {
    function t(a) { var a = new j.Api(a),
            b = a.init().buttons || j.defaults.buttons; return (new m(a, b)).container() }
    var j = d.fn.dataTable,
        x = 0,
        y = 0,
        l = j.ext.buttons,
        m = function(a, b) {
            if (!(this instanceof m)) return function(b) { return (new m(b, a)).container() };
            "undefined" === typeof b && (b = {});
            !0 === b && (b = {});
            d.isArray(b) && (b = { buttons: b });
            this.c = d.extend(!0, {}, m.defaults, b);
            b.buttons && (this.c.buttons = b.buttons);
            this.s = { dt: new j.Api(a), buttons: [], listenKeys: "", namespace: "dtb" + x++ };
            this.dom = { container: d("<" + this.c.dom.container.tag + "/>").addClass(this.c.dom.container.className) };
            this._constructor()
        };
    d.extend(m.prototype, {
        action: function(a, b) {
            var c = this._nodeToButton(a);
            if (b === n) return c.conf.action;
            c.conf.action =
                b;
            return this
        },
        active: function(a, b) { var c = this._nodeToButton(a),
                e = this.c.dom.button.active,
                c = d(c.node); if (b === n) return c.hasClass(e);
            c.toggleClass(e, b === n ? !0 : b); return this },
        add: function(a, b) { var c = this.s.buttons; if ("string" === typeof b) { for (var e = b.split("-"), c = this.s, d = 0, g = e.length - 1; d < g; d++) c = c.buttons[1 * e[d]];
                c = c.buttons;
                b = 1 * e[e.length - 1] }
            this._expandButton(c, a, !1, b);
            this._draw(); return this },
        container: function() { return this.dom.container },
        disable: function(a) {
            a = this._nodeToButton(a);
            d(a.node).addClass(this.c.dom.button.disabled);
            return this
        },
        destroy: function() { d("body").off("keyup." + this.s.namespace); var a = this.s.buttons.slice(),
                b, c;
            b = 0; for (c = a.length; b < c; b++) this.remove(a[b].node);
            this.dom.container.remove();
            a = this.s.dt.settings()[0];
            b = 0; for (c = a.length; b < c; b++)
                if (a.inst === this) { a.splice(b, 1); break }
            return this },
        enable: function(a, b) { if (!1 === b) return this.disable(a); var c = this._nodeToButton(a);
            d(c.node).removeClass(this.c.dom.button.disabled); return this },
        name: function() { return this.c.name },
        node: function(a) {
            if (!a) return this.dom.container;
            a = this._nodeToButton(a);
            return d(a.node)
        },
        processing: function(a, b) { var c = this._nodeToButton(a); if (b === n) return d(c.node).hasClass("processing");
            d(c.node).toggleClass("processing", b); return this },
        remove: function(a) {
            var b = this._nodeToButton(a),
                c = this._nodeToHost(a),
                e = this.s.dt;
            if (b.buttons.length)
                for (var i = b.buttons.length - 1; 0 <= i; i--) this.remove(b.buttons[i].node);
            b.conf.destroy && b.conf.destroy.call(e.button(a), e, d(a), b.conf);
            this._removeKey(b.conf);
            d(b.node).remove();
            a = d.inArray(b, c);
            c.splice(a, 1);
            return this
        },
        text: function(a, b) { var c = this._nodeToButton(a),
                e = this.c.dom.collection.buttonLiner,
                e = c.inCollection && e && e.tag ? e.tag : this.c.dom.buttonLiner.tag,
                i = this.s.dt,
                g = d(c.node),
                f = function(a) { return "function" === typeof a ? a(i, g, c.conf) : a }; if (b === n) return f(c.conf.text);
            c.conf.text = b;
            e ? g.children(e).html(f(b)) : g.html(f(b)); return this },
        _constructor: function() {
            var a = this,
                b = this.s.dt,
                c = b.settings()[0],
                e = this.c.buttons;
            c._buttons || (c._buttons = []);
            c._buttons.push({ inst: this, name: this.c.name });
            for (var i =
                    0, g = e.length; i < g; i++) this.add(e[i]);
            b.on("destroy", function(b, e) { e === c && a.destroy() });
            d("body").on("keyup." + this.s.namespace, function(b) { if (!o.activeElement || o.activeElement === o.body) { var c = String.fromCharCode(b.keyCode).toLowerCase();
                    a.s.listenKeys.toLowerCase().indexOf(c) !== -1 && a._keypress(c, b) } })
        },
        _addKey: function(a) { a.key && (this.s.listenKeys += d.isPlainObject(a.key) ? a.key.key : a.key) },
        _draw: function(a, b) {
            a || (a = this.dom.container, b = this.s.buttons);
            a.children().detach();
            for (var c = 0, e = b.length; c < e; c++) a.append(b[c].inserter),
                a.append(" "), b[c].buttons && b[c].buttons.length && this._draw(b[c].collection, b[c].buttons)
        },
        _expandButton: function(a, b, c, e) {
            for (var i = this.s.dt, g = 0, b = !d.isArray(b) ? [b] : b, f = 0, k = b.length; f < k; f++) {
                var r = this._resolveExtends(b[f]);
                if (r)
                    if (d.isArray(r)) this._expandButton(a, r, c, e);
                    else {
                        var h = this._buildButton(r, c);
                        if (h) {
                            e !== n ? (a.splice(e, 0, h), e++) : a.push(h);
                            if (h.conf.buttons) {
                                var u = this.c.dom.collection;
                                h.collection = d("<" + u.tag + "/>").addClass(u.className).attr("role", "menu");
                                h.conf._collection = h.collection;
                                this._expandButton(h.buttons, h.conf.buttons, !0, e)
                            }
                            r.init && r.init.call(i.button(h.node), i, d(h.node), r);
                            g++
                        }
                    }
            }
        },
        _buildButton: function(a, b) {
            var c = this.c.dom.button,
                e = this.c.dom.buttonLiner,
                i = this.c.dom.collection,
                g = this.s.dt,
                f = function(b) { return "function" === typeof b ? b(g, h, a) : b };
            b && i.button && (c = i.button);
            b && i.buttonLiner && (e = i.buttonLiner);
            if (a.available && !a.available(g, a)) return !1;
            var k = function(a, b, c, e) {
                    e.action.call(b.button(c), a, b, c, e);
                    d(b.table().node()).triggerHandler("buttons-action.dt", [b.button(c),
                        b, c, e
                    ])
                },
                i = a.tag || c.tag,
                r = a.clickBlurs === n ? !0 : a.clickBlurs,
                h = d("<" + i + "/>").addClass(c.className).attr("tabindex", this.s.dt.settings()[0].iTabIndex).attr("aria-controls", this.s.dt.table().node().id).on("click.dtb", function(b) { b.preventDefault();!h.hasClass(c.disabled) && a.action && k(b, g, h, a);
                    r && h.blur() }).on("keyup.dtb", function(b) { b.keyCode === 13 && !h.hasClass(c.disabled) && a.action && k(b, g, h, a) });
            "a" === i.toLowerCase() && h.attr("href", "#");
            "button" === i.toLowerCase() && h.attr("type", "button");
            e.tag ? (i = d("<" +
                e.tag + "/>").html(f(a.text)).addClass(e.className), "a" === e.tag.toLowerCase() && i.attr("href", "#"), h.append(i)) : h.html(f(a.text));
            !1 === a.enabled && h.addClass(c.disabled);
            a.className && h.addClass(a.className);
            a.titleAttr && h.attr("title", f(a.titleAttr));
            a.attr && h.attr(a.attr);
            a.namespace || (a.namespace = ".dt-button-" + y++);
            e = (e = this.c.dom.buttonContainer) && e.tag ? d("<" + e.tag + "/>").addClass(e.className).append(h) : h;
            this._addKey(a);
            this.c.buttonCreated && (e = this.c.buttonCreated(a, e));
            return {
                conf: a,
                node: h.get(0),
                inserter: e,
                buttons: [],
                inCollection: b,
                collection: null
            }
        },
        _nodeToButton: function(a, b) { b || (b = this.s.buttons); for (var c = 0, e = b.length; c < e; c++) { if (b[c].node === a) return b[c]; if (b[c].buttons.length) { var d = this._nodeToButton(a, b[c].buttons); if (d) return d } } },
        _nodeToHost: function(a, b) { b || (b = this.s.buttons); for (var c = 0, e = b.length; c < e; c++) { if (b[c].node === a) return b; if (b[c].buttons.length) { var d = this._nodeToHost(a, b[c].buttons); if (d) return d } } },
        _keypress: function(a, b) {
            if (!b._buttonsHandled) {
                var c = function(e) {
                    for (var i =
                            0, g = e.length; i < g; i++) { var f = e[i].conf,
                            k = e[i].node; if (f.key)
                            if (f.key === a) b._buttonsHandled = !0, d(k).click();
                            else if (d.isPlainObject(f.key) && f.key.key === a && (!f.key.shiftKey || b.shiftKey))
                            if (!f.key.altKey || b.altKey)
                                if (!f.key.ctrlKey || b.ctrlKey)
                                    if (!f.key.metaKey || b.metaKey) b._buttonsHandled = !0, d(k).click();
                        e[i].buttons.length && c(e[i].buttons) }
                };
                c(this.s.buttons)
            }
        },
        _removeKey: function(a) {
            if (a.key) {
                var b = d.isPlainObject(a.key) ? a.key.key : a.key,
                    a = this.s.listenKeys.split(""),
                    b = d.inArray(b, a);
                a.splice(b, 1);
                this.s.listenKeys =
                    a.join("")
            }
        },
        _resolveExtends: function(a) {
            for (var b = this.s.dt, c, e, i = function(c) { for (var e = 0; !d.isPlainObject(c) && !d.isArray(c);) { if (c === n) return; if ("function" === typeof c) { if (c = c(b, a), !c) return !1 } else if ("string" === typeof c) { if (!l[c]) throw "Unknown button type: " + c;
                            c = l[c] }
                        e++; if (30 < e) throw "Buttons: Too many iterations"; } return d.isArray(c) ? c : d.extend({}, c) }, a = i(a); a && a.extend;) {
                if (!l[a.extend]) throw "Cannot extend unknown button type: " + a.extend;
                var g = i(l[a.extend]);
                if (d.isArray(g)) return g;
                if (!g) return !1;
                c = g.className;
                a = d.extend({}, g, a);
                c && a.className !== c && (a.className = c + " " + a.className);
                var f = a.postfixButtons;
                if (f) { a.buttons || (a.buttons = []);
                    c = 0; for (e = f.length; c < e; c++) a.buttons.push(f[c]);
                    a.postfixButtons = null }
                if (f = a.prefixButtons) { a.buttons || (a.buttons = []);
                    c = 0; for (e = f.length; c < e; c++) a.buttons.splice(c, 0, f[c]);
                    a.prefixButtons = null }
                a.extend = g.extend
            }
            return a
        }
    });
    m.background = function(a, b, c, e) {
        c === n && (c = 400);
        e || (e = o.body);
        a ? d("<div/>").addClass(b).css("display", "none").insertAfter(e).stop().fadeIn(c) :
            d("div." + b).stop().fadeOut(c, function() { d(this).removeClass(b).remove() })
    };
    m.instanceSelector = function(a, b) { if (!a) return d.map(b, function(a) { return a.inst }); var c = [],
            e = d.map(b, function(a) { return a.name }),
            i = function(a) { if (d.isArray(a))
                    for (var f = 0, k = a.length; f < k; f++) i(a[f]);
                else "string" === typeof a ? -1 !== a.indexOf(",") ? i(a.split(",")) : (a = d.inArray(d.trim(a), e), -1 !== a && c.push(b[a].inst)) : "number" === typeof a && c.push(b[a].inst) };
        i(a); return c };
    m.buttonSelector = function(a, b) {
        for (var c = [], e = function(a, b, c) {
                for (var d,
                        g, f = 0, i = b.length; f < i; f++)
                    if (d = b[f]) g = c !== n ? c + f : f + "", a.push({ node: d.node, name: d.conf.name, idx: g }), d.buttons && e(a, d.buttons, g + "-")
            }, i = function(a, b) {
                var h, g, f = [];
                e(f, b.s.buttons);
                h = d.map(f, function(a) { return a.node });
                if (d.isArray(a) || a instanceof d) { h = 0; for (g = a.length; h < g; h++) i(a[h], b) } else if (null === a || a === n || "*" === a) { h = 0; for (g = f.length; h < g; h++) c.push({ inst: b, node: f[h].node }) } else if ("number" === typeof a) c.push({ inst: b, node: b.s.buttons[a].node });
                else if ("string" === typeof a)
                    if (-1 !== a.indexOf(",")) {
                        f =
                            a.split(",");
                        h = 0;
                        for (g = f.length; h < g; h++) i(d.trim(f[h]), b)
                    } else if (a.match(/^\d+(\-\d+)*$/)) h = d.map(f, function(a) { return a.idx }), c.push({ inst: b, node: f[d.inArray(a, h)].node });
                else if (-1 !== a.indexOf(":name")) { var j = a.replace(":name", "");
                    h = 0; for (g = f.length; h < g; h++) f[h].name === j && c.push({ inst: b, node: f[h].node }) } else d(h).filter(a).each(function() { c.push({ inst: b, node: this }) });
                else "object" === typeof a && a.nodeName && (f = d.inArray(a, h), -1 !== f && c.push({ inst: b, node: h[f] }))
            }, g = 0, f = a.length; g < f; g++) i(b, a[g]);
        return c
    };
    m.defaults = { buttons: ["copy", "excel", "csv", "pdf", "print"], name: "main", tabIndex: 0, dom: { container: { tag: "div", className: "dt-buttons" }, collection: { tag: "div", className: "dt-button-collection" }, button: { tag: "ActiveXObject" in p ? "a" : "button", className: "dt-button", active: "active", disabled: "disabled" }, buttonLiner: { tag: "span", className: "" } } };
    m.version = "1.5.6";
    d.extend(l, {
        collection: {
            text: function(a) { return a.i18n("buttons.collection", "Collection") },
            className: "buttons-collection",
            init: function(a, b) {
                b.attr("aria-expanded", !1)
            },
            action: function(a, b, c, e) {
                var i = function() { b.buttons('[aria-haspopup="true"][aria-expanded="true"]').nodes().each(function() { var a = d(this).siblings(".dt-button-collection");
                            a.length && a.stop().fadeOut(e.fade, function() { a.detach() });
                            d(this).attr("aria-expanded", "false") });
                        d("div.dt-button-background").off("click.dtb-collection");
                        m.background(!1, e.backgroundClassName, e.fade, j);
                        d("body").off(".dtb-collection");
                        b.off("buttons-action.b-internal") },
                    a = "true" === c.attr("aria-expanded");
                i();
                if (!a) {
                    var g =
                        d(c).parents("div.dt-button-collection"),
                        a = c.position(),
                        f = d(b.table().container()),
                        k = !1,
                        j = c;
                    c.attr("aria-expanded", "true");
                    g.length && (k = d(".dt-button-collection").position(), j = g, d("body").trigger("click.dtb-collection"));
                    j.parents("body")[0] !== o.body && (j = o.body.lastChild);
                    e._collection.find(".dt-button-collection-title").remove();
                    e._collection.prepend('<div class="dt-button-collection-title">' + e.collectionTitle + "</div>");
                    e._collection.addClass(e.collectionLayout).css("display", "none").insertAfter(j).stop().fadeIn(e.fade);
                    g = e._collection.css("position");
                    k && "absolute" === g ? e._collection.css({ top: k.top, left: k.left }) : "absolute" === g ? (e._collection.css({ top: a.top + c.outerHeight(), left: a.left }), k = f.offset().top + f.height(), k = a.top + c.outerHeight() + e._collection.outerHeight() - k, g = a.top - e._collection.outerHeight(), g = f.offset().top - g, (k > g || e.dropup) && e._collection.css("top", a.top - e._collection.outerHeight() - 5), e._collection.hasClass(e.rightAlignClassName) && e._collection.css("left", a.left + c.outerWidth() - e._collection.outerWidth()),
                        k = a.left + e._collection.outerWidth(), f = f.offset().left + f.width(), k > f && e._collection.css("left", a.left - (k - f)), c = c.offset().left + e._collection.outerWidth(), c > d(p).width() && e._collection.css("left", a.left - (c - d(p).width()))) : (c = e._collection.height() / 2, c > d(p).height() / 2 && (c = d(p).height() / 2), e._collection.css("marginTop", -1 * c));
                    e.background && m.background(!0, e.backgroundClassName, e.fade, j);
                    setTimeout(function() {
                        d("div.dt-button-background").on("click.dtb-collection", function() {});
                        d("body").on("click.dtb-collection",
                            function(a) { var b = d.fn.addBack ? "addBack" : "andSelf";
                                d(a.target).parents()[b]().filter(e._collection).length || i() }).on("keyup.dtb-collection", function(a) { a.keyCode === 27 && i() });
                        if (e.autoClose) b.on("buttons-action.b-internal", function() { i() })
                    }, 10)
                }
            },
            background: !0,
            collectionLayout: "",
            collectionTitle: "",
            backgroundClassName: "dt-button-background",
            rightAlignClassName: "dt-button-right",
            autoClose: !1,
            fade: 400,
            attr: { "aria-haspopup": !0 }
        },
        copy: function(a, b) {
            if (l.copyHtml5) return "copyHtml5";
            if (l.copyFlash && l.copyFlash.available(a,
                    b)) return "copyFlash"
        },
        csv: function(a, b) { if (l.csvHtml5 && l.csvHtml5.available(a, b)) return "csvHtml5"; if (l.csvFlash && l.csvFlash.available(a, b)) return "csvFlash" },
        excel: function(a, b) { if (l.excelHtml5 && l.excelHtml5.available(a, b)) return "excelHtml5"; if (l.excelFlash && l.excelFlash.available(a, b)) return "excelFlash" },
        pdf: function(a, b) { if (l.pdfHtml5 && l.pdfHtml5.available(a, b)) return "pdfHtml5"; if (l.pdfFlash && l.pdfFlash.available(a, b)) return "pdfFlash" },
        pageLength: function(a) {
            var a = a.settings()[0].aLengthMenu,
                b = d.isArray(a[0]) ?
                a[0] : a,
                c = d.isArray(a[0]) ? a[1] : a;
            return {
                extend: "collection",
                text: function(a) { return a.i18n("buttons.pageLength", { "-1": "Show all rows", _: "Show %d rows" }, a.page.len()) },
                className: "buttons-page-length",
                autoClose: !0,
                buttons: d.map(b, function(a, b) { return { text: c[b], className: "button-page-length", action: function(b, c) { c.page.len(a).draw() }, init: function(b, c, d) { var i = this,
                                c = function() { i.active(b.page.len() === a) };
                            b.on("length.dt" + d.namespace, c);
                            c() }, destroy: function(a, b, c) { a.off("length.dt" + c.namespace) } } }),
                init: function(a, b, c) { var d = this;
                    a.on("length.dt" + c.namespace, function() { d.text(c.text) }) },
                destroy: function(a, b, c) { a.off("length.dt" + c.namespace) }
            }
        }
    });
    j.Api.register("buttons()", function(a, b) { b === n && (b = a, a = n);
        this.selector.buttonGroup = a; var c = this.iterator(!0, "table", function(c) { if (c._buttons) return m.buttonSelector(m.instanceSelector(a, c._buttons), b) }, !0);
        c._groupSelector = a; return c });
    j.Api.register("button()", function(a, b) { var c = this.buttons(a, b);
        1 < c.length && c.splice(1, c.length); return c });
    j.Api.registerPlural("buttons().active()",
        "button().active()",
        function(a) { return a === n ? this.map(function(a) { return a.inst.active(a.node) }) : this.each(function(b) { b.inst.active(b.node, a) }) });
    j.Api.registerPlural("buttons().action()", "button().action()", function(a) { return a === n ? this.map(function(a) { return a.inst.action(a.node) }) : this.each(function(b) { b.inst.action(b.node, a) }) });
    j.Api.register(["buttons().enable()", "button().enable()"], function(a) { return this.each(function(b) { b.inst.enable(b.node, a) }) });
    j.Api.register(["buttons().disable()",
        "button().disable()"
    ], function() { return this.each(function(a) { a.inst.disable(a.node) }) });
    j.Api.registerPlural("buttons().nodes()", "button().node()", function() { var a = d();
        d(this.each(function(b) { a = a.add(b.inst.node(b.node)) })); return a });
    j.Api.registerPlural("buttons().processing()", "button().processing()", function(a) { return a === n ? this.map(function(a) { return a.inst.processing(a.node) }) : this.each(function(b) { b.inst.processing(b.node, a) }) });
    j.Api.registerPlural("buttons().text()", "button().text()", function(a) {
        return a ===
            n ? this.map(function(a) { return a.inst.text(a.node) }) : this.each(function(b) { b.inst.text(b.node, a) })
    });
    j.Api.registerPlural("buttons().trigger()", "button().trigger()", function() { return this.each(function(a) { a.inst.node(a.node).trigger("click") }) });
    j.Api.registerPlural("buttons().containers()", "buttons().container()", function() {
        var a = d(),
            b = this._groupSelector;
        this.iterator(!0, "table", function(c) { if (c._buttons)
                for (var c = m.instanceSelector(b, c._buttons), d = 0, i = c.length; d < i; d++) a = a.add(c[d].container()) });
        return a
    });
    j.Api.register("button().add()", function(a, b) { var c = this.context;
        c.length && (c = m.instanceSelector(this._groupSelector, c[0]._buttons), c.length && c[0].add(b, a)); return this.button(this._groupSelector, a) });
    j.Api.register("buttons().destroy()", function() { this.pluck("inst").unique().each(function(a) { a.destroy() }); return this });
    j.Api.registerPlural("buttons().remove()", "buttons().remove()", function() { this.each(function(a) { a.inst.remove(a.node) }); return this });
    var q;
    j.Api.register("buttons.info()",
        function(a, b, c) { var e = this; if (!1 === a) return d("#datatables_buttons_info").fadeOut(function() { d(this).remove() }), clearTimeout(q), q = null, this;
            q && clearTimeout(q);
            d("#datatables_buttons_info").length && d("#datatables_buttons_info").remove();
            d('<div id="datatables_buttons_info" class="dt-button-info"/>').html(a ? "<h2>" + a + "</h2>" : "").append(d("<div/>")["string" === typeof b ? "html" : "append"](b)).css("display", "none").appendTo("body").fadeIn();
            c !== n && 0 !== c && (q = setTimeout(function() { e.buttons.info(!1) }, c)); return this });
    j.Api.register("buttons.exportData()", function(a) {
        if (this.context.length) {
            var b = new j.Api(this.context[0]),
                c = d.extend(!0, {}, { rows: null, columns: "", modifier: { search: "applied", order: "applied" }, orthogonal: "display", stripHtml: !0, stripNewlines: !0, decodeEntities: !0, trim: !0, format: { header: function(a) { return e(a) }, footer: function(a) { return e(a) }, body: function(a) { return e(a) } }, customizeData: null }, a),
                e = function(a) {
                    if ("string" !== typeof a) return a;
                    a = a.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                        "");
                    a = a.replace(/<!\-\-.*?\-\->/g, "");
                    c.stripHtml && (a = a.replace(/<[^>]*>/g, ""));
                    c.trim && (a = a.replace(/^\s+|\s+$/g, ""));
                    c.stripNewlines && (a = a.replace(/\n/g, " "));
                    c.decodeEntities && (v.innerHTML = a, a = v.value);
                    return a
                },
                a = b.columns(c.columns).indexes().map(function(a) { var d = b.column(a).header(); return c.format.header(d.innerHTML, a, d) }).toArray(),
                i = b.table().footer() ? b.columns(c.columns).indexes().map(function(a) { var d = b.column(a).footer(); return c.format.footer(d ? d.innerHTML : "", a, d) }).toArray() : null,
                g =
                d.extend({}, c.modifier);
            b.select && "function" === typeof b.select.info && g.selected === n && b.rows(c.rows, d.extend({ selected: !0 }, g)).any() && d.extend(g, { selected: !0 });
            for (var g = b.rows(c.rows, g).indexes().toArray(), f = b.cells(g, c.columns), g = f.render(c.orthogonal).toArray(), f = f.nodes().toArray(), k = a.length, m = [], h = 0, l = 0, p = 0 < k ? g.length / k : 0; l < p; l++) { for (var o = [k], q = 0; q < k; q++) o[q] = c.format.body(g[h], l, q, f[h]), h++;
                m[l] = o }
            a = { header: a, footer: i, body: m };
            c.customizeData && c.customizeData(a);
            return a
        }
    });
    j.Api.register("buttons.exportInfo()",
        function(a) {
            a || (a = {});
            var b;
            var c = a;
            b = "*" === c.filename && "*" !== c.title && c.title !== n && null !== c.title && "" !== c.title ? c.title : c.filename;
            "function" === typeof b && (b = b());
            b === n || null === b ? b = null : (-1 !== b.indexOf("*") && (b = d.trim(b.replace("*", d("head > title").text()))), b = b.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, ""), (c = s(c.extension)) || (c = ""), b += c);
            c = s(a.title);
            c = null === c ? null : -1 !== c.indexOf("*") ? c.replace("*", d("head > title").text() || "Exported data") : c;
            return {
                filename: b,
                title: c,
                messageTop: w(this,
                    a.message || a.messageTop, "top"),
                messageBottom: w(this, a.messageBottom, "bottom")
            }
        });
    var s = function(a) { return null === a || a === n ? null : "function" === typeof a ? a() : a },
        w = function(a, b, c) { b = s(b); if (null === b) return null;
            a = d("caption", a.table().container()).eq(0); return "*" === b ? a.css("caption-side") !== c ? null : a.length ? a.text() : "" : b },
        v = d("<textarea/>")[0];
    d.fn.dataTable.Buttons = m;
    d.fn.DataTable.Buttons = m;
    d(o).on("init.dt plugin-init.dt", function(a, b) {
        if ("dt" === a.namespace) {
            var c = b.oInit.buttons || j.defaults.buttons;
            c && !b._buttons && (new m(b, c)).container()
        }
    });
    j.ext.feature.push({ fnInit: t, cFeature: "B" });
    j.ext.features && j.ext.features.register("buttons", t);
    return m
});