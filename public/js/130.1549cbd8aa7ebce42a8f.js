(window.webpackJsonp = window.webpackJsonp || []).push([
  [130],
  {
    1411: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        l = a(25),
        c = a.n(l),
        s = a(26),
        o = a.n(s),
        i = a(27),
        m = a.n(i),
        u = a(16),
        f = a.n(u),
        d = a(0),
        v = a.n(d),
        h = a(2),
        p = a.n(h);
      function E(e) {
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
      var b = (function(e) {
        o()(a, e);
        var t = E(a);
        function a(e) {
          var n;
          return r()(this, a), ((n = t.call(this, e)).state = { email: "" }), n;
        }
        return (
          c()(a, [
            {
              key: "onSubmit",
              value: function(e) {
                var t = this;
                e.preventDefault();
                var a = this.state.email;
                p.a
                  .post("".concat(URL_API, "/api/password/email"), { email: a })
                  .then(function(e) {
                    (t.refs.email.value = ""), t.setState({ err: !1 });
                  })
                  .catch(function(e) {
                    t.setState({ err: !0 }), (t.refs.email.value = "");
                  });
              }
            },
            {
              key: "onChange",
              value: function(e) {
                var t = e.target.value;
                this.setState({ email: t });
              }
            },
            {
              key: "render",
              value: function() {
                var e = this.state.err,
                  t = e
                    ? "E-mail bestaat niet."
                    : "We hebben je een e-mail gestuurd met een wachtwoord reset link!",
                  a = e ? "alert alert-danger" : "alert alert-success";
                return v.a.createElement(
                  "div",
                  null,
                  v.a.createElement(
                    "div",
                    { className: "container" },
                    v.a.createElement(
                      "div",
                      { className: "row" },
                      v.a.createElement(
                        "div",
                        { className: "col-md-8 col-md-offset-2" },
                        v.a.createElement(
                          "div",
                          { className: "panel panel-default" },
                          v.a.createElement(
                            "div",
                            { className: "panel-heading" },
                            "Reset wachtwoord"
                          ),
                          v.a.createElement(
                            "div",
                            { className: "panel-body" },
                            v.a.createElement(
                              "div",
                              {
                                className:
                                  "col-md-offset-2 col-md-8 col-md-offset-2"
                              },
                              null != e &&
                                v.a.createElement(
                                  "div",
                                  { className: a, role: "alert" },
                                  t
                                )
                            ),
                            v.a.createElement(
                              "form",
                              {
                                className: "form-horizontal",
                                role: "form",
                                method: "POST",
                                onSubmit: this.onSubmit.bind(this)
                              },
                              v.a.createElement(
                                "div",
                                { className: "form-group" },
                                v.a.createElement(
                                  "label",
                                  {
                                    htmlFor: "email",
                                    className: "col-md-4 control-label"
                                  },
                                  "E-mailadres"
                                ),
                                v.a.createElement(
                                  "div",
                                  { className: "col-md-6" },
                                  v.a.createElement("input", {
                                    id: "email",
                                    type: "email",
                                    ref: "email",
                                    className: "form-control",
                                    name: "email",
                                    onChange: this.onChange.bind(this),
                                    required: !0
                                  })
                                )
                              ),
                              v.a.createElement(
                                "div",
                                { className: "form-group" },
                                v.a.createElement(
                                  "div",
                                  { className: "col-md-6 col-md-offset-4" },
                                  v.a.createElement(
                                    "button",
                                    {
                                      type: "submit",
                                      className: "btn btn-primary"
                                    },
                                    "Verstuur wachtwoord reset link"
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
          a
        );
      })(d.Component);
      t.default = b;
    }
  }
]);
