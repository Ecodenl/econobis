(window.webpackJsonp = window.webpackJsonp || []).push([
  [94],
  {
    1512: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        o = a(25),
        l = a.n(o),
        c = a(22),
        s = a.n(c),
        i = a(26),
        u = a.n(i),
        m = a(27),
        p = a.n(m),
        d = a(16),
        f = a.n(d),
        v = a(6),
        g = a.n(v),
        h = a(0),
        b = a.n(h),
        N = a(697),
        y = a.n(N),
        E = a(4),
        C = a(690),
        O = a(691),
        k = a(693);
      function A(e) {
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
          return p()(this, a);
        };
      }
      var x = (function(e) {
          u()(a, e);
          var t = A(a);
          function a(e) {
            return r()(this, a), t.call(this, e);
          }
          return (
            l()(a, [
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
                          O.a,
                          { className: "panel-small" },
                          b.a.createElement(
                            "div",
                            { className: "col-md-4" },
                            b.a.createElement(
                              "div",
                              {
                                className:
                                  "btn-group btn-group-flex  margin-small",
                                role: "group"
                              },
                              b.a.createElement(k.a, {
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
                              "Rapportage Energie Leverancier"
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
            a
          );
        })(h.Component),
        w = (a(32), a(7)),
        T = a.n(w),
        P = a(696),
        R = a(692),
        S = a(702),
        q = a(694);
      T.a.locale("nl");
      var I = function(e) {
          var t = e.report,
            a = t.templateId,
            n = t.documentName;
          return b.a.createElement(
            "form",
            {
              className: "form-horizontal col-md-12",
              onSubmit: e.handleSubmit
            },
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(P.a, {
                label: "Document template",
                name: "templateId",
                options: e.templates,
                value: a,
                onChangeAction: e.handleInputChange,
                required: "required",
                error: e.errors.templateId
              })
            ),
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(q.a, {
                label: "Document naam",
                name: "documentName",
                value: n,
                onChangeAction: e.handleInputChange,
                required: "required",
                error: e.errors.documentName
              }),
              ".pdf"
            ),
            b.a.createElement(
              S.a,
              null,
              b.a.createElement(
                "div",
                { className: "pull-right btn-group", role: "group" },
                b.a.createElement(R.a, {
                  buttonClassName: "btn-default",
                  buttonText: "Annuleren",
                  onClickAction: e.switchToView
                }),
                b.a.createElement(R.a, {
                  buttonText: "Opslaan",
                  onClickAction: e.handleSubmit,
                  type: "submit",
                  value: "Submit"
                })
              )
            )
          );
        },
        M = a(92),
        D = a(105);
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
      function z(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? j(Object(a), !0).forEach(function(t) {
                g()(e, t, a[t]);
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
      function L(e) {
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
          return p()(this, a);
        };
      }
      var B = (function(e) {
        u()(a, e);
        var t = L(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            g()(s()(n), "handleInputChange", function(e) {
              var t = e.target,
                a = "checkbox" === t.type ? t.checked : t.value,
                r = t.name;
              n.setState(
                z(
                  z({}, n.state),
                  {},
                  { report: z(z({}, n.state.report), {}, g()({}, r, a)) }
                )
              );
            }),
            g()(s()(n), "handleSubmit", function(e) {
              e.preventDefault();
              var t = n.state.report,
                a = {},
                r = !1;
              y.a.isEmpty(t.templateId + "") && ((a.templateId = !0), (r = !0)),
                y.a.isEmpty(t.documentName + "") &&
                  ((a.documentName = !0), (r = !0)),
                n.setState(z(z({}, n.state), {}, { errors: a })),
                !r &&
                  M.a
                    .createEnergySupplierReport(
                      t.revenueId,
                      t.templateId,
                      t.documentName
                    )
                    .then(function(e) {
                      E.f.push("/documenten");
                    });
            }),
            (n.state = {
              templates: [],
              report: {
                revenueId: e.params.revenueId,
                templateId: "",
                documentName: ""
              },
              errors: { templateId: !1, documentName: !1 }
            }),
            n
          );
        }
        return (
          l()(a, [
            {
              key: "componentDidMount",
              value: function() {
                var e = this;
                D.a.fetchDocumentTemplatesPeekGeneral().then(function(t) {
                  var a = [];
                  t.forEach(function(e) {
                    "revenue" == e.group && a.push({ id: e.id, name: e.name });
                  }),
                    e.setState({ templates: a });
                });
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
                      b.a.createElement(x, null)
                    ),
                    b.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      b.a.createElement(
                        C.a,
                        null,
                        b.a.createElement(
                          O.a,
                          null,
                          b.a.createElement(
                            "div",
                            { className: "col-md-12" },
                            b.a.createElement(I, {
                              report: this.state.report,
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
          a
        );
      })(h.Component);
      t.default = B;
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        c = function(e) {
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
      (c.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (c.propTypes = {
          className: l.a.string,
          onMouseEnter: l.a.func,
          onMouseLeave: l.a.func
        }),
        (t.a = c);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        c = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: l.a.string }),
        (t.a = c);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        c = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            o = e.type,
            l = e.value,
            c = e.loading,
            s = e.loadText,
            i = e.disabled;
          return c
            ? r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: l,
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
                  type: o,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: l,
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
          buttonClassName: l.a.string,
          buttonText: l.a.string.isRequired,
          onClickAction: l.a.func,
          type: l.a.string,
          value: l.a.string,
          loading: l.a.bool,
          loadText: l.a.string,
          disabled: l.a.bool
        }),
        (t.a = c);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        c = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            o = e.title,
            l = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: l,
              title: o
            },
            r.a.createElement("span", { className: "glyphicon ".concat(a) })
          );
        };
      (c.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (c.propTypes = {
          buttonClassName: l.a.string,
          iconName: l.a.string.isRequired,
          onClickAction: l.a.func,
          title: l.a.string,
          disabled: l.a.bool
        }),
        (t.a = c);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        c = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            o = e.size,
            l = e.id,
            c = e.placeholder,
            s = e.name,
            i = e.value,
            u = e.onClickAction,
            m = e.onChangeAction,
            p = e.onBlurAction,
            d = e.required,
            f = e.readOnly,
            v = e.maxLength,
            g = e.error,
            h = e.min,
            b = e.max,
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
              { htmlFor: l, className: "col-sm-6 ".concat(d) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(o) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (g ? "has-error" : ""),
                id: l,
                placeholder: c,
                name: s,
                value: i,
                onClick: u,
                onChange: m,
                onBlur: p,
                readOnly: f,
                maxLength: v,
                min: h,
                max: b,
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
        (t.a = c);
    },
    696: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        c = function(e) {
          var t = e.label,
            a = e.className,
            n = e.size,
            o = e.id,
            l = e.name,
            c = e.value,
            s = e.options,
            i = e.onChangeAction,
            u = e.onBlurAction,
            m = e.required,
            p = e.error,
            d = e.errorMessage,
            f = e.optionValue,
            v = e.optionName,
            g = e.readOnly,
            h = e.placeholder,
            b = e.divClassName,
            N = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(b) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(m) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-6" },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(a) + (p && " has-error"),
                  id: o,
                  name: l,
                  value: c,
                  onChange: i,
                  onBlur: u,
                  readOnly: g
                },
                N && r.a.createElement("option", { value: "" }, h),
                s.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[f], value: e[f] },
                    e[v]
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
          label: l.a.string.isRequired,
          className: l.a.string,
          size: l.a.string,
          id: l.a.string,
          name: l.a.string.isRequired,
          options: l.a.array,
          value: l.a.oneOfType([l.a.string, l.a.number]),
          onChangeAction: l.a.func,
          onBlurAction: l.a.func,
          required: l.a.string,
          readOnly: l.a.bool,
          error: l.a.bool,
          errorMessage: l.a.string,
          emptyOption: l.a.bool,
          optionValue: l.a.string,
          optionName: l.a.string,
          placeholder: l.a.string
        }),
        (t.a = c);
    },
    702: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        c = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-footer ".concat(t) },
            a
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: l.a.string }),
        (t.a = c);
    }
  }
]);
