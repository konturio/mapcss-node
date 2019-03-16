# Eval Expressions

eval            -> "eval" _ "(" _ AS:? _ ")"  {% nth(4) %}

#Add and subtract
AS              -> AS _ "+" _ MD              {% ([a, _1, _2, _3, b]) => ({type: 'binary_op', op: "+", left: a, right: b}) %}
                 | AS _ "-" _ MD              {% ([a, _1, _2, _3, b]) => ({type: 'binary_op', op: "-", left: a, right: b}) %}
	               | MD                         {% id %}

# Multiply and divide
MD              -> MD _ "*" _ P               {% ([a, _1, _2, _3, b]) => ({type: 'binary_op', op: "*", left: a, right: b}) %}
                 | MD _ "/" _ P               {% ([a, _1, _2, _3, b]) => ({type: 'binary_op', op: "/", left: a, right: b}) %}
                 | P                          {% id %}

# Parentheses
P               -> "(" _ AS _ ")"             {% nth(2) %}
                 | N                          {% id %}

N               -> float                      {% ([x]) => ({type: 'number', value: x}) %}
                 | func                       {% id %}
                 | dqstring                   {% ([x]) => ({type: 'string', value: x}) %}

float           -> int "." int                {% (d) => parseFloat(d[0] + d[1] + d[2]) %}
	               | int                        {% (d) => parseInt(d[0]) %}

func            -> term _ "(" (_ function_arg):? _ ")"
                                              {% ([func, _1, _2, args]) => ({type: 'function', func: func, args: args ? args[1] : null}) %}

function_arg    -> AS                         {% ([arg]) => [arg] %}
                 | function_arg _ "," _ function_arg
                                              {% ([args, _1, _2, _3, arg]) => args.concat(arg) %}
