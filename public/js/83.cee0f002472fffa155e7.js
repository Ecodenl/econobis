(window.webpackJsonp = window.webpackJsonp || []).push([
  [83],
  {
    1453: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        o = a.n(n),
        r = a(25),
        s = a.n(r),
        l = a(22),
        i = a.n(l),
        c = a(26),
        m = a.n(c),
        p = a(27),
        u = a.n(p),
        d = a(16),
        g = a.n(d),
        h = a(6),
        b = a.n(h),
        v = a(0),
        f = a.n(v),
        k = a(198),
        y = a(199),
        C = a.n(y),
        N = a(32),
        E = a(697),
        S = a.n(E),
        w = a(7),
        T = a.n(w),
        x = a(692),
        R = a(690),
        I = a(691),
        P = a(12),
        A = function(e) {
          var t = "".concat("setting", "/multiple").concat(e);
          return P.a.get(t);
        },
        O = function(e) {
          var t = "".concat("setting");
          return P.a.post(t, e);
        },
        z = a(14),
        L = a(201),
        U = a(694),
        q = a(746),
        D = a(709),
        j = a(700),
        F = a(100);
      function M(e) {
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
          return u()(this, a);
        };
      }
      var B = a(771).default,
        H = (function(e) {
          m()(a, e);
          var t = M(a);
          function a(e) {
            var n;
            return (
              o()(this, a),
              ((n = t.call(this, e)).state = { error: !1, errorMaxSize: !1 }),
              n
            );
          }
          return (
            s()(a, [
              {
                key: "onDropAccepted",
                value: function(e) {
                  var t = this;
                  this.props.addLogo(e),
                    setTimeout(function() {
                      t.props.toggleShowNewLogo();
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
                  return f.a.createElement(
                    F.a,
                    {
                      closeModal: this.props.toggleShowNewLogo,
                      showConfirmAction: !1,
                      title: "Upload logo bestand (PNG)"
                    },
                    f.a.createElement(
                      "div",
                      { className: "upload-file-content" },
                      f.a.createElement(
                        B,
                        {
                          accept: "image/png",
                          multiple: !1,
                          className: "dropzone",
                          onDropAccepted: this.onDropAccepted.bind(this),
                          onDropRejected: this.onDropRejected.bind(this),
                          maxSize: 6e6
                        },
                        f.a.createElement(
                          "p",
                          null,
                          "Klik hier voor het uploaden van een bestand"
                        ),
                        f.a.createElement(
                          "p",
                          null,
                          f.a.createElement("strong", null, "of"),
                          " sleep het bestand hierheen"
                        )
                      )
                    ),
                    this.state.error &&
                      f.a.createElement(
                        "p",
                        { className: "has-error-message" },
                        "Uploaden mislukt. Probeer nogmaals een bestand te uploaden."
                      ),
                    this.state.errorMaxSize &&
                      f.a.createElement(
                        "p",
                        { className: "has-error-message" },
                        "Uploaden mislukt. Het bestand moet bestandstype PNG zijn en mag maximaal 6MB groot zijn."
                      )
                  );
                }
              }
            ]),
            a
          );
        })(v.Component);
      function W(e) {
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
          return u()(this, a);
        };
      }
      var V = a(771).default,
        G = (function(e) {
          m()(a, e);
          var t = W(a);
          function a(e) {
            var n;
            return (
              o()(this, a),
              ((n = t.call(this, e)).state = { error: !1, errorMaxSize: !1 }),
              n
            );
          }
          return (
            s()(a, [
              {
                key: "onDropAccepted",
                value: function(e) {
                  var t = this;
                  this.props.addFavicon(e),
                    setTimeout(function() {
                      t.props.toggleShowNewFavicon();
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
                  return f.a.createElement(
                    F.a,
                    {
                      closeModal: this.props.toggleShowNewFavicon,
                      showConfirmAction: !1,
                      title: "Upload favicon bestand (ICO)"
                    },
                    f.a.createElement(
                      "div",
                      { className: "upload-file-content" },
                      f.a.createElement(
                        V,
                        {
                          accept: ".ico",
                          multiple: !1,
                          className: "dropzone",
                          onDropAccepted: this.onDropAccepted.bind(this),
                          onDropRejected: this.onDropRejected.bind(this),
                          maxSize: 1e6
                        },
                        f.a.createElement(
                          "p",
                          null,
                          "Klik hier voor het uploaden van een bestand"
                        ),
                        f.a.createElement(
                          "p",
                          null,
                          f.a.createElement("strong", null, "of"),
                          " sleep het bestand hierheen"
                        )
                      )
                    ),
                    this.state.error &&
                      f.a.createElement(
                        "p",
                        { className: "has-error-message" },
                        "Uploaden mislukt. Probeer nogmaals een bestand te uploaden."
                      ),
                    this.state.errorMaxSize &&
                      f.a.createElement(
                        "p",
                        { className: "has-error-message" },
                        "Uploaden mislukt. Het bestand moet bestandstype ICO zijn en mag maximaal 1MB groot zijn."
                      )
                  );
                }
              }
            ]),
            a
          );
        })(v.Component),
        K = a(1062);
      function _(e, t) {
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
      function J(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? _(Object(a), !0).forEach(function(t) {
                b()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : _(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Q(e) {
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
          return u()(this, a);
        };
      }
      T.a.locale("nl");
      var X = (function(e) {
          m()(a, e);
          var t = Q(a);
          function a(e) {
            var n;
            return (
              o()(this, a),
              (n = t.call(this, e)),
              b()(i()(n), "toggleNewLogo", function() {
                n.manageTechnicalPortalSettings &&
                  n.setState({ newLogo: !n.state.newLogo });
              }),
              b()(i()(n), "toggleNewFavicon", function() {
                n.manageTechnicalPortalSettings &&
                  n.setState({ newFavicon: !n.state.newFavicon });
              }),
              b()(i()(n), "addLogo", function(e) {
                n.setState(
                  J(
                    J({}, n.state),
                    {},
                    { attachmentLogo: e[0], filenameLogo: e[0].name }
                  )
                );
              }),
              b()(i()(n), "addFavicon", function(e) {
                n.setState(
                  J(
                    J({}, n.state),
                    {},
                    { attachmentFavicon: e[0], filenameFavicon: e[0].name }
                  )
                );
              }),
              b()(i()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  o = t.name;
                n.setState(
                  J(
                    J({}, n.state),
                    {},
                    {
                      portalSettings: J(
                        J({}, n.state.portalSettings),
                        {},
                        b()({}, o, a)
                      )
                    }
                  )
                );
              }),
              b()(i()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state,
                  a = t.portalSettings,
                  o = t.attachmentLogo,
                  r = t.attachmentFavicon,
                  s = {},
                  l = !1;
                S.a.isEmpty(a.portalUrl) && ((s.portalUrl = !0), (l = !0)),
                  S.a.isEmpty(a.backgroundColor) &&
                    ((s.backgroundColor = !0), (l = !0)),
                  S.a.isEmpty(a.backgroundTextColor) &&
                    ((s.backgroundTextColor = !0), (l = !0)),
                  S.a.isEmpty(a.backgroundImageColor) &&
                    ((s.backgroundImageColor = !0), (l = !0)),
                  S.a.isEmpty(a.backgroundImageTextColor) &&
                    ((s.backgroundImageTextColor = !0), (l = !0)),
                  S.a.isEmpty(a.backgroundSecondaryColor) &&
                    ((s.backgroundSecondaryColor = !0), (l = !0)),
                  S.a.isEmpty(a.backgroundSecondaryTextColor) &&
                    ((s.backgroundSecondaryTextColor = !0), (l = !0)),
                  S.a.isEmpty(a.buttonColor) &&
                    ((s.buttonColor = !0), (l = !0)),
                  S.a.isEmpty(a.buttonTextColor) &&
                    ((s.buttonTextColor = !0), (l = !0)),
                  !n.manageTechnicalPortalSettings &&
                    S.a.isEmpty(a.responsibleUserId + "") &&
                    ((s.responsibleUserId = !0), (l = !0)),
                  !n.manageTechnicalPortalSettings &&
                    S.a.isEmpty(a.contactResponsibleOwnerUserId + "") &&
                    ((s.contactResponsibleOwnerUserId = !0), (l = !0)),
                  !n.manageTechnicalPortalSettings &&
                    S.a.isEmpty(a.checkContactTaskResponsible + "") &&
                    ((s.checkContactTaskResponsible = !0), (l = !0)),
                  !n.manageTechnicalPortalSettings &&
                    S.a.isEmpty(a.linkPrivacyPolicy) &&
                    ((s.linkPrivacyPolicy = !0), (l = !0)),
                  !n.manageTechnicalPortalSettings &&
                    S.a.isEmpty(a.emailTemplateNewAccountId + "") &&
                    ((s.emailTemplateNewAccountId = !0), (l = !0)),
                  !n.manageTechnicalPortalSettings &&
                    S.a.isEmpty(a.portalName) &&
                    ((s.portalName = !0), (l = !0)),
                  !n.manageTechnicalPortalSettings &&
                    S.a.isEmpty(a.cooperativeName) &&
                    ((s.cooperativeName = !0), (l = !0)),
                  !n.manageTechnicalPortalSettings &&
                    S.a.isEmpty(a.portalWebsite) &&
                    ((s.portalWebsite = !0), (l = !0)),
                  a.checkContactTaskResponsible.search("user") >= 0 &&
                    ((a.checkContactTaskResponsibleUserId = a.checkContactTaskResponsible.replace(
                      "user",
                      ""
                    )),
                    (a.checkContactTaskResponsibleTeamId = "")),
                  a.checkContactTaskResponsible.search("team") >= 0 &&
                    ((a.checkContactTaskResponsibleUserId = ""),
                    (a.checkContactTaskResponsibleTeamId = a.checkContactTaskResponsible.replace(
                      "team",
                      ""
                    )));
                var i = new FormData();
                i.append("portalName", a.portalName ? a.portalName : ""),
                  i.append(
                    "cooperativeName",
                    a.cooperativeName ? a.cooperativeName : ""
                  ),
                  i.append(
                    "portalWebsite",
                    a.portalWebsite ? a.portalWebsite : ""
                  ),
                  i.append("portalUrl", a.portalUrl),
                  i.append("backgroundColor", a.backgroundColor),
                  i.append("backgroundTextColor", a.backgroundTextColor),
                  i.append("backgroundImageColor", a.backgroundImageColor),
                  i.append(
                    "backgroundImageTextColor",
                    a.backgroundImageTextColor
                  ),
                  i.append(
                    "backgroundSecondaryColor",
                    a.backgroundSecondaryColor
                  ),
                  i.append(
                    "backgroundSecondaryTextColor",
                    a.backgroundSecondaryTextColor
                  ),
                  i.append("buttonColor", a.buttonColor),
                  i.append("buttonTextColor", a.buttonTextColor),
                  i.append(
                    "responsibleUserId",
                    a.responsibleUserId ? a.responsibleUserId : ""
                  ),
                  i.append(
                    "checkContactTaskResponsibleUserId",
                    a.checkContactTaskResponsibleUserId
                      ? a.checkContactTaskResponsibleUserId
                      : ""
                  ),
                  i.append(
                    "checkContactTaskResponsibleTeamId",
                    a.checkContactTaskResponsibleTeamId
                      ? a.checkContactTaskResponsibleTeamId
                      : ""
                  ),
                  i.append(
                    "contactResponsibleOwnerUserId",
                    a.contactResponsibleOwnerUserId
                      ? a.contactResponsibleOwnerUserId
                      : ""
                  ),
                  i.append(
                    "emailTemplateNewAccountId",
                    a.emailTemplateNewAccountId
                      ? a.emailTemplateNewAccountId
                      : ""
                  ),
                  i.append(
                    "linkPrivacyPolicy",
                    a.linkPrivacyPolicy ? a.linkPrivacyPolicy : ""
                  ),
                  i.append(
                    "showNewAtCooperativeLink",
                    a.showNewAtCooperativeLink
                  ),
                  i.append("attachmentLogo", o),
                  i.append("attachmentFavicon", r),
                  n.setState(J(J({}, n.state), {}, { errors: s })),
                  !l &&
                    O(i)
                      .then(function(e) {
                        n.props.updateState(a),
                          n.props.fetchSystemData(),
                          n.props.switchToView();
                      })
                      .catch(function(e) {
                        alert(
                          "Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals."
                        );
                      });
              }),
              (n.manageTechnicalPortalSettings =
                "support@econobis.nl" == n.props.meDetails.email ||
                "info@xaris.nl" == n.props.meDetails.email),
              (n.state = {
                portalSettings: J({}, e.portalSettings),
                emailTemplates: J({}, e.emailTemplates),
                attachmentLogo: "",
                filenameLogo: "logo.png",
                newLogo: !1,
                attachmentFavicon: "",
                filenameFavicon: "favicon.ico",
                newFavicon: !1,
                errors: {
                  portalName: !1,
                  cooperativeName: !1,
                  portalWebsite: !1,
                  portalUrl: !1,
                  backgroundColor: !1,
                  backgroundTextColor: !1,
                  backgroundImageColor: !1,
                  backgroundImageTextColor: !1,
                  backgroundSecondaryColor: !1,
                  backgroundSecondaryTextColor: !1,
                  buttonColor: !1,
                  buttonTextColor: !1,
                  responsibleUserId: !1,
                  checkContactTaskResponsibleUserId: !1,
                  checkContactTaskResponsibleTeamId: !1,
                  checkContactTaskResponsible: !1,
                  contactResponsibleOwnerUserId: !1,
                  emailTemplateNewAccountId: !1,
                  linkPrivacyPolicy: !1,
                  showNewAtCooperativeLink: !1
                }
              }),
              (n.handleReactSelectChange = n.handleReactSelectChange.bind(
                i()(n)
              )),
              n
            );
          }
          return (
            s()(a, [
              {
                key: "handleReactSelectChange",
                value: function(e, t) {
                  this.setState(
                    J(
                      J({}, this.state),
                      {},
                      {
                        portalSettings: J(
                          J({}, this.state.portalSettings),
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
                  var e = this.state.portalSettings,
                    t = e.portalName,
                    a = e.cooperativeName,
                    n = e.portalWebsite,
                    o = e.portalUrl,
                    r = e.backgroundColor,
                    s = e.backgroundTextColor,
                    l = e.backgroundImageColor,
                    i = e.backgroundImageTextColor,
                    c = e.backgroundSecondaryColor,
                    m = e.backgroundSecondaryTextColor,
                    p = e.buttonColor,
                    u = e.buttonTextColor,
                    d = e.responsibleUserId,
                    g = e.checkContactTaskResponsible,
                    h = e.contactResponsibleOwnerUserId,
                    b = e.emailTemplateNewAccountId,
                    v = e.linkPrivacyPolicy,
                    k = e.showNewAtCooperativeLink,
                    y = ""
                      .concat(URL_API, "/portal/images/logo.png?")
                      .concat(this.props.imageHash),
                    C = ""
                      .concat(URL_API, "/portal/favicon.ico?")
                      .concat(this.props.imageHash);
                  return f.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    f.a.createElement(
                      R.a,
                      null,
                      f.a.createElement(
                        I.a,
                        null,
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(U.a, {
                            label: "Contacten portal URL",
                            divSize: "col-sm-8",
                            name: "portalUrl",
                            value: o,
                            onChangeAction: this.handleInputChange,
                            readOnly: !this.manageTechnicalPortalSettings,
                            required: "required",
                            error: this.state.errors.portalUrl
                          })
                        ),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(U.a, {
                            label: "Logo",
                            divSize: "col-sm-8",
                            value: this.state.attachmentLogo.name
                              ? this.state.attachmentLogo.name
                              : "logo.png",
                            onClickAction: this.toggleNewLogo,
                            onChangeaction: function() {},
                            readOnly: !this.manageTechnicalPortalSettings,
                            required: "required"
                          }),
                          f.a.createElement(K.a, {
                            src:
                              this.state.attachmentLogo &&
                              this.state.attachmentLogo.preview
                                ? this.state.attachmentLogo.preview
                                : y,
                            style: {
                              backgroundColor: l,
                              color: i,
                              border: "1px solid #999",
                              display: "inline-block",
                              padding: "1px",
                              borderRadius: "1px",
                              height: "50px",
                              boxShadow: "0 0 0 1px #fff inset"
                            }
                          })
                        ),
                        this.state.newLogo &&
                          f.a.createElement(H, {
                            toggleShowNewLogo: this.toggleNewLogo,
                            addLogo: this.addLogo
                          }),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(U.a, {
                            label: "Favicon",
                            divSize: "col-sm-8",
                            value: "favicon.ico",
                            onClickAction: this.toggleNewFavicon,
                            onChangeaction: function() {},
                            readOnly: !this.manageTechnicalPortalSettings,
                            required: "required"
                          }),
                          f.a.createElement(K.a, {
                            src:
                              this.state.attachmentFavicon &&
                              this.state.attachmentFavicon.preview
                                ? this.state.attachmentFavicon.preview
                                : C,
                            style: {
                              border: "1px solid #999",
                              display: "inline-block",
                              padding: "1px",
                              borderRadius: "1px",
                              height: "20px",
                              boxShadow: "0 0 0 1px #fff inset"
                            }
                          })
                        ),
                        this.state.newFavicon &&
                          f.a.createElement(G, {
                            toggleShowNewFavicon: this.toggleNewFavicon,
                            addFavicon: this.addFavicon
                          }),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(U.a, {
                            label: "Login - achtergrond afbeelding kleur",
                            divSize: "col-sm-8",
                            name: "backgroundImageColor",
                            value: l,
                            readOnly: !this.manageTechnicalPortalSettings,
                            required: "required",
                            onChangeAction: this.handleInputChange,
                            error: this.state.errors.backgroundImageColor
                          }),
                          f.a.createElement(
                            "span",
                            {
                              className: "rc-color-picker-trigger",
                              unselectable: "unselectable",
                              style: {
                                backgroundColor: l,
                                color: i,
                                border: "1px solid #999",
                                display: "inline-block",
                                padding: "2px",
                                borderRadius: "2px",
                                width: "50px",
                                height: "30px",
                                boxShadow: "0 0 0 2px #fff inset"
                              }
                            },
                            "Tekst"
                          )
                        ),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(U.a, {
                            label: "Login - achtergrond afbeelding tekst kleur",
                            divSize: "col-sm-8",
                            name: "backgroundImageTextColor",
                            value: i,
                            onChangeAction: this.handleInputChange,
                            readOnly: !this.manageTechnicalPortalSettings,
                            required: "required",
                            error: this.state.errors.backgroundImageTextColor
                          })
                        ),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(U.a, {
                            label: "Login - veld achtergrond kleur",
                            divSize: "col-sm-8",
                            name: "backgroundSecondaryColor",
                            value: c,
                            onChangeAction: this.handleInputChange,
                            readOnly: !this.manageTechnicalPortalSettings,
                            required: "required",
                            error: this.state.errors.backgroundSecondaryColor
                          }),
                          f.a.createElement(
                            "div",
                            {
                              className: "rc-color-picker-trigger",
                              unselectable: "unselectable",
                              style: {
                                backgroundColor: l,
                                display: "inline-block"
                              }
                            },
                            f.a.createElement(
                              "span",
                              {
                                className: "rc-color-picker-trigger",
                                unselectable: "unselectable",
                                style: {
                                  backgroundColor: c,
                                  color: m,
                                  border: "1px solid #999",
                                  display: "inline-block",
                                  padding: "2px",
                                  borderRadius: "2px",
                                  width: "50px",
                                  height: "30px",
                                  boxShadow: "0 0 0 2px #fff inset"
                                }
                              },
                              "Tekst"
                            )
                          )
                        ),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(U.a, {
                            label: "Login - veld tekst kleur",
                            divSize: "col-sm-8",
                            name: "backgroundSecondaryTextColor",
                            value: m,
                            onChangeAction: this.handleInputChange,
                            readOnly: !this.manageTechnicalPortalSettings,
                            required: "required",
                            error: this.state.errors
                              .backgroundSecondaryTextColor
                          })
                        ),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(U.a, {
                            label: "Achtergrond kleur",
                            divSize: "col-sm-8",
                            name: "backgroundColor",
                            value: r,
                            onChangeAction: this.handleInputChange,
                            readOnly: !this.manageTechnicalPortalSettings,
                            required: "required",
                            error: this.state.errors.backgroundColor
                          }),
                          f.a.createElement(
                            "span",
                            {
                              className: "rc-color-picker-trigger",
                              unselectable: "unselectable",
                              style: {
                                backgroundColor: r,
                                color: s,
                                border: "1px solid #999",
                                display: "inline-block",
                                padding: "2px",
                                borderRadius: "2px",
                                width: "50px",
                                height: "30px",
                                boxShadow: "0 0 0 2px #fff inset"
                              }
                            },
                            "Tekst"
                          )
                        ),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(U.a, {
                            label: "Achtergrond tekst kleur",
                            divSize: "col-sm-8",
                            name: "backgroundTextColor",
                            value: s,
                            onChangeAction: this.handleInputChange,
                            readOnly: !this.manageTechnicalPortalSettings,
                            required: "required",
                            error: this.state.errors.backgroundTextColor
                          })
                        ),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(U.a, {
                            label: "Buttonknop kleur",
                            divSize: "col-sm-8",
                            name: "buttonColor",
                            value: p,
                            onChangeAction: this.handleInputChange,
                            readOnly: !this.manageTechnicalPortalSettings,
                            required: "required",
                            error: this.state.errors.buttonColor
                          }),
                          f.a.createElement(
                            "span",
                            {
                              className: "rc-color-picker-trigger",
                              unselectable: "unselectable",
                              style: {
                                backgroundColor: p,
                                color: u,
                                border: "1px solid #999",
                                display: "inline-block",
                                padding: "2px",
                                borderRadius: "2px",
                                width: "50px",
                                height: "30px",
                                boxShadow: "0 0 0 2px #fff inset"
                              }
                            },
                            "Tekst"
                          )
                        ),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(U.a, {
                            label: "Buttonknop tekst kleur",
                            divSize: "col-sm-8",
                            name: "buttonTextColor",
                            value: u,
                            onChangeAction: this.handleInputChange,
                            readOnly: !this.manageTechnicalPortalSettings,
                            required: "required",
                            error: this.state.errors.buttonTextColor
                          })
                        ),
                        f.a.createElement("hr", null),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(D.a, {
                            label: "Verantwoordelijke portal",
                            divSize: "col-sm-8",
                            name: "responsibleUserId",
                            value: d,
                            options: this.props.users,
                            optionName: "fullName",
                            onChangeAction: this.handleReactSelectChange,
                            required: this.manageTechnicalPortalSettings
                              ? ""
                              : "required",
                            error: this.state.errors.responsibleUserId,
                            multi: !1
                          })
                        ),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(D.a, {
                            label: "Eigenaar nieuwe contacten",
                            divSize: "col-sm-8",
                            name: "contactResponsibleOwnerUserId",
                            value: h,
                            options: this.props.users,
                            optionName: "fullName",
                            onChangeAction: this.handleReactSelectChange,
                            required: this.manageTechnicalPortalSettings
                              ? ""
                              : "required",
                            error: this.state.errors
                              .contactResponsibleOwnerUserId,
                            multi: !1
                          })
                        ),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(q.a, {
                            label: "Verantwoordelijke uitvoeren taak",
                            divSize: "col-sm-8",
                            name: "checkContactTaskResponsible",
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
                            value: g,
                            onChangeAction: this.handleInputChange,
                            required: this.manageTechnicalPortalSettings
                              ? ""
                              : "required",
                            error: this.state.errors.checkContactTaskResponsible
                          })
                        ),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(j.a, {
                            label: "Nieuw bij, aanmelden mogelijk",
                            divSize: "col-sm-8",
                            name: "showNewAtCooperativeLink",
                            value: k,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(U.a, {
                            label: "Privacybeleid link",
                            divSize: "col-sm-8",
                            name: "linkPrivacyPolicy",
                            value: v,
                            onChangeAction: this.handleInputChange,
                            required: this.manageTechnicalPortalSettings
                              ? ""
                              : "required",
                            error: this.state.errors.linkPrivacyPolicy
                          })
                        ),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(D.a, {
                            label: "E-mail template Nieuwe account activeren",
                            divSize: "col-sm-8",
                            name: "emailTemplateNewAccountId",
                            value: b,
                            options: this.props.emailTemplates,
                            onChangeAction: this.handleReactSelectChange,
                            required: this.manageTechnicalPortalSettings
                              ? ""
                              : "required",
                            error: this.state.errors.emailTemplateNewAccountId,
                            multi: !1
                          })
                        ),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(U.a, {
                            label: "Coöperatie portal naam",
                            divSize: "col-sm-8",
                            name: "portalName",
                            value: t,
                            onChangeAction: this.handleInputChange,
                            required: this.manageTechnicalPortalSettings
                              ? ""
                              : "required",
                            error: this.state.errors.portalName
                          })
                        ),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(U.a, {
                            label: "Coöperatie naam",
                            divSize: "col-sm-8",
                            name: "cooperativeName",
                            value: a,
                            onChangeAction: this.handleInputChange,
                            required: this.manageTechnicalPortalSettings
                              ? ""
                              : "required",
                            error: this.state.errors.cooperativeName
                          })
                        ),
                        f.a.createElement(
                          "div",
                          { className: "row" },
                          f.a.createElement(U.a, {
                            label: "Coöperatie website",
                            divSize: "col-sm-8",
                            name: "portalWebsite",
                            value: n,
                            onChangeAction: this.handleInputChange,
                            required: this.manageTechnicalPortalSettings
                              ? ""
                              : "required",
                            error: this.state.errors.portalWebsite
                          })
                        )
                      ),
                      f.a.createElement(
                        I.a,
                        null,
                        f.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          f.a.createElement(x.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Sluiten",
                            onClickAction: this.props.switchToView
                          }),
                          f.a.createElement(x.a, {
                            buttonText: "Opslaan",
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
        })(v.Component),
        Y = Object(N.b)(null, function(e) {
          return Object(z.b)({ fetchSystemData: L.a }, e);
        })(X),
        Z = a(695),
        $ = function(e) {
          var t = e.portalName,
            a = e.cooperativeName,
            n = e.portalWebsite,
            o = e.portalUrl,
            r = e.backgroundColor,
            s = e.backgroundTextColor,
            l = e.backgroundImageColor,
            i = e.backgroundImageTextColor,
            c = e.backgroundSecondaryColor,
            m = e.backgroundSecondaryTextColor,
            p = e.buttonColor,
            u = e.buttonTextColor,
            d = e.responsibleUser,
            g = e.checkContactTaskResponsibleUser,
            h = e.checkContactTaskResponsibleTeam,
            b = (e.checkContactTaskResponsible, e.contactResponsibleOwnerUser),
            v = e.emailTemplateNewAccount,
            k = e.linkPrivacyPolicy,
            y = e.showNewAtCooperativeLink,
            C = e.switchToEdit,
            N = e.imageHash;
          return f.a.createElement(
            "div",
            { onClick: C },
            f.a.createElement(
              R.a,
              null,
              f.a.createElement(
                I.a,
                null,
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(Z.a, {
                    label: "Contacten portal URL",
                    divSize: "col-sm-8",
                    value: o,
                    className: "col-sm-8 form-group"
                  })
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(Z.a, {
                    label: "Logo",
                    divSize: "col-sm-8",
                    value: "logo.png",
                    className: "col-sm-8 form-group"
                  }),
                  f.a.createElement(K.a, {
                    src: ""
                      .concat(URL_API, "/portal/images/logo.png?")
                      .concat(N),
                    style: {
                      backgroundColor: l,
                      color: i,
                      border: "1px solid #999",
                      display: "inline-block",
                      padding: "1px",
                      borderRadius: "1px",
                      height: "50px",
                      boxShadow: "0 0 0 1px #fff inset"
                    }
                  })
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(Z.a, {
                    label: "Favicon",
                    divSize: "col-sm-8",
                    value: "favicon.ico",
                    className: "col-sm-8 form-group"
                  }),
                  f.a.createElement(K.a, {
                    src: "".concat(URL_API, "/portal/favicon.ico?").concat(N),
                    style: {
                      border: "1px solid #999",
                      display: "inline-block",
                      padding: "1px",
                      borderRadius: "1px",
                      height: "20px",
                      boxShadow: "0 0 0 1px #fff inset"
                    }
                  })
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(Z.a, {
                    label: "Login - achtergrond afbeelding kleur",
                    divSize: "col-sm-8",
                    value: l,
                    className: "col-sm-8 form-group"
                  }),
                  f.a.createElement(
                    "span",
                    {
                      className: "rc-color-picker-trigger",
                      unselectable: "unselectable",
                      style: {
                        backgroundColor: l,
                        color: i,
                        border: "1px solid #999",
                        display: "inline-block",
                        padding: "2px",
                        borderRadius: "2px",
                        width: "50px",
                        height: "30px",
                        boxShadow: "0 0 0 2px #fff inset"
                      }
                    },
                    "Tekst"
                  )
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(Z.a, {
                    label: "Login - achtergrond afbeelding tekst kleur",
                    divSize: "col-sm-8",
                    value: i,
                    className: "col-sm-8 form-group"
                  })
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(Z.a, {
                    label: "Login - veld achtergrond kleur",
                    divSize: "col-sm-8",
                    value: c,
                    className: "col-sm-8 form-group"
                  }),
                  f.a.createElement(
                    "div",
                    {
                      className: "rc-color-picker-trigger",
                      unselectable: "unselectable",
                      style: { backgroundColor: l, display: "inline-block" }
                    },
                    f.a.createElement(
                      "span",
                      {
                        unselectable: "unselectable",
                        style: {
                          backgroundColor: c,
                          color: m,
                          border: "1px solid #999",
                          display: "inline-block",
                          padding: "2px",
                          borderRadius: "2px",
                          width: "50px",
                          height: "30px",
                          boxShadow: "0 0 0 2px #fff inset"
                        }
                      },
                      "Tekst"
                    )
                  )
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(Z.a, {
                    label: "Login - veld tekst kleur",
                    divSize: "col-sm-8",
                    value: m,
                    className: "col-sm-8 form-group"
                  })
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(Z.a, {
                    label: "Achtergrond kleur",
                    divSize: "col-sm-8",
                    value: r,
                    className: "col-sm-8 form-group"
                  }),
                  f.a.createElement(
                    "span",
                    {
                      className: "rc-color-picker-trigger",
                      unselectable: "unselectable",
                      style: {
                        backgroundColor: r,
                        color: s,
                        border: "1px solid #999",
                        display: "inline-block",
                        padding: "2px",
                        borderRadius: "2px",
                        width: "50px",
                        height: "30px",
                        boxShadow: "0 0 0 2px #fff inset"
                      }
                    },
                    "Tekst"
                  )
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(Z.a, {
                    label: "Achtergrond tekst kleur",
                    divSize: "col-sm-8",
                    value: s,
                    className: "col-sm-8 form-group"
                  })
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(Z.a, {
                    label: "Buttonknop kleur",
                    divSize: "col-sm-8",
                    value: p,
                    className: "col-sm-8 form-group"
                  }),
                  f.a.createElement(
                    "span",
                    {
                      className: "rc-color-picker-trigger",
                      unselectable: "unselectable",
                      style: {
                        backgroundColor: p,
                        color: u,
                        border: "1px solid #999",
                        display: "inline-block",
                        padding: "2px",
                        borderRadius: "2px",
                        width: "50px",
                        height: "30px",
                        boxShadow: "0 0 0 2px #fff inset"
                      }
                    },
                    "Tekst"
                  )
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(Z.a, {
                    label: "Buttonknop tekst kleur",
                    divSize: "col-sm-8",
                    value: u,
                    className: "col-sm-8 form-group"
                  })
                ),
                f.a.createElement("hr", null),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(Z.a, {
                    label: "Verantwoordelijke portal",
                    divSize: "col-sm-8",
                    value: d ? d.fullName : "",
                    className: "col-sm-8 form-group"
                  })
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(Z.a, {
                    label: "Eigenaar nieuwe contacten",
                    divSize: "col-sm-8",
                    value: b ? b.fullName : "",
                    className: "col-sm-8 form-group"
                  })
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(Z.a, {
                    label: "Verantwoordelijke uitvoeren taak",
                    divSize: "col-sm-8",
                    value: g ? g.fullName : h ? h.name : "",
                    className: "col-sm-8 form-group"
                  })
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(Z.a, {
                    label: "Nieuw bij, aanmelden mogelijk",
                    divSize: "col-sm-8",
                    value: y ? "Ja" : "Nee",
                    className: "col-sm-8 form-group"
                  })
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(Z.a, {
                    label: "Privacybeleid link",
                    divSize: "col-sm-8",
                    value: k,
                    className: "col-sm-8 form-group"
                  })
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(Z.a, {
                    label: "Email template Nieuwe account activeren",
                    divSize: "col-sm-8",
                    value: v ? v.name : "",
                    className: "col-sm-8 form-group"
                  })
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(Z.a, {
                    label: "Coöperatie portal naam",
                    divSize: "col-sm-8",
                    value: t,
                    className: "col-sm-8 form-group"
                  })
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(Z.a, {
                    label: "Coöperatie naam",
                    divSize: "col-sm-8",
                    value: a,
                    className: "col-sm-8 form-group"
                  })
                ),
                f.a.createElement(
                  "div",
                  { className: "row" },
                  f.a.createElement(Z.a, {
                    label: "Coöperatie website",
                    divSize: "col-sm-8",
                    value: n,
                    className: "col-sm-8 form-group"
                  })
                )
              )
            )
          );
        },
        ee = a(104);
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
            n = g()(e);
          if (t) {
            var o = g()(this).constructor;
            a = Reflect.construct(n, arguments, o);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var ae = (function(e) {
          m()(a, e);
          var t = te(a);
          function a(e) {
            var n;
            return (
              o()(this, a),
              (n = t.call(this, e)),
              b()(i()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              b()(i()(n), "switchToView", function() {
                n.setState({
                  imageHash: Date.now(),
                  showEdit: !1,
                  activeDiv: ""
                });
              }),
              (n.state = {
                emailTemplates: [],
                imageHash: Date.now(),
                showEdit: !1,
                activeDiv: ""
              }),
              n
            );
          }
          return (
            s()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  ee.a.fetchEmailTemplatesPeek().then(function(t) {
                    e.setState({ emailTemplates: t });
                  });
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
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.meDetails.permissions,
                    a = void 0 === t ? {} : t;
                  return (
                    (this.props.portalSettings.responsibleUser = ""),
                    this.props.portalSettings.responsibleUserId &&
                      0 != this.props.portalSettings.responsibleUserId &&
                      (this.props.portalSettings.responsibleUser = this.props.users.find(
                        function(t) {
                          return (
                            t.id == e.props.portalSettings.responsibleUserId
                          );
                        }
                      )),
                    (this.props.portalSettings.contactResponsibleOwnerUser =
                      ""),
                    this.props.portalSettings.contactResponsibleOwnerUserId &&
                      0 !=
                        this.props.portalSettings
                          .contactResponsibleOwnerUserId &&
                      (this.props.portalSettings.contactResponsibleOwnerUser = this.props.users.find(
                        function(t) {
                          return (
                            t.id ==
                            e.props.portalSettings.contactResponsibleOwnerUserId
                          );
                        }
                      )),
                    (this.props.portalSettings.emailTemplateNewAccount = ""),
                    this.props.portalSettings.emailTemplateNewAccountId &&
                      0 !=
                        this.props.portalSettings.emailTemplateNewAccountId &&
                      (this.props.portalSettings.emailTemplateNewAccount = this.state.emailTemplates.find(
                        function(t) {
                          return (
                            t.id ==
                            e.props.portalSettings.emailTemplateNewAccountId
                          );
                        }
                      )),
                    (this.props.portalSettings.checkContactTaskResponsible =
                      ""),
                    (this.props.portalSettings.checkContactTaskResponsibleUser = null),
                    (this.props.portalSettings.checkContactTaskResponsibleTeam = null),
                    this.props.portalSettings
                      .checkContactTaskResponsibleUserId &&
                      0 !=
                        this.props.portalSettings
                          .checkContactTaskResponsibleUserId &&
                      ((this.props.portalSettings.checkContactTaskResponsible =
                        "user" +
                        this.props.portalSettings
                          .checkContactTaskResponsibleUserId),
                      (this.props.portalSettings.checkContactTaskResponsibleUser = this.props.users.find(
                        function(t) {
                          return (
                            t.id ==
                            e.props.portalSettings
                              .checkContactTaskResponsibleUserId
                          );
                        }
                      ))),
                    this.props.portalSettings
                      .checkContactTaskResponsibleTeamId &&
                      0 !=
                        this.props.portalSettings
                          .checkContactTaskResponsibleTeamId &&
                      ((this.props.portalSettings.checkContactTaskResponsible =
                        "team" +
                        this.props.portalSettings
                          .checkContactTaskResponsibleTeamId),
                      (this.props.portalSettings.checkContactTaskResponsibleTeam = this.props.teams.find(
                        function(t) {
                          return (
                            t.id ==
                            e.props.portalSettings
                              .checkContactTaskResponsibleTeamId
                          );
                        }
                      ))),
                    f.a.createElement(
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
                      this.state.showEdit && a.managePortalSettings
                        ? f.a.createElement(Y, {
                            portalSettings: this.props.portalSettings,
                            emailTemplates: this.state.emailTemplates,
                            switchToView: this.switchToView,
                            imageHash: this.state.imageHash,
                            updateState: this.props.updateState,
                            users: this.props.users,
                            teams: this.props.teams,
                            meDetails: this.props.meDetails
                          })
                        : f.a.createElement(
                            $,
                            C()({}, this.props.portalSettings, {
                              switchToEdit: this.switchToEdit,
                              imageHash: this.state.imageHash
                            })
                          )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(v.Component),
        ne = Object(N.b)(function(e) {
          return {
            meDetails: e.meDetails,
            permissions: e.meDetails.permissions,
            teams: e.systemData.teams,
            users: e.systemData.users
          };
        })(ae),
        oe = function(e) {
          var t = e.portalSettings,
            a = e.hasError,
            n = e.isLoading,
            o = e.updateState,
            r = (e.emailTemplates, ""),
            s = !0;
          return (
            a
              ? (r = "Fout bij het ophalen van portal instellingen.")
              : n
              ? (r = "Gegevens aan het laden.")
              : Object(k.isEmpty)(t)
              ? (r = "Geen portal instellingen gevonden!")
              : (s = !1),
            s
              ? f.a.createElement("div", null, r)
              : f.a.createElement(
                  "div",
                  null,
                  f.a.createElement(ne, { portalSettings: t, updateState: o })
                )
          );
        },
        re = a(4),
        se = a(693),
        le = function() {
          return f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(
              "div",
              { className: "col-md-4" },
              f.a.createElement(
                "div",
                {
                  className: "btn-group btn-group-flex margin-small",
                  role: "group"
                },
                f.a.createElement(se.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: re.e.goBack
                })
              )
            ),
            f.a.createElement(
              "div",
              { className: "col-md-4" },
              f.a.createElement(
                "h4",
                { className: "text-center" },
                "Portal instellingen"
              )
            ),
            f.a.createElement("div", { className: "col-md-4" })
          );
        };
      function ie(e, t) {
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
      function ce(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ie(Object(a), !0).forEach(function(t) {
                b()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : ie(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
            n = g()(e);
          if (t) {
            var o = g()(this).constructor;
            a = Reflect.construct(n, arguments, o);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var pe = (function(e) {
        m()(a, e);
        var t = me(a);
        function a(e) {
          var n;
          return (
            o()(this, a),
            (n = t.call(this, e)),
            b()(i()(n), "callFetchPortalSettings", function() {
              n.setState({ isLoading: !0, hasError: !1 });
              A(
                "?keys[]=portalName&keys[]=cooperativeName&keys[]=portalWebsite&keys[]=portalUrl&keys[]=backgroundColor&keys[]=backgroundTextColor&keys[]=backgroundImageColor&keys[]=backgroundImageTextColor&keys[]=backgroundSecondaryColor&keys[]=backgroundSecondaryTextColor&keys[]=buttonColor&keys[]=buttonTextColor&keys[]=responsibleUserId&keys[]=checkContactTaskResponsibleUserId&keys[]=checkContactTaskResponsibleTeamId&keys[]=contactResponsibleOwnerUserId&keys[]=emailTemplateNewAccountId&keys[]=linkPrivacyPolicy&keys[]=showNewAtCooperativeLink"
              )
                .then(function(e) {
                  n.setState({
                    isLoading: !1,
                    portalSettings: ce(
                      ce({}, e.data),
                      {},
                      {
                        showNewAtCooperativeLink:
                          "true" == e.data.showNewAtCooperativeLink
                      }
                    )
                  });
                })
                .catch(function(e) {
                  n.setState({ isLoading: !1, hasError: !0 });
                });
            }),
            b()(i()(n), "updateState", function(e) {
              n.setState({ portalSettings: e });
            }),
            (n.state = { portalSettings: {}, isLoading: !1, hasError: !1 }),
            n
          );
        }
        return (
          s()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.callFetchPortalSettings();
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
                      { className: "col-md-12 margin-10-top" },
                      f.a.createElement(
                        R.a,
                        null,
                        f.a.createElement(
                          I.a,
                          { className: "panel-small" },
                          f.a.createElement(le, null)
                        )
                      )
                    ),
                    f.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      f.a.createElement(oe, {
                        portalSettings: this.state.portalSettings,
                        isLoading: this.state.isLoading,
                        hasError: this.state.hasError,
                        updateState: this.updateState
                      })
                    )
                  ),
                  f.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          a
        );
      })(v.Component);
      t.default = pe;
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        r = a(8),
        s = a.n(r),
        l = function(e) {
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
      (l.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (l.propTypes = {
          className: s.a.string,
          onMouseEnter: s.a.func,
          onMouseLeave: s.a.func
        }),
        (t.a = l);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        r = a(8),
        s = a.n(r),
        l = function(e) {
          var t = e.className,
            a = e.children;
          return o.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (l.defaultProps = { className: "" }),
        (l.propTypes = { className: s.a.string }),
        (t.a = l);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        r = a(8),
        s = a.n(r),
        l = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            r = e.type,
            s = e.value,
            l = e.loading,
            i = e.loadText,
            c = e.disabled;
          return l
            ? o.a.createElement(
                "button",
                {
                  type: r,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: s,
                  disabled: l
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
          buttonClassName: s.a.string,
          buttonText: s.a.string.isRequired,
          onClickAction: s.a.func,
          type: s.a.string,
          value: s.a.string,
          loading: s.a.bool,
          loadText: s.a.string,
          disabled: s.a.bool
        }),
        (t.a = l);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        r = a(8),
        s = a.n(r),
        l = function(e) {
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
      (l.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (l.propTypes = {
          buttonClassName: s.a.string,
          iconName: s.a.string.isRequired,
          onClickAction: s.a.func,
          title: s.a.string,
          disabled: s.a.bool
        }),
        (t.a = l);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        r = a(8),
        s = a.n(r),
        l = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            r = e.size,
            s = e.id,
            l = e.placeholder,
            i = e.name,
            c = e.value,
            m = e.onClickAction,
            p = e.onChangeAction,
            u = e.onBlurAction,
            d = e.required,
            g = e.readOnly,
            h = e.maxLength,
            b = e.error,
            v = e.min,
            f = e.max,
            k = e.step,
            y = e.errorMessage,
            C = e.divSize,
            N = e.divClassName,
            E = e.autoComplete;
          return o.a.createElement(
            "div",
            { className: "form-group ".concat(C, " ").concat(N) },
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
                  "form-control input-sm ".concat(n) + (b ? "has-error" : ""),
                id: s,
                placeholder: l,
                name: i,
                value: c,
                onClick: m,
                onChange: p,
                onBlur: u,
                readOnly: g,
                maxLength: h,
                min: v,
                max: f,
                autoComplete: E,
                step: k
              })
            ),
            b &&
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
        (t.a = l);
    },
    695: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        r = a(4),
        s = a(8),
        l = a.n(s),
        i = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            s = e.value,
            l = e.link,
            i = e.hidden;
          return l.length > 0
            ? o.a.createElement(
                "div",
                { className: a, style: i ? { display: "none" } : {} },
                o.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                o.a.createElement(
                  "div",
                  { className: "col-sm-6", id: n, onClick: null },
                  o.a.createElement(
                    r.b,
                    { to: l, className: "link-underline" },
                    s
                  )
                )
              )
            : o.a.createElement(
                "div",
                { className: a, style: i ? { display: "none" } : {} },
                o.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                o.a.createElement("div", { className: "col-sm-6", id: n }, s)
              );
        };
      (i.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (i.propTypes = {
          label: l.a.oneOfType([l.a.string, l.a.object]).isRequired,
          className: l.a.string,
          id: l.a.string,
          value: l.a.oneOfType([l.a.string, l.a.number]),
          link: l.a.string,
          hidden: l.a.bool
        }),
        (t.a = i);
    },
    700: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        r = a(8),
        s = a.n(r),
        l = a(703),
        i = a.n(l),
        c = function(e) {
          var t = e.label,
            a = e.size,
            n = e.id,
            r = e.name,
            s = e.value,
            l = e.onChangeAction,
            c = e.required,
            m = e.divSize,
            p = e.className,
            u = e.disabled;
          return o.a.createElement(
            "div",
            { className: "form-group ".concat(m, " ").concat(p) },
            o.a.createElement(
              "div",
              null,
              o.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(c) },
                t
              )
            ),
            o.a.createElement(
              "div",
              { className: "".concat(a) },
              o.a.createElement(i.a, {
                id: n,
                name: r,
                onChange: l,
                checked: s,
                disabled: u
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
          label: s.a.string.isRequired,
          type: s.a.string,
          size: s.a.string,
          divSize: s.a.string,
          id: s.a.string,
          name: s.a.string.isRequired,
          value: s.a.bool,
          onChangeAction: s.a.func,
          required: s.a.string,
          disabled: s.a.bool
        }),
        (t.a = c);
    },
    709: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        r = a(8),
        s = a.n(r),
        l = a(714),
        i =
          (a(715),
          function(e) {
            var t = e.label,
              a = e.divSize,
              n = e.size,
              r = e.id,
              s = e.name,
              i = e.value,
              c = e.options,
              m = e.optionId,
              p = e.optionName,
              u = e.onChangeAction,
              d = e.required,
              g = e.multi,
              h = e.error,
              b = e.isLoading;
            return o.a.createElement(
              "div",
              { className: "form-group ".concat(a) },
              o.a.createElement(
                "label",
                { htmlFor: r, className: "col-sm-6 ".concat(d) },
                t
              ),
              o.a.createElement(
                "div",
                { className: "".concat(n) },
                o.a.createElement(l.a, {
                  id: r,
                  name: s,
                  value: i,
                  onChange: function(e) {
                    u(e || "", s);
                  },
                  options: c,
                  valueKey: m,
                  labelKey: p,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: g,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: h ? " has-error" : "",
                  isLoading: b
                })
              )
            );
          });
      (i.defaultProps = {
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
        (i.propTypes = {
          label: s.a.string.isRequired,
          className: s.a.string,
          size: s.a.string,
          divSize: s.a.string,
          id: s.a.string,
          name: s.a.string.isRequired,
          options: s.a.array.isRequired,
          optionId: s.a.string,
          optionName: s.a.string,
          value: s.a.oneOfType([s.a.string, s.a.number]),
          onChangeAction: s.a.func,
          onBlurAction: s.a.func,
          required: s.a.string,
          readOnly: s.a.bool,
          error: s.a.bool,
          multi: s.a.bool,
          isLoading: s.a.bool
        }),
        (t.a = i);
    },
    746: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        r = a(8),
        s = a.n(r),
        l = function(e) {
          var t = e.label,
            a = e.className,
            n = e.size,
            r = e.divSize,
            s = e.id,
            l = e.name,
            i = e.value,
            c = e.optionsInGroups,
            m = e.onChangeAction,
            p = e.onBlurAction,
            u = e.required,
            d = e.error,
            g = e.readOnly;
          return o.a.createElement(
            "div",
            { className: "form-group ".concat(r) },
            o.a.createElement(
              "label",
              { htmlFor: s, className: "col-sm-6 ".concat(u) },
              t
            ),
            o.a.createElement(
              "div",
              { className: "".concat(n) },
              o.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(a) + (d && " has-error"),
                  id: s,
                  name: l,
                  value: i,
                  onChange: m,
                  onBlur: p,
                  readOnly: g
                },
                o.a.createElement("option", { value: "" }),
                c.map(function(e, t) {
                  var a = e.optionName || "name";
                  return o.a.createElement(
                    "optgroup",
                    { key: t, label: e.label },
                    e.options.map(function(t) {
                      return o.a.createElement(
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
          label: s.a.string.isRequired,
          className: s.a.string,
          size: s.a.string,
          divSize: s.a.string,
          id: s.a.string,
          name: s.a.string.isRequired,
          optionsInGroups: s.a.array,
          value: s.a.oneOfType([s.a.string, s.a.number]),
          onChangeAction: s.a.func,
          onBlurAction: s.a.func,
          required: s.a.string,
          readOnly: s.a.bool,
          error: s.a.bool,
          optionName: s.a.string
        }),
        (t.a = l);
    }
  }
]);
