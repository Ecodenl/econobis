(window.webpackJsonp = window.webpackJsonp || []).push([
  [133],
  {
    1509: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        o = a(25),
        i = a.n(o),
        c = a(22),
        s = a.n(c),
        l = a(26),
        d = a.n(l),
        p = a(27),
        u = a.n(p),
        m = a(16),
        h = a.n(m),
        g = a(6),
        f = a.n(g),
        E = a(0),
        v = a.n(E),
        y = a(697),
        b = a.n(y),
        I = a(4),
        C = a(690),
        j = a(691),
        S = a(693);
      function w(e) {
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
          return u()(this, a);
        };
      }
      var P = (function(e) {
          d()(a, e);
          var t = w(a);
          function a(e) {
            return r()(this, a), t.call(this, e);
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  return v.a.createElement(
                    "div",
                    { className: "row" },
                    v.a.createElement(
                      "div",
                      { className: "col-sm-12" },
                      v.a.createElement(
                        C.a,
                        null,
                        v.a.createElement(
                          j.a,
                          { className: "panel-small" },
                          v.a.createElement(
                            "div",
                            { className: "col-md-4" },
                            v.a.createElement(
                              "div",
                              {
                                className:
                                  "btn-group btn-group-flex margin-small",
                                role: "group"
                              },
                              v.a.createElement(S.a, {
                                iconName: "glyphicon-arrow-left",
                                onClickAction: I.e.goBack
                              })
                            )
                          ),
                          v.a.createElement(
                            "div",
                            { className: "col-md-4" },
                            v.a.createElement(
                              "h3",
                              { className: "text-center table-title" },
                              "Nieuw project"
                            )
                          ),
                          v.a.createElement("div", { className: "col-md-4" })
                        )
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(E.Component),
        N = a(152),
        R = a(32),
        O = a(54),
        A = a(702),
        k = a(692),
        D = a(694),
        G = a(696),
        T = a(699),
        q = a(700),
        x = a(723),
        L = Object(R.b)(function(e) {
          return {
            projectStatus: e.systemData.projectStatus,
            projectTypes: e.systemData.projectTypes,
            administrations: e.meDetails.administrations,
            users: e.systemData.users
          };
        })(function(e) {
          var t = e.name,
            a = e.code,
            n = e.description,
            r = e.projectStatusId,
            o = e.projectTypeId,
            i = e.postalCode,
            c = e.address,
            s = e.city,
            l = e.dateStartRegistrations,
            d = e.dateEndRegistrations,
            p = e.ownedById,
            u = e.administrationId,
            m = (e.administration, e.dateStart),
            h = e.dateEnd,
            g = e.dateEntry,
            f = e.contactGroupIds,
            E = e.dateProduction,
            y = e.isMembershipRequired,
            b = e.handleInputChange,
            I = e.handleInputChangeDate,
            C = e.handleContactGroupIds,
            j = e.projectTypes,
            S = e.projectStatus,
            w = e.administrations,
            P = (e.hasPaymentInvoices, e.users),
            N = e.contactGroups,
            R = e.errors;
          return v.a.createElement(
            v.a.Fragment,
            null,
            v.a.createElement("h4", null, "Algemeen"),
            v.a.createElement(
              "div",
              { className: "row" },
              v.a.createElement(D.a, {
                label: "Project",
                name: "name",
                value: t,
                onChangeAction: b,
                required: "required",
                error: R.name
              }),
              v.a.createElement(D.a, {
                label: "Projectcode",
                name: "code",
                value: a,
                onChangeAction: b,
                required: "required",
                error: R.code
              })
            ),
            v.a.createElement(
              "div",
              { className: "row" },
              v.a.createElement(G.a, {
                label: "Type project",
                name: "projectTypeId",
                options: j,
                value: o,
                onChangeAction: b,
                required: "required",
                error: R.projectTypeId
              }),
              v.a.createElement(G.a, {
                label: "Status",
                name: "projectStatusId",
                options: S,
                value: r,
                onChangeAction: b,
                required: "required",
                error: R.projectStatusId
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
                      { htmlFor: "description", className: "col-sm-12" },
                      "Omschrijving"
                    )
                  ),
                  v.a.createElement(
                    "div",
                    { className: "col-sm-8" },
                    v.a.createElement("textarea", {
                      name: "description",
                      value: n,
                      onChange: b,
                      className: "form-control input-sm"
                    })
                  )
                )
              )
            ),
            v.a.createElement(
              "div",
              { className: "row" },
              v.a.createElement(D.a, {
                label: "Postcode",
                name: "postalCode",
                value: i,
                onChangeAction: b,
                error: R.postalCode
              }),
              v.a.createElement(D.a, {
                label: "Adres",
                name: "address",
                value: c,
                onChangeAction: b
              })
            ),
            v.a.createElement(
              "div",
              { className: "row" },
              v.a.createElement(D.a, {
                label: "Plaats",
                name: "city",
                value: s,
                onChangeAction: b
              })
            ),
            v.a.createElement(
              "div",
              { className: "row" },
              v.a.createElement(T.a, {
                label: "Start inschrijving",
                name: "dateStartRegistrations",
                value: l,
                onChangeAction: I
              }),
              v.a.createElement(G.a, {
                label: "Verantwoordelijke",
                name: "ownedById",
                options: P,
                optionName: "fullName",
                value: p,
                onChangeAction: b,
                required: "required",
                error: R.ownedById
              })
            ),
            v.a.createElement(
              "div",
              { className: "row" },
              v.a.createElement(T.a, {
                label: "Eind inschrijving",
                name: "dateEndRegistrations",
                value: d,
                onChangeAction: I
              }),
              v.a.createElement(G.a, {
                label: "Administratie",
                name: "administrationId",
                options: w,
                value: u,
                onChangeAction: b,
                required: "required",
                error: R.administrationId
              })
            ),
            v.a.createElement(
              "div",
              { className: "row" },
              v.a.createElement(T.a, {
                label: "Start project",
                name: "dateStart",
                value: m,
                onChangeAction: I
              }),
              v.a.createElement(q.a, {
                label: "Deelname aan groep verplicht",
                name: "isMembershipRequired",
                value: y,
                onChangeAction: b
              })
            ),
            v.a.createElement(
              "div",
              { className: "row" },
              v.a.createElement(T.a, {
                label: "Einde project",
                name: "dateEnd",
                value: h,
                onChangeAction: I
              }),
              1 == y &&
                v.a.createElement(
                  "div",
                  { className: "row" },
                  v.a.createElement(x.a, {
                    label: "Onderdeel van groep",
                    name: "contactGroupsIds",
                    options: N,
                    value: f,
                    onChangeAction: C,
                    error: R.contactGroupIds,
                    required: "required"
                  })
                )
            ),
            v.a.createElement(
              "div",
              { className: "row" },
              v.a.createElement(T.a, {
                label: "Start productie",
                name: "dateProduction",
                value: E,
                onChangeAction: I
              }),
              v.a.createElement(T.a, {
                label: "Standaard ingangsdatum mutatie",
                name: "dateEntry",
                value: g,
                onChangeAction: I
              })
            )
          );
        }),
        M = a(1059),
        B = a(1058),
        F = a(1057),
        W = a(1056);
      function K(e, t) {
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
      function _(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? K(Object(a), !0).forEach(function(t) {
                f()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : K(Object(a)).forEach(function(t) {
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
            n = h()(e);
          if (t) {
            var r = h()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var z = (function(e) {
        d()(a, e);
        var t = J(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            f()(s()(n), "handleInputChange", function(e) {
              var t = e.target,
                a = "checkbox" === t.type ? t.checked : t.value,
                r = t.name;
              n.setState(
                _(
                  _({}, n.state),
                  {},
                  { project: _(_({}, n.state.project), {}, f()({}, r, a)) }
                )
              );
            }),
            f()(s()(n), "toggleConfirmSubmit", function() {
              n.setState(function(e) {
                return { confirmSubmit: !e.confirmSubmit };
              });
            }),
            f()(s()(n), "handleSubmit", function(e) {
              e.preventDefault();
              var t = n.state.project,
                a = {},
                r = !1;
              b.a.isEmpty(t.name) && ((a.name = !0), (r = !0)),
                b.a.isEmpty("" + t.code) && ((a.code = !0), (r = !0)),
                t.projectTypeId || ((a.projectTypeId = !0), (r = !0)),
                t.projectStatusId || ((a.projectStatusId = !0), (r = !0)),
                b.a.isEmpty("" + t.ownedById) && ((a.ownedById = !0), (r = !0)),
                b.a.isEmpty("" + t.administrationId) &&
                  ((a.administrationId = !0), (r = !0)),
                b.a.isEmpty("" + t.postalCode) ||
                  b.a.isPostalCode(t.postalCode, "any") ||
                  ((a.postalCode = !0), (r = !0)),
                t.isMembershipRequired &&
                  b.a.isEmpty(t.contactGroupIds) &&
                  ((a.contactGroupIds = !0), (r = !0)),
                t.isMembershipRequired || (t.contactGroupIds = ""),
                n.setState(_(_({}, n.state), {}, { errors: a })),
                r ||
                  (n.setState({ loading: !0 }),
                  N.a
                    .storeProject(t)
                    .then(function(e) {
                      n.setState({ loading: !1 }),
                        I.f.push("/project/".concat(e.data.data.id));
                    })
                    .catch(function(e) {
                      console.log(e),
                        alert(
                          "Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals."
                        ),
                        n.setState({ loading: !1 });
                    }));
            }),
            f()(s()(n), "handleContactGroupIds", function(e) {
              n.setState(
                _(
                  _({}, n.state),
                  {},
                  {
                    project: _(
                      _({}, n.state.project),
                      {},
                      { contactGroupIds: e }
                    )
                  }
                )
              );
            }),
            (n.state = {
              contactGroups: [],
              showPostalCodeLinkFields: !1,
              confirmSubmit: !1,
              project: {
                name: "",
                code: "",
                description: "",
                ownedById: "",
                projectStatusId: "",
                dateStart: "",
                dateEnd: "",
                dateEntry: "",
                dateProduction: "",
                dateStartRegistrations: "",
                dateEndRegistrations: "",
                projectTypeId: "",
                administrationId: "",
                postalCode: "",
                address: "",
                city: "",
                ean: "",
                eanManager: "",
                warrantyOrigin: "",
                eanSupply: "",
                participationWorth: "",
                powerKwAvailable: "",
                maxParticipations: "",
                taxReferral: "",
                totalParticipations: "",
                minParticipations: "",
                isMembershipRequired: !1,
                isParticipationTransferable: !1,
                postalcodeLink: "",
                contactGroupIds: "",
                amountOfLoanNeeded: null,
                minAmountLoan: null,
                maxAmountLoan: null,
                amountDefinitive: null,
                amountGranted: null,
                amountOptioned: null,
                amountInterresed: null,
                participationsDefinitive: null,
                participationsGranted: null,
                participationsOptioned: null,
                participationsInterresed: null
              },
              errors: {
                name: !1,
                code: !1,
                projectTypeId: !1,
                projectStatusId: !1,
                ownedById: !1,
                postalCode: !1,
                contactGroupIds: !1
              },
              loading: !1
            }),
            (n.handleInputChangeDate = n.handleInputChangeDate.bind(s()(n))),
            (n.toggleShowPostalCodeLinkFields = n.toggleShowPostalCodeLinkFields.bind(
              s()(n)
            )),
            (n.handleContactGroupIds = n.handleContactGroupIds.bind(s()(n))),
            n
          );
        }
        return (
          i()(a, [
            {
              key: "componentDidMount",
              value: function() {
                var e = this;
                O.a.peekContactGroups().then(function(t) {
                  e.setState({ contactGroups: t });
                });
              }
            },
            {
              key: "handleInputChangeDate",
              value: function(e, t) {
                this.setState(
                  _(
                    _({}, this.state),
                    {},
                    { project: _(_({}, this.state.project), {}, f()({}, t, e)) }
                  )
                );
              }
            },
            {
              key: "toggleShowPostalCodeLinkFields",
              value: function() {
                this.setState({
                  showPostalCodeLinkFields: !this.state.showPostalCodeLinkFields
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
                  r = e.ownedById,
                  o = e.projectStatusId,
                  i = e.dateStart,
                  c = e.dateEnd,
                  s = e.dateEntry,
                  l = e.dateProduction,
                  d = e.dateStartRegistrations,
                  p = e.dateEndRegistrations,
                  u = e.projectTypeId,
                  m = e.postalCode,
                  h = e.address,
                  g = e.city,
                  f = e.ean,
                  E = e.eanManager,
                  y = e.warrantyOrigin,
                  b = e.eanSupply,
                  I = e.participationWorth,
                  S = e.powerKwAvailable,
                  w = e.maxParticipations,
                  N = e.taxReferral,
                  R = e.totalParticipations,
                  O = e.minParticipations,
                  D = e.isMembershipRequired,
                  G = e.isParticipationTransferable,
                  T = e.administrationId,
                  q = e.postalcodeLink,
                  x = e.contactGroupIds,
                  K = e.amountOfLoanNeeded,
                  _ = e.minAmountLoan,
                  J = e.maxAmountLoan,
                  z = e.amountDefinitive,
                  H = e.amountGranted,
                  V = e.amountOptioned,
                  Q = e.amountInteressed,
                  U = e.participationsDefinitive,
                  X = e.participationsGranted,
                  Y = e.participationsOptioned,
                  Z = e.participationsInteressed,
                  $ = this.props.projectTypes.find(function(e) {
                    return e.id == u;
                  });
                return v.a.createElement(
                  "div",
                  { className: "row" },
                  v.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    v.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      v.a.createElement(P, null)
                    ),
                    v.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      v.a.createElement(
                        C.a,
                        null,
                        v.a.createElement(
                          j.a,
                          null,
                          v.a.createElement(
                            "form",
                            {
                              className: "form-horizontal col-md-12",
                              onSubmit: this.handleSubmit
                            },
                            v.a.createElement(L, {
                              name: t,
                              code: a,
                              description: n,
                              projectStatusId: o,
                              projectTypeId: u,
                              address: h,
                              postalCode: m,
                              city: g,
                              dateStartRegistrations: d,
                              dateEndRegistrations: p,
                              ownedById: r,
                              administrationId: T,
                              dateStart: i,
                              dateEnd: c,
                              dateEntry: s,
                              dateProduction: l,
                              contactGroupIds: x,
                              isMembershipRequired: D,
                              handleInputChange: this.handleInputChange,
                              handleInputChangeDate: this.handleInputChangeDate,
                              handleContactGroupIds: this.handleContactGroupIds,
                              errors: this.state.errors,
                              contactGroups: this.state.contactGroups
                            }),
                            $ && "loan" === $.codeRef
                              ? v.a.createElement(W.a, {
                                  amountOfLoanNeeded: K,
                                  minAmountLoan: _,
                                  maxAmountLoan: J,
                                  amountDefinitive: z,
                                  amountGranted: H,
                                  amountOptioned: V,
                                  amountInteressed: Q,
                                  handleInputChange: this.handleInputChange
                                })
                              : null,
                            $ && "obligation" === $.codeRef
                              ? v.a.createElement(F.a, {
                                  participationWorth: I,
                                  totalParticipations: R,
                                  participationsDefinitive: U,
                                  participationsGranted: X,
                                  participationsOptioned: Y,
                                  participationsInteressed: Z,
                                  powerKwAvailable: S,
                                  minParticipations: O,
                                  maxParticipations: w,
                                  isParticipationTransferable: G,
                                  handleInputChange: this.handleInputChange,
                                  projectTypeId: u
                                })
                              : null,
                            ($ && "capital" === $.codeRef) ||
                              ($ && "postalcode_link_capital" === $.codeRef)
                              ? v.a.createElement(B.a, {
                                  participationWorth: I,
                                  totalParticipations: R,
                                  participationsDefinitive: U,
                                  participationsGranted: X,
                                  participationsOptioned: Y,
                                  participationsInteressed: Z,
                                  powerKwAvailable: S,
                                  minParticipations: O,
                                  maxParticipations: w,
                                  isParticipationTransferable: G,
                                  handleInputChange: this.handleInputChange,
                                  projectTypeId: u
                                })
                              : null,
                            $ && "postalcode_link_capital" === $.codeRef
                              ? v.a.createElement(M.a, {
                                  postalcodeLink: q,
                                  ean: f,
                                  taxReferral: N,
                                  eanManager: E,
                                  warrantyOrigin: y,
                                  eanSupply: b,
                                  handleInputChange: this.handleInputChange,
                                  projectTypeId: u
                                })
                              : null,
                            v.a.createElement(
                              A.a,
                              null,
                              this.state.confirmSubmit
                                ? v.a.createElement(
                                    "div",
                                    { className: "pull-right" },
                                    v.a.createElement(
                                      "span",
                                      { style: { marginRight: "10px" } },
                                      "Het type project kan maar één keer worden ingesteld. Weet u zeker dat u dit type project wilt aanmaken?"
                                    ),
                                    v.a.createElement(
                                      "div",
                                      { className: "btn-group", role: "group" },
                                      v.a.createElement(k.a, {
                                        buttonText: "Ja",
                                        onClickAction: this.handleSubmit,
                                        type: "submit",
                                        value: "Submit",
                                        loading: this.state.loading,
                                        loadText: "Project wordt aangemaakt"
                                      }),
                                      v.a.createElement(k.a, {
                                        buttonText: "Nee",
                                        buttonClassName: "btn-default",
                                        onClickAction: this.toggleConfirmSubmit
                                      })
                                    )
                                  )
                                : v.a.createElement(
                                    "div",
                                    {
                                      className: "pull-right btn-group",
                                      role: "group"
                                    },
                                    v.a.createElement(k.a, {
                                      buttonText: "Opslaan",
                                      onClickAction: this.toggleConfirmSubmit
                                    })
                                  )
                            )
                          )
                        )
                      )
                    )
                  ),
                  v.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          a
        );
      })(E.Component);
      t.default = Object(R.b)(function(e) {
        return {
          administrations: e.meDetails.administrations,
          projectTypes: e.systemData.projectTypes
        };
      })(z);
    }
  }
]);
