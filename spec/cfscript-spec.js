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

        expect(tokens[0][0]).toEqual({ value: 'var ', scopes: ['source.cfscript', 'storage.modifier.var'] });
        expect(tokens[0][1]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript'] });
      });

      it('does NOT tokenize ignoring case', function() {
        var tokens = grammar.tokenizeLines('Var test = 1;');
        expect(tokens[0][0]).toEqual({ value: 'Var test = 1;', scopes: ['source.cfscript'] });

        tokens = grammar.tokenizeLines('VAR test = 1;');
        expect(tokens[0][0]).toEqual({ value: 'VAR test = 1;', scopes: ['source.cfscript'] });
      });
    });

    describe('tokenizing `variables` correctly', function() {
      it('should tokenize correctly', function() {
        var tokens = grammar.tokenizeLines('variables.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'variables', scopes: ['source.cfscript', 'entity.other.scope-name'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript'] });
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript'] });
      });

      it('tokenizes ignoring case', function() {
        var tokens = grammar.tokenizeLines('Variables.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'Variables', scopes: ['source.cfscript', 'entity.other.scope-name'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript'] });
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript'] });

        tokens = grammar.tokenizeLines('VARIABLES.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'VARIABLES', scopes: ['source.cfscript', 'entity.other.scope-name'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript'] });
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript'] });
      });
    });

    describe('tokenizing `request` correctly', function() {
      it('should tokenize correctly', function() {
        var tokens = grammar.tokenizeLines('request.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'request', scopes: ['source.cfscript', 'entity.other.scope-name'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript'] });
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript'] });
      });

      it('tokenizes ignoring case', function() {
        var tokens = grammar.tokenizeLines('Request.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'Request', scopes: ['source.cfscript', 'entity.other.scope-name'] });
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript'] });
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript'] });

        tokens = grammar.tokenizeLines('REQUEST.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'REQUEST', scopes: ['source.cfscript', 'entity.other.scope-name']});
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript']});
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript']});
      });
    });

    describe('tokenizing `form` correctly', function() {
      it('should tokenize correctly', function() {
        var tokens = grammar.tokenizeLines('form.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'form', scopes: ['source.cfscript', 'entity.other.scope-name']});
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript']});
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript']});
      });

      it('tokenizes ignoring case', function() {
        var tokens = grammar.tokenizeLines('Form.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'Form', scopes: ['source.cfscript', 'entity.other.scope-name']});
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript']});
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript']});

        tokens = grammar.tokenizeLines('FORM.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'FORM', scopes: ['source.cfscript', 'entity.other.scope-name']});
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript']});
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript']});
      });
    });

    describe('tokenizing `url` correctly', function() {
      it('should tokenize correctly', function() {
        var tokens = grammar.tokenizeLines('url.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'url', scopes: ['source.cfscript', 'entity.other.scope-name']});
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript']});
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript']});
      });

      it('tokenizes ignoring case', function() {
        var tokens = grammar.tokenizeLines('Url.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'Url', scopes: ['source.cfscript', 'entity.other.scope-name']});
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript']});
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript']});

        tokens = grammar.tokenizeLines('URL.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'URL', scopes: ['source.cfscript', 'entity.other.scope-name']});
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript']});
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript']});
      });
    });

    describe('tokenizing `session` correctly', function() {
      it('should tokenize correctly', function() {
        var tokens = grammar.tokenizeLines('session.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'session', scopes: ['source.cfscript', 'entity.other.scope-name']});
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript']});
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript']});
      });

      it('tokenizes ignoring case', function() {
        var tokens = grammar.tokenizeLines('Session.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'Session', scopes: ['source.cfscript', 'entity.other.scope-name']});
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript']});
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript']});

        tokens = grammar.tokenizeLines('SESSION.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'SESSION', scopes: ['source.cfscript', 'entity.other.scope-name']});
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript']});
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript']});
      });
    });

    describe('tokenizing `application` correctly', function() {
      it('should tokenize correctly', function() {
        var tokens = grammar.tokenizeLines('application.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'application', scopes: ['source.cfscript', 'entity.other.scope-name']});
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript']});
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript']});
      });

      it('tokenizes ignoring case', function() {
        var tokens = grammar.tokenizeLines('Application.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'Application', scopes: ['source.cfscript', 'entity.other.scope-name']});
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript']});
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript']});

        tokens = grammar.tokenizeLines('APPLICATION.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'APPLICATION', scopes: ['source.cfscript', 'entity.other.scope-name']});
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript']});
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript']});
      });
    });

    describe('tokenizing `this` correctly', function() {
      it('should tokenize correctly', function() {
        var tokens = grammar.tokenizeLines('this.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'this', scopes: ['source.cfscript', 'entity.other.scope-name']});
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript']});
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript']});
      });

      it('tokenizes ignoring case', function() {
        var tokens = grammar.tokenizeLines('This.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'This', scopes: ['source.cfscript', 'entity.other.scope-name']});
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript']});
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript']});

        tokens = grammar.tokenizeLines('THIS.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'THIS', scopes: ['source.cfscript', 'entity.other.scope-name']});
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript']});
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript']});
      });
    });

    describe('tokenizing `cookie` correctly', function() {
      it('should tokenize correctly', function() {
        var tokens = grammar.tokenizeLines('cookie.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'cookie', scopes: ['source.cfscript', 'entity.other.scope-name']});
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript']});
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript']});
      });

      it('tokenizes ignoring case', function() {
        var tokens = grammar.tokenizeLines('Cookie.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'Cookie', scopes: ['source.cfscript', 'entity.other.scope-name']});
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript']});
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript']});

        tokens = grammar.tokenizeLines('COOKIE.test = 1;');

        expect(tokens[0][0]).toEqual({ value: 'COOKIE', scopes: ['source.cfscript', 'entity.other.scope-name']});
        expect(tokens[0][1]).toEqual({ value: '.', scopes: ['source.cfscript']});
        expect(tokens[0][2]).toEqual({ value: 'test = 1;', scopes: ['source.cfscript']});
      });
    });
  });



});
