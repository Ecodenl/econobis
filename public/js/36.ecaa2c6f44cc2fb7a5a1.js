(window.webpackJsonp = window.webpackJsonp || []).push([
  [36],
  {
    1472: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        o = n(25),
        i = n.n(o),
        c = n(22),
        l = n.n(c),
        s = n(26),
        u = n.n(s),
        d = n(27),
        f = n.n(d),
        m = n(16),
        p = n.n(m),
        h = n(6),
        v = n.n(h),
        y = n(0),
        g = n.n(y),
        b = n(690),
        E = n(691),
        N = n(32),
        C = (n(198), n(10)),
        k = n.n(C),
        w = n(4);
      function R(e) {
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
      var O = (function(e) {
          u()(n, e);
          var t = R(n);
          function n(e) {
            return r()(this, n), t.call(this, e);
          }
          return (
            i()(n, [
              {
                key: "render",
                value: function() {
                  var e = this;
                  return g.a.createElement(
                    "nav",
                    { className: "orders-list open sticky" },
                    g.a.createElement(
                      "div",
                      {
                        className: "send-orders-sidebar-menu",
                        style: { color: "$brand-primary" }
                      },
                      g.a.createElement(
                        k.a,
                        {
                          highlightColor: "$brand-primary",
                          highlightBgColor: "#e5e5e5",
                          hoverBgColor: "#F1EFF0",
                          defaultSelected: "order"
                        },
                        this.props.orders.length > 0
                          ? this.props.orders.map(function(t, n) {
                              return g.a.createElement(
                                C.Nav,
                                {
                                  onNavClick: function() {
                                    return e.props.changeOrder(t.id);
                                  },
                                  key: n,
                                  id: "administration-".concat(t.id)
                                },
                                g.a.createElement(
                                  C.NavText,
                                  null,
                                  g.a.createElement(
                                    w.b,
                                    {
                                      className: "".concat(
                                        t.totalPriceInclVat < 0
                                          ? "send-orders-list-link-error"
                                          : "send-orders-list-link"
                                      )
                                    },
                                    t.number,
                                    " - ",
                                    t.contactName
                                  )
                                )
                              );
                            })
                          : g.a.createElement(
                              C.Nav,
                              { id: "order" },
                              g.a.createElement(
                                C.NavText,
                                null,
                                g.a.createElement(
                                  w.b,
                                  { className: "send-orders-list-link" },
                                  "Geen orders beschikbaar."
                                )
                              )
                            )
                      )
                    )
                  );
                }
              }
            ]),
            n
          );
        })(y.Component),
        T = Object(N.b)(function(e) {
          return { administrationDetails: e.administrationDetails };
        })(O),
        _ = n(210),
        P = n(731),
        D = n(91);
      function j(e) {
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
      var I = (function(e) {
          u()(n, e);
          var t = j(n);
          function n(e) {
            var a;
            return (
              r()(this, n), ((a = t.call(this, e)).state = { file: null }), a
            );
          }
          return (
            i()(n, [
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  this.props.orderId !== e.orderId &&
                    e.orderId &&
                    this.downloadFile(e.orderId);
                }
              },
              {
                key: "downloadFile",
                value: function(e) {
                  var t = this,
                    n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : 0;
                  D.a
                    .downloadPreview(e)
                    .then(function(e) {
                      t.setState({ file: e.data });
                    })
                    .catch(function() {
                      n < 2 &&
                        setTimeout(function() {
                          t.downloadFile(e, n);
                        }, 500),
                        n++;
                    });
                }
              },
              {
                key: "render",
                value: function() {
                  return this.state.file
                    ? g.a.createElement(
                        "div",
                        null,
                        g.a.createElement(P.a, { file: this.state.file })
                      )
                    : g.a.createElement("div", null, "Geen gegevens gevonden.");
                }
              }
            ]),
            n
          );
        })(y.Component),
        M = n(733);
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
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return f()(this, n);
        };
      }
      var A = (function(e) {
          u()(n, e);
          var t = x(n);
          function n(e) {
            var a;
            return (
              r()(this, n), ((a = t.call(this, e)).state = { email: null }), a
            );
          }
          return (
            i()(n, [
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  this.props.orderId !== e.orderId &&
                    e.orderId &&
                    this.downloadEmail(e.orderId);
                }
              },
              {
                key: "downloadEmail",
                value: function(e) {
                  var t = this;
                  D.a.getEmailPreview(e).then(function(e) {
                    t.setState({ email: e });
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  return this.state.email
                    ? g.a.createElement(
                        "div",
                        null,
                        g.a.createElement(
                          "div",
                          { className: "row margin-10-top" },
                          g.a.createElement(
                            "div",
                            { className: "col-sm-12" },
                            g.a.createElement(
                              "div",
                              { className: "row" },
                              g.a.createElement(
                                "div",
                                { className: "col-sm-3" },
                                g.a.createElement(
                                  "label",
                                  { className: "col-sm-12" },
                                  "Aan"
                                )
                              ),
                              g.a.createElement(
                                "div",
                                { className: "col-sm-9" },
                                this.state.email.to
                              )
                            )
                          )
                        ),
                        g.a.createElement(
                          "div",
                          { className: "row margin-10-top" },
                          g.a.createElement(
                            "div",
                            { className: "col-sm-12" },
                            g.a.createElement(
                              "div",
                              { className: "row" },
                              g.a.createElement(
                                "div",
                                { className: "col-sm-3" },
                                g.a.createElement(
                                  "label",
                                  { className: "col-sm-12" },
                                  "Onderwerp"
                                )
                              ),
                              g.a.createElement(
                                "div",
                                { className: "col-sm-9" },
                                this.state.email.subject
                              )
                            )
                          )
                        ),
                        g.a.createElement(
                          "div",
                          { className: "row" },
                          g.a.createElement(M.a, {
                            label: "Tekst",
                            value: this.state.email.htmlBody
                          })
                        )
                      )
                    : g.a.createElement("div", null, "Geen gegevens gevonden.");
                }
              }
            ]),
            n
          );
        })(y.Component),
        S = n(693),
        q = n(100);
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
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return f()(this, n);
        };
      }
      var z = (function(e) {
          u()(n, e);
          var t = F(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              v()(l()(a), "confirmAction", function(e) {
                a.setState({ loading: !0 }),
                  e.preventDefault(),
                  D.a.createAll(a.props.orderIds).then(function(e) {
                    w.f.push(
                      "/financieel/".concat(
                        a.props.administrationId,
                        "/notas/te-verzenden-incasso"
                      )
                    );
                  });
              }),
              (a = t.call(this, e)),
              v()(l()(a), "confirmAction", function(e) {
                a.setState({ loading: !0 }),
                  e.preventDefault(),
                  D.a.createAll(a.props.orderIds).then(function(e) {
                    w.f.push(
                      "/financieel/".concat(
                        a.props.administrationId,
                        "/notas/te-verzenden-incasso"
                      )
                    );
                  });
              }),
              (a.state = { loading: !1 }),
              a
            );
          }
          return (
            i()(n, [
              {
                key: "render",
                value: function() {
                  return g.a.createElement(
                    q.a,
                    {
                      modalClassName: "modal-lg",
                      closeModal: this.props.closeModal,
                      confirmAction: this.confirmAction,
                      title: "Nota aanmaken",
                      buttonConfirmText: "Aanmaken",
                      loading: this.state.loading
                    },
                    g.a.createElement(
                      "div",
                      { className: "row" },
                      g.a.createElement(
                        "div",
                        { className: "col-sm-12 margin-10-bottom" },
                        g.a.createElement(
                          "span",
                          null,
                          "Wilt u alle concept nota's (",
                          this.props.amountOfOrders,
                          ") aanmaken? Let op. Nadat je op \"maak concept nota's\" hebt geklikt staan de concept nota's klaar om te verzenden. Je kunt geen wijzigingen aanmaken in de order. Dit kan pas weer, nadat de aangemaakte nota werkelijk is verzonden. Zorg er daarom voor dat je order juist is.",
                          g.a.createElement("br", null),
                          g.a.createElement("br", null),
                          "De aangemaakte concept nota's komen in de map “Te verzenden - incasso nota's” of “Te verzenden – overboek nota's”. Vanuit deze mappen kun je de nota's definitief maken en verzenden.",
                          g.a.createElement("br", null),
                          g.a.createElement("br", null),
                          'Deze orders gaan van de order map "Actief - te factureren orders" naar de order map “Actief – te verzenden orders”.'
                        )
                      )
                    )
                  );
                }
              }
            ]),
            n
          );
        })(y.Component),
        L = n(692);
      function W(e) {
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
      var U = (function(e) {
          u()(n, e);
          var t = W(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              v()(l()(a), "showCreate", function() {
                a.setState({ showCreate: !a.state.showCreate });
              }),
              (a.state = { showCreate: !1 }),
              a
            );
          }
          return (
            i()(n, [
              {
                key: "render",
                value: function() {
                  return g.a.createElement(
                    "div",
                    { className: "row" },
                    g.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      g.a.createElement(
                        "div",
                        {
                          className: "btn-group btn-group-flex margin-small",
                          role: "group"
                        },
                        g.a.createElement(S.a, {
                          iconName: "glyphicon-arrow-left",
                          onClickAction: w.e.goBack
                        }),
                        this.props.amountOfOrders > 0 &&
                          g.a.createElement(L.a, {
                            buttonText: "Maak concept nota's",
                            onClickAction: this.showCreate
                          })
                      )
                    ),
                    g.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      g.a.createElement(
                        "h4",
                        { className: "text-center" },
                        "Concept nota's aanmaken(",
                        this.props.amountOfOrders,
                        ")"
                      )
                    ),
                    g.a.createElement("div", { className: "col-md-4" }),
                    this.state.showCreate &&
                      g.a.createElement(z, {
                        closeModal: this.showCreate,
                        administrationId: this.props.administrationId,
                        amountOfOrders: this.props.amountOfOrders,
                        orderIds: this.props.orderIds
                      })
                  );
                }
              }
            ]),
            n
          );
        })(y.Component),
        V = n(794);
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
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return f()(this, n);
        };
      }
      var G = (function(e) {
        u()(n, e);
        var t = B(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            (a = t.call(this, e)),
            v()(l()(a), "changeOrder", function(e) {
              a.setState({ orderId: e });
            }),
            (a.state = { orders: [], orderId: "" }),
            a
          );
        }
        return (
          i()(n, [
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearPreviewCreate();
              }
            },
            {
              key: "componentDidMount",
              value: function() {
                var e = this;
                _.a
                  .getOrdersForCreating(this.props.orderPreviewCreate)
                  .then(function(t) {
                    e.setState({ orders: t.data });
                  });
              }
            },
            {
              key: "render",
              value: function() {
                return g.a.createElement(
                  "div",
                  null,
                  g.a.createElement(
                    "div",
                    { className: "row" },
                    g.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      g.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        g.a.createElement(
                          b.a,
                          null,
                          g.a.createElement(
                            E.a,
                            { className: "panel-small" },
                            g.a.createElement(U, {
                              amountOfOrders: this.state.orders
                                ? this.state.orders.length
                                : 0,
                              administrationId: this.props.params.id,
                              orderIds: this.props.orderPreviewCreate
                            })
                          )
                        )
                      )
                    )
                  ),
                  g.a.createElement(
                    "div",
                    { className: "row" },
                    g.a.createElement(
                      "div",
                      { className: "col-md-2" },
                      g.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        g.a.createElement(
                          b.a,
                          null,
                          g.a.createElement(
                            E.a,
                            { className: "panel-orders-list" },
                            g.a.createElement(T, {
                              orders: this.state.orders,
                              changeOrder: this.changeOrder
                            })
                          )
                        )
                      )
                    ),
                    g.a.createElement(
                      "div",
                      { className: "col-md-5" },
                      g.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        g.a.createElement(
                          b.a,
                          null,
                          g.a.createElement(
                            E.a,
                            null,
                            g.a.createElement(I, {
                              orderId: this.state.orderId
                            })
                          )
                        )
                      )
                    ),
                    g.a.createElement(
                      "div",
                      { className: "col-md-5" },
                      g.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        g.a.createElement(
                          b.a,
                          null,
                          g.a.createElement(
                            E.a,
                            null,
                            g.a.createElement(A, {
                              orderId: this.state.orderId
                            })
                          )
                        )
                      )
                    )
                  )
                );
              }
            }
          ]),
          n
        );
      })(y.Component);
      t.default = Object(N.b)(
        function(e) {
          return { orderPreviewCreate: e.orderPreviewCreate };
        },
        function(e) {
          return {
            clearPreviewCreate: function() {
              e(Object(V.b)());
            }
          };
        }
      )(G);
    },
    690: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        i = n.n(o),
        c = function(e) {
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
      (c.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (c.propTypes = {
          className: i.a.string,
          onMouseEnter: i.a.func,
          onMouseLeave: i.a.func
        }),
        (t.a = c);
    },
    691: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        i = n.n(o),
        c = function(e) {
          var t = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            n
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: i.a.string }),
        (t.a = c);
    },
    692: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        i = n.n(o),
        c = function(e) {
          var t = e.buttonClassName,
            n = e.buttonText,
            a = e.onClickAction,
            o = e.type,
            i = e.value,
            c = e.loading,
            l = e.loadText,
            s = e.disabled;
          return c
            ? r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: i,
                  disabled: c
                },
                r.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                l
              )
            : r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm ".concat(t),
                  onClick: a,
                  value: i,
                  disabled: s
                },
                n
              );
        };
      (c.defaultProps = {
        buttonClassName: "btn-success",
        type: "button",
        value: "",
        loading: !1,
        loadText: "Aan het laden",
        disabled: !1
      }),
        (c.propTypes = {
          buttonClassName: i.a.string,
          buttonText: i.a.string.isRequired,
          onClickAction: i.a.func,
          type: i.a.string,
          value: i.a.string,
          loading: i.a.bool,
          loadText: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = c);
    },
    693: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        i = n.n(o),
        c = function(e) {
          var t = e.buttonClassName,
            n = e.iconName,
            a = e.onClickAction,
            o = e.title,
            i = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: a,
              disabled: i,
              title: o
            },
            r.a.createElement("span", { className: "glyphicon ".concat(n) })
          );
        };
      (c.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (c.propTypes = {
          buttonClassName: i.a.string,
          iconName: i.a.string.isRequired,
          onClickAction: i.a.func,
          title: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = c);
    },
    731: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        i = n.n(o),
        c = n(775),
        l = n.n(c),
        s = function(e) {
          var t = e.page,
            n = (e.pages, e.handlePrevClick);
          return 1 === t
            ? r.a.createElement("div", null)
            : r.a.createElement(
                "h3",
                {
                  style: {
                    cursor: "pointer",
                    display: "inline-block",
                    marginRight: 24,
                    marginTop: 0
                  },
                  onClick: n
                },
                "<"
              );
        };
      s.propTypes = {
        page: i.a.number.isRequired,
        pages: i.a.number.isRequired,
        handlePrevClick: i.a.func.isRequired
      };
      var u = function(e) {
        var t = e.page,
          n = e.pages,
          a = e.handleNextClick;
        return t === n
          ? r.a.createElement("div", null)
          : r.a.createElement(
              "h3",
              {
                style: {
                  cursor: "pointer",
                  display: "inline-block",
                  marginLeft: 24,
                  marginTop: 0
                },
                onClick: a
              },
              ">"
            );
      };
      u.propTypes = {
        page: i.a.number.isRequired,
        pages: i.a.number.isRequired,
        handleNextClick: i.a.func.isRequired
      };
      var d = function(e) {
        var t = e.page,
          n = e.pages;
        return r.a.createElement(
          "h3",
          { style: { display: "inline-block", marginTop: 0 } },
          "Pagina ",
          t,
          " van ",
          n
        );
      };
      d.propTypes = {
        page: i.a.number.isRequired,
        pages: i.a.number.isRequired
      };
      var f = function(e) {
        var t = e.page,
          n = e.pages,
          a = e.handlePrevClick,
          o = e.handleNextClick;
        return r.a.createElement(
          "div",
          { className: "customWrapper" },
          r.a.createElement(s, { page: t, pages: n, handlePrevClick: a }),
          r.a.createElement(d, { page: t, pages: n }),
          r.a.createElement(u, { page: t, pages: n, handleNextClick: o })
        );
      };
      f.propTypes = {
        page: i.a.number.isRequired,
        pages: i.a.number.isRequired,
        handlePrevClick: i.a.func.isRequired,
        handleNextClick: i.a.func.isRequired
      };
      var m = f;
      (l.a.defaultProps = { file: "", scale: 1 }),
        (l.a.propTypes = { file: i.a.string, scale: i.a.number });
      t.a = function(e) {
        var t = e.file,
          n = e.scale;
        return r.a.createElement(
          "div",
          { className: "panel-heading" },
          r.a.createElement(l.a, {
            document: { file: t },
            navigation: m,
            scale: n
          })
        );
      };
    },
    733: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(739),
        i = n.n(o),
        c = n(8),
        l = n.n(c),
        s = n(690),
        u = n(692),
        d = function(e) {
          var t = e.label,
            n = e.className,
            a = e.id,
            o = e.value,
            c = e.switchToEdit;
          return r.a.createElement(
            "div",
            { className: n },
            r.a.createElement(
              "label",
              { htmlFor: a, className: "col-sm-3" },
              t,
              c
                ? r.a.createElement(
                    "span",
                    null,
                    r.a.createElement("br", null),
                    r.a.createElement(u.a, {
                      buttonClassName: "btn-success btn-padding-small",
                      buttonText: "Wijzig",
                      onClickAction: c
                    })
                  )
                : ""
            ),
            r.a.createElement(
              s.a,
              { className: "col-sm-9" },
              r.a.createElement(
                i.a,
                null,
                r.a.createElement("div", {
                  id: a,
                  dangerouslySetInnerHTML: { __html: o }
                })
              )
            )
          );
        };
      (d.defaultProps = { className: "col-sm-12", value: "" }),
        (d.propTypes = {
          label: l.a.string.isRequired,
          className: l.a.string,
          id: l.a.string,
          value: l.a.oneOfType([l.a.string, l.a.number])
        }),
        (t.a = d);
    },
    739: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a,
        r = n(740),
        o = (a = r) && a.__esModule ? a : { default: a };
      t.default = o.default;
    },
    740: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var a in n)
                Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
            }
            return e;
          },
        r = (function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var a = t[n];
              (a.enumerable = a.enumerable || !1),
                (a.configurable = !0),
                "value" in a && (a.writable = !0),
                Object.defineProperty(e, a.key, a);
            }
          }
          return function(t, n, a) {
            return n && e(t.prototype, n), a && e(t, a), t;
          };
        })(),
        o = n(0),
        i = u(o),
        c = u(n(103)),
        l = u(n(8)),
        s = u(n(741));
      function u(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var d,
        f = "undefined" != typeof window && window.console,
        m = function() {},
        p = m,
        h = m;
      f &&
        ((d = console.error),
        (p = function() {
          console.error = function(e) {
            /<head>/.test(e) || d.call(console, e);
          };
        }),
        (h = function() {
          return (console.error = d);
        }));
      var v = (function(e) {
        function t(e, n) {
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, t);
          var a = (function(e, t) {
            if (!e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return !t || ("object" != typeof t && "function" != typeof t)
              ? e
              : t;
          })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
          return (a._isMounted = !1), a;
        }
        return (
          (function(e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof t
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
              t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t));
          })(t, e),
          r(t, [
            {
              key: "componentDidMount",
              value: function() {
                (this._isMounted = !0), this.renderFrameContents();
              }
            },
            {
              key: "componentDidUpdate",
              value: function() {
                this.renderFrameContents();
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this._isMounted = !1;
                var e = this.getDoc(),
                  t = this.getMountTarget();
                e && t && c.default.unmountComponentAtNode(t);
              }
            },
            {
              key: "getDoc",
              value: function() {
                return c.default.findDOMNode(this).contentDocument;
              }
            },
            {
              key: "getMountTarget",
              value: function() {
                var e = this.getDoc();
                return this.props.mountTarget
                  ? e.querySelector(this.props.mountTarget)
                  : e.body.children[0];
              }
            },
            {
              key: "renderFrameContents",
              value: function() {
                if (this._isMounted) {
                  var e = this.getDoc();
                  if (e && "complete" === e.readyState) {
                    null === e.querySelector("div") &&
                      (this._setInitialContent = !1);
                    var t = e.defaultView || e.parentView,
                      n = !this._setInitialContent,
                      a = i.default.createElement(
                        s.default,
                        { document: e, window: t },
                        i.default.createElement(
                          "div",
                          { className: "frame-content" },
                          this.props.head,
                          this.props.children
                        )
                      );
                    n &&
                      (e.open("text/html", "replace"),
                      e.write(this.props.initialContent),
                      e.close(),
                      (this._setInitialContent = !0)),
                      p();
                    var r = n
                        ? this.props.contentDidMount
                        : this.props.contentDidUpdate,
                      o = this.getMountTarget();
                    c.default.unstable_renderSubtreeIntoContainer(
                      this,
                      a,
                      o,
                      r
                    ),
                      h();
                  } else setTimeout(this.renderFrameContents.bind(this), 0);
                }
              }
            },
            {
              key: "render",
              value: function() {
                var e = a({}, this.props, { children: void 0 });
                return (
                  delete e.head,
                  delete e.initialContent,
                  delete e.mountTarget,
                  delete e.contentDidMount,
                  delete e.contentDidUpdate,
                  i.default.createElement("iframe", e)
                );
              }
            }
          ]),
          t
        );
      })(o.Component);
      (v.propTypes = {
        style: l.default.object,
        head: l.default.node,
        initialContent: l.default.string,
        mountTarget: l.default.string,
        contentDidMount: l.default.func,
        contentDidUpdate: l.default.func,
        children: l.default.oneOfType([
          l.default.element,
          l.default.arrayOf(l.default.element)
        ])
      }),
        (v.defaultProps = {
          style: {},
          head: null,
          children: void 0,
          mountTarget: void 0,
          contentDidMount: function() {},
          contentDidUpdate: function() {},
          initialContent:
            '<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'
        }),
        (t.default = v);
    },
    741: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = (function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var a = t[n];
              (a.enumerable = a.enumerable || !1),
                (a.configurable = !0),
                "value" in a && (a.writable = !0),
                Object.defineProperty(e, a.key, a);
            }
          }
          return function(t, n, a) {
            return n && e(t.prototype, n), a && e(t, a), t;
          };
        })(),
        r = n(0),
        o = (i(r), i(n(8)));
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function c(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function l(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      var s = (function(e) {
        function t() {
          return (
            c(this, t),
            l(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
            )
          );
        }
        return (
          (function(e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof t
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
              t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t));
          })(t, e),
          a(t, [
            {
              key: "getChildContext",
              value: function() {
                return {
                  document: this.props.document,
                  window: this.props.window
                };
              }
            },
            {
              key: "render",
              value: function() {
                return r.Children.only(this.props.children);
              }
            }
          ]),
          t
        );
      })(r.Component);
      (s.propTypes = {
        document: o.default.object.isRequired,
        window: o.default.object.isRequired,
        children: o.default.element.isRequired
      }),
        (s.childContextTypes = {
          document: o.default.object.isRequired,
          window: o.default.object.isRequired
        }),
        (t.default = s);
    },
    779: function(e, t) {},
    780: function(e, t) {},
    781: function(e, t) {},
    782: function(e, t) {},
    783: function(e, t) {},
    794: function(e, t, n) {
      "use strict";
      n.d(t, "d", function() {
        return a;
      }),
        n.d(t, "a", function() {
          return r;
        }),
        n.d(t, "c", function() {
          return o;
        }),
        n.d(t, "e", function() {
          return i;
        }),
        n.d(t, "b", function() {
          return c;
        });
      var a = function(e, t, n, a) {
          return {
            type: "FETCH_ORDERS",
            filters: e,
            sorts: t,
            pagination: n,
            administrationId: a
          };
        },
        r = function() {
          return { type: "CLEAR_ORDERS" };
        },
        o = function(e) {
          return { type: "DELETE_ORDER", id: e };
        },
        i = function(e) {
          return { type: "ORDER_PREVIEW_CREATE", data: e };
        },
        c = function() {
          return { type: "CLEAR_ORDER_PREVIEW_CREATE" };
        };
    }
  }
]);
