const packageData = require("./package.json");

const plugin = {
  meta: {
    name: packageData.name,
    version: packageData.version,
    namespace: "require-relative-imports",
  },
  rules: {
    restrict: {
      name: "restrict",
      meta: {
        type: "problem",
        docs: {
          description: "Sta alleen relatieve imports toe",
        },
        messages: {
          onlyRelative:
            "Gebruik relatieve imports ('./' of '../'), geen absolute.",
        },
        schema: [],
      },
      defaultOptions: [],
      create(context) {
        return {
          ImportDeclaration(node) {
            const value = node.source.value;

            if (value.startsWith("storybook")) return;
            if (value.startsWith("node:")) return;
            if (value.startsWith("@")) return;
            if (value.startsWith("./")) return;
            if (value.startsWith("../")) return;
            if (!value.startsWith(".") && !value.includes("/")) return;

            context.report({
              node,
              messageId: "onlyRelative",
            });
          },
        };
      },
    },
  },
};

module.exports = plugin;
