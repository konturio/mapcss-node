@builtin "whitespace.ne"
@builtin "number.ne"

css -> rule:* {% ([rules]) => rules[0] %}

rule -> selectors _ action _ {% ([s, _, a]) => ({selectors: s, actions: a}) %}

selectors -> selector
           | selector ", " int {% ([list, _, item]) => list.concat(item) %}

selector -> subject _ zoom:? _ criteria:? _ subpart:? _ within:? {% ([subject, _, zoom]) => ({subject: subject, zoom: zoom}) %}
          | selector __ selector
          | selector _ ">" _ selector

subpart -> "::" _ string {% ([_1, _2, value]) => value %}

criteria -> "[" condition "]"
          | class
          | pseudoclass

condition -> identifier _ sign _ identifier

action -> "{" _ statements _ "}" {% ([_1, _2, statements, _3, _4]) => (statements) %}

statements -> statement:* {% id %}

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
