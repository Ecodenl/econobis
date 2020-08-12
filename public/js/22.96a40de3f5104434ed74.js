(window.webpackJsonp = window.webpackJsonp || []).push([
  [22],
  {
    1401: function(e, t, a) {
      "use strict";
      var n = a(7);
      (n.fn.isHoliday = function() {
        var e = this.localeData();
        return (
          !!(
            e._holidays &&
            e._holidays.indexOf(this.format(e._holidayFormat)) >= 0
          ) ||
          (!!e.holiday && !!e.holiday(this))
        );
      }),
        (n.fn.isBusinessDay = function() {
          var e = this.localeData()._workingWeekdays || [1, 2, 3, 4, 5];
          return !this.isHoliday() && e.indexOf(this.day()) >= 0;
        }),
        (n.fn.businessDaysIntoMonth = function() {
          if (!this.isValid()) return NaN;
          var e,
            t = this.isBusinessDay() ? this : this.prevBusinessDay();
          return (
            t.monthBusinessDays().map(function(a, n) {
              a.format("M/DD/YY") === t.format("M/DD/YY") && (e = n + 1);
            }),
            e
          );
        }),
        (n.fn.businessDiff = function(e, t) {
          var a = this.clone(),
            n = e.clone(),
            r = a >= n,
            o = a < n ? a : n,
            i = n > a ? n : a,
            s = 0;
          if (o.format("DD/MM/YYYY") === i.format("DD/MM/YYYY")) return s;
          for (; o < i; ) o.isBusinessDay() && s++, o.add(1, "d");
          return t ? (r ? s : -s) : s;
        }),
        (n.fn.businessAdd = function(e, t) {
          var a = this.clone();
          if (!a.isValid()) return a;
          var n =
            (e = e < 0 ? -1 * Math.round(-1 * e) : Math.round(e)) < 0 ? -1 : 1;
          t = void 0 !== t ? t : "days";
          for (var r = Math.abs(e); r > 0; )
            a.add(n, t), a.isBusinessDay() && r--;
          return a;
        }),
        (n.fn.businessSubtract = function(e, t) {
          return this.businessAdd(-e, t);
        }),
        (n.fn.nextBusinessDay = function() {
          for (
            var e = 1, t = this.localeData()._nextBusinessDayLimit || 7;
            e < t && !this.add(1, "d").isBusinessDay();

          )
            e++;
          return this;
        }),
        (n.fn.prevBusinessDay = function() {
          for (
            var e = 1, t = this.localeData()._prevBusinessDayLimit || 7;
            e < t && !this.subtract(1, "d").isBusinessDay();

          )
            e++;
          return this;
        }),
        (n.fn.monthBusinessDays = function(e) {
          if (!this.isValid()) return [];
          for (
            var t = this.clone(),
              a = t.clone().startOf("month"),
              n = e || t.clone().endOf("month"),
              r = [],
              o = !1;
            !o;

          )
            a.isBusinessDay() && r.push(a.clone()),
              n.diff(a.add(1, "d")) < 0 && (o = !0);
          return r;
        }),
        (n.fn.monthNaturalDays = function(e) {
          if (!this.isValid()) return [];
          for (
            var t = this.clone(),
              a = e ? t.clone() : t.clone().startOf("month"),
              n = t.clone().endOf("month"),
              r = [],
              o = !1;
            !o;

          )
            r.push(a.clone()), n.diff(a.add(1, "d")) < 0 && (o = !0);
          return r;
        }),
        (n.fn.monthBusinessWeeks = function(e) {
          e = e || !1;
          var t = this.clone(),
            a = e ? t.clone() : t.clone().startOf("month");
          return r(this, e, null, a);
        }),
        (n.fn.businessWeeksBetween = function(e) {
          var t = this.clone().clone();
          return r(this, !1, e, t);
        });
      var r = function(e, t, a, r) {
        if (!e.isValid()) return [];
        for (
          var o = e.clone(),
            i = r,
            s = a ? n(a).clone() : o.clone().endOf("month"),
            l = [],
            c = [],
            u = !1;
          !u;

        )
          i.day() >= 1 && i.day() < 6 && c.push(i.clone()),
            5 === i.day() && (l.push(c), (c = [])),
            s.diff(i.add(1, "d")) < 0 && (c.length < 5 && l.push(c), (u = !0));
        return l;
      };
      (n.fn.monthNaturalWeeks = function(e) {
        if (!this.isValid()) return [];
        for (
          var t = this.clone(),
            a = e ? t.clone() : t.clone().startOf("month"),
            n = t.clone().endOf("month"),
            r = [],
            o = [],
            i = !1;
          !i;

        )
          o.push(a.clone()),
            6 === a.day() && (r.push(o), (o = [])),
            n.diff(a.add(1, "d")) < 0 && (o.length < 7 && r.push(o), (i = !0));
        return r;
      }),
        e.exports && (e.exports = n);
    },
    1437: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        o = a(25),
        i = a.n(o),
        s = a(26),
        l = a.n(s),
        c = a(27),
        u = a.n(c),
        d = a(16),
        m = a.n(d),
        p = a(0),
        h = a.n(p),
        g = a(32),
        f = a(22),
        v = a.n(f),
        b = a(6),
        E = a.n(b),
        y = a(4),
        k = a(690),
        w = a(691),
        C = a(693),
        N = a(100),
        R = a(92),
        j = function(e) {
          return h.a.createElement(
            N.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                R.a.deleteProjectRevenue(e.id).then(function() {
                  y.f.push("/project/details/".concat(e.projectId));
                });
              },
              title: "Verwijderen"
            },
            h.a.createElement(
              "p",
              null,
              "Weet u zeker dat u deze opbrengst wilt verwijderen?"
            )
          );
        },
        D = a(727),
        P = a(14),
        T = a(7),
        A = a.n(T),
        S = a(711),
        I = a.n(S);
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
          var a,
            n = m()(e);
          if (t) {
            var r = m()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var x = (function(e) {
          l()(a, e);
          var t = O(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(v()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              E()(v()(n), "getCSV", function() {
                n.props.blockUI(),
                  setTimeout(function() {
                    R.a
                      .getCSV(n.props.revenue.id)
                      .then(function(e) {
                        I()(
                          e.data,
                          "Opbrengstverdeling-" +
                            A()().format("YYYY-MM-DD HH:mm:ss") +
                            ".csv"
                        ),
                          n.props.unblockUI();
                      })
                      .catch(function(e) {
                        n.props.unblockUI();
                      });
                  }, 100);
              }),
              (n.state = { showDelete: !1 }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.props.revenue,
                    t = "project/opbrengst/".concat(
                      this.props.revenue.id,
                      "/energieleverancier-rapport"
                    ),
                    a = "project/opbrengst/".concat(
                      this.props.revenue.id,
                      "/energieleverancier-excel"
                    ),
                    n = e.category ? e.category.codeRef : "";
                  return h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(
                      "div",
                      { className: "col-sm-12" },
                      h.a.createElement(
                        k.a,
                        null,
                        h.a.createElement(
                          w.a,
                          { className: "panel-small" },
                          h.a.createElement(
                            "div",
                            { className: "col-md-2" },
                            h.a.createElement(
                              "div",
                              {
                                className:
                                  "btn-group btn-group-flex margin-small",
                                role: "group"
                              },
                              h.a.createElement(C.a, {
                                iconName: "glyphicon-arrow-left",
                                onClickAction: y.e.goBack
                              }),
                              this.props.permissions.manageFinancial &&
                                !this.props.revenue.confirmed &&
                                h.a.createElement(C.a, {
                                  iconName: "glyphicon-trash",
                                  onClickAction: this.toggleDelete
                                }),
                              1 == e.confirmed &&
                                "revenueKwh" === n &&
                                h.a.createElement(
                                  "div",
                                  {
                                    className: "nav navbar-nav btn-group",
                                    role: "group"
                                  },
                                  h.a.createElement(
                                    "button",
                                    {
                                      className: "btn btn-success btn-sm",
                                      "data-toggle": "dropdown"
                                    },
                                    "Rapportage Energie leverancier"
                                  ),
                                  h.a.createElement(
                                    "ul",
                                    { className: "dropdown-menu" },
                                    h.a.createElement(
                                      "li",
                                      null,
                                      h.a.createElement(
                                        y.b,
                                        { to: t },
                                        "Ledenverklaring of productie specificatie"
                                      )
                                    ),
                                    h.a.createElement(
                                      "li",
                                      null,
                                      h.a.createElement(
                                        y.b,
                                        { to: a },
                                        "Opbrengstverdelingen deelnemers"
                                      )
                                    )
                                  )
                                ),
                              h.a.createElement(C.a, {
                                iconName: "glyphicon-download-alt",
                                onClickAction: this.getCSV
                              })
                            )
                          ),
                          h.a.createElement(
                            "div",
                            { className: "col-md-8" },
                            h.a.createElement(
                              "h4",
                              {
                                className:
                                  "text-center text-success margin-small"
                              },
                              h.a.createElement(
                                "strong",
                                null,
                                "Opbrengst project ",
                                e.project ? e.project.name : ""
                              )
                            )
                          ),
                          h.a.createElement("div", { className: "col-md-2" })
                        )
                      )
                    ),
                    this.state.showDelete &&
                      h.a.createElement(j, {
                        closeDeleteItemModal: this.toggleDelete,
                        id: e.id,
                        projectId: e.project.id
                      })
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        M = Object(g.b)(
          function(e) {
            return {
              revenue: e.projectRevenue,
              permissions: e.meDetails.permissions
            };
          },
          function(e) {
            return Object(P.b)({ blockUI: D.a, unblockUI: D.b }, e);
          }
        )(x),
        L = a(726),
        B = a(11),
        F = a.n(B),
        _ = a(713),
        V = a(697),
        z = a.n(V);
      A.a.locale("nl");
      var U = function(e) {
          var t = e.participation,
            a = t.id,
            n = t.contactName,
            r = t.contactType,
            o = t.contactPrimaryEmailAddress,
            i = t.address,
            s = t.postalCode,
            l = t.city,
            c = t.contactIban,
            u = t.payoutIban,
            d = t.deliveredTotal,
            m = t.kwhReturn,
            p = t.participationsAmount,
            g = t.payout,
            f = t.payoutType,
            v = t.datePayout,
            b = t.energySupplierName,
            E = t.status,
            y = !(
              "createInvoices" === e.createType ||
              (o && o.email && !z.a.isEmpty(o.email))
            ),
            k = !(i && !z.a.isEmpty(i)),
            w = !(s && !z.a.isEmpty(s)),
            C = !(l && !z.a.isEmpty(l)),
            N = !(
              "revenueKwh" === e.projectRevenueCategoryCodeRef ||
              "Rekening" !== f ||
              (c && !z.a.isEmpty(c)) ||
              (u && !z.a.isEmpty(u))
            ),
            R =
              y || k || w || C
                ? "Er ontbreken contactgegevens (email, adres, postcode of plaats)."
                : "",
            j = N ? "Iban code ontbreekt." : "",
            D = y || k || w || C || N ? "missing-data-row" : null,
            P = "";
          switch (E) {
            case "concept":
              P = "Concept";
              break;
            case "confirmed":
              P = "Definitief";
              break;
            case "in-progress":
              P = "Bezig...";
              break;
            case "processed":
              P = "Verwerkt";
          }
          return h.a.createElement(
            "div",
            {
              title: R + " " + j,
              className: "row border "
                .concat("processed" === E ? "warning-row" : "", " ")
                .concat(D || "")
            },
            e.showCheckboxList
              ? h.a.createElement(
                  "div",
                  { className: "col-sm-1" },
                  h.a.createElement("input", {
                    type: "checkbox",
                    name: a,
                    onChange: e.toggleDistributionCheck,
                    checked: e.distributionIds.includes(a)
                  })
                )
              : null,
            h.a.createElement(
              "div",
              { className: "col-sm-1" },
              r ? r.name : ""
            ),
            h.a.createElement("div", { className: "col-sm-2" }, n),
            "loan" === e.projectTypeCodeRef
              ? h.a.createElement(
                  "div",
                  { className: "col-sm-2" },
                  Object(_.a)(p)
                )
              : h.a.createElement("div", { className: "col-sm-1" }, p),
            "revenueKwh" === e.projectRevenueCategoryCodeRef
              ? h.a.createElement(
                  h.a.Fragment,
                  null,
                  h.a.createElement("div", { className: "col-sm-2" }, b && b),
                  h.a.createElement("div", { className: "col-sm-1" }, d && d),
                  h.a.createElement(
                    "div",
                    { className: "col-sm-2" },
                    m
                      ? "€" +
                          m.toLocaleString("nl", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })
                      : ""
                  )
                )
              : h.a.createElement(
                  h.a.Fragment,
                  null,
                  h.a.createElement(
                    "div",
                    { className: "col-sm-2" },
                    g ? Object(_.a)(g) : 0
                  ),
                  h.a.createElement("div", { className: "col-sm-1" }, f && f),
                  h.a.createElement(
                    "div",
                    { className: "col-sm-2" },
                    v ? A()(v).format("L") : ""
                  )
                ),
            h.a.createElement("div", { className: "col-sm-2" }, P)
          );
        },
        Y = a(712),
        q = Object(g.b)(function(e) {
          return {
            projectTypeCodeRef: e.projectRevenue.project.projectType.codeRef,
            projectRevenue: e.projectRevenue
          };
        })(function(e) {
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "row border header" },
              e.projectRevenue.confirmed && e.showCheckboxList
                ? h.a.createElement(
                    "div",
                    { className: "col-sm-1" },
                    h.a.createElement("input", {
                      type: "checkbox",
                      onChange: e.toggleCheckedAll,
                      checked: e.checkedAll
                    })
                  )
                : null,
              h.a.createElement("div", { className: "col-sm-1" }, "Type"),
              h.a.createElement("div", { className: "col-sm-2" }, "Naam"),
              "loan" == e.projectTypeCodeRef
                ? h.a.createElement(
                    "div",
                    { className: "col-sm-2" },
                    "Huidige lening"
                  )
                : h.a.createElement(
                    "div",
                    { className: "col-sm-1" },
                    "Deelnames"
                  ),
              "revenueKwh" === e.projectRevenue.category.codeRef
                ? h.a.createElement(
                    h.a.Fragment,
                    null,
                    h.a.createElement(
                      "div",
                      { className: "col-sm-2" },
                      "Energieleverancier"
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-sm-1" },
                      "Geleverd totaal"
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-sm-2" },
                      "Teruggave energiebelasting"
                    )
                  )
                : "",
              "revenueEuro" === e.projectRevenue.category.codeRef
                ? h.a.createElement(
                    h.a.Fragment,
                    null,
                    h.a.createElement(
                      "div",
                      { className: "col-sm-2" },
                      "Uit te keren bedrag"
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-sm-1" },
                      "Uitkeren op"
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-sm-2" },
                      "Datum uitkering"
                    )
                  )
                : "",
              "redemptionEuro" === e.projectRevenue.category.codeRef
                ? h.a.createElement(
                    h.a.Fragment,
                    null,
                    h.a.createElement(
                      "div",
                      { className: "col-sm-2" },
                      "Af te lossen bedrag"
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-sm-1" },
                      "Aflossen op"
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-sm-2" },
                      "Datum aflossing"
                    )
                  )
                : "",
              h.a.createElement("div", { className: "col-sm-2" }, "Status")
            ),
            e.projectRevenue.distribution &&
              e.projectRevenue.distribution.data.length > 0
              ? e.projectRevenue.distribution.data.map(function(t) {
                  return h.a.createElement(U, {
                    key: t.id,
                    participation: t,
                    showCheckboxList: e.showCheckboxList,
                    toggleDistributionCheck: e.toggleDistributionCheck,
                    projectRevenueCategoryCodeRef:
                      e.projectRevenue.category.codeRef,
                    projectTypeCodeRef: e.projectTypeCodeRef,
                    distributionIds: e.distributionIds,
                    createType: e.createType
                  });
                })
              : h.a.createElement("div", null, "Geen deelnemers bekend."),
            h.a.createElement(Y.a, {
              initialPage: 0,
              onPageChangeAction: e.changePage,
              recordsPerPage: 100,
              totalRecords:
                e.projectRevenue.distribution &&
                e.projectRevenue.distribution.meta &&
                e.projectRevenue.distribution.meta.total
            })
          );
        }),
        W = a(698),
        K = a(692),
        H = a(696),
        J = a(105),
        G = a(695),
        Z = a(104),
        Q = a(694),
        X = a(202),
        $ = a(1401),
        ee = a.n($),
        te = a(699);
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
          return u()(this, a);
        };
      }
      var ne = (function(e) {
          l()(a, e);
          var t = ae(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(v()(n), "reloadDistributions", function() {
                n.props.getDistribution(n.props.projectRevenue.id, 0);
              }),
              E()(v()(n), "changePage", function(e) {
                var t = e.selected;
                n.props.getDistribution(n.props.projectRevenue.id, t);
              }),
              E()(v()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(E()({}, r, a));
              }),
              E()(v()(n), "handleInputChangeDate", function(e, t) {
                n.setState(E()({}, t, e));
              }),
              E()(v()(n), "handleSubjectChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value;
                n.setState({ subject: a });
              }),
              E()(v()(n), "handleEmailTemplateChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value;
                t.name;
                n.setState({ emailTemplateId: a }),
                  Z.a.fetchEmailTemplateWithUser(a).then(function(e) {
                    n.setState({
                      subject: e.subject ? e.subject : n.state.subject
                    });
                  });
              }),
              E()(v()(n), "toggleShowCheckboxList", function(e) {
                n.state.showCheckboxList
                  ? n.setState({
                      showCheckboxList: !1,
                      distributionIds: [],
                      createType: ""
                    })
                  : n.setState({
                      showCheckboxList: !0,
                      createType: e,
                      distributionIds:
                        n.props.projectRevenue.distribution.meta
                          .distributionIdsTotal,
                      checkedAll: !0
                    });
              }),
              E()(v()(n), "toggleModal", function() {
                n.setState({ showModal: !n.state.showModal });
              }),
              E()(v()(n), "toggleCheckedAll", function(e) {
                var t = e.target.checked,
                  a = [];
                t &&
                  (a =
                    n.props.projectRevenue.distribution.meta
                      .distributionIdsTotal),
                  n.setState({ distributionIds: a, checkedAll: t });
              }),
              E()(v()(n), "closeSuccesMessage", function() {
                n.toggleShowCheckboxList(),
                  n.setState({ showSuccessMessage: "", createType: "" }),
                  n.reloadDistributions();
              }),
              E()(v()(n), "toggleDistributionCheck", function(e) {
                var t = e.target.checked,
                  a = Number(e.target.name);
                t
                  ? n.setState(
                      {
                        distributionIds: [].concat(
                          F()(n.state.distributionIds),
                          [a]
                        )
                      },
                      n.checkAllDistributionsAreChecked
                    )
                  : n.setState({
                      distributionIds: n.state.distributionIds.filter(function(
                        e
                      ) {
                        return e !== a;
                      }),
                      checkedAll: !1
                    });
              }),
              E()(v()(n), "checkDistributionRevenueReport", function() {
                var e = !1;
                z.a.isEmpty(n.state.templateId)
                  ? ((e = !0), n.setState({ templateIdError: !0 }))
                  : n.setState({ templateIdError: !1 }),
                  z.a.isEmpty(n.state.emailTemplateId)
                    ? ((e = !0), n.setState({ emailTemplateIdError: !0 }))
                    : n.setState({ emailTemplateIdError: !1 }),
                  z.a.isEmpty(n.state.datePayout + "")
                    ? ((e = !0), n.setState({ datePayoutError: !0 }))
                    : n.setState({ datePayoutError: !1 }),
                  n.state.distributionIds.length > 0 && !e
                    ? (n.props.previewReport({
                        templateId: n.state.templateId,
                        emailTemplateId: n.state.emailTemplateId,
                        subject: n.state.subject,
                        distributionIds: n.state.distributionIds
                      }),
                      y.f.push(
                        "/project/opbrengst/".concat(
                          n.props.projectRevenue.id,
                          "/rapportage"
                        )
                      ))
                    : e ||
                      n.setState({
                        showModal: !0,
                        modalText: "Er zijn geen deelnemers geselecteerd.",
                        buttonConfirmText: "Voeg deelnemers toe"
                      });
              }),
              E()(v()(n), "checkDistributionRevenueInvoices", function() {
                if (n.state.distributionIds.length) {
                  if (
                    !n.props.projectRevenue.project.administration
                      .canCreatePaymentInvoices.can
                  )
                    return (
                      n.props.setError(
                        412,
                        n.props.projectRevenue.project.administration
                          .canCreatePaymentInvoices.message
                      ),
                      void n.setState({ showModal: !1 })
                    );
                  n.setState({
                    showModal: !0,
                    modalText:
                      "De uitkeringsdatum wordt de datum die bij de mutatie komt te staan in de deelname overzichten van de deelnemers.\nIn een eventueel te maken Sepa betaalbestand wordt dit de datum waarop het bedrag van jouw rekening wordt afgeschreven, als je het Sepa betaalbestand hebt aangeboden bij je bank. Als je dus een uitkeringsdatum gebruikt, die voor of op de huidige datum ligt, dan kan je het Sepa bestand dus niet gebruiken.\n\nWeet je zeker dat je de goede uitkeringsdatum hebt gekozen ?",
                    modalText2:
                      ee()(n.state.datePayout).format("YYYY-MM-DD") <
                      ee()()
                        .nextBusinessDay()
                        .format("YYYY-MM-DD")
                        ? "Gekozen uitkeringsdatum (" +
                          ee()(n.state.datePayout).format("L") +
                          ") ligt voor volgende werkdag!"
                        : "",
                    modalAction: n.createPaymentInvoices,
                    buttonConfirmText: "Ga verder"
                  });
                } else n.setState({ showModal: !0, modalText: "Er zijn geen deelnemers geselecteerd.", buttonConfirmText: "Voeg deelnemers toe" });
              }),
              E()(v()(n), "createPaymentInvoices", function() {
                n.toggleModal();
                var e = "**onbekend**";
                n.props.projectRevenue &&
                  n.props.projectRevenue.project &&
                  n.props.projectRevenue.project.administration &&
                  (e = n.props.projectRevenue.project.administration.name);
                var t = "";
                (t =
                  "revenueKwh" === n.props.projectRevenue.category.codeRef
                    ? 'De mutaties van opbrengsten bij de deelnemers zijn aangemaakt. De status van de uitkeringen zijn veranderd van "Definitief" in Verwerkt.\n                Mutaties die niet verwerkt konden worden, omdat er gegevens ontbreken bij het contact, zijn niet aangemaakt bij de deelnemers. Zij behouden de status "Definitief". Maak de gegevens compleet en maak vervolgens opnieuw een opbrengst verdeling van de uitkeringen met de status "Definitief".'
                    : "redemptionEuro" ===
                      n.props.projectRevenue.category.codeRef
                    ? 'De mutaties van aflossing bij de deelnemers zijn aangemaakt. De status van de aflossingen zijn veranderd van "Definitief" in Verwerkt.\n                Mutaties die niet verwerkt konden worden, omdat er gegevens ontbreken bij het contact, zijn niet aangemaakt bij de deelnemers. Zij behouden de status "Definitief". Maak de gegevens compleet en maak vervolgens opnieuw een aflossing verdeling van de aflossingen met de status "Definitief".'
                    : 'De mutaties van opbrengsten bij de deelnemers zijn aangemaakt. De status van de uitkeringen zijn veranderd van "Definitief" in Verwerkt.\n                Indien er sprake is van uitkeren op rekening, dan is er van de betreffende uitkeringen een Sepa betaalbestand aangemaakt. Deze kan je vinden bij de administratie "' +
                      e +
                      '". Mutaties die niet verwerkt konden worden, omdat er gegevens ontbreken bij het contact, zijn niet aangemaakt bij de deelnemers. Zij behouden de status "Definitief". Maak de gegevens compleet en maak vervolgens opnieuw een opbrengst verdeling van de uitkeringen met de status "Definitief."'),
                  (document.body.style.cursor = "wait"),
                  R.a
                    .createPaymentInvoices(
                      n.state.datePayout,
                      n.state.distributionIds
                    )
                    .then(function(e) {
                      (document.body.style.cursor = "default"),
                        n.setState({
                          showSuccessMessage: !0,
                          successMessage: t
                        });
                    });
              }),
              (n.state = {
                distributionIds: [],
                templateId: "",
                templateIdError: !1,
                templates: [],
                emailTemplateId: "",
                emailTemplateIdError: !1,
                emailTemplates: [],
                datePayout: ee()()
                  .nextBusinessDay()
                  .format("YYYY-MM-DD"),
                datePayoutError: !1,
                subject: [],
                documentGroup: "",
                checkedAll: !1,
                showCheckboxList: !1,
                showModal: !1,
                showSuccessMessage: !1,
                modalText: "",
                modalText2: "",
                modalAction: n.toggleModal,
                buttonConfirmText: "",
                readyForCreation: !1,
                createType: ""
              }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this;
                  J.a.fetchDocumentTemplatesPeekGeneral().then(function(t) {
                    var a = [];
                    t.forEach(function(e) {
                      "revenue" == e.group &&
                        a.push({ id: e.id, name: e.name });
                    }),
                      e.setState({ templates: a });
                  }),
                    Z.a.fetchEmailTemplatesPeek().then(function(t) {
                      e.setState({ emailTemplates: t });
                    }),
                    this.props.getDistribution(this.props.projectRevenue.id, 0);
                }
              },
              {
                key: "checkAllDistributionsAreChecked",
                value: function() {
                  this.setState({
                    checkedAll:
                      this.state.distributionIds.length ===
                      this.props.projectRevenue.distribution.meta
                        .distributionIdsTotal.length
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = [];
                  this.props.administrations.forEach(function(e) {
                    t.push(e.id);
                  });
                  var a = 0;
                  return (
                    (a =
                      this.props &&
                      this.props.projectRevenue &&
                      this.props.projectRevenue.distribution &&
                      this.props.projectRevenue.distribution.meta &&
                      this.props.projectRevenue.distribution.meta
                        .distributionIdsTotal
                        ? this.state.distributionIds.length +
                          "/" +
                          this.props.projectRevenue.distribution.meta
                            .distributionIdsTotal.length
                        : this.state.distributionIds.length),
                    h.a.createElement(
                      k.a,
                      null,
                      h.a.createElement(
                        W.a,
                        null,
                        h.a.createElement(
                          "span",
                          { className: "h5 text-bold" },
                          "Opbrengstverdeling deelnemers"
                        ),
                        h.a.createElement(
                          "div",
                          { className: "btn-group pull-right" },
                          h.a.createElement(C.a, {
                            iconName: "glyphicon-refresh",
                            onClickAction: this.reloadDistributions
                          }),
                          1 == this.props.projectRevenue.confirmed &&
                            t.includes(
                              this.props.projectRevenue.project.administrationId
                            ) &&
                            ("" === this.state.createType
                              ? h.a.createElement(
                                  h.a.Fragment,
                                  null,
                                  h.a.createElement(K.a, {
                                    buttonText: "Selecteer preview rapportage",
                                    onClickAction: function() {
                                      return e.toggleShowCheckboxList(
                                        "createReport"
                                      );
                                    }
                                  }),
                                  h.a.createElement(K.a, {
                                    buttonText:
                                      "redemptionEuro" ===
                                      this.props.projectRevenue.category.codeRef
                                        ? "Selecteer preview aflossing verdeling"
                                        : "Selecteer preview opbrengst verdeling",
                                    onClickAction: function() {
                                      return e.toggleShowCheckboxList(
                                        "createInvoices"
                                      );
                                    },
                                    buttonClassName: "btn-primary"
                                  })
                                )
                              : null)
                        )
                      ),
                      h.a.createElement(
                        w.a,
                        null,
                        this.state.showCheckboxList &&
                          "createReport" === this.state.createType
                          ? h.a.createElement(
                              k.a,
                              null,
                              h.a.createElement(
                                w.a,
                                null,
                                h.a.createElement(
                                  "div",
                                  { className: "row" },
                                  h.a.createElement(
                                    "div",
                                    { className: "col-md-12" },
                                    h.a.createElement(G.a, {
                                      label: "Documentgroep",
                                      value: "Opbrengst"
                                    }),
                                    h.a.createElement(H.a, {
                                      label: "Document template",
                                      name: "templateId",
                                      value: this.state.templateId,
                                      options: this.state.templates,
                                      onChangeAction: this.handleInputChange,
                                      required: "required",
                                      error: this.state.templateIdError
                                    })
                                  ),
                                  h.a.createElement(
                                    "div",
                                    { className: "col-md-12" },
                                    h.a.createElement(H.a, {
                                      label: "E-mail template",
                                      name: "emailTemplateId",
                                      value: this.state.emailTemplateId,
                                      options: this.state.emailTemplates,
                                      onChangeAction: this
                                        .handleEmailTemplateChange,
                                      required: "required",
                                      error: this.state.emailTemplateIdError
                                    }),
                                    h.a.createElement(Q.a, {
                                      label: "E-mail onderwerp",
                                      name: "subject",
                                      value: this.state.subject,
                                      onChangeAction: this.handleSubjectChange
                                    })
                                  ),
                                  h.a.createElement(
                                    "div",
                                    { className: "col-md-12" },
                                    h.a.createElement(G.a, {
                                      label: "Geselecteerde deelnemers",
                                      value: a
                                    }),
                                    h.a.createElement(
                                      "div",
                                      {
                                        className:
                                          "margin-10-top pull-right btn-group",
                                        role: "group"
                                      },
                                      h.a.createElement(K.a, {
                                        buttonClassName: "btn-default",
                                        buttonText: "Annuleren",
                                        onClickAction: this
                                          .toggleShowCheckboxList
                                      }),
                                      h.a.createElement(K.a, {
                                        buttonText: "Preview rapportage",
                                        onClickAction: this
                                          .checkDistributionRevenueReport,
                                        type: "submit",
                                        value: "Submit"
                                      })
                                    )
                                  )
                                )
                              )
                            )
                          : null,
                        this.state.showCheckboxList &&
                          "createInvoices" === this.state.createType
                          ? h.a.createElement(
                              k.a,
                              null,
                              h.a.createElement(
                                w.a,
                                null,
                                h.a.createElement(
                                  "div",
                                  { className: "row" },
                                  h.a.createElement(
                                    "div",
                                    { className: "col-md-12" },
                                    h.a.createElement(te.a, {
                                      label:
                                        "redemptionEuro" ===
                                        this.props.projectRevenue.category
                                          .codeRef
                                          ? "Aflossingsdatum"
                                          : "Uitkeringsdatum",
                                      name: "datePayout",
                                      value: this.state.datePayout,
                                      onChangeAction: this
                                        .handleInputChangeDate,
                                      required: "required",
                                      error: this.state.datePayoutError
                                    })
                                  ),
                                  h.a.createElement(
                                    "div",
                                    { className: "col-md-12" },
                                    h.a.createElement(
                                      "div",
                                      {
                                        className:
                                          "margin-10-top pull-right btn-group",
                                        role: "group"
                                      },
                                      h.a.createElement(K.a, {
                                        buttonClassName: "btn-default",
                                        buttonText: "Annuleren",
                                        onClickAction: this
                                          .toggleShowCheckboxList
                                      }),
                                      h.a.createElement(K.a, {
                                        buttonText:
                                          "revenueKwh" ===
                                          this.props.projectRevenue.category
                                            .codeRef
                                            ? "Opbrengst verdelen"
                                            : "redemptionEuro" ===
                                              this.props.projectRevenue.category
                                                .codeRef
                                            ? "Aflossing verdelen en Sepa bestand maken"
                                            : "Opbrengst verdelen en Sepa bestand maken",
                                        onClickAction: this
                                          .checkDistributionRevenueInvoices,
                                        type: "submit",
                                        value: "Submit"
                                      })
                                    )
                                  )
                                )
                              )
                            )
                          : null,
                        h.a.createElement(
                          "div",
                          { className: "col-md-12" },
                          h.a.createElement(q, {
                            changePage: this.changePage,
                            showCheckboxList: this.state.showCheckboxList,
                            toggleCheckedAll: this.toggleCheckedAll,
                            checkedAll: this.state.checkedAll,
                            toggleDistributionCheck: this
                              .toggleDistributionCheck,
                            distributionIds: this.state.distributionIds,
                            createType: this.state.createType
                          })
                        )
                      ),
                      this.state.showModal &&
                        h.a.createElement(
                          N.a,
                          {
                            title: "Deelnemer rapport maken",
                            closeModal: this.toggleModal,
                            buttonConfirmText: this.state.buttonConfirmText,
                            confirmAction: this.state.modalAction
                          },
                          this.state.modalText,
                          h.a.createElement("br", null),
                          h.a.createElement("br", null),
                          this.state.modalText2
                        ),
                      this.state.showSuccessMessage &&
                        h.a.createElement(
                          N.a,
                          {
                            title: "Succes",
                            closeModal: this.closeSuccesMessage,
                            buttonCancelText: "Ok",
                            showConfirmAction: !1
                          },
                          this.state.successMessage
                        )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        re = Object(g.b)(
          function(e) {
            return {
              projectRevenue: e.projectRevenue,
              documentGroups: e.systemData.documentGroups,
              administrations: e.meDetails.administrations
            };
          },
          function(e) {
            return {
              previewReport: function(t) {
                e(Object(L.m)(t));
              },
              getDistribution: function(t, a) {
                e(Object(L.j)({ id: t, page: a }));
              },
              setError: function(t, a) {
                e(Object(X.b)(t, a));
              }
            };
          }
        )(ne);
      A.a.locale("nl");
      var oe = Object(g.b)(function(e) {
          return { revenue: e.projectRevenue };
        })(function(e) {
          var t = e.revenue,
            a = t.createdAt,
            n = t.createdBy;
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(G.a, {
                label: "Gemaakt op",
                value: a ? A()(a).format("L") : "Onbekend"
              }),
              h.a.createElement(G.a, {
                label: "Gemaakt door",
                value: n ? n.fullName : "Onbekend"
              })
            )
          );
        }),
        ie = function(e) {
          return h.a.createElement(
            k.a,
            null,
            h.a.createElement(
              W.a,
              null,
              h.a.createElement(
                "span",
                { className: "h5 text-bold" },
                "Afsluiting gegevens"
              )
            ),
            h.a.createElement(
              w.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-md-12" },
                h.a.createElement(oe, null)
              )
            )
          );
        },
        se = a(784),
        le = a.n(se),
        ce = a(702),
        ue = a(786);
      function de(e, t) {
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
      function me(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? de(Object(a), !0).forEach(function(t) {
                E()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : de(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function pe(e) {
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
          return u()(this, a);
        };
      }
      function he() {
        var e = le()(["\n    font-weight: normal;\n"]);
        return (
          (he = function() {
            return e;
          }),
          e
        );
      }
      A.a.locale("nl");
      var ge = ue.a.em(he()),
        fe = (function(e) {
          l()(a, e);
          var t = pe(a);
          function a(e) {
            var n;
            r()(this, a),
              (n = t.call(this, e)),
              E()(v()(n), "toggleShowModal", function() {
                n.setState({ showModal: !n.state.showModal });
              }),
              E()(v()(n), "cancelSetDate", function() {
                n.setState(
                  me(
                    me({}, n.state),
                    {},
                    {
                      revenue: me(
                        me({}, n.state.revenue),
                        {},
                        { dateConfirmed: "", confirmed: !1 }
                      )
                    }
                  )
                ),
                  n.setState({ showModal: !n.state.showModal });
              }),
              E()(v()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  me(
                    me({}, n.state),
                    {},
                    { revenue: me(me({}, n.state.revenue), {}, E()({}, r, a)) }
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
                      t =
                        (n.state.revenue.kwhEndLow
                          ? parseFloat(n.state.revenue.kwhEndLow)
                          : 0) +
                        (n.state.revenue.kwhEndHigh
                          ? parseFloat(n.state.revenue.kwhEndHigh)
                          : 0);
                    n.setState(
                      me(
                        me({}, n.state),
                        {},
                        {
                          revenue: me(
                            me({}, n.state.revenue),
                            {},
                            { kwhStart: e, kwhEnd: t }
                          )
                        }
                      )
                    );
                  }, 200);
              }),
              E()(v()(n), "linkedValueAdjustment", function(e) {
                "keyAmountFirstPercentage" === e &&
                  ((n.state.revenue.keyAmountFirstPercentage &&
                    0 != n.state.revenue.keyAmountFirstPercentage) ||
                    n.setState(
                      me(
                        me({}, n.state),
                        {},
                        {
                          revenue: me(
                            me({}, n.state.revenue),
                            {},
                            { payPercentageValidFromKeyAmount: "" }
                          )
                        }
                      )
                    ));
              }),
              E()(v()(n), "handleInputChangeDate", function(e, t) {
                n.setState(
                  me(
                    me({}, n.state),
                    {},
                    { revenue: me(me({}, n.state.revenue), {}, E()({}, t, e)) }
                  )
                );
              }),
              E()(v()(n), "handleInputChangeDateConfirmed", function(e, t) {
                var a, r;
                e
                  ? (n.setState(
                      me(
                        me({}, n.state),
                        {},
                        {
                          revenue: me(
                            me({}, n.state.revenue),
                            {},
                            ((a = {}), E()(a, t, e), E()(a, "confirmed", !0), a)
                          )
                        }
                      )
                    ),
                    n.toggleShowModal())
                  : n.setState(
                      me(
                        me({}, n.state),
                        {},
                        {
                          revenue: me(
                            me({}, n.state.revenue),
                            {},
                            ((r = {}), E()(r, t, e), E()(r, "confirmed", !1), r)
                          )
                        }
                      )
                    );
              }),
              E()(v()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.revenue,
                  a = {},
                  r = {},
                  o = !1;
                if (
                  (z.a.isEmpty(t.categoryId + "") &&
                    ((a.categoryId = !0), (o = !0)),
                  z.a.isEmpty(t.dateBegin + "") &&
                    ((a.dateBegin = !0), (r.dateBegin = "Verplicht"), (o = !0)),
                  z.a.isEmpty(t.dateEnd + "") &&
                    ((a.dateEnd = !0), (r.dateEnd = "Verplicht"), (o = !0)),
                  !o &&
                    t.dateEnd < t.dateBegin &&
                    ((a.dateEnd = !0),
                    (r.dateEnd =
                      "Eind periode mag niet voor Begin periode liggen."),
                    (o = !0)),
                  o ||
                    "revenueKwh" === n.props.revenue.category.codeRef ||
                    A()(t.dateBegin).year() === A()(t.dateEnd).year() ||
                    ((a.dateBegin = !0),
                    (r.dateBegin =
                      "Jaaroverschrijdende perioden niet toegestaan."),
                    (a.dateEnd = !0),
                    (r.dateEnd =
                      "Jaaroverschrijdende perioden niet toegestaan."),
                    (o = !0)),
                  "inPossessionOf" === t.distributionTypeId &&
                    z.a.isEmpty(t.dateReference + "") &&
                    ((a.dateReference = !0), (o = !0)),
                  z.a.isEmpty(t.payAmount + "") ||
                    ("inPossessionOf" !== t.distributionTypeId &&
                      ((a.payAmount = !0),
                      (r.payAmount =
                        'Bedrag mag alleen bij type opbrengst verdeling "In bezit op" ingevuld zijn.'),
                      (o = !0)),
                    t.payAmount + "" < 0 &&
                      ((a.payAmount = !0),
                      (r.payAmount = "Bedrag mag niet negatief zijn."),
                      (o = !0))),
                  "revenueKwh" === n.props.revenue.category.codeRef &&
                    (t.kwhEndHigh < t.kwhStartHigh &&
                      ((a.kwhEndHigh = !0),
                      (r.kwhEndHigh =
                        "Eindstand kWh hoog mag niet lager zijn dan Beginstand kWh hoog."),
                      (o = !0)),
                    t.kwhEndLow < t.kwhStartLow &&
                      ((a.kwhEndLow = !0),
                      (r.kwhEndLow =
                        "Eindstand kWh laag mag niet lager zijn dan Beginstand kWh laag."),
                      (o = !0))),
                  "revenueEuro" === n.props.revenue.category.codeRef &&
                    ("capital" ===
                      n.props.revenue.project.projectType.codeRef ||
                      "postalcode_link_capital" ===
                        n.props.revenue.project.projectType.codeRef))
                ) {
                  z.a.isEmpty(t.payoutTypeId + "") &&
                    ((a.payoutTypeId = !0), (o = !0));
                  var i = n.props.participantProjectPayoutTypes.find(function(
                    e
                  ) {
                    return "account" === e.codeRef;
                  }).id;
                  t.revenue < 0 &&
                    t.payoutTypeId == i &&
                    ((a.payoutTypeId = !0),
                    (r.payoutTypeId =
                      "Als je een negatief resultaat wilt verdelen dan kan dat niet uitgekeerd worden op een rekening. Kies voor bijschrijven."),
                    (o = !0));
                }
                (z.a.isEmpty(t.payPercentage + "") &&
                  0 == t.keyAmountFirstPercentage &&
                  z.a.isEmpty(t.payPercentageValidFromKeyAmount + "")) ||
                  z.a.isEmpty(t.payAmount + "") ||
                  ((a.payAmount = !0),
                  (a.payPercentage = !0),
                  (a.keyAmountFirstPercentage = !0),
                  (a.payPercentageValidFromKeyAmount = !0),
                  (r.payAmount =
                    "Percentage(s) en Bedrag mogen niet allebei ingevuld zijn."),
                  (o = !0)),
                  (t.payoutKwh = t.payoutKwh
                    ? parseFloat(t.payoutKwh).toFixed(5)
                    : ""),
                  n.setState(
                    me(me({}, n.state), {}, { errors: a, errorMessage: r })
                  ),
                  o ||
                    (n.setState({ isSaving: !0 }),
                    R.a.updateProjectRevenue(t.id, t).then(function(e) {
                      n.props.fetchRevenue(t.id),
                        setTimeout(function() {
                          n.props.getDistribution(t.id, 0);
                        }, 250),
                        n.setState({ isSaving: !0 }),
                        n.props.switchToView();
                    }));
              });
            var o = e.revenue,
              i = o.id,
              s = o.distributionTypeId,
              l = o.confirmed,
              c = o.dateBegin,
              u = o.dateEnd,
              d = o.dateReference,
              m = o.dateConfirmed,
              p = o.payoutTypeId,
              h = o.kwhStart,
              g = o.kwhEnd,
              f = o.kwhStartHigh,
              b = o.kwhEndHigh,
              y = o.kwhStartLow,
              k = o.kwhEndLow,
              w = o.revenue,
              C = o.datePayed,
              N = o.payPercentage,
              j = o.payAmount,
              D = o.keyAmountFirstPercentage,
              P = o.payPercentageValidFromKeyAmount,
              T = o.payoutKwh;
            return (
              (n.state = {
                showModal: !1,
                revenue: {
                  id: i,
                  distributionTypeId: s,
                  confirmed: !!l,
                  dateBegin: c ? A()(c).format("Y-MM-DD") : "",
                  dateEnd: u ? A()(u).format("Y-MM-DD") : "",
                  dateReference: d ? A()(d).format("Y-MM-DD") : "",
                  dateConfirmed: m ? A()(m).format("Y-MM-DD") : "",
                  payoutTypeId: p || "",
                  kwhStart: h || 0,
                  kwhEnd: g || 0,
                  kwhStartHigh: f || "",
                  kwhEndHigh: b || "",
                  kwhStartLow: y || "",
                  kwhEndLow: k || "",
                  revenue: w || "",
                  datePayed: C ? A()(C).format("Y-MM-DD") : "",
                  payPercentage: N || "",
                  payAmount: j || "",
                  keyAmountFirstPercentage: D || 0,
                  payPercentageValidFromKeyAmount: P || "",
                  payoutKwh: T ? parseFloat(T).toFixed(5) : ""
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
                isSaving: !1
              }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.revenue,
                    t = e.distributionTypeId,
                    a = e.confirmed,
                    n = e.dateBegin,
                    r = e.dateEnd,
                    o = e.dateReference,
                    i = e.dateConfirmed,
                    s = e.kwhStart,
                    l = e.kwhEnd,
                    c = e.kwhStartHigh,
                    u = e.kwhEndHigh,
                    d = e.kwhStartLow,
                    m = e.kwhEndLow,
                    p = e.revenue,
                    g = (e.datePayed, e.payPercentage),
                    f = e.payAmount,
                    v = e.keyAmountFirstPercentage,
                    b = e.payPercentageValidFromKeyAmount,
                    E = (e.typeId, e.payoutKwh),
                    y = e.payoutTypeId,
                    k = this.props.revenue.project,
                    w = this.props.revenue.category,
                    C = "";
                  return (
                    k &&
                      k.projectType &&
                      k.projectType.codeRef &&
                      (C = k.projectType.codeRef),
                    h.a.createElement(
                      "form",
                      {
                        className: "form-horizontal col-md-12",
                        onSubmit: this.handleSubmit
                      },
                      h.a.createElement(
                        "div",
                        { className: "row" },
                        h.a.createElement(
                          "div",
                          { className: "panel-heading" },
                          h.a.createElement(
                            "span",
                            { className: "h5 text-bold" },
                            "Algemene informatie"
                          )
                        )
                      ),
                      h.a.createElement(
                        "div",
                        { className: "row" },
                        h.a.createElement(G.a, {
                          label: "Soort",
                          value: w ? w.name : "",
                          className: "form-group col-sm-6"
                        }),
                        h.a.createElement(G.a, {
                          label: "Definitief",
                          value: a ? "Ja" : "Nee",
                          className: "form-group col-sm-6"
                        })
                      ),
                      "revenueEuro" === w.codeRef
                        ? h.a.createElement(
                            "div",
                            { className: "row" },
                            "obligation" === C
                              ? h.a.createElement(H.a, {
                                  label: "Type opbrengst verdeling",
                                  name: "distributionTypeId",
                                  options: this.props
                                    .projectRevenueDistributionTypes,
                                  value: t,
                                  onChangeAction: this.handleInputChange
                                })
                              : null,
                            "inPossessionOf" === t
                              ? h.a.createElement(te.a, {
                                  label: "Peildatum",
                                  name: "dateReference",
                                  value: o,
                                  onChangeAction: this.handleInputChangeDate,
                                  required: "required",
                                  error: this.state.errors.dateReference
                                })
                              : null
                          )
                        : null,
                      "redemptionEuro" === w.codeRef
                        ? h.a.createElement(
                            "div",
                            { className: "row" },
                            "inPossessionOf" === t
                              ? h.a.createElement(te.a, {
                                  label: "Peildatum",
                                  name: "dateReference",
                                  value: o,
                                  onChangeAction: this.handleInputChangeDate,
                                  required: "required",
                                  error: this.state.errors.dateReference
                                })
                              : null
                          )
                        : null,
                      h.a.createElement(
                        "div",
                        { className: "row" },
                        h.a.createElement(te.a, {
                          label: "Begin periode",
                          name: "dateBegin",
                          value: n,
                          onChangeAction: this.handleInputChangeDate,
                          required: "required",
                          error: this.state.errors.dateBegin,
                          errorMessage: this.state.errorMessage.dateBegin,
                          disabledBefore:
                            "revenueEuro" !== w.codeRef ||
                            ("loan" !== C && "obligation" !== C)
                              ? "redemptionEuro" === w.codeRef
                                ? k.dateInterestBearingRedemption
                                : "revenueKwh" === w.codeRef
                                ? k.dateInterestBearingKwh
                                : ""
                              : k.dateInterestBearing
                        }),
                        h.a.createElement(te.a, {
                          label: "Eind periode",
                          name: "dateEnd",
                          value: r,
                          onChangeAction: this.handleInputChangeDate,
                          required: "required",
                          error: this.state.errors.dateEnd,
                          errorMessage: this.state.errorMessage.dateEnd,
                          disabledBefore: n,
                          disabledAfter:
                            "revenueKwh" === w.codeRef
                              ? A()(n)
                                  .add(1, "year")
                                  .add(6, "month")
                                  .format("Y-MM-DD")
                              : A()(n)
                                  .endOf("year")
                                  .format("Y-MM-DD")
                        })
                      ),
                      h.a.createElement(
                        "div",
                        { className: "row" },
                        h.a.createElement(te.a, {
                          label: "Datum definitief",
                          name: "dateConfirmed",
                          value: i,
                          onChangeAction: this.handleInputChangeDateConfirmed
                        }),
                        "revenueEuro" !== w.codeRef ||
                          ("capital" !== C && "postalcode_link_capital" !== C)
                          ? null
                          : h.a.createElement(H.a, {
                              label: "Uitkeren op",
                              name: "payoutTypeId",
                              id: "payoutTypeId",
                              options: this.props.participantProjectPayoutTypes,
                              value: y,
                              onChangeAction: this.handleInputChange,
                              required: "required",
                              error: this.state.errors.payoutTypeId,
                              errorMessage: this.state.errorMessage.payoutTypeId
                            })
                      ),
                      "revenueKwh" === w.codeRef
                        ? h.a.createElement(
                            h.a.Fragment,
                            null,
                            h.a.createElement(
                              "div",
                              { className: "row" },
                              h.a.createElement(
                                "div",
                                { className: "panel-part panel-heading" },
                                h.a.createElement(
                                  "span",
                                  { className: "h5 text-bold" },
                                  "Opbrengst kWh"
                                )
                              )
                            ),
                            h.a.createElement(
                              "div",
                              { className: "row" },
                              this.props.revenue.project
                                .kwhStartHighNextRevenue > 0
                                ? h.a.createElement(Q.a, {
                                    type: "number",
                                    label: "Beginstand kWh hoog",
                                    name: "kwhStartHigh",
                                    value: c,
                                    readOnly: !0
                                  })
                                : h.a.createElement(Q.a, {
                                    type: "number",
                                    label: "Beginstand kWh hoog",
                                    name: "kwhStartHigh",
                                    value: c,
                                    onChangeAction: this.handleInputChange
                                  }),
                              h.a.createElement(Q.a, {
                                type: "number",
                                label: "Eindstand kWh hoog",
                                name: "kwhEndHigh",
                                value: u,
                                onChangeAction: this.handleInputChange,
                                error: this.state.errors.kwhEndHigh,
                                errorMessage: this.state.errorMessage.kwhEndHigh
                              })
                            ),
                            h.a.createElement(
                              "div",
                              { className: "row" },
                              this.props.revenue.project
                                .kwhStartLowNextRevenue > 0
                                ? h.a.createElement(Q.a, {
                                    type: "number",
                                    label: "Beginstand kWh laag",
                                    name: "kwhStartLow",
                                    value: d,
                                    readOnly: !0
                                  })
                                : h.a.createElement(Q.a, {
                                    type: "number",
                                    label: "Beginstand kWh laag",
                                    name: "kwhStartLow",
                                    value: d,
                                    onChangeAction: this.handleInputChange
                                  }),
                              h.a.createElement(Q.a, {
                                type: "number",
                                label: "Eindstand kWh laag",
                                name: "kwhEndLow",
                                value: m,
                                onChangeAction: this.handleInputChange,
                                error: this.state.errors.kwhEndLow,
                                errorMessage: this.state.errorMessage.kwhEndLow
                              })
                            ),
                            h.a.createElement(
                              "div",
                              { className: "row" },
                              h.a.createElement(Q.a, {
                                type: "number",
                                label: "Beginstand kWh",
                                name: "kwhStart",
                                value: s,
                                readOnly: !0
                              }),
                              h.a.createElement(Q.a, {
                                type: "number",
                                label: "Eindstand kWh",
                                name: "kwhEnd",
                                value: l,
                                readOnly: !0
                              })
                            ),
                            h.a.createElement(
                              "div",
                              { className: "row" },
                              h.a.createElement(Q.a, {
                                type: "number",
                                label: "Opbrengst kWh €",
                                name: "payoutKwh",
                                value: E,
                                onChangeAction: this.handleInputChange
                              })
                            )
                          )
                        : null,
                      "revenueEuro" === w.codeRef
                        ? h.a.createElement(
                            h.a.Fragment,
                            null,
                            h.a.createElement(
                              "div",
                              { className: "row" },
                              h.a.createElement(
                                "div",
                                { className: "panel-part panel-heading" },
                                h.a.createElement(
                                  "span",
                                  { className: "h5 text-bold" },
                                  "Opbrengst euro"
                                )
                              )
                            ),
                            "loan" === C || "obligation" === C
                              ? h.a.createElement(
                                  h.a.Fragment,
                                  null,
                                  h.a.createElement(
                                    "div",
                                    { className: "row" },
                                    h.a.createElement(Q.a, {
                                      type: "number",
                                      label: "Uitkering %",
                                      name: "payPercentage",
                                      value: g,
                                      onChangeAction: this.handleInputChange,
                                      error: this.state.errors.payPercentage
                                    }),
                                    h.a.createElement(Q.a, {
                                      type: "number",
                                      label:
                                        "loan" === C
                                          ? "of uitkeringsbedrag (per deelname)"
                                          : "of uitkeringsbedrag (per participatie)",
                                      name: "payAmount",
                                      value: f,
                                      onChangeAction: this.handleInputChange,
                                      error: this.state.errors.payAmount,
                                      errorMessage: this.state.errorMessage
                                        .payAmount
                                    })
                                  ),
                                  h.a.createElement(
                                    "div",
                                    { className: "row" },
                                    h.a.createElement(Q.a, {
                                      label: h.a.createElement(
                                        h.a.Fragment,
                                        null,
                                        "Bedrag ",
                                        h.a.createElement(
                                          ge,
                                          null,
                                          "(uitkering % geldig tot en met)"
                                        )
                                      ),
                                      name: "keyAmountFirstPercentage",
                                      value: v,
                                      onChangeAction: this.handleInputChange,
                                      error: this.state.errors
                                        .keyAmountFirstPercentage
                                    })
                                  ),
                                  this.state.revenue.keyAmountFirstPercentage
                                    ? h.a.createElement(
                                        "div",
                                        { className: "row" },
                                        h.a.createElement(Q.a, {
                                          type: "number",
                                          label: h.a.createElement(
                                            h.a.Fragment,
                                            null,
                                            "Uitkering % vanaf bedrag"
                                          ),
                                          name:
                                            "payPercentageValidFromKeyAmount",
                                          value: b,
                                          onChangeAction: this
                                            .handleInputChange,
                                          error: this.state.errors
                                            .payPercentageValidFromKeyAmount
                                        })
                                      )
                                    : null
                                )
                              : null,
                            "capital" === C || "postalcode_link_capital" === C
                              ? h.a.createElement(
                                  h.a.Fragment,
                                  null,
                                  h.a.createElement(
                                    "div",
                                    { className: "row" },
                                    h.a.createElement(Q.a, {
                                      type: "number",
                                      label: "Resultaat",
                                      name: "revenue",
                                      value: p,
                                      onChangeAction: this.handleInputChange
                                    })
                                  )
                                )
                              : null
                          )
                        : null,
                      "redemptionEuro" === w.codeRef
                        ? h.a.createElement(
                            h.a.Fragment,
                            null,
                            h.a.createElement(
                              "div",
                              { className: "row" },
                              h.a.createElement(
                                "div",
                                { className: "panel-part panel-heading" },
                                h.a.createElement(
                                  "span",
                                  { className: "h5 text-bold" },
                                  "Aflossing euro"
                                )
                              )
                            ),
                            "loan" === C || "obligation" === C
                              ? h.a.createElement(
                                  h.a.Fragment,
                                  null,
                                  h.a.createElement(
                                    "div",
                                    { className: "row" },
                                    h.a.createElement(Q.a, {
                                      type: "number",
                                      label: "Aflossing %",
                                      name: "payPercentage",
                                      value: g,
                                      onChangeAction: this.handleInputChange
                                    }),
                                    h.a.createElement(Q.a, {
                                      type: "number",
                                      label:
                                        "loan" === C
                                          ? "of aflossingsbedrag (per deelname)"
                                          : "of aflossingsbedrag (per participatie)",
                                      name: "payAmount",
                                      value: f,
                                      onChangeAction: this.handleInputChange,
                                      error: this.state.errors.payAmount,
                                      errorMessage: this.state.errorMessage
                                        .payAmount
                                    })
                                  )
                                )
                              : null
                          )
                        : null,
                      h.a.createElement(
                        ce.a,
                        null,
                        h.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          h.a.createElement(K.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.switchToView
                          }),
                          h.a.createElement(K.a, {
                            buttonText: "Opslaan",
                            onClickAction: this.handleSubmit,
                            type: "submit",
                            value: "Submit",
                            loading: this.state.isSaving
                          })
                        )
                      ),
                      this.state.showModal &&
                        h.a.createElement(
                          N.a,
                          {
                            buttonConfirmText: "Bevestigen",
                            closeModal: this.cancelSetDate,
                            confirmAction: this.toggleShowModal,
                            title: "Bevestigen"
                          },
                          h.a.createElement(
                            "p",
                            null,
                            "redemptionEuro" ===
                              this.props.revenue.category.codeRef
                              ? "Als je deze datum invult, zal de aflossing definitief worden gemaakt. Je kunt deze hierna niet meer aanpassen."
                              : "Als je deze datum invult, zal de opbrengst definitief worden gemaakt. Je kunt deze hierna niet meer aanpassen."
                          )
                        )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        ve = Object(g.b)(
          function(e) {
            return {
              revenue: e.projectRevenue,
              projectRevenueDistributionTypes:
                e.systemData.projectRevenueDistributionTypes,
              participantProjectPayoutTypes:
                e.systemData.participantProjectPayoutTypes
            };
          },
          function(e) {
            return {
              fetchRevenue: function(t) {
                e(Object(L.i)(t));
              },
              getParticipants: (function(e) {
                function t(t, a) {
                  return e.apply(this, arguments);
                }
                return (
                  (t.toString = function() {
                    return e.toString();
                  }),
                  t
                );
              })(function(t, a) {
                e(getParticipants({ id: t, page: a }));
              }),
              getDistribution: function(t, a) {
                e(Object(L.j)({ id: t, page: a }));
              }
            };
          }
        )(fe);
      function be() {
        var e = le()(["\n    font-weight: normal;\n"]);
        return (
          (be = function() {
            return e;
          }),
          e
        );
      }
      A.a.locale("nl");
      var Ee = ue.a.em(be()),
        ye = Object(g.b)(function(e) {
          return { revenue: e.projectRevenue };
        })(function(e) {
          var t = e.revenue,
            a = t.confirmed,
            n = t.dateBegin,
            r = t.dateEnd,
            o = t.dateReference,
            i = t.dateConfirmed,
            s = t.participantProjectPayoutType,
            l = t.kwhStart,
            c = t.kwhEnd,
            u = t.kwhStartHigh,
            d = t.kwhEndHigh,
            m = t.kwhStartLow,
            p = t.kwhEndLow,
            g = t.revenue,
            f = (t.datePayed, t.payPercentage),
            v = t.payAmount,
            b = t.keyAmountFirstPercentage,
            E = t.payPercentageValidFromKeyAmount,
            y = t.category,
            k = t.project,
            w = t.payoutKwh,
            C = t.distributionType;
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "panel-heading", onClick: e.switchToEdit },
              h.a.createElement(
                "span",
                { className: "h5 text-bold" },
                "Algemeen"
              )
            ),
            h.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              h.a.createElement(G.a, {
                label: "Soort",
                value: y ? y.name : ""
              }),
              h.a.createElement(G.a, {
                label: "Definitief",
                value: a ? "Ja" : "Nee"
              })
            ),
            "revenueEuro" === y.codeRef
              ? h.a.createElement(
                  "div",
                  { className: "row", onClick: e.switchToEdit },
                  "obligation" === k.projectType.codeRef
                    ? h.a.createElement(G.a, {
                        label: "Type opbrengst verdeling",
                        value: C ? C.name : ""
                      })
                    : null,
                  C && "inPossessionOf" === C.id
                    ? h.a.createElement(G.a, {
                        label: "Peildatum",
                        value: o ? A()(o).format("L") : ""
                      })
                    : null
                )
              : null,
            h.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              h.a.createElement(G.a, {
                label: "Begin periode",
                value: n ? A()(n).format("L") : ""
              }),
              h.a.createElement(G.a, {
                label: "Eind periode",
                value: r ? A()(r).format("L") : ""
              })
            ),
            h.a.createElement(
              "div",
              { className: "row", onClick: e.switchToEdit },
              h.a.createElement(G.a, {
                label: "Datum definitief",
                value: i ? A()(i).format("L") : ""
              }),
              "revenueEuro" !== y.codeRef ||
                ("capital" !== k.projectType.codeRef &&
                  "postalcode_link_capital" !== k.projectType.codeRef)
                ? null
                : h.a.createElement(G.a, {
                    label: "Uitkeren op",
                    value: s ? s.name : ""
                  })
            ),
            h.a.createElement("div", {
              className: "row",
              onClick: e.switchToEdit
            }),
            "revenueKwh" === y.codeRef
              ? h.a.createElement(
                  h.a.Fragment,
                  null,
                  h.a.createElement(
                    "div",
                    {
                      className: "panel-part panel-heading",
                      onClick: e.switchToEdit
                    },
                    h.a.createElement(
                      "span",
                      { className: "h5 text-bold" },
                      "Opbrengst kWh"
                    )
                  ),
                  h.a.createElement(
                    "div",
                    { className: "row", onClick: e.switchToEdit },
                    h.a.createElement(G.a, {
                      label: "Beginstand kWh hoog",
                      value: u && u
                    }),
                    h.a.createElement(G.a, {
                      label: "Eindstand kWh hoog",
                      value: d && d
                    })
                  ),
                  h.a.createElement(
                    "div",
                    { className: "row", onClick: e.switchToEdit },
                    h.a.createElement(G.a, {
                      label: "Beginstand kWh laag",
                      value: m && m
                    }),
                    h.a.createElement(G.a, {
                      label: "Eindstand kWh laag",
                      value: p && p
                    })
                  ),
                  h.a.createElement(
                    "div",
                    { className: "row", onClick: e.switchToEdit },
                    h.a.createElement(G.a, {
                      label: "Beginstand kWh",
                      value: l && l
                    }),
                    h.a.createElement(G.a, {
                      label: "Eindstand kWh",
                      value: c && c
                    })
                  ),
                  h.a.createElement(
                    "div",
                    { className: "row", onClick: e.switchToEdit },
                    h.a.createElement(G.a, {
                      label: "Opbrengst kWh €",
                      value:
                        w &&
                        "€ " +
                          w.toLocaleString("nl", {
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 5
                          })
                    })
                  )
                )
              : null,
            "revenueEuro" === y.codeRef
              ? h.a.createElement(
                  h.a.Fragment,
                  null,
                  h.a.createElement(
                    "div",
                    {
                      className: "panel-part panel-heading",
                      onClick: e.switchToEdit
                    },
                    h.a.createElement(
                      "span",
                      { className: "h5 text-bold" },
                      "Opbrengst euro"
                    )
                  ),
                  h.a.createElement(
                    "div",
                    { className: "row", onClick: e.switchToEdit },
                    "loan" === k.projectType.codeRef ||
                      "obligation" === k.projectType.codeRef
                      ? h.a.createElement(
                          h.a.Fragment,
                          null,
                          h.a.createElement(
                            "div",
                            null,
                            h.a.createElement(G.a, {
                              label: "Uitkering %",
                              value: f && f + "%"
                            }),
                            h.a.createElement(G.a, {
                              label:
                                "loan" === k.projectType.codeRef
                                  ? "of uitkeringsbedrag (per deelnemer)"
                                  : "of uitkeringsbedrag (per participatie)",
                              value: Object(_.a)(v)
                            })
                          ),
                          h.a.createElement(
                            "div",
                            null,
                            h.a.createElement(G.a, {
                              label: h.a.createElement(
                                h.a.Fragment,
                                null,
                                "Bedrag ",
                                h.a.createElement(
                                  Ee,
                                  null,
                                  "(uitkering % geldig tot en met)"
                                )
                              ),
                              value: b && "€ " + b
                            })
                          )
                        )
                      : null,
                    "capital" === k.projectType.codeRef ||
                      "postalcode_link_capital" === k.projectType.codeRef
                      ? h.a.createElement(
                          h.a.Fragment,
                          null,
                          h.a.createElement(G.a, {
                            label: "Resultaat",
                            value: g
                          })
                        )
                      : null
                  ),
                  b
                    ? h.a.createElement(
                        "div",
                        { className: "row" },
                        h.a.createElement(G.a, {
                          type: "number",
                          label: h.a.createElement(
                            h.a.Fragment,
                            null,
                            "Uitkering % vanaf bedrag"
                          ),
                          value: E && E + "%"
                        })
                      )
                    : null
                )
              : null,
            "redemptionEuro" === y.codeRef
              ? h.a.createElement(
                  h.a.Fragment,
                  null,
                  h.a.createElement(
                    "div",
                    {
                      className: "panel-part panel-heading",
                      onClick: e.switchToEdit
                    },
                    h.a.createElement(
                      "span",
                      { className: "h5 text-bold" },
                      "Aflossing euro"
                    )
                  ),
                  v
                    ? h.a.createElement(
                        h.a.Fragment,
                        null,
                        h.a.createElement(
                          "div",
                          { className: "row", onClick: e.switchToEdit },
                          "loan" === k.projectType.codeRef ||
                            "obligation" === k.projectType.codeRef
                            ? h.a.createElement(G.a, {
                                label: "Aflossingsbedrag (per deelnemer)",
                                value: Object(_.a)(v)
                              })
                            : null
                        )
                      )
                    : h.a.createElement(
                        h.a.Fragment,
                        null,
                        h.a.createElement(
                          "div",
                          { className: "row", onClick: e.switchToEdit },
                          "loan" === k.projectType.codeRef ||
                            "obligation" === k.projectType.codeRef
                            ? h.a.createElement(G.a, {
                                label: "Aflossing %",
                                value: f && f + "%"
                              })
                            : null
                        )
                      )
                )
              : null
          );
        });
      function ke(e) {
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
          return u()(this, a);
        };
      }
      var we = (function(e) {
          l()(a, e);
          var t = ke(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(v()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              E()(v()(n), "switchToView", function() {
                n.setState({ showEdit: !1, activeDiv: "" });
              }),
              (n.state = { showEdit: !1, activeDiv: "" }),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "onDivEnter",
                value: function() {
                  this.setState({ activeDiv: "panel-grey" });
                }
              },
              {
                key: "onDivLeave",
                value: function() {
                  this.state.showEdit || this.setState({ activeDiv: "" });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this;
                  return h.a.createElement(
                    k.a,
                    {
                      className: this.state.activeDiv,
                      onMouseEnter: function() {
                        return e.onDivEnter();
                      },
                      onMouseLeave: function() {
                        return e.onDivLeave();
                      }
                    },
                    h.a.createElement(
                      w.a,
                      null,
                      this.state.showEdit &&
                        !this.props.revenue.confirmed &&
                        this.props.permissions.manageFinancial
                        ? h.a.createElement(ve, {
                            switchToView: this.switchToView
                          })
                        : h.a.createElement(ye, {
                            switchToEdit: this.switchToEdit
                          })
                    )
                  );
                }
              }
            ]),
            a
          );
        })(p.Component),
        Ce = Object(g.b)(function(e) {
          return {
            permissions: e.meDetails.permissions,
            revenue: e.projectRevenue
          };
        })(we);
      function Ne(e) {
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
          return u()(this, a);
        };
      }
      var Re = (function(e) {
        l()(a, e);
        var t = Ne(a);
        function a(e) {
          return r()(this, a), t.call(this, e);
        }
        return (
          i()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchRevenue(this.props.params.id);
              }
            },
            {
              key: "componentWillUnmount",
              value: function() {
                this.props.clearRevenue();
              }
            },
            {
              key: "render",
              value: function() {
                return h.a.createElement(
                  "div",
                  { className: "row" },
                  h.a.createElement(
                    "div",
                    { className: "col-md-9" },
                    h.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      h.a.createElement(M, null)
                    ),
                    this.props.projectRevenue.id
                      ? h.a.createElement(
                          "div",
                          { className: "col-md-12" },
                          1 == this.props.projectRevenue.confirmed &&
                            h.a.createElement(
                              k.a,
                              null,
                              h.a.createElement(
                                W.a,
                                null,
                                h.a.createElement(
                                  "span",
                                  {
                                    className: "h5",
                                    style: { color: "#e64a4a" }
                                  },
                                  "Deze opbrengst is definitief. Hierdoor kan deze niet meer gewijzigd worden en staat de opbrengstverdeling vast."
                                )
                              )
                            ),
                          h.a.createElement(Ce, null),
                          h.a.createElement(re, null),
                          h.a.createElement(ie, null)
                        )
                      : h.a.createElement(
                          "div",
                          null,
                          "Geen gegevens gevonden."
                        )
                  )
                );
              }
            }
          ]),
          a
        );
      })(p.Component);
      t.default = Object(g.b)(
        function(e) {
          return { projectRevenue: e.projectRevenue };
        },
        function(e) {
          return {
            fetchRevenue: function(t) {
              e(Object(L.i)(t));
            },
            clearRevenue: function() {
              e(Object(L.d)());
            }
          };
        }
      )(Re);
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
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
          className: i.a.string,
          onMouseEnter: i.a.func,
          onMouseLeave: i.a.func
        }),
        (t.a = s);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
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
        (s.propTypes = { className: i.a.string }),
        (t.a = s);
    },
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        s = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            o = e.type,
            i = e.value,
            s = e.loading,
            l = e.loadText,
            c = e.disabled;
          return s
            ? r.a.createElement(
                "button",
                {
                  type: o,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: i,
                  disabled: s
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
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: i,
                  disabled: c
                },
                a
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
          buttonClassName: i.a.string,
          buttonText: i.a.string.isRequired,
          onClickAction: i.a.func,
          type: i.a.string,
          value: i.a.string,
          loading: i.a.bool,
          loadText: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = s);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        s = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            o = e.title,
            i = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: i,
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
          buttonClassName: i.a.string,
          iconName: i.a.string.isRequired,
          onClickAction: i.a.func,
          title: i.a.string,
          disabled: i.a.bool
        }),
        (t.a = s);
    },
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        s = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            o = e.size,
            i = e.id,
            s = e.placeholder,
            l = e.name,
            c = e.value,
            u = e.onClickAction,
            d = e.onChangeAction,
            m = e.onBlurAction,
            p = e.required,
            h = e.readOnly,
            g = e.maxLength,
            f = e.error,
            v = e.min,
            b = e.max,
            E = e.step,
            y = e.errorMessage,
            k = e.divSize,
            w = e.divClassName,
            C = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(k, " ").concat(w) },
            r.a.createElement(
              "label",
              { htmlFor: i, className: "col-sm-6 ".concat(p) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(o) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (f ? "has-error" : ""),
                id: i,
                placeholder: s,
                name: l,
                value: c,
                onClick: u,
                onChange: d,
                onBlur: m,
                readOnly: h,
                maxLength: g,
                min: v,
                max: b,
                autoComplete: C,
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
                  y
                )
              )
          );
        };
      (s.defaultProps = {
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
        (s.propTypes = {
          label: i.a.oneOfType([i.a.string, i.a.object]).isRequired,
          type: i.a.string,
          className: i.a.string,
          divClassName: i.a.string,
          size: i.a.string,
          divSize: i.a.string,
          id: i.a.string,
          placeholder: i.a.string,
          name: i.a.string.isRequired,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          onClickAction: i.a.func,
          onChangeAction: i.a.func,
          onBlurAction: i.a.func,
          required: i.a.string,
          readOnly: i.a.bool,
          maxLength: i.a.string,
          error: i.a.bool,
          min: i.a.string,
          max: i.a.string,
          step: i.a.string,
          errorMessage: i.a.string,
          autoComplete: i.a.string
        }),
        (t.a = s);
    },
    695: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(4),
        i = a(8),
        s = a.n(i),
        l = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            i = e.value,
            s = e.link,
            l = e.hidden;
          return s.length > 0
            ? r.a.createElement(
                "div",
                { className: a, style: l ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement(
                  "div",
                  { className: "col-sm-6", id: n, onClick: null },
                  r.a.createElement(
                    o.b,
                    { to: s, className: "link-underline" },
                    i
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: a, style: l ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement("div", { className: "col-sm-6", id: n }, i)
              );
        };
      (l.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (l.propTypes = {
          label: s.a.oneOfType([s.a.string, s.a.object]).isRequired,
          className: s.a.string,
          id: s.a.string,
          value: s.a.oneOfType([s.a.string, s.a.number]),
          link: s.a.string,
          hidden: s.a.bool
        }),
        (t.a = l);
    },
    696: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        s = function(e) {
          var t = e.label,
            a = e.className,
            n = e.size,
            o = e.id,
            i = e.name,
            s = e.value,
            l = e.options,
            c = e.onChangeAction,
            u = e.onBlurAction,
            d = e.required,
            m = e.error,
            p = e.errorMessage,
            h = e.optionValue,
            g = e.optionName,
            f = e.readOnly,
            v = e.placeholder,
            b = e.divClassName,
            E = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(b) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(d) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-6" },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(a) + (m && " has-error"),
                  id: o,
                  name: i,
                  value: s,
                  onChange: c,
                  onBlur: u,
                  readOnly: f
                },
                E && r.a.createElement("option", { value: "" }, v),
                l.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[h], value: e[h] },
                    e[g]
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
      (s.defaultProps = {
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
        (s.propTypes = {
          label: i.a.string.isRequired,
          className: i.a.string,
          size: i.a.string,
          id: i.a.string,
          name: i.a.string.isRequired,
          options: i.a.array,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          onChangeAction: i.a.func,
          onBlurAction: i.a.func,
          required: i.a.string,
          readOnly: i.a.bool,
          error: i.a.bool,
          errorMessage: i.a.string,
          emptyOption: i.a.bool,
          optionValue: i.a.string,
          optionName: i.a.string,
          placeholder: i.a.string
        }),
        (t.a = s);
    },
    698: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        s = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-heading ".concat(t) },
            a
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: i.a.string }),
        (t.a = s);
    },
    699: function(e, t, a) {
      "use strict";
      var n = a(24),
        r = a.n(n),
        o = a(25),
        i = a.n(o),
        s = a(22),
        l = a.n(s),
        c = a(26),
        u = a.n(c),
        d = a(27),
        m = a.n(d),
        p = a(16),
        h = a.n(p),
        g = a(6),
        f = a.n(g),
        v = a(0),
        b = a.n(v),
        E = a(8),
        y = a.n(E),
        k = a(707),
        w = a.n(k),
        C = a(708),
        N = a.n(C),
        R = a(7),
        j = a.n(R);
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
            n = h()(e);
          if (t) {
            var r = h()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return m()(this, a);
        };
      }
      j.a.locale("nl");
      var P = (function(e) {
        u()(a, e);
        var t = D(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            f()(l()(n), "validateDate", function(e) {
              var t = j()(e.target.value, "DD-MM-YYYY", !0),
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
            f()(l()(n), "onDateChange", function(e) {
              var t = e ? j()(e).format("Y-MM-DD") : "",
                a = !1;
              t &&
                n.props.disabledBefore &&
                j()(t).isBefore(n.props.disabledBefore) &&
                (a = !0),
                t &&
                  n.props.disabledAfter &&
                  j()(t).isAfter(n.props.disabledAfter) &&
                  (a = !0),
                n.setState({ errorDateFormat: a }),
                !a && n.props.onChangeAction(t, n.props.name);
            }),
            (n.state = { errorDateFormat: !1 }),
            n
          );
        }
        return (
          i()(a, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.label,
                  a = e.className,
                  n = e.size,
                  r = e.divSize,
                  o = e.id,
                  i = e.value,
                  s = e.required,
                  l = e.readOnly,
                  c = e.name,
                  u = e.error,
                  d = e.errorMessage,
                  m = e.disabledBefore,
                  p = e.disabledAfter,
                  h = i ? j()(i).format("L") : "",
                  g = {};
                return (
                  m && (g.before = new Date(m)),
                  p && (g.after = new Date(p)),
                  b.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    b.a.createElement(
                      "div",
                      null,
                      b.a.createElement(
                        "label",
                        { htmlFor: o, className: "col-sm-6 ".concat(s) },
                        t
                      )
                    ),
                    b.a.createElement(
                      "div",
                      { className: "".concat(n) },
                      b.a.createElement(w.a, {
                        id: o,
                        value: h,
                        formatDate: C.formatDate,
                        parseDate: C.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: N.a,
                          disabledDays: g
                        },
                        inputProps: {
                          className:
                            "form-control input-sm ".concat(a) +
                            (this.state.errorDateFormat || u
                              ? " has-error"
                              : ""),
                          name: c,
                          onBlur: this.validateDate,
                          autoComplete: "off",
                          readOnly: l,
                          disabled: l
                        },
                        required: s,
                        readOnly: l,
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
      })(v.Component);
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
          label: y.a.string.isRequired,
          type: y.a.string,
          className: y.a.string,
          size: y.a.string,
          divSize: y.a.string,
          id: y.a.string,
          name: y.a.string,
          value: y.a.oneOfType([y.a.string, y.a.object]),
          onChangeAction: y.a.func,
          required: y.a.string,
          readOnly: y.a.bool,
          error: y.a.bool,
          errorMessage: y.a.string,
          disabledBefore: y.a.string,
          disabledAfter: y.a.string
        }),
        (t.a = P);
    },
    702: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        s = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-footer ".concat(t) },
            a
          );
        };
      (s.defaultProps = { className: "" }),
        (s.propTypes = { className: i.a.string }),
        (t.a = s);
    },
    711: function(e, t) {
      e.exports = function(e, t, a, n) {
        var r = new Blob(void 0 !== n ? [n, e] : [e], {
          type: a || "application/octet-stream"
        });
        if (void 0 !== window.navigator.msSaveBlob)
          window.navigator.msSaveBlob(r, t);
        else {
          var o =
              window.URL && window.URL.createObjectURL
                ? window.URL.createObjectURL(r)
                : window.webkitURL.createObjectURL(r),
            i = document.createElement("a");
          (i.style.display = "none"),
            (i.href = o),
            i.setAttribute("download", t),
            void 0 === i.download && i.setAttribute("target", "_blank"),
            document.body.appendChild(i),
            i.click(),
            setTimeout(function() {
              document.body.removeChild(i), window.URL.revokeObjectURL(o);
            }, 200);
        }
      };
    },
    712: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        o = a(8),
        i = a.n(o),
        s = a(717),
        l = a.n(s),
        c = function(e) {
          var t = e.onPageChangeAction,
            a = e.initialPage,
            n = e.recordsPerPage,
            o = e.totalRecords;
          return r.a.createElement(l.a, {
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
        i = c(a(8)),
        s = c(a(719)),
        l = c(a(720));
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
                s = t.breakLabel,
                c = t.breakClassName,
                u = a.state.selected;
              if (r <= n)
                for (var d = 0; d < r; d++) e.push(a.getPageElement(d));
              else {
                var m = n / 2,
                  p = n - m;
                u > r - n / 2
                  ? (m = n - (p = r - u))
                  : u < n / 2 && (p = n - (m = u));
                var h = void 0,
                  g = void 0,
                  f = void 0,
                  v = function(e) {
                    return a.getPageElement(e);
                  };
                for (h = 0; h < r; h++)
                  (g = h + 1) <= i || g > r - i || (h >= u - m && h <= u + p)
                    ? e.push(v(h))
                    : s &&
                      e[e.length - 1] !== f &&
                      ((f = o.default.createElement(l.default, {
                        key: h,
                        breakLabel: s,
                        breakClassName: c
                      })),
                      e.push(f));
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
                  l = a.activeLinkClassName,
                  c = a.extraAriaContext;
                return o.default.createElement(s.default, {
                  key: e,
                  onClick: this.handlePageSelected.bind(null, e),
                  selected: t === e,
                  pageClassName: n,
                  pageLinkClassName: r,
                  activeClassName: i,
                  activeLinkClassName: l,
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
                  s = e.previousLinkClassName,
                  l = e.previousLabel,
                  c = e.nextLinkClassName,
                  u = e.nextLabel,
                  d = this.state.selected,
                  m = a + (0 === d ? " " + t : ""),
                  p = n + (d === r - 1 ? " " + t : "");
                return o.default.createElement(
                  "ul",
                  { className: i },
                  o.default.createElement(
                    "li",
                    { className: m },
                    o.default.createElement(
                      "a",
                      {
                        onClick: this.handlePreviousPage,
                        className: s,
                        href: this.hrefBuilder(d - 1),
                        tabIndex: "0",
                        role: "button",
                        onKeyPress: this.handlePreviousPage
                      },
                      l
                    )
                  ),
                  this.pagination(),
                  o.default.createElement(
                    "li",
                    { className: p },
                    o.default.createElement(
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
        o = (n = r) && n.__esModule ? n : { default: n };
      t.default = function(e) {
        var t = e.pageClassName,
          a = e.pageLinkClassName,
          n = e.onClick,
          r = e.href,
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
        r = a(0),
        o = (n = r) && n.__esModule ? n : { default: n };
      t.default = function(e) {
        var t = e.breakLabel,
          a = e.breakClassName || "break";
        return o.default.createElement("li", { className: a }, t);
      };
    },
    726: function(e, t, a) {
      "use strict";
      a.d(t, "h", function() {
        return n;
      }),
        a.d(t, "e", function() {
          return r;
        }),
        a.d(t, "c", function() {
          return o;
        }),
        a.d(t, "k", function() {
          return i;
        }),
        a.d(t, "n", function() {
          return s;
        }),
        a.d(t, "g", function() {
          return l;
        }),
        a.d(t, "i", function() {
          return c;
        }),
        a.d(t, "m", function() {
          return u;
        }),
        a.d(t, "j", function() {
          return d;
        }),
        a.d(t, "b", function() {
          return m;
        }),
        a.d(t, "l", function() {
          return p;
        }),
        a.d(t, "a", function() {
          return h;
        }),
        a.d(t, "d", function() {
          return g;
        }),
        a.d(t, "f", function() {
          return f;
        });
      var n = function(e) {
          return { type: "FETCH_PROJECT", id: e };
        },
        r = function(e) {
          return { type: "DELETE_PROJECT", id: e };
        },
        o = function() {
          return { type: "CLEAR_PROJECT" };
        },
        i = function(e) {
          return { type: "NEW_VALUE_COURSE", valueCourse: e };
        },
        s = function(e) {
          return { type: "UPDATE_VALUE_COURSE", valueCourse: e };
        },
        l = function(e) {
          return { type: "DELETE_VALUE_COURSE", id: e };
        },
        c = function(e) {
          return { type: "FETCH_PROJECT_REVENUE", id: e };
        },
        u = function(e) {
          return { type: "PROJECT_REVENUE_PREVIEW_REPORT", data: e };
        },
        d = function(e) {
          return { type: "PROJECT_REVENUE_GET_DISTRIBUTION", data: e };
        },
        m = function() {
          return { type: "CLEAR_PROJECT_REVENUE_PREVIEW_REPORT" };
        },
        p = function(e) {
          return { type: "PROJECT_PARTICIPANT_PREVIEW_REPORT", data: e };
        },
        h = function() {
          return { type: "CLEAR_PROJECT_PARTICIPANT_PREVIEW_REPORT" };
        },
        g = function() {
          return { type: "CLEAR_PROJECT_REVENUE" };
        },
        f = function(e) {
          return { type: "DELETE_REVENUE", id: e };
        };
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
    }
  }
]);
