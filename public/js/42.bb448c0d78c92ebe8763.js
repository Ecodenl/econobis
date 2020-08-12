(window.webpackJsonp = window.webpackJsonp || []).push([
  [42],
  {
    1452: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        i = a(25),
        l = a.n(i),
        o = a(22),
        s = a.n(o),
        u = a(26),
        c = a.n(u),
        d = a(27),
        f = a.n(d),
        p = a(16),
        m = a.n(p),
        g = a(0),
        h = a.n(g),
        y = a(32),
        v = a(14),
        b = function(e, t, a) {
          return {
            type: "FETCH_AUDIT_TRAIL",
            filters: e,
            sorts: t,
            pagination: a
          };
        },
        A = function() {
          return { type: "CLEAR_AUDIT_TRAIL" };
        },
        k = function(e) {
          return { type: "SET_FILTER_AUDIT_TRAIL_MODEL", model: e };
        },
        P = function(e) {
          return {
            type: "SET_FILTER_AUDIT_TRAIL_REVISIONABLE_ID",
            revisionableId: e
          };
        },
        E = function(e) {
          return { type: "SET_FILTER_AUDIT_TRAIL_FIELD", field: e };
        },
        C = function(e) {
          return { type: "SET_FILTER_AUDIT_TRAIL_OLD_VALUE", oldValue: e };
        },
        D = function(e) {
          return { type: "SET_FILTER_AUDIT_TRAIL_NEW_VALUE", newValue: e };
        },
        T = function(e) {
          return {
            type: "SET_FILTER_AUDIT_TRAIL_CHANGED_BY_ID",
            changedById: e
          };
        },
        N = function(e) {
          return { type: "SET_FILTER_AUDIT_TRAIL_UPDATED_AT", updatedAt: e };
        },
        R = function() {
          return { type: "CLEAR_FILTER_AUDIT_TRAIL" };
        },
        I = function(e) {
          return { type: "SET_AUDIT_TRAIL_PAGINATION", pagination: e };
        },
        w = a(199),
        L = a.n(w),
        x = a(6),
        F = a.n(x),
        _ = a(146),
        S = a(147),
        B = a(200),
        V = a(721),
        O = a(883),
        U = Object(y.b)(null, function(e) {
          return {
            setAuditTrailSortsFilter: function(t, a) {
              e(Object(O.a)(t, a));
            }
          };
        })(function(e) {
          var t = function(t, a) {
            e.setAuditTrailSortsFilter(t, a),
              setTimeout(function() {
                e.fetchAuditTrailData();
              }, 100);
          };
          return h.a.createElement(
            "tr",
            { className: "thead-title" },
            h.a.createElement(V.a, {
              sortColumn: "model",
              title: "Type record",
              width: "15%",
              setSorts: t
            }),
            h.a.createElement(V.a, {
              sortColumn: "revisionable_id",
              title: "Id",
              width: "10%",
              setSorts: t
            }),
            h.a.createElement(V.a, {
              sortColumn: "field",
              title: "Veldnaam",
              width: "15%",
              setSorts: t
            }),
            h.a.createElement(V.a, {
              sortColumn: "oldValue",
              title: "Oude waarde",
              width: "15%",
              setSorts: t
            }),
            h.a.createElement(V.a, {
              sortColumn: "newValue",
              title: "Nieuwe waarde",
              width: "15%",
              setSorts: t
            }),
            h.a.createElement(V.a, {
              sortColumn: "changedById",
              title: "Gewijzigd door",
              width: "15%",
              setSorts: t
            }),
            h.a.createElement(V.a, {
              sortColumn: "updatedAt",
              title: "Gewijzigd op",
              width: "15%",
              setSorts: t
            })
          );
        }),
        M = a(7),
        j = a.n(M),
        W = (a(735), a(725)),
        q = Object(y.b)(
          function(e) {
            return { filters: e.auditTrail.filters, users: e.systemData.users };
          },
          function(e) {
            return Object(v.b)(
              {
                setFilterAuditTrailModel: k,
                setFilterAuditTrailField: E,
                setFilterAuditTrailOldValue: C,
                setFilterAuditTrailNewValue: D,
                setFilterAuditTrailChangedById: T,
                setFilterAuditTrailUpdatedAt: N,
                setFilterAuditTrailRevisionableId: P
              },
              e
            );
          }
        )(function(e) {
          return h.a.createElement(
            "tr",
            { className: "thead-filter" },
            h.a.createElement(
              "th",
              null,
              h.a.createElement(
                "select",
                {
                  className: "form-control input-sm",
                  value: e.filters.model.data,
                  onChange: function(t) {
                    e.setFilterAuditTrailModel(t.target.value),
                      setTimeout(function() {
                        e.onSubmitFilter();
                      }, 100);
                  }
                },
                h.a.createElement("option", null),
                e.models.map(function(e) {
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
                value: e.filters.revisionableId.data,
                onChange: function(t) {
                  e.setFilterAuditTrailRevisionableId(t.target.value);
                }
              })
            ),
            h.a.createElement(
              "th",
              null,
              h.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: e.filters.field.data,
                onChange: function(t) {
                  e.setFilterAuditTrailField(t.target.value);
                }
              })
            ),
            h.a.createElement(
              "th",
              null,
              h.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: e.filters.oldValue.data,
                onChange: function(t) {
                  e.setFilterAuditTrailOldValue(t.target.value);
                }
              })
            ),
            h.a.createElement(
              "th",
              null,
              h.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: e.filters.newValue.data,
                onChange: function(t) {
                  e.setFilterAuditTrailNewValue(t.target.value);
                }
              })
            ),
            h.a.createElement(
              "th",
              null,
              h.a.createElement(
                "select",
                {
                  className: "form-control input-sm",
                  value: e.filters.changedById.data,
                  onChange: function(t) {
                    e.setFilterAuditTrailChangedById(t.target.value),
                      setTimeout(function() {
                        e.onSubmitFilter();
                      }, 100);
                  }
                },
                h.a.createElement("option", null),
                e.users.map(function(e) {
                  return h.a.createElement(
                    "option",
                    { key: e.id, value: e.id },
                    e.fullName
                  );
                })
              )
            ),
            h.a.createElement(W.a, {
              value: e.filters.updatedAt.data && e.filters.updatedAt.data,
              onChangeAction: function(t) {
                void 0 === t
                  ? e.setFilterAuditTrailUpdatedAt("")
                  : e.setFilterAuditTrailUpdatedAt(j()(t).format("Y-MM-DD"));
              }
            }),
            h.a.createElement("th", null)
          );
        });
      function K(e) {
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
      var Q = (function(e) {
          c()(a, e);
          var t = K(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              ((n = t.call(this, e)).state = { highlightRow: "" }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "onRowEnter",
                value: function() {
                  this.setState({ highlightRow: "highlight-row" });
                }
              },
              {
                key: "onRowLeave",
                value: function() {
                  this.setState({ highlightRow: "" });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props,
                    a = t.model,
                    n = t.revisionableId,
                    r = t.field,
                    i = t.oldValue,
                    l = t.newValue,
                    o = t.changedBy,
                    s = t.changedAt;
                  return h.a.createElement(
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
                    h.a.createElement("td", null, a),
                    h.a.createElement("td", null, n),
                    h.a.createElement("td", null, r),
                    h.a.createElement("td", null, i || "Null"),
                    h.a.createElement("td", null, l || "Null"),
                    h.a.createElement("td", null, o ? o.fullName : ""),
                    h.a.createElement("td", null, j()(s).format("L"))
                  );
                }
              }
            ]),
            a
          );
        })(g.Component),
        z = a(712);
      function Y(e) {
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
          c()(a, e);
          var t = Y(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              F()(s()(n), "handleKeyUp", function(e) {
                13 === e.keyCode && n.props.onSubmitFilter();
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.auditTrail,
                    a = t.data,
                    n = void 0 === a ? [] : a,
                    r = t.meta,
                    i = void 0 === r ? {} : r,
                    l = "",
                    o = !0;
                  return (
                    this.props.hasError
                      ? (l = "Fout bij het ophalen van audit trail.")
                      : this.props.isLoading
                      ? (l = "Gegevens aan het laden.")
                      : 0 === n.length
                      ? (l = "Geen audit trail gevonden!")
                      : (o = !1),
                    h.a.createElement(
                      "div",
                      null,
                      h.a.createElement(
                        "form",
                        { onKeyUp: this.handleKeyUp },
                        h.a.createElement(
                          _.a,
                          null,
                          h.a.createElement(
                            S.a,
                            null,
                            h.a.createElement(U, {
                              fetchAuditTrailData: function() {
                                return e.props.fetchAuditTrailData();
                              }
                            }),
                            h.a.createElement(q, {
                              onSubmitFilter: this.props.onSubmitFilter,
                              models: this.props.models
                            })
                          ),
                          h.a.createElement(
                            B.a,
                            null,
                            o
                              ? h.a.createElement(
                                  "tr",
                                  null,
                                  h.a.createElement("td", { colSpan: 7 }, l)
                                )
                              : n.map(function(e) {
                                  return h.a.createElement(
                                    Q,
                                    L()({ key: e.id }, e)
                                  );
                                })
                          )
                        ),
                        h.a.createElement(
                          "div",
                          { className: "col-md-6 col-md-offset-3" },
                          h.a.createElement(z.a, {
                            onPageChangeAction: this.props.handlePageClick,
                            totalRecords: i.total,
                            initialPage: this.props.auditTrailPagination.page
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
        })(g.Component),
        J = Object(y.b)(function(e) {
          return {
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        })(G),
        H = a(693),
        X = Object(y.b)(function(e) {
          return {
            permissions: e.meDetails.permissions,
            auditTrail: e.auditTrail.list
          };
        }, null)(function(e) {
          var t = e.auditTrail.meta,
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
                  onClickAction: e.resetAuditTrailFilters
                })
              )
            ),
            h.a.createElement(
              "div",
              { className: "col-md-4" },
              h.a.createElement(
                "h3",
                { className: "text-center table-title" },
                "Audit trail"
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
        Z = a(722),
        $ = a(690),
        ee = a(691),
        te = a(405);
      function ae(e) {
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
      var ne = (function(e) {
        c()(a, e);
        var t = ae(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            ((n = t.call(this, e)).state = { models: [] }),
            (n.fetchAuditTrailData = n.fetchAuditTrailData.bind(s()(n))),
            (n.resetAuditTrailFilters = n.resetAuditTrailFilters.bind(s()(n))),
            (n.handlePageClick = n.handlePageClick.bind(s()(n))),
            n
          );
        }
        return (
          l()(a, [
            {
              key: "componentDidMount",
              value: function() {
                var e = this;
                this.fetchAuditTrailData(),
                  te.a.fetchAuditTrailModels().then(function(t) {
                    e.setState({ models: t });
                  });
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearAuditTrail();
              }
            },
            {
              key: "fetchAuditTrailData",
              value: function() {
                var e = this;
                setTimeout(function() {
                  var t = Object(Z.a)(e.props.auditTrailFilters),
                    a = e.props.auditTrailSorts,
                    n = {
                      limit: 20,
                      offset: e.props.auditTrailPagination.offset
                    };
                  e.props.fetchAuditTrail(t, a, n);
                }, 100);
              }
            },
            {
              key: "resetAuditTrailFilters",
              value: function() {
                this.props.clearFilterAuditTrail(), this.fetchAuditTrailData();
              }
            },
            {
              key: "onSubmitFilter",
              value: function() {
                this.props.clearAuditTrail(),
                  this.props.setAuditTrailPagination({ page: 0, offset: 0 }),
                  this.fetchAuditTrailData();
              }
            },
            {
              key: "handlePageClick",
              value: function(e) {
                var t = e.selected,
                  a = Math.ceil(20 * t);
                this.props.setAuditTrailPagination({ page: t, offset: a }),
                  this.fetchAuditTrailData();
              }
            },
            {
              key: "render",
              value: function() {
                var e = this;
                return h.a.createElement(
                  $.a,
                  null,
                  h.a.createElement(
                    ee.a,
                    null,
                    h.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      h.a.createElement(X, {
                        resetAuditTrailFilters: function() {
                          return e.resetAuditTrailFilters();
                        }
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      h.a.createElement(J, {
                        auditTrail: this.props.auditTrail,
                        models: this.state.models,
                        auditTrailPagination: this.props.auditTrailPagination,
                        onSubmitFilter: function() {
                          return e.onSubmitFilter();
                        },
                        fetchAuditTrailData: function() {
                          return e.fetchAuditTrailData();
                        },
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
      t.default = Object(y.b)(
        function(e) {
          return {
            auditTrail: e.auditTrail.list,
            auditTrailFilters: e.auditTrail.filters,
            auditTrailSorts: e.auditTrail.sorts,
            auditTrailPagination: e.auditTrail.pagination
          };
        },
        function(e) {
          return Object(v.b)(
            {
              fetchAuditTrail: b,
              clearAuditTrail: A,
              clearFilterAuditTrail: R,
              setAuditTrailPagination: I
            },
            e
          );
        }
      )(ne);
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
        u = function(e) {
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
      (u.defaultProps = { recordsPerPage: 20 }),
        (u.propTypes = {
          initialPage: l.a.number.isRequired,
          recordsPerPage: l.a.number,
          totalRecords: l.a.number,
          onPageChangeAction: l.a.func.isRequired
        }),
        (t.a = u);
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
        i = u(r),
        l = u(a(8)),
        o = u(a(719)),
        s = u(a(720));
      function u(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var c = (function(e) {
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
                u = t.breakClassName,
                c = a.state.selected;
              if (r <= n)
                for (var d = 0; d < r; d++) e.push(a.getPageElement(d));
              else {
                var f = n / 2,
                  p = n - f;
                c > r - n / 2
                  ? (f = n - (p = r - c))
                  : c < n / 2 && (p = n - (f = c));
                var m = void 0,
                  g = void 0,
                  h = void 0,
                  y = function(e) {
                    return a.getPageElement(e);
                  };
                for (m = 0; m < r; m++)
                  (g = m + 1) <= l || g > r - l || (m >= c - f && m <= c + p)
                    ? e.push(y(m))
                    : o &&
                      e[e.length - 1] !== h &&
                      ((h = i.default.createElement(s.default, {
                        key: m,
                        breakLabel: o,
                        breakClassName: u
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
                  u = a.extraAriaContext;
                return i.default.createElement(o.default, {
                  key: e,
                  onClick: this.handlePageSelected.bind(null, e),
                  selected: t === e,
                  pageClassName: n,
                  pageLinkClassName: r,
                  activeClassName: l,
                  activeLinkClassName: s,
                  extraAriaContext: u,
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
                  u = e.nextLinkClassName,
                  c = e.nextLabel,
                  d = this.state.selected,
                  f = a + (0 === d ? " " + t : ""),
                  p = n + (d === r - 1 ? " " + t : "");
                return i.default.createElement(
                  "ul",
                  { className: l },
                  i.default.createElement(
                    "li",
                    { className: f },
                    i.default.createElement(
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
                  i.default.createElement(
                    "li",
                    { className: p },
                    i.default.createElement(
                      "a",
                      {
                        onClick: this.handleNextPage,
                        className: u,
                        href: this.hrefBuilder(d + 1),
                        tabIndex: "0",
                        role: "button",
                        onKeyPress: this.handleNextPage
                      },
                      c
                    )
                  )
                );
              }
            }
          ]),
          t
        );
      })(r.Component);
      (c.propTypes = {
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
        (c.defaultProps = {
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
        (t.default = c);
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
        u = a(708),
        c = a.n(u),
        d = a(7),
        f = a.n(d);
      f.a.locale("nl");
      var p = function(e) {
        var t = e.className,
          a = e.value,
          n = e.onChangeAction,
          i = e.placeholder,
          l = a ? f()(a).format("L") : "";
        return r.a.createElement(
          "th",
          { className: "DayPicker-overflow ".concat(t) },
          r.a.createElement(s.a, {
            value: l,
            onDayChange: n,
            formatDate: u.formatDate,
            parseDate: u.parseDate,
            dayPickerProps: {
              showWeekNumbers: !0,
              locale: "nl",
              firstDayOfWeek: 1,
              localeUtils: c.a
            },
            inputProps: { className: "form-control input-sm", placeholder: i },
            placeholder: ""
          })
        );
      };
      (p.defaultProps = { className: "", value: null, placeholder: "" }),
        (p.propTypes = {
          className: l.a.string,
          value: l.a.oneOfType([l.a.string, l.a.object]),
          onChangeAction: l.a.func,
          placeholder: l.a.string
        }),
        (t.a = p);
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
    883: function(e, t, a) {
      "use strict";
      a.d(t, "a", function() {
        return n;
      });
      var n = function(e, t) {
        return { type: "SET_AUDIT_TRAIL_SORTS", field: e, order: t };
      };
    }
  }
]);
