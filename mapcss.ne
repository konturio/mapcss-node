@builtin "whitespace.ne"
@builtin "number.ne"

css -> rule:* {% id %}

rule -> selectors _ action _ {% ([s, _1, a, _2]) => ({selectors: s, actions: a}) %}

selectors -> selector
           | selectors _ "," _ selector {% ([list, _1, _2, _3, item]) => list.concat(item) %}
           | nest

selector -> subject {% ([subject]) => ({subject: subject}) %}

nest -> selector __ selector
      | nest __ selector
 # selector -> subject (_ zoom):? (_ criteria):? (_ subpart):? (_ within):? {%
 #  ([[subject], zoom, criteria, subpart, within]) => ({
 #      subject: subject,
 #      zoom: zoom,
 #      criteria: criteria,
 #      subpart: subpart,
 #      within: within
 #  }) %}
#           | selector __ selector {% id %}
#           | selector _ ">" _ selector

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

zoom -> "|" _ ("z"|"s") _ unsigned_int:? _ ("-" _ unsigned_int):? {% ([pipe, _0, type, _1, begin, _2, end]) => {
	return [type[0], begin, (end != null ? end[2] : null)];
}%}

string -> [a-fA-F0-9\-]:+ {% ([arr]) => arr.join("") %}
