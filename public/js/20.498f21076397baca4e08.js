(window.webpackJsonp = window.webpackJsonp || []).push([
  [20],
  {
    1425: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        o = a(25),
        i = a.n(o),
        l = a(26),
        s = a.n(l),
        c = a(27),
        u = a.n(c),
        m = a(16),
        d = a.n(m),
        p = a(0),
        f = a.n(p),
        h = a(32),
        v = a(22),
        g = a.n(v),
        y = a(6),
        E = a.n(y),
        b = a(4),
        N = a(690),
        k = a(691),
        w = a(693),
        C = a(100),
        D = a(806),
        O = Object(h.b)(null, function(e) {
          return {
            deleteOpportunity: function(t, a) {
              e(Object(D.b)(t, a));
            }
          };
        })(function(e) {
          return f.a.createElement(
            C.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return (
                  e.deleteOpportunity(e.id, e.contactId),
                  void e.closeDeleteItemModal()
                );
              },
              title: "Verwijderen"
            },
            f.a.createElement(
              "p",
              null,
              "Weet u zeker dat u deze kans wilt verwijderen?"
            )
          );
        });
      function S(e) {
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
      var T = (function(e) {
          s()(a, e);
          var t = S(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(g()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              (n.state = { showDelete: !1 }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.props.opportunity,
                    t = e.measureCategory,
                    a = e.intake,
                    n = e.id;
                  return f.a.createElement(
                    "div",
                    { className: "row" },
                    f.a.createElement(
                      "div",
                      { className: "col-sm-12" },
                      f.a.createElement(
                        N.a,
                        null,
                        f.a.createElement(
                          k.a,
                          { className: "panel-small" },
                          f.a.createElement(
                            "div",
                            { className: "col-md-2" },
                            f.a.createElement(
                              "div",
                              {
                                className:
                                  "btn-group btn-group-flex margin-small",
                                role: "group"
                              },
                              f.a.createElement(w.a, {
                                iconName: "glyphicon-arrow-left",
                                onClickAction: b.e.goBack
                              }),
                              this.props.permissions.manageOpportunity &&
                                f.a.createElement(w.a, {
                                  iconName: "glyphicon-trash",
                                  onClickAction: this.toggleDelete
                                })
                            )
                          ),
                          f.a.createElement(
                            "div",
                            { className: "col-md-8" },
                            f.a.createElement(
                              "h4",
                              {
                                className:
                                  "text-center text-success margin-small"
                              },
                              f.a.createElement(
                                "strong",
                                null,
                                t ? "Kans: " + t.name : "",
                                " ",
                                a ? "voor " + a.contact.fullName : ""
                              )
                            )
                          ),
                          f.a.createElement("div", { className: "col-md-2" })
                        )
                      )
                    ),
                    this.state.showDelete &&
                      f.a.createElement(O, {
                        closeDeleteItemModal: this.toggleDelete,
                        id: n,
                        contactId: a ? a.contact.id : 0
                      })
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        R = Object(h.b)(function(e) {
          return {
            opportunity: e.opportunityDetails,
            permissions: e.meDetails.permissions
          };
        })(T),
        L = a(198),
        j = a(697),
        P = a.n(j),
        A = a(694),
        x = a(696),
        q = a(699),
        I = a(692),
        M = a(702),
        z = a(110),
        B = a(734),
        F = a(723),
        _ = a(835),
        V = a(7),
        W = a.n(V),
        X = a(695),
        G = Object(h.b)(function(e) {
          return { opportunity: e.opportunityDetails };
        })(function(e) {
          var t = e.opportunity,
            a = t.status,
            n = t.datePlannedToSendWfEmailStatus,
            r = t.quotationText,
            o = t.evaluationAgreedDate,
            i = t.desiredDate,
            l = t.intake,
            s = t.measureCategory,
            c = t.measures;
          return f.a.createElement(
            "div",
            null,
            f.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              f.a.createElement(X.a, {
                label: "Contact",
                value: l && l.contact.fullName,
                link: l ? "contact/" + l.contact.id : ""
              }),
              f.a.createElement(X.a, {
                label: "Adres",
                value: l && l.fullAddress
              })
            ),
            f.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              f.a.createElement(X.a, {
                label: "Maatregel - categorie",
                value: s && s.name
              }),
              f.a.createElement(X.a, {
                label: "Campagne",
                value: l && l.campaign ? l.campaign.name : ""
              })
            ),
            f.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              f.a.createElement(X.a, {
                label: "Maatregel - specifiek",
                value:
                  c &&
                  c
                    .map(function(e) {
                      return e.name;
                    })
                    .join(", ")
              })
            ),
            f.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              f.a.createElement(X.a, { label: "Status", value: a && a.name }),
              a && a.usesWf
                ? f.a.createElement(X.a, {
                    label: "Datum workflow email",
                    value: n ? W()(n).format("L") : ""
                  })
                : ""
            ),
            f.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              f.a.createElement(
                "div",
                { className: "col-sm-3" },
                f.a.createElement(
                  "label",
                  { htmlFor: "quotationText", className: "col-sm-12" },
                  "Toelichting op maatregel"
                )
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-9", id: "quotationText" },
                r
              )
            ),
            f.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              f.a.createElement(X.a, {
                label: "Datum uitvoering",
                value: i ? W()(i).format("L") : ""
              }),
              f.a.createElement(X.a, {
                label: "Datum evaluatie",
                value: o ? W()(o).format("L") : ""
              })
            )
          );
        });
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
      function Y(e) {
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
      function K(e) {
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
      W.a.locale("nl");
      var J = (function(e) {
          s()(a, e);
          var t = K(a);
          function a(e) {
            var n;
            r()(this, a),
              (n = t.call(this, e)),
              E()(g()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Y(
                    Y({}, n.state),
                    {},
                    {
                      opportunity: Y(
                        Y({}, n.state.opportunity),
                        {},
                        E()({}, r, a)
                      )
                    }
                  )
                );
              }),
              E()(g()(n), "handleMeasureIds", function(e) {
                n.setState(
                  Y(
                    Y({}, n.state),
                    {},
                    {
                      opportunity: Y(
                        Y({}, n.state.opportunity),
                        {},
                        { measureIds: e }
                      )
                    }
                  )
                );
              }),
              E()(g()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.opportunity,
                  a = {},
                  r = !1;
                P.a.isEmpty("" + t.statusId)
                  ? ((a.statusId = !0), (r = !0))
                  : "Uitvoering" ===
                      n.state.status.find(function(e) {
                        return e.id == t.statusId;
                      }).name &&
                    P.a.isEmpty(t.desiredDate) &&
                    ((a.desiredDate = !0), (r = !0));
                n.setState(Y(Y({}, n.state), {}, { errors: a })),
                  !r &&
                    z.a.updateOpportunity(t.id, t).then(function(e) {
                      n.props.fetchOpportunity(t.id), n.props.switchToView();
                    });
              });
            var o = e.opportunity,
              i = o.id,
              l = o.measures,
              s = o.desiredDate,
              c = o.evaluationAgreedDate,
              u = o.quotationText,
              m = o.status,
              d = o.datePlannedToSendWfEmailStatus;
            return (
              (n.state = {
                status: e.status.filter(function(e) {
                  return 1 == e.active;
                }),
                opportunity: {
                  id: i,
                  measureIds:
                    l &&
                    l
                      .map(function(e) {
                        return e.id;
                      })
                      .join(","),
                  statusId: m ? m.id : "",
                  statusUsesWf: !!m && m.usesWf,
                  datePlannedToSendWfEmailStatus: d ? W()(d).format("L") : "",
                  quotationText: u,
                  evaluationAgreedDate: c || "",
                  desiredDate: s || ""
                },
                errors: { statusId: !1, desiredDate: !1 }
              }),
              (n.handleReactSelectChange = n.handleReactSelectChange.bind(
                g()(n)
              )),
              (n.handleInputChangeDate = n.handleInputChangeDate.bind(g()(n))),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "handleReactSelectChange",
                value: function(e, t) {
                  this.setState(
                    Y(
                      Y({}, this.state),
                      {},
                      {
                        opportunity: Y(
                          Y({}, this.state.opportunity),
                          {},
                          E()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "handleInputChangeDate",
                value: function(e, t) {
                  this.setState(
                    Y(
                      Y({}, this.state),
                      {},
                      {
                        opportunity: Y(
                          Y({}, this.state.opportunity),
                          {},
                          E()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.opportunity,
                    t = e.statusId,
                    a = e.statusUsesWf,
                    n = e.datePlannedToSendWfEmailStatus,
                    r = e.quotationText,
                    o = e.desiredDate,
                    i = e.evaluationAgreedDate,
                    l = e.measureIds,
                    s = this.props.opportunity,
                    c = s.intake,
                    u = s.measureCategory,
                    m = Object(_.a)(this.props.measures, u.id);
                  return f.a.createElement(
                    "form",
                    {
                      className: "form-horizontal col-md-12",
                      onSubmit: this.handleSubmit
                    },
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(A.a, {
                        label: "Contact",
                        name: "",
                        value: c && c.contact.fullName,
                        readOnly: !0
                      }),
                      f.a.createElement(A.a, {
                        label: "Adres",
                        name: "",
                        value: c && c.fullAddress,
                        readOnly: !0
                      })
                    ),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(A.a, {
                        label: "Maatregel - categorie",
                        name: "measureCategory",
                        value: u ? u.name : "",
                        readOnly: !0
                      }),
                      f.a.createElement(A.a, {
                        label: "Campagne",
                        name: "campaign",
                        value: c && c.campaign ? c.campaign.name : "",
                        readOnly: !0
                      })
                    ),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(F.a, {
                        label: "Maatregel - specifiek",
                        name: "measureIds",
                        value: l,
                        options: m,
                        onChangeAction: this.handleMeasureIds
                      })
                    ),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(x.a, {
                        label: "Status",
                        size: "col-sm-6",
                        name: "statusId",
                        options: this.state.status,
                        value: t,
                        onChangeAction: this.handleInputChange,
                        required: "required",
                        error: this.state.errors.statusId
                      }),
                      a
                        ? f.a.createElement(A.a, {
                            label: "Datum workflow email",
                            name: "datePlannedToSendWfEmailStatus",
                            value: n,
                            onChange: function() {},
                            readOnly: !0
                          })
                        : ""
                    ),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(B.a, {
                        label: "Toelichting op maatregel",
                        name: "quotationText",
                        value: r,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(q.a, {
                        label: "Datum uitvoering",
                        name: "desiredDate",
                        value: o,
                        onChangeAction: this.handleInputChangeDate,
                        error: this.state.errors.desiredDate
                      }),
                      f.a.createElement(q.a, {
                        label: "Datum evaluatie",
                        name: "evaluationAgreedDate",
                        value: i,
                        onChangeAction: this.handleInputChangeDate
                      })
                    ),
                    f.a.createElement(
                      M.a,
                      null,
                      f.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        f.a.createElement(I.a, {
                          buttonClassName: "btn-default",
                          buttonText: "Annuleren",
                          onClickAction: this.props.switchToView
                        }),
                        f.a.createElement(I.a, {
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
        H = Object(h.b)(
          function(e) {
            return {
              opportunity: e.opportunityDetails,
              status: e.systemData.opportunityStatus,
              measures: e.systemData.measures
            };
          },
          function(e) {
            return {
              fetchOpportunity: function(t) {
                e(Object(D.c)(t));
              }
            };
          }
        )(J);
      function Q(e) {
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
          s()(a, e);
          var t = Q(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(g()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              E()(g()(n), "switchToView", function() {
                n.setState({ showEdit: !1, activeDiv: "" });
              }),
              (n.state = { showEdit: !1, activeDiv: "" }),
              n
            );
          }
          return (
            i()(a, [
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
                  return f.a.createElement(
                    N.a,
                    {
                      className: this.state.activeDiv,
                      onMouseEnter: function() {
                        return e.onDivEnter();
                      },
                      onMouseLeave: function() {
                        return e.onDivLeave();
                      }
                    },
                    f.a.createElement(
                      k.a,
                      null,
                      this.state.showEdit &&
                        this.props.permissions.manageOpportunity
                        ? f.a.createElement(H, {
                            switchToView: this.switchToView
                          })
                        : f.a.createElement(G, {
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
        $ = Object(h.b)(function(e) {
          return {
            opportunity: e.opportunityDetails,
            permissions: e.meDetails.permissions
          };
        })(Z),
        ee = (a(737), a(102), a(206), a(709), a(700));
      function te(e, t) {
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
      function ae(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? te(Object(a), !0).forEach(function(t) {
                E()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : te(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function ne(e) {
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
      var re = (function(e) {
          s()(a, e);
          var t = ne(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(g()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  ae(
                    ae({}, n.state),
                    {},
                    {
                      opportunityEvaluation: ae(
                        ae({}, n.state.opportunityEvaluation),
                        {},
                        E()({}, r, a)
                      )
                    }
                  )
                );
              }),
              E()(g()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.opportunityEvaluation;
                null === t.id
                  ? z.a.storeOpportunityEvaluation(t).then(function(e) {
                      n.props.fetchOpportunity(t.opportunityId),
                        n.props.switchToView();
                    })
                  : z.a.updateOpportunityEvaluation(t).then(function(e) {
                      n.props.fetchOpportunity(t.opportunityId),
                        n.props.switchToView();
                    });
              }),
              (n.state = {
                opportunityEvaluation: {
                  id: e.opportunityEvaluation
                    ? e.opportunityEvaluation.id
                    : null,
                  opportunityId: e.opportunityId,
                  isRealised:
                    !!e.opportunityEvaluation &&
                    e.opportunityEvaluation.isRealised,
                  isStatisfied:
                    !!e.opportunityEvaluation &&
                    e.opportunityEvaluation.isStatisfied,
                  wouldRecommendOrganisation:
                    !!e.opportunityEvaluation &&
                    e.opportunityEvaluation.wouldRecommendOrganisation,
                  note: e.opportunityEvaluation
                    ? e.opportunityEvaluation.note
                    : ""
                }
              }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.opportunityEvaluation,
                    t = e.isRealised,
                    a = e.isStatisfied,
                    n = e.wouldRecommendOrganisation,
                    r = e.note;
                  return f.a.createElement(
                    "form",
                    {
                      className: "form-horizontal col-md-12",
                      onSubmit: this.handleSubmit
                    },
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(ee.a, {
                        label: "Is de maatregel uitgevoerd?",
                        name: "isRealised",
                        value: t,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(ee.a, {
                        label: "Bent u tevreden over de uitvoering?",
                        name: "isStatisfied",
                        value: a,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(ee.a, {
                        label: "Zou u het bedrijf aanbevelen?",
                        name: "wouldRecommendOrganisation",
                        value: n,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(B.a, {
                        label: "Heeft u verder opmerkingen of aanbevelingen?",
                        name: "note",
                        value: r,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    f.a.createElement(
                      M.a,
                      null,
                      f.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        f.a.createElement(I.a, {
                          buttonClassName: "btn-default",
                          buttonText: "Annuleren",
                          onClickAction: this.props.switchToView
                        }),
                        f.a.createElement(I.a, {
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
        oe = Object(h.b)(
          function(e) {
            return {
              opportunityEvaluation: e.opportunityDetails.opportunityEvaluation,
              opportunityId: e.opportunityDetails.id
            };
          },
          function(e) {
            return {
              fetchOpportunity: function(t) {
                e(Object(D.c)(t));
              }
            };
          }
        )(re),
        ie = Object(h.b)(function(e) {
          return {
            opportunityEvaluation: e.opportunityDetails.opportunityEvaluation
          };
        })(function(e) {
          var t = e.opportunityEvaluation;
          return f.a.createElement(
            "div",
            null,
            f.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              f.a.createElement(X.a, {
                label: "Is de maatregel uitgevoerd?",
                value: t && t.isRealised ? "Ja" : "Nee"
              })
            ),
            f.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              f.a.createElement(X.a, {
                label: "Bent u tevreden over de uitvoering?",
                value: t && t.isStatisfied ? "Ja" : "Nee"
              })
            ),
            f.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              f.a.createElement(X.a, {
                label: "Zou u het bedrijf aanbevelen?",
                value: t && t.wouldRecommendOrganisation ? "Ja" : "Nee"
              })
            ),
            f.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              f.a.createElement(
                "div",
                { className: "col-sm-3" },
                f.a.createElement(
                  "label",
                  { htmlFor: "note", className: "col-sm-12" },
                  "Heeft u verder opmerkingen of aanbevelingen?"
                )
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-9", id: "quotationText" },
                t && t.note
              )
            )
          );
        }),
        le = a(698);
      function se(e) {
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
          s()(a, e);
          var t = se(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(g()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              E()(g()(n), "switchToView", function() {
                n.setState({ showEdit: !1, activeDiv: "" });
              }),
              (n.state = { showEdit: !1, activeDiv: "" }),
              n
            );
          }
          return (
            i()(a, [
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
                  return f.a.createElement(
                    N.a,
                    {
                      className: this.state.activeDiv,
                      onMouseEnter: function() {
                        return e.onDivEnter();
                      },
                      onMouseLeave: function() {
                        return e.onDivLeave();
                      }
                    },
                    f.a.createElement(
                      le.a,
                      null,
                      f.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Evaluatie"
                      )
                    ),
                    f.a.createElement(
                      k.a,
                      null,
                      this.state.showEdit &&
                        this.props.permissions.manageOpportunity
                        ? f.a.createElement(oe, {
                            switchToView: this.switchToView
                          })
                        : f.a.createElement(ie, {
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
        ue = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(ce),
        me = Object(h.b)(function(e) {
          return { opportunity: e.opportunityDetails };
        })(function(e) {
          var t = e.opportunity,
            a = t.createdBy,
            n = void 0 === a ? {} : a,
            r = t.createdAt,
            o = void 0 === r ? {} : r,
            i = t.updatedBy,
            l = void 0 === i ? {} : i,
            s = t.updatedAt,
            c = void 0 === s ? {} : s;
          return f.a.createElement(
            "div",
            null,
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(X.a, {
                label: "Gemaakt door",
                value: n ? n.fullName : "Onbekend",
                link: n ? "gebruiker/" + n.id : ""
              }),
              f.a.createElement(X.a, {
                label: "Laatste update door",
                value: l ? l.fullName : "Onbekend",
                link: l ? "gebruiker/" + l.id : ""
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(X.a, {
                label: "Gemaakt op",
                value: o ? W()(o).format("L") : "Onbekend"
              }),
              f.a.createElement(X.a, {
                label: "Laatste update op",
                value: c ? W()(c).format("L") : "Onbekend"
              })
            )
          );
        }),
        de = function(e) {
          return f.a.createElement(
            N.a,
            null,
            f.a.createElement(
              le.a,
              null,
              f.a.createElement(
                "span",
                { className: "h5 text-bold" },
                "Afsluiting"
              )
            ),
            f.a.createElement(k.a, null, f.a.createElement(me, null))
          );
        },
        pe = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(function(e) {
          var t = e.quotationRequest,
            a = t.id,
            n = t.organisation,
            r = t.createdAt,
            o = t.dateRecorded,
            i = t.status,
            l = t.dateReleased;
          return f.a.createElement(
            "div",
            {
              className: "row border ".concat(e.highlightLine),
              onMouseEnter: function() {
                return e.onLineEnter();
              },
              onMouseLeave: function() {
                return e.onLineLeave();
              },
              onDoubleClick: function() {
                return b.f.push("/offerteverzoek/".concat(a));
              }
            },
            f.a.createElement("div", { className: "col-sm-2" }, n && n.name),
            f.a.createElement(
              "div",
              { className: "col-sm-2" },
              r ? W()(r).format("L") : ""
            ),
            f.a.createElement(
              "div",
              { className: "col-sm-2" },
              o ? W()(o).format("L") : ""
            ),
            f.a.createElement("div", { className: "col-sm-2" }, i && i.name),
            f.a.createElement(
              "div",
              { className: "col-sm-2" },
              l ? W()(l).format("L") : ""
            )
          );
        });
      function fe(e) {
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
          s()(a, e);
          var t = fe(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(g()(n), "onLineEnter", function() {
                n.setState({ highlightLine: "highlight-line" });
              }),
              E()(g()(n), "onLineLeave", function() {
                n.setState({ highlightLine: "" });
              }),
              (n.state = { highlightLine: "" }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  return f.a.createElement(
                    "div",
                    null,
                    f.a.createElement(pe, {
                      highlightLine: this.state.highlightLine,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      quotationRequest: this.props.quotationRequest
                    })
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        ve = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(he),
        ge = Object(h.b)(function(e) {
          return { quotationRequests: e.opportunityDetails.quotationRequests };
        })(function(e) {
          return f.a.createElement(
            "div",
            null,
            f.a.createElement(
              "div",
              { className: "row border header" },
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Organisatie"
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Datum aanvraag"
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Datum opname"
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Offerte status"
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Offerte uitgebracht"
              )
            ),
            e.quotationRequests.length > 0
              ? e.quotationRequests.map(function(e) {
                  return f.a.createElement(ve, {
                    key: e.id,
                    quotationRequest: e
                  });
                })
              : f.a.createElement("div", null, "Geen offerteverzoeken bekend.")
          );
        });
      function ye(e) {
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
          s()(a, e);
          var t = ye(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(g()(n), "newQuotationRequest", function() {
                b.f.push(
                  "/offerteverzoek/nieuw/kans/".concat(n.props.opportunityId)
                );
              }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  return f.a.createElement(
                    N.a,
                    null,
                    f.a.createElement(
                      le.a,
                      null,
                      f.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Offerteverzoek"
                      ),
                      this.props.permissions.manageQuotationRequest &&
                        f.a.createElement(
                          "a",
                          {
                            role: "button",
                            className: "pull-right",
                            onClick: this.newQuotationRequest
                          },
                          f.a.createElement("span", {
                            className: "glyphicon glyphicon-plus"
                          })
                        )
                    ),
                    f.a.createElement(
                      k.a,
                      null,
                      f.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        f.a.createElement(ge, null)
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        be = Object(h.b)(function(e) {
          return {
            permissions: e.meDetails.permissions,
            opportunityId: e.opportunityDetails.id
          };
        })(Ee);
      function Ne(e) {
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
      var ke = (function(e) {
          s()(a, e);
          var t = Ne(a);
          function a(e) {
            return r()(this, a), t.call(this, e);
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  var e = "",
                    t = !0;
                  return (
                    this.props.hasError
                      ? (e = "Fout bij het ophalen van kans.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : Object(L.isEmpty)(this.props.opportunity)
                      ? (e = "Geen kans gevonden!")
                      : (t = !1),
                    t
                      ? f.a.createElement("div", null, e)
                      : f.a.createElement(
                          "div",
                          null,
                          f.a.createElement($, null),
                          f.a.createElement(be, null),
                          f.a.createElement(ue, null),
                          f.a.createElement(de, null)
                        )
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        we = Object(h.b)(function(e) {
          return {
            opportunity: e.opportunityDetails,
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        })(ke),
        Ce = Object(h.b)(function(e) {
          return { relatedTasks: e.opportunityDetails.relatedTasks };
        })(function(e) {
          var t = e.relatedTasks;
          return f.a.createElement(
            "div",
            null,
            "" == t && f.a.createElement("div", null, "Geen taken gevonden."),
            "" != t &&
              f.a.createElement(
                "table",
                { className: "table harmonica-table" },
                f.a.createElement(
                  "tbody",
                  null,
                  t.map(function(e, t) {
                    return f.a.createElement(
                      "tr",
                      {
                        onClick: function() {
                          return (t = e.id), void b.f.push("/taak/".concat(t));
                          var t;
                        },
                        key: t
                      },
                      f.a.createElement(
                        "td",
                        { className: "col-xs-12 clickable" },
                        W()(e.createdAt).format("L"),
                        " - ",
                        e.noteSummary
                      )
                    );
                  })
                )
              )
          );
        }),
        De = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showTasksList,
            n = e.newTask,
            r = e.taskCount,
            o = e.permissions;
          return f.a.createElement(
            N.a,
            { className: "harmonica-button" },
            f.a.createElement(
              k.a,
              null,
              f.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                f.a.createElement(
                  "span",
                  { className: "" },
                  "OPEN TAKEN ",
                  f.a.createElement("span", { className: "badge" }, r)
                )
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                o.manageTask &&
                  f.a.createElement(
                    "a",
                    { role: "button", className: "pull-right", onClick: n },
                    f.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white"
                    })
                  )
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && f.a.createElement(Ce, null)
              )
            )
          );
        }),
        Oe = Object(h.b)(function(e) {
          return { relatedNotes: e.opportunityDetails.relatedNotes };
        })(function(e) {
          var t = e.relatedNotes;
          return f.a.createElement(
            "div",
            null,
            "" == t &&
              f.a.createElement("div", null, "Geen notities gevonden."),
            "" != t &&
              f.a.createElement(
                "table",
                { className: "table harmonica-table" },
                f.a.createElement(
                  "tbody",
                  null,
                  t.map(function(e, t) {
                    return f.a.createElement(
                      "tr",
                      {
                        onClick: function() {
                          return (t = e.id), void b.f.push("/taak/".concat(t));
                          var t;
                        },
                        key: t
                      },
                      f.a.createElement(
                        "td",
                        { className: "col-xs-12 clickable" },
                        W()(e.createdAt).format("L"),
                        " - ",
                        e.noteSummary
                      )
                    );
                  })
                )
              )
          );
        }),
        Se = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showNotesList,
            n = e.newNote,
            r = e.noteCount,
            o = e.permissions;
          return f.a.createElement(
            N.a,
            { className: "harmonica-button" },
            f.a.createElement(
              k.a,
              null,
              f.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                f.a.createElement(
                  "span",
                  { className: "" },
                  "NOTITIES ",
                  f.a.createElement("span", { className: "badge" }, r)
                )
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                o.manageTask &&
                  f.a.createElement(
                    "a",
                    { role: "button", className: "pull-right", onClick: n },
                    f.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white"
                    })
                  )
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && f.a.createElement(Oe, null)
              )
            )
          );
        });
      function Te(e) {
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
      var Re = (function(e) {
          s()(a, e);
          var t = Te(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(g()(n), "openItem", function(e) {
                b.f.push("/document/".concat(e));
              }),
              (n.state = { relatedDocuments: "" }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedDocuments;
                  return f.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      f.a.createElement(
                        "div",
                        null,
                        "Geen documenten gevonden."
                      ),
                    "" != t &&
                      f.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        f.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return f.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: a
                              },
                              f.a.createElement(
                                "td",
                                { className: "col-xs-12 clickable" },
                                W()(t.created_at).format("L"),
                                " - ",
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
        })(p.Component),
        Le = Object(h.b)(function(e) {
          return { relatedDocuments: e.opportunityDetails.relatedDocuments };
        })(Re),
        je = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showDocumentsList,
            n = e.newDocument,
            r = e.documentCount,
            o = e.permissions;
          return f.a.createElement(
            N.a,
            { className: "harmonica-button" },
            f.a.createElement(
              k.a,
              null,
              f.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                f.a.createElement(
                  "span",
                  null,
                  "DOCUMENTEN ",
                  f.a.createElement("span", { className: "badge" }, r)
                )
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                o.createDocument &&
                  f.a.createElement(
                    "div",
                    { className: "pull-right" },
                    f.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white",
                      "data-toggle": "dropdown",
                      role: "button"
                    }),
                    f.a.createElement(
                      "ul",
                      { className: "dropdown-menu" },
                      f.a.createElement(
                        "li",
                        null,
                        f.a.createElement(
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
                      f.a.createElement(
                        "li",
                        null,
                        f.a.createElement(
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
              f.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && f.a.createElement(Le, null)
              )
            )
          );
        });
      function Pe(e) {
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
      var Ae = (function(e) {
          s()(a, e);
          var t = Pe(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(g()(n), "openItem", function(e) {
                b.f.push("/email/".concat(e));
              }),
              (n.state = { relatedOpportunities: "" }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedEmailsSent;
                  return f.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      f.a.createElement("div", null, "Geen e-mails gevonden."),
                    "" != t &&
                      f.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        f.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return f.a.createElement(
                              "tr",
                              { key: a },
                              f.a.createElement(
                                "td",
                                {
                                  className: "col-xs-4 clickable",
                                  onClick: function() {
                                    return e.openItem(t.id);
                                  }
                                },
                                W()(t.date_sent).format("L")
                              ),
                              f.a.createElement(
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
        })(p.Component),
        xe = Object(h.b)(function(e) {
          return { relatedEmailsSent: e.opportunityDetails.relatedEmailsSent };
        })(Ae),
        qe = function(e) {
          var t = e.toggleShowList,
            a = e.showEmailsSentList,
            n = e.newEmail,
            r = e.emailSentCount;
          return f.a.createElement(
            N.a,
            { className: "harmonica-button" },
            f.a.createElement(
              k.a,
              null,
              f.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                f.a.createElement(
                  "span",
                  { onClick: t, className: "" },
                  "E-MAIL VERZONDEN ",
                  f.a.createElement("span", { className: "badge" }, r)
                )
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                f.a.createElement(
                  "a",
                  { role: "button", className: "pull-right", onClick: n },
                  f.a.createElement("span", {
                    className: "glyphicon glyphicon-plus glyphicon-white"
                  })
                )
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && f.a.createElement(xe, null)
              )
            )
          );
        };
      function Ie(e, t) {
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
      function Me(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Ie(Object(a), !0).forEach(function(t) {
                E()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Ie(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function ze(e) {
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
      var Be = (function(e) {
          s()(a, e);
          var t = ze(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              ((n = t.call(this, e)).state = {
                toggleShowList: {
                  tasks: !1,
                  notes: !1,
                  documents: !1,
                  emails: !1
                }
              }),
              (n.toggleShowList = n.toggleShowList.bind(g()(n))),
              (n.newTask = n.newTask.bind(g()(n))),
              (n.newNote = n.newNote.bind(g()(n))),
              (n.newDocument = n.newDocument.bind(g()(n))),
              (n.newEmail = n.newEmail.bind(g()(n))),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "toggleShowList",
                value: function(e) {
                  this.setState(
                    Me(
                      Me({}, this.state),
                      {},
                      {
                        toggleShowList: Me(
                          Me({}, this.state.toggleShowList),
                          {},
                          E()({}, e, !this.state.toggleShowList[e])
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "newTask",
                value: function() {
                  this.props.opportunityDetails.intake
                    ? b.f.push(
                        "/taak/nieuw/kans/"
                          .concat(this.props.id, "/contact/")
                          .concat(
                            this.props.opportunityDetails.intake.contact.id
                          )
                      )
                    : b.f.push("/taak/nieuw/kans/".concat(this.props.id));
                }
              },
              {
                key: "newNote",
                value: function() {
                  this.props.opportunityDetails.intake
                    ? b.f.push(
                        "/taak/nieuw/afgehandeld/kans/"
                          .concat(this.props.id, "/contact/")
                          .concat(
                            this.props.opportunityDetails.intake.contact.id
                          )
                      )
                    : b.f.push(
                        "/taak/nieuw/afgehandeld/kans/".concat(this.props.id)
                      );
                }
              },
              {
                key: "newDocument",
                value: function(e) {
                  b.f.push(
                    "/document/nieuw/"
                      .concat(e, "/kans/")
                      .concat(this.props.id, "/intake/")
                      .concat(
                        this.props.opportunityDetails.intake.id,
                        "/contact/"
                      )
                      .concat(this.props.opportunityDetails.intake.contact.id)
                  );
                }
              },
              {
                key: "newEmail",
                value: function() {
                  b.f.push("/email/nieuw");
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this;
                  return f.a.createElement(
                    "div",
                    { className: "margin-10-top" },
                    f.a.createElement(De, {
                      toggleShowList: function() {
                        return e.toggleShowList("tasks");
                      },
                      showTasksList: this.state.toggleShowList.tasks,
                      taskCount: this.props.opportunityDetails.taskCount,
                      newTask: this.newTask
                    }),
                    f.a.createElement(Se, {
                      toggleShowList: function() {
                        return e.toggleShowList("notes");
                      },
                      showNotesList: this.state.toggleShowList.notes,
                      noteCount: this.props.opportunityDetails.noteCount,
                      newNote: this.newNote
                    }),
                    f.a.createElement(je, {
                      toggleShowList: function() {
                        return e.toggleShowList("documents");
                      },
                      showDocumentsList: this.state.toggleShowList.documents,
                      newDocument: this.newDocument,
                      documentCount: this.props.opportunityDetails.documentCount
                    }),
                    f.a.createElement(qe, {
                      toggleShowList: function() {
                        return e.toggleShowList("emailsSent");
                      },
                      showEmailsSentList: this.state.toggleShowList.emailsSent,
                      newEmail: this.newEmail,
                      emailSentCount: this.props.opportunityDetails
                        .emailSentCount
                    })
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        Fe = Object(h.b)(function(e) {
          return {
            opportunityDetails: e.opportunityDetails,
            permissions: e.meDetails.permissions
          };
        })(Be);
      function _e(e) {
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
      var Ve = (function(e) {
        s()(a, e);
        var t = _e(a);
        function a(e) {
          return r()(this, a), t.call(this, e);
        }
        return (
          i()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchOpportunity(this.props.params.id);
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearOpportunity();
              }
            },
            {
              key: "render",
              value: function() {
                return f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    f.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      f.a.createElement(R, null)
                    ),
                    f.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      f.a.createElement(we, null)
                    )
                  ),
                  f.a.createElement(
                    N.a,
                    { className: "col-md-3 harmonica" },
                    f.a.createElement(
                      k.a,
                      null,
                      f.a.createElement(Fe, { id: this.props.params.id })
                    )
                  )
                );
              }
            }
          ]),
          a
        );
      })(p.Component);
      t.default = Object(h.b)(null, function(e) {
        return {
          fetchOpportunity: function(t) {
            e(Object(D.c)(t));
          },
          clearOpportunity: function() {
            e(Object(D.a)());
          }
        };
      })(Ve);
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
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
          className: i.a.string,
          onMouseEnter: i.a.func,
          onMouseLeave: i.a.func
        }),
        (t.a = l);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
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
        (l.propTypes = { className: i.a.string }),
        (t.a = l);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        l = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            o = e.type,
            i = e.value,
            l = e.loading,
            s = e.loadText,
            c = e.disabled;
          return l
            ? r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: i,
                  disabled: l
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
                  value: i,
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
          buttonClassName: i.a.string,
          buttonText: i.a.string.isRequired,
          onClickAction: i.a.func,
          type: i.a.string,
          value: i.a.string,
          loading: i.a.bool,
          loadText: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = l);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        l = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            o = e.title,
            i = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: i,
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
          buttonClassName: i.a.string,
          iconName: i.a.string.isRequired,
          onClickAction: i.a.func,
          title: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = l);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        l = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            o = e.size,
            i = e.id,
            l = e.placeholder,
            s = e.name,
            c = e.value,
            u = e.onClickAction,
            m = e.onChangeAction,
            d = e.onBlurAction,
            p = e.required,
            f = e.readOnly,
            h = e.maxLength,
            v = e.error,
            g = e.min,
            y = e.max,
            E = e.step,
            b = e.errorMessage,
            N = e.divSize,
            k = e.divClassName,
            w = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(N, " ").concat(k) },
            r.a.createElement(
              "label",
              { htmlFor: i, className: "col-sm-6 ".concat(p) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(o) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (v ? "has-error" : ""),
                id: i,
                placeholder: l,
                name: s,
                value: c,
                onClick: u,
                onChange: m,
                onBlur: d,
                readOnly: f,
                maxLength: h,
                min: g,
                max: y,
                autoComplete: w,
                step: E
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
                  b
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
          label: i.a.oneOfType([i.a.string, i.a.object]).isRequired,
          type: i.a.string,
          className: i.a.string,
          divClassName: i.a.string,
          size: i.a.string,
          divSize: i.a.string,
          id: i.a.string,
          placeholder: i.a.string,
          name: i.a.string.isRequired,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          onClickAction: i.a.func,
          onChangeAction: i.a.func,
          onBlurAction: i.a.func,
          required: i.a.string,
          readOnly: i.a.bool,
          maxLength: i.a.string,
          error: i.a.bool,
          min: i.a.string,
          max: i.a.string,
          step: i.a.string,
          errorMessage: i.a.string,
          autoComplete: i.a.string
        }),
        (t.a = l);
    },
    695: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(4),
        i = a(8),
        l = a.n(i),
        s = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            i = e.value,
            l = e.link,
            s = e.hidden;
          return l.length > 0
            ? r.a.createElement(
                "div",
                { className: a, style: s ? { display: "none" } : {} },
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
                    i
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: a, style: s ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement("div", { className: "col-sm-6", id: n }, i)
              );
        };
      (s.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (s.propTypes = {
          label: l.a.oneOfType([l.a.string, l.a.object]).isRequired,
          className: l.a.string,
          id: l.a.string,
          value: l.a.oneOfType([l.a.string, l.a.number]),
          link: l.a.string,
          hidden: l.a.bool
        }),
        (t.a = s);
    },
    696: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        l = function(e) {
          var t = e.label,
            a = e.className,
            n = e.size,
            o = e.id,
            i = e.name,
            l = e.value,
            s = e.options,
            c = e.onChangeAction,
            u = e.onBlurAction,
            m = e.required,
            d = e.error,
            p = e.errorMessage,
            f = e.optionValue,
            h = e.optionName,
            v = e.readOnly,
            g = e.placeholder,
            y = e.divClassName,
            E = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(y) },
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
                  name: i,
                  value: l,
                  onChange: c,
                  onBlur: u,
                  readOnly: v
                },
                E && r.a.createElement("option", { value: "" }, g),
                s.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[f], value: e[f] },
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
                  p
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
          label: i.a.string.isRequired,
          className: i.a.string,
          size: i.a.string,
          id: i.a.string,
          name: i.a.string.isRequired,
          options: i.a.array,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          onChangeAction: i.a.func,
          onBlurAction: i.a.func,
          required: i.a.string,
          readOnly: i.a.bool,
          error: i.a.bool,
          errorMessage: i.a.string,
          emptyOption: i.a.bool,
          optionValue: i.a.string,
          optionName: i.a.string,
          placeholder: i.a.string
        }),
        (t.a = l);
    },
    698: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
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
        (l.propTypes = { className: i.a.string }),
        (t.a = l);
    },
    699: function(e, t, a) {
      "use strict";
      var n = a(24),
        r = a.n(n),
        o = a(25),
        i = a.n(o),
        l = a(22),
        s = a.n(l),
        c = a(26),
        u = a.n(c),
        m = a(27),
        d = a.n(m),
        p = a(16),
        f = a.n(p),
        h = a(6),
        v = a.n(h),
        g = a(0),
        y = a.n(g),
        E = a(8),
        b = a.n(E),
        N = a(707),
        k = a.n(N),
        w = a(708),
        C = a.n(w),
        D = a(7),
        O = a.n(D);
      function S(e) {
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return d()(this, a);
        };
      }
      O.a.locale("nl");
      var T = (function(e) {
        u()(a, e);
        var t = S(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            v()(s()(n), "validateDate", function(e) {
              var t = O()(e.target.value, "DD-MM-YYYY", !0),
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
            v()(s()(n), "onDateChange", function(e) {
              var t = e ? O()(e).format("Y-MM-DD") : "",
                a = !1;
              t &&
                n.props.disabledBefore &&
                O()(t).isBefore(n.props.disabledBefore) &&
                (a = !0),
                t &&
                  n.props.disabledAfter &&
                  O()(t).isAfter(n.props.disabledAfter) &&
                  (a = !0),
                n.setState({ errorDateFormat: a }),
                !a && n.props.onChangeAction(t, n.props.name);
            }),
            (n.state = { errorDateFormat: !1 }),
            n
          );
        }
        return (
          i()(a, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.label,
                  a = e.className,
                  n = e.size,
                  r = e.divSize,
                  o = e.id,
                  i = e.value,
                  l = e.required,
                  s = e.readOnly,
                  c = e.name,
                  u = e.error,
                  m = e.errorMessage,
                  d = e.disabledBefore,
                  p = e.disabledAfter,
                  f = i ? O()(i).format("L") : "",
                  h = {};
                return (
                  d && (h.before = new Date(d)),
                  p && (h.after = new Date(p)),
                  y.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    y.a.createElement(
                      "div",
                      null,
                      y.a.createElement(
                        "label",
                        { htmlFor: o, className: "col-sm-6 ".concat(l) },
                        t
                      )
                    ),
                    y.a.createElement(
                      "div",
                      { className: "".concat(n) },
                      y.a.createElement(k.a, {
                        id: o,
                        value: f,
                        formatDate: w.formatDate,
                        parseDate: w.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: C.a,
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
                          readOnly: s,
                          disabled: s
                        },
                        required: l,
                        readOnly: s,
                        placeholder: ""
                      })
                    ),
                    u &&
                      y.a.createElement(
                        "div",
                        { className: "col-sm-offset-6 col-sm-6" },
                        y.a.createElement(
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
      (T.defaultProps = {
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
        (T.propTypes = {
          label: b.a.string.isRequired,
          type: b.a.string,
          className: b.a.string,
          size: b.a.string,
          divSize: b.a.string,
          id: b.a.string,
          name: b.a.string,
          value: b.a.oneOfType([b.a.string, b.a.object]),
          onChangeAction: b.a.func,
          required: b.a.string,
          readOnly: b.a.bool,
          error: b.a.bool,
          errorMessage: b.a.string,
          disabledBefore: b.a.string,
          disabledAfter: b.a.string
        }),
        (t.a = T);
    },
    700: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        l = a(703),
        s = a.n(l),
        c = function(e) {
          var t = e.label,
            a = e.size,
            n = e.id,
            o = e.name,
            i = e.value,
            l = e.onChangeAction,
            c = e.required,
            u = e.divSize,
            m = e.className,
            d = e.disabled;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(u, " ").concat(m) },
            r.a.createElement(
              "div",
              null,
              r.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(c) },
                t
              )
            ),
            r.a.createElement(
              "div",
              { className: "".concat(a) },
              r.a.createElement(s.a, {
                id: n,
                name: o,
                onChange: l,
                checked: i,
                disabled: d
              })
            )
          );
        };
      (c.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        required: "",
        disabled: !1,
        value: null
      }),
        (c.propTypes = {
          label: i.a.string.isRequired,
          type: i.a.string,
          size: i.a.string,
          divSize: i.a.string,
          id: i.a.string,
          name: i.a.string.isRequired,
          value: i.a.bool,
          onChangeAction: i.a.func,
          required: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = c);
    },
    702: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        l = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-footer ".concat(t) },
            a
          );
        };
      (l.defaultProps = { className: "" }),
        (l.propTypes = { className: i.a.string }),
        (t.a = l);
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
        i = d(o),
        l = d(a(710)),
        s = d(a(8)),
        c = d(a(704)),
        u = d(a(705)),
        m = a(706);
      function d(e) {
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
                (this.startX = (0, m.pointerCoord)(e).x), (this.activated = !0);
              }
            },
            {
              key: "handleTouchMove",
              value: function(e) {
                if (this.activated && ((this.moved = !0), this.startX)) {
                  var t = (0, m.pointerCoord)(e).x;
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
                    var a = (0, m.pointerCoord)(e).x;
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
                  o = (0, l.default)(
                    "react-toggle",
                    {
                      "react-toggle--checked": this.state.checked,
                      "react-toggle--focus": this.state.hasFocus,
                      "react-toggle--disabled": this.props.disabled
                    },
                    a
                  );
                return i.default.createElement(
                  "div",
                  {
                    className: o,
                    onClick: this.handleClick,
                    onTouchStart: this.handleTouchStart,
                    onTouchMove: this.handleTouchMove,
                    onTouchEnd: this.handleTouchEnd
                  },
                  i.default.createElement(
                    "div",
                    { className: "react-toggle-track" },
                    i.default.createElement(
                      "div",
                      { className: "react-toggle-track-check" },
                      this.getIcon("checked")
                    ),
                    i.default.createElement(
                      "div",
                      { className: "react-toggle-track-x" },
                      this.getIcon("unchecked")
                    )
                  ),
                  i.default.createElement("div", {
                    className: "react-toggle-thumb"
                  }),
                  i.default.createElement(
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
            checked: i.default.createElement(c.default, null),
            unchecked: i.default.createElement(u.default, null)
          }
        }),
        (p.propTypes = {
          checked: s.default.bool,
          disabled: s.default.bool,
          defaultChecked: s.default.bool,
          onChange: s.default.func,
          onFocus: s.default.func,
          onBlur: s.default.func,
          className: s.default.string,
          name: s.default.string,
          value: s.default.string,
          id: s.default.string,
          "aria-labelledby": s.default.string,
          "aria-label": s.default.string,
          icons: s.default.oneOfType([
            s.default.bool,
            s.default.shape({
              checked: s.default.node,
              unchecked: s.default.node
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
    709: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        l = a(714),
        s =
          (a(715),
          function(e) {
            var t = e.label,
              a = e.divSize,
              n = e.size,
              o = e.id,
              i = e.name,
              s = e.value,
              c = e.options,
              u = e.optionId,
              m = e.optionName,
              d = e.onChangeAction,
              p = e.required,
              f = e.multi,
              h = e.error,
              v = e.isLoading;
            return r.a.createElement(
              "div",
              { className: "form-group ".concat(a) },
              r.a.createElement(
                "label",
                { htmlFor: o, className: "col-sm-6 ".concat(p) },
                t
              ),
              r.a.createElement(
                "div",
                { className: "".concat(n) },
                r.a.createElement(l.a, {
                  id: o,
                  name: i,
                  value: s,
                  onChange: function(e) {
                    d(e || "", i);
                  },
                  options: c,
                  valueKey: u,
                  labelKey: m,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: f,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: h ? " has-error" : "",
                  isLoading: v
                })
              )
            );
          });
      (s.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        optionId: "id",
        optionName: "name",
        readOnly: !1,
        required: "",
        error: !1,
        value: "",
        multi: !0,
        isLoading: !1
      }),
        (s.propTypes = {
          label: i.a.string.isRequired,
          className: i.a.string,
          size: i.a.string,
          divSize: i.a.string,
          id: i.a.string,
          name: i.a.string.isRequired,
          options: i.a.array.isRequired,
          optionId: i.a.string,
          optionName: i.a.string,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          onChangeAction: i.a.func,
          onBlurAction: i.a.func,
          required: i.a.string,
          readOnly: i.a.bool,
          error: i.a.bool,
          multi: i.a.bool,
          isLoading: i.a.bool
        }),
        (t.a = s);
    },
    723: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        l = a(714),
        s =
          (a(715),
          function(e) {
            var t = e.label,
              a = (e.className, e.size),
              n = e.id,
              o = e.name,
              i = e.value,
              s = e.options,
              c = e.optionId,
              u = e.optionName,
              m = e.onChangeAction,
              d = e.required,
              p = e.multi,
              f = e.error;
            return r.a.createElement(
              "div",
              { className: "form-group col-sm-6" },
              r.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(d) },
                t
              ),
              r.a.createElement(
                "div",
                { className: "".concat(a) },
                r.a.createElement(l.a, {
                  id: n,
                  name: o,
                  value: i,
                  onChange: m,
                  options: s,
                  valueKey: c,
                  labelKey: u,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: p,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: f ? " has-error" : ""
                })
              )
            );
          });
      (s.defaultProps = {
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
        (s.propTypes = {
          label: i.a.string.isRequired,
          className: i.a.string,
          size: i.a.string,
          id: i.a.string,
          name: i.a.string.isRequired,
          options: i.a.array,
          optionId: i.a.string,
          optionName: i.a.string,
          value: i.a.string,
          onChangeAction: i.a.func,
          onBlurAction: i.a.func,
          required: i.a.string,
          readOnly: i.a.bool,
          error: i.a.bool,
          multi: i.a.bool
        }),
        (t.a = s);
    },
    734: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        l = function(e) {
          var t = e.label,
            a = e.size,
            n = e.sizeLabel,
            o = e.sizeInput,
            i = e.id,
            l = e.name,
            s = e.value,
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
                  { htmlFor: i, className: "col-sm-12 ".concat(u) },
                  t
                )
              ),
              r.a.createElement(
                "div",
                { className: o },
                r.a.createElement("textarea", {
                  name: l,
                  value: s,
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
          label: i.a.string.isRequired,
          type: i.a.string,
          size: i.a.string,
          sizeLabel: i.a.string,
          sizeInput: i.a.string,
          id: i.a.string,
          name: i.a.string.isRequired,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          onChangeAction: i.a.func,
          required: i.a.string,
          error: i.a.bool
        }),
        (t.a = l);
    },
    737: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        l =
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
        s = function(e) {
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
              r.a.createElement(l.a, {
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
      (s.defaultProps = { value: "", errorMessage: "" }),
        (s.propTypes = {
          label: i.a.string.isRequired,
          type: i.a.string,
          id: i.a.string,
          placeholder: i.a.string,
          value: i.a.string,
          onChangeAction: i.a.func
        }),
        (t.a = s);
    },
    806: function(e, t, a) {
      "use strict";
      a.d(t, "c", function() {
        return n;
      }),
        a.d(t, "b", function() {
          return r;
        }),
        a.d(t, "a", function() {
          return o;
        });
      var n = function(e) {
          return { type: "FETCH_OPPORTUNITY", id: e };
        },
        r = function(e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
          return { type: "DELETE_OPPORTUNITY", id: e, contactId: t };
        },
        o = function() {
          return { type: "CLEAR_OPPORTUNITY" };
        };
    },
    835: function(e, t, a) {
      "use strict";
      t.a = function(e, t) {
        return e.filter(function(e) {
          return t
            ? Number(e.measureCategoryId) === Number(t)
            : e.measureCategoryId;
        });
      };
    }
  }
]);
