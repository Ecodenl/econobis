(window.webpackJsonp = window.webpackJsonp || []).push([
  [43],
  {
    1501: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        l = a(25),
        o = a.n(l),
        s = a(22),
        c = a.n(s),
        i = a(26),
        u = a.n(i),
        d = a(27),
        m = a.n(d),
        p = a(16),
        h = a.n(p),
        f = a(6),
        v = a.n(f),
        g = a(0),
        b = a.n(g),
        y = a(697),
        T = a.n(y),
        E = (a(198), a(4)),
        N = a(690),
        k = a(691),
        C = a(693);
      function O(e) {
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
            n = h()(e);
          if (t) {
            var r = h()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return m()(this, a);
        };
      }
      var w = (function(e) {
          u()(a, e);
          var t = O(a);
          function a(e) {
            return r()(this, a), t.call(this, e);
          }
          return (
            o()(a, [
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
                        N.a,
                        null,
                        b.a.createElement(
                          k.a,
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
                              b.a.createElement(C.a, {
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
                              "Nieuwe document template"
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
        })(g.Component),
        I = a(692),
        x = a(702),
        S = a(737),
        A = a(696),
        P = a(723),
        R = a(694),
        q = a(700),
        M = function(e) {
          var t = e.documentTemplate,
            a = t.name,
            n = t.documentGroupId,
            r = t.documentTemplateTypeId,
            l = t.roleIds,
            o = t.characteristic,
            s = t.htmlBody,
            c = t.baseTemplateId,
            i = t.headerTemplateId,
            u = t.footerTemplateId,
            d = t.active;
          return b.a.createElement(
            "form",
            {
              className: "form-horizontal col-md-12",
              onSubmit: e.handleSubmit
            },
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(R.a, {
                label: "Naam",
                size: "col-sm-6",
                name: "name",
                value: a,
                onChangeAction: e.handleInputChange,
                required: "required",
                error: e.errors.name
              })
            ),
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(A.a, {
                label: "Documentgroep",
                name: "documentGroupId",
                value: n,
                options: e.documentGroups,
                onChangeAction: e.handleInputChange,
                required: "required",
                error: e.errors.group
              }),
              b.a.createElement(A.a, {
                label: "Documenttype",
                name: "documentTemplateTypeId",
                value: r,
                options: e.documentTemplateTypes,
                onChangeAction: e.handleDocumentTemplateType,
                required: "required",
                error: e.errors.type
              })
            ),
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(R.a, {
                label: "Kenmerk",
                size: "col-sm-6",
                name: "characteristic",
                value: o,
                onChangeAction: e.handleInputChange
              }),
              e.isGeneral &&
                b.a.createElement(P.a, {
                  label: "Rollen",
                  name: "roleIds",
                  value: l,
                  options: e.roles,
                  onChangeAction: e.handleRoleIds
                })
            ),
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(
                "div",
                { className: "form-group col-sm-12" },
                b.a.createElement(
                  "div",
                  { className: "row" },
                  b.a.createElement(S.a, {
                    label: "Tekst",
                    value: s,
                    onChangeAction: e.handleTextChange
                  })
                )
              )
            ),
            e.isGeneral &&
              b.a.createElement(
                "div",
                { className: "row" },
                b.a.createElement(A.a, {
                  label: "Basis template",
                  name: "baseTemplateId",
                  value: c,
                  options: e.baseTemplates,
                  onChangeAction: e.handleInputChange
                })
              ),
            e.isGeneral &&
              b.a.createElement(
                "div",
                { className: "row" },
                b.a.createElement(A.a, {
                  label: "Koptekst",
                  name: "headerTemplateId",
                  value: i,
                  options: e.headerTemplates,
                  onChangeAction: e.handleInputChange
                })
              ),
            e.isGeneral &&
              b.a.createElement(
                "div",
                { className: "row" },
                b.a.createElement(A.a, {
                  label: "Footer template",
                  name: "footerTemplateId",
                  value: u,
                  options: e.footerTemplates,
                  onChangeAction: e.handleInputChange
                })
              ),
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(q.a, {
                label: "Actief",
                name: "active",
                value: d,
                onChangeAction: e.handleInputChange,
                id: "active"
              })
            ),
            b.a.createElement(
              x.a,
              null,
              b.a.createElement(
                "div",
                { className: "pull-right btn-group", role: "group" },
                b.a.createElement(I.a, {
                  buttonText: "Opslaan",
                  onClickAction: e.handleSubmit,
                  type: "submit",
                  value: "Submit"
                })
              )
            )
          );
        },
        j = a(105),
        D = a(32);
      function _(e, t) {
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
      function B(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? _(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : _(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
            n = h()(e);
          if (t) {
            var r = h()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return m()(this, a);
        };
      }
      var G = (function(e) {
        u()(a, e);
        var t = z(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            v()(c()(n), "handleInputChange", function(e) {
              var t = e.target,
                a = "checkbox" === t.type ? t.checked : t.value,
                r = t.name;
              n.setState(
                B(
                  B({}, n.state),
                  {},
                  {
                    documentTemplate: B(
                      B({}, n.state.documentTemplate),
                      {},
                      v()({}, r, a)
                    )
                  }
                )
              );
            }),
            v()(c()(n), "handleDocumentTemplateType", function(e) {
              var t = e.target,
                a = "checkbox" === t.type ? t.checked : t.value;
              "general" === a
                ? n.setState(
                    B(
                      B({}, n.state),
                      {},
                      {
                        isGeneral: !0,
                        documentTemplate: B(
                          B({}, n.state.documentTemplate),
                          {},
                          { documentTemplateTypeId: a }
                        )
                      }
                    )
                  )
                : n.setState(
                    B(
                      B({}, n.state),
                      {},
                      {
                        isGeneral: !1,
                        documentTemplate: B(
                          B({}, n.state.documentTemplate),
                          {},
                          {
                            documentTemplateTypeId: a,
                            roleIds: "",
                            baseTemplateId: "",
                            headerTemplateId: "",
                            footerTemplateId: ""
                          }
                        )
                      }
                    )
                  );
            }),
            v()(c()(n), "handleRoleIds", function(e) {
              n.setState(
                B(
                  B({}, n.state),
                  {},
                  {
                    documentTemplate: B(
                      B({}, n.state.documentTemplate),
                      {},
                      { roleIds: e }
                    )
                  }
                )
              );
            }),
            v()(c()(n), "handleSubmit", function(e) {
              e.preventDefault();
              var t = n.state.documentTemplate,
                a = {},
                r = !1;
              T.a.isEmpty(t.name) && ((a.name = !0), (r = !0)),
                T.a.isEmpty(t.documentGroupId) && ((a.group = !0), (r = !0)),
                T.a.isEmpty(t.documentTemplateTypeId) &&
                  ((a.type = !0), (r = !0)),
                n.setState(B(B({}, n.state), {}, { errors: a })),
                !r &&
                  j.a.storeDocumentTemplate(t).then(function(e) {
                    E.f.push("/document-template/".concat(e.id));
                  });
            }),
            (n.state = {
              footerTemplates: [],
              headerTemplates: [],
              baseTemplates: [],
              documentTemplate: {
                name: "",
                documentGroupId: "",
                documentTemplateTypeId: "",
                roleIds: "",
                characteristic: "",
                htmlBody: "",
                baseTemplateId: "",
                headerTemplateId: "",
                footerTemplateId: "",
                active: !0
              },
              errors: { name: !1, group: !1, type: !1 },
              isGeneral: !1
            }),
            (n.handleTextChange = n.handleTextChange.bind(c()(n))),
            n
          );
        }
        return (
          o()(a, [
            {
              key: "componentDidMount",
              value: function() {
                var e = this;
                j.a.fetchDocumentTemplatesPeekNotGeneral().then(function(t) {
                  var a = [],
                    n = [],
                    r = [];
                  t.forEach(function(e) {
                    "footer" === e.type
                      ? a.push({ id: e.id, name: e.name })
                      : "header" === e.type
                      ? n.push({ id: e.id, name: e.name })
                      : "base" === e.type && r.push({ id: e.id, name: e.name });
                  }),
                    e.setState({
                      footerTemplates: a,
                      headerTemplates: n,
                      baseTemplates: r
                    });
                });
              }
            },
            {
              key: "handleTextChange",
              value: function(e) {
                this.setState(
                  B(
                    B({}, this.state),
                    {},
                    {
                      documentTemplate: B(
                        B({}, this.state.documentTemplate),
                        {},
                        { htmlBody: e.target.getContent({ format: "raw" }) }
                      )
                    }
                  )
                );
              }
            },
            {
              key: "render",
              value: function() {
                return b.a.createElement(
                  "div",
                  null,
                  b.a.createElement(
                    "div",
                    { className: "panel panel-default" },
                    b.a.createElement(
                      "div",
                      { className: "panel-body" },
                      b.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        b.a.createElement(w, null)
                      ),
                      b.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        b.a.createElement(M, {
                          documentTemplate: this.state.documentTemplate,
                          errors: this.state.errors,
                          handleInputChange: this.handleInputChange,
                          handleTextChange: this.handleTextChange,
                          handleSubmit: this.handleSubmit,
                          handleDocumentTemplateType: this
                            .handleDocumentTemplateType,
                          isGeneral: this.state.isGeneral,
                          documentGroups: this.props.documentGroups,
                          documentTemplateTypes: this.props
                            .documentTemplateTypes,
                          roles: this.props.roles,
                          handleRoleIds: this.handleRoleIds,
                          footerTemplates: this.state.footerTemplates,
                          headerTemplates: this.state.headerTemplates,
                          baseTemplates: this.state.baseTemplates
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
      })(g.Component);
      t.default = Object(D.b)(function(e) {
        return {
          documentGroups: e.systemData.documentGroups,
          documentTemplateTypes: e.systemData.documentTemplateTypes,
          roles: e.systemData.roles
        };
      })(G);
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        o = a.n(l),
        s = function(e) {
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
        l = a(8),
        o = a.n(l),
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
        l = a(8),
        o = a.n(l),
        s = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            l = e.type,
            o = e.value,
            s = e.loading,
            c = e.loadText,
            i = e.disabled;
          return s
            ? r.a.createElement(
                "button",
                {
                  type: l,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: o,
                  disabled: s
                },
                r.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                c
              )
            : r.a.createElement(
                "button",
                {
                  type: l,
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
        l = a(8),
        o = a.n(l),
        s = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            l = e.title,
            o = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: o,
              title: l
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
        l = a(8),
        o = a.n(l),
        s = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            l = e.size,
            o = e.id,
            s = e.placeholder,
            c = e.name,
            i = e.value,
            u = e.onClickAction,
            d = e.onChangeAction,
            m = e.onBlurAction,
            p = e.required,
            h = e.readOnly,
            f = e.maxLength,
            v = e.error,
            g = e.min,
            b = e.max,
            y = e.step,
            T = e.errorMessage,
            E = e.divSize,
            N = e.divClassName,
            k = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(E, " ").concat(N) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(p) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(l) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (v ? "has-error" : ""),
                id: o,
                placeholder: s,
                name: c,
                value: i,
                onClick: u,
                onChange: d,
                onBlur: m,
                readOnly: h,
                maxLength: f,
                min: g,
                max: b,
                autoComplete: k,
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
                  T
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
    },
    696: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        o = a.n(l),
        s = function(e) {
          var t = e.label,
            a = e.className,
            n = e.size,
            l = e.id,
            o = e.name,
            s = e.value,
            c = e.options,
            i = e.onChangeAction,
            u = e.onBlurAction,
            d = e.required,
            m = e.error,
            p = e.errorMessage,
            h = e.optionValue,
            f = e.optionName,
            v = e.readOnly,
            g = e.placeholder,
            b = e.divClassName,
            y = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(b) },
            r.a.createElement(
              "label",
              { htmlFor: l, className: "col-sm-6 ".concat(d) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-6" },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(a) + (m && " has-error"),
                  id: l,
                  name: o,
                  value: s,
                  onChange: i,
                  onBlur: u,
                  readOnly: v
                },
                y && r.a.createElement("option", { value: "" }, g),
                c.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[h], value: e[h] },
                    e[f]
                  );
                })
              )
            ),
            m &&
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
      (s.defaultProps = {
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
        (s.propTypes = {
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
        (t.a = s);
    },
    700: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        o = a.n(l),
        s = a(703),
        c = a.n(s),
        i = function(e) {
          var t = e.label,
            a = e.size,
            n = e.id,
            l = e.name,
            o = e.value,
            s = e.onChangeAction,
            i = e.required,
            u = e.divSize,
            d = e.className,
            m = e.disabled;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(u, " ").concat(d) },
            r.a.createElement(
              "div",
              null,
              r.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(i) },
                t
              )
            ),
            r.a.createElement(
              "div",
              { className: "".concat(a) },
              r.a.createElement(c.a, {
                id: n,
                name: l,
                onChange: s,
                checked: o,
                disabled: m
              })
            )
          );
        };
      (i.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        required: "",
        disabled: !1,
        value: null
      }),
        (i.propTypes = {
          label: o.a.string.isRequired,
          type: o.a.string,
          size: o.a.string,
          divSize: o.a.string,
          id: o.a.string,
          name: o.a.string.isRequired,
          value: o.a.bool,
          onChangeAction: o.a.func,
          required: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = i);
    },
    702: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        o = a.n(l),
        s = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-footer ".concat(t) },
            a
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: o.a.string }),
        (t.a = s);
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
        o = m(l),
        s = m(a(710)),
        c = m(a(8)),
        i = m(a(704)),
        u = m(a(705)),
        d = a(706);
      function m(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var p = (function(e) {
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
                (this.startX = (0, d.pointerCoord)(e).x), (this.activated = !0);
              }
            },
            {
              key: "handleTouchMove",
              value: function(e) {
                if (this.activated && ((this.moved = !0), this.startX)) {
                  var t = (0, d.pointerCoord)(e).x;
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
                    var a = (0, d.pointerCoord)(e).x;
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
                  l = (0, s.default)(
                    "react-toggle",
                    {
                      "react-toggle--checked": this.state.checked,
                      "react-toggle--focus": this.state.hasFocus,
                      "react-toggle--disabled": this.props.disabled
                    },
                    a
                  );
                return o.default.createElement(
                  "div",
                  {
                    className: l,
                    onClick: this.handleClick,
                    onTouchStart: this.handleTouchStart,
                    onTouchMove: this.handleTouchMove,
                    onTouchEnd: this.handleTouchEnd
                  },
                  o.default.createElement(
                    "div",
                    { className: "react-toggle-track" },
                    o.default.createElement(
                      "div",
                      { className: "react-toggle-track-check" },
                      this.getIcon("checked")
                    ),
                    o.default.createElement(
                      "div",
                      { className: "react-toggle-track-x" },
                      this.getIcon("unchecked")
                    )
                  ),
                  o.default.createElement("div", {
                    className: "react-toggle-thumb"
                  }),
                  o.default.createElement(
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
      (t.default = p),
        (p.displayName = "Toggle"),
        (p.defaultProps = {
          icons: {
            checked: o.default.createElement(i.default, null),
            unchecked: o.default.createElement(u.default, null)
          }
        }),
        (p.propTypes = {
          checked: c.default.bool,
          disabled: c.default.bool,
          defaultChecked: c.default.bool,
          onChange: c.default.func,
          onFocus: c.default.func,
          onBlur: c.default.func,
          className: c.default.string,
          name: c.default.string,
          value: c.default.string,
          id: c.default.string,
          "aria-labelledby": c.default.string,
          "aria-label": c.default.string,
          icons: c.default.oneOfType([
            c.default.bool,
            c.default.shape({
              checked: c.default.node,
              unchecked: c.default.node
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
    723: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        o = a.n(l),
        s = a(714),
        c =
          (a(715),
          function(e) {
            var t = e.label,
              a = (e.className, e.size),
              n = e.id,
              l = e.name,
              o = e.value,
              c = e.options,
              i = e.optionId,
              u = e.optionName,
              d = e.onChangeAction,
              m = e.required,
              p = e.multi,
              h = e.error;
            return r.a.createElement(
              "div",
              { className: "form-group col-sm-6" },
              r.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(m) },
                t
              ),
              r.a.createElement(
                "div",
                { className: "".concat(a) },
                r.a.createElement(s.a, {
                  id: n,
                  name: l,
                  value: o,
                  onChange: d,
                  options: c,
                  valueKey: i,
                  labelKey: u,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: p,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: h ? " has-error" : ""
                })
              )
            );
          });
      (c.defaultProps = {
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
        (c.propTypes = {
          label: o.a.string.isRequired,
          className: o.a.string,
          size: o.a.string,
          id: o.a.string,
          name: o.a.string.isRequired,
          options: o.a.array,
          optionId: o.a.string,
          optionName: o.a.string,
          value: o.a.string,
          onChangeAction: o.a.func,
          onBlurAction: o.a.func,
          required: o.a.string,
          readOnly: o.a.bool,
          error: o.a.bool,
          multi: o.a.bool
        }),
        (t.a = c);
    },
    737: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        o = a.n(l),
        s =
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
        c = function(e) {
          var t = e.label,
            a = e.value,
            n = e.onChangeAction;
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(
              "div",
              { className: "col-sm-3" },
              r.a.createElement(
                "label",
                { htmlFor: "quotationText", className: "col-sm-12" },
                t
              )
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-9" },
              r.a.createElement(s.a, {
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
      (c.defaultProps = { value: "", errorMessage: "" }),
        (c.propTypes = {
          label: o.a.string.isRequired,
          type: o.a.string,
          id: o.a.string,
          placeholder: o.a.string,
          value: o.a.string,
          onChangeAction: o.a.func
        }),
        (t.a = c);
    }
  }
]);
