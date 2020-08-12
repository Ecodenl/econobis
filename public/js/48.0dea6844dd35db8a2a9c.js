(window.webpackJsonp = window.webpackJsonp || []).push([
  [48],
  {
    1524: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        i = a(25),
        o = a.n(i),
        c = a(22),
        s = a.n(c),
        l = a(26),
        u = a.n(l),
        d = a(27),
        p = a.n(d),
        m = a(16),
        h = a.n(m),
        f = a(6),
        v = a.n(f),
        g = a(0),
        b = a.n(g),
        y = a(697),
        k = a.n(y),
        C = a(4),
        N = a(690),
        E = a(691),
        T = a(693);
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
          return p()(this, a);
        };
      }
      var S = (function(e) {
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
                          E.a,
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
                              b.a.createElement(T.a, {
                                iconName: "glyphicon-arrow-left",
                                onClickAction: C.e.goBack
                              })
                            )
                          ),
                          b.a.createElement(
                            "div",
                            { className: "col-md-4" },
                            b.a.createElement(
                              "h3",
                              { className: "text-center table-title" },
                              "Nieuwe overdracht"
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
        A = a(32),
        P = a(7),
        D = a.n(P),
        w = a(699),
        j = a(692),
        x = a(702),
        R = a(694),
        M = a(700),
        I = a(709);
      D.a.locale("nl");
      var q = Object(A.b)(function(e) {
          return {
            participantProjectPayoutTypes:
              e.systemData.participantProjectPayoutTypes
          };
        })(function(e) {
          var t = e.participationTransfer,
            a = t.transferToContactId,
            n = t.participationsAmount,
            r = t.participationWorth,
            i = t.didSign,
            o = t.dateBook,
            c = e.participation;
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
                label: "Huidige participant",
                name: "currentParticipantName",
                value: c.contact ? c.contact.fullName : "",
                readOnly: !0
              }),
              b.a.createElement(I.a, {
                label: "Contact",
                name: "transferToContactId",
                options: e.contacts,
                value: a,
                onChangeAction: e.handleReactSelectChange,
                optionName: "fullName",
                multi: !1,
                isLoading: e.peekLoading.contacts,
                required: "required",
                error: e.errors.transferToContactId
              })
            ),
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(R.a, {
                label: "Project",
                name: "projectName",
                value: c.project ? c.project.name : "",
                readOnly: !0
              }),
              b.a.createElement(R.a, {
                type: "number",
                min: "0",
                max: c.participationsCurrent + "",
                label: "Aantal deelnames overdragen",
                name: "participationsAmount",
                value: n,
                onChangeAction: e.handleInputChange,
                required: "required",
                error: e.errors.participationsAmount
              })
            ),
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(R.a, {
                label: "Huidig aantal deelnames",
                name: "participationsCurrent",
                value: c.participationsCurrent,
                readOnly: !0
              }),
              b.a.createElement(R.a, {
                type: "number",
                min: "0",
                label: "Waarde per deelname",
                name: "participationWorth",
                value: r,
                onChangeAction: e.handleInputChange,
                required: "required",
                error: e.errors.participationWorth
              })
            ),
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(R.a, {
                label: "Waarde over te dragen deelnames",
                name: "participationsWorthTotal",
                value: n * r,
                readOnly: !0
              }),
              b.a.createElement(w.a, {
                label: "Overdrachtsdatum",
                name: "dateBook",
                value: o,
                onChangeAction: e.handleInputChangeDate
              })
            ),
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(M.a, {
                label: "Getekend document",
                name: "didSign",
                value: i,
                onChangeAction: e.handleInputChange,
                required: "required"
              }),
              e.errors.didSign &&
                b.a.createElement(
                  "div",
                  { className: "col-sm-10 col-md-offset-1 alert alert-danger" },
                  "Het document moet getekend zijn."
                )
            ),
            b.a.createElement(
              x.a,
              null,
              b.a.createElement(
                "div",
                { className: "pull-right btn-group", role: "group" },
                b.a.createElement(j.a, {
                  buttonText: "Opslaan",
                  onClickAction: e.handleSubmit,
                  type: "submit",
                  value: "Submit"
                })
              )
            )
          );
        }),
        B = a(153);
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
      function L(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? z(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
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
      function _(e) {
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
          return p()(this, a);
        };
      }
      var F = (function(e) {
        u()(a, e);
        var t = _(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            v()(s()(n), "handleInputChange", function(e) {
              var t = e.target,
                a = "checkbox" === t.type ? t.checked : t.value,
                r = t.name;
              n.setState(
                L(
                  L({}, n.state),
                  {},
                  {
                    participationTransfer: L(
                      L({}, n.state.participationTransfer),
                      {},
                      v()({}, r, a)
                    )
                  }
                )
              );
            }),
            v()(s()(n), "handleSubmit", function(e) {
              e.preventDefault();
              var t = n.state.participationTransfer,
                a = {},
                r = !1;
              k.a.isEmpty(t.transferToContactId + "") &&
                ((a.transferToContactId = !0), (r = !0)),
                k.a.isEmpty(t.participationsAmount + "") &&
                  ((a.participationsAmount = !0), (r = !0)),
                t.participationsAmount >
                  n.state.participation.participationsCurrent &&
                  ((a.participationsAmount = !0), (r = !0)),
                t.participationsAmount <= 0 &&
                  ((a.participationsAmount = !0), (r = !0)),
                k.a.isEmpty(t.participationWorth + "") &&
                  ((a.participationWorth = !0), (r = !0)),
                t.participationWorth < 0 &&
                  ((a.participationWorth = !0), (r = !0)),
                !1 === t.didSign && ((a.didSign = !0), (r = !0)),
                n.setState(L(L({}, n.state), {}, { errors: a })),
                !r &&
                  B.a.transferParticipation(t).then(function(e) {
                    C.f.push("/project/deelnemer/".concat(t.participationId));
                  });
            }),
            (n.state = {
              contacts: [],
              participation: {},
              participationTransfer: {
                participationId: e.params.participationId,
                transferToContactId: "",
                projectId: "",
                participationsAmount: 0,
                participationWorth: "",
                didSign: !1,
                dateBook: ""
              },
              errors: {
                transferToContactId: !1,
                participationsAmount: !1,
                participationWorth: !1,
                didSign: !1
              },
              peekLoading: { contacts: !0 }
            }),
            (n.handleInputChangeDate = n.handleInputChangeDate.bind(s()(n))),
            (n.handleReactSelectChange = n.handleReactSelectChange.bind(
              s()(n)
            )),
            n
          );
        }
        return (
          o()(a, [
            {
              key: "componentWillMount",
              value: function() {
                var e = this;
                B.a
                  .getContactsMembershipPeek(
                    this.state.participationTransfer.participationId
                  )
                  .then(function(t) {
                    t.unshift({
                      id: "0",
                      fullName: "Teruggave energieleverancier"
                    }),
                      e.setState({
                        contacts: t,
                        peekLoading: L(
                          L({}, e.state.peekLoading),
                          {},
                          { contacts: !1 }
                        )
                      });
                  }),
                  B.a
                    .fetchParticipantProject(
                      this.state.participationTransfer.participationId
                    )
                    .then(function(t) {
                      e.setState({
                        participation: t,
                        participationTransfer: L(
                          L({}, e.state.participationTransfer),
                          {},
                          {
                            projectId: t.project.id,
                            participationWorth: t.project.participationWorth
                          }
                        )
                      });
                    });
              }
            },
            {
              key: "handleInputChangeDate",
              value: function(e, t) {
                this.setState(
                  L(
                    L({}, this.state),
                    {},
                    {
                      participationTransfer: L(
                        L({}, this.state.participationTransfer),
                        {},
                        v()({}, t, e)
                      )
                    }
                  )
                );
              }
            },
            {
              key: "handleReactSelectChange",
              value: function(e, t) {
                this.setState(
                  L(
                    L({}, this.state),
                    {},
                    {
                      participationTransfer: L(
                        L({}, this.state.participationTransfer),
                        {},
                        v()({}, t, e)
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
                        N.a,
                        null,
                        b.a.createElement(
                          E.a,
                          null,
                          b.a.createElement(
                            "div",
                            { className: "col-md-12" },
                            b.a.createElement(q, {
                              participationTransfer: this.state
                                .participationTransfer,
                              errors: this.state.errors,
                              handleInputChange: this.handleInputChange,
                              handleInputChangeDate: this.handleInputChangeDate,
                              handleSubmit: this.handleSubmit,
                              contacts: this.state.contacts,
                              participation: this.state.participation,
                              peekLoading: this.state.peekLoading,
                              handleReactSelectChange: this
                                .handleReactSelectChange
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
      })(g.Component);
      t.default = F;
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        c = function(e) {
          var t = e.children,
            a = e.className,
            n = e.onMouseEnter,
            i = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: i
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
          className: o.a.string,
          onMouseEnter: o.a.func,
          onMouseLeave: o.a.func
        }),
        (t.a = c);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
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
        (c.propTypes = { className: o.a.string }),
        (t.a = c);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        c = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            i = e.type,
            o = e.value,
            c = e.loading,
            s = e.loadText,
            l = e.disabled;
          return c
            ? r.a.createElement(
                "button",
                {
                  type: i,
                  className: "btn btn-sm btn-loading ".concat(t),
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
                  type: i,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: o,
                  disabled: l
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
          buttonClassName: o.a.string,
          buttonText: o.a.string.isRequired,
          onClickAction: o.a.func,
          type: o.a.string,
          value: o.a.string,
          loading: o.a.bool,
          loadText: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = c);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        c = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            i = e.title,
            o = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: o,
              title: i
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
          buttonClassName: o.a.string,
          iconName: o.a.string.isRequired,
          onClickAction: o.a.func,
          title: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = c);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        c = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            i = e.size,
            o = e.id,
            c = e.placeholder,
            s = e.name,
            l = e.value,
            u = e.onClickAction,
            d = e.onChangeAction,
            p = e.onBlurAction,
            m = e.required,
            h = e.readOnly,
            f = e.maxLength,
            v = e.error,
            g = e.min,
            b = e.max,
            y = e.step,
            k = e.errorMessage,
            C = e.divSize,
            N = e.divClassName,
            E = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(C, " ").concat(N) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(m) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(i) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (v ? "has-error" : ""),
                id: o,
                placeholder: c,
                name: s,
                value: l,
                onClick: u,
                onChange: d,
                onBlur: p,
                readOnly: h,
                maxLength: f,
                min: g,
                max: b,
                autoComplete: E,
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
                  k
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
        (t.a = c);
    },
    699: function(e, t, a) {
      "use strict";
      var n = a(24),
        r = a.n(n),
        i = a(25),
        o = a.n(i),
        c = a(22),
        s = a.n(c),
        l = a(26),
        u = a.n(l),
        d = a(27),
        p = a.n(d),
        m = a(16),
        h = a.n(m),
        f = a(6),
        v = a.n(f),
        g = a(0),
        b = a.n(g),
        y = a(8),
        k = a.n(y),
        C = a(707),
        N = a.n(C),
        E = a(708),
        T = a.n(E),
        O = a(7),
        S = a.n(O);
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
            n = h()(e);
          if (t) {
            var r = h()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return p()(this, a);
        };
      }
      S.a.locale("nl");
      var P = (function(e) {
        u()(a, e);
        var t = A(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            v()(s()(n), "validateDate", function(e) {
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
            v()(s()(n), "onDateChange", function(e) {
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
          o()(a, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.label,
                  a = e.className,
                  n = e.size,
                  r = e.divSize,
                  i = e.id,
                  o = e.value,
                  c = e.required,
                  s = e.readOnly,
                  l = e.name,
                  u = e.error,
                  d = e.errorMessage,
                  p = e.disabledBefore,
                  m = e.disabledAfter,
                  h = o ? S()(o).format("L") : "",
                  f = {};
                return (
                  p && (f.before = new Date(p)),
                  m && (f.after = new Date(m)),
                  b.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    b.a.createElement(
                      "div",
                      null,
                      b.a.createElement(
                        "label",
                        { htmlFor: i, className: "col-sm-6 ".concat(c) },
                        t
                      )
                    ),
                    b.a.createElement(
                      "div",
                      { className: "".concat(n) },
                      b.a.createElement(N.a, {
                        id: i,
                        value: h,
                        formatDate: E.formatDate,
                        parseDate: E.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: T.a,
                          disabledDays: f
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
                          readOnly: s,
                          disabled: s
                        },
                        required: c,
                        readOnly: s,
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
      (P.defaultProps = {
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
        (P.propTypes = {
          label: k.a.string.isRequired,
          type: k.a.string,
          className: k.a.string,
          size: k.a.string,
          divSize: k.a.string,
          id: k.a.string,
          name: k.a.string,
          value: k.a.oneOfType([k.a.string, k.a.object]),
          onChangeAction: k.a.func,
          required: k.a.string,
          readOnly: k.a.bool,
          error: k.a.bool,
          errorMessage: k.a.string,
          disabledBefore: k.a.string,
          disabledAfter: k.a.string
        }),
        (t.a = P);
    },
    700: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        c = a(703),
        s = a.n(c),
        l = function(e) {
          var t = e.label,
            a = e.size,
            n = e.id,
            i = e.name,
            o = e.value,
            c = e.onChangeAction,
            l = e.required,
            u = e.divSize,
            d = e.className,
            p = e.disabled;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(u, " ").concat(d) },
            r.a.createElement(
              "div",
              null,
              r.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(l) },
                t
              )
            ),
            r.a.createElement(
              "div",
              { className: "".concat(a) },
              r.a.createElement(s.a, {
                id: n,
                name: i,
                onChange: c,
                checked: o,
                disabled: p
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
        (t.a = l);
    },
    702: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
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
        (c.propTypes = { className: o.a.string }),
        (t.a = c);
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
        i = a(0),
        o = p(i),
        c = p(a(710)),
        s = p(a(8)),
        l = p(a(704)),
        u = p(a(705)),
        d = a(706);
      function p(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var m = (function(e) {
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
                  i = (0, c.default)(
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
                    className: i,
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
      })(i.PureComponent);
      (t.default = m),
        (m.displayName = "Toggle"),
        (m.defaultProps = {
          icons: {
            checked: o.default.createElement(l.default, null),
            unchecked: o.default.createElement(u.default, null)
          }
        }),
        (m.propTypes = {
          checked: s.default.bool,
          disabled: s.default.bool,
          defaultChecked: s.default.bool,
          onChange: s.default.func,
          onFocus: s.default.func,
          onBlur: s.default.func,
          className: s.default.string,
          name: s.default.string,
          value: s.default.string,
          id: s.default.string,
          "aria-labelledby": s.default.string,
          "aria-label": s.default.string,
          icons: s.default.oneOfType([
            s.default.bool,
            s.default.shape({
              checked: s.default.node,
              unchecked: s.default.node
            })
          ])
        });
    },
    704: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        r = a(0),
        i = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
        return i.default.createElement(
          "svg",
          { width: "14", height: "11", viewBox: "0 0 14 11" },
          i.default.createElement("title", null, "switch-check"),
          i.default.createElement("path", {
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
        i = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
        return i.default.createElement(
          "svg",
          { width: "10", height: "10", viewBox: "0 0 10 10" },
          i.default.createElement("title", null, "switch-x"),
          i.default.createElement("path", {
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
    709: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        c = a(714),
        s =
          (a(715),
          function(e) {
            var t = e.label,
              a = e.divSize,
              n = e.size,
              i = e.id,
              o = e.name,
              s = e.value,
              l = e.options,
              u = e.optionId,
              d = e.optionName,
              p = e.onChangeAction,
              m = e.required,
              h = e.multi,
              f = e.error,
              v = e.isLoading;
            return r.a.createElement(
              "div",
              { className: "form-group ".concat(a) },
              r.a.createElement(
                "label",
                { htmlFor: i, className: "col-sm-6 ".concat(m) },
                t
              ),
              r.a.createElement(
                "div",
                { className: "".concat(n) },
                r.a.createElement(c.a, {
                  id: i,
                  name: o,
                  value: s,
                  onChange: function(e) {
                    p(e || "", o);
                  },
                  options: l,
                  valueKey: u,
                  labelKey: d,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: h,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: f ? " has-error" : "",
                  isLoading: v
                })
              )
            );
          });
      (s.defaultProps = {
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
        (s.propTypes = {
          label: o.a.string.isRequired,
          className: o.a.string,
          size: o.a.string,
          divSize: o.a.string,
          id: o.a.string,
          name: o.a.string.isRequired,
          options: o.a.array.isRequired,
          optionId: o.a.string,
          optionName: o.a.string,
          value: o.a.oneOfType([o.a.string, o.a.number]),
          onChangeAction: o.a.func,
          onBlurAction: o.a.func,
          required: o.a.string,
          readOnly: o.a.bool,
          error: o.a.bool,
          multi: o.a.bool,
          isLoading: o.a.bool
        }),
        (t.a = s);
    }
  }
]);
