(window.webpackJsonp = window.webpackJsonp || []).push([
  [126],
  {
    1476: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        o = n(25),
        c = n.n(o),
        l = n(22),
        s = n.n(l),
        i = n(26),
        u = n.n(i),
        m = n(27),
        p = n.n(m),
        f = n(16),
        h = n.n(f),
        d = n(6),
        D = n.n(d),
        E = n(0),
        v = n.n(E),
        b = n(32),
        y = n(199),
        w = n.n(y),
        g = n(146),
        T = n(147),
        N = n(200),
        O = n(101),
        R = n(4),
        I = n(7),
        k = n.n(I);
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
          var n,
            a = h()(e);
          if (t) {
            var r = h()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      k.a.locale("nl");
      var C = (function(e) {
          u()(n, e);
          var t = j(n);
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
                  R.f.push("/document-template/".concat(e));
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props,
                    n = t.id,
                    a = t.number,
                    r = t.createdAt,
                    o = t.name,
                    c = t.documentGroup,
                    l = t.active;
                  return v.a.createElement(
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
                    v.a.createElement("td", null, a),
                    v.a.createElement(
                      "td",
                      null,
                      r ? k()(r).format("L") : "Onbekend"
                    ),
                    v.a.createElement("td", null, o),
                    v.a.createElement("td", null, c ? c.name : "Onbekend"),
                    v.a.createElement("td", null, l ? "Ja" : "Nee"),
                    v.a.createElement(
                      "td",
                      null,
                      this.state.showActionButtons
                        ? v.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.openItem(n);
                              }
                            },
                            v.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-pencil mybtn-success"
                            }),
                            " "
                          )
                        : "",
                      (this.state.showActionButtons &&
                        this.props.permissions.createDocumentTemplate,
                      "")
                    )
                  );
                }
              }
            ]),
            n
          );
        })(E.Component),
        M = Object(b.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(C),
        A = n(100),
        P = n(105),
        S = function(e) {
          return v.a.createElement(
            A.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                P.a
                  .deleteDocumentTemplate(e.id)
                  .then(function(t) {
                    e.refreshDocumentTemplatesData(), e.closeDeleteItemModal();
                  })
                  .catch(function(t) {
                    alert(t.response.data.message), e.closeDeleteItemModal();
                  });
              },
              title: "Verwijderen"
            },
            "Verwijder document template: ",
            v.a.createElement("strong", null, " ", e.name, " ")
          );
        };
      function L(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          t &&
            (a = a.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, a);
        }
        return n;
      }
      function x(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? L(Object(n), !0).forEach(function(t) {
                D()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : L(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
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
      var _ = (function(e) {
          u()(n, e);
          var t = B(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              D()(s()(a), "showDeleteItemModal", function(e, t) {
                a.setState(
                  x(
                    x({}, a.state),
                    {},
                    {
                      showDeleteItem: !0,
                      deleteItem: x(
                        x({}, a.state.deleteItem),
                        {},
                        { id: e, name: t }
                      )
                    }
                  )
                );
              }),
              D()(s()(a), "closeDeleteItemModal", function() {
                a.setState(
                  x(
                    x({}, a.state),
                    {},
                    {
                      showDeleteItem: !1,
                      deleteItem: x(
                        x({}, a.state.deleteItem),
                        {},
                        { id: "", name: "" }
                      )
                    }
                  )
                );
              }),
              (a.state = {
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
                  var e = this,
                    t = "",
                    n = !0;
                  return (
                    this.props.hasError
                      ? (t = "Fout bij het ophalen van document templates.")
                      : this.props.isLoading
                      ? (t = "Gegevens aan het laden.")
                      : 0 === this.props.documentTemplates.length
                      ? (t = "Geen document templates gevonden!")
                      : (n = !1),
                    v.a.createElement(
                      "div",
                      null,
                      v.a.createElement(
                        g.a,
                        null,
                        v.a.createElement(
                          T.a,
                          null,
                          v.a.createElement(
                            "tr",
                            { className: "thead-title" },
                            v.a.createElement(O.a, {
                              title: "Nummer",
                              width: "20%"
                            }),
                            v.a.createElement(O.a, {
                              title: "Datum",
                              width: "30%"
                            }),
                            v.a.createElement(O.a, {
                              title: "Template",
                              width: "30%"
                            }),
                            v.a.createElement(O.a, {
                              title: "Type",
                              width: "8%"
                            }),
                            v.a.createElement(O.a, {
                              title: "Actief",
                              width: "7%"
                            }),
                            v.a.createElement(O.a, { title: "", width: "5%" })
                          )
                        ),
                        v.a.createElement(
                          N.a,
                          null,
                          n
                            ? v.a.createElement(
                                "tr",
                                null,
                                v.a.createElement("td", { colSpan: 6 }, t)
                              )
                            : this.props.documentTemplates.map(function(t) {
                                return v.a.createElement(
                                  M,
                                  w()(
                                    {
                                      key: t.id,
                                      showDeleteItemModal: e.showDeleteItemModal
                                    },
                                    t
                                  )
                                );
                              })
                        )
                      ),
                      this.state.showDeleteItem &&
                        v.a.createElement(
                          S,
                          w()(
                            {
                              closeDeleteItemModal: this.closeDeleteItemModal,
                              refreshDocumentTemplatesData: this.props
                                .refreshDocumentTemplatesData
                            },
                            this.state.deleteItem
                          )
                        )
                    )
                  );
                }
              }
            ]),
            n
          );
        })(E.Component),
        G = Object(b.b)(function(e) {
          return {
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        })(_),
        J = n(693),
        U = Object(b.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(function(e) {
          var t = e.permissions,
            n = void 0 === t ? {} : t;
          return v.a.createElement(
            "div",
            { className: "row" },
            v.a.createElement(
              "div",
              { className: "col-md-4" },
              v.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                v.a.createElement(J.a, {
                  iconName: "glyphicon-refresh",
                  onClickAction: e.refreshDocumentTemplatesData
                }),
                n.createDocumentTemplate &&
                  v.a.createElement(J.a, {
                    iconName: "glyphicon-plus",
                    onClickAction: function() {
                      R.f.push("/document-template/nieuw");
                    }
                  })
              )
            ),
            v.a.createElement(
              "div",
              { className: "col-md-4" },
              v.a.createElement(
                "h3",
                { className: "text-center table-title" },
                "Document templates"
              )
            ),
            v.a.createElement("div", { className: "col-md-4" })
          );
        });
      function V(e) {
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
      var F = (function(e) {
        u()(n, e);
        var t = V(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            (a = t.call(this, e)),
            D()(s()(a), "refreshDocumentTemplatesData", function() {
              a.props.clearDocumentTemplates(),
                a.props.fetchDocumentTemplates();
            }),
            a
          );
        }
        return (
          c()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchDocumentTemplates();
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearDocumentTemplates();
              }
            },
            {
              key: "render",
              value: function() {
                var e = this;
                return v.a.createElement(
                  "div",
                  null,
                  v.a.createElement(
                    "div",
                    { className: "panel panel-default" },
                    v.a.createElement(
                      "div",
                      { className: "panel-body" },
                      v.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        v.a.createElement(U, {
                          refreshDocumentTemplatesData: function() {
                            return e.refreshDocumentTemplatesData();
                          }
                        })
                      ),
                      v.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        v.a.createElement(G, {
                          documentTemplates: this.props.documentTemplates,
                          refreshDocumentTemplatesData: this
                            .refreshDocumentTemplatesData
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
      })(E.Component);
      t.default = Object(b.b)(
        function(e) {
          return { documentTemplates: e.documentTemplates };
        },
        function(e) {
          return {
            fetchDocumentTemplates: function() {
              e({ type: "FETCH_DOCUMENT_TEMPLATES" });
            },
            clearDocumentTemplates: function() {
              e({ type: "CLEAR_DOCUMENT_TEMPLATES" });
            }
          };
        }
      )(F);
    },
    693: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        l = function(e) {
          var t = e.buttonClassName,
            n = e.iconName,
            a = e.onClickAction,
            o = e.title,
            c = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: a,
              disabled: c,
              title: o
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
          buttonClassName: c.a.string,
          iconName: c.a.string.isRequired,
          onClickAction: c.a.func,
          title: c.a.string,
          disabled: c.a.bool
        }),
        (t.a = l);
    }
  }
]);
