(window.webpackJsonp = window.webpackJsonp || []).push([
  [118],
  {
    1483: function(t, e, n) {
      "use strict";
      n.r(e);
      var a = n(24),
        r = n.n(a),
        s = n(25),
        o = n.n(s),
        i = n(22),
        c = n.n(i),
        u = n(26),
        l = n.n(u),
        m = n(27),
        p = n.n(m),
        f = n(16),
        h = n.n(f),
        d = n(6),
        v = n.n(d),
        y = n(0),
        E = n.n(y),
        g = n(690),
        N = n(691),
        b = n(12),
        S = function() {
          return b.a.get("jory/opportunity-status", {
            params: {
              jory: {
                fld: [
                  "id",
                  "name",
                  "usesWf",
                  "emailTemplateIdWf",
                  "numberOfDaysToSendEmail"
                ]
              }
            }
          });
        },
        w = n(32),
        R = n(693),
        k = Object(w.b)(function(t) {
          return { permissions: t.meDetails.permissions };
        }, null)(function(t) {
          var e = t.opportunityStatusCount,
            n = t.refreshOpportunityStatusData;
          t.permissions;
          return E.a.createElement(
            "div",
            { className: "row" },
            E.a.createElement(
              "div",
              { className: "col-md-4" },
              E.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                E.a.createElement(R.a, {
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
                "Kans statussen"
              )
            ),
            E.a.createElement(
              "div",
              { className: "col-md-4" },
              E.a.createElement(
                "div",
                { className: "pull-right" },
                "Resultaten: ",
                e
              )
            )
          );
        }),
        D = n(199),
        L = n.n(D),
        C = n(146),
        M = n(147),
        O = n(200),
        A = n(101),
        j = n(4);
      function F(t) {
        var e = (function() {
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
          } catch (t) {
            return !1;
          }
        })();
        return function() {
          var n,
            a = h()(t);
          if (e) {
            var r = h()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var P = (function(t) {
          l()(n, t);
          var e = F(n);
          function n(t) {
            var a;
            return (
              r()(this, n),
              ((a = e.call(this, t)).state = {
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
                value: function(t) {
                  j.f.push("/kans-status/".concat(t));
                }
              },
              {
                key: "render",
                value: function() {
                  var t = this,
                    e = this.props,
                    n = e.id,
                    a = e.name,
                    r = e.permissions;
                  return E.a.createElement(
                    "tr",
                    {
                      className: this.state.highlightRow,
                      onDoubleClick: r.manageFinancial
                        ? function() {
                            return t.openItem(n);
                          }
                        : null,
                      onMouseEnter: function() {
                        return t.onRowEnter();
                      },
                      onMouseLeave: function() {
                        return t.onRowLeave();
                      }
                    },
                    E.a.createElement("td", null, a),
                    E.a.createElement(
                      "td",
                      null,
                      this.state.showActionButtons && r.manageFinancial
                        ? E.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return t.openItem(n);
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
        })(y.Component),
        T = Object(w.b)(function(t) {
          return { permissions: t.meDetails.permissions };
        })(P),
        B = function(t) {
          var e = t.opportunityStatus,
            n = t.hasError,
            a = t.isLoading,
            r = "",
            s = !0;
          return (
            n
              ? (r = "Fout bij het ophalen van kans statussen.")
              : a
              ? (r = "Gegevens aan het laden.")
              : 0 === e.length
              ? (r = "Geen kans statussen gevonden!")
              : (s = !1),
            E.a.createElement(
              "div",
              null,
              E.a.createElement(
                C.a,
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
                  O.a,
                  null,
                  s
                    ? E.a.createElement(
                        "tr",
                        null,
                        E.a.createElement("td", { colSpan: 4 }, r)
                      )
                    : e.map(function(t) {
                        return E.a.createElement(T, L()({ key: t.id }, t));
                      })
                )
              )
            )
          );
        };
      function I(t) {
        var e = (function() {
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
          } catch (t) {
            return !1;
          }
        })();
        return function() {
          var n,
            a = h()(t);
          if (e) {
            var r = h()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var x = (function(t) {
        l()(n, t);
        var e = I(n);
        function n(t) {
          var a;
          return (
            r()(this, n),
            (a = e.call(this, t)),
            v()(c()(a), "callFetchOpportunityStatusData", function() {
              a.setState({ isLoading: !0, hasError: !1 }),
                S()
                  .then(function(t) {
                    a.setState({
                      isLoading: !1,
                      opportunityStatus: t.data.data
                    });
                  })
                  .catch(function(t) {
                    a.setState({ isLoading: !1, hasError: !0 });
                  });
            }),
            (a.state = { opportunityStatus: [], isLoading: !1, hasError: !1 }),
            a
          );
        }
        return (
          o()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.callFetchOpportunityStatusData();
              }
            },
            {
              key: "render",
              value: function() {
                return E.a.createElement(
                  g.a,
                  null,
                  E.a.createElement(
                    N.a,
                    null,
                    E.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      E.a.createElement(k, {
                        opportunityStatusCount: this.state.opportunityStatus
                          ? this.state.opportunityStatus.length
                          : 0,
                        refreshOpportunityStatusData: this
                          .callFetchOpportunityStatusData
                      })
                    ),
                    E.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      E.a.createElement(B, {
                        opportunityStatus: this.state.opportunityStatus,
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
      })(y.Component);
      e.default = x;
    },
    690: function(t, e, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        s = n(8),
        o = n.n(s),
        i = function(t) {
          var e = t.children,
            n = t.className,
            a = t.onMouseEnter,
            s = t.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(n),
              onMouseEnter: a,
              onMouseLeave: s
            },
            e
          );
        };
      (i.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (i.propTypes = {
          className: o.a.string,
          onMouseEnter: o.a.func,
          onMouseLeave: o.a.func
        }),
        (e.a = i);
    },
    691: function(t, e, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        s = n(8),
        o = n.n(s),
        i = function(t) {
          var e = t.className,
            n = t.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(e) },
            n
          );
        };
      (i.defaultProps = { className: "" }),
        (i.propTypes = { className: o.a.string }),
        (e.a = i);
    },
    693: function(t, e, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        s = n(8),
        o = n.n(s),
        i = function(t) {
          var e = t.buttonClassName,
            n = t.iconName,
            a = t.onClickAction,
            s = t.title,
            o = t.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(e),
              onClick: a,
              disabled: o,
              title: s
            },
            r.a.createElement("span", { className: "glyphicon ".concat(n) })
          );
        };
      (i.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (i.propTypes = {
          buttonClassName: o.a.string,
          iconName: o.a.string.isRequired,
          onClickAction: o.a.func,
          title: o.a.string,
          disabled: o.a.bool
        }),
        (e.a = i);
    }
  }
]);
