(window.webpackJsonp = window.webpackJsonp || []).push([
  [96],
  {
    1463: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        l = a(25),
        i = a.n(l),
        o = a(22),
        s = a.n(o),
        c = a(26),
        u = a.n(c),
        d = a(27),
        f = a.n(d),
        p = a(16),
        m = a.n(p),
        g = a(0),
        h = a.n(g),
        v = a(32),
        b = a(4),
        P = a(693),
        C = Object(v.b)(function(e) {
          return {
            permissions: e.meDetails.permissions,
            projects: e.projects.list
          };
        })(function(e) {
          var t = e.permissions,
            a = void 0 === t ? {} : t,
            n = e.projects.meta,
            r = void 0 === n ? {} : n;
          return h.a.createElement(
            "div",
            { className: "row" },
            h.a.createElement(
              "div",
              { className: "col-md-4" },
              h.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                h.a.createElement(P.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: b.e.goBack
                }),
                a.manageProject &&
                  h.a.createElement(P.a, {
                    iconName: "glyphicon-plus",
                    onClickAction: function() {
                      b.f.push("project/nieuw");
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
                "Projecten"
              )
            ),
            h.a.createElement(
              "div",
              { className: "col-md-4" },
              h.a.createElement(
                "div",
                { className: "pull-right" },
                "Resultaten: ",
                r.total || 0
              )
            )
          );
        }),
        y = a(199),
        E = a.n(y),
        N = a(6),
        k = a.n(N),
        j = a(146),
        w = a(147),
        D = a(200),
        R = a(101),
        O = a(713);
      function L(e) {
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
          return f()(this, a);
        };
      }
      var x = (function(e) {
          u()(a, e);
          var t = L(a);
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
                  b.f.push("project/".concat(e));
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props,
                    a = t.id,
                    n = t.code,
                    r = t.name,
                    l = t.projectType,
                    i = t.projectTypeCodeRef,
                    o = t.totalParticipations,
                    s = t.participationsDefinitive,
                    c = t.amountOfLoanNeeded,
                    u = t.amountDefinitive,
                    d = o - s,
                    f = c - u,
                    p = 0;
                  return (
                    "loan" === i
                      ? c && u && (p = (u / c) * 100)
                      : o && s && (p = (s / o) * 100),
                    h.a.createElement(
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
                      h.a.createElement("td", null, n),
                      h.a.createElement("td", null, r),
                      h.a.createElement("td", null, l),
                      h.a.createElement("td", null, "loan" !== i ? o : "-"),
                      h.a.createElement("td", null, "loan" !== i ? s : "-"),
                      h.a.createElement("td", null, "loan" !== i ? d : "-"),
                      h.a.createElement(
                        "td",
                        null,
                        "loan" === i ? Object(O.a)(c) : "-"
                      ),
                      h.a.createElement(
                        "td",
                        null,
                        "loan" === i ? Object(O.a)(u) : "-"
                      ),
                      h.a.createElement(
                        "td",
                        null,
                        "loan" === i ? Object(O.a)(f) : "-"
                      ),
                      h.a.createElement(
                        "td",
                        null,
                        "".concat(
                          p.toLocaleString("nl", { maximumFractionDigits: 2 }),
                          "%"
                        )
                      ),
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
                        (this.state.showActionButtons &&
                          this.props.permissions.manageProject,
                        "")
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(g.Component),
        I = Object(v.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(x),
        _ = a(100),
        M = a(152),
        S = function(e) {
          return h.a.createElement(
            _.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return (
                  M.a.deleteProject(e.id).then(function() {
                    e.fetchProjectsData();
                  }),
                  void e.closeDeleteItemModal()
                );
              },
              title: "Verwijderen"
            },
            "Verwijder project ",
            h.a.createElement("strong", null, e.code),
            "?"
          );
        },
        A = a(712);
      function T(e, t) {
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
      function B(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? T(Object(a), !0).forEach(function(t) {
                k()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : T(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function q(e) {
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
          return f()(this, a);
        };
      }
      var F = (function(e) {
          u()(a, e);
          var t = q(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              k()(s()(n), "showDeleteItemModal", function(e, t) {
                n.setState(
                  B(
                    B({}, n.state),
                    {},
                    {
                      showDeleteItem: !0,
                      deleteItem: B(
                        B({}, n.state.deleteItem),
                        {},
                        { id: e, name: t }
                      )
                    }
                  )
                );
              }),
              k()(s()(n), "closeDeleteItemModal", function() {
                n.setState(
                  B(
                    B({}, n.state),
                    {},
                    {
                      showDeleteItem: !1,
                      deleteItem: B(
                        B({}, n.state.deleteItem),
                        {},
                        { id: "", name: "" }
                      )
                    }
                  )
                );
              }),
              (n.state = {
                showDeleteItem: !1,
                deleteItem: { id: "", name: "" }
              }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.projects,
                    a = t.data,
                    n = void 0 === a ? [] : a,
                    r = t.meta,
                    l = void 0 === r ? {} : r,
                    i = "",
                    o = !0;
                  return (
                    this.props.hasError
                      ? (i = "Fout bij het ophalen van projecten.")
                      : this.props.isLoading
                      ? (i = "Gegevens aan het laden.")
                      : 0 === n.length
                      ? (i = "Geen projecten gevonden!")
                      : (o = !1),
                    h.a.createElement(
                      "div",
                      null,
                      h.a.createElement(
                        j.a,
                        null,
                        h.a.createElement(
                          w.a,
                          null,
                          h.a.createElement(
                            "tr",
                            { className: "thead-title-quaternary" },
                            h.a.createElement(R.a, {
                              title: "Projectcode",
                              width: "10%"
                            }),
                            h.a.createElement(R.a, {
                              title: "Project",
                              width: "18%"
                            }),
                            h.a.createElement(R.a, {
                              title: "Type project",
                              width: "10%"
                            }),
                            h.a.createElement(R.a, {
                              title: "# deelnames nodig",
                              width: "8%"
                            }),
                            h.a.createElement(R.a, {
                              title: "Uitgegeven deelnames",
                              width: "8%"
                            }),
                            h.a.createElement(R.a, {
                              title: "Uit te geven deelnames",
                              width: "8%"
                            }),
                            h.a.createElement(R.a, {
                              title: "Lening nodig",
                              width: "8%"
                            }),
                            h.a.createElement(R.a, {
                              title: "Lening opgehaald",
                              width: "8%"
                            }),
                            h.a.createElement(R.a, {
                              title: "Lening uit te geven",
                              width: "8%"
                            }),
                            h.a.createElement(R.a, {
                              title: "Percentage uitgegeven",
                              width: "8%"
                            }),
                            h.a.createElement(R.a, { title: "", width: "6%" })
                          )
                        ),
                        h.a.createElement(
                          D.a,
                          null,
                          o
                            ? h.a.createElement(
                                "tr",
                                null,
                                h.a.createElement("td", { colSpan: 11 }, i)
                              )
                            : n.map(function(t) {
                                return h.a.createElement(
                                  I,
                                  E()({ key: t.id }, t, {
                                    showDeleteItemModal: e.showDeleteItemModal
                                  })
                                );
                              })
                        )
                      ),
                      h.a.createElement(
                        "div",
                        { className: "col-md-6 col-md-offset-3" },
                        h.a.createElement(A.a, {
                          onPageChangeAction: this.props.handlePageClick,
                          totalRecords: l.total,
                          initialPage: this.props.projectsPagination.page
                        })
                      ),
                      this.state.showDeleteItem &&
                        h.a.createElement(
                          S,
                          E()(
                            {
                              closeDeleteItemModal: this.closeDeleteItemModal,
                              fetchProjectsData: this.props.fetchProjectsData
                            },
                            this.state.deleteItem
                          )
                        )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(g.Component),
        V = Object(v.b)(function(e) {
          return {
            projects: e.projects.list,
            projectsPagination: e.projects.pagination,
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        }, null)(F);
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
          var a,
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return f()(this, a);
        };
      }
      var G = (function(e) {
        u()(a, e);
        var t = J(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            ((n = t.call(this, e)).fetchProjectsData = n.fetchProjectsData.bind(
              s()(n)
            )),
            (n.handlePageClick = n.handlePageClick.bind(s()(n))),
            n
          );
        }
        return (
          i()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.fetchProjectsData();
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearProjects();
              }
            },
            {
              key: "fetchProjectsData",
              value: function() {
                var e = this;
                setTimeout(function() {
                  var t = {
                    limit: 20,
                    offset: e.props.projectsPagination.offset
                  };
                  e.props.fetchProjects(t);
                }, 100);
              }
            },
            {
              key: "handlePageClick",
              value: function(e) {
                var t = e.selected,
                  a = Math.ceil(20 * t);
                this.props.setProjectsPagination({ page: t, offset: a }),
                  this.fetchProjectsData();
              }
            },
            {
              key: "render",
              value: function() {
                return h.a.createElement(
                  "div",
                  null,
                  h.a.createElement(
                    "div",
                    { className: "panel panel-default col-md-12" },
                    h.a.createElement(
                      "div",
                      { className: "panel-body" },
                      h.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        h.a.createElement(C, null)
                      ),
                      h.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        h.a.createElement(V, {
                          handlePageClick: this.handlePageClick,
                          fetchProjectsData: this.fetchProjectsData
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
      t.default = Object(v.b)(
        function(e) {
          return { projectsPagination: e.projects.pagination };
        },
        function(e) {
          return {
            fetchProjects: function(t) {
              e(
                (function(e) {
                  return { type: "FETCH_PROJECTS", pagination: e };
                })(t)
              );
            },
            clearProjects: function() {
              e({ type: "CLEAR_PROJECTS" });
            },
            setProjectsPagination: function(t) {
              e(
                (function(e) {
                  return { type: "SET_PROJECTS_PAGINATION", pagination: e };
                })(t)
              );
            }
          };
        }
      )(G);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        i = a.n(l),
        o = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            l = e.title,
            i = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: i,
              title: l
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
          buttonClassName: i.a.string,
          iconName: i.a.string.isRequired,
          onClickAction: i.a.func,
          title: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = o);
    },
    712: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(8),
        i = a.n(l),
        o = a(717),
        s = a.n(o),
        c = function(e) {
          var t = e.onPageChangeAction,
            a = e.initialPage,
            n = e.recordsPerPage,
            l = e.totalRecords;
          return r.a.createElement(s.a, {
            onPageChange: t,
            pageCount: Math.ceil(l / n) || 1,
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
          initialPage: i.a.number.isRequired,
          recordsPerPage: i.a.number,
          totalRecords: i.a.number,
          onPageChangeAction: i.a.func.isRequired
        }),
        (t.a = c);
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
    717: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        r = a(718),
        l = (n = r) && n.__esModule ? n : { default: n };
      t.default = l.default;
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
        l = c(r),
        i = c(a(8)),
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
                i = t.marginPagesDisplayed,
                o = t.breakLabel,
                c = t.breakClassName,
                u = a.state.selected;
              if (r <= n)
                for (var d = 0; d < r; d++) e.push(a.getPageElement(d));
              else {
                var f = n / 2,
                  p = n - f;
                u > r - n / 2
                  ? (f = n - (p = r - u))
                  : u < n / 2 && (p = n - (f = u));
                var m = void 0,
                  g = void 0,
                  h = void 0,
                  v = function(e) {
                    return a.getPageElement(e);
                  };
                for (m = 0; m < r; m++)
                  (g = m + 1) <= i || g > r - i || (m >= u - f && m <= u + p)
                    ? e.push(v(m))
                    : o &&
                      e[e.length - 1] !== h &&
                      ((h = l.default.createElement(s.default, {
                        key: m,
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
                  i = a.activeClassName,
                  s = a.activeLinkClassName,
                  c = a.extraAriaContext;
                return l.default.createElement(o.default, {
                  key: e,
                  onClick: this.handlePageSelected.bind(null, e),
                  selected: t === e,
                  pageClassName: n,
                  pageLinkClassName: r,
                  activeClassName: i,
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
                  i = e.containerClassName,
                  o = e.previousLinkClassName,
                  s = e.previousLabel,
                  c = e.nextLinkClassName,
                  u = e.nextLabel,
                  d = this.state.selected,
                  f = a + (0 === d ? " " + t : ""),
                  p = n + (d === r - 1 ? " " + t : "");
                return l.default.createElement(
                  "ul",
                  { className: i },
                  l.default.createElement(
                    "li",
                    { className: f },
                    l.default.createElement(
                      "a",
                      {
                        onClick: this.handlePreviousPage,
                        className: o,
                        href: this.hrefBuilder(d - 1),
                        tabIndex: "0",
                        role: "button",
                        onKeyPress: this.handlePreviousPage
                      },
                      s
                    )
                  ),
                  this.pagination(),
                  l.default.createElement(
                    "li",
                    { className: p },
                    l.default.createElement(
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
        r = a(0),
        l = (n = r) && n.__esModule ? n : { default: n };
      t.default = function(e) {
        var t = e.pageClassName,
          a = e.pageLinkClassName,
          n = e.onClick,
          r = e.href,
          i =
            "Page " +
            e.page +
            (e.extraAriaContext ? " " + e.extraAriaContext : ""),
          o = null;
        return (
          e.selected &&
            ((o = "page"),
            (i = "Page " + e.page + " is your current page"),
            (t =
              void 0 !== t ? t + " " + e.activeClassName : e.activeClassName),
            void 0 !== a
              ? ((a = a),
                void 0 !== e.activeLinkClassName &&
                  (a = a + " " + e.activeLinkClassName))
              : (a = e.activeLinkClassName)),
          l.default.createElement(
            "li",
            { className: t },
            l.default.createElement(
              "a",
              {
                onClick: n,
                role: "button",
                className: a,
                href: r,
                tabIndex: "0",
                "aria-label": i,
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
        l = (n = r) && n.__esModule ? n : { default: n };
      t.default = function(e) {
        var t = e.breakLabel,
          a = e.breakClassName || "break";
        return l.default.createElement("li", { className: a }, t);
      };
    }
  }
]);
