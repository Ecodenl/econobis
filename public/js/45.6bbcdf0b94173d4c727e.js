(window.webpackJsonp = window.webpackJsonp || []).push([
  [45],
  {
    1497: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        o = n(25),
        c = n.n(o),
        s = n(26),
        i = n.n(s),
        l = n(27),
        u = n.n(l),
        d = n(16),
        f = n.n(d),
        p = n(0),
        h = n.n(p),
        m = n(32),
        v = n(198),
        g = n(716),
        y = n(22),
        E = n.n(y),
        b = n(6),
        N = n.n(b),
        C = n(4),
        k = n(7),
        T = n.n(k),
        O = n(111),
        A = n(696),
        _ = n(692),
        S = n(694),
        D = n(700);
      function I(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          t &&
            (a = a.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, a);
        }
        return n;
      }
      function P(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? I(Object(n), !0).forEach(function(t) {
                N()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : I(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function R(e) {
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      T.a.locale("nl");
      var w = (function(e) {
          i()(n, e);
          var t = R(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              N()(E()(a), "handleInputChange", function(e) {
                var t = e.target,
                  n = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                a.setState(
                  P(
                    P({}, a.state),
                    {},
                    {
                      housingFile: P(
                        P({}, a.state.housingFile),
                        {},
                        N()({}, r, n)
                      )
                    }
                  )
                );
              }),
              N()(E()(a), "handleSubmit", function(e) {
                e.preventDefault();
                var t = a.state.housingFile;
                O.a.newHousingFile(t).then(function(e) {
                  C.f.push("/woningdossier/".concat(e.data.id));
                });
              }),
              (a.state = {
                housingFile: {
                  contactId: e.contactId,
                  addressId: e.addressId,
                  buildingTypeId: "",
                  buildYear: "",
                  surface: "",
                  roofTypeId: "",
                  energyLabelId: "",
                  floors: 0,
                  energyLabelStatusId: "",
                  isMonument: !1
                }
              }),
              a
            );
          }
          return (
            c()(n, [
              {
                key: "render",
                value: function() {
                  var e = this.state.housingFile,
                    t = e.addressId,
                    n = e.buildingTypeId,
                    a = e.buildYear,
                    r = e.surface,
                    o = e.roofTypeId,
                    c = e.energyLabelId,
                    s = e.floors,
                    i = e.energyLabelStatusId,
                    l = e.isMonument,
                    u = this.props.contactDetails,
                    d = u.addresses,
                    f = void 0 === d ? [] : d,
                    p = u.fullName;
                  return h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(S.a, {
                        label: "Contact",
                        name: "fullName",
                        value: p,
                        onChange: function() {},
                        readOnly: !0
                      }),
                      h.a.createElement(
                        "div",
                        { className: "form-group col-sm-6" },
                        h.a.createElement(
                          "label",
                          { htmlFor: "addressId", className: "col-sm-6" },
                          "Adres"
                        ),
                        h.a.createElement(
                          "div",
                          { className: "col-sm-6" },
                          h.a.createElement(
                            "select",
                            {
                              className: "form-control input-sm",
                              id: "addressId",
                              name: "addressId",
                              value: t,
                              onChange: this.handleInputChange
                            },
                            f.map(function(e, t) {
                              return h.a.createElement(
                                "option",
                                { key: t, value: e.id },
                                "".concat(e.street, " ").concat(e.number)
                              );
                            })
                          )
                        )
                      )
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(A.a, {
                        label: "Woningtype",
                        size: "col-sm-6",
                        name: "buildingTypeId",
                        value: n,
                        options: this.props.buildingTypes,
                        onChangeAction: this.handleInputChange
                      }),
                      h.a.createElement(S.a, {
                        type: "number",
                        label: "Bouwjaar",
                        name: "buildYear",
                        value: a,
                        min: "1901",
                        max: "3000",
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(S.a, {
                        type: "number",
                        label: "Gebruiksoppervlakte",
                        name: "surface",
                        value: r,
                        min: "0",
                        onChangeAction: this.handleInputChange
                      }),
                      h.a.createElement(A.a, {
                        label: "Daktype",
                        size: "col-sm-6",
                        name: "roofTypeId",
                        value: o,
                        options: this.props.roofTypes,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(A.a, {
                        label: "Energielabel",
                        size: "col-sm-6",
                        name: "energyLabelId",
                        value: c,
                        options: this.props.energyLabels,
                        onChangeAction: this.handleInputChange
                      }),
                      h.a.createElement(S.a, {
                        type: "number",
                        label: "Aantal bouwlagen",
                        name: "floors",
                        value: s,
                        min: "0",
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(A.a, {
                        label: "Status energielabel",
                        size: "col-sm-6",
                        name: "energyLabelStatusId",
                        value: i,
                        options: this.props.energyLabelStatus,
                        onChangeAction: this.handleInputChange
                      }),
                      h.a.createElement(D.a, {
                        label: "Monument",
                        name: "isMonument",
                        value: l,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "panel-footer" },
                      h.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        h.a.createElement(_.a, {
                          buttonText: "Opslaan",
                          onClickAction: this.handleSubmit
                        })
                      )
                    )
                  );
                }
              }
            ]),
            n
          );
        })(p.Component),
        M = Object(m.b)(function(e) {
          return {
            buildingTypes: e.systemData.buildingTypes,
            roofTypes: e.systemData.roofTypes,
            energyLabels: e.systemData.energyLabels,
            energyLabelStatus: e.systemData.energyLabelStatus,
            contactDetails: e.contactDetails
          };
        }, null)(w),
        L = n(690),
        x = n(691),
        j = function(e) {
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              L.a,
              null,
              h.a.createElement(
                x.a,
                null,
                h.a.createElement(M, {
                  contactId: e.contactId,
                  addressId: e.addressId
                })
              )
            )
          );
        },
        B = n(693),
        F = function(e) {
          return h.a.createElement(
            "div",
            { className: "row" },
            h.a.createElement(
              "div",
              { className: "col-md-4" },
              h.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                h.a.createElement(B.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: C.e.goBack
                })
              )
            ),
            h.a.createElement(
              "div",
              { className: "col-md-4" },
              h.a.createElement(
                "h4",
                { className: "text-center" },
                "Nieuw woningdossier"
              )
            ),
            h.a.createElement("div", { className: "col-md-4" })
          );
        };
      function U(e) {
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var z = (function(e) {
        i()(n, e);
        var t = U(n);
        function n(e) {
          return r()(this, n), t.call(this, e);
        }
        return (
          c()(n, [
            {
              key: "componentDidMount",
              value: function() {
                Object(v.isEmpty)(this.props.contactDetails) &&
                  this.props.fetchContactDetails(this.props.params.contactId);
              }
            },
            {
              key: "render",
              value: function() {
                return h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    h.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      h.a.createElement(F, {
                        contactId: this.props.params.contactId
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      h.a.createElement(j, {
                        contactId: this.props.params.contactId,
                        addressId: this.props.params.addressId
                      })
                    )
                  ),
                  h.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          n
        );
      })(p.Component);
      t.default = Object(m.b)(
        function(e) {
          return { contactDetails: e.contactDetails };
        },
        function(e) {
          return {
            fetchContactDetails: function(t) {
              e(Object(g.h)(t));
            }
          };
        }
      )(z);
    },
    690: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        s = function(e) {
          var t = e.children,
            n = e.className,
            a = e.onMouseEnter,
            o = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(n),
              onMouseEnter: a,
              onMouseLeave: o
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
          className: c.a.string,
          onMouseEnter: c.a.func,
          onMouseLeave: c.a.func
        }),
        (t.a = s);
    },
    691: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        s = function(e) {
          var t = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            n
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: c.a.string }),
        (t.a = s);
    },
    692: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        s = function(e) {
          var t = e.buttonClassName,
            n = e.buttonText,
            a = e.onClickAction,
            o = e.type,
            c = e.value,
            s = e.loading,
            i = e.loadText,
            l = e.disabled;
          return s
            ? r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: c,
                  disabled: s
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
                  onClick: a,
                  value: c,
                  disabled: l
                },
                n
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
          buttonClassName: c.a.string,
          buttonText: c.a.string.isRequired,
          onClickAction: c.a.func,
          type: c.a.string,
          value: c.a.string,
          loading: c.a.bool,
          loadText: c.a.string,
          disabled: c.a.bool
        }),
        (t.a = s);
    },
    693: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        s = function(e) {
          var t = e.buttonClassName,
            n = e.iconName,
            a = e.onClickAction,
            o = e.title,
            c = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: a,
              disabled: c,
              title: o
            },
            r.a.createElement("span", { className: "glyphicon ".concat(n) })
          );
        };
      (s.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (s.propTypes = {
          buttonClassName: c.a.string,
          iconName: c.a.string.isRequired,
          onClickAction: c.a.func,
          title: c.a.string,
          disabled: c.a.bool
        }),
        (t.a = s);
    },
    694: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        s = function(e) {
          var t = e.label,
            n = e.type,
            a = e.className,
            o = e.size,
            c = e.id,
            s = e.placeholder,
            i = e.name,
            l = e.value,
            u = e.onClickAction,
            d = e.onChangeAction,
            f = e.onBlurAction,
            p = e.required,
            h = e.readOnly,
            m = e.maxLength,
            v = e.error,
            g = e.min,
            y = e.max,
            E = e.step,
            b = e.errorMessage,
            N = e.divSize,
            C = e.divClassName,
            k = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(N, " ").concat(C) },
            r.a.createElement(
              "label",
              { htmlFor: c, className: "col-sm-6 ".concat(p) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(o) },
              r.a.createElement("input", {
                type: n,
                className:
                  "form-control input-sm ".concat(a) + (v ? "has-error" : ""),
                id: c,
                placeholder: s,
                name: i,
                value: l,
                onClick: u,
                onChange: d,
                onBlur: f,
                readOnly: h,
                maxLength: m,
                min: g,
                max: y,
                autoComplete: k,
                step: E
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
                  b
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
          label: c.a.oneOfType([c.a.string, c.a.object]).isRequired,
          type: c.a.string,
          className: c.a.string,
          divClassName: c.a.string,
          size: c.a.string,
          divSize: c.a.string,
          id: c.a.string,
          placeholder: c.a.string,
          name: c.a.string.isRequired,
          value: c.a.oneOfType([c.a.string, c.a.number]),
          onClickAction: c.a.func,
          onChangeAction: c.a.func,
          onBlurAction: c.a.func,
          required: c.a.string,
          readOnly: c.a.bool,
          maxLength: c.a.string,
          error: c.a.bool,
          min: c.a.string,
          max: c.a.string,
          step: c.a.string,
          errorMessage: c.a.string,
          autoComplete: c.a.string
        }),
        (t.a = s);
    },
    696: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        s = function(e) {
          var t = e.label,
            n = e.className,
            a = e.size,
            o = e.id,
            c = e.name,
            s = e.value,
            i = e.options,
            l = e.onChangeAction,
            u = e.onBlurAction,
            d = e.required,
            f = e.error,
            p = e.errorMessage,
            h = e.optionValue,
            m = e.optionName,
            v = e.readOnly,
            g = e.placeholder,
            y = e.divClassName,
            E = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(a, " ").concat(y) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(d) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-6" },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(n) + (f && " has-error"),
                  id: o,
                  name: c,
                  value: s,
                  onChange: l,
                  onBlur: u,
                  readOnly: v
                },
                E && r.a.createElement("option", { value: "" }, g),
                i.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[h], value: e[h] },
                    e[m]
                  );
                })
              )
            ),
            f &&
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
          label: c.a.string.isRequired,
          className: c.a.string,
          size: c.a.string,
          id: c.a.string,
          name: c.a.string.isRequired,
          options: c.a.array,
          value: c.a.oneOfType([c.a.string, c.a.number]),
          onChangeAction: c.a.func,
          onBlurAction: c.a.func,
          required: c.a.string,
          readOnly: c.a.bool,
          error: c.a.bool,
          errorMessage: c.a.string,
          emptyOption: c.a.bool,
          optionValue: c.a.string,
          optionName: c.a.string,
          placeholder: c.a.string
        }),
        (t.a = s);
    },
    700: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        s = n(703),
        i = n.n(s),
        l = function(e) {
          var t = e.label,
            n = e.size,
            a = e.id,
            o = e.name,
            c = e.value,
            s = e.onChangeAction,
            l = e.required,
            u = e.divSize,
            d = e.className,
            f = e.disabled;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(u, " ").concat(d) },
            r.a.createElement(
              "div",
              null,
              r.a.createElement(
                "label",
                { htmlFor: a, className: "col-sm-6 ".concat(l) },
                t
              )
            ),
            r.a.createElement(
              "div",
              { className: "".concat(n) },
              r.a.createElement(i.a, {
                id: a,
                name: o,
                onChange: s,
                checked: c,
                disabled: f
              })
            )
          );
        };
      (l.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        required: "",
        disabled: !1,
        value: null
      }),
        (l.propTypes = {
          label: c.a.string.isRequired,
          type: c.a.string,
          size: c.a.string,
          divSize: c.a.string,
          id: c.a.string,
          name: c.a.string.isRequired,
          value: c.a.bool,
          onChangeAction: c.a.func,
          required: c.a.string,
          disabled: c.a.bool
        }),
        (t.a = l);
    },
    703: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var a in n)
                Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
            }
            return e;
          },
        r = (function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var a = t[n];
              (a.enumerable = a.enumerable || !1),
                (a.configurable = !0),
                "value" in a && (a.writable = !0),
                Object.defineProperty(e, a.key, a);
            }
          }
          return function(t, n, a) {
            return n && e(t.prototype, n), a && e(t, a), t;
          };
        })(),
        o = n(0),
        c = f(o),
        s = f(n(710)),
        i = f(n(8)),
        l = f(n(704)),
        u = f(n(705)),
        d = n(706);
      function f(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var p = (function(e) {
        function t(e) {
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, t);
          var n = (function(e, t) {
            if (!e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return !t || ("object" != typeof t && "function" != typeof t)
              ? e
              : t;
          })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
          return (
            (n.handleClick = n.handleClick.bind(n)),
            (n.handleTouchStart = n.handleTouchStart.bind(n)),
            (n.handleTouchMove = n.handleTouchMove.bind(n)),
            (n.handleTouchEnd = n.handleTouchEnd.bind(n)),
            (n.handleFocus = n.handleFocus.bind(n)),
            (n.handleBlur = n.handleBlur.bind(n)),
            (n.previouslyChecked = !(!e.checked && !e.defaultChecked)),
            (n.state = {
              checked: !(!e.checked && !e.defaultChecked),
              hasFocus: !1
            }),
            n
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
                var n = this.props.hasOwnProperty("checked")
                  ? this.props.checked
                  : t.checked;
                this.setState({ checked: n });
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
                    var n = (0, d.pointerCoord)(e).x;
                    !0 === this.previouslyChecked && this.startX + 4 > n
                      ? this.previouslyChecked !== this.state.checked &&
                        (this.setState({ checked: !1 }),
                        (this.previouslyChecked = this.state.checked),
                        t.click())
                      : this.startX - 4 < n &&
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
                var n = this.props.icons;
                return n
                  ? void 0 === n[e]
                    ? t.defaultProps.icons[e]
                    : n[e]
                  : null;
              }
            },
            {
              key: "render",
              value: function() {
                var e = this,
                  t = this.props,
                  n = t.className,
                  r =
                    (t.icons,
                    (function(e, t) {
                      var n = {};
                      for (var a in e)
                        t.indexOf(a) >= 0 ||
                          (Object.prototype.hasOwnProperty.call(e, a) &&
                            (n[a] = e[a]));
                      return n;
                    })(t, ["className", "icons"])),
                  o = (0, s.default)(
                    "react-toggle",
                    {
                      "react-toggle--checked": this.state.checked,
                      "react-toggle--focus": this.state.hasFocus,
                      "react-toggle--disabled": this.props.disabled
                    },
                    n
                  );
                return c.default.createElement(
                  "div",
                  {
                    className: o,
                    onClick: this.handleClick,
                    onTouchStart: this.handleTouchStart,
                    onTouchMove: this.handleTouchMove,
                    onTouchEnd: this.handleTouchEnd
                  },
                  c.default.createElement(
                    "div",
                    { className: "react-toggle-track" },
                    c.default.createElement(
                      "div",
                      { className: "react-toggle-track-check" },
                      this.getIcon("checked")
                    ),
                    c.default.createElement(
                      "div",
                      { className: "react-toggle-track-x" },
                      this.getIcon("unchecked")
                    )
                  ),
                  c.default.createElement("div", {
                    className: "react-toggle-thumb"
                  }),
                  c.default.createElement(
                    "input",
                    a({}, r, {
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
      })(o.PureComponent);
      (t.default = p),
        (p.displayName = "Toggle"),
        (p.defaultProps = {
          icons: {
            checked: c.default.createElement(l.default, null),
            unchecked: c.default.createElement(u.default, null)
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
    704: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a,
        r = n(0),
        o = (a = r) && a.__esModule ? a : { default: a };
      t.default = function() {
        return o.default.createElement(
          "svg",
          { width: "14", height: "11", viewBox: "0 0 14 11" },
          o.default.createElement("title", null, "switch-check"),
          o.default.createElement("path", {
            d:
              "M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",
            fill: "#fff",
            fillRule: "evenodd"
          })
        );
      };
    },
    705: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a,
        r = n(0),
        o = (a = r) && a.__esModule ? a : { default: a };
      t.default = function() {
        return o.default.createElement(
          "svg",
          { width: "10", height: "10", viewBox: "0 0 10 10" },
          o.default.createElement("title", null, "switch-x"),
          o.default.createElement("path", {
            d:
              "M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",
            fill: "#fff",
            fillRule: "evenodd"
          })
        );
      };
    },
    706: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.pointerCoord = function(e) {
          if (e) {
            var t = e.changedTouches;
            if (t && t.length > 0) {
              var n = t[0];
              return { x: n.clientX, y: n.clientY };
            }
            var a = e.pageX;
            if (void 0 !== a) return { x: a, y: e.pageY };
          }
          return { x: 0, y: 0 };
        });
    },
    710: function(e, t, n) {
      var a;
      /*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/ !(function() {
        "use strict";
        var n = {}.hasOwnProperty;
        function r() {
          for (var e = [], t = 0; t < arguments.length; t++) {
            var a = arguments[t];
            if (a) {
              var o = typeof a;
              if ("string" === o || "number" === o) e.push(a);
              else if (Array.isArray(a) && a.length) {
                var c = r.apply(null, a);
                c && e.push(c);
              } else if ("object" === o)
                for (var s in a) n.call(a, s) && a[s] && e.push(s);
            }
          }
          return e.join(" ");
        }
        e.exports
          ? ((r.default = r), (e.exports = r))
          : void 0 ===
              (a = function() {
                return r;
              }.apply(t, [])) || (e.exports = a);
      })();
    },
    716: function(e, t, n) {
      "use strict";
      n.d(t, "h", function() {
        return a;
      }),
        n.d(t, "b", function() {
          return r;
        }),
        n.d(t, "v", function() {
          return o;
        }),
        n.d(t, "u", function() {
          return c;
        }),
        n.d(t, "x", function() {
          return s;
        }),
        n.d(t, "g", function() {
          return i;
        }),
        n.d(t, "i", function() {
          return l;
        }),
        n.d(t, "q", function() {
          return u;
        }),
        n.d(t, "a", function() {
          return d;
        }),
        n.d(t, "m", function() {
          return f;
        }),
        n.d(t, "w", function() {
          return p;
        }),
        n.d(t, "f", function() {
          return h;
        }),
        n.d(t, "k", function() {
          return m;
        }),
        n.d(t, "s", function() {
          return v;
        }),
        n.d(t, "d", function() {
          return g;
        }),
        n.d(t, "l", function() {
          return y;
        }),
        n.d(t, "t", function() {
          return E;
        }),
        n.d(t, "e", function() {
          return b;
        }),
        n.d(t, "n", function() {
          return N;
        }),
        n.d(t, "p", function() {
          return C;
        }),
        n.d(t, "o", function() {
          return k;
        }),
        n.d(t, "j", function() {
          return T;
        }),
        n.d(t, "r", function() {
          return O;
        }),
        n.d(t, "c", function() {
          return A;
        });
      var a = function(e) {
          return { type: "FETCH_CONTACT_DETAILS", payload: e };
        },
        r = function(e) {
          return { type: "DELETE_CONTACT", id: e };
        },
        o = function(e) {
          return { type: "UPDATE_PERSON", contactDetails: e };
        },
        c = function(e) {
          return { type: "UPDATE_ORGANISATION", contactDetails: e };
        },
        s = function(e) {
          return { type: "UPDATE_PORTAL_USER", portalUser: e };
        },
        i = function(e) {
          return { type: "DELETE_PORTAL_USER", id: e };
        },
        l = function(e) {
          return { type: "NEW_ADDRESS", address: e };
        },
        u = function(e) {
          return { type: "UPDATE_ADDRESS", address: e };
        },
        d = function(e) {
          return { type: "DELETE_ADDRESS", id: e };
        },
        f = function(e) {
          return { type: "NEW_PHONE_NUMBER", phoneNumber: e };
        },
        p = function(e) {
          return { type: "UPDATE_PHONE_NUMBER", phoneNumber: e };
        },
        h = function(e) {
          return { type: "DELETE_PHONE_NUMBER", id: e };
        },
        m = function(e) {
          return { type: "NEW_EMAIL_ADDRESS", emailAddress: e };
        },
        v = function(e) {
          return { type: "UPDATE_EMAIL_ADDRESS", emailAddress: e };
        },
        g = function(e) {
          return { type: "DELETE_EMAIL_ADDRESS", id: e };
        },
        y = function(e) {
          return { type: "NEW_CONTACT_NOTE", note: e };
        },
        E = function(e) {
          return { type: "UPDATE_CONTACT_NOTE", note: e };
        },
        b = function(e) {
          return { type: "DELETE_CONTACT_NOTE", id: e };
        },
        N = function() {
          return { type: "UNSET_PRIMARY_ADDRESSES" };
        },
        C = function() {
          return { type: "UNSET_PRIMARY_PHONE_NUMBERS" };
        },
        k = function() {
          return { type: "UNSET_PRIMARY_EMAIL_ADDRESSES" };
        },
        T = function(e) {
          return {
            type: "NEW_CONTACT_ENERGY_SUPPLIER",
            contactEnergySupplier: e
          };
        },
        O = function(e) {
          return {
            type: "UPDATE_CONTACT_ENERGY_SUPPLIER",
            contactEnergySupplier: e
          };
        },
        A = function(e) {
          return { type: "DELETE_CONTACT_ENERGY_SUPPLIER", id: e };
        };
    }
  }
]);
