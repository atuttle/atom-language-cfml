describe('cfml grammar', function() {
  var grammar;

  beforeEach(function() {
    waitsForPromise(function() {
      return atom.packages.activatePackage('language-cfml');
    });

    runs(function() {
      grammar = atom.grammars.grammarForScopeName('source.cfscript');
    })
  });

  it('parses the grammar', function() {
    expect(grammar).toBeTruthy();
    expect(grammar.scopeName).toBe('source.cfscript');
  });

  describe('scopes', function() {
    describe('tokenizing `var` correctly', function() {
      it('should tokenize correctly', function() {
        var tokens = grammar.tokenizeLines('var test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'var', scopes: ['source.cfscript', 'storage.modifier.cfml'] });
        expect(tokens[0][1]).toEqual({ value: ' test ', scopes: ['source.cfscript'] });
        expect(tokens[0][2]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });

      it('does NOT tokenize ignoring case', function() {
        var tokens = grammar.tokenizeLines('Var test = 1;');
        expect(tokens[0][0]).toEqual({ value: 'Var test ', scopes: ['source.cfscript'] });
        expect(tokens[0][1]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][2]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][3]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][4]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });

        tokens = grammar.tokenizeLines('VAR test = 1;');
        expect(tokens[0][0]).toEqual({ value: 'VAR', scopes: ['source.cfscript', 'variable.other.constant.cfml'] });
        expect(tokens[0][1]).toEqual({ value: ' test ', scopes: ['source.cfscript'] });
        expect(tokens[0][2]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });
    });

    describe('tokenizing `variables` correctly', function() {
      it('should tokenize correctly', function() {
        var tokens = grammar.tokenizeLines('variables.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'variables', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });

      it('tokenizes ignoring case', function() {
        var tokens = grammar.tokenizeLines('Variables.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'Variables', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });

        tokens = grammar.tokenizeLines('VARIABLES.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'VARIABLES', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });
    });

    describe('tokenizing `request` correctly', function() {
      it('should tokenize correctly', function() {
        var tokens = grammar.tokenizeLines('request.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'request', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });

      it('tokenizes ignoring case', function() {
        var tokens = grammar.tokenizeLines('Request.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'Request', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });

        tokens = grammar.tokenizeLines('REQUEST.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'REQUEST', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });
    });

    describe('tokenizing `cgi` correctly', function() {
      it('should tokenize correctly', function() {
        var tokens = grammar.tokenizeLines('cgi.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'cgi', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });

      it('tokenizes ignoring case', function() {
        var tokens = grammar.tokenizeLines('Cgi.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'Cgi', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });

        tokens = grammar.tokenizeLines('CGI.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'CGI', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });
    });

    describe('tokenizing `form` correctly', function() {
      it('should tokenize correctly', function() {
        var tokens = grammar.tokenizeLines('form.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'form', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });

      it('tokenizes ignoring case', function() {
        var tokens = grammar.tokenizeLines('Form.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'Form', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });

        tokens = grammar.tokenizeLines('FORM.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'FORM', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });
    });

    describe('tokenizing `url` correctly', function() {
      it('should tokenize correctly', function() {
        var tokens = grammar.tokenizeLines('url.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'url', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });

      it('tokenizes ignoring case', function() {
        var tokens = grammar.tokenizeLines('Url.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'Url', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });

        tokens = grammar.tokenizeLines('URL.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'URL', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });
    });

    describe('tokenizing `session` correctly', function() {
      it('should tokenize correctly', function() {
        var tokens = grammar.tokenizeLines('session.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'session', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });

      it('tokenizes ignoring case', function() {
        var tokens = grammar.tokenizeLines('Session.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'Session', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });

        tokens = grammar.tokenizeLines('SESSION.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'SESSION', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });
    });

    describe('tokenizing `application` correctly', function() {
      it('should tokenize correctly', function() {
        var tokens = grammar.tokenizeLines('application.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'application', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });

      it('tokenizes ignoring case', function() {
        var tokens = grammar.tokenizeLines('Application.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'Application', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });

        tokens = grammar.tokenizeLines('APPLICATION.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'APPLICATION', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });
    });

    describe('tokenizing `this` correctly', function() {
      it('should tokenize correctly', function() {
        var tokens = grammar.tokenizeLines('this.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'this', scopes: ['source.cfscript', 'variable.language.this.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });

      it('tokenizes ignoring case', function() {
        var tokens = grammar.tokenizeLines('This.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'This', scopes: ['source.cfscript', 'variable.language.this.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });

        tokens = grammar.tokenizeLines('THIS.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'THIS', scopes: ['source.cfscript', 'variable.language.this.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });
    });

    describe('tokenizing `cookie` correctly', function() {
      it('should tokenize correctly', function() {
        var tokens = grammar.tokenizeLines('cookie.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'cookie', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });

      it('tokenizes ignoring case', function() {
        var tokens = grammar.tokenizeLines('Cookie.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'Cookie', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });

        tokens = grammar.tokenizeLines('COOKIE.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'COOKIE', scopes: ['source.cfscript', 'variable.language.scope.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][2]).toEqual({ value: 'test', scopes: ['source.cfscript', 'meta.property.object.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][6]).toEqual({ value: '1', scopes: ['source.cfscript', 'constant.numeric.cfml'] });
        expect(tokens[0][7]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });
    });
  });

  describe('script-component', function() {
    it('should tokenize extends containing dashes correctly', function() {
      var tokens = grammar.tokenizeLines('component extends="app-root.mode.myParentObject" {\nfunction init() {}\n}');
      expect(tokens[0][0]).toEqual({ value: 'component', scopes: ['source.cfscript', 'meta.class.cfml', 'storage.type.class.cfml'] });
      expect(tokens[0][1]).toEqual({ value: ' ', scopes: ['source.cfscript', 'meta.class.cfml'] });
      expect(tokens[0][2]).toEqual({ value: 'extends', scopes: ['source.cfscript', 'meta.class.cfml', 'storage.modifier.extends.cfml'] });
      expect(tokens[0][3]).toEqual({ value: '=', scopes: ['source.cfscript', 'meta.class.cfml'] });
      expect(tokens[0][4]).toEqual({ value: '"', scopes: ['source.cfscript', 'meta.class.cfml', 'string.quoted.double.cfml', 'punctuation.definition.string.begin.cfml'] });
      expect(tokens[0][5]).toEqual({ value: 'app-root.mode.myParentObject', scopes: ['source.cfscript', 'meta.class.cfml', 'string.quoted.double.cfml'] });
      expect(tokens[0][6]).toEqual({ value: '"', scopes: ['source.cfscript', 'meta.class.cfml', 'string.quoted.double.cfml', 'punctuation.definition.string.end.cfml'] });
      expect(tokens[0][7]).toEqual({ value: ' ', scopes: ['source.cfscript', 'meta.class.cfml'] });
      expect(tokens[0][8]).toEqual({ value: '{', scopes: ['source.cfscript', 'meta.group.braces.curly', 'meta.brace.curly.cfml'] });
      expect(tokens[1][0]).toEqual({ value: 'function', scopes: ['source.cfscript', 'meta.group.braces.curly', 'meta.function.cfml', 'storage.type.function.cfml'] });
      expect(tokens[1][1]).toEqual({ value: ' ', scopes: ['source.cfscript', 'meta.group.braces.curly', 'meta.function.cfml'] });
      expect(tokens[1][2]).toEqual({ value: 'init', scopes: ['source.cfscript', 'meta.group.braces.curly', 'meta.function.cfml', 'entity.name.function.constructor.cfml'] });
      expect(tokens[1][3]).toEqual({ value: '(', scopes: ['source.cfscript', 'meta.group.braces.curly', 'meta.function.cfml', 'punctuation.definition.parameters.begin.cfml'] });
      expect(tokens[1][4]).toEqual({ value: ')', scopes: ['source.cfscript', 'meta.group.braces.curly', 'meta.function.cfml', 'punctuation.definition.parameters.end.cfml'] });
      expect(tokens[1][5]).toEqual({ value: ' ', scopes: ['source.cfscript', 'meta.group.braces.curly', 'meta.function.cfml'] });
      expect(tokens[1][6]).toEqual({ value: '{', scopes: ['source.cfscript', 'meta.group.braces.curly', 'meta.group.braces.curly', 'meta.brace.curly.cfml'] });
      expect(tokens[1][7]).toEqual({ value: '}', scopes: ['source.cfscript', 'meta.group.braces.curly', 'meta.group.braces.curly', 'meta.brace.curly.cfml'] });
      expect(tokens[2][0]).toEqual({ value: '}', scopes: ['source.cfscript', 'meta.group.braces.curly', 'meta.brace.curly.cfml'] });
    });
  });

  describe('embedded-cf', function() {

    it('should tokenize cfml in strings correctly', function() {
      var tokens = grammar.tokenizeLines('var fullName = "#firstName# #lastName#";');

      expect(tokens[0][0]).toEqual({ value: 'var', scopes: ['source.cfscript', 'storage.modifier.cfml'] });
      expect(tokens[0][1]).toEqual({ value: ' fullName ', scopes: ['source.cfscript'] });
      expect(tokens[0][2]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
      expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
      expect(tokens[0][4]).toEqual({ value: '"', scopes: ['source.cfscript', 'string.quoted.double.cfml'] });
      expect(tokens[0][5]).toEqual({ value: '#', scopes: ['source.cfscript', 'string.quoted.double.cfml', 'constant.character.hash.cfml'] });
      expect(tokens[0][6]).toEqual({ value: 'firstName', scopes: ['source.cfscript', 'string.quoted.double.cfml'] });
      expect(tokens[0][7]).toEqual({ value: '#', scopes: ['source.cfscript', 'string.quoted.double.cfml', 'constant.character.hash.cfml'] });
      expect(tokens[0][8]).toEqual({ value: ' ', scopes: ['source.cfscript', 'string.quoted.double.cfml'] });
      expect(tokens[0][9]).toEqual({ value: '#', scopes: ['source.cfscript', 'string.quoted.double.cfml', 'constant.character.hash.cfml'] });
      expect(tokens[0][10]).toEqual({ value: 'lastName', scopes: ['source.cfscript', 'string.quoted.double.cfml'] });
      expect(tokens[0][11]).toEqual({ value: '#', scopes: ['source.cfscript', 'string.quoted.double.cfml', 'constant.character.hash.cfml'] });
      expect(tokens[0][12]).toEqual({ value: '"', scopes: ['source.cfscript', 'string.quoted.double.cfml'] });
      expect(tokens[0][13]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
    });

    describe('tokenizing cfml in urls', function() {

      beforeEach(function() {
        waitsForPromise(function() {
          // Include this package here since it is on by default in Atom and can change the behavior of the grammar
          return atom.packages.activatePackage('language-hyperlink');
        });
      });

      xit('should tokenize cfml at the end of urls correctly', function() {
        var tokens = grammar.tokenizeLines('var reposUrl = "https://github.com/#username#";');

        expect(tokens[0][0]).toEqual({ value: 'var', scopes: ['source.cfscript', 'storage.modifier.cfml'] });
        expect(tokens[0][1]).toEqual({ value: ' reposUrl ', scopes: ['source.cfscript'] });
        expect(tokens[0][2]).toEqual({ value: '=', scopes: ['source.cfscript', 'keyword.operator.assignment.cfml'] });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['source.cfscript'] });
        expect(tokens[0][4]).toEqual({ value: '"', scopes: ['source.cfscript', 'string.quoted.double.cfml'] });
        expect(tokens[0][5]).toEqual({ value: 'https://github.com/', scopes: ['source.cfscript', 'string.quoted.double.cfml'] });
        expect(tokens[0][6]).toEqual({ value: '#', scopes: ['source.cfscript', 'string.quoted.double.cfml', 'constant.character.hash.cfml'] });
        expect(tokens[0][7]).toEqual({ value: 'username', scopes: ['source.cfscript', 'string.quoted.double.cfml'] });
        expect(tokens[0][8]).toEqual({ value: '#', scopes: ['source.cfscript', 'string.quoted.double.cfml', 'constant.character.hash.cfml'] });
        expect(tokens[0][9]).toEqual({ value: '"', scopes: ['source.cfscript', 'string.quoted.double.cfml'] });
        expect(tokens[0][10]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });

      xit('should tokenize cfml where the host name goes in urls correctly', function() {
        var tokens = grammar.tokenizeLines('setBaseURL("http://#cgi.HTTP_HOST#/#getSetting(\'AppMapping\')#/");');

        expect(tokens[0][0]).toEqual({ value: 'setBaseURL', scopes: ['source.cfscript', 'meta.function-call.cfml', 'variable.function.cfml'] });
        expect(tokens[0][1]).toEqual({ value: '(', scopes: ['source.cfscript', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'punctuation.definition.arguments.begin.cfml'] });
        expect(tokens[0][2]).toEqual({ value: '"', scopes: ['source.cfscript', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.double.cfml'] });
        expect(tokens[0][3]).toEqual({ value: 'http://', scopes: ['source.cfscript', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.double.cfml'] });
        expect(tokens[0][4]).toEqual({ value: '#', scopes: ['source.cfscript', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.double.cfml', 'constant.character.hash.cfml'] });
        expect(tokens[0][5]).toEqual({ value: 'cgi', scopes: ['source.cfscript', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.double.cfml', 'variable.language.scope.cfml'] });
        expect(tokens[0][6]).toEqual({ value: '.', scopes: ['source.cfscript', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.double.cfml', 'keyword.operator.accessor.cfml'] });
        expect(tokens[0][7]).toEqual({ value: 'HTTP_HOST', scopes: ['source.cfscript', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.double.cfml', 'variable.other.constant.cfml'] });
        expect(tokens[0][8]).toEqual({ value: '#', scopes: ['source.cfscript', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.double.cfml', 'constant.character.hash.cfml'] });
        expect(tokens[0][9]).toEqual({ value: '/', scopes: ['source.cfscript', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.double.cfml'] });
        expect(tokens[0][10]).toEqual({ value: '#', scopes: ['source.cfscript', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.double.cfml', 'constant.character.hash.cfml'] });
        expect(tokens[0][11]).toEqual({ value: 'getSetting', scopes: ['source.cfscript', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.double.cfml', 'meta.function-call.cfml', 'variable.function.cfml'] });
        expect(tokens[0][12]).toEqual({ value: '(', scopes: ['source.cfscript', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.double.cfml', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'punctuation.definition.arguments.begin.cfml'] });
        expect(tokens[0][13]).toEqual({ value: '\'', scopes: ['source.cfscript', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.double.cfml', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.single.cfml'] });
        expect(tokens[0][14]).toEqual({ value: 'AppMapping', scopes: ['source.cfscript', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.double.cfml', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.single.cfml'] });
        expect(tokens[0][15]).toEqual({ value: '\'', scopes: ['source.cfscript', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.double.cfml', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.single.cfml'] });
        expect(tokens[0][16]).toEqual({ value: ')', scopes: ['source.cfscript', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.double.cfml', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'punctuation.definition.arguments.end.cfml'] });
        expect(tokens[0][17]).toEqual({ value: '#', scopes: ['source.cfscript', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.double.cfml', 'constant.character.hash.cfml'] });
        expect(tokens[0][18]).toEqual({ value: '/', scopes: ['source.cfscript', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.double.cfml'] });
        expect(tokens[0][19]).toEqual({ value: '"', scopes: ['source.cfscript', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'string.quoted.double.cfml'] });
        expect(tokens[0][20]).toEqual({ value: ')', scopes: ['source.cfscript', 'meta.function-call.cfml', 'meta.function-call.arguments.cfml', 'punctuation.definition.arguments.end.cfml'] });
        expect(tokens[0][21]).toEqual({ value: ';', scopes: ['source.cfscript', 'punctuation.terminator.statement.cfml'] });
      });
    });
  });

});
