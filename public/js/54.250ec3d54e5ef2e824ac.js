(window.webpackJsonp = window.webpackJsonp || []).push([
  [54],
  {
    1518: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(0),
        r = a.n(n),
        o = a(24),
        s = a.n(o),
        l = a(25),
        c = a.n(l),
        i = a(22),
        u = a.n(i),
        d = a(26),
        m = a.n(d),
        h = a(27),
        p = a.n(h),
        f = a(16),
        v = a.n(f),
        g = a(6),
        b = a.n(g),
        y = a(32),
        E = a(4),
        N = a(697),
        C = a.n(N),
        k = a(7),
        O = a.n(k),
        w = a(154),
        S = a(54),
        D = a(694),
        T = a(699),
        P = a(692),
        M = a(700),
        A = a(723);
      function x(e, t) {
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
      function G(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? x(Object(a), !0).forEach(function(t) {
                b()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : x(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
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
          var a,
            n = v()(e);
          if (t) {
            var r = v()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return p()(this, a);
        };
      }
      var F = (function(e) {
          m()(a, e);
          var t = j(a);
          function a(e) {
            var n;
            return (
              s()(this, a),
              (n = t.call(this, e)),
              b()(u()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  G(
                    G({}, n.state),
                    {},
                    {
                      contactGroup: G(
                        G({}, n.state.contactGroup),
                        {},
                        b()({}, r, a)
                      )
                    }
                  )
                );
              }),
              b()(u()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.contactGroup,
                  a = {},
                  r = !1,
                  o = !1;
                C.a.isEmpty(t.name) && ((a.name = !0), (r = !0));
                var s = !1;
                n.state.contactGroups.map(function(e) {
                  return e.name == t.name && (s = !0);
                }),
                  s && ((o = "Naam moet uniek zijn."), (a.name = !0), (r = !0)),
                  n.setState(
                    G(G({}, n.state), {}, { errors: a, errorMessage: o })
                  ),
                  !r &&
                    S.a.newContactGroup(t).then(function(e) {
                      E.f.push("/contact-groep/" + e.id);
                    });
              }),
              b()(u()(n), "handleChangeStartedDate", function(e) {
                var t = e ? O()(e).format("Y-MM-DD") : "";
                n.setState(
                  G(
                    G({}, n.state),
                    {},
                    {
                      contactGroup: G(
                        G({}, n.state.contactGroup),
                        {},
                        { dateStarted: t }
                      )
                    }
                  )
                );
              }),
              b()(u()(n), "handleChangeFinishedDate", function(e) {
                var t = e ? O()(e).format("Y-MM-DD") : "";
                n.setState(
                  G(
                    G({}, n.state),
                    {},
                    {
                      contactGroup: G(
                        G({}, n.state.contactGroup),
                        {},
                        { dateFinished: t }
                      )
                    }
                  )
                );
              }),
              b()(u()(n), "handleContactGroupIds", function(e) {
                n.setState(
                  G(
                    G({}, n.state),
                    {},
                    {
                      contactGroup: G(
                        G({}, n.state.contactGroup),
                        {},
                        { contactGroupIds: e }
                      )
                    }
                  )
                );
              }),
              b()(u()(n), "handleChangeComposedGroupType", function(e) {
                n.setState(
                  G(
                    G({}, n.state),
                    {},
                    {
                      contactGroup: G(
                        G({}, n.state.contactGroup),
                        {},
                        { contactGroupComposedType: e }
                      )
                    }
                  )
                );
              }),
              (n.state = {
                contactsWithPermission: [],
                contactGroups: [],
                contactGroup: {
                  id: "",
                  name: "",
                  description: "",
                  closed: !1,
                  responsibleUserId: "",
                  dateStarted: "",
                  dateFinished: "",
                  showContactForm: !1,
                  showPortal: !1,
                  editPortal: !1,
                  contactGroupIds: "",
                  contactGroupComposedType: ""
                },
                errors: { name: !1, nameUnique: !1 }
              }),
              n
            );
          }
          return (
            c()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this,
                    t = this.props.permissions;
                  w.a
                    .fetchUsersWithPermission(
                      t.find(function(e) {
                        return "manage_group" === e.name;
                      }).id
                    )
                    .then(function(t) {
                      e.setState({ contactsWithPermission: t });
                    }),
                    S.a.peekContactGroups().then(function(t) {
                      e.setState({ contactGroups: t });
                    });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.state.contactGroup,
                    a = t.name,
                    n = t.description,
                    o = t.responsibleUserId,
                    s = t.closed,
                    l = t.dateStarted,
                    c = t.dateFinished,
                    i = t.showPortal,
                    u = t.editPortal,
                    d = t.showContactForm,
                    m = t.contactGroupIds;
                  return r.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(D.a, {
                        label: "Naam",
                        name: "name",
                        value: a,
                        onChangeAction: this.handleInputChange,
                        required: "required",
                        error: this.state.errors.name
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(
                        "div",
                        { className: "form-group col-sm-12" },
                        r.a.createElement(
                          "div",
                          { className: "row" },
                          r.a.createElement(
                            "div",
                            { className: "col-sm-3" },
                            r.a.createElement(
                              "label",
                              {
                                htmlFor: "description",
                                className: "col-sm-12"
                              },
                              "Omschrijving"
                            )
                          ),
                          r.a.createElement(
                            "div",
                            { className: "col-sm-9" },
                            r.a.createElement("textarea", {
                              name: "description",
                              value: n,
                              onChange: this.handleInputChange,
                              className: "form-control input-sm"
                            })
                          )
                        )
                      )
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(
                        "div",
                        { className: "form-group col-sm-6" },
                        r.a.createElement(
                          "label",
                          {
                            htmlFor: "responsibleUserId",
                            className: "col-sm-6"
                          },
                          "Verantwoordelijke"
                        ),
                        r.a.createElement(
                          "div",
                          { className: "col-sm-6" },
                          r.a.createElement(
                            "select",
                            {
                              className: "form-control input-sm",
                              id: "responsibleUserId",
                              name: "responsibleUserId",
                              value: o,
                              onChange: this.handleInputChange
                            },
                            r.a.createElement("option", { value: "" }),
                            this.state.contactsWithPermission.map(function(e) {
                              return r.a.createElement(
                                "option",
                                { key: e.id, value: e.id },
                                e.fullName
                              );
                            })
                          )
                        )
                      ),
                      r.a.createElement(M.a, {
                        label: "Gesloten",
                        name: "closed",
                        value: s,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(T.a, {
                        label: "Startdatum",
                        size: "col-sm-6",
                        name: "dateStarted",
                        value: l,
                        onChangeAction: this.handleChangeStartedDate
                      }),
                      r.a.createElement(T.a, {
                        label: "Datum gereed",
                        size: "col-sm-6",
                        name: "dateFinished",
                        value: c,
                        onChangeAction: this.handleChangeFinishedDate
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(M.a, {
                        label: "Zichtbaar op portaal",
                        name: "showPortal",
                        value: i,
                        onChangeAction: this.handleInputChange
                      }),
                      r.a.createElement(M.a, {
                        label: "Veranderen op portaal",
                        name: "editPortal",
                        value: u,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(M.a, {
                        label: "Zichtbaar bij contact",
                        name: "showContactForm",
                        value: d,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(D.a, {
                        label: "Gemaakt op",
                        name: "createdAt",
                        value: O()().format("DD-MM-Y"),
                        readOnly: !0
                      }),
                      r.a.createElement(D.a, {
                        label: "Gemaakt door",
                        name: "createdBy",
                        value: this.props.meDetails.fullName,
                        readOnly: !0
                      })
                    ),
                    r.a.createElement(
                      "div",
                      { className: "row" },
                      r.a.createElement(A.a, {
                        label: "Samengesteld uit",
                        name: "contactGroupsIds",
                        options: this.state.contactGroups,
                        value: m,
                        onChangeAction: this.handleContactGroupIds
                      }),
                      m &&
                        r.a.createElement(
                          "div",
                          { className: "col-xs-6" },
                          r.a.createElement(
                            "div",
                            { className: "row" },
                            r.a.createElement(
                              "div",
                              { className: "col-xs-6" },
                              r.a.createElement("input", {
                                onChange: function() {
                                  return e.handleChangeComposedGroupType("one");
                                },
                                type: "radio",
                                name: "composedGroupType",
                                value: "one",
                                defaultChecked: !0
                              }),
                              "In één van de groepen"
                            ),
                            r.a.createElement(
                              "div",
                              { className: "col-xs-6" },
                              r.a.createElement("input", {
                                onChange: function() {
                                  return e.handleChangeComposedGroupType("all");
                                },
                                type: "radio",
                                name: "composedGroupType",
                                value: "all"
                              }),
                              "In alle groepen"
                            )
                          )
                        )
                    ),
                    this.state.errorMessage &&
                      r.a.createElement(
                        "div",
                        { className: "row" },
                        r.a.createElement(
                          "div",
                          {
                            className:
                              "col-sm-10 col-md-offset-1 alert alert-danger"
                          },
                          this.state.errorMessage
                        )
                      ),
                    r.a.createElement(
                      "div",
                      { className: "panel-footer" },
                      r.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        r.a.createElement(P.a, {
                          buttonText: "Opslaan",
                          onClickAction: this.handleSubmit
                        })
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(n.Component),
        I = Object(y.b)(function(e) {
          return {
            meDetails: e.meDetails,
            permissions: e.systemData.permissions
          };
        })(F),
        B = a(693),
        q = a(690),
        z = a(691),
        R = function() {
          return r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(
              "div",
              { className: "col-sm-12" },
              r.a.createElement(
                q.a,
                null,
                r.a.createElement(
                  z.a,
                  { className: "panel-small" },
                  r.a.createElement(
                    "div",
                    { className: "col-md-4" },
                    r.a.createElement(
                      "div",
                      { className: "btn-group", role: "group" },
                      r.a.createElement(B.a, {
                        iconName: "glyphicon-arrow-left",
                        onClickAction: E.e.goBack
                      })
                    )
                  ),
                  r.a.createElement(
                    "div",
                    { className: "col-md-4" },
                    r.a.createElement(
                      "h4",
                      { className: "text-center" },
                      "Nieuwe groep"
                    )
                  ),
                  r.a.createElement("div", { className: "col-md-4" })
                )
              )
            )
          );
        };
      t.default = function() {
        return r.a.createElement(
          "div",
          { className: "row" },
          r.a.createElement(
            "div",
            { className: "col-md-9" },
            r.a.createElement(
              "div",
              { className: "col-md-12" },
              r.a.createElement(R, null)
            ),
            r.a.createElement(
              "div",
              { className: "col-md-12" },
              r.a.createElement(
                q.a,
                null,
                r.a.createElement(
                  z.a,
                  null,
                  r.a.createElement(
                    "div",
                    { className: "col-md-12" },
                    r.a.createElement(I, null)
                  )
                )
              )
            )
          ),
          r.a.createElement("div", { className: "col-md-3" })
        );
      };
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        l = function(e) {
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
      (l.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (l.propTypes = {
          className: s.a.string,
          onMouseEnter: s.a.func,
          onMouseLeave: s.a.func
        }),
        (t.a = l);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        l = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (l.defaultProps = { className: "" }),
        (l.propTypes = { className: s.a.string }),
        (t.a = l);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        l = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            o = e.type,
            s = e.value,
            l = e.loading,
            c = e.loadText,
            i = e.disabled;
          return l
            ? r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: s,
                  disabled: l
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
                  type: o,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: s,
                  disabled: i
                },
                a
              );
        };
      (l.defaultProps = {
        buttonClassName: "btn-success",
        type: "button",
        value: "",
        loading: !1,
        loadText: "Aan het laden",
        disabled: !1
      }),
        (l.propTypes = {
          buttonClassName: s.a.string,
          buttonText: s.a.string.isRequired,
          onClickAction: s.a.func,
          type: s.a.string,
          value: s.a.string,
          loading: s.a.bool,
          loadText: s.a.string,
          disabled: s.a.bool
        }),
        (t.a = l);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        l = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            o = e.title,
            s = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: s,
              title: o
            },
            r.a.createElement("span", { className: "glyphicon ".concat(a) })
          );
        };
      (l.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (l.propTypes = {
          buttonClassName: s.a.string,
          iconName: s.a.string.isRequired,
          onClickAction: s.a.func,
          title: s.a.string,
          disabled: s.a.bool
        }),
        (t.a = l);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        l = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            o = e.size,
            s = e.id,
            l = e.placeholder,
            c = e.name,
            i = e.value,
            u = e.onClickAction,
            d = e.onChangeAction,
            m = e.onBlurAction,
            h = e.required,
            p = e.readOnly,
            f = e.maxLength,
            v = e.error,
            g = e.min,
            b = e.max,
            y = e.step,
            E = e.errorMessage,
            N = e.divSize,
            C = e.divClassName,
            k = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(N, " ").concat(C) },
            r.a.createElement(
              "label",
              { htmlFor: s, className: "col-sm-6 ".concat(h) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(o) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (v ? "has-error" : ""),
                id: s,
                placeholder: l,
                name: c,
                value: i,
                onClick: u,
                onChange: d,
                onBlur: m,
                readOnly: p,
                maxLength: f,
                min: g,
                max: b,
                autoComplete: k,
                step: y
              })
            ),
            v &&
              r.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                r.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  E
                )
              )
          );
        };
      (l.defaultProps = {
        divClassName: "",
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        name: "",
        type: "text",
        value: "",
        required: "",
        readOnly: !1,
        maxLength: null,
        error: !1,
        min: "",
        max: "",
        step: "",
        errorMessage: "",
        autoComplete: "off",
        onBlurAction: function() {},
        onClickAction: function() {},
        onChangeAction: function() {}
      }),
        (l.propTypes = {
          label: s.a.oneOfType([s.a.string, s.a.object]).isRequired,
          type: s.a.string,
          className: s.a.string,
          divClassName: s.a.string,
          size: s.a.string,
          divSize: s.a.string,
          id: s.a.string,
          placeholder: s.a.string,
          name: s.a.string.isRequired,
          value: s.a.oneOfType([s.a.string, s.a.number]),
          onClickAction: s.a.func,
          onChangeAction: s.a.func,
          onBlurAction: s.a.func,
          required: s.a.string,
          readOnly: s.a.bool,
          maxLength: s.a.string,
          error: s.a.bool,
          min: s.a.string,
          max: s.a.string,
          step: s.a.string,
          errorMessage: s.a.string,
          autoComplete: s.a.string
        }),
        (t.a = l);
    },
    699: function(e, t, a) {
      "use strict";
      var n = a(24),
        r = a.n(n),
        o = a(25),
        s = a.n(o),
        l = a(22),
        c = a.n(l),
        i = a(26),
        u = a.n(i),
        d = a(27),
        m = a.n(d),
        h = a(16),
        p = a.n(h),
        f = a(6),
        v = a.n(f),
        g = a(0),
        b = a.n(g),
        y = a(8),
        E = a.n(y),
        N = a(707),
        C = a.n(N),
        k = a(708),
        O = a.n(k),
        w = a(7),
        S = a.n(w);
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
          var a,
            n = p()(e);
          if (t) {
            var r = p()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return m()(this, a);
        };
      }
      S.a.locale("nl");
      var T = (function(e) {
        u()(a, e);
        var t = D(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            v()(c()(n), "validateDate", function(e) {
              var t = S()(e.target.value, "DD-MM-YYYY", !0),
                a = !1;
              t.isValid() || "" === e.target.value || (a = !0),
                n.props.disabledBefore &&
                  t.isBefore(n.props.disabledBefore) &&
                  (a = !0),
                n.props.disabledAfter &&
                  t.isAfter(n.props.disabledAfter) &&
                  (a = !0),
                n.setState({ errorDateFormat: a });
            }),
            v()(c()(n), "onDateChange", function(e) {
              var t = e ? S()(e).format("Y-MM-DD") : "",
                a = !1;
              t &&
                n.props.disabledBefore &&
                S()(t).isBefore(n.props.disabledBefore) &&
                (a = !0),
                t &&
                  n.props.disabledAfter &&
                  S()(t).isAfter(n.props.disabledAfter) &&
                  (a = !0),
                n.setState({ errorDateFormat: a }),
                !a && n.props.onChangeAction(t, n.props.name);
            }),
            (n.state = { errorDateFormat: !1 }),
            n
          );
        }
        return (
          s()(a, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.label,
                  a = e.className,
                  n = e.size,
                  r = e.divSize,
                  o = e.id,
                  s = e.value,
                  l = e.required,
                  c = e.readOnly,
                  i = e.name,
                  u = e.error,
                  d = e.errorMessage,
                  m = e.disabledBefore,
                  h = e.disabledAfter,
                  p = s ? S()(s).format("L") : "",
                  f = {};
                return (
                  m && (f.before = new Date(m)),
                  h && (f.after = new Date(h)),
                  b.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    b.a.createElement(
                      "div",
                      null,
                      b.a.createElement(
                        "label",
                        { htmlFor: o, className: "col-sm-6 ".concat(l) },
                        t
                      )
                    ),
                    b.a.createElement(
                      "div",
                      { className: "".concat(n) },
                      b.a.createElement(C.a, {
                        id: o,
                        value: p,
                        formatDate: k.formatDate,
                        parseDate: k.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: O.a,
                          disabledDays: f
                        },
                        inputProps: {
                          className:
                            "form-control input-sm ".concat(a) +
                            (this.state.errorDateFormat || u
                              ? " has-error"
                              : ""),
                          name: i,
                          onBlur: this.validateDate,
                          autoComplete: "off",
                          readOnly: c,
                          disabled: c
                        },
                        required: l,
                        readOnly: c,
                        placeholder: ""
                      })
                    ),
                    u &&
                      b.a.createElement(
                        "div",
                        { className: "col-sm-offset-6 col-sm-6" },
                        b.a.createElement(
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
          a
        );
      })(g.Component);
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
          label: E.a.string.isRequired,
          type: E.a.string,
          className: E.a.string,
          size: E.a.string,
          divSize: E.a.string,
          id: E.a.string,
          name: E.a.string,
          value: E.a.oneOfType([E.a.string, E.a.object]),
          onChangeAction: E.a.func,
          required: E.a.string,
          readOnly: E.a.bool,
          error: E.a.bool,
          errorMessage: E.a.string,
          disabledBefore: E.a.string,
          disabledAfter: E.a.string
        }),
        (t.a = T);
    },
    700: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        l = a(703),
        c = a.n(l),
        i = function(e) {
          var t = e.label,
            a = e.size,
            n = e.id,
            o = e.name,
            s = e.value,
            l = e.onChangeAction,
            i = e.required,
            u = e.divSize,
            d = e.className,
            m = e.disabled;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(u, " ").concat(d) },
            r.a.createElement(
              "div",
              null,
              r.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(i) },
                t
              )
            ),
            r.a.createElement(
              "div",
              { className: "".concat(a) },
              r.a.createElement(c.a, {
                id: n,
                name: o,
                onChange: l,
                checked: s,
                disabled: m
              })
            )
          );
        };
      (i.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        required: "",
        disabled: !1,
        value: null
      }),
        (i.propTypes = {
          label: s.a.string.isRequired,
          type: s.a.string,
          size: s.a.string,
          divSize: s.a.string,
          id: s.a.string,
          name: s.a.string.isRequired,
          value: s.a.bool,
          onChangeAction: s.a.func,
          required: s.a.string,
          disabled: s.a.bool
        }),
        (t.a = i);
    },
    703: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var a = arguments[t];
              for (var n in a)
                Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
            }
            return e;
          },
        r = (function() {
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
        s = m(o),
        l = m(a(710)),
        c = m(a(8)),
        i = m(a(704)),
        u = m(a(705)),
        d = a(706);
      function m(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var h = (function(e) {
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
            (a.handleClick = a.handleClick.bind(a)),
            (a.handleTouchStart = a.handleTouchStart.bind(a)),
            (a.handleTouchMove = a.handleTouchMove.bind(a)),
            (a.handleTouchEnd = a.handleTouchEnd.bind(a)),
            (a.handleFocus = a.handleFocus.bind(a)),
            (a.handleBlur = a.handleBlur.bind(a)),
            (a.previouslyChecked = !(!e.checked && !e.defaultChecked)),
            (a.state = {
              checked: !(!e.checked && !e.defaultChecked),
              hasFocus: !1
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
          r(t, [
            {
              key: "componentDidUpdate",
              value: function(e) {
                e.checked !== this.props.checked &&
                  this.setState({ checked: !!this.props.checked });
              }
            },
            {
              key: "handleClick",
              value: function(e) {
                var t = this.input;
                if (e.target !== t && !this.moved)
                  return (
                    (this.previouslyChecked = t.checked),
                    e.preventDefault(),
                    t.focus(),
                    void t.click()
                  );
                var a = this.props.hasOwnProperty("checked")
                  ? this.props.checked
                  : t.checked;
                this.setState({ checked: a });
              }
            },
            {
              key: "handleTouchStart",
              value: function(e) {
                (this.startX = (0, d.pointerCoord)(e).x), (this.activated = !0);
              }
            },
            {
              key: "handleTouchMove",
              value: function(e) {
                if (this.activated && ((this.moved = !0), this.startX)) {
                  var t = (0, d.pointerCoord)(e).x;
                  this.state.checked && t + 15 < this.startX
                    ? (this.setState({ checked: !1 }),
                      (this.startX = t),
                      (this.activated = !0))
                    : t - 15 > this.startX &&
                      (this.setState({ checked: !0 }),
                      (this.startX = t),
                      (this.activated = t < this.startX + 5));
                }
              }
            },
            {
              key: "handleTouchEnd",
              value: function(e) {
                if (this.moved) {
                  var t = this.input;
                  if ((e.preventDefault(), this.startX)) {
                    var a = (0, d.pointerCoord)(e).x;
                    !0 === this.previouslyChecked && this.startX + 4 > a
                      ? this.previouslyChecked !== this.state.checked &&
                        (this.setState({ checked: !1 }),
                        (this.previouslyChecked = this.state.checked),
                        t.click())
                      : this.startX - 4 < a &&
                        this.previouslyChecked !== this.state.checked &&
                        (this.setState({ checked: !0 }),
                        (this.previouslyChecked = this.state.checked),
                        t.click()),
                      (this.activated = !1),
                      (this.startX = null),
                      (this.moved = !1);
                  }
                }
              }
            },
            {
              key: "handleFocus",
              value: function(e) {
                var t = this.props.onFocus;
                t && t(e), this.setState({ hasFocus: !0 });
              }
            },
            {
              key: "handleBlur",
              value: function(e) {
                var t = this.props.onBlur;
                t && t(e), this.setState({ hasFocus: !1 });
              }
            },
            {
              key: "getIcon",
              value: function(e) {
                var a = this.props.icons;
                return a
                  ? void 0 === a[e]
                    ? t.defaultProps.icons[e]
                    : a[e]
                  : null;
              }
            },
            {
              key: "render",
              value: function() {
                var e = this,
                  t = this.props,
                  a = t.className,
                  r =
                    (t.icons,
                    (function(e, t) {
                      var a = {};
                      for (var n in e)
                        t.indexOf(n) >= 0 ||
                          (Object.prototype.hasOwnProperty.call(e, n) &&
                            (a[n] = e[n]));
                      return a;
                    })(t, ["className", "icons"])),
                  o = (0, l.default)(
                    "react-toggle",
                    {
                      "react-toggle--checked": this.state.checked,
                      "react-toggle--focus": this.state.hasFocus,
                      "react-toggle--disabled": this.props.disabled
                    },
                    a
                  );
                return s.default.createElement(
                  "div",
                  {
                    className: o,
                    onClick: this.handleClick,
                    onTouchStart: this.handleTouchStart,
                    onTouchMove: this.handleTouchMove,
                    onTouchEnd: this.handleTouchEnd
                  },
                  s.default.createElement(
                    "div",
                    { className: "react-toggle-track" },
                    s.default.createElement(
                      "div",
                      { className: "react-toggle-track-check" },
                      this.getIcon("checked")
                    ),
                    s.default.createElement(
                      "div",
                      { className: "react-toggle-track-x" },
                      this.getIcon("unchecked")
                    )
                  ),
                  s.default.createElement("div", {
                    className: "react-toggle-thumb"
                  }),
                  s.default.createElement(
                    "input",
                    n({}, r, {
                      ref: function(t) {
                        e.input = t;
                      },
                      onFocus: this.handleFocus,
                      onBlur: this.handleBlur,
                      className: "react-toggle-screenreader-only",
                      type: "checkbox"
                    })
                  )
                );
              }
            }
          ]),
          t
        );
      })(o.PureComponent);
      (t.default = h),
        (h.displayName = "Toggle"),
        (h.defaultProps = {
          icons: {
            checked: s.default.createElement(i.default, null),
            unchecked: s.default.createElement(u.default, null)
          }
        }),
        (h.propTypes = {
          checked: c.default.bool,
          disabled: c.default.bool,
          defaultChecked: c.default.bool,
          onChange: c.default.func,
          onFocus: c.default.func,
          onBlur: c.default.func,
          className: c.default.string,
          name: c.default.string,
          value: c.default.string,
          id: c.default.string,
          "aria-labelledby": c.default.string,
          "aria-label": c.default.string,
          icons: c.default.oneOfType([
            c.default.bool,
            c.default.shape({
              checked: c.default.node,
              unchecked: c.default.node
            })
          ])
        });
    },
    704: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        r = a(0),
        o = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
        return o.default.createElement(
          "svg",
          { width: "14", height: "11", viewBox: "0 0 14 11" },
          o.default.createElement("title", null, "switch-check"),
          o.default.createElement("path", {
            d:
              "M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",
            fill: "#fff",
            fillRule: "evenodd"
          })
        );
      };
    },
    705: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        r = a(0),
        o = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
        return o.default.createElement(
          "svg",
          { width: "10", height: "10", viewBox: "0 0 10 10" },
          o.default.createElement("title", null, "switch-x"),
          o.default.createElement("path", {
            d:
              "M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",
            fill: "#fff",
            fillRule: "evenodd"
          })
        );
      };
    },
    706: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.pointerCoord = function(e) {
          if (e) {
            var t = e.changedTouches;
            if (t && t.length > 0) {
              var a = t[0];
              return { x: a.clientX, y: a.clientY };
            }
            var n = e.pageX;
            if (void 0 !== n) return { x: n, y: e.pageY };
          }
          return { x: 0, y: 0 };
        });
    },
    723: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        s = a.n(o),
        l = a(714),
        c =
          (a(715),
          function(e) {
            var t = e.label,
              a = (e.className, e.size),
              n = e.id,
              o = e.name,
              s = e.value,
              c = e.options,
              i = e.optionId,
              u = e.optionName,
              d = e.onChangeAction,
              m = e.required,
              h = e.multi,
              p = e.error;
            return r.a.createElement(
              "div",
              { className: "form-group col-sm-6" },
              r.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(m) },
                t
              ),
              r.a.createElement(
                "div",
                { className: "".concat(a) },
                r.a.createElement(l.a, {
                  id: n,
                  name: o,
                  value: s,
                  onChange: d,
                  options: c,
                  valueKey: i,
                  labelKey: u,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: h,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: p ? " has-error" : ""
                })
              )
            );
          });
      (c.defaultProps = {
        className: "",
        size: "col-sm-6",
        optionId: "id",
        optionName: "name",
        readOnly: !1,
        required: "",
        error: !1,
        value: "",
        multi: !0
      }),
        (c.propTypes = {
          label: s.a.string.isRequired,
          className: s.a.string,
          size: s.a.string,
          id: s.a.string,
          name: s.a.string.isRequired,
          options: s.a.array,
          optionId: s.a.string,
          optionName: s.a.string,
          value: s.a.string,
          onChangeAction: s.a.func,
          onBlurAction: s.a.func,
          required: s.a.string,
          readOnly: s.a.bool,
          error: s.a.bool,
          multi: s.a.bool
        }),
        (t.a = c);
    }
  }
]);
