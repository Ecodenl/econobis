(window.webpackJsonp = window.webpackJsonp || []).push([
  [16],
  {
    1389: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.mailReply = void 0);
      t.mailReply = {
        viewBox: "0 0 1792 1792",
        children: [
          {
            name: "path",
            attribs: {
              d:
                "M1792 1120q0 166-127 451-3 7-10.5 24t-13.5 30-13 22q-12 17-28 17-15 0-23.5-10t-8.5-25q0-9 2.5-26.5t2.5-23.5q5-68 5-123 0-101-17.5-181t-48.5-138.5-80-101-105.5-69.5-133-42.5-154-21.5-175.5-6h-224v256q0 26-19 45t-45 19-45-19l-512-512q-19-19-19-45t19-45l512-512q19-19 45-19t45 19 19 45v256h224q713 0 875 403 53 134 53 333z"
            }
          }
        ]
      };
    },
    1390: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.mailReplyAll = void 0);
      t.mailReplyAll = {
        viewBox: "0 0 1792 1792",
        children: [
          {
            name: "path",
            attribs: {
              d:
                "M640 1082v70q0 42-39 59-13 5-25 5-27 0-45-19l-512-512q-19-19-19-45t19-45l512-512q29-31 70-14 39 17 39 59v69l-397 398q-19 19-19 45t19 45zM1792 1120q0 58-17 133.5t-38.5 138-48 125-40.5 90.5l-20 40q-8 17-28 17-6 0-9-1-25-8-23-34 43-400-106-565-64-71-170.5-110.5t-267.5-52.5v251q0 42-39 59-13 5-25 5-27 0-45-19l-512-512q-19-19-19-45t19-45l512-512q29-31 70-14 39 17 39 59v262q411 28 599 221 169 173 169 509z"
            }
          }
        ]
      };
    },
    1391: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.mailForward = void 0);
      t.mailForward = {
        viewBox: "0 0 1792 1792",
        children: [
          {
            name: "path",
            attribs: {
              d:
                "M1792 640q0 26-19 45l-512 512q-19 19-45 19t-45-19-19-45v-256h-224q-98 0-175.5 6t-154 21.5-133 42.5-105.5 69.5-80 101-48.5 138.5-17.5 181q0 55 5 123 0 6 2.5 23.5t2.5 26.5q0 15-8.5 25t-23.5 10q-16 0-28-17-7-9-13-22t-13.5-30-10.5-24q-127-285-127-451 0-199 53-333 162-403 875-403h224v-256q0-26 19-45t45-19 45 19l512 512q19 19 19 45z"
            }
          }
        ]
      };
    },
    1436: function(e, t, a) {
      "use strict";
      a.r(t);
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
        h = a(0),
        v = a.n(h),
        b = a(32),
        E = a(4),
        g = a(18),
        y = a.n(g),
        w = a(1389),
        N = a(1390),
        k = a(1391),
        C = a(690),
        O = a(691),
        T = a(693),
        R = Object(b.b)(function(e) {
          return { email: e.email };
        })(function(e) {
          var t = e.email,
            a = e.id,
            n = e.removeEmail,
            r = t.from,
            o = "btn-success btn-sm";
          return (
            "removed" === t.folder && (o = "btn-danger btn-sm"),
            v.a.createElement(
              "div",
              { className: "row" },
              v.a.createElement(
                "div",
                { className: "col-sm-12" },
                v.a.createElement(
                  C.a,
                  null,
                  v.a.createElement(
                    O.a,
                    { className: "panel-small" },
                    v.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      v.a.createElement(
                        "div",
                        {
                          className: "btn-group margin-small margin-10-right",
                          role: "group"
                        },
                        v.a.createElement(T.a, {
                          iconName: "glyphicon-arrow-left",
                          onClickAction: E.e.goBack
                        })
                      ),
                      v.a.createElement(
                        "div",
                        { className: "btn-group margin-small", role: "group" },
                        v.a.createElement(
                          "button",
                          {
                            type: "button",
                            title: "Beantwoorden",
                            className: "btn btn-success btn-sm",
                            onClick: function() {
                              E.f.push("/email/".concat(a, "/beantwoorden"));
                            }
                          },
                          v.a.createElement(y.a, {
                            icon: w.mailReply,
                            size: 13
                          })
                        ),
                        v.a.createElement(
                          "button",
                          {
                            type: "button",
                            title: "Allen beantwoorden",
                            className: "btn btn-success btn-sm",
                            onClick: function() {
                              E.f.push(
                                "/email/".concat(a, "/allenbeantwoorden")
                              );
                            }
                          },
                          v.a.createElement(y.a, {
                            icon: N.mailReplyAll,
                            size: 13
                          })
                        ),
                        v.a.createElement(
                          "button",
                          {
                            type: "button",
                            title: "Doorsturen",
                            className: "btn btn-success btn-sm",
                            onClick: function() {
                              E.f.push("/email/".concat(a, "/doorsturen"));
                            }
                          },
                          v.a.createElement(y.a, {
                            icon: k.mailForward,
                            size: 13
                          })
                        )
                      ),
                      v.a.createElement(
                        "div",
                        {
                          className: "btn-group margin-small margin-10-left",
                          role: "group"
                        },
                        v.a.createElement(T.a, {
                          iconName: "glyphicon-trash",
                          onClickAction: n,
                          buttonClassName: o
                        })
                      )
                    ),
                    v.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      v.a.createElement(
                        "h4",
                        { className: "text-center text-success margin-small" },
                        v.a.createElement(
                          "strong",
                          null,
                          r ? "E-mail van: " + r : ""
                        )
                      )
                    ),
                    v.a.createElement("div", { className: "col-md-4" })
                  )
                )
              )
            )
          );
        }),
        j = a(198),
        q = a(6),
        D = a.n(q),
        I = a(7),
        M = a.n(I),
        A = a(696),
        P = a(733),
        L = a(692),
        S = a(702),
        x = a(695),
        _ = a(102),
        z = a(148),
        B = function(e) {
          return { type: "FETCH_EMAIL", id: e };
        },
        V = a(211),
        Y = a(107),
        U = a(106),
        F = a(206),
        H = a(209),
        W = a(709),
        G = a(210),
        K = a(212),
        J = a(746),
        Q = a(697),
        X = a.n(Q);
      function Z(e, t) {
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
      function $(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Z(Object(a), !0).forEach(function(t) {
                D()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Z(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function ee(e) {
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
      var te = (function(e) {
          u()(a, e);
          var t = ee(a);
          function a(e) {
            var n;
            r()(this, a),
              (n = t.call(this, e)),
              D()(s()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  $(
                    $({}, n.state),
                    {},
                    { email: $($({}, n.state.email), {}, D()({}, r, a)) }
                  )
                );
              }),
              D()(s()(n), "handleContactIds", function(e) {
                n.setState(
                  $(
                    $({}, n.state),
                    {},
                    { email: $($({}, n.state.email), {}, { contactIds: e }) }
                  )
                );
              }),
              D()(s()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.email;
                t.statusId &&
                  z.a.setStatus(t.id, t.statusId).then(function(e) {
                    n.props.fetchEmail(t.id);
                  }),
                  X.a.isEmpty(t.responsible.toString()) &&
                    ((t.responsibleUserId = ""), (t.responsibleTeamId = "")),
                  t.responsible.search("user") >= 0 &&
                    ((t.responsibleUserId = t.responsible.replace("user", "")),
                    (t.responsibleTeamId = "")),
                  t.responsible.search("team") >= 0 &&
                    ((t.responsibleUserId = ""),
                    (t.responsibleTeamId = t.responsible.replace("team", ""))),
                  z.a.updateEmail(t).then(function(e) {
                    n.props.fetchEmail(t.id);
                  }),
                  n.props.switchToView();
              });
            var o = e.email,
              i = o.id,
              l = o.responsibleUserId,
              c = o.responsibleTeamId,
              u = o.contacts,
              m = o.intake,
              d = o.task,
              p = o.quotationRequest,
              f = o.measure,
              h = o.opportunity,
              v = o.order,
              b = o.invoice,
              E = o.status,
              g = (o.removedBy, o.dateRemoved, "");
            return (
              l && (g = "user" + l),
              c && (g = "team" + c),
              (n.state = {
                email: {
                  id: i,
                  contactIds:
                    u &&
                    u
                      .map(function(e) {
                        return e.id;
                      })
                      .join(","),
                  intakeId: m ? m.id : "",
                  taskId: d ? d.id : "",
                  quotationRequestId: p ? p.id : "",
                  measureId: f ? f.id : "",
                  statusId: E ? E.id : "",
                  opportunityId: h ? h.id : "",
                  orderId: v ? v.id : "",
                  invoiceId: b ? b.id : "",
                  responsibleUserId: l,
                  responsibleTeamId: c,
                  responsible: g
                },
                orders: [],
                invoices: [],
                contacts: [],
                quotationRequests: [],
                tasks: [],
                measures: [],
                intakes: [],
                opportunities: [],
                peekLoading: { contacts: !0 }
              }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "componentWillMount",
                value: function() {
                  var e = this;
                  _.a.getContactsPeek().then(function(t) {
                    e.setState({
                      contacts: t,
                      peekLoading: $(
                        $({}, e.state.peekLoading),
                        {},
                        { contacts: !1 }
                      )
                    });
                  }),
                    V.a.peekQuotationRequests().then(function(t) {
                      e.setState({ quotationRequests: t });
                    }),
                    Y.a.peekTasks().then(function(t) {
                      e.setState({ tasks: t });
                    }),
                    U.a.peekMeasures().then(function(t) {
                      e.setState({ measures: t });
                    }),
                    F.a.peekIntakes().then(function(t) {
                      e.setState({ intakes: t });
                    }),
                    H.a.peekOpportunities().then(function(t) {
                      e.setState({ opportunities: t });
                    }),
                    G.a.peekOrders().then(function(t) {
                      e.setState({ orders: t });
                    }),
                    K.a.peekInvoices().then(function(t) {
                      e.setState({ invoices: t });
                    });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.email,
                    t = e.contactIds,
                    a = e.statusId,
                    n = e.intakeId,
                    r = e.taskId,
                    o = e.quotationRequestId,
                    i = e.measureId,
                    l = e.opportunityId,
                    s = e.orderId,
                    c = e.invoiceId,
                    u = e.responsible,
                    m = this.props.email,
                    d = m.from,
                    p = m.toWithGroup,
                    f = m.cc,
                    h = m.bcc,
                    b = m.subject,
                    E = m.htmlBody,
                    g = m.createdAt,
                    y = m.dateSent,
                    w = m.folder,
                    N = m.status,
                    k = m.sentByUser,
                    C = m.removedBy,
                    O = m.dateRemoved;
                  return v.a.createElement(
                    "div",
                    null,
                    "removed" === w
                      ? v.a.createElement(
                          v.a.Fragment,
                          null,
                          v.a.createElement(
                            "div",
                            { className: "row" },
                            v.a.createElement(x.a, {
                              label: "Verwijderd door",
                              value: C ? C.fullName : "Onbekend",
                              link: C ? "gebruiker/" + C.id : ""
                            }),
                            v.a.createElement(x.a, {
                              label: "Datum verwijderd",
                              value: O ? M()(O).format("DD-MM-YYYY HH:mm") : ""
                            })
                          ),
                          v.a.createElement("hr", null)
                        )
                      : null,
                    v.a.createElement(
                      "div",
                      { className: "row" },
                      v.a.createElement(x.a, { label: "Van", value: d }),
                      v.a.createElement(x.a, {
                        label: "Ontvangen datum tijd",
                        value: g ? M()(g).format("DD-MM-YYYY HH:mm") : ""
                      })
                    ),
                    v.a.createElement(
                      "div",
                      { className: "row" },
                      v.a.createElement(x.a, {
                        label: "Aan",
                        value:
                          p &&
                          p
                            .map(function(e) {
                              return e;
                            })
                            .join(", ")
                      }),
                      v.a.createElement(x.a, {
                        label: "Verzonden datum tijd",
                        value: y ? M()(y).format("DD-MM-YYYY HH:mm") : ""
                      })
                    ),
                    v.a.createElement(
                      "div",
                      { className: "row" },
                      v.a.createElement("div", {
                        className: "form-group col-md-6"
                      }),
                      v.a.createElement(x.a, {
                        label: "Verzonden door gebruiker",
                        value: k ? k.fullName : ""
                      })
                    ),
                    v.a.createElement(
                      "div",
                      { className: "row" },
                      v.a.createElement(x.a, {
                        label: "Cc",
                        value:
                          f &&
                          f
                            .map(function(e) {
                              return e;
                            })
                            .join(", ")
                      }),
                      v.a.createElement(x.a, {
                        label: "Bcc",
                        value:
                          h &&
                          h
                            .map(function(e) {
                              return e;
                            })
                            .join(", ")
                      })
                    ),
                    v.a.createElement(
                      "div",
                      { className: "row" },
                      v.a.createElement(W.a, {
                        label: "Contact",
                        name: "contactIds",
                        options: this.state.contacts,
                        value: t,
                        onChangeAction: this.handleContactIds,
                        optionName: "fullName",
                        isLoading: this.state.peekLoading.contacts
                      }),
                      v.a.createElement(A.a, {
                        label: "Intake",
                        size: "col-sm-6",
                        name: "intakeId",
                        options: this.state.intakes,
                        value: n,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    v.a.createElement(
                      "div",
                      { className: "row" },
                      v.a.createElement(A.a, {
                        label: "Taak",
                        size: "col-sm-6",
                        name: "taskId",
                        options: this.state.tasks,
                        value: r,
                        onChangeAction: this.handleInputChange
                      }),
                      v.a.createElement(A.a, {
                        label: "Offerteverzoek",
                        size: "col-sm-6",
                        name: "quotationRequestId",
                        options: this.state.quotationRequests,
                        value: o,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    v.a.createElement(
                      "div",
                      { className: "row" },
                      v.a.createElement(A.a, {
                        label: "Maatregel",
                        size: "col-sm-6",
                        name: "measureId",
                        options: this.state.measures,
                        value: i,
                        onChangeAction: this.handleInputChange
                      }),
                      v.a.createElement(A.a, {
                        label: "Kans",
                        size: "col-sm-6",
                        name: "opportunityId",
                        options: this.state.opportunities,
                        value: l,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    v.a.createElement(
                      "div",
                      { className: "row" },
                      v.a.createElement(A.a, {
                        label: "Order",
                        size: "col-sm-6",
                        name: "orderId",
                        options: this.state.orders,
                        value: s,
                        onChangeAction: this.handleInputChange
                      }),
                      v.a.createElement(A.a, {
                        label: "Nota",
                        size: "col-sm-6",
                        name: "invoiceId",
                        options: this.state.invoices,
                        value: c,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    v.a.createElement(
                      "div",
                      { className: "row margin-10-top" },
                      v.a.createElement(
                        "div",
                        { className: "col-sm-12" },
                        v.a.createElement(
                          "div",
                          { className: "row" },
                          v.a.createElement(
                            "div",
                            { className: "col-sm-3" },
                            v.a.createElement(
                              "label",
                              { className: "col-sm-12" },
                              "Onderwerp"
                            )
                          ),
                          v.a.createElement("div", { className: "col-sm-9" }, b)
                        )
                      )
                    ),
                    v.a.createElement(
                      "div",
                      { className: "row" },
                      v.a.createElement(P.a, { label: "Tekst", value: E })
                    ),
                    (("inbox" == w && N) || ("inbox" == w && null == N)) &&
                      v.a.createElement(
                        "div",
                        { className: "row" },
                        v.a.createElement(A.a, {
                          label: "Status",
                          size: "col-sm-6",
                          name: "statusId",
                          options: this.props.emailStatuses,
                          value: a,
                          onChangeAction: this.handleInputChange
                        })
                      ),
                    "inbox" == w &&
                      v.a.createElement(
                        "div",
                        { className: "row" },
                        v.a.createElement(J.a, {
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
                          value: u,
                          onChangeAction: this.handleInputChange
                        })
                      ),
                    v.a.createElement(
                      S.a,
                      null,
                      v.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        v.a.createElement(L.a, {
                          buttonClassName: "btn-default",
                          buttonText: "Annuleren",
                          onClickAction: this.props.switchToView
                        }),
                        v.a.createElement(L.a, {
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
        })(h.Component),
        ae = Object(b.b)(
          function(e) {
            return {
              email: e.email,
              emailStatuses: e.systemData.emailStatuses,
              teams: e.systemData.teams,
              users: e.systemData.users
            };
          },
          function(e) {
            return {
              fetchEmail: function(t) {
                e(B(t));
              }
            };
          }
        )(te);
      M.a.locale("nl");
      var ne = Object(b.b)(function(e) {
        return { email: e.email };
      })(function(e) {
        var t = e.email,
          a = t.from,
          n = t.responsibleUser,
          r = t.responsibleTeam,
          o = t.toWithGroup,
          i = t.cc,
          l = t.bcc,
          s = t.contacts,
          c = t.order,
          u = t.invoice,
          m = t.intake,
          d = t.task,
          p = t.quotationRequest,
          f = t.measure,
          h = t.opportunity,
          b = t.subject,
          g = t.htmlBody,
          y = t.createdAt,
          w = t.dateSent,
          N = t.sentByUser,
          k = t.folder,
          C = t.status,
          O = t.closedBy,
          T = t.dateClosed,
          R = t.removedBy,
          j = t.dateRemoved;
        return v.a.createElement(
          "div",
          null,
          "removed" === k
            ? v.a.createElement(
                v.a.Fragment,
                null,
                v.a.createElement(
                  "div",
                  { className: "row", onClick: e.switchToEdit },
                  v.a.createElement(x.a, {
                    label: "Verwijderd door",
                    value: R ? R.fullName : "Onbekend",
                    link: R ? "gebruiker/" + R.id : ""
                  }),
                  v.a.createElement(x.a, {
                    label: "Datum verwijderd",
                    value: j ? M()(j).format("DD-MM-YYYY HH:mm") : ""
                  })
                ),
                v.a.createElement("hr", null)
              )
            : null,
          v.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            v.a.createElement(x.a, { label: "Van", value: a }),
            v.a.createElement(x.a, {
              label: "Ontvangen datum tijd",
              value: y ? M()(y).format("DD-MM-YYYY HH:mm") : ""
            })
          ),
          v.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            v.a.createElement(x.a, {
              label: "Aan",
              value:
                o &&
                o
                  .map(function(e) {
                    return e;
                  })
                  .join(", ")
            }),
            v.a.createElement(x.a, {
              label: "Verzonden datum tijd",
              value: w ? M()(w).format("DD-MM-YYYY HH:mm") : ""
            })
          ),
          "sent" === k
            ? v.a.createElement(
                "div",
                { className: "row", onClick: e.switchToEdit },
                v.a.createElement("div", { className: "form-group col-md-6" }),
                v.a.createElement(x.a, {
                  label: "Verzonden door gebruiker",
                  value: N ? N.fullName : ""
                })
              )
            : null,
          v.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            v.a.createElement(x.a, {
              label: "Cc",
              value:
                i &&
                i
                  .map(function(e) {
                    return e;
                  })
                  .join(", ")
            }),
            v.a.createElement(x.a, {
              label: "Bcc",
              value:
                l &&
                l
                  .map(function(e) {
                    return e;
                  })
                  .join(", ")
            })
          ),
          v.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            v.a.createElement(x.a, {
              label: "Contacten",
              value:
                s &&
                s.map(function(e) {
                  return v.a.createElement(
                    "span",
                    null,
                    v.a.createElement(
                      E.b,
                      {
                        to: "/contact/".concat(e.id),
                        className: "link-underline"
                      },
                      e.fullName
                    ),
                    " "
                  );
                })
            }),
            v.a.createElement(x.a, {
              label: "Intake",
              value: m ? m.name : "",
              link: m ? "intake/" + m.id : ""
            })
          ),
          v.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            v.a.createElement(x.a, {
              label: "Taak",
              value: d ? d.noteSummary : "",
              link: d ? "taak/" + d.id : ""
            }),
            v.a.createElement(x.a, {
              label: "Offerteverzoek",
              value: p ? p.name : "",
              link: p ? "offerteverzoek/" + p.id : ""
            })
          ),
          v.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            v.a.createElement(x.a, {
              label: "Maatregel",
              value: f ? f.name : "",
              link: f ? "maatregel/" + f.id : ""
            }),
            v.a.createElement(x.a, {
              label: "Kans",
              value: h ? h.name : "",
              link: h ? "kans/" + h.id : ""
            })
          ),
          v.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            v.a.createElement(x.a, {
              label: "Order",
              value: c ? c.name : "",
              link: c ? "order/" + c.id : ""
            }),
            v.a.createElement(x.a, {
              label: "Nota",
              value: u ? u.name : "",
              link: u ? "nota/" + u.id : ""
            })
          ),
          v.a.createElement(
            "div",
            { className: "row margin-10-top", onClick: e.switchToEdit },
            v.a.createElement(
              "div",
              { className: "col-sm-12" },
              v.a.createElement(
                "div",
                { className: "row" },
                v.a.createElement(
                  "div",
                  { className: "col-sm-3" },
                  v.a.createElement(
                    "label",
                    { className: "col-sm-12" },
                    "Onderwerp"
                  )
                ),
                v.a.createElement("div", { className: "col-sm-9" }, b)
              )
            )
          ),
          v.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            v.a.createElement(P.a, { label: "Tekst", value: g })
          ),
          "inbox" == k &&
            v.a.createElement(
              "div",
              null,
              v.a.createElement(
                "div",
                { className: "row", onClick: e.switchToEdit },
                v.a.createElement(x.a, {
                  label: "Status",
                  value: C ? C.name : ""
                }),
                v.a.createElement(x.a, {
                  label: "Datum afgehandeld",
                  value: T ? M()(T).format("DD-MM-YYYY HH:mm") : ""
                })
              ),
              v.a.createElement(
                "div",
                { className: "row", onClick: e.switchToEdit },
                v.a.createElement(x.a, {
                  label: "Afgehandeld door",
                  value: O ? O.fullName : "",
                  link: O ? "gebruiker/" + O.id : ""
                }),
                n || r
                  ? v.a.createElement(x.a, {
                      label: "Verantwoordelijke",
                      value: n ? n.fullName : r.name,
                      link: n ? "gebruiker/" + n.id : "team/" + r.id
                    })
                  : v.a.createElement(x.a, {
                      label: "Verantwoordelijke",
                      value: ""
                    })
              )
            )
        );
      });
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return d()(this, a);
        };
      }
      var oe = (function(e) {
          u()(a, e);
          var t = re(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              D()(s()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              D()(s()(n), "switchToView", function() {
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
                  return v.a.createElement(
                    C.a,
                    {
                      className: this.state.activeDiv,
                      onMouseEnter: function() {
                        return e.onDivEnter();
                      },
                      onMouseLeave: function() {
                        return e.onDivLeave();
                      }
                    },
                    v.a.createElement(
                      O.a,
                      null,
                      this.state.showEdit
                        ? v.a.createElement(ae, {
                            switchToView: this.switchToView
                          })
                        : v.a.createElement(ne, {
                            switchToEdit: this.switchToEdit
                          })
                    )
                  );
                }
              }
            ]),
            a
          );
        })(h.Component),
        ie = Object(b.b)(function(e) {
          return { email: e.email };
        })(oe),
        le = a(711),
        se = a.n(le),
        ce = a(100),
        ue = a(731);
      function me(e) {
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
      var de = (function(e) {
        u()(a, e);
        var t = me(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            D()(s()(n), "downloadItem", function(e, t) {
              z.a.downloadAttachment(e).then(function(e) {
                se()(e.data, t);
              });
            }),
            D()(s()(n), "viewItem", function(e, t) {
              z.a.downloadAttachment(e).then(function(e) {
                var a = "";
                (a = t.toLowerCase().endsWith(".pdf")
                  ? e.data
                  : URL.createObjectURL(e.data)),
                  n.setState({ item: a }, function() {
                    return n.showViewDocument();
                  });
              });
            }),
            D()(s()(n), "showViewDocument", function() {
              n.setState({ showViewDocument: !n.state.showViewDocument });
            }),
            D()(s()(n), "saveToAlfresco", function(e) {
              E.f.push("document/nieuw/upload/email-bijlage/".concat(e));
            }),
            (n.state = {
              showActionButtons: !1,
              highlightRow: "",
              item: "",
              showViewDocument: !1
            }),
            n
          );
        }
        return (
          i()(a, [
            {
              key: "render",
              value: function() {
                var e = this,
                  t = this.props.attachment,
                  a = t.id,
                  n = t.name,
                  r = !1;
                return (
                  (n.toLowerCase().endsWith(".pdf") ||
                    n.toLowerCase().endsWith(".jpg") ||
                    n.toLowerCase().endsWith(".png")) &&
                    (r = !0),
                  v.a.createElement(
                    "div",
                    {
                      className: "row border ".concat(this.props.highlightLine),
                      onMouseEnter: function() {
                        return e.props.onLineEnter();
                      },
                      onMouseLeave: function() {
                        return e.props.onLineLeave();
                      }
                    },
                    v.a.createElement("div", { className: "col-sm-11" }, n),
                    v.a.createElement(
                      "div",
                      { className: "col-sm-1" },
                      this.props.showActionButtons
                        ? v.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.downloadItem(a, n);
                              }
                            },
                            v.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-open-file mybtn-success"
                            }),
                            " "
                          )
                        : "",
                      this.props.showActionButtons
                        ? v.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.saveToAlfresco(a);
                              }
                            },
                            v.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-share mybtn-success"
                            }),
                            " "
                          )
                        : "",
                      this.props.showActionButtons && r
                        ? v.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.viewItem(a, n);
                              }
                            },
                            v.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-eye-open mybtn-success"
                            }),
                            " "
                          )
                        : ""
                    ),
                    this.state.showViewDocument &&
                      n.toLowerCase().endsWith(".pdf") &&
                      v.a.createElement(
                        ce.a,
                        {
                          closeModal: this.showViewDocument,
                          modalClassName: "modal-lg",
                          modalMainClassName: "email-attachment-modal ",
                          showConfirmAction: !1,
                          buttonCancelText: "Ok"
                        },
                        v.a.createElement(ue.a, { file: this.state.item })
                      ),
                    this.state.showViewDocument &&
                      (n.toLowerCase().endsWith(".png") ||
                        n.toLowerCase().endsWith(".jpg")) &&
                      v.a.createElement(
                        ce.a,
                        {
                          closeModal: this.showViewDocument,
                          modalClassName: "modal-lg",
                          modalMainClassName: "email-attachment-modal ",
                          showConfirmAction: !1,
                          buttonCancelText: "Ok"
                        },
                        v.a.createElement("img", {
                          className: "img-responsive",
                          src: this.state.item,
                          alt: n
                        })
                      )
                  )
                );
              }
            }
          ]),
          a
        );
      })(h.Component);
      function pe(e, t) {
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
            ? pe(Object(a), !0).forEach(function(t) {
                D()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : pe(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function he(e) {
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
      var ve = (function(e) {
          u()(a, e);
          var t = he(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              D()(s()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              D()(s()(n), "onLineLeave", function() {
                n.setState({ highlightLine: "", showActionButtons: !1 });
              }),
              (n.state = {
                highlightLine: "",
                showActionButtons: !1,
                attachment: fe({}, e.attachment)
              }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  return v.a.createElement(
                    "div",
                    null,
                    v.a.createElement(de, {
                      highlightLine: this.state.highlightLine,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      attachment: this.state.attachment,
                      showActionButtons: this.state.showActionButtons
                    })
                  );
                }
              }
            ]),
            a
          );
        })(h.Component),
        be = Object(b.b)(function(e) {
          return { email: e.email };
        })(function(e) {
          var t = e.email.attachments,
            a = void 0 === t ? [] : t;
          return v.a.createElement(
            "div",
            null,
            v.a.createElement(
              "div",
              { className: "row border header" },
              v.a.createElement("div", { className: "col-sm-12" }, "Bestand")
            ),
            a.length > 0
              ? a.map(function(e) {
                  return v.a.createElement(ve, { key: e.id, attachment: e });
                })
              : v.a.createElement("div", null, "Geen bijlagen bekend.")
          );
        }),
        Ee = a(698);
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return d()(this, a);
        };
      }
      var ye = (function(e) {
          u()(a, e);
          var t = ge(a);
          function a(e) {
            return r()(this, a), t.call(this, e);
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  return v.a.createElement(
                    C.a,
                    null,
                    v.a.createElement(
                      Ee.a,
                      null,
                      v.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Bijlagen"
                      )
                    ),
                    v.a.createElement(
                      O.a,
                      null,
                      v.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        v.a.createElement(be, null)
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(h.Component),
        we = a(8),
        Ne = a.n(we),
        ke = function(e) {
          var t = e.text,
            a = e.restoreAction,
            n = e.restoreText;
          return v.a.createElement(
            C.a,
            null,
            v.a.createElement(
              Ee.a,
              null,
              v.a.createElement(
                "span",
                { className: "h5", style: { color: "#e64a4a" } },
                t,
                " ",
                a &&
                  v.a.createElement(
                    "a",
                    {
                      style: { color: "#e64a4a", cursor: "pointer" },
                      onClick: a
                    },
                    v.a.createElement("strong", null, n)
                  )
              )
            )
          );
        };
      (ke.defaultProps = {
        text: "Dit item is verwijderd",
        restoreText: "Klik hier om dit item terug te zetten."
      }),
        (ke.propTypes = {
          text: Ne.a.string,
          restoreAction: Ne.a.func,
          restoreText: Ne.a.string
        });
      var Ce = ke;
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return d()(this, a);
        };
      }
      var Te = (function(e) {
          u()(a, e);
          var t = Oe(a);
          function a(e) {
            return r()(this, a), t.call(this, e);
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  return Object(j.isEmpty)(this.props.email)
                    ? v.a.createElement("div", null, "Geen gegevens gevonden.")
                    : v.a.createElement(
                        "div",
                        null,
                        "removed" === this.props.email.folder &&
                          v.a.createElement(Ce, {
                            text: "Deze e-mail is verwijderd.",
                            restoreAction: this.props.restoreEmail,
                            restoreText:
                              "Klik hier om verwijderen ongedaan te maken."
                          }),
                        v.a.createElement(ie, null),
                        v.a.createElement(ye, null)
                      );
                }
              }
            ]),
            a
          );
        })(h.Component),
        Re = Object(b.b)(function(e) {
          return { email: e.email };
        })(Te);
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return d()(this, a);
        };
      }
      var qe = (function(e) {
        u()(a, e);
        var t = je(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            ((n = t.call(this, e)).restoreEmail = n.restoreEmail.bind(s()(n))),
            (n.removeEmail = n.removeEmail.bind(s()(n))),
            n
          );
        }
        return (
          i()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchEmail(this.props.params.id);
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearEmail();
              }
            },
            {
              key: "refreshEmail",
              value: function() {
                this.props.clearEmail(),
                  this.props.fetchEmail(this.props.params.id);
              }
            },
            {
              key: "restoreEmail",
              value: function() {
                var e = this;
                null === this.props.email.imapId
                  ? z.a
                      .moveToFolder(this.props.email.id, "sent")
                      .then(function() {
                        e.refreshEmail();
                      })
                  : z.a
                      .moveToFolder(this.props.email.id, "inbox")
                      .then(function() {
                        e.refreshEmail();
                      });
              }
            },
            {
              key: "removeEmail",
              value: function() {
                var e = this;
                "inbox" === this.props.email.folder ||
                "sent" === this.props.email.folder
                  ? z.a
                      .moveToFolder(this.props.email.id, "removed")
                      .then(function() {
                        e.refreshEmail();
                      })
                  : "removed" === this.props.email.folder &&
                    z.a.deleteEmail(this.props.email.id).then(function() {
                      E.e.goBack();
                    });
              }
            },
            {
              key: "render",
              value: function() {
                return v.a.createElement(
                  "div",
                  { className: "row" },
                  v.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    v.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      v.a.createElement(R, {
                        removeEmail: this.removeEmail,
                        id: this.props.params.id
                      })
                    ),
                    v.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      v.a.createElement(Re, { restoreEmail: this.restoreEmail })
                    )
                  )
                );
              }
            }
          ]),
          a
        );
      })(h.Component);
      t.default = Object(b.b)(
        function(e) {
          return { email: e.email };
        },
        function(e) {
          return {
            fetchEmail: function(t) {
              e(B(t));
            },
            clearEmail: function() {
              e({ type: "CLEAR_EMAIL" });
            }
          };
        }
      )(qe);
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
            b = e.placeholder,
            E = e.divClassName,
            g = e.emptyOption;
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
                  name: i,
                  value: l,
                  onChange: c,
                  onBlur: u,
                  readOnly: v
                },
                g && r.a.createElement("option", { value: "" }, b),
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
    711: function(e, t) {
      e.exports = function(e, t, a, n) {
        var r = new Blob(void 0 !== n ? [n, e] : [e], {
          type: a || "application/octet-stream"
        });
        if (void 0 !== window.navigator.msSaveBlob)
          window.navigator.msSaveBlob(r, t);
        else {
          var o =
              window.URL && window.URL.createObjectURL
                ? window.URL.createObjectURL(r)
                : window.webkitURL.createObjectURL(r),
            i = document.createElement("a");
          (i.style.display = "none"),
            (i.href = o),
            i.setAttribute("download", t),
            void 0 === i.download && i.setAttribute("target", "_blank"),
            document.body.appendChild(i),
            i.click(),
            setTimeout(function() {
              document.body.removeChild(i), window.URL.revokeObjectURL(o);
            }, 200);
        }
      };
    },
    731: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        l = a(775),
        s = a.n(l),
        c = function(e) {
          var t = e.page,
            a = (e.pages, e.handlePrevClick);
          return 1 === t
            ? r.a.createElement("div", null)
            : r.a.createElement(
                "h3",
                {
                  style: {
                    cursor: "pointer",
                    display: "inline-block",
                    marginRight: 24,
                    marginTop: 0
                  },
                  onClick: a
                },
                "<"
              );
        };
      c.propTypes = {
        page: i.a.number.isRequired,
        pages: i.a.number.isRequired,
        handlePrevClick: i.a.func.isRequired
      };
      var u = function(e) {
        var t = e.page,
          a = e.pages,
          n = e.handleNextClick;
        return t === a
          ? r.a.createElement("div", null)
          : r.a.createElement(
              "h3",
              {
                style: {
                  cursor: "pointer",
                  display: "inline-block",
                  marginLeft: 24,
                  marginTop: 0
                },
                onClick: n
              },
              ">"
            );
      };
      u.propTypes = {
        page: i.a.number.isRequired,
        pages: i.a.number.isRequired,
        handleNextClick: i.a.func.isRequired
      };
      var m = function(e) {
        var t = e.page,
          a = e.pages;
        return r.a.createElement(
          "h3",
          { style: { display: "inline-block", marginTop: 0 } },
          "Pagina ",
          t,
          " van ",
          a
        );
      };
      m.propTypes = {
        page: i.a.number.isRequired,
        pages: i.a.number.isRequired
      };
      var d = function(e) {
        var t = e.page,
          a = e.pages,
          n = e.handlePrevClick,
          o = e.handleNextClick;
        return r.a.createElement(
          "div",
          { className: "customWrapper" },
          r.a.createElement(c, { page: t, pages: a, handlePrevClick: n }),
          r.a.createElement(m, { page: t, pages: a }),
          r.a.createElement(u, { page: t, pages: a, handleNextClick: o })
        );
      };
      d.propTypes = {
        page: i.a.number.isRequired,
        pages: i.a.number.isRequired,
        handlePrevClick: i.a.func.isRequired,
        handleNextClick: i.a.func.isRequired
      };
      var p = d;
      (s.a.defaultProps = { file: "", scale: 1 }),
        (s.a.propTypes = { file: i.a.string, scale: i.a.number });
      t.a = function(e) {
        var t = e.file,
          a = e.scale;
        return r.a.createElement(
          "div",
          { className: "panel-heading" },
          r.a.createElement(s.a, {
            document: { file: t },
            navigation: p,
            scale: a
          })
        );
      };
    },
    733: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(739),
        i = a.n(o),
        l = a(8),
        s = a.n(l),
        c = a(690),
        u = a(692),
        m = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            o = e.value,
            l = e.switchToEdit;
          return r.a.createElement(
            "div",
            { className: a },
            r.a.createElement(
              "label",
              { htmlFor: n, className: "col-sm-3" },
              t,
              l
                ? r.a.createElement(
                    "span",
                    null,
                    r.a.createElement("br", null),
                    r.a.createElement(u.a, {
                      buttonClassName: "btn-success btn-padding-small",
                      buttonText: "Wijzig",
                      onClickAction: l
                    })
                  )
                : ""
            ),
            r.a.createElement(
              c.a,
              { className: "col-sm-9" },
              r.a.createElement(
                i.a,
                null,
                r.a.createElement("div", {
                  id: n,
                  dangerouslySetInnerHTML: { __html: o }
                })
              )
            )
          );
        };
      (m.defaultProps = { className: "col-sm-12", value: "" }),
        (m.propTypes = {
          label: s.a.string.isRequired,
          className: s.a.string,
          id: s.a.string,
          value: s.a.oneOfType([s.a.string, s.a.number])
        }),
        (t.a = m);
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
        i = u(o),
        l = u(a(103)),
        s = u(a(8)),
        c = u(a(741));
      function u(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var m,
        d = "undefined" != typeof window && window.console,
        p = function() {},
        f = p,
        h = p;
      d &&
        ((m = console.error),
        (f = function() {
          console.error = function(e) {
            /<head>/.test(e) || m.call(console, e);
          };
        }),
        (h = function() {
          return (console.error = m);
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
                e && t && l.default.unmountComponentAtNode(t);
              }
            },
            {
              key: "getDoc",
              value: function() {
                return l.default.findDOMNode(this).contentDocument;
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
                      n = i.default.createElement(
                        c.default,
                        { document: e, window: t },
                        i.default.createElement(
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
                      f();
                    var r = a
                        ? this.props.contentDidMount
                        : this.props.contentDidUpdate,
                      o = this.getMountTarget();
                    l.default.unstable_renderSubtreeIntoContainer(
                      this,
                      n,
                      o,
                      r
                    ),
                      h();
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
                  i.default.createElement("iframe", e)
                );
              }
            }
          ]),
          t
        );
      })(o.Component);
      (v.propTypes = {
        style: s.default.object,
        head: s.default.node,
        initialContent: s.default.string,
        mountTarget: s.default.string,
        contentDidMount: s.default.func,
        contentDidUpdate: s.default.func,
        children: s.default.oneOfType([
          s.default.element,
          s.default.arrayOf(s.default.element)
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
        o = (i(r), i(a(8)));
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function l(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function s(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      var c = (function(e) {
        function t() {
          return (
            l(this, t),
            s(
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
      (c.propTypes = {
        document: o.default.object.isRequired,
        window: o.default.object.isRequired,
        children: o.default.element.isRequired
      }),
        (c.childContextTypes = {
          document: o.default.object.isRequired,
          window: o.default.object.isRequired
        }),
        (t.default = c);
    },
    746: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        l = function(e) {
          var t = e.label,
            a = e.className,
            n = e.size,
            o = e.divSize,
            i = e.id,
            l = e.name,
            s = e.value,
            c = e.optionsInGroups,
            u = e.onChangeAction,
            m = e.onBlurAction,
            d = e.required,
            p = e.error,
            f = e.readOnly;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(o) },
            r.a.createElement(
              "label",
              { htmlFor: i, className: "col-sm-6 ".concat(d) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(n) },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(a) + (p && " has-error"),
                  id: i,
                  name: l,
                  value: s,
                  onChange: u,
                  onBlur: m,
                  readOnly: f
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
      (l.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        readOnly: !1,
        required: "",
        error: !1,
        value: ""
      }),
        (l.propTypes = {
          label: i.a.string.isRequired,
          className: i.a.string,
          size: i.a.string,
          divSize: i.a.string,
          id: i.a.string,
          name: i.a.string.isRequired,
          optionsInGroups: i.a.array,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          onChangeAction: i.a.func,
          onBlurAction: i.a.func,
          required: i.a.string,
          readOnly: i.a.bool,
          error: i.a.bool,
          optionName: i.a.string
        }),
        (t.a = l);
    },
    779: function(e, t) {},
    780: function(e, t) {},
    781: function(e, t) {},
    782: function(e, t) {},
    783: function(e, t) {}
  }
]);
