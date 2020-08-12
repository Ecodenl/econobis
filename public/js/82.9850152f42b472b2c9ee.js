(window.webpackJsonp = window.webpackJsonp || []).push([
  [82],
  {
    1444: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(11),
        o = a.n(n),
        l = a(24),
        s = a.n(l),
        c = a(25),
        r = a.n(c),
        i = a(22),
        m = a.n(i),
        d = a(26),
        u = a.n(d),
        h = a(27),
        p = a.n(h),
        f = a(16),
        g = a.n(f),
        v = a(6),
        b = a.n(v),
        E = a(0),
        N = a.n(E),
        y = a(697),
        w = a.n(y),
        C = a(198),
        A = a(690),
        k = a(32),
        I = a(148),
        S = a(711),
        R = a.n(S),
        j = Object(k.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(function(e) {
          var t = e.attachment,
            a = t.id,
            n = t.name;
          return N.a.createElement(
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
            N.a.createElement(
              "div",
              {
                onClick: function() {
                  return (function(e, t) {
                    I.a.downloadAttachment(e).then(function(e) {
                      R()(e.data, t);
                    });
                  })(a, n);
                },
                className: "col-sm-11"
              },
              n
            ),
            N.a.createElement(
              "div",
              { className: "col-sm-1" },
              e.showActionButtons
                ? N.a.createElement(
                    "a",
                    { role: "button", onClick: e.toggleDelete },
                    N.a.createElement("span", {
                      className: "glyphicon glyphicon-trash mybtn-danger"
                    }),
                    " "
                  )
                : ""
            )
          );
        }),
        L = a(100),
        T = function(e) {
          return N.a.createElement(
            L.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.toggleDelete,
              confirmAction: function() {
                return (
                  e.deleteAttachment(e.attachment.name, e.attachment.id),
                  void e.toggleDelete()
                );
              },
              title: "Verwijderen"
            },
            N.a.createElement("p", null, "Wil je deze bijlage verwijderen?")
          );
        };
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
          var a,
            n = g()(e);
          if (t) {
            var o = g()(this).constructor;
            a = Reflect.construct(n, arguments, o);
          } else a = n.apply(this, arguments);
          return p()(this, a);
        };
      }
      var D = (function(e) {
          u()(a, e);
          var t = x(a);
          function a(e) {
            var n;
            return (
              s()(this, a),
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
            r()(a, [
              {
                key: "render",
                value: function() {
                  return N.a.createElement(
                    "div",
                    null,
                    N.a.createElement(j, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      toggleDelete: this.toggleDelete,
                      attachment: this.props.attachment
                    }),
                    this.state.showDelete &&
                      N.a.createElement(T, {
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
        O = function(e) {
          var t = e.attachments;
          return N.a.createElement(
            "div",
            null,
            N.a.createElement(
              "div",
              { className: "row border header" },
              N.a.createElement("div", { className: "col-sm-11" }, "Naam"),
              N.a.createElement("div", { className: "col-sm-1" })
            ),
            t.length > 0
              ? t.map(function(t) {
                  return N.a.createElement(D, {
                    key: t.name,
                    attachment: t,
                    deleteAttachment: e.deleteAttachment
                  });
                })
              : N.a.createElement("div", null, "Geen bijlages bekend.")
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
            var o = g()(this).constructor;
            a = Reflect.construct(n, arguments, o);
          } else a = n.apply(this, arguments);
          return p()(this, a);
        };
      }
      var q = a(771).default,
        P = (function(e) {
          u()(a, e);
          var t = B(a);
          function a(e) {
            var n;
            return (
              s()(this, a),
              ((n = t.call(this, e)).state = { error: !1, errorMaxSize: !1 }),
              n
            );
          }
          return (
            r()(a, [
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
                  return N.a.createElement(
                    L.a,
                    {
                      closeModal: this.props.toggleShowNew,
                      showConfirmAction: !1,
                      title: "Upload bestand"
                    },
                    N.a.createElement(
                      "div",
                      { className: "upload-file-content" },
                      N.a.createElement(
                        q,
                        {
                          className: "dropzone",
                          onDropAccepted: this.onDropAccepted.bind(this),
                          onDropRejected: this.onDropRejected.bind(this),
                          maxSize: 6e6
                        },
                        N.a.createElement(
                          "p",
                          null,
                          "Klik hier voor het uploaden van een bestand"
                        ),
                        N.a.createElement(
                          "p",
                          null,
                          N.a.createElement("strong", null, "of"),
                          " sleep het bestand hierheen"
                        )
                      )
                    ),
                    this.state.error &&
                      N.a.createElement(
                        "p",
                        { className: "has-error-message" },
                        "Uploaden mislukt. Probeer nogmaals een bestand te uploaden."
                      ),
                    this.state.errorMaxSize &&
                      N.a.createElement(
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
        z = a(698);
      function U(e) {
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
      var F = (function(e) {
          u()(a, e);
          var t = U(a);
          function a(e) {
            var n;
            return (
              s()(this, a),
              (n = t.call(this, e)),
              b()(m()(n), "toggleShowNew", function() {
                n.setState({ showNew: !n.state.showNew });
              }),
              (n.state = { showNew: !1 }),
              n
            );
          }
          return (
            r()(a, [
              {
                key: "render",
                value: function() {
                  return N.a.createElement(
                    "div",
                    null,
                    N.a.createElement(
                      z.a,
                      null,
                      N.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Bijlages"
                      ),
                      N.a.createElement(
                        "a",
                        {
                          role: "button",
                          className: "pull-right",
                          onClick: this.toggleShowNew
                        },
                        N.a.createElement("span", {
                          className: "glyphicon glyphicon-plus"
                        })
                      )
                    ),
                    N.a.createElement(
                      M.a,
                      null,
                      N.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        N.a.createElement(O, {
                          attachments: this.props.attachments,
                          deleteAttachment: this.props.deleteAttachment
                        })
                      ),
                      N.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          N.a.createElement(P, {
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
        G = Object(k.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(F),
        V = a(737),
        J = a(825),
        _ =
          (a(695),
          a(7),
          function(e) {
            var t = e.email,
              a = e.emailAddresses,
              n = e.errors,
              o = e.hasLoaded,
              l = (e.handleSubmit, e.handleToIds),
              s = e.handleCcIds,
              c = e.handleBccIds,
              r = e.handleInputChange,
              i = e.handleTextChange,
              m = t.from,
              d = t.to,
              u = t.cc,
              h = t.bcc,
              p = t.subject,
              f = t.htmlBody;
            return N.a.createElement(
              M.a,
              null,
              N.a.createElement(
                "div",
                { className: "row" },
                N.a.createElement(
                  "div",
                  { className: "row margin-10-bottom" },
                  N.a.createElement(
                    "div",
                    { className: "col-sm-3" },
                    N.a.createElement(
                      "label",
                      { htmlFor: "description", className: "col-sm-12" },
                      "Van"
                    )
                  ),
                  N.a.createElement(
                    "div",
                    { className: "col-sm-9", id: "from" },
                    m
                  )
                )
              ),
              N.a.createElement(
                "div",
                { className: "row" },
                N.a.createElement(J.a, {
                  label: "Aan selecteren",
                  name: "to",
                  value: d,
                  options: a,
                  optionName: "name",
                  onChangeAction: l,
                  allowCreate: !0,
                  required: "required",
                  error: n.to
                })
              ),
              N.a.createElement(
                "div",
                { className: "row" },
                N.a.createElement(J.a, {
                  label: "Cc selecteren",
                  name: "cc",
                  value: u,
                  options: a,
                  optionName: "name",
                  onChangeAction: s,
                  error: n.to
                })
              ),
              N.a.createElement(
                "div",
                { className: "row" },
                N.a.createElement(J.a, {
                  label: "Bcc selecteren",
                  name: "bcc",
                  value: h,
                  options: a,
                  optionName: "name",
                  onChangeAction: c,
                  error: n.to
                })
              ),
              N.a.createElement(
                "div",
                { className: "row" },
                N.a.createElement(
                  "div",
                  { className: "form-group col-sm-12" },
                  N.a.createElement(
                    "div",
                    { className: "row" },
                    N.a.createElement(
                      "div",
                      { className: "col-sm-3" },
                      N.a.createElement(
                        "label",
                        { className: "col-sm-12 required" },
                        "Onderwerp"
                      )
                    ),
                    N.a.createElement(
                      "div",
                      { className: "col-sm-9" },
                      N.a.createElement("input", {
                        type: "text",
                        className: "form-control input-sm ".concat(
                          n.subject ? "has-error" : ""
                        ),
                        name: "subject",
                        value: p,
                        onChange: r
                      })
                    )
                  )
                )
              ),
              N.a.createElement(
                "div",
                { className: "row" },
                N.a.createElement(
                  "div",
                  { className: "form-group col-sm-12" },
                  N.a.createElement(
                    "div",
                    { className: "row" },
                    o &&
                      N.a.createElement(V.a, {
                        label: "Tekst",
                        value: f,
                        onChangeAction: i
                      })
                  )
                )
              )
            );
          }),
        K = function(e) {
          var t = e.email,
            a = e.emailAddresses,
            n = e.errors,
            o = e.hasLoaded,
            l = e.handleSubmit,
            s = e.handleToIds,
            c = e.handleCcIds,
            r = e.handleBccIds,
            i = e.handleInputChange,
            m = e.handleTextChange,
            d = e.addAttachment,
            u = e.deleteAttachment;
          return N.a.createElement(
            "form",
            { className: "form-horizontal", onSubmit: l },
            N.a.createElement(
              A.a,
              null,
              N.a.createElement(_, {
                email: t,
                emailAddresses: a,
                errors: n,
                hasLoaded: o,
                handleSubmit: l,
                handleToIds: s,
                handleCcIds: c,
                handleBccIds: r,
                handleInputChange: i,
                handleTextChange: m
              }),
              N.a.createElement(G, {
                attachments: t.attachments,
                deleteAttachment: u,
                addAttachment: d
              })
            )
          );
        },
        H = a(4),
        W = a(693),
        Q = a(692),
        X = function(e) {
          var t = e.handleSubmit,
            a = e.loading,
            n = e.removeEmail;
          return N.a.createElement(
            "div",
            { className: "row" },
            N.a.createElement(
              "div",
              { className: "col-md-4" },
              N.a.createElement(
                "div",
                {
                  className: "btn-group margin-small margin-10-right",
                  role: "group"
                },
                N.a.createElement(W.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: H.e.goBack
                })
              ),
              N.a.createElement(
                "div",
                { className: "btn-group margin-small", role: "group" },
                N.a.createElement(Q.a, {
                  buttonText: "Opslaan",
                  onClickAction: function(e) {
                    t(e, !0);
                  }
                }),
                N.a.createElement(Q.a, {
                  buttonText: "Verstuur e-mail",
                  onClickAction: t,
                  loading: a,
                  loadText: "E-mail verzenden"
                })
              ),
              N.a.createElement(
                "div",
                {
                  className: "btn-group margin-small margin-10-left",
                  role: "group"
                },
                N.a.createElement(W.a, {
                  iconName: "glyphicon-trash",
                  onClickAction: n
                })
              )
            ),
            N.a.createElement(
              "div",
              { className: "col-md-4" },
              N.a.createElement(
                "h4",
                { className: "text-center margin-small" },
                "Concept bewerken"
              )
            ),
            N.a.createElement("div", { className: "col-md-4" })
          );
        },
        Y = a(215);
      function Z(e, t) {
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
      function $(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Z(Object(a), !0).forEach(function(t) {
                b()(e, t, a[t]);
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
            n = g()(e);
          if (t) {
            var o = g()(this).constructor;
            a = Reflect.construct(n, arguments, o);
          } else a = n.apply(this, arguments);
          return p()(this, a);
        };
      }
      var te = (function(e) {
        u()(a, e);
        var t = ee(a);
        function a(e) {
          var n;
          return (
            s()(this, a),
            (n = t.call(this, e)),
            b()(m()(n), "setButtonLoading", function() {
              n.setState({ buttonLoading: !0 });
            }),
            (n.state = {
              buttonLoading: !1,
              emailAddresses: [],
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
            (n.handleToIds = n.handleToIds.bind(m()(n))),
            (n.handleCcIds = n.handleCcIds.bind(m()(n))),
            (n.handleBccIds = n.handleBccIds.bind(m()(n))),
            (n.handleTextChange = n.handleTextChange.bind(m()(n))),
            (n.addAttachment = n.addAttachment.bind(m()(n))),
            (n.deleteAttachment = n.deleteAttachment.bind(m()(n))),
            (n.handleSubmit = n.handleSubmit.bind(m()(n))),
            (n.removeEmail = n.removeEmail.bind(m()(n))),
            n
          );
        }
        return (
          r()(a, [
            {
              key: "componentDidMount",
              value: function() {
                var e = this;
                Y.a.fetchEmailAddressessPeek().then(function(t) {
                  e.setState({
                    emailAddresses: [].concat(
                      o()(e.state.emailAddresses),
                      o()(t)
                    )
                  });
                }),
                  I.a.fetchEmail(this.props.params.id).then(function(t) {
                    var a = e.createExtraOptions(t.to, t.cc, t.bcc);
                    e.setState(
                      $(
                        $({}, e.state),
                        {},
                        {
                          email: {
                            id: t.id,
                            from: t.from,
                            mailboxId: t.mailboxId,
                            to: t.to ? t.to.join(",") : "",
                            cc: t.cc ? t.cc.join(",") : "",
                            bcc: t.bcc ? t.bcc.join(",") : "",
                            subject: t.subject ? t.subject : "",
                            htmlBody: t.htmlBody ? t.htmlBody : "",
                            attachments: t.attachments ? t.attachments : "",
                            quotationRequestId: t.quotationRequestId
                              ? t.quotationRequestId
                              : "6",
                            intakeId: t.intakeId ? t.intakeId : ""
                          },
                          emailAddresses: [].concat(
                            o()(e.state.emailAddresses),
                            o()(a)
                          ),
                          hasLoaded: !0
                        }
                      ),
                      function() {
                        t.contactGroupId &&
                          I.a
                            .fetchEmailGroup(t.contactGroupId)
                            .then(function(a) {
                              var n = e.state.emailAddresses;
                              n.push({
                                id: "@group_" + t.contactGroupId,
                                name: a
                              });
                              var o = "@group_" + t.contactGroupId;
                              t.to.length > 0 && (o = o + "," + t.to.join(",")),
                                e.setState(
                                  $(
                                    $({}, e.state),
                                    {},
                                    {
                                      emailAddresses: n,
                                      email: $(
                                        $({}, e.state.email),
                                        {},
                                        { to: o }
                                      )
                                    }
                                  )
                                );
                            });
                      }
                    );
                  });
              }
            },
            {
              key: "createExtraOptions",
              value: function(e, t, a) {
                var n = Object(C.union)(e, t, a),
                  o = [];
                return (
                  n.map(function(e) {
                    isNaN(e) && o.push({ id: e, name: e });
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
                  $(
                    $({}, this.state),
                    {},
                    { email: $($({}, this.state.email), {}, b()({}, n, a)) }
                  )
                );
              }
            },
            {
              key: "handleToIds",
              value: function(e) {
                this.setState(
                  $(
                    $({}, this.state),
                    {},
                    { email: $($({}, this.state.email), {}, { to: e }) }
                  )
                );
              }
            },
            {
              key: "handleCcIds",
              value: function(e) {
                this.setState(
                  $(
                    $({}, this.state),
                    {},
                    { email: $($({}, this.state.email), {}, { cc: e }) }
                  )
                );
              }
            },
            {
              key: "handleBccIds",
              value: function(e) {
                this.setState(
                  $(
                    $({}, this.state),
                    {},
                    { email: $($({}, this.state.email), {}, { bcc: e }) }
                  )
                );
              }
            },
            {
              key: "handleTextChange",
              value: function(e) {
                this.setState(
                  $(
                    $({}, this.state),
                    {},
                    {
                      email: $(
                        $({}, this.state.email),
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
                var t = this,
                  a = new FormData();
                e.map(function(e, t) {
                  a.append("attachments[" + t + "]", e);
                }),
                  I.a.storeAttachment(this.state.email.id, a).then(function(e) {
                    t.setState(
                      $(
                        $({}, t.state),
                        {},
                        {
                          email: $(
                            $({}, t.state.email),
                            {},
                            { attachments: e.data.data }
                          )
                        }
                      )
                    );
                  });
              }
            },
            {
              key: "deleteAttachment",
              value: function(e, t) {
                var a = this;
                I.a.deleteAttachment(t).then(function() {
                  a.setState(
                    $(
                      $({}, a.state),
                      {},
                      {
                        email: $(
                          $({}, a.state.email),
                          {},
                          {
                            attachments: a.state.email.attachments.filter(
                              function(t) {
                                return t.name !== e;
                              }
                            )
                          }
                        )
                      }
                    )
                  );
                });
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
                  o = !1;
                function l(e, t) {
                  I.a
                    .updateConcept2(e, t)
                    .then(function() {
                      H.f.push("/emails/concept");
                    })
                    .catch(function(e) {});
                }
                function s(e, t) {
                  I.a
                    .sendConcept(e, t)
                    .then(function() {
                      H.f.push("/emails/sent");
                    })
                    .catch(function(e) {});
                }
                if (
                  (w.a.isEmpty(a.to) && ((n.to = !0), (o = !0)),
                  w.a.isEmpty("" + a.from) && ((n.from = !0), (o = !0)),
                  w.a.isEmpty("" + a.subject) && ((n.subject = !0), (o = !0)),
                  this.setState($($({}, this.state), {}, { errors: n })),
                  !o)
                ) {
                  a.to.length > 0 && (a.to = a.to.split(",")),
                    a.cc.length > 0 && (a.cc = a.cc.split(",")),
                    a.bcc.length > 0 && (a.bcc = a.bcc.split(","));
                  var c = new FormData();
                  c.append("to", JSON.stringify(a.to)),
                    c.append("cc", JSON.stringify(a.cc)),
                    c.append("bcc", JSON.stringify(a.bcc)),
                    c.append("quotationRequestId", a.quotationRequestId),
                    c.append("intakeId", a.intakeId),
                    t
                      ? I.a
                          .updateConcept(a, this.props.params.id)
                          .then(function(e) {
                            l(c, e.data);
                          })
                          .catch(function(e) {
                            console.log(e);
                          })
                      : (this.setButtonLoading(),
                        I.a
                          .updateConcept(a, this.props.params.id)
                          .then(function(e) {
                            s(c, e.data);
                          })
                          .catch(function(e) {
                            console.log(e);
                          }));
                }
              }
            },
            {
              key: "removeEmail",
              value: function() {
                I.a.deleteEmail(this.props.params.id).then(function() {
                  H.e.goBack();
                });
              }
            },
            {
              key: "render",
              value: function() {
                return N.a.createElement(
                  "div",
                  { className: "row" },
                  N.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    N.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      N.a.createElement(
                        A.a,
                        null,
                        N.a.createElement(
                          M.a,
                          { className: "panel-small" },
                          N.a.createElement(X, {
                            loading: this.state.buttonLoading,
                            handleSubmit: this.handleSubmit,
                            removeEmail: this.removeEmail
                          })
                        )
                      )
                    ),
                    N.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      N.a.createElement(K, {
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
                        deleteAttachment: this.deleteAttachment
                      })
                    )
                  ),
                  N.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          a
        );
      })(E.Component);
      t.default = te;
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        l = a(8),
        s = a.n(l),
        c = function(e) {
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
      (c.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (c.propTypes = {
          className: s.a.string,
          onMouseEnter: s.a.func,
          onMouseLeave: s.a.func
        }),
        (t.a = c);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        l = a(8),
        s = a.n(l),
        c = function(e) {
          var t = e.className,
            a = e.children;
          return o.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: s.a.string }),
        (t.a = c);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        l = a(8),
        s = a.n(l),
        c = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            l = e.type,
            s = e.value,
            c = e.loading,
            r = e.loadText,
            i = e.disabled;
          return c
            ? o.a.createElement(
                "button",
                {
                  type: l,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: s,
                  disabled: c
                },
                o.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                r
              )
            : o.a.createElement(
                "button",
                {
                  type: l,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: s,
                  disabled: i
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
          buttonClassName: s.a.string,
          buttonText: s.a.string.isRequired,
          onClickAction: s.a.func,
          type: s.a.string,
          value: s.a.string,
          loading: s.a.bool,
          loadText: s.a.string,
          disabled: s.a.bool
        }),
        (t.a = c);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        l = a(8),
        s = a.n(l),
        c = function(e) {
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
      (c.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (c.propTypes = {
          buttonClassName: s.a.string,
          iconName: s.a.string.isRequired,
          onClickAction: s.a.func,
          title: s.a.string,
          disabled: s.a.bool
        }),
        (t.a = c);
    },
    695: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        l = a(4),
        s = a(8),
        c = a.n(s),
        r = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            s = e.value,
            c = e.link,
            r = e.hidden;
          return c.length > 0
            ? o.a.createElement(
                "div",
                { className: a, style: r ? { display: "none" } : {} },
                o.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                o.a.createElement(
                  "div",
                  { className: "col-sm-6", id: n, onClick: null },
                  o.a.createElement(
                    l.b,
                    { to: c, className: "link-underline" },
                    s
                  )
                )
              )
            : o.a.createElement(
                "div",
                { className: a, style: r ? { display: "none" } : {} },
                o.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                o.a.createElement("div", { className: "col-sm-6", id: n }, s)
              );
        };
      (r.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (r.propTypes = {
          label: c.a.oneOfType([c.a.string, c.a.object]).isRequired,
          className: c.a.string,
          id: c.a.string,
          value: c.a.oneOfType([c.a.string, c.a.number]),
          link: c.a.string,
          hidden: c.a.bool
        }),
        (t.a = r);
    },
    698: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        l = a(8),
        s = a.n(l),
        c = function(e) {
          var t = e.className,
            a = e.children;
          return o.a.createElement(
            "div",
            { className: "panel-heading ".concat(t) },
            a
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: s.a.string }),
        (t.a = c);
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
    737: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        l = a(8),
        s = a.n(l),
        c =
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
        r = function(e) {
          var t = e.label,
            a = e.value,
            n = e.onChangeAction;
          return o.a.createElement(
            "div",
            null,
            o.a.createElement(
              "div",
              { className: "col-sm-3" },
              o.a.createElement(
                "label",
                { htmlFor: "quotationText", className: "col-sm-12" },
                t
              )
            ),
            o.a.createElement(
              "div",
              { className: "col-sm-9" },
              o.a.createElement(c.a, {
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
      (r.defaultProps = { value: "", errorMessage: "" }),
        (r.propTypes = {
          label: s.a.string.isRequired,
          type: s.a.string,
          id: s.a.string,
          placeholder: s.a.string,
          value: s.a.string,
          onChangeAction: s.a.func
        }),
        (t.a = r);
    },
    825: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        l = a(8),
        s = a.n(l),
        c = a(714),
        r =
          (a(715),
          function(e) {
            var t = e.label,
              a = (e.className, e.size),
              n = e.id,
              l = e.name,
              s = e.value,
              r = e.options,
              i = e.optionId,
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
                  o.a.createElement(c.a.Creatable, {
                    id: n,
                    name: l,
                    value: s,
                    onChange: d,
                    options: r,
                    valueKey: i,
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
      (r.defaultProps = {
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
        (r.propTypes = {
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
        (t.a = r);
    }
  }
]);
