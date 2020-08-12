(window.webpackJsonp = window.webpackJsonp || []).push([
  [62],
  {
    1507: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        o = n.n(a),
        c = n(25),
        i = n.n(c),
        r = n(22),
        l = n.n(r),
        s = n(26),
        u = n.n(s),
        d = n(27),
        m = n.n(d),
        p = n(16),
        f = n.n(p),
        v = n(6),
        h = n.n(v),
        g = n(0),
        b = n.n(g),
        E = n(32),
        y = n(871),
        w = n(690),
        N = n(691),
        k = n(4),
        R = n(693),
        C = Object(E.b)(function(e) {
          return {
            documentFilename: e.documentDetails.filename,
            documentId: e.documentDetails.id
          };
        }, null)(function(e) {
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
                  iconName: "glyphicon-envelope",
                  onClickAction: function() {
                    return k.f.push(
                      "/email/nieuw/document/".concat(e.documentId)
                    );
                  }
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
                "Document: " + e.documentFilename
              )
            ),
            b.a.createElement("div", { className: "col-md-4" })
          );
        }),
        D = n(198),
        L = n(731),
        T = n(151);
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
            a = f()(e);
          if (t) {
            var o = f()(this).constructor;
            n = Reflect.construct(a, arguments, o);
          } else n = a.apply(this, arguments);
          return m()(this, n);
        };
      }
      var q = (function(e) {
          u()(n, e);
          var t = O(n);
          function n(e) {
            var a;
            return (
              o()(this, n), ((a = t.call(this, e)).state = { file: null }), a
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
                  T.a
                    .download(this.props.documentId)
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
                  var e = "",
                    t = !0;
                  return (
                    this.props.hasError
                      ? (e = "Fout bij het ophalen van document.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : Object(D.isEmpty)(this.props.documentDetails)
                      ? (e = "Geen document gevonden!")
                      : this.state.file
                      ? (t = !1)
                      : (e = "Document van Alfresco halen."),
                    t
                      ? b.a.createElement("div", null, e)
                      : b.a.createElement(
                          "div",
                          null,
                          b.a.createElement(L.a, {
                            file: this.state.file,
                            scale: this.props.scale
                          })
                        )
                  );
                }
              }
            ]),
            n
          );
        })(g.Component),
        A = Object(E.b)(function(e) {
          return {
            documentDetails: e.documentDetails,
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        }, null)(q),
        P = n(711),
        M = n.n(P);
      function U(e) {
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
            var o = f()(this).constructor;
            n = Reflect.construct(a, arguments, o);
          } else n = a.apply(this, arguments);
          return m()(this, n);
        };
      }
      var j = (function(e) {
        u()(n, e);
        var t = U(n);
        function n(e) {
          var a;
          return (
            o()(this, n),
            (a = t.call(this, e)),
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
          i()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchDocumentDetails(this.props.params.id);
              }
            },
            {
              key: "download",
              value: function() {
                var e = this;
                T.a.download(this.props.documentDetails.id).then(function(t) {
                  M()(t.data, e.props.documentDetails.filename);
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
                      b.a.createElement(A, {
                        documentId: this.props.params.id,
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
      t.default = Object(E.b)(
        function(e) {
          return { documentDetails: e.documentDetails };
        },
        function(e) {
          return {
            fetchDocumentDetails: function(t) {
              e(Object(y.a)(t));
            }
          };
        }
      )(j);
    },
    690: function(e, t, n) {
      "use strict";
      var a = n(0),
        o = n.n(a),
        c = n(8),
        i = n.n(c),
        r = function(e) {
          var t = e.children,
            n = e.className,
            a = e.onMouseEnter,
            c = e.onMouseLeave;
          return o.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(n),
              onMouseEnter: a,
              onMouseLeave: c
            },
            t
          );
        };
      (r.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (r.propTypes = {
          className: i.a.string,
          onMouseEnter: i.a.func,
          onMouseLeave: i.a.func
        }),
        (t.a = r);
    },
    691: function(e, t, n) {
      "use strict";
      var a = n(0),
        o = n.n(a),
        c = n(8),
        i = n.n(c),
        r = function(e) {
          var t = e.className,
            n = e.children;
          return o.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            n
          );
        };
      (r.defaultProps = { className: "" }),
        (r.propTypes = { className: i.a.string }),
        (t.a = r);
    },
    693: function(e, t, n) {
      "use strict";
      var a = n(0),
        o = n.n(a),
        c = n(8),
        i = n.n(c),
        r = function(e) {
          var t = e.buttonClassName,
            n = e.iconName,
            a = e.onClickAction,
            c = e.title,
            i = e.disabled;
          return o.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: a,
              disabled: i,
              title: c
            },
            o.a.createElement("span", { className: "glyphicon ".concat(n) })
          );
        };
      (r.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (r.propTypes = {
          buttonClassName: i.a.string,
          iconName: i.a.string.isRequired,
          onClickAction: i.a.func,
          title: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = r);
    },
    711: function(e, t) {
      e.exports = function(e, t, n, a) {
        var o = new Blob(void 0 !== a ? [a, e] : [e], {
          type: n || "application/octet-stream"
        });
        if (void 0 !== window.navigator.msSaveBlob)
          window.navigator.msSaveBlob(o, t);
        else {
          var c =
              window.URL && window.URL.createObjectURL
                ? window.URL.createObjectURL(o)
                : window.webkitURL.createObjectURL(o),
            i = document.createElement("a");
          (i.style.display = "none"),
            (i.href = c),
            i.setAttribute("download", t),
            void 0 === i.download && i.setAttribute("target", "_blank"),
            document.body.appendChild(i),
            i.click(),
            setTimeout(function() {
              document.body.removeChild(i), window.URL.revokeObjectURL(c);
            }, 200);
        }
      };
    },
    731: function(e, t, n) {
      "use strict";
      var a = n(0),
        o = n.n(a),
        c = n(8),
        i = n.n(c),
        r = n(775),
        l = n.n(r),
        s = function(e) {
          var t = e.page,
            n = (e.pages, e.handlePrevClick);
          return 1 === t
            ? o.a.createElement("div", null)
            : o.a.createElement(
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
          ? o.a.createElement("div", null)
          : o.a.createElement(
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
      var d = function(e) {
        var t = e.page,
          n = e.pages;
        return o.a.createElement(
          "h3",
          { style: { display: "inline-block", marginTop: 0 } },
          "Pagina ",
          t,
          " van ",
          n
        );
      };
      d.propTypes = {
        page: i.a.number.isRequired,
        pages: i.a.number.isRequired
      };
      var m = function(e) {
        var t = e.page,
          n = e.pages,
          a = e.handlePrevClick,
          c = e.handleNextClick;
        return o.a.createElement(
          "div",
          { className: "customWrapper" },
          o.a.createElement(s, { page: t, pages: n, handlePrevClick: a }),
          o.a.createElement(d, { page: t, pages: n }),
          o.a.createElement(u, { page: t, pages: n, handleNextClick: c })
        );
      };
      m.propTypes = {
        page: i.a.number.isRequired,
        pages: i.a.number.isRequired,
        handlePrevClick: i.a.func.isRequired,
        handleNextClick: i.a.func.isRequired
      };
      var p = m;
      (l.a.defaultProps = { file: "", scale: 1 }),
        (l.a.propTypes = { file: i.a.string, scale: i.a.number });
      t.a = function(e) {
        var t = e.file,
          n = e.scale;
        return o.a.createElement(
          "div",
          { className: "panel-heading" },
          o.a.createElement(l.a, {
            document: { file: t },
            navigation: p,
            scale: n
          })
        );
      };
    },
    779: function(e, t) {},
    780: function(e, t) {},
    781: function(e, t) {},
    782: function(e, t) {},
    783: function(e, t) {},
    871: function(e, t, n) {
      "use strict";
      n.d(t, "a", function() {
        return a;
      }),
        n.d(t, "b", function() {
          return o;
        });
      var a = function(e) {
          return { type: "FETCH_DOCUMENT_DETAILS", id: e };
        },
        o = function(e) {
          return { type: "UPDATE_DOCUMENT_DETAILS", document: e };
        };
    }
  }
]);
