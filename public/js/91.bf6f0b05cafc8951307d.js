(window.webpackJsonp = window.webpackJsonp || []).push([
  [91],
  {
    1506: function(e, a, t) {
      "use strict";
      t.r(a);
      var n = t(0),
        r = t.n(n),
        o = t(24),
        s = t.n(o),
        i = t(25),
        l = t.n(i),
        c = t(22),
        m = t.n(c),
        u = t(26),
        d = t.n(u),
        p = t(27),
        g = t.n(p),
        h = t(16),
        v = t.n(h),
        f = t(6),
        y = t.n(f),
        b = t(4),
        N = t(697),
        E = t.n(N),
        C = t(694),
        I = t(692),
        q = t(691),
        O = t(690),
        T = t(80),
        w = t(32),
        A = t(696),
        k = (t(406), t(709));
      function x(e, a) {
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
      function P(e) {
        for (var a = 1; a < arguments.length; a++) {
          var t = null != arguments[a] ? arguments[a] : {};
          a % 2
            ? x(Object(t), !0).forEach(function(a) {
                y()(e, a, t[a]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : x(Object(t)).forEach(function(a) {
                Object.defineProperty(
                  e,
                  a,
                  Object.getOwnPropertyDescriptor(t, a)
                );
              });
        }
        return e;
      }
      function S(e) {
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
          return g()(this, t);
        };
      }
      var j = (function(e) {
          d()(t, e);
          var a = S(t);
          function t(e) {
            var n;
            return (
              s()(this, t),
              (n = a.call(this, e)),
              y()(m()(n), "handleInputChange", function(e) {
                var a = e.target,
                  t = "checkbox" === a.type ? a.checked : a.value,
                  r = a.name;
                n.setState(
                  P(
                    P({}, n.state),
                    {},
                    { product: P(P({}, n.state.product), {}, y()({}, r, t)) }
                  )
                );
              }),
              y()(m()(n), "handleInputChangeDuration", function(e) {
                var a,
                  t = e.target,
                  r = "checkbox" === t.type ? t.checked : t.value,
                  o = t.name,
                  s = n.state.product.invoiceFrequencyId,
                  i = n.state.invoiceFrequencies;
                switch (r) {
                  case "none":
                    (i = [{ id: "once", name: "Eenmalig" }]), (s = "once");
                    break;
                  case "month":
                    (i = [
                      { id: "once", name: "Eenmalig" },
                      { id: "monthly", name: "Maand" }
                    ]),
                      ("quarterly" !== s &&
                        "yearly" !== s &&
                        "half-year" !== s) ||
                        (s = "monthly");
                    break;
                  case "quarter":
                    (i = [
                      { id: "once", name: "Eenmalig" },
                      { id: "monthly", name: "Maand" },
                      { id: "quarterly", name: "Kwartaal" }
                    ]),
                      ("yearly" !== s && "half-year" !== s) ||
                        (s = "quarterly");
                    break;
                  case "half_year":
                    (i = [
                      { id: "once", name: "Eenmalig" },
                      { id: "monthly", name: "Maand" },
                      { id: "quarterly", name: "Kwartaal" },
                      { id: "half-year", name: "Half jaar" }
                    ]),
                      "yearly" === s && (s = "half-year");
                    break;
                  default:
                    i = [
                      { id: "once", name: "Eenmalig" },
                      { id: "monthly", name: "Maand" },
                      { id: "quarterly", name: "Kwartaal" },
                      { id: "half-year", name: "Half jaar" },
                      { id: "yearly", name: "Jaar" }
                    ];
                }
                n.setState(
                  P(
                    P({}, n.state),
                    {},
                    {
                      invoiceFrequencies: i,
                      product: P(
                        P({}, n.state.product),
                        {},
                        ((a = {}),
                        y()(a, o, r),
                        y()(a, "invoiceFrequencyId", s),
                        a)
                      )
                    }
                  )
                );
              }),
              y()(m()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var a = n.state.product,
                  t = {},
                  r = !1,
                  o = !1,
                  s = !1;
                n.props.products.map(function(e) {
                  return e.code == a.code && (s = !0);
                }),
                  s &&
                    ((r = "Productcode moet uniek zijn."),
                    (t.code = !0),
                    (o = !0)),
                  E.a.isEmpty(a.code + "") && ((t.code = !0), (o = !0)),
                  n.props.usesTwinfield &&
                    E.a.isEmpty(String(a.ledgerId)) &&
                    ((t.ledgerId = !0), (o = !0));
                var i = !1;
                n.props.products.map(function(e) {
                  return e.name == a.name && (i = !0);
                }),
                  i &&
                    ((r = "Productnaam moet uniek zijn."),
                    (t.name = !0),
                    (o = !0)),
                  s &&
                    i &&
                    (r = "Productcode en productnaam moeten uniek zijn."),
                  E.a.isEmpty(a.name + "") && ((t.name = !0), (o = !0)),
                  E.a.isEmpty(a.administrationId + "") &&
                    ((t.administrationId = !0), (o = !0)),
                  n.setState(
                    P(P({}, n.state), {}, { errors: t, errorMessage: r })
                  ),
                  o ||
                    T.a
                      .newProduct(a)
                      .then(function(e) {
                        b.f.push("/product/".concat(e.data.id));
                      })
                      .catch(function(e) {
                        console.log(e);
                      });
              }),
              (n.state = {
                errorMessage: !1,
                invoiceFrequencies: [{ id: "once", name: "Eenmalig" }],
                product: {
                  code: "",
                  name: "",
                  invoiceText: "",
                  durationId: "none",
                  invoiceFrequencyId: "once",
                  paymentTypeId: "",
                  administrationId: "",
                  ledgerId: "",
                  costCenterId: ""
                },
                errors: {
                  code: !1,
                  name: !1,
                  administrationId: !1,
                  ledgerId: !1,
                  costCenterId: !1
                }
              }),
              (n.handleReactSelectChange = n.handleReactSelectChange.bind(
                m()(n)
              )),
              n
            );
          }
          return (
            l()(t, [
              {
                key: "handleReactSelectChange",
                value: function(e, a) {
                  this.setState(
                    P(
                      P({}, this.state),
                      {},
                      {
                        product: P(P({}, this.state.product), {}, y()({}, a, e))
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.product,
                    a = e.code,
                    t = e.name,
                    n = e.invoiceText,
                    o = e.durationId,
                    s = e.invoiceFrequencyId,
                    i = e.paymentTypeId,
                    l = e.administrationId,
                    c = e.ledgerId,
                    m = e.costCenterId;
                  return r.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    r.a.createElement(
                      O.a,
                      null,
                      r.a.createElement(
                        q.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(C.a, {
                            label: "Productcode",
                            name: "code",
                            value: a,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.code
                          }),
                          r.a.createElement(C.a, {
                            label: "Naam",
                            name: "name",
                            value: t,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.name
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(
                            "div",
                            { className: "form-group col-sm-12" },
                            r.a.createElement(
                              "div",
                              { className: "row" },
                              r.a.createElement(
                                "div",
                                { className: "col-sm-3" },
                                r.a.createElement(
                                  "label",
                                  {
                                    htmlFor: "invoiceText",
                                    className: "col-sm-12"
                                  },
                                  "Omschrijving"
                                )
                              ),
                              r.a.createElement(
                                "div",
                                { className: "col-sm-8" },
                                r.a.createElement("textarea", {
                                  name: "invoiceText",
                                  value: n,
                                  onChange: this.handleInputChange,
                                  className: "form-control input-sm"
                                })
                              )
                            )
                          )
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(A.a, {
                            label: "Looptijd",
                            id: "durationId",
                            name: "durationId",
                            options: this.props.productDurations,
                            value: o,
                            onChangeAction: this.handleInputChangeDuration,
                            emptyOption: !1
                          }),
                          r.a.createElement(A.a, {
                            label: "Prijs per",
                            id: "invoiceFrequencyId",
                            name: "invoiceFrequencyId",
                            options: this.state.invoiceFrequencies,
                            value: s,
                            onChangeAction: this.handleInputChange,
                            emptyOption: !1
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(A.a, {
                            label: "Betaalwijze",
                            id: "paymentTypeId",
                            name: "paymentTypeId",
                            options: this.props.productPaymentTypes,
                            value: i,
                            onChangeAction: this.handleInputChange
                          }),
                          r.a.createElement(A.a, {
                            label: "Administratie",
                            id: "administrationId",
                            name: "administrationId",
                            options: this.props.administrations,
                            value: l,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.administrationId
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(k.a, {
                            label: "Grootboek",
                            name: "ledgerId",
                            options: this.props.ledgers,
                            optionName: "description",
                            value: c,
                            onChangeAction: this.handleReactSelectChange,
                            multi: !1,
                            required: this.props.usesTwinfield
                              ? "required"
                              : "",
                            error: this.state.errors.ledgerId
                          }),
                          r.a.createElement(k.a, {
                            label: "Kostenplaats",
                            name: "costCenterId",
                            options: this.props.costCenters,
                            optionName: "description",
                            value: m,
                            onChangeAction: this.handleReactSelectChange,
                            multi: !1
                          })
                        ),
                        this.state.errorMessage &&
                          r.a.createElement(
                            "div",
                            {
                              className:
                                "col-sm-10 col-md-offset-1 alert alert-danger"
                            },
                            this.state.errorMessage
                          )
                      ),
                      r.a.createElement(
                        q.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          r.a.createElement(I.a, {
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
        M = Object(w.b)(function(e) {
          return {
            productDurations: e.systemData.productDurations,
            productPaymentTypes: e.systemData.productPaymentTypes,
            administrations: e.meDetails.administrations,
            products: e.systemData.products,
            ledgers: e.systemData.ledgers,
            costCenters: e.systemData.costCenters,
            usesTwinfield: e.systemData.usesTwinfield
          };
        })(j),
        z = t(693),
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
                r.a.createElement(z.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: b.e.goBack
                })
              )
            ),
            r.a.createElement(
              "div",
              { className: "col-md-4" },
              r.a.createElement(
                "h4",
                { className: "text-center margin-small" },
                "Nieuw product"
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
                O.a,
                null,
                r.a.createElement(
                  q.a,
                  { className: "panel-small" },
                  r.a.createElement(R, null)
                )
              )
            ),
            r.a.createElement(
              "div",
              { className: "col-md-12 margin-10-top" },
              r.a.createElement(M, null)
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
        o = t(8),
        s = t.n(o),
        i = function(e) {
          var a = e.children,
            t = e.className,
            n = e.onMouseEnter,
            o = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(t),
              onMouseEnter: n,
              onMouseLeave: o
            },
            a
          );
        };
      (i.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (i.propTypes = {
          className: s.a.string,
          onMouseEnter: s.a.func,
          onMouseLeave: s.a.func
        }),
        (a.a = i);
    },
    691: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        o = t(8),
        s = t.n(o),
        i = function(e) {
          var a = e.className,
            t = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(a) },
            t
          );
        };
      (i.defaultProps = { className: "" }),
        (i.propTypes = { className: s.a.string }),
        (a.a = i);
    },
    692: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        o = t(8),
        s = t.n(o),
        i = function(e) {
          var a = e.buttonClassName,
            t = e.buttonText,
            n = e.onClickAction,
            o = e.type,
            s = e.value,
            i = e.loading,
            l = e.loadText,
            c = e.disabled;
          return i
            ? r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm btn-loading ".concat(a),
                  value: s,
                  disabled: i
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
                  type: o,
                  className: "btn btn-sm ".concat(a),
                  onClick: n,
                  value: s,
                  disabled: c
                },
                t
              );
        };
      (i.defaultProps = {
        buttonClassName: "btn-success",
        type: "button",
        value: "",
        loading: !1,
        loadText: "Aan het laden",
        disabled: !1
      }),
        (i.propTypes = {
          buttonClassName: s.a.string,
          buttonText: s.a.string.isRequired,
          onClickAction: s.a.func,
          type: s.a.string,
          value: s.a.string,
          loading: s.a.bool,
          loadText: s.a.string,
          disabled: s.a.bool
        }),
        (a.a = i);
    },
    693: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        o = t(8),
        s = t.n(o),
        i = function(e) {
          var a = e.buttonClassName,
            t = e.iconName,
            n = e.onClickAction,
            o = e.title,
            s = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(a),
              onClick: n,
              disabled: s,
              title: o
            },
            r.a.createElement("span", { className: "glyphicon ".concat(t) })
          );
        };
      (i.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (i.propTypes = {
          buttonClassName: s.a.string,
          iconName: s.a.string.isRequired,
          onClickAction: s.a.func,
          title: s.a.string,
          disabled: s.a.bool
        }),
        (a.a = i);
    },
    694: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        o = t(8),
        s = t.n(o),
        i = function(e) {
          var a = e.label,
            t = e.type,
            n = e.className,
            o = e.size,
            s = e.id,
            i = e.placeholder,
            l = e.name,
            c = e.value,
            m = e.onClickAction,
            u = e.onChangeAction,
            d = e.onBlurAction,
            p = e.required,
            g = e.readOnly,
            h = e.maxLength,
            v = e.error,
            f = e.min,
            y = e.max,
            b = e.step,
            N = e.errorMessage,
            E = e.divSize,
            C = e.divClassName,
            I = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(E, " ").concat(C) },
            r.a.createElement(
              "label",
              { htmlFor: s, className: "col-sm-6 ".concat(p) },
              a
            ),
            r.a.createElement(
              "div",
              { className: "".concat(o) },
              r.a.createElement("input", {
                type: t,
                className:
                  "form-control input-sm ".concat(n) + (v ? "has-error" : ""),
                id: s,
                placeholder: i,
                name: l,
                value: c,
                onClick: m,
                onChange: u,
                onBlur: d,
                readOnly: g,
                maxLength: h,
                min: f,
                max: y,
                autoComplete: I,
                step: b
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
      (i.defaultProps = {
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
        (i.propTypes = {
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
        (a.a = i);
    },
    696: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        o = t(8),
        s = t.n(o),
        i = function(e) {
          var a = e.label,
            t = e.className,
            n = e.size,
            o = e.id,
            s = e.name,
            i = e.value,
            l = e.options,
            c = e.onChangeAction,
            m = e.onBlurAction,
            u = e.required,
            d = e.error,
            p = e.errorMessage,
            g = e.optionValue,
            h = e.optionName,
            v = e.readOnly,
            f = e.placeholder,
            y = e.divClassName,
            b = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(y) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(u) },
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
                  id: o,
                  name: s,
                  value: i,
                  onChange: c,
                  onBlur: m,
                  readOnly: v
                },
                b && r.a.createElement("option", { value: "" }, f),
                l.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[g], value: e[g] },
                    e[h]
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
      (i.defaultProps = {
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
        (i.propTypes = {
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
        (a.a = i);
    },
    709: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        o = t(8),
        s = t.n(o),
        i = t(714),
        l =
          (t(715),
          function(e) {
            var a = e.label,
              t = e.divSize,
              n = e.size,
              o = e.id,
              s = e.name,
              l = e.value,
              c = e.options,
              m = e.optionId,
              u = e.optionName,
              d = e.onChangeAction,
              p = e.required,
              g = e.multi,
              h = e.error,
              v = e.isLoading;
            return r.a.createElement(
              "div",
              { className: "form-group ".concat(t) },
              r.a.createElement(
                "label",
                { htmlFor: o, className: "col-sm-6 ".concat(p) },
                a
              ),
              r.a.createElement(
                "div",
                { className: "".concat(n) },
                r.a.createElement(i.a, {
                  id: o,
                  name: s,
                  value: l,
                  onChange: function(e) {
                    d(e || "", s);
                  },
                  options: c,
                  valueKey: m,
                  labelKey: u,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: g,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: h ? " has-error" : "",
                  isLoading: v
                })
              )
            );
          });
      (l.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        optionId: "id",
        optionName: "name",
        readOnly: !1,
        required: "",
        error: !1,
        value: "",
        multi: !0,
        isLoading: !1
      }),
        (l.propTypes = {
          label: s.a.string.isRequired,
          className: s.a.string,
          size: s.a.string,
          divSize: s.a.string,
          id: s.a.string,
          name: s.a.string.isRequired,
          options: s.a.array.isRequired,
          optionId: s.a.string,
          optionName: s.a.string,
          value: s.a.oneOfType([s.a.string, s.a.number]),
          onChangeAction: s.a.func,
          onBlurAction: s.a.func,
          required: s.a.string,
          readOnly: s.a.bool,
          error: s.a.bool,
          multi: s.a.bool,
          isLoading: s.a.bool
        }),
        (a.a = l);
    }
  }
]);
