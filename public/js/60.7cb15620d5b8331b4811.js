(window.webpackJsonp = window.webpackJsonp || []).push([
  [60],
  {
    1466: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        i = n(25),
        o = n.n(i),
        c = n(26),
        l = n.n(c),
        s = n(27),
        u = n.n(s),
        d = n(16),
        m = n.n(d),
        f = n(0),
        h = n.n(f),
        p = n(32),
        v = function(e) {
          return { type: "FETCH_MAILGUN_DOMAIN_DETAILS", id: e };
        },
        g = n(4),
        b = n(693);
      function y(e) {
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
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var E = (function(e) {
          l()(n, e);
          var t = y(n);
          function n(e) {
            var a;
            return r()(this, n), ((a = t.call(this, e)).state = {}), a;
          }
          return (
            o()(n, [
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      h.a.createElement(
                        "div",
                        {
                          className: "btn-group btn-group-flex margin-small",
                          role: "group"
                        },
                        h.a.createElement(b.a, {
                          iconName: "glyphicon-arrow-left",
                          onClickAction: g.e.goBack
                        })
                      )
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      h.a.createElement(
                        "h4",
                        { className: "text-center" },
                        "Mailgun domein: ",
                        this.props.domain
                      )
                    ),
                    h.a.createElement("div", { className: "col-md-4" })
                  );
                }
              }
            ]),
            n
          );
        })(f.Component),
        k = Object(p.b)(function(e) {
          return {
            domain: e.mailgunDomainDetails.domain,
            id: e.mailgunDomainDetails.id
          };
        }, null)(E),
        D = n(198),
        N = n(22),
        C = n.n(N),
        w = n(6),
        O = n.n(w),
        T = n(697),
        M = n.n(T),
        S = n(7),
        x = n.n(S),
        P = n(694),
        j = n(692),
        R = n(690),
        A = n(691),
        _ = n(700);
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
                O()(e, t, n[t]);
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
          var n,
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      x.a.locale("nl");
      var I = (function(e) {
          l()(n, e);
          var t = F(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              ((a = t.call(this, e)).state = {
                mailgunDomain: q({}, e.mailgunDomainDetails),
                errors: { domain: !1 }
              }),
              (a.handleInputChange = a.handleInputChange.bind(C()(a))),
              (a.handleSubmit = a.handleSubmit.bind(C()(a))),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "handleInputChange",
                value: function(e) {
                  var t = e.target,
                    n = "checkbox" === t.type ? t.checked : t.value,
                    a = t.name;
                  this.setState(
                    q(
                      q({}, this.state),
                      {},
                      {
                        mailgunDomain: q(
                          q({}, this.state.mailgunDomain),
                          {},
                          O()({}, a, n)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "handleSubmit",
                value: function(e) {
                  e.preventDefault();
                  var t = this.state.mailgunDomain,
                    n = {},
                    a = !1;
                  M.a.isEmpty(t.domain) && ((n.domain = !0), (a = !0)),
                    M.a.isEmpty(t.secret) && ((n.secret = !0), (a = !0)),
                    this.setState(q(q({}, this.state), {}, { errors: n })),
                    !a &&
                      this.props.updateMailgunDomain(
                        t,
                        this.props.switchToView
                      );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.mailgunDomain,
                    t = e.domain,
                    n = e.secret,
                    a = e.isVerified;
                  return h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      R.a,
                      null,
                      h.a.createElement(
                        A.a,
                        null,
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(P.a, {
                            label: "Domesin",
                            name: "domain",
                            value: t,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.domain
                          }),
                          h.a.createElement(P.a, {
                            label: "Mailgun API Key",
                            name: "secret",
                            value: n,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.secret
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(_.a, {
                            label: "Geverifieerd",
                            name: "isVerified",
                            value: a,
                            onChangeAction: this.handleInputChange,
                            disabled: !0
                          })
                        )
                      ),
                      h.a.createElement(
                        A.a,
                        null,
                        h.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          h.a.createElement(j.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Sluiten",
                            onClickAction: this.props.switchToView
                          }),
                          h.a.createElement(j.a, {
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
        })(f.Component),
        B = Object(p.b)(
          function(e) {
            return { mailgunDomainDetails: e.mailgunDomainDetails };
          },
          function(e) {
            return {
              updateMailgunDomain: function(t, n) {
                e(
                  (function(e, t) {
                    return {
                      type: "UPDATE_MAILGUN_DOMAIN",
                      mailgunDomain: e,
                      switchToView: t
                    };
                  })(t, n)
                );
              }
            };
          }
        )(I),
        z = n(695),
        X = Object(p.b)(function(e) {
          return { mailgunDomainDetails: e.mailgunDomainDetails };
        })(function(e) {
          var t = e.mailgunDomainDetails,
            n = t.domain,
            a = t.secret,
            r = t.isVerified;
          return h.a.createElement(
            "div",
            { onClick: e.switchToEdit },
            h.a.createElement(
              R.a,
              null,
              h.a.createElement(
                A.a,
                null,
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(z.a, { label: "Domein", value: n }),
                  h.a.createElement(z.a, { label: "Mailgun API Key", value: a })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(z.a, {
                    label: "Geverifieerd",
                    value: r ? "Ja" : "Nee"
                  })
                )
              )
            )
          );
        });
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
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var G = (function(e) {
          l()(n, e);
          var t = V(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              O()(C()(a), "switchToEdit", function() {
                a.setState({ showEdit: !0 });
              }),
              O()(C()(a), "switchToView", function() {
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
                  return h.a.createElement(
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
                    this.state.showEdit && n.manageMailgunDomain
                      ? h.a.createElement(B, {
                          switchToView: this.switchToView
                        })
                      : h.a.createElement(X, {
                          switchToEdit: this.switchToEdit
                        })
                  );
                }
              }
            ]),
            n
          );
        })(f.Component),
        U = Object(p.b)(function(e) {
          return {
            mailgunDomainDetails: e.mailgunDomainDetails,
            meDetails: e.meDetails,
            permissions: e.meDetails.permissions
          };
        })(G);
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
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var K = (function(e) {
          l()(n, e);
          var t = J(n);
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
                      ? (e = "Fout bij het ophalen van mailgun domein.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : Object(D.isEmpty)(this.props.mailgunDomainDetails)
                      ? (e = "Geen mailgun domein gevonden!")
                      : (t = !1),
                    t
                      ? h.a.createElement("div", null, e)
                      : h.a.createElement(
                          "div",
                          null,
                          h.a.createElement(U, null)
                        )
                  );
                }
              }
            ]),
            n
          );
        })(f.Component),
        Y = Object(p.b)(
          function(e) {
            return {
              mailgunDomainDetails: e.mailgunDomainDetails,
              isLoading: e.loadingData.isLoading,
              hasError: e.loadingData.hasError
            };
          },
          function(e) {
            return {
              fetchMailgunDomainDetails: function(t) {
                e(v(t));
              }
            };
          }
        )(K);
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
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var Q = (function(e) {
        l()(n, e);
        var t = H(n);
        function n(e) {
          return r()(this, n), t.call(this, e);
        }
        return (
          o()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchMailgunDomainDetails(this.props.params.id);
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
                      { className: "col-md-12 margin-10-top" },
                      h.a.createElement(
                        R.a,
                        null,
                        h.a.createElement(
                          A.a,
                          { className: "panel-small" },
                          h.a.createElement(k, null)
                        )
                      )
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      h.a.createElement(Y, null)
                    )
                  ),
                  h.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          n
        );
      })(f.Component);
      t.default = Object(p.b)(
        function(e) {
          return { mailgunDomainDetails: e.mailgunDomainDetails };
        },
        function(e) {
          return {
            fetchMailgunDomainDetails: function(t) {
              e(v(t));
            }
          };
        }
      )(Q);
    },
    690: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        i = n(8),
        o = n.n(i),
        c = function(e) {
          var t = e.children,
            n = e.className,
            a = e.onMouseEnter,
            i = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(n),
              onMouseEnter: a,
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
    691: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        i = n(8),
        o = n.n(i),
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
        i = n(8),
        o = n.n(i),
        c = function(e) {
          var t = e.buttonClassName,
            n = e.buttonText,
            a = e.onClickAction,
            i = e.type,
            o = e.value,
            c = e.loading,
            l = e.loadText,
            s = e.disabled;
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
                l
              )
            : r.a.createElement(
                "button",
                {
                  type: i,
                  className: "btn btn-sm ".concat(t),
                  onClick: a,
                  value: o,
                  disabled: s
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
        i = n(8),
        o = n.n(i),
        c = function(e) {
          var t = e.buttonClassName,
            n = e.iconName,
            a = e.onClickAction,
            i = e.title,
            o = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: a,
              disabled: o,
              title: i
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
        i = n(8),
        o = n.n(i),
        c = function(e) {
          var t = e.label,
            n = e.type,
            a = e.className,
            i = e.size,
            o = e.id,
            c = e.placeholder,
            l = e.name,
            s = e.value,
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
            D = e.divClassName,
            N = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(k, " ").concat(D) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(f) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(i) },
              r.a.createElement("input", {
                type: n,
                className:
                  "form-control input-sm ".concat(a) + (v ? "has-error" : ""),
                id: o,
                placeholder: c,
                name: l,
                value: s,
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
        i = n(4),
        o = n(8),
        c = n.n(o),
        l = function(e) {
          var t = e.label,
            n = e.className,
            a = e.id,
            o = e.value,
            c = e.link,
            l = e.hidden;
          return c.length > 0
            ? r.a.createElement(
                "div",
                { className: n, style: l ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: a, className: "col-sm-6" },
                  t
                ),
                r.a.createElement(
                  "div",
                  { className: "col-sm-6", id: a, onClick: null },
                  r.a.createElement(
                    i.b,
                    { to: c, className: "link-underline" },
                    o
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: n, style: l ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: a, className: "col-sm-6" },
                  t
                ),
                r.a.createElement("div", { className: "col-sm-6", id: a }, o)
              );
        };
      (l.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (l.propTypes = {
          label: c.a.oneOfType([c.a.string, c.a.object]).isRequired,
          className: c.a.string,
          id: c.a.string,
          value: c.a.oneOfType([c.a.string, c.a.number]),
          link: c.a.string,
          hidden: c.a.bool
        }),
        (t.a = l);
    },
    700: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        i = n(8),
        o = n.n(i),
        c = n(703),
        l = n.n(c),
        s = function(e) {
          var t = e.label,
            n = e.size,
            a = e.id,
            i = e.name,
            o = e.value,
            c = e.onChangeAction,
            s = e.required,
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
                { htmlFor: a, className: "col-sm-6 ".concat(s) },
                t
              )
            ),
            r.a.createElement(
              "div",
              { className: "".concat(n) },
              r.a.createElement(l.a, {
                id: a,
                name: i,
                onChange: c,
                checked: o,
                disabled: m
              })
            )
          );
        };
      (s.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        required: "",
        disabled: !1,
        value: null
      }),
        (s.propTypes = {
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
        (t.a = s);
    },
    703: function(e, t, n) {
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
        i = n(0),
        o = m(i),
        c = m(n(710)),
        l = m(n(8)),
        s = m(n(704)),
        u = m(n(705)),
        d = n(706);
      function m(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var f = (function(e) {
        function t(e) {
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, t);
          var n = (function(e, t) {
            if (!e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return !t || ("object" != typeof t && "function" != typeof t)
              ? e
              : t;
          })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
          return (
            (n.handleClick = n.handleClick.bind(n)),
            (n.handleTouchStart = n.handleTouchStart.bind(n)),
            (n.handleTouchMove = n.handleTouchMove.bind(n)),
            (n.handleTouchEnd = n.handleTouchEnd.bind(n)),
            (n.handleFocus = n.handleFocus.bind(n)),
            (n.handleBlur = n.handleBlur.bind(n)),
            (n.previouslyChecked = !(!e.checked && !e.defaultChecked)),
            (n.state = {
              checked: !(!e.checked && !e.defaultChecked),
              hasFocus: !1
            }),
            n
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
                var n = this.props.hasOwnProperty("checked")
                  ? this.props.checked
                  : t.checked;
                this.setState({ checked: n });
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
                    var n = (0, d.pointerCoord)(e).x;
                    !0 === this.previouslyChecked && this.startX + 4 > n
                      ? this.previouslyChecked !== this.state.checked &&
                        (this.setState({ checked: !1 }),
                        (this.previouslyChecked = this.state.checked),
                        t.click())
                      : this.startX - 4 < n &&
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
                var n = this.props.icons;
                return n
                  ? void 0 === n[e]
                    ? t.defaultProps.icons[e]
                    : n[e]
                  : null;
              }
            },
            {
              key: "render",
              value: function() {
                var e = this,
                  t = this.props,
                  n = t.className,
                  r =
                    (t.icons,
                    (function(e, t) {
                      var n = {};
                      for (var a in e)
                        t.indexOf(a) >= 0 ||
                          (Object.prototype.hasOwnProperty.call(e, a) &&
                            (n[a] = e[a]));
                      return n;
                    })(t, ["className", "icons"])),
                  i = (0, c.default)(
                    "react-toggle",
                    {
                      "react-toggle--checked": this.state.checked,
                      "react-toggle--focus": this.state.hasFocus,
                      "react-toggle--disabled": this.props.disabled
                    },
                    n
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
                    a({}, r, {
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
      (t.default = f),
        (f.displayName = "Toggle"),
        (f.defaultProps = {
          icons: {
            checked: o.default.createElement(s.default, null),
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
    704: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a,
        r = n(0),
        i = (a = r) && a.__esModule ? a : { default: a };
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
    705: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a,
        r = n(0),
        i = (a = r) && a.__esModule ? a : { default: a };
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
    706: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.pointerCoord = function(e) {
          if (e) {
            var t = e.changedTouches;
            if (t && t.length > 0) {
              var n = t[0];
              return { x: n.clientX, y: n.clientY };
            }
            var a = e.pageX;
            if (void 0 !== a) return { x: a, y: e.pageY };
          }
          return { x: 0, y: 0 };
        });
    },
    710: function(e, t, n) {
      var a;
      /*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/ !(function() {
        "use strict";
        var n = {}.hasOwnProperty;
        function r() {
          for (var e = [], t = 0; t < arguments.length; t++) {
            var a = arguments[t];
            if (a) {
              var i = typeof a;
              if ("string" === i || "number" === i) e.push(a);
              else if (Array.isArray(a) && a.length) {
                var o = r.apply(null, a);
                o && e.push(o);
              } else if ("object" === i)
                for (var c in a) n.call(a, c) && a[c] && e.push(c);
            }
          }
          return e.join(" ");
        }
        e.exports
          ? ((r.default = r), (e.exports = r))
          : void 0 ===
              (a = function() {
                return r;
              }.apply(t, [])) || (e.exports = a);
      })();
    }
  }
]);
