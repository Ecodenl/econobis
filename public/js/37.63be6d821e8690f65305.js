(window.webpackJsonp = window.webpackJsonp || []).push([
  [37],
  {
    1493: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(24),
        r = n.n(a),
        i = n(25),
        o = n.n(i),
        c = n(22),
        s = n.n(c),
        l = n(26),
        u = n.n(l),
        p = n(27),
        d = n.n(p),
        f = n(16),
        m = n.n(f),
        v = n(6),
        h = n.n(v),
        E = n(0),
        y = n.n(E),
        g = n(4),
        b = n(690),
        R = n(691),
        N = n(10),
        C = n.n(N);
      function P(e) {
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
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return d()(this, n);
        };
      }
      var T = (function(e) {
          u()(n, e);
          var t = P(n);
          function n(e) {
            return r()(this, n), t.call(this, e);
          }
          return (
            o()(n, [
              {
                key: "render",
                value: function() {
                  var e = this;
                  return y.a.createElement(
                    "nav",
                    { className: "payment-invoices-list open sticky" },
                    y.a.createElement(
                      "div",
                      {
                        className: "send-payment-invoices-sidebar-menu",
                        style: { color: "$brand-primary" }
                      },
                      y.a.createElement(
                        C.a,
                        {
                          highlightColor: "$brand-primary",
                          highlightBgColor: "#e5e5e5",
                          hoverBgColor: "#F1EFF0",
                          defaultSelected: "order"
                        },
                        this.props.participants.length > 0
                          ? this.props.participants.map(function(t, n) {
                              return y.a.createElement(
                                N.Nav,
                                {
                                  onNavClick: function() {
                                    return e.props.changeParticipant(t.id);
                                  },
                                  key: n,
                                  id: "administration-".concat(t.id)
                                },
                                y.a.createElement(
                                  N.NavText,
                                  null,
                                  y.a.createElement(
                                    g.b,
                                    {
                                      className:
                                        "send-payment-invoices-list-link"
                                    },
                                    t.id,
                                    " - ",
                                    t.contact.fullName
                                  )
                                )
                              );
                            })
                          : y.a.createElement(
                              N.Nav,
                              { id: "order" },
                              y.a.createElement(
                                N.NavText,
                                null,
                                y.a.createElement(
                                  g.b,
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
        })(E.Component),
        w = n(203),
        _ = n(731),
        k = n(207);
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
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return d()(this, n);
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
                key: "componentDidUpdate",
                value: function(e) {
                  e.participantId !== this.props.participantId &&
                    this.props.participantId &&
                    this.downloadFile(this.props.participantId);
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
                    .previewPDF(
                      this.props.documentTemplateId,
                      this.props.emailTemplateId,
                      e
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
                    ? y.a.createElement(
                        "div",
                        null,
                        y.a.createElement(_.a, { file: this.state.file })
                      )
                    : y.a.createElement("div", null, "Geen gegevens gevonden.");
                }
              }
            ]),
            n
          );
        })(E.Component),
        M = n(733);
      function D(e) {
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
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return d()(this, n);
        };
      }
      var j = (function(e) {
          u()(n, e);
          var t = D(n);
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
                  this.props.participantId !== e.participantId &&
                    e.participantId &&
                    this.downloadEmail(e.participantId);
                }
              },
              {
                key: "downloadEmail",
                value: function(e) {
                  var t = this;
                  k.a
                    .previewEmail(
                      this.props.documentTemplateId,
                      this.props.emailTemplateId,
                      e
                    )
                    .then(function(e) {
                      t.setState({ email: e });
                    });
                }
              },
              {
                key: "render",
                value: function() {
                  return this.state.email
                    ? y.a.createElement(
                        "div",
                        null,
                        y.a.createElement(
                          "div",
                          { className: "row margin-10-top" },
                          y.a.createElement(
                            "div",
                            { className: "col-sm-12" },
                            y.a.createElement(
                              "div",
                              { className: "row" },
                              y.a.createElement(
                                "div",
                                { className: "col-sm-3" },
                                y.a.createElement(
                                  "label",
                                  { className: "col-sm-12" },
                                  "Aan"
                                )
                              ),
                              y.a.createElement(
                                "div",
                                { className: "col-sm-9" },
                                this.state.email.to
                              )
                            )
                          )
                        ),
                        y.a.createElement(
                          "div",
                          { className: "row margin-10-top" },
                          y.a.createElement(
                            "div",
                            { className: "col-sm-12" },
                            y.a.createElement(
                              "div",
                              { className: "row" },
                              y.a.createElement(
                                "div",
                                { className: "col-sm-3" },
                                y.a.createElement(
                                  "label",
                                  { className: "col-sm-12" },
                                  "Onderwerp"
                                )
                              ),
                              y.a.createElement(
                                "div",
                                { className: "col-sm-9" },
                                this.props.subject
                              )
                            )
                          )
                        ),
                        y.a.createElement(
                          "div",
                          { className: "row" },
                          y.a.createElement(M.a, {
                            label: "Tekst",
                            value: this.state.email.htmlBody
                          })
                        )
                      )
                    : y.a.createElement("div", null, "Geen gegevens gevonden.");
                }
              }
            ]),
            n
          );
        })(E.Component),
        x = n(693),
        S = n(692);
      function A(e) {
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
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return d()(this, n);
        };
      }
      var q = (function(e) {
          u()(n, e);
          var t = A(n);
          function n(e) {
            var a;
            return (
              r()(this, n),
              ((a = t.call(this, e)).state = { showCreate: !1 }),
              a
            );
          }
          return (
            o()(n, [
              {
                key: "render",
                value: function() {
                  var e = this;
                  return y.a.createElement(
                    "div",
                    { className: "row" },
                    y.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      y.a.createElement(
                        "div",
                        {
                          className: "btn-group btn-group-flex margin-small",
                          role: "group"
                        },
                        y.a.createElement(x.a, {
                          iconName: "glyphicon-arrow-left",
                          onClickAction: g.e.goBack
                        }),
                        this.props.amountOfParticipants > 0 &&
                          y.a.createElement(S.a, {
                            buttonText: "Rapportage versturen",
                            onClickAction: function() {
                              e.props.createParticipantReports();
                            }
                          })
                      )
                    ),
                    y.a.createElement(
                      "div",
                      { className: "col-md-4" },
                      y.a.createElement(
                        "h4",
                        { className: "text-center" },
                        "Rapportage aanmaken(",
                        this.props.amountOfParticipants,
                        ")"
                      )
                    ),
                    y.a.createElement("div", { className: "col-md-4" })
                  );
                }
              }
            ]),
            n
          );
        })(E.Component),
        U = n(32),
        L = n(726),
        F = n(100);
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
            a = m()(e);
          if (t) {
            var r = m()(this).constructor;
            n = Reflect.construct(a, arguments, r);
          } else n = a.apply(this, arguments);
          return d()(this, n);
        };
      }
      var B = (function(e) {
        u()(n, e);
        var t = V(n);
        function n(e) {
          var a;
          return (
            r()(this, n),
            (a = t.call(this, e)),
            h()(s()(a), "changeParticipant", function(e) {
              a.setState({ participantId: e });
            }),
            h()(s()(a), "createParticipantReports", function() {
              (document.body.style.cursor = "wait"),
                a.setState({ isBusy: !0 }),
                k.a
                  .createParticipantReport(
                    a.props.reportPreview.templateId,
                    a.props.reportPreview.emailTemplateId,
                    a.props.reportPreview.subject,
                    a.props.reportPreview.participantIds
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
            h()(s()(a), "redirect", function() {
              a.state.redirect ? g.f.push(a.state.redirect) : g.e.goBack();
            }),
            (a.state = {
              participants: [],
              participantId: "",
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
                w.a
                  .peekParticipantsById(this.props.reportPreview.participantIds)
                  .then(function(t) {
                    e.setState({ participants: t.data });
                  });
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearPreviewParticipantReport();
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
                    ? y.a.createElement("div", null, e)
                    : y.a.createElement(
                        "div",
                        null,
                        y.a.createElement(
                          "div",
                          { className: "row" },
                          y.a.createElement(
                            "div",
                            { className: "col-md-12 margin-10-top" },
                            y.a.createElement(
                              "div",
                              { className: "col-md-12 margin-10-top" },
                              y.a.createElement(
                                b.a,
                                null,
                                y.a.createElement(
                                  R.a,
                                  { className: "panel-small" },
                                  y.a.createElement(q, {
                                    createParticipantReports: this
                                      .createParticipantReports,
                                    amountOfParticipants: this.state
                                      .participants
                                      ? this.state.participants.length
                                      : 0,
                                    administrationId: this.props.params.id
                                  })
                                )
                              )
                            )
                          )
                        ),
                        y.a.createElement(
                          "div",
                          { className: "row" },
                          y.a.createElement(
                            "div",
                            { className: "col-md-2" },
                            y.a.createElement(
                              "div",
                              { className: "col-md-12 margin-10-top" },
                              y.a.createElement(
                                b.a,
                                null,
                                y.a.createElement(
                                  R.a,
                                  { className: "panel-invoice-payments-list" },
                                  y.a.createElement(T, {
                                    participants: this.state.participants,
                                    changeParticipant: this.changeParticipant
                                  })
                                )
                              )
                            )
                          ),
                          y.a.createElement(
                            "div",
                            { className: "col-md-5" },
                            y.a.createElement(
                              "div",
                              { className: "col-md-12 margin-10-top" },
                              y.a.createElement(
                                b.a,
                                null,
                                y.a.createElement(
                                  R.a,
                                  null,
                                  y.a.createElement(I, {
                                    subject: this.props.reportPreview.subject,
                                    documentTemplateId: this.props.reportPreview
                                      .templateId,
                                    emailTemplateId: this.props.reportPreview
                                      .emailTemplateId,
                                    participantId: this.state.participantId
                                  })
                                )
                              )
                            )
                          ),
                          y.a.createElement(
                            "div",
                            { className: "col-md-5" },
                            y.a.createElement(
                              "div",
                              { className: "col-md-12 margin-10-top" },
                              y.a.createElement(
                                b.a,
                                null,
                                y.a.createElement(
                                  R.a,
                                  null,
                                  y.a.createElement(j, {
                                    subject: this.props.reportPreview.subject,
                                    documentTemplateId: this.props.reportPreview
                                      .templateId,
                                    emailTemplateId: this.props.reportPreview
                                      .emailTemplateId,
                                    participantId: this.state.participantId
                                  })
                                )
                              )
                            )
                          )
                        ),
                        this.state.successMessage &&
                          y.a.createElement(
                            F.a,
                            {
                              closeModal: this.redirect,
                              buttonCancelText: "Ok",
                              showConfirmAction: !1,
                              title: "Succes"
                            },
                            this.state.successMessage
                          ),
                        this.state.errorMessage &&
                          y.a.createElement(
                            F.a,
                            {
                              closeModal: this.redirect,
                              buttonCancelText: "Ok",
                              showConfirmAction: !1,
                              title: "Waarschuwing"
                            },
                            y.a.createElement(
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
      })(E.Component);
      t.default = Object(U.b)(
        function(e) {
          return { reportPreview: e.projectParticipantReportPreview };
        },
        function(e) {
          return {
            clearPreviewParticipantReport: function() {
              e(Object(L.a)());
            }
          };
        }
      )(B);
    },
    690: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        i = n(8),
        o = n.n(i),
        c = function(e) {
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
      (c.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (c.propTypes = {
          className: o.a.string,
          onMouseEnter: o.a.func,
          onMouseLeave: o.a.func
        }),
        (t.a = c);
    },
    691: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        i = n(8),
        o = n.n(i),
        c = function(e) {
          var t = e.className,
            n = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            n
          );
        };
      (c.defaultProps = { className: "" }),
        (c.propTypes = { className: o.a.string }),
        (t.a = c);
    },
    692: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        i = n(8),
        o = n.n(i),
        c = function(e) {
          var t = e.buttonClassName,
            n = e.buttonText,
            a = e.onClickAction,
            i = e.type,
            o = e.value,
            c = e.loading,
            s = e.loadText,
            l = e.disabled;
          return c
            ? r.a.createElement(
                "button",
                {
                  type: i,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: o,
                  disabled: c
                },
                r.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                s
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
      (c.defaultProps = {
        buttonClassName: "btn-success",
        type: "button",
        value: "",
        loading: !1,
        loadText: "Aan het laden",
        disabled: !1
      }),
        (c.propTypes = {
          buttonClassName: o.a.string,
          buttonText: o.a.string.isRequired,
          onClickAction: o.a.func,
          type: o.a.string,
          value: o.a.string,
          loading: o.a.bool,
          loadText: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = c);
    },
    693: function(e, t, n) {
      "use strict";
      var a = n(0),
        r = n.n(a),
        i = n(8),
        o = n.n(i),
        c = function(e) {
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
      (c.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (c.propTypes = {
          buttonClassName: o.a.string,
          iconName: o.a.string.isRequired,
          onClickAction: o.a.func,
          title: o.a.string,
          disabled: o.a.bool
        }),
        (t.a = c);
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
          return c;
        }),
        n.d(t, "g", function() {
          return s;
        }),
        n.d(t, "i", function() {
          return l;
        }),
        n.d(t, "m", function() {
          return u;
        }),
        n.d(t, "j", function() {
          return p;
        }),
        n.d(t, "b", function() {
          return d;
        }),
        n.d(t, "l", function() {
          return f;
        }),
        n.d(t, "a", function() {
          return m;
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
        c = function(e) {
          return { type: "UPDATE_VALUE_COURSE", valueCourse: e };
        },
        s = function(e) {
          return { type: "DELETE_VALUE_COURSE", id: e };
        },
        l = function(e) {
          return { type: "FETCH_PROJECT_REVENUE", id: e };
        },
        u = function(e) {
          return { type: "PROJECT_REVENUE_PREVIEW_REPORT", data: e };
        },
        p = function(e) {
          return { type: "PROJECT_REVENUE_GET_DISTRIBUTION", data: e };
        },
        d = function() {
          return { type: "CLEAR_PROJECT_REVENUE_PREVIEW_REPORT" };
        },
        f = function(e) {
          return { type: "PROJECT_PARTICIPANT_PREVIEW_REPORT", data: e };
        },
        m = function() {
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
        c = n(775),
        s = n.n(c),
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
      var p = function(e) {
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
      p.propTypes = {
        page: o.a.number.isRequired,
        pages: o.a.number.isRequired
      };
      var d = function(e) {
        var t = e.page,
          n = e.pages,
          a = e.handlePrevClick,
          i = e.handleNextClick;
        return r.a.createElement(
          "div",
          { className: "customWrapper" },
          r.a.createElement(l, { page: t, pages: n, handlePrevClick: a }),
          r.a.createElement(p, { page: t, pages: n }),
          r.a.createElement(u, { page: t, pages: n, handleNextClick: i })
        );
      };
      d.propTypes = {
        page: o.a.number.isRequired,
        pages: o.a.number.isRequired,
        handlePrevClick: o.a.func.isRequired,
        handleNextClick: o.a.func.isRequired
      };
      var f = d;
      (s.a.defaultProps = { file: "", scale: 1 }),
        (s.a.propTypes = { file: o.a.string, scale: o.a.number });
      t.a = function(e) {
        var t = e.file,
          n = e.scale;
        return r.a.createElement(
          "div",
          { className: "panel-heading" },
          r.a.createElement(s.a, {
            document: { file: t },
            navigation: f,
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
        c = n(8),
        s = n.n(c),
        l = n(690),
        u = n(692),
        p = function(e) {
          var t = e.label,
            n = e.className,
            a = e.id,
            i = e.value,
            c = e.switchToEdit;
          return r.a.createElement(
            "div",
            { className: n },
            r.a.createElement(
              "label",
              { htmlFor: a, className: "col-sm-3" },
              t,
              c
                ? r.a.createElement(
                    "span",
                    null,
                    r.a.createElement("br", null),
                    r.a.createElement(u.a, {
                      buttonClassName: "btn-success btn-padding-small",
                      buttonText: "Wijzig",
                      onClickAction: c
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
      (p.defaultProps = { className: "col-sm-12", value: "" }),
        (p.propTypes = {
          label: s.a.string.isRequired,
          className: s.a.string,
          id: s.a.string,
          value: s.a.oneOfType([s.a.string, s.a.number])
        }),
        (t.a = p);
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
        c = u(n(103)),
        s = u(n(8)),
        l = u(n(741));
      function u(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var p,
        d = "undefined" != typeof window && window.console,
        f = function() {},
        m = f,
        v = f;
      d &&
        ((p = console.error),
        (m = function() {
          console.error = function(e) {
            /<head>/.test(e) || p.call(console, e);
          };
        }),
        (v = function() {
          return (console.error = p);
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
                e && t && c.default.unmountComponentAtNode(t);
              }
            },
            {
              key: "getDoc",
              value: function() {
                return c.default.findDOMNode(this).contentDocument;
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
                      m();
                    var r = n
                        ? this.props.contentDidMount
                        : this.props.contentDidUpdate,
                      i = this.getMountTarget();
                    c.default.unstable_renderSubtreeIntoContainer(
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
        style: s.default.object,
        head: s.default.node,
        initialContent: s.default.string,
        mountTarget: s.default.string,
        contentDidMount: s.default.func,
        contentDidUpdate: s.default.func,
        children: s.default.oneOfType([
          s.default.element,
          s.default.arrayOf(s.default.element)
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
      function c(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function s(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      var l = (function(e) {
        function t() {
          return (
            c(this, t),
            s(
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
