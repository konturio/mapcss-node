'use strict';


const PLAIN_VALUE_REGEXP = /^[a-zA-Z0-9:\-\\.\/\\_,]*$/;
const ESCAPE_VALUE_REGEXP = /^.*(\/\*|\*\/|\/\/).*$/;

/**
  * Format AST back into to a text form. This class is a good example of what
  * AST looks like.
  *
  * Note: Comments are lost in translation, which makes formatter less usable
  * for pretty-printing MapCSS
  */

function format(rules) {
  return rules.map(formatRule).join("\n")
}

function formatRule(rule) {
  if ('selectors' in rule) {
    return "" + formatSelectors(rule.selectors) + " "
        + "{" + formatActions(rule.actions) + "}\n"
  }

  if ('import' in rule) {
    const imp = rule.import;

    return "@import url(" + JSON.stringify(imp.url) + ")"
        + (imp.pseudoclass ? " " + imp.pseudoclass : '')
        + ';';
  }

  throw "Unexpected rule type: " + JSON.stringify(rule);
}

function formatSelectors(selectors) {
  return selectors.map(formatSelector).join(",\n");
}

function formatSelector(selector) {
  var result = "";
  if (selector.parent) {
    result += formatSelector(selector.parent) + " "
  }

  if (selector.type) {
    result += selector.type;
  }

  if (selector.classes) {
    result += formatClasses(selector.classes);
  }

  if (selector.zoom) {
    result += formatZoom(selector.zoom);
  }

  if (selector.attributes) {
    result += selector.attributes.map(formatAttribute).join("")
  }

  if (selector.pseudoclasses) {
    result += selector.pseudoclasses.map(formatPseudoclass).join("");
  }

  if (selector.layer) {
    result += "::" + selector.layer;
  }

  return result;
}

function formatClasses(classes) {
  return classes.map(formatClass).join("");
}

function formatClass(cls) {
  return (cls.not ? '!.' : '.') + cls['class'];
}


function formatPseudoclass(pseudoclass) {
  return ":" + pseudoclass;
}

function formatZoom(zoom) {
  var str = "|" + zoom.type;
  if (zoom.begin) {
    str += zoom.begin;
  }
  if (zoom.begin != zoom.end) {
    str += '-';
    if (zoom.end) {
      str += zoom.end;
    }
  }

  return str;
}

function formatAttribute(attribute) {
  switch (attribute.type) {
  case "presence":
    return "[" + formatAttributeTag(attribute.key) + "]";
  case "absence":
    return "[!" + formatAttributeTag(attribute.key) + "]";
  case "cmp":
    return "[" + formatAttributeTag(attribute.key) + attribute.op + formatAttributeValue(attribute.value) + "]";
  case "regexp":
    return "[" + formatAttributeTag(attribute.key) + attribute.op + "/" + attribute.value.regexp + "/" + attribute.value.flags + "]";
  default:
    throw "unexpected check: " + JSON.stringify(attribute);
  }
}

function formatAttributeTag(tag) {
  if (tag.match(PLAIN_VALUE_REGEXP) && !tag.match(ESCAPE_VALUE_REGEXP)) {
    return tag;
  }

  return JSON.stringify(tag)
}

function formatAttributeValue(value) {
  if (value.match(PLAIN_VALUE_REGEXP) && !value.match(ESCAPE_VALUE_REGEXP)) {
    return value;
  }

  return JSON.stringify(value)
}

function formatActions(actions) {
  if (actions.length == 0) {
    return "\n";
  }
  return "\n" + actions.map(formatAction).join("\n") + "\n";
}

function formatAction(action) {
  switch (action.action) {
  case "kv":
    return "  " + escapeActionKey(action.k) + ": " + escapeActionValue(action.v) + ";";
  case "exit":
    return "  " + 'exit;'
  case "set_class":
    return "  " + "set " + formatClass(action.v) + ";"
  case "set_tag":
    if ('v' in action) {
      return "  " + "set " + action.k + " = " + escapeActionValue(action.v) + ";"
    } else {
      return "  " + "set " + action.k + ";"
    }
  default:
    throw "Unexpected action: " + JSON.stringify(action);
  }
}

function escapeActionKey(k) {
  return k;
}

function escapeActionValue(value) {
  switch (value.type) {
    case 'string':
      return formatAttributeValue(value.v);
    case 'csscolor':
      return formatCssColor(value.v);
    case "eval":
      return "eval(" + formatEval(value.v) + ")";
    default:
      throw "Unexpected value type " + JSON.stringify(value);
  }
}


function formatEval(eval_statement, tree=[]) {
  switch (eval_statement.type) {
    case "binary_op":
      return formatBinaryOp(
          formatEval(eval_statement.left, tree.concat(eval_statement.op)),
          eval_statement.op,
          formatEval(eval_statement.right, tree.concat(eval_statement.op)),
          tree
      );
    case "function":
      return eval_statement.func + "(" + eval_statement.args.map(formatEval).join(", ") + ")";
    case "string":
      return JSON.stringify(eval_statement.value);
    case "number":
      return "" + eval_statement.value;
    default:
      throw "Unexpected eval type " + JSON.stringify(eval_statement);
  }
}

function formatBinaryOp(left, op, right, tree) {
  const prevOp = tree.length > 0 ? tree.pop() : null;
  if ((op == '+' || op == '-') && prevOp && !(prevOp == '-' || prevOp == '+')) {
    return "(" + left + " " + op + " " + right + ")";
  } else {
    return "" + left + " " + op + " " + right + "";
  }
}

function formatCssColor(color) {
  if ('r' in color && 'g' in color && 'b' in color && 'a' in color) {
    return "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + color.a + ")";
  }
  if ('h' in color && 's' in color && 'l' in color && 'a' in color) {
    return "hsla(" + color.h + ", " + color.s + ", " + color.l + ", " + color.a + ")";
  }
  if ('h' in color && 's' in color && 'l' in color) {
    return "hsl(" + color.h + ", " + color.s + ", " + color.l + ")";
  }

  if ('r' in color && 'g' in color && 'b' in color) {
    var r = color.r.toString(16);
    var g = color.g.toString(16);
    var b = color.b.toString(16);

    r = r.length == 1 ? '0' + r : r;
    g = g.length == 1 ? '0' + g : g;
    b = b.length == 1 ? '0' + b : b;

    return "#" + r + g + b;
  }

  throw "Unexpected color type " + JSON.stringify(color);
}

const formatter = {
  format: format
}

if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
  module.exports = formatter;
} else {
  window.MapCSSFormatter = formatter;
}
