(window.webpackJsonp = window.webpackJsonp || []).push([
  [32, 7],
  {
    1519: function(e, a, n) {
      "use strict";
      n.r(a);
      var t = n(0),
        r = n.n(t),
        l = n(24),
        i = n.n(l),
        s = n(25),
        o = n.n(s),
        c = n(22),
        u = n.n(c),
        m = n(26),
        d = n.n(m),
        g = n(27),
        p = n.n(g),
        b = n(16),
        h = n.n(b),
        f = n(6),
        y = n.n(f),
        N = n(4),
        A = n(697),
        I = n.n(A),
        B = n(747),
        v = n(2),
        R = n.n(v),
        x = n(694),
        C = n(692),
        _ = n(691),
        E = n(690),
        w = n(62),
        S = n(32),
        T = n(696),
        k = n(890),
        M = n(104),
        P = n(709),
        O = n(65),
        Z = n(700),
        $ = n(695),
        D = n(699),
        L = n(7),
        z = n.n(L);
      function G(e, a) {
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
      function F(e) {
        for (var a = 1; a < arguments.length; a++) {
          var n = null != arguments[a] ? arguments[a] : {};
          a % 2
            ? G(Object(n), !0).forEach(function(a) {
                y()(e, a, n[a]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : G(Object(n)).forEach(function(a) {
                Object.defineProperty(
                  e,
                  a,
                  Object.getOwnPropertyDescriptor(n, a)
                );
              });
        }
        return e;
      }
      function q(e) {
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
          return p()(this, n);
        };
      }
      var U = (function(e) {
          d()(n, e);
          var a = q(n);
          function n(e) {
            var t;
            return (
              i()(this, n),
              (t = a.call(this, e)),
              y()(u()(t), "toggleNewLogo", function() {
                t.setState({ newLogo: !t.state.newLogo });
              }),
              y()(u()(t), "addAttachment", function(e) {
                t.setState(
                  F(
                    F({}, t.state),
                    {},
                    {
                      administration: F(
                        F({}, t.state.administration),
                        {},
                        { attachment: e[0], filename: e[0].name }
                      )
                    }
                  )
                );
              }),
              y()(u()(t), "handleInputChange", function(e) {
                var a = e.target,
                  n = "checkbox" === a.type ? a.checked : a.value,
                  r = a.name;
                t.setState(
                  F(
                    F({}, t.state),
                    {},
                    {
                      administration: F(
                        F({}, t.state.administration),
                        {},
                        y()({}, r, n)
                      )
                    }
                  )
                );
              }),
              y()(u()(t), "handleInputChangeDate", function(e, a) {
                t.setState(F(F({}, t.state), {}, y()({}, a, e)));
              }),
              y()(u()(t), "handleSubmit", function(e) {
                e.preventDefault();
                var a = t.state.administration,
                  n = {},
                  r = !1;
                I.a.isEmpty(a.name) && ((n.name = !0), (r = !0)),
                  I.a.isEmpty(a.administrationNumber) ||
                    I.a.isInt(a.administrationNumber + "") ||
                    ((n.administrationNumber = !0), (r = !0));
                var l = a.countryId;
                I.a.isEmpty(a.countryId + "") && (l = "NL");
                if (
                  (I.a.isEmpty(a.postalCode + "") ||
                    ("NL" == l
                      ? I.a.isPostalCode(a.postalCode, "NL")
                      : I.a.isPostalCode(a.postalCode, "any")) ||
                    ((n.postalCode = !0), (n.countryId = !0), (r = !0)),
                  I.a.isEmpty(a.kvkNumber) ||
                    I.a.isInt(a.kvkNumber + "") ||
                    ((n.kvkNumber = !0), (r = !0)),
                  I.a.isEmpty(a.IBAN) ||
                    B.isValidIBAN(a.IBAN) ||
                    ((n.IBAN = !0), (r = !0)),
                  I.a.isEmpty(a.email) ||
                    I.a.isEmail(a.email) ||
                    ((n.email = !0), (r = !0)),
                  I.a.isEmpty(a.emailBccNotas + "") ||
                    I.a.isEmail(a.emailBccNotas + "") ||
                    ((n.emailBccNotas = !0), (r = !0)),
                  I.a.isEmpty(a.website) ||
                    I.a.isFQDN(a.website) ||
                    ((n.website = !0), (r = !0)),
                  a.usesTwinfield &&
                    (I.a.isEmpty(a.twinfieldConnectionType + "") &&
                      ((n.twinfieldConnectionType = !0), (r = !0)),
                    "webservice" === a.twinfieldConnectionType &&
                      (I.a.isEmpty(a.twinfieldUsername + "") &&
                        ((n.twinfieldUsername = !0), (r = !0)),
                      I.a.isEmpty(a.twinfieldPassword + "") &&
                        ((n.twinfieldPassword = !0), (r = !0))),
                    "openid" === a.twinfieldConnectionType &&
                      (I.a.isEmpty(a.twinfieldClientId + "") &&
                        ((n.twinfieldClientId = !0), (r = !0)),
                      I.a.isEmpty(a.twinfieldClientSecret + "") &&
                        ((n.twinfieldClientSecret = !0), (r = !0))),
                    I.a.isEmpty(a.twinfieldOfficeCode + "") &&
                      ((n.twinfieldOfficeCode = !0), (r = !0)),
                    I.a.isEmpty(a.twinfieldOrganizationCode + "") &&
                      ((n.twinfieldOrganizationCode = !0), (r = !0))),
                  t.setState(F(F({}, t.state), {}, { errors: n })),
                  !r)
                ) {
                  var i = "Aan het laden";
                  a.usesTwinfield &&
                    (i =
                      "De koppeling Econobis Twinfield wordt gemaakt. Dit kan enige tijd duren"),
                    t.setState(
                      F(F({}, t.state), {}, { loadingText: i, isSaving: !0 })
                    );
                  var s = new FormData();
                  s.append("name", a.name),
                    s.append("administrationNumber", a.administrationNumber),
                    s.append("address", a.address),
                    s.append("postalCode", a.postalCode),
                    s.append("city", a.city),
                    s.append("countryId", a.countryId),
                    s.append("kvkNumber", a.kvkNumber),
                    s.append("btwNumber", a.btwNumber),
                    s.append("IBAN", a.IBAN),
                    s.append("ibanAttn", a.ibanAttn),
                    s.append("email", a.email),
                    s.append("website", a.website),
                    s.append("bic", a.bic),
                    s.append("sepaContractName", a.sepaContractName),
                    s.append("sepaCreditorId", a.sepaCreditorId),
                    s.append("rsinNumber", a.rsinNumber),
                    s.append("defaultPaymentTerm", a.defaultPaymentTerm),
                    s.append(
                      "emailTemplateIdCollection",
                      a.emailTemplateIdCollection
                    ),
                    s.append(
                      "emailTemplateIdTransfer",
                      a.emailTemplateIdTransfer
                    ),
                    s.append(
                      "emailTemplateReminderId",
                      a.emailTemplateReminderId
                    ),
                    s.append(
                      "emailTemplateExhortationId",
                      a.emailTemplateExhortationId
                    ),
                    s.append("usesTwinfield", a.usesTwinfield),
                    s.append("attachment", a.attachment),
                    s.append(
                      "twinfieldConnectionType",
                      a.twinfieldConnectionType
                    ),
                    s.append("twinfieldUsername", a.twinfieldUsername),
                    s.append("twinfieldPassword", a.twinfieldPassword),
                    s.append("twinfieldClientId", a.twinfieldClientId),
                    s.append("twinfieldClientSecret", a.twinfieldClientSecret),
                    s.append(
                      "twinfieldOrganizationCode",
                      a.twinfieldOrganizationCode
                    ),
                    s.append("twinfieldOfficeCode", a.twinfieldOfficeCode),
                    s.append(
                      "dateSyncTwinfieldContacts",
                      a.dateSyncTwinfieldContacts
                    ),
                    s.append(
                      "dateSyncTwinfieldPayments",
                      a.dateSyncTwinfieldPayments
                    ),
                    s.append("usesVat", a.usesVat),
                    s.append("emailBccNotas", a.emailBccNotas),
                    w.a
                      .newAdministration(s)
                      .then(function(e) {
                        N.f.push("/administratie/".concat(e.data.id));
                      })
                      .catch(function(e) {
                        console.log(e);
                      });
                }
              }),
              (t.state = {
                newLogo: !1,
                emailTemplates: [],
                mailboxAddresses: [],
                isSaving: !1,
                loadingText: "Aan het opslaan",
                administration: {
                  name: "",
                  administrationNumber: "",
                  address: "",
                  postalCode: "",
                  city: "",
                  countryId: "",
                  kvkNumber: "",
                  btwNumber: "",
                  IBAN: "",
                  ibanAttn: "",
                  email: "",
                  website: "",
                  bic: "",
                  sepaContractName: "",
                  sepaCreditorId: "",
                  rsinNumber: "",
                  defaultPaymentTerm: "",
                  emailTemplateIdCollection: "",
                  emailTemplateIdTransfer: "",
                  emailTemplateReminderId: "",
                  emailTemplateExhortationId: "",
                  attachment: "",
                  mailboxId: "",
                  usesTwinfield: !1,
                  twinfieldConnectionType: "",
                  twinfieldUsername: "",
                  twinfieldPassword: "",
                  twinfieldClientId: "",
                  twinfieldClientSecret: "",
                  twinfieldOrganizationCode: "",
                  twinfieldOfficeCode: "",
                  dateSyncTwinfieldContacts: "",
                  dateSyncTwinfieldPayments: "",
                  usesVat: !0,
                  emailBccNotas: ""
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
                u()(t)
              )),
              t
            );
          }
          return (
            o()(n, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  R.a
                    .all([
                      M.a.fetchEmailTemplatesPeek(),
                      O.a.fetchMailboxesLoggedInUserPeek()
                    ])
                    .then(
                      R.a.spread(function(a, n) {
                        e.setState({
                          emailTemplates: a,
                          mailboxAddresses: n,
                          peekLoading: F(
                            F({}, e.state.peekLoading),
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
                    F(
                      F({}, this.state),
                      {},
                      {
                        administration: F(
                          F({}, this.state.administration),
                          {},
                          y()({}, a, e)
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
                    t = e.address,
                    l = e.postalCode,
                    i = e.city,
                    s = e.countryId,
                    o = e.kvkNumber,
                    c = e.btwNumber,
                    u = e.IBAN,
                    m = e.email,
                    d = e.website,
                    g = e.bic,
                    p = e.sepaContractName,
                    b = e.sepaCreditorId,
                    h = e.rsinNumber,
                    f = e.defaultPaymentTerm,
                    y = e.attachment,
                    N = e.emailTemplateIdCollection,
                    A = e.emailTemplateIdTransfer,
                    I = e.emailTemplateReminderId,
                    B = e.emailTemplateExhortationId,
                    v = e.ibanAttn,
                    R = e.mailboxId,
                    w = e.usesTwinfield,
                    S = e.twinfieldConnectionType,
                    M = e.twinfieldUsername,
                    O = e.twinfieldPassword,
                    L = e.twinfieldClientId,
                    G = e.twinfieldClientSecret,
                    F = e.twinfieldOrganizationCode,
                    q = e.twinfieldOfficeCode,
                    U = e.dateSyncTwinfieldContacts,
                    j = e.dateSyncTwinfieldPayments,
                    K = e.usesVat,
                    Y = e.emailBccNotas,
                    V = z()(z()().format("YYYY") + "-01-01").format(
                      "YYYY-01-01"
                    ),
                    H = z()(z()().format("YYYY") + "-01-01").format(
                      "YYYY-01-01"
                    );
                  return r.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    r.a.createElement(
                      E.a,
                      null,
                      r.a.createElement(
                        _.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(x.a, {
                            label: "Naam",
                            name: "name",
                            value: a,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.name
                          }),
                          r.a.createElement(x.a, {
                            label: "Administratie nummer",
                            name: "administrationNumber",
                            value: n,
                            onChangeAction: this.handleInputChange,
                            error: this.state.errors.administrationNumber
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(x.a, {
                            label: "Adres",
                            name: "address",
                            value: t,
                            onChangeAction: this.handleInputChange
                          }),
                          r.a.createElement(x.a, {
                            label: "Postcode",
                            name: "postalCode",
                            value: l,
                            onChangeAction: this.handleInputChange,
                            error: this.state.errors.postalCode
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(x.a, {
                            label: "Plaats",
                            name: "city",
                            value: i,
                            onChangeAction: this.handleInputChange
                          }),
                          r.a.createElement(T.a, {
                            label: "Land",
                            id: "countryId",
                            size: "col-sm-6",
                            name: "countryId",
                            options: this.props.countries,
                            value: s,
                            onChangeAction: this.handleInputChange,
                            error: this.state.errors.countryId
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(x.a, {
                            label: "KvK",
                            name: "kvkNumber",
                            value: o,
                            onChangeAction: this.handleInputChange,
                            error: this.state.errors.kvkNumber
                          }),
                          r.a.createElement(x.a, {
                            label: "BTW nummer",
                            name: "btwNumber",
                            value: c,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(x.a, {
                            label: "IBAN",
                            name: "IBAN",
                            value: u,
                            onChangeAction: this.handleInputChange,
                            error: this.state.errors.IBAN
                          }),
                          r.a.createElement(x.a, {
                            label: "IBAN t.n.v.",
                            name: "ibanAttn",
                            value: v,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(x.a, {
                            label: "Website",
                            name: "website",
                            value: d,
                            onChangeAction: this.handleInputChange,
                            error: this.state.errors.website
                          }),
                          r.a.createElement(x.a, {
                            label: "Bic",
                            name: "bic",
                            value: g,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(x.a, {
                            label: "Sepa contractnaam",
                            name: "sepaContractName",
                            value: p,
                            onChangeAction: this.handleInputChange
                          }),
                          r.a.createElement(x.a, {
                            label: "Sepa crediteur id",
                            name: "sepaCreditorId",
                            value: b,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(P.a, {
                            label: "E-mail template nota incasso",
                            name: "emailTemplateIdCollection",
                            options: this.state.emailTemplates,
                            value: N,
                            onChangeAction: this.handleReactSelectChange,
                            isLoading: this.state.peekLoading.emailTemplates,
                            multi: !1
                          }),
                          r.a.createElement(x.a, {
                            label: "E-mail",
                            name: "email",
                            value: m,
                            onChangeAction: this.handleInputChange,
                            error: this.state.errors.email
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(P.a, {
                            label: "E-mail template nota overboeken",
                            name: "emailTemplateIdTransfer",
                            options: this.state.emailTemplates,
                            value: A,
                            onChangeAction: this.handleReactSelectChange,
                            isLoading: this.state.peekLoading.emailTemplates,
                            multi: !1
                          }),
                          r.a.createElement(x.a, {
                            label: "RSIN nummer",
                            name: "rsinNumber",
                            value: h,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(P.a, {
                            label: "E-mail template herinnering",
                            name: "emailTemplateReminderId",
                            options: this.state.emailTemplates,
                            value: I,
                            onChangeAction: this.handleReactSelectChange,
                            isLoading: this.state.peekLoading.emailTemplates,
                            multi: !1
                          }),
                          r.a.createElement(x.a, {
                            label: "Standaard betalingstermijn(dagen)",
                            type: "number",
                            min: "0",
                            max: "9999",
                            name: "defaultPaymentTerm",
                            value: f,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(P.a, {
                            label: "E-mail template aanmaning",
                            name: "emailTemplateExhortationId",
                            options: this.state.emailTemplates,
                            value: B,
                            onChangeAction: this.handleReactSelectChange,
                            isLoading: this.state.peekLoading.emailTemplates,
                            multi: !1
                          }),
                          r.a.createElement(
                            "div",
                            { className: "form-group col-sm-6" },
                            r.a.createElement(
                              "label",
                              { className: "col-sm-6" },
                              "Kies logo"
                            ),
                            r.a.createElement(
                              "div",
                              { className: "col-sm-6" },
                              r.a.createElement("input", {
                                type: "text",
                                className: "form-control input-sm col-sm-6",
                                value: y && y.name,
                                onClick: this.toggleNewLogo
                              })
                            )
                          )
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(T.a, {
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
                          r.a.createElement($.a, {
                            label: "Gebruikt BTW",
                            value: K ? "Ja" : "Nee",
                            className: "col-sm-6 form-group",
                            hidden: !0
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(x.a, {
                            label: "Nota's ook mailen in BCC naar",
                            name: "emailBccNotas",
                            value: Y,
                            onChangeAction: this.handleInputChange,
                            error: this.state.errors.emailBccNotas
                          })
                        ),
                        this.state.newLogo &&
                          r.a.createElement(k.a, {
                            toggleShowNew: this.toggleNewLogo,
                            addAttachment: this.addAttachment
                          }),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(
                            "div",
                            { className: "panel-part panel-heading" },
                            r.a.createElement(
                              "span",
                              { className: "h5 text-bold" },
                              "Twinfield"
                            )
                          )
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(Z.a, {
                            label: "Gebruikt Twinfield",
                            name: "usesTwinfield",
                            value: w,
                            onChangeAction: this.handleInputChange
                          }),
                          1 == w &&
                            r.a.createElement(T.a, {
                              label: "API connection type",
                              id: "twinfieldConnectionType",
                              name: "twinfieldConnectionType",
                              options: this.props.twinfieldConnectionTypes,
                              value: S,
                              onChangeAction: this.handleInputChange,
                              required: "required",
                              error: this.state.errors.twinfieldConnectionType
                            })
                        ),
                        1 == w &&
                          r.a.createElement(
                            r.a.Fragment,
                            null,
                            r.a.createElement(
                              "div",
                              { className: "row" },
                              r.a.createElement(x.a, {
                                label: "Gebruikersnaam",
                                name: "twinfieldUsername",
                                value: M,
                                onChangeAction: this.handleInputChange,
                                required: "required",
                                error: this.state.errors.twinfieldUsername
                              }),
                              r.a.createElement(x.a, {
                                label: "Wachtwoord",
                                name: "twinfieldPassword",
                                value: O,
                                onChangeAction: this.handleInputChange,
                                error: this.state.errors.twinfieldPassword,
                                required: "required"
                              })
                            ),
                            r.a.createElement(
                              "div",
                              { className: "row" },
                              r.a.createElement(x.a, {
                                label: "Client Id",
                                name: "twinfieldClientId",
                                value: L,
                                onChangeAction: this.handleInputChange,
                                error: this.state.errors.twinfieldClientId
                              }),
                              r.a.createElement(x.a, {
                                label: "Client Secret",
                                name: "twinfieldClientSecret",
                                value: G,
                                onChangeAction: this.handleInputChange,
                                error: this.state.errors.twinfieldClientSecret
                              })
                            ),
                            r.a.createElement(
                              "div",
                              { className: "row" },
                              r.a.createElement(x.a, {
                                label: "Omgeving",
                                name: "twinfieldOrganizationCode",
                                value: F,
                                onChangeAction: this.handleInputChange,
                                required: "required",
                                error: this.state.errors
                                  .twinfieldOrganizationCode
                              }),
                              r.a.createElement(x.a, {
                                label: "Code",
                                name: "twinfieldOfficeCode",
                                value: q,
                                onChangeAction: this.handleInputChange,
                                error: this.state.errors.twinfieldOfficeCode,
                                required: "required"
                              })
                            ),
                            r.a.createElement(
                              "div",
                              { className: "row" },
                              r.a.createElement(D.a, {
                                label: r.a.createElement(
                                  "span",
                                  null,
                                  "Synchroniseer contacten vanaf",
                                  r.a.createElement("br", null),
                                  r.a.createElement(
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
                                value: U,
                                onChangeAction: this.handleInputChangeDate,
                                disabledBefore: V,
                                error: this.state.errors
                                  .dateSyncTwinfieldContacts
                              }),
                              r.a.createElement(D.a, {
                                label: r.a.createElement(
                                  "span",
                                  null,
                                  "Synchroniseer betalingen vanaf",
                                  r.a.createElement("br", null),
                                  r.a.createElement(
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
                                value: j,
                                onChangeAction: this.handleInputChangeDate,
                                disabledBefore: H,
                                error: this.state.errors
                                  .dateSyncTwinfieldPayments
                              })
                            )
                          ),
                        this.state.newLogo &&
                          r.a.createElement(k.a, {
                            toggleShowNew: this.toggleNewLogo,
                            addAttachment: this.addAttachment
                          })
                      ),
                      r.a.createElement(
                        _.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          r.a.createElement(C.a, {
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
                  );
                }
              }
            ]),
            n
          );
        })(t.Component),
        j = Object(S.b)(function(e) {
          return {
            countries: e.systemData.countries,
            twinfieldConnectionTypes: e.systemData.twinfieldConnectionTypes
          };
        })(U),
        K = n(693),
        Y = function() {
          return r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(
              "div",
              { className: "col-md-4" },
              r.a.createElement(
                "div",
                {
                  className: "btn-group btn-group-flex margin-small",
                  role: "group"
                },
                r.a.createElement(K.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: N.e.goBack
                })
              )
            ),
            r.a.createElement(
              "div",
              { className: "col-md-4" },
              r.a.createElement(
                "h4",
                { className: "text-center margin-small" },
                "Nieuwe administratie"
              )
            ),
            r.a.createElement("div", { className: "col-md-4" })
          );
        };
      a.default = function() {
        return r.a.createElement(
          "div",
          { className: "row" },
          r.a.createElement(
            "div",
            { className: "col-md-9" },
            r.a.createElement(
              "div",
              { className: "col-md-12 margin-10-top" },
              r.a.createElement(
                E.a,
                null,
                r.a.createElement(
                  _.a,
                  { className: "panel-small" },
                  r.a.createElement(Y, null)
                )
              )
            ),
            r.a.createElement(
              "div",
              { className: "col-md-12 margin-10-top" },
              r.a.createElement(j, null)
            )
          ),
          r.a.createElement("div", { className: "col-md-3" })
        );
      };
    },
    690: function(e, a, n) {
      "use strict";
      var t = n(0),
        r = n.n(t),
        l = n(8),
        i = n.n(l),
        s = function(e) {
          var a = e.children,
            n = e.className,
            t = e.onMouseEnter,
            l = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(n),
              onMouseEnter: t,
              onMouseLeave: l
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
          className: i.a.string,
          onMouseEnter: i.a.func,
          onMouseLeave: i.a.func
        }),
        (a.a = s);
    },
    691: function(e, a, n) {
      "use strict";
      var t = n(0),
        r = n.n(t),
        l = n(8),
        i = n.n(l),
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
        (s.propTypes = { className: i.a.string }),
        (a.a = s);
    },
    692: function(e, a, n) {
      "use strict";
      var t = n(0),
        r = n.n(t),
        l = n(8),
        i = n.n(l),
        s = function(e) {
          var a = e.buttonClassName,
            n = e.buttonText,
            t = e.onClickAction,
            l = e.type,
            i = e.value,
            s = e.loading,
            o = e.loadText,
            c = e.disabled;
          return s
            ? r.a.createElement(
                "button",
                {
                  type: l,
                  className: "btn btn-sm btn-loading ".concat(a),
                  value: i,
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
                  type: l,
                  className: "btn btn-sm ".concat(a),
                  onClick: t,
                  value: i,
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
          buttonClassName: i.a.string,
          buttonText: i.a.string.isRequired,
          onClickAction: i.a.func,
          type: i.a.string,
          value: i.a.string,
          loading: i.a.bool,
          loadText: i.a.string,
          disabled: i.a.bool
        }),
        (a.a = s);
    },
    693: function(e, a, n) {
      "use strict";
      var t = n(0),
        r = n.n(t),
        l = n(8),
        i = n.n(l),
        s = function(e) {
          var a = e.buttonClassName,
            n = e.iconName,
            t = e.onClickAction,
            l = e.title,
            i = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(a),
              onClick: t,
              disabled: i,
              title: l
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
          buttonClassName: i.a.string,
          iconName: i.a.string.isRequired,
          onClickAction: i.a.func,
          title: i.a.string,
          disabled: i.a.bool
        }),
        (a.a = s);
    },
    694: function(e, a, n) {
      "use strict";
      var t = n(0),
        r = n.n(t),
        l = n(8),
        i = n.n(l),
        s = function(e) {
          var a = e.label,
            n = e.type,
            t = e.className,
            l = e.size,
            i = e.id,
            s = e.placeholder,
            o = e.name,
            c = e.value,
            u = e.onClickAction,
            m = e.onChangeAction,
            d = e.onBlurAction,
            g = e.required,
            p = e.readOnly,
            b = e.maxLength,
            h = e.error,
            f = e.min,
            y = e.max,
            N = e.step,
            A = e.errorMessage,
            I = e.divSize,
            B = e.divClassName,
            v = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(I, " ").concat(B) },
            r.a.createElement(
              "label",
              { htmlFor: i, className: "col-sm-6 ".concat(g) },
              a
            ),
            r.a.createElement(
              "div",
              { className: "".concat(l) },
              r.a.createElement("input", {
                type: n,
                className:
                  "form-control input-sm ".concat(t) + (h ? "has-error" : ""),
                id: i,
                placeholder: s,
                name: o,
                value: c,
                onClick: u,
                onChange: m,
                onBlur: d,
                readOnly: p,
                maxLength: b,
                min: f,
                max: y,
                autoComplete: v,
                step: N
              })
            ),
            h &&
              r.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                r.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  A
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
        (a.a = s);
    },
    695: function(e, a, n) {
      "use strict";
      var t = n(0),
        r = n.n(t),
        l = n(4),
        i = n(8),
        s = n.n(i),
        o = function(e) {
          var a = e.label,
            n = e.className,
            t = e.id,
            i = e.value,
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
                    l.b,
                    { to: s, className: "link-underline" },
                    i
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
                r.a.createElement("div", { className: "col-sm-6", id: t }, i)
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
        l = n(8),
        i = n.n(l),
        s = function(e) {
          var a = e.label,
            n = e.className,
            t = e.size,
            l = e.id,
            i = e.name,
            s = e.value,
            o = e.options,
            c = e.onChangeAction,
            u = e.onBlurAction,
            m = e.required,
            d = e.error,
            g = e.errorMessage,
            p = e.optionValue,
            b = e.optionName,
            h = e.readOnly,
            f = e.placeholder,
            y = e.divClassName,
            N = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(t, " ").concat(y) },
            r.a.createElement(
              "label",
              { htmlFor: l, className: "col-sm-6 ".concat(m) },
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
                  id: l,
                  name: i,
                  value: s,
                  onChange: c,
                  onBlur: u,
                  readOnly: h
                },
                N && r.a.createElement("option", { value: "" }, f),
                o.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[p], value: e[p] },
                    e[b]
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
                  g
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
        (a.a = s);
    },
    699: function(e, a, n) {
      "use strict";
      var t = n(24),
        r = n.n(t),
        l = n(25),
        i = n.n(l),
        s = n(22),
        o = n.n(s),
        c = n(26),
        u = n.n(c),
        m = n(27),
        d = n.n(m),
        g = n(16),
        p = n.n(g),
        b = n(6),
        h = n.n(b),
        f = n(0),
        y = n.n(f),
        N = n(8),
        A = n.n(N),
        I = n(707),
        B = n.n(I),
        v = n(708),
        R = n.n(v),
        x = n(7),
        C = n.n(x);
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
            t = p()(e);
          if (a) {
            var r = p()(this).constructor;
            n = Reflect.construct(t, arguments, r);
          } else n = t.apply(this, arguments);
          return d()(this, n);
        };
      }
      C.a.locale("nl");
      var E = (function(e) {
        u()(n, e);
        var a = _(n);
        function n(e) {
          var t;
          return (
            r()(this, n),
            (t = a.call(this, e)),
            h()(o()(t), "validateDate", function(e) {
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
            h()(o()(t), "onDateChange", function(e) {
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
          i()(n, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  a = e.label,
                  n = e.className,
                  t = e.size,
                  r = e.divSize,
                  l = e.id,
                  i = e.value,
                  s = e.required,
                  o = e.readOnly,
                  c = e.name,
                  u = e.error,
                  m = e.errorMessage,
                  d = e.disabledBefore,
                  g = e.disabledAfter,
                  p = i ? C()(i).format("L") : "",
                  b = {};
                return (
                  d && (b.before = new Date(d)),
                  g && (b.after = new Date(g)),
                  y.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    y.a.createElement(
                      "div",
                      null,
                      y.a.createElement(
                        "label",
                        { htmlFor: l, className: "col-sm-6 ".concat(s) },
                        a
                      )
                    ),
                    y.a.createElement(
                      "div",
                      { className: "".concat(t) },
                      y.a.createElement(B.a, {
                        id: l,
                        value: p,
                        formatDate: v.formatDate,
                        parseDate: v.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: R.a,
                          disabledDays: b
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
      (E.defaultProps = {
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
        (E.propTypes = {
          label: A.a.string.isRequired,
          type: A.a.string,
          className: A.a.string,
          size: A.a.string,
          divSize: A.a.string,
          id: A.a.string,
          name: A.a.string,
          value: A.a.oneOfType([A.a.string, A.a.object]),
          onChangeAction: A.a.func,
          required: A.a.string,
          readOnly: A.a.bool,
          error: A.a.bool,
          errorMessage: A.a.string,
          disabledBefore: A.a.string,
          disabledAfter: A.a.string
        }),
        (a.a = E);
    },
    700: function(e, a, n) {
      "use strict";
      var t = n(0),
        r = n.n(t),
        l = n(8),
        i = n.n(l),
        s = n(703),
        o = n.n(s),
        c = function(e) {
          var a = e.label,
            n = e.size,
            t = e.id,
            l = e.name,
            i = e.value,
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
                name: l,
                onChange: s,
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
        l = n(0),
        i = d(l),
        s = d(n(710)),
        o = d(n(8)),
        c = d(n(704)),
        u = d(n(705)),
        m = n(706);
      function d(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var g = (function(e) {
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
                  l = (0, s.default)(
                    "react-toggle",
                    {
                      "react-toggle--checked": this.state.checked,
                      "react-toggle--focus": this.state.hasFocus,
                      "react-toggle--disabled": this.props.disabled
                    },
                    n
                  );
                return i.default.createElement(
                  "div",
                  {
                    className: l,
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
      })(l.PureComponent);
      (a.default = g),
        (g.displayName = "Toggle"),
        (g.defaultProps = {
          icons: {
            checked: i.default.createElement(c.default, null),
            unchecked: i.default.createElement(u.default, null)
          }
        }),
        (g.propTypes = {
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
        l = (t = r) && t.__esModule ? t : { default: t };
      a.default = function() {
        return l.default.createElement(
          "svg",
          { width: "14", height: "11", viewBox: "0 0 14 11" },
          l.default.createElement("title", null, "switch-check"),
          l.default.createElement("path", {
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
        l = (t = r) && t.__esModule ? t : { default: t };
      a.default = function() {
        return l.default.createElement(
          "svg",
          { width: "10", height: "10", viewBox: "0 0 10 10" },
          l.default.createElement("title", null, "switch-x"),
          l.default.createElement("path", {
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
        l = n(8),
        i = n.n(l),
        s = n(714),
        o =
          (n(715),
          function(e) {
            var a = e.label,
              n = e.divSize,
              t = e.size,
              l = e.id,
              i = e.name,
              o = e.value,
              c = e.options,
              u = e.optionId,
              m = e.optionName,
              d = e.onChangeAction,
              g = e.required,
              p = e.multi,
              b = e.error,
              h = e.isLoading;
            return r.a.createElement(
              "div",
              { className: "form-group ".concat(n) },
              r.a.createElement(
                "label",
                { htmlFor: l, className: "col-sm-6 ".concat(g) },
                a
              ),
              r.a.createElement(
                "div",
                { className: "".concat(t) },
                r.a.createElement(s.a, {
                  id: l,
                  name: i,
                  value: o,
                  onChange: function(e) {
                    d(e || "", i);
                  },
                  options: c,
                  valueKey: u,
                  labelKey: m,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: p,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: b ? " has-error" : "",
                  isLoading: h
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
        (a.a = o);
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
            n = g[e.slice(0, 2)];
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
                var l = n.charCodeAt(r);
                t += l >= 65 ? (l - 55).toString() : n[r];
              }
              for (; t.length > 2; ) {
                var i = t.slice(0, 6);
                t = (parseInt(i, 10) % 97).toString() + t.slice(i.length);
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
          var n = g[a];
          if (void 0 !== n && n.chars - 4 === e.length && s(e, n.bban_regexp))
            return !0;
        }
        return !1;
      }
      function l(e) {
        var a = o(e.bban),
          n = g[e.countryCode];
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
      function i(e) {
        var a = {};
        if (((a.iban = e), t(e))) {
          (a.bban = e.slice(4)), (a.countryCode = e.slice(0, 2));
          var n = g[a.countryCode];
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
        return g;
      }
      function m(e) {
        var a = new RegExp("^[a-zA-Z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$", ""),
          n = g[e.toUpperCase().slice(4, 6)];
        return a.test(e) && void 0 !== n;
      }
      function d(e) {
        var a = {},
          n = e.toUpperCase();
        if (m(n)) {
          (a.bankCode = n.slice(0, 4)), (a.countryCode = n.slice(4, 6));
          var t = g[a.countryCode];
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
          return l;
        }),
        n.d(a, "extractIBAN", function() {
          return i;
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
      var g = {
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
    890: function(e, a, n) {
      "use strict";
      var t = n(24),
        r = n.n(t),
        l = n(25),
        i = n.n(l),
        s = n(26),
        o = n.n(s),
        c = n(27),
        u = n.n(c),
        m = n(16),
        d = n.n(m),
        g = n(0),
        p = n.n(g),
        b = n(100);
      function h(e) {
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
          var a = h(n);
          function n(e) {
            var t;
            return (
              r()(this, n),
              ((t = a.call(this, e)).state = { error: !1, errorMaxSize: !1 }),
              t
            );
          }
          return (
            i()(n, [
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
                  return p.a.createElement(
                    b.a,
                    {
                      closeModal: this.props.toggleShowNew,
                      showConfirmAction: !1,
                      title: "Upload bestand"
                    },
                    p.a.createElement(
                      "div",
                      { className: "upload-file-content" },
                      p.a.createElement(
                        f,
                        {
                          accept: "image/jpeg, image/png, image/jpg",
                          multiple: !1,
                          className: "dropzone",
                          onDropAccepted: this.onDropAccepted.bind(this),
                          onDropRejected: this.onDropRejected.bind(this),
                          maxSize: 6e6
                        },
                        p.a.createElement(
                          "p",
                          null,
                          "Klik hier voor het uploaden van een bestand"
                        ),
                        p.a.createElement(
                          "p",
                          null,
                          p.a.createElement("strong", null, "of"),
                          " sleep het bestand hierheen"
                        )
                      )
                    ),
                    this.state.error &&
                      p.a.createElement(
                        "p",
                        { className: "has-error-message" },
                        "Uploaden mislukt. Probeer nogmaals een bestand te uploaden."
                      ),
                    this.state.errorMaxSize &&
                      p.a.createElement(
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
        })(g.Component);
      a.a = y;
    }
  }
]);
