@builtin "whitespace.ne"
@builtin "number.ne"

css -> rule:* {% id %}

rule -> selectors _ action _ {% ([s, _1, a, _2]) => ({selectors: s, actions: a}) %}

selectors -> selector
           | selectors _ "," _ selector {% ([list, _1, _2, _3, item]) => list.concat(item) %}
           | nested_selector

selector -> subject zoom:? (_ criteria):? (_ subpart):? (_ within):? {%
  ([[subject], zoom, criteria, subpart, within]) => ({
      subject: subject,
      zoom: zoom,
      criteria: criteria,
      subpart: subpart,
      within: within
  })
%}
#           | selector __ selector {% id %}
#           | selector _ ">" _ selector

nested_selector -> selector __ selector {% ([parent, _, child]) => {child.parent = parent; return child;} %}
      | nested_selector __ selector {% ([parent, _, child]) => {child.parent = parent; return child;} %}


subpart -> "::" _ string {% ([_1, _2, value]) => value %}

within -> ">" selector

criteria  -> "[" condition "]"
          | class
          | pseudoclass

class -> "." string {% id %}

pseudoclass -> "::" string {% id %}

condition -> identifier _ sign _ identifier

action -> "{" _ statement:+ _ "}" {% ([_1, _2, statements, _3, _4]) => (statements) %}
        | "{" _ "}" {% () => [] %}

#statements -> statement:* {% id %}

statement -> string _ ":" _ value _ ";" {% ([key, _1, _2, _3, value, _4]) => ({k: key, v: value}) %}


subject -> "way"
         | "node"
         | "relation"
         | "area"
         | "line"
         | "canvas"
         | "*"

value -> "\"" string "\"" {% id %}

zoom -> _ "|" [zs] zoom_interval {% ([_, pipe, type, value]) => {
	value.type = type;
	return value
} %}

zoom_interval -> unsigned_int {% ([value]) => ({begin: value, end: value})%}
	  		   | unsigned_int:? "-" unsigned_int:? {% ([begin, interval, end]) => ({begin: begin, end: end}) %}

string -> [a-fA-F0-9\-]:+ {% ([arr]) => arr.join("") %}
