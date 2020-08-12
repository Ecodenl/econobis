(window.webpackJsonp = window.webpackJsonp || []).push([
  [30],
  {
    1455: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        i = a(25),
        l = a.n(i),
        o = a(22),
        s = a.n(o),
        c = a(26),
        u = a.n(c),
        m = a(27),
        p = a.n(m),
        d = a(16),
        f = a.n(d),
        g = a(0),
        h = a.n(g),
        E = a(32),
        y = a(917),
        b = a(918),
        v = a(727),
        k = a(199),
        P = a.n(k),
        C = a(146),
        N = a(147),
        D = a(200),
        A = a(4),
        w = a(7),
        S = a.n(w),
        x = a(148);
      function I(e) {
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
      S.a.locale("nl");
      var L = (function(e) {
          u()(a, e);
          var t = I(a);
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
            l()(a, [
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
                  A.f.push("/email/".concat(e));
                }
              },
              {
                key: "removeEmail",
                value: function(e) {
                  var t = this;
                  x.a.moveToFolder(e, "removed").then(function() {
                    t.props.fetchEmailsData();
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props,
                    a = t.id,
                    n = t.date,
                    r = t.mailboxName,
                    i = t.from,
                    l = t.to,
                    o = t.contacts,
                    s = t.subject,
                    c = t.status,
                    u = t.folder,
                    m = t.responsibleName;
                  return h.a.createElement(
                    "tr",
                    {
                      className: this.state.highlightRow,
                      onDoubleClick: function() {
                        return e.openItem(a);
                      },
                      onMouseOver: function() {
                        return e.onRowEnter();
                      },
                      onMouseLeave: function() {
                        return e.onRowLeave();
                      }
                    },
                    h.a.createElement("td", null, n && S()(n).format("L")),
                    h.a.createElement("td", null, r),
                    h.a.createElement("td", null, i),
                    h.a.createElement(
                      "td",
                      null,
                      l &&
                        l
                          .map(function(e) {
                            return e;
                          })
                          .join(", ")
                    ),
                    h.a.createElement(
                      "td",
                      null,
                      o &&
                        o
                          .map(function(e) {
                            return e.fullName;
                          })
                          .join(", ")
                    ),
                    h.a.createElement("td", null, s),
                    "inbox" === u &&
                      h.a.createElement("td", null, c ? c.name : ""),
                    "sent" === u && h.a.createElement("td", null, "Verzonden"),
                    "removed" === u &&
                      h.a.createElement("td", null, "Verwijderd"),
                    h.a.createElement("td", null, m),
                    h.a.createElement(
                      "td",
                      null,
                      this.state.showActionButtons
                        ? h.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.openItem(a);
                              }
                            },
                            h.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-pencil mybtn-success"
                            }),
                            " "
                          )
                        : "",
                      !this.state.showActionButtons ||
                        ("inbox" !== u && "sent" !== u)
                        ? ""
                        : h.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.removeEmail(a);
                              }
                            },
                            h.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-trash mybtn-danger"
                            }),
                            " "
                          )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(g.Component),
        R = a(712),
        F = a(721),
        B = a(101),
        T = Object(E.b)(null, function(e) {
          return {
            setEmailSortsFilter: function(t, a) {
              e(
                (function(e, t) {
                  return { type: "SET_EMAIL_SORTS", field: e, order: t };
                })(t, a)
              );
            }
          };
        })(function(e) {
          var t = function(t, a) {
            e.setEmailSortsFilter(t, a),
              setTimeout(function() {
                e.fetchEmailsData();
              }, 100);
          };
          return h.a.createElement(
            "tr",
            { className: "thead-title" },
            h.a.createElement(F.a, {
              sortColumn: "date",
              title: "Datum",
              width: "10%",
              setSorts: t
            }),
            h.a.createElement(F.a, {
              sortColumn: "mailbox",
              title: "Mailbox",
              width: "10%",
              setSorts: t
            }),
            h.a.createElement(F.a, {
              sortColumn: "sentBy",
              title: "Afzender",
              width: "10%",
              setSorts: t
            }),
            h.a.createElement(F.a, {
              sortColumn: "to",
              title: "Aan",
              width: "10%",
              setSorts: t
            }),
            h.a.createElement(B.a, {
              title: "Gekoppeld contact",
              width: "10%"
            }),
            h.a.createElement(F.a, {
              sortColumn: "subject",
              title: "Onderwerp",
              width: "15%",
              setSorts: t
            }),
            h.a.createElement(F.a, {
              sortColumn: "statusId",
              title: "Status",
              width: "10%",
              setSorts: t
            }),
            h.a.createElement(B.a, {
              title: "Verantwoordelijke",
              width: "10%"
            }),
            h.a.createElement(B.a, { title: "", width: "5%" })
          );
        }),
        _ = a(14),
        M =
          (a(735),
          function(e) {
            return { type: "SET_FILTER_EMAIL_DATE", date: e };
          }),
        O = function(e) {
          return { type: "SET_FILTER_EMAIL_MAILBOX", mailbox: e };
        },
        j = function(e) {
          return { type: "SET_FILTER_EMAIL_SENT_BY", sentBy: e };
        },
        V = function(e) {
          return { type: "SET_FILTER_EMAIL_TO", to: e };
        },
        U = function(e) {
          return { type: "SET_FILTER_EMAIL_CONTACT", contact: e };
        },
        W = function(e) {
          return { type: "SET_FILTER_EMAIL_SUBJECT", subject: e };
        },
        q = function(e) {
          return { type: "SET_FILTER_EMAIL_STATUS_ID", statusId: e };
        },
        K = function(e) {
          return {
            type: "SET_FILTER_EMAIL_RESPONSIBLE_NAME",
            responsibleName: e
          };
        },
        z = function(e) {
          return { type: "SET_FILTER_EMAIL_ME", me: e };
        },
        Q = function() {
          return { type: "CLEAR_FILTER_EMAIL" };
        },
        Y = a(725),
        G = Object(E.b)(
          function(e) {
            return {
              filters: e.emails.filters,
              emailStatuses: e.systemData.emailStatuses
            };
          },
          function(e) {
            return Object(_.b)(
              {
                setFilterEmailDate: M,
                setFilterEmailMailbox: O,
                setFilterEmailSentBy: j,
                setFilterEmailStatusId: q,
                setFilterEmailSubject: W,
                setFilterEmailTo: V,
                setFilterEmailContact: U,
                setFilterResponsibleName: K
              },
              e
            );
          }
        )(function(e) {
          return h.a.createElement(
            "tr",
            { className: "thead-filter" },
            h.a.createElement(Y.a, {
              value: e.filters.date.data && e.filters.date.data,
              onChangeAction: function(t) {
                void 0 === t
                  ? e.setFilterEmailDate("")
                  : e.setFilterEmailDate(S()(t).format("Y-MM-DD"));
              }
            }),
            h.a.createElement(
              "th",
              null,
              h.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: e.filters.mailbox.data,
                onChange: function(t) {
                  e.setFilterEmailMailbox(t.target.value);
                }
              })
            ),
            h.a.createElement(
              "th",
              null,
              h.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: e.filters.sentBy.data,
                onChange: function(t) {
                  e.setFilterEmailSentBy(t.target.value);
                }
              })
            ),
            h.a.createElement(
              "th",
              null,
              h.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: e.filters.to.data,
                onChange: function(t) {
                  e.setFilterEmailTo(t.target.value);
                }
              })
            ),
            h.a.createElement(
              "th",
              null,
              h.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: e.filters.contact.data,
                onChange: function(t) {
                  e.setFilterEmailContact(t.target.value);
                }
              })
            ),
            h.a.createElement(
              "th",
              null,
              h.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: e.filters.subject.data,
                onChange: function(t) {
                  e.setFilterEmailSubject(t.target.value);
                }
              })
            ),
            h.a.createElement(
              "th",
              null,
              "ontvangen" === e.folder &&
                h.a.createElement(
                  "select",
                  {
                    className: "form-control input-sm",
                    value: e.filters.statusId.data,
                    onChange: function(t) {
                      e.setFilterEmailStatusId(t.target.value),
                        setTimeout(function() {
                          e.onSubmitFilter();
                        }, 100);
                    }
                  },
                  h.a.createElement("option", null),
                  h.a.createElement("option", { value: "null" }, "Geen status"),
                  e.emailStatuses.map(function(e) {
                    return h.a.createElement(
                      "option",
                      { key: e.id, value: e.id },
                      e.name
                    );
                  })
                )
            ),
            h.a.createElement(
              "th",
              null,
              h.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: e.filters.responsibleName.data,
                onChange: function(t) {
                  e.setFilterResponsibleName(t.target.value);
                }
              })
            ),
            h.a.createElement("th", null)
          );
        }),
        J = Object(E.b)(function(e) {
          return {
            emails: e.emails.list,
            emailsPagination: e.emails.pagination
          };
        }, null)(function(e) {
          var t = e.emails,
            a = t.data,
            n = void 0 === a ? [] : a,
            r = t.meta,
            i = void 0 === r ? {} : r;
          t.isLoading;
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "form",
              {
                onKeyUp: function(t) {
                  13 === t.keyCode && e.onSubmitFilter();
                }
              },
              h.a.createElement(
                C.a,
                null,
                h.a.createElement(
                  N.a,
                  null,
                  h.a.createElement(T, {
                    fetchEmailsData: function() {
                      return e.fetchEmailsData();
                    }
                  }),
                  h.a.createElement(G, {
                    folder: e.folder,
                    onSubmitFilter: e.onSubmitFilter
                  })
                ),
                h.a.createElement(
                  D.a,
                  null,
                  0 === n.length
                    ? h.a.createElement(
                        "tr",
                        null,
                        h.a.createElement(
                          "td",
                          { colSpan: 9 },
                          "Geen e-mails gevonden!"
                        )
                      )
                    : n.map(function(t) {
                        return h.a.createElement(
                          L,
                          P()(
                            { fetchEmailsData: e.fetchEmailsData, key: t.id },
                            t
                          )
                        );
                      })
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-md-6 col-md-offset-3" },
                h.a.createElement(R.a, {
                  onPageChangeAction: e.handlePageClick,
                  totalRecords: i.total,
                  initialPage: e.emailsPagination.page
                })
              )
            )
          );
        }),
        H = a(693),
        X = Object(E.b)(function(e) {
          return { emails: e.emails.list };
        }, null)(function(e) {
          var t = e.emails.meta,
            a = void 0 === t ? {} : t;
          return h.a.createElement(
            "div",
            { className: "row" },
            h.a.createElement(
              "div",
              { className: "col-md-4" },
              h.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                h.a.createElement(H.a, {
                  iconName: "glyphicon-refresh",
                  onClickAction: e.refreshData,
                  title: "Alle mappen verzenden/ontvangen"
                }),
                h.a.createElement(H.a, {
                  iconName: "glyphicon-plus",
                  onClickAction: function() {
                    A.f.push("/email/nieuw");
                  },
                  title: "Nieuwe e-mail"
                })
              )
            ),
            h.a.createElement(
              "div",
              { className: "col-md-4" },
              h.a.createElement(
                "h3",
                { className: "text-center table-title" },
                e.me ? "Eigen e-mail" : "E-mail",
                " ",
                e.folder,
                " "
              )
            ),
            h.a.createElement(
              "div",
              { className: "col-md-4" },
              h.a.createElement(
                "div",
                { className: "pull-right" },
                "Resultaten: ",
                a.total || 0
              )
            )
          );
        }),
        Z = a(690),
        $ = a(691),
        ee = a(198),
        te = a(65),
        ae = a(722);
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
          return p()(this, a);
        };
      }
      var re = (function(e) {
        u()(a, e);
        var t = ne(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            Object(ee.isEmpty)(e.params)
              ? n.props.resetEmailsFilters()
              : "eigen" === e.params.type && n.props.setFilterMe(!0),
            (n.refreshData = n.refreshData.bind(s()(n))),
            (n.handlePageClick = n.handlePageClick.bind(s()(n))),
            n
          );
        }
        return (
          l()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.fetchEmailsData();
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearEmails();
              }
            },
            {
              key: "componentWillReceiveProps",
              value: function(e) {
                var t = this;
                this.props.params.folder !== e.params.folder &&
                  (Object(ee.isEmpty)(e.params.folder) ||
                    (this.props.clearFilterEmail(),
                    this.props.setEmailsPagination({ page: 0, offset: 0 }),
                    this.props.clearEmails(),
                    this.fetchEmailsData())),
                  this.props.params.type !== e.params.type &&
                    (Object(ee.isEmpty)(e.params) ||
                      ("eigen" === e.params.type
                        ? this.props.setFilterMe(!0)
                        : this.props.clearFilterEmail()),
                    setTimeout(function() {
                      t.props.setEmailsPagination({ page: 0, offset: 0 }),
                        t.props.clearEmails(),
                        t.fetchEmailsData();
                    }, 100));
              }
            },
            {
              key: "resetEmailsFilters",
              value: function() {
                this.props.clearFilterEmail(), this.fetchEmailsData();
              }
            },
            {
              key: "onSubmitFilter",
              value: function() {
                this.props.clearEmails(),
                  this.props.setEmailsPagination({ page: 0, offset: 0 }),
                  this.fetchEmailsData();
              }
            },
            {
              key: "fetchEmailsData",
              value: function() {
                var e = this;
                setTimeout(function() {
                  var t = Object(ae.a)(e.props.emailsFilters),
                    a = e.props.emailsSorts,
                    n = { limit: 20, offset: e.props.emailsPagination.offset };
                  e.props.fetchEmails(e.props.params.folder, t, a, n);
                }, 100);
              }
            },
            {
              key: "refreshData",
              value: function() {
                var e = this;
                this.props.blockUI(),
                  te.a.receiveMailFromMailboxesUser().then(function(t) {
                    e.props.clearEmails(),
                      e.resetEmailsFilters(),
                      e.props.fetchEmails(e.props.params.folder, {
                        limit: 20,
                        offset: 0
                      }),
                      e.props.unblockUI();
                  });
              }
            },
            {
              key: "handlePageClick",
              value: function(e) {
                var t = e.selected,
                  a = Math.ceil(20 * t);
                this.props.setEmailsPagination({ page: t, offset: a }),
                  this.fetchEmailsData();
              }
            },
            {
              key: "render",
              value: function() {
                var e = this,
                  t = "ontvangen";
                "removed" == this.props.params.folder
                  ? (t = "verwijderd")
                  : "sent" == this.props.params.folder && (t = "verzonden");
                var a = !1;
                return (
                  "eigen" == this.props.params.type && (a = !0),
                  h.a.createElement(
                    Z.a,
                    { className: "col-lg-12" },
                    h.a.createElement(
                      $.a,
                      null,
                      h.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        h.a.createElement(X, {
                          refreshData: this.refreshData,
                          folder: t,
                          me: a
                        })
                      ),
                      h.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        h.a.createElement(J, {
                          folder: t,
                          handlePageClick: this.handlePageClick,
                          emails: this.props.emails,
                          emailsPagination: this.props.emailsPagination,
                          onSubmitFilter: function() {
                            return e.onSubmitFilter();
                          },
                          fetchEmailsData: function() {
                            return e.fetchEmailsData();
                          }
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
      })(g.Component);
      t.default = Object(E.b)(
        function(e) {
          return {
            emails: e.emails.list,
            emailsPagination: e.emails.pagination,
            emailsFilters: e.emails.filters,
            emailsSorts: e.emails.sorts
          };
        },
        function(e) {
          return Object(_.b)(
            {
              fetchEmails: y.b,
              clearEmails: y.a,
              clearFilterEmail: Q,
              setEmailsPagination: b.a,
              blockUI: v.a,
              unblockUI: v.b,
              setFilterMe: z
            },
            e
          );
        }
      )(re);
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        l = a.n(i),
        o = function(e) {
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
      (o.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (o.propTypes = {
          className: l.a.string,
          onMouseEnter: l.a.func,
          onMouseLeave: l.a.func
        }),
        (t.a = o);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        l = a.n(i),
        o = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (o.defaultProps = { className: "" }),
        (o.propTypes = { className: l.a.string }),
        (t.a = o);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        l = a.n(i),
        o = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            i = e.title,
            l = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: l,
              title: i
            },
            r.a.createElement("span", { className: "glyphicon ".concat(a) })
          );
        };
      (o.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (o.propTypes = {
          buttonClassName: l.a.string,
          iconName: l.a.string.isRequired,
          onClickAction: l.a.func,
          title: l.a.string,
          disabled: l.a.bool
        }),
        (t.a = o);
    },
    712: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        l = a.n(i),
        o = a(717),
        s = a.n(o),
        c = function(e) {
          var t = e.onPageChangeAction,
            a = e.initialPage,
            n = e.recordsPerPage,
            i = e.totalRecords;
          return r.a.createElement(s.a, {
            onPageChange: t,
            pageCount: Math.ceil(i / n) || 1,
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
            initialPage: a || 0,
            forcePage: a,
            disableInitialCallback: !0
          });
        };
      (c.defaultProps = { recordsPerPage: 20 }),
        (c.propTypes = {
          initialPage: l.a.number.isRequired,
          recordsPerPage: l.a.number,
          totalRecords: l.a.number,
          onPageChangeAction: l.a.func.isRequired
        }),
        (t.a = c);
    },
    717: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        r = a(718),
        i = (n = r) && n.__esModule ? n : { default: n };
      t.default = i.default;
    },
    718: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = (function() {
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
        r = a(0),
        i = c(r),
        l = c(a(8)),
        o = c(a(719)),
        s = c(a(720));
      function c(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var u = (function(e) {
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
            (a.handlePreviousPage = function(e) {
              var t = a.state.selected;
              e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
                t > 0 && a.handlePageSelected(t - 1, e);
            }),
            (a.handleNextPage = function(e) {
              var t = a.state.selected,
                n = a.props.pageCount;
              e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
                t < n - 1 && a.handlePageSelected(t + 1, e);
            }),
            (a.handlePageSelected = function(e, t) {
              t.preventDefault ? t.preventDefault() : (t.returnValue = !1),
                a.state.selected !== e &&
                  (a.setState({ selected: e }), a.callCallback(e));
            }),
            (a.callCallback = function(e) {
              void 0 !== a.props.onPageChange &&
                "function" == typeof a.props.onPageChange &&
                a.props.onPageChange({ selected: e });
            }),
            (a.pagination = function() {
              var e = [],
                t = a.props,
                n = t.pageRangeDisplayed,
                r = t.pageCount,
                l = t.marginPagesDisplayed,
                o = t.breakLabel,
                c = t.breakClassName,
                u = a.state.selected;
              if (r <= n)
                for (var m = 0; m < r; m++) e.push(a.getPageElement(m));
              else {
                var p = n / 2,
                  d = n - p;
                u > r - n / 2
                  ? (p = n - (d = r - u))
                  : u < n / 2 && (d = n - (p = u));
                var f = void 0,
                  g = void 0,
                  h = void 0,
                  E = function(e) {
                    return a.getPageElement(e);
                  };
                for (f = 0; f < r; f++)
                  (g = f + 1) <= l || g > r - l || (f >= u - p && f <= u + d)
                    ? e.push(E(f))
                    : o &&
                      e[e.length - 1] !== h &&
                      ((h = i.default.createElement(s.default, {
                        key: f,
                        breakLabel: o,
                        breakClassName: c
                      })),
                      e.push(h));
              }
              return e;
            }),
            (a.state = {
              selected: e.initialPage
                ? e.initialPage
                : e.forcePage
                ? e.forcePage
                : 0
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
          n(t, [
            {
              key: "componentDidMount",
              value: function() {
                var e = this.props,
                  t = e.initialPage,
                  a = e.disableInitialCallback;
                void 0 === t || a || this.callCallback(t);
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
                  a = t.hrefBuilder,
                  n = t.pageCount;
                if (a && e !== this.state.selected && e >= 0 && e < n)
                  return a(e + 1);
              }
            },
            {
              key: "getPageElement",
              value: function(e) {
                var t = this.state.selected,
                  a = this.props,
                  n = a.pageClassName,
                  r = a.pageLinkClassName,
                  l = a.activeClassName,
                  s = a.activeLinkClassName,
                  c = a.extraAriaContext;
                return i.default.createElement(o.default, {
                  key: e,
                  onClick: this.handlePageSelected.bind(null, e),
                  selected: t === e,
                  pageClassName: n,
                  pageLinkClassName: r,
                  activeClassName: l,
                  activeLinkClassName: s,
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
                  a = e.previousClassName,
                  n = e.nextClassName,
                  r = e.pageCount,
                  l = e.containerClassName,
                  o = e.previousLinkClassName,
                  s = e.previousLabel,
                  c = e.nextLinkClassName,
                  u = e.nextLabel,
                  m = this.state.selected,
                  p = a + (0 === m ? " " + t : ""),
                  d = n + (m === r - 1 ? " " + t : "");
                return i.default.createElement(
                  "ul",
                  { className: l },
                  i.default.createElement(
                    "li",
                    { className: p },
                    i.default.createElement(
                      "a",
                      {
                        onClick: this.handlePreviousPage,
                        className: o,
                        href: this.hrefBuilder(m - 1),
                        tabIndex: "0",
                        role: "button",
                        onKeyPress: this.handlePreviousPage
                      },
                      s
                    )
                  ),
                  this.pagination(),
                  i.default.createElement(
                    "li",
                    { className: d },
                    i.default.createElement(
                      "a",
                      {
                        onClick: this.handleNextPage,
                        className: c,
                        href: this.hrefBuilder(m + 1),
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
        pageCount: l.default.number.isRequired,
        pageRangeDisplayed: l.default.number.isRequired,
        marginPagesDisplayed: l.default.number.isRequired,
        previousLabel: l.default.node,
        nextLabel: l.default.node,
        breakLabel: l.default.node,
        hrefBuilder: l.default.func,
        onPageChange: l.default.func,
        initialPage: l.default.number,
        forcePage: l.default.number,
        disableInitialCallback: l.default.bool,
        containerClassName: l.default.string,
        pageClassName: l.default.string,
        pageLinkClassName: l.default.string,
        activeClassName: l.default.string,
        activeLinkClassName: l.default.string,
        previousClassName: l.default.string,
        nextClassName: l.default.string,
        previousLinkClassName: l.default.string,
        nextLinkClassName: l.default.string,
        disabledClassName: l.default.string,
        breakClassName: l.default.string
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
    719: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        r = a(0),
        i = (n = r) && n.__esModule ? n : { default: n };
      t.default = function(e) {
        var t = e.pageClassName,
          a = e.pageLinkClassName,
          n = e.onClick,
          r = e.href,
          l =
            "Page " +
            e.page +
            (e.extraAriaContext ? " " + e.extraAriaContext : ""),
          o = null;
        return (
          e.selected &&
            ((o = "page"),
            (l = "Page " + e.page + " is your current page"),
            (t =
              void 0 !== t ? t + " " + e.activeClassName : e.activeClassName),
            void 0 !== a
              ? ((a = a),
                void 0 !== e.activeLinkClassName &&
                  (a = a + " " + e.activeLinkClassName))
              : (a = e.activeLinkClassName)),
          i.default.createElement(
            "li",
            { className: t },
            i.default.createElement(
              "a",
              {
                onClick: n,
                role: "button",
                className: a,
                href: r,
                tabIndex: "0",
                "aria-label": l,
                "aria-current": o,
                onKeyPress: n
              },
              e.page
            )
          )
        );
      };
    },
    720: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        r = a(0),
        i = (n = r) && n.__esModule ? n : { default: n };
      t.default = function(e) {
        var t = e.breakLabel,
          a = e.breakClassName || "break";
        return i.default.createElement("li", { className: a }, t);
      };
    },
    721: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        l = a.n(i),
        o = function(e) {
          var t = e.RowClassName,
            a = e.setSorts,
            n = e.sortColumn,
            i = e.title,
            l = e.width;
          return r.a.createElement(
            "th",
            { className: t, width: l },
            i,
            r.a.createElement("span", {
              className: "glyphicon glyphicon-arrow-down pull-right small",
              role: "button",
              onClick: a.bind(void 0, n, "ASC")
            }),
            r.a.createElement("span", {
              className: "glyphicon glyphicon-arrow-up pull-right small",
              role: "button",
              onClick: a.bind(void 0, n, "DESC")
            })
          );
        };
      (o.defaultProps = { RowClassName: "" }),
        (o.propTypes = {
          setSorts: l.a.func.isRequired,
          sortColumn: l.a.string.isRequired,
          title: l.a.string.isRequired,
          width: l.a.string.isRequired,
          RowClassName: l.a.string
        }),
        (t.a = o);
    },
    722: function(e, t, a) {
      "use strict";
      t.a = function(e) {
        var t = [];
        for (var a in e) "" !== e[a].data && t.push(e[a]);
        return t;
      };
    },
    725: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        i = a(8),
        l = a.n(i),
        o = a(707),
        s = a.n(o),
        c = a(708),
        u = a.n(c),
        m = a(7),
        p = a.n(m);
      p.a.locale("nl");
      var d = function(e) {
        var t = e.className,
          a = e.value,
          n = e.onChangeAction,
          i = e.placeholder,
          l = a ? p()(a).format("L") : "";
        return r.a.createElement(
          "th",
          { className: "DayPicker-overflow ".concat(t) },
          r.a.createElement(s.a, {
            value: l,
            onDayChange: n,
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
      (d.defaultProps = { className: "", value: null, placeholder: "" }),
        (d.propTypes = {
          className: l.a.string,
          value: l.a.oneOfType([l.a.string, l.a.object]),
          onChangeAction: l.a.func,
          placeholder: l.a.string
        }),
        (t.a = d);
    },
    727: function(e, t, a) {
      "use strict";
      a.d(t, "a", function() {
        return n;
      }),
        a.d(t, "b", function() {
          return r;
        });
      var n = function() {
          return { type: "BLOCK_UI" };
        },
        r = function() {
          return { type: "UNBLOCK_UI" };
        };
    },
    735: function(e, t, a) {
      var n = a(736);
      "string" == typeof n && (n = [[e.i, n, ""]]);
      var r = { hmr: !0, transform: void 0, insertInto: void 0 };
      a(205)(n, r);
      n.locals && (e.exports = n.locals);
    },
    736: function(e, t, a) {
      (e.exports = a(204)(!1)).push([
        e.i,
        '.DayPicker{display:inline-block;font-size:1rem}.DayPicker-wrapper{position:relative;flex-direction:row;padding-bottom:1em;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.DayPicker-Months{display:flex;flex-wrap:wrap;justify-content:center}.DayPicker-Month{display:table;margin:0 1em;margin-top:1em;border-spacing:0;border-collapse:collapse;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.DayPicker-NavButton{position:absolute;top:1em;right:1.5em;left:auto;display:inline-block;margin-top:2px;width:1.25em;height:1.25em;background-position:50%;background-size:50%;background-repeat:no-repeat;color:#8b9898;cursor:pointer}.DayPicker-NavButton:hover{opacity:.8}.DayPicker-NavButton--prev{margin-right:1.5em;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAVVJREFUWAnN2G0KgjAYwPHpGfRkaZeqvgQaK+hY3SUHrk1YzNLay/OiEFp92I+/Mp2F2Mh2lLISWnflFjzH263RQjzMZ19wgs73ez0o1WmtW+dgA01VxrE3p6l2GLsnBy1VYQOtVSEH/atCCgqpQgKKqYIOiq2CBkqtggLKqQIKgqgCBjpJ2Y5CdJ+zrT9A7HHSTA1dxUdHgzCqJIEwq0SDsKsEg6iqBIEoq/wEcVRZBXFV+QJxV5mBtlDFB5VjYTaGZ2sf4R9PM7U9ZU+lLuaetPP/5Die3ToO1+u+MKtHs06qODB2zBnI/jBd4MPQm1VkY79Tb18gB+C62FdBFsZR6yeIo1YQiLJWMIiqVjQIu1YSCLNWFgijVjYIuhYYCKoWKAiiFgoopxYaKLUWOii2FgkophYp6F3r42W5A9s9OcgNvva8xQaysKXlFytoqdYmQH6tF3toSUo0INq9AAAAAElFTkSuQmCC")}.DayPicker-NavButton--next{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAXRJREFUWAnN119ugjAcwPHWzJ1gnmxzB/BBE0n24m4xfNkTaOL7wOtsl3AXMMb+Vjaa1BG00N8fSEibPpAP3xAKKs2yjzTPH9RAjhEo9WzPr/Vm8zgE0+gXATAxxuxtqeJ9t5tIwv5AtQAApsfT6TPdbp+kUBcgVwvO51KqVhMkXKsVJFXrOkigVhCIs1Y4iKlWZxB1rX4gwlpRIIpa8SDkWmggrFq4IIRaJKCYWnSgnrXIQV1r8YD+1Vrn+bReagysIFfLABRt31v8oBu1xEBttfRbltmfjgEcWh9snUS2kNdBK6WN1vrOWxObWsz+fjxevsxmB1GQDfINWiev83nhaoiB/CoOU438oPrhXS0WpQ9xc1ZQWxWHqUYe0I0qrKCQKjygDlXIQV2r0IF6ViEBxVTBBSFUQQNhVYkHIVeJAtkNsbQ7c1LtzP6FsObhb2rCKv7NBIGoq4SDmKoEgTirXAcJVGkFSVVpgoSrXICGUMUH/QBZNSUy5XWUhwAAAABJRU5ErkJggg==")}.DayPicker-NavButton--interactionDisabled{display:none}.DayPicker-Caption{display:table-caption;margin-bottom:.5em;padding:0 .5em;text-align:left}.DayPicker-Caption>div{font-weight:500;font-size:1.15em}.DayPicker-Weekdays{display:table-header-group;margin-top:1em}.DayPicker-WeekdaysRow{display:table-row}.DayPicker-Weekday{display:table-cell;padding:.5em;color:#8b9898;text-align:center;font-size:.875em}.DayPicker-Weekday abbr[title]{border-bottom:none;text-decoration:none}.DayPicker-Body{display:table-row-group}.DayPicker-Week{display:table-row}.DayPicker-Day{border-radius:50%;text-align:center}.DayPicker-Day,.DayPicker-WeekNumber{display:table-cell;padding:.5em;vertical-align:middle;cursor:pointer}.DayPicker-WeekNumber{min-width:1em;border-right:1px solid #eaecec;color:#8b9898;text-align:right;font-size:.75em}.DayPicker--interactionDisabled .DayPicker-Day{cursor:default}.DayPicker-Footer{padding-top:.5em}.DayPicker-TodayButton{border:none;background-color:transparent;background-image:none;box-shadow:none;color:#4a90e2;font-size:.875em;cursor:pointer}.DayPicker-Day--today{color:#d0021b;font-weight:700}.DayPicker-Day--outside{color:#8b9898;cursor:default}.DayPicker-Day--disabled{color:#dce0e0;cursor:default}.DayPicker-Day--sunday{background-color:#f7f8f8}.DayPicker-Day--sunday:not(.DayPicker-Day--today){color:#dce0e0}.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside){position:relative;background-color:#4a90e2;color:#f0f8ff}.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover{background-color:#51a0fa}.DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover{background-color:#f0f8ff}.DayPickerInput{display:inline-block}.DayPickerInput-OverlayWrapper{position:relative}.DayPickerInput-Overlay{position:absolute;left:0;z-index:1;background:#fff;box-shadow:0 2px 5px rgba(0,0,0,.15)}',
        ""
      ]);
    },
    917: function(e, t, a) {
      "use strict";
      a.d(t, "b", function() {
        return n;
      }),
        a.d(t, "a", function() {
          return r;
        });
      var n = function(e, t, a, n) {
          return {
            type: "FETCH_EMAILS",
            folder: e,
            filters: t,
            sorts: a,
            pagination: n
          };
        },
        r = function() {
          return { type: "CLEAR_EMAILS" };
        };
    },
    918: function(e, t, a) {
      "use strict";
      a.d(t, "a", function() {
        return n;
      });
      var n = function(e) {
        return { type: "SET_EMAILS_PAGINATION", pagination: e };
      };
    }
  }
]);
