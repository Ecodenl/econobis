(window.webpackJsonp = window.webpackJsonp || []).push([
  [49],
  {
    1522: function(e, a, t) {
      "use strict";
      t.r(a);
      var n = t(0),
        r = t.n(n),
        l = t(24),
        s = t.n(l),
        o = t(25),
        i = t.n(o),
        c = t(22),
        u = t.n(c),
        m = t(26),
        d = t.n(m),
        p = t(27),
        h = t.n(p),
        f = t(16),
        g = t.n(f),
        v = t(6),
        b = t.n(v),
        y = t(32),
        E = t(14),
        N = t(4),
        C = t(697),
        k = t.n(C),
        x = t(694),
        O = t(696),
        w = t(700),
        P = t(692),
        A = t(691),
        S = t(698),
        T = t(690),
        I = t(65),
        M = t(201);
      function q(e, a) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          a &&
            (n = n.filter(function(a) {
              return Object.getOwnPropertyDescriptor(e, a).enumerable;
            })),
            t.push.apply(t, n);
        }
        return t;
      }
      function j(e) {
        for (var a = 1; a < arguments.length; a++) {
          var t = null != arguments[a] ? arguments[a] : {};
          a % 2
            ? q(Object(t), !0).forEach(function(a) {
                b()(e, a, t[a]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : q(Object(t)).forEach(function(a) {
                Object.defineProperty(
                  e,
                  a,
                  Object.getOwnPropertyDescriptor(t, a)
                );
              });
        }
        return e;
      }
      function D(e) {
        var a = (function() {
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
          var t,
            n = g()(e);
          if (a) {
            var r = g()(this).constructor;
            t = Reflect.construct(n, arguments, r);
          } else t = n.apply(this, arguments);
          return h()(this, t);
        };
      }
      var _ = (function(e) {
          d()(t, e);
          var a = D(t);
          function t(e) {
            var n;
            return (
              s()(this, t),
              (n = a.call(this, e)),
              b()(u()(n), "handleInputChange", function(e) {
                var a = e.target,
                  t = "checkbox" === a.type ? a.checked : a.value,
                  r = a.name;
                n.setState(
                  j(
                    j({}, n.state),
                    {},
                    { mailbox: j(j({}, n.state.mailbox), {}, b()({}, r, t)) }
                  )
                );
              }),
              b()(u()(n), "handleInputUsesMailgun", function(e) {
                var a = e.target.checked;
                n.setState(
                  j(
                    j({}, n.state),
                    {},
                    {
                      mailbox: j(
                        j({}, n.state.mailbox),
                        {},
                        {
                          usesMailgun: a,
                          outgoingServerType: a ? "mailgun" : "smtp"
                        }
                      )
                    }
                  )
                );
              }),
              b()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var a = n.state.mailbox,
                  t = {},
                  r = !1;
                k.a.isEmpty(a.name) && ((t.name = !0), (r = !0)),
                  k.a.isEmail(a.email) || ((t.email = !0), (r = !0)),
                  k.a.isEmpty(a.username) && ((t.username = !0), (r = !0)),
                  k.a.isEmpty(a.password) && ((t.password = !0), (r = !0)),
                  a.usesMailgun
                    ? k.a.isEmpty(a.mailgunDomainId.toString()) &&
                      ((t.mailgunDomainId = !0), (r = !0))
                    : (k.a.isEmpty(a.smtpHost) && ((t.smtpHost = !0), (r = !0)),
                      k.a.isEmpty(a.smtpPort) && ((t.smtpPort = !0), (r = !0))),
                  k.a.isEmpty(a.imapHost) && ((t.imapHost = !0), (r = !0)),
                  k.a.isEmpty(a.imapPort) && ((t.imapPort = !0), (r = !0)),
                  n.setState(j(j({}, n.state), {}, { errors: t })),
                  !r &&
                    n.setState(
                      function(e) {
                        return { loading: !e.loading };
                      },
                      function() {
                        I.a
                          .newMailbox(a)
                          .then(function(e) {
                            n.props.fetchSystemData(),
                              N.f.push("/mailbox/".concat(e.data.data.id));
                          })
                          .catch(function(e) {
                            console.log(e),
                              alert(
                                "Er is iets misgegaan bij het opslaan. Herlaad de pagina."
                              );
                          });
                      }
                    );
              }),
              (n.state = {
                mailbox: {
                  id: "",
                  name: "",
                  email: "",
                  username: "",
                  password: "",
                  smtpHost: "",
                  smtpPort: "",
                  smtpEncryption: "",
                  imapHost: "",
                  imapPort: "",
                  imapEncryption: "",
                  imapInboxPrefix: "",
                  usesMailgun: !1,
                  outgoingServerType: "smtp",
                  mailgunDomainId: "",
                  primary: !1,
                  isActive: !0,
                  linkContactFromEmailToAddress: !1
                },
                errors: {
                  name: !1,
                  email: !1,
                  username: !1,
                  password: !1,
                  smtpHost: !1,
                  smtpPort: !1,
                  imapHost: !1,
                  imapPort: !1,
                  mailgunDomainId: !1
                },
                loading: !1
              }),
              n
            );
          }
          return (
            i()(t, [
              {
                key: "render",
                value: function() {
                  var e = this.state.mailbox,
                    a = e.name,
                    t = e.email,
                    n = e.smtpHost,
                    l = e.smtpPort,
                    s = e.smtpEncryption,
                    o = e.imapHost,
                    i = e.imapPort,
                    c = e.imapEncryption,
                    u = e.imapInboxPrefix,
                    m = e.username,
                    d = e.password,
                    p = e.usesMailgun,
                    h = e.mailgunDomainId,
                    f = e.primary,
                    g = e.isActive,
                    v = e.linkContactFromEmailToAddress;
                  return r.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    r.a.createElement(
                      T.a,
                      null,
                      r.a.createElement(
                        A.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(x.a, {
                            label: "WeergaveNaam",
                            name: "name",
                            value: a,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.name
                          }),
                          r.a.createElement(x.a, {
                            label: "E-mail",
                            name: "email",
                            value: t,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.email
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(x.a, {
                            label: "Gebruikersnaam",
                            name: "username",
                            value: m,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.username
                          }),
                          r.a.createElement(x.a, {
                            label: "Wachtwoord",
                            name: "password",
                            value: d,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.password
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(w.a, {
                            label: "Actief",
                            name: "isActive",
                            value: g,
                            onChangeAction: this.handleInputChange,
                            disabled: f
                          }),
                          r.a.createElement(w.a, {
                            label: "Primair (verzend wachtwoord mails)",
                            name: "primary",
                            value: f,
                            onChangeAction: this.handleInputChange,
                            disabled: !g
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(w.a, {
                            label: r.a.createElement(
                              "span",
                              null,
                              "Koppel contact op email ",
                              r.a.createElement("u", null, "aan"),
                              " adres",
                              r.a.createElement("br", null),
                              r.a.createElement(
                                "small",
                                {
                                  style: { color: "#ccc", fontWeight: "normal" }
                                },
                                "Koppeling contact standaard op email ",
                                r.a.createElement("u", null, "afzender"),
                                " adres"
                              )
                            ),
                            name: "linkContactFromEmailToAddress",
                            value: v,
                            onChangeAction: this.handleInputChange
                          })
                        )
                      ),
                      r.a.createElement(
                        S.a,
                        null,
                        r.a.createElement(
                          "span",
                          { className: "h5" },
                          "Servergegevens"
                        )
                      ),
                      r.a.createElement(
                        A.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(x.a, {
                            label: "Inkomend",
                            name: "imapHost",
                            value: o,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.imapHost
                          }),
                          r.a.createElement(w.a, {
                            label: "Gebruikt mailgun",
                            name: "usesMailgun",
                            value: p,
                            onChangeAction: this.handleInputUsesMailgun
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement("div", {
                            className: "form-group col-md-6"
                          }),
                          p
                            ? r.a.createElement(O.a, {
                                label: "Uitgaand",
                                name: "mailgunDomainId",
                                value: h,
                                options: this.props.mailgunDomain,
                                optionName: "domain",
                                onChangeAction: this.handleInputChange,
                                error: this.state.errors.mailgunDomainId
                              })
                            : r.a.createElement(x.a, {
                                label: "Uitgaand",
                                name: "smtpHost",
                                value: n,
                                onChangeAction: this.handleInputChange,
                                required: "required",
                                error: this.state.errors.smtpHost
                              })
                        )
                      ),
                      r.a.createElement(
                        S.a,
                        null,
                        r.a.createElement(
                          "span",
                          { className: "h5" },
                          "Extra instellingen"
                        )
                      ),
                      r.a.createElement(
                        A.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(x.a, {
                            label: "Imap poort",
                            name: "imapPort",
                            value: i,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.imapPort
                          }),
                          !p &&
                            r.a.createElement(x.a, {
                              label: "Smtp poort",
                              name: "smtpPort",
                              value: l,
                              onChangeAction: this.handleInputChange,
                              required: "required",
                              error: this.state.errors.smtpPort
                            })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(O.a, {
                            label: "Imap versleutelde verbinding",
                            name: "imapEncryption",
                            value: c,
                            options: [
                              { id: "ssl", name: "SSL" },
                              { id: "tls", name: "TLS" }
                            ],
                            onChangeAction: this.handleInputChange
                          }),
                          !p &&
                            r.a.createElement(O.a, {
                              label: "Smtp versleutelde verbinding",
                              name: "smtpEncryption",
                              value: s,
                              options: [
                                { id: "ssl", name: "SSL" },
                                { id: "tls", name: "TLS" }
                              ],
                              onChangeAction: this.handleInputChange
                            })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(x.a, {
                            label: "Inbox prefix",
                            name: "imapInboxPrefix",
                            value: u,
                            onChangeAction: this.handleInputChange,
                            error: this.state.errors.imapInboxPrefix
                          })
                        )
                      ),
                      r.a.createElement(
                        A.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          r.a.createElement(P.a, {
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
            t
          );
        })(n.Component),
        z = Object(y.b)(
          function(e) {
            return { mailgunDomain: e.systemData.mailgunDomain };
          },
          function(e) {
            return Object(E.b)({ fetchSystemData: M.a }, e);
          }
        )(_),
        B = t(693),
        F = function() {
          return r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(
              "div",
              { className: "col-md-4" },
              r.a.createElement(
                "div",
                {
                  className: "btn-group btn-group-flex margin-small",
                  role: "group"
                },
                r.a.createElement(B.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: N.e.goBack
                })
              )
            ),
            r.a.createElement(
              "div",
              { className: "col-md-4" },
              r.a.createElement(
                "h4",
                { className: "text-center margin-small" },
                "Nieuw mailbox"
              )
            ),
            r.a.createElement("div", { className: "col-md-4" })
          );
        };
      a.default = function() {
        return r.a.createElement(
          "div",
          { className: "row" },
          r.a.createElement(
            "div",
            { className: "col-md-9" },
            r.a.createElement(
              "div",
              { className: "col-md-12 margin-10-top" },
              r.a.createElement(
                T.a,
                null,
                r.a.createElement(
                  A.a,
                  { className: "panel-small" },
                  r.a.createElement(F, null)
                )
              )
            ),
            r.a.createElement(
              "div",
              { className: "col-md-12 margin-10-top" },
              r.a.createElement(z, null)
            )
          ),
          r.a.createElement("div", { className: "col-md-3" })
        );
      };
    },
    690: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        s = t.n(l),
        o = function(e) {
          var a = e.children,
            t = e.className,
            n = e.onMouseEnter,
            l = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(t),
              onMouseEnter: n,
              onMouseLeave: l
            },
            a
          );
        };
      (o.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (o.propTypes = {
          className: s.a.string,
          onMouseEnter: s.a.func,
          onMouseLeave: s.a.func
        }),
        (a.a = o);
    },
    691: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        s = t.n(l),
        o = function(e) {
          var a = e.className,
            t = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(a) },
            t
          );
        };
      (o.defaultProps = { className: "" }),
        (o.propTypes = { className: s.a.string }),
        (a.a = o);
    },
    692: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        s = t.n(l),
        o = function(e) {
          var a = e.buttonClassName,
            t = e.buttonText,
            n = e.onClickAction,
            l = e.type,
            s = e.value,
            o = e.loading,
            i = e.loadText,
            c = e.disabled;
          return o
            ? r.a.createElement(
                "button",
                {
                  type: l,
                  className: "btn btn-sm btn-loading ".concat(a),
                  value: s,
                  disabled: o
                },
                r.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                i
              )
            : r.a.createElement(
                "button",
                {
                  type: l,
                  className: "btn btn-sm ".concat(a),
                  onClick: n,
                  value: s,
                  disabled: c
                },
                t
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
          buttonClassName: s.a.string,
          buttonText: s.a.string.isRequired,
          onClickAction: s.a.func,
          type: s.a.string,
          value: s.a.string,
          loading: s.a.bool,
          loadText: s.a.string,
          disabled: s.a.bool
        }),
        (a.a = o);
    },
    693: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        s = t.n(l),
        o = function(e) {
          var a = e.buttonClassName,
            t = e.iconName,
            n = e.onClickAction,
            l = e.title,
            s = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(a),
              onClick: n,
              disabled: s,
              title: l
            },
            r.a.createElement("span", { className: "glyphicon ".concat(t) })
          );
        };
      (o.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (o.propTypes = {
          buttonClassName: s.a.string,
          iconName: s.a.string.isRequired,
          onClickAction: s.a.func,
          title: s.a.string,
          disabled: s.a.bool
        }),
        (a.a = o);
    },
    694: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        s = t.n(l),
        o = function(e) {
          var a = e.label,
            t = e.type,
            n = e.className,
            l = e.size,
            s = e.id,
            o = e.placeholder,
            i = e.name,
            c = e.value,
            u = e.onClickAction,
            m = e.onChangeAction,
            d = e.onBlurAction,
            p = e.required,
            h = e.readOnly,
            f = e.maxLength,
            g = e.error,
            v = e.min,
            b = e.max,
            y = e.step,
            E = e.errorMessage,
            N = e.divSize,
            C = e.divClassName,
            k = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(N, " ").concat(C) },
            r.a.createElement(
              "label",
              { htmlFor: s, className: "col-sm-6 ".concat(p) },
              a
            ),
            r.a.createElement(
              "div",
              { className: "".concat(l) },
              r.a.createElement("input", {
                type: t,
                className:
                  "form-control input-sm ".concat(n) + (g ? "has-error" : ""),
                id: s,
                placeholder: o,
                name: i,
                value: c,
                onClick: u,
                onChange: m,
                onBlur: d,
                readOnly: h,
                maxLength: f,
                min: v,
                max: b,
                autoComplete: k,
                step: y
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
                  E
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
          label: s.a.oneOfType([s.a.string, s.a.object]).isRequired,
          type: s.a.string,
          className: s.a.string,
          divClassName: s.a.string,
          size: s.a.string,
          divSize: s.a.string,
          id: s.a.string,
          placeholder: s.a.string,
          name: s.a.string.isRequired,
          value: s.a.oneOfType([s.a.string, s.a.number]),
          onClickAction: s.a.func,
          onChangeAction: s.a.func,
          onBlurAction: s.a.func,
          required: s.a.string,
          readOnly: s.a.bool,
          maxLength: s.a.string,
          error: s.a.bool,
          min: s.a.string,
          max: s.a.string,
          step: s.a.string,
          errorMessage: s.a.string,
          autoComplete: s.a.string
        }),
        (a.a = o);
    },
    696: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        s = t.n(l),
        o = function(e) {
          var a = e.label,
            t = e.className,
            n = e.size,
            l = e.id,
            s = e.name,
            o = e.value,
            i = e.options,
            c = e.onChangeAction,
            u = e.onBlurAction,
            m = e.required,
            d = e.error,
            p = e.errorMessage,
            h = e.optionValue,
            f = e.optionName,
            g = e.readOnly,
            v = e.placeholder,
            b = e.divClassName,
            y = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(b) },
            r.a.createElement(
              "label",
              { htmlFor: l, className: "col-sm-6 ".concat(m) },
              a
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-6" },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(t) + (d && " has-error"),
                  id: l,
                  name: s,
                  value: o,
                  onChange: c,
                  onBlur: u,
                  readOnly: g
                },
                y && r.a.createElement("option", { value: "" }, v),
                i.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[h], value: e[h] },
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
                  p
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
          label: s.a.string.isRequired,
          className: s.a.string,
          size: s.a.string,
          id: s.a.string,
          name: s.a.string.isRequired,
          options: s.a.array,
          value: s.a.oneOfType([s.a.string, s.a.number]),
          onChangeAction: s.a.func,
          onBlurAction: s.a.func,
          required: s.a.string,
          readOnly: s.a.bool,
          error: s.a.bool,
          errorMessage: s.a.string,
          emptyOption: s.a.bool,
          optionValue: s.a.string,
          optionName: s.a.string,
          placeholder: s.a.string
        }),
        (a.a = o);
    },
    698: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        s = t.n(l),
        o = function(e) {
          var a = e.className,
            t = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-heading ".concat(a) },
            t
          );
        };
      (o.defaultProps = { className: "" }),
        (o.propTypes = { className: s.a.string }),
        (a.a = o);
    },
    700: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        s = t.n(l),
        o = t(703),
        i = t.n(o),
        c = function(e) {
          var a = e.label,
            t = e.size,
            n = e.id,
            l = e.name,
            s = e.value,
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
                a
              )
            ),
            r.a.createElement(
              "div",
              { className: "".concat(t) },
              r.a.createElement(i.a, {
                id: n,
                name: l,
                onChange: o,
                checked: s,
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
          label: s.a.string.isRequired,
          type: s.a.string,
          size: s.a.string,
          divSize: s.a.string,
          id: s.a.string,
          name: s.a.string.isRequired,
          value: s.a.bool,
          onChangeAction: s.a.func,
          required: s.a.string,
          disabled: s.a.bool
        }),
        (a.a = c);
    },
    703: function(e, a, t) {
      "use strict";
      Object.defineProperty(a, "__esModule", { value: !0 });
      var n =
          Object.assign ||
          function(e) {
            for (var a = 1; a < arguments.length; a++) {
              var t = arguments[a];
              for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }
            return e;
          },
        r = (function() {
          function e(e, a) {
            for (var t = 0; t < a.length; t++) {
              var n = a[t];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(a, t, n) {
            return t && e(a.prototype, t), n && e(a, n), a;
          };
        })(),
        l = t(0),
        s = d(l),
        o = d(t(710)),
        i = d(t(8)),
        c = d(t(704)),
        u = d(t(705)),
        m = t(706);
      function d(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var p = (function(e) {
        function a(e) {
          !(function(e, a) {
            if (!(e instanceof a))
              throw new TypeError("Cannot call a class as a function");
          })(this, a);
          var t = (function(e, a) {
            if (!e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return !a || ("object" != typeof a && "function" != typeof a)
              ? e
              : a;
          })(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, e));
          return (
            (t.handleClick = t.handleClick.bind(t)),
            (t.handleTouchStart = t.handleTouchStart.bind(t)),
            (t.handleTouchMove = t.handleTouchMove.bind(t)),
            (t.handleTouchEnd = t.handleTouchEnd.bind(t)),
            (t.handleFocus = t.handleFocus.bind(t)),
            (t.handleBlur = t.handleBlur.bind(t)),
            (t.previouslyChecked = !(!e.checked && !e.defaultChecked)),
            (t.state = {
              checked: !(!e.checked && !e.defaultChecked),
              hasFocus: !1
            }),
            t
          );
        }
        return (
          (function(e, a) {
            if ("function" != typeof a && null !== a)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof a
              );
            (e.prototype = Object.create(a && a.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
              a &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, a)
                  : (e.__proto__ = a));
          })(a, e),
          r(a, [
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
                var a = this.input;
                if (e.target !== a && !this.moved)
                  return (
                    (this.previouslyChecked = a.checked),
                    e.preventDefault(),
                    a.focus(),
                    void a.click()
                  );
                var t = this.props.hasOwnProperty("checked")
                  ? this.props.checked
                  : a.checked;
                this.setState({ checked: t });
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
                  var a = (0, m.pointerCoord)(e).x;
                  this.state.checked && a + 15 < this.startX
                    ? (this.setState({ checked: !1 }),
                      (this.startX = a),
                      (this.activated = !0))
                    : a - 15 > this.startX &&
                      (this.setState({ checked: !0 }),
                      (this.startX = a),
                      (this.activated = a < this.startX + 5));
                }
              }
            },
            {
              key: "handleTouchEnd",
              value: function(e) {
                if (this.moved) {
                  var a = this.input;
                  if ((e.preventDefault(), this.startX)) {
                    var t = (0, m.pointerCoord)(e).x;
                    !0 === this.previouslyChecked && this.startX + 4 > t
                      ? this.previouslyChecked !== this.state.checked &&
                        (this.setState({ checked: !1 }),
                        (this.previouslyChecked = this.state.checked),
                        a.click())
                      : this.startX - 4 < t &&
                        this.previouslyChecked !== this.state.checked &&
                        (this.setState({ checked: !0 }),
                        (this.previouslyChecked = this.state.checked),
                        a.click()),
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
                var a = this.props.onFocus;
                a && a(e), this.setState({ hasFocus: !0 });
              }
            },
            {
              key: "handleBlur",
              value: function(e) {
                var a = this.props.onBlur;
                a && a(e), this.setState({ hasFocus: !1 });
              }
            },
            {
              key: "getIcon",
              value: function(e) {
                var t = this.props.icons;
                return t
                  ? void 0 === t[e]
                    ? a.defaultProps.icons[e]
                    : t[e]
                  : null;
              }
            },
            {
              key: "render",
              value: function() {
                var e = this,
                  a = this.props,
                  t = a.className,
                  r =
                    (a.icons,
                    (function(e, a) {
                      var t = {};
                      for (var n in e)
                        a.indexOf(n) >= 0 ||
                          (Object.prototype.hasOwnProperty.call(e, n) &&
                            (t[n] = e[n]));
                      return t;
                    })(a, ["className", "icons"])),
                  l = (0, o.default)(
                    "react-toggle",
                    {
                      "react-toggle--checked": this.state.checked,
                      "react-toggle--focus": this.state.hasFocus,
                      "react-toggle--disabled": this.props.disabled
                    },
                    t
                  );
                return s.default.createElement(
                  "div",
                  {
                    className: l,
                    onClick: this.handleClick,
                    onTouchStart: this.handleTouchStart,
                    onTouchMove: this.handleTouchMove,
                    onTouchEnd: this.handleTouchEnd
                  },
                  s.default.createElement(
                    "div",
                    { className: "react-toggle-track" },
                    s.default.createElement(
                      "div",
                      { className: "react-toggle-track-check" },
                      this.getIcon("checked")
                    ),
                    s.default.createElement(
                      "div",
                      { className: "react-toggle-track-x" },
                      this.getIcon("unchecked")
                    )
                  ),
                  s.default.createElement("div", {
                    className: "react-toggle-thumb"
                  }),
                  s.default.createElement(
                    "input",
                    n({}, r, {
                      ref: function(a) {
                        e.input = a;
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
          a
        );
      })(l.PureComponent);
      (a.default = p),
        (p.displayName = "Toggle"),
        (p.defaultProps = {
          icons: {
            checked: s.default.createElement(c.default, null),
            unchecked: s.default.createElement(u.default, null)
          }
        }),
        (p.propTypes = {
          checked: i.default.bool,
          disabled: i.default.bool,
          defaultChecked: i.default.bool,
          onChange: i.default.func,
          onFocus: i.default.func,
          onBlur: i.default.func,
          className: i.default.string,
          name: i.default.string,
          value: i.default.string,
          id: i.default.string,
          "aria-labelledby": i.default.string,
          "aria-label": i.default.string,
          icons: i.default.oneOfType([
            i.default.bool,
            i.default.shape({
              checked: i.default.node,
              unchecked: i.default.node
            })
          ])
        });
    },
    704: function(e, a, t) {
      "use strict";
      Object.defineProperty(a, "__esModule", { value: !0 });
      var n,
        r = t(0),
        l = (n = r) && n.__esModule ? n : { default: n };
      a.default = function() {
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
    705: function(e, a, t) {
      "use strict";
      Object.defineProperty(a, "__esModule", { value: !0 });
      var n,
        r = t(0),
        l = (n = r) && n.__esModule ? n : { default: n };
      a.default = function() {
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
    706: function(e, a, t) {
      "use strict";
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (a.pointerCoord = function(e) {
          if (e) {
            var a = e.changedTouches;
            if (a && a.length > 0) {
              var t = a[0];
              return { x: t.clientX, y: t.clientY };
            }
            var n = e.pageX;
            if (void 0 !== n) return { x: n, y: e.pageY };
          }
          return { x: 0, y: 0 };
        });
    },
    710: function(e, a, t) {
      var n;
      /*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/ !(function() {
        "use strict";
        var t = {}.hasOwnProperty;
        function r() {
          for (var e = [], a = 0; a < arguments.length; a++) {
            var n = arguments[a];
            if (n) {
              var l = typeof n;
              if ("string" === l || "number" === l) e.push(n);
              else if (Array.isArray(n) && n.length) {
                var s = r.apply(null, n);
                s && e.push(s);
              } else if ("object" === l)
                for (var o in n) t.call(n, o) && n[o] && e.push(o);
            }
          }
          return e.join(" ");
        }
        e.exports
          ? ((r.default = r), (e.exports = r))
          : void 0 ===
              (n = function() {
                return r;
              }.apply(a, [])) || (e.exports = n);
      })();
    }
  }
]);
