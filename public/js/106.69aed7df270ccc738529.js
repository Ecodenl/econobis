(window.webpackJsonp = window.webpackJsonp || []).push([
  [106],
  {
    1410: function(t, e, n) {
      "use strict";
      n.r(e);
      var r = n(24),
        a = n.n(r),
        c = n(25),
        o = n.n(c),
        u = n(26),
        i = n.n(u),
        s = n(27),
        l = n.n(s),
        f = n(16),
        m = n.n(f),
        p = n(0),
        v = n.n(p),
        h = n(789),
        d = n(921),
        y = n(922),
        E = n(790),
        R = n(923);
      function x(t) {
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
            r = m()(t);
          if (e) {
            var a = m()(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return l()(this, n);
        };
      }
      var N = (function(t) {
        i()(n, t);
        var e = x(n);
        function n() {
          return a()(this, n), e.apply(this, arguments);
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
                    v.a.createElement(h.a, { size: "col-xs-2" }),
                    v.a.createElement(E.a, { size: "col-xs-2" }),
                    v.a.createElement(d.a, { size: "col-xs-2" }),
                    v.a.createElement(y.a, { size: "col-xs-2" }),
                    v.a.createElement(R.a, { size: "col-xs-2" })
                  )
                );
              }
            }
          ]),
          n
        );
      })(p.Component);
      e.default = N;
    },
    789: function(t, e, n) {
      "use strict";
      var r = n(24),
        a = n.n(r),
        c = n(25),
        o = n.n(c),
        u = n(26),
        i = n.n(u),
        s = n(27),
        l = n.n(s),
        f = n(16),
        m = n.n(f),
        p = n(0),
        v = n.n(p),
        h = n(4),
        d = n(148);
      function y(t) {
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
            r = m()(t);
          if (e) {
            var a = m()(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return l()(this, n);
        };
      }
      var E = (function(t) {
        i()(n, t);
        var e = y(n);
        function n(t) {
          var r;
          return (
            a()(this, n),
            ((r = e.call(this, t)).state = { amountOpenEmails: "-" }),
            r
          );
        }
        return (
          o()(n, [
            {
              key: "componentWillMount",
              value: function() {
                var t = this;
                d.a.getAmountOpen().then(function(e) {
                  t.setState({ amountOpenEmails: e });
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
                      return h.f.push("/emails/inbox/eigen");
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
      })(p.Component);
      e.a = E;
    },
    790: function(t, e, n) {
      "use strict";
      var r = n(24),
        a = n.n(r),
        c = n(25),
        o = n.n(c),
        u = n(26),
        i = n.n(u),
        s = n(27),
        l = n.n(s),
        f = n(16),
        m = n.n(f),
        p = n(0),
        v = n.n(p),
        h = n(4),
        d = n(107);
      function y(t) {
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
            r = m()(t);
          if (e) {
            var a = m()(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return l()(this, n);
        };
      }
      var E = (function(t) {
        i()(n, t);
        var e = y(n);
        function n(t) {
          var r;
          return (
            a()(this, n),
            ((r = e.call(this, t)).state = { amountActiveTasks: "-" }),
            r
          );
        }
        return (
          o()(n, [
            {
              key: "componentWillMount",
              value: function() {
                var t = this;
                d.a.getAmountActive().then(function(e) {
                  t.setState({ amountActiveTasks: e });
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
                      return h.f.push("/taken/eigen");
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
      })(p.Component);
      e.a = E;
    },
    921: function(t, e, n) {
      "use strict";
      var r = n(24),
        a = n.n(r),
        c = n(25),
        o = n.n(c),
        u = n(26),
        i = n.n(u),
        s = n(27),
        l = n.n(s),
        f = n(16),
        m = n.n(f),
        p = n(0),
        v = n.n(p),
        h = n(4),
        d = n(206);
      function y(t) {
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
            r = m()(t);
          if (e) {
            var a = m()(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return l()(this, n);
        };
      }
      var E = (function(t) {
        i()(n, t);
        var e = y(n);
        function n(t) {
          var r;
          return (
            a()(this, n),
            ((r = e.call(this, t)).state = { amountActiveIntakes: "-" }),
            r
          );
        }
        return (
          o()(n, [
            {
              key: "componentWillMount",
              value: function() {
                var t = this;
                d.a.getAmountActive().then(function(e) {
                  t.setState({ amountActiveIntakes: e });
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
                      return h.f.push("/intakes");
                    }
                  },
                  v.a.createElement(
                    "div",
                    {
                      className: "panel panel-default",
                      id: "dashboardbutton-2"
                    },
                    v.a.createElement(
                      "div",
                      { className: "panel-body" },
                      v.a.createElement(
                        "h4",
                        { className: "text-center text-bold" },
                        "INTAKES"
                      ),
                      v.a.createElement(
                        "h4",
                        { className: "text-center text-bold" },
                        this.state.amountActiveIntakes
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
      e.a = E;
    },
    922: function(t, e, n) {
      "use strict";
      var r = n(24),
        a = n.n(r),
        c = n(25),
        o = n.n(c),
        u = n(26),
        i = n.n(u),
        s = n(27),
        l = n.n(s),
        f = n(16),
        m = n.n(f),
        p = n(0),
        v = n.n(p),
        h = n(4),
        d = n(209);
      function y(t) {
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
            r = m()(t);
          if (e) {
            var a = m()(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return l()(this, n);
        };
      }
      var E = (function(t) {
        i()(n, t);
        var e = y(n);
        function n(t) {
          var r;
          return (
            a()(this, n),
            ((r = e.call(this, t)).state = { amountActiveOpportunities: "-" }),
            r
          );
        }
        return (
          o()(n, [
            {
              key: "componentWillMount",
              value: function() {
                var t = this;
                d.a.getAmountActive().then(function(e) {
                  t.setState({ amountActiveOpportunities: e });
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
                      return h.f.push("/kansen");
                    }
                  },
                  v.a.createElement(
                    "div",
                    {
                      className: "panel panel-default",
                      id: "dashboardbutton-3"
                    },
                    v.a.createElement(
                      "div",
                      { className: "panel-body" },
                      v.a.createElement(
                        "h4",
                        { className: "text-center text-bold" },
                        "KANSEN"
                      ),
                      v.a.createElement(
                        "h4",
                        { className: "text-center text-bold" },
                        this.state.amountActiveOpportunities
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
      e.a = E;
    },
    923: function(t, e, n) {
      "use strict";
      var r = n(24),
        a = n.n(r),
        c = n(25),
        o = n.n(c),
        u = n(26),
        i = n.n(u),
        s = n(27),
        l = n.n(s),
        f = n(16),
        m = n.n(f),
        p = n(0),
        v = n.n(p),
        h = n(4),
        d = n(211);
      function y(t) {
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
            r = m()(t);
          if (e) {
            var a = m()(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return l()(this, n);
        };
      }
      var E = (function(t) {
        i()(n, t);
        var e = y(n);
        function n(t) {
          var r;
          return (
            a()(this, n),
            ((r = e.call(this, t)).state = {
              amountActiveQuotationsRequests: "-"
            }),
            r
          );
        }
        return (
          o()(n, [
            {
              key: "componentWillMount",
              value: function() {
                var t = this;
                d.a.getAmountActive().then(function(e) {
                  t.setState({ amountActiveQuotationsRequests: e });
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
                      return h.f.push("/offerteverzoeken");
                    }
                  },
                  v.a.createElement(
                    "div",
                    {
                      className: "panel panel-default",
                      id: "dashboardbutton-5"
                    },
                    v.a.createElement(
                      "div",
                      { className: "panel-body" },
                      v.a.createElement(
                        "h4",
                        { className: "text-center text-bold" },
                        "OFFERTE VERZOEKEN"
                      ),
                      v.a.createElement(
                        "h4",
                        { className: "text-center text-bold" },
                        this.state.amountActiveQuotationsRequests
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
      e.a = E;
    }
  }
]);
