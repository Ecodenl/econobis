(window.webpackJsonp = window.webpackJsonp || []).push([
  [55],
  {
    1495: function(e, a, t) {
      "use strict";
      t.r(a);
      var n = t(6),
        s = t.n(n),
        i = t(24),
        o = t.n(i),
        r = t(25),
        c = t.n(r),
        l = t(22),
        d = t.n(l),
        p = t(26),
        u = t.n(p),
        m = t(27),
        h = t.n(m),
        g = t(16),
        f = t.n(g),
        v = t(0),
        I = t.n(v),
        b = t(198),
        k = (t(7), t(4)),
        y = t(697),
        E = t.n(y),
        N = t(102),
        C = t(214),
        S = t(93),
        A = t(32),
        z = t(696),
        j = t(699),
        D = t(692),
        O = t(709),
        w = t(947),
        L = t(734),
        P = t(700),
        T = t(698),
        q = function(e) {
          var a = e.task,
            t = e.campaigns,
            n = e.intakes,
            s = e.contactGroups,
            i = e.opportunities,
            o = e.housingFiles,
            r = e.projects,
            c = e.participants,
            l = e.orders,
            d = e.invoices,
            p = e.handleReactSelectChange,
            u = e.peekLoading,
            m = a.intakeId,
            h = a.contactGroupId,
            g = a.opportunityId,
            f = a.campaignId,
            v = a.housingFileId,
            b = a.projectId,
            k = a.participantId,
            y = a.orderId,
            E = a.invoiceId;
          return I.a.createElement(
            "div",
            null,
            I.a.createElement(
              "div",
              { className: "row" },
              I.a.createElement(O.a, {
                label: "Campagne",
                name: "campaignId",
                options: t,
                value: f,
                onChangeAction: p,
                multi: !1,
                isLoading: u.campaigns
              }),
              I.a.createElement(O.a, {
                label: "Intake",
                size: "col-sm-6",
                name: "intakeId",
                options: n,
                value: m,
                onChangeAction: p,
                multi: !1,
                isLoading: u.intakes
              })
            ),
            I.a.createElement(
              "div",
              { className: "row" },
              I.a.createElement(O.a, {
                label: "Groep",
                size: "col-sm-6",
                name: "contactGroupId",
                options: s,
                value: h,
                onChangeAction: p,
                multi: !1,
                isLoading: u.contactGroups
              }),
              I.a.createElement(O.a, {
                label: "Kans",
                size: "col-sm-6",
                name: "opportunityId",
                options: i,
                value: g,
                onChangeAction: p,
                multi: !1,
                isLoading: u.opportunities
              })
            ),
            I.a.createElement(
              "div",
              { className: "row" },
              I.a.createElement(O.a, {
                label: "Woningdossier",
                size: "col-sm-6",
                name: "housingFileId",
                options: o,
                value: v,
                onChangeAction: p,
                multi: !1,
                isLoading: u.housingFiles
              }),
              I.a.createElement(O.a, {
                label: "Project",
                size: "col-sm-6",
                name: "projectId",
                options: r,
                value: b,
                onChangeAction: p,
                multi: !1,
                isLoading: u.projects
              })
            ),
            I.a.createElement(
              "div",
              { className: "row" },
              I.a.createElement(O.a, {
                label: "Participant project",
                size: "col-sm-6",
                name: "participantId",
                options: c,
                value: k,
                onChangeAction: p,
                multi: !1,
                isLoading: u.participants
              }),
              I.a.createElement(O.a, {
                label: "Order",
                size: "col-sm-6",
                name: "orderId",
                options: l,
                value: y,
                onChangeAction: p,
                multi: !1,
                isLoading: u.orders
              })
            ),
            I.a.createElement(
              "div",
              { className: "row" },
              I.a.createElement(O.a, {
                label: "Nota",
                size: "col-sm-6",
                name: "invoiceId",
                options: d,
                value: E,
                onChangeAction: p,
                multi: !1,
                isLoading: u.invoices
              })
            )
          );
        },
        R = t(746),
        F = Object(A.b)(function(e) {
          return {
            meDetails: e.meDetails,
            permissions: e.systemData.permissions,
            taskStatuses: e.systemData.taskStatuses,
            taskTypes: e.systemData.taskTypes,
            teams: e.systemData.teams,
            users: e.systemData.users
          };
        }, null)(function(e) {
          var a = e.task,
            t = a.note,
            n = a.typeId,
            s = a.contactId,
            i = a.finished,
            o = a.dateFinished,
            r = a.finishedById,
            c = a.datePlannedStart,
            l = a.datePlannedFinish,
            d = a.startTimePlanned,
            p = a.endTimePlanned,
            u = a.responsible;
          return I.a.createElement(
            "form",
            { className: "form-horizontal", onSubmit: e.handleSubmit },
            I.a.createElement(
              "div",
              { className: "row" },
              I.a.createElement(z.a, {
                label: i ? "Type notitie" : "Type taak",
                size: "col-sm-6",
                name: "typeId",
                options: e.taskTypes,
                value: n,
                onChangeAction: e.handleInputChange
              })
            ),
            I.a.createElement(
              "div",
              { className: "row" },
              I.a.createElement(L.a, {
                label: i ? "Notitie" : "Taak",
                name: "note",
                value: t,
                onChangeAction: e.handleInputChange,
                required: "required",
                error: e.errors.note
              })
            ),
            I.a.createElement(
              "div",
              { className: "row margin-20-top" },
              I.a.createElement(j.a, {
                label: "Datum afhandelen",
                size: "col-sm-6",
                name: "datePlannedStart",
                value: c,
                onChangeAction: e.handleInputChangeDate
              }),
              I.a.createElement(w.a, {
                label: "Begin tijd",
                name: "startTimePlanned",
                value: d,
                onChangeAction: e.handleInputChangeTime
              })
            ),
            I.a.createElement(
              "div",
              { className: "row" },
              I.a.createElement(j.a, {
                label: "Einddatum",
                size: "col-sm-6",
                name: "datePlannedFinish",
                value: l,
                onChangeAction: e.handleInputChangeDate
              }),
              I.a.createElement(w.a, {
                label: "Eind tijd",
                name: "endTimePlanned",
                value: p,
                onChangeAction: e.handleInputChangeTime
              })
            ),
            I.a.createElement(
              "div",
              { className: "row" },
              I.a.createElement(P.a, {
                label: "Afgehandeld?",
                name: "finished",
                value: i,
                onChangeAction: e.handleInputChange
              }),
              I.a.createElement(R.a, {
                label: "Verantwoordelijke",
                size: "col-sm-6",
                name: "responsible",
                optionsInGroups: [
                  {
                    name: "user",
                    label: "Gebruikers",
                    options: e.users,
                    optionName: "fullName"
                  },
                  { name: "team", label: "Teams", options: e.teams }
                ],
                value: u,
                onChangeAction: e.handleInputChange,
                required: "required",
                error: e.errors.responsible
              })
            ),
            I.a.createElement(
              "div",
              { className: "row" },
              I.a.createElement(j.a, {
                label: "Datum gereed",
                name: "dateFinished",
                value: o,
                onChangeAction: e.handleInputChangeDate
              }),
              I.a.createElement(z.a, {
                label: "Afgerond door",
                name: "finishedById",
                options: e.users,
                value: r,
                onChangeAction: e.handleInputChange,
                optionName: "fullName"
              })
            ),
            I.a.createElement(
              "div",
              { className: "row margin-20-top" },
              I.a.createElement(O.a, {
                label: "Contact",
                name: "contactId",
                options: e.contacts,
                value: s,
                onChangeAction: e.handleReactSelectChange,
                optionName: "fullName",
                multi: !1,
                isLoading: e.peekLoading.contacts
              })
            ),
            I.a.createElement(
              "div",
              { className: "margin-10-top" },
              I.a.createElement(
                T.a,
                null,
                I.a.createElement(
                  "div",
                  { className: "row", onClick: e.toggleExtraConnections },
                  e.showExtraConnections
                    ? I.a.createElement("span", {
                        className: "glyphicon glyphicon-menu-down"
                      })
                    : I.a.createElement("span", {
                        className: "glyphicon glyphicon-menu-right"
                      }),
                  I.a.createElement(
                    "span",
                    { className: "h5" },
                    "Overige koppelingen"
                  )
                )
              ),
              e.showExtraConnections &&
                I.a.createElement(q, {
                  task: e.task,
                  intakes: e.intakes,
                  contactGroups: e.contactGroups,
                  opportunities: e.opportunities,
                  housingFiles: e.housingFiles,
                  campaigns: e.campaigns,
                  projects: e.projects,
                  participants: e.participants,
                  orders: e.orders,
                  invoices: e.invoices,
                  handleReactSelectChange: e.handleReactSelectChange,
                  peekLoading: e.peekLoading
                })
            ),
            I.a.createElement(
              "div",
              { className: "panel-footer" },
              I.a.createElement(
                "div",
                { className: "pull-right btn-group", role: "group" },
                I.a.createElement(D.a, {
                  buttonText: "Opslaan",
                  onClickAction: e.handleSubmit
                })
              )
            )
          );
        }),
        G = t(693),
        B = t(690),
        x = t(691),
        M = function(e) {
          var a = e.finished;
          return I.a.createElement(
            "div",
            { className: "row" },
            I.a.createElement(
              "div",
              { className: "col-sm-12" },
              I.a.createElement(
                B.a,
                null,
                I.a.createElement(
                  x.a,
                  { className: "panel-small" },
                  I.a.createElement(
                    "div",
                    { className: "col-md-4" },
                    I.a.createElement(
                      "div",
                      { className: "btn-group btn-group-flex", role: "group" },
                      I.a.createElement(G.a, {
                        iconName: "glyphicon-arrow-left",
                        onClickAction: k.e.goBack
                      })
                    )
                  ),
                  I.a.createElement(
                    "div",
                    { className: "col-md-4" },
                    I.a.createElement(
                      "h3",
                      { className: "text-center table-title margin-small" },
                      a ? "Nieuwe notitie" : "Nieuwe taak"
                    )
                  ),
                  I.a.createElement("div", { className: "col-md-4" })
                )
              )
            )
          );
        },
        V = t(206),
        Y = t(54),
        W = t(209),
        H = t(216),
        K = t(203),
        U = t(207),
        J = t(210),
        Q = t(212);
      function X(e, a) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          a &&
            (n = n.filter(function(a) {
              return Object.getOwnPropertyDescriptor(e, a).enumerable;
            })),
            t.push.apply(t, n);
        }
        return t;
      }
      function Z(e) {
        for (var a = 1; a < arguments.length; a++) {
          var t = null != arguments[a] ? arguments[a] : {};
          a % 2
            ? X(Object(t), !0).forEach(function(a) {
                s()(e, a, t[a]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : X(Object(t)).forEach(function(a) {
                Object.defineProperty(
                  e,
                  a,
                  Object.getOwnPropertyDescriptor(t, a)
                );
              });
        }
        return e;
      }
      function $(e) {
        var a = (function() {
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
            n = f()(e);
          if (a) {
            var s = f()(this).constructor;
            t = Reflect.construct(n, arguments, s);
          } else t = n.apply(this, arguments);
          return h()(this, t);
        };
      }
      var _ = (function(e) {
        u()(t, e);
        var a = $(t);
        function t(e) {
          var n;
          return (
            o()(this, t),
            ((n = a.call(this, e)).state = {
              contacts: [],
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
                id: "",
                note: "",
                typeId: "",
                contactId: "",
                campaignId: "",
                intakeId: "",
                opportunityId: "",
                contactGroupId: "",
                housingFileId: "",
                projectId: "",
                participantId: "",
                orderId: "",
                invoiceId: "",
                datePlannedStart: "",
                datePlannedFinish: "",
                startTimePlanned: "",
                endTimePlanned: "",
                finished: !1,
                dateFinished: "",
                finishedById: "",
                responsible: ""
              },
              errors: { note: !1, responsible: !1 },
              showExtraConnections: !1,
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
            (n.updateStateByChangeParams = n.updateStateByChangeParams.bind(
              d()(n)
            )),
            (n.handleInputChange = n.handleInputChange.bind(d()(n))),
            (n.handleInputChangeDate = n.handleInputChangeDate.bind(d()(n))),
            (n.handleInputChangeTime = n.handleInputChangeTime.bind(d()(n))),
            (n.handleSubmit = n.handleSubmit.bind(d()(n))),
            (n.handleReactSelectChange = n.handleReactSelectChange.bind(
              d()(n)
            )),
            (n.toggleExtraConnections = n.toggleExtraConnections.bind(d()(n))),
            n
          );
        }
        return (
          c()(t, [
            {
              key: "componentDidMount",
              value: function() {
                var e = this;
                Object(b.isEmpty)(this.props.params) ||
                  this.updateStateByChangeParams(this.props.params),
                  N.a.getContactsPeek().then(function(a) {
                    e.setState({
                      contacts: a,
                      peekLoading: Z(
                        Z({}, e.state.peekLoading),
                        {},
                        { contacts: !1 }
                      )
                    });
                  }),
                  V.a.peekIntakes().then(function(a) {
                    e.setState({
                      intakes: a,
                      peekLoading: Z(
                        Z({}, e.state.peekLoading),
                        {},
                        { intakes: !1 }
                      )
                    });
                  }),
                  Y.a.peekContactGroups().then(function(a) {
                    e.setState({
                      contactGroups: a,
                      peekLoading: Z(
                        Z({}, e.state.peekLoading),
                        {},
                        { contactGroups: !1 }
                      )
                    });
                  }),
                  W.a.peekOpportunities().then(function(a) {
                    e.setState({
                      opportunities: a,
                      peekLoading: Z(
                        Z({}, e.state.peekLoading),
                        {},
                        { opportunities: !1 }
                      )
                    });
                  }),
                  C.a.peekCampaigns().then(function(a) {
                    e.setState({
                      campaigns: a,
                      peekLoading: Z(
                        Z({}, e.state.peekLoading),
                        {},
                        { campaigns: !1 }
                      )
                    });
                  }),
                  H.a.peekHousingFiles().then(function(a) {
                    e.setState({
                      housingFiles: a,
                      peekLoading: Z(
                        Z({}, e.state.peekLoading),
                        {},
                        { housingFiles: !1 }
                      )
                    });
                  }),
                  K.a.peekProjects().then(function(a) {
                    e.setState({
                      projects: a,
                      peekLoading: Z(
                        Z({}, e.state.peekLoading),
                        {},
                        { projects: !1 }
                      )
                    });
                  }),
                  U.a.peekParticipantsProjects().then(function(a) {
                    e.setState({
                      participants: a,
                      peekLoading: Z(
                        Z({}, e.state.peekLoading),
                        {},
                        { participants: !1 }
                      )
                    });
                  }),
                  J.a.peekOrders().then(function(a) {
                    e.setState({
                      orders: a,
                      peekLoading: Z(
                        Z({}, e.state.peekLoading),
                        {},
                        { orders: !1 }
                      )
                    });
                  }),
                  Q.a.peekInvoices().then(function(a) {
                    e.setState({
                      invoices: a,
                      peekLoading: Z(
                        Z({}, e.state.peekLoading),
                        {},
                        { invoices: !1 }
                      )
                    });
                  });
              }
            },
            {
              key: "componentWillReceiveProps",
              value: function(e) {
                (this.props.params.id === e.params.id &&
                  this.props.params.type === e.params.type) ||
                  this.updateStateByChangeParams(e.params);
              }
            },
            {
              key: "updateStateByChangeParams",
              value: function(e) {
                if (!Object(b.isEmpty)(e)) {
                  var a = !1;
                  if (
                    ("afgehandeld" === e.closed &&
                      ((a = !0),
                      this.setState(
                        Z(
                          Z({}, this.state),
                          {},
                          {
                            task: Z(Z({}, this.state.task), {}, { finished: a })
                          }
                        )
                      )),
                    e.contactId && e.projectId && e.participantId)
                  )
                    this.setState(
                      Z(
                        Z({}, this.state),
                        {},
                        {
                          task: Z(
                            Z({}, this.state.task),
                            {},
                            {
                              finished: a,
                              campaignId: "",
                              contactId: e.contactId,
                              intakeId: "",
                              contactGroupId: "",
                              opportunityId: "",
                              projectId: e.projectId,
                              participantId: e.participantId,
                              orderId: "",
                              invoiceId: ""
                            }
                          )
                        }
                      )
                    );
                  else if (e.contactId && e.opportunityId)
                    this.setState(
                      Z(
                        Z({}, this.state),
                        {},
                        {
                          task: Z(
                            Z({}, this.state.task),
                            {},
                            {
                              finished: a,
                              campaignId: "",
                              contactId: e.contactId,
                              intakeId: "",
                              contactGroupId: "",
                              opportunityId: e.opportunityId,
                              projectId: "",
                              participantId: "",
                              orderId: "",
                              invoiceId: ""
                            }
                          )
                        }
                      )
                    );
                  else
                    switch (e.type) {
                      case "contact":
                        this.setState(
                          Z(
                            Z({}, this.state),
                            {},
                            {
                              task: Z(
                                Z({}, this.state.task),
                                {},
                                {
                                  finished: a,
                                  campaignId: "",
                                  contactId: e.id,
                                  intakeId: "",
                                  contactGroupId: "",
                                  opportunityId: "",
                                  projectId: "",
                                  participantId: "",
                                  orderId: "",
                                  invoiceId: ""
                                }
                              )
                            }
                          )
                        );
                        break;
                      case "intake":
                        this.setState(
                          Z(
                            Z({}, this.state),
                            {},
                            {
                              task: Z(
                                Z({}, this.state.task),
                                {},
                                {
                                  finished: a,
                                  campaignId: "",
                                  contactId: "",
                                  intakeId: e.id,
                                  contactGroupId: "",
                                  opportunityId: "",
                                  projectId: "",
                                  participantId: "",
                                  orderId: "",
                                  invoiceId: ""
                                }
                              )
                            }
                          )
                        );
                        break;
                      case "contact-groep":
                        this.setState(
                          Z(
                            Z({}, this.state),
                            {},
                            {
                              task: Z(
                                Z({}, this.state.task),
                                {},
                                {
                                  finished: a,
                                  campaignId: "",
                                  contactId: "",
                                  intakeId: "",
                                  contactGroupId: e.id,
                                  opportunityId: "",
                                  projectId: "",
                                  participantId: "",
                                  orderId: "",
                                  invoiceId: ""
                                }
                              )
                            }
                          )
                        );
                        break;
                      case "kans":
                        this.setState(
                          Z(
                            Z({}, this.state),
                            {},
                            {
                              task: Z(
                                Z({}, this.state.task),
                                {},
                                {
                                  finished: a,
                                  campaignId: "",
                                  contactId: "",
                                  intakeId: "",
                                  contactGroupId: "",
                                  opportunityId: e.id,
                                  projectId: "",
                                  participantId: "",
                                  orderId: "",
                                  invoiceId: ""
                                }
                              )
                            }
                          )
                        );
                        break;
                      case "campagne":
                        this.setState(
                          Z(
                            Z({}, this.state),
                            {},
                            {
                              task: Z(
                                Z({}, this.state.task),
                                {},
                                {
                                  finished: a,
                                  campaignId: e.id,
                                  contactId: "",
                                  intakeId: "",
                                  contactGroupId: "",
                                  opportunityId: "",
                                  projectId: "",
                                  participantId: "",
                                  orderId: "",
                                  invoiceId: ""
                                }
                              )
                            }
                          )
                        );
                        break;
                      case "project":
                        this.setState(
                          Z(
                            Z({}, this.state),
                            {},
                            {
                              task: Z(
                                Z({}, this.state.task),
                                {},
                                {
                                  finished: a,
                                  campaignId: "",
                                  contactId: "",
                                  intakeId: "",
                                  contactGroupId: "",
                                  opportunityId: "",
                                  projectId: e.id,
                                  participantId: "",
                                  orderId: "",
                                  invoiceId: ""
                                }
                              )
                            }
                          )
                        );
                        break;
                      case "participant":
                        this.setState(
                          Z(
                            Z({}, this.state),
                            {},
                            {
                              task: Z(
                                Z({}, this.state.task),
                                {},
                                {
                                  finished: a,
                                  campaignId: "",
                                  contactId: "",
                                  intakeId: "",
                                  contactGroupId: "",
                                  opportunityId: "",
                                  projectId: "",
                                  participantId: e.id,
                                  orderId: "",
                                  invoiceId: ""
                                }
                              )
                            }
                          )
                        );
                        break;
                      case "order":
                        this.setState(
                          Z(
                            Z({}, this.state),
                            {},
                            {
                              task: Z(
                                Z({}, this.state.task),
                                {},
                                {
                                  finished: a,
                                  campaignId: "",
                                  contactId: "",
                                  intakeId: "",
                                  contactGroupId: "",
                                  opportunityId: "",
                                  projectId: "",
                                  participantId: "",
                                  orderId: e.id,
                                  invoiceId: ""
                                }
                              )
                            }
                          )
                        );
                        break;
                      case "nota":
                        this.setState(
                          Z(
                            Z({}, this.state),
                            {},
                            {
                              task: Z(
                                Z({}, this.state.task),
                                {},
                                {
                                  finished: a,
                                  campaignId: "",
                                  contactId: "",
                                  intakeId: "",
                                  contactGroupId: "",
                                  opportunityId: "",
                                  projectId: "",
                                  participantId: "",
                                  orderId: "",
                                  invoiceId: e.id
                                }
                              )
                            }
                          )
                        );
                        break;
                      case "woningdossier":
                        this.setState(
                          Z(
                            Z({}, this.state),
                            {},
                            {
                              task: Z(
                                Z({}, this.state.task),
                                {},
                                {
                                  finished: a,
                                  campaignId: "",
                                  contactId: "",
                                  intakeId: "",
                                  contactGroupId: "",
                                  opportunityId: "",
                                  projectId: "",
                                  participantId: "",
                                  orderId: "",
                                  invoiceId: "",
                                  housingFileId: e.id
                                }
                              )
                            }
                          )
                        );
                    }
                }
              }
            },
            {
              key: "handleInputChange",
              value: function(e) {
                var a = e.target,
                  t = "checkbox" === a.type ? a.checked : a.value,
                  n = a.name;
                this.setState(
                  Z(
                    Z({}, this.state),
                    {},
                    { task: Z(Z({}, this.state.task), {}, s()({}, n, t)) }
                  )
                );
              }
            },
            {
              key: "handleReactSelectChange",
              value: function(e, a) {
                this.setState(
                  Z(
                    Z({}, this.state),
                    {},
                    { task: Z(Z({}, this.state.task), {}, s()({}, a, e)) }
                  )
                );
              }
            },
            {
              key: "handleInputChangeTime",
              value: function(e, a) {
                this.setState(
                  Z(
                    Z({}, this.state),
                    {},
                    { task: Z(Z({}, this.state.task), {}, s()({}, a, e)) }
                  )
                );
              }
            },
            {
              key: "handleInputChangeDate",
              value: function(e, a) {
                this.setState(
                  Z(
                    Z({}, this.state),
                    {},
                    { task: Z(Z({}, this.state.task), {}, s()({}, a, e)) }
                  )
                );
              }
            },
            {
              key: "handleSubmit",
              value: function(e) {
                e.preventDefault();
                var a = this.state.task,
                  t = {},
                  n = !1;
                E.a.isEmpty(a.note) && ((t.note = !0), (n = !0)),
                  E.a.isEmpty(a.responsible) &&
                    ((t.responsible = !0), (n = !0)),
                  a.responsible.search("user") >= 0 &&
                    ((a.responsibleUserId = a.responsible.replace("user", "")),
                    (a.responsibleTeamId = "")),
                  a.responsible.search("team") >= 0 &&
                    ((a.responsibleUserId = ""),
                    (a.responsibleTeamId = a.responsible.replace("team", ""))),
                  this.setState(Z(Z({}, this.state), {}, { errors: t })),
                  !n &&
                    S.a
                      .newTask(a)
                      .then(function(e) {
                        var a = e.data.data.id;
                        k.f.push("/taak/".concat(a));
                      })
                      .catch(function(e) {
                        console.log(e);
                      });
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
                return I.a.createElement(
                  "div",
                  { className: "row" },
                  I.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    I.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      I.a.createElement(M, {
                        finished: this.state.task.finished
                      })
                    ),
                    I.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      I.a.createElement(
                        B.a,
                        null,
                        I.a.createElement(
                          x.a,
                          null,
                          I.a.createElement(
                            "div",
                            { className: "col-md-12" },
                            I.a.createElement(F, {
                              task: this.state.task,
                              contacts: this.state.contacts,
                              intakes: this.state.intakes,
                              contactGroups: this.state.contactGroups,
                              opportunities: this.state.opportunities,
                              campaigns: this.state.campaigns,
                              housingFiles: this.state.housingFiles,
                              projects: this.state.projects,
                              participants: this.state.participants,
                              orders: this.state.orders,
                              invoices: this.state.invoices,
                              errors: this.state.errors,
                              meDetails: this.props.meDetails,
                              handleInputChange: this.handleInputChange,
                              handleInputChangeDate: this.handleInputChangeDate,
                              handleInputChangeTime: this.handleInputChangeTime,
                              handleSubmit: this.handleSubmit,
                              handleReactSelectChange: this
                                .handleReactSelectChange,
                              toggleExtraConnections: this
                                .toggleExtraConnections,
                              showExtraConnections: this.state
                                .showExtraConnections,
                              peekLoading: this.state.peekLoading
                            })
                          )
                        )
                      )
                    )
                  ),
                  I.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          t
        );
      })(v.Component);
      a.default = _;
    },
    690: function(e, a, t) {
      "use strict";
      var n = t(0),
        s = t.n(n),
        i = t(8),
        o = t.n(i),
        r = function(e) {
          var a = e.children,
            t = e.className,
            n = e.onMouseEnter,
            i = e.onMouseLeave;
          return s.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(t),
              onMouseEnter: n,
              onMouseLeave: i
            },
            a
          );
        };
      (r.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (r.propTypes = {
          className: o.a.string,
          onMouseEnter: o.a.func,
          onMouseLeave: o.a.func
        }),
        (a.a = r);
    },
    691: function(e, a, t) {
      "use strict";
      var n = t(0),
        s = t.n(n),
        i = t(8),
        o = t.n(i),
        r = function(e) {
          var a = e.className,
            t = e.children;
          return s.a.createElement(
            "div",
            { className: "panel-body ".concat(a) },
            t
          );
        };
      (r.defaultProps = { className: "" }),
        (r.propTypes = { className: o.a.string }),
        (a.a = r);
    },
    692: function(e, a, t) {
      "use strict";
      var n = t(0),
        s = t.n(n),
        i = t(8),
        o = t.n(i),
        r = function(e) {
          var a = e.buttonClassName,
            t = e.buttonText,
            n = e.onClickAction,
            i = e.type,
            o = e.value,
            r = e.loading,
            c = e.loadText,
            l = e.disabled;
          return r
            ? s.a.createElement(
                "button",
                {
                  type: i,
                  className: "btn btn-sm btn-loading ".concat(a),
                  value: o,
                  disabled: r
                },
                s.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                c
              )
            : s.a.createElement(
                "button",
                {
                  type: i,
                  className: "btn btn-sm ".concat(a),
                  onClick: n,
                  value: o,
                  disabled: l
                },
                t
              );
        };
      (r.defaultProps = {
        buttonClassName: "btn-success",
        type: "button",
        value: "",
        loading: !1,
        loadText: "Aan het laden",
        disabled: !1
      }),
        (r.propTypes = {
          buttonClassName: o.a.string,
          buttonText: o.a.string.isRequired,
          onClickAction: o.a.func,
          type: o.a.string,
          value: o.a.string,
          loading: o.a.bool,
          loadText: o.a.string,
          disabled: o.a.bool
        }),
        (a.a = r);
    },
    693: function(e, a, t) {
      "use strict";
      var n = t(0),
        s = t.n(n),
        i = t(8),
        o = t.n(i),
        r = function(e) {
          var a = e.buttonClassName,
            t = e.iconName,
            n = e.onClickAction,
            i = e.title,
            o = e.disabled;
          return s.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(a),
              onClick: n,
              disabled: o,
              title: i
            },
            s.a.createElement("span", { className: "glyphicon ".concat(t) })
          );
        };
      (r.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (r.propTypes = {
          buttonClassName: o.a.string,
          iconName: o.a.string.isRequired,
          onClickAction: o.a.func,
          title: o.a.string,
          disabled: o.a.bool
        }),
        (a.a = r);
    },
    696: function(e, a, t) {
      "use strict";
      var n = t(0),
        s = t.n(n),
        i = t(8),
        o = t.n(i),
        r = function(e) {
          var a = e.label,
            t = e.className,
            n = e.size,
            i = e.id,
            o = e.name,
            r = e.value,
            c = e.options,
            l = e.onChangeAction,
            d = e.onBlurAction,
            p = e.required,
            u = e.error,
            m = e.errorMessage,
            h = e.optionValue,
            g = e.optionName,
            f = e.readOnly,
            v = e.placeholder,
            I = e.divClassName,
            b = e.emptyOption;
          return s.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(I) },
            s.a.createElement(
              "label",
              { htmlFor: i, className: "col-sm-6 ".concat(p) },
              a
            ),
            s.a.createElement(
              "div",
              { className: "col-sm-6" },
              s.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(t) + (u && " has-error"),
                  id: i,
                  name: o,
                  value: r,
                  onChange: l,
                  onBlur: d,
                  readOnly: f
                },
                b && s.a.createElement("option", { value: "" }, v),
                c.map(function(e) {
                  return s.a.createElement(
                    "option",
                    { key: e[h], value: e[h] },
                    e[g]
                  );
                })
              )
            ),
            u &&
              s.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                s.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  m
                )
              )
          );
        };
      (r.defaultProps = {
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
        (r.propTypes = {
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
        (a.a = r);
    },
    698: function(e, a, t) {
      "use strict";
      var n = t(0),
        s = t.n(n),
        i = t(8),
        o = t.n(i),
        r = function(e) {
          var a = e.className,
            t = e.children;
          return s.a.createElement(
            "div",
            { className: "panel-heading ".concat(a) },
            t
          );
        };
      (r.defaultProps = { className: "" }),
        (r.propTypes = { className: o.a.string }),
        (a.a = r);
    },
    699: function(e, a, t) {
      "use strict";
      var n = t(24),
        s = t.n(n),
        i = t(25),
        o = t.n(i),
        r = t(22),
        c = t.n(r),
        l = t(26),
        d = t.n(l),
        p = t(27),
        u = t.n(p),
        m = t(16),
        h = t.n(m),
        g = t(6),
        f = t.n(g),
        v = t(0),
        I = t.n(v),
        b = t(8),
        k = t.n(b),
        y = t(707),
        E = t.n(y),
        N = t(708),
        C = t.n(N),
        S = t(7),
        A = t.n(S);
      function z(e) {
        var a = (function() {
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
            n = h()(e);
          if (a) {
            var s = h()(this).constructor;
            t = Reflect.construct(n, arguments, s);
          } else t = n.apply(this, arguments);
          return u()(this, t);
        };
      }
      A.a.locale("nl");
      var j = (function(e) {
        d()(t, e);
        var a = z(t);
        function t(e) {
          var n;
          return (
            s()(this, t),
            (n = a.call(this, e)),
            f()(c()(n), "validateDate", function(e) {
              var a = A()(e.target.value, "DD-MM-YYYY", !0),
                t = !1;
              a.isValid() || "" === e.target.value || (t = !0),
                n.props.disabledBefore &&
                  a.isBefore(n.props.disabledBefore) &&
                  (t = !0),
                n.props.disabledAfter &&
                  a.isAfter(n.props.disabledAfter) &&
                  (t = !0),
                n.setState({ errorDateFormat: t });
            }),
            f()(c()(n), "onDateChange", function(e) {
              var a = e ? A()(e).format("Y-MM-DD") : "",
                t = !1;
              a &&
                n.props.disabledBefore &&
                A()(a).isBefore(n.props.disabledBefore) &&
                (t = !0),
                a &&
                  n.props.disabledAfter &&
                  A()(a).isAfter(n.props.disabledAfter) &&
                  (t = !0),
                n.setState({ errorDateFormat: t }),
                !t && n.props.onChangeAction(a, n.props.name);
            }),
            (n.state = { errorDateFormat: !1 }),
            n
          );
        }
        return (
          o()(t, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  a = e.label,
                  t = e.className,
                  n = e.size,
                  s = e.divSize,
                  i = e.id,
                  o = e.value,
                  r = e.required,
                  c = e.readOnly,
                  l = e.name,
                  d = e.error,
                  p = e.errorMessage,
                  u = e.disabledBefore,
                  m = e.disabledAfter,
                  h = o ? A()(o).format("L") : "",
                  g = {};
                return (
                  u && (g.before = new Date(u)),
                  m && (g.after = new Date(m)),
                  I.a.createElement(
                    "div",
                    { className: "form-group ".concat(s) },
                    I.a.createElement(
                      "div",
                      null,
                      I.a.createElement(
                        "label",
                        { htmlFor: i, className: "col-sm-6 ".concat(r) },
                        a
                      )
                    ),
                    I.a.createElement(
                      "div",
                      { className: "".concat(n) },
                      I.a.createElement(E.a, {
                        id: i,
                        value: h,
                        formatDate: N.formatDate,
                        parseDate: N.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: C.a,
                          disabledDays: g
                        },
                        inputProps: {
                          className:
                            "form-control input-sm ".concat(t) +
                            (this.state.errorDateFormat || d
                              ? " has-error"
                              : ""),
                          name: l,
                          onBlur: this.validateDate,
                          autoComplete: "off",
                          readOnly: c,
                          disabled: c
                        },
                        required: r,
                        readOnly: c,
                        placeholder: ""
                      })
                    ),
                    d &&
                      I.a.createElement(
                        "div",
                        { className: "col-sm-offset-6 col-sm-6" },
                        I.a.createElement(
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
          t
        );
      })(v.Component);
      (j.defaultProps = {
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
        (j.propTypes = {
          label: k.a.string.isRequired,
          type: k.a.string,
          className: k.a.string,
          size: k.a.string,
          divSize: k.a.string,
          id: k.a.string,
          name: k.a.string,
          value: k.a.oneOfType([k.a.string, k.a.object]),
          onChangeAction: k.a.func,
          required: k.a.string,
          readOnly: k.a.bool,
          error: k.a.bool,
          errorMessage: k.a.string,
          disabledBefore: k.a.string,
          disabledAfter: k.a.string
        }),
        (a.a = j);
    },
    700: function(e, a, t) {
      "use strict";
      var n = t(0),
        s = t.n(n),
        i = t(8),
        o = t.n(i),
        r = t(703),
        c = t.n(r),
        l = function(e) {
          var a = e.label,
            t = e.size,
            n = e.id,
            i = e.name,
            o = e.value,
            r = e.onChangeAction,
            l = e.required,
            d = e.divSize,
            p = e.className,
            u = e.disabled;
          return s.a.createElement(
            "div",
            { className: "form-group ".concat(d, " ").concat(p) },
            s.a.createElement(
              "div",
              null,
              s.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(l) },
                a
              )
            ),
            s.a.createElement(
              "div",
              { className: "".concat(t) },
              s.a.createElement(c.a, {
                id: n,
                name: i,
                onChange: r,
                checked: o,
                disabled: u
              })
            )
          );
        };
      (l.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        required: "",
        disabled: !1,
        value: null
      }),
        (l.propTypes = {
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
        (a.a = l);
    },
    709: function(e, a, t) {
      "use strict";
      var n = t(0),
        s = t.n(n),
        i = t(8),
        o = t.n(i),
        r = t(714),
        c =
          (t(715),
          function(e) {
            var a = e.label,
              t = e.divSize,
              n = e.size,
              i = e.id,
              o = e.name,
              c = e.value,
              l = e.options,
              d = e.optionId,
              p = e.optionName,
              u = e.onChangeAction,
              m = e.required,
              h = e.multi,
              g = e.error,
              f = e.isLoading;
            return s.a.createElement(
              "div",
              { className: "form-group ".concat(t) },
              s.a.createElement(
                "label",
                { htmlFor: i, className: "col-sm-6 ".concat(m) },
                a
              ),
              s.a.createElement(
                "div",
                { className: "".concat(n) },
                s.a.createElement(r.a, {
                  id: i,
                  name: o,
                  value: c,
                  onChange: function(e) {
                    u(e || "", o);
                  },
                  options: l,
                  valueKey: d,
                  labelKey: p,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: h,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: g ? " has-error" : "",
                  isLoading: f
                })
              )
            );
          });
      (c.defaultProps = {
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
        (c.propTypes = {
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
        (a.a = c);
    },
    734: function(e, a, t) {
      "use strict";
      var n = t(0),
        s = t.n(n),
        i = t(8),
        o = t.n(i),
        r = function(e) {
          var a = e.label,
            t = e.size,
            n = e.sizeLabel,
            i = e.sizeInput,
            o = e.id,
            r = e.name,
            c = e.value,
            l = e.onChangeAction,
            d = e.required,
            p = e.error,
            u = e.rows;
          return s.a.createElement(
            "div",
            { className: "form-group ".concat(t) },
            s.a.createElement(
              "div",
              { className: "row" },
              s.a.createElement(
                "div",
                { className: n },
                s.a.createElement(
                  "label",
                  { htmlFor: o, className: "col-sm-12 ".concat(d) },
                  a
                )
              ),
              s.a.createElement(
                "div",
                { className: i },
                s.a.createElement("textarea", {
                  name: r,
                  value: c,
                  onChange: l,
                  className: "form-control input-sm " + (p ? "has-error" : ""),
                  rows: u
                })
              )
            )
          );
        };
      (r.defaultProps = {
        size: "col-sm-12",
        sizeLabel: "col-sm-3",
        sizeInput: "col-sm-9",
        value: "",
        required: "",
        error: !1,
        rows: "5"
      }),
        (r.propTypes = {
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
        (a.a = r);
    },
    746: function(e, a, t) {
      "use strict";
      var n = t(0),
        s = t.n(n),
        i = t(8),
        o = t.n(i),
        r = function(e) {
          var a = e.label,
            t = e.className,
            n = e.size,
            i = e.divSize,
            o = e.id,
            r = e.name,
            c = e.value,
            l = e.optionsInGroups,
            d = e.onChangeAction,
            p = e.onBlurAction,
            u = e.required,
            m = e.error,
            h = e.readOnly;
          return s.a.createElement(
            "div",
            { className: "form-group ".concat(i) },
            s.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(u) },
              a
            ),
            s.a.createElement(
              "div",
              { className: "".concat(n) },
              s.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(t) + (m && " has-error"),
                  id: o,
                  name: r,
                  value: c,
                  onChange: d,
                  onBlur: p,
                  readOnly: h
                },
                s.a.createElement("option", { value: "" }),
                l.map(function(e, a) {
                  var t = e.optionName || "name";
                  return s.a.createElement(
                    "optgroup",
                    { key: a, label: e.label },
                    e.options.map(function(a) {
                      return s.a.createElement(
                        "option",
                        { key: a.id, value: e.name + a.id },
                        a[t]
                      );
                    })
                  );
                })
              )
            )
          );
        };
      (r.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        readOnly: !1,
        required: "",
        error: !1,
        value: ""
      }),
        (r.propTypes = {
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
        (a.a = r);
    },
    947: function(e, a, t) {
      "use strict";
      var n = t(0),
        s = t.n(n),
        i = t(8),
        o = t.n(i),
        r = t(1060),
        c = t.n(r),
        l = t(7),
        d = t.n(l),
        p = function(e) {
          var a = e.label,
            t = e.size,
            n = e.id,
            i = e.name,
            o = e.value,
            r = e.onChangeAction,
            l = e.start,
            p = e.end,
            u = e.step;
          return s.a.createElement(
            "div",
            { className: "form-group col-sm-6" },
            s.a.createElement(
              "label",
              { htmlFor: n, className: "col-sm-6" },
              a
            ),
            s.a.createElement(
              "div",
              { className: "".concat(t) },
              s.a.createElement(c.a, {
                name: i,
                value: o,
                onChange: function(e) {
                  var a = d()("1900-01-01 00:00:00")
                    .add(e, "seconds")
                    .format("HH:mm:ss");
                  r(a, i);
                },
                start: l,
                end: p,
                step: u,
                format: 24,
                className: "input-sm"
              })
            )
          );
        };
      (p.defaultProps = {
        className: "",
        size: "col-sm-6",
        value: "",
        start: "08:00",
        end: "23:00",
        step: 15
      }),
        (p.propTypes = {
          label: o.a.string.isRequired,
          id: o.a.string,
          name: o.a.string.isRequired,
          value: o.a.oneOfType([o.a.string, o.a.number]),
          onChangeAction: o.a.func,
          start: o.a.string,
          end: o.a.string,
          step: o.a.number
        }),
        (a.a = p);
    }
  }
]);
