(window.webpackJsonp = window.webpackJsonp || []).push([
  [123],
  {
    1055: function(e, t) {
      e.exports = {
        error: {
          length: "Length should be a valid positive number",
          password: "Password should be a valid string"
        },
        regex: {
          digits: /\d+/,
          letters: /[a-zA-Z]+/,
          symbols: /[`~\!@#\$%\^\&\*\(\)\-_\=\+\[\{\}\]\\\|;:'",<.>\/\?€£¥₹]+/,
          spaces: /[\s]+/
        }
      };
    },
    1393: function(e, t, r) {
      var a = r(1394),
        s = r(1055).error;
      function n(e) {
        if (!e || "number" != typeof e || e < 0) throw new Error(s.length);
      }
      function o(e) {
        return a[e.method].apply(this, e.arguments);
      }
      function i(e, t) {
        return this.properties.push({ method: e, arguments: t }), this;
      }
      function l() {
        this.properties = [];
      }
      (l.prototype.validate = function(e, t) {
        if ("string" != typeof e) throw new Error(s.password);
        (this.password = e), (this.positive = !0);
        var r = this;
        return t && !0 === t.list
          ? this.properties.reduce(function(e, t) {
              return o.call(r, t) ? e : e.concat(t.method);
            }, [])
          : this.properties.every(function(e) {
              return o.call(r, e);
            });
      }),
        (l.prototype.not = function() {
          return i.call(this, "not", arguments);
        }),
        (l.prototype.has = function() {
          return i.call(this, "has", arguments);
        }),
        (l.prototype.is = function() {
          return i.call(this, "is", arguments);
        }),
        (l.prototype.min = function(e) {
          return n(e), i.call(this, "min", arguments);
        }),
        (l.prototype.max = function(e) {
          return n(e), i.call(this, "max", arguments);
        }),
        (l.prototype.digits = function() {
          return i.call(this, "digits", arguments);
        }),
        (l.prototype.letters = function() {
          return i.call(this, "letters", arguments);
        }),
        (l.prototype.uppercase = function() {
          return i.call(this, "uppercase", arguments);
        }),
        (l.prototype.lowercase = function() {
          return i.call(this, "lowercase", arguments);
        }),
        (l.prototype.symbols = function() {
          return i.call(this, "symbols", arguments);
        }),
        (l.prototype.spaces = function() {
          return i.call(this, "spaces", arguments);
        }),
        (l.prototype.oneOf = function() {
          return i.call(this, "oneOf", arguments);
        }),
        (e.exports = l);
    },
    1394: function(e, t, r) {
      var a = r(1055).regex;
      function s(e) {
        return new RegExp(e).test(this.password) === this.positive;
      }
      e.exports = {
        not: function(e) {
          return (this.positive = !1), !e || s.call(this, e);
        },
        has: function(e) {
          return (this.positive = !0), !e || s.call(this, e);
        },
        is: function() {
          return (this.positive = !0), !0;
        },
        min: function(e) {
          return this.password.length >= e;
        },
        max: function(e) {
          return this.password.length <= e;
        },
        digits: function() {
          return s.call(this, a.digits);
        },
        letters: function() {
          return s.call(this, a.letters);
        },
        uppercase: function() {
          return (
            (this.password !== this.password.toLowerCase()) === this.positive
          );
        },
        lowercase: function() {
          return (
            (this.password !== this.password.toUpperCase()) === this.positive
          );
        },
        symbols: function() {
          return s.call(this, a.symbols);
        },
        spaces: function() {
          return s.call(this, a.spaces);
        },
        oneOf: function(e) {
          return e.indexOf(this.password) >= 0 === this.positive;
        }
      };
    },
    1526: function(e, t, r) {
      "use strict";
      r.r(t);
      var a = r(6),
        s = r.n(a),
        n = r(24),
        o = r.n(n),
        i = r(25),
        l = r.n(i),
        c = r(26),
        u = r.n(c),
        p = r(27),
        m = r.n(p),
        d = r(16),
        h = r.n(d),
        f = r(0),
        w = r.n(f),
        v = r(2),
        g = r.n(v),
        E = r(4),
        y = r(1393),
        b = r.n(y),
        N = function(e) {
          var t = new b.a();
          return (
            t
              .is()
              .min(8)
              .has()
              .uppercase()
              .has()
              .lowercase()
              .has()
              .digits()
              .has()
              .not()
              .spaces(),
            t.validate(e)
          );
        },
        k = r(198);
      function x(e) {
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
          var r,
            a = h()(e);
          if (t) {
            var s = h()(this).constructor;
            r = Reflect.construct(a, arguments, s);
          } else r = a.apply(this, arguments);
          return m()(this, r);
        };
      }
      var j = (function(e) {
        u()(r, e);
        var t = x(r);
        function r(e) {
          var a;
          return (
            o()(this, r),
            ((a = t.call(this, e)).state = {
              token: e.params.token,
              email: e.params.email,
              password: "",
              password_confirmation: ""
            }),
            a
          );
        }
        return (
          l()(r, [
            {
              key: "onSubmit",
              value: function(e) {
                var t = this;
                e.preventDefault();
                var r = this.state,
                  a = r.token,
                  s = r.email,
                  n = r.password,
                  o = r.password_confirmation,
                  i = "".concat(URL_API, "/api/password/reset");
                N(n) && N(o)
                  ? n != o
                    ? this.setState({ passwordError: !1, passwordError2: !0 })
                    : g.a
                        .post(i, {
                          token: a,
                          email: s,
                          password: n,
                          password_confirmation: o
                        })
                        .then(function(e) {
                          Object(k.isEmpty)(e.data)
                            ? (t.setState({
                                err: !1,
                                errMessage: "",
                                passwordError: !1,
                                passwordError2: !1
                              }),
                              setTimeout(function() {
                                E.f.push("/login");
                              }, 2e3))
                            : t.setState({
                                err: !0,
                                errMessage: e.data,
                                passwordError: !1,
                                passwordError2: !1
                              });
                        })
                        .catch(function(e) {
                          (t.refs.password.value = ""),
                            (t.refs.confirm.value = ""),
                            t.setState({
                              err: !0,
                              errMessage:
                                "Onbekende fout bij wijzigen wachtwoord",
                              passwordError: !1,
                              passwordError2: !1
                            });
                        })
                  : this.setState({ passwordError: !0, passwordError2: !1 });
              }
            },
            {
              key: "onChange",
              value: function(e) {
                var t = e.target,
                  r = t.name,
                  a = t.value;
                this.setState(s()({}, r, a));
              }
            },
            {
              key: "render",
              value: function() {
                var e = this.state.err,
                  t = this.state.passwordError
                    ? "Het wachtwoord moet minimaal 8 karakters lang zijn en moet minimaal 1 cijfer en 1 hoofdletter bevatten."
                    : null,
                  r = this.state.passwordError2
                    ? "Wachtwoorden komen niet overeen."
                    : null,
                  a = "";
                a = e
                  ? "passwords.token" === this.state.errMessage
                    ? "Wachtwoord reset link is niet geldig of verlopen."
                    : "Onbekende fout bij wijzigen wachtwoord"
                  : "Wachtwoord successvol gewijzigd";
                var s = e ? "alert alert-danger" : "alert alert-success";
                return w.a.createElement(
                  "div",
                  null,
                  w.a.createElement(
                    "div",
                    { className: "container" },
                    w.a.createElement(
                      "div",
                      { className: "row" },
                      w.a.createElement(
                        "div",
                        { className: "col-md-8 col-md-offset-2" },
                        w.a.createElement(
                          "div",
                          { className: "panel panel-default" },
                          w.a.createElement(
                            "div",
                            { className: "panel-heading" },
                            "Wachtwoord wijzigen"
                          ),
                          w.a.createElement(
                            "div",
                            { className: "panel-body" },
                            w.a.createElement(
                              "div",
                              {
                                className:
                                  "col-md-offset-2 col-md-8 col-md-offset-2"
                              },
                              null != e &&
                                w.a.createElement(
                                  "div",
                                  { className: s, role: "alert" },
                                  a
                                ),
                              null != t &&
                                w.a.createElement(
                                  "div",
                                  {
                                    className: "alert alert-danger",
                                    role: "alert"
                                  },
                                  t
                                ),
                              null != r &&
                                w.a.createElement(
                                  "div",
                                  {
                                    className: "alert alert-danger",
                                    role: "alert"
                                  },
                                  r
                                )
                            ),
                            w.a.createElement(
                              "form",
                              {
                                className: "form-horizontal",
                                role: "form",
                                onSubmit: this.onSubmit.bind(this)
                              },
                              w.a.createElement(
                                "div",
                                { className: "form-group" },
                                w.a.createElement(
                                  "label",
                                  {
                                    htmlFor: "email",
                                    className: "col-md-4 control-label"
                                  },
                                  "E-mailadres"
                                ),
                                w.a.createElement(
                                  "div",
                                  { className: "col-md-6" },
                                  w.a.createElement("input", {
                                    id: "email",
                                    type: "email",
                                    className: "form-control",
                                    ref: "email",
                                    name: "email",
                                    value: this.state.email,
                                    onChange: this.onChange.bind(this),
                                    required: !0,
                                    readOnly: !0
                                  })
                                )
                              ),
                              w.a.createElement(
                                "div",
                                { className: "form-group" },
                                w.a.createElement(
                                  "label",
                                  {
                                    htmlFor: "password",
                                    className: "col-md-4 control-label"
                                  },
                                  "Wachtwoord"
                                ),
                                w.a.createElement(
                                  "div",
                                  { className: "col-md-6" },
                                  w.a.createElement("input", {
                                    id: "password",
                                    type: "password",
                                    className: "form-control",
                                    ref: "password",
                                    name: "password",
                                    onChange: this.onChange.bind(this),
                                    required: !0
                                  })
                                )
                              ),
                              w.a.createElement(
                                "div",
                                { className: "form-group" },
                                w.a.createElement(
                                  "label",
                                  {
                                    htmlFor: "password-confirm",
                                    className: "col-md-4 control-label"
                                  },
                                  "Herhaal wachtwoord"
                                ),
                                w.a.createElement(
                                  "div",
                                  { className: "col-md-6" },
                                  w.a.createElement("input", {
                                    id: "password-confirm",
                                    type: "password",
                                    className: "form-control",
                                    ref: "confirm",
                                    name: "password_confirmation",
                                    onChange: this.onChange.bind(this),
                                    required: !0
                                  })
                                )
                              ),
                              w.a.createElement(
                                "div",
                                { className: "form-group" },
                                w.a.createElement(
                                  "div",
                                  { className: "col-md-6 col-md-offset-4" },
                                  w.a.createElement(
                                    "button",
                                    {
                                      type: "submit",
                                      className: "btn btn-primary"
                                    },
                                    "Wachtwoord wijzigen"
                                  )
                                )
                              )
                            )
                          )
                        )
                      )
                    )
                  )
                );
              }
            }
          ]),
          r
        );
      })(f.Component);
      t.default = j;
    }
  }
]);
