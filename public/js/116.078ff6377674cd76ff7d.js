(window.webpackJsonp = window.webpackJsonp || []).push([
  [116],
  {
    1481: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        o = n(25),
        c = n.n(o),
        i = n(22),
        l = n.n(i),
        s = n(26),
        u = n.n(s),
        m = n(27),
        f = n.n(m),
        p = n(16),
        h = n.n(p),
        d = n(6),
        E = n.n(d),
        v = n(0),
        b = n.n(v),
        g = n(32),
        y = n(199),
        N = n.n(y),
        w = n(146),
        R = n(147),
        M = n(200),
        k = n(101),
        x = n(4);
      n(7);
      function D(e) {
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
            var r = h()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return f()(this, n);
        };
      }
      var C = (function(e) {
        u()(n, e);
        var t = D(n);
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
          c()(n, [
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
                x.f.push("/mailbox/".concat(e));
              }
            },
            {
              key: "render",
              value: function() {
                var e = this,
                  t = this.props,
                  n = t.id,
                  a = t.name,
                  r = t.email,
                  o = t.username,
                  c = t.imapHost,
                  i = t.smtpHost,
                  l = t.mailgunDomain,
                  s = t.valid,
                  u = t.outgoingServerType,
                  m = t.primary,
                  f = t.isActive,
                  p = "mailgun" === u;
                return b.a.createElement(
                  "tr",
                  {
                    className: ""
                      .concat(this.state.highlightRow, "  ")
                      .concat(s ? "" : "has-error"),
                    onDoubleClick: function() {
                      return e.openItem(n);
                    },
                    onMouseEnter: function() {
                      return e.onRowEnter();
                    },
                    onMouseLeave: function() {
                      return e.onRowLeave();
                    }
                  },
                  b.a.createElement("td", null, a),
                  b.a.createElement("td", null, r),
                  b.a.createElement("td", null, o),
                  b.a.createElement("td", null, c),
                  b.a.createElement("td", null, p ? "Ja" : "Nee"),
                  b.a.createElement("td", null, p ? l : i),
                  b.a.createElement("td", null, m ? "Primair" : ""),
                  b.a.createElement("td", null, f ? "Ja" : "Nee"),
                  b.a.createElement(
                    "td",
                    null,
                    this.state.showActionButtons
                      ? b.a.createElement(
                          "a",
                          {
                            role: "button",
                            onClick: function() {
                              return e.openItem(n);
                            }
                          },
                          b.a.createElement("span", {
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
      })(v.Component);
      function A(e) {
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
            var r = h()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return f()(this, n);
        };
      }
      var L = (function(e) {
          u()(n, e);
          var t = A(n);
          function n(e) {
            return r()(this, n), t.call(this, e);
          }
          return (
            c()(n, [
              {
                key: "render",
                value: function() {
                  var e = "",
                    t = !0;
                  return (
                    this.props.hasError
                      ? (e = "Fout bij het ophalen van mailboxen.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : 0 === this.props.mailboxes.length
                      ? (e = "Geen mailboxen gevonden!")
                      : (t = !1),
                    b.a.createElement(
                      "div",
                      null,
                      b.a.createElement(
                        w.a,
                        null,
                        b.a.createElement(
                          R.a,
                          null,
                          b.a.createElement(
                            "tr",
                            { className: "thead-title" },
                            b.a.createElement(k.a, {
                              title: "Weergavenaam",
                              width: "15%"
                            }),
                            b.a.createElement(k.a, {
                              title: "E-mail",
                              width: "15%"
                            }),
                            b.a.createElement(k.a, {
                              title: "Gebruikersnaam",
                              width: "15%"
                            }),
                            b.a.createElement(k.a, {
                              title: "Inkomend",
                              width: "15%"
                            }),
                            b.a.createElement(k.a, {
                              title: "Gebruikt mailgun",
                              width: "10%"
                            }),
                            b.a.createElement(k.a, {
                              title: "Uitgaand",
                              width: "15%"
                            }),
                            b.a.createElement(k.a, {
                              title: "Primair",
                              width: "5%"
                            }),
                            b.a.createElement(k.a, {
                              title: "Actief",
                              width: "5%"
                            }),
                            b.a.createElement(k.a, { title: "", width: "5%" })
                          )
                        ),
                        b.a.createElement(
                          M.a,
                          null,
                          t
                            ? b.a.createElement(
                                "tr",
                                null,
                                b.a.createElement("td", { colSpan: 9 }, e)
                              )
                            : this.props.mailboxes.map(function(e) {
                                return b.a.createElement(
                                  C,
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
            n
          );
        })(v.Component),
        S = Object(g.b)(function(e) {
          return {
            mailboxes: e.mailboxes,
            usesMailgun: e.systemData.usesMailgun,
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        }, null)(L),
        P = n(693),
        B = Object(g.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(function(e) {
          var t = e.permissions,
            n = void 0 === t ? {} : t;
          return b.a.createElement(
            "div",
            { className: "row" },
            b.a.createElement(
              "div",
              { className: "col-md-4" },
              b.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                b.a.createElement(P.a, {
                  iconName: "glyphicon-refresh",
                  onClickAction: e.refreshData
                }),
                n.createMailbox &&
                  b.a.createElement(P.a, {
                    iconName: "glyphicon-plus",
                    onClickAction: function() {
                      x.f.push("/mailbox/nieuw");
                    }
                  })
              )
            ),
            b.a.createElement(
              "div",
              { className: "col-md-4" },
              b.a.createElement(
                "h3",
                { className: "text-center table-title" },
                "Mailboxen"
              )
            ),
            b.a.createElement("div", { className: "col-md-4" })
          );
        }),
        I = n(690),
        O = n(691);
      function T(e) {
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
            var r = h()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return f()(this, n);
        };
      }
      var j = (function(e) {
        u()(n, e);
        var t = T(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            (a = t.call(this, e)),
            E()(l()(a), "refreshData", function() {
              a.props.clearMailboxes(), a.props.fetchMailboxes();
            }),
            a
          );
        }
        return (
          c()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchMailboxes();
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearMailboxes();
              }
            },
            {
              key: "render",
              value: function() {
                var e = this;
                return b.a.createElement(
                  I.a,
                  { className: "col-md-12" },
                  b.a.createElement(
                    O.a,
                    null,
                    b.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      b.a.createElement(B, {
                        refreshData: function() {
                          return e.refreshData();
                        }
                      })
                    ),
                    b.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      b.a.createElement(S, null)
                    )
                  )
                );
              }
            }
          ]),
          n
        );
      })(v.Component);
      t.default = Object(g.b)(null, function(e) {
        return {
          fetchMailboxes: function() {
            e({ type: "FETCH_MAILBOXES" });
          },
          clearMailboxes: function() {
            e({ type: "CLEAR_MAILBOXES" });
          }
        };
      })(j);
    },
    690: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        i = function(e) {
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
      (i.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (i.propTypes = {
          className: c.a.string,
          onMouseEnter: c.a.func,
          onMouseLeave: c.a.func
        }),
        (t.a = i);
    },
    691: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        i = function(e) {
          var t = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            n
          );
        };
      (i.defaultProps = { className: "" }),
        (i.propTypes = { className: c.a.string }),
        (t.a = i);
    },
    693: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        i = function(e) {
          var t = e.buttonClassName,
            n = e.iconName,
            a = e.onClickAction,
            o = e.title,
            c = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: a,
              disabled: c,
              title: o
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
          buttonClassName: c.a.string,
          iconName: c.a.string.isRequired,
          onClickAction: c.a.func,
          title: c.a.string,
          disabled: c.a.bool
        }),
        (t.a = i);
    }
  }
]);
