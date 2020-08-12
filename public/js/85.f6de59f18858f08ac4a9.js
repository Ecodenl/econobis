(window.webpackJsonp = window.webpackJsonp || []).push([
  [85],
  {
    1471: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        o = a(25),
        s = a.n(o),
        i = a(22),
        c = a.n(i),
        l = a(26),
        u = a.n(l),
        d = a(27),
        m = a.n(d),
        p = a(16),
        f = a.n(p),
        v = a(6),
        h = a.n(v),
        g = a(0),
        b = a.n(g),
        y = a(4),
        E = a(693),
        C = function(e) {
          var t = e.description;
          return b.a.createElement(
            "div",
            { className: "row" },
            b.a.createElement(
              "div",
              { className: "col-md-4" },
              b.a.createElement(
                "div",
                {
                  className: "btn-group btn-group-flex margin-small",
                  role: "group"
                },
                b.a.createElement(E.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: y.e.goBack
                })
              )
            ),
            b.a.createElement(
              "div",
              { className: "col-md-4" },
              b.a.createElement(
                "h4",
                { className: "text-center" },
                "BTW code: ",
                t
              )
            ),
            b.a.createElement("div", { className: "col-md-4" })
          );
        },
        N = a(198),
        D = a(199),
        w = a.n(D),
        O = a(32),
        S = a(697),
        k = a.n(S),
        j = a(7),
        T = a.n(j),
        A = a(694),
        P = a(692),
        R = a(690),
        L = a(691),
        x = a(809),
        M = a(699),
        q = a(14),
        B = a(201);
      function z(e, t) {
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
      function V(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? z(Object(a), !0).forEach(function(t) {
                h()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : z(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function F(e) {
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
      T.a.locale("nl");
      var I = (function(e) {
          u()(a, e);
          var t = F(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              h()(c()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  V(
                    V({}, n.state),
                    {},
                    { vatCode: V(V({}, n.state.vatCode), {}, h()({}, r, a)) }
                  )
                );
              }),
              h()(c()(n), "handleInputChangeDate", function(e, t) {
                n.setState(
                  V(
                    V({}, n.state),
                    {},
                    { vatCode: V(V({}, n.state.vatCode), {}, h()({}, t, e)) }
                  )
                );
              }),
              h()(c()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.vatCode,
                  a = {},
                  r = !1;
                k.a.isEmpty(t.startDate) && ((a.startDate = !0), (r = !0)),
                  k.a.isEmpty(t.description) &&
                    ((a.description = !0), (r = !0)),
                  k.a.isEmpty(t.percentage.toString()) &&
                    ((a.percentage = !0), (r = !0)),
                  n.setState(V(V({}, n.state), {}, { errors: a })),
                  !r &&
                    x.a
                      .updateVatCode(t)
                      .then(function(e) {
                        n.props.updateState(t),
                          n.props.fetchSystemData(),
                          n.props.switchToView();
                      })
                      .catch(function(e) {
                        alert(
                          "Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals."
                        );
                      });
              }),
              (n.state = {
                vatCode: V({}, e.vatCode),
                errors: { startDate: !1, description: !1, percentage: !1 }
              }),
              n
            );
          }
          return (
            s()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.vatCode,
                    t = e.startDate,
                    a = e.description,
                    n = e.percentage,
                    r = e.twinfieldCode,
                    o = e.twinfieldLedgerCode;
                  return b.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    b.a.createElement(
                      R.a,
                      null,
                      b.a.createElement(
                        L.a,
                        null,
                        b.a.createElement(
                          "div",
                          { className: "row" },
                          b.a.createElement(M.a, {
                            label: "Startdatum",
                            name: "startDate",
                            value: t,
                            onChangeAction: this.handleInputChangeDate,
                            required: "required",
                            error: this.state.errors.startDate
                          }),
                          b.a.createElement(A.a, {
                            label: "Omschrijving",
                            name: "description",
                            value: a,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.description
                          })
                        ),
                        b.a.createElement(
                          "div",
                          { className: "row" },
                          b.a.createElement(A.a, {
                            type: "number",
                            label: "Percentage",
                            name: "percentage",
                            value: n,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.percentage
                          }),
                          b.a.createElement(A.a, {
                            label: "Twinfield code",
                            name: "twinfieldCode",
                            value: r,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        b.a.createElement(
                          "div",
                          { className: "row" },
                          b.a.createElement(A.a, {
                            label: "Twinfield grootboek code",
                            name: "twinfieldLedgerCode",
                            value: o,
                            onChangeAction: this.handleInputChange
                          })
                        )
                      ),
                      b.a.createElement(
                        L.a,
                        null,
                        b.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          b.a.createElement(P.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Sluiten",
                            onClickAction: this.props.switchToView
                          }),
                          b.a.createElement(P.a, {
                            buttonText: "Opslaan",
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
        })(g.Component),
        Y = Object(O.b)(null, function(e) {
          return Object(q.b)({ fetchSystemData: B.a }, e);
        })(I),
        W = a(695),
        J = function(e) {
          var t = e.startDate,
            a = e.description,
            n = e.percentage,
            r = e.twinfieldCode,
            o = e.twinfieldLedgerCode,
            s = e.switchToEdit;
          return b.a.createElement(
            "div",
            { onClick: s },
            b.a.createElement(
              R.a,
              null,
              b.a.createElement(
                L.a,
                null,
                b.a.createElement(
                  "div",
                  { className: "row" },
                  b.a.createElement(W.a, {
                    label: "Startdatum",
                    value: t && T()(t).format("L")
                  }),
                  b.a.createElement(W.a, { label: "Omschrijving", value: a })
                ),
                b.a.createElement(
                  "div",
                  { className: "row" },
                  b.a.createElement(W.a, {
                    label: "Percentage",
                    value: "".concat(n, "%")
                  }),
                  b.a.createElement(W.a, { label: "Twinfield code", value: r })
                ),
                b.a.createElement(
                  "div",
                  { className: "row" },
                  b.a.createElement(W.a, {
                    label: "Twinfield grootboek code",
                    value: o
                  })
                )
              )
            )
          );
        };
      function G(e) {
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
      var H = (function(e) {
          u()(a, e);
          var t = G(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              h()(c()(n), "switchToEdit", function() {
                n.setState({});
              }),
              h()(c()(n), "switchToView", function() {
                n.setState({ showEdit: !1, activeDiv: "" });
              }),
              (n.state = { showEdit: !1, activeDiv: "" }),
              n
            );
          }
          return (
            s()(a, [
              {
                key: "onDivEnter",
                value: function() {
                  this.setState({ activeDiv: "panel-grey" });
                }
              },
              {
                key: "onDivLeave",
                value: function() {
                  this.state.showEdit || this.setState({ activeDiv: "" });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.meDetails.permissions,
                    a = void 0 === t ? {} : t;
                  return b.a.createElement(
                    "div",
                    {
                      className: this.state.activeDiv,
                      onMouseEnter: function() {
                        return e.onDivEnter();
                      },
                      onMouseLeave: function() {
                        return e.onDivLeave();
                      }
                    },
                    this.state.showEdit && a.manageFinancial
                      ? b.a.createElement(Y, {
                          vatCode: this.props.vatCode,
                          switchToView: this.switchToView,
                          updateState: this.props.updateState
                        })
                      : b.a.createElement(
                          J,
                          w()({}, this.props.vatCode, {
                            switchToEdit: this.switchToEdit
                          })
                        )
                  );
                }
              }
            ]),
            a
          );
        })(g.Component),
        U = Object(O.b)(function(e) {
          return {
            meDetails: e.meDetails,
            permissions: e.meDetails.permissions
          };
        })(H),
        K = function(e) {
          var t = e.vatCode,
            a = e.hasError,
            n = e.isLoading,
            r = e.updateState,
            o = "",
            s = !0;
          return (
            a
              ? (o = "Fout bij het ophalen van BTW code.")
              : n
              ? (o = "Gegevens aan het laden.")
              : Object(N.isEmpty)(t)
              ? (o = "Geen BTW code gevonden!")
              : (s = !1),
            s
              ? b.a.createElement("div", null, o)
              : b.a.createElement(
                  "div",
                  null,
                  b.a.createElement(U, { vatCode: t, updateState: r })
                )
          );
        };
      function Q(e, t) {
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
      function X(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Q(Object(a), !0).forEach(function(t) {
                h()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Q(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Z(e) {
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
      var $ = (function(e) {
        u()(a, e);
        var t = Z(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            h()(c()(n), "callFetchVatCodeDetails", function() {
              n.setState({ isLoading: !0, hasError: !1 }),
                x.a
                  .fetchVatCodeDetails(n.props.params.id)
                  .then(function(e) {
                    n.setState({
                      isLoading: !1,
                      vatCode: X(
                        X({}, e.data.data),
                        {},
                        {
                          startDate: e.data.data.startDate
                            ? T()(e.data.data.startDate).format("Y-MM-DD")
                            : ""
                        }
                      )
                    });
                  })
                  .catch(function(e) {
                    n.setState({ isLoading: !1, hasError: !0 });
                  });
            }),
            h()(c()(n), "updateState", function(e) {
              n.setState({ vatCode: e });
            }),
            (n.state = { vatCode: {}, isLoading: !1, hasError: !1 }),
            n
          );
        }
        return (
          s()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.callFetchVatCodeDetails();
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
                      { className: "col-md-12 margin-10-top" },
                      b.a.createElement(
                        R.a,
                        null,
                        b.a.createElement(
                          L.a,
                          { className: "panel-small" },
                          b.a.createElement(C, {
                            description: this.state.vatCode.description || ""
                          })
                        )
                      )
                    ),
                    b.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      b.a.createElement(K, {
                        vatCode: this.state.vatCode,
                        isLoading: this.state.isLoading,
                        hasError: this.state.hasError,
                        updateState: this.updateState
                      })
                    )
                  ),
                  b.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          a
        );
      })(g.Component);
      t.default = $;
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        i = function(e) {
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
        (t.a = i);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        i = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (i.defaultProps = { className: "" }),
        (i.propTypes = { className: s.a.string }),
        (t.a = i);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        i = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            o = e.type,
            s = e.value,
            i = e.loading,
            c = e.loadText,
            l = e.disabled;
          return i
            ? r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: s,
                  disabled: i
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
                  type: o,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: s,
                  disabled: l
                },
                a
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
        (t.a = i);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        i = function(e) {
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
        (t.a = i);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        i = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            o = e.size,
            s = e.id,
            i = e.placeholder,
            c = e.name,
            l = e.value,
            u = e.onClickAction,
            d = e.onChangeAction,
            m = e.onBlurAction,
            p = e.required,
            f = e.readOnly,
            v = e.maxLength,
            h = e.error,
            g = e.min,
            b = e.max,
            y = e.step,
            E = e.errorMessage,
            C = e.divSize,
            N = e.divClassName,
            D = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(C, " ").concat(N) },
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
                  "form-control input-sm ".concat(n) + (h ? "has-error" : ""),
                id: s,
                placeholder: i,
                name: c,
                value: l,
                onClick: u,
                onChange: d,
                onBlur: m,
                readOnly: f,
                maxLength: v,
                min: g,
                max: b,
                autoComplete: D,
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
                  E
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
        (t.a = i);
    },
    695: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(4),
        s = a(8),
        i = a.n(s),
        c = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            s = e.value,
            i = e.link,
            c = e.hidden;
          return i.length > 0
            ? r.a.createElement(
                "div",
                { className: a, style: c ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement(
                  "div",
                  { className: "col-sm-6", id: n, onClick: null },
                  r.a.createElement(
                    o.b,
                    { to: i, className: "link-underline" },
                    s
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: a, style: c ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement("div", { className: "col-sm-6", id: n }, s)
              );
        };
      (c.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (c.propTypes = {
          label: i.a.oneOfType([i.a.string, i.a.object]).isRequired,
          className: i.a.string,
          id: i.a.string,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          link: i.a.string,
          hidden: i.a.bool
        }),
        (t.a = c);
    },
    699: function(e, t, a) {
      "use strict";
      var n = a(24),
        r = a.n(n),
        o = a(25),
        s = a.n(o),
        i = a(22),
        c = a.n(i),
        l = a(26),
        u = a.n(l),
        d = a(27),
        m = a.n(d),
        p = a(16),
        f = a.n(p),
        v = a(6),
        h = a.n(v),
        g = a(0),
        b = a.n(g),
        y = a(8),
        E = a.n(y),
        C = a(707),
        N = a.n(C),
        D = a(708),
        w = a.n(D),
        O = a(7),
        S = a.n(O);
      function k(e) {
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
      S.a.locale("nl");
      var j = (function(e) {
        u()(a, e);
        var t = k(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            h()(c()(n), "validateDate", function(e) {
              var t = S()(e.target.value, "DD-MM-YYYY", !0),
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
            h()(c()(n), "onDateChange", function(e) {
              var t = e ? S()(e).format("Y-MM-DD") : "",
                a = !1;
              t &&
                n.props.disabledBefore &&
                S()(t).isBefore(n.props.disabledBefore) &&
                (a = !0),
                t &&
                  n.props.disabledAfter &&
                  S()(t).isAfter(n.props.disabledAfter) &&
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
                  i = e.required,
                  c = e.readOnly,
                  l = e.name,
                  u = e.error,
                  d = e.errorMessage,
                  m = e.disabledBefore,
                  p = e.disabledAfter,
                  f = s ? S()(s).format("L") : "",
                  v = {};
                return (
                  m && (v.before = new Date(m)),
                  p && (v.after = new Date(p)),
                  b.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    b.a.createElement(
                      "div",
                      null,
                      b.a.createElement(
                        "label",
                        { htmlFor: o, className: "col-sm-6 ".concat(i) },
                        t
                      )
                    ),
                    b.a.createElement(
                      "div",
                      { className: "".concat(n) },
                      b.a.createElement(N.a, {
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
                          disabledDays: v
                        },
                        inputProps: {
                          className:
                            "form-control input-sm ".concat(a) +
                            (this.state.errorDateFormat || u
                              ? " has-error"
                              : ""),
                          name: l,
                          onBlur: this.validateDate,
                          autoComplete: "off",
                          readOnly: c,
                          disabled: c
                        },
                        required: i,
                        readOnly: c,
                        placeholder: ""
                      })
                    ),
                    u &&
                      b.a.createElement(
                        "div",
                        { className: "col-sm-offset-6 col-sm-6" },
                        b.a.createElement(
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
      })(g.Component);
      (j.defaultProps = {
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
        (j.propTypes = {
          label: E.a.string.isRequired,
          type: E.a.string,
          className: E.a.string,
          size: E.a.string,
          divSize: E.a.string,
          id: E.a.string,
          name: E.a.string,
          value: E.a.oneOfType([E.a.string, E.a.object]),
          onChangeAction: E.a.func,
          required: E.a.string,
          readOnly: E.a.bool,
          error: E.a.bool,
          errorMessage: E.a.string,
          disabledBefore: E.a.string,
          disabledAfter: E.a.string
        }),
        (t.a = j);
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
