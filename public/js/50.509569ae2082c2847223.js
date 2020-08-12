(window.webpackJsonp = window.webpackJsonp || []).push([
  [50],
  {
    1419: function(e, t, a) {
      "use strict";
      a.r(t);
      var r = a(24),
        n = a.n(r),
        o = a(25),
        i = a.n(o),
        c = a(26),
        s = a.n(c),
        l = a(27),
        d = a.n(l),
        u = a(16),
        m = a.n(u),
        p = a(0),
        h = a.n(p),
        f = a(32),
        g = a(750),
        v = a(22),
        E = a.n(v),
        b = a(6),
        y = a.n(b),
        P = a(4),
        D = a(693),
        C = a(100),
        I = a(794),
        S = Object(f.b)(null, function(e) {
          return {
            deleteOrder: function(t) {
              e(Object(I.c)(t));
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
                return e.deleteOrder(e.id), void e.closeDeleteItemModal();
              },
              title: "Verwijderen"
            },
            "Verwijder Order: ",
            h.a.createElement("strong", null, " ", e.subject, " "),
            "?"
          );
        }),
        N = a(692);
      function w(e) {
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
            r = m()(e);
          if (t) {
            var n = m()(this).constructor;
            a = Reflect.construct(r, arguments, n);
          } else a = r.apply(this, arguments);
          return d()(this, a);
        };
      }
      var O = (function(e) {
          s()(a, e);
          var t = w(a);
          function a(e) {
            var r;
            return (
              n()(this, a),
              (r = t.call(this, e)),
              y()(E()(r), "toggleDelete", function() {
                r.setState({ showDelete: !r.state.showDelete });
              }),
              y()(E()(r), "preview", function() {
                P.f.push("/order/inzien/".concat(r.props.orderDetails.id));
              }),
              y()(E()(r), "newInvoice", function() {
                r.props.previewCreate([r.props.orderDetails.id]),
                  P.f.push(
                    "/financieel/".concat(
                      r.props.orderDetails.administrationId,
                      "/orders/aanmaken"
                    )
                  );
              }),
              (r.state = { showDelete: !1, showNewInvoice: !1 }),
              r
            );
          }
          return (
            i()(a, [
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
                        !this.props.orderDetails.canCreateInvoice &&
                          h.a.createElement(D.a, {
                            iconName: "glyphicon-eye-open",
                            onClickAction: this.preview
                          }),
                        this.props.orderDetails.canCreateInvoice &&
                          h.a.createElement(N.a, {
                            buttonText: "Preview concept nota",
                            onClickAction: this.newInvoice
                          }),
                        h.a.createElement(D.a, {
                          iconName: "glyphicon-trash",
                          onClickAction: this.toggleDelete
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
                          "Order: ",
                          this.props.orderDetails.subject,
                          " / ",
                          this.props.orderDetails.number
                        )
                      ),
                    h.a.createElement("div", { className: "col-md-4" }),
                    this.state.showDelete &&
                      h.a.createElement(S, {
                        closeDeleteItemModal: this.toggleDelete,
                        subject: this.props.orderDetails.subject,
                        id: this.props.orderDetails.id,
                        administrationId: this.props.administrationId
                      })
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        k = Object(f.b)(
          function(e) {
            return {
              orderDetails: e.orderDetails,
              administrationId: e.orderDetails.administrationId,
              isLoading: e.loadingData.isLoading
            };
          },
          function(e) {
            return {
              previewCreate: function(t) {
                e(Object(I.e)(t));
              }
            };
          }
        )(O),
        T = a(198),
        R = a(697),
        j = a.n(R),
        Y = a(694),
        M = a(690),
        A = a(691),
        F = a(747),
        x = a(696),
        L = a(104),
        q = a(699),
        V = a(709),
        B = a(7),
        z = a.n(B),
        _ = a(91);
      function W(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, r);
        }
        return a;
      }
      function G(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? W(Object(a), !0).forEach(function(t) {
                y()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : W(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
            r = m()(e);
          if (t) {
            var n = m()(this).constructor;
            a = Reflect.construct(r, arguments, n);
          } else a = r.apply(this, arguments);
          return d()(this, a);
        };
      }
      var Q = (function(e) {
          s()(a, e);
          var t = K(a);
          function a(e) {
            var r;
            n()(this, a),
              (r = t.call(this, e)),
              y()(E()(r), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  n = t.name;
                r.setState({
                  order: G(G({}, r.state.order), {}, y()({}, n, a))
                });
              }),
              y()(E()(r), "handleInputChangeParticipation", function(e) {
                var t,
                  a = e.target,
                  n = "checkbox" === a.type ? a.checked : a.value;
                (t = (t = r.state.participations.filter(function(e) {
                  return e.id == n;
                }))[0]),
                  r.setState({
                    order: G(
                      G({}, r.state.order),
                      {},
                      { participationId: t.id }
                    )
                  });
              }),
              y()(E()(r), "handleInputChangeDate", function(e, t) {
                r.setState({
                  order: G(G({}, r.state.order), {}, y()({}, t, e))
                });
              }),
              y()(E()(r), "handleInputChangeInvoiceDate", function(e, t) {
                r.setState(
                  { order: G(G({}, r.state.order), {}, y()({}, t, e)) },
                  r.checkContactCollectMandate
                );
              }),
              y()(E()(r), "checkContactCollectMandate", function() {
                var e = r.state.order.paymentTypeId,
                  t = r.state.order.dateNextInvoice;
                t || (t = z()().format("YYYY-MM-DD"));
                var a = r.props.contactCollectMandateFirstRun,
                  n = r.props.contactCollectMandate,
                  o = 1 == n;
                n && a > t && (o = !1),
                  o || (e = "transfer"),
                  r.setState({
                    collectMandateActive: o,
                    order: G(G({}, r.state.order), {}, { paymentTypeId: e })
                  });
              }),
              y()(E()(r), "handleSubmit", function(e) {
                e.preventDefault();
                var t = r.state.order,
                  a = {},
                  n = !1;
                j.a.isEmpty(t.paymentTypeId + "") &&
                  ((a.paymentTypeId = !0), (n = !0)),
                  j.a.isEmpty(t.statusId + "") && ((a.statusId = !0), (n = !0)),
                  j.a.isEmpty(t.subject + "") && ((a.subject = !0), (n = !0)),
                  j.a.isEmpty(t.IBAN + "") ||
                    F.isValidIBAN(t.IBAN) ||
                    ((a.IBAN = !0), (n = !0)),
                  r.setState(G(G({}, r.state), {}, { errors: a })),
                  n || r.props.updateOrder(t, r.props.switchToView);
              });
            var o = e.orderDetails,
              i = o.id,
              c = o.contactId,
              s = o.statusId,
              l = o.subject,
              d = o.participationId,
              u = o.emailTemplateIdCollection,
              m = o.emailTemplateIdTransfer,
              p = o.emailTemplateReminderId,
              h = o.emailTemplateExhortationId,
              f = o.paymentTypeId,
              g = o.collectionFrequencyId,
              v = o.IBAN,
              b = o.ibanAttn,
              P = o.poNumber,
              D = o.invoiceText,
              C = o.dateRequested,
              I = o.administrationId,
              S = o.dateNextInvoice;
            return (
              (r.state = {
                emailTemplates: [],
                showExtraContactInfo: !1,
                collectMandateActive: !1,
                participations: [],
                order: {
                  id: i,
                  contactId: c || "",
                  statusId: s || "",
                  administrationId: I || "",
                  subject: l || "",
                  participationId: d || "",
                  emailTemplateIdCollection: u || "",
                  emailTemplateIdTransfer: m || "",
                  emailTemplateReminderId: p || "",
                  emailTemplateExhortationId: h || "",
                  paymentTypeId: f || "",
                  collectionFrequencyId: g || "once",
                  IBAN: v || "",
                  ibanAttn: b || "",
                  poNumber: P || "",
                  invoiceText: D || "",
                  dateRequested: C || "",
                  dateNextInvoice: S || ""
                },
                errors: { statusId: !1, subject: !1, IBAN: !1 },
                peekLoading: { emailTemplates: !0 }
              }),
              (r.handleReactSelectChange = r.handleReactSelectChange.bind(
                E()(r)
              )),
              r
            );
          }
          return (
            i()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  this.state.order.contactId &&
                    _.a
                      .fetchContactInfoForOrder(this.state.order.contactId)
                      .then(function(t) {
                        e.setState({ participations: t.data.participations });
                      }),
                    L.a.fetchEmailTemplatesPeek().then(function(t) {
                      e.setState(
                        {
                          emailTemplates: t,
                          peekLoading: G(
                            G({}, e.state.peekLoading),
                            {},
                            { emailTemplates: !1 }
                          )
                        },
                        e.checkContactCollectMandate
                      );
                    });
                }
              },
              {
                key: "handleReactSelectChange",
                value: function(e, t) {
                  this.setState({
                    order: G(G({}, this.state.order), {}, y()({}, t, e))
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.order,
                    t = e.statusId,
                    a = e.subject,
                    r = e.participationId,
                    n = e.emailTemplateIdCollection,
                    o = e.emailTemplateIdTransfer,
                    i = e.emailTemplateReminderId,
                    c = e.emailTemplateExhortationId,
                    s = e.paymentTypeId,
                    l = e.collectionFrequencyId,
                    d = (e.IBAN, e.ibanAttn, e.poNumber),
                    u = e.invoiceText,
                    m = e.dateRequested,
                    p = e.administrationId,
                    f = e.dateNextInvoice,
                    g = this.props.orderDetails.invoiceCount;
                  return h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      M.a,
                      null,
                      h.a.createElement(
                        A.a,
                        null,
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(Y.a, {
                            label: "Order op naam van",
                            value: this.props.orderDetails.contact
                              ? this.props.orderDetails.contact.fullName
                              : "",
                            name: "contact",
                            readOnly: !0
                          }),
                          g > 0
                            ? h.a.createElement(Y.a, {
                                label: "Administratie",
                                value: this.props.orderDetails.administration
                                  ? this.props.orderDetails.administration.name
                                  : "",
                                name: "administration",
                                readOnly: !0
                              })
                            : h.a.createElement(x.a, {
                                label: "Administratie",
                                name: "administrationId",
                                options: this.props.administrations,
                                value: p,
                                onChangeAction: this.handleInputChange
                              })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(Y.a, {
                            label: "Contact persoon",
                            value: this.props.contactPerson,
                            name: "contactPerson",
                            readOnly: !0
                          }),
                          h.a.createElement(Y.a, {
                            label: "Nota wordt gemaild naar",
                            value: this.props.contactEmail,
                            name: "contactEmail",
                            readOnly: !0
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(x.a, {
                            label: "Deelname",
                            id: "ParticipationId",
                            name: "ParticipationId",
                            options: this.state.participations,
                            value: r,
                            onChangeAction: this.handleInputChangeParticipation,
                            optionValue: "id",
                            optionName: "project_name"
                          }),
                          h.a.createElement(Y.a, {
                            label: "Betreft",
                            name: "subject",
                            value: a,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.subject
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(V.a, {
                            label: "E-mail template nota incasso",
                            name: "emailTemplateIdCollection",
                            options: this.state.emailTemplates,
                            value: n,
                            onChangeAction: this.handleReactSelectChange,
                            isLoading: this.state.peekLoading.emailTemplates,
                            multi: !1
                          }),
                          h.a.createElement(x.a, {
                            label: "Betaalwijze",
                            id: "paymentTypeId",
                            name: "paymentTypeId",
                            options: this.state.collectMandateActive
                              ? this.props.orderPaymentTypes
                              : this.props.orderPaymentTypes.filter(function(
                                  e
                                ) {
                                  return "transfer" === e.id;
                                }),
                            emptyOption: !1,
                            value: s,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.paymentTypeId
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(V.a, {
                            label: "E-mail template nota overboeken",
                            name: "emailTemplateIdTransfer",
                            options: this.state.emailTemplates,
                            value: o,
                            onChangeAction: this.handleReactSelectChange,
                            isLoading: this.state.peekLoading.emailTemplates,
                            multi: !1
                          }),
                          h.a.createElement(x.a, {
                            label: "Nota frequentie",
                            id: "collectionFrequencyId",
                            name: "collectionFrequencyId",
                            options: this.props.orderCollectionFrequencies,
                            value: l,
                            onChangeAction: this.handleInputChange,
                            emptyOption: !1
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(V.a, {
                            label: "E-mail template herinnering",
                            name: "emailTemplateReminderId",
                            options: this.state.emailTemplates,
                            value: i,
                            onChangeAction: this.handleReactSelectChange,
                            isLoading: this.state.peekLoading.emailTemplates,
                            multi: !1
                          }),
                          h.a.createElement(x.a, {
                            label: "Status",
                            id: "statusId",
                            name: "statusId",
                            options: this.props.orderStatuses,
                            value: t,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.statusId
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(V.a, {
                            label: "E-mail template aanmaning",
                            name: "emailTemplateExhortationId",
                            options: this.state.emailTemplates,
                            value: c,
                            onChangeAction: this.handleReactSelectChange,
                            isLoading: this.state.peekLoading.emailTemplates,
                            multi: !1
                          }),
                          h.a.createElement(Y.a, {
                            label: "Opdracht nummer klant",
                            name: "poNumber",
                            value: d,
                            onChangeAction: this.handleInputChange
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
                                  "Opmerking"
                                )
                              ),
                              h.a.createElement(
                                "div",
                                { className: "col-sm-8" },
                                h.a.createElement("textarea", {
                                  name: "invoiceText",
                                  value: u,
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
                          h.a.createElement(q.a, {
                            label: "Aanvraag datum",
                            name: "dateRequested",
                            value: m,
                            onChangeAction: this.handleInputChangeDate
                          }),
                          h.a.createElement(q.a, {
                            label: "Volgende nota datum",
                            value: f,
                            name: "dateNextInvoice",
                            onChangeAction: this.handleInputChangeInvoiceDate
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(Y.a, {
                            label: "Totaal bedrag incl. BTW",
                            value:
                              "€" +
                              this.props.orderDetails.totalPriceInclVatPerYear.toLocaleString(
                                "nl",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                }
                              ),
                            name: "totalPriceInclVat",
                            readOnly: !0
                          })
                        )
                      ),
                      h.a.createElement(
                        A.a,
                        null,
                        h.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          h.a.createElement(N.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Sluiten",
                            onClickAction: this.props.switchToView
                          }),
                          h.a.createElement(N.a, {
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
        H = Object(f.b)(
          function(e) {
            return {
              orderStatuses: e.systemData.orderStatuses,
              orderPaymentTypes: e.systemData.orderPaymentTypes,
              orderCollectionFrequencies:
                e.systemData.orderCollectionFrequencies,
              orderDetails: e.orderDetails,
              administrations: e.meDetails.administrations
            };
          },
          function(e) {
            return {
              updateOrder: function(t, a) {
                e(Object(g.b)(t, a));
              }
            };
          }
        )(Q),
        U = a(695),
        J = Object(f.b)(function(e) {
          return { orderDetails: e.orderDetails };
        })(function(e) {
          var t = e.orderDetails,
            a = t.contact,
            r = t.project,
            n = t.administration,
            o = t.status,
            i = t.subject,
            c = t.emailTemplateCollection,
            s = t.emailTemplateTransfer,
            l = t.emailTemplateReminder,
            d = t.emailTemplateExhortation,
            u = t.paymentType,
            m = t.collectionFrequency,
            p = (t.IBAN, t.ibanAttn, t.poNumber),
            f = t.invoiceText,
            g = t.dateRequested,
            v = t.totalPriceInclVatPerYear,
            E = t.dateNextInvoice;
          return h.a.createElement(
            "div",
            { onClick: e.switchToEdit },
            h.a.createElement(
              M.a,
              null,
              h.a.createElement(
                A.a,
                null,
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(U.a, {
                    label: "Order op naam van",
                    value: a ? a.fullName : "",
                    link: a ? "contact/" + a.id : ""
                  }),
                  h.a.createElement(U.a, {
                    label: "Administratie",
                    value: n.name,
                    link: n ? "administratie/" + n.id : ""
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(U.a, {
                    label: "Contact persoon",
                    value: e.contactPerson
                  }),
                  h.a.createElement(U.a, {
                    label: "Nota wordt gemaild naar",
                    value: e.contactEmail
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(U.a, {
                    label: "Deelname",
                    value: r ? r.name : ""
                  }),
                  h.a.createElement(U.a, { label: "Betreft", value: i || "" })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(U.a, {
                    label: "E-mail template nota incasso",
                    value: c ? c.name : ""
                  }),
                  h.a.createElement(U.a, {
                    label: "Betaalwijze",
                    value: u ? u.name : ""
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(U.a, {
                    label: "E-mail template nota overboeken",
                    value: s ? s.name : ""
                  }),
                  h.a.createElement(U.a, {
                    label: "Nota frequentie",
                    value: m ? m.name : ""
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(U.a, {
                    label: "E-mail template herinnering",
                    value: l ? l.name : ""
                  }),
                  h.a.createElement(U.a, {
                    label: "Status",
                    value: o ? o.name : ""
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(U.a, {
                    label: "E-mail template aanmaning",
                    value: d ? d.name : ""
                  }),
                  h.a.createElement(U.a, {
                    label: "Opdracht nummer klant",
                    value: p
                  })
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
                      "Opmerking"
                    )
                  ),
                  h.a.createElement(
                    "div",
                    { className: "col-sm-9", id: "invoiceText" },
                    f
                  )
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(U.a, {
                    label: "Aanvraag datum",
                    value: g ? z()(g).format("DD-MM-Y") : ""
                  }),
                  h.a.createElement(U.a, {
                    label: "Volgende nota datum",
                    value: E ? z()(E).format("DD-MM-Y") : ""
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(U.a, {
                    label: "Totaal bedrag incl. BTW",
                    value:
                      "€" +
                      v.toLocaleString("nl", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })
                  })
                )
              )
            )
          );
        }),
        X = a(202);
      function Z(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, r);
        }
        return a;
      }
      function $(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Z(Object(a), !0).forEach(function(t) {
                y()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Z(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
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
          var a,
            r = m()(e);
          if (t) {
            var n = m()(this).constructor;
            a = Reflect.construct(r, arguments, n);
          } else a = r.apply(this, arguments);
          return d()(this, a);
        };
      }
      var te = (function(e) {
          s()(a, e);
          var t = ee(a);
          function a(e) {
            var r;
            return (
              n()(this, a),
              (r = t.call(this, e)),
              y()(E()(r), "switchToEdit", function() {
                r.props.orderDetails.canEdit
                  ? r.setState({ showEdit: !0 })
                  : r.props.setError(
                      405,
                      "Een order met daar aan gekoppeld een nota met de status “Te verzenden” kan niet worden aangepast(de order zit in de map “Order – Te verzenden”). Wil je deze order toch aanpassen? Verwijder dan eerst de “Te verzenden” nota. Dan kom deze order weer in de “Order – te factureren”.  Pas de order aan en maak vervolgens opnieuw de nota."
                    );
              }),
              y()(E()(r), "switchToView", function() {
                r.setState({ showEdit: !1, activeDiv: "" });
              }),
              (r.state = {
                contactPerson: "",
                contactEmail: "",
                contactCollectMandate: !1,
                contactCollectMandateFirstRun: "0000-00-00",
                showEdit: !1,
                activeDiv: ""
              }),
              r
            );
          }
          return (
            i()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  this.props.orderDetails.contactId &&
                    _.a
                      .fetchContactInfoForOrder(
                        this.props.orderDetails.contactId
                      )
                      .then(function(t) {
                        e.setState(
                          $(
                            $({}, e.state),
                            {},
                            {
                              contactPerson: t.data.contactPerson,
                              contactEmail: t.data.email,
                              contactCollectMandate: t.data.collectMandate,
                              contactCollectMandateFirstRun:
                                t.data.collectMandateFirstRun
                            }
                          )
                        );
                      });
                }
              },
              {
                key: "componentDidUpdate",
                value: function(e) {
                  var t = this;
                  this.props.orderDetails.id !== e.orderDetails.id &&
                    this.props.orderDetails.contactId &&
                    _.a
                      .fetchContactInfoForOrder(
                        nextProps.orderDetails.contactId
                      )
                      .then(function(e) {
                        t.setState(
                          $(
                            $({}, t.state),
                            {},
                            {
                              contactPerson: e.data.contactPerson,
                              contactEmail: e.data.email,
                              contactCollectMandate: e.data.collectMandate,
                              contactCollectMandateFirstRun:
                                e.data.collectMandateFirstRun
                            }
                          )
                        );
                      });
                }
              },
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
                    this.state.showEdit &&
                      this.props.orderDetails.canEdit &&
                      a.manageFinancial
                      ? h.a.createElement(H, {
                          switchToView: this.switchToView,
                          contactPerson: this.state.contactPerson,
                          contactEmail: this.state.contactEmail,
                          contactCollectMandate: this.state
                            .contactCollectMandate,
                          contactCollectMandateFirstRun: this.state
                            .contactCollectMandateFirstRun
                        })
                      : h.a.createElement(J, {
                          switchToEdit: this.switchToEdit,
                          contactPerson: this.state.contactPerson,
                          contactEmail: this.state.contactEmail
                        })
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        ae = Object(f.b)(
          function(e) {
            return { orderDetails: e.orderDetails, meDetails: e.meDetails };
          },
          function(e) {
            return {
              setError: function(t, a) {
                e(Object(X.b)(t, a));
              }
            };
          }
        )(te);
      z.a.locale("nl");
      var re = Object(f.b)(function(e) {
          return { orderDetails: e.orderDetails };
        })(function(e) {
          var t = e.orderDetails,
            a = t.createdAt,
            r = t.createdBy;
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(U.a, {
                label: "Gemaakt door",
                value: r ? r.fullName : "Onbekend",
                link: r ? "gebruiker/" + r.id : ""
              }),
              h.a.createElement(U.a, {
                label: "Gemaakt op",
                value: a ? z()(a).format("L") : "Onbekend"
              })
            )
          );
        }),
        ne = a(698),
        oe = function(e) {
          return h.a.createElement(
            M.a,
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
              A.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-md-12" },
                h.a.createElement(re, null)
              )
            )
          );
        };
      z.a.locale("nl");
      var ie = Object(f.b)(function(e) {
        return {
          permissions: e.meDetails.permissions,
          orderDetails: e.orderDetails
        };
      })(function(e) {
        var t = e.orderProduct,
          a = t.product,
          r = t.amount,
          n = t.totalPriceInclVatAndReduction,
          o = t.dateStart,
          i = t.dateEnd,
          c = t.totalPriceInclVatAndReductionPerYear,
          s = t.isOneTimeAndPaidProduct,
          l = t.period,
          d = z()(z()().format("YYYY-MM-DD")).isAfter(
            z()(i).format("YYYY-MM-DD")
          ),
          u = s ? "paid-order-product-row" : "",
          m = d ? "not-active-anymore-row" : "",
          p = d ? "not-active-anymore-text" : "";
        return h.a.createElement(
          "div",
          {
            className: "row border "
              .concat(e.highlightLine, " ")
              .concat(u, " ")
              .concat(m),
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
            h.a.createElement("div", { className: "col-sm-1" }, a && a.code),
            h.a.createElement(
              "div",
              { className: "col-sm-2" },
              a ? a.invoiceText : ""
            ),
            h.a.createElement("div", { className: "col-sm-1" }, r || ""),
            h.a.createElement(
              "div",
              { className: "col-sm-2" },
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
              { className: "col-sm-2" },
              a.invoiceFrequency ? a.invoiceFrequency.name : ""
            ),
            h.a.createElement(
              "div",
              { className: "col-sm-1" },
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
              o ? z()(o).format("L") : ""
            ),
            h.a.createElement(
              "div",
              { className: "col-sm-1 ".concat(p) },
              i ? z()(i).format("L") : ""
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
          ),
          l &&
            h.a.createElement("div", { className: "col-sm-12" }, "Periode ", l)
        );
      });
      z.a.locale("nl");
      var ce = Object(f.b)(function(e) {
          return { costCenters: e.systemData.costCenters };
        })(function(e) {
          var t = e.orderProduct,
            a = t.product,
            r = t.description,
            n = t.costCenterId,
            o = t.amount,
            i = t.amountReduction,
            c = t.percentageReduction,
            s = t.dateStart,
            l = t.dateEnd,
            d = t.dateLastInvoice,
            u = t.datePeriodStartFirstInvoice,
            m = t.variablePrice;
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "form",
              { className: "form-horizontal", onSubmit: e.handleSubmit },
              h.a.createElement(
                M.a,
                { className: "panel-grey" },
                h.a.createElement(
                  A.a,
                  null,
                  h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(Y.a, {
                      label: "Ordernummer",
                      name: "order",
                      value: e.orderDetails ? e.orderDetails.number : "",
                      readOnly: !0
                    }),
                    h.a.createElement(Y.a, {
                      label: "Product",
                      name: "product",
                      value: a ? a.name : "",
                      readOnly: !0
                    })
                  ),
                  h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(x.a, {
                      label: "Kostenplaats",
                      id: "costCenterId",
                      name: "costCenterId",
                      options: e.costCenters,
                      optionName: "description",
                      value: n,
                      onChangeAction: e.handleInputChange
                    })
                  ),
                  h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(Y.a, {
                      label: "Omschrijving",
                      id: "description",
                      name: "description",
                      value: r,
                      readOnly: !0
                    }),
                    h.a.createElement(Y.a, {
                      label: "Aantal",
                      type: "number",
                      id: "amount",
                      name: "amount",
                      value: o,
                      onChangeAction: e.handleInputChange,
                      required: "required",
                      error: e.errors.amount
                    })
                  ),
                  h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(Y.a, {
                      label: "Kortingspercentage",
                      type: "number",
                      id: "percentageReduction",
                      name: "percentageReduction",
                      value: c,
                      onChangeAction: e.handleInputChange
                    }),
                    null !== m
                      ? h.a.createElement(Y.a, {
                          label: "Prijs ex. BTW",
                          name: "variablePrice",
                          type: "number",
                          value: m,
                          onChangeAction: e.handleInputChangeVariablePrice,
                          error: e.errors.variablePrice,
                          required: null !== m && "required"
                        })
                      : h.a.createElement(Y.a, {
                          label: e.orderProduct.product.currentPrice
                            .inputInclVat
                            ? "Prijs incl. BTW"
                            : "Prijs excl. BTW",
                          name: "price",
                          value: e.orderProduct.product.currentPrice
                            .inputInclVat
                            ? "€" +
                              e.orderProduct.product.currentPrice.priceInclVat.toLocaleString(
                                "nl",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                }
                              )
                            : "€" +
                              e.orderProduct.product.currentPrice.price.toLocaleString(
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
                    h.a.createElement(Y.a, {
                      label: "Kortingsbedrag",
                      type: "number",
                      id: "amountReduction",
                      name: "amountReduction",
                      value: i,
                      onChangeAction: e.handleInputChange
                    }),
                    h.a.createElement(Y.a, {
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
                    h.a.createElement(q.a, {
                      label: "Begin datum",
                      name: "dateStart",
                      value: s,
                      onChangeAction: e.handleInputChangeStartDate,
                      required: "required",
                      error: e.errors.dateStart
                    }),
                    h.a.createElement(q.a, {
                      label: "Eind datum",
                      name: "dateEnd",
                      readOnly: "none" === a.durationId,
                      value: l,
                      onChangeAction: e.handleInputChangeDate,
                      error: e.errors.dateEnd
                    })
                  ),
                  !d &&
                    "none" !== a.durationId &&
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(q.a, {
                        label: "1ste notaperiode start op",
                        name: "datePeriodStartFirstInvoice",
                        value: u,
                        onChangeAction: e.handleInputChangeDate
                      })
                    ),
                  h.a.createElement(
                    "div",
                    { className: "pull-right btn-group", role: "group" },
                    h.a.createElement(N.a, {
                      buttonClassName: "btn-default",
                      buttonText: "Annuleren",
                      onClickAction: e.cancelEdit
                    }),
                    h.a.createElement(N.a, {
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
        }),
        se = Object(f.b)(null, function(e) {
          return {
            fetchOrderDetails: function(t) {
              e(Object(g.a)(t));
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
                _.a.deleteOrderProduct(e.id).then(function(t) {
                  e.fetchOrderDetails(e.orderId), e.closeDeleteItemModal();
                });
              },
              title: "Verwijderen"
            },
            h.a.createElement("p", null, "Verwijder orderregel?")
          );
        });
      function le(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, r);
        }
        return a;
      }
      function de(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? le(Object(a), !0).forEach(function(t) {
                y()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : le(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function ue(e) {
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
            r = m()(e);
          if (t) {
            var n = m()(this).constructor;
            a = Reflect.construct(r, arguments, n);
          } else a = r.apply(this, arguments);
          return d()(this, a);
        };
      }
      var me = (function(e) {
          s()(a, e);
          var t = ue(a);
          function a(e) {
            var r;
            return (
              n()(this, a),
              (r = t.call(this, e)),
              y()(E()(r), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  n = t.name;
                r.setState(
                  de(
                    de({}, r.state),
                    {},
                    {
                      orderProduct: de(
                        de({}, r.state.orderProduct),
                        {},
                        y()({}, n, a)
                      )
                    }
                  ),
                  r.updatePrice
                );
              }),
              y()(E()(r), "handleLedgerChange", function(e) {
                var t,
                  a = r.props.ledgers.find(function(t) {
                    return t.id === e;
                  }),
                  n = a.vatCode && a.vatCode.percentage;
                (t =
                  "9" == n
                    ? 1.09 * r.state.product.price
                    : "21" == n
                    ? 1.21 * r.state.product.price
                    : r.state.product.price),
                  r.setState(
                    de(
                      de({}, r.state),
                      {},
                      {
                        price: t,
                        product: de(
                          de({}, r.state.product),
                          {},
                          { ledgerId: e, vatPercentage: n }
                        )
                      }
                    ),
                    r.updatePrice
                  );
              }),
              y()(E()(r), "handleCostCenterChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  n = t.name;
                r.setState(
                  de(
                    de({}, r.state),
                    {},
                    { product: de(de({}, r.state.product), {}, y()({}, n, a)) }
                  ),
                  r.updatePrice
                );
              }),
              y()(E()(r), "handleInputChangeProduct", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  n = t.name;
                r.setState(
                  de(
                    de({}, r.state),
                    {},
                    { product: de(de({}, r.state.product), {}, y()({}, n, a)) }
                  )
                );
              }),
              y()(E()(r), "handleInputChangeProductDuration", function(e) {
                var t,
                  a = e.target,
                  n = "checkbox" === a.type ? a.checked : a.value,
                  o = a.name;
                if (r.state.orderProduct.dateStart)
                  switch (n) {
                    case "none":
                      t = "";
                      break;
                    case "month":
                      t = z()(r.state.orderProduct.dateStart)
                        .add(1, "M")
                        .format("YYYY-MM-DD");
                      break;
                    case "quarter":
                      t = z()(r.state.orderProduct.dateStart)
                        .add(1, "Q")
                        .format("YYYY-MM-DD");
                      break;
                    case "half_year":
                      t = z()(r.state.orderProduct.dateStart)
                        .add(6, "M")
                        .format("YYYY-MM-DD");
                      break;
                    case "year":
                      t = z()(r.state.orderProduct.dateStart)
                        .add(1, "y")
                        .format("YYYY-MM-DD");
                      break;
                    case "until_cancellation":
                      t = "";
                      break;
                    default:
                      t = "";
                  }
                r.setState(
                  de(
                    de({}, r.state),
                    {},
                    {
                      product: de(de({}, r.state.product), {}, y()({}, o, n)),
                      orderProduct: de(
                        de({}, r.state.orderProduct),
                        {},
                        { dateEnd: t }
                      )
                    }
                  )
                );
              }),
              y()(E()(r), "handleInputChangeProductPrice", function(e) {
                var t,
                  a = e.target,
                  n = "checkbox" === a.type ? a.checked : a.value,
                  o = a.name;
                (t =
                  "9" == r.state.product.vatPercentage
                    ? 1.09 * n
                    : "21" == r.state.product.vatPercentage
                    ? 1.21 * n
                    : n),
                  r.setState(
                    de(
                      de({}, r.state),
                      {},
                      {
                        price: t,
                        product: de(de({}, r.state.product), {}, y()({}, o, n))
                      }
                    ),
                    r.updatePrice
                  );
              }),
              y()(E()(r), "handleInputChangeProductVat", function(e) {
                var t,
                  a = e.target,
                  n = "checkbox" === a.type ? a.checked : a.value,
                  o = a.name;
                (t =
                  "9" == n
                    ? 1.09 * r.state.product.price
                    : "21" == n
                    ? 1.21 * r.state.product.price
                    : r.state.product.price),
                  r.setState(
                    de(
                      de({}, r.state),
                      {},
                      {
                        price: t,
                        product: de(de({}, r.state.product), {}, y()({}, o, n))
                      }
                    ),
                    r.updatePrice
                  );
              }),
              y()(E()(r), "updatePrice", function() {
                var e = j.a.isFloat(r.state.price + "") ? r.state.price : 0,
                  t = j.a.isFloat(r.state.orderProduct.amount + "")
                    ? r.state.orderProduct.amount
                    : 0,
                  a = j.a.isFloat(r.state.orderProduct.percentageReduction + "")
                    ? r.state.orderProduct.percentageReduction
                    : 0,
                  n = j.a.isFloat(r.state.orderProduct.amountReduction + "")
                    ? r.state.orderProduct.amountReduction
                    : 0,
                  o = 0;
                e < 0
                  ? (o = e * t * ((parseFloat(100) + parseFloat(a)) / 100) - n)
                  : (o = e * t * ((100 - a) / 100) - n);
                r.setState(
                  de(
                    de({}, r.state),
                    {},
                    {
                      price: parseFloat(e).toFixed(2),
                      totalPrice: parseFloat(o).toFixed(2)
                    }
                  )
                );
              }),
              y()(E()(r), "handleSubmit", function(e) {
                e.preventDefault();
                var t = r.state.orderProduct,
                  a = {},
                  n = !1;
                j.a.isEmpty(t.amount + "") && ((a.amount = !0), (n = !0)),
                  j.a.isEmpty(t.dateStart + "") &&
                    ((a.dateStart = !0), (n = !0)),
                  !j.a.isEmpty(t.dateStart + "") &&
                    z()(t.dateEnd).isSameOrBefore(z()(t.dateStart)) &&
                    ((a.dateEnd = !0), (n = !0)),
                  !j.a.isEmpty(t.dateEnd + "") &&
                    z()(t.dateStart).isSameOrAfter(z()(t.dateEnd)) &&
                    ((a.dateStart = !0), (n = !0));
                var o = r.state.product;
                j.a.isEmpty(o.administrationId + "") &&
                  ((a.administrationId = !0), (n = !0)),
                  j.a.isEmpty(o.price + "") && ((a.price = !0), (n = !0)),
                  j.a.isEmpty(o.description) &&
                    ((a.description = !0), (n = !0)),
                  r.props.usesTwinfield &&
                    j.a.isEmpty(String(o.ledgerId)) &&
                    ((a.ledgerId = !0), (n = !0)),
                  r.setState(
                    de(de({}, r.state), {}, { errors: a, errorMessage: !1 })
                  ),
                  !n &&
                    _.a.updateOrderProductOneTime(t, o).then(function(e) {
                      r.props.fetchOrderDetails(r.props.orderProduct.orderId),
                        r.props.cancelEdit();
                    });
              }),
              (r.state = {
                errorMessage: !1,
                price: e.product.currentPrice.priceInclVat,
                totalPrice: "0",
                orderProduct: {
                  id: e.orderProduct.id,
                  amount: e.orderProduct.amount,
                  amountReduction: e.orderProduct.amountReduction,
                  percentageReduction: e.orderProduct.percentageReduction,
                  dateStart: e.orderProduct.dateStart,
                  dateEnd: e.orderProduct.dateEnd,
                  dateLastInvoice: e.orderProduct.dateLastInvoice,
                  datePeriodStartFirstInvoice:
                    e.orderProduct.datePeriodStartFirstInvoice
                },
                product: {
                  id: e.product.id,
                  description: e.product.invoiceText,
                  durationId: e.product.durationId,
                  vatPercentage: e.product.currentPrice.vatPercentage,
                  price: e.product.currentPrice.price,
                  ledgerId: e.product.ledgerId ? e.product.ledgerId : "",
                  costCenterId: e.product.costCenterId
                    ? e.product.costCenterId
                    : ""
                },
                errors: {
                  amount: !1,
                  dateStart: !1,
                  dateEnd: !1,
                  price: !1,
                  ledgerId: !1,
                  description: !1
                }
              }),
              (r.handleInputChangeDate = r.handleInputChangeDate.bind(E()(r))),
              (r.handleInputChangeStartDate = r.handleInputChangeStartDate.bind(
                E()(r)
              )),
              r
            );
          }
          return (
            i()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  this.updatePrice();
                }
              },
              {
                key: "handleReactSelectChange",
                value: function(e, t) {
                  this.setState(
                    de(
                      de({}, this.state),
                      {},
                      {
                        product: de(
                          de({}, this.state.product),
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
                    de(
                      de({}, this.state),
                      {},
                      {
                        orderProduct: de(
                          de({}, this.state.orderProduct),
                          {},
                          y()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "handleInputChangeStartDate",
                value: function(e, t) {
                  var a,
                    r = "";
                  if (this.state.orderProduct.dateStart)
                    switch (this.state.product.durationId) {
                      case "none":
                        r = "";
                        break;
                      case "month":
                        r = z()(e)
                          .add(1, "M")
                          .format("YYYY-MM-DD");
                        break;
                      case "quarter":
                        r = z()(e)
                          .add(1, "Q")
                          .format("YYYY-MM-DD");
                        break;
                      case "half_year":
                        r = z()(e)
                          .add(6, "M")
                          .format("YYYY-MM-DD");
                        break;
                      case "year":
                        r = z()(e)
                          .add(1, "y")
                          .format("YYYY-MM-DD");
                        break;
                      case "until_cancellation":
                        r = "";
                        break;
                      default:
                        r = "";
                    }
                  this.setState(
                    de(
                      de({}, this.state),
                      {},
                      {
                        orderProduct: de(
                          de({}, this.state.orderProduct),
                          {},
                          ((a = {}), y()(a, t, e), y()(a, "dateEnd", r), a)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.orderProduct,
                    t = e.amount,
                    a = e.amountReduction,
                    r = e.percentageReduction,
                    n = e.dateStart,
                    o = e.dateEnd,
                    i = e.dateLastInvoice,
                    c = e.datePeriodStartFirstInvoice,
                    s = this.state.product,
                    l = s.description,
                    d = s.durationId,
                    u = s.vatPercentage,
                    m = s.price,
                    p = s.ledgerId,
                    f = s.costCenterId;
                  return h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      M.a,
                      { className: "panel-grey" },
                      h.a.createElement(
                        A.a,
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
                          h.a.createElement(Y.a, {
                            label: "Prijs ex. BTW",
                            id: "price",
                            name: "price",
                            type: "number",
                            min: "0",
                            max: "1000000",
                            value: m,
                            onChangeAction: this.handleInputChangeProductPrice,
                            required: "required",
                            error: this.state.errors.price
                          }),
                          h.a.createElement(x.a, {
                            label: "BTW percentage",
                            name: "vatPercentage",
                            options: this.props.vatCodes,
                            optionValue: "percentage",
                            optionName: "description",
                            value: u,
                            onChangeAction: this.props.usesTwinfield
                              ? null
                              : this.handleInputChangeProductVat,
                            placeholder: "Geen",
                            readOnly: this.props.usesTwinfield
                          })
                        ),
                        this.props.usesTwinfield
                          ? h.a.createElement(
                              "div",
                              { className: "row" },
                              h.a.createElement(V.a, {
                                label: "Grootboek",
                                name: "ledgerId",
                                id: "ledgerId",
                                options: this.props.ledgers,
                                optionName: "description",
                                value: p,
                                onChangeAction: this.handleLedgerChange,
                                multi: !1,
                                required: "required",
                                error: this.state.errors.ledgerId
                              }),
                              h.a.createElement(x.a, {
                                label: "Kostenplaats",
                                id: "costCenterId",
                                name: "costCenterId",
                                options: this.props.costCenters,
                                optionName: "description",
                                value: f,
                                onChangeAction: this.handleCostCenterChange
                              })
                            )
                          : null,
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(
                            "div",
                            { className: "panel-part panel-heading" },
                            h.a.createElement(
                              "span",
                              { className: "h5 text-bold" },
                              "Orderregel"
                            )
                          )
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(Y.a, {
                            label: "Omschrijving",
                            id: "description",
                            name: "description",
                            value: l,
                            onChangeAction: this.handleInputChangeProduct,
                            required: "required",
                            error: this.state.errors.description
                          }),
                          h.a.createElement(Y.a, {
                            label: "Aantal",
                            type: "number",
                            id: "amount",
                            name: "amount",
                            value: t,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.amount
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(Y.a, {
                            label: "Kortingspercentage",
                            type: "number",
                            id: "percentageReduction",
                            name: "percentageReduction",
                            value: r,
                            onChangeAction: this.handleInputChange
                          }),
                          h.a.createElement(Y.a, {
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
                          h.a.createElement(Y.a, {
                            label: "Kortingsbedrag",
                            type: "number",
                            id: "amountReduction",
                            name: "amountReduction",
                            value: a,
                            onChangeAction: this.handleInputChange
                          }),
                          h.a.createElement(Y.a, {
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
                          h.a.createElement(q.a, {
                            label: "Begin datum",
                            name: "dateStart",
                            value: n,
                            onChangeAction: this.handleInputChangeStartDate,
                            required: "required",
                            error: this.state.errors.dateStart
                          }),
                          h.a.createElement(q.a, {
                            label: "Eind datum",
                            name: "dateEnd",
                            value: o,
                            readOnly: "none" === d,
                            onChangeAction: this.handleInputChangeDate,
                            error: this.state.errors.dateEnd
                          })
                        ),
                        !i &&
                          "none" !== d &&
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(q.a, {
                              label: "1ste notaperiode start op",
                              name: "datePeriodStartFirstInvoice",
                              value: c,
                              onChangeAction: this.handleInputChangeDate
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
                          h.a.createElement(N.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.cancelEdit
                          }),
                          h.a.createElement(N.a, {
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
        pe = Object(f.b)(
          function(e) {
            return {
              orderDetails: e.orderDetails,
              administrationId: e.administrationDetails.id,
              productDurations: e.systemData.productDurations,
              productInvoiceFrequencies: e.systemData.productInvoiceFrequencies,
              productPaymentTypes: e.systemData.productPaymentTypes,
              products: e.systemData.products,
              costCenters: e.systemData.costCenters,
              ledgers: e.systemData.ledgers,
              vatCodes: e.systemData.vatCodes,
              usesTwinfield: e.systemData.usesTwinfield
            };
          },
          function(e) {
            return {
              fetchOrderDetails: function(t) {
                e(Object(g.a)(t));
              }
            };
          }
        )(me);
      function he(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, r);
        }
        return a;
      }
      function fe(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? he(Object(a), !0).forEach(function(t) {
                y()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : he(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
            r = m()(e);
          if (t) {
            var n = m()(this).constructor;
            a = Reflect.construct(r, arguments, n);
          } else a = r.apply(this, arguments);
          return d()(this, a);
        };
      }
      var ve = (function(e) {
          s()(a, e);
          var t = ge(a);
          function a(e) {
            var r;
            return (
              n()(this, a),
              (r = t.call(this, e)),
              y()(E()(r), "toggleDelete", function() {
                r.props.orderDetails.canEdit
                  ? r.setState({ showDelete: !r.state.showDelete })
                  : r.props.setError(
                      405,
                      "Een order met daar aan gekoppeld een nota met de status “Te verzenden” kan niet worden aangepast(de order zit in de map “Order – Te verzenden”). Wil je deze order toch aanpassen? Verwijder dan eerst de “Te verzenden” nota. Dan kom deze order weer in de “Order – te factureren”.  Pas de order aan en maak vervolgens opnieuw de nota."
                    );
              }),
              y()(E()(r), "onLineEnter", function() {
                r.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              y()(E()(r), "onLineLeave", function() {
                r.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              y()(E()(r), "openEdit", function() {
                r.props.orderDetails.canEdit
                  ? r.setState({ showEdit: !0 })
                  : r.props.setError(
                      405,
                      "Een order met daar aan gekoppeld een nota met de status “Te verzenden” kan niet worden aangepast(de order zit in de map “Order – Te verzenden”). Wil je deze order toch aanpassen? Verwijder dan eerst de “Te verzenden” nota. Dan kom deze order weer in de “Order – te factureren”.  Pas de order aan en maak vervolgens opnieuw de nota."
                    );
              }),
              y()(E()(r), "closeEdit", function() {
                r.setState({ showEdit: !1 });
              }),
              y()(E()(r), "cancelEdit", function() {
                r.setState(
                  fe(
                    fe({}, r.state),
                    {},
                    { orderProduct: fe({}, r.props.orderProduct) }
                  )
                ),
                  r.closeEdit();
              }),
              y()(E()(r), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  n = t.name;
                r.setState(
                  fe(
                    fe({}, r.state),
                    {},
                    {
                      orderProduct: fe(
                        fe({}, r.state.orderProduct),
                        {},
                        y()({}, n, a)
                      )
                    }
                  ),
                  r.updatePrice
                );
              }),
              y()(E()(r), "updatePrice", function() {
                var e = 0,
                  t = j.a.isFloat(r.props.orderProduct.variablePrice + "")
                    ? r.props.orderProduct.variablePrice
                    : 0;
                e =
                  t ||
                  (j.a.isFloat(
                    r.props.orderProduct.product.currentPrice.priceInclVat + ""
                  )
                    ? r.props.orderProduct.product.currentPrice.priceInclVat
                    : 0);
                var a = j.a.isFloat(r.state.orderProduct.amount + "")
                    ? r.state.orderProduct.amount
                    : 0,
                  n = j.a.isFloat(r.state.orderProduct.percentageReduction + "")
                    ? r.state.orderProduct.percentageReduction
                    : 0,
                  o = j.a.isFloat(r.state.orderProduct.amountReduction + "")
                    ? r.state.orderProduct.amountReduction
                    : 0,
                  i = 0;
                e < 0
                  ? (i = e * a * ((parseFloat(100) + parseFloat(n)) / 100) - o)
                  : (i = e * a * ((100 - n) / 100) - o);
                if (t) {
                  var c = j.a.isFloat(
                    r.state.orderProduct.product.currentPrice.vatPercentage + ""
                  )
                    ? r.state.orderProduct.product.currentPrice.vatPercentage
                    : 0;
                  i *= (parseFloat(100) + parseFloat(c)) / 100;
                }
                r.setState(fe(fe({}, r.state), {}, { totalPrice: i }));
              }),
              y()(E()(r), "handleSubmit", function(e) {
                e.preventDefault();
                var t = {},
                  a = !1,
                  n = r.state.orderProduct;
                j.a.isEmpty(n.amount + "") && ((t.amount = !0), (a = !0)),
                  j.a.isEmpty(n.dateStart + "") &&
                    ((t.dateStart = !0), (a = !0)),
                  !j.a.isEmpty(n.dateStart + "") &&
                    z()(n.dateEnd).isSameOrBefore(z()(n.dateStart)) &&
                    ((t.dateEnd = !0), (a = !0)),
                  !j.a.isEmpty(n.dateEnd + "") &&
                    z()(n.dateStart).isSameOrAfter(z()(n.dateEnd)) &&
                    ((t.dateStart = !0), (a = !0)),
                  null !== r.props.orderProduct.variablePrice &&
                    (j.a.isEmpty(n.variablePrice + "") ||
                      null === n.variablePrice) &&
                    ((t.variablePrice = !0), (a = !0)),
                  r.setState(fe(fe({}, r.state), {}, { errors: t })),
                  !a &&
                    _.a.updateOrderProduct(n).then(function(e) {
                      r.props.fetchOrderDetails(r.state.orderProduct.orderId),
                        r.closeEdit();
                    });
              }),
              y()(E()(r), "handleInputChangeVariablePrice", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  n = t.name;
                r.setState(
                  fe(
                    fe({}, r.state),
                    {},
                    {
                      price: a,
                      orderProduct: fe(
                        fe({}, r.state.orderProduct),
                        {},
                        y()({}, n, a)
                      )
                    }
                  ),
                  r.updatePrice
                );
              }),
              (r.state = {
                showActionButtons: !1,
                highlightLine: "",
                showEdit: !1,
                showDelete: !1,
                totalPrice: e.orderProduct.totalPriceInclVatAndReduction,
                orderProduct: fe({}, e.orderProduct),
                errors: {
                  amount: !1,
                  dateStart: !1,
                  dateEnd: !1,
                  variablePrice: !1
                }
              }),
              (r.handleInputChangeDate = r.handleInputChangeDate.bind(E()(r))),
              (r.handleInputChangeStartDate = r.handleInputChangeStartDate.bind(
                E()(r)
              )),
              r
            );
          }
          return (
            i()(a, [
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  Object(T.isEqual)(this.state.orderProduct, e.orderProduct) ||
                    this.setState(
                      fe(
                        fe({}, this.state),
                        {},
                        { orderProduct: fe({}, e.orderProduct) }
                      )
                    );
                }
              },
              {
                key: "handleInputChangeDate",
                value: function(e, t) {
                  this.setState(
                    fe(
                      fe({}, this.state),
                      {},
                      {
                        orderProduct: fe(
                          fe({}, this.state.orderProduct),
                          {},
                          y()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "handleInputChangeStartDate",
                value: function(e, t) {
                  var a,
                    r = "";
                  if (e)
                    switch (this.state.orderProduct.product.durationId) {
                      case "none":
                        r = "";
                        break;
                      case "month":
                        r = z()(e)
                          .add(1, "M")
                          .format("YYYY-MM-DD");
                        break;
                      case "quarter":
                        r = z()(e)
                          .add(1, "Q")
                          .format("YYYY-MM-DD");
                        break;
                      case "half_year":
                        r = z()(e)
                          .add(6, "M")
                          .format("YYYY-MM-DD");
                        break;
                      case "year":
                        r = z()(e)
                          .add(1, "y")
                          .format("YYYY-MM-DD");
                        break;
                      case "until_cancellation":
                        r = "";
                        break;
                      default:
                        r = "";
                    }
                  this.setState(
                    fe(
                      fe({}, this.state),
                      {},
                      {
                        orderProduct: fe(
                          fe({}, this.state.orderProduct),
                          {},
                          ((a = {}), y()(a, t, e), y()(a, "dateEnd", r), a)
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
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      openEdit: this.openEdit,
                      toggleDelete: this.toggleDelete,
                      orderProduct: this.state.orderProduct
                    }),
                    this.state.showEdit &&
                      this.props.orderDetails.canEdit &&
                      this.props.permissions.manageFinancial &&
                      !this.state.orderProduct.product.isOneTime &&
                      h.a.createElement(ce, {
                        orderDetails: this.props.orderDetails,
                        errors: this.state.errors,
                        totalPrice: this.state.totalPrice,
                        orderProduct: this.state.orderProduct,
                        handleInputChange: this.handleInputChange,
                        handleInputChangeDate: this.handleInputChangeDate,
                        handleInputChangeStartDate: this
                          .handleInputChangeStartDate,
                        handleSubmit: this.handleSubmit,
                        cancelEdit: this.cancelEdit,
                        handleInputChangeVariablePrice: this
                          .handleInputChangeVariablePrice
                      }),
                    this.state.showEdit &&
                      this.props.orderDetails.canEdit &&
                      this.props.permissions.manageFinancial &&
                      1 == this.state.orderProduct.product.isOneTime &&
                      h.a.createElement(pe, {
                        orderProduct: this.state.orderProduct,
                        product: this.state.orderProduct.product,
                        cancelEdit: this.cancelEdit
                      }),
                    this.state.showDelete &&
                      this.props.orderDetails.canEdit &&
                      this.props.permissions.manageFinancial &&
                      h.a.createElement(se, {
                        closeDeleteItemModal: this.toggleDelete,
                        id: this.state.orderProduct.id,
                        orderId: this.state.orderProduct.orderId
                      })
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        Ee = Object(f.b)(
          function(e) {
            return {
              permissions: e.meDetails.permissions,
              orderDetails: e.orderDetails
            };
          },
          function(e) {
            return {
              fetchOrderDetails: function(t) {
                e(Object(g.a)(t));
              },
              setError: function(t, a) {
                e(Object(X.b)(t, a));
              }
            };
          }
        )(ve),
        be = Object(f.b)(function(e) {
          return { orderProducts: e.orderDetails.orderProducts };
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
                { className: "col-sm-2" },
                "Omschrijving"
              ),
              h.a.createElement("div", { className: "col-sm-1" }, "Aantal"),
              h.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Prijs incl. BTW"
              ),
              h.a.createElement("div", { className: "col-sm-2" }, "Prijs per"),
              h.a.createElement(
                "div",
                { className: "col-sm-1" },
                "Prijs incl. BTW/jaar"
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-1" },
                "Begin datum"
              ),
              h.a.createElement("div", { className: "col-sm-1" }, "Eind datum"),
              h.a.createElement("div", { className: "col-sm-1" })
            ),
            e.orderProducts.length > 0
              ? e.orderProducts.map(function(e) {
                  return h.a.createElement(Ee, { key: e.id, orderProduct: e });
                })
              : h.a.createElement("div", null, "Geen orderregels bekend.")
          );
        });
      function ye(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, r);
        }
        return a;
      }
      function Pe(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ye(Object(a), !0).forEach(function(t) {
                y()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : ye(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function De(e) {
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
            r = m()(e);
          if (t) {
            var n = m()(this).constructor;
            a = Reflect.construct(r, arguments, n);
          } else a = r.apply(this, arguments);
          return d()(this, a);
        };
      }
      var Ce = (function(e) {
          s()(a, e);
          var t = De(a);
          function a(e) {
            var r;
            return (
              n()(this, a),
              (r = t.call(this, e)),
              y()(E()(r), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  n = t.name;
                r.setState(
                  Pe(
                    Pe({}, r.state),
                    {},
                    {
                      orderProduct: Pe(
                        Pe({}, r.state.orderProduct),
                        {},
                        y()({}, n, a)
                      )
                    }
                  ),
                  r.updatePrice
                );
              }),
              y()(E()(r), "handleInputChangeVariablePrice", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  n = t.name;
                r.setState(
                  Pe(
                    Pe({}, r.state),
                    {},
                    {
                      price: a,
                      orderProduct: Pe(
                        Pe({}, r.state.orderProduct),
                        {},
                        y()({}, n, a)
                      )
                    }
                  ),
                  r.updatePrice
                );
              }),
              y()(E()(r), "updatePrice", function() {
                var e = 0,
                  t = j.a.isFloat(r.state.orderProduct.variablePrice + "")
                    ? r.state.orderProduct.variablePrice
                    : 0;
                e =
                  t ||
                  (r.state.productInputInclVat
                    ? j.a.isFloat(r.state.priceInclVat + "")
                      ? r.state.priceInclVat
                      : 0
                    : j.a.isFloat(r.state.price + "")
                    ? r.state.price
                    : 0);
                var a = j.a.isFloat(r.state.orderProduct.amount + "")
                    ? r.state.orderProduct.amount
                    : 0,
                  n = j.a.isFloat(r.state.orderProduct.percentageReduction + "")
                    ? r.state.orderProduct.percentageReduction
                    : 0,
                  o = j.a.isFloat(r.state.orderProduct.amountReduction + "")
                    ? r.state.orderProduct.amountReduction
                    : 0,
                  i = 0;
                e < 0
                  ? (i = e * a * ((parseFloat(100) + parseFloat(n)) / 100) - o)
                  : (i = e * a * ((100 - n) / 100) - o);
                if (t || !r.state.productInputInclVat) {
                  var c = j.a.isFloat(r.state.vatPercentage + "")
                    ? r.state.vatPercentage
                    : 0;
                  i *= (parseFloat(100) + parseFloat(c)) / 100;
                }
                r.setState(Pe(Pe({}, r.state), {}, { totalPrice: i }));
              }),
              y()(E()(r), "handleChangeProduct", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  n = t.name,
                  o = 0,
                  i = 0,
                  c = 0,
                  s = "",
                  l = "",
                  d = !1,
                  u = "",
                  m = "",
                  p = !1;
                if (a) {
                  var h = r.props.products.find(function(e) {
                    return e.id == a;
                  });
                  (o = h.currentPrice.price),
                    (i = h.currentPrice.priceInclVat),
                    (c = h.currentPrice.vatPercentage),
                    (p = h.currentPrice.inputInclVat),
                    (s = h.costCenterId) || (s = ""),
                    (l = h.invoiceText),
                    (d = h.durationId),
                    (m = h.hasVariablePrice);
                }
                if (d && r.state.orderProduct.dateStart)
                  switch (d) {
                    case "none":
                      u = "";
                      break;
                    case "month":
                      u = z()(r.state.orderProduct.dateStart)
                        .add(1, "M")
                        .format("YYYY-MM-DD");
                      break;
                    case "quarter":
                      u = z()(r.state.orderProduct.dateStart)
                        .add(1, "Q")
                        .format("YYYY-MM-DD");
                      break;
                    case "half_year":
                      u = z()(r.state.orderProduct.dateStart)
                        .add(6, "M")
                        .format("YYYY-MM-DD");
                      break;
                    case "year":
                      u = z()(r.state.orderProduct.dateStart)
                        .add(1, "y")
                        .format("YYYY-MM-DD");
                      break;
                    case "until_cancellation":
                      u = "";
                      break;
                    default:
                      u = "";
                  }
                r.setState(
                  Pe(
                    Pe({}, r.state),
                    {},
                    {
                      price: o,
                      priceInclVat: i,
                      vatPercentage: c,
                      durationId: d,
                      productHasVariablePrice: "variable" === m,
                      productInputInclVat: p,
                      orderProduct: Pe(
                        Pe({}, r.state.orderProduct),
                        {},
                        y()(
                          { costCenterId: s, description: l, dateEnd: u },
                          n,
                          a
                        )
                      )
                    }
                  ),
                  r.updatePrice
                );
              }),
              y()(E()(r), "handleSubmit", function(e) {
                e.preventDefault();
                var t = r.state.orderProduct,
                  a = {},
                  n = !1;
                j.a.isEmpty(t.productId + "") && ((a.productId = !0), (n = !0)),
                  j.a.isEmpty(t.amount + "") && ((a.amount = !0), (n = !0)),
                  j.a.isEmpty(t.dateStart + "") &&
                    ((a.dateStart = !0), (n = !0)),
                  j.a.isEmpty(t.datePeriodStartFirstInvoice + "") &&
                    ((a.datePeriodStartFirstInvoice = !0), (n = !0)),
                  !j.a.isEmpty(t.dateStart + "") &&
                    z()(t.dateEnd).isSameOrBefore(z()(t.dateStart)) &&
                    ((a.dateEnd = !0), (n = !0)),
                  !j.a.isEmpty(t.dateEnd + "") &&
                    z()(t.dateStart).isSameOrAfter(z()(t.dateEnd)) &&
                    ((a.dateStart = !0), (n = !0)),
                  r.state.productHasVariablePrice &&
                    (j.a.isEmpty(t.variablePrice + "") ||
                      null === t.variablePrice) &&
                    ((a.variablePrice = !0), (n = !0)),
                  r.setState(Pe(Pe({}, r.state), {}, { errors: a })),
                  !n &&
                    _.a.newOrderProduct(t).then(function(e) {
                      r.props.fetchOrderDetails(t.orderId),
                        r.props.toggleShowNew();
                    });
              }),
              (r.state = {
                price: "0",
                priceInclVat: "0",
                vatPercentage: "0",
                totalPrice: "0",
                durationId: "none",
                productHasVariablePrice: !1,
                productInputInclVat: !1,
                orderProduct: {
                  orderId: r.props.orderDetails.id,
                  productId: "",
                  description: "",
                  costCenterId: "",
                  amount: 1,
                  amountReduction: 0,
                  percentageReduction: 0,
                  dateStart: z()().format("YYYY-MM-DD"),
                  dateEnd: "",
                  datePeriodStartFirstInvoice: z()().format("YYYY-MM-DD"),
                  variablePrice: null
                },
                errors: {
                  productId: !1,
                  amount: !1,
                  dateStart: !1,
                  dateEnd: !1,
                  datePeriodStartFirstInvoice: !1,
                  variablePrice: !1
                }
              }),
              (r.handleInputChangeDate = r.handleInputChangeDate.bind(E()(r))),
              (r.handleInputChangeStartDate = r.handleInputChangeStartDate.bind(
                E()(r)
              )),
              r
            );
          }
          return (
            i()(a, [
              {
                key: "handleInputChangeDate",
                value: function(e, t) {
                  this.setState(
                    Pe(
                      Pe({}, this.state),
                      {},
                      {
                        orderProduct: Pe(
                          Pe({}, this.state.orderProduct),
                          {},
                          y()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "handleInputChangeStartDate",
                value: function(e, t) {
                  var a,
                    r = this,
                    n = "";
                  if (
                    this.state.orderProduct.dateStart &&
                    this.state.orderProduct.productId
                  ) {
                    var o;
                    if (e)
                      o = this.props.products.filter(function(e) {
                        return e.id == r.state.orderProduct.productId;
                      })[0].durationId;
                    switch (o) {
                      case "none":
                        n = "";
                        break;
                      case "month":
                        n = z()(e)
                          .add(1, "M")
                          .format("YYYY-MM-DD");
                        break;
                      case "quarter":
                        n = z()(e)
                          .add(1, "Q")
                          .format("YYYY-MM-DD");
                        break;
                      case "half_year":
                        n = z()(e)
                          .add(6, "M")
                          .format("YYYY-MM-DD");
                        break;
                      case "year":
                        n = z()(e)
                          .add(1, "y")
                          .format("YYYY-MM-DD");
                        break;
                      case "until_cancellation":
                        n = "";
                        break;
                      default:
                        n = "";
                    }
                  }
                  this.setState(
                    Pe(
                      Pe({}, this.state),
                      {},
                      {
                        orderProduct: Pe(
                          Pe({}, this.state.orderProduct),
                          {},
                          ((a = {}), y()(a, t, e), y()(a, "dateEnd", n), a)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.orderProduct,
                    t = e.productId,
                    a = e.description,
                    r = e.costCenterId,
                    n = e.amount,
                    o = e.amountReduction,
                    i = e.percentageReduction,
                    c = e.dateStart,
                    s = e.dateEnd,
                    l = e.datePeriodStartFirstInvoice;
                  return h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      M.a,
                      { className: "panel-grey" },
                      h.a.createElement(
                        A.a,
                        null,
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(Y.a, {
                            label: "Order nummer",
                            name: "orderId",
                            value: this.props.orderDetails.number,
                            readOnly: !0
                          }),
                          h.a.createElement(x.a, {
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
                          h.a.createElement(x.a, {
                            label: "Kostenplaats",
                            id: "costCenterId",
                            name: "costCenterId",
                            options: this.props.costCenters,
                            optionName: "description",
                            value: r,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(Y.a, {
                            label: "Omschrijving",
                            id: "description",
                            name: "description",
                            value: a,
                            readOnly: !0
                          }),
                          h.a.createElement(Y.a, {
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
                          h.a.createElement(Y.a, {
                            label: "Kortingspercentage",
                            type: "number",
                            id: "percentageReduction",
                            name: "percentageReduction",
                            value: i,
                            onChangeAction: this.handleInputChange
                          }),
                          this.state.productHasVariablePrice
                            ? h.a.createElement(Y.a, {
                                label: "Prijs excl. BTW",
                                name: "variablePrice",
                                type: "number",
                                value: this.state.price,
                                onChangeAction: this
                                  .handleInputChangeVariablePrice,
                                error: this.state.errors.variablePrice,
                                required:
                                  this.state.productHasVariablePrice &&
                                  "required"
                              })
                            : h.a.createElement(Y.a, {
                                label: this.state.productInputInclVat
                                  ? "Prijs incl. BTW"
                                  : "Prijs excl. BTW",
                                name: "price",
                                value: this.state.productInputInclVat
                                  ? "€" +
                                    this.state.priceInclVat.toLocaleString(
                                      "nl",
                                      {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                      }
                                    )
                                  : "€" +
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
                          h.a.createElement(Y.a, {
                            label: "Kortingsbedrag",
                            type: "number",
                            id: "amountReduction",
                            name: "amountReduction",
                            value: o,
                            onChangeAction: this.handleInputChange
                          }),
                          h.a.createElement(Y.a, {
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
                          h.a.createElement(q.a, {
                            label: "Begin datum",
                            name: "dateStart",
                            value: c,
                            onChangeAction: this.handleInputChangeStartDate,
                            required: "required",
                            error: this.state.errors.dateStart
                          }),
                          h.a.createElement(q.a, {
                            label: "Eind datum",
                            name: "dateEnd",
                            value: s,
                            onChangeAction: this.handleInputChangeDate,
                            error: this.state.errors.dateEnd,
                            readOnly: "none" === this.state.durationId
                          })
                        ),
                        "none" !== this.state.durationId &&
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(q.a, {
                              label: "1ste notaperiode start op",
                              name: "datePeriodStartFirstInvoice",
                              value: l,
                              onChangeAction: this.handleInputChangeDate,
                              error: this.state.errors
                                .datePeriodStartFirstInvoice,
                              required: "required"
                            })
                          ),
                        h.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          h.a.createElement(N.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          h.a.createElement(N.a, {
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
        Ie = Object(f.b)(
          function(e) {
            return {
              orderDetails: e.orderDetails,
              products: e.systemData.products,
              costCenters: e.systemData.costCenters
            };
          },
          function(e) {
            return {
              fetchOrderDetails: function(t) {
                e(Object(g.a)(t));
              }
            };
          }
        )(Ce);
      function Se(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, r);
        }
        return a;
      }
      function Ne(e) {
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
      function we(e) {
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
            r = m()(e);
          if (t) {
            var n = m()(this).constructor;
            a = Reflect.construct(r, arguments, n);
          } else a = r.apply(this, arguments);
          return d()(this, a);
        };
      }
      var Oe = (function(e) {
          s()(a, e);
          var t = we(a);
          function a(e) {
            var r;
            return (
              n()(this, a),
              (r = t.call(this, e)),
              y()(E()(r), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  n = t.name;
                r.setState(
                  Ne(
                    Ne({}, r.state),
                    {},
                    {
                      orderProduct: Ne(
                        Ne({}, r.state.orderProduct),
                        {},
                        y()({}, n, a)
                      )
                    }
                  ),
                  r.updatePrice
                );
              }),
              y()(E()(r), "handleLedgerChange", function(e) {
                var t,
                  a = r.props.ledgers.find(function(t) {
                    return t.id === e;
                  }),
                  n = a.vatCode && a.vatCode.percentage;
                (t =
                  "9" == n
                    ? 1.09 * r.state.product.price
                    : "21" == n
                    ? 1.21 * r.state.product.price
                    : r.state.product.price),
                  r.setState(
                    Ne(
                      Ne({}, r.state),
                      {},
                      {
                        price: t,
                        product: Ne(
                          Ne({}, r.state.product),
                          {},
                          { ledgerId: e, vatPercentage: n }
                        )
                      }
                    ),
                    r.updatePrice
                  );
              }),
              y()(E()(r), "handleCostCenterChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  n = t.name;
                r.setState(
                  Ne(
                    Ne({}, r.state),
                    {},
                    { product: Ne(Ne({}, r.state.product), {}, y()({}, n, a)) }
                  ),
                  r.updatePrice
                );
              }),
              y()(E()(r), "handleInputChangeProduct", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  n = t.name;
                r.setState(
                  Ne(
                    Ne({}, r.state),
                    {},
                    { product: Ne(Ne({}, r.state.product), {}, y()({}, n, a)) }
                  )
                );
              }),
              y()(E()(r), "handleInputChangeProductDuration", function(e) {
                var t,
                  a = e.target,
                  n = "checkbox" === a.type ? a.checked : a.value,
                  o = a.name;
                if (r.state.orderProduct.dateStart)
                  switch (n) {
                    case "none":
                      t = "";
                      break;
                    case "month":
                      t = z()(r.state.orderProduct.dateStart)
                        .add(1, "M")
                        .format("YYYY-MM-DD");
                      break;
                    case "quarter":
                      t = z()(r.state.orderProduct.dateStart)
                        .add(1, "Q")
                        .format("YYYY-MM-DD");
                      break;
                    case "half_year":
                      t = z()(r.state.orderProduct.dateStart)
                        .add(6, "M")
                        .format("YYYY-MM-DD");
                      break;
                    case "year":
                      t = z()(r.state.orderProduct.dateStart)
                        .add(1, "y")
                        .format("YYYY-MM-DD");
                      break;
                    case "until_cancellation":
                      t = "";
                      break;
                    default:
                      t = "";
                  }
                r.setState(
                  Ne(
                    Ne({}, r.state),
                    {},
                    {
                      product: Ne(Ne({}, r.state.product), {}, y()({}, o, n)),
                      orderProduct: Ne(
                        Ne({}, r.state.orderProduct),
                        {},
                        { dateEnd: t }
                      )
                    }
                  )
                );
              }),
              y()(E()(r), "handleInputChangeProductPrice", function(e) {
                var t,
                  a = e.target,
                  n = "checkbox" === a.type ? a.checked : a.value,
                  o = a.name;
                (t =
                  "9" == r.state.product.vatPercentage
                    ? 1.09 * n
                    : "21" == r.state.product.vatPercentage
                    ? 1.21 * n
                    : n),
                  r.setState(
                    Ne(
                      Ne({}, r.state),
                      {},
                      {
                        price: t,
                        product: Ne(Ne({}, r.state.product), {}, y()({}, o, n))
                      }
                    ),
                    r.updatePrice
                  );
              }),
              y()(E()(r), "handleInputChangeProductVat", function(e) {
                var t,
                  a = e.target,
                  n = "checkbox" === a.type ? a.checked : a.value,
                  o = a.name;
                (t =
                  "9" == n
                    ? 1.09 * r.state.product.price
                    : "21" == n
                    ? 1.21 * r.state.product.price
                    : r.state.product.price),
                  r.setState(
                    Ne(
                      Ne({}, r.state),
                      {},
                      {
                        price: t,
                        product: Ne(Ne({}, r.state.product), {}, y()({}, o, n))
                      }
                    ),
                    r.updatePrice
                  );
              }),
              y()(E()(r), "updatePrice", function() {
                var e = j.a.isFloat(r.state.price + "") ? r.state.price : 0,
                  t = j.a.isFloat(r.state.orderProduct.amount + "")
                    ? r.state.orderProduct.amount
                    : 0,
                  a = j.a.isFloat(r.state.orderProduct.percentageReduction + "")
                    ? r.state.orderProduct.percentageReduction
                    : 0,
                  n = j.a.isFloat(r.state.orderProduct.amountReduction + "")
                    ? r.state.orderProduct.amountReduction
                    : 0,
                  o = 0;
                e < 0
                  ? (o = e * t * ((parseFloat(100) + parseFloat(a)) / 100) - n)
                  : (o = e * t * ((100 - a) / 100) - n);
                r.setState(
                  Ne(
                    Ne({}, r.state),
                    {},
                    {
                      price: parseFloat(e).toFixed(2),
                      totalPrice: parseFloat(o).toFixed(2)
                    }
                  )
                );
              }),
              y()(E()(r), "handleSubmit", function(e) {
                e.preventDefault();
                var t = r.state.orderProduct,
                  a = {},
                  n = !1,
                  o = !1;
                j.a.isEmpty(t.amount + "") && ((a.amount = !0), (n = !0)),
                  j.a.isEmpty(t.dateStart + "") &&
                    ((a.dateStart = !0), (n = !0)),
                  !j.a.isEmpty(t.dateStart + "") &&
                    z()(t.dateEnd).isSameOrBefore(z()(t.dateStart)) &&
                    ((a.dateEnd = !0), (n = !0)),
                  !j.a.isEmpty(t.dateEnd + "") &&
                    z()(t.dateStart).isSameOrAfter(z()(t.dateEnd)) &&
                    ((a.dateStart = !0), (n = !0)),
                  j.a.isEmpty(t.datePeriodStartFirstInvoice + "") &&
                    ((a.datePeriodStartFirstInvoice = !0), (n = !0));
                var i = r.state.product,
                  c = !1;
                r.props.products.map(function(e) {
                  return e.code == i.code && (c = !0);
                }),
                  c &&
                    ((o = "Productcode moet uniek zijn."),
                    (a.code = !0),
                    (n = !0)),
                  j.a.isEmpty(i.code + "") && ((a.code = !0), (n = !0));
                var s = !1;
                r.props.products.map(function(e) {
                  return e.name == i.name && (s = !0);
                }),
                  s &&
                    ((o = "Productnaam moet uniek zijn."),
                    (a.name = !0),
                    (n = !0)),
                  c &&
                    s &&
                    (o = "Productcode en productnaam moeten uniek zijn."),
                  j.a.isEmpty(i.name + "") && ((a.name = !0), (n = !0)),
                  j.a.isEmpty(i.administrationId + "") &&
                    ((a.administrationId = !0), (n = !0)),
                  j.a.isEmpty(i.price + "") && ((a.price = !0), (n = !0)),
                  r.props.usesTwinfield &&
                    j.a.isEmpty(String(i.ledgerId)) &&
                    ((a.ledgerId = !0), (n = !0)),
                  r.setState(
                    Ne(Ne({}, r.state), {}, { errors: a, errorMessage: o })
                  ),
                  !n &&
                    _.a.newProductAndOrderProduct(t, i).then(function(e) {
                      r.props.fetchOrderDetails(t.orderId),
                        r.props.toggleShowNewProduct();
                    });
              }),
              (r.state = {
                errorMessage: !1,
                price: "0",
                totalPrice: "0",
                orderProduct: {
                  orderId: r.props.orderDetails.id,
                  amount: 1,
                  amountReduction: 0,
                  percentageReduction: 0,
                  dateStart: z()().format("YYYY-MM-DD"),
                  dateEnd: "",
                  datePeriodStartFirstInvoice: z()().format("YYYY-MM-DD")
                },
                product: {
                  code: "",
                  name: "",
                  durationId: "none",
                  description: "",
                  administrationId: r.props.orderDetails.administrationId,
                  invoiceFrequencyId: r.props.orderDetails.collectionFrequencyId
                    ? r.props.orderDetails.collectionFrequencyId
                    : "once",
                  vatPercentage: "",
                  price: "",
                  ledgerId: "",
                  costCenterId: "",
                  isOneTime: !1
                },
                errors: {
                  amount: !1,
                  dateStart: !1,
                  dateEnd: !1,
                  code: !1,
                  name: !1,
                  price: !1,
                  datePeriodStartFirstInvoice: !1,
                  ledgerId: !1
                }
              }),
              (r.handleInputChangeDate = r.handleInputChangeDate.bind(E()(r))),
              (r.handleInputChangeStartDate = r.handleInputChangeStartDate.bind(
                E()(r)
              )),
              r
            );
          }
          return (
            i()(a, [
              {
                key: "handleInputChangeDate",
                value: function(e, t) {
                  this.setState(
                    Ne(
                      Ne({}, this.state),
                      {},
                      {
                        orderProduct: Ne(
                          Ne({}, this.state.orderProduct),
                          {},
                          y()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "handleInputChangeStartDate",
                value: function(e, t) {
                  var a,
                    r = "";
                  if (this.state.orderProduct.dateStart)
                    switch (this.state.product.durationId) {
                      case "none":
                        r = "";
                        break;
                      case "month":
                        r = z()(e)
                          .add(1, "M")
                          .format("YYYY-MM-DD");
                        break;
                      case "quarter":
                        r = z()(e)
                          .add(1, "Q")
                          .format("YYYY-MM-DD");
                        break;
                      case "half_year":
                        r = z()(e)
                          .add(6, "M")
                          .format("YYYY-MM-DD");
                        break;
                      case "year":
                        r = z()(e)
                          .add(1, "y")
                          .format("YYYY-MM-DD");
                        break;
                      case "until_cancellation":
                        r = "";
                        break;
                      default:
                        r = "";
                    }
                  this.setState(
                    Ne(
                      Ne({}, this.state),
                      {},
                      {
                        orderProduct: Ne(
                          Ne({}, this.state.orderProduct),
                          {},
                          ((a = {}), y()(a, t, e), y()(a, "dateEnd", r), a)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.orderProduct,
                    t = e.amount,
                    a = e.amountReduction,
                    r = e.percentageReduction,
                    n = e.dateStart,
                    o = e.dateEnd,
                    i = e.datePeriodStartFirstInvoice,
                    c = this.state.product,
                    s = c.description,
                    l = c.code,
                    d = c.name,
                    u = c.durationId,
                    m = c.vatPercentage,
                    p = c.price,
                    f = c.ledgerId,
                    g = c.costCenterId;
                  return h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      M.a,
                      { className: "panel-grey" },
                      h.a.createElement(
                        A.a,
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
                          h.a.createElement(Y.a, {
                            label: "Productcode",
                            name: "code",
                            value: l,
                            onChangeAction: this.handleInputChangeProduct,
                            required: "required",
                            error: this.state.errors.code
                          }),
                          h.a.createElement(Y.a, {
                            label: "Naam",
                            name: "name",
                            value: d,
                            onChangeAction: this.handleInputChangeProduct,
                            required: "required",
                            error: this.state.errors.name
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(Y.a, {
                            label: "Prijs ex. BTW",
                            id: "price",
                            name: "price",
                            type: "number",
                            min: "0",
                            max: "1000000",
                            value: p,
                            onChangeAction: this.handleInputChangeProductPrice,
                            required: "required",
                            error: this.state.errors.price
                          }),
                          h.a.createElement(x.a, {
                            label: "BTW percentage",
                            name: "vatPercentage",
                            options: this.props.vatCodes,
                            optionValue: "percentage",
                            optionName: "description",
                            value: m,
                            onChangeAction: this.props.usesTwinfield
                              ? null
                              : this.handleInputChangeProductVat,
                            placeholder: "Geen",
                            readOnly: this.props.usesTwinfield
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(x.a, {
                            label: "Looptijd",
                            id: "durationId",
                            name: "durationId",
                            options: this.props.productDurations,
                            value: u,
                            onChangeAction: this
                              .handleInputChangeProductDuration,
                            emptyOption: !1
                          }),
                          this.props.usesTwinfield
                            ? h.a.createElement(V.a, {
                                label: "Grootboek",
                                name: "ledgerId",
                                id: "ledgerId",
                                options: this.props.ledgers,
                                optionName: "description",
                                value: f,
                                onChangeAction: this.handleLedgerChange,
                                multi: !1,
                                required: "required",
                                error: this.state.errors.ledgerId
                              })
                            : null
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          this.props.usesTwinfield
                            ? h.a.createElement(x.a, {
                                label: "Kostenplaats",
                                id: "costCenterId",
                                name: "costCenterId",
                                options: this.props.costCenters,
                                optionName: "description",
                                value: g,
                                onChangeAction: this.handleCostCenterChange
                              })
                            : null
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
                              "Orderregel"
                            )
                          )
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(Y.a, {
                            label: "Omschrijving",
                            id: "description",
                            name: "description",
                            value: s,
                            onChangeAction: this.handleInputChangeProduct,
                            required: "required",
                            error: this.state.errors.description
                          }),
                          h.a.createElement(Y.a, {
                            label: "Aantal",
                            type: "number",
                            id: "amount",
                            name: "amount",
                            value: t,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.amount
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(Y.a, {
                            label: "Kortingspercentage",
                            type: "number",
                            id: "percentageReduction",
                            name: "percentageReduction",
                            value: r,
                            onChangeAction: this.handleInputChange
                          }),
                          h.a.createElement(Y.a, {
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
                          h.a.createElement(Y.a, {
                            label: "Kortingsbedrag",
                            type: "number",
                            id: "amountReduction",
                            name: "amountReduction",
                            value: a,
                            onChangeAction: this.handleInputChange
                          }),
                          h.a.createElement(Y.a, {
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
                          h.a.createElement(q.a, {
                            label: "Begin datum",
                            name: "dateStart",
                            value: n,
                            onChangeAction: this.handleInputChangeStartDate,
                            required: "required",
                            error: this.state.errors.dateStart
                          }),
                          h.a.createElement(q.a, {
                            label: "Eind datum",
                            name: "dateEnd",
                            value: o,
                            onChangeAction: this.handleInputChangeDate,
                            error: this.state.errors.dateEnd,
                            readOnly: "none" === u
                          })
                        ),
                        "none" !== u &&
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(q.a, {
                              label: "1ste notaperiode start op",
                              name: "datePeriodStartFirstInvoice",
                              value: i,
                              onChangeAction: this.handleInputChangeDate,
                              error: this.state.errors
                                .datePeriodStartFirstInvoice,
                              required: "required"
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
                          h.a.createElement(N.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNewProduct
                          }),
                          h.a.createElement(N.a, {
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
        ke = Object(f.b)(
          function(e) {
            return {
              orderDetails: e.orderDetails,
              productDurations: e.systemData.productDurations,
              productInvoiceFrequencies: e.systemData.productInvoiceFrequencies,
              productPaymentTypes: e.systemData.productPaymentTypes,
              products: e.systemData.products,
              costCenters: e.systemData.costCenters,
              ledgers: e.systemData.ledgers,
              vatCodes: e.systemData.vatCodes,
              usesTwinfield: e.systemData.usesTwinfield
            };
          },
          function(e) {
            return {
              fetchOrderDetails: function(t) {
                e(Object(g.a)(t));
              }
            };
          }
        )(Oe);
      function Te(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, r);
        }
        return a;
      }
      function Re(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Te(Object(a), !0).forEach(function(t) {
                y()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Te(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function je(e) {
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
            r = m()(e);
          if (t) {
            var n = m()(this).constructor;
            a = Reflect.construct(r, arguments, n);
          } else a = r.apply(this, arguments);
          return d()(this, a);
        };
      }
      var Ye = (function(e) {
          s()(a, e);
          var t = je(a);
          function a(e) {
            var r;
            return (
              n()(this, a),
              (r = t.call(this, e)),
              y()(E()(r), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  n = t.name;
                r.setState(
                  Re(
                    Re({}, r.state),
                    {},
                    {
                      orderProduct: Re(
                        Re({}, r.state.orderProduct),
                        {},
                        y()({}, n, a)
                      )
                    }
                  ),
                  r.updatePrice
                );
              }),
              y()(E()(r), "handleLedgerChange", function(e) {
                var t,
                  a = r.props.ledgers.find(function(t) {
                    return t.id === e;
                  }),
                  n = a.vatCode && a.vatCode.percentage;
                (t =
                  "9" == n
                    ? 1.09 * r.state.product.price
                    : "21" == n
                    ? 1.21 * r.state.product.price
                    : r.state.product.price),
                  r.setState(
                    Re(
                      Re({}, r.state),
                      {},
                      {
                        price: t,
                        product: Re(
                          Re({}, r.state.product),
                          {},
                          { ledgerId: e, vatPercentage: n }
                        )
                      }
                    ),
                    r.updatePrice
                  );
              }),
              y()(E()(r), "handleCostCenterChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  n = t.name;
                r.setState(
                  Re(
                    Re({}, r.state),
                    {},
                    { product: Re(Re({}, r.state.product), {}, y()({}, n, a)) }
                  ),
                  r.updatePrice
                );
              }),
              y()(E()(r), "handleInputChangeProduct", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  n = t.name;
                r.setState(
                  Re(
                    Re({}, r.state),
                    {},
                    { product: Re(Re({}, r.state.product), {}, y()({}, n, a)) }
                  )
                );
              }),
              y()(E()(r), "handleInputChangeProductDuration", function(e) {
                var t,
                  a = e.target,
                  n = "checkbox" === a.type ? a.checked : a.value,
                  o = a.name;
                if (r.state.orderProduct.dateStart)
                  switch (n) {
                    case "none":
                      t = "";
                      break;
                    case "month":
                      t = z()(r.state.orderProduct.dateStart)
                        .add(1, "M")
                        .format("YYYY-MM-DD");
                      break;
                    case "quarter":
                      t = z()(r.state.orderProduct.dateStart)
                        .add(1, "Q")
                        .format("YYYY-MM-DD");
                      break;
                    case "half_year":
                      t = z()(r.state.orderProduct.dateStart)
                        .add(6, "M")
                        .format("YYYY-MM-DD");
                      break;
                    case "year":
                      t = z()(r.state.orderProduct.dateStart)
                        .add(1, "y")
                        .format("YYYY-MM-DD");
                      break;
                    case "until_cancellation":
                      t = "";
                      break;
                    default:
                      t = "";
                  }
                r.setState(
                  Re(
                    Re({}, r.state),
                    {},
                    {
                      product: Re(Re({}, r.state.product), {}, y()({}, o, n)),
                      orderProduct: Re(
                        Re({}, r.state.orderProduct),
                        {},
                        { dateEnd: t }
                      )
                    }
                  )
                );
              }),
              y()(E()(r), "handleInputChangeProductPrice", function(e) {
                var t,
                  a = e.target,
                  n = "checkbox" === a.type ? a.checked : a.value,
                  o = a.name;
                (t =
                  "9" == r.state.product.vatPercentage
                    ? 1.09 * n
                    : "21" == r.state.product.vatPercentage
                    ? 1.21 * n
                    : n),
                  r.setState(
                    Re(
                      Re({}, r.state),
                      {},
                      {
                        price: t,
                        product: Re(Re({}, r.state.product), {}, y()({}, o, n))
                      }
                    ),
                    r.updatePrice
                  );
              }),
              y()(E()(r), "handleInputChangeProductVat", function(e) {
                var t,
                  a = e.target,
                  n = "checkbox" === a.type ? a.checked : a.value,
                  o = a.name;
                (t =
                  "9" == n
                    ? 1.09 * r.state.product.price
                    : "21" == n
                    ? 1.21 * r.state.product.price
                    : r.state.product.price),
                  r.setState(
                    Re(
                      Re({}, r.state),
                      {},
                      {
                        price: t,
                        product: Re(Re({}, r.state.product), {}, y()({}, o, n))
                      }
                    ),
                    r.updatePrice
                  );
              }),
              y()(E()(r), "updatePrice", function() {
                var e = j.a.isFloat(r.state.price + "") ? r.state.price : 0,
                  t = j.a.isFloat(r.state.orderProduct.amount + "")
                    ? r.state.orderProduct.amount
                    : 0,
                  a = j.a.isFloat(r.state.orderProduct.percentageReduction + "")
                    ? r.state.orderProduct.percentageReduction
                    : 0,
                  n = j.a.isFloat(r.state.orderProduct.amountReduction + "")
                    ? r.state.orderProduct.amountReduction
                    : 0,
                  o = 0;
                e < 0
                  ? (o = e * t * ((parseFloat(100) + parseFloat(a)) / 100) - n)
                  : (o = e * t * ((100 - a) / 100) - n);
                r.setState(
                  Re(
                    Re({}, r.state),
                    {},
                    {
                      price: parseFloat(e).toFixed(2),
                      totalPrice: parseFloat(o).toFixed(2)
                    }
                  )
                );
              }),
              y()(E()(r), "handleSubmit", function(e) {
                e.preventDefault();
                var t = r.state.orderProduct,
                  a = {},
                  n = !1;
                j.a.isEmpty(t.amount + "") && ((a.amount = !0), (n = !0)),
                  j.a.isEmpty(t.dateStart + "") &&
                    ((a.dateStart = !0), (n = !0)),
                  !j.a.isEmpty(t.dateStart + "") &&
                    z()(t.dateEnd).isSameOrBefore(z()(t.dateStart)) &&
                    ((a.dateEnd = !0), (n = !0)),
                  !j.a.isEmpty(t.dateEnd + "") &&
                    z()(t.dateStart).isSameOrAfter(z()(t.dateEnd)) &&
                    ((a.dateStart = !0), (n = !0)),
                  j.a.isEmpty(t.datePeriodStartFirstInvoice + "") &&
                    ((a.datePeriodStartFirstInvoice = !0), (n = !0));
                var o = r.state.product;
                j.a.isEmpty(o.administrationId + "") &&
                  ((a.administrationId = !0), (n = !0)),
                  j.a.isEmpty(o.price + "") && ((a.price = !0), (n = !0)),
                  j.a.isEmpty(o.description) &&
                    ((a.description = !0), (n = !0)),
                  r.props.usesTwinfield &&
                    j.a.isEmpty(String(o.ledgerId)) &&
                    ((a.ledgerId = !0), (n = !0)),
                  r.setState(
                    Re(Re({}, r.state), {}, { errors: a, errorMessage: !1 })
                  ),
                  !n &&
                    _.a.newProductAndOrderProduct(t, o).then(function(e) {
                      r.props.fetchOrderDetails(t.orderId),
                        r.props.toggleShowNewProductOneTime();
                    });
              }),
              (r.state = {
                errorMessage: !1,
                price: "0",
                totalPrice: "0",
                orderProduct: {
                  orderId: r.props.orderDetails.id,
                  amount: 1,
                  amountReduction: 0,
                  percentageReduction: 0,
                  dateStart: z()().format("YYYY-MM-DD"),
                  dateEnd: "",
                  datePeriodStartFirstInvoice: z()().format("YYYY-MM-DD")
                },
                product: {
                  code: "EMP",
                  name: "Eenmalig product",
                  durationId: "none",
                  description: "",
                  administrationId: r.props.orderDetails.administrationId,
                  invoiceFrequencyId: r.props.orderDetails.collectionFrequencyId
                    ? r.props.orderDetails.collectionFrequencyId
                    : "once",
                  vatPercentage: "",
                  price: "",
                  ledgerId: "",
                  costCenterId: "",
                  isOneTime: !0
                },
                errors: {
                  amount: !1,
                  dateStart: !1,
                  dateEnd: !1,
                  price: !1,
                  datePeriodStartFirstInvoice: !1,
                  ledgerId: !1,
                  description: !1
                }
              }),
              (r.handleInputChangeDate = r.handleInputChangeDate.bind(E()(r))),
              (r.handleInputChangeStartDate = r.handleInputChangeStartDate.bind(
                E()(r)
              )),
              r
            );
          }
          return (
            i()(a, [
              {
                key: "handleInputChangeDate",
                value: function(e, t) {
                  this.setState(
                    Re(
                      Re({}, this.state),
                      {},
                      {
                        orderProduct: Re(
                          Re({}, this.state.orderProduct),
                          {},
                          y()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "handleInputChangeStartDate",
                value: function(e, t) {
                  var a,
                    r = "";
                  if (this.state.orderProduct.dateStart)
                    switch (this.state.product.durationId) {
                      case "none":
                        r = "";
                        break;
                      case "month":
                        r = z()(e)
                          .add(1, "M")
                          .format("YYYY-MM-DD");
                        break;
                      case "quarter":
                        r = z()(e)
                          .add(1, "Q")
                          .format("YYYY-MM-DD");
                        break;
                      case "half_year":
                        r = z()(e)
                          .add(6, "M")
                          .format("YYYY-MM-DD");
                        break;
                      case "year":
                        r = z()(e)
                          .add(1, "y")
                          .format("YYYY-MM-DD");
                        break;
                      case "until_cancellation":
                        r = "";
                        break;
                      default:
                        r = "";
                    }
                  this.setState(
                    Re(
                      Re({}, this.state),
                      {},
                      {
                        orderProduct: Re(
                          Re({}, this.state.orderProduct),
                          {},
                          ((a = {}), y()(a, t, e), y()(a, "dateEnd", r), a)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.orderProduct,
                    t = e.amount,
                    a = e.amountReduction,
                    r = e.percentageReduction,
                    n = e.dateStart,
                    o = e.dateEnd,
                    i = e.datePeriodStartFirstInvoice,
                    c = this.state.product,
                    s = c.description,
                    l = c.durationId,
                    d = c.vatPercentage,
                    u = c.price,
                    m = c.ledgerId,
                    p = c.costCenterId;
                  return h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      M.a,
                      { className: "panel-grey" },
                      h.a.createElement(
                        A.a,
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
                          h.a.createElement(Y.a, {
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
                          h.a.createElement(x.a, {
                            label: "BTW percentage",
                            name: "vatPercentage",
                            options: this.props.vatCodes,
                            optionValue: "percentage",
                            optionName: "description",
                            value: d,
                            onChangeAction: this.props.usesTwinfield
                              ? null
                              : this.handleInputChangeProductVat,
                            placeholder: "Geen",
                            readOnly: this.props.usesTwinfield
                          })
                        ),
                        this.props.usesTwinfield
                          ? h.a.createElement(
                              "div",
                              { className: "row" },
                              h.a.createElement(V.a, {
                                label: "Grootboek",
                                name: "ledgerId",
                                options: this.props.ledgers,
                                optionName: "description",
                                value: m,
                                onChangeAction: this.handleLedgerChange,
                                multi: !1,
                                required: "required",
                                error: this.state.errors.ledgerId
                              }),
                              h.a.createElement(x.a, {
                                label: "Kostenplaats",
                                id: "costCenterId",
                                name: "costCenterId",
                                options: this.props.costCenters,
                                optionName: "description",
                                value: p,
                                onChangeAction: this.handleCostCenterChange
                              })
                            )
                          : null,
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(
                            "div",
                            { className: "panel-part panel-heading" },
                            h.a.createElement(
                              "span",
                              { className: "h5 text-bold" },
                              "Orderregel"
                            )
                          )
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(Y.a, {
                            label: "Omschrijving",
                            id: "description",
                            name: "description",
                            value: s,
                            onChangeAction: this.handleInputChangeProduct,
                            required: "required",
                            error: this.state.errors.description
                          }),
                          h.a.createElement(Y.a, {
                            label: "Aantal",
                            type: "number",
                            id: "amount",
                            name: "amount",
                            value: t,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.amount
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(Y.a, {
                            label: "Kortingspercentage",
                            type: "number",
                            id: "percentageReduction",
                            name: "percentageReduction",
                            value: r,
                            onChangeAction: this.handleInputChange
                          }),
                          h.a.createElement(Y.a, {
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
                          h.a.createElement(Y.a, {
                            label: "Kortingsbedrag",
                            type: "number",
                            id: "amountReduction",
                            name: "amountReduction",
                            value: a,
                            onChangeAction: this.handleInputChange
                          }),
                          h.a.createElement(Y.a, {
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
                          h.a.createElement(q.a, {
                            label: "Begin datum",
                            name: "dateStart",
                            value: n,
                            onChangeAction: this.handleInputChangeStartDate,
                            required: "required",
                            error: this.state.errors.dateStart
                          }),
                          "none" !== l &&
                            h.a.createElement(q.a, {
                              label: "Eind datum",
                              name: "dateEnd",
                              value: o,
                              onChangeAction: this.handleInputChangeDate,
                              error: this.state.errors.dateEnd
                            })
                        ),
                        "none" !== l &&
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(q.a, {
                              label: "1ste notaperiode start op",
                              name: "datePeriodStartFirstInvoice",
                              value: i,
                              onChangeAction: this.handleInputChangeDate,
                              error: this.state.errors
                                .datePeriodStartFirstInvoice,
                              required: "required"
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
                          h.a.createElement(N.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props
                              .toggleShowNewProductOneTime
                          }),
                          h.a.createElement(N.a, {
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
        Me = Object(f.b)(
          function(e) {
            return {
              orderDetails: e.orderDetails,
              administrationId: e.administrationDetails.id,
              productDurations: e.systemData.productDurations,
              productInvoiceFrequencies: e.systemData.productInvoiceFrequencies,
              productPaymentTypes: e.systemData.productPaymentTypes,
              products: e.systemData.products,
              costCenters: e.systemData.costCenters,
              ledgers: e.systemData.ledgers,
              vatCodes: e.systemData.vatCodes,
              usesTwinfield: e.systemData.usesTwinfield
            };
          },
          function(e) {
            return {
              fetchOrderDetails: function(t) {
                e(Object(g.a)(t));
              }
            };
          }
        )(Ye);
      function Ae(e) {
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
            r = m()(e);
          if (t) {
            var n = m()(this).constructor;
            a = Reflect.construct(r, arguments, n);
          } else a = r.apply(this, arguments);
          return d()(this, a);
        };
      }
      var Fe = (function(e) {
          s()(a, e);
          var t = Ae(a);
          function a(e) {
            var r;
            return (
              n()(this, a),
              (r = t.call(this, e)),
              y()(E()(r), "toggleShowNew", function() {
                r.props.orderDetails.canEdit
                  ? r.setState({ showNew: !r.state.showNew })
                  : r.props.setError(
                      405,
                      "Een order met daar aan gekoppeld een nota met de status “Te verzenden” kan niet worden aangepast(de order zit in de map “Order – Te verzenden”). Wil je deze order toch aanpassen? Verwijder dan eerst de “Te verzenden” nota. Dan kom deze order weer in de “Order – te factureren”.  Pas de order aan en maak vervolgens opnieuw de nota."
                    );
              }),
              y()(E()(r), "toggleShowNewProduct", function() {
                r.props.orderDetails.canEdit
                  ? r.setState({ showNewProduct: !r.state.showNewProduct })
                  : r.props.setError(
                      405,
                      "Een order met daar aan gekoppeld een nota met de status “Te verzenden” kan niet worden aangepast(de order zit in de map “Order – Te verzenden”). Wil je deze order toch aanpassen? Verwijder dan eerst de “Te verzenden” nota. Dan kom deze order weer in de “Order – te factureren”.  Pas de order aan en maak vervolgens opnieuw de nota."
                    );
              }),
              y()(E()(r), "toggleShowNewProductOneTime", function() {
                r.props.orderDetails.canEdit
                  ? r.setState({
                      showNewProductOneTime: !r.state.showNewProductOneTime
                    })
                  : r.props.setError(
                      405,
                      "Een order met daar aan gekoppeld een nota met de status “Te verzenden” kan niet worden aangepast(de order zit in de map “Order – Te verzenden”). Wil je deze order toch aanpassen? Verwijder dan eerst de “Te verzenden” nota. Dan kom deze order weer in de “Order – te factureren”.  Pas de order aan en maak vervolgens opnieuw de nota."
                    );
              }),
              (r.state = {
                showNew: !1,
                showNewProduct: !1,
                showNewProductOneTime: !1
              }),
              r
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    M.a,
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
                            "Orderregels"
                          )
                        ),
                        this.props.permissions.manageFinancial &&
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
                      A.a,
                      null,
                      h.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        h.a.createElement(be, null)
                      ),
                      h.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          h.a.createElement(Ie, {
                            toggleShowNew: this.toggleShowNew
                          }),
                        this.state.showNewProduct &&
                          h.a.createElement(ke, {
                            toggleShowNewProduct: this.toggleShowNewProduct
                          }),
                        this.state.showNewProductOneTime &&
                          h.a.createElement(Me, {
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
        xe = Object(f.b)(
          function(e) {
            return {
              permissions: e.meDetails.permissions,
              orderDetails: e.orderDetails
            };
          },
          function(e) {
            return {
              setError: function(t, a) {
                e(Object(X.b)(t, a));
              }
            };
          }
        )(Fe);
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
            r = m()(e);
          if (t) {
            var n = m()(this).constructor;
            a = Reflect.construct(r, arguments, n);
          } else a = r.apply(this, arguments);
          return d()(this, a);
        };
      }
      z.a.locale("nl");
      var qe = (function(e) {
          s()(a, e);
          var t = Le(a);
          function a(e) {
            return n()(this, a), t.call(this, e);
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  var e = "",
                    t = !0;
                  return (
                    this.props.hasError
                      ? (e = "Fout bij het ophalen van order.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : Object(T.isEmpty)(this.props.orderDetails)
                      ? (e = "Geen order gevonden!")
                      : (t = !1),
                    t
                      ? h.a.createElement("div", null, e)
                      : h.a.createElement(
                          "div",
                          null,
                          h.a.createElement(ae, null),
                          h.a.createElement(xe, null),
                          h.a.createElement(oe, null)
                        )
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        Ve = Object(f.b)(function(e) {
          return {
            orderDetails: e.orderDetails,
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        })(qe);
      function Be(e) {
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
            r = m()(e);
          if (t) {
            var n = m()(this).constructor;
            a = Reflect.construct(r, arguments, n);
          } else a = r.apply(this, arguments);
          return d()(this, a);
        };
      }
      var ze = (function(e) {
          s()(a, e);
          var t = Be(a);
          function a(e) {
            var r;
            return (
              n()(this, a),
              (r = t.call(this, e)),
              y()(E()(r), "openItem", function(e) {
                P.f.push("/taak/".concat(e));
              }),
              (r.state = { relatedTasks: "" }),
              r
            );
          }
          return (
            i()(a, [
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
                                z()(t.createdAt).format("L"),
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
        _e = Object(f.b)(function(e) {
          return { relatedTasks: e.orderDetails.relatedTasks };
        })(ze),
        We = Object(f.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showTasksList,
            r = e.newTask,
            n = e.taskCount,
            o = e.permissions;
          return h.a.createElement(
            M.a,
            { className: "harmonica-button" },
            h.a.createElement(
              A.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                h.a.createElement(
                  "span",
                  null,
                  "TAKEN/NOTITIES ",
                  h.a.createElement("span", { className: "badge" }, n)
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-2" },
                o.manageTask &&
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
                              return r("open");
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
                              return r("afgehandeld");
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
                a && h.a.createElement(_e, null)
              )
            )
          );
        });
      function Ge(e) {
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
            r = m()(e);
          if (t) {
            var n = m()(this).constructor;
            a = Reflect.construct(r, arguments, n);
          } else a = r.apply(this, arguments);
          return d()(this, a);
        };
      }
      var Ke = (function(e) {
          s()(a, e);
          var t = Ge(a);
          function a(e) {
            var r;
            return (
              n()(this, a),
              (r = t.call(this, e)),
              y()(E()(r), "openItem", function(e) {
                P.f.push("/email/".concat(e));
              }),
              r
            );
          }
          return (
            i()(a, [
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
                                z()(t.date_sent).format("L")
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
        Qe = Object(f.b)(function(e) {
          return { relatedEmails: e.orderDetails.relatedEmails };
        })(Ke),
        He = function(e) {
          var t = e.toggleShowList,
            a = e.showEmailsList,
            r = e.newEmail,
            n = e.emailCount;
          return h.a.createElement(
            M.a,
            { className: "harmonica-button" },
            h.a.createElement(
              A.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                h.a.createElement(
                  "span",
                  { onClick: t, className: "" },
                  "E-MAILS ",
                  h.a.createElement("span", { className: "badge" }, n)
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-2" },
                h.a.createElement(
                  "a",
                  { role: "button", className: "pull-right", onClick: r },
                  h.a.createElement("span", {
                    className: "glyphicon glyphicon-plus glyphicon-white"
                  })
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && h.a.createElement(Qe, null)
              )
            )
          );
        };
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
            r = m()(e);
          if (t) {
            var n = m()(this).constructor;
            a = Reflect.construct(r, arguments, n);
          } else a = r.apply(this, arguments);
          return d()(this, a);
        };
      }
      var Je = (function(e) {
          s()(a, e);
          var t = Ue(a);
          function a(e) {
            var r;
            return (
              n()(this, a),
              (r = t.call(this, e)),
              y()(E()(r), "openItem", function(e) {
                P.f.push("/document/".concat(e));
              }),
              (r.state = { relatedDocuments: "" }),
              r
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedDocuments;
                  return h.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      h.a.createElement(
                        "div",
                        null,
                        "Geen documenten gevonden."
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
                                { className: "col-xs-5 clickable" },
                                z()(t.createdAt).format("L")
                              ),
                              h.a.createElement(
                                "td",
                                { className: "col-xs-6 clickable" },
                                t.filename
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
        Xe = Object(f.b)(function(e) {
          return { relatedDocuments: e.orderDetails.relatedDocuments };
        })(Je),
        Ze = Object(f.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showDocumentsList,
            r = e.newDocument,
            n = e.documentCount,
            o = e.permissions;
          return h.a.createElement(
            M.a,
            { className: "harmonica-button" },
            h.a.createElement(
              A.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                h.a.createElement(
                  "span",
                  null,
                  "DOCUMENTEN ",
                  h.a.createElement("span", { className: "badge" }, n)
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-2" },
                o.createDocument &&
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
                              return r("internal");
                            }
                          },
                          "Maak document"
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
                              return r("upload");
                            }
                          },
                          "Upload document"
                        )
                      )
                    )
                  )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && h.a.createElement(Xe, null)
              )
            )
          );
        });
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
            r = m()(e);
          if (t) {
            var n = m()(this).constructor;
            a = Reflect.construct(r, arguments, n);
          } else a = r.apply(this, arguments);
          return d()(this, a);
        };
      }
      var et = (function(e) {
          s()(a, e);
          var t = $e(a);
          function a(e) {
            var r;
            return (
              n()(this, a),
              (r = t.call(this, e)),
              y()(E()(r), "openItem", function(e) {
                P.f.push("/nota/".concat(e));
              }),
              (r.state = { relatedInvoices: "" }),
              r
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedInvoices;
                  return h.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      h.a.createElement("div", null, "Geen nota's gevonden."),
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
                                z()(t.createdAt).format("L"),
                                " - ",
                                t.number
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
        tt = Object(f.b)(function(e) {
          return { relatedInvoices: e.orderDetails.relatedInvoices };
        })(et),
        at = function(e) {
          var t = e.toggleShowList,
            a = e.showInvoicesList,
            r = e.invoiceCount;
          return h.a.createElement(
            M.a,
            { className: "harmonica-button" },
            h.a.createElement(
              A.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-sm-12", onClick: t, role: "button" },
                h.a.createElement(
                  "span",
                  null,
                  "NOTA'S ",
                  h.a.createElement("span", { className: "badge" }, r)
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && h.a.createElement(tt, null)
              )
            )
          );
        };
      function rt(e) {
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
            r = m()(e);
          if (t) {
            var n = m()(this).constructor;
            a = Reflect.construct(r, arguments, n);
          } else a = r.apply(this, arguments);
          return d()(this, a);
        };
      }
      var nt = (function(e) {
          s()(a, e);
          var t = rt(a);
          function a(e) {
            var r;
            return (
              n()(this, a),
              (r = t.call(this, e)),
              y()(E()(r), "openItem", function(e) {
                P.f.push("/nota/".concat(e));
              }),
              (r.state = { relatedInvoicesPaidCollection: "" }),
              r
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedInvoicesPaidCollection;
                  return h.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      h.a.createElement(
                        "div",
                        null,
                        "Geen geïncasseerde incasso's gevonden."
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
                                z()(t.createdAt).format("L"),
                                " - ",
                                t.number
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
        ot = Object(f.b)(function(e) {
          return {
            relatedInvoicesPaidCollection:
              e.orderDetails.relatedInvoicesPaidCollection
          };
        })(nt),
        it = function(e) {
          var t = e.toggleShowList,
            a = e.showInvoicesPaidCollectionList,
            r = e.invoicePaidCollectionCount;
          return h.a.createElement(
            M.a,
            { className: "harmonica-button" },
            h.a.createElement(
              A.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-sm-12", onClick: t, role: "button" },
                h.a.createElement(
                  "span",
                  null,
                  "GEÏNCASSEERDE INCASSO'S ",
                  h.a.createElement("span", { className: "badge" }, r)
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && h.a.createElement(ot, null)
              )
            )
          );
        };
      function ct(e) {
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
            r = m()(e);
          if (t) {
            var n = m()(this).constructor;
            a = Reflect.construct(r, arguments, n);
          } else a = r.apply(this, arguments);
          return d()(this, a);
        };
      }
      var st = (function(e) {
          s()(a, e);
          var t = ct(a);
          function a(e) {
            var r;
            return (
              n()(this, a),
              (r = t.call(this, e)),
              y()(E()(r), "openItem", function(e) {
                P.f.push("/nota/".concat(e));
              }),
              (r.state = { relatedInvoicesPaidTransfer: "" }),
              r
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedInvoicesPaidTransfer;
                  return h.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      h.a.createElement(
                        "div",
                        null,
                        "Geen overboekingen gevonden."
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
                                z()(t.createdAt).format("L"),
                                " - ",
                                t.number
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
        lt = Object(f.b)(function(e) {
          return {
            relatedInvoicesPaidTransfer:
              e.orderDetails.relatedInvoicesPaidTransfer
          };
        })(st),
        dt = function(e) {
          var t = e.toggleShowList,
            a = e.showInvoicesPaidTransferList,
            r = e.invoicePaidTransferCount;
          return h.a.createElement(
            M.a,
            { className: "harmonica-button" },
            h.a.createElement(
              A.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-sm-12", onClick: t, role: "button" },
                h.a.createElement(
                  "span",
                  null,
                  "OVERBOEKINGEN ",
                  h.a.createElement("span", { className: "badge" }, r)
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && h.a.createElement(lt, null)
              )
            )
          );
        };
      function ut(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, r);
        }
        return a;
      }
      function mt(e) {
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
      function pt(e) {
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
            r = m()(e);
          if (t) {
            var n = m()(this).constructor;
            a = Reflect.construct(r, arguments, n);
          } else a = r.apply(this, arguments);
          return d()(this, a);
        };
      }
      var ht = (function(e) {
          s()(a, e);
          var t = pt(a);
          function a(e) {
            var r;
            return (
              n()(this, a),
              (r = t.call(this, e)),
              y()(E()(r), "newTask", function(e) {
                P.f.push(
                  "/taak/nieuw/"
                    .concat(e, "/order/")
                    .concat(r.props.orderDetails.id)
                );
              }),
              y()(E()(r), "newEmail", function() {
                P.f.push("/email/nieuw");
              }),
              y()(E()(r), "newDocument", function(e) {
                P.f.push(
                  "/document/nieuw/"
                    .concat(e, "/order/")
                    .concat(r.props.orderDetails.id)
                );
              }),
              (r.state = {
                toggleShowList: {
                  tasks: !1,
                  emails: !1,
                  documents: !1,
                  invoices: !1,
                  invoicesPaidCollection: !1,
                  invoicesPaidTransfer: !1
                }
              }),
              (r.toggleShowList = r.toggleShowList.bind(E()(r))),
              r
            );
          }
          return (
            i()(a, [
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  this.props.id !== e.id &&
                    this.setState({
                      toggleShowList: {
                        tasks: !1,
                        emails: !1,
                        documents: !1,
                        invoices: !1,
                        invoicesPaidCollection: !1,
                        invoicesPaidTransfer: !1
                      }
                    });
                }
              },
              {
                key: "toggleShowList",
                value: function(e) {
                  this.setState(
                    mt(
                      mt({}, this.state),
                      {},
                      {
                        toggleShowList: mt(
                          mt({}, this.state.toggleShowList),
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
                    h.a.createElement(We, {
                      toggleShowList: function() {
                        return e.toggleShowList("tasks");
                      },
                      showTasksList: this.state.toggleShowList.tasks,
                      taskCount: this.props.orderDetails.taskCount,
                      newTask: this.newTask
                    }),
                    h.a.createElement(He, {
                      toggleShowList: function() {
                        return e.toggleShowList("emails");
                      },
                      showEmailsList: this.state.toggleShowList.emails,
                      newEmail: this.newEmail,
                      emailCount: this.props.orderDetails.emailCount
                    }),
                    h.a.createElement(Ze, {
                      toggleShowList: function() {
                        return e.toggleShowList("documents");
                      },
                      showDocumentsList: this.state.toggleShowList.documents,
                      newDocument: this.newDocument,
                      documentCount: this.props.orderDetails.documentCount
                    }),
                    h.a.createElement(at, {
                      toggleShowList: function() {
                        return e.toggleShowList("invoices");
                      },
                      showInvoicesList: this.state.toggleShowList.invoices,
                      invoiceCount: this.props.orderDetails.invoiceCount
                    }),
                    "collection" === this.props.orderDetails.paymentTypeId
                      ? h.a.createElement(it, {
                          toggleShowList: function() {
                            return e.toggleShowList("invoicesPaidCollection");
                          },
                          showInvoicesPaidCollectionList: this.state
                            .toggleShowList.invoicesPaidCollection,
                          invoicePaidCollectionCount: this.props.orderDetails
                            .invoicePaidCollectionCount
                        })
                      : h.a.createElement(dt, {
                          toggleShowList: function() {
                            return e.toggleShowList("invoicesPaidTransfer");
                          },
                          showInvoicesPaidTransferList: this.state
                            .toggleShowList.invoicesPaidTransfer,
                          invoicePaidTransferCount: this.props.orderDetails
                            .invoicePaidTransferCount
                        })
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        ft = Object(f.b)(function(e) {
          return {
            orderDetails: e.orderDetails,
            permissions: e.meDetails.permissions
          };
        }, null)(ht);
      function gt(e) {
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
            r = m()(e);
          if (t) {
            var n = m()(this).constructor;
            a = Reflect.construct(r, arguments, n);
          } else a = r.apply(this, arguments);
          return d()(this, a);
        };
      }
      var vt = (function(e) {
        s()(a, e);
        var t = gt(a);
        function a(e) {
          return n()(this, a), t.call(this, e);
        }
        return (
          i()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchOrderDetails(this.props.params.id);
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
                        M.a,
                        null,
                        h.a.createElement(
                          A.a,
                          { className: "panel-small" },
                          h.a.createElement(k, null)
                        )
                      )
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      h.a.createElement(Ve, null)
                    )
                  ),
                  h.a.createElement(
                    M.a,
                    { className: "col-md-3 harmonica" },
                    h.a.createElement(A.a, null, h.a.createElement(ft, null))
                  )
                );
              }
            }
          ]),
          a
        );
      })(p.Component);
      t.default = Object(f.b)(
        function(e) {
          return { orderDetails: e.orderDetails };
        },
        function(e) {
          return {
            fetchOrderDetails: function(t) {
              e(Object(g.a)(t));
            }
          };
        }
      )(vt);
    },
    690: function(e, t, a) {
      "use strict";
      var r = a(0),
        n = a.n(r),
        o = a(8),
        i = a.n(o),
        c = function(e) {
          var t = e.children,
            a = e.className,
            r = e.onMouseEnter,
            o = e.onMouseLeave;
          return n.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: r,
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
    691: function(e, t, a) {
      "use strict";
      var r = a(0),
        n = a.n(r),
        o = a(8),
        i = a.n(o),
        c = function(e) {
          var t = e.className,
            a = e.children;
          return n.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: i.a.string }),
        (t.a = c);
    },
    692: function(e, t, a) {
      "use strict";
      var r = a(0),
        n = a.n(r),
        o = a(8),
        i = a.n(o),
        c = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            r = e.onClickAction,
            o = e.type,
            i = e.value,
            c = e.loading,
            s = e.loadText,
            l = e.disabled;
          return c
            ? n.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: i,
                  disabled: c
                },
                n.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                s
              )
            : n.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm ".concat(t),
                  onClick: r,
                  value: i,
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
    693: function(e, t, a) {
      "use strict";
      var r = a(0),
        n = a.n(r),
        o = a(8),
        i = a.n(o),
        c = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            r = e.onClickAction,
            o = e.title,
            i = e.disabled;
          return n.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: r,
              disabled: i,
              title: o
            },
            n.a.createElement("span", { className: "glyphicon ".concat(a) })
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
    694: function(e, t, a) {
      "use strict";
      var r = a(0),
        n = a.n(r),
        o = a(8),
        i = a.n(o),
        c = function(e) {
          var t = e.label,
            a = e.type,
            r = e.className,
            o = e.size,
            i = e.id,
            c = e.placeholder,
            s = e.name,
            l = e.value,
            d = e.onClickAction,
            u = e.onChangeAction,
            m = e.onBlurAction,
            p = e.required,
            h = e.readOnly,
            f = e.maxLength,
            g = e.error,
            v = e.min,
            E = e.max,
            b = e.step,
            y = e.errorMessage,
            P = e.divSize,
            D = e.divClassName,
            C = e.autoComplete;
          return n.a.createElement(
            "div",
            { className: "form-group ".concat(P, " ").concat(D) },
            n.a.createElement(
              "label",
              { htmlFor: i, className: "col-sm-6 ".concat(p) },
              t
            ),
            n.a.createElement(
              "div",
              { className: "".concat(o) },
              n.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(r) + (g ? "has-error" : ""),
                id: i,
                placeholder: c,
                name: s,
                value: l,
                onClick: d,
                onChange: u,
                onBlur: m,
                readOnly: h,
                maxLength: f,
                min: v,
                max: E,
                autoComplete: C,
                step: b
              })
            ),
            g &&
              n.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                n.a.createElement(
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
          label: i.a.oneOfType([i.a.string, i.a.object]).isRequired,
          type: i.a.string,
          className: i.a.string,
          divClassName: i.a.string,
          size: i.a.string,
          divSize: i.a.string,
          id: i.a.string,
          placeholder: i.a.string,
          name: i.a.string.isRequired,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          onClickAction: i.a.func,
          onChangeAction: i.a.func,
          onBlurAction: i.a.func,
          required: i.a.string,
          readOnly: i.a.bool,
          maxLength: i.a.string,
          error: i.a.bool,
          min: i.a.string,
          max: i.a.string,
          step: i.a.string,
          errorMessage: i.a.string,
          autoComplete: i.a.string
        }),
        (t.a = c);
    },
    695: function(e, t, a) {
      "use strict";
      var r = a(0),
        n = a.n(r),
        o = a(4),
        i = a(8),
        c = a.n(i),
        s = function(e) {
          var t = e.label,
            a = e.className,
            r = e.id,
            i = e.value,
            c = e.link,
            s = e.hidden;
          return c.length > 0
            ? n.a.createElement(
                "div",
                { className: a, style: s ? { display: "none" } : {} },
                n.a.createElement(
                  "label",
                  { htmlFor: r, className: "col-sm-6" },
                  t
                ),
                n.a.createElement(
                  "div",
                  { className: "col-sm-6", id: r, onClick: null },
                  n.a.createElement(
                    o.b,
                    { to: c, className: "link-underline" },
                    i
                  )
                )
              )
            : n.a.createElement(
                "div",
                { className: a, style: s ? { display: "none" } : {} },
                n.a.createElement(
                  "label",
                  { htmlFor: r, className: "col-sm-6" },
                  t
                ),
                n.a.createElement("div", { className: "col-sm-6", id: r }, i)
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
      var r = a(0),
        n = a.n(r),
        o = a(8),
        i = a.n(o),
        c = function(e) {
          var t = e.label,
            a = e.className,
            r = e.size,
            o = e.id,
            i = e.name,
            c = e.value,
            s = e.options,
            l = e.onChangeAction,
            d = e.onBlurAction,
            u = e.required,
            m = e.error,
            p = e.errorMessage,
            h = e.optionValue,
            f = e.optionName,
            g = e.readOnly,
            v = e.placeholder,
            E = e.divClassName,
            b = e.emptyOption;
          return n.a.createElement(
            "div",
            { className: "form-group ".concat(r, " ").concat(E) },
            n.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(u) },
              t
            ),
            n.a.createElement(
              "div",
              { className: "col-sm-6" },
              n.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(a) + (m && " has-error"),
                  id: o,
                  name: i,
                  value: c,
                  onChange: l,
                  onBlur: d,
                  readOnly: g
                },
                b && n.a.createElement("option", { value: "" }, v),
                s.map(function(e) {
                  return n.a.createElement(
                    "option",
                    { key: e[h], value: e[h] },
                    e[f]
                  );
                })
              )
            ),
            m &&
              n.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                n.a.createElement(
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
          label: i.a.string.isRequired,
          className: i.a.string,
          size: i.a.string,
          id: i.a.string,
          name: i.a.string.isRequired,
          options: i.a.array,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          onChangeAction: i.a.func,
          onBlurAction: i.a.func,
          required: i.a.string,
          readOnly: i.a.bool,
          error: i.a.bool,
          errorMessage: i.a.string,
          emptyOption: i.a.bool,
          optionValue: i.a.string,
          optionName: i.a.string,
          placeholder: i.a.string
        }),
        (t.a = c);
    },
    698: function(e, t, a) {
      "use strict";
      var r = a(0),
        n = a.n(r),
        o = a(8),
        i = a.n(o),
        c = function(e) {
          var t = e.className,
            a = e.children;
          return n.a.createElement(
            "div",
            { className: "panel-heading ".concat(t) },
            a
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: i.a.string }),
        (t.a = c);
    },
    699: function(e, t, a) {
      "use strict";
      var r = a(24),
        n = a.n(r),
        o = a(25),
        i = a.n(o),
        c = a(22),
        s = a.n(c),
        l = a(26),
        d = a.n(l),
        u = a(27),
        m = a.n(u),
        p = a(16),
        h = a.n(p),
        f = a(6),
        g = a.n(f),
        v = a(0),
        E = a.n(v),
        b = a(8),
        y = a.n(b),
        P = a(707),
        D = a.n(P),
        C = a(708),
        I = a.n(C),
        S = a(7),
        N = a.n(S);
      function w(e) {
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
            r = h()(e);
          if (t) {
            var n = h()(this).constructor;
            a = Reflect.construct(r, arguments, n);
          } else a = r.apply(this, arguments);
          return m()(this, a);
        };
      }
      N.a.locale("nl");
      var O = (function(e) {
        d()(a, e);
        var t = w(a);
        function a(e) {
          var r;
          return (
            n()(this, a),
            (r = t.call(this, e)),
            g()(s()(r), "validateDate", function(e) {
              var t = N()(e.target.value, "DD-MM-YYYY", !0),
                a = !1;
              t.isValid() || "" === e.target.value || (a = !0),
                r.props.disabledBefore &&
                  t.isBefore(r.props.disabledBefore) &&
                  (a = !0),
                r.props.disabledAfter &&
                  t.isAfter(r.props.disabledAfter) &&
                  (a = !0),
                r.setState({ errorDateFormat: a });
            }),
            g()(s()(r), "onDateChange", function(e) {
              var t = e ? N()(e).format("Y-MM-DD") : "",
                a = !1;
              t &&
                r.props.disabledBefore &&
                N()(t).isBefore(r.props.disabledBefore) &&
                (a = !0),
                t &&
                  r.props.disabledAfter &&
                  N()(t).isAfter(r.props.disabledAfter) &&
                  (a = !0),
                r.setState({ errorDateFormat: a }),
                !a && r.props.onChangeAction(t, r.props.name);
            }),
            (r.state = { errorDateFormat: !1 }),
            r
          );
        }
        return (
          i()(a, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.label,
                  a = e.className,
                  r = e.size,
                  n = e.divSize,
                  o = e.id,
                  i = e.value,
                  c = e.required,
                  s = e.readOnly,
                  l = e.name,
                  d = e.error,
                  u = e.errorMessage,
                  m = e.disabledBefore,
                  p = e.disabledAfter,
                  h = i ? N()(i).format("L") : "",
                  f = {};
                return (
                  m && (f.before = new Date(m)),
                  p && (f.after = new Date(p)),
                  E.a.createElement(
                    "div",
                    { className: "form-group ".concat(n) },
                    E.a.createElement(
                      "div",
                      null,
                      E.a.createElement(
                        "label",
                        { htmlFor: o, className: "col-sm-6 ".concat(c) },
                        t
                      )
                    ),
                    E.a.createElement(
                      "div",
                      { className: "".concat(r) },
                      E.a.createElement(D.a, {
                        id: o,
                        value: h,
                        formatDate: C.formatDate,
                        parseDate: C.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: I.a,
                          disabledDays: f
                        },
                        inputProps: {
                          className:
                            "form-control input-sm ".concat(a) +
                            (this.state.errorDateFormat || d
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
                    d &&
                      E.a.createElement(
                        "div",
                        { className: "col-sm-offset-6 col-sm-6" },
                        E.a.createElement(
                          "span",
                          { className: "has-error-message" },
                          " ",
                          u
                        )
                      )
                  )
                );
              }
            }
          ]),
          a
        );
      })(v.Component);
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
        (t.a = O);
    },
    709: function(e, t, a) {
      "use strict";
      var r = a(0),
        n = a.n(r),
        o = a(8),
        i = a.n(o),
        c = a(714),
        s =
          (a(715),
          function(e) {
            var t = e.label,
              a = e.divSize,
              r = e.size,
              o = e.id,
              i = e.name,
              s = e.value,
              l = e.options,
              d = e.optionId,
              u = e.optionName,
              m = e.onChangeAction,
              p = e.required,
              h = e.multi,
              f = e.error,
              g = e.isLoading;
            return n.a.createElement(
              "div",
              { className: "form-group ".concat(a) },
              n.a.createElement(
                "label",
                { htmlFor: o, className: "col-sm-6 ".concat(p) },
                t
              ),
              n.a.createElement(
                "div",
                { className: "".concat(r) },
                n.a.createElement(c.a, {
                  id: o,
                  name: i,
                  value: s,
                  onChange: function(e) {
                    m(e || "", i);
                  },
                  options: l,
                  valueKey: d,
                  labelKey: u,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: h,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: f ? " has-error" : "",
                  isLoading: g
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
          label: i.a.string.isRequired,
          className: i.a.string,
          size: i.a.string,
          divSize: i.a.string,
          id: i.a.string,
          name: i.a.string.isRequired,
          options: i.a.array.isRequired,
          optionId: i.a.string,
          optionName: i.a.string,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          onChangeAction: i.a.func,
          onBlurAction: i.a.func,
          required: i.a.string,
          readOnly: i.a.bool,
          error: i.a.bool,
          multi: i.a.bool,
          isLoading: i.a.bool
        }),
        (t.a = s);
    },
    750: function(e, t, a) {
      "use strict";
      a.d(t, "a", function() {
        return r;
      }),
        a.d(t, "b", function() {
          return n;
        });
      var r = function(e) {
          return { type: "FETCH_ORDER_DETAILS", id: e };
        },
        n = function(e, t) {
          return { type: "UPDATE_ORDER", order: e, switchToView: t };
        };
    },
    794: function(e, t, a) {
      "use strict";
      a.d(t, "d", function() {
        return r;
      }),
        a.d(t, "a", function() {
          return n;
        }),
        a.d(t, "c", function() {
          return o;
        }),
        a.d(t, "e", function() {
          return i;
        }),
        a.d(t, "b", function() {
          return c;
        });
      var r = function(e, t, a, r) {
          return {
            type: "FETCH_ORDERS",
            filters: e,
            sorts: t,
            pagination: a,
            administrationId: r
          };
        },
        n = function() {
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
