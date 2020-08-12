(window.webpackJsonp = window.webpackJsonp || []).push([
  [17],
  {
    1416: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        i = a(25),
        o = a.n(i),
        l = a(26),
        c = a.n(l),
        s = a(27),
        u = a.n(s),
        p = a(16),
        m = a.n(p),
        d = a(0),
        f = a.n(d),
        h = a(32),
        g = a(22),
        y = a.n(g),
        b = a(6),
        v = a.n(b),
        E = a(4),
        N = a(690),
        O = a(691),
        w = a(693),
        C = a(100),
        j = function(e) {
          return { type: "FETCH_PARTICIPANT_PROJECT_DETAILS", payload: e };
        },
        D = Object(h.b)(null, function(e) {
          return {
            deleteParticipantProject: function(t) {
              e(
                (function(e) {
                  return { type: "DELETE_PARTICIPANT_PROJECT", id: e };
                })(t)
              );
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
                  e.deleteParticipantProject(e.id),
                  void e.closeDeleteItemModal()
                );
              },
              title: "Verwijderen"
            },
            f.a.createElement(
              "p",
              null,
              "Weet u zeker dat u deze deelname wilt verwijderen?"
            )
          );
        }),
        I = a(692),
        M = a(763),
        q = a.n(M),
        k = a(699),
        P = a(694),
        R = a(7),
        A = a.n(R),
        T = a(153),
        S = Object(h.b)(null, function(e) {
          return {
            fetchParticipantProjectDetails: function(t) {
              e(j(t));
            }
          };
        })(function(e) {
          var t = e.participantProjectId,
            a = e.closeDeleteItemModal,
            n = e.projectTypeCodeRef,
            r = e.fetchParticipantProjectDetails,
            i = Object(d.useState)(A()().format("Y-MM-DD")),
            o = q()(i, 2),
            l = o[0],
            c = o[1],
            s = Object(d.useState)(0),
            u = q()(s, 2),
            p = u[0],
            m = u[1];
          return f.a.createElement(
            C.a,
            {
              buttonConfirmText: "Deelname beëindigen",
              buttonClassName: "btn-danger",
              closeModal: a,
              confirmAction: function() {
                l &&
                  T.a
                    .terminateParticipantProject(t, {
                      dateTerminated: l,
                      payoutPercentageTerminated: p
                    })
                    .then(function(e) {
                      r(t), a();
                    })
                    .catch(function(e) {
                      alert(
                        "Er is iets misgegaan bij het opslaan. Herlaad de pagina."
                      );
                    });
              },
              title: "Beëindigen",
              modalClassName: "modal-lg"
            },
            f.a.createElement(
              "p",
              null,
              "Weet u zeker dat u deze deelname wilt beëindigen?"
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(k.a, {
                label: "Datum beëindigen",
                name: "dateTerminated",
                value: l,
                onChangeAction: function(e) {
                  c(e);
                },
                disabledAfter: A()().format("Y-MM-DD")
              }),
              "loan" === n || "obligation" === n
                ? f.a.createElement(P.a, {
                    label: "Uitkeringspercentage",
                    name: "payoutPercentageTerminated",
                    value: p,
                    onChangeAction: function(e) {
                      var t = e.target.value;
                      m(t);
                    }
                  })
                : null
            )
          );
        }),
        F = Object(h.b)(null, function(e) {
          return {
            fetchParticipantProjectDetails: function(t) {
              e(j(t));
            }
          };
        })(function(e) {
          var t = e.participantProjectId,
            a = e.closeDeleteItemModal,
            n = (e.projectTypeCodeRef, e.fetchParticipantProjectDetails),
            r = Object(d.useState)(null),
            i = q()(r, 2),
            o = i[0],
            l = i[1];
          return f.a.createElement(
            C.a,
            {
              buttonConfirmText: "Deelname beëindiging ongedaan maken",
              buttonClassName: "btn-danger",
              closeModal: a,
              confirmAction: function() {
                return (
                  l(null),
                  void T.a
                    .undoTerminateParticipantProject(t, { dateTerminated: o })
                    .then(function(e) {
                      n(t), a();
                    })
                    .catch(function(e) {
                      alert(
                        "Er is iets misgegaan bij het opslaan. Herlaad de pagina."
                      );
                    })
                );
              },
              title: "Beëindigen",
              modalClassName: "modal-lg"
            },
            f.a.createElement(
              "p",
              null,
              "Weet u zeker dat u deze beëindigde deelname weer ongedaan wilt maken?"
            )
          );
        });
      function G(e) {
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
      var B = (function(e) {
          c()(a, e);
          var t = G(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              v()(y()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              v()(y()(n), "toggleTerminate", function() {
                n.setState({ showTerminate: !n.state.showTerminate });
              }),
              v()(y()(n), "toggleUndoTerminate", function() {
                n.setState({ showUndoTerminate: !n.state.showUndoTerminate });
              }),
              (n.state = {
                showDelete: !1,
                showTerminate: !1,
                showUndoTerminate: !1
              }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.props,
                    t = e.participantProject,
                    a = e.project,
                    n = void 0 === a ? {} : a,
                    r =
                      n.isParticipationTransferable &&
                      t.participationsCurrent > 0 &&
                      t.participationsCurrent &&
                      this.props.permissions.manageFinancial;
                  r = 2 == t.statusId && r;
                  var i = n && n.projectType ? n.projectType.codeRef : "";
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
                          O.a,
                          { className: "panel-small" },
                          f.a.createElement(
                            "div",
                            { className: "col-md-3" },
                            f.a.createElement(
                              "div",
                              {
                                className:
                                  "btn-group btn-group-flex margin-small",
                                role: "group"
                              },
                              f.a.createElement(w.a, {
                                iconName: "glyphicon-arrow-left",
                                onClickAction: E.e.goBack
                              }),
                              this.props.permissions.manageParticipation &&
                                f.a.createElement(w.a, {
                                  iconName: "glyphicon-trash",
                                  onClickAction: this.toggleDelete
                                }),
                              "capital" === i || "postalcode_link_capital" === i
                                ? f.a.createElement(I.a, {
                                    buttonText: t.dateTerminated
                                      ? "Beëindiging ongedaan maken"
                                      : "Beëindigen",
                                    onClickAction: t.dateTerminated
                                      ? this.toggleUndoTerminate
                                      : this.toggleTerminate
                                  })
                                : f.a.createElement(I.a, {
                                    buttonText: "Beëindigen",
                                    onClickAction: this.toggleTerminate,
                                    disabled: t.dateTerminated
                                  })
                            )
                          ),
                          f.a.createElement(
                            "div",
                            { className: "col-md-6" },
                            f.a.createElement(
                              "h4",
                              {
                                className:
                                  "text-center text-success margin-small"
                              },
                              f.a.createElement(
                                "strong",
                                null,
                                t.contact ? t.contact.fullName : "",
                                "/",
                                n ? n.name : ""
                              )
                            )
                          ),
                          f.a.createElement("div", { className: "col-md-3" })
                        )
                      )
                    ),
                    this.state.showDelete &&
                      f.a.createElement(D, {
                        closeDeleteItemModal: this.toggleDelete,
                        id: t.id,
                        projectid: t.project.id
                      }),
                    this.state.showTerminate &&
                      f.a.createElement(S, {
                        participantProjectId: t.id,
                        closeDeleteItemModal: this.toggleTerminate,
                        projectTypeCodeRef: t.project.projectType.codeRef
                      }),
                    this.state.showUndoTerminate &&
                      f.a.createElement(F, {
                        participantProjectId: t.id,
                        closeDeleteItemModal: this.toggleUndoTerminate,
                        projectTypeCodeRef: t.project.projectType.codeRef
                      })
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        x = Object(h.b)(function(e) {
          return {
            participantProject: e.participantProjectDetails,
            project: e.participantProjectDetails.project,
            permissions: e.meDetails.permissions
          };
        })(B),
        L = a(198),
        W = a(697),
        Y = a.n(W),
        V = a(102),
        _ = a(747),
        z = a(695),
        U = a(700),
        H = a(696),
        K = a(713),
        X = a(702),
        J = a(8),
        Q = a.n(J);
      function Z(e) {
        var t = e.participationWorth,
          a = e.participationsDefinitiveWorth,
          n = e.participationsDefinitive,
          r = e.currentBookWorth,
          i = e.powerKwhConsumption,
          o = e.handleInputChange,
          l = e.participationsReturnsKwhTotal,
          c = e.participationsIndicationOfRestitutionEnergyTaxTotal;
        return f.a.createElement(
          f.a.Fragment,
          null,
          f.a.createElement("hr", { style: { margin: "10px 0" } }),
          f.a.createElement("h4", null, "Postcoderoos kapitaal"),
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Huidige aantal participaties",
              value: n,
              className: "col-sm-6 form-group"
            }),
            f.a.createElement(z.a, {
              label: "Totale opbrengsten kWh",
              value: l,
              className: "col-sm-6 form-group"
            })
          ),
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Nominale waarde per participatie",
              value: Object(K.a)(t),
              className: "col-sm-6 form-group"
            }),
            f.a.createElement(z.a, {
              label: "Totale indicatie teruggave energie belasting",
              value: Object(K.a)(c),
              className: "col-sm-6 form-group"
            })
          ),
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Huidige boekwaarde per participatie",
              value: Object(K.a)(r),
              className: "col-sm-6 form-group"
            }),
            f.a.createElement(P.a, {
              type: "number",
              label: "Jaarlijks verbruik",
              name: "powerKwhConsumption",
              id: "powerKwhConsumption",
              value: i,
              onChangeAction: o
            })
          ),
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Huidige totale waarde participaties",
              value: Object(K.a)(a),
              className: "col-sm-6 form-group"
            })
          )
        );
      }
      A.a.locale("nl"),
        (Z.propTypes = {
          participationWorth: Q.a.number.isRequired,
          participationsDefinitive: Q.a.number.isRequired,
          participationsDefinitiveWorth: Q.a.number.isRequired,
          powerKwhConsumption: Q.a.number.isRequired,
          handleInputChange: Q.a.func.isRequired
        });
      var $ = Z;
      function ee(e) {
        var t = e.participationWorth,
          a = e.participationsDefinitiveWorth,
          n = e.participationsDefinitive,
          r = e.currentBookWorth;
        return f.a.createElement(
          f.a.Fragment,
          null,
          f.a.createElement("hr", { style: { margin: "10px 0" } }),
          f.a.createElement("h4", null, "Kapitaal"),
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Huidige aantal participaties",
              value: n,
              className: "col-sm-6 form-group"
            })
          ),
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Nominale waarde per participatie",
              value: Object(K.a)(t),
              className: "col-sm-6 form-group"
            })
          ),
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Huidige boekwaarde per participatie",
              value: Object(K.a)(r),
              className: "col-sm-6 form-group"
            })
          ),
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Huidige totale waarde",
              value: Object(K.a)(a),
              className: "col-sm-6 form-group"
            })
          )
        );
      }
      A.a.locale("nl"),
        (ee.propTypes = {
          participationWorth: Q.a.number.isRequired,
          participationsDefinitive: Q.a.number.isRequired,
          participationsDefinitiveWorth: Q.a.number.isRequired
        });
      var te = ee;
      function ae(e) {
        var t = e.participationWorth,
          a = e.participationsDefinitiveWorth,
          n = e.participationsDefinitive,
          r = e.currentBookWorth;
        return f.a.createElement(
          f.a.Fragment,
          null,
          f.a.createElement("hr", { style: { margin: "10px 0" } }),
          f.a.createElement("h4", null, "Obligaties"),
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Huidige aantal obligaties",
              value: n,
              className: "col-sm-6 form-group"
            })
          ),
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Nominale waarde per obligatie",
              value: Object(K.a)(t),
              className: "col-sm-6 form-group"
            })
          ),
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Huidige hoofdsom per obligatie",
              value: Object(K.a)(r),
              className: "col-sm-6 form-group"
            })
          ),
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Huidige totale waarde",
              value: Object(K.a)(a),
              className: "col-sm-6 form-group"
            })
          )
        );
      }
      A.a.locale("nl"),
        (ae.propTypes = {
          participationWorth: Q.a.number.isRequired,
          participationsDefinitive: Q.a.number.isRequired,
          participationsDefinitiveWorth: Q.a.number.isRequired
        });
      var ne = ae;
      function re(e, t) {
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
      function ie(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? re(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : re(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function oe(e) {
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
      A.a.locale("nl");
      var le = (function(e) {
          c()(a, e);
          var t = oe(a);
          function a(e) {
            var n;
            r()(this, a),
              (n = t.call(this, e)),
              v()(y()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  ie(
                    ie({}, n.state),
                    {},
                    {
                      participation: ie(
                        ie({}, n.state.participation),
                        {},
                        v()({}, r, a)
                      )
                    }
                  )
                );
              }),
              v()(y()(n), "handleInputChangeDate", function(e, t) {
                n.setState(
                  ie(
                    ie({}, n.state),
                    {},
                    {
                      participation: ie(
                        ie({}, n.state.participation),
                        {},
                        v()({}, t, e)
                      )
                    }
                  )
                );
              }),
              v()(y()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.participation,
                  a = {},
                  r = !1;
                Y.a.isEmpty(t.contactId + "") && ((a.contactId = !0), (r = !0)),
                  Y.a.isEmpty(t.statusId + "") && ((a.statusId = !0), (r = !0)),
                  Y.a.isEmpty(t.projectId + "") &&
                    ((a.projectId = !0), (r = !0)),
                  "loan" ===
                    n.props.participation.project.projectType.codeRef &&
                    Y.a.isEmpty(t.typeId + "") &&
                    ((a.typeId = !0), (r = !0)),
                  Y.a.isEmpty(t.ibanPayout) ||
                    _.isValidIBAN(t.ibanPayout) ||
                    ((a.ibanPayout = !0), (r = !0)),
                  n.setState(ie(ie({}, n.state), {}, { errors: a })),
                  r ||
                    (n.setState({ isSaving: !0 }),
                    T.a.updateParticipantProject(t.id, t).then(function(e) {
                      n.setState({ isSaving: !1 }),
                        n.props.fetchParticipantProjectDetails(t.id),
                        n.props.switchToView();
                    }));
              });
            var i = e.participation,
              o = i.id,
              l = i.didAcceptAgreement,
              c = i.dateDidAcceptAgreement,
              s = i.didUnderstandInfo,
              u = i.dateDidUnderstandInfo,
              p = i.giftedByContactId,
              m = i.ibanPayout,
              d = i.legalRepContactId,
              f = i.ibanPayoutAttn,
              h = i.typeId,
              g = i.powerKwhConsumption,
              b = i.dateRegister,
              E = i.dateTerminated,
              N = i.participantInDefinitiveRevenue;
            return (
              (n.state = {
                contacts: [],
                participation: {
                  id: o,
                  didAcceptAgreement: Boolean(l),
                  dateDidAcceptAgreement: c || "",
                  didUnderstandInfo: Boolean(s),
                  dateDidUnderstandInfo: u || "",
                  giftedByContactId: p || "",
                  ibanPayout: m || "",
                  legalRepContactId: d || "",
                  ibanPayoutAttn: f || "",
                  typeId: h || "",
                  powerKwhConsumption: g || "",
                  dateRegister:
                    b ||
                    (n.props.participation.project.dateEntry
                      ? n.props.participation.project.dateEntry
                      : ""),
                  dateTerminated: E || "",
                  participantInDefinitiveRevenue: N || !0
                },
                errors: { typeId: !1, ibanPayout: !1 },
                isSaving: !1
              }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  V.a.getContactsPeek().then(function(t) {
                    e.setState({ contacts: t });
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.participation,
                    t = e.didAcceptAgreement,
                    a = e.dateDidAcceptAgreement,
                    n = e.didUnderstandInfo,
                    r = e.dateDidUnderstandInfo,
                    i = e.giftedByContactId,
                    o = e.ibanPayout,
                    l = e.ibanPayoutAttn,
                    c = e.typeId,
                    s = e.powerKwhConsumption,
                    u = e.dateRegister,
                    p = e.dateTerminated,
                    m = this.props.participation,
                    d = m.contact,
                    h = m.uniqueMutationStatuses,
                    g = m.project,
                    y = m.participationsDefinitive,
                    b = m.participationsDefinitiveWorth,
                    v = m.participationsCapitalWorth,
                    E = m.amountDefinitive,
                    N = m.participationsReturnsTotal,
                    O = m.participationsReturnsKwhTotal,
                    w = m.participationsIndicationOfRestitutionEnergyTaxTotal,
                    C = g.projectType.codeRef;
                  return f.a.createElement(
                    "form",
                    {
                      className: "form-horizontal col-md-12",
                      onSubmit: this.handleSubmit
                    },
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(z.a, {
                        label: "Contact",
                        value: d ? d.fullName : "",
                        link: d ? "contact/" + d.id : "",
                        className: "col-sm-6 form-group"
                      }),
                      f.a.createElement(z.a, {
                        label: "Status",
                        value: h
                          .map(function(e) {
                            return e.name;
                          })
                          .join(", "),
                        className: "col-sm-6 form-group"
                      })
                    ),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(z.a, {
                        label: "Project",
                        value: g ? g.name : "",
                        link: g ? "project/" + g.id : "",
                        className: "col-sm-6 form-group"
                      }),
                      f.a.createElement(z.a, {
                        label: "Administratie",
                        value: g.administration ? g.administration.name : "",
                        className: "col-sm-6 form-group"
                      })
                    ),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      t
                        ? f.a.createElement(z.a, {
                            label: "Akkoord voorwaarden",
                            id: "didAcceptAgreement",
                            className: "form-group col-md-6",
                            value: t
                              ? f.a.createElement(
                                  "span",
                                  null,
                                  "Ja",
                                  " ",
                                  f.a.createElement(
                                    "em",
                                    null,
                                    "(",
                                    a ? A()(a).format("L") : "",
                                    ")"
                                  )
                                )
                              : "Nee"
                          })
                        : f.a.createElement(U.a, {
                            label: "Akkoord voorwaarden",
                            name: "didAcceptAgreement",
                            id: "didAcceptAgreement",
                            value: t,
                            onChangeAction: this.handleInputChange
                          }),
                      n
                        ? f.a.createElement(z.a, {
                            label: "Projectinfo begrepen",
                            id: "didUnderstandInfo",
                            className: "form-group col-md-6",
                            value: n
                              ? f.a.createElement(
                                  "span",
                                  null,
                                  "Ja",
                                  " ",
                                  f.a.createElement(
                                    "em",
                                    null,
                                    "(",
                                    r ? A()(r).format("L") : "",
                                    ")"
                                  )
                                )
                              : "Nee"
                          })
                        : f.a.createElement(U.a, {
                            label: "Projectinfo begrepen",
                            name: "didUnderstandInfo",
                            id: "didUnderstandInfo",
                            value: n,
                            onChangeAction: this.handleInputChange
                          })
                    ),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(H.a, {
                        label: "Schenker",
                        name: "giftedByContactId",
                        id: "giftedByContactId",
                        options: this.state.contacts,
                        optionName: "fullName",
                        value: i,
                        onChangeAction: this.handleInputChange
                      }),
                      f.a.createElement(P.a, {
                        label: "IBAN uitkeren",
                        name: "ibanPayout",
                        id: "ibanPayout",
                        value: o,
                        onChangeAction: this.handleInputChange,
                        error: this.state.errors.ibanPayout
                      })
                    ),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      "obligation" === C
                        ? f.a.createElement("div", {
                            className: "form-group col-md-6"
                          })
                        : null,
                      "loan" === C
                        ? f.a.createElement(z.a, {
                            label: "Huidig saldo lening rekening",
                            id: "amountDefinitive",
                            value: Object(K.a)(E),
                            className: "form-group col-md-6"
                          })
                        : null,
                      "capital" === C || "postalcode_link_capital" === C
                        ? f.a.createElement(z.a, {
                            label: "Huidig saldo kapitaal rekening",
                            id: "amountDefinitive",
                            value: Object(K.a)(v),
                            className: "form-group col-md-6"
                          })
                        : null,
                      f.a.createElement(P.a, {
                        label: "IBAN uitkeren t.n.v.",
                        name: "ibanPayoutAttn",
                        id: "ibanPayoutAttn",
                        value: l,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(z.a, {
                        label: "Totale opbrengsten",
                        id: "totalWorthParticipations",
                        className: "col-sm-6 form-group",
                        value: Object(K.a)(N)
                      }),
                      "loan" === C
                        ? f.a.createElement(H.a, {
                            label: "Uitkeren op",
                            name: "typeId",
                            id: "typeId",
                            options: this.props.participantProjectPayoutTypes,
                            value: c,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.typeId
                          })
                        : null
                    ),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(z.a, {
                        label: "Eerste ingangsdatum deelname",
                        id: "dateRegister",
                        value: u ? A()(u).format("DD-MM-Y") : "",
                        className: "col-sm-6 form-group"
                      }),
                      p
                        ? f.a.createElement(z.a, {
                            label: "Datum beeindiging deelname",
                            value: p ? A()(p).format("DD-MM-Y") : ""
                          })
                        : null
                    ),
                    "obligation" === C
                      ? f.a.createElement(ne, {
                          participationWorth: g.participationWorth,
                          participationsDefinitive: y,
                          participationsDefinitiveWorth: b,
                          currentBookWorth: g.currentBookWorth
                        })
                      : null,
                    "capital" === C
                      ? f.a.createElement(te, {
                          participationWorth: g.participationWorth,
                          participationsDefinitive: y,
                          participationsDefinitiveWorth: b,
                          currentBookWorth: g.currentBookWorth
                        })
                      : null,
                    "postalcode_link_capital" === C
                      ? f.a.createElement($, {
                          participationWorth: g.participationWorth,
                          participationsDefinitive: y,
                          participationsDefinitiveWorth: b,
                          currentBookWorth: g.currentBookWorth,
                          powerKwhConsumption: s,
                          participationsReturnsKwhTotal: O,
                          participationsIndicationOfRestitutionEnergyTaxTotal: w,
                          handleInputChange: this.handleInputChange
                        })
                      : null,
                    f.a.createElement(
                      X.a,
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
                          value: "Submit",
                          loading: this.state.isSaving
                        })
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        ce = Object(h.b)(
          function(e) {
            return {
              participation: e.participantProjectDetails,
              participantProjectPayoutTypes:
                e.systemData.participantProjectPayoutTypes
            };
          },
          function(e) {
            return {
              fetchParticipantProjectDetails: function(t) {
                e(j(t));
              }
            };
          }
        )(le);
      function se(e) {
        var t = e.participationWorth,
          a = e.participationsDefinitive,
          n = e.participationsDefinitiveWorth,
          r = e.currentBookWorth,
          i = e.onClick;
        return f.a.createElement(
          f.a.Fragment,
          null,
          f.a.createElement("hr", { style: { margin: "10px 0" } }),
          f.a.createElement("h4", null, "Obligaties"),
          f.a.createElement(
            "div",
            { className: "row", onClick: i },
            f.a.createElement(z.a, {
              label: "Huidige aantal obligaties",
              value: a
            })
          ),
          f.a.createElement(
            "div",
            { className: "row", onClick: i },
            f.a.createElement(z.a, {
              label: "Nominale waarde per obligatie",
              value: Object(K.a)(t)
            })
          ),
          f.a.createElement(
            "div",
            { className: "row", onClick: i },
            f.a.createElement(z.a, {
              label: "Huidige hoofdsom per obligatie",
              value: Object(K.a)(r)
            })
          ),
          f.a.createElement(
            "div",
            { className: "row", onClick: i },
            f.a.createElement(z.a, {
              label: "Huidige totale hoofdsom",
              value: Object(K.a)(n)
            })
          )
        );
      }
      se.propTypes = {
        onClick: J.func.isRequired,
        participationWorth: J.number.isRequired,
        participationsDefinitive: J.number.isRequired,
        participationsDefinitiveWorth: J.number.isRequired
      };
      var ue = se;
      function pe(e) {
        var t = e.participationWorth,
          a = e.participationsDefinitive,
          n = e.participationsDefinitiveWorth,
          r = e.currentBookWorth,
          i = e.onClick;
        return f.a.createElement(
          f.a.Fragment,
          null,
          f.a.createElement("hr", { style: { margin: "10px 0" } }),
          f.a.createElement("h4", null, "Kapitaal"),
          f.a.createElement(
            "div",
            { className: "row", onClick: i },
            f.a.createElement(z.a, {
              label: "Huidige aantal participaties",
              value: a
            })
          ),
          f.a.createElement(
            "div",
            { className: "row", onClick: i },
            f.a.createElement(z.a, {
              label: "Nominale waarde per participatie",
              value: Object(K.a)(t)
            })
          ),
          f.a.createElement(
            "div",
            { className: "row", onClick: i },
            f.a.createElement(z.a, {
              label: "Huidige boekwaarde per participatie",
              value: Object(K.a)(r)
            })
          ),
          f.a.createElement(
            "div",
            { className: "row", onClick: i },
            f.a.createElement(z.a, {
              label: "Huidige totale waarde",
              value: Object(K.a)(n)
            })
          )
        );
      }
      pe.propTypes = {
        onClick: J.func.isRequired,
        participationWorth: J.number.isRequired,
        participationsDefinitive: J.number.isRequired,
        participationsDefinitiveWorth: J.number.isRequired
      };
      var me = pe;
      function de(e) {
        var t = e.participationWorth,
          a = e.participationsDefinitive,
          n = e.participationsDefinitiveWorth,
          r = e.powerKwhConsumption,
          i = e.currentBookWorth,
          o = e.participationsReturnsKwhTotal,
          l = e.participationsIndicationOfRestitutionEnergyTaxTotal,
          c = e.onClick;
        return f.a.createElement(
          f.a.Fragment,
          null,
          f.a.createElement("hr", { style: { margin: "10px 0" } }),
          f.a.createElement("h4", null, "Postcoderoos kapitaal"),
          f.a.createElement(
            "div",
            { className: "row", onClick: c },
            f.a.createElement(z.a, {
              label: "Huidige aantal participaties",
              value: a
            }),
            f.a.createElement(z.a, {
              label: "Totale opbrengsten kWh",
              value: o
            })
          ),
          f.a.createElement(
            "div",
            { className: "row", onClick: c },
            f.a.createElement(z.a, {
              label: "Nominale waarde per participatie",
              value: Object(K.a)(t)
            }),
            f.a.createElement(z.a, {
              label: "Totale indicatie teruggave energie belasting",
              value: Object(K.a)(l)
            })
          ),
          f.a.createElement(
            "div",
            { className: "row", onClick: c },
            f.a.createElement(z.a, {
              label: "Huidige boekwaarde per participatie",
              value: Object(K.a)(i)
            }),
            f.a.createElement(z.a, { label: "Jaarlijks verbruik", value: r })
          ),
          f.a.createElement(
            "div",
            { className: "row", onClick: c },
            f.a.createElement(z.a, {
              label: "Huidige totale waarde participaties",
              value: Object(K.a)(n)
            })
          )
        );
      }
      de.propTypes = {
        onClick: J.func.isRequired,
        participationWorth: J.number.isRequired,
        participationsDefinitive: J.number.isRequired,
        participationsDefinitiveWorth: J.number.isRequired,
        powerKwhConsumption: J.number.isRequired
      };
      var fe = de;
      A.a.locale("nl");
      var he = Object(h.b)(function(e) {
        return { participantProject: e.participantProjectDetails };
      })(function(e) {
        var t = e.participantProject,
          a = t.contact,
          n = t.uniqueMutationStatuses,
          r = t.project,
          i = t.participationsDefinitive,
          o = t.participationsDefinitiveWorth,
          l = t.participationsCapitalWorth,
          c = t.amountDefinitive,
          s = t.didAcceptAgreement,
          u = t.dateDidAcceptAgreement,
          p = t.didUnderstandInfo,
          m = t.dateDidUnderstandInfo,
          d = t.giftedByContact,
          h = t.ibanPayout,
          g = t.ibanPayoutAttn,
          y = t.type,
          b = t.dateRegister,
          v = t.dateTerminated,
          E = t.powerKwhConsumption,
          N = t.participationsReturnsTotal,
          O = t.participationsReturnsKwhTotal,
          w = t.participationsIndicationOfRestitutionEnergyTaxTotal,
          C = e.participantProject.project.projectType.codeRef;
        return f.a.createElement(
          "div",
          null,
          f.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            f.a.createElement(z.a, {
              label: "Contact",
              value: a ? a.fullName : "",
              link: a ? "contact/" + a.id : ""
            }),
            f.a.createElement(z.a, {
              label: "Status",
              value: n
                .map(function(e) {
                  return e.name;
                })
                .join(", ")
            })
          ),
          f.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            f.a.createElement(z.a, {
              label: "Project",
              value: r ? r.name : "",
              link: r ? "project/" + r.id : ""
            }),
            f.a.createElement(z.a, {
              label: "Administratie",
              value: r.administration ? r.administration.name : ""
            })
          ),
          f.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            f.a.createElement(z.a, {
              label: "Akkoord voorwaarden",
              value: s
                ? f.a.createElement(
                    "span",
                    null,
                    "Ja ",
                    f.a.createElement(
                      "em",
                      null,
                      "(",
                      u ? A()(u).format("L") : "",
                      ")"
                    )
                  )
                : "Nee"
            }),
            f.a.createElement(z.a, {
              label: "Projectinfo begrepen",
              value: p
                ? f.a.createElement(
                    "span",
                    null,
                    "Ja ",
                    f.a.createElement(
                      "em",
                      null,
                      "(",
                      m ? A()(m).format("L") : "",
                      ")"
                    )
                  )
                : "Nee"
            })
          ),
          f.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            f.a.createElement(z.a, {
              label: "Schenker",
              value: d ? d.fullName : ""
            }),
            f.a.createElement(z.a, { label: "IBAN uitkeren", value: h || "" })
          ),
          f.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            "obligation" === C
              ? f.a.createElement("div", { className: "col-md-6" })
              : null,
            "loan" === C
              ? f.a.createElement(z.a, {
                  label: "Huidig saldo lening rekening",
                  value: Object(K.a)(c)
                })
              : null,
            "capital" === C || "postalcode_link_capital" === C
              ? f.a.createElement(z.a, {
                  label: "Huidig saldo kapitaal rekening",
                  value: Object(K.a)(l)
                })
              : null,
            f.a.createElement(z.a, {
              label: "IBAN uitkeren t.n.v.",
              value: g || ""
            })
          ),
          f.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            f.a.createElement(z.a, {
              label: "Totale opbrengsten",
              value: Object(K.a)(N)
            }),
            "loan" === r.projectType.codeRef
              ? f.a.createElement(z.a, {
                  label: "Uitkeren op",
                  value: y ? y.name : ""
                })
              : null
          ),
          f.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            f.a.createElement(z.a, {
              label: "Eerste ingangsdatum deelname",
              value: b ? A()(b).format("DD-MM-Y") : ""
            }),
            v
              ? f.a.createElement(z.a, {
                  label: "Datum beeindiging deelname",
                  value: v ? A()(v).format("DD-MM-Y") : ""
                })
              : null
          ),
          "obligation" === C
            ? f.a.createElement(ue, {
                onClick: e.switchToEdit,
                participationWorth: r.participationWorth
                  ? r.participationWorth
                  : "",
                participationsDefinitive: i,
                participationsDefinitiveWorth: o,
                currentBookWorth: r.currentBookWorth
              })
            : null,
          "capital" === C
            ? f.a.createElement(me, {
                onClick: e.switchToEdit,
                participationWorth: r.participationWorth
                  ? r.participationWorth
                  : "",
                participationsDefinitive: i,
                participationsDefinitiveWorth: o,
                currentBookWorth: r.currentBookWorth
              })
            : null,
          "postalcode_link_capital" === C
            ? f.a.createElement(fe, {
                onClick: e.switchToEdit,
                participationWorth: r.participationWorth
                  ? r.participationWorth
                  : "",
                participationsDefinitive: i,
                participationsDefinitiveWorth: o,
                currentBookWorth: r.currentBookWorth,
                participationsReturnsKwhTotal: O,
                participationsIndicationOfRestitutionEnergyTaxTotal: w,
                powerKwhConsumption: E
              })
            : null
        );
      });
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
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var ye = (function(e) {
          c()(a, e);
          var t = ge(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              v()(y()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              v()(y()(n), "switchToView", function() {
                n.setState({ showEdit: !1, activeDiv: "" });
              }),
              (n.state = { showEdit: !1, activeDiv: "" }),
              n
            );
          }
          return (
            o()(a, [
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
                      O.a,
                      null,
                      this.state.showEdit &&
                        this.props.permissions.manageParticipation
                        ? f.a.createElement(ce, {
                            switchToView: this.switchToView
                          })
                        : f.a.createElement(he, {
                            switchToEdit: this.switchToEdit
                          })
                    )
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        be = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(ye),
        ve = a(199),
        Ee = a.n(ve),
        Ne = a(223);
      A.a.locale("nl");
      var Oe = Object(h.b)(function(e) {
        return { permissions: e.meDetails.permissions };
      })(function(e) {
        var t = e.obligationNumber.number;
        return f.a.createElement(
          "div",
          {
            className: "row border ".concat(e.highlightLine),
            onMouseEnter: function() {
              return e.onLineEnter();
            },
            onMouseLeave: function() {
              return e.onLineLeave();
            }
          },
          f.a.createElement(
            "div",
            { onClick: e.openEdit },
            f.a.createElement("div", { className: "col-sm-11" }, t)
          ),
          f.a.createElement(
            "div",
            { className: "col-sm-1" },
            e.showActionButtons && e.permissions.manageFinancial
              ? f.a.createElement(
                  "a",
                  { role: "button", onClick: e.openEdit },
                  f.a.createElement("span", {
                    className: "glyphicon glyphicon-pencil mybtn-success"
                  }),
                  " "
                )
              : "",
            e.showActionButtons && e.permissions.manageFinancial
              ? f.a.createElement(
                  "a",
                  { role: "button", onClick: e.toggleDelete },
                  f.a.createElement("span", {
                    className: "glyphicon glyphicon-trash mybtn-danger"
                  }),
                  " "
                )
              : ""
          )
        );
      });
      A.a.locale("nl");
      var we = function(e) {
          var t = e.obligationNumber.number;
          return f.a.createElement(
            "div",
            null,
            f.a.createElement(
              "form",
              { className: "form-horizontal", onSubmit: e.handleSubmit },
              f.a.createElement(
                N.a,
                { className: "panel-grey" },
                f.a.createElement(
                  O.a,
                  null,
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    f.a.createElement(P.a, {
                      label: "Nummer",
                      id: "number",
                      name: "number",
                      value: t,
                      onChangeAction: e.handleInputChange,
                      required: "required",
                      error: e.errors.number
                    })
                  ),
                  f.a.createElement(
                    "div",
                    { className: "pull-right btn-group", role: "group" },
                    f.a.createElement(I.a, {
                      buttonClassName: "btn-default",
                      buttonText: "Annuleren",
                      onClickAction: e.cancelEdit
                    }),
                    f.a.createElement(I.a, {
                      buttonText: "Opslaan",
                      onClickAction: e.handleSubmit,
                      type: "submit",
                      value: "Submit"
                    })
                  )
                )
              )
            )
          );
        },
        Ce = Object(h.b)(null, function(e) {
          return {
            deleteObligationNumber: function(t) {
              e(
                (function(e) {
                  return { type: "DELETE_OBLIGATION_NUMBER", id: e };
                })(t)
              );
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
                  e.deleteObligationNumber(e.id), void e.closeDeleteItemModal()
                );
              },
              title: "Verwijderen"
            },
            f.a.createElement(
              "p",
              null,
              "Verwijder obligatienummer ",
              f.a.createElement("strong", null, " ", "".concat(e.number), " "),
              "?"
            )
          );
        }),
        je = a(208),
        De = a(152);
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
                v()(e, t, a[t]);
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
      function qe(e) {
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
      var ke = (function(e) {
          c()(a, e);
          var t = qe(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              v()(y()(n), "toggleErrorModal", function() {
                n.setState({ showModalError: !n.state.showModalError });
              }),
              v()(y()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              v()(y()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              v()(y()(n), "openEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              v()(y()(n), "closeEdit", function() {
                n.setState({ showEdit: !1 });
              }),
              v()(y()(n), "cancelEdit", function() {
                n.setState(
                  Me(
                    Me({}, n.state),
                    {},
                    { obligationNumber: Me({}, n.props.obligationNumber) }
                  )
                ),
                  n.closeEdit();
              }),
              v()(y()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              v()(y()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Me(
                    Me({}, n.state),
                    {},
                    {
                      obligationNumber: Me(
                        Me({}, n.state.obligationNumber),
                        {},
                        v()({}, r, a)
                      )
                    }
                  )
                );
              }),
              v()(y()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.obligationNumber,
                  a = {},
                  r = !1;
                Y.a.isEmpty(t.number)
                  ? ((a.number = !0), (r = !0))
                  : n.state.obligationNumbers.includes(t.number) &&
                    (n.setState({
                      showModalError: !n.state.showModalError,
                      modalErrorTitle: "Waarschuwing",
                      modalErrorMessage: "Dit obligatienummer bestaat al."
                    }),
                    (a.number = !0),
                    (r = !0)),
                  n.setState(Me(Me({}, n.state), {}, { errors: a })),
                  !r &&
                    Ne.a.updateObligationNumber(t).then(function(e) {
                      n.props.updateObligationNumber(e), n.closeEdit();
                    });
              }),
              (n.state = {
                showActionButtons: !1,
                highlightLine: "",
                showEdit: !1,
                showDelete: !1,
                obligationNumbers: [],
                obligationNumber: Me({}, e.obligationNumber),
                errors: { number: !1 }
              }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  De.a
                    .fetchObligationNumbers(this.props.projectId)
                    .then(function(t) {
                      e.setState({ obligationNumbers: t });
                    });
                }
              },
              {
                key: "render",
                value: function() {
                  return f.a.createElement(
                    "div",
                    null,
                    f.a.createElement(Oe, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      openEdit: this.openEdit,
                      toggleDelete: this.toggleDelete,
                      obligationNumber: this.state.obligationNumber
                    }),
                    this.state.showEdit &&
                      this.props.permissions.manageFinancial &&
                      f.a.createElement(we, {
                        obligationNumber: this.state.obligationNumber,
                        handleInputChange: this.handleInputChange,
                        handleSubmit: this.handleSubmit,
                        cancelEdit: this.cancelEdit,
                        errors: this.state.errors
                      }),
                    this.state.showDelete &&
                      this.props.permissions.manageFinancial &&
                      f.a.createElement(
                        Ce,
                        Ee()(
                          { closeDeleteItemModal: this.toggleDelete },
                          this.props.obligationNumber
                        )
                      ),
                    this.state.showModalError &&
                      f.a.createElement(je.a, {
                        closeModal: this.toggleErrorModal,
                        title: this.state.modalErrorTitle,
                        errorMessage: this.state.modalErrorMessage
                      })
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        Pe = Object(h.b)(
          function(e) {
            return {
              id: e.participantProjectDetails.id,
              projectId: e.participantProjectDetails.projectId,
              permissions: e.meDetails.permissions
            };
          },
          function(e) {
            return {
              updateObligationNumber: function(t) {
                e(
                  (function(e) {
                    return {
                      type: "UPDATE_OBLIGATION_NUMBER",
                      obligationNumber: e
                    };
                  })(t)
                );
              }
            };
          }
        )(ke),
        Re = Object(h.b)(function(e) {
          return {
            obligationNumbers: e.participantProjectDetails.obligationNumbers
          };
        })(function(e) {
          return f.a.createElement(
            "div",
            null,
            f.a.createElement(
              "div",
              { className: "row border header" },
              f.a.createElement("div", { className: "col-sm-11" }, "Nummer"),
              f.a.createElement("div", { className: "col-sm-1" })
            ),
            e.obligationNumbers.length > 0
              ? e.obligationNumbers.map(function(e) {
                  return f.a.createElement(Pe, {
                    key: e.id,
                    obligationNumber: e
                  });
                })
              : f.a.createElement("div", null, "Geen obligatienummers bekend.")
          );
        });
      function Ae(e, t) {
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
      function Te(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Ae(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Ae(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Se(e) {
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
      var Fe = (function(e) {
          c()(a, e);
          var t = Se(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              v()(y()(n), "toggleErrorModal", function() {
                n.setState({ showModalError: !n.state.showModalError });
              }),
              v()(y()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Te(
                    Te({}, n.state),
                    {},
                    {
                      obligationNumber: Te(
                        Te({}, n.state.obligationNumber),
                        {},
                        v()({}, r, a)
                      )
                    }
                  )
                );
              }),
              v()(y()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.obligationNumber,
                  a = {},
                  r = !1;
                Y.a.isEmpty(t.number)
                  ? ((a.number = !0), (r = !0))
                  : n.state.obligationNumbers.includes(t.number) &&
                    (n.setState({
                      showModalError: !n.state.showModalError,
                      modalErrorTitle: "Waarschuwing",
                      modalErrorMessage: "Dit obligatienummer bestaat al."
                    }),
                    (a.number = !0),
                    (r = !0)),
                  n.setState(Te(Te({}, n.state), {}, { errors: a })),
                  !r &&
                    Ne.a.newObligationNumber(t).then(function(e) {
                      n.props.newObligationNumber(e), n.props.toggleShowNew();
                    });
              }),
              (n.state = {
                obligationNumbers: [],
                obligationNumber: { participationId: n.props.id, number: "" },
                errors: { number: !1 }
              }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  De.a
                    .fetchObligationNumbers(this.props.projectId)
                    .then(function(t) {
                      e.setState({ obligationNumbers: t });
                    });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.obligationNumber.number;
                  return f.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    f.a.createElement(
                      N.a,
                      { className: "panel-grey" },
                      f.a.createElement(
                        O.a,
                        null,
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(P.a, {
                            label: "Nummer",
                            id: "number",
                            name: "number",
                            value: e,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.number
                          })
                        ),
                        f.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          f.a.createElement(I.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          f.a.createElement(I.a, {
                            buttonText: "Opslaan",
                            onClickAction: this.handleSubmit,
                            type: "submit",
                            value: "Submit"
                          })
                        ),
                        this.state.showModalError &&
                          f.a.createElement(je.a, {
                            closeModal: this.toggleErrorModal,
                            title: this.state.modalErrorTitle,
                            errorMessage: this.state.modalErrorMessage
                          })
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        Ge = Object(h.b)(
          function(e) {
            return {
              id: e.participantProjectDetails.id,
              projectId: e.participantProjectDetails.projectId
            };
          },
          function(e) {
            return {
              newObligationNumber: function(t) {
                e(
                  (function(e) {
                    return {
                      type: "NEW_OBLIGATION_NUMBER",
                      obligationNumber: e
                    };
                  })(t)
                );
              }
            };
          }
        )(Fe),
        Be = a(698);
      function xe(e) {
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
      var Le = (function(e) {
          c()(a, e);
          var t = xe(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              v()(y()(n), "toggleShowNew", function() {
                n.setState({ showNew: !n.state.showNew });
              }),
              (n.state = { showNew: !1 }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  return f.a.createElement(
                    N.a,
                    null,
                    f.a.createElement(
                      Be.a,
                      null,
                      f.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Obligatienummers"
                      ),
                      this.props.permissions.manageFinancial &&
                        f.a.createElement(
                          "a",
                          {
                            role: "button",
                            className: "pull-right",
                            onClick: this.toggleShowNew
                          },
                          f.a.createElement("span", {
                            className: "glyphicon glyphicon-plus"
                          })
                        )
                    ),
                    f.a.createElement(
                      O.a,
                      null,
                      f.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        f.a.createElement(Re, null)
                      ),
                      f.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          f.a.createElement(Ge, {
                            toggleShowNew: this.toggleShowNew
                          })
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        We = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(Le),
        Ye = a(784),
        Ve = a.n(Ye),
        _e = a(786),
        ze = a(422);
      function Ue() {
        var e = Ve()([
          "\n    width: ",
          ";\n    position: relative;\n    min-height: 1px;\n    padding-right: 6px;\n    padding-left: 6px;\n    float: left;\n"
        ]);
        return (
          (Ue = function() {
            return e;
          }),
          e
        );
      }
      function He() {
        var e = Ve()([
          "\n    display: flex;\n    flex-flow: row nowrap;\n    justify-content: space-around;\n"
        ]);
        return (
          (He = function() {
            return e;
          }),
          e
        );
      }
      A.a.locale("nl");
      var Ke = _e.a.div(He()),
        Xe = _e.a.div(Ue(), function(e) {
          return e.columnWidth ? e.columnWidth : "100px";
        }),
        Je = Object(h.b)(function(e) {
          return {
            permissions: e.meDetails.permissions,
            projectTypeCodeRef:
              e.participantProjectDetails.project.projectType.codeRef,
            participantInDefinitiveRevenue:
              e.participantProjectDetails.participantInDefinitiveRevenue,
            participantProjectDateTerminated:
              e.participantProjectDetails.dateTerminated
          };
        })(function(e) {
          var t = e.highlightLine,
            a = e.onLineEnter,
            n = e.onLineLeave,
            r = e.openEdit,
            i = e.showActionButtons,
            o = e.toggleDelete,
            l = e.permissions,
            c = e.projectTypeCodeRef,
            s = e.participantMutation,
            u = e.participantInDefinitiveRevenue,
            p = e.participantProjectDateTerminated,
            m = s.type,
            d = (s.dateCreation, s.status),
            h = s.datePayment,
            g = s.dateEntry,
            y = s.amount,
            b = s.participationWorth,
            v = s.quantity,
            E = s.returns,
            N = s.payoutKwh,
            O = s.indicationOfRestitutionEnergyTax,
            w = s.deletedAt;
          return f.a.createElement(
            "div",
            {
              className: "row border ".concat(t),
              onMouseEnter: function() {
                return a();
              },
              onMouseLeave: function() {
                return n();
              }
            },
            f.a.createElement(
              Ke,
              { onClick: r },
              f.a.createElement(Xe, { columnWidth: "100px" }, m.name),
              f.a.createElement(Xe, { columnWidth: "80px" }, d && d.name),
              f.a.createElement(
                Xe,
                { columnWidth: "100px" },
                h ? A()(h).format("L") : ""
              ),
              f.a.createElement(
                Xe,
                { columnWidth: "100px" },
                g ? A()(g).format("L") : ""
              ),
              f.a.createElement(Xe, { columnWidth: "120px" }, m.description),
              "loan" === c
                ? f.a.createElement(Xe, null, y && Object(K.a)(y))
                : null,
              "capital" === c || "postalcode_link_capital" === c
                ? f.a.createElement(Xe, null, (y || b) && Object(K.a)(y + b))
                : null,
              ("obligation" === c ||
                "capital" === c ||
                "postalcode_link_capital" === c) &&
                f.a.createElement(Xe, null, v),
              f.a.createElement(Xe, null, E && Object(K.a)(E)),
              "postalcode_link_capital" === c && f.a.createElement(Xe, null, N),
              "postalcode_link_capital" === c &&
                f.a.createElement(Xe, null, O && Object(K.a)(O)),
              !w &&
                f.a.createElement(
                  Xe,
                  { columnWidth: "6%" },
                  i && l.manageFinancial
                    ? f.a.createElement(
                        "a",
                        { role: "button", onClick: r },
                        f.a.createElement("span", {
                          className: "glyphicon glyphicon-pencil mybtn-success"
                        }),
                        " "
                      )
                    : "",
                  !u && null === p && i && l.manageFinancial
                    ? f.a.createElement(
                        "a",
                        { role: "button", onClick: o },
                        f.a.createElement("span", {
                          className: "glyphicon glyphicon-trash mybtn-danger"
                        }),
                        " "
                      )
                    : ""
                )
            )
          );
        });
      A.a.locale("nl");
      var Qe = function(e) {
          var t = e.createdAt,
            a = e.createdBy,
            n = e.updatedAt,
            r = e.updatedBy;
          return f.a.createElement(
            f.a.Fragment,
            null,
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(z.a, {
                label: "Gemaakt door",
                className: "col-sm-6 form-group",
                value: a ? a.fullName : "Onbekend",
                link: a ? "gebruiker/" + a.id : ""
              }),
              f.a.createElement(z.a, {
                label: "Laatste update door",
                className: "col-sm-6 form-group",
                value: r ? r.fullName : "Onbekend",
                link: r ? "gebruiker/" + r.id : ""
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(z.a, {
                label: "Gemaakt op",
                className: "col-sm-6 form-group",
                value: t ? A()(t).format("L HH:mm:ss") : "Onbekend"
              }),
              f.a.createElement(z.a, {
                label: "Laatste update op",
                className: "col-sm-6 form-group",
                value: n ? A()(n).format("L HH:mm:ss") : "Onbekend"
              })
            )
          );
        },
        Ze = function(e) {
          var t = e.createdAt,
            a = e.createdBy,
            n = e.updatedAt,
            r = e.updatedBy,
            i = Object(d.useState)(!0),
            o = q()(i, 2),
            l = o[0],
            c = o[1];
          return f.a.createElement(
            f.a.Fragment,
            null,
            f.a.createElement(
              Be.a,
              null,
              f.a.createElement(
                "div",
                {
                  className: "row",
                  onClick: function() {
                    return c(!l);
                  }
                },
                l
                  ? f.a.createElement("span", {
                      className: "glyphicon glyphicon-menu-down"
                    })
                  : f.a.createElement("span", {
                      className: "glyphicon glyphicon-menu-right"
                    }),
                f.a.createElement(
                  "span",
                  { className: "h5" },
                  "Afsluiting gegevens"
                )
              )
            ),
            l
              ? f.a.createElement(Qe, {
                  createdAt: t,
                  createdBy: a,
                  updatedAt: n,
                  updatedBy: r
                })
              : null
          );
        };
      function $e(e) {
        var t = e.participantMutationFromProps,
          a = e.cancelEdit,
          n = t.type,
          r = t.paidOn,
          i = t.payoutKwhPrice,
          o = t.createdAt,
          l = t.createdBy,
          c = t.updatedAt,
          s = t.updatedBy;
        return f.a.createElement(
          O.a,
          null,
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Type",
              id: "type",
              className: "col-sm-6 form-group",
              value: n.name
            }),
            f.a.createElement(z.a, {
              label: "Energieleverancier",
              id: "paidOn",
              className: "col-sm-6 form-group",
              value: r
            })
          ),
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Opbrengst kWh",
              id: "payoutKwhPrice",
              className: "col-sm-6 form-group",
              value: i
            })
          ),
          f.a.createElement(Ze, {
            createdAt: o,
            createdBy: l,
            updatedAt: c,
            updatedBy: s
          }),
          f.a.createElement(
            "div",
            { className: "pull-right btn-group", role: "group" },
            f.a.createElement(I.a, { buttonText: "Sluiten", onClickAction: a })
          )
        );
      }
      $e.propTypes = {
        type: J.object,
        originalStatus: J.object,
        paidOn: J.string,
        cancelEdit: J.func,
        createdAt: J.object,
        createdBy: J.object,
        updatedAt: J.object,
        updatedBy: J.object
      };
      var et = $e;
      function tt(e) {
        var t = e.participantMutationFromProps,
          a = e.cancelEdit,
          n = t.type,
          r = t.returns,
          i = t.entry,
          o = t.datePayment,
          l = t.paidOn,
          c = t.createdAt,
          s = t.createdBy,
          u = t.updatedAt,
          p = t.updatedBy;
        return f.a.createElement(
          O.a,
          null,
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Type",
              id: "type",
              className: "col-sm-6 form-group",
              value: n.name
            })
          ),
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Opbrengst",
              id: "returns",
              className: "col-sm-6 form-group",
              value: Object(K.a)(r)
            }),
            f.a.createElement(z.a, {
              label: "Boekstuk",
              id: "entry",
              className: "col-sm-6 form-group",
              value: i
            })
          ),
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Betaal datum",
              id: "datePayment",
              className: "col-sm-6 form-group",
              value: o ? A()(o).format("L") : ""
            }),
            f.a.createElement(z.a, {
              label: "Uitgekeerd op of via",
              id: "paidOn",
              className: "col-sm-6 form-group",
              value: l
            })
          ),
          f.a.createElement(Ze, {
            createdAt: c,
            createdBy: s,
            updatedAt: u,
            updatedBy: p
          }),
          f.a.createElement(
            "div",
            { className: "pull-right btn-group", role: "group" },
            f.a.createElement(I.a, { buttonText: "Sluiten", onClickAction: a })
          )
        );
      }
      tt.propTypes = {
        type: J.object,
        originalStatus: J.object,
        returns: J.string,
        datePayment: J.object,
        entry: J.string,
        paidOn: J.string,
        cancelEdit: J.func,
        createdAt: J.object,
        createdBy: J.object,
        updatedAt: J.object,
        updatedBy: J.object
      };
      var at = tt,
        nt = function(e) {
          var t = e.participantMutationFromState,
            a = e.participantMutationFromProps,
            n = e.handleInputChange,
            r = e.handleInputChangeDate,
            i = e.errors,
            o = e.errorMessage,
            l = e.projectTypeCodeRef;
          return f.a.createElement(
            f.a.Fragment,
            null,
            a.status.id !== Number(t.statusId)
              ? f.a.createElement(
                  f.a.Fragment,
                  null,
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    "loan" === l
                      ? f.a.createElement(z.a, {
                          label: "Bedrag interesse",
                          id: "amountInterest",
                          className: "col-sm-6 form-group",
                          value: Object(K.a)(a.amountInterest)
                        })
                      : f.a.createElement(z.a, {
                          label: "Aantal interesse",
                          id: "quantityInterest",
                          className: "col-sm-6 form-group",
                          value: a.quantityInterest
                        }),
                    f.a.createElement(z.a, {
                      label: "Interessedatum",
                      id: "dateInterest",
                      className: "col-sm-6 form-group",
                      value: a.dateInterest && A()(a.dateInterest).format("L")
                    })
                  ),
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    "loan" === l
                      ? f.a.createElement(P.a, {
                          type: "number",
                          label: "Bedrag inschrijving",
                          id: "amountOption",
                          name: "amountOption",
                          value: t.amountOption,
                          onChangeAction: n,
                          required: "required",
                          error: i.amountOption,
                          errorMessage: o.amountOption
                        })
                      : f.a.createElement(P.a, {
                          type: "number",
                          label: "Aantal inschrijving",
                          id: "quantityOption",
                          name: "quantityOption",
                          value: t.quantityOption,
                          onChangeAction: n,
                          required: "required",
                          error: i.quantityOption,
                          errorMessage: o.quantityOption
                        }),
                    f.a.createElement(k.a, {
                      label: "Inschrijvingsdatum",
                      name: "dateOption",
                      value: t.dateOption,
                      onChangeAction: r,
                      required: "required",
                      error: i.dateOption
                    })
                  )
                )
              : f.a.createElement(
                  "div",
                  { className: "row" },
                  "loan" === l
                    ? f.a.createElement(P.a, {
                        type: "number",
                        label: "Bedrag interesse",
                        id: "amountInterest",
                        name: "amountInterest",
                        value: t.amountInterest,
                        onChangeAction: n,
                        error: i.amountInterest,
                        errorMessage: o.amountInterest
                      })
                    : f.a.createElement(P.a, {
                        type: "number",
                        label: "Aantal interesse",
                        id: "quantityInterest",
                        name: "quantityInterest",
                        value: t.quantityInterest,
                        onChangeAction: n,
                        error: i.quantityInterest,
                        errorMessage: o.quantityInterest
                      }),
                  f.a.createElement(k.a, {
                    label: "Interessedatum",
                    name: "dateInterest",
                    value: t.dateInterest,
                    onChangeAction: r
                  })
                )
          );
        },
        rt = function(e) {
          var t = e.participantMutationFromState,
            a = e.participantMutationFromProps,
            n = e.handleInputChange,
            r = e.handleInputChangeDate,
            i = e.errors,
            o = e.errorMessage,
            l = e.projectTypeCodeRef;
          return f.a.createElement(
            f.a.Fragment,
            null,
            a.status.id !== Number(t.statusId)
              ? f.a.createElement(
                  f.a.Fragment,
                  null,
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    "loan" === l
                      ? f.a.createElement(z.a, {
                          label: "Bedrag interesse",
                          id: "amountInterest",
                          className: "col-sm-6 form-group",
                          value: Object(K.a)(a.amountInterest)
                        })
                      : f.a.createElement(z.a, {
                          label: "Aantal interesse",
                          id: "quantityInterest",
                          className: "col-sm-6 form-group",
                          value: a.quantityInterest
                        }),
                    f.a.createElement(z.a, {
                      label: "Interessedatum",
                      id: "dateInterest",
                      className: "col-sm-6 form-group",
                      value: a.dateInterest && A()(a.dateInterest).format("L")
                    })
                  ),
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    "loan" === l
                      ? f.a.createElement(z.a, {
                          label: "Bedrag inschrijving",
                          id: "amountOption",
                          className: "col-sm-6 form-group",
                          value: Object(K.a)(a.amountOption)
                        })
                      : f.a.createElement(z.a, {
                          label: "Aantal inschrijving",
                          id: "quantityOption",
                          className: "col-sm-6 form-group",
                          value: a.quantityOption
                        }),
                    f.a.createElement(z.a, {
                      label: "Inschrijvingsdatum",
                      id: "dateOption",
                      className: "col-sm-6 form-group",
                      value: a.dateOption && A()(a.dateOption).format("L")
                    })
                  ),
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    "loan" === l
                      ? f.a.createElement(P.a, {
                          type: "number",
                          label: "Bedrag toegekend",
                          id: "amountGranted",
                          name: "amountGranted",
                          value: t.amountGranted,
                          onChangeAction: n,
                          required: "required",
                          error: i.amountGranted,
                          errorMessage: o.amountGranted
                        })
                      : f.a.createElement(P.a, {
                          type: "number",
                          label: "Aantal toegekend",
                          id: "quantityGranted",
                          name: "quantityGranted",
                          value: t.quantityGranted,
                          onChangeAction: n,
                          required: "required",
                          error: i.quantityGranted,
                          errorMessage: o.quantityGranted
                        }),
                    f.a.createElement(k.a, {
                      label: "Toewijzingsdatum",
                      name: "dateGranted",
                      value: t.dateGranted,
                      onChangeAction: r,
                      required: "required",
                      error: i.dateGranted
                    })
                  )
                )
              : f.a.createElement(
                  f.a.Fragment,
                  null,
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    "loan" === l
                      ? f.a.createElement(z.a, {
                          label: "Bedrag interesse",
                          id: "amountInterest",
                          className: "col-sm-6 form-group",
                          value: Object(K.a)(a.amountInterest)
                        })
                      : f.a.createElement(z.a, {
                          label: "Aantal interesse",
                          id: "quantityInterest",
                          className: "col-sm-6 form-group",
                          value: a.quantityInterest
                        }),
                    f.a.createElement(z.a, {
                      label: "Interessedatum",
                      id: "dateInterest",
                      className: "col-sm-6 form-group",
                      value: a.dateInterest && A()(a.dateInterest).format("L")
                    })
                  ),
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    "loan" === l
                      ? f.a.createElement(P.a, {
                          type: "number",
                          label: "Bedrag inschrijving",
                          id: "amountOption",
                          name: "amountOption",
                          value: t.amountOption,
                          onChangeAction: n,
                          required: "required",
                          error: i.amountOption,
                          errorMessage: o.amountOption
                        })
                      : f.a.createElement(P.a, {
                          type: "number",
                          label: "Aantal inschrijving",
                          id: "quantityOption",
                          name: "quantityOption",
                          value: t.quantityOption,
                          onChangeAction: n,
                          required: "required",
                          error: i.quantityOption,
                          errorMessage: o.quantityOption
                        }),
                    f.a.createElement(k.a, {
                      label: "Inschrijvingsdatum",
                      name: "dateOption",
                      value: t.dateOption,
                      onChangeAction: r,
                      required: "required",
                      error: i.dateOption
                    })
                  )
                )
          );
        },
        it = function(e) {
          var t = e.participantMutationFromState,
            a = e.participantMutationFromProps,
            n = e.handleInputChange,
            r = e.handleInputChangeDate,
            i = e.errors,
            o = e.errorMessage,
            l = e.projectTypeCodeRef;
          return f.a.createElement(
            f.a.Fragment,
            null,
            a.status.id !== Number(t.statusId)
              ? f.a.createElement(
                  f.a.Fragment,
                  null,
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    "loan" === l
                      ? f.a.createElement(z.a, {
                          label: "Bedrag interesse",
                          id: "amountInterest",
                          className: "col-sm-6 form-group",
                          value: Object(K.a)(a.amountInterest)
                        })
                      : f.a.createElement(z.a, {
                          label: "Aantal interesse",
                          id: "quantityInterest",
                          className: "col-sm-6 form-group",
                          value: a.quantityInterest
                        }),
                    f.a.createElement(z.a, {
                      label: "Interessedatum",
                      id: "dateInterest",
                      className: "col-sm-6 form-group",
                      value: a.dateInterest && A()(a.dateInterest).format("L")
                    })
                  ),
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    "loan" === l
                      ? f.a.createElement(z.a, {
                          label: "Bedrag inschrijving",
                          id: "amountOption",
                          className: "col-sm-6 form-group",
                          value: Object(K.a)(a.amountOption)
                        })
                      : f.a.createElement(z.a, {
                          label: "Aantal inschrijving",
                          id: "quantityOption",
                          className: "col-sm-6 form-group",
                          value: a.quantityOption
                        }),
                    f.a.createElement(z.a, {
                      label: "Inschrijvingsdatum",
                      id: "dateOption",
                      className: "col-sm-6 form-group",
                      value: a.dateOption && A()(a.dateOption).format("L")
                    })
                  ),
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    "loan" === l
                      ? f.a.createElement(z.a, {
                          label: "Bedrag toegekend",
                          id: "amountGranted",
                          className: "col-sm-6 form-group",
                          value: Object(K.a)(a.amountGranted)
                        })
                      : f.a.createElement(z.a, {
                          label: "Aantal toegekend",
                          id: "quantityGranted",
                          className: "col-sm-6 form-group",
                          value: a.quantityGranted
                        }),
                    f.a.createElement(z.a, {
                      label: "Toewijzingsdatum",
                      id: "dateGranted",
                      className: "col-sm-6 form-group",
                      value: a.dateGranted && A()(a.dateGranted).format("L")
                    })
                  ),
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    "loan" === l
                      ? f.a.createElement(P.a, {
                          type: "number",
                          label: "Bedrag definitief",
                          id: "amountFinal",
                          name: "amountFinal",
                          value: t.amountFinal,
                          onChangeAction: n,
                          required: "required",
                          error: i.amountFinal,
                          errorMessage: o.amountFinal
                        })
                      : f.a.createElement(P.a, {
                          type: "number",
                          label: "Aantal definitief",
                          id: "quantityFinal",
                          name: "quantityFinal",
                          value: t.quantityFinal,
                          onChangeAction: n,
                          required: "required",
                          error: i.quantityFinal,
                          errorMessage: o.quantityFinal
                        }),
                    f.a.createElement(k.a, {
                      label: "Ingangsdatum",
                      name: "dateEntry",
                      value: t.dateEntry,
                      onChangeAction: r,
                      required: "required",
                      error: i.dateEntry
                    })
                  ),
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    f.a.createElement(k.a, {
                      label: "Contract retour",
                      name: "dateContractRetour",
                      value: t.dateContractRetour,
                      onChangeAction: r
                    }),
                    f.a.createElement(k.a, {
                      label: "Betaal datum",
                      name: "datePayment",
                      value: t.datePayment,
                      onChangeAction: r
                    })
                  )
                )
              : f.a.createElement(
                  f.a.Fragment,
                  null,
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    "loan" === l
                      ? f.a.createElement(z.a, {
                          label: "Bedrag interesse",
                          id: "amountInterest",
                          className: "col-sm-6 form-group",
                          value: Object(K.a)(a.amountInterest)
                        })
                      : f.a.createElement(z.a, {
                          label: "Aantal interesse",
                          id: "quantityInterest",
                          className: "col-sm-6 form-group",
                          value: a.quantityInterest
                        }),
                    f.a.createElement(z.a, {
                      label: "Interessedatum",
                      id: "dateInterest",
                      className: "col-sm-6 form-group",
                      value: a.dateInterest && A()(a.dateInterest).format("L")
                    })
                  ),
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    "loan" === l
                      ? f.a.createElement(z.a, {
                          label: "Bedrag inschrijving",
                          id: "amountOption",
                          className: "col-sm-6 form-group",
                          value: Object(K.a)(a.amountOption)
                        })
                      : f.a.createElement(z.a, {
                          label: "Aantal inschrijving",
                          id: "quantityOption",
                          className: "col-sm-6 form-group",
                          value: a.quantityOption
                        }),
                    f.a.createElement(z.a, {
                      label: "Inschrijvingsdatum",
                      id: "dateOption",
                      className: "col-sm-6 form-group",
                      value: a.dateOption && A()(a.dateOption).format("L")
                    })
                  ),
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    "loan" === l
                      ? f.a.createElement(P.a, {
                          type: "number",
                          label: "Bedrag toegekend",
                          id: "amountGranted",
                          name: "amountGranted",
                          value: t.amountGranted,
                          onChangeAction: n,
                          required: "required",
                          error: i.amountGranted,
                          errorMessage: o.amountGranted
                        })
                      : f.a.createElement(P.a, {
                          type: "number",
                          label: "Aantal toegekend",
                          id: "quantityGranted",
                          name: "quantityGranted",
                          value: t.quantityGranted,
                          onChangeAction: n,
                          required: "required",
                          error: i.quantityGranted,
                          errorMessage: o.quantityGranted
                        }),
                    f.a.createElement(k.a, {
                      label: "Datum toegekend",
                      name: "dateGranted",
                      value: t.dateGranted,
                      onChangeAction: r,
                      required: "required",
                      error: i.dateGranted
                    })
                  )
                )
          );
        },
        ot = function(e) {
          var t = e.participantMutationFromState,
            a = e.participantMutationFromProps,
            n = e.handleInputChange,
            r = e.handleInputChangeDate,
            i = e.errors,
            o = e.errorMessage,
            l = e.projectTypeCodeRef,
            c =
              (e.participantProjectDateRegister,
              e.participantInDefinitiveRevenue);
          return f.a.createElement(
            f.a.Fragment,
            null,
            f.a.createElement(
              "div",
              { className: "row" },
              "loan" === l
                ? f.a.createElement(z.a, {
                    label: "Bedrag interesse",
                    id: "amountInterest",
                    className: "col-sm-6 form-group",
                    value: Object(K.a)(a.amountInterest)
                  })
                : f.a.createElement(z.a, {
                    label: "Aantal interesse",
                    id: "quantityInterest",
                    className: "col-sm-6 form-group",
                    value: a.quantityInterest
                  }),
              f.a.createElement(z.a, {
                label: "Interessedatum",
                id: "dateInterest",
                className: "col-sm-6 form-group",
                value: a.dateInterest && A()(a.dateInterest).format("L")
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              "loan" === l
                ? f.a.createElement(z.a, {
                    label: "Bedrag inschrijving",
                    id: "amountOption",
                    className: "col-sm-6 form-group",
                    value: Object(K.a)(a.amountOption)
                  })
                : f.a.createElement(z.a, {
                    label: "Aantal inschrijving",
                    id: "quantityOption",
                    className: "col-sm-6 form-group",
                    value: a.quantityOption
                  }),
              f.a.createElement(z.a, {
                label: "Inschrijvingsdatum",
                id: "dateOption",
                className: "col-sm-6 form-group",
                value: a.dateOption && A()(a.dateOption).format("L")
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              "loan" === l
                ? f.a.createElement(z.a, {
                    label: "Bedrag toegekend",
                    id: "amountGranted",
                    className: "col-sm-6 form-group",
                    value: Object(K.a)(a.amountGranted)
                  })
                : f.a.createElement(z.a, {
                    label: "Aantal toegekend",
                    id: "quantityGranted",
                    className: "col-sm-6 form-group",
                    value: a.quantityGranted
                  }),
              f.a.createElement(z.a, {
                label: "Toewijzingsdatum",
                id: "dateGranted",
                className: "col-sm-6 form-group",
                value: a.dateGranted && A()(a.dateGranted).format("L")
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              "loan" === l
                ? c
                  ? f.a.createElement(z.a, {
                      label: "Bedrag definitief",
                      id: "amountFinal",
                      className: "col-sm-6 form-group",
                      value: Object(K.a)(a.amountFinal)
                    })
                  : f.a.createElement(P.a, {
                      type: "number",
                      label: "Bedrag definitief",
                      id: "amountFinal",
                      name: "amountFinal",
                      value: t.amountFinal,
                      onChangeAction: n,
                      required: "required",
                      readOnly: c,
                      error: i.amountFinal,
                      errorMessage: o.amountFinal
                    })
                : c
                ? f.a.createElement(z.a, {
                    label: "Aantal definitief",
                    id: "quantityFinal",
                    className: "col-sm-6 form-group",
                    value: a.quantityFinal
                  })
                : f.a.createElement(P.a, {
                    type: "number",
                    label: "Aantal definitief",
                    id: "quantityFinal",
                    name: "quantityFinal",
                    value: t.quantityFinal,
                    onChangeAction: n,
                    required: "required",
                    readOnly: c,
                    error: i.quantityFinal,
                    errorMessage: o.quantityFinal
                  }),
              c
                ? f.a.createElement(z.a, {
                    label: "Ingangsdatum",
                    id: "dateEntry",
                    className: "col-sm-6 form-group",
                    value: A()(a.dateEntry).format("L")
                  })
                : f.a.createElement(k.a, {
                    label: "Ingangsdatum",
                    name: "dateEntry",
                    value: t.dateEntry,
                    onChangeAction: r,
                    required: "required",
                    readOnly: c,
                    error: i.dateEntry
                  })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(k.a, {
                label: "Contract retour",
                name: "dateContractRetour",
                value: t.dateContractRetour,
                onChangeAction: r
              }),
              f.a.createElement(k.a, {
                label: "Betaal datum",
                name: "datePayment",
                value: t.datePayment,
                onChangeAction: r
              })
            )
          );
        },
        lt = function(e) {
          var t = e.statusLogs;
          return f.a.createElement(
            "div",
            null,
            f.a.createElement(
              "div",
              { className: "row border header" },
              f.a.createElement("div", { className: "col-sm-2" }, "Datum"),
              f.a.createElement("div", { className: "col-sm-3" }, "Status van"),
              f.a.createElement("div", { className: "col-sm-3" }, "Status naar")
            ),
            t.map(function(e) {
              return f.a.createElement(
                "div",
                { className: "row border" },
                f.a.createElement(
                  "div",
                  { className: "col-sm-2" },
                  e.dateStatus && A()(e.dateStatus).format("L HH:mm:ss")
                ),
                f.a.createElement(
                  "div",
                  { className: "col-sm-3" },
                  e.fromStatus ? e.fromStatus.name : "-"
                ),
                f.a.createElement(
                  "div",
                  { className: "col-sm-3" },
                  e.toStatus ? e.toStatus.name : "-"
                )
              );
            })
          );
        },
        ct = function(e) {
          var t = e.statusLogs,
            a = Object(d.useState)(!1),
            n = q()(a, 2),
            r = n[0],
            i = n[1];
          return f.a.createElement(
            "div",
            null,
            f.a.createElement(
              Be.a,
              null,
              f.a.createElement(
                "div",
                {
                  className: "row",
                  onClick: function() {
                    return i(!r);
                  }
                },
                r
                  ? f.a.createElement("span", {
                      className: "glyphicon glyphicon-menu-down"
                    })
                  : f.a.createElement("span", {
                      className: "glyphicon glyphicon-menu-right"
                    }),
                f.a.createElement("span", { className: "h5" }, "Status log")
              )
            ),
            r ? f.a.createElement(lt, { statusLogs: t }) : null
          );
        };
      function st(e) {
        var t = e.participantMutationFromProps,
          a = e.participantMutationFromState,
          n = e.participantMutationStatusesOptions,
          r = e.projectTypeCodeRef,
          i = e.handleInputChange,
          o = e.handleInputChangeDate,
          l = e.cancelEdit,
          c = e.handleSubmit,
          s = e.errors,
          u = e.errorMessage,
          p = e.buttonText,
          m = e.participantProjectDateRegister,
          d = e.participantInDefinitiveRevenue;
        return f.a.createElement(
          O.a,
          null,
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Type",
              id: "type",
              className: "col-sm-6 form-group",
              value: t.type.name
            }),
            "final" === t.status.codeRef
              ? f.a.createElement(z.a, {
                  label: "Status",
                  id: "status",
                  className: "col-sm-6 form-group",
                  value: t.status.name
                })
              : f.a.createElement(H.a, {
                  label: "Status",
                  name: "statusId",
                  options: n,
                  value: a.statusId,
                  onChangeAction: i
                })
          ),
          "loan" === r
            ? null
            : f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement(z.a, {
                  label: "Bedrag",
                  id: "participationWorth",
                  className: "col-sm-6 form-group",
                  value: Object(K.a)(t.participationWorth)
                })
              ),
          "interest" === t.status.codeRef &&
            f.a.createElement(nt, {
              participantMutationFromProps: t,
              participantMutationFromState: a,
              handleInputChange: i,
              handleInputChangeDate: o,
              errors: s,
              errorMessage: u,
              projectTypeCodeRef: r
            }),
          "option" === t.status.codeRef &&
            f.a.createElement(rt, {
              participantMutationFromProps: t,
              participantMutationFromState: a,
              handleInputChange: i,
              handleInputChangeDate: o,
              errors: s,
              errorMessage: u,
              projectTypeCodeRef: r
            }),
          "granted" === t.status.codeRef &&
            f.a.createElement(it, {
              participantMutationFromProps: t,
              participantMutationFromState: a,
              handleInputChange: i,
              handleInputChangeDate: o,
              errors: s,
              errorMessage: u,
              projectTypeCodeRef: r
            }),
          "final" === t.status.codeRef &&
            f.a.createElement(ot, {
              participantMutationFromProps: t,
              participantMutationFromState: a,
              handleInputChange: i,
              handleInputChangeDate: o,
              errors: s,
              errorMessage: u,
              projectTypeCodeRef: r,
              participantProjectDateRegister: m,
              participantInDefinitiveRevenue: d
            }),
          f.a.createElement(ct, { statusLogs: t.statusLogs }),
          f.a.createElement(Ze, {
            createdAt: t.createdAt,
            createdBy: t.createdBy,
            updatedAt: t.updatedAt,
            updatedBy: t.updatedBy
          }),
          f.a.createElement(
            "div",
            { className: "pull-right btn-group", role: "group" },
            f.a.createElement(I.a, {
              buttonClassName: "btn-default",
              buttonText: "Annuleren",
              onClickAction: l
            }),
            f.a.createElement(I.a, {
              buttonText: p,
              onClickAction: c,
              type: "submit",
              value: "Submit"
            })
          )
        );
      }
      st.propTypes = {
        participantMutationFromProps: J.object,
        participantMutationFromState: J.object,
        participantMutationStatusesOptions: J.arrayOf(J.any),
        handleInputChange: J.any,
        projectTypeCodeRef: J.any,
        handleInputChangeDate: J.any,
        errors: J.any,
        errorMessage: J.any,
        participantMutation: J.any,
        cancelEdit: J.any,
        buttonText: J.string,
        handleSubmit: J.any,
        participantProjectDateRegister: J.any,
        participantInDefinitiveRevenue: J.bool
      };
      var ut = st;
      function pt(e) {
        var t = e.participantMutationFromProps,
          a = e.participantMutationFromState,
          n = e.participantMutationStatusesOptions,
          r = e.projectTypeCodeRef,
          i = e.handleInputChange,
          o = e.handleInputChangeDate,
          l = e.cancelEdit,
          c = e.handleSubmit,
          s = e.errors,
          u = e.errorMessage,
          p = e.buttonText;
        return f.a.createElement(
          O.a,
          null,
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Type",
              id: "type",
              className: "col-sm-6 form-group",
              value: t.type.name
            }),
            "final" === t.status.codeRef
              ? f.a.createElement(z.a, {
                  label: "Status",
                  id: "status",
                  className: "col-sm-6 form-group",
                  value: t.status.name
                })
              : f.a.createElement(H.a, {
                  label: "Status",
                  name: "statusId",
                  options: n,
                  value: a.statusId,
                  onChangeAction: i
                })
          ),
          "loan" === r
            ? null
            : f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement(z.a, {
                  label: "Bedrag",
                  id: "participationWorth",
                  className: "col-sm-6 form-group",
                  value: Object(K.a)(t.participationWorth)
                })
              ),
          "interest" === t.status.codeRef &&
            f.a.createElement(nt, {
              participantMutationFromProps: t,
              participantMutationFromState: a,
              handleInputChange: i,
              handleInputChangeDate: o,
              errors: s,
              errorMessage: u,
              projectTypeCodeRef: r
            }),
          "option" === t.status.codeRef &&
            f.a.createElement(rt, {
              participantMutationFromProps: t,
              participantMutationFromState: a,
              handleInputChange: i,
              handleInputChangeDate: o,
              errors: s,
              errorMessage: u,
              projectTypeCodeRef: r
            }),
          "granted" === t.status.codeRef &&
            f.a.createElement(it, {
              participantMutationFromProps: t,
              participantMutationFromState: a,
              handleInputChange: i,
              handleInputChangeDate: o,
              errors: s,
              errorMessage: u,
              projectTypeCodeRef: r
            }),
          "final" === t.status.codeRef &&
            f.a.createElement(ot, {
              participantMutationFromProps: t,
              participantMutationFromState: a,
              handleInputChange: i,
              handleInputChangeDate: o,
              errors: s,
              errorMessage: u,
              projectTypeCodeRef: r
            }),
          f.a.createElement(ct, { statusLogs: t.statusLogs }),
          f.a.createElement(Ze, {
            createdAt: t.createdAt,
            createdBy: t.createdBy,
            updatedAt: t.updatedAt,
            updatedBy: t.updatedBy
          }),
          f.a.createElement(
            "div",
            { className: "pull-right btn-group", role: "group" },
            f.a.createElement(I.a, {
              buttonClassName: "btn-default",
              buttonText: "Annuleren",
              onClickAction: l
            }),
            f.a.createElement(I.a, {
              buttonText: p,
              onClickAction: c,
              type: "submit",
              value: "Submit"
            })
          )
        );
      }
      pt.propTypes = {
        participantMutationFromProps: J.object,
        participantMutationFromState: J.object,
        participantMutationStatusesOptions: J.arrayOf(J.any),
        handleInputChange: J.any,
        projectTypeCodeRef: J.any,
        handleInputChangeDate: J.any,
        errors: J.any,
        errorMessage: J.any,
        participantMutation: J.any,
        cancelEdit: J.any,
        buttonText: J.string,
        handleSubmit: J.any
      };
      var mt = pt;
      function dt(e) {
        var t = e.participantMutationFromProps,
          a = e.cancelEdit,
          n = t.type,
          r = t.amount,
          i = t.entry,
          o = t.datePayment,
          l = t.paidOn,
          c = t.createdAt,
          s = t.createdBy,
          u = t.updatedAt,
          p = t.updatedBy;
        return f.a.createElement(
          O.a,
          null,
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Type",
              id: "type",
              className: "col-sm-6 form-group",
              value: n.name
            })
          ),
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Bedrag aflossing",
              id: "returns",
              className: "col-sm-6 form-group",
              value: Object(K.a)(r)
            }),
            f.a.createElement(z.a, {
              label: "Boekstuk",
              id: "entry",
              className: "col-sm-6 form-group",
              value: i
            })
          ),
          f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(z.a, {
              label: "Betaal datum",
              id: "datePayment",
              className: "col-sm-6 form-group",
              value: o ? A()(o).format("L") : ""
            }),
            f.a.createElement(z.a, {
              label: "Uitgekeerd op of via",
              id: "paidOn",
              className: "col-sm-6 form-group",
              value: l
            })
          ),
          f.a.createElement(Ze, {
            createdAt: c,
            createdBy: s,
            updatedAt: u,
            updatedBy: p
          }),
          f.a.createElement(
            "div",
            { className: "pull-right btn-group", role: "group" },
            f.a.createElement(I.a, { buttonText: "Sluiten", onClickAction: a })
          )
        );
      }
      dt.propTypes = {
        type: J.object,
        originalStatus: J.object,
        returns: J.string,
        datePayment: J.object,
        entry: J.string,
        paidOn: J.string,
        cancelEdit: J.func,
        createdAt: J.object,
        createdBy: J.object,
        updatedAt: J.object,
        updatedBy: J.object
      };
      var ft = dt;
      A.a.locale("nl");
      var ht = Object(h.b)(function(e) {
          return {
            projectTypeCodeRef:
              e.participantProjectDetails.project.projectType.codeRef,
            participantProjectDateRegister:
              e.participantProjectDetails.dateRegister,
            participantInDefinitiveRevenue:
              e.participantProjectDetails.participantInDefinitiveRevenue,
            participantMutationStatuses:
              e.systemData.participantMutationStatuses
          };
        })(function(e) {
          var t = e.participantMutationFromState,
            a = e.participantMutationFromProps,
            n = e.errors,
            r = e.errorMessage,
            i = e.handleSubmit,
            o = e.handleInputChange,
            l = e.handleInputChangeDate,
            c = e.projectTypeCodeRef,
            s = e.cancelEdit,
            u = e.participantMutationStatuses,
            p = e.participantProjectDateRegister,
            m = e.participantInDefinitiveRevenue,
            d = t.type,
            h = t.statusId,
            g = "Opslaan",
            y = [];
          if (a.status) {
            if (a.status.id !== Number(h))
              switch (a.status.codeRef) {
                case "interest":
                  g = "Status doorzetten naar inschrijving";
                  break;
                case "option":
                  g = "Status doorzetten naar toegekend";
                  break;
                case "granted":
                  g = "Status doorzetten naar definitief";
                  break;
                default:
                  g = "Opslaan";
              }
            switch (a.status.codeRef) {
              case "interest":
                y = u.filter(function(e) {
                  return "interest" === e.codeRef || "option" === e.codeRef;
                });
                break;
              case "option":
                y = u.filter(function(e) {
                  return "option" === e.codeRef || "granted" === e.codeRef;
                });
                break;
              case "granted":
                y = u.filter(function(e) {
                  return "granted" === e.codeRef || "final" === e.codeRef;
                });
            }
          }
          return f.a.createElement(
            "div",
            null,
            f.a.createElement(
              "form",
              { className: "form-horizontal", onSubmit: i },
              f.a.createElement(
                N.a,
                { className: "panel-grey" },
                "first_deposit" === d.codeRef || "deposit" === d.codeRef
                  ? f.a.createElement(ut, {
                      participantMutationFromState: t,
                      participantMutationFromProps: a,
                      participantMutationStatusesOptions: y,
                      errors: n,
                      errorMessage: r,
                      projectTypeCodeRef: c,
                      handleInputChange: o,
                      handleInputChangeDate: l,
                      cancelEdit: s,
                      buttonText: g,
                      handleSubmit: i,
                      participantProjectDateRegister: p,
                      participantInDefinitiveRevenue: m
                    })
                  : null,
                "withDrawal" === d.codeRef || "sell" === d.codeRef
                  ? f.a.createElement(mt, {
                      participantMutationFromState: t,
                      participantMutationFromProps: a,
                      participantMutationStatusesOptions: y,
                      errors: n,
                      errorMessage: r,
                      projectTypeCodeRef: c,
                      handleInputChange: o,
                      handleInputChangeDate: l,
                      cancelEdit: s,
                      buttonText: g,
                      handleSubmit: i
                    })
                  : null,
                "result" === d.codeRef
                  ? f.a.createElement(at, {
                      participantMutationFromProps: a,
                      cancelEdit: s
                    })
                  : null,
                "redemption" === d.codeRef
                  ? f.a.createElement(ft, {
                      participantMutationFromProps: a,
                      cancelEdit: s
                    })
                  : null,
                "energyTaxRefund" === d.codeRef
                  ? f.a.createElement(et, {
                      participantMutationFromProps: a,
                      cancelEdit: s
                    })
                  : null
              )
            )
          );
        }),
        gt = function(e) {
          return f.a.createElement(
            C.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: e.handleSubmitDelete,
              title: "Verwijderen"
            },
            f.a.createElement("p", null, "Verwijder mutatie?")
          );
        };
      function yt(e, t) {
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
      function bt(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? yt(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : yt(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function vt(e) {
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
      var Et = (function(e) {
          c()(a, e);
          var t = vt(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              v()(y()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              v()(y()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              v()(y()(n), "openEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              v()(y()(n), "closeEdit", function() {
                n.setState({ showEdit: !1, successUpdateMessage: "" }),
                  n.props.fetchParticipantProjectDetails(n.props.id);
              }),
              v()(y()(n), "cancelEdit", function() {
                n.setState(
                  bt(
                    bt({}, n.state),
                    {},
                    {
                      participantMutation: bt(
                        bt({}, n.props.participantMutation),
                        {},
                        {
                          dateInterest: n.props.participantMutation.dateInterest
                            ? n.props.participantMutation.dateInterest
                            : "",
                          dateOption: n.props.participantMutation.dateOption
                            ? n.props.participantMutation.dateOption
                            : "",
                          dateGranted: n.props.participantMutation.dateGranted
                            ? n.props.participantMutation.dateGranted
                            : "",
                          dateContractRetour: n.props.participantMutation
                            .dateContractRetour
                            ? n.props.participantMutation.dateContractRetour
                            : "",
                          datePayment: n.props.participantMutation.datePayment
                            ? n.props.participantMutation.datePayment
                            : "",
                          dateEntry: n.props.participantMutation.dateEntry
                            ? n.props.participantMutation.dateEntry
                            : n.props.projectDateEntry
                            ? n.props.projectDateEntry
                            : A()().format("YYYY-MM-DD")
                        }
                      )
                    }
                  )
                ),
                  n.closeEdit();
              }),
              v()(y()(n), "toggleDelete", function() {
                n.setState({
                  showDelete: !n.state.showDelete,
                  successDeleteMessage: ""
                }),
                  n.props.fetchParticipantProjectDetails(n.props.id);
              }),
              v()(y()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState({
                  participantMutation: bt(
                    bt({}, n.state.participantMutation),
                    {},
                    v()({}, r, a)
                  )
                });
              }),
              v()(y()(n), "handleInputChangeDate", function(e, t) {
                n.setState({
                  participantMutation: bt(
                    bt({}, n.state.participantMutation),
                    {},
                    v()({}, t, e)
                  )
                });
              }),
              v()(y()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.participantMutation,
                  a = (function(e, t, a, n, r) {
                    if (e.statusId) {
                      var i = e.status.codeRef,
                        o = e.status.id,
                        l = e.type.codeRef;
                      "interest" === i &&
                        (o === Number(e.statusId)
                          ? "loan" === r
                            ? "withDrawal" === l || "sell" === l
                              ? e.amountInterest &&
                                e.amountInterest > 0 &&
                                ((t.amountInterest = !0),
                                (a.amountInterest =
                                  "Voer een negatief bedrag of 0 in."),
                                (n = !0))
                              : e.amountInterest &&
                                e.amountInterest < 0 &&
                                ((t.amountInterest = !0),
                                (a.amountInterest =
                                  "Voer een positief bedrag of 0 in."),
                                (n = !0))
                            : "withDrawal" === l || "sell" === l
                            ? e.quantityInterest &&
                              e.quantityInterest > 0 &&
                              ((t.quantityInterest = !0),
                              (a.quantityInterest =
                                "Voer een negatief getal of 0 in."),
                              (n = !0))
                            : e.quantityInterest &&
                              e.quantityInterest < 0 &&
                              ((t.quantityInterest = !0),
                              (a.quantityInterest =
                                "Voer een positief getal of 0 in."),
                              (n = !0))
                          : ("loan" === r
                              ? "withDrawal" === l || "sell" === l
                                ? (!e.amountOption || e.amountOption >= 0) &&
                                  ((t.amountOption = !0),
                                  (a.amountOption =
                                    "Voer een negatief bedrag in."),
                                  (n = !0))
                                : (!e.amountOption || e.amountOption <= 0) &&
                                  ((t.amountOption = !0),
                                  (a.amountOption =
                                    "Voer een positief bedrag in."),
                                  (n = !0))
                              : "withDrawal" === l || "sell" === l
                              ? (!e.quantityOption || e.quantityOption >= 0) &&
                                ((t.quantityOption = !0),
                                (a.quantityOption =
                                  "Voer een negatief aantal in."),
                                (n = !0))
                              : (!e.quantityOption || e.quantityOption <= 0) &&
                                ((t.quantityOption = !0),
                                (a.quantityOption =
                                  "Voer een positief aantal in."),
                                (n = !0)),
                            e.dateOption || ((t.dateOption = !0), (n = !0)))),
                        "option" === i &&
                          (o !== Number(e.statusId)
                            ? ("loan" === r
                                ? "withDrawal" === l || "sell" === l
                                  ? (!e.amountGranted ||
                                      e.amountGranted >= 0) &&
                                    ((t.amountGranted = !0),
                                    (a.amountGranted =
                                      "Voer een negatief bedrag in."),
                                    (n = !0))
                                  : (!e.amountGranted ||
                                      e.amountGranted <= 0) &&
                                    ((t.amountGranted = !0),
                                    (a.amountGranted =
                                      "Voer een positief bedrag in."),
                                    (n = !0))
                                : "withDrawal" === l || "sell" === l
                                ? (!e.quantityGranted ||
                                    e.quantityGranted >= 0) &&
                                  ((t.quantityGranted = !0),
                                  (a.quantityGranted =
                                    "Voer een negatief aantal in."),
                                  (n = !0))
                                : (!e.quantityGranted ||
                                    e.quantityGranted <= 0) &&
                                  ((t.quantityGranted = !0),
                                  (a.quantityGranted =
                                    "Voer een positief aantal in."),
                                  (n = !0)),
                              e.dateGranted || ((t.dateGranted = !0), (n = !0)))
                            : ("loan" === r
                                ? "withDrawal" === l || "sell" === l
                                  ? (!e.amountOption || e.amountOption >= 0) &&
                                    ((t.amountOption = !0),
                                    (a.amountOption =
                                      "Voer een negatief bedrag in."),
                                    (n = !0))
                                  : (!e.amountOption || e.amountOption <= 0) &&
                                    ((t.amountOption = !0),
                                    (a.amountOption =
                                      "Voer een positief bedrag in."),
                                    (n = !0))
                                : "withDrawal" === l || "sell" === l
                                ? (!e.quantityOption ||
                                    e.quantityOption >= 0) &&
                                  ((t.quantityOption = !0),
                                  (a.quantityOption =
                                    "Voer een negatief aantal in."),
                                  (n = !0))
                                : (!e.quantityOption ||
                                    e.quantityOption <= 0) &&
                                  ((t.quantityOption = !0),
                                  (a.quantityOption =
                                    "Voer een positief aantal in."),
                                  (n = !0)),
                              e.dateOption || ((t.dateOption = !0), (n = !0)))),
                        "granted" === i &&
                          (o !== Number(e.statusId)
                            ? ("loan" === r
                                ? "withDrawal" === l || "sell" === l
                                  ? (!e.amountFinal || e.amountFinal >= 0) &&
                                    ((t.amountFinal = !0),
                                    (a.amountFinal =
                                      "Voer een negatief bedrag in."),
                                    (n = !0))
                                  : (!e.amountFinal || e.amountFinal <= 0) &&
                                    ((t.amountFinal = !0),
                                    (a.amountFinal =
                                      "Voer een positief bedrag in."),
                                    (n = !0))
                                : "withDrawal" === l || "sell" === l
                                ? (!e.quantityFinal || e.quantityFinal >= 0) &&
                                  ((t.quantityFinal = !0),
                                  (a.quantityFinal =
                                    "Voer een negatief aantal in."),
                                  (n = !0))
                                : (!e.quantityFinal || e.quantityFinal <= 0) &&
                                  ((t.quantityFinal = !0),
                                  (a.quantityFinal =
                                    "Voer een positief aantal in."),
                                  (n = !0)),
                              e.dateEntry || ((t.dateEntry = !0), (n = !0)))
                            : ("loan" === r
                                ? "withDrawal" === l || "sell" === l
                                  ? (!e.amountGranted ||
                                      e.amountGranted >= 0) &&
                                    ((t.amountGranted = !0),
                                    (a.amountGranted =
                                      "Voer een negatief bedrag in."),
                                    (n = !0))
                                  : (!e.amountGranted ||
                                      e.amountGranted <= 0) &&
                                    ((t.amountGranted = !0),
                                    (a.amountGranted =
                                      "Voer een positief bedrag in."),
                                    (n = !0))
                                : "withDrawal" === l || "sell" === l
                                ? (!e.quantityGranted ||
                                    e.quantityGranted >= 0) &&
                                  ((t.quantityGranted = !0),
                                  (a.quantityGranted =
                                    "Voer een negatief aantal in."),
                                  (n = !0))
                                : (!e.quantityGranted ||
                                    e.quantityGranted <= 0) &&
                                  ((t.quantityGranted = !0),
                                  (a.quantityGranted =
                                    "Voer een positief aantal in."),
                                  (n = !0)),
                              e.dateGranted ||
                                ((t.dateGranted = !0), (n = !0)))),
                        "final" === i &&
                          ("loan" === r
                            ? "withDrawal" === l || "sell" === l
                              ? (!e.amountFinal || e.amountFinal >= 0) &&
                                ((t.amountFinal = !0),
                                (a.amountFinal =
                                  "Voer een negatief bedrag in."),
                                (n = !0))
                              : (!e.amountFinal || e.amountFinal <= 0) &&
                                ((t.amountFinal = !0),
                                (a.amountFinal =
                                  "Voer een positief bedrag in."),
                                (n = !0))
                            : "withDrawal" === l || "sell" === l
                            ? (!e.quantityFinal || e.quantityFinal >= 0) &&
                              ((t.quantityFinal = !0),
                              (a.quantityFinal =
                                "Voer een negatief aantal in."),
                              (n = !0))
                            : (!e.quantityFinal || e.quantityFinal <= 0) &&
                              ((t.quantityFinal = !0),
                              (a.quantityFinal =
                                "Voer een positief aantal in."),
                              (n = !0)),
                          e.dateEntry || ((t.dateEntry = !0), (n = !0)));
                    } else (t.statusId = !0), (n = !0);
                    return { hasErrors: n, errors: t, errorMessage: a };
                  })(t, {}, {}, !1, n.props.projectTypeCodeRef);
                if (
                  (n.setState(
                    bt(
                      bt({}, n.state),
                      {},
                      { errors: a.errors, errorMessage: a.errorMessage }
                    )
                  ),
                  !a.hasErrors)
                ) {
                  var r = (function(e, t) {
                    var a = e.status.codeRef,
                      n = e.status.id,
                      r = { id: e.id, statusId: e.statusId, typeId: e.typeId };
                    return (
                      "interest" === a &&
                        ("loan" === t
                          ? ((r.amountInterest = e.amountInterest),
                            (r.amount = e.amountInterest))
                          : ((r.quantityInterest = e.quantityInterest),
                            (r.quantity = e.quantityInterest)),
                        (r.dateInterest = e.dateInterest),
                        (r.statusId = e.statusId),
                        n !== Number(e.statusId) &&
                          ("loan" === t
                            ? ((r.amountOption = e.amountOption),
                              (r.amount = e.amountOption))
                            : ((r.quantityOption = e.quantityOption),
                              (r.quantity = e.quantityOption)),
                          (r.dateOption = e.dateOption))),
                      "option" === a &&
                        ("loan" === t
                          ? ((r.amountOption = e.amountOption),
                            (r.amount = e.amountOption))
                          : ((r.quantityOption = e.quantityOption),
                            (r.quantity = e.quantityOption)),
                        (r.dateOption = e.dateOption),
                        (r.statusId = e.statusId),
                        n !== Number(e.statusId) &&
                          ("loan" === t
                            ? ((r.amountGranted = e.amountGranted),
                              (r.amount = e.amountGranted))
                            : ((r.quantityGranted = e.quantityGranted),
                              (r.quantity = e.quantityGranted)),
                          (r.dateGranted = e.dateGranted))),
                      "granted" === a &&
                        ("loan" === t
                          ? ((r.amountGranted = e.amountGranted),
                            (r.amount = e.amountGranted))
                          : ((r.quantityGranted = e.quantityGranted),
                            (r.quantity = e.quantityGranted)),
                        (r.dateGranted = e.dateGranted),
                        (r.statusId = e.statusId),
                        n !== Number(e.statusId) &&
                          ("loan" === t
                            ? ((r.amountFinal = e.amountFinal),
                              (r.amount = e.amountFinal))
                            : ((r.quantityFinal = e.quantityFinal),
                              (r.quantity = e.quantityFinal)),
                          (r.dateContractRetour = e.dateContractRetour),
                          (r.datePayment = e.datePayment),
                          (r.dateEntry = e.dateEntry))),
                      "final" === a &&
                        ("loan" === t
                          ? ((r.amountFinal = e.amountFinal),
                            (r.amount = e.amountFinal))
                          : ((r.quantityFinal = e.quantityFinal),
                            (r.quantity = e.quantityFinal)),
                        (r.dateContractRetour = e.dateContractRetour),
                        (r.datePayment = e.datePayment),
                        (r.dateEntry = e.dateEntry),
                        (r.statusId = e.statusId)),
                      r
                    );
                  })(t, n.props.projectTypeCodeRef);
                  ze.a.updateParticipantMutation(r).then(function(e) {
                    e.data
                      ? n.setState(
                          bt(
                            bt({}, n.state),
                            {},
                            { successUpdateMessage: e.data }
                          )
                        )
                      : n.closeEdit();
                  });
                }
              }),
              v()(y()(n), "handleSubmitDelete", function() {
                var e = n.state.participantMutation;
                ze.a.deleteParticipantMutation(e.id).then(function(e) {
                  e.data
                    ? n.setState(
                        bt(
                          bt({}, n.state),
                          {},
                          { successDeleteMessage: e.data }
                        )
                      )
                    : n.toggleDelete();
                });
              }),
              (n.state = {
                showActionButtons: !1,
                successUpdateMessage: "",
                successDeleteMessage: "",
                highlightLine: "",
                showEdit: !1,
                showDelete: !1,
                participantMutation: bt(
                  bt({}, e.participantMutation),
                  {},
                  {
                    dateInterest: e.participantMutation.dateInterest
                      ? e.participantMutation.dateInterest
                      : A()().format("YYYY-MM-DD"),
                    dateOption: e.participantMutation.dateOption
                      ? e.participantMutation.dateOption
                      : A()().format("YYYY-MM-DD"),
                    dateGranted: e.participantMutation.dateGranted
                      ? e.participantMutation.dateGranted
                      : A()().format("YYYY-MM-DD"),
                    dateContractRetour: e.participantMutation.dateContractRetour
                      ? e.participantMutation.dateContractRetour
                      : "",
                    datePayment: e.participantMutation.datePayment
                      ? e.participantMutation.datePayment
                      : "",
                    dateEntry: e.participantMutation.dateEntry
                      ? e.participantMutation.dateEntry
                      : e.projectDateEntry
                      ? e.projectDateEntry
                      : A()().format("YYYY-MM-DD"),
                    quantityInterest: e.participantMutation.quantityInterest
                      ? e.participantMutation.quantityInterest
                      : e.participantMutation.quantity,
                    quantityOption: e.participantMutation.quantityOption
                      ? e.participantMutation.quantityOption
                      : e.participantMutation.quantity,
                    quantityGranted: e.participantMutation.quantityGranted
                      ? e.participantMutation.quantityGranted
                      : e.participantMutation.quantity,
                    quantityFinal: e.participantMutation.quantityFinal
                      ? e.participantMutation.quantityFinal
                      : e.participantMutation.quantity,
                    amountInterest: e.participantMutation.amountInterest
                      ? e.participantMutation.amountInterest
                      : e.participantMutation.amount,
                    amountOption: e.participantMutation.amountOption
                      ? e.participantMutation.amountOption
                      : e.participantMutation.amount,
                    amountGranted: e.participantMutation.amountGranted
                      ? e.participantMutation.amountGranted
                      : e.participantMutation.amount,
                    amountFinal: e.participantMutation.amountFinal
                      ? e.participantMutation.amountFinal
                      : e.participantMutation.amount
                  }
                ),
                errors: {},
                errorMessage: {}
              }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "componentDidUpdate",
                value: function(e) {
                  Object(L.isEqual)(
                    e.participantMutation,
                    this.props.participantMutation
                  ) ||
                    this.setState(
                      bt(
                        bt({}, this.state),
                        {},
                        {
                          participantMutation: bt(
                            bt({}, this.props.participantMutation),
                            {},
                            {
                              dateInterest: this.props.participantMutation
                                .dateInterest
                                ? this.props.participantMutation.dateInterest
                                : A()().format("YYYY-MM-DD"),
                              dateOption: this.props.participantMutation
                                .dateOption
                                ? this.props.participantMutation.dateOption
                                : A()().format("YYYY-MM-DD"),
                              dateGranted: this.props.participantMutation
                                .dateGranted
                                ? this.props.participantMutation.dateGranted
                                : A()().format("YYYY-MM-DD"),
                              dateContractRetour: this.props.participantMutation
                                .dateContractRetour
                                ? this.props.participantMutation
                                    .dateContractRetour
                                : "",
                              datePayment: this.props.participantMutation
                                .datePayment
                                ? this.props.participantMutation.datePayment
                                : "",
                              dateEntry: this.props.participantMutation
                                .dateEntry
                                ? this.props.participantMutation.dateEntry
                                : this.props.projectDateEntry
                                ? this.props.projectDateEntry
                                : A()().format("YYYY-MM-DD"),
                              quantityInterest: this.props.participantMutation
                                .quantityInterest
                                ? this.props.participantMutation
                                    .quantityInterest
                                : this.props.participantMutation.quantity,
                              quantityOption: this.props.participantMutation
                                .quantityOption
                                ? this.props.participantMutation.quantityOption
                                : this.props.participantMutation.quantity,
                              quantityGranted: this.props.participantMutation
                                .quantityGranted
                                ? this.props.participantMutation.quantityGranted
                                : this.props.participantMutation.quantity,
                              quantityFinal: this.props.participantMutation
                                .quantityFinal
                                ? this.props.participantMutation.quantityFinal
                                : this.props.participantMutation.quantity,
                              amountInterest: this.props.participantMutation
                                .amountInterest
                                ? this.props.participantMutation.amountInterest
                                : this.props.participantMutation.amount,
                              amountOption: this.props.participantMutation
                                .amountOption
                                ? this.props.participantMutation.amountOption
                                : this.props.participantMutation.amount,
                              amountGranted: this.props.participantMutation
                                .amountGranted
                                ? this.props.participantMutation.amountGranted
                                : this.props.participantMutation.amount,
                              amountFinal: this.props.participantMutation
                                .amountFinal
                                ? this.props.participantMutation.amountFinal
                                : this.props.participantMutation.amount
                            }
                          )
                        }
                      )
                    );
                }
              },
              {
                key: "render",
                value: function() {
                  return f.a.createElement(
                    "div",
                    null,
                    f.a.createElement(Je, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      openEdit: this.openEdit,
                      toggleDelete: this.toggleDelete,
                      participantMutation: this.props.participantMutation
                    }),
                    this.state.showEdit &&
                      this.props.permissions.manageFinancial &&
                      f.a.createElement(ht, {
                        participantMutationFromState: this.state
                          .participantMutation,
                        participantMutationFromProps: this.props
                          .participantMutation,
                        handleInputChange: this.handleInputChange,
                        handleInputChangeDate: this.handleInputChangeDate,
                        handleSubmit: this.handleSubmit,
                        cancelEdit: this.cancelEdit,
                        errors: this.state.errors,
                        errorMessage: this.state.errorMessage
                      }),
                    this.state.showDelete &&
                      this.props.permissions.manageFinancial &&
                      f.a.createElement(
                        gt,
                        Ee()(
                          {
                            closeDeleteItemModal: this.toggleDelete,
                            handleSubmitDelete: this.handleSubmitDelete
                          },
                          this.props.participantMutation
                        )
                      ),
                    this.state.successUpdateMessage &&
                      f.a.createElement(
                        C.a,
                        {
                          closeModal: this.closeEdit,
                          buttonCancelText: "Ok",
                          showConfirmAction: !1,
                          title: "Succes"
                        },
                        this.state.successUpdateMessage.map(function(e, t) {
                          return f.a.createElement("p", { key: t }, e);
                        })
                      ),
                    this.state.successDeleteMessage &&
                      f.a.createElement(
                        C.a,
                        {
                          closeModal: this.toggleDelete,
                          buttonCancelText: "Ok",
                          showConfirmAction: !1,
                          title: "Succes"
                        },
                        this.state.successDeleteMessage.map(function(e, t) {
                          return f.a.createElement("p", { key: t }, e);
                        })
                      )
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        Nt = Object(h.b)(
          function(e) {
            return {
              permissions: e.meDetails.permissions,
              id: e.participantProjectDetails.id,
              participantMutationStatuses:
                e.systemData.participantMutationStatuses,
              projectTypeCodeRef:
                e.participantProjectDetails.project.projectType.codeRef,
              projectDateEntry: e.participantProjectDetails.project.dateEntry
            };
          },
          function(e) {
            return {
              fetchParticipantProjectDetails: function(t) {
                e(j(t));
              }
            };
          }
        )(Et);
      function Ot() {
        var e = Ve()([
          "\n    width: ",
          ";\n    position: relative;\n    min-height: 1px;\n    padding-right: 6px;\n    padding-left: 6px;\n    float: left;\n"
        ]);
        return (
          (Ot = function() {
            return e;
          }),
          e
        );
      }
      function wt() {
        var e = Ve()([
          "\n    display: flex;\n    flex-flow: row nowrap;\n    justify-content: space-around;\n"
        ]);
        return (
          (wt = function() {
            return e;
          }),
          e
        );
      }
      var Ct = _e.a.div(wt()),
        jt = _e.a.div(Ot(), function(e) {
          return e.columnWidth ? e.columnWidth : "100px";
        }),
        Dt = Object(h.b)(function(e) {
          return {
            participantMutations:
              e.participantProjectDetails.participantMutations,
            projectTypeCodeRef:
              e.participantProjectDetails.project.projectType.codeRef
          };
        })(function(e) {
          var t = e.projectTypeCodeRef,
            a = e.participantMutations;
          return f.a.createElement(
            "div",
            null,
            f.a.createElement(
              Ct,
              { className: "row border header" },
              f.a.createElement(jt, { columnWidth: "100px" }, "Type"),
              f.a.createElement(jt, { columnWidth: "80px" }, "Status"),
              f.a.createElement(jt, { columnWidth: "100px" }, "Betaal datum"),
              f.a.createElement(jt, { columnWidth: "100px" }, "Ingangs- datum"),
              f.a.createElement(jt, { columnWidth: "120px" }, "Omschrijving"),
              "loan" === t && f.a.createElement(jt, null, "Lening rekening"),
              ("capital" === t || "postalcode_link_capital" === t) &&
                f.a.createElement(jt, null, "Kapitaal rekening"),
              "obligation" === t &&
                f.a.createElement(jt, null, "Aantal obligaties"),
              ("capital" === t || "postalcode_link_capital" === t) &&
                f.a.createElement(jt, null, "Aantal participaties"),
              f.a.createElement(jt, null, "Opbrengst"),
              "postalcode_link_capital" === t &&
                f.a.createElement(jt, null, "kWh"),
              "postalcode_link_capital" === t &&
                f.a.createElement(jt, null, "Indicatie teruggave EB"),
              f.a.createElement(jt, { columnWidth: "7%" }, " ")
            ),
            a.length > 0
              ? a.map(function(e) {
                  return f.a.createElement(Nt, {
                    key: e.id,
                    participantMutation: e
                  });
                })
              : f.a.createElement("div", null, "Geen mutaties bekend.")
          );
        }),
        It = function(e) {
          var t = e.statusCodeRef,
            a = e.quantityInterest,
            n = e.amountInterest,
            r = e.dateInterest,
            i = e.quantityOption,
            o = e.amountOption,
            l = e.dateOption,
            c = e.quantityGranted,
            s = e.amountGranted,
            u = e.dateGranted,
            p = e.quantityFinal,
            m = e.amountFinal,
            d = e.dateContractRetour,
            h = e.datePayment,
            g = e.dateEntry,
            y = e.errors,
            b = e.errorMessage,
            v = e.handleInputChange,
            E = e.handleInputChangeDate,
            N = e.projectTypeCodeRef;
          return f.a.createElement(
            f.a.Fragment,
            null,
            "interest" === t
              ? f.a.createElement(
                  "div",
                  { className: "row" },
                  "loan" === N
                    ? f.a.createElement(P.a, {
                        type: "number",
                        label: "Bedrag interesse",
                        name: "amountInterest",
                        id: "amountInterest",
                        value: n,
                        onChangeAction: v,
                        error: y.amountInterest,
                        errorMessage: b.amountInterest
                      })
                    : f.a.createElement(P.a, {
                        label: "Aantal interesse",
                        name: "quantityInterest",
                        id: "quantityInterest",
                        value: a,
                        onChangeAction: v,
                        error: y.quantityInterest,
                        errorMessage: b.quantityInterest
                      }),
                  f.a.createElement(k.a, {
                    label: "Interesse datum",
                    name: "dateInterest",
                    id: "dateInterest",
                    value: r,
                    onChangeAction: E
                  })
                )
              : null,
            "option" === t
              ? f.a.createElement(
                  "div",
                  { className: "row" },
                  "loan" === N
                    ? f.a.createElement(P.a, {
                        type: "number",
                        label: "Bedrag inschrijving",
                        name: "amountOption",
                        id: "amountOption",
                        value: o,
                        onChangeAction: v,
                        required: "required",
                        error: y.amountOption,
                        errorMessage: b.amountOption
                      })
                    : f.a.createElement(P.a, {
                        label: "Aantal inschrijving",
                        name: "quantityOption",
                        id: "quantityOption",
                        value: i,
                        onChangeAction: v,
                        required: "required",
                        error: y.quantityOption,
                        errorMessage: b.quantityOption
                      }),
                  f.a.createElement(k.a, {
                    label: "Inschrijvingsdatum",
                    name: "dateOption",
                    id: "dateOption",
                    value: l,
                    onChangeAction: E,
                    required: "required",
                    error: y.dateOption
                  })
                )
              : null,
            "granted" === t
              ? f.a.createElement(
                  "div",
                  { className: "row" },
                  "loan" === N
                    ? f.a.createElement(P.a, {
                        type: "number",
                        label: "Bedrag toegekend",
                        name: "amountGranted",
                        id: "amountGranted",
                        value: s,
                        onChangeAction: v,
                        required: "required",
                        error: y.amountGranted,
                        errorMessage: b.amountGranted
                      })
                    : f.a.createElement(P.a, {
                        label: "Aantal toegekend",
                        name: "quantityGranted",
                        id: "quantityGranted",
                        value: c,
                        onChangeAction: v,
                        required: "required",
                        error: y.quantityGranted,
                        errorMessage: b.quantityGranted
                      }),
                  f.a.createElement(k.a, {
                    label: "Toewijzingsdatum",
                    name: "dateGranted",
                    id: "dateGranted",
                    value: u,
                    onChangeAction: E,
                    required: "required",
                    error: y.dateGranted
                  })
                )
              : null,
            "final" === t
              ? f.a.createElement(
                  f.a.Fragment,
                  null,
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    "loan" === N
                      ? f.a.createElement(P.a, {
                          type: "number",
                          label: "Bedrag definitief",
                          name: "amountFinal",
                          id: "amountFinal",
                          value: m,
                          onChangeAction: v,
                          required: "required",
                          error: y.amountFinal,
                          errorMessage: b.amountFinal
                        })
                      : f.a.createElement(P.a, {
                          type: "number",
                          label: "Aantal definitief",
                          name: "quantityFinal",
                          id: "quantityFinal",
                          value: p,
                          onChangeAction: v,
                          required: "required",
                          error: y.quantityFinal,
                          errorMessage: b.quantityFinal
                        }),
                    f.a.createElement(k.a, {
                      label: "Toewijzingsdatum",
                      name: "dateGranted",
                      id: "dateGranted",
                      value: u,
                      onChangeAction: E
                    })
                  ),
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    f.a.createElement(k.a, {
                      label: "Contract retour",
                      name: "dateContractRetour",
                      id: "dateContractRetour",
                      value: d,
                      onChangeAction: E
                    }),
                    f.a.createElement(k.a, {
                      label: "Betaaldatum",
                      name: "datePayment",
                      id: "datePayment",
                      value: h,
                      onChangeAction: E
                    })
                  ),
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    f.a.createElement(k.a, {
                      label: "Ingangsdatum",
                      name: "dateEntry",
                      id: "dateEntry",
                      value: g,
                      onChangeAction: E,
                      required: "required",
                      error: y.dateEntry
                    })
                  )
                )
              : null
          );
        },
        Mt = function(e) {
          var t = e.statusCodeRef,
            a = e.quantityInterest,
            n = e.amountInterest,
            r = e.dateInterest,
            i = e.quantityOption,
            o = e.amountOption,
            l = e.dateOption,
            c = e.quantityGranted,
            s = e.amountGranted,
            u = e.dateGranted,
            p = e.quantityFinal,
            m = e.amountFinal,
            d = (e.dateContractRetour, e.datePayment),
            h = e.dateEntry,
            g = e.errors,
            y = e.errorMessage,
            b = e.handleInputChange,
            v = e.handleInputChangeDate,
            E = e.projectTypeCodeRef;
          return f.a.createElement(
            f.a.Fragment,
            null,
            "interest" === t
              ? f.a.createElement(
                  "div",
                  { className: "row" },
                  "loan" === E
                    ? f.a.createElement(P.a, {
                        type: "number",
                        label: "Bedrag interesse",
                        name: "amountInterest",
                        id: "amountInterest",
                        value: n,
                        onChangeAction: b,
                        error: g.amountInterest,
                        errorMessage: y.amountInterest
                      })
                    : f.a.createElement(P.a, {
                        label: "Aantal interesse",
                        name: "quantityInterest",
                        id: "quantityInterest",
                        value: a,
                        onChangeAction: b,
                        error: g.quantityInterest,
                        errorMessage: y.quantityInterest
                      }),
                  f.a.createElement(k.a, {
                    label: "Interesse datum",
                    name: "dateInterest",
                    id: "dateInterest",
                    value: r,
                    onChangeAction: v
                  })
                )
              : null,
            "option" === t
              ? f.a.createElement(
                  "div",
                  { className: "row" },
                  "loan" === E
                    ? f.a.createElement(P.a, {
                        type: "number",
                        label: "Bedrag inschrijving",
                        name: "amountOption",
                        id: "amountOption",
                        value: o,
                        onChangeAction: b,
                        required: "required",
                        error: g.amountOption,
                        errorMessage: y.amountOption
                      })
                    : f.a.createElement(P.a, {
                        label: "Aantal inschrijving",
                        name: "quantityOption",
                        id: "quantityOption",
                        value: i,
                        onChangeAction: b,
                        required: "required",
                        error: g.quantityOption,
                        errorMessage: y.quantityOption
                      }),
                  f.a.createElement(k.a, {
                    label: "Inschrijvingsdatum",
                    name: "dateOption",
                    id: "dateOption",
                    value: l,
                    onChangeAction: v,
                    required: "required",
                    error: g.dateOption
                  })
                )
              : null,
            "granted" === t
              ? f.a.createElement(
                  "div",
                  { className: "row" },
                  "loan" === E
                    ? f.a.createElement(P.a, {
                        type: "number",
                        label: "Bedrag toegekend",
                        name: "amountGranted",
                        id: "amountGranted",
                        value: s,
                        onChangeAction: b,
                        required: "required",
                        error: g.amountGranted,
                        errorMessage: y.amountGranted
                      })
                    : f.a.createElement(P.a, {
                        label: "Aantal toegekend",
                        name: "quantityGranted",
                        id: "quantityGranted",
                        value: c,
                        onChangeAction: b,
                        required: "required",
                        error: g.quantityGranted,
                        errorMessage: y.quantityGranted
                      }),
                  f.a.createElement(k.a, {
                    label: "Toewijzingsdatum",
                    name: "dateGranted",
                    id: "dateGranted",
                    value: u,
                    onChangeAction: v,
                    required: "required",
                    error: g.dateGranted
                  })
                )
              : null,
            "final" === t
              ? f.a.createElement(
                  f.a.Fragment,
                  null,
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    "loan" === E
                      ? f.a.createElement(P.a, {
                          type: "number",
                          label: "Bedrag definitief",
                          name: "amountFinal",
                          id: "amountFinal",
                          value: m,
                          onChangeAction: b,
                          required: "required",
                          error: g.amountFinal,
                          errorMessage: y.amountFinal
                        })
                      : f.a.createElement(P.a, {
                          type: "number",
                          label: "Aantal definitief",
                          name: "quantityFinal",
                          id: "quantityFinal",
                          value: p,
                          onChangeAction: b,
                          required: "required",
                          error: g.quantityFinal,
                          errorMessage: y.quantityFinal
                        }),
                    f.a.createElement(k.a, {
                      label: "Toewijzingsdatum",
                      name: "dateGranted",
                      id: "dateGranted",
                      value: u,
                      onChangeAction: v
                    })
                  ),
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    f.a.createElement(k.a, {
                      label: "Ingangsdatum",
                      name: "dateEntry",
                      id: "dateEntry",
                      value: h,
                      onChangeAction: v,
                      required: "required",
                      error: g.dateEntry
                    }),
                    f.a.createElement(k.a, {
                      label: "Betaaldatum",
                      name: "datePayment",
                      id: "datePayment",
                      value: d,
                      onChangeAction: v
                    })
                  )
                )
              : null
          );
        };
      function qt(e, t) {
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
      function kt(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? qt(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : qt(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Pt(e) {
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
      var Rt = (function(e) {
          c()(a, e);
          var t = Pt(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              v()(y()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  kt(
                    kt({}, n.state),
                    {},
                    {
                      participationMutation: kt(
                        kt({}, n.state.participationMutation),
                        {},
                        v()({}, r, a)
                      )
                    }
                  ),
                  function() {
                    return n.linkedValueAdjustment(r);
                  }
                );
              }),
              v()(y()(n), "linkedValueAdjustment", function(e) {
                if ("statusId" === e) {
                  var t =
                    Number(n.state.participationMutation.statusId) ===
                    n.props.participantMutationStatuses.find(function(e) {
                      return "final" === e.codeRef;
                    }).id
                      ? null
                      : A()().format("YYYY-MM-DD");
                  n.setState(
                    kt(
                      kt({}, n.state),
                      {},
                      {
                        participation: kt(
                          kt({}, n.state.participation),
                          {},
                          { dateGranted: t }
                        )
                      }
                    )
                  );
                }
              }),
              v()(y()(n), "handleInputChangeDate", function(e, t) {
                n.setState(
                  kt(
                    kt({}, n.state),
                    {},
                    {
                      participationMutation: kt(
                        kt({}, n.state.participationMutation),
                        {},
                        v()({}, t, e)
                      )
                    }
                  )
                );
              }),
              v()(y()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.participationMutation,
                  a = n.props.participantMutationTypes.find(function(e) {
                    return e.id == t.typeId;
                  }),
                  r = a ? a.codeRef : null,
                  i = n.props.participantMutationStatuses.find(function(e) {
                    return e.id == t.statusId;
                  }),
                  o = i ? i.codeRef : null,
                  l = (function(e, t, a, n, r, i, o) {
                    return (
                      e.typeId || ((t.typeId = !0), (n = !0)),
                      e.statusId
                        ? ("interest" === r &&
                            ("loan" === o
                              ? "withDrawal" === i || "sell" === i
                                ? e.amountInterest &&
                                  e.amountInterest > 0 &&
                                  ((t.amountInterest = !0),
                                  (a.amountInterest =
                                    "Voer een negatief bedrag of 0 in."),
                                  (n = !0))
                                : e.amountInterest &&
                                  e.amountInterest < 0 &&
                                  ((t.amountInterest = !0),
                                  (a.amountInterest =
                                    "Voer een positief bedrag of 0 in."),
                                  (n = !0))
                              : "withDrawal" === i || "sell" === i
                              ? e.quantityInterest &&
                                e.quantityInterest > 0 &&
                                ((t.quantityInterest = !0),
                                (a.quantityInterest =
                                  "Voer een negatief aantal of 0 in."),
                                (n = !0))
                              : e.quantityInterest &&
                                e.quantityInterest < 0 &&
                                ((t.quantityInterest = !0),
                                (a.quantityInterest =
                                  "Voer een positief getal of 0 in."),
                                (n = !0))),
                          "option" === r &&
                            ("loan" === o
                              ? "withDrawal" === i || "sell" === i
                                ? (!e.amountOption || e.amountOption >= 0) &&
                                  ((t.amountOption = !0),
                                  (a.amountOption =
                                    "Voer een negatief bedrag in."),
                                  (n = !0))
                                : (!e.amountOption || e.amountOption <= 0) &&
                                  ((t.amountOption = !0),
                                  (a.amountOption =
                                    "Voer een positief bedrag in."),
                                  (n = !0))
                              : "withDrawal" === i || "sell" === i
                              ? (!e.quantityOption || e.quantityOption >= 0) &&
                                ((t.quantityOption = !0),
                                (a.quantityOption =
                                  "Voer een negatief aantal in."),
                                (n = !0))
                              : (!e.quantityOption || e.quantityOption <= 0) &&
                                ((t.quantityOption = !0),
                                (a.quantityOption =
                                  "Voer een positief aantal in."),
                                (n = !0)),
                            e.dateOption || ((t.dateOption = !0), (n = !0))),
                          "granted" === r &&
                            ("loan" === o
                              ? "withDrawal" === i || "sell" === i
                                ? (!e.amountGranted || e.amountGranted >= 0) &&
                                  ((t.amountGranted = !0),
                                  (a.amountGranted =
                                    "Voer een negatief bedrag in."),
                                  (n = !0))
                                : (!e.amountGranted || e.amountGranted <= 0) &&
                                  ((t.amountGranted = !0),
                                  (a.amountGranted =
                                    "Voer een positief bedrag in."),
                                  (n = !0))
                              : "withDrawal" === i || "sell" === i
                              ? (!e.quantityGranted ||
                                  e.quantityGranted >= 0) &&
                                ((t.quantityGranted = !0),
                                (a.quantityGranted =
                                  "Voer een negatief aantal in."),
                                (n = !0))
                              : (!e.quantityGranted ||
                                  e.quantityGranted <= 0) &&
                                ((t.quantityGranted = !0),
                                (a.quantityGranted =
                                  "Voer een positief aantal in."),
                                (n = !0)),
                            e.dateGranted || ((t.dateGranted = !0), (n = !0))),
                          "final" === r &&
                            ("loan" === o
                              ? "withDrawal" === i || "sell" === i
                                ? (!e.amountFinal || e.amountFinal >= 0) &&
                                  ((t.amountFinal = !0),
                                  (a.amountFinal =
                                    "Voer een negatief bedrag in."),
                                  (n = !0))
                                : (!e.amountFinal || e.amountFinal <= 0) &&
                                  ((t.amountFinal = !0),
                                  (a.amountFinal =
                                    "Voer een positief bedrag in."),
                                  (n = !0))
                              : "withDrawal" === i || "sell" === i
                              ? (!e.quantityFinal || e.quantityFinal >= 0) &&
                                ((t.quantityFinal = !0),
                                (a.quantityFinal =
                                  "Voer een negatief aantal in."),
                                (n = !0))
                              : (!e.quantityFinal || e.quantityFinal <= 0) &&
                                ((t.quantityFinal = !0),
                                (a.quantityFinal =
                                  "Voer een positief aantal in."),
                                (n = !0)),
                            e.dateEntry || ((t.dateEntry = !0), (n = !0))))
                        : ((t.statusId = !0), (n = !0)),
                      { hasErrors: n, errors: t, errorMessage: a }
                    );
                  })(t, {}, {}, !1, o, r, n.props.projectTypeCodeRef);
                if (
                  (n.setState(
                    kt(
                      kt({}, n.state),
                      {},
                      { errors: l.errors, errorMessage: l.errorMessage }
                    )
                  ),
                  !l.hasErrors)
                ) {
                  var c = (function(e, t, a, n) {
                    var r = {
                      participationId: e.participationId,
                      statusId: e.statusId,
                      typeId: e.typeId
                    };
                    return (
                      "interest" === t &&
                        ((r.dateInterest = e.dateInterest),
                        "loan" === n
                          ? ((r.amountInterest = e.amountInterest),
                            (r.amount = e.amountInterest))
                          : ((r.quantityInterest = e.quantityInterest),
                            (r.quantity = e.quantityInterest))),
                      "option" === t &&
                        ((r.dateOption = e.dateOption),
                        "loan" === n
                          ? ((r.amountOption = e.amountOption),
                            (r.amount = e.amountOption))
                          : ((r.quantityOption = e.quantityOption),
                            (r.quantity = e.quantityOption))),
                      "granted" === t &&
                        ((r.dateGranted = e.dateGranted),
                        "loan" === n
                          ? ((r.amountGranted = e.amountGranted),
                            (r.amount = e.amountGranted))
                          : ((r.quantityGranted = e.quantityGranted),
                            (r.quantity = e.quantityGranted))),
                      "final" === t &&
                        ((r.dateGranted = e.dateGranted),
                        (r.datePayment = e.datePayment),
                        (r.dateEntry = e.dateEntry),
                        "loan" === n
                          ? ((r.amountFinal = e.amountFinal),
                            (r.amount = e.amountFinal))
                          : ((r.quantityFinal = e.quantityFinal),
                            (r.quantity = e.quantityFinal)),
                        (r.dateContractRetour = e.dateContractRetour)),
                      r
                    );
                  })(t, o, 0, n.props.projectTypeCodeRef);
                  ze.a.newParticipantMutation(c).then(function(e) {
                    n.props.fetchParticipantProjectDetails(n.props.id),
                      e.data
                        ? n.setState(
                            kt(
                              kt({}, n.state),
                              {},
                              { successNewMessage: e.data }
                            )
                          )
                        : n.props.toggleShowNew();
                  });
                }
              }),
              (n.state = {
                participationMutation: {
                  participationId: n.props.id,
                  typeId: "",
                  statusId: "",
                  quantityInterest: 0,
                  amountInterest: 0,
                  dateInterest: A()().format("YYYY-MM-DD"),
                  quantityOption: 0,
                  amountOption: 0,
                  dateOption: A()().format("YYYY-MM-DD"),
                  quantityGranted: 0,
                  amountGranted: 0,
                  dateGranted: A()().format("YYYY-MM-DD"),
                  quantityFinal: 0,
                  amountFinal: 0,
                  dateContractRetour: null,
                  datePayment: null,
                  dateEntry: n.props.projectDateEntry
                    ? A()(n.props.projectDateEntry).format("YYYY-MM-DD")
                    : A()().format("YYYY-MM-DD")
                },
                errors: {},
                errorMessage: {}
              }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.participationMutation,
                    t = e.typeId,
                    a = e.statusId,
                    n = this.props,
                    r = n.participantMutationStatuses,
                    i = n.projectTypeCodeRef,
                    o = this.props.participantMutationTypes.filter(function(e) {
                      return e.projectTypeCodeRef === i;
                    }),
                    l = o.find(function(e) {
                      return e.id == t;
                    }),
                    c = l ? l.codeRef : null,
                    s = r.find(function(e) {
                      return e.id == a;
                    }),
                    u = s ? s.codeRef : null,
                    p = o.filter(function(e) {
                      return (
                        "first_deposit" === e.codeRef ||
                        "deposit" === e.codeRef ||
                        "withDrawal" === e.codeRef ||
                        "sell" === e.codeRef
                      );
                    });
                  return f.a.createElement(
                    f.a.Fragment,
                    null,
                    f.a.createElement(
                      "form",
                      {
                        className: "form-horizontal",
                        onSubmit: this.handleSubmit
                      },
                      f.a.createElement(
                        N.a,
                        { className: "panel-grey" },
                        f.a.createElement(
                          O.a,
                          null,
                          f.a.createElement(
                            "div",
                            { className: "row" },
                            f.a.createElement(H.a, {
                              label: "Type",
                              id: "typeId",
                              name: "typeId",
                              options: p,
                              value: t,
                              onChangeAction: this.handleInputChange,
                              required: "required",
                              error: this.state.errors.typeId
                            }),
                            f.a.createElement(H.a, {
                              label: "Status",
                              id: "statusId",
                              name: "statusId",
                              options: r,
                              value: a,
                              onChangeAction: this.handleInputChange,
                              required: "required",
                              error: this.state.errors.statusId
                            })
                          ),
                          "first_deposit" === c || "deposit" === c
                            ? f.a.createElement(
                                It,
                                Ee()(
                                  { statusCodeRef: u },
                                  this.state.participationMutation,
                                  {
                                    errors: this.state.errors,
                                    errorMessage: this.state.errorMessage,
                                    handleInputChange: this.handleInputChange,
                                    handleInputChangeDate: this
                                      .handleInputChangeDate,
                                    projectTypeCodeRef: this.props
                                      .projectTypeCodeRef
                                  }
                                )
                              )
                            : null,
                          "withDrawal" === c || "sell" === c
                            ? f.a.createElement(
                                Mt,
                                Ee()(
                                  { statusCodeRef: u },
                                  this.state.participationMutation,
                                  {
                                    errors: this.state.errors,
                                    errorMessage: this.state.errorMessage,
                                    handleInputChange: this.handleInputChange,
                                    handleInputChangeDate: this
                                      .handleInputChangeDate,
                                    projectTypeCodeRef: this.props
                                      .projectTypeCodeRef
                                  }
                                )
                              )
                            : null,
                          f.a.createElement(
                            "div",
                            {
                              className: "pull-right btn-group",
                              role: "group"
                            },
                            f.a.createElement(I.a, {
                              buttonClassName: "btn-default",
                              buttonText: "Annuleren",
                              onClickAction: this.props.toggleShowNew
                            }),
                            f.a.createElement(I.a, {
                              buttonText: "Opslaan",
                              onClickAction: this.handleSubmit,
                              type: "submit",
                              value: "Submit"
                            })
                          )
                        )
                      )
                    ),
                    this.state.successNewMessage &&
                      f.a.createElement(
                        C.a,
                        {
                          closeModal: this.props.toggleShowNew,
                          buttonCancelText: "Ok",
                          showConfirmAction: !1,
                          title: "Succes"
                        },
                        this.state.successNewMessage.map(function(e, t) {
                          return f.a.createElement("p", { key: t }, e);
                        })
                      )
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        At = Object(h.b)(
          function(e) {
            return {
              participantMutationTypes: e.systemData.participantMutationTypes,
              participantMutationStatuses:
                e.systemData.participantMutationStatuses,
              id: e.participantProjectDetails.id,
              projectTypeCodeRef:
                e.participantProjectDetails.project.projectType.codeRef,
              projectDateEntry: e.participantProjectDetails.project.dateEntry
            };
          },
          function(e) {
            return {
              fetchParticipantProjectDetails: function(t) {
                e(j(t));
              }
            };
          }
        )(Rt);
      function Tt(e) {
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
      var St = (function(e) {
          c()(a, e);
          var t = Tt(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              v()(y()(n), "toggleShowNew", function() {
                n.setState({
                  showNew: !n.state.showNew,
                  successNewMessage: ""
                });
              }),
              (n.state = { showNew: !1, successNewMessage: "" }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  return f.a.createElement(
                    N.a,
                    null,
                    f.a.createElement(
                      Be.a,
                      null,
                      f.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Mutaties"
                      ),
                      this.props.permissions.manageFinancial &&
                        !this.props.isTerminated &&
                        f.a.createElement(
                          "a",
                          {
                            role: "button",
                            className: "pull-right",
                            onClick: this.toggleShowNew
                          },
                          f.a.createElement("span", {
                            className: "glyphicon glyphicon-plus"
                          })
                        )
                    ),
                    f.a.createElement(
                      O.a,
                      null,
                      f.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          f.a.createElement(At, {
                            toggleShowNew: this.toggleShowNew
                          })
                      ),
                      f.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        f.a.createElement(Dt, null)
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        Ft = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(St);
      A.a.locale("nl");
      var Gt = Object(h.b)(function(e) {
          return { participantProjectDetails: e.participantProjectDetails };
        })(function(e) {
          var t = e.participantProjectDetails,
            a = t.createdAt,
            n = t.createdBy,
            r = t.updatedAt,
            i = t.updatedBy;
          return f.a.createElement(
            "div",
            null,
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(z.a, {
                label: "Gemaakt door",
                value: n ? n.fullName : "Onbekend",
                link: n ? "gebruiker/" + n.id : ""
              }),
              f.a.createElement(z.a, {
                label: "Laatste update door",
                value: i ? i.fullName : "Onbekend",
                link: i ? "gebruiker/" + i.id : ""
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(z.a, {
                label: "Gemaakt op",
                value: a ? A()(a).format("L") : "Onbekend"
              }),
              f.a.createElement(z.a, {
                label: "Laatste update op",
                value: r ? A()(r).format("L") : "Onbekend"
              })
            )
          );
        }),
        Bt = function() {
          return f.a.createElement(
            N.a,
            null,
            f.a.createElement(
              Be.a,
              null,
              f.a.createElement(
                "span",
                { className: "h5 text-bold" },
                "Afsluiting gegevens"
              )
            ),
            f.a.createElement(
              O.a,
              null,
              f.a.createElement(
                "div",
                { className: "col-md-12" },
                f.a.createElement(Gt, null)
              )
            )
          );
        };
      function xt(e) {
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
      var Lt = (function(e) {
          c()(a, e);
          var t = xt(a);
          function a() {
            return r()(this, a), t.apply(this, arguments);
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  var e = "",
                    t = !0,
                    a = "";
                  return (
                    this.props.participantProject.project &&
                      (a = this.props.participantProject.project.projectType
                        .codeRef),
                    this.props.hasError
                      ? (e = "Fout bij het ophalen van deelnemers.")
                      : this.props.isLoading &&
                        !this.props.participantProject.id
                      ? (e = "Gegevens aan het laden.")
                      : Object(L.isEmpty)(this.props.participantProject)
                      ? (e = "Geen deelnemers gevonden!")
                      : (t = !1),
                    t
                      ? f.a.createElement("div", null, e)
                      : f.a.createElement(
                          "div",
                          null,
                          f.a.createElement(be, null),
                          f.a.createElement(Ft, {
                            isTerminated: Boolean(
                              this.props.participantProject.dateTerminated
                            )
                          }),
                          "obligation" === a
                            ? f.a.createElement(We, null)
                            : null,
                          f.a.createElement(Bt, null)
                        )
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        Wt = Object(h.b)(function(e) {
          return {
            participantProject: e.participantProjectDetails,
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError,
            keyUserRole: e.meDetails.roles.find(function(e) {
              return "Key user" === e.name;
            })
          };
        })(Lt);
      function Yt(e) {
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
      var Vt = (function(e) {
          c()(a, e);
          var t = Yt(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              v()(y()(n), "openItem", function(e) {
                E.f.push("/document/".concat(e));
              }),
              (n.state = { relatedDocuments: "" }),
              n
            );
          }
          return (
            o()(a, [
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
                                { className: "col-xs-5 clickable" },
                                A()(t.createdAt).format("L")
                              ),
                              f.a.createElement(
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
        })(d.Component),
        _t = Object(h.b)(function(e) {
          return {
            relatedDocuments: e.participantProjectDetails.relatedDocuments
          };
        })(Vt),
        zt = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showDocumentsList,
            n = e.newDocument,
            r = e.documentCount,
            i = e.permissions;
          return f.a.createElement(
            N.a,
            { className: "harmonica-button" },
            f.a.createElement(
              O.a,
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
                i.createDocument &&
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
                a && f.a.createElement(_t, null)
              )
            )
          );
        }),
        Ut = Object(h.b)(function(e) {
          return { relatedOrders: e.participantProjectDetails.relatedOrders };
        })(function(e) {
          var t = e.relatedOrders;
          return f.a.createElement(
            "div",
            null,
            t.length > 0
              ? f.a.createElement(
                  "table",
                  { className: "table harmonica-table" },
                  f.a.createElement(
                    "tbody",
                    null,
                    t.map(function(e, t) {
                      return f.a.createElement(
                        "tr",
                        { key: t },
                        f.a.createElement(
                          "td",
                          {
                            className: "col-xs-10 clickable",
                            onClick: function() {
                              return (
                                (t = e.id), void E.f.push("/order/".concat(t))
                              );
                              var t;
                            }
                          },
                          e.number,
                          " - ",
                          e.subject,
                          " "
                        )
                      );
                    })
                  )
                )
              : f.a.createElement("div", null, "Geen orders gevonden.")
          );
        }),
        Ht = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showOrdersList,
            n = e.newOrder,
            r = e.orderCount,
            i = e.permissions;
          return f.a.createElement(
            N.a,
            { className: "harmonica-button" },
            f.a.createElement(
              O.a,
              null,
              f.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                f.a.createElement(
                  "span",
                  { className: "" },
                  "ORDERS ",
                  f.a.createElement("span", { className: "badge" }, r)
                )
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                i.manageFinancial &&
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
                a && f.a.createElement(Ut, null)
              )
            )
          );
        });
      function Kt(e, t) {
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
      function Xt(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Kt(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Kt(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Jt(e) {
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
      var Qt = (function(e) {
          c()(a, e);
          var t = Jt(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              v()(y()(n), "newDocument", function(e) {
                E.f.push(
                  "/document/nieuw/"
                    .concat(e, "/project/")
                    .concat(n.props.participant.projectId, "/deelnemer/")
                    .concat(n.props.participant.id, "/contact/")
                    .concat(n.props.participant.contact.id)
                );
              }),
              v()(y()(n), "newOrder", function() {
                E.f.push(
                  "/order/nieuw/contact/".concat(n.props.participant.contact.id)
                );
              }),
              (n.state = { toggleShowList: { documents: !1, orders: !1 } }),
              (n.toggleShowList = n.toggleShowList.bind(y()(n))),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "toggleShowList",
                value: function(e) {
                  this.setState(
                    Xt(
                      Xt({}, this.state),
                      {},
                      {
                        toggleShowList: Xt(
                          Xt({}, this.state.toggleShowList),
                          {},
                          v()({}, e, !this.state.toggleShowList[e])
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = 0;
                  return (
                    this.props.participant.relatedOrders &&
                      (t = this.props.participant.relatedOrders.length),
                    f.a.createElement(
                      "div",
                      null,
                      f.a.createElement(
                        "div",
                        { className: "margin-10-top" },
                        f.a.createElement(zt, {
                          toggleShowList: function() {
                            return e.toggleShowList("documents");
                          },
                          showDocumentsList: this.state.toggleShowList
                            .documents,
                          newDocument: this.newDocument,
                          documentCount: this.props.participant.documentCount
                        })
                      ),
                      f.a.createElement(
                        "div",
                        { className: "margin-10-top" },
                        f.a.createElement(Ht, {
                          toggleShowList: function() {
                            return e.toggleShowList("orders");
                          },
                          showOrdersList: this.state.toggleShowList.orders,
                          newOrder: this.newOrder,
                          orderCount: t,
                          permissions: this.props.meDetails.permissions
                        })
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        Zt = Object(h.b)(function(e) {
          return {
            participant: e.participantProjectDetails,
            meDetails: e.meDetails
          };
        }, null)(Qt);
      function $t(e) {
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
      var ea = (function(e) {
        c()(a, e);
        var t = $t(a);
        function a(e) {
          return r()(this, a), t.call(this, e);
        }
        return (
          o()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchParticipantProjectDetails(this.props.params.id);
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearParticipantProject();
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
                      f.a.createElement(x, null)
                    ),
                    f.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      f.a.createElement(Wt, null)
                    )
                  ),
                  f.a.createElement(
                    N.a,
                    { className: "col-md-3 harmonica" },
                    f.a.createElement(O.a, null, f.a.createElement(Zt, null))
                  )
                );
              }
            }
          ]),
          a
        );
      })(d.Component);
      t.default = Object(h.b)(null, function(e) {
        return {
          fetchParticipantProjectDetails: function(t) {
            e(j(t));
          },
          clearParticipantProject: function() {
            e({ type: "CLEAR_PARTICIPANT_PROJECT" });
          }
        };
      })(ea);
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        l = function(e) {
          var t = e.children,
            a = e.className,
            n = e.onMouseEnter,
            i = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: i
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
          className: o.a.string,
          onMouseEnter: o.a.func,
          onMouseLeave: o.a.func
        }),
        (t.a = l);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
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
        (l.propTypes = { className: o.a.string }),
        (t.a = l);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        l = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            i = e.type,
            o = e.value,
            l = e.loading,
            c = e.loadText,
            s = e.disabled;
          return l
            ? r.a.createElement(
                "button",
                {
                  type: i,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: o,
                  disabled: l
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
                  type: i,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: o,
                  disabled: s
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
          buttonClassName: o.a.string,
          buttonText: o.a.string.isRequired,
          onClickAction: o.a.func,
          type: o.a.string,
          value: o.a.string,
          loading: o.a.bool,
          loadText: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = l);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        l = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            i = e.title,
            o = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: o,
              title: i
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
          buttonClassName: o.a.string,
          iconName: o.a.string.isRequired,
          onClickAction: o.a.func,
          title: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = l);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        l = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            i = e.size,
            o = e.id,
            l = e.placeholder,
            c = e.name,
            s = e.value,
            u = e.onClickAction,
            p = e.onChangeAction,
            m = e.onBlurAction,
            d = e.required,
            f = e.readOnly,
            h = e.maxLength,
            g = e.error,
            y = e.min,
            b = e.max,
            v = e.step,
            E = e.errorMessage,
            N = e.divSize,
            O = e.divClassName,
            w = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(N, " ").concat(O) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(d) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(i) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (g ? "has-error" : ""),
                id: o,
                placeholder: l,
                name: c,
                value: s,
                onClick: u,
                onChange: p,
                onBlur: m,
                readOnly: f,
                maxLength: h,
                min: y,
                max: b,
                autoComplete: w,
                step: v
              })
            ),
            g &&
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
          label: o.a.oneOfType([o.a.string, o.a.object]).isRequired,
          type: o.a.string,
          className: o.a.string,
          divClassName: o.a.string,
          size: o.a.string,
          divSize: o.a.string,
          id: o.a.string,
          placeholder: o.a.string,
          name: o.a.string.isRequired,
          value: o.a.oneOfType([o.a.string, o.a.number]),
          onClickAction: o.a.func,
          onChangeAction: o.a.func,
          onBlurAction: o.a.func,
          required: o.a.string,
          readOnly: o.a.bool,
          maxLength: o.a.string,
          error: o.a.bool,
          min: o.a.string,
          max: o.a.string,
          step: o.a.string,
          errorMessage: o.a.string,
          autoComplete: o.a.string
        }),
        (t.a = l);
    },
    695: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(4),
        o = a(8),
        l = a.n(o),
        c = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            o = e.value,
            l = e.link,
            c = e.hidden;
          return l.length > 0
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
                    i.b,
                    { to: l, className: "link-underline" },
                    o
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
                r.a.createElement("div", { className: "col-sm-6", id: n }, o)
              );
        };
      (c.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (c.propTypes = {
          label: l.a.oneOfType([l.a.string, l.a.object]).isRequired,
          className: l.a.string,
          id: l.a.string,
          value: l.a.oneOfType([l.a.string, l.a.number]),
          link: l.a.string,
          hidden: l.a.bool
        }),
        (t.a = c);
    },
    696: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        l = function(e) {
          var t = e.label,
            a = e.className,
            n = e.size,
            i = e.id,
            o = e.name,
            l = e.value,
            c = e.options,
            s = e.onChangeAction,
            u = e.onBlurAction,
            p = e.required,
            m = e.error,
            d = e.errorMessage,
            f = e.optionValue,
            h = e.optionName,
            g = e.readOnly,
            y = e.placeholder,
            b = e.divClassName,
            v = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(b) },
            r.a.createElement(
              "label",
              { htmlFor: i, className: "col-sm-6 ".concat(p) },
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
                  id: i,
                  name: o,
                  value: l,
                  onChange: s,
                  onBlur: u,
                  readOnly: g
                },
                v && r.a.createElement("option", { value: "" }, y),
                c.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[f], value: e[f] },
                    e[h]
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
                  d
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
          label: o.a.string.isRequired,
          className: o.a.string,
          size: o.a.string,
          id: o.a.string,
          name: o.a.string.isRequired,
          options: o.a.array,
          value: o.a.oneOfType([o.a.string, o.a.number]),
          onChangeAction: o.a.func,
          onBlurAction: o.a.func,
          required: o.a.string,
          readOnly: o.a.bool,
          error: o.a.bool,
          errorMessage: o.a.string,
          emptyOption: o.a.bool,
          optionValue: o.a.string,
          optionName: o.a.string,
          placeholder: o.a.string
        }),
        (t.a = l);
    },
    698: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
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
        (l.propTypes = { className: o.a.string }),
        (t.a = l);
    },
    699: function(e, t, a) {
      "use strict";
      var n = a(24),
        r = a.n(n),
        i = a(25),
        o = a.n(i),
        l = a(22),
        c = a.n(l),
        s = a(26),
        u = a.n(s),
        p = a(27),
        m = a.n(p),
        d = a(16),
        f = a.n(d),
        h = a(6),
        g = a.n(h),
        y = a(0),
        b = a.n(y),
        v = a(8),
        E = a.n(v),
        N = a(707),
        O = a.n(N),
        w = a(708),
        C = a.n(w),
        j = a(7),
        D = a.n(j);
      function I(e) {
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
          return m()(this, a);
        };
      }
      D.a.locale("nl");
      var M = (function(e) {
        u()(a, e);
        var t = I(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            g()(c()(n), "validateDate", function(e) {
              var t = D()(e.target.value, "DD-MM-YYYY", !0),
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
            g()(c()(n), "onDateChange", function(e) {
              var t = e ? D()(e).format("Y-MM-DD") : "",
                a = !1;
              t &&
                n.props.disabledBefore &&
                D()(t).isBefore(n.props.disabledBefore) &&
                (a = !0),
                t &&
                  n.props.disabledAfter &&
                  D()(t).isAfter(n.props.disabledAfter) &&
                  (a = !0),
                n.setState({ errorDateFormat: a }),
                !a && n.props.onChangeAction(t, n.props.name);
            }),
            (n.state = { errorDateFormat: !1 }),
            n
          );
        }
        return (
          o()(a, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.label,
                  a = e.className,
                  n = e.size,
                  r = e.divSize,
                  i = e.id,
                  o = e.value,
                  l = e.required,
                  c = e.readOnly,
                  s = e.name,
                  u = e.error,
                  p = e.errorMessage,
                  m = e.disabledBefore,
                  d = e.disabledAfter,
                  f = o ? D()(o).format("L") : "",
                  h = {};
                return (
                  m && (h.before = new Date(m)),
                  d && (h.after = new Date(d)),
                  b.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    b.a.createElement(
                      "div",
                      null,
                      b.a.createElement(
                        "label",
                        { htmlFor: i, className: "col-sm-6 ".concat(l) },
                        t
                      )
                    ),
                    b.a.createElement(
                      "div",
                      { className: "".concat(n) },
                      b.a.createElement(O.a, {
                        id: i,
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
                          name: s,
                          onBlur: this.validateDate,
                          autoComplete: "off",
                          readOnly: c,
                          disabled: c
                        },
                        required: l,
                        readOnly: c,
                        placeholder: ""
                      })
                    ),
                    u &&
                      b.a.createElement(
                        "div",
                        { className: "col-sm-offset-6 col-sm-6" },
                        b.a.createElement(
                          "span",
                          { className: "has-error-message" },
                          " ",
                          p
                        )
                      )
                  )
                );
              }
            }
          ]),
          a
        );
      })(y.Component);
      (M.defaultProps = {
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
        (M.propTypes = {
          label: E.a.string.isRequired,
          type: E.a.string,
          className: E.a.string,
          size: E.a.string,
          divSize: E.a.string,
          id: E.a.string,
          name: E.a.string,
          value: E.a.oneOfType([E.a.string, E.a.object]),
          onChangeAction: E.a.func,
          required: E.a.string,
          readOnly: E.a.bool,
          error: E.a.bool,
          errorMessage: E.a.string,
          disabledBefore: E.a.string,
          disabledAfter: E.a.string
        }),
        (t.a = M);
    },
    700: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        l = a(703),
        c = a.n(l),
        s = function(e) {
          var t = e.label,
            a = e.size,
            n = e.id,
            i = e.name,
            o = e.value,
            l = e.onChangeAction,
            s = e.required,
            u = e.divSize,
            p = e.className,
            m = e.disabled;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(u, " ").concat(p) },
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
                name: i,
                onChange: l,
                checked: o,
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
          label: o.a.string.isRequired,
          type: o.a.string,
          size: o.a.string,
          divSize: o.a.string,
          id: o.a.string,
          name: o.a.string.isRequired,
          value: o.a.bool,
          onChangeAction: o.a.func,
          required: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = s);
    },
    702: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
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
        (l.propTypes = { className: o.a.string }),
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
        i = a(0),
        o = m(i),
        l = m(a(710)),
        c = m(a(8)),
        s = m(a(704)),
        u = m(a(705)),
        p = a(706);
      function m(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var d = (function(e) {
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
                (this.startX = (0, p.pointerCoord)(e).x), (this.activated = !0);
              }
            },
            {
              key: "handleTouchMove",
              value: function(e) {
                if (this.activated && ((this.moved = !0), this.startX)) {
                  var t = (0, p.pointerCoord)(e).x;
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
                    var a = (0, p.pointerCoord)(e).x;
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
                  i = (0, l.default)(
                    "react-toggle",
                    {
                      "react-toggle--checked": this.state.checked,
                      "react-toggle--focus": this.state.hasFocus,
                      "react-toggle--disabled": this.props.disabled
                    },
                    a
                  );
                return o.default.createElement(
                  "div",
                  {
                    className: i,
                    onClick: this.handleClick,
                    onTouchStart: this.handleTouchStart,
                    onTouchMove: this.handleTouchMove,
                    onTouchEnd: this.handleTouchEnd
                  },
                  o.default.createElement(
                    "div",
                    { className: "react-toggle-track" },
                    o.default.createElement(
                      "div",
                      { className: "react-toggle-track-check" },
                      this.getIcon("checked")
                    ),
                    o.default.createElement(
                      "div",
                      { className: "react-toggle-track-x" },
                      this.getIcon("unchecked")
                    )
                  ),
                  o.default.createElement("div", {
                    className: "react-toggle-thumb"
                  }),
                  o.default.createElement(
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
      })(i.PureComponent);
      (t.default = d),
        (d.displayName = "Toggle"),
        (d.defaultProps = {
          icons: {
            checked: o.default.createElement(s.default, null),
            unchecked: o.default.createElement(u.default, null)
          }
        }),
        (d.propTypes = {
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
        i = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
        return i.default.createElement(
          "svg",
          { width: "14", height: "11", viewBox: "0 0 14 11" },
          i.default.createElement("title", null, "switch-check"),
          i.default.createElement("path", {
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
        i = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
        return i.default.createElement(
          "svg",
          { width: "10", height: "10", viewBox: "0 0 10 10" },
          i.default.createElement("title", null, "switch-x"),
          i.default.createElement("path", {
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
    710: function(e, t, a) {
      var n;
      /*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/ !(function() {
        "use strict";
        var a = {}.hasOwnProperty;
        function r() {
          for (var e = [], t = 0; t < arguments.length; t++) {
            var n = arguments[t];
            if (n) {
              var i = typeof n;
              if ("string" === i || "number" === i) e.push(n);
              else if (Array.isArray(n) && n.length) {
                var o = r.apply(null, n);
                o && e.push(o);
              } else if ("object" === i)
                for (var l in n) a.call(n, l) && n[l] && e.push(l);
            }
          }
          return e.join(" ");
        }
        e.exports
          ? ((r.default = r), (e.exports = r))
          : void 0 ===
              (n = function() {
                return r;
              }.apply(t, [])) || (e.exports = n);
      })();
    },
    713: function(e, t, a) {
      "use strict";
      t.a = function(e) {
        return (
          e || (e = 0),
          (e = parseFloat(e)),
          isNaN(e)
            ? "Ongeldig bedrag"
            : "€ ".concat(
                e.toLocaleString("nl", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              )
        );
      };
    },
    763: function(e, t, a) {
      var n = a(826),
        r = a(827),
        i = a(421),
        o = a(828);
      e.exports = function(e, t) {
        return n(e) || r(e, t) || i(e, t) || o();
      };
    },
    826: function(e, t) {
      e.exports = function(e) {
        if (Array.isArray(e)) return e;
      };
    },
    827: function(e, t) {
      e.exports = function(e, t) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
          var a = [],
            n = !0,
            r = !1,
            i = void 0;
          try {
            for (
              var o, l = e[Symbol.iterator]();
              !(n = (o = l.next()).done) &&
              (a.push(o.value), !t || a.length !== t);
              n = !0
            );
          } catch (e) {
            (r = !0), (i = e);
          } finally {
            try {
              n || null == l.return || l.return();
            } finally {
              if (r) throw i;
            }
          }
          return a;
        }
      };
    },
    828: function(e, t) {
      e.exports = function() {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      };
    }
  }
]);
