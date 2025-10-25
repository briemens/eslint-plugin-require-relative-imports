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
          description: "Enforce relative imports only",
        },
        messages: {
          onlyRelative:
            "Use relative imports ('./' or '../'), not absolute imports.",
        },
        schema: [
          {
            type: "object",
            properties: {
              allowedImports: {
                type: "array",
                items: {
                  type: "string",
                },
                description:
                  "List of allowed import patterns. Strings are tested as prefix matches, strings wrapped in '/' are treated as regex (e.g., '/^lodash/')",
              },
            },
            additionalProperties: false,
          },
        ],
      },
      defaultOptions: [],
      create(context) {
        const options = context.options[0] || {};
        const allowedImports = options.allowedImports || ["node:", "@"];

        // Convert patterns to testable functions
        const patterns = allowedImports.map((pattern) => {
          // Check if it's a regex pattern (wrapped in /)
          const regexMatch = pattern.match(/^\/(.+?)\/([gimuy]*)$/);
          if (regexMatch) {
            const regex = new RegExp(regexMatch[1], regexMatch[2]);
            return (value) => regex.test(value);
          }
          // Otherwise it's a prefix match
          return (value) => value.startsWith(pattern);
        });

        return {
          ImportDeclaration(node) {
            const value = node.source.value;

            // Relative imports are always allowed
            if (value.startsWith("./") || value.startsWith("../")) {
              return;
            }

            // Check if the import matches any of the allowed patterns
            const isAllowed = patterns.some((test) => test(value));
            if (isAllowed) {
              return;
            }

            // Import is not relative and not allowed
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
