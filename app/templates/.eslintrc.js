module.exports = {
  "env": {
    "browser": true,
    // browser global variables
    "node": true,
    // Node.js global variables and Node.js-specific rules
    "amd": false,
    // defines require() and define() as global variables as per the amd spec
    "mocha": true,
    // adds all of the Mocha testing global variables
    "jasmine": false,
    // adds all of the Jasmine testing global variables for version 1.3 and 2.0
    "phantomjs": false,
    // phantomjs global variables
    "jquery": false,
    // jquery global variables
    "prototypejs": false,
    // prototypejs global variables
    "shelljs": false
    // shelljs global variables
  },
  "globals": {
    // e.g. "angular": true
  },
  "plugins": [
    // e.g. "react" (must run `npm install eslint-plugin-react` first)
  ],
  "parserOptions": {
    "ecmaVersion": 6
  },
  "rules": {
    ////////// Possible Errors //////////

    "comma-dangle": 0,
    // disallow trailing commas in object literals
    "no-cond-assign": 0,
    // disallow assignment in conditional expressions
    "no-console": 0,
    // disallow use of console (off by default in the node environment)
    "no-constant-condition": 0,
    // disallow use of constant expressions in conditions
    "no-control-regex": 0,
    // disallow control characters in regular expressions
    "no-debugger": 0,
    // disallow use of debugger
    "no-dupe-args": 1,
    // disallow duplicate arguments in functions
    "no-dupe-keys": 1,
    // disallow duplicate keys when creating object literals
    "no-duplicate-case": 1,
    // disallow a duplicate case label
    "no-empty-character-class": 1,
    // disallow the use of empty character classes in regular expressions
    "no-empty": 1,
    // disallow empty statements
    "no-ex-assign": 0,
    // disallow assigning to the exception in a catch block
    "no-extra-boolean-cast": 1,
    // disallow double-negation boolean casts in a boolean context
    "no-extra-parens": 0,
    // disallow unnecessary parentheses (off by default)
    "no-extra-semi": 0,
    // disallow unnecessary semicolons
    "no-func-assign": 1,
    // disallow overwriting functions written as function declarations
    "no-inner-declarations": 0,
    // disallow function or variable declarations in nested blocks
    "no-invalid-regexp": 1,
    // disallow invalid regular expression strings in the RegExp constructor
    "no-irregular-whitespace": 1,
    // disallow irregular whitespace outside of strings and comments
    "no-negated-in-lhs": 0,
    // disallow negation of the left operand of an in expression
    "no-obj-calls": 0,
    // disallow the use of object properties of the global object (Math and JSON) as functions
    "no-regex-spaces": 1,
    // disallow multiple spaces in a regular expression literal
    "no-sparse-arrays": 0,
    // disallow sparse arrays
    "no-unreachable": 1,
    // disallow unreachable statements after a return, throw, continue, or break statement
    "use-isnan": 1,
    // disallow comparisons with the value NaN
    "valid-jsdoc": 1,
    // Ensure JSDoc comments are valid (off by default)
    "valid-typeof": 1,
    // Ensure that the results of typeof are compared against a valid string
    "no-unexpected-multiline": 0,
    // Avoid code that looks like two expressions but is actually one (off by default)


    ////////// Best Practices //////////

    "accessor-pairs": 1,
    // enforces getter/setter pairs in objects (off by default)
    "block-scoped-var": 0,
    // treat var statements as if they were block scoped (off by default)
    "complexity": 0,
    // specify the maximum cyclomatic complexity allowed in a program (off by default)
    "consistent-return": 1,
    // require return statements to either always or never specify values
    "curly": 1,
    // specify curly brace conventions for all control statements
    "default-case": 1,
    // require default case in switch statements (off by default)
    "dot-notation": 0,
    // encourages use of dot notation whenever possible
    "dot-location": 0,
    // enforces consistent newlines before or after dots (off by default)
    "eqeqeq": 1,
    // require the use of === and !==
    "guard-for-in": 0,
    // make sure for-in loops have an if statement (off by default)
    "no-alert": 1,
    // disallow the use of alert, confirm, and prompt
    "no-caller": 0,
    // disallow use of arguments.caller or arguments.callee
    "no-div-regex": 0,
    // disallow division operators explicitly at beginning of regular expression (off by default)
    "no-else-return": 0,
    // disallow else after a return in an if (off by default)
    "no-eq-null": 0,
    // disallow comparisons to null without a type-checking operator (off by default)
    "no-eval": 0,
    // disallow use of eval()
    "no-extend-native": 0,
    // disallow adding to native types
    "no-extra-bind": 1,
    // disallow unnecessary function binding
    "no-fallthrough": 1,
    // disallow fallthrough of case statements
    "no-floating-decimal": 1,
    // disallow the use of leading or trailing decimal points in numeric literals (off by default)
    "no-implied-eval": 0,
    // disallow use of eval()-like methods
    "no-iterator": 1,
    // disallow usage of __iterator__ property
    "no-labels": 1,
    // disallow use of labeled statements
    "no-lone-blocks": 1,
    // disallow unnecessary nested blocks
    "no-loop-func": 0,
    // disallow creation of functions within loops
    "no-multi-spaces": 1,
    // disallow use of multiple spaces
    "no-multi-str": 0,
    // disallow use of multiline strings
    "no-native-reassign": 0,
    // disallow reassignments of native objects
    "no-new-func": 1,
    // disallow use of new operator for Function object
    "no-new-wrappers": 1,
    // disallows creating new instances of String, Number, and Boolean
    "no-new": 0,
    // disallow use of new operator when not part of the assignment or comparison
    "no-octal-escape": 0,
    // disallow use of octal escape sequences in string literals, such as var foo = "Copyright \251";
    "no-octal": 0,
    // disallow use of octal literals
    "no-param-reassign": 1,
    // disallow reassignment of function parameters (off by default)
    "no-process-env": 0,
    // disallow use of process.env (off by default)
    "no-proto": 1,
    // disallow usage of __proto__ property
    "no-redeclare": 1,
    // disallow declaring the same variable more then once
    "no-return-assign": 1,
    // disallow use of assignment in return statement
    "no-script-url": 0,
    // disallow use of javascript: urls
    "no-self-compare": 1,
    // disallow comparisons where both sides are exactly the same (off by default)
    "no-sequences": 1,
    // disallow use of comma operator
    "no-throw-literal": 0,
    // restrict what can be thrown as an exception (off by default)
    "no-unused-expressions": 0,
    // disallow usage of expressions in statement position
    "no-void": 1,
    // disallow use of void operator (off by default)
    "no-warning-comments": 0,
    // disallow usage of configurable warning terms in comments
    "no-with": 0,
    // disallow use of the with statement
    "radix": 0,
    // require use of the second argument for parseInt() (off by default)
    "vars-on-top": 0,
    // requires to declare all vars on top of their containing scope (off by default)
    "wrap-iife": 1,
    // require immediate function invocation to be wrapped in parentheses (off by default)
    "yoda": 0,
    // require or disallow Yoda conditions


    ////////// Strict Mode //////////

    "strict": 1,
    // controls location of Use Strict Directives


    ////////// Variables //////////

    "no-catch-shadow": 1,
    // disallow the catch clause parameter name being the same as a variable in the outer scope (off by default in the node environment)
    "no-delete-var": 1,
    // disallow deletion of variables
    "no-label-var": 1,
    // disallow labels that share a name with a variable
    "no-shadow": 0,
    // disallow declaration of variables already declared in the outer scope
    "no-shadow-restricted-names": 1,
    // disallow shadowing of names such as arguments
    "no-undef": 1,
    // disallow use of undeclared variables unless mentioned in a /*global */ block
    "no-undef-init": 1,
    // disallow use of undefined when initializing variables
    "no-undefined": 1,
    // disallow use of undefined variable (off by default)
    "no-unused-vars": 1,
    // disallow declaration of variables that are not used in the code
    "no-use-before-define": 0,
    // disallow use of variables before they are defined


    ////////// Node.js //////////

    "handle-callback-err": 0,
    // enforces error handling in callbacks (off by default) (on by default in the node environment)
    "no-mixed-requires": 0,
    // disallow mixing regular variable and require declarations (off by default) (on by default in the node environment)
    "no-new-require": 0,
    // disallow use of new operator with the require function (off by default) (on by default in the node environment)
    "no-path-concat": 0,
    // disallow string concatenation with __dirname and __filename (off by default) (on by default in the node environment)
    "no-process-exit": 0,
    // disallow process.exit() (on by default in the node environment)
    "no-restricted-modules": 1,
    // restrict usage of specified node modules (off by default)
    "no-sync": 0,
    // disallow use of synchronous methods (off by default)


    ////////// Stylistic Issues //////////

    "array-bracket-spacing": 1,
    // enforce spacing inside array brackets (off by default)
    "brace-style": 1,
    // enforce one true brace style (off by default)
    "camelcase": 1,
    // require camel case names
    "comma-spacing": 1,
    // enforce spacing before and after comma
    "comma-style": 1,
    // enforce one true comma style (off by default)
    "computed-property-spacing": 0,
    // require or disallow padding inside computed properties (off by default)
    "consistent-this": 0,
    // enforces consistent naming when capturing the current execution context (off by default)
    "eol-last": 1,
    // enforce newline at the end of file, with no multiple empty lines
    "func-names": 0,
    // require function expressions to have a name (off by default)
    "func-style": 0,
    // enforces use of function declarations or expressions (off by default)
    "indent": [
      "error",
      "tab"
    ],
    // this option sets a specific tab width for your code (off by default)
    "key-spacing": 1,
    // enforces spacing between keys and values in object literal properties
    "lines-around-comment": 1,
    // enforces empty lines around comments (off by default)
    "linebreak-style": 1,
    // disallow mixed 'LF' and 'CRLF' as linebreaks (off by default)
    "max-nested-callbacks": 0,
    // specify the maximum depth callbacks can be nested (off by default)
    "new-cap": 1,
    // require a capital letter for constructors
    "new-parens": 1,
    // disallow the omission of parentheses when invoking a constructor with no arguments
    "newline-after-var": 0,
    // allow/disallow an empty newline after var statement (off by default)
    "no-array-constructor": 0,
    // disallow use of the Array constructor
    "no-continue": 0,
    // disallow use of the continue statement (off by default)
    "no-inline-comments": 1,
    // disallow comments inline after code (off by default)
    "no-lonely-if": 1,
    // disallow if as the only statement in an else block (off by default)
    "no-mixed-spaces-and-tabs": 0,
    // disallow mixed spaces and tabs for indentation
    "no-multiple-empty-lines": 1,
    // disallow multiple empty lines (off by default)
    "no-nested-ternary": 0,
    // disallow nested ternary expressions (off by default)
    "no-new-object": 1,
    // disallow use of the Object constructor
    "no-spaced-func": 0,
    // disallow space between function identifier and application
    "no-ternary": 0,
    // disallow the use of ternary operators (off by default)
    "no-trailing-spaces": 1,
    // disallow trailing whitespace at the end of lines
    "no-underscore-dangle": 0,
    // disallow dangling underscores in identifiers
    "one-var": 0,
    // allow just one var statement per function (off by default)
    "operator-assignment": 0,
    // require assignment operator shorthand where possible or prohibit it entirely (off by default)
    "operator-linebreak": 1,
    // enforce operators to be placed before or after line breaks (off by default)
    "padded-blocks": 0,
    // enforce padding within blocks (off by default)
    "quote-props": 0,
    // require quotes around object literal property names (off by default)
    "quotes": 0,
    // specify whether double or single quotes should be used
    "semi-spacing": 1,
    // enforce spacing before and after semicolons
    "semi": 0,
    // require or disallow use of semicolons instead of ASI
    "sort-vars": 0,
    // sort variables within the same declaration block (off by default)
    "keyword-spacing": 1,
    // require a space after certain keywords (off by default)
    "space-before-blocks": 1,
    // require or disallow space before blocks (off by default)
    "space-before-function-paren": 1,
    // require or disallow space before function opening parenthesis (off by default)
    "space-in-parens": 1,
    // require or disallow spaces inside parentheses (off by default)
    "space-infix-ops": 1,
    // require spaces around operators
    "space-unary-ops": 1,
    // require or disallow spaces before/after unary operators (words on by default, nonwords off by default)
    "spaced-comment": 1,
    // require or disallow a space immediately following the // or /* in a comment (off by default)
    "wrap-regex": 0,
    // require regex literals to be wrapped in parentheses (off by default)


    ////////// ECMAScript 6 //////////

    "constructor-super": 0,
    // verify super() callings in constructors (off by default)
    "generator-star-spacing": 0,
    // enforce the spacing around the * in generator functions (off by default)
    "no-this-before-super": 0,
    // disallow to use this/super before super() calling in constructors (off by default)
    "no-var": 1,
    // require let or const instead of var (off by default)
    "object-shorthand": 0,
    // require method and property shorthand syntax for object literals (off by default)
    "prefer-const": 1,
    // suggest using of const declaration for variables that are never modified after declared (off by default)


    ////////// Legacy //////////

    "max-depth": 0,
    // specify the maximum depth that blocks can be nested (off by default)
    "max-len": 0,
    // specify the maximum length of a line in your program (off by default)
    "max-params": 0,
    // limits the number of parameters that can be used in the function declaration. (off by default)
    "max-statements": 0,
    // specify the maximum number of statement allowed in a function (off by default)
    "no-bitwise": 0,
    // disallow use of bitwise operators (off by default)
    "no-plusplus": 0
    // disallow use of unary operators, ++ and -- (off by default)
  }
}
