(window.webpackJsonp = window.webpackJsonp || []).push([
  [28],
  {
    1448: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(0),
        r = a.n(n),
        s = a(24),
        o = a.n(s),
        i = a(25),
        l = a.n(i),
        c = a(26),
        u = a.n(c),
        d = a(27),
        m = a.n(d),
        p = a(16),
        h = a.n(p),
        f = a(4),
        g = a(693),
        v = a(690),
        y = a(691);
      function b(e) {
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
          return m()(this, a);
        };
      }
      var E = (function(e) {
          u()(a, e);
          var t = b(a);
          function a(e) {
            return o()(this, a), t.call(this, e);
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    "div",
                    { className: "row" },
                    r.a.createElement(
                      v.a,
                      null,
                      r.a.createElement(
                        y.a,
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
                            r.a.createElement(g.a, {
                              iconName: "glyphicon-arrow-left",
                              onClickAction: f.e.goBack
                            })
                          )
                        ),
                        r.a.createElement(
                          "div",
                          { className: "col-md-4" },
                          r.a.createElement(
                            "h4",
                            { className: "text-center margin-small" },
                            "Nieuw contact"
                          )
                        ),
                        r.a.createElement("div", { className: "col-md-4" })
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        N = a(22),
        C = a.n(N),
        k = a(6),
        A = a.n(k),
        w = a(32),
        I = a(7),
        O = a.n(I),
        P = a(697),
        D = a.n(P),
        S = a(870),
        T = a(694),
        x = a(696),
        R = a(699),
        z = a(692),
        j = a(702),
        M = a(700),
        q = a(698);
      function B(e) {
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
          return m()(this, a);
        };
      }
      var _ = (function(e) {
          u()(a, e);
          var t = B(a);
          function a(e) {
            return o()(this, a), t.call(this, e);
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.props.address,
                    t = e.street,
                    a = e.number,
                    n = e.addition,
                    s = e.postalCode,
                    o = e.city,
                    i = e.typeId,
                    l = e.primary,
                    c = e.countryId;
                  return r.a.createElement(
                    v.a,
                    { className: "panel-grey" },
                    r.a.createElement(
                      y.a,
                      null,
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(T.a, {
                          label: "Postcode",
                          size: "col-sm-4",
                          name: "postalCode",
                          value: s,
                          onChangeAction: this.props.handleInputPicoChange,
                          required: "required",
                          error: this.props.errors.postalCode
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
                                (this.props.errors.number ? "has-error" : ""),
                              id: "number",
                              name: "number",
                              value: a,
                              onChange: this.props.handleInputPicoChange
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
                              onChange: this.props.handleInputChange
                            })
                          )
                        )
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(T.a, {
                          label: "Adres",
                          id: "adres",
                          size: "col-sm-6",
                          name: "street",
                          value: t,
                          onChangeAction: this.props.handleInputChange
                        }),
                        r.a.createElement(T.a, {
                          label: "Plaats",
                          id: "plaats",
                          size: "col-sm-6",
                          name: "city",
                          value: o,
                          onChangeAction: this.props.handleInputChange
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(x.a, {
                          label: "Type",
                          id: "type",
                          size: "col-sm-6",
                          name: "typeId",
                          options: this.props.addressTypes,
                          value: i,
                          onChangeAction: this.props.handleInputChange,
                          required: "required",
                          error: this.props.errors.typeId
                        }),
                        r.a.createElement(M.a, {
                          label: "Primair adres",
                          name: "primary",
                          value: l,
                          onChangeAction: this.props.handleInputChange
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(x.a, {
                          label: "Land",
                          id: "countryId",
                          size: "col-sm-6",
                          name: "countryId",
                          options: this.props.countries,
                          value: c,
                          onChangeAction: this.props.handleInputChange,
                          error: this.props.errors.countryId
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
        L = Object(w.b)(function(e) {
          return {
            addressTypes: e.systemData.addressTypes,
            countries: e.systemData.countries
          };
        })(_);
      function F(e) {
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
          return m()(this, a);
        };
      }
      var X = (function(e) {
          u()(a, e);
          var t = F(a);
          function a(e) {
            return o()(this, a), t.call(this, e);
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.props.emailAddress,
                    t = e.email,
                    a = e.typeId,
                    n = e.primary;
                  return r.a.createElement(
                    v.a,
                    { className: "panel-grey" },
                    r.a.createElement(
                      y.a,
                      null,
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(T.a, {
                          label: "E-mail",
                          id: "email",
                          size: "col-sm-6",
                          name: "email",
                          value: t,
                          onChangeAction: this.props.handleInputChange,
                          required: "required",
                          error: this.props.errors.email
                        }),
                        r.a.createElement(x.a, {
                          label: "Type",
                          id: "type",
                          size: "col-sm-6",
                          name: "typeId",
                          options: this.props.emailAddressTypes,
                          value: a,
                          onChangeAction: this.props.handleInputChange,
                          required: "required",
                          error: this.props.errors.typeId
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(M.a, {
                          label: "Primair e-mailadres",
                          name: "primary",
                          value: n,
                          onChangeAction: this.props.handleInputChange
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
        Y = Object(w.b)(function(e) {
          return { emailAddressTypes: e.systemData.emailAddressTypes };
        })(X);
      function H(e) {
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
          return m()(this, a);
        };
      }
      var U = (function(e) {
          u()(a, e);
          var t = H(a);
          function a(e) {
            return o()(this, a), t.call(this, e);
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.props.phoneNumber,
                    t = e.number,
                    a = e.typeId,
                    n = e.primary;
                  return r.a.createElement(
                    v.a,
                    { className: "panel-grey" },
                    r.a.createElement(
                      y.a,
                      null,
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(T.a, {
                          label: "Nummer",
                          size: "col-sm-6",
                          name: "number",
                          value: t,
                          onChangeAction: this.props.handleInputChange,
                          required: "required",
                          error: this.props.errors.number
                        }),
                        r.a.createElement(x.a, {
                          label: "Type",
                          size: "col-sm-6",
                          name: "typeId",
                          options: this.props.phoneNumberTypes,
                          value: a,
                          onChangeAction: this.props.handleInputChange,
                          required: "required",
                          error: this.props.errors.typeId
                        })
                      ),
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(M.a, {
                          label: "Primair telefoonnummer",
                          name: "primary",
                          value: n,
                          onChangeAction: this.props.handleInputChange
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
        V = Object(w.b)(function(e) {
          return { phoneNumberTypes: e.systemData.phoneNumberTypes };
        })(U),
        G = a(217),
        W = a(100);
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
          return m()(this, a);
        };
      }
      var K = (function(e) {
        u()(a, e);
        var t = J(a);
        function a(e) {
          return o()(this, a), t.call(this, e);
        }
        return (
          l()(a, [
            {
              key: "render",
              value: function() {
                return r.a.createElement(
                  W.a,
                  {
                    modalClassName: "modal-lg",
                    buttonConfirmText: "Aanmaken",
                    closeModal: this.props.closeModal,
                    confirmAction: this.props.confirmAction,
                    title: "Duplicaat gevonden"
                  },
                  r.a.createElement("span", null, this.props.duplicateText)
                );
              }
            }
          ]),
          a
        );
      })(n.Component);
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
      function Z(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Q(Object(a), !0).forEach(function(t) {
                A()(e, t, a[t]);
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
            n = h()(e);
          if (t) {
            var r = h()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return m()(this, a);
        };
      }
      var ee = (function(e) {
          u()(a, e);
          var t = $(a);
          function a(e) {
            var n;
            return (
              o()(this, a),
              (n = t.call(this, e)),
              A()(C()(n), "toggleAddress", function() {
                n.setState({ showAddress: !n.state.showAddress });
              }),
              A()(C()(n), "toggleEmail", function() {
                n.setState({ showEmail: !n.state.showEmail });
              }),
              A()(C()(n), "togglePhone", function() {
                n.setState({ showPhone: !n.state.showPhone });
              }),
              A()(C()(n), "toggleShowConfirmDuplicate", function() {
                n.setState({
                  showConfirmDuplicate: !n.state.showConfirmDuplicate,
                  buttonLoading: !1
                });
              }),
              A()(C()(n), "addressHandleInputPicoChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Z(
                    Z({}, n.state),
                    {},
                    { address: Z(Z({}, n.state.address), {}, A()({}, r, a)) }
                  )
                ),
                  setTimeout(function() {
                    var e = n.state.address;
                    !D.a.isEmpty(e.postalCode) &&
                      D.a.isPostalCode(e.postalCode, "NL") &&
                      !D.a.isEmpty(e.number) &&
                      D.a.isEmpty(e.city) &&
                      D.a.isEmpty(e.street) &&
                      G.a
                        .getPicoAddress(e.postalCode, e.number)
                        .then(function(e) {
                          n.setState(
                            Z(
                              Z({}, n.state),
                              {},
                              {
                                address: Z(
                                  Z({}, n.state.address),
                                  {},
                                  { street: e.street, city: e.city }
                                )
                              }
                            )
                          );
                        });
                  }, 100);
              }),
              A()(C()(n), "addressHandleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Z(
                    Z({}, n.state),
                    {},
                    { address: Z(Z({}, n.state.address), {}, A()({}, r, a)) }
                  )
                );
              }),
              A()(C()(n), "emailAddressHandleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Z(
                    Z({}, n.state),
                    {},
                    {
                      emailAddress: Z(
                        Z({}, n.state.emailAddress),
                        {},
                        A()({}, r, a)
                      )
                    }
                  )
                );
              }),
              A()(C()(n), "phoneHandleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Z(
                    Z({}, n.state),
                    {},
                    {
                      phoneNumber: Z(
                        Z({}, n.state.phoneNumber),
                        {},
                        A()({}, r, a)
                      )
                    }
                  )
                );
              }),
              A()(C()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Z(
                    Z({}, n.state),
                    {},
                    { person: Z(Z({}, n.state.person), {}, A()({}, r, a)) }
                  )
                );
              }),
              A()(C()(n), "handleInputChangeDate", function(e, t) {
                n.setState(
                  Z(
                    Z({}, n.state),
                    {},
                    { person: Z(Z({}, n.state.person), {}, A()({}, t, e)) }
                  )
                );
              }),
              A()(C()(n), "confirmDuplicate", function() {
                n.handleSubmit("dontCheckDuplicates");
              }),
              A()(C()(n), "handleSubmit", function(e) {
                var t = !0;
                "dontCheckDuplicates" === e
                  ? (t = !1)
                  : e && e.preventDefault();
                var a = n.state.person,
                  r = {},
                  s = !1;
                D.a.isEmpty(a.firstName) &&
                  D.a.isEmpty(a.lastName) &&
                  ((r.name = !0), (s = !0));
                var o = n.state.address;
                o.postalCode && (o.postalCode = o.postalCode.toUpperCase());
                var i = {};
                if (!D.a.isEmpty(o.postalCode)) {
                  var l = o.countryId;
                  D.a.isEmpty(o.countryId + "") && (l = "NL");
                  D.a.isEmpty(o.postalCode + "") ||
                    ("NL" == l
                      ? D.a.isPostalCode(o.postalCode, "NL")
                      : D.a.isPostalCode(o.postalCode, "any")) ||
                    ((i.postalCode = !0), (i.countryId = !0), (s = !0)),
                    D.a.isEmpty(o.number) && ((i.number = !0), (s = !0)),
                    D.a.isEmpty(o.typeId) && ((i.typeId = !0), (s = !0));
                }
                var c = n.state.phoneNumber,
                  u = {};
                D.a.isEmpty(c.number) ||
                  (D.a.isEmpty(c.number) && ((u.number = !0), (s = !0)),
                  D.a.isEmpty(c.typeId) && ((u.typeId = !0), (s = !0)));
                var d = n.state.emailAddress,
                  m = {};
                if (
                  (D.a.isEmpty(d.email) ||
                    (D.a.isEmail(d.email) || ((m.email = !0), (s = !0)),
                    D.a.isEmpty(d.typeId) && ((m.typeId = !0), (s = !0))),
                  n.setState(
                    Z(
                      Z({}, n.state),
                      {},
                      {
                        errors: r,
                        addressErrors: i,
                        phoneErrors: u,
                        emailErrors: m
                      }
                    )
                  ),
                  !s)
                ) {
                  if (n.state.buttonLoading) return !1;
                  n.setState({ buttonLoading: !0 }),
                    S.a
                      .newPerson({
                        person: a,
                        address: o,
                        emailAddress: d,
                        phoneNumber: c,
                        checkDuplicates: t
                      })
                      .then(function(e) {
                        f.f.push("/contact/".concat(e.data.data.id));
                      })
                      .catch(function(e) {
                        409 === e.response.status &&
                          (n.setState(
                            Z(
                              Z({}, n.state),
                              {},
                              { duplicateText: e.response.data.message }
                            )
                          ),
                          n.toggleShowConfirmDuplicate());
                      });
                }
              }),
              (n.state = {
                buttonLoading: !1,
                showAddress: !1,
                showEmail: !1,
                showPhone: !1,
                showConfirmDuplicate: !1,
                duplicateText: "",
                person: {
                  id: "",
                  number: "",
                  createdAt: "",
                  titleId: "",
                  initials: "",
                  firstName: "",
                  lastNamePrefixId: "",
                  lastName: "",
                  memberSince: "",
                  memberUntil: "",
                  dateOfBirth: "",
                  ownerId: e.userId,
                  didAgreeAvg: !1
                },
                address: {
                  street: "",
                  number: "",
                  addition: "",
                  postalCode: "",
                  city: "",
                  typeId: "visit",
                  primary: !0,
                  countryId: ""
                },
                emailAddress: { email: "", typeId: "home", primary: !0 },
                phoneNumber: { number: "", typeId: "home", primary: !0 },
                errors: { name: !1 },
                addressErrors: {
                  typeId: !1,
                  postalCode: !1,
                  number: !1,
                  countryId: !1
                },
                emailErrors: { typeId: !1, email: !1 },
                phoneErrors: { typeId: !1, number: !1 }
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.person,
                    t = e.titleId,
                    a = e.initials,
                    n = e.firstName,
                    s = e.lastNamePrefixId,
                    o = e.lastName,
                    i = (e.memberSince, e.dateOfBirth),
                    l = e.ownerId,
                    c = e.didAgreeAvg;
                  return r.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(T.a, {
                        label: "Contactnummer",
                        name: "number",
                        readOnly: !0,
                        value: ""
                      }),
                      r.a.createElement(T.a, {
                        label: "Gemaakt op",
                        name: "createdAt",
                        value: O()().format("DD-MM-Y"),
                        readOnly: !0
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(x.a, {
                        label: "Aanspreektitel",
                        name: "titleId",
                        options: this.props.titles,
                        value: t,
                        onChangeAction: this.handleInputChange
                      }),
                      r.a.createElement(R.a, {
                        label: "Geboortedatum",
                        name: "dateOfBirth",
                        value: i,
                        onChangeAction: this.handleInputChangeDate
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(T.a, {
                        label: "Voorletters",
                        size: "col-sm-6",
                        name: "initials",
                        value: a,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(T.a, {
                        label: "Voornaam",
                        size: "col-sm-6",
                        name: "firstName",
                        value: n,
                        onChangeAction: this.handleInputChange,
                        required: "" === o && "required",
                        error: this.state.errors.name
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(x.a, {
                        label: "Tussenvoegsel",
                        name: "lastNamePrefixId",
                        options: this.props.lastNamePrefixes,
                        value: s,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(T.a, {
                        label: "Achternaam",
                        size: "col-sm-6",
                        name: "lastName",
                        value: o,
                        onChangeAction: this.handleInputChange,
                        required: "" === n && "required",
                        error: this.state.errors.name
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(x.a, {
                        label: "Eigenaar",
                        size: "col-sm-6",
                        name: "ownerId",
                        options: this.props.users,
                        value: l,
                        optionName: "fullName",
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(M.a, {
                        label: "Akkoord privacybeleid",
                        name: "didAgreeAvg",
                        value: c,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "margin-10-top" },
                      r.a.createElement(
                        q.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "row", onClick: this.toggleAddress },
                          this.state.showAddress
                            ? r.a.createElement("span", {
                                className: "glyphicon glyphicon-menu-down"
                              })
                            : r.a.createElement("span", {
                                className: "glyphicon glyphicon-menu-right"
                              }),
                          r.a.createElement(
                            "span",
                            { className: "h5" },
                            "Adres"
                          )
                        )
                      ),
                      this.state.showAddress &&
                        r.a.createElement(L, {
                          address: this.state.address,
                          errors: this.state.addressErrors,
                          handleInputPicoChange: this
                            .addressHandleInputPicoChange,
                          handleInputChange: this.addressHandleInputChange
                        })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "margin-10-top" },
                      r.a.createElement(
                        q.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "row", onClick: this.toggleEmail },
                          this.state.showEmail
                            ? r.a.createElement("span", {
                                className: "glyphicon glyphicon-menu-down"
                              })
                            : r.a.createElement("span", {
                                className: "glyphicon glyphicon-menu-right"
                              }),
                          r.a.createElement(
                            "span",
                            { className: "h5" },
                            "E-mail"
                          )
                        )
                      ),
                      this.state.showEmail &&
                        r.a.createElement(Y, {
                          emailAddress: this.state.emailAddress,
                          errors: this.state.emailErrors,
                          handleInputChange: this.emailAddressHandleInputChange
                        })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "margin-10-top" },
                      r.a.createElement(
                        q.a,
                        null,
                        r.a.createElement(
                          "div",
                          { className: "row", onClick: this.togglePhone },
                          this.state.showPhone
                            ? r.a.createElement("span", {
                                className: "glyphicon glyphicon-menu-down"
                              })
                            : r.a.createElement("span", {
                                className: "glyphicon glyphicon-menu-right"
                              }),
                          r.a.createElement(
                            "span",
                            { className: "h5" },
                            "Telefoonnummer"
                          )
                        )
                      ),
                      this.state.showPhone &&
                        r.a.createElement(V, {
                          phoneNumber: this.state.phoneNumber,
                          errors: this.state.phoneErrors,
                          handleInputChange: this.phoneHandleInputChange
                        })
                    ),
                    r.a.createElement(
                      j.a,
                      null,
                      r.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        r.a.createElement(z.a, {
                          loading: this.state.buttonLoading,
                          loadText: "Persoon wordt aangemaakt.",
                          buttonText: "Opslaan",
                          onClickAction: this.handleSubmit,
                          type: "submit",
                          value: "Submit"
                        })
                      )
                    ),
                    this.state.showConfirmDuplicate &&
                      r.a.createElement(K, {
                        closeModal: this.toggleShowConfirmDuplicate,
                        confirmAction: this.confirmDuplicate,
                        duplicateText: this.state.duplicateText
                      })
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        te = Object(w.b)(function(e) {
          return {
            lastNamePrefixes: e.systemData.lastNamePrefixes,
            occupations: e.systemData.occupations,
            users: e.systemData.users,
            titles: e.systemData.titles,
            userId: e.meDetails.id
          };
        })(ee),
        ae = a(744),
        ne = a(747);
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
                A()(e, t, a[t]);
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
      function oe(e) {
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
          return m()(this, a);
        };
      }
      var ie = (function(e) {
          u()(a, e);
          var t = oe(a);
          function a(e) {
            var n;
            return (
              o()(this, a),
              (n = t.call(this, e)),
              A()(C()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  se(
                    se({}, n.state),
                    {},
                    {
                      organisation: se(
                        se({}, n.state.organisation),
                        {},
                        A()({}, r, a)
                      )
                    }
                  )
                );
              }),
              A()(C()(n), "handleInputChangeDate", function(e, t) {
                n.setState(
                  se(
                    se({}, n.state),
                    {},
                    {
                      organisation: se(
                        se({}, n.state.organisation),
                        {},
                        A()({}, t, e)
                      )
                    }
                  )
                );
              }),
              A()(C()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.organisation,
                  a = {},
                  r = !1;
                if (
                  (D.a.isEmpty(t.name) && ((a.name = !0), (r = !0)),
                  D.a.isEmpty(t.iban) ||
                    ne.isValidIBAN(t.iban) ||
                    ((a.iban = !0), (r = !0)),
                  n.setState(se(se({}, n.state), {}, { errors: a })),
                  !r)
                ) {
                  if (n.state.buttonLoading) return !1;
                  n.setState({ buttonLoading: !0 }),
                    ae.a.newOrganisation(t).then(function(e) {
                      f.f.push("/contact/".concat(e.id));
                    });
                }
              }),
              (n.state = {
                buttonLoading: !1,
                organisation: {
                  id: "",
                  number: "",
                  createdAt: "",
                  name: "",
                  chamberOfCommerceNumber: "",
                  vatNumber: "",
                  memberSince: "",
                  memberUntil: "",
                  website: "",
                  iban: "",
                  ibanAttn: "",
                  ownerId: e.userId,
                  didAgreeAvg: !1
                },
                errors: { name: !1, iban: !1 }
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
                    t = e.name,
                    a = e.chamberOfCommerceNumber,
                    n = e.vatNumber,
                    s = (e.memberSince, e.website),
                    o = e.iban,
                    i = e.ibanAttn,
                    l = e.ownerId,
                    c = e.didAgreeAvg;
                  return r.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(T.a, {
                        label: "Contactnummer",
                        name: "number",
                        value: "",
                        readOnly: !0
                      }),
                      r.a.createElement(T.a, {
                        label: "Gemaakt op",
                        name: "createdAt",
                        value: O()().format("DD-MM-Y"),
                        readOnly: !0
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(T.a, {
                        label: "Naam",
                        name: "name",
                        value: t,
                        onChangeAction: this.handleInputChange,
                        required: "required",
                        error: this.state.errors.name
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(T.a, {
                        label: "KvK",
                        size: "col-sm-6",
                        name: "chamberOfCommerceNumber",
                        value: a,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(T.a, {
                        label: "Btw nummer",
                        name: "vatNumber",
                        value: n,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(T.a, {
                        label: "IBAN",
                        name: "iban",
                        value: o,
                        onChangeAction: this.handleInputChange,
                        error: this.state.errors.iban
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(T.a, {
                        label: "IBAN t.n.v.",
                        name: "ibanAttn",
                        value: i,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(T.a, {
                        label: "Website",
                        name: "website",
                        value: s,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(x.a, {
                        label: "Eigenaar",
                        size: "col-sm-6",
                        name: "ownerId",
                        options: this.props.users,
                        value: l,
                        optionName: "fullName",
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(M.a, {
                        label: "Akkoord privacybeleid",
                        name: "didAgreeAvg",
                        value: c,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    r.a.createElement(
                      j.a,
                      null,
                      r.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        r.a.createElement(z.a, {
                          loading: this.state.buttonLoading,
                          loadText: "Organisatie wordt aangemaakt.",
                          buttonText: "Opslaan",
                          onClickAction: this.handleSubmit
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
        le = Object(w.b)(function(e) {
          return { users: e.systemData.users, userId: e.meDetails.id };
        })(ie),
        ce = function(e) {
          return r.a.createElement(
            v.a,
            { className: "panel-grey" },
            r.a.createElement(
              y.a,
              null,
              r.a.createElement(
                "div",
                { className: "col-md-12" },
                "persoon" === e.type && r.a.createElement(te, null),
                "organisatie" === e.type && r.a.createElement(le, null)
              )
            )
          );
        },
        ue = function(e) {
          return r.a.createElement(
            "div",
            null,
            r.a.createElement(ce, {
              type: e.type,
              organisationId: e.organisationId
            })
          );
        };
      t.default = function(e) {
        return r.a.createElement(
          "div",
          { className: "row" },
          r.a.createElement(
            "div",
            { className: "col-md-9" },
            r.a.createElement(
              "div",
              { className: "col-md-12 margin-10-top" },
              r.a.createElement(E, null)
            ),
            r.a.createElement(
              "div",
              { className: "col-md-12 margin-10-top" },
              r.a.createElement(ue, { type: e.params.type })
            )
          )
        );
      };
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = function(e) {
          var t = e.children,
            a = e.className,
            n = e.onMouseEnter,
            s = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: s
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
          className: o.a.string,
          onMouseEnter: o.a.func,
          onMouseLeave: o.a.func
        }),
        (t.a = i);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
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
        (i.propTypes = { className: o.a.string }),
        (t.a = i);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            s = e.type,
            o = e.value,
            i = e.loading,
            l = e.loadText,
            c = e.disabled;
          return i
            ? r.a.createElement(
                "button",
                {
                  type: s,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: o,
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
                  type: s,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: o,
                  disabled: c
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
          buttonClassName: o.a.string,
          buttonText: o.a.string.isRequired,
          onClickAction: o.a.func,
          type: o.a.string,
          value: o.a.string,
          loading: o.a.bool,
          loadText: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = i);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            s = e.title,
            o = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: o,
              title: s
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
          buttonClassName: o.a.string,
          iconName: o.a.string.isRequired,
          onClickAction: o.a.func,
          title: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = i);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            s = e.size,
            o = e.id,
            i = e.placeholder,
            l = e.name,
            c = e.value,
            u = e.onClickAction,
            d = e.onChangeAction,
            m = e.onBlurAction,
            p = e.required,
            h = e.readOnly,
            f = e.maxLength,
            g = e.error,
            v = e.min,
            y = e.max,
            b = e.step,
            E = e.errorMessage,
            N = e.divSize,
            C = e.divClassName,
            k = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(N, " ").concat(C) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(p) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(s) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (g ? "has-error" : ""),
                id: o,
                placeholder: i,
                name: l,
                value: c,
                onClick: u,
                onChange: d,
                onBlur: m,
                readOnly: h,
                maxLength: f,
                min: v,
                max: y,
                autoComplete: k,
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
                  E
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
          label: o.a.oneOfType([o.a.string, o.a.object]).isRequired,
          type: o.a.string,
          className: o.a.string,
          divClassName: o.a.string,
          size: o.a.string,
          divSize: o.a.string,
          id: o.a.string,
          placeholder: o.a.string,
          name: o.a.string.isRequired,
          value: o.a.oneOfType([o.a.string, o.a.number]),
          onClickAction: o.a.func,
          onChangeAction: o.a.func,
          onBlurAction: o.a.func,
          required: o.a.string,
          readOnly: o.a.bool,
          maxLength: o.a.string,
          error: o.a.bool,
          min: o.a.string,
          max: o.a.string,
          step: o.a.string,
          errorMessage: o.a.string,
          autoComplete: o.a.string
        }),
        (t.a = i);
    },
    696: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = function(e) {
          var t = e.label,
            a = e.className,
            n = e.size,
            s = e.id,
            o = e.name,
            i = e.value,
            l = e.options,
            c = e.onChangeAction,
            u = e.onBlurAction,
            d = e.required,
            m = e.error,
            p = e.errorMessage,
            h = e.optionValue,
            f = e.optionName,
            g = e.readOnly,
            v = e.placeholder,
            y = e.divClassName,
            b = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(y) },
            r.a.createElement(
              "label",
              { htmlFor: s, className: "col-sm-6 ".concat(d) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-6" },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(a) + (m && " has-error"),
                  id: s,
                  name: o,
                  value: i,
                  onChange: c,
                  onBlur: u,
                  readOnly: g
                },
                b && r.a.createElement("option", { value: "" }, v),
                l.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[h], value: e[h] },
                    e[f]
                  );
                })
              )
            ),
            m &&
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
        (t.a = i);
    },
    698: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
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
        (i.propTypes = { className: o.a.string }),
        (t.a = i);
    },
    699: function(e, t, a) {
      "use strict";
      var n = a(24),
        r = a.n(n),
        s = a(25),
        o = a.n(s),
        i = a(22),
        l = a.n(i),
        c = a(26),
        u = a.n(c),
        d = a(27),
        m = a.n(d),
        p = a(16),
        h = a.n(p),
        f = a(6),
        g = a.n(f),
        v = a(0),
        y = a.n(v),
        b = a(8),
        E = a.n(b),
        N = a(707),
        C = a.n(N),
        k = a(708),
        A = a.n(k),
        w = a(7),
        I = a.n(w);
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
            n = h()(e);
          if (t) {
            var r = h()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return m()(this, a);
        };
      }
      I.a.locale("nl");
      var P = (function(e) {
        u()(a, e);
        var t = O(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            g()(l()(n), "validateDate", function(e) {
              var t = I()(e.target.value, "DD-MM-YYYY", !0),
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
              var t = e ? I()(e).format("Y-MM-DD") : "",
                a = !1;
              t &&
                n.props.disabledBefore &&
                I()(t).isBefore(n.props.disabledBefore) &&
                (a = !0),
                t &&
                  n.props.disabledAfter &&
                  I()(t).isAfter(n.props.disabledAfter) &&
                  (a = !0),
                n.setState({ errorDateFormat: a }),
                !a && n.props.onChangeAction(t, n.props.name);
            }),
            (n.state = { errorDateFormat: !1 }),
            n
          );
        }
        return (
          o()(a, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.label,
                  a = e.className,
                  n = e.size,
                  r = e.divSize,
                  s = e.id,
                  o = e.value,
                  i = e.required,
                  l = e.readOnly,
                  c = e.name,
                  u = e.error,
                  d = e.errorMessage,
                  m = e.disabledBefore,
                  p = e.disabledAfter,
                  h = o ? I()(o).format("L") : "",
                  f = {};
                return (
                  m && (f.before = new Date(m)),
                  p && (f.after = new Date(p)),
                  y.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    y.a.createElement(
                      "div",
                      null,
                      y.a.createElement(
                        "label",
                        { htmlFor: s, className: "col-sm-6 ".concat(i) },
                        t
                      )
                    ),
                    y.a.createElement(
                      "div",
                      { className: "".concat(n) },
                      y.a.createElement(C.a, {
                        id: s,
                        value: h,
                        formatDate: k.formatDate,
                        parseDate: k.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: A.a,
                          disabledDays: f
                        },
                        inputProps: {
                          className:
                            "form-control input-sm ".concat(a) +
                            (this.state.errorDateFormat || u
                              ? " has-error"
                              : ""),
                          name: c,
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
                      y.a.createElement(
                        "div",
                        { className: "col-sm-offset-6 col-sm-6" },
                        y.a.createElement(
                          "span",
                          { className: "has-error-message" },
                          " ",
                          d
                        )
                      )
                  )
                );
              }
            }
          ]),
          a
        );
      })(v.Component);
      (P.defaultProps = {
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
        (P.propTypes = {
          label: E.a.string.isRequired,
          type: E.a.string,
          className: E.a.string,
          size: E.a.string,
          divSize: E.a.string,
          id: E.a.string,
          name: E.a.string,
          value: E.a.oneOfType([E.a.string, E.a.object]),
          onChangeAction: E.a.func,
          required: E.a.string,
          readOnly: E.a.bool,
          error: E.a.bool,
          errorMessage: E.a.string,
          disabledBefore: E.a.string,
          disabledAfter: E.a.string
        }),
        (t.a = P);
    },
    700: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
        i = a(703),
        l = a.n(i),
        c = function(e) {
          var t = e.label,
            a = e.size,
            n = e.id,
            s = e.name,
            o = e.value,
            i = e.onChangeAction,
            c = e.required,
            u = e.divSize,
            d = e.className,
            m = e.disabled;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(u, " ").concat(d) },
            r.a.createElement(
              "div",
              null,
              r.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(c) },
                t
              )
            ),
            r.a.createElement(
              "div",
              { className: "".concat(a) },
              r.a.createElement(l.a, {
                id: n,
                name: s,
                onChange: i,
                checked: o,
                disabled: m
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
        (t.a = c);
    },
    702: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        o = a.n(s),
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
        (i.propTypes = { className: o.a.string }),
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
        s = a(0),
        o = m(s),
        i = m(a(710)),
        l = m(a(8)),
        c = m(a(704)),
        u = m(a(705)),
        d = a(706);
      function m(e) {
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
                (this.startX = (0, d.pointerCoord)(e).x), (this.activated = !0);
              }
            },
            {
              key: "handleTouchMove",
              value: function(e) {
                if (this.activated && ((this.moved = !0), this.startX)) {
                  var t = (0, d.pointerCoord)(e).x;
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
                    var a = (0, d.pointerCoord)(e).x;
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
                  s = (0, i.default)(
                    "react-toggle",
                    {
                      "react-toggle--checked": this.state.checked,
                      "react-toggle--focus": this.state.hasFocus,
                      "react-toggle--disabled": this.props.disabled
                    },
                    a
                  );
                return o.default.createElement(
                  "div",
                  {
                    className: s,
                    onClick: this.handleClick,
                    onTouchStart: this.handleTouchStart,
                    onTouchMove: this.handleTouchMove,
                    onTouchEnd: this.handleTouchEnd
                  },
                  o.default.createElement(
                    "div",
                    { className: "react-toggle-track" },
                    o.default.createElement(
                      "div",
                      { className: "react-toggle-track-check" },
                      this.getIcon("checked")
                    ),
                    o.default.createElement(
                      "div",
                      { className: "react-toggle-track-x" },
                      this.getIcon("unchecked")
                    )
                  ),
                  o.default.createElement("div", {
                    className: "react-toggle-thumb"
                  }),
                  o.default.createElement(
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
      })(s.PureComponent);
      (t.default = p),
        (p.displayName = "Toggle"),
        (p.defaultProps = {
          icons: {
            checked: o.default.createElement(c.default, null),
            unchecked: o.default.createElement(u.default, null)
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
        s = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
        return s.default.createElement(
          "svg",
          { width: "14", height: "11", viewBox: "0 0 14 11" },
          s.default.createElement("title", null, "switch-check"),
          s.default.createElement("path", {
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
        s = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
        return s.default.createElement(
          "svg",
          { width: "10", height: "10", viewBox: "0 0 10 10" },
          s.default.createElement("title", null, "switch-x"),
          s.default.createElement("path", {
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
    710: function(e, t, a) {
      var n;
      /*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/ !(function() {
        "use strict";
        var a = {}.hasOwnProperty;
        function r() {
          for (var e = [], t = 0; t < arguments.length; t++) {
            var n = arguments[t];
            if (n) {
              var s = typeof n;
              if ("string" === s || "number" === s) e.push(n);
              else if (Array.isArray(n) && n.length) {
                var o = r.apply(null, n);
                o && e.push(o);
              } else if ("object" === s)
                for (var i in n) a.call(n, i) && n[i] && e.push(i);
            }
          }
          return e.join(" ");
        }
        e.exports
          ? ((r.default = r), (e.exports = r))
          : void 0 ===
              (n = function() {
                return r;
              }.apply(t, [])) || (e.exports = n);
      })();
    },
    744: function(e, t, a) {
      "use strict";
      var n = a(2),
        r = a.n(n),
        s = "".concat(URL_API, "/api/organisation");
      t.a = {
        newOrganisation: function(e) {
          var t = "".concat(s),
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
          var t = "".concat(s, "/").concat(e.id),
            a = "Bearer " + localStorage.getItem("access_token");
          return (
            (r.a.defaults.headers.common.Authorization = a), r.a.post(t, e)
          );
        },
        getOrganisationPeek: function() {
          var e = "".concat(s, "/peek"),
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
    870: function(e, t, a) {
      "use strict";
      var n = a(2),
        r = a.n(n),
        s = "".concat(URL_API, "/api/person");
      t.a = {
        newPerson: function(e) {
          var t = "".concat(s),
            a = "Bearer " + localStorage.getItem("access_token");
          return (
            (r.a.defaults.headers.common.Authorization = a), r.a.post(t, e)
          );
        },
        updatePerson: function(e) {
          var t = "".concat(s, "/").concat(e.id),
            a = "Bearer " + localStorage.getItem("access_token");
          return (
            (r.a.defaults.headers.common.Authorization = a), r.a.post(t, e)
          );
        },
        getPersonPeek: function() {
          var e = "".concat(s, "/peek"),
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
          var t = "".concat(s, "/").concat(e.id),
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
