(window.webpackJsonp = window.webpackJsonp || []).push([
  [131],
  {
    1412: function(e, t, a) {
      "use strict";
      a.r(t);
      var r = a(24),
        n = a.n(r),
        s = a(25),
        l = a.n(s),
        o = a(22),
        c = a.n(o),
        m = a(26),
        u = a.n(m),
        i = a(27),
        d = a.n(i),
        f = a(16),
        p = a.n(f),
        h = a(6),
        v = a.n(h),
        g = a(0),
        E = a.n(g),
        w = a(32),
        b = a(4),
        N = a(218),
        y = a(188),
        S = a(225),
        k = a(7),
        C = a.n(k);
      function I(e) {
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
            r = p()(e);
          if (t) {
            var n = p()(this).constructor;
            a = Reflect.construct(r, arguments, n);
          } else a = r.apply(this, arguments);
          return d()(this, a);
        };
      }
      var x = (function(e) {
        u()(a, e);
        var t = I(a);
        function a(e) {
          var r;
          return (
            n()(this, a),
            (r = t.call(this, e)),
            v()(c()(r), "handleInputChange", function(e) {
              var t = e.target,
                a = t.value,
                n = t.name;
              r.setState(v()({}, n, a));
            }),
            v()(c()(r), "handleSubmit", function(e) {
              e.preventDefault();
              var t = {
                username: r.state.username,
                password: r.state.password
              };
              y.a.loginUser(t).then(function(e) {
                200 == e.status
                  ? (localStorage.setItem("access_token", e.data.access_token),
                    localStorage.setItem("refresh_token", e.data.refresh_token),
                    localStorage.setItem("last_activity", C()().format()),
                    r.props.authSuccess(),
                    b.f.push("/"))
                  : r.setState({
                      username: "",
                      password: "",
                      errorMessage: "Verkeerde inloggegevens ingevuld!"
                    });
              });
            }),
            (r.state = { username: "", password: "", errorMessage: "" }),
            r
          );
        }
        return (
          l()(a, [
            {
              key: "renderAlert",
              value: function() {
                if (this.state.errorMessage)
                  return E.a.createElement(
                    "div",
                    {
                      className:
                        "col-sm-10 col-md-offset-1 alert alert-danger login-alert"
                    },
                    this.state.errorMessage
                  );
              }
            },
            {
              key: "render",
              value: function() {
                var e = this.state,
                  t = e.username,
                  a = e.password;
                return E.a.createElement(
                  "div",
                  { className: "col-md-4 col-sm-8 col-xs-10 login-form" },
                  E.a.createElement(
                    "div",
                    { className: "panel panel-default add" },
                    E.a.createElement(
                      "div",
                      { className: "panel-body" },
                      E.a.createElement(
                        "div",
                        { className: "text-center" },
                        E.a.createElement(S.a, { height: "150px" })
                      ),
                      E.a.createElement(
                        "form",
                        { onSubmit: this.handleSubmit },
                        E.a.createElement(
                          "div",
                          { className: "row margin-10-top" },
                          E.a.createElement(
                            "div",
                            { className: "col-sm-10 col-md-offset-1" },
                            E.a.createElement(
                              "div",
                              { className: "form-group" },
                              E.a.createElement(
                                "label",
                                {
                                  htmlFor: "username",
                                  className: "control-label"
                                },
                                "E-mail:"
                              ),
                              E.a.createElement("input", {
                                type: "text",
                                name: "username",
                                value: t,
                                className: "form-control",
                                placeholder: "E-mail...",
                                onChange: this.handleInputChange
                              })
                            ),
                            E.a.createElement(
                              "div",
                              { className: "form-group" },
                              E.a.createElement(
                                "label",
                                {
                                  htmlFor: "password",
                                  className: "control-label"
                                },
                                "Wachtwoord:"
                              ),
                              E.a.createElement("input", {
                                type: "password",
                                name: "password",
                                value: a,
                                className: "form-control",
                                placeholder: "Wachtwoord ...",
                                onChange: this.handleInputChange
                              })
                            )
                          ),
                          this.renderAlert()
                        ),
                        E.a.createElement(
                          "div",
                          { className: "row" },
                          E.a.createElement(
                            "div",
                            { className: "col-sm-10 col-md-offset-1" },
                            E.a.createElement(
                              b.b,
                              {
                                to: "wachtwoord-vergeten",
                                className: "link-underline"
                              },
                              "Wachtwoord vergeten?"
                            ),
                            E.a.createElement(
                              "div",
                              { className: "btn-group pull-right" },
                              E.a.createElement(
                                "button",
                                {
                                  type: "submit",
                                  className: "btn btn-primary"
                                },
                                "Login"
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
          a
        );
      })(g.Component);
      t.default = Object(w.b)(null, function(e) {
        return {
          authSuccess: function() {
            e(Object(N.b)());
          }
        };
      })(x);
    }
  }
]);
