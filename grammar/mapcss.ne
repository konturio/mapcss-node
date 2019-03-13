@builtin "postprocessors.ne"
@builtin "whitespace.ne"
@builtin "number.ne"
@builtin "string.ne"

@include "csscolor.ne"
@include "eval.ne"

css             -> _ rule:*                   {% ([_1, rules]) => rules %}

rule            -> selectors action:+         {% ([s, a]) => ({selectors: s, actions: a ? a.reduce((x,y) => x.concat(y), []) : []}) %}
                 | import                     {% ([imp]) => ({'import' : imp}) %}

# Selectors
selectors       -> selector
                 | selectors _ "," _ selector {% ([list, _1, _2, _3, item]) => list.concat(item) %}
                 | nested_selector

selector        -> type class:* zoom:? attributes:? pseudoclasses:? layer:? _
                                              {%
                                                ([type, classes, zoom, attributes, pseudoclasses, layer]) => ({
                                                    type: type,
                                                    zoom: zoom,
                                                    attributes: attributes,
                                                    pseudoclasses: pseudoclasses,
                                                    classes: classes,
                                                    layer: layer
                                                  })
                                              %}

nested_selector -> selector __ selector       {% ([parent, _, child]) => {child.parent = parent; return child;} %}
                 | nested_selector __ selector
                                              {% ([parent, _, child]) => {child.parent = parent; return child;} %}

pseudoclasses   -> pseudoclass:+ {% id %}
pseudoclass     -> _ ":" term                 {% ([_1, _2, pseudoclass]) => pseudoclass %}

layer           -> _ "::" term                {% ([_1, _2, value]) => value %}

# Attributes selector
attributes      -> attribute:+                {% id %}

attribute       -> _ "[" predicate "]"        {% ([_0, _1, predicates, _2]) => predicates %}

predicate       -> tag                        {% ([tag]) => ({type: "presence", key: tag}) %}
                 | tag _ operator _ value     {% ([tag, _1, op, _2, value]) => ({type: "cmp", key: tag, value: value, op: op}) %}
                 | "!" tag                    {% ([_, tag]) => ({type: "absence", key: tag}) %}
                 | tag "~=" regexp            {% ([tag, op, value]) => ({type: "regexp", key: tag, value: value, op: op}) %}

tag             -> string                     {% id %}
value           -> string                     {% id %}

string          -> dqstring                   {% id %}
                 | [a-zA-Z0-9:_\-]:+          {% ([chars]) => chars.join("") %}

term            -> [a-zA-Z0-9_]:+             {% ([chars]) => chars.join("") %}

operator        -> "="                        {% id %}
                 | "!="                       {% id %}
                 | "<"                        {% id %}
                 | "<="                       {% id %}
                 | ">"                        {% id %}
                 | ">="                       {% id %}

# Zoom selectors
zoom            -> _ "|" [zs] zoom_interval   {% ([_, pipe, type, value]) => {
	                                                 value.type = type;
	                                                 return value;
                                                 }
                                              %}

zoom_interval   -> unsigned_int               {% ([value]) => ({begin: value, end: value}) %}
	  		         | unsigned_int:? "-" unsigned_int:?
                                              {% ([begin, interval, end]) => ({begin: begin, end: end}) %}

# Regular Expressions

regexp          -> "/" regexp_char:* "/" regexp_flag:*
                                              {% ([_1, arr, _2, flags]) => ({regexp: arr.join(""), flags: flags.join("")}) %}

regexp_char     -> [^/]
                 | "\/"

regexp_flag     -> "i"
                 | "g"
                 | "m"

# Actions in curly braces block

action          -> "{" _ statement:+ "}" _    {% ([_1, _2, statements, _3, _4]) => (statements) %}
                 | "{" _ "}" _                {% () => [] %}

statement       -> string _ ":" _ statement_value _ ";" _
                                              {% ([key, _1, _2, _3, value, _4]) => ({action: "kv", k: key, v: value}) %}
                 | "exit" _ ";" _             {% () => ({action: "exit"}) %}
                 | "set" class _ ";" _        {% ([_1, cls]) => ({action: 'set_class', v: cls}) %}
                 | "set" _ tag _ ";" _        {% ([_1, _2, tag]) => ({action: 'set_tag', k: tag}) %}
                 | "set" _ tag _ "=" _ statement_value _ ";" _
                                              {% ([_1, _2, tag, _3, _4, _5, value]) => ({action: 'set_tag', k: tag, v: value}) %}

class           -> _ ("!" _):? "." term       {% ([_1, not, _2, cls]) => ({'class': cls, not: not ? !!not : false}) %}


type            -> "way"                      {% id %}
                 | "node"                     {% id %}
                 | "relation"                 {% id %}
                 | "area"                     {% id %}
                 | "line"                     {% id %}
                 | "canvas"                   {% id %}
                 | "*"                        {% id %}

statement_value -> dqstring                   {% ([x]) => ({type: 'string', v: x}) %}
                 | csscolor                   {% ([x]) => ({type: 'csscolor', v: x}) %}
                 | eval                       {% ([x]) => ({type: 'eval', v: x}) %}
                 | uqstring                   {% ([x]) => ({type: 'string', v: x}) %}

# imports
import          -> "@import" _ "url" _ "(" _ dqstring _ ")" (_ term):? _ ";"
                                              {% (d) => ({ url: d[6], pseudoclass: d[9] ? d[9][1] : null}) %}


# Unquoted string containing punctuation marks
uqstring        -> spchar:+                   {% ([chars]) => chars.join("") %}

spchar          -> [a-zA-Z0-9\-_:.,\\\/]

# Comments
mcomment        -> "/*" [^*]:* ("*":+ [^/*] [^*]:*):* "*":* "*/"
                                              {% () => null %}
                 | "//" [^\n]:*               {% () => null %}

# Treat comments as a whitespace characters

wschar          -> mcomment                   {% () => null %}
