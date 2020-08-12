(window.webpackJsonp = window.webpackJsonp || []).push([
  [95],
  {
    1505: function(e, a, t) {
      "use strict";
      t.r(a);
      var n = t(0),
        r = t.n(n),
        s = t(24),
        o = t.n(s),
        l = t(25),
        i = t.n(l),
        c = t(22),
        m = t.n(c),
        u = t(26),
        p = t.n(u),
        d = t(27),
        f = t.n(d),
        g = t(16),
        h = t.n(g),
        b = t(6),
        N = t.n(b),
        v = t(32),
        E = t(4),
        y = t(697),
        C = t.n(y),
        O = t(191),
        A = t(694),
        k = t(696),
        x = t(692),
        w = t(702),
        P = t(202),
        q = t(201);
      function T(e, a) {
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
      function S(e) {
        for (var a = 1; a < arguments.length; a++) {
          var t = null != arguments[a] ? arguments[a] : {};
          a % 2
            ? T(Object(t), !0).forEach(function(a) {
                N()(e, a, t[a]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : T(Object(t)).forEach(function(a) {
                Object.defineProperty(
                  e,
                  a,
                  Object.getOwnPropertyDescriptor(t, a)
                );
              });
        }
        return e;
      }
      function M(e) {
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
            n = h()(e);
          if (a) {
            var r = h()(this).constructor;
            t = Reflect.construct(n, arguments, r);
          } else t = n.apply(this, arguments);
          return f()(this, t);
        };
      }
      var j = (function(e) {
          p()(t, e);
          var a = M(t);
          function t(e) {
            var n;
            return (
              o()(this, t),
              (n = a.call(this, e)),
              N()(m()(n), "handleInputChange", function(e) {
                var a = e.target,
                  t = "checkbox" === a.type ? a.checked : a.value,
                  r = a.name;
                n.setState(
                  S(
                    S({}, n.state),
                    {},
                    { user: S(S({}, n.state.user), {}, N()({}, r, t)) }
                  )
                );
              }),
              N()(m()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var a = n.state.user,
                  t = {},
                  r = !1;
                C.a.isEmail(a.email) || ((t.email = !0), (r = !0)),
                  C.a.isEmpty(a.firstName) && ((t.firstName = !0), (r = !0)),
                  C.a.isEmpty(a.lastName) && ((t.lastName = !0), (r = !0)),
                  n.setState(S(S({}, n.state), {}, { errors: t })),
                  !r &&
                    O.a
                      .newUser(a)
                      .then(function(e) {
                        n.props.fetchSystemData(),
                          e.data.data.hasAlfrescoAccount &&
                            n.props.setError(
                              200,
                              "Alfresco account voor deze gebruiker bestaat al. Er wordt alleen een nieuw account aangemaakt voor Econobis"
                            ),
                          E.f.push("/gebruiker/".concat(e.data.data.id));
                      })
                      .catch(
                        function(e) {
                          e.response.data.errors &&
                          void 0 !== e.response.data.errors.email
                            ? ((t.email = !0),
                              this.setState(
                                S(S({}, this.state), {}, { errors: t })
                              ),
                              this.setState(
                                S(
                                  S({}, this.state),
                                  {},
                                  {
                                    backendEmailError:
                                      "Dit email adres is al in gebruik."
                                  }
                                )
                              ))
                            : void 0 !== e.response.data.message
                            ? this.props.setError(
                                e.response.status,
                                e.response.data.message
                              )
                            : this.props.setError(e.response.status, null);
                        }.bind(m()(n))
                      );
              }),
              (n.state = {
                user: {
                  id: "",
                  email: "",
                  titleId: "",
                  firstName: "",
                  lastNamePrefixId: "",
                  lastName: "",
                  phoneNumber: "",
                  mobileNumber: "",
                  occupation: ""
                },
                errors: { email: !1, firstName: !1, lastName: !1 }
              }),
              n
            );
          }
          return (
            i()(t, [
              {
                key: "render",
                value: function() {
                  var e = this.state.user,
                    a = e.email,
                    t = e.titleId,
                    n = e.firstName,
                    s = e.lastNamePrefixId,
                    o = e.lastName,
                    l = e.phoneNumber,
                    i = e.mobileNumber,
                    c = e.occupation;
                  return r.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(k.a, {
                        label: "Aanspreektitel",
                        name: "titleId",
                        options: this.props.titles,
                        value: t,
                        onChangeAction: this.handleInputChange
                      }),
                      r.a.createElement(A.a, {
                        label: "E-mail",
                        name: "email",
                        value: a,
                        onChangeAction: this.handleInputChange,
                        required: "required",
                        error: this.state.errors.email,
                        errorMessage: this.state.backendEmailError
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(A.a, {
                        label: "Voornaam",
                        name: "firstName",
                        value: n,
                        onChangeAction: this.handleInputChange,
                        required: "required",
                        error: this.state.errors.firstName
                      }),
                      r.a.createElement(A.a, {
                        label: "Telefoonnummer",
                        size: "col-sm-6",
                        name: "phoneNumber",
                        value: l,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(k.a, {
                        label: "Tussenvoegsel",
                        name: "lastNamePrefixId",
                        options: this.props.lastNamePrefixes,
                        value: s,
                        onChangeAction: this.handleInputChange
                      }),
                      r.a.createElement(A.a, {
                        label: "Mobiel nummer",
                        size: "col-sm-6",
                        name: "mobileNumber",
                        value: i,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(A.a, {
                        label: "Achternaam",
                        size: "col-sm-6",
                        name: "lastName",
                        value: o,
                        onChangeAction: this.handleInputChange,
                        required: "required",
                        error: this.state.errors.lastName
                      }),
                      r.a.createElement(A.a, {
                        label: "Functie",
                        size: "col-sm-6",
                        name: "occupation",
                        value: c,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    r.a.createElement(
                      w.a,
                      null,
                      r.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        r.a.createElement(x.a, {
                          buttonText: "Opslaan",
                          onClickAction: this.handleSubmit,
                          type: "submit",
                          value: "Submit"
                        })
                      )
                    )
                  );
                }
              }
            ]),
            t
          );
        })(n.Component),
        z = Object(v.b)(
          function(e) {
            return {
              lastNamePrefixes: e.systemData.lastNamePrefixes,
              titles: e.systemData.titles
            };
          },
          function(e) {
            return {
              setError: function(a, t) {
                e(Object(P.b)(a, t));
              },
              fetchSystemData: function() {
                e(Object(q.a)());
              }
            };
          }
        )(j),
        I = t(693),
        D = function() {
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
                r.a.createElement(I.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: E.e.goBack
                })
              )
            ),
            r.a.createElement(
              "div",
              { className: "col-md-4" },
              r.a.createElement(
                "h4",
                { className: "text-center margin-small" },
                "Nieuwe gebruiker"
              )
            ),
            r.a.createElement("div", { className: "col-md-4" })
          );
        },
        R = t(690),
        B = t(691);
      a.default = function() {
        return r.a.createElement(
          "div",
          { className: "row" },
          r.a.createElement(
            "div",
            { className: "col-md-9" },
            r.a.createElement(
              "div",
              { className: "col-md-12  margin-10-top" },
              r.a.createElement(
                R.a,
                null,
                r.a.createElement(
                  B.a,
                  { className: "panel-small" },
                  r.a.createElement(D, null)
                )
              )
            ),
            r.a.createElement(
              "div",
              { className: "col-md-12  margin-10-top" },
              r.a.createElement(
                R.a,
                null,
                r.a.createElement(B.a, null, r.a.createElement(z, null))
              )
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
        s = t(8),
        o = t.n(s),
        l = function(e) {
          var a = e.children,
            t = e.className,
            n = e.onMouseEnter,
            s = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(t),
              onMouseEnter: n,
              onMouseLeave: s
            },
            a
          );
        };
      (l.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (l.propTypes = {
          className: o.a.string,
          onMouseEnter: o.a.func,
          onMouseLeave: o.a.func
        }),
        (a.a = l);
    },
    691: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        s = t(8),
        o = t.n(s),
        l = function(e) {
          var a = e.className,
            t = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(a) },
            t
          );
        };
      (l.defaultProps = { className: "" }),
        (l.propTypes = { className: o.a.string }),
        (a.a = l);
    },
    692: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        s = t(8),
        o = t.n(s),
        l = function(e) {
          var a = e.buttonClassName,
            t = e.buttonText,
            n = e.onClickAction,
            s = e.type,
            o = e.value,
            l = e.loading,
            i = e.loadText,
            c = e.disabled;
          return l
            ? r.a.createElement(
                "button",
                {
                  type: s,
                  className: "btn btn-sm btn-loading ".concat(a),
                  value: o,
                  disabled: l
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
                  type: s,
                  className: "btn btn-sm ".concat(a),
                  onClick: n,
                  value: o,
                  disabled: c
                },
                t
              );
        };
      (l.defaultProps = {
        buttonClassName: "btn-success",
        type: "button",
        value: "",
        loading: !1,
        loadText: "Aan het laden",
        disabled: !1
      }),
        (l.propTypes = {
          buttonClassName: o.a.string,
          buttonText: o.a.string.isRequired,
          onClickAction: o.a.func,
          type: o.a.string,
          value: o.a.string,
          loading: o.a.bool,
          loadText: o.a.string,
          disabled: o.a.bool
        }),
        (a.a = l);
    },
    693: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        s = t(8),
        o = t.n(s),
        l = function(e) {
          var a = e.buttonClassName,
            t = e.iconName,
            n = e.onClickAction,
            s = e.title,
            o = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(a),
              onClick: n,
              disabled: o,
              title: s
            },
            r.a.createElement("span", { className: "glyphicon ".concat(t) })
          );
        };
      (l.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (l.propTypes = {
          buttonClassName: o.a.string,
          iconName: o.a.string.isRequired,
          onClickAction: o.a.func,
          title: o.a.string,
          disabled: o.a.bool
        }),
        (a.a = l);
    },
    694: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        s = t(8),
        o = t.n(s),
        l = function(e) {
          var a = e.label,
            t = e.type,
            n = e.className,
            s = e.size,
            o = e.id,
            l = e.placeholder,
            i = e.name,
            c = e.value,
            m = e.onClickAction,
            u = e.onChangeAction,
            p = e.onBlurAction,
            d = e.required,
            f = e.readOnly,
            g = e.maxLength,
            h = e.error,
            b = e.min,
            N = e.max,
            v = e.step,
            E = e.errorMessage,
            y = e.divSize,
            C = e.divClassName,
            O = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(y, " ").concat(C) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(d) },
              a
            ),
            r.a.createElement(
              "div",
              { className: "".concat(s) },
              r.a.createElement("input", {
                type: t,
                className:
                  "form-control input-sm ".concat(n) + (h ? "has-error" : ""),
                id: o,
                placeholder: l,
                name: i,
                value: c,
                onClick: m,
                onChange: u,
                onBlur: p,
                readOnly: f,
                maxLength: g,
                min: b,
                max: N,
                autoComplete: O,
                step: v
              })
            ),
            h &&
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
      (l.defaultProps = {
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
        (l.propTypes = {
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
        (a.a = l);
    },
    696: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        s = t(8),
        o = t.n(s),
        l = function(e) {
          var a = e.label,
            t = e.className,
            n = e.size,
            s = e.id,
            o = e.name,
            l = e.value,
            i = e.options,
            c = e.onChangeAction,
            m = e.onBlurAction,
            u = e.required,
            p = e.error,
            d = e.errorMessage,
            f = e.optionValue,
            g = e.optionName,
            h = e.readOnly,
            b = e.placeholder,
            N = e.divClassName,
            v = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(N) },
            r.a.createElement(
              "label",
              { htmlFor: s, className: "col-sm-6 ".concat(u) },
              a
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-6" },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(t) + (p && " has-error"),
                  id: s,
                  name: o,
                  value: l,
                  onChange: c,
                  onBlur: m,
                  readOnly: h
                },
                v && r.a.createElement("option", { value: "" }, b),
                i.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[f], value: e[f] },
                    e[g]
                  );
                })
              )
            ),
            p &&
              r.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                r.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  d
                )
              )
          );
        };
      (l.defaultProps = {
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
        (l.propTypes = {
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
        (a.a = l);
    },
    702: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        s = t(8),
        o = t.n(s),
        l = function(e) {
          var a = e.className,
            t = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-footer ".concat(a) },
            t
          );
        };
      (l.defaultProps = { className: "" }),
        (l.propTypes = { className: o.a.string }),
        (a.a = l);
    }
  }
]);
