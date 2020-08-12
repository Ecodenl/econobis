(window.webpackJsonp = window.webpackJsonp || []).push([
  [23],
  {
    1451: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        o = a(25),
        l = a.n(o),
        i = a(26),
        c = a.n(i),
        s = a(27),
        u = a.n(s),
        d = a(16),
        m = a.n(d),
        p = a(0),
        h = a.n(p),
        f = a(32),
        v = function(e) {
          return { type: "FETCH_DOCUMENT_TEMPLATE", id: e };
        },
        g = a(22),
        b = a.n(g),
        y = a(6),
        E = a.n(y),
        T = a(4),
        N = a(693),
        k = a(100),
        C = Object(f.b)(null, function(e) {
          return {
            deleteDocumentTemplate: function(t) {
              e(
                (function(e) {
                  return { type: "DELETE_DOCUMENT_TEMPLATE", id: e };
                })(t)
              );
            }
          };
        })(function(e) {
          return h.a.createElement(
            k.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return (
                  e.deleteDocumentTemplate(e.templateId),
                  void e.closeDeleteItemModal()
                );
              },
              title: "Verwijderen"
            },
            "Verwijder document template: ",
            h.a.createElement("strong", null, " ", e.templateName, " ")
          );
        }),
        w = a(105),
        D = function(e) {
          return h.a.createElement(
            k.a,
            {
              buttonConfirmText: "Dupliceer",
              closeModal: e.closeModal,
              confirmAction: function() {
                w.a.duplicateTemplate(e.templateId).then(function(t) {
                  var a = t.data.data.id;
                  T.f.push("/document-template/".concat(a)), e.closeModal();
                });
              },
              title: "Dupliceer template"
            },
            h.a.createElement(
              "p",
              null,
              "Dupliceer template: ",
              h.a.createElement(
                "strong",
                null,
                " ",
                "".concat(e.templateName),
                " "
              )
            )
          );
        };
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
          var a,
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var _ = (function(e) {
          c()(a, e);
          var t = O(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(b()(n), "toggleDuplicate", function() {
                n.setState({ showDuplicate: !n.state.showDuplicate });
              }),
              E()(b()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              (n.state = { showDelete: !1, showDuplicate: !1 }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.props.permissions,
                    t = void 0 === e ? {} : e;
                  return h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      h.a.createElement(
                        "div",
                        { className: "btn-group", role: "group" },
                        h.a.createElement(N.a, {
                          iconName: "glyphicon-arrow-left",
                          onClickAction: T.e.goBack
                        }),
                        t.createDocumentTemplate &&
                          h.a.createElement(N.a, {
                            iconName: "glyphicon-duplicate",
                            onClickAction: this.toggleDuplicate
                          }),
                        t.createDocumentTemplate &&
                          h.a.createElement(N.a, {
                            iconName: "glyphicon-trash",
                            onClickAction: this.toggleDelete
                          })
                      )
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      h.a.createElement(
                        "h4",
                        { className: "text-center" },
                        "Document template: " + this.props.templateName
                      )
                    ),
                    h.a.createElement("div", { className: "col-md-4" }),
                    this.state.showDelete &&
                      h.a.createElement(C, {
                        closeDeleteItemModal: this.toggleDelete,
                        templateName: this.props.templateName,
                        templateId: this.props.templateId
                      }),
                    this.state.showDuplicate &&
                      h.a.createElement(D, {
                        closeModal: this.toggleDuplicate,
                        templateName: this.props.templateName,
                        templateId: this.props.templateId
                      })
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        M = Object(f.b)(function(e) {
          return {
            templateName: e.documentTemplateDetails.name,
            templateId: e.documentTemplateDetails.id,
            permissions: e.meDetails.permissions
          };
        }, null)(_),
        j = a(198),
        P = a(690),
        R = a(691),
        x = a(692),
        A = a(702),
        I = a(737),
        S = a(697),
        q = a.n(S),
        B = a(7),
        F = a.n(B),
        L = a(694),
        G = a(695),
        z = a(696),
        V = a(723),
        X = a(700);
      function U(e, t) {
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
      function K(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? U(Object(a), !0).forEach(function(t) {
                E()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : U(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function J(e) {
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
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var W = (function(e) {
          c()(a, e);
          var t = J(a);
          function a(e) {
            var n;
            r()(this, a),
              (n = t.call(this, e)),
              E()(b()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  K(
                    K({}, n.state),
                    {},
                    {
                      documentTemplate: K(
                        K({}, n.state.documentTemplate),
                        {},
                        E()({}, r, a)
                      )
                    }
                  )
                );
              }),
              E()(b()(n), "handleRoleIds", function(e) {
                n.setState(
                  K(
                    K({}, n.state),
                    {},
                    {
                      documentTemplate: K(
                        K({}, n.state.documentTemplate),
                        {},
                        { roleIds: e }
                      )
                    }
                  )
                );
              }),
              E()(b()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.documentTemplate,
                  a = {},
                  r = !1;
                q.a.isEmpty(t.name) && ((a.name = !0), (r = !0)),
                  q.a.isEmpty(t.documentGroupId) && ((a.group = !0), (r = !0)),
                  n.setState(K(K({}, n.state), {}, { errors: a })),
                  !r &&
                    w.a.updateDocumentTemplate(t).then(function(e) {
                      n.props.fetchDocumentTemplate(e.id),
                        n.props.switchToView();
                    });
              });
            var o = e.documentTemplate,
              l = o.id,
              i = o.name,
              c = o.documentGroup,
              s = o.documentTemplateType,
              u = o.roles,
              d = o.characteristic,
              m = o.htmlBody,
              p = o.baseTemplate,
              h = o.headerTemplate,
              f = o.footerTemplate,
              v = o.active;
            return (
              (n.state = {
                footerTemplates: [],
                headerTemplates: [],
                baseTemplates: [],
                documentTemplate: {
                  id: l,
                  name: i,
                  documentGroupId: c ? c.id : "",
                  roleIds:
                    u &&
                    u
                      .map(function(e) {
                        return e.id;
                      })
                      .join(","),
                  characteristic: d || "",
                  htmlBody: m || "",
                  baseTemplateId: p ? p.id : "",
                  headerTemplateId: h ? h.id : "",
                  footerTemplateId: f ? f.id : "",
                  active: v
                },
                errors: { name: !1, group: !1 },
                isGeneral: !(!s || "general" !== s.id)
              }),
              (n.handleTextChange = n.handleTextChange.bind(b()(n))),
              (n.handleRoleIds = n.handleRoleIds.bind(b()(n))),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  w.a.fetchDocumentTemplatesPeekNotGeneral().then(function(t) {
                    var a = [],
                      n = [],
                      r = [];
                    t.forEach(function(e) {
                      "footer" === e.type
                        ? a.push({ id: e.id, name: e.name })
                        : "header" === e.type
                        ? n.push({ id: e.id, name: e.name })
                        : "base" === e.type &&
                          r.push({ id: e.id, name: e.name });
                    }),
                      e.setState({
                        footerTemplates: a,
                        headerTemplates: n,
                        baseTemplates: r
                      });
                  });
                }
              },
              {
                key: "handleTextChange",
                value: function(e) {
                  this.setState(
                    K(
                      K({}, this.state),
                      {},
                      {
                        documentTemplate: K(
                          K({}, this.state.documentTemplate),
                          {},
                          { htmlBody: e.target.getContent({ format: "raw" }) }
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.documentTemplate,
                    t = e.name,
                    a = e.documentGroupId,
                    n = e.roleIds,
                    r = e.characteristic,
                    o = e.htmlBody,
                    l = e.baseTemplateId,
                    i = e.headerTemplateId,
                    c = e.footerTemplateId,
                    s = e.active,
                    u = this.props.documentTemplate,
                    d = u.number,
                    m = u.createdAt,
                    p = u.documentTemplateType,
                    f = u.createdBy;
                  return h.a.createElement(
                    "div",
                    null,
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(L.a, {
                        label: "Naam",
                        size: "col-sm-6",
                        name: "name",
                        value: t,
                        onChangeAction: this.handleInputChange,
                        required: "required",
                        error: this.state.errors.name
                      }),
                      h.a.createElement(G.a, {
                        label: "Template nummer",
                        value: d
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(z.a, {
                        label: "Documentgroep",
                        name: "documentGroupId",
                        value: a,
                        options: this.props.documentGroups,
                        onChangeAction: this.handleInputChange,
                        required: "required",
                        error: this.state.errors.group
                      }),
                      h.a.createElement(G.a, {
                        label: "Documenttype",
                        value: p ? p.name : ""
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(L.a, {
                        label: "Kenmerk",
                        size: "col-sm-6",
                        name: "characteristic",
                        value: r,
                        onChangeAction: this.handleInputChange
                      }),
                      this.state.isGeneral &&
                        h.a.createElement(V.a, {
                          label: "Rollen",
                          name: "roleIds",
                          value: n,
                          options: this.props.roles,
                          onChangeAction: this.handleRoleIds
                        })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(
                        "div",
                        { className: "form-group col-sm-12" },
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(I.a, {
                            label: "Tekst",
                            value: o,
                            onChangeAction: this.handleTextChange
                          })
                        )
                      )
                    ),
                    this.state.isGeneral &&
                      h.a.createElement(
                        "div",
                        { className: "row" },
                        h.a.createElement(z.a, {
                          label: "Basis template",
                          name: "baseTemplateId",
                          value: l,
                          options: this.state.baseTemplates,
                          onChangeAction: this.handleInputChange
                        })
                      ),
                    this.state.isGeneral &&
                      h.a.createElement(
                        "div",
                        { className: "row" },
                        h.a.createElement(z.a, {
                          label: "Koptekst",
                          name: "headerTemplateId",
                          value: i,
                          options: this.state.headerTemplates,
                          onChangeAction: this.handleInputChange
                        })
                      ),
                    this.state.isGeneral &&
                      h.a.createElement(
                        "div",
                        { className: "row" },
                        h.a.createElement(z.a, {
                          label: "Footer template",
                          name: "footerTemplateId",
                          value: c,
                          options: this.state.footerTemplates,
                          onChangeAction: this.handleInputChange
                        })
                      ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(X.a, {
                        label: "Actief",
                        name: "active",
                        value: s,
                        onChangeAction: this.handleInputChange,
                        id: "active"
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(G.a, {
                        label: "Gemaakt op",
                        value: m ? F()(m).format("L") : "Onbekend"
                      }),
                      h.a.createElement(G.a, {
                        label: "Gemaakt door",
                        value: f ? f.fullName : "Onbekend",
                        link: f ? "gebruiker/" + f.id : ""
                      })
                    ),
                    h.a.createElement(
                      A.a,
                      null,
                      h.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        h.a.createElement(x.a, {
                          buttonClassName: "btn-default",
                          buttonText: "Annuleren",
                          onClickAction: this.props.switchToView
                        }),
                        h.a.createElement(x.a, {
                          buttonText: "Opslaan",
                          onClickAction: this.handleSubmit,
                          type: "submit",
                          value: "Submit"
                        })
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        Y = Object(f.b)(
          function(e) {
            return {
              documentTemplate: e.documentTemplateDetails,
              documentGroups: e.systemData.documentGroups,
              roles: e.systemData.roles
            };
          },
          function(e) {
            return {
              fetchDocumentTemplate: function(t) {
                e(v(t));
              }
            };
          }
        )(W),
        H = a(733);
      F.a.locale("nl");
      var Q = Object(f.b)(function(e) {
        return { documentTemplate: e.documentTemplateDetails };
      })(function(e) {
        var t = e.documentTemplate,
          a = t.name,
          n = t.number,
          r = t.htmlBody,
          o = t.characteristic,
          l = t.roles,
          i = t.documentGroup,
          c = t.documentTemplateType,
          s = t.baseTemplate,
          u = t.headerTemplate,
          d = t.footerTemplate,
          m = t.active,
          p = t.createdAt,
          f = t.createdBy;
        return h.a.createElement(
          "div",
          null,
          h.a.createElement(
            "div",
            { className: "row margin-10-top", onClick: e.switchToEdit },
            h.a.createElement(G.a, { label: "Template", value: a }),
            h.a.createElement(G.a, { label: "Template nummer", value: n })
          ),
          h.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            h.a.createElement(G.a, {
              label: "Documentgroep",
              value: i ? i.name : ""
            }),
            h.a.createElement(G.a, {
              label: "Documenttype",
              value: c ? c.name : ""
            })
          ),
          h.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            h.a.createElement(G.a, { label: "Kenmerk", value: o }),
            "general" == c.id &&
              h.a.createElement(G.a, {
                label: "Rollen",
                value:
                  l &&
                  l
                    .map(function(e) {
                      return e.name;
                    })
                    .join(", ")
              })
          ),
          h.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            h.a.createElement(H.a, {
              label: "Tekst",
              value: r,
              switchToEdit: e.switchToEdit
            })
          ),
          "general" == c.id &&
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(G.a, {
                label: "Basis template",
                value: s ? s.name : "",
                link: s ? "document-template/" + s.id : ""
              })
            ),
          "general" == c.id &&
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(G.a, {
                label: "Koptekst",
                value: u ? u.name : "",
                link: u ? "document-template/" + u.id : ""
              })
            ),
          "general" == c.id &&
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(G.a, {
                label: "Voettekst",
                value: d ? d.name : "",
                link: d ? "document-template/" + d.id : ""
              })
            ),
          h.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            h.a.createElement(G.a, { label: "Actief", value: m ? "Ja" : "Nee" })
          ),
          h.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            h.a.createElement(G.a, {
              label: "Gemaakt op",
              value: p ? F()(p).format("L") : "Onbekend"
            }),
            h.a.createElement(G.a, {
              label: "Gemaakt door",
              value: f ? f.fullName : "Onbekend",
              link: f ? "gebruiker/" + f.id : ""
            })
          )
        );
      });
      function Z(e) {
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
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var $ = (function(e) {
          c()(a, e);
          var t = Z(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(b()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              E()(b()(n), "switchToView", function() {
                n.setState({ showEdit: !1, activeDiv: "" });
              }),
              (n.state = { showEdit: !1, activeDiv: "" }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "onDivEnter",
                value: function() {
                  this.setState({ activeDiv: "panel-grey" });
                }
              },
              {
                key: "onDivLeave",
                value: function() {
                  this.state.showEdit || this.setState({ activeDiv: "" });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this;
                  return h.a.createElement(
                    P.a,
                    {
                      className: this.state.activeDiv,
                      onMouseEnter: function() {
                        return e.onDivEnter();
                      },
                      onMouseLeave: function() {
                        return e.onDivLeave();
                      }
                    },
                    h.a.createElement(
                      R.a,
                      null,
                      this.state.showEdit &&
                        this.props.permissions.createDocumentTemplate
                        ? h.a.createElement(Y, {
                            switchToView: this.switchToView
                          })
                        : h.a.createElement(Q, {
                            switchToEdit: this.switchToEdit
                          })
                    )
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        ee = Object(f.b)(function(e) {
          return {
            documentTemplate: e.documentTemplateDetails,
            permissions: e.meDetails.permissions
          };
        })($);
      function te(e) {
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
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var ae = (function(e) {
          c()(a, e);
          var t = te(a);
          function a(e) {
            return r()(this, a), t.call(this, e);
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = "",
                    t = !0;
                  return (
                    this.props.hasError
                      ? (e = "Fout bij het ophalen van documenttemplate.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : Object(j.isEmpty)(this.props.documentTemplate)
                      ? (e = "Geen documenttemplate gevonden!")
                      : (t = !1),
                    t
                      ? h.a.createElement("div", null, e)
                      : h.a.createElement(
                          "div",
                          null,
                          h.a.createElement(ee, null)
                        )
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        ne = Object(f.b)(
          function(e) {
            return {
              documentTemplate: e.documentTemplateDetails,
              isLoading: e.loadingData.isLoading,
              hasError: e.loadingData.hasError
            };
          },
          function(e) {
            return {
              fetchDocumentTemplate: function(t) {
                e(v(t));
              }
            };
          }
        )(ae);
      function re(e) {
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
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var oe = (function(e) {
        c()(a, e);
        var t = re(a);
        function a(e) {
          return r()(this, a), t.call(this, e);
        }
        return (
          l()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchDocumentTemplate(this.props.params.id);
              }
            },
            {
              key: "componentWillReceiveProps",
              value: function(e) {
                this.props.params.id !== e.params.id &&
                  this.props.fetchDocumentTemplate(e.params.id);
              }
            },
            {
              key: "render",
              value: function() {
                return h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    h.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      h.a.createElement(
                        P.a,
                        null,
                        h.a.createElement(
                          R.a,
                          { className: "panel-small" },
                          h.a.createElement(M, null)
                        )
                      )
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      h.a.createElement(ne, null)
                    )
                  ),
                  h.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          a
        );
      })(p.Component);
      t.default = Object(f.b)(
        function(e) {
          return { documentTemplateDetails: e.documentTemplateDetails };
        },
        function(e) {
          return {
            fetchDocumentTemplate: function(t) {
              e(v(t));
            }
          };
        }
      )(oe);
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        i = function(e) {
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
      (i.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (i.propTypes = {
          className: l.a.string,
          onMouseEnter: l.a.func,
          onMouseLeave: l.a.func
        }),
        (t.a = i);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        i = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (i.defaultProps = { className: "" }),
        (i.propTypes = { className: l.a.string }),
        (t.a = i);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        i = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            o = e.type,
            l = e.value,
            i = e.loading,
            c = e.loadText,
            s = e.disabled;
          return i
            ? r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: l,
                  disabled: i
                },
                r.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                c
              )
            : r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: l,
                  disabled: s
                },
                a
              );
        };
      (i.defaultProps = {
        buttonClassName: "btn-success",
        type: "button",
        value: "",
        loading: !1,
        loadText: "Aan het laden",
        disabled: !1
      }),
        (i.propTypes = {
          buttonClassName: l.a.string,
          buttonText: l.a.string.isRequired,
          onClickAction: l.a.func,
          type: l.a.string,
          value: l.a.string,
          loading: l.a.bool,
          loadText: l.a.string,
          disabled: l.a.bool
        }),
        (t.a = i);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        i = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            o = e.title,
            l = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: l,
              title: o
            },
            r.a.createElement("span", { className: "glyphicon ".concat(a) })
          );
        };
      (i.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (i.propTypes = {
          buttonClassName: l.a.string,
          iconName: l.a.string.isRequired,
          onClickAction: l.a.func,
          title: l.a.string,
          disabled: l.a.bool
        }),
        (t.a = i);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        i = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            o = e.size,
            l = e.id,
            i = e.placeholder,
            c = e.name,
            s = e.value,
            u = e.onClickAction,
            d = e.onChangeAction,
            m = e.onBlurAction,
            p = e.required,
            h = e.readOnly,
            f = e.maxLength,
            v = e.error,
            g = e.min,
            b = e.max,
            y = e.step,
            E = e.errorMessage,
            T = e.divSize,
            N = e.divClassName,
            k = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(T, " ").concat(N) },
            r.a.createElement(
              "label",
              { htmlFor: l, className: "col-sm-6 ".concat(p) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(o) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (v ? "has-error" : ""),
                id: l,
                placeholder: i,
                name: c,
                value: s,
                onClick: u,
                onChange: d,
                onBlur: m,
                readOnly: h,
                maxLength: f,
                min: g,
                max: b,
                autoComplete: k,
                step: y
              })
            ),
            v &&
              r.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                r.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  E
                )
              )
          );
        };
      (i.defaultProps = {
        divClassName: "",
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        name: "",
        type: "text",
        value: "",
        required: "",
        readOnly: !1,
        maxLength: null,
        error: !1,
        min: "",
        max: "",
        step: "",
        errorMessage: "",
        autoComplete: "off",
        onBlurAction: function() {},
        onClickAction: function() {},
        onChangeAction: function() {}
      }),
        (i.propTypes = {
          label: l.a.oneOfType([l.a.string, l.a.object]).isRequired,
          type: l.a.string,
          className: l.a.string,
          divClassName: l.a.string,
          size: l.a.string,
          divSize: l.a.string,
          id: l.a.string,
          placeholder: l.a.string,
          name: l.a.string.isRequired,
          value: l.a.oneOfType([l.a.string, l.a.number]),
          onClickAction: l.a.func,
          onChangeAction: l.a.func,
          onBlurAction: l.a.func,
          required: l.a.string,
          readOnly: l.a.bool,
          maxLength: l.a.string,
          error: l.a.bool,
          min: l.a.string,
          max: l.a.string,
          step: l.a.string,
          errorMessage: l.a.string,
          autoComplete: l.a.string
        }),
        (t.a = i);
    },
    695: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(4),
        l = a(8),
        i = a.n(l),
        c = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            l = e.value,
            i = e.link,
            c = e.hidden;
          return i.length > 0
            ? r.a.createElement(
                "div",
                { className: a, style: c ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement(
                  "div",
                  { className: "col-sm-6", id: n, onClick: null },
                  r.a.createElement(
                    o.b,
                    { to: i, className: "link-underline" },
                    l
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: a, style: c ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement("div", { className: "col-sm-6", id: n }, l)
              );
        };
      (c.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (c.propTypes = {
          label: i.a.oneOfType([i.a.string, i.a.object]).isRequired,
          className: i.a.string,
          id: i.a.string,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          link: i.a.string,
          hidden: i.a.bool
        }),
        (t.a = c);
    },
    696: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        i = function(e) {
          var t = e.label,
            a = e.className,
            n = e.size,
            o = e.id,
            l = e.name,
            i = e.value,
            c = e.options,
            s = e.onChangeAction,
            u = e.onBlurAction,
            d = e.required,
            m = e.error,
            p = e.errorMessage,
            h = e.optionValue,
            f = e.optionName,
            v = e.readOnly,
            g = e.placeholder,
            b = e.divClassName,
            y = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(b) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(d) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-6" },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(a) + (m && " has-error"),
                  id: o,
                  name: l,
                  value: i,
                  onChange: s,
                  onBlur: u,
                  readOnly: v
                },
                y && r.a.createElement("option", { value: "" }, g),
                c.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[h], value: e[h] },
                    e[f]
                  );
                })
              )
            ),
            m &&
              r.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                r.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  p
                )
              )
          );
        };
      (i.defaultProps = {
        divClassName: "",
        className: "",
        size: "col-sm-6",
        readOnly: !1,
        required: "",
        error: !1,
        errorMessage: "",
        value: "",
        optionValue: "id",
        optionName: "name",
        placeholder: "",
        emptyOption: !0
      }),
        (i.propTypes = {
          label: l.a.string.isRequired,
          className: l.a.string,
          size: l.a.string,
          id: l.a.string,
          name: l.a.string.isRequired,
          options: l.a.array,
          value: l.a.oneOfType([l.a.string, l.a.number]),
          onChangeAction: l.a.func,
          onBlurAction: l.a.func,
          required: l.a.string,
          readOnly: l.a.bool,
          error: l.a.bool,
          errorMessage: l.a.string,
          emptyOption: l.a.bool,
          optionValue: l.a.string,
          optionName: l.a.string,
          placeholder: l.a.string
        }),
        (t.a = i);
    },
    700: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        i = a(703),
        c = a.n(i),
        s = function(e) {
          var t = e.label,
            a = e.size,
            n = e.id,
            o = e.name,
            l = e.value,
            i = e.onChangeAction,
            s = e.required,
            u = e.divSize,
            d = e.className,
            m = e.disabled;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(u, " ").concat(d) },
            r.a.createElement(
              "div",
              null,
              r.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(s) },
                t
              )
            ),
            r.a.createElement(
              "div",
              { className: "".concat(a) },
              r.a.createElement(c.a, {
                id: n,
                name: o,
                onChange: i,
                checked: l,
                disabled: m
              })
            )
          );
        };
      (s.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        required: "",
        disabled: !1,
        value: null
      }),
        (s.propTypes = {
          label: l.a.string.isRequired,
          type: l.a.string,
          size: l.a.string,
          divSize: l.a.string,
          id: l.a.string,
          name: l.a.string.isRequired,
          value: l.a.bool,
          onChangeAction: l.a.func,
          required: l.a.string,
          disabled: l.a.bool
        }),
        (t.a = s);
    },
    702: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        i = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-footer ".concat(t) },
            a
          );
        };
      (i.defaultProps = { className: "" }),
        (i.propTypes = { className: l.a.string }),
        (t.a = i);
    },
    703: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var a = arguments[t];
              for (var n in a)
                Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
            }
            return e;
          },
        r = (function() {
          function e(e, t) {
            for (var a = 0; a < t.length; a++) {
              var n = t[a];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, a, n) {
            return a && e(t.prototype, a), n && e(t, n), t;
          };
        })(),
        o = a(0),
        l = m(o),
        i = m(a(710)),
        c = m(a(8)),
        s = m(a(704)),
        u = m(a(705)),
        d = a(706);
      function m(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var p = (function(e) {
        function t(e) {
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, t);
          var a = (function(e, t) {
            if (!e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return !t || ("object" != typeof t && "function" != typeof t)
              ? e
              : t;
          })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
          return (
            (a.handleClick = a.handleClick.bind(a)),
            (a.handleTouchStart = a.handleTouchStart.bind(a)),
            (a.handleTouchMove = a.handleTouchMove.bind(a)),
            (a.handleTouchEnd = a.handleTouchEnd.bind(a)),
            (a.handleFocus = a.handleFocus.bind(a)),
            (a.handleBlur = a.handleBlur.bind(a)),
            (a.previouslyChecked = !(!e.checked && !e.defaultChecked)),
            (a.state = {
              checked: !(!e.checked && !e.defaultChecked),
              hasFocus: !1
            }),
            a
          );
        }
        return (
          (function(e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof t
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
              t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t));
          })(t, e),
          r(t, [
            {
              key: "componentDidUpdate",
              value: function(e) {
                e.checked !== this.props.checked &&
                  this.setState({ checked: !!this.props.checked });
              }
            },
            {
              key: "handleClick",
              value: function(e) {
                var t = this.input;
                if (e.target !== t && !this.moved)
                  return (
                    (this.previouslyChecked = t.checked),
                    e.preventDefault(),
                    t.focus(),
                    void t.click()
                  );
                var a = this.props.hasOwnProperty("checked")
                  ? this.props.checked
                  : t.checked;
                this.setState({ checked: a });
              }
            },
            {
              key: "handleTouchStart",
              value: function(e) {
                (this.startX = (0, d.pointerCoord)(e).x), (this.activated = !0);
              }
            },
            {
              key: "handleTouchMove",
              value: function(e) {
                if (this.activated && ((this.moved = !0), this.startX)) {
                  var t = (0, d.pointerCoord)(e).x;
                  this.state.checked && t + 15 < this.startX
                    ? (this.setState({ checked: !1 }),
                      (this.startX = t),
                      (this.activated = !0))
                    : t - 15 > this.startX &&
                      (this.setState({ checked: !0 }),
                      (this.startX = t),
                      (this.activated = t < this.startX + 5));
                }
              }
            },
            {
              key: "handleTouchEnd",
              value: function(e) {
                if (this.moved) {
                  var t = this.input;
                  if ((e.preventDefault(), this.startX)) {
                    var a = (0, d.pointerCoord)(e).x;
                    !0 === this.previouslyChecked && this.startX + 4 > a
                      ? this.previouslyChecked !== this.state.checked &&
                        (this.setState({ checked: !1 }),
                        (this.previouslyChecked = this.state.checked),
                        t.click())
                      : this.startX - 4 < a &&
                        this.previouslyChecked !== this.state.checked &&
                        (this.setState({ checked: !0 }),
                        (this.previouslyChecked = this.state.checked),
                        t.click()),
                      (this.activated = !1),
                      (this.startX = null),
                      (this.moved = !1);
                  }
                }
              }
            },
            {
              key: "handleFocus",
              value: function(e) {
                var t = this.props.onFocus;
                t && t(e), this.setState({ hasFocus: !0 });
              }
            },
            {
              key: "handleBlur",
              value: function(e) {
                var t = this.props.onBlur;
                t && t(e), this.setState({ hasFocus: !1 });
              }
            },
            {
              key: "getIcon",
              value: function(e) {
                var a = this.props.icons;
                return a
                  ? void 0 === a[e]
                    ? t.defaultProps.icons[e]
                    : a[e]
                  : null;
              }
            },
            {
              key: "render",
              value: function() {
                var e = this,
                  t = this.props,
                  a = t.className,
                  r =
                    (t.icons,
                    (function(e, t) {
                      var a = {};
                      for (var n in e)
                        t.indexOf(n) >= 0 ||
                          (Object.prototype.hasOwnProperty.call(e, n) &&
                            (a[n] = e[n]));
                      return a;
                    })(t, ["className", "icons"])),
                  o = (0, i.default)(
                    "react-toggle",
                    {
                      "react-toggle--checked": this.state.checked,
                      "react-toggle--focus": this.state.hasFocus,
                      "react-toggle--disabled": this.props.disabled
                    },
                    a
                  );
                return l.default.createElement(
                  "div",
                  {
                    className: o,
                    onClick: this.handleClick,
                    onTouchStart: this.handleTouchStart,
                    onTouchMove: this.handleTouchMove,
                    onTouchEnd: this.handleTouchEnd
                  },
                  l.default.createElement(
                    "div",
                    { className: "react-toggle-track" },
                    l.default.createElement(
                      "div",
                      { className: "react-toggle-track-check" },
                      this.getIcon("checked")
                    ),
                    l.default.createElement(
                      "div",
                      { className: "react-toggle-track-x" },
                      this.getIcon("unchecked")
                    )
                  ),
                  l.default.createElement("div", {
                    className: "react-toggle-thumb"
                  }),
                  l.default.createElement(
                    "input",
                    n({}, r, {
                      ref: function(t) {
                        e.input = t;
                      },
                      onFocus: this.handleFocus,
                      onBlur: this.handleBlur,
                      className: "react-toggle-screenreader-only",
                      type: "checkbox"
                    })
                  )
                );
              }
            }
          ]),
          t
        );
      })(o.PureComponent);
      (t.default = p),
        (p.displayName = "Toggle"),
        (p.defaultProps = {
          icons: {
            checked: l.default.createElement(s.default, null),
            unchecked: l.default.createElement(u.default, null)
          }
        }),
        (p.propTypes = {
          checked: c.default.bool,
          disabled: c.default.bool,
          defaultChecked: c.default.bool,
          onChange: c.default.func,
          onFocus: c.default.func,
          onBlur: c.default.func,
          className: c.default.string,
          name: c.default.string,
          value: c.default.string,
          id: c.default.string,
          "aria-labelledby": c.default.string,
          "aria-label": c.default.string,
          icons: c.default.oneOfType([
            c.default.bool,
            c.default.shape({
              checked: c.default.node,
              unchecked: c.default.node
            })
          ])
        });
    },
    704: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        r = a(0),
        o = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
        return o.default.createElement(
          "svg",
          { width: "14", height: "11", viewBox: "0 0 14 11" },
          o.default.createElement("title", null, "switch-check"),
          o.default.createElement("path", {
            d:
              "M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",
            fill: "#fff",
            fillRule: "evenodd"
          })
        );
      };
    },
    705: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        r = a(0),
        o = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
        return o.default.createElement(
          "svg",
          { width: "10", height: "10", viewBox: "0 0 10 10" },
          o.default.createElement("title", null, "switch-x"),
          o.default.createElement("path", {
            d:
              "M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",
            fill: "#fff",
            fillRule: "evenodd"
          })
        );
      };
    },
    706: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.pointerCoord = function(e) {
          if (e) {
            var t = e.changedTouches;
            if (t && t.length > 0) {
              var a = t[0];
              return { x: a.clientX, y: a.clientY };
            }
            var n = e.pageX;
            if (void 0 !== n) return { x: n, y: e.pageY };
          }
          return { x: 0, y: 0 };
        });
    },
    723: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        i = a(714),
        c =
          (a(715),
          function(e) {
            var t = e.label,
              a = (e.className, e.size),
              n = e.id,
              o = e.name,
              l = e.value,
              c = e.options,
              s = e.optionId,
              u = e.optionName,
              d = e.onChangeAction,
              m = e.required,
              p = e.multi,
              h = e.error;
            return r.a.createElement(
              "div",
              { className: "form-group col-sm-6" },
              r.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(m) },
                t
              ),
              r.a.createElement(
                "div",
                { className: "".concat(a) },
                r.a.createElement(i.a, {
                  id: n,
                  name: o,
                  value: l,
                  onChange: d,
                  options: c,
                  valueKey: s,
                  labelKey: u,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: p,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: h ? " has-error" : ""
                })
              )
            );
          });
      (c.defaultProps = {
        className: "",
        size: "col-sm-6",
        optionId: "id",
        optionName: "name",
        readOnly: !1,
        required: "",
        error: !1,
        value: "",
        multi: !0
      }),
        (c.propTypes = {
          label: l.a.string.isRequired,
          className: l.a.string,
          size: l.a.string,
          id: l.a.string,
          name: l.a.string.isRequired,
          options: l.a.array,
          optionId: l.a.string,
          optionName: l.a.string,
          value: l.a.string,
          onChangeAction: l.a.func,
          onBlurAction: l.a.func,
          required: l.a.string,
          readOnly: l.a.bool,
          error: l.a.bool,
          multi: l.a.bool
        }),
        (t.a = c);
    },
    733: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(739),
        l = a.n(o),
        i = a(8),
        c = a.n(i),
        s = a(690),
        u = a(692),
        d = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            o = e.value,
            i = e.switchToEdit;
          return r.a.createElement(
            "div",
            { className: a },
            r.a.createElement(
              "label",
              { htmlFor: n, className: "col-sm-3" },
              t,
              i
                ? r.a.createElement(
                    "span",
                    null,
                    r.a.createElement("br", null),
                    r.a.createElement(u.a, {
                      buttonClassName: "btn-success btn-padding-small",
                      buttonText: "Wijzig",
                      onClickAction: i
                    })
                  )
                : ""
            ),
            r.a.createElement(
              s.a,
              { className: "col-sm-9" },
              r.a.createElement(
                l.a,
                null,
                r.a.createElement("div", {
                  id: n,
                  dangerouslySetInnerHTML: { __html: o }
                })
              )
            )
          );
        };
      (d.defaultProps = { className: "col-sm-12", value: "" }),
        (d.propTypes = {
          label: c.a.string.isRequired,
          className: c.a.string,
          id: c.a.string,
          value: c.a.oneOfType([c.a.string, c.a.number])
        }),
        (t.a = d);
    },
    737: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        i =
          (a(752),
          a(753),
          a(754),
          a(755),
          a(756),
          a(757),
          a(758),
          a(759),
          a(760),
          a(761),
          a(762),
          a(770)),
        c = function(e) {
          var t = e.label,
            a = e.value,
            n = e.onChangeAction;
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(
              "div",
              { className: "col-sm-3" },
              r.a.createElement(
                "label",
                { htmlFor: "quotationText", className: "col-sm-12" },
                t
              )
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-9" },
              r.a.createElement(i.a, {
                initialValue: a,
                init: {
                  branding: !1,
                  language: "nl",
                  menubar: !1,
                  plugins:
                    "paste lists advlist link image code table textcolor pagebreak",
                  toolbar:
                    "undo redo | formatselect fontselect | bold italic forecolor | alignleft aligncenter alignright | pagebreak | bullist numlist outdent indent | table | link image | code",
                  height: "300",
                  browser_spellcheck: !0,
                  font_formats:
                    "Courier New=courier new;Tahoma=tahoma;Times New Roman=times new roman;Verdana=verdana;"
                },
                onChange: n
              })
            )
          );
        };
      (c.defaultProps = { value: "", errorMessage: "" }),
        (c.propTypes = {
          label: l.a.string.isRequired,
          type: l.a.string,
          id: l.a.string,
          placeholder: l.a.string,
          value: l.a.string,
          onChangeAction: l.a.func
        }),
        (t.a = c);
    },
    739: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        r = a(740),
        o = (n = r) && n.__esModule ? n : { default: n };
      t.default = o.default;
    },
    740: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var a = arguments[t];
              for (var n in a)
                Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
            }
            return e;
          },
        r = (function() {
          function e(e, t) {
            for (var a = 0; a < t.length; a++) {
              var n = t[a];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, a, n) {
            return a && e(t.prototype, a), n && e(t, n), t;
          };
        })(),
        o = a(0),
        l = u(o),
        i = u(a(103)),
        c = u(a(8)),
        s = u(a(741));
      function u(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var d,
        m = "undefined" != typeof window && window.console,
        p = function() {},
        h = p,
        f = p;
      m &&
        ((d = console.error),
        (h = function() {
          console.error = function(e) {
            /<head>/.test(e) || d.call(console, e);
          };
        }),
        (f = function() {
          return (console.error = d);
        }));
      var v = (function(e) {
        function t(e, a) {
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, t);
          var n = (function(e, t) {
            if (!e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return !t || ("object" != typeof t && "function" != typeof t)
              ? e
              : t;
          })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, a));
          return (n._isMounted = !1), n;
        }
        return (
          (function(e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof t
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
              t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t));
          })(t, e),
          r(t, [
            {
              key: "componentDidMount",
              value: function() {
                (this._isMounted = !0), this.renderFrameContents();
              }
            },
            {
              key: "componentDidUpdate",
              value: function() {
                this.renderFrameContents();
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this._isMounted = !1;
                var e = this.getDoc(),
                  t = this.getMountTarget();
                e && t && i.default.unmountComponentAtNode(t);
              }
            },
            {
              key: "getDoc",
              value: function() {
                return i.default.findDOMNode(this).contentDocument;
              }
            },
            {
              key: "getMountTarget",
              value: function() {
                var e = this.getDoc();
                return this.props.mountTarget
                  ? e.querySelector(this.props.mountTarget)
                  : e.body.children[0];
              }
            },
            {
              key: "renderFrameContents",
              value: function() {
                if (this._isMounted) {
                  var e = this.getDoc();
                  if (e && "complete" === e.readyState) {
                    null === e.querySelector("div") &&
                      (this._setInitialContent = !1);
                    var t = e.defaultView || e.parentView,
                      a = !this._setInitialContent,
                      n = l.default.createElement(
                        s.default,
                        { document: e, window: t },
                        l.default.createElement(
                          "div",
                          { className: "frame-content" },
                          this.props.head,
                          this.props.children
                        )
                      );
                    a &&
                      (e.open("text/html", "replace"),
                      e.write(this.props.initialContent),
                      e.close(),
                      (this._setInitialContent = !0)),
                      h();
                    var r = a
                        ? this.props.contentDidMount
                        : this.props.contentDidUpdate,
                      o = this.getMountTarget();
                    i.default.unstable_renderSubtreeIntoContainer(
                      this,
                      n,
                      o,
                      r
                    ),
                      f();
                  } else setTimeout(this.renderFrameContents.bind(this), 0);
                }
              }
            },
            {
              key: "render",
              value: function() {
                var e = n({}, this.props, { children: void 0 });
                return (
                  delete e.head,
                  delete e.initialContent,
                  delete e.mountTarget,
                  delete e.contentDidMount,
                  delete e.contentDidUpdate,
                  l.default.createElement("iframe", e)
                );
              }
            }
          ]),
          t
        );
      })(o.Component);
      (v.propTypes = {
        style: c.default.object,
        head: c.default.node,
        initialContent: c.default.string,
        mountTarget: c.default.string,
        contentDidMount: c.default.func,
        contentDidUpdate: c.default.func,
        children: c.default.oneOfType([
          c.default.element,
          c.default.arrayOf(c.default.element)
        ])
      }),
        (v.defaultProps = {
          style: {},
          head: null,
          children: void 0,
          mountTarget: void 0,
          contentDidMount: function() {},
          contentDidUpdate: function() {},
          initialContent:
            '<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'
        }),
        (t.default = v);
    },
    741: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = (function() {
          function e(e, t) {
            for (var a = 0; a < t.length; a++) {
              var n = t[a];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, a, n) {
            return a && e(t.prototype, a), n && e(t, n), t;
          };
        })(),
        r = a(0),
        o = (l(r), l(a(8)));
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function i(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function c(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      var s = (function(e) {
        function t() {
          return (
            i(this, t),
            c(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
            )
          );
        }
        return (
          (function(e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof t
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
              t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t));
          })(t, e),
          n(t, [
            {
              key: "getChildContext",
              value: function() {
                return {
                  document: this.props.document,
                  window: this.props.window
                };
              }
            },
            {
              key: "render",
              value: function() {
                return r.Children.only(this.props.children);
              }
            }
          ]),
          t
        );
      })(r.Component);
      (s.propTypes = {
        document: o.default.object.isRequired,
        window: o.default.object.isRequired,
        children: o.default.element.isRequired
      }),
        (s.childContextTypes = {
          document: o.default.object.isRequired,
          window: o.default.object.isRequired
        }),
        (t.default = s);
    }
  }
]);
