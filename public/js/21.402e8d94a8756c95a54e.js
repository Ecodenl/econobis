(window.webpackJsonp = window.webpackJsonp || []).push([
  [21, 7],
  {
    1428: function(e, a, n) {
      "use strict";
      n.r(a);
      var t = n(24),
        r = n.n(t),
        i = n(25),
        l = n.n(i),
        s = n(26),
        o = n.n(s),
        c = n(27),
        u = n.n(c),
        m = n(16),
        d = n.n(m),
        p = n(0),
        h = n.n(p),
        g = n(32),
        b = n(748),
        f = n(22),
        y = n.n(f),
        N = n(6),
        v = n.n(N),
        A = n(4),
        I = n(693),
        E = n(100),
        w = n(856),
        R = Object(g.b)(null, function(e) {
          return {
            deleteAdministration: function(a) {
              e(Object(w.b)(a));
            }
          };
        })(function(e) {
          return h.a.createElement(
            E.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return (
                  e.deleteAdministration(e.id), void e.closeDeleteItemModal()
                );
              },
              title: "Verwijderen"
            },
            "Verwijder administratie: ",
            h.a.createElement("strong", null, e.name),
            "?"
          );
        }),
        C = n(692),
        B = n(62),
        x = n(202);
      function _(e) {
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
          var n,
            t = d()(e);
          if (a) {
            var r = d()(this).constructor;
            n = Reflect.construct(t, arguments, r);
          } else n = t.apply(this, arguments);
          return u()(this, n);
        };
      }
      var T = (function(e) {
          o()(n, e);
          var a = _(n);
          function n(e) {
            var t;
            return (
              r()(this, n),
              (t = a.call(this, e)),
              v()(y()(t), "toggleDelete", function() {
                t.setState({ showDelete: !t.state.showDelete });
              }),
              v()(y()(t), "syncInvoicesToTwinfield", function() {
                t.setState({ syncingToInvoices: !0 }),
                  B.a
                    .syncSentInvoicesToTwinfield(
                      t.props.administrationDetails.id
                    )
                    .then(function(e) {
                      t.setState({ syncingToInvoices: !1 }),
                        t.props.setError(200, e.data);
                    });
              }),
              v()(y()(t), "syncInvoicesFromTwinfield", function() {
                t.setState({ syncingFromInvoices: !0 }),
                  B.a
                    .syncSentInvoicesFromTwinfield(
                      t.props.administrationDetails.id
                    )
                    .then(function(e) {
                      t.setState({ syncingFromInvoices: !1 }),
                        t.props.setError(200, e.data);
                    });
              }),
              (t.state = {
                showDelete: !1,
                syncingToInvoices: !1,
                syncingFromInvoices: !1
              }),
              t
            );
          }
          return (
            l()(n, [
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      h.a.createElement(
                        "div",
                        {
                          className: "btn-group btn-group-flex margin-small",
                          role: "group"
                        },
                        h.a.createElement(I.a, {
                          iconName: "glyphicon-arrow-left",
                          onClickAction: A.e.goBack
                        }),
                        1 == this.props.administrationDetails.usesTwinfield &&
                          1 ==
                            this.props.administrationDetails.twinfieldIsValid &&
                          h.a.createElement(C.a, {
                            loading: this.state.syncingInvoices,
                            loadText: "Aan het synchroniseren",
                            buttonText: h.a.createElement(
                              "span",
                              null,
                              h.a.createElement("span", {
                                className: "glyphicon glyphicon-refresh",
                                title: "Nota's naar Twinfield synchroniseren"
                              }),
                              " Nota's"
                            ),
                            onClickAction: this.syncInvoicesToTwinfield
                          }),
                        1 == this.props.administrationDetails.usesTwinfield &&
                          1 ==
                            this.props.administrationDetails.twinfieldIsValid &&
                          h.a.createElement(C.a, {
                            loading: this.state.syncingFromInvoices,
                            loadText: "Betalingen aan het ophalen",
                            buttonText: h.a.createElement(
                              "span",
                              null,
                              h.a.createElement("span", {
                                className: "glyphicon glyphicon-refresh",
                                title: "Betalingen van Twinfield ophalen"
                              }),
                              " Betalingen"
                            ),
                            onClickAction: this.syncInvoicesFromTwinfield
                          }),
                        h.a.createElement(I.a, {
                          iconName: "glyphicon-trash",
                          onClickAction: this.toggleDelete
                        })
                      )
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      h.a.createElement(
                        "h4",
                        { className: "text-center" },
                        "Administratie: ",
                        this.props.name
                      )
                    ),
                    h.a.createElement("div", { className: "col-md-4" }),
                    this.state.showDelete &&
                      h.a.createElement(R, {
                        closeDeleteItemModal: this.toggleDelete,
                        name: this.props.name,
                        id: this.props.id
                      })
                  );
                }
              }
            ]),
            n
          );
        })(p.Component),
        S = Object(g.b)(
          function(e) {
            return {
              name: e.administrationDetails.name,
              administrationDetails: e.administrationDetails,
              id: e.administrationDetails.id
            };
          },
          function(e) {
            return {
              setError: function(a, n) {
                e(Object(x.b)(a, n));
              }
            };
          }
        )(T),
        k = n(198),
        D = n(697),
        O = n.n(D),
        P = n(694),
        L = n(690),
        M = n(691),
        j = n(747),
        Z = n(890),
        $ = n(696),
        z = n(104),
        U = n(709),
        F = n(2),
        G = n.n(F),
        q = n(65),
        V = n(700),
        Y = n(695),
        K = n(699),
        H = n(7),
        W = n.n(H);
      function J(e, a) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var t = Object.getOwnPropertySymbols(e);
          a &&
            (t = t.filter(function(a) {
              return Object.getOwnPropertyDescriptor(e, a).enumerable;
            })),
            n.push.apply(n, t);
        }
        return n;
      }
      function X(e) {
        for (var a = 1; a < arguments.length; a++) {
          var n = null != arguments[a] ? arguments[a] : {};
          a % 2
            ? J(Object(n), !0).forEach(function(a) {
                v()(e, a, n[a]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : J(Object(n)).forEach(function(a) {
                Object.defineProperty(
                  e,
                  a,
                  Object.getOwnPropertyDescriptor(n, a)
                );
              });
        }
        return e;
      }
      function Q(e) {
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
          var n,
            t = d()(e);
          if (a) {
            var r = d()(this).constructor;
            n = Reflect.construct(t, arguments, r);
          } else n = t.apply(this, arguments);
          return u()(this, n);
        };
      }
      var ee = (function(e) {
          o()(n, e);
          var a = Q(n);
          function n(e) {
            var t;
            r()(this, n),
              (t = a.call(this, e)),
              v()(y()(t), "toggleNewLogo", function() {
                t.setState({ newLogo: !t.state.newLogo });
              }),
              v()(y()(t), "addAttachment", function(e) {
                t.setState(
                  X(
                    X({}, t.state),
                    {},
                    {
                      administration: X(
                        X({}, t.state.administration),
                        {},
                        { attachment: e[0], filename: e[0].name }
                      )
                    }
                  )
                );
              }),
              v()(y()(t), "handleInputChange", function(e) {
                var a = e.target,
                  n = "checkbox" === a.type ? a.checked : a.value,
                  r = a.name;
                t.setState(
                  X(
                    X({}, t.state),
                    {},
                    {
                      administration: X(
                        X({}, t.state.administration),
                        {},
                        v()({}, r, n)
                      )
                    }
                  )
                );
              }),
              v()(y()(t), "handleInputChangeDate", function(e, a) {
                t.setState(X(X({}, t.state), {}, v()({}, a, e)));
              }),
              v()(y()(t), "handleUsesTwinfieldChange", function(e) {
                var a = e.target,
                  n = "checkbox" === a.type ? a.checked : a.value,
                  r = a.name;
                1 == n && (t.state.administration.twinfieldPasswordChange = !0),
                  t.setState(
                    X(
                      X({}, t.state),
                      {},
                      {
                        administration: X(
                          X({}, t.state.administration),
                          {},
                          v()({}, r, n)
                        )
                      }
                    )
                  );
              }),
              v()(y()(t), "handleSubmit", function(e) {
                e.preventDefault();
                var a = t.state.administration,
                  n = {},
                  r = !1;
                O.a.isEmpty(a.name + "") && ((n.name = !0), (r = !0));
                var i = a.countryId;
                O.a.isEmpty(a.countryId + "") && (i = "NL");
                if (
                  (O.a.isEmpty(a.postalCode + "") ||
                    ("NL" == i
                      ? O.a.isPostalCode(a.postalCode, "NL")
                      : O.a.isPostalCode(a.postalCode, "any")) ||
                    ((n.postalCode = !0), (n.countryId = !0), (r = !0)),
                  O.a.isEmpty(a.administrationNumber + "") ||
                    O.a.isInt(a.administrationNumber + "") ||
                    ((n.administrationNumber = !0), (r = !0)),
                  O.a.isEmpty(a.kvkNumber + "") ||
                    O.a.isInt(a.kvkNumber + "") ||
                    ((n.kvkNumber = !0), (r = !0)),
                  O.a.isEmpty(a.IBAN + "") ||
                    j.isValidIBAN(a.IBAN + "") ||
                    ((n.IBAN = !0), (r = !0)),
                  O.a.isEmpty(a.email + "") ||
                    O.a.isEmail(a.email + "") ||
                    ((n.email = !0), (r = !0)),
                  O.a.isEmpty(a.emailBccNotas + "") ||
                    O.a.isEmail(a.emailBccNotas + "") ||
                    ((n.emailBccNotas = !0), (r = !0)),
                  O.a.isEmpty(a.website + "") ||
                    O.a.isFQDN(a.website + "") ||
                    ((n.website = !0), (r = !0)),
                  a.usesTwinfield)
                ) {
                  O.a.isEmpty(a.twinfieldConnectionType + "") &&
                    ((n.twinfieldConnectionType = !0), (r = !0)),
                    "webservice" === a.twinfieldConnectionType &&
                      (O.a.isEmpty(a.twinfieldUsername + "") &&
                        ((n.twinfieldUsername = !0), (r = !0)),
                      a.twinfieldPasswordChange &&
                        O.a.isEmpty(a.twinfieldPassword + "") &&
                        ((n.twinfieldPassword = !0), (r = !0))),
                    "openid" === a.twinfieldConnectionType &&
                      (O.a.isEmpty(a.twinfieldClientId + "") &&
                        ((n.twinfieldClientId = !0), (r = !0)),
                      a.twinfieldPasswordChange &&
                        O.a.isEmpty(a.twinfieldClientSecret + "") &&
                        ((n.twinfieldClientSecret = !0), (r = !0))),
                    O.a.isEmpty(a.twinfieldOfficeCode + "") &&
                      ((n.twinfieldOfficeCode = !0), (r = !0)),
                    O.a.isEmpty(a.twinfieldOrganizationCode + "") &&
                      ((n.twinfieldOrganizationCode = !0), (r = !0));
                  var l = !1;
                  t.props.administrations.map(function(e) {
                    return (
                      e.twinfieldOfficeCode &&
                      a.twinfieldOfficeCode &&
                      e.twinfieldOfficeCode.toUpperCase() ===
                        a.twinfieldOfficeCode.toUpperCase() &&
                      e.twinfieldOrganizationCode &&
                      a.twinfieldOrganizationCode &&
                      e.twinfieldOrganizationCode.toUpperCase() ===
                        a.twinfieldOrganizationCode.toUpperCase() &&
                      e.id !== a.id &&
                      (l = !0)
                    );
                  }),
                    l && ((n.twinfieldOfficeCode = !0), (r = !0));
                }
                if ((t.setState(X(X({}, t.state), {}, { errors: n })), !r)) {
                  var s = "Aan het laden";
                  a.usesTwinfield &&
                    (s =
                      "De koppeling Econobis Twinfield wordt gemaakt. Dit kan enige tijd duren"),
                    t.setState(
                      X(X({}, t.state), {}, { loadingText: s, isSaving: !0 })
                    );
                  var o = new FormData();
                  o.append("id", a.id),
                    o.append("name", a.name),
                    o.append("administrationNumber", a.administrationNumber),
                    o.append("address", a.address),
                    o.append("postalCode", a.postalCode),
                    o.append("city", a.city),
                    o.append("countryId", a.countryId),
                    o.append("kvkNumber", a.kvkNumber),
                    o.append("btwNumber", a.btwNumber),
                    o.append("IBAN", a.IBAN),
                    o.append("ibanAttn", a.ibanAttn),
                    o.append("email", a.email),
                    o.append("website", a.website),
                    o.append("bic", a.bic),
                    o.append("sepaContractName", a.sepaContractName),
                    o.append("sepaCreditorId", a.sepaCreditorId),
                    o.append("rsinNumber", a.rsinNumber),
                    o.append("defaultPaymentTerm", a.defaultPaymentTerm),
                    o.append(
                      "emailTemplateIdCollection",
                      a.emailTemplateIdCollection
                    ),
                    o.append(
                      "emailTemplateIdTransfer",
                      a.emailTemplateIdTransfer
                    ),
                    o.append(
                      "emailTemplateReminderId",
                      a.emailTemplateReminderId
                    ),
                    o.append(
                      "emailTemplateExhortationId",
                      a.emailTemplateExhortationId
                    ),
                    o.append("attachment", a.attachment),
                    o.append("mailboxId", a.mailboxId),
                    o.append("usesTwinfield", a.usesTwinfield),
                    o.append(
                      "twinfieldConnectionType",
                      a.twinfieldConnectionType
                    ),
                    o.append("twinfieldUsername", a.twinfieldUsername),
                    a.twinfieldPasswordChange &&
                      "webservice" === a.twinfieldConnectionType &&
                      o.append("twinfieldPassword", a.twinfieldPassword),
                    a.twinfieldPasswordChange &&
                      "openid" === a.twinfieldConnectionType &&
                      o.append(
                        "twinfieldClientSecret",
                        a.twinfieldClientSecret
                      ),
                    o.append("twinfieldClientId", a.twinfieldClientId),
                    o.append(
                      "twinfieldOrganizationCode",
                      a.twinfieldOrganizationCode
                    ),
                    o.append("twinfieldOfficeCode", a.twinfieldOfficeCode),
                    o.append(
                      "dateSyncTwinfieldContacts",
                      a.dateSyncTwinfieldContacts
                    ),
                    o.append(
                      "dateSyncTwinfieldPayments",
                      a.dateSyncTwinfieldPayments
                    ),
                    o.append("usesVat", a.usesVat),
                    o.append("emailBccNotas", a.emailBccNotas),
                    t.props.updateAdministration(o, a.id, t.props.switchToView);
                }
              }),
              (t.manageUsesTwinfield =
                "support@econobis.nl" == t.props.meDetails.email ||
                "info@xaris.nl" == t.props.meDetails.email);
            var i = e.administrationDetails,
              l = i.id,
              s = i.name,
              o = i.administrationNumber,
              c = i.address,
              u = i.emailTemplateIdCollection,
              m = i.emailTemplateIdTransfer,
              d = i.emailTemplateReminderId,
              p = i.emailTemplateExhortationId,
              h = i.postalCode,
              g = i.city,
              b = i.countryId,
              f = i.kvkNumber,
              N = i.btwNumber,
              A = i.IBAN,
              I = i.email,
              E = i.website,
              w = i.bic,
              R = i.sepaContractName,
              C = i.sepaCreditorId,
              B = i.rsinNumber,
              x = i.defaultPaymentTerm,
              _ = i.logoName,
              T = i.ibanAttn,
              S = i.mailboxId,
              k = i.usesTwinfield,
              D = i.twinfieldConnectionType,
              P = i.twinfieldHasRefreshToken,
              L = i.twinfieldRedirectUri,
              M = i.twinfieldUsername,
              Z = i.twinfieldPassword,
              $ = i.twinfieldPasswordChange,
              z = i.twinfieldClientId,
              U = i.twinfieldClientSecret,
              F = i.twinfieldOrganizationCode,
              G = i.twinfieldOfficeCode,
              q = i.dateSyncTwinfieldContacts,
              V = i.dateSyncTwinfieldPayments,
              Y = i.usesVat,
              K = i.emailBccNotas;
            return (
              (t.state = {
                newLogo: !1,
                emailTemplates: [],
                mailboxAddresses: [],
                isSaving: !1,
                loadingText: "Aan het opslaan",
                administration: {
                  id: l,
                  name: s || "",
                  administrationNumber: o || "",
                  address: c || "",
                  postalCode: h || "",
                  city: g || "",
                  countryId: b || "",
                  kvkNumber: f || "",
                  btwNumber: N || "",
                  IBAN: A || "",
                  ibanAttn: T || "",
                  email: I || "",
                  website: E || "",
                  bic: w || "",
                  sepaContractName: R || "",
                  sepaCreditorId: C || "",
                  rsinNumber: B || "",
                  defaultPaymentTerm: x || "",
                  logoName: _ || "",
                  emailTemplateIdCollection: u || "",
                  emailTemplateIdTransfer: m || "",
                  emailTemplateReminderId: d || "",
                  emailTemplateExhortationId: p || "",
                  attachment: "",
                  mailboxId: S || "",
                  usesTwinfield: k,
                  twinfieldConnectionType: D || "",
                  twinfieldHasRefreshToken: P || "",
                  twinfieldRedirectUri: L || "",
                  twinfieldUsername: M || "",
                  twinfieldPassword: Z || "",
                  twinfieldPasswordChange: $ || !1,
                  twinfieldClientId: z || "",
                  twinfieldClientSecret: U || "",
                  twinfieldOrganizationCode: F || "",
                  twinfieldOfficeCode: G || "",
                  dateSyncTwinfieldContacts: q || "",
                  dateSyncTwinfieldPayments: V || "",
                  usesVat: Y,
                  emailBccNotas: K || ""
                },
                errors: {
                  name: !1,
                  administrationNumber: !1,
                  postalCode: !1,
                  kvkNumber: !1,
                  IBAN: !1,
                  email: !1,
                  website: !1,
                  twinfieldConnectionType: !1,
                  twinfieldUsername: !1,
                  twinfieldPassword: !1,
                  twinfieldClientId: !1,
                  twinfieldClientSecret: !1,
                  twinfieldOrganizationCode: !1,
                  twinfieldOfficeCode: !1,
                  dateSyncTwinfieldContacts: !1,
                  dateSyncTwinfieldPayments: !1,
                  mailboxId: !1,
                  emailBccNotas: !1,
                  countryId: !1
                },
                peekLoading: { emailTemplates: !0 }
              }),
              (t.handleReactSelectChange = t.handleReactSelectChange.bind(
                y()(t)
              )),
              t
            );
          }
          return (
            l()(n, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  G.a
                    .all([
                      z.a.fetchEmailTemplatesPeek(),
                      q.a.fetchMailboxesLoggedInUserPeek()
                    ])
                    .then(
                      G.a.spread(function(a, n) {
                        e.setState({
                          emailTemplates: a,
                          mailboxAddresses: n,
                          peekLoading: X(
                            X({}, e.state.peekLoading),
                            {},
                            { emailTemplates: !1 }
                          )
                        });
                      })
                    );
                }
              },
              {
                key: "handleReactSelectChange",
                value: function(e, a) {
                  this.setState(
                    X(
                      X({}, this.state),
                      {},
                      {
                        administration: X(
                          X({}, this.state.administration),
                          {},
                          v()({}, a, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.administration,
                    a = e.name,
                    n = e.administrationNumber,
                    t = e.emailTemplateIdCollection,
                    r = e.emailTemplateIdTransfer,
                    i = e.emailTemplateReminderId,
                    l = e.emailTemplateExhortationId,
                    s = e.address,
                    o = e.postalCode,
                    c = e.city,
                    u = e.countryId,
                    m = e.kvkNumber,
                    d = e.btwNumber,
                    p = e.IBAN,
                    g = e.email,
                    b = e.website,
                    f = e.bic,
                    y = e.sepaContractName,
                    N = e.sepaCreditorId,
                    v = e.rsinNumber,
                    A = e.defaultPaymentTerm,
                    I = e.attachment,
                    E = e.logoName,
                    w = e.ibanAttn,
                    R = e.mailboxId,
                    B = e.usesTwinfield,
                    x = e.twinfieldConnectionType,
                    _ = e.twinfieldHasRefreshToken,
                    T = (e.twinfieldRedirectUri, e.twinfieldUsername),
                    S = e.twinfieldPassword,
                    D = e.twinfieldPasswordChange,
                    O = e.twinfieldClientId,
                    j = e.twinfieldClientSecret,
                    z = e.twinfieldOrganizationCode,
                    F = e.twinfieldOfficeCode,
                    G = e.dateSyncTwinfieldContacts,
                    q = e.dateSyncTwinfieldPayments,
                    H = e.usesVat,
                    J = e.emailBccNotas,
                    X = null;
                  X = G
                    ? W()(W()(G).format("YYYY") + "-01-01").format("YYYY-01-01")
                    : W()(W()().format("YYYY") + "-01-01").format("YYYY-01-01");
                  var Q = null;
                  return (
                    (Q = q
                      ? W()(W()(q).format("YYYY") + "-01-01").format(
                          "YYYY-01-01"
                        )
                      : W()(W()().format("YYYY") + "-01-01").format(
                          "YYYY-01-01"
                        )),
                    h.a.createElement(
                      "form",
                      {
                        className: "form-horizontal",
                        onSubmit: this.handleSubmit
                      },
                      h.a.createElement(
                        L.a,
                        null,
                        h.a.createElement(
                          M.a,
                          null,
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(P.a, {
                              label: "Naam",
                              name: "name",
                              value: a,
                              onChangeAction: this.handleInputChange,
                              required: "required",
                              error: this.state.errors.name
                            }),
                            h.a.createElement(P.a, {
                              label: "Administratie nummer",
                              name: "administrationNumber",
                              value: n,
                              onChangeAction: this.handleInputChange,
                              error: this.state.errors.administrationNumber
                            })
                          ),
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(P.a, {
                              label: "Adres",
                              name: "address",
                              value: s,
                              onChangeAction: this.handleInputChange
                            }),
                            h.a.createElement(P.a, {
                              label: "Postcode",
                              name: "postalCode",
                              value: o,
                              onChangeAction: this.handleInputChange,
                              error: this.state.errors.postalCode
                            })
                          ),
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(P.a, {
                              label: "Plaats",
                              name: "city",
                              value: c,
                              onChangeAction: this.handleInputChange
                            }),
                            h.a.createElement($.a, {
                              label: "Land",
                              id: "countryId",
                              size: "col-sm-6",
                              name: "countryId",
                              options: this.props.countries,
                              value: u,
                              onChangeAction: this.handleInputChange,
                              error: this.state.errors.countryId
                            })
                          ),
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(P.a, {
                              label: "KvK",
                              name: "kvkNumber",
                              value: m,
                              onChangeAction: this.handleInputChange,
                              error: this.state.errors.kvkNumber
                            }),
                            h.a.createElement(P.a, {
                              label: "BTW nummer",
                              name: "btwNumber",
                              value: d,
                              onChangeAction: this.handleInputChange
                            })
                          ),
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(P.a, {
                              label: "IBAN",
                              name: "IBAN",
                              value: p,
                              onChangeAction: this.handleInputChange,
                              error: this.state.errors.IBAN
                            }),
                            h.a.createElement(P.a, {
                              label: "IBAN t.n.v.",
                              name: "ibanAttn",
                              value: w,
                              onChangeAction: this.handleInputChange
                            })
                          ),
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(P.a, {
                              label: "Website",
                              name: "website",
                              value: b,
                              onChangeAction: this.handleInputChange,
                              error: this.state.errors.website
                            }),
                            h.a.createElement(P.a, {
                              label: "Bic",
                              name: "bic",
                              value: f,
                              onChangeAction: this.handleInputChange
                            })
                          ),
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(P.a, {
                              label: "Sepa contractnaam",
                              name: "sepaContractName",
                              value: y,
                              onChangeAction: this.handleInputChange
                            }),
                            h.a.createElement(P.a, {
                              label: "Sepa crediteur id",
                              name: "sepaCreditorId",
                              value: N,
                              onChangeAction: this.handleInputChange
                            })
                          ),
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(U.a, {
                              label: "E-mail template nota incasso",
                              name: "emailTemplateIdCollection",
                              options: this.state.emailTemplates,
                              value: t,
                              onChangeAction: this.handleReactSelectChange,
                              isLoading: this.state.peekLoading.emailTemplates,
                              multi: !1
                            }),
                            h.a.createElement(P.a, {
                              label: "E-mail",
                              name: "email",
                              value: g,
                              onChangeAction: this.handleInputChange,
                              error: this.state.errors.email
                            })
                          ),
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(U.a, {
                              label: "E-mail template nota overboeken",
                              name: "emailTemplateIdTransfer",
                              options: this.state.emailTemplates,
                              value: r,
                              onChangeAction: this.handleReactSelectChange,
                              isLoading: this.state.peekLoading.emailTemplates,
                              multi: !1
                            }),
                            h.a.createElement(P.a, {
                              label: "RSIN nummer",
                              name: "rsinNumber",
                              value: v,
                              onChangeAction: this.handleInputChange
                            })
                          ),
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(U.a, {
                              label: "E-mail template herinnering",
                              name: "emailTemplateReminderId",
                              options: this.state.emailTemplates,
                              value: i,
                              onChangeAction: this.handleReactSelectChange,
                              isLoading: this.state.peekLoading.emailTemplates,
                              multi: !1
                            }),
                            h.a.createElement(P.a, {
                              label: "Standaard betalingstermijn(dagen)",
                              type: "number",
                              min: "0",
                              max: "9999",
                              name: "defaultPaymentTerm",
                              value: A,
                              onChangeAction: this.handleInputChange
                            })
                          ),
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(U.a, {
                              label: "E-mail template aanmaning",
                              name: "emailTemplateExhortationId",
                              options: this.state.emailTemplates,
                              value: l,
                              onChangeAction: this.handleReactSelectChange,
                              isLoading: this.state.peekLoading.emailTemplates,
                              multi: !1
                            }),
                            h.a.createElement(
                              "div",
                              { className: "form-group col-sm-6" },
                              h.a.createElement(
                                "label",
                                { className: "col-sm-6" },
                                "Kies logo"
                              ),
                              h.a.createElement(
                                "div",
                                { className: "col-sm-6" },
                                h.a.createElement("input", {
                                  type: "text",
                                  className: "form-control input-sm col-sm-6",
                                  value: I ? I.name : E,
                                  onClick: this.toggleNewLogo,
                                  onChange: function() {}
                                })
                              )
                            )
                          ),
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement($.a, {
                              label:
                                "Afzender van Rapportages en nota's is e-mail adres",
                              id: "mailboxId",
                              size: "col-sm-6",
                              name: "mailboxId",
                              options: this.state.mailboxAddresses,
                              optionName: "email",
                              value: R,
                              onChangeAction: this.handleInputChange
                            }),
                            h.a.createElement(Y.a, {
                              label: "Gebruikt BTW",
                              value: H ? "Ja" : "Nee",
                              className: "col-sm-6 form-group",
                              hidden: !0
                            })
                          ),
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(P.a, {
                              label: "Nota's ook mailen in BCC naar",
                              name: "emailBccNotas",
                              value: J,
                              onChangeAction: this.handleInputChange,
                              error: this.state.errors.emailBccNotas
                            })
                          ),
                          this.state.newLogo &&
                            h.a.createElement(Z.a, {
                              toggleShowNew: this.toggleNewLogo,
                              addAttachment: this.addAttachment
                            }),
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(
                              "div",
                              { className: "panel-part panel-heading" },
                              h.a.createElement(
                                "span",
                                { className: "h5 text-bold" },
                                "Twinfield"
                              )
                            )
                          ),
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(V.a, {
                              label: "Gebruikt Twinfield",
                              name: "usesTwinfield",
                              value: B,
                              onChangeAction: this.handleUsesTwinfieldChange,
                              disabled:
                                !this.manageUsesTwinfield &&
                                (("webservice" === x &&
                                  !Object(k.isEmpty)(T)) ||
                                  ("openid" === x && !Object(k.isEmpty)(O)))
                            }),
                            (1 == B || !Object(k.isEmpty)(T)) &&
                              h.a.createElement($.a, {
                                label: "API connection type",
                                id: "twinfieldConnectionType",
                                size: "col-sm-6",
                                name: "twinfieldConnectionType",
                                options: this.props.twinfieldConnectionTypes,
                                optionName: "name",
                                value: x,
                                onChangeAction: this.handleInputChange,
                                required: "required",
                                error: this.state.errors.twinfieldConnectionType
                              })
                          ),
                          (1 == B || !Object(k.isEmpty)(T)) &&
                            h.a.createElement(
                              h.a.Fragment,
                              null,
                              h.a.createElement(
                                "div",
                                { className: "row" },
                                h.a.createElement(P.a, {
                                  label: "Omgeving",
                                  name: "twinfieldOrganizationCode",
                                  value: z,
                                  onChangeAction: this.handleInputChange,
                                  required: "required",
                                  readOnly: 0 == B,
                                  error: this.state.errors
                                    .twinfieldOrganizationCode
                                }),
                                h.a.createElement(P.a, {
                                  label: "Code",
                                  name: "twinfieldOfficeCode",
                                  value: F,
                                  onChangeAction: this.handleInputChange,
                                  required: "required",
                                  readOnly: 0 == B,
                                  error: this.state.errors.twinfieldOfficeCode
                                })
                              ),
                              "webservice" === x &&
                                h.a.createElement(
                                  h.a.Fragment,
                                  null,
                                  h.a.createElement(
                                    "div",
                                    { className: "row" },
                                    h.a.createElement(P.a, {
                                      label: "Gebruikersnaam",
                                      name: "twinfieldUsername",
                                      value: T,
                                      onChangeAction: this.handleInputChange,
                                      required: "required",
                                      readOnly: 0 == B,
                                      error: this.state.errors.twinfieldUsername
                                    }),
                                    h.a.createElement(P.a, {
                                      label: "Wachtwoord",
                                      name: "twinfieldPassword",
                                      value: S,
                                      placeholder: "**********",
                                      onChangeAction: this.handleInputChange,
                                      required: "required",
                                      readOnly: 0 == B,
                                      error: this.state.errors.twinfieldPassword
                                    })
                                  ),
                                  h.a.createElement(
                                    "div",
                                    { className: "row" },
                                    h.a.createElement(V.a, {
                                      label: "Wijzig wachtwoord",
                                      name: "twinfieldPasswordChange",
                                      value: D,
                                      onChangeAction: this.handleInputChange,
                                      className: "col-sm-push-6 col-sm-6",
                                      disabled: 0 == B
                                    })
                                  )
                                ),
                              "openid" === x &&
                                h.a.createElement(
                                  h.a.Fragment,
                                  null,
                                  h.a.createElement(
                                    "div",
                                    { className: "row" },
                                    h.a.createElement(P.a, {
                                      label: "Client Id",
                                      name: "twinfieldClientId",
                                      value: O,
                                      onChangeAction: this.handleInputChange,
                                      required: "required",
                                      readOnly: 0 == B,
                                      error: this.state.errors.twinfieldClientId
                                    }),
                                    h.a.createElement(P.a, {
                                      label: "Client Secret",
                                      name: "twinfieldClientSecret",
                                      value: j,
                                      placeholder: "**********",
                                      onChangeAction: this.handleInputChange,
                                      required: "required",
                                      readOnly: 0 == B,
                                      error: this.state.errors
                                        .twinfieldClientSecret
                                    })
                                  ),
                                  h.a.createElement(
                                    "div",
                                    { className: "row" },
                                    h.a.createElement(V.a, {
                                      label: "Wijzig client secret",
                                      name: "twinfieldPasswordChange",
                                      value: D,
                                      onChangeAction: this.handleInputChange,
                                      className: "col-sm-push-6 col-sm-6",
                                      disabled: 0 == B
                                    })
                                  ),
                                  h.a.createElement(
                                    "div",
                                    { className: "row" },
                                    h.a.createElement(Y.a, {
                                      className: "col-sm-6 form-group",
                                      label: "Heeft refresh token?",
                                      name: "twinfieldHasRefreshToken",
                                      value: _
                                    })
                                  )
                                ),
                              h.a.createElement(
                                "div",
                                { className: "row" },
                                h.a.createElement(K.a, {
                                  label: h.a.createElement(
                                    "span",
                                    null,
                                    "Synchroniseer contacten vanaf",
                                    h.a.createElement("br", null),
                                    h.a.createElement(
                                      "small",
                                      {
                                        style: {
                                          color: "#ccc",
                                          fontWeight: "normal"
                                        }
                                      },
                                      "Nota aanmaakdatum vanaf wanneer contacten initieel gemaakt worden in Twinfield"
                                    )
                                  ),
                                  name: "dateSyncTwinfieldContacts",
                                  value: G,
                                  onChangeAction: this.handleInputChangeDate,
                                  disabledBefore: X,
                                  readOnly: 0 == B,
                                  error: this.state.errors
                                    .dateSyncTwinfieldContacts
                                }),
                                h.a.createElement(K.a, {
                                  label: h.a.createElement(
                                    "span",
                                    null,
                                    "Synchroniseer betalingen vanaf",
                                    h.a.createElement("br", null),
                                    h.a.createElement(
                                      "small",
                                      {
                                        style: {
                                          color: "#ccc",
                                          fontWeight: "normal"
                                        }
                                      },
                                      "Nota aanmaakdatum vanaf wanneer betalingen opgehaald worden uit Twinfield"
                                    )
                                  ),
                                  name: "dateSyncTwinfieldPayments",
                                  value: q,
                                  onChangeAction: this.handleInputChangeDate,
                                  disabledBefore: Q,
                                  readOnly: 0 == B,
                                  error: this.state.errors
                                    .dateSyncTwinfieldPayments
                                })
                              )
                            ),
                          this.state.newLogo &&
                            h.a.createElement(Z.a, {
                              toggleShowNew: this.toggleNewLogo,
                              addAttachment: this.addAttachment
                            })
                        ),
                        h.a.createElement(
                          M.a,
                          null,
                          h.a.createElement(
                            "div",
                            {
                              className: "pull-right btn-group",
                              role: "group"
                            },
                            h.a.createElement(C.a, {
                              buttonClassName: "btn-default",
                              buttonText: "Sluiten",
                              onClickAction: this.props.switchToView
                            }),
                            h.a.createElement(C.a, {
                              loading: this.state.isSaving,
                              loadText: this.state.loadingText,
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
            n
          );
        })(p.Component),
        ae = Object(g.b)(
          function(e) {
            return {
              countries: e.systemData.countries,
              twinfieldConnectionTypes: e.systemData.twinfieldConnectionTypes,
              administrations: e.systemData.administrations,
              administrationDetails: e.administrationDetails
            };
          },
          function(e) {
            return {
              updateAdministration: function(a, n, t) {
                e(Object(b.e)(a, n, t));
              }
            };
          }
        )(ee),
        ne = Object(g.b)(function(e) {
          return { administrationDetails: e.administrationDetails };
        })(function(e) {
          var a = e.administrationDetails,
            n = a.name,
            t = a.administrationNumber,
            r = a.address,
            i = a.postalCode,
            l = a.emailTemplateCollection,
            s = a.emailTemplateTransfer,
            o = a.emailTemplateReminder,
            c = a.emailTemplateExhortation,
            u = a.city,
            m = a.country,
            d = a.kvkNumber,
            p = a.btwNumber,
            g = a.IBAN,
            b = a.ibanAttn,
            f = a.email,
            y = a.website,
            N = a.bic,
            v = a.sepaContractName,
            A = a.sepaCreditorId,
            I = a.rsinNumber,
            E = a.defaultPaymentTerm,
            w = a.logoName,
            R = a.mailboxEmail,
            C = a.usesTwinfield,
            B = a.twinfieldConnectionType,
            x = a.twinfieldConnectionTypeWithIdAndName,
            _ = a.twinfieldHasRefreshToken,
            T = a.twinfieldRedirectUri,
            S = a.twinfieldUsername,
            k = a.twinfieldClientId,
            D = (a.twinfieldClientSecret, a.twinfieldOrganizationCode),
            O = a.twinfieldOfficeCode,
            P = a.dateSyncTwinfieldContacts,
            j = a.dateSyncTwinfieldPayments,
            Z = a.usesVat,
            $ = a.emailBccNotas;
          return h.a.createElement(
            "div",
            { onClick: e.switchToEdit },
            h.a.createElement(
              L.a,
              null,
              h.a.createElement(
                M.a,
                null,
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Y.a, { label: "Naam", value: n }),
                  h.a.createElement(Y.a, {
                    label: "Administratie nummer",
                    value: t || ""
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Y.a, { label: "Adres", value: r || "" }),
                  h.a.createElement(Y.a, { label: "Postcode", value: i || "" })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Y.a, { label: "Plaats", value: u || "" }),
                  h.a.createElement(Y.a, {
                    label: "Land",
                    value: m ? m.name : ""
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Y.a, { label: "KvK", value: d || "" }),
                  h.a.createElement(Y.a, {
                    label: "BTW nummer",
                    value: p || ""
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Y.a, { label: "IBAN", value: g || "" }),
                  h.a.createElement(Y.a, {
                    label: "IBAN t.n.v.",
                    value: b || ""
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Y.a, { label: "Website", value: y || "" }),
                  h.a.createElement(Y.a, { label: "Bic", value: N || "" })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Y.a, {
                    label: "Sepa contractnaam",
                    value: v || ""
                  }),
                  h.a.createElement(Y.a, {
                    label: "Sepa crediteur id",
                    value: A || ""
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Y.a, {
                    label: "E-mail template nota incasso",
                    value: l ? l.name : ""
                  }),
                  h.a.createElement(Y.a, { label: "E-mail", value: f || "" })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Y.a, {
                    label: "E-mail template nota overboeken",
                    value: s ? s.name : ""
                  }),
                  h.a.createElement(Y.a, {
                    label: "RSIN nummer",
                    value: I || ""
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Y.a, {
                    label: "E-mail template herinnering",
                    value: o ? o.name : ""
                  }),
                  h.a.createElement(Y.a, {
                    label: "Standaard betalingstermijn(dagen)",
                    value: E || ""
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Y.a, {
                    label: "E-mail template aanmaning",
                    value: c ? c.name : ""
                  }),
                  h.a.createElement(Y.a, { label: "Logo", value: w })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Y.a, {
                    label: "Afzender van Rapportages en nota's is e-mail adres",
                    value: R
                  }),
                  h.a.createElement(Y.a, {
                    label: "Gebruikt BTW",
                    value: Z ? "Ja" : "Nee",
                    hidden: !0
                  })
                ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Y.a, {
                    label: "Nota's ook mailen in BCC naar",
                    value: $ || ""
                  })
                ),
                1 == C &&
                  h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(
                      "div",
                      { className: "panel-part panel-heading" },
                      h.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Twinfield"
                      )
                    )
                  ),
                h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(Y.a, {
                    label: "Gebruikt Twinfield",
                    value: C ? "Ja" : "Nee"
                  }),
                  1 == C &&
                    h.a.createElement(Y.a, {
                      label: "API connection type",
                      value: x ? x.name : ""
                    })
                ),
                1 == C &&
                  h.a.createElement(
                    h.a.Fragment,
                    null,
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(Y.a, { label: "Omgeving", value: D }),
                      h.a.createElement(Y.a, { label: "Code", value: O })
                    ),
                    "webservice" === B &&
                      h.a.createElement(
                        "div",
                        { className: "row" },
                        h.a.createElement(Y.a, {
                          label: "Gebruikersnaam",
                          value: S
                        }),
                        h.a.createElement(Y.a, {
                          label: "Wachtwoord",
                          value: "**********"
                        })
                      ),
                    "openid" === B &&
                      h.a.createElement(
                        h.a.Fragment,
                        null,
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(Y.a, {
                            label: "Client Id",
                            value: k
                          }),
                          h.a.createElement(Y.a, {
                            label: "Client Secret",
                            value: "**********"
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(Y.a, {
                            label: "Heeft refresh token?",
                            value: _
                          }),
                          "Nee" === _ &&
                            h.a.createElement(Y.a, {
                              className: "col-sm-6 form-group",
                              label: "Haal nieuwe refresh token op",
                              name: "twinfieldRedirectUri",
                              value: h.a.createElement(
                                "span",
                                null,
                                h.a.createElement(
                                  "a",
                                  {
                                    href:
                                      T +
                                      "?administrationId=" +
                                      e.administrationDetails.id,
                                    className: "link-underline"
                                  },
                                  T
                                )
                              )
                            })
                        )
                      ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(Y.a, {
                        label: h.a.createElement(
                          "span",
                          null,
                          "Synchroniseer contacten vanaf",
                          h.a.createElement("br", null),
                          h.a.createElement(
                            "small",
                            { style: { color: "#ccc", fontWeight: "normal" } },
                            "Nota aanmaakdatum vanaf wanneer contacten initieel gemaakt worden in Twinfield"
                          )
                        ),
                        value: P ? W()(P).format("L") : ""
                      }),
                      h.a.createElement(Y.a, {
                        label: h.a.createElement(
                          "span",
                          null,
                          "Synchroniseer betalingen vanaf",
                          h.a.createElement("br", null),
                          h.a.createElement(
                            "small",
                            { style: { color: "#ccc", fontWeight: "normal" } },
                            "Nota aanmaakdatum vanaf wanneer betalingen opgehaald worden uit Twinfield"
                          )
                        ),
                        value: j ? W()(j).format("L") : ""
                      })
                    )
                  )
              )
            )
          );
        });
      function te(e) {
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
          var n,
            t = d()(e);
          if (a) {
            var r = d()(this).constructor;
            n = Reflect.construct(t, arguments, r);
          } else n = t.apply(this, arguments);
          return u()(this, n);
        };
      }
      var re = (function(e) {
          o()(n, e);
          var a = te(n);
          function n(e) {
            var t;
            return (
              r()(this, n),
              (t = a.call(this, e)),
              v()(y()(t), "switchToEdit", function() {
                t.setState({ showEdit: !0 });
              }),
              v()(y()(t), "switchToView", function() {
                t.setState({ showEdit: !1, activeDiv: "" });
              }),
              (t.state = { showEdit: !1, activeDiv: "" }),
              t
            );
          }
          return (
            l()(n, [
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
                  var e = this,
                    a = this.props.meDetails.permissions,
                    n = void 0 === a ? {} : a;
                  return h.a.createElement(
                    "div",
                    {
                      className: this.state.activeDiv,
                      onMouseEnter: function() {
                        return e.onDivEnter();
                      },
                      onMouseLeave: function() {
                        return e.onDivLeave();
                      }
                    },
                    this.state.showEdit && n.manageFinancial
                      ? h.a.createElement(ae, {
                          switchToView: this.switchToView,
                          meDetails: this.props.meDetails
                        })
                      : h.a.createElement(ne, {
                          switchToEdit: this.switchToEdit
                        })
                  );
                }
              }
            ]),
            n
          );
        })(p.Component),
        ie = Object(g.b)(function(e) {
          return {
            administrationDetails: e.administrationDetails,
            meDetails: e.meDetails
          };
        })(re),
        le = Object(g.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(function(e) {
          var a = e.user.fullName;
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
            h.a.createElement("div", { className: "col-sm-11" }, a),
            h.a.createElement(
              "div",
              { className: "col-sm-1" },
              e.showActionButtons && e.permissions.manageFinancial
                ? h.a.createElement(
                    "a",
                    { role: "button", onClick: e.toggleDelete },
                    h.a.createElement("span", {
                      className: "glyphicon glyphicon-trash mybtn-danger"
                    }),
                    " "
                  )
                : ""
            )
          );
        }),
        se = Object(g.b)(
          function(e) {
            return { administrationId: e.administrationDetails.id };
          },
          function(e) {
            return {
              deleteAdministrationUser: function(a, n) {
                e(Object(b.c)(a, n));
              }
            };
          }
        )(function(e) {
          return h.a.createElement(
            E.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.toggleDelete,
              confirmAction: function() {
                return (
                  e.deleteAdministrationUser(e.administrationId, e.userId),
                  void e.toggleDelete()
                );
              },
              title: "Verwijderen"
            },
            h.a.createElement(
              "p",
              null,
              "Wil je deze gebruiker ontkoppelen van deze administratie?"
            )
          );
        });
      function oe(e) {
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
          var n,
            t = d()(e);
          if (a) {
            var r = d()(this).constructor;
            n = Reflect.construct(t, arguments, r);
          } else n = t.apply(this, arguments);
          return u()(this, n);
        };
      }
      var ce = (function(e) {
          o()(n, e);
          var a = oe(n);
          function n(e) {
            var t;
            return (
              r()(this, n),
              (t = a.call(this, e)),
              v()(y()(t), "onLineEnter", function() {
                t.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              v()(y()(t), "onLineLeave", function() {
                t.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              v()(y()(t), "toggleDelete", function() {
                t.setState({ showDelete: !t.state.showDelete });
              }),
              (t.state = {
                showActionButtons: !1,
                highlightLine: "",
                showDelete: !1,
                user: e.user
              }),
              t
            );
          }
          return (
            l()(n, [
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    "div",
                    null,
                    h.a.createElement(le, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      toggleDelete: this.toggleDelete,
                      user: this.state.user
                    }),
                    this.state.showDelete &&
                      this.props.permissions.manageFinancial &&
                      h.a.createElement(se, {
                        toggleDelete: this.toggleDelete,
                        userId: this.state.user.id
                      })
                  );
                }
              }
            ]),
            n
          );
        })(p.Component),
        ue = Object(g.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(ce),
        me = Object(g.b)(function(e) {
          return { users: e.administrationDetails.users };
        })(function(e) {
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "row border header" },
              h.a.createElement("div", { className: "col-sm-11" }, "Naam"),
              h.a.createElement("div", { className: "col-sm-1" })
            ),
            e.users.length > 0
              ? e.users.map(function(e) {
                  return h.a.createElement(ue, { key: e.id, user: e });
                })
              : h.a.createElement("div", null, "Geen gebruikers bekend.")
          );
        }),
        de = n(11),
        pe = n.n(de);
      function he(e, a) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var t = Object.getOwnPropertySymbols(e);
          a &&
            (t = t.filter(function(a) {
              return Object.getOwnPropertyDescriptor(e, a).enumerable;
            })),
            n.push.apply(n, t);
        }
        return n;
      }
      function ge(e) {
        for (var a = 1; a < arguments.length; a++) {
          var n = null != arguments[a] ? arguments[a] : {};
          a % 2
            ? he(Object(n), !0).forEach(function(a) {
                v()(e, a, n[a]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : he(Object(n)).forEach(function(a) {
                Object.defineProperty(
                  e,
                  a,
                  Object.getOwnPropertyDescriptor(n, a)
                );
              });
        }
        return e;
      }
      function be(e) {
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
          var n,
            t = d()(e);
          if (a) {
            var r = d()(this).constructor;
            n = Reflect.construct(t, arguments, r);
          } else n = t.apply(this, arguments);
          return u()(this, n);
        };
      }
      var fe = (function(e) {
          o()(n, e);
          var a = be(n);
          function n(e) {
            var t;
            return (
              r()(this, n),
              ((t = a.call(this, e)).state = {
                userId: "",
                errors: { userId: !1, hasErrors: !0 }
              }),
              (t.handleInputChange = t.handleInputChange.bind(y()(t))),
              (t.handleSubmit = t.handleSubmit.bind(y()(t))),
              t
            );
          }
          return (
            l()(n, [
              {
                key: "handleInputChange",
                value: function(e) {
                  var a = e.target.value;
                  this.setState({ userId: a });
                }
              },
              {
                key: "handleSubmit",
                value: function(e) {
                  e.preventDefault();
                  var a = {
                      administrationId: this.props.administrationId,
                      userId: this.state.userId
                    },
                    n = {},
                    t = !1;
                  O.a.isEmpty(a.userId) && ((n.userId = !0), (t = !0)),
                    this.setState(ge(ge({}, this.state), {}, { errors: n })),
                    t ||
                      (this.props.addAdministrationUser(a),
                      this.props.toggleShowNew());
                }
              },
              {
                key: "render",
                value: function() {
                  var e = [];
                  return (
                    (e = this.props.usersExtraAdministration
                      ? [].concat(
                          pe()(this.props.users),
                          pe()(this.props.usersExtraAdministration)
                        )
                      : pe()(this.props.users)),
                    h.a.createElement(
                      "form",
                      {
                        className: "form-horizontal",
                        onSubmit: this.handleSubmit
                      },
                      h.a.createElement(
                        L.a,
                        { className: "panel-grey" },
                        h.a.createElement(
                          M.a,
                          null,
                          h.a.createElement(
                            "div",
                            { className: "row" },
                            h.a.createElement(P.a, {
                              label: "Administratie",
                              name: "administration",
                              value: this.props.administrationName,
                              readOnly: !0
                            }),
                            h.a.createElement($.a, {
                              label: "Gebruiker",
                              size: "col-sm-6",
                              name: "userId",
                              options: e,
                              optionName: "fullName",
                              value: this.state.userId,
                              onChangeAction: this.handleInputChange,
                              required: "required",
                              error: this.state.errors.userId
                            })
                          ),
                          h.a.createElement(
                            "div",
                            {
                              className: "pull-right btn-group",
                              role: "group"
                            },
                            h.a.createElement(C.a, {
                              buttonClassName: "btn-default",
                              buttonText: "Annuleren",
                              onClickAction: this.props.toggleShowNew
                            }),
                            h.a.createElement(C.a, {
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
            n
          );
        })(p.Component),
        ye = Object(g.b)(
          function(e) {
            return {
              administrationId: e.administrationDetails.id,
              administrationName: e.administrationDetails.name,
              users: e.systemData.users,
              usersExtraAdministration: e.systemData.usersExtraAdministration
            };
          },
          function(e) {
            return {
              addAdministrationUser: function(a) {
                e(Object(b.a)(a));
              }
            };
          }
        )(fe),
        Ne = n(698);
      function ve(e) {
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
          var n,
            t = d()(e);
          if (a) {
            var r = d()(this).constructor;
            n = Reflect.construct(t, arguments, r);
          } else n = t.apply(this, arguments);
          return u()(this, n);
        };
      }
      var Ae = (function(e) {
          o()(n, e);
          var a = ve(n);
          function n(e) {
            var t;
            return (
              r()(this, n),
              (t = a.call(this, e)),
              v()(y()(t), "toggleShowNew", function() {
                t.setState({ showNew: !t.state.showNew });
              }),
              (t.state = { showNew: !1 }),
              t
            );
          }
          return (
            l()(n, [
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    L.a,
                    null,
                    h.a.createElement(
                      Ne.a,
                      null,
                      h.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Gekoppelde gebruikers"
                      ),
                      this.props.permissions.manageFinancial &&
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
                      M.a,
                      null,
                      h.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        h.a.createElement(me, null)
                      ),
                      h.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          h.a.createElement(ye, {
                            toggleShowNew: this.toggleShowNew
                          })
                      )
                    )
                  );
                }
              }
            ]),
            n
          );
        })(p.Component),
        Ie = Object(g.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(Ae);
      W.a.locale("nl");
      var Ee = Object(g.b)(function(e) {
          return { administrationDetails: e.administrationDetails };
        })(function(e) {
          var a = e.administrationDetails,
            n = a.createdAt,
            t = a.createdBy;
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(Y.a, {
                label: "Gemaakt door",
                value: t ? t.fullName : "Onbekend",
                link: t ? "gebruiker/" + t.id : ""
              }),
              h.a.createElement(Y.a, {
                label: "Gemaakt op",
                value: n ? W()(n).format("L") : "Onbekend"
              })
            )
          );
        }),
        we = function(e) {
          return h.a.createElement(
            L.a,
            null,
            h.a.createElement(
              Ne.a,
              null,
              h.a.createElement(
                "span",
                { className: "h5 text-bold" },
                "Afsluiting gegevens"
              )
            ),
            h.a.createElement(
              M.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-md-12" },
                h.a.createElement(Ee, null)
              )
            )
          );
        };
      W.a.locale("nl");
      var Re = Object(g.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(function(e) {
          var a = e.sepa,
            n = a.id,
            t = a.name,
            r = a.createdAt,
            i = a.type;
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
              null,
              h.a.createElement("div", { className: "col-sm-3" }, n),
              h.a.createElement("div", { className: "col-sm-3" }, t),
              h.a.createElement(
                "div",
                { className: "col-sm-3" },
                r ? W()(r).format("L") : ""
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-2" },
                i ? i.name : ""
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-1" },
                e.showActionButtons && e.permissions.manageFinancial
                  ? h.a.createElement(
                      "a",
                      {
                        role: "button",
                        onClick: function() {
                          return e.downloadSepa(n);
                        }
                      },
                      h.a.createElement("span", {
                        className: "glyphicon glyphicon-open-file mybtn-success"
                      }),
                      " "
                    )
                  : "",
                e.showActionButtons && e.permissions.manageFinancial
                  ? h.a.createElement(
                      "a",
                      { role: "button", onClick: e.toggleDelete },
                      h.a.createElement("span", {
                        className: "glyphicon glyphicon-trash mybtn-danger"
                      }),
                      " "
                    )
                  : ""
              )
            )
          );
        }),
        Ce = n(711),
        Be = n.n(Ce),
        xe = Object(g.b)(null, function(e) {
          return {
            deleteAdministrationSepa: function(a) {
              e(Object(b.b)(a));
            }
          };
        })(function(e) {
          return h.a.createElement(
            E.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.toggleDelete,
              confirmAction: function() {
                return (
                  e.deleteAdministrationSepa(e.sepaId), void e.toggleDelete()
                );
              },
              title: "Verwijderen"
            },
            h.a.createElement("p", null, "Wil je deze sepa verwijderen?")
          );
        });
      function _e(e, a) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var t = Object.getOwnPropertySymbols(e);
          a &&
            (t = t.filter(function(a) {
              return Object.getOwnPropertyDescriptor(e, a).enumerable;
            })),
            n.push.apply(n, t);
        }
        return n;
      }
      function Te(e) {
        for (var a = 1; a < arguments.length; a++) {
          var n = null != arguments[a] ? arguments[a] : {};
          a % 2
            ? _e(Object(n), !0).forEach(function(a) {
                v()(e, a, n[a]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : _e(Object(n)).forEach(function(a) {
                Object.defineProperty(
                  e,
                  a,
                  Object.getOwnPropertyDescriptor(n, a)
                );
              });
        }
        return e;
      }
      function Se(e) {
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
          var n,
            t = d()(e);
          if (a) {
            var r = d()(this).constructor;
            n = Reflect.construct(t, arguments, r);
          } else n = t.apply(this, arguments);
          return u()(this, n);
        };
      }
      var ke = (function(e) {
          o()(n, e);
          var a = Se(n);
          function n(e) {
            var t;
            return (
              r()(this, n),
              (t = a.call(this, e)),
              v()(y()(t), "onLineEnter", function() {
                t.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              v()(y()(t), "onLineLeave", function() {
                t.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              v()(y()(t), "downloadSepa", function(e) {
                B.a.downloadSepa(e).then(function(e) {
                  Be()(e.data, e.headers["x-filename"]);
                });
              }),
              v()(y()(t), "toggleDelete", function() {
                t.setState({ showDelete: !t.state.showDelete });
              }),
              (t.state = {
                showActionButtons: !1,
                showDelete: !1,
                highlightLine: "",
                sepa: Te({}, e.sepa)
              }),
              t
            );
          }
          return (
            l()(n, [
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    "div",
                    null,
                    h.a.createElement(Re, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      sepa: this.state.sepa,
                      downloadSepa: this.downloadSepa,
                      toggleDelete: this.toggleDelete
                    }),
                    this.state.showDelete &&
                      h.a.createElement(xe, {
                        toggleDelete: this.toggleDelete,
                        sepaId: this.state.sepa.id
                      })
                  );
                }
              }
            ]),
            n
          );
        })(p.Component),
        De = Object(g.b)(function(e) {
          return { sepas: e.administrationDetails.sepas };
        })(function(e) {
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "row border header" },
              h.a.createElement("div", { className: "col-sm-3" }, "Id"),
              h.a.createElement("div", { className: "col-sm-3" }, "Naam"),
              h.a.createElement("div", { className: "col-sm-3" }, "Datum"),
              h.a.createElement("div", { className: "col-sm-2" }, "Type"),
              h.a.createElement("div", { className: "col-sm-1" })
            ),
            e.sepas.length > 0
              ? e.sepas.map(function(e) {
                  return h.a.createElement(ke, { key: e.id, sepa: e });
                })
              : h.a.createElement("div", null, "Geen sepa bestanden bekend.")
          );
        });
      function Oe(e) {
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
          var n,
            t = d()(e);
          if (a) {
            var r = d()(this).constructor;
            n = Reflect.construct(t, arguments, r);
          } else n = t.apply(this, arguments);
          return u()(this, n);
        };
      }
      var Pe = (function(e) {
          o()(n, e);
          var a = Oe(n);
          function n(e) {
            return r()(this, n), a.call(this, e);
          }
          return (
            l()(n, [
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    L.a,
                    null,
                    h.a.createElement(
                      Ne.a,
                      null,
                      h.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Sepa bestanden"
                      )
                    ),
                    h.a.createElement(
                      M.a,
                      null,
                      h.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        h.a.createElement(De, null)
                      )
                    )
                  );
                }
              }
            ]),
            n
          );
        })(p.Component),
        Le = Object(g.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(Pe);
      function Me(e) {
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
          var n,
            t = d()(e);
          if (a) {
            var r = d()(this).constructor;
            n = Reflect.construct(t, arguments, r);
          } else n = t.apply(this, arguments);
          return u()(this, n);
        };
      }
      W.a.locale("nl");
      var je = (function(e) {
          o()(n, e);
          var a = Me(n);
          function n(e) {
            return r()(this, n), a.call(this, e);
          }
          return (
            l()(n, [
              {
                key: "render",
                value: function() {
                  var e = "",
                    a = !0;
                  return (
                    this.props.hasError
                      ? (e = "Fout bij het ophalen van administratie.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : Object(k.isEmpty)(this.props.administrationDetails)
                      ? (e = "Geen gegevens gevonden.")
                      : (a = !1),
                    a
                      ? h.a.createElement("div", null, e)
                      : h.a.createElement(
                          "div",
                          null,
                          0 ==
                            this.props.administrationDetails.twinfieldIsValid &&
                            1 ==
                              this.props.administrationDetails.usesTwinfield &&
                            h.a.createElement(
                              L.a,
                              null,
                              h.a.createElement(
                                Ne.a,
                                null,
                                h.a.createElement(
                                  "span",
                                  {
                                    className: "h5",
                                    style: { color: "#e64a4a" }
                                  },
                                  "Twinfield is onjuist geconfigureerd. Pas de configuratie aan om Twinfield te gebruiken."
                                )
                              )
                            ),
                          h.a.createElement(ie, null),
                          h.a.createElement(Ie, null),
                          h.a.createElement(Le, null),
                          h.a.createElement(we, null)
                        )
                  );
                }
              }
            ]),
            n
          );
        })(p.Component),
        Ze = Object(g.b)(function(e) {
          return {
            administrationDetails: e.administrationDetails,
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        })(je);
      function $e(e) {
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
          var n,
            t = d()(e);
          if (a) {
            var r = d()(this).constructor;
            n = Reflect.construct(t, arguments, r);
          } else n = t.apply(this, arguments);
          return u()(this, n);
        };
      }
      var ze = (function(e) {
        o()(n, e);
        var a = $e(n);
        function n(e) {
          return r()(this, n), a.call(this, e);
        }
        return (
          l()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchAdministrationDetails(this.props.params.id);
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
                      { className: "col-md-12 margin-10-top" },
                      h.a.createElement(
                        L.a,
                        null,
                        h.a.createElement(
                          M.a,
                          { className: "panel-small" },
                          h.a.createElement(S, null)
                        )
                      )
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      h.a.createElement(Ze, null)
                    )
                  ),
                  h.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          n
        );
      })(p.Component);
      a.default = Object(g.b)(
        function(e) {
          return { administrationDetails: e.administrationDetails };
        },
        function(e) {
          return {
            fetchAdministrationDetails: function(a) {
              e(Object(b.d)(a));
            }
          };
        }
      )(ze);
    },
    690: function(e, a, n) {
      "use strict";
      var t = n(0),
        r = n.n(t),
        i = n(8),
        l = n.n(i),
        s = function(e) {
          var a = e.children,
            n = e.className,
            t = e.onMouseEnter,
            i = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(n),
              onMouseEnter: t,
              onMouseLeave: i
            },
            a
          );
        };
      (s.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (s.propTypes = {
          className: l.a.string,
          onMouseEnter: l.a.func,
          onMouseLeave: l.a.func
        }),
        (a.a = s);
    },
    691: function(e, a, n) {
      "use strict";
      var t = n(0),
        r = n.n(t),
        i = n(8),
        l = n.n(i),
        s = function(e) {
          var a = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(a) },
            n
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: l.a.string }),
        (a.a = s);
    },
    692: function(e, a, n) {
      "use strict";
      var t = n(0),
        r = n.n(t),
        i = n(8),
        l = n.n(i),
        s = function(e) {
          var a = e.buttonClassName,
            n = e.buttonText,
            t = e.onClickAction,
            i = e.type,
            l = e.value,
            s = e.loading,
            o = e.loadText,
            c = e.disabled;
          return s
            ? r.a.createElement(
                "button",
                {
                  type: i,
                  className: "btn btn-sm btn-loading ".concat(a),
                  value: l,
                  disabled: s
                },
                r.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                o
              )
            : r.a.createElement(
                "button",
                {
                  type: i,
                  className: "btn btn-sm ".concat(a),
                  onClick: t,
                  value: l,
                  disabled: c
                },
                n
              );
        };
      (s.defaultProps = {
        buttonClassName: "btn-success",
        type: "button",
        value: "",
        loading: !1,
        loadText: "Aan het laden",
        disabled: !1
      }),
        (s.propTypes = {
          buttonClassName: l.a.string,
          buttonText: l.a.string.isRequired,
          onClickAction: l.a.func,
          type: l.a.string,
          value: l.a.string,
          loading: l.a.bool,
          loadText: l.a.string,
          disabled: l.a.bool
        }),
        (a.a = s);
    },
    693: function(e, a, n) {
      "use strict";
      var t = n(0),
        r = n.n(t),
        i = n(8),
        l = n.n(i),
        s = function(e) {
          var a = e.buttonClassName,
            n = e.iconName,
            t = e.onClickAction,
            i = e.title,
            l = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(a),
              onClick: t,
              disabled: l,
              title: i
            },
            r.a.createElement("span", { className: "glyphicon ".concat(n) })
          );
        };
      (s.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (s.propTypes = {
          buttonClassName: l.a.string,
          iconName: l.a.string.isRequired,
          onClickAction: l.a.func,
          title: l.a.string,
          disabled: l.a.bool
        }),
        (a.a = s);
    },
    694: function(e, a, n) {
      "use strict";
      var t = n(0),
        r = n.n(t),
        i = n(8),
        l = n.n(i),
        s = function(e) {
          var a = e.label,
            n = e.type,
            t = e.className,
            i = e.size,
            l = e.id,
            s = e.placeholder,
            o = e.name,
            c = e.value,
            u = e.onClickAction,
            m = e.onChangeAction,
            d = e.onBlurAction,
            p = e.required,
            h = e.readOnly,
            g = e.maxLength,
            b = e.error,
            f = e.min,
            y = e.max,
            N = e.step,
            v = e.errorMessage,
            A = e.divSize,
            I = e.divClassName,
            E = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(A, " ").concat(I) },
            r.a.createElement(
              "label",
              { htmlFor: l, className: "col-sm-6 ".concat(p) },
              a
            ),
            r.a.createElement(
              "div",
              { className: "".concat(i) },
              r.a.createElement("input", {
                type: n,
                className:
                  "form-control input-sm ".concat(t) + (b ? "has-error" : ""),
                id: l,
                placeholder: s,
                name: o,
                value: c,
                onClick: u,
                onChange: m,
                onBlur: d,
                readOnly: h,
                maxLength: g,
                min: f,
                max: y,
                autoComplete: E,
                step: N
              })
            ),
            b &&
              r.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                r.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  v
                )
              )
          );
        };
      (s.defaultProps = {
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
        (s.propTypes = {
          label: l.a.oneOfType([l.a.string, l.a.object]).isRequired,
          type: l.a.string,
          className: l.a.string,
          divClassName: l.a.string,
          size: l.a.string,
          divSize: l.a.string,
          id: l.a.string,
          placeholder: l.a.string,
          name: l.a.string.isRequired,
          value: l.a.oneOfType([l.a.string, l.a.number]),
          onClickAction: l.a.func,
          onChangeAction: l.a.func,
          onBlurAction: l.a.func,
          required: l.a.string,
          readOnly: l.a.bool,
          maxLength: l.a.string,
          error: l.a.bool,
          min: l.a.string,
          max: l.a.string,
          step: l.a.string,
          errorMessage: l.a.string,
          autoComplete: l.a.string
        }),
        (a.a = s);
    },
    695: function(e, a, n) {
      "use strict";
      var t = n(0),
        r = n.n(t),
        i = n(4),
        l = n(8),
        s = n.n(l),
        o = function(e) {
          var a = e.label,
            n = e.className,
            t = e.id,
            l = e.value,
            s = e.link,
            o = e.hidden;
          return s.length > 0
            ? r.a.createElement(
                "div",
                { className: n, style: o ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: t, className: "col-sm-6" },
                  a
                ),
                r.a.createElement(
                  "div",
                  { className: "col-sm-6", id: t, onClick: null },
                  r.a.createElement(
                    i.b,
                    { to: s, className: "link-underline" },
                    l
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: n, style: o ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: t, className: "col-sm-6" },
                  a
                ),
                r.a.createElement("div", { className: "col-sm-6", id: t }, l)
              );
        };
      (o.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (o.propTypes = {
          label: s.a.oneOfType([s.a.string, s.a.object]).isRequired,
          className: s.a.string,
          id: s.a.string,
          value: s.a.oneOfType([s.a.string, s.a.number]),
          link: s.a.string,
          hidden: s.a.bool
        }),
        (a.a = o);
    },
    696: function(e, a, n) {
      "use strict";
      var t = n(0),
        r = n.n(t),
        i = n(8),
        l = n.n(i),
        s = function(e) {
          var a = e.label,
            n = e.className,
            t = e.size,
            i = e.id,
            l = e.name,
            s = e.value,
            o = e.options,
            c = e.onChangeAction,
            u = e.onBlurAction,
            m = e.required,
            d = e.error,
            p = e.errorMessage,
            h = e.optionValue,
            g = e.optionName,
            b = e.readOnly,
            f = e.placeholder,
            y = e.divClassName,
            N = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(t, " ").concat(y) },
            r.a.createElement(
              "label",
              { htmlFor: i, className: "col-sm-6 ".concat(m) },
              a
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-6" },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(n) + (d && " has-error"),
                  id: i,
                  name: l,
                  value: s,
                  onChange: c,
                  onBlur: u,
                  readOnly: b
                },
                N && r.a.createElement("option", { value: "" }, f),
                o.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[h], value: e[h] },
                    e[g]
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
      (s.defaultProps = {
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
        (s.propTypes = {
          label: l.a.string.isRequired,
          className: l.a.string,
          size: l.a.string,
          id: l.a.string,
          name: l.a.string.isRequired,
          options: l.a.array,
          value: l.a.oneOfType([l.a.string, l.a.number]),
          onChangeAction: l.a.func,
          onBlurAction: l.a.func,
          required: l.a.string,
          readOnly: l.a.bool,
          error: l.a.bool,
          errorMessage: l.a.string,
          emptyOption: l.a.bool,
          optionValue: l.a.string,
          optionName: l.a.string,
          placeholder: l.a.string
        }),
        (a.a = s);
    },
    698: function(e, a, n) {
      "use strict";
      var t = n(0),
        r = n.n(t),
        i = n(8),
        l = n.n(i),
        s = function(e) {
          var a = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-heading ".concat(a) },
            n
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: l.a.string }),
        (a.a = s);
    },
    699: function(e, a, n) {
      "use strict";
      var t = n(24),
        r = n.n(t),
        i = n(25),
        l = n.n(i),
        s = n(22),
        o = n.n(s),
        c = n(26),
        u = n.n(c),
        m = n(27),
        d = n.n(m),
        p = n(16),
        h = n.n(p),
        g = n(6),
        b = n.n(g),
        f = n(0),
        y = n.n(f),
        N = n(8),
        v = n.n(N),
        A = n(707),
        I = n.n(A),
        E = n(708),
        w = n.n(E),
        R = n(7),
        C = n.n(R);
      function B(e) {
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
          var n,
            t = h()(e);
          if (a) {
            var r = h()(this).constructor;
            n = Reflect.construct(t, arguments, r);
          } else n = t.apply(this, arguments);
          return d()(this, n);
        };
      }
      C.a.locale("nl");
      var x = (function(e) {
        u()(n, e);
        var a = B(n);
        function n(e) {
          var t;
          return (
            r()(this, n),
            (t = a.call(this, e)),
            b()(o()(t), "validateDate", function(e) {
              var a = C()(e.target.value, "DD-MM-YYYY", !0),
                n = !1;
              a.isValid() || "" === e.target.value || (n = !0),
                t.props.disabledBefore &&
                  a.isBefore(t.props.disabledBefore) &&
                  (n = !0),
                t.props.disabledAfter &&
                  a.isAfter(t.props.disabledAfter) &&
                  (n = !0),
                t.setState({ errorDateFormat: n });
            }),
            b()(o()(t), "onDateChange", function(e) {
              var a = e ? C()(e).format("Y-MM-DD") : "",
                n = !1;
              a &&
                t.props.disabledBefore &&
                C()(a).isBefore(t.props.disabledBefore) &&
                (n = !0),
                a &&
                  t.props.disabledAfter &&
                  C()(a).isAfter(t.props.disabledAfter) &&
                  (n = !0),
                t.setState({ errorDateFormat: n }),
                !n && t.props.onChangeAction(a, t.props.name);
            }),
            (t.state = { errorDateFormat: !1 }),
            t
          );
        }
        return (
          l()(n, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  a = e.label,
                  n = e.className,
                  t = e.size,
                  r = e.divSize,
                  i = e.id,
                  l = e.value,
                  s = e.required,
                  o = e.readOnly,
                  c = e.name,
                  u = e.error,
                  m = e.errorMessage,
                  d = e.disabledBefore,
                  p = e.disabledAfter,
                  h = l ? C()(l).format("L") : "",
                  g = {};
                return (
                  d && (g.before = new Date(d)),
                  p && (g.after = new Date(p)),
                  y.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    y.a.createElement(
                      "div",
                      null,
                      y.a.createElement(
                        "label",
                        { htmlFor: i, className: "col-sm-6 ".concat(s) },
                        a
                      )
                    ),
                    y.a.createElement(
                      "div",
                      { className: "".concat(t) },
                      y.a.createElement(I.a, {
                        id: i,
                        value: h,
                        formatDate: E.formatDate,
                        parseDate: E.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: w.a,
                          disabledDays: g
                        },
                        inputProps: {
                          className:
                            "form-control input-sm ".concat(n) +
                            (this.state.errorDateFormat || u
                              ? " has-error"
                              : ""),
                          name: c,
                          onBlur: this.validateDate,
                          autoComplete: "off",
                          readOnly: o,
                          disabled: o
                        },
                        required: s,
                        readOnly: o,
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
          n
        );
      })(f.Component);
      (x.defaultProps = {
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
        (x.propTypes = {
          label: v.a.string.isRequired,
          type: v.a.string,
          className: v.a.string,
          size: v.a.string,
          divSize: v.a.string,
          id: v.a.string,
          name: v.a.string,
          value: v.a.oneOfType([v.a.string, v.a.object]),
          onChangeAction: v.a.func,
          required: v.a.string,
          readOnly: v.a.bool,
          error: v.a.bool,
          errorMessage: v.a.string,
          disabledBefore: v.a.string,
          disabledAfter: v.a.string
        }),
        (a.a = x);
    },
    700: function(e, a, n) {
      "use strict";
      var t = n(0),
        r = n.n(t),
        i = n(8),
        l = n.n(i),
        s = n(703),
        o = n.n(s),
        c = function(e) {
          var a = e.label,
            n = e.size,
            t = e.id,
            i = e.name,
            l = e.value,
            s = e.onChangeAction,
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
                { htmlFor: t, className: "col-sm-6 ".concat(c) },
                a
              )
            ),
            r.a.createElement(
              "div",
              { className: "".concat(n) },
              r.a.createElement(o.a, {
                id: t,
                name: i,
                onChange: s,
                checked: l,
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
          label: l.a.string.isRequired,
          type: l.a.string,
          size: l.a.string,
          divSize: l.a.string,
          id: l.a.string,
          name: l.a.string.isRequired,
          value: l.a.bool,
          onChangeAction: l.a.func,
          required: l.a.string,
          disabled: l.a.bool
        }),
        (a.a = c);
    },
    703: function(e, a, n) {
      "use strict";
      Object.defineProperty(a, "__esModule", { value: !0 });
      var t =
          Object.assign ||
          function(e) {
            for (var a = 1; a < arguments.length; a++) {
              var n = arguments[a];
              for (var t in n)
                Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
            }
            return e;
          },
        r = (function() {
          function e(e, a) {
            for (var n = 0; n < a.length; n++) {
              var t = a[n];
              (t.enumerable = t.enumerable || !1),
                (t.configurable = !0),
                "value" in t && (t.writable = !0),
                Object.defineProperty(e, t.key, t);
            }
          }
          return function(a, n, t) {
            return n && e(a.prototype, n), t && e(a, t), a;
          };
        })(),
        i = n(0),
        l = d(i),
        s = d(n(710)),
        o = d(n(8)),
        c = d(n(704)),
        u = d(n(705)),
        m = n(706);
      function d(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var p = (function(e) {
        function a(e) {
          !(function(e, a) {
            if (!(e instanceof a))
              throw new TypeError("Cannot call a class as a function");
          })(this, a);
          var n = (function(e, a) {
            if (!e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return !a || ("object" != typeof a && "function" != typeof a)
              ? e
              : a;
          })(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, e));
          return (
            (n.handleClick = n.handleClick.bind(n)),
            (n.handleTouchStart = n.handleTouchStart.bind(n)),
            (n.handleTouchMove = n.handleTouchMove.bind(n)),
            (n.handleTouchEnd = n.handleTouchEnd.bind(n)),
            (n.handleFocus = n.handleFocus.bind(n)),
            (n.handleBlur = n.handleBlur.bind(n)),
            (n.previouslyChecked = !(!e.checked && !e.defaultChecked)),
            (n.state = {
              checked: !(!e.checked && !e.defaultChecked),
              hasFocus: !1
            }),
            n
          );
        }
        return (
          (function(e, a) {
            if ("function" != typeof a && null !== a)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof a
              );
            (e.prototype = Object.create(a && a.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
              a &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, a)
                  : (e.__proto__ = a));
          })(a, e),
          r(a, [
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
                var a = this.input;
                if (e.target !== a && !this.moved)
                  return (
                    (this.previouslyChecked = a.checked),
                    e.preventDefault(),
                    a.focus(),
                    void a.click()
                  );
                var n = this.props.hasOwnProperty("checked")
                  ? this.props.checked
                  : a.checked;
                this.setState({ checked: n });
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
                  var a = (0, m.pointerCoord)(e).x;
                  this.state.checked && a + 15 < this.startX
                    ? (this.setState({ checked: !1 }),
                      (this.startX = a),
                      (this.activated = !0))
                    : a - 15 > this.startX &&
                      (this.setState({ checked: !0 }),
                      (this.startX = a),
                      (this.activated = a < this.startX + 5));
                }
              }
            },
            {
              key: "handleTouchEnd",
              value: function(e) {
                if (this.moved) {
                  var a = this.input;
                  if ((e.preventDefault(), this.startX)) {
                    var n = (0, m.pointerCoord)(e).x;
                    !0 === this.previouslyChecked && this.startX + 4 > n
                      ? this.previouslyChecked !== this.state.checked &&
                        (this.setState({ checked: !1 }),
                        (this.previouslyChecked = this.state.checked),
                        a.click())
                      : this.startX - 4 < n &&
                        this.previouslyChecked !== this.state.checked &&
                        (this.setState({ checked: !0 }),
                        (this.previouslyChecked = this.state.checked),
                        a.click()),
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
                var a = this.props.onFocus;
                a && a(e), this.setState({ hasFocus: !0 });
              }
            },
            {
              key: "handleBlur",
              value: function(e) {
                var a = this.props.onBlur;
                a && a(e), this.setState({ hasFocus: !1 });
              }
            },
            {
              key: "getIcon",
              value: function(e) {
                var n = this.props.icons;
                return n
                  ? void 0 === n[e]
                    ? a.defaultProps.icons[e]
                    : n[e]
                  : null;
              }
            },
            {
              key: "render",
              value: function() {
                var e = this,
                  a = this.props,
                  n = a.className,
                  r =
                    (a.icons,
                    (function(e, a) {
                      var n = {};
                      for (var t in e)
                        a.indexOf(t) >= 0 ||
                          (Object.prototype.hasOwnProperty.call(e, t) &&
                            (n[t] = e[t]));
                      return n;
                    })(a, ["className", "icons"])),
                  i = (0, s.default)(
                    "react-toggle",
                    {
                      "react-toggle--checked": this.state.checked,
                      "react-toggle--focus": this.state.hasFocus,
                      "react-toggle--disabled": this.props.disabled
                    },
                    n
                  );
                return l.default.createElement(
                  "div",
                  {
                    className: i,
                    onClick: this.handleClick,
                    onTouchStart: this.handleTouchStart,
                    onTouchMove: this.handleTouchMove,
                    onTouchEnd: this.handleTouchEnd
                  },
                  l.default.createElement(
                    "div",
                    { className: "react-toggle-track" },
                    l.default.createElement(
                      "div",
                      { className: "react-toggle-track-check" },
                      this.getIcon("checked")
                    ),
                    l.default.createElement(
                      "div",
                      { className: "react-toggle-track-x" },
                      this.getIcon("unchecked")
                    )
                  ),
                  l.default.createElement("div", {
                    className: "react-toggle-thumb"
                  }),
                  l.default.createElement(
                    "input",
                    t({}, r, {
                      ref: function(a) {
                        e.input = a;
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
          a
        );
      })(i.PureComponent);
      (a.default = p),
        (p.displayName = "Toggle"),
        (p.defaultProps = {
          icons: {
            checked: l.default.createElement(c.default, null),
            unchecked: l.default.createElement(u.default, null)
          }
        }),
        (p.propTypes = {
          checked: o.default.bool,
          disabled: o.default.bool,
          defaultChecked: o.default.bool,
          onChange: o.default.func,
          onFocus: o.default.func,
          onBlur: o.default.func,
          className: o.default.string,
          name: o.default.string,
          value: o.default.string,
          id: o.default.string,
          "aria-labelledby": o.default.string,
          "aria-label": o.default.string,
          icons: o.default.oneOfType([
            o.default.bool,
            o.default.shape({
              checked: o.default.node,
              unchecked: o.default.node
            })
          ])
        });
    },
    704: function(e, a, n) {
      "use strict";
      Object.defineProperty(a, "__esModule", { value: !0 });
      var t,
        r = n(0),
        i = (t = r) && t.__esModule ? t : { default: t };
      a.default = function() {
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
    705: function(e, a, n) {
      "use strict";
      Object.defineProperty(a, "__esModule", { value: !0 });
      var t,
        r = n(0),
        i = (t = r) && t.__esModule ? t : { default: t };
      a.default = function() {
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
    706: function(e, a, n) {
      "use strict";
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (a.pointerCoord = function(e) {
          if (e) {
            var a = e.changedTouches;
            if (a && a.length > 0) {
              var n = a[0];
              return { x: n.clientX, y: n.clientY };
            }
            var t = e.pageX;
            if (void 0 !== t) return { x: t, y: e.pageY };
          }
          return { x: 0, y: 0 };
        });
    },
    709: function(e, a, n) {
      "use strict";
      var t = n(0),
        r = n.n(t),
        i = n(8),
        l = n.n(i),
        s = n(714),
        o =
          (n(715),
          function(e) {
            var a = e.label,
              n = e.divSize,
              t = e.size,
              i = e.id,
              l = e.name,
              o = e.value,
              c = e.options,
              u = e.optionId,
              m = e.optionName,
              d = e.onChangeAction,
              p = e.required,
              h = e.multi,
              g = e.error,
              b = e.isLoading;
            return r.a.createElement(
              "div",
              { className: "form-group ".concat(n) },
              r.a.createElement(
                "label",
                { htmlFor: i, className: "col-sm-6 ".concat(p) },
                a
              ),
              r.a.createElement(
                "div",
                { className: "".concat(t) },
                r.a.createElement(s.a, {
                  id: i,
                  name: l,
                  value: o,
                  onChange: function(e) {
                    d(e || "", l);
                  },
                  options: c,
                  valueKey: u,
                  labelKey: m,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: h,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: g ? " has-error" : "",
                  isLoading: b
                })
              )
            );
          });
      (o.defaultProps = {
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
        (o.propTypes = {
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
        (a.a = o);
    },
    711: function(e, a) {
      e.exports = function(e, a, n, t) {
        var r = new Blob(void 0 !== t ? [t, e] : [e], {
          type: n || "application/octet-stream"
        });
        if (void 0 !== window.navigator.msSaveBlob)
          window.navigator.msSaveBlob(r, a);
        else {
          var i =
              window.URL && window.URL.createObjectURL
                ? window.URL.createObjectURL(r)
                : window.webkitURL.createObjectURL(r),
            l = document.createElement("a");
          (l.style.display = "none"),
            (l.href = i),
            l.setAttribute("download", a),
            void 0 === l.download && l.setAttribute("target", "_blank"),
            document.body.appendChild(l),
            l.click(),
            setTimeout(function() {
              document.body.removeChild(l), window.URL.revokeObjectURL(i);
            }, 200);
        }
      };
    },
    747: function(e, a, n) {
      "use strict";
      /*!
       * @license
       * This Source Code Form is subject to the terms of the Mozilla Public
       * License, v. 2.0. If a copy of the MPL was not distributed with this
       * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
      /**
       * @file Validation, extraction and creation of IBAN, BBAN, BIC/SWIFT numbers plus some other helpful stuff
       * @author Saša Jovanić
       * @module ibantools
       * @see module:ibantools
       * @version 2.2.0
       * @license MPL-2.0
       */
      function t(e) {
        if (null != e) {
          var a = new RegExp("^[0-9]{2}$", ""),
            n = p[e.slice(0, 2)];
          if (
            void 0 !== n &&
            n.IBANRegistry &&
            n.chars === e.length &&
            a.test(e.slice(2, 4)) &&
            s(e.slice(4), n.bban_regexp) &&
            (function(e) {
              for (
                var a = parseInt(e.slice(2, 4), 10),
                  n = e.slice(3) + e.slice(0, 2) + "00",
                  t = "",
                  r = 1;
                r < n.length;
                r++
              ) {
                var i = n.charCodeAt(r);
                t += i >= 65 ? (i - 55).toString() : n[r];
              }
              for (; t.length > 2; ) {
                var l = t.slice(0, 6);
                t = (parseInt(l, 10) % 97).toString() + t.slice(l.length);
              }
              return 98 - (parseInt(t, 10) % 97) === a;
            })(e)
          )
            return !0;
        }
        return !1;
      }
      function r(e, a) {
        if (null != e && null != a) {
          var n = p[a];
          if (void 0 !== n && n.chars - 4 === e.length && s(e, n.bban_regexp))
            return !0;
        }
        return !1;
      }
      function i(e) {
        var a = o(e.bban),
          n = p[e.countryCode];
        if (
          null !== a &&
          void 0 !== n &&
          n.chars === a.length + 4 &&
          s(a, n.bban_regexp)
        ) {
          var t = (function(e) {
            e = e.slice(3) + e.slice(0, 4);
            for (var a = "", n = 1; n < e.length; n++) {
              var t = e.charCodeAt(n);
              a += t >= 65 ? (t - 55).toString() : e[n];
            }
            for (; a.length > 2; ) {
              var r = a.slice(0, 6);
              a = (parseInt(r, 10) % 97).toString() + a.slice(r.length);
            }
            return parseInt(a, 10) % 97;
          })(e.countryCode + "00" + a);
          return e.countryCode + ("0" + (98 - t)).slice(-2) + a;
        }
        return null;
      }
      function l(e) {
        var a = {};
        if (((a.iban = e), t(e))) {
          (a.bban = e.slice(4)), (a.countryCode = e.slice(0, 2));
          var n = p[a.countryCode];
          (a.countryName = n.name), (a.valid = !0);
        } else a.valid = !1;
        return a;
      }
      function s(e, a) {
        return new RegExp(a, "").test(e);
      }
      function o(e) {
        return "string" != typeof e
          ? null
          : e.replace(/[-\ ]/g, "").toUpperCase();
      }
      function c(e, a) {
        return "string" != typeof e
          ? null
          : (void 0 === a && (a = " "), o(e).replace(/(.{4})(?!$)/g, "$1" + a));
      }
      function u() {
        return p;
      }
      function m(e) {
        var a = new RegExp("^[a-zA-Z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$", ""),
          n = p[e.toUpperCase().slice(4, 6)];
        return a.test(e) && void 0 !== n;
      }
      function d(e) {
        var a = {},
          n = e.toUpperCase();
        if (m(n)) {
          (a.bankCode = n.slice(0, 4)), (a.countryCode = n.slice(4, 6));
          var t = p[a.countryCode];
          (a.countryName = t.name),
            (a.locationCode = n.slice(6, 8)),
            (a.testBIC = "0" === a.locationCode[1]),
            (a.branchCode = n.length > 8 ? n.slice(8) : "619"),
            (a.valid = !0);
        } else a.valid = !1;
        return a;
      }
      n.r(a),
        n.d(a, "isValidIBAN", function() {
          return t;
        }),
        n.d(a, "isValidBBAN", function() {
          return r;
        }),
        n.d(a, "composeIBAN", function() {
          return i;
        }),
        n.d(a, "extractIBAN", function() {
          return l;
        }),
        n.d(a, "electronicFormatIBAN", function() {
          return o;
        }),
        n.d(a, "friendlyFormatIBAN", function() {
          return c;
        }),
        n.d(a, "getCountrySpecifications", function() {
          return u;
        }),
        n.d(a, "isValidBIC", function() {
          return m;
        }),
        n.d(a, "extractBIC", function() {
          return d;
        });
      var p = {
        AD: {
          chars: 24,
          bban_regexp: "^[0-9]{8}[A-Z0-9]{12}$",
          name: "Andorra",
          IBANRegistry: !0
        },
        AE: {
          chars: 23,
          bban_regexp: "^[0-9]{3}[0-9]{16}$",
          name: "United Arab Emirates",
          IBANRegistry: !0
        },
        AF: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Afganistan"
        },
        AG: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Antigua and Bermuda"
        },
        AI: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Anguilla"
        },
        AL: {
          chars: 28,
          bban_regexp: "^[0-9]{8}[A-Z0-9]{16}$",
          name: "Albania",
          IBANRegistry: !0
        },
        AM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Armenia"
        },
        AO: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Angola"
        },
        AQ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Antartica"
        },
        AR: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Argentina"
        },
        AS: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "American Samoa"
        },
        AT: {
          chars: 20,
          bban_regexp: "^[0-9]{16}$",
          name: "Austria",
          IBANRegistry: !0
        },
        AU: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Australia"
        },
        AW: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Aruba" },
        AX: {
          chars: 18,
          bban_regexp: "^[0-9]{14}$",
          name: "Åland Islands",
          IBANRegistry: !0
        },
        AZ: {
          chars: 28,
          bban_regexp: "^[A-Z]{4}[0-9]{20}$",
          name: "Republic of Azerbaijan",
          IBANRegistry: !0
        },
        BA: {
          chars: 20,
          bban_regexp: "^[0-9]{16}$",
          name: "Bosnia and Herzegovina",
          IBANRegistry: !0
        },
        BB: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Barbados"
        },
        BD: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Bangladesh"
        },
        BE: {
          chars: 16,
          bban_regexp: "^[0-9]{12}$",
          name: "Belgium",
          IBANRegistry: !0
        },
        BF: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Burkina Faso"
        },
        BG: {
          chars: 22,
          bban_regexp: "^[A-Z]{4}[0-9]{6}[A-Z0-9]{8}$",
          name: "Bulgaria",
          IBANRegistry: !0
        },
        BH: {
          chars: 22,
          bban_regexp: "^[A-Z]{4}[A-Z0-9]{14}$",
          name: "Bahrain",
          IBANRegistry: !0
        },
        BI: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Burundi"
        },
        BJ: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Benin" },
        BL: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "Saint Barthelemy",
          IBANRegistry: !0
        },
        BM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Bermuda"
        },
        BN: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Brunei Darusslam"
        },
        BO: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Bolivia, Plurinational State of"
        },
        BQ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Bonaire, Sint Eustatius and Saba"
        },
        BR: {
          chars: 29,
          bban_regexp: "^[0-9]{23}[A-Z]{1}[A-Z0-9]{1}$",
          name: "Brazil",
          IBANRegistry: !0
        },
        BS: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Bahamas"
        },
        BT: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Bhutan"
        },
        BV: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Bouvet Island"
        },
        BW: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Botswana"
        },
        BY: {
          chars: 28,
          bban_regexp: "^[A-Z]{4}[0-9]{4}[A-Z0-9]{16}$",
          name: "Republic of Belarus",
          IBANRegistry: !0
        },
        BZ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Belize"
        },
        CA: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Canada"
        },
        CC: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Cocos (Keeling) Islands"
        },
        CD: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Congo, the Democratic Republic of the"
        },
        CF: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Central African Republic"
        },
        CG: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Congo" },
        CH: {
          chars: 21,
          bban_regexp: "^[0-9]{5}[A-Z0-9]{12}$",
          name: "Switzerland",
          IBANRegistry: !0
        },
        CI: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Côte d'Ivoire"
        },
        CK: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Cook Islands"
        },
        CL: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Chile" },
        CM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Cameroon"
        },
        CN: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "China" },
        CO: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Columbia"
        },
        CR: {
          chars: 22,
          bban_regexp: "^[0-9]{18}$",
          name: "Costa Rica",
          IBANRegistry: !0
        },
        CU: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Cuba" },
        CV: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Cabo Verde"
        },
        CW: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Curaçao"
        },
        CX: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Christmas Island"
        },
        CY: {
          chars: 28,
          bban_regexp: "^[0-9]{8}[A-Z0-9]{16}$",
          name: "Cyprus",
          IBANRegistry: !0
        },
        CZ: {
          chars: 24,
          bban_regexp: "^[0-9]{20}$",
          name: "Czech Republic",
          IBANRegistry: !0
        },
        DE: {
          chars: 22,
          bban_regexp: "^[0-9]{18}$",
          name: "Germany",
          IBANRegistry: !0
        },
        DJ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Djibouti"
        },
        DK: {
          chars: 18,
          bban_regexp: "^[0-9]{14}$",
          name: "Denmark",
          IBANRegistry: !0
        },
        DM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Dominica"
        },
        DO: {
          chars: 28,
          bban_regexp: "^[A-Z]{4}[0-9]{20}$",
          name: "Dominican Republic",
          IBANRegistry: !0
        },
        DZ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Algeria"
        },
        EC: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Ecuador"
        },
        EE: {
          chars: 20,
          bban_regexp: "^[0-9]{16}$",
          name: "Estonia",
          IBANRegistry: !0
        },
        EG: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Egypt" },
        EH: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Western Sahara"
        },
        ER: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Eritrea"
        },
        ES: {
          chars: 24,
          bban_regexp: "^[0-9]{20}$",
          name: "Spain",
          IBANRegistry: !0
        },
        ET: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Ethiopia"
        },
        FI: {
          chars: 18,
          bban_regexp: "^[0-9]{14}$",
          name: "Finland",
          IBANRegistry: !0
        },
        FJ: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Fiji" },
        FK: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Falkland Islands (Malvinas)"
        },
        FM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Micronesia, Federated States of"
        },
        FO: {
          chars: 18,
          bban_regexp: "^[0-9]{14}$",
          name: "Faroe Islands (Denmark)",
          IBANRegistry: !0
        },
        FR: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "France",
          IBANRegistry: !0
        },
        GA: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Gabon" },
        GB: {
          chars: 22,
          bban_regexp: "^[A-Z]{4}[0-9]{14}$",
          name: "United Kingdom",
          IBANRegistry: !0
        },
        GD: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Grenada"
        },
        GE: {
          chars: 22,
          bban_regexp: "^[A-Z0-9]{2}[0-9]{16}$",
          name: "Georgia",
          IBANRegistry: !0
        },
        GF: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "French Guyana",
          IBANRegistry: !0
        },
        GG: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Guernsey"
        },
        GH: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Ghana" },
        GI: {
          chars: 23,
          bban_regexp: "^[A-Z]{4}[A-Z0-9]{15}$",
          name: "Gibraltar",
          IBANRegistry: !0
        },
        GL: {
          chars: 18,
          bban_regexp: "^[0-9]{14}$",
          name: "Greenland",
          IBANRegistry: !0
        },
        GM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Gambia"
        },
        GN: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Guinea"
        },
        GP: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "Guadeloupe",
          IBANRegistry: !0
        },
        GQ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Equatorial Guinea"
        },
        GR: {
          chars: 27,
          bban_regexp: "^[0-9]{7}[A-Z0-9]{16}$",
          name: "Greece",
          IBANRegistry: !0
        },
        GS: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "South Georgia and the South Sandwitch Islands"
        },
        GT: {
          chars: 28,
          bban_regexp: "^[A-Z0-9]{24}$",
          name: "Guatemala",
          IBANRegistry: !0
        },
        GU: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Guam" },
        GW: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Guinea-Bissau"
        },
        GY: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Guyana"
        },
        HK: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Hong Kong"
        },
        HM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Heard Island and McDonald Islands"
        },
        HN: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Honduras"
        },
        HR: {
          chars: 21,
          bban_regexp: "^[0-9]{17}$",
          name: "Croatia",
          IBANRegistry: !0
        },
        HT: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Haiti" },
        HU: {
          chars: 28,
          bban_regexp: "^[0-9]{24}$",
          name: "Hungary",
          IBANRegistry: !0
        },
        ID: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Indonesia"
        },
        IE: {
          chars: 22,
          bban_regexp: "^[A-Z0-9]{4}[0-9]{14}$",
          name: "Republic of Ireland",
          IBANRegistry: !0
        },
        IL: {
          chars: 23,
          bban_regexp: "^[0-9]{19}$",
          name: "Israel",
          IBANRegistry: !0
        },
        IM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Isle of Man"
        },
        IN: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "India" },
        IO: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "British Indian Ocean Territory"
        },
        IQ: {
          chars: 23,
          bban_regexp: "^[A-Z]{4}[0-9]{15}$",
          name: "Iraq",
          IBANRegistry: !0
        },
        IR: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Iran, Islamic Republic of"
        },
        IS: {
          chars: 26,
          bban_regexp: "^[0-9]{22}$",
          name: "Iceland",
          IBANRegistry: !0
        },
        IT: {
          chars: 27,
          bban_regexp: "^[A-Z]{1}[0-9]{10}[A-Z0-9]{12}$",
          name: "Italy",
          IBANRegistry: !0
        },
        JE: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Jersey"
        },
        JM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Jamaica"
        },
        JO: {
          chars: 30,
          bban_regexp: "^[A-Z]{4}[0-9]{4}[A-Z0-9]{18}$",
          name: "Jordan",
          IBANRegistry: !0
        },
        JP: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Japan" },
        KE: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Kenya" },
        KG: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Kyrgyzstan"
        },
        KH: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Cambodia"
        },
        KI: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Kiribati"
        },
        KM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Comoros"
        },
        KN: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Saint Kitts and Nevis"
        },
        KP: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Korea, Domocratic People's Republic of"
        },
        KR: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Korea, Republic of"
        },
        KW: {
          chars: 30,
          bban_regexp: "^[A-Z]{4}[A-Z0-9]{22}$",
          name: "Kuwait",
          IBANRegistry: !0
        },
        KY: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Cayman Islands"
        },
        KZ: {
          chars: 20,
          bban_regexp: "^[0-9]{3}[A-Z0-9]{13}$",
          name: "Kazakhstan",
          IBANRegistry: !0
        },
        LA: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Lao People's Democratic Republic"
        },
        LB: {
          chars: 28,
          bban_regexp: "^[0-9]{4}[A-Z0-9]{20}$",
          name: "Lebanon",
          IBANRegistry: !0
        },
        LC: {
          chars: 32,
          bban_regexp: "^[A-Z]{4}[A-Z0-9]{24}$",
          name: "Saint Lucia",
          IBANRegistry: !0
        },
        LI: {
          chars: 21,
          bban_regexp: "^[0-9]{5}[A-Z0-9]{12}$",
          name: "Liechtenstein",
          IBANRegistry: !0
        },
        LK: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Sri Lanka"
        },
        LR: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Liberia"
        },
        LS: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Lesotho"
        },
        LT: {
          chars: 20,
          bban_regexp: "^[0-9]{16}$",
          name: "Lithuania",
          IBANRegistry: !0
        },
        LU: {
          chars: 20,
          bban_regexp: "^[0-9]{3}[A-Z0-9]{13}$",
          name: "Luxembourg",
          IBANRegistry: !0
        },
        LV: {
          chars: 21,
          bban_regexp: "^[A-Z]{4}[A-Z0-9]{13}$",
          name: "Latvia",
          IBANRegistry: !0
        },
        LY: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Libya" },
        MA: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Marocco"
        },
        MC: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "Monaco",
          IBANRegistry: !0
        },
        MD: {
          chars: 24,
          bban_regexp: "^[A-Z0-9]{2}[A-Z0-9]{18}$",
          name: "Moldova",
          IBANRegistry: !0
        },
        ME: {
          chars: 22,
          bban_regexp: "^[0-9]{18}$",
          name: "Montenegro",
          IBANRegistry: !0
        },
        MF: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "Saint Martin",
          IBANRegistry: !0
        },
        MG: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Madagascar"
        },
        MH: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Marshall Islands"
        },
        MK: {
          chars: 19,
          bban_regexp: "^[0-9]{3}[A-Z0-9]{10}[0-9]{2}$",
          name: "Macedonia, the former Yugoslav Republic of",
          IBANRegistry: !0
        },
        ML: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Mali" },
        MM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Myanman"
        },
        MN: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Mongolia"
        },
        MO: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Macao" },
        MP: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Northern mariana Islands"
        },
        MQ: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "Martinique",
          IBANRegistry: !0
        },
        MR: {
          chars: 27,
          bban_regexp: "^[0-9]{23}$",
          name: "Mauritania",
          IBANRegistry: !0
        },
        MS: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Montserrat"
        },
        MT: {
          chars: 31,
          bban_regexp: "^[A-Z]{4}[0-9]{5}[A-Z0-9]{18}$",
          name: "Malta",
          IBANRegistry: !0
        },
        MU: {
          chars: 30,
          bban_regexp: "^[A-Z]{4}[0-9]{19}[A-Z]{3}$",
          name: "Mauritius",
          IBANRegistry: !0
        },
        MV: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Maldives"
        },
        MW: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Malawi"
        },
        MX: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Mexico"
        },
        MY: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Malaysia"
        },
        MZ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Mozambique"
        },
        NA: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Namibia"
        },
        NC: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "New Caledonia",
          IBANRegistry: !0
        },
        NE: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Niger" },
        NF: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Norfolk Island"
        },
        NG: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Nigeria"
        },
        NI: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Nicaraqua"
        },
        NL: {
          chars: 18,
          bban_regexp: "^[A-Z]{4}[0-9]{10}$",
          name: "Netherlands",
          IBANRegistry: !0
        },
        NO: {
          chars: 15,
          bban_regexp: "^[0-9]{11}$",
          name: "Norway",
          IBANRegistry: !0
        },
        NP: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Nepal" },
        NR: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Nauru" },
        NU: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Niue" },
        NZ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "New Zealand"
        },
        OM: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Oman" },
        PA: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Panama"
        },
        PE: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Peru" },
        PF: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "French Polynesia",
          IBANRegistry: !0
        },
        PG: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Papua New Guinea"
        },
        PH: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Philippines"
        },
        PK: {
          chars: 24,
          bban_regexp: "^[A-Z0-9]{4}[0-9]{16}$",
          name: "Pakistan",
          IBANRegistry: !0
        },
        PL: {
          chars: 28,
          bban_regexp: "^[0-9]{24}$",
          name: "Poland",
          IBANRegistry: !0
        },
        PM: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "Saint Pierre et Miquelon",
          IBANRegistry: !0
        },
        PN: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Pitcairn"
        },
        PR: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Puerto Rico"
        },
        PS: {
          chars: 29,
          bban_regexp: "^[A-Z0-9]{4}[0-9]{21}$",
          name: "Palestine, State of",
          IBANRegistry: !0
        },
        PT: {
          chars: 25,
          bban_regexp: "^[0-9]{21}$",
          name: "Portugal",
          IBANRegistry: !0
        },
        PW: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Palau" },
        PY: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Paraguay"
        },
        QA: {
          chars: 29,
          bban_regexp: "^[A-Z]{4}[A-Z0-9]{21}$",
          name: "Qatar",
          IBANRegistry: !0
        },
        RE: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "Reunion",
          IBANRegistry: !0
        },
        RO: {
          chars: 24,
          bban_regexp: "^[A-Z]{4}[A-Z0-9]{16}$",
          name: "Romania",
          IBANRegistry: !0
        },
        RS: {
          chars: 22,
          bban_regexp: "^[0-9]{18}$",
          name: "Serbia",
          IBANRegistry: !0
        },
        RU: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Russian Federation"
        },
        RW: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Rwanda"
        },
        SA: {
          chars: 24,
          bban_regexp: "^[0-9]{2}[A-Z0-9]{18}$",
          name: "Saudi Arabia",
          IBANRegistry: !0
        },
        SB: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Solomon Islands"
        },
        SC: {
          chars: 31,
          bban_regexp: "^[[A-Z]{4}[]0-9]{20}[A-Z]{3}$",
          name: "Seychelles",
          IBANRegistry: !0
        },
        SD: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Sudan" },
        SE: {
          chars: 24,
          bban_regexp: "^[0-9]{20}$",
          name: "Sweden",
          IBANRegistry: !0
        },
        SG: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Singapore"
        },
        SH: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Saint Helena, Ascension and Tristan da Cunha"
        },
        SI: {
          chars: 19,
          bban_regexp: "^[0-9]{15}$",
          name: "Slovenia",
          IBANRegistry: !0
        },
        SJ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Svalbard and Jan Mayen"
        },
        SK: {
          chars: 24,
          bban_regexp: "^[0-9]{20}$",
          name: "Slovak Republic",
          IBANRegistry: !0
        },
        SL: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Siera Leone"
        },
        SM: {
          chars: 27,
          bban_regexp: "^[A-Z]{1}[0-9]{10}[A-Z0-9]{12}$",
          name: "San Marino",
          IBANRegistry: !0
        },
        SN: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Senegal"
        },
        SO: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Somalia"
        },
        SR: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Suriname"
        },
        SS: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "South Sudan"
        },
        ST: {
          chars: 25,
          bban_regexp: "^[0-9]{21}$",
          name: "Sao Tome And Principe",
          IBANRegistry: !0
        },
        SV: {
          chars: 28,
          bban_regexp: "^[A-Z]{4}[0-9]{20}$",
          name: "El Salvador",
          IBANRegistry: !0
        },
        SX: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Sint Maarten (Dutch part)"
        },
        SY: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Syrian Arab Republic"
        },
        SZ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Swaziland"
        },
        TC: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Turks and Caicos Islands"
        },
        TD: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Chad" },
        TF: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "French Southern Territories",
          IBANRegistry: !0
        },
        TG: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Togo" },
        TH: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Thailand"
        },
        TJ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Tajikistan"
        },
        TK: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Tokelau"
        },
        TL: {
          chars: 23,
          bban_regexp: "^[0-9]{19}$",
          name: "Timor-Leste",
          IBANRegistry: !0
        },
        TM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Turkmenistan"
        },
        TN: {
          chars: 24,
          bban_regexp: "^[0-9]{20}$",
          name: "Tunisia",
          IBANRegistry: !0
        },
        TO: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Tonga" },
        TR: {
          chars: 26,
          bban_regexp: "^[0-9]{5}[A-Z0-9]{17}$",
          name: "Turkey",
          IBANRegistry: !0
        },
        TT: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Trinidad and Tobago"
        },
        TV: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Tuvalu"
        },
        TW: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Taiwan, Province of China"
        },
        TZ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Tanzania, United republic of"
        },
        UA: {
          chars: 29,
          bban_regexp: "^[0-9]{6}[A-Z0-9]{19}$",
          name: "Ukraine",
          IBANRegistry: !0
        },
        UG: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Uganda"
        },
        UM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "United States Minor Outlying Islands"
        },
        US: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "United States of America"
        },
        UY: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Uruguay"
        },
        UZ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Uzbekistan"
        },
        VA: {
          chars: 22,
          bban_regexp: "^[0-9]{18}",
          IBANRegistry: !0,
          name: "Vatican City State"
        },
        VC: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Saint Vincent and the Granadines"
        },
        VE: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Venezuela, Bolivian Republic of"
        },
        VG: {
          chars: 24,
          bban_regexp: "^[A-Z0-9]{4}[0-9]{16}$",
          name: "Virgin Islands, British",
          IBANRegistry: !0
        },
        VI: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Virgin Islands, U.S."
        },
        VN: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Viet Nam"
        },
        VU: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Vanautu"
        },
        WF: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "Wallis and Futuna",
          IBANRegistry: !0
        },
        WS: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Samoa" },
        XK: {
          chars: 20,
          bban_regexp: "^[0-9]{16}$",
          name: "Kosovo",
          IBANRegistry: !0
        },
        YE: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Yemen" },
        YT: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "Mayotte",
          IBANRegistry: !0
        },
        ZA: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "South Africa"
        },
        ZM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Zambia"
        },
        ZW: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Zimbabwe"
        }
      };
    },
    748: function(e, a, n) {
      "use strict";
      n.d(a, "d", function() {
        return t;
      }),
        n.d(a, "e", function() {
          return r;
        }),
        n.d(a, "a", function() {
          return i;
        }),
        n.d(a, "c", function() {
          return l;
        }),
        n.d(a, "b", function() {
          return s;
        });
      var t = function(e) {
          return { type: "FETCH_ADMINISTRATION_DETAILS", id: e };
        },
        r = function(e, a, n) {
          return {
            type: "UPDATE_ADMINISTRATION",
            administration: e,
            administrationId: a,
            switchToView: n
          };
        },
        i = function(e) {
          return { type: "ADD_ADMINISTRATION_USER", administrationUser: e };
        },
        l = function(e, a) {
          return {
            type: "DELETE_ADMINISTRATION_USER",
            administrationId: e,
            userId: a
          };
        },
        s = function(e) {
          return { type: "DELETE_ADMINISTRATION_SEPA", sepaId: e };
        };
    },
    856: function(e, a, n) {
      "use strict";
      n.d(a, "c", function() {
        return t;
      }),
        n.d(a, "a", function() {
          return r;
        }),
        n.d(a, "b", function() {
          return i;
        });
      var t = function() {
          return { type: "FETCH_ADMINISTRATIONS" };
        },
        r = function() {
          return { type: "CLEAR_ADMINISTRATIONS" };
        },
        i = function(e) {
          return { type: "DELETE_ADMINISTRATION", id: e };
        };
    },
    890: function(e, a, n) {
      "use strict";
      var t = n(24),
        r = n.n(t),
        i = n(25),
        l = n.n(i),
        s = n(26),
        o = n.n(s),
        c = n(27),
        u = n.n(c),
        m = n(16),
        d = n.n(m),
        p = n(0),
        h = n.n(p),
        g = n(100);
      function b(e) {
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
          var n,
            t = d()(e);
          if (a) {
            var r = d()(this).constructor;
            n = Reflect.construct(t, arguments, r);
          } else n = t.apply(this, arguments);
          return u()(this, n);
        };
      }
      var f = n(771).default,
        y = (function(e) {
          o()(n, e);
          var a = b(n);
          function n(e) {
            var t;
            return (
              r()(this, n),
              ((t = a.call(this, e)).state = { error: !1, errorMaxSize: !1 }),
              t
            );
          }
          return (
            l()(n, [
              {
                key: "onDropAccepted",
                value: function(e) {
                  var a = this;
                  this.props.addAttachment(e),
                    setTimeout(function() {
                      a.props.toggleShowNew();
                    }, 500);
                }
              },
              {
                key: "onDropRejected",
                value: function() {
                  this.setState({ errorMaxSize: !0 });
                }
              },
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    g.a,
                    {
                      closeModal: this.props.toggleShowNew,
                      showConfirmAction: !1,
                      title: "Upload bestand"
                    },
                    h.a.createElement(
                      "div",
                      { className: "upload-file-content" },
                      h.a.createElement(
                        f,
                        {
                          accept: "image/jpeg, image/png, image/jpg",
                          multiple: !1,
                          className: "dropzone",
                          onDropAccepted: this.onDropAccepted.bind(this),
                          onDropRejected: this.onDropRejected.bind(this),
                          maxSize: 6e6
                        },
                        h.a.createElement(
                          "p",
                          null,
                          "Klik hier voor het uploaden van een bestand"
                        ),
                        h.a.createElement(
                          "p",
                          null,
                          h.a.createElement("strong", null, "of"),
                          " sleep het bestand hierheen"
                        )
                      )
                    ),
                    this.state.error &&
                      h.a.createElement(
                        "p",
                        { className: "has-error-message" },
                        "Uploaden mislukt. Probeer nogmaals een bestand te uploaden."
                      ),
                    this.state.errorMaxSize &&
                      h.a.createElement(
                        "p",
                        { className: "has-error-message" },
                        "Uploaden mislukt. Het bestand mag maximaal 6MB groot zijn."
                      )
                  );
                }
              }
            ]),
            n
          );
        })(p.Component);
      a.a = y;
    }
  }
]);
