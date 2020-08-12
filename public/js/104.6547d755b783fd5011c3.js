(window.webpackJsonp = window.webpackJsonp || []).push([
  [104],
  {
    1504: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(0),
        r = a.n(n),
        c = a(24),
        o = a.n(c),
        s = a(25),
        l = a.n(s),
        i = a(22),
        u = a.n(i),
        m = a(26),
        p = a.n(m),
        d = a(27),
        f = a.n(d),
        b = a(16),
        g = a.n(b),
        v = a(6),
        h = a.n(v),
        N = a(32),
        y = a(4),
        E = a(697),
        C = a.n(E),
        O = a(694),
        k = a(692),
        x = a(691),
        w = a(690),
        A = a(128),
        S = a(201);
      function j(e, t) {
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
      function P(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? j(Object(a), !0).forEach(function(t) {
                h()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : j(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
            n = g()(e);
          if (t) {
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return f()(this, a);
        };
      }
      var M = (function(e) {
          p()(a, e);
          var t = T(a);
          function a(e) {
            var n;
            return (
              o()(this, a),
              (n = t.call(this, e)),
              h()(u()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  P(
                    P({}, n.state),
                    {},
                    { team: P(P({}, n.state.team), {}, h()({}, r, a)) }
                  )
                );
              }),
              h()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.team,
                  a = {},
                  r = !1;
                C.a.isEmpty(t.name) && ((a.name = !0), (r = !0)),
                  n.setState(P(P({}, n.state), {}, { errors: a })),
                  !r &&
                    A.a
                      .newTeam(t)
                      .then(function(e) {
                        n.props.fetchSystemData(),
                          y.f.push("/team/".concat(e.data.data.id));
                      })
                      .catch(function(e) {
                        console.log(e);
                      });
              }),
              (n.state = { team: { id: "", name: "" }, errors: { name: !1 } }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.team.name;
                  return r.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    r.a.createElement(
                      w.a,
                      null,
                      r.a.createElement(
                        x.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(O.a, {
                            label: "Naam",
                            name: "name",
                            value: e,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.name
                          })
                        )
                      ),
                      r.a.createElement(
                        x.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          r.a.createElement(k.a, {
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
        })(n.Component),
        q = Object(N.b)(null, function(e) {
          return {
            fetchSystemData: function() {
              e(Object(S.a)());
            }
          };
        })(M),
        D = a(693),
        R = function() {
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
                r.a.createElement(D.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: y.e.goBack
                })
              )
            ),
            r.a.createElement(
              "div",
              { className: "col-md-4" },
              r.a.createElement(
                "h4",
                { className: "text-center margin-small" },
                "Nieuw team"
              )
            ),
            r.a.createElement("div", { className: "col-md-4" })
          );
        };
      t.default = function() {
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
                w.a,
                null,
                r.a.createElement(
                  x.a,
                  { className: "panel-small" },
                  r.a.createElement(R, null)
                )
              )
            ),
            r.a.createElement(
              "div",
              { className: "col-md-12 margin-10-top" },
              r.a.createElement(q, null)
            )
          ),
          r.a.createElement("div", { className: "col-md-3" })
        );
      };
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        c = a(8),
        o = a.n(c),
        s = function(e) {
          var t = e.children,
            a = e.className,
            n = e.onMouseEnter,
            c = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: c
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
        r = a.n(n),
        c = a(8),
        o = a.n(c),
        s = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
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
        r = a.n(n),
        c = a(8),
        o = a.n(c),
        s = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            c = e.type,
            o = e.value,
            s = e.loading,
            l = e.loadText,
            i = e.disabled;
          return s
            ? r.a.createElement(
                "button",
                {
                  type: c,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: o,
                  disabled: s
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
                  type: c,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: o,
                  disabled: i
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
        r = a.n(n),
        c = a(8),
        o = a.n(c),
        s = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            c = e.title,
            o = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: o,
              title: c
            },
            r.a.createElement("span", { className: "glyphicon ".concat(a) })
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
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        c = a(8),
        o = a.n(c),
        s = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            c = e.size,
            o = e.id,
            s = e.placeholder,
            l = e.name,
            i = e.value,
            u = e.onClickAction,
            m = e.onChangeAction,
            p = e.onBlurAction,
            d = e.required,
            f = e.readOnly,
            b = e.maxLength,
            g = e.error,
            v = e.min,
            h = e.max,
            N = e.step,
            y = e.errorMessage,
            E = e.divSize,
            C = e.divClassName,
            O = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(E, " ").concat(C) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(d) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(c) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (g ? "has-error" : ""),
                id: o,
                placeholder: s,
                name: l,
                value: i,
                onClick: u,
                onChange: m,
                onBlur: p,
                readOnly: f,
                maxLength: b,
                min: v,
                max: h,
                autoComplete: O,
                step: N
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
      (s.defaultProps = {
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
        (s.propTypes = {
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
        (t.a = s);
    }
  }
]);
