(window.webpackJsonp = window.webpackJsonp || []).push([
  [63],
  {
    1500: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        l = a.n(n),
        r = a(25),
        i = a.n(r),
        s = a(22),
        o = a.n(s),
        c = a(26),
        u = a.n(c),
        f = a(27),
        d = a.n(f),
        m = a(16),
        p = a.n(m),
        g = a(0),
        h = a.n(g),
        v = a(32),
        b = a(917),
        C = a(918),
        N = a(199),
        E = a.n(N),
        P = a(146),
        y = a(147),
        k = a(200),
        L = a(101),
        w = a(4),
        R = a(7),
        D = a.n(R);
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
            n = p()(e);
          if (t) {
            var l = p()(this).constructor;
            a = Reflect.construct(n, arguments, l);
          } else a = n.apply(this, arguments);
          return d()(this, a);
        };
      }
      D.a.locale("nl");
      var _ = (function(e) {
          u()(a, e);
          var t = x(a);
          function a(e) {
            var n;
            return (
              l()(this, a),
              ((n = t.call(this, e)).state = {
                showActionButtons: !1,
                highlightRow: ""
              }),
              n
            );
          }
          return (
            i()(a, [
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
                  w.f.push("/email/concept/".concat(e));
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props,
                    a = t.id,
                    n = t.createdAt,
                    l = t.mailboxName,
                    r = t.from,
                    i = t.subject;
                  return h.a.createElement(
                    "tr",
                    {
                      className: this.state.highlightRow,
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
                    h.a.createElement("td", null, n && D()(n).format("L")),
                    h.a.createElement("td", null, l),
                    h.a.createElement("td", null, r),
                    h.a.createElement("td", null, i),
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
                        : ""
                    )
                  );
                }
              }
            ]),
            a
          );
        })(g.Component),
        M = a(712),
        A = Object(v.b)(function(e) {
          return {
            emails: e.emails.list,
            emailsPagination: e.emails.pagination
          };
        }, null)(function(e) {
          var t = e.emails,
            a = t.data,
            n = void 0 === a ? [] : a,
            l = t.meta,
            r = void 0 === l ? {} : l;
          t.isLoading;
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              P.a,
              null,
              h.a.createElement(
                y.a,
                null,
                h.a.createElement(
                  "tr",
                  { className: "thead-title" },
                  h.a.createElement(L.a, { title: "Datum", width: "10%" }),
                  h.a.createElement(L.a, { title: "Mailbox", width: "20%" }),
                  h.a.createElement(L.a, { title: "Afzender", width: "20%" }),
                  h.a.createElement(L.a, { title: "Onderwerp", width: "45%" }),
                  h.a.createElement(L.a, { title: "", width: "5%" })
                )
              ),
              h.a.createElement(
                k.a,
                null,
                0 === n.length
                  ? h.a.createElement(
                      "tr",
                      null,
                      h.a.createElement(
                        "td",
                        { colSpan: 5 },
                        "Geen e-mails gevonden!"
                      )
                    )
                  : n.map(function(e) {
                      return h.a.createElement(_, E()({ key: e.id }, e));
                    })
              )
            ),
            h.a.createElement(M.a, {
              onPageChangeAction: e.handlePageClick,
              totalRecords: r.total,
              initialPage: e.emailsPagination.page
            })
          );
        }),
        O = a(693),
        j = function(e) {
          return h.a.createElement(
            "div",
            { className: "row" },
            h.a.createElement(
              "div",
              { className: "col-md-4" },
              h.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                h.a.createElement(O.a, {
                  iconName: "glyphicon-refresh",
                  onClickAction: e.refreshData
                }),
                h.a.createElement(O.a, {
                  iconName: "glyphicon-plus",
                  onClickAction: function() {
                    w.f.push("/email/nieuw");
                  }
                })
              )
            ),
            h.a.createElement(
              "div",
              { className: "col-md-4" },
              h.a.createElement(
                "h3",
                { className: "text-center table-title" },
                "E-mail concepten"
              )
            ),
            h.a.createElement("div", { className: "col-md-4" })
          );
        },
        S = a(690),
        I = a(691);
      a(722);
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
          var a,
            n = p()(e);
          if (t) {
            var l = p()(this).constructor;
            a = Reflect.construct(n, arguments, l);
          } else a = n.apply(this, arguments);
          return d()(this, a);
        };
      }
      var B = (function(e) {
        u()(a, e);
        var t = T(a);
        function a(e) {
          var n;
          return (
            l()(this, a),
            ((n = t.call(this, e)).refreshData = n.refreshData.bind(o()(n))),
            (n.handlePageClick = n.handlePageClick.bind(o()(n))),
            n
          );
        }
        return (
          i()(a, [
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
              key: "fetchEmailsData",
              value: function() {
                var e = this;
                setTimeout(function() {
                  var t = {
                    limit: 20,
                    offset: e.props.emailsPagination.offset
                  };
                  e.props.fetchEmails("concept", {}, {}, t);
                }, 100);
              }
            },
            {
              key: "refreshData",
              value: function() {
                this.props.clearEmails(), this.fetchEmailsData();
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
                return h.a.createElement(
                  S.a,
                  { className: "col-md-9" },
                  h.a.createElement(
                    I.a,
                    null,
                    h.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      h.a.createElement(j, { refreshData: this.refreshData })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      h.a.createElement(A, {
                        handlePageClick: this.handlePageClick
                      })
                    )
                  )
                );
              }
            }
          ]),
          a
        );
      })(g.Component);
      t.default = Object(v.b)(
        function(e) {
          return { emailsPagination: e.emails.pagination };
        },
        function(e) {
          return {
            fetchEmails: function(t, a, n, l) {
              e(Object(b.b)(t, a, n, l));
            },
            clearEmails: function() {
              e(Object(b.a)());
            },
            setEmailsPagination: function(t) {
              e(Object(C.a)(t));
            }
          };
        }
      )(B);
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        l = a.n(n),
        r = a(8),
        i = a.n(r),
        s = function(e) {
          var t = e.children,
            a = e.className,
            n = e.onMouseEnter,
            r = e.onMouseLeave;
          return l.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: r
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
          className: i.a.string,
          onMouseEnter: i.a.func,
          onMouseLeave: i.a.func
        }),
        (t.a = s);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        l = a.n(n),
        r = a(8),
        i = a.n(r),
        s = function(e) {
          var t = e.className,
            a = e.children;
          return l.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: i.a.string }),
        (t.a = s);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        l = a.n(n),
        r = a(8),
        i = a.n(r),
        s = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            r = e.title,
            i = e.disabled;
          return l.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: i,
              title: r
            },
            l.a.createElement("span", { className: "glyphicon ".concat(a) })
          );
        };
      (s.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (s.propTypes = {
          buttonClassName: i.a.string,
          iconName: i.a.string.isRequired,
          onClickAction: i.a.func,
          title: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = s);
    },
    712: function(e, t, a) {
      "use strict";
      var n = a(0),
        l = a.n(n),
        r = a(8),
        i = a.n(r),
        s = a(717),
        o = a.n(s),
        c = function(e) {
          var t = e.onPageChangeAction,
            a = e.initialPage,
            n = e.recordsPerPage,
            r = e.totalRecords;
          return l.a.createElement(o.a, {
            onPageChange: t,
            pageCount: Math.ceil(r / n) || 1,
            pageRangeDisplayed: 5,
            marginPagesDisplayed: 2,
            breakLabel: l.a.createElement("a", null, "..."),
            breakClassName: "break-me",
            containerClassName: "pagination",
            activeClassName: "active",
            previousLabel: l.a.createElement(
              "span",
              { "aria-hidden": "true" },
              "«"
            ),
            nextLabel: l.a.createElement(
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
          initialPage: i.a.number.isRequired,
          recordsPerPage: i.a.number,
          totalRecords: i.a.number,
          onPageChangeAction: i.a.func.isRequired
        }),
        (t.a = c);
    },
    717: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        l = a(718),
        r = (n = l) && n.__esModule ? n : { default: n };
      t.default = r.default;
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
        l = a(0),
        r = c(l),
        i = c(a(8)),
        s = c(a(719)),
        o = c(a(720));
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
                l = t.pageCount,
                i = t.marginPagesDisplayed,
                s = t.breakLabel,
                c = t.breakClassName,
                u = a.state.selected;
              if (l <= n)
                for (var f = 0; f < l; f++) e.push(a.getPageElement(f));
              else {
                var d = n / 2,
                  m = n - d;
                u > l - n / 2
                  ? (d = n - (m = l - u))
                  : u < n / 2 && (m = n - (d = u));
                var p = void 0,
                  g = void 0,
                  h = void 0,
                  v = function(e) {
                    return a.getPageElement(e);
                  };
                for (p = 0; p < l; p++)
                  (g = p + 1) <= i || g > l - i || (p >= u - d && p <= u + m)
                    ? e.push(v(p))
                    : s &&
                      e[e.length - 1] !== h &&
                      ((h = r.default.createElement(o.default, {
                        key: p,
                        breakLabel: s,
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
                  l = a.pageLinkClassName,
                  i = a.activeClassName,
                  o = a.activeLinkClassName,
                  c = a.extraAriaContext;
                return r.default.createElement(s.default, {
                  key: e,
                  onClick: this.handlePageSelected.bind(null, e),
                  selected: t === e,
                  pageClassName: n,
                  pageLinkClassName: l,
                  activeClassName: i,
                  activeLinkClassName: o,
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
                  l = e.pageCount,
                  i = e.containerClassName,
                  s = e.previousLinkClassName,
                  o = e.previousLabel,
                  c = e.nextLinkClassName,
                  u = e.nextLabel,
                  f = this.state.selected,
                  d = a + (0 === f ? " " + t : ""),
                  m = n + (f === l - 1 ? " " + t : "");
                return r.default.createElement(
                  "ul",
                  { className: i },
                  r.default.createElement(
                    "li",
                    { className: d },
                    r.default.createElement(
                      "a",
                      {
                        onClick: this.handlePreviousPage,
                        className: s,
                        href: this.hrefBuilder(f - 1),
                        tabIndex: "0",
                        role: "button",
                        onKeyPress: this.handlePreviousPage
                      },
                      o
                    )
                  ),
                  this.pagination(),
                  r.default.createElement(
                    "li",
                    { className: m },
                    r.default.createElement(
                      "a",
                      {
                        onClick: this.handleNextPage,
                        className: c,
                        href: this.hrefBuilder(f + 1),
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
      })(l.Component);
      (u.propTypes = {
        pageCount: i.default.number.isRequired,
        pageRangeDisplayed: i.default.number.isRequired,
        marginPagesDisplayed: i.default.number.isRequired,
        previousLabel: i.default.node,
        nextLabel: i.default.node,
        breakLabel: i.default.node,
        hrefBuilder: i.default.func,
        onPageChange: i.default.func,
        initialPage: i.default.number,
        forcePage: i.default.number,
        disableInitialCallback: i.default.bool,
        containerClassName: i.default.string,
        pageClassName: i.default.string,
        pageLinkClassName: i.default.string,
        activeClassName: i.default.string,
        activeLinkClassName: i.default.string,
        previousClassName: i.default.string,
        nextClassName: i.default.string,
        previousLinkClassName: i.default.string,
        nextLinkClassName: i.default.string,
        disabledClassName: i.default.string,
        breakClassName: i.default.string
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
        l = a(0),
        r = (n = l) && n.__esModule ? n : { default: n };
      t.default = function(e) {
        var t = e.pageClassName,
          a = e.pageLinkClassName,
          n = e.onClick,
          l = e.href,
          i =
            "Page " +
            e.page +
            (e.extraAriaContext ? " " + e.extraAriaContext : ""),
          s = null;
        return (
          e.selected &&
            ((s = "page"),
            (i = "Page " + e.page + " is your current page"),
            (t =
              void 0 !== t ? t + " " + e.activeClassName : e.activeClassName),
            void 0 !== a
              ? ((a = a),
                void 0 !== e.activeLinkClassName &&
                  (a = a + " " + e.activeLinkClassName))
              : (a = e.activeLinkClassName)),
          r.default.createElement(
            "li",
            { className: t },
            r.default.createElement(
              "a",
              {
                onClick: n,
                role: "button",
                className: a,
                href: l,
                tabIndex: "0",
                "aria-label": i,
                "aria-current": s,
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
        l = a(0),
        r = (n = l) && n.__esModule ? n : { default: n };
      t.default = function(e) {
        var t = e.breakLabel,
          a = e.breakClassName || "break";
        return r.default.createElement("li", { className: a }, t);
      };
    },
    722: function(e, t, a) {
      "use strict";
      t.a = function(e) {
        var t = [];
        for (var a in e) "" !== e[a].data && t.push(e[a]);
        return t;
      };
    },
    917: function(e, t, a) {
      "use strict";
      a.d(t, "b", function() {
        return n;
      }),
        a.d(t, "a", function() {
          return l;
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
        l = function() {
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
