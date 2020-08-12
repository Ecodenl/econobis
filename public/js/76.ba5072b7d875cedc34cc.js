(window.webpackJsonp = window.webpackJsonp || []).push([
  [76],
  {
    1454: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        l = n(25),
        o = n.n(l),
        i = n(26),
        c = n.n(i),
        s = n(27),
        u = n.n(s),
        m = n(16),
        d = n.n(m),
        f = n(0),
        p = n.n(f),
        h = n(32),
        v = function(e) {
          return { type: "FETCH_EMAIL_TEMPLATE", id: e };
        },
        b = n(22),
        E = n.n(b),
        y = n(6),
        g = n.n(y),
        N = n(4),
        w = n(693),
        T = n(100),
        C = Object(h.b)(null, function(e) {
          return {
            deleteEmailTemplate: function(t) {
              e(
                (function(e) {
                  return { type: "DELETE_EMAIL_TEMPLATE", id: e };
                })(t)
              );
            }
          };
        })(function(e) {
          return p.a.createElement(
            T.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return (
                  e.deleteEmailTemplate(e.templateId),
                  void e.closeDeleteItemModal()
                );
              },
              title: "Verwijderen"
            },
            "Verwijder e-mail template: ",
            p.a.createElement("strong", null, " ", e.templateName, " ")
          );
        });
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
            a = d()(e);
          if (t) {
            var r = d()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var k = (function(e) {
          c()(n, e);
          var t = D(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              g()(E()(a), "toggleDelete", function() {
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
                  return p.a.createElement(
                    "div",
                    { className: "row" },
                    p.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      p.a.createElement(
                        "div",
                        { className: "btn-group", role: "group" },
                        p.a.createElement(w.a, {
                          iconName: "glyphicon-arrow-left",
                          onClickAction: N.e.goBack
                        }),
                        p.a.createElement(w.a, {
                          iconName: "glyphicon-trash",
                          onClickAction: this.toggleDelete
                        })
                      )
                    ),
                    p.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      p.a.createElement(
                        "h4",
                        { className: "text-center" },
                        "E-mail template: " + this.props.templateName
                      )
                    ),
                    p.a.createElement("div", { className: "col-md-4" }),
                    this.state.showDelete &&
                      p.a.createElement(C, {
                        closeDeleteItemModal: this.toggleDelete,
                        templateName: this.props.templateName,
                        templateId: this.props.templateId
                      })
                  );
                }
              }
            ]),
            n
          );
        })(f.Component),
        O = Object(h.b)(function(e) {
          return {
            templateName: e.emailTemplate.name,
            templateId: e.emailTemplate.id
          };
        }, null)(k),
        j = n(198),
        _ = n(690),
        M = n(691),
        R = n(692),
        P = n(702),
        x = n(737),
        S = n(697),
        A = n.n(S),
        I = n(104);
      function L(e, t) {
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
      function q(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? L(Object(n), !0).forEach(function(t) {
                g()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : L(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function V(e) {
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
            a = d()(e);
          if (t) {
            var r = d()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var B = (function(e) {
          c()(n, e);
          var t = V(n);
          function n(e) {
            var a;
            r()(this, n),
              (a = t.call(this, e)),
              g()(E()(a), "handleInputChange", function(e) {
                var t = e.target,
                  n = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                a.setState(
                  q(
                    q({}, a.state),
                    {},
                    {
                      emailTemplate: q(
                        q({}, a.state.emailTemplate),
                        {},
                        g()({}, r, n)
                      )
                    }
                  )
                );
              }),
              g()(E()(a), "handleSubmit", function(e) {
                e.preventDefault();
                var t = a.state.emailTemplate,
                  n = {},
                  r = !1;
                A.a.isEmpty(t.name) && ((n.name = !0), (r = !0)),
                  a.setState(q(q({}, a.state), {}, { errors: n })),
                  !r &&
                    I.a.updateEmailTemplate(t).then(function(e) {
                      a.props.fetchEmailTemplate(e.id), a.props.switchToView();
                    });
              });
            var l = e.emailTemplate,
              o = l.id,
              i = l.name,
              c = l.subject,
              s = l.htmlBody;
            return (
              (a.state = {
                emailTemplate: {
                  id: o,
                  name: i,
                  subject: c || "",
                  htmlBody: s || ""
                },
                errors: { name: !1 }
              }),
              (a.handleTextChange = a.handleTextChange.bind(E()(a))),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "handleTextChange",
                value: function(e) {
                  this.setState(
                    q(
                      q({}, this.state),
                      {},
                      {
                        emailTemplate: q(
                          q({}, this.state.emailTemplate),
                          {},
                          { htmlBody: e.target.getContent({ format: "raw" }) }
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.emailTemplate,
                    t = e.name,
                    n = e.subject,
                    a = e.htmlBody,
                    r = this.props.emailTemplate.createdBy;
                  return p.a.createElement(
                    "div",
                    null,
                    p.a.createElement(
                      "div",
                      { className: "row" },
                      p.a.createElement(
                        "div",
                        { className: "form-group col-sm-12" },
                        p.a.createElement(
                          "div",
                          { className: "row" },
                          p.a.createElement(
                            "div",
                            { className: "col-sm-3" },
                            p.a.createElement(
                              "label",
                              { className: "col-sm-12 required" },
                              "Naam"
                            )
                          ),
                          p.a.createElement(
                            "div",
                            { className: "col-sm-9" },
                            p.a.createElement("input", {
                              type: "text",
                              className:
                                "form-control input-sm " +
                                (this.state.errors.name ? "has-error" : ""),
                              name: "name",
                              value: t,
                              onChange: this.handleInputChange
                            })
                          )
                        )
                      )
                    ),
                    p.a.createElement(
                      "div",
                      { className: "row" },
                      p.a.createElement(
                        "div",
                        { className: "form-group col-sm-12" },
                        p.a.createElement(
                          "div",
                          { className: "row" },
                          p.a.createElement(
                            "div",
                            { className: "col-sm-3" },
                            p.a.createElement(
                              "label",
                              { className: "col-sm-12" },
                              "Standaard onderwerp"
                            )
                          ),
                          p.a.createElement(
                            "div",
                            { className: "col-sm-9" },
                            p.a.createElement("input", {
                              type: "text",
                              className: "form-control input-sm",
                              name: "subject",
                              value: n,
                              onChange: this.handleInputChange
                            })
                          )
                        )
                      )
                    ),
                    p.a.createElement(
                      "div",
                      { className: "row" },
                      p.a.createElement(
                        "div",
                        { className: "form-group col-sm-12" },
                        p.a.createElement(
                          "div",
                          { className: "row" },
                          p.a.createElement(x.a, {
                            label: "Tekst",
                            value: a,
                            onChangeAction: this.handleTextChange
                          })
                        )
                      )
                    ),
                    p.a.createElement(
                      "div",
                      {
                        className: "row margin-10-top",
                        onClick: this.props.switchToEdit
                      },
                      p.a.createElement(
                        "div",
                        { className: "col-sm-12" },
                        p.a.createElement(
                          "div",
                          { className: "row" },
                          p.a.createElement(
                            "div",
                            { className: "col-sm-3" },
                            p.a.createElement(
                              "label",
                              { className: "col-sm-12" },
                              "Gemaakt door"
                            )
                          ),
                          p.a.createElement(
                            "div",
                            { className: "col-sm-9" },
                            p.a.createElement(
                              N.b,
                              {
                                to: r ? "gebruiker/" + r.id : "",
                                className: "link-underline"
                              },
                              r ? r.fullName : ""
                            )
                          )
                        )
                      )
                    ),
                    p.a.createElement(
                      P.a,
                      null,
                      p.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        p.a.createElement(R.a, {
                          buttonClassName: "btn-default",
                          buttonText: "Annuleren",
                          onClickAction: this.props.switchToView
                        }),
                        p.a.createElement(R.a, {
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
        })(f.Component),
        F = Object(h.b)(
          function(e) {
            return { emailTemplate: e.emailTemplate };
          },
          function(e) {
            return {
              fetchEmailTemplate: function(t) {
                e(v(t));
              }
            };
          }
        )(B),
        U = n(7),
        G = n.n(U),
        H = n(733);
      G.a.locale("nl");
      var J = Object(h.b)(function(e) {
        return { emailTemplate: e.emailTemplate };
      })(function(e) {
        var t = e.emailTemplate,
          n = t.name,
          a = t.subject,
          r = t.htmlBody,
          l = t.createdBy;
        return p.a.createElement(
          "div",
          null,
          p.a.createElement(
            "div",
            { className: "row margin-10-top", onClick: e.switchToEdit },
            p.a.createElement(
              "div",
              { className: "col-sm-12" },
              p.a.createElement(
                "div",
                { className: "row" },
                p.a.createElement(
                  "div",
                  { className: "col-sm-3" },
                  p.a.createElement("label", { className: "col-sm-12" }, "Naam")
                ),
                p.a.createElement("div", { className: "col-sm-9" }, n)
              )
            )
          ),
          p.a.createElement(
            "div",
            { className: "row margin-10-top", onClick: e.switchToEdit },
            p.a.createElement(
              "div",
              { className: "col-sm-12" },
              p.a.createElement(
                "div",
                { className: "row" },
                p.a.createElement(
                  "div",
                  { className: "col-sm-3" },
                  p.a.createElement(
                    "label",
                    { className: "col-sm-12" },
                    "Standaard onderwerp"
                  )
                ),
                p.a.createElement("div", { className: "col-sm-9" }, a)
              )
            )
          ),
          p.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            p.a.createElement(H.a, {
              label: "Tekst",
              value: r,
              switchToEdit: e.switchToEdit
            })
          ),
          p.a.createElement(
            "div",
            { className: "row margin-10-top", onClick: e.switchToEdit },
            p.a.createElement(
              "div",
              { className: "col-sm-12" },
              p.a.createElement(
                "div",
                { className: "row" },
                p.a.createElement(
                  "div",
                  { className: "col-sm-3" },
                  p.a.createElement(
                    "label",
                    { className: "col-sm-12" },
                    "Gemaakt door"
                  )
                ),
                p.a.createElement(
                  "div",
                  { className: "col-sm-9" },
                  p.a.createElement(
                    N.b,
                    {
                      to: l ? "gebruiker/" + l.id : "",
                      className: "link-underline"
                    },
                    l ? l.fullName : ""
                  )
                )
              )
            )
          )
        );
      });
      function W(e) {
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
            a = d()(e);
          if (t) {
            var r = d()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var z = (function(e) {
          c()(n, e);
          var t = W(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              g()(E()(a), "switchToEdit", function() {
                a.setState({ showEdit: !0 });
              }),
              g()(E()(a), "switchToView", function() {
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
                  return p.a.createElement(
                    _.a,
                    {
                      className: this.state.activeDiv,
                      onMouseEnter: function() {
                        return e.onDivEnter();
                      },
                      onMouseLeave: function() {
                        return e.onDivLeave();
                      }
                    },
                    p.a.createElement(
                      M.a,
                      null,
                      this.state.showEdit
                        ? p.a.createElement(F, {
                            switchToView: this.switchToView
                          })
                        : p.a.createElement(J, {
                            switchToEdit: this.switchToEdit
                          })
                    )
                  );
                }
              }
            ]),
            n
          );
        })(f.Component),
        Y = Object(h.b)(function(e) {
          return { emailTemplate: e.emailTemplate };
        })(z);
      function K(e) {
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
            a = d()(e);
          if (t) {
            var r = d()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var Q = (function(e) {
          c()(n, e);
          var t = K(n);
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
                      ? (e = "Fout bij het ophalen van e-mailtemplate.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : Object(j.isEmpty)(this.props.emailTemplate)
                      ? (e = "Geen e-mailtemplate gevonden!")
                      : (t = !1),
                    t
                      ? p.a.createElement("div", null, e)
                      : p.a.createElement(
                          "div",
                          null,
                          p.a.createElement(Y, null)
                        )
                  );
                }
              }
            ]),
            n
          );
        })(f.Component),
        X = Object(h.b)(
          function(e) {
            return {
              emailTemplate: e.emailTemplate,
              isLoading: e.loadingData.isLoading,
              hasError: e.loadingData.hasError
            };
          },
          function(e) {
            return {
              fetchEmailTemplate: function(t) {
                e(v(t));
              }
            };
          }
        )(Q);
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
          var n,
            a = d()(e);
          if (t) {
            var r = d()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var $ = (function(e) {
        c()(n, e);
        var t = Z(n);
        function n(e) {
          return r()(this, n), t.call(this, e);
        }
        return (
          o()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchEmailTemplate(this.props.params.id);
              }
            },
            {
              key: "render",
              value: function() {
                return p.a.createElement(
                  "div",
                  { className: "row" },
                  p.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    p.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      p.a.createElement(
                        _.a,
                        null,
                        p.a.createElement(
                          M.a,
                          { className: "panel-small" },
                          p.a.createElement(O, null)
                        )
                      )
                    ),
                    p.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      p.a.createElement(X, null)
                    )
                  ),
                  p.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          n
        );
      })(f.Component);
      t.default = Object(h.b)(
        function(e) {
          return { emailTemplateDetails: e.emailTemplateDetails };
        },
        function(e) {
          return {
            fetchEmailTemplate: function(t) {
              e(v(t));
            }
          };
        }
      )($);
    },
    690: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        l = n(8),
        o = n.n(l),
        i = function(e) {
          var t = e.children,
            n = e.className,
            a = e.onMouseEnter,
            l = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(n),
              onMouseEnter: a,
              onMouseLeave: l
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
        l = n(8),
        o = n.n(l),
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
        l = n(8),
        o = n.n(l),
        i = function(e) {
          var t = e.buttonClassName,
            n = e.buttonText,
            a = e.onClickAction,
            l = e.type,
            o = e.value,
            i = e.loading,
            c = e.loadText,
            s = e.disabled;
          return i
            ? r.a.createElement(
                "button",
                {
                  type: l,
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
                  type: l,
                  className: "btn btn-sm ".concat(t),
                  onClick: a,
                  value: o,
                  disabled: s
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
        l = n(8),
        o = n.n(l),
        i = function(e) {
          var t = e.buttonClassName,
            n = e.iconName,
            a = e.onClickAction,
            l = e.title,
            o = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: a,
              disabled: o,
              title: l
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
    702: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        l = n(8),
        o = n.n(l),
        i = function(e) {
          var t = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-footer ".concat(t) },
            n
          );
        };
      (i.defaultProps = { className: "" }),
        (i.propTypes = { className: o.a.string }),
        (t.a = i);
    },
    733: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        l = n(739),
        o = n.n(l),
        i = n(8),
        c = n.n(i),
        s = n(690),
        u = n(692),
        m = function(e) {
          var t = e.label,
            n = e.className,
            a = e.id,
            l = e.value,
            i = e.switchToEdit;
          return r.a.createElement(
            "div",
            { className: n },
            r.a.createElement(
              "label",
              { htmlFor: a, className: "col-sm-3" },
              t,
              i
                ? r.a.createElement(
                    "span",
                    null,
                    r.a.createElement("br", null),
                    r.a.createElement(u.a, {
                      buttonClassName: "btn-success btn-padding-small",
                      buttonText: "Wijzig",
                      onClickAction: i
                    })
                  )
                : ""
            ),
            r.a.createElement(
              s.a,
              { className: "col-sm-9" },
              r.a.createElement(
                o.a,
                null,
                r.a.createElement("div", {
                  id: a,
                  dangerouslySetInnerHTML: { __html: l }
                })
              )
            )
          );
        };
      (m.defaultProps = { className: "col-sm-12", value: "" }),
        (m.propTypes = {
          label: c.a.string.isRequired,
          className: c.a.string,
          id: c.a.string,
          value: c.a.oneOfType([c.a.string, c.a.number])
        }),
        (t.a = m);
    },
    737: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        l = n(8),
        o = n.n(l),
        i =
          (n(752),
          n(753),
          n(754),
          n(755),
          n(756),
          n(757),
          n(758),
          n(759),
          n(760),
          n(761),
          n(762),
          n(770)),
        c = function(e) {
          var t = e.label,
            n = e.value,
            a = e.onChangeAction;
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(
              "div",
              { className: "col-sm-3" },
              r.a.createElement(
                "label",
                { htmlFor: "quotationText", className: "col-sm-12" },
                t
              )
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-9" },
              r.a.createElement(i.a, {
                initialValue: n,
                init: {
                  branding: !1,
                  language: "nl",
                  menubar: !1,
                  plugins:
                    "paste lists advlist link image code table textcolor pagebreak",
                  toolbar:
                    "undo redo | formatselect fontselect | bold italic forecolor | alignleft aligncenter alignright | pagebreak | bullist numlist outdent indent | table | link image | code",
                  height: "300",
                  browser_spellcheck: !0,
                  font_formats:
                    "Courier New=courier new;Tahoma=tahoma;Times New Roman=times new roman;Verdana=verdana;"
                },
                onChange: a
              })
            )
          );
        };
      (c.defaultProps = { value: "", errorMessage: "" }),
        (c.propTypes = {
          label: o.a.string.isRequired,
          type: o.a.string,
          id: o.a.string,
          placeholder: o.a.string,
          value: o.a.string,
          onChangeAction: o.a.func
        }),
        (t.a = c);
    },
    739: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a,
        r = n(740),
        l = (a = r) && a.__esModule ? a : { default: a };
      t.default = l.default;
    },
    740: function(e, t, n) {
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
        l = n(0),
        o = u(l),
        i = u(n(103)),
        c = u(n(8)),
        s = u(n(741));
      function u(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var m,
        d = "undefined" != typeof window && window.console,
        f = function() {},
        p = f,
        h = f;
      d &&
        ((m = console.error),
        (p = function() {
          console.error = function(e) {
            /<head>/.test(e) || m.call(console, e);
          };
        }),
        (h = function() {
          return (console.error = m);
        }));
      var v = (function(e) {
        function t(e, n) {
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
          })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
          return (a._isMounted = !1), a;
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
              key: "componentDidMount",
              value: function() {
                (this._isMounted = !0), this.renderFrameContents();
              }
            },
            {
              key: "componentDidUpdate",
              value: function() {
                this.renderFrameContents();
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this._isMounted = !1;
                var e = this.getDoc(),
                  t = this.getMountTarget();
                e && t && i.default.unmountComponentAtNode(t);
              }
            },
            {
              key: "getDoc",
              value: function() {
                return i.default.findDOMNode(this).contentDocument;
              }
            },
            {
              key: "getMountTarget",
              value: function() {
                var e = this.getDoc();
                return this.props.mountTarget
                  ? e.querySelector(this.props.mountTarget)
                  : e.body.children[0];
              }
            },
            {
              key: "renderFrameContents",
              value: function() {
                if (this._isMounted) {
                  var e = this.getDoc();
                  if (e && "complete" === e.readyState) {
                    null === e.querySelector("div") &&
                      (this._setInitialContent = !1);
                    var t = e.defaultView || e.parentView,
                      n = !this._setInitialContent,
                      a = o.default.createElement(
                        s.default,
                        { document: e, window: t },
                        o.default.createElement(
                          "div",
                          { className: "frame-content" },
                          this.props.head,
                          this.props.children
                        )
                      );
                    n &&
                      (e.open("text/html", "replace"),
                      e.write(this.props.initialContent),
                      e.close(),
                      (this._setInitialContent = !0)),
                      p();
                    var r = n
                        ? this.props.contentDidMount
                        : this.props.contentDidUpdate,
                      l = this.getMountTarget();
                    i.default.unstable_renderSubtreeIntoContainer(
                      this,
                      a,
                      l,
                      r
                    ),
                      h();
                  } else setTimeout(this.renderFrameContents.bind(this), 0);
                }
              }
            },
            {
              key: "render",
              value: function() {
                var e = a({}, this.props, { children: void 0 });
                return (
                  delete e.head,
                  delete e.initialContent,
                  delete e.mountTarget,
                  delete e.contentDidMount,
                  delete e.contentDidUpdate,
                  o.default.createElement("iframe", e)
                );
              }
            }
          ]),
          t
        );
      })(l.Component);
      (v.propTypes = {
        style: c.default.object,
        head: c.default.node,
        initialContent: c.default.string,
        mountTarget: c.default.string,
        contentDidMount: c.default.func,
        contentDidUpdate: c.default.func,
        children: c.default.oneOfType([
          c.default.element,
          c.default.arrayOf(c.default.element)
        ])
      }),
        (v.defaultProps = {
          style: {},
          head: null,
          children: void 0,
          mountTarget: void 0,
          contentDidMount: function() {},
          contentDidUpdate: function() {},
          initialContent:
            '<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'
        }),
        (t.default = v);
    },
    741: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = (function() {
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
        r = n(0),
        l = (o(r), o(n(8)));
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function i(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function c(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      var s = (function(e) {
        function t() {
          return (
            i(this, t),
            c(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
            )
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
          a(t, [
            {
              key: "getChildContext",
              value: function() {
                return {
                  document: this.props.document,
                  window: this.props.window
                };
              }
            },
            {
              key: "render",
              value: function() {
                return r.Children.only(this.props.children);
              }
            }
          ]),
          t
        );
      })(r.Component);
      (s.propTypes = {
        document: l.default.object.isRequired,
        window: l.default.object.isRequired,
        children: l.default.element.isRequired
      }),
        (s.childContextTypes = {
          document: l.default.object.isRequired,
          window: l.default.object.isRequired
        }),
        (t.default = s);
    }
  }
]);
