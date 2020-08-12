(window.webpackJsonp = window.webpackJsonp || []).push([
  [61],
  {
    1450: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        o = a(25),
        c = a.n(o),
        i = a(22),
        l = a.n(i),
        s = a(26),
        u = a.n(s),
        m = a(27),
        d = a.n(m),
        p = a(16),
        f = a.n(p),
        h = a(0),
        v = a.n(h),
        E = a(32),
        g = a(871),
        b = a(6),
        y = a.n(b),
        N = a(4),
        w = a(693),
        k = a(100),
        C = a(151),
        D = function(e) {
          return v.a.createElement(
            k.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                C.a.deleteDocument(e.id).then(function(e) {
                  N.f.push("/documenten");
                });
              },
              title: "Verwijderen"
            },
            "Verwijder document: ",
            v.a.createElement("strong", null, " ", e.filename, " ")
          );
        };
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
          return d()(this, a);
        };
      }
      var A = (function(e) {
          u()(a, e);
          var t = I(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(l()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              (n.state = { showDelete: !1 }),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.documentFilename,
                    a = void 0 === t ? "" : t;
                  return v.a.createElement(
                    "div",
                    { className: "row" },
                    v.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      v.a.createElement(
                        "div",
                        { className: "btn-group", role: "group" },
                        v.a.createElement(w.a, {
                          iconName: "glyphicon-arrow-left",
                          onClickAction: N.e.goBack
                        }),
                        v.a.createElement(w.a, {
                          iconName: "glyphicon-download-alt",
                          onClickAction: this.props.download
                        }),
                        a.toLowerCase().endsWith(".pdf") &&
                          v.a.createElement(w.a, {
                            iconName: "glyphicon-eye-open",
                            onClickAction: function() {
                              return N.f.push(
                                "/document/inzien/".concat(e.props.documentId)
                              );
                            }
                          }),
                        v.a.createElement(w.a, {
                          iconName: "glyphicon-envelope",
                          onClickAction: function() {
                            return N.f.push(
                              "/email/nieuw/document/".concat(
                                e.props.documentId
                              )
                            );
                          }
                        }),
                        v.a.createElement(w.a, {
                          iconName: "glyphicon-trash",
                          onClickAction: this.toggleDelete
                        })
                      )
                    ),
                    a.toLowerCase().endsWith(".pdf")
                      ? v.a.createElement(
                          "div",
                          { className: "col-md-4" },
                          v.a.createElement(
                            "h4",
                            { className: "text-center" },
                            "Document: ",
                            " ",
                            v.a.createElement(
                              N.b,
                              {
                                to: "/document/inzien/".concat(
                                  this.props.documentId
                                ),
                                className: "link-underline"
                              },
                              a
                            )
                          )
                        )
                      : v.a.createElement(
                          "div",
                          { className: "col-md-4" },
                          v.a.createElement(
                            "h4",
                            { className: "text-center" },
                            "Document: " + a
                          )
                        ),
                    v.a.createElement("div", { className: "col-md-4" }),
                    this.state.showDelete &&
                      v.a.createElement(D, {
                        id: this.props.documentId,
                        filename: a,
                        closeDeleteItemModal: this.toggleDelete
                      })
                  );
                }
              }
            ]),
            a
          );
        })(h.Component),
        O = Object(E.b)(function(e) {
          return {
            documentFilename: e.documentDetails.filename,
            documentId: e.documentDetails.id
          };
        }, null)(A),
        T = a(198),
        q = a(690),
        R = a(691),
        j = a(697),
        L = a.n(j),
        S = a(692),
        P = a(702),
        x = a(696),
        M = a(694),
        G = a(54),
        F = a(206),
        B = a(209),
        z = a(102),
        U = a(695),
        V = a(107),
        _ = a(216),
        W = a(106),
        H = a(214),
        J = a(211),
        K = a(207),
        Q = a(203),
        X = a(210);
      function Y(e, t) {
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
      function Z(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Y(Object(a), !0).forEach(function(t) {
                y()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Y(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function $(e) {
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
      var ee = (function(e) {
          u()(a, e);
          var t = $(a);
          function a(e) {
            var n;
            r()(this, a),
              (n = t.call(this, e)),
              y()(l()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.document,
                  a = {},
                  r = !1;
                L.a.isEmpty(t.contactId + "") &&
                  L.a.isEmpty(t.contactGroupId + "") &&
                  L.a.isEmpty(t.intakeId + "") &&
                  L.a.isEmpty(t.opportunityId + "") &&
                  L.a.isEmpty(t.orderId + "") &&
                  L.a.isEmpty(t.participantId + "") &&
                  L.a.isEmpty(t.projectId + "") &&
                  ((a.docLinkedAtAny = !0), (r = !0)),
                  n.setState(Z(Z({}, n.state), {}, { errors: a })),
                  !r &&
                    C.a.updateDocument(t).then(function(e) {
                      n.props.updateDocument(e.data.data),
                        n.props.switchToView();
                    });
              });
            var o = e.documentDetails,
              c = o.id,
              i = o.orderId,
              s = o.projectId,
              u = o.participantId,
              m = o.contactId,
              d = o.contactGroupId,
              p = o.intakeId,
              f = o.opportunityId,
              h = o.campaignId,
              v = o.housingFileId,
              E = o.quotationRequestId,
              g = o.measureId,
              b = o.taskId,
              N = o.documentType,
              w = o.description,
              k = o.documentGroup;
            o.filename;
            return (
              (n.state = {
                contacts: [],
                contactGroups: [],
                intakes: [],
                opportunities: [],
                campaigns: [],
                housingFiles: [],
                quotationRequests: [],
                measures: [],
                tasks: [],
                participants: [],
                projects: [],
                orders: [],
                document: {
                  id: c,
                  contactId: m || "",
                  contactGroupId: d || "",
                  intakeId: p || "",
                  opportunityId: f || "",
                  campaignId: h || "",
                  housingFileId: v || "",
                  quotationRequestId: E || "",
                  measureId: g || "",
                  taskId: b || "",
                  projectId: s || "",
                  participantId: u || "",
                  orderId: i || "",
                  documentType: N && N.id,
                  description: w,
                  documentGroup: k && k.id
                },
                errors: { docLinkedAtAny: !1, documentGroup: !1 }
              }),
              (n.handleInputChange = n.handleInputChange.bind(l()(n))),
              (n.handleSubmit = n.handleSubmit.bind(l()(n))),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  z.a.getContactsPeek().then(function(t) {
                    e.setState({ contacts: t });
                  }),
                    F.a.peekIntakes().then(function(t) {
                      e.setState({ intakes: t });
                    }),
                    G.a.peekContactGroups().then(function(t) {
                      e.setState({ contactGroups: t });
                    }),
                    B.a.peekOpportunities().then(function(t) {
                      e.setState({ opportunities: t });
                    }),
                    H.a.peekCampaigns().then(function(t) {
                      e.setState({ campaigns: t });
                    }),
                    _.a.peekHousingFiles().then(function(t) {
                      e.setState({ housingFiles: t });
                    }),
                    J.a.peekQuotationRequests().then(function(t) {
                      e.setState({ quotationRequests: t });
                    }),
                    V.a.peekTasks().then(function(t) {
                      e.setState({ tasks: t });
                    }),
                    W.a.peekMeasures().then(function(t) {
                      e.setState({ measures: t });
                    }),
                    Q.a.peekProjects().then(function(t) {
                      e.setState({ projects: t });
                    }),
                    K.a.peekParticipantsProjects().then(function(t) {
                      e.setState({ participants: t });
                    }),
                    X.a.peekOrders().then(function(t) {
                      e.setState({ orders: t });
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
                    Z(
                      Z({}, this.state),
                      {},
                      {
                        document: Z(
                          Z({}, this.state.document),
                          {},
                          y()({}, n, a)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state,
                    t = e.document,
                    a = e.errors,
                    n = e.orders,
                    r = e.contacts,
                    o = e.contactGroups,
                    c = e.intakes,
                    i = e.opportunities,
                    l = e.campaigns,
                    s = e.housingFiles,
                    u = e.quotationRequests,
                    m = e.measures,
                    d = e.tasks,
                    p = e.projects,
                    f = e.participants,
                    h = t.orderId,
                    E = t.contactId,
                    g = t.contactGroupId,
                    b = t.intakeId,
                    y = t.opportunityId,
                    N = t.campaignId,
                    w = t.housingFileId,
                    k = t.quotationRequestId,
                    C = t.measureId,
                    D = t.taskId,
                    I = t.documentType,
                    A = t.description,
                    O = t.participantId,
                    T = t.projectId,
                    q =
                      "" === E &&
                      "" === h &&
                      "" === g &&
                      "" === b &&
                      "" === y &&
                      "" === D &&
                      "" === k &&
                      "" === w &&
                      "" === O &&
                      "" === T;
                  return v.a.createElement(
                    "div",
                    null,
                    v.a.createElement(
                      "div",
                      null,
                      v.a.createElement(
                        "div",
                        { className: "row" },
                        v.a.createElement(x.a, {
                          label: "Contact",
                          name: "contactId",
                          value: E,
                          options: r,
                          optionName: "fullName",
                          onChangeAction: this.handleInputChange,
                          required: q && "required",
                          error: a.docLinkedAtAny
                        }),
                        v.a.createElement(M.a, {
                          label: "Type",
                          name: "documentType",
                          value:
                            this.props.documentDetails.documentType &&
                            this.props.documentDetails.documentType.name,
                          readOnly: !0
                        })
                      ),
                      v.a.createElement(
                        "div",
                        { className: "row" },
                        v.a.createElement(x.a, {
                          label: "Groep",
                          name: "contactGroupId",
                          value: g,
                          options: o,
                          onChangeAction: this.handleInputChange,
                          required: q && "required",
                          error: a.docLinkedAtAny
                        }),
                        v.a.createElement(x.a, {
                          label: "Intake",
                          name: "intakeId",
                          value: b,
                          options: c,
                          onChangeAction: this.handleInputChange,
                          required: q && "required",
                          error: a.docLinkedAtAny
                        })
                      ),
                      v.a.createElement(
                        "div",
                        { className: "row" },
                        v.a.createElement(x.a, {
                          label: "Kans",
                          name: "opportunityId",
                          value: y,
                          options: i,
                          onChangeAction: this.handleInputChange,
                          required: q && "required",
                          error: a.docLinkedAtAny
                        }),
                        v.a.createElement(x.a, {
                          label: "Taak",
                          name: "taskId",
                          value: D,
                          options: d,
                          onChangeAction: this.handleInputChange,
                          required: q && "required",
                          error: a.docLinkedAtAny
                        })
                      ),
                      v.a.createElement(
                        "div",
                        { className: "row" },
                        v.a.createElement(x.a, {
                          label: "Offerteverzoek",
                          name: "quotationRequestId",
                          value: k,
                          options: u,
                          onChangeAction: this.handleInputChange,
                          required: q && "required",
                          error: a.docLinkedAtAny
                        }),
                        v.a.createElement(x.a, {
                          label: "Woningdossier",
                          name: "housingFileId",
                          value: w,
                          options: s,
                          onChangeAction: this.handleInputChange,
                          required: q && "required",
                          error: a.docLinkedAtAny
                        })
                      ),
                      v.a.createElement(
                        "div",
                        { className: "row" },
                        v.a.createElement(x.a, {
                          label: "Project",
                          name: "projectId",
                          value: T,
                          options: p,
                          onChangeAction: this.handleInputChange,
                          required: q && "required",
                          error: a.docLinkedAtAny
                        }),
                        v.a.createElement(x.a, {
                          label: "Deelnemer project",
                          name: "participantId",
                          value: O,
                          options: f,
                          onChangeAction: this.handleInputChange,
                          required: q && "required",
                          error: a.docLinkedAtAny
                        })
                      ),
                      v.a.createElement(
                        "div",
                        { className: "row" },
                        v.a.createElement(x.a, {
                          label: "Order",
                          name: "orderId",
                          value: h,
                          options: n,
                          onChangeAction: this.handleInputChange,
                          required: q && "required",
                          error: a.docLinkedAtAny
                        })
                      ),
                      "upload" === I &&
                        v.a.createElement(
                          "div",
                          { className: "row" },
                          v.a.createElement(x.a, {
                            label: "Maatregel",
                            name: "measureId",
                            value: C,
                            options: m,
                            onChangeAction: this.handleInputChange
                          }),
                          v.a.createElement(x.a, {
                            label: "Campagne",
                            name: "campaignId",
                            value: N,
                            options: l,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                      v.a.createElement(
                        "div",
                        { className: "row" },
                        v.a.createElement(U.a, {
                          label: "Template",
                          value: this.props.documentDetails.template
                            ? this.props.documentDetails.template.name
                            : "Geen"
                        })
                      ),
                      v.a.createElement(
                        "div",
                        { className: "row" },
                        v.a.createElement(
                          "div",
                          { className: "form-group col-sm-12" },
                          v.a.createElement(
                            "div",
                            { className: "row" },
                            v.a.createElement(
                              "div",
                              { className: "col-sm-3" },
                              v.a.createElement(
                                "label",
                                { className: "col-sm-12" },
                                "Omschrijving"
                              )
                            ),
                            v.a.createElement(
                              "div",
                              { className: "col-sm-6" },
                              v.a.createElement("input", {
                                type: "text",
                                className: "form-control input-sm",
                                name: "description",
                                value: A,
                                onChange: this.handleInputChange
                              })
                            )
                          )
                        )
                      ),
                      v.a.createElement(
                        "div",
                        { className: "row margin-30-top" },
                        v.a.createElement(M.a, {
                          label: "Documentgroep",
                          name: "documentGroup",
                          value:
                            this.props.documentDetails.documentGroup &&
                            this.props.documentDetails.documentGroup.name,
                          readOnly: !0
                        }),
                        v.a.createElement(M.a, {
                          label: "Bestandsnaam",
                          name: "filename",
                          value: this.props.documentDetails.filename,
                          readOnly: !0
                        })
                      )
                    ),
                    v.a.createElement(
                      P.a,
                      null,
                      v.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        v.a.createElement(S.a, {
                          buttonClassName: "btn-default",
                          buttonText: "Annuleren",
                          onClickAction: this.props.switchToView
                        }),
                        v.a.createElement(S.a, {
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
        te = Object(E.b)(
          function(e) {
            return { documentDetails: e.documentDetails };
          },
          function(e) {
            return {
              updateDocument: function(t) {
                e(Object(g.b)(t));
              }
            };
          }
        )(ee),
        ae = Object(E.b)(function(e) {
          return { documentDetails: e.documentDetails };
        })(function(e) {
          var t = e.documentDetails,
            a = (t.id, t.project),
            n = t.participant,
            r = t.contact,
            o = t.contactGroup,
            c = t.intake,
            i = t.opportunity,
            l = t.documentType,
            s = t.description,
            u = t.documentGroup,
            m = t.filename,
            d = t.template,
            p = t.task,
            f = t.quotationRequest,
            h = t.housingFile,
            E = t.campaign,
            g = t.measure,
            b = t.order;
          return v.a.createElement(
            "div",
            null,
            v.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              v.a.createElement(
                "div",
                { className: "row" },
                v.a.createElement(U.a, {
                  label: "Contact",
                  value: r && r.fullName
                }),
                v.a.createElement(U.a, { label: "Type", value: l && l.name })
              )
            ),
            v.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              v.a.createElement(
                "div",
                { className: "row" },
                v.a.createElement(U.a, { label: "Groep", value: o && o.name }),
                v.a.createElement(U.a, {
                  label: "Intake",
                  value: c && c.fullAddress
                })
              )
            ),
            v.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              v.a.createElement(
                "div",
                { className: "row" },
                v.a.createElement(U.a, {
                  label: "Kans",
                  value: i && i.measureCategory.name + " " + i.status.name
                }),
                v.a.createElement(U.a, { label: "Taak", value: p && p.name })
              )
            ),
            v.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              v.a.createElement(
                "div",
                { className: "row" },
                v.a.createElement(U.a, {
                  label: "Offerteverzoek",
                  value: f && f.name
                }),
                v.a.createElement(U.a, {
                  label: "Woningdossier",
                  value: h && housingFiles.name
                })
              )
            ),
            v.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              v.a.createElement(
                "div",
                { className: "row" },
                v.a.createElement(U.a, {
                  label: "Project",
                  value: a && a.name
                }),
                v.a.createElement(U.a, {
                  label: "Deelnemer project",
                  value: n && n.name
                })
              )
            ),
            v.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              v.a.createElement(
                "div",
                { className: "row" },
                v.a.createElement(U.a, { label: "Order", value: b && b.name })
              )
            ),
            "upload" === l &&
              v.a.createElement(
                "div",
                { className: "row", onClick: e.switchToEdit },
                v.a.createElement(
                  "div",
                  { className: "row" },
                  v.a.createElement(U.a, {
                    label: "Campagne",
                    value: E && E.name
                  }),
                  v.a.createElement(U.a, {
                    label: "Maatregel",
                    value: g && g.name
                  })
                )
              ),
            v.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              v.a.createElement(
                "div",
                { className: "row" },
                v.a.createElement(U.a, {
                  label: "Template",
                  value: d && d.name
                })
              )
            ),
            v.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              v.a.createElement(
                "div",
                { className: "col-sm-3" },
                v.a.createElement("label", null, "Omschrijving")
              ),
              v.a.createElement("div", { className: "col-sm-6" }, s)
            ),
            v.a.createElement(
              "div",
              { className: "row margin-30-top", onClick: e.switchToEdit },
              v.a.createElement(
                "div",
                { className: "row" },
                v.a.createElement(U.a, {
                  label: "Documentgroep",
                  value: u && u.name
                }),
                v.a.createElement(U.a, { label: "Bestandsnaam", value: m })
              )
            )
          );
        });
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return d()(this, a);
        };
      }
      var re = (function(e) {
          u()(a, e);
          var t = ne(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              y()(l()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              y()(l()(n), "switchToView", function() {
                n.setState({ showEdit: !1, activeDiv: "" });
              }),
              (n.state = { showEdit: !1, activeDiv: "" }),
              n
            );
          }
          return (
            c()(a, [
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
                    q.a,
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
                      R.a,
                      null,
                      this.state.showEdit &&
                        this.props.permissions.createDocument
                        ? v.a.createElement(te, {
                            switchToView: this.switchToView
                          })
                        : v.a.createElement(ae, {
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
        oe = Object(E.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(re),
        ce = a(7),
        ie = a.n(ce),
        le = Object(E.b)(function(e) {
          return { documentDetails: e.documentDetails };
        })(function(e) {
          var t = e.documentDetails,
            a = (t.owner, t.updatedBy, t.createdBy),
            n = void 0 === a ? {} : a,
            r = t.createdAt,
            o = void 0 === r ? {} : r,
            c = t.updatedAt,
            i = void 0 === c ? {} : c;
          return v.a.createElement(
            "div",
            null,
            v.a.createElement(
              "div",
              { className: "row" },
              v.a.createElement(U.a, {
                label: "Gemaakt door",
                value: n ? n.fullName : "Onbekend",
                link: n ? "gebruiker/" + n.id : ""
              })
            ),
            v.a.createElement(
              "div",
              { className: "row" },
              v.a.createElement(U.a, {
                label: "Gemaakt op",
                value: o ? ie()(o).format("L") : "Onbekend"
              }),
              v.a.createElement(U.a, {
                label: "Laatste update op",
                value: i ? ie()(i).format("L") : "Onbekend"
              })
            )
          );
        }),
        se = a(698),
        ue = function(e) {
          return v.a.createElement(
            q.a,
            null,
            v.a.createElement(
              se.a,
              null,
              v.a.createElement(
                "span",
                { className: "h5 text-bold" },
                "Afsluiting gegevens"
              )
            ),
            v.a.createElement(
              R.a,
              null,
              v.a.createElement(
                "div",
                { className: "col-md-12" },
                v.a.createElement(le, null)
              )
            )
          );
        };
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
            return r()(this, a), t.call(this, e);
          }
          return (
            c()(a, [
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
                      : Object(T.isEmpty)(this.props.documentDetails)
                      ? (e = "Geen document gevonden!")
                      : (t = !1),
                    t
                      ? v.a.createElement("div", null, e)
                      : v.a.createElement(
                          "div",
                          null,
                          v.a.createElement(oe, null),
                          v.a.createElement(ue, null)
                        )
                  );
                }
              }
            ]),
            a
          );
        })(h.Component),
        pe = Object(E.b)(function(e) {
          return {
            documentDetails: e.documentDetails,
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        }, null)(de),
        fe = a(711),
        he = a.n(fe);
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return d()(this, a);
        };
      }
      var Ee = (function(e) {
        u()(a, e);
        var t = ve(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            ((n = t.call(this, e)).download = n.download.bind(l()(n))),
            n
          );
        }
        return (
          c()(a, [
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
                C.a.download(this.props.documentDetails.id).then(function(t) {
                  he()(t.data, e.props.documentDetails.filename);
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
                      { className: "col-md-12 margin-10-top" },
                      v.a.createElement(
                        q.a,
                        null,
                        v.a.createElement(
                          R.a,
                          { className: "panel-small" },
                          v.a.createElement(O, { download: this.download })
                        )
                      )
                    ),
                    v.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      v.a.createElement(pe, null)
                    )
                  ),
                  v.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          a
        );
      })(h.Component);
      t.default = Object(E.b)(
        function(e) {
          return { documentDetails: e.documentDetails };
        },
        function(e) {
          return {
            fetchDocumentDetails: function(t) {
              e(Object(g.a)(t));
            }
          };
        }
      )(Ee);
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        c = a.n(o),
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
          className: c.a.string,
          onMouseEnter: c.a.func,
          onMouseLeave: c.a.func
        }),
        (t.a = i);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        c = a.n(o),
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
        (i.propTypes = { className: c.a.string }),
        (t.a = i);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        c = a.n(o),
        i = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            o = e.type,
            c = e.value,
            i = e.loading,
            l = e.loadText,
            s = e.disabled;
          return i
            ? r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: c,
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
                  type: o,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: c,
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
          buttonClassName: c.a.string,
          buttonText: c.a.string.isRequired,
          onClickAction: c.a.func,
          type: c.a.string,
          value: c.a.string,
          loading: c.a.bool,
          loadText: c.a.string,
          disabled: c.a.bool
        }),
        (t.a = i);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        c = a.n(o),
        i = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            o = e.title,
            c = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: c,
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
          buttonClassName: c.a.string,
          iconName: c.a.string.isRequired,
          onClickAction: c.a.func,
          title: c.a.string,
          disabled: c.a.bool
        }),
        (t.a = i);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        c = a.n(o),
        i = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            o = e.size,
            c = e.id,
            i = e.placeholder,
            l = e.name,
            s = e.value,
            u = e.onClickAction,
            m = e.onChangeAction,
            d = e.onBlurAction,
            p = e.required,
            f = e.readOnly,
            h = e.maxLength,
            v = e.error,
            E = e.min,
            g = e.max,
            b = e.step,
            y = e.errorMessage,
            N = e.divSize,
            w = e.divClassName,
            k = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(N, " ").concat(w) },
            r.a.createElement(
              "label",
              { htmlFor: c, className: "col-sm-6 ".concat(p) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(o) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (v ? "has-error" : ""),
                id: c,
                placeholder: i,
                name: l,
                value: s,
                onClick: u,
                onChange: m,
                onBlur: d,
                readOnly: f,
                maxLength: h,
                min: E,
                max: g,
                autoComplete: k,
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
          label: c.a.oneOfType([c.a.string, c.a.object]).isRequired,
          type: c.a.string,
          className: c.a.string,
          divClassName: c.a.string,
          size: c.a.string,
          divSize: c.a.string,
          id: c.a.string,
          placeholder: c.a.string,
          name: c.a.string.isRequired,
          value: c.a.oneOfType([c.a.string, c.a.number]),
          onClickAction: c.a.func,
          onChangeAction: c.a.func,
          onBlurAction: c.a.func,
          required: c.a.string,
          readOnly: c.a.bool,
          maxLength: c.a.string,
          error: c.a.bool,
          min: c.a.string,
          max: c.a.string,
          step: c.a.string,
          errorMessage: c.a.string,
          autoComplete: c.a.string
        }),
        (t.a = i);
    },
    695: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(4),
        c = a(8),
        i = a.n(c),
        l = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            c = e.value,
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
                    o.b,
                    { to: i, className: "link-underline" },
                    c
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
                r.a.createElement("div", { className: "col-sm-6", id: n }, c)
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
        o = a(8),
        c = a.n(o),
        i = function(e) {
          var t = e.label,
            a = e.className,
            n = e.size,
            o = e.id,
            c = e.name,
            i = e.value,
            l = e.options,
            s = e.onChangeAction,
            u = e.onBlurAction,
            m = e.required,
            d = e.error,
            p = e.errorMessage,
            f = e.optionValue,
            h = e.optionName,
            v = e.readOnly,
            E = e.placeholder,
            g = e.divClassName,
            b = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(g) },
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
                  name: c,
                  value: i,
                  onChange: s,
                  onBlur: u,
                  readOnly: v
                },
                b && r.a.createElement("option", { value: "" }, E),
                l.map(function(e) {
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
          label: c.a.string.isRequired,
          className: c.a.string,
          size: c.a.string,
          id: c.a.string,
          name: c.a.string.isRequired,
          options: c.a.array,
          value: c.a.oneOfType([c.a.string, c.a.number]),
          onChangeAction: c.a.func,
          onBlurAction: c.a.func,
          required: c.a.string,
          readOnly: c.a.bool,
          error: c.a.bool,
          errorMessage: c.a.string,
          emptyOption: c.a.bool,
          optionValue: c.a.string,
          optionName: c.a.string,
          placeholder: c.a.string
        }),
        (t.a = i);
    },
    698: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        c = a.n(o),
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
        (i.propTypes = { className: c.a.string }),
        (t.a = i);
    },
    702: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        c = a.n(o),
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
        (i.propTypes = { className: c.a.string }),
        (t.a = i);
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
            c = document.createElement("a");
          (c.style.display = "none"),
            (c.href = o),
            c.setAttribute("download", t),
            void 0 === c.download && c.setAttribute("target", "_blank"),
            document.body.appendChild(c),
            c.click(),
            setTimeout(function() {
              document.body.removeChild(c), window.URL.revokeObjectURL(o);
            }, 200);
        }
      };
    },
    871: function(e, t, a) {
      "use strict";
      a.d(t, "a", function() {
        return n;
      }),
        a.d(t, "b", function() {
          return r;
        });
      var n = function(e) {
          return { type: "FETCH_DOCUMENT_DETAILS", id: e };
        },
        r = function(e) {
          return { type: "UPDATE_DOCUMENT_DETAILS", document: e };
        };
    }
  }
]);
