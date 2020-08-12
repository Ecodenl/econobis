(window.webpackJsonp = window.webpackJsonp || []).push([
  [124],
  {
    1431: function(t, e, n) {
      "use strict";
      n.r(e);
      var a = n(24),
        r = n.n(a),
        o = n(25),
        s = n.n(o),
        c = n(22),
        i = n.n(c),
        l = n(26),
        u = n.n(l),
        p = n(27),
        d = n.n(p),
        h = n(16),
        m = n.n(h),
        f = n(6),
        E = n.n(f),
        y = n(0),
        C = n.n(y),
        g = n(32),
        b = n(14),
        v = n(198),
        S = n(7),
        T = n.n(S),
        A = function(t, e, n, a, r) {
          return {
            type: "FETCH_CONTACTS",
            filters: t,
            extraFilters: e,
            sorts: n,
            pagination: a,
            filterType: r
          };
        },
        N = function() {
          return { type: "CLEAR_CONTACTS" };
        },
        w = function(t) {
          return { type: "SET_CHECKED_CONTACT_ALL", checkedValue: t };
        },
        F = function(t) {
          return { type: "SET_NUMBER_FILTER", number: t };
        },
        D = function(t) {
          return { type: "SET_TYPE_FILTER", typeId: t };
        },
        k = function(t) {
          return { type: "SET_FULL_NAME_FILTER", fullName: t };
        },
        O = function(t) {
          return { type: "SET_STREET_AND_NUMBER_FILTER", streetAndNumber: t };
        },
        x = function(t) {
          return { type: "SET_POSTAL_CODE_FILTER", postalCode: t };
        },
        R = function(t) {
          return { type: "SET_CITY_FILTER", city: t };
        },
        _ = function(t) {
          return { type: "SET_EMAIL_ADDRESS_FILTER", emailAddress: t };
        },
        P = function(t) {
          return { type: "SET_PHONE_NUMBER_FILTER", phoneNumber: t };
        },
        I = function(t) {
          return { type: "SET_STATUS_FILTER", statusId: t };
        },
        L = function(t) {
          return { type: "SET_CREATED_AT_FILTER", createdAt: t };
        },
        G = function() {
          return { type: "CLEAR_FILTER_CONTACTS" };
        },
        j = function(t) {
          return { type: "SET_CONTACTS_PAGINATION", pagination: t };
        },
        M = n(727),
        U = n(199),
        V = n.n(U),
        H = n(146),
        B = n(147),
        Y = n(200),
        W = n(721),
        q = Object(g.b)(null, function(t) {
          return {
            setContactsSortsFilter: function(e, n) {
              t(
                (function(t, e) {
                  return {
                    type: "SET_CONTACTS_SORTS_FILTER",
                    field: t,
                    order: e
                  };
                })(e, n)
              );
            }
          };
        })(function(t) {
          var e = function(e, n) {
            t.setContactsSortsFilter(e, n),
              setTimeout(function() {
                t.fetchContactsData();
              }, 100);
          };
          return C.a.createElement(
            "tr",
            { className: "thead-title" },
            t.showCheckbox ? C.a.createElement("th", { width: "3%" }) : null,
            C.a.createElement(W.a, {
              RowClassName: "hidden-xs",
              sortColumn: "number",
              title: "#",
              width: "5%",
              setSorts: e
            }),
            C.a.createElement(W.a, {
              RowClassName: "hidden-xs hidden-sm",
              sortColumn: "typeName",
              title: "Type",
              width: "7%",
              setSorts: e
            }),
            C.a.createElement(W.a, {
              sortColumn: "fullName",
              title: "Naam",
              width: "11%",
              setSorts: e
            }),
            C.a.createElement(W.a, {
              RowClassName: "hidden-xs",
              sortColumn: "streetAndNumber",
              title: "Adres",
              width: "12%",
              setSorts: e
            }),
            C.a.createElement(W.a, {
              RowClassName: "hidden-xs",
              sortColumn: "postalCode",
              title: "Postcode",
              width: "7%",
              setSorts: e
            }),
            C.a.createElement(W.a, {
              RowClassName: "hidden-xs",
              sortColumn: "city",
              title: "Plaats",
              width: "10%",
              setSorts: e
            }),
            C.a.createElement(W.a, {
              RowClassName: "hidden-xs",
              sortColumn: "emailAddress",
              title: "E-mail",
              width: "12%",
              setSorts: e
            }),
            C.a.createElement(W.a, {
              sortColumn: "phoneNumber",
              title: "Telefoon",
              width: "7%",
              setSorts: e
            }),
            C.a.createElement(W.a, {
              RowClassName: "hidden-xs hidden-sm",
              sortColumn: "createdAt",
              title: "Gemaakt op",
              width: "8%",
              setSorts: e
            }),
            C.a.createElement("th", { width: "3%" })
          );
        }),
        K = n(725),
        z = Object(g.b)(
          function(t) {
            return {
              filters: t.contacts.filters,
              contactStatuses: t.systemData.contactStatuses,
              contactTypes: t.systemData.contactTypes
            };
          },
          function(t) {
            return Object(b.b)(
              {
                setNumberFilter: F,
                setTypeFilter: D,
                setFullNameFilter: k,
                setStreetAndNumberFilter: O,
                setPostalCodeFilter: x,
                setCityFilter: R,
                setEmailAddressFilter: _,
                setPhoneNumberFilter: P,
                setStatusFilter: I,
                setCreatedAtFilter: L
              },
              t
            );
          }
        )(function(t) {
          return C.a.createElement(
            "tr",
            { className: "thead-filter" },
            t.showCheckbox &&
              C.a.createElement(
                "td",
                null,
                C.a.createElement("input", {
                  type: "checkbox",
                  value: t.checkedAllCheckboxes,
                  onChange: t.selectAllCheckboxes
                })
              ),
            C.a.createElement(
              "th",
              { className: "hidden-xs" },
              C.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: t.filters.number.data,
                onChange: function(e) {
                  t.setNumberFilter(e.target.value);
                }
              })
            ),
            C.a.createElement(
              "th",
              { className: "hidden-xs hidden-sm" },
              C.a.createElement(
                "select",
                {
                  className: "form-control input-sm",
                  value: t.filters.typeId.data,
                  onChange: function(e) {
                    t.setTypeFilter(e.target.value),
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
              C.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: t.filters.fullName.data,
                onChange: function(e) {
                  t.setFullNameFilter(e.target.value);
                }
              })
            ),
            C.a.createElement(
              "th",
              { className: "hidden-xs" },
              C.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: t.filters.streetAndNumber.data,
                onChange: function(e) {
                  t.setStreetAndNumberFilter(e.target.value);
                }
              })
            ),
            C.a.createElement(
              "th",
              { className: "hidden-xs" },
              C.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: t.filters.postalCode.data,
                onChange: function(e) {
                  t.setPostalCodeFilter(e.target.value);
                }
              })
            ),
            C.a.createElement(
              "th",
              { className: "hidden-xs" },
              C.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: t.filters.city.data,
                onChange: function(e) {
                  t.setCityFilter(e.target.value);
                }
              })
            ),
            C.a.createElement(
              "th",
              { className: "hidden-xs" },
              C.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: t.filters.emailAddress.data,
                onChange: function(e) {
                  t.setEmailAddressFilter(e.target.value);
                }
              })
            ),
            C.a.createElement(
              "th",
              null,
              C.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: t.filters.phoneNumber.data,
                onChange: function(e) {
                  t.setPhoneNumberFilter(e.target.value);
                }
              })
            ),
            C.a.createElement(K.a, {
              value: t.filters.createdAt.data && t.filters.createdAt.data,
              onChangeAction: function(e) {
                void 0 === e
                  ? t.setCreatedAtFilter("")
                  : t.setCreatedAtFilter(T()(e).format("Y-MM-DD"));
              }
            }),
            C.a.createElement("th", null)
          );
        }),
        J = n(4);
      function Z(t) {
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
          var n,
            a = m()(t);
          if (e) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return d()(this, n);
        };
      }
      var Q = (function(t) {
        u()(n, t);
        var e = Z(n);
        function n(t) {
          var a;
          return (
            r()(this, n),
            ((a = e.call(this, t)).state = {
              showActionButtons: !1,
              highlightRow: ""
            }),
            a
          );
        }
        return (
          s()(n, [
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
              key: "setCheckedContact",
              value: function(t) {
                this.props.setCheckedContact(t);
              }
            },
            {
              key: "openItem",
              value: function(t) {
                J.f.push("/contact/".concat(t));
              }
            },
            {
              key: "render",
              value: function() {
                var t = this,
                  e = this.props,
                  n = e.checked,
                  a = e.id,
                  r = e.number,
                  o = e.typeName,
                  s = e.fullName,
                  c = e.streetAndNumber,
                  i = e.postalCode,
                  l = e.city,
                  u = e.emailAddress,
                  p = e.phoneNumber,
                  d = (e.statusName, e.createdAt);
                return C.a.createElement(
                  "tr",
                  {
                    className: this.state.highlightRow,
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
                  this.props.showCheckbox &&
                    C.a.createElement(
                      "td",
                      null,
                      C.a.createElement("input", {
                        type: "checkbox",
                        checked: n,
                        onChange: function() {
                          return t.setCheckedContact(a);
                        }
                      })
                    ),
                  C.a.createElement("td", { className: "hidden-xs" }, r),
                  C.a.createElement(
                    "td",
                    { className: "hidden-xs hidden-sm" },
                    o,
                    " "
                  ),
                  C.a.createElement("td", null, s),
                  C.a.createElement("td", { className: "hidden-xs" }, c),
                  C.a.createElement("td", { className: "hidden-xs" }, i),
                  C.a.createElement("td", { className: "hidden-xs" }, l),
                  C.a.createElement("td", { className: "hidden-xs" }, u),
                  C.a.createElement("td", null, p),
                  C.a.createElement(
                    "td",
                    { className: "hidden-xs hidden-sm" },
                    T()(d).format("DD-MM-Y")
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
                      : "",
                    this.state.showActionButtons
                      ? C.a.createElement(
                          "a",
                          {
                            role: "button",
                            onClick: this.props.showDeleteItemModal.bind(
                              this,
                              a,
                              s
                            )
                          },
                          C.a.createElement("span", {
                            className: "glyphicon glyphicon-trash mybtn-danger"
                          }),
                          " "
                        )
                      : ""
                  )
                );
              }
            }
          ]),
          n
        );
      })(y.Component);
      var X = Object(g.b)(
          function(t) {
            return { statuses: t.statuses, types: t.types };
          },
          function(t) {
            return {
              setCheckedContact: function(e) {
                t(
                  (function(t) {
                    return { type: "SET_CHECKED_CONTACT", id: t };
                  })(e)
                );
              }
            };
          }
        )(Q),
        $ = n(100),
        tt = Object(g.b)(null, function(t) {
          return {
            deleteContact: function(e) {
              t(
                (function(t) {
                  return { type: "DELETE_CONTACT", id: t };
                })(e)
              );
            }
          };
        })(function(t) {
          return C.a.createElement(
            $.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: t.closeDeleteItemModal,
              confirmAction: function() {
                return t.deleteContact(t.id), void t.closeDeleteItemModal();
              },
              title: "Verwijderen"
            },
            "Verwijder contact: ",
            C.a.createElement("strong", null, " ", t.fullName, " ")
          );
        }),
        et = n(712);
      n(716);
      function nt(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(t);
          e &&
            (a = a.filter(function(e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            n.push.apply(n, a);
        }
        return n;
      }
      function at(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? nt(Object(n), !0).forEach(function(e) {
                E()(t, e, n[e]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
            : nt(Object(n)).forEach(function(e) {
                Object.defineProperty(
                  t,
                  e,
                  Object.getOwnPropertyDescriptor(n, e)
                );
              });
        }
        return t;
      }
      function rt(t) {
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
          var n,
            a = m()(t);
          if (e) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return d()(this, n);
        };
      }
      var ot = (function(t) {
          u()(n, t);
          var e = rt(n);
          function n(t) {
            var a;
            return (
              r()(this, n),
              (a = e.call(this, t)),
              E()(i()(a), "handleKeyUp", function(t) {
                13 === t.keyCode && a.props.onSubmitFilter();
              }),
              E()(i()(a), "showDeleteItemModal", function(t, e) {
                a.setState(
                  at(
                    at({}, a.state),
                    {},
                    {
                      showDeleteItem: !0,
                      deleteItem: at(
                        at({}, a.state.deleteItem),
                        {},
                        { id: t, fullName: e }
                      )
                    }
                  )
                );
              }),
              E()(i()(a), "closeDeleteItemModal", function() {
                a.setState(
                  at(
                    at({}, a.state),
                    {},
                    {
                      showDeleteItem: !1,
                      deleteItem: at(
                        at({}, a.state.deleteItem),
                        {},
                        { id: "", fullName: "" }
                      )
                    }
                  )
                );
              }),
              (a.state = {
                showDeleteItem: !1,
                deleteItem: { id: "", fullName: "" }
              }),
              a
            );
          }
          return (
            s()(n, [
              {
                key: "render",
                value: function() {
                  var t = this,
                    e = this.props.contacts,
                    n = e.data,
                    a = void 0 === n ? [] : n,
                    r = e.meta,
                    o = void 0 === r ? {} : r,
                    s = "",
                    c = !0;
                  return (
                    this.props.hasError
                      ? (s = "Fout bij het ophalen van contacten.")
                      : this.props.isLoading
                      ? (s = "Gegevens aan het laden.")
                      : 0 === a.length
                      ? (s = "Geen contacten gevonden!")
                      : (c = !1),
                    C.a.createElement(
                      "div",
                      null,
                      C.a.createElement(
                        "form",
                        { onKeyUp: this.handleKeyUp },
                        C.a.createElement(
                          H.a,
                          null,
                          C.a.createElement(
                            B.a,
                            null,
                            C.a.createElement(q, {
                              showCheckbox: this.props.showCheckboxList,
                              fetchContactsData: function() {
                                return t.props.fetchContactsData();
                              }
                            }),
                            C.a.createElement(z, {
                              showCheckbox: this.props.showCheckboxList,
                              selectAllCheckboxes: function() {
                                return t.props.selectAllCheckboxes();
                              },
                              onSubmitFilter: this.props.onSubmitFilter
                            })
                          ),
                          C.a.createElement(
                            Y.a,
                            null,
                            c
                              ? C.a.createElement(
                                  "tr",
                                  null,
                                  C.a.createElement("td", { colSpan: 10 }, s)
                                )
                              : a.map(function(e) {
                                  return C.a.createElement(
                                    X,
                                    V()({ key: e.id }, e, {
                                      showCheckbox: t.props.showCheckboxList,
                                      checkedAllCheckboxes:
                                        t.props.checkedAllCheckboxes,
                                      showDeleteItemModal: t.showDeleteItemModal
                                    })
                                  );
                                })
                          )
                        ),
                        C.a.createElement(
                          "div",
                          { className: "col-md-6 col-md-offset-3" },
                          C.a.createElement(et.a, {
                            onPageChangeAction: this.props.handlePageClick,
                            totalRecords: o.total,
                            initialPage: this.props.contactsPagination.page
                          })
                        )
                      ),
                      this.state.showDeleteItem &&
                        C.a.createElement(
                          tt,
                          V()(
                            { closeDeleteItemModal: this.closeDeleteItemModal },
                            this.state.deleteItem
                          )
                        )
                    )
                  );
                }
              }
            ]),
            n
          );
        })(y.Component),
        st = Object(g.b)(function(t) {
          return {
            isLoading: t.loadingData.isLoading,
            hasError: t.loadingData.hasError
          };
        })(ot),
        ct = n(693),
        it = Object(g.b)(
          function(t) {
            return { contacts: t.contacts.list.data };
          },
          function(t) {
            return {
              deleteSelectedContacts: function(e) {
                t(
                  (function(t) {
                    return { type: "DELETE_SELECTED_CONTACTS", contactIds: t };
                  })(e)
                );
              }
            };
          }
        )(function(t) {
          var e = function() {
            var e = 0;
            return (
              t.contacts.map(function(t) {
                return !0 === t.checked && e++;
              }),
              e
            );
          };
          return C.a.createElement(
            $.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: t.toggleShowDeleteSelectedItems,
              confirmAction: function() {
                return (
                  (e = []),
                  t.contacts.map(function(t) {
                    return !0 === t.checked && e.push(t.id);
                  }),
                  t.deleteSelectedContacts(e),
                  void t.toggleShowDeleteSelectedItems()
                );
                var e;
              },
              title: "Verwijderen"
            },
            0 !== e()
              ? C.a.createElement(
                  "div",
                  null,
                  "Verwijder de geselecteerde ",
                  C.a.createElement("strong", null, e()),
                  " contacten?"
                )
              : C.a.createElement("div", null, "Geen contacten geselecteerd.")
          );
        }),
        lt = n(774),
        ut = n(54),
        pt = n(696);
      function dt(t) {
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
          var n,
            a = m()(t);
          if (e) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return d()(this, n);
        };
      }
      var ht = (function(t) {
          u()(n, t);
          var e = dt(n);
          function n(t) {
            var a;
            return (
              r()(this, n),
              (a = e.call(this, t)),
              E()(i()(a), "handleInputChange", function(t) {
                var e = t.target,
                  n = "checkbox" === e.type ? e.checked : e.value,
                  r = e.name;
                a.setState(E()({}, r, n));
              }),
              E()(i()(a), "handleSubmit", function(t) {
                var e = [];
                a.props.contacts.map(function(t) {
                  return !0 === t.checked && e.push(t.id);
                }),
                  ut.a
                    .addManyContactsToGroup(e, a.state.groupId)
                    .then(function(t) {
                      a.props.toggleAddGroup(),
                        J.f.push(
                          "/contacten-in-groep/".concat(a.state.groupId)
                        );
                    });
              }),
              (a.state = {
                contactGroups: [],
                groupId: "",
                contactCount: 0,
                contactIds: "",
                errors: { groupId: !1 }
              }),
              a
            );
          }
          return (
            s()(n, [
              {
                key: "componentDidMount",
                value: function() {
                  var t = this;
                  ut.a.peekStaticContactGroups().then(function(e) {
                    t.setState({ contactGroups: e });
                  });
                  var e = 0;
                  this.props.contacts.map(function(t) {
                    return !0 === t.checked && e++;
                  }),
                    this.setState({ contactCount: e });
                }
              },
              {
                key: "render",
                value: function() {
                  return C.a.createElement(
                    $.a,
                    {
                      buttonConfirmText: "Toevoegen",
                      closeModal: this.props.toggleAddGroup,
                      confirmAction: this.handleSubmit,
                      title: "Contacten toevoegen aan groep"
                    },
                    0 !== this.state.contactCount
                      ? C.a.createElement(
                          "div",
                          { className: "row" },
                          C.a.createElement(pt.a, {
                            size: "col-md-12",
                            label: "Voeg ".concat(
                              this.state.contactCount,
                              " contact(en) toe aan groep:"
                            ),
                            name: "groupId",
                            options: this.state.contactGroups,
                            value: this.state.groupId,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.groupId
                          })
                        )
                      : C.a.createElement(
                          "div",
                          null,
                          "Geen contacten geselecteerd."
                        )
                  );
                }
              }
            ]),
            n
          );
        })(y.Component),
        mt = Object(g.b)(
          function(t) {
            return {
              contactDetails: t.contactDetails,
              contacts: t.contacts.list.data
            };
          },
          function(t) {
            return {
              addContactToGroup: function(e) {
                t(Object(lt.a)(e));
              }
            };
          }
        )(ht);
      function ft(t) {
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
          var n,
            a = m()(t);
          if (e) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return d()(this, n);
        };
      }
      var Et = (function(t) {
          u()(n, t);
          var e = ft(n);
          function n(t) {
            var a;
            return (
              r()(this, n),
              (a = e.call(this, t)),
              E()(i()(a), "toggleShowDeleteSelectedItems", function() {
                a.setState({
                  showDeleteSelectedItems: !a.state.showDeleteSelectedItems
                });
              }),
              E()(i()(a), "toggleAddContactsToGroup", function() {
                a.setState({
                  showAddContactsToGroup: !a.state.showAddContactsToGroup
                });
              }),
              E()(i()(a), "newContact", function() {
                J.f.push("/contact/nieuw");
              }),
              E()(i()(a), "importContacts", function() {
                J.f.push("/contact/import");
              }),
              (a.state = {
                showDeleteSelectedItems: !1,
                showAddContactsToGroup: !1
              }),
              a
            );
          }
          return (
            s()(n, [
              {
                key: "render",
                value: function() {
                  var t = this.props.meDetails.permissions,
                    e = void 0 === t ? {} : t,
                    n = this.props.contacts.meta,
                    a = void 0 === n ? {} : n;
                  return C.a.createElement(
                    "div",
                    { className: "row" },
                    C.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      C.a.createElement(
                        "div",
                        { className: "btn-group", role: "group" },
                        C.a.createElement(ct.a, {
                          iconName: "glyphicon-refresh",
                          onClickAction: this.props.resetContactFilters
                        }),
                        C.a.createElement(
                          "div",
                          {
                            className: "nav navbar-nav btn-group",
                            role: "group"
                          },
                          C.a.createElement(
                            "button",
                            {
                              className: "btn btn-success btn-sm",
                              "data-toggle": "dropdown"
                            },
                            C.a.createElement("span", {
                              className: "glyphicon glyphicon-plus"
                            })
                          ),
                          C.a.createElement(
                            "ul",
                            { className: "dropdown-menu" },
                            e.createPerson &&
                              C.a.createElement(
                                "li",
                                null,
                                C.a.createElement(
                                  J.b,
                                  { to: "contact/nieuw/persoon" },
                                  "Persoon"
                                )
                              ),
                            e.createOrganisation &&
                              C.a.createElement(
                                "li",
                                null,
                                C.a.createElement(
                                  J.b,
                                  { to: "contact/nieuw/organisatie" },
                                  "Organisatie"
                                )
                              ),
                            e.manageGroup &&
                              C.a.createElement(
                                "li",
                                null,
                                C.a.createElement(
                                  J.b,
                                  {
                                    role: "button",
                                    onClick: this.props.toggleSaveAsGroup
                                  },
                                  "Groep"
                                )
                              )
                          )
                        ),
                        e.updatePerson &&
                          e.updateOrganisation &&
                          C.a.createElement(
                            "div",
                            {
                              className: "nav navbar-nav btn-group",
                              role: "group"
                            },
                            C.a.createElement(
                              "button",
                              {
                                className: "btn btn-success btn-sm",
                                "data-toggle": "dropdown"
                              },
                              C.a.createElement("span", {
                                className: "glyphicon glyphicon-share-alt"
                              })
                            ),
                            C.a.createElement(
                              "ul",
                              { className: "dropdown-menu" },
                              C.a.createElement(
                                "li",
                                null,
                                C.a.createElement(
                                  "a",
                                  {
                                    role: "button",
                                    onClick: this.toggleAddContactsToGroup
                                  },
                                  "Voeg toe aan groep"
                                )
                              )
                            )
                          ),
                        C.a.createElement(ct.a, {
                          iconName: "glyphicon-trash",
                          onClickAction: this.toggleShowDeleteSelectedItems
                        }),
                        C.a.createElement(ct.a, {
                          iconName: "glyphicon-ok",
                          onClickAction: this.props.toggleShowCheckboxList
                        }),
                        C.a.createElement(ct.a, {
                          iconName: "glyphicon-filter",
                          onClickAction: this.props.toggleShowExtraFilters
                        }),
                        C.a.createElement(ct.a, {
                          iconName: "glyphicon-download-alt",
                          onClickAction: this.props.getCSV
                        }),
                        e.import &&
                          C.a.createElement(ct.a, {
                            iconName: "glyphicon-import",
                            onClickAction: this.importContacts
                          })
                      )
                    ),
                    C.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      C.a.createElement(
                        "h3",
                        { className: "text-center table-title" },
                        "Contacten"
                      )
                    ),
                    C.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      C.a.createElement(
                        "div",
                        { className: "pull-right" },
                        "Resultaten: ",
                        a.total || 0
                      )
                    ),
                    this.state.showDeleteSelectedItems &&
                      C.a.createElement(it, {
                        toggleShowDeleteSelectedItems: this
                          .toggleShowDeleteSelectedItems
                      }),
                    this.state.showAddContactsToGroup &&
                      C.a.createElement(mt, {
                        toggleAddGroup: this.toggleAddContactsToGroup
                      })
                  );
                }
              }
            ]),
            n
          );
        })(y.Component),
        yt = Object(g.b)(function(t) {
          return { meDetails: t.meDetails, contacts: t.contacts.list };
        }, null)(Et),
        Ct = n(722),
        gt = n(102),
        bt = n(711),
        vt = n.n(bt),
        St = function(t) {
          return C.a.createElement(
            $.a,
            {
              buttonConfirmText: "Aanmaken",
              buttonClassName: "btn-success",
              closeModal: t.closeDeleteItemModal,
              confirmAction: function() {
                t.saveAsGroup();
              },
              title: "Groep aanmaken"
            },
            "Wilt u een groep aanmaken op basis van de huidige filters?"
          );
        },
        Tt = n(985),
        At = n(692);
      function Nt(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(t);
          e &&
            (a = a.filter(function(e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            n.push.apply(n, a);
        }
        return n;
      }
      function wt(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? Nt(Object(n), !0).forEach(function(e) {
                E()(t, e, n[e]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
            : Nt(Object(n)).forEach(function(e) {
                Object.defineProperty(
                  t,
                  e,
                  Object.getOwnPropertyDescriptor(n, e)
                );
              });
        }
        return t;
      }
      function Ft(t) {
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
          var n,
            a = m()(t);
          if (e) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return d()(this, n);
        };
      }
      var Dt = (function(t) {
          u()(n, t);
          var e = Ft(n);
          function n(t) {
            var a;
            return (
              r()(this, n),
              ((a = e.call(this, t)).state = {
                filterType: t.filterType,
                contactType: t.contactType,
                amountOfFilters: t.amountOfFilters,
                filters: t.extraFilters,
                yesNoOptions: [
                  { id: 0, name: "Nee" },
                  { id: 1, name: "Ja" }
                ]
              }),
              (a.closeModal = a.closeModal.bind(i()(a))),
              (a.confirmAction = a.confirmAction.bind(i()(a))),
              (a.handleFilterFieldChange = a.handleFilterFieldChange.bind(
                i()(a)
              )),
              (a.handleFilterTypeChange = a.handleFilterTypeChange.bind(
                i()(a)
              )),
              (a.handleFilterValueChange = a.handleFilterValueChange.bind(
                i()(a)
              )),
              (a.addFilterRow = a.addFilterRow.bind(i()(a))),
              (a.deleteFilterRow = a.deleteFilterRow.bind(i()(a))),
              a
            );
          }
          return (
            s()(n, [
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
                  var n = this.state.filters,
                    a = this.state.amountOfFilters;
                  "product" === n[e].field &&
                    (delete (n = n.filter(function(t) {
                      return t.connectedTo !== n[e].connectName;
                    }))[e].connectName,
                    (a = n.length)),
                    "product" === t
                      ? ((n[e] = {
                          field: "product",
                          type: "eq",
                          data: "",
                          connectName: t + e
                        }),
                        n.splice(e + 1, 0, {
                          field: "dateStart",
                          type: "eq",
                          data: "",
                          connectedTo: t + e
                        }),
                        n.splice(e + 2, 0, {
                          field: "dateFinish",
                          type: "eq",
                          data: "",
                          connectedTo: t + e
                        }),
                        n.splice(e + 3, 0, {
                          field: "orderStatus",
                          type: "eq",
                          data: "",
                          connectedTo: t + e
                        }),
                        (a = n.length))
                      : ((n[e].field = t), (n[e].data = "")),
                    this.setState(
                      wt(
                        wt({}, this.state),
                        {},
                        { filters: n, amountOfFilters: a }
                      )
                    );
                }
              },
              {
                key: "handleFilterTypeChange",
                value: function(t) {
                  this.setState(wt(wt({}, this.state), {}, { filterType: t }));
                }
              },
              {
                key: "handleFilterValueChange",
                value: function(t, e, n) {
                  var a = this.state.filters;
                  (a[n][t] = e),
                    this.setState(wt(wt({}, this.state), {}, { filters: a }));
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
                      t.setState(wt(wt({}, t.state), {}, { filters: e }));
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
                  "product" === e[t].field &&
                    (e = e.filter(function(n) {
                      return n.connectedTo !== e[t].connectName;
                    })),
                    e.splice(t, 1),
                    this.setState(
                      wt(
                        wt({}, this.state),
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
                      name: { name: "Naam", type: "stringWithoutNull" },
                      postalCode: { name: "Postcode", type: "numberOrString" },
                      country: {
                        name: "Land",
                        type: "dropdown",
                        dropDownOptions: this.props.countries
                      },
                      createdAt: { name: "Gemaakt op", type: "date" },
                      currentObligations: {
                        name: "Huidig aantal obligaties",
                        type: "number"
                      },
                      currentParticipations: {
                        name: "Huidig aantal participaties",
                        type: "number"
                      },
                      currentPostalcodeLinkCapital: {
                        name: "Huidig aantal postcoderoos",
                        type: "number"
                      },
                      currentLoan: {
                        name: "Huidig bedrag lening",
                        type: "number"
                      },
                      staticContactGroup: {
                        name: "Statische groep",
                        type: "dropdownHas",
                        dropDownOptions: this.props.staticContactGroups
                      },
                      occupation: {
                        name: "Verbinding",
                        type: "dropdownRelations",
                        dropDownOptions: this.props.primaryOccupations
                      },
                      occupationPrimary: {
                        name: "Primaire verbinding",
                        type: "dropdownRelations",
                        dropDownOptions: this.props.primaryOccupations
                      },
                      opportunity: {
                        name: "Kans",
                        type: "dropdownHas",
                        dropDownOptions: this.props.measureCategories
                      },
                      product: {
                        name: "Product",
                        type: "dropdownHas",
                        dropDownOptions: this.props.products
                      },
                      dateOfBirth: { name: "Geboortedatum", type: "date" },
                      energySupplier: {
                        name: "Primaire Energie leverancier",
                        type: "dropdown",
                        dropDownOptions: this.props.energySuppliers
                      },
                      didAgreeAvg: {
                        name: "Akkoord privacybeleid",
                        type: "boolean",
                        dropDownOptions: this.state.yesNoOptions
                      },
                      portalUser: {
                        name: "Portal gebruiker actief",
                        type: "boolean",
                        dropDownOptions: this.state.yesNoOptions
                      }
                    },
                    n = {
                      dateStart: { name: "Begin datum", type: "date" },
                      dateFinish: { name: "Eind datum", type: "date" },
                      orderStatus: {
                        name: "Order status",
                        type: "dropdownHas",
                        dropDownOptions: this.props.orderStatuses
                      }
                    };
                  return C.a.createElement(
                    $.a,
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
                          : this.state.filters.map(function(a, r) {
                              return C.a.createElement(Tt.a, {
                                key: r,
                                filter: a,
                                filterNumber: r,
                                fields: wt(wt({}, e), n),
                                handleFilterFieldChange:
                                  t.handleFilterFieldChange,
                                deleteFilterRow: t.deleteFilterRow,
                                handleFilterValueChange:
                                  t.handleFilterValueChange,
                                contactType: t.state.contactType
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
                        C.a.createElement(At.a, {
                          buttonText: "Extra filter",
                          onClickAction: this.addFilterRow
                        })
                      )
                    )
                  );
                }
              }
            ]),
            n
          );
        })(y.Component),
        kt = Object(g.b)(function(t) {
          return {
            contactStatuses: t.systemData.contactStatuses,
            staticContactGroups: t.systemData.staticContactGroups,
            primaryOccupations: t.systemData.primaryOccupations,
            measureCategories: t.systemData.measureCategories,
            products: t.systemData.products,
            energySuppliers: t.systemData.energySuppliers,
            countries: t.systemData.countries,
            orderStatuses: t.systemData.orderStatuses
          };
        })(Dt);
      function Ot(t) {
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
          var n,
            a = m()(t);
          if (e) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return d()(this, n);
        };
      }
      T.a.locale("nl");
      var xt = (function(t) {
        u()(n, t);
        var e = Ot(n);
        function n(t) {
          var a;
          if (
            (r()(this, n),
            (a = e.call(this, t)),
            E()(i()(a), "fetchContactsData", function() {
              setTimeout(function() {
                var t = a.state.extraFilters,
                  e = Object(Ct.a)(a.props.contactsFilters),
                  n = a.props.contactsSorts,
                  r = { limit: 20, offset: a.props.contactsPagination.offset },
                  o = a.state.filterType;
                a.props.fetchContacts(e, t, n, r, o);
              }, 100);
            }),
            E()(i()(a), "saveAsGroup", function() {
              var t = a.state.extraFilters,
                e = Object(Ct.a)(a.props.contactsFilters),
                n = a.state.filterType;
              gt.a
                .saveAsGroup({ filters: e, extraFilters: t, filterType: n })
                .then(function(t) {
                  J.f.push("/contact-groep/".concat(t.data.data.id, "/edit"));
                });
            }),
            E()(i()(a), "toggleSaveAsGroup", function() {
              a.setState({ showSaveAsGroup: !a.state.showSaveAsGroup });
            }),
            E()(i()(a), "getCSV", function() {
              a.props.blockUI(),
                setTimeout(function() {
                  var t = a.state.extraFilters,
                    e = Object(Ct.a)(a.props.contactsFilters),
                    n = a.props.contactsSorts;
                  gt.a
                    .getCSV({ filters: e, extraFilters: t, sorts: n })
                    .then(function(t) {
                      vt()(
                        t.data,
                        "Contacten-" +
                          T()().format("YYYY-MM-DD HH:mm:ss") +
                          ".csv"
                      ),
                        a.props.unblockUI();
                    })
                    .catch(function(t) {
                      a.props.unblockUI();
                    });
                }, 100);
            }),
            E()(i()(a), "resetContactFilters", function() {
              a.props.clearFilterContacts(),
                a.setState({
                  filterType: "and",
                  amountOfFilters: 0,
                  extraFilters: []
                }),
                a.fetchContactsData();
            }),
            E()(i()(a), "toggleShowCheckboxList", function() {
              a.setState({ showCheckboxList: !a.state.showCheckboxList });
            }),
            E()(i()(a), "selectAllCheckboxes", function() {
              a.setState({
                checkedAllCheckboxes: !a.state.checkedAllCheckboxes
              }),
                a.props.setCheckedContactAll(!a.state.checkedAllCheckboxes);
            }),
            !Object(v.isEmpty)(t.params))
          )
            switch (t.params.filter) {
              case "type":
                a.props.clearFilterContacts(),
                  a.props.setTypeFilter(t.params.value);
            }
          return (
            (a.state = {
              showCheckboxList: !1,
              checkedAllCheckboxes: !1,
              showSaveAsGroup: !1,
              showExtraFilters: !1,
              filterType: "and",
              amountOfFilters: 0,
              extraFilters: []
            }),
            (a.handlePageClick = a.handlePageClick.bind(i()(a))),
            (a.handleExtraFiltersChange = a.handleExtraFiltersChange.bind(
              i()(a)
            )),
            (a.getCSV = a.getCSV.bind(i()(a))),
            (a.toggleShowExtraFilters = a.toggleShowExtraFilters.bind(i()(a))),
            a
          );
        }
        return (
          s()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.fetchContactsData();
              }
            },
            {
              key: "componentWillReceiveProps",
              value: function(t) {
                var e = this;
                if (this.props.params.value !== t.params.value) {
                  if (Object(v.isEmpty)(t.params))
                    this.props.clearFilterContacts();
                  else
                    switch (t.params.filter) {
                      case "type":
                        this.props.clearFilterContacts(),
                          this.props.setTypeFilter(t.params.value);
                    }
                  setTimeout(function() {
                    e.fetchContactsData();
                  }, 100);
                }
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearContacts();
              }
            },
            {
              key: "onSubmitFilter",
              value: function() {
                this.props.clearContacts(),
                  this.props.setContactsPagination({ page: 0, offset: 0 }),
                  this.fetchContactsData();
              }
            },
            {
              key: "handlePageClick",
              value: function(t) {
                var e = t.selected,
                  n = Math.ceil(20 * e);
                this.props.setContactsPagination({ page: e, offset: n }),
                  this.fetchContactsData();
              }
            },
            {
              key: "handleExtraFiltersChange",
              value: function(t, e, n) {
                var a = this;
                this.setState({
                  filterType: n,
                  amountOfFilters: t,
                  extraFilters: t
                }),
                  this.props.setContactsPagination({ page: 0, offset: 0 }),
                  setTimeout(function() {
                    a.fetchContactsData();
                  }, 100);
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
                var t = this;
                return C.a.createElement(
                  "div",
                  null,
                  C.a.createElement(
                    "div",
                    { className: "panel panel-default" },
                    C.a.createElement(
                      "div",
                      { className: "panel-body" },
                      C.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        C.a.createElement(yt, {
                          toggleShowCheckboxList: function() {
                            return t.toggleShowCheckboxList();
                          },
                          resetContactFilters: function() {
                            return t.resetContactFilters();
                          },
                          selectAllCheckboxes: function() {
                            return t.selectAllCheckboxes();
                          },
                          checkedAllCheckboxes: this.state.checkedAllCheckboxes,
                          getCSV: this.getCSV,
                          toggleSaveAsGroup: this.toggleSaveAsGroup,
                          saveAsGroup: this.saveAsGroup,
                          toggleShowExtraFilters: this.toggleShowExtraFilters
                        })
                      ),
                      C.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        C.a.createElement(st, {
                          contacts: this.props.contacts,
                          contactsPagination: this.props.contactsPagination,
                          showCheckboxList: this.state.showCheckboxList,
                          selectAllCheckboxes: function() {
                            return t.selectAllCheckboxes();
                          },
                          checkedAllCheckboxes: this.state.checkedAllCheckboxes,
                          onSubmitFilter: function() {
                            return t.onSubmitFilter();
                          },
                          fetchContactsData: function() {
                            return t.fetchContactsData();
                          },
                          handlePageClick: this.handlePageClick
                        })
                      )
                    )
                  ),
                  this.state.showSaveAsGroup &&
                    C.a.createElement(St, {
                      saveAsGroup: this.saveAsGroup,
                      closeDeleteItemModal: this.toggleSaveAsGroup
                    }),
                  this.state.showExtraFilters &&
                    C.a.createElement(kt, {
                      saveAsGroup: this.saveAsGroup,
                      filterType: this.state.filterType,
                      toggleShowExtraFilters: this.toggleShowExtraFilters,
                      handleExtraFiltersChange: this.handleExtraFiltersChange,
                      contactType: this.props.contactsFilters.typeId.data,
                      extraFilters: this.state.extraFilters,
                      amountOfFilters: this.state.amountOfFilters
                    })
                );
              }
            }
          ]),
          n
        );
      })(y.Component);
      e.default = Object(g.b)(
        function(t) {
          return {
            contacts: t.contacts.list,
            contactsFilters: t.contacts.filters,
            contactsSorts: t.contacts.sorts,
            contactsPagination: t.contacts.pagination
          };
        },
        function(t) {
          return Object(b.b)(
            {
              fetchContacts: A,
              clearContacts: N,
              setCheckedContactAll: w,
              setTypeFilter: D,
              clearFilterContacts: G,
              setContactsPagination: j,
              blockUI: M.a,
              unblockUI: M.b
            },
            t
          );
        }
      )(xt);
    },
    716: function(t, e, n) {
      "use strict";
      n.d(e, "h", function() {
        return a;
      }),
        n.d(e, "b", function() {
          return r;
        }),
        n.d(e, "v", function() {
          return o;
        }),
        n.d(e, "u", function() {
          return s;
        }),
        n.d(e, "x", function() {
          return c;
        }),
        n.d(e, "g", function() {
          return i;
        }),
        n.d(e, "i", function() {
          return l;
        }),
        n.d(e, "q", function() {
          return u;
        }),
        n.d(e, "a", function() {
          return p;
        }),
        n.d(e, "m", function() {
          return d;
        }),
        n.d(e, "w", function() {
          return h;
        }),
        n.d(e, "f", function() {
          return m;
        }),
        n.d(e, "k", function() {
          return f;
        }),
        n.d(e, "s", function() {
          return E;
        }),
        n.d(e, "d", function() {
          return y;
        }),
        n.d(e, "l", function() {
          return C;
        }),
        n.d(e, "t", function() {
          return g;
        }),
        n.d(e, "e", function() {
          return b;
        }),
        n.d(e, "n", function() {
          return v;
        }),
        n.d(e, "p", function() {
          return S;
        }),
        n.d(e, "o", function() {
          return T;
        }),
        n.d(e, "j", function() {
          return A;
        }),
        n.d(e, "r", function() {
          return N;
        }),
        n.d(e, "c", function() {
          return w;
        });
      var a = function(t) {
          return { type: "FETCH_CONTACT_DETAILS", payload: t };
        },
        r = function(t) {
          return { type: "DELETE_CONTACT", id: t };
        },
        o = function(t) {
          return { type: "UPDATE_PERSON", contactDetails: t };
        },
        s = function(t) {
          return { type: "UPDATE_ORGANISATION", contactDetails: t };
        },
        c = function(t) {
          return { type: "UPDATE_PORTAL_USER", portalUser: t };
        },
        i = function(t) {
          return { type: "DELETE_PORTAL_USER", id: t };
        },
        l = function(t) {
          return { type: "NEW_ADDRESS", address: t };
        },
        u = function(t) {
          return { type: "UPDATE_ADDRESS", address: t };
        },
        p = function(t) {
          return { type: "DELETE_ADDRESS", id: t };
        },
        d = function(t) {
          return { type: "NEW_PHONE_NUMBER", phoneNumber: t };
        },
        h = function(t) {
          return { type: "UPDATE_PHONE_NUMBER", phoneNumber: t };
        },
        m = function(t) {
          return { type: "DELETE_PHONE_NUMBER", id: t };
        },
        f = function(t) {
          return { type: "NEW_EMAIL_ADDRESS", emailAddress: t };
        },
        E = function(t) {
          return { type: "UPDATE_EMAIL_ADDRESS", emailAddress: t };
        },
        y = function(t) {
          return { type: "DELETE_EMAIL_ADDRESS", id: t };
        },
        C = function(t) {
          return { type: "NEW_CONTACT_NOTE", note: t };
        },
        g = function(t) {
          return { type: "UPDATE_CONTACT_NOTE", note: t };
        },
        b = function(t) {
          return { type: "DELETE_CONTACT_NOTE", id: t };
        },
        v = function() {
          return { type: "UNSET_PRIMARY_ADDRESSES" };
        },
        S = function() {
          return { type: "UNSET_PRIMARY_PHONE_NUMBERS" };
        },
        T = function() {
          return { type: "UNSET_PRIMARY_EMAIL_ADDRESSES" };
        },
        A = function(t) {
          return {
            type: "NEW_CONTACT_ENERGY_SUPPLIER",
            contactEnergySupplier: t
          };
        },
        N = function(t) {
          return {
            type: "UPDATE_CONTACT_ENERGY_SUPPLIER",
            contactEnergySupplier: t
          };
        },
        w = function(t) {
          return { type: "DELETE_CONTACT_ENERGY_SUPPLIER", id: t };
        };
    },
    774: function(t, e, n) {
      "use strict";
      n.d(e, "a", function() {
        return a;
      }),
        n.d(e, "d", function() {
          return r;
        }),
        n.d(e, "b", function() {
          return o;
        }),
        n.d(e, "c", function() {
          return s;
        });
      var a = function(t) {
          return { type: "ADD_CONTACT_TO_GROUP", contact: t };
        },
        r = function(t, e, n) {
          return {
            type: "FETCH_CONTACT_GROUPS",
            filters: t,
            sorts: e,
            pagination: n
          };
        },
        o = function() {
          return { type: "CLEAR_CONTACT_GROUPS" };
        },
        s = function(t, e) {
          return { type: "DELETE_CONTACT_GROUP", id: t, successAction: e };
        };
    }
  }
]);
