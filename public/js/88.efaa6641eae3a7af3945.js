(window.webpackJsonp = window.webpackJsonp || []).push([
  [88],
  {
    1459: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        s = n(25),
        o = n.n(s),
        i = n(22),
        c = n.n(i),
        l = n(26),
        u = n.n(l),
        d = n(27),
        m = n.n(d),
        p = n(16),
        f = n.n(p),
        h = n(6),
        v = n.n(h),
        C = n(0),
        g = n.n(C),
        y = n(4),
        b = n(693),
        E = n(8),
        N = n(100),
        w = function(e) {
          var t = e.deleteCostCenter,
            n = e.closeDeleteItemModal,
            a = e.description,
            r = e.id;
          return g.a.createElement(
            N.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: n,
              confirmAction: function() {
                return t(r), void n();
              },
              title: "Verwijderen"
            },
            "Verwijder kostenplaats: ",
            g.a.createElement("strong", null, a),
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return m()(this, n);
        };
      }
      var k = (function(e) {
        u()(n, e);
        var t = D(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            (a = t.call(this, e)),
            v()(c()(a), "toggleDelete", function() {
              a.setState({ showDelete: !a.state.showDelete });
            }),
            (a.state = { showDelete: !1 }),
            a
          );
        }
        return (
          o()(n, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.description,
                  n = e.id;
                return g.a.createElement(
                  "div",
                  { className: "row" },
                  g.a.createElement(
                    "div",
                    { className: "col-md-4" },
                    g.a.createElement(
                      "div",
                      {
                        className: "btn-group btn-group-flex margin-small",
                        role: "group"
                      },
                      g.a.createElement(b.a, {
                        iconName: "glyphicon-arrow-left",
                        onClickAction: y.e.goBack
                      }),
                      g.a.createElement(b.a, {
                        iconName: "glyphicon-trash",
                        onClickAction: this.toggleDelete
                      })
                    )
                  ),
                  g.a.createElement(
                    "div",
                    { className: "col-md-4" },
                    g.a.createElement(
                      "h4",
                      { className: "text-center" },
                      "Kostenplaats: ",
                      t
                    )
                  ),
                  g.a.createElement("div", { className: "col-md-4" }),
                  this.state.showDelete &&
                    g.a.createElement(w, {
                      closeDeleteItemModal: this.toggleDelete,
                      description: t,
                      id: n,
                      deleteCostCenter: this.props.deleteCostCenter
                    })
                );
              }
            }
          ]),
          n
        );
      })(C.Component);
      k.propTypes = { description: E.any };
      var S = k,
        O = n(198),
        T = n(199),
        R = n.n(T),
        j = n(32),
        x = n(697),
        A = n.n(x),
        L = n(7),
        P = n.n(L),
        M = n(694),
        q = n(692),
        z = n(690),
        V = n(691),
        F = n(811),
        B = n(14),
        I = n(201);
      function J(e, t) {
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
      function G(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? J(Object(n), !0).forEach(function(t) {
                v()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : J(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return m()(this, n);
        };
      }
      P.a.locale("nl");
      var K = (function(e) {
          u()(n, e);
          var t = H(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              v()(c()(a), "handleInputChange", function(e) {
                var t = e.target,
                  n = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                a.setState(
                  G(
                    G({}, a.state),
                    {},
                    {
                      costCenter: G(
                        G({}, a.state.costCenter),
                        {},
                        v()({}, r, n)
                      )
                    }
                  )
                );
              }),
              v()(c()(a), "handleSubmit", function(e) {
                e.preventDefault();
                var t = a.state.costCenter,
                  n = {},
                  r = !1;
                A.a.isEmpty(t.description) && ((n.description = !0), (r = !0)),
                  t.twinfieldCostCenterCode &&
                    t.twinfieldCostCenterCode !==
                      a.props.costCenter.twinfieldCostCenterCode &&
                    a.props.costCenters.map(function(e) {
                      e.twinfieldCostCenterCode == t.twinfieldCostCenterCode &&
                        ((r = !0), (n.twinfieldCostCenterCode = !0));
                    }),
                  a.setState(G(G({}, a.state), {}, { errors: n })),
                  !r &&
                    F.a
                      .updateCostCenter(t)
                      .then(function(e) {
                        a.props.updateState(t),
                          a.props.fetchSystemData(),
                          a.props.switchToView();
                      })
                      .catch(function(e) {
                        alert(
                          "Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals."
                        );
                      });
              }),
              (a.state = {
                costCenter: G({}, e.costCenter),
                errors: { description: !1 }
              }),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "render",
                value: function() {
                  var e = this.state.costCenter,
                    t = e.description,
                    n = e.twinfieldCostCenterCode;
                  return g.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    g.a.createElement(
                      z.a,
                      null,
                      g.a.createElement(
                        V.a,
                        null,
                        g.a.createElement(
                          "div",
                          { className: "row" },
                          g.a.createElement(M.a, {
                            label: "Omschrijving",
                            name: "description",
                            value: t,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.description
                          })
                        ),
                        g.a.createElement(
                          "div",
                          { className: "row" },
                          g.a.createElement(M.a, {
                            label: "Twinfield kostenplaats code",
                            name: "twinfieldCostCenterCode",
                            value: n,
                            onChangeAction: this.handleInputChange,
                            error: this.state.errors.twinfieldCostCenterCode,
                            errorMessage:
                              "Deze kostenplaats code wordt al gebruikt."
                          })
                        )
                      ),
                      g.a.createElement(
                        V.a,
                        null,
                        g.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          g.a.createElement(q.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Sluiten",
                            onClickAction: this.props.switchToView
                          }),
                          g.a.createElement(q.a, {
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
            n
          );
        })(C.Component),
        Q = Object(j.b)(null, function(e) {
          return Object(B.b)({ fetchSystemData: I.a }, e);
        })(K),
        U = n(695),
        W = function(e) {
          var t = e.description,
            n = e.twinfieldCostCenterCode,
            a = e.switchToEdit;
          return g.a.createElement(
            "div",
            { onClick: a },
            g.a.createElement(
              z.a,
              null,
              g.a.createElement(
                V.a,
                null,
                g.a.createElement(
                  "div",
                  { className: "row" },
                  g.a.createElement(U.a, { label: "Omschrijving", value: t })
                ),
                g.a.createElement(
                  "div",
                  { className: "row" },
                  g.a.createElement(U.a, {
                    label: "Twinfield kostenplaats code",
                    value: n
                  })
                )
              )
            )
          );
        };
      function X(e) {
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
          return m()(this, n);
        };
      }
      var Y = (function(e) {
          u()(n, e);
          var t = X(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              v()(c()(a), "switchToEdit", function() {
                a.setState({ showEdit: !0 });
              }),
              v()(c()(a), "switchToView", function() {
                a.setState({ showEdit: !1, activeDiv: "" });
              }),
              (a.state = { showEdit: !1, activeDiv: "" }),
              a
            );
          }
          return (
            o()(n, [
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
                    n = void 0 === t ? {} : t;
                  return g.a.createElement(
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
                    this.state.showEdit && n.manageFinancial
                      ? g.a.createElement(Q, {
                          costCenter: this.props.costCenter,
                          costCenters: this.props.costCenters,
                          switchToView: this.switchToView,
                          updateState: this.props.updateState
                        })
                      : g.a.createElement(
                          W,
                          R()({}, this.props.costCenter, {
                            switchToEdit: this.switchToEdit
                          })
                        )
                  );
                }
              }
            ]),
            n
          );
        })(C.Component),
        Z = Object(j.b)(function(e) {
          return {
            meDetails: e.meDetails,
            permissions: e.meDetails.permissions,
            costCenters: e.systemData.costCenters
          };
        })(Y);
      function $(e) {
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
          return m()(this, n);
        };
      }
      var _ = (function(e) {
        u()(n, e);
        var t = $(n);
        function n(e) {
          return r()(this, n), t.call(this, e);
        }
        return (
          o()(n, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.costCenter,
                  n = e.hasError,
                  a = e.isLoading,
                  r = e.updateState,
                  s = "",
                  o = !0;
                return (
                  n
                    ? (s = "Fout bij het ophalen van kostenplaats.")
                    : a
                    ? (s = "Gegevens aan het laden.")
                    : Object(O.isEmpty)(t)
                    ? (s = "Geen kostenplaats gevonden!")
                    : (o = !1),
                  o
                    ? g.a.createElement("div", null, s)
                    : g.a.createElement(
                        "div",
                        null,
                        g.a.createElement(Z, { costCenter: t, updateState: r })
                      )
                );
              }
            }
          ]),
          n
        );
      })(C.Component);
      _.propTypes = {
        costCenter: E.any,
        hasError: E.any,
        isLoading: E.any,
        updateState: E.any
      };
      var ee = _,
        te = n(202);
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return m()(this, n);
        };
      }
      var ae = (function(e) {
        u()(n, e);
        var t = ne(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            (a = t.call(this, e)),
            v()(c()(a), "callFetchCostCenterDetails", function() {
              a.setState({ isLoading: !0, hasError: !1 }),
                F.a
                  .fetchCostCenterDetails(a.props.params.id)
                  .then(function(e) {
                    a.setState({ isLoading: !1, costCenter: e.data.data });
                  })
                  .catch(function(e) {
                    a.setState({ isLoading: !1, hasError: !0 });
                  });
            }),
            v()(c()(a), "deleteCostCenter", function(e) {
              F.a
                .deleteCostCenter(e)
                .then(function(e) {
                  y.f.push("/kostenplaatsen");
                })
                .catch(function(e) {
                  a.props.setError(e.response.status, e.response.data.message);
                });
            }),
            v()(c()(a), "updateState", function(e) {
              a.setState({ costCenter: e });
            }),
            (a.state = { costCenter: {}, isLoading: !1, hasError: !1 }),
            a
          );
        }
        return (
          o()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.callFetchCostCenterDetails();
              }
            },
            {
              key: "render",
              value: function() {
                return g.a.createElement(
                  "div",
                  { className: "row" },
                  g.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    g.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      g.a.createElement(
                        z.a,
                        null,
                        g.a.createElement(
                          V.a,
                          { className: "panel-small" },
                          g.a.createElement(S, {
                            description:
                              this.state.costCenter.description || "",
                            id: this.state.costCenter.id,
                            deleteCostCenter: this.deleteCostCenter
                          })
                        )
                      )
                    ),
                    g.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      g.a.createElement(ee, {
                        costCenter: this.state.costCenter,
                        isLoading: this.state.isLoading,
                        hasError: this.state.hasError,
                        updateState: this.updateState
                      })
                    )
                  ),
                  g.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          n
        );
      })(C.Component);
      t.default = Object(j.b)(null, function(e) {
        return {
          setError: function(t, n) {
            e(Object(te.b)(t, n));
          }
        };
      })(ae);
    },
    690: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        s = n(8),
        o = n.n(s),
        i = function(e) {
          var t = e.children,
            n = e.className,
            a = e.onMouseEnter,
            s = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(n),
              onMouseEnter: a,
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
    691: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        s = n(8),
        o = n.n(s),
        i = function(e) {
          var t = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            n
          );
        };
      (i.defaultProps = { className: "" }),
        (i.propTypes = { className: o.a.string }),
        (t.a = i);
    },
    692: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        s = n(8),
        o = n.n(s),
        i = function(e) {
          var t = e.buttonClassName,
            n = e.buttonText,
            a = e.onClickAction,
            s = e.type,
            o = e.value,
            i = e.loading,
            c = e.loadText,
            l = e.disabled;
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
                c
              )
            : r.a.createElement(
                "button",
                {
                  type: s,
                  className: "btn btn-sm ".concat(t),
                  onClick: a,
                  value: o,
                  disabled: l
                },
                n
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
    693: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        s = n(8),
        o = n.n(s),
        i = function(e) {
          var t = e.buttonClassName,
            n = e.iconName,
            a = e.onClickAction,
            s = e.title,
            o = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: a,
              disabled: o,
              title: s
            },
            r.a.createElement("span", { className: "glyphicon ".concat(n) })
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
    694: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        s = n(8),
        o = n.n(s),
        i = function(e) {
          var t = e.label,
            n = e.type,
            a = e.className,
            s = e.size,
            o = e.id,
            i = e.placeholder,
            c = e.name,
            l = e.value,
            u = e.onClickAction,
            d = e.onChangeAction,
            m = e.onBlurAction,
            p = e.required,
            f = e.readOnly,
            h = e.maxLength,
            v = e.error,
            C = e.min,
            g = e.max,
            y = e.step,
            b = e.errorMessage,
            E = e.divSize,
            N = e.divClassName,
            w = e.autoComplete;
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
              { className: "".concat(s) },
              r.a.createElement("input", {
                type: n,
                className:
                  "form-control input-sm ".concat(a) + (v ? "has-error" : ""),
                id: o,
                placeholder: i,
                name: c,
                value: l,
                onClick: u,
                onChange: d,
                onBlur: m,
                readOnly: f,
                maxLength: h,
                min: C,
                max: g,
                autoComplete: w,
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
                  b
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
    695: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        s = n(4),
        o = n(8),
        i = n.n(o),
        c = function(e) {
          var t = e.label,
            n = e.className,
            a = e.id,
            o = e.value,
            i = e.link,
            c = e.hidden;
          return i.length > 0
            ? r.a.createElement(
                "div",
                { className: n, style: c ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: a, className: "col-sm-6" },
                  t
                ),
                r.a.createElement(
                  "div",
                  { className: "col-sm-6", id: a, onClick: null },
                  r.a.createElement(
                    s.b,
                    { to: i, className: "link-underline" },
                    o
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: n, style: c ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: a, className: "col-sm-6" },
                  t
                ),
                r.a.createElement("div", { className: "col-sm-6", id: a }, o)
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
    811: function(e, t, n) {
      "use strict";
      var a = n(12);
      n(2);
      t.a = {
        fetchCostCenterDetails: function(e) {
          var t = "jory/cost-center/".concat(e);
          return a.a.get(t, {
            params: {
              jory: { fld: ["id", "description", "twinfieldCostCenterCode"] }
            }
          });
        },
        newCostCenter: function(e) {
          return (
            (e.jory = JSON.stringify({ fld: ["id"] })),
            a.a.post("cost-center", e)
          );
        },
        updateCostCenter: function(e) {
          var t = "".concat("cost-center", "/").concat(e.id);
          return a.a.post(t, e);
        },
        deleteCostCenter: function(e) {
          var t = "".concat("cost-center", "/").concat(e, "/delete");
          return a.a.post(t);
        }
      };
    }
  }
]);
