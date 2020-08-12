(window.webpackJsonp = window.webpackJsonp || []).push([
  [58],
  {
    1470: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        s = a(25),
        o = a.n(s),
        i = a(22),
        l = a.n(i),
        c = a(26),
        u = a.n(c),
        d = a(27),
        m = a.n(d),
        f = a(16),
        h = a.n(f),
        p = a(6),
        v = a.n(p),
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
                "Offerte verzoek status: ",
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
        q = a(694),
        R = a(692),
        j = a(690),
        D = a(691),
        z = a(12),
        P = {
          fld: [
            "id",
            "name",
            "usesWf",
            "emailTemplateIdWf",
            "numberOfDaysToSendEmail",
            "order"
          ],
          rlt: { emailTemplateWorkflow: [] }
        },
        x = function(e) {
          var t = "jory/quotation-request-status/".concat(e);
          return z.a.get(t, { params: { jory: P } });
        },
        L = function(e) {
          var t = "".concat("quotation-request-status", "/").concat(e.id);
          return z.a.post(t, e, { params: { jory: P } });
        },
        M = a(14),
        A = a(201),
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
      var U = (function(e) {
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
                      quotationRequestStatus: G(
                        G({}, n.state.quotationRequestStatus),
                        {},
                        v()({}, r, a)
                      )
                    }
                  )
                );
              }),
              v()(l()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.quotationRequestStatus,
                  a = {},
                  r = !1;
                1 == t.usesWf &&
                  (t.emailTemplateIdWf ||
                    ((a.emailTemplateIdWf = !0), (r = !0)),
                  X.a.isEmpty(t.numberOfDaysToSendEmail.toString()) &&
                    ((a.numberOfDaysToSendEmail = !0), (r = !0))),
                  n.setState(G(G({}, n.state), {}, { errors: a })),
                  !r &&
                    L(t)
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
                quotationRequestStatus: G({}, e.quotationRequestStatus),
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
            o()(a, [
              {
                key: "handleReactSelectChange",
                value: function(e, t) {
                  this.setState(
                    G(
                      G({}, this.state),
                      {},
                      {
                        quotationRequestStatus: G(
                          G({}, this.state.quotationRequestStatus),
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
                  var e = this.state.quotationRequestStatus,
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
                      j.a,
                      null,
                      b.a.createElement(
                        D.a,
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
                              b.a.createElement(q.a, {
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
                        D.a,
                        null,
                        b.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          b.a.createElement(R.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Sluiten",
                            onClickAction: this.props.switchToView
                          }),
                          b.a.createElement(R.a, {
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
        K = Object(w.b)(null, function(e) {
          return Object(M.b)({ fetchSystemData: A.a }, e);
        })(U),
        Q = function(e) {
          var t = e.name,
            a = e.usesWf,
            n = e.emailTemplateWorkflow,
            r = e.numberOfDaysToSendEmail,
            s = e.switchToEdit,
            o = e.explanationWf;
          return b.a.createElement(
            "div",
            { onClick: s },
            b.a.createElement(
              j.a,
              null,
              b.a.createElement(
                D.a,
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
                        value: o,
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
      function Y(e) {
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
      var H = (function(e) {
          u()(a, e);
          var t = Y(a);
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
            o()(a, [
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
                      "Als gebruik workflow bij deze status is aangezet, dan zal er automatisch eenmalig een email verstuurd gaan worden naar contact (verzoek voor) als offerteverzoek op deze status is gezet.",
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
                      ? b.a.createElement(K, {
                          quotationRequestStatus: this.props
                            .quotationRequestStatus,
                          switchToView: this.switchToView,
                          updateState: this.props.updateState,
                          explanationWf: n
                        })
                      : b.a.createElement(
                          Q,
                          O()({}, this.props.quotationRequestStatus, {
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
        })(H),
        $ = function(e) {
          var t = e.quotationRequestStatus,
            a = e.hasError,
            n = e.isLoading,
            r = e.updateState,
            s = "",
            o = !0;
          return (
            a
              ? (s = "Fout bij het ophalen van offerte verzoek status.")
              : n
              ? (s = "Gegevens aan het laden.")
              : Object(S.isEmpty)(t)
              ? (s = "Geen offerte verzoek status gevonden!")
              : (o = !1),
            o
              ? b.a.createElement("div", null, s)
              : b.a.createElement(
                  "div",
                  null,
                  b.a.createElement(Z, {
                    quotationRequestStatus: t,
                    updateState: r
                  })
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
            v()(l()(n), "callFetchQuotationRequestStatusDetails", function() {
              n.setState({ isLoading: !0, hasError: !1 }),
                x(n.props.params.id)
                  .then(function(e) {
                    n.setState({
                      isLoading: !1,
                      quotationRequestStatus: te({}, e.data.data)
                    });
                  })
                  .catch(function(e) {
                    n.setState({ isLoading: !1, hasError: !0 });
                  });
            }),
            v()(l()(n), "updateState", function(e) {
              n.setState({ quotationRequestStatus: e });
            }),
            (n.state = {
              quotationRequestStatus: {},
              isLoading: !1,
              hasError: !1
            }),
            n
          );
        }
        return (
          o()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.callFetchQuotationRequestStatusDetails();
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
                        j.a,
                        null,
                        b.a.createElement(
                          D.a,
                          { className: "panel-small" },
                          b.a.createElement(k, {
                            name: this.state.quotationRequestStatus.name || ""
                          })
                        )
                      )
                    ),
                    b.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      b.a.createElement($, {
                        quotationRequestStatus: this.state
                          .quotationRequestStatus,
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
        o = a.n(s),
        i = function(e) {
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
      (i.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (i.propTypes = {
          className: o.a.string,
          onMouseEnter: o.a.func,
          onMouseLeave: o.a.func
        }),
        (t.a = i);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
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
        (i.propTypes = { className: o.a.string }),
        (t.a = i);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            s = e.type,
            o = e.value,
            i = e.loading,
            l = e.loadText,
            c = e.disabled;
          return i
            ? r.a.createElement(
                "button",
                {
                  type: s,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: o,
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
                  type: s,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: o,
                  disabled: c
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
          buttonClassName: o.a.string,
          buttonText: o.a.string.isRequired,
          onClickAction: o.a.func,
          type: o.a.string,
          value: o.a.string,
          loading: o.a.bool,
          loadText: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = i);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            s = e.title,
            o = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: o,
              title: s
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
          buttonClassName: o.a.string,
          iconName: o.a.string.isRequired,
          onClickAction: o.a.func,
          title: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = i);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            s = e.size,
            o = e.id,
            i = e.placeholder,
            l = e.name,
            c = e.value,
            u = e.onClickAction,
            d = e.onChangeAction,
            m = e.onBlurAction,
            f = e.required,
            h = e.readOnly,
            p = e.maxLength,
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
              { htmlFor: o, className: "col-sm-6 ".concat(f) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(s) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (v ? "has-error" : ""),
                id: o,
                placeholder: i,
                name: l,
                value: c,
                onClick: u,
                onChange: d,
                onBlur: m,
                readOnly: h,
                maxLength: p,
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
        (t.a = i);
    },
    695: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(4),
        o = a(8),
        i = a.n(o),
        l = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            o = e.value,
            i = e.link,
            l = e.hidden;
          return i.length > 0
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
                    { to: i, className: "link-underline" },
                    o
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
                r.a.createElement("div", { className: "col-sm-6", id: n }, o)
              );
        };
      (l.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (l.propTypes = {
          label: i.a.oneOfType([i.a.string, i.a.object]).isRequired,
          className: i.a.string,
          id: i.a.string,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          link: i.a.string,
          hidden: i.a.bool
        }),
        (t.a = l);
    },
    700: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = a(703),
        l = a.n(i),
        c = function(e) {
          var t = e.label,
            a = e.size,
            n = e.id,
            s = e.name,
            o = e.value,
            i = e.onChangeAction,
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
                onChange: i,
                checked: o,
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
        o = m(s),
        i = m(a(710)),
        l = m(a(8)),
        c = m(a(704)),
        u = m(a(705)),
        d = a(706);
      function m(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var f = (function(e) {
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
                  s = (0, i.default)(
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
                    className: s,
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
      })(s.PureComponent);
      (t.default = f),
        (f.displayName = "Toggle"),
        (f.defaultProps = {
          icons: {
            checked: o.default.createElement(c.default, null),
            unchecked: o.default.createElement(u.default, null)
          }
        }),
        (f.propTypes = {
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
        o = a.n(s),
        i = a(714),
        l =
          (a(715),
          function(e) {
            var t = e.label,
              a = e.divSize,
              n = e.size,
              s = e.id,
              o = e.name,
              l = e.value,
              c = e.options,
              u = e.optionId,
              d = e.optionName,
              m = e.onChangeAction,
              f = e.required,
              h = e.multi,
              p = e.error,
              v = e.isLoading;
            return r.a.createElement(
              "div",
              { className: "form-group ".concat(a) },
              r.a.createElement(
                "label",
                { htmlFor: s, className: "col-sm-6 ".concat(f) },
                t
              ),
              r.a.createElement(
                "div",
                { className: "".concat(n) },
                r.a.createElement(i.a, {
                  id: s,
                  name: o,
                  value: l,
                  onChange: function(e) {
                    m(e || "", o);
                  },
                  options: c,
                  valueKey: u,
                  labelKey: d,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: h,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: p ? " has-error" : "",
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
        (t.a = l);
    }
  }
]);
