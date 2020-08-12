(window.webpackJsonp = window.webpackJsonp || []).push([
  [7],
  {
    747: function(e, a, n) {
      "use strict";
      /*!
       * @license
       * This Source Code Form is subject to the terms of the Mozilla Public
       * License, v. 2.0. If a copy of the MPL was not distributed with this
       * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
      /**
       * @file Validation, extraction and creation of IBAN, BBAN, BIC/SWIFT numbers plus some other helpful stuff
       * @author Saša Jovanić
       * @module ibantools
       * @see module:ibantools
       * @version 2.2.0
       * @license MPL-2.0
       */
      function r(e) {
        if (null != e) {
          var a = new RegExp("^[0-9]{2}$", ""),
            n = I[e.slice(0, 2)];
          if (
            void 0 !== n &&
            n.IBANRegistry &&
            n.chars === e.length &&
            a.test(e.slice(2, 4)) &&
            b(e.slice(4), n.bban_regexp) &&
            (function(e) {
              for (
                var a = parseInt(e.slice(2, 4), 10),
                  n = e.slice(3) + e.slice(0, 2) + "00",
                  r = "",
                  l = 1;
                l < n.length;
                l++
              ) {
                var s = n.charCodeAt(l);
                r += s >= 65 ? (s - 55).toString() : n[l];
              }
              for (; r.length > 2; ) {
                var g = r.slice(0, 6);
                r = (parseInt(g, 10) % 97).toString() + r.slice(g.length);
              }
              return 98 - (parseInt(r, 10) % 97) === a;
            })(e)
          )
            return !0;
        }
        return !1;
      }
      function l(e, a) {
        if (null != e && null != a) {
          var n = I[a];
          if (void 0 !== n && n.chars - 4 === e.length && b(e, n.bban_regexp))
            return !0;
        }
        return !1;
      }
      function s(e) {
        var a = i(e.bban),
          n = I[e.countryCode];
        if (
          null !== a &&
          void 0 !== n &&
          n.chars === a.length + 4 &&
          b(a, n.bban_regexp)
        ) {
          var r = (function(e) {
            e = e.slice(3) + e.slice(0, 4);
            for (var a = "", n = 1; n < e.length; n++) {
              var r = e.charCodeAt(n);
              a += r >= 65 ? (r - 55).toString() : e[n];
            }
            for (; a.length > 2; ) {
              var l = a.slice(0, 6);
              a = (parseInt(l, 10) % 97).toString() + a.slice(l.length);
            }
            return parseInt(a, 10) % 97;
          })(e.countryCode + "00" + a);
          return e.countryCode + ("0" + (98 - r)).slice(-2) + a;
        }
        return null;
      }
      function g(e) {
        var a = {};
        if (((a.iban = e), r(e))) {
          (a.bban = e.slice(4)), (a.countryCode = e.slice(0, 2));
          var n = I[a.countryCode];
          (a.countryName = n.name), (a.valid = !0);
        } else a.valid = !1;
        return a;
      }
      function b(e, a) {
        return new RegExp(a, "").test(e);
      }
      function i(e) {
        return "string" != typeof e
          ? null
          : e.replace(/[-\ ]/g, "").toUpperCase();
      }
      function u(e, a) {
        return "string" != typeof e
          ? null
          : (void 0 === a && (a = " "), i(e).replace(/(.{4})(?!$)/g, "$1" + a));
      }
      function t() {
        return I;
      }
      function c(e) {
        var a = new RegExp("^[a-zA-Z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$", ""),
          n = I[e.toUpperCase().slice(4, 6)];
        return a.test(e) && void 0 !== n;
      }
      function A(e) {
        var a = {},
          n = e.toUpperCase();
        if (c(n)) {
          (a.bankCode = n.slice(0, 4)), (a.countryCode = n.slice(4, 6));
          var r = I[a.countryCode];
          (a.countryName = r.name),
            (a.locationCode = n.slice(6, 8)),
            (a.testBIC = "0" === a.locationCode[1]),
            (a.branchCode = n.length > 8 ? n.slice(8) : "619"),
            (a.valid = !0);
        } else a.valid = !1;
        return a;
      }
      n.r(a),
        n.d(a, "isValidIBAN", function() {
          return r;
        }),
        n.d(a, "isValidBBAN", function() {
          return l;
        }),
        n.d(a, "composeIBAN", function() {
          return s;
        }),
        n.d(a, "extractIBAN", function() {
          return g;
        }),
        n.d(a, "electronicFormatIBAN", function() {
          return i;
        }),
        n.d(a, "friendlyFormatIBAN", function() {
          return u;
        }),
        n.d(a, "getCountrySpecifications", function() {
          return t;
        }),
        n.d(a, "isValidBIC", function() {
          return c;
        }),
        n.d(a, "extractBIC", function() {
          return A;
        });
      var I = {
        AD: {
          chars: 24,
          bban_regexp: "^[0-9]{8}[A-Z0-9]{12}$",
          name: "Andorra",
          IBANRegistry: !0
        },
        AE: {
          chars: 23,
          bban_regexp: "^[0-9]{3}[0-9]{16}$",
          name: "United Arab Emirates",
          IBANRegistry: !0
        },
        AF: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Afganistan"
        },
        AG: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Antigua and Bermuda"
        },
        AI: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Anguilla"
        },
        AL: {
          chars: 28,
          bban_regexp: "^[0-9]{8}[A-Z0-9]{16}$",
          name: "Albania",
          IBANRegistry: !0
        },
        AM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Armenia"
        },
        AO: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Angola"
        },
        AQ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Antartica"
        },
        AR: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Argentina"
        },
        AS: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "American Samoa"
        },
        AT: {
          chars: 20,
          bban_regexp: "^[0-9]{16}$",
          name: "Austria",
          IBANRegistry: !0
        },
        AU: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Australia"
        },
        AW: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Aruba" },
        AX: {
          chars: 18,
          bban_regexp: "^[0-9]{14}$",
          name: "Åland Islands",
          IBANRegistry: !0
        },
        AZ: {
          chars: 28,
          bban_regexp: "^[A-Z]{4}[0-9]{20}$",
          name: "Republic of Azerbaijan",
          IBANRegistry: !0
        },
        BA: {
          chars: 20,
          bban_regexp: "^[0-9]{16}$",
          name: "Bosnia and Herzegovina",
          IBANRegistry: !0
        },
        BB: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Barbados"
        },
        BD: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Bangladesh"
        },
        BE: {
          chars: 16,
          bban_regexp: "^[0-9]{12}$",
          name: "Belgium",
          IBANRegistry: !0
        },
        BF: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Burkina Faso"
        },
        BG: {
          chars: 22,
          bban_regexp: "^[A-Z]{4}[0-9]{6}[A-Z0-9]{8}$",
          name: "Bulgaria",
          IBANRegistry: !0
        },
        BH: {
          chars: 22,
          bban_regexp: "^[A-Z]{4}[A-Z0-9]{14}$",
          name: "Bahrain",
          IBANRegistry: !0
        },
        BI: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Burundi"
        },
        BJ: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Benin" },
        BL: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "Saint Barthelemy",
          IBANRegistry: !0
        },
        BM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Bermuda"
        },
        BN: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Brunei Darusslam"
        },
        BO: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Bolivia, Plurinational State of"
        },
        BQ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Bonaire, Sint Eustatius and Saba"
        },
        BR: {
          chars: 29,
          bban_regexp: "^[0-9]{23}[A-Z]{1}[A-Z0-9]{1}$",
          name: "Brazil",
          IBANRegistry: !0
        },
        BS: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Bahamas"
        },
        BT: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Bhutan"
        },
        BV: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Bouvet Island"
        },
        BW: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Botswana"
        },
        BY: {
          chars: 28,
          bban_regexp: "^[A-Z]{4}[0-9]{4}[A-Z0-9]{16}$",
          name: "Republic of Belarus",
          IBANRegistry: !0
        },
        BZ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Belize"
        },
        CA: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Canada"
        },
        CC: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Cocos (Keeling) Islands"
        },
        CD: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Congo, the Democratic Republic of the"
        },
        CF: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Central African Republic"
        },
        CG: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Congo" },
        CH: {
          chars: 21,
          bban_regexp: "^[0-9]{5}[A-Z0-9]{12}$",
          name: "Switzerland",
          IBANRegistry: !0
        },
        CI: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Côte d'Ivoire"
        },
        CK: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Cook Islands"
        },
        CL: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Chile" },
        CM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Cameroon"
        },
        CN: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "China" },
        CO: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Columbia"
        },
        CR: {
          chars: 22,
          bban_regexp: "^[0-9]{18}$",
          name: "Costa Rica",
          IBANRegistry: !0
        },
        CU: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Cuba" },
        CV: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Cabo Verde"
        },
        CW: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Curaçao"
        },
        CX: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Christmas Island"
        },
        CY: {
          chars: 28,
          bban_regexp: "^[0-9]{8}[A-Z0-9]{16}$",
          name: "Cyprus",
          IBANRegistry: !0
        },
        CZ: {
          chars: 24,
          bban_regexp: "^[0-9]{20}$",
          name: "Czech Republic",
          IBANRegistry: !0
        },
        DE: {
          chars: 22,
          bban_regexp: "^[0-9]{18}$",
          name: "Germany",
          IBANRegistry: !0
        },
        DJ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Djibouti"
        },
        DK: {
          chars: 18,
          bban_regexp: "^[0-9]{14}$",
          name: "Denmark",
          IBANRegistry: !0
        },
        DM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Dominica"
        },
        DO: {
          chars: 28,
          bban_regexp: "^[A-Z]{4}[0-9]{20}$",
          name: "Dominican Republic",
          IBANRegistry: !0
        },
        DZ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Algeria"
        },
        EC: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Ecuador"
        },
        EE: {
          chars: 20,
          bban_regexp: "^[0-9]{16}$",
          name: "Estonia",
          IBANRegistry: !0
        },
        EG: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Egypt" },
        EH: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Western Sahara"
        },
        ER: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Eritrea"
        },
        ES: {
          chars: 24,
          bban_regexp: "^[0-9]{20}$",
          name: "Spain",
          IBANRegistry: !0
        },
        ET: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Ethiopia"
        },
        FI: {
          chars: 18,
          bban_regexp: "^[0-9]{14}$",
          name: "Finland",
          IBANRegistry: !0
        },
        FJ: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Fiji" },
        FK: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Falkland Islands (Malvinas)"
        },
        FM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Micronesia, Federated States of"
        },
        FO: {
          chars: 18,
          bban_regexp: "^[0-9]{14}$",
          name: "Faroe Islands (Denmark)",
          IBANRegistry: !0
        },
        FR: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "France",
          IBANRegistry: !0
        },
        GA: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Gabon" },
        GB: {
          chars: 22,
          bban_regexp: "^[A-Z]{4}[0-9]{14}$",
          name: "United Kingdom",
          IBANRegistry: !0
        },
        GD: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Grenada"
        },
        GE: {
          chars: 22,
          bban_regexp: "^[A-Z0-9]{2}[0-9]{16}$",
          name: "Georgia",
          IBANRegistry: !0
        },
        GF: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "French Guyana",
          IBANRegistry: !0
        },
        GG: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Guernsey"
        },
        GH: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Ghana" },
        GI: {
          chars: 23,
          bban_regexp: "^[A-Z]{4}[A-Z0-9]{15}$",
          name: "Gibraltar",
          IBANRegistry: !0
        },
        GL: {
          chars: 18,
          bban_regexp: "^[0-9]{14}$",
          name: "Greenland",
          IBANRegistry: !0
        },
        GM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Gambia"
        },
        GN: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Guinea"
        },
        GP: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "Guadeloupe",
          IBANRegistry: !0
        },
        GQ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Equatorial Guinea"
        },
        GR: {
          chars: 27,
          bban_regexp: "^[0-9]{7}[A-Z0-9]{16}$",
          name: "Greece",
          IBANRegistry: !0
        },
        GS: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "South Georgia and the South Sandwitch Islands"
        },
        GT: {
          chars: 28,
          bban_regexp: "^[A-Z0-9]{24}$",
          name: "Guatemala",
          IBANRegistry: !0
        },
        GU: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Guam" },
        GW: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Guinea-Bissau"
        },
        GY: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Guyana"
        },
        HK: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Hong Kong"
        },
        HM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Heard Island and McDonald Islands"
        },
        HN: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Honduras"
        },
        HR: {
          chars: 21,
          bban_regexp: "^[0-9]{17}$",
          name: "Croatia",
          IBANRegistry: !0
        },
        HT: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Haiti" },
        HU: {
          chars: 28,
          bban_regexp: "^[0-9]{24}$",
          name: "Hungary",
          IBANRegistry: !0
        },
        ID: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Indonesia"
        },
        IE: {
          chars: 22,
          bban_regexp: "^[A-Z0-9]{4}[0-9]{14}$",
          name: "Republic of Ireland",
          IBANRegistry: !0
        },
        IL: {
          chars: 23,
          bban_regexp: "^[0-9]{19}$",
          name: "Israel",
          IBANRegistry: !0
        },
        IM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Isle of Man"
        },
        IN: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "India" },
        IO: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "British Indian Ocean Territory"
        },
        IQ: {
          chars: 23,
          bban_regexp: "^[A-Z]{4}[0-9]{15}$",
          name: "Iraq",
          IBANRegistry: !0
        },
        IR: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Iran, Islamic Republic of"
        },
        IS: {
          chars: 26,
          bban_regexp: "^[0-9]{22}$",
          name: "Iceland",
          IBANRegistry: !0
        },
        IT: {
          chars: 27,
          bban_regexp: "^[A-Z]{1}[0-9]{10}[A-Z0-9]{12}$",
          name: "Italy",
          IBANRegistry: !0
        },
        JE: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Jersey"
        },
        JM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Jamaica"
        },
        JO: {
          chars: 30,
          bban_regexp: "^[A-Z]{4}[0-9]{4}[A-Z0-9]{18}$",
          name: "Jordan",
          IBANRegistry: !0
        },
        JP: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Japan" },
        KE: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Kenya" },
        KG: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Kyrgyzstan"
        },
        KH: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Cambodia"
        },
        KI: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Kiribati"
        },
        KM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Comoros"
        },
        KN: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Saint Kitts and Nevis"
        },
        KP: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Korea, Domocratic People's Republic of"
        },
        KR: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Korea, Republic of"
        },
        KW: {
          chars: 30,
          bban_regexp: "^[A-Z]{4}[A-Z0-9]{22}$",
          name: "Kuwait",
          IBANRegistry: !0
        },
        KY: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Cayman Islands"
        },
        KZ: {
          chars: 20,
          bban_regexp: "^[0-9]{3}[A-Z0-9]{13}$",
          name: "Kazakhstan",
          IBANRegistry: !0
        },
        LA: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Lao People's Democratic Republic"
        },
        LB: {
          chars: 28,
          bban_regexp: "^[0-9]{4}[A-Z0-9]{20}$",
          name: "Lebanon",
          IBANRegistry: !0
        },
        LC: {
          chars: 32,
          bban_regexp: "^[A-Z]{4}[A-Z0-9]{24}$",
          name: "Saint Lucia",
          IBANRegistry: !0
        },
        LI: {
          chars: 21,
          bban_regexp: "^[0-9]{5}[A-Z0-9]{12}$",
          name: "Liechtenstein",
          IBANRegistry: !0
        },
        LK: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Sri Lanka"
        },
        LR: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Liberia"
        },
        LS: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Lesotho"
        },
        LT: {
          chars: 20,
          bban_regexp: "^[0-9]{16}$",
          name: "Lithuania",
          IBANRegistry: !0
        },
        LU: {
          chars: 20,
          bban_regexp: "^[0-9]{3}[A-Z0-9]{13}$",
          name: "Luxembourg",
          IBANRegistry: !0
        },
        LV: {
          chars: 21,
          bban_regexp: "^[A-Z]{4}[A-Z0-9]{13}$",
          name: "Latvia",
          IBANRegistry: !0
        },
        LY: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Libya" },
        MA: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Marocco"
        },
        MC: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "Monaco",
          IBANRegistry: !0
        },
        MD: {
          chars: 24,
          bban_regexp: "^[A-Z0-9]{2}[A-Z0-9]{18}$",
          name: "Moldova",
          IBANRegistry: !0
        },
        ME: {
          chars: 22,
          bban_regexp: "^[0-9]{18}$",
          name: "Montenegro",
          IBANRegistry: !0
        },
        MF: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "Saint Martin",
          IBANRegistry: !0
        },
        MG: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Madagascar"
        },
        MH: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Marshall Islands"
        },
        MK: {
          chars: 19,
          bban_regexp: "^[0-9]{3}[A-Z0-9]{10}[0-9]{2}$",
          name: "Macedonia, the former Yugoslav Republic of",
          IBANRegistry: !0
        },
        ML: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Mali" },
        MM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Myanman"
        },
        MN: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Mongolia"
        },
        MO: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Macao" },
        MP: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Northern mariana Islands"
        },
        MQ: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "Martinique",
          IBANRegistry: !0
        },
        MR: {
          chars: 27,
          bban_regexp: "^[0-9]{23}$",
          name: "Mauritania",
          IBANRegistry: !0
        },
        MS: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Montserrat"
        },
        MT: {
          chars: 31,
          bban_regexp: "^[A-Z]{4}[0-9]{5}[A-Z0-9]{18}$",
          name: "Malta",
          IBANRegistry: !0
        },
        MU: {
          chars: 30,
          bban_regexp: "^[A-Z]{4}[0-9]{19}[A-Z]{3}$",
          name: "Mauritius",
          IBANRegistry: !0
        },
        MV: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Maldives"
        },
        MW: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Malawi"
        },
        MX: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Mexico"
        },
        MY: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Malaysia"
        },
        MZ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Mozambique"
        },
        NA: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Namibia"
        },
        NC: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "New Caledonia",
          IBANRegistry: !0
        },
        NE: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Niger" },
        NF: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Norfolk Island"
        },
        NG: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Nigeria"
        },
        NI: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Nicaraqua"
        },
        NL: {
          chars: 18,
          bban_regexp: "^[A-Z]{4}[0-9]{10}$",
          name: "Netherlands",
          IBANRegistry: !0
        },
        NO: {
          chars: 15,
          bban_regexp: "^[0-9]{11}$",
          name: "Norway",
          IBANRegistry: !0
        },
        NP: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Nepal" },
        NR: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Nauru" },
        NU: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Niue" },
        NZ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "New Zealand"
        },
        OM: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Oman" },
        PA: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Panama"
        },
        PE: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Peru" },
        PF: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "French Polynesia",
          IBANRegistry: !0
        },
        PG: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Papua New Guinea"
        },
        PH: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Philippines"
        },
        PK: {
          chars: 24,
          bban_regexp: "^[A-Z0-9]{4}[0-9]{16}$",
          name: "Pakistan",
          IBANRegistry: !0
        },
        PL: {
          chars: 28,
          bban_regexp: "^[0-9]{24}$",
          name: "Poland",
          IBANRegistry: !0
        },
        PM: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "Saint Pierre et Miquelon",
          IBANRegistry: !0
        },
        PN: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Pitcairn"
        },
        PR: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Puerto Rico"
        },
        PS: {
          chars: 29,
          bban_regexp: "^[A-Z0-9]{4}[0-9]{21}$",
          name: "Palestine, State of",
          IBANRegistry: !0
        },
        PT: {
          chars: 25,
          bban_regexp: "^[0-9]{21}$",
          name: "Portugal",
          IBANRegistry: !0
        },
        PW: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Palau" },
        PY: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Paraguay"
        },
        QA: {
          chars: 29,
          bban_regexp: "^[A-Z]{4}[A-Z0-9]{21}$",
          name: "Qatar",
          IBANRegistry: !0
        },
        RE: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "Reunion",
          IBANRegistry: !0
        },
        RO: {
          chars: 24,
          bban_regexp: "^[A-Z]{4}[A-Z0-9]{16}$",
          name: "Romania",
          IBANRegistry: !0
        },
        RS: {
          chars: 22,
          bban_regexp: "^[0-9]{18}$",
          name: "Serbia",
          IBANRegistry: !0
        },
        RU: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Russian Federation"
        },
        RW: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Rwanda"
        },
        SA: {
          chars: 24,
          bban_regexp: "^[0-9]{2}[A-Z0-9]{18}$",
          name: "Saudi Arabia",
          IBANRegistry: !0
        },
        SB: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Solomon Islands"
        },
        SC: {
          chars: 31,
          bban_regexp: "^[[A-Z]{4}[]0-9]{20}[A-Z]{3}$",
          name: "Seychelles",
          IBANRegistry: !0
        },
        SD: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Sudan" },
        SE: {
          chars: 24,
          bban_regexp: "^[0-9]{20}$",
          name: "Sweden",
          IBANRegistry: !0
        },
        SG: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Singapore"
        },
        SH: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Saint Helena, Ascension and Tristan da Cunha"
        },
        SI: {
          chars: 19,
          bban_regexp: "^[0-9]{15}$",
          name: "Slovenia",
          IBANRegistry: !0
        },
        SJ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Svalbard and Jan Mayen"
        },
        SK: {
          chars: 24,
          bban_regexp: "^[0-9]{20}$",
          name: "Slovak Republic",
          IBANRegistry: !0
        },
        SL: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Siera Leone"
        },
        SM: {
          chars: 27,
          bban_regexp: "^[A-Z]{1}[0-9]{10}[A-Z0-9]{12}$",
          name: "San Marino",
          IBANRegistry: !0
        },
        SN: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Senegal"
        },
        SO: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Somalia"
        },
        SR: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Suriname"
        },
        SS: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "South Sudan"
        },
        ST: {
          chars: 25,
          bban_regexp: "^[0-9]{21}$",
          name: "Sao Tome And Principe",
          IBANRegistry: !0
        },
        SV: {
          chars: 28,
          bban_regexp: "^[A-Z]{4}[0-9]{20}$",
          name: "El Salvador",
          IBANRegistry: !0
        },
        SX: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Sint Maarten (Dutch part)"
        },
        SY: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Syrian Arab Republic"
        },
        SZ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Swaziland"
        },
        TC: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Turks and Caicos Islands"
        },
        TD: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Chad" },
        TF: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "French Southern Territories",
          IBANRegistry: !0
        },
        TG: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Togo" },
        TH: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Thailand"
        },
        TJ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Tajikistan"
        },
        TK: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Tokelau"
        },
        TL: {
          chars: 23,
          bban_regexp: "^[0-9]{19}$",
          name: "Timor-Leste",
          IBANRegistry: !0
        },
        TM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Turkmenistan"
        },
        TN: {
          chars: 24,
          bban_regexp: "^[0-9]{20}$",
          name: "Tunisia",
          IBANRegistry: !0
        },
        TO: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Tonga" },
        TR: {
          chars: 26,
          bban_regexp: "^[0-9]{5}[A-Z0-9]{17}$",
          name: "Turkey",
          IBANRegistry: !0
        },
        TT: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Trinidad and Tobago"
        },
        TV: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Tuvalu"
        },
        TW: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Taiwan, Province of China"
        },
        TZ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Tanzania, United republic of"
        },
        UA: {
          chars: 29,
          bban_regexp: "^[0-9]{6}[A-Z0-9]{19}$",
          name: "Ukraine",
          IBANRegistry: !0
        },
        UG: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Uganda"
        },
        UM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "United States Minor Outlying Islands"
        },
        US: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "United States of America"
        },
        UY: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Uruguay"
        },
        UZ: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Uzbekistan"
        },
        VA: {
          chars: 22,
          bban_regexp: "^[0-9]{18}",
          IBANRegistry: !0,
          name: "Vatican City State"
        },
        VC: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Saint Vincent and the Granadines"
        },
        VE: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Venezuela, Bolivian Republic of"
        },
        VG: {
          chars: 24,
          bban_regexp: "^[A-Z0-9]{4}[0-9]{16}$",
          name: "Virgin Islands, British",
          IBANRegistry: !0
        },
        VI: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Virgin Islands, U.S."
        },
        VN: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Viet Nam"
        },
        VU: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Vanautu"
        },
        WF: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "Wallis and Futuna",
          IBANRegistry: !0
        },
        WS: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Samoa" },
        XK: {
          chars: 20,
          bban_regexp: "^[0-9]{16}$",
          name: "Kosovo",
          IBANRegistry: !0
        },
        YE: { chars: null, bban_regexp: null, IBANRegistry: !1, name: "Yemen" },
        YT: {
          chars: 27,
          bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
          name: "Mayotte",
          IBANRegistry: !0
        },
        ZA: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "South Africa"
        },
        ZM: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Zambia"
        },
        ZW: {
          chars: null,
          bban_regexp: null,
          IBANRegistry: !1,
          name: "Zimbabwe"
        }
      };
    }
  }
]);
