(window.webpackJsonp = window.webpackJsonp || []).push([
  [105],
  {
    1475: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        c = n(25),
        o = n.n(c),
        s = n(26),
        i = n.n(s),
        u = n(27),
        l = n.n(u),
        f = n(16),
        m = n.n(f),
        h = n(0),
        v = n.n(h),
        p = n(789),
        d = n(790),
        E = n(22),
        y = n.n(E),
        N = n(6),
        g = n.n(N),
        b = n(7),
        R = n.n(b),
        L = function(e) {
          var t = e.job,
            n = t.value,
            a = t.createdAt;
          return v.a.createElement(
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
            v.a.createElement("div", { className: "col-sm-8" }, n),
            v.a.createElement(
              "div",
              { className: "col-sm-4" },
              R()(a).format("L")
            )
          );
        };
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
          var n,
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return l()(this, n);
        };
      }
      var x = (function(e) {
          i()(n, e);
          var t = k(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              g()(y()(a), "onLineEnter", function() {
                a.setState({ highlightLine: "highlight-line" });
              }),
              g()(y()(a), "onLineLeave", function() {
                a.setState({ highlightLine: "" });
              }),
              (a.state = { job: e.job }),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "render",
                value: function() {
                  return v.a.createElement(
                    "div",
                    null,
                    v.a.createElement(L, {
                      highlightLine: this.state.highlightLine,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      job: this.state.job
                    })
                  );
                }
              }
            ]),
            n
          );
        })(h.Component),
        M = function(e) {
          return v.a.createElement(
            "div",
            null,
            v.a.createElement(
              "div",
              { className: "row border header" },
              v.a.createElement("div", { className: "col-sm-8" }, "Melding"),
              v.a.createElement("div", { className: "col-sm-4" }, "Datum")
            ),
            e.jobs.length > 0
              ? e.jobs.map(function(e) {
                  return v.a.createElement(x, { key: e.id, job: e });
                })
              : v.a.createElement("div", null, "Geen gegevens bekend.")
          );
        },
        j = n(690),
        A = n(691),
        D = n(698),
        P = n(2),
        S = n.n(P),
        w = "".concat(URL_API, "/api/jobs"),
        z = function() {
          var e = "".concat(w),
            t = "Bearer ".concat(localStorage.getItem("access_token"));
          return (
            (S.a.defaults.headers.common.Authorization = t),
            S.a
              .get(e)
              .then(function(e) {
                return e.data;
              })
              .catch(function(e) {
                console.log(e);
              })
          );
        };
      function C(e) {
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
          return l()(this, n);
        };
      }
      var T = (function(e) {
        i()(n, e);
        var t = C(n);
        function n(e) {
          var a;
          return r()(this, n), ((a = t.call(this, e)).state = { jobs: [] }), a;
        }
        return (
          o()(n, [
            {
              key: "componentWillMount",
              value: function() {
                var e = this;
                z().then(function(t) {
                  e.setState({ jobs: t.data });
                });
              }
            },
            {
              key: "render",
              value: function() {
                return v.a.createElement(
                  "div",
                  { className: "".concat(this.props.size) },
                  v.a.createElement(
                    j.a,
                    null,
                    v.a.createElement(
                      D.a,
                      null,
                      v.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Processen"
                      )
                    ),
                    v.a.createElement(
                      A.a,
                      null,
                      v.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        v.a.createElement(M, { jobs: this.state.jobs })
                      )
                    )
                  )
                );
              }
            }
          ]),
          n
        );
      })(h.Component);
      function O(e) {
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
          return l()(this, n);
        };
      }
      var I = (function(e) {
        i()(n, e);
        var t = O(n);
        function n() {
          return r()(this, n), t.apply(this, arguments);
        }
        return (
          o()(n, [
            {
              key: "render",
              value: function() {
                return v.a.createElement(
                  "div",
                  null,
                  v.a.createElement(
                    "div",
                    { className: "row" },
                    v.a.createElement(p.a, { size: "col-xs-3" }),
                    v.a.createElement(d.a, { size: "col-xs-3" })
                  ),
                  v.a.createElement(
                    "div",
                    { className: "row" },
                    v.a.createElement(T, { size: "col-xs-6" })
                  )
                );
              }
            }
          ]),
          n
        );
      })(h.Component);
      t.default = I;
    },
    690: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        c = n(8),
        o = n.n(c),
        s = function(e) {
          var t = e.children,
            n = e.className,
            a = e.onMouseEnter,
            c = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(n),
              onMouseEnter: a,
              onMouseLeave: c
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
          className: o.a.string,
          onMouseEnter: o.a.func,
          onMouseLeave: o.a.func
        }),
        (t.a = s);
    },
    691: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        c = n(8),
        o = n.n(c),
        s = function(e) {
          var t = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            n
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: o.a.string }),
        (t.a = s);
    },
    698: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        c = n(8),
        o = n.n(c),
        s = function(e) {
          var t = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-heading ".concat(t) },
            n
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: o.a.string }),
        (t.a = s);
    },
    789: function(e, t, n) {
      "use strict";
      var a = n(24),
        r = n.n(a),
        c = n(25),
        o = n.n(c),
        s = n(26),
        i = n.n(s),
        u = n(27),
        l = n.n(u),
        f = n(16),
        m = n.n(f),
        h = n(0),
        v = n.n(h),
        p = n(4),
        d = n(148);
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
          var n,
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return l()(this, n);
        };
      }
      var y = (function(e) {
        i()(n, e);
        var t = E(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            ((a = t.call(this, e)).state = { amountOpenEmails: "-" }),
            a
          );
        }
        return (
          o()(n, [
            {
              key: "componentWillMount",
              value: function() {
                var e = this;
                d.a.getAmountOpen().then(function(t) {
                  e.setState({ amountOpenEmails: t });
                });
              }
            },
            {
              key: "render",
              value: function() {
                return v.a.createElement(
                  "div",
                  {
                    className: this.props.size,
                    onClick: function() {
                      return p.f.push("/emails/inbox/eigen");
                    }
                  },
                  v.a.createElement(
                    "div",
                    {
                      className: "panel panel-default",
                      id: "dashboardbutton-1"
                    },
                    v.a.createElement(
                      "div",
                      { className: "panel-body" },
                      v.a.createElement(
                        "h4",
                        { className: "text-center text-bold" },
                        "E-MAIL"
                      ),
                      v.a.createElement(
                        "h4",
                        { className: "text-center text-bold" },
                        this.state.amountOpenEmails
                      )
                    )
                  )
                );
              }
            }
          ]),
          n
        );
      })(h.Component);
      t.a = y;
    },
    790: function(e, t, n) {
      "use strict";
      var a = n(24),
        r = n.n(a),
        c = n(25),
        o = n.n(c),
        s = n(26),
        i = n.n(s),
        u = n(27),
        l = n.n(u),
        f = n(16),
        m = n.n(f),
        h = n(0),
        v = n.n(h),
        p = n(4),
        d = n(107);
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
          var n,
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return l()(this, n);
        };
      }
      var y = (function(e) {
        i()(n, e);
        var t = E(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            ((a = t.call(this, e)).state = { amountActiveTasks: "-" }),
            a
          );
        }
        return (
          o()(n, [
            {
              key: "componentWillMount",
              value: function() {
                var e = this;
                d.a.getAmountActive().then(function(t) {
                  e.setState({ amountActiveTasks: t });
                });
              }
            },
            {
              key: "render",
              value: function() {
                return v.a.createElement(
                  "div",
                  {
                    className: this.props.size,
                    onClick: function() {
                      return p.f.push("/taken/eigen");
                    }
                  },
                  v.a.createElement(
                    "div",
                    {
                      className: "panel panel-default",
                      id: "dashboardbutton-4"
                    },
                    v.a.createElement(
                      "div",
                      { className: "panel-body" },
                      v.a.createElement(
                        "h4",
                        { className: "text-center text-bold" },
                        "OPEN TAKEN"
                      ),
                      v.a.createElement(
                        "h4",
                        { className: "text-center text-bold" },
                        this.state.amountActiveTasks
                      )
                    )
                  )
                );
              }
            }
          ]),
          n
        );
      })(h.Component);
      t.a = y;
    }
  }
]);
