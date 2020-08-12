(window.webpackJsonp = window.webpackJsonp || []).push([
  [93],
  {
    1510: function(e, a, t) {
      "use strict";
      t.r(a);
      var n = t(24),
        r = t.n(n),
        l = t(25),
        o = t.n(l),
        c = t(22),
        s = t.n(c),
        i = t(26),
        u = t.n(i),
        m = t(27),
        p = t.n(m),
        d = t(16),
        f = t.n(d),
        g = t(6),
        v = t.n(g),
        h = t(0),
        b = t.n(h),
        y = t(697),
        N = t.n(y),
        E = t(4),
        C = t(690),
        x = t(691),
        O = t(693);
      function k(e) {
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
            n = f()(e);
          if (a) {
            var r = f()(this).constructor;
            t = Reflect.construct(n, arguments, r);
          } else t = n.apply(this, arguments);
          return p()(this, t);
        };
      }
      var S = (function(e) {
          u()(t, e);
          var a = k(t);
          function t(e) {
            return r()(this, t), a.call(this, e);
          }
          return (
            o()(t, [
              {
                key: "render",
                value: function() {
                  return b.a.createElement(
                    "div",
                    { className: "row" },
                    b.a.createElement(
                      "div",
                      { className: "col-sm-12" },
                      b.a.createElement(
                        C.a,
                        null,
                        b.a.createElement(
                          x.a,
                          { className: "panel-small" },
                          b.a.createElement(
                            "div",
                            { className: "col-md-4" },
                            b.a.createElement(
                              "div",
                              {
                                className:
                                  "btn-group btn-group-flex margin-small",
                                role: "group"
                              },
                              b.a.createElement(O.a, {
                                iconName: "glyphicon-arrow-left",
                                onClickAction: E.e.goBack
                              })
                            )
                          ),
                          b.a.createElement(
                            "div",
                            { className: "col-md-4" },
                            b.a.createElement(
                              "h3",
                              { className: "text-center table-title" },
                              "Rapportage Energie Leverancier naar Excel"
                            )
                          ),
                          b.a.createElement("div", { className: "col-md-4" })
                        )
                      )
                    )
                  );
                }
              }
            ]),
            t
          );
        })(h.Component),
        A = t(32),
        I = t(7),
        w = t.n(I),
        q = t(696),
        T = t(692),
        P = t(702),
        R = t(694);
      w.a.locale("nl");
      var M = Object(A.b)(function(e) {
          return { energySuppliers: e.systemData.energySuppliers };
        })(function(e) {
          var a = e.excel,
            t = a.templateId,
            n = a.energySupplierId,
            r = a.documentName;
          return b.a.createElement(
            "form",
            {
              className: "form-horizontal col-md-12",
              onSubmit: e.handleSubmit
            },
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(q.a, {
                label: "Excel template",
                name: "templateId",
                options: e.templates,
                value: t,
                onChangeAction: e.handleInputChange,
                required: "required",
                error: e.errors.templateId
              }),
              "(Kijk op de Wiki welke template je moet gebruiken voor welke leverancier)"
            ),
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(q.a, {
                label: "Contacten van Energie Leverancier",
                name: "energySupplierId",
                options: e.energySuppliers,
                value: n,
                onChangeAction: e.handleInputChange,
                required: "required",
                error: e.errors.energySupplierId
              }),
              "(Maak per leverancier een overzicht)"
            ),
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(R.a, {
                label: "Bestandsnaam",
                name: "documentName",
                value: r,
                onChangeAction: e.handleInputChange,
                required: "required",
                error: e.errors.documentName
              }),
              ".xlsx"
            ),
            b.a.createElement(
              P.a,
              null,
              b.a.createElement(
                "div",
                { className: "pull-right btn-group", role: "group" },
                b.a.createElement(T.a, {
                  buttonClassName: "btn-default",
                  buttonText: "Annuleren",
                  onClickAction: e.switchToView
                }),
                b.a.createElement(T.a, {
                  buttonText: "Opslaan",
                  onClickAction: e.handleSubmit,
                  type: "submit",
                  value: "Submit"
                })
              )
            )
          );
        }),
        j = t(92);
      function z(e, a) {
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
      function D(e) {
        for (var a = 1; a < arguments.length; a++) {
          var t = null != arguments[a] ? arguments[a] : {};
          a % 2
            ? z(Object(t), !0).forEach(function(a) {
                v()(e, a, t[a]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : z(Object(t)).forEach(function(a) {
                Object.defineProperty(
                  e,
                  a,
                  Object.getOwnPropertyDescriptor(t, a)
                );
              });
        }
        return e;
      }
      function L(e) {
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
            n = f()(e);
          if (a) {
            var r = f()(this).constructor;
            t = Reflect.construct(n, arguments, r);
          } else t = n.apply(this, arguments);
          return p()(this, t);
        };
      }
      var B = (function(e) {
        u()(t, e);
        var a = L(t);
        function t(e) {
          var n;
          return (
            r()(this, t),
            (n = a.call(this, e)),
            v()(s()(n), "handleInputChange", function(e) {
              var a = e.target,
                t = "checkbox" === a.type ? a.checked : a.value,
                r = a.name;
              n.setState(
                D(
                  D({}, n.state),
                  {},
                  { excel: D(D({}, n.state.excel), {}, v()({}, r, t)) }
                )
              );
            }),
            v()(s()(n), "handleSubmit", function(e) {
              e.preventDefault();
              var a = n.state.excel,
                t = {},
                r = !1;
              N.a.isEmpty(a.templateId + "") && ((t.templateId = !0), (r = !0)),
                N.a.isEmpty(a.energySupplierId + "") &&
                  ((t.energySupplierId = !0), (r = !0)),
                N.a.isEmpty(a.documentName + "") &&
                  ((t.documentName = !0), (r = !0)),
                n.setState(D(D({}, n.state), {}, { errors: t })),
                !r &&
                  j.a
                    .createEnergySupplierExcel(
                      a.revenueId,
                      a.templateId,
                      a.energySupplierId,
                      a.documentName
                    )
                    .then(function(e) {
                      E.f.push("/documenten");
                    });
            }),
            (n.state = {
              templates: [],
              excel: {
                revenueId: e.params.revenueId,
                templateId: "",
                energySupplierId: "",
                documentName: ""
              },
              errors: { templateId: !1, energySupplierId: !1, documentName: !1 }
            }),
            n
          );
        }
        return (
          o()(t, [
            {
              key: "componentDidMount",
              value: function() {
                var e = [];
                e.push({ id: 1, name: "Eneco" }),
                  e.push({ id: 2, name: "Greenchoice" }),
                  e.push({ id: 3, name: "Oxxio" }),
                  e.push({ id: 4, name: "Vattenfall" }),
                  e.push({ id: 5, name: "Energie VanOns" }),
                  e.push({ id: 6, name: "Uniform" }),
                  this.setState({ templates: e });
              }
            },
            {
              key: "render",
              value: function() {
                return b.a.createElement(
                  "div",
                  { className: "row" },
                  b.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    b.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      b.a.createElement(S, null)
                    ),
                    b.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      b.a.createElement(
                        C.a,
                        null,
                        b.a.createElement(
                          x.a,
                          null,
                          b.a.createElement(
                            "div",
                            { className: "col-md-12" },
                            b.a.createElement(M, {
                              excel: this.state.excel,
                              errors: this.state.errors,
                              templates: this.state.templates,
                              handleInputChange: this.handleInputChange,
                              handleSubmit: this.handleSubmit
                            })
                          )
                        )
                      )
                    )
                  ),
                  b.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          t
        );
      })(h.Component);
      a.default = B;
    },
    690: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        o = t.n(l),
        c = function(e) {
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
      (c.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (c.propTypes = {
          className: o.a.string,
          onMouseEnter: o.a.func,
          onMouseLeave: o.a.func
        }),
        (a.a = c);
    },
    691: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        o = t.n(l),
        c = function(e) {
          var a = e.className,
            t = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(a) },
            t
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: o.a.string }),
        (a.a = c);
    },
    692: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        o = t.n(l),
        c = function(e) {
          var a = e.buttonClassName,
            t = e.buttonText,
            n = e.onClickAction,
            l = e.type,
            o = e.value,
            c = e.loading,
            s = e.loadText,
            i = e.disabled;
          return c
            ? r.a.createElement(
                "button",
                {
                  type: l,
                  className: "btn btn-sm btn-loading ".concat(a),
                  value: o,
                  disabled: c
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
                  className: "btn btn-sm ".concat(a),
                  onClick: n,
                  value: o,
                  disabled: i
                },
                t
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
          buttonClassName: o.a.string,
          buttonText: o.a.string.isRequired,
          onClickAction: o.a.func,
          type: o.a.string,
          value: o.a.string,
          loading: o.a.bool,
          loadText: o.a.string,
          disabled: o.a.bool
        }),
        (a.a = c);
    },
    693: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        o = t.n(l),
        c = function(e) {
          var a = e.buttonClassName,
            t = e.iconName,
            n = e.onClickAction,
            l = e.title,
            o = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(a),
              onClick: n,
              disabled: o,
              title: l
            },
            r.a.createElement("span", { className: "glyphicon ".concat(t) })
          );
        };
      (c.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (c.propTypes = {
          buttonClassName: o.a.string,
          iconName: o.a.string.isRequired,
          onClickAction: o.a.func,
          title: o.a.string,
          disabled: o.a.bool
        }),
        (a.a = c);
    },
    694: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        o = t.n(l),
        c = function(e) {
          var a = e.label,
            t = e.type,
            n = e.className,
            l = e.size,
            o = e.id,
            c = e.placeholder,
            s = e.name,
            i = e.value,
            u = e.onClickAction,
            m = e.onChangeAction,
            p = e.onBlurAction,
            d = e.required,
            f = e.readOnly,
            g = e.maxLength,
            v = e.error,
            h = e.min,
            b = e.max,
            y = e.step,
            N = e.errorMessage,
            E = e.divSize,
            C = e.divClassName,
            x = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(E, " ").concat(C) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(d) },
              a
            ),
            r.a.createElement(
              "div",
              { className: "".concat(l) },
              r.a.createElement("input", {
                type: t,
                className:
                  "form-control input-sm ".concat(n) + (v ? "has-error" : ""),
                id: o,
                placeholder: c,
                name: s,
                value: i,
                onClick: u,
                onChange: m,
                onBlur: p,
                readOnly: f,
                maxLength: g,
                min: h,
                max: b,
                autoComplete: x,
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
                  N
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
        (a.a = c);
    },
    696: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        o = t.n(l),
        c = function(e) {
          var a = e.label,
            t = e.className,
            n = e.size,
            l = e.id,
            o = e.name,
            c = e.value,
            s = e.options,
            i = e.onChangeAction,
            u = e.onBlurAction,
            m = e.required,
            p = e.error,
            d = e.errorMessage,
            f = e.optionValue,
            g = e.optionName,
            v = e.readOnly,
            h = e.placeholder,
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
                    "form-control input-sm ".concat(t) + (p && " has-error"),
                  id: l,
                  name: o,
                  value: c,
                  onChange: i,
                  onBlur: u,
                  readOnly: v
                },
                y && r.a.createElement("option", { value: "" }, h),
                s.map(function(e) {
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
        (a.a = c);
    },
    702: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        o = t.n(l),
        c = function(e) {
          var a = e.className,
            t = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-footer ".concat(a) },
            t
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: o.a.string }),
        (a.a = c);
    }
  }
]);
