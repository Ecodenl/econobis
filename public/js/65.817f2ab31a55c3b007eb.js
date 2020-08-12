(window.webpackJsonp = window.webpackJsonp || []).push([
  [65],
  {
    1434: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        i = a(25),
        c = a.n(i),
        l = a(26),
        o = a.n(l),
        s = a(27),
        u = a.n(s),
        p = a(16),
        m = a.n(p),
        d = a(0),
        f = a.n(d),
        h = a(32),
        E = a(4),
        g = a(690),
        v = a(691),
        y = a(693),
        b = a(692);
      function P(e) {
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
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var j = (function(e) {
          o()(a, e);
          var t = P(a);
          function a(e) {
            return r()(this, a), t.call(this, e);
          }
          return (
            c()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.project;
                  return f.a.createElement(
                    "div",
                    { className: "row" },
                    f.a.createElement(
                      "div",
                      { className: "col-sm-12" },
                      f.a.createElement(
                        g.a,
                        null,
                        f.a.createElement(
                          v.a,
                          { className: "panel-small" },
                          f.a.createElement(
                            "div",
                            { className: "col-md-2" },
                            f.a.createElement(
                              "div",
                              {
                                className:
                                  "btn-group btn-group-flex  margin-small",
                                role: "group"
                              },
                              f.a.createElement(y.a, {
                                iconName: "glyphicon-arrow-left",
                                onClickAction: E.e.goBack
                              }),
                              f.a.createElement(b.a, {
                                buttonText: "Open detailformulier",
                                onClickAction: function() {
                                  return E.f.push(
                                    "/project/details/".concat(e.props.id)
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
                              {
                                className:
                                  "text-center text-success margin-small"
                              },
                              f.a.createElement(
                                "strong",
                                null,
                                "Project ",
                                t ? t.name : ""
                              )
                            )
                          ),
                          f.a.createElement("div", { className: "col-md-2" })
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
        C = Object(h.b)(function(e) {
          return {
            project: e.projectDetails,
            permissions: e.meDetails.permissions
          };
        })(j),
        T = a(198),
        k = a(7),
        N = a.n(k),
        R = a(713),
        w = a(695);
      N.a.locale("nl");
      var S = Object(h.b)(function(e) {
          return {
            project: e.projectDetails,
            projectTypes: e.systemData.projectTypes
          };
        })(function(e) {
          var t = e.project,
            a = t.name,
            n = t.dateStart,
            r = t.projectStatus,
            i = t.projectType,
            c = t.amountOfLoanNeeded,
            l = t.amountDefinitive,
            o = t.amountGranted,
            s = t.amountOptioned,
            u = t.amountInteressed,
            p = c - l;
          return f.a.createElement(
            g.a,
            null,
            f.a.createElement(
              v.a,
              null,
              f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement(w.a, { label: "Project", value: a }),
                f.a.createElement(w.a, {
                  label: "Lening interesse",
                  value: Object(R.a)(u)
                })
              ),
              f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement(w.a, {
                  label: "Type project",
                  value: i && i.name
                }),
                f.a.createElement(w.a, {
                  label: "Lening ingeschreven",
                  value: Object(R.a)(s)
                })
              ),
              f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement(w.a, { label: "Status", value: r && r.name }),
                f.a.createElement(w.a, {
                  label: "Lening toegekend",
                  value: Object(R.a)(o)
                })
              ),
              f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement(w.a, {
                  label: "Start project",
                  value: n ? N()(n).format("L") : ""
                }),
                f.a.createElement(w.a, {
                  label: "Lening opgehaald",
                  value: Object(R.a)(l)
                })
              ),
              f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement("div", { className: "form-group col-md-6" }),
                f.a.createElement(w.a, {
                  label: "Lening uit te geven",
                  value: Object(R.a)(p)
                })
              ),
              f.a.createElement(
                "div",
                { className: "row" },
                f.a.createElement("div", { className: "form-group col-md-6" }),
                f.a.createElement(w.a, {
                  label: "Lening nodig",
                  value: c && Object(R.a)(c)
                })
              )
            )
          );
        }),
        I = a(11),
        O = a.n(I),
        D = a(22),
        x = a.n(D),
        A = a(6),
        F = a.n(A),
        L = a(14),
        _ = a(726),
        M = a(944),
        U = a(837),
        G = a(945),
        J = a(727),
        V = a(199),
        B = a.n(V),
        q = a(146),
        H = a(147),
        Y = a(200),
        z = a(721),
        W = a(946),
        K = a(101),
        Z = Object(h.b)(null, function(e) {
          return {
            setParticipantsProjectSortsFilter: function(t, a) {
              e(Object(W.a)(t, a));
            }
          };
        })(function(e) {
          var t = e.setParticipantsProjectSortsFilter,
            a = e.refreshParticipantsProjectData,
            n = e.projectTypeRef,
            r = function(e, n) {
              t(e, n),
                setTimeout(function() {
                  a();
                }, 100);
            };
          return f.a.createElement(
            "tr",
            { className: "thead-title" },
            f.a.createElement(K.a, { title: "", width: "2%" }),
            f.a.createElement(z.a, {
              sortColumn: "contactType",
              title: "Type",
              width: "7%",
              setSorts: r
            }),
            f.a.createElement(z.a, {
              sortColumn: "name",
              title: "Naam",
              width: "12%",
              setSorts: r
            }),
            f.a.createElement(z.a, {
              sortColumn: "address",
              title: "Adres",
              width: "15%",
              setSorts: r
            }),
            f.a.createElement(z.a, {
              sortColumn: "postalCode",
              title: "Postcode",
              width: "6%",
              setSorts: r
            }),
            f.a.createElement(z.a, {
              sortColumn: "city",
              title: "Plaats",
              width: "12%",
              setSorts: r
            }),
            "loan" === n
              ? f.a.createElement(K.a, { title: "Aantal lening", width: "8%" })
              : null,
            "obligation" === n
              ? f.a.createElement(K.a, {
                  title: "Aantal obligaties",
                  width: "8%"
                })
              : null,
            "capital" === n || "postalcode_link_capital" === n
              ? f.a.createElement(K.a, {
                  title: "Aantal deelnames",
                  width: "8%"
                })
              : null,
            f.a.createElement(z.a, {
              sortColumn: "participantMutationStatusId",
              title: "Deelname status",
              width: "9%",
              setSorts: r
            }),
            f.a.createElement(z.a, {
              sortColumn: "dateRegister",
              title: "Eerste ingangsdatum deelname",
              width: "10%",
              setSorts: r
            }),
            "postalcode_link_capital" === n
              ? f.a.createElement(z.a, {
                  sortColumn: "energySupplier",
                  title: "Energie leverancier",
                  width: "10%",
                  setSorts: r
                })
              : null,
            f.a.createElement("th", { width: "5%" })
          );
        }),
        X = a(725),
        Q = Object(h.b)(
          function(e) {
            return {
              filters: e.participantsProject.filters,
              contactTypes: e.systemData.contactTypes,
              participantMutationStatuses:
                e.systemData.participantMutationStatuses,
              energySuppliers: e.systemData.energySuppliers
            };
          },
          function(e) {
            return Object(L.b)(
              {
                clearFilterParticipantsProject: U.a,
                setFilterParticipantProjectAddress: U.c,
                setFilterParticipantProjectCity: U.e,
                setFilterParticipantProjectContactType: U.f,
                setFilterParticipantProjectAmountDefinitive: U.d,
                setFilterParticipantProjectParticipationsDefinitive: U.k,
                setFilterParticipantProjectDateRegister: U.g,
                setFilterParticipantProjectEnergySupplierId: U.h,
                setFilterParticipantProjectId: U.i,
                setFilterParticipantProjectName: U.j,
                setFilterParticipantMutationStatusId: U.b,
                setFilterParticipantProjectPostalCode: U.l
              },
              e
            );
          }
        )(function(e) {
          var t = [].concat(O()(e.participantMutationStatuses), [
            { id: "isTerminated", name: "Beëindigd" }
          ]);
          return f.a.createElement(
            "tr",
            { className: "thead-filter" },
            f.a.createElement(
              "th",
              null,
              e.showCheckboxList &&
                e.checkedAll &&
                f.a.createElement("input", {
                  type: "checkbox",
                  onChange: e.toggleCheckedAll,
                  checked: !0
                }),
              e.showCheckboxList &&
                !e.checkedAll &&
                f.a.createElement("input", {
                  type: "checkbox",
                  onChange: e.toggleCheckedAll
                })
            ),
            f.a.createElement(
              "th",
              null,
              e.showCheckboxList
                ? null
                : f.a.createElement(
                    "select",
                    {
                      className: "form-control input-sm",
                      value: e.filters.contactType.data,
                      onChange: function(t) {
                        e.setFilterParticipantProjectContactType(
                          t.target.value
                        ),
                          setTimeout(function() {
                            e.onSubmitFilter();
                          }, 100);
                      }
                    },
                    f.a.createElement("option", null),
                    e.contactTypes.map(function(e) {
                      return f.a.createElement(
                        "option",
                        { key: e.id, value: e.id },
                        e.name
                      );
                    })
                  )
            ),
            f.a.createElement(
              "th",
              null,
              e.showCheckboxList
                ? null
                : f.a.createElement("input", {
                    type: "text",
                    className: "form-control input-sm",
                    value: e.filters.name.data,
                    onChange: function(t) {
                      e.setFilterParticipantProjectName(t.target.value);
                    }
                  })
            ),
            f.a.createElement(
              "th",
              null,
              e.showCheckboxList
                ? null
                : f.a.createElement("input", {
                    type: "text",
                    className: "form-control input-sm",
                    value: e.filters.address.data,
                    onChange: function(t) {
                      e.setFilterParticipantProjectAddress(t.target.value);
                    }
                  })
            ),
            f.a.createElement(
              "th",
              null,
              e.showCheckboxList
                ? null
                : f.a.createElement("input", {
                    type: "text",
                    className: "form-control input-sm",
                    value: e.filters.postalCode.data,
                    onChange: function(t) {
                      e.setFilterParticipantProjectPostalCode(t.target.value);
                    }
                  })
            ),
            f.a.createElement(
              "th",
              null,
              e.showCheckboxList
                ? null
                : f.a.createElement("input", {
                    type: "text",
                    className: "form-control input-sm",
                    value: e.filters.city.data,
                    onChange: function(t) {
                      e.setFilterParticipantProjectCity(t.target.value);
                    }
                  })
            ),
            "loan" === e.projectTypeRef
              ? f.a.createElement(
                  "th",
                  null,
                  e.showCheckboxList
                    ? null
                    : f.a.createElement("input", {
                        type: "text",
                        className: "form-control input-sm",
                        value: e.filters.amountDefinitive.data,
                        onChange: function(t) {
                          e.setFilterParticipantProjectAmountDefinitive(
                            t.target.value
                          );
                        }
                      })
                )
              : f.a.createElement(
                  "th",
                  null,
                  e.showCheckboxList
                    ? null
                    : f.a.createElement("input", {
                        type: "text",
                        className: "form-control input-sm",
                        value: e.filters.participationsDefinitive.data,
                        onChange: function(t) {
                          e.setFilterParticipantProjectParticipationsDefinitive(
                            t.target.value
                          );
                        }
                      })
                ),
            f.a.createElement(
              "th",
              null,
              e.showCheckboxList
                ? null
                : f.a.createElement(
                    "select",
                    {
                      className: "form-control input-sm",
                      value: e.filters.participantMutationStatusId.data,
                      onChange: function(t) {
                        e.setFilterParticipantMutationStatusId(t.target.value),
                          setTimeout(function() {
                            e.onSubmitFilter();
                          }, 100);
                      }
                    },
                    f.a.createElement("option", null),
                    t.map(function(e) {
                      return f.a.createElement(
                        "option",
                        { key: e.id, value: e.id },
                        e.name
                      );
                    })
                  )
            ),
            e.showCheckboxList
              ? f.a.createElement("th", null)
              : f.a.createElement(X.a, {
                  value:
                    e.filters.dateRegister.data && e.filters.dateRegister.data,
                  onChangeAction: function(t) {
                    void 0 === t
                      ? e.setFilterParticipantProjectDateRegister("")
                      : e.setFilterParticipantProjectDateRegister(
                          N()(t).format("Y-MM-DD")
                        );
                  }
                }),
            "postalcode_link_capital" === e.projectTypeRef
              ? f.a.createElement(
                  "th",
                  null,
                  e.showCheckboxList
                    ? null
                    : f.a.createElement(
                        "select",
                        {
                          className: "form-control input-sm",
                          value: e.filters.energySupplierId.data,
                          onChange: function(t) {
                            e.setFilterParticipantProjectEnergySupplierId(
                              t.target.value
                            ),
                              setTimeout(function() {
                                e.onSubmitFilter();
                              }, 100);
                          }
                        },
                        f.a.createElement("option", null),
                        e.energySuppliers.map(function(e) {
                          return f.a.createElement(
                            "option",
                            { key: e.id, value: e.id },
                            e.name
                          );
                        })
                      )
                )
              : null,
            f.a.createElement("th", null)
          );
        }),
        $ = a(697),
        ee = a.n($);
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
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      N.a.locale("nl");
      var ae = (function(e) {
          o()(a, e);
          var t = te(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              ((n = t.call(this, e)).state = {
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
                value: function(e) {
                  E.f.push("/project/deelnemer/".concat(e));
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props,
                    a = t.id,
                    n = t.contact,
                    r = t.participationsInteressed,
                    i = t.participationsOptioned,
                    c = t.participationsGranted,
                    l = t.participationsDefinitive,
                    o = t.amountInteressed,
                    s = t.amountOptioned,
                    u = t.amountGranted,
                    p = t.amountDefinitive,
                    m = t.uniqueMutationStatuses,
                    d = t.dateRegister,
                    h = r + i + c + l,
                    E = o + s + u + p,
                    g = n.primaryAddress,
                    v = "",
                    y = "",
                    b = "";
                  g &&
                    (g.street && (v = g.street),
                    g.number && (y = g.number),
                    g.addition && (b = g.addition));
                  var P = !(
                      n.primaryEmailAddress &&
                      n.primaryEmailAddress.email &&
                      !ee.a.isEmpty(n.primaryEmailAddress.email)
                    ),
                    j = P ? "Primair e-mailadres bij contact ontbreekt." : "",
                    C = P
                      ? this.state.highlightRow + " missing-data-row"
                      : this.state.highlightRow;
                  return f.a.createElement(
                    "tr",
                    {
                      title: j,
                      className: C,
                      onDoubleClick: function() {
                        return e.openItem(a);
                      },
                      onMouseEnter: function() {
                        return e.onRowEnter();
                      },
                      onMouseLeave: function() {
                        return e.onRowLeave();
                      }
                    },
                    f.a.createElement(
                      "td",
                      null,
                      this.props.showCheckboxList
                        ? f.a.createElement("input", {
                            type: "checkbox",
                            name: a,
                            onChange: this.props.toggleParticipantCheck,
                            checked:
                              !!this.props.participantIds &&
                              this.props.participantIds.includes(a)
                          })
                        : null
                    ),
                    f.a.createElement("td", null, n.type ? n.type.name : ""),
                    f.a.createElement("td", null, n.fullName),
                    f.a.createElement("td", null, g ? v + " " + y + b : ""),
                    f.a.createElement(
                      "td",
                      null,
                      n.primaryAddress ? n.primaryAddress.postalCode : ""
                    ),
                    f.a.createElement(
                      "td",
                      null,
                      n.primaryAddress ? n.primaryAddress.city : ""
                    ),
                    "loan" === this.props.projectTypeRef
                      ? f.a.createElement("td", null, E ? Object(R.a)(E) : "")
                      : f.a.createElement("td", null, h || ""),
                    f.a.createElement(
                      "td",
                      null,
                      m
                        .map(function(e) {
                          return e.name;
                        })
                        .join(", ")
                    ),
                    f.a.createElement("td", null, d ? N()(d).format("L") : ""),
                    "postalcode_link_capital" === this.props.projectTypeRef
                      ? f.a.createElement(
                          "td",
                          null,
                          n.primaryContactEnergySupplier
                            ? n.primaryContactEnergySupplier.energySupplier.name
                            : ""
                        )
                      : null,
                    f.a.createElement(
                      "td",
                      null,
                      this.state.showActionButtons
                        ? f.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.openItem(a);
                              }
                            },
                            f.a.createElement("span", {
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
        })(d.Component),
        ne = a(712);
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
          var a,
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var ie = (function(e) {
          o()(a, e);
          var t = re(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              F()(x()(n), "handleKeyUp", function(e) {
                13 === e.keyCode && n.props.onSubmitFilter();
              }),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.participantsProject,
                    a = t.data,
                    n = void 0 === a ? [] : a,
                    r = t.meta,
                    i = void 0 === r ? {} : r,
                    c = "",
                    l = !0;
                  return (
                    this.props.hasError
                      ? (c = "Fout bij het ophalen van deelnemers.")
                      : this.props.isLoading
                      ? (c = "Gegevens aan het laden.")
                      : 0 === n.length
                      ? (c = "Geen deelnemers gevonden!")
                      : (l = !1),
                    f.a.createElement(
                      "form",
                      { onKeyUp: this.handleKeyUp },
                      f.a.createElement(
                        q.a,
                        null,
                        f.a.createElement(
                          H.a,
                          null,
                          f.a.createElement(Z, {
                            refreshParticipantsProjectData: function() {
                              return e.props.refreshParticipantsProjectData();
                            },
                            projectTypeRef: this.props.projectTypeRef
                          }),
                          f.a.createElement(Q, {
                            onSubmitFilter: this.props.onSubmitFilter,
                            toggleCheckedAll: this.props.toggleCheckedAll,
                            showCheckboxList: this.props.showCheckboxList,
                            checkedAll: this.props.checkedAll,
                            projectTypeRef: this.props.projectTypeRef
                          })
                        ),
                        f.a.createElement(
                          Y.a,
                          null,
                          l
                            ? f.a.createElement(
                                "tr",
                                null,
                                f.a.createElement(
                                  "td",
                                  {
                                    colSpan:
                                      "postalcode_link_capital" ===
                                      this.props.projectTypeRef
                                        ? 11
                                        : 10
                                  },
                                  c
                                )
                              )
                            : n.map(function(t) {
                                return f.a.createElement(
                                  ae,
                                  B()(
                                    {
                                      key: t.id,
                                      showCheckboxList:
                                        e.props.showCheckboxList,
                                      checkedAll: e.props.checkedAll,
                                      toggleParticipantCheck:
                                        e.props.toggleParticipantCheck,
                                      projectTypeRef: e.props.projectTypeRef,
                                      participantIds: e.props.participantIds
                                    },
                                    t
                                  )
                                );
                              })
                        )
                      ),
                      f.a.createElement(
                        "div",
                        { className: "col-md-4 col-md-offset-4" },
                        f.a.createElement(ne.a, {
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
        })(d.Component),
        ce = Object(h.b)(function(e) {
          return {
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        })(ie),
        le = Object(h.b)(function(e) {
          return {
            participantsProject: e.participantsProject.list,
            project: e.projectDetails,
            permissions: e.meDetails.permissions
          };
        }, null)(function(e) {
          var t = e.participantsProject.meta,
            a = void 0 === t ? {} : t;
          return f.a.createElement(
            "div",
            { className: "row" },
            f.a.createElement(
              "div",
              { className: "col-md-2" },
              f.a.createElement(
                "div",
                { className: "btn-group btn-group-flex", role: "group" },
                f.a.createElement(y.a, {
                  iconName: "glyphicon-refresh",
                  onClickAction: e.resetParticipantProjectFilters
                }),
                e.permissions.manageParticipation &&
                  f.a.createElement(y.a, {
                    iconName: "glyphicon-plus",
                    onClickAction: function() {
                      return E.f.push(
                        "/project/deelnemer/nieuw/".concat(e.project.id)
                      );
                    },
                    disabled: "active" !== e.project.projectStatus.codeRef,
                    title:
                      "active" !== e.project.projectStatus.codeRef
                        ? "Deelnemer kan alleen bij status actief worden toegevoegd"
                        : "Deelnemer toevoegen"
                  }),
                f.a.createElement(y.a, {
                  iconName: "glyphicon-filter",
                  onClickAction: e.toggleShowExtraFilters
                }),
                f.a.createElement(y.a, {
                  iconName: "glyphicon-download-alt",
                  onClickAction: e.getExcel
                }),
                f.a.createElement(b.a, {
                  buttonText: "Rapportage",
                  onClickAction: e.toggleShowCheckboxList
                })
              )
            ),
            f.a.createElement(
              "div",
              { className: "col-md-8" },
              f.a.createElement(
                "h4",
                { className: "text-center table-title" },
                "Deelnemers project ",
                e.project ? e.project.name : ""
              )
            ),
            f.a.createElement(
              "div",
              { className: "col-md-2" },
              f.a.createElement(
                "div",
                { className: "pull-right" },
                "Resultaten: ",
                a.total || 0
              )
            )
          );
        }),
        oe = a(722),
        se = a(104),
        ue = a(105),
        pe = a(100),
        me = a(694),
        de = a(696),
        fe = a(207),
        he = a(711),
        Ee = a.n(he),
        ge = a(985),
        ve = a(2),
        ye = a.n(ve),
        be = a(203),
        Pe = a(102);
      function je(e, t) {
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
      function Ce(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? je(Object(a), !0).forEach(function(t) {
                F()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : je(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Te(e) {
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
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var ke = (function(e) {
          o()(a, e);
          var t = Te(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              ((n = t.call(this, e)).state = {
                filterType: e.filterType,
                amountOfFilters: e.amountOfFilters,
                filters: e.extraFilters,
                yesNoOptions: [
                  { id: 1, name: "Ja" },
                  { id: 0, name: "Nee" }
                ],
                projects: [],
                contacts: []
              }),
              (n.closeModal = n.closeModal.bind(x()(n))),
              (n.confirmAction = n.confirmAction.bind(x()(n))),
              (n.handleFilterFieldChange = n.handleFilterFieldChange.bind(
                x()(n)
              )),
              (n.handleFilterTypeChange = n.handleFilterTypeChange.bind(
                x()(n)
              )),
              (n.handleFilterValueChange = n.handleFilterValueChange.bind(
                x()(n)
              )),
              (n.addFilterRow = n.addFilterRow.bind(x()(n))),
              (n.deleteFilterRow = n.deleteFilterRow.bind(x()(n))),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  ye.a.all([be.a.peekProjects(), Pe.a.getContactsPeek()]).then(
                    ye.a.spread(function(t, a) {
                      e.setState({ projects: t, contacts: a });
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
                value: function(e, t) {
                  var a = this.state.filters;
                  (a[t].field = e),
                    (a[t].data = ""),
                    this.setState(Ce(Ce({}, this.state), {}, { filters: a }));
                }
              },
              {
                key: "handleFilterTypeChange",
                value: function(e) {
                  this.setState(Ce(Ce({}, this.state), {}, { filterType: e }));
                }
              },
              {
                key: "handleFilterValueChange",
                value: function(e, t, a) {
                  var n = this.state.filters;
                  (n[a][e] = t),
                    this.setState(Ce(Ce({}, this.state), {}, { filters: n }));
                }
              },
              {
                key: "addFilterRow",
                value: function() {
                  var e = this,
                    t = this.state.filters;
                  (t[this.state.amountOfFilters] = {
                    field: "name",
                    type: "eq",
                    data: ""
                  }),
                    setTimeout(function() {
                      e.setState(Ce(Ce({}, e.state), {}, { filters: t }));
                    }, 300),
                    setTimeout(function() {
                      e.setState({
                        amountOfFilters: e.state.amountOfFilters + 1
                      });
                    }, 300);
                }
              },
              {
                key: "deleteFilterRow",
                value: function(e) {
                  var t = this.state.filters;
                  t.splice(e, 1),
                    this.setState(
                      Ce(
                        Ce({}, this.state),
                        {},
                        { filters: t, amountOfFilters: t.length }
                      )
                    );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = {
                      name: { name: "Naam", type: "string" },
                      postalCode: { name: "Postcode", type: "string" },
                      contactBirthday: {
                        name: "Contact geboortedatum",
                        type: "date"
                      },
                      giftedByContactId: {
                        name: "Geschonken door",
                        type: "dropdown",
                        dropDownOptions: this.state.contacts,
                        optionName: "fullName"
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
                      projectId: {
                        name: "Project",
                        type: "dropdownHas",
                        dropDownOptions: this.state.projects
                      },
                      dateRegister: {
                        name: "Eerste ingangsdatum deelname",
                        type: "date"
                      },
                      participantMutationTypeId: {
                        name: "Mutatie type (Mutaties)",
                        type: "dropdown",
                        dropDownOptions: this.props.participantMutationTypes.filter(
                          function(t) {
                            return (
                              t.projectTypeCodeRef === e.props.projectTypeRef
                            );
                          }
                        )
                      },
                      participantMutationStatusId: {
                        name: "Deelname status (Mutaties)",
                        type: "dropdown",
                        dropDownOptions: [].concat(
                          O()(this.props.participantMutationStatuses),
                          [{ id: "isTerminated", name: "Beëindigd" }]
                        )
                      },
                      participantMutationDateContractRetour: {
                        name: "Datum contract retour (Mutaties)",
                        type: "date"
                      },
                      participantMutationDatePayment: {
                        name: "Betaaldatum (Mutaties)",
                        type: "date"
                      }
                    };
                  switch (this.props.projectTypeRef) {
                    case "obligation":
                      t.obligationsDefinitive = {
                        name: "Huidig aantal obligaties",
                        type: "number"
                      };
                      break;
                    case "capital":
                      t.participationsDefinitive = {
                        name: "Huidig aantal participaties",
                        type: "number"
                      };
                      break;
                    case "postalcode_link_capital":
                      t.postalcodeLinkCapitalDefinitive = {
                        name: "Huidig aantal postcoderoos",
                        type: "number"
                      };
                      break;
                    case "loan":
                      (t.payoutTypeId = {
                        name: "Uitkeren op",
                        type: "dropdown",
                        dropDownOptions: this.props
                          .participantProjectPayoutTypes
                      }),
                        (t.loanDefinitive = {
                          name: "Huidig bedrag lening",
                          type: "number"
                        });
                  }
                  return f.a.createElement(
                    pe.a,
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
                    f.a.createElement(
                      "div",
                      { className: "row filter-row" },
                      f.a.createElement(
                        "h5",
                        null,
                        f.a.createElement(
                          "div",
                          { className: "col-xs-6" },
                          f.a.createElement("input", {
                            onChange: function() {
                              return e.handleFilterTypeChange("and");
                            },
                            type: "radio",
                            name: "type",
                            value: "and",
                            id: "and",
                            checked: "and" === this.state.filterType
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
                              return e.handleFilterTypeChange("or");
                            },
                            type: "radio",
                            name: "type",
                            value: "or",
                            id: "or",
                            checked: "or" === this.state.filterType
                          }),
                          f.a.createElement(
                            "label",
                            { htmlFor: "or" },
                            'Alle extra filters zijn "OF"'
                          )
                        )
                      )
                    ),
                    f.a.createElement(
                      "table",
                      { className: "table" },
                      f.a.createElement(
                        "thead",
                        null,
                        f.a.createElement(
                          "tr",
                          null,
                          f.a.createElement(
                            "th",
                            { className: "col-md-4" },
                            "Zoekveld"
                          ),
                          f.a.createElement("th", { className: "col-md-3" }),
                          f.a.createElement(
                            "th",
                            { className: "col-md-4" },
                            "Waarde"
                          ),
                          f.a.createElement("th", { className: "col-md-1" })
                        )
                      ),
                      f.a.createElement(
                        "tbody",
                        null,
                        0 === this.state.filters.length
                          ? f.a.createElement(
                              "tr",
                              null,
                              f.a.createElement(
                                "td",
                                { colSpan: 4 },
                                "Geen filters gezet."
                              )
                            )
                          : this.state.filters.map(function(a, n) {
                              return f.a.createElement(ge.a, {
                                key: n,
                                filter: a,
                                filterNumber: n,
                                fields: t,
                                handleFilterFieldChange:
                                  e.handleFilterFieldChange,
                                deleteFilterRow: e.deleteFilterRow,
                                handleFilterValueChange:
                                  e.handleFilterValueChange
                              });
                            })
                      )
                    ),
                    f.a.createElement(
                      "div",
                      { className: "row" },
                      f.a.createElement(
                        "div",
                        { className: "col-xs-12 text-right" },
                        f.a.createElement(b.a, {
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
        })(d.Component),
        Ne = Object(h.b)(function(e) {
          return {
            participantMutationStatuses:
              e.systemData.participantMutationStatuses,
            contactStatuses: e.systemData.contactStatuses,
            participantMutationTypes: e.systemData.participantMutationTypes,
            participantProjectPayoutTypes:
              e.systemData.participantProjectPayoutTypes,
            projectTypeRef: e.projectDetails.projectType.codeRef
          };
        })(ke);
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
          var a,
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var we = (function(e) {
          o()(a, e);
          var t = Re(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              F()(x()(n), "fetchParticipantsProjectData", function() {
                setTimeout(function() {
                  var e = n.state.extraFilters,
                    t = Object(oe.a)(n.props.participantsProjectFilters),
                    a = n.props.participantsProjectSorts,
                    r = {
                      limit: 20,
                      offset: n.props.participantsProjectPagination.offset
                    },
                    i = n.state.filterType;
                  n.props.fetchParticipantsProject(t, e, a, r, i, !0);
                }, 100);
              }),
              F()(x()(n), "resetParticipantProjectFilters", function() {
                n.props.clearFilterParticipantsProject(),
                  n.setState({
                    filterType: "and",
                    amountOfFilters: 1,
                    extraFilters: [
                      {
                        field: "projectId",
                        type: "eq",
                        data: n.props.projectId + "",
                        readOnly: !0
                      }
                    ]
                  }),
                  n.fetchParticipantsProjectData();
              }),
              F()(x()(n), "toggleShowCheckboxList", function() {
                n.state.showCheckboxList
                  ? n.setState({ showCheckboxList: !1, participantIds: [] })
                  : n.setState({
                      showCheckboxList: !0,
                      participantIds:
                        n.props.participantsProject.meta.participantIdsTotal,
                      checkedAll: !0
                    });
              }),
              F()(x()(n), "toggleModal", function() {
                n.setState({ showModal: !n.state.showModal });
              }),
              F()(x()(n), "toggleCheckedAll", function() {
                var e = event.target.checked,
                  t = [];
                e && (t = n.props.participantsProject.meta.participantIdsTotal),
                  n.setState({ participantIds: t, checkedAll: e });
              }),
              F()(x()(n), "toggleParticipantCheck", function(e) {
                var t = e.target.checked,
                  a = Number(e.target.name);
                t
                  ? n.setState(
                      {
                        participantIds: [].concat(O()(n.state.participantIds), [
                          a
                        ])
                      },
                      n.checkAllParticipantsAreChecked
                    )
                  : n.setState({
                      participantIds: n.state.participantIds.filter(function(
                        e
                      ) {
                        return e !== a;
                      }),
                      checkedAll: !1
                    });
              }),
              F()(x()(n), "checkParticipantReport", function() {
                var e = !1;
                ee.a.isEmpty(n.state.templateId)
                  ? ((e = !0), n.setState({ templateIdError: !0 }))
                  : n.setState({ templateIdError: !1 }),
                  ee.a.isEmpty(n.state.emailTemplateId)
                    ? ((e = !0), n.setState({ emailTemplateIdError: !0 }))
                    : n.setState({ emailTemplateIdError: !1 }),
                  n.state.participantIds.length > 0 && !e
                    ? (n.props.previewParticipantReport({
                        templateId: n.state.templateId,
                        emailTemplateId: n.state.emailTemplateId,
                        subject: n.state.subject,
                        participantIds: n.state.participantIds
                      }),
                      E.f.push("/project/preview-rapportage"))
                    : e ||
                      n.setState({
                        showModal: !0,
                        modalText: "Er zijn geen deelnemers geselecteerd.",
                        buttonConfirmText: "Voeg deelnemers toe"
                      });
              }),
              F()(x()(n), "getExcel", function() {
                n.props.blockUI();
                for (
                  var e = Math.ceil(
                      n.props.participantsProject.meta.total / 1e3
                    ),
                    t = n.props.participantsProject.meta.total > 1e3,
                    a = 1,
                    r = 1;
                  r <= e;
                  r++
                ) {
                  var i = { limit: 1e3, offset: 1e3 * r - 1e3 },
                    c = Object(oe.a)(n.props.participantsProjectFilters),
                    l = n.state.extraFilters,
                    o = n.props.participantsProjectSorts;
                  fe.a
                    .getExcel(c, l, o, i, !0)
                    .then(function(r) {
                      if (
                        ((i = "Deelnemers-".concat(
                          N()().format("YYYY-MM-DD HH:mm:ss"),
                          ".xlsx"
                        )),
                        t)
                      )
                        var i = "Deelnemers-"
                          .concat(N()().format("YYYY-MM-DD HH:mm:ss"), " (")
                          .concat(a, " van ")
                          .concat(e, ").xlsx");
                      Ee()(r.data, i), (a += 1), n.props.unblockUI();
                    })
                    .catch(function(e) {
                      n.props.unblockUI();
                    });
                }
              }),
              F()(x()(n), "saveAsGroup", function() {
                var e = n.state.extraFilters,
                  t = Object(oe.a)(n.props.participantsProjectFilters),
                  a = n.state.filterType;
                fe.a
                  .saveAsGroup({
                    filters: t,
                    extraFilters: e,
                    filterType: a,
                    saveFromProject: !0
                  })
                  .then(function(e) {
                    E.f.push("/contact-groep/".concat(e.data.data.id, "/edit"));
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
                amountOfFilters: 1,
                extraFilters: [
                  {
                    field: "projectId",
                    type: "eq",
                    data: e.projectId + "",
                    readOnly: !0
                  }
                ]
              }),
              (n.handleInputChange = n.handleInputChange.bind(x()(n))),
              (n.handleExtraFiltersChange = n.handleExtraFiltersChange.bind(
                x()(n)
              )),
              (n.toggleParticipantCheck = n.toggleParticipantCheck.bind(
                x()(n)
              )),
              (n.handleEmailTemplateChange = n.handleEmailTemplateChange.bind(
                x()(n)
              )),
              (n.handleSubjectChange = n.handleSubjectChange.bind(x()(n))),
              (n.handlePageClick = n.handlePageClick.bind(x()(n))),
              (n.toggleShowExtraFilters = n.toggleShowExtraFilters.bind(
                x()(n)
              )),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  this.fetchParticipantsProjectData(),
                    ue.a.fetchDocumentTemplatesPeekGeneral().then(function(t) {
                      var a = [];
                      t.forEach(function(e) {
                        ("participation" != e.group && "revenue" != e.group) ||
                          a.push({ id: e.id, name: e.name });
                      }),
                        e.setState({ templates: a });
                    }),
                    se.a.fetchEmailTemplatesPeek().then(function(t) {
                      e.setState({ emailTemplates: t });
                    });
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
                  var e = this;
                  Object(oe.a)(this.props.participantsProjectFilters),
                    this.props.participantsProjectSorts;
                  this.props.setParticipantsProjectPagination({
                    page: 0,
                    offset: 0
                  }),
                    setTimeout(function() {
                      e.fetchParticipantsProjectData();
                    }, 100);
                }
              },
              {
                key: "handlePageClick",
                value: function(e) {
                  var t = this,
                    a = e.selected,
                    n = Math.ceil(20 * a);
                  this.props.setParticipantsProjectPagination({
                    page: a,
                    offset: n
                  }),
                    setTimeout(function() {
                      t.fetchParticipantsProjectData();
                    }, 100);
                }
              },
              {
                key: "handleInputChange",
                value: function(e) {
                  var t = e.target,
                    a = "checkbox" === t.type ? t.checked : t.value;
                  this.setState({ templateId: a });
                }
              },
              {
                key: "handleSubjectChange",
                value: function(e) {
                  var t = e.target,
                    a = "checkbox" === t.type ? t.checked : t.value;
                  this.setState({ subject: a });
                }
              },
              {
                key: "handleEmailTemplateChange",
                value: function(e) {
                  var t = this,
                    a = e.target,
                    n = "checkbox" === a.type ? a.checked : a.value;
                  a.name;
                  this.setState({ emailTemplateId: n }),
                    se.a.fetchEmailTemplateWithUser(n).then(function(e) {
                      t.setState({
                        subject: e.subject ? e.subject : t.state.subject
                      });
                    });
                }
              },
              {
                key: "handleExtraFiltersChange",
                value: function(e, t, a) {
                  var n = this;
                  this.setState({
                    filterType: a,
                    amountOfFilters: t,
                    extraFilters: e
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
                key: "toggleShowExtraFilters",
                value: function() {
                  this.setState({
                    showExtraFilters: !this.state.showExtraFilters
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = 0;
                  return (
                    this.state.participantIds &&
                      (t =
                        this.props &&
                        this.props.participantsProject &&
                        this.props.participantsProject.meta &&
                        this.props.participantsProject.meta.participantIdsTotal
                          ? this.state.participantIds.length +
                            "/" +
                            this.props.participantsProject.meta
                              .participantIdsTotal.length
                          : this.state.participantIds.length),
                    f.a.createElement(
                      g.a,
                      null,
                      f.a.createElement(
                        v.a,
                        null,
                        this.state.showCheckboxList
                          ? null
                          : f.a.createElement(
                              "div",
                              { className: "col-md-12 margin-10-top" },
                              f.a.createElement(le, {
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
                          ? f.a.createElement(
                              g.a,
                              null,
                              f.a.createElement(
                                v.a,
                                null,
                                f.a.createElement(
                                  "div",
                                  { className: "row" },
                                  f.a.createElement(
                                    "div",
                                    { className: "col-md-12" },
                                    f.a.createElement(w.a, {
                                      label: "Documentgroep",
                                      value: "Deelname / Opbrengst"
                                    }),
                                    f.a.createElement(de.a, {
                                      label: "Document template",
                                      name: "templateId",
                                      value: this.state.templateId,
                                      options: this.state.templates,
                                      onChangeAction: this.handleInputChange,
                                      required: "required",
                                      error: this.state.templateIdError
                                    })
                                  ),
                                  f.a.createElement(
                                    "div",
                                    { className: "col-md-12" },
                                    f.a.createElement(de.a, {
                                      label: "E-mail template",
                                      name: "emailTemplateId",
                                      value: this.state.emailTemplateId,
                                      options: this.state.emailTemplates,
                                      onChangeAction: this
                                        .handleEmailTemplateChange,
                                      required: "required",
                                      error: this.state.emailTemplateIdError
                                    }),
                                    f.a.createElement(me.a, {
                                      label: "E-mail onderwerp",
                                      name: "subject",
                                      value: this.state.subject,
                                      onChangeAction: this.handleSubjectChange
                                    })
                                  ),
                                  f.a.createElement(
                                    "div",
                                    { className: "col-md-12" },
                                    f.a.createElement(w.a, {
                                      label: "Geselecteerde deelnemers",
                                      value: t
                                    }),
                                    f.a.createElement(
                                      "div",
                                      {
                                        className:
                                          "margin-10-top pull-right btn-group",
                                        role: "group"
                                      },
                                      f.a.createElement(b.a, {
                                        buttonClassName: "btn-default",
                                        buttonText: "Annuleren",
                                        onClickAction: this
                                          .toggleShowCheckboxList
                                      }),
                                      f.a.createElement(b.a, {
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
                        f.a.createElement(
                          "div",
                          { className: "col-md-12 margin-10-top" },
                          f.a.createElement(ce, {
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
                            participantIds: this.state.participantIds,
                            projectTypeRef: this.props.projectTypeRef
                          })
                        )
                      ),
                      this.state.showModal &&
                        f.a.createElement(
                          pe.a,
                          {
                            title: "Deelnemer rapport maken",
                            closeModal: this.toggleModal,
                            buttonConfirmText: this.state.buttonConfirmText,
                            confirmAction: this.createParticipantReport
                          },
                          this.state.modalText
                        ),
                      this.state.showExtraFilters &&
                        f.a.createElement(Ne, {
                          toggleShowExtraFilters: this.toggleShowExtraFilters,
                          handleExtraFiltersChange: this
                            .handleExtraFiltersChange,
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
        })(d.Component),
        Se = Object(h.b)(
          function(e) {
            return {
              projectId: e.projectDetails.id,
              projectTypeRef: e.projectDetails.projectType.codeRef,
              participantsProject: e.participantsProject.list,
              participantsProjectFilters: e.participantsProject.filters,
              participantsProjectSorts: e.participantsProject.sorts,
              participantsProjectPagination: e.participantsProject.pagination
            };
          },
          function(e) {
            return Object(L.b)(
              {
                blockUI: J.a,
                unblockUI: J.b,
                previewParticipantReport: _.l,
                fetchParticipantsProject: M.b,
                clearParticipantsProject: M.a,
                setParticipantsProjectPagination: G.a,
                clearFilterParticipantsProject: U.a
              },
              e
            );
          }
        )(we);
      N.a.locale("nl");
      var Ie = Object(h.b)(function(e) {
        return {
          project: e.projectDetails,
          projectTypes: e.systemData.projectTypes
        };
      })(function(e) {
        var t = e.project,
          a = e.projectTypes,
          n = t.name,
          r = t.dateStart,
          i = t.projectStatus,
          c = t.participationsDefinitive,
          l = t.participationsGranted,
          o = t.participationsOptioned,
          s = t.participationsInteressed,
          u = t.totalParticipations,
          p = t.projectTypeId,
          m = t.projectType,
          d =
            (a.find(function(e) {
              return "obligation" === e.codeRef;
            }).id,
            u - c);
        return f.a.createElement(
          g.a,
          null,
          f.a.createElement(
            v.a,
            null,
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(w.a, { label: "Project", value: n }),
              f.a.createElement(w.a, {
                label: "Obligaties interesse",
                value: s
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(w.a, {
                label: "Type project",
                value: m && m.name
              }),
              f.a.createElement(w.a, {
                label: "Obligaties ingeschreven",
                value: o
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(w.a, { label: "Status", value: i && i.name }),
              f.a.createElement(w.a, {
                label: "Obligaties toegekend",
                value: l
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(w.a, {
                label: "Start project",
                value: r ? N()(r).format("L") : ""
              }),
              f.a.createElement(w.a, {
                label: "Uitgegeven obligaties",
                value: c
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement("div", { className: "form-group col-md-6" }),
              f.a.createElement(w.a, {
                label: "Uit te geven obligaties",
                value: d
              })
            )
          )
        );
      });
      N.a.locale("nl");
      var Oe = Object(h.b)(function(e) {
        return { project: e.projectDetails };
      })(function(e) {
        var t = e.project,
          a = (e.projectTypes, t.name),
          n = t.dateStart,
          r = t.projectStatus,
          i = t.participationsDefinitive,
          c = t.participationsGranted,
          l = t.participationsOptioned,
          o = t.participationsInteressed,
          s = t.totalParticipations,
          u = t.projectType,
          p = s - i;
        return f.a.createElement(
          g.a,
          null,
          f.a.createElement(
            v.a,
            null,
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(w.a, { label: "Project", value: a }),
              f.a.createElement(w.a, {
                label: "Participaties interesse",
                value: o
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(w.a, {
                label: "Type project",
                value: u && u.name
              }),
              f.a.createElement(w.a, {
                label: "Participaties ingeschreven",
                value: l
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(w.a, { label: "Status", value: r && r.name }),
              f.a.createElement(w.a, {
                label: "Participaties toegekend",
                value: c
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(w.a, {
                label: "Start project",
                value: n ? N()(n).format("L") : ""
              }),
              f.a.createElement(w.a, {
                label: "Uitgegeven participaties",
                value: i
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement("div", { className: "form-group col-md-6" }),
              f.a.createElement(w.a, {
                label: "Uit te geven participaties",
                value: p
              })
            )
          )
        );
      });
      N.a.locale("nl");
      var De = Object(h.b)(function(e) {
        return { project: e.projectDetails };
      })(function(e) {
        var t = e.project,
          a = t.name,
          n = t.dateStart,
          r = t.projectStatus,
          i = t.participationsDefinitive,
          c = t.participationsGranted,
          l = t.participationsOptioned,
          o = t.participationsInteressed,
          s = t.totalParticipations,
          u = t.projectType,
          p = s - i;
        return f.a.createElement(
          g.a,
          null,
          f.a.createElement(
            v.a,
            null,
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(w.a, { label: "Project", value: a }),
              f.a.createElement(w.a, {
                label: "Participaties interesse",
                value: o
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(w.a, {
                label: "Type project",
                value: u && u.name
              }),
              f.a.createElement(w.a, {
                label: "Participaties ingeschreven",
                value: l
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(w.a, { label: "Status", value: r && r.name }),
              f.a.createElement(w.a, {
                label: "Participaties toegekend",
                value: c
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement(w.a, {
                label: "Start project",
                value: n ? N()(n).format("L") : ""
              }),
              f.a.createElement(w.a, {
                label: "Uitgegeven participaties",
                value: i
              })
            ),
            f.a.createElement(
              "div",
              { className: "row" },
              f.a.createElement("div", { className: "form-group col-md-6" }),
              f.a.createElement(w.a, {
                label: "Uit te geven participaties",
                value: p
              })
            )
          )
        );
      });
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
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var Ae = (function(e) {
          o()(a, e);
          var t = xe(a);
          function a() {
            return r()(this, a), t.apply(this, arguments);
          }
          return (
            c()(a, [
              {
                key: "renderProjectSummary",
                value: function() {
                  switch (this.props.project.projectType.codeRef) {
                    case "loan":
                      return f.a.createElement(S, null);
                    case "obligation":
                      return f.a.createElement(Ie, null);
                    case "capital":
                      return f.a.createElement(Oe, null);
                    case "postalcode_link_capital":
                      return f.a.createElement(De, null);
                    default:
                      return f.a.createElement(
                        "div",
                        null,
                        "Geen type project gevonden."
                      );
                  }
                }
              },
              {
                key: "render",
                value: function() {
                  return Object(T.isEmpty)(this.props.project)
                    ? f.a.createElement("div", null, "Geen gegevens gevonden.")
                    : f.a.createElement(
                        "div",
                        null,
                        this.renderProjectSummary(),
                        f.a.createElement(Se, null)
                      );
                }
              }
            ]),
            a
          );
        })(d.Component),
        Fe = Object(h.b)(function(e) {
          return { project: e.projectDetails };
        })(Ae),
        Le = a(986);
      function _e(e) {
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
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var Me = (function(e) {
        o()(a, e);
        var t = _e(a);
        function a(e) {
          return r()(this, a), t.call(this, e);
        }
        return (
          c()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchProject(this.props.params.id);
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearProject();
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
                      f.a.createElement(C, { id: this.props.params.id })
                    ),
                    f.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      f.a.createElement(Fe, null)
                    )
                  ),
                  f.a.createElement(
                    g.a,
                    { className: "col-md-3 harmonica" },
                    f.a.createElement(v.a, null, f.a.createElement(Le.a, null))
                  )
                );
              }
            }
          ]),
          a
        );
      })(d.Component);
      t.default = Object(h.b)(null, function(e) {
        return {
          fetchProject: function(t) {
            e(Object(_.h)(t));
          },
          clearProject: function() {
            e(Object(_.c)());
          }
        };
      })(Me);
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        c = a.n(i),
        l = function(e) {
          var t = e.children,
            a = e.className,
            n = e.onMouseEnter,
            i = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: i
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
          className: c.a.string,
          onMouseEnter: c.a.func,
          onMouseLeave: c.a.func
        }),
        (t.a = l);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        c = a.n(i),
        l = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (l.defaultProps = { className: "" }),
        (l.propTypes = { className: c.a.string }),
        (t.a = l);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        c = a.n(i),
        l = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            i = e.size,
            c = e.id,
            l = e.placeholder,
            o = e.name,
            s = e.value,
            u = e.onClickAction,
            p = e.onChangeAction,
            m = e.onBlurAction,
            d = e.required,
            f = e.readOnly,
            h = e.maxLength,
            E = e.error,
            g = e.min,
            v = e.max,
            y = e.step,
            b = e.errorMessage,
            P = e.divSize,
            j = e.divClassName,
            C = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(P, " ").concat(j) },
            r.a.createElement(
              "label",
              { htmlFor: c, className: "col-sm-6 ".concat(d) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(i) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (E ? "has-error" : ""),
                id: c,
                placeholder: l,
                name: o,
                value: s,
                onClick: u,
                onChange: p,
                onBlur: m,
                readOnly: f,
                maxLength: h,
                min: g,
                max: v,
                autoComplete: C,
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
                  b
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
        (t.a = l);
    },
    695: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(4),
        c = a(8),
        l = a.n(c),
        o = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            c = e.value,
            l = e.link,
            o = e.hidden;
          return l.length > 0
            ? r.a.createElement(
                "div",
                { className: a, style: o ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement(
                  "div",
                  { className: "col-sm-6", id: n, onClick: null },
                  r.a.createElement(
                    i.b,
                    { to: l, className: "link-underline" },
                    c
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: a, style: o ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement("div", { className: "col-sm-6", id: n }, c)
              );
        };
      (o.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (o.propTypes = {
          label: l.a.oneOfType([l.a.string, l.a.object]).isRequired,
          className: l.a.string,
          id: l.a.string,
          value: l.a.oneOfType([l.a.string, l.a.number]),
          link: l.a.string,
          hidden: l.a.bool
        }),
        (t.a = o);
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
    726: function(e, t, a) {
      "use strict";
      a.d(t, "h", function() {
        return n;
      }),
        a.d(t, "e", function() {
          return r;
        }),
        a.d(t, "c", function() {
          return i;
        }),
        a.d(t, "k", function() {
          return c;
        }),
        a.d(t, "n", function() {
          return l;
        }),
        a.d(t, "g", function() {
          return o;
        }),
        a.d(t, "i", function() {
          return s;
        }),
        a.d(t, "m", function() {
          return u;
        }),
        a.d(t, "j", function() {
          return p;
        }),
        a.d(t, "b", function() {
          return m;
        }),
        a.d(t, "l", function() {
          return d;
        }),
        a.d(t, "a", function() {
          return f;
        }),
        a.d(t, "d", function() {
          return h;
        }),
        a.d(t, "f", function() {
          return E;
        });
      var n = function(e) {
          return { type: "FETCH_PROJECT", id: e };
        },
        r = function(e) {
          return { type: "DELETE_PROJECT", id: e };
        },
        i = function() {
          return { type: "CLEAR_PROJECT" };
        },
        c = function(e) {
          return { type: "NEW_VALUE_COURSE", valueCourse: e };
        },
        l = function(e) {
          return { type: "UPDATE_VALUE_COURSE", valueCourse: e };
        },
        o = function(e) {
          return { type: "DELETE_VALUE_COURSE", id: e };
        },
        s = function(e) {
          return { type: "FETCH_PROJECT_REVENUE", id: e };
        },
        u = function(e) {
          return { type: "PROJECT_REVENUE_PREVIEW_REPORT", data: e };
        },
        p = function(e) {
          return { type: "PROJECT_REVENUE_GET_DISTRIBUTION", data: e };
        },
        m = function() {
          return { type: "CLEAR_PROJECT_REVENUE_PREVIEW_REPORT" };
        },
        d = function(e) {
          return { type: "PROJECT_PARTICIPANT_PREVIEW_REPORT", data: e };
        },
        f = function() {
          return { type: "CLEAR_PROJECT_PARTICIPANT_PREVIEW_REPORT" };
        },
        h = function() {
          return { type: "CLEAR_PROJECT_REVENUE" };
        },
        E = function(e) {
          return { type: "DELETE_REVENUE", id: e };
        };
    },
    837: function(e, t, a) {
      "use strict";
      a.d(t, "i", function() {
        return n;
      }),
        a.d(t, "f", function() {
          return r;
        }),
        a.d(t, "j", function() {
          return i;
        }),
        a.d(t, "c", function() {
          return c;
        }),
        a.d(t, "l", function() {
          return l;
        }),
        a.d(t, "e", function() {
          return o;
        }),
        a.d(t, "d", function() {
          return s;
        }),
        a.d(t, "k", function() {
          return u;
        }),
        a.d(t, "b", function() {
          return p;
        }),
        a.d(t, "g", function() {
          return m;
        }),
        a.d(t, "h", function() {
          return d;
        }),
        a.d(t, "m", function() {
          return f;
        }),
        a.d(t, "a", function() {
          return h;
        });
      var n = function(e) {
          return { type: "SET_FILTER_PROJECT_PARTICIPANT_ID", id: e };
        },
        r = function(e) {
          return {
            type: "SET_FILTER_PARTICIPANT_PROJECT_CONTACT_TYPE",
            contactType: e
          };
        },
        i = function(e) {
          return { type: "SET_FILTER_PARTICIPANT_PROJECT_NAME", name: e };
        },
        c = function(e) {
          return { type: "SET_FILTER_PARTICIPANT_PROJECT_ADDRESS", address: e };
        },
        l = function(e) {
          return {
            type: "SET_FILTER_PARTICIPANT_PROJECT_POSTAL_CODE",
            postalCode: e
          };
        },
        o = function(e) {
          return { type: "SET_FILTER_PARTICIPANT_PROJECT_CITY", city: e };
        },
        s = function(e) {
          return {
            type: "SET_FILTER_PARTICIPANT_PROJECT_AMOUNT_DEFINITIVE",
            amountDefinitive: e
          };
        },
        u = function(e) {
          return {
            type: "SET_FILTER_PARTICIPANT_PROJECT_PARTICIPATIONS_DEFINITIVE",
            participationsDefinitive: e
          };
        },
        p = function(e) {
          return {
            type: "SET_FILTER_PARTICIPANT_MUTATION_STATUS_ID",
            participantMutationStatusId: e
          };
        },
        m = function(e) {
          return {
            type: "SET_FILTER_PARTICIPANT_PROJECT_DATE_REGISTER",
            dateRegister: e
          };
        },
        d = function(e) {
          return {
            type: "SET_FILTER_PARTICIPANT_PROJECT_ENERGY_SUPPLIER_ID",
            energySupplierId: e
          };
        },
        f = function(e) {
          return { type: "SET_FILTER_PARTICIPANT_PROJECT_ID", projectId: e };
        },
        h = function() {
          return { type: "CLEAR_FILTER_PARTICIPANTS_PROJECT" };
        };
    },
    944: function(e, t, a) {
      "use strict";
      a.d(t, "b", function() {
        return n;
      }),
        a.d(t, "a", function() {
          return r;
        });
      var n = function(e, t, a, n, r, i) {
          return {
            type: "FETCH_PARTICIPANTS_PROJECT",
            filters: e,
            extraFilters: t,
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
    945: function(e, t, a) {
      "use strict";
      a.d(t, "a", function() {
        return n;
      });
      var n = function(e) {
        return { type: "SET_PARTICIPANTS_PROJECTS_PAGINATION", pagination: e };
      };
    },
    946: function(e, t, a) {
      "use strict";
      a.d(t, "a", function() {
        return n;
      });
      var n = function(e, t) {
        return {
          type: "SET_PARTICIPANTS_PROJECT_SORTS_FILTER",
          field: e,
          order: t
        };
      };
    },
    986: function(e, t, a) {
      "use strict";
      var n = a(24),
        r = a.n(n),
        i = a(25),
        c = a.n(i),
        l = a(22),
        o = a.n(l),
        s = a(26),
        u = a.n(s),
        p = a(27),
        m = a.n(p),
        d = a(16),
        f = a.n(d),
        h = a(6),
        E = a.n(h),
        g = a(0),
        v = a.n(g),
        y = a(4),
        b = a(32),
        P = a(690),
        j = a(691),
        C = a(7),
        T = a.n(C);
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return m()(this, a);
        };
      }
      var N = (function(e) {
          u()(a, e);
          var t = k(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(o()(n), "openItem", function(e) {
                y.f.push("/taak/".concat(e));
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
                  return v.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      v.a.createElement("div", null, "Geen taken gevonden."),
                    "" != t &&
                      v.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        v.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return v.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: a
                              },
                              v.a.createElement(
                                "td",
                                { className: "col-xs-12 clickable" },
                                T()(t.createdAt).format("L"),
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
        })(g.Component),
        R = Object(b.b)(function(e) {
          return { relatedTasks: e.projectDetails.relatedTasks };
        })(N),
        w = Object(b.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showTasksList,
            n = e.taskCount,
            r = e.newTask,
            i = e.permissions;
          return v.a.createElement(
            P.a,
            { className: "harmonica-button" },
            v.a.createElement(
              j.a,
              null,
              v.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                v.a.createElement(
                  "span",
                  { className: "" },
                  "OPEN TAKEN ",
                  v.a.createElement("span", { className: "badge" }, n)
                )
              ),
              v.a.createElement(
                "div",
                { className: "col-sm-2" },
                i.manageTask &&
                  v.a.createElement(
                    "a",
                    { role: "button", className: "pull-right", onClick: r },
                    v.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white"
                    })
                  )
              ),
              v.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && v.a.createElement(R, null)
              )
            )
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
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return m()(this, a);
        };
      }
      var I = (function(e) {
          u()(a, e);
          var t = S(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(o()(n), "openItem", function(e) {
                y.f.push("/document/".concat(e));
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
                  return v.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      v.a.createElement(
                        "div",
                        null,
                        "Geen documenten gevonden."
                      ),
                    "" != t &&
                      v.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        v.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return v.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: a
                              },
                              v.a.createElement(
                                "td",
                                { className: "col-xs-5 clickable" },
                                T()(t.createdAt).format("L")
                              ),
                              v.a.createElement(
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
        })(g.Component),
        O = Object(b.b)(function(e) {
          return { relatedDocuments: e.projectDetails.relatedDocuments };
        })(I),
        D = Object(b.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showDocumentsList,
            n = e.newDocument,
            r = e.documentCount,
            i = e.permissions;
          return v.a.createElement(
            P.a,
            { className: "harmonica-button" },
            v.a.createElement(
              j.a,
              null,
              v.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                v.a.createElement(
                  "span",
                  null,
                  "DOCUMENTEN ",
                  v.a.createElement("span", { className: "badge" }, r)
                )
              ),
              v.a.createElement(
                "div",
                { className: "col-sm-2" },
                i.createDocument &&
                  v.a.createElement(
                    "div",
                    { className: "pull-right" },
                    v.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white",
                      "data-toggle": "dropdown",
                      role: "button"
                    }),
                    v.a.createElement(
                      "ul",
                      { className: "dropdown-menu" },
                      v.a.createElement(
                        "li",
                        null,
                        v.a.createElement(
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
                      v.a.createElement(
                        "li",
                        null,
                        v.a.createElement(
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
              v.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && v.a.createElement(O, null)
              )
            )
          );
        });
      function x(e) {
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
          return m()(this, a);
        };
      }
      var A = (function(e) {
          u()(a, e);
          var t = x(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(o()(n), "openItem", function(e) {
                y.f.push("/email/".concat(e));
              }),
              (n.state = { relatedOpportunities: "" }),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedEmailsInbox;
                  return v.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      v.a.createElement("div", null, "Geen e-mails gevonden."),
                    "" != t &&
                      v.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        v.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return v.a.createElement(
                              "tr",
                              { key: a },
                              v.a.createElement(
                                "td",
                                {
                                  className: "col-xs-4 clickable",
                                  onClick: function() {
                                    return e.openItem(t.id);
                                  }
                                },
                                T()(t.date_sent).format("L")
                              ),
                              v.a.createElement(
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
        })(g.Component),
        F = Object(b.b)(function(e) {
          return { relatedEmailsInbox: e.projectDetails.relatedEmailsInbox };
        })(A),
        L = function(e) {
          var t = e.toggleShowList,
            a = e.showEmailsInboxList,
            n = e.newEmail,
            r = e.emailInboxCount;
          return v.a.createElement(
            P.a,
            { className: "harmonica-button" },
            v.a.createElement(
              j.a,
              null,
              v.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                v.a.createElement(
                  "span",
                  { onClick: t, role: "button", className: "" },
                  "E-MAIL INBOX ",
                  v.a.createElement("span", { className: "badge" }, r)
                )
              ),
              v.a.createElement(
                "div",
                { className: "col-sm-2" },
                v.a.createElement(
                  "a",
                  { role: "button", className: "pull-right", onClick: n },
                  v.a.createElement("span", {
                    className: "glyphicon glyphicon-plus glyphicon-white"
                  })
                )
              ),
              v.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && v.a.createElement(F, null)
              )
            )
          );
        };
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
          var a,
            n = f()(e);
          if (t) {
            var r = f()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return m()(this, a);
        };
      }
      var M = (function(e) {
          u()(a, e);
          var t = _(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(o()(n), "openItem", function(e) {
                y.f.push("/email/".concat(e));
              }),
              (n.state = { relatedOpportunities: "" }),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedEmailsSent;
                  return v.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      v.a.createElement("div", null, "Geen e-mails gevonden."),
                    "" != t &&
                      v.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        v.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return v.a.createElement(
                              "tr",
                              { key: a },
                              v.a.createElement(
                                "td",
                                {
                                  className: "col-xs-4 clickable",
                                  onClick: function() {
                                    return e.openItem(t.id);
                                  }
                                },
                                T()(t.date_sent).format("L")
                              ),
                              v.a.createElement(
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
        })(g.Component),
        U = Object(b.b)(function(e) {
          return { relatedEmailsSent: e.projectDetails.relatedEmailsSent };
        })(M),
        G = function(e) {
          var t = e.toggleShowList,
            a = e.showEmailsSentList,
            n = e.newEmail,
            r = e.emailSentCount;
          return v.a.createElement(
            P.a,
            { className: "harmonica-button" },
            v.a.createElement(
              j.a,
              null,
              v.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                v.a.createElement(
                  "span",
                  { onClick: t, className: "" },
                  "E-MAIL VERZONDEN ",
                  v.a.createElement("span", { className: "badge" }, r)
                )
              ),
              v.a.createElement(
                "div",
                { className: "col-sm-2" },
                v.a.createElement(
                  "a",
                  { role: "button", className: "pull-right", onClick: n },
                  v.a.createElement("span", {
                    className: "glyphicon glyphicon-plus glyphicon-white"
                  })
                )
              ),
              v.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && v.a.createElement(U, null)
              )
            )
          );
        };
      function J(e, t) {
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
      function V(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? J(Object(a), !0).forEach(function(t) {
                E()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : J(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
          return m()(this, a);
        };
      }
      var q = (function(e) {
        u()(a, e);
        var t = B(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            E()(o()(n), "newTask", function() {
              y.f.push("/taak/nieuw/project/".concat(n.props.project.id));
            }),
            E()(o()(n), "newDocument", function(e) {
              y.f.push(
                "/document/nieuw/"
                  .concat(e, "/project/")
                  .concat(n.props.project.id)
              );
            }),
            E()(o()(n), "newEmail", function() {
              y.f.push("/email/nieuw");
            }),
            (n.state = {
              toggleShowList: {
                tasks: !1,
                documents: !1,
                emailsInbox: !1,
                emailsSent: !1
              }
            }),
            (n.toggleShowList = n.toggleShowList.bind(o()(n))),
            n
          );
        }
        return (
          c()(a, [
            {
              key: "toggleShowList",
              value: function(e) {
                this.setState(
                  V(
                    V({}, this.state),
                    {},
                    {
                      toggleShowList: V(
                        V({}, this.state.toggleShowList),
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
                return v.a.createElement(
                  "div",
                  { className: "margin-10-top" },
                  v.a.createElement(w, {
                    toggleShowList: function() {
                      return e.toggleShowList("tasks");
                    },
                    showTasksList: this.state.toggleShowList.tasks,
                    taskCount: this.props.project.taskCount,
                    newTask: this.newTask
                  }),
                  v.a.createElement(D, {
                    toggleShowList: function() {
                      return e.toggleShowList("documents");
                    },
                    showDocumentsList: this.state.toggleShowList.documents,
                    newDocument: this.newDocument,
                    documentCount: this.props.project.documentCount
                  }),
                  v.a.createElement(L, {
                    toggleShowList: function() {
                      return e.toggleShowList("emailsInbox");
                    },
                    showEmailsInboxList: this.state.toggleShowList.emailsInbox,
                    newEmail: this.newEmail,
                    emailInboxCount: this.props.project.emailInboxCount
                  }),
                  v.a.createElement(G, {
                    toggleShowList: function() {
                      return e.toggleShowList("emailsSent");
                    },
                    showEmailsSentList: this.state.toggleShowList.emailsSent,
                    newEmail: this.newEmail,
                    emailSentCount: this.props.project.emailSentCount
                  })
                );
              }
            }
          ]),
          a
        );
      })(g.Component);
      t.a = Object(b.b)(function(e) {
        return { project: e.projectDetails };
      })(q);
    }
  }
]);
