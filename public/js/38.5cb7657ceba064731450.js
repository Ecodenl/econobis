(window.webpackJsonp = window.webpackJsonp || []).push([
  [38],
  {
    1492: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        i = n(25),
        o = n.n(i),
        s = n(22),
        c = n.n(s),
        l = n(26),
        u = n.n(l),
        d = n(27),
        p = n.n(d),
        m = n(16),
        f = n.n(m),
        v = n(6),
        h = n.n(v),
        b = n(0),
        E = n.n(b),
        y = n(4),
        g = n(690),
        R = n(691),
        N = (n(198), n(10)),
        C = n.n(N);
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var w = (function(e) {
          u()(n, e);
          var t = T(n);
          function n(e) {
            return r()(this, n), t.call(this, e);
          }
          return (
            o()(n, [
              {
                key: "render",
                value: function() {
                  var e = this;
                  return E.a.createElement(
                    "nav",
                    { className: "payment-invoices-list open sticky" },
                    E.a.createElement(
                      "div",
                      {
                        className: "send-payment-invoices-sidebar-menu",
                        style: { color: "$brand-primary" }
                      },
                      E.a.createElement(
                        C.a,
                        {
                          highlightColor: "$brand-primary",
                          highlightBgColor: "#e5e5e5",
                          hoverBgColor: "#F1EFF0",
                          defaultSelected: "order"
                        },
                        this.props.distributions.length > 0
                          ? this.props.distributions.map(function(t, n) {
                              return E.a.createElement(
                                N.Nav,
                                {
                                  onNavClick: function() {
                                    return e.props.changeDistribution(t.id);
                                  },
                                  key: n,
                                  id: "administration-".concat(t.id)
                                },
                                E.a.createElement(
                                  N.NavText,
                                  null,
                                  E.a.createElement(
                                    y.b,
                                    {
                                      className:
                                        "send-payment-invoices-list-link"
                                    },
                                    t.id,
                                    " - ",
                                    t.contactName
                                  )
                                )
                              );
                            })
                          : E.a.createElement(
                              N.Nav,
                              { id: "order" },
                              E.a.createElement(
                                N.NavText,
                                null,
                                E.a.createElement(
                                  y.b,
                                  {
                                    className: "send-payment-invoices-list-link"
                                  },
                                  "Geen opbrengstverdeling beschikbaar."
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
        })(b.Component),
        P = n(203),
        _ = n(731),
        k = n(92);
      function O(e) {
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
      var I = (function(e) {
          u()(n, e);
          var t = O(n);
          function n(e) {
            var a;
            return (
              r()(this, n), ((a = t.call(this, e)).state = { file: null }), a
            );
          }
          return (
            o()(n, [
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  this.props.distributionId !== e.distributionId &&
                    e.distributionId &&
                    this.downloadFile(e.distributionId);
                }
              },
              {
                key: "downloadFile",
                value: function(e) {
                  var t = this,
                    n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : 0;
                  k.a
                    .downloadPreview(
                      e,
                      this.props.subject,
                      this.props.documentTemplateId,
                      this.props.emailTemplateId
                    )
                    .then(function(e) {
                      t.setState({ file: e.data });
                    })
                    .catch(function() {
                      n < 2 &&
                        setTimeout(function() {
                          t.downloadFile(e, n);
                        }, 500),
                        n++;
                    });
                }
              },
              {
                key: "render",
                value: function() {
                  return this.state.file
                    ? E.a.createElement(
                        "div",
                        null,
                        E.a.createElement(_.a, { file: this.state.file })
                      )
                    : E.a.createElement("div", null, "Geen gegevens gevonden.");
                }
              }
            ]),
            n
          );
        })(b.Component),
        D = n(733);
      function j(e) {
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
      var M = (function(e) {
          u()(n, e);
          var t = j(n);
          function n(e) {
            var a;
            return (
              r()(this, n), ((a = t.call(this, e)).state = { email: null }), a
            );
          }
          return (
            o()(n, [
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  this.props.distributionId !== e.distributionId &&
                    e.distributionId &&
                    this.downloadEmail(e.distributionId);
                }
              },
              {
                key: "downloadEmail",
                value: function(e) {
                  var t = this;
                  k.a
                    .previewEmail(
                      e,
                      this.props.subject,
                      this.props.documentTemplateId,
                      this.props.emailTemplateId
                    )
                    .then(function(e) {
                      t.setState({ email: e.data });
                    });
                }
              },
              {
                key: "render",
                value: function() {
                  return this.state.email
                    ? E.a.createElement(
                        "div",
                        null,
                        E.a.createElement(
                          "div",
                          { className: "row margin-10-top" },
                          E.a.createElement(
                            "div",
                            { className: "col-sm-12" },
                            E.a.createElement(
                              "div",
                              { className: "row" },
                              E.a.createElement(
                                "div",
                                { className: "col-sm-3" },
                                E.a.createElement(
                                  "label",
                                  { className: "col-sm-12" },
                                  "Aan"
                                )
                              ),
                              E.a.createElement(
                                "div",
                                { className: "col-sm-9" },
                                this.state.email.to
                              )
                            )
                          )
                        ),
                        E.a.createElement(
                          "div",
                          { className: "row margin-10-top" },
                          E.a.createElement(
                            "div",
                            { className: "col-sm-12" },
                            E.a.createElement(
                              "div",
                              { className: "row" },
                              E.a.createElement(
                                "div",
                                { className: "col-sm-3" },
                                E.a.createElement(
                                  "label",
                                  { className: "col-sm-12" },
                                  "Onderwerp"
                                )
                              ),
                              E.a.createElement(
                                "div",
                                { className: "col-sm-9" },
                                this.state.email.subject
                              )
                            )
                          )
                        ),
                        E.a.createElement(
                          "div",
                          { className: "row" },
                          E.a.createElement(D.a, {
                            label: "Tekst",
                            value: this.state.email.htmlBody
                          })
                        )
                      )
                    : E.a.createElement("div", null, "Geen gegevens gevonden.");
                }
              }
            ]),
            n
          );
        })(b.Component),
        x = n(693),
        S = n(692),
        A = function(e) {
          var t = e.amountOfDistributions,
            n = e.createRevenueReport;
          return E.a.createElement(
            "div",
            { className: "row" },
            E.a.createElement(
              "div",
              { className: "col-md-4" },
              E.a.createElement(
                "div",
                {
                  className: "btn-group btn-group-flex margin-small",
                  role: "group"
                },
                E.a.createElement(x.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: y.e.goBack
                }),
                t > 0 &&
                  E.a.createElement(S.a, {
                    buttonText: "Rapportage versturen",
                    onClickAction: function() {
                      return n();
                    }
                  })
              )
            ),
            E.a.createElement(
              "div",
              { className: "col-md-4" },
              E.a.createElement(
                "h4",
                { className: "text-center" },
                "Rapportage aanmaken(",
                t,
                ")"
              )
            ),
            E.a.createElement("div", { className: "col-md-4" })
          );
        },
        q = n(32),
        U = n(726),
        L = n(100);
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
          var n,
            a = f()(e);
          if (t) {
            var r = f()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return p()(this, n);
        };
      }
      var F = (function(e) {
        u()(n, e);
        var t = V(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            (a = t.call(this, e)),
            h()(c()(a), "changeDistribution", function(e) {
              a.setState({ distributionId: e });
            }),
            h()(c()(a), "createRevenueReport", function() {
              (document.body.style.cursor = "wait"),
                a.setState({ isBusy: !0 }),
                k.a
                  .createRevenueReport(
                    a.props.reportPreview.templateId,
                    a.props.reportPreview.emailTemplateId,
                    a.props.reportPreview.subject,
                    a.props.reportPreview.distributionIds
                  )
                  .then(function(e) {
                    (document.body.style.cursor = "default"),
                      e.data
                        ? a.setState({
                            errorMessage: "Fouten bij verzenden rapporten",
                            isBusy: !1
                          })
                        : a.setState({
                            successMessage:
                              "De rapporten zijn aangeboden voor verzenden.",
                            isBusy: !1
                          });
                  });
            }),
            h()(c()(a), "redirect", function() {
              a.state.redirect ? y.f.push(a.state.redirect) : y.e.goBack();
            }),
            (a.state = {
              distributions: [],
              distribution: {},
              successMessage: "",
              errorMessage: "",
              redirect: "",
              isBusy: !1
            }),
            a
          );
        }
        return (
          o()(n, [
            {
              key: "componentDidMount",
              value: function() {
                var e = this;
                k.a.fetchProjectRevenue(this.props.params.id).then(function(t) {
                  e.setState({ distribution: t });
                }),
                  P.a
                    .peekDistributionsById(
                      this.props.reportPreview.distributionIds
                    )
                    .then(function(t) {
                      e.setState({ distributions: t.data });
                    });
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearPreviewReport();
              }
            },
            {
              key: "render",
              value: function() {
                var e = "",
                  t = !0;
                return (
                  this.state.isBusy
                    ? (e =
                        "Bezig met versturen rapportage. Dit kan enige tijd duren.")
                    : (t = !1),
                  t
                    ? E.a.createElement("div", null, e)
                    : E.a.createElement(
                        "div",
                        null,
                        E.a.createElement(
                          "div",
                          { className: "row" },
                          E.a.createElement(
                            "div",
                            { className: "col-md-12 margin-10-top" },
                            E.a.createElement(
                              "div",
                              { className: "col-md-12 margin-10-top" },
                              E.a.createElement(
                                g.a,
                                null,
                                E.a.createElement(
                                  R.a,
                                  { className: "panel-small" },
                                  E.a.createElement(A, {
                                    createRevenueReport: this
                                      .createRevenueReport,
                                    amountOfDistributions: this.state
                                      .distributions
                                      ? this.state.distributions.length
                                      : 0,
                                    distributionTypeId:
                                      this.state.distribution &&
                                      this.state.distribution
                                        .distributionTypeId,
                                    distributionCategoryCodeRef:
                                      this.state.distribution &&
                                      this.state.distribution.category &&
                                      this.state.distribution.category.codeRef
                                  })
                                )
                              )
                            )
                          )
                        ),
                        E.a.createElement(
                          "div",
                          { className: "row" },
                          E.a.createElement(
                            "div",
                            { className: "col-md-2" },
                            E.a.createElement(
                              "div",
                              { className: "col-md-12 margin-10-top" },
                              E.a.createElement(
                                g.a,
                                null,
                                E.a.createElement(
                                  R.a,
                                  { className: "panel-invoice-payments-list" },
                                  E.a.createElement(w, {
                                    distributions: this.state.distributions,
                                    changeDistribution: this.changeDistribution
                                  })
                                )
                              )
                            )
                          ),
                          E.a.createElement(
                            "div",
                            { className: "col-md-5" },
                            E.a.createElement(
                              "div",
                              { className: "col-md-12 margin-10-top" },
                              E.a.createElement(
                                g.a,
                                null,
                                E.a.createElement(
                                  R.a,
                                  null,
                                  E.a.createElement(I, {
                                    subject: this.props.reportPreview.subject,
                                    documentTemplateId: this.props.reportPreview
                                      .templateId,
                                    emailTemplateId: this.props.reportPreview
                                      .emailTemplateId,
                                    distributionId: this.state.distributionId
                                  })
                                )
                              )
                            )
                          ),
                          E.a.createElement(
                            "div",
                            { className: "col-md-5" },
                            E.a.createElement(
                              "div",
                              { className: "col-md-12 margin-10-top" },
                              E.a.createElement(
                                g.a,
                                null,
                                E.a.createElement(
                                  R.a,
                                  null,
                                  E.a.createElement(M, {
                                    subject: this.props.reportPreview.subject,
                                    documentTemplateId: this.props.reportPreview
                                      .templateId,
                                    emailTemplateId: this.props.reportPreview
                                      .emailTemplateId,
                                    distributionId: this.state.distributionId
                                  })
                                )
                              )
                            )
                          )
                        ),
                        this.state.successMessage &&
                          E.a.createElement(
                            L.a,
                            {
                              closeModal: this.redirect,
                              buttonCancelText: "Ok",
                              showConfirmAction: !1,
                              title: "Succes"
                            },
                            this.state.successMessage
                          ),
                        this.state.errorMessage &&
                          E.a.createElement(
                            L.a,
                            {
                              closeModal: this.redirect,
                              buttonCancelText: "Ok",
                              showConfirmAction: !1,
                              title: "Waarschuwing"
                            },
                            E.a.createElement(
                              "h4",
                              null,
                              this.state.errorMessage
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
      t.default = Object(q.b)(
        function(e) {
          return { reportPreview: e.projectRevenueReportPreview };
        },
        function(e) {
          return {
            clearPreviewReport: function() {
              e(Object(U.b)());
            }
          };
        }
      )(F);
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
            c = e.loadText,
            l = e.disabled;
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
                c
              )
            : r.a.createElement(
                "button",
                {
                  type: i,
                  className: "btn btn-sm ".concat(t),
                  onClick: a,
                  value: o,
                  disabled: l
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
    726: function(e, t, n) {
      "use strict";
      n.d(t, "h", function() {
        return a;
      }),
        n.d(t, "e", function() {
          return r;
        }),
        n.d(t, "c", function() {
          return i;
        }),
        n.d(t, "k", function() {
          return o;
        }),
        n.d(t, "n", function() {
          return s;
        }),
        n.d(t, "g", function() {
          return c;
        }),
        n.d(t, "i", function() {
          return l;
        }),
        n.d(t, "m", function() {
          return u;
        }),
        n.d(t, "j", function() {
          return d;
        }),
        n.d(t, "b", function() {
          return p;
        }),
        n.d(t, "l", function() {
          return m;
        }),
        n.d(t, "a", function() {
          return f;
        }),
        n.d(t, "d", function() {
          return v;
        }),
        n.d(t, "f", function() {
          return h;
        });
      var a = function(e) {
          return { type: "FETCH_PROJECT", id: e };
        },
        r = function(e) {
          return { type: "DELETE_PROJECT", id: e };
        },
        i = function() {
          return { type: "CLEAR_PROJECT" };
        },
        o = function(e) {
          return { type: "NEW_VALUE_COURSE", valueCourse: e };
        },
        s = function(e) {
          return { type: "UPDATE_VALUE_COURSE", valueCourse: e };
        },
        c = function(e) {
          return { type: "DELETE_VALUE_COURSE", id: e };
        },
        l = function(e) {
          return { type: "FETCH_PROJECT_REVENUE", id: e };
        },
        u = function(e) {
          return { type: "PROJECT_REVENUE_PREVIEW_REPORT", data: e };
        },
        d = function(e) {
          return { type: "PROJECT_REVENUE_GET_DISTRIBUTION", data: e };
        },
        p = function() {
          return { type: "CLEAR_PROJECT_REVENUE_PREVIEW_REPORT" };
        },
        m = function(e) {
          return { type: "PROJECT_PARTICIPANT_PREVIEW_REPORT", data: e };
        },
        f = function() {
          return { type: "CLEAR_PROJECT_PARTICIPANT_PREVIEW_REPORT" };
        },
        v = function() {
          return { type: "CLEAR_PROJECT_REVENUE" };
        },
        h = function(e) {
          return { type: "DELETE_REVENUE", id: e };
        };
    },
    731: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        i = n(8),
        o = n.n(i),
        s = n(775),
        c = n.n(s),
        l = function(e) {
          var t = e.page,
            n = (e.pages, e.handlePrevClick);
          return 1 === t
            ? r.a.createElement("div", null)
            : r.a.createElement(
                "h3",
                {
                  style: {
                    cursor: "pointer",
                    display: "inline-block",
                    marginRight: 24,
                    marginTop: 0
                  },
                  onClick: n
                },
                "<"
              );
        };
      l.propTypes = {
        page: o.a.number.isRequired,
        pages: o.a.number.isRequired,
        handlePrevClick: o.a.func.isRequired
      };
      var u = function(e) {
        var t = e.page,
          n = e.pages,
          a = e.handleNextClick;
        return t === n
          ? r.a.createElement("div", null)
          : r.a.createElement(
              "h3",
              {
                style: {
                  cursor: "pointer",
                  display: "inline-block",
                  marginLeft: 24,
                  marginTop: 0
                },
                onClick: a
              },
              ">"
            );
      };
      u.propTypes = {
        page: o.a.number.isRequired,
        pages: o.a.number.isRequired,
        handleNextClick: o.a.func.isRequired
      };
      var d = function(e) {
        var t = e.page,
          n = e.pages;
        return r.a.createElement(
          "h3",
          { style: { display: "inline-block", marginTop: 0 } },
          "Pagina ",
          t,
          " van ",
          n
        );
      };
      d.propTypes = {
        page: o.a.number.isRequired,
        pages: o.a.number.isRequired
      };
      var p = function(e) {
        var t = e.page,
          n = e.pages,
          a = e.handlePrevClick,
          i = e.handleNextClick;
        return r.a.createElement(
          "div",
          { className: "customWrapper" },
          r.a.createElement(l, { page: t, pages: n, handlePrevClick: a }),
          r.a.createElement(d, { page: t, pages: n }),
          r.a.createElement(u, { page: t, pages: n, handleNextClick: i })
        );
      };
      p.propTypes = {
        page: o.a.number.isRequired,
        pages: o.a.number.isRequired,
        handlePrevClick: o.a.func.isRequired,
        handleNextClick: o.a.func.isRequired
      };
      var m = p;
      (c.a.defaultProps = { file: "", scale: 1 }),
        (c.a.propTypes = { file: o.a.string, scale: o.a.number });
      t.a = function(e) {
        var t = e.file,
          n = e.scale;
        return r.a.createElement(
          "div",
          { className: "panel-heading" },
          r.a.createElement(c.a, {
            document: { file: t },
            navigation: m,
            scale: n
          })
        );
      };
    },
    733: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        i = n(739),
        o = n.n(i),
        s = n(8),
        c = n.n(s),
        l = n(690),
        u = n(692),
        d = function(e) {
          var t = e.label,
            n = e.className,
            a = e.id,
            i = e.value,
            s = e.switchToEdit;
          return r.a.createElement(
            "div",
            { className: n },
            r.a.createElement(
              "label",
              { htmlFor: a, className: "col-sm-3" },
              t,
              s
                ? r.a.createElement(
                    "span",
                    null,
                    r.a.createElement("br", null),
                    r.a.createElement(u.a, {
                      buttonClassName: "btn-success btn-padding-small",
                      buttonText: "Wijzig",
                      onClickAction: s
                    })
                  )
                : ""
            ),
            r.a.createElement(
              l.a,
              { className: "col-sm-9" },
              r.a.createElement(
                o.a,
                null,
                r.a.createElement("div", {
                  id: a,
                  dangerouslySetInnerHTML: { __html: i }
                })
              )
            )
          );
        };
      (d.defaultProps = { className: "col-sm-12", value: "" }),
        (d.propTypes = {
          label: c.a.string.isRequired,
          className: c.a.string,
          id: c.a.string,
          value: c.a.oneOfType([c.a.string, c.a.number])
        }),
        (t.a = d);
    },
    739: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a,
        r = n(740),
        i = (a = r) && a.__esModule ? a : { default: a };
      t.default = i.default;
    },
    740: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var a in n)
                Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
            }
            return e;
          },
        r = (function() {
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
        i = n(0),
        o = u(i),
        s = u(n(103)),
        c = u(n(8)),
        l = u(n(741));
      function u(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var d,
        p = "undefined" != typeof window && window.console,
        m = function() {},
        f = m,
        v = m;
      p &&
        ((d = console.error),
        (f = function() {
          console.error = function(e) {
            /<head>/.test(e) || d.call(console, e);
          };
        }),
        (v = function() {
          return (console.error = d);
        }));
      var h = (function(e) {
        function t(e, n) {
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
          })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
          return (a._isMounted = !1), a;
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
          r(t, [
            {
              key: "componentDidMount",
              value: function() {
                (this._isMounted = !0), this.renderFrameContents();
              }
            },
            {
              key: "componentDidUpdate",
              value: function() {
                this.renderFrameContents();
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this._isMounted = !1;
                var e = this.getDoc(),
                  t = this.getMountTarget();
                e && t && s.default.unmountComponentAtNode(t);
              }
            },
            {
              key: "getDoc",
              value: function() {
                return s.default.findDOMNode(this).contentDocument;
              }
            },
            {
              key: "getMountTarget",
              value: function() {
                var e = this.getDoc();
                return this.props.mountTarget
                  ? e.querySelector(this.props.mountTarget)
                  : e.body.children[0];
              }
            },
            {
              key: "renderFrameContents",
              value: function() {
                if (this._isMounted) {
                  var e = this.getDoc();
                  if (e && "complete" === e.readyState) {
                    null === e.querySelector("div") &&
                      (this._setInitialContent = !1);
                    var t = e.defaultView || e.parentView,
                      n = !this._setInitialContent,
                      a = o.default.createElement(
                        l.default,
                        { document: e, window: t },
                        o.default.createElement(
                          "div",
                          { className: "frame-content" },
                          this.props.head,
                          this.props.children
                        )
                      );
                    n &&
                      (e.open("text/html", "replace"),
                      e.write(this.props.initialContent),
                      e.close(),
                      (this._setInitialContent = !0)),
                      f();
                    var r = n
                        ? this.props.contentDidMount
                        : this.props.contentDidUpdate,
                      i = this.getMountTarget();
                    s.default.unstable_renderSubtreeIntoContainer(
                      this,
                      a,
                      i,
                      r
                    ),
                      v();
                  } else setTimeout(this.renderFrameContents.bind(this), 0);
                }
              }
            },
            {
              key: "render",
              value: function() {
                var e = a({}, this.props, { children: void 0 });
                return (
                  delete e.head,
                  delete e.initialContent,
                  delete e.mountTarget,
                  delete e.contentDidMount,
                  delete e.contentDidUpdate,
                  o.default.createElement("iframe", e)
                );
              }
            }
          ]),
          t
        );
      })(i.Component);
      (h.propTypes = {
        style: c.default.object,
        head: c.default.node,
        initialContent: c.default.string,
        mountTarget: c.default.string,
        contentDidMount: c.default.func,
        contentDidUpdate: c.default.func,
        children: c.default.oneOfType([
          c.default.element,
          c.default.arrayOf(c.default.element)
        ])
      }),
        (h.defaultProps = {
          style: {},
          head: null,
          children: void 0,
          mountTarget: void 0,
          contentDidMount: function() {},
          contentDidUpdate: function() {},
          initialContent:
            '<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'
        }),
        (t.default = h);
    },
    741: function(e, t, n) {
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
        i = (o(r), o(n(8)));
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function s(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function c(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      var l = (function(e) {
        function t() {
          return (
            s(this, t),
            c(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
            )
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
              key: "getChildContext",
              value: function() {
                return {
                  document: this.props.document,
                  window: this.props.window
                };
              }
            },
            {
              key: "render",
              value: function() {
                return r.Children.only(this.props.children);
              }
            }
          ]),
          t
        );
      })(r.Component);
      (l.propTypes = {
        document: i.default.object.isRequired,
        window: i.default.object.isRequired,
        children: i.default.element.isRequired
      }),
        (l.childContextTypes = {
          document: i.default.object.isRequired,
          window: i.default.object.isRequired
        }),
        (t.default = l);
    },
    779: function(e, t) {},
    780: function(e, t) {},
    781: function(e, t) {},
    782: function(e, t) {},
    783: function(e, t) {}
  }
]);
