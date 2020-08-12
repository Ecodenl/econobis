(window.webpackJsonp = window.webpackJsonp || []).push([
  [109],
  {
    1485: function(e, t, n) {
      "use strict";
      n.r(t);
      var r = n(24),
        a = n.n(r),
        c = n(25),
        o = n.n(c),
        i = n(22),
        l = n.n(i),
        s = n(26),
        u = n.n(s),
        m = n(27),
        d = n.n(m),
        p = n(16),
        f = n.n(p),
        h = n(6),
        E = n.n(h),
        v = n(0),
        b = n.n(v),
        g = n(32),
        y = n(879),
        w = n(199),
        D = n.n(w),
        P = n(146),
        N = n(147),
        R = n(200),
        O = n(101),
        j = n(4);
      function I(e) {
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
            r = f()(e);
          if (t) {
            var a = f()(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return d()(this, n);
        };
      }
      var C = (function(e) {
          u()(n, e);
          var t = I(n);
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
                  j.f.push("/product/".concat(e));
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props,
                    n = t.id,
                    r = t.code,
                    a = t.name,
                    c = t.currentPrice,
                    o = t.administration,
                    i = "";
                  return (
                    c &&
                      (i =
                        null !== c.vatPercentage
                          ? c.vatPercentage + "%"
                          : "Geen"),
                    b.a.createElement(
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
                      b.a.createElement("td", null, r),
                      b.a.createElement("td", null, a),
                      c && c.hasVariablePrice
                        ? b.a.createElement("td", null, "Variabel")
                        : b.a.createElement(
                            "td",
                            null,
                            c
                              ? "€" +
                                  c.price.toLocaleString("nl", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                  })
                              : ""
                          ),
                      b.a.createElement("td", null, i),
                      c && c.hasVariablePrice
                        ? b.a.createElement("td", null, "Variabel")
                        : b.a.createElement(
                            "td",
                            null,
                            c
                              ? "€" +
                                  c.priceInclVat.toLocaleString("nl", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                  })
                              : ""
                          ),
                      b.a.createElement("td", null, o ? o.name : ""),
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
                    )
                  );
                }
              }
            ]),
            n
          );
        })(v.Component),
        M = Object(g.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(C),
        k = n(100),
        L = Object(g.b)(null, function(e) {
          return {
            deleteProduct: function(t) {
              e(Object(y.b)(t));
            }
          };
        })(function(e) {
          return b.a.createElement(
            k.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return e.deleteProduct(e.id), void e.closeDeleteItemModal();
              },
              title: "Verwijderen"
            },
            "Verwijder product: ",
            b.a.createElement("strong", null, e.name),
            "?"
          );
        });
      function S(e, t) {
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
      function A(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? S(Object(n), !0).forEach(function(t) {
                E()(e, t, n[t]);
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
            r = f()(e);
          if (t) {
            var a = f()(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return d()(this, n);
        };
      }
      var F = (function(e) {
          u()(n, e);
          var t = T(n);
          function n(e) {
            var r;
            return (
              a()(this, n),
              (r = t.call(this, e)),
              E()(l()(r), "showDeleteItemModal", function(e, t) {
                r.setState(
                  A(
                    A({}, r.state),
                    {},
                    {
                      showDeleteItem: !0,
                      deleteItem: A(
                        A({}, r.state.deleteItem),
                        {},
                        { id: e, name: t }
                      )
                    }
                  )
                );
              }),
              E()(l()(r), "closeDeleteItemModal", function() {
                r.setState(
                  A(
                    A({}, r.state),
                    {},
                    {
                      showDeleteItem: !1,
                      deleteItem: A(
                        A({}, r.state.deleteItem),
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
            o()(n, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = "",
                    n = !0;
                  return (
                    this.props.hasError
                      ? (t = "Fout bij het ophalen van producten.")
                      : this.props.isLoading
                      ? (t = "Gegevens aan het laden.")
                      : 0 === this.props.products.length
                      ? (t = "Geen producten gevonden!")
                      : (n = !1),
                    b.a.createElement(
                      "div",
                      null,
                      b.a.createElement(
                        P.a,
                        null,
                        b.a.createElement(
                          N.a,
                          null,
                          b.a.createElement(
                            "tr",
                            { className: "thead-title" },
                            b.a.createElement(O.a, {
                              title: "Productcode",
                              width: "15%"
                            }),
                            b.a.createElement(O.a, {
                              title: "Product",
                              width: "20%"
                            }),
                            b.a.createElement(O.a, {
                              title: "Prijs ex. BTW",
                              width: "15%"
                            }),
                            b.a.createElement(O.a, {
                              title: "BTW percentage",
                              width: "15%"
                            }),
                            b.a.createElement(O.a, {
                              title: "Prijs incl. BTW",
                              width: "15%"
                            }),
                            b.a.createElement(O.a, {
                              title: "Administratie",
                              width: "15%"
                            }),
                            b.a.createElement(O.a, { title: "", width: "5%" })
                          )
                        ),
                        b.a.createElement(
                          R.a,
                          null,
                          n
                            ? b.a.createElement(
                                "tr",
                                null,
                                b.a.createElement("td", { colSpan: 7 }, t)
                              )
                            : this.props.products.map(function(t) {
                                return b.a.createElement(
                                  M,
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
        })(v.Component),
        x = Object(g.b)(function(e) {
          return {
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        })(F),
        B = n(693),
        V = Object(g.b)(function(e) {
          return { permissions: e.meDetails.permissions, products: e.products };
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
                b.a.createElement(B.a, {
                  iconName: "glyphicon-refresh",
                  onClickAction: e.refreshProductsData
                }),
                e.permissions.manageFinancial &&
                  b.a.createElement(B.a, {
                    iconName: "glyphicon-plus",
                    onClickAction: function() {
                      j.f.push("/product/nieuw");
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
                "Producten"
              )
            ),
            b.a.createElement(
              "div",
              { className: "col-md-4" },
              b.a.createElement(
                "div",
                { className: "pull-right" },
                "Resultaten: ",
                e.products ? e.products.length : 0
              )
            )
          );
        }),
        U = n(690),
        W = n(691);
      function G(e) {
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
            r = f()(e);
          if (t) {
            var a = f()(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return d()(this, n);
        };
      }
      var _ = (function(e) {
        u()(n, e);
        var t = G(n);
        function n(e) {
          var r;
          return (
            a()(this, n),
            (r = t.call(this, e)),
            E()(l()(r), "refreshProductsData", function() {
              r.props.clearProducts(), r.props.fetchProducts();
            }),
            r
          );
        }
        return (
          o()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchProducts();
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearProducts();
              }
            },
            {
              key: "render",
              value: function() {
                var e = this;
                return b.a.createElement(
                  U.a,
                  null,
                  b.a.createElement(
                    W.a,
                    null,
                    b.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      b.a.createElement(V, {
                        refreshProductsData: function() {
                          return e.refreshProductsData();
                        }
                      })
                    ),
                    b.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      b.a.createElement(x, { products: this.props.products })
                    )
                  )
                );
              }
            }
          ]),
          n
        );
      })(v.Component);
      t.default = Object(g.b)(
        function(e) {
          return { products: e.products };
        },
        function(e) {
          return {
            fetchProducts: function() {
              e(Object(y.c)());
            },
            clearProducts: function() {
              e(Object(y.a)());
            }
          };
        }
      )(_);
    },
    690: function(e, t, n) {
      "use strict";
      var r = n(0),
        a = n.n(r),
        c = n(8),
        o = n.n(c),
        i = function(e) {
          var t = e.children,
            n = e.className,
            r = e.onMouseEnter,
            c = e.onMouseLeave;
          return a.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(n),
              onMouseEnter: r,
              onMouseLeave: c
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
          className: o.a.string,
          onMouseEnter: o.a.func,
          onMouseLeave: o.a.func
        }),
        (t.a = i);
    },
    691: function(e, t, n) {
      "use strict";
      var r = n(0),
        a = n.n(r),
        c = n(8),
        o = n.n(c),
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
        (i.propTypes = { className: o.a.string }),
        (t.a = i);
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
    },
    879: function(e, t, n) {
      "use strict";
      n.d(t, "c", function() {
        return r;
      }),
        n.d(t, "a", function() {
          return a;
        }),
        n.d(t, "b", function() {
          return c;
        });
      var r = function() {
          return { type: "FETCH_PRODUCTS" };
        },
        a = function() {
          return { type: "CLEAR_PRODUCTS" };
        },
        c = function(e) {
          return { type: "DELETE_PRODUCT", id: e };
        };
    }
  }
]);
