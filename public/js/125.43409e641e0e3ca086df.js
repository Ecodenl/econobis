(window.webpackJsonp = window.webpackJsonp || []).push([
  [125],
  {
    1414: function(e, n, a) {
      "use strict";
      a.r(n);
      var t = a(0),
        r = a.n(t),
        s = a(4),
        o = a(690),
        c = a(691);
      n.default = function() {
        return r.a.createElement(
          o.a,
          null,
          r.a.createElement(
            c.a,
            null,
            r.a.createElement(
              "h1",
              null,
              r.a.createElement("strong", null, "404")
            ),
            r.a.createElement(
              "p",
              null,
              "De gevraagde pagina is niet gevonden. Ga ",
              r.a.createElement(s.b, { to: "/" }, "terug"),
              " naar het dashboard of probeer een andere link."
            )
          )
        );
      };
    },
    690: function(e, n, a) {
      "use strict";
      var t = a(0),
        r = a.n(t),
        s = a(8),
        o = a.n(s),
        c = function(e) {
          var n = e.children,
            a = e.className,
            t = e.onMouseEnter,
            s = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: t,
              onMouseLeave: s
            },
            n
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
        (n.a = c);
    },
    691: function(e, n, a) {
      "use strict";
      var t = a(0),
        r = a.n(t),
        s = a(8),
        o = a.n(s),
        c = function(e) {
          var n = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(n) },
            a
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: o.a.string }),
        (n.a = c);
    }
  }
]);
