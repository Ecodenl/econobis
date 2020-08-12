(window.webpackJsonp = window.webpackJsonp || []).push([
  [53],
  {
    1417: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        o = n(25),
        c = n.n(o),
        s = n(26),
        i = n.n(s),
        l = n(27),
        u = n.n(l),
        m = n(16),
        p = n.n(m),
        f = n(0),
        d = n.n(f),
        h = n(32),
        g = n(22),
        v = n.n(g),
        E = n(6),
        b = n.n(E),
        y = n(4),
        N = n(690),
        w = n(691),
        O = n(693),
        D = n(100),
        k = function(e) {
          return { type: "FETCH_CAMPAIGN", id: e };
        },
        C = Object(h.b)(null, function(e) {
          return {
            deleteCampaign: function(t) {
              e(
                (function(e) {
                  return { type: "DELETE_CAMPAIGN", id: e };
                })(t)
              );
            }
          };
        })(function(e) {
          return d.a.createElement(
            D.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return e.deleteCampaign(e.id), void e.closeDeleteItemModal();
              },
              title: "Verwijderen"
            },
            d.a.createElement(
              "p",
              null,
              "Weet u zeker dat u deze campagne wilt verwijderen?"
            )
          );
        });
      function j(e) {
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
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var S = (function(e) {
          i()(n, e);
          var t = j(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              b()(v()(a), "toggleDelete", function() {
                a.setState({ showDelete: !a.state.showDelete });
              }),
              (a.state = { showDelete: !1 }),
              a
            );
          }
          return (
            c()(n, [
              {
                key: "render",
                value: function() {
                  var e = this.props.campaign;
                  return d.a.createElement(
                    "div",
                    { className: "row" },
                    d.a.createElement(
                      "div",
                      { className: "col-sm-12" },
                      d.a.createElement(
                        N.a,
                        null,
                        d.a.createElement(
                          w.a,
                          { className: "panel-small" },
                          d.a.createElement(
                            "div",
                            { className: "col-md-2" },
                            d.a.createElement(
                              "div",
                              {
                                className:
                                  "btn-group btn-group-flex margin-small",
                                role: "group"
                              },
                              d.a.createElement(O.a, {
                                iconName: "glyphicon-arrow-left",
                                onClickAction: y.e.goBack
                              }),
                              this.props.permissions.manageMarketing &&
                                d.a.createElement(O.a, {
                                  iconName: "glyphicon-trash",
                                  onClickAction: this.toggleDelete
                                })
                            )
                          ),
                          d.a.createElement(
                            "div",
                            { className: "col-md-8" },
                            d.a.createElement(
                              "h4",
                              {
                                className:
                                  "text-center text-success margin-small"
                              },
                              d.a.createElement(
                                "strong",
                                null,
                                e.name ? "Campagne: " + e.name : ""
                              )
                            )
                          ),
                          d.a.createElement("div", { className: "col-md-2" })
                        )
                      )
                    ),
                    this.state.showDelete &&
                      d.a.createElement(C, {
                        closeDeleteItemModal: this.toggleDelete,
                        id: e.id
                      })
                  );
                }
              }
            ]),
            n
          );
        })(f.Component),
        L = Object(h.b)(function(e) {
          return {
            campaign: e.campaignDetails,
            permissions: e.meDetails.permissions
          };
        })(S),
        R = n(198),
        P = n(7),
        A = n.n(P),
        T = n(697),
        I = n.n(T),
        x = n(694),
        M = n(696),
        B = n(699),
        z = n(692),
        q = n(702),
        V = n(150),
        G = n(723);
      function F(e, t) {
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
      function W(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? F(Object(n), !0).forEach(function(t) {
                b()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : F(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function _(e) {
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
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      A.a.locale("nl");
      var Y = (function(e) {
          i()(n, e);
          var t = _(n);
          function n(e) {
            var a;
            r()(this, n),
              (a = t.call(this, e)),
              b()(v()(a), "handleInputChange", function(e) {
                var t = e.target,
                  n = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                a.setState(
                  W(
                    W({}, a.state),
                    {},
                    { campaign: W(W({}, a.state.campaign), {}, b()({}, r, n)) }
                  )
                );
              }),
              b()(v()(a), "handleStartDate", function(e) {
                var t = e ? A()(e).format("Y-MM-DD") : "";
                a.setState(
                  W(
                    W({}, a.state),
                    {},
                    {
                      campaign: W(W({}, a.state.campaign), {}, { startDate: t })
                    }
                  )
                );
              }),
              b()(v()(a), "handleEndDate", function(e) {
                var t = e ? A()(e).format("Y-MM-DD") : "";
                a.setState(
                  W(
                    W({}, a.state),
                    {},
                    { campaign: W(W({}, a.state.campaign), {}, { endDate: t }) }
                  )
                );
              }),
              b()(v()(a), "handleMeasureCategoryIds", function(e) {
                a.setState(
                  W(
                    W({}, a.state),
                    {},
                    {
                      campaign: W(
                        W({}, a.state.campaign),
                        {},
                        { measureCategoryIds: e }
                      )
                    }
                  )
                );
              }),
              b()(v()(a), "handleSubmit", function(e) {
                e.preventDefault();
                var t = a.state.campaign,
                  n = {},
                  r = !1;
                I.a.isEmpty(t.name) && ((n.name = !0), (r = !0)),
                  I.a.isEmpty("" + t.typeId) && ((n.type = !0), (r = !0)),
                  a.setState(W(W({}, a.state), {}, { errors: n })),
                  !r &&
                    V.a.updateCampaign(t.id, t).then(function(e) {
                      a.props.fetchCampaign(t.id), a.props.switchToView();
                    });
              });
            var o = e.campaign,
              c = o.id,
              s = o.name,
              i = o.number,
              l = o.description,
              u = o.startDate,
              m = o.endDate,
              p = o.status,
              f = o.measureCategories,
              d = o.type;
            return (
              (a.state = {
                campaign: {
                  id: c,
                  name: s,
                  number: i,
                  description: l || "",
                  startDate: u,
                  endDate: m,
                  statusId: p ? p.id : "",
                  typeId: d && d.id,
                  measureCategoryIds:
                    f &&
                    f
                      .map(function(e) {
                        return e.id;
                      })
                      .join(",")
                },
                errors: { name: !1, type: !1 }
              }),
              a
            );
          }
          return (
            c()(n, [
              {
                key: "render",
                value: function() {
                  var e = this.state.campaign,
                    t = (e.id, e.name),
                    n = e.number,
                    a = e.description,
                    r = e.startDate,
                    o = e.endDate,
                    c = e.statusId,
                    s = e.measureCategoryIds,
                    i = e.typeId;
                  return d.a.createElement(
                    "form",
                    {
                      className: "form-horizontal col-md-12",
                      onSubmit: this.handleSubmit
                    },
                    d.a.createElement(
                      "div",
                      { className: "row" },
                      d.a.createElement(x.a, {
                        label: "Naam",
                        size: "col-sm-6",
                        name: "name",
                        value: t,
                        onChangeAction: this.handleInputChange,
                        required: "required",
                        error: this.state.errors.name
                      }),
                      d.a.createElement(x.a, {
                        label: "Campagnenummer",
                        name: "number",
                        value: n,
                        readOnly: !0
                      })
                    ),
                    d.a.createElement(
                      "div",
                      { className: "row" },
                      d.a.createElement(
                        "div",
                        { className: "form-group col-sm-12" },
                        d.a.createElement(
                          "div",
                          { className: "row" },
                          d.a.createElement(
                            "div",
                            { className: "col-sm-3" },
                            d.a.createElement(
                              "label",
                              {
                                htmlFor: "description",
                                className: "col-sm-12"
                              },
                              "Beschrijving"
                            )
                          ),
                          d.a.createElement(
                            "div",
                            { className: "col-sm-8" },
                            d.a.createElement("textarea", {
                              name: "description",
                              value: a,
                              onChange: this.handleInputChange,
                              className: "form-control input-sm"
                            })
                          )
                        )
                      )
                    ),
                    d.a.createElement(
                      "div",
                      { className: "row" },
                      d.a.createElement(B.a, {
                        label: "Begindatum",
                        size: "col-sm-6",
                        name: "startDate",
                        value: r || "",
                        onChangeAction: this.handleStartDate
                      }),
                      d.a.createElement(B.a, {
                        label: "Einddatum",
                        size: "col-sm-6",
                        name: "endDate",
                        value: o || "",
                        onChangeAction: this.handleEndDate
                      })
                    ),
                    d.a.createElement(
                      "div",
                      { className: "row" },
                      d.a.createElement(M.a, {
                        label: "Status",
                        size: "col-sm-6",
                        name: "statusId",
                        options: this.props.status,
                        value: c,
                        onChangeAction: this.handleInputChange
                      }),
                      d.a.createElement(G.a, {
                        label: "Aangeboden maatregelen",
                        name: "measureCategoryIds",
                        value: s,
                        options: this.props.measureCategories,
                        onChangeAction: this.handleMeasureCategoryIds
                      })
                    ),
                    d.a.createElement(
                      "div",
                      { className: "row" },
                      d.a.createElement(M.a, {
                        label: "Type",
                        size: "col-sm-6",
                        name: "typeId",
                        options: this.props.types,
                        value: i,
                        onChangeAction: this.handleInputChange,
                        required: "required",
                        error: this.state.errors.type
                      })
                    ),
                    d.a.createElement(
                      q.a,
                      null,
                      d.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        d.a.createElement(z.a, {
                          buttonClassName: "btn-default",
                          buttonText: "Annuleren",
                          onClickAction: this.props.switchToView
                        }),
                        d.a.createElement(z.a, {
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
            n
          );
        })(f.Component),
        U = Object(h.b)(
          function(e) {
            return {
              campaign: e.campaignDetails,
              status: e.systemData.campaignStatuses,
              types: e.systemData.campaignTypes,
              measureCategories: e.systemData.measureCategories
            };
          },
          function(e) {
            return {
              fetchCampaign: function(t) {
                e(k(t));
              }
            };
          }
        )(Y),
        K = n(695);
      A.a.locale("nl");
      var J = Object(h.b)(function(e) {
        return { campaign: e.campaignDetails };
      })(function(e) {
        var t = e.campaign,
          n = t.name,
          a = t.number,
          r = t.description,
          o = t.startDate,
          c = t.endDate,
          s = t.status,
          i = t.measureCategories,
          l = t.type;
        return d.a.createElement(
          "div",
          null,
          d.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            d.a.createElement(K.a, { label: "Naam", value: n }),
            d.a.createElement(K.a, { label: "Campagne nummer", value: a })
          ),
          d.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            d.a.createElement(
              "div",
              { className: "col-sm-3" },
              d.a.createElement(
                "label",
                { htmlFor: "description", className: "col-sm-12" },
                "Beschrijving"
              )
            ),
            d.a.createElement(
              "div",
              { className: "col-sm-9", id: "description" },
              r
            )
          ),
          d.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            d.a.createElement(K.a, {
              label: "Begindatum",
              value: o ? A()(o).format("L") : ""
            }),
            d.a.createElement(K.a, {
              label: "Einddatum",
              value: c ? A()(c).format("L") : ""
            })
          ),
          d.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            d.a.createElement(K.a, { label: "Status", value: s ? s.name : "" }),
            d.a.createElement(K.a, {
              label: "Aangeboden maatregelen",
              value:
                i &&
                i
                  .map(function(e) {
                    return e.name;
                  })
                  .join(", ")
            })
          ),
          d.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            d.a.createElement(K.a, { label: "Type", value: l ? l.name : "" })
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
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var H = (function(e) {
          i()(n, e);
          var t = Q(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              b()(v()(a), "switchToEdit", function() {
                a.setState({ showEdit: !0 });
              }),
              b()(v()(a), "switchToView", function() {
                a.setState({ showEdit: !1, activeDiv: "" });
              }),
              (a.state = { showEdit: !1, activeDiv: "" }),
              a
            );
          }
          return (
            c()(n, [
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
                  return d.a.createElement(
                    N.a,
                    {
                      className: this.state.activeDiv,
                      onMouseEnter: function() {
                        return e.onDivEnter();
                      },
                      onMouseLeave: function() {
                        return e.onDivLeave();
                      }
                    },
                    d.a.createElement(
                      w.a,
                      null,
                      this.state.showEdit &&
                        this.props.permissions.manageMarketing
                        ? d.a.createElement(U, {
                            switchToView: this.switchToView
                          })
                        : d.a.createElement(J, {
                            switchToEdit: this.switchToEdit
                          })
                    )
                  );
                }
              }
            ]),
            n
          );
        })(f.Component),
        X = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(H);
      A.a.locale("nl");
      var Z = Object(h.b)(function(e) {
        return { campaign: e.campaignDetails };
      })(function(e) {
        var t = e.campaign,
          n = t.createdBy,
          a = void 0 === n ? {} : n,
          r = t.createdAt,
          o = void 0 === r ? {} : r,
          c = t.ownedBy,
          s = void 0 === c ? {} : c;
        return d.a.createElement(
          "div",
          null,
          d.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            d.a.createElement(K.a, {
              label: "Gemaakt door",
              value: a ? a.fullName : "Onbekend",
              link: a ? "gebruiker/" + a.id : ""
            }),
            d.a.createElement(K.a, {
              label: "Verantwoordelijke",
              value: s ? s.fullName : "Onbekend",
              link: s ? "gebruiker/" + s.id : ""
            })
          ),
          d.a.createElement(
            "div",
            { className: "row", onClick: e.switchToEdit },
            d.a.createElement(K.a, {
              label: "Gemaakt op",
              value: o ? A()(o).format("L") : "Onbekend"
            })
          )
        );
      });
      function $(e, t) {
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
      function ee(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? $(Object(n), !0).forEach(function(t) {
                b()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : $(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
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
          var n,
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var ne = (function(e) {
          i()(n, e);
          var t = te(n);
          function n(e) {
            var a;
            r()(this, n),
              (a = t.call(this, e)),
              b()(v()(a), "handleInputChange", function(e) {
                var t = e.target,
                  n = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                a.setState(
                  ee(
                    ee({}, a.state),
                    {},
                    {
                      campaign: ee(ee({}, a.state.campaign), {}, b()({}, r, n))
                    }
                  )
                );
              }),
              b()(v()(a), "handleSubmit", function(e) {
                e.preventDefault();
                var t = a.state.campaign,
                  n = {},
                  r = !1;
                I.a.isEmpty("" + t.ownedById) && ((n.ownedBy = !0), (r = !0)),
                  a.setState(ee(ee({}, a.state), {}, { errors: n })),
                  !r &&
                    V.a
                      .updateCampaignOwner(t.id, t.ownedById)
                      .then(function(e) {
                        a.props.fetchCampaign(t.id), a.props.switchToView();
                      });
              });
            var o = e.campaign,
              c = o.id,
              s = o.createdBy,
              i = void 0 === s ? {} : s,
              l = o.createdAt,
              u = void 0 === l ? {} : l,
              m = o.ownedBy,
              p = void 0 === m ? {} : m;
            return (
              (a.state = {
                campaign: {
                  id: c,
                  createdBy: i ? i.fullName : "",
                  ownedById: p ? p.id : "",
                  createdAt: u || ""
                },
                errors: { ownedBy: !1 }
              }),
              a
            );
          }
          return (
            c()(n, [
              {
                key: "render",
                value: function() {
                  var e = this.state.campaign,
                    t = e.createdBy,
                    n = e.ownedById,
                    a = e.createdAt;
                  return d.a.createElement(
                    "form",
                    {
                      className: "form-horizontal col-md-12",
                      onSubmit: this.handleSubmit
                    },
                    d.a.createElement(
                      "div",
                      { className: "row" },
                      d.a.createElement(x.a, {
                        label: "Gemaakt door",
                        name: "createdBy",
                        value: t,
                        readOnly: !0
                      }),
                      d.a.createElement(M.a, {
                        label: "Verantwoordelijke",
                        size: "col-sm-6",
                        name: "ownedById",
                        options: this.props.users,
                        value: n,
                        optionName: "fullName",
                        onChangeAction: this.handleInputChange,
                        error: this.state.errors.ownedBy
                      })
                    ),
                    d.a.createElement(
                      "div",
                      { className: "row" },
                      d.a.createElement(B.a, {
                        label: "Gemaakt op",
                        size: "col-sm-6",
                        name: "createdAt",
                        value: a || "",
                        readOnly: !0
                      })
                    ),
                    d.a.createElement(
                      q.a,
                      null,
                      d.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        d.a.createElement(z.a, {
                          buttonClassName: "btn-default",
                          buttonText: "Annuleren",
                          onClickAction: this.props.switchToView
                        }),
                        d.a.createElement(z.a, {
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
            n
          );
        })(f.Component),
        ae = Object(h.b)(
          function(e) {
            return { campaign: e.campaignDetails, users: e.systemData.users };
          },
          function(e) {
            return {
              fetchCampaign: function(t) {
                e(k(t));
              }
            };
          }
        )(ne);
      function re(e) {
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
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var oe = (function(e) {
          i()(n, e);
          var t = re(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              b()(v()(a), "switchToEdit", function() {
                a.setState({ showEdit: !0 });
              }),
              b()(v()(a), "switchToView", function() {
                a.setState({ showEdit: !1, activeDiv: "" });
              }),
              (a.state = { showEdit: !1, activeDiv: "" }),
              a
            );
          }
          return (
            c()(n, [
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
                  return d.a.createElement(
                    N.a,
                    {
                      className: this.state.activeDiv,
                      onMouseEnter: function() {
                        return e.onDivEnter();
                      },
                      onMouseLeave: function() {
                        return e.onDivLeave();
                      }
                    },
                    d.a.createElement(
                      w.a,
                      null,
                      this.state.showEdit &&
                        this.props.permissions.manageMarketing
                        ? d.a.createElement(ae, {
                            switchToView: this.switchToView
                          })
                        : d.a.createElement(Z, {
                            switchToEdit: this.switchToEdit
                          })
                    )
                  );
                }
              }
            ]),
            n
          );
        })(f.Component),
        ce = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(oe),
        se = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(function(e) {
          var t = e.opportunity,
            n = t.id,
            a = t.number,
            r = t.intake,
            o = t.createdAt,
            c = t.measureCategory,
            s = t.status,
            i = t.quotationRequests;
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
            d.a.createElement(
              "div",
              {
                onClick: function() {
                  return y.f.push("/kans/".concat(n));
                }
              },
              d.a.createElement("div", { className: "col-sm-2" }, a),
              d.a.createElement(
                "div",
                { className: "col-sm-2" },
                o ? A()(o).format("L") : ""
              ),
              d.a.createElement(
                "div",
                { className: "col-sm-3 link-underline" },
                r ? r.contact.fullName : ""
              ),
              d.a.createElement(
                "div",
                { className: "col-sm-3" },
                c ? c.name : ""
              ),
              d.a.createElement(
                "div",
                { className: "col-sm-1" },
                s ? s.name : ""
              ),
              d.a.createElement("div", { className: "col-sm-1" }, i.length)
            )
          );
        });
      function ie(e, t) {
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
      function le(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ie(Object(n), !0).forEach(function(t) {
                b()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : ie(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
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
          var n,
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var me = (function(e) {
          i()(n, e);
          var t = ue(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              b()(v()(a), "onLineEnter", function() {
                a.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              b()(v()(a), "onLineLeave", function() {
                a.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              (a.state = {
                showActionButtons: !1,
                highlightLine: "",
                opportunity: le({}, e.opportunity)
              }),
              a
            );
          }
          return (
            c()(n, [
              {
                key: "render",
                value: function() {
                  return d.a.createElement(
                    "div",
                    null,
                    d.a.createElement(se, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      opportunity: this.state.opportunity
                    })
                  );
                }
              }
            ]),
            n
          );
        })(f.Component),
        pe = Object(h.b)(function(e) {
          return { opportunities: e.campaignDetails.opportunities };
        })(function(e) {
          return d.a.createElement(
            "div",
            null,
            d.a.createElement(
              "div",
              { className: "row border header" },
              d.a.createElement("div", { className: "col-sm-2" }, "Nummer"),
              d.a.createElement("div", { className: "col-sm-2" }, "Datum"),
              d.a.createElement("div", { className: "col-sm-3" }, "Naam"),
              d.a.createElement(
                "div",
                { className: "col-sm-3" },
                "Maatregel categorie"
              ),
              d.a.createElement("div", { className: "col-sm-1" }, "Status"),
              d.a.createElement(
                "div",
                { className: "col-sm-1" },
                "Aantal offertes"
              ),
              d.a.createElement("div", { className: "col-sm-1" })
            ),
            e.opportunities.length > 0
              ? e.opportunities.map(function(e) {
                  return d.a.createElement(me, { key: e.id, opportunity: e });
                })
              : d.a.createElement("div", null, "Geen kansen bekend.")
          );
        }),
        fe = n(698);
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
          var n,
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var he = (function(e) {
          i()(n, e);
          var t = de(n);
          function n(e) {
            return r()(this, n), t.call(this, e);
          }
          return (
            c()(n, [
              {
                key: "render",
                value: function() {
                  return d.a.createElement(
                    N.a,
                    null,
                    d.a.createElement(
                      fe.a,
                      null,
                      d.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Gerelateerde kansen"
                      )
                    ),
                    d.a.createElement(
                      w.a,
                      null,
                      d.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        d.a.createElement(pe, null)
                      )
                    )
                  );
                }
              }
            ]),
            n
          );
        })(f.Component),
        ge = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(he),
        ve = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(function(e) {
          var t = e.response,
            n = t.id,
            a = t.contact,
            r = t.address,
            o = t.dateResponded;
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
            d.a.createElement(
              "div",
              {
                onClick: function() {
                  return y.f.push("/contact/".concat(n));
                }
              },
              d.a.createElement(
                "div",
                { className: "col-sm-1" },
                a ? a.number : ""
              ),
              d.a.createElement(
                "div",
                { className: "col-sm-1" },
                a ? a.type.name : ""
              ),
              d.a.createElement(
                "div",
                { className: "col-sm-2" },
                a ? a.fullName : ""
              ),
              d.a.createElement(
                "div",
                { className: "col-sm-2" },
                r ? r.street + r.number : ""
              ),
              d.a.createElement(
                "div",
                { className: "col-sm-1" },
                r ? r.postal_code : ""
              ),
              d.a.createElement(
                "div",
                { className: "col-sm-2" },
                r ? r.city : ""
              ),
              d.a.createElement(
                "div",
                { className: "col-sm-2" },
                o ? A()(o).format("L") : ""
              )
            ),
            d.a.createElement(
              "div",
              { className: "col-sm-1" },
              e.showActionButtons && e.permissions.manageMarketing
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
        }),
        Ee = Object(h.b)(
          function(e) {
            return { campaignId: e.campaignDetails.id };
          },
          function(e) {
            return {
              fetchCampaign: function(t) {
                e(k(t));
              }
            };
          }
        )(function(e) {
          return d.a.createElement(
            D.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.toggleDelete,
              confirmAction: function() {
                V.a.detachResponse(e.campaignId, e.contactId).then(function() {
                  e.fetchCampaign(e.campaignId), e.toggleDelete();
                });
              },
              title: "Verwijderen"
            },
            d.a.createElement(
              "p",
              null,
              "Wil je deze response ontkoppelen van deze campagne?"
            )
          );
        });
      function be(e, t) {
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
      function ye(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? be(Object(n), !0).forEach(function(t) {
                b()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : be(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function Ne(e) {
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
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var we = (function(e) {
          i()(n, e);
          var t = Ne(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              b()(v()(a), "onLineEnter", function() {
                a.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              b()(v()(a), "onLineLeave", function() {
                a.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              b()(v()(a), "toggleDelete", function() {
                a.setState({ showDelete: !a.state.showDelete });
              }),
              (a.state = {
                showActionButtons: !1,
                highlightLine: "",
                showDelete: !1,
                response: ye({}, e.response)
              }),
              a
            );
          }
          return (
            c()(n, [
              {
                key: "render",
                value: function() {
                  return d.a.createElement(
                    "div",
                    null,
                    d.a.createElement(ve, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      toggleDelete: this.toggleDelete,
                      response: this.state.response
                    }),
                    this.state.showDelete &&
                      d.a.createElement(Ee, {
                        toggleDelete: this.toggleDelete,
                        contactId: this.state.response.contact.id
                      })
                  );
                }
              }
            ]),
            n
          );
        })(f.Component),
        Oe = Object(h.b)(function(e) {
          return { responses: e.campaignDetails.responses };
        })(function(e) {
          return d.a.createElement(
            "div",
            null,
            d.a.createElement(
              "div",
              { className: "row border header" },
              d.a.createElement("div", { className: "col-sm-1" }, "Nummer"),
              d.a.createElement("div", { className: "col-sm-1" }, "Type"),
              d.a.createElement("div", { className: "col-sm-2" }, "Naam"),
              d.a.createElement("div", { className: "col-sm-2" }, "Adres"),
              d.a.createElement("div", { className: "col-sm-1" }, "Postcode"),
              d.a.createElement("div", { className: "col-sm-2" }, "Plaats"),
              d.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Gereageerd op"
              ),
              d.a.createElement("div", { className: "col-sm-1" })
            ),
            e.responses.length > 0
              ? e.responses.map(function(e) {
                  return d.a.createElement(we, { key: e.id, response: e });
                })
              : d.a.createElement("div", null, "Geen responses bekend.")
          );
        }),
        De = n(102);
      function ke(e, t) {
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
      function Ce(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ke(Object(n), !0).forEach(function(t) {
                b()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : ke(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function je(e) {
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
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var Se = (function(e) {
          i()(n, e);
          var t = je(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              b()(v()(a), "handleContactChange", function(e) {
                var t = e.target,
                  n = "checkbox" === t.type ? t.checked : t.value;
                "" === n
                  ? a.setState(
                      Ce(
                        Ce({}, a.state),
                        {},
                        {
                          contactId: "",
                          errors: { contact: !0, hasErrors: !0 }
                        }
                      )
                    )
                  : a.setState(
                      Ce(
                        Ce({}, a.state),
                        {},
                        { contactId: n, errors: { contact: !1, hasErrors: !1 } }
                      )
                    );
              }),
              b()(v()(a), "handleSubmit", function(e) {
                e.preventDefault(),
                  a.state.errors.hasErrors
                    ? a.setState(
                        Ce(
                          Ce({}, a.state),
                          {},
                          { errors: { contact: !0, hasErrors: !0 } }
                        )
                      )
                    : V.a
                        .attachResponse(a.props.campaignId, a.state.contactId)
                        .then(function() {
                          a.props.fetchCampaign(a.props.campaignId),
                            a.props.toggleShowNew();
                        });
              }),
              (a.state = {
                contactId: "",
                contacts: [],
                errors: { contact: !1, hasErrors: !0 }
              }),
              a
            );
          }
          return (
            c()(n, [
              {
                key: "componentWillMount",
                value: function() {
                  var e = this;
                  De.a.getContactsPeek().then(function(t) {
                    e.setState({ contacts: t });
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.contactId;
                  return d.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    d.a.createElement(
                      N.a,
                      { className: "panel-grey" },
                      d.a.createElement(
                        w.a,
                        null,
                        d.a.createElement(
                          "div",
                          { className: "row" },
                          d.a.createElement(x.a, {
                            label: "Campagne",
                            name: "campaign",
                            value: this.props.campaignName,
                            readOnly: !0
                          }),
                          d.a.createElement(M.a, {
                            label: "Contact",
                            size: "col-sm-6",
                            name: "contactId",
                            options: this.state.contacts,
                            value: e,
                            onChangeAction: this.handleContactChange,
                            required: "required",
                            optionName: "fullName",
                            error: this.state.errors.contact
                          })
                        ),
                        d.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          d.a.createElement(z.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          d.a.createElement(z.a, {
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
        })(f.Component),
        Le = Object(h.b)(
          function(e) {
            return {
              campaignId: e.campaignDetails.id,
              campaignName: e.campaignDetails.name
            };
          },
          function(e) {
            return {
              fetchCampaign: function(t) {
                e(k(t));
              }
            };
          }
        )(Se);
      function Re(e) {
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
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var Pe = (function(e) {
          i()(n, e);
          var t = Re(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              b()(v()(a), "toggleShowNew", function() {
                a.setState({ showNew: !a.state.showNew });
              }),
              (a.state = { showNew: !1 }),
              a
            );
          }
          return (
            c()(n, [
              {
                key: "render",
                value: function() {
                  return d.a.createElement(
                    N.a,
                    null,
                    d.a.createElement(
                      fe.a,
                      null,
                      d.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Responses"
                      ),
                      this.props.permissions.manageMarketing &&
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
                      w.a,
                      null,
                      d.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        d.a.createElement(Oe, null)
                      ),
                      d.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          d.a.createElement(Le, {
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
        })(f.Component),
        Ae = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(Pe),
        Te = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(function(e) {
          var t = e.organisation,
            n = (t.id, t.contactId),
            a = t.address,
            r = t.name,
            o = t.amountOfQuotations,
            c = t.amountOfWonQuotations;
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
            d.a.createElement(
              "div",
              {
                onClick: function() {
                  return y.f.push("/contact/".concat(n));
                }
              },
              d.a.createElement("div", { className: "col-sm-1" }, n),
              d.a.createElement("div", { className: "col-sm-2" }, r),
              d.a.createElement(
                "div",
                { className: "col-sm-2" },
                a ? a.city : ""
              ),
              d.a.createElement("div", { className: "col-sm-2" }, "???"),
              d.a.createElement("div", { className: "col-sm-2" }, o),
              d.a.createElement("div", { className: "col-sm-2" }, c)
            ),
            d.a.createElement(
              "div",
              { className: "col-sm-1" },
              e.showActionButtons && e.permissions.manageMarketing
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
        }),
        Ie = Object(h.b)(
          function(e) {
            return { campaignId: e.campaignDetails.id };
          },
          function(e) {
            return {
              fetchCampaign: function(t) {
                e(k(t));
              }
            };
          }
        )(function(e) {
          return d.a.createElement(
            D.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.toggleDelete,
              confirmAction: function() {
                V.a
                  .detachOrganisation(e.campaignId, e.organisationId)
                  .then(function() {
                    e.fetchCampaign(e.campaignId), e.toggleDelete();
                  });
              },
              title: "Verwijderen"
            },
            d.a.createElement(
              "p",
              null,
              "Wil je deze organisatie ontkoppelen van deze campagne?"
            )
          );
        });
      function xe(e, t) {
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
      function Me(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? xe(Object(n), !0).forEach(function(t) {
                b()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : xe(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
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
          var n,
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var ze = (function(e) {
          i()(n, e);
          var t = Be(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              b()(v()(a), "onLineEnter", function() {
                a.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              b()(v()(a), "onLineLeave", function() {
                a.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              b()(v()(a), "toggleDelete", function() {
                a.setState({ showDelete: !a.state.showDelete });
              }),
              (a.state = {
                showActionButtons: !1,
                highlightLine: "",
                showDelete: !1,
                organisation: Me({}, e.organisation)
              }),
              a
            );
          }
          return (
            c()(n, [
              {
                key: "render",
                value: function() {
                  return d.a.createElement(
                    "div",
                    null,
                    d.a.createElement(Te, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      toggleDelete: this.toggleDelete,
                      organisation: this.state.organisation
                    }),
                    this.state.showDelete &&
                      d.a.createElement(Ie, {
                        toggleDelete: this.toggleDelete,
                        organisationId: this.state.organisation.id
                      })
                  );
                }
              }
            ]),
            n
          );
        })(f.Component),
        qe = Object(h.b)(function(e) {
          return { organisations: e.campaignDetails.organisations };
        })(function(e) {
          return d.a.createElement(
            "div",
            null,
            d.a.createElement(
              "div",
              { className: "row border header" },
              d.a.createElement("div", { className: "col-sm-1" }, "Nummer"),
              d.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Organisatie"
              ),
              d.a.createElement("div", { className: "col-sm-2" }, "Plaats"),
              d.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Contactpersoon"
              ),
              d.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Aangevraagde offertes"
              ),
              d.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Gewonnen offertes"
              ),
              d.a.createElement("div", { className: "col-sm-1" })
            ),
            e.organisations.length > 0
              ? e.organisations.map(function(e) {
                  return d.a.createElement(ze, { key: e.id, organisation: e });
                })
              : d.a.createElement(
                  "div",
                  null,
                  "Geen betrokken bedrijven bekend."
                )
          );
        }),
        Ve = n(744);
      function Ge(e, t) {
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
      function Fe(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Ge(Object(n), !0).forEach(function(t) {
                b()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : Ge(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
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
          var n,
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var _e = (function(e) {
          i()(n, e);
          var t = We(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              b()(v()(a), "handleOrganisationChange", function(e) {
                var t = e.target,
                  n = "checkbox" === t.type ? t.checked : t.value;
                "" === n
                  ? a.setState(
                      Fe(
                        Fe({}, a.state),
                        {},
                        {
                          organisationId: "",
                          errors: { organisation: !0, hasErrors: !0 }
                        }
                      )
                    )
                  : a.setState(
                      Fe(
                        Fe({}, a.state),
                        {},
                        {
                          organisationId: n,
                          errors: { organisation: !1, hasErrors: !1 }
                        }
                      )
                    );
              }),
              b()(v()(a), "handleSubmit", function(e) {
                e.preventDefault(),
                  a.state.errors.hasErrors
                    ? a.setState(
                        Fe(
                          Fe({}, a.state),
                          {},
                          { errors: { organisation: !0, hasErrors: !0 } }
                        )
                      )
                    : V.a
                        .attachOrganisation(
                          a.props.campaignId,
                          a.state.organisationId
                        )
                        .then(function() {
                          a.props.fetchCampaign(a.props.campaignId),
                            a.props.toggleShowNew();
                        });
              }),
              (a.state = {
                organisationId: "",
                organisations: [],
                errors: { organisation: !1, hasErrors: !0 }
              }),
              a
            );
          }
          return (
            c()(n, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  Ve.a.getOrganisationPeek().then(function(t) {
                    e.setState({ organisations: t });
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.state.organisationId;
                  return d.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    d.a.createElement(
                      N.a,
                      { className: "panel-grey" },
                      d.a.createElement(
                        w.a,
                        null,
                        d.a.createElement(
                          "div",
                          { className: "row" },
                          d.a.createElement(x.a, {
                            label: "Campagne",
                            name: "campaign",
                            value: this.props.campaignName,
                            readOnly: !0
                          }),
                          d.a.createElement(M.a, {
                            label: "Organisatie",
                            size: "col-sm-6",
                            name: "organisationId",
                            options: this.state.organisations,
                            value: e,
                            onChangeAction: this.handleOrganisationChange,
                            required: "required",
                            error: this.state.errors.organisation
                          })
                        ),
                        d.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          d.a.createElement(z.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          d.a.createElement(z.a, {
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
        })(f.Component),
        Ye = Object(h.b)(
          function(e) {
            return {
              campaignId: e.campaignDetails.id,
              campaignName: e.campaignDetails.name
            };
          },
          function(e) {
            return {
              fetchCampaign: function(t) {
                e(k(t));
              }
            };
          }
        )(_e);
      function Ue(e) {
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
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var Ke = (function(e) {
          i()(n, e);
          var t = Ue(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              b()(v()(a), "toggleShowNew", function() {
                a.setState({ showNew: !a.state.showNew });
              }),
              (a.state = { showNew: !1 }),
              a
            );
          }
          return (
            c()(n, [
              {
                key: "render",
                value: function() {
                  return d.a.createElement(
                    N.a,
                    null,
                    d.a.createElement(
                      fe.a,
                      null,
                      d.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Betrokken bedrijven"
                      ),
                      this.props.permissions.manageMarketing &&
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
                      w.a,
                      null,
                      d.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        d.a.createElement(qe, null)
                      ),
                      d.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          d.a.createElement(Ye, {
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
        })(f.Component),
        Je = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(Ke),
        Qe = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(function(e) {
          var t = e.intake,
            n = t.id,
            a = t.contact,
            r = t.address,
            o = t.fullAddress,
            c = t.createdAt;
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
            d.a.createElement(
              "div",
              {
                onClick: function() {
                  return y.f.push("/intake/".concat(n));
                }
              },
              d.a.createElement("div", { className: "col-sm-1" }, n),
              d.a.createElement(
                "div",
                { className: "col-sm-1" },
                a && a.type.name
              ),
              d.a.createElement(
                "div",
                { className: "col-sm-2" },
                a && a.fullName
              ),
              d.a.createElement("div", { className: "col-sm-2" }, o && o),
              d.a.createElement(
                "div",
                { className: "col-sm-2" },
                r && r.postalCode
              ),
              d.a.createElement("div", { className: "col-sm-2" }, r && r.city),
              d.a.createElement(
                "div",
                { className: "col-sm-2" },
                c ? A()(c).format("L") : ""
              )
            )
          );
        });
      function He(e, t) {
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
      function Xe(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? He(Object(n), !0).forEach(function(t) {
                b()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : He(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function Ze(e) {
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
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var $e = (function(e) {
          i()(n, e);
          var t = Ze(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              b()(v()(a), "onLineEnter", function() {
                a.setState({ highlightLine: "highlight-line" });
              }),
              b()(v()(a), "onLineLeave", function() {
                a.setState({ highlightLine: "" });
              }),
              (a.state = { highlightLine: "", intake: Xe({}, e.intake) }),
              a
            );
          }
          return (
            c()(n, [
              {
                key: "render",
                value: function() {
                  return d.a.createElement(
                    "div",
                    null,
                    d.a.createElement(Qe, {
                      highlightLine: this.state.highlightLine,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      intake: this.state.intake
                    })
                  );
                }
              }
            ]),
            n
          );
        })(f.Component),
        et = Object(h.b)(function(e) {
          return { intakes: e.campaignDetails.intakes };
        })(function(e) {
          return d.a.createElement(
            "div",
            null,
            d.a.createElement(
              "div",
              { className: "row border header" },
              d.a.createElement("div", { className: "col-sm-1" }, "Id"),
              d.a.createElement("div", { className: "col-sm-1" }, "Type"),
              d.a.createElement("div", { className: "col-sm-2" }, "Naam"),
              d.a.createElement("div", { className: "col-sm-2" }, "Adres"),
              d.a.createElement("div", { className: "col-sm-2" }, "Postcode"),
              d.a.createElement("div", { className: "col-sm-2" }, "Plaats"),
              d.a.createElement(
                "div",
                { className: "col-sm-2" },
                "Gereageerd op"
              )
            ),
            e.intakes.length > 0
              ? e.intakes.map(function(e) {
                  return d.a.createElement($e, { key: e.id, intake: e });
                })
              : d.a.createElement("div", null, "Geen intakes bekend.")
          );
        });
      function tt(e) {
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
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var nt = (function(e) {
          i()(n, e);
          var t = tt(n);
          function n(e) {
            return r()(this, n), t.call(this, e);
          }
          return (
            c()(n, [
              {
                key: "render",
                value: function() {
                  return d.a.createElement(
                    N.a,
                    null,
                    d.a.createElement(
                      fe.a,
                      null,
                      d.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Gerelateerde intakes"
                      )
                    ),
                    d.a.createElement(
                      w.a,
                      null,
                      d.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        d.a.createElement(et, null)
                      )
                    )
                  );
                }
              }
            ]),
            n
          );
        })(f.Component),
        at = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(nt);
      function rt(e) {
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
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var ot = (function(e) {
          i()(n, e);
          var t = rt(n);
          function n(e) {
            return r()(this, n), t.call(this, e);
          }
          return (
            c()(n, [
              {
                key: "render",
                value: function() {
                  var e = "",
                    t = !0;
                  return (
                    this.props.hasError
                      ? (e = "Fout bij het ophalen van campagne.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : Object(R.isEmpty)(this.props.campaign)
                      ? (e = "Geen campagne gevonden!")
                      : (t = !1),
                    t
                      ? d.a.createElement("div", null, e)
                      : d.a.createElement(
                          "div",
                          null,
                          d.a.createElement(X, null),
                          d.a.createElement(Je, null),
                          d.a.createElement(at, null),
                          d.a.createElement(ge, null),
                          d.a.createElement(Ae, null),
                          d.a.createElement(ce, null)
                        )
                  );
                }
              }
            ]),
            n
          );
        })(f.Component),
        ct = Object(h.b)(function(e) {
          return {
            campaign: e.campaignDetails,
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        })(ot);
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
          var n,
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var it = (function(e) {
          i()(n, e);
          var t = st(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              b()(v()(a), "openItem", function(e) {
                y.f.push("/taak/".concat(e));
              }),
              (a.state = { relatedTasks: "" }),
              a
            );
          }
          return (
            c()(n, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedTasks;
                  return d.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      d.a.createElement("div", null, "Geen taken gevonden."),
                    "" != t &&
                      d.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        d.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, n) {
                            return d.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: n
                              },
                              d.a.createElement(
                                "td",
                                { className: "col-xs-12 clickable" },
                                A()(t.createdAt).format("L"),
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
            n
          );
        })(f.Component),
        lt = Object(h.b)(function(e) {
          return { relatedTasks: e.campaignDetails.relatedTasks };
        })(it),
        ut = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            n = e.showTasksList,
            a = e.taskCount,
            r = e.newTask,
            o = e.permissions;
          return d.a.createElement(
            N.a,
            { className: "harmonica-button" },
            d.a.createElement(
              w.a,
              null,
              d.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                d.a.createElement(
                  "span",
                  { className: "" },
                  "OPEN TAKEN ",
                  d.a.createElement("span", { className: "badge" }, a)
                )
              ),
              d.a.createElement(
                "div",
                { className: "col-sm-2" },
                o.manageTask &&
                  d.a.createElement(
                    "a",
                    { role: "button", className: "pull-right", onClick: r },
                    d.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white"
                    })
                  )
              ),
              d.a.createElement(
                "div",
                { className: "col-sm-12" },
                n && d.a.createElement(lt, null)
              )
            )
          );
        });
      function mt(e) {
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
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var pt = (function(e) {
          i()(n, e);
          var t = mt(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              b()(v()(a), "openItem", function(e) {
                y.f.push("/taak/".concat(e));
              }),
              (a.state = { relatedNotes: "" }),
              a
            );
          }
          return (
            c()(n, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedNotes;
                  return d.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      d.a.createElement("div", null, "Geen notities gevonden."),
                    "" != t &&
                      d.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        d.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, n) {
                            return d.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: n
                              },
                              d.a.createElement(
                                "td",
                                { className: "col-xs-12 clickable" },
                                A()(t.createdAt).format("L"),
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
            n
          );
        })(f.Component),
        ft = Object(h.b)(function(e) {
          return { relatedNotes: e.campaignDetails.relatedNotes };
        })(pt),
        dt = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            n = e.showNotesList,
            a = e.noteCount,
            r = e.newNote,
            o = e.permissions;
          return d.a.createElement(
            N.a,
            { className: "harmonica-button" },
            d.a.createElement(
              w.a,
              null,
              d.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                d.a.createElement(
                  "span",
                  { className: "" },
                  "NOTITIES ",
                  d.a.createElement("span", { className: "badge" }, a)
                )
              ),
              d.a.createElement(
                "div",
                { className: "col-sm-2" },
                o.manageTask &&
                  d.a.createElement(
                    "a",
                    { role: "button", className: "pull-right", onClick: r },
                    d.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white"
                    })
                  )
              ),
              d.a.createElement(
                "div",
                { className: "col-sm-12" },
                n && d.a.createElement(ft, null)
              )
            )
          );
        });
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
          var n,
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var gt = (function(e) {
          i()(n, e);
          var t = ht(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              b()(v()(a), "openItem", function(e) {
                y.f.push("/document/".concat(e));
              }),
              (a.state = { relatedDocuments: "" }),
              a
            );
          }
          return (
            c()(n, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedDocuments;
                  return d.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      d.a.createElement(
                        "div",
                        null,
                        "Geen documenten gevonden."
                      ),
                    "" != t &&
                      d.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        d.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, n) {
                            return d.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: n
                              },
                              d.a.createElement(
                                "td",
                                { className: "col-xs-5 clickable" },
                                A()(t.createdAt).format("L")
                              ),
                              d.a.createElement(
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
            n
          );
        })(f.Component),
        vt = Object(h.b)(function(e) {
          return { relatedDocuments: e.campaignDetails.relatedDocuments };
        })(gt),
        Et = Object(h.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            n = e.showDocumentsList,
            a = e.newDocument,
            r = e.documentCount,
            o = e.permissions;
          return d.a.createElement(
            N.a,
            { className: "harmonica-button" },
            d.a.createElement(
              w.a,
              null,
              d.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                d.a.createElement(
                  "span",
                  null,
                  "DOCUMENTEN ",
                  d.a.createElement("span", { className: "badge" }, r)
                )
              ),
              d.a.createElement(
                "div",
                { className: "col-sm-2" },
                o.createDocument &&
                  d.a.createElement(
                    "div",
                    { className: "pull-right" },
                    d.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white",
                      "data-toggle": "dropdown",
                      role: "button"
                    }),
                    d.a.createElement(
                      "ul",
                      { className: "dropdown-menu" },
                      d.a.createElement(
                        "li",
                        null,
                        d.a.createElement(
                          "a",
                          {
                            className: "btn",
                            onClick: function() {
                              return a("upload");
                            }
                          },
                          "Upload document"
                        )
                      )
                    )
                  )
              ),
              d.a.createElement(
                "div",
                { className: "col-sm-12" },
                n && d.a.createElement(vt, null)
              )
            )
          );
        });
      function bt(e, t) {
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
      function yt(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? bt(Object(n), !0).forEach(function(t) {
                b()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : bt(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
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
          var n,
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var wt = (function(e) {
          i()(n, e);
          var t = Nt(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              b()(v()(a), "newTask", function() {
                y.f.push("/taak/nieuw/campagne/".concat(a.props.campaign.id));
              }),
              b()(v()(a), "newNote", function() {
                y.f.push(
                  "/taak/nieuw/afgehandeld/campagne/".concat(
                    a.props.campaign.id
                  )
                );
              }),
              b()(v()(a), "newDocument", function(e) {
                y.f.push(
                  "/document/nieuw/"
                    .concat(e, "/campagne/")
                    .concat(a.props.campaign.id)
                );
              }),
              (a.state = {
                toggleShowList: {
                  tasks: !1,
                  notes: !1,
                  emailsInbox: !1,
                  emailsSent: !1,
                  documents: !1
                }
              }),
              (a.toggleShowList = a.toggleShowList.bind(v()(a))),
              a
            );
          }
          return (
            c()(n, [
              {
                key: "toggleShowList",
                value: function(e) {
                  this.setState(
                    yt(
                      yt({}, this.state),
                      {},
                      {
                        toggleShowList: yt(
                          yt({}, this.state.toggleShowList),
                          {},
                          b()({}, e, !this.state.toggleShowList[e])
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
                  return d.a.createElement(
                    "div",
                    { className: "margin-10-top" },
                    d.a.createElement(ut, {
                      toggleShowList: function() {
                        return e.toggleShowList("tasks");
                      },
                      showTasksList: this.state.toggleShowList.tasks,
                      taskCount: this.props.campaign.taskCount,
                      newTask: this.newTask
                    }),
                    d.a.createElement(dt, {
                      toggleShowList: function() {
                        return e.toggleShowList("notes");
                      },
                      showNotesList: this.state.toggleShowList.notes,
                      noteCount: this.props.campaign.noteCount,
                      newNote: this.newNote
                    }),
                    d.a.createElement(Et, {
                      toggleShowList: function() {
                        return e.toggleShowList("documents");
                      },
                      showDocumentsList: this.state.toggleShowList.documents,
                      newDocument: this.newDocument,
                      documentCount: this.props.campaign.documentCount
                    })
                  );
                }
              }
            ]),
            n
          );
        })(f.Component),
        Ot = Object(h.b)(function(e) {
          return { campaign: e.campaignDetails };
        })(wt);
      function Dt(e) {
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
            a = p()(e);
          if (t) {
            var r = p()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return u()(this, n);
        };
      }
      var kt = (function(e) {
        i()(n, e);
        var t = Dt(n);
        function n(e) {
          return r()(this, n), t.call(this, e);
        }
        return (
          c()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchCampaign(this.props.params.id);
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearCampaign();
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
                      { className: "col-md-12" },
                      d.a.createElement(L, null)
                    ),
                    d.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      d.a.createElement(ct, null)
                    )
                  ),
                  d.a.createElement(
                    N.a,
                    { className: "col-md-3 harmonica" },
                    d.a.createElement(
                      w.a,
                      null,
                      d.a.createElement(Ot, { id: this.props.params.id })
                    )
                  )
                );
              }
            }
          ]),
          n
        );
      })(f.Component);
      t.default = Object(h.b)(null, function(e) {
        return {
          fetchCampaign: function(t) {
            e(k(t));
          },
          clearCampaign: function() {
            e({ type: "CLEAR_CAMPAIGN" });
          }
        };
      })(kt);
    },
    690: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        s = function(e) {
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
    691: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        s = function(e) {
          var t = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            n
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: c.a.string }),
        (t.a = s);
    },
    692: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        s = function(e) {
          var t = e.buttonClassName,
            n = e.buttonText,
            a = e.onClickAction,
            o = e.type,
            c = e.value,
            s = e.loading,
            i = e.loadText,
            l = e.disabled;
          return s
            ? r.a.createElement(
                "button",
                {
                  type: o,
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
                  type: o,
                  className: "btn btn-sm ".concat(t),
                  onClick: a,
                  value: c,
                  disabled: l
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
    693: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        s = function(e) {
          var t = e.buttonClassName,
            n = e.iconName,
            a = e.onClickAction,
            o = e.title,
            c = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: a,
              disabled: c,
              title: o
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
          buttonClassName: c.a.string,
          iconName: c.a.string.isRequired,
          onClickAction: c.a.func,
          title: c.a.string,
          disabled: c.a.bool
        }),
        (t.a = s);
    },
    694: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        s = function(e) {
          var t = e.label,
            n = e.type,
            a = e.className,
            o = e.size,
            c = e.id,
            s = e.placeholder,
            i = e.name,
            l = e.value,
            u = e.onClickAction,
            m = e.onChangeAction,
            p = e.onBlurAction,
            f = e.required,
            d = e.readOnly,
            h = e.maxLength,
            g = e.error,
            v = e.min,
            E = e.max,
            b = e.step,
            y = e.errorMessage,
            N = e.divSize,
            w = e.divClassName,
            O = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(N, " ").concat(w) },
            r.a.createElement(
              "label",
              { htmlFor: c, className: "col-sm-6 ".concat(f) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(o) },
              r.a.createElement("input", {
                type: n,
                className:
                  "form-control input-sm ".concat(a) + (g ? "has-error" : ""),
                id: c,
                placeholder: s,
                name: i,
                value: l,
                onClick: u,
                onChange: m,
                onBlur: p,
                readOnly: d,
                maxLength: h,
                min: v,
                max: E,
                autoComplete: O,
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
    695: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(4),
        c = n(8),
        s = n.n(c),
        i = function(e) {
          var t = e.label,
            n = e.className,
            a = e.id,
            c = e.value,
            s = e.link,
            i = e.hidden;
          return s.length > 0
            ? r.a.createElement(
                "div",
                { className: n, style: i ? { display: "none" } : {} },
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
                    { to: s, className: "link-underline" },
                    c
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: n, style: i ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: a, className: "col-sm-6" },
                  t
                ),
                r.a.createElement("div", { className: "col-sm-6", id: a }, c)
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
    696: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        s = function(e) {
          var t = e.label,
            n = e.className,
            a = e.size,
            o = e.id,
            c = e.name,
            s = e.value,
            i = e.options,
            l = e.onChangeAction,
            u = e.onBlurAction,
            m = e.required,
            p = e.error,
            f = e.errorMessage,
            d = e.optionValue,
            h = e.optionName,
            g = e.readOnly,
            v = e.placeholder,
            E = e.divClassName,
            b = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(a, " ").concat(E) },
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
                    "form-control input-sm ".concat(n) + (p && " has-error"),
                  id: o,
                  name: c,
                  value: s,
                  onChange: l,
                  onBlur: u,
                  readOnly: g
                },
                b && r.a.createElement("option", { value: "" }, v),
                i.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[d], value: e[d] },
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
                  f
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
    698: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        s = function(e) {
          var t = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-heading ".concat(t) },
            n
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: c.a.string }),
        (t.a = s);
    },
    699: function(e, t, n) {
      "use strict";
      var a = n(24),
        r = n.n(a),
        o = n(25),
        c = n.n(o),
        s = n(22),
        i = n.n(s),
        l = n(26),
        u = n.n(l),
        m = n(27),
        p = n.n(m),
        f = n(16),
        d = n.n(f),
        h = n(6),
        g = n.n(h),
        v = n(0),
        E = n.n(v),
        b = n(8),
        y = n.n(b),
        N = n(707),
        w = n.n(N),
        O = n(708),
        D = n.n(O),
        k = n(7),
        C = n.n(k);
      function j(e) {
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
            a = d()(e);
          if (t) {
            var r = d()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      C.a.locale("nl");
      var S = (function(e) {
        u()(n, e);
        var t = j(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            (a = t.call(this, e)),
            g()(i()(a), "validateDate", function(e) {
              var t = C()(e.target.value, "DD-MM-YYYY", !0),
                n = !1;
              t.isValid() || "" === e.target.value || (n = !0),
                a.props.disabledBefore &&
                  t.isBefore(a.props.disabledBefore) &&
                  (n = !0),
                a.props.disabledAfter &&
                  t.isAfter(a.props.disabledAfter) &&
                  (n = !0),
                a.setState({ errorDateFormat: n });
            }),
            g()(i()(a), "onDateChange", function(e) {
              var t = e ? C()(e).format("Y-MM-DD") : "",
                n = !1;
              t &&
                a.props.disabledBefore &&
                C()(t).isBefore(a.props.disabledBefore) &&
                (n = !0),
                t &&
                  a.props.disabledAfter &&
                  C()(t).isAfter(a.props.disabledAfter) &&
                  (n = !0),
                a.setState({ errorDateFormat: n }),
                !n && a.props.onChangeAction(t, a.props.name);
            }),
            (a.state = { errorDateFormat: !1 }),
            a
          );
        }
        return (
          c()(n, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.label,
                  n = e.className,
                  a = e.size,
                  r = e.divSize,
                  o = e.id,
                  c = e.value,
                  s = e.required,
                  i = e.readOnly,
                  l = e.name,
                  u = e.error,
                  m = e.errorMessage,
                  p = e.disabledBefore,
                  f = e.disabledAfter,
                  d = c ? C()(c).format("L") : "",
                  h = {};
                return (
                  p && (h.before = new Date(p)),
                  f && (h.after = new Date(f)),
                  E.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    E.a.createElement(
                      "div",
                      null,
                      E.a.createElement(
                        "label",
                        { htmlFor: o, className: "col-sm-6 ".concat(s) },
                        t
                      )
                    ),
                    E.a.createElement(
                      "div",
                      { className: "".concat(a) },
                      E.a.createElement(w.a, {
                        id: o,
                        value: d,
                        formatDate: O.formatDate,
                        parseDate: O.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: D.a,
                          disabledDays: h
                        },
                        inputProps: {
                          className:
                            "form-control input-sm ".concat(n) +
                            (this.state.errorDateFormat || u
                              ? " has-error"
                              : ""),
                          name: l,
                          onBlur: this.validateDate,
                          autoComplete: "off",
                          readOnly: i,
                          disabled: i
                        },
                        required: s,
                        readOnly: i,
                        placeholder: ""
                      })
                    ),
                    u &&
                      E.a.createElement(
                        "div",
                        { className: "col-sm-offset-6 col-sm-6" },
                        E.a.createElement(
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
      })(v.Component);
      (S.defaultProps = {
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
        (S.propTypes = {
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
        (t.a = S);
    },
    702: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        s = function(e) {
          var t = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-footer ".concat(t) },
            n
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: c.a.string }),
        (t.a = s);
    },
    723: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        o = n(8),
        c = n.n(o),
        s = n(714),
        i =
          (n(715),
          function(e) {
            var t = e.label,
              n = (e.className, e.size),
              a = e.id,
              o = e.name,
              c = e.value,
              i = e.options,
              l = e.optionId,
              u = e.optionName,
              m = e.onChangeAction,
              p = e.required,
              f = e.multi,
              d = e.error;
            return r.a.createElement(
              "div",
              { className: "form-group col-sm-6" },
              r.a.createElement(
                "label",
                { htmlFor: a, className: "col-sm-6 ".concat(p) },
                t
              ),
              r.a.createElement(
                "div",
                { className: "".concat(n) },
                r.a.createElement(s.a, {
                  id: a,
                  name: o,
                  value: c,
                  onChange: m,
                  options: i,
                  valueKey: l,
                  labelKey: u,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: f,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: d ? " has-error" : ""
                })
              )
            );
          });
      (i.defaultProps = {
        className: "",
        size: "col-sm-6",
        optionId: "id",
        optionName: "name",
        readOnly: !1,
        required: "",
        error: !1,
        value: "",
        multi: !0
      }),
        (i.propTypes = {
          label: c.a.string.isRequired,
          className: c.a.string,
          size: c.a.string,
          id: c.a.string,
          name: c.a.string.isRequired,
          options: c.a.array,
          optionId: c.a.string,
          optionName: c.a.string,
          value: c.a.string,
          onChangeAction: c.a.func,
          onBlurAction: c.a.func,
          required: c.a.string,
          readOnly: c.a.bool,
          error: c.a.bool,
          multi: c.a.bool
        }),
        (t.a = i);
    },
    744: function(e, t, n) {
      "use strict";
      var a = n(2),
        r = n.n(a),
        o = "".concat(URL_API, "/api/organisation");
      t.a = {
        newOrganisation: function(e) {
          var t = "".concat(o),
            n = "Bearer " + localStorage.getItem("access_token");
          return (
            (r.a.defaults.headers.common.Authorization = n),
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
            n = "Bearer " + localStorage.getItem("access_token");
          return (
            (r.a.defaults.headers.common.Authorization = n), r.a.post(t, e)
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
    }
  }
]);
