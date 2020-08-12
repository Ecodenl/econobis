(window.webpackJsonp = window.webpackJsonp || []).push([
  [101],
  {
    1488: function(e, t, n) {
      "use strict";
      n.r(t);
      var r = n(24),
        a = n.n(r),
        o = n(25),
        c = n.n(o),
        i = n(22),
        s = n.n(i),
        l = n(26),
        u = n.n(l),
        m = n(27),
        f = n.n(m),
        p = n(16),
        h = n.n(p),
        d = n(6),
        b = n.n(d),
        E = n(0),
        v = n.n(E),
        y = n(32),
        w = n(981),
        g = n(199),
        D = n.n(g),
        N = n(146),
        R = n(147),
        M = n(200),
        O = n(101),
        j = n(4),
        I = n(7),
        k = n.n(I);
      function C(e) {
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
            r = h()(e);
          if (t) {
            var a = h()(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return f()(this, n);
        };
      }
      var A = (function(e) {
          u()(n, e);
          var t = C(n);
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
                  j.f.push("/webformulier/".concat(e));
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props,
                    n = t.id,
                    r = t.name,
                    a = t.apiKey,
                    o = t.maxRequestsPerMinute,
                    c = t.createdAt,
                    i = void 0 === c ? [] : c;
                  return v.a.createElement(
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
                    v.a.createElement("td", null, r),
                    v.a.createElement("td", null, a),
                    v.a.createElement("td", null, o),
                    v.a.createElement(
                      "td",
                      null,
                      i && k()(i).format("DD-MM-Y")
                    ),
                    v.a.createElement(
                      "td",
                      null,
                      this.state.showActionButtons
                        ? v.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.openItem(n);
                              }
                            },
                            v.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-pencil mybtn-success"
                            }),
                            " "
                          )
                        : "",
                      this.state.showActionButtons &&
                        this.props.permissions.createWebform
                        ? v.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: this.props.showDeleteItemModal.bind(
                                this,
                                n,
                                r
                              )
                            },
                            v.a.createElement("span", {
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
        W = Object(y.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(A),
        P = n(100),
        S = n(808),
        L = Object(y.b)(null, function(e) {
          return {
            deleteTeam: function(t) {
              e(Object(S.b)(t));
            }
          };
        })(function(e) {
          return v.a.createElement(
            P.a,
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
            v.a.createElement("strong", null, " ", e.name, " ")
          );
        });
      function T(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function B(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? T(Object(n), !0).forEach(function(t) {
                b()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : T(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function x(e) {
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
            r = h()(e);
          if (t) {
            var a = h()(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return f()(this, n);
        };
      }
      var F = (function(e) {
          u()(n, e);
          var t = x(n);
          function n(e) {
            var r;
            return (
              a()(this, n),
              (r = t.call(this, e)),
              b()(s()(r), "showDeleteItemModal", function(e, t) {
                r.setState(
                  B(
                    B({}, r.state),
                    {},
                    {
                      showDeleteItem: !0,
                      deleteItem: B(
                        B({}, r.state.deleteItem),
                        {},
                        { id: e, name: t }
                      )
                    }
                  )
                );
              }),
              b()(s()(r), "closeDeleteItemModal", function() {
                r.setState(
                  B(
                    B({}, r.state),
                    {},
                    {
                      showDeleteItem: !1,
                      deleteItem: B(
                        B({}, r.state.deleteItem),
                        {},
                        { id: "", name: "" }
                      )
                    }
                  )
                );
              }),
              (r.state = {
                showDeleteItem: !1,
                deleteItem: { id: "", name: "" }
              }),
              r
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
                      ? (t = "Fout bij het ophalen van webformulieren.")
                      : this.props.isLoading
                      ? (t = "Gegevens aan het laden.")
                      : 0 === this.props.webforms.length
                      ? (t = "Geen webformulieren gevonden!")
                      : (n = !1),
                    v.a.createElement(
                      "div",
                      null,
                      v.a.createElement(
                        N.a,
                        null,
                        v.a.createElement(
                          R.a,
                          null,
                          v.a.createElement(
                            "tr",
                            { className: "thead-title" },
                            v.a.createElement(O.a, {
                              title: "Naam",
                              width: "30%"
                            }),
                            v.a.createElement(O.a, {
                              title: "Sleutel",
                              width: "30%"
                            }),
                            v.a.createElement(O.a, {
                              title: "Aanvragen per minuut",
                              width: "20%"
                            }),
                            v.a.createElement(O.a, {
                              title: "Gemaakt op",
                              width: "15%"
                            }),
                            v.a.createElement(O.a, { title: "", width: "5%" })
                          )
                        ),
                        v.a.createElement(
                          M.a,
                          null,
                          n
                            ? v.a.createElement(
                                "tr",
                                null,
                                v.a.createElement("td", { colSpan: 5 }, t)
                              )
                            : this.props.webforms.map(function(t) {
                                return v.a.createElement(
                                  W,
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
                        v.a.createElement(
                          L,
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
        _ = Object(y.b)(function(e) {
          return {
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        })(F),
        G = n(693),
        V = Object(y.b)(function(e) {
          return { permissions: e.meDetails.permissions, webforms: e.webforms };
        }, null)(function(e) {
          return v.a.createElement(
            "div",
            { className: "row" },
            v.a.createElement(
              "div",
              { className: "col-md-4" },
              v.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                v.a.createElement(G.a, {
                  iconName: "glyphicon-refresh",
                  onClickAction: e.refreshWebformsData
                }),
                e.permissions.manageWebform &&
                  v.a.createElement(G.a, {
                    iconName: "glyphicon-plus",
                    onClickAction: function() {
                      j.f.push("/webformulier/nieuw");
                    }
                  })
              )
            ),
            v.a.createElement(
              "div",
              { className: "col-md-4" },
              v.a.createElement(
                "h3",
                { className: "text-center table-title" },
                "Webformulieren"
              )
            ),
            v.a.createElement(
              "div",
              { className: "col-md-4" },
              v.a.createElement(
                "div",
                { className: "pull-right" },
                "Resultaten: ",
                e.webforms ? e.webforms.length : 0
              )
            )
          );
        }),
        q = n(690),
        H = n(691);
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
            r = h()(e);
          if (t) {
            var a = h()(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return f()(this, n);
        };
      }
      var K = (function(e) {
        u()(n, e);
        var t = J(n);
        function n(e) {
          var r;
          return (
            a()(this, n),
            (r = t.call(this, e)),
            b()(s()(r), "refreshWebformsData", function() {
              r.props.clearWebforms(), r.props.fetchWebforms();
            }),
            r
          );
        }
        return (
          c()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchWebforms();
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearWebforms();
              }
            },
            {
              key: "render",
              value: function() {
                var e = this;
                return v.a.createElement(
                  q.a,
                  null,
                  v.a.createElement(
                    H.a,
                    null,
                    v.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      v.a.createElement(V, {
                        refreshWebformsData: function() {
                          return e.refreshWebformsData();
                        }
                      })
                    ),
                    v.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      v.a.createElement(_, { webforms: this.props.webforms })
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
          return { webforms: e.webforms };
        },
        function(e) {
          return {
            fetchWebforms: function() {
              e(Object(w.c)());
            },
            clearWebforms: function() {
              e(Object(w.a)());
            }
          };
        }
      )(K);
    },
    690: function(e, t, n) {
      "use strict";
      var r = n(0),
        a = n.n(r),
        o = n(8),
        c = n.n(o),
        i = function(e) {
          var t = e.children,
            n = e.className,
            r = e.onMouseEnter,
            o = e.onMouseLeave;
          return a.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(n),
              onMouseEnter: r,
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
      var r = n(0),
        a = n.n(r),
        o = n(8),
        c = n.n(o),
        i = function(e) {
          var t = e.className,
            n = e.children;
          return a.a.createElement(
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
      var r = n(0),
        a = n.n(r),
        o = n(8),
        c = n.n(o),
        i = function(e) {
          var t = e.buttonClassName,
            n = e.iconName,
            r = e.onClickAction,
            o = e.title,
            c = e.disabled;
          return a.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: r,
              disabled: c,
              title: o
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
          buttonClassName: c.a.string,
          iconName: c.a.string.isRequired,
          onClickAction: c.a.func,
          title: c.a.string,
          disabled: c.a.bool
        }),
        (t.a = i);
    },
    808: function(e, t, n) {
      "use strict";
      n.d(t, "c", function() {
        return r;
      }),
        n.d(t, "a", function() {
          return a;
        }),
        n.d(t, "b", function() {
          return o;
        });
      var r = function() {
          return { type: "FETCH_TEAMS" };
        },
        a = function() {
          return { type: "CLEAR_TEAMS" };
        },
        o = function(e) {
          return { type: "DELETE_TEAM", id: e };
        };
    },
    981: function(e, t, n) {
      "use strict";
      n.d(t, "c", function() {
        return r;
      }),
        n.d(t, "a", function() {
          return a;
        }),
        n.d(t, "b", function() {
          return o;
        });
      var r = function() {
          return { type: "FETCH_WEBFORMS" };
        },
        a = function() {
          return { type: "CLEAR_WEBFORMS" };
        },
        o = function(e) {
          return { type: "DELETE_WEBFORM", id: e };
        };
    }
  }
]);
