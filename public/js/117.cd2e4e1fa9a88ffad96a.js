(window.webpackJsonp = window.webpackJsonp || []).push([
  [117],
  {
    1489: function(e, n, t) {
      "use strict";
      t.r(n);
      var a = t(24),
        r = t.n(a),
        i = t(25),
        o = t.n(i),
        c = t(22),
        s = t.n(c),
        l = t(26),
        u = t.n(l),
        m = t(27),
        f = t.n(m),
        p = t(16),
        h = t.n(p),
        d = t(6),
        g = t.n(d),
        v = t(0),
        E = t.n(v),
        y = t(32),
        D = t(199),
        N = t.n(D),
        b = t(146),
        M = t(147),
        R = t(200),
        w = t(101),
        k = t(4);
      function C(e) {
        var n = (function() {
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
          var t,
            a = h()(e);
          if (n) {
            var r = h()(this).constructor;
            t = Reflect.construct(a, arguments, r);
          } else t = a.apply(this, arguments);
          return f()(this, t);
        };
      }
      var A = (function(e) {
          u()(t, e);
          var n = C(t);
          function t(e) {
            var a;
            return (
              r()(this, t),
              ((a = n.call(this, e)).state = {
                showActionButtons: !1,
                highlightRow: ""
              }),
              a
            );
          }
          return (
            o()(t, [
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
                  k.f.push("/mailgun-domein/".concat(e));
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    n = this.props,
                    t = n.id,
                    a = n.domain,
                    r = n.isVerified;
                  return E.a.createElement(
                    "tr",
                    {
                      className: this.state.highlightRow,
                      onDoubleClick: function() {
                        return e.openItem(t);
                      },
                      onMouseEnter: function() {
                        return e.onRowEnter();
                      },
                      onMouseLeave: function() {
                        return e.onRowLeave();
                      }
                    },
                    E.a.createElement("td", null, a),
                    E.a.createElement("td", null, r ? "Ja" : "Nee"),
                    E.a.createElement(
                      "td",
                      null,
                      this.state.showActionButtons
                        ? E.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.openItem(t);
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
            t
          );
        })(v.Component),
        L = Object(y.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(A);
      function S(e) {
        var n = (function() {
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
          var t,
            a = h()(e);
          if (n) {
            var r = h()(this).constructor;
            t = Reflect.construct(a, arguments, r);
          } else t = a.apply(this, arguments);
          return f()(this, t);
        };
      }
      var I = (function(e) {
          u()(t, e);
          var n = S(t);
          function t(e) {
            var a;
            return r()(this, t), ((a = n.call(this, e)).state = {}), a;
          }
          return (
            o()(t, [
              {
                key: "render",
                value: function() {
                  var e = "",
                    n = !0;
                  return (
                    this.props.hasError
                      ? (e = "Fout bij het ophalen van mailgun domeinen.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : 0 === this.props.mailgunDomains.length
                      ? (e = "Geen mailgun domeinen gevonden!")
                      : (n = !1),
                    E.a.createElement(
                      "div",
                      null,
                      E.a.createElement(
                        b.a,
                        null,
                        E.a.createElement(
                          M.a,
                          null,
                          E.a.createElement(
                            "tr",
                            { className: "thead-title" },
                            E.a.createElement(w.a, {
                              title: "Domeinnaam",
                              width: "50%"
                            }),
                            E.a.createElement(w.a, {
                              title: "Geverifieerd",
                              width: "45%"
                            }),
                            E.a.createElement(w.a, { title: "", width: "5%" })
                          )
                        ),
                        E.a.createElement(
                          R.a,
                          null,
                          n
                            ? E.a.createElement(
                                "tr",
                                null,
                                E.a.createElement("td", { colSpan: 3 }, e)
                              )
                            : this.props.mailgunDomains.map(function(e) {
                                return E.a.createElement(
                                  L,
                                  N()({ key: e.id }, e)
                                );
                              })
                        )
                      )
                    )
                  );
                }
              }
            ]),
            t
          );
        })(v.Component),
        O = Object(y.b)(function(e) {
          return {
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        })(I),
        P = t(693),
        j = Object(y.b)(function(e) {
          return {
            permissions: e.meDetails.permissions,
            mailgunDomains: e.mailgunDomains
          };
        }, null)(function(e) {
          return E.a.createElement(
            "div",
            { className: "row" },
            E.a.createElement(
              "div",
              { className: "col-md-4" },
              E.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                E.a.createElement(P.a, {
                  iconName: "glyphicon-refresh",
                  onClickAction: e.refreshMailgunDomainsData
                }),
                e.permissions.manageMailgunDomain &&
                  E.a.createElement(P.a, {
                    iconName: "glyphicon-plus",
                    onClickAction: function() {
                      k.f.push("/mailgun-domein/nieuw");
                    }
                  })
              )
            ),
            E.a.createElement(
              "div",
              { className: "col-md-4" },
              E.a.createElement(
                "h3",
                { className: "text-center table-title" },
                "Mailgun domeinen"
              )
            ),
            E.a.createElement(
              "div",
              { className: "col-md-4" },
              E.a.createElement(
                "div",
                { className: "pull-right" },
                "Resultaten: ",
                e.mailgunDomains ? e.mailgunDomains.length : 0
              )
            )
          );
        }),
        G = t(690),
        x = t(691);
      function B(e) {
        var n = (function() {
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
          var t,
            a = h()(e);
          if (n) {
            var r = h()(this).constructor;
            t = Reflect.construct(a, arguments, r);
          } else t = a.apply(this, arguments);
          return f()(this, t);
        };
      }
      var T = (function(e) {
        u()(t, e);
        var n = B(t);
        function t(e) {
          var a;
          return (
            r()(this, t),
            (a = n.call(this, e)),
            g()(s()(a), "refreshMailgunDomainsData", function() {
              a.props.clearMailgunDomains(), a.props.fetchMailgunDomains();
            }),
            a
          );
        }
        return (
          o()(t, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchMailgunDomains();
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearMailgunDomains();
              }
            },
            {
              key: "render",
              value: function() {
                var e = this;
                return E.a.createElement(
                  G.a,
                  null,
                  E.a.createElement(
                    x.a,
                    null,
                    E.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      E.a.createElement(j, {
                        refreshMailgunDomainsData: function() {
                          return e.refreshMailgunDomainsData();
                        }
                      })
                    ),
                    E.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      E.a.createElement(O, {
                        mailgunDomains: this.props.mailgunDomains
                      })
                    )
                  )
                );
              }
            }
          ]),
          t
        );
      })(v.Component);
      n.default = Object(y.b)(
        function(e) {
          return { mailgunDomains: e.mailgunDomains };
        },
        function(e) {
          return {
            fetchMailgunDomains: function() {
              e({ type: "FETCH_MAILGUN_DOMAINS" });
            },
            clearMailgunDomains: function() {
              e({ type: "CLEAR_MAILGUN_DOMAINS" });
            }
          };
        }
      )(T);
    },
    690: function(e, n, t) {
      "use strict";
      var a = t(0),
        r = t.n(a),
        i = t(8),
        o = t.n(i),
        c = function(e) {
          var n = e.children,
            t = e.className,
            a = e.onMouseEnter,
            i = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(t),
              onMouseEnter: a,
              onMouseLeave: i
            },
            n
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
        (n.a = c);
    },
    691: function(e, n, t) {
      "use strict";
      var a = t(0),
        r = t.n(a),
        i = t(8),
        o = t.n(i),
        c = function(e) {
          var n = e.className,
            t = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(n) },
            t
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: o.a.string }),
        (n.a = c);
    },
    693: function(e, n, t) {
      "use strict";
      var a = t(0),
        r = t.n(a),
        i = t(8),
        o = t.n(i),
        c = function(e) {
          var n = e.buttonClassName,
            t = e.iconName,
            a = e.onClickAction,
            i = e.title,
            o = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(n),
              onClick: a,
              disabled: o,
              title: i
            },
            r.a.createElement("span", { className: "glyphicon ".concat(t) })
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
        (n.a = c);
    }
  }
]);
