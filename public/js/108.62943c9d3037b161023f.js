(window.webpackJsonp = window.webpackJsonp || []).push([
  [108],
  {
    1484: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        i = n(25),
        o = n.n(i),
        s = n(22),
        c = n.n(s),
        l = n(26),
        u = n.n(l),
        m = n(27),
        f = n.n(m),
        d = n(16),
        p = n.n(d),
        h = n(6),
        v = n.n(h),
        E = n(0),
        b = n.n(E),
        y = n(32),
        g = n(856),
        w = n(199),
        N = n.n(w),
        D = n(146),
        A = n(147),
        I = n(200),
        R = n(101),
        O = n(4);
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
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return f()(this, n);
        };
      }
      var j = (function(e) {
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
                  O.f.push("/administratie/".concat(e));
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props,
                    n = t.id,
                    a = t.name,
                    r = t.address,
                    i = t.postalCode,
                    o = t.city;
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
                    b.a.createElement("td", null, r || ""),
                    b.a.createElement("td", null, i || ""),
                    b.a.createElement("td", null, o || ""),
                    b.a.createElement(
                      "td",
                      null,
                      this.state.showActionButtons &&
                        this.props.permissions.manageFinancial
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
                        this.props.permissions.manageFinancial
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
        }, null)(j),
        C = n(100),
        P = Object(y.b)(null, function(e) {
          return {
            deleteAdministration: function(t) {
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
                return (
                  e.deleteAdministration(e.id), void e.closeDeleteItemModal()
                );
              },
              title: "Verwijderen"
            },
            "Verwijder administratie: ",
            b.a.createElement("strong", null, e.name),
            "?"
          );
        });
      function S(e, t) {
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
            ? S(Object(n), !0).forEach(function(t) {
                v()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : S(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
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
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return f()(this, n);
        };
      }
      var x = (function(e) {
          u()(n, e);
          var t = T(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              v()(c()(a), "showDeleteItemModal", function(e, t) {
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
              v()(c()(a), "closeDeleteItemModal", function() {
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
            o()(n, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = "",
                    n = !0;
                  return (
                    this.props.hasError
                      ? (t = "Fout bij het ophalen van administraties.")
                      : this.props.isLoading
                      ? (t = "Gegevens aan het laden.")
                      : 0 === this.props.administrations.length
                      ? (t = "Geen administraties gevonden!")
                      : (n = !1),
                    b.a.createElement(
                      "div",
                      null,
                      b.a.createElement(
                        D.a,
                        null,
                        b.a.createElement(
                          A.a,
                          null,
                          b.a.createElement(
                            "tr",
                            { className: "thead-title" },
                            b.a.createElement(R.a, {
                              title: "Naam",
                              width: "40%"
                            }),
                            b.a.createElement(R.a, {
                              title: "Adres",
                              width: "25%"
                            }),
                            b.a.createElement(R.a, {
                              title: "Postcode",
                              width: "15%"
                            }),
                            b.a.createElement(R.a, {
                              title: "Plaats",
                              width: "15%"
                            }),
                            b.a.createElement(R.a, { title: "", width: "5%" })
                          )
                        ),
                        b.a.createElement(
                          I.a,
                          null,
                          n
                            ? b.a.createElement(
                                "tr",
                                null,
                                b.a.createElement("td", { colSpan: 5 }, t)
                              )
                            : this.props.administrations.map(function(t) {
                                return b.a.createElement(
                                  k,
                                  N()(
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
                          P,
                          N()(
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
        F = n(693),
        V = Object(y.b)(function(e) {
          return {
            permissions: e.meDetails.permissions,
            administrations: e.administrations
          };
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
                b.a.createElement(F.a, {
                  iconName: "glyphicon-refresh",
                  onClickAction: e.refreshAdministrationsData
                }),
                e.permissions.manageFinancial &&
                  b.a.createElement(F.a, {
                    iconName: "glyphicon-plus",
                    onClickAction: function() {
                      O.f.push("/administratie/nieuw");
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
                "Administraties"
              )
            ),
            b.a.createElement(
              "div",
              { className: "col-md-4" },
              b.a.createElement(
                "div",
                { className: "pull-right" },
                "Resultaten: ",
                e.administrations ? e.administrations.length : 0
              )
            )
          );
        }),
        _ = n(690),
        G = n(691);
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
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
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
            v()(c()(a), "refreshAdministrationsData", function() {
              a.props.clearAdministrations(), a.props.fetchAdministrations();
            }),
            a
          );
        }
        return (
          o()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchAdministrations();
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearAdministrations();
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
                    G.a,
                    null,
                    b.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      b.a.createElement(V, {
                        refreshAdministrationsData: function() {
                          return e.refreshAdministrationsData();
                        }
                      })
                    ),
                    b.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      b.a.createElement(B, {
                        administrations: this.props.administrations
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
      t.default = Object(y.b)(
        function(e) {
          return { administrations: e.administrations };
        },
        function(e) {
          return {
            fetchAdministrations: function() {
              e(Object(g.c)());
            },
            clearAdministrations: function() {
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
        i = n(8),
        o = n.n(i),
        s = function(e) {
          var t = e.children,
            n = e.className,
            a = e.onMouseEnter,
            i = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(n),
              onMouseEnter: a,
              onMouseLeave: i
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
          className: o.a.string,
          onMouseEnter: o.a.func,
          onMouseLeave: o.a.func
        }),
        (t.a = s);
    },
    691: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        i = n(8),
        o = n.n(i),
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
        (s.propTypes = { className: o.a.string }),
        (t.a = s);
    },
    693: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        i = n(8),
        o = n.n(i),
        s = function(e) {
          var t = e.buttonClassName,
            n = e.iconName,
            a = e.onClickAction,
            i = e.title,
            o = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: a,
              disabled: o,
              title: i
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
          buttonClassName: o.a.string,
          iconName: o.a.string.isRequired,
          onClickAction: o.a.func,
          title: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = s);
    },
    856: function(e, t, n) {
      "use strict";
      n.d(t, "c", function() {
        return a;
      }),
        n.d(t, "a", function() {
          return r;
        }),
        n.d(t, "b", function() {
          return i;
        });
      var a = function() {
          return { type: "FETCH_ADMINISTRATIONS" };
        },
        r = function() {
          return { type: "CLEAR_ADMINISTRATIONS" };
        },
        i = function(e) {
          return { type: "DELETE_ADMINISTRATION", id: e };
        };
    }
  }
]);
