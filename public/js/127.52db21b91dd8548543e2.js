(window.webpackJsonp = window.webpackJsonp || []).push([
  [127],
  {
    1487: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        l = n(25),
        c = n.n(l),
        i = n(22),
        o = n.n(i),
        s = n(26),
        u = n.n(s),
        m = n(27),
        p = n.n(m),
        f = n(16),
        h = n.n(f),
        d = n(6),
        E = n.n(d),
        v = n(0),
        y = n.n(v),
        g = n(32),
        b = n(199),
        w = n.n(b),
        R = n(146),
        N = n(147),
        T = n(200),
        k = n(101),
        C = n(4);
      function D(e) {
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
            a = h()(e);
          if (t) {
            var r = h()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var A = (function(e) {
        u()(n, e);
        var t = D(n);
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
          c()(n, [
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
                C.f.push("/email-template/".concat(e));
              }
            },
            {
              key: "render",
              value: function() {
                var e = this,
                  t = this.props,
                  n = t.id,
                  a = t.name,
                  r = t.subject,
                  l = t.createdBy;
                return y.a.createElement(
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
                  y.a.createElement("td", null, a),
                  y.a.createElement("td", null, r),
                  y.a.createElement("td", null, l ? l.fullName : ""),
                  y.a.createElement(
                    "td",
                    null,
                    this.state.showActionButtons
                      ? y.a.createElement(
                          "a",
                          {
                            role: "button",
                            onClick: function() {
                              return e.openItem(n);
                            }
                          },
                          y.a.createElement("span", {
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
      })(v.Component);
      function L(e) {
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
            a = h()(e);
          if (t) {
            var r = h()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var S = (function(e) {
          u()(n, e);
          var t = L(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              ((a = t.call(this, e)).state = {
                showDeleteItem: !1,
                deleteItem: { id: "", name: "" }
              }),
              a
            );
          }
          return (
            c()(n, [
              {
                key: "render",
                value: function() {
                  var e = "",
                    t = !0;
                  return (
                    this.props.hasError
                      ? (e = "Fout bij het ophalen van e-mailtemplates.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : 0 === this.props.emailTemplates.length
                      ? (e = "Geen e-mailtemplates gevonden!")
                      : (t = !1),
                    y.a.createElement(
                      "div",
                      null,
                      y.a.createElement(
                        R.a,
                        null,
                        y.a.createElement(
                          N.a,
                          null,
                          y.a.createElement(
                            "tr",
                            { className: "thead-title" },
                            y.a.createElement(k.a, {
                              title: "Naam",
                              width: "30%"
                            }),
                            y.a.createElement(k.a, {
                              title: "Onderwerp",
                              width: "30%"
                            }),
                            y.a.createElement(k.a, {
                              title: "Gemaakt door",
                              width: "35%"
                            }),
                            y.a.createElement(k.a, { title: "", width: "5%" })
                          )
                        ),
                        y.a.createElement(
                          T.a,
                          null,
                          t
                            ? y.a.createElement(
                                "tr",
                                null,
                                y.a.createElement("td", { colSpan: 4 }, e)
                              )
                            : this.props.emailTemplates.map(function(e) {
                                return y.a.createElement(
                                  A,
                                  w()({ key: e.id }, e)
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
        })(v.Component),
        I = Object(g.b)(function(e) {
          return {
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        })(S),
        M = n(693),
        P = function(e) {
          return y.a.createElement(
            "div",
            { className: "row" },
            y.a.createElement(
              "div",
              { className: "col-md-4" },
              y.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                y.a.createElement(M.a, {
                  iconName: "glyphicon-refresh",
                  onClickAction: e.refreshEmailTemplatesData
                }),
                y.a.createElement(M.a, {
                  iconName: "glyphicon-plus",
                  onClickAction: function() {
                    C.f.push("/email-template/nieuw");
                  }
                })
              )
            ),
            y.a.createElement(
              "div",
              { className: "col-md-4" },
              y.a.createElement(
                "h3",
                { className: "text-center table-title" },
                "E-mail templates"
              )
            ),
            y.a.createElement("div", { className: "col-md-4" })
          );
        };
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
            a = h()(e);
          if (t) {
            var r = h()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var j = (function(e) {
        u()(n, e);
        var t = B(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            (a = t.call(this, e)),
            E()(o()(a), "refreshEmailTemplatesData", function() {
              a.props.clearEmailTemplates(), a.props.fetchEmailTemplates();
            }),
            a
          );
        }
        return (
          c()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchEmailTemplates();
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearEmailTemplates();
              }
            },
            {
              key: "render",
              value: function() {
                var e = this;
                return y.a.createElement(
                  "div",
                  null,
                  y.a.createElement(
                    "div",
                    { className: "panel panel-default" },
                    y.a.createElement(
                      "div",
                      { className: "panel-body" },
                      y.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        y.a.createElement(P, {
                          refreshEmailTemplatesData: function() {
                            return e.refreshEmailTemplatesData();
                          }
                        })
                      ),
                      y.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        y.a.createElement(I, {
                          emailTemplates: this.props.emailTemplates
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
      })(v.Component);
      t.default = Object(g.b)(
        function(e) {
          return { emailTemplates: e.emailTemplates };
        },
        function(e) {
          return {
            fetchEmailTemplates: function() {
              e({ type: "FETCH_EMAIL_TEMPLATES" });
            },
            clearEmailTemplates: function() {
              e({ type: "CLEAR_EMAIL_TEMPLATES" });
            }
          };
        }
      )(j);
    },
    693: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        l = n(8),
        c = n.n(l),
        i = function(e) {
          var t = e.buttonClassName,
            n = e.iconName,
            a = e.onClickAction,
            l = e.title,
            c = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: a,
              disabled: c,
              title: l
            },
            r.a.createElement("span", { className: "glyphicon ".concat(n) })
          );
        };
      (i.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (i.propTypes = {
          buttonClassName: c.a.string,
          iconName: c.a.string.isRequired,
          onClickAction: c.a.func,
          title: c.a.string,
          disabled: c.a.bool
        }),
        (t.a = i);
    }
  }
]);
