(window.webpackJsonp = window.webpackJsonp || []).push([
  [18],
  {
    1402: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }), (t.file = void 0);
      t.file = {
        viewBox: "0 0 1536 1792",
        children: [
          {
            name: "path",
            attribs: {
              d:
                "M1024 512v-472q22 14 36 28l408 408q14 14 28 36h-472zM896 544q0 40 28 68t68 28h544v1056q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h800v544z"
            }
          }
        ]
      };
    },
    1403: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.fileText = void 0);
      t.fileText = {
        viewBox: "0 0 1536 1792",
        children: [
          {
            name: "path",
            attribs: {
              d:
                "M1468 476q14 14 28 36h-472v-472q22 14 36 28zM992 640h544v1056q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h800v544q0 40 28 68t68 28zM1152 1376v-64q0-14-9-23t-23-9h-704q-14 0-23 9t-9 23v64q0 14 9 23t23 9h704q14 0 23-9t9-23zM1152 1120v-64q0-14-9-23t-23-9h-704q-14 0-23 9t-9 23v64q0 14 9 23t23 9h704q14 0 23-9t9-23zM1152 864v-64q0-14-9-23t-23-9h-704q-14 0-23 9t-9 23v64q0 14 9 23t23 9h704q14 0 23-9t9-23z"
            }
          }
        ]
      };
    },
    1404: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }), (t.fileO = void 0);
      t.fileO = {
        viewBox: "0 0 1536 1792",
        children: [
          {
            name: "path",
            attribs: {
              d:
                "M1468 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zM1024 136v376h376q-10-29-22-41l-313-313q-12-12-41-22zM1408 1664v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280z"
            }
          }
        ]
      };
    },
    1418: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        i = n(25),
        o = n.n(i),
        s = n(22),
        l = n.n(s),
        c = n(26),
        u = n.n(c),
        d = n(27),
        p = n.n(d),
        m = n(16),
        f = n.n(m),
        h = n(6),
        v = n.n(h),
        I = n(0),
        g = n.n(I),
        E = n(32),
        y = n(4),
        b = n(693),
        S = n(62),
        N = n(692),
        k = n(202);
      function w(e) {
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
          return p()(this, n);
        };
      }
      var P = (function(e) {
          u()(n, e);
          var t = w(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              v()(l()(a), "syncInvoicesToTwinfield", function() {
                a.setState({ syncingToInvoices: !0 }),
                  S.a
                    .syncSentInvoicesToTwinfield(
                      a.props.administrationDetails.id
                    )
                    .then(function(e) {
                      a.setState({ syncingToInvoices: !1 }),
                        a.props.setError(200, e.data),
                        y.f.push(
                          "/financieel/".concat(
                            a.props.administrationDetails.id,
                            "/notas/geexporteerd"
                          )
                        );
                    })
                    .catch(function(e) {
                      a.setState({ syncingToInvoices: !1 }),
                        console.log(e),
                        alert(
                          "Er is iets misgegaan met synchroniseren van de gegevens. Probeer het later opnieuw"
                        );
                    });
              }),
              v()(l()(a), "syncInvoicesFromTwinfield", function() {
                a.setState({ syncingFromInvoices: !0 }),
                  S.a
                    .syncSentInvoicesFromTwinfield(
                      a.props.administrationDetails.id
                    )
                    .then(function(e) {
                      a.setState({ syncingFromInvoices: !1 }),
                        a.props.setError(200, e.data);
                    })
                    .catch(function(e) {
                      a.setState({ syncingFromInvoices: !1 }),
                        console.log(e),
                        alert(
                          "Er is iets misgegaan met synchroniseren van de gegevens. Probeer het later opnieuw"
                        );
                    });
              }),
              (a.state = { syncingToInvoices: !1, syncingFromInvoices: !1 }),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "render",
                value: function() {
                  return g.a.createElement(
                    "div",
                    { className: "row" },
                    g.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      g.a.createElement(
                        "div",
                        {
                          className: "btn-group btn-group-flex margin-small",
                          role: "group"
                        },
                        g.a.createElement(b.a, {
                          iconName: "glyphicon-arrow-left",
                          onClickAction: y.e.goBack
                        }),
                        1 == this.props.administrationDetails.usesTwinfield &&
                          1 ==
                            this.props.administrationDetails.twinfieldIsValid &&
                          g.a.createElement(N.a, {
                            loading: this.state.syncingToInvoices,
                            loadText: "Aan het synchroniseren",
                            buttonText: g.a.createElement(
                              "span",
                              null,
                              g.a.createElement("span", {
                                className: "glyphicon glyphicon-refresh",
                                title: "Nota's naar Twinfield synchroniseren"
                              }),
                              " Nota's"
                            ),
                            onClickAction: this.syncInvoicesToTwinfield
                          }),
                        1 == this.props.administrationDetails.usesTwinfield &&
                          1 ==
                            this.props.administrationDetails.twinfieldIsValid &&
                          g.a.createElement(N.a, {
                            loading: this.state.syncingFromInvoices,
                            loadText: "Betalingen aan het ophalen",
                            buttonText: g.a.createElement(
                              "span",
                              null,
                              g.a.createElement("span", {
                                className: "glyphicon glyphicon-refresh",
                                title: "Betalingen van Twinfield ophalen"
                              }),
                              " Betalingen"
                            ),
                            onClickAction: this.syncInvoicesFromTwinfield
                          })
                      )
                    ),
                    g.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      g.a.createElement(
                        "h4",
                        { className: "text-center" },
                        "Administratie: ",
                        this.props.name
                      )
                    ),
                    g.a.createElement("div", { className: "col-md-4" })
                  );
                }
              }
            ]),
            n
          );
        })(I.Component),
        C = Object(E.b)(
          function(e) {
            return {
              name: e.administrationDetails.name,
              administrationDetails: e.administrationDetails
            };
          },
          function(e) {
            return {
              setError: function(t, n) {
                e(Object(k.b)(t, n));
              }
            };
          }
        )(P),
        T = n(199),
        O = n.n(T),
        D = n(11),
        R = n.n(D),
        A = n(198),
        F = n(146),
        x = n(147),
        _ = n(200),
        M = n(721),
        j = n(101),
        L = Object(E.b)(null, function(e) {
          return {
            setOrdersSortsFilter: function(t, n) {
              e(
                (function(e, t) {
                  return {
                    type: "SET_ORDERS_SORTS_FILTER",
                    field: e,
                    order: t
                  };
                })(t, n)
              );
            }
          };
        })(function(e) {
          var t = function(t, n) {
            e.setOrdersSortsFilter(t, n),
              setTimeout(function() {
                e.fetchOrdersData();
              }, 100);
          };
          return g.a.createElement(
            "tr",
            { className: "thead-title" },
            e.showSelectOrdersToCreate &&
              g.a.createElement("th", { width: "5%" }),
            g.a.createElement(M.a, {
              sortColumn: "number",
              title: "Nummer",
              width: "10%",
              setSorts: t
            }),
            g.a.createElement(M.a, {
              sortColumn: "dateNextInvoice",
              title: "Volgende nota datum",
              width: "10%",
              setSorts: t
            }),
            g.a.createElement(M.a, {
              sortColumn: "subject",
              title: "Onderwerp",
              width: "15%",
              setSorts: t
            }),
            g.a.createElement(M.a, {
              sortColumn: "contact",
              title: "Contact",
              width: "15%",
              setSorts: t
            }),
            g.a.createElement(j.a, { title: "Bedrag incl. BTW", width: "15%" }),
            g.a.createElement(M.a, {
              sortColumn: "paymentTypeId",
              title: "Betaalwijze",
              width: "12%",
              setSorts: t
            }),
            g.a.createElement(M.a, {
              sortColumn: "statusId",
              title: "Status",
              width: "12%",
              setSorts: t
            }),
            g.a.createElement("th", { width: "9%" })
          );
        }),
        z = n(14),
        B = n(7),
        V = n.n(B),
        q = function(e) {
          return { type: "SET_NUMBER_FILTER_ORDERS", number: e };
        },
        U = function(e) {
          return {
            type: "SET_DATE_NEXT_INVOICE_FILTER_ORDERS",
            dateNextInvoice: e
          };
        },
        Y = function(e) {
          return { type: "SET_SUBJECT_FILTER_ORDERS", subject: e };
        },
        W = function(e) {
          return { type: "SET_CONTACT_FILTER_ORDERS", contact: e };
        },
        G = function(e) {
          return {
            type: "SET_PAYMENT_TYPE_ID_FILTER_ORDERS",
            paymentTypeId: e
          };
        },
        K = function(e) {
          return { type: "SET_STATUS_ID_FILTER_ORDERS", statusId: e };
        },
        H = function() {
          return { type: "CLEAR_FILTER_ORDERS" };
        },
        $ = n(725),
        Z = Object(E.b)(
          function(e) {
            return {
              filters: e.orders.filters,
              orderStatuses: e.systemData.orderStatuses,
              orderPaymentTypes: e.systemData.orderPaymentTypes
            };
          },
          function(e) {
            return Object(z.b)(
              {
                setNumberFilterOrders: q,
                setContactFilterOrders: W,
                setDateNextInvoiceFilterOrders: U,
                setPaymentTypeIdFilterOrders: G,
                setStatusIdFilterOrders: K,
                setSubjectFilterOrders: Y
              },
              e
            );
          }
        )(function(e) {
          return g.a.createElement(
            "tr",
            { className: "thead-filter" },
            e.showSelectOrdersToCreate &&
              g.a.createElement(
                "td",
                null,
                g.a.createElement("input", {
                  type: "checkbox",
                  onChange: e.toggleCheckedAll
                })
              ),
            g.a.createElement(
              "th",
              null,
              e.showSelectOrdersToCreate
                ? null
                : g.a.createElement("input", {
                    type: "text",
                    className: "form-control input-sm",
                    value: e.filters.number.data,
                    onChange: function(t) {
                      e.setNumberFilterOrders(t.target.value);
                    }
                  })
            ),
            e.showSelectOrdersToCreate
              ? g.a.createElement("th", null, null)
              : g.a.createElement($.a, {
                  value:
                    e.filters.dateNextInvoice.data &&
                    e.filters.dateNextInvoice.data,
                  onChangeAction: function(t) {
                    void 0 === t
                      ? e.setDateNextInvoiceFilterOrders("")
                      : e.setDateNextInvoiceFilterOrders(
                          V()(t).format("Y-MM-DD")
                        );
                  }
                }),
            g.a.createElement(
              "th",
              null,
              e.showSelectOrdersToCreate
                ? null
                : g.a.createElement("input", {
                    type: "text",
                    className: "form-control input-sm",
                    value: e.filters.subject.data,
                    onChange: function(t) {
                      e.setSubjectFilterOrders(t.target.value);
                    }
                  })
            ),
            g.a.createElement(
              "th",
              null,
              e.showSelectOrdersToCreate
                ? null
                : g.a.createElement("input", {
                    type: "text",
                    className: "form-control input-sm",
                    value: e.filters.contact.data,
                    onChange: function(t) {
                      e.setContactFilterOrders(t.target.value);
                    }
                  })
            ),
            g.a.createElement("th", null),
            g.a.createElement(
              "th",
              null,
              e.showSelectOrdersToCreate
                ? null
                : g.a.createElement(
                    "select",
                    {
                      className: "form-control input-sm",
                      value: e.filters.paymentTypeId.data,
                      onChange: function(t) {
                        e.setPaymentTypeIdFilterOrders(t.target.value),
                          setTimeout(function() {
                            e.onSubmitFilter();
                          }, 100);
                      }
                    },
                    g.a.createElement("option", null),
                    e.orderPaymentTypes.map(function(e) {
                      return g.a.createElement(
                        "option",
                        { key: e.id, value: e.id },
                        e.name
                      );
                    })
                  )
            ),
            g.a.createElement(
              "th",
              null,
              e.showSelectOrdersToCreate
                ? null
                : g.a.createElement(
                    "select",
                    {
                      className: "form-control input-sm",
                      value: e.filters.statusId.data,
                      onChange: function(t) {
                        e.setStatusIdFilterOrders(t.target.value),
                          setTimeout(function() {
                            e.onSubmitFilter();
                          }, 100);
                      }
                    },
                    g.a.createElement("option", null),
                    g.a.createElement(
                      "option",
                      { key: "concept", value: "concept" },
                      "Concept"
                    ),
                    g.a.createElement(
                      "option",
                      { key: "upcoming", value: "upcoming" },
                      "Aankomende"
                    ),
                    g.a.createElement(
                      "option",
                      { key: "to-create", value: "create" },
                      "Te factureren"
                    ),
                    g.a.createElement(
                      "option",
                      { key: "in-progress", value: "in-progress" },
                      "Concept nota wordt gemaakt"
                    ),
                    g.a.createElement(
                      "option",
                      { key: "to-send", value: "send" },
                      "Te verzenden"
                    ),
                    g.a.createElement(
                      "option",
                      { key: "closed", value: "closed" },
                      "Beëindigd"
                    )
                  )
            ),
            g.a.createElement("th", null)
          );
        });
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var X = (function(e) {
          u()(n, e);
          var t = J(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              ((a = t.call(this, e)).state = {
                showActionButtons: !1,
                highlightRow: ""
              }),
              a
            );
          }
          return (
            o()(n, [
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
                  y.f.push("/order/".concat(e));
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props,
                    n = t.id,
                    a = t.number,
                    r = t.dateNextInvoice,
                    i = t.subject,
                    o = t.contact,
                    s = t.totalPriceInclVatPerYear,
                    l = t.paymentType,
                    c = t.status;
                  t.checked;
                  return g.a.createElement(
                    "tr",
                    {
                      className: this.state.highlightRow,
                      onDoubleClick: function() {
                        return e.openItem(n);
                      },
                      onMouseEnter: function() {
                        return e.onRowEnter();
                      },
                      onMouseLeave: function() {
                        return e.onRowLeave();
                      }
                    },
                    this.props.showSelectOrdersToCreate &&
                      g.a.createElement(
                        "td",
                        null,
                        g.a.createElement("input", {
                          type: "checkbox",
                          name: n,
                          onChange: this.props.toggleOrderCheck,
                          checked:
                            !!this.props.orderIds &&
                            this.props.orderIds.includes(n)
                        })
                      ),
                    g.a.createElement("td", null, a),
                    g.a.createElement(
                      "td",
                      null,
                      r ? V()(r).format("DD-MM-Y") : ""
                    ),
                    g.a.createElement("td", null, i || ""),
                    g.a.createElement("td", null, o ? o.fullName : ""),
                    g.a.createElement(
                      "td",
                      { className: "".concat(s <= 0 ? "warning-td" : "") },
                      "€" +
                        s.toLocaleString("nl", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })
                    ),
                    g.a.createElement("td", null, l ? l.name : ""),
                    g.a.createElement("td", null, c ? c.name : ""),
                    g.a.createElement(
                      "td",
                      null,
                      this.state.showActionButtons
                        ? g.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.openItem(n);
                              }
                            },
                            g.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-pencil mybtn-success"
                            }),
                            " "
                          )
                        : "",
                      this.state.showActionButtons
                        ? g.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: this.props.showDeleteItemModal.bind(
                                this,
                                n,
                                i
                              )
                            },
                            g.a.createElement("span", {
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
        })(I.Component),
        Q = n(100),
        ee = n(794),
        te = Object(E.b)(null, function(e) {
          return {
            deleteOrder: function(t) {
              e(Object(ee.c)(t));
            }
          };
        })(function(e) {
          return g.a.createElement(
            Q.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return e.deleteOrder(e.id), void e.closeDeleteItemModal();
              },
              title: "Verwijderen"
            },
            "Verwijder order: ",
            g.a.createElement("strong", null, e.subject),
            "?"
          );
        }),
        ne = n(712),
        ae = function(e) {
          return { type: "SET_ORDERS_PAGINATION", pagination: e };
        },
        re = n(722),
        ie = n(727),
        oe = n(210),
        se = n(711),
        le = n.n(se);
      function ce(e, t) {
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
      function ue(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ce(Object(n), !0).forEach(function(t) {
                v()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : ce(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
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
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var pe = {
          showDeleteItem: !1,
          showSelectOrdersToCreate: !1,
          checkedAll: !1,
          orderIds: [],
          previewOrderText: "Selecteer preview concept nota's",
          deleteItem: { id: "", subject: "" }
        },
        me = (function(e) {
          u()(n, e);
          var t = de(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              v()(l()(a), "setFilter", function(e) {
                if (Object(A.isEmpty)(e)) a.props.clearFilterOrders();
                else
                  switch (e) {
                    case "concepten":
                      a.props.clearFilterOrders(),
                        a.props.setStatusIdFilterOrders("concept");
                      break;
                    case "aankomend":
                      a.props.clearFilterOrders(),
                        a.props.setStatusIdFilterOrders("upcoming");
                      break;
                    case "te-factureren":
                      a.props.clearFilterOrders(),
                        a.props.setStatusIdFilterOrders("create");
                      break;
                    case "in-progress":
                      a.props.clearFilterOrders(),
                        a.props.setStatusIdFilterOrders("in-progress");
                      break;
                    case "te-verzenden":
                      a.props.clearFilterOrders(),
                        a.props.setStatusIdFilterOrders("send");
                      break;
                    case "beeindigd":
                      a.props.clearFilterOrders(),
                        a.props.setStatusIdFilterOrders("closed");
                  }
              }),
              v()(l()(a), "fetchOrdersData", function() {
                a.props.clearOrders(),
                  setTimeout(function() {
                    var e = Object(re.a)(a.props.ordersFilters),
                      t = a.props.ordersSorts,
                      n = {
                        limit: 50,
                        offset: a.props.ordersPagination.offset
                      },
                      r = a.props.administrationId;
                    a.props.fetchOrders(e, t, n, r);
                  }, 100),
                  a.props.fetchTotalsInfoAdministration(
                    a.props.administrationId
                  );
              }),
              v()(l()(a), "getCSV", function() {
                a.props.blockUI(),
                  setTimeout(function() {
                    var e = Object(re.a)(a.props.ordersFilters),
                      t = a.props.ordersSorts,
                      n = a.props.administrationId;
                    oe.a
                      .getCSV({ filters: e, sorts: t, administrationId: n })
                      .then(function(e) {
                        le()(
                          e.data,
                          "Orders-" +
                            V()().format("YYYY-MM-DD HH:mm:ss") +
                            ".csv"
                        ),
                          a.props.unblockUI();
                      })
                      .catch(function(e) {
                        a.props.unblockUI();
                      });
                  }, 100);
              }),
              v()(l()(a), "previewOrders", function() {
                a.setState({ previewOrderText: "Preview concept nota's" }),
                  a.fetchOrdersData(),
                  a.state.orderIds.length > 0
                    ? (a.props.previewCreate(a.state.orderIds),
                      y.f.push(
                        "/financieel/".concat(
                          a.props.administrationId,
                          "/orders/aanmaken"
                        )
                      ))
                    : a.toggleShowCheckboxList();
              }),
              v()(l()(a), "toggleShowCheckboxList", function() {
                a.state.showSelectOrdersToCreate
                  ? a.setState({ showSelectOrdersToCreate: !1, orderIds: [] })
                  : a.setState({ showSelectOrdersToCreate: !0, orderIds: [] });
              }),
              v()(l()(a), "resetOrderFilters", function() {
                a.props.clearFilterOrders(),
                  a.setFilter(a.props.filter),
                  a.fetchOrdersData(),
                  a.setState(ue({}, pe));
              }),
              v()(l()(a), "onSubmitFilter", function() {
                a.props.clearOrders(),
                  a.props.setOrdersPagination({ page: 0, offset: 0 }),
                  a.fetchOrdersData();
              }),
              v()(l()(a), "handleKeyUp", function(e) {
                13 === e.keyCode && a.onSubmitFilter();
              }),
              v()(l()(a), "toggleCheckedAll", function() {
                var e = event.target.checked,
                  t = [];
                e && (t = a.props.orders.meta.orderIdsTotal),
                  a.setState({ orderIds: t, checkedAll: e });
              }),
              v()(l()(a), "toggleOrderCheck", function(e) {
                var t = e.target.checked,
                  n = Number(e.target.name);
                t
                  ? a.setState(
                      { orderIds: [].concat(R()(a.state.orderIds), [n]) },
                      a.checkAllOrdersAreChecked
                    )
                  : a.setState({
                      orderIds: a.state.orderIds.filter(function(e) {
                        return e !== n;
                      }),
                      checkedAll: !1
                    });
              }),
              v()(l()(a), "showDeleteItemModal", function(e, t) {
                a.setState(
                  ue(
                    ue({}, a.state),
                    {},
                    {
                      showDeleteItem: !0,
                      deleteItem: ue(
                        ue({}, a.state.deleteItem),
                        {},
                        { id: e, subject: t }
                      )
                    }
                  )
                );
              }),
              v()(l()(a), "closeDeleteItemModal", function() {
                a.setState(
                  ue(
                    ue({}, a.state),
                    {},
                    {
                      showDeleteItem: !1,
                      deleteItem: ue(
                        ue({}, a.state.deleteItem),
                        {},
                        { id: "", subject: "" }
                      )
                    }
                  )
                );
              }),
              a.setFilter(e.filter),
              (a.state = pe),
              (a.handlePageClick = a.handlePageClick.bind(l()(a))),
              (a.toggleOrderCheck = a.toggleOrderCheck.bind(l()(a))),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "componentDidMount",
                value: function() {
                  this.fetchOrdersData();
                }
              },
              {
                key: "componentWillUnmount",
                value: function() {
                  this.props.clearOrders();
                }
              },
              {
                key: "componentDidUpdate",
                value: function(e) {
                  var t = this;
                  this.props.filter !== e.filter &&
                    (this.setFilter(this.props.filter),
                    this.setState(ue({}, pe)),
                    setTimeout(function() {
                      t.fetchOrdersData();
                    }, 100));
                }
              },
              {
                key: "handlePageClick",
                value: function(e) {
                  var t = e.selected,
                    n = Math.ceil(50 * t);
                  this.props.setOrdersPagination({ page: t, offset: n }),
                    this.fetchOrdersData();
                }
              },
              {
                key: "checkAllOrdersAreChecked",
                value: function() {
                  this.setState({
                    checkedAll:
                      this.state.orderIds.length ===
                      this.props.orders.meta.orderIdsTotal.length
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.orders,
                    n = t.data,
                    a = void 0 === n ? [] : n,
                    r = t.meta,
                    i = void 0 === r ? {} : r,
                    o = "",
                    s = !0;
                  this.props.hasError
                    ? (o = "Fout bij het ophalen van orders.")
                    : this.props.isLoading
                    ? (o = "Gegevens aan het laden.")
                    : 0 === a.length
                    ? (o = "Geen orders gevonden!")
                    : (s = !1);
                  var l = 0;
                  this.state.orderIds &&
                    (l =
                      this.props &&
                      this.props.orders &&
                      this.props.orders.meta &&
                      this.props.orders.meta.orderIdsTotal
                        ? this.state.orderIds.length +
                          "/" +
                          this.props.orders.meta.orderIdsTotal.length
                        : this.state.orderIds.length);
                  var c = 0,
                    u = 0,
                    d = 0,
                    p = 0,
                    m = 0,
                    f = 0,
                    h = null,
                    v = null,
                    I = null,
                    E = null,
                    y = null,
                    S = null,
                    k = null;
                  return (
                    this.props.totalsInfoAdministration &&
                      ((c = this.props.totalsInfoAdministration
                        .totalOrdersInProgressInvoices
                        ? this.props.totalsInfoAdministration
                            .totalOrdersInProgressInvoices
                        : 0),
                      (u = this.props.totalsInfoAdministration
                        .totalInvoicesInProgress
                        ? this.props.totalsInfoAdministration
                            .totalInvoicesInProgress
                        : 0),
                      (d = this.props.totalsInfoAdministration
                        .totalInvoicesIsSending
                        ? this.props.totalsInfoAdministration
                            .totalInvoicesIsSending
                        : 0),
                      (p = this.props.totalsInfoAdministration
                        .totalInvoicesIsResending
                        ? this.props.totalsInfoAdministration
                            .totalInvoicesIsResending
                        : 0),
                      (f +=
                        c +
                        (m = this.props.totalsInfoAdministration
                          .totalInvoicesErrorMaking
                          ? this.props.totalsInfoAdministration
                              .totalInvoicesErrorMaking
                          : 0) +
                        u +
                        p +
                        d) > 0 &&
                        ("aankomend" == this.props.filter ||
                          "te-factureren" == this.props.filter ||
                          "te-verzenden" == this.props.filter) &&
                        ((h =
                          "Overzicht status bij het maken en verzenden nota's"),
                        c > 0 &&
                          (I =
                            "- Concept nota's die nu gemaakt worden van uit order: " +
                            c),
                        u > 0 &&
                          (E =
                            "- Concept nota's die nu definitief gemaakt worden: " +
                            u),
                        d > 0 &&
                          (y =
                            "- Definitieve nota's die nu verzonden (e-mail of PDF) worden: " +
                            d),
                        p > 0 &&
                          (S =
                            "- Definitieve nota's die nu opnieuw verzonden worden: " +
                            p),
                        m > 0 &&
                          (k =
                            '- Definitieve nota\'s met status "Fout bij maken": ' +
                            m),
                        (v =
                          "Gebruik blauwe refresh/vernieuwen knop of F5 (Command + R op Mac) om status overzicht te verversen."))),
                    g.a.createElement(
                      "div",
                      null,
                      g.a.createElement(
                        "div",
                        { className: "row" },
                        g.a.createElement(
                          "div",
                          { className: "col-md-4" },
                          g.a.createElement(
                            "div",
                            { className: "btn-group", role: "group" },
                            g.a.createElement(b.a, {
                              iconName: "glyphicon-refresh",
                              onClickAction: this.resetOrderFilters
                            }),
                            g.a.createElement(b.a, {
                              iconName: "glyphicon-download-alt",
                              onClickAction: this.getCSV
                            }),
                            "create" ==
                              this.props.ordersFilters.statusId.data &&
                              i.total > 0 &&
                              g.a.createElement(N.a, {
                                buttonText: this.state.previewOrderText,
                                onClickAction: this.previewOrders
                              })
                          )
                        ),
                        g.a.createElement(
                          "div",
                          { className: "col-md-4" },
                          g.a.createElement(
                            "h3",
                            { className: "text-center table-title" },
                            "Orders"
                          )
                        ),
                        g.a.createElement(
                          "div",
                          { className: "col-md-4" },
                          g.a.createElement(
                            "div",
                            { className: "pull-right" },
                            "Resultaten: ",
                            i.total || 0
                          )
                        )
                      ),
                      g.a.createElement("div", { className: "col-md-12" }, " "),
                      this.state.showSelectOrdersToCreate
                        ? g.a.createElement(
                            g.a.Fragment,
                            null,
                            g.a.createElement(
                              "div",
                              { className: "col-md-12" },
                              " "
                            ),
                            g.a.createElement(
                              "div",
                              { className: "col-md-12" },
                              l
                                ? g.a.createElement(
                                    "div",
                                    { className: "alert alert-success" },
                                    "Geselecteerde orders: ",
                                    l
                                  )
                                : null
                            )
                          )
                        : g.a.createElement(
                            "div",
                            { className: "col-md-12" },
                            h
                              ? g.a.createElement(
                                  "div",
                                  { className: "alert alert-warning" },
                                  h,
                                  g.a.createElement("br", null),
                                  I
                                    ? g.a.createElement(
                                        "span",
                                        null,
                                        I,
                                        " ",
                                        g.a.createElement("br", null)
                                      )
                                    : null,
                                  E
                                    ? g.a.createElement(
                                        "span",
                                        null,
                                        E,
                                        " ",
                                        g.a.createElement("br", null)
                                      )
                                    : null,
                                  y
                                    ? g.a.createElement(
                                        "span",
                                        null,
                                        y,
                                        " ",
                                        g.a.createElement("br", null)
                                      )
                                    : null,
                                  S
                                    ? g.a.createElement(
                                        "span",
                                        null,
                                        S,
                                        " ",
                                        g.a.createElement("br", null)
                                      )
                                    : null,
                                  k
                                    ? g.a.createElement(
                                        "span",
                                        null,
                                        k,
                                        " ",
                                        g.a.createElement("br", null)
                                      )
                                    : null,
                                  g.a.createElement("br", null),
                                  " ",
                                  v
                                )
                              : null
                          ),
                      g.a.createElement(
                        "form",
                        {
                          onKeyUp: this.handleKeyUp,
                          className: "margin-10-top"
                        },
                        g.a.createElement(
                          F.a,
                          null,
                          g.a.createElement(
                            x.a,
                            null,
                            g.a.createElement(L, {
                              showSelectOrdersToCreate: this.state
                                .showSelectOrdersToCreate,
                              fetchOrdersData: this.fetchOrdersData
                            }),
                            g.a.createElement(Z, {
                              showSelectOrdersToCreate: this.state
                                .showSelectOrdersToCreate,
                              onSubmitFilter: this.onSubmitFilter,
                              toggleCheckedAll: this.toggleCheckedAll
                            })
                          ),
                          g.a.createElement(
                            _.a,
                            null,
                            s
                              ? g.a.createElement(
                                  "tr",
                                  null,
                                  g.a.createElement("td", { colSpan: 8 }, o)
                                )
                              : a.map(function(t) {
                                  return g.a.createElement(
                                    X,
                                    O()(
                                      {
                                        showSelectOrdersToCreate:
                                          e.state.showSelectOrdersToCreate,
                                        checkedAll: e.props.checkedAll,
                                        toggleOrderCheck: e.toggleOrderCheck,
                                        orderIds: e.state.orderIds,
                                        key: t.id
                                      },
                                      t,
                                      {
                                        showDeleteItemModal:
                                          e.showDeleteItemModal,
                                        fetchOrdersData: e.fetchOrdersData
                                      }
                                    )
                                  );
                                })
                          )
                        ),
                        g.a.createElement(
                          "div",
                          { className: "col-md-6 col-md-offset-3" },
                          g.a.createElement(ne.a, {
                            onPageChangeAction: this.handlePageClick,
                            totalRecords: i.total,
                            initialPage: this.props.ordersPagination.page,
                            recordsPerPage: 50
                          })
                        )
                      ),
                      this.state.showDeleteItem &&
                        g.a.createElement(
                          te,
                          O()(
                            {
                              closeDeleteItemModal: this.closeDeleteItemModal,
                              fetchOrders: this.fetchOrdersData
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
        })(I.Component),
        fe = Object(E.b)(
          function(e) {
            return {
              orders: e.orders.list,
              ordersFilters: e.orders.filters,
              ordersSorts: e.orders.sorts,
              ordersPagination: e.orders.pagination,
              isLoading: e.loadingData.isLoading,
              hasError: e.loadingData.hasError
            };
          },
          function(e) {
            return Object(z.b)(
              {
                previewCreate: ee.e,
                fetchOrders: ee.d,
                clearOrders: ee.a,
                clearFilterOrders: H,
                setOrdersPagination: ae,
                setPaymentTypeIdFilterOrders: G,
                setStatusIdFilterOrders: K,
                blockUI: ie.a,
                unblockUI: ie.b
              },
              e
            );
          }
        )(me),
        he = Object(E.b)(null, function(e) {
          return {
            setInvoicesSortsFilter: function(t, n) {
              e(
                (function(e, t) {
                  return {
                    type: "SET_INVOICES_SORTS_FILTER",
                    field: e,
                    order: t
                  };
                })(t, n)
              );
            }
          };
        })(function(e) {
          var t = function(t, n) {
            e.setInvoicesSortsFilter(t, n),
              setTimeout(function() {
                e.fetchInvoicesData();
              }, 100);
          };
          return g.a.createElement(
            "tr",
            { className: "thead-title" },
            e.showSelectInvoicesToSend &&
              g.a.createElement("th", { width: "5%" }),
            g.a.createElement(M.a, {
              sortColumn: "number",
              title: "Nummer",
              width: "10%",
              setSorts: t
            }),
            g.a.createElement(M.a, {
              sortColumn: "dateRequested",
              title: "(Geplande) nota datum",
              width: "10%",
              setSorts: t
            }),
            g.a.createElement(M.a, {
              sortColumn: "contact",
              title: "Contact",
              width: "12%",
              setSorts: t
            }),
            g.a.createElement(j.a, { title: "Betreft", width: "12%" }),
            g.a.createElement(M.a, {
              sortColumn: "daysToExpire",
              title: "Verloopt over",
              width: "8%",
              setSorts: t
            }),
            g.a.createElement(M.a, {
              sortColumn: "daysLastReminder",
              title: "Laatste herinnering",
              width: "8%",
              setSorts: t
            }),
            g.a.createElement(j.a, { title: "Bedrag incl. BTW", width: "10%" }),
            g.a.createElement(M.a, {
              sortColumn: "paymentTypeId",
              title: "Betaalwijze",
              width: "10%",
              setSorts: t
            }),
            g.a.createElement(M.a, {
              sortColumn: "statusId",
              title: "Status",
              width: "10%",
              setSorts: t
            }),
            g.a.createElement(j.a, { title: "Substatus", width: "10%" }),
            g.a.createElement(j.a, { title: "IBAN", width: "10%" }),
            g.a.createElement("th", { width: "10%" })
          );
        }),
        ve = function(e) {
          return { type: "SET_NUMBER_FILTER_INVOICES", number: e };
        },
        Ie = function(e) {
          return {
            type: "SET_DATE_REQUESTED_FILTER_INVOICES",
            dateRequested: e
          };
        },
        ge = function(e) {
          return { type: "SET_SUBJECT_FILTER_INVOICES", subject: e };
        },
        Ee = function(e) {
          return {
            type: "SET_DAYS_TO_EXPIRE_FILTER_INVOICES",
            daysToExpire: e
          };
        },
        ye = function(e) {
          return {
            type: "SET_DAYS_LAST_REMINDER_FILTER_INVOICES",
            daysLastReminder: e
          };
        },
        be = function(e) {
          return { type: "SET_CONTACT_FILTER_INVOICES", contact: e };
        },
        Se = function(e) {
          return {
            type: "SET_PAYMENT_TYPE_ID_FILTER_INVOICES",
            paymentTypeId: e
          };
        },
        Ne = function(e) {
          return { type: "SET_STATUS_ID_FILTER_INVOICES", statusId: e };
        },
        ke = function() {
          return { type: "CLEAR_FILTER_INVOICES" };
        },
        we = Object(E.b)(
          function(e) {
            return {
              filters: e.invoices.filters,
              invoiceStatuses: e.systemData.invoiceStatuses,
              administrationDetails: e.administrationDetails,
              orderPaymentTypes: e.systemData.orderPaymentTypes
            };
          },
          function(e) {
            return Object(z.b)(
              {
                setNumberFilterInvoices: ve,
                setContactFilterInvoices: be,
                setDateRequestedFilterInvoices: Ie,
                setPaymentTypeIdFilterInvoices: Se,
                setStatusIdFilterInvoices: Ne,
                setSubjectFilterInvoices: ge,
                setDaysLastReminderFilterInvoices: ye,
                setDaysToExpireFilterInvoices: Ee
              },
              e
            );
          }
        )(function(e) {
          return g.a.createElement(
            "tr",
            { className: "thead-filter" },
            e.showSelectInvoicesToSend &&
              g.a.createElement(
                "td",
                null,
                g.a.createElement("input", {
                  type: "checkbox",
                  onChange: e.toggleCheckedAll
                })
              ),
            g.a.createElement(
              "th",
              null,
              e.showSelectInvoicesToSend
                ? null
                : g.a.createElement("input", {
                    type: "text",
                    className: "form-control input-sm",
                    value: e.filters.number.data,
                    onChange: function(t) {
                      e.setNumberFilterInvoices(t.target.value);
                    }
                  })
            ),
            e.showSelectInvoicesToSend
              ? g.a.createElement("th", null, null)
              : g.a.createElement($.a, {
                  placeholder: "Kleiner",
                  value:
                    e.filters.dateRequested.data &&
                    e.filters.dateRequested.data,
                  onChangeAction: function(t) {
                    void 0 === t
                      ? e.setDateRequestedFilterInvoices("")
                      : e.setDateRequestedFilterInvoices(
                          V()(t).format("Y-MM-DD")
                        );
                  }
                }),
            g.a.createElement(
              "th",
              null,
              e.showSelectInvoicesToSend
                ? null
                : g.a.createElement("input", {
                    type: "text",
                    className: "form-control input-sm",
                    value: e.filters.contact.data,
                    onChange: function(t) {
                      e.setContactFilterInvoices(t.target.value);
                    }
                  })
            ),
            g.a.createElement(
              "th",
              null,
              e.showSelectInvoicesToSend
                ? null
                : g.a.createElement("input", {
                    type: "text",
                    className: "form-control input-sm",
                    value: e.filters.subject.data,
                    onChange: function(t) {
                      e.setSubjectFilterInvoices(t.target.value);
                    }
                  })
            ),
            g.a.createElement(
              "th",
              null,
              e.showSelectInvoicesToSend
                ? null
                : g.a.createElement("input", {
                    type: "number",
                    placeholder: "Kleiner",
                    className: "form-control input-sm",
                    value: e.filters.daysToExpire.data,
                    onChange: function(t) {
                      e.setDaysToExpireFilterInvoices(t.target.value);
                    }
                  })
            ),
            g.a.createElement(
              "th",
              null,
              e.showSelectInvoicesToSend
                ? null
                : g.a.createElement("input", {
                    type: "number",
                    placeholder: "Groter",
                    className: "form-control input-sm",
                    value: e.filters.daysLastReminder.data,
                    onChange: function(t) {
                      e.setDaysLastReminderFilterInvoices(t.target.value);
                    }
                  })
            ),
            g.a.createElement("th", null),
            g.a.createElement(
              "th",
              null,
              e.showSelectInvoicesToSend
                ? null
                : g.a.createElement(
                    "select",
                    {
                      className: "form-control input-sm",
                      value: e.filters.paymentTypeId.data,
                      onChange: function(t) {
                        e.setPaymentTypeIdFilterInvoices(t.target.value),
                          setTimeout(function() {
                            e.onSubmitFilter();
                          }, 100);
                      }
                    },
                    g.a.createElement("option", null),
                    e.orderPaymentTypes.map(function(e) {
                      return g.a.createElement(
                        "option",
                        { key: e.id, value: e.id },
                        e.name
                      );
                    })
                  )
            ),
            g.a.createElement(
              "th",
              null,
              e.showSelectInvoicesToSend
                ? null
                : g.a.createElement(
                    "select",
                    {
                      className: "form-control input-sm",
                      value: e.filters.statusId.data,
                      onChange: function(t) {
                        e.setStatusIdFilterInvoices(t.target.value),
                          setTimeout(function() {
                            e.onSubmitFilter();
                          }, 100);
                      }
                    },
                    g.a.createElement("option", null),
                    g.a.createElement(
                      "optgroup",
                      { label: "Status" },
                      g.a.createElement(
                        "option",
                        { key: "to-send", value: "to-send" },
                        "Te verzenden"
                      ),
                      g.a.createElement(
                        "option",
                        { key: "sent", value: "sent" },
                        "Verzonden"
                      ),
                      e.administrationDetails.totalInvoicesExported > 0 ||
                        (e.administrationDetails.twinfieldIsValid &&
                          g.a.createElement(
                            "option",
                            { key: "exported", value: "exported" },
                            "Geboekt"
                          )),
                      g.a.createElement(
                        "option",
                        { key: "paid", value: "paid" },
                        "Betaald"
                      ),
                      g.a.createElement(
                        "option",
                        { key: "irrecoverable", value: "irrecoverable" },
                        "Oninbaar"
                      ),
                      g.a.createElement(
                        "option",
                        { key: "error-making", value: "error-making" },
                        "Fout bij maken"
                      ),
                      g.a.createElement(
                        "option",
                        { key: "error-sending", value: "error-sending" },
                        "Opnieuw te verzenden"
                      ),
                      g.a.createElement(
                        "option",
                        { key: "in-progress", value: "in-progress" },
                        "Wordt definitief gemaakt"
                      ),
                      g.a.createElement(
                        "option",
                        { key: "is-sending", value: "is-sending" },
                        "Wordt verstuurd"
                      ),
                      g.a.createElement(
                        "option",
                        { key: "is-resending", value: "is-resending" },
                        "Wordt opnieuw verstuurd"
                      )
                    ),
                    g.a.createElement(
                      "optgroup",
                      { label: "Substatus" },
                      g.a.createElement(
                        "option",
                        { key: "reminder", value: "reminder" },
                        "Herinnering"
                      ),
                      g.a.createElement(
                        "option",
                        { key: "to-remind", value: "to-remind" },
                        "Te herinneren"
                      ),
                      g.a.createElement(
                        "option",
                        { key: "reminder_1", value: "reminder_1" },
                        "Herinnering 1"
                      ),
                      g.a.createElement(
                        "option",
                        { key: "reminder_2", value: "reminder_2" },
                        "Herinnering 2"
                      ),
                      g.a.createElement(
                        "option",
                        { key: "reminder_3", value: "reminder_3" },
                        "Herinnering 3"
                      ),
                      g.a.createElement(
                        "option",
                        { key: "exhortation", value: "exhortation" },
                        "Aanmaning"
                      )
                    )
                  )
            ),
            g.a.createElement("th", null),
            g.a.createElement("th", null),
            g.a.createElement("th", null)
          );
        }),
        Pe = n(90),
        Ce = n(697),
        Te = n.n(Ce),
        Oe = n(699);
      function De(e, t) {
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
      function Re(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? De(Object(n), !0).forEach(function(t) {
                v()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : De(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function Ae(e) {
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
          return p()(this, n);
        };
      }
      var Fe = (function(e) {
          u()(n, e);
          var t = Ae(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              v()(l()(a), "handleInputChangeDate", function(e, t) {
                a.setState(
                  Re(
                    Re({}, a.state),
                    {},
                    { invoice: Re(Re({}, a.state.invoice), {}, v()({}, t, e)) }
                  )
                );
              }),
              v()(l()(a), "confirmAction", function(e) {
                e.preventDefault();
                var t = a.state.invoice,
                  n = {},
                  r = !1;
                Te.a.isEmpty(t.datePaid + "") && ((n.datePaid = !0), (r = !0)),
                  a.setState(Re(Re({}, a.state), {}, { errors: n })),
                  r ||
                    Pe.a.updateInvoice(t).then(function(e) {
                      y.f.push(
                        "/financieel/".concat(
                          a.props.administrationId,
                          "/notas/betaald"
                        )
                      );
                    });
              }),
              (a.state = {
                invoice: { id: e.invoiceId, datePaid: V()().format("Y-MM-DD") },
                errors: { datePaid: !1 }
              }),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "render",
                value: function() {
                  var e = this.state.invoice.datePaid;
                  return g.a.createElement(
                    Q.a,
                    {
                      buttonConfirmText: "Nota betalen",
                      closeModal: this.props.closeModal,
                      confirmAction: this.confirmAction,
                      title: "Nota betalen"
                    },
                    g.a.createElement(
                      "div",
                      { className: "row" },
                      g.a.createElement(
                        "div",
                        { className: "col-sm-12 margin-10-bottom" },
                        g.a.createElement(
                          "span",
                          null,
                          "Wanneer de betaaldatum wordt ingevuld zal er een betaling aangemaakt worden met het openstaande bedrag(€",
                          this.props.amountOpen.toLocaleString("nl", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }),
                          ")."
                        )
                      )
                    ),
                    g.a.createElement(
                      "div",
                      { className: "row" },
                      g.a.createElement(Oe.a, {
                        divSize: "col-sm-12",
                        label: "Datum betaald",
                        name: "datePaid",
                        value: e,
                        onChangeAction: this.handleInputChangeDate,
                        required: "required",
                        error: this.state.errors.datePaid
                      })
                    )
                  );
                }
              }
            ]),
            n
          );
        })(I.Component),
        xe = n(748);
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var Me = (function(e) {
          u()(n, e);
          var t = _e(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              v()(l()(a), "confirmAction", function(e) {
                e.preventDefault(),
                  "post" === a.props.type
                    ? Pe.a
                        .sendNotificationPost(a.props.invoiceId)
                        .then(function(e) {
                          le()(e.data, e.headers["x-filename"]),
                            a.props.fetchAdministrationDetails(
                              a.props.administrationId
                            ),
                            a.props.fetchInvoicesData(),
                            a.props.closeModal();
                        })
                    : Pe.a
                        .sendNotification(a.props.invoiceId)
                        .then(function(e) {
                          a.props.fetchAdministrationDetails(
                            a.props.administrationId
                          ),
                            a.props.fetchInvoicesData(),
                            a.props.closeModal();
                        });
              }),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "render",
                value: function() {
                  return g.a.createElement(
                    Q.a,
                    {
                      buttonConfirmText: "Versturen",
                      closeModal: this.props.closeModal,
                      confirmAction: this.confirmAction,
                      title: "Notificatie versturen"
                    },
                    g.a.createElement(
                      "div",
                      { className: "row" },
                      g.a.createElement(
                        "div",
                        { className: "col-sm-12 margin-10-bottom" },
                        g.a.createElement(
                          "span",
                          null,
                          this.props.reminderText
                        ),
                        g.a.createElement("br", null),
                        g.a.createElement("br", null),
                        "post" === this.props.type &&
                          g.a.createElement(
                            "p",
                            { className: "text-danger" },
                            g.a.createElement("strong", null, "Let op!"),
                            " Er is geen e-mailadres bekend. Deze herinnering zal per post moeten worden gestuurd. De PDF wordt hiervoor gedownload."
                          )
                      )
                    )
                  );
                }
              }
            ]),
            n
          );
        })(I.Component),
        je = Object(E.b)(null, function(e) {
          return {
            fetchAdministrationDetails: function(t) {
              e(Object(xe.d)(t));
            }
          };
        })(Me);
      function Le(e) {
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
          return p()(this, n);
        };
      }
      var ze = (function(e) {
        u()(n, e);
        var t = Le(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            (a = t.call(this, e)),
            v()(l()(a), "confirmAction", function(e) {
              e.preventDefault(),
                Pe.a.setIrrecoverable(a.props.invoiceId).then(function(e) {
                  y.f.push(
                    "/financieel/".concat(
                      a.props.administrationId,
                      "/notas/oninbaar"
                    )
                  );
                });
            }),
            a
          );
        }
        return (
          o()(n, [
            {
              key: "render",
              value: function() {
                return g.a.createElement(
                  Q.a,
                  {
                    closeModal: this.props.closeModal,
                    confirmAction: this.confirmAction,
                    title: "Nota oninbaar"
                  },
                  g.a.createElement(
                    "div",
                    { className: "row" },
                    g.a.createElement(
                      "div",
                      { className: "col-sm-12 margin-10-bottom" },
                      g.a.createElement(
                        "span",
                        null,
                        "Wilt u deze nota als oninbaar markeren?"
                      )
                    )
                  )
                );
              }
            }
          ]),
          n
        );
      })(I.Component);
      function Be(e, t) {
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
      function Ve(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Be(Object(n), !0).forEach(function(t) {
                v()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : Be(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var Ue = (function(e) {
          u()(n, e);
          var t = qe(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              v()(l()(a), "confirmAction", function(e) {
                if ((e.preventDefault(), !a.props.canCreateInvoices.can))
                  return (
                    a.props.setError(412, a.props.canCreateInvoices.message),
                    void a.props.closeModal()
                  );
                var t = !1;
                if ("collection" === a.props.paymentType) {
                  var n = a.state.dateCollection,
                    r = {};
                  Te.a.isEmpty(n + "") && ((r.dateCollection = !0), (t = !0)),
                    V()().isAfter(V()(n)) &&
                      ((r.dateCollection = !0), (t = !0)),
                    a.setState(Ve(Ve({}, a.state), {}, { errors: r })),
                    t ||
                      Pe.a.sendAll([a.props.invoiceId], n).then(function(e) {
                        y.f.push(
                          "/financieel/".concat(
                            a.props.administrationId,
                            "/notas/verzonden"
                          )
                        );
                      });
                } else
                  Pe.a.sendAll([a.props.invoiceId], null).then(function(e) {
                    y.f.push(
                      "/financieel/".concat(
                        a.props.administrationId,
                        "/notas/verzonden"
                      )
                    );
                  });
              }),
              v()(l()(a), "handleInputChangeDate", function(e, t) {
                a.setState(Ve(Ve({}, a.state), {}, v()({}, t, e)));
              }),
              (a.state = {
                dateCollection: "",
                errors: { dateCollection: !1 }
              }),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "render",
                value: function() {
                  var e = this.state.dateCollection;
                  return g.a.createElement(
                    Q.a,
                    {
                      closeModal: this.props.closeModal,
                      confirmAction: this.confirmAction,
                      title: "Nota verzenden",
                      buttonConfirmText: "Verzenden"
                    },
                    "collection" === this.props.paymentType &&
                      g.a.createElement(
                        "div",
                        { className: "row" },
                        g.a.createElement(Oe.a, {
                          divSize: "col-xs-12",
                          label: "Incasso datum",
                          name: "dateCollection",
                          value: e,
                          onChangeAction: this.handleInputChangeDate,
                          required: "required",
                          error: this.state.errors.dateCollection
                        })
                      ),
                    "collection" === this.props.paymentType &&
                      g.a.createElement(
                        "div",
                        { className: "row" },
                        g.a.createElement(
                          "div",
                          { className: "col-sm-12 margin-10-bottom" },
                          g.a.createElement(
                            "span",
                            null,
                            "De incasso datum moet minimaal x dagen later zijn dan de datum waarop je het sepa incasso bestand upload bij je bank. En maximaal x maanden na de upload datum. Informeer bij jou bank welke data zij handhaven.",
                            g.a.createElement("br", null),
                            g.a.createElement("br", null),
                            g.a.createElement(
                              "ul",
                              null,
                              g.a.createElement(
                                "li",
                                null,
                                "Bij Triodos is dat minimaal 2 werkdagen en maximaal 2 maanden"
                              )
                            )
                          )
                        )
                      ),
                    g.a.createElement(
                      "div",
                      { className: "row" },
                      g.a.createElement(
                        "div",
                        { className: "col-sm-12 margin-10-bottom" },
                        g.a.createElement(
                          "span",
                          null,
                          "Wilt u deze nota verzenden?"
                        )
                      )
                    )
                  );
                }
              }
            ]),
            n
          );
        })(I.Component),
        Ye = Object(E.b)(
          function(e) {
            return {
              canCreateInvoices: e.administrationDetails.canCreateInvoices
            };
          },
          function(e) {
            return {
              setError: function(t, n) {
                e(Object(k.b)(t, n));
              }
            };
          }
        )(Ue);
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
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var Ge = (function(e) {
          u()(n, e);
          var t = We(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              v()(l()(a), "showSend", function() {
                a.setState({ showSend: !a.state.showSend });
              }),
              v()(l()(a), "showSetPaid", function() {
                a.setState({ showSetPaid: !a.state.showSetPaid });
              }),
              v()(l()(a), "showSendNotification", function() {
                a.setState({
                  showSendNotification: !a.state.showSendNotification
                });
              }),
              v()(l()(a), "showSetIrrecoverable", function() {
                a.setState({
                  showSetIrrecoverable: !a.state.showSetIrrecoverable
                });
              }),
              (a.state = {
                showActionButtons: !1,
                highlightRow: "",
                showSend: !1,
                showSetPaid: !1,
                showSendNotification: !1,
                reminderText: "",
                showSetIrrecoverable: !1
              }),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "componentDidMount",
                value: function() {
                  this.props.dateReminder3
                    ? this.setState({
                        reminderText: "Wilt u de aanmaning sturen?"
                      })
                    : this.props.dateReminder2
                    ? this.setState({
                        reminderText: "Wilt u de derde herinnering sturen?"
                      })
                    : this.props.dateReminder1
                    ? this.setState({
                        reminderText: "Wilt u de tweede herinnering sturen?"
                      })
                    : this.setState({
                        reminderText: "Wilt u de eerste herinnering sturen?"
                      });
                }
              },
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
                  y.f.push("/nota/".concat(e));
                }
              },
              {
                key: "viewItem",
                value: function(e) {
                  y.f.push("/nota/inzien/".concat(e));
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = "";
                  this.props.onlyEmailInvoices &&
                    ("Geen e-mail bekend" === this.props.emailToAddress ||
                      (!this.props.iban &&
                        "collection" === this.props.paymentTypeId)) &&
                    (t = "hide"),
                    this.props.onlyPostInvoices &&
                      ("Geen e-mail bekend" !== this.props.emailToAddress ||
                        (!this.props.iban &&
                          "collection" === this.props.paymentTypeId)) &&
                      (t = "hide"),
                    (this.props.onlyEmailInvoices ||
                      this.props.onlyPostInvoices) &&
                      this.props.totalPriceInclVatAndReduction < 0 &&
                      "collection" === this.props.paymentTypeId &&
                      (t = "hide");
                  var n = this.props,
                    a = n.id,
                    r = n.number,
                    i = n.date,
                    o = n.subject,
                    s = n.orderContactFullName,
                    l = n.paymentType,
                    c = n.status,
                    u = n.daysToExpire,
                    d = n.daysLastReminder,
                    p = n.totalPriceInclVatAndReduction,
                    m = n.amountOpen,
                    f = n.emailToAddress,
                    h = n.iban,
                    v = n.subStatus,
                    I = n.invoiceInTwinfield,
                    E =
                      "in-progress" === this.props.statusId ||
                      "is-sending" === this.props.statusId ||
                      "error-making" === this.props.statusId ||
                      "error-sending" === this.props.statusId ||
                      "is-resending" === this.props.statusId
                        ? "in-progress-row"
                        : null;
                  return g.a.createElement(
                    "tr",
                    {
                      className: ""
                        .concat(this.state.highlightRow, " ")
                        .concat(t, " ")
                        .concat(E),
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
                    this.props.showSelectInvoicesToSend &&
                      g.a.createElement(
                        "td",
                        null,
                        g.a.createElement("input", {
                          type: "checkbox",
                          name: a,
                          onChange: this.props.toggleInvoiceCheck,
                          checked:
                            !!this.props.invoiceIds &&
                            this.props.invoiceIds.includes(a)
                        })
                      ),
                    g.a.createElement("td", null, r),
                    g.a.createElement(
                      "td",
                      null,
                      i ? V()(i).format("DD-MM-Y") : ""
                    ),
                    g.a.createElement(
                      "td",
                      {
                        className:
                          "Geen e-mail bekend" === f ? "warning-td" : ""
                      },
                      s || "",
                      "Geen e-mail bekend" === f && " (Geen e-mail bekend)"
                    ),
                    g.a.createElement("td", null, o || ""),
                    g.a.createElement("td", null, u),
                    g.a.createElement("td", null, d),
                    g.a.createElement(
                      "td",
                      null,
                      "€" +
                        p.toLocaleString("nl", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        }),
                      "sent" === this.props.statusId ||
                        "exported" === this.props.statusId
                        ? g.a.createElement("br", null)
                        : "",
                      "sent" === this.props.statusId ||
                        "exported" === this.props.statusId
                        ? g.a.createElement(
                            "span",
                            { class: "error-span" },
                            "€" +
                              m.toLocaleString("nl", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })
                          )
                        : ""
                    ),
                    g.a.createElement("td", null, l ? l.name : ""),
                    g.a.createElement("td", null, c ? c.name : ""),
                    g.a.createElement("td", null, v),
                    g.a.createElement(
                      "td",
                      {
                        className: h || "transfer" === l.id ? "" : "warning-td"
                      },
                      h || "transfer" === l.id ? h : "Geen IBAN bekend"
                    ),
                    g.a.createElement(
                      "td",
                      null,
                      this.state.showActionButtons
                        ? g.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.openItem(a);
                              },
                              title: "Open nota"
                            },
                            g.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-pencil mybtn-success"
                            }),
                            " "
                          )
                        : "",
                      this.state.showActionButtons
                        ? g.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.viewItem(a);
                              },
                              title: "Preview nota"
                            },
                            g.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-eye-open mybtn-success"
                            }),
                            " "
                          )
                        : "",
                      this.state.showActionButtons &&
                        "to-send" === this.props.statusId
                        ? g.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.showSend();
                              },
                              title: "Verstuur nota"
                            },
                            g.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-envelope mybtn-success"
                            }),
                            " "
                          )
                        : "",
                      this.state.showActionButtons &&
                        "error-sending" === this.props.statusId
                        ? g.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.showSend();
                              },
                              title: "Verstuur nota opnieuw"
                            },
                            g.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-envelope mybtn-success"
                            }),
                            " "
                          )
                        : "",
                      I ||
                        !this.state.showActionButtons ||
                        ("sent" !== this.props.statusId &&
                          "exported" !== this.props.statusId)
                        ? ""
                        : g.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.showSetPaid();
                              },
                              title: "Zet op betaald"
                            },
                            g.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-euro mybtn-success"
                            }),
                            " "
                          ),
                      !this.state.showActionButtons ||
                        ("sent" !== this.props.statusId &&
                          "exported" !== this.props.statusId) ||
                        this.props.dateExhortation
                        ? ""
                        : g.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.showSendNotification();
                              },
                              title: "Verstuur herinnering"
                            },
                            g.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-bullhorn mybtn-success"
                            }),
                            " "
                          ),
                      this.state.showActionButtons &&
                        "to-send" !== this.props.statusId &&
                        "in-progress" !== this.props.statusId &&
                        "is-sending" !== this.props.statusId &&
                        "error-making" !== this.props.statusId &&
                        "error-sending" !== this.props.statusId &&
                        "is-resending" !== this.props.statusId &&
                        "paid" !== this.props.statusId &&
                        "irrecoverable" !== this.props.statusId
                        ? g.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.showSetIrrecoverable();
                              },
                              title: "Zet op oninbaar"
                            },
                            g.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-remove mybtn-success"
                            }),
                            " "
                          )
                        : "",
                      this.state.showActionButtons &&
                        "to-send" === this.props.statusId
                        ? g.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: this.props.showDeleteItemModal.bind(
                                this,
                                a,
                                r
                              )
                            },
                            g.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-trash mybtn-danger"
                            }),
                            " "
                          )
                        : "",
                      this.state.showSend &&
                        g.a.createElement(Ye, {
                          paymentType: this.props.paymentTypeId,
                          closeModal: this.showSend,
                          invoiceId: a,
                          administrationId: this.props.administrationId
                        }),
                      this.state.showSetPaid &&
                        g.a.createElement(Fe, {
                          closeModal: this.showSetPaid,
                          invoiceId: a,
                          amountOpen: m,
                          administrationId: this.props.administrationId
                        }),
                      this.state.showSendNotification &&
                        g.a.createElement(je, {
                          reminderText: this.state.reminderText,
                          closeModal: this.showSendNotification,
                          invoiceId: a,
                          fetchInvoicesData: this.props.fetchInvoicesData,
                          administrationId: this.props.administrationId,
                          type: "Geen e-mail bekend" === f ? "post" : "email"
                        }),
                      this.state.showSetIrrecoverable &&
                        g.a.createElement(ze, {
                          closeModal: this.showSetIrrecoverable,
                          invoiceId: a,
                          administrationId: this.props.administrationId
                        })
                    )
                  );
                }
              }
            ]),
            n
          );
        })(I.Component),
        Ke = n(807),
        He = function(e) {
          return { type: "SET_INVOICES_PAGINATION", pagination: e };
        },
        $e = n(212);
      function Ze(e, t) {
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
      function Je(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Ze(Object(n), !0).forEach(function(t) {
                v()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : Ze(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function Xe(e) {
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
          return p()(this, n);
        };
      }
      var Qe = (function(e) {
          u()(n, e);
          var t = Xe(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              v()(l()(a), "handleInputChangeDate", function(e, t) {
                a.setState(
                  Je(
                    Je({}, a.state),
                    {},
                    { invoice: Je(Je({}, a.state.invoice), {}, v()({}, t, e)) }
                  )
                );
              }),
              v()(l()(a), "confirmAction", function(e) {
                e.preventDefault();
                var t = a.state.invoice,
                  n = {},
                  r = !1;
                Te.a.isEmpty(t.datePaid + "") && ((n.datePaid = !0), (r = !0)),
                  a.setState(Je(Je({}, a.state), {}, { errors: n }));
                var i = a.props.invoiceIds;
                r ||
                  Pe.a.setInvoicesPaid(i, t.datePaid).then(function(e) {
                    y.f.push(
                      "/financieel/".concat(
                        a.props.administrationId,
                        "/notas/betaald"
                      )
                    );
                  });
              }),
              (a.state = {
                invoice: { datePaid: V()().format("Y-MM-DD") },
                errors: { datePaid: !1 }
              }),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "render",
                value: function() {
                  var e = this.state.invoice.datePaid;
                  return g.a.createElement(
                    Q.a,
                    {
                      buttonConfirmText: "Nota's betalen",
                      closeModal: this.props.closeModal,
                      confirmAction: this.confirmAction,
                      title: "Nota's betalen"
                    },
                    g.a.createElement(
                      "div",
                      { className: "row" },
                      g.a.createElement(
                        "div",
                        { className: "col-sm-12 margin-10-bottom" },
                        g.a.createElement(
                          "span",
                          null,
                          "Wanneer de betaaldatum wordt ingevuld zal er een betaling aangemaakt worden met het openstaande bedrag."
                        )
                      )
                    ),
                    g.a.createElement(
                      "div",
                      { className: "row" },
                      g.a.createElement(Oe.a, {
                        divSize: "col-sm-12",
                        label: "Datum betaald",
                        name: "datePaid",
                        value: e,
                        onChangeAction: this.handleInputChangeDate,
                        required: "required",
                        error: this.state.errors.datePaid
                      })
                    )
                  );
                }
              }
            ]),
            n
          );
        })(I.Component),
        et = Object(E.b)(null, function(e) {
          return {
            deleteInvoiceFromGrid: function(t) {
              e(Object(Ke.c)(t));
            }
          };
        })(function(e) {
          return g.a.createElement(
            Q.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return (
                  e.deleteInvoiceFromGrid(e.id),
                  e.fetchInvoices(),
                  void e.closeDeleteItemModal()
                );
              },
              title: "Verwijderen"
            },
            "Verwijder nota: ",
            g.a.createElement("strong", null, " ", e.number, "? ")
          );
        }),
        tt = n(208);
      function nt(e, t) {
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
      function at(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? nt(Object(n), !0).forEach(function(t) {
                v()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : nt(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
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
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var it = {
          showSelectInvoicesToSend: !1,
          checkedAll: !1,
          invoiceIds: [],
          onlyEmailInvoices: !1,
          onlyPostInvoices: !1,
          showErrorMessagePost: !1,
          emailInvoicesText: "Selecteer preview e-mail nota's",
          postInvoicesText: "Selecteer preview post nota's",
          sendRemindersTextEmail: "Selecteer e-mail herinneringen",
          sendRemindersTextPost: "Selecteer post herinneringen",
          setInvoicesPaidText: "Selecteer betaalde nota's",
          showSetInvoicesPaid: !1,
          deleteItem: { id: "", fullName: "" }
        },
        ot = (function(e) {
          u()(n, e);
          var t = rt(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              v()(l()(a), "setFilter", function(e) {
                if (Object(A.isEmpty)(e)) a.props.clearFilterInvoices();
                else
                  switch (e) {
                    case "te-verzenden-incasso":
                      a.props.clearFilterInvoices(),
                        a.props.setStatusIdFilterInvoices("to-send"),
                        a.props.setPaymentTypeIdFilterInvoices("collection");
                      break;
                    case "te-verzenden-overboeken":
                      a.props.clearFilterInvoices(),
                        a.props.setStatusIdFilterInvoices("to-send"),
                        a.props.setPaymentTypeIdFilterInvoices("transfer");
                      break;
                    case "fout-verzenden-incasso":
                      a.props.clearFilterInvoices(),
                        a.props.setStatusIdFilterInvoices("error-sending"),
                        a.props.setPaymentTypeIdFilterInvoices("collection");
                      break;
                    case "fout-verzenden-overboeken":
                      a.props.clearFilterInvoices(),
                        a.props.setStatusIdFilterInvoices("error-sending"),
                        a.props.setPaymentTypeIdFilterInvoices("transfer");
                      break;
                    case "verzonden":
                      a.props.clearFilterInvoices(),
                        a.props.setStatusIdFilterInvoices("sent");
                      break;
                    case "wordt-gemaakt":
                      a.props.clearFilterInvoices(),
                        a.props.setStatusIdFilterInvoices("in-progress");
                      break;
                    case "wordt-verstuurd":
                      a.props.clearFilterInvoices(),
                        a.props.setStatusIdFilterInvoices("is-sending");
                      break;
                    case "wordt-opnieuw-verstuurd":
                      a.props.clearFilterInvoices(),
                        a.props.setStatusIdFilterInvoices("is-resending");
                      break;
                    case "geexporteerd":
                      a.props.clearFilterInvoices(),
                        a.props.setStatusIdFilterInvoices("exported");
                      break;
                    case "herinnering":
                      a.props.clearFilterInvoices(),
                        a.props.setStatusIdFilterInvoices("reminder");
                      break;
                    case "aanmaning":
                      a.props.clearFilterInvoices(),
                        a.props.setStatusIdFilterInvoices("exhortation");
                      break;
                    case "betaald":
                      a.props.clearFilterInvoices(),
                        a.props.setStatusIdFilterInvoices("paid");
                      break;
                    case "oninbaar":
                      a.props.clearFilterInvoices(),
                        a.props.setStatusIdFilterInvoices("irrecoverable");
                  }
              }),
              v()(l()(a), "fetchInvoicesData", function() {
                a.props.clearInvoices(),
                  setTimeout(function() {
                    var e = Object(re.a)(a.props.invoicesFilters),
                      t = a.props.invoicesSorts,
                      n = {
                        limit: 50,
                        offset: a.props.invoicesPagination.offset
                      },
                      r = a.props.administrationId,
                      i = a.state.onlyEmailInvoices,
                      o = a.state.onlyPostInvoices;
                    a.props.fetchInvoices(e, t, n, r, i, o);
                  }, 100),
                  a.props.fetchTotalsInfoAdministration(
                    a.props.administrationId
                  );
              }),
              v()(l()(a), "getCSV", function() {
                a.props.blockUI(),
                  setTimeout(function() {
                    var e = Object(re.a)(a.props.invoicesFilters),
                      t = a.props.invoicesSorts,
                      n = a.props.administrationId;
                    $e.a
                      .getCSV({ filters: e, sorts: t, administrationId: n })
                      .then(function(e) {
                        le()(
                          e.data,
                          "Notas-" +
                            V()().format("YYYY-MM-DD HH:mm:ss") +
                            ".csv"
                        ),
                          a.props.unblockUI();
                      })
                      .catch(function(e) {
                        a.props.unblockUI();
                      });
                  }, 100);
              }),
              v()(l()(a), "previewSend", function(e) {
                a.setState({
                  emailInvoicesText: "Preview e-mail nota's",
                  onlyEmailInvoices: !0
                }),
                  a.fetchInvoicesData(),
                  a.state.invoiceIds.length > 0
                    ? (a.props.previewSend(a.state.invoiceIds),
                      y.f.push(
                        "/financieel/"
                          .concat(
                            a.props.administrationId,
                            "/notas/te-verzenden/verzenden/email/"
                          )
                          .concat(e)
                      ))
                    : a.toggleShowCheckboxList();
              }),
              v()(l()(a), "previewSendPost", function(e) {
                a.setState({
                  postInvoicesText: "Preview post nota's",
                  onlyPostInvoices: !0
                }),
                  a.fetchInvoicesData(),
                  a.state.invoiceIds.length > 50
                    ? a.toggleErrorMessagePost()
                    : a.state.invoiceIds.length > 0
                    ? (a.props.previewSend(a.state.invoiceIds),
                      y.f.push(
                        "/financieel/"
                          .concat(
                            a.props.administrationId,
                            "/notas/te-verzenden/verzenden/post/"
                          )
                          .concat(e)
                      ))
                    : a.toggleShowCheckboxList();
              }),
              v()(l()(a), "toggleErrorMessagePost", function() {
                a.setState({
                  showErrorMessagePost: !a.state.showErrorMessagePost
                });
              }),
              v()(l()(a), "sendReminders", function() {
                a.setState({
                  sendRemindersTextEmail: "Verstuur e-mail herinneringen",
                  onlyEmailInvoices: !0
                }),
                  a.fetchInvoicesData(),
                  a.state.invoiceIds.length > 0
                    ? (a.props.previewSend(a.state.invoiceIds),
                      Pe.a
                        .sendNotifications(a.state.invoiceIds)
                        .then(function(e) {}),
                      a.toggleShowCheckboxList())
                    : a.toggleShowCheckboxList();
              }),
              v()(l()(a), "sendRemindersPost", function() {
                a.setState({
                  sendRemindersTextPost: "Verstuur post herinneringen",
                  onlyPostInvoices: !0
                }),
                  a.fetchInvoicesData(),
                  a.state.invoiceIds.length > 0
                    ? (Pe.a
                        .sendNotificationsPost(a.state.invoiceIds)
                        .then(function(e) {
                          le()(e.data, e.headers["x-filename"]);
                        }),
                      a.toggleShowCheckboxList())
                    : a.toggleShowCheckboxList();
              }),
              v()(l()(a), "toggleSetInvoicesPaid", function() {
                a.state.invoiceIds.length > 0
                  ? a.setState({
                      showSetInvoicesPaid: !0,
                      setInvoicesPaidText: "Selecteer betaalde nota's"
                    })
                  : (a.setState({
                      showSetInvoicesPaid: !1,
                      setInvoicesPaidText: "Zet nota's betaald"
                    }),
                    a.toggleShowCheckboxList());
              }),
              v()(l()(a), "closeSetMultiplePaidModel", function() {
                a.setState({
                  showSetInvoicesPaid: !1,
                  invoiceIds: [],
                  setInvoicesPaidText: "Zet nota's betaald"
                }),
                  a.toggleShowCheckboxList();
              }),
              v()(l()(a), "toggleShowCheckboxList", function() {
                a.state.showSelectInvoicesToSend
                  ? a.setState({ showSelectInvoicesToSend: !1, invoiceIds: [] })
                  : a.setState({
                      showSelectInvoicesToSend: !0,
                      invoiceIds: []
                    });
              }),
              v()(l()(a), "resetInvoiceFilters", function() {
                a.props.clearFilterInvoices(),
                  a.setFilter(a.props.filter),
                  a.fetchInvoicesData(),
                  a.setState(at({}, it));
              }),
              v()(l()(a), "onSubmitFilter", function() {
                a.props.clearInvoices(),
                  a.props.setInvoicesPagination({ page: 0, offset: 0 }),
                  a.fetchInvoicesData();
              }),
              v()(l()(a), "handleKeyUp", function(e) {
                13 === e.keyCode && a.onSubmitFilter();
              }),
              v()(l()(a), "toggleCheckedAll", function() {
                var e = event.target.checked,
                  t = [];
                e && (t = a.props.invoices.meta.invoiceIdsTotal),
                  a.setState({ invoiceIds: t, checkedAll: e });
              }),
              v()(l()(a), "toggleInvoiceCheck", function(e) {
                var t = e.target.checked,
                  n = Number(e.target.name);
                t
                  ? a.setState(
                      { invoiceIds: [].concat(R()(a.state.invoiceIds), [n]) },
                      a.checkAllInvoicesAreChecked
                    )
                  : a.setState({
                      invoiceIds: a.state.invoiceIds.filter(function(e) {
                        return e !== n;
                      }),
                      checkedAll: !1
                    });
              }),
              v()(l()(a), "showDeleteItemModal", function(e, t) {
                a.setState(
                  at(
                    at({}, a.state),
                    {},
                    {
                      showDeleteItem: !0,
                      deleteItem: at(
                        at({}, a.state.deleteItem),
                        {},
                        { id: e, number: t }
                      )
                    }
                  )
                );
              }),
              v()(l()(a), "closeDeleteItemModal", function() {
                a.setState(
                  at(
                    at({}, a.state),
                    {},
                    {
                      showDeleteItem: !1,
                      deleteItem: at(
                        at({}, a.state.deleteItem),
                        {},
                        { id: "", number: "" }
                      )
                    }
                  )
                );
              }),
              (a.state = it),
              a.setFilter(e.filter),
              (a.handlePageClick = a.handlePageClick.bind(l()(a))),
              (a.toggleInvoiceCheck = a.toggleInvoiceCheck.bind(l()(a))),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "componentDidMount",
                value: function() {
                  this.fetchInvoicesData();
                }
              },
              {
                key: "componentWillUnmount",
                value: function() {
                  this.props.clearInvoices();
                }
              },
              {
                key: "componentDidUpdate",
                value: function(e) {
                  var t = this;
                  this.props.filter !== e.filter &&
                    (this.setFilter(this.props.filter),
                    setTimeout(function() {
                      t.fetchInvoicesData();
                    }, 100),
                    this.setState(at({}, it)));
                }
              },
              {
                key: "handlePageClick",
                value: function(e) {
                  var t = e.selected,
                    n = Math.ceil(50 * t);
                  this.props.setInvoicesPagination({ page: t, offset: n }),
                    this.fetchInvoicesData();
                }
              },
              {
                key: "checkAllInvoicesAreChecked",
                value: function() {
                  this.setState({
                    checkedAll:
                      this.state.invoiceIds.length ===
                      this.props.invoices.meta.invoiceIdsTotal.length
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.invoices,
                    n = t.data,
                    a = void 0 === n ? [] : n,
                    r = t.meta,
                    i = void 0 === r ? {} : r,
                    o = "",
                    s = !0;
                  this.props.hasError
                    ? (o = "Fout bij het ophalen van nota's.")
                    : this.props.isLoading
                    ? (o = "Gegevens aan het laden.")
                    : 0 === a.length
                    ? (o = "Geen nota's gevonden!")
                    : (s = !1);
                  var l = null;
                  ("fout-verzenden-incasso" != this.props.filter &&
                    "fout-verzenden-overboeken" != this.props.filter) ||
                    (l =
                      "Een fout verzonden nota is definitief aangemaakt in Econobis, maar kon niet worden verzonden. Dit omdat het contact een fout e-mailadres heeft of omdat de mailbox niet werkte. Corrigeer het e-mailadres of zorg er voor dat de mail box weer werkt. Vervolgens kan je met bovenstaande knoppen de factuur opnieuw verzenden. Omdat de nota definitief is kan je deze niet verwijderen.");
                  var c = 0;
                  this.state.invoiceIds &&
                    (c =
                      this.props &&
                      this.props.invoices &&
                      this.props.invoices.meta &&
                      this.props.invoices.meta.invoiceIdsTotal
                        ? this.state.invoiceIds.length +
                          "/" +
                          this.props.invoices.meta.invoiceIdsTotal.length
                        : this.state.invoiceIds.length);
                  var u = 0,
                    d = 0,
                    p = 0,
                    m = 0,
                    f = 0,
                    h = 0,
                    v = null,
                    I = null,
                    E = null,
                    y = null,
                    S = null,
                    k = null,
                    w = null;
                  return (
                    this.props.totalsInfoAdministration &&
                      ((u = this.props.totalsInfoAdministration
                        .totalOrdersInProgressInvoices
                        ? this.props.totalsInfoAdministration
                            .totalOrdersInProgressInvoices
                        : 0),
                      (d = this.props.totalsInfoAdministration
                        .totalInvoicesInProgress
                        ? this.props.totalsInfoAdministration
                            .totalInvoicesInProgress
                        : 0),
                      (p = this.props.totalsInfoAdministration
                        .totalInvoicesIsSending
                        ? this.props.totalsInfoAdministration
                            .totalInvoicesIsSending
                        : 0),
                      (m = this.props.totalsInfoAdministration
                        .totalInvoicesIsResending
                        ? this.props.totalsInfoAdministration
                            .totalInvoicesIsResending
                        : 0),
                      (h +=
                        u +
                        (f = this.props.totalsInfoAdministration
                          .totalInvoicesErrorMaking
                          ? this.props.totalsInfoAdministration
                              .totalInvoicesErrorMaking
                          : 0) +
                        d +
                        m +
                        p) > 0 &&
                        ("te-verzenden-incasso" == this.props.filter ||
                          "te-verzenden-overboeken" == this.props.filter ||
                          "fout-verzenden-incasso" == this.props.filter ||
                          "fout-verzenden-overboeken" == this.props.filter ||
                          "verzonden" == this.props.filter) &&
                        ((v =
                          "Overzicht status bij het maken en verzenden nota's"),
                        u > 0 &&
                          (E =
                            "- Concept nota's die nu gemaakt worden van uit order: " +
                            u),
                        d > 0 &&
                          (y =
                            "- Concept nota's die nu definitief gemaakt worden: " +
                            d),
                        p > 0 &&
                          (S =
                            "- Definitieve nota's die nu verzonden (e-mail of PDF) worden: " +
                            p),
                        m > 0 &&
                          (k =
                            "- Definitieve nota's die nu opnieuw verzonden worden: " +
                            m),
                        f > 0 &&
                          (w =
                            '- Definitieve nota\'s met status "Fout bij maken": ' +
                            f),
                        (I =
                          "Gebruik blauwe refresh/vernieuwen knop of F5 (Command + R op Mac) om status overzicht te verversen."))),
                    g.a.createElement(
                      "div",
                      null,
                      g.a.createElement(
                        "div",
                        { className: "row" },
                        g.a.createElement(
                          "div",
                          { className: "col-md-4" },
                          g.a.createElement(
                            "div",
                            {
                              className: "btn-group btn-group-flex",
                              role: "group"
                            },
                            g.a.createElement(b.a, {
                              iconName: "glyphicon-refresh",
                              onClickAction: this.resetInvoiceFilters
                            }),
                            g.a.createElement(b.a, {
                              iconName: "glyphicon-download-alt",
                              onClickAction: this.getCSV
                            }),
                            ("to-send" ==
                              this.props.invoicesFilters.statusId.data ||
                              "error-sending" ==
                                this.props.invoicesFilters.statusId.data) &&
                              "collection" ==
                                this.props.invoicesFilters.paymentTypeId.data &&
                              !this.state.onlyPostInvoices &&
                              i.total > 0 &&
                              g.a.createElement(N.a, {
                                buttonText: this.state.emailInvoicesText,
                                onClickAction: function() {
                                  return e.previewSend("incasso");
                                }
                              }),
                            ("to-send" ==
                              this.props.invoicesFilters.statusId.data ||
                              "error-sending" ==
                                this.props.invoicesFilters.statusId.data) &&
                              "transfer" ==
                                this.props.invoicesFilters.paymentTypeId.data &&
                              !this.state.onlyPostInvoices &&
                              i.total > 0 &&
                              g.a.createElement(N.a, {
                                buttonText: this.state.emailInvoicesText,
                                onClickAction: function() {
                                  return e.previewSend("overboeken");
                                }
                              }),
                            ("to-send" ==
                              this.props.invoicesFilters.statusId.data ||
                              "error-sending" ==
                                this.props.invoicesFilters.statusId.data) &&
                              "collection" ==
                                this.props.invoicesFilters.paymentTypeId.data &&
                              !this.state.onlyEmailInvoices &&
                              i.total > 0 &&
                              g.a.createElement(N.a, {
                                buttonText: this.state.postInvoicesText,
                                onClickAction: function() {
                                  return e.previewSendPost("incasso");
                                }
                              }),
                            ("to-send" ==
                              this.props.invoicesFilters.statusId.data ||
                              "error-sending" ==
                                this.props.invoicesFilters.statusId.data) &&
                              "transfer" ==
                                this.props.invoicesFilters.paymentTypeId.data &&
                              !this.state.onlyEmailInvoices &&
                              i.total > 0 &&
                              g.a.createElement(N.a, {
                                buttonText: this.state.postInvoicesText,
                                onClickAction: function() {
                                  return e.previewSendPost("overboeken");
                                }
                              }),
                            ("reminder" ==
                              this.props.invoicesFilters.statusId.data ||
                              "to-remind" ==
                                this.props.invoicesFilters.statusId.data ||
                              "reminder_1" ===
                                this.props.invoicesFilters.statusId.data ||
                              "reminder_2" ===
                                this.props.invoicesFilters.statusId.data ||
                              "reminder_3" ===
                                this.props.invoicesFilters.statusId.data) &&
                              !this.state.onlyPostInvoices &&
                              i.total > 0 &&
                              g.a.createElement(N.a, {
                                buttonText: this.state.sendRemindersTextEmail,
                                onClickAction: function() {
                                  return e.sendReminders();
                                }
                              }),
                            ("reminder" ==
                              this.props.invoicesFilters.statusId.data ||
                              "to-remind" ==
                                this.props.invoicesFilters.statusId.data ||
                              "reminder_1" ===
                                this.props.invoicesFilters.statusId.data ||
                              "reminder_2" ===
                                this.props.invoicesFilters.statusId.data ||
                              "reminder_3" ===
                                this.props.invoicesFilters.statusId.data) &&
                              !this.state.onlyEmailInvoices &&
                              i.total > 0 &&
                              g.a.createElement(N.a, {
                                buttonText: this.state.sendRemindersTextPost,
                                onClickAction: function() {
                                  return e.sendRemindersPost();
                                }
                              }),
                            ("sent" ==
                              this.props.invoicesFilters.statusId.data ||
                              "exported" ==
                                this.props.invoicesFilters.statusId.data ||
                              "reminder" ==
                                this.props.invoicesFilters.statusId.data ||
                              "to-remind" ==
                                this.props.invoicesFilters.statusId.data ||
                              "reminder_1" ===
                                this.props.invoicesFilters.statusId.data ||
                              "reminder_2" ===
                                this.props.invoicesFilters.statusId.data ||
                              "reminder_3" ===
                                this.props.invoicesFilters.statusId.data ||
                              "exhortation" ===
                                this.props.invoicesFilters.statusId.data) &&
                              i.total > 0 &&
                              g.a.createElement(N.a, {
                                buttonText: this.state.setInvoicesPaidText,
                                onClickAction: function() {
                                  return e.toggleSetInvoicesPaid();
                                }
                              })
                          )
                        ),
                        g.a.createElement(
                          "div",
                          { className: "col-md-4" },
                          g.a.createElement(
                            "h3",
                            { className: "text-center table-title" },
                            "Nota's"
                          )
                        ),
                        g.a.createElement(
                          "div",
                          { className: "col-md-4" },
                          g.a.createElement(
                            "div",
                            { className: "row" },
                            g.a.createElement(
                              "div",
                              { className: "col-sm-12" },
                              g.a.createElement(
                                "div",
                                { className: "pull-right" },
                                "Resultaten: ",
                                i.total || 0
                              )
                            ),
                            g.a.createElement(
                              "div",
                              { className: "col-sm-12" },
                              g.a.createElement(
                                "div",
                                { className: "pull-right" },
                                "Totaal:",
                                " ",
                                i.totalPrice
                                  ? "€" +
                                      i.totalPrice.toLocaleString("nl", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                      })
                                  : "€0,00"
                              )
                            )
                          )
                        )
                      ),
                      g.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        l
                          ? g.a.createElement(
                              "div",
                              { className: "alert alert-danger" },
                              l
                            )
                          : null
                      ),
                      this.state.showSelectInvoicesToSend
                        ? g.a.createElement(
                            "div",
                            { className: "col-md-12" },
                            c
                              ? g.a.createElement(
                                  "div",
                                  { className: "alert alert-success" },
                                  "Geselecteerde nota's: ",
                                  c
                                )
                              : null
                          )
                        : g.a.createElement(
                            "div",
                            { className: "col-md-12" },
                            v
                              ? g.a.createElement(
                                  "div",
                                  { className: "alert alert-warning" },
                                  v,
                                  g.a.createElement("br", null),
                                  E
                                    ? g.a.createElement(
                                        "span",
                                        null,
                                        E,
                                        " ",
                                        g.a.createElement("br", null)
                                      )
                                    : null,
                                  y
                                    ? g.a.createElement(
                                        "span",
                                        null,
                                        y,
                                        " ",
                                        g.a.createElement("br", null)
                                      )
                                    : null,
                                  S
                                    ? g.a.createElement(
                                        "span",
                                        null,
                                        S,
                                        " ",
                                        g.a.createElement("br", null)
                                      )
                                    : null,
                                  k
                                    ? g.a.createElement(
                                        "span",
                                        null,
                                        k,
                                        " ",
                                        g.a.createElement("br", null)
                                      )
                                    : null,
                                  w
                                    ? g.a.createElement(
                                        "span",
                                        null,
                                        w,
                                        " ",
                                        g.a.createElement("br", null)
                                      )
                                    : null,
                                  g.a.createElement("br", null),
                                  " ",
                                  I
                                )
                              : null
                          ),
                      g.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        this.state.showErrorMessagePost
                          ? g.a.createElement(tt.a, {
                              closeModal: this.toggleErrorMessagePost,
                              title: "Te veel nota's geselecteerd",
                              errorMessage:
                                "Er kunnen maximaal 50 post nota's tegelijk aangemaakt worden."
                            })
                          : null
                      ),
                      g.a.createElement(
                        "form",
                        {
                          onKeyUp: this.handleKeyUp,
                          className: "margin-10-top"
                        },
                        g.a.createElement(
                          F.a,
                          null,
                          g.a.createElement(
                            x.a,
                            null,
                            g.a.createElement(he, {
                              showSelectInvoicesToSend: this.state
                                .showSelectInvoicesToSend,
                              fetchInvoicesData: this.fetchInvoicesData
                            }),
                            g.a.createElement(we, {
                              showSelectInvoicesToSend: this.state
                                .showSelectInvoicesToSend,
                              onSubmitFilter: this.onSubmitFilter,
                              toggleCheckedAll: this.toggleCheckedAll
                            })
                          ),
                          g.a.createElement(
                            _.a,
                            null,
                            s
                              ? g.a.createElement(
                                  "tr",
                                  null,
                                  g.a.createElement("td", { colSpan: 12 }, o)
                                )
                              : a.map(function(t) {
                                  return g.a.createElement(
                                    Ge,
                                    O()(
                                      {
                                        showSelectInvoicesToSend:
                                          e.state.showSelectInvoicesToSend,
                                        checkedAll: e.props.checkedAll,
                                        toggleInvoiceCheck:
                                          e.toggleInvoiceCheck,
                                        invoiceIds: e.state.invoiceIds,
                                        key: t.id
                                      },
                                      t,
                                      {
                                        showDeleteItemModal:
                                          e.showDeleteItemModal,
                                        administrationId:
                                          e.props.administrationId,
                                        fetchInvoicesData: e.fetchInvoicesData,
                                        onlyEmailInvoices:
                                          e.state.onlyEmailInvoices,
                                        onlyPostInvoices:
                                          e.state.onlyPostInvoices
                                      }
                                    )
                                  );
                                })
                          )
                        ),
                        g.a.createElement(
                          "div",
                          { className: "col-md-6 col-md-offset-3" },
                          g.a.createElement(ne.a, {
                            onPageChangeAction: this.handlePageClick,
                            totalRecords: i.total,
                            initialPage: this.props.invoicesPagination.page,
                            recordsPerPage: 50
                          })
                        )
                      ),
                      this.state.showSetInvoicesPaid &&
                        g.a.createElement(Qe, {
                          invoiceIds: this.state.invoiceIds,
                          administrationId: this.props.administrationId,
                          closeModal: this.closeSetMultiplePaidModel
                        }),
                      this.state.showDeleteItem &&
                        g.a.createElement(
                          et,
                          O()(
                            {
                              closeDeleteItemModal: this.closeDeleteItemModal,
                              fetchInvoices: this.fetchInvoicesData
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
        })(I.Component),
        st = Object(E.b)(
          function(e) {
            return {
              invoices: e.invoices.list,
              invoicesFilters: e.invoices.filters,
              invoicesSorts: e.invoices.sorts,
              invoicesPagination: e.invoices.pagination,
              isLoading: e.loadingData.isLoading,
              hasError: e.loadingData.hasError
            };
          },
          function(e) {
            return Object(z.b)(
              {
                previewSend: Ke.e,
                fetchInvoices: Ke.d,
                clearInvoices: Ke.a,
                clearFilterInvoices: ke,
                setInvoicesPagination: He,
                setStatusIdFilterInvoices: Ne,
                setPaymentTypeIdFilterInvoices: Se,
                blockUI: ie.a,
                unblockUI: ie.b
              },
              e
            );
          }
        )(ot),
        lt = n(690),
        ct = n(691),
        ut = Object(E.b)(null, function(e) {
          return {
            setPaymentInvoicesSortsFilter: function(t, n) {
              e(
                (function(e, t) {
                  return {
                    type: "SET_PAYMENT_INVOICES_SORTS_FILTER",
                    field: e,
                    order: t
                  };
                })(t, n)
              );
            }
          };
        })(function(e) {
          var t = function(t, n) {
            e.setPaymentInvoicesSortsFilter(t, n),
              setTimeout(function() {
                e.fetchPaymentInvoicesData();
              }, 100);
          };
          return g.a.createElement(
            "tr",
            { className: "thead-title" },
            g.a.createElement(M.a, {
              sortColumn: "number",
              title: "Nummer",
              width: "25%",
              setSorts: t
            }),
            g.a.createElement(M.a, {
              sortColumn: "contact",
              title: "Contact",
              width: "25%",
              setSorts: t
            }),
            g.a.createElement(M.a, {
              sortColumn: "payout",
              title: "Bedrag",
              width: "20%",
              setSorts: t
            }),
            g.a.createElement(M.a, {
              sortColumn: "statusId",
              title: "Status",
              width: "25%",
              setSorts: t
            }),
            g.a.createElement("th", { width: "5%" })
          );
        }),
        dt = function(e) {
          return { type: "SET_NUMBER_FILTER_PAYMENT_INVOICES", number: e };
        },
        pt = function(e) {
          return { type: "SET_CONTACT_FILTER_PAYMENT_INVOICES", contact: e };
        },
        mt = function(e) {
          return { type: "SET_STATUS_ID_FILTER_PAYMENT_INVOICES", statusId: e };
        },
        ft = function(e) {
          return { type: "SET_PAYOUT_FILTER_PAYMENT_INVOICES", payout: e };
        },
        ht = function() {
          return { type: "CLEAR_FILTER_PAYMENT_INVOICES" };
        },
        vt = Object(E.b)(
          function(e) {
            return {
              filters: e.paymentInvoices.filters,
              paymentInvoiceStatuses: e.systemData.paymentInvoiceStatuses
            };
          },
          function(e) {
            return Object(z.b)(
              {
                setStatusIdFilterPaymentInvoices: mt,
                setContactFilterPaymentInvoices: pt,
                setNumberFilterPaymentInvoices: dt,
                setPayoutFilterPaymentInvoices: ft
              },
              e
            );
          }
        )(function(e) {
          return g.a.createElement(
            "tr",
            { className: "thead-filter" },
            g.a.createElement(
              "th",
              null,
              g.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: e.filters.number.data,
                onChange: function(t) {
                  e.setNumberFilterPaymentInvoices(t.target.value);
                }
              })
            ),
            g.a.createElement(
              "th",
              null,
              g.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: e.filters.contact.data,
                onChange: function(t) {
                  e.setContactFilterPaymentInvoices(t.target.value);
                }
              })
            ),
            g.a.createElement(
              "th",
              null,
              g.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: e.filters.payout.data,
                onChange: function(t) {
                  e.setPayoutFilterPaymentInvoices(t.target.value);
                }
              })
            ),
            g.a.createElement(
              "th",
              null,
              g.a.createElement(
                "select",
                {
                  className: "form-control input-sm",
                  value: e.filters.statusId.data,
                  onChange: function(t) {
                    e.setStatusIdFilterPaymentInvoices(t.target.value),
                      setTimeout(function() {
                        e.onSubmitFilter();
                      }, 100);
                  }
                },
                g.a.createElement("option", null),
                e.paymentInvoiceStatuses.map(function(e) {
                  return g.a.createElement(
                    "option",
                    { key: e.id, value: e.id },
                    e.name
                  );
                })
              )
            ),
            g.a.createElement("th", null)
          );
        }),
        It = n(409);
      function gt(e) {
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
          return p()(this, n);
        };
      }
      var Et = (function(e) {
        u()(n, e);
        var t = gt(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            (a = t.call(this, e)),
            v()(l()(a), "confirmAction", function(e) {
              e.preventDefault(),
                It.a.setNotPaid(a.props.invoiceId).then(function(e) {
                  a.props.closeModal(),
                    y.f.push(
                      "/financieel/".concat(
                        a.props.administrationId,
                        "/uitkering-notas/niet-betaald"
                      )
                    );
                });
            }),
            a
          );
        }
        return (
          o()(n, [
            {
              key: "render",
              value: function() {
                return g.a.createElement(
                  Q.a,
                  {
                    closeModal: this.props.closeModal,
                    confirmAction: this.confirmAction,
                    title: "Nota niet betaald"
                  },
                  g.a.createElement(
                    "div",
                    { className: "row" },
                    g.a.createElement(
                      "div",
                      { className: "col-sm-12 margin-10-bottom" },
                      g.a.createElement(
                        "span",
                        null,
                        "Wilt u deze nota als niet betaald markeren?"
                      )
                    )
                  )
                );
              }
            }
          ]),
          n
        );
      })(I.Component);
      function yt(e) {
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
          return p()(this, n);
        };
      }
      var bt = (function(e) {
          u()(n, e);
          var t = yt(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              v()(l()(a), "showSetNotPaid", function() {
                a.setState({ showSetNotPaid: !a.state.showSetNotPaid });
              }),
              (a.state = {
                showActionButtons: !1,
                highlightRow: "",
                showSetNotPaid: !1
              }),
              a
            );
          }
          return (
            o()(n, [
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
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props,
                    n = t.id,
                    a = t.number,
                    r = t.revenueDistribution,
                    i = t.status;
                  return g.a.createElement(
                    "tr",
                    {
                      className: this.state.highlightRow,
                      onMouseEnter: function() {
                        return e.onRowEnter();
                      },
                      onMouseLeave: function() {
                        return e.onRowLeave();
                      }
                    },
                    g.a.createElement("td", null, a),
                    g.a.createElement(
                      "td",
                      null,
                      r.contact ? r.contact.fullName : ""
                    ),
                    g.a.createElement(
                      "td",
                      null,
                      "€" +
                        r.payout.toLocaleString("nl", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })
                    ),
                    g.a.createElement("td", null, i ? i.name : ""),
                    g.a.createElement(
                      "td",
                      null,
                      this.state.showActionButtons &&
                        "sent" === this.props.statusId
                        ? g.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.showSetNotPaid();
                              },
                              title: "Zet op niet betaald"
                            },
                            g.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-remove mybtn-success"
                            }),
                            " "
                          )
                        : "",
                      this.state.showSetNotPaid &&
                        g.a.createElement(Et, {
                          closeModal: this.showSetNotPaid,
                          invoiceId: n,
                          administrationId: this.props.administrationId
                        })
                    )
                  );
                }
              }
            ]),
            n
          );
        })(I.Component),
        St = function(e, t, n, a) {
          return {
            type: "FETCH_PAYMENT_INVOICES",
            filters: e,
            sorts: t,
            pagination: n,
            administrationId: a
          };
        },
        Nt = function() {
          return { type: "CLEAR_PAYMENT_INVOICES" };
        },
        kt = function(e) {
          return { type: "SET_PAYMENT_INVOICES_PAGINATION", pagination: e };
        };
      function wt(e) {
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
          return p()(this, n);
        };
      }
      var Pt = (function(e) {
          u()(n, e);
          var t = wt(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              (a = t.call(this, e)),
              v()(l()(a), "setFilter", function(e) {
                if (Object(A.isEmpty)(e)) a.props.clearFilterPaymentInvoices();
                else
                  switch (e) {
                    case "verzonden":
                      a.props.clearFilterPaymentInvoices(),
                        a.props.setStatusIdFilterPaymentInvoices("sent");
                      break;
                    case "niet-betaald":
                      a.props.clearFilterPaymentInvoices(),
                        a.props.setStatusIdFilterPaymentInvoices("not-paid");
                  }
              }),
              v()(l()(a), "fetchPaymentInvoicesData", function() {
                a.props.clearPaymentInvoices(),
                  setTimeout(function() {
                    var e = Object(re.a)(a.props.paymentInvoicesFilters),
                      t = a.props.paymentInvoicesSorts,
                      n = {
                        limit: 20,
                        offset: a.props.paymentInvoicesPagination.offset
                      },
                      r = a.props.administrationId;
                    a.props.fetchPaymentInvoices(e, t, n, r);
                  }, 100);
              }),
              v()(l()(a), "resetPaymentInvoiceFilters", function() {
                a.props.clearFilterPaymentInvoices(),
                  a.setFilter(a.props.filter),
                  a.fetchPaymentInvoicesData();
              }),
              v()(l()(a), "onSubmitFilter", function() {
                a.props.clearPaymentInvoices(),
                  a.props.setPaymentInvoicesPagination({ page: 0, offset: 0 }),
                  a.fetchPaymentInvoicesData();
              }),
              v()(l()(a), "handleKeyUp", function(e) {
                13 === e.keyCode && a.onSubmitFilter();
              }),
              a.setFilter(e.filter),
              (a.handlePageClick = a.handlePageClick.bind(l()(a))),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "componentDidMount",
                value: function() {
                  this.fetchPaymentInvoicesData();
                }
              },
              {
                key: "componentWillUnmount",
                value: function() {
                  this.props.clearPaymentInvoices();
                }
              },
              {
                key: "componentDidUpdate",
                value: function(e) {
                  var t = this;
                  this.props.filter !== e.filter &&
                    (this.setFilter(this.props.filter),
                    setTimeout(function() {
                      t.fetchPaymentInvoicesData();
                    }, 100));
                }
              },
              {
                key: "handlePageClick",
                value: function(e) {
                  var t = e.selected,
                    n = Math.ceil(20 * t);
                  this.props.setPaymentInvoicesPagination({
                    page: t,
                    offset: n
                  }),
                    this.fetchPaymentInvoicesData();
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.paymentInvoices,
                    n = t.data,
                    a = void 0 === n ? [] : n,
                    r = t.meta,
                    i = void 0 === r ? {} : r;
                  return g.a.createElement(
                    "div",
                    null,
                    g.a.createElement(
                      "div",
                      { className: "row" },
                      g.a.createElement(
                        "div",
                        { className: "col-md-4" },
                        g.a.createElement(
                          "div",
                          {
                            className: "btn-group btn-group-flex",
                            role: "group"
                          },
                          g.a.createElement(b.a, {
                            iconName: "glyphicon-refresh",
                            onClickAction: this.resetPaymentInvoiceFilters
                          })
                        )
                      ),
                      g.a.createElement(
                        "div",
                        { className: "col-md-4" },
                        g.a.createElement(
                          "h3",
                          { className: "text-center table-title" },
                          "Uitkering nota's"
                        )
                      ),
                      g.a.createElement(
                        "div",
                        { className: "col-md-4" },
                        g.a.createElement(
                          "div",
                          { className: "row" },
                          g.a.createElement(
                            "div",
                            { className: "col-sm-12" },
                            g.a.createElement(
                              "div",
                              { className: "pull-right" },
                              "Resultaten: ",
                              i.total || 0
                            )
                          ),
                          g.a.createElement(
                            "div",
                            { className: "col-sm-12" },
                            g.a.createElement(
                              "div",
                              { className: "pull-right" },
                              "Totaal:",
                              " ",
                              i.totalPrice
                                ? "€" +
                                    i.totalPrice.toLocaleString("nl", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })
                                : "€0,00"
                            )
                          )
                        )
                      )
                    ),
                    g.a.createElement(
                      "form",
                      { onKeyUp: this.handleKeyUp, className: "margin-10-top" },
                      g.a.createElement(
                        F.a,
                        null,
                        g.a.createElement(
                          x.a,
                          null,
                          g.a.createElement(ut, {
                            fetchPaymentInvoicesData: this
                              .fetchPaymentInvoicesData
                          }),
                          g.a.createElement(vt, {
                            onSubmitFilter: this.onSubmitFilter
                          })
                        ),
                        g.a.createElement(
                          _.a,
                          null,
                          0 === a.length
                            ? g.a.createElement(
                                "tr",
                                null,
                                g.a.createElement(
                                  "td",
                                  { colSpan: 6 },
                                  "Geen uitkering nota's gevonden!"
                                )
                              )
                            : a.map(function(t) {
                                return g.a.createElement(
                                  bt,
                                  O()({ key: t.id }, t, {
                                    administrationId: e.props.administrationId,
                                    fetchPaymentInvoicesData:
                                      e.fetchPaymentInvoicesData
                                  })
                                );
                              })
                        )
                      ),
                      g.a.createElement(
                        "div",
                        { className: "col-md-6 col-md-offset-3" },
                        g.a.createElement(ne.a, {
                          onPageChangeAction: this.handlePageClick,
                          totalRecords: i.total,
                          initialPage: this.props.paymentInvoicesPagination.page
                        })
                      )
                    )
                  );
                }
              }
            ]),
            n
          );
        })(I.Component),
        Ct = Object(E.b)(
          function(e) {
            return {
              paymentInvoices: e.paymentInvoices.list,
              paymentInvoicesFilters: e.paymentInvoices.filters,
              paymentInvoicesSorts: e.paymentInvoices.sorts,
              paymentInvoicesPagination: e.paymentInvoices.pagination
            };
          },
          function(e) {
            return Object(z.b)(
              {
                fetchPaymentInvoices: St,
                clearPaymentInvoices: Nt,
                clearFilterPaymentInvoices: ht,
                setPaymentInvoicesPagination: kt,
                setStatusIdFilterPaymentInvoices: mt
              },
              e
            );
          }
        )(Pt),
        Tt = Object(E.b)(function(e) {
          return { administrationDetails: e.administrationDetails };
        })(function(e) {
          var t = e.administrationDetails,
            n = e.filter,
            a = e.type,
            r = e.fetchTotalsInfoAdministration,
            i = e.totalsInfoAdministration;
          return g.a.createElement(
            g.a.Fragment,
            null,
            t.id
              ? g.a.createElement(
                  "div",
                  null,
                  "orders" === a &&
                    g.a.createElement(
                      lt.a,
                      null,
                      g.a.createElement(
                        ct.a,
                        null,
                        g.a.createElement(fe, {
                          administrationId: t.id,
                          filter: n,
                          fetchTotalsInfoAdministration: r,
                          totalsInfoAdministration: i
                        })
                      )
                    ),
                  "notas" === a &&
                    g.a.createElement(
                      lt.a,
                      null,
                      g.a.createElement(
                        ct.a,
                        null,
                        g.a.createElement(st, {
                          administrationId: t.id,
                          filter: n,
                          fetchTotalsInfoAdministration: r,
                          totalsInfoAdministration: i
                        })
                      )
                    ),
                  "uitkering-notas" === a &&
                    g.a.createElement(
                      lt.a,
                      null,
                      g.a.createElement(
                        ct.a,
                        null,
                        g.a.createElement(Ct, {
                          administrationId: t.id,
                          filter: n
                        })
                      )
                    ),
                  void 0 === a &&
                    g.a.createElement(
                      "div",
                      null,
                      "Selecteer orders of nota's."
                    )
                )
              : g.a.createElement(
                  lt.a,
                  null,
                  g.a.createElement(
                    ct.a,
                    null,
                    g.a.createElement(
                      "div",
                      null,
                      "Geen administratie gevonden"
                    )
                  )
                )
          );
        }),
        Ot = n(10),
        Dt = n.n(Ot),
        Rt = n(18),
        At = n.n(Rt),
        Ft = n(129),
        xt = n(1402),
        _t = n(1403),
        Mt = n(1404),
        jt = function(e) {
          var t = "orders",
            n = null;
          switch (e.type) {
            case "orders":
              if (!e.filter) {
                t = "orders";
                break;
              }
              switch (((n = "orders"), e.filter)) {
                case "concepten":
                  t = "orders/concepts";
                  break;
                case "aankomend":
                  t = "orders/active";
                  break;
                case "te-factureren":
                  t = "orders/to-create";
                  break;
                case "te-verzenden":
                  t = "orders/to-send";
                  break;
                case "beeindigd":
                  t = "orders/closed";
              }
              break;
            case "notas":
              if (!e.filter) {
                t = "invoices";
                break;
              }
              switch (((n = "invoices"), e.filter)) {
                case "te-verzenden-incasso":
                  t = "invoices/to-send-collection";
                  break;
                case "te-verzenden-overboeken":
                  t = "invoices/to-send-transfer";
                  break;
                case "fout-verzenden-incasso":
                  t = "invoices/error-sending-collection";
                  break;
                case "fout-verzenden-overboeken":
                  t = "invoices/error-sending-transfer";
                  break;
                case "verzonden":
                  t = "invoices/sent";
                  break;
                case "geexporteerd":
                  t = "invoices/exported";
                  break;
                case "herinnering":
                  t = "invoices/reminder";
                  break;
                case "aanmaning":
                  t = "invoices/exhortation";
                  break;
                case "betaald":
                  t = "invoices/paid";
                  break;
                case "oninbaar":
                  t = "invoices/irrecoverable";
              }
              break;
            case "uitkering-notas":
              if (!e.filter) {
                t = "payment-invoices";
                break;
              }
              switch (((n = "payment-invoices"), e.filter)) {
                case "verzonden":
                  t = "payment-invoices/sent";
                  break;
                case "niet-betaald":
                  t = "payment-invoices/not-paid";
              }
          }
          return { activeMenuItem: t, activeParent: n };
        };
      function Lt(e) {
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
          return p()(this, n);
        };
      }
      var zt = (function(e) {
          u()(n, e);
          var t = Lt(n);
          function n(e) {
            var a;
            r()(this, n), (a = t.call(this, e));
            var i = jt(e.currentRouteParams);
            return (
              (a.state = {
                activeMenuItem: i.activeMenuItem,
                activeParent: i.activeParent
              }),
              (a.onItemClick = a.onItemClick.bind(l()(a))),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  if (
                    this.props.currentRouteParams.type !==
                      e.currentRouteParams.type ||
                    this.props.currentRouteParams.filter !==
                      e.currentRouteParams.filter
                  ) {
                    var t = jt(e.currentRouteParams);
                    this.setState({
                      activeParent: t.activeParent,
                      activeMenuItem: t.activeMenuItem
                    });
                  }
                }
              },
              {
                key: "onItemClick",
                value: function(e, t) {
                  this.props.fetchTotalsInfoAdministration(
                    this.props.currentRouteParams.id
                  ),
                    t
                      ? this.setState({ activeParent: t, activeMenuItem: e })
                      : this.setState({
                          activeParent: null,
                          activeMenuItem: e
                        });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this;
                  return g.a.createElement(
                    "nav",
                    { className: "financial-tree open sticky" },
                    g.a.createElement(
                      "div",
                      {
                        className: "financial-tree-sidebar-menu",
                        style: { color: "$brand-primary" }
                      },
                      g.a.createElement(
                        Dt.a,
                        {
                          highlightColor: "$brand-primary",
                          highlightBgColor: "#e5e5e5",
                          hoverBgColor: "#F1EFF0",
                          selected: this.state.activeMenuItem,
                          onItemSelection: function(t, n) {
                            e.onItemClick(t, n);
                          }
                        },
                        g.a.createElement(
                          Ot.Nav,
                          {
                            id: "orders",
                            expanded: "orders" === this.state.activeParent
                          },
                          g.a.createElement(
                            Ot.NavIcon,
                            null,
                            g.a.createElement(At.a, {
                              size: 20,
                              icon: xt.file,
                              style: { color: "$brand-primary" }
                            })
                          ),
                          g.a.createElement(
                            Ot.NavText,
                            null,
                            g.a.createElement(
                              y.b,
                              {
                                className: "financial-tree-link-header",
                                to: "financieel/".concat(
                                  this.props.id,
                                  "/orders"
                                )
                              },
                              "Alle orders(",
                              this.props.totalsInfoAdministration.totalOrders,
                              ")"
                            )
                          ),
                          g.a.createElement(
                            Ot.Nav,
                            { id: "concepts" },
                            g.a.createElement(
                              Ot.NavText,
                              null,
                              g.a.createElement(
                                y.b,
                                {
                                  className: "financial-tree-link",
                                  to: "financieel/".concat(
                                    this.props.id,
                                    "/orders/concepten"
                                  )
                                },
                                "Concept orders(",
                                this.props.totalsInfoAdministration
                                  .totalOrdersConcepts,
                                ")"
                              )
                            )
                          ),
                          g.a.createElement(
                            Ot.Nav,
                            { id: "active" },
                            g.a.createElement(
                              Ot.NavText,
                              null,
                              g.a.createElement(
                                y.b,
                                {
                                  className: "financial-tree-link",
                                  to: "financieel/".concat(
                                    this.props.id,
                                    "/orders/aankomend"
                                  )
                                },
                                "Actief - toekomstig orders(",
                                this.props.totalsInfoAdministration
                                  .totalOrdersUpcoming,
                                ")"
                              )
                            )
                          ),
                          g.a.createElement(
                            Ot.Nav,
                            { id: "to-create" },
                            g.a.createElement(
                              Ot.NavText,
                              null,
                              g.a.createElement(
                                y.b,
                                {
                                  className: "financial-tree-link",
                                  to: "financieel/".concat(
                                    this.props.id,
                                    "/orders/te-factureren"
                                  )
                                },
                                " ",
                                "Actief - te factureren orders(",
                                this.props.totalsInfoAdministration
                                  .totalOrdersToCreateInvoices,
                                ")"
                              )
                            )
                          ),
                          g.a.createElement(
                            Ot.Nav,
                            { id: "to-send" },
                            g.a.createElement(
                              Ot.NavText,
                              null,
                              g.a.createElement(
                                y.b,
                                {
                                  className: "financial-tree-link",
                                  to: "financieel/".concat(
                                    this.props.id,
                                    "/orders/te-verzenden"
                                  )
                                },
                                " ",
                                "Actief - te verzenden orders(",
                                this.props.totalsInfoAdministration
                                  .totalOrdersToSendInvoices,
                                ")"
                              )
                            )
                          ),
                          g.a.createElement(
                            Ot.Nav,
                            { id: "closed" },
                            g.a.createElement(
                              Ot.NavText,
                              null,
                              g.a.createElement(
                                y.b,
                                {
                                  className: "financial-tree-link",
                                  to: "financieel/".concat(
                                    this.props.id,
                                    "/orders/beeindigd"
                                  )
                                },
                                "Beëindigde orders(",
                                this.props.totalsInfoAdministration
                                  .totalOrdersClosed,
                                ")"
                              )
                            )
                          )
                        ),
                        g.a.createElement(
                          Ot.Nav,
                          {
                            id: "invoices",
                            expanded: "invoices" === this.state.activeParent
                          },
                          g.a.createElement(
                            Ot.NavIcon,
                            null,
                            g.a.createElement(At.a, {
                              size: 20,
                              icon: _t.fileText,
                              style: { color: "$brand-primary" }
                            })
                          ),
                          g.a.createElement(
                            Ot.NavText,
                            null,
                            g.a.createElement(
                              y.b,
                              {
                                className: "financial-tree-link-header",
                                to: "financieel/".concat(
                                  this.props.id,
                                  "/notas"
                                )
                              },
                              "Alle nota's(",
                              this.props.totalsInfoAdministration.totalInvoices,
                              ")"
                            )
                          ),
                          g.a.createElement(
                            Ot.Nav,
                            { id: "to-send-collection" },
                            g.a.createElement(
                              Ot.NavText,
                              null,
                              g.a.createElement(
                                y.b,
                                {
                                  className: "financial-tree-link",
                                  to: "financieel/".concat(
                                    this.props.id,
                                    "/notas/te-verzenden-incasso"
                                  )
                                },
                                "Te verzenden - incasso nota's(",
                                this.props.totalsInfoAdministration
                                  .totalInvoicesToSendCollection,
                                ")"
                              )
                            )
                          ),
                          g.a.createElement(
                            Ot.Nav,
                            { id: "to-send-transfer" },
                            g.a.createElement(
                              Ot.NavText,
                              null,
                              g.a.createElement(
                                y.b,
                                {
                                  className: "financial-tree-link",
                                  to: "financieel/".concat(
                                    this.props.id,
                                    "/notas/te-verzenden-overboeken"
                                  )
                                },
                                "Te verzenden - overboek nota's(",
                                this.props.totalsInfoAdministration
                                  .totalInvoicesToSendTransfer,
                                ")"
                              )
                            )
                          ),
                          g.a.createElement(
                            Ot.Nav,
                            { id: "error-sending-collection" },
                            g.a.createElement(
                              Ot.NavText,
                              null,
                              g.a.createElement(
                                y.b,
                                {
                                  className: "financial-tree-link",
                                  to: "financieel/".concat(
                                    this.props.id,
                                    "/notas/fout-verzenden-incasso"
                                  )
                                },
                                "Opnieuw te verzenden - incasso nota's(",
                                this.props.totalsInfoAdministration
                                  .totalInvoicesErrorSendingCollection,
                                ")"
                              )
                            )
                          ),
                          g.a.createElement(
                            Ot.Nav,
                            { id: "error-sending-transfer" },
                            g.a.createElement(
                              Ot.NavText,
                              null,
                              g.a.createElement(
                                y.b,
                                {
                                  className: "financial-tree-link",
                                  to: "financieel/".concat(
                                    this.props.id,
                                    "/notas/fout-verzenden-overboeken"
                                  )
                                },
                                "Opnieuw te verzenden - overboek nota's(",
                                this.props.totalsInfoAdministration
                                  .totalInvoicesErrorSendingTransfer,
                                ")"
                              )
                            )
                          ),
                          g.a.createElement(
                            Ot.Nav,
                            { id: "sent" },
                            g.a.createElement(
                              Ot.NavText,
                              null,
                              g.a.createElement(
                                y.b,
                                {
                                  className: "financial-tree-link",
                                  to: "financieel/".concat(
                                    this.props.id,
                                    "/notas/verzonden"
                                  )
                                },
                                "Verzonden(",
                                this.props.totalsInfoAdministration
                                  .totalInvoicesSent,
                                ")"
                              )
                            )
                          ),
                          (this.props.administrationDetails
                            .totalInvoicesExported > 0 ||
                            this.props.administrationDetails
                              .twinfieldIsValid) &&
                            g.a.createElement(
                              Ot.Nav,
                              { id: "exported" },
                              g.a.createElement(
                                Ot.NavText,
                                null,
                                g.a.createElement(
                                  y.b,
                                  {
                                    className: "financial-tree-link",
                                    to: "financieel/".concat(
                                      this.props.id,
                                      "/notas/geexporteerd"
                                    )
                                  },
                                  "Verzonden geboekt(",
                                  this.props.totalsInfoAdministration
                                    .totalInvoicesExported,
                                  ")"
                                )
                              )
                            ),
                          g.a.createElement(
                            Ot.Nav,
                            { id: "reminder" },
                            g.a.createElement(
                              Ot.NavText,
                              null,
                              g.a.createElement(
                                y.b,
                                {
                                  className: "financial-tree-link",
                                  to: "financieel/".concat(
                                    this.props.id,
                                    "/notas/herinnering"
                                  )
                                },
                                "Herinnering(",
                                this.props.totalsInfoAdministration
                                  .totalInvoicesReminder,
                                ")"
                              )
                            )
                          ),
                          g.a.createElement(
                            Ot.Nav,
                            { id: "exhortation" },
                            g.a.createElement(
                              Ot.NavText,
                              null,
                              g.a.createElement(
                                y.b,
                                {
                                  className: "financial-tree-link",
                                  to: "financieel/".concat(
                                    this.props.id,
                                    "/notas/aanmaning"
                                  )
                                },
                                "Aanmaning(",
                                this.props.totalsInfoAdministration
                                  .totalInvoicesExhortation,
                                ")"
                              )
                            )
                          ),
                          g.a.createElement(
                            Ot.Nav,
                            { id: "paid" },
                            g.a.createElement(
                              Ot.NavText,
                              null,
                              g.a.createElement(
                                y.b,
                                {
                                  className: "financial-tree-link",
                                  to: "financieel/".concat(
                                    this.props.id,
                                    "/notas/betaald"
                                  )
                                },
                                "Betaald(",
                                this.props.totalsInfoAdministration
                                  .totalInvoicesPaid,
                                ")"
                              )
                            )
                          ),
                          g.a.createElement(
                            Ot.Nav,
                            { id: "irrecoverable" },
                            g.a.createElement(
                              Ot.NavText,
                              null,
                              g.a.createElement(
                                y.b,
                                {
                                  className: "financial-tree-link",
                                  to: "financieel/".concat(
                                    this.props.id,
                                    "/notas/oninbaar"
                                  )
                                },
                                "Oninbaar(",
                                this.props.totalsInfoAdministration
                                  .totalInvoicesIrrecoverable,
                                ")"
                              )
                            )
                          )
                        ),
                        g.a.createElement(
                          Ot.Nav,
                          {
                            id: "payment-invoices",
                            expanded:
                              "payment-invoices" === this.state.activeParent
                          },
                          g.a.createElement(
                            Ot.NavIcon,
                            null,
                            g.a.createElement(At.a, {
                              size: 20,
                              icon: Mt.fileO,
                              style: { color: "$brand-primary" }
                            })
                          ),
                          g.a.createElement(
                            Ot.NavText,
                            null,
                            g.a.createElement(
                              y.b,
                              {
                                className: "financial-tree-link-header",
                                to: "financieel/".concat(
                                  this.props.id,
                                  "/uitkering-notas"
                                )
                              },
                              "Uitkering nota's(",
                              this.props.totalsInfoAdministration
                                .totalPaymentInvoices,
                              ")"
                            )
                          ),
                          g.a.createElement(
                            Ot.Nav,
                            { id: "sent" },
                            g.a.createElement(
                              Ot.NavText,
                              null,
                              g.a.createElement(
                                y.b,
                                {
                                  className: "financial-tree-link",
                                  to: "financieel/".concat(
                                    this.props.id,
                                    "/uitkering-notas/verzonden"
                                  )
                                },
                                "Verzonden(",
                                this.props.administrationDetails
                                  .totalPaymentInvoicesSent,
                                ") | (",
                                this.props.totalsInfoAdministration
                                  .totalPaymentInvoicesSent,
                                ")"
                              )
                            )
                          ),
                          g.a.createElement(
                            Ot.Nav,
                            { id: "not-paid" },
                            g.a.createElement(
                              Ot.NavText,
                              null,
                              g.a.createElement(
                                y.b,
                                {
                                  className: "financial-tree-link",
                                  to: "financieel/".concat(
                                    this.props.id,
                                    "/uitkering-notas/niet-betaald"
                                  )
                                },
                                "Niet betaald(",
                                this.props.totalsInfoAdministration
                                  .totalPaymentInvoicesNotPaid,
                                ")"
                              )
                            )
                          )
                        ),
                        g.a.createElement(
                          Ot.Nav,
                          { id: "administration-settings" },
                          g.a.createElement(
                            Ot.NavIcon,
                            null,
                            g.a.createElement(At.a, {
                              size: 20,
                              icon: Ft.cog,
                              style: { color: "$brand-primary" }
                            })
                          ),
                          g.a.createElement(
                            Ot.NavText,
                            null,
                            g.a.createElement(
                              y.b,
                              {
                                className: "financial-tree-link-header",
                                to: "administratie/".concat(this.props.id)
                              },
                              "Instellingen"
                            )
                          )
                        )
                      )
                    )
                  );
                }
              }
            ]),
            n
          );
        })(I.Component),
        Bt = Object(E.b)(function(e) {
          return {
            permissions: e.meDetails.permissions,
            id: e.administrationDetails.id,
            administrationDetails: e.administrationDetails
          };
        })(zt);
      function Vt(e) {
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
          return p()(this, n);
        };
      }
      var qt = (function(e) {
        u()(n, e);
        var t = Vt(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            (a = t.call(this, e)),
            v()(l()(a), "fetchTotalsInfoAdministration", function(e) {
              S.a.fetchTotalsInfoAdministration(e).then(function(e) {
                a.setState({ totalsInfoAdministration: e });
              });
            }),
            (a.state = { totalsInfoAdministration: [] }),
            a
          );
        }
        return (
          o()(n, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchAdministrationDetails(this.props.params.id),
                  this.fetchTotalsInfoAdministration(this.props.params.id);
              }
            },
            {
              key: "componentDidUpdate",
              value: function(e) {
                this.props.params.id !== e.params.id &&
                  (this.props.fetchAdministrationDetails(this.props.params.id),
                  this.fetchTotalsInfoAdministration(this.props.params.id));
              }
            },
            {
              key: "render",
              value: function() {
                return g.a.createElement(
                  "div",
                  { className: "row" },
                  g.a.createElement(
                    "div",
                    { className: "col-md-3" },
                    g.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      g.a.createElement(
                        lt.a,
                        null,
                        g.a.createElement(
                          ct.a,
                          { className: "panel-financial-tree" },
                          g.a.createElement(Bt, {
                            currentRouteParams: this.props.params,
                            fetchTotalsInfoAdministration: this
                              .fetchTotalsInfoAdministration,
                            totalsInfoAdministration: this.state
                              .totalsInfoAdministration
                          })
                        )
                      )
                    )
                  ),
                  g.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    g.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      g.a.createElement(
                        lt.a,
                        null,
                        g.a.createElement(
                          ct.a,
                          { className: "panel-small" },
                          g.a.createElement(C, null)
                        )
                      )
                    ),
                    g.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      g.a.createElement(Tt, {
                        type: this.props.params.type,
                        filter: this.props.params.filter,
                        administrationId: this.props.params.administrationId,
                        fetchTotalsInfoAdministration: this
                          .fetchTotalsInfoAdministration,
                        totalsInfoAdministration: this.state
                          .totalsInfoAdministration
                      })
                    )
                  )
                );
              }
            }
          ]),
          n
        );
      })(I.Component);
      t.default = Object(E.b)(null, function(e) {
        return {
          fetchAdministrationDetails: function(t) {
            e(Object(xe.d)(t));
          }
        };
      })(qt);
    },
    690: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        i = n(8),
        o = n.n(i),
        s = function(e) {
          var t = e.children,
            n = e.className,
            a = e.onMouseEnter,
            i = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(n),
              onMouseEnter: a,
              onMouseLeave: i
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
          className: o.a.string,
          onMouseEnter: o.a.func,
          onMouseLeave: o.a.func
        }),
        (t.a = s);
    },
    691: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        i = n(8),
        o = n.n(i),
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
        (s.propTypes = { className: o.a.string }),
        (t.a = s);
    },
    692: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        i = n(8),
        o = n.n(i),
        s = function(e) {
          var t = e.buttonClassName,
            n = e.buttonText,
            a = e.onClickAction,
            i = e.type,
            o = e.value,
            s = e.loading,
            l = e.loadText,
            c = e.disabled;
          return s
            ? r.a.createElement(
                "button",
                {
                  type: i,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: o,
                  disabled: s
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
                  type: i,
                  className: "btn btn-sm ".concat(t),
                  onClick: a,
                  value: o,
                  disabled: c
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
          buttonClassName: o.a.string,
          buttonText: o.a.string.isRequired,
          onClickAction: o.a.func,
          type: o.a.string,
          value: o.a.string,
          loading: o.a.bool,
          loadText: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = s);
    },
    693: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        i = n(8),
        o = n.n(i),
        s = function(e) {
          var t = e.buttonClassName,
            n = e.iconName,
            a = e.onClickAction,
            i = e.title,
            o = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: a,
              disabled: o,
              title: i
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
          buttonClassName: o.a.string,
          iconName: o.a.string.isRequired,
          onClickAction: o.a.func,
          title: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = s);
    },
    699: function(e, t, n) {
      "use strict";
      var a = n(24),
        r = n.n(a),
        i = n(25),
        o = n.n(i),
        s = n(22),
        l = n.n(s),
        c = n(26),
        u = n.n(c),
        d = n(27),
        p = n.n(d),
        m = n(16),
        f = n.n(m),
        h = n(6),
        v = n.n(h),
        I = n(0),
        g = n.n(I),
        E = n(8),
        y = n.n(E),
        b = n(707),
        S = n.n(b),
        N = n(708),
        k = n.n(N),
        w = n(7),
        P = n.n(w);
      function C(e) {
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
          return p()(this, n);
        };
      }
      P.a.locale("nl");
      var T = (function(e) {
        u()(n, e);
        var t = C(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            (a = t.call(this, e)),
            v()(l()(a), "validateDate", function(e) {
              var t = P()(e.target.value, "DD-MM-YYYY", !0),
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
            v()(l()(a), "onDateChange", function(e) {
              var t = e ? P()(e).format("Y-MM-DD") : "",
                n = !1;
              t &&
                a.props.disabledBefore &&
                P()(t).isBefore(a.props.disabledBefore) &&
                (n = !0),
                t &&
                  a.props.disabledAfter &&
                  P()(t).isAfter(a.props.disabledAfter) &&
                  (n = !0),
                a.setState({ errorDateFormat: n }),
                !n && a.props.onChangeAction(t, a.props.name);
            }),
            (a.state = { errorDateFormat: !1 }),
            a
          );
        }
        return (
          o()(n, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.label,
                  n = e.className,
                  a = e.size,
                  r = e.divSize,
                  i = e.id,
                  o = e.value,
                  s = e.required,
                  l = e.readOnly,
                  c = e.name,
                  u = e.error,
                  d = e.errorMessage,
                  p = e.disabledBefore,
                  m = e.disabledAfter,
                  f = o ? P()(o).format("L") : "",
                  h = {};
                return (
                  p && (h.before = new Date(p)),
                  m && (h.after = new Date(m)),
                  g.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    g.a.createElement(
                      "div",
                      null,
                      g.a.createElement(
                        "label",
                        { htmlFor: i, className: "col-sm-6 ".concat(s) },
                        t
                      )
                    ),
                    g.a.createElement(
                      "div",
                      { className: "".concat(a) },
                      g.a.createElement(S.a, {
                        id: i,
                        value: f,
                        formatDate: N.formatDate,
                        parseDate: N.parseDate,
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
                            "form-control input-sm ".concat(n) +
                            (this.state.errorDateFormat || u
                              ? " has-error"
                              : ""),
                          name: c,
                          onBlur: this.validateDate,
                          autoComplete: "off",
                          readOnly: l,
                          disabled: l
                        },
                        required: s,
                        readOnly: l,
                        placeholder: ""
                      })
                    ),
                    u &&
                      g.a.createElement(
                        "div",
                        { className: "col-sm-offset-6 col-sm-6" },
                        g.a.createElement(
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
          n
        );
      })(I.Component);
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
        (t.a = T);
    },
    711: function(e, t) {
      e.exports = function(e, t, n, a) {
        var r = new Blob(void 0 !== a ? [a, e] : [e], {
          type: n || "application/octet-stream"
        });
        if (void 0 !== window.navigator.msSaveBlob)
          window.navigator.msSaveBlob(r, t);
        else {
          var i =
              window.URL && window.URL.createObjectURL
                ? window.URL.createObjectURL(r)
                : window.webkitURL.createObjectURL(r),
            o = document.createElement("a");
          (o.style.display = "none"),
            (o.href = i),
            o.setAttribute("download", t),
            void 0 === o.download && o.setAttribute("target", "_blank"),
            document.body.appendChild(o),
            o.click(),
            setTimeout(function() {
              document.body.removeChild(o), window.URL.revokeObjectURL(i);
            }, 200);
        }
      };
    },
    712: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        i = n(8),
        o = n.n(i),
        s = n(717),
        l = n.n(s),
        c = function(e) {
          var t = e.onPageChangeAction,
            n = e.initialPage,
            a = e.recordsPerPage,
            i = e.totalRecords;
          return r.a.createElement(l.a, {
            onPageChange: t,
            pageCount: Math.ceil(i / a) || 1,
            pageRangeDisplayed: 5,
            marginPagesDisplayed: 2,
            breakLabel: r.a.createElement("a", null, "..."),
            breakClassName: "break-me",
            containerClassName: "pagination",
            activeClassName: "active",
            previousLabel: r.a.createElement(
              "span",
              { "aria-hidden": "true" },
              "«"
            ),
            nextLabel: r.a.createElement(
              "span",
              { "aria-hidden": "true" },
              "»"
            ),
            initialPage: n || 0,
            forcePage: n,
            disableInitialCallback: !0
          });
        };
      (c.defaultProps = { recordsPerPage: 20 }),
        (c.propTypes = {
          initialPage: o.a.number.isRequired,
          recordsPerPage: o.a.number,
          totalRecords: o.a.number,
          onPageChangeAction: o.a.func.isRequired
        }),
        (t.a = c);
    },
    717: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a,
        r = n(718),
        i = (a = r) && a.__esModule ? a : { default: a };
      t.default = i.default;
    },
    718: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = (function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var a = t[n];
              (a.enumerable = a.enumerable || !1),
                (a.configurable = !0),
                "value" in a && (a.writable = !0),
                Object.defineProperty(e, a.key, a);
            }
          }
          return function(t, n, a) {
            return n && e(t.prototype, n), a && e(t, a), t;
          };
        })(),
        r = n(0),
        i = c(r),
        o = c(n(8)),
        s = c(n(719)),
        l = c(n(720));
      function c(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var u = (function(e) {
        function t(e) {
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, t);
          var n = (function(e, t) {
            if (!e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return !t || ("object" != typeof t && "function" != typeof t)
              ? e
              : t;
          })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
          return (
            (n.handlePreviousPage = function(e) {
              var t = n.state.selected;
              e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
                t > 0 && n.handlePageSelected(t - 1, e);
            }),
            (n.handleNextPage = function(e) {
              var t = n.state.selected,
                a = n.props.pageCount;
              e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
                t < a - 1 && n.handlePageSelected(t + 1, e);
            }),
            (n.handlePageSelected = function(e, t) {
              t.preventDefault ? t.preventDefault() : (t.returnValue = !1),
                n.state.selected !== e &&
                  (n.setState({ selected: e }), n.callCallback(e));
            }),
            (n.callCallback = function(e) {
              void 0 !== n.props.onPageChange &&
                "function" == typeof n.props.onPageChange &&
                n.props.onPageChange({ selected: e });
            }),
            (n.pagination = function() {
              var e = [],
                t = n.props,
                a = t.pageRangeDisplayed,
                r = t.pageCount,
                o = t.marginPagesDisplayed,
                s = t.breakLabel,
                c = t.breakClassName,
                u = n.state.selected;
              if (r <= a)
                for (var d = 0; d < r; d++) e.push(n.getPageElement(d));
              else {
                var p = a / 2,
                  m = a - p;
                u > r - a / 2
                  ? (p = a - (m = r - u))
                  : u < a / 2 && (m = a - (p = u));
                var f = void 0,
                  h = void 0,
                  v = void 0,
                  I = function(e) {
                    return n.getPageElement(e);
                  };
                for (f = 0; f < r; f++)
                  (h = f + 1) <= o || h > r - o || (f >= u - p && f <= u + m)
                    ? e.push(I(f))
                    : s &&
                      e[e.length - 1] !== v &&
                      ((v = i.default.createElement(l.default, {
                        key: f,
                        breakLabel: s,
                        breakClassName: c
                      })),
                      e.push(v));
              }
              return e;
            }),
            (n.state = {
              selected: e.initialPage
                ? e.initialPage
                : e.forcePage
                ? e.forcePage
                : 0
            }),
            n
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
          a(t, [
            {
              key: "componentDidMount",
              value: function() {
                var e = this.props,
                  t = e.initialPage,
                  n = e.disableInitialCallback;
                void 0 === t || n || this.callCallback(t);
              }
            },
            {
              key: "componentWillReceiveProps",
              value: function(e) {
                void 0 !== e.forcePage &&
                  this.props.forcePage !== e.forcePage &&
                  this.setState({ selected: e.forcePage });
              }
            },
            {
              key: "hrefBuilder",
              value: function(e) {
                var t = this.props,
                  n = t.hrefBuilder,
                  a = t.pageCount;
                if (n && e !== this.state.selected && e >= 0 && e < a)
                  return n(e + 1);
              }
            },
            {
              key: "getPageElement",
              value: function(e) {
                var t = this.state.selected,
                  n = this.props,
                  a = n.pageClassName,
                  r = n.pageLinkClassName,
                  o = n.activeClassName,
                  l = n.activeLinkClassName,
                  c = n.extraAriaContext;
                return i.default.createElement(s.default, {
                  key: e,
                  onClick: this.handlePageSelected.bind(null, e),
                  selected: t === e,
                  pageClassName: a,
                  pageLinkClassName: r,
                  activeClassName: o,
                  activeLinkClassName: l,
                  extraAriaContext: c,
                  href: this.hrefBuilder(e),
                  page: e + 1
                });
              }
            },
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.disabledClassName,
                  n = e.previousClassName,
                  a = e.nextClassName,
                  r = e.pageCount,
                  o = e.containerClassName,
                  s = e.previousLinkClassName,
                  l = e.previousLabel,
                  c = e.nextLinkClassName,
                  u = e.nextLabel,
                  d = this.state.selected,
                  p = n + (0 === d ? " " + t : ""),
                  m = a + (d === r - 1 ? " " + t : "");
                return i.default.createElement(
                  "ul",
                  { className: o },
                  i.default.createElement(
                    "li",
                    { className: p },
                    i.default.createElement(
                      "a",
                      {
                        onClick: this.handlePreviousPage,
                        className: s,
                        href: this.hrefBuilder(d - 1),
                        tabIndex: "0",
                        role: "button",
                        onKeyPress: this.handlePreviousPage
                      },
                      l
                    )
                  ),
                  this.pagination(),
                  i.default.createElement(
                    "li",
                    { className: m },
                    i.default.createElement(
                      "a",
                      {
                        onClick: this.handleNextPage,
                        className: c,
                        href: this.hrefBuilder(d + 1),
                        tabIndex: "0",
                        role: "button",
                        onKeyPress: this.handleNextPage
                      },
                      u
                    )
                  )
                );
              }
            }
          ]),
          t
        );
      })(r.Component);
      (u.propTypes = {
        pageCount: o.default.number.isRequired,
        pageRangeDisplayed: o.default.number.isRequired,
        marginPagesDisplayed: o.default.number.isRequired,
        previousLabel: o.default.node,
        nextLabel: o.default.node,
        breakLabel: o.default.node,
        hrefBuilder: o.default.func,
        onPageChange: o.default.func,
        initialPage: o.default.number,
        forcePage: o.default.number,
        disableInitialCallback: o.default.bool,
        containerClassName: o.default.string,
        pageClassName: o.default.string,
        pageLinkClassName: o.default.string,
        activeClassName: o.default.string,
        activeLinkClassName: o.default.string,
        previousClassName: o.default.string,
        nextClassName: o.default.string,
        previousLinkClassName: o.default.string,
        nextLinkClassName: o.default.string,
        disabledClassName: o.default.string,
        breakClassName: o.default.string
      }),
        (u.defaultProps = {
          pageCount: 10,
          pageRangeDisplayed: 2,
          marginPagesDisplayed: 3,
          activeClassName: "selected",
          previousClassName: "previous",
          nextClassName: "next",
          previousLabel: "Previous",
          nextLabel: "Next",
          breakLabel: "...",
          disabledClassName: "disabled",
          disableInitialCallback: !1
        }),
        (t.default = u);
    },
    719: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a,
        r = n(0),
        i = (a = r) && a.__esModule ? a : { default: a };
      t.default = function(e) {
        var t = e.pageClassName,
          n = e.pageLinkClassName,
          a = e.onClick,
          r = e.href,
          o =
            "Page " +
            e.page +
            (e.extraAriaContext ? " " + e.extraAriaContext : ""),
          s = null;
        return (
          e.selected &&
            ((s = "page"),
            (o = "Page " + e.page + " is your current page"),
            (t =
              void 0 !== t ? t + " " + e.activeClassName : e.activeClassName),
            void 0 !== n
              ? ((n = n),
                void 0 !== e.activeLinkClassName &&
                  (n = n + " " + e.activeLinkClassName))
              : (n = e.activeLinkClassName)),
          i.default.createElement(
            "li",
            { className: t },
            i.default.createElement(
              "a",
              {
                onClick: a,
                role: "button",
                className: n,
                href: r,
                tabIndex: "0",
                "aria-label": o,
                "aria-current": s,
                onKeyPress: a
              },
              e.page
            )
          )
        );
      };
    },
    720: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a,
        r = n(0),
        i = (a = r) && a.__esModule ? a : { default: a };
      t.default = function(e) {
        var t = e.breakLabel,
          n = e.breakClassName || "break";
        return i.default.createElement("li", { className: n }, t);
      };
    },
    721: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        i = n(8),
        o = n.n(i),
        s = function(e) {
          var t = e.RowClassName,
            n = e.setSorts,
            a = e.sortColumn,
            i = e.title,
            o = e.width;
          return r.a.createElement(
            "th",
            { className: t, width: o },
            i,
            r.a.createElement("span", {
              className: "glyphicon glyphicon-arrow-down pull-right small",
              role: "button",
              onClick: n.bind(void 0, a, "ASC")
            }),
            r.a.createElement("span", {
              className: "glyphicon glyphicon-arrow-up pull-right small",
              role: "button",
              onClick: n.bind(void 0, a, "DESC")
            })
          );
        };
      (s.defaultProps = { RowClassName: "" }),
        (s.propTypes = {
          setSorts: o.a.func.isRequired,
          sortColumn: o.a.string.isRequired,
          title: o.a.string.isRequired,
          width: o.a.string.isRequired,
          RowClassName: o.a.string
        }),
        (t.a = s);
    },
    722: function(e, t, n) {
      "use strict";
      t.a = function(e) {
        var t = [];
        for (var n in e) "" !== e[n].data && t.push(e[n]);
        return t;
      };
    },
    725: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        i = n(8),
        o = n.n(i),
        s = n(707),
        l = n.n(s),
        c = n(708),
        u = n.n(c),
        d = n(7),
        p = n.n(d);
      p.a.locale("nl");
      var m = function(e) {
        var t = e.className,
          n = e.value,
          a = e.onChangeAction,
          i = e.placeholder,
          o = n ? p()(n).format("L") : "";
        return r.a.createElement(
          "th",
          { className: "DayPicker-overflow ".concat(t) },
          r.a.createElement(l.a, {
            value: o,
            onDayChange: a,
            formatDate: c.formatDate,
            parseDate: c.parseDate,
            dayPickerProps: {
              showWeekNumbers: !0,
              locale: "nl",
              firstDayOfWeek: 1,
              localeUtils: u.a
            },
            inputProps: { className: "form-control input-sm", placeholder: i },
            placeholder: ""
          })
        );
      };
      (m.defaultProps = { className: "", value: null, placeholder: "" }),
        (m.propTypes = {
          className: o.a.string,
          value: o.a.oneOfType([o.a.string, o.a.object]),
          onChangeAction: o.a.func,
          placeholder: o.a.string
        }),
        (t.a = m);
    },
    727: function(e, t, n) {
      "use strict";
      n.d(t, "a", function() {
        return a;
      }),
        n.d(t, "b", function() {
          return r;
        });
      var a = function() {
          return { type: "BLOCK_UI" };
        },
        r = function() {
          return { type: "UNBLOCK_UI" };
        };
    },
    748: function(e, t, n) {
      "use strict";
      n.d(t, "d", function() {
        return a;
      }),
        n.d(t, "e", function() {
          return r;
        }),
        n.d(t, "a", function() {
          return i;
        }),
        n.d(t, "c", function() {
          return o;
        }),
        n.d(t, "b", function() {
          return s;
        });
      var a = function(e) {
          return { type: "FETCH_ADMINISTRATION_DETAILS", id: e };
        },
        r = function(e, t, n) {
          return {
            type: "UPDATE_ADMINISTRATION",
            administration: e,
            administrationId: t,
            switchToView: n
          };
        },
        i = function(e) {
          return { type: "ADD_ADMINISTRATION_USER", administrationUser: e };
        },
        o = function(e, t) {
          return {
            type: "DELETE_ADMINISTRATION_USER",
            administrationId: e,
            userId: t
          };
        },
        s = function(e) {
          return { type: "DELETE_ADMINISTRATION_SEPA", sepaId: e };
        };
    },
    794: function(e, t, n) {
      "use strict";
      n.d(t, "d", function() {
        return a;
      }),
        n.d(t, "a", function() {
          return r;
        }),
        n.d(t, "c", function() {
          return i;
        }),
        n.d(t, "e", function() {
          return o;
        }),
        n.d(t, "b", function() {
          return s;
        });
      var a = function(e, t, n, a) {
          return {
            type: "FETCH_ORDERS",
            filters: e,
            sorts: t,
            pagination: n,
            administrationId: a
          };
        },
        r = function() {
          return { type: "CLEAR_ORDERS" };
        },
        i = function(e) {
          return { type: "DELETE_ORDER", id: e };
        },
        o = function(e) {
          return { type: "ORDER_PREVIEW_CREATE", data: e };
        },
        s = function() {
          return { type: "CLEAR_ORDER_PREVIEW_CREATE" };
        };
    },
    807: function(e, t, n) {
      "use strict";
      n.d(t, "d", function() {
        return a;
      }),
        n.d(t, "e", function() {
          return r;
        }),
        n.d(t, "b", function() {
          return i;
        }),
        n.d(t, "a", function() {
          return o;
        }),
        n.d(t, "c", function() {
          return s;
        });
      var a = function(e, t, n, a, r, i) {
          return {
            type: "FETCH_INVOICES",
            filters: e,
            sorts: t,
            pagination: n,
            administrationId: a,
            onlyEmailInvoices: r,
            onlyPostInvoices: i
          };
        },
        r = function(e) {
          return { type: "INVOICE_PREVIEW_SEND", data: e };
        },
        i = function() {
          return { type: "CLEAR_INVOICE_PREVIEW_SEND" };
        },
        o = function() {
          return { type: "CLEAR_INVOICES" };
        },
        s = function(e) {
          return { type: "DELETE_INVOICE_FROM_GRID", id: e };
        };
    }
  }
]);
