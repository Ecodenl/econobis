(window.webpackJsonp = window.webpackJsonp || []).push([
  [64],
  {
    1523: function(e, n, t) {
      "use strict";
      t.r(n);
      var a = t(24),
        i = t.n(a),
        o = t(25),
        c = t.n(o),
        r = t(22),
        l = t.n(r),
        s = t(26),
        u = t.n(s),
        d = t(27),
        m = t.n(d),
        p = t(16),
        f = t.n(p),
        v = t(6),
        h = t.n(v),
        g = t(0),
        b = t.n(g),
        E = t(32),
        y = t(729),
        w = t(690),
        N = t(691),
        k = t(4),
        R = t(693),
        C = Object(E.b)(function(e) {
          return { invoiceDetails: e.invoiceDetails };
        }, null)(function(e) {
          var n = e.invoiceDetails.document,
            t = void 0 === n ? {} : n;
          return b.a.createElement(
            "div",
            { className: "row" },
            b.a.createElement(
              "div",
              { className: "col-md-4" },
              b.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                b.a.createElement(R.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: k.e.goBack
                }),
                b.a.createElement(R.a, {
                  iconName: "glyphicon-download-alt",
                  onClickAction: e.download
                }),
                b.a.createElement(R.a, {
                  iconName: "glyphicon-zoom-in",
                  onClickAction: e.zoomIn
                }),
                b.a.createElement(R.a, {
                  iconName: "glyphicon-zoom-out",
                  onClickAction: e.zoomOut
                })
              )
            ),
            b.a.createElement(
              "div",
              { className: "col-md-4" },
              b.a.createElement(
                "h4",
                { className: "text-center" },
                "Nota: " + (t ? t.name : "Preview")
              )
            ),
            b.a.createElement("div", { className: "col-md-4" })
          );
        }),
        D = t(198),
        L = t(731),
        T = t(90);
      function O(e) {
        var n = (function() {
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
          var t,
            a = f()(e);
          if (n) {
            var i = f()(this).constructor;
            t = Reflect.construct(a, arguments, i);
          } else t = a.apply(this, arguments);
          return m()(this, t);
        };
      }
      var q = (function(e) {
          u()(t, e);
          var n = O(t);
          function t(e) {
            var a;
            return (
              i()(this, t), ((a = n.call(this, e)).state = { file: null }), a
            );
          }
          return (
            c()(t, [
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
                    n =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : 0;
                  T.a
                    .download(this.props.invoiceId)
                    .then(function(n) {
                      e.setState({ file: n.data });
                    })
                    .catch(function() {
                      n < 2 &&
                        setTimeout(function() {
                          e.downloadFile(n);
                        }, 500),
                        n++;
                    });
                }
              },
              {
                key: "render",
                value: function() {
                  return Object(D.isEmpty)(this.props.invoiceDetails) ||
                    !this.state.file
                    ? b.a.createElement("div", null, "Geen gegevens gevonden.")
                    : b.a.createElement(
                        "div",
                        null,
                        b.a.createElement(L.a, {
                          file: this.state.file,
                          scale: this.props.scale
                        })
                      );
                }
              }
            ]),
            t
          );
        })(g.Component),
        I = Object(E.b)(function(e) {
          return { invoiceDetails: e.invoiceDetails };
        }, null)(q),
        P = t(711),
        x = t.n(P);
      function z(e) {
        var n = (function() {
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
          var t,
            a = f()(e);
          if (n) {
            var i = f()(this).constructor;
            t = Reflect.construct(a, arguments, i);
          } else t = a.apply(this, arguments);
          return m()(this, t);
        };
      }
      var M = (function(e) {
        u()(t, e);
        var n = z(t);
        function t(e) {
          var a;
          return (
            i()(this, t),
            (a = n.call(this, e)),
            h()(l()(a), "zoomIn", function() {
              a.setState({ scale: a.state.scale + 0.2 });
            }),
            h()(l()(a), "zoomOut", function() {
              a.setState({ scale: a.state.scale - 0.2 });
            }),
            (a.state = { scale: 1 }),
            (a.download = a.download.bind(l()(a))),
            a
          );
        }
        return (
          c()(t, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchInvoiceDetails(this.props.params.id);
              }
            },
            {
              key: "download",
              value: function() {
                T.a.download(this.props.invoiceDetails.id).then(function(e) {
                  x()(e.data, e.headers["x-filename"]);
                });
              }
            },
            {
              key: "render",
              value: function() {
                return b.a.createElement(
                  "div",
                  { className: "row" },
                  b.a.createElement(
                    "div",
                    { className: "col-md-12" },
                    b.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      b.a.createElement(
                        w.a,
                        null,
                        b.a.createElement(
                          N.a,
                          { className: "panel-small" },
                          b.a.createElement(C, {
                            zoomIn: this.zoomIn,
                            zoomOut: this.zoomOut,
                            download: this.download
                          })
                        )
                      )
                    ),
                    b.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      b.a.createElement(I, {
                        invoiceId: this.props.params.id,
                        scale: this.state.scale
                      })
                    )
                  )
                );
              }
            }
          ]),
          t
        );
      })(g.Component);
      n.default = Object(E.b)(
        function(e) {
          return { invoiceDetails: e.invoiceDetails };
        },
        function(e) {
          return {
            fetchInvoiceDetails: function(n) {
              e(Object(y.b)(n));
            }
          };
        }
      )(M);
    },
    690: function(e, n, t) {
      "use strict";
      var a = t(0),
        i = t.n(a),
        o = t(8),
        c = t.n(o),
        r = function(e) {
          var n = e.children,
            t = e.className,
            a = e.onMouseEnter,
            o = e.onMouseLeave;
          return i.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(t),
              onMouseEnter: a,
              onMouseLeave: o
            },
            n
          );
        };
      (r.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (r.propTypes = {
          className: c.a.string,
          onMouseEnter: c.a.func,
          onMouseLeave: c.a.func
        }),
        (n.a = r);
    },
    691: function(e, n, t) {
      "use strict";
      var a = t(0),
        i = t.n(a),
        o = t(8),
        c = t.n(o),
        r = function(e) {
          var n = e.className,
            t = e.children;
          return i.a.createElement(
            "div",
            { className: "panel-body ".concat(n) },
            t
          );
        };
      (r.defaultProps = { className: "" }),
        (r.propTypes = { className: c.a.string }),
        (n.a = r);
    },
    693: function(e, n, t) {
      "use strict";
      var a = t(0),
        i = t.n(a),
        o = t(8),
        c = t.n(o),
        r = function(e) {
          var n = e.buttonClassName,
            t = e.iconName,
            a = e.onClickAction,
            o = e.title,
            c = e.disabled;
          return i.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(n),
              onClick: a,
              disabled: c,
              title: o
            },
            i.a.createElement("span", { className: "glyphicon ".concat(t) })
          );
        };
      (r.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (r.propTypes = {
          buttonClassName: c.a.string,
          iconName: c.a.string.isRequired,
          onClickAction: c.a.func,
          title: c.a.string,
          disabled: c.a.bool
        }),
        (n.a = r);
    },
    711: function(e, n) {
      e.exports = function(e, n, t, a) {
        var i = new Blob(void 0 !== a ? [a, e] : [e], {
          type: t || "application/octet-stream"
        });
        if (void 0 !== window.navigator.msSaveBlob)
          window.navigator.msSaveBlob(i, n);
        else {
          var o =
              window.URL && window.URL.createObjectURL
                ? window.URL.createObjectURL(i)
                : window.webkitURL.createObjectURL(i),
            c = document.createElement("a");
          (c.style.display = "none"),
            (c.href = o),
            c.setAttribute("download", n),
            void 0 === c.download && c.setAttribute("target", "_blank"),
            document.body.appendChild(c),
            c.click(),
            setTimeout(function() {
              document.body.removeChild(c), window.URL.revokeObjectURL(o);
            }, 200);
        }
      };
    },
    729: function(e, n, t) {
      "use strict";
      t.d(n, "b", function() {
        return a;
      }),
        t.d(n, "a", function() {
          return i;
        });
      var a = function(e) {
          return { type: "FETCH_INVOICE_DETAILS", id: e };
        },
        i = function(e) {
          return { type: "DELETE_INVOICE", id: e };
        };
    },
    731: function(e, n, t) {
      "use strict";
      var a = t(0),
        i = t.n(a),
        o = t(8),
        c = t.n(o),
        r = t(775),
        l = t.n(r),
        s = function(e) {
          var n = e.page,
            t = (e.pages, e.handlePrevClick);
          return 1 === n
            ? i.a.createElement("div", null)
            : i.a.createElement(
                "h3",
                {
                  style: {
                    cursor: "pointer",
                    display: "inline-block",
                    marginRight: 24,
                    marginTop: 0
                  },
                  onClick: t
                },
                "<"
              );
        };
      s.propTypes = {
        page: c.a.number.isRequired,
        pages: c.a.number.isRequired,
        handlePrevClick: c.a.func.isRequired
      };
      var u = function(e) {
        var n = e.page,
          t = e.pages,
          a = e.handleNextClick;
        return n === t
          ? i.a.createElement("div", null)
          : i.a.createElement(
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
        page: c.a.number.isRequired,
        pages: c.a.number.isRequired,
        handleNextClick: c.a.func.isRequired
      };
      var d = function(e) {
        var n = e.page,
          t = e.pages;
        return i.a.createElement(
          "h3",
          { style: { display: "inline-block", marginTop: 0 } },
          "Pagina ",
          n,
          " van ",
          t
        );
      };
      d.propTypes = {
        page: c.a.number.isRequired,
        pages: c.a.number.isRequired
      };
      var m = function(e) {
        var n = e.page,
          t = e.pages,
          a = e.handlePrevClick,
          o = e.handleNextClick;
        return i.a.createElement(
          "div",
          { className: "customWrapper" },
          i.a.createElement(s, { page: n, pages: t, handlePrevClick: a }),
          i.a.createElement(d, { page: n, pages: t }),
          i.a.createElement(u, { page: n, pages: t, handleNextClick: o })
        );
      };
      m.propTypes = {
        page: c.a.number.isRequired,
        pages: c.a.number.isRequired,
        handlePrevClick: c.a.func.isRequired,
        handleNextClick: c.a.func.isRequired
      };
      var p = m;
      (l.a.defaultProps = { file: "", scale: 1 }),
        (l.a.propTypes = { file: c.a.string, scale: c.a.number });
      n.a = function(e) {
        var n = e.file,
          t = e.scale;
        return i.a.createElement(
          "div",
          { className: "panel-heading" },
          i.a.createElement(l.a, {
            document: { file: n },
            navigation: p,
            scale: t
          })
        );
      };
    },
    779: function(e, n) {},
    780: function(e, n) {},
    781: function(e, n) {},
    782: function(e, n) {},
    783: function(e, n) {}
  }
]);
