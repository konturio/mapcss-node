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

  if (selector.subject) {
    result += selector.subject;
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

  return result;
}


function formatActions(actions) {
  return "";
}

module.exports = {
  format: format
}
