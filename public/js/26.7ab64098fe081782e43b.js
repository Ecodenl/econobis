(window.webpackJsonp = window.webpackJsonp || []).push([
  [26],
  {
    1424: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        o = a(25),
        c = a.n(o),
        i = a(26),
        s = a.n(i),
        l = a(27),
        u = a.n(l),
        d = a(16),
        p = a.n(d),
        m = a(0),
        f = a.n(m),
        h = a(32),
        v = a(802),
        g = a(22),
        y = a.n(g),
        b = a(6),
        E = a.n(b),
        D = a(4),
        N = a(693),
        C = a(690),
        k = a(691),
        O = a(692),
        w = a(100),
        G = a(774),
        T = Object(h.b)(null, function(e) {
          return {
            deleteContactGroup: function(t, a) {
              e(Object(G.c)(t, a));
            }
          };
        })(function(e) {
          var t = function() {
            D.f.push("/contact-groepen");
          };
          return f.a.createElement(
            w.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return (
                  e.deleteContactGroup(e.id, t), void e.closeDeleteItemModal()
                );
              },
              title: "Verwijderen"
            },
            "Verwijder groep: ",
            f.a.createElement("strong", null, " ", e.name, " ")
          );
        });
      function S(e) {
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
      var j = (function(e) {
          s()(a, e);
          var t = S(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(y()(n), "toggleDelete", function() {
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
                  var e = this.props.contactGroup,
                    t = e.id,
                    a = e.name,
                    n = e.numberOfContacts,
                    r = void 0 === n ? 0 : n,
                    o = e.composedOf,
                    c = "";
                  return (
                    "contacts" === o
                      ? (c = "(Contacten)")
                      : "participants" === o
                      ? (c = "(Participanten)")
                      : "both" === o && (c = "(Samengesteld)"),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(
                        "div",
                        { className: "col-sm-12" },
                        f.a.createElement(
                          C.a,
                          null,
                          f.a.createElement(
                            k.a,
                            { className: "panel-small" },
                            f.a.createElement(
                              "div",
                              { className: "col-md-2" },
                              f.a.createElement(
                                "div",
                                { className: "btn-group", role: "group" },
                                f.a.createElement(N.a, {
                                  iconName: "glyphicon-arrow-left",
                                  onClickAction: D.e.goBack
                                }),
                                this.props.permissions.manageGroup &&
                                  !this.props.contactGroup
                                    .isUsedInComposedGroup &&
                                  f.a.createElement(N.a, {
                                    iconName: "glyphicon-trash",
                                    onClickAction: this.toggleDelete
                                  }),
                                f.a.createElement(O.a, {
                                  buttonText: "Open lijst (".concat(r, ")"),
                                  onClickAction: function() {
                                    return D.f.push(
                                      "/contacten-in-groep/".concat(t)
                                    );
                                  }
                                })
                              )
                            ),
                            f.a.createElement(
                              "div",
                              { className: "col-md-8" },
                              f.a.createElement(
                                "h4",
                                { className: "text-center" },
                                a,
                                c
                              )
                            ),
                            f.a.createElement("div", { className: "col-md-2" })
                          )
                        )
                      ),
                      this.state.showDelete &&
                        f.a.createElement(T, {
                          closeDeleteItemModal: this.toggleDelete,
                          name: a,
                          id: t
                        })
                    )
                  );
                }
              }
            ]),
            a
          );
        })(m.Component),
        P = Object(h.b)(function(e) {
          return {
            contactGroup: e.contactGroupDetails,
            permissions: e.meDetails.permissions
          };
        }, null)(j),
        A = a(198),
        R = a.n(A),
        L = a(697),
        M = a.n(L),
        x = a(7),
        I = a.n(x),
        F = a(54),
        _ = a(154),
        B = a(694),
        q = a(699),
        z = a(700),
        U = a(696);
      function V(e, t) {
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
            ? V(Object(a), !0).forEach(function(t) {
                E()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : V(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function X(e) {
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
      var W = (function(e) {
          s()(a, e);
          var t = X(a);
          function a(e) {
            var n;
            r()(this, a),
              (n = t.call(this, e)),
              E()(y()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  Y(
                    Y({}, n.state),
                    {},
                    {
                      contactGroup: Y(
                        Y({}, n.state.contactGroup),
                        {},
                        E()({}, r, a)
                      )
                    }
                  )
                );
              }),
              E()(y()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.contactGroup,
                  a = {},
                  r = !1,
                  o = !1;
                M.a.isEmpty(t.name) && ((a.name = !0), (r = !0));
                var c = !1;
                n.state.contactGroups.map(function(e) {
                  return e.name == t.name && (c = !0);
                }),
                  c &&
                    t.name !== n.state.oldName &&
                    ((o = "Naam moet uniek zijn."), (a.name = !0), (r = !0)),
                  n.setState(
                    Y(Y({}, n.state), {}, { errors: a, errorMessage: o })
                  ),
                  !r &&
                    F.a.updateContactGroup(t).then(function(e) {
                      n.props.updateContactGroupDetails(e),
                        n.props.switchToView();
                    });
              }),
              E()(y()(n), "handleChangeStartedDate", function(e) {
                var t = e ? I()(e).format("Y-MM-DD") : "";
                n.setState(
                  Y(
                    Y({}, n.state),
                    {},
                    {
                      contactGroup: Y(
                        Y({}, n.state.contactGroup),
                        {},
                        { dateStarted: t }
                      )
                    }
                  )
                );
              }),
              E()(y()(n), "handleChangeFinishedDate", function(e) {
                var t = e ? I()(e).format("Y-MM-DD") : "";
                n.setState(
                  Y(
                    Y({}, n.state),
                    {},
                    {
                      contactGroup: Y(
                        Y({}, n.state.contactGroup),
                        {},
                        { dateFinished: t }
                      )
                    }
                  )
                );
              }),
              E()(y()(n), "handleChangeComposedGroupType", function(e) {
                n.setState(
                  Y(
                    Y({}, n.state),
                    {},
                    {
                      contactGroup: Y(
                        Y({}, n.state.contactGroup),
                        {},
                        { contactGroupComposedType: e }
                      )
                    }
                  )
                );
              }),
              E()(y()(n), "handleChangeDynamicFilterType", function(e) {
                n.setState(
                  Y(
                    Y({}, n.state),
                    {},
                    {
                      contactGroup: Y(
                        Y({}, n.state.contactGroup),
                        {},
                        { dynamicFilterType: e }
                      )
                    }
                  )
                );
              });
            var o = e.contactGroupDetails,
              c = o.dateStarted,
              i = o.dateFinished,
              s = o.responsibleUserId,
              l = o.showPortal,
              u = o.editPortal,
              d = o.showContactForm,
              p = o.contactGroupComposedType,
              m = o.type,
              f = o.dynamicFilterType;
            return (
              (n.state = {
                contactsWithPermission: [],
                contactGroups: [],
                oldName: e.contactGroupDetails.name
                  ? e.contactGroupDetails.name
                  : "",
                contactGroup: Y(
                  Y({}, e.contactGroupDetails),
                  {},
                  {
                    dateStarted: c ? I()(c).format("Y-MM-DD") : "",
                    dateFinished: i ? I()(i).format("Y-MM-DD") : "",
                    responsibleUserId: s || "",
                    showPortal: l || !1,
                    editPortal: u || !1,
                    showContactForm: d || !1,
                    contactGroupComposedType: p || "one",
                    type: m.id,
                    dynamicFilterType: f || "and"
                  }
                ),
                errors: { name: !1 }
              }),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this,
                    t = this.props.permissions;
                  _.a
                    .fetchUsersWithPermission(
                      t.find(function(e) {
                        return "manage_group" === e.name;
                      }).id
                    )
                    .then(function(t) {
                      e.setState({ contactsWithPermission: t });
                    }),
                    F.a.peekContactGroups().then(function(t) {
                      e.setState({ contactGroups: t });
                    });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.state.contactGroup,
                    a = t.name,
                    n = t.description,
                    r = t.responsibleUserId,
                    o = t.closed,
                    c = t.dateStarted,
                    i = t.dateFinished,
                    s = t.createdAt,
                    l = t.showPortal,
                    u = t.editPortal,
                    d = t.showContactForm,
                    p = t.type;
                  return f.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(B.a, {
                        label: "Naam",
                        name: "name",
                        value: a,
                        onChangeAction: this.handleInputChange,
                        required: "required",
                        error: this.state.errors.name
                      }),
                      "composed" === this.props.contactGroupDetails.type.id &&
                        f.a.createElement(
                          "div",
                          { className: "col-xs-6" },
                          f.a.createElement(
                            "div",
                            { className: "row" },
                            f.a.createElement(
                              "div",
                              { className: "col-xs-6" },
                              f.a.createElement("input", {
                                onChange: function() {
                                  return e.handleChangeComposedGroupType("one");
                                },
                                type: "radio",
                                name: "composedGroupType",
                                value: "one",
                                id: "one",
                                defaultChecked:
                                  "one" ===
                                  this.props.contactGroupDetails
                                    .contactGroupComposedType
                              }),
                              f.a.createElement(
                                "label",
                                { htmlFor: "one" },
                                "In één van de groepen"
                              )
                            ),
                            f.a.createElement(
                              "div",
                              { className: "col-xs-6" },
                              f.a.createElement("input", {
                                onChange: function() {
                                  return e.handleChangeComposedGroupType("all");
                                },
                                type: "radio",
                                name: "composedGroupType",
                                value: "all",
                                id: "all",
                                defaultChecked:
                                  "all" ===
                                  this.props.contactGroupDetails
                                    .contactGroupComposedType
                              }),
                              f.a.createElement(
                                "label",
                                { htmlFor: "all" },
                                "In alle groepen"
                              )
                            )
                          )
                        ),
                      "dynamic" === this.props.contactGroupDetails.type.id &&
                        f.a.createElement(
                          "div",
                          { className: "col-xs-6" },
                          f.a.createElement(
                            "div",
                            { className: "row" },
                            f.a.createElement(
                              "div",
                              { className: "col-xs-6" },
                              f.a.createElement("input", {
                                onChange: function() {
                                  return e.handleChangeDynamicFilterType("and");
                                },
                                type: "radio",
                                name: "dynamicFilterType",
                                value: "and",
                                id: "and",
                                defaultChecked:
                                  "and" ===
                                  this.props.contactGroupDetails
                                    .dynamicFilterType
                              }),
                              f.a.createElement(
                                "label",
                                { htmlFor: "and" },
                                'Alle extra filters zijn "EN"'
                              )
                            ),
                            f.a.createElement(
                              "div",
                              { className: "col-xs-6" },
                              f.a.createElement("input", {
                                onChange: function() {
                                  return e.handleChangeDynamicFilterType("or");
                                },
                                type: "radio",
                                name: "dynamicFilterType",
                                value: "or",
                                id: "or",
                                defaultChecked:
                                  "or" ===
                                  this.props.contactGroupDetails
                                    .dynamicFilterType
                              }),
                              f.a.createElement(
                                "label",
                                { htmlFor: "or" },
                                'Alle extra filters zijn "OF"'
                              )
                            )
                          )
                        )
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
                              {
                                htmlFor: "description",
                                className: "col-sm-12"
                              },
                              "Omschrijving"
                            )
                          ),
                          f.a.createElement(
                            "div",
                            { className: "col-sm-9" },
                            f.a.createElement("textarea", {
                              name: "description",
                              value: n,
                              onChange: this.handleInputChange,
                              className: "form-control input-sm"
                            })
                          )
                        )
                      )
                    ),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(
                        "div",
                        { className: "form-group col-sm-6" },
                        f.a.createElement(
                          "label",
                          {
                            htmlFor: "responsibleUserId",
                            className: "col-sm-6"
                          },
                          "Verantwoordelijke"
                        ),
                        f.a.createElement(
                          "div",
                          { className: "col-sm-6" },
                          f.a.createElement(
                            "select",
                            {
                              className: "form-control input-sm",
                              id: "responsibleUserId",
                              name: "responsibleUserId",
                              value: r,
                              onChange: this.handleInputChange
                            },
                            f.a.createElement("option", { value: "" }),
                            this.state.contactsWithPermission.map(function(e) {
                              return f.a.createElement(
                                "option",
                                { key: e.id, value: e.id },
                                e.fullName
                              );
                            })
                          )
                        )
                      ),
                      f.a.createElement(z.a, {
                        label: "Gesloten",
                        name: "closed",
                        value: o,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(q.a, {
                        label: "Startdatum",
                        size: "col-sm-6",
                        name: "dateStarted",
                        value: c,
                        onChangeAction: this.handleChangeStartedDate
                      }),
                      f.a.createElement(q.a, {
                        label: "Datum gereed",
                        size: "col-sm-6",
                        name: "dateFinished",
                        value: i,
                        onChangeAction: this.handleChangeFinishedDate
                      })
                    ),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(z.a, {
                        label: "Zichtbaar op portaal",
                        name: "showPortal",
                        value: l,
                        onChangeAction: this.handleInputChange
                      }),
                      f.a.createElement(z.a, {
                        label: "Veranderen op portaal",
                        name: "editPortal",
                        value: u,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(z.a, {
                        label: "Zichtbaar bij contact",
                        name: "showContactForm",
                        value: d,
                        onChangeAction: this.handleInputChange
                      }),
                      "dynamic" === this.props.contactGroupDetails.type.id
                        ? f.a.createElement(U.a, {
                            label: "Type",
                            name: "type",
                            value: p,
                            options: [
                              { id: "dynamic", name: "Dynamisch" },
                              { id: "static", name: "Statisch" }
                            ],
                            onChangeAction: this.handleInputChange
                          })
                        : f.a.createElement(B.a, {
                            label: "Type",
                            name: "type",
                            value: this.props.contactGroupDetails.type.name,
                            readOnly: !0
                          })
                    ),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(B.a, {
                        label: "Gemaakt op",
                        name: "createdAt",
                        value: I()(s).format("DD-MM-Y"),
                        readOnly: !0
                      }),
                      f.a.createElement(B.a, {
                        label: "Gemaakt door",
                        name: "createdBy",
                        value: this.props.meDetails.fullName,
                        readOnly: !0
                      })
                    ),
                    this.state.errorMessage &&
                      f.a.createElement(
                        "div",
                        { className: "row" },
                        f.a.createElement(
                          "div",
                          {
                            className:
                              "col-sm-10 col-md-offset-1 alert alert-danger"
                          },
                          this.state.errorMessage
                        )
                      ),
                    f.a.createElement(
                      "div",
                      { className: "panel-footer" },
                      f.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        f.a.createElement(O.a, {
                          buttonClassName: "btn-default",
                          buttonText: "Sluiten",
                          onClickAction: this.props.switchToView
                        }),
                        f.a.createElement(O.a, {
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
        })(m.Component),
        H = Object(h.b)(
          function(e) {
            return {
              meDetails: e.meDetails,
              contactGroupDetails: e.contactGroupDetails,
              permissions: e.systemData.permissions
            };
          },
          function(e) {
            return {
              updateContactGroupDetails: function(t) {
                e(Object(v.e)(t));
              }
            };
          }
        )(W),
        J = a(695),
        Z = Object(h.b)(function(e) {
          return { contactGroupDetails: e.contactGroupDetails };
        })(function(e) {
          var t = e.contactGroupDetails,
            a = t.name,
            n = t.dynamicFilterType,
            r = t.contactGroupComposedType,
            o = t.description,
            c = t.responsibleUser,
            i = void 0 === c ? {} : c,
            s = t.closedStatus,
            l = t.dateStarted,
            u = t.dateFinished,
            d = t.createdAt,
            p = t.type,
            m = t.createdBy,
            h = t.showPortal,
            v = t.editPortal,
            g = t.showContactForm;
          return f.a.createElement(
            "div",
            { onClick: e.switchToEdit },
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(J.a, { label: "Naam", value: a }),
              "composed" === p.id &&
                f.a.createElement(J.a, {
                  label: "Voorwaarde",
                  value:
                    "one" === r ? "In één van de groepen" : "In alle groepen"
                }),
              "dynamic" === p.id &&
                f.a.createElement(J.a, {
                  label: "Filter voorwaarde",
                  value:
                    "or" === n
                      ? 'Alle extra filters zijn "OF"'
                      : 'Alle extra filters zijn "EN"'
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
                o
              )
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(J.a, {
                label: "Verantwoordelijke",
                value: i && i.fullName,
                link: i ? "gebruiker/" + i.id : ""
              }),
              f.a.createElement(J.a, { label: "Status", value: s })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(J.a, {
                label: "Startdatum",
                value: l && I()(l).format("DD-MM-Y")
              }),
              f.a.createElement(J.a, {
                label: "Datum gereed",
                value: u && I()(u).format("DD-MM-Y")
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(J.a, {
                label: "Zichtbaar op portaal",
                value: h ? "Ja" : "Nee"
              }),
              f.a.createElement(J.a, {
                label: "Veranderen op portaal",
                value: v ? "Ja" : "Nee"
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(J.a, {
                label: "Zichtbaar bij contact",
                value: g ? "Ja" : "Nee"
              }),
              f.a.createElement(J.a, { label: "Type", value: p ? p.name : "" })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(J.a, {
                label: "Gemaakt op",
                value: d && I()(d).format("DD-MM-Y")
              }),
              f.a.createElement(J.a, {
                label: "Gemaakt door",
                value: m && m.fullName
              })
            )
          );
        });
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
            n = p()(e);
          if (t) {
            var r = p()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var Q = (function(e) {
          s()(a, e);
          var t = K(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(y()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              E()(y()(n), "switchToView", function() {
                n.setState({ showEdit: !1, activeDiv: "" });
              }),
              (n.state = { showEdit: "edit" === e.mode, activeDiv: "" }),
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
                    t = this.props.permissions;
                  return f.a.createElement(
                    C.a,
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
                      k.a,
                      null,
                      f.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        this.state.showEdit && t.manageGroup
                          ? f.a.createElement(H, {
                              switchToView: this.switchToView
                            })
                          : f.a.createElement(Z, {
                              switchToEdit: this.switchToEdit
                            })
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(m.Component),
        $ = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(Q);
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
            n = p()(e);
          if (t) {
            var r = p()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var te = (function(e) {
          s()(a, e);
          var t = ee(a);
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
                      ? (e = "Fout bij het ophalen van groep.")
                      : Object(A.isEmpty)(this.props.contactGroupDetails)
                      ? (e = "Gegevens aan het laden.")
                      : Object(A.isEmpty)(this.props.contactGroupDetails)
                      ? (e = "Geen groep gevonden!")
                      : (t = !1),
                    t
                      ? f.a.createElement("div", null, e)
                      : f.a.createElement(
                          "div",
                          null,
                          f.a.createElement($, { mode: this.props.mode })
                        )
                  );
                }
              }
            ]),
            a
          );
        })(m.Component),
        ae = Object(h.b)(function(e) {
          return {
            contactGroupDetails: e.contactGroupDetails,
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        }, null)(te),
        ne = function(e, t) {
          switch (e) {
            case "field":
              switch (t) {
                case "id":
                  return "Id";
                case "number":
                  return "Contact nummer";
                case "typeId":
                  return "Type";
                case "payoutTypeId":
                  return "Uitkeren op";
                case "didAgreeAvg":
                  return "Akkoord privacybeleid";
                case "fullName":
                  return "Naam";
                case "streetAndNumber":
                  return "Straat";
                case "postalCode":
                  return "Postcode";
                case "city":
                  return "Woonplaats";
                case "country":
                  return "Land";
                case "emailAddress":
                  return "E-mailadres";
                case "phoneNumber":
                  return "Telefoon nummer";
                case "statusId":
                  return "Status";
                case "name":
                  return "Naam";
                case "currentObligations":
                  return "Aantal obligaties";
                case "currentParticipations":
                  return "Aantal participaties";
                case "currentPostalcodeLinkCapital":
                  return "Aantal postcoderoos";
                case "currentLoan":
                  return "Bedrag lening";
                case "staticContactGroup":
                  return "Statische groep";
                case "occupation":
                  return "Verbinding";
                case "occupationPrimary":
                  return "Primaire verbinding";
                case "opportunity":
                  return "Kans";
                case "portalUser":
                  return "Portal gebruiker actief";
                case "product":
                  return "Product";
                case "dateStart":
                  return "Product - Begin datum";
                case "dateFinish":
                  return "Product - Eind datum";
                case "orderStatus":
                  return "Product - Order status";
                case "contactType":
                  return "Contact type";
                case "address":
                  return "Adres";
                case "dateRegister":
                  return "Eerste ingangsdatum deelname";
                case "energySupplierId":
                  return "Energie leverancier";
                case "contactBirthday":
                  return "Contact geboortedatum";
                case "projectId":
                  return "Project";
                case "dateOfBirth":
                  return "Geboortedatum";
                case "energySupplier":
                  return "Energie leverancier";
                case "dateContractSend":
                  return "Datum contract verzonden";
                case "dateEnd":
                  return "Einddatum";
                case "giftedByContactId":
                  return "Geschonken door";
                case "participationsSold":
                  return "Deelnames overgedragen";
                case "didAcceptAgreement":
                  return "Akkoord voorwaarden";
                case "didUnderstandInfo":
                  return "Projectinfo begrepen";
                case "participationsRequested":
                  return "Deelnames aangevraagd";
                case "participantMutationTypeId":
                  return "Deelname type (Mutaties)";
                case "participantMutationStatusId":
                  return "Deelname status (Mutaties)";
                case "participantMutationDateContractRetour":
                  return "Datum contract retour (Mutaties)";
                case "participantMutationDatePayment":
                  return "Betaaldatum (Mutaties)";
                case "obligationsDefinitive":
                  return "Huidig aantal obligaties";
                case "participationsDefinitive":
                  return "Huidig aantal participaties";
                case "postalcodeLinkCapitalDefinitive":
                  return "Huidig aantal postcoderoos";
                case "loanDefinitive":
                  return "Huidig bedrag obligaties";
                case "createdAt":
                  return "Gemaakt op";
              }
              break;
            case "comperator":
              switch (t) {
                case "eq":
                  return "gelijk aan";
                case "neq":
                  return "niet gelijk aan";
                case "rel":
                  return "gelijk aan";
                case "nrel":
                  return "niet gelijk aan";
                case "ct":
                  return "bevat";
                case "nct":
                  return "bevat niet";
                case "lt":
                  return "kleiner dan";
                case "lte":
                  return "kleiner of gelijk aan";
                case "gt":
                  return "groter dan";
                case "gte":
                  return "groter dan of gelijk aan";
                case "nl":
                  return "is leeg";
                case "nnl":
                  return "is niet leeg";
                case "is0":
                  return "is 0";
                case "isn0":
                  return "is niet 0";
                case "bw":
                  return "begint met";
                case "nbw":
                  return "begint niet met";
                case "ew":
                  return "eindigt met";
                case "new":
                  return "eindigt niet met";
                case "bool":
                  return "is";
              }
          }
        },
        re = function(e) {
          var t = e.extraFilter,
            a = t.field,
            n = t.comperator,
            r = t.dataName,
            o = r;
          !Object(A.isEmpty)(r) ||
            ("energySupplier" !== a &&
              "orderStatus" !== a &&
              "product" !== a &&
              "opportunity" !== a &&
              "occupationPrimary" !== a &&
              "occupation" !== a &&
              "staticContactGroup" !== a &&
              "country" !== a) ||
            ("eq" !== n && "neq" !== n && "rel" !== n && "nrel" !== n) ||
            (o = "--Willekeurige waarde--");
          var c = ne("field", a),
            i = ne("comperator", n);
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
              null,
              f.a.createElement("div", { className: "col-sm-3" }, c),
              f.a.createElement("div", { className: "col-sm-3" }, i),
              f.a.createElement("div", { className: "col-sm-3" }, o)
            )
          );
        };
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
            n = p()(e);
          if (t) {
            var r = p()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var ce = (function(e) {
          s()(a, e);
          var t = oe(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(y()(n), "onLineEnter", function() {
                n.setState({ highlightLine: "highlight-line" });
              }),
              E()(y()(n), "onLineLeave", function() {
                n.setState({ highlightLine: "" });
              }),
              (n.state = { highlightLine: "" }),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "render",
                value: function() {
                  return f.a.createElement(
                    "div",
                    null,
                    f.a.createElement(re, {
                      highlightLine: this.state.highlightLine,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      extraFilter: this.props.extraFilter
                    })
                  );
                }
              }
            ]),
            a
          );
        })(m.Component),
        ie = Object(h.b)(function(e) {
          return { extraFilters: e.contactGroupDetails.extraFilters };
        })(function(e) {
          return f.a.createElement(
            "div",
            null,
            f.a.createElement(
              "div",
              { className: "row border header" },
              f.a.createElement("div", { className: "col-sm-3" }, "Veld"),
              f.a.createElement("div", { className: "col-sm-3" }, "Type"),
              f.a.createElement("div", { className: "col-sm-3" }, "Waarde")
            ),
            e.extraFilters.length > 0
              ? e.extraFilters.map(function(e) {
                  return f.a.createElement(ce, { key: e.id, extraFilter: e });
                })
              : f.a.createElement("div", null, "Geen extra filters bekend.")
          );
        }),
        se = a(698);
      function le(e) {
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
      var ue = (function(e) {
          s()(a, e);
          var t = le(a);
          function a(e) {
            return r()(this, a), t.call(this, e);
          }
          return (
            c()(a, [
              {
                key: "render",
                value: function() {
                  return f.a.createElement(
                    C.a,
                    null,
                    f.a.createElement(
                      se.a,
                      null,
                      f.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Extra filters"
                      )
                    ),
                    f.a.createElement(
                      k.a,
                      null,
                      f.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        f.a.createElement(ie, null)
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(m.Component),
        de = function(e) {
          var t = e.filter,
            a = t.field,
            n = t.dataName,
            r = ne("field", a);
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
              null,
              f.a.createElement("div", { className: "col-sm-3" }, r),
              f.a.createElement("div", { className: "col-sm-3" }, n)
            )
          );
        };
      function pe(e, t) {
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
      function me(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? pe(Object(a), !0).forEach(function(t) {
                E()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : pe(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
            n = p()(e);
          if (t) {
            var r = p()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var he = (function(e) {
          s()(a, e);
          var t = fe(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(y()(n), "onLineEnter", function() {
                n.setState({ highlightLine: "highlight-line" });
              }),
              E()(y()(n), "onLineLeave", function() {
                n.setState({ highlightLine: "" });
              }),
              (n.state = { highlightLine: "", filter: me({}, e.filter) }),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "render",
                value: function() {
                  return f.a.createElement(
                    "div",
                    null,
                    f.a.createElement(de, {
                      highlightLine: this.state.highlightLine,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      filter: this.state.filter
                    })
                  );
                }
              }
            ]),
            a
          );
        })(m.Component),
        ve = Object(h.b)(function(e) {
          return { filters: e.contactGroupDetails.filters };
        })(function(e) {
          return f.a.createElement(
            "div",
            null,
            f.a.createElement(
              "div",
              { className: "row border header" },
              f.a.createElement("div", { className: "col-sm-3" }, "Veld"),
              f.a.createElement("div", { className: "col-sm-3" }, "Waarde")
            ),
            e.filters.length > 0
              ? e.filters.map(function(e) {
                  return f.a.createElement(he, { key: e.id, filter: e });
                })
              : f.a.createElement("div", null, "Geen filters bekend.")
          );
        });
      function ge(e) {
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
      var ye = (function(e) {
        s()(a, e);
        var t = ge(a);
        function a(e) {
          return r()(this, a), t.call(this, e);
        }
        return (
          c()(a, [
            {
              key: "render",
              value: function() {
                return f.a.createElement(
                  C.a,
                  null,
                  f.a.createElement(
                    se.a,
                    null,
                    f.a.createElement(
                      "span",
                      { className: "h5 text-bold" },
                      "Filters"
                    )
                  ),
                  f.a.createElement(
                    k.a,
                    null,
                    f.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      f.a.createElement(ve, null)
                    )
                  )
                );
              }
            }
          ]),
          a
        );
      })(m.Component);
      function be(e) {
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
      var Ee = (function(e) {
          s()(a, e);
          var t = be(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(y()(n), "openItem", function(e) {
                D.f.push("/taak/".concat(e));
              }),
              (n.state = { relatedTasks: "" }),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedTasks;
                  return f.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      f.a.createElement("div", null, "Geen taken gevonden."),
                    "" != t &&
                      f.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        f.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return f.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: a
                              },
                              f.a.createElement(
                                "td",
                                { className: "col-xs-12 clickable" },
                                I()(t.createdAt).format("L"),
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
        })(m.Component),
        De = Object(h.b)(function(e) {
          return { relatedTasks: e.contactGroupDetails.relatedTasks };
        })(Ee),
        Ne = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showTasksList,
            n = e.newTask,
            r = e.taskCount,
            o = e.permissions;
          return f.a.createElement(
            C.a,
            { className: "harmonica-button" },
            f.a.createElement(
              k.a,
              null,
              f.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                f.a.createElement(
                  "span",
                  { className: "" },
                  "TAKEN ",
                  f.a.createElement("span", { className: "badge" }, r)
                )
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                o.manageTask &&
                  f.a.createElement(
                    "a",
                    { role: "button", className: "pull-right", onClick: n },
                    f.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white"
                    })
                  )
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && f.a.createElement(De, null)
              )
            )
          );
        });
      function Ce(e) {
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
          s()(a, e);
          var t = Ce(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(y()(n), "openItem", function(e) {
                D.f.push("/document/".concat(e));
              }),
              (n.state = { relatedDocuments: "" }),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedDocuments;
                  return f.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      f.a.createElement(
                        "div",
                        null,
                        "Geen documenten gevonden."
                      ),
                    "" != t &&
                      f.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        f.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return f.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: a
                              },
                              f.a.createElement(
                                "td",
                                { className: "col-xs-5 clickable" },
                                I()(t.created_at).format("L")
                              ),
                              f.a.createElement(
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
        })(m.Component),
        Oe = Object(h.b)(function(e) {
          return { relatedDocuments: e.contactGroupDetails.relatedDocuments };
        })(ke),
        we = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showDocumentsList,
            n = e.newDocument,
            r = e.documentCount,
            o = e.permissions;
          return f.a.createElement(
            C.a,
            { className: "harmonica-button" },
            f.a.createElement(
              k.a,
              null,
              f.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                f.a.createElement(
                  "span",
                  null,
                  "DOCUMENTEN ",
                  f.a.createElement("span", { className: "badge" }, r)
                )
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-2" },
                o.createDocument &&
                  f.a.createElement(
                    "div",
                    { className: "pull-right" },
                    f.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white",
                      "data-toggle": "dropdown",
                      role: "button"
                    }),
                    f.a.createElement(
                      "ul",
                      { className: "dropdown-menu" },
                      f.a.createElement(
                        "li",
                        null,
                        f.a.createElement(
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
                      f.a.createElement(
                        "li",
                        null,
                        f.a.createElement(
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
              f.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && f.a.createElement(Oe, null)
              )
            )
          );
        });
      function Ge(e, t) {
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
      function Te(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Ge(Object(a), !0).forEach(function(t) {
                E()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Ge(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Se(e) {
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
      var je = (function(e) {
          s()(a, e);
          var t = Se(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(y()(n), "newTask", function() {
                D.f.push("/taak/nieuw/contact-groep/".concat(n.props.id));
              }),
              E()(y()(n), "newDocument", function(e) {
                D.f.push(
                  "/document/nieuw/"
                    .concat(e, "/contact-groep/")
                    .concat(n.props.id)
                );
              }),
              (n.state = { toggleShowList: { tasks: !1, documents: !1 } }),
              (n.toggleShowList = n.toggleShowList.bind(y()(n))),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "toggleShowList",
                value: function(e) {
                  this.setState(
                    Te(
                      Te({}, this.state),
                      {},
                      {
                        toggleShowList: Te(
                          Te({}, this.state.toggleShowList),
                          {},
                          E()({}, e, !this.state.toggleShowList[e])
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
                  this.props.permissions;
                  return f.a.createElement(
                    "div",
                    { className: "margin-10-top" },
                    f.a.createElement(Ne, {
                      toggleShowList: function() {
                        return e.toggleShowList("tasks");
                      },
                      showTasksList: this.state.toggleShowList.tasks,
                      taskCount: this.props.contactGroupDetails.taskCount,
                      newTask: this.newTask
                    }),
                    f.a.createElement(we, {
                      toggleShowList: function() {
                        return e.toggleShowList("documents");
                      },
                      showDocumentsList: this.state.toggleShowList.documents,
                      newDocument: this.newDocument,
                      documentCount: this.props.contactGroupDetails
                        .documentCount
                    })
                  );
                }
              }
            ]),
            a
          );
        })(m.Component),
        Pe = Object(h.b)(function(e) {
          return {
            contactGroupDetails: e.contactGroupDetails,
            permissions: e.meDetails.permissions
          };
        })(je),
        Ae = function(e) {
          var t = e.composedGroup,
            a = t.id,
            n = t.name;
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
              null,
              f.a.createElement(
                "div",
                {
                  className: "col-sm-11",
                  onClick: function() {
                    return D.f.push("/contact-groep/".concat(a));
                  }
                },
                n
              ),
              f.a.createElement(
                "div",
                { className: "col-sm-1" },
                e.showActionButtons
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
            )
          );
        },
        Re = Object(h.b)(null, function(e) {
          return {
            deleteComposedGroup: function(t, a) {
              e(Object(v.c)(t, a));
            },
            fetchContactGroupDetails: function(t) {
              e(Object(v.d)(t));
            }
          };
        })(function(e) {
          return f.a.createElement(
            w.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return (
                  e.deleteComposedGroup(e.contactGroupId, e.composedGroup.id),
                  e.fetchContactGroupDetails(e.contactGroupId),
                  void e.closeDeleteItemModal()
                );
              },
              title: "Verwijderen"
            },
            f.a.createElement(
              "p",
              null,
              "Ontkoppel groep: ",
              f.a.createElement(
                "strong",
                null,
                " ",
                "".concat(e.composedGroup.name),
                " "
              )
            )
          );
        });
      function Le(e, t) {
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
      function Me(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Le(Object(a), !0).forEach(function(t) {
                E()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Le(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function xe(e) {
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
      var Ie = (function(e) {
          s()(a, e);
          var t = xe(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(y()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              E()(y()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              E()(y()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              (n.state = {
                highlightLine: "",
                showActionButtons: !1,
                showDelete: !1,
                composedGroup: Me({}, e.composedGroup)
              }),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "render",
                value: function() {
                  return f.a.createElement(
                    "div",
                    null,
                    f.a.createElement(Ae, {
                      highlightLine: this.state.highlightLine,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      toggleDelete: this.toggleDelete,
                      showActionButtons: this.state.showActionButtons,
                      composedGroup: this.state.composedGroup
                    }),
                    this.state.showDelete &&
                      f.a.createElement(Re, {
                        closeDeleteItemModal: this.toggleDelete,
                        contactGroupId: this.props.contactGroupId,
                        composedGroup: this.state.composedGroup
                      })
                  );
                }
              }
            ]),
            a
          );
        })(m.Component),
        Fe = Object(h.b)(function(e) {
          return {
            composedGroups: e.contactGroupDetails.composedGroups,
            contactGroupId: e.contactGroupDetails.id
          };
        })(function(e) {
          return f.a.createElement(
            "div",
            null,
            f.a.createElement(
              "div",
              { className: "row border header" },
              f.a.createElement("div", { className: "col-sm-12" }, "Groep")
            ),
            e.composedGroups.length > 0
              ? e.composedGroups.map(function(t) {
                  return f.a.createElement(Ie, {
                    key: t.id,
                    composedGroup: t,
                    contactGroupId: e.contactGroupId
                  });
                })
              : f.a.createElement(
                  "div",
                  null,
                  "Geen samengestelde groepen bekend."
                )
          );
        });
      function _e(e, t) {
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
      function Be(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? _e(Object(a), !0).forEach(function(t) {
                E()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : _e(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function qe(e) {
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
      var ze = (function(e) {
          s()(a, e);
          var t = qe(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(y()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(E()({}, r, a));
              }),
              E()(y()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = {},
                  a = !1;
                M.a.isEmpty(n.state.contactGroupToAttachId) &&
                  ((t.contactGroupToAttachId = !0), (a = !0)),
                  n.setState(Be(Be({}, n.state), {}, { errors: t })),
                  a ||
                    (n.props.attachComposedGroup(
                      n.props.contactGroupId,
                      n.state.contactGroupToAttachId
                    ),
                    n.props.fetchContactGroupDetails(n.props.contactGroupId),
                    n.props.toggleAddGroup());
              }),
              (n.state = {
                contactGroups: [],
                contactGroupToAttachId: "",
                errors: { contactGroupToAttachId: !1 }
              }),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  F.a.peekContactGroups().then(function(t) {
                    e.setState({ contactGroups: t });
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.contactGroups;
                  return (
                    this.props.composedGroups.map(function(t) {
                      R.a.remove(e, function(e) {
                        return e.id === t.id;
                      });
                    }),
                    f.a.createElement(
                      w.a,
                      {
                        buttonConfirmText: "Toevoegen",
                        closeModal: this.props.toggleAddGroup,
                        confirmAction: this.handleSubmit,
                        title: "Groep koppelen"
                      },
                      f.a.createElement(
                        "div",
                        { className: "row" },
                        f.a.createElement(U.a, {
                          size: "col-md-12",
                          label: "Groep",
                          name: "contactGroupToAttachId",
                          options: e,
                          value: this.state.contactGroupToAttachId,
                          onChangeAction: this.handleInputChange,
                          required: "required",
                          error: this.state.errors.contactGroupToAttachId
                        })
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(m.Component),
        Ue = Object(h.b)(
          function(e) {
            return { composedGroups: e.contactGroupDetails.composedGroups };
          },
          function(e) {
            return {
              attachComposedGroup: function(t, a) {
                e(Object(v.a)(t, a));
              },
              fetchContactGroupDetails: function(t) {
                e(Object(v.d)(t));
              }
            };
          }
        )(ze);
      function Ve(e) {
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
      var Ye = (function(e) {
          s()(a, e);
          var t = Ve(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(y()(n), "toggleAddGroup", function() {
                n.setState({ showAddGroup: !n.state.showAddGroup });
              }),
              (n.state = { showAddGroup: !1 }),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "render",
                value: function() {
                  return f.a.createElement(
                    C.a,
                    null,
                    f.a.createElement(
                      se.a,
                      null,
                      f.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Samengesteld uit"
                      ),
                      f.a.createElement(
                        "a",
                        {
                          role: "button",
                          className: "pull-right",
                          onClick: this.toggleAddGroup
                        },
                        f.a.createElement("span", {
                          className: "glyphicon glyphicon-plus"
                        })
                      )
                    ),
                    f.a.createElement(
                      k.a,
                      null,
                      f.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        f.a.createElement(Fe, null)
                      )
                    ),
                    this.state.showAddGroup &&
                      f.a.createElement(Ue, {
                        toggleAddGroup: this.toggleAddGroup,
                        contactGroupId: this.props.contactGroupId
                      })
                  );
                }
              }
            ]),
            a
          );
        })(m.Component),
        Xe = Object(h.b)(function(e) {
          return { contactGroupId: e.contactGroupDetails.id };
        })(Ye);
      function We(e) {
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
      var He = (function(e) {
        s()(a, e);
        var t = We(a);
        function a(e) {
          return r()(this, a), t.call(this, e);
        }
        return (
          c()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchContactGroupDetails(this.props.params.id);
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearContactGroupDetails();
              }
            },
            {
              key: "componentWillReceiveProps",
              value: function(e) {
                this.props.params.id !== e.params.id &&
                  this.props.fetchContactGroupDetails(e.params.id);
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
                      f.a.createElement(P, null)
                    ),
                    f.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      f.a.createElement(ae, { mode: this.props.params.mode })
                    ),
                    this.props.contactGroupDetails.type &&
                      "dynamic" === this.props.contactGroupDetails.type.id &&
                      f.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        f.a.createElement(ye, null)
                      ),
                    this.props.contactGroupDetails.type &&
                      "dynamic" === this.props.contactGroupDetails.type.id &&
                      f.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        f.a.createElement(ue, null)
                      ),
                    this.props.contactGroupDetails.type &&
                      "composed" === this.props.contactGroupDetails.type.id &&
                      f.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        f.a.createElement(Xe, null)
                      )
                  ),
                  f.a.createElement(
                    C.a,
                    { className: "col-md-3 harmonica" },
                    f.a.createElement(
                      k.a,
                      null,
                      f.a.createElement(Pe, { id: this.props.params.id })
                    )
                  )
                );
              }
            }
          ]),
          a
        );
      })(m.Component);
      t.default = Object(h.b)(
        function(e) {
          return {
            userDetails: e.userDetails,
            contactGroupDetails: e.contactGroupDetails
          };
        },
        function(e) {
          return {
            fetchContactGroupDetails: function(t) {
              e(Object(v.d)(t));
            },
            clearContactGroupDetails: function() {
              e(Object(v.b)());
            }
          };
        }
      )(He);
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
            s = e.loadText,
            l = e.disabled;
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
                s
              )
            : r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: c,
                  disabled: l
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
            s = e.name,
            l = e.value,
            u = e.onClickAction,
            d = e.onChangeAction,
            p = e.onBlurAction,
            m = e.required,
            f = e.readOnly,
            h = e.maxLength,
            v = e.error,
            g = e.min,
            y = e.max,
            b = e.step,
            E = e.errorMessage,
            D = e.divSize,
            N = e.divClassName,
            C = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(D, " ").concat(N) },
            r.a.createElement(
              "label",
              { htmlFor: c, className: "col-sm-6 ".concat(m) },
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
                name: s,
                value: l,
                onClick: u,
                onChange: d,
                onBlur: p,
                readOnly: f,
                maxLength: h,
                min: g,
                max: y,
                autoComplete: C,
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
        s = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            c = e.value,
            i = e.link,
            s = e.hidden;
          return i.length > 0
            ? r.a.createElement(
                "div",
                { className: a, style: s ? { display: "none" } : {} },
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
                { className: a, style: s ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement("div", { className: "col-sm-6", id: n }, c)
              );
        };
      (s.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (s.propTypes = {
          label: i.a.oneOfType([i.a.string, i.a.object]).isRequired,
          className: i.a.string,
          id: i.a.string,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          link: i.a.string,
          hidden: i.a.bool
        }),
        (t.a = s);
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
            s = e.options,
            l = e.onChangeAction,
            u = e.onBlurAction,
            d = e.required,
            p = e.error,
            m = e.errorMessage,
            f = e.optionValue,
            h = e.optionName,
            v = e.readOnly,
            g = e.placeholder,
            y = e.divClassName,
            b = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(y) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(d) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-6" },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(a) + (p && " has-error"),
                  id: o,
                  name: c,
                  value: i,
                  onChange: l,
                  onBlur: u,
                  readOnly: v
                },
                b && r.a.createElement("option", { value: "" }, g),
                s.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[f], value: e[f] },
                    e[h]
                  );
                })
              )
            ),
            p &&
              r.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                r.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  m
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
        s = a.n(i),
        l = a(26),
        u = a.n(l),
        d = a(27),
        p = a.n(d),
        m = a(16),
        f = a.n(m),
        h = a(6),
        v = a.n(h),
        g = a(0),
        y = a.n(g),
        b = a(8),
        E = a.n(b),
        D = a(707),
        N = a.n(D),
        C = a(708),
        k = a.n(C),
        O = a(7),
        w = a.n(O);
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
      w.a.locale("nl");
      var T = (function(e) {
        u()(a, e);
        var t = G(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            v()(s()(n), "validateDate", function(e) {
              var t = w()(e.target.value, "DD-MM-YYYY", !0),
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
            v()(s()(n), "onDateChange", function(e) {
              var t = e ? w()(e).format("Y-MM-DD") : "",
                a = !1;
              t &&
                n.props.disabledBefore &&
                w()(t).isBefore(n.props.disabledBefore) &&
                (a = !0),
                t &&
                  n.props.disabledAfter &&
                  w()(t).isAfter(n.props.disabledAfter) &&
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
                  s = e.readOnly,
                  l = e.name,
                  u = e.error,
                  d = e.errorMessage,
                  p = e.disabledBefore,
                  m = e.disabledAfter,
                  f = c ? w()(c).format("L") : "",
                  h = {};
                return (
                  p && (h.before = new Date(p)),
                  m && (h.after = new Date(m)),
                  y.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    y.a.createElement(
                      "div",
                      null,
                      y.a.createElement(
                        "label",
                        { htmlFor: o, className: "col-sm-6 ".concat(i) },
                        t
                      )
                    ),
                    y.a.createElement(
                      "div",
                      { className: "".concat(n) },
                      y.a.createElement(N.a, {
                        id: o,
                        value: f,
                        formatDate: C.formatDate,
                        parseDate: C.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: k.a,
                          disabledDays: h
                        },
                        inputProps: {
                          className:
                            "form-control input-sm ".concat(a) +
                            (this.state.errorDateFormat || u
                              ? " has-error"
                              : ""),
                          name: l,
                          onBlur: this.validateDate,
                          autoComplete: "off",
                          readOnly: s,
                          disabled: s
                        },
                        required: i,
                        readOnly: s,
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
      })(g.Component);
      (T.defaultProps = {
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
        (T.propTypes = {
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
        (t.a = T);
    },
    700: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        c = a.n(o),
        i = a(703),
        s = a.n(i),
        l = function(e) {
          var t = e.label,
            a = e.size,
            n = e.id,
            o = e.name,
            c = e.value,
            i = e.onChangeAction,
            l = e.required,
            u = e.divSize,
            d = e.className,
            p = e.disabled;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(u, " ").concat(d) },
            r.a.createElement(
              "div",
              null,
              r.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(l) },
                t
              )
            ),
            r.a.createElement(
              "div",
              { className: "".concat(a) },
              r.a.createElement(s.a, {
                id: n,
                name: o,
                onChange: i,
                checked: c,
                disabled: p
              })
            )
          );
        };
      (l.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        required: "",
        disabled: !1,
        value: null
      }),
        (l.propTypes = {
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
        (t.a = l);
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
        c = p(o),
        i = p(a(710)),
        s = p(a(8)),
        l = p(a(704)),
        u = p(a(705)),
        d = a(706);
      function p(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var m = (function(e) {
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
      (t.default = m),
        (m.displayName = "Toggle"),
        (m.defaultProps = {
          icons: {
            checked: c.default.createElement(l.default, null),
            unchecked: c.default.createElement(u.default, null)
          }
        }),
        (m.propTypes = {
          checked: s.default.bool,
          disabled: s.default.bool,
          defaultChecked: s.default.bool,
          onChange: s.default.func,
          onFocus: s.default.func,
          onBlur: s.default.func,
          className: s.default.string,
          name: s.default.string,
          value: s.default.string,
          id: s.default.string,
          "aria-labelledby": s.default.string,
          "aria-label": s.default.string,
          icons: s.default.oneOfType([
            s.default.bool,
            s.default.shape({
              checked: s.default.node,
              unchecked: s.default.node
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
              var o = typeof n;
              if ("string" === o || "number" === o) e.push(n);
              else if (Array.isArray(n) && n.length) {
                var c = r.apply(null, n);
                c && e.push(c);
              } else if ("object" === o)
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
    802: function(e, t, a) {
      "use strict";
      a.d(t, "d", function() {
        return n;
      }),
        a.d(t, "e", function() {
          return r;
        }),
        a.d(t, "b", function() {
          return o;
        }),
        a.d(t, "c", function() {
          return c;
        }),
        a.d(t, "a", function() {
          return i;
        });
      var n = function(e) {
          return { type: "FETCH_CONTACT_GROUP_DETAILS", id: e };
        },
        r = function(e) {
          return {
            type: "UPDATE_CONTACT_GROUP_DETAILS",
            contactGroupDetails: e
          };
        },
        o = function() {
          return { type: "CLEAR_CONTACT_GROUP_DETAILS" };
        },
        c = function(e, t) {
          return {
            type: "DELETE_COMPOSED_GROUP",
            contactGroupId: e,
            contactGroupToDetachId: t
          };
        },
        i = function(e, t) {
          return {
            type: "ATTACH_COMPOSED_GROUP",
            contactGroupId: e,
            contactGroupToAttachId: t
          };
        };
    }
  }
]);
