(window.webpackJsonp = window.webpackJsonp || []).push([
  [132],
  {
    1413: function(t, e, n) {
      "use strict";
      n.r(e);
      var o = n(24),
        r = n.n(o),
        u = n(25),
        c = n.n(u),
        a = n(26),
        l = n.n(a),
        i = n(27),
        f = n.n(i),
        s = n(16),
        p = n.n(s),
        m = n(0),
        v = n.n(m),
        h = n(32),
        g = n(4),
        y = n(218);
      function d(t) {
        var e = (function() {
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
          } catch (t) {
            return !1;
          }
        })();
        return function() {
          var n,
            o = p()(t);
          if (e) {
            var r = p()(this).constructor;
            n = Reflect.construct(o, arguments, r);
          } else n = o.apply(this, arguments);
          return f()(this, n);
        };
      }
      var k = (function(t) {
        l()(n, t);
        var e = d(n);
        function n() {
          return r()(this, n), e.apply(this, arguments);
        }
        return (
          c()(n, [
            {
              key: "componentWillMount",
              value: function() {
                localStorage.removeItem("auth_token"),
                  localStorage.removeItem("access_token"),
                  localStorage.removeItem("refresh_token"),
                  localStorage.removeItem("userId"),
                  localStorage.removeItem("userName"),
                  localStorage.removeItem("last_activity"),
                  this.props.authLogout(),
                  g.f.push("/login");
              }
            },
            {
              key: "render",
              value: function() {
                return v.a.createElement("div", null, "U bent nu uitgelogd.");
              }
            }
          ]),
          n
        );
      })(m.Component);
      e.default = Object(h.b)(null, function(t) {
        return {
          authLogout: function() {
            t(Object(y.a)());
          }
        };
      })(k);
    }
  }
]);
