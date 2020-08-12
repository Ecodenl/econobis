(window.webpackJsonp = window.webpackJsonp || []).push([
  [114],
  {
    1494: function(t, e, a) {
      "use strict";
      a.r(e);
      var n = a(24),
        r = a.n(n),
        o = a(25),
        c = a.n(o),
        i = a(26),
        u = a.n(i),
        s = a(27),
        l = a.n(s),
        f = a(16),
        d = a.n(f),
        m = a(0),
        p = a.n(m),
        h = a(789),
        v = a(790),
        b = a(690),
        g = a(691),
        y = a(203),
        E = a(924);
      function D(t) {
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
          var a,
            n = d()(t);
          if (e) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return l()(this, a);
        };
      }
      var R = (function(t) {
        u()(a, t);
        var e = D(a);
        function a(t) {
          var n;
          return (
            r()(this, a),
            ((n = e.call(this, t)).state = {
              chartData: [],
              amountOfDataPoints: [],
              code: ""
            }),
            n
          );
        }
        return (
          c()(a, [
            {
              key: "componentDidMount",
              value: function() {
                var t = this;
                y.a.getChartData(this.props.id).then(function(e) {
                  for (var a = 0, n = 0; n < e.data.length; n++)
                    a += parseInt(e.data[n].count);
                  t.setState({
                    chartData: e.data,
                    amountOfDataPoints: a,
                    code: e.code
                  });
                });
              }
            },
            {
              key: "renderChartsData",
              value: function() {
                var t = [],
                  e = this.state.chartData,
                  a = void 0 === e ? [] : e,
                  n = a.map(function(t) {
                    return t.name;
                  }),
                  r = a.map(function(t) {
                    return t.count;
                  });
                return (
                  (t.data = {
                    labels: n,
                    datasets: [
                      {
                        data: r,
                        backgroundColor: [
                          "rgba(48, 129, 95, 0.8)",
                          "rgba(39, 174, 96, 0.8)",
                          "rgba(41, 128, 185, 0.8)",
                          "rgba(142, 68, 173, 0.8)",
                          "rgba(203, 185, 86, 0.8)",
                          "rgba(230, 74, 74, 0.8)"
                        ],
                        hoverBackgroundColor: [
                          "rgba(48, 129, 95,1)",
                          "rgba(39, 174, 96, 1)",
                          "rgba(41, 128, 185, 1)",
                          "rgba(142, 68, 173, 1)",
                          "rgba(203, 185, 86,  1)",
                          "rgba(230, 74, 74, 1)"
                        ]
                      }
                    ]
                  }),
                  (t.options = {
                    legend: { display: !0, position: "right" },
                    maintainAspectRatio: !1,
                    responsive: !0,
                    tooltips: {
                      mode: "label",
                      callbacks: {
                        label: function(t, e) {
                          var a = e.datasets[t.datasetIndex],
                            n = a._meta[Object.keys(a._meta)[0]].total,
                            r = a.data[t.index];
                          return (
                            r +
                            " (" +
                            parseFloat(((r / n) * 100).toFixed(1)) +
                            "%)"
                          );
                        },
                        title: function(t, e) {
                          return e.labels[t[0].index];
                        }
                      }
                    },
                    tooltipTemplate:
                      "'<%=label%>: <%= numeral(value).format('($00[.]00)') %> - <%= numeral(circumference / 6.283).format('(0[.][00]%)') %>'"
                  }),
                  t
                );
              }
            },
            {
              key: "render",
              value: function() {
                var t = this.renderChartsData(),
                  e = t.data,
                  a = t.options,
                  n = this.state.amountOfDataPoints;
                return p.a.createElement(
                  "div",
                  null,
                  p.a.createElement(
                    "h4",
                    null,
                    "Deelnemers status in project ",
                    this.state.code
                  ),
                  p.a.createElement(
                    "div",
                    null,
                    0 === n
                      ? p.a.createElement(
                          "span",
                          null,
                          "Geen deelnemers gevonden."
                        )
                      : p.a.createElement(E.Pie, {
                          data: e,
                          options: a,
                          width: 250,
                          height: 250
                        })
                  )
                );
              }
            }
          ]),
          a
        );
      })(m.Component);
      function k(t) {
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
          var a,
            n = d()(t);
          if (e) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return l()(this, a);
        };
      }
      var x = (function(t) {
        u()(a, t);
        var e = k(a);
        function a(t) {
          var n;
          return (
            r()(this, a),
            ((n = e.call(this, t)).state = {
              chartData: [],
              amountOfDataPoints: [],
              code: ""
            }),
            n
          );
        }
        return (
          c()(a, [
            {
              key: "componentDidMount",
              value: function() {
                var t = this;
                y.a.getChartContactStatusData(this.props.id).then(function(e) {
                  for (var a = 0, n = 0; n < e.data.length; n++)
                    a += parseInt(e.data[n].count);
                  t.setState({
                    chartData: e.data,
                    amountOfDataPoints: a,
                    code: e.code
                  });
                });
              }
            },
            {
              key: "renderChartsData",
              value: function() {
                var t = [],
                  e = this.state.chartData,
                  a = void 0 === e ? [] : e,
                  n = a.map(function(t) {
                    return t.name;
                  }),
                  r = a.map(function(t) {
                    return t.count;
                  });
                return (
                  (t.data = {
                    labels: n,
                    datasets: [
                      {
                        data: r,
                        backgroundColor: [
                          "rgba(48, 129, 95, 0.8)",
                          "rgba(39, 174, 96, 0.8)",
                          "rgba(41, 128, 185, 0.8)",
                          "rgba(142, 68, 173, 0.8)",
                          "rgba(203, 185, 86, 0.8)",
                          "rgba(230, 74, 74, 0.8)"
                        ],
                        hoverBackgroundColor: [
                          "rgba(48, 129, 95,1)",
                          "rgba(39, 174, 96, 1)",
                          "rgba(41, 128, 185, 1)",
                          "rgba(142, 68, 173, 1)",
                          "rgba(203, 185, 86,  1)",
                          "rgba(230, 74, 74, 1)"
                        ]
                      }
                    ]
                  }),
                  (t.options = {
                    legend: { display: !0, position: "right" },
                    maintainAspectRatio: !1,
                    responsive: !0,
                    tooltips: {
                      mode: "label",
                      callbacks: {
                        label: function(t, e) {
                          var a = e.datasets[t.datasetIndex],
                            n = a._meta[Object.keys(a._meta)[0]].total,
                            r = a.data[t.index];
                          return (
                            r +
                            " (" +
                            parseFloat(((r / n) * 100).toFixed(1)) +
                            "%)"
                          );
                        },
                        title: function(t, e) {
                          return e.labels[t[0].index];
                        }
                      }
                    },
                    tooltipTemplate:
                      "'<%=label%>: <%= numeral(value).format('($00[.]00)') %> - <%= numeral(circumference / 6.283).format('(0[.][00]%)') %>'"
                  }),
                  t
                );
              }
            },
            {
              key: "render",
              value: function() {
                var t = this.renderChartsData(),
                  e = t.data,
                  a = t.options,
                  n = this.state.amountOfDataPoints;
                return p.a.createElement(
                  "div",
                  null,
                  p.a.createElement(
                    "h4",
                    null,
                    "Deelnemers contact status in project ",
                    this.state.code
                  ),
                  p.a.createElement(
                    "div",
                    null,
                    0 === n
                      ? p.a.createElement(
                          "span",
                          null,
                          "Geen contacten gevonden."
                        )
                      : p.a.createElement(E.Pie, {
                          data: e,
                          options: a,
                          width: 250,
                          height: 250
                        })
                  )
                );
              }
            }
          ]),
          a
        );
      })(m.Component);
      function P(t) {
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
          var a,
            n = d()(t);
          if (e) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return l()(this, a);
        };
      }
      var C = (function(t) {
        u()(a, t);
        var e = P(a);
        function a(t) {
          var n;
          return (
            r()(this, a),
            ((n = e.call(this, t)).state = {
              chartData: [],
              amountOfDataPoints: [],
              code: ""
            }),
            n
          );
        }
        return (
          c()(a, [
            {
              key: "componentDidMount",
              value: function() {
                var t = this;
                y.a.getChartParticipationsData(this.props.id).then(function(e) {
                  for (var a = 0, n = 0; n < e.data.length; n++)
                    a += parseInt(e.data[n].count);
                  t.setState({
                    chartData: e.data,
                    amountOfDataPoints: a,
                    code: e.code
                  });
                });
              }
            },
            {
              key: "renderChartsData",
              value: function() {
                var t = [],
                  e = this.state.chartData,
                  a = void 0 === e ? [] : e,
                  n = a.map(function(t) {
                    return t.name;
                  }),
                  r = a.map(function(t) {
                    return t.count;
                  });
                return (
                  (t.data = {
                    labels: n,
                    datasets: [
                      {
                        data: r,
                        backgroundColor: [
                          "rgba(48, 129, 95, 0.8)",
                          "rgba(39, 174, 96, 0.8)",
                          "rgba(41, 128, 185, 0.8)",
                          "rgba(142, 68, 173, 0.8)",
                          "rgba(203, 185, 86, 0.8)",
                          "rgba(230, 74, 74, 0.8)"
                        ],
                        hoverBackgroundColor: [
                          "rgba(48, 129, 95,1)",
                          "rgba(39, 174, 96, 1)",
                          "rgba(41, 128, 185, 1)",
                          "rgba(142, 68, 173, 1)",
                          "rgba(203, 185, 86,  1)",
                          "rgba(230, 74, 74, 1)"
                        ]
                      }
                    ]
                  }),
                  (t.options = {
                    legend: { display: !0, position: "right" },
                    maintainAspectRatio: !1,
                    responsive: !0,
                    tooltips: {
                      mode: "label",
                      callbacks: {
                        label: function(t, e) {
                          var a = e.datasets[t.datasetIndex],
                            n = a._meta[Object.keys(a._meta)[0]].total,
                            r = a.data[t.index];
                          return (
                            r +
                            " (" +
                            parseFloat(((r / n) * 100).toFixed(1)) +
                            "%)"
                          );
                        },
                        title: function(t, e) {
                          return e.labels[t[0].index];
                        }
                      }
                    },
                    tooltipTemplate:
                      "'<%=label%>: <%= numeral(value).format('($00[.]00)') %> - <%= numeral(circumference / 6.283).format('(0[.][00]%)') %>'"
                  }),
                  t
                );
              }
            },
            {
              key: "render",
              value: function() {
                var t = this.renderChartsData(),
                  e = t.data,
                  a = t.options,
                  n = this.state.amountOfDataPoints;
                return p.a.createElement(
                  "div",
                  null,
                  p.a.createElement(
                    "h4",
                    null,
                    "Deelnames status in project ",
                    this.state.code
                  ),
                  p.a.createElement(
                    "div",
                    null,
                    0 === n
                      ? p.a.createElement(
                          "span",
                          null,
                          "Geen deelnames gevonden."
                        )
                      : p.a.createElement(E.Pie, {
                          data: e,
                          options: a,
                          width: 250,
                          height: 250
                        })
                  )
                );
              }
            }
          ]),
          a
        );
      })(m.Component);
      function N(t) {
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
          var a,
            n = d()(t);
          if (e) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return l()(this, a);
        };
      }
      var O = (function(t) {
        u()(a, t);
        var e = N(a);
        function a(t) {
          var n;
          return (
            r()(this, a),
            ((n = e.call(this, t)).state = { activeProjectsIds: [] }),
            n
          );
        }
        return (
          c()(a, [
            {
              key: "componentWillMount",
              value: function() {
                var t = this;
                y.a.getActive().then(function(e) {
                  t.setState({ activeProjectsIds: e });
                });
              }
            },
            {
              key: "render",
              value: function() {
                var t = this.state.activeProjectsIds;
                return p.a.createElement(
                  "div",
                  { className: "row" },
                  t.map(function(t) {
                    return p.a.createElement(
                      "div",
                      null,
                      p.a.createElement(
                        "div",
                        { className: "col-md-4" },
                        p.a.createElement(
                          b.a,
                          null,
                          p.a.createElement(
                            g.a,
                            null,
                            p.a.createElement(R, { id: t })
                          )
                        )
                      ),
                      p.a.createElement(
                        "div",
                        { className: "col-md-4" },
                        p.a.createElement(
                          b.a,
                          null,
                          p.a.createElement(
                            g.a,
                            null,
                            p.a.createElement(C, { id: t })
                          )
                        )
                      ),
                      p.a.createElement(
                        "div",
                        { className: "col-md-4" },
                        p.a.createElement(
                          b.a,
                          null,
                          p.a.createElement(
                            g.a,
                            null,
                            p.a.createElement(x, { id: t })
                          )
                        )
                      )
                    );
                  })
                );
              }
            }
          ]),
          a
        );
      })(m.Component);
      function M(t) {
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
          var a,
            n = d()(t);
          if (e) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return l()(this, a);
        };
      }
      var S = (function(t) {
        u()(a, t);
        var e = M(a);
        function a(t) {
          return r()(this, a), e.call(this, t);
        }
        return (
          c()(a, [
            {
              key: "render",
              value: function() {
                return p.a.createElement(
                  "div",
                  null,
                  p.a.createElement(
                    "div",
                    { className: "row" },
                    p.a.createElement(h.a, { size: "col-xs-2" }),
                    p.a.createElement(v.a, { size: "col-xs-2" })
                  ),
                  p.a.createElement(O, null)
                );
              }
            }
          ]),
          a
        );
      })(m.Component);
      e.default = S;
    },
    690: function(t, e, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        c = a.n(o),
        i = function(t) {
          var e = t.children,
            a = t.className,
            n = t.onMouseEnter,
            o = t.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: o
            },
            e
          );
        };
      (i.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (i.propTypes = {
          className: c.a.string,
          onMouseEnter: c.a.func,
          onMouseLeave: c.a.func
        }),
        (e.a = i);
    },
    691: function(t, e, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        c = a.n(o),
        i = function(t) {
          var e = t.className,
            a = t.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(e) },
            a
          );
        };
      (i.defaultProps = { className: "" }),
        (i.propTypes = { className: c.a.string }),
        (e.a = i);
    },
    789: function(t, e, a) {
      "use strict";
      var n = a(24),
        r = a.n(n),
        o = a(25),
        c = a.n(o),
        i = a(26),
        u = a.n(i),
        s = a(27),
        l = a.n(s),
        f = a(16),
        d = a.n(f),
        m = a(0),
        p = a.n(m),
        h = a(4),
        v = a(148);
      function b(t) {
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
          var a,
            n = d()(t);
          if (e) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return l()(this, a);
        };
      }
      var g = (function(t) {
        u()(a, t);
        var e = b(a);
        function a(t) {
          var n;
          return (
            r()(this, a),
            ((n = e.call(this, t)).state = { amountOpenEmails: "-" }),
            n
          );
        }
        return (
          c()(a, [
            {
              key: "componentWillMount",
              value: function() {
                var t = this;
                v.a.getAmountOpen().then(function(e) {
                  t.setState({ amountOpenEmails: e });
                });
              }
            },
            {
              key: "render",
              value: function() {
                return p.a.createElement(
                  "div",
                  {
                    className: this.props.size,
                    onClick: function() {
                      return h.f.push("/emails/inbox/eigen");
                    }
                  },
                  p.a.createElement(
                    "div",
                    {
                      className: "panel panel-default",
                      id: "dashboardbutton-1"
                    },
                    p.a.createElement(
                      "div",
                      { className: "panel-body" },
                      p.a.createElement(
                        "h4",
                        { className: "text-center text-bold" },
                        "E-MAIL"
                      ),
                      p.a.createElement(
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
          a
        );
      })(m.Component);
      e.a = g;
    },
    790: function(t, e, a) {
      "use strict";
      var n = a(24),
        r = a.n(n),
        o = a(25),
        c = a.n(o),
        i = a(26),
        u = a.n(i),
        s = a(27),
        l = a.n(s),
        f = a(16),
        d = a.n(f),
        m = a(0),
        p = a.n(m),
        h = a(4),
        v = a(107);
      function b(t) {
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
          var a,
            n = d()(t);
          if (e) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return l()(this, a);
        };
      }
      var g = (function(t) {
        u()(a, t);
        var e = b(a);
        function a(t) {
          var n;
          return (
            r()(this, a),
            ((n = e.call(this, t)).state = { amountActiveTasks: "-" }),
            n
          );
        }
        return (
          c()(a, [
            {
              key: "componentWillMount",
              value: function() {
                var t = this;
                v.a.getAmountActive().then(function(e) {
                  t.setState({ amountActiveTasks: e });
                });
              }
            },
            {
              key: "render",
              value: function() {
                return p.a.createElement(
                  "div",
                  {
                    className: this.props.size,
                    onClick: function() {
                      return h.f.push("/taken/eigen");
                    }
                  },
                  p.a.createElement(
                    "div",
                    {
                      className: "panel panel-default",
                      id: "dashboardbutton-4"
                    },
                    p.a.createElement(
                      "div",
                      { className: "panel-body" },
                      p.a.createElement(
                        "h4",
                        { className: "text-center text-bold" },
                        "OPEN TAKEN"
                      ),
                      p.a.createElement(
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
          a
        );
      })(m.Component);
      e.a = g;
    }
  }
]);
