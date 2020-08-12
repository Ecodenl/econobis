(window.webpackJsonp = window.webpackJsonp || []).push([
  [70],
  {
    1442: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(11),
        l = a.n(n),
        r = a(24),
        o = a.n(r),
        s = a(25),
        i = a.n(s),
        c = a(22),
        m = a.n(c),
        u = a(26),
        d = a.n(u),
        h = a(27),
        p = a.n(h),
        f = a(16),
        g = a.n(f),
        v = a(6),
        b = a.n(v),
        E = a(0),
        y = a.n(E),
        N = a(4),
        w = a(697),
        A = a.n(w),
        I = a(32),
        C = Object(I.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(function(e) {
          var t = e.attachment.name;
          return y.a.createElement(
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
            y.a.createElement("div", { className: "col-sm-11" }, t),
            y.a.createElement(
              "div",
              { className: "col-sm-1" },
              e.showActionButtons
                ? y.a.createElement(
                    "a",
                    { role: "button", onClick: e.toggleDelete },
                    y.a.createElement("span", {
                      className: "glyphicon glyphicon-trash mybtn-danger"
                    }),
                    " "
                  )
                : ""
            )
          );
        }),
        T = a(100),
        k =
          (a(745),
          function(e) {
            return y.a.createElement(
              T.a,
              {
                buttonConfirmText: "Verwijder",
                buttonClassName: "btn-danger",
                closeModal: e.toggleDelete,
                confirmAction: function() {
                  return (
                    e.deleteAttachment(e.attachment.name), void e.toggleDelete()
                  );
                },
                title: "Verwijderen"
              },
              y.a.createElement("p", null, "Wil je deze bijlage verwijderen?")
            );
          });
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
          var a,
            n = g()(e);
          if (t) {
            var l = g()(this).constructor;
            a = Reflect.construct(n, arguments, l);
          } else a = n.apply(this, arguments);
          return p()(this, a);
        };
      }
      var x = (function(e) {
          d()(a, e);
          var t = S(a);
          function a(e) {
            var n;
            return (
              o()(this, a),
              (n = t.call(this, e)),
              b()(m()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              b()(m()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              b()(m()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              (n.state = {
                showActionButtons: !1,
                highlightLine: "",
                showDelete: !1
              }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  return y.a.createElement(
                    "div",
                    null,
                    y.a.createElement(C, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      toggleDelete: this.toggleDelete,
                      attachment: this.props.attachment
                    }),
                    this.state.showDelete &&
                      y.a.createElement(k, {
                        toggleDelete: this.toggleDelete,
                        attachment: this.props.attachment,
                        deleteAttachment: this.props.deleteAttachment
                      })
                  );
                }
              }
            ]),
            a
          );
        })(E.Component),
        R = function(e) {
          var t = e.attachments,
            a = e.deleteAttachment;
          return y.a.createElement(
            "div",
            null,
            y.a.createElement(
              "div",
              { className: "row border header" },
              y.a.createElement("div", { className: "col-sm-11" }, "Bestand"),
              y.a.createElement("div", { className: "col-sm-1" })
            ),
            t.length > 0
              ? t.map(function(e) {
                  return y.a.createElement(x, {
                    key: e.name,
                    attachment: e,
                    deleteAttachment: a
                  });
                })
              : y.a.createElement("div", null, "Geen bijlagen bekend.")
          );
        };
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
          var a,
            n = g()(e);
          if (t) {
            var l = g()(this).constructor;
            a = Reflect.construct(n, arguments, l);
          } else a = n.apply(this, arguments);
          return p()(this, a);
        };
      }
      var D = a(771).default,
        j = (function(e) {
          d()(a, e);
          var t = B(a);
          function a(e) {
            var n;
            return (
              o()(this, a),
              ((n = t.call(this, e)).state = { error: !1, errorMaxSize: !1 }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "onDropAccepted",
                value: function(e) {
                  var t = this;
                  this.props.addAttachment(e),
                    setTimeout(function() {
                      t.props.toggleShowNew();
                    }, 500);
                }
              },
              {
                key: "onDropRejected",
                value: function() {
                  this.setState({ errorMaxSize: !0 });
                }
              },
              {
                key: "render",
                value: function() {
                  return y.a.createElement(
                    T.a,
                    {
                      closeModal: this.props.toggleShowNew,
                      showConfirmAction: !1,
                      title: "Upload bestand"
                    },
                    y.a.createElement(
                      "div",
                      { className: "upload-file-content" },
                      y.a.createElement(
                        D,
                        {
                          className: "dropzone",
                          onDropAccepted: this.onDropAccepted.bind(this),
                          onDropRejected: this.onDropRejected.bind(this),
                          maxSize: 6e6
                        },
                        y.a.createElement(
                          "p",
                          null,
                          "Klik hier voor het uploaden van een bestand"
                        ),
                        y.a.createElement(
                          "p",
                          null,
                          y.a.createElement("strong", null, "of"),
                          " sleep het bestand hierheen"
                        )
                      )
                    ),
                    this.state.error &&
                      y.a.createElement(
                        "p",
                        { className: "has-error-message" },
                        "Uploaden mislukt. Probeer nogmaals een bestand te uploaden."
                      ),
                    this.state.errorMaxSize &&
                      y.a.createElement(
                        "p",
                        { className: "has-error-message" },
                        "Uploaden mislukt. Het bestand mag maximaal 6MB groot zijn."
                      )
                  );
                }
              }
            ]),
            a
          );
        })(E.Component),
        M = a(691),
        L = a(698),
        O = a(690);
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
            n = g()(e);
          if (t) {
            var l = g()(this).constructor;
            a = Reflect.construct(n, arguments, l);
          } else a = n.apply(this, arguments);
          return p()(this, a);
        };
      }
      var P = (function(e) {
          d()(a, e);
          var t = q(a);
          function a(e) {
            var n;
            return (
              o()(this, a),
              (n = t.call(this, e)),
              b()(m()(n), "toggleShowNew", function() {
                n.setState({ showNew: !n.state.showNew });
              }),
              (n.state = { showNew: !1 }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  return y.a.createElement(
                    O.a,
                    null,
                    y.a.createElement(
                      L.a,
                      null,
                      y.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Bijlagen"
                      ),
                      y.a.createElement(
                        "a",
                        {
                          role: "button",
                          className: "pull-right",
                          onClick: this.toggleShowNew
                        },
                        y.a.createElement("span", {
                          className: "glyphicon glyphicon-plus"
                        })
                      )
                    ),
                    y.a.createElement(
                      M.a,
                      null,
                      y.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        y.a.createElement(R, {
                          attachments: this.props.attachments,
                          deleteAttachment: this.props.deleteAttachment
                        })
                      ),
                      y.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          y.a.createElement(j, {
                            toggleShowNew: this.toggleShowNew,
                            addAttachment: this.props.addAttachment
                          })
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(E.Component),
        z = Object(I.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(P),
        _ = (a(737), a(825)),
        F = a(723),
        U = a(942),
        V = function(e) {
          var t = e.email,
            a = e.emailAddresses,
            n = e.mailboxAddresses,
            l = e.emailTemplates,
            r = e.errors,
            o = e.handleFromIds,
            s = e.handleToIds,
            i = e.handleEmailTemplates,
            c = e.handleCcIds,
            m = e.handleBccIds,
            u = e.handleInputChange,
            d = e.handleTextChange,
            h = t.from,
            p = t.to,
            f = t.cc,
            g = t.bcc,
            v = t.subject,
            b = t.htmlBody,
            E = t.emailTemplateId;
          return y.a.createElement(
            O.a,
            null,
            y.a.createElement(
              M.a,
              null,
              y.a.createElement(
                "div",
                { className: "row" },
                y.a.createElement(F.a, {
                  label: "Van selecteren",
                  name: "from",
                  value: h,
                  options: n,
                  optionName: "email",
                  onChangeAction: o,
                  required: "required",
                  error: r.from,
                  multi: !1
                })
              ),
              y.a.createElement(
                "div",
                { className: "row" },
                y.a.createElement(_.a, {
                  label: y.a.createElement(
                    "span",
                    null,
                    "Aan selecteren",
                    (p + "").split(",").length > 1
                      ? y.a.createElement(
                          y.a.Fragment,
                          null,
                          y.a.createElement("br", null),
                          y.a.createElement(
                            "small",
                            { style: { color: "red", fontWeight: "normal" } },
                            "Meer dan 1 geselecteerd."
                          ),
                          y.a.createElement("br", null),
                          y.a.createElement(
                            "small",
                            { style: { color: "red", fontWeight: "normal" } },
                            "Samenvoegvelden contact niet mogelijk."
                          )
                        )
                      : ""
                  ),
                  name: "to",
                  value: p,
                  options: a,
                  optionName: "name",
                  onChangeAction: s,
                  allowCreate: !0,
                  required: "required",
                  error: r.to
                })
              ),
              y.a.createElement(
                "div",
                { className: "row" },
                y.a.createElement(_.a, {
                  label: "Cc selecteren",
                  name: "cc",
                  value: f,
                  options: a,
                  optionName: "name",
                  onChangeAction: c
                })
              ),
              y.a.createElement(
                "div",
                { className: "row" },
                y.a.createElement(_.a, {
                  label: "Bcc selecteren",
                  name: "bcc",
                  value: g,
                  options: a,
                  optionName: "name",
                  onChangeAction: m
                })
              ),
              y.a.createElement(
                "div",
                { className: "row" },
                y.a.createElement(F.a, {
                  label: "Template",
                  name: "emailTemplateId",
                  value: E,
                  options: l,
                  onChangeAction: i,
                  multi: !1
                })
              ),
              y.a.createElement(
                "div",
                { className: "row" },
                y.a.createElement(
                  "div",
                  { className: "form-group col-sm-12" },
                  y.a.createElement(
                    "div",
                    { className: "row" },
                    y.a.createElement(
                      "div",
                      { className: "col-sm-3" },
                      y.a.createElement(
                        "label",
                        { className: "col-sm-12 required" },
                        "Onderwerp"
                      )
                    ),
                    y.a.createElement(
                      "div",
                      { className: "col-sm-9" },
                      y.a.createElement("input", {
                        type: "text",
                        className: "form-control input-sm ".concat(
                          r.subject ? "has-error" : ""
                        ),
                        name: "subject",
                        value: v,
                        onChange: u
                      })
                    )
                  )
                )
              ),
              y.a.createElement(
                "div",
                { className: "row" },
                y.a.createElement(
                  "div",
                  { className: "form-group col-sm-12" },
                  y.a.createElement(
                    "div",
                    { className: "row" },
                    y.a.createElement(U.a, {
                      label: "Tekst",
                      value: b,
                      onChangeAction: d
                    })
                  )
                )
              )
            )
          );
        },
        W = function(e) {
          var t = e.email,
            a = e.mailboxAddresses,
            n = e.emailAddresses,
            l = e.emailTemplates,
            r = e.errors,
            o = e.handleSubmit,
            s = e.handleFromIds,
            i = e.handleEmailTemplates,
            c = e.handleToIds,
            m = e.handleCcIds,
            u = e.handleBccIds,
            d = e.handleInputChange,
            h = e.handleTextChange,
            p = e.addAttachment,
            f = e.deleteAttachment;
          return y.a.createElement(
            "form",
            { className: "form-horizontal", onSubmit: o },
            y.a.createElement(V, {
              email: t,
              emailAddresses: n,
              mailboxAddresses: a,
              emailTemplates: l,
              errors: r,
              handleSubmit: o,
              handleFromIds: s,
              handleEmailTemplates: i,
              handleToIds: c,
              handleCcIds: m,
              handleBccIds: u,
              handleInputChange: d,
              handleTextChange: h
            }),
            y.a.createElement(z, {
              attachments: t.attachments,
              addAttachment: p,
              deleteAttachment: f
            })
          );
        },
        G = a(693),
        X = a(692),
        J = function(e) {
          var t = e.handleSubmit,
            a = e.loading,
            n = e.goBack;
          return y.a.createElement(
            "div",
            { className: "row" },
            y.a.createElement(
              "div",
              { className: "col-md-4" },
              y.a.createElement(
                "div",
                {
                  className: "btn-group margin-small margin-10-right",
                  role: "group"
                },
                y.a.createElement(G.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: n
                })
              ),
              y.a.createElement(
                "div",
                { className: "btn-group margin-small", role: "group" },
                y.a.createElement(X.a, {
                  buttonText: "Opslaan als concept",
                  onClickAction: function(e) {
                    t(e, !0);
                  }
                }),
                y.a.createElement(X.a, {
                  buttonText: "Verstuur e-mail",
                  onClickAction: t,
                  loading: a,
                  loadText: "E-mail verzenden"
                })
              )
            ),
            y.a.createElement(
              "div",
              { className: "col-md-4" },
              y.a.createElement(
                "h4",
                { className: "text-center margin-small" },
                "Nieuwe e-mail"
              )
            ),
            y.a.createElement("div", { className: "col-md-4" })
          );
        },
        K = a(148),
        H = a(215),
        Q = a(65),
        Y = a(104),
        Z = (a(198), a(151));
      function $(e, t) {
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
      function ee(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? $(Object(a), !0).forEach(function(t) {
                b()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : $(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function te(e) {
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
            n = g()(e);
          if (t) {
            var l = g()(this).constructor;
            a = Reflect.construct(n, arguments, l);
          } else a = n.apply(this, arguments);
          return p()(this, a);
        };
      }
      var ae = (function(e) {
        d()(a, e);
        var t = te(a);
        function a(e) {
          var n;
          return (
            o()(this, a),
            (n = t.call(this, e)),
            b()(m()(n), "setButtonLoading", function() {
              n.setState({ buttonLoading: !0 });
            }),
            b()(m()(n), "goBack", function() {
              "" !== n.state.email.htmlBody || "" !== n.state.email.subject
                ? n.toggleShowModal()
                : N.e.goBack();
            }),
            b()(m()(n), "toggleShowModal", function() {
              n.setState({ showModal: !n.state.showModal });
            }),
            (n.state = {
              showModal: !1,
              buttonLoading: !1,
              emailAddresses: [],
              mailboxAddresses: [],
              emailTemplates: [],
              email: {
                from: "",
                to: "",
                cc: "",
                bcc: "",
                templateId: "",
                subject: "",
                htmlBody: "",
                attachments: [],
                quotationRequestId: e.params.quotationRequestId
                  ? e.params.quotationRequestId
                  : "",
                intakeId: e.params.intakeId ? e.params.intakeId : ""
              },
              errors: { from: !1, to: !1, subject: !1 }
            }),
            (n.handleInputChange = n.handleInputChange.bind(m()(n))),
            (n.handleFromIds = n.handleFromIds.bind(m()(n))),
            (n.handleEmailTemplates = n.handleEmailTemplates.bind(m()(n))),
            (n.handleToIds = n.handleToIds.bind(m()(n))),
            (n.handleCcIds = n.handleCcIds.bind(m()(n))),
            (n.handleBccIds = n.handleBccIds.bind(m()(n))),
            (n.handleTextChange = n.handleTextChange.bind(m()(n))),
            (n.addAttachment = n.addAttachment.bind(m()(n))),
            (n.deleteAttachment = n.deleteAttachment.bind(m()(n))),
            (n.handleSubmit = n.handleSubmit.bind(m()(n))),
            n
          );
        }
        return (
          i()(a, [
            {
              key: "componentDidMount",
              value: function() {
                var e = this;
                this.props.params.contactId &&
                  H.a
                    .fetchPrimaryEmailAddressId(this.props.params.contactId)
                    .then(function(t) {
                      e.setState(
                        ee(
                          ee({}, e.state),
                          {},
                          {
                            email: ee(
                              ee({}, e.state.email),
                              {},
                              { to: t.join(",") }
                            )
                          }
                        )
                      );
                    }),
                  H.a.fetchEmailAddressessPeek().then(function(t) {
                    e.setState({ emailAddresses: t }, function() {
                      e.props.params.groupId &&
                        e.props.params.type &&
                        K.a
                          .fetchEmailGroup(e.props.params.groupId)
                          .then(function(t) {
                            var a = e.state.emailAddresses;
                            a.push({
                              id: "@group_" + e.props.params.groupId,
                              name: t
                            }),
                              e.setState(
                                ee(
                                  ee({}, e.state),
                                  {},
                                  {
                                    emailAddresses: a,
                                    email: ee(
                                      ee({}, e.state.email),
                                      {},
                                      b()(
                                        {},
                                        e.props.params.type,
                                        "@group_" + e.props.params.groupId
                                      )
                                    )
                                  }
                                )
                              );
                          });
                    });
                  }),
                  Q.a.fetchMailboxesLoggedInUserPeek().then(function(t) {
                    e.setState({ mailboxAddresses: t });
                  }),
                  Y.a.fetchEmailTemplatesPeek().then(function(t) {
                    e.setState({ emailTemplates: t });
                  }),
                  "bulk" === this.props.params.type &&
                    this.props.toIds &&
                    H.a
                      .fetchPrimaryEmailAddressId(this.props.toIds)
                      .then(function(t) {
                        e.setState(
                          ee(
                            ee({}, e.state),
                            {},
                            {
                              email: ee(
                                ee({}, e.state.email),
                                {},
                                { to: t.join(",") }
                              )
                            }
                          )
                        );
                      }),
                  this.props.params.documentId &&
                    Z.a
                      .fetchDocumentDetails(this.props.params.documentId)
                      .then(function(t) {
                        t.data.data.contact &&
                          H.a
                            .fetchPrimaryEmailAddressId(t.data.data.contact.id)
                            .then(function(t) {
                              e.setState(
                                ee(
                                  ee({}, e.state),
                                  {},
                                  {
                                    email: ee(
                                      ee({}, e.state.email),
                                      {},
                                      { to: t.join(",") }
                                    )
                                  }
                                )
                              );
                            });
                        var a = t.data.data.filename
                          ? t.data.data.filename
                          : "bijlage.pdf";
                        Z.a
                          .download(e.props.params.documentId)
                          .then(function(t) {
                            e.addAttachment([new File([t.data], a)]);
                          });
                      });
              }
            },
            {
              key: "handleInputChange",
              value: function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  n = t.name;
                this.setState(
                  ee(
                    ee({}, this.state),
                    {},
                    { email: ee(ee({}, this.state.email), {}, b()({}, n, a)) }
                  )
                );
              }
            },
            {
              key: "handleFromIds",
              value: function(e) {
                this.setState(
                  ee(
                    ee({}, this.state),
                    {},
                    { email: ee(ee({}, this.state.email), {}, { from: e }) }
                  )
                );
              }
            },
            {
              key: "handleToIds",
              value: function(e) {
                this.setState(
                  ee(
                    ee({}, this.state),
                    {},
                    { email: ee(ee({}, this.state.email), {}, { to: e }) }
                  )
                );
              }
            },
            {
              key: "handleEmailTemplates",
              value: function(e) {
                var t = this;
                this.setState(
                  ee(
                    ee({}, this.state),
                    {},
                    {
                      email: ee(
                        ee({}, this.state.email),
                        {},
                        { emailTemplateId: e }
                      )
                    }
                  )
                ),
                  Y.a.fetchEmailTemplateWithUser(e).then(function(e) {
                    t.setState(
                      ee(
                        ee({}, t.state),
                        {},
                        {
                          email: ee(
                            ee({}, t.state.email),
                            {},
                            {
                              subject: e.subject
                                ? e.subject
                                : t.state.email.subject,
                              htmlBody: e.htmlBody
                                ? e.htmlBody
                                : t.state.email.htmlBody
                            }
                          )
                        }
                      )
                    );
                  });
              }
            },
            {
              key: "handleCcIds",
              value: function(e) {
                this.setState(
                  ee(
                    ee({}, this.state),
                    {},
                    { email: ee(ee({}, this.state.email), {}, { cc: e }) }
                  )
                );
              }
            },
            {
              key: "handleBccIds",
              value: function(e) {
                this.setState(
                  ee(
                    ee({}, this.state),
                    {},
                    { email: ee(ee({}, this.state.email), {}, { bcc: e }) }
                  )
                );
              }
            },
            {
              key: "handleTextChange",
              value: function(e) {
                this.setState(
                  ee(
                    ee({}, this.state),
                    {},
                    {
                      email: ee(
                        ee({}, this.state.email),
                        {},
                        { htmlBody: e.target.getContent({ format: "raw" }) }
                      )
                    }
                  )
                );
              }
            },
            {
              key: "addAttachment",
              value: function(e) {
                this.setState(
                  ee(
                    ee({}, this.state),
                    {},
                    {
                      email: ee(
                        ee({}, this.state.email),
                        {},
                        {
                          attachments: [].concat(
                            l()(this.state.email.attachments),
                            l()(e)
                          )
                        }
                      )
                    }
                  )
                );
              }
            },
            {
              key: "deleteAttachment",
              value: function(e) {
                this.setState(
                  ee(
                    ee({}, this.state),
                    {},
                    {
                      email: ee(
                        ee({}, this.state.email),
                        {},
                        {
                          attachments: this.state.email.attachments.filter(
                            function(t) {
                              return t.name !== e;
                            }
                          )
                        }
                      )
                    }
                  )
                );
              }
            },
            {
              key: "handleSubmit",
              value: function(e) {
                var t =
                  arguments.length > 1 &&
                  void 0 !== arguments[1] &&
                  arguments[1];
                e.preventDefault();
                var a = this.state.email,
                  n = {},
                  l = !1;
                function r(e, t, a) {
                  K.a
                    .newConcept2(e, t, a)
                    .then(function() {
                      N.f.push("/emails/concept");
                    })
                    .catch(function(e) {});
                }
                function o(e, t, a) {
                  K.a
                    .newEmail(e, t, a)
                    .then(function() {
                      N.e.goBack();
                    })
                    .catch(function(e) {});
                }
                if (
                  (A.a.isEmpty("" + a.to) && ((n.to = !0), (l = !0)),
                  A.a.isEmpty("" + a.from) && ((n.from = !0), (l = !0)),
                  A.a.isEmpty("" + a.subject) && ((n.subject = !0), (l = !0)),
                  this.setState(ee(ee({}, this.state), {}, { errors: n })),
                  !l)
                ) {
                  a.to.length > 0 && (a.to = a.to.split(",")),
                    a.cc.length > 0 && (a.cc = a.cc.split(",")),
                    a.bcc.length > 0 && (a.bcc = a.bcc.split(","));
                  var s = new FormData();
                  s.append("to", JSON.stringify(a.to)),
                    s.append("cc", JSON.stringify(a.cc)),
                    s.append("bcc", JSON.stringify(a.bcc)),
                    s.append("quotationRequestId", a.quotationRequestId),
                    s.append("intakeId", a.intakeId),
                    a.attachments.map(function(e, t) {
                      s.append("attachments[" + t + "]", e);
                    }),
                    t
                      ? K.a
                          .newConcept(a, a.from)
                          .then(function(e) {
                            r(s, a.from, e.data);
                          })
                          .catch(function(e) {
                            console.log(e);
                          })
                      : (this.setButtonLoading(),
                        K.a
                          .newConcept(a, a.from)
                          .then(function(e) {
                            o(s, a.from, e.data);
                          })
                          .catch(function(e) {
                            console.log(e);
                          }));
                }
              }
            },
            {
              key: "render",
              value: function() {
                return y.a.createElement(
                  "div",
                  { className: "row" },
                  y.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    y.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      y.a.createElement(
                        O.a,
                        null,
                        y.a.createElement(
                          M.a,
                          { className: "panel-small" },
                          y.a.createElement(J, {
                            loading: this.state.buttonLoading,
                            handleSubmit: this.handleSubmit,
                            goBack: this.goBack
                          })
                        )
                      )
                    ),
                    y.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      y.a.createElement(W, {
                        email: this.state.email,
                        emailAddresses: this.state.emailAddresses,
                        mailboxAddresses: this.state.mailboxAddresses,
                        emailTemplates: this.state.emailTemplates,
                        errors: this.state.errors,
                        handleSubmit: this.handleSubmit,
                        handleFromIds: this.handleFromIds,
                        handleEmailTemplates: this.handleEmailTemplates,
                        handleToIds: this.handleToIds,
                        handleCcIds: this.handleCcIds,
                        handleBccIds: this.handleBccIds,
                        handleInputChange: this.handleInputChange,
                        handleTextChange: this.handleTextChange,
                        addAttachment: this.addAttachment,
                        deleteAttachment: this.deleteAttachment
                      })
                    )
                  ),
                  y.a.createElement("div", { className: "col-md-3" }),
                  this.state.showModal &&
                    y.a.createElement(
                      T.a,
                      {
                        buttonConfirmText: "Verlaten",
                        closeModal: this.toggleShowModal,
                        confirmAction: N.e.goBack,
                        title: "Bevestigen"
                      },
                      y.a.createElement(
                        "p",
                        null,
                        "Weet u zeker dat u deze pagina wilt verlaten zonder deze e-mail op te slaan als concept?"
                      )
                    )
                );
              }
            }
          ]),
          a
        );
      })(E.Component);
      t.default = Object(I.b)(function(e) {
        return { toIds: e.bulkMailTo.toIds };
      })(ae);
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        l = a.n(n),
        r = a(8),
        o = a.n(r),
        s = function(e) {
          var t = e.children,
            a = e.className,
            n = e.onMouseEnter,
            r = e.onMouseLeave;
          return l.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: r
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
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        l = a.n(n),
        r = a(8),
        o = a.n(r),
        s = function(e) {
          var t = e.className,
            a = e.children;
          return l.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: o.a.string }),
        (t.a = s);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        l = a.n(n),
        r = a(8),
        o = a.n(r),
        s = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            r = e.type,
            o = e.value,
            s = e.loading,
            i = e.loadText,
            c = e.disabled;
          return s
            ? l.a.createElement(
                "button",
                {
                  type: r,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: o,
                  disabled: s
                },
                l.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                i
              )
            : l.a.createElement(
                "button",
                {
                  type: r,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: o,
                  disabled: c
                },
                a
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
          buttonClassName: o.a.string,
          buttonText: o.a.string.isRequired,
          onClickAction: o.a.func,
          type: o.a.string,
          value: o.a.string,
          loading: o.a.bool,
          loadText: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = s);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        l = a.n(n),
        r = a(8),
        o = a.n(r),
        s = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            r = e.title,
            o = e.disabled;
          return l.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: o,
              title: r
            },
            l.a.createElement("span", { className: "glyphicon ".concat(a) })
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
    698: function(e, t, a) {
      "use strict";
      var n = a(0),
        l = a.n(n),
        r = a(8),
        o = a.n(r),
        s = function(e) {
          var t = e.className,
            a = e.children;
          return l.a.createElement(
            "div",
            { className: "panel-heading ".concat(t) },
            a
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: o.a.string }),
        (t.a = s);
    },
    723: function(e, t, a) {
      "use strict";
      var n = a(0),
        l = a.n(n),
        r = a(8),
        o = a.n(r),
        s = a(714),
        i =
          (a(715),
          function(e) {
            var t = e.label,
              a = (e.className, e.size),
              n = e.id,
              r = e.name,
              o = e.value,
              i = e.options,
              c = e.optionId,
              m = e.optionName,
              u = e.onChangeAction,
              d = e.required,
              h = e.multi,
              p = e.error;
            return l.a.createElement(
              "div",
              { className: "form-group col-sm-6" },
              l.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(d) },
                t
              ),
              l.a.createElement(
                "div",
                { className: "".concat(a) },
                l.a.createElement(s.a, {
                  id: n,
                  name: r,
                  value: o,
                  onChange: u,
                  options: i,
                  valueKey: c,
                  labelKey: m,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: h,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: p ? " has-error" : ""
                })
              )
            );
          });
      (i.defaultProps = {
        className: "",
        size: "col-sm-6",
        optionId: "id",
        optionName: "name",
        readOnly: !1,
        required: "",
        error: !1,
        value: "",
        multi: !0
      }),
        (i.propTypes = {
          label: o.a.string.isRequired,
          className: o.a.string,
          size: o.a.string,
          id: o.a.string,
          name: o.a.string.isRequired,
          options: o.a.array,
          optionId: o.a.string,
          optionName: o.a.string,
          value: o.a.string,
          onChangeAction: o.a.func,
          onBlurAction: o.a.func,
          required: o.a.string,
          readOnly: o.a.bool,
          error: o.a.bool,
          multi: o.a.bool
        }),
        (t.a = i);
    },
    737: function(e, t, a) {
      "use strict";
      var n = a(0),
        l = a.n(n),
        r = a(8),
        o = a.n(r),
        s =
          (a(752),
          a(753),
          a(754),
          a(755),
          a(756),
          a(757),
          a(758),
          a(759),
          a(760),
          a(761),
          a(762),
          a(770)),
        i = function(e) {
          var t = e.label,
            a = e.value,
            n = e.onChangeAction;
          return l.a.createElement(
            "div",
            null,
            l.a.createElement(
              "div",
              { className: "col-sm-3" },
              l.a.createElement(
                "label",
                { htmlFor: "quotationText", className: "col-sm-12" },
                t
              )
            ),
            l.a.createElement(
              "div",
              { className: "col-sm-9" },
              l.a.createElement(s.a, {
                initialValue: a,
                init: {
                  branding: !1,
                  language: "nl",
                  menubar: !1,
                  plugins:
                    "paste lists advlist link image code table textcolor pagebreak",
                  toolbar:
                    "undo redo | formatselect fontselect | bold italic forecolor | alignleft aligncenter alignright | pagebreak | bullist numlist outdent indent | table | link image | code",
                  height: "300",
                  browser_spellcheck: !0,
                  font_formats:
                    "Courier New=courier new;Tahoma=tahoma;Times New Roman=times new roman;Verdana=verdana;"
                },
                onChange: n
              })
            )
          );
        };
      (i.defaultProps = { value: "", errorMessage: "" }),
        (i.propTypes = {
          label: o.a.string.isRequired,
          type: o.a.string,
          id: o.a.string,
          placeholder: o.a.string,
          value: o.a.string,
          onChangeAction: o.a.func
        }),
        (t.a = i);
    },
    745: function(e, t, a) {
      "use strict";
      a.d(t, "c", function() {
        return n;
      }),
        a.d(t, "f", function() {
          return l;
        }),
        a.d(t, "e", function() {
          return r;
        }),
        a.d(t, "b", function() {
          return o;
        }),
        a.d(t, "d", function() {
          return s;
        }),
        a.d(t, "a", function() {
          return i;
        });
      var n = function(e) {
          return { type: "FETCH_MAILBOX_DETAILS", id: e };
        },
        l = function(e) {
          return { type: "UPDATE_MAILBOX_DETAILS", mailbox: e };
        },
        r = function(e) {
          return { type: "NEW_MAILBOX_USER", mailboxUser: e };
        },
        o = function(e, t) {
          return { type: "DELETE_MAILBOX_USER", mailboxId: e, userId: t };
        },
        s = function(e) {
          return { type: "NEW_MAILBOX_IGNORE", ignore: e };
        },
        i = function(e) {
          return { type: "DELETE_MAILBOX_IGNORE", ignoreId: e };
        };
    },
    825: function(e, t, a) {
      "use strict";
      var n = a(0),
        l = a.n(n),
        r = a(8),
        o = a.n(r),
        s = a(714),
        i =
          (a(715),
          function(e) {
            var t = e.label,
              a = (e.className, e.size),
              n = e.id,
              r = e.name,
              o = e.value,
              i = e.options,
              c = e.optionId,
              m = e.optionName,
              u = e.onChangeAction,
              d = e.required,
              h = (e.allowCreate, e.error);
            return l.a.createElement(
              "div",
              { className: "form-group col-sm-12" },
              l.a.createElement(
                "div",
                { className: "row" },
                l.a.createElement(
                  "div",
                  { className: "col-sm-3" },
                  l.a.createElement(
                    "label",
                    { htmlFor: n, className: "col-sm-12 ".concat(d) },
                    t
                  )
                ),
                l.a.createElement(
                  "div",
                  { className: "".concat(a) },
                  l.a.createElement(s.a.Creatable, {
                    id: n,
                    name: r,
                    value: o,
                    onChange: u,
                    options: i,
                    valueKey: c,
                    labelKey: m,
                    placeholder: "",
                    noResultsText: "Geen resultaat gevonden",
                    multi: !0,
                    simpleValue: !0,
                    removeSelected: !0,
                    promptTextCreator: function(e) {
                      return 'Maak optie "'.concat(e, '" aan');
                    },
                    className: h ? " has-error" : ""
                  })
                )
              )
            );
          });
      (i.defaultProps = {
        allowCreate: !1,
        className: "",
        size: "col-sm-6",
        optionId: "id",
        optionName: "name",
        readOnly: !1,
        required: "",
        error: !1,
        value: ""
      }),
        (i.propTypes = {
          allowCreate: o.a.bool,
          label: o.a.string.isRequired,
          className: o.a.string,
          size: o.a.string,
          id: o.a.string,
          name: o.a.string.isRequired,
          options: o.a.array,
          optionId: o.a.string,
          optionName: o.a.string,
          value: o.a.string,
          onChangeAction: o.a.func,
          onBlurAction: o.a.func,
          required: o.a.string,
          readOnly: o.a.bool,
          error: o.a.bool
        }),
        (t.a = i);
    },
    942: function(e, t, a) {
      "use strict";
      var n = a(24),
        l = a.n(n),
        r = a(25),
        o = a.n(r),
        s = a(26),
        i = a.n(s),
        c = a(27),
        m = a.n(c),
        u = a(16),
        d = a.n(u),
        h = a(0),
        p = a.n(h),
        f = a(8),
        g = a.n(f),
        v =
          (a(752),
          a(753),
          a(754),
          a(755),
          a(756),
          a(757),
          a(758),
          a(759),
          a(760),
          a(761),
          a(762),
          a(770)),
        b = a(198);
      function E(e) {
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
            n = d()(e);
          if (t) {
            var l = d()(this).constructor;
            a = Reflect.construct(n, arguments, l);
          } else a = n.apply(this, arguments);
          return m()(this, a);
        };
      }
      var y = (function(e) {
        i()(a, e);
        var t = E(a);
        function a() {
          return l()(this, a), t.apply(this, arguments);
        }
        return (
          o()(a, [
            {
              key: "componentDidUpdate",
              value: function(e) {
                if (this.props.value !== e.value) {
                  var t = window.tinymce.EditorManager.get("tinyMCEUpdateable");
                  this.props.value &&
                    !Object(b.isEqual)(
                      t.getContent({ format: "raw" }),
                      this.props.value
                    ) &&
                    (t.setContent(this.props.value),
                    t.selection.select(t.getBody(), !0),
                    t.selection.collapse(!1));
                }
              }
            },
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.label,
                  a = e.value,
                  n = e.onChangeAction;
                return p.a.createElement(
                  "div",
                  null,
                  p.a.createElement(
                    "div",
                    { className: "col-sm-3" },
                    p.a.createElement(
                      "label",
                      { htmlFor: "quotationText", className: "col-sm-12" },
                      t
                    )
                  ),
                  p.a.createElement(
                    "div",
                    { className: "col-sm-9" },
                    p.a.createElement(v.a, {
                      id: "tinyMCEUpdateable",
                      initialValue: a,
                      init: {
                        branding: !1,
                        language: "nl",
                        menubar: !1,
                        plugins:
                          "paste lists advlist link image code table textcolor pagebreak",
                        toolbar:
                          "undo redo | formatselect fontselect | bold italic forecolor | alignleft aligncenter alignright | pagebreak | bullist numlist outdent indent | table | link image | code",
                        height: "300",
                        browser_spellcheck: !0,
                        font_formats:
                          "Courier New=courier new;Tahoma=tahoma;Times New Roman=times new roman;Verdana=verdana;"
                      },
                      onChange: n
                    })
                  )
                );
              }
            }
          ]),
          a
        );
      })(h.Component);
      (y.defaultProps = { value: "", errorMessage: "" }),
        (y.propTypes = {
          label: g.a.string.isRequired,
          type: g.a.string,
          id: g.a.string,
          placeholder: g.a.string,
          value: g.a.string,
          onChangeAction: g.a.func
        }),
        (t.a = y);
    }
  }
]);
