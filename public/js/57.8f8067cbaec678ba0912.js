(window.webpackJsonp = window.webpackJsonp || []).push([
  [57],
  {
    1468: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        s = a(25),
        i = a.n(s),
        o = a(22),
        l = a.n(o),
        c = a(26),
        u = a.n(c),
        d = a(27),
        m = a.n(d),
        p = a(16),
        h = a.n(p),
        f = a(6),
        v = a.n(f),
        g = a(0),
        b = a.n(g),
        y = a(4),
        E = a(693),
        k = function(e) {
          var t = e.name;
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
                "Kans status: ",
                t
              )
            ),
            b.a.createElement("div", { className: "col-md-4" })
          );
        },
        S = a(198),
        N = a(199),
        O = a.n(N),
        w = a(32),
        T = a(7),
        C = a.n(T),
        j = a(694),
        D = a(692),
        P = a(690),
        z = a(691),
        x = a(12),
        R = {
          fld: [
            "id",
            "name",
            "usesWf",
            "emailTemplateIdWf",
            "numberOfDaysToSendEmail"
          ],
          rlt: { emailTemplateWorkflow: [] }
        },
        L = function(e) {
          var t = "jory/opportunity-status/".concat(e);
          return x.a.get(t, { params: { jory: R } });
        },
        M = function(e) {
          var t = "".concat("opportunity-status", "/").concat(e.id);
          return x.a.post(t, e, { params: { jory: R } });
        },
        A = a(14),
        q = a(201),
        F = a(700),
        _ = a(709),
        W = a(695),
        I = a(104),
        B = a(697),
        X = a.n(B);
      function V(e, t) {
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
      function G(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? V(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : V(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function J(e) {
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
      C.a.locale("nl");
      var K = (function(e) {
          u()(a, e);
          var t = J(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              v()(l()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  G(
                    G({}, n.state),
                    {},
                    {
                      opportunityStatus: G(
                        G({}, n.state.opportunityStatus),
                        {},
                        v()({}, r, a)
                      )
                    }
                  )
                );
              }),
              v()(l()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.opportunityStatus,
                  a = {},
                  r = !1;
                1 == t.usesWf &&
                  (t.emailTemplateIdWf ||
                    ((a.emailTemplateIdWf = !0), (r = !0)),
                  X.a.isEmpty(t.numberOfDaysToSendEmail.toString()) &&
                    ((a.numberOfDaysToSendEmail = !0), (r = !0))),
                  n.setState(G(G({}, n.state), {}, { errors: a })),
                  !r &&
                    M(t)
                      .then(function(e) {
                        n.props.updateState(e.data.data),
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
                emailTemplates: [],
                opportunityStatus: G({}, e.opportunityStatus),
                errors: {
                  usesWf: !1,
                  emailTemplateIdWf: !1,
                  numberOfDaysToSendEmail: !1
                },
                peekLoading: { emailTemplates: !0 }
              }),
              (n.handleReactSelectChange = n.handleReactSelectChange.bind(
                l()(n)
              )),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "handleReactSelectChange",
                value: function(e, t) {
                  this.setState(
                    G(
                      G({}, this.state),
                      {},
                      {
                        opportunityStatus: G(
                          G({}, this.state.opportunityStatus),
                          {},
                          v()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  I.a.fetchEmailTemplatesPeek().then(function(t) {
                    return e.setState({
                      emailTemplates: t,
                      peekLoading: G(
                        G({}, e.state.peekLoading),
                        {},
                        { emailTemplates: !1 }
                      )
                    });
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.opportunityStatus,
                    t = e.name,
                    a = e.usesWf,
                    n = e.emailTemplateIdWf,
                    r = e.numberOfDaysToSendEmail;
                  return b.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    b.a.createElement(
                      P.a,
                      null,
                      b.a.createElement(
                        z.a,
                        null,
                        b.a.createElement(
                          "div",
                          { className: "row" },
                          b.a.createElement(W.a, {
                            label: "Omschrijving",
                            divSize: "col-sm-10",
                            value: t,
                            className: "col-sm-10 form-group"
                          })
                        ),
                        b.a.createElement(
                          "div",
                          { className: "row" },
                          b.a.createElement(F.a, {
                            label: "Gebruikt workflow email bij deze status",
                            divSize: "col-sm-10",
                            name: "usesWf",
                            value: a,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        1 == a &&
                          b.a.createElement(
                            b.a.Fragment,
                            null,
                            b.a.createElement(
                              "div",
                              { className: "row" },
                              b.a.createElement(W.a, {
                                label: "Uitleg workflow",
                                divSize: "col-sm-10",
                                value: this.props.explanationWf,
                                className: "col-sm-10 form-group"
                              })
                            ),
                            b.a.createElement(
                              "div",
                              { className: "row" },
                              b.a.createElement(_.a, {
                                label: "Template email bij deze status",
                                divSize: "col-sm-10",
                                name: "emailTemplateIdWf",
                                options: this.state.emailTemplates,
                                value: n,
                                onChangeAction: this.handleReactSelectChange,
                                isLoading: this.state.peekLoading
                                  .emailTemplates,
                                multi: !1,
                                required: "required",
                                error: this.state.errors.emailTemplateIdWf
                              })
                            ),
                            b.a.createElement(
                              "div",
                              { className: "row" },
                              b.a.createElement(j.a, {
                                label: "Aantal dagen email na deze status",
                                divSize: "col-sm-10",
                                type: "number",
                                min: "1",
                                id: "numberOfDaysToSendEmail",
                                name: "numberOfDaysToSendEmail",
                                value: r,
                                onChangeAction: this.handleInputChange,
                                required: "required",
                                error: this.state.errors.numberOfDaysToSendEmail
                              })
                            )
                          )
                      ),
                      b.a.createElement(
                        z.a,
                        null,
                        b.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          b.a.createElement(D.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Sluiten",
                            onClickAction: this.props.switchToView
                          }),
                          b.a.createElement(D.a, {
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
        U = Object(w.b)(null, function(e) {
          return Object(A.b)({ fetchSystemData: q.a }, e);
        })(K),
        Y = function(e) {
          var t = e.name,
            a = e.usesWf,
            n = e.emailTemplateWorkflow,
            r = e.numberOfDaysToSendEmail,
            s = e.switchToEdit,
            i = e.explanationWf;
          return b.a.createElement(
            "div",
            { onClick: s },
            b.a.createElement(
              P.a,
              null,
              b.a.createElement(
                z.a,
                null,
                b.a.createElement(
                  "div",
                  { className: "row" },
                  b.a.createElement(W.a, {
                    label: "Omschrijving",
                    divSize: "col-sm-10",
                    value: t,
                    className: "col-sm-10 form-group"
                  })
                ),
                b.a.createElement(
                  "div",
                  { className: "row" },
                  b.a.createElement(W.a, {
                    label: "Gebruikt workflow bij deze status",
                    divSize: "col-sm-10",
                    value: a ? "Ja" : "Nee",
                    className: "col-sm-10 form-group"
                  })
                ),
                1 == a &&
                  b.a.createElement(
                    b.a.Fragment,
                    null,
                    b.a.createElement(
                      "div",
                      { className: "row" },
                      b.a.createElement(W.a, {
                        label: "Uitleg workflow",
                        divSize: "col-sm-10",
                        value: i,
                        className: "col-sm-10 form-group"
                      })
                    ),
                    b.a.createElement(
                      "div",
                      { className: "row" },
                      b.a.createElement(W.a, {
                        label: "Template email bij deze status",
                        divSize: "col-sm-10",
                        value: n ? n.name : "",
                        className: "col-sm-10 form-group"
                      })
                    ),
                    b.a.createElement(
                      "div",
                      { className: "row" },
                      b.a.createElement(W.a, {
                        label: "Aantal dagen email na deze status",
                        divSize: "col-sm-10",
                        value: r,
                        className: "col-sm-10 form-group"
                      })
                    )
                  )
              )
            )
          );
        };
      function H(e) {
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
      var Q = (function(e) {
          u()(a, e);
          var t = H(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              v()(l()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              v()(l()(n), "switchToView", function() {
                n.setState({ showEdit: !1, activeDiv: "" });
              }),
              (n.state = { showEdit: !1, activeDiv: "" }),
              n
            );
          }
          return (
            i()(a, [
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
                    a = void 0 === t ? {} : t,
                    n = b.a.createElement(
                      "span",
                      null,
                      "Als gebruik workflow bij deze status is aangezet, dan zal er automatisch eenmalig een email verstuurd gaan worden naar contact als kans op deze status is gezet.",
                      b.a.createElement("br", null),
                      "De verzenddatum wordt dan bepaald, rekening houdend met het opgegeven aantal dagen."
                    );
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
                      ? b.a.createElement(U, {
                          opportunityStatus: this.props.opportunityStatus,
                          switchToView: this.switchToView,
                          updateState: this.props.updateState,
                          explanationWf: n
                        })
                      : b.a.createElement(
                          Y,
                          O()({}, this.props.opportunityStatus, {
                            switchToEdit: this.switchToEdit,
                            explanationWf: n
                          })
                        )
                  );
                }
              }
            ]),
            a
          );
        })(g.Component),
        Z = Object(w.b)(function(e) {
          return {
            meDetails: e.meDetails,
            permissions: e.meDetails.permissions
          };
        })(Q),
        $ = function(e) {
          var t = e.opportunityStatus,
            a = e.hasError,
            n = e.isLoading,
            r = e.updateState,
            s = "",
            i = !0;
          return (
            a
              ? (s = "Fout bij het ophalen van kans status.")
              : n
              ? (s = "Gegevens aan het laden.")
              : Object(S.isEmpty)(t)
              ? (s = "Geen kans status gevonden!")
              : (i = !1),
            i
              ? b.a.createElement("div", null, s)
              : b.a.createElement(
                  "div",
                  null,
                  b.a.createElement(Z, { opportunityStatus: t, updateState: r })
                )
          );
        };
      function ee(e, t) {
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
      function te(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ee(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : ee(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function ae(e) {
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
      var ne = (function(e) {
        u()(a, e);
        var t = ae(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            v()(l()(n), "callFetchOpportunityStatusDetails", function() {
              n.setState({ isLoading: !0, hasError: !1 }),
                L(n.props.params.id)
                  .then(function(e) {
                    n.setState({
                      isLoading: !1,
                      opportunityStatus: te({}, e.data.data)
                    });
                  })
                  .catch(function(e) {
                    n.setState({ isLoading: !1, hasError: !0 });
                  });
            }),
            v()(l()(n), "updateState", function(e) {
              n.setState({ opportunityStatus: e });
            }),
            (n.state = { opportunityStatus: {}, isLoading: !1, hasError: !1 }),
            n
          );
        }
        return (
          i()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.callFetchOpportunityStatusDetails();
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
                        P.a,
                        null,
                        b.a.createElement(
                          z.a,
                          { className: "panel-small" },
                          b.a.createElement(k, {
                            name: this.state.opportunityStatus.name || ""
                          })
                        )
                      )
                    ),
                    b.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      b.a.createElement($, {
                        opportunityStatus: this.state.opportunityStatus,
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
      t.default = ne;
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        i = a.n(s),
        o = function(e) {
          var t = e.children,
            a = e.className,
            n = e.onMouseEnter,
            s = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: s
            },
            t
          );
        };
      (o.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (o.propTypes = {
          className: i.a.string,
          onMouseEnter: i.a.func,
          onMouseLeave: i.a.func
        }),
        (t.a = o);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        i = a.n(s),
        o = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (o.defaultProps = { className: "" }),
        (o.propTypes = { className: i.a.string }),
        (t.a = o);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        i = a.n(s),
        o = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            s = e.type,
            i = e.value,
            o = e.loading,
            l = e.loadText,
            c = e.disabled;
          return o
            ? r.a.createElement(
                "button",
                {
                  type: s,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: i,
                  disabled: o
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
                  type: s,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: i,
                  disabled: c
                },
                a
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
          buttonClassName: i.a.string,
          buttonText: i.a.string.isRequired,
          onClickAction: i.a.func,
          type: i.a.string,
          value: i.a.string,
          loading: i.a.bool,
          loadText: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = o);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        i = a.n(s),
        o = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            s = e.title,
            i = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: i,
              title: s
            },
            r.a.createElement("span", { className: "glyphicon ".concat(a) })
          );
        };
      (o.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (o.propTypes = {
          buttonClassName: i.a.string,
          iconName: i.a.string.isRequired,
          onClickAction: i.a.func,
          title: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = o);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        i = a.n(s),
        o = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            s = e.size,
            i = e.id,
            o = e.placeholder,
            l = e.name,
            c = e.value,
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
            E = e.errorMessage,
            k = e.divSize,
            S = e.divClassName,
            N = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(k, " ").concat(S) },
            r.a.createElement(
              "label",
              { htmlFor: i, className: "col-sm-6 ".concat(p) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(s) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (v ? "has-error" : ""),
                id: i,
                placeholder: o,
                name: l,
                value: c,
                onClick: u,
                onChange: d,
                onBlur: m,
                readOnly: h,
                maxLength: f,
                min: g,
                max: b,
                autoComplete: N,
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
                  E
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
          label: i.a.oneOfType([i.a.string, i.a.object]).isRequired,
          type: i.a.string,
          className: i.a.string,
          divClassName: i.a.string,
          size: i.a.string,
          divSize: i.a.string,
          id: i.a.string,
          placeholder: i.a.string,
          name: i.a.string.isRequired,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          onClickAction: i.a.func,
          onChangeAction: i.a.func,
          onBlurAction: i.a.func,
          required: i.a.string,
          readOnly: i.a.bool,
          maxLength: i.a.string,
          error: i.a.bool,
          min: i.a.string,
          max: i.a.string,
          step: i.a.string,
          errorMessage: i.a.string,
          autoComplete: i.a.string
        }),
        (t.a = o);
    },
    695: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(4),
        i = a(8),
        o = a.n(i),
        l = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            i = e.value,
            o = e.link,
            l = e.hidden;
          return o.length > 0
            ? r.a.createElement(
                "div",
                { className: a, style: l ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement(
                  "div",
                  { className: "col-sm-6", id: n, onClick: null },
                  r.a.createElement(
                    s.b,
                    { to: o, className: "link-underline" },
                    i
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: a, style: l ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement("div", { className: "col-sm-6", id: n }, i)
              );
        };
      (l.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (l.propTypes = {
          label: o.a.oneOfType([o.a.string, o.a.object]).isRequired,
          className: o.a.string,
          id: o.a.string,
          value: o.a.oneOfType([o.a.string, o.a.number]),
          link: o.a.string,
          hidden: o.a.bool
        }),
        (t.a = l);
    },
    700: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        i = a.n(s),
        o = a(703),
        l = a.n(o),
        c = function(e) {
          var t = e.label,
            a = e.size,
            n = e.id,
            s = e.name,
            i = e.value,
            o = e.onChangeAction,
            c = e.required,
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
                { htmlFor: n, className: "col-sm-6 ".concat(c) },
                t
              )
            ),
            r.a.createElement(
              "div",
              { className: "".concat(a) },
              r.a.createElement(l.a, {
                id: n,
                name: s,
                onChange: o,
                checked: i,
                disabled: m
              })
            )
          );
        };
      (c.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        required: "",
        disabled: !1,
        value: null
      }),
        (c.propTypes = {
          label: i.a.string.isRequired,
          type: i.a.string,
          size: i.a.string,
          divSize: i.a.string,
          id: i.a.string,
          name: i.a.string.isRequired,
          value: i.a.bool,
          onChangeAction: i.a.func,
          required: i.a.string,
          disabled: i.a.bool
        }),
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
        s = a(0),
        i = m(s),
        o = m(a(710)),
        l = m(a(8)),
        c = m(a(704)),
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
                  s = (0, o.default)(
                    "react-toggle",
                    {
                      "react-toggle--checked": this.state.checked,
                      "react-toggle--focus": this.state.hasFocus,
                      "react-toggle--disabled": this.props.disabled
                    },
                    a
                  );
                return i.default.createElement(
                  "div",
                  {
                    className: s,
                    onClick: this.handleClick,
                    onTouchStart: this.handleTouchStart,
                    onTouchMove: this.handleTouchMove,
                    onTouchEnd: this.handleTouchEnd
                  },
                  i.default.createElement(
                    "div",
                    { className: "react-toggle-track" },
                    i.default.createElement(
                      "div",
                      { className: "react-toggle-track-check" },
                      this.getIcon("checked")
                    ),
                    i.default.createElement(
                      "div",
                      { className: "react-toggle-track-x" },
                      this.getIcon("unchecked")
                    )
                  ),
                  i.default.createElement("div", {
                    className: "react-toggle-thumb"
                  }),
                  i.default.createElement(
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
      })(s.PureComponent);
      (t.default = p),
        (p.displayName = "Toggle"),
        (p.defaultProps = {
          icons: {
            checked: i.default.createElement(c.default, null),
            unchecked: i.default.createElement(u.default, null)
          }
        }),
        (p.propTypes = {
          checked: l.default.bool,
          disabled: l.default.bool,
          defaultChecked: l.default.bool,
          onChange: l.default.func,
          onFocus: l.default.func,
          onBlur: l.default.func,
          className: l.default.string,
          name: l.default.string,
          value: l.default.string,
          id: l.default.string,
          "aria-labelledby": l.default.string,
          "aria-label": l.default.string,
          icons: l.default.oneOfType([
            l.default.bool,
            l.default.shape({
              checked: l.default.node,
              unchecked: l.default.node
            })
          ])
        });
    },
    704: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        r = a(0),
        s = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
        return s.default.createElement(
          "svg",
          { width: "14", height: "11", viewBox: "0 0 14 11" },
          s.default.createElement("title", null, "switch-check"),
          s.default.createElement("path", {
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
        s = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
        return s.default.createElement(
          "svg",
          { width: "10", height: "10", viewBox: "0 0 10 10" },
          s.default.createElement("title", null, "switch-x"),
          s.default.createElement("path", {
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
        s = a(8),
        i = a.n(s),
        o = a(714),
        l =
          (a(715),
          function(e) {
            var t = e.label,
              a = e.divSize,
              n = e.size,
              s = e.id,
              i = e.name,
              l = e.value,
              c = e.options,
              u = e.optionId,
              d = e.optionName,
              m = e.onChangeAction,
              p = e.required,
              h = e.multi,
              f = e.error,
              v = e.isLoading;
            return r.a.createElement(
              "div",
              { className: "form-group ".concat(a) },
              r.a.createElement(
                "label",
                { htmlFor: s, className: "col-sm-6 ".concat(p) },
                t
              ),
              r.a.createElement(
                "div",
                { className: "".concat(n) },
                r.a.createElement(o.a, {
                  id: s,
                  name: i,
                  value: l,
                  onChange: function(e) {
                    m(e || "", i);
                  },
                  options: c,
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
          label: i.a.string.isRequired,
          className: i.a.string,
          size: i.a.string,
          divSize: i.a.string,
          id: i.a.string,
          name: i.a.string.isRequired,
          options: i.a.array.isRequired,
          optionId: i.a.string,
          optionName: i.a.string,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          onChangeAction: i.a.func,
          onBlurAction: i.a.func,
          required: i.a.string,
          readOnly: i.a.bool,
          error: i.a.bool,
          multi: i.a.bool,
          isLoading: i.a.bool
        }),
        (t.a = l);
    }
  }
]);
