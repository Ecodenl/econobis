(window.webpackJsonp = window.webpackJsonp || []).push([
  [35],
  {
    1429: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        l = a(25),
        i = a.n(l),
        o = a(26),
        s = a.n(o),
        c = a(27),
        u = a.n(c),
        m = a(16),
        d = a.n(m),
        h = a(0),
        p = a.n(h),
        f = a(32),
        g = a(745),
        v = a(4),
        b = a(693),
        E = Object(f.b)(function(e) {
          return { name: e.mailboxDetails.name };
        }, null)(function(e) {
          return p.a.createElement(
            "div",
            { className: "row" },
            p.a.createElement(
              "div",
              { className: "col-md-4" },
              p.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                p.a.createElement(b.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: v.e.goBack
                })
              )
            ),
            p.a.createElement(
              "div",
              { className: "col-md-4" },
              p.a.createElement(
                "h4",
                { className: "text-center" },
                "Mailbox: ",
                e.name
              )
            ),
            p.a.createElement("div", { className: "col-md-4" })
          );
        }),
        y = a(198),
        N = a(22),
        w = a.n(N),
        x = a(6),
        k = a.n(x),
        D = a(697),
        C = a.n(D),
        O = a(14),
        S = a(65),
        I = a(201),
        j = a(694),
        A = a(696),
        P = a(692),
        L = a(690),
        T = a(698),
        M = a(691),
        R = a(700),
        q = a(695),
        B = a(7),
        _ = a.n(B);
      function z(e, t) {
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
      function F(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? z(Object(a), !0).forEach(function(t) {
                k()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : z(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function H(e) {
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
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var U = (function(e) {
          s()(a, e);
          var t = H(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              k()(w()(n), "handleInputUsesMailgun", function(e) {
                var t = e.target.checked;
                n.setState(
                  F(
                    F({}, n.state),
                    {},
                    {
                      mailbox: F(
                        F({}, n.state.mailbox),
                        {},
                        {
                          usesMailgun: t,
                          outgoingServerType: t ? "mailgun" : "smtp"
                        }
                      )
                    }
                  )
                );
              }),
              (n.state = {
                mailbox: F(
                  F({}, e.mailboxDetails),
                  {},
                  {
                    usesMailgun:
                      "mailgun" === e.mailboxDetails.outgoingServerType
                  }
                ),
                errors: {
                  name: !1,
                  email: !1,
                  username: !1,
                  password: !1,
                  smtpHost: !1,
                  smtpPort: !1,
                  imapHost: !1,
                  imapPort: !1
                },
                loading: !1
              }),
              (n.handleInputChange = n.handleInputChange.bind(w()(n))),
              (n.handleSubmit = n.handleSubmit.bind(w()(n))),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "handleInputChange",
                value: function(e) {
                  var t = e.target,
                    a = "checkbox" === t.type ? t.checked : t.value,
                    n = t.name;
                  this.setState(
                    F(
                      F({}, this.state),
                      {},
                      {
                        mailbox: F(F({}, this.state.mailbox), {}, k()({}, n, a))
                      }
                    )
                  );
                }
              },
              {
                key: "handleSubmit",
                value: function(e) {
                  var t = this;
                  e.preventDefault();
                  var a = this.state.mailbox,
                    n = {},
                    r = !1;
                  C.a.isEmpty(a.name) && ((n.name = !0), (r = !0)),
                    C.a.isEmail(a.email) || ((n.email = !0), (r = !0)),
                    C.a.isEmpty(a.username) && ((n.username = !0), (r = !0)),
                    a.usesMailgun
                      ? C.a.isEmpty(a.mailgunDomainId.toString()) &&
                        ((n.mailgunDomainId = !0), (r = !0))
                      : (C.a.isEmpty(a.smtpHost) &&
                          ((n.smtpHost = !0), (r = !0)),
                        C.a.isEmpty(a.smtpPort) &&
                          ((n.smtpPort = !0), (r = !0))),
                    C.a.isEmpty(a.imapHost) && ((n.imapHost = !0), (r = !0)),
                    C.a.isEmpty(a.imapPort) && ((n.imapPort = !0), (r = !0)),
                    this.setState(F(F({}, this.state), {}, { errors: n })),
                    !r &&
                      this.setState(
                        function(e) {
                          return { loading: !e.loading };
                        },
                        function() {
                          S.a.updateMailbox(a).then(function(e) {
                            t.props.updateMailbox(e),
                              t.props.fetchSystemData(),
                              t.props.switchToView();
                          });
                        }
                      );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.mailbox,
                    t = e.name,
                    a = e.email,
                    n = e.smtpHost,
                    r = e.smtpPort,
                    l = e.smtpEncryption,
                    i = e.imapHost,
                    o = e.imapPort,
                    s = e.imapEncryption,
                    c = e.imapInboxPrefix,
                    u = e.dateLastFetched,
                    m = e.imapIdLastFetched,
                    d = e.username,
                    h = e.password,
                    f = e.usesMailgun,
                    g = e.mailgunDomainId,
                    v = e.primary,
                    b = e.isActive,
                    E = e.linkContactFromEmailToAddress;
                  return p.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    p.a.createElement(
                      L.a,
                      null,
                      p.a.createElement(
                        M.a,
                        null,
                        p.a.createElement(
                          "div",
                          { className: "row" },
                          p.a.createElement(j.a, {
                            label: "Weergavenaam",
                            name: "name",
                            value: t,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.name
                          }),
                          p.a.createElement(j.a, {
                            label: "E-mail",
                            name: "email",
                            value: a,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.email
                          })
                        ),
                        p.a.createElement(
                          "div",
                          { className: "row" },
                          p.a.createElement(j.a, {
                            label: "Gebruikersnaam",
                            name: "username",
                            value: d,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.username
                          }),
                          p.a.createElement(j.a, {
                            type: "text",
                            label: "Wachtwoord",
                            name: "password",
                            value: h,
                            placeholder: "**********",
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.password,
                            className: "numeric-password"
                          })
                        ),
                        p.a.createElement(
                          "div",
                          { className: "row" },
                          p.a.createElement(R.a, {
                            label: "Actief",
                            name: "isActive",
                            value: b,
                            onChangeAction: this.handleInputChange,
                            disabled: v
                          }),
                          p.a.createElement(R.a, {
                            label: "Primair (verzend wachtwoord mails)",
                            name: "primary",
                            value: v,
                            onChangeAction: this.handleInputChange,
                            disabled: !b || v
                          })
                        ),
                        p.a.createElement(
                          "div",
                          { className: "row" },
                          p.a.createElement(R.a, {
                            label: p.a.createElement(
                              "span",
                              null,
                              "Koppel contact op email ",
                              p.a.createElement("u", null, "aan"),
                              " adres",
                              p.a.createElement("br", null),
                              p.a.createElement(
                                "small",
                                {
                                  style: { color: "#ccc", fontWeight: "normal" }
                                },
                                "Koppeling contact standaard op email ",
                                p.a.createElement("u", null, "afzender"),
                                " adres"
                              )
                            ),
                            name: "linkContactFromEmailToAddress",
                            value: E,
                            onChangeAction: this.handleInputChange
                          })
                        )
                      ),
                      p.a.createElement(
                        T.a,
                        null,
                        p.a.createElement(
                          "span",
                          { className: "h5" },
                          "Servergegevens"
                        )
                      ),
                      p.a.createElement(
                        M.a,
                        null,
                        p.a.createElement(
                          "div",
                          { className: "row" },
                          p.a.createElement(j.a, {
                            label: "Inkomend",
                            name: "imapHost",
                            value: i,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.imapHost
                          }),
                          p.a.createElement(R.a, {
                            label: "Gebruikt mailgun",
                            name: "usesMailgun",
                            value: f,
                            onChangeAction: this.handleInputUsesMailgun,
                            required: "required"
                          })
                        ),
                        p.a.createElement(
                          "div",
                          { className: "row" },
                          p.a.createElement("div", {
                            className: "form-group col-md-6"
                          }),
                          f
                            ? p.a.createElement(A.a, {
                                label: "Uitgaand",
                                name: "mailgunDomainId",
                                value: g,
                                options: this.props.mailgunDomain,
                                optionName: "domain",
                                onChangeAction: this.handleInputChange,
                                error: this.state.errors.mailgunDomainId
                              })
                            : p.a.createElement(j.a, {
                                label: "Uitgaand",
                                name: "smtpHost",
                                value: n,
                                onChangeAction: this.handleInputChange,
                                required: "required",
                                error: this.state.errors.smtpHost
                              })
                        )
                      ),
                      p.a.createElement(
                        T.a,
                        null,
                        p.a.createElement(
                          "span",
                          { className: "h5" },
                          "Extra instellingen"
                        )
                      ),
                      p.a.createElement(
                        M.a,
                        null,
                        p.a.createElement(
                          "div",
                          { className: "row" },
                          p.a.createElement(j.a, {
                            label: "Imap poort",
                            name: "imapPort",
                            value: o,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.imapPort
                          }),
                          !f &&
                            p.a.createElement(j.a, {
                              label: "Smtp poort",
                              name: "smtpPort",
                              value: r,
                              onChangeAction: this.handleInputChange,
                              required: "required",
                              error: this.state.errors.smtpPort
                            })
                        ),
                        p.a.createElement(
                          "div",
                          { className: "row" },
                          p.a.createElement(A.a, {
                            label: "Imap versleutelde verbinding",
                            name: "imapEncryption",
                            value: s,
                            options: [
                              { id: "ssl", name: "SSL" },
                              { id: "tls", name: "TLS" }
                            ],
                            onChangeAction: this.handleInputChange
                          }),
                          !f &&
                            p.a.createElement(A.a, {
                              label: "Smtp versleutelde verbinding",
                              name: "smtpEncryption",
                              value: l,
                              options: [
                                { id: "ssl", name: "SSL" },
                                { id: "tls", name: "TLS" }
                              ],
                              onChangeAction: this.handleInputChange
                            })
                        ),
                        p.a.createElement(
                          "div",
                          { className: "row" },
                          p.a.createElement(j.a, {
                            label: "Inbox prefix",
                            name: "imapInboxPrefix",
                            value: c,
                            onChangeAction: this.handleInputChange,
                            error: this.state.errors.imapInboxPrefix
                          })
                        )
                      ),
                      p.a.createElement(
                        T.a,
                        null,
                        p.a.createElement("span", { className: "h5" }, "Log")
                      ),
                      p.a.createElement(
                        M.a,
                        null,
                        p.a.createElement(
                          "div",
                          { className: "row" },
                          p.a.createElement(
                            q.a,
                            k()(
                              {
                                label: "Datum email laatst opgehaald",
                                value: u
                              },
                              "value",
                              u
                                ? _()(u).format("L HH:mm:ss")
                                : "Nog niet bepaald"
                            )
                          ),
                          p.a.createElement(q.a, {
                            label: "UID email laatst opgehaald",
                            value: m
                          })
                        )
                      ),
                      p.a.createElement(
                        M.a,
                        null,
                        p.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          p.a.createElement(P.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Sluiten",
                            onClickAction: this.props.switchToView
                          }),
                          p.a.createElement(P.a, {
                            buttonText: "Opslaan",
                            onClickAction: this.handleSubmit,
                            type: "submit",
                            value: "Submit",
                            loading: this.state.loading
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
        })(h.Component),
        X = Object(f.b)(
          function(e) {
            return {
              mailboxDetails: e.mailboxDetails,
              mailgunDomain: e.systemData.mailgunDomain
            };
          },
          function(e) {
            return Object(O.b)({ updateMailbox: g.f, fetchSystemData: I.a }, e);
          }
        )(U),
        W = Object(f.b)(function(e) {
          return {
            mailboxDetails: e.mailboxDetails,
            usesMailgun: e.systemData.usesMailgun,
            mailgunDomain: e.systemData.mailgunDomain
          };
        })(function(e) {
          var t = e.mailboxDetails,
            a = t.name,
            n = t.email,
            r = t.smtpHost,
            l = t.smtpPort,
            i = t.smtpEncryption,
            o = t.imapHost,
            s = t.imapPort,
            c = t.imapEncryption,
            u = t.imapInboxPrefix,
            m = t.dateLastFetched,
            d = t.imapIdLastFetched,
            h = t.username,
            f = t.outgoingServerType,
            g = t.mailgunDomain,
            v = t.isActive,
            b = t.primary,
            E = t.linkContactFromEmailToAddress,
            y = "mailgun" === f;
          return p.a.createElement(
            "div",
            { onClick: e.switchToEdit },
            p.a.createElement(
              L.a,
              null,
              p.a.createElement(
                M.a,
                null,
                p.a.createElement(
                  "div",
                  { className: "row" },
                  p.a.createElement(q.a, { label: "Weergavenaam", value: a }),
                  p.a.createElement(q.a, { label: "E-mail", value: n })
                ),
                p.a.createElement(
                  "div",
                  { className: "row" },
                  p.a.createElement(q.a, { label: "Gebruikersnaam", value: h }),
                  p.a.createElement(q.a, {
                    label: "Wachtwoord",
                    value: "••••••••••"
                  })
                ),
                p.a.createElement(
                  "div",
                  { className: "row" },
                  p.a.createElement(q.a, {
                    label: "Actief",
                    value: v ? "Ja" : "Nee"
                  }),
                  p.a.createElement(q.a, {
                    label: "Primair (verzend wachtwoord mails)",
                    value: b ? "Ja" : "Nee"
                  })
                ),
                p.a.createElement(
                  "div",
                  { className: "row" },
                  p.a.createElement(q.a, {
                    label: p.a.createElement(
                      "span",
                      null,
                      "Koppel contact op email ",
                      p.a.createElement("u", null, "aan"),
                      " adres",
                      p.a.createElement("br", null),
                      p.a.createElement(
                        "small",
                        { style: { color: "#ccc", fontWeight: "normal" } },
                        "Koppeling contact standaard op email ",
                        p.a.createElement("u", null, "afzender"),
                        " adres"
                      )
                    ),
                    value: E ? "Ja" : "Nee"
                  })
                )
              ),
              p.a.createElement(
                T.a,
                null,
                p.a.createElement("span", { className: "h5" }, "Servergegevens")
              ),
              p.a.createElement(
                M.a,
                null,
                p.a.createElement(
                  "div",
                  { className: "row" },
                  p.a.createElement(q.a, { label: "Inkomend", value: o }),
                  p.a.createElement(q.a, {
                    label: "Gebruikt mailgun",
                    value:
                      "mailgun" === e.mailboxDetails.outgoingServerType
                        ? "Ja"
                        : "Nee"
                  })
                ),
                p.a.createElement(
                  "div",
                  { className: "row" },
                  p.a.createElement("div", { className: "col-md-6" }),
                  y
                    ? p.a.createElement(q.a, { label: "Uitgaand", value: g })
                    : p.a.createElement(q.a, { label: "Uitgaand", value: r })
                )
              ),
              p.a.createElement(
                T.a,
                null,
                p.a.createElement(
                  "span",
                  { className: "h5" },
                  "Extra instellingen"
                )
              ),
              p.a.createElement(
                M.a,
                null,
                p.a.createElement(
                  "div",
                  { className: "row" },
                  p.a.createElement(q.a, { label: "Imap poort", value: s }),
                  !y &&
                    p.a.createElement(q.a, { label: "Smtp poort", value: l })
                ),
                p.a.createElement(
                  "div",
                  { className: "row" },
                  p.a.createElement(q.a, {
                    label: "Imap versleutelde verbinding",
                    value: c
                  }),
                  !y &&
                    p.a.createElement(q.a, {
                      label: "Smtp versleutelde verbinding",
                      value: i
                    })
                ),
                p.a.createElement(
                  "div",
                  { className: "row" },
                  p.a.createElement(q.a, { label: "Inbox prefix", value: u })
                )
              ),
              p.a.createElement(
                T.a,
                null,
                p.a.createElement("span", { className: "h5" }, "Log")
              ),
              p.a.createElement(
                M.a,
                null,
                p.a.createElement(
                  "div",
                  { className: "row" },
                  p.a.createElement(
                    q.a,
                    k()(
                      { label: "Datum email laatst opgehaald", value: m },
                      "value",
                      m ? _()(m).format("L HH:mm:ss") : "Nog niet bepaald"
                    )
                  ),
                  p.a.createElement(q.a, {
                    label: "UID email laatst opgehaald",
                    value: d
                  })
                )
              )
            )
          );
        });
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
          var a,
            n = d()(e);
          if (t) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var V = (function(e) {
          s()(a, e);
          var t = G(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              k()(w()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              k()(w()(n), "switchToView", function() {
                n.setState({ showEdit: !1, activeDiv: "" });
              }),
              (n.state = { showEdit: !1, activeDiv: "" }),
              n
            );
          }
          return (
            i()(a, [
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
                  var e = this;
                  this.props.meDetails.permissions;
                  return p.a.createElement(
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
                    this.state.showEdit && this.props.permissions.createMailbox
                      ? p.a.createElement(X, {
                          switchToView: this.switchToView
                        })
                      : p.a.createElement(W, {
                          switchToEdit: this.switchToEdit
                        })
                  );
                }
              }
            ]),
            a
          );
        })(h.Component),
        J = Object(f.b)(function(e) {
          return {
            mailboxDetails: e.mailboxDetails,
            meDetails: e.meDetails,
            permissions: e.meDetails.permissions
          };
        })(V),
        K = Object(f.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(function(e) {
          var t = e.user,
            a = (t.id, t.fullName);
          return p.a.createElement(
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
            p.a.createElement("div", { className: "col-sm-11" }, a),
            p.a.createElement(
              "div",
              { className: "col-sm-1" },
              e.showActionButtons && e.permissions.createMailbox
                ? p.a.createElement(
                    "a",
                    { role: "button", onClick: e.toggleDelete },
                    p.a.createElement("span", {
                      className: "glyphicon glyphicon-trash mybtn-danger"
                    }),
                    " "
                  )
                : ""
            )
          );
        }),
        Y = a(100),
        Q = Object(f.b)(
          function(e) {
            return { mailboxId: e.mailboxDetails.id };
          },
          function(e) {
            return {
              deleteMailboxUser: function(t, a) {
                e(Object(g.b)(t, a));
              }
            };
          }
        )(function(e) {
          return p.a.createElement(
            Y.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.toggleDelete,
              confirmAction: function() {
                return (
                  e.deleteMailboxUser(e.mailboxId, e.userId),
                  void e.toggleDelete()
                );
              },
              title: "Verwijderen"
            },
            p.a.createElement(
              "p",
              null,
              "Wil je deze gebruiker ontkoppelen van deze mailbox?"
            )
          );
        });
      function Z(e) {
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
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var $ = (function(e) {
          s()(a, e);
          var t = Z(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              k()(w()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              k()(w()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              k()(w()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              (n.state = {
                showActionButtons: !1,
                highlightLine: "",
                showDelete: !1,
                user: e.user
              }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  return p.a.createElement(
                    "div",
                    null,
                    p.a.createElement(K, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      toggleDelete: this.toggleDelete,
                      user: this.state.user
                    }),
                    this.state.showDelete &&
                      this.props.permissions.createMailbox &&
                      p.a.createElement(Q, {
                        toggleDelete: this.toggleDelete,
                        userId: this.state.user.id
                      })
                  );
                }
              }
            ]),
            a
          );
        })(h.Component),
        ee = Object(f.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })($),
        te = Object(f.b)(function(e) {
          return { users: e.mailboxDetails.users };
        })(function(e) {
          return p.a.createElement(
            "div",
            null,
            p.a.createElement(
              "div",
              { className: "row border header" },
              p.a.createElement("div", { className: "col-sm-11" }, "Naam"),
              p.a.createElement("div", { className: "col-sm-1" })
            ),
            e.users.length > 0
              ? e.users.map(function(e) {
                  return p.a.createElement(ee, { key: e.id, user: e });
                })
              : p.a.createElement("div", null, "Geen gebruikers bekend.")
          );
        });
      function ae(e, t) {
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
      function ne(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ae(Object(a), !0).forEach(function(t) {
                k()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : ae(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function re(e) {
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
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var le = (function(e) {
          s()(a, e);
          var t = re(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              ((n = t.call(this, e)).state = {
                userId: "",
                errors: { userId: !1, hasErrors: !0 }
              }),
              (n.handleInputChange = n.handleInputChange.bind(w()(n))),
              (n.handleSubmit = n.handleSubmit.bind(w()(n))),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "handleInputChange",
                value: function(e) {
                  var t = e.target.value;
                  this.setState({ userId: t });
                }
              },
              {
                key: "handleSubmit",
                value: function(e) {
                  var t = this;
                  e.preventDefault();
                  var a = {
                      mailboxId: this.props.mailboxId,
                      userId: this.state.userId
                    },
                    n = {},
                    r = !1;
                  C.a.isEmpty(a.userId) && ((n.userId = !0), (r = !0)),
                    this.setState(ne(ne({}, this.state), {}, { errors: n })),
                    r ||
                      S.a
                        .newMailboxUser(a)
                        .then(function(e) {
                          t.props.newMailboxUser(e.data.data),
                            t.props.toggleShowNew();
                        })
                        .catch(function(e) {
                          console.log(e.response);
                        });
                }
              },
              {
                key: "render",
                value: function() {
                  return p.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    p.a.createElement(
                      L.a,
                      { className: "panel-grey" },
                      p.a.createElement(
                        M.a,
                        null,
                        p.a.createElement(
                          "div",
                          { className: "row" },
                          p.a.createElement(j.a, {
                            label: "Mailbox",
                            name: "mailbox",
                            value: this.props.mailboxName,
                            readOnly: !0
                          }),
                          p.a.createElement(A.a, {
                            label: "Gebruiker",
                            size: "col-sm-6",
                            name: "userId",
                            options: this.props.users,
                            optionName: "fullName",
                            value: this.state.userId,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.userId
                          })
                        ),
                        p.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          p.a.createElement(P.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          p.a.createElement(P.a, {
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
        })(h.Component),
        ie = Object(f.b)(
          function(e) {
            return {
              mailboxId: e.mailboxDetails.id,
              mailboxName: e.mailboxDetails.name,
              users: e.systemData.users
            };
          },
          function(e) {
            return {
              newMailboxUser: function(t) {
                e(Object(g.e)(t));
              }
            };
          }
        )(le);
      function oe(e) {
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
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var se = (function(e) {
          s()(a, e);
          var t = oe(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              k()(w()(n), "toggleShowNew", function() {
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
                  return p.a.createElement(
                    L.a,
                    null,
                    p.a.createElement(
                      T.a,
                      null,
                      p.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Gekoppelde gebruikers"
                      ),
                      this.props.permissions.createMailbox &&
                        p.a.createElement(
                          "a",
                          {
                            role: "button",
                            className: "pull-right",
                            onClick: this.toggleShowNew
                          },
                          p.a.createElement("span", {
                            className: "glyphicon glyphicon-plus"
                          })
                        )
                    ),
                    p.a.createElement(
                      M.a,
                      null,
                      p.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        p.a.createElement(te, null)
                      ),
                      p.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          p.a.createElement(ie, {
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
        })(h.Component),
        ce = Object(f.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(se),
        ue = Object(f.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(function(e) {
          var t = e.ignore,
            a = t.value,
            n = t.type;
          return p.a.createElement(
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
            p.a.createElement("div", { className: "col-sm-6" }, a),
            p.a.createElement(
              "div",
              { className: "col-sm-5" },
              n ? n.name : ""
            ),
            p.a.createElement(
              "div",
              { className: "col-sm-1" },
              e.showActionButtons && e.permissions.createMailbox
                ? p.a.createElement(
                    "a",
                    { role: "button", onClick: e.toggleDelete },
                    p.a.createElement("span", {
                      className: "glyphicon glyphicon-trash mybtn-danger"
                    }),
                    " "
                  )
                : ""
            )
          );
        }),
        me = Object(f.b)(null, function(e) {
          return {
            deleteMailboxIgnore: function(t) {
              e(Object(g.a)(t));
            }
          };
        })(function(e) {
          return p.a.createElement(
            Y.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.toggleDelete,
              confirmAction: function() {
                return e.deleteMailboxIgnore(e.ignoreId), void e.toggleDelete();
              },
              title: "Verwijderen"
            },
            p.a.createElement(
              "p",
              null,
              "Wil je deze regel verwijderen van deze mailbox?"
            )
          );
        });
      function de(e) {
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
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var he = (function(e) {
          s()(a, e);
          var t = de(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              k()(w()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              k()(w()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              k()(w()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              (n.state = {
                showActionButtons: !1,
                highlightLine: "",
                showDelete: !1,
                ignore: e.ignore
              }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  return p.a.createElement(
                    "div",
                    null,
                    p.a.createElement(ue, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      toggleDelete: this.toggleDelete,
                      ignore: this.state.ignore
                    }),
                    this.state.showDelete &&
                      this.props.permissions.createMailbox &&
                      p.a.createElement(me, {
                        toggleDelete: this.toggleDelete,
                        ignoreId: this.state.ignore.id
                      })
                  );
                }
              }
            ]),
            a
          );
        })(h.Component),
        pe = Object(f.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(he),
        fe = Object(f.b)(function(e) {
          return { mailboxIgnores: e.mailboxDetails.mailboxIgnores };
        })(function(e) {
          return p.a.createElement(
            "div",
            null,
            p.a.createElement(
              "div",
              { className: "row border header" },
              p.a.createElement("div", { className: "col-sm-6" }, "Waarde"),
              p.a.createElement("div", { className: "col-sm-5" }, "Type"),
              p.a.createElement("div", { className: "col-sm-1" })
            ),
            e.mailboxIgnores.length > 0
              ? e.mailboxIgnores.map(function(e) {
                  return p.a.createElement(pe, { key: e.id, ignore: e });
                })
              : p.a.createElement("div", null, "Geen gegevens bekend.")
          );
        });
      function ge(e, t) {
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
      function ve(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ge(Object(a), !0).forEach(function(t) {
                k()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : ge(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function be(e) {
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
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var Ee = (function(e) {
          s()(a, e);
          var t = be(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              ((n = t.call(this, e)).state = {
                ignore: { mailboxId: e.mailboxId, value: "", typeId: "" },
                ignoreId: "",
                errors: { value: !1, typeId: !1 }
              }),
              (n.handleInputChange = n.handleInputChange.bind(w()(n))),
              (n.handleSubmit = n.handleSubmit.bind(w()(n))),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "handleInputChange",
                value: function(e) {
                  var t = e.target,
                    a = "checkbox" === t.type ? t.checked : t.value,
                    n = t.name;
                  this.setState(
                    ve(
                      ve({}, this.state),
                      {},
                      {
                        ignore: ve(ve({}, this.state.ignore), {}, k()({}, n, a))
                      }
                    )
                  );
                }
              },
              {
                key: "handleSubmit",
                value: function(e) {
                  var t = this;
                  e.preventDefault();
                  var a = this.state.ignore,
                    n = {},
                    r = !1;
                  C.a.isEmpty(a.value) && ((n.value = !0), (r = !0)),
                    C.a.isEmpty(a.typeId) && ((n.typeId = !0), (r = !0)),
                    this.setState(ve(ve({}, this.state), {}, { errors: n })),
                    r ||
                      S.a
                        .newIgnore(a)
                        .then(function(e) {
                          t.props.newMailboxIgnore(e.data.data),
                            t.props.toggleShowNew();
                        })
                        .catch(function(e) {
                          console.log(e.response);
                        });
                }
              },
              {
                key: "render",
                value: function() {
                  return p.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    p.a.createElement(
                      L.a,
                      { className: "panel-grey" },
                      p.a.createElement(
                        M.a,
                        null,
                        p.a.createElement(
                          "div",
                          { className: "row" },
                          p.a.createElement(j.a, {
                            label: "Waarde",
                            name: "value",
                            value: this.state.ignore.value,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.value
                          }),
                          p.a.createElement(A.a, {
                            label: "Type",
                            size: "col-sm-6",
                            name: "typeId",
                            options: this.props.mailboxIgnoreTypes,
                            value: this.state.ignore.typeId,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.typeId
                          })
                        ),
                        p.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          p.a.createElement(P.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          p.a.createElement(P.a, {
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
        })(h.Component),
        ye = Object(f.b)(
          function(e) {
            return {
              mailboxId: e.mailboxDetails.id,
              mailboxIgnoreTypes: e.systemData.mailboxIgnoreTypes
            };
          },
          function(e) {
            return {
              newMailboxIgnore: function(t) {
                e(Object(g.d)(t));
              }
            };
          }
        )(Ee);
      function Ne(e) {
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
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var we = (function(e) {
          s()(a, e);
          var t = Ne(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              k()(w()(n), "toggleShowNew", function() {
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
                  return p.a.createElement(
                    L.a,
                    null,
                    p.a.createElement(
                      T.a,
                      null,
                      p.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Welke e-mailadressen en of domeinnamen moeten niet gekoppeld worden aan contacten"
                      ),
                      this.props.permissions.createMailbox &&
                        p.a.createElement(
                          "a",
                          {
                            role: "button",
                            className: "pull-right",
                            onClick: this.toggleShowNew
                          },
                          p.a.createElement("span", {
                            className: "glyphicon glyphicon-plus"
                          })
                        )
                    ),
                    p.a.createElement(
                      M.a,
                      null,
                      p.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        p.a.createElement(fe, null)
                      ),
                      p.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          p.a.createElement(ye, {
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
        })(h.Component),
        xe = Object(f.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(we);
      function ke(e) {
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
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var De = (function(e) {
          s()(a, e);
          var t = ke(a);
          function a(e) {
            return r()(this, a), t.call(this, e);
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
                      ? (e = "Fout bij het ophalen van mailbox.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : Object(y.isEmpty)(this.props.mailboxDetails)
                      ? (e = "Geen mailbox gevonden!")
                      : (t = !1),
                    t
                      ? p.a.createElement("div", null, e)
                      : p.a.createElement(
                          "div",
                          null,
                          !this.props.mailboxDetails.valid &&
                            p.a.createElement(
                              L.a,
                              null,
                              p.a.createElement(
                                T.a,
                                null,
                                p.a.createElement(
                                  "span",
                                  {
                                    className: "h5",
                                    style: { color: "#e64a4a" }
                                  },
                                  "Deze mailbox is onjuist geconfigureerd. Hierdoor zal er geen mail uit deze mailbox gehaald worden. Update de configuratie om de mailbox werkend te krijgen."
                                )
                              )
                            ),
                          p.a.createElement(J, null),
                          p.a.createElement(ce, null),
                          p.a.createElement(xe, null)
                        )
                  );
                }
              }
            ]),
            a
          );
        })(h.Component),
        Ce = Object(f.b)(
          function(e) {
            return {
              mailboxDetails: e.mailboxDetails,
              isLoading: e.loadingData.isLoading,
              hasError: e.loadingData.hasError
            };
          },
          function(e) {
            return {
              fetchMailboxDetails: function(t) {
                e(Object(g.c)(t));
              }
            };
          }
        )(De);
      function Oe(e) {
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
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var Se = (function(e) {
        s()(a, e);
        var t = Oe(a);
        function a(e) {
          return r()(this, a), t.call(this, e);
        }
        return (
          i()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchMailboxDetails(this.props.params.id);
              }
            },
            {
              key: "render",
              value: function() {
                return p.a.createElement(
                  "div",
                  { className: "row" },
                  p.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    p.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      p.a.createElement(
                        L.a,
                        null,
                        p.a.createElement(
                          M.a,
                          { className: "panel-small" },
                          p.a.createElement(E, null)
                        )
                      )
                    ),
                    p.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      p.a.createElement(Ce, null)
                    )
                  ),
                  p.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          a
        );
      })(h.Component);
      t.default = Object(f.b)(
        function(e) {
          return { mailboxDetails: e.mailboxDetails };
        },
        function(e) {
          return {
            fetchMailboxDetails: function(t) {
              e(Object(g.c)(t));
            }
          };
        }
      )(Se);
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        i = a.n(l),
        o = function(e) {
          var t = e.children,
            a = e.className,
            n = e.onMouseEnter,
            l = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: l
            },
            t
          );
        };
      (o.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (o.propTypes = {
          className: i.a.string,
          onMouseEnter: i.a.func,
          onMouseLeave: i.a.func
        }),
        (t.a = o);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        i = a.n(l),
        o = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (o.defaultProps = { className: "" }),
        (o.propTypes = { className: i.a.string }),
        (t.a = o);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        i = a.n(l),
        o = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            l = e.type,
            i = e.value,
            o = e.loading,
            s = e.loadText,
            c = e.disabled;
          return o
            ? r.a.createElement(
                "button",
                {
                  type: l,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: i,
                  disabled: o
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
                  type: l,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: i,
                  disabled: c
                },
                a
              );
        };
      (o.defaultProps = {
        buttonClassName: "btn-success",
        type: "button",
        value: "",
        loading: !1,
        loadText: "Aan het laden",
        disabled: !1
      }),
        (o.propTypes = {
          buttonClassName: i.a.string,
          buttonText: i.a.string.isRequired,
          onClickAction: i.a.func,
          type: i.a.string,
          value: i.a.string,
          loading: i.a.bool,
          loadText: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = o);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        i = a.n(l),
        o = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            l = e.title,
            i = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: i,
              title: l
            },
            r.a.createElement("span", { className: "glyphicon ".concat(a) })
          );
        };
      (o.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (o.propTypes = {
          buttonClassName: i.a.string,
          iconName: i.a.string.isRequired,
          onClickAction: i.a.func,
          title: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = o);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        i = a.n(l),
        o = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            l = e.size,
            i = e.id,
            o = e.placeholder,
            s = e.name,
            c = e.value,
            u = e.onClickAction,
            m = e.onChangeAction,
            d = e.onBlurAction,
            h = e.required,
            p = e.readOnly,
            f = e.maxLength,
            g = e.error,
            v = e.min,
            b = e.max,
            E = e.step,
            y = e.errorMessage,
            N = e.divSize,
            w = e.divClassName,
            x = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(N, " ").concat(w) },
            r.a.createElement(
              "label",
              { htmlFor: i, className: "col-sm-6 ".concat(h) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(l) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (g ? "has-error" : ""),
                id: i,
                placeholder: o,
                name: s,
                value: c,
                onClick: u,
                onChange: m,
                onBlur: d,
                readOnly: p,
                maxLength: f,
                min: v,
                max: b,
                autoComplete: x,
                step: E
              })
            ),
            g &&
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
      (o.defaultProps = {
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
        (o.propTypes = {
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
        (t.a = o);
    },
    695: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(4),
        i = a(8),
        o = a.n(i),
        s = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            i = e.value,
            o = e.link,
            s = e.hidden;
          return o.length > 0
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
                    l.b,
                    { to: o, className: "link-underline" },
                    i
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
                r.a.createElement("div", { className: "col-sm-6", id: n }, i)
              );
        };
      (s.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (s.propTypes = {
          label: o.a.oneOfType([o.a.string, o.a.object]).isRequired,
          className: o.a.string,
          id: o.a.string,
          value: o.a.oneOfType([o.a.string, o.a.number]),
          link: o.a.string,
          hidden: o.a.bool
        }),
        (t.a = s);
    },
    696: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        i = a.n(l),
        o = function(e) {
          var t = e.label,
            a = e.className,
            n = e.size,
            l = e.id,
            i = e.name,
            o = e.value,
            s = e.options,
            c = e.onChangeAction,
            u = e.onBlurAction,
            m = e.required,
            d = e.error,
            h = e.errorMessage,
            p = e.optionValue,
            f = e.optionName,
            g = e.readOnly,
            v = e.placeholder,
            b = e.divClassName,
            E = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(b) },
            r.a.createElement(
              "label",
              { htmlFor: l, className: "col-sm-6 ".concat(m) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-6" },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(a) + (d && " has-error"),
                  id: l,
                  name: i,
                  value: o,
                  onChange: c,
                  onBlur: u,
                  readOnly: g
                },
                E && r.a.createElement("option", { value: "" }, v),
                s.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[p], value: e[p] },
                    e[f]
                  );
                })
              )
            ),
            d &&
              r.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                r.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  h
                )
              )
          );
        };
      (o.defaultProps = {
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
        (o.propTypes = {
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
        (t.a = o);
    },
    698: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        i = a.n(l),
        o = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-heading ".concat(t) },
            a
          );
        };
      (o.defaultProps = { className: "" }),
        (o.propTypes = { className: i.a.string }),
        (t.a = o);
    },
    700: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        i = a.n(l),
        o = a(703),
        s = a.n(o),
        c = function(e) {
          var t = e.label,
            a = e.size,
            n = e.id,
            l = e.name,
            i = e.value,
            o = e.onChangeAction,
            c = e.required,
            u = e.divSize,
            m = e.className,
            d = e.disabled;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(u, " ").concat(m) },
            r.a.createElement(
              "div",
              null,
              r.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(c) },
                t
              )
            ),
            r.a.createElement(
              "div",
              { className: "".concat(a) },
              r.a.createElement(s.a, {
                id: n,
                name: l,
                onChange: o,
                checked: i,
                disabled: d
              })
            )
          );
        };
      (c.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        required: "",
        disabled: !1,
        value: null
      }),
        (c.propTypes = {
          label: i.a.string.isRequired,
          type: i.a.string,
          size: i.a.string,
          divSize: i.a.string,
          id: i.a.string,
          name: i.a.string.isRequired,
          value: i.a.bool,
          onChangeAction: i.a.func,
          required: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = c);
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
        l = a(0),
        i = d(l),
        o = d(a(710)),
        s = d(a(8)),
        c = d(a(704)),
        u = d(a(705)),
        m = a(706);
      function d(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var h = (function(e) {
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
                (this.startX = (0, m.pointerCoord)(e).x), (this.activated = !0);
              }
            },
            {
              key: "handleTouchMove",
              value: function(e) {
                if (this.activated && ((this.moved = !0), this.startX)) {
                  var t = (0, m.pointerCoord)(e).x;
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
                    var a = (0, m.pointerCoord)(e).x;
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
                  l = (0, o.default)(
                    "react-toggle",
                    {
                      "react-toggle--checked": this.state.checked,
                      "react-toggle--focus": this.state.hasFocus,
                      "react-toggle--disabled": this.props.disabled
                    },
                    a
                  );
                return i.default.createElement(
                  "div",
                  {
                    className: l,
                    onClick: this.handleClick,
                    onTouchStart: this.handleTouchStart,
                    onTouchMove: this.handleTouchMove,
                    onTouchEnd: this.handleTouchEnd
                  },
                  i.default.createElement(
                    "div",
                    { className: "react-toggle-track" },
                    i.default.createElement(
                      "div",
                      { className: "react-toggle-track-check" },
                      this.getIcon("checked")
                    ),
                    i.default.createElement(
                      "div",
                      { className: "react-toggle-track-x" },
                      this.getIcon("unchecked")
                    )
                  ),
                  i.default.createElement("div", {
                    className: "react-toggle-thumb"
                  }),
                  i.default.createElement(
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
      })(l.PureComponent);
      (t.default = h),
        (h.displayName = "Toggle"),
        (h.defaultProps = {
          icons: {
            checked: i.default.createElement(c.default, null),
            unchecked: i.default.createElement(u.default, null)
          }
        }),
        (h.propTypes = {
          checked: s.default.bool,
          disabled: s.default.bool,
          defaultChecked: s.default.bool,
          onChange: s.default.func,
          onFocus: s.default.func,
          onBlur: s.default.func,
          className: s.default.string,
          name: s.default.string,
          value: s.default.string,
          id: s.default.string,
          "aria-labelledby": s.default.string,
          "aria-label": s.default.string,
          icons: s.default.oneOfType([
            s.default.bool,
            s.default.shape({
              checked: s.default.node,
              unchecked: s.default.node
            })
          ])
        });
    },
    704: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        r = a(0),
        l = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
        return l.default.createElement(
          "svg",
          { width: "14", height: "11", viewBox: "0 0 14 11" },
          l.default.createElement("title", null, "switch-check"),
          l.default.createElement("path", {
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
        l = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
        return l.default.createElement(
          "svg",
          { width: "10", height: "10", viewBox: "0 0 10 10" },
          l.default.createElement("title", null, "switch-x"),
          l.default.createElement("path", {
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
    710: function(e, t, a) {
      var n;
      /*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/ !(function() {
        "use strict";
        var a = {}.hasOwnProperty;
        function r() {
          for (var e = [], t = 0; t < arguments.length; t++) {
            var n = arguments[t];
            if (n) {
              var l = typeof n;
              if ("string" === l || "number" === l) e.push(n);
              else if (Array.isArray(n) && n.length) {
                var i = r.apply(null, n);
                i && e.push(i);
              } else if ("object" === l)
                for (var o in n) a.call(n, o) && n[o] && e.push(o);
            }
          }
          return e.join(" ");
        }
        e.exports
          ? ((r.default = r), (e.exports = r))
          : void 0 ===
              (n = function() {
                return r;
              }.apply(t, [])) || (e.exports = n);
      })();
    },
    745: function(e, t, a) {
      "use strict";
      a.d(t, "c", function() {
        return n;
      }),
        a.d(t, "f", function() {
          return r;
        }),
        a.d(t, "e", function() {
          return l;
        }),
        a.d(t, "b", function() {
          return i;
        }),
        a.d(t, "d", function() {
          return o;
        }),
        a.d(t, "a", function() {
          return s;
        });
      var n = function(e) {
          return { type: "FETCH_MAILBOX_DETAILS", id: e };
        },
        r = function(e) {
          return { type: "UPDATE_MAILBOX_DETAILS", mailbox: e };
        },
        l = function(e) {
          return { type: "NEW_MAILBOX_USER", mailboxUser: e };
        },
        i = function(e, t) {
          return { type: "DELETE_MAILBOX_USER", mailboxId: e, userId: t };
        },
        o = function(e) {
          return { type: "NEW_MAILBOX_IGNORE", ignore: e };
        },
        s = function(e) {
          return { type: "DELETE_MAILBOX_IGNORE", ignoreId: e };
        };
    }
  }
]);
