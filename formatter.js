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
  return selector.subject
}


function formatActions(actions) {
  return "";
}

module.exports = {
  format: format
}
