(window.webpackJsonp = window.webpackJsonp || []).push([
  [72],
  {
    1525: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        c = n(25),
        i = n.n(c),
        o = n(22),
        l = n.n(o),
        s = n(26),
        u = n.n(s),
        m = n(27),
        p = n.n(m),
        d = n(16),
        f = n.n(d),
        v = n(6),
        h = n.n(v),
        g = n(0),
        E = n.n(g),
        b = n(32),
        y = n(750),
        N = n(690),
        k = n(691),
        R = n(198),
        C = n(731),
        D = n(91);
      function w(e) {
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
          return p()(this, n);
        };
      }
      var T = (function(e) {
          u()(n, e);
          var t = w(n);
          function n(e) {
            var a;
            return (
              r()(this, n), ((a = t.call(this, e)).state = { file: null }), a
            );
          }
          return (
            i()(n, [
              {
                key: "componentDidMount",
                value: function() {
                  this.downloadFile();
                }
              },
              {
                key: "downloadFile",
                value: function() {
                  var e = this,
                    t =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : 0;
                  D.a
                    .downloadPreview(this.props.orderId)
                    .then(function(t) {
                      e.setState({ file: t.data });
                    })
                    .catch(function() {
                      t < 2 &&
                        setTimeout(function() {
                          e.downloadFile(t);
                        }, 500),
                        t++;
                    });
                }
              },
              {
                key: "render",
                value: function() {
                  return Object(R.isEmpty)(this.props.orderDetails) ||
                    !this.state.file
                    ? E.a.createElement("div", null, "Geen gegevens gevonden.")
                    : E.a.createElement(
                        "div",
                        null,
                        E.a.createElement(C.a, {
                          file: this.state.file,
                          scale: this.props.scale
                        })
                      );
                }
              }
            ]),
            n
          );
        })(g.Component),
        O = Object(b.b)(function(e) {
          return { orderDetails: e.orderDetails };
        }, null)(T),
        P = n(4),
        q = n(693),
        z = Object(b.b)(function(e) {
          return { orderDetails: e.orderDetails };
        })(function(e) {
          return E.a.createElement(
            "div",
            { className: "row" },
            E.a.createElement(
              "div",
              { className: "col-md-4" },
              E.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                E.a.createElement(q.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: P.e.goBack
                }),
                E.a.createElement(q.a, {
                  iconName: "glyphicon-zoom-in",
                  onClickAction: e.zoomIn
                }),
                E.a.createElement(q.a, {
                  iconName: "glyphicon-zoom-out",
                  onClickAction: e.zoomOut
                })
              )
            ),
            E.a.createElement(
              "div",
              { className: "col-md-4" },
              E.a.createElement(
                "h4",
                { className: "text-center" },
                "Order: " + (e.orderDetails.number ? e.orderDetails.number : "")
              )
            ),
            E.a.createElement("div", { className: "col-md-4" })
          );
        });
      function M(e) {
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
          return p()(this, n);
        };
      }
      var x = (function(e) {
        u()(n, e);
        var t = M(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            (a = t.call(this, e)),
            h()(l()(a), "zoomIn", function() {
              a.setState({ scale: a.state.scale + 0.2 });
            }),
            h()(l()(a), "zoomOut", function() {
              a.setState({ scale: a.state.scale - 0.2 });
            }),
            (a.state = { scale: 1 }),
            a
          );
        }
        return (
          i()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchOrderDetails(this.props.params.id);
              }
            },
            {
              key: "render",
              value: function() {
                return E.a.createElement(
                  "div",
                  { className: "row" },
                  E.a.createElement(
                    "div",
                    { className: "col-md-12" },
                    E.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      E.a.createElement(
                        N.a,
                        null,
                        E.a.createElement(
                          k.a,
                          { className: "panel-small" },
                          E.a.createElement(z, {
                            zoomIn: this.zoomIn,
                            zoomOut: this.zoomOut
                          })
                        )
                      )
                    ),
                    E.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      E.a.createElement(O, {
                        orderId: this.props.params.id,
                        scale: this.state.scale
                      })
                    )
                  )
                );
              }
            }
          ]),
          n
        );
      })(g.Component);
      t.default = Object(b.b)(null, function(e) {
        return {
          fetchOrderDetails: function(t) {
            e(Object(y.a)(t));
          }
        };
      })(x);
    },
    690: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        c = n(8),
        i = n.n(c),
        o = function(e) {
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
      (o.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (o.propTypes = {
          className: i.a.string,
          onMouseEnter: i.a.func,
          onMouseLeave: i.a.func
        }),
        (t.a = o);
    },
    691: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        c = n(8),
        i = n.n(c),
        o = function(e) {
          var t = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            n
          );
        };
      (o.defaultProps = { className: "" }),
        (o.propTypes = { className: i.a.string }),
        (t.a = o);
    },
    693: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        c = n(8),
        i = n.n(c),
        o = function(e) {
          var t = e.buttonClassName,
            n = e.iconName,
            a = e.onClickAction,
            c = e.title,
            i = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: a,
              disabled: i,
              title: c
            },
            r.a.createElement("span", { className: "glyphicon ".concat(n) })
          );
        };
      (o.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (o.propTypes = {
          buttonClassName: i.a.string,
          iconName: i.a.string.isRequired,
          onClickAction: i.a.func,
          title: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = o);
    },
    731: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        c = n(8),
        i = n.n(c),
        o = n(775),
        l = n.n(o),
        s = function(e) {
          var t = e.page,
            n = (e.pages, e.handlePrevClick);
          return 1 === t
            ? r.a.createElement("div", null)
            : r.a.createElement(
                "h3",
                {
                  style: {
                    cursor: "pointer",
                    display: "inline-block",
                    marginRight: 24,
                    marginTop: 0
                  },
                  onClick: n
                },
                "<"
              );
        };
      s.propTypes = {
        page: i.a.number.isRequired,
        pages: i.a.number.isRequired,
        handlePrevClick: i.a.func.isRequired
      };
      var u = function(e) {
        var t = e.page,
          n = e.pages,
          a = e.handleNextClick;
        return t === n
          ? r.a.createElement("div", null)
          : r.a.createElement(
              "h3",
              {
                style: {
                  cursor: "pointer",
                  display: "inline-block",
                  marginLeft: 24,
                  marginTop: 0
                },
                onClick: a
              },
              ">"
            );
      };
      u.propTypes = {
        page: i.a.number.isRequired,
        pages: i.a.number.isRequired,
        handleNextClick: i.a.func.isRequired
      };
      var m = function(e) {
        var t = e.page,
          n = e.pages;
        return r.a.createElement(
          "h3",
          { style: { display: "inline-block", marginTop: 0 } },
          "Pagina ",
          t,
          " van ",
          n
        );
      };
      m.propTypes = {
        page: i.a.number.isRequired,
        pages: i.a.number.isRequired
      };
      var p = function(e) {
        var t = e.page,
          n = e.pages,
          a = e.handlePrevClick,
          c = e.handleNextClick;
        return r.a.createElement(
          "div",
          { className: "customWrapper" },
          r.a.createElement(s, { page: t, pages: n, handlePrevClick: a }),
          r.a.createElement(m, { page: t, pages: n }),
          r.a.createElement(u, { page: t, pages: n, handleNextClick: c })
        );
      };
      p.propTypes = {
        page: i.a.number.isRequired,
        pages: i.a.number.isRequired,
        handlePrevClick: i.a.func.isRequired,
        handleNextClick: i.a.func.isRequired
      };
      var d = p;
      (l.a.defaultProps = { file: "", scale: 1 }),
        (l.a.propTypes = { file: i.a.string, scale: i.a.number });
      t.a = function(e) {
        var t = e.file,
          n = e.scale;
        return r.a.createElement(
          "div",
          { className: "panel-heading" },
          r.a.createElement(l.a, {
            document: { file: t },
            navigation: d,
            scale: n
          })
        );
      };
    },
    750: function(e, t, n) {
      "use strict";
      n.d(t, "a", function() {
        return a;
      }),
        n.d(t, "b", function() {
          return r;
        });
      var a = function(e) {
          return { type: "FETCH_ORDER_DETAILS", id: e };
        },
        r = function(e, t) {
          return { type: "UPDATE_ORDER", order: e, switchToView: t };
        };
    },
    779: function(e, t) {},
    780: function(e, t) {},
    781: function(e, t) {},
    782: function(e, t) {},
    783: function(e, t) {}
  }
]);
