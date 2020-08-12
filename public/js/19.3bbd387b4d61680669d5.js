(window.webpackJsonp = window.webpackJsonp || []).push([
  [19],
  {
    1415: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(0),
        r = a.n(n),
        o = a(24),
        c = a.n(o),
        i = a(25),
        l = a.n(i),
        s = a(22),
        u = a.n(s),
        m = a(26),
        d = a.n(m),
        p = a(27),
        h = a.n(p),
        f = a(16),
        g = a.n(f),
        E = a(6),
        v = a.n(E),
        b = a(32),
        y = a(4),
        N = a(716),
        w = a(690),
        D = a(691),
        O = a(693),
        C = a(100),
        S = Object(b.b)(null, function(e) {
          return {
            deleteContact: function(t) {
              e(Object(N.b)(t));
            }
          };
        })(function(e) {
          return r.a.createElement(
            C.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return e.deleteContact(e.id), void e.closeDeleteItemModal();
              },
              title: "Verwijderen"
            },
            r.a.createElement(
              "p",
              null,
              "Verwijder contact: ",
              r.a.createElement("strong", null, " ", "".concat(e.fullName), " ")
            )
          );
        });
      function k(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var A = (function(e) {
          d()(a, e);
          var t = k(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "toggleDelete", function() {
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
                  var e = this.props.type,
                    t = void 0 === e ? {} : e;
                  return r.a.createElement(
                    "div",
                    { className: "row" },
                    r.a.createElement(
                      "div",
                      { className: "col-sm-12" },
                      r.a.createElement(
                        w.a,
                        null,
                        r.a.createElement(
                          D.a,
                          { className: "panel-small" },
                          r.a.createElement(
                            "div",
                            { className: "col-md-4" },
                            r.a.createElement(
                              "div",
                              {
                                className:
                                  "btn-group btn-group-flex margin-small",
                                role: "group"
                              },
                              r.a.createElement(O.a, {
                                iconName: "glyphicon-arrow-left",
                                onClickAction: y.e.goBack
                              }),
                              "organisation" === t.id &&
                                this.props.permissions.deleteOrganisation &&
                                r.a.createElement(O.a, {
                                  iconName: "glyphicon-trash",
                                  onClickAction: this.toggleDelete
                                }),
                              "person" === t.id &&
                                this.props.permissions.deletePerson &&
                                r.a.createElement(O.a, {
                                  iconName: "glyphicon-trash",
                                  onClickAction: this.toggleDelete
                                })
                            )
                          ),
                          !this.props.isLoading &&
                            r.a.createElement(
                              "div",
                              { className: "col-md-4" },
                              r.a.createElement(
                                "h4",
                                {
                                  className:
                                    "text-center text-success margin-small"
                                },
                                r.a.createElement(
                                  "strong",
                                  null,
                                  this.props.fullName || "Nieuw",
                                  " (",
                                  t.name,
                                  ")"
                                )
                              )
                            ),
                          r.a.createElement("div", { className: "col-md-4" })
                        )
                      )
                    ),
                    this.state.showDelete &&
                      r.a.createElement(S, {
                        closeDeleteItemModal: this.toggleDelete,
                        fullName: this.props.fullName,
                        id: this.props.id
                      })
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        I = Object(b.b)(
          function(e) {
            return {
              fullName: e.contactDetails.fullName,
              id: e.contactDetails.id,
              type: e.contactDetails.type,
              permissions: e.meDetails.permissions,
              isLoading: e.loadingData.isLoading
            };
          },
          function(e) {
            return {
              deleteContact: function(t) {
                e(Object(N.b)(t));
              }
            };
          }
        )(A),
        j = a(198),
        P = a(7),
        L = a.n(P),
        M = a(697),
        R = a.n(M),
        T = a(744),
        x = a(694),
        B = a(699),
        q = a(692),
        G = a(702),
        z = a(747),
        F = a(700),
        _ = a(208),
        V = a(695);
      function U(e, t) {
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
      function Y(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? U(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : U(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var J = (function(e) {
          d()(a, e);
          var t = W(a);
          function a(e) {
            var n;
            c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Y(
                    Y({}, n.state),
                    {},
                    {
                      organisation: Y(
                        Y({}, n.state.organisation),
                        {},
                        v()({}, r, a)
                      )
                    }
                  )
                );
              }),
              v()(u()(n), "handleInputChangeDate", function(e, t) {
                n.setState(
                  Y(
                    Y({}, n.state),
                    {},
                    {
                      organisation: Y(
                        Y({}, n.state.organisation),
                        {},
                        v()({}, t, e)
                      )
                    }
                  )
                );
              }),
              v()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.organisation,
                  a = {},
                  r = !1;
                t.iban &&
                  !R.a.isEmpty(t.iban + "") &&
                  (z.isValidIBAN(t.iban) || ((a.iban = !0), (r = !0))),
                  R.a.isEmpty(t.name + "") && ((a.name = !0), (r = !0)),
                  t.isCollectMandate &&
                    (R.a.isEmpty(t.iban) && ((a.iban = !0), (r = !0)),
                    R.a.isEmpty(t.collectMandateCode) &&
                      ((a.collectMandateCode = !0), (r = !0)),
                    R.a.isEmpty(t.collectMandateSignatureDate) &&
                      ((a.collectMandateSignatureDate = !0), (r = !0)),
                    R.a.isEmpty(t.collectMandateFirstRunDate) &&
                      ((a.collectMandateFirstRunDate = !0), (r = !0))),
                  n.setState(Y(Y({}, n.state), {}, { errors: a })),
                  !r &&
                    T.a
                      .updateOrganisation(t)
                      .then(function(e) {
                        n.props.updateOrganisation(e.data.data),
                          n.props.switchToView();
                      })
                      .catch(function(e) {
                        var t = JSON.parse(JSON.stringify(e)),
                          a =
                            "Er is iets misgegaan bij opslaan. Probeer het opnieuw.";
                        500 !== t.response.status &&
                          (a = t.response.data.message),
                          n.setState({
                            showErrorModal: !0,
                            modalErrorMessage: a
                          });
                      });
              }),
              v()(u()(n), "closeErrorModal", function() {
                n.setState({ showErrorModal: !1, modalErrorMessage: "" });
              });
            var r = e.contactDetails,
              o = r.number,
              i = r.organisation,
              l = r.iban,
              s = r.ibanAttn,
              m = r.createdAt,
              d = r.didAgreeAvg,
              p = r.dateDidAgreeAvg,
              h = r.isCollectMandate,
              f = r.collectMandateCode,
              g = r.collectMandateSignatureDate,
              E = r.collectMandateFirstRunDate,
              b = r.collectMandateCollectionSchema;
            return (
              (n.state = {
                organisation: {
                  id: i.id,
                  number: o,
                  createdAt: m,
                  name: i.name,
                  chamberOfCommerceNumber: i.chamberOfCommerceNumber,
                  vatNumber: i.vatNumber,
                  industryId: i.industryId ? i.industryId : "",
                  website: i.website,
                  iban: l,
                  ibanAttn: s || "",
                  didAgreeAvg: d,
                  dateDidAgreeAvg: p ? L()(p).format("Y-MM-DD") : "",
                  isCollectMandate: h,
                  collectMandateCode: f || "",
                  collectMandateSignatureDate: g
                    ? L()(g).format("Y-MM-DD")
                    : "",
                  collectMandateFirstRunDate: E ? L()(E).format("Y-MM-DD") : "",
                  collectMandateCollectionSchema: b || "core"
                },
                errors: {
                  name: !1,
                  iban: !1,
                  collectMandateCode: !1,
                  collectMandateSignatureDate: !1,
                  collectMandateFirstRunDate: !1
                },
                showErrorModal: !1,
                modalErrorMessage: ""
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.organisation,
                    t = e.number,
                    a = e.name,
                    n = e.chamberOfCommerceNumber,
                    o = e.vatNumber,
                    c = e.createdAt,
                    i = e.didAgreeAvg,
                    l = e.dateDidAgreeAvg,
                    s = e.website,
                    u = e.iban,
                    m = e.ibanAttn,
                    d = e.isCollectMandate,
                    p = e.collectMandateCode,
                    h = e.collectMandateSignatureDate,
                    f = e.collectMandateFirstRunDate,
                    g = e.collectMandateCollectionSchema;
                  return r.a.createElement(
                    r.a.Fragment,
                    null,
                    r.a.createElement(
                      "form",
                      {
                        className: "form-horizontal col-md-12",
                        onSubmit: this.handleSubmit
                      },
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(x.a, {
                          label: "Contactnummer",
                          divSize: "col-xs-12",
                          name: "number",
                          value: t,
                          readOnly: !0
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(x.a, {
                          label: "Gemaakt op",
                          divSize: "col-xs-12",
                          name: "createdAt",
                          value: L()(c).format("DD-MM-Y"),
                          readOnly: !0
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(x.a, {
                          label: "Naam",
                          divSize: "col-xs-12",
                          name: "name",
                          value: a,
                          onChangeAction: this.handleInputChange,
                          required: "required",
                          error: this.state.errors.name
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(x.a, {
                          label: "KvK",
                          divSize: "col-xs-12",
                          name: "chamberOfCommerceNumber",
                          value: n,
                          onChangeAction: this.handleInputChange
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(x.a, {
                          label: "Btw nummer",
                          divSize: "col-xs-12",
                          name: "vatNumber",
                          value: o,
                          onChangeAction: this.handleInputChange
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(x.a, {
                          label: "IBAN",
                          divSize: "col-xs-12",
                          name: "iban",
                          value: u,
                          onChangeAction: this.handleInputChange,
                          error: this.state.errors.iban,
                          required: d ? "required" : ""
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(x.a, {
                          label: "IBAN t.n.v.",
                          divSize: "col-xs-12",
                          name: "ibanAttn",
                          value: m,
                          onChangeAction: this.handleInputChange
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(x.a, {
                          label: "Website",
                          divSize: "col-xs-12",
                          name: "website",
                          value: s,
                          onChangeAction: this.handleInputChange
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        i
                          ? r.a.createElement(V.a, {
                              label: "Akkoord privacybeleid",
                              id: "didAgreeAvg",
                              className: "form-group col-md-12",
                              value: i
                                ? r.a.createElement(
                                    "span",
                                    null,
                                    "Ja",
                                    " ",
                                    r.a.createElement(
                                      "em",
                                      null,
                                      "(",
                                      l
                                        ? L()(l).format("L")
                                        : L()().format("L"),
                                      ")"
                                    )
                                  )
                                : "Nee"
                            })
                          : r.a.createElement(F.a, {
                              label: "Akkoord privacybeleid",
                              divSize: "col-xs-12",
                              name: "didAgreeAvg",
                              value: i,
                              onChangeAction: this.handleInputChange
                            })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(F.a, {
                          divSize: "col-xs-12",
                          label: "Ingesteld op incasso",
                          name: "isCollectMandate",
                          value: d,
                          onChangeAction: this.handleInputChange
                        })
                      ),
                      d
                        ? r.a.createElement(
                            r.a.Fragment,
                            null,
                            r.a.createElement(
                              "div",
                              { className: "row" },
                              r.a.createElement(x.a, {
                                divSize: "col-xs-12",
                                label: "Machtigingskenmerk",
                                name: "collectMandateCode",
                                value: p,
                                onChangeAction: this.handleInputChange,
                                required: "required",
                                error: this.state.errors.collectMandateCode
                              })
                            ),
                            r.a.createElement(
                              "div",
                              { className: "row" },
                              r.a.createElement(B.a, {
                                divSize: "col-xs-12",
                                label: "Datum van ondertekening",
                                name: "collectMandateSignatureDate",
                                value: h,
                                onChangeAction: this.handleInputChangeDate,
                                required: "required",
                                error: this.state.errors
                                  .collectMandateSignatureDate
                              })
                            ),
                            r.a.createElement(
                              "div",
                              { className: "row" },
                              r.a.createElement(B.a, {
                                divSize: "col-xs-12",
                                label: "Datum eerste incassoronde",
                                name: "collectMandateFirstRunDate",
                                value: f,
                                onChangeAction: this.handleInputChangeDate,
                                required: "required",
                                error: this.state.errors
                                  .collectMandateFirstRunDate
                              })
                            ),
                            r.a.createElement(
                              "div",
                              { className: "row" },
                              r.a.createElement(x.a, {
                                type: "hidden",
                                name: "collectMandateCollectionSchema",
                                value: g
                              })
                            )
                          )
                        : null,
                      r.a.createElement(
                        G.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          r.a.createElement(q.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.switchToView
                          }),
                          r.a.createElement(q.a, {
                            buttonText: "Opslaan",
                            onClickAction: this.handleSubmit
                          })
                        )
                      )
                    ),
                    this.state.showErrorModal &&
                      r.a.createElement(_.a, {
                        closeModal: this.closeErrorModal,
                        title: "Fout bij opslaan",
                        errorMessage: this.state.modalErrorMessage
                      })
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        K = Object(b.b)(
          function(e) {
            return { contactDetails: e.contactDetails };
          },
          function(e) {
            return {
              updateOrganisation: function(t) {
                e(Object(N.u)(t));
              }
            };
          }
        )(J),
        H = Object(b.b)(function(e) {
          return { contactDetails: e.contactDetails };
        })(function(e) {
          var t = e.contactDetails,
            a = t.number,
            n = t.organisation,
            o = t.iban,
            c = t.ibanAttn,
            i = t.createdAt,
            l = t.didAgreeAvg,
            s = t.dateDidAgreeAvg,
            u = t.isCollectMandate,
            m = t.collectMandateCode,
            d = t.collectMandateSignatureDate,
            p = t.collectMandateFirstRunDate;
          t.collectMandateCollectionSchema;
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                className: "col-xs-12",
                label: "Contactnummer",
                value: a
              })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                className: "col-xs-12",
                label: "Gemaakt op",
                value: i && L()(i).format("DD-MM-Y")
              })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                className: "col-xs-12",
                label: "Naam",
                value: n.name
              })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                className: "col-xs-12",
                label: "KvK",
                value: n.chamberOfCommerceNumber
              })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                className: "col-xs-12",
                label: "Btw nummer",
                value: n.vatNumber
              })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                className: "col-xs-12",
                label: "IBAN",
                value: o
              })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                className: "col-xs-12",
                label: "IBAN t.n.v.",
                value: c
              })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                className: "col-xs-12",
                label: "Website",
                value: n.website
              })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                label: "Akkoord privacybeleid",
                className: "col-xs-12",
                value: l
                  ? r.a.createElement(
                      "span",
                      null,
                      "Ja ",
                      r.a.createElement(
                        "em",
                        null,
                        "(",
                        s ? L()(s).format("L") : "",
                        ")"
                      )
                    )
                  : "Nee"
              })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                className: "col-xs-12",
                label: "Ingesteld op incasso",
                value: u ? "Ja" : "Nee"
              })
            ),
            u
              ? r.a.createElement(
                  r.a.Fragment,
                  null,
                  r.a.createElement(
                    "div",
                    { className: "row" },
                    r.a.createElement(V.a, {
                      className: "col-xs-12",
                      label: "Machtigingskenmerk",
                      value: m
                    })
                  ),
                  r.a.createElement(
                    "div",
                    { className: "row" },
                    r.a.createElement(V.a, {
                      className: "col-xs-12",
                      label: "Datum van ondertekening",
                      value: d && L()(d).format("L")
                    })
                  ),
                  r.a.createElement(
                    "div",
                    { className: "row" },
                    r.a.createElement(V.a, {
                      className: "col-xs-12",
                      label: "Datum eerste incassoronde",
                      value: p && L()(p).format("L")
                    })
                  )
                )
              : null
          );
        }),
        X = a(870),
        Z = a(696);
      function Q(e, t) {
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
            ? Q(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Q(Object(a)).forEach(function(t) {
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
            n = g()(e);
          if (t) {
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var te = (function(e) {
          d()(a, e);
          var t = ee(a);
          function a(e) {
            var n;
            c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "hasNullObject", function(e, t) {
                var a;
                for (a = 0; a < t.length; a++)
                  if ("null" === t[a].id) return !0;
                return !1;
              }),
              v()(u()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  $(
                    $({}, n.state),
                    {},
                    { person: $($({}, n.state.person), {}, v()({}, r, a)) }
                  )
                );
              }),
              v()(u()(n), "handleChangeDateOfBirth", function(e) {
                var t = e ? L()(e).format("Y-MM-DD") : "";
                n.setState(
                  $(
                    $({}, n.state),
                    {},
                    { person: $($({}, n.state.person), {}, { dateOfBirth: t }) }
                  )
                );
              }),
              v()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.person,
                  a = {},
                  r = !1;
                R.a.isEmpty(t.firstName) &&
                  R.a.isEmpty(t.lastName) &&
                  ((a.name = !0), (r = !0)),
                  n.setState($($({}, n.state), {}, { errors: a })),
                  !r &&
                    X.a
                      .updatePerson(t)
                      .then(function(e) {
                        n.props.updatePerson(e.data.data),
                          n.props.switchToView();
                      })
                      .catch(function(e) {
                        var t = JSON.parse(JSON.stringify(e)),
                          a =
                            "Er is iets misgegaan bij opslaan. Probeer het opnieuw.";
                        500 !== t.response.status &&
                          (a = t.response.data.message),
                          n.setState({
                            showErrorModal: !0,
                            modalErrorMessage: a
                          });
                      });
              }),
              v()(u()(n), "closeErrorModal", function() {
                n.setState({ showErrorModal: !1, modalErrorMessage: "" });
              });
            var r = e.contactDetails,
              o = r.number,
              i = r.createdAt,
              l = r.person,
              s = r.didAgreeAvg,
              m = r.dateDidAgreeAvg;
            return (
              (n.state = {
                lastNamePrefixes: e.lastNamePrefixes,
                organisationPeek: [
                  {
                    id: l.organisation ? l.organisation.id : "",
                    name: l.organisation ? l.organisation.name : ""
                  }
                ],
                person: {
                  id: l.id,
                  number: o,
                  createdAt: i,
                  titleId: l.title ? l.title.id : "",
                  initials: l.initials ? l.initials : "",
                  firstName: l.firstName,
                  lastNamePrefixId: l.lastNamePrefixId
                    ? l.lastNamePrefixId
                    : "",
                  lastNamePrefix: l.lastNamePrefix ? l.lastNamePrefix : "",
                  lastName: l.lastName,
                  dateOfBirth: l.dateOfBirth
                    ? L()(l.dateOfBirth).format("Y-MM-DD")
                    : "",
                  didAgreeAvg: s,
                  dateDidAgreeAvg: m ? L()(m).format("Y-MM-DD") : ""
                },
                errors: { name: !1 },
                showErrorModal: !1,
                modalErrorMessage: ""
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this,
                    t = this.state.lastNamePrefixes;
                  this.hasNullObject({ id: "null", name: "" }, t) ||
                    t.unshift({ id: "null", name: "" }),
                    T.a.getOrganisationPeek().then(function(a) {
                      e.setState(
                        $(
                          $({}, e.state),
                          {},
                          { organisationPeek: a, lastNamePrefixes: t }
                        )
                      );
                    });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.person,
                    t = e.number,
                    a = e.createdAt,
                    n = e.titleId,
                    o = e.initials,
                    c = e.firstName,
                    i = e.lastNamePrefixId,
                    l = e.lastName,
                    s = e.dateOfBirth,
                    u = e.didAgreeAvg,
                    m = e.dateDidAgreeAvg,
                    d = e.lastNamePrefix;
                  return r.a.createElement(
                    r.a.Fragment,
                    null,
                    r.a.createElement(
                      "form",
                      {
                        className: "form-horizontal col-md-12",
                        onSubmit: this.handleSubmit
                      },
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(x.a, {
                          label: "Contactnummer",
                          divSize: "col-xs-12",
                          name: "number",
                          readOnly: !0,
                          value: t
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(x.a, {
                          label: "Gemaakt op",
                          divSize: "col-xs-12",
                          id: "created_at",
                          name: "createdAt",
                          value: L()(a).format("DD-MM-Y"),
                          readOnly: !0
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(Z.a, {
                          label: "Aanspreektitel",
                          size: "col-xs-12",
                          name: "titleId",
                          options: this.props.titles,
                          value: n,
                          onChangeAction: this.handleInputChange
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(x.a, {
                          label: "Voorletters",
                          divSize: "col-xs-12",
                          name: "initials",
                          value: o,
                          onChangeAction: this.handleInputChange
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(x.a, {
                          label: "Voornaam",
                          divSize: "col-xs-12",
                          name: "firstName",
                          value: c,
                          onChangeAction: this.handleInputChange,
                          required: "" === l && "required",
                          error: this.state.errors.name
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(Z.a, {
                          label: "Tussenvoegsel",
                          size: "col-xs-12",
                          name: "lastNamePrefixId",
                          options: this.state.lastNamePrefixes,
                          value: i,
                          onChangeAction: this.handleInputChange,
                          placeholder: d || ""
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(x.a, {
                          label: "Achternaam",
                          divSize: "col-xs-12",
                          name: "lastName",
                          value: l,
                          onChangeAction: this.handleInputChange,
                          required: "" === c && "required",
                          error: this.state.errors.name
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(B.a, {
                          label: "Geboortedatum",
                          divSize: "col-xs-12",
                          name: "dateOfBirth",
                          value: s,
                          onChangeAction: this.handleChangeDateOfBirth
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        u
                          ? r.a.createElement(V.a, {
                              label: "Akkoord privacybeleid",
                              id: "didAgreeAvg",
                              className: "form-group col-md-12",
                              value: u
                                ? r.a.createElement(
                                    "span",
                                    null,
                                    "Ja",
                                    " ",
                                    r.a.createElement(
                                      "em",
                                      null,
                                      "(",
                                      m
                                        ? L()(m).format("L")
                                        : L()().format("L"),
                                      ")"
                                    )
                                  )
                                : "Nee"
                            })
                          : r.a.createElement(F.a, {
                              label: "Akkoord privacybeleid",
                              divSize: "col-xs-12",
                              name: "didAgreeAvg",
                              value: u,
                              onChangeAction: this.handleInputChange
                            })
                      ),
                      r.a.createElement(
                        G.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          r.a.createElement(q.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.switchToView
                          }),
                          r.a.createElement(q.a, {
                            buttonText: "Opslaan",
                            onClickAction: this.handleSubmit,
                            type: "submit",
                            value: "Submit"
                          })
                        )
                      )
                    ),
                    this.state.showErrorModal &&
                      r.a.createElement(_.a, {
                        closeModal: this.closeErrorModal,
                        title: "Fout bij opslaan",
                        errorMessage: this.state.modalErrorMessage
                      })
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        ae = Object(b.b)(
          function(e) {
            return {
              contactDetails: e.contactDetails,
              lastNamePrefixes: e.systemData.lastNamePrefixes,
              titles: e.systemData.titles
            };
          },
          function(e) {
            return {
              updatePerson: function(t) {
                e(Object(N.v)(t));
              }
            };
          }
        )(te),
        ne = Object(b.b)(function(e) {
          return {
            contactDetails: e.contactDetails,
            statuses: e.statuses,
            types: e.types,
            lastNamePrefixes: e.systemData.lastNamePrefixes,
            personTypes: e.systemData.personTypes
          };
        })(function(e) {
          var t = e.contactDetails,
            a = t.number,
            n = t.createdAt,
            o = t.person,
            c = t.didAgreeAvg,
            i = t.dateDidAgreeAvg,
            l = t.portalUser;
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                label: "Contactnummer",
                value: a,
                className: "col-xs-12"
              })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                label: "Gemaakt op",
                value: L()(n).format("DD-MM-Y"),
                className: "col-xs-12"
              })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                label: "Aanspreektitel",
                value: o.title && o.title.name,
                className: "col-xs-12"
              })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                label: "Voorletters",
                value: o.initials,
                className: "col-xs-12"
              })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                label: "Voornaam",
                value: o.firstName,
                className: "col-xs-12"
              })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                label: "Tussenvoegsel",
                value: o.lastNamePrefix,
                className: "col-xs-12"
              })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                label: "Achternaam",
                value: o.lastName,
                className: "col-xs-12"
              })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                label: "Geboortedatum",
                value: o.dateOfBirth && L()(o.dateOfBirth).format("DD-MM-Y"),
                className: "col-xs-12"
              })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                label: "Akkoord privacybeleid",
                className: "col-xs-12",
                value: c
                  ? r.a.createElement(
                      "span",
                      null,
                      "Ja ",
                      r.a.createElement(
                        "em",
                        null,
                        "(",
                        i ? L()(i).format("L") : "",
                        ")"
                      )
                    )
                  : "Nee"
              })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                label: "Portal gebruiker",
                value: l ? "Ja" : "Nee",
                className: "col-xs-12"
              })
            )
          );
        }),
        re = function(e) {
          var t = e.group,
            a = t.id,
            n = t.name,
            o = t.type;
          return r.a.createElement(
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
            r.a.createElement(
              "div",
              {
                onClick: function() {
                  return y.f.push("/contact-groep/".concat(a));
                }
              },
              r.a.createElement("div", { className: "col-sm-8" }, n),
              r.a.createElement("div", { className: "col-sm-4" }, o.name)
            )
          );
        };
      function oe(e, t) {
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
            ? oe(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : oe(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function ie(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var le = (function(e) {
          d()(a, e);
          var t = ie(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "onLineEnter", function() {
                n.setState({ highlightLine: "highlight-line" });
              }),
              v()(u()(n), "onLineLeave", function() {
                n.setState({ highlightLine: "" });
              }),
              (n.state = { highlightLine: "", group: ce({}, e.group) }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    "div",
                    null,
                    r.a.createElement(re, {
                      highlightLine: this.state.highlightLine,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      group: this.state.group
                    })
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        se = Object(b.b)(function(e) {
          return { visibleGroups: e.contactDetails.visibleGroups };
        })(function(e) {
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(
              "div",
              { className: "row border header" },
              r.a.createElement("div", { className: "col-sm-8" }, "Naam"),
              r.a.createElement("div", { className: "col-sm-4" }, "Type")
            ),
            e.visibleGroups.length > 0
              ? e.visibleGroups.map(function(e) {
                  return r.a.createElement(le, { key: e.id, group: e });
                })
              : r.a.createElement("div", null, "Geen groepen bekend.")
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
            n = g()(e);
          if (t) {
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var me = (function(e) {
        d()(a, e);
        var t = ue(a);
        function a(e) {
          return c()(this, a), t.call(this, e);
        }
        return (
          l()(a, [
            {
              key: "render",
              value: function() {
                return r.a.createElement(
                  "div",
                  null,
                  r.a.createElement("span", { className: "h5" }, "Groepen"),
                  r.a.createElement(
                    "div",
                    { className: "col-md-12" },
                    r.a.createElement(se, null)
                  )
                );
              }
            }
          ]),
          a
        );
      })(n.Component);
      function de(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var pe = (function(e) {
          d()(a, e);
          var t = de(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "switchToEdit", function() {
                var e = n.props.contactDetails.typeId;
                ("organisation" !== e ||
                  n.props.permissions.updateOrganisation) &&
                  ("person" !== e || n.props.permissions.updatePerson) &&
                  n.setState({ showEdit: !0 });
              }),
              v()(u()(n), "switchToView", function() {
                setTimeout(function() {
                  n.setState({ showEdit: !1, activeDiv: "" });
                }, 100);
              }),
              (n.state = { showEdit: !1, activeDiv: "" }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  this.props.contactDetails.id !== e.contactDetails.id &&
                    this.setState({ showEdit: !1 });
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
                  var e = this;
                  return r.a.createElement(
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
                    r.a.createElement(
                      D.a,
                      null,
                      r.a.createElement(
                        "div",
                        { className: "row", onClick: this.switchToEdit },
                        r.a.createElement(
                          "div",
                          { className: "col-xs-6" },
                          this.state.showEdit
                            ? "organisation" ===
                              this.props.contactDetails.typeId
                              ? r.a.createElement(K, {
                                  switchToView: this.switchToView
                                })
                              : r.a.createElement(ae, {
                                  switchToView: this.switchToView
                                })
                            : "organisation" ===
                              this.props.contactDetails.typeId
                            ? r.a.createElement(H, null)
                            : r.a.createElement(ne, null)
                        ),
                        r.a.createElement(
                          "div",
                          { className: "col-xs-6" },
                          r.a.createElement(me, null)
                        )
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        he = Object(b.b)(function(e) {
          return {
            contactDetails: e.contactDetails,
            permissions: e.meDetails.permissions
          };
        })(pe),
        fe = a(199),
        ge = a.n(fe),
        Ee = a(217),
        ve = a(8),
        be = a.n(ve),
        ye = function(e) {
          var t = e.id,
            a = e.items.find(function(e) {
              return e.id == t;
            });
          return (
            void 0 === a && (a = { name: "Onbekend" }),
            r.a.createElement("span", null, " ", a.name, " ")
          );
        };
      ye.propTypes = {
        id: be.a.oneOfType([be.a.string, be.a.number]),
        items: be.a.array.isRequired
      };
      var Ne = ye,
        we = Object(b.b)(function(e) {
          return { addressTypes: e.systemData.addressTypes };
        }, null)(function(e) {
          var t = e.address,
            a = t.typeId,
            n = t.street,
            o = t.number,
            c = t.addition,
            i = t.postalCode,
            l = t.city,
            s = t.primary,
            u = t.country;
          return r.a.createElement(
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
            r.a.createElement(
              "div",
              { onClick: e.openEdit },
              r.a.createElement(
                "div",
                { className: "col-sm-1" },
                r.a.createElement(Ne, { id: a, items: e.addressTypes })
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                n + " " + o + (c ? "-" + c : "")
              ),
              r.a.createElement("div", { className: "col-sm-2" }, i),
              r.a.createElement("div", { className: "col-sm-2" }, l),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                u ? u.name : ""
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                s
                  ? r.a.createElement(
                      "span",
                      { className: "pull-right" },
                      "Primair"
                    )
                  : ""
              )
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-1" },
              e.showActionButtons
                ? r.a.createElement(
                    "a",
                    { role: "button", onClick: e.openEdit },
                    r.a.createElement("span", {
                      className: "glyphicon glyphicon-pencil mybtn-success"
                    }),
                    " "
                  )
                : "",
              e.showActionButtons
                ? r.a.createElement(
                    "a",
                    { role: "button", onClick: e.toggleDelete },
                    r.a.createElement("span", {
                      className: "glyphicon glyphicon-trash mybtn-danger"
                    }),
                    " "
                  )
                : ""
            )
          );
        }),
        De = Object(b.b)(function(e) {
          return {
            addressTypes: e.systemData.addressTypes,
            countries: e.systemData.countries
          };
        }, null)(function(e) {
          var t = e.address,
            a = t.street,
            n = t.number,
            o = t.addition,
            c = t.postalCode,
            i = t.city,
            l = t.typeId,
            s = t.primary,
            u = t.countryId;
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(
              "form",
              { className: "form-horizontal", onSubmit: e.handleSubmit },
              r.a.createElement(
                w.a,
                { className: "panel-grey" },
                r.a.createElement(
                  D.a,
                  null,
                  r.a.createElement(
                    "div",
                    { className: "row" },
                    r.a.createElement(x.a, {
                      label: "Postcode",
                      size: "col-sm-4",
                      name: "postalCode",
                      value: c,
                      onChangeAction: e.handleInputChange,
                      required: "required",
                      error: e.postalCodeError
                    }),
                    r.a.createElement(
                      "div",
                      { className: "form-group col-sm-6" },
                      r.a.createElement(
                        "label",
                        { htmlFor: "number", className: "col-sm-6 required" },
                        "Nummer"
                      ),
                      r.a.createElement(
                        "div",
                        { className: "col-sm-4" },
                        r.a.createElement("input", {
                          type: "number",
                          className:
                            "form-control input-sm" +
                            (e.numberError ? "has-error" : ""),
                          id: "number",
                          name: "number",
                          value: n,
                          onChange: e.handleInputChange
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "col-sm-2" },
                        r.a.createElement("input", {
                          type: "text",
                          className: "form-control input-sm",
                          id: "addition",
                          name: "addition",
                          value: o,
                          onChange: e.handleInputChange
                        })
                      )
                    )
                  ),
                  r.a.createElement(
                    "div",
                    { className: "row" },
                    r.a.createElement(x.a, {
                      label: "Adres",
                      id: "adres",
                      size: "col-sm-6",
                      name: "street",
                      value: a,
                      onChangeAction: e.handleInputChange
                    }),
                    r.a.createElement(x.a, {
                      label: "Plaats",
                      id: "plaats",
                      size: "col-sm-6",
                      name: "city",
                      value: i,
                      onChangeAction: e.handleInputChange
                    })
                  ),
                  r.a.createElement(
                    "div",
                    { className: "row" },
                    r.a.createElement(Z.a, {
                      label: "Type",
                      id: "type",
                      size: "col-sm-6",
                      name: "typeId",
                      options: e.addressTypes,
                      value: l,
                      onChangeAction: e.handleInputChange,
                      required: "required",
                      error: e.typeIdError
                    }),
                    r.a.createElement(F.a, {
                      label: "Primair adres",
                      name: "primary",
                      value: s,
                      onChangeAction: e.handleInputChange,
                      disabled: s
                    })
                  ),
                  r.a.createElement(
                    "div",
                    { className: "row" },
                    r.a.createElement(Z.a, {
                      label: "Land",
                      id: "countryId",
                      size: "col-sm-6",
                      name: "countryId",
                      options: e.countries,
                      value: u,
                      onChangeAction: e.handleInputChange,
                      error: e.countryIdError
                    })
                  ),
                  r.a.createElement(
                    "div",
                    { className: "pull-right btn-group", role: "group" },
                    r.a.createElement(q.a, {
                      buttonClassName: "btn-default",
                      buttonText: "Annuleren",
                      onClickAction: e.cancelEdit
                    }),
                    r.a.createElement(q.a, {
                      buttonText: "Opslaan",
                      onClickAction: e.handleSubmit,
                      type: "submit",
                      value: "Submit"
                    })
                  )
                )
              )
            )
          );
        }),
        Oe = Object(b.b)(null, function(e) {
          return {
            deleteAddress: function(t) {
              e(Object(N.a)(t));
            }
          };
        })(function(e) {
          var t = !1;
          return (
            (!e.primary ||
              (e.numberOfAddresses && 1 === e.numberOfAddresses)) &&
              (t = !0),
            r.a.createElement(
              C.a,
              {
                buttonConfirmText: "Verwijder",
                buttonClassName: "btn-danger",
                closeModal: e.closeDeleteItemModal,
                confirmAction: function() {
                  return e.deleteAddress(e.id), void e.closeDeleteItemModal();
                },
                showConfirmAction: t,
                title: "Verwijderen"
              },
              r.a.createElement(
                "p",
                null,
                "Verwijder adres: ",
                r.a.createElement(
                  "strong",
                  null,
                  " ",
                  "".concat(e.street, " ").concat(e.number),
                  " "
                )
              ),
              e.primary &&
                e.numberOfAddresses > 1 &&
                r.a.createElement(
                  "p",
                  { className: "text-danger" },
                  r.a.createElement("strong", null, "Fout!"),
                  " Dit is een primair adres en kan niet worden verwijderd.",
                  r.a.createElement("br", null),
                  "Maak eerst een ander adres primair."
                ),
              e.primary &&
                t &&
                r.a.createElement(
                  "p",
                  { className: "text-danger" },
                  r.a.createElement("strong", null, "Let op!"),
                  " Dit is een primair adres en enige adres bij contact."
                )
            )
          );
        });
      function Ce(e, t) {
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
      function Se(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Ce(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Ce(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function ke(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var Ae = (function(e) {
          d()(a, e);
          var t = ke(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              v()(u()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              v()(u()(n), "openEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              v()(u()(n), "closeEdit", function() {
                n.setState({ showEdit: !1 });
              }),
              v()(u()(n), "cancelEdit", function() {
                n.setState(
                  Se(Se({}, n.state), {}, { address: Se({}, n.props.address) })
                ),
                  n.closeEdit();
              }),
              v()(u()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              v()(u()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Se(
                    Se({}, n.state),
                    {},
                    { address: Se(Se({}, n.state.address), {}, v()({}, r, a)) }
                  )
                );
              }),
              v()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.address;
                t.postalCode && (t.postalCode = t.postalCode.toUpperCase());
                var a = {},
                  r = !1;
                R.a.isEmpty(t.postalCode + "") &&
                  ((a.postalCode = !0), (r = !0));
                var o = t.countryId;
                R.a.isEmpty(t.countryId + "") && (o = "NL");
                R.a.isEmpty(t.postalCode + "") ||
                  ("NL" == o
                    ? R.a.isPostalCode(t.postalCode, "NL")
                    : R.a.isPostalCode(t.postalCode, "any")) ||
                  ((a.postalCode = !0), (a.countryId = !0), (r = !0)),
                  R.a.isEmpty(t.number + "") && ((a.number = !0), (r = !0)),
                  R.a.isEmpty(t.typeId + "") && ((a.typeId = !0), (r = !0)),
                  n.setState(Se(Se({}, n.state), {}, { errors: a })),
                  !r &&
                    Ee.a.updateAddress(t).then(function(e) {
                      t.primary && n.props.unsetPrimaryAddresses(),
                        n.props.updateAddress(e),
                        n.closeEdit();
                    });
              }),
              (n.state = {
                showActionButtons: !1,
                highlightLine: "",
                showEdit: !1,
                showDelete: !1,
                address: Se({}, e.address),
                errors: {
                  typeId: !1,
                  postalCode: !1,
                  number: !1,
                  countryId: !1
                }
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  Object(j.isEqual)(this.state.address, e.address) ||
                    this.setState(
                      Se(Se({}, this.state), {}, { address: Se({}, e.address) })
                    );
                }
              },
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    "div",
                    null,
                    r.a.createElement(we, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      openEdit: this.openEdit,
                      toggleDelete: this.toggleDelete,
                      address: this.state.address
                    }),
                    this.state.showEdit &&
                      r.a.createElement(De, {
                        address: this.state.address,
                        handleInputChange: this.handleInputChange,
                        handleSubmit: this.handleSubmit,
                        typeIdError: this.state.errors.typeId,
                        postalCodeError: this.state.errors.postalCode,
                        numberError: this.state.errors.number,
                        countryIdError: this.state.errors.countryId,
                        cancelEdit: this.cancelEdit
                      }),
                    this.state.showDelete &&
                      r.a.createElement(
                        Oe,
                        ge()(
                          {
                            closeDeleteItemModal: this.toggleDelete,
                            numberOfAddresses: this.props.numberOfAddresses
                          },
                          this.props.address
                        )
                      )
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        Ie = Object(b.b)(null, function(e) {
          return {
            updateAddress: function(t) {
              e(Object(N.q)(t));
            },
            unsetPrimaryAddresses: function() {
              e(Object(N.n)());
            }
          };
        })(Ae),
        je = Object(b.b)(function(e) {
          return { addresses: e.contactDetails.addresses };
        })(function(e) {
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(
              "div",
              { className: "row border header" },
              r.a.createElement("div", { className: "col-sm-1" }, "Type"),
              r.a.createElement("div", { className: "col-sm-2" }, "Adres"),
              r.a.createElement("div", { className: "col-sm-2" }, "Postcode"),
              r.a.createElement("div", { className: "col-sm-2" }, "Plaats"),
              r.a.createElement("div", { className: "col-sm-2" }, "Land"),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                r.a.createElement(
                  "span",
                  { className: "pull-right" },
                  "Primair"
                )
              ),
              r.a.createElement("div", { className: "col-sm-1" })
            ),
            e.addresses.length > 0
              ? e.addresses.map(function(t) {
                  return r.a.createElement(Ie, {
                    key: t.id,
                    address: t,
                    numberOfAddresses: e.addresses.length
                  });
                })
              : r.a.createElement("div", null, "Geen adres bekend.")
          );
        });
      function Pe(e, t) {
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
      function Le(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Pe(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Pe(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
            n = g()(e);
          if (t) {
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var Re = (function(e) {
          d()(a, e);
          var t = Me(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "handleInputPicoChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Le(
                    Le({}, n.state),
                    {},
                    { address: Le(Le({}, n.state.address), {}, v()({}, r, a)) }
                  )
                ),
                  setTimeout(function() {
                    var e = n.state.address;
                    !R.a.isEmpty(e.postalCode) &&
                      R.a.isPostalCode(e.postalCode, "NL") &&
                      !R.a.isEmpty(e.number) &&
                      R.a.isEmpty(e.city) &&
                      R.a.isEmpty(e.street) &&
                      Ee.a
                        .getPicoAddress(e.postalCode, e.number)
                        .then(function(e) {
                          n.setState(
                            Le(
                              Le({}, n.state),
                              {},
                              {
                                address: Le(
                                  Le({}, n.state.address),
                                  {},
                                  { street: e.street, city: e.city }
                                )
                              }
                            )
                          );
                        });
                  }, 100);
              }),
              v()(u()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Le(
                    Le({}, n.state),
                    {},
                    { address: Le(Le({}, n.state.address), {}, v()({}, r, a)) }
                  )
                );
              }),
              v()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.address;
                t.postalCode = t.postalCode.toUpperCase();
                var a = {},
                  r = !1;
                R.a.isEmpty(t.postalCode) && ((a.postalCode = !0), (r = !0));
                var o = t.countryId;
                R.a.isEmpty(t.countryId + "") && (o = "NL");
                R.a.isEmpty(t.postalCode + "") ||
                  ("NL" == o
                    ? R.a.isPostalCode(t.postalCode, "NL")
                    : R.a.isPostalCode(t.postalCode, "any")) ||
                  ((a.postalCode = !0), (a.countryId = !0), (r = !0)),
                  R.a.isEmpty(t.number) && ((a.number = !0), (r = !0)),
                  R.a.isEmpty(t.typeId) && ((a.typeId = !0), (r = !0)),
                  n.setState(Le(Le({}, n.state), {}, { errors: a })),
                  !r &&
                    Ee.a.newAddress(t).then(function(e) {
                      t.primary && n.props.unsetPrimaryAddresses(),
                        n.props.newAddress(e),
                        n.props.toggleShowNew();
                    });
              }),
              (n.state = {
                address: {
                  contactId: n.props.id,
                  street: "",
                  number: "",
                  addition: "",
                  postalCode: "",
                  city: "",
                  typeId: "visit",
                  primary: !1,
                  countryId: ""
                },
                errors: {
                  typeId: !1,
                  postalCode: !1,
                  number: !1,
                  countryId: !1
                }
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.address,
                    t = e.street,
                    a = e.number,
                    n = e.addition,
                    o = e.postalCode,
                    c = e.city,
                    i = e.typeId,
                    l = e.primary,
                    s = e.countryId;
                  return r.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    r.a.createElement(
                      w.a,
                      { className: "panel-grey" },
                      r.a.createElement(
                        D.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(x.a, {
                            label: "Postcode",
                            size: "col-sm-4",
                            name: "postalCode",
                            value: o,
                            onChangeAction: this.handleInputPicoChange,
                            required: "required",
                            error: this.state.errors.postalCode
                          }),
                          r.a.createElement(
                            "div",
                            { className: "form-group col-sm-6" },
                            r.a.createElement(
                              "label",
                              {
                                htmlFor: "number",
                                className: "col-sm-6 required"
                              },
                              "Nummer"
                            ),
                            r.a.createElement(
                              "div",
                              { className: "col-sm-4" },
                              r.a.createElement("input", {
                                type: "number",
                                className:
                                  "form-control input-sm " +
                                  (this.state.errors.number ? "has-error" : ""),
                                id: "number",
                                name: "number",
                                value: a,
                                onChange: this.handleInputPicoChange
                              })
                            ),
                            r.a.createElement(
                              "div",
                              { className: "col-sm-2" },
                              r.a.createElement("input", {
                                type: "text",
                                className: "form-control input-sm",
                                id: "addition",
                                name: "addition",
                                value: n,
                                onChange: this.handleInputChange
                              })
                            )
                          )
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(x.a, {
                            label: "Adres",
                            id: "adres",
                            size: "col-sm-6",
                            name: "street",
                            value: t,
                            onChangeAction: this.handleInputChange
                          }),
                          r.a.createElement(x.a, {
                            label: "Plaats",
                            id: "plaats",
                            size: "col-sm-6",
                            name: "city",
                            value: c,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(Z.a, {
                            label: "Type",
                            id: "type",
                            size: "col-sm-6",
                            name: "typeId",
                            options: this.props.addressTypes,
                            value: i,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.typeId
                          }),
                          r.a.createElement(F.a, {
                            label: "Primair adres",
                            name: "primary",
                            value: l,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(Z.a, {
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
                          { className: "pull-right btn-group", role: "group" },
                          r.a.createElement(q.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          r.a.createElement(q.a, {
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
        })(n.Component),
        Te = Object(b.b)(
          function(e) {
            return {
              addressTypes: e.systemData.addressTypes,
              countries: e.systemData.countries,
              id: e.contactDetails.id
            };
          },
          function(e) {
            return {
              newAddress: function(t) {
                e(Object(N.i)(t));
              },
              unsetPrimaryAddresses: function() {
                e(Object(N.n)());
              }
            };
          }
        )(Re),
        xe = a(698);
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
            n = g()(e);
          if (t) {
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var qe = (function(e) {
          d()(a, e);
          var t = Be(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "toggleShowNew", function() {
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
                  return r.a.createElement(
                    w.a,
                    null,
                    r.a.createElement(
                      xe.a,
                      null,
                      r.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Adres gegevens"
                      ),
                      r.a.createElement(
                        "a",
                        {
                          role: "button",
                          className: "pull-right",
                          onClick: this.toggleShowNew
                        },
                        r.a.createElement("span", {
                          className: "glyphicon glyphicon-plus"
                        })
                      )
                    ),
                    r.a.createElement(
                      D.a,
                      null,
                      r.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        r.a.createElement(je, null)
                      ),
                      r.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          r.a.createElement(Te, {
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
        })(n.Component),
        Ge = a(219),
        ze = Object(b.b)(function(e) {
          return { phoneNumberTypes: e.systemData.phoneNumberTypes };
        }, null)(function(e) {
          var t = e.phoneNumber,
            a = t.number,
            n = t.typeId,
            o = t.primary;
          return r.a.createElement(
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
            r.a.createElement(
              "div",
              { onClick: e.openEdit },
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                r.a.createElement(Ne, { id: n, items: e.phoneNumberTypes })
              ),
              r.a.createElement("div", { className: "col-sm-7" }, a),
              r.a.createElement(
                "div",
                { className: "col-sm-2 push" },
                o
                  ? r.a.createElement(
                      "span",
                      { className: "pull-right" },
                      "Primair"
                    )
                  : ""
              )
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-1" },
              e.showActionButtons
                ? r.a.createElement(
                    "a",
                    { role: "button", onClick: e.openEdit },
                    r.a.createElement("span", {
                      className: "glyphicon glyphicon-pencil mybtn-success"
                    }),
                    " "
                  )
                : "",
              e.showActionButtons
                ? r.a.createElement(
                    "a",
                    { role: "button", onClick: e.toggleDelete },
                    r.a.createElement("span", {
                      className: "glyphicon glyphicon-trash mybtn-danger"
                    }),
                    " "
                  )
                : ""
            )
          );
        }),
        Fe = Object(b.b)(function(e) {
          return { phoneNumberTypes: e.systemData.phoneNumberTypes };
        }, null)(function(e) {
          var t = e.phoneNumber,
            a = t.number,
            n = t.typeId,
            o = t.primary;
          return r.a.createElement(
            "form",
            { className: "form-horizontal", onSubmit: e.handleSubmit },
            r.a.createElement(
              w.a,
              { className: "panel-grey" },
              r.a.createElement(
                D.a,
                null,
                r.a.createElement(
                  "div",
                  { className: "row" },
                  r.a.createElement(x.a, {
                    label: "Nummer",
                    id: "nummer",
                    size: "col-sm-6",
                    name: "number",
                    value: a,
                    onChangeAction: e.handleInputChange,
                    required: "required",
                    error: e.numberError
                  }),
                  r.a.createElement(Z.a, {
                    label: "Type",
                    id: "type",
                    size: "col-sm-6",
                    name: "typeId",
                    options: e.phoneNumberTypes,
                    value: n,
                    onChangeAction: e.handleInputChange,
                    required: "required",
                    error: e.typeIdError
                  })
                ),
                r.a.createElement(
                  "div",
                  { className: "row" },
                  r.a.createElement(F.a, {
                    label: "Primair telefoonnummer",
                    name: "primary",
                    value: o,
                    onChangeAction: e.handleInputChange,
                    disabled: o
                  })
                ),
                r.a.createElement(
                  "div",
                  { className: "pull-right btn-group", role: "group" },
                  r.a.createElement(q.a, {
                    buttonClassName: "btn-default",
                    buttonText: "Annuleren",
                    onClickAction: e.cancelEdit
                  }),
                  r.a.createElement(q.a, {
                    buttonText: "Opslaan",
                    onClickAction: e.handleSubmit,
                    type: "submit",
                    value: "Submit"
                  })
                )
              )
            )
          );
        }),
        _e = Object(b.b)(null, function(e) {
          return {
            deletePhoneNumber: function(t) {
              e(Object(N.f)(t));
            }
          };
        })(function(e) {
          var t = !1;
          return (
            (!e.primary ||
              (e.numberOfPhoneNumbers && 1 === e.numberOfPhoneNumbers)) &&
              (t = !0),
            r.a.createElement(
              C.a,
              {
                buttonConfirmText: "Verwijder",
                buttonClassName: "btn-danger",
                closeModal: e.closeDeleteItemModal,
                confirmAction: function() {
                  return (
                    e.deletePhoneNumber(e.id), void e.closeDeleteItemModal()
                  );
                },
                showConfirmAction: t,
                title: "Verwijderen"
              },
              r.a.createElement(
                "p",
                null,
                "Verwijder telefoonnummer: ",
                r.a.createElement("strong", null, " ", "".concat(e.number), " ")
              ),
              e.primary &&
                e.numberOfPhoneNumbers > 1 &&
                r.a.createElement(
                  "p",
                  { className: "text-danger" },
                  r.a.createElement("strong", null, "Fout!"),
                  " Dit is een primair telefoonnummer en kan niet worden verwijderd.",
                  r.a.createElement("br", null),
                  "Maak eerst een ander e-mailadres primair."
                ),
              e.primary &&
                t &&
                r.a.createElement(
                  "p",
                  { className: "text-danger" },
                  r.a.createElement("strong", null, "Let op!"),
                  " Dit is een primair telefoonnummer en enige telefoonnummer bij contact."
                )
            )
          );
        }),
        Ve = a(215),
        Ue = Object(b.b)(function(e) {
          return { emailAddressTypes: e.systemData.emailAddressTypes };
        }, null)(function(e) {
          var t = e.emailAddress,
            a = t.email,
            n = t.typeId,
            o = t.primary;
          return r.a.createElement(
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
            r.a.createElement(
              "div",
              { onClick: e.openEdit },
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                r.a.createElement(Ne, { id: n, items: e.emailAddressTypes })
              ),
              r.a.createElement("div", { className: "col-sm-7" }, a),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                o
                  ? r.a.createElement(
                      "span",
                      { className: "pull-right" },
                      "Primair"
                    )
                  : ""
              )
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-1" },
              e.showActionButtons
                ? r.a.createElement(
                    "a",
                    { role: "button", onClick: e.openEdit },
                    r.a.createElement("span", {
                      className: "glyphicon glyphicon-pencil mybtn-success"
                    }),
                    " "
                  )
                : "",
              e.showActionButtons
                ? r.a.createElement(
                    "a",
                    { role: "button", onClick: e.toggleDelete },
                    r.a.createElement("span", {
                      className: "glyphicon glyphicon-trash mybtn-danger"
                    }),
                    " "
                  )
                : ""
            )
          );
        }),
        Ye = Object(b.b)(function(e) {
          return { emailAddressTypes: e.systemData.emailAddressTypes };
        }, null)(function(e) {
          var t = e.emailAddress,
            a = t.email,
            n = t.typeId,
            o = t.primary;
          return r.a.createElement(
            "form",
            { className: "form-horizontal", onSubmit: e.handleSubmit },
            r.a.createElement(
              w.a,
              { className: "panel-grey" },
              r.a.createElement(
                D.a,
                null,
                r.a.createElement(
                  "div",
                  { className: "row" },
                  r.a.createElement(x.a, {
                    label: "E-mail",
                    id: "email",
                    size: "col-sm-6",
                    name: "email",
                    value: a,
                    onChangeAction: e.handleInputChange,
                    required: "required",
                    error: e.emailError
                  }),
                  r.a.createElement(Z.a, {
                    label: "Type",
                    id: "type",
                    size: "col-sm-6",
                    name: "typeId",
                    options: e.emailAddressTypes,
                    value: n,
                    onChangeAction: e.handleInputChange,
                    required: "required",
                    error: e.typeIdError
                  })
                ),
                r.a.createElement(
                  "div",
                  { className: "row" },
                  r.a.createElement(F.a, {
                    label: "Primair e-mailadres",
                    name: "primary",
                    value: o,
                    onChangeAction: e.handleInputChange,
                    disabled: o
                  })
                ),
                r.a.createElement(
                  "div",
                  { className: "pull-right btn-group", role: "group" },
                  r.a.createElement(q.a, {
                    buttonClassName: "btn-default",
                    buttonText: "Annuleren",
                    onClickAction: e.cancelEdit
                  }),
                  r.a.createElement(q.a, {
                    buttonText: "Opslaan",
                    onClickAction: e.handleSubmit,
                    type: "submit",
                    value: "Submit"
                  })
                )
              )
            )
          );
        }),
        We = Object(b.b)(null, function(e) {
          return {
            deleteEmailAddress: function(t) {
              e(Object(N.d)(t));
            }
          };
        })(function(e) {
          var t = !1;
          return (
            (!e.primary ||
              (e.numberOfEmailAddresses && 1 === e.numberOfEmailAddresses)) &&
              (t = !0),
            r.a.createElement(
              C.a,
              {
                buttonConfirmText: "Verwijder",
                buttonClassName: "btn-danger",
                closeModal: e.closeDeleteItemModal,
                confirmAction: function() {
                  return (
                    e.deleteEmailAddress(e.id), void e.closeDeleteItemModal()
                  );
                },
                showConfirmAction: t,
                title: "Verwijderen"
              },
              r.a.createElement(
                "p",
                null,
                "Verwijder e-mailadres: ",
                r.a.createElement("strong", null, " ", "".concat(e.email), " ")
              ),
              e.primary &&
                e.numberOfEmailAddresses > 1 &&
                r.a.createElement(
                  "p",
                  { className: "text-danger" },
                  r.a.createElement("strong", null, "Fout!"),
                  " Dit is een primair e-mailadres en kan niet worden verwijderd.",
                  r.a.createElement("br", null),
                  "Maak eerst een ander e-mailadres primair."
                ),
              e.primary &&
                t &&
                r.a.createElement(
                  "p",
                  { className: "text-danger" },
                  r.a.createElement("strong", null, "Let op!"),
                  " Dit is een primair e-mailadres en enige e-mailadres bij contact."
                )
            )
          );
        });
      function Je(e, t) {
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
      function Ke(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Je(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Je(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
            n = g()(e);
          if (t) {
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var Xe = (function(e) {
          d()(a, e);
          var t = He(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              v()(u()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              v()(u()(n), "openEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              v()(u()(n), "closeEdit", function() {
                n.setState({ showEdit: !1 });
              }),
              v()(u()(n), "cancelEdit", function() {
                n.setState(
                  Ke(
                    Ke({}, n.state),
                    {},
                    { emailAddress: Ke({}, n.props.emailAddress) }
                  )
                ),
                  n.closeEdit();
              }),
              v()(u()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              v()(u()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Ke(
                    Ke({}, n.state),
                    {},
                    {
                      emailAddress: Ke(
                        Ke({}, n.state.emailAddress),
                        {},
                        v()({}, r, a)
                      )
                    }
                  )
                );
              }),
              v()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.emailAddress,
                  a = {},
                  r = !1;
                R.a.isEmail(t.email) || ((a.email = !0), (r = !0)),
                  R.a.isEmpty(t.typeId) && ((a.typeId = !0), (r = !0)),
                  n.setState(Ke(Ke({}, n.state), {}, { errors: a })),
                  !r &&
                    Ve.a.updateEmailAddress(t).then(function(e) {
                      t.primary && n.props.unsetPrimaryEmailAddresses(),
                        n.props.updateEmailAddress(e),
                        n.closeEdit();
                    });
              }),
              (n.state = {
                showActionButtons: !1,
                highlightLine: "",
                showEdit: !1,
                showDelete: !1,
                typeIdError: !1,
                emailError: !1,
                emailAddress: Ke({}, e.emailAddress),
                errors: { typeId: !1, email: !1 }
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  Object(j.isEqual)(this.state.emailAddress, e.emailAddress) ||
                    this.setState(
                      Ke(
                        Ke({}, this.state),
                        {},
                        { emailAddress: Ke({}, e.emailAddress) }
                      )
                    );
                }
              },
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    "div",
                    null,
                    r.a.createElement(Ue, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      openEdit: this.openEdit,
                      toggleDelete: this.toggleDelete,
                      emailAddress: this.state.emailAddress
                    }),
                    this.state.showEdit &&
                      r.a.createElement(Ye, {
                        emailAddress: this.state.emailAddress,
                        handleInputChange: this.handleInputChange,
                        handleSubmit: this.handleSubmit,
                        typeIdError: this.state.errors.typeId,
                        emailError: this.state.errors.email,
                        cancelEdit: this.cancelEdit
                      }),
                    this.state.showDelete &&
                      r.a.createElement(
                        We,
                        ge()(
                          {
                            closeDeleteItemModal: this.toggleDelete,
                            numberOfEmailAddresses: this.props
                              .numberOfEmailAddresses
                          },
                          this.props.emailAddress
                        )
                      )
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        Ze = Object(b.b)(null, function(e) {
          return {
            updateEmailAddress: function(t) {
              e(Object(N.s)(t));
            },
            unsetPrimaryEmailAddresses: function() {
              e(Object(N.o)());
            }
          };
        })(Xe);
      function Qe(e, t) {
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
      function $e(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Qe(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Qe(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function et(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var tt = (function(e) {
          d()(a, e);
          var t = et(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              v()(u()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              v()(u()(n), "openEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              v()(u()(n), "closeEdit", function() {
                n.setState({ showEdit: !1 });
              }),
              v()(u()(n), "cancelEdit", function() {
                n.setState(
                  $e(
                    $e({}, n.state),
                    {},
                    { phoneNumber: $e({}, n.props.phoneNumber) }
                  )
                ),
                  n.closeEdit();
              }),
              v()(u()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              v()(u()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  $e(
                    $e({}, n.state),
                    {},
                    {
                      phoneNumber: $e(
                        $e({}, n.state.phoneNumber),
                        {},
                        v()({}, r, a)
                      )
                    }
                  )
                );
              }),
              v()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.phoneNumber,
                  a = {},
                  r = !1;
                R.a.isEmpty(t.number) && ((a.number = !0), (r = !0)),
                  R.a.isEmpty(t.typeId) && ((a.typeId = !0), (r = !0)),
                  n.setState($e($e({}, n.state), {}, { errors: a })),
                  !r &&
                    Ge.a.updatePhoneNumber(t).then(function(e) {
                      t.primary && n.props.unsetPrimaryPhoneNumbers(),
                        n.props.updatePhoneNumber(e),
                        n.closeEdit();
                    });
              }),
              (n.state = {
                showActionButtons: !1,
                highlightLine: "",
                showEdit: !1,
                showDelete: !1,
                typeIdError: !1,
                numberError: !1,
                phoneNumber: $e({}, e.phoneNumber),
                errors: { typeId: !1, number: !1 }
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  Object(j.isEqual)(this.state.phoneNumber, e.phoneNumber) ||
                    this.setState(
                      $e(
                        $e({}, this.state),
                        {},
                        { phoneNumber: $e({}, e.phoneNumber) }
                      )
                    );
                }
              },
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    "div",
                    null,
                    r.a.createElement(ze, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      openEdit: this.openEdit,
                      toggleDelete: this.toggleDelete,
                      phoneNumber: this.state.phoneNumber
                    }),
                    this.state.showEdit &&
                      r.a.createElement(Fe, {
                        phoneNumber: this.state.phoneNumber,
                        handleInputChange: this.handleInputChange,
                        handleSubmit: this.handleSubmit,
                        typeIdError: this.state.errors.typeId,
                        numberError: this.state.errors.number,
                        cancelEdit: this.cancelEdit
                      }),
                    this.state.showDelete &&
                      r.a.createElement(
                        _e,
                        ge()(
                          {
                            closeDeleteItemModal: this.toggleDelete,
                            numberOfPhoneNumbers: this.props
                              .numberOfPhoneNumbers
                          },
                          this.props.phoneNumber
                        )
                      )
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        at = Object(b.b)(null, function(e) {
          return {
            updatePhoneNumber: function(t) {
              e(Object(N.w)(t));
            },
            unsetPrimaryPhoneNumbers: function() {
              e(Object(N.p)());
            }
          };
        })(tt),
        nt = Object(b.b)(function(e) {
          return { phoneNumbers: e.contactDetails.phoneNumbers };
        })(function(e) {
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(
              "div",
              { className: "row header" },
              r.a.createElement("div", { className: "col-sm-2" }, "Type"),
              r.a.createElement(
                "div",
                { className: "col-sm-7" },
                "Telefoonnummers"
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                r.a.createElement(
                  "span",
                  { className: "pull-right" },
                  "Primair"
                )
              ),
              r.a.createElement("div", { className: "col-sm-1" })
            ),
            e.phoneNumbers.length > 0
              ? e.phoneNumbers.map(function(t) {
                  return r.a.createElement(at, {
                    key: t.id,
                    phoneNumber: t,
                    numberOfPhoneNumbers: e.phoneNumbers.length
                  });
                })
              : r.a.createElement("div", null, "Geen telefoonnummers bekend.")
          );
        });
      function rt(e, t) {
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
            ? rt(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : rt(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function ct(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var it = (function(e) {
          d()(a, e);
          var t = ct(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  ot(
                    ot({}, n.state),
                    {},
                    {
                      phoneNumber: ot(
                        ot({}, n.state.phoneNumber),
                        {},
                        v()({}, r, a)
                      )
                    }
                  )
                );
              }),
              v()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.phoneNumber,
                  a = {},
                  r = !1;
                R.a.isEmpty(t.number) && ((a.number = !0), (r = !0)),
                  R.a.isEmpty(t.typeId) && ((a.typeId = !0), (r = !0)),
                  n.setState(ot(ot({}, n.state), {}, { errors: a })),
                  !r &&
                    Ge.a.newPhoneNumber(t).then(function(e) {
                      t.primary && n.props.unsetPrimaryPhoneNumbers(),
                        n.props.newPhoneNumber(e),
                        n.props.toggleShowNew();
                    });
              }),
              (n.state = {
                phoneNumber: {
                  contactId: n.props.id,
                  number: "",
                  typeId: "home",
                  primary: !1
                },
                errors: { typeId: !1, number: !1 }
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.phoneNumber,
                    t = e.number,
                    a = e.typeId,
                    n = e.primary;
                  return r.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    r.a.createElement(
                      w.a,
                      { className: "panel-grey" },
                      r.a.createElement(
                        D.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(x.a, {
                            label: "Nummer",
                            size: "col-sm-6",
                            name: "number",
                            value: t,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.number
                          }),
                          r.a.createElement(Z.a, {
                            label: "Type",
                            size: "col-sm-6",
                            name: "typeId",
                            options: this.props.phoneNumberTypes,
                            value: a,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.typeId
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(F.a, {
                            label: "Primair telefoonnummer",
                            name: "primary",
                            value: n,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          r.a.createElement(q.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          r.a.createElement(q.a, {
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
        })(n.Component),
        lt = Object(b.b)(
          function(e) {
            return {
              phoneNumberTypes: e.systemData.phoneNumberTypes,
              id: e.contactDetails.id
            };
          },
          function(e) {
            return {
              newPhoneNumber: function(t) {
                e(Object(N.m)(t));
              },
              unsetPrimaryPhoneNumbers: function() {
                e(Object(N.p)());
              }
            };
          }
        )(it);
      function st(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var ut = (function(e) {
          d()(a, e);
          var t = st(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "toggleShowNew", function() {
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
                  return r.a.createElement(
                    w.a,
                    null,
                    r.a.createElement(
                      xe.a,
                      null,
                      r.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Telefoon gegevens"
                      ),
                      r.a.createElement(
                        "a",
                        {
                          role: "button",
                          className: "pull-right",
                          onClick: this.toggleShowNew
                        },
                        r.a.createElement("span", {
                          className: "glyphicon glyphicon-plus"
                        })
                      )
                    ),
                    r.a.createElement(
                      D.a,
                      null,
                      r.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        r.a.createElement(nt, null)
                      ),
                      r.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          r.a.createElement(lt, {
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
        })(n.Component),
        mt = Object(b.b)(function(e) {
          return { emailAddresses: e.contactDetails.emailAddresses };
        })(function(e) {
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(
              "div",
              { className: "row border header" },
              r.a.createElement("div", { className: "col-sm-2" }, "Type"),
              r.a.createElement("div", { className: "col-sm-7" }, "E-mail"),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                r.a.createElement(
                  "span",
                  { className: "pull-right" },
                  "Primair"
                )
              ),
              r.a.createElement("div", { className: "col-sm-1" })
            ),
            e.emailAddresses.length > 0
              ? e.emailAddresses.map(function(t) {
                  return r.a.createElement(Ze, {
                    key: t.id,
                    emailAddress: t,
                    numberOfEmailAddresses: e.emailAddresses.length
                  });
                })
              : r.a.createElement("div", null, "Geen e-mailadressen bekend.")
          );
        });
      function dt(e, t) {
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
      function pt(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? dt(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : dt(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function ht(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var ft = (function(e) {
          d()(a, e);
          var t = ht(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  pt(
                    pt({}, n.state),
                    {},
                    {
                      emailAddress: pt(
                        pt({}, n.state.emailAddress),
                        {},
                        v()({}, r, a)
                      )
                    }
                  )
                );
              }),
              v()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.emailAddress,
                  a = {},
                  r = !1;
                R.a.isEmail(t.email) || ((a.email = !0), (r = !0)),
                  R.a.isEmpty(t.typeId) && ((a.typeId = !0), (r = !0)),
                  n.setState(pt(pt({}, n.state), {}, { errors: a })),
                  !r &&
                    Ve.a.newEmailAddress(t).then(function(e) {
                      t.primary && n.props.unsetPrimaryEmailAddresses(),
                        n.props.newEmailAddress(e),
                        n.props.toggleShowNew();
                    });
              }),
              (n.state = {
                emailAddress: {
                  contactId: n.props.id,
                  email: "",
                  typeId: "home",
                  primary: !1
                },
                errors: { typeId: !1, email: !1 }
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.emailAddress,
                    t = e.email,
                    a = e.typeId,
                    n = e.primary;
                  return r.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    r.a.createElement(
                      w.a,
                      { className: "panel-grey" },
                      r.a.createElement(
                        D.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(x.a, {
                            label: "E-mail",
                            id: "email",
                            size: "col-sm-6",
                            name: "email",
                            value: t,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.email
                          }),
                          r.a.createElement(Z.a, {
                            label: "Type",
                            id: "type",
                            size: "col-sm-6",
                            name: "typeId",
                            options: this.props.emailAddressTypes,
                            value: a,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.typeId
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(F.a, {
                            label: "Primair e-mailadres",
                            name: "primary",
                            value: n,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          r.a.createElement(q.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          r.a.createElement(q.a, {
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
        })(n.Component),
        gt = Object(b.b)(
          function(e) {
            return {
              emailAddressTypes: e.systemData.emailAddressTypes,
              id: e.contactDetails.id
            };
          },
          function(e) {
            return {
              newEmailAddress: function(t) {
                e(Object(N.k)(t));
              },
              unsetPrimaryEmailAddresses: function() {
                e(Object(N.o)());
              }
            };
          }
        )(ft);
      function Et(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var vt = (function(e) {
        d()(a, e);
        var t = Et(a);
        function a(e) {
          var n;
          return (
            c()(this, a),
            (n = t.call(this, e)),
            v()(u()(n), "toggleShowNew", function() {
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
                return r.a.createElement(
                  w.a,
                  null,
                  r.a.createElement(
                    xe.a,
                    null,
                    r.a.createElement(
                      "span",
                      { className: "h5 text-bold" },
                      "E-mail gegevens"
                    ),
                    r.a.createElement(
                      "a",
                      {
                        role: "button",
                        className: "pull-right",
                        onClick: this.toggleShowNew
                      },
                      r.a.createElement("span", {
                        className: "glyphicon glyphicon-plus"
                      })
                    )
                  ),
                  r.a.createElement(
                    D.a,
                    null,
                    r.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      r.a.createElement(mt, null)
                    ),
                    r.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      this.state.showNew &&
                        r.a.createElement(gt, {
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
      })(n.Component);
      function bt(e, t) {
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
      function yt(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? bt(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : bt(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Nt(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var wt = a(747),
        Dt = (function(e) {
          d()(a, e);
          var t = Nt(a);
          function a(e) {
            var n;
            c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  yt(
                    yt({}, n.state),
                    {},
                    { other: yt(yt({}, n.state.other), {}, v()({}, r, a)) }
                  )
                );
              }),
              v()(u()(n), "handleInputChangeCollectMandate", function(e) {
                var t,
                  a = e.target,
                  r = "checkbox" === a.type ? a.checked : a.value,
                  o = a.name,
                  c = "",
                  i = "",
                  l = "",
                  s = "";
                !0 === r &&
                  ((c = n.props.contactDetails.number),
                  (i = L()().format("Y-MM-DD")),
                  (l = L()()
                    .add(1, "M")
                    .format("Y-MM-01")),
                  (s = "core")),
                  n.setState(
                    yt(
                      yt({}, n.state),
                      {},
                      {
                        other: yt(
                          yt({}, n.state.other),
                          {},
                          ((t = {}),
                          v()(t, o, r),
                          v()(t, "collectMandateCode", c),
                          v()(t, "collectMandateSignatureDate", i),
                          v()(t, "collectMandateFirstRunDate", l),
                          v()(t, "collectMandateCollectionSchema", s),
                          t)
                        )
                      }
                    )
                  );
              }),
              v()(u()(n), "handleInputChangeDate", function(e, t) {
                n.setState(
                  yt(
                    yt({}, n.state),
                    {},
                    { other: yt(yt({}, n.state.other), {}, v()({}, t, e)) }
                  )
                );
              }),
              v()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.other,
                  a = {},
                  r = !1;
                R.a.isEmpty(t.iban) ||
                  wt.isValidIBAN(t.iban) ||
                  ((a.iban = !0), (r = !0)),
                  t.isCollectMandate &&
                    (R.a.isEmpty(t.iban) && ((a.iban = !0), (r = !0)),
                    R.a.isEmpty(t.collectMandateCode) &&
                      ((a.collectMandateCode = !0), (r = !0)),
                    R.a.isEmpty(t.collectMandateSignatureDate) &&
                      ((a.collectMandateSignatureDate = !0), (r = !0)),
                    R.a.isEmpty(t.collectMandateFirstRunDate) &&
                      ((a.collectMandateFirstRunDate = !0), (r = !0))),
                  n.setState(yt(yt({}, n.state), {}, { errors: a })),
                  !r &&
                    X.a
                      .updatePerson(t)
                      .then(function(e) {
                        n.props.dispatch(N.v(e.data.data)),
                          n.props.switchToView();
                      })
                      .catch(function(e) {
                        var t = JSON.parse(JSON.stringify(e)),
                          a =
                            "Er is iets misgegaan bij opslaan. Probeer het opnieuw.";
                        500 !== t.response.status &&
                          (a = t.response.data.message),
                          n.setState({
                            showErrorModal: !0,
                            modalErrorMessage: a
                          });
                      });
              }),
              v()(u()(n), "closeErrorModal", function() {
                n.setState({ showErrorModal: !1, modalErrorMessage: "" });
              });
            var r = e.contactDetails,
              o = r.person,
              i = r.iban,
              l = r.ibanAttn,
              s = r.liable,
              m = r.liabilityAmount,
              d = r.isCollectMandate,
              p = r.collectMandateCode,
              h = r.collectMandateSignatureDate,
              f = r.collectMandateFirstRunDate,
              g = r.collectMandateCollectionSchema;
            return (
              (n.state = {
                other: {
                  id: o.id,
                  firstNamePartner: o.firstNamePartner,
                  lastNamePartner: o.lastNamePartner,
                  dateOfBirthPartner: o.dateOfBirthPartner
                    ? L()(o.dateOfBirthPartner).format("Y-MM-DD")
                    : "",
                  iban: i || "",
                  ibanAttn: l || "",
                  liable: s,
                  liabilityAmount: m,
                  isCollectMandate: d,
                  collectMandateCode: p || "",
                  collectMandateSignatureDate: h
                    ? L()(h).format("Y-MM-DD")
                    : "",
                  collectMandateFirstRunDate: f ? L()(f).format("Y-MM-DD") : "",
                  collectMandateCollectionSchema: g || "core"
                },
                errors: {
                  iban: !1,
                  collectMandateCode: !1,
                  collectMandateSignatureDate: !1,
                  collectMandateFirstRunDate: !1
                },
                showErrorModal: !1,
                modalErrorMessage: ""
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.other,
                    t = e.firstNamePartner,
                    a = e.lastNamePartner,
                    n = e.dateOfBirthPartner,
                    o = e.iban,
                    c = e.ibanAttn,
                    i = e.liable,
                    l = e.liabilityAmount,
                    s = e.isCollectMandate,
                    u = e.collectMandateCode,
                    m = e.collectMandateSignatureDate,
                    d = e.collectMandateFirstRunDate,
                    p = e.collectMandateCollectionSchema;
                  return r.a.createElement(
                    r.a.Fragment,
                    null,
                    r.a.createElement(
                      "form",
                      {
                        className: "form-horizontal col-md-12",
                        onSubmit: this.handleSubmit
                      },
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(x.a, {
                          label: "IBAN",
                          name: "iban",
                          value: o,
                          onChangeAction: this.handleInputChange,
                          readOnly: !this.props.permissions.updateContactIban,
                          error: this.state.errors.iban,
                          required: s ? "required" : ""
                        }),
                        r.a.createElement(x.a, {
                          label: "Voornaam partner",
                          name: "firstNamePartner",
                          value: t,
                          onChangeAction: this.handleInputChange
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(x.a, {
                          label: "IBAN t.n.v.",
                          name: "ibanAttn",
                          value: c,
                          onChangeAction: this.handleInputChange
                        }),
                        r.a.createElement(x.a, {
                          label: "Achternaam partner",
                          name: "lastNamePartner",
                          value: a,
                          onChangeAction: this.handleInputChange
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement("div", {
                          className: "form-group col-sm-6"
                        }),
                        r.a.createElement(B.a, {
                          label: "Geboortedatum partner",
                          name: "dateOfBirthPartner",
                          value: n,
                          onChangeAction: this.handleInputChangeDate
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(F.a, {
                          label: "Aansprakelijkheid",
                          name: "liable",
                          value: i,
                          onChangeAction: this.handleInputChange
                        }),
                        r.a.createElement(x.a, {
                          type: "number",
                          label: "Aansprakelijkheidsbedrag",
                          name: "liabilityAmount",
                          value: l,
                          onChangeAction: this.handleInputChange
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(F.a, {
                          label: "Ingesteld op incasso",
                          name: "isCollectMandate",
                          value: s,
                          onChangeAction: this.handleInputChangeCollectMandate
                        }),
                        s
                          ? r.a.createElement(x.a, {
                              label: "Machtigingskenmerk",
                              name: "collectMandateCode",
                              value: u,
                              onChangeAction: this.handleInputChange,
                              required: "required",
                              error: this.state.errors.collectMandateCode
                            })
                          : null
                      ),
                      s
                        ? r.a.createElement(
                            r.a.Fragment,
                            null,
                            r.a.createElement(
                              "div",
                              { className: "row" },
                              r.a.createElement(B.a, {
                                label: "Datum van ondertekening",
                                name: "collectMandateSignatureDate",
                                value: m,
                                onChangeAction: this.handleInputChangeDate,
                                required: "required",
                                error: this.state.errors
                                  .collectMandateSignatureDate
                              }),
                              r.a.createElement(B.a, {
                                label: "Datum eerste incassoronde",
                                name: "collectMandateFirstRunDate",
                                value: d,
                                onChangeAction: this.handleInputChangeDate,
                                required: "required",
                                error: this.state.errors
                                  .collectMandateFirstRunDate
                              })
                            ),
                            r.a.createElement(
                              "div",
                              { className: "row" },
                              r.a.createElement(x.a, {
                                type: "hidden",
                                name: "collectMandateCollectionSchema",
                                value: p
                              })
                            )
                          )
                        : null,
                      r.a.createElement(
                        G.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          r.a.createElement(q.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.switchToView
                          }),
                          r.a.createElement(q.a, {
                            buttonText: "Opslaan",
                            onClickAction: this.handleSubmit
                          })
                        )
                      )
                    ),
                    this.state.showErrorModal &&
                      r.a.createElement(_.a, {
                        closeModal: this.closeErrorModal,
                        title: "Fout bij opslaan",
                        errorMessage: this.state.modalErrorMessage
                      })
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        Ot = Object(b.b)(function(e) {
          return {
            contactDetails: e.contactDetails,
            permissions: e.meDetails.permissions
          };
        })(Dt),
        Ct = Object(b.b)(function(e) {
          return { contactDetails: e.contactDetails };
        })(function(e) {
          var t = e.contactDetails.person,
            a = t.firstNamePartner,
            n = t.lastNamePartner,
            o = t.dateOfBirthPartner,
            c = e.contactDetails,
            i = c.iban,
            l = c.ibanAttn,
            s = c.liable,
            u = c.liabilityAmount,
            m = c.isCollectMandate,
            d = c.collectMandateCode,
            p = c.collectMandateSignatureDate,
            h = c.collectMandateFirstRunDate;
          c.collectMandateCollectionSchema;
          return r.a.createElement(
            "div",
            { onClick: e.switchToEdit },
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, { label: "IBAN", value: i }),
              r.a.createElement(V.a, { label: "Voornaam partner", value: a })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, { label: "IBAN t.n.v.", value: l }),
              r.a.createElement(V.a, { label: "Achternaam partner", value: n })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                label: "Geboortedatum partner",
                value: o && L()(o).format("DD-MM-Y"),
                className: "col-sm-push-6 col-sm-6"
              })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                label: "Aansprakelijkheid",
                value: s ? "Ja" : "Nee"
              }),
              r.a.createElement(V.a, {
                label: "Aansprakelijkheidsbedrag",
                value:
                  "€ " + u.toLocaleString(void 0, { minimumFractionDigits: 2 })
              })
            ),
            r.a.createElement(
              "div",
              { className: "row" },
              r.a.createElement(V.a, {
                label: "Ingesteld op incasso",
                value: m ? "Ja" : "Nee"
              }),
              m
                ? r.a.createElement(V.a, {
                    label: "Machtigingskenmerk",
                    value: d
                  })
                : null
            ),
            m
              ? r.a.createElement(
                  r.a.Fragment,
                  null,
                  r.a.createElement(
                    "div",
                    { className: "row" },
                    r.a.createElement(V.a, {
                      label: "Datum van ondertekening",
                      value: p && L()(p).format("L")
                    }),
                    r.a.createElement(V.a, {
                      label: "Datum eerste incassoronde",
                      value: h && L()(h).format("L")
                    })
                  )
                )
              : null
          );
        });
      function St(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var kt = (function(e) {
          d()(a, e);
          var t = St(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              v()(u()(n), "switchToView", function() {
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
                  return r.a.createElement(
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
                    r.a.createElement(
                      xe.a,
                      null,
                      r.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Overige gegevens"
                      )
                    ),
                    r.a.createElement(
                      D.a,
                      null,
                      this.state.showEdit
                        ? r.a.createElement(Ot, {
                            switchToView: this.switchToView
                          })
                        : r.a.createElement(Ct, {
                            switchToEdit: this.switchToEdit
                          })
                    )
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        At = Object(b.b)(function(e) {
          return { typeId: e.contactDetails.typeId };
        }, null)(kt),
        It = a(220),
        jt = function(e) {
          var t = e.note,
            a = t.note,
            n = t.createdAt,
            o = t.createdBy;
          return r.a.createElement(
            "div",
            {
              className: "row item-border ".concat(e.highlightLine),
              onMouseEnter: function() {
                return e.onLineEnter();
              },
              onMouseLeave: function() {
                return e.onLineLeave();
              }
            },
            r.a.createElement(
              "div",
              { className: "col-sm-11", onClick: e.openEdit },
              a
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-1" },
              e.showActionButtons
                ? r.a.createElement(
                    "a",
                    { role: "button", onClick: e.openEdit },
                    r.a.createElement("span", {
                      className: "glyphicon glyphicon-pencil mybtn-success"
                    }),
                    " "
                  )
                : "",
              e.showActionButtons
                ? r.a.createElement(
                    "a",
                    { role: "button", onClick: e.toggleDelete },
                    r.a.createElement("span", {
                      className: "glyphicon glyphicon-trash mybtn-danger"
                    }),
                    " "
                  )
                : ""
            ),
            r.a.createElement(V.a, {
              label: "Gemaakt op",
              value: n,
              className: "col-sm-4 h6"
            }),
            r.a.createElement(V.a, {
              label: "Gemaakt door",
              value: o.fullName,
              className: "col-sm-4 h6"
            })
          );
        },
        Pt = function(e) {
          var t = e.note.note;
          return r.a.createElement(
            "form",
            { className: "form-horizontal", onSubmit: e.handleSubmit },
            r.a.createElement(
              w.a,
              { className: "panel-grey" },
              r.a.createElement(
                D.a,
                null,
                r.a.createElement(
                  "div",
                  { className: "row" },
                  r.a.createElement(
                    "div",
                    { className: "col-sm-12" },
                    r.a.createElement("textarea", {
                      name: t,
                      value: t,
                      onChange: e.handleInputChange,
                      className: "form-control input-sm"
                    })
                  )
                ),
                r.a.createElement(
                  "div",
                  {
                    className: "pull-right btn-group margin-10-top",
                    role: "group"
                  },
                  r.a.createElement(q.a, {
                    buttonClassName: "btn-default",
                    buttonText: "Annuleren",
                    onClickAction: e.cancelEdit
                  }),
                  r.a.createElement(q.a, {
                    buttonText: "Opslaan",
                    onClickAction: e.handleSubmit,
                    type: "submit",
                    value: "Submit"
                  })
                )
              )
            )
          );
        },
        Lt = Object(b.b)(null, function(e) {
          return {
            deleteNote: function(t) {
              e(Object(N.e)(t));
            }
          };
        })(function(e) {
          return r.a.createElement(
            C.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return e.deleteNote(e.id), void e.closeDeleteItemModal();
              },
              title: "Verwijderen"
            },
            "Verwijder: ",
            r.a.createElement("strong", null, " ", "".concat(e.id), " ")
          );
        });
      function Mt(e, t) {
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
      function Rt(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Mt(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Mt(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Tt(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var xt = (function(e) {
          d()(a, e);
          var t = Tt(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              v()(u()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              v()(u()(n), "openEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              v()(u()(n), "closeEdit", function() {
                n.setState({ showEdit: !1 });
              }),
              v()(u()(n), "cancelEdit", function() {
                n.setState(
                  Rt(
                    Rt({}, n.state),
                    {},
                    {
                      note: {
                        id: n.props.note.id,
                        note: n.props.note.note,
                        createdAt: n.props.note.createdAt
                          ? L()(n.props.note.createdAt).format("DD-MM-Y")
                          : "",
                        createdBy: n.props.note.createdBy
                      }
                    }
                  )
                ),
                  n.closeEdit();
              }),
              v()(u()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              v()(u()(n), "handleInputChange", function(e) {
                n.setState(
                  Rt(
                    Rt({}, n.state),
                    {},
                    {
                      note: Rt(
                        Rt({}, n.state.note),
                        {},
                        { note: e.target.value }
                      )
                    }
                  )
                );
              }),
              v()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.note;
                It.a.updateNote(t).then(function(e) {
                  n.props.dispatch(N.t(e)), n.closeEdit();
                });
              }),
              (n.state = {
                showActionButtons: !1,
                highlightLine: "",
                showEdit: !1,
                showDelete: !1,
                note: {
                  id: e.note.id,
                  note: e.note.note,
                  createdAt: e.note.createdAt
                    ? L()(e.note.createdAt).format("DD-MM-Y")
                    : "",
                  createdBy: e.note.createdBy
                }
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    "div",
                    { className: "margin-10-top item-border" },
                    r.a.createElement(jt, {
                      note: this.state.note,
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      openEdit: this.openEdit,
                      toggleDelete: this.toggleDelete
                    }),
                    this.state.showEdit &&
                      r.a.createElement(Pt, {
                        note: this.state.note,
                        handleInputChange: this.handleInputChange,
                        handleSubmit: this.handleSubmit,
                        errorType: this.state.errorType,
                        cancelEdit: this.cancelEdit
                      }),
                    this.state.showDelete &&
                      r.a.createElement(
                        Lt,
                        ge()(
                          { closeDeleteItemModal: this.toggleDelete },
                          this.props.note
                        )
                      )
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        Bt = Object(b.b)()(xt),
        qt = Object(b.b)(function(e) {
          return { notes: e.contactDetails.notes };
        })(function(e) {
          return r.a.createElement(
            "div",
            null,
            e.notes.length > 0
              ? e.notes.map(function(e) {
                  return r.a.createElement(Bt, { key: e.id, note: e });
                })
              : r.a.createElement("div", null, "Geen items bekend.")
          );
        });
      function Gt(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var zt = (function(e) {
          d()(a, e);
          var t = Gt(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "handleInputChange", function(e) {
                n.setState({ note: e.target.value });
              }),
              v()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state;
                It.a.newNote(t).then(function(e) {
                  n.props.newNote(e), n.props.toggleShowNew();
                });
              }),
              (n.state = { contactId: n.props.id, note: "" }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.note;
                  return r.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    r.a.createElement(
                      w.a,
                      { className: "panel-grey" },
                      r.a.createElement(
                        D.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(
                            "div",
                            { className: "col-sm-12" },
                            r.a.createElement("textarea", {
                              name: e,
                              value: e,
                              onChange: this.handleInputChange,
                              className: "form-control input-sm"
                            })
                          )
                        ),
                        r.a.createElement(
                          "div",
                          {
                            className: "pull-right btn-group margin-10-top",
                            role: "group"
                          },
                          r.a.createElement(q.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          r.a.createElement(q.a, {
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
        })(n.Component),
        Ft = Object(b.b)(
          function(e) {
            return { id: e.contactDetails.id };
          },
          function(e) {
            return {
              newNote: function(t) {
                e(Object(N.l)(t));
              }
            };
          }
        )(zt);
      function _t(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var Vt = (function(e) {
        d()(a, e);
        var t = _t(a);
        function a(e) {
          var n;
          return (
            c()(this, a),
            (n = t.call(this, e)),
            v()(u()(n), "toggleShowNew", function() {
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
                return r.a.createElement(
                  w.a,
                  null,
                  r.a.createElement(
                    xe.a,
                    null,
                    r.a.createElement(
                      "span",
                      { className: "h5 text-bold" },
                      "Parkeerplaats"
                    ),
                    r.a.createElement(
                      "a",
                      {
                        role: "button",
                        className: "pull-right",
                        onClick: this.toggleShowNew
                      },
                      r.a.createElement("span", {
                        className: "glyphicon glyphicon-plus"
                      })
                    )
                  ),
                  r.a.createElement(
                    D.a,
                    null,
                    r.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      r.a.createElement(qt, null)
                    ),
                    r.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      this.state.showNew &&
                        r.a.createElement(Ft, {
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
      })(n.Component);
      L.a.locale("nl");
      var Ut = Object(b.b)(function(e) {
          return { contact: e.contactDetails };
        })(function(e) {
          var t = e.contact,
            a = t.owner,
            n = void 0 === a ? {} : a,
            o = t.status,
            c = void 0 === o ? {} : o,
            i = t.updatedBy,
            l = void 0 === i ? {} : i,
            s = t.createdBy,
            u = void 0 === s ? {} : s,
            m = t.createdAt,
            d = void 0 === m ? {} : m,
            p = t.updatedAt,
            h = void 0 === p ? {} : p;
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              r.a.createElement(V.a, {
                label: "Eigenaar",
                value: n ? n.fullName : "Onbekend",
                link: n ? "gebruiker/" + n.id : ""
              })
            ),
            r.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              r.a.createElement(V.a, {
                label: "Gemaakt door",
                value:
                  !c || ("portal" != c.id && "webform" != c.id)
                    ? u
                      ? u.fullName
                      : "Onbekend"
                    : c.name,
                link:
                  (!c || ("portal" != c.id && "webform" != c.id)) && u
                    ? "gebruiker/" + u.id
                    : ""
              }),
              r.a.createElement(V.a, {
                label: "Laatste update door",
                value: l ? l.fullName : "Onbekend",
                link: l ? "gebruiker/" + l.id : ""
              })
            ),
            r.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              r.a.createElement(V.a, {
                label: "Gemaakt op",
                value: d ? L()(d).format("L") : "Onbekend"
              }),
              r.a.createElement(V.a, {
                label: "Laatste update op",
                value: h ? L()(h).format("L") : "Onbekend"
              })
            )
          );
        }),
        Yt = a(407);
      function Wt(e, t) {
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
      function Jt(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Wt(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Wt(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Kt(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var Ht = (function(e) {
          d()(a, e);
          var t = Kt(a);
          function a(e) {
            var n;
            c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Jt(
                    Jt({}, n.state),
                    {},
                    { contact: Jt(Jt({}, n.state.contact), {}, v()({}, r, a)) }
                  )
                );
              }),
              v()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.contact,
                  a = {},
                  r = !1;
                R.a.isEmpty("" + t.ownedById) && ((a.ownedBy = !0), (r = !0)),
                  n.setState(Jt(Jt({}, n.state), {}, { errors: a })),
                  !r &&
                    Yt.a
                      .updateContactOwner(t.id, t.ownedById)
                      .then(function(e) {
                        n.props.fetchContactDetails(t.id),
                          n.props.switchToView();
                      });
              });
            var r = e.contact,
              o = r.id,
              i = r.status,
              l = void 0 === i ? {} : i,
              s = r.createdBy,
              m = void 0 === s ? {} : s,
              d = r.updatedBy,
              p = void 0 === d ? {} : d,
              h = r.createdAt,
              f = void 0 === h ? {} : h,
              g = r.updatedAt,
              E = void 0 === g ? {} : g,
              b = r.owner,
              y = void 0 === b ? {} : b;
            return (
              (n.state = {
                contact: {
                  id: o,
                  status: l || "",
                  updatedBy: p ? p.fullName : "",
                  createdBy: m ? m.fullName : "",
                  ownedById: y ? y.id : "",
                  createdAt: f || "",
                  updatedAt: E || ""
                },
                errors: { ownedBy: !1 }
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.contact,
                    t = e.status,
                    a = e.createdBy,
                    n = e.updatedBy,
                    o = e.ownedById,
                    c = e.createdAt,
                    i = e.updatedAt;
                  return r.a.createElement(
                    "form",
                    {
                      className: "form-horizontal col-md-12",
                      onSubmit: this.handleSubmit
                    },
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(Z.a, {
                        label: "Eigenaar",
                        size: "col-sm-6",
                        name: "ownedById",
                        options: this.props.users,
                        value: o,
                        optionName: "fullName",
                        onChangeAction: this.handleInputChange,
                        error: this.state.errors.ownedBy
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(x.a, {
                        label: "Gemaakt door",
                        name: "createdBy",
                        value:
                          "portal" == t.id || "webform" == t.id ? t.name : a,
                        readOnly: !0
                      }),
                      r.a.createElement(x.a, {
                        label: "Laatste update door",
                        name: "updatedBy",
                        value: n,
                        readOnly: !0
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(B.a, {
                        label: "Gemaakt op",
                        size: "col-sm-6",
                        name: "createdAt",
                        value: c ? L()(c).format("LL") : "Onbekend",
                        readOnly: !0
                      }),
                      r.a.createElement(B.a, {
                        label: "Laatste update op",
                        size: "col-sm-6",
                        name: "updatedAt",
                        value: i ? L()(i).format("LL") : "Onbekend",
                        readOnly: !0
                      })
                    ),
                    r.a.createElement(
                      G.a,
                      null,
                      r.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        r.a.createElement(q.a, {
                          buttonClassName: "btn-default",
                          buttonText: "Annuleren",
                          onClickAction: this.props.switchToView
                        }),
                        r.a.createElement(q.a, {
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
        })(n.Component),
        Xt = Object(b.b)(
          function(e) {
            return { contact: e.contactDetails, users: e.systemData.users };
          },
          function(e) {
            return {
              fetchContactDetails: function(t) {
                e(Object(N.h)(t));
              }
            };
          }
        )(Ht);
      function Zt(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var Qt = (function(e) {
          d()(a, e);
          var t = Zt(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              v()(u()(n), "switchToView", function() {
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
                  var e = this,
                    t = this.props.type,
                    a = void 0 === t ? {} : t;
                  return r.a.createElement(
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
                    r.a.createElement(
                      D.a,
                      null,
                      (this.state.showEdit &&
                        "person" === a.id &&
                        this.props.permissions.updatePerson) ||
                        (this.state.showEdit &&
                          "organisation" === a.id &&
                          this.props.permissions.updateOrganisation)
                        ? r.a.createElement(Xt, {
                            switchToView: this.switchToView
                          })
                        : r.a.createElement(Ut, {
                            switchToEdit: this.switchToEdit
                          })
                    )
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        $t = Object(b.b)(function(e) {
          return {
            permissions: e.meDetails.permissions,
            type: e.contactDetails.type
          };
        })(Qt),
        ea = function(e) {
          var t = e.quotation,
            a = t.opportunity,
            n = t.dateRecorded,
            o = t.dateReleased;
          return r.a.createElement(
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
            r.a.createElement(
              "div",
              {
                onClick: function() {
                  return y.f.push("/kans/".concat(a.id));
                }
              },
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                a ? a.number : ""
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                a ? a.measureCategory.name : ""
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                a ? a.status.name : ""
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                n ? L()(n).format("L") : ""
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                o ? L()(o).format("L") : ""
              )
            )
          );
        };
      function ta(e, t) {
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
      function aa(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ta(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : ta(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function na(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var ra = (function(e) {
          d()(a, e);
          var t = na(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              v()(u()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              (n.state = {
                highlightLine: "",
                showEdit: !1,
                quotation: aa({}, e.quotation)
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    "div",
                    null,
                    r.a.createElement(ea, {
                      highlightLine: this.state.highlightLine,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      quotation: this.state.quotation
                    })
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        oa = Object(b.b)(function(e) {
          return {
            quotationRequests: e.contactDetails.organisation.quotationRequests
          };
        })(function(e) {
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(
              "div",
              { className: "row border header" },
              r.a.createElement("div", { className: "col-sm-2" }, "Kansnummer"),
              r.a.createElement("div", { className: "col-sm-2" }, "Kans"),
              r.a.createElement("div", { className: "col-sm-2" }, "Status"),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Datum opname"
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Offerte uitgebracht"
              )
            ),
            e.quotationRequests.length > 0
              ? e.quotationRequests.map(function(e) {
                  return r.a.createElement(ra, { key: e.id, quotation: e });
                })
              : r.a.createElement("div", null, "Geen offertes bekend.")
          );
        });
      function ca(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var ia = (function(e) {
          d()(a, e);
          var t = ca(a);
          function a(e) {
            return c()(this, a), t.call(this, e);
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    w.a,
                    null,
                    r.a.createElement(
                      xe.a,
                      null,
                      r.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Offertes"
                      )
                    ),
                    r.a.createElement(
                      D.a,
                      null,
                      r.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        r.a.createElement(oa, null)
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        la = function(e) {
          var t = e.campaign,
            a = t.id,
            n = t.number,
            o = t.name,
            c = t.startDate,
            i = t.endDate,
            l = t.taskCount;
          return r.a.createElement(
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
            r.a.createElement(
              "div",
              {
                onClick: function() {
                  return y.f.push("/campagne/".concat(a));
                }
              },
              r.a.createElement("div", { className: "col-sm-2" }, n),
              r.a.createElement("div", { className: "col-sm-3" }, o),
              r.a.createElement(
                "div",
                { className: "col-sm-3" },
                c ? L()(c).format("L") : ""
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-3" },
                i ? L()(i).format("L") : ""
              ),
              r.a.createElement("div", { className: "col-sm-1" }, l)
            )
          );
        };
      function sa(e, t) {
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
      function ua(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? sa(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : sa(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function ma(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var da = (function(e) {
          d()(a, e);
          var t = ma(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              v()(u()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              (n.state = {
                highlightLine: "",
                showEdit: !1,
                campaign: ua({}, e.campaign)
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    "div",
                    null,
                    r.a.createElement(la, {
                      highlightLine: this.state.highlightLine,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      campaign: this.state.campaign
                    })
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        pa = Object(b.b)(function(e) {
          return { campaigns: e.contactDetails.organisation.campaigns };
        })(function(e) {
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(
              "div",
              { className: "row border header" },
              r.a.createElement("div", { className: "col-sm-2" }, "Nummer"),
              r.a.createElement("div", { className: "col-sm-3" }, "Naam"),
              r.a.createElement("div", { className: "col-sm-3" }, "Startdatum"),
              r.a.createElement("div", { className: "col-sm-3" }, "Einddatum"),
              r.a.createElement("div", { className: "col-sm-1" }, "Taken")
            ),
            e.campaigns.length > 0
              ? e.campaigns.map(function(e) {
                  return r.a.createElement(da, { key: e.id, campaign: e });
                })
              : r.a.createElement("div", null, "Geen campagnes bekend.")
          );
        });
      function ha(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var fa = (function(e) {
          d()(a, e);
          var t = ha(a);
          function a(e) {
            return c()(this, a), t.call(this, e);
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    w.a,
                    null,
                    r.a.createElement(
                      xe.a,
                      null,
                      r.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Campagnes"
                      )
                    ),
                    r.a.createElement(
                      D.a,
                      null,
                      r.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        r.a.createElement(pa, null)
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        ga = a(2),
        Ea = a.n(ga),
        va = "".concat(URL_API, "/api/occupation"),
        ba = function(e) {
          var t = "".concat(va),
            a = "Bearer " + localStorage.getItem("access_token");
          return (
            (Ea.a.defaults.headers.common.Authorization = a),
            Ea.a
              .post(t, e)
              .then(function(e) {
                return e.data.data;
              })
              .catch(function(e) {
                return e.response;
              })
          );
        },
        ya = function(e) {
          var t = "".concat(va, "/").concat(e.id, "/update"),
            a = "Bearer " + localStorage.getItem("access_token");
          return (
            (Ea.a.defaults.headers.common.Authorization = a),
            Ea.a
              .post(t, e)
              .then(function(e) {
                return e.data.data;
              })
              .catch(function(e) {
                return e.response;
              })
          );
        },
        Na = function(e) {
          var t = "".concat(va, "/delete"),
            a = "Bearer " + localStorage.getItem("access_token");
          return (
            (Ea.a.defaults.headers.common.Authorization = a),
            Ea.a
              .post(t, e)
              .then(function(e) {
                return e.data.data;
              })
              .catch(function(e) {
                return e.response;
              })
          );
        };
      L.a.locale("nl");
      var wa = function(e) {
          var t = e.occupation,
            a = t.primaryContact,
            n = t.contact,
            o = t.occupation,
            c = t.startDate,
            i = t.endDate,
            l = t.primary;
          return r.a.createElement(
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
            r.a.createElement(
              "div",
              { onClick: e.openEdit },
              r.a.createElement(
                "div",
                { className: "col-sm-3" },
                e.primaryOccupation
                  ? r.a.createElement(
                      y.b,
                      {
                        to: "/contact/".concat(n.id),
                        className: "link-underline"
                      },
                      n.fullName
                    )
                  : r.a.createElement(
                      y.b,
                      {
                        to: "/contact/".concat(a.id),
                        className: "link-underline"
                      },
                      a.fullName
                    )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                e.primaryOccupation
                  ? o.primaryOccupation
                  : o.secondaryOccupation
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                c ? L()(c).format("DD-MM-Y") : ""
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                i ? L()(i).format("DD-MM-Y") : ""
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                l
                  ? r.a.createElement(
                      "span",
                      { className: "pull-right" },
                      "Primair"
                    )
                  : ""
              )
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-1" },
              e.showActionButtons
                ? r.a.createElement(
                    "a",
                    { role: "button", onClick: e.openEdit },
                    r.a.createElement("span", {
                      className: "glyphicon glyphicon-pencil mybtn-success"
                    }),
                    " "
                  )
                : "",
              e.showActionButtons
                ? r.a.createElement(
                    "a",
                    { role: "button", onClick: e.toggleDelete },
                    r.a.createElement("span", {
                      className: "glyphicon glyphicon-trash mybtn-danger"
                    }),
                    " "
                  )
                : ""
            )
          );
        },
        Da = a(709);
      L.a.locale("nl");
      var Oa = Object(b.b)(function(e) {
          return { occupations: e.systemData.occupations };
        }, null)(function(e) {
          var t = e.occupation,
            a = t.primaryContactId,
            n = t.contactId,
            o = t.occupationId,
            c = t.startDate,
            i = t.endDate,
            l = t.primary;
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(
              "form",
              { className: "form-horizontal", onSubmit: e.handleSubmit },
              r.a.createElement(
                w.a,
                { className: "panel-grey" },
                r.a.createElement(
                  D.a,
                  null,
                  r.a.createElement(
                    "div",
                    { className: "row" },
                    e.primaryOccupation
                      ? r.a.createElement(Da.a, {
                          label: "Verbonden met",
                          name: "contactId",
                          options: e.contacts,
                          value: n,
                          onChangeAction: e.handleReactSelectChange,
                          optionName: "fullName",
                          multi: !1,
                          isLoading: e.peekLoading.contacts
                        })
                      : r.a.createElement(Da.a, {
                          label: "Verbonden met",
                          name: "primaryContactId",
                          options: e.contacts,
                          value: a,
                          onChangeAction: e.handleReactSelectChange,
                          optionName: "fullName",
                          multi: !1,
                          isLoading: e.peekLoading.contacts
                        }),
                    r.a.createElement(Z.a, {
                      label: "Rol",
                      size: "col-sm-6",
                      name: "occupationId",
                      optionName: "primaryOccupation",
                      options: e.occupations,
                      value: o,
                      onChangeAction: e.handleInputChange,
                      required: "required",
                      error: e.occupationIdError
                    })
                  ),
                  r.a.createElement(
                    "div",
                    { className: "row" },
                    r.a.createElement(B.a, {
                      label: "Begindatum",
                      size: "col-sm-6",
                      name: "startDate",
                      value: c,
                      onChangeAction: e.handleStartDate
                    }),
                    r.a.createElement(B.a, {
                      label: "Einddatum",
                      size: "col-sm-6",
                      name: "endDate",
                      value: i,
                      onChangeAction: e.handleEndDate
                    })
                  ),
                  r.a.createElement(
                    "div",
                    { className: "row" },
                    r.a.createElement(F.a, {
                      label: "Primair",
                      name: "primary",
                      value: l,
                      onChangeAction: e.handleInputChange
                    })
                  ),
                  r.a.createElement(
                    "div",
                    { className: "pull-right btn-group", role: "group" },
                    r.a.createElement(q.a, {
                      buttonClassName: "btn-default",
                      buttonText: "Annuleren",
                      onClickAction: e.cancelEdit
                    }),
                    r.a.createElement(q.a, {
                      buttonText: "Opslaan",
                      onClickAction: e.handleSubmit,
                      type: "submit",
                      value: "Submit"
                    })
                  )
                )
              )
            )
          );
        }),
        Ca = function(e) {
          return r.a.createElement(
            C.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return (
                  e.deleteOccupation(e.occupation),
                  void e.closeDeleteItemModal()
                );
              },
              title: "Verwijderen"
            },
            e.primaryOccupation
              ? r.a.createElement(
                  "p",
                  null,
                  "Verwijder verbinding:",
                  " ",
                  r.a.createElement(
                    "strong",
                    null,
                    " ",
                    ""
                      .concat(e.occupation.contact.fullName, " met rol: ")
                      .concat(e.occupation.occupation.secondaryOccupation),
                    " "
                  )
                )
              : r.a.createElement(
                  "p",
                  null,
                  "Verwijder verbinding:",
                  " ",
                  r.a.createElement(
                    "strong",
                    null,
                    " ",
                    ""
                      .concat(
                        e.occupation.primaryContact.fullName,
                        " met rol: "
                      )
                      .concat(e.occupation.occupation.primaryOccupation),
                    " "
                  )
                )
          );
        };
      function Sa(e, t) {
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
      function ka(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Sa(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Sa(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Aa(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      L.a.locale("nl");
      var Ia = (function(e) {
          d()(a, e);
          var t = Aa(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              v()(u()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              v()(u()(n), "openEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              v()(u()(n), "closeEdit", function() {
                n.setState({ showEdit: !1 });
              }),
              v()(u()(n), "cancelEdit", function() {
                n.setState(
                  ka(
                    ka({}, n.state),
                    {},
                    {
                      occupation: ka(
                        ka({}, n.props.occupation),
                        {},
                        {
                          primaryContactId:
                            n.props.occupation.primaryContact.id,
                          startDate: n.props.occupation.startDate
                            ? n.props.occupation.startDate
                            : "",
                          endDate: n.props.occupation.endDate
                            ? n.props.occupation.endDate
                            : "",
                          contactId: n.props.occupation.contact
                            ? n.props.occupation.contact.id
                            : "",
                          occupationId: n.props.occupation.occupation
                            ? n.props.occupation.occupation.id
                            : ""
                        }
                      )
                    }
                  )
                ),
                  n.closeEdit();
              }),
              v()(u()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              v()(u()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  ka(
                    ka({}, n.state),
                    {},
                    {
                      occupation: ka(
                        ka({}, n.state.occupation),
                        {},
                        v()({}, r, a)
                      )
                    }
                  )
                );
              }),
              v()(u()(n), "handleStartDate", function(e) {
                var t = e ? L()(e).format("Y-MM-DD") : "";
                n.setState(
                  ka(
                    ka({}, n.state),
                    {},
                    {
                      occupation: ka(
                        ka({}, n.state.occupation),
                        {},
                        { startDate: t }
                      )
                    }
                  )
                );
              }),
              v()(u()(n), "handleEndDate", function(e) {
                var t = e ? L()(e).format("Y-MM-DD") : "";
                n.setState(
                  ka(
                    ka({}, n.state),
                    {},
                    {
                      occupation: ka(
                        ka({}, n.state.occupation),
                        {},
                        { endDate: t }
                      )
                    }
                  )
                );
              }),
              v()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.occupation,
                  a = {},
                  r = !1;
                R.a.isEmpty(t.primaryContactId + "") &&
                  ((a.primaryContactIdError = !0), (r = !0)),
                  R.a.isEmpty(t.occupationId + "") &&
                    ((a.occupationIdError = !0), (r = !0)),
                  n.setState(ka(ka({}, n.state), {}, { errors: a })),
                  !r &&
                    ya(t).then(function(e) {
                      n.props.fetchContactDetails(n.props.id), n.closeEdit();
                    });
              }),
              v()(u()(n), "deleteOccupation", function(e) {
                Na(e).then(function(e) {
                  n.props.fetchContactDetails(n.props.id);
                });
              }),
              (n.state = {
                showActionButtons: !1,
                highlightLine: "",
                showEdit: !1,
                showDelete: !1,
                occupation: ka(
                  ka({}, e.occupation),
                  {},
                  {
                    primaryContactId: e.occupation.primaryContact.id,
                    startDate: e.occupation.startDate
                      ? e.occupation.startDate
                      : "",
                    endDate: e.occupation.endDate ? e.occupation.endDate : "",
                    contactId: e.occupation.contact.id,
                    occupationId: e.occupation.occupation.id
                  }
                ),
                errors: { primaryContactIdError: !1, occupationIdError: !1 }
              }),
              (n.handleReactSelectChange = n.handleReactSelectChange.bind(
                u()(n)
              )),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  Object(j.isEqual)(this.state.occupation, e.occupation) ||
                    this.setState(
                      ka(
                        ka({}, this.state),
                        {},
                        {
                          occupation: ka(
                            ka({}, e.occupation),
                            {},
                            {
                              primaryContactId: e.occupation.primaryContact.id,
                              startDate: e.occupation.startDate
                                ? e.occupation.startDate
                                : "",
                              endDate: e.occupation.endDate
                                ? e.occupation.endDate
                                : "",
                              contactId: e.occupation.contact.id,
                              occupationId: e.occupation.occupation.id
                            }
                          )
                        }
                      )
                    );
                }
              },
              {
                key: "handleReactSelectChange",
                value: function(e, t) {
                  this.setState(
                    ka(
                      ka({}, this.state),
                      {},
                      {
                        occupation: ka(
                          ka({}, this.state.occupation),
                          {},
                          v()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    "div",
                    null,
                    r.a.createElement(wa, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      openEdit: this.openEdit,
                      toggleDelete: this.toggleDelete,
                      occupation: this.state.occupation,
                      primaryOccupation: this.props.primaryOccupation
                    }),
                    this.state.showEdit &&
                      r.a.createElement(Oa, {
                        occupation: this.state.occupation,
                        handleInputChange: this.handleInputChange,
                        handleStartDate: this.handleStartDate,
                        handleEndDate: this.handleEndDate,
                        handleSubmit: this.handleSubmit,
                        primaryContactIdError: this.state.errors
                          .primaryContactIdError,
                        occupationIdError: this.state.errors.occupationIdError,
                        cancelEdit: this.cancelEdit,
                        contacts: this.props.contacts,
                        peekLoading: this.props.peekLoading,
                        handleReactSelectChange: this.handleReactSelectChange,
                        primaryOccupation: this.props.primaryOccupation
                      }),
                    this.state.showDelete &&
                      r.a.createElement(Ca, {
                        closeDeleteItemModal: this.toggleDelete,
                        deleteOccupation: this.deleteOccupation,
                        occupation: this.state.occupation,
                        primaryOccupation: this.props.primaryOccupation
                      })
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        ja = Object(b.b)(
          function(e) {
            return { id: e.contactDetails.id };
          },
          function(e) {
            return {
              fetchContactDetails: function(t) {
                e(Object(N.h)(t));
              }
            };
          }
        )(Ia),
        Pa = Object(b.b)(function(e) {
          return {
            primaryOccupations: e.contactDetails.primaryOccupations,
            occupations: e.contactDetails.occupations
          };
        })(function(e) {
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(
              "div",
              { className: "row border header" },
              r.a.createElement(
                "div",
                { className: "col-sm-3" },
                "Verbonden met"
              ),
              r.a.createElement("div", { className: "col-sm-2" }, "Verbinding"),
              r.a.createElement("div", { className: "col-sm-2" }, "Begindatum"),
              r.a.createElement("div", { className: "col-sm-2" }, "Einddatum"),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                r.a.createElement(
                  "span",
                  { className: "pull-right" },
                  "Primair"
                )
              ),
              r.a.createElement("div", { className: "col-sm-1" })
            ),
            e.primaryOccupations.length > 0 &&
              e.primaryOccupations.map(function(t) {
                return r.a.createElement(ja, {
                  key: t.id,
                  occupation: t,
                  primaryOccupation: !0,
                  contacts: e.contacts,
                  peekLoading: e.peekLoading
                });
              }),
            e.occupations.length > 0 &&
              e.occupations.map(function(t) {
                return r.a.createElement(ja, {
                  key: t.id,
                  occupation: t,
                  primaryOccupation: !1,
                  contacts: e.contacts,
                  peekLoading: e.peekLoading
                });
              }),
            0 === e.primaryOccupations.length &&
              0 === e.occupations.length &&
              r.a.createElement("div", null, "Geen verbindingen bekend.")
          );
        }),
        La = a(102);
      function Ma(e, t) {
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
      function Ra(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Ma(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Ma(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Ta(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var xa = (function(e) {
          d()(a, e);
          var t = Ta(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Ra(
                    Ra({}, n.state),
                    {},
                    {
                      occupation: Ra(
                        Ra({}, n.state.occupation),
                        {},
                        v()({}, r, a)
                      )
                    }
                  )
                );
              }),
              v()(u()(n), "handleStartDate", function(e) {
                var t = e ? L()(e).format("Y-MM-DD") : "";
                n.setState(
                  Ra(
                    Ra({}, n.state),
                    {},
                    {
                      occupation: Ra(
                        Ra({}, n.state.occupation),
                        {},
                        { startDate: t }
                      )
                    }
                  )
                );
              }),
              v()(u()(n), "handleEndDate", function(e) {
                var t = e ? L()(e).format("Y-MM-DD") : "";
                n.setState(
                  Ra(
                    Ra({}, n.state),
                    {},
                    {
                      occupation: Ra(
                        Ra({}, n.state.occupation),
                        {},
                        { endDate: t }
                      )
                    }
                  )
                );
              }),
              v()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.occupation,
                  a = {},
                  r = !1;
                R.a.isEmpty(t.contactId + "") && ((a.contactId = !0), (r = !0)),
                  R.a.isEmpty(t.occupationId + "") &&
                    ((a.occupationId = !0), (r = !0)),
                  t.contactId === t.primaryContactId &&
                    ((a.contactId = !0), (r = !0)),
                  n.setState(Ra(Ra({}, n.state), {}, { errors: a })),
                  !r &&
                    ba(t).then(function(e) {
                      n.props.fetchContactDetails(n.props.id),
                        n.props.toggleShowNew();
                    });
              }),
              (n.state = {
                contacts: [],
                occupation: {
                  primaryContactId: n.props.id,
                  contactId: "",
                  occupationId: "",
                  startDate: "",
                  endDate: "",
                  primary: !1
                },
                errors: { contactId: !1, occupationId: !1 },
                peekLoading: { contacts: !0 }
              }),
              (n.handleReactSelectChange = n.handleReactSelectChange.bind(
                u()(n)
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
                  La.a.getContactsPeek().then(function(t) {
                    e.setState({
                      contacts: t,
                      peekLoading: Ra(
                        Ra({}, e.state.peekLoading),
                        {},
                        { contacts: !1 }
                      )
                    });
                  });
                }
              },
              {
                key: "handleReactSelectChange",
                value: function(e, t) {
                  this.setState(
                    Ra(
                      Ra({}, this.state),
                      {},
                      {
                        occupation: Ra(
                          Ra({}, this.state.occupation),
                          {},
                          v()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.occupation,
                    t = e.contactId,
                    a = e.occupationId,
                    n = e.startDate,
                    o = e.endDate,
                    c = e.primary;
                  return r.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    r.a.createElement(
                      w.a,
                      { className: "panel-grey" },
                      r.a.createElement(
                        D.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(Da.a, {
                            label: "Verbonden met",
                            name: "contactId",
                            options: this.state.contacts,
                            value: t,
                            onChangeAction: this.handleReactSelectChange,
                            optionName: "fullName",
                            multi: !1,
                            isLoading: this.state.peekLoading.contacts,
                            error: this.state.errors.contactId
                          }),
                          r.a.createElement(Z.a, {
                            label: "Rol",
                            size: "col-sm-6",
                            name: "occupationId",
                            optionName: "primaryOccupation",
                            options: this.props.occupations,
                            value: a,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.occupationId
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(B.a, {
                            label: "Begindatum",
                            size: "col-sm-6",
                            name: "startDate",
                            value: n,
                            onChangeAction: this.handleStartDate
                          }),
                          r.a.createElement(B.a, {
                            label: "Einddatum",
                            size: "col-sm-6",
                            name: "endDate",
                            value: o,
                            onChangeAction: this.handleEndDate
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(F.a, {
                            label: "Primair",
                            name: "primary",
                            value: c,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          r.a.createElement(q.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          r.a.createElement(q.a, {
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
        })(n.Component),
        Ba = Object(b.b)(
          function(e) {
            return {
              occupations: e.systemData.occupations,
              id: e.contactDetails.id
            };
          },
          function(e) {
            return {
              fetchContactDetails: function(t) {
                e(Object(N.h)(t));
              }
            };
          }
        )(xa);
      function qa(e, t) {
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
      function Ga(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? qa(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : qa(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function za(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var Fa = (function(e) {
          d()(a, e);
          var t = za(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "toggleShowNew", function() {
                n.setState({ showNew: !n.state.showNew });
              }),
              (n.state = {
                showNew: !1,
                contacts: [],
                peekLoading: { contacts: !0 }
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  La.a.getContactsPeek().then(function(t) {
                    e.setState({
                      contacts: t,
                      peekLoading: Ga(
                        Ga({}, e.state.peekLoading),
                        {},
                        { contacts: !1 }
                      )
                    });
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    w.a,
                    null,
                    r.a.createElement(
                      xe.a,
                      null,
                      r.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Verbindingen"
                      ),
                      r.a.createElement(
                        "a",
                        {
                          role: "button",
                          className: "pull-right",
                          onClick: this.toggleShowNew
                        },
                        r.a.createElement("span", {
                          className: "glyphicon glyphicon-plus"
                        })
                      )
                    ),
                    r.a.createElement(
                      D.a,
                      null,
                      r.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        r.a.createElement(Pa, {
                          contacts: this.state.contacts,
                          peekLoading: this.state.peekLoading
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          r.a.createElement(Ba, {
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
        })(n.Component),
        _a = a(221);
      L.a.locale("nl");
      var Va = Object(b.b)(function(e) {
        return { permissions: e.meDetails.permissions };
      })(function(e) {
        var t = e.contactEnergySupplier,
          a = t.energySupplier,
          n = t.contactEnergySupplyType,
          o = t.memberSince,
          c = t.contactEnergySupplyStatus,
          i = t.switchDate,
          l = t.esNumber,
          s = t.isCurrentSupplier;
        return r.a.createElement(
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
          r.a.createElement(
            "div",
            { onClick: e.openEdit },
            r.a.createElement("div", { className: "col-sm-2" }, a && a.name),
            r.a.createElement(
              "div",
              { className: "col-sm-1" },
              n ? n.name : ""
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-2" },
              o ? L()(o).format("L") : ""
            ),
            r.a.createElement("div", { className: "col-sm-2" }, c && c.name),
            r.a.createElement(
              "div",
              { className: "col-sm-2" },
              i ? L()(i).format("L") : ""
            ),
            r.a.createElement("div", { className: "col-sm-1" }, l && l),
            r.a.createElement("div", { className: "col-sm-1" }, s ? "Ja" : "")
          ),
          r.a.createElement(
            "div",
            { className: "col-sm-1" },
            e.showActionButtons &&
              (e.permissions.updatePerson || e.permissions.updateOrganisation)
              ? r.a.createElement(
                  "a",
                  { role: "button", onClick: e.openEdit },
                  r.a.createElement("span", {
                    className: "glyphicon glyphicon-pencil mybtn-success"
                  }),
                  " "
                )
              : "",
            e.showActionButtons &&
              (e.permissions.updatePerson || e.permissions.updateOrganisation)
              ? r.a.createElement(
                  "a",
                  { role: "button", onClick: e.toggleDelete },
                  r.a.createElement("span", {
                    className: "glyphicon glyphicon-trash mybtn-danger"
                  }),
                  " "
                )
              : ""
          )
        );
      });
      L.a.locale("nl");
      var Ua = Object(b.b)(function(e) {
          return {
            energySuppliers: e.systemData.energySuppliers,
            contactEnergySupplierTypes: e.systemData.contactEnergySupplierTypes,
            contactEnergySupplierStatus:
              e.systemData.contactEnergySupplierStatus
          };
        }, null)(function(e) {
          var t = e.contactEnergySupplier,
            a = t.energySupplierId,
            n = t.contactEnergySupplyTypeId,
            o = t.memberSince,
            c = t.eanElectricity,
            i = t.eanGas,
            l = t.contactEnergySupplyStatusId,
            s = t.switchDate,
            u = t.esNumber,
            m = t.isCurrentSupplier,
            d = t.createdAt,
            p = t.createdBy;
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(
              "form",
              { className: "form-horizontal", onSubmit: e.handleSubmit },
              r.a.createElement(
                w.a,
                { className: "panel-grey" },
                r.a.createElement(
                  D.a,
                  null,
                  r.a.createElement(
                    "div",
                    { className: "row" },
                    r.a.createElement(Z.a, {
                      label: "Energieleverancier",
                      id: "energySupplierId",
                      name: "energySupplierId",
                      options: e.energySuppliers,
                      value: a,
                      readOnly: !0
                    }),
                    r.a.createElement(Z.a, {
                      label: "Type",
                      id: "contactEnergySupplyTypeId",
                      name: "contactEnergySupplyTypeId",
                      options: e.contactEnergySupplierTypes,
                      value: n,
                      readOnly: !0
                    })
                  ),
                  r.a.createElement(
                    "div",
                    { className: "row" },
                    r.a.createElement(B.a, {
                      label: "Klant sinds",
                      name: "memberSince",
                      value: o || "",
                      onChangeAction: e.handleInputChangeDate
                    }),
                    r.a.createElement(x.a, {
                      label: "EAN electriciteit",
                      id: "eanElectricity",
                      name: "eanElectricity",
                      value: c,
                      onChangeAction: e.handleInputChange
                    })
                  ),
                  r.a.createElement(
                    "div",
                    { className: "row" },
                    r.a.createElement(x.a, {
                      label: "EAN gas",
                      id: "eanGas",
                      name: "eanGas",
                      value: i,
                      onChangeAction: e.handleInputChange
                    }),
                    r.a.createElement(Z.a, {
                      label: "Overstap status",
                      id: "contactEnergySupplyStatusId",
                      name: "contactEnergySupplyStatusId",
                      options: e.contactEnergySupplierStatus,
                      value: l,
                      onChangeAction: e.handleInputChange
                    })
                  ),
                  r.a.createElement(
                    "div",
                    { className: "row" },
                    r.a.createElement(B.a, {
                      label: "Mogelijke overstap datum",
                      name: "switchDate",
                      value: s || "",
                      onChangeAction: e.handleInputChangeDate
                    }),
                    r.a.createElement(x.a, {
                      label: "Klantnummer",
                      name: "esNumber",
                      value: u || "",
                      onChangeAction: e.handleInputChange
                    })
                  ),
                  r.a.createElement(
                    "div",
                    { className: "row" },
                    r.a.createElement(x.a, {
                      label: "Gemaakt op",
                      name: "createdAt",
                      value: d ? L()(d).format("L") : "",
                      readOnly: !0
                    }),
                    r.a.createElement(x.a, {
                      label: "Gemaakt door",
                      name: "createdBy",
                      value: p ? p.fullName : "",
                      readOnly: !0
                    })
                  ),
                  r.a.createElement(
                    "div",
                    { className: "row" },
                    r.a.createElement(F.a, {
                      label: "Is huidige leverancier",
                      name: "isCurrentSupplier",
                      value: m,
                      onChangeAction: e.handleInputChange
                    })
                  ),
                  r.a.createElement(
                    "div",
                    { className: "pull-right btn-group", role: "group" },
                    r.a.createElement(q.a, {
                      buttonClassName: "btn-default",
                      buttonText: "Annuleren",
                      onClickAction: e.cancelEdit
                    }),
                    r.a.createElement(q.a, {
                      buttonText: "Opslaan",
                      onClickAction: e.handleSubmit,
                      type: "submit",
                      value: "Submit"
                    })
                  )
                )
              )
            )
          );
        }),
        Ya = Object(b.b)(null, function(e) {
          return {
            deleteContactEnergySupplier: function(t) {
              e(Object(N.c)(t));
            }
          };
        })(function(e) {
          return r.a.createElement(
            C.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return (
                  e.deleteContactEnergySupplier(e.id),
                  void e.closeDeleteItemModal()
                );
              },
              title: "Verwijderen"
            },
            r.a.createElement(
              "p",
              null,
              "Verwijder energieleverancier: ",
              r.a.createElement(
                "strong",
                null,
                " ",
                "".concat(e.energySupplier.name),
                " "
              ),
              " bij contact",
              " ",
              r.a.createElement(
                "strong",
                null,
                " ",
                "".concat(e.contact.fullName),
                " "
              ),
              "?"
            )
          );
        });
      function Wa(e, t) {
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
      function Ja(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Wa(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Wa(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Ka(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var Ha = (function(e) {
          d()(a, e);
          var t = Ka(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              v()(u()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              v()(u()(n), "openEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              v()(u()(n), "closeEdit", function() {
                n.setState({ showEdit: !1 });
              }),
              v()(u()(n), "cancelEdit", function() {
                n.setState(
                  Ja(
                    Ja({}, n.state),
                    {},
                    {
                      contactEnergySupplier: Ja(
                        {},
                        n.props.contactEnergySupplier
                      )
                    }
                  )
                ),
                  n.closeEdit();
              }),
              v()(u()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              v()(u()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Ja(
                    Ja({}, n.state),
                    {},
                    {
                      contactEnergySupplier: Ja(
                        Ja({}, n.state.contactEnergySupplier),
                        {},
                        v()({}, r, a)
                      )
                    }
                  )
                );
              }),
              v()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.contactEnergySupplier;
                _a.a.updateContactEnergySupplier(t).then(function(e) {
                  n.props.updateContactEnergySupplier(e), n.closeEdit();
                });
              }),
              (n.state = {
                showActionButtons: !1,
                highlightLine: "",
                showEdit: !1,
                showDelete: !1,
                contactEnergySupplier: Ja({}, e.contactEnergySupplier)
              }),
              (n.handleInputChangeDate = n.handleInputChangeDate.bind(u()(n))),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  Object(j.isEqual)(
                    this.state.contactEnergySupplier,
                    e.contactEnergySupplier
                  ) ||
                    this.setState(
                      Ja(
                        Ja({}, this.state),
                        {},
                        {
                          contactEnergySupplier: Ja({}, e.contactEnergySupplier)
                        }
                      )
                    );
                }
              },
              {
                key: "handleInputChangeDate",
                value: function(e, t) {
                  this.setState(
                    Ja(
                      Ja({}, this.state),
                      {},
                      {
                        contactEnergySupplier: Ja(
                          Ja({}, this.state.contactEnergySupplier),
                          {},
                          v()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    "div",
                    null,
                    r.a.createElement(Va, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      openEdit: this.openEdit,
                      toggleDelete: this.toggleDelete,
                      contactEnergySupplier: this.state.contactEnergySupplier
                    }),
                    this.state.showEdit &&
                      (this.props.permissions.updatePerson ||
                        this.props.permissions.updateOrganisation) &&
                      r.a.createElement(Ua, {
                        contactEnergySupplier: this.state.contactEnergySupplier,
                        handleInputChange: this.handleInputChange,
                        handleInputChangeDate: this.handleInputChangeDate,
                        handleSubmit: this.handleSubmit,
                        cancelEdit: this.cancelEdit
                      }),
                    this.state.showDelete &&
                      r.a.createElement(
                        Ya,
                        ge()(
                          { closeDeleteItemModal: this.toggleDelete },
                          this.props.contactEnergySupplier
                        )
                      )
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        Xa = Object(b.b)(
          function(e) {
            return { permissions: e.meDetails.permissions };
          },
          function(e) {
            return {
              updateContactEnergySupplier: function(t) {
                e(Object(N.r)(t));
              }
            };
          }
        )(Ha),
        Za = Object(b.b)(function(e) {
          return {
            contactEnergySuppliers: e.contactDetails.contactEnergySuppliers
          };
        })(function(e) {
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(
              "div",
              { className: "row border header" },
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Energieleverancier"
              ),
              r.a.createElement("div", { className: "col-sm-1" }, "Type"),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Klant sinds"
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Overstap status"
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Mogelijke overstap datum"
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-1" },
                "Klantnummer"
              ),
              r.a.createElement("div", { className: "col-sm-1" }, "Huidige"),
              r.a.createElement("div", { className: "col-sm-1" })
            ),
            e.contactEnergySuppliers.length > 0
              ? e.contactEnergySuppliers.map(function(e) {
                  return r.a.createElement(Xa, {
                    key: e.id,
                    contactEnergySupplier: e
                  });
                })
              : r.a.createElement(
                  "div",
                  null,
                  "Geen energieleveranciers bekend."
                )
          );
        });
      function Qa(e, t) {
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
      function $a(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Qa(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Qa(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function en(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var tn = (function(e) {
          d()(a, e);
          var t = en(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  $a(
                    $a({}, n.state),
                    {},
                    {
                      contactEnergySupplier: $a(
                        $a({}, n.state.contactEnergySupplier),
                        {},
                        v()({}, r, a)
                      )
                    }
                  )
                );
              }),
              v()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.contactEnergySupplier,
                  a = {},
                  r = !1;
                R.a.isEmpty(t.energySupplierId) &&
                  ((a.energySupplierId = !0), (r = !0)),
                  R.a.isEmpty(t.contactEnergySupplyTypeId) &&
                    ((a.contactEnergySupplyTypeId = !0), (r = !0)),
                  n.setState($a($a({}, n.state), {}, { errors: a })),
                  !r &&
                    _a.a.newContactEnergySupplier(t).then(function(e) {
                      n.props.newContactEnergySupplier(e),
                        n.props.toggleShowNew();
                    });
              }),
              (n.state = {
                contactEnergySupplier: {
                  contactId: n.props.id,
                  energySupplierId: "",
                  contactEnergySupplyTypeId: "",
                  memberSince: "",
                  eanElectricity: "",
                  eanGas: "",
                  contactEnergySupplyStatusId: "",
                  switchDate: "",
                  esNumber: "",
                  isCurrentSupplier: !1
                },
                errors: { energySupplierId: !1, contactEnergySupplyTypeId: !1 }
              }),
              (n.handleInputChangeDate = n.handleInputChangeDate.bind(u()(n))),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "handleInputChangeDate",
                value: function(e, t) {
                  this.setState(
                    $a(
                      $a({}, this.state),
                      {},
                      {
                        contactEnergySupplier: $a(
                          $a({}, this.state.contactEnergySupplier),
                          {},
                          v()({}, t, e)
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.contactEnergySupplier,
                    t = e.energySupplierId,
                    a = e.contactEnergySupplyTypeId,
                    n = e.memberSince,
                    o = e.eanElectricity,
                    c = e.eanGas,
                    i = e.contactEnergySupplyStatusId,
                    l = e.switchDate,
                    s = e.esNumber,
                    u = e.isCurrentSupplier;
                  return r.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    r.a.createElement(
                      w.a,
                      { className: "panel-grey" },
                      r.a.createElement(
                        D.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(Z.a, {
                            label: "Energieleverancier",
                            id: "energySupplierId",
                            name: "energySupplierId",
                            options: this.props.energySuppliers,
                            value: t,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.energySupplierId
                          }),
                          r.a.createElement(Z.a, {
                            label: "Type",
                            id: "contactEnergySupplyTypeId",
                            name: "contactEnergySupplyTypeId",
                            options: this.props.contactEnergySupplierTypes,
                            value: a,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.contactEnergySupplyTypeId
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(B.a, {
                            label: "Klant sinds",
                            name: "memberSince",
                            value: n,
                            onChangeAction: this.handleInputChangeDate
                          }),
                          r.a.createElement(x.a, {
                            label: "EAN electriciteit",
                            id: "eanElectricity",
                            name: "eanElectricity",
                            value: o,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(x.a, {
                            label: "EAN gas",
                            id: "eanGas",
                            name: "eanGas",
                            value: c,
                            onChangeAction: this.handleInputChange
                          }),
                          r.a.createElement(Z.a, {
                            label: "Overstap status",
                            id: "contactEnergySupplyStatusId",
                            name: "contactEnergySupplyStatusId",
                            options: this.props.contactEnergySupplierStatus,
                            value: i,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(B.a, {
                            label: "Mogelijke overstap datum",
                            name: "switchDate",
                            value: l,
                            onChangeAction: this.handleInputChangeDate
                          }),
                          r.a.createElement(x.a, {
                            label: "Klantnummer",
                            id: "esNumber",
                            name: "esNumber",
                            value: s,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(F.a, {
                            label: "Is huidige leverancier",
                            name: "isCurrentSupplier",
                            value: u,
                            onChangeAction: this.handleInputChange
                          })
                        ),
                        r.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          r.a.createElement(q.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          r.a.createElement(q.a, {
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
        })(n.Component),
        an = Object(b.b)(
          function(e) {
            return {
              energySuppliers: e.systemData.energySuppliers,
              contactEnergySupplierStatus:
                e.systemData.contactEnergySupplierStatus,
              contactEnergySupplierTypes:
                e.systemData.contactEnergySupplierTypes,
              id: e.contactDetails.id
            };
          },
          function(e) {
            return {
              newContactEnergySupplier: function(t) {
                e(Object(N.j)(t));
              }
            };
          }
        )(tn);
      function nn(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var rn = (function(e) {
          d()(a, e);
          var t = nn(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "toggleShowNew", function() {
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
                  return r.a.createElement(
                    w.a,
                    null,
                    r.a.createElement(
                      xe.a,
                      null,
                      r.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Energieleveranciers"
                      ),
                      (this.props.permissions.updatePerson ||
                        this.props.permissions.updateOrganisation) &&
                        r.a.createElement(
                          "a",
                          {
                            role: "button",
                            className: "pull-right",
                            onClick: this.toggleShowNew
                          },
                          r.a.createElement("span", {
                            className: "glyphicon glyphicon-plus"
                          })
                        )
                    ),
                    r.a.createElement(
                      D.a,
                      null,
                      r.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        r.a.createElement(Za, null)
                      ),
                      r.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          r.a.createElement(an, {
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
        })(n.Component),
        on = Object(b.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(rn),
        cn = a(408);
      function ln(e, t) {
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
      function sn(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ln(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : ln(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function un(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var mn = (function(e) {
          d()(a, e);
          var t = un(a);
          function a(e) {
            var n;
            c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  sn(
                    sn({}, n.state),
                    {},
                    {
                      portalUser: sn(
                        sn({}, n.state.portalUser),
                        {},
                        v()({}, r, a)
                      )
                    }
                  )
                );
              }),
              v()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.portalUser,
                  a = {},
                  r = !1;
                R.a.isEmail(t.email) || ((a.email = !0), (r = !0)),
                  n.setState(sn(sn({}, n.state), {}, { errors: a })),
                  !r &&
                    cn.a
                      .updatePortalUser(t)
                      .then(function(e) {
                        n.props.dispatch(N.x(t)), n.props.switchToView();
                      })
                      .catch(function(e) {
                        var t = JSON.parse(JSON.stringify(e)),
                          a =
                            "Er is iets misgegaan bij opslaan. Probeer het opnieuw.";
                        500 !== t.response.status &&
                          (a = t.response.data.message),
                          n.setState({
                            showErrorModal: !0,
                            modalErrorMessage: a
                          });
                      });
              }),
              v()(u()(n), "closeErrorModal", function() {
                n.setState({ showErrorModal: !1, modalErrorMessage: "" });
              });
            var r = e.portalUser,
              o = r.id,
              i = r.email;
            return (
              (n.state = {
                portalUser: { id: o, email: i },
                errors: { email: !1 },
                showErrorModal: !1,
                modalErrorMessage: ""
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.portalUser.email;
                  return r.a.createElement(
                    r.a.Fragment,
                    null,
                    r.a.createElement(
                      "form",
                      {
                        className: "form-horizontal col-md-12",
                        onSubmit: this.handleSubmit
                      },
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(x.a, {
                          label: "Inlog emailadres",
                          id: "email",
                          size: "col-sm-6",
                          name: "email",
                          value: e,
                          onChangeAction: this.handleInputChange,
                          required: "required",
                          error: this.state.errors.email
                        })
                      ),
                      r.a.createElement(
                        G.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          r.a.createElement(q.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.switchToView
                          }),
                          r.a.createElement(q.a, {
                            buttonText: "Opslaan",
                            onClickAction: this.handleSubmit
                          })
                        )
                      )
                    ),
                    this.state.showErrorModal &&
                      r.a.createElement(_.a, {
                        closeModal: this.closeErrorModal,
                        title: "Fout bij opslaan",
                        errorMessage: this.state.modalErrorMessage
                      })
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        dn = Object(b.b)(function(e) {
          return {
            portalUser: e.contactDetails.portalUser,
            permissions: e.meDetails.permissions
          };
        })(mn),
        pn = Object(b.b)(function(e) {
          return { portalUser: e.contactDetails.portalUser };
        })(function(e) {
          var t = e.portalUser.email;
          return r.a.createElement(
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
            r.a.createElement(
              "div",
              null,
              r.a.createElement(
                "div",
                { onClick: e.switchToEdit, className: "col-sm-11" },
                r.a.createElement(V.a, { label: "Inlog emailadres", value: t })
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-1" },
                e.showActionButtons
                  ? r.a.createElement(
                      "a",
                      { role: "button", onClick: e.switchToEdit },
                      r.a.createElement("span", {
                        className: "glyphicon glyphicon-pencil mybtn-success"
                      }),
                      " "
                    )
                  : "",
                e.showActionButtons
                  ? r.a.createElement(
                      "a",
                      { role: "button", onClick: e.toggleDelete },
                      r.a.createElement("span", {
                        className: "glyphicon glyphicon-trash mybtn-danger"
                      }),
                      " "
                    )
                  : ""
              )
            )
          );
        }),
        hn = Object(b.b)(
          function(e) {
            return { portalUser: e.contactDetails.portalUser };
          },
          function(e) {
            return {
              deletePortalUser: function(t) {
                e(Object(N.g)(t));
              }
            };
          }
        )(function(e) {
          return (
            (!e.primary ||
              (e.numberOfEmailAddresses && 1 === e.numberOfEmailAddresses)) &&
              !0,
            r.a.createElement(
              C.a,
              {
                buttonConfirmText: "Verwijder",
                buttonClassName: "btn-danger",
                closeModal: e.closeDeleteItemModal,
                confirmAction: function() {
                  return (
                    e.deletePortalUser(e.portalUser.id),
                    void e.closeDeleteItemModal()
                  );
                },
                title: "Verwijderen"
              },
              r.a.createElement("p", null, "Verwijder portal gebruiker")
            )
          );
        });
      function fn(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var gn = (function(e) {
          d()(a, e);
          var t = fn(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              v()(u()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              v()(u()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              v()(u()(n), "switchToView", function() {
                n.setState({ showEdit: !1 });
              }),
              v()(u()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              (n.state = {
                showActionButtons: !1,
                highlightLine: "",
                showEdit: !1,
                showDelete: !1
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    w.a,
                    null,
                    r.a.createElement(
                      xe.a,
                      null,
                      r.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Portal gebruiker gegevens"
                      )
                    ),
                    r.a.createElement(
                      D.a,
                      null,
                      this.props.portalUser
                        ? this.state.showEdit
                          ? r.a.createElement(dn, {
                              switchToView: this.switchToView
                            })
                          : r.a.createElement(pn, {
                              highlightLine: this.state.highlightLine,
                              showActionButtons: this.state.showActionButtons,
                              onLineEnter: this.onLineEnter,
                              onLineLeave: this.onLineLeave,
                              switchToEdit: this.switchToEdit,
                              toggleDelete: this.toggleDelete
                            })
                        : r.a.createElement(
                            "div",
                            { className: "col-md-12" },
                            r.a.createElement(
                              "div",
                              null,
                              r.a.createElement("div", null, "Niet geactiveerd")
                            )
                          ),
                      this.state.showDelete &&
                        r.a.createElement(hn, {
                          closeDeleteItemModal: this.toggleDelete
                        })
                    )
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        En = Object(b.b)(function(e) {
          return { portalUser: e.contactDetails.portalUser };
        }, null)(gn);
      function vn(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      L.a.locale("nl");
      var bn = (function(e) {
          d()(a, e);
          var t = vn(a);
          function a(e) {
            return c()(this, a), t.call(this, e);
          }
          return (
            l()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  this.props.fetchContactDetails(this.props.id);
                }
              },
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  this.props.id !== e.id &&
                    this.props.fetchContactDetails(e.id);
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.props.contactDetails.typeId,
                    t = "",
                    a = !0;
                  return (
                    this.props.hasError
                      ? (t = "Fout bij het ophalen van contact.")
                      : this.props.isLoading
                      ? (t = "Gegevens aan het laden.")
                      : Object(j.isEmpty)(this.props.contactDetails)
                      ? (t = "Geen gegevens gevonden.")
                      : (a = !1),
                    a
                      ? r.a.createElement("div", null, t)
                      : r.a.createElement(
                          "div",
                          null,
                          r.a.createElement(he, null),
                          r.a.createElement(qe, null),
                          r.a.createElement(vt, null),
                          r.a.createElement(ut, null),
                          r.a.createElement(on, null),
                          "organisation" == e && r.a.createElement(ia, null),
                          "organisation" == e && r.a.createElement(fa, null),
                          r.a.createElement(Fa, null),
                          "person" == e && r.a.createElement(At, null),
                          "person" == e && r.a.createElement(En, null),
                          r.a.createElement(Vt, null),
                          r.a.createElement($t, null)
                        )
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        yn = Object(b.b)(
          function(e) {
            return {
              contactDetails: e.contactDetails,
              isLoading: e.loadingData.isLoading,
              hasError: e.loadingData.hasError
            };
          },
          function(e) {
            return {
              fetchContactDetails: function(t) {
                e(Object(N.h)(t));
              }
            };
          }
        )(bn),
        Nn = a(774),
        wn = a(54);
      function Dn(e, t) {
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
      function On(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Dn(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Dn(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Cn(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var Sn = (function(e) {
          d()(a, e);
          var t = Cn(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(v()({}, r, a));
              }),
              v()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = {
                    contactId: n.state.contactId,
                    groupId: n.state.groupId
                  },
                  a = {},
                  r = !1;
                R.a.isEmpty(t.groupId) && ((a.groupId = !0), (r = !0)),
                  n.setState(On(On({}, n.state), {}, { errors: a })),
                  r ||
                    (n.props.addContactToGroup(t),
                    n.props.toggleGroup(),
                    n.props.fetchContactDetails(t.contactId),
                    n.props.toggleAddGroup());
              }),
              (n.state = {
                contactGroups: [],
                contactId: e.contactDetails.id,
                groupId: "",
                errors: { groupId: !1 }
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  wn.a.peekStaticContactGroups().then(function(t) {
                    e.setState({ contactGroups: t });
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    C.a,
                    {
                      buttonConfirmText: "Toevoegen",
                      closeModal: this.props.toggleAddGroup,
                      confirmAction: this.handleSubmit,
                      title: "Contact toevoegen aan groep"
                    },
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(V.a, {
                        className: "col-md-12",
                        label: "Contact",
                        value: this.props.contactDetails.fullName
                      }),
                      r.a.createElement(Z.a, {
                        size: "col-md-12",
                        label: "Groep",
                        name: "groupId",
                        options: this.state.contactGroups,
                        value: this.state.groupId,
                        onChangeAction: this.handleInputChange,
                        required: "required",
                        error: this.state.errors.groupId
                      })
                    )
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        kn = Object(b.b)(
          function(e) {
            return { contactDetails: e.contactDetails };
          },
          function(e) {
            return {
              addContactToGroup: function(t) {
                e(Object(Nn.a)(t));
              },
              fetchContactDetails: function(t) {
                e(Object(N.h)(t));
              }
            };
          }
        )(Sn),
        An = a(206);
      function In(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      L.a.locale("nl");
      var jn = (function(e) {
          d()(a, e);
          var t = In(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "openItem", function(e) {
                y.f.push("/intake/".concat(e));
              }),
              (n.state = { intakes: "", loading: !0 }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  An.a
                    .fetchIntakesByContact(this.props.contactDetailsId)
                    .then(function(t) {
                      e.setState({ intakes: t, loading: !1 });
                    });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.state,
                    a = t.intakes,
                    n = t.loading;
                  return r.a.createElement(
                    "div",
                    null,
                    n && r.a.createElement("div", null, "Laden..."),
                    "" == a &&
                      !n &&
                      r.a.createElement("div", null, "Geen intakes bekend."),
                    "" != a &&
                      !n &&
                      r.a.createElement(
                        "table",
                        { className: "table" },
                        r.a.createElement(
                          "tbody",
                          null,
                          a.map(function(t, a) {
                            return r.a.createElement(
                              "tr",
                              {
                                key: a,
                                onClick: function() {
                                  return e.openItem(t.id);
                                }
                              },
                              r.a.createElement(
                                "td",
                                { className: "col-xs-4 clickable" },
                                t.createdAt
                                  ? L()(t.createdAt).format("DD-MM-Y")
                                  : ""
                              ),
                              r.a.createElement(
                                "td",
                                { className: "col-xs-8 clickable" },
                                t.campaignName,
                                r.a.createElement("br", null),
                                t.addressName
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
        })(n.Component),
        Pn = Object(b.b)(function(e) {
          return { contactDetailsId: e.contactDetails.id };
        }, null)(jn),
        Ln = Object(b.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showIntakesList,
            n = e.newIntake,
            o = e.intakeCount,
            c = e.permissions;
          return r.a.createElement(
            w.a,
            { className: "harmonica-button" },
            r.a.createElement(
              D.a,
              null,
              r.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                r.a.createElement(
                  "span",
                  { className: "" },
                  "INTAKES ",
                  r.a.createElement("span", { className: "badge" }, o)
                )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                c.manageIntake &&
                  r.a.createElement(
                    "a",
                    { role: "button", className: "pull-right", onClick: n },
                    r.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white"
                    })
                  )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && r.a.createElement(Pn, null)
              )
            )
          );
        }),
        Mn = a(216);
      function Rn(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      L.a.locale("nl");
      var Tn = (function(e) {
          d()(a, e);
          var t = Rn(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "openItem", function(e) {
                y.f.push("/woningdossier/".concat(e));
              }),
              (n.state = { housingFiles: "", loading: !0 }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  Mn.a
                    .fetchHousingFilesByContact(this.props.contactDetailsId)
                    .then(function(t) {
                      e.setState({ housingFiles: t, loading: !1 });
                    });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.state,
                    a = t.housingFiles,
                    n = t.loading;
                  return r.a.createElement(
                    "div",
                    null,
                    n && r.a.createElement("div", null, "Laden..."),
                    "" == a &&
                      !n &&
                      r.a.createElement(
                        "div",
                        null,
                        "Geen woningdossiers bekend."
                      ),
                    "" != a &&
                      !n &&
                      r.a.createElement(
                        "table",
                        { className: "table" },
                        r.a.createElement(
                          "tbody",
                          null,
                          a.map(function(t, a) {
                            return r.a.createElement(
                              "tr",
                              {
                                key: a,
                                onClick: function() {
                                  return e.openItem(t.id);
                                }
                              },
                              r.a.createElement(
                                "td",
                                { className: "col-xs-12 clickable" },
                                t.createdAt
                                  ? L()(t.createdAt).format("DD-MM-Y")
                                  : "",
                                " ",
                                "- ",
                                t.addressName
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
        })(n.Component),
        xn = Object(b.b)(function(e) {
          return { contactDetailsId: e.contactDetails.id };
        }, null)(Tn),
        Bn = Object(b.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showHousingFilesList,
            n = e.newHousingFile,
            o = e.housingFileCount,
            c = e.permissions;
          return r.a.createElement(
            w.a,
            { className: "harmonica-button" },
            r.a.createElement(
              D.a,
              null,
              r.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                r.a.createElement(
                  "span",
                  { className: "" },
                  "WONINGDOSSIERS ",
                  r.a.createElement("span", { className: "badge" }, o)
                )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                c.manageHousingFile &&
                  r.a.createElement(
                    "a",
                    { role: "button", className: "pull-right", onClick: n },
                    r.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white"
                    })
                  )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && r.a.createElement(xn, null)
              )
            )
          );
        }),
        qn = Object(b.b)(function(e) {
          return {
            relatedOpportunities: e.contactDetails.relatedOpportunities
          };
        })(function(e) {
          var t = e.relatedOpportunities;
          return r.a.createElement(
            "div",
            null,
            "" == t && r.a.createElement("div", null, "Geen kansen gevonden."),
            "" != t &&
              r.a.createElement(
                "table",
                { className: "table harmonica-table" },
                r.a.createElement(
                  "tbody",
                  null,
                  t.map(function(e, t) {
                    return r.a.createElement(
                      "tr",
                      { key: t },
                      r.a.createElement(
                        "td",
                        {
                          className: "col-xs-10 clickable",
                          onClick: function() {
                            return (
                              (t = e.id), void y.f.push("/kans/".concat(t))
                            );
                            var t;
                          }
                        },
                        L()(e.created_at).format("L"),
                        " -",
                        " ",
                        e.number,
                        " - ",
                        e.measure_category.name,
                        " "
                      )
                    );
                  })
                )
              )
          );
        }),
        Gn = Object(b.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showOpportunitiesList,
            n = (e.newOpportunity, e.opportunityCount);
          e.permissions;
          return r.a.createElement(
            w.a,
            { className: "harmonica-button" },
            r.a.createElement(
              D.a,
              null,
              r.a.createElement(
                "div",
                { className: "col-sm-12", onClick: t, role: "button" },
                r.a.createElement(
                  "span",
                  { className: "" },
                  "KANSEN ",
                  r.a.createElement("span", { className: "badge" }, n)
                )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && r.a.createElement(qn, null)
              )
            )
          );
        });
      function zn(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var Fn = (function(e) {
          d()(a, e);
          var t = zn(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "openItem", function(e) {
                y.f.push("/taak/".concat(e));
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
                  return r.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      r.a.createElement("div", null, "Geen taken gevonden."),
                    "" != t &&
                      r.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        r.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return r.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: a
                              },
                              r.a.createElement(
                                "td",
                                { className: "col-xs-12 clickable" },
                                L()(t.createdAt).format("L"),
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
        })(n.Component),
        _n = Object(b.b)(function(e) {
          return { relatedTasks: e.contactDetails.relatedTasks };
        })(Fn),
        Vn = Object(b.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showTasksList,
            n = e.newTask,
            o = e.taskCount,
            c = e.permissions;
          return r.a.createElement(
            w.a,
            { className: "harmonica-button" },
            r.a.createElement(
              D.a,
              null,
              r.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                r.a.createElement(
                  "span",
                  { className: "" },
                  "OPEN TAKEN ",
                  r.a.createElement("span", { className: "badge" }, o)
                )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                c.manageTask &&
                  r.a.createElement(
                    "a",
                    { role: "button", className: "pull-right", onClick: n },
                    r.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white"
                    })
                  )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && r.a.createElement(_n, null)
              )
            )
          );
        });
      function Un(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var Yn = (function(e) {
          d()(a, e);
          var t = Un(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "openItem", function(e) {
                y.f.push("/taak/".concat(e));
              }),
              (n.state = { relatedNotes: "" }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedNotes;
                  return r.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      r.a.createElement("div", null, "Geen notities gevonden."),
                    "" != t &&
                      r.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        r.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return r.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: a
                              },
                              r.a.createElement(
                                "td",
                                { className: "col-xs-12 clickable" },
                                L()(t.createdAt).format("L"),
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
        })(n.Component),
        Wn = Object(b.b)(function(e) {
          return { relatedNotes: e.contactDetails.relatedNotes };
        })(Yn),
        Jn = Object(b.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showNotesList,
            n = e.newNote,
            o = e.noteCount,
            c = e.permissions;
          return r.a.createElement(
            w.a,
            { className: "harmonica-button" },
            r.a.createElement(
              D.a,
              null,
              r.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                r.a.createElement(
                  "span",
                  { className: "" },
                  "NOTITIES ",
                  r.a.createElement("span", { className: "badge" }, o)
                )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                c.manageTask &&
                  r.a.createElement(
                    "a",
                    { role: "button", className: "pull-right", onClick: n },
                    r.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white"
                    })
                  )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && r.a.createElement(Wn, null)
              )
            )
          );
        }),
        Kn = function(e) {
          return r.a.createElement(
            C.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return (
                  e.deleteContactFromGroup(
                    e.group.pivot.contact_group_id,
                    e.group.pivot.contact_id
                  ),
                  void e.closeDeleteItemModal()
                );
              },
              title: "Verwijderen"
            },
            r.a.createElement(
              "p",
              { className: "modal-text" },
              "Verwijder contact ",
              r.a.createElement("strong", null, " ", e.contactFullName, " "),
              " uit groep",
              " ",
              r.a.createElement("strong", null, " ", e.group.name, " ")
            )
          );
        };
      function Hn(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var Xn = (function(e) {
          d()(a, e);
          var t = Hn(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "toggleDeleteFromGroup", function(e) {
                n.setState({
                  showModalDeleteFromGroup: !n.state.showModalDeleteFromGroup,
                  group: e
                });
              }),
              v()(u()(n), "closeDeleteItemModal", function() {
                n.setState({ showModalDeleteFromGroup: !1, groupId: "" });
              }),
              v()(u()(n), "openGroup", function(e) {
                y.f.push("/contact-groep/".concat(e));
              }),
              v()(u()(n), "deleteContactFromGroup", function(e, t) {
                wn.a.deleteContactFromGroup(e, t).then(function(e) {
                  wn.a.fetchGroupsByContact(t).then(function(e) {
                    n.setState({ groups: e, loading: !1 }),
                      n.props.fetchContactDetails(t);
                  });
                });
              }),
              (n.state = {
                groups: "",
                loading: !0,
                showModalDeleteFromGroup: !1,
                group: ""
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  wn.a
                    .fetchGroupsByContact(this.props.contactDetailsId)
                    .then(function(t) {
                      e.setState({ groups: t, loading: !1 });
                    });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.state,
                    a = t.groups,
                    n = t.loading;
                  return r.a.createElement(
                    "div",
                    null,
                    n && r.a.createElement("div", null, "Laden"),
                    "" == a &&
                      !n &&
                      r.a.createElement("div", null, "Geen groepen gevonden."),
                    "" != a &&
                      !n &&
                      r.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        r.a.createElement(
                          "tbody",
                          null,
                          a.map(function(t, a) {
                            return r.a.createElement(
                              "tr",
                              { key: a },
                              r.a.createElement(
                                "td",
                                {
                                  className: "col-xs-10 clickable",
                                  onClick: function() {
                                    return e.openGroup(t.id);
                                  }
                                },
                                t.name
                              ),
                              r.a.createElement(
                                "td",
                                { className: "col-xs-2" },
                                r.a.createElement(
                                  "a",
                                  {
                                    role: "button",
                                    onClick: function() {
                                      return e.toggleDeleteFromGroup(t);
                                    },
                                    className: "pull-right"
                                  },
                                  r.a.createElement("span", {
                                    className:
                                      "glyphicon glyphicon-trash glyphicon-white"
                                  })
                                )
                              )
                            );
                          })
                        )
                      ),
                    this.state.showModalDeleteFromGroup &&
                      r.a.createElement(Kn, {
                        closeDeleteItemModal: this.closeDeleteItemModal,
                        deleteContactFromGroup: this.deleteContactFromGroup,
                        group: this.state.group,
                        contactFullName: this.props.contactFullName
                      })
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        Zn = Object(b.b)(
          function(e) {
            return {
              contactDetailsId: e.contactDetails.id,
              contactFullName: e.contactDetails.fullName
            };
          },
          function(e) {
            return {
              fetchContactDetails: function(t) {
                e(Object(N.h)(t));
              }
            };
          }
        )(Xn),
        Qn = function(e) {
          var t = e.toggleShowList,
            a = e.showContactGroupsList,
            n = e.toggleAddGroup,
            o = e.groupCount;
          return r.a.createElement(
            w.a,
            { className: "harmonica-button" },
            r.a.createElement(
              D.a,
              null,
              r.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                r.a.createElement(
                  "span",
                  { onClick: t, className: "" },
                  "STATISCHE GROEPEN ",
                  r.a.createElement("span", { className: "badge" }, o)
                )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                r.a.createElement(
                  "a",
                  { role: "button", className: "pull-right", onClick: n },
                  r.a.createElement("span", {
                    className: "glyphicon glyphicon-plus glyphicon-white"
                  })
                )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && r.a.createElement(Zn, null)
              )
            )
          );
        };
      function $n(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var er = (function(e) {
          d()(a, e);
          var t = $n(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "openItem", function(e) {
                y.f.push("/email/".concat(e));
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
                  return r.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      r.a.createElement("div", null, "Geen e-mails gevonden."),
                    "" != t &&
                      r.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        r.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return r.a.createElement(
                              "tr",
                              { key: a },
                              r.a.createElement(
                                "td",
                                {
                                  className: "col-xs-4 clickable",
                                  onClick: function() {
                                    return e.openItem(t.id);
                                  }
                                },
                                L()(t.date_sent).format("L")
                              ),
                              r.a.createElement(
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
        })(n.Component),
        tr = Object(b.b)(function(e) {
          return { relatedEmailsInbox: e.contactDetails.relatedEmailsInbox };
        })(er),
        ar = function(e) {
          var t = e.toggleShowList,
            a = e.showEmailsInboxList,
            n = e.newEmail,
            o = e.emailInboxCount;
          return r.a.createElement(
            w.a,
            { className: "harmonica-button" },
            r.a.createElement(
              D.a,
              null,
              r.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                r.a.createElement(
                  "span",
                  { onClick: t, role: "button", className: "" },
                  "E-MAIL INBOX ",
                  r.a.createElement("span", { className: "badge" }, o)
                )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                r.a.createElement(
                  "a",
                  { role: "button", className: "pull-right", onClick: n },
                  r.a.createElement("span", {
                    className: "glyphicon glyphicon-plus glyphicon-white"
                  })
                )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && r.a.createElement(tr, null)
              )
            )
          );
        };
      function nr(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var rr = (function(e) {
          d()(a, e);
          var t = nr(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "openItem", function(e) {
                y.f.push("/email/".concat(e));
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
                  return r.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      r.a.createElement("div", null, "Geen e-mails gevonden."),
                    "" != t &&
                      r.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        r.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return r.a.createElement(
                              "tr",
                              { key: a },
                              r.a.createElement(
                                "td",
                                {
                                  className: "col-xs-4 clickable",
                                  onClick: function() {
                                    return e.openItem(t.id);
                                  }
                                },
                                L()(t.date_sent).format("L")
                              ),
                              r.a.createElement(
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
        })(n.Component),
        or = Object(b.b)(function(e) {
          return { relatedEmailsSent: e.contactDetails.relatedEmailsSent };
        })(rr),
        cr = function(e) {
          var t = e.toggleShowList,
            a = e.showEmailsSentList,
            n = e.newEmail,
            o = e.emailSentCount;
          return r.a.createElement(
            w.a,
            { className: "harmonica-button" },
            r.a.createElement(
              D.a,
              null,
              r.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                r.a.createElement(
                  "span",
                  { onClick: t, className: "" },
                  "E-MAIL VERZONDEN ",
                  r.a.createElement("span", { className: "badge" }, o)
                )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                r.a.createElement(
                  "a",
                  { role: "button", className: "pull-right", onClick: n },
                  r.a.createElement("span", {
                    className: "glyphicon glyphicon-plus glyphicon-white"
                  })
                )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && r.a.createElement(or, null)
              )
            )
          );
        };
      function ir(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var lr = (function(e) {
          d()(a, e);
          var t = ir(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "openItem", function(e) {
                y.f.push("/document/".concat(e));
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
                  return r.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      r.a.createElement(
                        "div",
                        null,
                        "Geen documenten gevonden."
                      ),
                    "" != t &&
                      r.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        r.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return r.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: a
                              },
                              r.a.createElement(
                                "td",
                                { className: "col-xs-5 clickable" },
                                L()(t.createdAt).format("L")
                              ),
                              r.a.createElement(
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
        })(n.Component),
        sr = Object(b.b)(function(e) {
          return { relatedDocuments: e.contactDetails.relatedDocuments };
        })(lr),
        ur = Object(b.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showDocumentsList,
            n = e.newDocument,
            o = e.documentCount,
            c = e.permissions;
          return r.a.createElement(
            w.a,
            { className: "harmonica-button" },
            r.a.createElement(
              D.a,
              null,
              r.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                r.a.createElement(
                  "span",
                  null,
                  "DOCUMENTEN ",
                  r.a.createElement("span", { className: "badge" }, o)
                )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                c.createDocument &&
                  r.a.createElement(
                    "div",
                    { className: "pull-right" },
                    r.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white",
                      "data-toggle": "dropdown",
                      role: "button"
                    }),
                    r.a.createElement(
                      "ul",
                      { className: "dropdown-menu" },
                      r.a.createElement(
                        "li",
                        null,
                        r.a.createElement(
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
                      r.a.createElement(
                        "li",
                        null,
                        r.a.createElement(
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
              r.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && r.a.createElement(sr, null)
              )
            )
          );
        }),
        mr = a(713);
      function dr(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var pr = (function(e) {
          d()(a, e);
          var t = dr(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "openItem", function(e) {
                y.f.push("/project/deelnemer/".concat(e));
              }),
              (n.state = { relatedParticipations: "" }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedParticipations;
                  return r.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      r.a.createElement(
                        "div",
                        null,
                        "Geen deelnames gevonden."
                      ),
                    "" != t &&
                      r.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        r.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return r.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: a
                              },
                              r.a.createElement(
                                "td",
                                { className: "col-xs-5 clickable" },
                                L()(t.createdAt).format("L")
                              ),
                              r.a.createElement(
                                "td",
                                { className: "col-xs-6 clickable" },
                                "loan" === t.projectTypeCodeRef
                                  ? ""
                                      .concat(
                                        Object(mr.a)(t.amountDefinitive),
                                        " in "
                                      )
                                      .concat(t.projectName, " ")
                                  : ""
                                      .concat(
                                        t.participationsDefinitive,
                                        " in "
                                      )
                                      .concat(t.projectName, " ")
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
        })(n.Component),
        hr = Object(b.b)(function(e) {
          return {
            relatedParticipations: e.contactDetails.relatedParticipations
          };
        })(pr),
        fr = Object(b.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showParticipationsList,
            n = e.newParticipation,
            o = e.participationCount,
            c = e.permissions;
          return r.a.createElement(
            w.a,
            { className: "harmonica-button" },
            r.a.createElement(
              D.a,
              null,
              r.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                r.a.createElement(
                  "span",
                  { className: "" },
                  "DEELNAMES ",
                  r.a.createElement("span", { className: "badge" }, o)
                )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                c.manageParticipation &&
                  r.a.createElement(
                    "a",
                    { role: "button", className: "pull-right", onClick: n },
                    r.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white"
                    })
                  )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && r.a.createElement(hr, null)
              )
            )
          );
        }),
        gr = Object(b.b)(function(e) {
          return { relatedOrders: e.contactDetails.relatedOrders };
        })(function(e) {
          var t = e.relatedOrders;
          return r.a.createElement(
            "div",
            null,
            "" == t && r.a.createElement("div", null, "Geen orders gevonden."),
            "" != t &&
              r.a.createElement(
                "table",
                { className: "table harmonica-table" },
                r.a.createElement(
                  "tbody",
                  null,
                  t.map(function(e, t) {
                    return r.a.createElement(
                      "tr",
                      { key: t },
                      r.a.createElement(
                        "td",
                        {
                          className: "col-xs-10 clickable",
                          onClick: function() {
                            return (
                              (t = e.id), void y.f.push("/order/".concat(t))
                            );
                            var t;
                          }
                        },
                        e.number,
                        " - ",
                        e.subject,
                        " "
                      )
                    );
                  })
                )
              )
          );
        }),
        Er = Object(b.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showOrdersList,
            n = e.newOrder,
            o = e.orderCount,
            c = e.permissions;
          return r.a.createElement(
            w.a,
            { className: "harmonica-button" },
            r.a.createElement(
              D.a,
              null,
              r.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                r.a.createElement(
                  "span",
                  { className: "" },
                  "ORDERS ",
                  r.a.createElement("span", { className: "badge" }, o)
                )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-2" },
                c.manageFinancial &&
                  r.a.createElement(
                    "a",
                    { role: "button", className: "pull-right", onClick: n },
                    r.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white"
                    })
                  )
              ),
              r.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && r.a.createElement(gr, null)
              )
            )
          );
        }),
        vr = Object(b.b)(function(e) {
          return { relatedInvoices: e.contactDetails.relatedInvoices };
        })(function(e) {
          var t = e.relatedInvoices;
          return r.a.createElement(
            "div",
            null,
            "" == t && r.a.createElement("div", null, "Geen nota's gevonden."),
            "" != t &&
              r.a.createElement(
                "table",
                { className: "table harmonica-table" },
                r.a.createElement(
                  "tbody",
                  null,
                  t.map(function(e, t) {
                    return r.a.createElement(
                      "tr",
                      { key: t },
                      r.a.createElement(
                        "td",
                        {
                          className: "col-xs-10 clickable",
                          onClick: function() {
                            return (
                              (t = e.id), void y.f.push("/nota/".concat(t))
                            );
                            var t;
                          }
                        },
                        " ",
                        e.number,
                        " - ",
                        e.order.subject,
                        " -",
                        " ",
                        e.status.name,
                        " - ",
                        L()(e.createdAt).format("L")
                      )
                    );
                  })
                )
              )
          );
        }),
        br = function(e) {
          var t = e.toggleShowList,
            a = e.showInvoicesList,
            n = e.invoiceCount;
          return r.a.createElement(
            w.a,
            { className: "harmonica-button" },
            r.a.createElement(
              D.a,
              null,
              r.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                r.a.createElement(
                  "span",
                  { className: "" },
                  "NOTA'S ",
                  r.a.createElement("span", { className: "badge" }, n)
                )
              ),
              r.a.createElement("div", { className: "col-sm-2" }),
              r.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && r.a.createElement(vr, null)
              )
            )
          );
        };
      function yr(e, t) {
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
      function Nr(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? yr(Object(a), !0).forEach(function(t) {
                v()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : yr(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function wr(e) {
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
            var r = g()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var Dr = (function(e) {
          d()(a, e);
          var t = wr(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              (n = t.call(this, e)),
              v()(u()(n), "newIntake", function() {
                var e = n.props.contactDetails.addresses.find(function(e) {
                  return e.primary;
                });
                void 0 === e &&
                void 0 === (e = n.props.contactDetails.addresses[0])
                  ? n.setState({
                      showModalError: !n.state.showModalError,
                      modalErrorTitle: "Waarschuwing",
                      modalErrorMessage: "Dit contact heeft nog geen adres."
                    })
                  : y.f.push(
                      "/intake/nieuw/contact/"
                        .concat(n.props.contactDetails.id, "/adres/")
                        .concat(e.id)
                    );
              }),
              v()(u()(n), "newHousingFile", function() {
                var e = n.props.contactDetails.addresses.find(function(e) {
                  return e.primary;
                });
                void 0 === e &&
                void 0 === (e = n.props.contactDetails.addresses[0])
                  ? n.setState({
                      showModalError: !n.state.showModalError,
                      modalErrorTitle: "Waarschuwing",
                      modalErrorMessage: "Dit contact heeft nog geen adres."
                    })
                  : y.f.push(
                      "/woningdossier/nieuw/contact/"
                        .concat(n.props.contactDetails.id, "/adres/")
                        .concat(e.id)
                    );
              }),
              v()(u()(n), "toggleErrorModal", function() {
                n.setState({ showModalError: !n.state.showModalError });
              }),
              v()(u()(n), "newTask", function() {
                y.f.push(
                  "/taak/nieuw/contact/".concat(n.props.contactDetails.id)
                );
              }),
              v()(u()(n), "newNote", function() {
                y.f.push(
                  "/taak/nieuw/afgehandeld/contact/".concat(
                    n.props.contactDetails.id
                  )
                );
              }),
              v()(u()(n), "newParticipation", function() {
                y.f.push(
                  "/project/deelnemer/nieuw/contact/".concat(
                    n.props.contactDetails.id
                  )
                );
              }),
              v()(u()(n), "newEmail", function() {
                void 0 ===
                n.props.contactDetails.emailAddresses.find(function(e) {
                  return e.primary;
                })
                  ? n.setState({
                      showModalError: !n.state.showModalError,
                      modalErrorTitle: "Waarschuwing",
                      modalErrorMessage:
                        "Dit contact heeft nog geen primair e-mail adres."
                    })
                  : y.f.push(
                      "/email/nieuw/contact/".concat(n.props.contactDetails.id)
                    );
              }),
              v()(u()(n), "newDocument", function(e) {
                y.f.push(
                  "/document/nieuw/"
                    .concat(e, "/contact/")
                    .concat(n.props.contactDetails.id)
                );
              }),
              v()(u()(n), "newOrder", function() {
                y.f.push(
                  "/order/nieuw/contact/".concat(n.props.contactDetails.id)
                );
              }),
              v()(u()(n), "toggleAddGroup", function() {
                n.setState({ showModalAddGroup: !n.state.showModalAddGroup });
              }),
              (n.state = {
                toggleShowList: {
                  invoices: !1,
                  orders: !1,
                  intakes: !1,
                  housingFiles: !1,
                  opportunities: !1,
                  tasks: !1,
                  notes: !1,
                  contactGroups: !1,
                  emailsInbox: !1,
                  emailsSent: !1,
                  documents: !1,
                  participations: !1
                },
                showModalAddGroup: !1
              }),
              (n.toggleShowList = n.toggleShowList.bind(u()(n))),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  this.props.id !== e.id &&
                    this.setState({
                      toggleShowList: {
                        invoices: !1,
                        orders: !1,
                        intakes: !1,
                        housingFiles: !1,
                        opportunities: !1,
                        tasks: !1,
                        notes: !1,
                        contactGroups: !1,
                        emailsInbox: !1,
                        emailsSent: !1,
                        documents: !1,
                        participations: !1
                      }
                    });
                }
              },
              {
                key: "toggleShowList",
                value: function(e) {
                  this.setState(
                    Nr(
                      Nr({}, this.state),
                      {},
                      {
                        toggleShowList: Nr(
                          Nr({}, this.state.toggleShowList),
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
                  return r.a.createElement(
                    "div",
                    { className: "margin-10-top" },
                    r.a.createElement(ar, {
                      toggleShowList: function() {
                        return e.toggleShowList("emailsInbox");
                      },
                      showEmailsInboxList: this.state.toggleShowList
                        .emailsInbox,
                      newEmail: this.newEmail,
                      emailInboxCount: this.props.contactDetails.emailInboxCount
                    }),
                    r.a.createElement(cr, {
                      toggleShowList: function() {
                        return e.toggleShowList("emailsSent");
                      },
                      showEmailsSentList: this.state.toggleShowList.emailsSent,
                      newEmail: this.newEmail,
                      emailSentCount: this.props.contactDetails.emailSentCount
                    }),
                    r.a.createElement(Vn, {
                      toggleShowList: function() {
                        return e.toggleShowList("tasks");
                      },
                      showTasksList: this.state.toggleShowList.tasks,
                      taskCount: this.props.contactDetails.taskCount,
                      newTask: this.newTask
                    }),
                    r.a.createElement(Jn, {
                      toggleShowList: function() {
                        return e.toggleShowList("notes");
                      },
                      showNotesList: this.state.toggleShowList.notes,
                      noteCount: this.props.contactDetails.noteCount,
                      newNote: this.newNote
                    }),
                    r.a.createElement(fr, {
                      toggleShowList: function() {
                        return e.toggleShowList("participations");
                      },
                      showParticipationsList: this.state.toggleShowList
                        .participations,
                      participationCount: this.props.contactDetails
                        .participationCount,
                      newParticipation: this.newParticipation
                    }),
                    r.a.createElement(Ln, {
                      toggleShowList: function() {
                        return e.toggleShowList("intakes");
                      },
                      showIntakesList: this.state.toggleShowList.intakes,
                      intakeCount: this.props.contactDetails.intakeCount,
                      newIntake: this.newIntake
                    }),
                    r.a.createElement(Gn, {
                      toggleShowList: function() {
                        return e.toggleShowList("opportunities");
                      },
                      showOpportunitiesList: this.state.toggleShowList
                        .opportunities,
                      opportunityCount: this.props.contactDetails
                        .opportunityCount
                    }),
                    r.a.createElement(Bn, {
                      toggleShowList: function() {
                        return e.toggleShowList("housingFiles");
                      },
                      showHousingFilesList: this.state.toggleShowList
                        .housingFiles,
                      housingFileCount: this.props.contactDetails
                        .housingFileCount,
                      newHousingFile: this.newHousingFile
                    }),
                    r.a.createElement(Qn, {
                      toggleShowList: function() {
                        return e.toggleShowList("contactGroups");
                      },
                      showContactGroupsList: this.state.toggleShowList
                        .contactGroups,
                      toggleAddGroup: this.toggleAddGroup,
                      groupCount: this.props.contactDetails.groupCount
                    }),
                    r.a.createElement(Er, {
                      toggleShowList: function() {
                        return e.toggleShowList("orders");
                      },
                      showOrdersList: this.state.toggleShowList.orders,
                      orderCount: this.props.contactDetails.orderCount,
                      newOrder: this.newOrder
                    }),
                    r.a.createElement(br, {
                      toggleShowList: function() {
                        return e.toggleShowList("invoices");
                      },
                      showInvoicesList: this.state.toggleShowList.invoices,
                      invoiceCount: this.props.contactDetails.invoiceCount
                    }),
                    r.a.createElement(ur, {
                      toggleShowList: function() {
                        return e.toggleShowList("documents");
                      },
                      showDocumentsList: this.state.toggleShowList.documents,
                      newDocument: this.newDocument,
                      documentCount: this.props.contactDetails.documentCount
                    }),
                    this.state.showModalError &&
                      r.a.createElement(_.a, {
                        closeModal: this.toggleErrorModal,
                        title: this.state.modalErrorTitle,
                        errorMessage: this.state.modalErrorMessage
                      }),
                    this.state.showModalAddGroup &&
                      r.a.createElement(kn, {
                        toggleAddGroup: this.toggleAddGroup,
                        toggleGroup: function() {
                          return e.toggleShowList("contactGroups");
                        }
                      })
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        Or = Object(b.b)(function(e) {
          return {
            contactDetails: e.contactDetails,
            permissions: e.meDetails.permissions
          };
        }, null)(Dr);
      t.default = function(e) {
        return r.a.createElement(
          "div",
          { className: "row" },
          r.a.createElement(
            "div",
            { className: "col-md-9" },
            r.a.createElement(
              "div",
              { className: "col-md-12" },
              r.a.createElement(I, null)
            ),
            r.a.createElement(
              "div",
              { className: "col-md-12" },
              r.a.createElement(yn, { id: e.params.id })
            )
          ),
          r.a.createElement(
            w.a,
            { className: "col-md-3 harmonica" },
            r.a.createElement(
              D.a,
              null,
              r.a.createElement(Or, { id: e.params.id })
            )
          )
        );
      };
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
            h = e.readOnly,
            f = e.maxLength,
            g = e.error,
            E = e.min,
            v = e.max,
            b = e.step,
            y = e.errorMessage,
            N = e.divSize,
            w = e.divClassName,
            D = e.autoComplete;
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
                  "form-control input-sm ".concat(n) + (g ? "has-error" : ""),
                id: c,
                placeholder: i,
                name: l,
                value: s,
                onClick: u,
                onChange: m,
                onBlur: d,
                readOnly: h,
                maxLength: f,
                min: E,
                max: v,
                autoComplete: D,
                step: b
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
            h = e.optionValue,
            f = e.optionName,
            g = e.readOnly,
            E = e.placeholder,
            v = e.divClassName,
            b = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(v) },
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
                  readOnly: g
                },
                b && r.a.createElement("option", { value: "" }, E),
                l.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[h], value: e[h] },
                    e[f]
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
    699: function(e, t, a) {
      "use strict";
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
        h = a.n(p),
        f = a(6),
        g = a.n(f),
        E = a(0),
        v = a.n(E),
        b = a(8),
        y = a.n(b),
        N = a(707),
        w = a.n(N),
        D = a(708),
        O = a.n(D),
        C = a(7),
        S = a.n(C);
      function k(e) {
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
          return d()(this, a);
        };
      }
      S.a.locale("nl");
      var A = (function(e) {
        u()(a, e);
        var t = k(a);
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
          c()(a, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.label,
                  a = e.className,
                  n = e.size,
                  r = e.divSize,
                  o = e.id,
                  c = e.value,
                  i = e.required,
                  l = e.readOnly,
                  s = e.name,
                  u = e.error,
                  m = e.errorMessage,
                  d = e.disabledBefore,
                  p = e.disabledAfter,
                  h = c ? S()(c).format("L") : "",
                  f = {};
                return (
                  d && (f.before = new Date(d)),
                  p && (f.after = new Date(p)),
                  v.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    v.a.createElement(
                      "div",
                      null,
                      v.a.createElement(
                        "label",
                        { htmlFor: o, className: "col-sm-6 ".concat(i) },
                        t
                      )
                    ),
                    v.a.createElement(
                      "div",
                      { className: "".concat(n) },
                      v.a.createElement(w.a, {
                        id: o,
                        value: h,
                        formatDate: D.formatDate,
                        parseDate: D.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: O.a,
                          disabledDays: f
                        },
                        inputProps: {
                          className:
                            "form-control input-sm ".concat(a) +
                            (this.state.errorDateFormat || u
                              ? " has-error"
                              : ""),
                          name: s,
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
                      v.a.createElement(
                        "div",
                        { className: "col-sm-offset-6 col-sm-6" },
                        v.a.createElement(
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
      })(E.Component);
      (A.defaultProps = {
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
        (A.propTypes = {
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
        (t.a = A);
    },
    700: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        c = a.n(o),
        i = a(703),
        l = a.n(i),
        s = function(e) {
          var t = e.label,
            a = e.size,
            n = e.id,
            o = e.name,
            c = e.value,
            i = e.onChangeAction,
            s = e.required,
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
                { htmlFor: n, className: "col-sm-6 ".concat(s) },
                t
              )
            ),
            r.a.createElement(
              "div",
              { className: "".concat(a) },
              r.a.createElement(l.a, {
                id: n,
                name: o,
                onChange: i,
                checked: c,
                disabled: d
              })
            )
          );
        };
      (s.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        required: "",
        disabled: !1,
        value: null
      }),
        (s.propTypes = {
          label: c.a.string.isRequired,
          type: c.a.string,
          size: c.a.string,
          divSize: c.a.string,
          id: c.a.string,
          name: c.a.string.isRequired,
          value: c.a.bool,
          onChangeAction: c.a.func,
          required: c.a.string,
          disabled: c.a.bool
        }),
        (t.a = s);
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
    703: function(e, t, a) {
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
        c = d(o),
        i = d(a(710)),
        l = d(a(8)),
        s = d(a(704)),
        u = d(a(705)),
        m = a(706);
      function d(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var p = (function(e) {
        function t(e) {
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, t);
          var a = (function(e, t) {
            if (!e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return !t || ("object" != typeof t && "function" != typeof t)
              ? e
              : t;
          })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
          return (
            (a.handleClick = a.handleClick.bind(a)),
            (a.handleTouchStart = a.handleTouchStart.bind(a)),
            (a.handleTouchMove = a.handleTouchMove.bind(a)),
            (a.handleTouchEnd = a.handleTouchEnd.bind(a)),
            (a.handleFocus = a.handleFocus.bind(a)),
            (a.handleBlur = a.handleBlur.bind(a)),
            (a.previouslyChecked = !(!e.checked && !e.defaultChecked)),
            (a.state = {
              checked: !(!e.checked && !e.defaultChecked),
              hasFocus: !1
            }),
            a
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
          r(t, [
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
                var t = this.input;
                if (e.target !== t && !this.moved)
                  return (
                    (this.previouslyChecked = t.checked),
                    e.preventDefault(),
                    t.focus(),
                    void t.click()
                  );
                var a = this.props.hasOwnProperty("checked")
                  ? this.props.checked
                  : t.checked;
                this.setState({ checked: a });
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
                  var t = (0, m.pointerCoord)(e).x;
                  this.state.checked && t + 15 < this.startX
                    ? (this.setState({ checked: !1 }),
                      (this.startX = t),
                      (this.activated = !0))
                    : t - 15 > this.startX &&
                      (this.setState({ checked: !0 }),
                      (this.startX = t),
                      (this.activated = t < this.startX + 5));
                }
              }
            },
            {
              key: "handleTouchEnd",
              value: function(e) {
                if (this.moved) {
                  var t = this.input;
                  if ((e.preventDefault(), this.startX)) {
                    var a = (0, m.pointerCoord)(e).x;
                    !0 === this.previouslyChecked && this.startX + 4 > a
                      ? this.previouslyChecked !== this.state.checked &&
                        (this.setState({ checked: !1 }),
                        (this.previouslyChecked = this.state.checked),
                        t.click())
                      : this.startX - 4 < a &&
                        this.previouslyChecked !== this.state.checked &&
                        (this.setState({ checked: !0 }),
                        (this.previouslyChecked = this.state.checked),
                        t.click()),
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
                var t = this.props.onFocus;
                t && t(e), this.setState({ hasFocus: !0 });
              }
            },
            {
              key: "handleBlur",
              value: function(e) {
                var t = this.props.onBlur;
                t && t(e), this.setState({ hasFocus: !1 });
              }
            },
            {
              key: "getIcon",
              value: function(e) {
                var a = this.props.icons;
                return a
                  ? void 0 === a[e]
                    ? t.defaultProps.icons[e]
                    : a[e]
                  : null;
              }
            },
            {
              key: "render",
              value: function() {
                var e = this,
                  t = this.props,
                  a = t.className,
                  r =
                    (t.icons,
                    (function(e, t) {
                      var a = {};
                      for (var n in e)
                        t.indexOf(n) >= 0 ||
                          (Object.prototype.hasOwnProperty.call(e, n) &&
                            (a[n] = e[n]));
                      return a;
                    })(t, ["className", "icons"])),
                  o = (0, i.default)(
                    "react-toggle",
                    {
                      "react-toggle--checked": this.state.checked,
                      "react-toggle--focus": this.state.hasFocus,
                      "react-toggle--disabled": this.props.disabled
                    },
                    a
                  );
                return c.default.createElement(
                  "div",
                  {
                    className: o,
                    onClick: this.handleClick,
                    onTouchStart: this.handleTouchStart,
                    onTouchMove: this.handleTouchMove,
                    onTouchEnd: this.handleTouchEnd
                  },
                  c.default.createElement(
                    "div",
                    { className: "react-toggle-track" },
                    c.default.createElement(
                      "div",
                      { className: "react-toggle-track-check" },
                      this.getIcon("checked")
                    ),
                    c.default.createElement(
                      "div",
                      { className: "react-toggle-track-x" },
                      this.getIcon("unchecked")
                    )
                  ),
                  c.default.createElement("div", {
                    className: "react-toggle-thumb"
                  }),
                  c.default.createElement(
                    "input",
                    n({}, r, {
                      ref: function(t) {
                        e.input = t;
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
          t
        );
      })(o.PureComponent);
      (t.default = p),
        (p.displayName = "Toggle"),
        (p.defaultProps = {
          icons: {
            checked: c.default.createElement(s.default, null),
            unchecked: c.default.createElement(u.default, null)
          }
        }),
        (p.propTypes = {
          checked: l.default.bool,
          disabled: l.default.bool,
          defaultChecked: l.default.bool,
          onChange: l.default.func,
          onFocus: l.default.func,
          onBlur: l.default.func,
          className: l.default.string,
          name: l.default.string,
          value: l.default.string,
          id: l.default.string,
          "aria-labelledby": l.default.string,
          "aria-label": l.default.string,
          icons: l.default.oneOfType([
            l.default.bool,
            l.default.shape({
              checked: l.default.node,
              unchecked: l.default.node
            })
          ])
        });
    },
    704: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        r = a(0),
        o = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
        return o.default.createElement(
          "svg",
          { width: "14", height: "11", viewBox: "0 0 14 11" },
          o.default.createElement("title", null, "switch-check"),
          o.default.createElement("path", {
            d:
              "M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",
            fill: "#fff",
            fillRule: "evenodd"
          })
        );
      };
    },
    705: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        r = a(0),
        o = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
        return o.default.createElement(
          "svg",
          { width: "10", height: "10", viewBox: "0 0 10 10" },
          o.default.createElement("title", null, "switch-x"),
          o.default.createElement("path", {
            d:
              "M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",
            fill: "#fff",
            fillRule: "evenodd"
          })
        );
      };
    },
    706: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.pointerCoord = function(e) {
          if (e) {
            var t = e.changedTouches;
            if (t && t.length > 0) {
              var a = t[0];
              return { x: a.clientX, y: a.clientY };
            }
            var n = e.pageX;
            if (void 0 !== n) return { x: n, y: e.pageY };
          }
          return { x: 0, y: 0 };
        });
    },
    709: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        c = a.n(o),
        i = a(714),
        l =
          (a(715),
          function(e) {
            var t = e.label,
              a = e.divSize,
              n = e.size,
              o = e.id,
              c = e.name,
              l = e.value,
              s = e.options,
              u = e.optionId,
              m = e.optionName,
              d = e.onChangeAction,
              p = e.required,
              h = e.multi,
              f = e.error,
              g = e.isLoading;
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
                r.a.createElement(i.a, {
                  id: o,
                  name: c,
                  value: l,
                  onChange: function(e) {
                    d(e || "", c);
                  },
                  options: s,
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
          label: c.a.string.isRequired,
          className: c.a.string,
          size: c.a.string,
          divSize: c.a.string,
          id: c.a.string,
          name: c.a.string.isRequired,
          options: c.a.array.isRequired,
          optionId: c.a.string,
          optionName: c.a.string,
          value: c.a.oneOfType([c.a.string, c.a.number]),
          onChangeAction: c.a.func,
          onBlurAction: c.a.func,
          required: c.a.string,
          readOnly: c.a.bool,
          error: c.a.bool,
          multi: c.a.bool,
          isLoading: c.a.bool
        }),
        (t.a = l);
    },
    713: function(e, t, a) {
      "use strict";
      t.a = function(e) {
        return (
          e || (e = 0),
          (e = parseFloat(e)),
          isNaN(e)
            ? "Ongeldig bedrag"
            : "€ ".concat(
                e.toLocaleString("nl", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              )
        );
      };
    },
    716: function(e, t, a) {
      "use strict";
      a.d(t, "h", function() {
        return n;
      }),
        a.d(t, "b", function() {
          return r;
        }),
        a.d(t, "v", function() {
          return o;
        }),
        a.d(t, "u", function() {
          return c;
        }),
        a.d(t, "x", function() {
          return i;
        }),
        a.d(t, "g", function() {
          return l;
        }),
        a.d(t, "i", function() {
          return s;
        }),
        a.d(t, "q", function() {
          return u;
        }),
        a.d(t, "a", function() {
          return m;
        }),
        a.d(t, "m", function() {
          return d;
        }),
        a.d(t, "w", function() {
          return p;
        }),
        a.d(t, "f", function() {
          return h;
        }),
        a.d(t, "k", function() {
          return f;
        }),
        a.d(t, "s", function() {
          return g;
        }),
        a.d(t, "d", function() {
          return E;
        }),
        a.d(t, "l", function() {
          return v;
        }),
        a.d(t, "t", function() {
          return b;
        }),
        a.d(t, "e", function() {
          return y;
        }),
        a.d(t, "n", function() {
          return N;
        }),
        a.d(t, "p", function() {
          return w;
        }),
        a.d(t, "o", function() {
          return D;
        }),
        a.d(t, "j", function() {
          return O;
        }),
        a.d(t, "r", function() {
          return C;
        }),
        a.d(t, "c", function() {
          return S;
        });
      var n = function(e) {
          return { type: "FETCH_CONTACT_DETAILS", payload: e };
        },
        r = function(e) {
          return { type: "DELETE_CONTACT", id: e };
        },
        o = function(e) {
          return { type: "UPDATE_PERSON", contactDetails: e };
        },
        c = function(e) {
          return { type: "UPDATE_ORGANISATION", contactDetails: e };
        },
        i = function(e) {
          return { type: "UPDATE_PORTAL_USER", portalUser: e };
        },
        l = function(e) {
          return { type: "DELETE_PORTAL_USER", id: e };
        },
        s = function(e) {
          return { type: "NEW_ADDRESS", address: e };
        },
        u = function(e) {
          return { type: "UPDATE_ADDRESS", address: e };
        },
        m = function(e) {
          return { type: "DELETE_ADDRESS", id: e };
        },
        d = function(e) {
          return { type: "NEW_PHONE_NUMBER", phoneNumber: e };
        },
        p = function(e) {
          return { type: "UPDATE_PHONE_NUMBER", phoneNumber: e };
        },
        h = function(e) {
          return { type: "DELETE_PHONE_NUMBER", id: e };
        },
        f = function(e) {
          return { type: "NEW_EMAIL_ADDRESS", emailAddress: e };
        },
        g = function(e) {
          return { type: "UPDATE_EMAIL_ADDRESS", emailAddress: e };
        },
        E = function(e) {
          return { type: "DELETE_EMAIL_ADDRESS", id: e };
        },
        v = function(e) {
          return { type: "NEW_CONTACT_NOTE", note: e };
        },
        b = function(e) {
          return { type: "UPDATE_CONTACT_NOTE", note: e };
        },
        y = function(e) {
          return { type: "DELETE_CONTACT_NOTE", id: e };
        },
        N = function() {
          return { type: "UNSET_PRIMARY_ADDRESSES" };
        },
        w = function() {
          return { type: "UNSET_PRIMARY_PHONE_NUMBERS" };
        },
        D = function() {
          return { type: "UNSET_PRIMARY_EMAIL_ADDRESSES" };
        },
        O = function(e) {
          return {
            type: "NEW_CONTACT_ENERGY_SUPPLIER",
            contactEnergySupplier: e
          };
        },
        C = function(e) {
          return {
            type: "UPDATE_CONTACT_ENERGY_SUPPLIER",
            contactEnergySupplier: e
          };
        },
        S = function(e) {
          return { type: "DELETE_CONTACT_ENERGY_SUPPLIER", id: e };
        };
    },
    744: function(e, t, a) {
      "use strict";
      var n = a(2),
        r = a.n(n),
        o = "".concat(URL_API, "/api/organisation");
      t.a = {
        newOrganisation: function(e) {
          var t = "".concat(o),
            a = "Bearer " + localStorage.getItem("access_token");
          return (
            (r.a.defaults.headers.common.Authorization = a),
            r.a
              .post(t, e)
              .then(function(e) {
                return e.data.data;
              })
              .catch(function(e) {
                console.log(e);
              })
          );
        },
        updateOrganisation: function(e) {
          var t = "".concat(o, "/").concat(e.id),
            a = "Bearer " + localStorage.getItem("access_token");
          return (
            (r.a.defaults.headers.common.Authorization = a), r.a.post(t, e)
          );
        },
        getOrganisationPeek: function() {
          var e = "".concat(o, "/peek"),
            t = "Bearer " + localStorage.getItem("access_token");
          return (
            (r.a.defaults.headers.common.Authorization = t),
            r.a
              .get(e)
              .then(function(e) {
                return e.data.data;
              })
              .catch(function(e) {
                console.log(e);
              })
          );
        }
      };
    },
    774: function(e, t, a) {
      "use strict";
      a.d(t, "a", function() {
        return n;
      }),
        a.d(t, "d", function() {
          return r;
        }),
        a.d(t, "b", function() {
          return o;
        }),
        a.d(t, "c", function() {
          return c;
        });
      var n = function(e) {
          return { type: "ADD_CONTACT_TO_GROUP", contact: e };
        },
        r = function(e, t, a) {
          return {
            type: "FETCH_CONTACT_GROUPS",
            filters: e,
            sorts: t,
            pagination: a
          };
        },
        o = function() {
          return { type: "CLEAR_CONTACT_GROUPS" };
        },
        c = function(e, t) {
          return { type: "DELETE_CONTACT_GROUP", id: e, successAction: t };
        };
    },
    870: function(e, t, a) {
      "use strict";
      var n = a(2),
        r = a.n(n),
        o = "".concat(URL_API, "/api/person");
      t.a = {
        newPerson: function(e) {
          var t = "".concat(o),
            a = "Bearer " + localStorage.getItem("access_token");
          return (
            (r.a.defaults.headers.common.Authorization = a), r.a.post(t, e)
          );
        },
        updatePerson: function(e) {
          var t = "".concat(o, "/").concat(e.id),
            a = "Bearer " + localStorage.getItem("access_token");
          return (
            (r.a.defaults.headers.common.Authorization = a), r.a.post(t, e)
          );
        },
        getPersonPeek: function() {
          var e = "".concat(o, "/peek"),
            t = "Bearer " + localStorage.getItem("access_token");
          return (
            (r.a.defaults.headers.common.Authorization = t),
            r.a
              .get(e)
              .then(function(e) {
                return e.data.data;
              })
              .catch(function(e) {
                console.log(e);
              })
          );
        },
        makePrimary: function(e) {
          var t = "".concat(o, "/").concat(e.id),
            a = "Bearer " + localStorage.getItem("access_token");
          return (
            (r.a.defaults.headers.common.Authorization = a),
            r.a
              .post(t, e)
              .then(function(e) {
                return e.data.data;
              })
              .catch(function(e) {
                console.log(e);
              })
          );
        }
      };
    }
  }
]);
