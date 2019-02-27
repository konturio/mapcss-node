// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
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
    {"name": "css$ebnf$1", "symbols": []},
    {"name": "css$ebnf$1", "symbols": ["css$ebnf$1", "rule"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "css", "symbols": ["css$ebnf$1"], "postprocess": id},
    {"name": "rule", "symbols": ["selectors", "_", "action", "_"], "postprocess": ([s, _, a]) => ({selectors: s, actions: a})},
    {"name": "selectors", "symbols": ["selector"]},
    {"name": "selectors$string$1", "symbols": [{"literal":","}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "selectors", "symbols": ["selector", "selectors$string$1", "int"], "postprocess": ([list, _, item]) => list.concat(item)},
    {"name": "selector$ebnf$1$subexpression$1", "symbols": ["_", "zoom"]},
    {"name": "selector$ebnf$1", "symbols": ["selector$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "selector$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selector$ebnf$2$subexpression$1", "symbols": ["_", "criteria"]},
    {"name": "selector$ebnf$2", "symbols": ["selector$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "selector$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selector$ebnf$3$subexpression$1", "symbols": ["_", "subpart"]},
    {"name": "selector$ebnf$3", "symbols": ["selector$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "selector$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selector$ebnf$4$subexpression$1", "symbols": ["_", "within"]},
    {"name": "selector$ebnf$4", "symbols": ["selector$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "selector$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selector", "symbols": ["subject", "selector$ebnf$1", "selector$ebnf$2", "selector$ebnf$3", "selector$ebnf$4"], "postprocess": 
        ([subject, zoom, criteria, subpart, within]) => ({
            subject: subject,
            zoom: zoom,
            criteria: criteria,
            subpart: subpart,
            within: within
        }) },
    {"name": "subpart$string$1", "symbols": [{"literal":":"}, {"literal":":"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "subpart", "symbols": ["subpart$string$1", "_", "string"], "postprocess": ([_1, _2, value]) => value},
    {"name": "within", "symbols": [{"literal":">"}, "selector"]},
    {"name": "criteria", "symbols": [{"literal":"["}, "condition", {"literal":"]"}]},
    {"name": "criteria", "symbols": ["class"]},
    {"name": "criteria", "symbols": ["pseudoclass"]},
    {"name": "class", "symbols": [{"literal":"."}, "string"], "postprocess": id},
    {"name": "pseudoclass$string$1", "symbols": [{"literal":":"}, {"literal":":"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pseudoclass", "symbols": ["pseudoclass$string$1", "string"], "postprocess": id},
    {"name": "condition", "symbols": ["identifier", "_", "sign", "_", "identifier"]},
    {"name": "action", "symbols": [{"literal":"{"}, "_", "statements", "_", {"literal":"}"}], "postprocess": ([_1, _2, statements, _3, _4]) => (statements)},
    {"name": "statements$ebnf$1", "symbols": []},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", "statement"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["statements$ebnf$1"], "postprocess": id},
    {"name": "statement", "symbols": ["string", "_", {"literal":":"}, "_", "value", "_", {"literal":";"}], "postprocess": ([key, _1, _2, _3, value, _4]) => ({k: key, v: value})},
    {"name": "subject$string$1", "symbols": [{"literal":"w"}, {"literal":"a"}, {"literal":"y"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "subject", "symbols": ["subject$string$1"]},
    {"name": "subject$string$2", "symbols": [{"literal":"n"}, {"literal":"o"}, {"literal":"d"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "subject", "symbols": ["subject$string$2"]},
    {"name": "subject$string$3", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"l"}, {"literal":"a"}, {"literal":"t"}, {"literal":"i"}, {"literal":"o"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "subject", "symbols": ["subject$string$3"]},
    {"name": "subject$string$4", "symbols": [{"literal":"a"}, {"literal":"r"}, {"literal":"e"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "subject", "symbols": ["subject$string$4"]},
    {"name": "subject$string$5", "symbols": [{"literal":"l"}, {"literal":"i"}, {"literal":"n"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "subject", "symbols": ["subject$string$5"]},
    {"name": "subject$string$6", "symbols": [{"literal":"c"}, {"literal":"a"}, {"literal":"n"}, {"literal":"v"}, {"literal":"a"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "subject", "symbols": ["subject$string$6"]},
    {"name": "subject", "symbols": [{"literal":"*"}]},
    {"name": "value", "symbols": [{"literal":"\""}, "string", {"literal":"\""}], "postprocess": id},
    {"name": "zoom$subexpression$1", "symbols": [{"literal":"z"}]},
    {"name": "zoom$subexpression$1", "symbols": [{"literal":"s"}]},
    {"name": "zoom$ebnf$1", "symbols": ["unsigned_int"], "postprocess": id},
    {"name": "zoom$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "zoom$ebnf$2$subexpression$1", "symbols": [{"literal":"-"}, "_", "unsigned_int"]},
    {"name": "zoom$ebnf$2", "symbols": ["zoom$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "zoom$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "zoom", "symbols": [{"literal":"|"}, "_", "zoom$subexpression$1", "_", "zoom$ebnf$1", "_", "zoom$ebnf$2"], "postprocess":  ([pipe, _0, type, _1, begin, _2, end]) => {
        	return [type[0], begin, (end != null ? end[2] : null)];
        }},
    {"name": "string$ebnf$1", "symbols": [/[a-fA-F0-9\-]/]},
    {"name": "string$ebnf$1", "symbols": ["string$ebnf$1", /[a-fA-F0-9\-]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "string", "symbols": ["string$ebnf$1"], "postprocess": ([arr]) => arr.join("")}
]
  , ParserStart: "css"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
