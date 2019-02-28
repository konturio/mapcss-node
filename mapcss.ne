@builtin "whitespace.ne"
@builtin "number.ne"
@builtin "string.ne"

@{%
//  const tokenPrint = { literal: "print" };
  const tokenRegex = { test: x => x.match(/\/.*\//) };
%}

css -> rule:* {% id %}

rule -> selectors _ action _ {% ([s, _1, a, _2]) => ({selectors: s, actions: a}) %}

selectors -> selector
           | selectors _ "," _ selector {% ([list, _1, _2, _3, item]) => list.concat(item) %}
           | nested_selector

selector -> type zoom:? attributes:? (_ subpart):? (_ within):? {%
  ([type, zoom, attributes, subpart, within]) => ({
      type: type,
      zoom: zoom,
      attributes: attributes,
      subpart: subpart,
      within: within
  })
%}

nested_selector -> selector __ selector {% ([parent, _, child]) => {child.parent = parent; return child;} %}
      | nested_selector __ selector {% ([parent, _, child]) => {child.parent = parent; return child;} %}


subpart -> "::" _ string {% ([_1, _2, value]) => value %}

within -> ">" selector

# Attributes selector

attributes      -> attribute:+                {% id %}

attribute       -> _ "[" predicate "]"        {% ([_0, _1, predicates, _2]) => predicates %}

predicate       -> tag                        {% ([tag]) => ({type: "presence", key: tag}) %}
                 | tag operator value         {% ([tag, op, value]) => ({type: "cmp", key: tag, value: value, op: op}) %}
                 | "!" tag                    {% ([_, tag]) => ({type: "absence", key: tag}) %}
                 | tag "~=" regexp            {% ([tag, op, value]) => ({type: "regexp", key: tag, value: value, op: op}) %}

tag             -> string                     {% id %}
value           -> string                     {% id %}

string          -> dqstring                   {% id %}
                 | [a-zA-Z0-9:_]:+            {% ([chars]) => chars.join("") %}

operator        -> "="                        {% id %}
                 | "!="                       {% id %}
                 | "<"                        {% id %}
                 | "<="                       {% id %}
                 | ">"                        {% id %}
                 | ">="                       {% id %}

regexp          -> "/" regexp_char:* "/"      {% ([_1, arr, _2]) => arr.join("") %}

regexp_char     -> [^/]
                 | "\/"
#           | class
#           | pseudoclass
#
# class -> "." string {% id %}
#
# pseudoclass -> "::" string {% id %}

#condition -> identifier _ sign _ identifier

action -> "{" _ statement:+ _ "}" {% ([_1, _2, statements, _3, _4]) => (statements) %}
        | "{" _ "}" {% () => [] %}

#statements -> statement:* {% id %}

statement -> string _ ":" _ value _ ";" {% ([key, _1, _2, _3, value, _4]) => ({k: key, v: value}) %}

type    -> "way"      {% id %}
         | "node"     {% id %}
         | "relation" {% id %}
         | "area"     {% id %}
         | "line"     {% id %}
         | "canvas"   {% id %}
         | "*"        {% id %}

value -> "\"" string "\"" {% id %}

zoom -> _ "|" [zs] zoom_interval {% ([_, pipe, type, value]) => {
	value.type = type;
	return value
} %}

zoom_interval -> unsigned_int {% ([value]) => ({begin: value, end: value})%}
	  		   | unsigned_int:? "-" unsigned_int:? {% ([begin, interval, end]) => ({begin: begin, end: end}) %}
