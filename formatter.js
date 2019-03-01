function format(rules) {
  return rules.map(formatRule).join("\n")
}

function formatRule(rule) {
  return "" + formatSelectors(rule.selectors)
      + " {\n" + formatActions(rule.actions) + "}\n";
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
  if (tag.match(/^[a-zA-Z0-9:_]*$/)) {
    return tag;
  }

  return JSON.stringify(tag)
}

function formatAttributeValue(value) {
  if (value.match(/^[a-zA-Z0-9:_]*$/)) {
    return value;
  }

  return JSON.stringify(value)
}

function formatActions(actions) {
  return actions.map(formatAction).join("\n");
}

function formatAction(action) {
  return action.k + ": " + action.v + ";";
}

module.exports = {
  format: format
}
