(window.webpackJsonp = window.webpackJsonp || []).push([
  [78],
  {
    1460: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        o = a(25),
        i = a.n(o),
        s = a(22),
        c = a.n(s),
        l = a(26),
        u = a.n(l),
        d = a(27),
        m = a.n(d),
        p = a(16),
        f = a.n(p),
        g = a(6),
        v = a.n(g),
        h = a(0),
        y = a.n(h),
        b = a(4),
        E = a(693),
        N = a(8),
        C = a(100),
        w = function(e) {
          var t = e.deleteLedger,
            a = e.closeDeleteItemModal,
            n = e.description,
            r = e.id;
          return y.a.createElement(
            C.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: a,
              confirmAction: function() {
                return t(r), void a();
              },
              title: "Verwijderen"
            },
            "Verwijder grootboek: ",
            y.a.createElement("strong", null, n),
            "?"
          );
        };
      function D(e) {
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
      var L = (function(e) {
        u()(a, e);
        var t = D(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            v()(c()(n), "toggleDelete", function() {
              n.setState({ showDelete: !n.state.showDelete });
            }),
            (n.state = { showDelete: !1 }),
            n
          );
        }
        return (
          i()(a, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.description,
                  a = e.id;
                return y.a.createElement(
                  "div",
                  { className: "row" },
                  y.a.createElement(
                    "div",
                    { className: "col-md-4" },
                    y.a.createElement(
                      "div",
                      {
                        className: "btn-group btn-group-flex margin-small",
                        role: "group"
                      },
                      y.a.createElement(E.a, {
                        iconName: "glyphicon-arrow-left",
                        onClickAction: b.e.goBack
                      }),
                      y.a.createElement(E.a, {
                        iconName: "glyphicon-trash",
                        onClickAction: this.toggleDelete
                      })
                    )
                  ),
                  y.a.createElement(
                    "div",
                    { className: "col-md-4" },
                    y.a.createElement(
                      "h4",
                      { className: "text-center" },
                      "Grootboekrekening: ",
                      t
                    )
                  ),
                  y.a.createElement("div", { className: "col-md-4" }),
                  this.state.showDelete &&
                    y.a.createElement(w, {
                      closeDeleteItemModal: this.toggleDelete,
                      description: t,
                      id: a,
                      deleteLedger: this.props.deleteLedger
                    })
                );
              }
            }
          ]),
          a
        );
      })(h.Component);
      L.propTypes = { description: N.any };
      var k = L,
        O = a(198),
        S = a(199),
        T = a.n(S),
        j = a(32),
        R = a(697),
        x = a.n(R),
        A = a(7),
        M = a.n(A),
        P = a(694),
        q = a(692),
        V = a(690),
        B = a(691),
        z = (a(809), a(696)),
        I = a(810),
        F = a(14),
        J = a(201);
      function W(e, t) {
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
            ? W(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : W(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return m()(this, a);
        };
      }
      M.a.locale("nl");
      var K = (function(e) {
          u()(a, e);
          var t = H(a);
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
                  G(
                    G({}, n.state),
                    {},
                    { ledger: G(G({}, n.state.ledger), {}, v()({}, r, a)) }
                  )
                );
              }),
              v()(c()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.ledger,
                  a = {},
                  r = !1;
                x.a.isEmpty(t.description) && ((a.description = !0), (r = !0)),
                  t.twinfieldLedgerCode &&
                    t.twinfieldLedgerCode !==
                      n.props.ledger.twinfieldLedgerCode &&
                    n.props.ledgers.map(function(e) {
                      e.twinfieldLedgerCode == t.twinfieldLedgerCode &&
                        ((r = !0), (a.twinfieldLedgerCode = !0));
                    }),
                  n.setState(G(G({}, n.state), {}, { errors: a })),
                  !r &&
                    I.a
                      .updateLedger(t)
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
                ledger: G({}, e.ledger),
                errors: { description: !1, vatCodeId: !1 }
              }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.ledger,
                    t = e.description,
                    a = e.vatCodeId,
                    n = e.twinfieldLedgerCode;
                  return y.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    y.a.createElement(
                      V.a,
                      null,
                      y.a.createElement(
                        B.a,
                        null,
                        y.a.createElement(
                          "div",
                          { className: "row" },
                          y.a.createElement(P.a, {
                            label: "Omschrijving",
                            name: "description",
                            value: t,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.description
                          }),
                          y.a.createElement(z.a, {
                            label: "BTW code",
                            name: "vatCodeId",
                            value: a,
                            options: this.props.vatCodes,
                            optionName: "description",
                            onChangeAction: this.handleInputChange,
                            placeholder: "BTW geen"
                          })
                        ),
                        y.a.createElement(
                          "div",
                          { className: "row" },
                          y.a.createElement(P.a, {
                            label: "Twinfield grootboekcode",
                            name: "twinfieldLedgerCode",
                            value: n,
                            onChangeAction: this.handleInputChange,
                            error: this.state.errors.twinfieldLedgerCode,
                            errorMessage:
                              "Deze grootboekcode wordt al gebruikt."
                          })
                        )
                      ),
                      y.a.createElement(
                        B.a,
                        null,
                        y.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          y.a.createElement(q.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Sluiten",
                            onClickAction: this.props.switchToView
                          }),
                          y.a.createElement(q.a, {
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
        })(h.Component),
        Q = Object(j.b)(null, function(e) {
          return Object(F.b)({ fetchSystemData: J.a }, e);
        })(K),
        U = a(695),
        X = function(e) {
          var t = e.description,
            a = e.vatCodeId,
            n = e.twinfieldLedgerCode,
            r = e.switchToEdit,
            o = e.vatCodes;
          return y.a.createElement(
            "div",
            { onClick: r },
            y.a.createElement(
              V.a,
              null,
              y.a.createElement(
                B.a,
                null,
                y.a.createElement(
                  "div",
                  { className: "row" },
                  y.a.createElement(U.a, { label: "Omschrijving", value: t }),
                  y.a.createElement(U.a, {
                    label: "BTW code",
                    value: a
                      ? o.find(function(e) {
                          return e.id == a;
                        }).description
                      : "BTW geen"
                  })
                ),
                y.a.createElement(
                  "div",
                  { className: "row" },
                  y.a.createElement(U.a, {
                    label: "Twinfield grootboek code",
                    value: n
                  })
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return m()(this, a);
        };
      }
      var Z = (function(e) {
          u()(a, e);
          var t = Y(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              v()(c()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              v()(c()(n), "switchToView", function() {
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
                    a = void 0 === t ? {} : t;
                  return y.a.createElement(
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
                      ? y.a.createElement(Q, {
                          ledger: this.props.ledger,
                          vatCodes: this.props.vatCodes,
                          ledgers: this.props.ledgers,
                          switchToView: this.switchToView,
                          updateState: this.props.updateState
                        })
                      : y.a.createElement(
                          X,
                          T()({}, this.props.ledger, {
                            switchToEdit: this.switchToEdit,
                            vatCodes: this.props.vatCodes
                          })
                        )
                  );
                }
              }
            ]),
            a
          );
        })(h.Component),
        $ = Object(j.b)(function(e) {
          return {
            meDetails: e.meDetails,
            permissions: e.meDetails.permissions,
            vatCodes: e.systemData.vatCodes,
            ledgers: e.systemData.ledgers
          };
        })(Z);
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return m()(this, a);
        };
      }
      var ee = (function(e) {
        u()(a, e);
        var t = _(a);
        function a(e) {
          return r()(this, a), t.call(this, e);
        }
        return (
          i()(a, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.ledger,
                  a = e.hasError,
                  n = e.isLoading,
                  r = e.updateState,
                  o = "",
                  i = !0;
                return (
                  a
                    ? (o = "Fout bij het ophalen van grootboek.")
                    : n
                    ? (o = "Gegevens aan het laden.")
                    : Object(O.isEmpty)(t)
                    ? (o = "Geen grootboek gevonden!")
                    : (i = !1),
                  i
                    ? y.a.createElement("div", null, o)
                    : y.a.createElement(
                        "div",
                        null,
                        y.a.createElement($, { ledger: t, updateState: r })
                      )
                );
              }
            }
          ]),
          a
        );
      })(h.Component);
      ee.propTypes = {
        ledger: N.any,
        hasError: N.any,
        isLoading: N.any,
        updateState: N.any
      };
      var te = ee,
        ae = a(202);
      function ne(e) {
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
      var re = (function(e) {
        u()(a, e);
        var t = ne(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            v()(c()(n), "callFetchLedgerDetails", function() {
              n.setState({ isLoading: !0, hasError: !1 }),
                I.a
                  .fetchLedgerDetails(n.props.params.id)
                  .then(function(e) {
                    n.setState({ isLoading: !1, ledger: e.data.data });
                  })
                  .catch(function(e) {
                    n.setState({ isLoading: !1, hasError: !0 });
                  });
            }),
            v()(c()(n), "deleteLedger", function(e) {
              I.a
                .deleteLedger(e)
                .then(function(e) {
                  b.f.push("/grootboekrekeningen");
                })
                .catch(function(e) {
                  n.props.setError(e.response.status, e.response.data.message);
                });
            }),
            v()(c()(n), "updateState", function(e) {
              n.setState({ ledger: e });
            }),
            (n.state = { ledger: {}, isLoading: !1, hasError: !1 }),
            n
          );
        }
        return (
          i()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.callFetchLedgerDetails();
              }
            },
            {
              key: "render",
              value: function() {
                return y.a.createElement(
                  "div",
                  { className: "row" },
                  y.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    y.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      y.a.createElement(
                        V.a,
                        null,
                        y.a.createElement(
                          B.a,
                          { className: "panel-small" },
                          y.a.createElement(k, {
                            description: this.state.ledger.description || "",
                            id: this.state.ledger.id,
                            deleteLedger: this.deleteLedger
                          })
                        )
                      )
                    ),
                    y.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      y.a.createElement(te, {
                        ledger: this.state.ledger,
                        isLoading: this.state.isLoading,
                        hasError: this.state.hasError,
                        updateState: this.updateState
                      })
                    )
                  ),
                  y.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          a
        );
      })(h.Component);
      t.default = Object(j.b)(null, function(e) {
        return {
          setError: function(t, a) {
            e(Object(ae.b)(t, a));
          }
        };
      })(re);
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        s = function(e) {
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
      (s.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (s.propTypes = {
          className: i.a.string,
          onMouseEnter: i.a.func,
          onMouseLeave: i.a.func
        }),
        (t.a = s);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
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
        (s.propTypes = { className: i.a.string }),
        (t.a = s);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        s = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            o = e.type,
            i = e.value,
            s = e.loading,
            c = e.loadText,
            l = e.disabled;
          return s
            ? r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: i,
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
                  type: o,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: i,
                  disabled: l
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
          buttonClassName: i.a.string,
          buttonText: i.a.string.isRequired,
          onClickAction: i.a.func,
          type: i.a.string,
          value: i.a.string,
          loading: i.a.bool,
          loadText: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = s);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        s = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            o = e.title,
            i = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: i,
              title: o
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
          buttonClassName: i.a.string,
          iconName: i.a.string.isRequired,
          onClickAction: i.a.func,
          title: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = s);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        s = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            o = e.size,
            i = e.id,
            s = e.placeholder,
            c = e.name,
            l = e.value,
            u = e.onClickAction,
            d = e.onChangeAction,
            m = e.onBlurAction,
            p = e.required,
            f = e.readOnly,
            g = e.maxLength,
            v = e.error,
            h = e.min,
            y = e.max,
            b = e.step,
            E = e.errorMessage,
            N = e.divSize,
            C = e.divClassName,
            w = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(N, " ").concat(C) },
            r.a.createElement(
              "label",
              { htmlFor: i, className: "col-sm-6 ".concat(p) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(o) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (v ? "has-error" : ""),
                id: i,
                placeholder: s,
                name: c,
                value: l,
                onClick: u,
                onChange: d,
                onBlur: m,
                readOnly: f,
                maxLength: g,
                min: h,
                max: y,
                autoComplete: w,
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
                  E
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
        (t.a = s);
    },
    695: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(4),
        i = a(8),
        s = a.n(i),
        c = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            i = e.value,
            s = e.link,
            c = e.hidden;
          return s.length > 0
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
                    { to: s, className: "link-underline" },
                    i
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
                r.a.createElement("div", { className: "col-sm-6", id: n }, i)
              );
        };
      (c.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (c.propTypes = {
          label: s.a.oneOfType([s.a.string, s.a.object]).isRequired,
          className: s.a.string,
          id: s.a.string,
          value: s.a.oneOfType([s.a.string, s.a.number]),
          link: s.a.string,
          hidden: s.a.bool
        }),
        (t.a = c);
    },
    696: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        s = function(e) {
          var t = e.label,
            a = e.className,
            n = e.size,
            o = e.id,
            i = e.name,
            s = e.value,
            c = e.options,
            l = e.onChangeAction,
            u = e.onBlurAction,
            d = e.required,
            m = e.error,
            p = e.errorMessage,
            f = e.optionValue,
            g = e.optionName,
            v = e.readOnly,
            h = e.placeholder,
            y = e.divClassName,
            b = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(y) },
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
                    "form-control input-sm ".concat(a) + (m && " has-error"),
                  id: o,
                  name: i,
                  value: s,
                  onChange: l,
                  onBlur: u,
                  readOnly: v
                },
                b && r.a.createElement("option", { value: "" }, h),
                c.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[f], value: e[f] },
                    e[g]
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
          label: i.a.string.isRequired,
          className: i.a.string,
          size: i.a.string,
          id: i.a.string,
          name: i.a.string.isRequired,
          options: i.a.array,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          onChangeAction: i.a.func,
          onBlurAction: i.a.func,
          required: i.a.string,
          readOnly: i.a.bool,
          error: i.a.bool,
          errorMessage: i.a.string,
          emptyOption: i.a.bool,
          optionValue: i.a.string,
          optionName: i.a.string,
          placeholder: i.a.string
        }),
        (t.a = s);
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
    },
    810: function(e, t, a) {
      "use strict";
      var n = a(12);
      a(2);
      t.a = {
        fetchLedgerDetails: function(e) {
          var t = "jory/ledger/".concat(e);
          return n.a.get(t, {
            params: {
              jory: {
                fld: ["id", "description", "vatCodeId", "twinfieldLedgerCode"],
                rlt: { vatCode: { fld: ["id", "description"] } }
              }
            }
          });
        },
        newLedger: function(e) {
          return (
            (e.jory = JSON.stringify({ fld: ["id"] })), n.a.post("ledger", e)
          );
        },
        updateLedger: function(e) {
          var t = "".concat("ledger", "/").concat(e.id);
          return n.a.post(t, e);
        },
        deleteLedger: function(e) {
          var t = "".concat("ledger", "/").concat(e, "/delete");
          return n.a.post(t);
        }
      };
    }
  }
]);
