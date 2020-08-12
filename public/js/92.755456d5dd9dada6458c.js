(window.webpackJsonp = window.webpackJsonp || []).push([
  [92],
  {
    1467: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(6),
        o = a.n(n),
        r = a(24),
        s = a.n(r),
        c = a(25),
        i = a.n(c),
        l = a(22),
        u = a.n(l),
        m = a(26),
        p = a.n(m),
        d = a(27),
        h = a.n(d),
        f = a(16),
        g = a.n(f),
        v = a(0),
        b = a.n(v),
        E = a(4),
        y = a(697),
        N = a.n(y),
        I = a(32),
        k = a(696),
        C = a(694),
        A = Object(I.b)(function(e) {
          return { documentTypes: e.systemData.documentTypes };
        }, null)(function(e) {
          var t = e.document,
            a = e.errors,
            n = e.contacts,
            o = void 0 === n ? [] : n,
            r = e.contactGroups,
            s = void 0 === r ? [] : r,
            c = e.intakes,
            i = void 0 === c ? [] : c,
            l = e.opportunities,
            u = void 0 === l ? [] : l,
            m = e.tasks,
            p = void 0 === m ? [] : m,
            d = e.quotationRequests,
            h = void 0 === d ? [] : d,
            f = e.housingFiles,
            g = void 0 === f ? [] : f,
            v = e.projects,
            E = void 0 === v ? [] : v,
            y = e.participants,
            N = void 0 === y ? [] : y,
            I = e.orders,
            A = void 0 === I ? [] : I,
            q = e.handleInputChange,
            D = e.documentTypes,
            j = t.contactId,
            T = t.contactGroupId,
            x = t.intakeId,
            R = t.opportunityId,
            S = t.documentType,
            w = t.description,
            G = t.taskId,
            O = t.quotationRequestId,
            M = t.housingFileId,
            P = t.projectId,
            F = t.participantId,
            L = t.orderId,
            z = D.find(function(e) {
              return e.id == S;
            }).name,
            B =
              "" === j &&
              "" === T &&
              "" === x &&
              "" === R &&
              "" === G &&
              "" === O &&
              "" === M &&
              "" === P &&
              "" === F &&
              "" === L;
          return b.a.createElement(
            "div",
            { className: "margin-30-bottom" },
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(k.a, {
                label: "Contact",
                name: "contactId",
                value: j,
                options: o,
                optionName: "fullName",
                onChangeAction: q,
                required: B && "required",
                error: a.docLinkedAtAny
              }),
              b.a.createElement(C.a, {
                label: "Type",
                name: "documentTypeName",
                value: z,
                readOnly: !0
              })
            ),
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(k.a, {
                label: "Groep",
                name: "contactGroupId",
                value: T,
                options: s,
                onChangeAction: q,
                required: B && "required",
                error: a.docLinkedAtAny
              }),
              b.a.createElement(k.a, {
                label: "Intake",
                name: "intakeId",
                value: x,
                options: i,
                onChangeAction: q,
                required: B && "required",
                error: a.docLinkedAtAny
              })
            ),
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(k.a, {
                label: "Kans",
                name: "opportunityId",
                value: R,
                options: u,
                onChangeAction: q,
                required: B && "required",
                error: a.docLinkedAtAny
              }),
              b.a.createElement(k.a, {
                label: "Taak",
                name: "taskId",
                value: G,
                options: p,
                onChangeAction: q,
                required: B && "required",
                error: a.docLinkedAtAny
              })
            ),
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(k.a, {
                label: "Offerteverzoek",
                name: "quotationRequestId",
                value: O,
                options: h,
                onChangeAction: q,
                required: B && "required",
                error: a.docLinkedAtAny
              }),
              b.a.createElement(k.a, {
                label: "Woningdossier",
                name: "housingFileId",
                value: M,
                options: g,
                onChangeAction: q,
                required: B && "required",
                error: a.docLinkedAtAny
              })
            ),
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(k.a, {
                label: "Project",
                name: "projectId",
                value: P,
                options: E,
                onChangeAction: q,
                required: B && "required",
                error: a.docLinkedAtAny
              }),
              b.a.createElement(k.a, {
                label: "Deelnemer project",
                name: "participantId",
                value: F,
                options: N,
                onChangeAction: q,
                required: B && "required",
                error: a.docLinkedAtAny
              })
            ),
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(k.a, {
                label: "Order",
                name: "orderId",
                value: L,
                options: A,
                onChangeAction: q,
                required: B && "required",
                error: a.docLinkedAtAny
              })
            ),
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(
                "div",
                { className: "form-group col-sm-12" },
                b.a.createElement(
                  "div",
                  { className: "row" },
                  b.a.createElement(
                    "div",
                    { className: "col-sm-3" },
                    b.a.createElement(
                      "label",
                      { className: "col-sm-12" },
                      "Omschrijving"
                    )
                  ),
                  b.a.createElement(
                    "div",
                    { className: "col-sm-6" },
                    b.a.createElement("input", {
                      type: "text",
                      className: "form-control input-sm",
                      name: "description",
                      value: w,
                      onChange: q
                    })
                  )
                )
              )
            )
          );
        }),
        q = a(702),
        D = a(690),
        j = a(691),
        T = a(692),
        x = Object(I.b)(function(e) {
          return {
            documentGroups: e.systemData.documentGroups,
            users: e.systemData.users
          };
        }, null)(function(e) {
          var t = e.document,
            a = e.templates,
            n = e.errors,
            o = e.handleInputChange,
            r = e.handleDocumentGroupChange,
            s = e.documentGroups,
            c = e.users,
            i = t.documentGroup,
            l = t.templateId,
            u = t.freeText1,
            m = t.freeText2,
            p = (t.filename, t.sentById);
          return b.a.createElement(
            "div",
            null,
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(k.a, {
                label: "Documentgroep",
                name: "documentGroup",
                value: i,
                options: s,
                onChangeAction: r,
                required: "required",
                error: n.documentGroup
              }),
              b.a.createElement(k.a, {
                label: "Template",
                name: "templateId",
                value: l,
                options: a,
                onChangeAction: o,
                required: "required",
                error: n.templateId
              })
            ),
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(
                "div",
                { className: "form-group col-sm-12" },
                b.a.createElement(
                  "div",
                  { className: "row" },
                  b.a.createElement(
                    "div",
                    { className: "col-sm-3" },
                    b.a.createElement(
                      "label",
                      { className: "col-sm-12" },
                      "Tekst veld 1"
                    )
                  ),
                  b.a.createElement(
                    "div",
                    { className: "col-sm-9" },
                    b.a.createElement("input", {
                      type: "text",
                      className: "form-control input-sm",
                      name: "freeText1",
                      value: u,
                      onChange: o
                    })
                  )
                )
              ),
              b.a.createElement(
                "div",
                { className: "form-group col-sm-12" },
                b.a.createElement(
                  "div",
                  { className: "row" },
                  b.a.createElement(
                    "div",
                    { className: "col-sm-3" },
                    b.a.createElement(
                      "label",
                      { className: "col-sm-12" },
                      "Tekst veld 2"
                    )
                  ),
                  b.a.createElement(
                    "div",
                    { className: "col-sm-9" },
                    b.a.createElement("input", {
                      type: "text",
                      className: "form-control input-sm",
                      name: "freeText2",
                      value: m,
                      onChange: o
                    })
                  )
                )
              )
            ),
            b.a.createElement(
              "div",
              { className: "row" },
              b.a.createElement(k.a, {
                label: "Afzender",
                name: "sentById",
                value: p,
                options: c,
                optionName: "fullName",
                onChangeAction: o
              })
            )
          );
        }),
        R = a(8),
        S = a.n(R),
        w = a(100),
        G = a(771).default,
        O = function(e) {
          var t = e.title,
            a = e.errors,
            n = e.multiple,
            o = e.maxSize,
            r = e.toggleModal,
            s = e.onDropAccepted,
            c = e.onDropRejected;
          return b.a.createElement(
            w.a,
            { closeModal: r, showConfirmAction: !1, title: t },
            b.a.createElement(
              "div",
              { className: "upload-file-content" },
              b.a.createElement(
                G,
                {
                  className: "dropzone",
                  onDropAccepted: function(e) {
                    setTimeout(function() {
                      s(e), r();
                    }, 300);
                  }.bind(void 0),
                  onDropRejected: c.bind(void 0),
                  maxSize: o,
                  multiple: n
                },
                b.a.createElement(
                  "p",
                  null,
                  "Klik hier voor het uploaden van een file"
                ),
                b.a.createElement(
                  "p",
                  null,
                  b.a.createElement("strong", null, "of"),
                  " sleep het bestand hierheen"
                )
              )
            ),
            a.uploadFailed &&
              b.a.createElement(
                "p",
                { className: "has-error-message" },
                "Uploaden mislukt. Probeer nogmaals het bestand te uploaden."
              ),
            a.uploadMaxSize &&
              b.a.createElement(
                "p",
                { className: "has-error-message" },
                "Uploaden mislukt. Het bestand mag maximaal ",
                o / 6e5,
                " groot zijn."
              )
          );
        };
      (O.defaultProps = {
        errors: {},
        maxSize: 6e6,
        multiple: !0,
        title: "Upload bestand"
      }),
        (O.propTypes = {
          errors: S.a.object,
          maxSize: S.a.number,
          multiple: S.a.bool,
          onDropAccepted: S.a.func.isRequired,
          onDropRejected: S.a.func.isRequired,
          title: S.a.string,
          toggleModal: S.a.func.isRequired
        });
      var M = O;
      function P(e) {
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
            n = g()(e);
          if (t) {
            var o = g()(this).constructor;
            a = Reflect.construct(n, arguments, o);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var F = (function(e) {
          p()(a, e);
          var t = P(a);
          function a(e) {
            var n;
            return (
              s()(this, a),
              ((n = t.call(this, e)).state = { showUploadModal: !1 }),
              (n.toggleUploadModal = n.toggleUploadModal.bind(u()(n))),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "toggleUploadModal",
                value: function() {
                  this.setState({
                    showUploadModal: !this.state.showUploadModal
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.props,
                    t = e.document,
                    a = e.errors,
                    n = e.handleInputChange,
                    o = e.documentGroups,
                    r = e.measures,
                    s = e.campaigns,
                    c = e.onDropAccepted,
                    i = e.onDropRejected,
                    l = t.documentGroup,
                    u = t.measureId,
                    m = t.campaignId,
                    p = t.attachment;
                  return b.a.createElement(
                    "div",
                    null,
                    b.a.createElement(
                      "div",
                      { className: "row" },
                      b.a.createElement(k.a, {
                        label: "Maatregel",
                        name: "measureId",
                        value: u,
                        options: r,
                        onChangeAction: n
                      }),
                      b.a.createElement(k.a, {
                        label: "Campagne",
                        name: "campaignId",
                        value: m,
                        options: s,
                        onChangeAction: n
                      })
                    ),
                    b.a.createElement(
                      "div",
                      { className: "row" },
                      b.a.createElement(k.a, {
                        label: "Documentgroep",
                        name: "documentGroup",
                        value: l,
                        options: o,
                        onChangeAction: n,
                        required: "required",
                        error: a.documentGroup
                      })
                    ),
                    b.a.createElement(
                      "div",
                      { className: "row" },
                      b.a.createElement(
                        "div",
                        { className: "form-group col-sm-6" },
                        b.a.createElement(
                          "label",
                          { className: "col-sm-6" },
                          "Kies bestand"
                        ),
                        b.a.createElement(
                          "div",
                          { className: "col-sm-6" },
                          b.a.createElement("input", {
                            type: "text",
                            className: "form-control input-sm col-sm-6 ".concat(
                              a.noDocument ? "has-error" : ""
                            ),
                            value: p && p.name,
                            onClick: this.toggleUploadModal
                          })
                        )
                      )
                    ),
                    this.state.showUploadModal &&
                      b.a.createElement(M, {
                        onDropAccepted: c.bind(this),
                        onDropRejected: i.bind(this),
                        toggleModal: this.toggleUploadModal,
                        multiple: !1,
                        errors: a
                      })
                  );
                }
              }
            ]),
            a
          );
        })(v.Component),
        L = Object(I.b)(function(e) {
          return { documentGroups: e.systemData.documentGroups };
        }, null)(F),
        z = function(e) {
          var t = e.document,
            a = e.projects,
            n = e.participants,
            o = e.orders,
            r = e.contacts,
            s = e.contactGroups,
            c = e.templates,
            i = e.intakes,
            l = e.opportunities,
            u = e.campaigns,
            m = e.housingFiles,
            p = e.quotationRequests,
            d = e.measures,
            h = e.tasks,
            f = e.errors,
            g = e.handleSubmit,
            v = e.handleInputChange,
            E = e.handleDocumentGroupChange,
            y = e.onDropAccepted,
            N = e.onDropRejected,
            I =
              "internal" === t.documentType
                ? "Maak document"
                : "Upload document";
          return b.a.createElement(
            "form",
            { className: "form-horizontal", onSubmit: g },
            b.a.createElement(
              D.a,
              null,
              b.a.createElement(
                j.a,
                null,
                b.a.createElement(A, {
                  tasks: h,
                  quotationRequests: p,
                  housingFiles: m,
                  document: t,
                  contacts: r,
                  contactGroups: s,
                  intakes: i,
                  opportunities: l,
                  projects: a,
                  participants: n,
                  orders: o,
                  errors: f,
                  handleInputChange: v
                }),
                "internal" === t.documentType
                  ? b.a.createElement(x, {
                      document: t,
                      errors: f,
                      handleInputChange: v,
                      templates: c,
                      handleDocumentGroupChange: E
                    })
                  : b.a.createElement(L, {
                      measures: d,
                      campaigns: u,
                      document: t,
                      errors: f,
                      handleInputChange: v,
                      onDropAccepted: y,
                      onDropRejected: N
                    }),
                b.a.createElement(
                  q.a,
                  null,
                  b.a.createElement(
                    "div",
                    { className: "pull-right" },
                    b.a.createElement(T.a, {
                      buttonText: I,
                      onClickAction: g,
                      type: "submit",
                      value: "Submit"
                    })
                  )
                )
              )
            )
          );
        },
        B = a(693),
        U = function(e) {
          e.handleSubmit;
          return b.a.createElement(
            "div",
            { className: "row" },
            b.a.createElement(
              "div",
              { className: "col-md-4" },
              b.a.createElement(
                "div",
                {
                  className:
                    "btn-group btn-group-flex margin-small margin-10-right",
                  role: "group"
                },
                b.a.createElement(B.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: E.e.goBack
                })
              )
            ),
            b.a.createElement(
              "div",
              { className: "col-md-4" },
              b.a.createElement(
                "h4",
                { className: "text-center margin-small" },
                "Nieuw document"
              )
            ),
            b.a.createElement("div", { className: "col-md-4" })
          );
        },
        K = a(151),
        V = (a(198), a(54)),
        H = a(206),
        J = a(209),
        W = a(102),
        Q = a(105),
        X = a(106),
        Y = a(107),
        Z = a(202),
        $ = a(214),
        _ = a(216),
        ee = a(211),
        te = a(203),
        ae = a(207),
        ne = a(210),
        oe = a(148);
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
      function se(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? re(Object(a), !0).forEach(function(t) {
                o()(e, t, a[t]);
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
      function ce(e) {
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
            n = g()(e);
          if (t) {
            var o = g()(this).constructor;
            a = Reflect.construct(n, arguments, o);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var ie = (function(e) {
        p()(a, e);
        var t = ce(a);
        function a(e) {
          var n;
          return (
            s()(this, a),
            ((n = t.call(this, e)).state = {
              contacts: [],
              contactsGroups: [],
              intakes: [],
              opportunities: [],
              templates: [],
              campaigns: [],
              housingFiles: [],
              quotationRequests: [],
              measures: [],
              tasks: [],
              projects: [],
              participants: [],
              orders: [],
              document: {
                contactId: n.props.params.contactId || "",
                contactGroupId: n.props.params.contactGroupId || "",
                intakeId: n.props.params.intakeId || "",
                opportunityId: n.props.params.opportunityId || "",
                campaignId: n.props.params.campaignId || "",
                housingFileId: n.props.params.housingFileId || "",
                quotationRequestId: n.props.params.quotationRequestId || "",
                measureId: n.props.params.measureId || "",
                taskId: n.props.params.taskId || "",
                projectId: n.props.params.projectId || "",
                participantId: n.props.params.participantId || "",
                orderId: n.props.params.orderId || "",
                documentType: n.props.params.type,
                description: "",
                documentGroup: "",
                templateId: "",
                freeText1: "",
                freeText2: "",
                sentById: "",
                attachment: "",
                filename: "temp"
              },
              errors: {
                docLinkedAtAny: !1,
                documentGroup: !1,
                uploadFailed: !1,
                templateId: !1,
                noDocument: !1
              }
            }),
            (n.handleInputChange = n.handleInputChange.bind(u()(n))),
            (n.handleSubmit = n.handleSubmit.bind(u()(n))),
            (n.onDropAccepted = n.onDropAccepted.bind(u()(n))),
            (n.onDropRejected = n.onDropRejected.bind(u()(n))),
            (n.handleDocumentGroupChange = n.handleDocumentGroupChange.bind(
              u()(n)
            )),
            n
          );
        }
        return (
          i()(a, [
            {
              key: "componentDidMount",
              value: function() {
                var e = this;
                W.a.getContactsPeek().then(function(t) {
                  e.setState({ contacts: t });
                }),
                  H.a.peekIntakes().then(function(t) {
                    e.setState({ intakes: t });
                  }),
                  V.a.peekContactGroups().then(function(t) {
                    e.setState({ contactGroups: t });
                  }),
                  J.a.peekOpportunities().then(function(t) {
                    e.setState({ opportunities: t });
                  }),
                  Q.a.fetchDocumentTemplatesPeekGeneral().then(function(t) {
                    e.setState({ templates: t });
                  }),
                  $.a.peekCampaigns().then(function(t) {
                    e.setState({ campaigns: t });
                  }),
                  _.a.peekHousingFiles().then(function(t) {
                    e.setState({ housingFiles: t });
                  }),
                  ee.a.peekQuotationRequests().then(function(t) {
                    e.setState({ quotationRequests: t });
                  }),
                  Y.a.peekTasks().then(function(t) {
                    e.setState({ tasks: t });
                  }),
                  X.a.peekMeasures().then(function(t) {
                    e.setState({ measures: t });
                  }),
                  te.a.peekProjects().then(function(t) {
                    e.setState({ projects: t });
                  }),
                  ae.a.peekParticipantsProjects().then(function(t) {
                    e.setState({ participants: t });
                  }),
                  ne.a.peekOrders().then(function(t) {
                    e.setState({ orders: t });
                  }),
                  this.props.params.emailAttachmentId &&
                    oe.a
                      .downloadAttachment(this.props.params.emailAttachmentId)
                      .then(function(t) {
                        var a = [new File([t.data], t.headers["x-filename"])];
                        (a.name = t.headers["x-filename"]),
                          e.setState(
                            se(
                              se({}, e.state),
                              {},
                              {
                                document: se(
                                  se({}, e.state.document),
                                  {},
                                  {
                                    attachment: a[0],
                                    filename: t.headers["x-filename"],
                                    contactId: t.headers["x-contactid"]
                                  }
                                )
                              }
                            )
                          );
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
                  se(
                    se({}, this.state),
                    {},
                    {
                      document: se(
                        se({}, this.state.document),
                        {},
                        o()({}, n, a)
                      )
                    }
                  )
                );
              }
            },
            {
              key: "handleDocumentGroupChange",
              value: function(e) {
                var t = this,
                  a = e.target,
                  n = "checkbox" === a.type ? a.checked : a.value,
                  r = a.name;
                this.setState(
                  se(
                    se({}, this.state),
                    {},
                    {
                      document: se(
                        se({}, this.state.document),
                        {},
                        o()({}, r, n)
                      )
                    }
                  )
                ),
                  Q.a.fetchDocumentTemplatesPeekGeneral().then(function(e) {
                    var a = [];
                    e.forEach(function(e) {
                      e.group == n && a.push({ id: e.id, name: e.name });
                    }),
                      t.setState({ templates: a });
                  });
              }
            },
            {
              key: "onDropAccepted",
              value: function(e) {
                this.setState(
                  se(
                    se({}, this.state),
                    {},
                    {
                      document: se(
                        se({}, this.state.document),
                        {},
                        { attachment: e[0], filename: e[0].name }
                      )
                    }
                  )
                );
              }
            },
            {
              key: "onDropRejected",
              value: function() {
                this.setState(
                  se(
                    se({}, this.state),
                    {},
                    {
                      errors: se(
                        se({}, this.state.errors),
                        {},
                        { uploadFailed: !0 }
                      )
                    }
                  )
                );
              }
            },
            {
              key: "handleSubmit",
              value: function(e) {
                var t = this;
                e.preventDefault();
                var a = this.state.document,
                  n = a.contactId,
                  o = a.contactGroupId,
                  r = a.intakeId,
                  s = a.opportunityId,
                  c = a.documentType,
                  i = a.description,
                  l = a.documentGroup,
                  u = a.templateId,
                  m = a.freeText1,
                  p = a.freeText2,
                  d = a.filename,
                  h = a.sentById,
                  f = a.campaignId,
                  g = a.housingFileId,
                  v = a.quotationRequestId,
                  b = a.measureId,
                  y = a.taskId,
                  I = a.projectId,
                  k = a.participantId,
                  C = a.orderId,
                  A = a.attachment,
                  q = {},
                  D = !1;
                if (
                  (N.a.isEmpty(n) &&
                    N.a.isEmpty(o) &&
                    N.a.isEmpty(r) &&
                    N.a.isEmpty(s) &&
                    N.a.isEmpty(g) &&
                    N.a.isEmpty(v) &&
                    N.a.isEmpty(I) &&
                    N.a.isEmpty(k) &&
                    N.a.isEmpty(y) &&
                    N.a.isEmpty(C) &&
                    ((q.docLinkedAtAny = !0), (D = !0)),
                  N.a.isEmpty(l) && ((q.documentGroup = !0), (D = !0)),
                  N.a.isEmpty(u) &&
                    "internal" == c &&
                    ((q.templateId = !0), (D = !0)),
                  N.a.isEmpty(A + "") &&
                    "upload" == c &&
                    ((q.noDocument = !0), (D = !0)),
                  this.setState(se(se({}, this.state), {}, { errors: q })),
                  !D)
                ) {
                  var j = new FormData();
                  j.append("contactId", n),
                    j.append("contactGroupId", o),
                    j.append("intakeId", r),
                    j.append("opportunityId", s),
                    j.append("documentType", c),
                    j.append("description", i),
                    j.append("documentGroup", l),
                    j.append("templateId", u),
                    j.append("freeText1", m),
                    j.append("freeText2", p),
                    j.append("filename", d),
                    j.append("sentById", h),
                    j.append("campaignId", f),
                    j.append("housingFileId", g),
                    j.append("quotationRequestId", v),
                    j.append("measureId", b),
                    j.append("taskId", y),
                    j.append("projectId", I),
                    j.append("participantId", k),
                    j.append("orderId", C),
                    j.append("attachment", A),
                    K.a
                      .newDocument(j)
                      .then(function(e) {
                        e.data.data.filename.toLowerCase().endsWith(".pdf")
                          ? E.f.push("/document/inzien/".concat(e.data.data.id))
                          : E.f.push("/document/".concat(e.data.data.id));
                      })
                      .catch(function(e) {
                        t.props.setError(e.response.status);
                      });
                }
              }
            },
            {
              key: "render",
              value: function() {
                return b.a.createElement(
                  "div",
                  { className: "row" },
                  b.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    b.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      b.a.createElement(
                        D.a,
                        null,
                        b.a.createElement(
                          j.a,
                          { className: "panel-small" },
                          b.a.createElement(U, {
                            handleSubmit: this.handleSubmit
                          })
                        )
                      )
                    ),
                    b.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      b.a.createElement(z, {
                        document: this.state.document,
                        contacts: this.state.contacts,
                        contactGroups: this.state.contactGroups,
                        intakes: this.state.intakes,
                        opportunities: this.state.opportunities,
                        templates: this.state.templates,
                        tasks: this.state.tasks,
                        measures: this.state.measures,
                        quotationRequests: this.state.quotationRequests,
                        housingFiles: this.state.housingFiles,
                        campaigns: this.state.campaigns,
                        projects: this.state.projects,
                        participants: this.state.participants,
                        orders: this.state.orders,
                        errors: this.state.errors,
                        handleSubmit: this.handleSubmit,
                        handleDocumentGroupChange: this
                          .handleDocumentGroupChange,
                        handleInputChange: this.handleInputChange,
                        onDropAccepted: this.onDropAccepted,
                        onDropRejected: this.onDropRejected
                      })
                    )
                  ),
                  b.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          a
        );
      })(v.Component);
      t.default = Object(I.b)(null, function(e) {
        return {
          setError: function(t) {
            e(Object(Z.b)(t));
          }
        };
      })(ie);
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        r = a(8),
        s = a.n(r),
        c = function(e) {
          var t = e.children,
            a = e.className,
            n = e.onMouseEnter,
            r = e.onMouseLeave;
          return o.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: r
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
          className: s.a.string,
          onMouseEnter: s.a.func,
          onMouseLeave: s.a.func
        }),
        (t.a = c);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        r = a(8),
        s = a.n(r),
        c = function(e) {
          var t = e.className,
            a = e.children;
          return o.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: s.a.string }),
        (t.a = c);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        r = a(8),
        s = a.n(r),
        c = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            r = e.type,
            s = e.value,
            c = e.loading,
            i = e.loadText,
            l = e.disabled;
          return c
            ? o.a.createElement(
                "button",
                {
                  type: r,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: s,
                  disabled: c
                },
                o.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                i
              )
            : o.a.createElement(
                "button",
                {
                  type: r,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: s,
                  disabled: l
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
          buttonClassName: s.a.string,
          buttonText: s.a.string.isRequired,
          onClickAction: s.a.func,
          type: s.a.string,
          value: s.a.string,
          loading: s.a.bool,
          loadText: s.a.string,
          disabled: s.a.bool
        }),
        (t.a = c);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        r = a(8),
        s = a.n(r),
        c = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            r = e.title,
            s = e.disabled;
          return o.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: s,
              title: r
            },
            o.a.createElement("span", { className: "glyphicon ".concat(a) })
          );
        };
      (c.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (c.propTypes = {
          buttonClassName: s.a.string,
          iconName: s.a.string.isRequired,
          onClickAction: s.a.func,
          title: s.a.string,
          disabled: s.a.bool
        }),
        (t.a = c);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        r = a(8),
        s = a.n(r),
        c = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            r = e.size,
            s = e.id,
            c = e.placeholder,
            i = e.name,
            l = e.value,
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
            N = e.divSize,
            I = e.divClassName,
            k = e.autoComplete;
          return o.a.createElement(
            "div",
            { className: "form-group ".concat(N, " ").concat(I) },
            o.a.createElement(
              "label",
              { htmlFor: s, className: "col-sm-6 ".concat(d) },
              t
            ),
            o.a.createElement(
              "div",
              { className: "".concat(r) },
              o.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (g ? "has-error" : ""),
                id: s,
                placeholder: c,
                name: i,
                value: l,
                onClick: u,
                onChange: m,
                onBlur: p,
                readOnly: h,
                maxLength: f,
                min: v,
                max: b,
                autoComplete: k,
                step: E
              })
            ),
            g &&
              o.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                o.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  y
                )
              )
          );
        };
      (c.defaultProps = {
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
        (c.propTypes = {
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
        (t.a = c);
    },
    696: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        r = a(8),
        s = a.n(r),
        c = function(e) {
          var t = e.label,
            a = e.className,
            n = e.size,
            r = e.id,
            s = e.name,
            c = e.value,
            i = e.options,
            l = e.onChangeAction,
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
          return o.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(b) },
            o.a.createElement(
              "label",
              { htmlFor: r, className: "col-sm-6 ".concat(m) },
              t
            ),
            o.a.createElement(
              "div",
              { className: "col-sm-6" },
              o.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(a) + (p && " has-error"),
                  id: r,
                  name: s,
                  value: c,
                  onChange: l,
                  onBlur: u,
                  readOnly: g
                },
                E && o.a.createElement("option", { value: "" }, v),
                i.map(function(e) {
                  return o.a.createElement(
                    "option",
                    { key: e[h], value: e[h] },
                    e[f]
                  );
                })
              )
            ),
            p &&
              o.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                o.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  d
                )
              )
          );
        };
      (c.defaultProps = {
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
        (c.propTypes = {
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
        (t.a = c);
    },
    702: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        r = a(8),
        s = a.n(r),
        c = function(e) {
          var t = e.className,
            a = e.children;
          return o.a.createElement(
            "div",
            { className: "panel-footer ".concat(t) },
            a
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: s.a.string }),
        (t.a = c);
    }
  }
]);
