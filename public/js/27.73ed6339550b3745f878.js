(window.webpackJsonp = window.webpackJsonp || []).push([
  [27],
  {
    1430: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        i = a(25),
        o = a.n(i),
        c = a(26),
        l = a.n(c),
        s = a(27),
        u = a.n(s),
        d = a(16),
        m = a.n(d),
        p = a(0),
        h = a.n(p),
        f = a(32),
        v = a(22),
        g = a.n(v),
        y = a(6),
        b = a.n(y),
        E = a(4),
        N = a(693),
        C = a(100),
        w = a(879),
        D = Object(f.b)(null, function(e) {
          return {
            deleteProduct: function(t) {
              e(Object(w.b)(t));
            }
          };
        })(function(e) {
          return h.a.createElement(
            C.a,
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
            h.a.createElement("strong", null, e.name),
            "?"
          );
        });
      function k(e) {
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
          var a,
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var P = (function(e) {
          l()(a, e);
          var t = k(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              b()(g()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              (n.state = { showDelete: !1 }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      h.a.createElement(
                        "div",
                        {
                          className: "btn-group btn-group-flex margin-small",
                          role: "group"
                        },
                        h.a.createElement(N.a, {
                          iconName: "glyphicon-arrow-left",
                          onClickAction: E.e.goBack
                        }),
                        h.a.createElement(N.a, {
                          iconName: "glyphicon-trash",
                          onClickAction: this.toggleDelete
                        })
                      )
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      h.a.createElement(
                        "h4",
                        { className: "text-center" },
                        "Product: ",
                        this.props.name
                      )
                    ),
                    h.a.createElement("div", { className: "col-md-4" }),
                    this.state.showDelete &&
                      h.a.createElement(D, {
                        closeDeleteItemModal: this.toggleDelete,
                        name: this.props.name,
                        id: this.props.id
                      })
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        T = Object(f.b)(function(e) {
          return { name: e.productDetails.name, id: e.productDetails.id };
        }, null)(P),
        O = a(198),
        S = a(795),
        I = a(697),
        j = a.n(I),
        R = a(694),
        A = a(692),
        q = a(690),
        x = a(691),
        F = a(696);
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
          var a,
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var V = (function(e) {
          l()(a, e);
          var t = M(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              b()(g()(n), "confirmAction", function(e) {
                n.props.updateProduct(n.props.product, n.props.switchToView),
                  n.props.closeModal();
              }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    C.a,
                    {
                      modalClassName: "modal-lg",
                      closeModal: this.props.closeModal,
                      confirmAction: this.confirmAction,
                      title: "Product wijzigen",
                      buttonConfirmText: "Opslaan"
                    },
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(
                        "div",
                        { className: "col-sm-12 margin-10-bottom" },
                        h.a.createElement(
                          "span",
                          null,
                          "Let op. Een wijziging in een product kan grote gevolgen hebben op je lopende facturering. Dus bedenk goed wat je wilt voordat je een wijziging doorvoert."
                        )
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        L = Object(f.b)(null, function(e) {
          return {
            updateProduct: function(t, a) {
              e(
                (function(e, t) {
                  return {
                    type: "UPDATE_PRODUCT",
                    product: e,
                    switchToView: t
                  };
                })(t, a)
              );
            }
          };
        })(V),
        B = a(709);
      function _(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, n);
        }
        return a;
      }
      function H(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? _(Object(a), !0).forEach(function(t) {
                b()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : _(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function z(e) {
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
          var a,
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var W = (function(e) {
          l()(a, e);
          var t = z(a);
          function a(e) {
            var n;
            r()(this, a),
              (n = t.call(this, e)),
              b()(g()(n), "handleInputChangeDuration", function(e) {
                var t,
                  a = e.target,
                  r = "checkbox" === a.type ? a.checked : a.value,
                  i = a.name,
                  o = n.state.product.invoiceFrequencyId,
                  c = n.state.invoiceFrequencies;
                switch (r) {
                  case "none":
                    (c = [{ id: "once", name: "Eenmalig" }]), (o = "once");
                    break;
                  case "month":
                    (c = [
                      { id: "once", name: "Eenmalig" },
                      { id: "monthly", name: "Maand" }
                    ]),
                      ("quarterly" !== o &&
                        "yearly" !== o &&
                        "half-year" !== o) ||
                        (o = "monthly");
                    break;
                  case "quarter":
                    (c = [
                      { id: "once", name: "Eenmalig" },
                      { id: "monthly", name: "Maand" },
                      { id: "quarterly", name: "Kwartaal" }
                    ]),
                      ("yearly" !== o && "half-year" !== o) ||
                        (o = "quarterly");
                    break;
                  case "half_year":
                    (c = [
                      { id: "once", name: "Eenmalig" },
                      { id: "monthly", name: "Maand" },
                      { id: "quarterly", name: "Kwartaal" },
                      { id: "half-year", name: "Half jaar" }
                    ]),
                      "yearly" === o && (o = "half-year");
                    break;
                  default:
                    c = [
                      { id: "once", name: "Eenmalig" },
                      { id: "monthly", name: "Maand" },
                      { id: "quarterly", name: "Kwartaal" },
                      { id: "half-year", name: "Half jaar" },
                      { id: "yearly", name: "Jaar" }
                    ];
                }
                n.setState(
                  H(
                    H({}, n.state),
                    {},
                    {
                      invoiceFrequencies: c,
                      product: H(
                        H({}, n.state.product),
                        {},
                        ((t = {}),
                        b()(t, i, r),
                        b()(t, "invoiceFrequencyId", o),
                        t)
                      )
                    }
                  )
                );
              }),
              b()(g()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  H(
                    H({}, n.state),
                    {},
                    { product: H(H({}, n.state.product), {}, b()({}, r, a)) }
                  )
                );
              }),
              b()(g()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.product,
                  a = {},
                  r = !1,
                  i = !1,
                  o = !1;
                n.props.products.map(function(e) {
                  return e.code == t.code && (o = !0);
                }),
                  o &&
                    t.code !== n.state.oldCode &&
                    ((r = "Productcode moet uniek zijn."),
                    (a.code = !0),
                    (i = !0)),
                  j.a.isEmpty(t.code + "") && ((a.code = !0), (i = !0));
                var c = !1;
                n.props.products.map(function(e) {
                  return e.name == t.name && (c = !0);
                }),
                  c &&
                    t.name !== n.state.oldName &&
                    ((r = "Productnaam moet uniek zijn."),
                    (a.name = !0),
                    (i = !0)),
                  o &&
                    c &&
                    t.code !== n.state.oldCode &&
                    t.name !== n.state.oldName &&
                    (r = "Productcode en productnaam moeten uniek zijn."),
                  j.a.isEmpty(t.name + "") && ((a.name = !0), (i = !0)),
                  j.a.isEmpty(t.administrationId + "") &&
                    ((a.administrationId = !0), (i = !0)),
                  n.setState(
                    H(H({}, n.state), {}, { errors: a, errorMessage: r })
                  ),
                  i || n.toggleShowConfirm();
              }),
              b()(g()(n), "toggleShowConfirm", function() {
                n.setState({ showConfirm: !n.state.showConfirm });
              });
            var i = e.productDetails,
              o = i.id,
              c = i.code,
              l = i.name,
              s = i.invoiceText,
              u = i.durationId,
              d = i.invoiceFrequencyId,
              m = i.paymentTypeId,
              p = i.administrationId,
              h = i.ledgerId,
              f = i.costCenterId;
            return (
              (n.state = {
                invoiceFrequencies: [{ id: "once", name: "Eenmalig" }],
                showConfirm: !1,
                errorMessage: !1,
                oldCode: c || "",
                oldName: l || "",
                product: {
                  id: o,
                  code: c || "",
                  name: l || "",
                  invoiceText: s || "",
                  durationId: u || "none",
                  invoiceFrequencyId: d || "once",
                  paymentTypeId: m || "",
                  administrationId: p || "",
                  ledgerId: h || "",
                  costCenterId: f || ""
                },
                errors: { code: !1, name: !1, administrationId: !1 }
              }),
              (n.handleReactSelectChange = n.handleReactSelectChange.bind(
                g()(n)
              )),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this.state.invoiceFrequencies,
                    t = this.state.product.invoiceFrequencyId;
                  switch (this.state.product.durationId) {
                    case "none":
                      (e = [{ id: "once", name: "Eenmalig" }]), (t = "once");
                      break;
                    case "month":
                      (e = [
                        { id: "once", name: "Eenmalig" },
                        { id: "monthly", name: "Maand" }
                      ]),
                        ("quarterly" !== t &&
                          "yearly" !== t &&
                          "half-year" !== t) ||
                          (t = "monthly");
                      break;
                    case "quarter":
                      (e = [
                        { id: "once", name: "Eenmalig" },
                        { id: "monthly", name: "Maand" },
                        { id: "quarterly", name: "Kwartaal" }
                      ]),
                        ("yearly" !== t && "half-year" !== t) ||
                          (t = "quarterly");
                      break;
                    case "half_year":
                      (e = [
                        { id: "once", name: "Eenmalig" },
                        { id: "monthly", name: "Maand" },
                        { id: "quarterly", name: "Kwartaal" },
                        { id: "half-year", name: "Half jaar" }
                      ]),
                        "yearly" === t && (t = "half-year");
                      break;
                    default:
                      e = [
                        { id: "once", name: "Eenmalig" },
                        { id: "monthly", name: "Maand" },
                        { id: "quarterly", name: "Kwartaal" },
                        { id: "half-year", name: "Half jaar" },
                        { id: "yearly", name: "Jaar" }
                      ];
                  }
                  this.setState(
                    H(
                      H({}, this.state),
                      {},
                      {
                        invoiceFrequencies: e,
                        product: H(
                          H({}, this.state.product),
                          {},
                          { invoiceFrequencyId: t }
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "handleReactSelectChange",
                value: function(e, t) {
                  this.setState(
                    H(
                      H({}, this.state),
                      {},
                      {
                        product: H(H({}, this.state.product), {}, b()({}, t, e))
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.product,
                    t = e.code,
                    a = e.name,
                    n = e.invoiceText,
                    r = e.durationId,
                    i = e.invoiceFrequencyId,
                    o = e.paymentTypeId,
                    c = e.administrationId,
                    l = e.ledgerId,
                    s = e.costCenterId,
                    u = this.props.ledgers,
                    d = this.props.productDetails.currentPrice;
                  return (
                    this.props.usesTwinfield &&
                      d &&
                      (u = this.props.ledgers.filter(function(e) {
                        return e.vatCode
                          ? e.vatCode.percentage === d.vatPercentage
                          : e.vatCode === d.vatPercentage;
                      })),
                    h.a.createElement(
                      "form",
                      {
                        className: "form-horizontal",
                        onSubmit: this.handleSubmit
                      },
                      h.a.createElement(
                        q.a,
                        null,
                        h.a.createElement(
                          x.a,
                          null,
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(R.a, {
                              label: "Productcode",
                              name: "code",
                              value: t,
                              onChangeAction: this.handleInputChange,
                              required: "required",
                              error: this.state.errors.code
                            }),
                            h.a.createElement(R.a, {
                              label: "Naam",
                              name: "name",
                              value: a,
                              onChangeAction: this.handleInputChange,
                              required: "required",
                              error: this.state.errors.name
                            })
                          ),
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(
                              "div",
                              { className: "form-group col-sm-12" },
                              h.a.createElement(
                                "div",
                                { className: "row" },
                                h.a.createElement(
                                  "div",
                                  { className: "col-sm-3" },
                                  h.a.createElement(
                                    "label",
                                    {
                                      htmlFor: "invoiceText",
                                      className: "col-sm-12"
                                    },
                                    "Omschrijving"
                                  )
                                ),
                                h.a.createElement(
                                  "div",
                                  { className: "col-sm-8" },
                                  h.a.createElement("textarea", {
                                    name: "invoiceText",
                                    value: n,
                                    onChange: this.handleInputChange,
                                    className: "form-control input-sm"
                                  })
                                )
                              )
                            )
                          ),
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(F.a, {
                              label: "Looptijd",
                              id: "durationId",
                              name: "durationId",
                              options: this.props.productDurations,
                              value: r,
                              onChangeAction: this.handleInputChangeDuration,
                              emptyOption: !1
                            }),
                            h.a.createElement(F.a, {
                              label: "Prijs per",
                              id: "invoiceFrequencyId",
                              name: "invoiceFrequencyId",
                              options: this.state.invoiceFrequencies,
                              value: i,
                              onChangeAction: this.handleInputChange,
                              emptyOption: !1
                            })
                          ),
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(F.a, {
                              label: "Betaalwijze",
                              id: "paymentTypeId",
                              name: "paymentTypeId",
                              options: this.props.productPaymentTypes,
                              value: o,
                              onChangeAction: this.handleInputChange
                            }),
                            h.a.createElement(F.a, {
                              label: "Administratie",
                              id: "administrationId",
                              name: "administrationId",
                              options: this.props.administrations,
                              value: c,
                              onChangeAction: this.handleInputChange,
                              required: "required",
                              error: this.state.errors.administrationId
                            })
                          ),
                          this.props.usesTwinfield
                            ? h.a.createElement(
                                "div",
                                { className: "row" },
                                h.a.createElement(B.a, {
                                  label: "Grootboek",
                                  name: "ledgerId",
                                  options: u,
                                  optionName: "description",
                                  value: l,
                                  onChangeAction: this.handleReactSelectChange,
                                  multi: !1
                                }),
                                h.a.createElement(B.a, {
                                  label: "Kostenplaats",
                                  name: "costCenterId",
                                  options: this.props.costCenters,
                                  optionName: "description",
                                  value: s,
                                  onChangeAction: this.handleReactSelectChange,
                                  multi: !1
                                })
                              )
                            : null,
                          this.state.errorMessage &&
                            h.a.createElement(
                              "div",
                              {
                                className:
                                  "col-sm-10 col-md-offset-1 alert alert-danger"
                              },
                              this.state.errorMessage
                            )
                        ),
                        h.a.createElement(
                          x.a,
                          null,
                          h.a.createElement(
                            "div",
                            {
                              className: "pull-right btn-group",
                              role: "group"
                            },
                            h.a.createElement(A.a, {
                              buttonClassName: "btn-default",
                              buttonText: "Sluiten",
                              onClickAction: this.props.switchToView
                            }),
                            h.a.createElement(A.a, {
                              buttonText: "Opslaan",
                              onClickAction: this.handleSubmit,
                              type: "submit",
                              value: "Submit"
                            })
                          )
                        )
                      ),
                      this.state.showConfirm &&
                        h.a.createElement(L, {
                          product: this.state.product,
                          closeModal: this.toggleShowConfirm,
                          switchToView: this.props.switchToView
                        })
                    )
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        U = Object(f.b)(function(e) {
          return {
            productDurations: e.systemData.productDurations,
            productInvoiceFrequencies: e.systemData.productInvoiceFrequencies,
            productPaymentTypes: e.systemData.productPaymentTypes,
            productDetails: e.productDetails,
            administrations: e.meDetails.administrations,
            products: e.systemData.products,
            ledgers: e.systemData.ledgers,
            costCenters: e.systemData.costCenters,
            usesTwinfield: e.systemData.usesTwinfield
          };
        }, null)(W),
        X = a(695),
        G = Object(f.b)(function(e) {
          return {
            productDetails: e.productDetails,
            usesTwinfield: e.systemData.usesTwinfield
          };
        })(function(e) {
          var t = e.productDetails,
            a = t.code,
            n = t.name,
            r = t.invoiceText,
            i = t.duration,
            o = t.invoiceFrequency,
            c = t.paymentType,
            l = t.administration,
            s = t.ledger,
            u = t.costCenter;
          return h.a.createElement(
            "div",
            { onClick: e.switchToEdit },
            h.a.createElement(
              q.a,
              null,
              h.a.createElement(
                x.a,
                null,
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(X.a, { label: "Productcode", value: a }),
                  h.a.createElement(X.a, { label: "Product", value: n })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(
                    "div",
                    { className: "col-sm-3" },
                    h.a.createElement(
                      "label",
                      { htmlFor: "invoiceText", className: "col-sm-12" },
                      "Omschrijving"
                    )
                  ),
                  h.a.createElement(
                    "div",
                    { className: "col-sm-9", id: "invoiceText" },
                    r
                  )
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(X.a, {
                    label: "Looptijd",
                    value: i ? i.name : ""
                  }),
                  h.a.createElement(X.a, {
                    label: "Prijs per",
                    value: o ? o.name : ""
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(X.a, {
                    label: "Betaalwijze",
                    value: c ? c.name : ""
                  }),
                  h.a.createElement(X.a, {
                    label: "Administratie",
                    value: l ? l.name : ""
                  })
                ),
                e.usesTwinfield
                  ? h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(X.a, {
                        label: "Grootboek",
                        value: s ? s.description : ""
                      }),
                      h.a.createElement(X.a, {
                        label: "Kostenplaats",
                        value: u ? u.description : ""
                      })
                    )
                  : null
              )
            )
          );
        });
      function K(e) {
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
          var a,
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var Y = (function(e) {
          l()(a, e);
          var t = K(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              b()(g()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              b()(g()(n), "switchToView", function() {
                n.setState({ showEdit: !1, activeDiv: "" });
              }),
              (n.state = { showEdit: !1, activeDiv: "" }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "onDivEnter",
                value: function() {
                  this.setState({ activeDiv: "panel-grey" });
                }
              },
              {
                key: "onDivLeave",
                value: function() {
                  this.state.showEdit || this.setState({ activeDiv: "" });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.meDetails.permissions,
                    a = void 0 === t ? {} : t;
                  return h.a.createElement(
                    "div",
                    {
                      className: this.state.activeDiv,
                      onMouseEnter: function() {
                        return e.onDivEnter();
                      },
                      onMouseLeave: function() {
                        return e.onDivLeave();
                      }
                    },
                    this.state.showEdit && a.manageFinancial
                      ? h.a.createElement(U, {
                          switchToView: this.switchToView
                        })
                      : h.a.createElement(G, {
                          switchToEdit: this.switchToEdit
                        })
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        J = Object(f.b)(function(e) {
          return { productDetails: e.productDetails, meDetails: e.meDetails };
        })(Y),
        Q = a(7),
        Z = a.n(Q),
        $ = Object(f.b)(function(e) {
          return {
            currentPrice: e.productDetails.currentPrice,
            productHasVariablePrice: e.productDetails.hasVariablePrice
          };
        })(function(e) {
          var t = e.price,
            a = t.id,
            n = t.dateStart,
            r = t.price,
            i = t.vatPercentage,
            o = t.priceInclVat;
          return h.a.createElement(
            "div",
            {
              className: "row border ".concat(e.highlightLine),
              onMouseEnter: function() {
                return e.onLineEnter();
              },
              onMouseLeave: function() {
                return e.onLineLeave();
              }
            },
            h.a.createElement(
              "div",
              { className: "col-sm-3" },
              " ",
              n ? Z()(n).format("L") : ""
            ),
            "variable" === e.productHasVariablePrice
              ? h.a.createElement("div", { className: "col-sm-3" }, "Variabel")
              : h.a.createElement(
                  "div",
                  { className: "col-sm-3" },
                  r
                    ? "€" +
                        r.toLocaleString("nl", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })
                    : ""
                ),
            h.a.createElement(
              "div",
              { className: "col-sm-2" },
              null !== i ? i : "Geen"
            ),
            "variable" === e.productHasVariablePrice
              ? h.a.createElement("div", { className: "col-sm-2" }, "Variabel")
              : h.a.createElement(
                  "div",
                  { className: "col-sm-2" },
                  o
                    ? "€" +
                        o.toLocaleString("nl", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })
                    : ""
                ),
            h.a.createElement(
              "div",
              { className: "col-sm-2" },
              e.currentPrice && a === e.currentPrice.id ? "Ja" : ""
            )
          );
        });
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
          var a,
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var te = (function(e) {
          l()(a, e);
          var t = ee(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              b()(g()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              b()(g()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              (n.state = {
                showActionButtons: !1,
                highlightLine: "",
                showDelete: !1,
                price: e.price
              }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    "div",
                    null,
                    h.a.createElement($, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      toggleDelete: this.toggleDelete,
                      price: this.state.price
                    })
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        ae = Object(f.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(te),
        ne = Object(f.b)(function(e) {
          return { priceHistory: e.productDetails.priceHistory };
        })(function(e) {
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "row border header" },
              h.a.createElement("div", { className: "col-sm-3" }, "Startdatum"),
              h.a.createElement(
                "div",
                { className: "col-sm-3" },
                "Prijs excl. BTW"
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-2" },
                "BTW percentage"
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Prijs incl. BTW"
              ),
              h.a.createElement("div", { className: "col-sm-2" }, "Actief")
            ),
            e.priceHistory.length > 0
              ? e.priceHistory.map(function(e) {
                  return h.a.createElement(ae, { key: e.id, price: e });
                })
              : h.a.createElement("div", null, "Geen prijshistorie bekend.")
          );
        }),
        re = a(699),
        ie = a(700);
      function oe(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, n);
        }
        return a;
      }
      function ce(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? oe(Object(a), !0).forEach(function(t) {
                b()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : oe(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function le(e) {
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
          var a,
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var se = (function(e) {
          l()(a, e);
          var t = le(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              b()(g()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  ce(
                    ce({}, n.state),
                    {},
                    {
                      priceHistory: ce(
                        ce({}, n.state.priceHistory),
                        {},
                        b()({}, r, a)
                      )
                    }
                  ),
                  n.updatePrice
                );
              }),
              b()(g()(n), "handleInputChangeDate", function(e, t) {
                n.setState(
                  ce(
                    ce({}, n.state),
                    {},
                    {
                      priceHistory: ce(
                        ce({}, n.state.priceHistory),
                        {},
                        b()({}, t, e)
                      )
                    }
                  )
                );
              }),
              b()(g()(n), "handleBlurProductPrice", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  ce(
                    ce({}, n.state),
                    {},
                    {
                      priceHistory: ce(
                        ce({}, n.state.priceHistory),
                        {},
                        b()({}, r, parseFloat(a).toFixed(2))
                      )
                    }
                  )
                );
              }),
              b()(g()(n), "updatePrice", function() {
                var e =
                    !!n.state.priceHistory.inputInclVat &&
                    n.state.priceHistory.inputInclVat,
                  t = j.a.isFloat(n.state.priceHistory.price + "")
                    ? n.state.priceHistory.price
                    : 0,
                  a = j.a.isFloat(n.state.priceHistory.priceInclVat + "")
                    ? n.state.priceHistory.priceInclVat
                    : 0,
                  r = j.a.isFloat(n.state.priceHistory.vatPercentage + "")
                    ? n.state.priceHistory.vatPercentage
                    : 0,
                  i = (parseFloat(100) + parseFloat(r)) / 100;
                e
                  ? ((t = a / i),
                    n.setState(
                      ce(
                        ce({}, n.state),
                        {},
                        {
                          priceHistory: ce(
                            ce({}, n.state.priceHistory),
                            {},
                            { price: parseFloat(t).toFixed(2) }
                          )
                        }
                      )
                    ))
                  : ((a = t * i),
                    n.setState(
                      ce(
                        ce({}, n.state),
                        {},
                        {
                          priceHistory: ce(
                            ce({}, n.state.priceHistory),
                            {},
                            { priceInclVat: parseFloat(a).toFixed(2) }
                          )
                        }
                      )
                    ));
              }),
              (n.state = {
                priceHistory: {
                  productId: e.productId,
                  dateStart: "",
                  inputInclVat: !1,
                  price: "",
                  priceInclVat: "",
                  vatPercentage: e.ledger
                    ? e.ledger.vatCode && e.ledger.vatCode.percentage
                    : null,
                  hasVariablePrice: "variable" === e.hasVariablePrice
                },
                errors: { dateStart: !1, price: !1, priceInclVat: !1 }
              }),
              (n.handleInputChange = n.handleInputChange.bind(g()(n))),
              (n.handleSubmit = n.handleSubmit.bind(g()(n))),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "handleSubmit",
                value: function(e) {
                  e.preventDefault();
                  var t = this.state.priceHistory,
                    a = {},
                    n = !1;
                  j.a.isEmpty(t.dateStart) && ((a.dateStart = !0), (n = !0)),
                    t.hasVariablePrice ||
                      (t.inputInclVat
                        ? j.a.isEmpty(t.priceInclVat) &&
                          ((a.priceInclVat = !0), (n = !0))
                        : j.a.isEmpty(t.price) && ((a.price = !0), (n = !0))),
                    this.setState(ce(ce({}, this.state), {}, { errors: a })),
                    n ||
                      (this.props.addProductPriceHistory(t),
                      this.props.toggleShowNew());
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.priceHistory,
                    t = e.dateStart,
                    a = e.inputInclVat,
                    n = e.price,
                    r = e.priceInclVat,
                    i = e.vatPercentage,
                    o = e.hasVariablePrice;
                  return h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      q.a,
                      { className: "panel-grey" },
                      h.a.createElement(
                        x.a,
                        null,
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          "none" === this.props.hasVariablePrice &&
                            h.a.createElement(ie.a, {
                              label: "Variabele prijs",
                              name: "hasVariablePrice",
                              value: o,
                              onChangeAction: this.handleInputChange
                            })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(R.a, {
                            label: "Product",
                            id: "name",
                            name: "name",
                            value: this.props.productName,
                            readOnly: !0
                          }),
                          h.a.createElement(re.a, {
                            label: "Startdatum",
                            name: "dateStart",
                            value: t,
                            onChangeAction: this.handleInputChangeDate,
                            required: "required",
                            error: this.state.errors.dateStart
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(ie.a, {
                            label: "Invoer inclusief BTW",
                            name: "inputInclVat",
                            value: a,
                            onChangeAction: this.handleInputChange
                          }),
                          h.a.createElement(F.a, {
                            label: "BTW percentage",
                            name: "vatPercentage",
                            options: this.props.vatCodes,
                            optionValue: "percentage",
                            optionName: "description",
                            value: i,
                            onChangeAction: this.props.usesTwinfield
                              ? null
                              : this.handleInputChange,
                            placeholder: "Geen",
                            readOnly: this.props.usesTwinfield
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          "variable" === this.props.hasVariablePrice || o
                            ? h.a.createElement(
                                h.a.Fragment,
                                null,
                                h.a.createElement(R.a, {
                                  label: "Prijs excl. BTW",
                                  id: "price",
                                  name: "price",
                                  value: "Variabel",
                                  readOnly: !0,
                                  required: "required"
                                }),
                                h.a.createElement(R.a, {
                                  label: "Prijs incl. BTW",
                                  id: "priceInclVat",
                                  name: "priceInclVat",
                                  value: "Variabel",
                                  readOnly: !0,
                                  required: "required"
                                })
                              )
                            : h.a.createElement(
                                h.a.Fragment,
                                null,
                                a
                                  ? h.a.createElement(
                                      h.a.Fragment,
                                      null,
                                      h.a.createElement(R.a, {
                                        label: "Prijs excl. BTW",
                                        id: "price",
                                        name: "price",
                                        value: n,
                                        readOnly: !0,
                                        required: "required"
                                      }),
                                      h.a.createElement(R.a, {
                                        label: "Prijs incl. BTW",
                                        id: "priceInclVat",
                                        name: "priceInclVat",
                                        type: "number",
                                        min: "0",
                                        max: "1000000",
                                        step: "0.01",
                                        value: r,
                                        onChangeAction: this.handleInputChange,
                                        onBlurAction: this
                                          .handleBlurProductPrice,
                                        required: "required",
                                        error: this.state.errors.priceInclVat
                                      })
                                    )
                                  : h.a.createElement(
                                      h.a.Fragment,
                                      null,
                                      h.a.createElement(R.a, {
                                        label: "Prijs excl. BTW",
                                        id: "price",
                                        name: "price",
                                        type: "number",
                                        min: "0",
                                        max: "1000000",
                                        step: "0.01",
                                        value: n,
                                        onChangeAction: this.handleInputChange,
                                        onBlurAction: this
                                          .handleBlurProductPrice,
                                        required: "required",
                                        error: this.state.errors.price
                                      }),
                                      h.a.createElement(R.a, {
                                        label: "Prijs incl. BTW",
                                        id: "priceInclVat",
                                        name: "priceInclVat",
                                        value: r,
                                        readOnly: !0,
                                        required: "required"
                                      })
                                    )
                              )
                        ),
                        h.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          h.a.createElement(A.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          h.a.createElement(A.a, {
                            buttonText: "Opslaan",
                            onClickAction: this.handleSubmit,
                            type: "submit",
                            value: "Submit"
                          })
                        )
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        ue = Object(f.b)(
          function(e) {
            return {
              productId: e.productDetails.id,
              productName: e.productDetails.name,
              hasVariablePrice: e.productDetails.hasVariablePrice,
              ledger: e.productDetails.ledger,
              users: e.systemData.users,
              vatCodes: e.systemData.vatCodes,
              usesTwinfield: e.systemData.usesTwinfield
            };
          },
          function(e) {
            return {
              addProductPriceHistory: function(t) {
                e(
                  (function(e) {
                    return {
                      type: "ADD_PRODUCT_PRICE_HISTORY",
                      priceHistory: e
                    };
                  })(t)
                );
              }
            };
          }
        )(se),
        de = a(698);
      function me(e) {
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
          var a,
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var pe = (function(e) {
          l()(a, e);
          var t = me(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              b()(g()(n), "toggleShowNew", function() {
                n.setState({ showNew: !n.state.showNew });
              }),
              (n.state = { showNew: !1 }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    q.a,
                    null,
                    h.a.createElement(
                      de.a,
                      null,
                      h.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Prijshistorie"
                      ),
                      this.props.permissions.manageFinancial &&
                        h.a.createElement(
                          "a",
                          {
                            role: "button",
                            className: "pull-right",
                            onClick: this.toggleShowNew
                          },
                          h.a.createElement("span", {
                            className: "glyphicon glyphicon-plus"
                          })
                        )
                    ),
                    h.a.createElement(
                      x.a,
                      null,
                      h.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        h.a.createElement(ne, null)
                      ),
                      h.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          h.a.createElement(ue, {
                            toggleShowNew: this.toggleShowNew
                          })
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        he = Object(f.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(pe);
      Z.a.locale("nl");
      var fe = Object(f.b)(function(e) {
          return { productDetails: e.productDetails };
        })(function(e) {
          var t = e.productDetails,
            a = t.createdAt,
            n = t.createdBy;
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(X.a, {
                label: "Gemaakt door",
                value: n ? n.fullName : "Onbekend",
                link: n ? "gebruiker/" + n.id : ""
              }),
              h.a.createElement(X.a, {
                label: "Gemaakt op",
                value: a ? Z()(a).format("L") : "Onbekend"
              })
            )
          );
        }),
        ve = function(e) {
          return h.a.createElement(
            q.a,
            null,
            h.a.createElement(
              de.a,
              null,
              h.a.createElement(
                "span",
                { className: "h5 text-bold" },
                "Afsluiting gegevens"
              )
            ),
            h.a.createElement(
              x.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-md-12" },
                h.a.createElement(fe, null)
              )
            )
          );
        };
      function ge(e) {
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
          var a,
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      Z.a.locale("nl");
      var ye = (function(e) {
          l()(a, e);
          var t = ge(a);
          function a(e) {
            return r()(this, a), t.call(this, e);
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  var e = "",
                    t = !0;
                  return (
                    this.props.hasError
                      ? (e = "Fout bij het ophalen van product.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : Object(O.isEmpty)(this.props.productDetails)
                      ? (e = "Geen product gevonden!")
                      : (t = !1),
                    t
                      ? h.a.createElement("div", null, e)
                      : h.a.createElement(
                          "div",
                          null,
                          h.a.createElement(J, null),
                          h.a.createElement(he, null),
                          h.a.createElement(ve, null)
                        )
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        be = Object(f.b)(
          function(e) {
            return {
              productDetails: e.productDetails,
              isLoading: e.loadingData.isLoading,
              hasError: e.loadingData.hasError
            };
          },
          function(e) {
            return {
              fetchTeamDetails: function(t) {
                e(Object(S.b)(t));
              }
            };
          }
        )(ye);
      function Ee(e) {
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
          var a,
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var Ne = (function(e) {
        l()(a, e);
        var t = Ee(a);
        function a(e) {
          return r()(this, a), t.call(this, e);
        }
        return (
          o()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchProductDetails(this.props.params.id);
              }
            },
            {
              key: "render",
              value: function() {
                return h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    h.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      h.a.createElement(
                        q.a,
                        null,
                        h.a.createElement(
                          x.a,
                          { className: "panel-small" },
                          h.a.createElement(T, null)
                        )
                      )
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      h.a.createElement(be, null)
                    )
                  ),
                  h.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          a
        );
      })(p.Component);
      t.default = Object(f.b)(
        function(e) {
          return { productDetails: e.productDetails };
        },
        function(e) {
          return {
            fetchProductDetails: function(t) {
              e(
                (function(e) {
                  return { type: "FETCH_PRODUCT_DETAILS", id: e };
                })(t)
              );
            }
          };
        }
      )(Ne);
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        c = function(e) {
          var t = e.children,
            a = e.className,
            n = e.onMouseEnter,
            i = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: i
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
          className: o.a.string,
          onMouseEnter: o.a.func,
          onMouseLeave: o.a.func
        }),
        (t.a = c);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        c = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: o.a.string }),
        (t.a = c);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        c = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            i = e.type,
            o = e.value,
            c = e.loading,
            l = e.loadText,
            s = e.disabled;
          return c
            ? r.a.createElement(
                "button",
                {
                  type: i,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: o,
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
                  type: i,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: o,
                  disabled: s
                },
                a
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
          buttonClassName: o.a.string,
          buttonText: o.a.string.isRequired,
          onClickAction: o.a.func,
          type: o.a.string,
          value: o.a.string,
          loading: o.a.bool,
          loadText: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = c);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        c = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            i = e.title,
            o = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: o,
              title: i
            },
            r.a.createElement("span", { className: "glyphicon ".concat(a) })
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
        (t.a = c);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        c = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            i = e.size,
            o = e.id,
            c = e.placeholder,
            l = e.name,
            s = e.value,
            u = e.onClickAction,
            d = e.onChangeAction,
            m = e.onBlurAction,
            p = e.required,
            h = e.readOnly,
            f = e.maxLength,
            v = e.error,
            g = e.min,
            y = e.max,
            b = e.step,
            E = e.errorMessage,
            N = e.divSize,
            C = e.divClassName,
            w = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(N, " ").concat(C) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(p) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(i) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (v ? "has-error" : ""),
                id: o,
                placeholder: c,
                name: l,
                value: s,
                onClick: u,
                onChange: d,
                onBlur: m,
                readOnly: h,
                maxLength: f,
                min: g,
                max: y,
                autoComplete: w,
                step: b
              })
            ),
            v &&
              r.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                r.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  E
                )
              )
          );
        };
      (c.defaultProps = {
        divClassName: "",
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        name: "",
        type: "text",
        value: "",
        required: "",
        readOnly: !1,
        maxLength: null,
        error: !1,
        min: "",
        max: "",
        step: "",
        errorMessage: "",
        autoComplete: "off",
        onBlurAction: function() {},
        onClickAction: function() {},
        onChangeAction: function() {}
      }),
        (c.propTypes = {
          label: o.a.oneOfType([o.a.string, o.a.object]).isRequired,
          type: o.a.string,
          className: o.a.string,
          divClassName: o.a.string,
          size: o.a.string,
          divSize: o.a.string,
          id: o.a.string,
          placeholder: o.a.string,
          name: o.a.string.isRequired,
          value: o.a.oneOfType([o.a.string, o.a.number]),
          onClickAction: o.a.func,
          onChangeAction: o.a.func,
          onBlurAction: o.a.func,
          required: o.a.string,
          readOnly: o.a.bool,
          maxLength: o.a.string,
          error: o.a.bool,
          min: o.a.string,
          max: o.a.string,
          step: o.a.string,
          errorMessage: o.a.string,
          autoComplete: o.a.string
        }),
        (t.a = c);
    },
    695: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(4),
        o = a(8),
        c = a.n(o),
        l = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            o = e.value,
            c = e.link,
            l = e.hidden;
          return c.length > 0
            ? r.a.createElement(
                "div",
                { className: a, style: l ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement(
                  "div",
                  { className: "col-sm-6", id: n, onClick: null },
                  r.a.createElement(
                    i.b,
                    { to: c, className: "link-underline" },
                    o
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: a, style: l ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement("div", { className: "col-sm-6", id: n }, o)
              );
        };
      (l.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (l.propTypes = {
          label: c.a.oneOfType([c.a.string, c.a.object]).isRequired,
          className: c.a.string,
          id: c.a.string,
          value: c.a.oneOfType([c.a.string, c.a.number]),
          link: c.a.string,
          hidden: c.a.bool
        }),
        (t.a = l);
    },
    696: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        c = function(e) {
          var t = e.label,
            a = e.className,
            n = e.size,
            i = e.id,
            o = e.name,
            c = e.value,
            l = e.options,
            s = e.onChangeAction,
            u = e.onBlurAction,
            d = e.required,
            m = e.error,
            p = e.errorMessage,
            h = e.optionValue,
            f = e.optionName,
            v = e.readOnly,
            g = e.placeholder,
            y = e.divClassName,
            b = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(y) },
            r.a.createElement(
              "label",
              { htmlFor: i, className: "col-sm-6 ".concat(d) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-6" },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(a) + (m && " has-error"),
                  id: i,
                  name: o,
                  value: c,
                  onChange: s,
                  onBlur: u,
                  readOnly: v
                },
                b && r.a.createElement("option", { value: "" }, g),
                l.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[h], value: e[h] },
                    e[f]
                  );
                })
              )
            ),
            m &&
              r.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                r.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  p
                )
              )
          );
        };
      (c.defaultProps = {
        divClassName: "",
        className: "",
        size: "col-sm-6",
        readOnly: !1,
        required: "",
        error: !1,
        errorMessage: "",
        value: "",
        optionValue: "id",
        optionName: "name",
        placeholder: "",
        emptyOption: !0
      }),
        (c.propTypes = {
          label: o.a.string.isRequired,
          className: o.a.string,
          size: o.a.string,
          id: o.a.string,
          name: o.a.string.isRequired,
          options: o.a.array,
          value: o.a.oneOfType([o.a.string, o.a.number]),
          onChangeAction: o.a.func,
          onBlurAction: o.a.func,
          required: o.a.string,
          readOnly: o.a.bool,
          error: o.a.bool,
          errorMessage: o.a.string,
          emptyOption: o.a.bool,
          optionValue: o.a.string,
          optionName: o.a.string,
          placeholder: o.a.string
        }),
        (t.a = c);
    },
    698: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        c = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-heading ".concat(t) },
            a
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: o.a.string }),
        (t.a = c);
    },
    699: function(e, t, a) {
      "use strict";
      var n = a(24),
        r = a.n(n),
        i = a(25),
        o = a.n(i),
        c = a(22),
        l = a.n(c),
        s = a(26),
        u = a.n(s),
        d = a(27),
        m = a.n(d),
        p = a(16),
        h = a.n(p),
        f = a(6),
        v = a.n(f),
        g = a(0),
        y = a.n(g),
        b = a(8),
        E = a.n(b),
        N = a(707),
        C = a.n(N),
        w = a(708),
        D = a.n(w),
        k = a(7),
        P = a.n(k);
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
          var a,
            n = h()(e);
          if (t) {
            var r = h()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return m()(this, a);
        };
      }
      P.a.locale("nl");
      var O = (function(e) {
        u()(a, e);
        var t = T(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            v()(l()(n), "validateDate", function(e) {
              var t = P()(e.target.value, "DD-MM-YYYY", !0),
                a = !1;
              t.isValid() || "" === e.target.value || (a = !0),
                n.props.disabledBefore &&
                  t.isBefore(n.props.disabledBefore) &&
                  (a = !0),
                n.props.disabledAfter &&
                  t.isAfter(n.props.disabledAfter) &&
                  (a = !0),
                n.setState({ errorDateFormat: a });
            }),
            v()(l()(n), "onDateChange", function(e) {
              var t = e ? P()(e).format("Y-MM-DD") : "",
                a = !1;
              t &&
                n.props.disabledBefore &&
                P()(t).isBefore(n.props.disabledBefore) &&
                (a = !0),
                t &&
                  n.props.disabledAfter &&
                  P()(t).isAfter(n.props.disabledAfter) &&
                  (a = !0),
                n.setState({ errorDateFormat: a }),
                !a && n.props.onChangeAction(t, n.props.name);
            }),
            (n.state = { errorDateFormat: !1 }),
            n
          );
        }
        return (
          o()(a, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.label,
                  a = e.className,
                  n = e.size,
                  r = e.divSize,
                  i = e.id,
                  o = e.value,
                  c = e.required,
                  l = e.readOnly,
                  s = e.name,
                  u = e.error,
                  d = e.errorMessage,
                  m = e.disabledBefore,
                  p = e.disabledAfter,
                  h = o ? P()(o).format("L") : "",
                  f = {};
                return (
                  m && (f.before = new Date(m)),
                  p && (f.after = new Date(p)),
                  y.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    y.a.createElement(
                      "div",
                      null,
                      y.a.createElement(
                        "label",
                        { htmlFor: i, className: "col-sm-6 ".concat(c) },
                        t
                      )
                    ),
                    y.a.createElement(
                      "div",
                      { className: "".concat(n) },
                      y.a.createElement(C.a, {
                        id: i,
                        value: h,
                        formatDate: w.formatDate,
                        parseDate: w.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: D.a,
                          disabledDays: f
                        },
                        inputProps: {
                          className:
                            "form-control input-sm ".concat(a) +
                            (this.state.errorDateFormat || u
                              ? " has-error"
                              : ""),
                          name: s,
                          onBlur: this.validateDate,
                          autoComplete: "off",
                          readOnly: l,
                          disabled: l
                        },
                        required: c,
                        readOnly: l,
                        placeholder: ""
                      })
                    ),
                    u &&
                      y.a.createElement(
                        "div",
                        { className: "col-sm-offset-6 col-sm-6" },
                        y.a.createElement(
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
          a
        );
      })(g.Component);
      (O.defaultProps = {
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
        (O.propTypes = {
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
        (t.a = O);
    },
    700: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        c = a(703),
        l = a.n(c),
        s = function(e) {
          var t = e.label,
            a = e.size,
            n = e.id,
            i = e.name,
            o = e.value,
            c = e.onChangeAction,
            s = e.required,
            u = e.divSize,
            d = e.className,
            m = e.disabled;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(u, " ").concat(d) },
            r.a.createElement(
              "div",
              null,
              r.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(s) },
                t
              )
            ),
            r.a.createElement(
              "div",
              { className: "".concat(a) },
              r.a.createElement(l.a, {
                id: n,
                name: i,
                onChange: c,
                checked: o,
                disabled: m
              })
            )
          );
        };
      (s.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        required: "",
        disabled: !1,
        value: null
      }),
        (s.propTypes = {
          label: o.a.string.isRequired,
          type: o.a.string,
          size: o.a.string,
          divSize: o.a.string,
          id: o.a.string,
          name: o.a.string.isRequired,
          value: o.a.bool,
          onChangeAction: o.a.func,
          required: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = s);
    },
    703: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var a = arguments[t];
              for (var n in a)
                Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
            }
            return e;
          },
        r = (function() {
          function e(e, t) {
            for (var a = 0; a < t.length; a++) {
              var n = t[a];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, a, n) {
            return a && e(t.prototype, a), n && e(t, n), t;
          };
        })(),
        i = a(0),
        o = m(i),
        c = m(a(710)),
        l = m(a(8)),
        s = m(a(704)),
        u = m(a(705)),
        d = a(706);
      function m(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var p = (function(e) {
        function t(e) {
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
          })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
          return (
            (a.handleClick = a.handleClick.bind(a)),
            (a.handleTouchStart = a.handleTouchStart.bind(a)),
            (a.handleTouchMove = a.handleTouchMove.bind(a)),
            (a.handleTouchEnd = a.handleTouchEnd.bind(a)),
            (a.handleFocus = a.handleFocus.bind(a)),
            (a.handleBlur = a.handleBlur.bind(a)),
            (a.previouslyChecked = !(!e.checked && !e.defaultChecked)),
            (a.state = {
              checked: !(!e.checked && !e.defaultChecked),
              hasFocus: !1
            }),
            a
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
          r(t, [
            {
              key: "componentDidUpdate",
              value: function(e) {
                e.checked !== this.props.checked &&
                  this.setState({ checked: !!this.props.checked });
              }
            },
            {
              key: "handleClick",
              value: function(e) {
                var t = this.input;
                if (e.target !== t && !this.moved)
                  return (
                    (this.previouslyChecked = t.checked),
                    e.preventDefault(),
                    t.focus(),
                    void t.click()
                  );
                var a = this.props.hasOwnProperty("checked")
                  ? this.props.checked
                  : t.checked;
                this.setState({ checked: a });
              }
            },
            {
              key: "handleTouchStart",
              value: function(e) {
                (this.startX = (0, d.pointerCoord)(e).x), (this.activated = !0);
              }
            },
            {
              key: "handleTouchMove",
              value: function(e) {
                if (this.activated && ((this.moved = !0), this.startX)) {
                  var t = (0, d.pointerCoord)(e).x;
                  this.state.checked && t + 15 < this.startX
                    ? (this.setState({ checked: !1 }),
                      (this.startX = t),
                      (this.activated = !0))
                    : t - 15 > this.startX &&
                      (this.setState({ checked: !0 }),
                      (this.startX = t),
                      (this.activated = t < this.startX + 5));
                }
              }
            },
            {
              key: "handleTouchEnd",
              value: function(e) {
                if (this.moved) {
                  var t = this.input;
                  if ((e.preventDefault(), this.startX)) {
                    var a = (0, d.pointerCoord)(e).x;
                    !0 === this.previouslyChecked && this.startX + 4 > a
                      ? this.previouslyChecked !== this.state.checked &&
                        (this.setState({ checked: !1 }),
                        (this.previouslyChecked = this.state.checked),
                        t.click())
                      : this.startX - 4 < a &&
                        this.previouslyChecked !== this.state.checked &&
                        (this.setState({ checked: !0 }),
                        (this.previouslyChecked = this.state.checked),
                        t.click()),
                      (this.activated = !1),
                      (this.startX = null),
                      (this.moved = !1);
                  }
                }
              }
            },
            {
              key: "handleFocus",
              value: function(e) {
                var t = this.props.onFocus;
                t && t(e), this.setState({ hasFocus: !0 });
              }
            },
            {
              key: "handleBlur",
              value: function(e) {
                var t = this.props.onBlur;
                t && t(e), this.setState({ hasFocus: !1 });
              }
            },
            {
              key: "getIcon",
              value: function(e) {
                var a = this.props.icons;
                return a
                  ? void 0 === a[e]
                    ? t.defaultProps.icons[e]
                    : a[e]
                  : null;
              }
            },
            {
              key: "render",
              value: function() {
                var e = this,
                  t = this.props,
                  a = t.className,
                  r =
                    (t.icons,
                    (function(e, t) {
                      var a = {};
                      for (var n in e)
                        t.indexOf(n) >= 0 ||
                          (Object.prototype.hasOwnProperty.call(e, n) &&
                            (a[n] = e[n]));
                      return a;
                    })(t, ["className", "icons"])),
                  i = (0, c.default)(
                    "react-toggle",
                    {
                      "react-toggle--checked": this.state.checked,
                      "react-toggle--focus": this.state.hasFocus,
                      "react-toggle--disabled": this.props.disabled
                    },
                    a
                  );
                return o.default.createElement(
                  "div",
                  {
                    className: i,
                    onClick: this.handleClick,
                    onTouchStart: this.handleTouchStart,
                    onTouchMove: this.handleTouchMove,
                    onTouchEnd: this.handleTouchEnd
                  },
                  o.default.createElement(
                    "div",
                    { className: "react-toggle-track" },
                    o.default.createElement(
                      "div",
                      { className: "react-toggle-track-check" },
                      this.getIcon("checked")
                    ),
                    o.default.createElement(
                      "div",
                      { className: "react-toggle-track-x" },
                      this.getIcon("unchecked")
                    )
                  ),
                  o.default.createElement("div", {
                    className: "react-toggle-thumb"
                  }),
                  o.default.createElement(
                    "input",
                    n({}, r, {
                      ref: function(t) {
                        e.input = t;
                      },
                      onFocus: this.handleFocus,
                      onBlur: this.handleBlur,
                      className: "react-toggle-screenreader-only",
                      type: "checkbox"
                    })
                  )
                );
              }
            }
          ]),
          t
        );
      })(i.PureComponent);
      (t.default = p),
        (p.displayName = "Toggle"),
        (p.defaultProps = {
          icons: {
            checked: o.default.createElement(s.default, null),
            unchecked: o.default.createElement(u.default, null)
          }
        }),
        (p.propTypes = {
          checked: l.default.bool,
          disabled: l.default.bool,
          defaultChecked: l.default.bool,
          onChange: l.default.func,
          onFocus: l.default.func,
          onBlur: l.default.func,
          className: l.default.string,
          name: l.default.string,
          value: l.default.string,
          id: l.default.string,
          "aria-labelledby": l.default.string,
          "aria-label": l.default.string,
          icons: l.default.oneOfType([
            l.default.bool,
            l.default.shape({
              checked: l.default.node,
              unchecked: l.default.node
            })
          ])
        });
    },
    704: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        r = a(0),
        i = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
        return i.default.createElement(
          "svg",
          { width: "14", height: "11", viewBox: "0 0 14 11" },
          i.default.createElement("title", null, "switch-check"),
          i.default.createElement("path", {
            d:
              "M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",
            fill: "#fff",
            fillRule: "evenodd"
          })
        );
      };
    },
    705: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        r = a(0),
        i = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
        return i.default.createElement(
          "svg",
          { width: "10", height: "10", viewBox: "0 0 10 10" },
          i.default.createElement("title", null, "switch-x"),
          i.default.createElement("path", {
            d:
              "M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",
            fill: "#fff",
            fillRule: "evenodd"
          })
        );
      };
    },
    706: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.pointerCoord = function(e) {
          if (e) {
            var t = e.changedTouches;
            if (t && t.length > 0) {
              var a = t[0];
              return { x: a.clientX, y: a.clientY };
            }
            var n = e.pageX;
            if (void 0 !== n) return { x: n, y: e.pageY };
          }
          return { x: 0, y: 0 };
        });
    },
    709: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        c = a(714),
        l =
          (a(715),
          function(e) {
            var t = e.label,
              a = e.divSize,
              n = e.size,
              i = e.id,
              o = e.name,
              l = e.value,
              s = e.options,
              u = e.optionId,
              d = e.optionName,
              m = e.onChangeAction,
              p = e.required,
              h = e.multi,
              f = e.error,
              v = e.isLoading;
            return r.a.createElement(
              "div",
              { className: "form-group ".concat(a) },
              r.a.createElement(
                "label",
                { htmlFor: i, className: "col-sm-6 ".concat(p) },
                t
              ),
              r.a.createElement(
                "div",
                { className: "".concat(n) },
                r.a.createElement(c.a, {
                  id: i,
                  name: o,
                  value: l,
                  onChange: function(e) {
                    m(e || "", o);
                  },
                  options: s,
                  valueKey: u,
                  labelKey: d,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: h,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: f ? " has-error" : "",
                  isLoading: v
                })
              )
            );
          });
      (l.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        optionId: "id",
        optionName: "name",
        readOnly: !1,
        required: "",
        error: !1,
        value: "",
        multi: !0,
        isLoading: !1
      }),
        (l.propTypes = {
          label: o.a.string.isRequired,
          className: o.a.string,
          size: o.a.string,
          divSize: o.a.string,
          id: o.a.string,
          name: o.a.string.isRequired,
          options: o.a.array.isRequired,
          optionId: o.a.string,
          optionName: o.a.string,
          value: o.a.oneOfType([o.a.string, o.a.number]),
          onChangeAction: o.a.func,
          onBlurAction: o.a.func,
          required: o.a.string,
          readOnly: o.a.bool,
          error: o.a.bool,
          multi: o.a.bool,
          isLoading: o.a.bool
        }),
        (t.a = l);
    },
    795: function(e, t, a) {
      "use strict";
      a.d(t, "b", function() {
        return n;
      }),
        a.d(t, "d", function() {
          return r;
        }),
        a.d(t, "c", function() {
          return i;
        }),
        a.d(t, "a", function() {
          return o;
        });
      var n = function(e) {
          return { type: "FETCH_TEAM_DETAILS", id: e };
        },
        r = function(e, t) {
          return { type: "UPDATE_TEAM", team: e, switchToView: t };
        },
        i = function(e) {
          return { type: "NEW_TEAM_USER", teamUser: e };
        },
        o = function(e, t) {
          return { type: "DELETE_TEAM_USER", teamId: e, userId: t };
        };
    },
    879: function(e, t, a) {
      "use strict";
      a.d(t, "c", function() {
        return n;
      }),
        a.d(t, "a", function() {
          return r;
        }),
        a.d(t, "b", function() {
          return i;
        });
      var n = function() {
          return { type: "FETCH_PRODUCTS" };
        },
        r = function() {
          return { type: "CLEAR_PRODUCTS" };
        },
        i = function(e) {
          return { type: "DELETE_PRODUCT", id: e };
        };
    }
  }
]);
