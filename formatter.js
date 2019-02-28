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
    result += "|" + selector.zoom.type;
    if (selector.zoom.begin) {
      result += selector.zoom.begin;
    }
    if (selector.zoom.begin != selector.zoom.end) {
      result += '-';
      if (selector.zoom.end) {
        result += selector.zoom.end;
      }
    }
  }

  if (selector.attributes) {
    result += selector.attributes.map(formatAttribute).join("")
  }

  return result;
}

function formatAttribute(attribute) {
  if (attribute.type == "presence") {
    return "[" + formatAttributeTag(attribute.key) + "]";
  } else if (attribute.type == "absence") {
    return "[!" + formatAttributeTag(attribute.key) + "]";
  } else if (attribute.type == "cmp") {
    return "[" + formatAttributeTag(attribute.key) + attribute.op + formatAttributeValue(attribute.value) + "]";
  }

  throw "unexpected check: " + JSON.stringify(attribute);
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
  return "";
}

module.exports = {
  format: format
}
