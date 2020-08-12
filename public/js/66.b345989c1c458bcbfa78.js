(window.webpackJsonp = window.webpackJsonp || []).push([
  [66],
  {
    1432: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        o = a(25),
        s = a.n(o),
        l = a(26),
        i = a.n(l),
        c = a(27),
        u = a.n(c),
        m = a(16),
        d = a.n(m),
        f = a(0),
        p = a.n(f),
        h = a(32),
        v = function(e) {
          return { type: "FETCH_QUOTATION_REQUEST_DETAILS", payload: e };
        },
        g = a(22),
        E = a.n(g),
        b = a(6),
        y = a.n(b),
        N = a(4),
        D = a(693),
        R = a(100),
        q = Object(h.b)(null, function(e) {
          return {
            deleteQuotationRequest: function(t) {
              e(
                (function(e) {
                  return { type: "DELETE_QUOTATION_REQUEST", id: e };
                })(t)
              );
            }
          };
        })(function(e) {
          return p.a.createElement(
            R.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return (
                  e.deleteQuotationRequest(e.id), void e.closeDeleteItemModal()
                );
              },
              title: "Verwijderen"
            },
            p.a.createElement(
              "p",
              null,
              "Verwijder offerteverzoek: ",
              p.a.createElement("strong", null, " ", "".concat(e.id), " ")
            )
          );
        }),
        w = a(690),
        k = a(691);
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
            n = d()(e);
          if (t) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var C = (function(e) {
          i()(a, e);
          var t = O(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(E()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              y()(E()(n), "sendMail", function() {
                N.f.push(
                  "/email/nieuw/offerteverzoek/"
                    .concat(n.props.quotationRequestDetails.id, "/")
                    .concat(
                      n.props.quotationRequestDetails.organisation.contactId
                    )
                );
              }),
              (n.state = { showDelete: !1 }),
              n
            );
          }
          return (
            s()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.props.quotationRequestDetails.opportunity,
                    t = void 0 === e ? {} : e,
                    a = t.measure,
                    n = void 0 === a ? {} : a,
                    r = t.intake,
                    o = void 0 === r ? {} : r,
                    s = n.name || "",
                    l = o && o.contact ? o.contact.fullName : "",
                    i = o.fullAddress || "";
                  return p.a.createElement(
                    "div",
                    { className: "row" },
                    p.a.createElement(
                      "div",
                      { className: "col-sm-12" },
                      p.a.createElement(
                        w.a,
                        null,
                        p.a.createElement(
                          k.a,
                          { className: "panel-small" },
                          p.a.createElement(
                            "div",
                            { className: "col-md-2" },
                            p.a.createElement(
                              "div",
                              { className: "btn-group", role: "group" },
                              p.a.createElement(D.a, {
                                iconName: "glyphicon-arrow-left",
                                onClickAction: N.e.goBack
                              }),
                              this.props.permissions.manageQuotationRequest &&
                                p.a.createElement(D.a, {
                                  iconName: "glyphicon-trash",
                                  onClickAction: this.toggleDelete
                                }),
                              p.a.createElement(D.a, {
                                iconName: "glyphicon-envelope",
                                onClickAction: this.sendMail
                              })
                            )
                          ),
                          p.a.createElement(
                            "div",
                            { className: "col-md-8" },
                            p.a.createElement(
                              "h4",
                              { className: "text-center" },
                              "Offerteverzoek "
                                .concat(s, " voor ")
                                .concat(l, " op ")
                                .concat(i)
                            )
                          ),
                          p.a.createElement("div", { className: "col-md-2" })
                        )
                      )
                    ),
                    this.state.showDelete &&
                      p.a.createElement(q, {
                        closeDeleteItemModal: this.toggleDelete,
                        id: this.props.id
                      })
                  );
                }
              }
            ]),
            a
          );
        })(f.Component),
        S = Object(h.b)(function(e) {
          return {
            quotationRequestDetails: e.quotationRequestDetails,
            permissions: e.meDetails.permissions
          };
        })(C),
        A = a(198),
        T = a(7),
        L = a.n(T),
        P = a(190),
        j = a(744),
        z = a(696),
        x = a(692),
        I = a(694),
        M = a(699),
        B = a(734),
        V = a(697),
        F = a.n(V);
      function Q(e, t) {
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
      function W(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Q(Object(a), !0).forEach(function(t) {
                y()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Q(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
          var a,
            n = d()(e);
          if (t) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      L.a.locale("nl");
      var _ = (function(e) {
          i()(a, e);
          var t = U(a);
          function a(e) {
            var n;
            r()(this, a),
              (n = t.call(this, e)),
              y()(E()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  W(
                    W({}, n.state),
                    {},
                    {
                      quotationRequest: W(
                        W({}, n.state.quotationRequest),
                        {},
                        y()({}, r, a)
                      )
                    }
                  )
                );
              }),
              y()(E()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.quotationRequest,
                  a = {},
                  r = !1;
                F.a.isEmpty(t.statusId + "") && ((a.status = !0), (r = !0)),
                  F.a.isEmpty(t.organisationId + "") &&
                    ((a.organisation = !0), (r = !0)),
                  n.setState(W(W({}, n.state), {}, { errors: a })),
                  !r &&
                    P.a.updateQuotationRequest(t).then(function(e) {
                      n.props.fetchQuotationRequestDetails(t.id),
                        n.props.switchToView();
                    });
              });
            var o = e.quotationRequestDetails,
              s = o.id,
              l = o.organisation,
              i = o.dateRecorded,
              c = o.status,
              u = o.datePlannedToSendWfEmailStatus,
              m = o.dateReleased,
              d = o.quotationText,
              f = o.opportunity;
            return (
              (n.state = {
                opportunity: {
                  fullName: f.intake ? f.intake.contact.fullName : "",
                  fullAddress: f.intake ? f.intake.fullAddress : "",
                  measureNames:
                    f.measures &&
                    f.measures
                      .map(function(e) {
                        return e.name;
                      })
                      .join(", "),
                  measureCategoryName: f.measureCategory.name
                },
                organisations: [],
                quotationRequest: {
                  id: s,
                  opportunityId: f.id,
                  organisationId: l.id,
                  dateRecorded: i || "",
                  statusId: c.id,
                  statusUsesWf: !!c && c.usesWf,
                  datePlannedToSendWfEmailStatus: u ? L()(u).format("L") : "",
                  dateReleased: m || "",
                  quotationText: d || ""
                },
                errors: { organisation: !1, status: !1 }
              }),
              (n.handleInputChangeDate = n.handleInputChangeDate.bind(E()(n))),
              n
            );
          }
          return (
            s()(a, [
              {
                key: "componentWillMount",
                value: function() {
                  var e = this;
                  j.a.getOrganisationPeek().then(function(t) {
                    e.setState({ organisations: t });
                  });
                }
              },
              {
                key: "handleInputChangeDate",
                value: function(e, t) {
                  this.setState(
                    W(
                      W({}, this.state),
                      {},
                      {
                        quotationRequest: W(
                          W({}, this.state.quotationRequest),
                          {},
                          y()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.quotationRequest,
                    t = e.organisationId,
                    a = e.dateRecorded,
                    n = e.statusId,
                    r = e.statusUsesWf,
                    o = e.datePlannedToSendWfEmailStatus,
                    s = e.dateReleased,
                    l = e.quotationText,
                    i = this.state.opportunity,
                    c = i.fullName,
                    u = i.fullAddress,
                    m = i.measureNames,
                    d = i.measureCategoryName;
                  return p.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    p.a.createElement(
                      "div",
                      { className: "row" },
                      p.a.createElement(z.a, {
                        label: "Organisatie",
                        size: "col-sm-6",
                        name: "organisationId",
                        value: t,
                        options: this.state.organisations,
                        onChangeAction: this.handleInputChange,
                        required: "required",
                        error: this.state.errors.organisation
                      }),
                      p.a.createElement(I.a, {
                        label: "Verzoek voor",
                        name: "fullName",
                        value: c,
                        onChange: function() {},
                        readOnly: !0
                      })
                    ),
                    p.a.createElement(
                      "div",
                      { className: "row" },
                      p.a.createElement(I.a, {
                        label: "Adres voor",
                        name: "address",
                        value: u,
                        onChange: function() {},
                        readOnly: !0
                      }),
                      p.a.createElement(I.a, {
                        label: "Maatregel - categorie",
                        name: "measureCategory",
                        value: d,
                        onChange: function() {},
                        readOnly: !0
                      })
                    ),
                    p.a.createElement(
                      "div",
                      { className: "row" },
                      p.a.createElement(I.a, {
                        label: "Maatregel - specifiek",
                        name: "measure",
                        value: m,
                        onChange: function() {},
                        readOnly: !0
                      }),
                      p.a.createElement(M.a, {
                        label: "Datum opname",
                        size: "col-sm-6",
                        name: "dateRecorded",
                        value: a,
                        onChangeAction: this.handleInputChangeDate
                      })
                    ),
                    p.a.createElement(
                      "div",
                      { className: "row" },
                      p.a.createElement(z.a, {
                        label: "Offerte status",
                        size: "col-sm-6",
                        name: "statusId",
                        value: n,
                        options: this.props.quotationRequestStatus,
                        onChangeAction: this.handleInputChange,
                        required: "required",
                        error: this.state.errors.status
                      }),
                      r
                        ? p.a.createElement(I.a, {
                            label: "Datum workflow email",
                            name: "datePlannedToSendWfEmailStatus",
                            value: o,
                            onChange: function() {},
                            readOnly: !0
                          })
                        : ""
                    ),
                    p.a.createElement(
                      "div",
                      { className: "row" },
                      p.a.createElement(M.a, {
                        label: "Offerte uitgebracht",
                        size: "col-sm-6",
                        name: "dateReleased",
                        value: s,
                        onChangeAction: this.handleInputChangeDate
                      })
                    ),
                    p.a.createElement(
                      "div",
                      { className: "row" },
                      p.a.createElement(B.a, {
                        label: "Offerte omschrijving",
                        name: "quotationText",
                        value: l,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    p.a.createElement(
                      "div",
                      { className: "panel-footer" },
                      p.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        p.a.createElement(x.a, {
                          buttonText: "Opslaan",
                          onClickAction: this.handleSubmit
                        })
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(f.Component),
        G = Object(h.b)(
          function(e) {
            return {
              quotationRequestStatus: e.systemData.quotationRequestStatus,
              quotationRequestDetails: e.quotationRequestDetails
            };
          },
          function(e) {
            return {
              fetchQuotationRequestDetails: function(t) {
                e(v(t));
              }
            };
          }
        )(_),
        Y = a(695);
      L.a.locale("nl");
      var J = Object(h.b)(function(e) {
        return { quotationRequestDetails: e.quotationRequestDetails };
      })(function(e) {
        var t = e.quotationRequestDetails,
          a = t.organisation,
          n = t.dateRecorded,
          r = t.status,
          o = t.datePlannedToSendWfEmailStatus,
          s = t.dateReleased,
          l = t.quotationText,
          i = t.opportunity;
        return p.a.createElement(
          "div",
          { onClick: e.switchToEdit },
          p.a.createElement(
            "div",
            { className: "row" },
            p.a.createElement(Y.a, {
              label: "Organisatie",
              value: a && a.name,
              link: a ? "contact/" + a.contact.id : ""
            }),
            p.a.createElement(Y.a, {
              label: "Verzoek voor",
              value: i.intake && i.intake.contact.fullName
            })
          ),
          p.a.createElement(
            "div",
            { className: "row" },
            p.a.createElement(Y.a, {
              label: "Organisatie contactpersoon",
              value: a.contact.contactPerson
                ? a.contact.contactPerson.contact.fullName
                : "",
              link: a.contact.contactPerson
                ? "contact/" + a.contact.contactPerson.contact.id
                : ""
            })
          ),
          p.a.createElement(
            "div",
            { className: "row" },
            p.a.createElement(Y.a, {
              label: "Adres voor",
              value: i.intake && i.intake.fullAddress
            }),
            p.a.createElement(Y.a, {
              label: "Maatregel categorie",
              value: i.measureCategory && i.measureCategory.name
            })
          ),
          p.a.createElement(
            "div",
            { className: "row" },
            p.a.createElement(Y.a, {
              label: "Maatregelen specifiek",
              value:
                i.measures &&
                i.measures
                  .map(function(e) {
                    return e.name;
                  })
                  .join(", ")
            }),
            p.a.createElement(Y.a, {
              label: "Datum opname",
              value: n ? L()(n).format("L") : ""
            })
          ),
          p.a.createElement(
            "div",
            { className: "row" },
            p.a.createElement(Y.a, {
              label: "Offerte status",
              value: r && r.name
            }),
            r && r.usesWf
              ? p.a.createElement(Y.a, {
                  label: "Datum workflow email",
                  value: o ? L()(o).format("L") : ""
                })
              : "",
            ";"
          ),
          p.a.createElement(
            "div",
            { className: "row" },
            p.a.createElement(Y.a, {
              label: "Offerte uitgebracht",
              value: s ? L()(s).format("L") : ""
            })
          ),
          p.a.createElement(
            "div",
            { className: "row" },
            p.a.createElement(
              "div",
              { className: "col-sm-3" },
              p.a.createElement(
                "label",
                { htmlFor: "quotationText", className: "col-sm-12" },
                "Offerte omschrijving"
              )
            ),
            p.a.createElement(
              "div",
              { className: "col-sm-9", id: "quotationText" },
              l
            )
          )
        );
      });
      function H(e) {
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
            n = d()(e);
          if (t) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var Z = (function(e) {
          i()(a, e);
          var t = H(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(E()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              y()(E()(n), "switchToView", function() {
                n.setState({ showEdit: !1, activeDiv: "" });
              }),
              (n.state = { showEdit: !1, activeDiv: "" }),
              n
            );
          }
          return (
            s()(a, [
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
                  return p.a.createElement(
                    w.a,
                    {
                      className: this.state.activeDiv,
                      onMouseEnter: function() {
                        return e.onDivEnter();
                      },
                      onMouseLeave: function() {
                        return e.onDivLeave();
                      }
                    },
                    p.a.createElement(
                      k.a,
                      null,
                      p.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        this.state.showEdit &&
                          this.props.permissions.manageQuotationRequest
                          ? p.a.createElement(G, {
                              switchToView: this.switchToView
                            })
                          : p.a.createElement(J, {
                              switchToEdit: this.switchToEdit
                            })
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(f.Component),
        K = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(Z);
      L.a.locale("nl");
      var X = Object(h.b)(function(e) {
          return { quotationRequestDetails: e.quotationRequestDetails };
        })(function(e) {
          var t = e.quotationRequestDetails,
            a = t.createdAt,
            n = t.updatedAt,
            r = t.updatedBy,
            o = t.createdBy;
          return p.a.createElement(
            "div",
            null,
            p.a.createElement(
              "div",
              { className: "row" },
              p.a.createElement(Y.a, {
                label: "Gemaakt door",
                value: o ? o.fullName : "Onbekend",
                link: o ? "gebruiker/" + o.id : ""
              }),
              p.a.createElement(Y.a, {
                label: "Laatste update door",
                value: r ? r.fullName : "Onbekend",
                link: r ? "gebruiker/" + r.id : ""
              })
            ),
            p.a.createElement(
              "div",
              { className: "row" },
              p.a.createElement(Y.a, {
                label: "Gemaakt op",
                value: a ? L()(a).format("L") : "Onbekend"
              }),
              p.a.createElement(Y.a, {
                label: "Laatste update op",
                value: n ? L()(n).format("L") : "Onbekend"
              })
            )
          );
        }),
        $ = a(698),
        ee = function(e) {
          return p.a.createElement(
            w.a,
            null,
            p.a.createElement(
              $.a,
              null,
              p.a.createElement(
                "span",
                { className: "h5 text-bold" },
                "Afsluiting gegevens"
              )
            ),
            p.a.createElement(
              k.a,
              null,
              p.a.createElement(
                "div",
                { className: "col-md-12" },
                p.a.createElement(X, null)
              )
            )
          );
        };
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
            n = d()(e);
          if (t) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var ae = (function(e) {
          i()(a, e);
          var t = te(a);
          function a(e) {
            return r()(this, a), t.call(this, e);
          }
          return (
            s()(a, [
              {
                key: "render",
                value: function() {
                  var e = "",
                    t = !0;
                  return (
                    this.props.hasError
                      ? (e = "Fout bij het ophalen van offerteverzoek.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : Object(A.isEmpty)(this.props.quotationRequestDetails)
                      ? (e = "Geen offerteverzoek gevonden!")
                      : (t = !1),
                    t
                      ? p.a.createElement("div", null, e)
                      : p.a.createElement(
                          "div",
                          null,
                          p.a.createElement(K, null),
                          p.a.createElement(ee, null)
                        )
                  );
                }
              }
            ]),
            a
          );
        })(f.Component),
        ne = Object(h.b)(function(e) {
          return {
            quotationRequestDetails: e.quotationRequestDetails,
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        }, null)(ae);
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
            n = d()(e);
          if (t) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var oe = (function(e) {
          i()(a, e);
          var t = re(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(E()(n), "openItem", function(e) {
                N.f.push("/document/".concat(e));
              }),
              (n.state = { relatedDocuments: "" }),
              n
            );
          }
          return (
            s()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedDocuments;
                  return p.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      p.a.createElement(
                        "div",
                        null,
                        "Geen documenten gevonden."
                      ),
                    "" != t &&
                      p.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        p.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return p.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: a
                              },
                              p.a.createElement(
                                "td",
                                { className: "col-xs-5 clickable" },
                                L()(t.createdAt).format("L")
                              ),
                              p.a.createElement(
                                "td",
                                { className: "col-xs-6 clickable" },
                                t.filename
                              )
                            );
                          })
                        )
                      )
                  );
                }
              }
            ]),
            a
          );
        })(f.Component),
        se = Object(h.b)(function(e) {
          return {
            relatedDocuments: e.quotationRequestDetails.relatedDocuments
          };
        })(oe),
        le = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showDocumentsList,
            n = e.newDocument,
            r = e.documentCount,
            o = e.permissions;
          return p.a.createElement(
            w.a,
            { className: "harmonica-button" },
            p.a.createElement(
              k.a,
              null,
              p.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                p.a.createElement(
                  "span",
                  null,
                  "DOCUMENTEN ",
                  p.a.createElement("span", { className: "badge" }, r)
                )
              ),
              p.a.createElement(
                "div",
                { className: "col-sm-2" },
                o.createDocument &&
                  p.a.createElement(
                    "div",
                    { className: "pull-right" },
                    p.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white",
                      "data-toggle": "dropdown",
                      role: "button"
                    }),
                    p.a.createElement(
                      "ul",
                      { className: "dropdown-menu" },
                      p.a.createElement(
                        "li",
                        null,
                        p.a.createElement(
                          "a",
                          {
                            className: "btn",
                            onClick: function() {
                              return n("internal");
                            }
                          },
                          "Maak document"
                        )
                      ),
                      p.a.createElement(
                        "li",
                        null,
                        p.a.createElement(
                          "a",
                          {
                            className: "btn",
                            onClick: function() {
                              return n("upload");
                            }
                          },
                          "Upload document"
                        )
                      )
                    )
                  )
              ),
              p.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && p.a.createElement(se, null)
              )
            )
          );
        });
      function ie(e) {
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
            n = d()(e);
          if (t) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var ce = (function(e) {
          i()(a, e);
          var t = ie(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(E()(n), "openItem", function(e) {
                N.f.push("/email/".concat(e));
              }),
              (n.state = { relatedOpportunities: "" }),
              n
            );
          }
          return (
            s()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedEmailsSent;
                  return p.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      p.a.createElement("div", null, "Geen e-mails gevonden."),
                    "" != t &&
                      p.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        p.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return p.a.createElement(
                              "tr",
                              { key: a },
                              p.a.createElement(
                                "td",
                                {
                                  className: "col-xs-4 clickable",
                                  onClick: function() {
                                    return e.openItem(t.id);
                                  }
                                },
                                L()(t.date_sent).format("L")
                              ),
                              p.a.createElement(
                                "td",
                                {
                                  className: "col-xs-8 clickable",
                                  onClick: function() {
                                    return e.openItem(t.id);
                                  }
                                },
                                t.subject
                              )
                            );
                          })
                        )
                      )
                  );
                }
              }
            ]),
            a
          );
        })(f.Component),
        ue = Object(h.b)(function(e) {
          return {
            relatedEmailsSent: e.quotationRequestDetails.relatedEmailsSent
          };
        })(ce),
        me = function(e) {
          var t = e.toggleShowList,
            a = e.showEmailsSentList,
            n = e.newEmail,
            r = e.emailSentCount;
          return p.a.createElement(
            w.a,
            { className: "harmonica-button" },
            p.a.createElement(
              k.a,
              null,
              p.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                p.a.createElement(
                  "span",
                  { onClick: t, className: "" },
                  "E-MAIL VERZONDEN ",
                  p.a.createElement("span", { className: "badge" }, r)
                )
              ),
              p.a.createElement(
                "div",
                { className: "col-sm-2" },
                p.a.createElement(
                  "a",
                  { role: "button", className: "pull-right", onClick: n },
                  p.a.createElement("span", {
                    className: "glyphicon glyphicon-plus glyphicon-white"
                  })
                )
              ),
              p.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && p.a.createElement(ue, null)
              )
            )
          );
        };
      function de(e, t) {
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
      function fe(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? de(Object(a), !0).forEach(function(t) {
                y()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : de(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function pe(e) {
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
            n = d()(e);
          if (t) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var he = (function(e) {
          i()(a, e);
          var t = pe(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              ((n = t.call(this, e)).state = {
                toggleShowList: { documents: !1, emailsSent: !1 }
              }),
              (n.newDocument = n.newDocument.bind(E()(n))),
              (n.newEmail = n.newEmail.bind(E()(n))),
              (n.toggleShowList = n.toggleShowList.bind(E()(n))),
              n
            );
          }
          return (
            s()(a, [
              {
                key: "newEmail",
                value: function() {
                  N.f.push(
                    "/email/nieuw/offerteverzoek/"
                      .concat(this.props.id, "/")
                      .concat(
                        this.props.quotationRequestDetails.organisation
                          .contactId
                      )
                  );
                }
              },
              {
                key: "newDocument",
                value: function(e) {
                  N.f.push(
                    "/document/nieuw/"
                      .concat(e, "/offerteverzoek/")
                      .concat(this.props.id)
                  );
                }
              },
              {
                key: "toggleShowList",
                value: function(e) {
                  this.setState(
                    fe(
                      fe({}, this.state),
                      {},
                      {
                        toggleShowList: fe(
                          fe({}, this.state.toggleShowList),
                          {},
                          y()({}, e, !this.state.toggleShowList[e])
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this;
                  return p.a.createElement(
                    "div",
                    { className: "col-md-12 margin-10-top" },
                    p.a.createElement(me, {
                      toggleShowList: function() {
                        return e.toggleShowList("emailsSent");
                      },
                      showEmailsSentList: this.state.toggleShowList.emailsSent,
                      newEmail: this.newEmail,
                      emailSentCount: this.props.quotationRequestDetails
                        .emailSentCount
                    }),
                    p.a.createElement(le, {
                      toggleShowList: function() {
                        return e.toggleShowList("documents");
                      },
                      showDocumentsList: this.state.toggleShowList.documents,
                      newDocument: this.newDocument,
                      documentCount: this.props.quotationRequestDetails
                        .documentCount
                    })
                  );
                }
              }
            ]),
            a
          );
        })(f.Component),
        ve = Object(h.b)(function(e) {
          return {
            quotationRequestDetails: e.quotationRequestDetails,
            permissions: e.meDetails.permissions
          };
        })(he);
      function ge(e) {
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
            n = d()(e);
          if (t) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var Ee = (function(e) {
        i()(a, e);
        var t = ge(a);
        function a(e) {
          return r()(this, a), t.call(this, e);
        }
        return (
          s()(a, [
            {
              key: "componentWillMount",
              value: function() {
                this.props.fetchQuotationRequestDetails(this.props.params.id);
              }
            },
            {
              key: "render",
              value: function() {
                return p.a.createElement(
                  "div",
                  { className: "row" },
                  p.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    p.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      p.a.createElement(S, { id: this.props.params.id })
                    ),
                    p.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      p.a.createElement(ne, null)
                    )
                  ),
                  p.a.createElement(
                    w.a,
                    { className: "col-md-3 harmonica" },
                    p.a.createElement(
                      k.a,
                      null,
                      p.a.createElement(ve, { id: this.props.params.id })
                    )
                  )
                );
              }
            }
          ]),
          a
        );
      })(f.Component);
      t.default = Object(h.b)(null, function(e) {
        return {
          fetchQuotationRequestDetails: function(t) {
            e(v(t));
          }
        };
      })(Ee);
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        l = function(e) {
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
      (l.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (l.propTypes = {
          className: s.a.string,
          onMouseEnter: s.a.func,
          onMouseLeave: s.a.func
        }),
        (t.a = l);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        l = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (l.defaultProps = { className: "" }),
        (l.propTypes = { className: s.a.string }),
        (t.a = l);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        l = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            o = e.type,
            s = e.value,
            l = e.loading,
            i = e.loadText,
            c = e.disabled;
          return l
            ? r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: s,
                  disabled: l
                },
                r.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                i
              )
            : r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: s,
                  disabled: c
                },
                a
              );
        };
      (l.defaultProps = {
        buttonClassName: "btn-success",
        type: "button",
        value: "",
        loading: !1,
        loadText: "Aan het laden",
        disabled: !1
      }),
        (l.propTypes = {
          buttonClassName: s.a.string,
          buttonText: s.a.string.isRequired,
          onClickAction: s.a.func,
          type: s.a.string,
          value: s.a.string,
          loading: s.a.bool,
          loadText: s.a.string,
          disabled: s.a.bool
        }),
        (t.a = l);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        l = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            o = e.title,
            s = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: s,
              title: o
            },
            r.a.createElement("span", { className: "glyphicon ".concat(a) })
          );
        };
      (l.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (l.propTypes = {
          buttonClassName: s.a.string,
          iconName: s.a.string.isRequired,
          onClickAction: s.a.func,
          title: s.a.string,
          disabled: s.a.bool
        }),
        (t.a = l);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        l = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            o = e.size,
            s = e.id,
            l = e.placeholder,
            i = e.name,
            c = e.value,
            u = e.onClickAction,
            m = e.onChangeAction,
            d = e.onBlurAction,
            f = e.required,
            p = e.readOnly,
            h = e.maxLength,
            v = e.error,
            g = e.min,
            E = e.max,
            b = e.step,
            y = e.errorMessage,
            N = e.divSize,
            D = e.divClassName,
            R = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(N, " ").concat(D) },
            r.a.createElement(
              "label",
              { htmlFor: s, className: "col-sm-6 ".concat(f) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(o) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (v ? "has-error" : ""),
                id: s,
                placeholder: l,
                name: i,
                value: c,
                onClick: u,
                onChange: m,
                onBlur: d,
                readOnly: p,
                maxLength: h,
                min: g,
                max: E,
                autoComplete: R,
                step: b
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
                  y
                )
              )
          );
        };
      (l.defaultProps = {
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
        (l.propTypes = {
          label: s.a.oneOfType([s.a.string, s.a.object]).isRequired,
          type: s.a.string,
          className: s.a.string,
          divClassName: s.a.string,
          size: s.a.string,
          divSize: s.a.string,
          id: s.a.string,
          placeholder: s.a.string,
          name: s.a.string.isRequired,
          value: s.a.oneOfType([s.a.string, s.a.number]),
          onClickAction: s.a.func,
          onChangeAction: s.a.func,
          onBlurAction: s.a.func,
          required: s.a.string,
          readOnly: s.a.bool,
          maxLength: s.a.string,
          error: s.a.bool,
          min: s.a.string,
          max: s.a.string,
          step: s.a.string,
          errorMessage: s.a.string,
          autoComplete: s.a.string
        }),
        (t.a = l);
    },
    695: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(4),
        s = a(8),
        l = a.n(s),
        i = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            s = e.value,
            l = e.link,
            i = e.hidden;
          return l.length > 0
            ? r.a.createElement(
                "div",
                { className: a, style: i ? { display: "none" } : {} },
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
                    { to: l, className: "link-underline" },
                    s
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: a, style: i ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement("div", { className: "col-sm-6", id: n }, s)
              );
        };
      (i.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (i.propTypes = {
          label: l.a.oneOfType([l.a.string, l.a.object]).isRequired,
          className: l.a.string,
          id: l.a.string,
          value: l.a.oneOfType([l.a.string, l.a.number]),
          link: l.a.string,
          hidden: l.a.bool
        }),
        (t.a = i);
    },
    696: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        l = function(e) {
          var t = e.label,
            a = e.className,
            n = e.size,
            o = e.id,
            s = e.name,
            l = e.value,
            i = e.options,
            c = e.onChangeAction,
            u = e.onBlurAction,
            m = e.required,
            d = e.error,
            f = e.errorMessage,
            p = e.optionValue,
            h = e.optionName,
            v = e.readOnly,
            g = e.placeholder,
            E = e.divClassName,
            b = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(E) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(m) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-6" },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(a) + (d && " has-error"),
                  id: o,
                  name: s,
                  value: l,
                  onChange: c,
                  onBlur: u,
                  readOnly: v
                },
                b && r.a.createElement("option", { value: "" }, g),
                i.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[p], value: e[p] },
                    e[h]
                  );
                })
              )
            ),
            d &&
              r.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                r.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  f
                )
              )
          );
        };
      (l.defaultProps = {
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
        (l.propTypes = {
          label: s.a.string.isRequired,
          className: s.a.string,
          size: s.a.string,
          id: s.a.string,
          name: s.a.string.isRequired,
          options: s.a.array,
          value: s.a.oneOfType([s.a.string, s.a.number]),
          onChangeAction: s.a.func,
          onBlurAction: s.a.func,
          required: s.a.string,
          readOnly: s.a.bool,
          error: s.a.bool,
          errorMessage: s.a.string,
          emptyOption: s.a.bool,
          optionValue: s.a.string,
          optionName: s.a.string,
          placeholder: s.a.string
        }),
        (t.a = l);
    },
    698: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        l = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-heading ".concat(t) },
            a
          );
        };
      (l.defaultProps = { className: "" }),
        (l.propTypes = { className: s.a.string }),
        (t.a = l);
    },
    699: function(e, t, a) {
      "use strict";
      var n = a(24),
        r = a.n(n),
        o = a(25),
        s = a.n(o),
        l = a(22),
        i = a.n(l),
        c = a(26),
        u = a.n(c),
        m = a(27),
        d = a.n(m),
        f = a(16),
        p = a.n(f),
        h = a(6),
        v = a.n(h),
        g = a(0),
        E = a.n(g),
        b = a(8),
        y = a.n(b),
        N = a(707),
        D = a.n(N),
        R = a(708),
        q = a.n(R),
        w = a(7),
        k = a.n(w);
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
            n = p()(e);
          if (t) {
            var r = p()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return d()(this, a);
        };
      }
      k.a.locale("nl");
      var C = (function(e) {
        u()(a, e);
        var t = O(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            v()(i()(n), "validateDate", function(e) {
              var t = k()(e.target.value, "DD-MM-YYYY", !0),
                a = !1;
              t.isValid() || "" === e.target.value || (a = !0),
                n.props.disabledBefore &&
                  t.isBefore(n.props.disabledBefore) &&
                  (a = !0),
                n.props.disabledAfter &&
                  t.isAfter(n.props.disabledAfter) &&
                  (a = !0),
                n.setState({ errorDateFormat: a });
            }),
            v()(i()(n), "onDateChange", function(e) {
              var t = e ? k()(e).format("Y-MM-DD") : "",
                a = !1;
              t &&
                n.props.disabledBefore &&
                k()(t).isBefore(n.props.disabledBefore) &&
                (a = !0),
                t &&
                  n.props.disabledAfter &&
                  k()(t).isAfter(n.props.disabledAfter) &&
                  (a = !0),
                n.setState({ errorDateFormat: a }),
                !a && n.props.onChangeAction(t, n.props.name);
            }),
            (n.state = { errorDateFormat: !1 }),
            n
          );
        }
        return (
          s()(a, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.label,
                  a = e.className,
                  n = e.size,
                  r = e.divSize,
                  o = e.id,
                  s = e.value,
                  l = e.required,
                  i = e.readOnly,
                  c = e.name,
                  u = e.error,
                  m = e.errorMessage,
                  d = e.disabledBefore,
                  f = e.disabledAfter,
                  p = s ? k()(s).format("L") : "",
                  h = {};
                return (
                  d && (h.before = new Date(d)),
                  f && (h.after = new Date(f)),
                  E.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    E.a.createElement(
                      "div",
                      null,
                      E.a.createElement(
                        "label",
                        { htmlFor: o, className: "col-sm-6 ".concat(l) },
                        t
                      )
                    ),
                    E.a.createElement(
                      "div",
                      { className: "".concat(n) },
                      E.a.createElement(D.a, {
                        id: o,
                        value: p,
                        formatDate: R.formatDate,
                        parseDate: R.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: q.a,
                          disabledDays: h
                        },
                        inputProps: {
                          className:
                            "form-control input-sm ".concat(a) +
                            (this.state.errorDateFormat || u
                              ? " has-error"
                              : ""),
                          name: c,
                          onBlur: this.validateDate,
                          autoComplete: "off",
                          readOnly: i,
                          disabled: i
                        },
                        required: l,
                        readOnly: i,
                        placeholder: ""
                      })
                    ),
                    u &&
                      E.a.createElement(
                        "div",
                        { className: "col-sm-offset-6 col-sm-6" },
                        E.a.createElement(
                          "span",
                          { className: "has-error-message" },
                          " ",
                          m
                        )
                      )
                  )
                );
              }
            }
          ]),
          a
        );
      })(g.Component);
      (C.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        required: "",
        readOnly: !1,
        value: null,
        error: !1,
        errorMessage: "",
        disabledBefore: null,
        disabledAfter: null
      }),
        (C.propTypes = {
          label: y.a.string.isRequired,
          type: y.a.string,
          className: y.a.string,
          size: y.a.string,
          divSize: y.a.string,
          id: y.a.string,
          name: y.a.string,
          value: y.a.oneOfType([y.a.string, y.a.object]),
          onChangeAction: y.a.func,
          required: y.a.string,
          readOnly: y.a.bool,
          error: y.a.bool,
          errorMessage: y.a.string,
          disabledBefore: y.a.string,
          disabledAfter: y.a.string
        }),
        (t.a = C);
    },
    734: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        l = function(e) {
          var t = e.label,
            a = e.size,
            n = e.sizeLabel,
            o = e.sizeInput,
            s = e.id,
            l = e.name,
            i = e.value,
            c = e.onChangeAction,
            u = e.required,
            m = e.error,
            d = e.rows;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(a) },
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(
                "div",
                { className: n },
                r.a.createElement(
                  "label",
                  { htmlFor: s, className: "col-sm-12 ".concat(u) },
                  t
                )
              ),
              r.a.createElement(
                "div",
                { className: o },
                r.a.createElement("textarea", {
                  name: l,
                  value: i,
                  onChange: c,
                  className: "form-control input-sm " + (m ? "has-error" : ""),
                  rows: d
                })
              )
            )
          );
        };
      (l.defaultProps = {
        size: "col-sm-12",
        sizeLabel: "col-sm-3",
        sizeInput: "col-sm-9",
        value: "",
        required: "",
        error: !1,
        rows: "5"
      }),
        (l.propTypes = {
          label: s.a.string.isRequired,
          type: s.a.string,
          size: s.a.string,
          sizeLabel: s.a.string,
          sizeInput: s.a.string,
          id: s.a.string,
          name: s.a.string.isRequired,
          value: s.a.oneOfType([s.a.string, s.a.number]),
          onChangeAction: s.a.func,
          required: s.a.string,
          error: s.a.bool
        }),
        (t.a = l);
    },
    744: function(e, t, a) {
      "use strict";
      var n = a(2),
        r = a.n(n),
        o = "".concat(URL_API, "/api/organisation");
      t.a = {
        newOrganisation: function(e) {
          var t = "".concat(o),
            a = "Bearer " + localStorage.getItem("access_token");
          return (
            (r.a.defaults.headers.common.Authorization = a),
            r.a
              .post(t, e)
              .then(function(e) {
                return e.data.data;
              })
              .catch(function(e) {
                console.log(e);
              })
          );
        },
        updateOrganisation: function(e) {
          var t = "".concat(o, "/").concat(e.id),
            a = "Bearer " + localStorage.getItem("access_token");
          return (
            (r.a.defaults.headers.common.Authorization = a), r.a.post(t, e)
          );
        },
        getOrganisationPeek: function() {
          var e = "".concat(o, "/peek"),
            t = "Bearer " + localStorage.getItem("access_token");
          return (
            (r.a.defaults.headers.common.Authorization = t),
            r.a
              .get(e)
              .then(function(e) {
                return e.data.data;
              })
              .catch(function(e) {
                console.log(e);
              })
          );
        }
      };
    }
  }
]);
