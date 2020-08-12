(window.webpackJsonp = window.webpackJsonp || []).push([
  [115],
  {
    1499: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(0),
        o = a.n(n),
        s = a(24),
        c = a.n(s),
        r = a(25),
        i = a.n(r),
        l = a(22),
        u = a.n(l),
        d = a(26),
        m = a.n(d),
        f = a(27),
        p = a.n(f),
        v = a(16),
        h = a.n(v),
        E = a(32),
        w = a(4),
        D = a(1409),
        g = (a(1282), a(7)),
        N = a.n(g),
        y = a(107);
      function b(e) {
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
            var o = h()(this).constructor;
            a = Reflect.construct(n, arguments, o);
          } else a = n.apply(this, arguments);
          return p()(this, a);
        };
      }
      N.a.locale("nl");
      var C = D.a.momentLocalizer(N.a),
        M = (function(e) {
          m()(a, e);
          var t = b(a);
          function a(e) {
            var n;
            return (
              c()(this, a),
              ((n = t.call(this, e)).state = {
                events: [],
                selectedDate: e.calendar.date
                  ? e.calendar.date
                  : N()().format("YYYY-MM-DD"),
                selectedView: e.calendar.view
              }),
              (n.onNavigate = n.onNavigate.bind(u()(n))),
              (n.onViewChange = n.onViewChange.bind(u()(n))),
              (n.loadCalendarEvents = n.loadCalendarEvents.bind(u()(n))),
              (n.openItem = n.openItem.bind(u()(n))),
              n
            );
          }
          return (
            i()(a, [
              {
                key: "componentDidMount",
                value: function() {
                  this.loadCalendarEvents(
                    this.state.selectedDate,
                    this.state.selectedView
                  );
                }
              },
              {
                key: "onNavigate",
                value: function(e, t) {
                  this.loadCalendarEvents(e, t);
                }
              },
              {
                key: "onViewChange",
                value: function(e) {
                  this.loadCalendarEvents(this.state.selectedDate, e);
                }
              },
              {
                key: "loadCalendarEvents",
                value: function(e, t) {
                  var a = this,
                    n = N()(e)
                      .startOf(t)
                      .format("YYYY-MM-DD"),
                    o = N()(e)
                      .endOf(t)
                      .format("YYYY-MM-DD");
                  "month" == t &&
                    ((n = N()(e)
                      .startOf(t)
                      .subtract(1, "w")
                      .format("YYYY-MM-DD")),
                    (o = N()(e)
                      .endOf(t)
                      .add(1, "w")
                      .format("YYYY-MM-DD"))),
                    y.a.fetchTasksCalendarEvents(n, o).then(function(n) {
                      var o = [];
                      n.data.data.map(function(e) {
                        var t = N()(e.start),
                          a = N()(e.end);
                        o.push({
                          id: e.id,
                          title: e.noteSummary,
                          start: new Date(t.toDate()),
                          end: new Date(a.toDate())
                        });
                      }),
                        a.setState({
                          events: o,
                          selectedDate: e,
                          selectedView: t
                        }),
                        a.props.setSelectedDate(e),
                        a.props.setSelectedView(t);
                    });
                }
              },
              {
                key: "openItem",
                value: function(e) {
                  var t = e.id;
                  w.f.push("/taak/".concat(t));
                }
              },
              {
                key: "render",
                value: function() {
                  return o.a.createElement(D.a, {
                    date: new Date(this.state.selectedDate),
                    defaultView: this.state.selectedView,
                    endAccessor: "end",
                    events: this.state.events,
                    localizer: C,
                    max: new Date("2018-01-01T23:00:00.000Z"),
                    messages: {
                      allDay: "Gehele dag",
                      previous: "<",
                      next: ">",
                      today: "Vandaag",
                      month: "Maand",
                      week: "Week",
                      day: "Dag",
                      agenda: "Agenda",
                      date: "Datum",
                      time: "Tijd",
                      showMore: function(e) {
                        return "+".concat(e, " meer");
                      }
                    },
                    min: new Date("2018-01-01T07:00:00.000Z"),
                    onNavigate: this.onNavigate,
                    onSelectEvent: this.openItem,
                    onView: this.onViewChange,
                    popup: !0,
                    startAccessor: "start",
                    step: 15,
                    timeslots: 4,
                    views: ["month", "week", "day"]
                  });
                }
              }
            ]),
            a
          );
        })(n.Component),
        k = Object(E.b)(
          function(e) {
            return { calendar: e.calendar };
          },
          function(e) {
            return {
              setSelectedDate: function(t) {
                e(
                  (function(e) {
                    return { type: "SET_SELECTED_DATE", date: e };
                  })(t)
                );
              },
              setSelectedView: function(t) {
                e(
                  (function(e) {
                    return { type: "SET_SELECTED_VIEW", view: e };
                  })(t)
                );
              }
            };
          }
        )(M),
        Y = a(690),
        V = a(691),
        S = a(693),
        T = function(e) {
          return o.a.createElement(
            "div",
            { className: "row margin-10-bottom" },
            o.a.createElement(
              "div",
              { className: "col-md-4" },
              o.a.createElement(
                "div",
                { className: "btn-group", role: "group" },
                o.a.createElement(S.a, {
                  iconName: "glyphicon-arrow-left",
                  onClickAction: w.e.goBack
                }),
                o.a.createElement(S.a, {
                  iconName: "glyphicon-plus",
                  onClickAction: function() {
                    w.f.push("/taak/nieuw");
                  }
                })
              )
            ),
            o.a.createElement(
              "div",
              { className: "col-md-4" },
              o.a.createElement(
                "h3",
                { className: "text-center table-title" },
                "Agenda"
              )
            ),
            o.a.createElement("div", { className: "col-md-4" })
          );
        };
      t.default = function(e) {
        return o.a.createElement(
          Y.a,
          null,
          o.a.createElement(
            V.a,
            null,
            o.a.createElement(T, null),
            o.a.createElement(k, null)
          )
        );
      };
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        s = a(8),
        c = a.n(s),
        r = function(e) {
          var t = e.children,
            a = e.className,
            n = e.onMouseEnter,
            s = e.onMouseLeave;
          return o.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: s
            },
            t
          );
        };
      (r.defaultProps = {
        className: "",
        onMouseEnter: function() {},
        onMouseLeave: function() {}
      }),
        (r.propTypes = {
          className: c.a.string,
          onMouseEnter: c.a.func,
          onMouseLeave: c.a.func
        }),
        (t.a = r);
    },
    691: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        s = a(8),
        c = a.n(s),
        r = function(e) {
          var t = e.className,
            a = e.children;
          return o.a.createElement(
            "div",
            { className: "panel-body ".concat(t) },
            a
          );
        };
      (r.defaultProps = { className: "" }),
        (r.propTypes = { className: c.a.string }),
        (t.a = r);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        o = a.n(n),
        s = a(8),
        c = a.n(s),
        r = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            s = e.title,
            c = e.disabled;
          return o.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: c,
              title: s
            },
            o.a.createElement("span", { className: "glyphicon ".concat(a) })
          );
        };
      (r.defaultProps = {
        buttonClassName: "btn-success btn-sm",
        title: "",
        disabled: !1
      }),
        (r.propTypes = {
          buttonClassName: c.a.string,
          iconName: c.a.string.isRequired,
          onClickAction: c.a.func,
          title: c.a.string,
          disabled: c.a.bool
        }),
        (t.a = r);
    }
  }
]);
