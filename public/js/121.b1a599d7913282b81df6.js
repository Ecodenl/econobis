(window.webpackJsonp = window.webpackJsonp || []).push([
  [121],
  {
    1486: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        o = n(25),
        s = n.n(o),
        c = n(22),
        i = n.n(c),
        l = n(26),
        u = n.n(l),
        m = n(27),
        d = n.n(m),
        h = n(16),
        f = n.n(h),
        p = n(6),
        v = n.n(p),
        E = n(0),
        g = n.n(E),
        y = n(199),
        b = n.n(y),
        N = n(146),
        w = n(147),
        C = n(200),
        R = n(101),
        k = n(4),
        D = n(32),
        L = n(7),
        M = n.n(L);
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
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return d()(this, n);
        };
      }
      var A = (function(e) {
          u()(n, e);
          var t = S(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              ((a = t.call(this, e)).state = {
                showActionButtons: !1,
                highlightRow: ""
              }),
              a
            );
          }
          return (
            s()(n, [
              {
                key: "onRowEnter",
                value: function() {
                  this.setState({
                    showActionButtons: !0,
                    highlightRow: "highlight-row"
                  });
                }
              },
              {
                key: "onRowLeave",
                value: function() {
                  this.setState({ showActionButtons: !1, highlightRow: "" });
                }
              },
              {
                key: "openItem",
                value: function(e) {
                  k.f.push("/btw-code/".concat(e));
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props,
                    n = t.id,
                    a = t.startDate,
                    r = t.description,
                    o = t.percentage,
                    s = t.permissions;
                  return g.a.createElement(
                    "tr",
                    {
                      className: this.state.highlightRow,
                      onDoubleClick: s.manageFinancial
                        ? function() {
                            return e.openItem(n);
                          }
                        : null,
                      onMouseEnter: function() {
                        return e.onRowEnter();
                      },
                      onMouseLeave: function() {
                        return e.onRowLeave();
                      }
                    },
                    g.a.createElement("td", null, a && M()(a).format("L")),
                    g.a.createElement("td", null, r),
                    g.a.createElement("td", null, o, "%"),
                    g.a.createElement(
                      "td",
                      null,
                      this.state.showActionButtons && s.manageFinancial
                        ? g.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.openItem(n);
                              }
                            },
                            g.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-pencil mybtn-success"
                            }),
                            " "
                          )
                        : ""
                    )
                  );
                }
              }
            ]),
            n
          );
        })(E.Component),
        j = Object(D.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(A),
        F = function(e) {
          var t = e.vatCodes,
            n = e.hasError,
            a = e.isLoading,
            r = "",
            o = !0;
          return (
            n
              ? (r = "Fout bij het ophalen van btw codes.")
              : a
              ? (r = "Gegevens aan het laden.")
              : 0 === t.length
              ? (r = "Geen btw codes gevonden!")
              : (o = !1),
            g.a.createElement(
              "div",
              null,
              g.a.createElement(
                N.a,
                null,
                g.a.createElement(
                  w.a,
                  null,
                  g.a.createElement(
                    "tr",
                    { className: "thead-title" },
                    g.a.createElement(R.a, {
                      title: "Startdatum",
                      width: "20%"
                    }),
                    g.a.createElement(R.a, {
                      title: "Omschrijving",
                      width: "35%"
                    }),
                    g.a.createElement(R.a, {
                      title: "Percentage",
                      width: "40%"
                    }),
                    g.a.createElement(R.a, { title: "", width: "5%" })
                  )
                ),
                g.a.createElement(
                  C.a,
                  null,
                  o
                    ? g.a.createElement(
                        "tr",
                        null,
                        g.a.createElement("td", { colSpan: 4 }, r)
                      )
                    : t.map(function(e) {
                        return g.a.createElement(j, b()({ key: e.id }, e));
                      })
                )
              )
            )
          );
        },
        P = n(693),
        B = Object(D.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.vatCodesCount,
            n = e.refreshVatCodesData;
          e.permissions;
          return g.a.createElement(
            "div",
            { className: "row" },
            g.a.createElement(
              "div",
              { className: "col-md-4" },
              g.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                g.a.createElement(P.a, {
                  iconName: "glyphicon-refresh",
                  onClickAction: n
                })
              )
            ),
            g.a.createElement(
              "div",
              { className: "col-md-4" },
              g.a.createElement(
                "h3",
                { className: "text-center table-title" },
                "BTW codes"
              )
            ),
            g.a.createElement(
              "div",
              { className: "col-md-4" },
              g.a.createElement(
                "div",
                { className: "pull-right" },
                "Resultaten: ",
                t
              )
            )
          );
        }),
        V = n(690),
        T = n(691),
        x = n(12),
        I = function() {
          return x.a.get("jory/vat-code", {
            params: {
              jory: { fld: ["id", "startDate", "description", "percentage"] }
            }
          });
        };
      function O(e) {
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
          return d()(this, n);
        };
      }
      var G = (function(e) {
        u()(n, e);
        var t = O(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            (a = t.call(this, e)),
            v()(i()(a), "callFetchVatCodesData", function() {
              a.setState({ isLoading: !0, hasError: !1 }),
                I()
                  .then(function(e) {
                    a.setState({ isLoading: !1, vatCodes: e.data.data });
                  })
                  .catch(function(e) {
                    a.setState({ isLoading: !1, hasError: !0 });
                  });
            }),
            (a.state = { vatCodes: [], isLoading: !1, hasError: !1 }),
            a
          );
        }
        return (
          s()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.callFetchVatCodesData();
              }
            },
            {
              key: "render",
              value: function() {
                return g.a.createElement(
                  V.a,
                  null,
                  g.a.createElement(
                    T.a,
                    null,
                    g.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      g.a.createElement(B, {
                        vatCodesCount: this.state.vatCodes
                          ? this.state.vatCodes.length
                          : 0,
                        refreshVatCodesData: this.callFetchVatCodesData
                      })
                    ),
                    g.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      g.a.createElement(F, {
                        vatCodes: this.state.vatCodes,
                        isLoading: this.state.isLoading,
                        hasError: this.state.hasError
                      })
                    )
                  )
                );
              }
            }
          ]),
          n
        );
      })(E.Component);
      t.default = G;
    },
    690: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        s = n.n(o),
        c = function(e) {
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
      (c.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (c.propTypes = {
          className: s.a.string,
          onMouseEnter: s.a.func,
          onMouseLeave: s.a.func
        }),
        (t.a = c);
    },
    691: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        s = n.n(o),
        c = function(e) {
          var t = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            n
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: s.a.string }),
        (t.a = c);
    },
    693: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        s = n.n(o),
        c = function(e) {
          var t = e.buttonClassName,
            n = e.iconName,
            a = e.onClickAction,
            o = e.title,
            s = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: a,
              disabled: s,
              title: o
            },
            r.a.createElement("span", { className: "glyphicon ".concat(n) })
          );
        };
      (c.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (c.propTypes = {
          buttonClassName: s.a.string,
          iconName: s.a.string.isRequired,
          onClickAction: s.a.func,
          title: s.a.string,
          disabled: s.a.bool
        }),
        (t.a = c);
    }
  }
]);
