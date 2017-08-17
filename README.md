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

## Shepherding Only

To my knowledge, this is the best choice of CFML grammar plugins for Atom. It also sees fairly regular [contributions](https://github.com/atuttle/atom-language-cfml/pulls?q=is%3Apr+is%3Aclosed) from the community to make it better. **But I do not personally actively develop it.**

I created this project because (1) GitHub offered a TextMate bundle conversion tool (and there was a CFML TextMate bundle available), and (2) Nobody else had created it yet. I haven't taken the time (nor do I have it to take!) to learn how to code the grammar so that I can contribute, so my contribution is only to merge incoming pull requests and release new versions. I do my best to stay on top of that.

I don't offer any warranty that this project will work perfectly or even decently now or into the future. But it probably does, because [the contributors are awesome people](https://github.com/atuttle/atom-language-cfml/graphs/contributors).

Personally I bounce back and forth between Atom and Sublime Text 3 for my own needs. Both have their strengths and weaknesses.
