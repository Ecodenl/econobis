(window.webpackJsonp = window.webpackJsonp || []).push([
  [51],
  {
    1439: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        o = a(25),
        l = a.n(o),
        s = a(22),
        i = a.n(s),
        c = a(26),
        u = a.n(c),
        f = a(27),
        d = a.n(f),
        m = a(16),
        p = a.n(m),
        h = a(0),
        g = a.n(h),
        N = a(32),
        v = a(14),
        b = function(e, t, a) {
          return { type: "FETCH_NOTES", filters: e, sorts: t, pagination: a };
        },
        E = function() {
          return { type: "CLEAR_NOTES" };
        },
        y = function(e) {
          return { type: "SET_FILTER_NOTE_CREATED_AT", createdAt: e };
        },
        C = function(e) {
          return { type: "SET_FILTER_NOTE_TYPE_ID", typeId: e };
        },
        P = function(e) {
          return { type: "SET_FILTER_NOTE_NOTE", note: e };
        },
        k = function(e) {
          return {
            type: "SET_FILTER_NOTE_CONTACT_FULL_NAME",
            contactFullName: e
          };
        },
        D = function(e) {
          return {
            type: "SET_FILTER_NOTE_DATE_PLANNED_START",
            datePlannedStart: e
          };
        },
        S = function(e) {
          return {
            type: "SET_FILTER_NOTE_RESPONSIBLE_NAME",
            responsibleName: e
          };
        },
        T = function() {
          return { type: "CLEAR_FILTER_NOTES" };
        },
        w = function(e) {
          return { type: "SET_NOTES_PAGINATION", pagination: e };
        },
        _ = a(199),
        R = a.n(_),
        O = a(6),
        L = a.n(O),
        F = a(146),
        A = a(147),
        I = a(200),
        j = a(721),
        M = Object(N.b)(null, function(e) {
          return {
            setNotesSortsFilter: function(t, a) {
              e(
                (function(e, t) {
                  return { type: "SET_NOTES_SORTS", field: e, order: t };
                })(t, a)
              );
            }
          };
        })(function(e) {
          var t = function(t, a) {
            e.setNotesSortsFilter(t, a),
              setTimeout(function() {
                e.fetchNotesData();
              }, 100);
          };
          return g.a.createElement(
            "tr",
            { className: "thead-title" },
            g.a.createElement(j.a, {
              sortColumn: "createdAt",
              title: "Datum",
              width: "8%",
              setSorts: t
            }),
            g.a.createElement(j.a, {
              sortColumn: "typeName",
              title: "Type taak",
              width: "10%",
              setSorts: t
            }),
            g.a.createElement(j.a, {
              sortColumn: "note",
              title: "Taak / notitie",
              width: "20%",
              setSorts: t
            }),
            g.a.createElement(j.a, {
              sortColumn: "contactFullName",
              title: "Contact",
              width: "17%",
              setSorts: t
            }),
            g.a.createElement(j.a, {
              sortColumn: "datePlannedStart",
              title: "Datum afhandelen",
              width: "8%",
              setSorts: t
            }),
            g.a.createElement(j.a, {
              sortColumn: "responsibleName",
              title: "Verantwoordelijke",
              width: "15%",
              setSorts: t
            }),
            g.a.createElement("th", { width: "5%" })
          );
        }),
        x = a(7),
        B = a.n(x),
        q = a(725),
        K = Object(N.b)(
          function(e) {
            return {
              filters: e.notes.filters,
              taskTypes: e.systemData.taskTypes
            };
          },
          function(e) {
            return Object(v.b)(
              {
                setFilterNoteCreatedAt: y,
                setFilterNoteTypeId: C,
                setFilterNoteNote: P,
                setFilterNoteContactFullName: k,
                setFilterNoteDatePlannedStart: D,
                setFilterNoteResponsibleName: S
              },
              e
            );
          }
        )(function(e) {
          return g.a.createElement(
            "tr",
            { className: "thead-filter" },
            g.a.createElement(q.a, {
              value: e.filters.createdAt.data && e.filters.createdAt.data,
              onChangeAction: function(t) {
                void 0 === t
                  ? e.setFilterNoteCreatedAt("")
                  : e.setFilterNoteCreatedAt(B()(t).format("Y-MM-DD"));
              }
            }),
            g.a.createElement(
              "th",
              null,
              g.a.createElement(
                "select",
                {
                  className: "form-control input-sm",
                  value: e.filters.typeId.data,
                  onChange: function(t) {
                    e.setFilterNoteTypeId(t.target.value),
                      setTimeout(function() {
                        e.onSubmitFilter();
                      }, 100);
                  }
                },
                g.a.createElement("option", null),
                e.taskTypes.map(function(e) {
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
              g.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: e.filters.note.data,
                onChange: function(t) {
                  e.setFilterNoteNote(t.target.value);
                }
              })
            ),
            g.a.createElement(
              "th",
              null,
              g.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: e.filters.contactFullName.data,
                onChange: function(t) {
                  e.setFilterNoteContactFullName(t.target.value);
                }
              })
            ),
            g.a.createElement(q.a, {
              value:
                e.filters.datePlannedStart.data &&
                e.filters.datePlannedStart.data,
              onChangeAction: function(t) {
                void 0 === t
                  ? e.setFilterNoteDatePlannedStart("")
                  : e.setFilterNoteDatePlannedStart(B()(t).format("Y-MM-DD"));
              }
            }),
            g.a.createElement(
              "th",
              null,
              g.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: e.filters.responsibleName.data,
                onChange: function(t) {
                  e.setFilterNoteResponsibleName(t.target.value);
                }
              })
            ),
            g.a.createElement("th", null)
          );
        }),
        U = a(4);
      function V(e) {
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
            var r = p()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return d()(this, a);
        };
      }
      var W = (function(e) {
          u()(a, e);
          var t = V(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              ((n = t.call(this, e)).state = {
                showActionButtons: !1,
                highlightRow: ""
              }),
              (n.openItem = n.openItem.bind(i()(n))),
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
                value: function() {
                  U.f.push("/taak/".concat(this.props.id));
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props,
                    a = t.id,
                    n = t.createdAt,
                    r = t.typeName,
                    o = t.noteSummary,
                    l = t.contactFullName,
                    s = t.datePlannedStart,
                    i = t.responsibleName;
                  return g.a.createElement(
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
                    g.a.createElement("td", null, B()(n).format("L")),
                    g.a.createElement("td", null, r),
                    g.a.createElement("td", null, o),
                    g.a.createElement("td", null, l),
                    g.a.createElement("td", null, s && B()(s).format("L")),
                    g.a.createElement("td", null, i),
                    g.a.createElement(
                      "td",
                      null,
                      this.state.showActionButtons
                        ? g.a.createElement(
                            "a",
                            { role: "button", onClick: this.openItem },
                            g.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-pencil mybtn-success"
                            }),
                            " "
                          )
                        : "",
                      this.state.showActionButtons &&
                        this.props.permissions.manageNote
                        ? g.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: this.props.showDeleteItemModal.bind(
                                this,
                                a,
                                name
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
            a
          );
        })(h.Component),
        G = Object(N.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(W),
        Y = a(100),
        H = a(785),
        J = Object(N.b)(null, function(e) {
          return {
            deleteTask: function(t) {
              e(Object(H.a)(t));
            }
          };
        })(function(e) {
          return g.a.createElement(
            Y.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return e.deleteTask(e.id), void e.closeDeleteItemModal();
              },
              title: "Verwijderen"
            },
            "Verwijder taak: ",
            g.a.createElement("strong", null, " ", e.name, " ")
          );
        }),
        z = a(712);
      function Q(e, t) {
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
      function X(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Q(Object(a), !0).forEach(function(t) {
                L()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Q(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Z(e) {
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
            var r = p()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return d()(this, a);
        };
      }
      var $ = (function(e) {
          u()(a, e);
          var t = Z(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              L()(i()(n), "handleKeyUp", function(e) {
                13 === e.keyCode && n.props.onSubmitFilter();
              }),
              L()(i()(n), "showDeleteItemModal", function(e, t) {
                n.setState(
                  X(
                    X({}, n.state),
                    {},
                    {
                      showDeleteItem: !0,
                      deleteItem: X(
                        X({}, n.state.deleteItem),
                        {},
                        { id: e, name: t }
                      )
                    }
                  )
                );
              }),
              L()(i()(n), "closeDeleteItemModal", function() {
                n.setState(
                  X(
                    X({}, n.state),
                    {},
                    {
                      showDeleteItem: !1,
                      deleteItem: X(
                        X({}, n.state.deleteItem),
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
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.notes,
                    a = t.data,
                    n = void 0 === a ? [] : a,
                    r = t.meta,
                    o = void 0 === r ? {} : r,
                    l = "",
                    s = !0;
                  return (
                    this.props.hasError
                      ? (l = "Fout bij het ophalen van notities.")
                      : this.props.isLoading
                      ? (l = "Gegevens aan het laden.")
                      : 0 === n.length
                      ? (l = "Geen notities gevonden!")
                      : (s = !1),
                    g.a.createElement(
                      "div",
                      null,
                      g.a.createElement(
                        "form",
                        { onKeyUp: this.handleKeyUp },
                        g.a.createElement(
                          F.a,
                          null,
                          g.a.createElement(
                            A.a,
                            null,
                            g.a.createElement(M, {
                              fetchNotesData: function() {
                                return e.props.fetchNotesData();
                              }
                            }),
                            g.a.createElement(K, {
                              onSubmitFilter: this.props.onSubmitFilter
                            })
                          ),
                          g.a.createElement(
                            I.a,
                            null,
                            s
                              ? g.a.createElement(
                                  "tr",
                                  null,
                                  g.a.createElement("td", { colSpan: 7 }, l)
                                )
                              : n.map(function(t) {
                                  return g.a.createElement(
                                    G,
                                    R()({ key: t.id }, t, {
                                      showDeleteItemModal: e.showDeleteItemModal
                                    })
                                  );
                                })
                          )
                        ),
                        g.a.createElement(
                          "div",
                          { className: "col-md-6 col-md-offset-3" },
                          g.a.createElement(z.a, {
                            onPageChangeAction: this.props.handlePageClick,
                            totalRecords: o.total,
                            initialPage: this.props.notesPagination.page
                          })
                        )
                      ),
                      this.state.showDeleteItem &&
                        g.a.createElement(
                          J,
                          R()(
                            { closeDeleteItemModal: this.closeDeleteItemModal },
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
        })(h.Component),
        ee = Object(N.b)(function(e) {
          return {
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        })($),
        te = a(693),
        ae = Object(N.b)(function(e) {
          return { permissions: e.meDetails.permissions, notes: e.notes.list };
        }, null)(function(e) {
          var t = e.permissions,
            a = void 0 === t ? {} : t,
            n = e.notes.meta,
            r = void 0 === n ? {} : n;
          return g.a.createElement(
            "div",
            { className: "row" },
            g.a.createElement(
              "div",
              { className: "col-md-4" },
              g.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                g.a.createElement(te.a, {
                  iconName: "glyphicon-refresh",
                  onClickAction: e.resetNoteFilters
                }),
                a.manageNote &&
                  g.a.createElement(te.a, {
                    iconName: "glyphicon-plus",
                    onClickAction: function() {
                      U.f.push("taak/nieuw/afgesloten");
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
                "Notities"
              )
            ),
            g.a.createElement(
              "div",
              { className: "col-md-4" },
              g.a.createElement(
                "div",
                { className: "pull-right" },
                "Resultaten: ",
                r.total || 0
              )
            )
          );
        }),
        ne = a(722),
        re = a(690),
        oe = a(691);
      function le(e) {
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
            var r = p()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return d()(this, a);
        };
      }
      var se = (function(e) {
        u()(a, e);
        var t = le(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            ((n = t.call(this, e)).fetchNotesData = n.fetchNotesData.bind(
              i()(n)
            )),
            (n.resetNoteFilters = n.resetNoteFilters.bind(i()(n))),
            (n.handlePageClick = n.handlePageClick.bind(i()(n))),
            n
          );
        }
        return (
          l()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.fetchNotesData();
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearNotes();
              }
            },
            {
              key: "fetchNotesData",
              value: function() {
                var e = this;
                setTimeout(function() {
                  var t = Object(ne.a)(e.props.notesFilters),
                    a = e.props.notesSorts,
                    n = { limit: 20, offset: e.props.notesPagination.offset };
                  e.props.fetchNotes(t, a, n);
                }, 100);
              }
            },
            {
              key: "resetNoteFilters",
              value: function() {
                this.props.clearFilterNotes(), this.fetchNotesData();
              }
            },
            {
              key: "onSubmitFilter",
              value: function() {
                this.props.clearNotes(),
                  this.props.setNotesPagination({ page: 0, offset: 0 }),
                  this.fetchNotesData();
              }
            },
            {
              key: "handlePageClick",
              value: function(e) {
                var t = e.selected,
                  a = Math.ceil(20 * t);
                this.props.setNotesPagination({ page: t, offset: a }),
                  this.fetchNotesData();
              }
            },
            {
              key: "render",
              value: function() {
                var e = this;
                return g.a.createElement(
                  re.a,
                  null,
                  g.a.createElement(
                    oe.a,
                    null,
                    g.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      g.a.createElement(ae, {
                        resetNoteFilters: function() {
                          return e.resetNoteFilters();
                        }
                      })
                    ),
                    g.a.createElement(
                      "div",
                      { className: "col-md-12 margin-10-top" },
                      g.a.createElement(ee, {
                        notes: this.props.notes,
                        notesPagination: this.props.notesPagination,
                        onSubmitFilter: function() {
                          return e.onSubmitFilter();
                        },
                        fetchNotesData: function() {
                          return e.fetchNotesData();
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
      })(h.Component);
      t.default = Object(N.b)(
        function(e) {
          return {
            notes: e.notes.list,
            notesFilters: e.notes.filters,
            notesSorts: e.notes.sorts,
            notesPagination: e.notes.pagination
          };
        },
        function(e) {
          return Object(v.b)(
            {
              fetchNotes: b,
              clearNotes: E,
              clearFilterNotes: T,
              setNotesPagination: w
            },
            e
          );
        }
      )(se);
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        s = function(e) {
          var t = e.children,
            a = e.className,
            n = e.onMouseEnter,
            o = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
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
          className: l.a.string,
          onMouseEnter: l.a.func,
          onMouseLeave: l.a.func
        }),
        (t.a = s);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        s = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: l.a.string }),
        (t.a = s);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        s = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            o = e.title,
            l = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: l,
              title: o
            },
            r.a.createElement("span", { className: "glyphicon ".concat(a) })
          );
        };
      (s.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (s.propTypes = {
          buttonClassName: l.a.string,
          iconName: l.a.string.isRequired,
          onClickAction: l.a.func,
          title: l.a.string,
          disabled: l.a.bool
        }),
        (t.a = s);
    },
    712: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        s = a(717),
        i = a.n(s),
        c = function(e) {
          var t = e.onPageChangeAction,
            a = e.initialPage,
            n = e.recordsPerPage,
            o = e.totalRecords;
          return r.a.createElement(i.a, {
            onPageChange: t,
            pageCount: Math.ceil(o / n) || 1,
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
        o = (n = r) && n.__esModule ? n : { default: n };
      t.default = o.default;
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
        o = c(r),
        l = c(a(8)),
        s = c(a(719)),
        i = c(a(720));
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
                s = t.breakLabel,
                c = t.breakClassName,
                u = a.state.selected;
              if (r <= n)
                for (var f = 0; f < r; f++) e.push(a.getPageElement(f));
              else {
                var d = n / 2,
                  m = n - d;
                u > r - n / 2
                  ? (d = n - (m = r - u))
                  : u < n / 2 && (m = n - (d = u));
                var p = void 0,
                  h = void 0,
                  g = void 0,
                  N = function(e) {
                    return a.getPageElement(e);
                  };
                for (p = 0; p < r; p++)
                  (h = p + 1) <= l || h > r - l || (p >= u - d && p <= u + m)
                    ? e.push(N(p))
                    : s &&
                      e[e.length - 1] !== g &&
                      ((g = o.default.createElement(i.default, {
                        key: p,
                        breakLabel: s,
                        breakClassName: c
                      })),
                      e.push(g));
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
                  i = a.activeLinkClassName,
                  c = a.extraAriaContext;
                return o.default.createElement(s.default, {
                  key: e,
                  onClick: this.handlePageSelected.bind(null, e),
                  selected: t === e,
                  pageClassName: n,
                  pageLinkClassName: r,
                  activeClassName: l,
                  activeLinkClassName: i,
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
                  s = e.previousLinkClassName,
                  i = e.previousLabel,
                  c = e.nextLinkClassName,
                  u = e.nextLabel,
                  f = this.state.selected,
                  d = a + (0 === f ? " " + t : ""),
                  m = n + (f === r - 1 ? " " + t : "");
                return o.default.createElement(
                  "ul",
                  { className: l },
                  o.default.createElement(
                    "li",
                    { className: d },
                    o.default.createElement(
                      "a",
                      {
                        onClick: this.handlePreviousPage,
                        className: s,
                        href: this.hrefBuilder(f - 1),
                        tabIndex: "0",
                        role: "button",
                        onKeyPress: this.handlePreviousPage
                      },
                      i
                    )
                  ),
                  this.pagination(),
                  o.default.createElement(
                    "li",
                    { className: m },
                    o.default.createElement(
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
        o = (n = r) && n.__esModule ? n : { default: n };
      t.default = function(e) {
        var t = e.pageClassName,
          a = e.pageLinkClassName,
          n = e.onClick,
          r = e.href,
          l =
            "Page " +
            e.page +
            (e.extraAriaContext ? " " + e.extraAriaContext : ""),
          s = null;
        return (
          e.selected &&
            ((s = "page"),
            (l = "Page " + e.page + " is your current page"),
            (t =
              void 0 !== t ? t + " " + e.activeClassName : e.activeClassName),
            void 0 !== a
              ? ((a = a),
                void 0 !== e.activeLinkClassName &&
                  (a = a + " " + e.activeLinkClassName))
              : (a = e.activeLinkClassName)),
          o.default.createElement(
            "li",
            { className: t },
            o.default.createElement(
              "a",
              {
                onClick: n,
                role: "button",
                className: a,
                href: r,
                tabIndex: "0",
                "aria-label": l,
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
        r = a(0),
        o = (n = r) && n.__esModule ? n : { default: n };
      t.default = function(e) {
        var t = e.breakLabel,
          a = e.breakClassName || "break";
        return o.default.createElement("li", { className: a }, t);
      };
    },
    721: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        l = a.n(o),
        s = function(e) {
          var t = e.RowClassName,
            a = e.setSorts,
            n = e.sortColumn,
            o = e.title,
            l = e.width;
          return r.a.createElement(
            "th",
            { className: t, width: l },
            o,
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
      (s.defaultProps = { RowClassName: "" }),
        (s.propTypes = {
          setSorts: l.a.func.isRequired,
          sortColumn: l.a.string.isRequired,
          title: l.a.string.isRequired,
          width: l.a.string.isRequired,
          RowClassName: l.a.string
        }),
        (t.a = s);
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
        o = a(8),
        l = a.n(o),
        s = a(707),
        i = a.n(s),
        c = a(708),
        u = a.n(c),
        f = a(7),
        d = a.n(f);
      d.a.locale("nl");
      var m = function(e) {
        var t = e.className,
          a = e.value,
          n = e.onChangeAction,
          o = e.placeholder,
          l = a ? d()(a).format("L") : "";
        return r.a.createElement(
          "th",
          { className: "DayPicker-overflow ".concat(t) },
          r.a.createElement(i.a, {
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
            inputProps: { className: "form-control input-sm", placeholder: o },
            placeholder: ""
          })
        );
      };
      (m.defaultProps = { className: "", value: null, placeholder: "" }),
        (m.propTypes = {
          className: l.a.string,
          value: l.a.oneOfType([l.a.string, l.a.object]),
          onChangeAction: l.a.func,
          placeholder: l.a.string
        }),
        (t.a = m);
    },
    785: function(e, t, a) {
      "use strict";
      a.d(t, "b", function() {
        return n;
      }),
        a.d(t, "c", function() {
          return r;
        }),
        a.d(t, "a", function() {
          return o;
        });
      var n = function(e) {
          return { type: "FETCH_TASK_DETAILS", id: e };
        },
        r = function(e) {
          return { type: "UPDATE_TASK_DETAILS", task: e };
        },
        o = function(e) {
          return { type: "DELETE_TASK", id: e };
        };
    }
  }
]);
