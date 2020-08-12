(window.webpackJsonp = window.webpackJsonp || []).push([
  [120],
  {
    1482: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        s = n.n(a),
        r = n(25),
        o = n.n(r),
        c = n(22),
        i = n.n(c),
        l = n(26),
        u = n.n(l),
        m = n(27),
        p = n.n(m),
        f = n(16),
        h = n.n(f),
        d = n(6),
        y = n.n(d),
        v = n(0),
        E = n.n(v),
        g = n(690),
        k = n(691),
        T = n(12),
        N = function() {
          return T.a.get("jory/task-type", {
            params: {
              jory: {
                fld: [
                  "id",
                  "name",
                  "usesWfCompletedTask",
                  "emailTemplateIdWfCompletedTask",
                  "numberOfDaysToSendEmailCompletedTask",
                  "usesWfExpiredTask",
                  "emailTemplateIdWfExpiredTask"
                ]
              }
            }
          });
        },
        b = n(32),
        w = n(693),
        R = Object(b.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.taskTypesCount,
            n = e.refreshTaskTypesData;
          e.permissions;
          return E.a.createElement(
            "div",
            { className: "row" },
            E.a.createElement(
              "div",
              { className: "col-md-4" },
              E.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                E.a.createElement(w.a, {
                  iconName: "glyphicon-refresh",
                  onClickAction: n
                })
              )
            ),
            E.a.createElement(
              "div",
              { className: "col-md-4" },
              E.a.createElement(
                "h3",
                { className: "text-center table-title" },
                "Taak types"
              )
            ),
            E.a.createElement(
              "div",
              { className: "col-md-4" },
              E.a.createElement(
                "div",
                { className: "pull-right" },
                "Resultaten: ",
                t
              )
            )
          );
        }),
        C = n(199),
        D = n.n(C),
        L = n(146),
        M = n(147),
        S = n(200),
        A = n(101),
        j = n(4);
      function F(e) {
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
            a = h()(e);
          if (t) {
            var s = h()(this).constructor;
            n = Reflect.construct(a, arguments, s);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var x = (function(e) {
          u()(n, e);
          var t = F(n);
          function n(e) {
            var a;
            return (
              s()(this, n),
              ((a = t.call(this, e)).state = {
                showActionButtons: !1,
                highlightRow: ""
              }),
              a
            );
          }
          return (
            o()(n, [
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
                  j.f.push("/taak-type/".concat(e));
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props,
                    n = t.id,
                    a = t.name,
                    s = t.permissions;
                  return E.a.createElement(
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
                    E.a.createElement("td", null, a),
                    E.a.createElement(
                      "td",
                      null,
                      this.state.showActionButtons && s.manageFinancial
                        ? E.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.openItem(n);
                              }
                            },
                            E.a.createElement("span", {
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
        })(v.Component),
        I = Object(b.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(x),
        P = function(e) {
          var t = e.taskTypes,
            n = e.hasError,
            a = e.isLoading,
            s = "",
            r = !0;
          return (
            n
              ? (s = "Fout bij het ophalen van taak types.")
              : a
              ? (s = "Gegevens aan het laden.")
              : 0 === t.length
              ? (s = "Geen taak types gevonden!")
              : (r = !1),
            E.a.createElement(
              "div",
              null,
              E.a.createElement(
                L.a,
                null,
                E.a.createElement(
                  M.a,
                  null,
                  E.a.createElement(
                    "tr",
                    { className: "thead-title" },
                    E.a.createElement(A.a, {
                      title: "Omschrijving",
                      width: "100%"
                    })
                  )
                ),
                E.a.createElement(
                  S.a,
                  null,
                  r
                    ? E.a.createElement(
                        "tr",
                        null,
                        E.a.createElement("td", { colSpan: 4 }, s)
                      )
                    : t.map(function(e) {
                        return E.a.createElement(I, D()({ key: e.id }, e));
                      })
                )
              )
            )
          );
        };
      function B(e) {
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
            a = h()(e);
          if (t) {
            var s = h()(this).constructor;
            n = Reflect.construct(a, arguments, s);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var O = (function(e) {
        u()(n, e);
        var t = B(n);
        function n(e) {
          var a;
          return (
            s()(this, n),
            (a = t.call(this, e)),
            y()(i()(a), "callFetchTaskTypesData", function() {
              a.setState({ isLoading: !0, hasError: !1 }),
                N()
                  .then(function(e) {
                    a.setState({ isLoading: !1, taskTypes: e.data.data });
                  })
                  .catch(function(e) {
                    a.setState({ isLoading: !1, hasError: !0 });
                  });
            }),
            (a.state = { taskTypes: [], isLoading: !1, hasError: !1 }),
            a
          );
        }
        return (
          o()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.callFetchTaskTypesData();
              }
            },
            {
              key: "render",
              value: function() {
                return E.a.createElement(
                  g.a,
                  null,
                  E.a.createElement(
                    k.a,
                    null,
                    E.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      E.a.createElement(R, {
                        taskTypesCount: this.state.taskTypes
                          ? this.state.taskTypes.length
                          : 0,
                        refreshTaskTypesData: this.callFetchTaskTypesData
                      })
                    ),
                    E.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      E.a.createElement(P, {
                        taskTypes: this.state.taskTypes,
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
      })(v.Component);
      t.default = O;
    },
    690: function(e, t, n) {
      "use strict";
      var a = n(0),
        s = n.n(a),
        r = n(8),
        o = n.n(r),
        c = function(e) {
          var t = e.children,
            n = e.className,
            a = e.onMouseEnter,
            r = e.onMouseLeave;
          return s.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(n),
              onMouseEnter: a,
              onMouseLeave: r
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
          className: o.a.string,
          onMouseEnter: o.a.func,
          onMouseLeave: o.a.func
        }),
        (t.a = c);
    },
    691: function(e, t, n) {
      "use strict";
      var a = n(0),
        s = n.n(a),
        r = n(8),
        o = n.n(r),
        c = function(e) {
          var t = e.className,
            n = e.children;
          return s.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            n
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: o.a.string }),
        (t.a = c);
    },
    693: function(e, t, n) {
      "use strict";
      var a = n(0),
        s = n.n(a),
        r = n(8),
        o = n.n(r),
        c = function(e) {
          var t = e.buttonClassName,
            n = e.iconName,
            a = e.onClickAction,
            r = e.title,
            o = e.disabled;
          return s.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: a,
              disabled: o,
              title: r
            },
            s.a.createElement("span", { className: "glyphicon ".concat(n) })
          );
        };
      (c.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (c.propTypes = {
          buttonClassName: o.a.string,
          iconName: o.a.string.isRequired,
          onClickAction: o.a.func,
          title: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = c);
    }
  }
]);
