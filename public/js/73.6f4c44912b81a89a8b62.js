(window.webpackJsonp = window.webpackJsonp || []).push([
  [73],
  {
    1464: function(t, e, a) {
      "use strict";
      a.r(e);
      var n = a(11),
        r = a.n(n),
        i = a(24),
        o = a.n(i),
        s = a(25),
        c = a.n(s),
        l = a(22),
        u = a.n(l),
        p = a(26),
        m = a.n(p),
        d = a(27),
        h = a.n(d),
        f = a(16),
        E = a.n(f),
        g = a(6),
        P = a.n(g),
        y = a(0),
        C = a.n(y),
        v = a(32),
        T = a(14),
        b = a(726),
        k = a(944),
        I = a(837),
        R = a(945),
        j = a(727),
        F = a(199),
        S = a.n(F),
        A = a(146),
        x = a(147),
        N = a(200),
        w = a(721),
        O = a(946),
        _ = a(101),
        D = Object(v.b)(null, function(t) {
          return {
            setParticipantsProjectSortsFilter: function(e, a) {
              t(Object(O.a)(e, a));
            }
          };
        })(function(t) {
          var e = function(e, a) {
            t.setParticipantsProjectSortsFilter(e, a),
              setTimeout(function() {
                t.refreshParticipantsProjectData();
              }, 100);
          };
          return C.a.createElement(
            "tr",
            { className: "thead-title" },
            C.a.createElement(_.a, { title: "", width: "2%" }),
            C.a.createElement(w.a, {
              sortColumn: "contactType",
              title: "Type",
              width: "9%",
              setSorts: e
            }),
            C.a.createElement(w.a, {
              sortColumn: "name",
              title: "Naam",
              width: "9%",
              setSorts: e
            }),
            C.a.createElement(w.a, {
              sortColumn: "address",
              title: "Adres",
              width: "9%",
              setSorts: e
            }),
            C.a.createElement(w.a, {
              sortColumn: "postalCode",
              title: "Postcode",
              width: "8%",
              setSorts: e
            }),
            C.a.createElement(w.a, {
              sortColumn: "city",
              title: "Plaats",
              width: "9%",
              setSorts: e
            }),
            C.a.createElement(_.a, { title: "Project", width: "8%" }),
            C.a.createElement(_.a, { title: "Aantal deelnames", width: "9%" }),
            C.a.createElement(w.a, {
              sortColumn: "participantMutationStatusId",
              title: "Deelname status",
              width: "8%",
              setSorts: e
            }),
            C.a.createElement(w.a, {
              sortColumn: "dateRegister",
              title: "Eerste ingangsdatum deelname",
              width: "9%",
              setSorts: e
            }),
            C.a.createElement(w.a, {
              sortColumn: "energySupplier",
              title: "Energie leverancier",
              width: "9%",
              setSorts: e
            }),
            C.a.createElement("th", { width: "5%" })
          );
        }),
        L = a(7),
        M = a.n(L),
        J = a(725),
        U = Object(v.b)(
          function(t) {
            return {
              filters: t.participantsProject.filters,
              contactTypes: t.systemData.contactTypes,
              contactStatuses: t.systemData.contactStatuses,
              participantMutationStatuses:
                t.systemData.participantMutationStatuses,
              energySuppliers: t.systemData.energySuppliers
            };
          },
          function(t) {
            return Object(T.b)(
              {
                clearFilterParticipantsProject: I.a,
                setFilterParticipantProjectAddress: I.c,
                setFilterParticipantProjectCity: I.e,
                setFilterParticipantProjectContactType: I.f,
                setFilterParticipantProjectParticipationsDefinitive: I.k,
                setFilterParticipantProjectDateRegister: I.g,
                setFilterParticipantProjectEnergySupplierId: I.h,
                setFilterParticipantProjectName: I.j,
                setFilterParticipantMutationStatusId: I.b,
                setFilterParticipantProjectPostalCode: I.l,
                setFilterProjectId: I.m
              },
              t
            );
          }
        )(function(t) {
          return C.a.createElement(
            "tr",
            { className: "thead-filter" },
            C.a.createElement(
              "th",
              null,
              t.showCheckboxList &&
                t.checkedAll &&
                C.a.createElement("input", {
                  type: "checkbox",
                  onChange: t.toggleCheckedAll,
                  checked: !0
                }),
              t.showCheckboxList &&
                !t.checkedAll &&
                C.a.createElement("input", {
                  type: "checkbox",
                  onChange: t.toggleCheckedAll
                })
            ),
            C.a.createElement(
              "th",
              null,
              t.showCheckboxList
                ? null
                : C.a.createElement(
                    "select",
                    {
                      className: "form-control input-sm",
                      value: t.filters.contactType.data,
                      onChange: function(e) {
                        t.setFilterParticipantProjectContactType(
                          e.target.value
                        ),
                          setTimeout(function() {
                            t.onSubmitFilter();
                          }, 100);
                      }
                    },
                    C.a.createElement("option", null),
                    t.contactTypes.map(function(t) {
                      return C.a.createElement(
                        "option",
                        { key: t.id, value: t.id },
                        t.name
                      );
                    })
                  )
            ),
            C.a.createElement(
              "th",
              null,
              t.showCheckboxList
                ? null
                : C.a.createElement("input", {
                    type: "text",
                    className: "form-control input-sm",
                    value: t.filters.name.data,
                    onChange: function(e) {
                      t.setFilterParticipantProjectName(e.target.value);
                    }
                  })
            ),
            C.a.createElement(
              "th",
              null,
              t.showCheckboxList
                ? null
                : C.a.createElement("input", {
                    type: "text",
                    className: "form-control input-sm",
                    value: t.filters.address.data,
                    onChange: function(e) {
                      t.setFilterParticipantProjectAddress(e.target.value);
                    }
                  })
            ),
            C.a.createElement(
              "th",
              null,
              t.showCheckboxList
                ? null
                : C.a.createElement("input", {
                    type: "text",
                    className: "form-control input-sm",
                    value: t.filters.postalCode.data,
                    onChange: function(e) {
                      t.setFilterParticipantProjectPostalCode(e.target.value);
                    }
                  })
            ),
            C.a.createElement(
              "th",
              null,
              t.showCheckboxList
                ? null
                : C.a.createElement("input", {
                    type: "text",
                    className: "form-control input-sm",
                    value: t.filters.city.data,
                    onChange: function(e) {
                      t.setFilterParticipantProjectCity(e.target.value);
                    }
                  })
            ),
            C.a.createElement(
              "th",
              null,
              t.showCheckboxList
                ? null
                : C.a.createElement(
                    "select",
                    {
                      className: "form-control input-sm",
                      value: t.filters.projectId.data,
                      onChange: function(e) {
                        t.setFilterProjectId(e.target.value),
                          setTimeout(function() {
                            t.onSubmitFilter();
                          }, 100);
                      }
                    },
                    C.a.createElement("option", null),
                    t.projects.map(function(t) {
                      return C.a.createElement(
                        "option",
                        { key: t.id, value: t.id },
                        t.name
                      );
                    })
                  )
            ),
            C.a.createElement(
              "th",
              null,
              t.showCheckboxList
                ? null
                : C.a.createElement("input", {
                    type: "text",
                    className: "form-control input-sm",
                    value: t.filters.participationsDefinitive.data,
                    onChange: function(e) {
                      t.setFilterParticipantProjectParticipationsDefinitive(
                        e.target.value
                      );
                    }
                  })
            ),
            C.a.createElement(
              "th",
              null,
              t.showCheckboxList
                ? null
                : C.a.createElement(
                    "select",
                    {
                      className: "form-control input-sm",
                      value: t.filters.participantMutationStatusId.data,
                      onChange: function(e) {
                        t.setFilterParticipantMutationStatusId(e.target.value),
                          setTimeout(function() {
                            t.onSubmitFilter();
                          }, 100);
                      }
                    },
                    C.a.createElement("option", null),
                    t.participantMutationStatuses.map(function(t) {
                      return C.a.createElement(
                        "option",
                        { key: t.id, value: t.id },
                        t.name
                      );
                    })
                  )
            ),
            t.showCheckboxList
              ? C.a.createElement("th", null)
              : C.a.createElement(J.a, {
                  value:
                    t.filters.dateRegister.data && t.filters.dateRegister.data,
                  onChangeAction: function(e) {
                    void 0 === e
                      ? t.setFilterParticipantProjectDateRegister("")
                      : t.setFilterParticipantProjectDateRegister(
                          M()(e).format("Y-MM-DD")
                        );
                  }
                }),
            C.a.createElement(
              "th",
              null,
              t.showCheckboxList
                ? null
                : C.a.createElement(
                    "select",
                    {
                      className: "form-control input-sm",
                      value: t.filters.energySupplierId.data,
                      onChange: function(e) {
                        t.setFilterParticipantProjectEnergySupplierId(
                          e.target.value
                        ),
                          setTimeout(function() {
                            t.onSubmitFilter();
                          }, 100);
                      }
                    },
                    C.a.createElement("option", null),
                    t.energySuppliers.map(function(t) {
                      return C.a.createElement(
                        "option",
                        { key: t.id, value: t.id },
                        t.name
                      );
                    })
                  )
            ),
            C.a.createElement("th", null)
          );
        }),
        V = a(4),
        G = a(697),
        q = a.n(G),
        B = a(713);
      function Y(t) {
        var e = (function() {
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
          } catch (t) {
            return !1;
          }
        })();
        return function() {
          var a,
            n = E()(t);
          if (e) {
            var r = E()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      M.a.locale("nl");
      var z = (function(t) {
          m()(a, t);
          var e = Y(a);
          function a(t) {
            var n;
            return (
              o()(this, a),
              ((n = e.call(this, t)).state = {
                showActionButtons: !1,
                highlightRow: ""
              }),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "onRowEnter",
                value: function() {
                  this.setState({
                    showActionButtons: !0,
                    highlightRow: "highlight-row"
                  });
                }
              },
              {
                key: "onRowLeave",
                value: function() {
                  this.setState({ showActionButtons: !1, highlightRow: "" });
                }
              },
              {
                key: "openItem",
                value: function(t) {
                  V.f.push("/project/deelnemer/".concat(t));
                }
              },
              {
                key: "render",
                value: function() {
                  var t = this,
                    e = this.props,
                    a = e.id,
                    n = e.contact,
                    r = e.participationsInteressed,
                    i = e.participationsOptioned,
                    o = e.participationsGranted,
                    s = e.participationsDefinitive,
                    c = e.amountInteressed,
                    l = e.amountOptioned,
                    u = e.amountGranted,
                    p = e.amountDefinitive,
                    m = e.uniqueMutationStatuses,
                    d = e.dateRegister,
                    h = e.project,
                    f = h ? h.typeCodeRef : "",
                    E = r + i + o + s,
                    g = c + l + u + p,
                    P = n.primaryAddress,
                    y = "",
                    v = "",
                    T = "";
                  P &&
                    (P.street && (y = P.street),
                    P.number && (v = P.number),
                    P.addition && (T = P.addition));
                  var b = !(
                      n.primaryEmailAddress &&
                      n.primaryEmailAddress.email &&
                      !q.a.isEmpty(n.primaryEmailAddress.email)
                    ),
                    k = b ? "Primair e-mailadres bij contact ontbreekt." : "",
                    I = b
                      ? this.state.highlightRow + " missing-data-row"
                      : this.state.highlightRow;
                  return C.a.createElement(
                    "tr",
                    {
                      title: k,
                      className: I,
                      onDoubleClick: function() {
                        return t.openItem(a);
                      },
                      onMouseEnter: function() {
                        return t.onRowEnter();
                      },
                      onMouseLeave: function() {
                        return t.onRowLeave();
                      }
                    },
                    C.a.createElement(
                      "td",
                      null,
                      this.props.showCheckboxList
                        ? C.a.createElement("input", {
                            type: "checkbox",
                            name: a,
                            onChange: this.props.toggleParticipantCheck,
                            checked:
                              !!this.props.participantIds &&
                              this.props.participantIds.includes(a)
                          })
                        : null
                    ),
                    C.a.createElement("td", null, n.type ? n.type.name : ""),
                    C.a.createElement("td", null, n.fullName),
                    C.a.createElement("td", null, P ? y + " " + v + T : ""),
                    C.a.createElement(
                      "td",
                      null,
                      n.primaryAddress ? n.primaryAddress.postalCode : ""
                    ),
                    C.a.createElement(
                      "td",
                      null,
                      n.primaryAddress ? n.primaryAddress.city : ""
                    ),
                    C.a.createElement("td", null, h ? h.name : ""),
                    "loan" === f
                      ? C.a.createElement("td", null, g ? Object(B.a)(g) : "")
                      : C.a.createElement("td", null, E || ""),
                    C.a.createElement(
                      "td",
                      null,
                      m
                        .map(function(t) {
                          return t.name;
                        })
                        .join(", ")
                    ),
                    C.a.createElement("td", null, d ? M()(d).format("L") : ""),
                    C.a.createElement(
                      "td",
                      null,
                      n.primaryContactEnergySupplier
                        ? n.primaryContactEnergySupplier.energySupplier.name
                        : ""
                    ),
                    C.a.createElement(
                      "td",
                      null,
                      this.state.showActionButtons
                        ? C.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return t.openItem(a);
                              }
                            },
                            C.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-pencil mybtn-success"
                            }),
                            " "
                          )
                        : ""
                    )
                  );
                }
              }
            ]),
            a
          );
        })(y.Component),
        H = a(712);
      function W(t) {
        var e = (function() {
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
          } catch (t) {
            return !1;
          }
        })();
        return function() {
          var a,
            n = E()(t);
          if (e) {
            var r = E()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var K = (function(t) {
          m()(a, t);
          var e = W(a);
          function a(t) {
            var n;
            return (
              o()(this, a),
              (n = e.call(this, t)),
              P()(u()(n), "handleKeyUp", function(t) {
                13 === t.keyCode && n.props.onSubmitFilter();
              }),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "render",
                value: function() {
                  var t = this,
                    e = this.props.participantsProject,
                    a = e.data,
                    n = void 0 === a ? [] : a,
                    r = e.meta,
                    i = void 0 === r ? {} : r,
                    o = "",
                    s = !0;
                  return (
                    this.props.hasError
                      ? (o = "Fout bij het ophalen van deelnemers.")
                      : this.props.isLoading
                      ? (o = "Gegevens aan het laden.")
                      : 0 === n.length
                      ? (o = "Geen deelnemers gevonden!")
                      : (s = !1),
                    C.a.createElement(
                      "form",
                      { onKeyUp: this.handleKeyUp },
                      C.a.createElement(
                        A.a,
                        null,
                        C.a.createElement(
                          x.a,
                          null,
                          C.a.createElement(D, {
                            refreshParticipantsProjectData: function() {
                              return t.props.refreshParticipantsProjectData();
                            }
                          }),
                          C.a.createElement(U, {
                            onSubmitFilter: this.props.onSubmitFilter,
                            toggleCheckedAll: this.props.toggleCheckedAll,
                            showCheckboxList: this.props.showCheckboxList,
                            checkedAll: this.props.checkedAll,
                            projects: this.props.projects
                          })
                        ),
                        C.a.createElement(
                          N.a,
                          null,
                          s
                            ? C.a.createElement(
                                "tr",
                                null,
                                C.a.createElement("td", { colSpan: 11 }, o)
                              )
                            : n.map(function(e) {
                                return C.a.createElement(
                                  z,
                                  S()(
                                    {
                                      key: e.id,
                                      showCheckboxList:
                                        t.props.showCheckboxList,
                                      checkedAll: t.props.checkedAll,
                                      toggleParticipantCheck:
                                        t.props.toggleParticipantCheck,
                                      participantIds: t.props.participantIds
                                    },
                                    e
                                  )
                                );
                              })
                        )
                      ),
                      C.a.createElement(
                        "div",
                        { className: "col-md-4 col-md-offset-4" },
                        C.a.createElement(H.a, {
                          recordsPerPage: 20,
                          onPageChangeAction: this.props.handlePageClick,
                          totalRecords: i.total,
                          initialPage: this.props.participantsProjectPagination
                            .page
                        })
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(y.Component),
        Z = Object(v.b)(function(t) {
          return {
            isLoading: t.loadingData.isLoading,
            hasError: t.loadingData.hasError
          };
        })(K),
        Q = a(693),
        X = a(692),
        $ = Object(v.b)(function(t) {
          return {
            participantsProject: t.participantsProject.list,
            permissions: t.meDetails.permissions
          };
        }, null)(function(t) {
          var e = t.participantsProject.meta,
            a = void 0 === e ? {} : e;
          return C.a.createElement(
            "div",
            { className: "row" },
            C.a.createElement(
              "div",
              { className: "col-md-2" },
              C.a.createElement(
                "div",
                { className: "btn-group btn-group-flex", role: "group" },
                C.a.createElement(Q.a, {
                  iconName: "glyphicon-refresh",
                  onClickAction: t.resetParticipantProjectFilters
                }),
                C.a.createElement(Q.a, {
                  iconName: "glyphicon-download-alt",
                  onClickAction: t.getExcel
                }),
                C.a.createElement(X.a, {
                  buttonText: "Rapportage",
                  onClickAction: t.toggleShowCheckboxList
                })
              )
            ),
            C.a.createElement(
              "div",
              { className: "col-md-8" },
              C.a.createElement(
                "h4",
                { className: "text-center table-title" },
                "Deelnemers project"
              )
            ),
            C.a.createElement(
              "div",
              { className: "col-md-2" },
              C.a.createElement(
                "div",
                { className: "pull-right" },
                "Resultaten: ",
                a.total || 0
              )
            )
          );
        }),
        tt = a(722),
        et = a(690),
        at = a(691),
        nt = a(104),
        rt = a(105),
        it = a(100),
        ot = a(694),
        st = a(696),
        ct = a(695),
        lt = a(207),
        ut = a(711),
        pt = a.n(ut),
        mt = a(2),
        dt = a.n(mt),
        ht = a(985),
        ft = a(203),
        Et = a(102);
      function gt(t, e) {
        var a = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(t);
          e &&
            (n = n.filter(function(e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            a.push.apply(a, n);
        }
        return a;
      }
      function Pt(t) {
        for (var e = 1; e < arguments.length; e++) {
          var a = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? gt(Object(a), !0).forEach(function(e) {
                P()(t, e, a[e]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a))
            : gt(Object(a)).forEach(function(e) {
                Object.defineProperty(
                  t,
                  e,
                  Object.getOwnPropertyDescriptor(a, e)
                );
              });
        }
        return t;
      }
      function yt(t) {
        var e = (function() {
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
          } catch (t) {
            return !1;
          }
        })();
        return function() {
          var a,
            n = E()(t);
          if (e) {
            var r = E()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var Ct = (function(t) {
          m()(a, t);
          var e = yt(a);
          function a(t) {
            var n;
            return (
              o()(this, a),
              ((n = e.call(this, t)).state = {
                filterType: t.filterType,
                amountOfFilters: t.amountOfFilters,
                filters: t.extraFilters,
                yesNoOptions: [
                  { id: 1, name: "Ja" },
                  { id: 0, name: "Nee" }
                ],
                projects: [],
                contacts: []
              }),
              (n.closeModal = n.closeModal.bind(u()(n))),
              (n.confirmAction = n.confirmAction.bind(u()(n))),
              (n.handleFilterFieldChange = n.handleFilterFieldChange.bind(
                u()(n)
              )),
              (n.handleFilterTypeChange = n.handleFilterTypeChange.bind(
                u()(n)
              )),
              (n.handleFilterValueChange = n.handleFilterValueChange.bind(
                u()(n)
              )),
              (n.addFilterRow = n.addFilterRow.bind(u()(n))),
              (n.deleteFilterRow = n.deleteFilterRow.bind(u()(n))),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var t = this;
                  dt.a.all([ft.a.peekProjects(), Et.a.getContactsPeek()]).then(
                    dt.a.spread(function(e, a) {
                      t.setState({ projects: e, contacts: a });
                    })
                  );
                }
              },
              {
                key: "closeModal",
                value: function() {
                  this.props.toggleShowExtraFilters();
                }
              },
              {
                key: "confirmAction",
                value: function() {
                  this.props.handleExtraFiltersChange(
                    this.state.filters,
                    this.state.amountOfFilters,
                    this.state.filterType
                  );
                }
              },
              {
                key: "handleFilterFieldChange",
                value: function(t, e) {
                  var a = this.state.filters;
                  (a[e].field = t),
                    (a[e].data = ""),
                    this.setState(Pt(Pt({}, this.state), {}, { filters: a }));
                }
              },
              {
                key: "handleFilterTypeChange",
                value: function(t) {
                  this.setState(Pt(Pt({}, this.state), {}, { filterType: t }));
                }
              },
              {
                key: "handleFilterValueChange",
                value: function(t, e, a) {
                  var n = this.state.filters;
                  (n[a][t] = e),
                    this.setState(Pt(Pt({}, this.state), {}, { filters: n }));
                }
              },
              {
                key: "addFilterRow",
                value: function() {
                  var t = this,
                    e = this.state.filters;
                  (e[this.state.amountOfFilters] = {
                    field: "name",
                    type: "eq",
                    data: ""
                  }),
                    setTimeout(function() {
                      t.setState(Pt(Pt({}, t.state), {}, { filters: e }));
                    }, 300),
                    setTimeout(function() {
                      t.setState({
                        amountOfFilters: t.state.amountOfFilters + 1
                      });
                    }, 300);
                }
              },
              {
                key: "deleteFilterRow",
                value: function(t) {
                  var e = this.state.filters;
                  e.splice(t, 1),
                    this.setState(
                      Pt(
                        Pt({}, this.state),
                        {},
                        { filters: e, amountOfFilters: e.length }
                      )
                    );
                }
              },
              {
                key: "render",
                value: function() {
                  var t = this,
                    e = {
                      name: { name: "Naam", type: "string" },
                      postalCode: { name: "Postcode", type: "string" },
                      amountDefinitive: {
                        name: "Huidig aantal lening",
                        type: "number"
                      },
                      participationsDefinitive: {
                        name: "Huidig aantal deelnames",
                        type: "number"
                      },
                      dateRegister: {
                        name: "Datum inschrijving",
                        type: "date"
                      },
                      datePayed: { name: "Datum betaald", type: "date" },
                      participationStatusId: {
                        name: "Deelnames status",
                        type: "dropdown",
                        dropDownOptions: this.props.participantMutationStatuses
                      },
                      contactBirthday: {
                        name: "Contact geboortedatum",
                        type: "date"
                      },
                      projectId: {
                        name: "Project",
                        type: "dropdownHas",
                        dropDownOptions: this.state.projects
                      },
                      dateContractSend: {
                        name: "Datum contract verzonden",
                        type: "date"
                      },
                      dateContractRetour: {
                        name: "Datum contract retour",
                        type: "date"
                      },
                      dateEnd: { name: "Einddatum", type: "date" },
                      giftedByContactId: {
                        name: "Geschonken door",
                        type: "dropdown",
                        dropDownOptions: this.state.contacts,
                        optionName: "fullName"
                      },
                      participationsSold: {
                        name: "Deelnames overgedragen",
                        type: "number"
                      },
                      didAcceptAgreement: {
                        name: "Akkoord voorwaarden",
                        type: "dropdown",
                        dropDownOptions: this.state.yesNoOptions
                      },
                      didUnderstandInfo: {
                        name: "Projectinfo begrepen",
                        type: "dropdown",
                        dropDownOptions: this.state.yesNoOptions
                      },
                      participationsRequested: {
                        name: "Deelnames aangevraagd",
                        type: "number"
                      }
                    };
                  return C.a.createElement(
                    it.a,
                    {
                      title: "Extra filters",
                      buttonConfirmText: "Toepassen",
                      confirmAction: this.confirmAction,
                      closeModal: this.closeModal,
                      buttonCancelText: "Sluiten",
                      extraButtonLabel: "Maak groep",
                      extraButtonClass: "btn-success",
                      extraButtonAction: this.props.saveAsGroup
                    },
                    C.a.createElement(
                      "div",
                      { className: "row filter-row" },
                      C.a.createElement(
                        "h5",
                        null,
                        C.a.createElement(
                          "div",
                          { className: "col-xs-6" },
                          C.a.createElement("input", {
                            onChange: function() {
                              return t.handleFilterTypeChange("and");
                            },
                            type: "radio",
                            name: "type",
                            value: "and",
                            id: "and",
                            checked: "and" === this.state.filterType
                          }),
                          C.a.createElement(
                            "label",
                            { htmlFor: "and" },
                            'Alle extra filters zijn "EN"'
                          )
                        ),
                        C.a.createElement(
                          "div",
                          { className: "col-xs-6" },
                          C.a.createElement("input", {
                            onChange: function() {
                              return t.handleFilterTypeChange("or");
                            },
                            type: "radio",
                            name: "type",
                            value: "or",
                            id: "or",
                            checked: "or" === this.state.filterType
                          }),
                          C.a.createElement(
                            "label",
                            { htmlFor: "or" },
                            'Alle extra filters zijn "OF"'
                          )
                        )
                      )
                    ),
                    C.a.createElement(
                      "table",
                      { className: "table" },
                      C.a.createElement(
                        "thead",
                        null,
                        C.a.createElement(
                          "tr",
                          null,
                          C.a.createElement(
                            "th",
                            { className: "col-md-4" },
                            "Zoekveld"
                          ),
                          C.a.createElement("th", { className: "col-md-3" }),
                          C.a.createElement(
                            "th",
                            { className: "col-md-4" },
                            "Waarde"
                          ),
                          C.a.createElement("th", { className: "col-md-1" })
                        )
                      ),
                      C.a.createElement(
                        "tbody",
                        null,
                        0 === this.state.filters.length
                          ? C.a.createElement(
                              "tr",
                              null,
                              C.a.createElement(
                                "td",
                                { colSpan: 4 },
                                "Geen filters gezet."
                              )
                            )
                          : this.state.filters.map(function(a, n) {
                              return C.a.createElement(ht.a, {
                                key: n,
                                filter: a,
                                filterNumber: n,
                                fields: e,
                                handleFilterFieldChange:
                                  t.handleFilterFieldChange,
                                deleteFilterRow: t.deleteFilterRow,
                                handleFilterValueChange:
                                  t.handleFilterValueChange
                              });
                            })
                      )
                    ),
                    C.a.createElement(
                      "div",
                      { className: "row" },
                      C.a.createElement(
                        "div",
                        { className: "col-xs-12 text-right" },
                        C.a.createElement(X.a, {
                          buttonText: "Extra filter",
                          onClickAction: this.addFilterRow
                        })
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(y.Component),
        vt = Object(v.b)(function(t) {
          return {
            participantMutationStatuses:
              t.systemData.participantMutationStatuses,
            contactStatuses: t.systemData.contactStatuses
          };
        })(Ct);
      function Tt(t) {
        var e = (function() {
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
          } catch (t) {
            return !1;
          }
        })();
        return function() {
          var a,
            n = E()(t);
          if (e) {
            var r = E()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return h()(this, a);
        };
      }
      var bt = (function(t) {
        m()(a, t);
        var e = Tt(a);
        function a(t) {
          var n;
          return (
            o()(this, a),
            (n = e.call(this, t)),
            P()(u()(n), "fetchParticipantsProjectData", function() {
              setTimeout(function() {
                var t = n.state.extraFilters,
                  e = Object(tt.a)(n.props.participantsProjectFilters),
                  a = n.props.participantsProjectSorts,
                  r = {
                    limit: 20,
                    offset: n.props.participantsProjectPagination.offset
                  },
                  i = n.state.filterType;
                n.props.fetchParticipantsProject(e, t, a, r, i, !1);
              }, 100);
            }),
            P()(u()(n), "resetParticipantProjectFilters", function() {
              n.props.clearFilterParticipantsProject(),
                n.setState({
                  filterType: "and",
                  amountOfFilters: 0,
                  extraFilters: []
                }),
                n.fetchParticipantsProjectData();
            }),
            P()(u()(n), "toggleShowCheckboxList", function() {
              n.state.showCheckboxList
                ? n.setState({ showCheckboxList: !1, participantIds: [] })
                : n.setState({
                    showCheckboxList: !0,
                    participantIds:
                      n.props.participantsProject.meta.participantIdsTotal,
                    checkedAll: !0
                  });
            }),
            P()(u()(n), "toggleModal", function() {
              n.setState({ showModal: !n.state.showModal });
            }),
            P()(u()(n), "toggleCheckedAll", function() {
              var t = event.target.checked,
                e = [];
              t && (e = n.props.participantsProject.meta.participantIdsTotal),
                n.setState({ participantIds: e, checkedAll: t });
            }),
            P()(u()(n), "toggleParticipantCheck", function(t) {
              var e = t.target.checked,
                a = Number(t.target.name);
              e
                ? n.setState(
                    {
                      participantIds: [].concat(r()(n.state.participantIds), [
                        a
                      ])
                    },
                    n.checkAllParticipantsAreChecked
                  )
                : n.setState({
                    participantIds: n.state.participantIds.filter(function(t) {
                      return t !== a;
                    }),
                    checkedAll: !1
                  });
            }),
            P()(u()(n), "checkParticipantReport", function() {
              var t = !1;
              q.a.isEmpty(n.state.templateId)
                ? ((t = !0), n.setState({ templateIdError: !0 }))
                : n.setState({ templateIdError: !1 }),
                q.a.isEmpty(n.state.emailTemplateId)
                  ? ((t = !0), n.setState({ emailTemplateIdError: !0 }))
                  : n.setState({ emailTemplateIdError: !1 }),
                n.state.participantIds.length > 0 && !t
                  ? (n.props.previewParticipantReport({
                      templateId: n.state.templateId,
                      emailTemplateId: n.state.emailTemplateId,
                      subject: n.state.subject,
                      participantIds: n.state.participantIds
                    }),
                    V.f.push("/project/preview-rapportage"))
                  : t ||
                    n.setState({
                      showModal: !0,
                      modalText: "Er zijn geen deelnemers geselecteerd.",
                      buttonConfirmText: "Voeg deelnemers toe"
                    });
            }),
            P()(u()(n), "getExcel", function() {
              n.props.blockUI();
              for (
                var t = Math.ceil(n.props.participantsProject.meta.total / 1e3),
                  e = n.props.participantsProject.meta.total > 1e3,
                  a = 1,
                  r = 1;
                r <= t;
                r++
              ) {
                var i = { limit: 1e3, offset: 1e3 * r - 1e3 },
                  o = Object(tt.a)(n.props.participantsProjectFilters),
                  s = n.state.extraFilters,
                  c = n.props.participantsProjectSorts;
                lt.a
                  .getExcel(o, s, c, i)
                  .then(function(r) {
                    if (
                      ((i = "Deelnemers-".concat(
                        M()().format("YYYY-MM-DD HH:mm:ss"),
                        ".xlsx"
                      )),
                      e)
                    )
                      var i = "Deelnemers-"
                        .concat(M()().format("YYYY-MM-DD HH:mm:ss"), " (")
                        .concat(a, " van ")
                        .concat(t, ").xlsx");
                    pt()(r.data, i), (a += 1), n.props.unblockUI();
                  })
                  .catch(function(t) {
                    n.props.unblockUI();
                  });
              }
            }),
            P()(u()(n), "saveAsGroup", function() {
              var t = n.state.extraFilters,
                e = Object(tt.a)(n.props.participantsProjectFilters),
                a = n.state.filterType;
              lt.a
                .saveAsGroup({
                  filters: e,
                  extraFilters: t,
                  filterType: a,
                  saveFromProject: !1
                })
                .then(function(t) {
                  V.f.push("/contact-groep/".concat(t.data.data.id, "/edit"));
                });
            }),
            (n.state = {
              participantIds: [],
              templateId: "",
              templateIdError: !1,
              templates: [],
              emailTemplateId: "",
              emailTemplateIdError: !1,
              emailTemplates: [],
              subject: [],
              documentGroup: "",
              checkedAll: !1,
              showCheckboxList: !1,
              showModal: !1,
              modalText: "",
              buttonConfirmText: "",
              readyForCreation: !1,
              showExtraFilters: !1,
              filterType: "and",
              amountOfFilters: 0,
              extraFilters: [],
              projects: []
            }),
            (n.handleInputChange = n.handleInputChange.bind(u()(n))),
            (n.handleExtraFiltersChange = n.handleExtraFiltersChange.bind(
              u()(n)
            )),
            (n.toggleParticipantCheck = n.toggleParticipantCheck.bind(u()(n))),
            (n.handleEmailTemplateChange = n.handleEmailTemplateChange.bind(
              u()(n)
            )),
            (n.handleSubjectChange = n.handleSubjectChange.bind(u()(n))),
            (n.handlePageClick = n.handlePageClick.bind(u()(n))),
            (n.toggleShowExtraFilters = n.toggleShowExtraFilters.bind(u()(n))),
            n
          );
        }
        return (
          c()(a, [
            {
              key: "componentDidMount",
              value: function() {
                var t = this;
                this.fetchParticipantsProjectData(),
                  rt.a.fetchDocumentTemplatesPeekGeneral().then(function(e) {
                    var a = [];
                    e.forEach(function(t) {
                      ("participation" != t.group && "revenue" != t.group) ||
                        a.push({ id: t.id, name: t.name });
                    }),
                      t.setState({ templates: a });
                  }),
                  nt.a.fetchEmailTemplatesPeek().then(function(e) {
                    t.setState({ emailTemplates: e });
                  }),
                  dt.a.all([ft.a.peekProjects(), Et.a.getContactsPeek()]).then(
                    dt.a.spread(function(e, a) {
                      t.setState({ projects: e, contacts: a });
                    })
                  );
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearParticipantsProject();
              }
            },
            {
              key: "onSubmitFilter",
              value: function() {
                var t = this;
                this.props.setParticipantsProjectPagination({
                  page: 0,
                  offset: 0
                }),
                  setTimeout(function() {
                    t.fetchParticipantsProjectData();
                  }, 100);
              }
            },
            {
              key: "handlePageClick",
              value: function(t) {
                var e = this,
                  a = t.selected,
                  n = Math.ceil(20 * a);
                this.props.setParticipantsProjectPagination({
                  page: a,
                  offset: n
                }),
                  setTimeout(function() {
                    e.fetchParticipantsProjectData();
                  }, 100);
              }
            },
            {
              key: "handleInputChange",
              value: function(t) {
                var e = t.target,
                  a = "checkbox" === e.type ? e.checked : e.value;
                this.setState({ templateId: a });
              }
            },
            {
              key: "handleSubjectChange",
              value: function(t) {
                var e = t.target,
                  a = "checkbox" === e.type ? e.checked : e.value;
                this.setState({ subject: a });
              }
            },
            {
              key: "handleEmailTemplateChange",
              value: function(t) {
                var e = this,
                  a = t.target,
                  n = "checkbox" === a.type ? a.checked : a.value;
                a.name;
                this.setState({ emailTemplateId: n }),
                  nt.a.fetchEmailTemplateWithUser(n).then(function(t) {
                    e.setState({
                      subject: t.subject ? t.subject : e.state.subject
                    });
                  });
              }
            },
            {
              key: "handleExtraFiltersChange",
              value: function(t, e, a) {
                var n = this;
                this.setState({
                  filterType: a,
                  amountOfFilters: e,
                  extraFilters: t
                }),
                  this.props.setParticipantsProjectPagination({
                    page: 0,
                    offset: 0
                  }),
                  setTimeout(function() {
                    n.fetchParticipantsProjectData();
                  }, 100);
              }
            },
            {
              key: "checkAllParticipantsAreChecked",
              value: function() {
                this.setState({
                  checkedAll:
                    this.state.participantIds.length ===
                    this.props.participantsProject.meta.participantIdsTotal
                      .length
                });
              }
            },
            {
              key: "prefillExtraFilter",
              value: function() {
                this.setState({
                  filterType: "and",
                  amountOfFilters: 1,
                  extraFilters: [{ field: "name", type: "eq", data: "" }]
                });
              }
            },
            {
              key: "toggleShowExtraFilters",
              value: function() {
                0 === this.state.extraFilters.length &&
                  !this.state.showExtraFilters &&
                  this.prefillExtraFilter(),
                  this.setState({
                    showExtraFilters: !this.state.showExtraFilters
                  });
              }
            },
            {
              key: "render",
              value: function() {
                var t,
                  e = this,
                  a = 0;
                return (
                  this.state.participantIds &&
                    (a =
                      this.props &&
                      this.props.participantsProject &&
                      this.props.participantsProject.meta &&
                      this.props.participantsProject.meta.participantIdsTotal
                        ? this.state.participantIds.length +
                          "/" +
                          this.props.participantsProject.meta
                            .participantIdsTotal.length
                        : this.state.participantIds.length),
                  C.a.createElement(
                    et.a,
                    null,
                    C.a.createElement(
                      at.a,
                      null,
                      this.state.showCheckboxList
                        ? null
                        : C.a.createElement(
                            "div",
                            { className: "col-md-12 margin-10-top" },
                            C.a.createElement($, {
                              resetParticipantProjectFilters: function() {
                                return e.resetParticipantProjectFilters();
                              },
                              toggleShowCheckboxList: this
                                .toggleShowCheckboxList,
                              handleExtraFiltersChange: this
                                .handleExtraFiltersChange,
                              toggleShowExtraFilters: this
                                .toggleShowExtraFilters,
                              getExcel: this.getExcel,
                              saveAsGroup: this.saveAsGroup
                            })
                          ),
                      this.state.showCheckboxList
                        ? C.a.createElement(
                            et.a,
                            null,
                            C.a.createElement(
                              at.a,
                              null,
                              C.a.createElement(
                                "div",
                                { className: "row" },
                                C.a.createElement(
                                  "div",
                                  { className: "col-md-12" },
                                  C.a.createElement(ct.a, {
                                    label: "Documentgroep",
                                    value: "Deelname / Opbrengst"
                                  }),
                                  C.a.createElement(st.a, {
                                    label: "Document template",
                                    name: "templateId",
                                    value: this.state.templateId,
                                    options: this.state.templates,
                                    onChangeAction: this.handleInputChange,
                                    required: "required",
                                    error: this.state.templateIdError
                                  })
                                ),
                                C.a.createElement(
                                  "div",
                                  { className: "col-md-12" },
                                  C.a.createElement(st.a, {
                                    label: "E-mail template",
                                    name: "emailTemplateId",
                                    value: this.state.emailTemplateId,
                                    options: this.state.emailTemplates,
                                    onChangeAction: this
                                      .handleEmailTemplateChange,
                                    required: "required",
                                    error: this.state.emailTemplateIdError
                                  }),
                                  C.a.createElement(ot.a, {
                                    label: "E-mail onderwerp",
                                    name: "subject",
                                    value: this.state.subject,
                                    onChangeAction: this.handleSubjectChange
                                  })
                                ),
                                C.a.createElement(
                                  "div",
                                  { className: "col-md-12" },
                                  C.a.createElement(ct.a, {
                                    label: "Geselecteerde deelnemers",
                                    value: a
                                  }),
                                  C.a.createElement(
                                    "div",
                                    {
                                      className:
                                        "margin-10-top pull-right btn-group",
                                      role: "group"
                                    },
                                    C.a.createElement(X.a, {
                                      buttonClassName: "btn-default",
                                      buttonText: "Annuleren",
                                      onClickAction: this.toggleShowCheckboxList
                                    }),
                                    C.a.createElement(X.a, {
                                      buttonText: "Preview rapportage",
                                      onClickAction: this
                                        .checkParticipantReport,
                                      type: "submit",
                                      value: "Submit"
                                    })
                                  )
                                )
                              )
                            )
                          )
                        : null,
                      C.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        C.a.createElement(
                          Z,
                          ((t = {
                            participantsProject: this.props.participantsProject,
                            participantsProjectPagination: this.props
                              .participantsProjectPagination,
                            onSubmitFilter: function() {
                              return e.onSubmitFilter();
                            },
                            refreshParticipantsProjectData: function() {
                              return e.fetchParticipantsProjectData();
                            },
                            handlePageClick: this.handlePageClick,
                            showCheckboxList: this.state.showCheckboxList,
                            toggleCheckedAll: this.toggleCheckedAll,
                            checkedAll: this.state.checkedAll,
                            toggleParticipantCheck: this.toggleParticipantCheck,
                            participantIds: this.state.participantIds
                          }),
                          P()(t, "toggleCheckedAll", this.toggleCheckedAll),
                          P()(t, "projects", this.state.projects),
                          t)
                        )
                      )
                    ),
                    this.state.showModal &&
                      C.a.createElement(
                        it.a,
                        {
                          title: "Deelnemer rapport maken",
                          closeModal: this.toggleModal,
                          buttonConfirmText: this.state.buttonConfirmText,
                          confirmAction: this.createParticipantReport
                        },
                        this.state.modalText
                      ),
                    this.state.showExtraFilters &&
                      C.a.createElement(vt, {
                        toggleShowExtraFilters: this.toggleShowExtraFilters,
                        handleExtraFiltersChange: this.handleExtraFiltersChange,
                        extraFilters: this.state.extraFilters,
                        amountOfFilters: this.state.amountOfFilters,
                        filterType: this.state.filterType,
                        saveAsGroup: this.saveAsGroup
                      })
                  )
                );
              }
            }
          ]),
          a
        );
      })(y.Component);
      e.default = Object(v.b)(
        function(t) {
          return {
            participantsProject: t.participantsProject.list,
            participantsProjectFilters: t.participantsProject.filters,
            participantsProjectSorts: t.participantsProject.sorts,
            participantsProjectPagination: t.participantsProject.pagination
          };
        },
        function(t) {
          return Object(T.b)(
            {
              blockUI: j.a,
              unblockUI: j.b,
              previewParticipantReport: b.l,
              fetchParticipantsProject: k.b,
              clearParticipantsProject: k.a,
              setParticipantsProjectPagination: R.a,
              clearFilterParticipantsProject: I.a
            },
            t
          );
        }
      )(bt);
    },
    690: function(t, e, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        s = function(t) {
          var e = t.children,
            a = t.className,
            n = t.onMouseEnter,
            i = t.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: i
            },
            e
          );
        };
      (s.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (s.propTypes = {
          className: o.a.string,
          onMouseEnter: o.a.func,
          onMouseLeave: o.a.func
        }),
        (e.a = s);
    },
    691: function(t, e, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        s = function(t) {
          var e = t.className,
            a = t.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(e) },
            a
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: o.a.string }),
        (e.a = s);
    },
    694: function(t, e, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        o = a.n(i),
        s = function(t) {
          var e = t.label,
            a = t.type,
            n = t.className,
            i = t.size,
            o = t.id,
            s = t.placeholder,
            c = t.name,
            l = t.value,
            u = t.onClickAction,
            p = t.onChangeAction,
            m = t.onBlurAction,
            d = t.required,
            h = t.readOnly,
            f = t.maxLength,
            E = t.error,
            g = t.min,
            P = t.max,
            y = t.step,
            C = t.errorMessage,
            v = t.divSize,
            T = t.divClassName,
            b = t.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(v, " ").concat(T) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(d) },
              e
            ),
            r.a.createElement(
              "div",
              { className: "".concat(i) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (E ? "has-error" : ""),
                id: o,
                placeholder: s,
                name: c,
                value: l,
                onClick: u,
                onChange: p,
                onBlur: m,
                readOnly: h,
                maxLength: f,
                min: g,
                max: P,
                autoComplete: b,
                step: y
              })
            ),
            E &&
              r.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                r.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  C
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
        (e.a = s);
    },
    695: function(t, e, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(4),
        o = a(8),
        s = a.n(o),
        c = function(t) {
          var e = t.label,
            a = t.className,
            n = t.id,
            o = t.value,
            s = t.link,
            c = t.hidden;
          return s.length > 0
            ? r.a.createElement(
                "div",
                { className: a, style: c ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  e
                ),
                r.a.createElement(
                  "div",
                  { className: "col-sm-6", id: n, onClick: null },
                  r.a.createElement(
                    i.b,
                    { to: s, className: "link-underline" },
                    o
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: a, style: c ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  e
                ),
                r.a.createElement("div", { className: "col-sm-6", id: n }, o)
              );
        };
      (c.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (c.propTypes = {
          label: s.a.oneOfType([s.a.string, s.a.object]).isRequired,
          className: s.a.string,
          id: s.a.string,
          value: s.a.oneOfType([s.a.string, s.a.number]),
          link: s.a.string,
          hidden: s.a.bool
        }),
        (e.a = c);
    },
    713: function(t, e, a) {
      "use strict";
      e.a = function(t) {
        return (
          t || (t = 0),
          (t = parseFloat(t)),
          isNaN(t)
            ? "Ongeldig bedrag"
            : "€ ".concat(
                t.toLocaleString("nl", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              )
        );
      };
    },
    726: function(t, e, a) {
      "use strict";
      a.d(e, "h", function() {
        return n;
      }),
        a.d(e, "e", function() {
          return r;
        }),
        a.d(e, "c", function() {
          return i;
        }),
        a.d(e, "k", function() {
          return o;
        }),
        a.d(e, "n", function() {
          return s;
        }),
        a.d(e, "g", function() {
          return c;
        }),
        a.d(e, "i", function() {
          return l;
        }),
        a.d(e, "m", function() {
          return u;
        }),
        a.d(e, "j", function() {
          return p;
        }),
        a.d(e, "b", function() {
          return m;
        }),
        a.d(e, "l", function() {
          return d;
        }),
        a.d(e, "a", function() {
          return h;
        }),
        a.d(e, "d", function() {
          return f;
        }),
        a.d(e, "f", function() {
          return E;
        });
      var n = function(t) {
          return { type: "FETCH_PROJECT", id: t };
        },
        r = function(t) {
          return { type: "DELETE_PROJECT", id: t };
        },
        i = function() {
          return { type: "CLEAR_PROJECT" };
        },
        o = function(t) {
          return { type: "NEW_VALUE_COURSE", valueCourse: t };
        },
        s = function(t) {
          return { type: "UPDATE_VALUE_COURSE", valueCourse: t };
        },
        c = function(t) {
          return { type: "DELETE_VALUE_COURSE", id: t };
        },
        l = function(t) {
          return { type: "FETCH_PROJECT_REVENUE", id: t };
        },
        u = function(t) {
          return { type: "PROJECT_REVENUE_PREVIEW_REPORT", data: t };
        },
        p = function(t) {
          return { type: "PROJECT_REVENUE_GET_DISTRIBUTION", data: t };
        },
        m = function() {
          return { type: "CLEAR_PROJECT_REVENUE_PREVIEW_REPORT" };
        },
        d = function(t) {
          return { type: "PROJECT_PARTICIPANT_PREVIEW_REPORT", data: t };
        },
        h = function() {
          return { type: "CLEAR_PROJECT_PARTICIPANT_PREVIEW_REPORT" };
        },
        f = function() {
          return { type: "CLEAR_PROJECT_REVENUE" };
        },
        E = function(t) {
          return { type: "DELETE_REVENUE", id: t };
        };
    },
    837: function(t, e, a) {
      "use strict";
      a.d(e, "i", function() {
        return n;
      }),
        a.d(e, "f", function() {
          return r;
        }),
        a.d(e, "j", function() {
          return i;
        }),
        a.d(e, "c", function() {
          return o;
        }),
        a.d(e, "l", function() {
          return s;
        }),
        a.d(e, "e", function() {
          return c;
        }),
        a.d(e, "d", function() {
          return l;
        }),
        a.d(e, "k", function() {
          return u;
        }),
        a.d(e, "b", function() {
          return p;
        }),
        a.d(e, "g", function() {
          return m;
        }),
        a.d(e, "h", function() {
          return d;
        }),
        a.d(e, "m", function() {
          return h;
        }),
        a.d(e, "a", function() {
          return f;
        });
      var n = function(t) {
          return { type: "SET_FILTER_PROJECT_PARTICIPANT_ID", id: t };
        },
        r = function(t) {
          return {
            type: "SET_FILTER_PARTICIPANT_PROJECT_CONTACT_TYPE",
            contactType: t
          };
        },
        i = function(t) {
          return { type: "SET_FILTER_PARTICIPANT_PROJECT_NAME", name: t };
        },
        o = function(t) {
          return { type: "SET_FILTER_PARTICIPANT_PROJECT_ADDRESS", address: t };
        },
        s = function(t) {
          return {
            type: "SET_FILTER_PARTICIPANT_PROJECT_POSTAL_CODE",
            postalCode: t
          };
        },
        c = function(t) {
          return { type: "SET_FILTER_PARTICIPANT_PROJECT_CITY", city: t };
        },
        l = function(t) {
          return {
            type: "SET_FILTER_PARTICIPANT_PROJECT_AMOUNT_DEFINITIVE",
            amountDefinitive: t
          };
        },
        u = function(t) {
          return {
            type: "SET_FILTER_PARTICIPANT_PROJECT_PARTICIPATIONS_DEFINITIVE",
            participationsDefinitive: t
          };
        },
        p = function(t) {
          return {
            type: "SET_FILTER_PARTICIPANT_MUTATION_STATUS_ID",
            participantMutationStatusId: t
          };
        },
        m = function(t) {
          return {
            type: "SET_FILTER_PARTICIPANT_PROJECT_DATE_REGISTER",
            dateRegister: t
          };
        },
        d = function(t) {
          return {
            type: "SET_FILTER_PARTICIPANT_PROJECT_ENERGY_SUPPLIER_ID",
            energySupplierId: t
          };
        },
        h = function(t) {
          return { type: "SET_FILTER_PARTICIPANT_PROJECT_ID", projectId: t };
        },
        f = function() {
          return { type: "CLEAR_FILTER_PARTICIPANTS_PROJECT" };
        };
    },
    944: function(t, e, a) {
      "use strict";
      a.d(e, "b", function() {
        return n;
      }),
        a.d(e, "a", function() {
          return r;
        });
      var n = function(t, e, a, n, r, i) {
          return {
            type: "FETCH_PARTICIPANTS_PROJECT",
            filters: t,
            extraFilters: e,
            sorts: a,
            pagination: n,
            filterType: r,
            fetchFromProject: i
          };
        },
        r = function() {
          return { type: "CLEAR_PARTICIPANTS_PROJECT" };
        };
    },
    945: function(t, e, a) {
      "use strict";
      a.d(e, "a", function() {
        return n;
      });
      var n = function(t) {
        return { type: "SET_PARTICIPANTS_PROJECTS_PAGINATION", pagination: t };
      };
    },
    946: function(t, e, a) {
      "use strict";
      a.d(e, "a", function() {
        return n;
      });
      var n = function(t, e) {
        return {
          type: "SET_PARTICIPANTS_PROJECT_SORTS_FILTER",
          field: t,
          order: e
        };
      };
    }
  }
]);
