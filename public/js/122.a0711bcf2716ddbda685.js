(window.webpackJsonp = window.webpackJsonp || []).push([
  [122],
  {
    1473: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(0),
        r = a.n(n),
        o = a(24),
        l = a.n(o),
        c = a(25),
        s = a.n(c),
        i = a(22),
        u = a.n(i),
        m = a(26),
        d = a.n(m),
        p = a(27),
        f = a.n(p),
        h = a(16),
        v = a.n(h),
        g = a(6),
        E = a.n(g),
        b = a(690),
        y = a(691),
        N = a(102),
        w = a(100);
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
          var a,
            n = v()(e);
          if (t) {
            var r = v()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return f()(this, a);
        };
      }
      var S = a(771).default,
        R = (function(e) {
          d()(a, e);
          var t = D(a);
          function a(e) {
            var n;
            return (
              l()(this, a),
              ((n = t.call(this, e)).state = { error: !1, errorMaxSize: !1 }),
              n
            );
          }
          return (
            s()(a, [
              {
                key: "onDropAccepted",
                value: function(e) {
                  var t = this;
                  this.props.addAttachment(e),
                    setTimeout(function() {
                      t.props.toggleShowNew();
                    }, 500);
                }
              },
              {
                key: "onDropRejected",
                value: function() {
                  this.setState({ errorMaxSize: !0 });
                }
              },
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    w.a,
                    {
                      closeModal: this.props.toggleShowNew,
                      showConfirmAction: !1,
                      title: "Upload bestand"
                    },
                    r.a.createElement(
                      "div",
                      { className: "upload-file-content" },
                      r.a.createElement(
                        S,
                        {
                          multiple: !1,
                          className: "dropzone",
                          onDropAccepted: this.onDropAccepted.bind(this),
                          onDropRejected: this.onDropRejected.bind(this),
                          maxSize: 6e6
                        },
                        r.a.createElement(
                          "p",
                          null,
                          "Klik hier voor het uploaden van een bestand"
                        ),
                        r.a.createElement(
                          "p",
                          null,
                          r.a.createElement("strong", null, "of"),
                          " sleep het bestand hierheen"
                        )
                      )
                    ),
                    this.state.error &&
                      r.a.createElement(
                        "p",
                        { className: "has-error-message" },
                        "Uploaden mislukt. Probeer nogmaals een bestand te uploaden."
                      ),
                    this.state.errorMaxSize &&
                      r.a.createElement(
                        "p",
                        { className: "has-error-message" },
                        "Uploaden mislukt. Het bestand mag maximaal 6MB groot zijn."
                      )
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        k = a(692),
        x = a(147),
        C = a(146),
        O = a(101),
        P = a(200);
      function j(e) {
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
          var a,
            n = v()(e);
          if (t) {
            var r = v()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return f()(this, a);
        };
      }
      var A = (function(e) {
          d()(a, e);
          var t = j(a);
          function a(e) {
            return l()(this, a), t.call(this, e);
          }
          return (
            s()(a, [
              {
                key: "render",
                value: function() {
                  var e = "";
                  return (
                    1 === this.props.data.prio && (e = "error-row"),
                    2 === this.props.data.prio && (e = "warning-row"),
                    r.a.createElement(
                      "tr",
                      { className: e },
                      r.a.createElement(
                        "td",
                        null,
                        this.props.data.field ? this.props.data.field : ""
                      ),
                      r.a.createElement(
                        "td",
                        null,
                        this.props.data.value ? this.props.data.value : "",
                        " "
                      ),
                      r.a.createElement("td", null, this.props.data.line),
                      r.a.createElement("td", null, this.props.data.message)
                    )
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        M = a(4);
      function T(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, n);
        }
        return a;
      }
      function U(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? T(Object(a), !0).forEach(function(t) {
                E()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : T(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function z(e) {
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
          var a,
            n = v()(e);
          if (t) {
            var r = v()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return f()(this, a);
        };
      }
      var V = (function(e) {
          d()(a, e);
          var t = z(a);
          function a(e) {
            var n;
            return (
              l()(this, a),
              (n = t.call(this, e)),
              E()(u()(n), "toggleUpload", function() {
                n.setState({ upload: !n.state.upload });
              }),
              E()(u()(n), "handleSubmit", function() {
                n.setState(U(U({}, n.state), {}, { uploading: !0 }));
                var e = new FormData();
                e.append("attachment", n.state.attachment),
                  N.a.validateImport(e).then(function(e) {
                    var t = e.data.find(function(e) {
                      return 1 === e.prio;
                    });
                    n.setState(
                      U(
                        U({}, n.state),
                        {},
                        { validationData: e.data, hasError: !!t, uploading: !1 }
                      )
                    );
                  });
              }),
              E()(u()(n), "import", function() {
                n.setState(U(U({}, n.state), {}, { importing: !0 }));
                var e = new FormData();
                e.append("attachment", n.state.attachment),
                  N.a.import(e).then(function(e) {
                    M.f.push("/contacten");
                  });
              }),
              E()(u()(n), "addAttachment", function(e) {
                n.setState(U(U({}, n.state), {}, { attachment: e[0] })),
                  setTimeout(function() {
                    n.handleSubmit();
                  }, 500);
              }),
              (n.state = {
                validationData: !1,
                upload: !1,
                attachment: !1,
                hasError: !0,
                uploading: !1,
                importing: !1
              }),
              n
            );
          }
          return (
            s()(a, [
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    b.a,
                    { className: "panel-grey" },
                    this.state.validationData
                      ? r.a.createElement(
                          y.a,
                          null,
                          r.a.createElement(
                            C.a,
                            null,
                            r.a.createElement(
                              x.a,
                              null,
                              r.a.createElement(O.a, {
                                title: "Veld",
                                width: "20%"
                              }),
                              r.a.createElement(O.a, {
                                title: "Waarde",
                                width: "20%"
                              }),
                              r.a.createElement(O.a, {
                                title: "Regel",
                                width: "20%"
                              }),
                              r.a.createElement(O.a, {
                                title: "Bericht",
                                width: "40%"
                              })
                            ),
                            r.a.createElement(
                              P.a,
                              null,
                              0 === this.state.validationData.length
                                ? r.a.createElement(
                                    "tr",
                                    null,
                                    r.a.createElement(
                                      "td",
                                      { colSpan: 4 },
                                      "Geen regels gevonden!"
                                    )
                                  )
                                : this.state.validationData.map(function(e, t) {
                                    return r.a.createElement(A, {
                                      key: t,
                                      data: e
                                    });
                                  })
                            )
                          ),
                          r.a.createElement(
                            "div",
                            { className: "row" },
                            r.a.createElement(
                              "div",
                              { className: "col-md-12" },
                              r.a.createElement(
                                "div",
                                {
                                  className:
                                    "btn-group btn-group-flex margin-small",
                                  role: "group"
                                },
                                r.a.createElement(k.a, {
                                  loading: this.state.uploading,
                                  buttonText: "Upload CSV",
                                  onClickAction: this.toggleUpload
                                }),
                                !this.state.hasError &&
                                  r.a.createElement(k.a, {
                                    loading: this.state.importing,
                                    buttonText: "Importeren",
                                    onClickAction: this.import
                                  })
                              )
                            )
                          )
                        )
                      : r.a.createElement(
                          y.a,
                          null,
                          r.a.createElement(
                            "div",
                            { className: "row" },
                            r.a.createElement(
                              "div",
                              { className: "col-md-12" },
                              "Hier kunt u een CSV uploaden om contacten te importeren. De CSV moet het volgende formaat hebben:"
                            )
                          ),
                          r.a.createElement(
                            "div",
                            { className: "row margin-10-top margin-10-bottom" },
                            r.a.createElement(
                              "div",
                              { className: "col-md-12" },
                              r.a.createElement(
                                "span",
                                null,
                                r.a.createElement(
                                  "strong",
                                  null,
                                  "aanspreektitel_id;initialen;voornaam;tussenvoegsel;achternaam;straat;woonplaats;huisnummer;huisnummer_toevoeging;postcode;telefoonnummer;telefoonnummer2;email;email2;iban"
                                )
                              )
                            )
                          ),
                          r.a.createElement(
                            "div",
                            { className: "row" },
                            r.a.createElement(
                              "div",
                              { className: "col-md-12" },
                              r.a.createElement(k.a, {
                                loading: this.state.uploading,
                                buttonText: "Upload CSV",
                                onClickAction: this.toggleUpload
                              })
                            )
                          )
                        ),
                    this.state.upload &&
                      r.a.createElement(R, {
                        toggleShowNew: this.toggleUpload,
                        addAttachment: this.addAttachment
                      })
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        L = function(e) {
          return r.a.createElement("div", null, r.a.createElement(V, null));
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
          var a,
            n = v()(e);
          if (t) {
            var r = v()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return f()(this, a);
        };
      }
      var F = (function(e) {
        d()(a, e);
        var t = B(a);
        function a(e) {
          return l()(this, a), t.call(this, e);
        }
        return (
          s()(a, [
            {
              key: "render",
              value: function() {
                return r.a.createElement(
                  "div",
                  { className: "row" },
                  r.a.createElement(
                    "div",
                    { className: "col-sm-12" },
                    r.a.createElement(
                      b.a,
                      null,
                      r.a.createElement(
                        y.a,
                        { className: "panel-small" },
                        r.a.createElement("div", { className: "col-md-4" }),
                        r.a.createElement(
                          "div",
                          { className: "col-md-4" },
                          r.a.createElement(
                            "h4",
                            {
                              className: "text-center text-success margin-small"
                            },
                            r.a.createElement(
                              "strong",
                              null,
                              "Contacten importeren"
                            )
                          )
                        ),
                        r.a.createElement("div", { className: "col-md-4" })
                      )
                    )
                  )
                );
              }
            }
          ]),
          a
        );
      })(n.Component);
      t.default = function(e) {
        return r.a.createElement(
          "div",
          { className: "row" },
          r.a.createElement(
            "div",
            { className: "col-md-9" },
            r.a.createElement(
              "div",
              { className: "col-md-12" },
              r.a.createElement(F, null)
            ),
            r.a.createElement(
              "div",
              { className: "col-md-12 margin-10-top" },
              r.a.createElement(L, null)
            )
          )
        );
      };
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        c = function(e) {
          var t = e.children,
            a = e.className,
            n = e.onMouseEnter,
            o = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: o
            },
            t
          );
        };
      (c.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (c.propTypes = {
          className: l.a.string,
          onMouseEnter: l.a.func,
          onMouseLeave: l.a.func
        }),
        (t.a = c);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        c = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: l.a.string }),
        (t.a = c);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        c = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            o = e.type,
            l = e.value,
            c = e.loading,
            s = e.loadText,
            i = e.disabled;
          return c
            ? r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: l,
                  disabled: c
                },
                r.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                s
              )
            : r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: l,
                  disabled: i
                },
                a
              );
        };
      (c.defaultProps = {
        buttonClassName: "btn-success",
        type: "button",
        value: "",
        loading: !1,
        loadText: "Aan het laden",
        disabled: !1
      }),
        (c.propTypes = {
          buttonClassName: l.a.string,
          buttonText: l.a.string.isRequired,
          onClickAction: l.a.func,
          type: l.a.string,
          value: l.a.string,
          loading: l.a.bool,
          loadText: l.a.string,
          disabled: l.a.bool
        }),
        (t.a = c);
    }
  }
]);
