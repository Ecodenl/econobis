(window.webpackJsonp = window.webpackJsonp || []).push([
  [119],
  {
    1480: function(t, e, n) {
      "use strict";
      n.r(e);
      var a = n(24),
        s = n.n(a),
        o = n(25),
        r = n.n(o),
        i = n(22),
        c = n.n(i),
        u = n(26),
        l = n.n(u),
        m = n(27),
        f = n.n(m),
        h = n(16),
        d = n.n(h),
        p = n(6),
        v = n.n(p),
        E = n(0),
        g = n.n(E),
        R = n(690),
        y = n(691),
        N = n(12),
        b = function() {
          return N.a.get("jory/quotation-request-status", {
            params: {
              jory: {
                fld: [
                  "id",
                  "name",
                  "usesWf",
                  "emailTemplateIdWf",
                  "numberOfDaysToSendEmail",
                  "order"
                ]
              }
            }
          });
        },
        q = n(32),
        S = n(693),
        w = Object(q.b)(function(t) {
          return { permissions: t.meDetails.permissions };
        }, null)(function(t) {
          var e = t.quotationRequestStatusCount,
            n = t.refreshQuotationRequestStatusData;
          t.permissions;
          return g.a.createElement(
            "div",
            { className: "row" },
            g.a.createElement(
              "div",
              { className: "col-md-4" },
              g.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                g.a.createElement(S.a, {
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
                "Offerte verzoek statussen"
              )
            ),
            g.a.createElement(
              "div",
              { className: "col-md-4" },
              g.a.createElement(
                "div",
                { className: "pull-right" },
                "Resultaten: ",
                e
              )
            )
          );
        }),
        k = n(199),
        D = n.n(k),
        L = n(146),
        C = n(147),
        M = n(200),
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
            a = d()(t);
          if (e) {
            var s = d()(this).constructor;
            n = Reflect.construct(a, arguments, s);
          } else n = a.apply(this, arguments);
          return f()(this, n);
        };
      }
      var O = (function(t) {
          l()(n, t);
          var e = F(n);
          function n(t) {
            var a;
            return (
              s()(this, n),
              ((a = e.call(this, t)).state = {
                showActionButtons: !1,
                highlightRow: ""
              }),
              a
            );
          }
          return (
            r()(n, [
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
                  j.f.push("/offerte-verzoek-status/".concat(t));
                }
              },
              {
                key: "render",
                value: function() {
                  var t = this,
                    e = this.props,
                    n = e.id,
                    a = e.name,
                    s = e.permissions;
                  return g.a.createElement(
                    "tr",
                    {
                      className: this.state.highlightRow,
                      onDoubleClick: s.manageFinancial
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
                    g.a.createElement("td", null, a),
                    g.a.createElement(
                      "td",
                      null,
                      this.state.showActionButtons && s.manageFinancial
                        ? g.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return t.openItem(n);
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
        P = Object(q.b)(function(t) {
          return { permissions: t.meDetails.permissions };
        })(O),
        Q = function(t) {
          var e = t.quotationRequestStatus,
            n = t.hasError,
            a = t.isLoading,
            s = "",
            o = !0;
          return (
            n
              ? (s = "Fout bij het ophalen van kans statussen.")
              : a
              ? (s = "Gegevens aan het laden.")
              : 0 === e.length
              ? (s = "Geen kans statussen gevonden!")
              : (o = !1),
            g.a.createElement(
              "div",
              null,
              g.a.createElement(
                L.a,
                null,
                g.a.createElement(
                  C.a,
                  null,
                  g.a.createElement(
                    "tr",
                    { className: "thead-title" },
                    g.a.createElement(A.a, {
                      title: "Omschrijving",
                      width: "100%"
                    })
                  )
                ),
                g.a.createElement(
                  M.a,
                  null,
                  o
                    ? g.a.createElement(
                        "tr",
                        null,
                        g.a.createElement("td", { colSpan: 4 }, s)
                      )
                    : e.map(function(t) {
                        return g.a.createElement(P, D()({ key: t.id }, t));
                      })
                )
              )
            )
          );
        };
      function T(t) {
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
            a = d()(t);
          if (e) {
            var s = d()(this).constructor;
            n = Reflect.construct(a, arguments, s);
          } else n = a.apply(this, arguments);
          return f()(this, n);
        };
      }
      var B = (function(t) {
        l()(n, t);
        var e = T(n);
        function n(t) {
          var a;
          return (
            s()(this, n),
            (a = e.call(this, t)),
            v()(c()(a), "callFetchQuotationRequestStatusData", function() {
              a.setState({ isLoading: !0, hasError: !1 }),
                b()
                  .then(function(t) {
                    a.setState({
                      isLoading: !1,
                      quotationRequestStatus: t.data.data
                    });
                  })
                  .catch(function(t) {
                    a.setState({ isLoading: !1, hasError: !0 });
                  });
            }),
            (a.state = {
              quotationRequestStatus: [],
              isLoading: !1,
              hasError: !1
            }),
            a
          );
        }
        return (
          r()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.callFetchQuotationRequestStatusData();
              }
            },
            {
              key: "render",
              value: function() {
                return g.a.createElement(
                  R.a,
                  null,
                  g.a.createElement(
                    y.a,
                    null,
                    g.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      g.a.createElement(w, {
                        quotationRequestStatusCount: this.state
                          .quotationRequestStatus
                          ? this.state.quotationRequestStatus.length
                          : 0,
                        refreshQuotationRequestStatusData: this
                          .callFetchQuotationRequestStatusData
                      })
                    ),
                    g.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      g.a.createElement(Q, {
                        quotationRequestStatus: this.state
                          .quotationRequestStatus,
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
      e.default = B;
    },
    690: function(t, e, n) {
      "use strict";
      var a = n(0),
        s = n.n(a),
        o = n(8),
        r = n.n(o),
        i = function(t) {
          var e = t.children,
            n = t.className,
            a = t.onMouseEnter,
            o = t.onMouseLeave;
          return s.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(n),
              onMouseEnter: a,
              onMouseLeave: o
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
          className: r.a.string,
          onMouseEnter: r.a.func,
          onMouseLeave: r.a.func
        }),
        (e.a = i);
    },
    691: function(t, e, n) {
      "use strict";
      var a = n(0),
        s = n.n(a),
        o = n(8),
        r = n.n(o),
        i = function(t) {
          var e = t.className,
            n = t.children;
          return s.a.createElement(
            "div",
            { className: "panel-body ".concat(e) },
            n
          );
        };
      (i.defaultProps = { className: "" }),
        (i.propTypes = { className: r.a.string }),
        (e.a = i);
    },
    693: function(t, e, n) {
      "use strict";
      var a = n(0),
        s = n.n(a),
        o = n(8),
        r = n.n(o),
        i = function(t) {
          var e = t.buttonClassName,
            n = t.iconName,
            a = t.onClickAction,
            o = t.title,
            r = t.disabled;
          return s.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(e),
              onClick: a,
              disabled: r,
              title: o
            },
            s.a.createElement("span", { className: "glyphicon ".concat(n) })
          );
        };
      (i.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (i.propTypes = {
          buttonClassName: r.a.string,
          iconName: r.a.string.isRequired,
          onClickAction: r.a.func,
          title: r.a.string,
          disabled: r.a.bool
        }),
        (e.a = i);
    }
  }
]);
