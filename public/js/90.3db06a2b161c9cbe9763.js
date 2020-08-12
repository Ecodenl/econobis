(window.webpackJsonp = window.webpackJsonp || []).push([
  [90],
  {
    1515: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(0),
        r = a.n(n),
        o = a(24),
        s = a.n(o),
        l = a(25),
        i = a.n(l),
        c = a(22),
        u = a.n(c),
        d = a(26),
        m = a.n(d),
        p = a(27),
        f = a.n(p),
        g = a(16),
        v = a.n(g),
        b = a(6),
        h = a.n(b),
        y = a(32),
        C = a(14),
        N = a(4),
        E = a(697),
        D = a.n(E),
        w = a(7),
        O = a.n(w),
        A = a(694),
        S = a(692),
        k = a(691),
        x = a(690),
        P = a(809),
        j = a(201),
        q = a(699);
      function M(e, t) {
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
      function T(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? M(Object(a), !0).forEach(function(t) {
                h()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : M(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
            n = v()(e);
          if (t) {
            var r = v()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return f()(this, a);
        };
      }
      O.a.locale("nl");
      var R = (function(e) {
          m()(a, e);
          var t = B(a);
          function a(e) {
            var n;
            return (
              s()(this, a),
              (n = t.call(this, e)),
              h()(u()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  T(
                    T({}, n.state),
                    {},
                    { vatCode: T(T({}, n.state.vatCode), {}, h()({}, r, a)) }
                  )
                );
              }),
              h()(u()(n), "handleInputChangeDate", function(e, t) {
                n.setState(
                  T(
                    T({}, n.state),
                    {},
                    { vatCode: T(T({}, n.state.vatCode), {}, h()({}, t, e)) }
                  )
                );
              }),
              h()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.vatCode,
                  a = {},
                  r = !1;
                D.a.isEmpty(t.startDate) && ((a.startDate = !0), (r = !0)),
                  D.a.isEmpty(t.description) &&
                    ((a.description = !0), (r = !0)),
                  D.a.isEmpty(t.percentage.toString()) &&
                    ((a.percentage = !0), (r = !0)),
                  n.setState(T(T({}, n.state), {}, { errors: a })),
                  !r &&
                    P.a
                      .newVatCode(t)
                      .then(function(e) {
                        n.props.fetchSystemData(),
                          N.f.push("/btw-code/".concat(e.data.data.id));
                      })
                      .catch(function(e) {
                        alert("Er is iets mis gegaan met opslaan!");
                      });
              }),
              (n.state = {
                vatCode: {
                  startDate: "",
                  description: "",
                  percentage: "",
                  twinfieldCode: "",
                  twinfieldLedgerCode: ""
                },
                errors: { startDate: !1, description: !1, percentage: !1 }
              }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.vatCode,
                    t = e.startDate,
                    a = e.description,
                    n = e.percentage,
                    o = e.twinfieldCode,
                    s = e.twinfieldLedgerCode;
                  return r.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    r.a.createElement(
                      x.a,
                      null,
                      r.a.createElement(
                        k.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(q.a, {
                            label: "Startdatum",
                            name: "startDate",
                            value: t,
                            onChangeAction: this.handleInputChangeDate,
                            required: "required",
                            error: this.state.errors.startDate
                          }),
                          r.a.createElement(A.a, {
                            label: "Omschrijving",
                            name: "description",
                            value: a,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.description
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(A.a, {
                            type: "number",
                            label: "Percentage",
                            name: "percentage",
                            value: n,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.percentage
                          }),
                          r.a.createElement(A.a, {
                            label: "Twinfield code",
                            name: "twinfieldCode",
                            value: o,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(A.a, {
                            label: "Twinfield grootboek code",
                            name: "twinfieldLedgerCode",
                            value: s,
                            onChangeAction: this.handleInputChange
                          })
                        )
                      ),
                      r.a.createElement(
                        k.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          r.a.createElement(S.a, {
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
        z = Object(y.b)(null, function(e) {
          return Object(C.b)({ fetchSystemData: j.a }, e);
        })(R),
        L = a(693),
        I = function() {
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
                "Nieuw BTW code"
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
                x.a,
                null,
                r.a.createElement(
                  k.a,
                  { className: "panel-small" },
                  r.a.createElement(I, null)
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
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        l = function(e) {
          var t = e.children,
            a = e.className,
            n = e.onMouseEnter,
            o = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: o
            },
            t
          );
        };
      (l.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (l.propTypes = {
          className: s.a.string,
          onMouseEnter: s.a.func,
          onMouseLeave: s.a.func
        }),
        (t.a = l);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        l = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (l.defaultProps = { className: "" }),
        (l.propTypes = { className: s.a.string }),
        (t.a = l);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        l = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            o = e.type,
            s = e.value,
            l = e.loading,
            i = e.loadText,
            c = e.disabled;
          return l
            ? r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: s,
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
                  type: o,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: s,
                  disabled: c
                },
                a
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
          buttonClassName: s.a.string,
          buttonText: s.a.string.isRequired,
          onClickAction: s.a.func,
          type: s.a.string,
          value: s.a.string,
          loading: s.a.bool,
          loadText: s.a.string,
          disabled: s.a.bool
        }),
        (t.a = l);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        l = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            o = e.title,
            s = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: s,
              title: o
            },
            r.a.createElement("span", { className: "glyphicon ".concat(a) })
          );
        };
      (l.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (l.propTypes = {
          buttonClassName: s.a.string,
          iconName: s.a.string.isRequired,
          onClickAction: s.a.func,
          title: s.a.string,
          disabled: s.a.bool
        }),
        (t.a = l);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        l = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            o = e.size,
            s = e.id,
            l = e.placeholder,
            i = e.name,
            c = e.value,
            u = e.onClickAction,
            d = e.onChangeAction,
            m = e.onBlurAction,
            p = e.required,
            f = e.readOnly,
            g = e.maxLength,
            v = e.error,
            b = e.min,
            h = e.max,
            y = e.step,
            C = e.errorMessage,
            N = e.divSize,
            E = e.divClassName,
            D = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(N, " ").concat(E) },
            r.a.createElement(
              "label",
              { htmlFor: s, className: "col-sm-6 ".concat(p) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(o) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (v ? "has-error" : ""),
                id: s,
                placeholder: l,
                name: i,
                value: c,
                onClick: u,
                onChange: d,
                onBlur: m,
                readOnly: f,
                maxLength: g,
                min: b,
                max: h,
                autoComplete: D,
                step: y
              })
            ),
            v &&
              r.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                r.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  C
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
        (t.a = l);
    },
    699: function(e, t, a) {
      "use strict";
      var n = a(24),
        r = a.n(n),
        o = a(25),
        s = a.n(o),
        l = a(22),
        i = a.n(l),
        c = a(26),
        u = a.n(c),
        d = a(27),
        m = a.n(d),
        p = a(16),
        f = a.n(p),
        g = a(6),
        v = a.n(g),
        b = a(0),
        h = a.n(b),
        y = a(8),
        C = a.n(y),
        N = a(707),
        E = a.n(N),
        D = a(708),
        w = a.n(D),
        O = a(7),
        A = a.n(O);
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return m()(this, a);
        };
      }
      A.a.locale("nl");
      var k = (function(e) {
        u()(a, e);
        var t = S(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            v()(i()(n), "validateDate", function(e) {
              var t = A()(e.target.value, "DD-MM-YYYY", !0),
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
            v()(i()(n), "onDateChange", function(e) {
              var t = e ? A()(e).format("Y-MM-DD") : "",
                a = !1;
              t &&
                n.props.disabledBefore &&
                A()(t).isBefore(n.props.disabledBefore) &&
                (a = !0),
                t &&
                  n.props.disabledAfter &&
                  A()(t).isAfter(n.props.disabledAfter) &&
                  (a = !0),
                n.setState({ errorDateFormat: a }),
                !a && n.props.onChangeAction(t, n.props.name);
            }),
            (n.state = { errorDateFormat: !1 }),
            n
          );
        }
        return (
          s()(a, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.label,
                  a = e.className,
                  n = e.size,
                  r = e.divSize,
                  o = e.id,
                  s = e.value,
                  l = e.required,
                  i = e.readOnly,
                  c = e.name,
                  u = e.error,
                  d = e.errorMessage,
                  m = e.disabledBefore,
                  p = e.disabledAfter,
                  f = s ? A()(s).format("L") : "",
                  g = {};
                return (
                  m && (g.before = new Date(m)),
                  p && (g.after = new Date(p)),
                  h.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    h.a.createElement(
                      "div",
                      null,
                      h.a.createElement(
                        "label",
                        { htmlFor: o, className: "col-sm-6 ".concat(l) },
                        t
                      )
                    ),
                    h.a.createElement(
                      "div",
                      { className: "".concat(n) },
                      h.a.createElement(E.a, {
                        id: o,
                        value: f,
                        formatDate: D.formatDate,
                        parseDate: D.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: w.a,
                          disabledDays: g
                        },
                        inputProps: {
                          className:
                            "form-control input-sm ".concat(a) +
                            (this.state.errorDateFormat || u
                              ? " has-error"
                              : ""),
                          name: c,
                          onBlur: this.validateDate,
                          autoComplete: "off",
                          readOnly: i,
                          disabled: i
                        },
                        required: l,
                        readOnly: i,
                        placeholder: ""
                      })
                    ),
                    u &&
                      h.a.createElement(
                        "div",
                        { className: "col-sm-offset-6 col-sm-6" },
                        h.a.createElement(
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
      })(b.Component);
      (k.defaultProps = {
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
        (k.propTypes = {
          label: C.a.string.isRequired,
          type: C.a.string,
          className: C.a.string,
          size: C.a.string,
          divSize: C.a.string,
          id: C.a.string,
          name: C.a.string,
          value: C.a.oneOfType([C.a.string, C.a.object]),
          onChangeAction: C.a.func,
          required: C.a.string,
          readOnly: C.a.bool,
          error: C.a.bool,
          errorMessage: C.a.string,
          disabledBefore: C.a.string,
          disabledAfter: C.a.string
        }),
        (t.a = k);
    },
    809: function(e, t, a) {
      "use strict";
      var n = a(12);
      t.a = {
        fetchVatCodeDetails: function(e) {
          var t = "jory/vat-code/".concat(e);
          return n.a.get(t, {
            params: {
              jory: {
                fld: [
                  "id",
                  "startDate",
                  "description",
                  "percentage",
                  "twinfieldCode",
                  "twinfieldLedgerCode"
                ]
              }
            }
          });
        },
        newVatCode: function(e) {
          return (
            (e.jory = JSON.stringify({ fld: ["id"] })), n.a.post("vat-code", e)
          );
        },
        updateVatCode: function(e) {
          var t = "".concat("vat-code", "/").concat(e.id);
          return n.a.post(t, e);
        }
      };
    }
  }
]);
