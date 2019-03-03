// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function nth(n) {
    return function(d) {
        return d[n];
    };
}


// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function $(o) {
    return function(d) {
        var ret = {};
        Object.keys(o).forEach(function(k) {
            ret[k] = d[o[k]];
        });
        return ret;
    };
}
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "dqstring$ebnf$1", "symbols": []},
    {"name": "dqstring$ebnf$1", "symbols": ["dqstring$ebnf$1", "dstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "dqstring", "symbols": [{"literal":"\""}, "dqstring$ebnf$1", {"literal":"\""}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "sqstring$ebnf$1", "symbols": []},
    {"name": "sqstring$ebnf$1", "symbols": ["sqstring$ebnf$1", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sqstring", "symbols": [{"literal":"'"}, "sqstring$ebnf$1", {"literal":"'"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "btstring$ebnf$1", "symbols": []},
    {"name": "btstring$ebnf$1", "symbols": ["btstring$ebnf$1", /[^`]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "btstring", "symbols": [{"literal":"`"}, "btstring$ebnf$1", {"literal":"`"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "dstrchar", "symbols": [/[^\\"\n]/], "postprocess": id},
    {"name": "dstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": 
        function(d) {
            return JSON.parse("\""+d.join("")+"\"");
        }
        },
    {"name": "sstrchar", "symbols": [/[^\\'\n]/], "postprocess": id},
    {"name": "sstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": function(d) { return JSON.parse("\""+d.join("")+"\""); }},
    {"name": "sstrchar$string$1", "symbols": [{"literal":"\\"}, {"literal":"'"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "sstrchar", "symbols": ["sstrchar$string$1"], "postprocess": function(d) {return "'"; }},
    {"name": "strescape", "symbols": [/["\\\/bfnrt]/], "postprocess": id},
    {"name": "strescape", "symbols": [{"literal":"u"}, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/], "postprocess": 
        function(d) {
            return d.join("");
        }
        },
    {"name": "csscolor", "symbols": [{"literal":"#"}, "hexdigit", "hexdigit", "hexdigit", "hexdigit", "hexdigit", "hexdigit"], "postprocess": 
        function(d) {
            return {
                "r": parseInt(d[1]+d[2], 16),
                "g": parseInt(d[3]+d[4], 16),
                "b": parseInt(d[5]+d[6], 16),
            }
        }
        },
    {"name": "csscolor", "symbols": [{"literal":"#"}, "hexdigit", "hexdigit", "hexdigit"], "postprocess": 
        function(d) {
            return {
                "r": parseInt(d[1]+d[1], 16),
                "g": parseInt(d[2]+d[2], 16),
                "b": parseInt(d[3]+d[3], 16),
            }
        }
        },
    {"name": "csscolor$string$1", "symbols": [{"literal":"r"}, {"literal":"g"}, {"literal":"b"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "csscolor", "symbols": ["csscolor$string$1", "_", {"literal":"("}, "_", "colnum", "_", {"literal":","}, "_", "colnum", "_", {"literal":","}, "_", "colnum", "_", {"literal":")"}], "postprocess": $({"r": 4, "g": 8, "b": 12})},
    {"name": "csscolor$string$2", "symbols": [{"literal":"h"}, {"literal":"s"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "csscolor", "symbols": ["csscolor$string$2", "_", {"literal":"("}, "_", "colnum", "_", {"literal":","}, "_", "colnum", "_", {"literal":","}, "_", "colnum", "_", {"literal":")"}], "postprocess": $({"h": 4, "s": 8, "l": 12})},
    {"name": "csscolor$string$3", "symbols": [{"literal":"r"}, {"literal":"g"}, {"literal":"b"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "csscolor", "symbols": ["csscolor$string$3", "_", {"literal":"("}, "_", "colnum", "_", {"literal":","}, "_", "colnum", "_", {"literal":","}, "_", "colnum", "_", {"literal":","}, "_", "decimal", "_", {"literal":")"}], "postprocess": $({"r": 4, "g": 8, "b": 12, "a": 16})},
    {"name": "csscolor$string$4", "symbols": [{"literal":"h"}, {"literal":"s"}, {"literal":"l"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "csscolor", "symbols": ["csscolor$string$4", "_", {"literal":"("}, "_", "colnum", "_", {"literal":","}, "_", "colnum", "_", {"literal":","}, "_", "colnum", "_", {"literal":","}, "_", "decimal", "_", {"literal":")"}], "postprocess": $({"h": 4, "s": 8, "l": 12, "a": 16})},
    {"name": "hexdigit", "symbols": [/[a-fA-F0-9]/]},
    {"name": "colnum", "symbols": ["unsigned_int"], "postprocess": id},
    {"name": "colnum", "symbols": ["percentage"], "postprocess": 
        function(d) {return Math.floor(d[0]*255); }
        },
    {"name": "css$ebnf$1", "symbols": []},
    {"name": "css$ebnf$1", "symbols": ["css$ebnf$1", "rule"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "css", "symbols": ["css$ebnf$1"], "postprocess": id},
    {"name": "comment$string$1", "symbols": [{"literal":"/"}, {"literal":"*"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comment$ebnf$1", "symbols": []},
    {"name": "comment$ebnf$1", "symbols": ["comment$ebnf$1", /[^*]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "comment$ebnf$2", "symbols": []},
    {"name": "comment$ebnf$2$subexpression$1$ebnf$1", "symbols": [{"literal":"*"}]},
    {"name": "comment$ebnf$2$subexpression$1$ebnf$1", "symbols": ["comment$ebnf$2$subexpression$1$ebnf$1", {"literal":"*"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "comment$ebnf$2$subexpression$1$ebnf$2", "symbols": []},
    {"name": "comment$ebnf$2$subexpression$1$ebnf$2", "symbols": ["comment$ebnf$2$subexpression$1$ebnf$2", /[^*]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "comment$ebnf$2$subexpression$1", "symbols": ["comment$ebnf$2$subexpression$1$ebnf$1", /[^\/*]/, "comment$ebnf$2$subexpression$1$ebnf$2"]},
    {"name": "comment$ebnf$2", "symbols": ["comment$ebnf$2", "comment$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "comment$ebnf$3", "symbols": []},
    {"name": "comment$ebnf$3", "symbols": ["comment$ebnf$3", {"literal":"*"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "comment$string$2", "symbols": [{"literal":"*"}, {"literal":"/"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comment", "symbols": ["comment$string$1", "comment$ebnf$1", "comment$ebnf$2", "comment$ebnf$3", "comment$string$2"], "postprocess": empty},
    {"name": "comment$string$3", "symbols": [{"literal":"/"}, {"literal":"/"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comment$ebnf$4", "symbols": [/[^\n]/]},
    {"name": "comment$ebnf$4", "symbols": ["comment$ebnf$4", /[^\n]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "comment", "symbols": ["comment$string$3", "comment$ebnf$4"], "postprocess": empty},
    {"name": "rule$ebnf$1", "symbols": ["action"]},
    {"name": "rule$ebnf$1", "symbols": ["rule$ebnf$1", "action"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "rule", "symbols": ["selectors", "rule$ebnf$1", "_"], "postprocess": ([s, a, ]) => ({selectors: s, actions: a})},
    {"name": "selectors", "symbols": ["selector"]},
    {"name": "selectors", "symbols": ["selectors", "_", {"literal":","}, "_", "selector"], "postprocess": ([list, _1, _2, _3, item]) => list.concat(item)},
    {"name": "selectors", "symbols": ["nested_selector"]},
    {"name": "selector$ebnf$1", "symbols": ["class_name"], "postprocess": id},
    {"name": "selector$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selector$ebnf$2", "symbols": ["zoom"], "postprocess": id},
    {"name": "selector$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selector$ebnf$3", "symbols": ["attributes"], "postprocess": id},
    {"name": "selector$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selector$ebnf$4", "symbols": ["pseudoclasses"], "postprocess": id},
    {"name": "selector$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selector$ebnf$5", "symbols": ["layer"], "postprocess": id},
    {"name": "selector$ebnf$5", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selector", "symbols": ["type", "selector$ebnf$1", "selector$ebnf$2", "selector$ebnf$3", "selector$ebnf$4", "selector$ebnf$5", "_"], "postprocess": 
        ([type, cls, zoom, attributes, pseudoclasses, layer]) => ({
            type: type,
            zoom: zoom,
            attributes: attributes,
            pseudoclasses: pseudoclasses,
            class: cls,
            layer: layer
          })
                                                      },
    {"name": "nested_selector", "symbols": ["selector", "__", "selector"], "postprocess": ([parent, _, child]) => {child.parent = parent; return child;}},
    {"name": "nested_selector", "symbols": ["nested_selector", "__", "selector"], "postprocess": ([parent, _, child]) => {child.parent = parent; return child;}},
    {"name": "pseudoclasses$ebnf$1", "symbols": ["pseudoclass"]},
    {"name": "pseudoclasses$ebnf$1", "symbols": ["pseudoclasses$ebnf$1", "pseudoclass"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "pseudoclasses", "symbols": ["pseudoclasses$ebnf$1"], "postprocess": id},
    {"name": "pseudoclass", "symbols": ["_", {"literal":":"}, "term"], "postprocess": ([_1, _2, pseudoclass]) => pseudoclass},
    {"name": "layer$string$1", "symbols": [{"literal":":"}, {"literal":":"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "layer", "symbols": ["_", "layer$string$1", "term"], "postprocess": ([_1, _2, value]) => value},
    {"name": "attributes$ebnf$1", "symbols": ["attribute"]},
    {"name": "attributes$ebnf$1", "symbols": ["attributes$ebnf$1", "attribute"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "attributes", "symbols": ["attributes$ebnf$1"], "postprocess": id},
    {"name": "attribute", "symbols": ["_", {"literal":"["}, "predicate", {"literal":"]"}], "postprocess": ([_0, _1, predicates, _2]) => predicates},
    {"name": "predicate", "symbols": ["tag"], "postprocess": ([tag]) => ({type: "presence", key: tag})},
    {"name": "predicate", "symbols": ["tag", "operator", "value"], "postprocess": ([tag, op, value]) => ({type: "cmp", key: tag, value: value, op: op})},
    {"name": "predicate", "symbols": [{"literal":"!"}, "tag"], "postprocess": ([_, tag]) => ({type: "absence", key: tag})},
    {"name": "predicate$string$1", "symbols": [{"literal":"~"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "predicate", "symbols": ["tag", "predicate$string$1", "regexp"], "postprocess": ([tag, op, value]) => ({type: "regexp", key: tag, value: value, op: op})},
    {"name": "tag", "symbols": ["string"], "postprocess": id},
    {"name": "value", "symbols": ["string"], "postprocess": id},
    {"name": "string", "symbols": ["dqstring"], "postprocess": id},
    {"name": "string$ebnf$1", "symbols": [/[a-zA-Z0-9:_\-]/]},
    {"name": "string$ebnf$1", "symbols": ["string$ebnf$1", /[a-zA-Z0-9:_\-]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "string", "symbols": ["string$ebnf$1"], "postprocess": ([chars]) => chars.join("")},
    {"name": "term$ebnf$1", "symbols": [/[a-zA-Z0-9_]/]},
    {"name": "term$ebnf$1", "symbols": ["term$ebnf$1", /[a-zA-Z0-9_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "term", "symbols": ["term$ebnf$1"], "postprocess": ([chars]) => chars.join("")},
    {"name": "operator", "symbols": [{"literal":"="}], "postprocess": id},
    {"name": "operator$string$1", "symbols": [{"literal":"!"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "operator", "symbols": ["operator$string$1"], "postprocess": id},
    {"name": "operator", "symbols": [{"literal":"<"}], "postprocess": id},
    {"name": "operator$string$2", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "operator", "symbols": ["operator$string$2"], "postprocess": id},
    {"name": "operator", "symbols": [{"literal":">"}], "postprocess": id},
    {"name": "operator$string$3", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "operator", "symbols": ["operator$string$3"], "postprocess": id},
    {"name": "zoom", "symbols": ["_", {"literal":"|"}, /[zs]/, "zoom_interval"], "postprocess":  ([_, pipe, type, value]) => {
        	                                                value.type = type;
        	                                                return value;
        }
                                                      },
    {"name": "zoom_interval", "symbols": ["unsigned_int"], "postprocess": ([value]) => ({begin: value, end: value})},
    {"name": "zoom_interval$ebnf$1", "symbols": ["unsigned_int"], "postprocess": id},
    {"name": "zoom_interval$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "zoom_interval$ebnf$2", "symbols": ["unsigned_int"], "postprocess": id},
    {"name": "zoom_interval$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "zoom_interval", "symbols": ["zoom_interval$ebnf$1", {"literal":"-"}, "zoom_interval$ebnf$2"], "postprocess": ([begin, interval, end]) => ({begin: begin, end: end})},
    {"name": "regexp$ebnf$1", "symbols": []},
    {"name": "regexp$ebnf$1", "symbols": ["regexp$ebnf$1", "regexp_char"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "regexp$ebnf$2", "symbols": []},
    {"name": "regexp$ebnf$2", "symbols": ["regexp$ebnf$2", "regexp_flag"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "regexp", "symbols": [{"literal":"/"}, "regexp$ebnf$1", {"literal":"/"}, "regexp$ebnf$2"], "postprocess": ([_1, arr, _2, flags]) => ({regexp: arr.join(""), flags: flags.join("")})},
    {"name": "regexp_char", "symbols": [/[^\/]/]},
    {"name": "regexp_char", "symbols": [{"literal":"/"}]},
    {"name": "regexp_flag", "symbols": [{"literal":"i"}], "postprocess": id},
    {"name": "regexp_flag", "symbols": [{"literal":"g"}], "postprocess": id},
    {"name": "regexp_flag", "symbols": [{"literal":"m"}], "postprocess": id},
    {"name": "action$ebnf$1", "symbols": ["statement"]},
    {"name": "action$ebnf$1", "symbols": ["action$ebnf$1", "statement"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "action", "symbols": [{"literal":"{"}, "_", "action$ebnf$1", {"literal":"}"}, "_"], "postprocess": ([_1, _2, statements, _3, _4]) => (statements)},
    {"name": "action", "symbols": [{"literal":"{"}, "_", {"literal":"}"}], "postprocess": () => []},
    {"name": "statement", "symbols": ["string", "_", {"literal":":"}, "_", "statement_value", "_", {"literal":";"}, "_"], "postprocess": ([key, _1, _2, _3, value, _4]) => ({action: "kv", k: key, v: value})},
    {"name": "statement$string$1", "symbols": [{"literal":"e"}, {"literal":"x"}, {"literal":"i"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "statement", "symbols": ["statement$string$1", "_", {"literal":";"}, "_"], "postprocess": () => ({action: "exit"})},
    {"name": "statement$string$2", "symbols": [{"literal":"s"}, {"literal":"e"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "statement", "symbols": ["statement$string$2", "class_name", "_", {"literal":";"}, "_"], "postprocess": ([_1, cls]) => ({action: 'set_class', v: cls})},
    {"name": "statement$string$3", "symbols": [{"literal":"s"}, {"literal":"e"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "statement", "symbols": ["statement$string$3", "_", "tag", "_", {"literal":";"}, "_"], "postprocess": ([_1, _2, tag]) => ({action: 'set_tag', k: tag})},
    {"name": "statement$string$4", "symbols": [{"literal":"s"}, {"literal":"e"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "statement", "symbols": ["statement$string$4", "_", "tag", "_", {"literal":"="}, "_", "statement_value", "_", {"literal":";"}, "_"], "postprocess": ([_1, _2, tag, _3, _4, _5, value]) => ({action: 'set_tag', k: tag, v: value})},
    {"name": "class_name", "symbols": ["_", {"literal":"."}, "term"], "postprocess": ([_1, _2, cls]) => cls},
    {"name": "type$string$1", "symbols": [{"literal":"w"}, {"literal":"a"}, {"literal":"y"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$1"], "postprocess": id},
    {"name": "type$string$2", "symbols": [{"literal":"n"}, {"literal":"o"}, {"literal":"d"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$2"], "postprocess": id},
    {"name": "type$string$3", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"l"}, {"literal":"a"}, {"literal":"t"}, {"literal":"i"}, {"literal":"o"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$3"], "postprocess": id},
    {"name": "type$string$4", "symbols": [{"literal":"a"}, {"literal":"r"}, {"literal":"e"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$4"], "postprocess": id},
    {"name": "type$string$5", "symbols": [{"literal":"l"}, {"literal":"i"}, {"literal":"n"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$5"], "postprocess": id},
    {"name": "type$string$6", "symbols": [{"literal":"c"}, {"literal":"a"}, {"literal":"n"}, {"literal":"v"}, {"literal":"a"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$6"], "postprocess": id},
    {"name": "type", "symbols": [{"literal":"*"}], "postprocess": id},
    {"name": "statement_value", "symbols": ["dqstring"], "postprocess": ([x]) => ({type: 'dqstring', v: x})},
    {"name": "statement_value", "symbols": ["csscolor"], "postprocess": ([x]) => ({type: 'csscolor', v: x})},
    {"name": "statement_value", "symbols": ["uqstring"], "postprocess": ([x]) => ({type: 'uqstring', v: x})},
    {"name": "uqstring$ebnf$1", "symbols": ["spchar"]},
    {"name": "uqstring$ebnf$1", "symbols": ["uqstring$ebnf$1", "spchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "uqstring", "symbols": ["uqstring$ebnf$1"], "postprocess": ([chars]) => chars.join("")},
    {"name": "spchar", "symbols": [/[a-zA-Z0-9\-_:.,\\\/]/]}
]
  , ParserStart: "css"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
