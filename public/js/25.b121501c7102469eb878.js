(window.webpackJsonp = window.webpackJsonp || []).push([
  [25],
  {
    1405: function(e, t, n) {
      "use strict";
      var a = n(1406).CopyToClipboard;
      (a.CopyToClipboard = a), (e.exports = a);
    },
    1406: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.CopyToClipboard = void 0);
      var a = o(n(0)),
        r = o(n(1407));
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function i(e) {
        return (i =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function s(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          t &&
            (a = a.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, a);
        }
        return n;
      }
      function l(e, t) {
        if (null == e) return {};
        var n,
          a,
          r = (function(e, t) {
            if (null == e) return {};
            var n,
              a,
              r = {},
              o = Object.keys(e);
            for (a = 0; a < o.length; a++)
              (n = o[a]), t.indexOf(n) >= 0 || (r[n] = e[n]);
            return r;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (a = 0; a < o.length; a++)
            (n = o[a]),
              t.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, n) &&
                  (r[n] = e[n]));
        }
        return r;
      }
      function c(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function u(e, t) {
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          (a.enumerable = a.enumerable || !1),
            (a.configurable = !0),
            "value" in a && (a.writable = !0),
            Object.defineProperty(e, a.key, a);
        }
      }
      function m(e, t) {
        return !t || ("object" !== i(t) && "function" != typeof t) ? p(e) : t;
      }
      function f(e) {
        return (f = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function(e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      function p(e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return e;
      }
      function d(e, t) {
        return (d =
          Object.setPrototypeOf ||
          function(e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      function b(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[t] = n),
          e
        );
      }
      var h = (function(e) {
        function t() {
          var e, n;
          c(this, t);
          for (var o = arguments.length, i = new Array(o), s = 0; s < o; s++)
            i[s] = arguments[s];
          return (
            b(
              p((n = m(this, (e = f(t)).call.apply(e, [this].concat(i))))),
              "onClick",
              function(e) {
                var t = n.props,
                  o = t.text,
                  i = t.onCopy,
                  s = t.children,
                  l = t.options,
                  c = a.default.Children.only(s),
                  u = (0, r.default)(o, l);
                i && i(o, u),
                  c &&
                    c.props &&
                    "function" == typeof c.props.onClick &&
                    c.props.onClick(e);
              }
            ),
            n
          );
        }
        var n, o, i;
        return (
          (function(e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 }
            })),
              t && d(e, t);
          })(t, e),
          (n = t),
          (o = [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = (e.text, e.onCopy, e.options, e.children),
                  n = l(e, ["text", "onCopy", "options", "children"]),
                  r = a.default.Children.only(t);
                return a.default.cloneElement(
                  r,
                  (function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                      var n = null != arguments[t] ? arguments[t] : {};
                      t % 2
                        ? s(n, !0).forEach(function(t) {
                            b(e, t, n[t]);
                          })
                        : Object.getOwnPropertyDescriptors
                        ? Object.defineProperties(
                            e,
                            Object.getOwnPropertyDescriptors(n)
                          )
                        : s(n).forEach(function(t) {
                            Object.defineProperty(
                              e,
                              t,
                              Object.getOwnPropertyDescriptor(n, t)
                            );
                          });
                    }
                    return e;
                  })({}, n, { onClick: this.onClick })
                );
              }
            }
          ]) && u(n.prototype, o),
          i && u(n, i),
          t
        );
      })(a.default.PureComponent);
      (t.CopyToClipboard = h),
        b(h, "defaultProps", { onCopy: void 0, options: void 0 });
    },
    1407: function(e, t, n) {
      "use strict";
      var a = n(1408),
        r = { "text/plain": "Text", "text/html": "Url", default: "Text" };
      e.exports = function(e, t) {
        var n,
          o,
          i,
          s,
          l,
          c,
          u = !1;
        t || (t = {}), (n = t.debug || !1);
        try {
          if (
            ((i = a()),
            (s = document.createRange()),
            (l = document.getSelection()),
            ((c = document.createElement("span")).textContent = e),
            (c.style.all = "unset"),
            (c.style.position = "fixed"),
            (c.style.top = 0),
            (c.style.clip = "rect(0, 0, 0, 0)"),
            (c.style.whiteSpace = "pre"),
            (c.style.webkitUserSelect = "text"),
            (c.style.MozUserSelect = "text"),
            (c.style.msUserSelect = "text"),
            (c.style.userSelect = "text"),
            c.addEventListener("copy", function(a) {
              if ((a.stopPropagation(), t.format))
                if ((a.preventDefault(), void 0 === a.clipboardData)) {
                  n && console.warn("unable to use e.clipboardData"),
                    n && console.warn("trying IE specific stuff"),
                    window.clipboardData.clearData();
                  var o = r[t.format] || r.default;
                  window.clipboardData.setData(o, e);
                } else
                  a.clipboardData.clearData(),
                    a.clipboardData.setData(t.format, e);
              t.onCopy && (a.preventDefault(), t.onCopy(a.clipboardData));
            }),
            document.body.appendChild(c),
            s.selectNodeContents(c),
            l.addRange(s),
            !document.execCommand("copy"))
          )
            throw new Error("copy command was unsuccessful");
          u = !0;
        } catch (a) {
          n && console.error("unable to copy using execCommand: ", a),
            n && console.warn("trying IE specific stuff");
          try {
            window.clipboardData.setData(t.format || "text", e),
              t.onCopy && t.onCopy(window.clipboardData),
              (u = !0);
          } catch (a) {
            n && console.error("unable to copy using clipboardData: ", a),
              n && console.error("falling back to prompt"),
              (o = (function(e) {
                var t =
                  (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
                return e.replace(/#{\s*key\s*}/g, t);
              })(
                "message" in t ? t.message : "Copy to clipboard: #{key}, Enter"
              )),
              window.prompt(o, e);
          }
        } finally {
          l &&
            ("function" == typeof l.removeRange
              ? l.removeRange(s)
              : l.removeAllRanges()),
            c && document.body.removeChild(c),
            i();
        }
        return u;
      };
    },
    1408: function(e, t) {
      e.exports = function() {
        var e = document.getSelection();
        if (!e.rangeCount) return function() {};
        for (
          var t = document.activeElement, n = [], a = 0;
          a < e.rangeCount;
          a++
        )
          n.push(e.getRangeAt(a));
        switch (t.tagName.toUpperCase()) {
          case "INPUT":
          case "TEXTAREA":
            t.blur();
            break;
          default:
            t = null;
        }
        return (
          e.removeAllRanges(),
          function() {
            "Caret" === e.type && e.removeAllRanges(),
              e.rangeCount ||
                n.forEach(function(t) {
                  e.addRange(t);
                }),
              t && t.focus();
          }
        );
      };
    },
    1456: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        o = n(25),
        i = n.n(o),
        s = n(26),
        l = n.n(s),
        c = n(27),
        u = n.n(c),
        m = n(16),
        f = n.n(m),
        p = n(0),
        d = n.n(p),
        b = n(32),
        h = function(e) {
          return { type: "FETCH_WEBFORM_DETAILS", id: e };
        },
        v = n(22),
        y = n.n(v),
        g = n(6),
        E = n.n(g),
        w = n(4),
        D = n(693),
        C = n(100),
        N = n(981),
        O = Object(b.b)(null, function(e) {
          return {
            deleteWebform: function(t) {
              e(Object(N.b)(t));
            }
          };
        })(function(e) {
          return d.a.createElement(
            C.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return (
                  e.deleteWebform(e.id),
                  e.closeDeleteItemModal(),
                  void w.f.push("/webformulieren")
                );
              },
              title: "Verwijderen"
            },
            "Verwijder webformulier: ",
            d.a.createElement("strong", null, " ", e.name, " ")
          );
        });
      function k(e) {
        var t = (function() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function() {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();
        return function() {
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var S = (function(e) {
          l()(n, e);
          var t = k(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              E()(y()(a), "toggleDelete", function() {
                a.setState({ showDelete: !a.state.showDelete });
              }),
              (a.state = { showDelete: !1 }),
              a
            );
          }
          return (
            i()(n, [
              {
                key: "render",
                value: function() {
                  return d.a.createElement(
                    "div",
                    { className: "row" },
                    d.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      d.a.createElement(
                        "div",
                        {
                          className: "btn-group btn-group-flex margin-small",
                          role: "group"
                        },
                        d.a.createElement(D.a, {
                          iconName: "glyphicon-arrow-left",
                          onClickAction: w.e.goBack
                        }),
                        d.a.createElement(D.a, {
                          iconName: "glyphicon-trash",
                          onClickAction: this.toggleDelete
                        })
                      )
                    ),
                    d.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      d.a.createElement(
                        "h4",
                        { className: "text-center" },
                        "Webformulier: ",
                        this.props.name
                      )
                    ),
                    d.a.createElement("div", { className: "col-md-4" }),
                    this.state.showDelete &&
                      d.a.createElement(O, {
                        closeDeleteItemModal: this.toggleDelete,
                        name: this.props.name,
                        id: this.props.id
                      })
                  );
                }
              }
            ]),
            n
          );
        })(p.Component),
        R = Object(b.b)(function(e) {
          return { name: e.webformDetails.name, id: e.webformDetails.id };
        }, null)(S),
        x = n(198),
        T = n(697),
        A = n.n(T),
        P = n(982),
        j = n.n(P),
        M = n(7),
        q = n.n(M),
        I = n(694),
        B = n(692),
        L = n(690),
        z = n(691),
        _ = n(699),
        F = n(746);
      function V(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          t &&
            (a = a.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, a);
        }
        return n;
      }
      function K(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? V(Object(n), !0).forEach(function(t) {
                E()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : V(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function W(e) {
        var t = (function() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function() {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();
        return function() {
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      q.a.locale("nl");
      var U = (function(e) {
          l()(n, e);
          var t = W(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              ((a = t.call(this, e)).state = {
                webform: K(
                  K({}, e.webformDetails),
                  {},
                  {
                    responsible: e.webformDetails.responsibleUserId
                      ? "user" + e.webformDetails.responsibleUserId
                      : "team" + e.webformDetails.responsibleTeamId,
                    dateStart: e.webformDetails.dateStart
                      ? e.webformDetails.dateStart
                      : "",
                    dateEnd: e.webformDetails.dateEnd
                      ? e.webformDetails.dateEnd
                      : "",
                    apiKeyDate: e.webformDetails.apiKeyDate
                      ? e.webformDetails.apiKeyDate
                      : ""
                  }
                ),
                errors: { name: !1 }
              }),
              (a.handleInputChange = a.handleInputChange.bind(y()(a))),
              (a.handleInputChangeDate = a.handleInputChangeDate.bind(y()(a))),
              (a.handleSubmit = a.handleSubmit.bind(y()(a))),
              (a.refreshKey = a.refreshKey.bind(y()(a))),
              a
            );
          }
          return (
            i()(n, [
              {
                key: "handleInputChange",
                value: function(e) {
                  var t = e.target,
                    n = "checkbox" === t.type ? t.checked : t.value,
                    a = t.name;
                  this.setState(
                    K(
                      K({}, this.state),
                      {},
                      {
                        webform: K(K({}, this.state.webform), {}, E()({}, a, n))
                      }
                    )
                  );
                }
              },
              {
                key: "refreshKey",
                value: function() {
                  this.setState(
                    K(
                      K({}, this.state),
                      {},
                      {
                        webform: K(
                          K({}, this.state.webform),
                          {},
                          { apiKey: j()(), apiKeyDate: q()() }
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "handleInputChangeDate",
                value: function(e, t) {
                  this.setState(
                    K(
                      K({}, this.state),
                      {},
                      {
                        webform: K(K({}, this.state.webform), {}, E()({}, t, e))
                      }
                    )
                  );
                }
              },
              {
                key: "handleSubmit",
                value: function(e) {
                  e.preventDefault();
                  var t = this.state.webform,
                    n = {},
                    a = !1;
                  A.a.isEmpty(t.name) && ((n.name = !0), (a = !0)),
                    A.a.isEmpty(t.maxRequestsPerMinute.toString()) &&
                      ((n.maxRequestsPerMinute = !0), (a = !0)),
                    A.a.isEmpty(t.responsible) &&
                      ((n.responsible = !0), (a = !0)),
                    t.responsible.search("user") >= 0 &&
                      ((t.responsibleUserId = t.responsible.replace(
                        "user",
                        ""
                      )),
                      (t.responsibleTeamId = "")),
                    t.responsible.search("team") >= 0 &&
                      ((t.responsibleUserId = ""),
                      (t.responsibleTeamId = t.responsible.replace(
                        "team",
                        ""
                      ))),
                    this.setState(K(K({}, this.state), {}, { errors: n })),
                    !a && this.props.updateWebform(t, this.props.switchToView);
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.webform,
                    t = e.name,
                    n = e.apiKey,
                    a = e.apiKeyDate,
                    r = e.maxRequestsPerMinute,
                    o = e.dateStart,
                    i = e.dateEnd,
                    s = e.responsible;
                  return d.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    d.a.createElement(
                      L.a,
                      null,
                      d.a.createElement(
                        z.a,
                        null,
                        d.a.createElement(
                          "div",
                          { className: "row" },
                          d.a.createElement(I.a, {
                            label: "Naam",
                            name: "name",
                            value: t,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.name
                          }),
                          d.a.createElement(I.a, {
                            label: "Sleutel",
                            name: "apiKey",
                            value: n,
                            onChangeAction: this.handleInputChange,
                            readOnly: !0
                          }),
                          d.a.createElement("span", {
                            className:
                              "glyphicon glyphicon-refresh mybtn-success",
                            style: { top: "5px" },
                            role: "button",
                            onClick: this.refreshKey,
                            title: "Ververs sleutel"
                          })
                        ),
                        d.a.createElement(
                          "div",
                          { className: "row" },
                          d.a.createElement(I.a, {
                            label: "Aanvragen per minuut",
                            type: "number",
                            name: "maxRequestsPerMinute",
                            value: r,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.maxRequestsPerMinute
                          }),
                          d.a.createElement(I.a, {
                            label: "Datum sleutel",
                            name: "apiKeyDate",
                            value: q()(a).format("L"),
                            onChangeAction: function() {},
                            readOnly: !0
                          })
                        ),
                        d.a.createElement(
                          "div",
                          { className: "row" },
                          d.a.createElement(_.a, {
                            label: "Startdatum",
                            name: "dateStart",
                            value: o,
                            onChangeAction: this.handleInputChangeDate
                          }),
                          d.a.createElement(_.a, {
                            label: "Einddatum",
                            name: "dateEnd",
                            value: i,
                            onChangeAction: this.handleInputChangeDate
                          })
                        ),
                        d.a.createElement(
                          "div",
                          { className: "row" },
                          d.a.createElement(F.a, {
                            label: "Verantwoordelijke",
                            size: "col-sm-6",
                            name: "responsible",
                            optionsInGroups: [
                              {
                                name: "user",
                                label: "Gebruikers",
                                options: this.props.users,
                                optionName: "fullName"
                              },
                              {
                                name: "team",
                                label: "Team",
                                options: this.props.teams
                              }
                            ],
                            value: s,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.responsible
                          })
                        )
                      ),
                      d.a.createElement(
                        z.a,
                        null,
                        d.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          d.a.createElement(B.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Sluiten",
                            onClickAction: this.props.switchToView
                          }),
                          d.a.createElement(B.a, {
                            buttonText: "Opslaan",
                            onClickAction: this.handleSubmit,
                            type: "submit",
                            value: "Submit"
                          })
                        )
                      )
                    )
                  );
                }
              }
            ]),
            n
          );
        })(p.Component),
        G = Object(b.b)(
          function(e) {
            return {
              webformDetails: e.webformDetails,
              teams: e.systemData.teams,
              users: e.systemData.users
            };
          },
          function(e) {
            return {
              updateWebform: function(t, n) {
                e(
                  (function(e, t) {
                    return {
                      type: "UPDATE_WEBFORM",
                      webform: e,
                      switchToView: t
                    };
                  })(t, n)
                );
              }
            };
          }
        )(U),
        Y = n(1405),
        H = n.n(Y),
        J = n(695),
        X = Object(b.b)(function(e) {
          return { webformDetails: e.webformDetails };
        })(function(e) {
          var t = e.webformDetails,
            n = t.name,
            a = t.apiKey,
            r = t.apiKeyDate,
            o = t.maxRequestsPerMinute,
            i = t.dateStart,
            s = t.dateEnd,
            l = t.responsibleUser,
            c = t.responsibleTeam;
          return d.a.createElement(
            "div",
            null,
            d.a.createElement(
              L.a,
              null,
              d.a.createElement(
                z.a,
                null,
                d.a.createElement(
                  "div",
                  { className: "row" },
                  d.a.createElement(
                    "div",
                    { className: "col-sm-6", onClick: e.switchToEdit },
                    d.a.createElement(
                      "label",
                      { className: "col-sm-6" },
                      "Naam"
                    ),
                    d.a.createElement("div", { className: "col-sm-6" }, n)
                  ),
                  d.a.createElement(
                    "div",
                    { className: "col-sm-6" },
                    d.a.createElement(
                      "label",
                      { className: "col-sm-6", onClick: e.switchToEdit },
                      "Sleutel"
                    ),
                    d.a.createElement(
                      "div",
                      {
                        className: "col-sm-6",
                        style: { paddingRight: "5px" },
                        onClick: null
                      },
                      a,
                      d.a.createElement(
                        H.a,
                        { text: a },
                        d.a.createElement("span", {
                          className:
                            "glyphicon glyphicon-copy mybtn-success pull-right",
                          style: { top: "5px" },
                          role: "button",
                          onClick: null,
                          title: "Kopieer sleutel"
                        })
                      )
                    )
                  )
                ),
                d.a.createElement(
                  "div",
                  { className: "row", onClick: e.switchToEdit },
                  d.a.createElement(J.a, {
                    label: "Aanvragen per minuut?",
                    value: o
                  }),
                  d.a.createElement(J.a, {
                    label: "Datum sleutel",
                    value: r && q()(r).format("L")
                  })
                ),
                d.a.createElement(
                  "div",
                  { className: "row", onClick: e.switchToEdit },
                  d.a.createElement(J.a, {
                    label: "Startdatum",
                    value: i && q()(i).format("L")
                  }),
                  d.a.createElement(J.a, {
                    label: "Einddatum",
                    value: s && q()(s).format("L")
                  })
                ),
                d.a.createElement(
                  "div",
                  { className: "row", onClick: e.switchToEdit },
                  d.a.createElement(J.a, {
                    label: "Verantwoordelijke",
                    value: l ? l.fullName : c.name,
                    link: l ? "gebruiker/" + l.id : "team/" + c.id
                  })
                )
              )
            )
          );
        });
      function Q(e) {
        var t = (function() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function() {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();
        return function() {
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var Z = (function(e) {
          l()(n, e);
          var t = Q(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              E()(y()(a), "switchToEdit", function() {
                a.setState({ showEdit: !0 });
              }),
              E()(y()(a), "switchToView", function() {
                a.setState({ showEdit: !1, activeDiv: "" });
              }),
              (a.state = { showEdit: !1, activeDiv: "" }),
              a
            );
          }
          return (
            i()(n, [
              {
                key: "onDivEnter",
                value: function() {
                  this.setState({ activeDiv: "panel-grey" });
                }
              },
              {
                key: "onDivLeave",
                value: function() {
                  this.state.showEdit || this.setState({ activeDiv: "" });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.meDetails.permissions,
                    n = void 0 === t ? {} : t;
                  return d.a.createElement(
                    "div",
                    {
                      className: this.state.activeDiv,
                      onMouseEnter: function() {
                        return e.onDivEnter();
                      },
                      onMouseLeave: function() {
                        return e.onDivLeave();
                      }
                    },
                    this.state.showEdit && n.manageWebform
                      ? d.a.createElement(G, {
                          switchToView: this.switchToView
                        })
                      : d.a.createElement(X, {
                          switchToEdit: this.switchToEdit
                        })
                  );
                }
              }
            ]),
            n
          );
        })(p.Component),
        $ = Object(b.b)(function(e) {
          return {
            teamDetails: e.teamDetails,
            meDetails: e.meDetails,
            permissions: e.meDetails.permissions
          };
        })(Z);
      function ee(e) {
        var t = (function() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function() {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();
        return function() {
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var te = (function(e) {
          l()(n, e);
          var t = ee(n);
          function n(e) {
            return r()(this, n), t.call(this, e);
          }
          return (
            i()(n, [
              {
                key: "render",
                value: function() {
                  var e = "",
                    t = !0;
                  return (
                    this.props.hasError
                      ? (e = "Fout bij het ophalen van webformulier.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : Object(x.isEmpty)(this.props.webformDetails)
                      ? (e = "Geen webformulier gevonden!")
                      : (t = !1),
                    t
                      ? d.a.createElement("div", null, e)
                      : d.a.createElement(
                          "div",
                          null,
                          d.a.createElement($, null)
                        )
                  );
                }
              }
            ]),
            n
          );
        })(p.Component),
        ne = Object(b.b)(
          function(e) {
            return {
              webformDetails: e.webformDetails,
              isLoading: e.loadingData.isLoading,
              hasError: e.loadingData.hasError
            };
          },
          function(e) {
            return {
              fetchWebformDetails: function(t) {
                e(h(t));
              }
            };
          }
        )(te);
      function ae(e) {
        var t = (function() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function() {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();
        return function() {
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var re = (function(e) {
        l()(n, e);
        var t = ae(n);
        function n(e) {
          return r()(this, n), t.call(this, e);
        }
        return (
          i()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchWebformDetails(this.props.params.id);
              }
            },
            {
              key: "render",
              value: function() {
                return d.a.createElement(
                  "div",
                  { className: "row" },
                  d.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    d.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      d.a.createElement(
                        L.a,
                        null,
                        d.a.createElement(
                          z.a,
                          { className: "panel-small" },
                          d.a.createElement(R, null)
                        )
                      )
                    ),
                    d.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      d.a.createElement(ne, null)
                    )
                  ),
                  d.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          n
        );
      })(p.Component);
      t.default = Object(b.b)(
        function(e) {
          return { webformDetails: e.webformDetails };
        },
        function(e) {
          return {
            fetchWebformDetails: function(t) {
              e(h(t));
            }
          };
        }
      )(re);
    },
    690: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        i = n.n(o),
        s = function(e) {
          var t = e.children,
            n = e.className,
            a = e.onMouseEnter,
            o = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(n),
              onMouseEnter: a,
              onMouseLeave: o
            },
            t
          );
        };
      (s.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (s.propTypes = {
          className: i.a.string,
          onMouseEnter: i.a.func,
          onMouseLeave: i.a.func
        }),
        (t.a = s);
    },
    691: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        i = n.n(o),
        s = function(e) {
          var t = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            n
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: i.a.string }),
        (t.a = s);
    },
    692: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        i = n.n(o),
        s = function(e) {
          var t = e.buttonClassName,
            n = e.buttonText,
            a = e.onClickAction,
            o = e.type,
            i = e.value,
            s = e.loading,
            l = e.loadText,
            c = e.disabled;
          return s
            ? r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: i,
                  disabled: s
                },
                r.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                l
              )
            : r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm ".concat(t),
                  onClick: a,
                  value: i,
                  disabled: c
                },
                n
              );
        };
      (s.defaultProps = {
        buttonClassName: "btn-success",
        type: "button",
        value: "",
        loading: !1,
        loadText: "Aan het laden",
        disabled: !1
      }),
        (s.propTypes = {
          buttonClassName: i.a.string,
          buttonText: i.a.string.isRequired,
          onClickAction: i.a.func,
          type: i.a.string,
          value: i.a.string,
          loading: i.a.bool,
          loadText: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = s);
    },
    693: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        i = n.n(o),
        s = function(e) {
          var t = e.buttonClassName,
            n = e.iconName,
            a = e.onClickAction,
            o = e.title,
            i = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: a,
              disabled: i,
              title: o
            },
            r.a.createElement("span", { className: "glyphicon ".concat(n) })
          );
        };
      (s.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (s.propTypes = {
          buttonClassName: i.a.string,
          iconName: i.a.string.isRequired,
          onClickAction: i.a.func,
          title: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = s);
    },
    694: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        i = n.n(o),
        s = function(e) {
          var t = e.label,
            n = e.type,
            a = e.className,
            o = e.size,
            i = e.id,
            s = e.placeholder,
            l = e.name,
            c = e.value,
            u = e.onClickAction,
            m = e.onChangeAction,
            f = e.onBlurAction,
            p = e.required,
            d = e.readOnly,
            b = e.maxLength,
            h = e.error,
            v = e.min,
            y = e.max,
            g = e.step,
            E = e.errorMessage,
            w = e.divSize,
            D = e.divClassName,
            C = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(w, " ").concat(D) },
            r.a.createElement(
              "label",
              { htmlFor: i, className: "col-sm-6 ".concat(p) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(o) },
              r.a.createElement("input", {
                type: n,
                className:
                  "form-control input-sm ".concat(a) + (h ? "has-error" : ""),
                id: i,
                placeholder: s,
                name: l,
                value: c,
                onClick: u,
                onChange: m,
                onBlur: f,
                readOnly: d,
                maxLength: b,
                min: v,
                max: y,
                autoComplete: C,
                step: g
              })
            ),
            h &&
              r.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                r.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  E
                )
              )
          );
        };
      (s.defaultProps = {
        divClassName: "",
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        name: "",
        type: "text",
        value: "",
        required: "",
        readOnly: !1,
        maxLength: null,
        error: !1,
        min: "",
        max: "",
        step: "",
        errorMessage: "",
        autoComplete: "off",
        onBlurAction: function() {},
        onClickAction: function() {},
        onChangeAction: function() {}
      }),
        (s.propTypes = {
          label: i.a.oneOfType([i.a.string, i.a.object]).isRequired,
          type: i.a.string,
          className: i.a.string,
          divClassName: i.a.string,
          size: i.a.string,
          divSize: i.a.string,
          id: i.a.string,
          placeholder: i.a.string,
          name: i.a.string.isRequired,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          onClickAction: i.a.func,
          onChangeAction: i.a.func,
          onBlurAction: i.a.func,
          required: i.a.string,
          readOnly: i.a.bool,
          maxLength: i.a.string,
          error: i.a.bool,
          min: i.a.string,
          max: i.a.string,
          step: i.a.string,
          errorMessage: i.a.string,
          autoComplete: i.a.string
        }),
        (t.a = s);
    },
    695: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(4),
        i = n(8),
        s = n.n(i),
        l = function(e) {
          var t = e.label,
            n = e.className,
            a = e.id,
            i = e.value,
            s = e.link,
            l = e.hidden;
          return s.length > 0
            ? r.a.createElement(
                "div",
                { className: n, style: l ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: a, className: "col-sm-6" },
                  t
                ),
                r.a.createElement(
                  "div",
                  { className: "col-sm-6", id: a, onClick: null },
                  r.a.createElement(
                    o.b,
                    { to: s, className: "link-underline" },
                    i
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: n, style: l ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: a, className: "col-sm-6" },
                  t
                ),
                r.a.createElement("div", { className: "col-sm-6", id: a }, i)
              );
        };
      (l.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (l.propTypes = {
          label: s.a.oneOfType([s.a.string, s.a.object]).isRequired,
          className: s.a.string,
          id: s.a.string,
          value: s.a.oneOfType([s.a.string, s.a.number]),
          link: s.a.string,
          hidden: s.a.bool
        }),
        (t.a = l);
    },
    699: function(e, t, n) {
      "use strict";
      var a = n(24),
        r = n.n(a),
        o = n(25),
        i = n.n(o),
        s = n(22),
        l = n.n(s),
        c = n(26),
        u = n.n(c),
        m = n(27),
        f = n.n(m),
        p = n(16),
        d = n.n(p),
        b = n(6),
        h = n.n(b),
        v = n(0),
        y = n.n(v),
        g = n(8),
        E = n.n(g),
        w = n(707),
        D = n.n(w),
        C = n(708),
        N = n.n(C),
        O = n(7),
        k = n.n(O);
      function S(e) {
        var t = (function() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function() {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();
        return function() {
          var n,
            a = d()(e);
          if (t) {
            var r = d()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return f()(this, n);
        };
      }
      k.a.locale("nl");
      var R = (function(e) {
        u()(n, e);
        var t = S(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            (a = t.call(this, e)),
            h()(l()(a), "validateDate", function(e) {
              var t = k()(e.target.value, "DD-MM-YYYY", !0),
                n = !1;
              t.isValid() || "" === e.target.value || (n = !0),
                a.props.disabledBefore &&
                  t.isBefore(a.props.disabledBefore) &&
                  (n = !0),
                a.props.disabledAfter &&
                  t.isAfter(a.props.disabledAfter) &&
                  (n = !0),
                a.setState({ errorDateFormat: n });
            }),
            h()(l()(a), "onDateChange", function(e) {
              var t = e ? k()(e).format("Y-MM-DD") : "",
                n = !1;
              t &&
                a.props.disabledBefore &&
                k()(t).isBefore(a.props.disabledBefore) &&
                (n = !0),
                t &&
                  a.props.disabledAfter &&
                  k()(t).isAfter(a.props.disabledAfter) &&
                  (n = !0),
                a.setState({ errorDateFormat: n }),
                !n && a.props.onChangeAction(t, a.props.name);
            }),
            (a.state = { errorDateFormat: !1 }),
            a
          );
        }
        return (
          i()(n, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.label,
                  n = e.className,
                  a = e.size,
                  r = e.divSize,
                  o = e.id,
                  i = e.value,
                  s = e.required,
                  l = e.readOnly,
                  c = e.name,
                  u = e.error,
                  m = e.errorMessage,
                  f = e.disabledBefore,
                  p = e.disabledAfter,
                  d = i ? k()(i).format("L") : "",
                  b = {};
                return (
                  f && (b.before = new Date(f)),
                  p && (b.after = new Date(p)),
                  y.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    y.a.createElement(
                      "div",
                      null,
                      y.a.createElement(
                        "label",
                        { htmlFor: o, className: "col-sm-6 ".concat(s) },
                        t
                      )
                    ),
                    y.a.createElement(
                      "div",
                      { className: "".concat(a) },
                      y.a.createElement(D.a, {
                        id: o,
                        value: d,
                        formatDate: C.formatDate,
                        parseDate: C.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: N.a,
                          disabledDays: b
                        },
                        inputProps: {
                          className:
                            "form-control input-sm ".concat(n) +
                            (this.state.errorDateFormat || u
                              ? " has-error"
                              : ""),
                          name: c,
                          onBlur: this.validateDate,
                          autoComplete: "off",
                          readOnly: l,
                          disabled: l
                        },
                        required: s,
                        readOnly: l,
                        placeholder: ""
                      })
                    ),
                    u &&
                      y.a.createElement(
                        "div",
                        { className: "col-sm-offset-6 col-sm-6" },
                        y.a.createElement(
                          "span",
                          { className: "has-error-message" },
                          " ",
                          m
                        )
                      )
                  )
                );
              }
            }
          ]),
          n
        );
      })(v.Component);
      (R.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        required: "",
        readOnly: !1,
        value: null,
        error: !1,
        errorMessage: "",
        disabledBefore: null,
        disabledAfter: null
      }),
        (R.propTypes = {
          label: E.a.string.isRequired,
          type: E.a.string,
          className: E.a.string,
          size: E.a.string,
          divSize: E.a.string,
          id: E.a.string,
          name: E.a.string,
          value: E.a.oneOfType([E.a.string, E.a.object]),
          onChangeAction: E.a.func,
          required: E.a.string,
          readOnly: E.a.bool,
          error: E.a.bool,
          errorMessage: E.a.string,
          disabledBefore: E.a.string,
          disabledAfter: E.a.string
        }),
        (t.a = R);
    },
    746: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        i = n.n(o),
        s = function(e) {
          var t = e.label,
            n = e.className,
            a = e.size,
            o = e.divSize,
            i = e.id,
            s = e.name,
            l = e.value,
            c = e.optionsInGroups,
            u = e.onChangeAction,
            m = e.onBlurAction,
            f = e.required,
            p = e.error,
            d = e.readOnly;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(o) },
            r.a.createElement(
              "label",
              { htmlFor: i, className: "col-sm-6 ".concat(f) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(a) },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(n) + (p && " has-error"),
                  id: i,
                  name: s,
                  value: l,
                  onChange: u,
                  onBlur: m,
                  readOnly: d
                },
                r.a.createElement("option", { value: "" }),
                c.map(function(e, t) {
                  var n = e.optionName || "name";
                  return r.a.createElement(
                    "optgroup",
                    { key: t, label: e.label },
                    e.options.map(function(t) {
                      return r.a.createElement(
                        "option",
                        { key: t.id, value: e.name + t.id },
                        t[n]
                      );
                    })
                  );
                })
              )
            )
          );
        };
      (s.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        readOnly: !1,
        required: "",
        error: !1,
        value: ""
      }),
        (s.propTypes = {
          label: i.a.string.isRequired,
          className: i.a.string,
          size: i.a.string,
          divSize: i.a.string,
          id: i.a.string,
          name: i.a.string.isRequired,
          optionsInGroups: i.a.array,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          onChangeAction: i.a.func,
          onBlurAction: i.a.func,
          required: i.a.string,
          readOnly: i.a.bool,
          error: i.a.bool,
          optionName: i.a.string
        }),
        (t.a = s);
    },
    850: function(e, t) {
      var n =
        ("undefined" != typeof crypto &&
          crypto.getRandomValues &&
          crypto.getRandomValues.bind(crypto)) ||
        ("undefined" != typeof msCrypto &&
          "function" == typeof window.msCrypto.getRandomValues &&
          msCrypto.getRandomValues.bind(msCrypto));
      if (n) {
        var a = new Uint8Array(16);
        e.exports = function() {
          return n(a), a;
        };
      } else {
        var r = new Array(16);
        e.exports = function() {
          for (var e, t = 0; t < 16; t++)
            0 == (3 & t) && (e = 4294967296 * Math.random()),
              (r[t] = (e >>> ((3 & t) << 3)) & 255);
          return r;
        };
      }
    },
    851: function(e, t) {
      for (var n = [], a = 0; a < 256; ++a)
        n[a] = (a + 256).toString(16).substr(1);
      e.exports = function(e, t) {
        var a = t || 0,
          r = n;
        return [
          r[e[a++]],
          r[e[a++]],
          r[e[a++]],
          r[e[a++]],
          "-",
          r[e[a++]],
          r[e[a++]],
          "-",
          r[e[a++]],
          r[e[a++]],
          "-",
          r[e[a++]],
          r[e[a++]],
          "-",
          r[e[a++]],
          r[e[a++]],
          r[e[a++]],
          r[e[a++]],
          r[e[a++]],
          r[e[a++]]
        ].join("");
      };
    },
    981: function(e, t, n) {
      "use strict";
      n.d(t, "c", function() {
        return a;
      }),
        n.d(t, "a", function() {
          return r;
        }),
        n.d(t, "b", function() {
          return o;
        });
      var a = function() {
          return { type: "FETCH_WEBFORMS" };
        },
        r = function() {
          return { type: "CLEAR_WEBFORMS" };
        },
        o = function(e) {
          return { type: "DELETE_WEBFORM", id: e };
        };
    },
    982: function(e, t, n) {
      var a = n(983),
        r = n(984),
        o = r;
      (o.v1 = a), (o.v4 = r), (e.exports = o);
    },
    983: function(e, t, n) {
      var a,
        r,
        o = n(850),
        i = n(851),
        s = 0,
        l = 0;
      e.exports = function(e, t, n) {
        var c = (t && n) || 0,
          u = t || [],
          m = (e = e || {}).node || a,
          f = void 0 !== e.clockseq ? e.clockseq : r;
        if (null == m || null == f) {
          var p = o();
          null == m && (m = a = [1 | p[0], p[1], p[2], p[3], p[4], p[5]]),
            null == f && (f = r = 16383 & ((p[6] << 8) | p[7]));
        }
        var d = void 0 !== e.msecs ? e.msecs : new Date().getTime(),
          b = void 0 !== e.nsecs ? e.nsecs : l + 1,
          h = d - s + (b - l) / 1e4;
        if (
          (h < 0 && void 0 === e.clockseq && (f = (f + 1) & 16383),
          (h < 0 || d > s) && void 0 === e.nsecs && (b = 0),
          b >= 1e4)
        )
          throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
        (s = d), (l = b), (r = f);
        var v = (1e4 * (268435455 & (d += 122192928e5)) + b) % 4294967296;
        (u[c++] = (v >>> 24) & 255),
          (u[c++] = (v >>> 16) & 255),
          (u[c++] = (v >>> 8) & 255),
          (u[c++] = 255 & v);
        var y = ((d / 4294967296) * 1e4) & 268435455;
        (u[c++] = (y >>> 8) & 255),
          (u[c++] = 255 & y),
          (u[c++] = ((y >>> 24) & 15) | 16),
          (u[c++] = (y >>> 16) & 255),
          (u[c++] = (f >>> 8) | 128),
          (u[c++] = 255 & f);
        for (var g = 0; g < 6; ++g) u[c + g] = m[g];
        return t || i(u);
      };
    },
    984: function(e, t, n) {
      var a = n(850),
        r = n(851);
      e.exports = function(e, t, n) {
        var o = (t && n) || 0;
        "string" == typeof e &&
          ((t = "binary" === e ? new Array(16) : null), (e = null));
        var i = (e = e || {}).random || (e.rng || a)();
        if (((i[6] = (15 & i[6]) | 64), (i[8] = (63 & i[8]) | 128), t))
          for (var s = 0; s < 16; ++s) t[o + s] = i[s];
        return t || r(i);
      };
    }
  }
]);
