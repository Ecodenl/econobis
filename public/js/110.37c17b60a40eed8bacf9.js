(window.webpackJsonp = window.webpackJsonp || []).push([
  [110],
  {
    1423: function(e, t, a) {
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
        m = a(16),
        p = a.n(m),
        d = a(0),
        f = a.n(d),
        h = a(32),
        v = a(22),
        E = a.n(v),
        g = a(6),
        b = a.n(g),
        y = a(4),
        w = a(690),
        j = a(691),
        N = a(693),
        C = a(100),
        O = a(726),
        k = Object(h.b)(null, function(e) {
          return {
            deleteProject: function(t) {
              e(Object(O.e)(t));
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
                return e.deleteProject(e.id), void e.closeDeleteItemModal();
              },
              title: "Verwijderen"
            },
            f.a.createElement(
              "p",
              null,
              "Weet u zeker dat u dit project wilt verwijderen?"
            )
          );
        });
      function D(e) {
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
      var S = (function(e) {
          c()(a, e);
          var t = D(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              b()(E()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              (n.state = { showDelete: !1 }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.props.project;
                  return f.a.createElement(
                    "div",
                    { className: "row" },
                    f.a.createElement(
                      "div",
                      { className: "col-sm-12" },
                      f.a.createElement(
                        w.a,
                        null,
                        f.a.createElement(
                          j.a,
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
                              f.a.createElement(N.a, {
                                iconName: "glyphicon-arrow-left",
                                onClickAction: y.e.goBack
                              }),
                              this.props.permissions.manageProject &&
                                f.a.createElement(N.a, {
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
                                "Project ",
                                e ? e.name : ""
                              )
                            )
                          ),
                          f.a.createElement("div", { className: "col-md-2" })
                        )
                      )
                    ),
                    this.state.showDelete &&
                      f.a.createElement(k, {
                        closeDeleteItemModal: this.toggleDelete,
                        id: e.id
                      })
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        R = Object(h.b)(function(e) {
          return {
            project: e.projectDetails,
            permissions: e.meDetails.permissions
          };
        })(S),
        I = a(198),
        P = a(7),
        T = a.n(P),
        A = a(697),
        L = a.n(A),
        x = a(692),
        W = a(702),
        G = a(152),
        _ = a(54),
        M = a(694),
        q = a(696),
        B = a(699),
        V = a(700),
        U = a(723),
        F = a(695),
        K = a(709),
        J = Object(h.b)(function(e) {
          return {
            projectStatuses: e.systemData.projectStatus,
            administrations: e.meDetails.administrations,
            users: e.systemData.users
          };
        })(function(e) {
          var t = e.name,
            a = e.code,
            n = e.description,
            r = e.projectStatusId,
            o = e.projectType,
            l = e.postalCode,
            i = e.address,
            c = e.city,
            s = e.dateStartRegistrations,
            u = e.dateEndRegistrations,
            m = e.ownedById,
            p = e.administrationId,
            d = e.administration,
            h = e.dateStart,
            v = e.dateEnd,
            E = e.dateEntry,
            g = e.contactGroupIds,
            b = e.dateProduction,
            y = e.isMembershipRequired,
            w = e.handleInputChange,
            j = e.handleInputChangeDate,
            N = e.handleContactGroupIds,
            C = e.handleReactSelectChange,
            O = e.projectStatuses,
            k = e.administrations,
            D = e.hasPaymentInvoices,
            S = e.users,
            R = e.contactGroups,
            I = e.errors,
            P = e.amountOfParticipants,
            T = e.documentTemplateAgreementId,
            A = e.documentTemplates,
            L = e.emailTemplateAgreementId,
            x = e.emailTemplates,
            W = e.linkAgreeTerms,
            G = e.linkUnderstandInfo,
            _ = O;
          return (
            P &&
              (_ = O.filter(function(e) {
                return "concept" !== e.codeRef;
              })),
            f.a.createElement(
              f.a.Fragment,
              null,
              f.a.createElement("h4", null, "Algemeen"),
              f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement(M.a, {
                  label: "Project",
                  name: "name",
                  value: t,
                  onChangeAction: w,
                  required: "required",
                  error: I.name
                }),
                f.a.createElement(M.a, {
                  label: "Projectcode",
                  name: "code",
                  value: a,
                  onChangeAction: w,
                  required: "required",
                  error: I.code
                })
              ),
              f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement(F.a, {
                  label: "Type project",
                  value: o && o.name,
                  className: "form-group col-sm-6"
                }),
                f.a.createElement(q.a, {
                  label: "Status",
                  name: "projectStatusId",
                  options: _,
                  value: r,
                  onChangeAction: w,
                  required: "required",
                  error: I.projectStatusId
                })
              ),
              f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement(
                  "div",
                  { className: "form-group col-sm-12" },
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    f.a.createElement(
                      "div",
                      { className: "col-sm-3" },
                      f.a.createElement(
                        "label",
                        { htmlFor: "description", className: "col-sm-12" },
                        "Omschrijving"
                      )
                    ),
                    f.a.createElement(
                      "div",
                      { className: "col-sm-8" },
                      f.a.createElement("textarea", {
                        name: "description",
                        value: n,
                        onChange: w,
                        className: "form-control input-sm"
                      })
                    )
                  )
                )
              ),
              f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement(M.a, {
                  label: "Postcode",
                  name: "postalCode",
                  value: l,
                  onChangeAction: w,
                  error: I.postalCode
                }),
                f.a.createElement(M.a, {
                  label: "Adres",
                  name: "address",
                  value: i,
                  onChangeAction: w
                })
              ),
              f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement(M.a, {
                  label: "Plaats",
                  name: "city",
                  value: c,
                  onChangeAction: w
                })
              ),
              f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement(B.a, {
                  label: "Start inschrijving",
                  name: "dateStartRegistrations",
                  value: s,
                  onChangeAction: j
                }),
                f.a.createElement(q.a, {
                  label: "Verantwoordelijke",
                  name: "ownedById",
                  options: S,
                  optionName: "fullName",
                  value: m,
                  onChangeAction: w,
                  required: "required",
                  error: I.ownedById
                })
              ),
              f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement(B.a, {
                  label: "Eind inschrijving",
                  name: "dateEndRegistrations",
                  value: u,
                  onChangeAction: j
                }),
                D
                  ? f.a.createElement(M.a, {
                      label: "Administratie",
                      name: "administration",
                      value: d ? d.name : "",
                      readOnly: !0
                    })
                  : f.a.createElement(q.a, {
                      label: "Administratie",
                      name: "administrationId",
                      options: k,
                      value: p,
                      onChangeAction: w,
                      required: "required",
                      error: I.administrationId
                    })
              ),
              f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement(B.a, {
                  label: "Start project",
                  name: "dateStart",
                  value: h,
                  onChangeAction: j
                }),
                f.a.createElement(V.a, {
                  label: "Deelname aan groep verplicht",
                  name: "isMembershipRequired",
                  value: y,
                  onChangeAction: w
                })
              ),
              f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement(B.a, {
                  label: "Einde project",
                  name: "dateEnd",
                  value: v,
                  onChangeAction: j
                }),
                1 == y &&
                  f.a.createElement(
                    "div",
                    { className: "row" },
                    f.a.createElement(U.a, {
                      label: "Onderdeel van groep",
                      name: "contactGroupsIds",
                      options: R,
                      value: g,
                      onChangeAction: N,
                      error: I.contactGroupIds,
                      required: "required"
                    })
                  )
              ),
              f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement(B.a, {
                  label: "Start productie",
                  name: "dateProduction",
                  value: b,
                  onChangeAction: j
                }),
                f.a.createElement(B.a, {
                  label: "Standaard ingangsdatum mutatie",
                  name: "dateEntry",
                  value: E,
                  onChangeAction: j
                })
              ),
              f.a.createElement("h4", null, "Contacten portal instellingen"),
              f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement(M.a, {
                  label: "Voorwaarden link",
                  name: "linkAgreeTerms",
                  value: W,
                  onChangeAction: w,
                  error: I.linkAgreeTerms
                })
              ),
              f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement(M.a, {
                  label: "Projectinformatie link",
                  name: "linkUnderstandInfo",
                  value: G,
                  onChangeAction: w,
                  error: I.linkUnderstandInfo
                })
              ),
              f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement(K.a, {
                  label: "Document template inschrijfformulier",
                  name: "documentTemplateAgreementId",
                  options: A,
                  value: T,
                  onChangeAction: C,
                  multi: !1,
                  error: I.documentTemplateAgreementId
                })
              ),
              f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement(K.a, {
                  label: "E-mail template inschrijfbevestiging",
                  name: "emailTemplateAgreementId",
                  options: x,
                  value: L,
                  onChangeAction: C,
                  multi: !1,
                  error: I.emailTemplateAgreementId
                })
              )
            )
          );
        }),
        z = a(1056),
        H = a(1057),
        X = a(1058),
        Z = a(1059),
        Q = a(104),
        Y = a(105);
      function $(e, t) {
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
      function ee(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? $(Object(a), !0).forEach(function(t) {
                b()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : $(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
            n = p()(e);
          if (t) {
            var r = p()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      T.a.locale("nl");
      var ae = (function(e) {
          c()(a, e);
          var t = te(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              b()(E()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  ee(
                    ee({}, n.state),
                    {},
                    { project: ee(ee({}, n.state.project), {}, b()({}, r, a)) }
                  )
                );
              }),
              b()(E()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.project,
                  a = {},
                  r = !1;
                L.a.isEmpty(t.name) && ((a.name = !0), (r = !0)),
                  L.a.isEmpty("" + t.code) && ((a.code = !0), (r = !0)),
                  t.projectStatusId || ((a.projectStatusId = !0), (r = !0)),
                  L.a.isEmpty("" + t.ownedById) &&
                    ((a.ownedById = !0), (r = !0)),
                  L.a.isEmpty("" + t.administrationId) &&
                    ((a.administrationId = !0), (r = !0)),
                  L.a.isEmpty("" + t.postalCode) ||
                    L.a.isPostalCode(t.postalCode, "any") ||
                    ((a.postalCode = !0), (r = !0)),
                  t.isMembershipRequired &&
                    L.a.isEmpty(t.contactGroupIds) &&
                    ((a.contactGroupIds = !0), (r = !0)),
                  t.isMembershipRequired || (t.contactGroupIds = ""),
                  isNaN(t.amountOfLoanNeeded) &&
                    (t.amountOfLoanNeeded = t.amountOfLoanNeeded.replace(
                      /,/g,
                      "."
                    )),
                  isNaN(t.minAmountLoan) &&
                    (t.minAmountLoan = t.minAmountLoan.replace(/,/g, ".")),
                  isNaN(t.maxAmountLoan) &&
                    (t.maxAmountLoan = t.maxAmountLoan.replace(/,/g, ".")),
                  n.setState(ee(ee({}, n.state), {}, { errors: a })),
                  r ||
                    (n.setState({ isSaving: !0 }),
                    G.a.updateProject(t.id, t).then(function(e) {
                      n.setState({ isSaving: !1 }),
                        n.props.fetchProject(t.id),
                        n.props.switchToView();
                    }));
              }),
              b()(E()(n), "handleContactGroupIds", function(e) {
                n.setState(
                  ee(
                    ee({}, n.state),
                    {},
                    {
                      project: ee(
                        ee({}, n.state.project),
                        {},
                        { contactGroupIds: e }
                      )
                    }
                  )
                );
              }),
              (n.state = {
                contactGroups: [],
                emailTemplates: [],
                documentTemplates: [],
                project: ee(
                  ee({}, e.project),
                  {},
                  {
                    isMembershipRequired: Boolean(
                      e.project.isMembershipRequired
                    ),
                    isParticipationTransferable: Boolean(
                      e.project.isParticipationTransferable
                    ),
                    contactGroupIds:
                      e.project.requiresContactGroups &&
                      e.project.requiresContactGroups
                        .map(function(e) {
                          return e.id;
                        })
                        .join(",")
                  }
                ),
                errors: {
                  name: !1,
                  code: !1,
                  projectStatusId: !1,
                  ownedById: !1,
                  postalCode: !1,
                  contactGroupIds: !1
                },
                isSaving: !1
              }),
              (n.handleInputChangeDate = n.handleInputChangeDate.bind(E()(n))),
              (n.handleReactSelectChange = n.handleReactSelectChange.bind(
                E()(n)
              )),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  _.a.peekContactGroups().then(function(t) {
                    e.setState({ contactGroups: t });
                  }),
                    Q.a.fetchEmailTemplatesPeek().then(function(t) {
                      e.setState({ emailTemplates: t });
                    }),
                    Y.a.fetchDocumentTemplatesPeekGeneral().then(function(t) {
                      var a = [];
                      t.forEach(function(e) {
                        "registration" == e.group &&
                          a.push({ id: e.id, name: e.name });
                      }),
                        e.setState({ documentTemplates: a });
                    });
                }
              },
              {
                key: "handleInputChangeDate",
                value: function(e, t) {
                  this.setState(
                    ee(
                      ee({}, this.state),
                      {},
                      {
                        project: ee(
                          ee({}, this.state.project),
                          {},
                          b()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "handleReactSelectChange",
                value: function(e, t) {
                  this.setState({
                    project: ee(ee({}, this.state.project), {}, b()({}, t, e))
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.project,
                    t = e.name,
                    a = e.code,
                    n = e.description,
                    r = e.projectStatusId,
                    o = e.projectTypeId,
                    l = e.projectType,
                    i = e.address,
                    c = e.postalCode,
                    s = e.city,
                    u = e.dateStartRegistrations,
                    m = e.dateEndRegistrations,
                    p = e.ownedById,
                    d = e.administrationId,
                    h = e.dateStart,
                    v = e.dateEnd,
                    E = e.dateEntry,
                    g = e.dateProduction,
                    b = e.contactGroupIds,
                    y = e.isMembershipRequired,
                    w = e.amountOfLoanNeeded,
                    j = e.minAmountLoan,
                    N = e.maxAmountLoan,
                    C = e.ean,
                    O = e.eanManager,
                    k = e.warrantyOrigin,
                    D = e.eanSupply,
                    S = e.participationWorth,
                    R = e.powerKwAvailable,
                    I = e.maxParticipations,
                    P = e.taxReferral,
                    T = e.totalParticipations,
                    A = e.minParticipations,
                    L = e.isParticipationTransferable,
                    G = e.postalcodeLink,
                    _ = e.documentTemplateAgreementId,
                    M = (e.documentTemplates, e.emailTemplateAgreementId),
                    q = (e.emailTemplates, e.linkAgreeTerms),
                    B = e.linkUnderstandInfo,
                    V = this.props.project,
                    U = V.participationsDefinitive,
                    F = V.participationsGranted,
                    K = V.participationsOptioned,
                    Q = V.participationsInteressed,
                    Y = V.amountDefinitive,
                    $ = V.amountGranted,
                    ee = V.amountOptioned,
                    te = V.amountInteressed,
                    ae = V.administration,
                    ne = V.hasPaymentInvoices,
                    re = V.valueCourses,
                    oe = V.amountOfParticipants;
                  return f.a.createElement(
                    "form",
                    {
                      className: "form-horizontal col-md-12",
                      onSubmit: this.handleSubmit
                    },
                    f.a.createElement(J, {
                      name: t,
                      code: a,
                      description: n,
                      projectStatusId: r,
                      projectType: l,
                      address: i,
                      postalCode: c,
                      city: s,
                      dateStartRegistrations: u,
                      dateEndRegistrations: m,
                      ownedById: p,
                      administrationId: d,
                      administration: ae,
                      hasPaymentInvoices: ne,
                      dateStart: h,
                      dateEnd: v,
                      dateEntry: E,
                      dateProduction: g,
                      contactGroupIds: b,
                      isMembershipRequired: y,
                      handleInputChange: this.handleInputChange,
                      handleInputChangeDate: this.handleInputChangeDate,
                      handleContactGroupIds: this.handleContactGroupIds,
                      handleReactSelectChange: this.handleReactSelectChange,
                      errors: this.state.errors,
                      contactGroups: this.state.contactGroups,
                      amountOfParticipants: oe,
                      documentTemplateAgreementId: _,
                      documentTemplates: this.state.documentTemplates,
                      emailTemplateAgreementId: M,
                      emailTemplates: this.state.emailTemplates,
                      linkAgreeTerms: q,
                      linkUnderstandInfo: B
                    }),
                    l && "loan" === l.codeRef
                      ? f.a.createElement(z.a, {
                          amountOfLoanNeeded: w,
                          minAmountLoan: j,
                          maxAmountLoan: N,
                          amountDefinitive: Y,
                          amountGranted: $,
                          amountOptioned: ee,
                          amountInteressed: te,
                          handleInputChange: this.handleInputChange
                        })
                      : null,
                    l && "obligation" === l.codeRef
                      ? f.a.createElement(H.a, {
                          participationWorth: S,
                          totalParticipations: T,
                          participationsDefinitive: U,
                          participationsGranted: F,
                          participationsOptioned: K,
                          participationsInteressed: Q,
                          powerKwAvailable: R,
                          minParticipations: A,
                          maxParticipations: I,
                          isParticipationTransferable: L,
                          valueCourses: re,
                          handleInputChange: this.handleInputChange,
                          projectTypeId: o
                        })
                      : null,
                    (l && "capital" === l.codeRef) ||
                      (l && "postalcode_link_capital" === l.codeRef)
                      ? f.a.createElement(X.a, {
                          participationWorth: S,
                          totalParticipations: T,
                          participationsDefinitive: U,
                          participationsGranted: F,
                          participationsOptioned: K,
                          participationsInteressed: Q,
                          powerKwAvailable: R,
                          minParticipations: A,
                          maxParticipations: I,
                          isParticipationTransferable: L,
                          valueCourses: re,
                          handleInputChange: this.handleInputChange,
                          projectTypeId: o
                        })
                      : null,
                    l && "postalcode_link_capital" === l.codeRef
                      ? f.a.createElement(Z.a, {
                          postalcodeLink: G,
                          ean: C,
                          taxReferral: P,
                          eanManager: O,
                          warrantyOrigin: k,
                          eanSupply: D,
                          handleInputChange: this.handleInputChange,
                          projectTypeId: o
                        })
                      : null,
                    f.a.createElement(
                      W.a,
                      null,
                      f.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        f.a.createElement(x.a, {
                          buttonClassName: "btn-default",
                          buttonText: "Annuleren",
                          onClickAction: this.props.switchToView
                        }),
                        f.a.createElement(x.a, {
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
        ne = Object(h.b)(
          function(e) {
            return {
              project: e.projectDetails,
              projectTypes: e.systemData.projectTypes
            };
          },
          function(e) {
            return {
              fetchProject: function(t) {
                e(Object(O.h)(t));
              }
            };
          }
        )(ae),
        re = Object(h.b)(function(e) {
          return {
            administrations: e.meDetails.administrations,
            users: e.systemData.users
          };
        })(function(e) {
          var t = e.name,
            a = e.code,
            n = e.description,
            r = e.projectStatus,
            o = e.projectType,
            l = e.postalCode,
            i = e.address,
            c = e.city,
            s = e.dateStartRegistrations,
            u = e.dateEndRegistrations,
            m = e.ownedBy,
            p = e.administration,
            d = e.dateStart,
            h = e.dateEnd,
            v = e.dateEntry,
            E = (e.contactGroupIds, e.dateProduction),
            g = e.isMembershipRequired,
            b =
              (e.administrations,
              e.hasPaymentInvoices,
              e.requiresContactGroups),
            y = e.documentTemplateAgreement,
            w = e.emailTemplateAgreement,
            j = e.linkAgreeTerms,
            N = e.linkUnderstandInfo;
          return f.a.createElement(
            f.a.Fragment,
            null,
            f.a.createElement("h4", null, "Algemeen"),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, { label: "Project", value: t }),
              f.a.createElement(F.a, { label: "Projectcode", value: a })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Type project",
                value: o ? o.name : ""
              }),
              f.a.createElement(F.a, {
                label: "Status",
                value: r ? r.name : ""
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(
                "div",
                { className: "col-sm-3" },
                f.a.createElement(
                  "label",
                  { htmlFor: "description", className: "col-sm-12" },
                  "Omschrijving"
                )
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-9", id: "description" },
                n
              )
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, { label: "Postcode", value: l }),
              f.a.createElement(F.a, { label: "Adres", value: i })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, { label: "Plaats", value: c })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Start inschrijving",
                value: s ? T()(s).format("L") : ""
              }),
              f.a.createElement(F.a, {
                label: "Verantwoordelijke",
                value: m ? m.fullName : ""
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Eind inschrijving",
                value: u ? T()(u).format("L") : ""
              }),
              f.a.createElement(F.a, {
                label: "Administratie",
                value: p ? p.name : ""
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Start project",
                value: d ? T()(d).format("L") : ""
              }),
              f.a.createElement(F.a, {
                label: "Deelname aan groep verplicht",
                value: g ? "Ja" : "Nee"
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Einde project",
                value: h ? T()(h).format("L") : ""
              }),
              g
                ? f.a.createElement(F.a, {
                    label: "Onderdeel van groep",
                    value:
                      b &&
                      b
                        .map(function(e) {
                          return e.name;
                        })
                        .join(", ")
                  })
                : null
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Start productie",
                value: E ? T()(E).format("L") : ""
              }),
              f.a.createElement(F.a, {
                label: "Standaard ingangsdatum mutatie",
                value: v ? T()(v).format("L") : ""
              })
            ),
            f.a.createElement("h4", null, "Contacten portal instellingen"),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, { label: "Voorwaarden link", value: j })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Projectinformatie link",
                value: N
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Document template inschrijfformulier",
                value: y ? y.name : ""
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Email template inschrijfbevestiging",
                value: w ? w.name : ""
              })
            )
          );
        }),
        oe = a(713),
        le = function(e) {
          var t = e.amountOfLoanNeeded,
            a = e.minAmountLoan,
            n = e.maxAmountLoan,
            r = e.amountDefinitive,
            o = e.amountGranted,
            l = e.amountOptioned,
            i = e.amountInteressed,
            c = t - r;
          return f.a.createElement(
            f.a.Fragment,
            null,
            f.a.createElement("hr", { style: { margin: "10px 0" } }),
            f.a.createElement("h4", null, "Lening"),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Lening nodig",
                value: Object(oe.a)(t)
              }),
              f.a.createElement(F.a, {
                label: "Lening interesse",
                value: Object(oe.a)(i)
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Min. bedrag lening",
                value: Object(oe.a)(a)
              }),
              f.a.createElement(F.a, {
                label: "Lening ingeschreven",
                value: Object(oe.a)(l)
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Max. bedrag lening",
                value: Object(oe.a)(n)
              }),
              f.a.createElement(F.a, {
                label: "Lening toegekend",
                value: Object(oe.a)(o)
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement("div", { className: "form-group col-md-6" }),
              f.a.createElement(F.a, {
                label: "Lening opgehaald",
                value: Object(oe.a)(r)
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement("div", { className: "form-group col-md-6" }),
              f.a.createElement(F.a, {
                label: "Lening uit te geven",
                value: Object(oe.a)(c)
              })
            )
          );
        },
        ie = function(e) {
          var t = e.participationWorth,
            a = e.totalParticipations,
            n = e.participationsDefinitive,
            r = e.participationsGranted,
            o = e.participationsOptioned,
            l = e.participationsInteressed,
            i = e.powerKwAvailable,
            c = e.minParticipations,
            s = e.maxParticipations,
            u = e.isParticipationTransferable,
            m = e.valueCourses,
            p = m
              ? m.find(function(e) {
                  return e.active;
                })
              : [],
            d = a - n;
          return f.a.createElement(
            f.a.Fragment,
            null,
            f.a.createElement("hr", { style: { margin: "10px 0" } }),
            f.a.createElement(
              "h4",
              null,
              "Obligatie, Kapitaal of Postcoderoos kapitaal"
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Nominale waarde obligatie",
                value: Object(oe.a)(t)
              }),
              f.a.createElement(F.a, {
                label: "Obligaties interesse",
                value: l || ""
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Huidige hoofdsom",
                value: p && Object(oe.a)(p.bookWorth)
              }),
              f.a.createElement(F.a, {
                label: "Obligaties ingeschreven",
                value: o || ""
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Huidige overdrachtswaarde",
                value: p && Object(oe.a)(p.transferWorth)
              }),
              f.a.createElement(F.a, {
                label: "Obligaties toegekend",
                value: r || ""
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Aantal obligaties nodig",
                value: a
              }),
              f.a.createElement(F.a, {
                label: "Uitgegeven obligaties",
                value: n || ""
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Min. obligaties p/p",
                value: c
              }),
              f.a.createElement(F.a, {
                label: "Uit te geven obligaties",
                value: d || ""
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Max. aantal obligaties p/p",
                value: s
              }),
              f.a.createElement(F.a, {
                label: "Opgesteld vermogen kWh",
                value: i
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Obligaties overdraagbaar",
                value: u ? "Ja" : "Nee"
              })
            )
          );
        },
        ce = function(e) {
          var t = e.postalcodeLink,
            a = e.taxReferral,
            n = e.eanManager,
            r = e.ean,
            o = e.warrantyOrigin,
            l = e.eanSupply;
          return f.a.createElement(
            f.a.Fragment,
            null,
            f.a.createElement("hr", { style: { margin: "10px 0" } }),
            f.a.createElement("h4", null, "Postcoderoos kapitaal"),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, { label: "Postcoderoos", value: t }),
              f.a.createElement(F.a, {
                label: "Aanwijzing Belastingdienst",
                value: a
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "EAN Adres installatie",
                value: r
              }),
              f.a.createElement(F.a, { label: "EAN Netbeheer", value: n })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, { label: "EAN afnemer", value: l }),
              f.a.createElement(F.a, {
                label: "Garantie van oorsprong (Certiq)",
                value: o
              })
            )
          );
        },
        se = function(e) {
          var t = e.participationWorth,
            a = e.totalParticipations,
            n = e.participationsDefinitive,
            r = e.participationsGranted,
            o = e.participationsOptioned,
            l = e.participationsInteressed,
            i = e.powerKwAvailable,
            c = e.minParticipations,
            s = e.maxParticipations,
            u = e.isParticipationTransferable,
            m = e.valueCourses.find(function(e) {
              return e.active;
            }),
            p = a - n;
          return f.a.createElement(
            f.a.Fragment,
            null,
            f.a.createElement("hr", { style: { margin: "10px 0" } }),
            f.a.createElement(
              "h4",
              null,
              "Obligatie, Kapitaal of Postcoderoos kapitaal"
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Nominale waarde participatie",
                value: Object(oe.a)(t)
              }),
              f.a.createElement(F.a, {
                label: "Participaties interesse",
                value: l || ""
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Huidige boekwaarde",
                value: m && Object(oe.a)(m.bookWorth)
              }),
              f.a.createElement(F.a, {
                label: "Participaties ingeschreven",
                value: o || ""
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Huidige overdrachtswaarde",
                value: m && Object(oe.a)(m.transferWorth)
              }),
              f.a.createElement(F.a, {
                label: "Participaties toegekend",
                value: r || ""
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Aantal participaties nodig",
                value: a
              }),
              f.a.createElement(F.a, {
                label: "Uitgegeven participaties",
                value: n || ""
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Min. aantal participaties p/p",
                value: c
              }),
              f.a.createElement(F.a, {
                label: "Uit te geven participaties",
                value: p || ""
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Max. aantal participaties p/p",
                value: s
              }),
              f.a.createElement(F.a, {
                label: "Opgesteld vermogen kWh",
                value: i
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Participaties overdraagbaar",
                value: u ? "Ja" : "Nee"
              })
            )
          );
        };
      T.a.locale("nl");
      var ue = Object(h.b)(function(e) {
        return { project: e.projectDetails };
      })(function(e) {
        var t = e.project,
          a = t.name,
          n = t.code,
          r = t.description,
          o = t.ownedBy,
          l = t.projectStatus,
          i = t.dateStart,
          c = t.dateEnd,
          s = t.dateEntry,
          u = t.dateProduction,
          m = t.dateStartRegistrations,
          p = t.dateEndRegistrations,
          d = t.projectType,
          h = t.postalCode,
          v = t.address,
          E = t.city,
          g = t.ean,
          b = t.eanManager,
          y = t.warrantyOrigin,
          w = t.eanSupply,
          j = t.participationWorth,
          N = t.powerKwAvailable,
          C = t.maxParticipations,
          O = t.taxReferral,
          k = t.totalParticipations,
          D = t.minParticipations,
          S = t.isMembershipRequired,
          R = t.isParticipationTransferable,
          I = t.administration,
          P = t.postalcodeLink,
          T = t.requiresContactGroups,
          A = t.amountOfLoanNeeded,
          L = t.minAmountLoan,
          x = t.maxAmountLoan,
          W = t.valueCourses,
          G = t.participationsDefinitive,
          _ = t.participationsGranted,
          M = t.participationsOptioned,
          q = t.participationsInteressed,
          B = t.amountDefinitive,
          V = t.amountGranted,
          U = t.amountOptioned,
          F = t.amountInteressed,
          K = t.documentTemplateAgreement,
          J = t.emailTemplateAgreement,
          z = t.linkAgreeTerms,
          H = t.linkUnderstandInfo;
        return f.a.createElement(
          "section",
          {
            onClick:
              "concept" === l.codeRef || "active" === l.codeRef
                ? e.switchToEdit
                : null
          },
          f.a.createElement(re, {
            name: a,
            code: n,
            description: r,
            projectStatus: l,
            projectType: d,
            address: v,
            postalCode: h,
            city: E,
            dateStartRegistrations: m,
            dateEndRegistrations: p,
            ownedBy: o,
            administration: I,
            dateStart: i,
            dateEnd: c,
            dateEntry: s,
            dateProduction: u,
            isMembershipRequired: S,
            requiresContactGroups: T,
            documentTemplateAgreement: K,
            emailTemplateAgreement: J,
            linkAgreeTerms: z,
            linkUnderstandInfo: H
          }),
          d && "loan" === d.codeRef
            ? f.a.createElement(le, {
                amountOfLoanNeeded: A,
                minAmountLoan: L,
                maxAmountLoan: x,
                amountDefinitive: B,
                amountGranted: V,
                amountOptioned: U,
                amountInteressed: F
              })
            : null,
          d && "obligation" === d.codeRef
            ? f.a.createElement(ie, {
                participationWorth: j,
                totalParticipations: k,
                participationsDefinitive: G,
                participationsGranted: _,
                participationsOptioned: M,
                participationsInteressed: q,
                powerKwAvailable: N,
                minParticipations: D,
                maxParticipations: C,
                isParticipationTransferable: R,
                valueCourses: W
              })
            : null,
          (d && "capital" === d.codeRef) ||
            (d && "postalcode_link_capital" === d.codeRef)
            ? f.a.createElement(se, {
                participationWorth: j,
                totalParticipations: k,
                participationsDefinitive: G,
                participationsGranted: _,
                participationsOptioned: M,
                participationsInteressed: q,
                powerKwAvailable: N,
                minParticipations: D,
                maxParticipations: C,
                isParticipationTransferable: R,
                valueCourses: W
              })
            : null,
          d && "postalcode_link_capital" === d.codeRef
            ? f.a.createElement(ce, {
                postalcodeLink: P,
                ean: g,
                taxReferral: O,
                eanManager: b,
                warrantyOrigin: y,
                eanSupply: w
              })
            : null
        );
      });
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
            n = p()(e);
          if (t) {
            var r = p()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var pe = (function(e) {
          c()(a, e);
          var t = me(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              b()(E()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              b()(E()(n), "switchToView", function() {
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
                  return f.a.createElement(
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
                    f.a.createElement(
                      j.a,
                      null,
                      this.state.showEdit &&
                        this.props.permissions.manageProject
                        ? f.a.createElement(ne, {
                            switchToView: this.switchToView
                          })
                        : f.a.createElement(ue, {
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
        de = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(pe);
      T.a.locale("nl");
      var fe = Object(h.b)(function(e) {
          return { projectDetails: e.projectDetails };
        })(function(e) {
          var t = e.projectDetails,
            a = t.createdAt,
            n = t.createdBy,
            r = t.updatedAt,
            o = t.updatedBy;
          return f.a.createElement(
            "div",
            null,
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Gemaakt door",
                value: n ? n.fullName : "Onbekend",
                link: n ? "gebruiker/" + n.id : ""
              }),
              f.a.createElement(F.a, {
                label: "Laatste update door",
                value: o ? o.fullName : "Onbekend",
                link: o ? "gebruiker/" + o.id : ""
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(F.a, {
                label: "Gemaakt op",
                value: a ? T()(a).format("L") : "Onbekend"
              }),
              f.a.createElement(F.a, {
                label: "Laatste update op",
                value: r ? T()(r).format("L") : "Onbekend"
              })
            )
          );
        }),
        he = a(698),
        ve = function(e) {
          return f.a.createElement(
            w.a,
            null,
            f.a.createElement(
              he.a,
              null,
              f.a.createElement(
                "span",
                { className: "h5 text-bold" },
                "Afsluiting gegevens"
              )
            ),
            f.a.createElement(
              j.a,
              null,
              f.a.createElement(
                "div",
                { className: "col-md-12" },
                f.a.createElement(fe, null)
              )
            )
          );
        },
        Ee = a(199),
        ge = a.n(Ee),
        be = a(222),
        ye = Object(h.b)(function(e) {
          return {
            permissions: e.meDetails.permissions,
            projectType: e.projectDetails.projectType
          };
        })(function(e) {
          var t = e.valueCourse,
            a = t.project,
            n = t.date,
            r = t.bookWorth,
            o = t.transferWorth,
            l = t.active;
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
              f.a.createElement(
                "div",
                { className: "col-sm-3" },
                a ? a.name : ""
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                n ? T()(n).format("L") : ""
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                Object(oe.a)(r)
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                Object(oe.a)(o)
              ),
              f.a.createElement("div", { className: "col-sm-2" }, l ? "Ja" : "")
            ),
            f.a.createElement(
              "div",
              { className: "col-sm-1" },
              e.showActionButtons
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
        }),
        we = Object(h.b)(function(e) {
          return {
            phoneNumberTypes: e.systemData.phoneNumberTypes,
            projectType: e.projectDetails.projectType
          };
        }, null)(function(e) {
          var t = e.valueCourse,
            a = e.handleInputChangeDate,
            n = e.handleInputChange,
            r = e.handleSubmit,
            o = e.cancelEdit,
            l = e.errors,
            i = e.projectType,
            c = e.isSaving,
            s = t.project,
            u = t.date,
            m = t.bookWorth,
            p = t.transferWorth,
            d = t.active,
            h = t.createdAt,
            v = t.createdBy;
          return f.a.createElement(
            "form",
            { className: "form-horizontal", onSubmit: r },
            f.a.createElement(
              w.a,
              { className: "panel-grey" },
              f.a.createElement(
                j.a,
                null,
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(M.a, {
                    label: "Project",
                    id: "project",
                    name: "project",
                    value: s ? s.name : "",
                    readOnly: !0
                  }),
                  f.a.createElement(B.a, {
                    label: "Datum",
                    id: "date",
                    name: "date",
                    value: u,
                    onChangeAction: a,
                    required: "required",
                    error: l.date
                  })
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(M.a, {
                    type: "number",
                    label:
                      "obligation" !== i.codeRef ? "Boekwaarde" : "Hoofdsom",
                    id: "bookWorth",
                    name: "bookWorth",
                    value: m,
                    onChangeAction: n,
                    required: "required",
                    error: l.bookWorth
                  }),
                  f.a.createElement(M.a, {
                    type: "number",
                    label: "Overdrachtswaarde",
                    id: "transferWorth",
                    name: "transferWorth",
                    value: p || "",
                    onChangeAction: n,
                    error: l.transferWorth
                  })
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(V.a, {
                    label: "Actief",
                    name: "active",
                    value: d,
                    onChangeAction: n
                  })
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(M.a, {
                    label: "Gemaakt op",
                    name: "createdAt",
                    value: h ? T()(h).format("L") : "",
                    readOnly: !0
                  }),
                  f.a.createElement(M.a, {
                    label: "Gemaakt door",
                    name: "createdBy",
                    value: v ? v.fullName : "",
                    readOnly: !0
                  })
                ),
                f.a.createElement(
                  "div",
                  { className: "pull-right btn-group", role: "group" },
                  f.a.createElement(x.a, {
                    buttonClassName: "btn-default",
                    buttonText: "Annuleren",
                    onClickAction: o
                  }),
                  f.a.createElement(x.a, {
                    buttonText: "Opslaan",
                    onClickAction: r,
                    type: "submit",
                    value: "Submit",
                    loading: c
                  })
                )
              )
            )
          );
        }),
        je = Object(h.b)(null, function(e) {
          return {
            deleteValueCourse: function(t) {
              e(Object(O.g)(t));
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
                return e.deleteValueCourse(e.id), void e.closeDeleteItemModal();
              },
              title: "Verwijderen"
            },
            f.a.createElement("p", null, "Verwijder waardeverloop")
          );
        });
      function Ne(e, t) {
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
      function Ce(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Ne(Object(a), !0).forEach(function(t) {
                b()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Ne(Object(a)).forEach(function(t) {
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
      var ke = (function(e) {
          c()(a, e);
          var t = Oe(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              b()(E()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              b()(E()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              b()(E()(n), "openEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              b()(E()(n), "closeEdit", function() {
                n.setState({ showEdit: !1 });
              }),
              b()(E()(n), "cancelEdit", function() {
                n.setState(
                  Ce(Ce({}, n.state), {}, { valueCourse: n.props.valueCourse })
                ),
                  n.closeEdit();
              }),
              b()(E()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              b()(E()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Ce(
                    Ce({}, n.state),
                    {},
                    {
                      valueCourse: Ce(
                        Ce({}, n.state.valueCourse),
                        {},
                        b()({}, r, a)
                      )
                    }
                  )
                ),
                  (n.handleInputChangeDate = n.handleInputChangeDate.bind(
                    E()(n)
                  ));
              }),
              b()(E()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.valueCourse,
                  a = {},
                  r = !1;
                t.bookWorth
                  ? isNaN(t.bookWorth) &&
                    (t.bookWorth = t.bookWorth.replace(/,/g, "."))
                  : ((a.bookWorth = !0), (r = !0)),
                  isNaN(t.transferWorth) &&
                    (t.transferWorth = t.transferWorth.replace(/,/g, ".")),
                  t.date || ((a.date = !0), (r = !0)),
                  n.setState({ errors: a }),
                  r ||
                    (n.setState({ isSaving: !0 }),
                    be.a.updateProjectValueCourse(t.id, t).then(function(e) {
                      n.props.updateValueCourse(e),
                        n.setState({ isSaving: !1 }),
                        n.closeEdit();
                    }));
              }),
              (n.state = {
                showActionButtons: !1,
                highlightLine: "",
                showEdit: !1,
                showDelete: !1,
                valueCourse: e.valueCourse,
                errors: { bookWorth: !1, date: !1 },
                isSaving: !1
              }),
              (n.handleInputChangeDate = n.handleInputChangeDate.bind(E()(n))),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "componentDidUpdate",
                value: function(e) {
                  Object(I.isEqual)(e.valueCourse, this.props.valueCourse) ||
                    this.setState(
                      Ce(
                        Ce({}, this.state),
                        {},
                        { valueCourse: this.props.valueCourse }
                      )
                    );
                }
              },
              {
                key: "handleInputChangeDate",
                value: function(e, t) {
                  this.setState(
                    Ce(
                      Ce({}, this.state),
                      {},
                      {
                        valueCourse: Ce(
                          Ce({}, this.state.valueCourse),
                          {},
                          b()({}, t, e)
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
                    f.a.createElement(ye, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      openEdit: this.openEdit,
                      toggleDelete: this.toggleDelete,
                      valueCourse: this.state.valueCourse
                    }),
                    this.state.showEdit &&
                      this.props.permissions.manageFinancial &&
                      f.a.createElement(we, {
                        valueCourse: this.state.valueCourse,
                        handleInputChange: this.handleInputChange,
                        handleInputChangeDate: this.handleInputChangeDate,
                        handleSubmit: this.handleSubmit,
                        errors: this.state.errors,
                        cancelEdit: this.cancelEdit,
                        isSaving: this.state.isSaving
                      }),
                    this.state.showDelete &&
                      this.props.permissions.manageFinancial &&
                      f.a.createElement(
                        je,
                        ge()(
                          { closeDeleteItemModal: this.toggleDelete },
                          this.props.valueCourse
                        )
                      )
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        De = Object(h.b)(
          function(e) {
            return {
              permissions: e.meDetails.permissions,
              projectType: e.projectDetails.projectType
            };
          },
          function(e) {
            return {
              updateValueCourse: function(t) {
                e(Object(O.n)(t));
              }
            };
          }
        )(ke),
        Se = Object(h.b)(function(e) {
          return {
            valueCourses: e.projectDetails.valueCourses,
            projectType: e.projectDetails.projectType
          };
        })(function(e) {
          var t = e.projectType,
            a = e.valueCourses;
          return f.a.createElement(
            "div",
            null,
            f.a.createElement(
              "div",
              { className: "row header" },
              f.a.createElement("div", { className: "col-sm-3" }, "Project"),
              f.a.createElement("div", { className: "col-sm-2" }, "Datum"),
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                "obligation" === t.codeRef ? "Hoofdsom" : "Boekwaarde"
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Overdrachtswaarde"
              ),
              f.a.createElement("div", { className: "col-sm-2" }, "Actief"),
              f.a.createElement("div", { className: "col-sm-1" })
            ),
            a.length > 0
              ? a.map(function(e) {
                  return f.a.createElement(De, { key: e.id, valueCourse: e });
                })
              : f.a.createElement("div", null, "Geen waardeverloop bekend.")
          );
        });
      function Re(e, t) {
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
            ? Re(Object(a), !0).forEach(function(t) {
                b()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Re(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
            n = p()(e);
          if (t) {
            var r = p()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var Te = (function(e) {
          c()(a, e);
          var t = Pe(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              b()(E()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Ie(
                    Ie({}, n.state),
                    {},
                    {
                      valueCourse: Ie(
                        Ie({}, n.state.valueCourse),
                        {},
                        b()({}, r, a)
                      )
                    }
                  )
                );
              }),
              b()(E()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.valueCourse,
                  a = {},
                  r = !1;
                t.bookWorth
                  ? isNaN(t.bookWorth) &&
                    (t.bookWorth = t.bookWorth.replace(/,/g, "."))
                  : ((a.bookWorth = !0), (r = !0)),
                  isNaN(t.transferWorth) &&
                    (t.transferWorth = t.transferWorth.replace(/,/g, ".")),
                  t.date || ((a.date = !0), (r = !0)),
                  n.setState({ errors: a }),
                  r ||
                    (n.setState({ isSaving: !0 }),
                    be.a.storeProjectValueCourse(t).then(function(e) {
                      n.props.newValueCourse(e),
                        n.setState({ isSaving: !1 }),
                        n.props.toggleShowNew();
                    }));
              }),
              (n.state = {
                projectName: n.props.name,
                valueCourse: {
                  projectId: n.props.id,
                  date: "",
                  bookWorth: "",
                  transferWorth: "",
                  active: !1
                },
                errors: { bookWorth: !1, date: !1 },
                isSaving: !1
              }),
              (n.handleInputChangeDate = n.handleInputChangeDate.bind(E()(n))),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "handleInputChangeDate",
                value: function(e, t) {
                  this.setState(
                    Ie(
                      Ie({}, this.state),
                      {},
                      {
                        valueCourse: Ie(
                          Ie({}, this.state.valueCourse),
                          {},
                          b()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.valueCourse,
                    t = e.date,
                    a = e.bookWorth,
                    n = e.transferWorth,
                    r = e.active;
                  return f.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    f.a.createElement(
                      w.a,
                      { className: "panel-grey" },
                      f.a.createElement(
                        j.a,
                        null,
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(M.a, {
                            label: "Project",
                            name: "projectName",
                            value: this.state.projectName,
                            readOnly: !0
                          }),
                          f.a.createElement(B.a, {
                            label: "Datum",
                            name: "date",
                            value: t,
                            onChangeAction: this.handleInputChangeDate,
                            required: "required",
                            error: this.state.errors.date
                          })
                        ),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(M.a, {
                            type: "number",
                            label:
                              "obligation" === this.props.projectType.codeRef
                                ? "Hoofdsom"
                                : " Boekwaarde",
                            name: "bookWorth",
                            value: a,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.bookWorth
                          }),
                          f.a.createElement(M.a, {
                            type: "number",
                            label: "Overdrachtswaarde",
                            name: "transferWorth",
                            value: n,
                            onChangeAction: this.handleInputChange,
                            error: this.state.errors.transferWorth
                          })
                        ),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(V.a, {
                            label: "Actief",
                            name: "active",
                            value: r,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        f.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          f.a.createElement(x.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          f.a.createElement(x.a, {
                            buttonText: "Opslaan",
                            onClickAction: this.handleSubmit,
                            type: "submit",
                            value: "Submit",
                            loading: this.state.isSaving
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
        Ae = Object(h.b)(
          function(e) {
            return {
              id: e.projectDetails.id,
              name: e.projectDetails.name,
              projectType: e.projectDetails.projectType
            };
          },
          function(e) {
            return {
              newValueCourse: function(t) {
                e(Object(O.k)(t));
              }
            };
          }
        )(Te);
      function Le(e) {
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
      var xe = (function(e) {
          c()(a, e);
          var t = Le(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              b()(E()(n), "toggleShowNew", function() {
                n.setState({ showNew: !n.state.showNew });
              }),
              (n.state = { showNew: !1 }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  return f.a.createElement(
                    w.a,
                    null,
                    f.a.createElement(
                      he.a,
                      null,
                      f.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Waardeverloop deelnames"
                      ),
                      this.props.permissions.manageFinancial &&
                        f.a.createElement(N.a, {
                          buttonClassName: "pull-right btn btn-link",
                          onClickAction: this.toggleShowNew,
                          iconName: "glyphicon-plus"
                        })
                    ),
                    f.a.createElement(
                      j.a,
                      null,
                      f.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        f.a.createElement(Se, null)
                      ),
                      f.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          f.a.createElement(Ae, {
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
        })(xe),
        Ge = Object(h.b)(function(e) {
          return {
            permissions: e.meDetails.permissions,
            projectTypeCodeRef: e.projectDetails.projectType.codeRef
          };
        })(function(e) {
          var t = e.revenue,
            a = e.projectTypeCodeRef,
            n = e.showActionButtons,
            r = e.permissions,
            o = e.toggleDelete,
            l = e.highlightLine,
            i = e.onLineEnter,
            c = e.onLineLeave,
            s = t.id,
            u = t.confirmed,
            m = t.category,
            p = t.dateBegin,
            d = t.dateEnd,
            h = t.datePayed,
            v = t.type,
            E = t.revenue,
            g = t.kwhResult;
          return f.a.createElement(
            "div",
            {
              className: "row border ".concat(l),
              onMouseEnter: function() {
                return i();
              },
              onMouseLeave: function() {
                return c();
              }
            },
            f.a.createElement(
              "div",
              { className: "col-sm-1" },
              m ? m.name : ""
            ),
            f.a.createElement(
              "div",
              { className: "col-sm-2" },
              p ? T()(p).format("L") : ""
            ),
            f.a.createElement(
              "div",
              { className: "col-sm-2" },
              d ? T()(d).format("L") : ""
            ),
            f.a.createElement(
              "div",
              { className: "col-sm-2" },
              h ? T()(h).format("L") : ""
            ),
            f.a.createElement(
              "div",
              { className: "col-sm-2" },
              v ? v.name : ""
            ),
            f.a.createElement("div", { className: "col-sm-1" }, E || ""),
            "postalcode_link_capital" === a
              ? f.a.createElement("div", { className: "col-sm-1" }, g || "")
              : f.a.createElement("div", { className: "col-sm-1" }),
            f.a.createElement(
              "div",
              { className: "col-sm-1" },
              n
                ? f.a.createElement(
                    "a",
                    {
                      role: "button",
                      onClick: function() {
                        return y.f.push("/project/opbrengst/".concat(s));
                      }
                    },
                    f.a.createElement("span", {
                      className: "glyphicon ".concat(
                        u ? "glyphicon-eye-open" : "glyphicon-pencil",
                        " mybtn-success"
                      )
                    }),
                    " "
                  )
                : "",
              n && r.manageFinancial && !u
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
          );
        }),
        _e = Object(h.b)(null, function(e) {
          return {
            deleteRevenue: function(t) {
              e(Object(O.f)(t));
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
                return e.deleteRevenue(e.id), void e.closeDeleteItemModal();
              },
              title: "Verwijderen"
            },
            f.a.createElement("p", null, "Verwijder opbrengst?")
          );
        });
      function Me(e, t) {
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
      function qe(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Me(Object(a), !0).forEach(function(t) {
                b()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Me(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Be(e) {
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
      var Ve = (function(e) {
          c()(a, e);
          var t = Be(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              b()(E()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              b()(E()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              b()(E()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              (n.state = {
                showActionButtons: !1,
                highlightLine: "",
                showDelete: !1,
                revenue: qe({}, e.revenue)
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  return f.a.createElement(
                    "div",
                    null,
                    f.a.createElement(Ge, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      toggleDelete: this.toggleDelete,
                      revenue: this.state.revenue
                    }),
                    this.state.showDelete &&
                      f.a.createElement(
                        _e,
                        ge()(
                          { closeDeleteItemModal: this.toggleDelete },
                          this.props.revenue
                        )
                      )
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        Ue = Object(h.b)(function(e) {
          return {
            revenues: e.projectDetails.revenues,
            projectTypeCodeRef: e.projectDetails.projectType.codeRef
          };
        })(function(e) {
          var t = e.revenues,
            a = e.projectTypeCodeRef;
          return f.a.createElement(
            "div",
            null,
            f.a.createElement(
              "div",
              { className: "row header" },
              f.a.createElement("div", { className: "col-sm-1" }, "Soort"),
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Begin periode"
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Eind periode"
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Uitgekeerd op"
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Type opbrengst"
              ),
              f.a.createElement("div", { className: "col-sm-1" }, "Bedrag"),
              "postalcode_link_capital" === a
                ? f.a.createElement("div", { className: "col-sm-1" }, "kWh")
                : f.a.createElement("div", { className: "col-sm-1" }),
              f.a.createElement("div", { className: "col-sm-1" })
            ),
            t.length > 0
              ? t.map(function(e) {
                  return f.a.createElement(Ve, { key: e.id, revenue: e });
                })
              : f.a.createElement("div", null, "Geen opbrengsten bekend.")
          );
        }),
        Fe = Object(h.b)(function(e) {
          return {
            permissions: e.meDetails.permissions,
            projectStatus: e.projectDetails.projectStatus,
            projectRevenues: e.projectDetails.revenues,
            projectType: e.projectDetails.projectType,
            projectRevenueCategories: e.systemData.projectRevenueCategories
          };
        })(function(e) {
          var t = e.permissions,
            a = e.projectId,
            n = e.projectStatus,
            r = e.projectType,
            o = e.projectRevenues,
            l = e.projectRevenueCategories,
            i = !1,
            c = !1,
            s = !1,
            u = !1,
            m = "Nieuwe opbrengst Euro verdeling maken",
            p = "Nieuwe opbrengst Kwh verdeling maken",
            d = "Nieuwe aflossing Euro verdeling maken";
          "active" !== n.codeRef &&
            ((i = !0),
            (m =
              "Opbrengst verdeling kan alleen bij status actief worden toegevoegd"),
            (p =
              "Opbrengst verdeling kan alleen bij status actief worden toegevoegd"),
            (d =
              "Aflossing verdeling kan alleen bij status actief worden toegevoegd"));
          var h = l.find(function(e) {
              return "revenueEuro" === e.codeRef;
            }).id,
            v = l.find(function(e) {
              return "revenueKwh" === e.codeRef;
            }).id,
            E = l.find(function(e) {
              return "redemptionEuro" === e.codeRef;
            }).id;
          return (
            o.map(function(e) {
              e.categoryId == h &&
                0 == e.confirmed &&
                ((c = !0), (m = "Lopende euro opbrengst verdeling al actief")),
                e.categoryId == v &&
                  0 == e.confirmed &&
                  ((s = !0),
                  (p = "Lopende kwh opbrengst is verdeling al actief")),
                e.categoryId == E &&
                  0 == e.confirmed &&
                  ((u = !0),
                  (d = "Lopende euro aflossing verdeling al actief"));
            }),
            f.a.createElement(
              w.a,
              null,
              f.a.createElement(
                he.a,
                null,
                f.a.createElement(
                  "span",
                  { className: "h5 text-bold" },
                  "Opbrengsten"
                ),
                t.manageFinancial &&
                  f.a.createElement(
                    f.a.Fragment,
                    null,
                    "capital" === r.codeRef
                      ? f.a.createElement(N.a, {
                          buttonClassName: "pull-right btn btn-link",
                          onClickAction: function() {
                            return y.f.push(
                              "/project/opbrengst/nieuw/"
                                .concat(a, "/")
                                .concat(h)
                            );
                          },
                          disabled: i || c,
                          title: m,
                          iconName: "glyphicon-plus"
                        })
                      : "",
                    "postalcode_link_capital" === r.codeRef
                      ? f.a.createElement(
                          "div",
                          {
                            className: "nav navbar-nav btn-group pull-right",
                            role: "group"
                          },
                          f.a.createElement(
                            "button",
                            {
                              className: "btn btn-link",
                              "data-toggle": "dropdown"
                            },
                            f.a.createElement("span", {
                              className: "glyphicon glyphicon-plus"
                            })
                          ),
                          f.a.createElement(
                            "ul",
                            { className: "dropdown-menu" },
                            f.a.createElement(
                              "li",
                              { className: i || c ? "disabled" : null },
                              i || c
                                ? f.a.createElement(
                                    "a",
                                    {
                                      role: "button",
                                      title: m,
                                      onClick: function() {}
                                    },
                                    "Opbrengst Euro"
                                  )
                                : f.a.createElement(
                                    "a",
                                    {
                                      role: "button",
                                      title: m,
                                      onClick: function() {
                                        return y.f.push(
                                          "/project/opbrengst/nieuw/"
                                            .concat(a, "/")
                                            .concat(h)
                                        );
                                      }
                                    },
                                    "Opbrengst Euro"
                                  )
                            ),
                            f.a.createElement(
                              "li",
                              { className: i || s ? "disabled" : null },
                              i || s
                                ? f.a.createElement(
                                    "a",
                                    {
                                      role: "button",
                                      title: p,
                                      onClick: function() {}
                                    },
                                    "Opbrengst Kwh"
                                  )
                                : f.a.createElement(
                                    "a",
                                    {
                                      role: "button",
                                      title: p,
                                      onClick: function() {
                                        return y.f.push(
                                          "/project/opbrengst/nieuw/"
                                            .concat(a, "/")
                                            .concat(v)
                                        );
                                      }
                                    },
                                    "Opbrengst Kwh"
                                  )
                            )
                          )
                        )
                      : "",
                    "loan" === r.codeRef || "obligation" === r.codeRef
                      ? f.a.createElement(
                          "div",
                          {
                            className: "nav navbar-nav btn-group pull-right",
                            role: "group"
                          },
                          f.a.createElement(
                            "button",
                            {
                              className: "btn btn-link",
                              "data-toggle": "dropdown"
                            },
                            f.a.createElement("span", {
                              className: "glyphicon glyphicon-plus"
                            })
                          ),
                          f.a.createElement(
                            "ul",
                            { className: "dropdown-menu" },
                            f.a.createElement(
                              "li",
                              { className: i || c ? "disabled" : null },
                              i || c
                                ? f.a.createElement(
                                    "a",
                                    {
                                      role: "button",
                                      title: m,
                                      onClick: function() {}
                                    },
                                    "Opbrengst Euro"
                                  )
                                : f.a.createElement(
                                    "a",
                                    {
                                      role: "button",
                                      title: m,
                                      onClick: function() {
                                        return y.f.push(
                                          "/project/opbrengst/nieuw/"
                                            .concat(a, "/")
                                            .concat(h)
                                        );
                                      }
                                    },
                                    "Opbrengst Euro"
                                  )
                            ),
                            f.a.createElement(
                              "li",
                              { className: i || u ? "disabled" : null },
                              i || u
                                ? f.a.createElement(
                                    "a",
                                    {
                                      role: "button",
                                      title: d,
                                      onClick: function() {}
                                    },
                                    "Aflossing Euro"
                                  )
                                : f.a.createElement(
                                    "a",
                                    {
                                      role: "button",
                                      title: d,
                                      onClick: function() {
                                        return y.f.push(
                                          "/project/opbrengst/nieuw/"
                                            .concat(a, "/")
                                            .concat(E)
                                        );
                                      }
                                    },
                                    "Aflossing Euro"
                                  )
                            )
                          )
                        )
                      : ""
                  )
              ),
              f.a.createElement(
                j.a,
                null,
                f.a.createElement(
                  "div",
                  { className: "col-md-12" },
                  f.a.createElement(Ue, null)
                )
              )
            )
          );
        });
      function Ke(e) {
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
      var Je = (function(e) {
          c()(a, e);
          var t = Ke(a);
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
                      ? (e = "Fout bij het ophalen van project.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : Object(I.isEmpty)(this.props.project)
                      ? (e = "Geen gegevens gevonden.")
                      : (t = !1),
                    t
                      ? f.a.createElement("div", null, e)
                      : f.a.createElement(
                          "div",
                          null,
                          f.a.createElement(de, null),
                          this.props.project.projectType &&
                            "loan" !== this.props.project.projectType.codeRef
                            ? f.a.createElement(We, null)
                            : null,
                          f.a.createElement(Fe, {
                            projectId: this.props.project.id
                          }),
                          f.a.createElement(ve, null)
                        )
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        ze = Object(h.b)(function(e) {
          return {
            project: e.projectDetails,
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        })(Je),
        He = a(986);
      function Xe(e) {
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
      var Ze = (function(e) {
        c()(a, e);
        var t = Xe(a);
        function a(e) {
          return r()(this, a), t.call(this, e);
        }
        return (
          l()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchProject(this.props.params.id);
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearProject();
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
                      f.a.createElement(ze, null)
                    )
                  ),
                  f.a.createElement(
                    w.a,
                    { className: "col-md-3 harmonica" },
                    f.a.createElement(j.a, null, f.a.createElement(He.a, null))
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
          fetchProject: function(t) {
            e(Object(O.h)(t));
          },
          clearProject: function() {
            e(Object(O.c)());
          }
        };
      })(Ze);
    },
    698: function(e, t, a) {
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
            { className: "panel-heading ".concat(t) },
            a
          );
        };
      (i.defaultProps = { className: "" }),
        (i.propTypes = { className: l.a.string }),
        (t.a = i);
    },
    709: function(e, t, a) {
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
              a = e.divSize,
              n = e.size,
              o = e.id,
              l = e.name,
              c = e.value,
              s = e.options,
              u = e.optionId,
              m = e.optionName,
              p = e.onChangeAction,
              d = e.required,
              f = e.multi,
              h = e.error,
              v = e.isLoading;
            return r.a.createElement(
              "div",
              { className: "form-group ".concat(a) },
              r.a.createElement(
                "label",
                { htmlFor: o, className: "col-sm-6 ".concat(d) },
                t
              ),
              r.a.createElement(
                "div",
                { className: "".concat(n) },
                r.a.createElement(i.a, {
                  id: o,
                  name: l,
                  value: c,
                  onChange: function(e) {
                    p(e || "", l);
                  },
                  options: s,
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
          label: l.a.string.isRequired,
          className: l.a.string,
          size: l.a.string,
          divSize: l.a.string,
          id: l.a.string,
          name: l.a.string.isRequired,
          options: l.a.array.isRequired,
          optionId: l.a.string,
          optionName: l.a.string,
          value: l.a.oneOfType([l.a.string, l.a.number]),
          onChangeAction: l.a.func,
          onBlurAction: l.a.func,
          required: l.a.string,
          readOnly: l.a.bool,
          error: l.a.bool,
          multi: l.a.bool,
          isLoading: l.a.bool
        }),
        (t.a = c);
    },
    726: function(e, t, a) {
      "use strict";
      a.d(t, "h", function() {
        return n;
      }),
        a.d(t, "e", function() {
          return r;
        }),
        a.d(t, "c", function() {
          return o;
        }),
        a.d(t, "k", function() {
          return l;
        }),
        a.d(t, "n", function() {
          return i;
        }),
        a.d(t, "g", function() {
          return c;
        }),
        a.d(t, "i", function() {
          return s;
        }),
        a.d(t, "m", function() {
          return u;
        }),
        a.d(t, "j", function() {
          return m;
        }),
        a.d(t, "b", function() {
          return p;
        }),
        a.d(t, "l", function() {
          return d;
        }),
        a.d(t, "a", function() {
          return f;
        }),
        a.d(t, "d", function() {
          return h;
        }),
        a.d(t, "f", function() {
          return v;
        });
      var n = function(e) {
          return { type: "FETCH_PROJECT", id: e };
        },
        r = function(e) {
          return { type: "DELETE_PROJECT", id: e };
        },
        o = function() {
          return { type: "CLEAR_PROJECT" };
        },
        l = function(e) {
          return { type: "NEW_VALUE_COURSE", valueCourse: e };
        },
        i = function(e) {
          return { type: "UPDATE_VALUE_COURSE", valueCourse: e };
        },
        c = function(e) {
          return { type: "DELETE_VALUE_COURSE", id: e };
        },
        s = function(e) {
          return { type: "FETCH_PROJECT_REVENUE", id: e };
        },
        u = function(e) {
          return { type: "PROJECT_REVENUE_PREVIEW_REPORT", data: e };
        },
        m = function(e) {
          return { type: "PROJECT_REVENUE_GET_DISTRIBUTION", data: e };
        },
        p = function() {
          return { type: "CLEAR_PROJECT_REVENUE_PREVIEW_REPORT" };
        },
        d = function(e) {
          return { type: "PROJECT_PARTICIPANT_PREVIEW_REPORT", data: e };
        },
        f = function() {
          return { type: "CLEAR_PROJECT_PARTICIPANT_PREVIEW_REPORT" };
        },
        h = function() {
          return { type: "CLEAR_PROJECT_REVENUE" };
        },
        v = function(e) {
          return { type: "DELETE_REVENUE", id: e };
        };
    },
    986: function(e, t, a) {
      "use strict";
      var n = a(24),
        r = a.n(n),
        o = a(25),
        l = a.n(o),
        i = a(22),
        c = a.n(i),
        s = a(26),
        u = a.n(s),
        m = a(27),
        p = a.n(m),
        d = a(16),
        f = a.n(d),
        h = a(6),
        v = a.n(h),
        E = a(0),
        g = a.n(E),
        b = a(4),
        y = a(32),
        w = a(690),
        j = a(691),
        N = a(7),
        C = a.n(N);
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return p()(this, a);
        };
      }
      var k = (function(e) {
          u()(a, e);
          var t = O(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              v()(c()(n), "openItem", function(e) {
                b.f.push("/taak/".concat(e));
              }),
              (n.state = { relatedTasks: "" }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedTasks;
                  return g.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      g.a.createElement("div", null, "Geen taken gevonden."),
                    "" != t &&
                      g.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        g.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return g.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: a
                              },
                              g.a.createElement(
                                "td",
                                { className: "col-xs-12 clickable" },
                                C()(t.createdAt).format("L"),
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
        })(E.Component),
        D = Object(y.b)(function(e) {
          return { relatedTasks: e.projectDetails.relatedTasks };
        })(k),
        S = Object(y.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showTasksList,
            n = e.taskCount,
            r = e.newTask,
            o = e.permissions;
          return g.a.createElement(
            w.a,
            { className: "harmonica-button" },
            g.a.createElement(
              j.a,
              null,
              g.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                g.a.createElement(
                  "span",
                  { className: "" },
                  "OPEN TAKEN ",
                  g.a.createElement("span", { className: "badge" }, n)
                )
              ),
              g.a.createElement(
                "div",
                { className: "col-sm-2" },
                o.manageTask &&
                  g.a.createElement(
                    "a",
                    { role: "button", className: "pull-right", onClick: r },
                    g.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white"
                    })
                  )
              ),
              g.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && g.a.createElement(D, null)
              )
            )
          );
        });
      function R(e) {
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
          return p()(this, a);
        };
      }
      var I = (function(e) {
          u()(a, e);
          var t = R(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              v()(c()(n), "openItem", function(e) {
                b.f.push("/document/".concat(e));
              }),
              (n.state = { relatedDocuments: "" }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedDocuments;
                  return g.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      g.a.createElement(
                        "div",
                        null,
                        "Geen documenten gevonden."
                      ),
                    "" != t &&
                      g.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        g.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return g.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: a
                              },
                              g.a.createElement(
                                "td",
                                { className: "col-xs-5 clickable" },
                                C()(t.createdAt).format("L")
                              ),
                              g.a.createElement(
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
        })(E.Component),
        P = Object(y.b)(function(e) {
          return { relatedDocuments: e.projectDetails.relatedDocuments };
        })(I),
        T = Object(y.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showDocumentsList,
            n = e.newDocument,
            r = e.documentCount,
            o = e.permissions;
          return g.a.createElement(
            w.a,
            { className: "harmonica-button" },
            g.a.createElement(
              j.a,
              null,
              g.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                g.a.createElement(
                  "span",
                  null,
                  "DOCUMENTEN ",
                  g.a.createElement("span", { className: "badge" }, r)
                )
              ),
              g.a.createElement(
                "div",
                { className: "col-sm-2" },
                o.createDocument &&
                  g.a.createElement(
                    "div",
                    { className: "pull-right" },
                    g.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white",
                      "data-toggle": "dropdown",
                      role: "button"
                    }),
                    g.a.createElement(
                      "ul",
                      { className: "dropdown-menu" },
                      g.a.createElement(
                        "li",
                        null,
                        g.a.createElement(
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
                      g.a.createElement(
                        "li",
                        null,
                        g.a.createElement(
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
              g.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && g.a.createElement(P, null)
              )
            )
          );
        });
      function A(e) {
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
          return p()(this, a);
        };
      }
      var L = (function(e) {
          u()(a, e);
          var t = A(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              v()(c()(n), "openItem", function(e) {
                b.f.push("/email/".concat(e));
              }),
              (n.state = { relatedOpportunities: "" }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedEmailsInbox;
                  return g.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      g.a.createElement("div", null, "Geen e-mails gevonden."),
                    "" != t &&
                      g.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        g.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return g.a.createElement(
                              "tr",
                              { key: a },
                              g.a.createElement(
                                "td",
                                {
                                  className: "col-xs-4 clickable",
                                  onClick: function() {
                                    return e.openItem(t.id);
                                  }
                                },
                                C()(t.date_sent).format("L")
                              ),
                              g.a.createElement(
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
        })(E.Component),
        x = Object(y.b)(function(e) {
          return { relatedEmailsInbox: e.projectDetails.relatedEmailsInbox };
        })(L),
        W = function(e) {
          var t = e.toggleShowList,
            a = e.showEmailsInboxList,
            n = e.newEmail,
            r = e.emailInboxCount;
          return g.a.createElement(
            w.a,
            { className: "harmonica-button" },
            g.a.createElement(
              j.a,
              null,
              g.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                g.a.createElement(
                  "span",
                  { onClick: t, role: "button", className: "" },
                  "E-MAIL INBOX ",
                  g.a.createElement("span", { className: "badge" }, r)
                )
              ),
              g.a.createElement(
                "div",
                { className: "col-sm-2" },
                g.a.createElement(
                  "a",
                  { role: "button", className: "pull-right", onClick: n },
                  g.a.createElement("span", {
                    className: "glyphicon glyphicon-plus glyphicon-white"
                  })
                )
              ),
              g.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && g.a.createElement(x, null)
              )
            )
          );
        };
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return p()(this, a);
        };
      }
      var _ = (function(e) {
          u()(a, e);
          var t = G(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              v()(c()(n), "openItem", function(e) {
                b.f.push("/email/".concat(e));
              }),
              (n.state = { relatedOpportunities: "" }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedEmailsSent;
                  return g.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      g.a.createElement("div", null, "Geen e-mails gevonden."),
                    "" != t &&
                      g.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        g.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return g.a.createElement(
                              "tr",
                              { key: a },
                              g.a.createElement(
                                "td",
                                {
                                  className: "col-xs-4 clickable",
                                  onClick: function() {
                                    return e.openItem(t.id);
                                  }
                                },
                                C()(t.date_sent).format("L")
                              ),
                              g.a.createElement(
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
        })(E.Component),
        M = Object(y.b)(function(e) {
          return { relatedEmailsSent: e.projectDetails.relatedEmailsSent };
        })(_),
        q = function(e) {
          var t = e.toggleShowList,
            a = e.showEmailsSentList,
            n = e.newEmail,
            r = e.emailSentCount;
          return g.a.createElement(
            w.a,
            { className: "harmonica-button" },
            g.a.createElement(
              j.a,
              null,
              g.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                g.a.createElement(
                  "span",
                  { onClick: t, className: "" },
                  "E-MAIL VERZONDEN ",
                  g.a.createElement("span", { className: "badge" }, r)
                )
              ),
              g.a.createElement(
                "div",
                { className: "col-sm-2" },
                g.a.createElement(
                  "a",
                  { role: "button", className: "pull-right", onClick: n },
                  g.a.createElement("span", {
                    className: "glyphicon glyphicon-plus glyphicon-white"
                  })
                )
              ),
              g.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && g.a.createElement(M, null)
              )
            )
          );
        };
      function B(e, t) {
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
      function V(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? B(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : B(Object(a)).forEach(function(t) {
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return p()(this, a);
        };
      }
      var F = (function(e) {
        u()(a, e);
        var t = U(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            v()(c()(n), "newTask", function() {
              b.f.push("/taak/nieuw/project/".concat(n.props.project.id));
            }),
            v()(c()(n), "newDocument", function(e) {
              b.f.push(
                "/document/nieuw/"
                  .concat(e, "/project/")
                  .concat(n.props.project.id)
              );
            }),
            v()(c()(n), "newEmail", function() {
              b.f.push("/email/nieuw");
            }),
            (n.state = {
              toggleShowList: {
                tasks: !1,
                documents: !1,
                emailsInbox: !1,
                emailsSent: !1
              }
            }),
            (n.toggleShowList = n.toggleShowList.bind(c()(n))),
            n
          );
        }
        return (
          l()(a, [
            {
              key: "toggleShowList",
              value: function(e) {
                this.setState(
                  V(
                    V({}, this.state),
                    {},
                    {
                      toggleShowList: V(
                        V({}, this.state.toggleShowList),
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
                var e = this;
                return g.a.createElement(
                  "div",
                  { className: "margin-10-top" },
                  g.a.createElement(S, {
                    toggleShowList: function() {
                      return e.toggleShowList("tasks");
                    },
                    showTasksList: this.state.toggleShowList.tasks,
                    taskCount: this.props.project.taskCount,
                    newTask: this.newTask
                  }),
                  g.a.createElement(T, {
                    toggleShowList: function() {
                      return e.toggleShowList("documents");
                    },
                    showDocumentsList: this.state.toggleShowList.documents,
                    newDocument: this.newDocument,
                    documentCount: this.props.project.documentCount
                  }),
                  g.a.createElement(W, {
                    toggleShowList: function() {
                      return e.toggleShowList("emailsInbox");
                    },
                    showEmailsInboxList: this.state.toggleShowList.emailsInbox,
                    newEmail: this.newEmail,
                    emailInboxCount: this.props.project.emailInboxCount
                  }),
                  g.a.createElement(q, {
                    toggleShowList: function() {
                      return e.toggleShowList("emailsSent");
                    },
                    showEmailsSentList: this.state.toggleShowList.emailsSent,
                    newEmail: this.newEmail,
                    emailSentCount: this.props.project.emailSentCount
                  })
                );
              }
            }
          ]),
          a
        );
      })(E.Component);
      t.a = Object(y.b)(function(e) {
        return { project: e.projectDetails };
      })(F);
    }
  }
]);
