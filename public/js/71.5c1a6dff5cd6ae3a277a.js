(window.webpackJsonp = window.webpackJsonp || []).push([
  [71],
  {
    1445: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(11),
        o = a.n(n),
        l = a(24),
        s = a.n(l),
        r = a(25),
        i = a.n(r),
        c = a(22),
        m = a.n(c),
        d = a(26),
        u = a.n(d),
        h = a(27),
        p = a.n(h),
        f = a(16),
        g = a.n(f),
        b = a(6),
        v = a.n(b),
        E = a(0),
        y = a.n(E),
        N = a(697),
        w = a.n(N),
        A = a(198),
        C = a(690),
        I = a(32),
        T = a(148),
        x = a(711),
        S = a.n(x),
        k = Object(I.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(function(e) {
          var t = e.attachment,
            a = t.id,
            n = t.name;
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
            y.a.createElement(
              "div",
              {
                onClick: function() {
                  return (function(e, t) {
                    T.a.downloadAttachment(e).then(function(e) {
                      S()(e.data, t);
                    });
                  })(a, n);
                },
                className: "col-sm-11"
              },
              n
            ),
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
        L = a(100),
        R =
          (a(745),
          function(e) {
            return y.a.createElement(
              L.a,
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
            var o = g()(this).constructor;
            a = Reflect.construct(n, arguments, o);
          } else a = n.apply(this, arguments);
          return p()(this, a);
        };
      }
      var O = (function(e) {
          u()(a, e);
          var t = B(a);
          function a(e) {
            var n;
            return (
              s()(this, a),
              (n = t.call(this, e)),
              v()(m()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              v()(m()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              v()(m()(n), "toggleDelete", function() {
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
                    y.a.createElement(k, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      toggleDelete: this.toggleDelete,
                      attachment: this.props.attachment
                    }),
                    this.state.showDelete &&
                      y.a.createElement(R, {
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
        j = function(e) {
          var t = e.attachments,
            a = e.deleteAttachment;
          return y.a.createElement(
            "div",
            null,
            y.a.createElement(
              "div",
              { className: "row border header" },
              y.a.createElement("div", { className: "col-sm-11" }, "Naam"),
              y.a.createElement("div", { className: "col-sm-1" })
            ),
            t.length > 0
              ? t.map(function(e) {
                  return y.a.createElement(O, {
                    key: e.name,
                    attachment: e,
                    deleteAttachment: a
                  });
                })
              : y.a.createElement("div", null, "Geen bijlages bekend.")
          );
        };
      function D(e) {
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
            var o = g()(this).constructor;
            a = Reflect.construct(n, arguments, o);
          } else a = n.apply(this, arguments);
          return p()(this, a);
        };
      }
      var M = a(771).default,
        P = (function(e) {
          u()(a, e);
          var t = D(a);
          function a(e) {
            var n;
            return (
              s()(this, a),
              ((n = t.call(this, e)).state = { error: !1, errorMaxSize: !1 }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "onDropAccepted",
                value: function(e) {
                  this.props.addAttachment(e), this.props.toggleShowNew();
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
                    L.a,
                    {
                      closeModal: this.props.toggleShowNew,
                      showConfirmAction: !1,
                      title: "Upload bestand"
                    },
                    y.a.createElement(
                      "div",
                      { className: "upload-file-content" },
                      y.a.createElement(
                        M,
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
        U = a(691),
        q = a(698);
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
            n = g()(e);
          if (t) {
            var o = g()(this).constructor;
            a = Reflect.construct(n, arguments, o);
          } else a = n.apply(this, arguments);
          return p()(this, a);
        };
      }
      var _ = (function(e) {
          u()(a, e);
          var t = z(a);
          function a(e) {
            var n;
            return (
              s()(this, a),
              (n = t.call(this, e)),
              v()(m()(n), "toggleShowNew", function() {
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
                    "div",
                    null,
                    y.a.createElement(
                      q.a,
                      null,
                      y.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Bijlages"
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
                      U.a,
                      null,
                      y.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        y.a.createElement(j, {
                          attachments: this.props.attachments,
                          deleteAttachment: this.props.deleteAttachment
                        })
                      ),
                      y.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          y.a.createElement(P, {
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
        F = Object(I.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(_),
        V = a(825),
        J = a(723),
        X = a(942),
        G = function(e) {
          var t = e.email,
            a = e.emailAddresses,
            n = e.mailboxAddresses,
            o = e.errors,
            l = e.hasLoaded,
            s = e.handleToIds,
            r = e.handleCcIds,
            i = e.handleBccIds,
            c = e.handleInputChange,
            m = e.handleTextChange,
            d = e.emailTemplates,
            u = e.handleEmailTemplates,
            h = e.handleFromIds,
            p = t.mailboxId,
            f = t.to,
            g = t.cc,
            b = t.bcc,
            v = t.subject,
            E = t.htmlBody,
            N = t.emailTemplateId;
          return y.a.createElement(
            U.a,
            null,
            y.a.createElement(
              "div",
              { className: "row" },
              y.a.createElement(J.a, {
                label: "Van selecteren",
                name: "mailboxId",
                value: p,
                options: n,
                optionName: "email",
                onChangeAction: h,
                required: "required",
                error: o.mailboxId,
                multi: !1
              })
            ),
            y.a.createElement(
              "div",
              { className: "row" },
              y.a.createElement(V.a, {
                label: "Aan selecteren",
                name: "to",
                value: f,
                options: a,
                optionName: "name",
                onChangeAction: s,
                allowCreate: !0,
                required: "required",
                error: o.to
              })
            ),
            y.a.createElement(
              "div",
              { className: "row" },
              y.a.createElement(V.a, {
                label: "Cc selecteren",
                name: "cc",
                value: g,
                options: a,
                optionName: "name",
                onChangeAction: r,
                error: o.to
              })
            ),
            y.a.createElement(
              "div",
              { className: "row" },
              y.a.createElement(V.a, {
                label: "Bcc selecteren",
                name: "bcc",
                value: b,
                options: a,
                optionName: "name",
                onChangeAction: i,
                error: o.to
              })
            ),
            y.a.createElement(
              "div",
              { className: "row" },
              y.a.createElement(J.a, {
                label: "Template",
                name: "emailTemplateId",
                value: N,
                options: d,
                onChangeAction: u,
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
                        o.subject ? "has-error" : ""
                      ),
                      name: "subject",
                      value: v,
                      onChange: c
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
                  l &&
                    y.a.createElement(X.a, {
                      label: "Tekst",
                      value: E,
                      onChangeAction: m
                    })
                )
              )
            )
          );
        },
        H = function(e) {
          var t = e.emailTemplates,
            a = e.mailboxAddresses,
            n = e.handleFromIds,
            o = e.handleEmailTemplates,
            l = e.email,
            s = e.emailAddresses,
            r = e.errors,
            i = e.hasLoaded,
            c = e.handleSubmit,
            m = e.handleToIds,
            d = e.handleCcIds,
            u = e.handleBccIds,
            h = e.handleInputChange,
            p = e.handleTextChange,
            f = e.addAttachment,
            g = e.deleteAttachment;
          return y.a.createElement(
            "form",
            { className: "form-horizontal", onSubmit: c },
            y.a.createElement(
              C.a,
              null,
              y.a.createElement(G, {
                email: l,
                emailAddresses: s,
                errors: r,
                hasLoaded: i,
                handleSubmit: c,
                handleToIds: m,
                handleCcIds: d,
                handleBccIds: u,
                handleInputChange: h,
                handleTextChange: p,
                emailTemplates: t,
                handleEmailTemplates: o,
                handleFromIds: n,
                mailboxAddresses: a
              }),
              y.a.createElement(F, {
                attachments: l.attachments,
                addAttachment: f,
                deleteAttachment: g
              })
            )
          );
        },
        K = a(4),
        W = a(693),
        Q = a(692),
        Y = function(e) {
          var t = e.handleSubmit,
            a = e.loading;
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
                y.a.createElement(W.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: K.e.goBack
                })
              ),
              y.a.createElement(
                "div",
                { className: "btn-group margin-small", role: "group" },
                y.a.createElement(Q.a, {
                  buttonText: "Opslaan als concept",
                  onClickAction: function(e) {
                    t(e, !0);
                  }
                }),
                y.a.createElement(Q.a, {
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
                "E-mail versturen"
              )
            ),
            y.a.createElement("div", { className: "col-md-4" })
          );
        },
        Z = a(215),
        $ = a(104),
        ee = a(65);
      function te(e, t) {
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
      function ae(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? te(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : te(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
          var a,
            n = g()(e);
          if (t) {
            var o = g()(this).constructor;
            a = Reflect.construct(n, arguments, o);
          } else a = n.apply(this, arguments);
          return p()(this, a);
        };
      }
      var oe = (function(e) {
        u()(a, e);
        var t = ne(a);
        function a(e) {
          var n;
          return (
            s()(this, a),
            (n = t.call(this, e)),
            v()(m()(n), "setButtonLoading", function() {
              n.setState({ buttonLoading: !0 });
            }),
            (n.state = {
              buttonLoading: !1,
              oldEmailId: null,
              emailAddresses: [],
              mailboxAddresses: [],
              originalHtmlBody: "",
              emailTemplates: [],
              email: {
                from: "",
                mailboxId: "",
                to: "",
                cc: "",
                bcc: "",
                subject: "",
                htmlBody: "",
                attachments: []
              },
              errors: { to: !1, subject: !1 },
              hasLoaded: !1
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
                Z.a.fetchEmailAddressessPeek().then(function(t) {
                  e.setState({
                    emailAddresses: [].concat(
                      o()(e.state.emailAddresses),
                      o()(t)
                    )
                  });
                });
                var t = "";
                switch (this.props.params.type) {
                  case "beantwoorden":
                    t = "reply";
                    break;
                  case "allenbeantwoorden":
                    t = "reply-all";
                    break;
                  case "doorsturen":
                    t = "forward";
                    break;
                  case "groep":
                    t = "group";
                    break;
                  default:
                    t = "reply";
                }
                $.a.fetchEmailTemplatesPeek().then(function(t) {
                  e.setState({ emailTemplates: t });
                }),
                  T.a
                    .fetchEmailByType(this.props.params.id, t)
                    .then(function(t) {
                      var a = e.createExtraOptions(t.to, t.cc, t.bcc);
                      e.setState(
                        ae(
                          ae({}, e.state),
                          {},
                          {
                            oldEmailId: t.id,
                            originalHtmlBody: t.htmlBody ? t.htmlBody : "",
                            email: {
                              mailboxId: t.mailboxId,
                              to: t.to ? t.to.join(",") : "",
                              cc: t.cc ? t.cc.join(",") : "",
                              bcc: t.bcc ? t.bcc.join(",") : "",
                              subject: t.subject ? t.subject : "",
                              htmlBody: t.htmlBody ? t.htmlBody : "",
                              attachments: t.attachments ? t.attachments : ""
                            },
                            emailAddresses: [].concat(
                              o()(e.state.emailAddresses),
                              o()(a)
                            ),
                            hasLoaded: !0
                          }
                        )
                      );
                    }),
                  ee.a.fetchMailboxesLoggedInUserPeek().then(function(t) {
                    e.setState({ mailboxAddresses: t });
                  });
              }
            },
            {
              key: "handleFromIds",
              value: function(e) {
                this.setState(
                  ae(
                    ae({}, this.state),
                    {},
                    {
                      email: ae(ae({}, this.state.email), {}, { mailboxId: e })
                    }
                  )
                );
              }
            },
            {
              key: "handleEmailTemplates",
              value: function(e) {
                var t = this;
                this.setState(
                  ae(
                    ae({}, this.state),
                    {},
                    {
                      email: ae(
                        ae({}, this.state.email),
                        {},
                        { emailTemplateId: e }
                      )
                    }
                  )
                ),
                  $.a.fetchEmailTemplateWithUser(e).then(function(e) {
                    t.setState(
                      ae(
                        ae({}, t.state),
                        {},
                        {
                          email: ae(
                            ae({}, t.state.email),
                            {},
                            {
                              htmlBody: e.htmlBody
                                ? e.htmlBody + t.state.originalHtmlBody
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
              key: "createExtraOptions",
              value: function(e, t, a) {
                var n = Object(A.union)(e, t, a),
                  o = [];
                return (
                  n.map(function(e) {
                    o.push({ id: e, name: e });
                  }),
                  o
                );
              }
            },
            {
              key: "handleInputChange",
              value: function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  n = t.name;
                this.setState(
                  ae(
                    ae({}, this.state),
                    {},
                    { email: ae(ae({}, this.state.email), {}, v()({}, n, a)) }
                  )
                );
              }
            },
            {
              key: "handleToIds",
              value: function(e) {
                this.setState(
                  ae(
                    ae({}, this.state),
                    {},
                    { email: ae(ae({}, this.state.email), {}, { to: e }) }
                  )
                );
              }
            },
            {
              key: "handleCcIds",
              value: function(e) {
                this.setState(
                  ae(
                    ae({}, this.state),
                    {},
                    { email: ae(ae({}, this.state.email), {}, { cc: e }) }
                  )
                );
              }
            },
            {
              key: "handleBccIds",
              value: function(e) {
                this.setState(
                  ae(
                    ae({}, this.state),
                    {},
                    { email: ae(ae({}, this.state.email), {}, { bcc: e }) }
                  )
                );
              }
            },
            {
              key: "handleTextChange",
              value: function(e) {
                this.setState(
                  ae(
                    ae({}, this.state),
                    {},
                    {
                      email: ae(
                        ae({}, this.state.email),
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
                  ae(
                    ae({}, this.state),
                    {},
                    {
                      email: ae(
                        ae({}, this.state.email),
                        {},
                        {
                          attachments: [].concat(
                            o()(this.state.email.attachments),
                            o()(e)
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
                  ae(
                    ae({}, this.state),
                    {},
                    {
                      email: ae(
                        ae({}, this.state.email),
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
                var t = this,
                  a =
                    arguments.length > 1 &&
                    void 0 !== arguments[1] &&
                    arguments[1];
                e.preventDefault();
                var n = this.state.email,
                  o = {},
                  l = !1;
                function s(e, t, a, n) {
                  T.a
                    .newConcept2(e, t, a)
                    .then(function() {
                      n
                        ? T.a.setStatus(n, "closed").then(function() {
                            K.f.push("/emails/inbox");
                          })
                        : K.f.push("/emails/concept");
                    })
                    .catch(function(e) {});
                }
                function r(e, t, a, n) {
                  T.a
                    .newEmail(e, t, a)
                    .then(function() {
                      n
                        ? T.a.setStatus(n, "closed").then(function() {
                            K.f.push("/emails/inbox");
                          })
                        : K.f.push("/emails/inbox");
                    })
                    .catch(function(e) {
                      console.log(e);
                    });
                }
                if (
                  (w.a.isEmpty(n.to) && ((o.to = !0), (l = !0)),
                  (w.a.isEmpty("" + n.mailboxId) || null === n.mailboxId) &&
                    ((o.mailboxId = !0), (l = !0)),
                  w.a.isEmpty("" + n.subject) && ((o.subject = !0), (l = !0)),
                  this.setState(ae(ae({}, this.state), {}, { errors: o })),
                  !l)
                ) {
                  n.to.length > 0 && (n.to = n.to.split(",")),
                    n.cc.length > 0 && (n.cc = n.cc.split(",")),
                    n.bcc.length > 0 && (n.bcc = n.bcc.split(","));
                  var i = window.tinymce.EditorManager.get("tinyMCEUpdateable");
                  void 0 !== i &&
                    (n.htmlBody = i.getContent({ format: "raw" }));
                  var c = new FormData();
                  c.append("to", JSON.stringify(n.to)),
                    c.append("cc", JSON.stringify(n.cc)),
                    c.append("bcc", JSON.stringify(n.bcc)),
                    c.append("oldEmailId", this.state.oldEmailId),
                    n.attachments &&
                      n.attachments.map(function(e, t) {
                        e.id
                          ? c.append(
                              "oldAttachments[" + t + "]",
                              JSON.stringify(e)
                            )
                          : c.append("attachments[" + t + "]", e);
                      }),
                    a
                      ? T.a
                          .newConcept(n, n.mailboxId)
                          .then(function(e) {
                            s(c, n.mailboxId, e.data, t.state.oldEmailId);
                          })
                          .catch(function(e) {
                            console.log(e);
                          })
                      : (this.setButtonLoading(),
                        T.a
                          .newConcept(n, n.mailboxId)
                          .then(function(e) {
                            r(c, n.mailboxId, e.data, t.state.oldEmailId);
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
                      { className: "col-md-12 margin-10-top" },
                      y.a.createElement(
                        C.a,
                        null,
                        y.a.createElement(
                          U.a,
                          { className: "panel-small" },
                          y.a.createElement(Y, {
                            loading: this.state.buttonLoading,
                            handleSubmit: this.handleSubmit,
                            type: this.props.params.type
                          })
                        )
                      )
                    ),
                    y.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      y.a.createElement(H, {
                        email: this.state.email,
                        emailAddresses: this.state.emailAddresses,
                        errors: this.state.errors,
                        hasLoaded: this.state.hasLoaded,
                        handleSubmit: this.handleSubmit,
                        handleToIds: this.handleToIds,
                        handleCcIds: this.handleCcIds,
                        handleBccIds: this.handleBccIds,
                        handleInputChange: this.handleInputChange,
                        handleTextChange: this.handleTextChange,
                        addAttachment: this.addAttachment,
                        emailTemplates: this.state.emailTemplates,
                        handleEmailTemplates: this.handleEmailTemplates,
                        deleteAttachment: this.deleteAttachment,
                        mailboxAddresses: this.state.mailboxAddresses,
                        handleFromIds: this.handleFromIds
                      })
                    )
                  ),
                  y.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          a
        );
      })(E.Component);
      t.default = oe;
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        l = a(8),
        s = a.n(l),
        r = function(e) {
          var t = e.children,
            a = e.className,
            n = e.onMouseEnter,
            l = e.onMouseLeave;
          return o.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: l
            },
            t
          );
        };
      (r.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (r.propTypes = {
          className: s.a.string,
          onMouseEnter: s.a.func,
          onMouseLeave: s.a.func
        }),
        (t.a = r);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        l = a(8),
        s = a.n(l),
        r = function(e) {
          var t = e.className,
            a = e.children;
          return o.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (r.defaultProps = { className: "" }),
        (r.propTypes = { className: s.a.string }),
        (t.a = r);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        l = a(8),
        s = a.n(l),
        r = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            l = e.type,
            s = e.value,
            r = e.loading,
            i = e.loadText,
            c = e.disabled;
          return r
            ? o.a.createElement(
                "button",
                {
                  type: l,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: s,
                  disabled: r
                },
                o.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                i
              )
            : o.a.createElement(
                "button",
                {
                  type: l,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: s,
                  disabled: c
                },
                a
              );
        };
      (r.defaultProps = {
        buttonClassName: "btn-success",
        type: "button",
        value: "",
        loading: !1,
        loadText: "Aan het laden",
        disabled: !1
      }),
        (r.propTypes = {
          buttonClassName: s.a.string,
          buttonText: s.a.string.isRequired,
          onClickAction: s.a.func,
          type: s.a.string,
          value: s.a.string,
          loading: s.a.bool,
          loadText: s.a.string,
          disabled: s.a.bool
        }),
        (t.a = r);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        l = a(8),
        s = a.n(l),
        r = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            l = e.title,
            s = e.disabled;
          return o.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: s,
              title: l
            },
            o.a.createElement("span", { className: "glyphicon ".concat(a) })
          );
        };
      (r.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (r.propTypes = {
          buttonClassName: s.a.string,
          iconName: s.a.string.isRequired,
          onClickAction: s.a.func,
          title: s.a.string,
          disabled: s.a.bool
        }),
        (t.a = r);
    },
    698: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        l = a(8),
        s = a.n(l),
        r = function(e) {
          var t = e.className,
            a = e.children;
          return o.a.createElement(
            "div",
            { className: "panel-heading ".concat(t) },
            a
          );
        };
      (r.defaultProps = { className: "" }),
        (r.propTypes = { className: s.a.string }),
        (t.a = r);
    },
    711: function(e, t) {
      e.exports = function(e, t, a, n) {
        var o = new Blob(void 0 !== n ? [n, e] : [e], {
          type: a || "application/octet-stream"
        });
        if (void 0 !== window.navigator.msSaveBlob)
          window.navigator.msSaveBlob(o, t);
        else {
          var l =
              window.URL && window.URL.createObjectURL
                ? window.URL.createObjectURL(o)
                : window.webkitURL.createObjectURL(o),
            s = document.createElement("a");
          (s.style.display = "none"),
            (s.href = l),
            s.setAttribute("download", t),
            void 0 === s.download && s.setAttribute("target", "_blank"),
            document.body.appendChild(s),
            s.click(),
            setTimeout(function() {
              document.body.removeChild(s), window.URL.revokeObjectURL(l);
            }, 200);
        }
      };
    },
    723: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        l = a(8),
        s = a.n(l),
        r = a(714),
        i =
          (a(715),
          function(e) {
            var t = e.label,
              a = (e.className, e.size),
              n = e.id,
              l = e.name,
              s = e.value,
              i = e.options,
              c = e.optionId,
              m = e.optionName,
              d = e.onChangeAction,
              u = e.required,
              h = e.multi,
              p = e.error;
            return o.a.createElement(
              "div",
              { className: "form-group col-sm-6" },
              o.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(u) },
                t
              ),
              o.a.createElement(
                "div",
                { className: "".concat(a) },
                o.a.createElement(r.a, {
                  id: n,
                  name: l,
                  value: s,
                  onChange: d,
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
          label: s.a.string.isRequired,
          className: s.a.string,
          size: s.a.string,
          id: s.a.string,
          name: s.a.string.isRequired,
          options: s.a.array,
          optionId: s.a.string,
          optionName: s.a.string,
          value: s.a.string,
          onChangeAction: s.a.func,
          onBlurAction: s.a.func,
          required: s.a.string,
          readOnly: s.a.bool,
          error: s.a.bool,
          multi: s.a.bool
        }),
        (t.a = i);
    },
    745: function(e, t, a) {
      "use strict";
      a.d(t, "c", function() {
        return n;
      }),
        a.d(t, "f", function() {
          return o;
        }),
        a.d(t, "e", function() {
          return l;
        }),
        a.d(t, "b", function() {
          return s;
        }),
        a.d(t, "d", function() {
          return r;
        }),
        a.d(t, "a", function() {
          return i;
        });
      var n = function(e) {
          return { type: "FETCH_MAILBOX_DETAILS", id: e };
        },
        o = function(e) {
          return { type: "UPDATE_MAILBOX_DETAILS", mailbox: e };
        },
        l = function(e) {
          return { type: "NEW_MAILBOX_USER", mailboxUser: e };
        },
        s = function(e, t) {
          return { type: "DELETE_MAILBOX_USER", mailboxId: e, userId: t };
        },
        r = function(e) {
          return { type: "NEW_MAILBOX_IGNORE", ignore: e };
        },
        i = function(e) {
          return { type: "DELETE_MAILBOX_IGNORE", ignoreId: e };
        };
    },
    825: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        l = a(8),
        s = a.n(l),
        r = a(714),
        i =
          (a(715),
          function(e) {
            var t = e.label,
              a = (e.className, e.size),
              n = e.id,
              l = e.name,
              s = e.value,
              i = e.options,
              c = e.optionId,
              m = e.optionName,
              d = e.onChangeAction,
              u = e.required,
              h = (e.allowCreate, e.error);
            return o.a.createElement(
              "div",
              { className: "form-group col-sm-12" },
              o.a.createElement(
                "div",
                { className: "row" },
                o.a.createElement(
                  "div",
                  { className: "col-sm-3" },
                  o.a.createElement(
                    "label",
                    { htmlFor: n, className: "col-sm-12 ".concat(u) },
                    t
                  )
                ),
                o.a.createElement(
                  "div",
                  { className: "".concat(a) },
                  o.a.createElement(r.a.Creatable, {
                    id: n,
                    name: l,
                    value: s,
                    onChange: d,
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
          allowCreate: s.a.bool,
          label: s.a.string.isRequired,
          className: s.a.string,
          size: s.a.string,
          id: s.a.string,
          name: s.a.string.isRequired,
          options: s.a.array,
          optionId: s.a.string,
          optionName: s.a.string,
          value: s.a.string,
          onChangeAction: s.a.func,
          onBlurAction: s.a.func,
          required: s.a.string,
          readOnly: s.a.bool,
          error: s.a.bool
        }),
        (t.a = i);
    },
    942: function(e, t, a) {
      "use strict";
      var n = a(24),
        o = a.n(n),
        l = a(25),
        s = a.n(l),
        r = a(26),
        i = a.n(r),
        c = a(27),
        m = a.n(c),
        d = a(16),
        u = a.n(d),
        h = a(0),
        p = a.n(h),
        f = a(8),
        g = a.n(f),
        b =
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
        v = a(198);
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
            n = u()(e);
          if (t) {
            var o = u()(this).constructor;
            a = Reflect.construct(n, arguments, o);
          } else a = n.apply(this, arguments);
          return m()(this, a);
        };
      }
      var y = (function(e) {
        i()(a, e);
        var t = E(a);
        function a() {
          return o()(this, a), t.apply(this, arguments);
        }
        return (
          s()(a, [
            {
              key: "componentDidUpdate",
              value: function(e) {
                if (this.props.value !== e.value) {
                  var t = window.tinymce.EditorManager.get("tinyMCEUpdateable");
                  this.props.value &&
                    !Object(v.isEqual)(
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
                    p.a.createElement(b.a, {
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
