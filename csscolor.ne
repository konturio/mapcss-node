# The MIT License (MIT)
#
# Copyright (c) 2014, 2015, 2016, 2017 Hardmath123
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
# https://github.com/kach/nearley/blob/master/examples/csscolor.ne
# http://www.w3.org/TR/css3-color/#colorunits

@builtin "whitespace.ne"
@builtin "number.ne"
@builtin "postprocessors.ne"

csscolor -> "#" hexdigit hexdigit hexdigit hexdigit hexdigit hexdigit {%
    function(d) {
        return {
            "r": parseInt(d[1]+d[2], 16),
            "g": parseInt(d[3]+d[4], 16),
            "b": parseInt(d[5]+d[6], 16),
        }
    }
%}
          | "#" hexdigit hexdigit hexdigit {%
    function(d) {
        return {
            "r": parseInt(d[1]+d[1], 16),
            "g": parseInt(d[2]+d[2], 16),
            "b": parseInt(d[3]+d[3], 16),
        }
    }
%}
          | "rgb"  _ "(" _ colnum _ "," _ colnum _ "," _ colnum _ ")" {% $({"r": 4, "g": 8, "b": 12}) %}
          | "hsl"  _ "(" _ colnum _ "," _ colnum _ "," _ colnum _ ")" {% $({"h": 4, "s": 8, "l": 12}) %}
          | "rgba" _ "(" _ colnum _ "," _ colnum _ "," _ colnum _ "," _ decimal _ ")" {% $({"r": 4, "g": 8, "b": 12, "a": 16}) %}
          | "hsla" _ "(" _ colnum _ "," _ colnum _ "," _ colnum _ "," _ decimal _ ")" {% $({"h": 4, "s": 8, "l": 12, "a": 16}) %}

hexdigit -> [a-fA-F0-9]
colnum -> unsigned_int {% id %} | percentage {%
    function(d) {return Math.floor(d[0]*255); }
%}
