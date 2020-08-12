(window.webpackJsonp = window.webpackJsonp || []).push([
  [39],
  {
    1422: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        s = a(25),
        o = a.n(s),
        i = a(26),
        l = a.n(i),
        c = a(27),
        u = a.n(c),
        m = a(16),
        p = a.n(m),
        d = a(0),
        h = a.n(d),
        f = a(32),
        g = a(690),
        v = a(785),
        b = a(22),
        E = a.n(b),
        y = a(6),
        k = a.n(y),
        N = a(4),
        w = a(693),
        C = a(100),
        D = Object(f.b)(null, function(e) {
          return {
            deleteTask: function(t) {
              e(Object(v.a)(t));
            }
          };
        })(function(e) {
          return h.a.createElement(
            C.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return e.deleteTask(e.id), void e.closeDeleteItemModal();
              },
              title: "Verwijderen"
            },
            h.a.createElement(
              "p",
              null,
              "Verwijder taak: ",
              h.a.createElement(
                "strong",
                null,
                " ",
                "".concat(e.noteSummary),
                " "
              )
            )
          );
        }),
        S = a(691),
        I = a(93),
        O = function(e) {
          return h.a.createElement(
            C.a,
            {
              buttonConfirmText: "Dupliceer",
              closeModal: e.closeModal,
              confirmAction: function() {
                I.a.duplicateTask(e.id).then(function(t) {
                  var a = t.data.data.id;
                  N.f.push("/taak/".concat(a)), e.closeModal();
                });
              },
              title: "Dupliceer taak"
            },
            h.a.createElement(
              "p",
              null,
              "Dupliceer taak: ",
              h.a.createElement(
                "strong",
                null,
                " ",
                "".concat(e.noteSummary),
                " "
              )
            )
          );
        };
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
          var a,
            n = p()(e);
          if (t) {
            var r = p()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var T = (function(e) {
          l()(a, e);
          var t = L(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              k()(E()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              k()(E()(n), "toggleDuplicate", function() {
                n.setState({ showDuplicate: !n.state.showDuplicate });
              }),
              (n.state = { showDelete: !1, showDuplicate: !1 }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.props.taskDetails.finished;
                  return h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(
                      "div",
                      { className: "col-sm-12" },
                      h.a.createElement(
                        g.a,
                        null,
                        h.a.createElement(
                          S.a,
                          { className: "panel-small" },
                          h.a.createElement(
                            "div",
                            { className: "col-md-4" },
                            h.a.createElement(
                              "div",
                              {
                                className: "btn-group btn-group-flex",
                                role: "group"
                              },
                              h.a.createElement(w.a, {
                                iconName: "glyphicon-arrow-left",
                                onClickAction: N.e.goBack
                              }),
                              this.props.permissions.manageTask &&
                                h.a.createElement(w.a, {
                                  iconName: "glyphicon-duplicate",
                                  onClickAction: this.toggleDuplicate
                                }),
                              this.props.permissions.manageTask &&
                                h.a.createElement(w.a, {
                                  iconName: "glyphicon-trash",
                                  onClickAction: this.toggleDelete
                                })
                            )
                          ),
                          h.a.createElement(
                            "div",
                            { className: "col-md-4" },
                            h.a.createElement(
                              "h3",
                              {
                                className:
                                  "text-center table-title margin-small"
                              },
                              e ? "Notitie" : "Taak",
                              " "
                            )
                          ),
                          h.a.createElement("div", { className: "col-md-4" })
                        )
                      )
                    ),
                    this.state.showDelete &&
                      h.a.createElement(D, {
                        closeDeleteItemModal: this.toggleDelete,
                        noteSummary: this.props.taskDetails.noteSummary,
                        id: this.props.id
                      }),
                    this.state.showDuplicate &&
                      h.a.createElement(O, {
                        closeModal: this.toggleDuplicate,
                        noteSummary: this.props.taskDetails.noteSummary,
                        id: this.props.id
                      })
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        j = Object(f.b)(function(e) {
          return {
            taskDetails: e.taskDetails,
            id: e.taskDetails.id,
            permissions: e.meDetails.permissions
          };
        }, null)(T),
        P = a(198),
        R = a(7),
        A = a.n(R),
        x = a(102),
        z = a(692),
        q = a(696),
        F = a(699),
        M = a(697),
        B = a.n(M),
        G = a(206),
        V = a(54),
        H = a(209),
        W = a(214),
        K = a(709),
        U = a(947),
        _ = function(e) {
          var t = e.task,
            a = e.invoices,
            n = e.campaigns,
            r = e.intakes,
            s = e.contactGroups,
            o = e.opportunities,
            i = e.housingFiles,
            l = e.projects,
            c = e.participants,
            u = e.orders,
            m = e.handleReactSelectChange,
            p = e.peekLoading,
            d = t.intakeId,
            f = t.contactGroupId,
            g = t.opportunityId,
            v = t.campaignId,
            b = t.housingFileId,
            E = t.projectId,
            y = t.participantId,
            k = t.orderId,
            N = t.invoiceId;
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(K.a, {
                label: "Campagne",
                name: "campaignId",
                options: n,
                value: v,
                onChangeAction: m,
                multi: !1,
                isLoading: p.campaigns
              }),
              h.a.createElement(K.a, {
                label: "Intake",
                size: "col-sm-6",
                name: "intakeId",
                options: r,
                value: d,
                onChangeAction: m,
                multi: !1,
                isLoading: p.intakes
              })
            ),
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(K.a, {
                label: "Groep",
                size: "col-sm-6",
                name: "contactGroupId",
                options: s,
                value: f,
                onChangeAction: m,
                multi: !1,
                isLoading: p.contactGroups
              }),
              h.a.createElement(K.a, {
                label: "Kans",
                size: "col-sm-6",
                name: "opportunityId",
                options: o,
                value: g,
                onChangeAction: m,
                multi: !1,
                isLoading: p.opportunities
              })
            ),
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(K.a, {
                label: "Woningdossier",
                size: "col-sm-6",
                name: "housingFileId",
                options: i,
                value: b,
                onChangeAction: m,
                multi: !1,
                isLoading: p.housingFiles
              }),
              h.a.createElement(K.a, {
                label: "Project",
                size: "col-sm-6",
                name: "projectId",
                options: l,
                value: E,
                onChangeAction: m,
                multi: !1,
                isLoading: p.projects
              })
            ),
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(K.a, {
                label: "Participant project",
                size: "col-sm-6",
                name: "participantId",
                options: c,
                value: y,
                onChangeAction: m,
                multi: !1,
                isLoading: p.participants
              }),
              h.a.createElement(K.a, {
                label: "Order",
                size: "col-sm-6",
                name: "orderId",
                options: u,
                value: k,
                onChangeAction: m,
                multi: !1,
                isLoading: p.orders
              })
            ),
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(K.a, {
                label: "Nota",
                size: "col-sm-6",
                name: "invoiceId",
                options: a,
                value: N,
                onChangeAction: m,
                multi: !1,
                isLoading: p.invoices
              })
            )
          );
        },
        Y = a(734),
        J = a(700),
        X = a(698),
        Z = a(746),
        Q = a(203),
        $ = a(216),
        ee = a(207),
        te = a(210),
        ae = a(212);
      function ne(e, t) {
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
      function re(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ne(Object(a), !0).forEach(function(t) {
                k()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : ne(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
            n = p()(e);
          if (t) {
            var r = p()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      A.a.locale("nl");
      var oe = (function(e) {
          l()(a, e);
          var t = se(a);
          function a(e) {
            var n;
            r()(this, a), (n = t.call(this, e));
            var s = e.taskDetails,
              o = s.id,
              i = s.note,
              l = s.typeId,
              c = s.contactId,
              u = s.contact,
              m = s.finished,
              p = s.intakeId,
              d = s.campaignId,
              h = s.contactGroupId,
              f = s.housingFileId,
              g = s.projectId,
              v = s.participantId,
              b = s.datePlannedStart,
              y = s.datePlannedFinish,
              k = s.startTimePlanned,
              N = s.endTimePlanned,
              w = s.dateFinished,
              C = s.responsibleUserId,
              D = s.responsibleTeamId,
              S = s.finishedById,
              I = s.opportunityId,
              O = s.orderId,
              L = s.invoiceId;
            return (
              (n.state = {
                contacts: c ? [{ id: c, fullName: u.fullName }] : [],
                intakes: [],
                contactGroups: [],
                opportunities: [],
                campaigns: [],
                housingFiles: [],
                projects: [],
                participants: [],
                orders: [],
                invoices: [],
                task: {
                  id: o,
                  note: i,
                  typeId: l || "",
                  contactId: c || "",
                  campaignId: d || "",
                  intakeId: p || "",
                  opportunityId: I || "",
                  contactGroupId: h || "",
                  housingFileId: f || "",
                  projectId: g || "",
                  participantId: v || "",
                  orderId: O || "",
                  invoiceId: L || "",
                  datePlannedStart: b || "",
                  datePlannedFinish: y || "",
                  startTimePlanned: k || "",
                  endTimePlanned: N || "",
                  finished: !!m,
                  dateFinished: w || "",
                  finishedById: S || "",
                  responsibleUserId: C,
                  responsibleTeamId: D,
                  responsible: C ? "user" + C : "team" + D
                },
                errors: { note: !1, responsible: !1 },
                peekLoading: {
                  contacts: !0,
                  intakes: !0,
                  contactGroups: !0,
                  opportunities: !0,
                  campaigns: !0,
                  housingFiles: !0,
                  projects: !0,
                  participants: !0,
                  orders: !0,
                  invoices: !0
                }
              }),
              (n.handleInputChange = n.handleInputChange.bind(E()(n))),
              (n.handleInputChangeDate = n.handleInputChangeDate.bind(E()(n))),
              (n.handleInputChangeTime = n.handleInputChangeTime.bind(E()(n))),
              (n.handleSubmit = n.handleSubmit.bind(E()(n))),
              (n.handleReactSelectChange = n.handleReactSelectChange.bind(
                E()(n)
              )),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  x.a.getContactsPeek().then(function(t) {
                    e.setState({
                      contacts: t,
                      peekLoading: re(
                        re({}, e.state.peekLoading),
                        {},
                        { contacts: !1 }
                      )
                    });
                  }),
                    G.a.peekIntakes().then(function(t) {
                      e.setState({
                        intakes: t,
                        peekLoading: re(
                          re({}, e.state.peekLoading),
                          {},
                          { intakes: !1 }
                        )
                      });
                    }),
                    V.a.peekContactGroups().then(function(t) {
                      e.setState({
                        contactGroups: t,
                        peekLoading: re(
                          re({}, e.state.peekLoading),
                          {},
                          { contactGroups: !1 }
                        )
                      });
                    }),
                    H.a.peekOpportunities().then(function(t) {
                      e.setState({
                        opportunities: t,
                        peekLoading: re(
                          re({}, e.state.peekLoading),
                          {},
                          { opportunities: !1 }
                        )
                      });
                    }),
                    W.a.peekCampaigns().then(function(t) {
                      e.setState({
                        campaigns: t,
                        peekLoading: re(
                          re({}, e.state.peekLoading),
                          {},
                          { campaigns: !1 }
                        )
                      });
                    }),
                    $.a.peekHousingFiles().then(function(t) {
                      e.setState({
                        housingFiles: t,
                        peekLoading: re(
                          re({}, e.state.peekLoading),
                          {},
                          { housingFiles: !1 }
                        )
                      });
                    }),
                    Q.a.peekProjects().then(function(t) {
                      e.setState({
                        projects: t,
                        peekLoading: re(
                          re({}, e.state.peekLoading),
                          {},
                          { projects: !1 }
                        )
                      });
                    }),
                    ee.a.peekParticipantsProjects().then(function(t) {
                      e.setState({
                        participants: t,
                        peekLoading: re(
                          re({}, e.state.peekLoading),
                          {},
                          { participants: !1 }
                        )
                      });
                    }),
                    te.a.peekOrders().then(function(t) {
                      e.setState({
                        orders: t,
                        peekLoading: re(
                          re({}, e.state.peekLoading),
                          {},
                          { orders: !1 }
                        )
                      });
                    }),
                    ae.a.peekInvoices().then(function(t) {
                      e.setState({
                        invoices: t,
                        peekLoading: re(
                          re({}, e.state.peekLoading),
                          {},
                          { invoices: !1 }
                        )
                      });
                    });
                }
              },
              {
                key: "handleInputChange",
                value: function(e) {
                  var t = e.target,
                    a = "checkbox" === t.type ? t.checked : t.value,
                    n = t.name;
                  this.setState(
                    re(
                      re({}, this.state),
                      {},
                      { task: re(re({}, this.state.task), {}, k()({}, n, a)) }
                    )
                  );
                }
              },
              {
                key: "handleReactSelectChange",
                value: function(e, t) {
                  this.setState(
                    re(
                      re({}, this.state),
                      {},
                      { task: re(re({}, this.state.task), {}, k()({}, t, e)) }
                    )
                  );
                }
              },
              {
                key: "handleInputChangeTime",
                value: function(e, t) {
                  this.setState(
                    re(
                      re({}, this.state),
                      {},
                      { task: re(re({}, this.state.task), {}, k()({}, t, e)) }
                    )
                  );
                }
              },
              {
                key: "handleInputChangeDate",
                value: function(e, t) {
                  this.setState(
                    re(
                      re({}, this.state),
                      {},
                      { task: re(re({}, this.state.task), {}, k()({}, t, e)) }
                    )
                  );
                }
              },
              {
                key: "handleSubmit",
                value: function(e) {
                  var t = this;
                  e.preventDefault();
                  var a = this.state.task,
                    n = {},
                    r = !1;
                  B.a.isEmpty(a.note) && ((n.note = !0), (r = !0)),
                    B.a.isEmpty(a.responsible.toString()) &&
                      ((n.responsible = !0), (r = !0)),
                    a.responsible.search("user") >= 0 &&
                      ((a.responsibleUserId = a.responsible.replace(
                        "user",
                        ""
                      )),
                      (a.responsibleTeamId = "")),
                    a.responsible.search("team") >= 0 &&
                      ((a.responsibleUserId = ""),
                      (a.responsibleTeamId = a.responsible.replace(
                        "team",
                        ""
                      ))),
                    this.setState(re(re({}, this.state), {}, { errors: n })),
                    !r &&
                      I.a.updateTask(a).then(function(e) {
                        t.props.updateTask(e.data.data), t.props.switchToView();
                      });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.task,
                    t = e.note,
                    a = e.typeId,
                    n = e.contactId,
                    r = e.finished,
                    s = e.dateFinished,
                    o = e.finishedById,
                    i = e.datePlannedStart,
                    l = e.datePlannedFinish,
                    c = e.startTimePlanned,
                    u = e.endTimePlanned,
                    m = e.responsible;
                  return h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(q.a, {
                        label: "Type taak",
                        size: "col-sm-6",
                        name: "typeId",
                        options: this.props.taskTypes,
                        value: a,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(Y.a, {
                        label: "Taak / notitie",
                        name: "note",
                        value: t,
                        onChangeAction: this.handleInputChange,
                        required: "required",
                        error: this.state.errors.note
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row margin-20-top" },
                      h.a.createElement(F.a, {
                        label: "Datum afhandelen",
                        size: "col-sm-6",
                        name: "datePlannedStart",
                        value: i,
                        onChangeAction: this.handleInputChangeDate
                      }),
                      h.a.createElement(U.a, {
                        label: "Begin tijd",
                        name: "startTimePlanned",
                        value: c,
                        onChangeAction: this.handleInputChangeTime
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(F.a, {
                        label: "Einddatum",
                        size: "col-sm-6",
                        name: "datePlannedFinish",
                        value: l,
                        onChangeAction: this.handleInputChangeDate
                      }),
                      h.a.createElement(U.a, {
                        label: "Eind tijd",
                        name: "endTimePlanned",
                        value: u,
                        onChangeAction: this.handleInputChangeTime
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(J.a, {
                        label: "Afgehandeld?",
                        name: "finished",
                        value: r,
                        onChangeAction: this.handleInputChange
                      }),
                      h.a.createElement(Z.a, {
                        label: "Verantwoordelijke",
                        size: "col-sm-6",
                        name: "responsible",
                        optionsInGroups: [
                          {
                            name: "user",
                            label: "Gebruikers",
                            options: this.props.users,
                            optionName: "fullName"
                          },
                          {
                            name: "team",
                            label: "Teams",
                            options: this.props.teams
                          }
                        ],
                        value: m,
                        onChangeAction: this.handleInputChange,
                        required: "required",
                        error: this.state.errors.responsible
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(F.a, {
                        label: "Datum gereed",
                        name: "dateFinished",
                        value: s,
                        onChangeAction: this.handleInputChangeDate
                      }),
                      h.a.createElement(q.a, {
                        label: "Afgerond door",
                        name: "finishedById",
                        options: this.props.users,
                        value: o,
                        onChangeAction: this.handleInputChange,
                        optionName: "fullName"
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row margin-20-top" },
                      h.a.createElement(K.a, {
                        label: "Contact",
                        name: "contactId",
                        options: this.state.contacts,
                        value: n,
                        onChangeAction: this.handleReactSelectChange,
                        optionName: "fullName",
                        multi: !1,
                        isLoading: this.state.peekLoading.contacts
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "margin-10-top" },
                      h.a.createElement(
                        X.a,
                        null,
                        h.a.createElement(
                          "div",
                          {
                            className: "row",
                            onClick: this.props.toggleExtraConnections
                          },
                          this.props.showExtraConnections
                            ? h.a.createElement("span", {
                                className: "glyphicon glyphicon-menu-down"
                              })
                            : h.a.createElement("span", {
                                className: "glyphicon glyphicon-menu-right"
                              }),
                          h.a.createElement(
                            "span",
                            { className: "h5" },
                            "Overige koppelingen"
                          )
                        )
                      ),
                      this.props.showExtraConnections &&
                        h.a.createElement(_, {
                          task: this.state.task,
                          intakes: this.state.intakes,
                          contactGroups: this.state.contactGroups,
                          opportunities: this.state.opportunities,
                          campaigns: this.state.campaigns,
                          housingFiles: this.state.housingFiles,
                          projects: this.state.projects,
                          participants: this.state.participants,
                          orders: this.state.orders,
                          invoices: this.state.invoices,
                          handleReactSelectChange: this.handleReactSelectChange,
                          peekLoading: this.state.peekLoading
                        })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "panel-footer" },
                      h.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        h.a.createElement(z.a, {
                          buttonClassName: "btn-default",
                          buttonText: "Sluiten",
                          onClickAction: this.props.switchToView
                        }),
                        h.a.createElement(z.a, {
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
        })(d.Component),
        ie = Object(f.b)(
          function(e) {
            return {
              taskDetails: e.taskDetails,
              meDetails: e.meDetails,
              permissions: e.systemData.permissions,
              taskTypes: e.systemData.taskTypes,
              teams: e.systemData.teams,
              users: e.systemData.users
            };
          },
          function(e) {
            return {
              updateTask: function(t) {
                e(Object(v.c)(t));
              }
            };
          }
        )(oe),
        le = a(695),
        ce = Object(f.b)(function(e) {
          return { taskDetails: e.taskDetails };
        })(function(e) {
          var t = e.taskDetails,
            a = t.note,
            n = t.type,
            r = t.contact,
            s = t.finished,
            o = t.intakeId,
            i = t.intakeName,
            l = t.contactGroup,
            c = t.order,
            u = t.invoice,
            m = t.campaign,
            p = t.housingFile,
            d = t.project,
            f = t.participant,
            g = t.datePlannedStart,
            v = t.datePlannedFinish,
            b = t.startTimePlanned,
            E = t.endTimePlanned,
            y = t.dateFinished,
            k = t.dateSentWfCompletedTask,
            N = t.dateSentWfExpiredTask,
            w = t.responsibleUser,
            C = t.responsibleTeam,
            D = t.finishedBy,
            S = t.opportunityId,
            I = t.opportunityName;
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { onClick: e.switchToEdit },
              h.a.createElement(
                "div",
                { className: "row" },
                h.a.createElement(le.a, { label: "Type", value: n && n.name })
              ),
              h.a.createElement(
                "div",
                { className: "row" },
                h.a.createElement(
                  "div",
                  { className: "col-sm-3" },
                  h.a.createElement(
                    "label",
                    { htmlFor: "description", className: "col-sm-12" },
                    "Taak / notitie"
                  )
                ),
                h.a.createElement(
                  "div",
                  { className: "col-sm-9", id: "description" },
                  a
                )
              ),
              h.a.createElement(
                "div",
                { className: "row margin-20-top" },
                h.a.createElement(le.a, {
                  label: "Datum afhandelen",
                  value: g && A()(g).format("L")
                }),
                h.a.createElement(le.a, {
                  label: "Start tijd",
                  value: b && A()("1900-01-01 " + b).format("HH:mm")
                })
              ),
              h.a.createElement(
                "div",
                { className: "row" },
                h.a.createElement(le.a, {
                  label: "Einddatum",
                  value: v && A()(v).format("L")
                }),
                h.a.createElement(le.a, {
                  label: "Eind tijd",
                  value: E && A()("1900-01-01 " + E).format("HH:mm")
                })
              ),
              h.a.createElement(
                "div",
                { className: "row" },
                h.a.createElement(le.a, {
                  label: "Afgehandeld?",
                  value: s ? "Ja" : "Nee"
                }),
                h.a.createElement(le.a, {
                  label: "Verantwoordelijke",
                  value: w ? w.fullName : C.name,
                  link: w ? "gebruiker/" + w.id : "team/" + C.id
                })
              ),
              h.a.createElement(
                "div",
                { className: "row" },
                h.a.createElement(le.a, {
                  label: "Datum gereed",
                  value: y && A()(y).format("L")
                }),
                h.a.createElement(le.a, {
                  label: "Afgerond door",
                  value: D && D.fullName,
                  link: D ? "gebruiker/" + D.id : ""
                })
              ),
              h.a.createElement(
                "div",
                { className: "row" },
                n && n.usesWfCompletedTask
                  ? h.a.createElement(le.a, {
                      label: "Email taak afgehandeld verzonden",
                      value: k ? A()(k).format("L HH:mm") : ""
                    })
                  : "",
                n && n.usesWfExpiredTask
                  ? h.a.createElement(le.a, {
                      label: "Email taak verlopen verzonden",
                      value: N ? A()(N).format("L HH:mm") : ""
                    })
                  : ""
              ),
              h.a.createElement(
                "div",
                { className: "row margin-20-top" },
                h.a.createElement(le.a, {
                  label: "Contact",
                  value: r && r.fullName,
                  link: r ? "contact/" + r.id : ""
                })
              )
            ),
            h.a.createElement(
              "div",
              { className: "margin-10-top" },
              h.a.createElement(
                X.a,
                null,
                h.a.createElement(
                  "div",
                  { className: "row", onClick: e.toggleExtraConnections },
                  e.showExtraConnections
                    ? h.a.createElement("span", {
                        className: "glyphicon glyphicon-menu-down"
                      })
                    : h.a.createElement("span", {
                        className: "glyphicon glyphicon-menu-right"
                      }),
                  h.a.createElement(
                    "span",
                    { className: "h5" },
                    "Overige koppelingen"
                  )
                )
              ),
              e.showExtraConnections &&
                h.a.createElement(
                  "div",
                  null,
                  h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(le.a, {
                      label: "Campagne",
                      value: m && m.name,
                      link: m ? "campagne/" + m.id : ""
                    }),
                    h.a.createElement(le.a, {
                      label: "Intake",
                      value: i,
                      link: o ? "intake/" + o : ""
                    })
                  ),
                  h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(le.a, {
                      label: "Groep",
                      value: l && l.name,
                      link: l ? "contact-groep/" + l.id : ""
                    }),
                    h.a.createElement(le.a, {
                      label: "Kans",
                      value: I,
                      link: S ? "kans/" + S : ""
                    })
                  ),
                  h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(le.a, {
                      label: "Woningdossier",
                      value: p && p.id,
                      link: p ? "woningdossier/" + p.id : ""
                    }),
                    h.a.createElement(le.a, {
                      label: "Project",
                      value: d && d.name,
                      link: d ? "project/" + d.id : ""
                    })
                  ),
                  h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(le.a, {
                      label: "Participant project",
                      value: f && f.name,
                      link: f ? "project/deelnemer/" + f.id : ""
                    }),
                    h.a.createElement(le.a, {
                      label: "Order",
                      value: c && c.name,
                      link: c ? "order/" + c.id : ""
                    })
                  ),
                  h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(le.a, {
                      label: "Nota",
                      value: u && u.name,
                      link: u ? "nota/" + u.id : ""
                    })
                  )
                )
            )
          );
        });
      function ue(e) {
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
          return u()(this, a);
        };
      }
      var me = (function(e) {
          l()(a, e);
          var t = ue(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              ((n = t.call(this, e)).state = {
                showEdit: !1,
                activeDiv: "",
                showExtraConnections: !1
              }),
              (n.switchToEdit = n.switchToEdit.bind(E()(n))),
              (n.switchToView = n.switchToView.bind(E()(n))),
              (n.toggleExtraConnections = n.toggleExtraConnections.bind(
                E()(n)
              )),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "switchToEdit",
                value: function() {
                  this.setState({ showEdit: !0 });
                }
              },
              {
                key: "switchToView",
                value: function() {
                  this.setState({ showEdit: !1, activeDiv: "" });
                }
              },
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
                key: "toggleExtraConnections",
                value: function() {
                  this.setState({
                    showExtraConnections: !this.state.showExtraConnections
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this;
                  return h.a.createElement(
                    g.a,
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
                      S.a,
                      null,
                      h.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        this.state.showEdit && this.props.permissions.manageTask
                          ? h.a.createElement(ie, {
                              switchToView: this.switchToView,
                              toggleExtraConnections: this
                                .toggleExtraConnections,
                              showExtraConnections: this.state
                                .showExtraConnections
                            })
                          : h.a.createElement(ce, {
                              switchToEdit: this.switchToEdit,
                              toggleExtraConnections: this
                                .toggleExtraConnections,
                              showExtraConnections: this.state
                                .showExtraConnections
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
        pe = Object(f.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(me),
        de = Object(f.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(function(e) {
          var t = e.property,
            a = t.value,
            n = t.property;
          return h.a.createElement(
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
            h.a.createElement(
              "div",
              { onClick: e.openEdit },
              h.a.createElement("div", { className: "col-sm-6" }, n.name),
              h.a.createElement("div", { className: "col-sm-5" }, a)
            ),
            h.a.createElement(
              "div",
              { className: "col-sm-1" },
              e.showActionButtons && e.permissions.manageTask
                ? h.a.createElement(
                    "a",
                    { role: "button", onClick: e.openEdit },
                    h.a.createElement("span", {
                      className: "glyphicon glyphicon-pencil mybtn-success"
                    }),
                    " "
                  )
                : ""
            )
          );
        }),
        he = a(694);
      function fe(e, t) {
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
      function ge(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? fe(Object(a), !0).forEach(function(t) {
                k()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : fe(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function ve(e) {
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
          return u()(this, a);
        };
      }
      var be = (function(e) {
          l()(a, e);
          var t = ve(a);
          function a(e) {
            var n;
            r()(this, a),
              (n = t.call(this, e)),
              k()(E()(n), "handleInputPropertyChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name,
                  s = t[t.selectedIndex].innerHTML;
                n.setState(
                  ge(
                    ge({}, n.state),
                    {},
                    {
                      property: ge(ge({}, n.state.property), {}, k()({}, r, a))
                    }
                  )
                ),
                  n.props.setPropertyIdAndName(a, s);
              }),
              k()(E()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.props.property,
                  a = !1;
                "" == t.value && "" == t.propertyId
                  ? ((a = !0),
                    n.setState(
                      ge(
                        ge({}, n.state),
                        {},
                        {
                          errors: ge(
                            ge({}, n.state.errors),
                            {},
                            { value: !0, propertyId: !0 }
                          )
                        }
                      )
                    ))
                  : "" == t.value && "" != t.propertyId
                  ? ((a = !0),
                    n.setState(
                      ge(
                        ge({}, n.state),
                        {},
                        {
                          errors: ge(
                            ge({}, n.state.errors),
                            {},
                            { value: !0, propertyId: !1 }
                          )
                        }
                      )
                    ))
                  : "" != t.value && "" == t.propertyId
                  ? ((a = !0),
                    n.setState(
                      ge(
                        ge({}, n.state),
                        {},
                        {
                          errors: ge(
                            ge({}, n.state.errors),
                            {},
                            { value: !1, propertyId: !0 }
                          )
                        }
                      )
                    ))
                  : "" != t.value &&
                    "" != t.propertyId &&
                    ((a = !1),
                    n.setState(
                      ge(
                        ge({}, n.state),
                        {},
                        {
                          errors: ge(
                            ge({}, n.state.errors),
                            {},
                            { value: !1, propertyId: !1 }
                          )
                        }
                      )
                    )),
                  a || n.props.handleSubmit();
              });
            var s = e.property,
              o = s.id,
              i = s.value;
            return (
              (n.state = {
                property: { propertyId: o, value: i },
                errors: { property: !1, value: !1 }
              }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.props.property,
                    t = e.propertyId,
                    a = e.value;
                  return h.a.createElement(
                    "div",
                    null,
                    h.a.createElement(
                      "form",
                      {
                        className: "form-horizontal",
                        onSubmit: this.handleSubmit
                      },
                      h.a.createElement(
                        g.a,
                        { className: "panel-grey" },
                        h.a.createElement(
                          S.a,
                          null,
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(q.a, {
                              label: "Kenmerk",
                              size: "col-sm-6",
                              name: "propertyId",
                              options: this.props.properties,
                              value: t,
                              onChangeAction: this.handleInputPropertyChange,
                              required: "required",
                              error: this.state.errors.propertyId
                            }),
                            h.a.createElement(he.a, {
                              label: "Waarde",
                              name: "value",
                              value: a,
                              onChangeAction: this.props.handleInputChange,
                              required: "required",
                              error: this.state.errors.value
                            })
                          ),
                          h.a.createElement(
                            "div",
                            {
                              className: "pull-right btn-group",
                              role: "group"
                            },
                            h.a.createElement(z.a, {
                              buttonClassName: "btn-default",
                              buttonText: "Annuleren",
                              onClickAction: this.props.cancelEdit
                            }),
                            h.a.createElement(z.a, {
                              buttonText: "Opslaan",
                              onClickAction: this.handleSubmit,
                              type: "submit",
                              value: "Submit"
                            })
                          )
                        )
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        Ee = Object(f.b)(function(e) {
          return { properties: e.systemData.taskProperties };
        })(be);
      function ye(e, t) {
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
      function ke(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ye(Object(a), !0).forEach(function(t) {
                k()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : ye(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
            n = p()(e);
          if (t) {
            var r = p()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var we = (function(e) {
          l()(a, e);
          var t = Ne(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              k()(E()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              k()(E()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              k()(E()(n), "openEdit", function() {
                n.props.permissions.manageTask && n.setState({ showEdit: !0 });
              }),
              k()(E()(n), "closeEdit", function() {
                n.setState({ showEdit: !1 });
              }),
              k()(E()(n), "cancelEdit", function() {
                n.setState(
                  ke(
                    ke({}, n.state),
                    {},
                    { property: ke({}, n.props.property) }
                  )
                ),
                  n.closeEdit();
              }),
              k()(E()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  ke(
                    ke({}, n.state),
                    {},
                    {
                      property: ke(ke({}, n.state.property), {}, k()({}, r, a))
                    }
                  )
                );
              }),
              k()(E()(n), "setPropertyIdAndName", function(e, t) {
                n.setState(
                  ke(
                    ke({}, n.state),
                    {},
                    {
                      property: ke(
                        ke({}, n.state.property),
                        {},
                        {
                          propertyId: e,
                          property: ke(
                            ke({}, n.state.property),
                            {},
                            { id: e, name: t }
                          )
                        }
                      )
                    }
                  )
                );
              }),
              k()(E()(n), "handleSubmit", function() {
                var e = n.state.property;
                I.a.updateTaskProperty(e.id, e).then(function() {
                  n.closeEdit();
                });
              }),
              (n.state = {
                showActionButtons: !1,
                highlightLine: "",
                showEdit: !1,
                property: ke({}, e.property)
              }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    "div",
                    null,
                    h.a.createElement(de, {
                      property: this.state.property,
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      openEdit: this.openEdit,
                      updateTaskProperty: this.state.property
                    }),
                    this.state.showEdit &&
                      h.a.createElement(Ee, {
                        property: this.state.property,
                        handleSubmit: this.handleSubmit,
                        cancelEdit: this.cancelEdit,
                        handleInputChange: this.handleInputChange,
                        setPropertyIdAndName: this.setPropertyIdAndName
                      })
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        Ce = Object(f.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(we),
        De = Object(f.b)(function(e) {
          return { properties: e.taskDetails.properties };
        })(function(e) {
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "row border header" },
              h.a.createElement("div", { className: "col-sm-6" }, "Kenmerk"),
              h.a.createElement("div", { className: "col-sm-5" }, "Waarde"),
              h.a.createElement("div", { className: "col-sm-1" })
            ),
            e.properties.length > 0
              ? e.properties.map(function(e) {
                  return h.a.createElement(Ce, { key: e.id, property: e });
                })
              : h.a.createElement("div", null, "Geen extra kenmerken bekend.")
          );
        });
      function Se(e, t) {
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
      function Ie(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Se(Object(a), !0).forEach(function(t) {
                k()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Se(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Oe(e) {
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
          return u()(this, a);
        };
      }
      var Le = (function(e) {
          l()(a, e);
          var t = Oe(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              k()(E()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Ie(
                    Ie({}, n.state),
                    {},
                    {
                      property: Ie(Ie({}, n.state.property), {}, k()({}, r, a))
                    }
                  )
                );
              }),
              k()(E()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.property,
                  a = !1;
                "" == t.value && "" == t.propertyId
                  ? ((a = !0),
                    n.setState(
                      Ie(
                        Ie({}, n.state),
                        {},
                        {
                          errors: Ie(
                            Ie({}, n.state.errors),
                            {},
                            { value: !0, propertyId: !0 }
                          )
                        }
                      )
                    ))
                  : "" == t.value && "" != t.propertyId
                  ? ((a = !0),
                    n.setState(
                      Ie(
                        Ie({}, n.state),
                        {},
                        {
                          errors: Ie(
                            Ie({}, n.state.errors),
                            {},
                            { value: !0, propertyId: !1 }
                          )
                        }
                      )
                    ))
                  : "" != t.value && "" == t.propertyId
                  ? ((a = !0),
                    n.setState(
                      Ie(
                        Ie({}, n.state),
                        {},
                        {
                          errors: Ie(
                            Ie({}, n.state.errors),
                            {},
                            { value: !1, propertyId: !0 }
                          )
                        }
                      )
                    ))
                  : "" != t.value &&
                    "" != t.propertyId &&
                    ((a = !1),
                    n.setState(
                      Ie(
                        Ie({}, n.state),
                        {},
                        {
                          errors: Ie(
                            Ie({}, n.state.errors),
                            {},
                            { value: !1, propertyId: !1 }
                          )
                        }
                      )
                    )),
                  a ||
                    I.a.storeTaskProperty(n.props.taskId, t).then(function() {
                      n.props.fetchTaskDetails(n.props.taskId),
                        n.props.toggleShowNew();
                    });
              }),
              (n.state = {
                property: { propertyId: "", value: "" },
                errors: { propertyId: !1, value: !1 }
              }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.property,
                    t = e.propertyId,
                    a = e.value;
                  return h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      g.a,
                      { className: "panel-grey" },
                      h.a.createElement(
                        S.a,
                        null,
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(q.a, {
                            label: "Kenmerk",
                            size: "col-sm-6",
                            name: "propertyId",
                            options: this.props.properties,
                            value: t,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.propertyId
                          }),
                          h.a.createElement(he.a, {
                            label: "Waarde",
                            name: "value",
                            value: a,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.value
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          h.a.createElement(z.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          h.a.createElement(z.a, {
                            buttonText: "Opslaan",
                            onClickAction: this.handleSubmit,
                            type: "submit",
                            value: "Submit"
                          })
                        )
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        Te = Object(f.b)(
          function(e) {
            return {
              taskId: e.taskDetails.id,
              properties: e.systemData.taskProperties
            };
          },
          function(e) {
            return {
              fetchTaskDetails: function(t) {
                e(Object(v.b)(t));
              }
            };
          }
        )(Le);
      function je(e) {
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
          return u()(this, a);
        };
      }
      var Pe = (function(e) {
          l()(a, e);
          var t = je(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              k()(E()(n), "toggleShowNew", function() {
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
                  return h.a.createElement(
                    g.a,
                    null,
                    h.a.createElement(
                      X.a,
                      null,
                      h.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Extra kenmerken"
                      ),
                      this.props.permissions.manageTask &&
                        h.a.createElement(
                          "a",
                          {
                            role: "button",
                            className: "pull-right",
                            onClick: this.toggleShowNew
                          },
                          h.a.createElement("span", {
                            className: "glyphicon glyphicon-plus"
                          })
                        )
                    ),
                    h.a.createElement(
                      S.a,
                      null,
                      h.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        h.a.createElement(De, null)
                      ),
                      h.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          h.a.createElement(Te, {
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
        Re = Object(f.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(Pe);
      A.a.locale("nl");
      var Ae = Object(f.b)(function(e) {
          return { taskDetails: e.taskDetails };
        })(function(e) {
          var t = e.taskDetails,
            a = t.createdAt,
            n = t.updatedAt,
            r = t.updatedBy,
            s = t.createdBy;
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(le.a, {
                label: "Gemaakt door",
                value: s ? s.fullName : "Onbekend",
                link: s ? "gebruiker/" + s.id : ""
              }),
              h.a.createElement(le.a, {
                label: "Laatste update door",
                value: r ? r.fullName : "Onbekend",
                link: r ? "gebruiker/" + r.id : ""
              })
            ),
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(le.a, {
                label: "Gemaakt op",
                value: a ? A()(a).format("L") : "Onbekend"
              }),
              h.a.createElement(le.a, {
                label: "Laatste update op",
                value: n ? A()(n).format("L") : "Onbekend"
              })
            )
          );
        }),
        xe = function(e) {
          return h.a.createElement(
            g.a,
            null,
            h.a.createElement(
              X.a,
              null,
              h.a.createElement(
                "span",
                { className: "h5 text-bold" },
                "Afsluiting gegevens"
              )
            ),
            h.a.createElement(
              S.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-md-12" },
                h.a.createElement(Ae, null)
              )
            )
          );
        };
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
            n = p()(e);
          if (t) {
            var r = p()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var qe = (function(e) {
          l()(a, e);
          var t = ze(a);
          function a(e) {
            return r()(this, a), t.call(this, e);
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  var e = "",
                    t = !0;
                  return (
                    this.props.hasError
                      ? (e = "Fout bij het ophalen van gegevens.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : Object(P.isEmpty)(this.props.taskDetails)
                      ? (e = "Geen gegevens gevonden!")
                      : (t = !1),
                    t
                      ? h.a.createElement("div", null, e)
                      : h.a.createElement(
                          "div",
                          null,
                          h.a.createElement(pe, null),
                          h.a.createElement(Re, null),
                          h.a.createElement(xe, null)
                        )
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        Fe = Object(f.b)(function(e) {
          return {
            taskDetails: e.taskDetails,
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        }, null)(qe);
      function Me(e) {
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
          return u()(this, a);
        };
      }
      var Be = (function(e) {
          l()(a, e);
          var t = Me(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              k()(E()(n), "openItem", function(e) {
                N.f.push("/taak/".concat(e));
              }),
              (n.state = { relatedTasks: "" }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedTasks;
                  return h.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      h.a.createElement("div", null, "Geen taken gevonden."),
                    "" != t &&
                      h.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        h.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return h.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: a
                              },
                              h.a.createElement(
                                "td",
                                { className: "col-xs-12 clickable" },
                                A()(t.createdAt).format("L"),
                                " - ",
                                t.noteSummary
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
        Ge = Object(f.b)(function(e) {
          return { relatedTasks: e.taskDetails.relatedTasks };
        })(Be),
        Ve = Object(f.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showTasksList,
            n = e.taskCount;
          e.permissions;
          return h.a.createElement(
            g.a,
            { className: "harmonica-button" },
            h.a.createElement(
              S.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-sm-12", onClick: t, role: "button" },
                h.a.createElement(
                  "span",
                  { className: "" },
                  "OPEN TAKEN ",
                  h.a.createElement("span", { className: "badge" }, n)
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && h.a.createElement(Ge, null)
              )
            )
          );
        });
      function He(e) {
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
          return u()(this, a);
        };
      }
      var We = (function(e) {
          l()(a, e);
          var t = He(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              k()(E()(n), "openItem", function(e) {
                N.f.push("/taak/".concat(e));
              }),
              (n.state = { relatedNotes: "" }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedNotes;
                  return h.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      h.a.createElement("div", null, "Geen notities gevonden."),
                    "" != t &&
                      h.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        h.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return h.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: a
                              },
                              h.a.createElement(
                                "td",
                                { className: "col-xs-12 clickable" },
                                A()(t.createdAt).format("L"),
                                " - ",
                                t.noteSummary
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
        Ke = Object(f.b)(function(e) {
          return { relatedNotes: e.taskDetails.relatedNotes };
        })(We),
        Ue = Object(f.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showNotesList,
            n = e.noteCount;
          e.permissions;
          return h.a.createElement(
            g.a,
            { className: "harmonica-button" },
            h.a.createElement(
              S.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-sm-12", onClick: t, role: "button" },
                h.a.createElement(
                  "span",
                  { className: "" },
                  "NOTITIES ",
                  h.a.createElement("span", { className: "badge" }, n)
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && h.a.createElement(Ke, null)
              )
            )
          );
        });
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
            n = p()(e);
          if (t) {
            var r = p()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var Ye = (function(e) {
          l()(a, e);
          var t = _e(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              k()(E()(n), "openItem", function(e) {
                N.f.push("/email/".concat(e));
              }),
              (n.state = { relatedOpportunities: "" }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedEmailsInbox;
                  return h.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      h.a.createElement("div", null, "Geen e-mails gevonden."),
                    "" != t &&
                      h.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        h.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return h.a.createElement(
                              "tr",
                              { key: a },
                              h.a.createElement(
                                "td",
                                {
                                  className: "col-xs-4 clickable",
                                  onClick: function() {
                                    return e.openItem(t.id);
                                  }
                                },
                                A()(t.date_sent).format("L")
                              ),
                              h.a.createElement(
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
        })(d.Component),
        Je = Object(f.b)(function(e) {
          return { relatedEmailsInbox: e.taskDetails.relatedEmailsInbox };
        })(Ye),
        Xe = function(e) {
          var t = e.toggleShowList,
            a = e.showEmailsInboxList,
            n = e.newEmail,
            r = e.emailInboxCount;
          return h.a.createElement(
            g.a,
            { className: "harmonica-button" },
            h.a.createElement(
              S.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                h.a.createElement(
                  "span",
                  { onClick: t, role: "button", className: "" },
                  "E-MAIL INBOX ",
                  h.a.createElement("span", { className: "badge" }, r)
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-2" },
                h.a.createElement(
                  "a",
                  { role: "button", className: "pull-right", onClick: n },
                  h.a.createElement("span", {
                    className: "glyphicon glyphicon-plus glyphicon-white"
                  })
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && h.a.createElement(Je, null)
              )
            )
          );
        };
      function Ze(e) {
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
          return u()(this, a);
        };
      }
      var Qe = (function(e) {
          l()(a, e);
          var t = Ze(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              k()(E()(n), "openItem", function(e) {
                N.f.push("/email/".concat(e));
              }),
              (n.state = { relatedOpportunities: "" }),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedEmailsSent;
                  return h.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      h.a.createElement("div", null, "Geen e-mails gevonden."),
                    "" != t &&
                      h.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        h.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return h.a.createElement(
                              "tr",
                              { key: a },
                              h.a.createElement(
                                "td",
                                {
                                  className: "col-xs-4 clickable",
                                  onClick: function() {
                                    return e.openItem(t.id);
                                  }
                                },
                                A()(t.date_sent).format("L")
                              ),
                              h.a.createElement(
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
        })(d.Component),
        $e = Object(f.b)(function(e) {
          return { relatedEmailsSent: e.taskDetails.relatedEmailsSent };
        })(Qe),
        et = function(e) {
          var t = e.toggleShowList,
            a = e.showEmailsSentList,
            n = e.newEmail,
            r = e.emailSentCount;
          return h.a.createElement(
            g.a,
            { className: "harmonica-button" },
            h.a.createElement(
              S.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                h.a.createElement(
                  "span",
                  { onClick: t, className: "" },
                  "E-MAIL VERZONDEN ",
                  h.a.createElement("span", { className: "badge" }, r)
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-2" },
                h.a.createElement(
                  "a",
                  { role: "button", className: "pull-right", onClick: n },
                  h.a.createElement("span", {
                    className: "glyphicon glyphicon-plus glyphicon-white"
                  })
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && h.a.createElement($e, null)
              )
            )
          );
        };
      function tt(e) {
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
          return u()(this, a);
        };
      }
      var at = (function(e) {
          l()(a, e);
          var t = tt(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              k()(E()(n), "openItem", function(e) {
                N.f.push("/document/".concat(e));
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
                  return h.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      h.a.createElement(
                        "div",
                        null,
                        "Geen documenten gevonden."
                      ),
                    "" != t &&
                      h.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        h.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return h.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: a
                              },
                              h.a.createElement(
                                "td",
                                { className: "col-xs-5 clickable" },
                                A()(t.createdAt).format("L")
                              ),
                              h.a.createElement(
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
        nt = Object(f.b)(function(e) {
          return { relatedDocuments: e.taskDetails.relatedDocuments };
        })(at),
        rt = Object(f.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showDocumentsList,
            n = e.newDocument,
            r = e.documentCount,
            s = e.permissions;
          return h.a.createElement(
            g.a,
            { className: "harmonica-button" },
            h.a.createElement(
              S.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                h.a.createElement(
                  "span",
                  null,
                  "DOCUMENTEN ",
                  h.a.createElement("span", { className: "badge" }, r)
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-2" },
                s.createDocument &&
                  h.a.createElement(
                    "div",
                    { className: "pull-right" },
                    h.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white",
                      "data-toggle": "dropdown",
                      role: "button"
                    }),
                    h.a.createElement(
                      "ul",
                      { className: "dropdown-menu" },
                      h.a.createElement(
                        "li",
                        null,
                        h.a.createElement(
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
                      h.a.createElement(
                        "li",
                        null,
                        h.a.createElement(
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
              h.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && h.a.createElement(nt, null)
              )
            )
          );
        });
      function st(e, t) {
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
      function ot(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? st(Object(a), !0).forEach(function(t) {
                k()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : st(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function it(e) {
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
          return u()(this, a);
        };
      }
      var lt = (function(e) {
          l()(a, e);
          var t = it(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              k()(E()(n), "newEmail", function() {
                N.f.push("/email/nieuw");
              }),
              k()(E()(n), "newDocument", function(e) {
                N.f.push(
                  "/document/nieuw/"
                    .concat(e, "/taak/")
                    .concat(n.props.taskDetails.id)
                );
              }),
              (n.state = {
                toggleShowList: {
                  tasks: !1,
                  notes: !1,
                  emailsInbox: !1,
                  emailsSent: !1,
                  documents: !1
                }
              }),
              (n.toggleShowList = n.toggleShowList.bind(E()(n))),
              n
            );
          }
          return (
            o()(a, [
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  this.props.id !== e.id &&
                    this.setState({
                      toggleShowList: {
                        tasks: !1,
                        notes: !1,
                        emailsInbox: !1,
                        emailsSent: !1,
                        documents: !1
                      }
                    });
                }
              },
              {
                key: "toggleShowList",
                value: function(e) {
                  this.setState(
                    ot(
                      ot({}, this.state),
                      {},
                      {
                        toggleShowList: ot(
                          ot({}, this.state.toggleShowList),
                          {},
                          k()({}, e, !this.state.toggleShowList[e])
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
                  return h.a.createElement(
                    "div",
                    { className: "margin-10-top" },
                    h.a.createElement(Ve, {
                      toggleShowList: function() {
                        return e.toggleShowList("tasks");
                      },
                      showTasksList: this.state.toggleShowList.tasks,
                      taskCount: this.props.taskDetails.taskCount
                    }),
                    h.a.createElement(Ue, {
                      toggleShowList: function() {
                        return e.toggleShowList("notes");
                      },
                      showNotesList: this.state.toggleShowList.notes,
                      noteCount: this.props.taskDetails.noteCount
                    }),
                    h.a.createElement(Xe, {
                      toggleShowList: function() {
                        return e.toggleShowList("emailsInbox");
                      },
                      showEmailsInboxList: this.state.toggleShowList
                        .emailsInbox,
                      newEmail: this.newEmail,
                      emailInboxCount: this.props.taskDetails.emailInboxCount
                    }),
                    h.a.createElement(et, {
                      toggleShowList: function() {
                        return e.toggleShowList("emailsSent");
                      },
                      showEmailsSentList: this.state.toggleShowList.emailsSent,
                      newEmail: this.newEmail,
                      emailSentCount: this.props.taskDetails.emailSentCount
                    }),
                    h.a.createElement(rt, {
                      toggleShowList: function() {
                        return e.toggleShowList("documents");
                      },
                      showDocumentsList: this.state.toggleShowList.documents,
                      newDocument: this.newDocument,
                      documentCount: this.props.taskDetails.documentCount
                    })
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        ct = Object(f.b)(function(e) {
          return {
            taskDetails: e.taskDetails,
            permissions: e.meDetails.permissions
          };
        }, null)(lt);
      function ut(e) {
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
          return u()(this, a);
        };
      }
      var mt = (function(e) {
        l()(a, e);
        var t = ut(a);
        function a(e) {
          return r()(this, a), t.call(this, e);
        }
        return (
          o()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchTaskDetails(this.props.params.id);
              }
            },
            {
              key: "componentWillReceiveProps",
              value: function(e) {
                this.props.params.id !== e.params.id &&
                  this.props.fetchTaskDetails(e.params.id);
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
                      { className: "col-md-12" },
                      h.a.createElement(j, null)
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      h.a.createElement(Fe, null)
                    )
                  ),
                  h.a.createElement(
                    g.a,
                    { className: "col-md-3 harmonica" },
                    h.a.createElement(S.a, null, h.a.createElement(ct, null))
                  )
                );
              }
            }
          ]),
          a
        );
      })(d.Component);
      t.default = Object(f.b)(null, function(e) {
        return {
          fetchTaskDetails: function(t) {
            e(Object(v.b)(t));
          }
        };
      })(mt);
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = function(e) {
          var t = e.children,
            a = e.className,
            n = e.onMouseEnter,
            s = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: s
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
          className: o.a.string,
          onMouseEnter: o.a.func,
          onMouseLeave: o.a.func
        }),
        (t.a = i);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
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
        (i.propTypes = { className: o.a.string }),
        (t.a = i);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            s = e.type,
            o = e.value,
            i = e.loading,
            l = e.loadText,
            c = e.disabled;
          return i
            ? r.a.createElement(
                "button",
                {
                  type: s,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: o,
                  disabled: i
                },
                r.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                l
              )
            : r.a.createElement(
                "button",
                {
                  type: s,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: o,
                  disabled: c
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
          buttonClassName: o.a.string,
          buttonText: o.a.string.isRequired,
          onClickAction: o.a.func,
          type: o.a.string,
          value: o.a.string,
          loading: o.a.bool,
          loadText: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = i);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            s = e.title,
            o = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: o,
              title: s
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
          buttonClassName: o.a.string,
          iconName: o.a.string.isRequired,
          onClickAction: o.a.func,
          title: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = i);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            s = e.size,
            o = e.id,
            i = e.placeholder,
            l = e.name,
            c = e.value,
            u = e.onClickAction,
            m = e.onChangeAction,
            p = e.onBlurAction,
            d = e.required,
            h = e.readOnly,
            f = e.maxLength,
            g = e.error,
            v = e.min,
            b = e.max,
            E = e.step,
            y = e.errorMessage,
            k = e.divSize,
            N = e.divClassName,
            w = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(k, " ").concat(N) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(d) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(s) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (g ? "has-error" : ""),
                id: o,
                placeholder: i,
                name: l,
                value: c,
                onClick: u,
                onChange: m,
                onBlur: p,
                readOnly: h,
                maxLength: f,
                min: v,
                max: b,
                autoComplete: w,
                step: E
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
                  y
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
        (t.a = i);
    },
    695: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(4),
        o = a(8),
        i = a.n(o),
        l = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            o = e.value,
            i = e.link,
            l = e.hidden;
          return i.length > 0
            ? r.a.createElement(
                "div",
                { className: a, style: l ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement(
                  "div",
                  { className: "col-sm-6", id: n, onClick: null },
                  r.a.createElement(
                    s.b,
                    { to: i, className: "link-underline" },
                    o
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: a, style: l ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement("div", { className: "col-sm-6", id: n }, o)
              );
        };
      (l.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (l.propTypes = {
          label: i.a.oneOfType([i.a.string, i.a.object]).isRequired,
          className: i.a.string,
          id: i.a.string,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          link: i.a.string,
          hidden: i.a.bool
        }),
        (t.a = l);
    },
    696: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = function(e) {
          var t = e.label,
            a = e.className,
            n = e.size,
            s = e.id,
            o = e.name,
            i = e.value,
            l = e.options,
            c = e.onChangeAction,
            u = e.onBlurAction,
            m = e.required,
            p = e.error,
            d = e.errorMessage,
            h = e.optionValue,
            f = e.optionName,
            g = e.readOnly,
            v = e.placeholder,
            b = e.divClassName,
            E = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(b) },
            r.a.createElement(
              "label",
              { htmlFor: s, className: "col-sm-6 ".concat(m) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-6" },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(a) + (p && " has-error"),
                  id: s,
                  name: o,
                  value: i,
                  onChange: c,
                  onBlur: u,
                  readOnly: g
                },
                E && r.a.createElement("option", { value: "" }, v),
                l.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[h], value: e[h] },
                    e[f]
                  );
                })
              )
            ),
            p &&
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
        (t.a = i);
    },
    698: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-heading ".concat(t) },
            a
          );
        };
      (i.defaultProps = { className: "" }),
        (i.propTypes = { className: o.a.string }),
        (t.a = i);
    },
    699: function(e, t, a) {
      "use strict";
      var n = a(24),
        r = a.n(n),
        s = a(25),
        o = a.n(s),
        i = a(22),
        l = a.n(i),
        c = a(26),
        u = a.n(c),
        m = a(27),
        p = a.n(m),
        d = a(16),
        h = a.n(d),
        f = a(6),
        g = a.n(f),
        v = a(0),
        b = a.n(v),
        E = a(8),
        y = a.n(E),
        k = a(707),
        N = a.n(k),
        w = a(708),
        C = a.n(w),
        D = a(7),
        S = a.n(D);
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
            n = h()(e);
          if (t) {
            var r = h()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return p()(this, a);
        };
      }
      S.a.locale("nl");
      var O = (function(e) {
        u()(a, e);
        var t = I(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            g()(l()(n), "validateDate", function(e) {
              var t = S()(e.target.value, "DD-MM-YYYY", !0),
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
            g()(l()(n), "onDateChange", function(e) {
              var t = e ? S()(e).format("Y-MM-DD") : "",
                a = !1;
              t &&
                n.props.disabledBefore &&
                S()(t).isBefore(n.props.disabledBefore) &&
                (a = !0),
                t &&
                  n.props.disabledAfter &&
                  S()(t).isAfter(n.props.disabledAfter) &&
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
                  s = e.id,
                  o = e.value,
                  i = e.required,
                  l = e.readOnly,
                  c = e.name,
                  u = e.error,
                  m = e.errorMessage,
                  p = e.disabledBefore,
                  d = e.disabledAfter,
                  h = o ? S()(o).format("L") : "",
                  f = {};
                return (
                  p && (f.before = new Date(p)),
                  d && (f.after = new Date(d)),
                  b.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    b.a.createElement(
                      "div",
                      null,
                      b.a.createElement(
                        "label",
                        { htmlFor: s, className: "col-sm-6 ".concat(i) },
                        t
                      )
                    ),
                    b.a.createElement(
                      "div",
                      { className: "".concat(n) },
                      b.a.createElement(N.a, {
                        id: s,
                        value: h,
                        formatDate: w.formatDate,
                        parseDate: w.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: C.a,
                          disabledDays: f
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
                          readOnly: l,
                          disabled: l
                        },
                        required: i,
                        readOnly: l,
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
      })(v.Component);
      (O.defaultProps = {
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
        (O.propTypes = {
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
        (t.a = O);
    },
    700: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = a(703),
        l = a.n(i),
        c = function(e) {
          var t = e.label,
            a = e.size,
            n = e.id,
            s = e.name,
            o = e.value,
            i = e.onChangeAction,
            c = e.required,
            u = e.divSize,
            m = e.className,
            p = e.disabled;
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
              r.a.createElement(l.a, {
                id: n,
                name: s,
                onChange: i,
                checked: o,
                disabled: p
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
        (t.a = c);
    },
    709: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = a(714),
        l =
          (a(715),
          function(e) {
            var t = e.label,
              a = e.divSize,
              n = e.size,
              s = e.id,
              o = e.name,
              l = e.value,
              c = e.options,
              u = e.optionId,
              m = e.optionName,
              p = e.onChangeAction,
              d = e.required,
              h = e.multi,
              f = e.error,
              g = e.isLoading;
            return r.a.createElement(
              "div",
              { className: "form-group ".concat(a) },
              r.a.createElement(
                "label",
                { htmlFor: s, className: "col-sm-6 ".concat(d) },
                t
              ),
              r.a.createElement(
                "div",
                { className: "".concat(n) },
                r.a.createElement(i.a, {
                  id: s,
                  name: o,
                  value: l,
                  onChange: function(e) {
                    p(e || "", o);
                  },
                  options: c,
                  valueKey: u,
                  labelKey: m,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: h,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: f ? " has-error" : "",
                  isLoading: g
                })
              )
            );
          });
      (l.defaultProps = {
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
        (l.propTypes = {
          label: o.a.string.isRequired,
          className: o.a.string,
          size: o.a.string,
          divSize: o.a.string,
          id: o.a.string,
          name: o.a.string.isRequired,
          options: o.a.array.isRequired,
          optionId: o.a.string,
          optionName: o.a.string,
          value: o.a.oneOfType([o.a.string, o.a.number]),
          onChangeAction: o.a.func,
          onBlurAction: o.a.func,
          required: o.a.string,
          readOnly: o.a.bool,
          error: o.a.bool,
          multi: o.a.bool,
          isLoading: o.a.bool
        }),
        (t.a = l);
    },
    734: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = function(e) {
          var t = e.label,
            a = e.size,
            n = e.sizeLabel,
            s = e.sizeInput,
            o = e.id,
            i = e.name,
            l = e.value,
            c = e.onChangeAction,
            u = e.required,
            m = e.error,
            p = e.rows;
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
                  { htmlFor: o, className: "col-sm-12 ".concat(u) },
                  t
                )
              ),
              r.a.createElement(
                "div",
                { className: s },
                r.a.createElement("textarea", {
                  name: i,
                  value: l,
                  onChange: c,
                  className: "form-control input-sm " + (m ? "has-error" : ""),
                  rows: p
                })
              )
            )
          );
        };
      (i.defaultProps = {
        size: "col-sm-12",
        sizeLabel: "col-sm-3",
        sizeInput: "col-sm-9",
        value: "",
        required: "",
        error: !1,
        rows: "5"
      }),
        (i.propTypes = {
          label: o.a.string.isRequired,
          type: o.a.string,
          size: o.a.string,
          sizeLabel: o.a.string,
          sizeInput: o.a.string,
          id: o.a.string,
          name: o.a.string.isRequired,
          value: o.a.oneOfType([o.a.string, o.a.number]),
          onChangeAction: o.a.func,
          required: o.a.string,
          error: o.a.bool
        }),
        (t.a = i);
    },
    746: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = function(e) {
          var t = e.label,
            a = e.className,
            n = e.size,
            s = e.divSize,
            o = e.id,
            i = e.name,
            l = e.value,
            c = e.optionsInGroups,
            u = e.onChangeAction,
            m = e.onBlurAction,
            p = e.required,
            d = e.error,
            h = e.readOnly;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(s) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(p) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(n) },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(a) + (d && " has-error"),
                  id: o,
                  name: i,
                  value: l,
                  onChange: u,
                  onBlur: m,
                  readOnly: h
                },
                r.a.createElement("option", { value: "" }),
                c.map(function(e, t) {
                  var a = e.optionName || "name";
                  return r.a.createElement(
                    "optgroup",
                    { key: t, label: e.label },
                    e.options.map(function(t) {
                      return r.a.createElement(
                        "option",
                        { key: t.id, value: e.name + t.id },
                        t[a]
                      );
                    })
                  );
                })
              )
            )
          );
        };
      (i.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        readOnly: !1,
        required: "",
        error: !1,
        value: ""
      }),
        (i.propTypes = {
          label: o.a.string.isRequired,
          className: o.a.string,
          size: o.a.string,
          divSize: o.a.string,
          id: o.a.string,
          name: o.a.string.isRequired,
          optionsInGroups: o.a.array,
          value: o.a.oneOfType([o.a.string, o.a.number]),
          onChangeAction: o.a.func,
          onBlurAction: o.a.func,
          required: o.a.string,
          readOnly: o.a.bool,
          error: o.a.bool,
          optionName: o.a.string
        }),
        (t.a = i);
    },
    785: function(e, t, a) {
      "use strict";
      a.d(t, "b", function() {
        return n;
      }),
        a.d(t, "c", function() {
          return r;
        }),
        a.d(t, "a", function() {
          return s;
        });
      var n = function(e) {
          return { type: "FETCH_TASK_DETAILS", id: e };
        },
        r = function(e) {
          return { type: "UPDATE_TASK_DETAILS", task: e };
        },
        s = function(e) {
          return { type: "DELETE_TASK", id: e };
        };
    },
    947: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = a(1060),
        l = a.n(i),
        c = a(7),
        u = a.n(c),
        m = function(e) {
          var t = e.label,
            a = e.size,
            n = e.id,
            s = e.name,
            o = e.value,
            i = e.onChangeAction,
            c = e.start,
            m = e.end,
            p = e.step;
          return r.a.createElement(
            "div",
            { className: "form-group col-sm-6" },
            r.a.createElement(
              "label",
              { htmlFor: n, className: "col-sm-6" },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(a) },
              r.a.createElement(l.a, {
                name: s,
                value: o,
                onChange: function(e) {
                  var t = u()("1900-01-01 00:00:00")
                    .add(e, "seconds")
                    .format("HH:mm:ss");
                  i(t, s);
                },
                start: c,
                end: m,
                step: p,
                format: 24,
                className: "input-sm"
              })
            )
          );
        };
      (m.defaultProps = {
        className: "",
        size: "col-sm-6",
        value: "",
        start: "08:00",
        end: "23:00",
        step: 15
      }),
        (m.propTypes = {
          label: o.a.string.isRequired,
          id: o.a.string,
          name: o.a.string.isRequired,
          value: o.a.oneOfType([o.a.string, o.a.number]),
          onChangeAction: o.a.func,
          start: o.a.string,
          end: o.a.string,
          step: o.a.number
        }),
        (t.a = m);
    }
  }
]);
