(window.webpackJsonp = window.webpackJsonp || []).push([
  [81],
  {
    1514: function(e, a, t) {
      "use strict";
      t.r(a);
      var n = t(24),
        r = t.n(n),
        o = t(25),
        s = t.n(o),
        i = t(22),
        l = t.n(i),
        c = t(26),
        u = t.n(c),
        d = t(27),
        m = t.n(d),
        p = t(16),
        g = t.n(p),
        h = t(6),
        f = t.n(h),
        y = t(0),
        v = t.n(y),
        E = t(697),
        b = t.n(E),
        w = t(4),
        k = t(690),
        N = t(691),
        C = t(693);
      function A(e) {
        var a = (function() {
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
          var t,
            n = g()(e);
          if (a) {
            var r = g()(this).constructor;
            t = Reflect.construct(n, arguments, r);
          } else t = n.apply(this, arguments);
          return m()(this, t);
        };
      }
      var j = (function(e) {
          u()(t, e);
          var a = A(t);
          function t(e) {
            return r()(this, t), a.call(this, e);
          }
          return (
            s()(t, [
              {
                key: "render",
                value: function() {
                  return v.a.createElement(
                    "div",
                    { className: "row" },
                    v.a.createElement(
                      "div",
                      { className: "col-sm-12" },
                      v.a.createElement(
                        k.a,
                        null,
                        v.a.createElement(
                          N.a,
                          { className: "panel-small" },
                          v.a.createElement(
                            "div",
                            { className: "col-md-4" },
                            v.a.createElement(
                              "div",
                              {
                                className:
                                  "btn-group btn-group-flex margin-small",
                                role: "group"
                              },
                              v.a.createElement(C.a, {
                                iconName: "glyphicon-arrow-left",
                                onClickAction: w.e.goBack
                              })
                            )
                          ),
                          v.a.createElement(
                            "div",
                            { className: "col-md-4" },
                            v.a.createElement(
                              "h3",
                              { className: "text-center table-title" },
                              "Nieuwe opbrengst"
                            )
                          ),
                          v.a.createElement("div", { className: "col-md-4" })
                        )
                      )
                    )
                  );
                }
              }
            ]),
            t
          );
        })(y.Component),
        I = t(784),
        P = t.n(I),
        R = t(32),
        D = t(7),
        T = t.n(D),
        B = t(696),
        O = t(699),
        S = t(692),
        M = t(702),
        F = t(694),
        L = t(786),
        x = t(695);
      function q() {
        var e = P()(["\n    font-weight: normal;\n"]);
        return (
          (q = function() {
            return e;
          }),
          e
        );
      }
      T.a.locale("nl");
      var K = L.a.em(q()),
        H = Object(R.b)(function(e) {
          return {
            projectRevenueTypes: e.systemData.projectRevenueTypes,
            projectRevenueCategories: e.systemData.projectRevenueCategories,
            projectRevenueDistributionTypes:
              e.systemData.projectRevenueDistributionTypes,
            participantProjectPayoutTypes:
              e.systemData.participantProjectPayoutTypes
          };
        })(function(e) {
          var a = e.revenue,
            t = a.distributionTypeId,
            n = a.confirmed,
            r = a.dateBegin,
            o = a.dateEnd,
            s = a.dateReference,
            i = (a.dateConfirmed, a.payoutTypeId),
            l = a.kwhStart,
            c = a.kwhEnd,
            u = a.kwhStartHigh,
            d = a.kwhEndHigh,
            m = a.kwhStartLow,
            p = a.kwhEndLow,
            g = a.revenue,
            h = a.payPercentage,
            f = a.payAmount,
            y = a.keyAmountFirstPercentage,
            E = a.payPercentageValidFromKeyAmount,
            b = a.categoryId,
            w = a.payoutKwh,
            k = e.projectRevenueCategories.find(function(e) {
              return e.id == b;
            }),
            N = "";
          return (
            e.project &&
              e.project.projectType &&
              e.project.projectType.codeRef &&
              (N = e.project.projectType.codeRef),
            v.a.createElement(
              "form",
              {
                className: "form-horizontal col-md-12",
                onSubmit: e.handleSubmit
              },
              v.a.createElement(
                "div",
                { className: "row" },
                v.a.createElement(
                  "div",
                  { className: "panel-heading" },
                  v.a.createElement(
                    "span",
                    { className: "h5 text-bold" },
                    "Algemeen"
                  )
                )
              ),
              v.a.createElement(
                "div",
                { className: "row" },
                v.a.createElement(x.a, {
                  label: "Soort",
                  value: k ? k.name : "",
                  className: "form-group col-sm-6"
                }),
                v.a.createElement(x.a, {
                  label: "Definitief",
                  value: n ? "Ja" : "Nee",
                  className: "form-group col-sm-6"
                })
              ),
              "revenueEuro" === k.codeRef
                ? v.a.createElement(
                    "div",
                    { className: "row" },
                    "obligation" === N
                      ? v.a.createElement(B.a, {
                          label: "Type opbrengst verdeling",
                          name: "distributionTypeId",
                          options: e.projectRevenueDistributionTypes,
                          value: t,
                          onChangeAction: e.handleInputChange,
                          error: e.errors.distributionTypeId
                        })
                      : null,
                    "inPossessionOf" === t
                      ? v.a.createElement(O.a, {
                          label: "Peildatum",
                          name: "dateReference",
                          value: s,
                          onChangeAction: e.handleInputChangeDate,
                          required: "required",
                          error: e.errors.dateReference
                        })
                      : null
                  )
                : null,
              "redemptionEuro" === k.codeRef
                ? v.a.createElement(
                    "div",
                    { className: "row" },
                    "inPossessionOf" === t
                      ? v.a.createElement(O.a, {
                          label: "Peildatum",
                          name: "dateReference",
                          value: s,
                          onChangeAction: e.handleInputChangeDate,
                          required: "required",
                          error: e.errors.dateReference
                        })
                      : null
                  )
                : null,
              v.a.createElement(
                "div",
                { className: "row" },
                v.a.createElement(O.a, {
                  label: "Begin periode",
                  name: "dateBegin",
                  value: r,
                  onChangeAction: e.handleInputChangeDate,
                  required: "required",
                  error: e.errors.dateBegin,
                  errorMessage: e.errorMessage.dateBegin,
                  disabledBefore:
                    "revenueEuro" !== k.codeRef ||
                    ("loan" !== N && "obligation" !== N)
                      ? "redemptionEuro" === k.codeRef
                        ? e.project.dateInterestBearingRedemption
                        : "revenueKwh" === k.codeRef
                        ? e.project.dateInterestBearingKwh
                        : ""
                      : e.project.dateInterestBearing
                }),
                v.a.createElement(O.a, {
                  label: "Eind periode",
                  name: "dateEnd",
                  value: o,
                  onChangeAction: e.handleInputChangeDate,
                  required: "required",
                  error: e.errors.dateEnd,
                  errorMessage: e.errorMessage.dateEnd,
                  disabledBefore: r,
                  disabledAfter:
                    "revenueKwh" === k.codeRef
                      ? T()(r)
                          .add(1, "year")
                          .add(6, "month")
                          .format("Y-MM-DD")
                      : T()(r)
                          .endOf("year")
                          .format("Y-MM-DD")
                })
              ),
              v.a.createElement(
                "div",
                { className: "row" },
                v.a.createElement("div", { className: "form-group col-sm-6" }),
                "revenueEuro" !== k.codeRef ||
                  ("capital" !== N && "postalcode_link_capital" !== N)
                  ? null
                  : v.a.createElement(B.a, {
                      label: "Uitkeren op",
                      name: "payoutTypeId",
                      id: "payoutTypeId",
                      options: e.participantProjectPayoutTypes,
                      value: i,
                      onChangeAction: e.handleInputChange,
                      required: "required",
                      error: e.errors.payoutTypeId,
                      errorMessage: e.errorMessage.payoutTypeId
                    })
              ),
              "revenueKwh" === k.codeRef
                ? v.a.createElement(
                    v.a.Fragment,
                    null,
                    v.a.createElement(
                      "div",
                      { className: "row" },
                      v.a.createElement(
                        "div",
                        { className: "panel-part panel-heading" },
                        v.a.createElement(
                          "span",
                          { className: "h5 text-bold" },
                          "Opbrengst kWh"
                        )
                      )
                    ),
                    v.a.createElement(
                      "div",
                      { className: "row" },
                      e.project.kwhStartHighNextRevenue > 0
                        ? v.a.createElement(F.a, {
                            type: "number",
                            label: "Beginstand kWh hoog",
                            name: "kwhStartHigh",
                            value: u,
                            readOnly: !0
                          })
                        : v.a.createElement(F.a, {
                            type: "number",
                            label: "Beginstand kWh hoog",
                            name: "kwhStartHigh",
                            value: u,
                            onChangeAction: e.handleInputChange
                          }),
                      v.a.createElement(F.a, {
                        type: "number",
                        label: "Eindstand kWh hoog",
                        name: "kwhEndHigh",
                        value: d,
                        onChangeAction: e.handleInputChange,
                        error: e.errors.kwhEndHigh,
                        errorMessage: e.errorMessage.kwhEndHigh
                      })
                    ),
                    v.a.createElement(
                      "div",
                      { className: "row" },
                      e.project.kwhStartHighNextRevenue > 0
                        ? v.a.createElement(F.a, {
                            type: "number",
                            label: "Beginstand kWh laag",
                            name: "kwhStartLow",
                            value: m,
                            readOnly: !0
                          })
                        : v.a.createElement(F.a, {
                            type: "number",
                            label: "Beginstand kWh laag",
                            name: "kwhStartLow",
                            value: m,
                            onChangeAction: e.handleInputChange
                          }),
                      v.a.createElement(F.a, {
                        type: "number",
                        label: "Eindstand kWh laag",
                        name: "kwhEndLow",
                        value: p,
                        onChangeAction: e.handleInputChange,
                        error: e.errors.kwhEndLow,
                        errorMessage: e.errorMessage.kwhEndLow
                      })
                    ),
                    v.a.createElement(
                      "div",
                      { className: "row" },
                      v.a.createElement(F.a, {
                        type: "number",
                        label: "Beginstand kWh",
                        name: "kwhStart",
                        value: l,
                        readOnly: !0
                      }),
                      v.a.createElement(F.a, {
                        type: "number",
                        label: "Eindstand kWh",
                        name: "kwhEnd",
                        value: c,
                        readOnly: !0
                      })
                    ),
                    v.a.createElement(
                      "div",
                      { className: "row" },
                      v.a.createElement(F.a, {
                        type: "number",
                        label: "Opbrengst kWh €",
                        name: "payoutKwh",
                        value:
                          w &&
                          w.toLocaleString("nl", {
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 5
                          }),
                        onChangeAction: e.handleInputChange
                      })
                    )
                  )
                : null,
              "revenueEuro" === k.codeRef
                ? v.a.createElement(
                    v.a.Fragment,
                    null,
                    v.a.createElement(
                      "div",
                      { className: "row" },
                      v.a.createElement(
                        "div",
                        { className: "panel-part panel-heading" },
                        v.a.createElement(
                          "span",
                          { className: "h5 text-bold" },
                          "Opbrengst euro"
                        )
                      )
                    ),
                    "loan" === N || "obligation" === N
                      ? v.a.createElement(
                          v.a.Fragment,
                          null,
                          v.a.createElement(
                            "div",
                            { className: "row" },
                            v.a.createElement(F.a, {
                              type: "number",
                              label: "Uitkering %",
                              name: "payPercentage",
                              value: h,
                              onChangeAction: e.handleInputChange,
                              error: e.errors.payPercentage
                            }),
                            v.a.createElement(F.a, {
                              type: "number",
                              label:
                                "loan" === N
                                  ? "of uitkeringsbedrag (per deelnemer)"
                                  : "of uitkeringsbedrag (per participatie)",
                              name: "payAmount",
                              value: f,
                              onChangeAction: e.handleInputChange,
                              error: e.errors.payAmount,
                              errorMessage: e.errorMessage.payAmount
                            })
                          ),
                          v.a.createElement(
                            "div",
                            { className: "row" },
                            v.a.createElement(F.a, {
                              label: v.a.createElement(
                                v.a.Fragment,
                                null,
                                "Bedrag ",
                                v.a.createElement(
                                  K,
                                  null,
                                  "(uitkering % geldig tot en met)"
                                )
                              ),
                              name: "keyAmountFirstPercentage",
                              value: y,
                              onChangeAction: e.handleInputChange,
                              error: e.errors.keyAmountFirstPercentage
                            })
                          ),
                          y
                            ? v.a.createElement(
                                "div",
                                { className: "row" },
                                v.a.createElement(F.a, {
                                  type: "number",
                                  label: v.a.createElement(
                                    v.a.Fragment,
                                    null,
                                    "Uitkering % vanaf bedrag"
                                  ),
                                  name: "payPercentageValidFromKeyAmount",
                                  value: E,
                                  onChangeAction: e.handleInputChange,
                                  error:
                                    e.errors.payPercentageValidFromKeyAmount
                                })
                              )
                            : null
                        )
                      : null,
                    "capital" === N || "postalcode_link_capital" === N
                      ? v.a.createElement(
                          v.a.Fragment,
                          null,
                          v.a.createElement(
                            "div",
                            { className: "row" },
                            v.a.createElement(F.a, {
                              type: "number",
                              label: "Resultaat",
                              name: "revenue",
                              value: g,
                              onChangeAction: e.handleInputChange
                            })
                          )
                        )
                      : null
                  )
                : null,
              "redemptionEuro" === k.codeRef
                ? v.a.createElement(
                    v.a.Fragment,
                    null,
                    v.a.createElement(
                      "div",
                      { className: "row" },
                      v.a.createElement(
                        "div",
                        { className: "panel-part panel-heading" },
                        v.a.createElement(
                          "span",
                          { className: "h5 text-bold" },
                          "Aflossing euro"
                        )
                      )
                    ),
                    "loan" === N || "obligation" === N
                      ? v.a.createElement(
                          v.a.Fragment,
                          null,
                          v.a.createElement(
                            "div",
                            { className: "row" },
                            v.a.createElement(F.a, {
                              type: "number",
                              label: "Aflossing %",
                              name: "payPercentage",
                              value: h,
                              onChangeAction: e.handleInputChange
                            }),
                            v.a.createElement(F.a, {
                              type: "number",
                              label:
                                "loan" === N
                                  ? "of aflossingsbedrag (per deelname)"
                                  : "of aflossingsbedrag (per participatie)",
                              name: "payAmount",
                              value: f,
                              onChangeAction: e.handleInputChange,
                              error: e.errors.payAmount,
                              errorMessage: e.errorMessage.payAmount
                            })
                          )
                        )
                      : null
                  )
                : null,
              v.a.createElement(
                M.a,
                null,
                v.a.createElement(
                  "div",
                  { className: "pull-right btn-group", role: "group" },
                  v.a.createElement(S.a, {
                    buttonText: "Opslaan",
                    onClickAction: e.handleSubmit,
                    type: "submit",
                    value: "Submit",
                    loading: e.isLoading
                  })
                )
              )
            )
          );
        }),
        z = t(92),
        V = t(152);
      function W(e, a) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          a &&
            (n = n.filter(function(a) {
              return Object.getOwnPropertyDescriptor(e, a).enumerable;
            })),
            t.push.apply(t, n);
        }
        return t;
      }
      function Y(e) {
        for (var a = 1; a < arguments.length; a++) {
          var t = null != arguments[a] ? arguments[a] : {};
          a % 2
            ? W(Object(t), !0).forEach(function(a) {
                f()(e, a, t[a]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : W(Object(t)).forEach(function(a) {
                Object.defineProperty(
                  e,
                  a,
                  Object.getOwnPropertyDescriptor(t, a)
                );
              });
        }
        return e;
      }
      function _(e) {
        var a = (function() {
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
          var t,
            n = g()(e);
          if (a) {
            var r = g()(this).constructor;
            t = Reflect.construct(n, arguments, r);
          } else t = n.apply(this, arguments);
          return m()(this, t);
        };
      }
      var J = (function(e) {
        u()(t, e);
        var a = _(t);
        function t(e) {
          var n;
          return (
            r()(this, t),
            (n = a.call(this, e)),
            f()(l()(n), "fetchProject", function(e) {
              V.a.fetchProject(e).then(function(e) {
                var a = n.props.projectRevenueCategories.find(function(e) {
                    return e.id == n.state.revenue.categoryId;
                  }),
                  t = n.state.revenue;
                if ("redemptionEuro" === a.codeRef) {
                  var r = n.props.participantProjectPayoutTypes.find(function(
                    e
                  ) {
                    return "account" === e.codeRef;
                  }).id;
                  (t.payoutTypeId = r),
                    (t.distributionTypeId = "inPossessionOf");
                } else if ("loan" !== e.projectType.codeRef)
                  t.distributionTypeId = "inPossessionOf";
                else if ("obligation" === e.projectType.codeRef) {
                  var o = n.props.participantProjectPayoutTypes.find(function(
                    e
                  ) {
                    return "account" === e.codeRef;
                  }).id;
                  t.payoutTypeId = o;
                }
                "revenueEuro" === a.codeRef &&
                  ((t.dateBegin = e.dateInterestBearing),
                  (t.dateEnd = e.dateInterestBearing
                    ? T()(e.dateInterestBearing)
                        .endOf("year")
                        .format("Y-MM-DD")
                    : "")),
                  "redemptionEuro" === a.codeRef &&
                    ((t.dateBegin = e.dateInterestBearingRedemption),
                    (t.dateEnd = e.dateInterestBearingRedemption
                      ? T()(e.dateInterestBearingRedemption)
                          .endOf("year")
                          .format("Y-MM-DD")
                      : "")),
                  "revenueKwh" === a.codeRef &&
                    ((t.dateBegin = e.dateInterestBearingKwh),
                    (t.dateEnd = e.dateInterestBearingKwh
                      ? T()(e.dateInterestBearingKwh)
                          .endOf("year")
                          .format("Y-MM-DD")
                      : ""),
                    (t.kwhStartHigh = e.kwhStartHighNextRevenue),
                    (t.kwhStartLow = e.kwhStartLowNextRevenue)),
                  n.setState(Y(Y({}, n.state), {}, { project: e, revenue: t }));
              });
            }),
            f()(l()(n), "handleInputChange", function(e) {
              var a = e.target,
                t = "checkbox" === a.type ? a.checked : a.value,
                r = a.name;
              n.setState(
                Y(
                  Y({}, n.state),
                  {},
                  { revenue: Y(Y({}, n.state.revenue), {}, f()({}, r, t)) }
                ),
                function() {
                  return n.linkedValueAdjustment(r);
                }
              ),
                setTimeout(function() {
                  var e =
                      (n.state.revenue.kwhStartLow
                        ? parseFloat(n.state.revenue.kwhStartLow)
                        : 0) +
                      (n.state.revenue.kwhStartHigh
                        ? parseFloat(n.state.revenue.kwhStartHigh)
                        : 0),
                    a =
                      (n.state.revenue.kwhEndLow
                        ? parseFloat(n.state.revenue.kwhEndLow)
                        : 0) +
                      (n.state.revenue.kwhEndHigh
                        ? parseFloat(n.state.revenue.kwhEndHigh)
                        : 0);
                  n.setState(
                    Y(
                      Y({}, n.state),
                      {},
                      {
                        revenue: Y(
                          Y({}, n.state.revenue),
                          {},
                          { kwhStart: e, kwhEnd: a }
                        )
                      }
                    )
                  );
                }, 200);
            }),
            f()(l()(n), "linkedValueAdjustment", function(e) {
              "keyAmountFirstPercentage" === e &&
                ((n.state.revenue.keyAmountFirstPercentage &&
                  0 != n.state.revenue.keyAmountFirstPercentage) ||
                  n.setState(
                    Y(
                      Y({}, n.state),
                      {},
                      {
                        revenue: Y(
                          Y({}, n.state.revenue),
                          {},
                          { payPercentageValidFromKeyAmount: "" }
                        )
                      }
                    )
                  ));
            }),
            f()(l()(n), "handleSubmit", function(e) {
              e.preventDefault();
              var a = n.state.revenue,
                t = n.props.projectRevenueCategories.find(function(e) {
                  return e.id == a.categoryId;
                }),
                r = {},
                o = {},
                s = !1;
              if (
                (b.a.isEmpty(a.categoryId + "") &&
                  ((r.categoryId = !0), (s = !0)),
                a.dateBegin ||
                  ((r.dateBegin = !0), (o.dateBegin = "Verplicht"), (s = !0)),
                a.dateEnd ||
                  ((r.dateEnd = !0), (o.dateEnd = "Verplicht"), (s = !0)),
                !s &&
                  a.dateEnd < a.dateBegin &&
                  ((r.dateEnd = !0),
                  (o.dateEnd =
                    "Eind periode mag niet voor Begin periode liggen."),
                  (s = !0)),
                s ||
                  "revenueKwh" === t.codeRef ||
                  T()(a.dateBegin).year() === T()(a.dateEnd).year() ||
                  ((r.dateBegin = !0),
                  (o.dateBegin =
                    "Jaaroverschrijdende perioden niet toegestaan."),
                  (r.dateEnd = !0),
                  (o.dateEnd = "Jaaroverschrijdende perioden niet toegestaan."),
                  (s = !0)),
                "inPossessionOf" === a.distributionTypeId &&
                  b.a.isEmpty(a.dateReference + "") &&
                  ((r.dateReference = !0), (s = !0)),
                b.a.isEmpty(a.payAmount + "") ||
                  ("inPossessionOf" !== a.distributionTypeId &&
                    ((r.payAmount = !0),
                    (o.payAmount =
                      'Bedrag mag alleen bij type opbrengst verdeling "In bezit op" ingevuld zijn.'),
                    (s = !0)),
                  a.payAmount + "" < 0 &&
                    ((r.payAmount = !0),
                    (o.payAmount = "Bedrag mag niet negatief zijn."),
                    (s = !0))),
                "revenueKwh" === t.codeRef &&
                  (a.kwhEndHigh < a.kwhStartHigh &&
                    ((r.kwhEndHigh = !0),
                    (o.kwhEndHigh =
                      "Eindstand kWh hoog mag niet lager zijn dan Beginstand kWh hoog."),
                    (s = !0)),
                  a.kwhEndLow < a.kwhStartLow &&
                    ((r.kwhEndLow = !0),
                    (o.kwhEndLow =
                      "Eindstand kWh laag mag niet lager zijn dan Beginstand kWh laag."),
                    (s = !0))),
                "revenueEuro" === t.codeRef &&
                  ("capital" === n.state.project.projectType.codeRef ||
                    "postalcode_link_capital" ===
                      n.state.project.projectType.codeRef))
              ) {
                b.a.isEmpty(a.payoutTypeId + "") &&
                  ((r.payoutTypeId = !0), (s = !0));
                var i = n.props.participantProjectPayoutTypes.find(function(e) {
                  return "account" === e.codeRef;
                }).id;
                a.revenue < 0 &&
                  a.payoutTypeId == i &&
                  ((r.payoutTypeId = !0),
                  (o.payoutTypeId =
                    "Als je een negatief resultaat wilt verdelen dan kan dat niet uitgekeerd worden op een rekening. Kies voor bijschrijven."),
                  (s = !0));
              }
              (b.a.isEmpty(a.payPercentage + "") &&
                0 == a.keyAmountFirstPercentage &&
                b.a.isEmpty(a.payPercentageValidFromKeyAmount + "")) ||
                b.a.isEmpty(a.payAmount + "") ||
                ((r.payAmount = !0),
                (r.payPercentage = !0),
                (r.keyAmountFirstPercentage = !0),
                (r.payPercentageValidFromKeyAmount = !0),
                (o.payAmount =
                  "Percentage(s) en Bedrag mogen niet allebei ingevuld zijn."),
                (s = !0)),
                (a.payoutKwh = a.payoutKwh
                  ? parseFloat(a.payoutKwh).toFixed(5)
                  : ""),
                n.setState(
                  Y(Y({}, n.state), {}, { errors: r, errorMessage: o })
                ),
                s ||
                  (n.setState({ isLoading: !0 }),
                  z.a
                    .storeProjectRevenue(a)
                    .then(function(e) {
                      n.setState({ isLoading: !1 }),
                        w.f.replace(
                          "/project/details/".concat(n.props.params.projectId)
                        ),
                        w.f.push("/project/opbrengst/".concat(e.data.data.id));
                    })
                    .catch(function(e) {
                      console.log(e),
                        alert(
                          "Er is iets misgegaan bij opslaan. Probeer nogmaals een nieuwe opbrengstverdeling te maken vanuit het project."
                        ),
                        w.f.goBack();
                    }));
            }),
            (n.state = {
              revenue: {
                projectId: e.params.projectId,
                categoryId: e.params.categoryId,
                distributionTypeId: "",
                confirmed: !1,
                dateBegin: "",
                dateEnd: "",
                dateReference: T()(),
                dateConfirmed: "",
                payoutTypeId: "",
                kwhStart: 0,
                kwhEnd: 0,
                kwhStartHigh: "",
                kwhEndHigh: "",
                kwhStartLow: "",
                kwhEndLow: "",
                revenue: "",
                datePayed: "",
                payPercentage: "",
                payAmount: "",
                keyAmountFirstPercentage: "",
                payPercentageValidFromKeyAmount: "",
                payoutKwh: ""
              },
              errors: {
                categoryId: !1,
                dateBegin: !1,
                dateEnd: !1,
                dateReference: !1,
                payoutTypeId: !1,
                kwhEndHigh: !1,
                kwhEndLow: !1,
                payAmount: !1,
                payPercentage: !1,
                keyAmountFirstPercentage: !1,
                payPercentageValidFromKeyAmount: !1
              },
              errorMessage: {
                payoutTypeId: "",
                dateBegin: "",
                dateEnd: "",
                kwhEndHigh: "",
                kwhEndLow: "",
                payAmount: ""
              },
              project: {},
              isLoading: !1
            }),
            (n.handleInputChangeDate = n.handleInputChangeDate.bind(l()(n))),
            (n.handleInputChangeDateConfirmed = n.handleInputChangeDateConfirmed.bind(
              l()(n)
            )),
            n
          );
        }
        return (
          s()(t, [
            {
              key: "componentDidMount",
              value: function() {
                this.fetchProject(this.props.params.projectId);
              }
            },
            {
              key: "componentDidUpdate",
              value: function(e) {
                this.props.params.projectId !== e.params.projectId &&
                  this.fetchProject(this.props.params.projectId);
              }
            },
            {
              key: "handleInputChangeDate",
              value: function(e, a) {
                this.setState(
                  Y(
                    Y({}, this.state),
                    {},
                    { revenue: Y(Y({}, this.state.revenue), {}, f()({}, a, e)) }
                  )
                );
              }
            },
            {
              key: "handleInputChangeDateConfirmed",
              value: function(e, a) {
                var t, n;
                e
                  ? this.setState(
                      Y(
                        Y({}, this.state),
                        {},
                        {
                          revenue: Y(
                            Y({}, this.state.revenue),
                            {},
                            ((t = {}), f()(t, a, e), f()(t, "confirmed", !0), t)
                          )
                        }
                      )
                    )
                  : this.setState(
                      Y(
                        Y({}, this.state),
                        {},
                        {
                          revenue: Y(
                            Y({}, this.state.revenue),
                            {},
                            ((n = {}), f()(n, a, e), f()(n, "confirmed", !1), n)
                          )
                        }
                      )
                    );
              }
            },
            {
              key: "render",
              value: function() {
                return v.a.createElement(
                  "div",
                  { className: "row" },
                  v.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    v.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      v.a.createElement(j, null)
                    ),
                    v.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      v.a.createElement(
                        k.a,
                        null,
                        v.a.createElement(
                          N.a,
                          null,
                          v.a.createElement(
                            "div",
                            { className: "col-md-12" },
                            v.a.createElement(H, {
                              revenue: this.state.revenue,
                              errors: this.state.errors,
                              errorMessage: this.state.errorMessage,
                              handleInputChange: this.handleInputChange,
                              handleInputChangeDate: this.handleInputChangeDate,
                              handleInputChangeDateConfirmed: this
                                .handleInputChangeDateConfirmed,
                              handleSubmit: this.handleSubmit,
                              project: this.state.project,
                              isLoading: this.state.isLoading
                            })
                          )
                        )
                      )
                    )
                  ),
                  v.a.createElement("div", { className: "col-md-3" })
                );
              }
            }
          ]),
          t
        );
      })(y.Component);
      a.default = Object(R.b)(function(e) {
        return {
          projectRevenueCategories: e.systemData.projectRevenueCategories,
          participantProjectPayoutTypes:
            e.systemData.participantProjectPayoutTypes
        };
      })(J);
    },
    690: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        o = t(8),
        s = t.n(o),
        i = function(e) {
          var a = e.children,
            t = e.className,
            n = e.onMouseEnter,
            o = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(t),
              onMouseEnter: n,
              onMouseLeave: o
            },
            a
          );
        };
      (i.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (i.propTypes = {
          className: s.a.string,
          onMouseEnter: s.a.func,
          onMouseLeave: s.a.func
        }),
        (a.a = i);
    },
    691: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        o = t(8),
        s = t.n(o),
        i = function(e) {
          var a = e.className,
            t = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-body ".concat(a) },
            t
          );
        };
      (i.defaultProps = { className: "" }),
        (i.propTypes = { className: s.a.string }),
        (a.a = i);
    },
    692: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        o = t(8),
        s = t.n(o),
        i = function(e) {
          var a = e.buttonClassName,
            t = e.buttonText,
            n = e.onClickAction,
            o = e.type,
            s = e.value,
            i = e.loading,
            l = e.loadText,
            c = e.disabled;
          return i
            ? r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm btn-loading ".concat(a),
                  value: s,
                  disabled: i
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
                  type: o,
                  className: "btn btn-sm ".concat(a),
                  onClick: n,
                  value: s,
                  disabled: c
                },
                t
              );
        };
      (i.defaultProps = {
        buttonClassName: "btn-success",
        type: "button",
        value: "",
        loading: !1,
        loadText: "Aan het laden",
        disabled: !1
      }),
        (i.propTypes = {
          buttonClassName: s.a.string,
          buttonText: s.a.string.isRequired,
          onClickAction: s.a.func,
          type: s.a.string,
          value: s.a.string,
          loading: s.a.bool,
          loadText: s.a.string,
          disabled: s.a.bool
        }),
        (a.a = i);
    },
    693: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        o = t(8),
        s = t.n(o),
        i = function(e) {
          var a = e.buttonClassName,
            t = e.iconName,
            n = e.onClickAction,
            o = e.title,
            s = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(a),
              onClick: n,
              disabled: s,
              title: o
            },
            r.a.createElement("span", { className: "glyphicon ".concat(t) })
          );
        };
      (i.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (i.propTypes = {
          buttonClassName: s.a.string,
          iconName: s.a.string.isRequired,
          onClickAction: s.a.func,
          title: s.a.string,
          disabled: s.a.bool
        }),
        (a.a = i);
    },
    694: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        o = t(8),
        s = t.n(o),
        i = function(e) {
          var a = e.label,
            t = e.type,
            n = e.className,
            o = e.size,
            s = e.id,
            i = e.placeholder,
            l = e.name,
            c = e.value,
            u = e.onClickAction,
            d = e.onChangeAction,
            m = e.onBlurAction,
            p = e.required,
            g = e.readOnly,
            h = e.maxLength,
            f = e.error,
            y = e.min,
            v = e.max,
            E = e.step,
            b = e.errorMessage,
            w = e.divSize,
            k = e.divClassName,
            N = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(w, " ").concat(k) },
            r.a.createElement(
              "label",
              { htmlFor: s, className: "col-sm-6 ".concat(p) },
              a
            ),
            r.a.createElement(
              "div",
              { className: "".concat(o) },
              r.a.createElement("input", {
                type: t,
                className:
                  "form-control input-sm ".concat(n) + (f ? "has-error" : ""),
                id: s,
                placeholder: i,
                name: l,
                value: c,
                onClick: u,
                onChange: d,
                onBlur: m,
                readOnly: g,
                maxLength: h,
                min: y,
                max: v,
                autoComplete: N,
                step: E
              })
            ),
            f &&
              r.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                r.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  b
                )
              )
          );
        };
      (i.defaultProps = {
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
        (i.propTypes = {
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
        (a.a = i);
    },
    695: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        o = t(4),
        s = t(8),
        i = t.n(s),
        l = function(e) {
          var a = e.label,
            t = e.className,
            n = e.id,
            s = e.value,
            i = e.link,
            l = e.hidden;
          return i.length > 0
            ? r.a.createElement(
                "div",
                { className: t, style: l ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  a
                ),
                r.a.createElement(
                  "div",
                  { className: "col-sm-6", id: n, onClick: null },
                  r.a.createElement(
                    o.b,
                    { to: i, className: "link-underline" },
                    s
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: t, style: l ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  a
                ),
                r.a.createElement("div", { className: "col-sm-6", id: n }, s)
              );
        };
      (l.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (l.propTypes = {
          label: i.a.oneOfType([i.a.string, i.a.object]).isRequired,
          className: i.a.string,
          id: i.a.string,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          link: i.a.string,
          hidden: i.a.bool
        }),
        (a.a = l);
    },
    696: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        o = t(8),
        s = t.n(o),
        i = function(e) {
          var a = e.label,
            t = e.className,
            n = e.size,
            o = e.id,
            s = e.name,
            i = e.value,
            l = e.options,
            c = e.onChangeAction,
            u = e.onBlurAction,
            d = e.required,
            m = e.error,
            p = e.errorMessage,
            g = e.optionValue,
            h = e.optionName,
            f = e.readOnly,
            y = e.placeholder,
            v = e.divClassName,
            E = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(v) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(d) },
              a
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-6" },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(t) + (m && " has-error"),
                  id: o,
                  name: s,
                  value: i,
                  onChange: c,
                  onBlur: u,
                  readOnly: f
                },
                E && r.a.createElement("option", { value: "" }, y),
                l.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[g], value: e[g] },
                    e[h]
                  );
                })
              )
            ),
            m &&
              r.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                r.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  p
                )
              )
          );
        };
      (i.defaultProps = {
        divClassName: "",
        className: "",
        size: "col-sm-6",
        readOnly: !1,
        required: "",
        error: !1,
        errorMessage: "",
        value: "",
        optionValue: "id",
        optionName: "name",
        placeholder: "",
        emptyOption: !0
      }),
        (i.propTypes = {
          label: s.a.string.isRequired,
          className: s.a.string,
          size: s.a.string,
          id: s.a.string,
          name: s.a.string.isRequired,
          options: s.a.array,
          value: s.a.oneOfType([s.a.string, s.a.number]),
          onChangeAction: s.a.func,
          onBlurAction: s.a.func,
          required: s.a.string,
          readOnly: s.a.bool,
          error: s.a.bool,
          errorMessage: s.a.string,
          emptyOption: s.a.bool,
          optionValue: s.a.string,
          optionName: s.a.string,
          placeholder: s.a.string
        }),
        (a.a = i);
    },
    699: function(e, a, t) {
      "use strict";
      var n = t(24),
        r = t.n(n),
        o = t(25),
        s = t.n(o),
        i = t(22),
        l = t.n(i),
        c = t(26),
        u = t.n(c),
        d = t(27),
        m = t.n(d),
        p = t(16),
        g = t.n(p),
        h = t(6),
        f = t.n(h),
        y = t(0),
        v = t.n(y),
        E = t(8),
        b = t.n(E),
        w = t(707),
        k = t.n(w),
        N = t(708),
        C = t.n(N),
        A = t(7),
        j = t.n(A);
      function I(e) {
        var a = (function() {
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
          var t,
            n = g()(e);
          if (a) {
            var r = g()(this).constructor;
            t = Reflect.construct(n, arguments, r);
          } else t = n.apply(this, arguments);
          return m()(this, t);
        };
      }
      j.a.locale("nl");
      var P = (function(e) {
        u()(t, e);
        var a = I(t);
        function t(e) {
          var n;
          return (
            r()(this, t),
            (n = a.call(this, e)),
            f()(l()(n), "validateDate", function(e) {
              var a = j()(e.target.value, "DD-MM-YYYY", !0),
                t = !1;
              a.isValid() || "" === e.target.value || (t = !0),
                n.props.disabledBefore &&
                  a.isBefore(n.props.disabledBefore) &&
                  (t = !0),
                n.props.disabledAfter &&
                  a.isAfter(n.props.disabledAfter) &&
                  (t = !0),
                n.setState({ errorDateFormat: t });
            }),
            f()(l()(n), "onDateChange", function(e) {
              var a = e ? j()(e).format("Y-MM-DD") : "",
                t = !1;
              a &&
                n.props.disabledBefore &&
                j()(a).isBefore(n.props.disabledBefore) &&
                (t = !0),
                a &&
                  n.props.disabledAfter &&
                  j()(a).isAfter(n.props.disabledAfter) &&
                  (t = !0),
                n.setState({ errorDateFormat: t }),
                !t && n.props.onChangeAction(a, n.props.name);
            }),
            (n.state = { errorDateFormat: !1 }),
            n
          );
        }
        return (
          s()(t, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  a = e.label,
                  t = e.className,
                  n = e.size,
                  r = e.divSize,
                  o = e.id,
                  s = e.value,
                  i = e.required,
                  l = e.readOnly,
                  c = e.name,
                  u = e.error,
                  d = e.errorMessage,
                  m = e.disabledBefore,
                  p = e.disabledAfter,
                  g = s ? j()(s).format("L") : "",
                  h = {};
                return (
                  m && (h.before = new Date(m)),
                  p && (h.after = new Date(p)),
                  v.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    v.a.createElement(
                      "div",
                      null,
                      v.a.createElement(
                        "label",
                        { htmlFor: o, className: "col-sm-6 ".concat(i) },
                        a
                      )
                    ),
                    v.a.createElement(
                      "div",
                      { className: "".concat(n) },
                      v.a.createElement(k.a, {
                        id: o,
                        value: g,
                        formatDate: N.formatDate,
                        parseDate: N.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: C.a,
                          disabledDays: h
                        },
                        inputProps: {
                          className:
                            "form-control input-sm ".concat(t) +
                            (this.state.errorDateFormat || u
                              ? " has-error"
                              : ""),
                          name: c,
                          onBlur: this.validateDate,
                          autoComplete: "off",
                          readOnly: l,
                          disabled: l
                        },
                        required: i,
                        readOnly: l,
                        placeholder: ""
                      })
                    ),
                    u &&
                      v.a.createElement(
                        "div",
                        { className: "col-sm-offset-6 col-sm-6" },
                        v.a.createElement(
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
          t
        );
      })(y.Component);
      (P.defaultProps = {
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
        (P.propTypes = {
          label: b.a.string.isRequired,
          type: b.a.string,
          className: b.a.string,
          size: b.a.string,
          divSize: b.a.string,
          id: b.a.string,
          name: b.a.string,
          value: b.a.oneOfType([b.a.string, b.a.object]),
          onChangeAction: b.a.func,
          required: b.a.string,
          readOnly: b.a.bool,
          error: b.a.bool,
          errorMessage: b.a.string,
          disabledBefore: b.a.string,
          disabledAfter: b.a.string
        }),
        (a.a = P);
    },
    702: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        o = t(8),
        s = t.n(o),
        i = function(e) {
          var a = e.className,
            t = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-footer ".concat(a) },
            t
          );
        };
      (i.defaultProps = { className: "" }),
        (i.propTypes = { className: s.a.string }),
        (a.a = i);
    }
  }
]);
