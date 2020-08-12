(window.webpackJsonp = window.webpackJsonp || []).push([
  [33],
  {
    1427: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(24),
        r = a.n(n),
        s = a(25),
        l = a.n(s),
        o = a(26),
        i = a.n(o),
        c = a(27),
        u = a.n(c),
        m = a(16),
        d = a.n(m),
        f = a(0),
        h = a.n(f),
        p = a(32),
        g = function(e) {
          return { type: "FETCH_HOUSING_FILE_DETAILS", payload: e };
        },
        v = a(22),
        b = a.n(v),
        y = a(6),
        E = a.n(y),
        N = a(4),
        k = a(693),
        w = a(100),
        D = Object(p.b)(null, function(e) {
          return {
            deleteHousingFile: function(t) {
              e(
                (function(e) {
                  return { type: "DELETE_HOUSING_FILE", id: e };
                })(t)
              );
            }
          };
        })(function(e) {
          return h.a.createElement(
            w.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return e.deleteHousingFile(e.id), void e.closeDeleteItemModal();
              },
              title: "Verwijderen"
            },
            h.a.createElement(
              "p",
              null,
              "Verwijder woningdossier: ",
              h.a.createElement(
                "strong",
                null,
                " ",
                "".concat(e.fullStreet),
                " "
              )
            )
          );
        }),
        O = a(690),
        C = a(691);
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
          var a,
            n = d()(e);
          if (t) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var S = (function(e) {
          i()(a, e);
          var t = T(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(b()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              (n.state = { showDelete: !1 }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.props.housingFileAddress,
                    t = void 0 === e ? {} : e,
                    a = "".concat(t.street || "", " ").concat(t.number || "");
                  return h.a.createElement(
                    "div",
                    { className: "row" },
                    h.a.createElement(
                      "div",
                      { className: "col-sm-12" },
                      h.a.createElement(
                        O.a,
                        null,
                        h.a.createElement(
                          C.a,
                          { className: "panel-small" },
                          h.a.createElement(
                            "div",
                            { className: "col-md-2" },
                            h.a.createElement(
                              "div",
                              { className: "btn-group", role: "group" },
                              h.a.createElement(k.a, {
                                iconName: "glyphicon-arrow-left",
                                onClickAction: N.e.goBack
                              }),
                              this.props.permissions.manageHousingFile &&
                                h.a.createElement(k.a, {
                                  iconName: "glyphicon-trash",
                                  onClickAction: this.toggleDelete
                                })
                            )
                          ),
                          h.a.createElement(
                            "div",
                            { className: "col-md-8" },
                            h.a.createElement(
                              "h4",
                              { className: "text-center" },
                              "Woningdossier voor: ".concat(a)
                            )
                          ),
                          h.a.createElement("div", { className: "col-md-2" })
                        )
                      )
                    ),
                    this.state.showDelete &&
                      h.a.createElement(D, {
                        closeDeleteItemModal: this.toggleDelete,
                        fullStreet: a,
                        id: this.props.id
                      })
                  );
                }
              }
            ]),
            a
          );
        })(f.Component),
        j = Object(p.b)(function(e) {
          return {
            housingFileAddress: e.housingFileDetails.address,
            id: e.housingFileDetails.id,
            permissions: e.meDetails.permissions
          };
        })(S),
        L = a(198),
        A = a(7),
        F = a.n(A),
        P = a(111),
        M = a(694),
        R = a(696),
        I = a(692),
        x = a(700);
      function B(e, t) {
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
      function _(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? B(Object(a), !0).forEach(function(t) {
                E()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : B(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function z(e) {
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
            n = d()(e);
          if (t) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      F.a.locale("nl");
      var q = (function(e) {
          i()(a, e);
          var t = z(a);
          function a(e) {
            var n;
            r()(this, a),
              (n = t.call(this, e)),
              E()(b()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  _(
                    _({}, n.state),
                    {},
                    {
                      housingFile: _(
                        _({}, n.state.housingFile),
                        {},
                        E()({}, r, a)
                      )
                    }
                  )
                );
              }),
              E()(b()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.housingFile;
                P.a.updateHousingFile(t).then(function() {
                  n.props.fetchHousingFileDetails(t.id), n.props.switchToView();
                });
              });
            var s = e.housingFileDetails,
              l = s.id,
              o = s.address,
              i = s.fullAddress,
              c = s.buildingType,
              u = s.buildYear,
              m = s.surface,
              d = s.roofType,
              f = s.energyLabel,
              h = s.floors,
              p = s.energyLabelStatus,
              g = s.isMonument;
            return (
              (n.state = {
                housingFile: {
                  id: l,
                  fullName: o.contact.fullName,
                  addressId: o.id,
                  fullAddress: i,
                  buildingTypeId: c ? c.id : "",
                  buildYear: u || "",
                  surface: m || "",
                  roofTypeId: d ? d.id : "",
                  energyLabelId: f ? f.id : "",
                  floors: h || "",
                  energyLabelStatusId: p ? p.id : "",
                  isMonument: g || !1
                }
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.housingFile,
                    t = e.fullAddress,
                    a = e.fullName,
                    n = e.buildingTypeId,
                    r = e.buildYear,
                    s = e.surface,
                    l = e.roofTypeId,
                    o = e.energyLabelId,
                    i = e.floors,
                    c = e.energyLabelStatusId,
                    u = e.isMonument;
                  this.props.contactDetails.addresses;
                  return h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(M.a, {
                        label: "Contact",
                        name: "fullName",
                        value: a,
                        onChangeAction: function() {},
                        readOnly: !0
                      }),
                      h.a.createElement(M.a, {
                        label: "Contact",
                        name: "fullAddress",
                        value: t,
                        onChangeAction: function() {},
                        readOnly: !0
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(R.a, {
                        label: "Woningtype",
                        size: "col-sm-6",
                        name: "buildingTypeId",
                        value: n,
                        options: this.props.buildingTypes,
                        onChangeAction: this.handleInputChange
                      }),
                      h.a.createElement(M.a, {
                        label: "Bouwjaar",
                        name: "buildYear",
                        value: r,
                        min: 1901,
                        max: 3e3,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(M.a, {
                        label: "Gebruiksoppervlakte",
                        name: "surface",
                        value: s,
                        min: 0,
                        onChangeAction: this.handleInputChange
                      }),
                      h.a.createElement(R.a, {
                        label: "Daktype",
                        size: "col-sm-6",
                        name: "roofTypeId",
                        value: l,
                        options: this.props.roofTypes,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(R.a, {
                        label: "Energielabel",
                        size: "col-sm-6",
                        name: "energyLabelId",
                        value: o,
                        options: this.props.energyLabels,
                        onChangeAction: this.handleInputChange
                      }),
                      h.a.createElement(M.a, {
                        label: "Aantal bouwlagen",
                        name: "floors",
                        value: i,
                        min: 0,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "row" },
                      h.a.createElement(R.a, {
                        label: "Status energielabel",
                        size: "col-sm-6",
                        name: "energyLabelStatusId",
                        value: c,
                        options: this.props.energyLabelStatus,
                        onChangeAction: this.handleInputChange
                      }),
                      h.a.createElement(x.a, {
                        label: "Monument",
                        name: "isMonument",
                        value: u,
                        onChangeAction: this.handleInputChange
                      })
                    ),
                    h.a.createElement(
                      "div",
                      { className: "panel-footer" },
                      h.a.createElement(
                        "div",
                        { className: "pull-right btn-group", role: "group" },
                        h.a.createElement(I.a, {
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
        })(f.Component),
        H = Object(p.b)(
          function(e) {
            return {
              housingFileDetails: e.housingFileDetails,
              buildingTypes: e.systemData.buildingTypes,
              roofTypes: e.systemData.roofTypes,
              energyLabels: e.systemData.energyLabels,
              energyLabelStatus: e.systemData.energyLabelStatus,
              contactDetails: e.contactDetails
            };
          },
          function(e) {
            return {
              fetchHousingFileDetails: function(t) {
                e(g(t));
              }
            };
          }
        )(q),
        V = a(695);
      F.a.locale("nl");
      var G = Object(p.b)(function(e) {
        return { housingFileDetails: e.housingFileDetails };
      })(function(e) {
        var t = e.housingFileDetails,
          a = t.address,
          n = t.fullAddress,
          r = t.buildingType,
          s = t.buildYear,
          l = t.surface,
          o = t.roofType,
          i = t.energyLabel,
          c = t.floors,
          u = t.energyLabelStatus,
          m = t.isMonument;
        return h.a.createElement(
          "div",
          { onClick: e.switchToEdit },
          h.a.createElement(
            "div",
            { className: "row" },
            h.a.createElement(V.a, {
              label: "Contact",
              value: a && a.contact.fullName,
              link: a ? "contact/" + a.contact.id : ""
            }),
            h.a.createElement(V.a, { label: "Adres", value: n && n })
          ),
          h.a.createElement(
            "div",
            { className: "row" },
            h.a.createElement(V.a, { label: "Woningtype", value: r && r.name }),
            h.a.createElement(V.a, { label: "Bouwjaar", value: s && s })
          ),
          h.a.createElement(
            "div",
            { className: "row" },
            h.a.createElement(V.a, {
              label: "Gebruiksoppervlakte",
              value: l && l
            }),
            h.a.createElement(V.a, { label: "Daktype", value: o && o.name })
          ),
          h.a.createElement(
            "div",
            { className: "row" },
            h.a.createElement(V.a, {
              label: "Energielabel",
              value: i && i.name
            }),
            h.a.createElement(V.a, { label: "Aantal bouwlagen", value: c && c })
          ),
          h.a.createElement(
            "div",
            { className: "row" },
            h.a.createElement(V.a, {
              label: "Status energielabel",
              value: u && u.name
            }),
            h.a.createElement(V.a, {
              label: "Monument",
              value: m ? "Ja" : "Nee"
            })
          )
        );
      });
      function X(e) {
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
            n = d()(e);
          if (t) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var Y = (function(e) {
          i()(a, e);
          var t = X(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(b()(n), "switchToEdit", function() {
                n.setState({ showEdit: !0 });
              }),
              E()(b()(n), "switchToView", function() {
                n.setState({ showEdit: !1, activeDiv: "" });
              }),
              (n.state = { showEdit: !1, activeDiv: "" }),
              n
            );
          }
          return (
            l()(a, [
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
                    O.a,
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
                      C.a,
                      null,
                      h.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        this.state.showEdit &&
                          this.props.permissions.manageHousingFile
                          ? h.a.createElement(H, {
                              switchToView: this.switchToView
                            })
                          : h.a.createElement(G, {
                              switchToEdit: this.switchToEdit
                            })
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(f.Component),
        U = Object(p.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(Y),
        W = a(199),
        J = a.n(W);
      F.a.locale("nl");
      var K = Object(p.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.measureTaken,
            a = (t.id, t.name),
            n = t.measureTakenDate;
          return h.a.createElement(
            "div",
            {
              className: "row border ".concat(e.highlightLine),
              onMouseEnter: function() {
                return e.onLineEnter();
              },
              onMouseLeave: function() {
                return e.onLineLeave();
              }
            },
            h.a.createElement(
              "div",
              null,
              h.a.createElement("div", { className: "col-sm-6" }, a),
              h.a.createElement(
                "div",
                { className: "col-sm-5" },
                n && F()(n).format("L")
              )
            ),
            h.a.createElement(
              "div",
              { className: "col-sm-1" },
              e.permissions.manageHousingFile && e.showActionButtons
                ? h.a.createElement(
                    "a",
                    { role: "button", onClick: e.toggleDelete },
                    h.a.createElement("span", {
                      className: "glyphicon glyphicon-trash mybtn-danger"
                    }),
                    " "
                  )
                : ""
            )
          );
        }),
        Q = Object(p.b)(
          function(e) {
            return {
              addressId: e.housingFileDetails.address.id,
              housingFileId: e.housingFileDetails.id
            };
          },
          function(e) {
            return {
              deleteHousingFileMeasureTaken: function(t, a) {
                e(
                  (function(e, t) {
                    return {
                      type: "DELETE_HOUSING_FILE_MEASURE_TAKEN",
                      addressId: e,
                      measureId: t
                    };
                  })(t, a)
                );
              }
            };
          }
        )(function(e) {
          return h.a.createElement(
            w.a,
            {
              buttonConfirmText: "Verwijder",
              buttonClassName: "btn-danger",
              closeModal: e.closeDeleteItemModal,
              confirmAction: function() {
                return (
                  e.deleteHousingFileMeasureTaken(e.addressId, e.id),
                  void e.closeDeleteItemModal()
                );
              },
              title: "Verwijderen"
            },
            h.a.createElement(
              "p",
              null,
              "Verwijder maatregel genomen: ",
              h.a.createElement("strong", null, " ", "".concat(e.name), " ")
            )
          );
        });
      function Z(e, t) {
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
      function $(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Z(Object(a), !0).forEach(function(t) {
                E()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Z(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function ee(e) {
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
            n = d()(e);
          if (t) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var te = (function(e) {
          i()(a, e);
          var t = ee(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(b()(n), "onLineEnter", function() {
                n.setState({
                  showActionButtons: !0,
                  highlightLine: "highlight-line"
                });
              }),
              E()(b()(n), "onLineLeave", function() {
                n.setState({ showActionButtons: !1, highlightLine: "" });
              }),
              E()(b()(n), "toggleDelete", function() {
                n.setState({ showDelete: !n.state.showDelete });
              }),
              (n.state = {
                showActionButtons: !1,
                highlightLine: "",
                showDelete: !1,
                measureTaken: $({}, e.measureTaken)
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  Object(L.isEqual)(this.state.measureTaken, e.measureTaken) ||
                    this.setState(
                      $(
                        $({}, this.state),
                        {},
                        { measureTaken: $({}, e.measureTaken) }
                      )
                    );
                }
              },
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    "div",
                    null,
                    h.a.createElement(K, {
                      highlightLine: this.state.highlightLine,
                      showActionButtons: this.state.showActionButtons,
                      onLineEnter: this.onLineEnter,
                      onLineLeave: this.onLineLeave,
                      toggleDelete: this.toggleDelete,
                      measureTaken: this.state.measureTaken
                    }),
                    this.state.showDelete &&
                      h.a.createElement(
                        Q,
                        J()(
                          { closeDeleteItemModal: this.toggleDelete },
                          this.props.measureTaken
                        )
                      )
                  );
                }
              }
            ]),
            a
          );
        })(f.Component),
        ae = Object(p.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(te),
        ne = Object(p.b)(function(e) {
          return { measuresTaken: e.housingFileDetails.address.measuresTaken };
        })(function(e) {
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "row border header" },
              h.a.createElement("div", { className: "col-sm-6" }, "Maatregel"),
              h.a.createElement(
                "div",
                { className: "col-sm-5" },
                "Datum realisatie"
              ),
              h.a.createElement("div", { className: "col-sm-1" })
            ),
            e.measuresTaken.length > 0
              ? e.measuresTaken.map(function(e, t) {
                  return h.a.createElement(ae, { key: t, measureTaken: e });
                })
              : h.a.createElement("div", null, "Geen interesses bekend.")
          );
        }),
        re = a(697),
        se = a.n(re),
        le = a(699),
        oe = a(835);
      function ie(e, t) {
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
      function ce(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ie(Object(a), !0).forEach(function(t) {
                E()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : ie(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function ue(e) {
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
            n = d()(e);
          if (t) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      F.a.locale("nl");
      var me = (function(e) {
          i()(a, e);
          var t = ue(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(b()(n), "handleInputChange", function(e) {
                var t = e.target,
                  a = "checkbox" === t.type ? t.checked : t.value,
                  r = t.name;
                n.setState(
                  ce(
                    ce({}, n.state),
                    {},
                    {
                      measureTaken: ce(
                        ce({}, n.state.measureTaken),
                        {},
                        E()({}, r, a)
                      )
                    }
                  )
                );
              }),
              E()(b()(n), "handleMeasureDate", function(e) {
                var t = e ? F()(e).format("Y-MM-DD") : "";
                n.setState(
                  ce(
                    ce({}, n.state),
                    {},
                    {
                      measureTaken: ce(
                        ce({}, n.state.measureTaken),
                        {},
                        { measureDate: t }
                      )
                    }
                  )
                );
              }),
              E()(b()(n), "handleSubmit", function(e) {
                e.preventDefault();
                var t = n.state.measureTaken,
                  a = {},
                  r = !1;
                se.a.isEmpty(t.measureId) && ((a.measureId = !0), (r = !0)),
                  n.setState(ce(ce({}, n.state), {}, { errors: a })),
                  !r &&
                    P.a
                      .attachMeasureTaken(t)
                      .then(function(e) {
                        n.props.newHousingFileMeasureTaken(e.data.data),
                          n.props.toggleShowNew();
                      })
                      .catch(function(e) {
                        alert(e);
                      });
              }),
              (n.state = {
                measureTaken: {
                  addressId: n.props.addressId,
                  measureId: "",
                  measureCategoryId: "",
                  measureDate: ""
                },
                errors: { measureId: !1 }
              }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this.state.measureTaken,
                    t = e.measureCategoryId,
                    a = e.measureId,
                    n = e.measureDate,
                    r = Object(oe.a)(this.props.measures, t);
                  return h.a.createElement(
                    "form",
                    {
                      className: "form-horizontal",
                      onSubmit: this.handleSubmit
                    },
                    h.a.createElement(
                      O.a,
                      { className: "panel-grey" },
                      h.a.createElement(
                        C.a,
                        null,
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(R.a, {
                            label: "Maatregel - categorie",
                            name: "measureCategoryId",
                            options: this.props.measureCategories,
                            value: t,
                            onChangeAction: this.handleInputChange
                          }),
                          h.a.createElement(R.a, {
                            label: "Maatregel - specifiek",
                            size: "col-sm-6",
                            name: "measureId",
                            options: r,
                            value: a,
                            onChangeAction: this.handleInputChange,
                            required: "required",
                            error: this.state.errors.measureId
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "row" },
                          h.a.createElement(le.a, {
                            label: "Datum realisatie",
                            name: "measureDate",
                            value: n,
                            onChangeAction: this.handleMeasureDate
                          })
                        ),
                        h.a.createElement(
                          "div",
                          { className: "pull-right btn-group", role: "group" },
                          h.a.createElement(I.a, {
                            buttonClassName: "btn-default",
                            buttonText: "Annuleren",
                            onClickAction: this.props.toggleShowNew
                          }),
                          h.a.createElement(I.a, {
                            buttonText: "Opslaan",
                            onClickAction: this.handleSubmit,
                            type: "submit",
                            value: "Submit"
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
        })(f.Component),
        de = Object(p.b)(
          function(e) {
            return {
              measures: e.systemData.measures,
              measureCategories: e.systemData.measureCategories,
              addressId: e.housingFileDetails.address.id
            };
          },
          function(e) {
            return {
              newHousingFileMeasureTaken: function(t) {
                e(
                  (function(e) {
                    return {
                      type: "NEW_HOUSING_FILE_MEASURE_TAKEN",
                      address: e
                    };
                  })(t)
                );
              }
            };
          }
        )(me),
        fe = a(698);
      function he(e) {
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
            n = d()(e);
          if (t) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var pe = (function(e) {
          i()(a, e);
          var t = he(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(b()(n), "toggleShowNew", function() {
                n.setState({ showNew: !n.state.showNew });
              }),
              (n.state = { showNew: !1 }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  return h.a.createElement(
                    O.a,
                    null,
                    h.a.createElement(
                      fe.a,
                      null,
                      h.a.createElement(
                        "span",
                        { className: "h5 text-bold" },
                        "Aanwezige maatregelen"
                      ),
                      this.props.permissions.manageHousingFile &&
                        h.a.createElement(
                          "a",
                          {
                            role: "button",
                            className: "pull-right",
                            onClick: this.toggleShowNew
                          },
                          h.a.createElement("span", {
                            className: "glyphicon glyphicon-plus"
                          })
                        )
                    ),
                    h.a.createElement(
                      C.a,
                      null,
                      h.a.createElement(
                        "div",
                        { className: "col-md-12" },
                        h.a.createElement(ne, null)
                      ),
                      h.a.createElement(
                        "div",
                        { className: "col-md-12 margin-10-top" },
                        this.state.showNew &&
                          h.a.createElement(de, {
                            toggleShowNew: this.toggleShowNew
                          })
                      )
                    )
                  );
                }
              }
            ]),
            a
          );
        })(f.Component),
        ge = Object(p.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        })(pe);
      F.a.locale("nl");
      var ve = Object(p.b)(function(e) {
          return { housingFileDetails: e.housingFileDetails };
        })(function(e) {
          var t = e.housingFileDetails,
            a = t.createdAt,
            n = t.updatedAt,
            r = t.updatedBy,
            s = t.createdBy;
          return h.a.createElement(
            "div",
            null,
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(V.a, {
                label: "Gemaakt door",
                value: s ? s.fullName : "Onbekend",
                link: s ? "gebruiker/" + s.id : ""
              }),
              h.a.createElement(V.a, {
                label: "Laatste update door",
                value: r ? r.fullName : "Onbekend",
                link: r ? "gebruiker/" + r.id : ""
              })
            ),
            h.a.createElement(
              "div",
              { className: "row" },
              h.a.createElement(V.a, {
                label: "Gemaakt op",
                value: a ? F()(a).format("L") : "Onbekend"
              }),
              h.a.createElement(V.a, {
                label: "Laatste update op",
                value: n ? F()(n).format("L") : "Onbekend"
              })
            )
          );
        }),
        be = function(e) {
          return h.a.createElement(
            O.a,
            null,
            h.a.createElement(
              fe.a,
              null,
              h.a.createElement(
                "span",
                { className: "h5 text-bold" },
                "Afsluiting gegevens"
              )
            ),
            h.a.createElement(
              C.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-md-12" },
                h.a.createElement(ve, null)
              )
            )
          );
        };
      function ye(e) {
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
            n = d()(e);
          if (t) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var Ee = (function(e) {
          i()(a, e);
          var t = ye(a);
          function a(e) {
            return r()(this, a), t.call(this, e);
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = "",
                    t = !0;
                  return (
                    this.props.hasError
                      ? (e = "Fout bij het ophalen van woningdossier.")
                      : this.props.isLoading
                      ? (e = "Gegevens aan het laden.")
                      : Object(L.isEmpty)(this.props.housingFileDetails)
                      ? (e = "Geen woningdossier gevonden!")
                      : (t = !1),
                    t
                      ? h.a.createElement("div", null, e)
                      : h.a.createElement(
                          "div",
                          null,
                          h.a.createElement(U, null),
                          h.a.createElement(ge, null),
                          h.a.createElement(be, null)
                        )
                  );
                }
              }
            ]),
            a
          );
        })(f.Component),
        Ne = Object(p.b)(function(e) {
          return {
            housingFileDetails: e.housingFileDetails,
            isLoading: e.loadingData.isLoading,
            hasError: e.loadingData.hasError
          };
        }, null)(Ee);
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
            n = d()(e);
          if (t) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var we = (function(e) {
          i()(a, e);
          var t = ke(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              (n = t.call(this, e)),
              E()(b()(n), "openItem", function(e) {
                N.f.push("/document/".concat(e));
              }),
              (n.state = { relatedDocuments: "" }),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.relatedDocuments;
                  return h.a.createElement(
                    "div",
                    null,
                    "" == t &&
                      h.a.createElement(
                        "div",
                        null,
                        "Geen documenten gevonden."
                      ),
                    "" != t &&
                      h.a.createElement(
                        "table",
                        { className: "table harmonica-table" },
                        h.a.createElement(
                          "tbody",
                          null,
                          t.map(function(t, a) {
                            return h.a.createElement(
                              "tr",
                              {
                                onClick: function() {
                                  return e.openItem(t.id);
                                },
                                key: a
                              },
                              h.a.createElement(
                                "td",
                                { className: "col-xs-5 clickable" },
                                F()(t.createdAt).format("L")
                              ),
                              h.a.createElement(
                                "td",
                                { className: "col-xs-6 clickable" },
                                t.filename
                              )
                            );
                          })
                        )
                      )
                  );
                }
              }
            ]),
            a
          );
        })(f.Component),
        De = Object(p.b)(function(e) {
          return { relatedDocuments: e.housingFileDetails.relatedDocuments };
        })(we),
        Oe = Object(p.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showDocumentsList,
            n = e.newDocument,
            r = e.documentCount,
            s = e.permissions;
          return h.a.createElement(
            O.a,
            { className: "harmonica-button" },
            h.a.createElement(
              C.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                h.a.createElement(
                  "span",
                  null,
                  "DOCUMENTEN ",
                  h.a.createElement("span", { className: "badge" }, r)
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-2" },
                s.createDocument &&
                  h.a.createElement(
                    "div",
                    { className: "pull-right" },
                    h.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white",
                      "data-toggle": "dropdown",
                      role: "button"
                    }),
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
                              return n("internal");
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
                              return n("upload");
                            }
                          },
                          "Upload document"
                        )
                      )
                    )
                  )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && h.a.createElement(De, null)
              )
            )
          );
        }),
        Ce = Object(p.b)(function(e) {
          return { relatedNotes: e.housingFileDetails.relatedNotes };
        })(function(e) {
          var t = e.relatedNotes;
          return h.a.createElement(
            "div",
            null,
            "" == t &&
              h.a.createElement("div", null, "Geen notities gevonden."),
            "" != t &&
              h.a.createElement(
                "table",
                { className: "table harmonica-table" },
                h.a.createElement(
                  "tbody",
                  null,
                  t.map(function(e, t) {
                    return h.a.createElement(
                      "tr",
                      {
                        onClick: function() {
                          return (t = e.id), void N.f.push("/taak/".concat(t));
                          var t;
                        },
                        key: t
                      },
                      h.a.createElement(
                        "td",
                        { className: "col-xs-12 clickable" },
                        F()(e.createdAt).format("L"),
                        " - ",
                        e.noteSummary
                      )
                    );
                  })
                )
              )
          );
        }),
        Te = Object(p.b)(function(e) {
          return { permissions: e.meDetails.permissions };
        }, null)(function(e) {
          var t = e.toggleShowList,
            a = e.showNotesList,
            n = e.newNote,
            r = e.noteCount,
            s = e.permissions;
          return h.a.createElement(
            O.a,
            { className: "harmonica-button" },
            h.a.createElement(
              C.a,
              null,
              h.a.createElement(
                "div",
                { className: "col-sm-10", onClick: t, role: "button" },
                h.a.createElement(
                  "span",
                  null,
                  "NOTITIES ",
                  h.a.createElement("span", { className: "badge" }, r)
                )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-2" },
                s.manageTask &&
                  h.a.createElement(
                    "a",
                    { role: "button", className: "pull-right", onClick: n },
                    h.a.createElement("span", {
                      className: "glyphicon glyphicon-plus glyphicon-white"
                    })
                  )
              ),
              h.a.createElement(
                "div",
                { className: "col-sm-12" },
                a && h.a.createElement(Ce, null)
              )
            )
          );
        });
      function Se(e, t) {
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
      function je(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Se(Object(a), !0).forEach(function(t) {
                E()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Se(Object(a)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      function Le(e) {
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
            n = d()(e);
          if (t) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var Ae = (function(e) {
          i()(a, e);
          var t = Le(a);
          function a(e) {
            var n;
            return (
              r()(this, a),
              ((n = t.call(this, e)).state = {
                toggleShowList: { documents: !1, notes: !1 }
              }),
              (n.newTask = n.newTask.bind(b()(n))),
              (n.newNote = n.newNote.bind(b()(n))),
              (n.newDocument = n.newDocument.bind(b()(n))),
              (n.toggleShowList = n.toggleShowList.bind(b()(n))),
              n
            );
          }
          return (
            l()(a, [
              {
                key: "newTask",
                value: function() {
                  N.f.push("/taak/nieuw/woningdossier/".concat(this.props.id));
                }
              },
              {
                key: "newNote",
                value: function() {
                  N.f.push(
                    "/taak/nieuw/afgehandeld/woningdossier/".concat(
                      this.props.id
                    )
                  );
                }
              },
              {
                key: "newDocument",
                value: function(e) {
                  N.f.push(
                    "/document/nieuw/"
                      .concat(e, "/woningdossier/")
                      .concat(this.props.id)
                  );
                }
              },
              {
                key: "toggleShowList",
                value: function(e) {
                  this.setState(
                    je(
                      je({}, this.state),
                      {},
                      {
                        toggleShowList: je(
                          je({}, this.state.toggleShowList),
                          {},
                          E()({}, e, !this.state.toggleShowList[e])
                        )
                      }
                    )
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this;
                  return h.a.createElement(
                    "div",
                    { className: "col-md-12 margin-10-top" },
                    h.a.createElement(Te, {
                      toggleShowList: function() {
                        return e.toggleShowList("notes");
                      },
                      showNotesList: this.state.toggleShowList.notes,
                      newNote: this.newNote,
                      noteCount: this.props.housingFileDetails.noteCount
                    }),
                    h.a.createElement(Oe, {
                      toggleShowList: function() {
                        return e.toggleShowList("documents");
                      },
                      showDocumentsList: this.state.toggleShowList.documents,
                      newDocument: this.newDocument,
                      documentCount: this.props.housingFileDetails.documentCount
                    })
                  );
                }
              }
            ]),
            a
          );
        })(f.Component),
        Fe = Object(p.b)(function(e) {
          return {
            housingFileDetails: e.housingFileDetails,
            permissions: e.meDetails.permissions
          };
        })(Ae);
      function Pe(e) {
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
            n = d()(e);
          if (t) {
            var r = d()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return u()(this, a);
        };
      }
      var Me = (function(e) {
        i()(a, e);
        var t = Pe(a);
        function a(e) {
          return r()(this, a), t.call(this, e);
        }
        return (
          l()(a, [
            {
              key: "componentDidMount",
              value: function() {
                this.props.fetchHousingFileDetails(this.props.params.id);
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
                      h.a.createElement(j, null)
                    ),
                    h.a.createElement(
                      "div",
                      { className: "col-md-12" },
                      h.a.createElement(Ne, null)
                    )
                  ),
                  h.a.createElement(
                    O.a,
                    { className: "col-md-3 harmonica" },
                    h.a.createElement(
                      C.a,
                      null,
                      h.a.createElement(Fe, { id: this.props.params.id })
                    )
                  )
                );
              }
            }
          ]),
          a
        );
      })(f.Component);
      t.default = Object(p.b)(null, function(e) {
        return {
          fetchHousingFileDetails: function(t) {
            e(g(t));
          }
        };
      })(Me);
    },
    690: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        l = a.n(s),
        o = function(e) {
          var t = e.children,
            a = e.className,
            n = e.onMouseEnter,
            s = e.onMouseLeave;
          return r.a.createElement(
            "div",
            {
              className: "panel panel-default ".concat(a),
              onMouseEnter: n,
              onMouseLeave: s
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
        s = a(8),
        l = a.n(s),
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
    692: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        l = a.n(s),
        o = function(e) {
          var t = e.buttonClassName,
            a = e.buttonText,
            n = e.onClickAction,
            s = e.type,
            l = e.value,
            o = e.loading,
            i = e.loadText,
            c = e.disabled;
          return o
            ? r.a.createElement(
                "button",
                {
                  type: s,
                  className: "btn btn-sm btn-loading ".concat(t),
                  value: l,
                  disabled: o
                },
                r.a.createElement("span", {
                  className:
                    "glyphicon glyphicon-refresh glyphicon-refresh-animate"
                }),
                " ",
                i
              )
            : r.a.createElement(
                "button",
                {
                  type: s,
                  className: "btn btn-sm ".concat(t),
                  onClick: n,
                  value: l,
                  disabled: c
                },
                a
              );
        };
      (o.defaultProps = {
        buttonClassName: "btn-success",
        type: "button",
        value: "",
        loading: !1,
        loadText: "Aan het laden",
        disabled: !1
      }),
        (o.propTypes = {
          buttonClassName: l.a.string,
          buttonText: l.a.string.isRequired,
          onClickAction: l.a.func,
          type: l.a.string,
          value: l.a.string,
          loading: l.a.bool,
          loadText: l.a.string,
          disabled: l.a.bool
        }),
        (t.a = o);
    },
    693: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        l = a.n(s),
        o = function(e) {
          var t = e.buttonClassName,
            a = e.iconName,
            n = e.onClickAction,
            s = e.title,
            l = e.disabled;
          return r.a.createElement(
            "button",
            {
              type: "button",
              className: "btn ".concat(t),
              onClick: n,
              disabled: l,
              title: s
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
    694: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        l = a.n(s),
        o = function(e) {
          var t = e.label,
            a = e.type,
            n = e.className,
            s = e.size,
            l = e.id,
            o = e.placeholder,
            i = e.name,
            c = e.value,
            u = e.onClickAction,
            m = e.onChangeAction,
            d = e.onBlurAction,
            f = e.required,
            h = e.readOnly,
            p = e.maxLength,
            g = e.error,
            v = e.min,
            b = e.max,
            y = e.step,
            E = e.errorMessage,
            N = e.divSize,
            k = e.divClassName,
            w = e.autoComplete;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(N, " ").concat(k) },
            r.a.createElement(
              "label",
              { htmlFor: l, className: "col-sm-6 ".concat(f) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "".concat(s) },
              r.a.createElement("input", {
                type: a,
                className:
                  "form-control input-sm ".concat(n) + (g ? "has-error" : ""),
                id: l,
                placeholder: o,
                name: i,
                value: c,
                onClick: u,
                onChange: m,
                onBlur: d,
                readOnly: h,
                maxLength: p,
                min: v,
                max: b,
                autoComplete: w,
                step: y
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
                  E
                )
              )
          );
        };
      (o.defaultProps = {
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
        (o.propTypes = {
          label: l.a.oneOfType([l.a.string, l.a.object]).isRequired,
          type: l.a.string,
          className: l.a.string,
          divClassName: l.a.string,
          size: l.a.string,
          divSize: l.a.string,
          id: l.a.string,
          placeholder: l.a.string,
          name: l.a.string.isRequired,
          value: l.a.oneOfType([l.a.string, l.a.number]),
          onClickAction: l.a.func,
          onChangeAction: l.a.func,
          onBlurAction: l.a.func,
          required: l.a.string,
          readOnly: l.a.bool,
          maxLength: l.a.string,
          error: l.a.bool,
          min: l.a.string,
          max: l.a.string,
          step: l.a.string,
          errorMessage: l.a.string,
          autoComplete: l.a.string
        }),
        (t.a = o);
    },
    695: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(4),
        l = a(8),
        o = a.n(l),
        i = function(e) {
          var t = e.label,
            a = e.className,
            n = e.id,
            l = e.value,
            o = e.link,
            i = e.hidden;
          return o.length > 0
            ? r.a.createElement(
                "div",
                { className: a, style: i ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement(
                  "div",
                  { className: "col-sm-6", id: n, onClick: null },
                  r.a.createElement(
                    s.b,
                    { to: o, className: "link-underline" },
                    l
                  )
                )
              )
            : r.a.createElement(
                "div",
                { className: a, style: i ? { display: "none" } : {} },
                r.a.createElement(
                  "label",
                  { htmlFor: n, className: "col-sm-6" },
                  t
                ),
                r.a.createElement("div", { className: "col-sm-6", id: n }, l)
              );
        };
      (i.defaultProps = {
        className: "col-sm-6",
        value: "",
        link: "",
        hidden: !1
      }),
        (i.propTypes = {
          label: o.a.oneOfType([o.a.string, o.a.object]).isRequired,
          className: o.a.string,
          id: o.a.string,
          value: o.a.oneOfType([o.a.string, o.a.number]),
          link: o.a.string,
          hidden: o.a.bool
        }),
        (t.a = i);
    },
    696: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        l = a.n(s),
        o = function(e) {
          var t = e.label,
            a = e.className,
            n = e.size,
            s = e.id,
            l = e.name,
            o = e.value,
            i = e.options,
            c = e.onChangeAction,
            u = e.onBlurAction,
            m = e.required,
            d = e.error,
            f = e.errorMessage,
            h = e.optionValue,
            p = e.optionName,
            g = e.readOnly,
            v = e.placeholder,
            b = e.divClassName,
            y = e.emptyOption;
          return r.a.createElement(
            "div",
            { className: "form-group ".concat(n, " ").concat(b) },
            r.a.createElement(
              "label",
              { htmlFor: s, className: "col-sm-6 ".concat(m) },
              t
            ),
            r.a.createElement(
              "div",
              { className: "col-sm-6" },
              r.a.createElement(
                "select",
                {
                  className:
                    "form-control input-sm ".concat(a) + (d && " has-error"),
                  id: s,
                  name: l,
                  value: o,
                  onChange: c,
                  onBlur: u,
                  readOnly: g
                },
                y && r.a.createElement("option", { value: "" }, v),
                i.map(function(e) {
                  return r.a.createElement(
                    "option",
                    { key: e[h], value: e[h] },
                    e[p]
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
                  f
                )
              )
          );
        };
      (o.defaultProps = {
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
        (o.propTypes = {
          label: l.a.string.isRequired,
          className: l.a.string,
          size: l.a.string,
          id: l.a.string,
          name: l.a.string.isRequired,
          options: l.a.array,
          value: l.a.oneOfType([l.a.string, l.a.number]),
          onChangeAction: l.a.func,
          onBlurAction: l.a.func,
          required: l.a.string,
          readOnly: l.a.bool,
          error: l.a.bool,
          errorMessage: l.a.string,
          emptyOption: l.a.bool,
          optionValue: l.a.string,
          optionName: l.a.string,
          placeholder: l.a.string
        }),
        (t.a = o);
    },
    698: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        l = a.n(s),
        o = function(e) {
          var t = e.className,
            a = e.children;
          return r.a.createElement(
            "div",
            { className: "panel-heading ".concat(t) },
            a
          );
        };
      (o.defaultProps = { className: "" }),
        (o.propTypes = { className: l.a.string }),
        (t.a = o);
    },
    699: function(e, t, a) {
      "use strict";
      var n = a(24),
        r = a.n(n),
        s = a(25),
        l = a.n(s),
        o = a(22),
        i = a.n(o),
        c = a(26),
        u = a.n(c),
        m = a(27),
        d = a.n(m),
        f = a(16),
        h = a.n(f),
        p = a(6),
        g = a.n(p),
        v = a(0),
        b = a.n(v),
        y = a(8),
        E = a.n(y),
        N = a(707),
        k = a.n(N),
        w = a(708),
        D = a.n(w),
        O = a(7),
        C = a.n(O);
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
          var a,
            n = h()(e);
          if (t) {
            var r = h()(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return d()(this, a);
        };
      }
      C.a.locale("nl");
      var S = (function(e) {
        u()(a, e);
        var t = T(a);
        function a(e) {
          var n;
          return (
            r()(this, a),
            (n = t.call(this, e)),
            g()(i()(n), "validateDate", function(e) {
              var t = C()(e.target.value, "DD-MM-YYYY", !0),
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
            g()(i()(n), "onDateChange", function(e) {
              var t = e ? C()(e).format("Y-MM-DD") : "",
                a = !1;
              t &&
                n.props.disabledBefore &&
                C()(t).isBefore(n.props.disabledBefore) &&
                (a = !0),
                t &&
                  n.props.disabledAfter &&
                  C()(t).isAfter(n.props.disabledAfter) &&
                  (a = !0),
                n.setState({ errorDateFormat: a }),
                !a && n.props.onChangeAction(t, n.props.name);
            }),
            (n.state = { errorDateFormat: !1 }),
            n
          );
        }
        return (
          l()(a, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.label,
                  a = e.className,
                  n = e.size,
                  r = e.divSize,
                  s = e.id,
                  l = e.value,
                  o = e.required,
                  i = e.readOnly,
                  c = e.name,
                  u = e.error,
                  m = e.errorMessage,
                  d = e.disabledBefore,
                  f = e.disabledAfter,
                  h = l ? C()(l).format("L") : "",
                  p = {};
                return (
                  d && (p.before = new Date(d)),
                  f && (p.after = new Date(f)),
                  b.a.createElement(
                    "div",
                    { className: "form-group ".concat(r) },
                    b.a.createElement(
                      "div",
                      null,
                      b.a.createElement(
                        "label",
                        { htmlFor: s, className: "col-sm-6 ".concat(o) },
                        t
                      )
                    ),
                    b.a.createElement(
                      "div",
                      { className: "".concat(n) },
                      b.a.createElement(k.a, {
                        id: s,
                        value: h,
                        formatDate: w.formatDate,
                        parseDate: w.parseDate,
                        onDayChange: this.onDateChange,
                        dayPickerProps: {
                          showWeekNumbers: !0,
                          locale: "nl",
                          firstDayOfWeek: 1,
                          localeUtils: D.a,
                          disabledDays: p
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
                          readOnly: i,
                          disabled: i
                        },
                        required: o,
                        readOnly: i,
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
          a
        );
      })(v.Component);
      (S.defaultProps = {
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
        (S.propTypes = {
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
        (t.a = S);
    },
    700: function(e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        s = a(8),
        l = a.n(s),
        o = a(703),
        i = a.n(o),
        c = function(e) {
          var t = e.label,
            a = e.size,
            n = e.id,
            s = e.name,
            l = e.value,
            o = e.onChangeAction,
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
                t
              )
            ),
            r.a.createElement(
              "div",
              { className: "".concat(a) },
              r.a.createElement(i.a, {
                id: n,
                name: s,
                onChange: o,
                checked: l,
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
          label: l.a.string.isRequired,
          type: l.a.string,
          size: l.a.string,
          divSize: l.a.string,
          id: l.a.string,
          name: l.a.string.isRequired,
          value: l.a.bool,
          onChangeAction: l.a.func,
          required: l.a.string,
          disabled: l.a.bool
        }),
        (t.a = c);
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
        s = a(0),
        l = d(s),
        o = d(a(710)),
        i = d(a(8)),
        c = d(a(704)),
        u = d(a(705)),
        m = a(706);
      function d(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var f = (function(e) {
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
                (this.startX = (0, m.pointerCoord)(e).x), (this.activated = !0);
              }
            },
            {
              key: "handleTouchMove",
              value: function(e) {
                if (this.activated && ((this.moved = !0), this.startX)) {
                  var t = (0, m.pointerCoord)(e).x;
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
                    var a = (0, m.pointerCoord)(e).x;
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
                  s = (0, o.default)(
                    "react-toggle",
                    {
                      "react-toggle--checked": this.state.checked,
                      "react-toggle--focus": this.state.hasFocus,
                      "react-toggle--disabled": this.props.disabled
                    },
                    a
                  );
                return l.default.createElement(
                  "div",
                  {
                    className: s,
                    onClick: this.handleClick,
                    onTouchStart: this.handleTouchStart,
                    onTouchMove: this.handleTouchMove,
                    onTouchEnd: this.handleTouchEnd
                  },
                  l.default.createElement(
                    "div",
                    { className: "react-toggle-track" },
                    l.default.createElement(
                      "div",
                      { className: "react-toggle-track-check" },
                      this.getIcon("checked")
                    ),
                    l.default.createElement(
                      "div",
                      { className: "react-toggle-track-x" },
                      this.getIcon("unchecked")
                    )
                  ),
                  l.default.createElement("div", {
                    className: "react-toggle-thumb"
                  }),
                  l.default.createElement(
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
      })(s.PureComponent);
      (t.default = f),
        (f.displayName = "Toggle"),
        (f.defaultProps = {
          icons: {
            checked: l.default.createElement(c.default, null),
            unchecked: l.default.createElement(u.default, null)
          }
        }),
        (f.propTypes = {
          checked: i.default.bool,
          disabled: i.default.bool,
          defaultChecked: i.default.bool,
          onChange: i.default.func,
          onFocus: i.default.func,
          onBlur: i.default.func,
          className: i.default.string,
          name: i.default.string,
          value: i.default.string,
          id: i.default.string,
          "aria-labelledby": i.default.string,
          "aria-label": i.default.string,
          icons: i.default.oneOfType([
            i.default.bool,
            i.default.shape({
              checked: i.default.node,
              unchecked: i.default.node
            })
          ])
        });
    },
    704: function(e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        r = a(0),
        s = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
        return s.default.createElement(
          "svg",
          { width: "14", height: "11", viewBox: "0 0 14 11" },
          s.default.createElement("title", null, "switch-check"),
          s.default.createElement("path", {
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
        s = (n = r) && n.__esModule ? n : { default: n };
      t.default = function() {
        return s.default.createElement(
          "svg",
          { width: "10", height: "10", viewBox: "0 0 10 10" },
          s.default.createElement("title", null, "switch-x"),
          s.default.createElement("path", {
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
    710: function(e, t, a) {
      var n;
      /*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/ !(function() {
        "use strict";
        var a = {}.hasOwnProperty;
        function r() {
          for (var e = [], t = 0; t < arguments.length; t++) {
            var n = arguments[t];
            if (n) {
              var s = typeof n;
              if ("string" === s || "number" === s) e.push(n);
              else if (Array.isArray(n) && n.length) {
                var l = r.apply(null, n);
                l && e.push(l);
              } else if ("object" === s)
                for (var o in n) a.call(n, o) && n[o] && e.push(o);
            }
          }
          return e.join(" ");
        }
        e.exports
          ? ((r.default = r), (e.exports = r))
          : void 0 ===
              (n = function() {
                return r;
              }.apply(t, [])) || (e.exports = n);
      })();
    },
    835: function(e, t, a) {
      "use strict";
      t.a = function(e, t) {
        return e.filter(function(e) {
          return t
            ? Number(e.measureCategoryId) === Number(t)
            : e.measureCategoryId;
        });
      };
    }
  }
]);
