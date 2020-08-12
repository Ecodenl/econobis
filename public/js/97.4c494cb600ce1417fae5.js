(window.webpackJsonp = window.webpackJsonp || []).push([
  [97],
  {
    1517: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        l = a.n(n),
        r = a(25),
        c = a.n(r),
        s = a(22),
        o = a.n(s),
        i = a(26),
        m = a.n(i),
        u = a(27),
        d = a.n(u),
        p = a(16),
        f = a.n(p),
        h = a(6),
        b = a.n(h),
        v = a(0),
        g = a.n(v),
        N = a(697),
        E = a.n(N),
        y = (a(198), a(4)),
        C = a(690),
        T = a(691),
        w = a(693);
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
            var l = f()(this).constructor;
            a = Reflect.construct(n, arguments, l);
          } else a = n.apply(this, arguments);
          return d()(this, a);
        };
      }
      var x = (function(e) {
          m()(a, e);
          var t = k(a);
          function a(e) {
            var n;
            return (
              l()(this, a),
              ((n = t.call(this, e)).state = { showDelete: !1 }),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "render",
                value: function() {
                  return g.a.createElement(
                    "div",
                    { className: "row" },
                    g.a.createElement(
                      "div",
                      { className: "col-sm-12" },
                      g.a.createElement(
                        C.a,
                        null,
                        g.a.createElement(
                          T.a,
                          { className: "panel-small" },
                          g.a.createElement(
                            "div",
                            { className: "col-md-4" },
                            g.a.createElement(
                              "div",
                              {
                                className:
                                  "btn-group btn-group-flex margin-small",
                                role: "group"
                              },
                              g.a.createElement(w.a, {
                                iconName: "glyphicon-arrow-left",
                                onClickAction: y.e.goBack
                              })
                            )
                          ),
                          g.a.createElement(
                            "div",
                            { className: "col-md-4" },
                            g.a.createElement(
                              "h3",
                              { className: "text-center table-title" },
                              "Nieuwe e-mail template"
                            )
                          ),
                          g.a.createElement("div", { className: "col-md-4" })
                        )
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(v.Component),
        O = (a(7), a(692)),
        P = a(702),
        j = a(737),
        S = function(e) {
          var t = e.emailTemplate,
            a = t.name,
            n = t.subject,
            l = t.htmlBody;
          return g.a.createElement(
            "form",
            {
              className: "form-horizontal col-md-12",
              onSubmit: e.handleSubmit
            },
            g.a.createElement(
              "div",
              { className: "row" },
              g.a.createElement(
                "div",
                { className: "form-group col-sm-12" },
                g.a.createElement(
                  "div",
                  { className: "row" },
                  g.a.createElement(
                    "div",
                    { className: "col-sm-3" },
                    g.a.createElement(
                      "label",
                      { htmlFor: "name", className: "col-sm-12 required" },
                      "Naam"
                    )
                  ),
                  g.a.createElement(
                    "div",
                    { className: "col-sm-8" },
                    g.a.createElement("input", {
                      name: "name",
                      value: a,
                      onChange: e.handleInputChange,
                      className:
                        "form-control input-sm " +
                        (e.errors.name ? "has-error" : "")
                    })
                  )
                )
              )
            ),
            g.a.createElement(
              "div",
              { className: "row" },
              g.a.createElement(
                "div",
                { className: "form-group col-sm-12" },
                g.a.createElement(
                  "div",
                  { className: "row" },
                  g.a.createElement(
                    "div",
                    { className: "col-sm-3" },
                    g.a.createElement(
                      "label",
                      { htmlFor: "subject", className: "col-sm-12" },
                      "Standaard onderwerp"
                    )
                  ),
                  g.a.createElement(
                    "div",
                    { className: "col-sm-8" },
                    g.a.createElement("input", {
                      name: "subject",
                      value: n,
                      onChange: e.handleInputChange,
                      className: "form-control input-sm"
                    })
                  )
                )
              )
            ),
            g.a.createElement(
              "div",
              { className: "row" },
              g.a.createElement(
                "div",
                { className: "form-group col-sm-12" },
                g.a.createElement(
                  "div",
                  { className: "row" },
                  g.a.createElement(j.a, {
                    label: "Tekst",
                    value: l,
                    onChangeAction: e.handleTextChange
                  })
                )
              )
            ),
            g.a.createElement(
              P.a,
              null,
              g.a.createElement(
                "div",
                { className: "pull-right btn-group", role: "group" },
                g.a.createElement(O.a, {
                  buttonText: "Opslaan",
                  onClickAction: e.handleSubmit,
                  type: "submit",
                  value: "Submit"
                })
              )
            )
          );
        },
        R = a(104);
      function A(e, t) {
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
      function D(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? A(Object(a), !0).forEach(function(t) {
                b()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : A(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
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
          var a,
            n = f()(e);
          if (t) {
            var l = f()(this).constructor;
            a = Reflect.construct(n, arguments, l);
          } else a = n.apply(this, arguments);
          return d()(this, a);
        };
      }
      var q = (function(e) {
        m()(a, e);
        var t = M(a);
        function a(e) {
          var n;
          return (
            l()(this, a),
            (n = t.call(this, e)),
            b()(o()(n), "handleInputChange", function(e) {
              var t = e.target,
                a = "checkbox" === t.type ? t.checked : t.value,
                l = t.name;
              n.setState(
                D(
                  D({}, n.state),
                  {},
                  {
                    emailTemplate: D(
                      D({}, n.state.emailTemplate),
                      {},
                      b()({}, l, a)
                    )
                  }
                )
              );
            }),
            b()(o()(n), "handleSubmit", function(e) {
              e.preventDefault();
              var t = n.state.emailTemplate,
                a = {},
                l = !1;
              E.a.isEmpty(t.name) && ((a.name = !0), (l = !0)),
                n.setState(D(D({}, n.state), {}, { errors: a })),
                !l &&
                  R.a.storeEmailTemplate(t).then(function(e) {
                    y.f.push("/email-template/".concat(e.id));
                  });
            }),
            (n.state = {
              emailTemplate: { name: "", subject: "", htmlBody: "" },
              errors: { name: !1, hasErrors: !1 }
            }),
            (n.handleTextChange = n.handleTextChange.bind(o()(n))),
            n
          );
        }
        return (
          c()(a, [
            {
              key: "handleTextChange",
              value: function(e) {
                this.setState(
                  D(
                    D({}, this.state),
                    {},
                    {
                      emailTemplate: D(
                        D({}, this.state.emailTemplate),
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
                return g.a.createElement(
                  "div",
                  null,
                  g.a.createElement(
                    "div",
                    { className: "panel panel-default" },
                    g.a.createElement(
                      "div",
                      { className: "panel-body" },
                      g.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        g.a.createElement(x, null)
                      ),
                      g.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        g.a.createElement(S, {
                          emailTemplate: this.state.emailTemplate,
                          errors: this.state.errors,
                          handleInputChange: this.handleInputChange,
                          handleTextChange: this.handleTextChange,
                          handleSubmit: this.handleSubmit
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
      })(v.Component);
      t.default = q;
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        l = a.n(n),
        r = a(8),
        c = a.n(r),
        s = function(e) {
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
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        l = a.n(n),
        r = a(8),
        c = a.n(r),
        s = function(e) {
          var t = e.className,
            a = e.children;
          return l.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: c.a.string }),
        (t.a = s);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        l = a.n(n),
        r = a(8),
        c = a.n(r),
        s = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            r = e.type,
            c = e.value,
            s = e.loading,
            o = e.loadText,
            i = e.disabled;
          return s
            ? l.a.createElement(
                "button",
                {
                  type: r,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: c,
                  disabled: s
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
                  value: c,
                  disabled: i
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
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        l = a.n(n),
        r = a(8),
        c = a.n(r),
        s = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            r = e.title,
            c = e.disabled;
          return l.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: c,
              title: r
            },
            l.a.createElement("span", { className: "glyphicon ".concat(a) })
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
    702: function(e, t, a) {
      "use strict";
      var n = a(0),
        l = a.n(n),
        r = a(8),
        c = a.n(r),
        s = function(e) {
          var t = e.className,
            a = e.children;
          return l.a.createElement(
            "div",
            { className: "panel-footer ".concat(t) },
            a
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: c.a.string }),
        (t.a = s);
    },
    737: function(e, t, a) {
      "use strict";
      var n = a(0),
        l = a.n(n),
        r = a(8),
        c = a.n(r),
        s =
          (a(752),
          a(753),
          a(754),
          a(755),
          a(756),
          a(757),
          a(758),
          a(759),
          a(760),
          a(761),
          a(762),
          a(770)),
        o = function(e) {
          var t = e.label,
            a = e.value,
            n = e.onChangeAction;
          return l.a.createElement(
            "div",
            null,
            l.a.createElement(
              "div",
              { className: "col-sm-3" },
              l.a.createElement(
                "label",
                { htmlFor: "quotationText", className: "col-sm-12" },
                t
              )
            ),
            l.a.createElement(
              "div",
              { className: "col-sm-9" },
              l.a.createElement(s.a, {
                initialValue: a,
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
                onChange: n
              })
            )
          );
        };
      (o.defaultProps = { value: "", errorMessage: "" }),
        (o.propTypes = {
          label: c.a.string.isRequired,
          type: c.a.string,
          id: c.a.string,
          placeholder: c.a.string,
          value: c.a.string,
          onChangeAction: c.a.func
        }),
        (t.a = o);
    }
  }
]);
