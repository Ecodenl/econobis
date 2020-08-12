(window.webpackJsonp = window.webpackJsonp || []).push([
  [74],
  {
    1435: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        o = n(25),
        s = n.n(o),
        i = n(26),
        c = n.n(i),
        l = n(27),
        u = n.n(l),
        m = n(16),
        f = n.n(m),
        p = n(0),
        d = n.n(p),
        h = n(32),
        v = n(795),
        g = n(22),
        b = n.n(g),
        E = n(6),
        y = n.n(E),
        N = n(4),
        D = n(693),
        w = n(100),
        O = n(808),
        C = Object(h.b)(null, function(e) {
          return {
            deleteTeam: function(t) {
              e(Object(O.b)(t));
            }
          };
        })(function(e) {
          return d.a.createElement(
            w.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return (
                  e.deleteTeam(e.id),
                  e.closeDeleteItemModal(),
                  void N.f.push("/teams")
                );
              },
              title: "Verwijderen"
            },
            "Verwijder team: ",
            d.a.createElement("strong", null, " ", e.name, " ")
          );
        });
      function T(e) {
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var k = (function(e) {
          c()(n, e);
          var t = T(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              y()(b()(a), "toggleDelete", function() {
                a.setState({ showDelete: !a.state.showDelete });
              }),
              (a.state = { showDelete: !1 }),
              a
            );
          }
          return (
            s()(n, [
              {
                key: "render",
                value: function() {
                  return d.a.createElement(
                    "div",
                    { className: "row" },
                    d.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      d.a.createElement(
                        "div",
                        {
                          className: "btn-group btn-group-flex margin-small",
                          role: "group"
                        },
                        d.a.createElement(D.a, {
                          iconName: "glyphicon-arrow-left",
                          onClickAction: N.e.goBack
                        }),
                        d.a.createElement(D.a, {
                          iconName: "glyphicon-trash",
                          onClickAction: this.toggleDelete
                        })
                      )
                    ),
                    d.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      d.a.createElement(
                        "h4",
                        { className: "text-center" },
                        "Team: ",
                        this.props.name
                      )
                    ),
                    d.a.createElement("div", { className: "col-md-4" }),
                    this.state.showDelete &&
                      d.a.createElement(C, {
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
        S = Object(h.b)(function(e) {
          return { name: e.teamDetails.name, id: e.teamDetails.id };
        }, null)(k),
        j = n(198),
        R = n(697),
        A = n.n(R),
        L = n(128),
        P = n(694),
        x = n(692),
        I = n(690),
        M = n(691);
      function q(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          t &&
            (a = a.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, a);
        }
        return n;
      }
      function B(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? q(Object(n), !0).forEach(function(t) {
                y()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : q(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function V(e) {
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var z = (function(e) {
          c()(n, e);
          var t = V(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              ((a = t.call(this, e)).state = {
                team: e.teamDetails,
                errors: { name: !1 }
              }),
              (a.handleInputChange = a.handleInputChange.bind(b()(a))),
              (a.handleSubmit = a.handleSubmit.bind(b()(a))),
              a
            );
          }
          return (
            s()(n, [
              {
                key: "handleInputChange",
                value: function(e) {
                  var t = e.target,
                    n = "checkbox" === t.type ? t.checked : t.value,
                    a = t.name;
                  this.setState(
                    B(
                      B({}, this.state),
                      {},
                      { team: B(B({}, this.state.team), {}, y()({}, a, n)) }
                    )
                  );
                }
              },
              {
                key: "handleSubmit",
                value: function(e) {
                  e.preventDefault();
                  var t = this.state.team,
                    n = {},
                    a = !1;
                  A.a.isEmpty(t.name) && ((n.name = !0), (a = !0)),
                    this.setState(B(B({}, this.state), {}, { errors: n })),
                    !a && this.props.updateTeam(t, this.props.switchToView);
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.team.name;
                  return d.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    d.a.createElement(
                      I.a,
                      null,
                      d.a.createElement(
                        M.a,
                        null,
                        d.a.createElement(
                          "div",
                          { className: "row" },
                          d.a.createElement(P.a, {
                            label: "Naam",
                            name: "name",
                            value: e,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.name
                          })
                        )
                      ),
                      d.a.createElement(
                        M.a,
                        null,
                        d.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          d.a.createElement(x.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Sluiten",
                            onClickAction: this.props.switchToView
                          }),
                          d.a.createElement(x.a, {
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
        })(p.Component),
        _ = Object(h.b)(
          function(e) {
            return { teamDetails: e.teamDetails };
          },
          function(e) {
            return {
              updateTeam: function(t, n) {
                e(Object(v.d)(t, n));
              }
            };
          }
        )(z),
        U = n(695),
        F = Object(h.b)(function(e) {
          return { teamDetails: e.teamDetails };
        })(function(e) {
          var t = e.teamDetails.name;
          return d.a.createElement(
            "div",
            { onClick: e.switchToEdit },
            d.a.createElement(
              I.a,
              null,
              d.a.createElement(
                M.a,
                null,
                d.a.createElement(
                  "div",
                  { className: "row" },
                  d.a.createElement(U.a, { label: "Naam", value: t })
                )
              )
            )
          );
        });
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var H = (function(e) {
          c()(n, e);
          var t = G(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              y()(b()(a), "switchToEdit", function() {
                a.setState({ showEdit: !0 });
              }),
              y()(b()(a), "switchToView", function() {
                a.setState({ showEdit: !1, activeDiv: "" });
              }),
              (a.state = { showEdit: !1, activeDiv: "" }),
              a
            );
          }
          return (
            s()(n, [
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
                    n = void 0 === t ? {} : t;
                  return d.a.createElement(
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
                    this.state.showEdit && n.createTeam
                      ? d.a.createElement(_, {
                          switchToView: this.switchToView
                        })
                      : d.a.createElement(F, {
                          switchToEdit: this.switchToEdit
                        })
                  );
                }
              }
            ]),
            n
          );
        })(p.Component),
        J = Object(h.b)(function(e) {
          return {
            teamDetails: e.teamDetails,
            meDetails: e.meDetails,
            permissions: e.meDetails.permissions
          };
        })(H),
        W =
          (n(7),
          Object(h.b)(function(e) {
            return { permissions: e.meDetails.permissions };
          })(function(e) {
            var t = e.user,
              n = (t.id, t.fullName);
            return d.a.createElement(
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
              d.a.createElement("div", { className: "col-sm-11" }, n),
              d.a.createElement(
                "div",
                { className: "col-sm-1" },
                e.showActionButtons && e.permissions.createTeam
                  ? d.a.createElement(
                      "a",
                      { role: "button", onClick: e.toggleDelete },
                      d.a.createElement("span", {
                        className: "glyphicon glyphicon-trash mybtn-danger"
                      }),
                      " "
                    )
                  : ""
              )
            );
          })),
        K = Object(h.b)(
          function(e) {
            return { teamId: e.teamDetails.id };
          },
          function(e) {
            return {
              deleteTeamUser: function(t, n) {
                e(Object(v.a)(t, n));
              }
            };
          }
        )(function(e) {
          return d.a.createElement(
            w.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.toggleDelete,
              confirmAction: function() {
                return (
                  e.deleteTeamUser(e.teamId, e.userId), void e.toggleDelete()
                );
              },
              title: "Verwijderen"
            },
            d.a.createElement(
              "p",
              null,
              "Wil je deze gebruiker ontkoppelen van dit team?"
            )
          );
        });
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var X = (function(e) {
          c()(n, e);
          var t = Q(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              y()(b()(a), "onLineEnter", function() {
                a.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              y()(b()(a), "onLineLeave", function() {
                a.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              y()(b()(a), "toggleDelete", function() {
                a.setState({ showDelete: !a.state.showDelete });
              }),
              (a.state = {
                showActionButtons: !1,
                highlightLine: "",
                showDelete: !1,
                user: e.user
              }),
              a
            );
          }
          return (
            s()(n, [
              {
                key: "render",
                value: function() {
                  return d.a.createElement(
                    "div",
                    null,
                    d.a.createElement(W, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      toggleDelete: this.toggleDelete,
                      user: this.state.user
                    }),
                    this.state.showDelete &&
                      this.props.permissions.createTeam &&
                      d.a.createElement(K, {
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
        Y = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(X),
        Z = Object(h.b)(function(e) {
          return { users: e.teamDetails.users };
        })(function(e) {
          return d.a.createElement(
            "div",
            null,
            d.a.createElement(
              "div",
              { className: "row border header" },
              d.a.createElement("div", { className: "col-sm-11" }, "Naam"),
              d.a.createElement("div", { className: "col-sm-1" })
            ),
            e.users.length > 0
              ? e.users.map(function(e) {
                  return d.a.createElement(Y, { key: e.id, user: e });
                })
              : d.a.createElement("div", null, "Geen gebruikers bekend.")
          );
        }),
        $ = n(696);
      function ee(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          t &&
            (a = a.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, a);
        }
        return n;
      }
      function te(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ee(Object(n), !0).forEach(function(t) {
                y()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : ee(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var ae = (function(e) {
          c()(n, e);
          var t = ne(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              ((a = t.call(this, e)).state = {
                userId: "",
                errors: { userId: !1, hasErrors: !0 }
              }),
              (a.handleInputChange = a.handleInputChange.bind(b()(a))),
              (a.handleSubmit = a.handleSubmit.bind(b()(a))),
              a
            );
          }
          return (
            s()(n, [
              {
                key: "handleInputChange",
                value: function(e) {
                  var t = e.target.value;
                  this.setState({ userId: t });
                }
              },
              {
                key: "handleSubmit",
                value: function(e) {
                  var t = this;
                  e.preventDefault();
                  var n = {
                      teamId: this.props.teamId,
                      userId: this.state.userId
                    },
                    a = {},
                    r = !1;
                  A.a.isEmpty(n.userId) && ((a.userId = !0), (r = !0)),
                    this.setState(te(te({}, this.state), {}, { errors: a })),
                    r ||
                      L.a
                        .newTeamUser(n)
                        .then(function(e) {
                          t.props.newTeamUser(e.data.data),
                            t.props.toggleShowNew();
                        })
                        .catch(function(e) {
                          console.log(e.response);
                        });
                }
              },
              {
                key: "render",
                value: function() {
                  return d.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    d.a.createElement(
                      I.a,
                      { className: "panel-grey" },
                      d.a.createElement(
                        M.a,
                        null,
                        d.a.createElement(
                          "div",
                          { className: "row" },
                          d.a.createElement(P.a, {
                            label: "Team",
                            name: "team",
                            value: this.props.teamName,
                            readOnly: !0
                          }),
                          d.a.createElement($.a, {
                            label: "Gebruiker",
                            size: "col-sm-6",
                            name: "userId",
                            options: this.props.users,
                            optionName: "fullName",
                            value: this.state.userId,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.userId
                          })
                        ),
                        d.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          d.a.createElement(x.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          d.a.createElement(x.a, {
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
        })(p.Component),
        re = Object(h.b)(
          function(e) {
            return {
              teamId: e.teamDetails.id,
              teamName: e.teamDetails.name,
              users: e.systemData.users
            };
          },
          function(e) {
            return {
              newTeamUser: function(t) {
                e(Object(v.c)(t));
              }
            };
          }
        )(ae),
        oe = n(698);
      function se(e) {
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var ie = (function(e) {
          c()(n, e);
          var t = se(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              y()(b()(a), "toggleShowNew", function() {
                a.setState({ showNew: !a.state.showNew });
              }),
              (a.state = { showNew: !1 }),
              a
            );
          }
          return (
            s()(n, [
              {
                key: "render",
                value: function() {
                  return d.a.createElement(
                    I.a,
                    null,
                    d.a.createElement(
                      oe.a,
                      null,
                      d.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Gekoppelde gebruikers"
                      ),
                      this.props.permissions.createTeam &&
                        d.a.createElement(
                          "a",
                          {
                            role: "button",
                            className: "pull-right",
                            onClick: this.toggleShowNew
                          },
                          d.a.createElement("span", {
                            className: "glyphicon glyphicon-plus"
                          })
                        )
                    ),
                    d.a.createElement(
                      M.a,
                      null,
                      d.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        d.a.createElement(Z, null)
                      ),
                      d.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          d.a.createElement(re, {
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
        ce = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(ie);
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var ue = (function(e) {
          c()(n, e);
          var t = le(n);
          function n(e) {
            return r()(this, n), t.call(this, e);
          }
          return (
            s()(n, [
              {
                key: "render",
                value: function() {
                  var e = "",
                    t = !0;
                  return (
                    this.props.hasError
                      ? (e = "Fout bij het ophalen van team.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : Object(j.isEmpty)(this.props.teamDetails)
                      ? (e = "Geen team gevonden!")
                      : (t = !1),
                    t
                      ? d.a.createElement("div", null, e)
                      : d.a.createElement(
                          "div",
                          null,
                          d.a.createElement(J, null),
                          d.a.createElement(ce, null)
                        )
                  );
                }
              }
            ]),
            n
          );
        })(p.Component),
        me = Object(h.b)(
          function(e) {
            return {
              teamDetails: e.teamDetails,
              isLoading: e.loadingData.isLoading,
              hasError: e.loadingData.hasError
            };
          },
          function(e) {
            return {
              fetchTeamDetails: function(t) {
                e(Object(v.b)(t));
              }
            };
          }
        )(ue);
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var pe = (function(e) {
        c()(n, e);
        var t = fe(n);
        function n(e) {
          return r()(this, n), t.call(this, e);
        }
        return (
          s()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchTeamDetails(this.props.params.id);
              }
            },
            {
              key: "render",
              value: function() {
                return d.a.createElement(
                  "div",
                  { className: "row" },
                  d.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    d.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      d.a.createElement(
                        I.a,
                        null,
                        d.a.createElement(
                          M.a,
                          { className: "panel-small" },
                          d.a.createElement(S, null)
                        )
                      )
                    ),
                    d.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      d.a.createElement(me, null)
                    )
                  ),
                  d.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          n
        );
      })(p.Component);
      t.default = Object(h.b)(
        function(e) {
          return { teamDetails: e.teamDetails };
        },
        function(e) {
          return {
            fetchTeamDetails: function(t) {
              e(Object(v.b)(t));
            }
          };
        }
      )(pe);
    },
    690: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        s = n.n(o),
        i = function(e) {
          var t = e.children,
            n = e.className,
            a = e.onMouseEnter,
            o = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(n),
              onMouseEnter: a,
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
          className: s.a.string,
          onMouseEnter: s.a.func,
          onMouseLeave: s.a.func
        }),
        (t.a = i);
    },
    691: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        s = n.n(o),
        i = function(e) {
          var t = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            n
          );
        };
      (i.defaultProps = { className: "" }),
        (i.propTypes = { className: s.a.string }),
        (t.a = i);
    },
    692: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        s = n.n(o),
        i = function(e) {
          var t = e.buttonClassName,
            n = e.buttonText,
            a = e.onClickAction,
            o = e.type,
            s = e.value,
            i = e.loading,
            c = e.loadText,
            l = e.disabled;
          return i
            ? r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: s,
                  disabled: i
                },
                r.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                c
              )
            : r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm ".concat(t),
                  onClick: a,
                  value: s,
                  disabled: l
                },
                n
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
          buttonClassName: s.a.string,
          buttonText: s.a.string.isRequired,
          onClickAction: s.a.func,
          type: s.a.string,
          value: s.a.string,
          loading: s.a.bool,
          loadText: s.a.string,
          disabled: s.a.bool
        }),
        (t.a = i);
    },
    693: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        s = n.n(o),
        i = function(e) {
          var t = e.buttonClassName,
            n = e.iconName,
            a = e.onClickAction,
            o = e.title,
            s = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: a,
              disabled: s,
              title: o
            },
            r.a.createElement("span", { className: "glyphicon ".concat(n) })
          );
        };
      (i.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (i.propTypes = {
          buttonClassName: s.a.string,
          iconName: s.a.string.isRequired,
          onClickAction: s.a.func,
          title: s.a.string,
          disabled: s.a.bool
        }),
        (t.a = i);
    },
    694: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        s = n.n(o),
        i = function(e) {
          var t = e.label,
            n = e.type,
            a = e.className,
            o = e.size,
            s = e.id,
            i = e.placeholder,
            c = e.name,
            l = e.value,
            u = e.onClickAction,
            m = e.onChangeAction,
            f = e.onBlurAction,
            p = e.required,
            d = e.readOnly,
            h = e.maxLength,
            v = e.error,
            g = e.min,
            b = e.max,
            E = e.step,
            y = e.errorMessage,
            N = e.divSize,
            D = e.divClassName,
            w = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(N, " ").concat(D) },
            r.a.createElement(
              "label",
              { htmlFor: s, className: "col-sm-6 ".concat(p) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(o) },
              r.a.createElement("input", {
                type: n,
                className:
                  "form-control input-sm ".concat(a) + (v ? "has-error" : ""),
                id: s,
                placeholder: i,
                name: c,
                value: l,
                onClick: u,
                onChange: m,
                onBlur: f,
                readOnly: d,
                maxLength: h,
                min: g,
                max: b,
                autoComplete: w,
                step: E
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
        (t.a = i);
    },
    695: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(4),
        s = n(8),
        i = n.n(s),
        c = function(e) {
          var t = e.label,
            n = e.className,
            a = e.id,
            s = e.value,
            i = e.link,
            c = e.hidden;
          return i.length > 0
            ? r.a.createElement(
                "div",
                { className: n, style: c ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: a, className: "col-sm-6" },
                  t
                ),
                r.a.createElement(
                  "div",
                  { className: "col-sm-6", id: a, onClick: null },
                  r.a.createElement(
                    o.b,
                    { to: i, className: "link-underline" },
                    s
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: n, style: c ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: a, className: "col-sm-6" },
                  t
                ),
                r.a.createElement("div", { className: "col-sm-6", id: a }, s)
              );
        };
      (c.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (c.propTypes = {
          label: i.a.oneOfType([i.a.string, i.a.object]).isRequired,
          className: i.a.string,
          id: i.a.string,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          link: i.a.string,
          hidden: i.a.bool
        }),
        (t.a = c);
    },
    696: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        s = n.n(o),
        i = function(e) {
          var t = e.label,
            n = e.className,
            a = e.size,
            o = e.id,
            s = e.name,
            i = e.value,
            c = e.options,
            l = e.onChangeAction,
            u = e.onBlurAction,
            m = e.required,
            f = e.error,
            p = e.errorMessage,
            d = e.optionValue,
            h = e.optionName,
            v = e.readOnly,
            g = e.placeholder,
            b = e.divClassName,
            E = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(a, " ").concat(b) },
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
                    "form-control input-sm ".concat(n) + (f && " has-error"),
                  id: o,
                  name: s,
                  value: i,
                  onChange: l,
                  onBlur: u,
                  readOnly: v
                },
                E && r.a.createElement("option", { value: "" }, g),
                c.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[d], value: e[d] },
                    e[h]
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
        (t.a = i);
    },
    698: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        s = n.n(o),
        i = function(e) {
          var t = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-heading ".concat(t) },
            n
          );
        };
      (i.defaultProps = { className: "" }),
        (i.propTypes = { className: s.a.string }),
        (t.a = i);
    },
    795: function(e, t, n) {
      "use strict";
      n.d(t, "b", function() {
        return a;
      }),
        n.d(t, "d", function() {
          return r;
        }),
        n.d(t, "c", function() {
          return o;
        }),
        n.d(t, "a", function() {
          return s;
        });
      var a = function(e) {
          return { type: "FETCH_TEAM_DETAILS", id: e };
        },
        r = function(e, t) {
          return { type: "UPDATE_TEAM", team: e, switchToView: t };
        },
        o = function(e) {
          return { type: "NEW_TEAM_USER", teamUser: e };
        },
        s = function(e, t) {
          return { type: "DELETE_TEAM_USER", teamId: e, userId: t };
        };
    },
    808: function(e, t, n) {
      "use strict";
      n.d(t, "c", function() {
        return a;
      }),
        n.d(t, "a", function() {
          return r;
        }),
        n.d(t, "b", function() {
          return o;
        });
      var a = function() {
          return { type: "FETCH_TEAMS" };
        },
        r = function() {
          return { type: "CLEAR_TEAMS" };
        },
        o = function(e) {
          return { type: "DELETE_TEAM", id: e };
        };
    }
  }
]);
