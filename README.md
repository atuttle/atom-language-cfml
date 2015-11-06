# CFML Grammar for Atom

This project is based on an auto-generated [conversion][1] of [the official CFML TextMate Bundle][2], and is under active development.

Pull requests welcome.

## Tests
[![Build Status](https://travis-ci.org/atuttle/atom-language-cfml.svg?branch=master)](https://travis-ci.org/atuttle/atom-language-cfml)

1. **Command line:** Run `apm test` from the package directory.
2. **Atom:**
   - Open the package in Atom.
   - Choose `Run Package Specs` from `View -> Developer`, the Command Pallete, or the keyboard shortcut.

## Contributing to Tests (a rough guide)
1. Create an `it('test description', function() {});` that describes the scenario.
2. Tokenize the line, e.g. `var tokens = grammar.tokenizeLines('<cfcomponent name="Test Component">');`
3. Make assertions about what classes the line should have. (I usually `console.log(tokens);` to see what is coming and add new selectors where I think they should be.)
4. Submit a pull request with your new test(s). You don't even have to fix the bug (though it would be awesome if you can)!


[1]: http://atom.io/docs/latest/converting-a-text-mate-bundle
[2]: https://github.com/textmate/coldfusion.tmbundle
