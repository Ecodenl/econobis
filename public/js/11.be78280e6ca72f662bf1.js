(window.webpackJsonp = window.webpackJsonp || []).push([
  [11],
  {
    1056: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(694),
        o = t(695),
        i = t(713);
      a.a = function(e) {
        var a = e.amountOfLoanNeeded,
          t = e.minAmountLoan,
          n = e.maxAmountLoan,
          s = e.amountDefinitive,
          c = e.amountGranted,
          u = e.amountOptioned,
          m = e.amountInteressed,
          d = e.handleInputChange,
          p = a - s;
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement("hr", { style: { margin: "10px 0" } }),
          r.a.createElement("h4", null, "Lening"),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(l.a, {
              label: "Lening nodig",
              name: "amountOfLoanNeeded",
              value: a,
              onChangeAction: d
            }),
            r.a.createElement(o.a, {
              label: "Lening interesse",
              value: Object(i.a)(m),
              className: "form-group col-sm-6"
            })
          ),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(l.a, {
              label: "Min. bedrag lening",
              name: "minAmountLoan",
              value: t,
              onChangeAction: d
            }),
            r.a.createElement(o.a, {
              label: "Lening ingeschreven",
              value: Object(i.a)(u),
              className: "form-group col-sm-6"
            })
          ),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(l.a, {
              label: "Max. bedrag lening",
              name: "maxAmountLoan",
              value: n,
              onChangeAction: d
            }),
            r.a.createElement(o.a, {
              label: "Lening toegekend",
              value: Object(i.a)(c),
              className: "form-group col-sm-6"
            })
          ),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement("div", { className: "form-group col-md-6" }),
            r.a.createElement(o.a, {
              label: "Lening opgehaald",
              value: Object(i.a)(s),
              className: "form-group col-sm-6"
            })
          ),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement("div", { className: "form-group col-md-6" }),
            r.a.createElement(o.a, {
              label: "Lening uit te geven",
              value: Object(i.a)(p),
              className: "form-group col-sm-6"
            })
          )
        );
      };
    },
    1057: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(694),
        o = t(700),
        i = t(713),
        s = t(695);
      a.a = function(e) {
        var a = e.participationWorth,
          t = e.totalParticipations,
          n = e.participationsDefinitive,
          c = e.participationsGranted,
          u = e.participationsOptioned,
          m = e.participationsInteressed,
          d = e.powerKwAvailable,
          p = e.minParticipations,
          f = e.maxParticipations,
          h = e.isParticipationTransferable,
          g = e.valueCourses,
          v = e.handleInputChange,
          b =
            g &&
            g.find(function(e) {
              return e.active;
            }),
          E = t - n;
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement("hr", { style: { margin: "10px 0" } }),
          r.a.createElement(
            "h4",
            null,
            "Obligatie, Kapitaal of Postcoderoos kapitaal"
          ),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(l.a, {
              type: "number",
              label: "Nominale waarde obligatie",
              name: "participationWorth",
              value: a,
              onChangeAction: v
            }),
            r.a.createElement(s.a, {
              label: "Obligaties interesse",
              value: m || 0,
              className: "form-group col-sm-6"
            })
          ),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(s.a, {
              label: "Huidige hoofdsom",
              value: b ? Object(i.a)(b.bookWorth) : Object(i.a)(0),
              className: "form-group col-sm-6"
            }),
            r.a.createElement(s.a, {
              label: "Obligaties ingeschreven",
              value: u || 0,
              className: "form-group col-sm-6"
            })
          ),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(s.a, {
              label: "Huidige overdrachtswaarde",
              value: b ? Object(i.a)(b.transferWorth) : Object(i.a)(0),
              className: "form-group col-sm-6"
            }),
            r.a.createElement(s.a, {
              label: "Obligaties toegekend",
              value: c || 0,
              className: "form-group col-sm-6"
            })
          ),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(l.a, {
              type: "number",
              label: "Aantal obligaties nodig",
              name: "totalParticipations",
              value: t,
              onChangeAction: v
            }),
            r.a.createElement(s.a, {
              label: "Uitgegeven obligaties",
              value: n || 0,
              className: "form-group col-sm-6"
            })
          ),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(l.a, {
              type: "number",
              label: "Min. aantal obligaties p/p",
              name: "minParticipations",
              value: p,
              onChangeAction: v
            }),
            r.a.createElement(s.a, {
              label: "Uit te geven obligaties",
              value: E || 0,
              className: "form-group col-sm-6"
            })
          ),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(l.a, {
              type: "number",
              label: "Max. aantal obligaties p/p",
              name: "maxParticipations",
              value: f,
              onChangeAction: v
            }),
            r.a.createElement(l.a, {
              type: "number",
              label: "Opgesteld vermogen kWh",
              name: "powerKwAvailable",
              value: d,
              onChangeAction: v
            })
          ),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(o.a, {
              label: "Obligaties overdraagbaar",
              name: "isParticipationTransferable",
              value: h,
              onChangeAction: v
            })
          )
        );
      };
    },
    1058: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(694),
        o = t(700),
        i = t(713),
        s = t(695);
      a.a = function(e) {
        var a = e.participationWorth,
          t = e.totalParticipations,
          n = e.participationsDefinitive,
          c = e.participationsGranted,
          u = e.participationsOptioned,
          m = e.participationsInteressed,
          d = e.powerKwAvailable,
          p = e.minParticipations,
          f = e.maxParticipations,
          h = e.isParticipationTransferable,
          g = e.valueCourses,
          v = e.handleInputChange,
          b =
            g &&
            g.find(function(e) {
              return e.active;
            }),
          E = t - n;
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement("hr", { style: { margin: "10px 0" } }),
          r.a.createElement(
            "h4",
            null,
            "Participatie, Kapitaal of Postcoderoos kapitaal"
          ),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(l.a, {
              type: "number",
              label: "Nominale waarde participatie",
              name: "participationWorth",
              value: a,
              onChangeAction: v
            }),
            r.a.createElement(s.a, {
              label: "Participaties interesse",
              value: m || 0,
              className: "form-group col-sm-6"
            })
          ),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(s.a, {
              label: "Huidige boekwaarde",
              value: b ? Object(i.a)(b.bookWorth) : Object(i.a)(0),
              className: "form-group col-sm-6"
            }),
            r.a.createElement(s.a, {
              label: "Participaties ingeschreven",
              value: u || 0,
              className: "form-group col-sm-6"
            })
          ),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(s.a, {
              label: "Huidige overdrachtswaarde",
              value: b ? Object(i.a)(b.transferWorth) : Object(i.a)(0),
              className: "form-group col-sm-6"
            }),
            r.a.createElement(s.a, {
              label: "Participaties toegekend",
              value: c || 0,
              className: "form-group col-sm-6"
            })
          ),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(l.a, {
              type: "number",
              label: "Aantal participaties nodig",
              name: "totalParticipations",
              value: t,
              onChangeAction: v
            }),
            r.a.createElement(s.a, {
              label: "Uitgegeven participaties",
              value: n || 0,
              className: "form-group col-sm-6"
            })
          ),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(l.a, {
              type: "number",
              label: "Min. aantal participaties p/p",
              name: "minParticipations",
              value: p,
              onChangeAction: v
            }),
            r.a.createElement(s.a, {
              label: "Uit te geven participaties",
              value: E || 0,
              className: "form-group col-sm-6"
            })
          ),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(l.a, {
              type: "number",
              label: "Max. aantal participaties p/p",
              name: "maxParticipations",
              value: f,
              onChangeAction: v
            }),
            r.a.createElement(l.a, {
              type: "number",
              label: "Opgesteld vermogen kWh",
              name: "powerKwAvailable",
              value: d,
              onChangeAction: v
            })
          ),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(o.a, {
              label: "Participaties overdraagbaar",
              name: "isParticipationTransferable",
              value: h,
              onChangeAction: v
            })
          )
        );
      };
    },
    1059: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(694);
      a.a = function(e) {
        var a = e.postalcodeLink,
          t = e.taxReferral,
          n = e.eanManager,
          o = e.ean,
          i = e.warrantyOrigin,
          s = e.eanSupply,
          c = e.handleInputChange;
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement("hr", { style: { margin: "10px 0" } }),
          r.a.createElement("h4", null, "Postcoderoos kapitaal"),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(l.a, {
              label: "Postcoderoos",
              name: "postalcodeLink",
              value: a,
              onChangeAction: c
            }),
            r.a.createElement(l.a, {
              label: "Aanwijzing Belastingdienst",
              name: "taxReferral",
              value: t,
              onChangeAction: c
            })
          ),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(l.a, {
              label: "EAN Adres installatie",
              name: "ean",
              value: o,
              onChangeAction: c
            }),
            r.a.createElement(l.a, {
              label: "EAN Netbeheer",
              name: "eanManager",
              value: n,
              onChangeAction: c
            })
          ),
          r.a.createElement(
            "div",
            { className: "row" },
            r.a.createElement(l.a, {
              label: "EAN afnemer",
              name: "eanSupply",
              value: s,
              onChangeAction: c
            }),
            r.a.createElement(l.a, {
              label: "Garantie van oorsprong (Certiq)",
              name: "warrantyOrigin",
              value: i,
              onChangeAction: c
            })
          )
        );
      };
    },
    690: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        o = t.n(l),
        i = function(e) {
          var a = e.children,
            t = e.className,
            n = e.onMouseEnter,
            l = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(t),
              onMouseEnter: n,
              onMouseLeave: l
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
          className: o.a.string,
          onMouseEnter: o.a.func,
          onMouseLeave: o.a.func
        }),
        (a.a = i);
    },
    691: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        o = t.n(l),
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
        (i.propTypes = { className: o.a.string }),
        (a.a = i);
    },
    692: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        o = t.n(l),
        i = function(e) {
          var a = e.buttonClassName,
            t = e.buttonText,
            n = e.onClickAction,
            l = e.type,
            o = e.value,
            i = e.loading,
            s = e.loadText,
            c = e.disabled;
          return i
            ? r.a.createElement(
                "button",
                {
                  type: l,
                  className: "btn btn-sm btn-loading ".concat(a),
                  value: o,
                  disabled: i
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
                  type: l,
                  className: "btn btn-sm ".concat(a),
                  onClick: n,
                  value: o,
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
          buttonClassName: o.a.string,
          buttonText: o.a.string.isRequired,
          onClickAction: o.a.func,
          type: o.a.string,
          value: o.a.string,
          loading: o.a.bool,
          loadText: o.a.string,
          disabled: o.a.bool
        }),
        (a.a = i);
    },
    693: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        o = t.n(l),
        i = function(e) {
          var a = e.buttonClassName,
            t = e.iconName,
            n = e.onClickAction,
            l = e.title,
            o = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(a),
              onClick: n,
              disabled: o,
              title: l
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
          buttonClassName: o.a.string,
          iconName: o.a.string.isRequired,
          onClickAction: o.a.func,
          title: o.a.string,
          disabled: o.a.bool
        }),
        (a.a = i);
    },
    694: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        o = t.n(l),
        i = function(e) {
          var a = e.label,
            t = e.type,
            n = e.className,
            l = e.size,
            o = e.id,
            i = e.placeholder,
            s = e.name,
            c = e.value,
            u = e.onClickAction,
            m = e.onChangeAction,
            d = e.onBlurAction,
            p = e.required,
            f = e.readOnly,
            h = e.maxLength,
            g = e.error,
            v = e.min,
            b = e.max,
            E = e.step,
            N = e.errorMessage,
            y = e.divSize,
            k = e.divClassName,
            C = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(y, " ").concat(k) },
            r.a.createElement(
              "label",
              { htmlFor: o, className: "col-sm-6 ".concat(p) },
              a
            ),
            r.a.createElement(
              "div",
              { className: "".concat(l) },
              r.a.createElement("input", {
                type: t,
                className:
                  "form-control input-sm ".concat(n) + (g ? "has-error" : ""),
                id: o,
                placeholder: i,
                name: s,
                value: c,
                onClick: u,
                onChange: m,
                onBlur: d,
                readOnly: f,
                maxLength: h,
                min: v,
                max: b,
                autoComplete: C,
                step: E
              })
            ),
            g &&
              r.a.createElement(
                "div",
                { className: "col-sm-offset-6 col-sm-6" },
                r.a.createElement(
                  "span",
                  { className: "has-error-message" },
                  " ",
                  N
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
          label: o.a.oneOfType([o.a.string, o.a.object]).isRequired,
          type: o.a.string,
          className: o.a.string,
          divClassName: o.a.string,
          size: o.a.string,
          divSize: o.a.string,
          id: o.a.string,
          placeholder: o.a.string,
          name: o.a.string.isRequired,
          value: o.a.oneOfType([o.a.string, o.a.number]),
          onClickAction: o.a.func,
          onChangeAction: o.a.func,
          onBlurAction: o.a.func,
          required: o.a.string,
          readOnly: o.a.bool,
          maxLength: o.a.string,
          error: o.a.bool,
          min: o.a.string,
          max: o.a.string,
          step: o.a.string,
          errorMessage: o.a.string,
          autoComplete: o.a.string
        }),
        (a.a = i);
    },
    695: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(4),
        o = t(8),
        i = t.n(o),
        s = function(e) {
          var a = e.label,
            t = e.className,
            n = e.id,
            o = e.value,
            i = e.link,
            s = e.hidden;
          return i.length > 0
            ? r.a.createElement(
                "div",
                { className: t, style: s ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  a
                ),
                r.a.createElement(
                  "div",
                  { className: "col-sm-6", id: n, onClick: null },
                  r.a.createElement(
                    l.b,
                    { to: i, className: "link-underline" },
                    o
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: t, style: s ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  a
                ),
                r.a.createElement("div", { className: "col-sm-6", id: n }, o)
              );
        };
      (s.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (s.propTypes = {
          label: i.a.oneOfType([i.a.string, i.a.object]).isRequired,
          className: i.a.string,
          id: i.a.string,
          value: i.a.oneOfType([i.a.string, i.a.number]),
          link: i.a.string,
          hidden: i.a.bool
        }),
        (a.a = s);
    },
    696: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        o = t.n(l),
        i = function(e) {
          var a = e.label,
            t = e.className,
            n = e.size,
            l = e.id,
            o = e.name,
            i = e.value,
            s = e.options,
            c = e.onChangeAction,
            u = e.onBlurAction,
            m = e.required,
            d = e.error,
            p = e.errorMessage,
            f = e.optionValue,
            h = e.optionName,
            g = e.readOnly,
            v = e.placeholder,
            b = e.divClassName,
            E = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(b) },
            r.a.createElement(
              "label",
              { htmlFor: l, className: "col-sm-6 ".concat(m) },
              a
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-6" },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(t) + (d && " has-error"),
                  id: l,
                  name: o,
                  value: i,
                  onChange: c,
                  onBlur: u,
                  readOnly: g
                },
                E && r.a.createElement("option", { value: "" }, v),
                s.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[f], value: e[f] },
                    e[h]
                  );
                })
              )
            ),
            d &&
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
          label: o.a.string.isRequired,
          className: o.a.string,
          size: o.a.string,
          id: o.a.string,
          name: o.a.string.isRequired,
          options: o.a.array,
          value: o.a.oneOfType([o.a.string, o.a.number]),
          onChangeAction: o.a.func,
          onBlurAction: o.a.func,
          required: o.a.string,
          readOnly: o.a.bool,
          error: o.a.bool,
          errorMessage: o.a.string,
          emptyOption: o.a.bool,
          optionValue: o.a.string,
          optionName: o.a.string,
          placeholder: o.a.string
        }),
        (a.a = i);
    },
    699: function(e, a, t) {
      "use strict";
      var n = t(24),
        r = t.n(n),
        l = t(25),
        o = t.n(l),
        i = t(22),
        s = t.n(i),
        c = t(26),
        u = t.n(c),
        m = t(27),
        d = t.n(m),
        p = t(16),
        f = t.n(p),
        h = t(6),
        g = t.n(h),
        v = t(0),
        b = t.n(v),
        E = t(8),
        N = t.n(E),
        y = t(707),
        k = t.n(y),
        C = t(708),
        O = t.n(C),
        A = t(7),
        w = t.n(A);
      function P(e) {
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
            n = f()(e);
          if (a) {
            var r = f()(this).constructor;
            t = Reflect.construct(n, arguments, r);
          } else t = n.apply(this, arguments);
          return d()(this, t);
        };
      }
      w.a.locale("nl");
      var T = (function(e) {
        u()(t, e);
        var a = P(t);
        function t(e) {
          var n;
          return (
            r()(this, t),
            (n = a.call(this, e)),
            g()(s()(n), "validateDate", function(e) {
              var a = w()(e.target.value, "DD-MM-YYYY", !0),
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
            g()(s()(n), "onDateChange", function(e) {
              var a = e ? w()(e).format("Y-MM-DD") : "",
                t = !1;
              a &&
                n.props.disabledBefore &&
                w()(a).isBefore(n.props.disabledBefore) &&
                (t = !0),
                a &&
                  n.props.disabledAfter &&
                  w()(a).isAfter(n.props.disabledAfter) &&
                  (t = !0),
                n.setState({ errorDateFormat: t }),
                !t && n.props.onChangeAction(a, n.props.name);
            }),
            (n.state = { errorDateFormat: !1 }),
            n
          );
        }
        return (
          o()(t, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  a = e.label,
                  t = e.className,
                  n = e.size,
                  r = e.divSize,
                  l = e.id,
                  o = e.value,
                  i = e.required,
                  s = e.readOnly,
                  c = e.name,
                  u = e.error,
                  m = e.errorMessage,
                  d = e.disabledBefore,
                  p = e.disabledAfter,
                  f = o ? w()(o).format("L") : "",
                  h = {};
                return (
                  d && (h.before = new Date(d)),
                  p && (h.after = new Date(p)),
                  b.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    b.a.createElement(
                      "div",
                      null,
                      b.a.createElement(
                        "label",
                        { htmlFor: l, className: "col-sm-6 ".concat(i) },
                        a
                      )
                    ),
                    b.a.createElement(
                      "div",
                      { className: "".concat(n) },
                      b.a.createElement(k.a, {
                        id: l,
                        value: f,
                        formatDate: C.formatDate,
                        parseDate: C.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: O.a,
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
                          readOnly: s,
                          disabled: s
                        },
                        required: i,
                        readOnly: s,
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
                          m
                        )
                      )
                  )
                );
              }
            }
          ]),
          t
        );
      })(v.Component);
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
          label: N.a.string.isRequired,
          type: N.a.string,
          className: N.a.string,
          size: N.a.string,
          divSize: N.a.string,
          id: N.a.string,
          name: N.a.string,
          value: N.a.oneOfType([N.a.string, N.a.object]),
          onChangeAction: N.a.func,
          required: N.a.string,
          readOnly: N.a.bool,
          error: N.a.bool,
          errorMessage: N.a.string,
          disabledBefore: N.a.string,
          disabledAfter: N.a.string
        }),
        (a.a = T);
    },
    700: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        o = t.n(l),
        i = t(703),
        s = t.n(i),
        c = function(e) {
          var a = e.label,
            t = e.size,
            n = e.id,
            l = e.name,
            o = e.value,
            i = e.onChangeAction,
            c = e.required,
            u = e.divSize,
            m = e.className,
            d = e.disabled;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(u, " ").concat(m) },
            r.a.createElement(
              "div",
              null,
              r.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(c) },
                a
              )
            ),
            r.a.createElement(
              "div",
              { className: "".concat(t) },
              r.a.createElement(s.a, {
                id: n,
                name: l,
                onChange: i,
                checked: o,
                disabled: d
              })
            )
          );
        };
      (c.defaultProps = {
        className: "",
        size: "col-sm-6",
        divSize: "col-sm-6",
        required: "",
        disabled: !1,
        value: null
      }),
        (c.propTypes = {
          label: o.a.string.isRequired,
          type: o.a.string,
          size: o.a.string,
          divSize: o.a.string,
          id: o.a.string,
          name: o.a.string.isRequired,
          value: o.a.bool,
          onChangeAction: o.a.func,
          required: o.a.string,
          disabled: o.a.bool
        }),
        (a.a = c);
    },
    702: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        o = t.n(l),
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
        (i.propTypes = { className: o.a.string }),
        (a.a = i);
    },
    703: function(e, a, t) {
      "use strict";
      Object.defineProperty(a, "__esModule", { value: !0 });
      var n =
          Object.assign ||
          function(e) {
            for (var a = 1; a < arguments.length; a++) {
              var t = arguments[a];
              for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }
            return e;
          },
        r = (function() {
          function e(e, a) {
            for (var t = 0; t < a.length; t++) {
              var n = a[t];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(a, t, n) {
            return t && e(a.prototype, t), n && e(a, n), a;
          };
        })(),
        l = t(0),
        o = d(l),
        i = d(t(710)),
        s = d(t(8)),
        c = d(t(704)),
        u = d(t(705)),
        m = t(706);
      function d(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var p = (function(e) {
        function a(e) {
          !(function(e, a) {
            if (!(e instanceof a))
              throw new TypeError("Cannot call a class as a function");
          })(this, a);
          var t = (function(e, a) {
            if (!e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return !a || ("object" != typeof a && "function" != typeof a)
              ? e
              : a;
          })(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, e));
          return (
            (t.handleClick = t.handleClick.bind(t)),
            (t.handleTouchStart = t.handleTouchStart.bind(t)),
            (t.handleTouchMove = t.handleTouchMove.bind(t)),
            (t.handleTouchEnd = t.handleTouchEnd.bind(t)),
            (t.handleFocus = t.handleFocus.bind(t)),
            (t.handleBlur = t.handleBlur.bind(t)),
            (t.previouslyChecked = !(!e.checked && !e.defaultChecked)),
            (t.state = {
              checked: !(!e.checked && !e.defaultChecked),
              hasFocus: !1
            }),
            t
          );
        }
        return (
          (function(e, a) {
            if ("function" != typeof a && null !== a)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof a
              );
            (e.prototype = Object.create(a && a.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
              a &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, a)
                  : (e.__proto__ = a));
          })(a, e),
          r(a, [
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
                var a = this.input;
                if (e.target !== a && !this.moved)
                  return (
                    (this.previouslyChecked = a.checked),
                    e.preventDefault(),
                    a.focus(),
                    void a.click()
                  );
                var t = this.props.hasOwnProperty("checked")
                  ? this.props.checked
                  : a.checked;
                this.setState({ checked: t });
              }
            },
            {
              key: "handleTouchStart",
              value: function(e) {
                (this.startX = (0, m.pointerCoord)(e).x), (this.activated = !0);
              }
            },
            {
              key: "handleTouchMove",
              value: function(e) {
                if (this.activated && ((this.moved = !0), this.startX)) {
                  var a = (0, m.pointerCoord)(e).x;
                  this.state.checked && a + 15 < this.startX
                    ? (this.setState({ checked: !1 }),
                      (this.startX = a),
                      (this.activated = !0))
                    : a - 15 > this.startX &&
                      (this.setState({ checked: !0 }),
                      (this.startX = a),
                      (this.activated = a < this.startX + 5));
                }
              }
            },
            {
              key: "handleTouchEnd",
              value: function(e) {
                if (this.moved) {
                  var a = this.input;
                  if ((e.preventDefault(), this.startX)) {
                    var t = (0, m.pointerCoord)(e).x;
                    !0 === this.previouslyChecked && this.startX + 4 > t
                      ? this.previouslyChecked !== this.state.checked &&
                        (this.setState({ checked: !1 }),
                        (this.previouslyChecked = this.state.checked),
                        a.click())
                      : this.startX - 4 < t &&
                        this.previouslyChecked !== this.state.checked &&
                        (this.setState({ checked: !0 }),
                        (this.previouslyChecked = this.state.checked),
                        a.click()),
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
                var a = this.props.onFocus;
                a && a(e), this.setState({ hasFocus: !0 });
              }
            },
            {
              key: "handleBlur",
              value: function(e) {
                var a = this.props.onBlur;
                a && a(e), this.setState({ hasFocus: !1 });
              }
            },
            {
              key: "getIcon",
              value: function(e) {
                var t = this.props.icons;
                return t
                  ? void 0 === t[e]
                    ? a.defaultProps.icons[e]
                    : t[e]
                  : null;
              }
            },
            {
              key: "render",
              value: function() {
                var e = this,
                  a = this.props,
                  t = a.className,
                  r =
                    (a.icons,
                    (function(e, a) {
                      var t = {};
                      for (var n in e)
                        a.indexOf(n) >= 0 ||
                          (Object.prototype.hasOwnProperty.call(e, n) &&
                            (t[n] = e[n]));
                      return t;
                    })(a, ["className", "icons"])),
                  l = (0, i.default)(
                    "react-toggle",
                    {
                      "react-toggle--checked": this.state.checked,
                      "react-toggle--focus": this.state.hasFocus,
                      "react-toggle--disabled": this.props.disabled
                    },
                    t
                  );
                return o.default.createElement(
                  "div",
                  {
                    className: l,
                    onClick: this.handleClick,
                    onTouchStart: this.handleTouchStart,
                    onTouchMove: this.handleTouchMove,
                    onTouchEnd: this.handleTouchEnd
                  },
                  o.default.createElement(
                    "div",
                    { className: "react-toggle-track" },
                    o.default.createElement(
                      "div",
                      { className: "react-toggle-track-check" },
                      this.getIcon("checked")
                    ),
                    o.default.createElement(
                      "div",
                      { className: "react-toggle-track-x" },
                      this.getIcon("unchecked")
                    )
                  ),
                  o.default.createElement("div", {
                    className: "react-toggle-thumb"
                  }),
                  o.default.createElement(
                    "input",
                    n({}, r, {
                      ref: function(a) {
                        e.input = a;
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
          a
        );
      })(l.PureComponent);
      (a.default = p),
        (p.displayName = "Toggle"),
        (p.defaultProps = {
          icons: {
            checked: o.default.createElement(c.default, null),
            unchecked: o.default.createElement(u.default, null)
          }
        }),
        (p.propTypes = {
          checked: s.default.bool,
          disabled: s.default.bool,
          defaultChecked: s.default.bool,
          onChange: s.default.func,
          onFocus: s.default.func,
          onBlur: s.default.func,
          className: s.default.string,
          name: s.default.string,
          value: s.default.string,
          id: s.default.string,
          "aria-labelledby": s.default.string,
          "aria-label": s.default.string,
          icons: s.default.oneOfType([
            s.default.bool,
            s.default.shape({
              checked: s.default.node,
              unchecked: s.default.node
            })
          ])
        });
    },
    704: function(e, a, t) {
      "use strict";
      Object.defineProperty(a, "__esModule", { value: !0 });
      var n,
        r = t(0),
        l = (n = r) && n.__esModule ? n : { default: n };
      a.default = function() {
        return l.default.createElement(
          "svg",
          { width: "14", height: "11", viewBox: "0 0 14 11" },
          l.default.createElement("title", null, "switch-check"),
          l.default.createElement("path", {
            d:
              "M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",
            fill: "#fff",
            fillRule: "evenodd"
          })
        );
      };
    },
    705: function(e, a, t) {
      "use strict";
      Object.defineProperty(a, "__esModule", { value: !0 });
      var n,
        r = t(0),
        l = (n = r) && n.__esModule ? n : { default: n };
      a.default = function() {
        return l.default.createElement(
          "svg",
          { width: "10", height: "10", viewBox: "0 0 10 10" },
          l.default.createElement("title", null, "switch-x"),
          l.default.createElement("path", {
            d:
              "M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",
            fill: "#fff",
            fillRule: "evenodd"
          })
        );
      };
    },
    706: function(e, a, t) {
      "use strict";
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (a.pointerCoord = function(e) {
          if (e) {
            var a = e.changedTouches;
            if (a && a.length > 0) {
              var t = a[0];
              return { x: t.clientX, y: t.clientY };
            }
            var n = e.pageX;
            if (void 0 !== n) return { x: n, y: e.pageY };
          }
          return { x: 0, y: 0 };
        });
    },
    713: function(e, a, t) {
      "use strict";
      a.a = function(e) {
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
    723: function(e, a, t) {
      "use strict";
      var n = t(0),
        r = t.n(n),
        l = t(8),
        o = t.n(l),
        i = t(714),
        s =
          (t(715),
          function(e) {
            var a = e.label,
              t = (e.className, e.size),
              n = e.id,
              l = e.name,
              o = e.value,
              s = e.options,
              c = e.optionId,
              u = e.optionName,
              m = e.onChangeAction,
              d = e.required,
              p = e.multi,
              f = e.error;
            return r.a.createElement(
              "div",
              { className: "form-group col-sm-6" },
              r.a.createElement(
                "label",
                { htmlFor: n, className: "col-sm-6 ".concat(d) },
                a
              ),
              r.a.createElement(
                "div",
                { className: "".concat(t) },
                r.a.createElement(i.a, {
                  id: n,
                  name: l,
                  value: o,
                  onChange: m,
                  options: s,
                  valueKey: c,
                  labelKey: u,
                  placeholder: "",
                  noResultsText: "Geen resultaat gevonden",
                  multi: p,
                  simpleValue: !0,
                  removeSelected: !0,
                  className: f ? " has-error" : ""
                })
              )
            );
          });
      (s.defaultProps = {
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
        (s.propTypes = {
          label: o.a.string.isRequired,
          className: o.a.string,
          size: o.a.string,
          id: o.a.string,
          name: o.a.string.isRequired,
          options: o.a.array,
          optionId: o.a.string,
          optionName: o.a.string,
          value: o.a.string,
          onChangeAction: o.a.func,
          onBlurAction: o.a.func,
          required: o.a.string,
          readOnly: o.a.bool,
          error: o.a.bool,
          multi: o.a.bool
        }),
        (a.a = s);
    }
  }
]);
