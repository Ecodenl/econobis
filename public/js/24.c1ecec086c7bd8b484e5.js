(window.webpackJsonp = window.webpackJsonp || []).push([
  [24],
  {
    1465: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        o = n(25),
        i = n.n(o),
        s = n(22),
        c = n.n(s),
        l = n(26),
        u = n.n(l),
        d = n(27),
        p = n.n(d),
        f = n(16),
        m = n.n(f),
        v = n(6),
        h = n.n(v),
        y = n(0),
        b = n.n(y),
        g = n(690),
        E = n(691),
        N = n(32),
        w = (n(198), n(10)),
        C = n.n(w),
        I = n(4);
      function O(e) {
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
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var D = (function(e) {
          u()(n, e);
          var t = O(n);
          function n(e) {
            return r()(this, n), t.call(this, e);
          }
          return (
            i()(n, [
              {
                key: "render",
                value: function() {
                  var e = this;
                  return b.a.createElement(
                    "nav",
                    { className: "invoices-list open sticky" },
                    b.a.createElement(
                      "div",
                      {
                        className: "send-invoices-sidebar-menu",
                        style: { color: "$brand-primary" }
                      },
                      b.a.createElement(
                        C.a,
                        {
                          highlightColor: "$brand-primary",
                          highlightBgColor: "#e5e5e5",
                          hoverBgColor: "#F1EFF0",
                          defaultSelected: "invoice"
                        },
                        this.props.invoices.length > 0
                          ? this.props.invoices.map(function(t, n) {
                              return b.a.createElement(
                                w.Nav,
                                {
                                  onNavClick: function() {
                                    return e.props.changeInvoice(t.id);
                                  },
                                  key: n,
                                  id: "administration-".concat(t.id)
                                },
                                b.a.createElement(
                                  w.NavText,
                                  null,
                                  b.a.createElement(
                                    I.b,
                                    {
                                      className: "".concat(
                                        "Geen e-mail bekend" ===
                                          t.emailToAddress
                                          ? "send-invoices-list-link-error"
                                          : "send-invoices-list-link"
                                      )
                                    },
                                    t.number,
                                    " - ",
                                    t.contactName
                                  )
                                )
                              );
                            })
                          : b.a.createElement(
                              w.Nav,
                              { id: "invoice" },
                              b.a.createElement(
                                w.NavText,
                                null,
                                b.a.createElement(
                                  I.b,
                                  { className: "send-invoices-list-link" },
                                  "Geen nota's beschikbaar."
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
        })(D),
        R = n(212),
        k = n(731),
        S = n(90);
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
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var j = (function(e) {
          u()(n, e);
          var t = P(n);
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
                  this.props.invoiceId !== e.invoiceId &&
                    e.invoiceId &&
                    this.downloadFile(e.invoiceId);
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
                  S.a
                    .download(e)
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
                    ? b.a.createElement(
                        "div",
                        null,
                        b.a.createElement(k.a, { file: this.state.file })
                      )
                    : b.a.createElement("div", null, "Geen gegevens gevonden.");
                }
              }
            ]),
            n
          );
        })(y.Component),
        A = n(733);
      function _(e) {
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
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var x = (function(e) {
          u()(n, e);
          var t = _(n);
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
                  this.props.invoiceId !== e.invoiceId &&
                    e.invoiceId &&
                    this.downloadEmail(e.invoiceId);
                }
              },
              {
                key: "downloadEmail",
                value: function(e) {
                  var t = this;
                  S.a.getEmailPreview(e).then(function(e) {
                    t.setState({ email: e });
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  return this.state.email
                    ? b.a.createElement(
                        "div",
                        null,
                        b.a.createElement(
                          "div",
                          { className: "row margin-10-top" },
                          b.a.createElement(
                            "div",
                            { className: "col-sm-12" },
                            b.a.createElement(
                              "div",
                              { className: "row" },
                              b.a.createElement(
                                "div",
                                { className: "col-sm-3" },
                                b.a.createElement(
                                  "label",
                                  { className: "col-sm-12" },
                                  "Aan"
                                )
                              ),
                              b.a.createElement(
                                "div",
                                { className: "col-sm-9" },
                                this.state.email.to
                              )
                            )
                          )
                        ),
                        this.state.email.bcc
                          ? b.a.createElement(
                              "div",
                              { className: "row margin-10-top" },
                              b.a.createElement(
                                "div",
                                { className: "col-sm-12" },
                                b.a.createElement(
                                  "div",
                                  { className: "row" },
                                  b.a.createElement(
                                    "div",
                                    { className: "col-sm-3" },
                                    b.a.createElement(
                                      "label",
                                      { className: "col-sm-12" },
                                      "Bcc"
                                    )
                                  ),
                                  b.a.createElement(
                                    "div",
                                    { className: "col-sm-9" },
                                    this.state.email.bcc
                                  )
                                )
                              )
                            )
                          : null,
                        b.a.createElement(
                          "div",
                          { className: "row margin-10-top" },
                          b.a.createElement(
                            "div",
                            { className: "col-sm-12" },
                            b.a.createElement(
                              "div",
                              { className: "row" },
                              b.a.createElement(
                                "div",
                                { className: "col-sm-3" },
                                b.a.createElement(
                                  "label",
                                  { className: "col-sm-12" },
                                  "Onderwerp"
                                )
                              ),
                              b.a.createElement(
                                "div",
                                { className: "col-sm-9" },
                                this.state.email.subject
                              )
                            )
                          )
                        ),
                        b.a.createElement(
                          "div",
                          { className: "row" },
                          b.a.createElement(A.a, {
                            label: "Tekst",
                            value: this.state.email.htmlBody
                          })
                        )
                      )
                    : b.a.createElement("div", null, "Geen gegevens gevonden.");
                }
              }
            ]),
            n
          );
        })(y.Component),
        M = n(693),
        q = n(100),
        z = n(711),
        F = n.n(z),
        L = n(699),
        U = n(697),
        B = n.n(U),
        V = n(7),
        W = n.n(V),
        Y = n(202);
      function G(e, t) {
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
      function H(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? G(Object(n), !0).forEach(function(t) {
                h()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : G(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
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
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var $ = (function(e) {
          u()(n, e);
          var t = J(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              h()(c()(a), "confirmAction", function(e) {
                if (
                  (e.preventDefault(),
                  a.setState({ loading: !0 }),
                  !a.props.canCreateInvoices.can)
                )
                  return (
                    a.props.setError(412, a.props.canCreateInvoices.message),
                    void a.props.closeModal()
                  );
                var t = !1;
                if ("incasso" === a.props.paymentType) {
                  var n = a.state.dateCollection,
                    r = {};
                  B.a.isEmpty(n + "") && ((r.dateCollection = !0), (t = !0)),
                    W()().isAfter(W()(n)) &&
                      ((r.dateCollection = !0), (t = !0)),
                    a.setState(H(H({}, a.state), {}, { errors: r })),
                    t ||
                      (S.a.sendAll(a.props.invoiceIds, n).then(function(e) {
                        e &&
                          e.headers &&
                          e.headers["x-filename"] &&
                          F()(e.data, e.headers["x-filename"]);
                      }),
                      I.f.push(
                        "/financieel/".concat(
                          a.props.administrationId,
                          "/notas/verzonden"
                        )
                      ));
                } else
                  S.a.sendAll(a.props.invoiceIds, null).then(function(e) {
                    e &&
                      e.headers &&
                      e.headers["x-filename"] &&
                      F()(e.data, e.headers["x-filename"]);
                  }),
                    I.f.push(
                      "/financieel/".concat(
                        a.props.administrationId,
                        "/notas/verzonden"
                      )
                    );
              }),
              h()(c()(a), "handleInputChangeDate", function(e, t) {
                a.setState(H(H({}, a.state), {}, h()({}, t, e)));
              }),
              (a.state = {
                dateCollection: "",
                loading: !1,
                errors: { dateCollection: !1 }
              }),
              a
            );
          }
          return (
            i()(n, [
              {
                key: "render",
                value: function() {
                  var e = this.state.dateCollection;
                  return b.a.createElement(
                    q.a,
                    {
                      closeModal: this.props.closeModal,
                      confirmAction: this.confirmAction,
                      title: "Nota verzenden",
                      buttonConfirmText: "Verzenden",
                      loading: this.state.loading
                    },
                    "incasso" === this.props.paymentType &&
                      b.a.createElement(
                        "div",
                        { className: "row" },
                        b.a.createElement(L.a, {
                          divSize: "col-xs-12",
                          label: "Incasso datum",
                          name: "dateCollection",
                          value: e,
                          onChangeAction: this.handleInputChangeDate,
                          required: "required",
                          error: this.state.errors.dateCollection
                        })
                      ),
                    "incasso" === this.props.paymentType &&
                      b.a.createElement(
                        "div",
                        { className: "row" },
                        b.a.createElement(
                          "div",
                          { className: "col-sm-12 margin-10-bottom" },
                          b.a.createElement(
                            "span",
                            null,
                            "De incasso datum moet minimaal x dagen later zijn dan de datum waarop je het sepa incasso bestand upload bij je bank. En maximaal x maanden na de upload datum. Informeer bij jou bank welke data zij handhaven.",
                            b.a.createElement("br", null),
                            " ",
                            b.a.createElement("br", null),
                            b.a.createElement(
                              "ul",
                              null,
                              b.a.createElement(
                                "li",
                                null,
                                "Bij Triodos is dat minimaal 2 werkdagen en maximaal 2 maanden"
                              )
                            )
                          )
                        )
                      ),
                    b.a.createElement(
                      "div",
                      { className: "row" },
                      b.a.createElement(
                        "div",
                        { className: "col-sm-12 margin-10-bottom" },
                        b.a.createElement(
                          "span",
                          null,
                          "Wilt u alle nota's definitief maken en verzenden?"
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
        K = Object(N.b)(
          function(e) {
            return {
              canCreateInvoices: e.administrationDetails.canCreateInvoices
            };
          },
          function(e) {
            return {
              setError: function(t, n) {
                e(Object(Y.b)(t, n));
              }
            };
          }
        )($),
        Q = n(692);
      function X(e, t) {
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
      function Z(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? X(Object(n), !0).forEach(function(t) {
                h()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : X(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function ee(e) {
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
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var te = (function(e) {
        u()(n, e);
        var t = ee(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            (a = t.call(this, e)),
            h()(c()(a), "confirmAction", function(e) {
              e.preventDefault();
              var t = !1;
              if ("incasso" === a.props.paymentType) {
                var n = a.state.dateCollection,
                  r = {};
                B.a.isEmpty(n + "") && ((r.dateCollection = !0), (t = !0)),
                  W()().isAfter(W()(n)) && ((r.dateCollection = !0), (t = !0)),
                  a.setState(Z(Z({}, a.state), {}, { errors: r })),
                  t ||
                    (a.setState({ loading: !0 }),
                    S.a.sendAllPost(a.props.invoiceIds, n).then(function(e) {
                      e && e.headers && e.headers["x-filename"]
                        ? (F()(e.data, e.headers["x-filename"]),
                          S.a
                            .createSepaForInvoiceIds(a.props.invoiceIds)
                            .then(function(e) {
                              e && e.headers && e.headers["x-filename"]
                                ? (F()(e.data, e.headers["x-filename"]),
                                  I.f.push(
                                    "/financieel/".concat(
                                      a.props.administrationId,
                                      "/notas/verzonden"
                                    )
                                  ))
                                : I.f.push(
                                    "/financieel/".concat(
                                      a.props.administrationId,
                                      "/notas/verzonden"
                                    )
                                  );
                            }))
                        : I.f.push(
                            "/financieel/".concat(
                              a.props.administrationId,
                              "/notas/verzonden"
                            )
                          );
                    }));
              } else
                a.setState({ loading: !0 }),
                  S.a.sendAllPost(a.props.invoiceIds, null).then(function(e) {
                    e && e.headers && e.headers["x-filename"]
                      ? (F()(e.data, e.headers["x-filename"]),
                        S.a
                          .createSepaForInvoiceIds(a.props.invoiceIds)
                          .then(function(e) {
                            e && e.headers && e.headers["x-filename"]
                              ? (F()(e.data, e.headers["x-filename"]),
                                I.f.push(
                                  "/financieel/".concat(
                                    a.props.administrationId,
                                    "/notas/verzonden"
                                  )
                                ))
                              : I.f.push(
                                  "/financieel/".concat(
                                    a.props.administrationId,
                                    "/notas/verzonden"
                                  )
                                );
                          }))
                      : I.f.push(
                          "/financieel/".concat(
                            a.props.administrationId,
                            "/notas/verzonden"
                          )
                        );
                  });
            }),
            h()(c()(a), "handleInputChangeDate", function(e, t) {
              a.setState(Z(Z({}, a.state), {}, h()({}, t, e)));
            }),
            (a.state = {
              dateCollection: "",
              loading: !1,
              errors: { dateCollection: !1 }
            }),
            a
          );
        }
        return (
          i()(n, [
            {
              key: "render",
              value: function() {
                var e = this.state.dateCollection;
                return b.a.createElement(
                  q.a,
                  {
                    closeModal: this.props.closeModal,
                    confirmAction: this.confirmAction,
                    title: "Nota downloaden",
                    buttonConfirmText: "Downloaden",
                    loading: this.state.loading
                  },
                  "incasso" === this.props.paymentType &&
                    b.a.createElement(
                      "div",
                      { className: "row" },
                      b.a.createElement(L.a, {
                        divSize: "col-xs-12",
                        label: "Incasso datum",
                        name: "dateCollection",
                        value: e,
                        onChangeAction: this.handleInputChangeDate,
                        required: "required",
                        error: this.state.errors.dateCollection
                      })
                    ),
                  b.a.createElement(
                    "div",
                    { className: "row" },
                    b.a.createElement(
                      "div",
                      { className: "col-sm-12 margin-10-bottom" },
                      b.a.createElement(
                        "span",
                        null,
                        "Wilt u alle nota's definitief maken, downloaden en doorzetten naar status verzonden?"
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
      function ne(e) {
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
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var ae = (function(e) {
          u()(n, e);
          var t = ne(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              h()(c()(a), "showSend", function() {
                a.setState({ showSend: !a.state.showSend });
              }),
              (a.state = { showSend: !1 }),
              a
            );
          }
          return (
            i()(n, [
              {
                key: "render",
                value: function() {
                  return b.a.createElement(
                    "div",
                    { className: "row" },
                    b.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      b.a.createElement(
                        "div",
                        {
                          className: "btn-group btn-group-flex margin-small",
                          role: "group"
                        },
                        b.a.createElement(M.a, {
                          iconName: "glyphicon-arrow-left",
                          onClickAction: I.e.goBack
                        }),
                        this.props.amountOfInvoices > 0 &&
                          "email" === this.props.type &&
                          "incasso" === this.props.paymentType &&
                          b.a.createElement(Q.a, {
                            buttonText: "Nota's e-mailen en sepa bestand maken",
                            onClickAction: this.showSend
                          }),
                        this.props.amountOfInvoices > 0 &&
                          "email" === this.props.type &&
                          "overboeken" === this.props.paymentType &&
                          b.a.createElement(Q.a, {
                            buttonText: "Nota's e-mailen",
                            onClickAction: this.showSend
                          }),
                        this.props.amountOfInvoices > 0 &&
                          "post" === this.props.type &&
                          "incasso" === this.props.paymentType &&
                          b.a.createElement(Q.a, {
                            buttonText:
                              "Nota's downloaden en sepa bestand maken",
                            onClickAction: this.showSend
                          }),
                        this.props.amountOfInvoices > 0 &&
                          "post" === this.props.type &&
                          "overboeken" === this.props.paymentType &&
                          b.a.createElement(Q.a, {
                            buttonText: "Nota's downloaden",
                            onClickAction: this.showSend
                          })
                      )
                    ),
                    b.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      b.a.createElement(
                        "h4",
                        { className: "text-center" },
                        "Te verzenden nota's versturen(",
                        this.props.amountOfInvoices,
                        ")"
                      )
                    ),
                    b.a.createElement("div", { className: "col-md-4" }),
                    this.state.showSend &&
                      "email" === this.props.type &&
                      b.a.createElement(K, {
                        type: this.props.type,
                        paymentType: this.props.paymentType,
                        invoiceIds: this.props.invoiceIds,
                        closeModal: this.showSend,
                        administrationId: this.props.administrationId
                      }),
                    this.state.showSend &&
                      "post" === this.props.type &&
                      b.a.createElement(te, {
                        type: this.props.type,
                        paymentType: this.props.paymentType,
                        invoiceIds: this.props.invoiceIds,
                        closeModal: this.showSend,
                        administrationId: this.props.administrationId
                      })
                  );
                }
              }
            ]),
            n
          );
        })(y.Component),
        re = n(807),
        oe = n(748);
      function ie(e) {
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
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var se = (function(e) {
        u()(n, e);
        var t = ie(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            (a = t.call(this, e)),
            h()(c()(a), "changeInvoice", function(e) {
              a.setState({ invoiceId: e });
            }),
            (a.state = { invoices: [], invoiceId: "" }),
            a
          );
        }
        return (
          i()(n, [
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearPreviewSend();
              }
            },
            {
              key: "componentDidMount",
              value: function() {
                var e = this;
                this.props.fetchAdministrationDetails(this.props.params.id),
                  R.a
                    .getInvoicesForSending(this.props.invoicePreviewSend)
                    .then(function(t) {
                      e.setState({ invoices: t.data });
                    });
              }
            },
            {
              key: "render",
              value: function() {
                return b.a.createElement(
                  "div",
                  null,
                  b.a.createElement(
                    "div",
                    { className: "row" },
                    b.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      b.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        b.a.createElement(
                          g.a,
                          null,
                          b.a.createElement(
                            E.a,
                            { className: "panel-small" },
                            b.a.createElement(ae, {
                              type: this.props.params.type,
                              paymentType: this.props.params.paymentType,
                              invoiceIds: this.props.invoicePreviewSend,
                              amountOfInvoices: this.state.invoices
                                ? this.state.invoices.length
                                : 0,
                              administrationId: this.props.params.id
                            })
                          )
                        )
                      )
                    )
                  ),
                  b.a.createElement(
                    "div",
                    { className: "row" },
                    b.a.createElement(
                      "div",
                      { className: "col-md-2" },
                      b.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        b.a.createElement(
                          g.a,
                          null,
                          b.a.createElement(
                            E.a,
                            { className: "panel-invoices-list" },
                            b.a.createElement(T, {
                              invoices: this.state.invoices,
                              changeInvoice: this.changeInvoice
                            })
                          )
                        )
                      )
                    ),
                    b.a.createElement(
                      "div",
                      { className: "col-md-5" },
                      b.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        b.a.createElement(
                          g.a,
                          null,
                          b.a.createElement(
                            E.a,
                            null,
                            b.a.createElement(j, {
                              invoiceId: this.state.invoiceId
                            })
                          )
                        )
                      )
                    ),
                    b.a.createElement(
                      "div",
                      { className: "col-md-5" },
                      b.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        b.a.createElement(
                          g.a,
                          null,
                          b.a.createElement(
                            E.a,
                            null,
                            b.a.createElement(x, {
                              invoiceId: this.state.invoiceId
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
          return { invoicePreviewSend: e.invoicePreviewSend };
        },
        function(e) {
          return {
            clearPreviewSend: function() {
              e(Object(re.b)());
            },
            fetchAdministrationDetails: function(t) {
              e(Object(oe.d)(t));
            }
          };
        }
      )(se);
    },
    690: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        i = n.n(o),
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
          className: i.a.string,
          onMouseEnter: i.a.func,
          onMouseLeave: i.a.func
        }),
        (t.a = s);
    },
    691: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        i = n.n(o),
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
        (s.propTypes = { className: i.a.string }),
        (t.a = s);
    },
    692: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        i = n.n(o),
        s = function(e) {
          var t = e.buttonClassName,
            n = e.buttonText,
            a = e.onClickAction,
            o = e.type,
            i = e.value,
            s = e.loading,
            c = e.loadText,
            l = e.disabled;
          return s
            ? r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: i,
                  disabled: s
                },
                r.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                c
              )
            : r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm ".concat(t),
                  onClick: a,
                  value: i,
                  disabled: l
                },
                n
              );
        };
      (s.defaultProps = {
        buttonClassName: "btn-success",
        type: "button",
        value: "",
        loading: !1,
        loadText: "Aan het laden",
        disabled: !1
      }),
        (s.propTypes = {
          buttonClassName: i.a.string,
          buttonText: i.a.string.isRequired,
          onClickAction: i.a.func,
          type: i.a.string,
          value: i.a.string,
          loading: i.a.bool,
          loadText: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = s);
    },
    693: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        i = n.n(o),
        s = function(e) {
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
      (s.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (s.propTypes = {
          buttonClassName: i.a.string,
          iconName: i.a.string.isRequired,
          onClickAction: i.a.func,
          title: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = s);
    },
    699: function(e, t, n) {
      "use strict";
      var a = n(24),
        r = n.n(a),
        o = n(25),
        i = n.n(o),
        s = n(22),
        c = n.n(s),
        l = n(26),
        u = n.n(l),
        d = n(27),
        p = n.n(d),
        f = n(16),
        m = n.n(f),
        v = n(6),
        h = n.n(v),
        y = n(0),
        b = n.n(y),
        g = n(8),
        E = n.n(g),
        N = n(707),
        w = n.n(N),
        C = n(708),
        I = n.n(C),
        O = n(7),
        D = n.n(O);
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
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      D.a.locale("nl");
      var R = (function(e) {
        u()(n, e);
        var t = T(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            (a = t.call(this, e)),
            h()(c()(a), "validateDate", function(e) {
              var t = D()(e.target.value, "DD-MM-YYYY", !0),
                n = !1;
              t.isValid() || "" === e.target.value || (n = !0),
                a.props.disabledBefore &&
                  t.isBefore(a.props.disabledBefore) &&
                  (n = !0),
                a.props.disabledAfter &&
                  t.isAfter(a.props.disabledAfter) &&
                  (n = !0),
                a.setState({ errorDateFormat: n });
            }),
            h()(c()(a), "onDateChange", function(e) {
              var t = e ? D()(e).format("Y-MM-DD") : "",
                n = !1;
              t &&
                a.props.disabledBefore &&
                D()(t).isBefore(a.props.disabledBefore) &&
                (n = !0),
                t &&
                  a.props.disabledAfter &&
                  D()(t).isAfter(a.props.disabledAfter) &&
                  (n = !0),
                a.setState({ errorDateFormat: n }),
                !n && a.props.onChangeAction(t, a.props.name);
            }),
            (a.state = { errorDateFormat: !1 }),
            a
          );
        }
        return (
          i()(n, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.label,
                  n = e.className,
                  a = e.size,
                  r = e.divSize,
                  o = e.id,
                  i = e.value,
                  s = e.required,
                  c = e.readOnly,
                  l = e.name,
                  u = e.error,
                  d = e.errorMessage,
                  p = e.disabledBefore,
                  f = e.disabledAfter,
                  m = i ? D()(i).format("L") : "",
                  v = {};
                return (
                  p && (v.before = new Date(p)),
                  f && (v.after = new Date(f)),
                  b.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    b.a.createElement(
                      "div",
                      null,
                      b.a.createElement(
                        "label",
                        { htmlFor: o, className: "col-sm-6 ".concat(s) },
                        t
                      )
                    ),
                    b.a.createElement(
                      "div",
                      { className: "".concat(a) },
                      b.a.createElement(w.a, {
                        id: o,
                        value: m,
                        formatDate: C.formatDate,
                        parseDate: C.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: I.a,
                          disabledDays: v
                        },
                        inputProps: {
                          className:
                            "form-control input-sm ".concat(n) +
                            (this.state.errorDateFormat || u
                              ? " has-error"
                              : ""),
                          name: l,
                          onBlur: this.validateDate,
                          autoComplete: "off",
                          readOnly: c,
                          disabled: c
                        },
                        required: s,
                        readOnly: c,
                        placeholder: ""
                      })
                    ),
                    u &&
                      b.a.createElement(
                        "div",
                        { className: "col-sm-offset-6 col-sm-6" },
                        b.a.createElement(
                          "span",
                          { className: "has-error-message" },
                          " ",
                          d
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
      (R.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        required: "",
        readOnly: !1,
        value: null,
        error: !1,
        errorMessage: "",
        disabledBefore: null,
        disabledAfter: null
      }),
        (R.propTypes = {
          label: E.a.string.isRequired,
          type: E.a.string,
          className: E.a.string,
          size: E.a.string,
          divSize: E.a.string,
          id: E.a.string,
          name: E.a.string,
          value: E.a.oneOfType([E.a.string, E.a.object]),
          onChangeAction: E.a.func,
          required: E.a.string,
          readOnly: E.a.bool,
          error: E.a.bool,
          errorMessage: E.a.string,
          disabledBefore: E.a.string,
          disabledAfter: E.a.string
        }),
        (t.a = R);
    },
    711: function(e, t) {
      e.exports = function(e, t, n, a) {
        var r = new Blob(void 0 !== a ? [a, e] : [e], {
          type: n || "application/octet-stream"
        });
        if (void 0 !== window.navigator.msSaveBlob)
          window.navigator.msSaveBlob(r, t);
        else {
          var o =
              window.URL && window.URL.createObjectURL
                ? window.URL.createObjectURL(r)
                : window.webkitURL.createObjectURL(r),
            i = document.createElement("a");
          (i.style.display = "none"),
            (i.href = o),
            i.setAttribute("download", t),
            void 0 === i.download && i.setAttribute("target", "_blank"),
            document.body.appendChild(i),
            i.click(),
            setTimeout(function() {
              document.body.removeChild(i), window.URL.revokeObjectURL(o);
            }, 200);
        }
      };
    },
    731: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        i = n.n(o),
        s = n(775),
        c = n.n(s),
        l = function(e) {
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
      l.propTypes = {
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
      var p = function(e) {
        var t = e.page,
          n = e.pages,
          a = e.handlePrevClick,
          o = e.handleNextClick;
        return r.a.createElement(
          "div",
          { className: "customWrapper" },
          r.a.createElement(l, { page: t, pages: n, handlePrevClick: a }),
          r.a.createElement(d, { page: t, pages: n }),
          r.a.createElement(u, { page: t, pages: n, handleNextClick: o })
        );
      };
      p.propTypes = {
        page: i.a.number.isRequired,
        pages: i.a.number.isRequired,
        handlePrevClick: i.a.func.isRequired,
        handleNextClick: i.a.func.isRequired
      };
      var f = p;
      (c.a.defaultProps = { file: "", scale: 1 }),
        (c.a.propTypes = { file: i.a.string, scale: i.a.number });
      t.a = function(e) {
        var t = e.file,
          n = e.scale;
        return r.a.createElement(
          "div",
          { className: "panel-heading" },
          r.a.createElement(c.a, {
            document: { file: t },
            navigation: f,
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
        s = n(8),
        c = n.n(s),
        l = n(690),
        u = n(692),
        d = function(e) {
          var t = e.label,
            n = e.className,
            a = e.id,
            o = e.value,
            s = e.switchToEdit;
          return r.a.createElement(
            "div",
            { className: n },
            r.a.createElement(
              "label",
              { htmlFor: a, className: "col-sm-3" },
              t,
              s
                ? r.a.createElement(
                    "span",
                    null,
                    r.a.createElement("br", null),
                    r.a.createElement(u.a, {
                      buttonClassName: "btn-success btn-padding-small",
                      buttonText: "Wijzig",
                      onClickAction: s
                    })
                  )
                : ""
            ),
            r.a.createElement(
              l.a,
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
          label: c.a.string.isRequired,
          className: c.a.string,
          id: c.a.string,
          value: c.a.oneOfType([c.a.string, c.a.number])
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
        s = u(n(103)),
        c = u(n(8)),
        l = u(n(741));
      function u(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var d,
        p = "undefined" != typeof window && window.console,
        f = function() {},
        m = f,
        v = f;
      p &&
        ((d = console.error),
        (m = function() {
          console.error = function(e) {
            /<head>/.test(e) || d.call(console, e);
          };
        }),
        (v = function() {
          return (console.error = d);
        }));
      var h = (function(e) {
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
                e && t && s.default.unmountComponentAtNode(t);
              }
            },
            {
              key: "getDoc",
              value: function() {
                return s.default.findDOMNode(this).contentDocument;
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
                        l.default,
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
                      m();
                    var r = n
                        ? this.props.contentDidMount
                        : this.props.contentDidUpdate,
                      o = this.getMountTarget();
                    s.default.unstable_renderSubtreeIntoContainer(
                      this,
                      a,
                      o,
                      r
                    ),
                      v();
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
      (h.propTypes = {
        style: c.default.object,
        head: c.default.node,
        initialContent: c.default.string,
        mountTarget: c.default.string,
        contentDidMount: c.default.func,
        contentDidUpdate: c.default.func,
        children: c.default.oneOfType([
          c.default.element,
          c.default.arrayOf(c.default.element)
        ])
      }),
        (h.defaultProps = {
          style: {},
          head: null,
          children: void 0,
          mountTarget: void 0,
          contentDidMount: function() {},
          contentDidUpdate: function() {},
          initialContent:
            '<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'
        }),
        (t.default = h);
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
      function s(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function c(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      var l = (function(e) {
        function t() {
          return (
            s(this, t),
            c(
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
      (l.propTypes = {
        document: o.default.object.isRequired,
        window: o.default.object.isRequired,
        children: o.default.element.isRequired
      }),
        (l.childContextTypes = {
          document: o.default.object.isRequired,
          window: o.default.object.isRequired
        }),
        (t.default = l);
    },
    748: function(e, t, n) {
      "use strict";
      n.d(t, "d", function() {
        return a;
      }),
        n.d(t, "e", function() {
          return r;
        }),
        n.d(t, "a", function() {
          return o;
        }),
        n.d(t, "c", function() {
          return i;
        }),
        n.d(t, "b", function() {
          return s;
        });
      var a = function(e) {
          return { type: "FETCH_ADMINISTRATION_DETAILS", id: e };
        },
        r = function(e, t, n) {
          return {
            type: "UPDATE_ADMINISTRATION",
            administration: e,
            administrationId: t,
            switchToView: n
          };
        },
        o = function(e) {
          return { type: "ADD_ADMINISTRATION_USER", administrationUser: e };
        },
        i = function(e, t) {
          return {
            type: "DELETE_ADMINISTRATION_USER",
            administrationId: e,
            userId: t
          };
        },
        s = function(e) {
          return { type: "DELETE_ADMINISTRATION_SEPA", sepaId: e };
        };
    },
    779: function(e, t) {},
    780: function(e, t) {},
    781: function(e, t) {},
    782: function(e, t) {},
    783: function(e, t) {},
    807: function(e, t, n) {
      "use strict";
      n.d(t, "d", function() {
        return a;
      }),
        n.d(t, "e", function() {
          return r;
        }),
        n.d(t, "b", function() {
          return o;
        }),
        n.d(t, "a", function() {
          return i;
        }),
        n.d(t, "c", function() {
          return s;
        });
      var a = function(e, t, n, a, r, o) {
          return {
            type: "FETCH_INVOICES",
            filters: e,
            sorts: t,
            pagination: n,
            administrationId: a,
            onlyEmailInvoices: r,
            onlyPostInvoices: o
          };
        },
        r = function(e) {
          return { type: "INVOICE_PREVIEW_SEND", data: e };
        },
        o = function() {
          return { type: "CLEAR_INVOICE_PREVIEW_SEND" };
        },
        i = function() {
          return { type: "CLEAR_INVOICES" };
        },
        s = function(e) {
          return { type: "DELETE_INVOICE_FROM_GRID", id: e };
        };
    }
  }
]);
