(window.webpackJsonp = window.webpackJsonp || []).push([
  [67],
  {
    1426: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        s = n(25),
        o = n.n(s),
        c = n(26),
        i = n.n(c),
        l = n(27),
        u = n.n(l),
        m = n(16),
        f = n.n(m),
        p = n(0),
        h = n.n(p),
        d = n(32),
        g = n(4),
        v = n(690),
        b = n(691),
        E = n(693),
        y = Object(d.b)(function(e) {
          return { measureDetails: e.measureDetails };
        })(function(e) {
          var t = e.measureDetails.measureCategory;
          return h.a.createElement(
            "div",
            { className: "row" },
            h.a.createElement(
              "div",
              { className: "col-sm-12" },
              h.a.createElement(
                v.a,
                null,
                h.a.createElement(
                  b.a,
                  { className: "panel-small" },
                  h.a.createElement(
                    "div",
                    { className: "col-md-2" },
                    h.a.createElement(
                      "div",
                      {
                        className: "btn-group btn-group-flex margin-small",
                        role: "group"
                      },
                      h.a.createElement(E.a, {
                        iconName: "glyphicon-arrow-left",
                        onClickAction: g.e.goBack
                      })
                    )
                  ),
                  h.a.createElement(
                    "div",
                    { className: "col-md-8" },
                    h.a.createElement(
                      "h4",
                      { className: "text-center text-success margin-small" },
                      h.a.createElement(
                        "strong",
                        null,
                        t ? "Maatregel: " + t.name : ""
                      )
                    )
                  ),
                  h.a.createElement("div", { className: "col-md-2" })
                )
              )
            )
          );
        }),
        w = n(198),
        N = n(22),
        O = n.n(N),
        D = n(6),
        j = n.n(D),
        S = (n(697), n(694)),
        k = n(692),
        C = n(702),
        q = n(106),
        P = function(e) {
          return { type: "FETCH_MEASURE", id: e };
        },
        R = n(734);
      function A(e, t) {
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
      function L(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? A(Object(n), !0).forEach(function(t) {
                j()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : A(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function M(e) {
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
      var x = (function(e) {
          i()(n, e);
          var t = M(n);
          function n(e) {
            var a;
            r()(this, n),
              (a = t.call(this, e)),
              j()(O()(a), "handleInputChange", function(e) {
                var t = e.target,
                  n = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                a.setState(
                  L(
                    L({}, a.state),
                    {},
                    { measure: L(L({}, a.state.measure), {}, j()({}, r, n)) }
                  )
                );
              }),
              j()(O()(a), "handleSubmit", function(e) {
                e.preventDefault();
                var t = a.state.measure;
                q.a.updateMeasure(t.id, t).then(function(e) {
                  a.props.fetchMeasure(t.id), a.props.switchToView();
                });
              });
            var s = e.measureDetails,
              o = s.id,
              c = s.description;
            return (a.state = { measure: { id: o, description: c || "" } }), a;
          }
          return (
            o()(n, [
              {
                key: "render",
                value: function() {
                  var e = this.state.measure.description,
                    t = this.props.measureDetails,
                    n = t.name,
                    a = t.number,
                    r = t.measureCategory,
                    s = void 0 === r ? {} : r;
                  return h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal col-md-12",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(S.a, {
                        label: "Maatregel categorie",
                        name: "measureCategory",
                        value: s.name,
                        onChangeAction: function() {},
                        readOnly: !0
                      }),
                      h.a.createElement(S.a, {
                        label: "Nummer",
                        name: "number",
                        value: a,
                        readOnly: !0
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(S.a, {
                        label: "Maatregel specifiek",
                        name: "name",
                        value: n,
                        onChangeAction: function() {},
                        readOnly: !0
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(R.a, {
                        label: "Beschrijving",
                        name: "description",
                        value: e,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    h.a.createElement(
                      C.a,
                      null,
                      h.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        h.a.createElement(k.a, {
                          buttonClassName: "btn-default",
                          buttonText: "Annuleren",
                          onClickAction: this.props.switchToView
                        }),
                        h.a.createElement(k.a, {
                          buttonText: "Opslaan",
                          onClickAction: this.handleSubmit,
                          type: "submit",
                          value: "Submit"
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
        T = Object(d.b)(
          function(e) {
            return { measureDetails: e.measureDetails };
          },
          function(e) {
            return {
              fetchMeasure: function(t) {
                e(P(t));
              }
            };
          }
        )(x),
        z = n(695),
        I = Object(d.b)(function(e) {
          return { measureDetails: e.measureDetails };
        })(function(e) {
          var t = e.measureDetails,
            n = t.name,
            a = t.number,
            r = t.description,
            s = t.measureCategory,
            o = void 0 === s ? {} : s;
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              h.a.createElement(z.a, {
                label: "Maatregel categorie",
                value: o.name
              }),
              h.a.createElement(z.a, { label: "Nummer", value: a })
            ),
            h.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              h.a.createElement(z.a, { label: "Maatregel specifiek", value: n })
            ),
            h.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              h.a.createElement(
                "div",
                { className: "col-sm-3" },
                h.a.createElement(
                  "label",
                  { htmlFor: "description", className: "col-sm-12" },
                  "Beschrijving"
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-9", id: "description" },
                r
              )
            )
          );
        });
      function B(e) {
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
      var V = (function(e) {
          i()(n, e);
          var t = B(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              j()(O()(a), "switchToEdit", function() {
                a.setState({ showEdit: !0 });
              }),
              j()(O()(a), "switchToView", function() {
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
                  var e = this;
                  return h.a.createElement(
                    v.a,
                    {
                      className: this.state.activeDiv,
                      onMouseEnter: function() {
                        return e.onDivEnter();
                      },
                      onMouseLeave: function() {
                        return e.onDivLeave();
                      }
                    },
                    h.a.createElement(
                      b.a,
                      null,
                      this.state.showEdit &&
                        this.props.permissions.manageMeasure
                        ? h.a.createElement(T, {
                            switchToView: this.switchToView
                          })
                        : h.a.createElement(I, {
                            switchToEdit: this.switchToEdit
                          })
                    )
                  );
                }
              }
            ]),
            n
          );
        })(p.Component),
        F = Object(d.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(V),
        Q = Object(d.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(function(e) {
          var t = e.faq,
            n = (t.id, t.question),
            a = t.answer;
          return h.a.createElement(
            "div",
            {
              className: "row border ".concat(e.highlightLine),
              onMouseEnter: function() {
                return e.onLineEnter();
              },
              onMouseLeave: function() {
                return e.onLineLeave();
              }
            },
            h.a.createElement(
              "div",
              { onClick: e.openEdit },
              h.a.createElement("div", { className: "col-sm-5" }, n),
              h.a.createElement("div", { className: "col-sm-6" }, a)
            ),
            h.a.createElement(
              "div",
              { className: "col-sm-1" },
              e.permissions.manageMeasure && e.showActionButtons
                ? h.a.createElement(
                    "a",
                    { role: "button", onClick: e.openEdit },
                    h.a.createElement("span", {
                      className: "glyphicon glyphicon-pencil mybtn-success"
                    }),
                    " "
                  )
                : "",
              e.showActionButtons && e.permissions.manageMeasure
                ? h.a.createElement(
                    "a",
                    { role: "button", onClick: e.toggleDelete },
                    h.a.createElement("span", {
                      className: "glyphicon glyphicon-trash mybtn-danger"
                    }),
                    " "
                  )
                : ""
            )
          );
        }),
        G = n(100),
        _ = Object(d.b)(
          function(e) {
            return { measureId: e.measureDetails.id };
          },
          function(e) {
            return {
              fetchMeasure: function(t) {
                e(P(t));
              }
            };
          }
        )(function(e) {
          return h.a.createElement(
            G.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.toggleDelete,
              confirmAction: function() {
                q.a.deleteFaq(e.id).then(function() {
                  e.fetchMeasure(e.measureId), e.toggleDelete();
                });
              },
              title: "Verwijderen"
            },
            h.a.createElement(
              "p",
              null,
              "Wil je deze response ontkoppelen van deze campagne?"
            )
          );
        });
      function U(e, t) {
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
      function W(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? U(Object(n), !0).forEach(function(t) {
                j()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : U(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var H = (function(e) {
        i()(n, e);
        var t = J(n);
        function n(e) {
          var a;
          r()(this, n),
            (a = t.call(this, e)),
            j()(O()(a), "handleQuestionChange", function(e) {
              var t = e.target,
                n = "checkbox" === t.type ? t.checked : t.value;
              a.setState(
                W(
                  W({}, a.state),
                  {},
                  { faq: W(W({}, a.state.faq), {}, { question: n }) }
                )
              ),
                a.props.setQuestion(n);
            }),
            j()(O()(a), "handleAnswerChange", function(e) {
              var t = e.target,
                n = "checkbox" === t.type ? t.checked : t.value;
              a.setState(
                W(
                  W({}, a.state),
                  {},
                  { faq: W(W({}, a.state.faq), {}, { answer: n }) }
                )
              ),
                a.props.setAnswer(n);
            });
          var s = e.faq,
            o = s.id,
            c = s.question,
            i = s.answer;
          return (a.state = { faq: { id: o, question: c, answer: i } }), a;
        }
        return (
          o()(n, [
            {
              key: "render",
              value: function() {
                var e = this.state.faq,
                  t = e.question,
                  n = e.answer;
                return h.a.createElement(
                  "div",
                  null,
                  h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      v.a,
                      { className: "panel-grey" },
                      h.a.createElement(
                        b.a,
                        null,
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(S.a, {
                              label: "Vraag",
                              size: "col-sm-6",
                              name: "question",
                              value: t,
                              onChangeAction: this.handleQuestionChange,
                              required: "required",
                              error: this.props.errors.question
                            }),
                            h.a.createElement(S.a, {
                              label: "Antwoord",
                              size: "col-sm-6",
                              name: "answer",
                              value: n,
                              onChangeAction: this.handleAnswerChange,
                              required: "required",
                              error: this.props.errors.answer
                            })
                          )
                        ),
                        h.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          h.a.createElement(k.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.cancelEdit
                          }),
                          h.a.createElement(k.a, {
                            buttonText: "Opslaan",
                            onClickAction: this.props.handleSubmit,
                            type: "submit",
                            value: "Submit"
                          })
                        )
                      )
                    )
                  )
                );
              }
            }
          ]),
          n
        );
      })(p.Component);
      function K(e, t) {
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
      function X(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? K(Object(n), !0).forEach(function(t) {
                j()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : K(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var Z = (function(e) {
          i()(n, e);
          var t = Y(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              j()(O()(a), "onLineEnter", function() {
                a.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              j()(O()(a), "onLineLeave", function() {
                a.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              j()(O()(a), "toggleDelete", function() {
                a.setState({ showDelete: !a.state.showDelete });
              }),
              j()(O()(a), "openEdit", function() {
                a.props.permissions.manageMeasure &&
                  a.setState({ showEdit: !0 });
              }),
              j()(O()(a), "closeEdit", function() {
                a.setState({ showEdit: !1 });
              }),
              j()(O()(a), "cancelEdit", function() {
                a.setState(
                  X(
                    X({}, a.state),
                    {},
                    {
                      faq: X({}, a.props.faq),
                      errors: { question: !1, answer: !1 }
                    }
                  )
                ),
                  a.closeEdit();
              }),
              j()(O()(a), "setQuestion", function(e) {
                a.setState(
                  X(
                    X({}, a.state),
                    {},
                    { faq: X(X({}, a.state.faq), {}, { question: e }) }
                  )
                );
              }),
              j()(O()(a), "setAnswer", function(e) {
                a.setState(
                  X(
                    X({}, a.state),
                    {},
                    { faq: X(X({}, a.state.faq), {}, { answer: e }) }
                  )
                );
              }),
              j()(O()(a), "handleSubmit", function(e) {
                e.preventDefault();
                var t = a.state.faq;
                Object(w.isEmpty)(t.question) && Object(w.isEmpty)(t.answer)
                  ? a.setState(
                      X(
                        X({}, a.state),
                        {},
                        { errors: { answer: !0, question: !0 } }
                      )
                    )
                  : Object(w.isEmpty)(t.question)
                  ? a.setState(
                      X(X({}, a.state), {}, { errors: { question: !0 } })
                    )
                  : Object(w.isEmpty)(t.answer)
                  ? a.setState(
                      X(X({}, a.state), {}, { errors: { answer: !0 } })
                    )
                  : (a.setState(
                      X(
                        X({}, a.state),
                        {},
                        { errors: { question: !1, answer: !1 } }
                      )
                    ),
                    q.a.updateFaq(t).then(function() {
                      a.closeEdit();
                    }));
              }),
              (a.state = {
                showActionButtons: !1,
                highlightLine: "",
                showDelete: !1,
                faq: X({}, e.faq),
                errors: { question: !1, answer: !1 }
              }),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    "div",
                    null,
                    h.a.createElement(Q, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      toggleDelete: this.toggleDelete,
                      faq: this.state.faq,
                      openEdit: this.openEdit
                    }),
                    this.state.showEdit &&
                      h.a.createElement(H, {
                        faq: this.state.faq,
                        setQuestion: this.setQuestion,
                        setAnswer: this.setAnswer,
                        handleSubmit: this.handleSubmit,
                        cancelEdit: this.cancelEdit,
                        errors: this.state.errors
                      }),
                    this.state.showDelete &&
                      h.a.createElement(_, {
                        toggleDelete: this.toggleDelete,
                        id: this.state.faq.id
                      })
                  );
                }
              }
            ]),
            n
          );
        })(p.Component),
        $ = Object(d.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(Z),
        ee = Object(d.b)(function(e) {
          return { faqs: e.measureDetails.faqs };
        })(function(e) {
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "row border header" },
              h.a.createElement("div", { className: "col-sm-5" }, "Vraag"),
              h.a.createElement("div", { className: "col-sm-6" }, "Antwoord"),
              h.a.createElement("div", { className: "col-sm-1" })
            ),
            e.faqs.length > 0
              ? e.faqs.map(function(e) {
                  return h.a.createElement($, { key: e.id, faq: e });
                })
              : h.a.createElement("div", null, "Geen FAQs bekend.")
          );
        });
      function te(e, t) {
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
      function ne(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? te(Object(n), !0).forEach(function(t) {
                j()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : te(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var re = (function(e) {
          i()(n, e);
          var t = ae(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              j()(O()(a), "handleQuestionChange", function(e) {
                var t = e.target,
                  n = "checkbox" === t.type ? t.checked : t.value;
                a.setState(
                  ne(
                    ne({}, a.state),
                    {},
                    { faq: { question: n, answer: a.state.faq.answer } }
                  )
                );
              }),
              j()(O()(a), "handleAnswerChange", function(e) {
                var t = e.target,
                  n = "checkbox" === t.type ? t.checked : t.value;
                a.setState(
                  ne(
                    ne({}, a.state),
                    {},
                    { faq: { question: a.state.faq.question, answer: n } }
                  )
                );
              }),
              j()(O()(a), "handleSubmit", function(e) {
                e.preventDefault();
                var t = a.state.faq;
                Object(w.isEmpty)(t.question) && Object(w.isEmpty)(t.answer)
                  ? a.setState(
                      ne(
                        ne({}, a.state),
                        {},
                        { errors: { answer: !0, question: !0 } }
                      )
                    )
                  : Object(w.isEmpty)(t.question)
                  ? a.setState(
                      ne(ne({}, a.state), {}, { errors: { question: !0 } })
                    )
                  : Object(w.isEmpty)(t.answer)
                  ? a.setState(
                      ne(ne({}, a.state), {}, { errors: { answer: !0 } })
                    )
                  : (a.setState(
                      ne(
                        ne({}, a.state),
                        {},
                        { errors: { question: !1, answer: !1 } }
                      )
                    ),
                    q.a.storeFaq(a.props.measureId, t).then(function() {
                      a.props.fetchMeasure(a.props.measureId),
                        a.props.toggleShowNew();
                    }));
              }),
              (a.state = {
                faq: { question: "", answer: "" },
                errors: { question: !1, answer: !1 }
              }),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "render",
                value: function() {
                  var e = this.state.faq,
                    t = e.question,
                    n = e.answer;
                  return h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      v.a,
                      { className: "panel-grey" },
                      h.a.createElement(
                        b.a,
                        null,
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(S.a, {
                            label: "Vraag",
                            name: "question",
                            value: t,
                            onChangeAction: this.handleQuestionChange,
                            required: "required",
                            error: this.state.errors.question
                          }),
                          h.a.createElement(S.a, {
                            label: "Antwoord",
                            name: "answer",
                            value: n,
                            onChangeAction: this.handleAnswerChange,
                            required: "required",
                            error: this.state.errors.answer
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          h.a.createElement(k.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          h.a.createElement(k.a, {
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
            n
          );
        })(p.Component),
        se = Object(d.b)(
          function(e) {
            return { measureId: e.measureDetails.id };
          },
          function(e) {
            return {
              fetchMeasure: function(t) {
                e(P(t));
              }
            };
          }
        )(re),
        oe = n(698);
      function ce(e) {
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
      var ie = (function(e) {
          i()(n, e);
          var t = ce(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              j()(O()(a), "toggleShowNew", function() {
                a.setState({ showNew: !a.state.showNew });
              }),
              (a.state = { showNew: !1 }),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    v.a,
                    null,
                    h.a.createElement(
                      oe.a,
                      null,
                      h.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "FAQ"
                      ),
                      this.props.permissions.manageMeasure &&
                        h.a.createElement(
                          "a",
                          {
                            role: "button",
                            className: "pull-right",
                            onClick: this.toggleShowNew
                          },
                          h.a.createElement("span", {
                            className: "glyphicon glyphicon-plus"
                          })
                        )
                    ),
                    h.a.createElement(
                      b.a,
                      null,
                      h.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        h.a.createElement(ee, null)
                      ),
                      h.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          h.a.createElement(se, {
                            toggleShowNew: this.toggleShowNew
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
        le = Object(d.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(ie),
        ue = Object(d.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(function(e) {
          var t = e.supplier,
            n = (t.id, t.name),
            a = t.address,
            r = t.contactId;
          return h.a.createElement(
            "div",
            {
              className: "row border ".concat(e.highlightLine),
              onMouseEnter: function() {
                return e.onLineEnter();
              },
              onMouseLeave: function() {
                return e.onLineLeave();
              }
            },
            h.a.createElement(
              "div",
              {
                onClick: function() {
                  return g.f.push("/contact/".concat(r));
                }
              },
              h.a.createElement("div", { className: "col-sm-5" }, n),
              h.a.createElement(
                "div",
                { className: "col-sm-6" },
                a ? a.city : "Niet bekend"
              )
            ),
            h.a.createElement(
              "div",
              { className: "col-sm-1" },
              e.showActionButtons && e.permissions.manageMeasure
                ? h.a.createElement(
                    "a",
                    { role: "button", onClick: e.toggleDelete },
                    h.a.createElement("span", {
                      className: "glyphicon glyphicon-trash mybtn-danger"
                    }),
                    " "
                  )
                : ""
            )
          );
        }),
        me = Object(d.b)(
          function(e) {
            return { measureId: e.measureDetails.id };
          },
          function(e) {
            return {
              fetchMeasure: function(t) {
                e(P(t));
              }
            };
          }
        )(function(e) {
          return h.a.createElement(
            G.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.toggleDelete,
              confirmAction: function() {
                q.a.detachSupplier(e.measureId, e.supplierId).then(function() {
                  e.fetchMeasure(e.measureId), e.toggleDelete();
                });
              },
              title: "Verwijderen"
            },
            h.a.createElement(
              "p",
              null,
              "Wil je deze organisatie verwijderen als leverancier van deze maatregel?"
            )
          );
        });
      function fe(e, t) {
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
      function pe(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? fe(Object(n), !0).forEach(function(t) {
                j()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : fe(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function he(e) {
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
      var de = (function(e) {
          i()(n, e);
          var t = he(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              j()(O()(a), "onLineEnter", function() {
                a.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              j()(O()(a), "onLineLeave", function() {
                a.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              j()(O()(a), "toggleDelete", function() {
                a.setState({ showDelete: !a.state.showDelete });
              }),
              (a.state = {
                showActionButtons: !1,
                highlightLine: "",
                showDelete: !1,
                supplier: pe({}, e.supplier)
              }),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    "div",
                    null,
                    h.a.createElement(ue, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      toggleDelete: this.toggleDelete,
                      supplier: this.state.supplier
                    }),
                    this.state.showDelete &&
                      h.a.createElement(me, {
                        toggleDelete: this.toggleDelete,
                        supplierId: this.state.supplier.id
                      })
                  );
                }
              }
            ]),
            n
          );
        })(p.Component),
        ge = Object(d.b)(function(e) {
          return { suppliers: e.measureDetails.suppliers };
        })(function(e) {
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "row border header" },
              h.a.createElement(
                "div",
                { className: "col-sm-5" },
                "Organisatie"
              ),
              h.a.createElement("div", { className: "col-sm-6" }, "Plaats"),
              h.a.createElement("div", { className: "col-sm-1" })
            ),
            e.suppliers.length > 0
              ? e.suppliers.map(function(e) {
                  return h.a.createElement(de, { key: e.id, supplier: e });
                })
              : h.a.createElement("div", null, "Geen leveranciers bekend.")
          );
        }),
        ve = n(744),
        be = n(696);
      function Ee(e, t) {
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
      function ye(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Ee(Object(n), !0).forEach(function(t) {
                j()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : Ee(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function we(e) {
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
      var Ne = (function(e) {
          i()(n, e);
          var t = we(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              j()(O()(a), "handleOrganisationChange", function(e) {
                var t = e.target,
                  n = "checkbox" === t.type ? t.checked : t.value;
                "" === n
                  ? a.setState(
                      ye(
                        ye({}, a.state),
                        {},
                        {
                          organisationId: "",
                          errors: { organisation: !0, hasErrors: !0 }
                        }
                      )
                    )
                  : a.setState(
                      ye(
                        ye({}, a.state),
                        {},
                        {
                          organisationId: n,
                          errors: { organisation: !1, hasErrors: !1 }
                        }
                      )
                    );
              }),
              j()(O()(a), "handleSubmit", function(e) {
                e.preventDefault(),
                  a.state.errors.hasErrors
                    ? a.setState(
                        ye(
                          ye({}, a.state),
                          {},
                          { errors: { organisation: !0, hasErrors: !0 } }
                        )
                      )
                    : q.a
                        .attachSupplier(
                          a.props.measureId,
                          a.state.organisationId
                        )
                        .then(function() {
                          a.props.fetchMeasure(a.props.measureId),
                            a.props.toggleShowNew();
                        });
              }),
              (a.state = {
                organisationId: "",
                organisations: [],
                errors: { organisation: !1, hasErrors: !0 }
              }),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "componentWillMount",
                value: function() {
                  var e = this;
                  ve.a.getOrganisationPeek().then(function(t) {
                    e.setState({ organisations: t });
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.organisationId;
                  return h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      v.a,
                      { className: "panel-grey" },
                      h.a.createElement(
                        b.a,
                        null,
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(S.a, {
                            label: "Maatregel",
                            name: "measure",
                            value: this.props.measureName,
                            readOnly: !0
                          }),
                          h.a.createElement(be.a, {
                            label: "Organisatie",
                            size: "col-sm-6",
                            name: "organisationId",
                            options: this.state.organisations,
                            value: e,
                            onChangeAction: this.handleOrganisationChange,
                            required: "required",
                            error: this.state.errors.organisation
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          h.a.createElement(k.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          h.a.createElement(k.a, {
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
            n
          );
        })(p.Component),
        Oe = Object(d.b)(
          function(e) {
            return {
              measureId: e.measureDetails.id,
              measureName: e.measureDetails.name
            };
          },
          function(e) {
            return {
              fetchMeasure: function(t) {
                e(P(t));
              }
            };
          }
        )(Ne);
      function De(e) {
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
      var je = (function(e) {
          i()(n, e);
          var t = De(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              j()(O()(a), "toggleShowNew", function() {
                a.setState({ showNew: !a.state.showNew });
              }),
              (a.state = { showNew: !1 }),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    v.a,
                    null,
                    h.a.createElement(
                      oe.a,
                      null,
                      h.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Mogelijke leveranciers"
                      ),
                      this.props.permissions.manageMeasure &&
                        h.a.createElement(
                          "a",
                          {
                            role: "button",
                            className: "pull-right",
                            onClick: this.toggleShowNew
                          },
                          h.a.createElement("span", {
                            className: "glyphicon glyphicon-plus"
                          })
                        )
                    ),
                    h.a.createElement(
                      b.a,
                      null,
                      h.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        h.a.createElement(ge, null)
                      ),
                      h.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          h.a.createElement(Oe, {
                            toggleShowNew: this.toggleShowNew
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
        Se = Object(d.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(je),
        ke = n(7),
        Ce = n.n(ke);
      Ce.a.locale("nl");
      var qe = Object(d.b)(function(e) {
        return { measureDetails: e.measureDetails };
      })(function(e) {
        var t = e.measureDetails,
          n = t.createdAt,
          a = t.updatedAt,
          r = t.updatedBy,
          s = t.createdBy;
        return h.a.createElement(
          "div",
          null,
          h.a.createElement(
            "div",
            { className: "row" },
            h.a.createElement(z.a, {
              label: "Gemaakt door",
              value: s ? s.fullName : "Onbekend",
              link: s ? "gebruiker/" + s.id : ""
            }),
            h.a.createElement(z.a, {
              label: "Laatste update door",
              value: r ? r.fullName : "Onbekend",
              link: r ? "gebruiker/" + r.id : ""
            })
          ),
          h.a.createElement(
            "div",
            { className: "row" },
            h.a.createElement(z.a, {
              label: "Gemaakt op",
              value: n ? Ce()(n).format("L") : "Onbekend"
            }),
            h.a.createElement(z.a, {
              label: "Laatste update op",
              value: a ? Ce()(a).format("L") : "Onbekend"
            })
          )
        );
      });
      function Pe(e) {
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
      var Re = (function(e) {
          i()(n, e);
          var t = Pe(n);
          function n(e) {
            var a;
            return (
              r()(this, n), ((a = t.call(this, e)).state = { activeDiv: "" }), a
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
                  var e = this;
                  return h.a.createElement(
                    v.a,
                    {
                      className: this.state.activeDiv,
                      onMouseEnter: function() {
                        return e.onDivEnter();
                      },
                      onMouseLeave: function() {
                        return e.onDivLeave();
                      }
                    },
                    h.a.createElement(b.a, null, h.a.createElement(qe, null))
                  );
                }
              }
            ]),
            n
          );
        })(p.Component),
        Ae = Object(d.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(Re);
      function Le(e) {
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
      var Me = (function(e) {
          i()(n, e);
          var t = Le(n);
          function n(e) {
            return r()(this, n), t.call(this, e);
          }
          return (
            o()(n, [
              {
                key: "render",
                value: function() {
                  var e = "",
                    t = !0;
                  return (
                    this.props.hasError
                      ? (e = "Fout bij het ophalen van maatregel.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : Object(w.isEmpty)(this.props.measureDetails)
                      ? (e = "Geen maatregel gevonden!")
                      : (t = !1),
                    t
                      ? h.a.createElement("div", null, e)
                      : h.a.createElement(
                          "div",
                          null,
                          h.a.createElement(F, null),
                          h.a.createElement(le, null),
                          h.a.createElement(Se, null),
                          h.a.createElement(Ae, null)
                        )
                  );
                }
              }
            ]),
            n
          );
        })(p.Component),
        xe = Object(d.b)(function(e) {
          return {
            measureDetails: e.measureDetails,
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        })(Me);
      function Te(e) {
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
      var ze = (function(e) {
          i()(n, e);
          var t = Te(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              j()(O()(a), "openItem", function(e) {
                g.f.push("/document/".concat(e));
              }),
              (a.state = { relatedDocuments: "" }),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedDocuments;
                  return h.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      h.a.createElement(
                        "div",
                        null,
                        "Geen documenten gevonden."
                      ),
                    "" != t &&
                      h.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        h.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, n) {
                            return h.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: n
                              },
                              h.a.createElement(
                                "td",
                                { className: "col-xs-5 clickable" },
                                Ce()(t.created_at).format("L")
                              ),
                              h.a.createElement(
                                "td",
                                { className: "col-xs-6 clickable" },
                                t.filename
                              )
                            );
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
        Ie = Object(d.b)(function(e) {
          return { relatedDocuments: e.measureDetails.relatedDocuments };
        })(ze),
        Be = Object(d.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            n = e.showDocumentsList,
            a = e.newDocument,
            r = e.documentCount,
            s = e.permissions;
          return h.a.createElement(
            v.a,
            { className: "harmonica-button" },
            h.a.createElement(
              b.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                h.a.createElement(
                  "span",
                  null,
                  "DOCUMENTEN ",
                  h.a.createElement("span", { className: "badge" }, r)
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-2" },
                s.createDocument &&
                  h.a.createElement(
                    "div",
                    { className: "pull-right" },
                    h.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white",
                      "data-toggle": "dropdown",
                      role: "button"
                    }),
                    h.a.createElement(
                      "ul",
                      { className: "dropdown-menu" },
                      h.a.createElement(
                        "li",
                        null,
                        h.a.createElement(
                          "a",
                          {
                            className: "btn",
                            onClick: function() {
                              return a("upload");
                            }
                          },
                          "Upload document"
                        )
                      )
                    )
                  )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-12" },
                n && h.a.createElement(Ie, null)
              )
            )
          );
        });
      function Ve(e, t) {
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
      function Fe(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Ve(Object(n), !0).forEach(function(t) {
                j()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : Ve(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function Qe(e) {
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
      var Ge = (function(e) {
          i()(n, e);
          var t = Qe(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              ((a = t.call(this, e)).state = {
                toggleShowList: { documents: !1 }
              }),
              (a.toggleShowList = a.toggleShowList.bind(O()(a))),
              (a.newDocument = a.newDocument.bind(O()(a))),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "toggleShowList",
                value: function(e) {
                  this.setState(
                    Fe(
                      Fe({}, this.state),
                      {},
                      {
                        toggleShowList: Fe(
                          Fe({}, this.state.toggleShowList),
                          {},
                          j()({}, e, !this.state.toggleShowList[e])
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "newDocument",
                value: function(e) {
                  g.f.push(
                    "/document/nieuw/"
                      .concat(e, "/maatregel/")
                      .concat(this.props.measureDetails.id)
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this;
                  return h.a.createElement(
                    "div",
                    { className: "col-md-12 margin-10-top" },
                    h.a.createElement(Be, {
                      toggleShowList: function() {
                        return e.toggleShowList("documents");
                      },
                      showDocumentsList: this.state.toggleShowList.documents,
                      newDocument: this.newDocument,
                      documentCount: this.props.measureDetails.documentCount
                    })
                  );
                }
              }
            ]),
            n
          );
        })(p.Component),
        _e = Object(d.b)(function(e) {
          return { measureDetails: e.measureDetails };
        })(Ge);
      function Ue(e) {
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
      var We = (function(e) {
        i()(n, e);
        var t = Ue(n);
        function n(e) {
          return r()(this, n), t.call(this, e);
        }
        return (
          o()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchMeasure(this.props.params.id);
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearMeasure();
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
                      { className: "col-md-12" },
                      h.a.createElement(y, null)
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      h.a.createElement(xe, null)
                    )
                  ),
                  h.a.createElement(
                    v.a,
                    { className: "col-md-3 harmonica" },
                    h.a.createElement(
                      b.a,
                      null,
                      h.a.createElement(_e, { id: this.props.params.id })
                    )
                  )
                );
              }
            }
          ]),
          n
        );
      })(p.Component);
      t.default = Object(d.b)(null, function(e) {
        return {
          fetchMeasure: function(t) {
            e(P(t));
          },
          clearMeasure: function() {
            e({ type: "CLEAR_MEASURE" });
          }
        };
      })(We);
    },
    690: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        s = n(8),
        o = n.n(s),
        c = function(e) {
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
    691: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        s = n(8),
        o = n.n(s),
        c = function(e) {
          var t = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            n
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: o.a.string }),
        (t.a = c);
    },
    692: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        s = n(8),
        o = n.n(s),
        c = function(e) {
          var t = e.buttonClassName,
            n = e.buttonText,
            a = e.onClickAction,
            s = e.type,
            o = e.value,
            c = e.loading,
            i = e.loadText,
            l = e.disabled;
          return c
            ? r.a.createElement(
                "button",
                {
                  type: s,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: o,
                  disabled: c
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
                  type: s,
                  className: "btn btn-sm ".concat(t),
                  onClick: a,
                  value: o,
                  disabled: l
                },
                n
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
    693: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        s = n(8),
        o = n.n(s),
        c = function(e) {
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
    694: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        s = n(8),
        o = n.n(s),
        c = function(e) {
          var t = e.label,
            n = e.type,
            a = e.className,
            s = e.size,
            o = e.id,
            c = e.placeholder,
            i = e.name,
            l = e.value,
            u = e.onClickAction,
            m = e.onChangeAction,
            f = e.onBlurAction,
            p = e.required,
            h = e.readOnly,
            d = e.maxLength,
            g = e.error,
            v = e.min,
            b = e.max,
            E = e.step,
            y = e.errorMessage,
            w = e.divSize,
            N = e.divClassName,
            O = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(w, " ").concat(N) },
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
                  "form-control input-sm ".concat(a) + (g ? "has-error" : ""),
                id: o,
                placeholder: c,
                name: i,
                value: l,
                onClick: u,
                onChange: m,
                onBlur: f,
                readOnly: h,
                maxLength: d,
                min: v,
                max: b,
                autoComplete: O,
                step: E
              })
            ),
            g &&
              r.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                r.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  y
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
    695: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        s = n(4),
        o = n(8),
        c = n.n(o),
        i = function(e) {
          var t = e.label,
            n = e.className,
            a = e.id,
            o = e.value,
            c = e.link,
            i = e.hidden;
          return c.length > 0
            ? r.a.createElement(
                "div",
                { className: n, style: i ? { display: "none" } : {} },
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
                    { to: c, className: "link-underline" },
                    o
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: n, style: i ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: a, className: "col-sm-6" },
                  t
                ),
                r.a.createElement("div", { className: "col-sm-6", id: a }, o)
              );
        };
      (i.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (i.propTypes = {
          label: c.a.oneOfType([c.a.string, c.a.object]).isRequired,
          className: c.a.string,
          id: c.a.string,
          value: c.a.oneOfType([c.a.string, c.a.number]),
          link: c.a.string,
          hidden: c.a.bool
        }),
        (t.a = i);
    },
    696: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        s = n(8),
        o = n.n(s),
        c = function(e) {
          var t = e.label,
            n = e.className,
            a = e.size,
            s = e.id,
            o = e.name,
            c = e.value,
            i = e.options,
            l = e.onChangeAction,
            u = e.onBlurAction,
            m = e.required,
            f = e.error,
            p = e.errorMessage,
            h = e.optionValue,
            d = e.optionName,
            g = e.readOnly,
            v = e.placeholder,
            b = e.divClassName,
            E = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(a, " ").concat(b) },
            r.a.createElement(
              "label",
              { htmlFor: s, className: "col-sm-6 ".concat(m) },
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
                  id: s,
                  name: o,
                  value: c,
                  onChange: l,
                  onBlur: u,
                  readOnly: g
                },
                E && r.a.createElement("option", { value: "" }, v),
                i.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[h], value: e[h] },
                    e[d]
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
      (c.defaultProps = {
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
        (c.propTypes = {
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
        (t.a = c);
    },
    698: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        s = n(8),
        o = n.n(s),
        c = function(e) {
          var t = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-heading ".concat(t) },
            n
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: o.a.string }),
        (t.a = c);
    },
    702: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        s = n(8),
        o = n.n(s),
        c = function(e) {
          var t = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-footer ".concat(t) },
            n
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: o.a.string }),
        (t.a = c);
    },
    734: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        s = n(8),
        o = n.n(s),
        c = function(e) {
          var t = e.label,
            n = e.size,
            a = e.sizeLabel,
            s = e.sizeInput,
            o = e.id,
            c = e.name,
            i = e.value,
            l = e.onChangeAction,
            u = e.required,
            m = e.error,
            f = e.rows;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n) },
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(
                "div",
                { className: a },
                r.a.createElement(
                  "label",
                  { htmlFor: o, className: "col-sm-12 ".concat(u) },
                  t
                )
              ),
              r.a.createElement(
                "div",
                { className: s },
                r.a.createElement("textarea", {
                  name: c,
                  value: i,
                  onChange: l,
                  className: "form-control input-sm " + (m ? "has-error" : ""),
                  rows: f
                })
              )
            )
          );
        };
      (c.defaultProps = {
        size: "col-sm-12",
        sizeLabel: "col-sm-3",
        sizeInput: "col-sm-9",
        value: "",
        required: "",
        error: !1,
        rows: "5"
      }),
        (c.propTypes = {
          label: o.a.string.isRequired,
          type: o.a.string,
          size: o.a.string,
          sizeLabel: o.a.string,
          sizeInput: o.a.string,
          id: o.a.string,
          name: o.a.string.isRequired,
          value: o.a.oneOfType([o.a.string, o.a.number]),
          onChangeAction: o.a.func,
          required: o.a.string,
          error: o.a.bool
        }),
        (t.a = c);
    },
    744: function(e, t, n) {
      "use strict";
      var a = n(2),
        r = n.n(a),
        s = "".concat(URL_API, "/api/organisation");
      t.a = {
        newOrganisation: function(e) {
          var t = "".concat(s),
            n = "Bearer " + localStorage.getItem("access_token");
          return (
            (r.a.defaults.headers.common.Authorization = n),
            r.a
              .post(t, e)
              .then(function(e) {
                return e.data.data;
              })
              .catch(function(e) {
                console.log(e);
              })
          );
        },
        updateOrganisation: function(e) {
          var t = "".concat(s, "/").concat(e.id),
            n = "Bearer " + localStorage.getItem("access_token");
          return (
            (r.a.defaults.headers.common.Authorization = n), r.a.post(t, e)
          );
        },
        getOrganisationPeek: function() {
          var e = "".concat(s, "/peek"),
            t = "Bearer " + localStorage.getItem("access_token");
          return (
            (r.a.defaults.headers.common.Authorization = t),
            r.a
              .get(e)
              .then(function(e) {
                return e.data.data;
              })
              .catch(function(e) {
                console.log(e);
              })
          );
        }
      };
    }
  }
]);
