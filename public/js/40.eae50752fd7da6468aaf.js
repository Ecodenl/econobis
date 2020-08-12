(window.webpackJsonp = window.webpackJsonp || []).push([
  [40],
  {
    1433: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        l = a(25),
        c = a.n(l),
        s = a(26),
        i = a.n(s),
        o = a(27),
        u = a.n(o),
        m = a(16),
        f = a.n(m),
        d = a(0),
        h = a.n(d),
        p = a(32),
        v = function(e) {
          return { type: "FETCH_USER_DETAILS", payload: e };
        },
        b = a(4),
        g = a(693),
        y = Object(p.b)(function(e) {
          return { fullName: e.userDetails.fullName };
        }, null)(function(e) {
          return h.a.createElement(
            "div",
            { className: "row" },
            h.a.createElement(
              "div",
              { className: "col-md-4" },
              h.a.createElement(
                "div",
                { className: "btn-group btn-group-flex", role: "group" },
                h.a.createElement(g.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: b.e.goBack
                })
              )
            ),
            h.a.createElement(
              "div",
              { className: "col-md-4" },
              h.a.createElement("h4", { className: "text-center" }, e.fullName)
            ),
            h.a.createElement("div", { className: "col-md-4" })
          );
        }),
        E = a(198),
        N = a(22),
        k = a.n(N),
        C = a(6),
        D = a.n(C),
        w = a(697),
        O = a.n(w),
        R = a(694),
        T = a(696),
        P = a(692),
        x = a(702),
        S = a(700);
      function j(e, t) {
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
      function A(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? j(Object(a), !0).forEach(function(t) {
                D()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : j(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var _ = (function(e) {
          i()(a, e);
          var t = M(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              D()(k()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  A(
                    A({}, n.state),
                    {},
                    { user: A(A({}, n.state.user), {}, D()({}, r, a)) }
                  )
                );
              }),
              D()(k()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.user,
                  a = {},
                  r = !1;
                O.a.isEmail(t.email) || ((a.email = !0), (r = !0)),
                  O.a.isEmpty(t.firstName) && ((a.firstName = !0), (r = !0)),
                  O.a.isEmpty(t.lastName) && ((a.lastName = !0), (r = !0)),
                  n.setState(A(A({}, n.state), {}, { errors: a })),
                  !r && n.props.updateUser(t, n.props.switchToView);
              }),
              (n.state = {
                user: A(
                  A({}, n.props.userDetails),
                  {},
                  {
                    titleId: n.props.userDetails.title
                      ? n.props.userDetails.title.id
                      : "",
                    lastNamePrefixId: n.props.userDetails.lastNamePrefix
                      ? n.props.userDetails.lastNamePrefix.id
                      : "",
                    testArray: ["test1", "test2"]
                  }
                ),
                errors: { email: !1, firstName: !1, lastName: !1 }
              }),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.user,
                    t = e.email,
                    a = e.titleId,
                    n = e.firstName,
                    r = e.lastNamePrefixId,
                    l = e.lastName,
                    c = e.phoneNumber,
                    s = e.mobile,
                    i = e.occupation,
                    o = e.active;
                  return h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal col-md-12",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(T.a, {
                        label: "Aanspreektitel",
                        name: "titleId",
                        options: this.props.titles,
                        value: a,
                        onChangeAction: this.handleInputChange
                      }),
                      h.a.createElement(R.a, {
                        label: "E-mail",
                        name: "email",
                        value: t,
                        onChangeAction: this.handleInputChange,
                        required: "required",
                        error: this.state.errors.email
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(R.a, {
                        label: "Voornaam",
                        name: "firstName",
                        value: n,
                        onChangeAction: this.handleInputChange,
                        required: "required",
                        error: this.state.errors.firstName
                      }),
                      h.a.createElement(R.a, {
                        label: "Telefoonnummer",
                        size: "col-sm-6",
                        name: "phoneNumber",
                        value: c,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(T.a, {
                        label: "Tussenvoegsel",
                        name: "lastNamePrefixId",
                        options: this.props.lastNamePrefixes,
                        value: r,
                        onChangeAction: this.handleInputChange
                      }),
                      h.a.createElement(R.a, {
                        label: "Mobiel nummer",
                        size: "col-sm-6",
                        name: "mobile",
                        value: s,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(R.a, {
                        label: "Achternaam",
                        size: "col-sm-6",
                        name: "lastName",
                        value: l,
                        onChangeAction: this.handleInputChange,
                        required: "required",
                        error: this.state.errors.lastName
                      }),
                      h.a.createElement(R.a, {
                        label: "Functie",
                        size: "col-sm-6",
                        name: "occupation",
                        value: i,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(S.a, {
                        label: "Actief",
                        name: "active",
                        value: o,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    h.a.createElement(
                      x.a,
                      null,
                      h.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        h.a.createElement(P.a, {
                          buttonClassName: "btn-default",
                          buttonText: "Sluiten",
                          onClickAction: this.props.switchToView
                        }),
                        h.a.createElement(P.a, {
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
        })(d.Component),
        q = Object(p.b)(
          function(e) {
            return {
              userDetails: e.userDetails,
              lastNamePrefixes: e.systemData.lastNamePrefixes,
              titles: e.systemData.titles
            };
          },
          function(e) {
            return {
              updateUser: function(t, a) {
                e(
                  (function(e, t) {
                    return { type: "UPDATE_USER", user: e, switchToView: t };
                  })(t, a)
                );
              }
            };
          }
        )(_),
        L = a(695),
        z = Object(p.b)(function(e) {
          return { userDetails: e.userDetails };
        })(function(e) {
          var t = e.userDetails,
            a = t.email,
            n = t.title,
            r = t.firstName,
            l = t.lastNamePrefix,
            c = t.lastName,
            s = t.phoneNumber,
            i = t.mobile,
            o = t.occupation,
            u = t.active;
          return h.a.createElement(
            "div",
            { onClick: e.switchToEdit },
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(L.a, {
                label: "Aanspreektitel",
                value: n && n.name
              }),
              h.a.createElement(L.a, { label: "E-mail", value: a })
            ),
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(L.a, { label: "Voornaam", value: r }),
              h.a.createElement(L.a, { label: "Telefoonnummer", value: s })
            ),
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(L.a, {
                label: "Tussenvoegsel",
                value: l && l.name
              }),
              h.a.createElement(
                "div",
                null,
                h.a.createElement(L.a, { label: "Mobiel nummer", value: i })
              )
            ),
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(L.a, { label: "Achternaam", value: c }),
              h.a.createElement(
                "div",
                null,
                h.a.createElement(L.a, { label: "Functie", value: o })
              )
            ),
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(L.a, {
                label: "Actief",
                value: u ? "Ja" : "Nee"
              })
            )
          );
        }),
        I = a(690),
        F = a(691);
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var V = (function(e) {
          i()(a, e);
          var t = B(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              D()(k()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              D()(k()(n), "switchToView", function() {
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
                  var e = this,
                    t = this.props.meDetails.permissions,
                    a = void 0 === t ? {} : t;
                  return h.a.createElement(
                    I.a,
                    {
                      className: this.state.activeDiv,
                      onMouseEnter: function() {
                        return e.onDivEnter();
                      },
                      onMouseLeave: function() {
                        return e.onDivLeave();
                      }
                    },
                    h.a.createElement(
                      F.a,
                      null,
                      this.state.showEdit && a.manageUser
                        ? h.a.createElement(q, {
                            switchToView: this.switchToView
                          })
                        : h.a.createElement(z, {
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
        X = Object(p.b)(function(e) {
          return { contactDetails: e.contactDetails, meDetails: e.meDetails };
        })(V),
        U = a(7),
        G = a.n(U),
        J = Object(p.b)(function(e) {
          return { userDetails: e.userDetails };
        })(function(e) {
          var t = e.userDetails,
            a = t.lastVisit,
            n = t.visitCount;
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(L.a, {
                label: "Laatst ingelogd",
                value: a && G()(a).format("DD-MM-Y")
              }),
              h.a.createElement(L.a, {
                label: "Aantal keer ingelogd",
                value: n
              })
            )
          );
        }),
        Y = a(698),
        H = function(e) {
          return h.a.createElement(
            I.a,
            null,
            h.a.createElement(
              Y.a,
              null,
              h.a.createElement(
                "span",
                { className: "h5 text-bold" },
                "Gebruikers log"
              )
            ),
            h.a.createElement(
              F.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-md-12" },
                h.a.createElement(J, null)
              )
            )
          );
        };
      function K(e) {
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
          return u()(this, a);
        };
      }
      var Q = (function(e) {
        i()(a, e);
        var t = K(a);
        function a(e) {
          return r()(this, a), t.call(this, e);
        }
        return (
          c()(a, [
            {
              key: "render",
              value: function() {
                var e = this.props.role,
                  t = e.name,
                  a = e.hasRole;
                return h.a.createElement(
                  "div",
                  { className: "col-sm-6 border-bottom" },
                  h.a.createElement("label", { className: "col-sm-6" }, t),
                  h.a.createElement(
                    "span",
                    { className: "col-sm-6" },
                    a ? "Ja" : "Nee"
                  )
                );
              }
            }
          ]),
          a
        );
      })(d.Component);
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var Z = (function(e) {
          i()(a, e);
          var t = W(a);
          function a(e) {
            return r()(this, a), t.call(this, e);
          }
          return (
            c()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.props.userDetails.roles,
                    t = void 0 === e ? {} : e;
                  return h.a.createElement(
                    "div",
                    { onClick: this.props.switchToEdit },
                    h.a.createElement(
                      F.a,
                      null,
                      h.a.createElement(
                        Y.a,
                        null,
                        h.a.createElement(
                          "span",
                          { className: "h5 text-bold" },
                          "Gebruikers rollen"
                        )
                      ),
                      h.a.createElement(
                        "div",
                        { className: "row" },
                        0 === t.length
                          ? h.a.createElement(
                              "tr",
                              null,
                              h.a.createElement(
                                "td",
                                { colSpan: 7 },
                                "Geen rollen beschikbaar!"
                              )
                            )
                          : t.map(function(e, t) {
                              return h.a.createElement(Q, { key: t, role: e });
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
        $ = Object(p.b)(function(e) {
          return { userDetails: e.userDetails };
        })(Z),
        ee = a(191);
      function te(e, t) {
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
      function ae(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? te(Object(a), !0).forEach(function(t) {
                D()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : te(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
          return u()(this, a);
        };
      }
      var re = (function(e) {
          i()(a, e);
          var t = ne(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              D()(k()(n), "handleInputChange", function(e) {
                var t = e.target;
                t.checked
                  ? ee.a
                      .addRole(n.props.id, n.state.id)
                      .then(function() {
                        n.setState(
                          ae(ae({}, n.state), {}, { hasRole: !n.state.hasRole })
                        ),
                          n.props.updateRole(t.id, !0);
                      })
                      .catch(function() {
                        alert(
                          "Je hebt niet de rechten om deze rol toe te kennen"
                        );
                      })
                  : ee.a
                      .removeRole(n.props.id, n.state.id)
                      .then(function() {
                        n.setState(
                          ae(ae({}, n.state), {}, { hasRole: !n.state.hasRole })
                        ),
                          n.props.updateRole(t.id, !1);
                      })
                      .catch(function() {
                        alert(
                          "Je hebt niet de rechten om deze rol toe te kennen"
                        );
                      });
              }),
              (n.state = ae({}, e.role)),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state,
                    t = e.id,
                    a = e.name,
                    n = e.hasRole;
                  return h.a.createElement(S.a, {
                    label: a,
                    id: t,
                    name: "name",
                    value: n,
                    onChangeAction: this.handleInputChange
                  });
                }
              }
            ]),
            a
          );
        })(d.Component),
        le = Object(p.b)(null, function(e) {
          return {
            updateRole: function(t, a) {
              e(
                (function(e, t) {
                  return { type: "UPDATE_ROLE", id: e, value: t };
                })(t, a)
              );
            }
          };
        })(re);
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var se = (function(e) {
          i()(a, e);
          var t = ce(a);
          function a(e) {
            return r()(this, a), t.call(this, e);
          }
          return (
            c()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.props.userDetails,
                    t = e.id,
                    a = e.roles,
                    n = void 0 === a ? {} : a;
                  return h.a.createElement(
                    "div",
                    null,
                    h.a.createElement(
                      F.a,
                      null,
                      h.a.createElement(
                        Y.a,
                        null,
                        h.a.createElement(
                          "span",
                          { className: "h5 text-bold" },
                          "Gebruikers rollen"
                        )
                      ),
                      h.a.createElement(
                        "div",
                        { className: "row" },
                        0 === n.length
                          ? h.a.createElement(
                              "tr",
                              null,
                              h.a.createElement(
                                "td",
                                { colSpan: 7 },
                                "Geen rollen beschikbaar!"
                              )
                            )
                          : n.map(function(e, a) {
                              return h.a.createElement(le, {
                                key: a,
                                role: e,
                                id: t
                              });
                            })
                      ),
                      h.a.createElement(
                        x.a,
                        null,
                        h.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          h.a.createElement(P.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Sluiten",
                            onClickAction: this.props.switchToView
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
        ie = Object(p.b)(function(e) {
          return { userDetails: e.userDetails };
        }, null)(se);
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var ue = (function(e) {
          i()(a, e);
          var t = oe(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              D()(k()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              D()(k()(n), "switchToView", function() {
                n.setState({ showEdit: !1 });
              }),
              (n.state = { showEdit: !1 }),
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
                  var e = this,
                    t = this.props.meDetails.permissions,
                    a = void 0 === t ? {} : t;
                  return h.a.createElement(
                    I.a,
                    {
                      className: this.state.activeDiv,
                      onMouseEnter: function() {
                        return e.onDivEnter();
                      },
                      onMouseLeave: function() {
                        return e.onDivLeave();
                      }
                    },
                    this.state.showEdit && a.manageUser
                      ? h.a.createElement(ie, {
                          switchToView: this.switchToView
                        })
                      : h.a.createElement($, {
                          switchToEdit: this.switchToEdit
                        })
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        me = Object(p.b)(function(e) {
          return { meDetails: e.meDetails };
        })(ue);
      function fe(e) {
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
          return u()(this, a);
        };
      }
      var de = (function(e) {
          i()(a, e);
          var t = fe(a);
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
                      ? (e = "Fout bij het ophalen van gebruiker.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : Object(E.isEmpty)(this.props.userDetails)
                      ? (e = "Geen gebruiker gevonden!")
                      : (t = !1),
                    t
                      ? h.a.createElement("div", null, e)
                      : h.a.createElement(
                          "div",
                          null,
                          h.a.createElement(X, null),
                          h.a.createElement(me, null),
                          h.a.createElement(H, null)
                        )
                  );
                }
              }
            ]),
            a
          );
        })(d.Component),
        he = Object(p.b)(
          function(e) {
            return {
              userDetails: e.userDetails,
              isLoading: e.loadingData.isLoading,
              hasError: e.loadingData.hasError
            };
          },
          function(e) {
            return {
              fetchUserDetails: function(t) {
                e(v(t));
              }
            };
          }
        )(de);
      function pe(e) {
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
          return u()(this, a);
        };
      }
      var ve = (function(e) {
        i()(a, e);
        var t = pe(a);
        function a(e) {
          return r()(this, a), t.call(this, e);
        }
        return (
          c()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchUserDetails(this.props.params.id);
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
                        I.a,
                        null,
                        h.a.createElement(
                          F.a,
                          { className: "panel-small" },
                          h.a.createElement(y, null)
                        )
                      )
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      h.a.createElement(he, null)
                    )
                  ),
                  h.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          a
        );
      })(d.Component);
      t.default = Object(p.b)(
        function(e) {
          return { userDetails: e.userDetails };
        },
        function(e) {
          return {
            fetchUserDetails: function(t) {
              e(v(t));
            }
          };
        }
      )(ve);
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        c = a.n(l),
        s = function(e) {
          var t = e.children,
            a = e.className,
            n = e.onMouseEnter,
            l = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: l
            },
            t
          );
        };
      (s.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (s.propTypes = {
          className: c.a.string,
          onMouseEnter: c.a.func,
          onMouseLeave: c.a.func
        }),
        (t.a = s);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        c = a.n(l),
        s = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: c.a.string }),
        (t.a = s);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        c = a.n(l),
        s = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            l = e.type,
            c = e.value,
            s = e.loading,
            i = e.loadText,
            o = e.disabled;
          return s
            ? r.a.createElement(
                "button",
                {
                  type: l,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: c,
                  disabled: s
                },
                r.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                i
              )
            : r.a.createElement(
                "button",
                {
                  type: l,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: c,
                  disabled: o
                },
                a
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
          buttonClassName: c.a.string,
          buttonText: c.a.string.isRequired,
          onClickAction: c.a.func,
          type: c.a.string,
          value: c.a.string,
          loading: c.a.bool,
          loadText: c.a.string,
          disabled: c.a.bool
        }),
        (t.a = s);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        c = a.n(l),
        s = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            l = e.title,
            c = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: c,
              title: l
            },
            r.a.createElement("span", { className: "glyphicon ".concat(a) })
          );
        };
      (s.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (s.propTypes = {
          buttonClassName: c.a.string,
          iconName: c.a.string.isRequired,
          onClickAction: c.a.func,
          title: c.a.string,
          disabled: c.a.bool
        }),
        (t.a = s);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        c = a.n(l),
        s = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            l = e.size,
            c = e.id,
            s = e.placeholder,
            i = e.name,
            o = e.value,
            u = e.onClickAction,
            m = e.onChangeAction,
            f = e.onBlurAction,
            d = e.required,
            h = e.readOnly,
            p = e.maxLength,
            v = e.error,
            b = e.min,
            g = e.max,
            y = e.step,
            E = e.errorMessage,
            N = e.divSize,
            k = e.divClassName,
            C = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(N, " ").concat(k) },
            r.a.createElement(
              "label",
              { htmlFor: c, className: "col-sm-6 ".concat(d) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(l) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (v ? "has-error" : ""),
                id: c,
                placeholder: s,
                name: i,
                value: o,
                onClick: u,
                onChange: m,
                onBlur: f,
                readOnly: h,
                maxLength: p,
                min: b,
                max: g,
                autoComplete: C,
                step: y
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
                  E
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
        (t.a = s);
    },
    695: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(4),
        c = a(8),
        s = a.n(c),
        i = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            c = e.value,
            s = e.link,
            i = e.hidden;
          return s.length > 0
            ? r.a.createElement(
                "div",
                { className: a, style: i ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement(
                  "div",
                  { className: "col-sm-6", id: n, onClick: null },
                  r.a.createElement(
                    l.b,
                    { to: s, className: "link-underline" },
                    c
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: a, style: i ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement("div", { className: "col-sm-6", id: n }, c)
              );
        };
      (i.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (i.propTypes = {
          label: s.a.oneOfType([s.a.string, s.a.object]).isRequired,
          className: s.a.string,
          id: s.a.string,
          value: s.a.oneOfType([s.a.string, s.a.number]),
          link: s.a.string,
          hidden: s.a.bool
        }),
        (t.a = i);
    },
    696: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        c = a.n(l),
        s = function(e) {
          var t = e.label,
            a = e.className,
            n = e.size,
            l = e.id,
            c = e.name,
            s = e.value,
            i = e.options,
            o = e.onChangeAction,
            u = e.onBlurAction,
            m = e.required,
            f = e.error,
            d = e.errorMessage,
            h = e.optionValue,
            p = e.optionName,
            v = e.readOnly,
            b = e.placeholder,
            g = e.divClassName,
            y = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(g) },
            r.a.createElement(
              "label",
              { htmlFor: l, className: "col-sm-6 ".concat(m) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-6" },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(a) + (f && " has-error"),
                  id: l,
                  name: c,
                  value: s,
                  onChange: o,
                  onBlur: u,
                  readOnly: v
                },
                y && r.a.createElement("option", { value: "" }, b),
                i.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[h], value: e[h] },
                    e[p]
                  );
                })
              )
            ),
            f &&
              r.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                r.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  d
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
        (t.a = s);
    },
    698: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        c = a.n(l),
        s = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-heading ".concat(t) },
            a
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: c.a.string }),
        (t.a = s);
    },
    700: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        c = a.n(l),
        s = a(703),
        i = a.n(s),
        o = function(e) {
          var t = e.label,
            a = e.size,
            n = e.id,
            l = e.name,
            c = e.value,
            s = e.onChangeAction,
            o = e.required,
            u = e.divSize,
            m = e.className,
            f = e.disabled;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(u, " ").concat(m) },
            r.a.createElement(
              "div",
              null,
              r.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(o) },
                t
              )
            ),
            r.a.createElement(
              "div",
              { className: "".concat(a) },
              r.a.createElement(i.a, {
                id: n,
                name: l,
                onChange: s,
                checked: c,
                disabled: f
              })
            )
          );
        };
      (o.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        required: "",
        disabled: !1,
        value: null
      }),
        (o.propTypes = {
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
        (t.a = o);
    },
    702: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        c = a.n(l),
        s = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-footer ".concat(t) },
            a
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: c.a.string }),
        (t.a = s);
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
        l = a(0),
        c = f(l),
        s = f(a(710)),
        i = f(a(8)),
        o = f(a(704)),
        u = f(a(705)),
        m = a(706);
      function f(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var d = (function(e) {
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
                  l = (0, s.default)(
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
                    className: l,
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
      })(l.PureComponent);
      (t.default = d),
        (d.displayName = "Toggle"),
        (d.defaultProps = {
          icons: {
            checked: c.default.createElement(o.default, null),
            unchecked: c.default.createElement(u.default, null)
          }
        }),
        (d.propTypes = {
          checked: i.default.bool,
          disabled: i.default.bool,
          defaultChecked: i.default.bool,
          onChange: i.default.func,
          onFocus: i.default.func,
          onBlur: i.default.func,
          className: i.default.string,
          name: i.default.string,
          value: i.default.string,
          id: i.default.string,
          "aria-labelledby": i.default.string,
          "aria-label": i.default.string,
          icons: i.default.oneOfType([
            i.default.bool,
            i.default.shape({
              checked: i.default.node,
              unchecked: i.default.node
            })
          ])
        });
    },
    704: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        r = a(0),
        l = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
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
    705: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        r = a(0),
        l = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
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
              var l = typeof n;
              if ("string" === l || "number" === l) e.push(n);
              else if (Array.isArray(n) && n.length) {
                var c = r.apply(null, n);
                c && e.push(c);
              } else if ("object" === l)
                for (var s in n) a.call(n, s) && n[s] && e.push(s);
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
    }
  }
]);
