(window.webpackJsonp = window.webpackJsonp || []).push([
  [59],
  {
    1461: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        l = a.n(n),
        r = a(25),
        s = a.n(r),
        i = a(22),
        o = a.n(i),
        c = a(26),
        u = a.n(c),
        d = a(27),
        m = a.n(d),
        p = a(16),
        f = a.n(p),
        h = a(6),
        v = a.n(h),
        g = a(0),
        k = a.n(g),
        b = a(4),
        y = a(693),
        E = function(e) {
          var t = e.name;
          return k.a.createElement(
            "div",
            { className: "row" },
            k.a.createElement(
              "div",
              { className: "col-md-4" },
              k.a.createElement(
                "div",
                {
                  className: "btn-group btn-group-flex margin-small",
                  role: "group"
                },
                k.a.createElement(y.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: b.e.goBack
                })
              )
            ),
            k.a.createElement(
              "div",
              { className: "col-md-4" },
              k.a.createElement(
                "h4",
                { className: "text-center" },
                "Taak type: ",
                t
              )
            ),
            k.a.createElement("div", { className: "col-md-4" })
          );
        },
        T = a(198),
        N = a(199),
        C = a.n(N),
        w = a(32),
        S = a(7),
        O = a.n(S),
        x = a(694),
        j = a(692),
        D = a(690),
        P = a(691),
        z = a(12),
        W = {
          fld: [
            "id",
            "name",
            "usesWfCompletedTask",
            "emailTemplateIdWfCompletedTask",
            "numberOfDaysToSendEmailCompletedTask",
            "usesWfExpiredTask",
            "emailTemplateIdWfExpiredTask"
          ],
          rlt: {
            emailTemplateWorkflowCompletedTask: [],
            emailTemplateWorkflowExpiredTask: []
          }
        },
        R = function(e) {
          var t = "jory/task-type/".concat(e);
          return z.a.get(t, { params: { jory: W } });
        },
        L = function(e) {
          var t = "".concat("task-type", "/").concat(e.id);
          return z.a.post(t, e, { params: { jory: W } });
        },
        M = a(14),
        A = a(201),
        q = a(700),
        F = a(709),
        I = a(695),
        _ = a(104),
        B = a(697),
        X = a.n(B);
      function G(e, t) {
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
            ? G(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : G(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
          var a,
            n = f()(e);
          if (t) {
            var l = f()(this).constructor;
            a = Reflect.construct(n, arguments, l);
          } else a = n.apply(this, arguments);
          return m()(this, a);
        };
      }
      O.a.locale("nl");
      var J = (function(e) {
          u()(a, e);
          var t = U(a);
          function a(e) {
            var n;
            return (
              l()(this, a),
              (n = t.call(this, e)),
              v()(o()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  l = t.name;
                n.setState(
                  V(
                    V({}, n.state),
                    {},
                    { taskType: V(V({}, n.state.taskType), {}, v()({}, l, a)) }
                  )
                );
              }),
              v()(o()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.taskType,
                  a = {},
                  l = !1;
                1 == t.usesWfExpiredTask &&
                  (t.emailTemplateIdWfExpiredTask ||
                    ((a.emailTemplateIdWfExpiredTask = !0), (l = !0))),
                  1 == t.usesWfCompletedTask &&
                    (t.emailTemplateIdWfCompletedTask ||
                      ((a.emailTemplateIdWfCompletedTask = !0), (l = !0)),
                    X.a.isEmpty(
                      t.numberOfDaysToSendEmailCompletedTask.toString()
                    ) &&
                      ((a.numberOfDaysToSendEmailCompletedTask = !0),
                      (l = !0))),
                  n.setState(V(V({}, n.state), {}, { errors: a })),
                  !l &&
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
                taskType: V({}, e.taskType),
                errors: {
                  usesWfCompletedTask: !1,
                  emailTemplateIdWfCompletedTask: !1,
                  numberOfDaysToSendEmailCompletedTask: !1,
                  usesWfExpiredTask: !1,
                  emailTemplateIdWfExpiredTask: !1
                },
                peekLoading: { emailTemplates: !0 }
              }),
              (n.handleReactSelectChange = n.handleReactSelectChange.bind(
                o()(n)
              )),
              n
            );
          }
          return (
            s()(a, [
              {
                key: "handleReactSelectChange",
                value: function(e, t) {
                  this.setState(
                    V(
                      V({}, this.state),
                      {},
                      {
                        taskType: V(
                          V({}, this.state.taskType),
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
                  _.a.fetchEmailTemplatesPeek().then(function(t) {
                    return e.setState({
                      emailTemplates: t,
                      peekLoading: V(
                        V({}, e.state.peekLoading),
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
                  var e = this.state.taskType,
                    t = e.name,
                    a = e.usesWfCompletedTask,
                    n = e.emailTemplateIdWfCompletedTask,
                    l = e.numberOfDaysToSendEmailCompletedTask,
                    r = e.usesWfExpiredTask,
                    s = e.emailTemplateIdWfExpiredTask;
                  return k.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    k.a.createElement(
                      D.a,
                      null,
                      k.a.createElement(
                        P.a,
                        null,
                        k.a.createElement(
                          "div",
                          { className: "row" },
                          k.a.createElement(I.a, {
                            label: "Omschrijving",
                            divSize: "col-sm-10",
                            value: t,
                            className: "col-sm-10 form-group"
                          })
                        ),
                        k.a.createElement(
                          "div",
                          { className: "row" },
                          k.a.createElement(q.a, {
                            label: "Gebruikt workflow verlopen taak",
                            divSize: "col-sm-10",
                            name: "usesWfExpiredTask",
                            value: r,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        1 == r &&
                          k.a.createElement(
                            k.a.Fragment,
                            null,
                            k.a.createElement(
                              "div",
                              { className: "row" },
                              k.a.createElement(I.a, {
                                label: "Uitleg workflow verlopen taak",
                                divSize: "col-sm-10",
                                value: this.props.explanationWfExpiredTask,
                                className: "col-sm-10 form-group"
                              })
                            ),
                            k.a.createElement(
                              "div",
                              { className: "row" },
                              k.a.createElement(F.a, {
                                label: "Template email verlopen taak",
                                divSize: "col-sm-10",
                                name: "emailTemplateIdWfExpiredTask",
                                options: this.state.emailTemplates,
                                value: s,
                                onChangeAction: this.handleReactSelectChange,
                                isLoading: this.state.peekLoading
                                  .emailTemplates,
                                multi: !1,
                                required: "required",
                                error: this.state.errors
                                  .emailTemplateIdWfExpiredTask
                              })
                            )
                          ),
                        k.a.createElement(
                          "div",
                          { className: "row" },
                          k.a.createElement(q.a, {
                            label: "Gebruikt workflow afgehandelde taak",
                            divSize: "col-sm-10",
                            name: "usesWfCompletedTask",
                            value: a,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        1 == a &&
                          k.a.createElement(
                            k.a.Fragment,
                            null,
                            k.a.createElement(
                              "div",
                              { className: "row" },
                              k.a.createElement(I.a, {
                                label: "Uitleg workflow afgehandelde taak",
                                divSize: "col-sm-10",
                                value: this.props.explanationWfCompletedTask,
                                className: "col-sm-10 form-group"
                              })
                            ),
                            k.a.createElement(
                              "div",
                              { className: "row" },
                              k.a.createElement(F.a, {
                                label: "Template email afgehandelde taak",
                                divSize: "col-sm-10",
                                name: "emailTemplateIdWfCompletedTask",
                                options: this.state.emailTemplates,
                                value: n,
                                onChangeAction: this.handleReactSelectChange,
                                isLoading: this.state.peekLoading
                                  .emailTemplates,
                                multi: !1,
                                required: "required",
                                error: this.state.errors
                                  .emailTemplateIdWfCompletedTask
                              })
                            ),
                            k.a.createElement(
                              "div",
                              { className: "row" },
                              k.a.createElement(x.a, {
                                label:
                                  "Aantal dagen email na afgehandelde taak",
                                divSize: "col-sm-10",
                                type: "number",
                                min: "1",
                                id: "numberOfDaysToSendEmailCompletedTask",
                                name: "numberOfDaysToSendEmailCompletedTask",
                                value: l,
                                onChangeAction: this.handleInputChange,
                                required: "required",
                                error: this.state.errors
                                  .numberOfDaysToSendEmailCompletedTask
                              })
                            )
                          )
                      ),
                      k.a.createElement(
                        P.a,
                        null,
                        k.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          k.a.createElement(j.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Sluiten",
                            onClickAction: this.props.switchToView
                          }),
                          k.a.createElement(j.a, {
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
        })(J),
        Y = function(e) {
          var t = e.name,
            a = e.usesWfCompletedTask,
            n = e.emailTemplateWorkflowCompletedTask,
            l = e.numberOfDaysToSendEmailCompletedTask,
            r = e.usesWfExpiredTask,
            s = e.emailTemplateWorkflowExpiredTask,
            i = e.switchToEdit,
            o = e.explanationWfExpiredTask,
            c = e.explanationWfCompletedTask;
          return k.a.createElement(
            "div",
            { onClick: i },
            k.a.createElement(
              D.a,
              null,
              k.a.createElement(
                P.a,
                null,
                k.a.createElement(
                  "div",
                  { className: "row" },
                  k.a.createElement(I.a, {
                    label: "Omschrijving",
                    divSize: "col-sm-10",
                    value: t,
                    className: "col-sm-10 form-group"
                  })
                ),
                k.a.createElement(
                  "div",
                  { className: "row" },
                  k.a.createElement(I.a, {
                    label: "Gebruikt workflow verlopen taak",
                    divSize: "col-sm-10",
                    value: r ? "Ja" : "Nee",
                    className: "col-sm-10 form-group"
                  })
                ),
                1 == r &&
                  k.a.createElement(
                    k.a.Fragment,
                    null,
                    k.a.createElement(
                      "div",
                      { className: "row" },
                      k.a.createElement(I.a, {
                        label: "Uitleg workflow verlopen taak",
                        divSize: "col-sm-10",
                        value: o,
                        className: "col-sm-10 form-group"
                      })
                    ),
                    k.a.createElement(
                      "div",
                      { className: "row" },
                      k.a.createElement(I.a, {
                        label: "Template email verlopen taak",
                        divSize: "col-sm-10",
                        value: s ? s.name : "",
                        className: "col-sm-10 form-group"
                      })
                    )
                  ),
                k.a.createElement(
                  "div",
                  { className: "row" },
                  k.a.createElement(I.a, {
                    label: "Gebruikt workflow afgehandelde taak",
                    divSize: "col-sm-10",
                    value: a ? "Ja" : "Nee",
                    className: "col-sm-10 form-group"
                  })
                ),
                1 == a &&
                  k.a.createElement(
                    k.a.Fragment,
                    null,
                    k.a.createElement(
                      "div",
                      { className: "row" },
                      k.a.createElement(I.a, {
                        label: "Uitleg workflow afgehandelde taak",
                        divSize: "col-sm-10",
                        value: c,
                        className: "col-sm-10 form-group"
                      })
                    ),
                    k.a.createElement(
                      "div",
                      { className: "row" },
                      k.a.createElement(I.a, {
                        label: "Template email afgehandelde taak",
                        divSize: "col-sm-10",
                        value: n ? n.name : "",
                        className: "col-sm-10 form-group"
                      })
                    ),
                    k.a.createElement(
                      "div",
                      { className: "row" },
                      k.a.createElement(I.a, {
                        label: "Aantal dagen email na afgehandelde taak",
                        divSize: "col-sm-10",
                        value: l,
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
            n = f()(e);
          if (t) {
            var l = f()(this).constructor;
            a = Reflect.construct(n, arguments, l);
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
              l()(this, a),
              (n = t.call(this, e)),
              v()(o()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              v()(o()(n), "switchToView", function() {
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
                    a = void 0 === t ? {} : t,
                    n = k.a.createElement(
                      "span",
                      null,
                      "Er zal automatisch eenmalig een email verstuurd worden naar de verantwoordelijke als deze taak is verlopen."
                    ),
                    l = k.a.createElement(
                      "span",
                      null,
                      "Er zal automatisch eenmalig een email verstuurd worden naar contact taak als deze taak is afgehandeld is, rekening houdend met het opgegeven aantal dagen."
                    );
                  return k.a.createElement(
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
                      ? k.a.createElement(K, {
                          taskType: this.props.taskType,
                          switchToView: this.switchToView,
                          updateState: this.props.updateState,
                          explanationWfExpiredTask: n,
                          explanationWfCompletedTask: l
                        })
                      : k.a.createElement(
                          Y,
                          C()({}, this.props.taskType, {
                            switchToEdit: this.switchToEdit,
                            explanationWfExpiredTask: n,
                            explanationWfCompletedTask: l
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
          var t = e.taskType,
            a = e.hasError,
            n = e.isLoading,
            l = e.updateState,
            r = "",
            s = !0;
          return (
            a
              ? (r = "Fout bij het ophalen van taak type.")
              : n
              ? (r = "Gegevens aan het laden.")
              : Object(T.isEmpty)(t)
              ? (r = "Geen taak type gevonden!")
              : (s = !1),
            s
              ? k.a.createElement("div", null, r)
              : k.a.createElement(
                  "div",
                  null,
                  k.a.createElement(Z, { taskType: t, updateState: l })
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
            n = f()(e);
          if (t) {
            var l = f()(this).constructor;
            a = Reflect.construct(n, arguments, l);
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
            l()(this, a),
            (n = t.call(this, e)),
            v()(o()(n), "callFetchTaskTypeDetails", function() {
              n.setState({ isLoading: !0, hasError: !1 }),
                R(n.props.params.id)
                  .then(function(e) {
                    n.setState({
                      isLoading: !1,
                      taskType: te({}, e.data.data)
                    });
                  })
                  .catch(function(e) {
                    n.setState({ isLoading: !1, hasError: !0 });
                  });
            }),
            v()(o()(n), "updateState", function(e) {
              n.setState({ taskType: e });
            }),
            (n.state = { taskType: {}, isLoading: !1, hasError: !1 }),
            n
          );
        }
        return (
          s()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.callFetchTaskTypeDetails();
              }
            },
            {
              key: "render",
              value: function() {
                return k.a.createElement(
                  "div",
                  { className: "row" },
                  k.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    k.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      k.a.createElement(
                        D.a,
                        null,
                        k.a.createElement(
                          P.a,
                          { className: "panel-small" },
                          k.a.createElement(E, {
                            name: this.state.taskType.name || ""
                          })
                        )
                      )
                    ),
                    k.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      k.a.createElement($, {
                        taskType: this.state.taskType,
                        isLoading: this.state.isLoading,
                        hasError: this.state.hasError,
                        updateState: this.updateState
                      })
                    )
                  ),
                  k.a.createElement("div", { className: "col-md-3" })
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
        l = a.n(n),
        r = a(8),
        s = a.n(r),
        i = function(e) {
          var t = e.children,
            a = e.className,
            n = e.onMouseEnter,
            r = e.onMouseLeave;
          return l.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: r
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
        l = a.n(n),
        r = a(8),
        s = a.n(r),
        i = function(e) {
          var t = e.className,
            a = e.children;
          return l.a.createElement(
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
        l = a.n(n),
        r = a(8),
        s = a.n(r),
        i = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            r = e.type,
            s = e.value,
            i = e.loading,
            o = e.loadText,
            c = e.disabled;
          return i
            ? l.a.createElement(
                "button",
                {
                  type: r,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: s,
                  disabled: i
                },
                l.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                o
              )
            : l.a.createElement(
                "button",
                {
                  type: r,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: s,
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
        l = a.n(n),
        r = a(8),
        s = a.n(r),
        i = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            r = e.title,
            s = e.disabled;
          return l.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: s,
              title: r
            },
            l.a.createElement("span", { className: "glyphicon ".concat(a) })
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
        l = a.n(n),
        r = a(8),
        s = a.n(r),
        i = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            r = e.size,
            s = e.id,
            i = e.placeholder,
            o = e.name,
            c = e.value,
            u = e.onClickAction,
            d = e.onChangeAction,
            m = e.onBlurAction,
            p = e.required,
            f = e.readOnly,
            h = e.maxLength,
            v = e.error,
            g = e.min,
            k = e.max,
            b = e.step,
            y = e.errorMessage,
            E = e.divSize,
            T = e.divClassName,
            N = e.autoComplete;
          return l.a.createElement(
            "div",
            { className: "form-group ".concat(E, " ").concat(T) },
            l.a.createElement(
              "label",
              { htmlFor: s, className: "col-sm-6 ".concat(p) },
              t
            ),
            l.a.createElement(
              "div",
              { className: "".concat(r) },
              l.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (v ? "has-error" : ""),
                id: s,
                placeholder: i,
                name: o,
                value: c,
                onClick: u,
                onChange: d,
                onBlur: m,
                readOnly: f,
                maxLength: h,
                min: g,
                max: k,
                autoComplete: N,
                step: b
              })
            ),
            v &&
              l.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                l.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  y
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
        l = a.n(n),
        r = a(4),
        s = a(8),
        i = a.n(s),
        o = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            s = e.value,
            i = e.link,
            o = e.hidden;
          return i.length > 0
            ? l.a.createElement(
                "div",
                { className: a, style: o ? { display: "none" } : {} },
                l.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                l.a.createElement(
                  "div",
                  { className: "col-sm-6", id: n, onClick: null },
                  l.a.createElement(
                    r.b,
                    { to: i, className: "link-underline" },
                    s
                  )
                )
              )
            : l.a.createElement(
                "div",
                { className: a, style: o ? { display: "none" } : {} },
                l.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                l.a.createElement("div", { className: "col-sm-6", id: n }, s)
              );
        };
      (o.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (o.propTypes = {
          label: i.a.oneOfType([i.a.string, i.a.object]).isRequired,
          className: i.a.string,
          id: i.a.string,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          link: i.a.string,
          hidden: i.a.bool
        }),
        (t.a = o);
    },
    700: function(e, t, a) {
      "use strict";
      var n = a(0),
        l = a.n(n),
        r = a(8),
        s = a.n(r),
        i = a(703),
        o = a.n(i),
        c = function(e) {
          var t = e.label,
            a = e.size,
            n = e.id,
            r = e.name,
            s = e.value,
            i = e.onChangeAction,
            c = e.required,
            u = e.divSize,
            d = e.className,
            m = e.disabled;
          return l.a.createElement(
            "div",
            { className: "form-group ".concat(u, " ").concat(d) },
            l.a.createElement(
              "div",
              null,
              l.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(c) },
                t
              )
            ),
            l.a.createElement(
              "div",
              { className: "".concat(a) },
              l.a.createElement(o.a, {
                id: n,
                name: r,
                onChange: i,
                checked: s,
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
          label: s.a.string.isRequired,
          type: s.a.string,
          size: s.a.string,
          divSize: s.a.string,
          id: s.a.string,
          name: s.a.string.isRequired,
          value: s.a.bool,
          onChangeAction: s.a.func,
          required: s.a.string,
          disabled: s.a.bool
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
        l = (function() {
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
        r = a(0),
        s = m(r),
        i = m(a(710)),
        o = m(a(8)),
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
          l(t, [
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
                  l =
                    (t.icons,
                    (function(e, t) {
                      var a = {};
                      for (var n in e)
                        t.indexOf(n) >= 0 ||
                          (Object.prototype.hasOwnProperty.call(e, n) &&
                            (a[n] = e[n]));
                      return a;
                    })(t, ["className", "icons"])),
                  r = (0, i.default)(
                    "react-toggle",
                    {
                      "react-toggle--checked": this.state.checked,
                      "react-toggle--focus": this.state.hasFocus,
                      "react-toggle--disabled": this.props.disabled
                    },
                    a
                  );
                return s.default.createElement(
                  "div",
                  {
                    className: r,
                    onClick: this.handleClick,
                    onTouchStart: this.handleTouchStart,
                    onTouchMove: this.handleTouchMove,
                    onTouchEnd: this.handleTouchEnd
                  },
                  s.default.createElement(
                    "div",
                    { className: "react-toggle-track" },
                    s.default.createElement(
                      "div",
                      { className: "react-toggle-track-check" },
                      this.getIcon("checked")
                    ),
                    s.default.createElement(
                      "div",
                      { className: "react-toggle-track-x" },
                      this.getIcon("unchecked")
                    )
                  ),
                  s.default.createElement("div", {
                    className: "react-toggle-thumb"
                  }),
                  s.default.createElement(
                    "input",
                    n({}, l, {
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
      })(r.PureComponent);
      (t.default = p),
        (p.displayName = "Toggle"),
        (p.defaultProps = {
          icons: {
            checked: s.default.createElement(c.default, null),
            unchecked: s.default.createElement(u.default, null)
          }
        }),
        (p.propTypes = {
          checked: o.default.bool,
          disabled: o.default.bool,
          defaultChecked: o.default.bool,
          onChange: o.default.func,
          onFocus: o.default.func,
          onBlur: o.default.func,
          className: o.default.string,
          name: o.default.string,
          value: o.default.string,
          id: o.default.string,
          "aria-labelledby": o.default.string,
          "aria-label": o.default.string,
          icons: o.default.oneOfType([
            o.default.bool,
            o.default.shape({
              checked: o.default.node,
              unchecked: o.default.node
            })
          ])
        });
    },
    704: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        l = a(0),
        r = (n = l) && n.__esModule ? n : { default: n };
      t.default = function() {
        return r.default.createElement(
          "svg",
          { width: "14", height: "11", viewBox: "0 0 14 11" },
          r.default.createElement("title", null, "switch-check"),
          r.default.createElement("path", {
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
        l = a(0),
        r = (n = l) && n.__esModule ? n : { default: n };
      t.default = function() {
        return r.default.createElement(
          "svg",
          { width: "10", height: "10", viewBox: "0 0 10 10" },
          r.default.createElement("title", null, "switch-x"),
          r.default.createElement("path", {
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
        l = a.n(n),
        r = a(8),
        s = a.n(r),
        i = a(714),
        o =
          (a(715),
          function(e) {
            var t = e.label,
              a = e.divSize,
              n = e.size,
              r = e.id,
              s = e.name,
              o = e.value,
              c = e.options,
              u = e.optionId,
              d = e.optionName,
              m = e.onChangeAction,
              p = e.required,
              f = e.multi,
              h = e.error,
              v = e.isLoading;
            return l.a.createElement(
              "div",
              { className: "form-group ".concat(a) },
              l.a.createElement(
                "label",
                { htmlFor: r, className: "col-sm-6 ".concat(p) },
                t
              ),
              l.a.createElement(
                "div",
                { className: "".concat(n) },
                l.a.createElement(i.a, {
                  id: r,
                  name: s,
                  value: o,
                  onChange: function(e) {
                    m(e || "", s);
                  },
                  options: c,
                  valueKey: u,
                  labelKey: d,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: f,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: h ? " has-error" : "",
                  isLoading: v
                })
              )
            );
          });
      (o.defaultProps = {
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
        (o.propTypes = {
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
        (t.a = o);
    }
  }
]);
