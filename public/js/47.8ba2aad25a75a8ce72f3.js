(window.webpackJsonp = window.webpackJsonp || []).push([
  [47],
  {
    1420: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        i = a(25),
        o = a.n(i),
        c = a(26),
        s = a.n(c),
        l = a(27),
        u = a.n(l),
        d = a(16),
        m = a.n(d),
        p = a(0),
        h = a.n(p),
        v = a(32),
        f = a(729),
        g = a(22),
        b = a.n(g),
        E = a(6),
        y = a.n(E),
        P = a(4),
        D = a(693),
        w = a(100),
        N = a(90),
        I = a(7),
        O = a.n(I),
        C = a(697),
        S = a.n(C),
        k = a(699);
      function R(e, t) {
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
      function j(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? R(Object(a), !0).forEach(function(t) {
                y()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : R(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
          var a,
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var L = (function(e) {
          s()(a, e);
          var t = A(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(b()(n), "handleInputChangeDate", function(e, t) {
                n.setState(
                  j(
                    j({}, n.state),
                    {},
                    { invoice: j(j({}, n.state.invoice), {}, y()({}, t, e)) }
                  )
                );
              }),
              y()(b()(n), "confirmAction", function(e) {
                e.preventDefault();
                var t = n.state.invoice,
                  a = {},
                  r = !1;
                S.a.isEmpty(t.datePaid + "") && ((a.datePaid = !0), (r = !0)),
                  n.setState(j(j({}, n.state), {}, { errors: a })),
                  r ||
                    N.a.updateInvoice(t).then(function(e) {
                      n.props.fetchInvoiceDetails(t.id), n.props.closeModal();
                    });
              }),
              (n.state = {
                invoice: { id: e.invoiceId, datePaid: O()().format("Y-MM-DD") },
                errors: { datePaid: !1 }
              }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.invoice.datePaid;
                  return h.a.createElement(
                    w.a,
                    {
                      buttonConfirmText: "Nota betalen",
                      closeModal: this.props.closeModal,
                      confirmAction: this.confirmAction,
                      title: "Nota betalen"
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
                          "Wanneer de betaaldatum wordt ingevuld zal er een betaling aangemaakt worden met het openstaande bedrag(€",
                          this.props.amountOpen.toLocaleString("nl", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }),
                          ")."
                        )
                      )
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(k.a, {
                        divSize: "col-sm-12",
                        label: "Datum betaald",
                        name: "datePaid",
                        value: e,
                        onChangeAction: this.handleInputChangeDate,
                        required: "required",
                        error: this.state.errors.datePaid
                      })
                    )
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        x = Object(v.b)(null, function(e) {
          return {
            fetchInvoiceDetails: function(t) {
              e(Object(f.b)(t));
            }
          };
        })(L);
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
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var M = (function(e) {
          s()(a, e);
          var t = T(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(b()(n), "confirmAction", function(e) {
                e.preventDefault(),
                  N.a.sendNotification(n.props.invoiceId).then(function(e) {
                    n.props.fetchInvoiceDetails(n.props.invoiceId),
                      n.props.closeModal();
                  });
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
                    w.a,
                    {
                      buttonConfirmText: "Versturen",
                      closeModal: this.props.closeModal,
                      confirmAction: this.confirmAction,
                      title: "Notificatie versturen"
                    },
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(
                        "div",
                        { className: "col-sm-12 margin-10-bottom" },
                        h.a.createElement("span", null, this.props.reminderText)
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        F = Object(v.b)(null, function(e) {
          return {
            fetchInvoiceDetails: function(t) {
              e(Object(f.b)(t));
            }
          };
        })(M);
      function q(e) {
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
      var B = (function(e) {
          s()(a, e);
          var t = q(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(b()(n), "confirmAction", function(e) {
                e.preventDefault(),
                  N.a.setIrrecoverable(n.props.invoiceId).then(function(e) {
                    n.props.fetchInvoiceDetails(n.props.invoiceId),
                      n.props.closeModal();
                  });
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
                    w.a,
                    {
                      closeModal: this.props.closeModal,
                      confirmAction: this.confirmAction,
                      title: "Nota oninbaar"
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
                          "Wilt u deze nota als oninbaar markeren?"
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
        V = Object(v.b)(null, function(e) {
          return {
            fetchInvoiceDetails: function(t) {
              e(Object(f.b)(t));
            }
          };
        })(B),
        z = a(711),
        Y = a.n(z),
        W = a(807),
        G = Object(v.b)(null, function(e) {
          return {
            deleteInvoice: function(t) {
              e(Object(f.a)(t));
            }
          };
        })(function(e) {
          return h.a.createElement(
            w.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return e.deleteInvoice(e.id), void e.closeDeleteItemModal();
              },
              title: "Verwijderen"
            },
            h.a.createElement(
              "p",
              null,
              "Verwijder nota: ",
              h.a.createElement("strong", null, " ", "".concat(e.number, "?"))
            )
          );
        }),
        _ = a(202);
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
      var U = (function(e) {
          s()(a, e);
          var t = K(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(b()(n), "download", function() {
                N.a.download(n.props.invoiceDetails.id).then(function(e) {
                  Y()(e.data, e.headers["x-filename"]);
                });
              }),
              y()(b()(n), "showSend", function() {
                var e =
                  "collection" === n.props.invoiceDetails.paymentTypeId
                    ? "incasso"
                    : "overboeken";
                "incasso" == e &&
                n.props.invoiceDetails.totalPriceInclVatAndReduction < 0
                  ? n.props.setError(
                      405,
                      'Een nota met een negatief bedrag kan geen incasso zijn. Wil je a.u.b. de betaalwijze van de order aanpassen in "Overboeken".'
                    )
                  : (n.props.previewSend([n.props.invoiceDetails.id]),
                    P.f.push(
                      "/financieel/"
                        .concat(
                          n.props.invoiceDetails.order.administrationId,
                          "/notas/te-verzenden/verzenden/email/"
                        )
                        .concat(e)
                    ));
              }),
              y()(b()(n), "showSendPost", function() {
                var e =
                  "collection" === n.props.invoiceDetails.paymentTypeId
                    ? "incasso"
                    : "overboeken";
                n.props.previewSend([n.props.invoiceDetails.id]),
                  P.f.push(
                    "/financieel/"
                      .concat(
                        n.props.invoiceDetails.order.administrationId,
                        "/notas/te-verzenden/verzenden/post/"
                      )
                      .concat(e)
                  );
              }),
              y()(b()(n), "showSetPaid", function() {
                n.setState({ showSetPaid: !n.state.showSetPaid });
              }),
              y()(b()(n), "showSendNotification", function() {
                n.setState({
                  showSendNotification: !n.state.showSendNotification
                });
              }),
              y()(b()(n), "showSetIrrecoverable", function() {
                n.setState({
                  showSetIrrecoverable: !n.state.showSetIrrecoverable
                });
              }),
              y()(b()(n), "showDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              y()(b()(n), "view", function() {
                P.f.push("/nota/inzien/".concat(n.props.invoiceDetails.id));
              }),
              (n.state = {
                showSetChecked: !1,
                showSetPaid: !1,
                showSendNotification: !1,
                reminderText: "",
                showSetIrrecoverable: !1,
                showDelete: !1
              }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  this.props !== e &&
                    (e.invoiceDetails.dateReminder3
                      ? this.setState({
                          reminderText: "Wilt u de aanmaning sturen?"
                        })
                      : e.invoiceDetails.dateReminder2
                      ? this.setState({
                          reminderText: "Wilt u de derde herinnering sturen?"
                        })
                      : e.invoiceDetails.dateReminder1
                      ? this.setState({
                          reminderText: "Wilt u de tweede herinnering sturen?"
                        })
                      : this.setState({
                          reminderText: "Wilt u de eerste herinnering sturen?"
                        }));
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
                      { className: "col-md-4" },
                      h.a.createElement(
                        "div",
                        {
                          className: "btn-group btn-group-flex margin-small",
                          role: "group"
                        },
                        h.a.createElement(D.a, {
                          iconName: "glyphicon-arrow-left",
                          onClickAction: P.e.goBack
                        }),
                        h.a.createElement(D.a, {
                          iconName: "glyphicon-eye-open",
                          onClickAction: this.view
                        }),
                        ("to-send" === this.props.invoiceDetails.statusId ||
                          "error-sending" ===
                            this.props.invoiceDetails.statusId) &&
                          "Geen e-mail bekend" !==
                            this.props.invoiceDetails.emailToAddress &&
                          h.a.createElement(D.a, {
                            iconName: "glyphicon-envelope",
                            onClickAction: this.showSend
                          }),
                        ("to-send" === this.props.invoiceDetails.statusId ||
                          "error-sending" ===
                            this.props.invoiceDetails.statusId) &&
                          "Geen e-mail bekend" ===
                            this.props.invoiceDetails.emailToAddress &&
                          h.a.createElement(D.a, {
                            iconName: "glyphicon-envelope",
                            onClickAction: this.showSendPost
                          }),
                        !this.props.invoiceDetails.invoiceInTwinfield &&
                          ("sent" === this.props.invoiceDetails.statusId ||
                            "exported" ===
                              this.props.invoiceDetails.statusId) &&
                          h.a.createElement(D.a, {
                            iconName: "glyphicon-euro",
                            onClickAction: this.showSetPaid
                          }),
                        ("sent" === this.props.invoiceDetails.statusId ||
                          "exported" === this.props.invoiceDetails.statusId) &&
                          !this.props.invoiceDetails.dateExhortation &&
                          h.a.createElement(D.a, {
                            iconName: "glyphicon-bullhorn",
                            onClickAction: this.showSendNotification
                          }),
                        "to-send" !== this.props.invoiceDetails.statusId &&
                          "in-progress" !==
                            this.props.invoiceDetails.statusId &&
                          "is-sending" !== this.props.invoiceDetails.statusId &&
                          "error-making" !==
                            this.props.invoiceDetails.statusId &&
                          "error-sending" !==
                            this.props.invoiceDetails.statusId &&
                          "is-resending" !==
                            this.props.invoiceDetails.statusId &&
                          "paid" !== this.props.invoiceDetails.statusId &&
                          "irrecoverable" !==
                            this.props.invoiceDetails.statusId &&
                          h.a.createElement(D.a, {
                            iconName: "glyphicon-remove",
                            onClickAction: this.showSetIrrecoverable
                          }),
                        h.a.createElement(D.a, {
                          iconName: "glyphicon-download-alt",
                          onClickAction: this.download
                        }),
                        "to-send" === this.props.invoiceDetails.statusId &&
                          h.a.createElement(D.a, {
                            iconName: "glyphicon-trash",
                            onClickAction: this.showDelete
                          })
                      )
                    ),
                    !this.props.isLoading &&
                      h.a.createElement(
                        "div",
                        { className: "col-md-4" },
                        h.a.createElement(
                          "h4",
                          { className: "text-center" },
                          "Nota:",
                          " ",
                          this.props.invoiceDetails.order
                            ? this.props.invoiceDetails.order.contact.fullName
                            : "",
                          " /",
                          " ",
                          this.props.invoiceDetails.number
                        )
                      ),
                    h.a.createElement("div", { className: "col-md-4" }),
                    this.state.showSetPaid &&
                      h.a.createElement(x, {
                        closeModal: this.showSetPaid,
                        invoiceId: this.props.invoiceDetails.id,
                        amountOpen: this.props.invoiceDetails.amountOpen
                      }),
                    this.state.showSendNotification &&
                      h.a.createElement(F, {
                        reminderText: this.state.reminderText,
                        closeModal: this.showSendNotification,
                        invoiceId: this.props.invoiceDetails.id
                      }),
                    this.state.showSetIrrecoverable &&
                      h.a.createElement(V, {
                        closeModal: this.showSetIrrecoverable,
                        invoiceId: this.props.invoiceDetails.id
                      }),
                    this.state.showDelete &&
                      h.a.createElement(G, {
                        number: this.props.invoiceDetails.number,
                        id: this.props.invoiceDetails.id,
                        closeDeleteItemModal: this.showDelete
                      })
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        H = Object(v.b)(
          function(e) {
            return {
              invoiceDetails: e.invoiceDetails,
              isLoading: e.loadingData.isLoading
            };
          },
          function(e) {
            return {
              previewSend: function(t) {
                e(Object(W.e)(t));
              },
              setError: function(t, a) {
                e(Object(_.b)(t, a));
              }
            };
          }
        )(U),
        J = a(198),
        Q = a(695),
        X = a(690),
        Z = a(691),
        $ = Object(v.b)(function(e) {
          return { invoiceDetails: e.invoiceDetails };
        })(function(e) {
          var t = e.invoiceDetails,
            a = t.status,
            n = t.dateRequested,
            r = t.paymentType,
            i = t.paymentTypeId,
            o = t.invoiceText,
            c = t.subject,
            s = t.order,
            l = t.totalPriceInclVatAndReduction,
            u = t.amountOpen,
            d = t.dateSent,
            m = t.datePaymentDue,
            p = t.datePaid,
            v = t.dateReminder1,
            f = t.dateReminder2,
            g = t.dateReminder3,
            b = t.dateExhortation,
            E = t.emailReminder1,
            y = t.emailReminder2,
            P = t.emailReminder3,
            D = t.emailExhortation,
            w = t.dateCollection,
            N = t.emailedTo,
            I = t.sentToName;
          return h.a.createElement(
            "div",
            { onClick: e.switchToEdit },
            h.a.createElement(
              X.a,
              null,
              h.a.createElement(
                Z.a,
                null,
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Q.a, {
                    label: "Contact",
                    value: s.contact ? s.contact.fullName : "",
                    link: s.contact ? "contact/" + s.contact.id : ""
                  }),
                  h.a.createElement(Q.a, {
                    label: "Status",
                    value: a ? a.name : ""
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Q.a, {
                    label: "Betaalwijze",
                    value: r ? r.name : ""
                  }),
                  h.a.createElement(Q.a, { label: "Betreft", value: c || "" })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Q.a, {
                    label: "Order",
                    value: s ? s.number : "",
                    link: s ? "order/" + s.id : ""
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row margin-20-top margin-20-bottom" },
                  h.a.createElement(
                    "div",
                    { className: "col-sm-3" },
                    h.a.createElement(
                      "label",
                      { htmlFor: "invoiceText", className: "col-sm-12" },
                      "Opmerking"
                    )
                  ),
                  h.a.createElement(
                    "div",
                    { className: "col-sm-9", id: "invoiceText" },
                    o || ""
                  )
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Q.a, {
                    label: "Prijs incl. BTW",
                    value: l
                      ? "€" +
                        l.toLocaleString("nl", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })
                      : "€0,00"
                  }),
                  h.a.createElement(Q.a, {
                    label: "Openstaand bedrag",
                    value: u
                      ? "€" +
                        u.toLocaleString("nl", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })
                      : "€0,00"
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  d
                    ? h.a.createElement(Q.a, {
                        label: "Nota datum",
                        value: d ? O()(d).format("DD-MM-Y") : ""
                      })
                    : h.a.createElement(Q.a, {
                        label: "Geplande nota datum",
                        value: n ? O()(n).format("DD-MM-Y") : ""
                      })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Q.a, {
                    label: "Verstuurd naar",
                    value: I || ""
                  }),
                  h.a.createElement(Q.a, {
                    label: "Verstuurd naar e-mail",
                    value: N || ""
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Q.a, {
                    label: "Herinnering 1 verstuurd",
                    value: v ? O()(v).format("DD-MM-Y") : ""
                  }),
                  h.a.createElement(Q.a, {
                    label: "E-mail herinnering 1",
                    value: E || ""
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Q.a, {
                    label: "Herinnering 2 verstuurd",
                    value: f ? O()(f).format("DD-MM-Y") : ""
                  }),
                  h.a.createElement(Q.a, {
                    label: "E-mail herinnering 2",
                    value: y || ""
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Q.a, {
                    label: "Herinnering 3 verstuurd",
                    value: g ? O()(g).format("DD-MM-Y") : ""
                  }),
                  h.a.createElement(Q.a, {
                    label: "E-mail herinnering 3",
                    value: P || ""
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Q.a, {
                    label: "Aanmaning verstuurd",
                    value: b ? O()(b).format("DD-MM-Y") : ""
                  }),
                  h.a.createElement(Q.a, {
                    label: "E-mail aanmaning",
                    value: D || ""
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  "transfer" === i
                    ? h.a.createElement(Q.a, {
                        label: "Uiterste betaaldatum",
                        value: m ? O()(m).format("DD-MM-Y") : ""
                      })
                    : h.a.createElement(Q.a, {
                        label: "Incasso datum",
                        value: w ? O()(w).format("DD-MM-Y") : ""
                      }),
                  h.a.createElement(Q.a, {
                    label: "Datum betaald",
                    value: p ? O()(p).format("DD-MM-Y") : ""
                  })
                )
              )
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
        s()(a, e);
        var t = ee(a);
        function a(e) {
          return r()(this, a), t.call(this, e);
        }
        return (
          o()(a, [
            {
              key: "render",
              value: function() {
                return h.a.createElement(
                  "div",
                  null,
                  h.a.createElement($, null)
                );
              }
            }
          ]),
          a
        );
      })(p.Component);
      O.a.locale("nl");
      var ae = Object(v.b)(function(e) {
          return { invoiceDetails: e.invoiceDetails };
        })(function(e) {
          var t = e.invoiceDetails,
            a = t.createdAt,
            n = t.createdBy;
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(Q.a, {
                label: "Gemaakt door",
                value: n ? n.fullName : "Onbekend",
                link: n ? "gebruiker/" + n.id : ""
              }),
              h.a.createElement(Q.a, {
                label: "Gemaakt op",
                value: a ? O()(a).format("L") : "Onbekend"
              })
            )
          );
        }),
        ne = a(698),
        re = function(e) {
          return h.a.createElement(
            X.a,
            null,
            h.a.createElement(
              ne.a,
              null,
              h.a.createElement(
                "span",
                { className: "h5 text-bold" },
                "Afsluiting gegevens"
              )
            ),
            h.a.createElement(
              Z.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-md-12" },
                h.a.createElement(ae, null)
              )
            )
          );
        };
      O.a.locale("nl");
      var ie = Object(v.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(function(e) {
          var t = e.invoiceProduct,
            a = t.period,
            n = t.productCode,
            r = t.productName,
            i = t.description,
            o = t.amount,
            c = t.priceInclVatAndReduction;
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
              null,
              h.a.createElement("div", { className: "col-sm-1" }, n || ""),
              h.a.createElement("div", { className: "col-sm-3" }, r || ""),
              h.a.createElement("div", { className: "col-sm-3" }, i || ""),
              h.a.createElement("div", { className: "col-sm-2" }, o || ""),
              h.a.createElement(
                "div",
                { className: "col-sm-2" },
                c
                  ? "€" +
                      c.toLocaleString("nl", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })
                  : "€0,00"
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-1" },
                e.showActionButtons &&
                  e.permissions.manageFinancial &&
                  "to-send" === e.invoiceDetails.statusId
                  ? h.a.createElement(
                      "a",
                      { role: "button", onClick: e.openEdit },
                      h.a.createElement("span", {
                        className: "glyphicon glyphicon-pencil mybtn-success"
                      }),
                      " "
                    )
                  : "",
                e.showActionButtons &&
                  e.permissions.manageFinancial &&
                  "to-send" === e.invoiceDetails.statusId
                  ? h.a.createElement(
                      "a",
                      { role: "button", onClick: e.toggleDelete },
                      h.a.createElement("span", {
                        className: "glyphicon glyphicon-trash mybtn-danger"
                      }),
                      " "
                    )
                  : ""
              ),
              a &&
                h.a.createElement(
                  "div",
                  { className: "col-sm-12" },
                  "Periode ",
                  a
                )
            )
          );
        }),
        oe = a(694),
        ce = a(692);
      O.a.locale("nl");
      var se = function(e) {
          var t = e.invoiceProduct,
            a = t.product,
            n = t.description,
            r = t.amount,
            i = t.amountReduction,
            o = t.percentageReduction,
            c = t.dateLastInvoice,
            s = t.variablePrice;
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "form",
              { className: "form-horizontal", onSubmit: e.handleSubmit },
              h.a.createElement(
                X.a,
                { className: "panel-grey" },
                h.a.createElement(
                  Z.a,
                  null,
                  h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(oe.a, {
                      label: "Notanummer",
                      name: "invoice",
                      value: e.invoiceDetails ? e.invoiceDetails.number : "",
                      readOnly: !0
                    }),
                    h.a.createElement(oe.a, {
                      label: "Product",
                      name: "product",
                      value: a ? a.name : "",
                      readOnly: !0
                    })
                  ),
                  h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(oe.a, {
                      label: "Omschrijving",
                      id: "description",
                      name: "description",
                      value: n,
                      onChangeAction: e.handleInputChange,
                      required: "required",
                      error: e.errors.description
                    }),
                    h.a.createElement(oe.a, {
                      label: "Aantal",
                      type: "number",
                      id: "amount",
                      name: "amount",
                      value: r,
                      onChangeAction: e.handleInputChange,
                      required: "required",
                      error: e.errors.amount
                    })
                  ),
                  h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(oe.a, {
                      label: "Kortingspercentage",
                      type: "number",
                      id: "percentageReduction",
                      name: "percentageReduction",
                      value: o,
                      onChangeAction: e.handleInputChange
                    }),
                    e.productVariablePrice
                      ? h.a.createElement(oe.a, {
                          label: "Prijs ex. BTW",
                          type: "number",
                          name: "variablePrice",
                          value: s,
                          onChangeAction: e.handleInputChangeVariablePrice
                        })
                      : h.a.createElement(oe.a, {
                          label: "Prijs incl. BTW",
                          name: "price",
                          value:
                            "€" +
                            e.invoiceProduct.product.currentPrice.priceInclVat.toLocaleString(
                              "nl",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              }
                            ),
                          readOnly: !0
                        })
                  ),
                  h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(oe.a, {
                      label: "Kortingsbedrag",
                      type: "number",
                      id: "amountReduction",
                      name: "amountReduction",
                      value: i,
                      onChangeAction: e.handleInputChange
                    }),
                    h.a.createElement(oe.a, {
                      label: "Totaalbedrag",
                      name: "totalPrice",
                      value:
                        "€" +
                        e.totalPrice.toLocaleString("nl", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        }),
                      readOnly: !0
                    })
                  ),
                  h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(k.a, {
                      label: "Begin datum",
                      name: "dateLastInvoice",
                      value: c,
                      onChangeAction: e.handleInputChangeDate
                    })
                  ),
                  h.a.createElement(
                    "div",
                    { className: "pull-right btn-group", role: "group" },
                    h.a.createElement(ce.a, {
                      buttonClassName: "btn-default",
                      buttonText: "Annuleren",
                      onClickAction: e.cancelEdit
                    }),
                    h.a.createElement(ce.a, {
                      buttonText: "Opslaan",
                      onClickAction: e.handleSubmit,
                      type: "submit",
                      value: "Submit"
                    })
                  )
                )
              )
            )
          );
        },
        le = Object(v.b)(null, function(e) {
          return {
            fetchInvoiceDetails: function(t) {
              e(Object(f.b)(t));
            }
          };
        })(function(e) {
          return h.a.createElement(
            w.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                N.a.deleteInvoiceProduct(e.id).then(function(t) {
                  e.fetchInvoiceDetails(e.invoiceId), e.closeDeleteItemModal();
                });
              },
              title: "Verwijderen"
            },
            h.a.createElement("p", null, "Verwijder notaregel?")
          );
        });
      function ue(e, t) {
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
      function de(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ue(Object(a), !0).forEach(function(t) {
                y()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : ue(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
          s()(a, e);
          var t = me(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(b()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              y()(b()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              y()(b()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              y()(b()(n), "openEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              y()(b()(n), "closeEdit", function() {
                n.setState({ showEdit: !1 });
              }),
              y()(b()(n), "cancelEdit", function() {
                n.setState(
                  de(
                    de({}, n.state),
                    {},
                    { invoiceProduct: de({}, n.props.invoiceProduct) }
                  )
                ),
                  n.closeEdit();
              }),
              y()(b()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  de(
                    de({}, n.state),
                    {},
                    {
                      invoiceProduct: de(
                        de({}, n.state.invoiceProduct),
                        {},
                        y()({}, r, a)
                      )
                    }
                  ),
                  n.updatePrice
                );
              }),
              y()(b()(n), "updatePrice", function() {
                var e = 0;
                e = n.state.invoiceProduct.variablePrice
                  ? S.a.isFloat(n.state.invoiceProduct.variablePrice + "")
                    ? n.state.invoiceProduct.variablePrice
                    : 0
                  : S.a.isFloat(
                      n.props.invoiceProduct.product.currentPrice.priceInclVat +
                        ""
                    )
                  ? n.props.invoiceProduct.product.currentPrice.priceInclVat
                  : 0;
                var t = S.a.isFloat(n.state.invoiceProduct.amount + "")
                    ? n.state.invoiceProduct.amount
                    : 0,
                  a = S.a.isFloat(
                    n.state.invoiceProduct.percentageReduction + ""
                  )
                    ? n.state.invoiceProduct.percentageReduction
                    : 0,
                  r = S.a.isFloat(n.state.invoiceProduct.amountReduction + "")
                    ? n.state.invoiceProduct.amountReduction
                    : 0,
                  i = 0;
                e < 0
                  ? (i = e * t * ((parseFloat(100) + parseFloat(a)) / 100) - r)
                  : (i = e * t * ((100 - a) / 100) - r);
                n.setState(de(de({}, n.state), {}, { totalPrice: i }));
              }),
              y()(b()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = {},
                  a = !1,
                  r = n.state.invoiceProduct;
                S.a.isEmpty(r.amount + "") && ((t.amount = !0), (a = !0)),
                  S.a.isEmpty(r.description + "") &&
                    ((t.description = !0), (a = !0)),
                  n.setState(de(de({}, n.state), {}, { errors: t })),
                  !a &&
                    N.a.updateInvoiceProduct(r).then(function(e) {
                      n.props.fetchInvoiceDetails(
                        n.state.invoiceProduct.invoiceId
                      ),
                        n.closeEdit();
                    });
              }),
              y()(b()(n), "handleInputChangeVariablePrice", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  de(
                    de({}, n.state),
                    {},
                    {
                      price: a,
                      invoiceProduct: de(
                        de({}, n.state.invoiceProduct),
                        {},
                        y()({}, r, a)
                      )
                    }
                  ),
                  n.updatePrice
                );
              }),
              (n.state = {
                showActionButtons: !1,
                highlightLine: "",
                showEdit: !1,
                showDelete: !1,
                totalPrice: e.invoiceProduct.priceInclVatAndReduction,
                invoiceProduct: de(
                  de({}, e.invoiceProduct),
                  {},
                  {
                    variablePrice: e.invoiceProduct.priceInclVat
                      ? Math.round(100 * e.invoiceProduct.priceInclVat) / 100
                      : 0
                  }
                ),
                errors: { amount: !1, description: !1 }
              }),
              (n.handleInputChangeDate = n.handleInputChangeDate.bind(b()(n))),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  Object(J.isEqual)(
                    this.state.invoiceProduct,
                    e.invoiceProduct
                  ) ||
                    this.setState(
                      de(
                        de({}, this.state),
                        {},
                        {
                          totalPrice: e.invoiceProduct.priceInclVatAndReduction,
                          invoiceProduct: de(
                            de({}, e.invoiceProduct),
                            {},
                            {
                              variablePrice: e.invoiceProduct.priceInclVat
                                ? Math.round(
                                    100 * e.invoiceProduct.priceInclVat
                                  ) / 100
                                : 0
                            }
                          )
                        }
                      )
                    );
                }
              },
              {
                key: "handleInputChangeDate",
                value: function(e, t) {
                  this.setState(
                    de(
                      de({}, this.state),
                      {},
                      {
                        invoiceProduct: de(
                          de({}, this.state.invoiceProduct),
                          {},
                          y()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    "div",
                    null,
                    h.a.createElement(ie, {
                      highlightLine: this.state.highlightLine,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      showActionButtons: this.state.showActionButtons,
                      invoiceProduct: this.state.invoiceProduct,
                      invoiceDetails: this.props.invoiceDetails,
                      openEdit: this.openEdit,
                      toggleDelete: this.toggleDelete
                    }),
                    this.state.showEdit &&
                      this.props.permissions.manageFinancial &&
                      h.a.createElement(se, {
                        invoiceDetails: this.props.invoiceDetails,
                        errors: this.state.errors,
                        totalPrice: this.state.totalPrice,
                        invoiceProduct: this.state.invoiceProduct,
                        handleInputChange: this.handleInputChange,
                        handleInputChangeDate: this.handleInputChangeDate,
                        handleSubmit: this.handleSubmit,
                        cancelEdit: this.cancelEdit,
                        handleInputChangeVariablePrice: this
                          .handleInputChangeVariablePrice,
                        productVariablePrice:
                          "variable" ===
                          this.state.invoiceProduct.product.hasVariablePrice
                      }),
                    this.state.showDelete &&
                      this.props.permissions.manageFinancial &&
                      h.a.createElement(le, {
                        closeDeleteItemModal: this.toggleDelete,
                        id: this.state.invoiceProduct.id,
                        invoiceId: this.state.invoiceProduct.invoiceId
                      })
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        he = Object(v.b)(
          function(e) {
            return {
              permissions: e.meDetails.permissions,
              invoiceDetails: e.invoiceDetails
            };
          },
          function(e) {
            return {
              fetchInvoiceDetails: function(t) {
                e(Object(f.b)(t));
              }
            };
          }
        )(pe),
        ve = Object(v.b)(function(e) {
          return { invoiceProducts: e.invoiceDetails.invoiceProducts };
        })(function(e) {
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "row border header" },
              h.a.createElement(
                "div",
                { className: "col-sm-1" },
                "Productcode"
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-3" },
                "Productnaam"
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-3" },
                "Omschrijving"
              ),
              h.a.createElement("div", { className: "col-sm-2" }, "Aantal"),
              h.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Prijs incl. BTW"
              )
            ),
            e.invoiceProducts.length > 0
              ? e.invoiceProducts.map(function(e) {
                  return h.a.createElement(he, {
                    key: e.id,
                    invoiceProduct: e
                  });
                })
              : h.a.createElement("div", null, "Geen notaregels bekend.")
          );
        }),
        fe = a(696),
        ge = a(709);
      function be(e, t) {
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
      function Ee(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? be(Object(a), !0).forEach(function(t) {
                y()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : be(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function ye(e) {
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
      var Pe = (function(e) {
          s()(a, e);
          var t = ye(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(b()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Ee(
                    Ee({}, n.state),
                    {},
                    {
                      invoiceProduct: Ee(
                        Ee({}, n.state.invoiceProduct),
                        {},
                        y()({}, r, a)
                      )
                    }
                  ),
                  n.updatePrice
                );
              }),
              y()(b()(n), "handleInputChangeProduct", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Ee(
                    Ee({}, n.state),
                    {},
                    { product: Ee(Ee({}, n.state.product), {}, y()({}, r, a)) }
                  )
                );
              }),
              y()(b()(n), "handleInputChangeProductPrice", function(e) {
                var t,
                  a = e.target,
                  r = "checkbox" === a.type ? a.checked : a.value,
                  i = a.name;
                (t =
                  n.state.vatPercentage && "6" == n.state.vatPercentage.id
                    ? 1.06 * r
                    : n.state.vatPercentage && "9" == n.state.vatPercentage.id
                    ? 1.09 * r
                    : n.state.vatPercentage && "21" == n.state.vatPercentage.id
                    ? 1.21 * r
                    : r),
                  n.setState(
                    Ee(
                      Ee({}, n.state),
                      {},
                      {
                        price: t,
                        product: Ee(Ee({}, n.state.product), {}, y()({}, i, r))
                      }
                    ),
                    n.updatePrice
                  );
              }),
              y()(b()(n), "handleInputChangeProductVat", function(e) {
                var t,
                  a = e.target,
                  r = "checkbox" === a.type ? a.checked : a.value,
                  i = a.name;
                (t =
                  "6" == r
                    ? 1.06 * n.state.product.price
                    : "9" == r
                    ? 1.09 * n.state.product.price
                    : "21" == r
                    ? 1.21 * n.state.product.price
                    : n.state.product.price),
                  n.setState(
                    Ee(
                      Ee({}, n.state),
                      {},
                      {
                        price: t,
                        product: Ee(Ee({}, n.state.product), {}, y()({}, i, r))
                      }
                    ),
                    n.updatePrice
                  );
              }),
              y()(b()(n), "updatePrice", function() {
                var e = S.a.isFloat(n.state.price + "") ? n.state.price : 0,
                  t = S.a.isFloat(n.state.invoiceProduct.amount + "")
                    ? n.state.invoiceProduct.amount
                    : 0,
                  a = S.a.isFloat(
                    n.state.invoiceProduct.percentageReduction + ""
                  )
                    ? n.state.invoiceProduct.percentageReduction
                    : 0,
                  r = S.a.isFloat(n.state.invoiceProduct.amountReduction + "")
                    ? n.state.invoiceProduct.amountReduction
                    : 0,
                  i = 0;
                e < 0
                  ? (i = e * t * ((parseFloat(100) + parseFloat(a)) / 100) - r)
                  : (i = e * t * ((100 - a) / 100) - r);
                n.setState(
                  Ee(
                    Ee({}, n.state),
                    {},
                    {
                      price: parseFloat(e).toFixed(2),
                      totalPrice: parseFloat(i).toFixed(2)
                    }
                  )
                );
              }),
              y()(b()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.invoiceProduct,
                  a = {},
                  r = !1,
                  i = !1;
                S.a.isEmpty(t.amount + "") && ((a.amount = !0), (r = !0)),
                  S.a.isEmpty(t.dateLastInvoice + "") &&
                    ((a.dateLastInvoice = !0), (r = !0)),
                  S.a.isEmpty(t.description + "") &&
                    ((a.description = !0), (r = !0));
                var o = n.state.product,
                  c = !1;
                n.props.products.map(function(e) {
                  return e.code == o.code && (c = !0);
                }),
                  c &&
                    ((i = "Productcode moet uniek zijn."),
                    (a.code = !0),
                    (r = !0)),
                  S.a.isEmpty(o.code + "") && ((a.code = !0), (r = !0));
                var s = !1;
                n.props.products.map(function(e) {
                  return e.name == o.name && (s = !0);
                }),
                  s &&
                    ((i = "Productnaam moet uniek zijn."),
                    (a.name = !0),
                    (r = !0)),
                  c &&
                    s &&
                    (i = "Productcode en productnaam moeten uniek zijn."),
                  S.a.isEmpty(o.name + "") && ((a.name = !0), (r = !0)),
                  S.a.isEmpty(o.administrationId + "") &&
                    ((a.administrationId = !0), (r = !0)),
                  S.a.isEmpty(o.price + "") && ((a.price = !0), (r = !0)),
                  n.setState(
                    Ee(Ee({}, n.state), {}, { errors: a, errorMessage: i })
                  ),
                  !r &&
                    N.a.newProductAndInvoiceProduct(t, o).then(function(e) {
                      n.props.fetchInvoiceDetails(t.invoiceId),
                        n.props.toggleShowNewProduct();
                    });
              }),
              (n.state = {
                vatPercentages: [
                  { id: "0", name: "0" },
                  { id: "9", name: "9" },
                  { id: "21", name: "21" }
                ],
                errorMessage: !1,
                price: "0",
                totalPrice: "0",
                invoiceProduct: {
                  invoiceId: n.props.invoiceDetails.id,
                  description: "",
                  amount: 1,
                  amountReduction: 0,
                  percentageReduction: 0,
                  dateLastInvoice: O()().format("YYYY-MM-DD")
                },
                product: {
                  code: "",
                  name: "",
                  durationId: "none",
                  administrationId:
                    n.props.invoiceDetails.order.administrationId,
                  invoiceFrequencyId: "once",
                  vatPercentage: "",
                  price: "",
                  isOneTime: !1,
                  ledgerId: ""
                },
                errors: {
                  amount: !1,
                  dateLastInvoice: !1,
                  description: !1,
                  code: !1,
                  name: !1,
                  price: !1
                }
              }),
              (n.handleReactSelectChange = n.handleReactSelectChange.bind(
                b()(n)
              )),
              (n.handleInputChangeDate = n.handleInputChangeDate.bind(b()(n))),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "handleReactSelectChange",
                value: function(e, t) {
                  this.setState(
                    Ee(
                      Ee({}, this.state),
                      {},
                      {
                        product: Ee(
                          Ee({}, this.state.product),
                          {},
                          y()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "handleInputChangeDate",
                value: function(e, t) {
                  this.setState(
                    Ee(
                      Ee({}, this.state),
                      {},
                      {
                        invoiceProduct: Ee(
                          Ee({}, this.state.invoiceProduct),
                          {},
                          y()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.invoiceProduct,
                    t = e.description,
                    a = e.amount,
                    n = e.amountReduction,
                    r = e.percentageReduction,
                    i = e.dateLastInvoice,
                    o = this.state.product,
                    c = o.code,
                    s = o.name,
                    l = o.vatPercentage,
                    u = o.price,
                    d = o.ledgerId;
                  return h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      X.a,
                      { className: "panel-grey" },
                      h.a.createElement(
                        Z.a,
                        null,
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(
                            "div",
                            { className: "panel-heading" },
                            h.a.createElement(
                              "span",
                              { className: "h5 text-bold" },
                              "Product"
                            )
                          )
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(oe.a, {
                            label: "Productcode",
                            name: "code",
                            value: c,
                            onChangeAction: this.handleInputChangeProduct,
                            required: "required",
                            error: this.state.errors.code
                          }),
                          h.a.createElement(oe.a, {
                            label: "Naam",
                            name: "name",
                            value: s,
                            onChangeAction: this.handleInputChangeProduct,
                            required: "required",
                            error: this.state.errors.name
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(oe.a, {
                            label: "Prijs ex. BTW",
                            id: "price",
                            name: "price",
                            type: "number",
                            min: "0",
                            max: "1000000",
                            value: u,
                            onChangeAction: this.handleInputChangeProductPrice,
                            required: "required",
                            error: this.state.errors.price
                          }),
                          h.a.createElement(fe.a, {
                            label: "BTW percentage",
                            name: "vatPercentage",
                            options: this.state.vatPercentages,
                            value: l,
                            onChangeAction: this.handleInputChangeProductVat,
                            placeholder: "Geen"
                          })
                        ),
                        1 ==
                          this.props.invoiceDetails.order.administration
                            .usesTwinfield &&
                          1 ==
                            this.props.invoiceDetails.order.administration
                              .twinfieldIsValid &&
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(ge.a, {
                              label: "Grootboek",
                              name: "ledgerId",
                              options: this.props.ledgers,
                              optionName: "description",
                              value: d,
                              onChangeAction: this.handleReactSelectChange,
                              multi: !1
                            })
                          ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(
                            "div",
                            { className: "panel-part panel-heading" },
                            h.a.createElement(
                              "span",
                              { className: "h5 text-bold" },
                              "Notaregel"
                            )
                          )
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(oe.a, {
                            label: "Omschrijving",
                            id: "description",
                            name: "description",
                            value: t,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.description
                          }),
                          h.a.createElement(oe.a, {
                            label: "Aantal",
                            type: "number",
                            id: "amount",
                            name: "amount",
                            value: a,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.amount
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(oe.a, {
                            label: "Kortingspercentage",
                            type: "number",
                            id: "percentageReduction",
                            name: "percentageReduction",
                            value: r,
                            onChangeAction: this.handleInputChange
                          }),
                          h.a.createElement(oe.a, {
                            label: "Bedrag",
                            name: "price",
                            value:
                              "€" +
                              this.state.price.toLocaleString("nl", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              }),
                            readOnly: !0
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(oe.a, {
                            label: "Kortingsbedrag",
                            type: "number",
                            id: "amountReduction",
                            name: "amountReduction",
                            value: n,
                            onChangeAction: this.handleInputChange
                          }),
                          h.a.createElement(oe.a, {
                            label: "Totaalbedrag",
                            name: "totalPrice",
                            value:
                              "€" +
                              this.state.totalPrice.toLocaleString("nl", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              }),
                            readOnly: !0
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(k.a, {
                            label: "Begin datum",
                            name: "dateLastInvoice",
                            value: i,
                            onChangeAction: this.handleInputChangeDate,
                            required: "required",
                            error: this.state.errors.dateLastInvoice
                          })
                        ),
                        this.state.errorMessage &&
                          h.a.createElement(
                            "div",
                            {
                              className:
                                "col-sm-10 col-md-offset-1 alert alert-danger"
                            },
                            this.state.errorMessage
                          ),
                        h.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          h.a.createElement(ce.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNewProduct
                          }),
                          h.a.createElement(ce.a, {
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
        De = Object(v.b)(
          function(e) {
            return {
              invoiceDetails: e.invoiceDetails,
              administrationId: e.administrationDetails.id,
              productDurations: e.systemData.productDurations,
              productInvoiceFrequencies: e.systemData.productInvoiceFrequencies,
              productPaymentTypes: e.systemData.productPaymentTypes,
              products: e.systemData.products,
              ledgers: e.systemData.ledgers
            };
          },
          function(e) {
            return {
              fetchInvoiceDetails: function(t) {
                e(Object(f.b)(t));
              }
            };
          }
        )(Pe);
      function we(e, t) {
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
      function Ne(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? we(Object(a), !0).forEach(function(t) {
                y()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : we(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Ie(e) {
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
      var Oe = (function(e) {
          s()(a, e);
          var t = Ie(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(b()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Ne(
                    Ne({}, n.state),
                    {},
                    {
                      invoiceProduct: Ne(
                        Ne({}, n.state.invoiceProduct),
                        {},
                        y()({}, r, a)
                      )
                    }
                  ),
                  n.updatePrice
                );
              }),
              y()(b()(n), "handleInputChangeVariablePrice", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Ne(
                    Ne({}, n.state),
                    {},
                    {
                      price: a,
                      invoiceProduct: Ne(
                        Ne({}, n.state.invoiceProduct),
                        {},
                        y()({}, r, a)
                      )
                    }
                  ),
                  n.updatePrice
                );
              }),
              y()(b()(n), "updatePrice", function() {
                var e = S.a.isFloat(n.state.price + "") ? n.state.price : 0,
                  t = S.a.isFloat(n.state.invoiceProduct.amount + "")
                    ? n.state.invoiceProduct.amount
                    : 0,
                  a = S.a.isFloat(
                    n.state.invoiceProduct.percentageReduction + ""
                  )
                    ? n.state.invoiceProduct.percentageReduction
                    : 0,
                  r = S.a.isFloat(n.state.invoiceProduct.amountReduction + "")
                    ? n.state.invoiceProduct.amountReduction
                    : 0,
                  i = 0;
                e < 0
                  ? (i = e * t * ((parseFloat(100) + parseFloat(a)) / 100) - r)
                  : (i = e * t * ((100 - a) / 100) - r);
                n.setState(Ne(Ne({}, n.state), {}, { totalPrice: i }));
              }),
              y()(b()(n), "handleChangeProduct", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name,
                  i = "",
                  o = 0,
                  c = "";
                if (a) {
                  var s = n.props.products.filter(function(e) {
                    return e.id == a;
                  });
                  (o = s[0].priceInclVat),
                    (c = s[0].invoiceText),
                    (i = s[0].hasVariablePrice);
                }
                n.setState(
                  Ne(
                    Ne({}, n.state),
                    {},
                    {
                      price: o,
                      productHasVariablePrice: "variable" === i,
                      invoiceProduct: Ne(
                        Ne({}, n.state.invoiceProduct),
                        {},
                        y()({ description: c }, r, a)
                      )
                    }
                  ),
                  n.updatePrice
                );
              }),
              y()(b()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.invoiceProduct,
                  a = {},
                  r = !1;
                S.a.isEmpty(t.productId + "") && ((a.productId = !0), (r = !0)),
                  S.a.isEmpty(t.amount + "") && ((a.amount = !0), (r = !0)),
                  S.a.isEmpty(t.dateLastInvoice + "") &&
                    ((a.dateLastInvoice = !0), (r = !0)),
                  S.a.isEmpty(t.description + "") &&
                    ((a.description = !0), (r = !0)),
                  n.setState(Ne(Ne({}, n.state), {}, { errors: a })),
                  !r &&
                    N.a.newInvoiceProduct(t).then(function(e) {
                      n.props.fetchInvoiceDetails(t.invoiceId),
                        n.props.toggleShowNew();
                    });
              }),
              (n.state = {
                price: "0",
                totalPrice: "0",
                productHasVariablePrice: !1,
                invoiceProduct: {
                  invoiceId: n.props.invoiceDetails.id,
                  productId: "",
                  description: "",
                  amount: 1,
                  amountReduction: 0,
                  percentageReduction: 0,
                  dateLastInvoice: O()().format("YYYY-MM-DD"),
                  variablePrice: 0
                },
                errors: {
                  productId: !1,
                  amount: !1,
                  dateLastInvoice: !1,
                  description: !1
                }
              }),
              (n.handleInputChangeDate = n.handleInputChangeDate.bind(b()(n))),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "handleInputChangeDate",
                value: function(e, t) {
                  this.setState(
                    Ne(
                      Ne({}, this.state),
                      {},
                      {
                        invoiceProduct: Ne(
                          Ne({}, this.state.invoiceProduct),
                          {},
                          y()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.invoiceProduct,
                    t = e.productId,
                    a = e.description,
                    n = e.amount,
                    r = e.amountReduction,
                    i = e.percentageReduction,
                    o = e.dateLastInvoice;
                  return h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      X.a,
                      { className: "panel-grey" },
                      h.a.createElement(
                        Z.a,
                        null,
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(oe.a, {
                            label: "Order nummer",
                            name: "orderId",
                            value: this.props.invoiceDetails.number,
                            readOnly: !0
                          }),
                          h.a.createElement(fe.a, {
                            label: "Product",
                            id: "productId",
                            name: "productId",
                            options: this.props.products,
                            value: t,
                            onChangeAction: this.handleChangeProduct,
                            required: "required",
                            error: this.state.errors.productId
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(oe.a, {
                            label: "Omschrijving",
                            id: "description",
                            name: "description",
                            value: a,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.description
                          }),
                          h.a.createElement(oe.a, {
                            label: "Aantal",
                            type: "number",
                            id: "amount",
                            name: "amount",
                            value: n,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.amount
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(oe.a, {
                            label: "Kortingspercentage",
                            type: "number",
                            id: "percentageReduction",
                            name: "percentageReduction",
                            value: i,
                            onChangeAction: this.handleInputChange
                          }),
                          this.state.productHasVariablePrice
                            ? h.a.createElement(oe.a, {
                                label: "Prijs ex. BTW",
                                type: "number",
                                name: "variablePrice",
                                value: this.state.price,
                                onChangeAction: this
                                  .handleInputChangeVariablePrice
                              })
                            : h.a.createElement(oe.a, {
                                label: "Prijs incl. BTW",
                                name: "price",
                                value:
                                  "€" +
                                  this.state.price.toLocaleString("nl", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                  }),
                                readOnly: !0
                              })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(oe.a, {
                            label: "Kortingsbedrag",
                            type: "number",
                            id: "amountReduction",
                            name: "amountReduction",
                            value: r,
                            onChangeAction: this.handleInputChange
                          }),
                          h.a.createElement(oe.a, {
                            label: "Totaalbedrag",
                            name: "totalPrice",
                            value:
                              "€" +
                              this.state.totalPrice.toLocaleString("nl", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              }),
                            readOnly: !0
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(k.a, {
                            label: "Begin datum",
                            name: "dateLastInvoice",
                            value: o,
                            onChangeAction: this.handleInputChangeDate,
                            required: "required",
                            error: this.state.errors.dateLastInvoice
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          h.a.createElement(ce.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          h.a.createElement(ce.a, {
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
        Ce = Object(v.b)(
          function(e) {
            return {
              invoiceDetails: e.invoiceDetails,
              products: e.systemData.products
            };
          },
          function(e) {
            return {
              fetchInvoiceDetails: function(t) {
                e(Object(f.b)(t));
              }
            };
          }
        )(Oe);
      function Se(e, t) {
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
      function ke(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Se(Object(a), !0).forEach(function(t) {
                y()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Se(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Re(e) {
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
      var je = (function(e) {
          s()(a, e);
          var t = Re(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(b()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  ke(
                    ke({}, n.state),
                    {},
                    {
                      invoiceProduct: ke(
                        ke({}, n.state.invoiceProduct),
                        {},
                        y()({}, r, a)
                      )
                    }
                  ),
                  n.updatePrice
                );
              }),
              y()(b()(n), "handleInputChangeProduct", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  ke(
                    ke({}, n.state),
                    {},
                    { product: ke(ke({}, n.state.product), {}, y()({}, r, a)) }
                  )
                );
              }),
              y()(b()(n), "handleInputChangeProductPrice", function(e) {
                var t,
                  a = e.target,
                  r = "checkbox" === a.type ? a.checked : a.value,
                  i = a.name;
                (t =
                  n.state.vatPercentage && "6" == n.state.vatPercentage.id
                    ? 1.06 * r
                    : n.state.vatPercentage && "9" == n.state.vatPercentage.id
                    ? 1.09 * r
                    : n.state.vatPercentage && "21" == n.state.vatPercentage.id
                    ? 1.21 * r
                    : r),
                  n.setState(
                    ke(
                      ke({}, n.state),
                      {},
                      {
                        price: t,
                        product: ke(ke({}, n.state.product), {}, y()({}, i, r))
                      }
                    ),
                    n.updatePrice
                  );
              }),
              y()(b()(n), "handleInputChangeProductVat", function(e) {
                var t,
                  a = e.target,
                  r = "checkbox" === a.type ? a.checked : a.value,
                  i = a.name;
                (t =
                  "6" == r
                    ? 1.06 * n.state.product.price
                    : "9" == r
                    ? 1.09 * n.state.product.price
                    : "21" == r
                    ? 1.21 * n.state.product.price
                    : n.state.product.price),
                  n.setState(
                    ke(
                      ke({}, n.state),
                      {},
                      {
                        price: t,
                        product: ke(ke({}, n.state.product), {}, y()({}, i, r))
                      }
                    ),
                    n.updatePrice
                  );
              }),
              y()(b()(n), "updatePrice", function() {
                var e = S.a.isFloat(n.state.price + "") ? n.state.price : 0,
                  t = S.a.isFloat(n.state.invoiceProduct.amount + "")
                    ? n.state.invoiceProduct.amount
                    : 0,
                  a = S.a.isFloat(
                    n.state.invoiceProduct.percentageReduction + ""
                  )
                    ? n.state.invoiceProduct.percentageReduction
                    : 0,
                  r = S.a.isFloat(n.state.invoiceProduct.amountReduction + "")
                    ? n.state.invoiceProduct.amountReduction
                    : 0,
                  i = 0;
                e < 0
                  ? (i = e * t * ((parseFloat(100) + parseFloat(a)) / 100) - r)
                  : (i = e * t * ((100 - a) / 100) - r);
                n.setState(
                  ke(
                    ke({}, n.state),
                    {},
                    {
                      price: parseFloat(e).toFixed(2),
                      totalPrice: parseFloat(i).toFixed(2)
                    }
                  )
                );
              }),
              y()(b()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.invoiceProduct,
                  a = {},
                  r = !1;
                S.a.isEmpty(t.amount + "") && ((a.amount = !0), (r = !0)),
                  S.a.isEmpty(t.dateLastInvoice + "") &&
                    ((a.dateLastInvoice = !0), (r = !0)),
                  S.a.isEmpty(t.description + "") &&
                    ((a.description = !0), (r = !0));
                var i = n.state.product;
                S.a.isEmpty(i.administrationId + "") &&
                  ((a.administrationId = !0), (r = !0)),
                  S.a.isEmpty(i.price + "") && ((a.price = !0), (r = !0)),
                  n.setState(
                    ke(ke({}, n.state), {}, { errors: a, errorMessage: !1 })
                  ),
                  !r &&
                    N.a.newProductAndInvoiceProduct(t, i).then(function(e) {
                      n.props.fetchInvoiceDetails(t.invoiceId),
                        n.props.toggleShowNewProductOneTime();
                    });
              }),
              (n.state = {
                vatPercentages: [
                  { id: "0", name: "0" },
                  { id: "9", name: "9" },
                  { id: "21", name: "21" }
                ],
                errorMessage: !1,
                price: "0",
                totalPrice: "0",
                invoiceProduct: {
                  invoiceId: n.props.invoiceDetails.id,
                  description: "",
                  amount: 1,
                  amountReduction: 0,
                  percentageReduction: 0,
                  dateLastInvoice: O()().format("YYYY-MM-DD")
                },
                product: {
                  code: "EMP",
                  name: "Eenmalig product",
                  durationId: "none",
                  administrationId:
                    n.props.invoiceDetails.order.administrationId,
                  invoiceFrequencyId: "once",
                  vatPercentage: "",
                  price: "",
                  isOneTime: !0,
                  ledgerId: ""
                },
                errors: {
                  amount: !1,
                  dateLastInvoice: !1,
                  description: !1,
                  price: !1
                }
              }),
              (n.handleReactSelectChange = n.handleReactSelectChange.bind(
                b()(n)
              )),
              (n.handleInputChangeDate = n.handleInputChangeDate.bind(b()(n))),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "handleReactSelectChange",
                value: function(e, t) {
                  this.setState(
                    ke(
                      ke({}, this.state),
                      {},
                      {
                        product: ke(
                          ke({}, this.state.product),
                          {},
                          y()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "handleInputChangeDate",
                value: function(e, t) {
                  this.setState(
                    ke(
                      ke({}, this.state),
                      {},
                      {
                        invoiceProduct: ke(
                          ke({}, this.state.invoiceProduct),
                          {},
                          y()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.invoiceProduct,
                    t = e.description,
                    a = e.amount,
                    n = e.amountReduction,
                    r = e.percentageReduction,
                    i = e.dateLastInvoice,
                    o = this.state.product,
                    c = o.vatPercentage,
                    s = o.price,
                    l = o.ledgerId;
                  return h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      X.a,
                      { className: "panel-grey" },
                      h.a.createElement(
                        Z.a,
                        null,
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(
                            "div",
                            { className: "panel-heading" },
                            h.a.createElement(
                              "span",
                              { className: "h5 text-bold" },
                              "Product"
                            )
                          )
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(oe.a, {
                            label: "Prijs ex. BTW",
                            id: "price",
                            name: "price",
                            type: "number",
                            min: "0",
                            max: "1000000",
                            value: s,
                            onChangeAction: this.handleInputChangeProductPrice,
                            required: "required",
                            error: this.state.errors.price
                          }),
                          h.a.createElement(fe.a, {
                            label: "BTW percentage",
                            name: "vatPercentage",
                            options: this.state.vatPercentages,
                            value: c,
                            onChangeAction: this.handleInputChangeProductVat,
                            placeholder: "Geen"
                          })
                        ),
                        1 ==
                          this.props.invoiceDetails.order.administration
                            .usesTwinfield &&
                          1 ==
                            this.props.invoiceDetails.order.administration
                              .twinfieldIsValid &&
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(ge.a, {
                              label: "Grootboek",
                              name: "ledgerId",
                              options: this.props.ledgers,
                              optionName: "description",
                              value: l,
                              onChangeAction: this.handleReactSelectChange,
                              multi: !1
                            })
                          ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(
                            "div",
                            { className: "panel-part panel-heading" },
                            h.a.createElement(
                              "span",
                              { className: "h5 text-bold" },
                              "Notaregel"
                            )
                          )
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(oe.a, {
                            label: "Omschrijving",
                            id: "description",
                            name: "description",
                            value: t,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.description
                          }),
                          h.a.createElement(oe.a, {
                            label: "Aantal",
                            type: "number",
                            id: "amount",
                            name: "amount",
                            value: a,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.amount
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(oe.a, {
                            label: "Kortingspercentage",
                            type: "number",
                            id: "percentageReduction",
                            name: "percentageReduction",
                            value: r,
                            onChangeAction: this.handleInputChange
                          }),
                          h.a.createElement(oe.a, {
                            label: "Bedrag",
                            name: "price",
                            value:
                              "€" +
                              this.state.price.toLocaleString("nl", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              }),
                            readOnly: !0
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(oe.a, {
                            label: "Kortingsbedrag",
                            type: "number",
                            id: "amountReduction",
                            name: "amountReduction",
                            value: n,
                            onChangeAction: this.handleInputChange
                          }),
                          h.a.createElement(oe.a, {
                            label: "Totaalbedrag",
                            name: "totalPrice",
                            value:
                              "€" +
                              this.state.totalPrice.toLocaleString("nl", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              }),
                            readOnly: !0
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(k.a, {
                            label: "Begin datum",
                            name: "dateLastInvoice",
                            value: i,
                            onChangeAction: this.handleInputChangeDate,
                            required: "required",
                            error: this.state.errors.dateLastInvoice
                          })
                        ),
                        this.state.errorMessage &&
                          h.a.createElement(
                            "div",
                            {
                              className:
                                "col-sm-10 col-md-offset-1 alert alert-danger"
                            },
                            this.state.errorMessage
                          ),
                        h.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          h.a.createElement(ce.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props
                              .toggleShowNewProductOneTime
                          }),
                          h.a.createElement(ce.a, {
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
        Ae = Object(v.b)(
          function(e) {
            return {
              invoiceDetails: e.invoiceDetails,
              administrationId: e.administrationDetails.id,
              productDurations: e.systemData.productDurations,
              productInvoiceFrequencies: e.systemData.productInvoiceFrequencies,
              productPaymentTypes: e.systemData.productPaymentTypes,
              products: e.systemData.products,
              ledgers: e.systemData.ledgers
            };
          },
          function(e) {
            return {
              fetchInvoiceDetails: function(t) {
                e(Object(f.b)(t));
              }
            };
          }
        )(je);
      function Le(e) {
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
      var xe = (function(e) {
          s()(a, e);
          var t = Le(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(b()(n), "toggleShowNew", function() {
                n.setState({ showNew: !n.state.showNew });
              }),
              y()(b()(n), "toggleShowNewProduct", function() {
                n.setState({ showNewProduct: !n.state.showNewProduct });
              }),
              y()(b()(n), "toggleShowNewProductOneTime", function() {
                n.setState({
                  showNewProductOneTime: !n.state.showNewProductOneTime
                });
              }),
              (n.state = {
                showNew: !1,
                showNewProduct: !1,
                showNewProductOneTime: !1
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
                    X.a,
                    null,
                    h.a.createElement(
                      ne.a,
                      null,
                      h.a.createElement(
                        "div",
                        { className: "row" },
                        h.a.createElement(
                          "div",
                          { className: "col-xs-10" },
                          h.a.createElement(
                            "span",
                            { className: "h5 text-bold" },
                            "Notaregels"
                          )
                        ),
                        this.props.permissions.manageFinancial &&
                          "to-send" == this.props.invoice.statusId &&
                          h.a.createElement(
                            "div",
                            { className: "col-xs-2" },
                            h.a.createElement(
                              "div",
                              { className: "pull-right" },
                              h.a.createElement("span", {
                                className: "glyphicon glyphicon-plus",
                                "data-toggle": "dropdown",
                                role: "button"
                              }),
                              h.a.createElement(
                                "ul",
                                { className: "dropdown-menu" },
                                h.a.createElement(
                                  "li",
                                  null,
                                  h.a.createElement(
                                    "a",
                                    {
                                      className: "btn",
                                      onClick: this.toggleShowNew
                                    },
                                    "Bestaand product"
                                  )
                                ),
                                h.a.createElement(
                                  "li",
                                  null,
                                  h.a.createElement(
                                    "a",
                                    {
                                      className: "btn",
                                      onClick: this.toggleShowNewProduct
                                    },
                                    "Nieuw product"
                                  )
                                ),
                                h.a.createElement(
                                  "li",
                                  null,
                                  h.a.createElement(
                                    "a",
                                    {
                                      className: "btn",
                                      onClick: this.toggleShowNewProductOneTime
                                    },
                                    "Nieuw eenmalig product"
                                  )
                                )
                              )
                            )
                          )
                      )
                    ),
                    h.a.createElement(
                      Z.a,
                      null,
                      h.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        h.a.createElement(ve, null)
                      ),
                      h.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          h.a.createElement(Ce, {
                            toggleShowNew: this.toggleShowNew
                          }),
                        this.state.showNewProduct &&
                          h.a.createElement(De, {
                            toggleShowNewProduct: this.toggleShowNewProduct
                          }),
                        this.state.showNewProductOneTime &&
                          h.a.createElement(Ae, {
                            toggleShowNewProductOneTime: this
                              .toggleShowNewProductOneTime
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
        Te = Object(v.b)(function(e) {
          return {
            permissions: e.meDetails.permissions,
            invoice: e.invoiceDetails
          };
        })(xe);
      O.a.locale("nl");
      var Me = Object(v.b)(function(e) {
        return { permissions: e.meDetails.permissions };
      })(function(e) {
        var t = e.payment,
          a = t.datePaid,
          n = t.amount,
          r = t.createdAt;
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
            { onClick: e.openEdit },
            h.a.createElement(
              "div",
              { className: "col-sm-4" },
              a ? O()(a).format("L") : ""
            ),
            h.a.createElement(
              "div",
              { className: "col-sm-3" },
              n
                ? "€" +
                    n.toLocaleString("nl", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })
                : "€0,00"
            ),
            h.a.createElement(
              "div",
              { className: "col-sm-4" },
              r ? O()(r).format("L") : ""
            )
          ),
          h.a.createElement(
            "div",
            { className: "col-sm-1" },
            e.showActionButtons && e.permissions.manageFinancial
              ? h.a.createElement(
                  "a",
                  { role: "button", onClick: e.openEdit },
                  h.a.createElement("span", {
                    className: "glyphicon glyphicon-pencil mybtn-success"
                  }),
                  " "
                )
              : "",
            e.showActionButtons && e.permissions.manageFinancial
              ? h.a.createElement(
                  "a",
                  { role: "button", onClick: e.toggleDelete },
                  h.a.createElement("span", {
                    className: "glyphicon glyphicon-trash mybtn-danger"
                  }),
                  " "
                )
              : ""
          )
        );
      });
      O.a.locale("nl");
      var Fe = function(e) {
          var t = e.payment,
            a = t.amount,
            n = t.datePaid;
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "form",
              { className: "form-horizontal", onSubmit: e.handleSubmit },
              h.a.createElement(
                X.a,
                { className: "panel-grey" },
                h.a.createElement(
                  Z.a,
                  null,
                  h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(oe.a, {
                      label: "Bedrag",
                      id: "amount",
                      name: "amount",
                      value: a,
                      onChangeAction: e.handleInputChange,
                      required: "required",
                      error: e.errors.amount
                    }),
                    h.a.createElement(k.a, {
                      label: "Datum betaald",
                      name: "datePaid",
                      value: n,
                      onChangeAction: e.handleInputChangeDate,
                      required: "required",
                      error: e.errors.datePaid
                    })
                  ),
                  h.a.createElement(
                    "div",
                    { className: "pull-right btn-group", role: "group" },
                    h.a.createElement(ce.a, {
                      buttonClassName: "btn-default",
                      buttonText: "Annuleren",
                      onClickAction: e.cancelEdit
                    }),
                    h.a.createElement(ce.a, {
                      buttonText: "Opslaan",
                      onClickAction: e.handleSubmit,
                      type: "submit",
                      value: "Submit"
                    })
                  )
                )
              )
            )
          );
        },
        qe = Object(v.b)(null, function(e) {
          return {
            fetchInvoiceDetails: function(t) {
              e(Object(f.b)(t));
            }
          };
        })(function(e) {
          return h.a.createElement(
            w.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                N.a.deletePayment(e.id).then(function(t) {
                  e.fetchInvoiceDetails(e.invoiceId), e.closeDeleteItemModal();
                });
              },
              title: "Verwijderen"
            },
            h.a.createElement("p", null, "Verwijder betaling?")
          );
        });
      function Be(e, t) {
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
      function Ve(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Be(Object(a), !0).forEach(function(t) {
                y()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Be(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function ze(e) {
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
      var Ye = (function(e) {
          s()(a, e);
          var t = ze(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(b()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              y()(b()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              y()(b()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              y()(b()(n), "openEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              y()(b()(n), "closeEdit", function() {
                n.setState({ showEdit: !1 });
              }),
              y()(b()(n), "cancelEdit", function() {
                n.setState(
                  Ve(Ve({}, n.state), {}, { payment: Ve({}, n.props.payment) })
                ),
                  n.closeEdit();
              }),
              y()(b()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Ve(
                    Ve({}, n.state),
                    {},
                    { payment: Ve(Ve({}, n.state.payment), {}, y()({}, r, a)) }
                  )
                );
              }),
              y()(b()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = {},
                  a = !1,
                  r = n.state.payment;
                S.a.isEmpty(r.amount + "") && ((t.amount = !0), (a = !0)),
                  S.a.isEmpty(r.datePaid + "") && ((t.datePaid = !0), (a = !0)),
                  n.setState(Ve(Ve({}, n.state), {}, { errors: t })),
                  !a &&
                    N.a.updatePayment(r).then(function(e) {
                      n.props.fetchInvoiceDetails(n.state.payment.invoiceId),
                        n.closeEdit();
                    });
              }),
              (n.state = {
                showActionButtons: !1,
                highlightLine: "",
                showEdit: !1,
                showDelete: !1,
                payment: Ve({}, e.payment),
                errors: { amount: !1, datePaid: !1 }
              }),
              (n.handleInputChangeDate = n.handleInputChangeDate.bind(b()(n))),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  Object(J.isEqual)(this.state.payment, e.payment) ||
                    this.setState(
                      Ve(Ve({}, this.state), {}, { payment: Ve({}, e.payment) })
                    );
                }
              },
              {
                key: "handleInputChangeDate",
                value: function(e, t) {
                  this.setState(
                    Ve(
                      Ve({}, this.state),
                      {},
                      {
                        payment: Ve(
                          Ve({}, this.state.payment),
                          {},
                          y()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    "div",
                    null,
                    h.a.createElement(Me, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      openEdit: this.openEdit,
                      toggleDelete: this.toggleDelete,
                      payment: this.state.payment
                    }),
                    !this.props.invoiceInTwinfield &&
                      this.state.showEdit &&
                      this.props.permissions.manageFinancial &&
                      h.a.createElement(Fe, {
                        errors: this.state.errors,
                        payment: this.state.payment,
                        handleInputChange: this.handleInputChange,
                        handleInputChangeDate: this.handleInputChangeDate,
                        handleSubmit: this.handleSubmit,
                        cancelEdit: this.cancelEdit
                      }),
                    !this.props.invoiceInTwinfield &&
                      this.state.showDelete &&
                      this.props.permissions.manageFinancial &&
                      h.a.createElement(qe, {
                        closeDeleteItemModal: this.toggleDelete,
                        id: this.state.payment.id,
                        invoiceId: this.state.payment.invoiceId
                      })
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        We = Object(v.b)(
          function(e) {
            return {
              permissions: e.meDetails.permissions,
              invoiceInTwinfield: e.invoiceDetails.invoiceInTwinfield
            };
          },
          function(e) {
            return {
              fetchInvoiceDetails: function(t) {
                e(Object(f.b)(t));
              }
            };
          }
        )(Ye),
        Ge = Object(v.b)(function(e) {
          return { payments: e.invoiceDetails.payments };
        })(function(e) {
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "row border header" },
              h.a.createElement(
                "div",
                { className: "col-sm-4" },
                "Datum betaald"
              ),
              h.a.createElement("div", { className: "col-sm-3" }, "Bedrag"),
              h.a.createElement(
                "div",
                { className: "col-sm-4" },
                "Datum aangemaakt"
              ),
              h.a.createElement("div", { className: "col-sm-1" })
            ),
            e.payments.length > 0
              ? e.payments.map(function(e) {
                  return h.a.createElement(We, { key: e.id, payment: e });
                })
              : h.a.createElement("div", null, "Geen betalingen bekend.")
          );
        });
      function _e(e, t) {
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
      function Ke(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? _e(Object(a), !0).forEach(function(t) {
                y()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : _e(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Ue(e) {
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
      var He = (function(e) {
          s()(a, e);
          var t = Ue(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(b()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Ke(
                    Ke({}, n.state),
                    {},
                    { payment: Ke(Ke({}, n.state.payment), {}, y()({}, r, a)) }
                  )
                );
              }),
              y()(b()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.payment,
                  a = {},
                  r = !1;
                S.a.isEmpty(t.amount + "") && ((a.amount = !0), (r = !0)),
                  S.a.isEmpty(t.datePaid + "") && ((a.datePaid = !0), (r = !0)),
                  n.setState(Ke(Ke({}, n.state), {}, { errors: a })),
                  !r &&
                    N.a.newPayment(t).then(function(e) {
                      n.props.fetchInvoiceDetails(t.invoiceId),
                        n.props.toggleShowNew();
                    });
              }),
              (n.state = {
                payment: {
                  invoiceId: n.props.invoiceDetails.id,
                  amount: "",
                  datePaid: O()()
                },
                errors: { amount: !1, datePaid: !1 }
              }),
              (n.handleInputChangeDate = n.handleInputChangeDate.bind(b()(n))),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "handleInputChangeDate",
                value: function(e, t) {
                  this.setState(
                    Ke(
                      Ke({}, this.state),
                      {},
                      {
                        payment: Ke(
                          Ke({}, this.state.payment),
                          {},
                          y()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.payment,
                    t = e.amount,
                    a = e.datePaid;
                  return h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      X.a,
                      { className: "panel-grey" },
                      h.a.createElement(
                        Z.a,
                        null,
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(oe.a, {
                            label: "Bedrag",
                            id: "amount",
                            name: "amount",
                            value: t,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.amount
                          }),
                          h.a.createElement(k.a, {
                            label: "Datum betaald",
                            name: "datePaid",
                            value: a,
                            onChangeAction: this.handleInputChangeDate,
                            required: "required",
                            error: this.state.errors.datePaid
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          h.a.createElement(ce.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          h.a.createElement(ce.a, {
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
        Je = Object(v.b)(
          function(e) {
            return { invoiceDetails: e.invoiceDetails };
          },
          function(e) {
            return {
              fetchInvoiceDetails: function(t) {
                e(Object(f.b)(t));
              }
            };
          }
        )(He);
      function Qe(e) {
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
      var Xe = (function(e) {
          s()(a, e);
          var t = Qe(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(b()(n), "toggleShowNew", function() {
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
                    X.a,
                    null,
                    h.a.createElement(
                      ne.a,
                      null,
                      h.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Betalingen"
                      ),
                      !this.props.invoiceInTwinfield &&
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
                      Z.a,
                      null,
                      h.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        h.a.createElement(Ge, null)
                      ),
                      h.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          h.a.createElement(Je, {
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
        Ze = Object(v.b)(function(e) {
          return {
            permissions: e.meDetails.permissions,
            invoiceInTwinfield: e.invoiceDetails.invoiceInTwinfield
          };
        })(Xe);
      function $e(e) {
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
      O.a.locale("nl");
      var et = (function(e) {
          s()(a, e);
          var t = $e(a);
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
                      ? (e = "Fout bij het ophalen van nota.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : Object(J.isEmpty)(this.props.invoiceDetails)
                      ? (e = "Geen nota gevonden!")
                      : (t = !1),
                    t
                      ? h.a.createElement("div", null, e)
                      : h.a.createElement(
                          "div",
                          null,
                          h.a.createElement(te, null),
                          h.a.createElement(Te, null),
                          h.a.createElement(Ze, null),
                          h.a.createElement(re, null)
                        )
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        tt = Object(v.b)(function(e) {
          return {
            invoiceDetails: e.invoiceDetails,
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        })(et);
      function at(e) {
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
      var nt = (function(e) {
          s()(a, e);
          var t = at(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(b()(n), "openItem", function(e) {
                P.f.push("/taak/".concat(e));
              }),
              (n.state = { relatedTasks: "" }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedTasks;
                  return h.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      h.a.createElement(
                        "div",
                        null,
                        "Geen taken of notities gevonden."
                      ),
                    "" != t &&
                      h.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        h.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return h.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: a
                              },
                              h.a.createElement(
                                "td",
                                { className: "col-xs-12 clickable" },
                                O()(t.createdAt).format("L"),
                                " - ",
                                t.noteSummary
                              )
                            );
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
        rt = Object(v.b)(function(e) {
          return { relatedTasks: e.invoiceDetails.relatedTasks };
        })(nt),
        it = Object(v.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showTasksList,
            n = e.newTask,
            r = e.taskCount,
            i = e.permissions;
          return h.a.createElement(
            X.a,
            { className: "harmonica-button" },
            h.a.createElement(
              Z.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                h.a.createElement(
                  "span",
                  null,
                  "TAKEN/NOTITIES ",
                  h.a.createElement("span", { className: "badge" }, r)
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-2" },
                i.manageTask &&
                  h.a.createElement(
                    "div",
                    { className: "pull-right" },
                    h.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white",
                      "data-toggle": "dropdown",
                      role: "button"
                    }),
                    h.a.createElement(
                      "ul",
                      { className: "dropdown-menu" },
                      h.a.createElement(
                        "li",
                        null,
                        h.a.createElement(
                          "a",
                          {
                            className: "btn",
                            onClick: function() {
                              return n("open");
                            }
                          },
                          "Maak taak"
                        )
                      ),
                      h.a.createElement(
                        "li",
                        null,
                        h.a.createElement(
                          "a",
                          {
                            className: "btn",
                            onClick: function() {
                              return n("afgehandeld");
                            }
                          },
                          "Maak notitie"
                        )
                      )
                    )
                  )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && h.a.createElement(rt, null)
              )
            )
          );
        });
      function ot(e) {
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
      var ct = (function(e) {
          s()(a, e);
          var t = ot(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(b()(n), "openItem", function(e) {
                P.f.push("/email/".concat(e));
              }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedEmails;
                  return h.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      h.a.createElement("div", null, "Geen e-mails gevonden."),
                    "" != t &&
                      h.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        h.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return h.a.createElement(
                              "tr",
                              { key: a },
                              h.a.createElement(
                                "td",
                                {
                                  className: "col-xs-4 clickable",
                                  onClick: function() {
                                    return e.openItem(t.id);
                                  }
                                },
                                O()(t.date_sent).format("L")
                              ),
                              h.a.createElement(
                                "td",
                                {
                                  className: "col-xs-8 clickable",
                                  onClick: function() {
                                    return e.openItem(t.id);
                                  }
                                },
                                t.subject
                              )
                            );
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
        st = Object(v.b)(function(e) {
          return { relatedEmails: e.invoiceDetails.relatedEmails };
        })(ct),
        lt = function(e) {
          var t = e.toggleShowList,
            a = e.showEmailsList,
            n = e.newEmail,
            r = e.emailCount;
          return h.a.createElement(
            X.a,
            { className: "harmonica-button" },
            h.a.createElement(
              Z.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                h.a.createElement(
                  "span",
                  { onClick: t, className: "" },
                  "E-MAILS ",
                  h.a.createElement("span", { className: "badge" }, r)
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-2" },
                h.a.createElement(
                  "a",
                  { role: "button", className: "pull-right", onClick: n },
                  h.a.createElement("span", {
                    className: "glyphicon glyphicon-plus glyphicon-white"
                  })
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && h.a.createElement(st, null)
              )
            )
          );
        };
      function ut(e, t) {
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
      function dt(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ut(Object(a), !0).forEach(function(t) {
                y()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : ut(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function mt(e) {
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
      var pt = (function(e) {
          s()(a, e);
          var t = mt(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(b()(n), "newTask", function(e) {
                P.f.push(
                  "/taak/nieuw/"
                    .concat(e, "/nota/")
                    .concat(n.props.invoiceDetails.id)
                );
              }),
              y()(b()(n), "newEmail", function() {
                P.f.push("/email/nieuw");
              }),
              (n.state = { toggleShowList: { tasks: !1, emails: !1 } }),
              (n.toggleShowList = n.toggleShowList.bind(b()(n))),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  this.props.id !== e.id &&
                    this.setState({
                      toggleShowList: { tasks: !1, emails: !1 }
                    });
                }
              },
              {
                key: "toggleShowList",
                value: function(e) {
                  this.setState(
                    dt(
                      dt({}, this.state),
                      {},
                      {
                        toggleShowList: dt(
                          dt({}, this.state.toggleShowList),
                          {},
                          y()({}, e, !this.state.toggleShowList[e])
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this;
                  return h.a.createElement(
                    "div",
                    { className: "margin-10-top" },
                    h.a.createElement(it, {
                      toggleShowList: function() {
                        return e.toggleShowList("tasks");
                      },
                      showTasksList: this.state.toggleShowList.tasks,
                      taskCount: this.props.invoiceDetails.taskCount,
                      newTask: this.newTask
                    }),
                    h.a.createElement(lt, {
                      toggleShowList: function() {
                        return e.toggleShowList("emails");
                      },
                      showEmailsList: this.state.toggleShowList.emails,
                      newEmail: this.newEmail,
                      emailCount: this.props.invoiceDetails.emailCount
                    })
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        ht = Object(v.b)(function(e) {
          return {
            invoiceDetails: e.invoiceDetails,
            permissions: e.meDetails.permissions
          };
        }, null)(pt);
      function vt(e) {
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
      var ft = (function(e) {
        s()(a, e);
        var t = vt(a);
        function a(e) {
          return r()(this, a), t.call(this, e);
        }
        return (
          o()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchInvoiceDetails(this.props.params.id);
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
                        X.a,
                        null,
                        h.a.createElement(
                          Z.a,
                          { className: "panel-small" },
                          h.a.createElement(H, null)
                        )
                      )
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      h.a.createElement(tt, null)
                    )
                  ),
                  h.a.createElement(
                    X.a,
                    { className: "col-md-3 harmonica" },
                    h.a.createElement(Z.a, null, h.a.createElement(ht, null))
                  )
                );
              }
            }
          ]),
          a
        );
      })(p.Component);
      t.default = Object(v.b)(
        function(e) {
          return { invoiceDetails: e.invoiceDetails };
        },
        function(e) {
          return {
            fetchInvoiceDetails: function(t) {
              e(Object(f.b)(t));
            }
          };
        }
      )(ft);
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
            s = e.loadText,
            l = e.disabled;
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
                s
              )
            : r.a.createElement(
                "button",
                {
                  type: i,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: o,
                  disabled: l
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
            s = e.name,
            l = e.value,
            u = e.onClickAction,
            d = e.onChangeAction,
            m = e.onBlurAction,
            p = e.required,
            h = e.readOnly,
            v = e.maxLength,
            f = e.error,
            g = e.min,
            b = e.max,
            E = e.step,
            y = e.errorMessage,
            P = e.divSize,
            D = e.divClassName,
            w = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(P, " ").concat(D) },
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
                  "form-control input-sm ".concat(n) + (f ? "has-error" : ""),
                id: o,
                placeholder: c,
                name: s,
                value: l,
                onClick: u,
                onChange: d,
                onBlur: m,
                readOnly: h,
                maxLength: v,
                min: g,
                max: b,
                autoComplete: w,
                step: E
              })
            ),
            f &&
              r.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                r.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  y
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
        s = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            o = e.value,
            c = e.link,
            s = e.hidden;
          return c.length > 0
            ? r.a.createElement(
                "div",
                { className: a, style: s ? { display: "none" } : {} },
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
                { className: a, style: s ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement("div", { className: "col-sm-6", id: n }, o)
              );
        };
      (s.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (s.propTypes = {
          label: c.a.oneOfType([c.a.string, c.a.object]).isRequired,
          className: c.a.string,
          id: c.a.string,
          value: c.a.oneOfType([c.a.string, c.a.number]),
          link: c.a.string,
          hidden: c.a.bool
        }),
        (t.a = s);
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
            s = e.options,
            l = e.onChangeAction,
            u = e.onBlurAction,
            d = e.required,
            m = e.error,
            p = e.errorMessage,
            h = e.optionValue,
            v = e.optionName,
            f = e.readOnly,
            g = e.placeholder,
            b = e.divClassName,
            E = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(b) },
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
                  onChange: l,
                  onBlur: u,
                  readOnly: f
                },
                E && r.a.createElement("option", { value: "" }, g),
                s.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[h], value: e[h] },
                    e[v]
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
        s = a.n(c),
        l = a(26),
        u = a.n(l),
        d = a(27),
        m = a.n(d),
        p = a(16),
        h = a.n(p),
        v = a(6),
        f = a.n(v),
        g = a(0),
        b = a.n(g),
        E = a(8),
        y = a.n(E),
        P = a(707),
        D = a.n(P),
        w = a(708),
        N = a.n(w),
        I = a(7),
        O = a.n(I);
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
          var a,
            n = h()(e);
          if (t) {
            var r = h()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return m()(this, a);
        };
      }
      O.a.locale("nl");
      var S = (function(e) {
        u()(a, e);
        var t = C(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            f()(s()(n), "validateDate", function(e) {
              var t = O()(e.target.value, "DD-MM-YYYY", !0),
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
            f()(s()(n), "onDateChange", function(e) {
              var t = e ? O()(e).format("Y-MM-DD") : "",
                a = !1;
              t &&
                n.props.disabledBefore &&
                O()(t).isBefore(n.props.disabledBefore) &&
                (a = !0),
                t &&
                  n.props.disabledAfter &&
                  O()(t).isAfter(n.props.disabledAfter) &&
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
                  s = e.readOnly,
                  l = e.name,
                  u = e.error,
                  d = e.errorMessage,
                  m = e.disabledBefore,
                  p = e.disabledAfter,
                  h = o ? O()(o).format("L") : "",
                  v = {};
                return (
                  m && (v.before = new Date(m)),
                  p && (v.after = new Date(p)),
                  b.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    b.a.createElement(
                      "div",
                      null,
                      b.a.createElement(
                        "label",
                        { htmlFor: i, className: "col-sm-6 ".concat(c) },
                        t
                      )
                    ),
                    b.a.createElement(
                      "div",
                      { className: "".concat(n) },
                      b.a.createElement(D.a, {
                        id: i,
                        value: h,
                        formatDate: w.formatDate,
                        parseDate: w.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: N.a,
                          disabledDays: v
                        },
                        inputProps: {
                          className:
                            "form-control input-sm ".concat(a) +
                            (this.state.errorDateFormat || u
                              ? " has-error"
                              : ""),
                          name: l,
                          onBlur: this.validateDate,
                          autoComplete: "off",
                          readOnly: s,
                          disabled: s
                        },
                        required: c,
                        readOnly: s,
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
          a
        );
      })(g.Component);
      (S.defaultProps = {
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
        (S.propTypes = {
          label: y.a.string.isRequired,
          type: y.a.string,
          className: y.a.string,
          size: y.a.string,
          divSize: y.a.string,
          id: y.a.string,
          name: y.a.string,
          value: y.a.oneOfType([y.a.string, y.a.object]),
          onChangeAction: y.a.func,
          required: y.a.string,
          readOnly: y.a.bool,
          error: y.a.bool,
          errorMessage: y.a.string,
          disabledBefore: y.a.string,
          disabledAfter: y.a.string
        }),
        (t.a = S);
    },
    709: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        c = a(714),
        s =
          (a(715),
          function(e) {
            var t = e.label,
              a = e.divSize,
              n = e.size,
              i = e.id,
              o = e.name,
              s = e.value,
              l = e.options,
              u = e.optionId,
              d = e.optionName,
              m = e.onChangeAction,
              p = e.required,
              h = e.multi,
              v = e.error,
              f = e.isLoading;
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
                  value: s,
                  onChange: function(e) {
                    m(e || "", o);
                  },
                  options: l,
                  valueKey: u,
                  labelKey: d,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: h,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: v ? " has-error" : "",
                  isLoading: f
                })
              )
            );
          });
      (s.defaultProps = {
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
        (s.propTypes = {
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
        (t.a = s);
    },
    711: function(e, t) {
      e.exports = function(e, t, a, n) {
        var r = new Blob(void 0 !== n ? [n, e] : [e], {
          type: a || "application/octet-stream"
        });
        if (void 0 !== window.navigator.msSaveBlob)
          window.navigator.msSaveBlob(r, t);
        else {
          var i =
              window.URL && window.URL.createObjectURL
                ? window.URL.createObjectURL(r)
                : window.webkitURL.createObjectURL(r),
            o = document.createElement("a");
          (o.style.display = "none"),
            (o.href = i),
            o.setAttribute("download", t),
            void 0 === o.download && o.setAttribute("target", "_blank"),
            document.body.appendChild(o),
            o.click(),
            setTimeout(function() {
              document.body.removeChild(o), window.URL.revokeObjectURL(i);
            }, 200);
        }
      };
    },
    729: function(e, t, a) {
      "use strict";
      a.d(t, "b", function() {
        return n;
      }),
        a.d(t, "a", function() {
          return r;
        });
      var n = function(e) {
          return { type: "FETCH_INVOICE_DETAILS", id: e };
        },
        r = function(e) {
          return { type: "DELETE_INVOICE", id: e };
        };
    },
    807: function(e, t, a) {
      "use strict";
      a.d(t, "d", function() {
        return n;
      }),
        a.d(t, "e", function() {
          return r;
        }),
        a.d(t, "b", function() {
          return i;
        }),
        a.d(t, "a", function() {
          return o;
        }),
        a.d(t, "c", function() {
          return c;
        });
      var n = function(e, t, a, n, r, i) {
          return {
            type: "FETCH_INVOICES",
            filters: e,
            sorts: t,
            pagination: a,
            administrationId: n,
            onlyEmailInvoices: r,
            onlyPostInvoices: i
          };
        },
        r = function(e) {
          return { type: "INVOICE_PREVIEW_SEND", data: e };
        },
        i = function() {
          return { type: "CLEAR_INVOICE_PREVIEW_SEND" };
        },
        o = function() {
          return { type: "CLEAR_INVOICES" };
        },
        c = function(e) {
          return { type: "DELETE_INVOICE_FROM_GRID", id: e };
        };
    }
  }
]);
