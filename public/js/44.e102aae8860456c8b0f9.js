(window.webpackJsonp = window.webpackJsonp || []).push([
  [44],
  {
    1441: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        o = a.n(n),
        r = a(25),
        i = a.n(r),
        l = a(22),
        s = a.n(l),
        c = a(26),
        u = a.n(c),
        m = a(27),
        d = a.n(m),
        p = a(16),
        f = a.n(p),
        g = a(0),
        h = a.n(g),
        b = a(32),
        y = function(e, t, a) {
          return {
            type: "FETCH_DOCUMENTS",
            filters: e,
            sorts: t,
            pagination: a
          };
        },
        v = function() {
          return { type: "CLEAR_DOCUMENTS" };
        },
        D = a(4),
        k = a(693),
        E = Object(b.b)(function(e) {
          return {
            permissions: e.meDetails.permissions,
            documents: e.documents.list
          };
        })(function(e) {
          var t = function(e) {
              D.f.push("document/nieuw/".concat(e));
            },
            a = e.permissions,
            n = void 0 === a ? {} : a,
            o = e.documents.meta,
            r = void 0 === o ? {} : o;
          return h.a.createElement(
            "div",
            { className: "row" },
            h.a.createElement(
              "div",
              { className: "col-md-4" },
              h.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                h.a.createElement(k.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: D.e.goBack
                }),
                h.a.createElement(k.a, {
                  iconName: "glyphicon-refresh",
                  onClickAction: e.resetDocumentsFilters
                }),
                n.createDocument &&
                  h.a.createElement(
                    "div",
                    { className: "nav navbar-nav btn-group", role: "group" },
                    h.a.createElement(
                      "button",
                      {
                        className: "btn btn-success btn-sm",
                        "data-toggle": "dropdown"
                      },
                      h.a.createElement("span", {
                        className: "glyphicon glyphicon-plus"
                      })
                    ),
                    h.a.createElement(
                      "ul",
                      { className: "dropdown-menu" },
                      h.a.createElement(
                        "li",
                        null,
                        h.a.createElement(
                          "a",
                          {
                            className: "btn",
                            onClick: function() {
                              return t("internal");
                            }
                          },
                          "Maak document"
                        )
                      ),
                      h.a.createElement(
                        "li",
                        null,
                        h.a.createElement(
                          "a",
                          {
                            className: "btn",
                            onClick: function() {
                              return t("upload");
                            }
                          },
                          "Upload document"
                        )
                      )
                    )
                  )
              )
            ),
            h.a.createElement(
              "div",
              { className: "col-md-4" },
              h.a.createElement(
                "h3",
                { className: "text-center table-title" },
                "Documenten"
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
        C = a(199),
        P = a.n(C),
        N = a(6),
        w = a.n(N),
        A = a(146),
        R = a(147),
        O = a(200),
        T = a(7),
        S = a.n(T),
        x = a(151),
        I = a(711),
        L = a.n(I);
      function F(e) {
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
            var o = f()(this).constructor;
            a = Reflect.construct(n, arguments, o);
          } else a = n.apply(this, arguments);
          return d()(this, a);
        };
      }
      var B = (function(e) {
          u()(a, e);
          var t = F(a);
          function a(e) {
            var n;
            return (
              o()(this, a),
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
                  D.f.push("document/".concat(e));
                }
              },
              {
                key: "download",
                value: function(e) {
                  var t = this;
                  x.a.download(e).then(function(e) {
                    L()(e.data, t.props.filename);
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props,
                    a = t.id,
                    n = t.number,
                    o = t.createdAt,
                    r = t.filename,
                    i = t.contact,
                    l = t.documentType,
                    s = t.documentGroup;
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
                    h.a.createElement("td", null, n),
                    h.a.createElement(
                      "td",
                      null,
                      o ? S()(o).format("DD-MM-Y") : "Onbekend"
                    ),
                    h.a.createElement("td", null, r),
                    h.a.createElement("td", null, i && i.fullName),
                    h.a.createElement("td", null, l),
                    h.a.createElement("td", null, s),
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
                      this.state.showActionButtons &&
                        r.toLowerCase().endsWith(".pdf")
                        ? h.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return D.f.push("/document/inzien/".concat(a));
                              }
                            },
                            h.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-eye-open mybtn-success"
                            }),
                            " "
                          )
                        : "",
                      this.state.showActionButtons
                        ? h.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: function() {
                                return e.download(a);
                              }
                            },
                            h.a.createElement("span", {
                              className:
                                "glyphicon glyphicon-open-file mybtn-success"
                            }),
                            " "
                          )
                        : "",
                      this.state.showActionButtons &&
                        this.props.permissions.createDocument
                        ? h.a.createElement(
                            "a",
                            {
                              role: "button",
                              onClick: this.props.showDeleteItemModal.bind(
                                this,
                                a,
                                r
                              )
                            },
                            h.a.createElement("span", {
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
        })(g.Component),
        M = Object(b.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(B),
        j = a(100),
        _ = Object(b.b)(null, function(e) {
          return {
            deleteDocument: function(t) {
              e(
                (function(e) {
                  return { type: "DELETE_DOCUMENT", id: e };
                })(t)
              );
            }
          };
        })(function(e) {
          return h.a.createElement(
            j.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return e.deleteDocument(e.id), void e.closeDeleteItemModal();
              },
              title: "Verwijderen"
            },
            "Verwijder document: ",
            h.a.createElement("strong", null, " ", e.filename, " ")
          );
        }),
        U = a(712),
        V = a(721),
        W = (a(883), a(101)),
        q = Object(b.b)(null, function(e) {
          return {
            setDocumentSortsFilter: function(t, a) {
              e(
                (function(e, t) {
                  return { type: "SET_DOCUMENT_SORTS", field: e, order: t };
                })(t, a)
              );
            }
          };
        })(function(e) {
          var t = function(t, a) {
            e.setDocumentSortsFilter(t, a),
              setTimeout(function() {
                e.fetchDocumentsData();
              }, 100);
          };
          return h.a.createElement(
            "tr",
            { className: "thead-title" },
            h.a.createElement(V.a, {
              sortColumn: "number",
              title: "Document",
              width: "10%",
              setSorts: t
            }),
            h.a.createElement(V.a, {
              sortColumn: "date",
              title: "Datum",
              width: "10%",
              setSorts: t
            }),
            h.a.createElement(V.a, {
              sortColumn: "filename",
              title: "Bestandsnaam",
              width: "10%",
              setSorts: t
            }),
            h.a.createElement(V.a, {
              sortColumn: "contact",
              title: "Contact",
              width: "20%",
              setSorts: t
            }),
            h.a.createElement(V.a, {
              sortColumn: "documentType",
              title: "Type",
              width: "20%",
              setSorts: t
            }),
            h.a.createElement(V.a, {
              sortColumn: "documentGroup",
              title: "Documentgroep",
              width: "10%",
              setSorts: t
            }),
            h.a.createElement(W.a, { title: "", width: "6%" })
          );
        }),
        K = a(14),
        G =
          (a(735),
          function(e) {
            return { type: "SET_FILTER_DOCUMENT_NUMBER", number: e };
          }),
        Q = function(e) {
          return { type: "SET_FILTER_DOCUMENT_DATE", date: e };
        },
        Y = function(e) {
          return { type: "SET_FILTER_DOCUMENT_FILENAME", filename: e };
        },
        z = function(e) {
          return { type: "SET_FILTER_DOCUMENT_CONTACT", contact: e };
        },
        J = function(e) {
          return { type: "SET_FILTER_DOCUMENT_DOCUMENT_TYPE", documentType: e };
        },
        H = function(e) {
          return {
            type: "SET_FILTER_DOCUMENT_DOCUMENT_GROUP",
            documentGroup: e
          };
        },
        X = function() {
          return { type: "CLEAR_FILTER_DOCUMENT" };
        },
        Z = a(725),
        $ = Object(b.b)(
          function(e) {
            return {
              filters: e.documents.filters,
              documentTypes: e.systemData.documentTypes,
              documentGroups: e.systemData.documentGroups
            };
          },
          function(e) {
            return Object(K.b)(
              {
                setFilterDocumentNumber: G,
                setFilterDocumentDate: Q,
                setFilterDocumentFilename: Y,
                setFilterDocumentContact: z,
                setFilterDocumentDocumentType: J,
                setFilterDocumentDocumentGroup: H
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
              h.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: e.filters.number.data,
                onChange: function(t) {
                  e.setFilterDocumentNumber(t.target.value);
                }
              })
            ),
            h.a.createElement(Z.a, {
              value: e.filters.date.data && e.filters.date.data,
              onChangeAction: function(t) {
                void 0 === t
                  ? e.setFilterDocumentDate("")
                  : e.setFilterDocumentDate(S()(t).format("Y-MM-DD"));
              }
            }),
            h.a.createElement(
              "th",
              null,
              h.a.createElement("input", {
                type: "text",
                className: "form-control input-sm",
                value: e.filters.filename.data,
                onChange: function(t) {
                  e.setFilterDocumentFilename(t.target.value);
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
                  e.setFilterDocumentContact(t.target.value);
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
                  value: e.filters.documentType.data,
                  onChange: function(t) {
                    e.setFilterDocumentDocumentType(t.target.value),
                      setTimeout(function() {
                        e.onSubmitFilter();
                      }, 100);
                  }
                },
                h.a.createElement("option", null),
                e.documentTypes.map(function(e) {
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
              h.a.createElement(
                "select",
                {
                  className: "form-control input-sm",
                  value: e.filters.documentGroup.data,
                  onChange: function(t) {
                    e.setFilterDocumentDocumentGroup(t.target.value),
                      setTimeout(function() {
                        e.onSubmitFilter();
                      }, 100);
                  }
                },
                h.a.createElement("option", null),
                e.documentGroups.map(function(e) {
                  return h.a.createElement(
                    "option",
                    { key: e.id, value: e.id },
                    e.name
                  );
                })
              )
            ),
            h.a.createElement("th", null)
          );
        });
      function ee(e, t) {
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
      function te(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ee(Object(a), !0).forEach(function(t) {
                w()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : ee(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
            n = f()(e);
          if (t) {
            var o = f()(this).constructor;
            a = Reflect.construct(n, arguments, o);
          } else a = n.apply(this, arguments);
          return d()(this, a);
        };
      }
      var ne = (function(e) {
          u()(a, e);
          var t = ae(a);
          function a(e) {
            var n;
            return (
              o()(this, a),
              (n = t.call(this, e)),
              w()(s()(n), "handleKeyUp", function(e) {
                13 === e.keyCode && n.props.onSubmitFilter();
              }),
              w()(s()(n), "showDeleteItemModal", function(e, t) {
                n.setState(
                  te(
                    te({}, n.state),
                    {},
                    {
                      showDeleteItem: !0,
                      deleteItem: te(
                        te({}, n.state.deleteItem),
                        {},
                        { id: e, filename: t }
                      )
                    }
                  )
                );
              }),
              w()(s()(n), "closeDeleteItemModal", function() {
                n.setState(
                  te(
                    te({}, n.state),
                    {},
                    {
                      showDeleteItem: !1,
                      deleteItem: te(
                        te({}, n.state.deleteItem),
                        {},
                        { id: "", filename: "" }
                      )
                    }
                  )
                );
              }),
              (n.state = {
                showDeleteItem: !1,
                deleteItem: { id: "", filename: "" }
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
                    t = this.props.documents,
                    a = t.data,
                    n = void 0 === a ? [] : a,
                    o = t.meta,
                    r = void 0 === o ? {} : o,
                    i = "",
                    l = !0;
                  return (
                    this.props.hasError
                      ? (i = "Fout bij het ophalen van documenten.")
                      : this.props.isLoading
                      ? (i = "Gegevens aan het laden.")
                      : 0 === n.length
                      ? (i = "Geen documenten gevonden!")
                      : (l = !1),
                    h.a.createElement(
                      "div",
                      null,
                      h.a.createElement(
                        "form",
                        { onKeyUp: this.handleKeyUp },
                        h.a.createElement(
                          A.a,
                          null,
                          h.a.createElement(
                            R.a,
                            null,
                            h.a.createElement(q, {
                              fetchDocumentsData: function() {
                                return e.props.fetchDocumentsData();
                              }
                            }),
                            h.a.createElement($, {
                              onSubmitFilter: this.props.onSubmitFilter
                            })
                          ),
                          h.a.createElement(
                            O.a,
                            null,
                            l
                              ? h.a.createElement(
                                  "tr",
                                  null,
                                  h.a.createElement("td", { colSpan: 7 }, i)
                                )
                              : n.map(function(t) {
                                  return h.a.createElement(
                                    M,
                                    P()({ key: t.id }, t, {
                                      showDeleteItemModal: e.showDeleteItemModal
                                    })
                                  );
                                })
                          )
                        ),
                        h.a.createElement(
                          "div",
                          { className: "col-md-6 col-md-offset-3" },
                          h.a.createElement(U.a, {
                            onPageChangeAction: this.props.handlePageClick,
                            totalRecords: r.total,
                            initialPage: this.props.documentsPagination.page
                          })
                        )
                      ),
                      this.state.showDeleteItem &&
                        h.a.createElement(
                          _,
                          P()(
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
        })(g.Component),
        oe = Object(b.b)(function(e) {
          return {
            documents: e.documents.list,
            documentsPagination: e.documents.pagination,
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        }, null)(ne),
        re = a(722),
        ie = function(e) {
          return { type: "SET_DOCUMENTS_PAGINATION", pagination: e };
        };
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
            n = f()(e);
          if (t) {
            var o = f()(this).constructor;
            a = Reflect.construct(n, arguments, o);
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
            o()(this, a),
            ((n = t.call(
              this,
              e
            )).fetchDocumentsData = n.fetchDocumentsData.bind(s()(n))),
            (n.resetDocumentsFilters = n.resetDocumentsFilters.bind(s()(n))),
            (n.handlePageClick = n.handlePageClick.bind(s()(n))),
            n
          );
        }
        return (
          i()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.fetchDocumentsData();
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearDocuments();
              }
            },
            {
              key: "resetDocumentsFilters",
              value: function() {
                this.props.clearFilterDocuments(), this.fetchDocumentsData();
              }
            },
            {
              key: "onSubmitFilter",
              value: function() {
                this.props.clearDocuments(),
                  this.props.setDocumentsPagination({ page: 0, offset: 0 }),
                  this.fetchDocumentsData();
              }
            },
            {
              key: "fetchDocumentsData",
              value: function() {
                var e = this;
                setTimeout(function() {
                  var t = Object(re.a)(e.props.documentsFilters),
                    a = e.props.documentsSorts,
                    n = {
                      limit: 20,
                      offset: e.props.documentsPagination.offset
                    };
                  e.props.fetchDocuments(t, a, n);
                }, 100);
              }
            },
            {
              key: "handlePageClick",
              value: function(e) {
                var t = e.selected,
                  a = Math.ceil(20 * t);
                this.props.setDocumentsPagination({ page: t, offset: a }),
                  this.fetchDocumentsData();
              }
            },
            {
              key: "render",
              value: function() {
                var e = this;
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
                        h.a.createElement(E, {
                          resetDocumentsFilters: function() {
                            return e.resetDocumentsFilters();
                          }
                        })
                      ),
                      h.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        h.a.createElement(oe, {
                          handlePageClick: this.handlePageClick,
                          documents: this.props.documents,
                          documentsPagination: this.props.documentsPagination,
                          onSubmitFilter: function() {
                            return e.onSubmitFilter();
                          },
                          fetchDocumentsData: function() {
                            return e.fetchDocumentsData();
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
      t.default = Object(b.b)(
        function(e) {
          return {
            documents: e.documents.list,
            documentsPagination: e.documents.pagination,
            documentsFilters: e.documents.filters,
            documentsSorts: e.documents.sorts
          };
        },
        function(e) {
          return Object(K.b)(
            {
              fetchDocuments: y,
              clearDocuments: v,
              clearFilterDocuments: X,
              setDocumentsPagination: ie
            },
            e
          );
        }
      )(se);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        r = a(8),
        i = a.n(r),
        l = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            r = e.title,
            i = e.disabled;
          return o.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: i,
              title: r
            },
            o.a.createElement("span", { className: "glyphicon ".concat(a) })
          );
        };
      (l.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (l.propTypes = {
          buttonClassName: i.a.string,
          iconName: i.a.string.isRequired,
          onClickAction: i.a.func,
          title: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = l);
    },
    711: function(e, t) {
      e.exports = function(e, t, a, n) {
        var o = new Blob(void 0 !== n ? [n, e] : [e], {
          type: a || "application/octet-stream"
        });
        if (void 0 !== window.navigator.msSaveBlob)
          window.navigator.msSaveBlob(o, t);
        else {
          var r =
              window.URL && window.URL.createObjectURL
                ? window.URL.createObjectURL(o)
                : window.webkitURL.createObjectURL(o),
            i = document.createElement("a");
          (i.style.display = "none"),
            (i.href = r),
            i.setAttribute("download", t),
            void 0 === i.download && i.setAttribute("target", "_blank"),
            document.body.appendChild(i),
            i.click(),
            setTimeout(function() {
              document.body.removeChild(i), window.URL.revokeObjectURL(r);
            }, 200);
        }
      };
    },
    712: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        r = a(8),
        i = a.n(r),
        l = a(717),
        s = a.n(l),
        c = function(e) {
          var t = e.onPageChangeAction,
            a = e.initialPage,
            n = e.recordsPerPage,
            r = e.totalRecords;
          return o.a.createElement(s.a, {
            onPageChange: t,
            pageCount: Math.ceil(r / n) || 1,
            pageRangeDisplayed: 5,
            marginPagesDisplayed: 2,
            breakLabel: o.a.createElement("a", null, "..."),
            breakClassName: "break-me",
            containerClassName: "pagination",
            activeClassName: "active",
            previousLabel: o.a.createElement(
              "span",
              { "aria-hidden": "true" },
              "«"
            ),
            nextLabel: o.a.createElement(
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
        o = a(718),
        r = (n = o) && n.__esModule ? n : { default: n };
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
        o = a(0),
        r = c(o),
        i = c(a(8)),
        l = c(a(719)),
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
                o = t.pageCount,
                i = t.marginPagesDisplayed,
                l = t.breakLabel,
                c = t.breakClassName,
                u = a.state.selected;
              if (o <= n)
                for (var m = 0; m < o; m++) e.push(a.getPageElement(m));
              else {
                var d = n / 2,
                  p = n - d;
                u > o - n / 2
                  ? (d = n - (p = o - u))
                  : u < n / 2 && (p = n - (d = u));
                var f = void 0,
                  g = void 0,
                  h = void 0,
                  b = function(e) {
                    return a.getPageElement(e);
                  };
                for (f = 0; f < o; f++)
                  (g = f + 1) <= i || g > o - i || (f >= u - d && f <= u + p)
                    ? e.push(b(f))
                    : l &&
                      e[e.length - 1] !== h &&
                      ((h = r.default.createElement(s.default, {
                        key: f,
                        breakLabel: l,
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
                  o = a.pageLinkClassName,
                  i = a.activeClassName,
                  s = a.activeLinkClassName,
                  c = a.extraAriaContext;
                return r.default.createElement(l.default, {
                  key: e,
                  onClick: this.handlePageSelected.bind(null, e),
                  selected: t === e,
                  pageClassName: n,
                  pageLinkClassName: o,
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
                  o = e.pageCount,
                  i = e.containerClassName,
                  l = e.previousLinkClassName,
                  s = e.previousLabel,
                  c = e.nextLinkClassName,
                  u = e.nextLabel,
                  m = this.state.selected,
                  d = a + (0 === m ? " " + t : ""),
                  p = n + (m === o - 1 ? " " + t : "");
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
                        className: l,
                        href: this.hrefBuilder(m - 1),
                        tabIndex: "0",
                        role: "button",
                        onKeyPress: this.handlePreviousPage
                      },
                      s
                    )
                  ),
                  this.pagination(),
                  r.default.createElement(
                    "li",
                    { className: p },
                    r.default.createElement(
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
      })(o.Component);
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
        o = a(0),
        r = (n = o) && n.__esModule ? n : { default: n };
      t.default = function(e) {
        var t = e.pageClassName,
          a = e.pageLinkClassName,
          n = e.onClick,
          o = e.href,
          i =
            "Page " +
            e.page +
            (e.extraAriaContext ? " " + e.extraAriaContext : ""),
          l = null;
        return (
          e.selected &&
            ((l = "page"),
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
                href: o,
                tabIndex: "0",
                "aria-label": i,
                "aria-current": l,
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
        o = a(0),
        r = (n = o) && n.__esModule ? n : { default: n };
      t.default = function(e) {
        var t = e.breakLabel,
          a = e.breakClassName || "break";
        return r.default.createElement("li", { className: a }, t);
      };
    },
    721: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        r = a(8),
        i = a.n(r),
        l = function(e) {
          var t = e.RowClassName,
            a = e.setSorts,
            n = e.sortColumn,
            r = e.title,
            i = e.width;
          return o.a.createElement(
            "th",
            { className: t, width: i },
            r,
            o.a.createElement("span", {
              className: "glyphicon glyphicon-arrow-down pull-right small",
              role: "button",
              onClick: a.bind(void 0, n, "ASC")
            }),
            o.a.createElement("span", {
              className: "glyphicon glyphicon-arrow-up pull-right small",
              role: "button",
              onClick: a.bind(void 0, n, "DESC")
            })
          );
        };
      (l.defaultProps = { RowClassName: "" }),
        (l.propTypes = {
          setSorts: i.a.func.isRequired,
          sortColumn: i.a.string.isRequired,
          title: i.a.string.isRequired,
          width: i.a.string.isRequired,
          RowClassName: i.a.string
        }),
        (t.a = l);
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
        o = a.n(n),
        r = a(8),
        i = a.n(r),
        l = a(707),
        s = a.n(l),
        c = a(708),
        u = a.n(c),
        m = a(7),
        d = a.n(m);
      d.a.locale("nl");
      var p = function(e) {
        var t = e.className,
          a = e.value,
          n = e.onChangeAction,
          r = e.placeholder,
          i = a ? d()(a).format("L") : "";
        return o.a.createElement(
          "th",
          { className: "DayPicker-overflow ".concat(t) },
          o.a.createElement(s.a, {
            value: i,
            onDayChange: n,
            formatDate: c.formatDate,
            parseDate: c.parseDate,
            dayPickerProps: {
              showWeekNumbers: !0,
              locale: "nl",
              firstDayOfWeek: 1,
              localeUtils: u.a
            },
            inputProps: { className: "form-control input-sm", placeholder: r },
            placeholder: ""
          })
        );
      };
      (p.defaultProps = { className: "", value: null, placeholder: "" }),
        (p.propTypes = {
          className: i.a.string,
          value: i.a.oneOfType([i.a.string, i.a.object]),
          onChangeAction: i.a.func,
          placeholder: i.a.string
        }),
        (t.a = p);
    },
    735: function(e, t, a) {
      var n = a(736);
      "string" == typeof n && (n = [[e.i, n, ""]]);
      var o = { hmr: !0, transform: void 0, insertInto: void 0 };
      a(205)(n, o);
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
