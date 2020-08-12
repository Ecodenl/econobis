(window.webpackJsonp = window.webpackJsonp || []).push([
  [128],
  {
    1490: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        c = n(25),
        o = n.n(c),
        l = n(26),
        i = n.n(l),
        s = n(27),
        u = n.n(s),
        m = n(16),
        f = n.n(m),
        h = n(0),
        p = n.n(h),
        d = n(32),
        E = n(4),
        v = n(693),
        g = function() {
          return p.a.createElement(
            "div",
            { className: "row" },
            p.a.createElement(
              "div",
              { className: "col-md-4" },
              p.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                p.a.createElement(v.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: E.e.goBack
                })
              )
            ),
            p.a.createElement(
              "div",
              { className: "col-md-4" },
              p.a.createElement(
                "h3",
                { className: "text-center table-title" },
                "Maatregelen"
              )
            ),
            p.a.createElement("div", { className: "col-md-4" })
          );
        },
        y = n(199),
        b = n.n(y),
        R = n(146),
        w = n(147),
        N = n(200),
        k = n(101);
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
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var M = (function(e) {
          i()(n, e);
          var t = C(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              ((a = t.call(this, e)).state = {
                showActionButtons: !1,
                highlightRow: ""
              }),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "onRowEnter",
                value: function() {
                  this.setState({
                    showActionButtons: !0,
                    highlightRow: "highlight-row"
                  });
                }
              },
              {
                key: "onRowLeave",
                value: function() {
                  this.setState({ showActionButtons: !1, highlightRow: "" });
                }
              },
              {
                key: "openItem",
                value: function(e) {
                  E.f.push("maatregel/".concat(e));
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props,
                    n = t.id,
                    a = t.number,
                    r = t.measureCategory,
                    c = t.name;
                  return p.a.createElement(
                    "tr",
                    {
                      className: this.state.highlightRow,
                      onDoubleClick: function() {
                        return e.openItem(n);
                      },
                      onMouseEnter: function() {
                        return e.onRowEnter();
                      },
                      onMouseLeave: function() {
                        return e.onRowLeave();
                      }
                    },
                    p.a.createElement("td", null, a),
                    p.a.createElement("td", null, r && r.name),
                    p.a.createElement("td", null, c),
                    p.a.createElement(
                      "td",
                      null,
                      this.state.showActionButtons
                        ? p.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.openItem(n);
                              }
                            },
                            p.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-pencil mybtn-success"
                            }),
                            " "
                          )
                        : ""
                    )
                  );
                }
              }
            ]),
            n
          );
        })(h.Component),
        D = Object(d.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(M);
      function A(e) {
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
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var S = (function(e) {
          i()(n, e);
          var t = A(n);
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
                      ? (e = "Fout bij het ophalen van maatregelen.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : 0 === this.props.measures.length
                      ? (e = "Geen maatregelen gevonden!")
                      : (t = !1),
                    p.a.createElement(
                      "div",
                      null,
                      p.a.createElement(
                        R.a,
                        null,
                        p.a.createElement(
                          w.a,
                          null,
                          p.a.createElement(
                            "tr",
                            { className: "thead-title-quaternary" },
                            p.a.createElement(k.a, {
                              title: "Nummer",
                              width: "20%"
                            }),
                            p.a.createElement(k.a, {
                              title: "Maatregel categorie",
                              width: "37%"
                            }),
                            p.a.createElement(k.a, {
                              title: "Maatregel",
                              width: "37%"
                            }),
                            p.a.createElement(k.a, { title: "", width: "6%" })
                          )
                        ),
                        p.a.createElement(
                          N.a,
                          null,
                          t
                            ? p.a.createElement(
                                "tr",
                                null,
                                p.a.createElement("td", { colSpan: 4 }, e)
                              )
                            : this.props.measures.map(function(e) {
                                return p.a.createElement(
                                  D,
                                  b()({ key: e.id }, e)
                                );
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
        })(h.Component),
        L = Object(d.b)(function(e) {
          return {
            measures: e.measures,
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        }, null)(S);
      function B(e) {
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
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var j = (function(e) {
        i()(n, e);
        var t = B(n);
        function n(e) {
          return r()(this, n), t.call(this, e);
        }
        return (
          o()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchMeasures();
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearMeasures();
              }
            },
            {
              key: "render",
              value: function() {
                return p.a.createElement(
                  "div",
                  null,
                  p.a.createElement(
                    "div",
                    { className: "panel panel-default" },
                    p.a.createElement(
                      "div",
                      { className: "panel-body" },
                      p.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        p.a.createElement(g, null)
                      ),
                      p.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        p.a.createElement(L, null)
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
      t.default = Object(d.b)(null, function(e) {
        return {
          fetchMeasures: function() {
            e({ type: "FETCH_MEASURES" });
          },
          clearMeasures: function() {
            e({ type: "CLEAR_MEASURES" });
          }
        };
      })(j);
    },
    693: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        c = n(8),
        o = n.n(c),
        l = function(e) {
          var t = e.buttonClassName,
            n = e.iconName,
            a = e.onClickAction,
            c = e.title,
            o = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: a,
              disabled: o,
              title: c
            },
            r.a.createElement("span", { className: "glyphicon ".concat(n) })
          );
        };
      (l.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (l.propTypes = {
          buttonClassName: o.a.string,
          iconName: o.a.string.isRequired,
          onClickAction: o.a.func,
          title: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = l);
    }
  }
]);
