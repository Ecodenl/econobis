(window.webpackJsonp = window.webpackJsonp || []).push([
  [102],
  {
    1502: function(e, a, t) {
      "use strict";
      t.r(a);
      var n = t(0),
        r = t.n(n),
        s = t(6),
        l = t.n(s),
        o = t(24),
        i = t.n(o),
        c = t(25),
        u = t.n(c),
        m = t(22),
        d = t.n(m),
        p = t(26),
        g = t.n(p),
        f = t(27),
        h = t.n(f),
        b = t(16),
        v = t.n(b),
        y = t(32),
        N = t(14),
        E = t(4),
        C = t(697),
        O = t.n(C),
        k = t(7),
        D = t.n(k),
        x = t(694),
        A = t(692),
        w = t(691),
        S = t(690),
        P = t(195),
        j = t(201);
      function M(e, a) {
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
      function T(e) {
        for (var a = 1; a < arguments.length; a++) {
          var t = null != arguments[a] ? arguments[a] : {};
          a % 2
            ? M(Object(t), !0).forEach(function(a) {
                l()(e, a, t[a]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : M(Object(t)).forEach(function(a) {
                Object.defineProperty(
                  e,
                  a,
                  Object.getOwnPropertyDescriptor(t, a)
                );
              });
        }
        return e;
      }
      function q(e) {
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
            n = v()(e);
          if (a) {
            var r = v()(this).constructor;
            t = Reflect.construct(n, arguments, r);
          } else t = n.apply(this, arguments);
          return h()(this, t);
        };
      }
      D.a.locale("nl");
      var R = (function(e) {
          g()(t, e);
          var a = q(t);
          function t(e) {
            var n;
            return (
              i()(this, t),
              ((n = a.call(this, e)).state = {
                mailgunDomain: { id: "", domain: "", secret: "" },
                errors: { name: !1, maxRequestsPerMinute: !1, responsible: !1 }
              }),
              (n.handleInputChange = n.handleInputChange.bind(d()(n))),
              (n.handleInputChangeDate = n.handleInputChangeDate.bind(d()(n))),
              (n.handleSubmit = n.handleSubmit.bind(d()(n))),
              n
            );
          }
          return (
            u()(t, [
              {
                key: "handleInputChange",
                value: function(e) {
                  var a = e.target,
                    t = "checkbox" === a.type ? a.checked : a.value,
                    n = a.name;
                  this.setState(
                    T(
                      T({}, this.state),
                      {},
                      {
                        mailgunDomain: T(
                          T({}, this.state.mailgunDomain),
                          {},
                          l()({}, n, t)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "handleInputChangeDate",
                value: function(e, a) {
                  this.setState(
                    T(
                      T({}, this.state),
                      {},
                      {
                        mailgunDomain: T(
                          T({}, this.state.mailgunDomain),
                          {},
                          l()({}, a, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "handleSubmit",
                value: function(e) {
                  var a = this;
                  e.preventDefault();
                  var t = this.state.mailgunDomain,
                    n = {},
                    r = !1;
                  O.a.isEmpty(t.domain) && ((n.domain = !0), (r = !0)),
                    O.a.isEmpty(t.secret) && ((n.secret = !0), (r = !0)),
                    this.setState(T(T({}, this.state), {}, { errors: n })),
                    !r &&
                      P.a
                        .newMailgunDomain(t)
                        .then(function(e) {
                          a.props.fetchSystemData(),
                            E.f.push("/mailgun-domein/".concat(e.data.data.id));
                        })
                        .catch(function(e) {
                          alert("Er is iets mis gegaan met opslaan!");
                        });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.mailgunDomain,
                    a = e.domain,
                    t = e.secret;
                  e.isVerified;
                  return r.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    r.a.createElement(
                      S.a,
                      null,
                      r.a.createElement(
                        w.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(x.a, {
                            label: "Domein",
                            name: "domain",
                            value: a,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.domain
                          }),
                          r.a.createElement(x.a, {
                            label: "Mailgun API Key",
                            name: "secret",
                            value: t,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.secret
                          })
                        )
                      ),
                      r.a.createElement(
                        w.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          r.a.createElement(A.a, {
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
            t
          );
        })(n.Component),
        I = Object(y.b)(null, function(e) {
          return Object(N.b)({ fetchSystemData: j.a }, e);
        })(R),
        L = t(693),
        z = function() {
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
                r.a.createElement(L.a, {
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
                "Nieuw mailgun domein"
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
                S.a,
                null,
                r.a.createElement(
                  w.a,
                  { className: "panel-small" },
                  r.a.createElement(z, null)
                )
              )
            ),
            r.a.createElement(
              "div",
              { className: "col-md-12 margin-10-top" },
              r.a.createElement(I, null)
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
        l = t.n(s),
        o = function(e) {
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
      (o.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (o.propTypes = {
          className: l.a.string,
          onMouseEnter: l.a.func,
          onMouseLeave: l.a.func
        }),
        (a.a = o);
    },
    691: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        s = t(8),
        l = t.n(s),
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
        (o.propTypes = { className: l.a.string }),
        (a.a = o);
    },
    692: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        s = t(8),
        l = t.n(s),
        o = function(e) {
          var a = e.buttonClassName,
            t = e.buttonText,
            n = e.onClickAction,
            s = e.type,
            l = e.value,
            o = e.loading,
            i = e.loadText,
            c = e.disabled;
          return o
            ? r.a.createElement(
                "button",
                {
                  type: s,
                  className: "btn btn-sm btn-loading ".concat(a),
                  value: l,
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
                  type: s,
                  className: "btn btn-sm ".concat(a),
                  onClick: n,
                  value: l,
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
          buttonClassName: l.a.string,
          buttonText: l.a.string.isRequired,
          onClickAction: l.a.func,
          type: l.a.string,
          value: l.a.string,
          loading: l.a.bool,
          loadText: l.a.string,
          disabled: l.a.bool
        }),
        (a.a = o);
    },
    693: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        s = t(8),
        l = t.n(s),
        o = function(e) {
          var a = e.buttonClassName,
            t = e.iconName,
            n = e.onClickAction,
            s = e.title,
            l = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(a),
              onClick: n,
              disabled: l,
              title: s
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
          buttonClassName: l.a.string,
          iconName: l.a.string.isRequired,
          onClickAction: l.a.func,
          title: l.a.string,
          disabled: l.a.bool
        }),
        (a.a = o);
    },
    694: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        s = t(8),
        l = t.n(s),
        o = function(e) {
          var a = e.label,
            t = e.type,
            n = e.className,
            s = e.size,
            l = e.id,
            o = e.placeholder,
            i = e.name,
            c = e.value,
            u = e.onClickAction,
            m = e.onChangeAction,
            d = e.onBlurAction,
            p = e.required,
            g = e.readOnly,
            f = e.maxLength,
            h = e.error,
            b = e.min,
            v = e.max,
            y = e.step,
            N = e.errorMessage,
            E = e.divSize,
            C = e.divClassName,
            O = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(E, " ").concat(C) },
            r.a.createElement(
              "label",
              { htmlFor: l, className: "col-sm-6 ".concat(p) },
              a
            ),
            r.a.createElement(
              "div",
              { className: "".concat(s) },
              r.a.createElement("input", {
                type: t,
                className:
                  "form-control input-sm ".concat(n) + (h ? "has-error" : ""),
                id: l,
                placeholder: o,
                name: i,
                value: c,
                onClick: u,
                onChange: m,
                onBlur: d,
                readOnly: g,
                maxLength: f,
                min: b,
                max: v,
                autoComplete: O,
                step: y
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
                  N
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
          label: l.a.oneOfType([l.a.string, l.a.object]).isRequired,
          type: l.a.string,
          className: l.a.string,
          divClassName: l.a.string,
          size: l.a.string,
          divSize: l.a.string,
          id: l.a.string,
          placeholder: l.a.string,
          name: l.a.string.isRequired,
          value: l.a.oneOfType([l.a.string, l.a.number]),
          onClickAction: l.a.func,
          onChangeAction: l.a.func,
          onBlurAction: l.a.func,
          required: l.a.string,
          readOnly: l.a.bool,
          maxLength: l.a.string,
          error: l.a.bool,
          min: l.a.string,
          max: l.a.string,
          step: l.a.string,
          errorMessage: l.a.string,
          autoComplete: l.a.string
        }),
        (a.a = o);
    }
  }
]);
