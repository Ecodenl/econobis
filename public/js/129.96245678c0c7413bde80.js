(window.webpackJsonp = window.webpackJsonp || []).push([
  [129],
  {
    1491: function(e, t, n) {
      "use strict";
      n.r(t);
      var r = n(24),
        a = n.n(r),
        c = n(25),
        o = n.n(c),
        i = n(22),
        s = n.n(i),
        l = n(26),
        u = n.n(l),
        f = n(27),
        m = n.n(f),
        h = n(16),
        p = n.n(h),
        d = n(6),
        v = n.n(d),
        E = n(0),
        g = n.n(E),
        y = n(32),
        b = n(199),
        R = n.n(b),
        w = n(146),
        N = n(147),
        k = n(200),
        C = n(101),
        D = n(4);
      n(7);
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
            r = p()(e);
          if (t) {
            var a = p()(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return m()(this, n);
        };
      }
      var A = (function(e) {
        u()(n, e);
        var t = S(n);
        function n(e) {
          var r;
          return (
            a()(this, n),
            ((r = t.call(this, e)).state = {
              showActionButtons: !1,
              highlightRow: ""
            }),
            r
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
                D.f.push("/gebruiker/".concat(e));
              }
            },
            {
              key: "render",
              value: function() {
                var e = this,
                  t = this.props,
                  n = t.id,
                  r = t.firstName,
                  a = t.fullLastName,
                  c = t.email,
                  o = t.status;
                return g.a.createElement(
                  "tr",
                  {
                    className: this.state.highlightRow,
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
                  g.a.createElement("td", null, r),
                  g.a.createElement("td", null, a),
                  g.a.createElement("td", null, c),
                  g.a.createElement("td", null, o),
                  g.a.createElement(
                    "td",
                    null,
                    this.state.showActionButtons
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
      })(E.Component);
      function U(e) {
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
            r = p()(e);
          if (t) {
            var a = p()(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return m()(this, n);
        };
      }
      var L = (function(e) {
          u()(n, e);
          var t = U(n);
          function n(e) {
            return a()(this, n), t.call(this, e);
          }
          return (
            o()(n, [
              {
                key: "render",
                value: function() {
                  var e = "",
                    t = !0;
                  return (
                    this.props.hasError
                      ? (e = "Fout bij het ophalen van gebruikers.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : 0 === this.props.users.length
                      ? (e = "Geen gebruikers gevonden!")
                      : (t = !1),
                    g.a.createElement(
                      "div",
                      null,
                      g.a.createElement(
                        w.a,
                        null,
                        g.a.createElement(
                          N.a,
                          null,
                          g.a.createElement(
                            "tr",
                            { className: "thead-title" },
                            g.a.createElement(C.a, {
                              title: "Voornaam",
                              width: "30%"
                            }),
                            g.a.createElement(C.a, {
                              title: "Achternaam",
                              width: "25%"
                            }),
                            g.a.createElement(C.a, {
                              title: "E-mail",
                              width: "30%"
                            }),
                            g.a.createElement(C.a, {
                              title: "Status",
                              width: "10%"
                            }),
                            g.a.createElement(C.a, { title: "", width: "5%" })
                          )
                        ),
                        g.a.createElement(
                          k.a,
                          null,
                          t
                            ? g.a.createElement(
                                "tr",
                                null,
                                g.a.createElement("td", { colSpan: 11 }, e)
                              )
                            : this.props.users.map(function(e) {
                                return g.a.createElement(
                                  A,
                                  R()({ key: e.id }, e)
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
        })(E.Component),
        j = Object(y.b)(function(e) {
          return {
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        })(L),
        x = n(693),
        B = Object(y.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(function(e) {
          var t = e.permissions,
            n = void 0 === t ? {} : t;
          return g.a.createElement(
            "div",
            { className: "row" },
            g.a.createElement(
              "div",
              { className: "col-md-4" },
              g.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                g.a.createElement(x.a, {
                  iconName: "glyphicon-refresh",
                  onClickAction: e.refreshContactsData
                }),
                n.manageUser &&
                  g.a.createElement(x.a, {
                    iconName: "glyphicon-plus",
                    onClickAction: function() {
                      D.f.push("/gebruiker/nieuw");
                    }
                  })
              )
            ),
            g.a.createElement(
              "div",
              { className: "col-md-4" },
              g.a.createElement(
                "h3",
                { className: "text-center table-title" },
                "Gebruikers"
              )
            ),
            g.a.createElement("div", { className: "col-md-4" })
          );
        });
      function P(e) {
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
            r = p()(e);
          if (t) {
            var a = p()(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return m()(this, n);
        };
      }
      var G = (function(e) {
        u()(n, e);
        var t = P(n);
        function n(e) {
          var r;
          return (
            a()(this, n),
            (r = t.call(this, e)),
            v()(s()(r), "refreshContactsData", function() {
              r.props.clearUsers(), r.props.fetchUsers();
            }),
            r
          );
        }
        return (
          o()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchUsers();
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearUsers();
              }
            },
            {
              key: "render",
              value: function() {
                var e = this;
                return g.a.createElement(
                  "div",
                  null,
                  g.a.createElement(
                    "div",
                    { className: "panel panel-default" },
                    g.a.createElement(
                      "div",
                      { className: "panel-body" },
                      g.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        g.a.createElement(B, {
                          refreshContactsData: function() {
                            return e.refreshContactsData();
                          }
                        })
                      ),
                      g.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        g.a.createElement(j, { users: this.props.users })
                      )
                    )
                  )
                );
              }
            }
          ]),
          n
        );
      })(E.Component);
      t.default = Object(y.b)(
        function(e) {
          return { users: e.users };
        },
        function(e) {
          return {
            fetchUsers: function() {
              e({ type: "FETCH_USERS" });
            },
            clearUsers: function() {
              e({ type: "CLEAR_USERS" });
            }
          };
        }
      )(G);
    },
    693: function(e, t, n) {
      "use strict";
      var r = n(0),
        a = n.n(r),
        c = n(8),
        o = n.n(c),
        i = function(e) {
          var t = e.buttonClassName,
            n = e.iconName,
            r = e.onClickAction,
            c = e.title,
            o = e.disabled;
          return a.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: r,
              disabled: o,
              title: c
            },
            a.a.createElement("span", { className: "glyphicon ".concat(n) })
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
        (t.a = i);
    }
  }
]);
