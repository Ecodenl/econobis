(window.webpackJsonp = window.webpackJsonp || []).push([
  [100],
  {
    1457: function(t, e, n) {
      "use strict";
      n.r(e);
      var o = n(24),
        a = n.n(o),
        r = n(25),
        c = n.n(r),
        s = n(22),
        i = n.n(s),
        l = n(26),
        u = n.n(l),
        p = n(27),
        d = n.n(p),
        m = n(16),
        f = n.n(m),
        h = n(6),
        g = n.n(h),
        b = n(0),
        v = n.n(b),
        y = n(32),
        E = n(14),
        C = function(t) {
          return { type: "FETCH_CONTACTS_IN_GROUP", contactGroup: t };
        },
        w = function() {
          return { type: "CLEAR_CONTACTS_IN_GROUP" };
        },
        I = n(802),
        N = n(199),
        G = n.n(N),
        D = n(146),
        O = n(147),
        R = n(200),
        T = n(101),
        A = function(t) {
          return v.a.createElement(
            "tr",
            { className: "thead-title-quaternary" },
            v.a.createElement(T.a, {
              RowClassName: "hidden-xs",
              title: "#",
              width: "3%"
            }),
            v.a.createElement(T.a, {
              RowClassName: "hidden-xs hidden-sm",
              title: "Type",
              width: "5%"
            }),
            v.a.createElement(T.a, {
              sortColumn: "fullName",
              title: "Naam",
              width: "11%"
            }),
            v.a.createElement(T.a, {
              RowClassName: "hidden-xs",
              title: "Adres",
              width: "12%"
            }),
            v.a.createElement(T.a, {
              RowClassName: "hidden-xs",
              title: "Postcode",
              width: "7%"
            }),
            v.a.createElement(T.a, {
              RowClassName: "hidden-xs",
              title: "Plaats",
              width: "10%"
            }),
            v.a.createElement(T.a, {
              RowClassName: "hidden-xs",
              title: "E-mail",
              width: "12%"
            }),
            v.a.createElement(T.a, {
              sortColumn: "phoneNumber",
              title: "Telefoon",
              width: "7%"
            }),
            v.a.createElement(T.a, {
              RowClassName: "hidden-xs hidden-sm",
              title: "Gemaakt op",
              width: "10%"
            }),
            v.a.createElement("th", { width: "3%" })
          );
        },
        k = n(4),
        S = n(7),
        P = n.n(S);
      function j(t) {
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
            o = f()(t);
          if (e) {
            var a = f()(this).constructor;
            n = Reflect.construct(o, arguments, a);
          } else n = o.apply(this, arguments);
          return d()(this, n);
        };
      }
      var M = (function(t) {
          u()(n, t);
          var e = j(n);
          function n(t) {
            var o;
            return (
              a()(this, n),
              ((o = e.call(this, t)).state = {
                showActionButtons: !1,
                highlightRow: ""
              }),
              o
            );
          }
          return (
            c()(n, [
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
                  k.f.push("/contact/".concat(t));
                }
              },
              {
                key: "render",
                value: function() {
                  var t = this,
                    e = this.props,
                    n = e.id,
                    o = e.number,
                    a = e.typeName,
                    r = e.fullName,
                    c = e.streetAndNumber,
                    s = e.postalCode,
                    i = e.city,
                    l = e.emailAddress,
                    u = e.phoneNumber,
                    p = e.createdAt,
                    d = e.permissions;
                  return v.a.createElement(
                    "tr",
                    {
                      className: this.state.highlightRow,
                      onDoubleClick: function() {
                        return t.openItem(n);
                      },
                      onMouseEnter: function() {
                        return t.onRowEnter();
                      },
                      onMouseLeave: function() {
                        return t.onRowLeave();
                      }
                    },
                    v.a.createElement("td", { className: "hidden-xs" }, o),
                    v.a.createElement(
                      "td",
                      { className: "hidden-xs hidden-sm" },
                      a,
                      " "
                    ),
                    v.a.createElement("td", null, r),
                    v.a.createElement("td", { className: "hidden-xs" }, c),
                    v.a.createElement("td", { className: "hidden-xs" }, s),
                    v.a.createElement("td", { className: "hidden-xs" }, i),
                    v.a.createElement("td", { className: "hidden-xs" }, l),
                    v.a.createElement("td", null, u),
                    v.a.createElement(
                      "td",
                      { className: "hidden-xs hidden-sm" },
                      P()(p).format("DD-MM-Y")
                    ),
                    v.a.createElement(
                      "td",
                      null,
                      this.state.showActionButtons
                        ? v.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return t.openItem(n);
                              }
                            },
                            v.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-pencil mybtn-success"
                            }),
                            " "
                          )
                        : "",
                      this.state.showActionButtons &&
                        d.updatePerson &&
                        d.updateOrganisation &&
                        this.props.contactGroupType &&
                        "static" === this.props.contactGroupType.id
                        ? v.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: this.props.showDeleteItemModal.bind(
                                this,
                                n,
                                r
                              )
                            },
                            v.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-trash mybtn-danger"
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
        })(b.Component),
        L = Object(y.b)(function(t) {
          return {
            permissions: t.meDetails.permissions,
            contactGroupType: t.contactGroupDetails.type
          };
        })(M),
        U = n(100),
        x = Object(y.b)(null, function(t) {
          return {
            deleteContactInGroup: function(e, n) {
              t(
                (function(t, e) {
                  return {
                    type: "DELETE_CONTACT_IN_GROUP",
                    contactGroup: t,
                    id: e
                  };
                })(e, n)
              );
            }
          };
        })(function(t) {
          return v.a.createElement(
            U.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: t.closeDeleteItemModal,
              confirmAction: function() {
                return (
                  t.deleteContactInGroup(t.groupId, t.id),
                  void t.closeDeleteItemModal()
                );
              },
              title: "Verwijderen"
            },
            "Verwijder contact uit groep: ",
            v.a.createElement("strong", null, " ", t.fullName, " ")
          );
        });
      function _(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(t);
          e &&
            (o = o.filter(function(e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            n.push.apply(n, o);
        }
        return n;
      }
      function B(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? _(Object(n), !0).forEach(function(e) {
                g()(t, e, n[e]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
            : _(Object(n)).forEach(function(e) {
                Object.defineProperty(
                  t,
                  e,
                  Object.getOwnPropertyDescriptor(n, e)
                );
              });
        }
        return t;
      }
      function z(t) {
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
            o = f()(t);
          if (e) {
            var a = f()(this).constructor;
            n = Reflect.construct(o, arguments, a);
          } else n = o.apply(this, arguments);
          return d()(this, n);
        };
      }
      var q = (function(t) {
          u()(n, t);
          var e = z(n);
          function n(t) {
            var o;
            return (
              a()(this, n),
              (o = e.call(this, t)),
              g()(i()(o), "showDeleteItemModal", function(t, e) {
                o.setState(
                  B(
                    B({}, o.state),
                    {},
                    {
                      showDeleteItem: !0,
                      deleteItem: B(
                        B({}, o.state.deleteItem),
                        {},
                        { id: t, fullName: e }
                      )
                    }
                  )
                );
              }),
              g()(i()(o), "closeDeleteItemModal", function() {
                o.setState(
                  B(
                    B({}, o.state),
                    {},
                    {
                      showDeleteItem: !1,
                      deleteItem: B(
                        B({}, o.state.deleteItem),
                        {},
                        { id: "", fullName: "" }
                      )
                    }
                  )
                );
              }),
              (o.state = {
                showDeleteItem: !1,
                deleteItem: { id: "", fullName: "" }
              }),
              o
            );
          }
          return (
            c()(n, [
              {
                key: "render",
                value: function() {
                  var t = this,
                    e = "",
                    n = !0;
                  return (
                    this.props.hasError
                      ? (e = "Fout bij het ophalen van contact in groep.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : 0 === this.props.contactsInGroup.length
                      ? (e = "Geen contact in groep gevonden!")
                      : (n = !1),
                    v.a.createElement(
                      "div",
                      null,
                      v.a.createElement(
                        "div",
                        { className: "row" },
                        v.a.createElement(
                          "div",
                          { className: "col-xs-12" },
                          v.a.createElement(
                            "span",
                            null,
                            "Totaal leden in groep: ",
                            v.a.createElement(
                              "strong",
                              null,
                              this.props.contactsInGroup.length
                            )
                          )
                        )
                      ),
                      v.a.createElement(
                        "form",
                        { onKeyUp: this.handleKeyUp },
                        v.a.createElement(
                          D.a,
                          null,
                          v.a.createElement(
                            O.a,
                            null,
                            v.a.createElement(A, {
                              showCheckbox: this.props.showCheckboxList,
                              refreshContactsInGroupData: function() {
                                return t.props.refreshContactsInGroupData();
                              }
                            })
                          ),
                          v.a.createElement(
                            R.a,
                            null,
                            n
                              ? v.a.createElement(
                                  "tr",
                                  null,
                                  v.a.createElement("td", { colSpan: 10 }, e)
                                )
                              : this.props.contactsInGroup.map(function(e) {
                                  return v.a.createElement(
                                    L,
                                    G()({ key: e.id }, e, {
                                      showDeleteItemModal: t.showDeleteItemModal
                                    })
                                  );
                                })
                          )
                        )
                      ),
                      this.state.showDeleteItem &&
                        v.a.createElement(
                          x,
                          G()(
                            {
                              closeDeleteItemModal: this.closeDeleteItemModal,
                              groupId: this.props.groupId
                            },
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
        })(b.Component),
        V = Object(y.b)(function(t) {
          return {
            isLoading: t.loadingData.isLoading,
            hasError: t.loadingData.hasError
          };
        })(q),
        K = n(102),
        H = n(709);
      function Y(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(t);
          e &&
            (o = o.filter(function(e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            n.push.apply(n, o);
        }
        return n;
      }
      function F(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? Y(Object(n), !0).forEach(function(e) {
                g()(t, e, n[e]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
            : Y(Object(n)).forEach(function(e) {
                Object.defineProperty(
                  t,
                  e,
                  Object.getOwnPropertyDescriptor(n, e)
                );
              });
        }
        return t;
      }
      function J(t) {
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
            o = f()(t);
          if (e) {
            var a = f()(this).constructor;
            n = Reflect.construct(o, arguments, a);
          } else n = o.apply(this, arguments);
          return d()(this, n);
        };
      }
      var W = (function(t) {
          u()(n, t);
          var e = J(n);
          function n(t) {
            var o;
            return (
              a()(this, n),
              ((o = e.call(this, t)).state = {
                people: [],
                personId: "",
                peekLoading: { people: !0 }
              }),
              (o.handleReactSelectChange = o.handleReactSelectChange.bind(
                i()(o)
              )),
              o
            );
          }
          return (
            c()(n, [
              {
                key: "componentDidMount",
                value: function() {
                  var t = this;
                  K.a.getPerson().then(function(e) {
                    t.setState(
                      F(
                        F({}, t.state),
                        {},
                        {
                          people: e,
                          peekLoading: F(
                            F({}, t.state.peekLoading),
                            {},
                            { people: !1 }
                          )
                        }
                      )
                    );
                  });
                }
              },
              {
                key: "handleReactSelectChange",
                value: function(t) {
                  this.setState(F(F({}, this.state), {}, { personId: t }));
                }
              },
              {
                key: "render",
                value: function() {
                  var t = this;
                  return v.a.createElement(
                    U.a,
                    {
                      buttonConfirmText: "Toevoegen",
                      closeModal: this.props.closeModalAddToGroup,
                      confirmAction: function() {
                        return t.props.addPersonToGroup(t.state.personId);
                      },
                      title: "Contact toevoegen aan groep: ".concat(
                        this.props.groupName
                      )
                    },
                    v.a.createElement(
                      "form",
                      {
                        className: "form-horizontal",
                        onSubmit: this.handleSubmit
                      },
                      v.a.createElement(
                        "div",
                        { className: "row" },
                        v.a.createElement(H.a, {
                          label: "Voeg bestaand contact toe",
                          divSize: "col-sm-12",
                          size: "col-sm-6",
                          id: "personId",
                          name: "personId",
                          value: this.state.personId,
                          onChangeAction: this.handleReactSelectChange,
                          options: this.state.people,
                          optionId: "id",
                          optionName: "fullName",
                          multi: !1,
                          isLoading: this.state.peekLoading.people
                        })
                      )
                    )
                  );
                }
              }
            ]),
            n
          );
        })(b.Component),
        Q = Object(y.b)(
          function(t) {
            return { id: t.contactDetails.id };
          },
          function(t) {
            return {
              fetchContactDetails: (function(t) {
                function e(e) {
                  return t.apply(this, arguments);
                }
                return (
                  (e.toString = function() {
                    return t.toString();
                  }),
                  e
                );
              })(function(e) {
                t(fetchContactDetails(e));
              })
            };
          }
        )(W),
        X = n(54),
        Z = n(693),
        $ = n(711),
        tt = n.n($),
        et = n(727);
      function nt(t) {
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
            o = f()(t);
          if (e) {
            var a = f()(this).constructor;
            n = Reflect.construct(o, arguments, a);
          } else n = o.apply(this, arguments);
          return d()(this, n);
        };
      }
      var ot = (function(t) {
          u()(n, t);
          var e = nt(n);
          function n(t) {
            var o;
            return (
              a()(this, n),
              (o = e.call(this, t)),
              g()(i()(o), "closeModalAddToGroup", function() {
                o.setState({ showModalAddToGroup: !1 });
              }),
              g()(i()(o), "addPersonToGroup", function(t) {
                var e = { groupId: o.props.groupId, contactId: t };
                X.a.addContactToGroup(e).then(function(t) {
                  o.setState({ showModalAddToGroup: !1 }),
                    o.props.refreshContactsInGroupData();
                });
              }),
              g()(i()(o), "toggleModalAddToGroup", function() {
                o.setState({
                  showModalAddToGroup: !o.state.showModalAddToGroup
                });
              }),
              g()(i()(o), "sendEmail", function() {
                k.f.push("/email/nieuw/groep/".concat(o.props.groupId, "/to"));
              }),
              g()(i()(o), "newContact", function() {
                k.f.push("/contact/nieuw");
              }),
              g()(i()(o), "getCSV", function() {
                o.props.blockUI(),
                  X.a
                    .getCsv(o.props.groupId)
                    .then(function(t) {
                      tt()(
                        t.data,
                        "Groep-" +
                          o.state.groupName.substring(0, 20) +
                          "-" +
                          P()().format("YYYY-MM-DD HH:mm:ss") +
                          ".csv"
                      ),
                        o.props.unblockUI();
                    })
                    .catch(function(t) {
                      o.props.unblockUI();
                    });
              }),
              (o.state = {
                showModalAddToGroup: !1,
                showModalEmail: !1,
                groupName: ""
              }),
              o
            );
          }
          return (
            c()(n, [
              {
                key: "componentDidMount",
                value: function() {
                  var t = this;
                  X.a.fetchContactGroup(this.props.groupId).then(function(e) {
                    t.setState({ groupName: e.name });
                  });
                }
              },
              {
                key: "openGroupDetails",
                value: function() {
                  k.f.push("/contact-groep/".concat(this.props.groupId));
                }
              },
              {
                key: "render",
                value: function() {
                  var t = this;
                  this.props.permissions;
                  return v.a.createElement(
                    "div",
                    { className: "row" },
                    v.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      v.a.createElement(
                        "div",
                        { className: "btn-group", role: "group" },
                        v.a.createElement(Z.a, {
                          iconName: "glyphicon-refresh",
                          onClickAction: this.props.refreshContactsInGroupData
                        }),
                        this.props.permissions.updatePerson &&
                          this.props.permissions.updateOrganisation &&
                          this.props.contactGroupType &&
                          "static" === this.props.contactGroupType.id &&
                          v.a.createElement(
                            "div",
                            { className: "nav navbar-nav btn-group" },
                            v.a.createElement(
                              "button",
                              {
                                onClick: this.toggleModalAddToGroup,
                                className: "btn btn-success btn-sm"
                              },
                              v.a.createElement("span", {
                                className: "glyphicon glyphicon-plus"
                              })
                            )
                          ),
                        v.a.createElement(Z.a, {
                          iconName: "glyphicon-download-alt",
                          onClickAction: this.getCSV
                        }),
                        v.a.createElement(Z.a, {
                          iconName: "glyphicon-envelope",
                          onClickAction: this.sendEmail
                        })
                      )
                    ),
                    v.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      v.a.createElement(
                        "h3",
                        {
                          className: "text-center table-title",
                          onClick: function() {
                            return t.openGroupDetails();
                          },
                          role: "button"
                        },
                        "Contacten in groep: ",
                        this.state.groupName
                      )
                    ),
                    v.a.createElement("div", { className: "col-md-4" }),
                    this.state.showModalAddToGroup &&
                      v.a.createElement(Q, {
                        closeModalAddToGroup: this.closeModalAddToGroup,
                        addPersonToGroup: this.addPersonToGroup,
                        groupName: this.state.groupName
                      })
                  );
                }
              }
            ]),
            n
          );
        })(b.Component),
        at = Object(y.b)(
          function(t) {
            return {
              permissions: t.meDetails.permissions,
              contactGroupType: t.contactGroupDetails.type
            };
          },
          function(t) {
            return Object(E.b)({ blockUI: et.a, unblockUI: et.b }, t);
          }
        )(ot);
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
            o = f()(t);
          if (e) {
            var a = f()(this).constructor;
            n = Reflect.construct(o, arguments, a);
          } else n = o.apply(this, arguments);
          return d()(this, n);
        };
      }
      var ct = (function(t) {
        u()(n, t);
        var e = rt(n);
        function n(t) {
          var o;
          return (
            a()(this, n),
            (o = e.call(this, t)),
            g()(i()(o), "refreshContactsInGroupData", function() {
              o.props.clearContactsInGroup(),
                o.props.fetchContactsInGroup(o.props.params.contactGroup);
            }),
            o
          );
        }
        return (
          c()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchContactsInGroup(this.props.params.contactGroup),
                  this.props.fetchContactGroupDetails(
                    this.props.params.contactGroup
                  );
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearContactsInGroup(),
                  this.props.clearContactGroupDetails();
              }
            },
            {
              key: "render",
              value: function() {
                var t = this;
                return v.a.createElement(
                  "div",
                  null,
                  v.a.createElement(
                    "div",
                    { className: "panel panel-default" },
                    v.a.createElement(
                      "div",
                      { className: "panel-body" },
                      v.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        v.a.createElement(at, {
                          refreshContactsInGroupData: function() {
                            return t.refreshContactsInGroupData();
                          },
                          groupId: this.props.params.contactGroup
                        })
                      ),
                      v.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        v.a.createElement(V, {
                          contactsInGroup: this.props.contactsInGroup,
                          groupId: this.props.params.contactGroup,
                          refreshContactsInGroupData: function() {
                            return t.refreshContactsInGroupData();
                          }
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
      })(b.Component);
      e.default = Object(y.b)(
        function(t) {
          return { contactsInGroup: t.contactsInGroup };
        },
        function(t) {
          return Object(E.b)(
            {
              fetchContactsInGroup: C,
              clearContactsInGroup: w,
              fetchContactGroupDetails: I.d,
              clearContactGroupDetails: I.b
            },
            t
          );
        }
      )(ct);
    },
    693: function(t, e, n) {
      "use strict";
      var o = n(0),
        a = n.n(o),
        r = n(8),
        c = n.n(r),
        s = function(t) {
          var e = t.buttonClassName,
            n = t.iconName,
            o = t.onClickAction,
            r = t.title,
            c = t.disabled;
          return a.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(e),
              onClick: o,
              disabled: c,
              title: r
            },
            a.a.createElement("span", { className: "glyphicon ".concat(n) })
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
        (e.a = s);
    },
    709: function(t, e, n) {
      "use strict";
      var o = n(0),
        a = n.n(o),
        r = n(8),
        c = n.n(r),
        s = n(714),
        i =
          (n(715),
          function(t) {
            var e = t.label,
              n = t.divSize,
              o = t.size,
              r = t.id,
              c = t.name,
              i = t.value,
              l = t.options,
              u = t.optionId,
              p = t.optionName,
              d = t.onChangeAction,
              m = t.required,
              f = t.multi,
              h = t.error,
              g = t.isLoading;
            return a.a.createElement(
              "div",
              { className: "form-group ".concat(n) },
              a.a.createElement(
                "label",
                { htmlFor: r, className: "col-sm-6 ".concat(m) },
                e
              ),
              a.a.createElement(
                "div",
                { className: "".concat(o) },
                a.a.createElement(s.a, {
                  id: r,
                  name: c,
                  value: i,
                  onChange: function(t) {
                    d(t || "", c);
                  },
                  options: l,
                  valueKey: u,
                  labelKey: p,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: f,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: h ? " has-error" : "",
                  isLoading: g
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
        (e.a = i);
    },
    711: function(t, e) {
      t.exports = function(t, e, n, o) {
        var a = new Blob(void 0 !== o ? [o, t] : [t], {
          type: n || "application/octet-stream"
        });
        if (void 0 !== window.navigator.msSaveBlob)
          window.navigator.msSaveBlob(a, e);
        else {
          var r =
              window.URL && window.URL.createObjectURL
                ? window.URL.createObjectURL(a)
                : window.webkitURL.createObjectURL(a),
            c = document.createElement("a");
          (c.style.display = "none"),
            (c.href = r),
            c.setAttribute("download", e),
            void 0 === c.download && c.setAttribute("target", "_blank"),
            document.body.appendChild(c),
            c.click(),
            setTimeout(function() {
              document.body.removeChild(c), window.URL.revokeObjectURL(r);
            }, 200);
        }
      };
    },
    727: function(t, e, n) {
      "use strict";
      n.d(e, "a", function() {
        return o;
      }),
        n.d(e, "b", function() {
          return a;
        });
      var o = function() {
          return { type: "BLOCK_UI" };
        },
        a = function() {
          return { type: "UNBLOCK_UI" };
        };
    },
    802: function(t, e, n) {
      "use strict";
      n.d(e, "d", function() {
        return o;
      }),
        n.d(e, "e", function() {
          return a;
        }),
        n.d(e, "b", function() {
          return r;
        }),
        n.d(e, "c", function() {
          return c;
        }),
        n.d(e, "a", function() {
          return s;
        });
      var o = function(t) {
          return { type: "FETCH_CONTACT_GROUP_DETAILS", id: t };
        },
        a = function(t) {
          return {
            type: "UPDATE_CONTACT_GROUP_DETAILS",
            contactGroupDetails: t
          };
        },
        r = function() {
          return { type: "CLEAR_CONTACT_GROUP_DETAILS" };
        },
        c = function(t, e) {
          return {
            type: "DELETE_COMPOSED_GROUP",
            contactGroupId: t,
            contactGroupToDetachId: e
          };
        },
        s = function(t, e) {
          return {
            type: "ATTACH_COMPOSED_GROUP",
            contactGroupId: t,
            contactGroupToAttachId: e
          };
        };
    }
  }
]);
