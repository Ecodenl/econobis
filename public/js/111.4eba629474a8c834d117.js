(window.webpackJsonp = window.webpackJsonp || []).push([
  [111],
  {
    1479: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        o = n(25),
        c = n.n(o),
        s = n(22),
        i = n.n(s),
        l = n(26),
        u = n.n(l),
        m = n(27),
        f = n.n(m),
        p = n(16),
        h = n.n(p),
        d = n(6),
        v = n.n(d),
        E = n(0),
        b = n.n(E),
        y = n(32),
        g = n(808),
        w = n(199),
        D = n.n(w),
        N = n(146),
        O = n(147),
        R = n(200),
        T = n(101),
        j = n(4);
      function M(e) {
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
      var I = (function(e) {
          u()(n, e);
          var t = M(n);
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
                  j.f.push("/team/".concat(e));
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props,
                    n = t.id,
                    a = t.name,
                    r = t.users,
                    o = void 0 === r ? [] : r;
                  return b.a.createElement(
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
                    b.a.createElement("td", null, a),
                    b.a.createElement(
                      "td",
                      null,
                      o
                        .map(function(e) {
                          return e.fullName;
                        })
                        .join(", ")
                    ),
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
                        : "",
                      this.state.showActionButtons &&
                        this.props.permissions.createTeam
                        ? b.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: this.props.showDeleteItemModal.bind(
                                this,
                                n,
                                a
                              )
                            },
                            b.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-trash mybtn-danger"
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
        k = Object(y.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(I),
        C = n(100),
        A = Object(y.b)(null, function(e) {
          return {
            deleteTeam: function(t) {
              e(Object(g.b)(t));
            }
          };
        })(function(e) {
          return b.a.createElement(
            C.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return e.deleteTeam(e.id), void e.closeDeleteItemModal();
              },
              title: "Verwijderen"
            },
            "Verwijder team: ",
            b.a.createElement("strong", null, " ", e.name, " ")
          );
        });
      function P(e, t) {
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
      function L(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? P(Object(n), !0).forEach(function(t) {
                v()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : P(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
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
            a = h()(e);
          if (t) {
            var r = h()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return f()(this, n);
        };
      }
      var x = (function(e) {
          u()(n, e);
          var t = S(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              v()(i()(a), "showDeleteItemModal", function(e, t) {
                a.setState(
                  L(
                    L({}, a.state),
                    {},
                    {
                      showDeleteItem: !0,
                      deleteItem: L(
                        L({}, a.state.deleteItem),
                        {},
                        { id: e, name: t }
                      )
                    }
                  )
                );
              }),
              v()(i()(a), "closeDeleteItemModal", function() {
                a.setState(
                  L(
                    L({}, a.state),
                    {},
                    {
                      showDeleteItem: !1,
                      deleteItem: L(
                        L({}, a.state.deleteItem),
                        {},
                        { id: "", name: "" }
                      )
                    }
                  )
                );
              }),
              (a.state = {
                showDeleteItem: !1,
                deleteItem: { id: "", name: "" }
              }),
              a
            );
          }
          return (
            c()(n, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = "",
                    n = !0;
                  return (
                    this.props.hasError
                      ? (t = "Fout bij het ophalen van teams.")
                      : this.props.isLoading
                      ? (t = "Gegevens aan het laden.")
                      : 0 === this.props.teams.length
                      ? (t = "Geen teams gevonden!")
                      : (n = !1),
                    b.a.createElement(
                      "div",
                      null,
                      b.a.createElement(
                        N.a,
                        null,
                        b.a.createElement(
                          O.a,
                          null,
                          b.a.createElement(
                            "tr",
                            { className: "thead-title" },
                            b.a.createElement(T.a, {
                              title: "Team",
                              width: "30%"
                            }),
                            b.a.createElement(T.a, {
                              title: "Gebruikers",
                              width: "65%"
                            }),
                            b.a.createElement(T.a, { title: "", width: "5%" })
                          )
                        ),
                        b.a.createElement(
                          R.a,
                          null,
                          n
                            ? b.a.createElement(
                                "tr",
                                null,
                                b.a.createElement("td", { colSpan: 3 }, t)
                              )
                            : this.props.teams.map(function(t) {
                                return b.a.createElement(
                                  k,
                                  D()(
                                    {
                                      key: t.id,
                                      showDeleteItemModal: e.showDeleteItemModal
                                    },
                                    t
                                  )
                                );
                              })
                        )
                      ),
                      this.state.showDeleteItem &&
                        b.a.createElement(
                          A,
                          D()(
                            { closeDeleteItemModal: this.closeDeleteItemModal },
                            this.state.deleteItem
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
        B = Object(y.b)(function(e) {
          return {
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        })(x),
        G = n(693),
        V = Object(y.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          return b.a.createElement(
            "div",
            { className: "row" },
            b.a.createElement(
              "div",
              { className: "col-md-4" },
              b.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                b.a.createElement(G.a, {
                  iconName: "glyphicon-refresh",
                  onClickAction: e.refreshTeamsData
                }),
                e.permissions.createTeam &&
                  b.a.createElement(G.a, {
                    iconName: "glyphicon-plus",
                    onClickAction: function() {
                      j.f.push("/team/nieuw");
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
                "Teams"
              )
            ),
            b.a.createElement("div", { className: "col-md-4" })
          );
        }),
        _ = n(690),
        F = n(691);
      function J(e) {
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
      var q = (function(e) {
        u()(n, e);
        var t = J(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            (a = t.call(this, e)),
            v()(i()(a), "refreshTeamsData", function() {
              a.props.clearTeams(), a.props.fetchTeams();
            }),
            a
          );
        }
        return (
          c()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchTeams();
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearTeams();
              }
            },
            {
              key: "render",
              value: function() {
                var e = this;
                return b.a.createElement(
                  _.a,
                  null,
                  b.a.createElement(
                    F.a,
                    null,
                    b.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      b.a.createElement(V, {
                        refreshTeamsData: function() {
                          return e.refreshTeamsData();
                        }
                      })
                    ),
                    b.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      b.a.createElement(B, { teams: this.props.teams })
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
          return { teams: e.teams };
        },
        function(e) {
          return {
            fetchTeams: function() {
              e(Object(g.c)());
            },
            clearTeams: function() {
              e(Object(g.a)());
            }
          };
        }
      )(q);
    },
    690: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
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
          className: c.a.string,
          onMouseEnter: c.a.func,
          onMouseLeave: c.a.func
        }),
        (t.a = s);
    },
    691: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
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
        (s.propTypes = { className: c.a.string }),
        (t.a = s);
    },
    693: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        s = function(e) {
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
      (s.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (s.propTypes = {
          buttonClassName: c.a.string,
          iconName: c.a.string.isRequired,
          onClickAction: c.a.func,
          title: c.a.string,
          disabled: c.a.bool
        }),
        (t.a = s);
    },
    808: function(e, t, n) {
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
          return { type: "FETCH_TEAMS" };
        },
        r = function() {
          return { type: "CLEAR_TEAMS" };
        },
        o = function(e) {
          return { type: "DELETE_TEAM", id: e };
        };
    }
  }
]);
