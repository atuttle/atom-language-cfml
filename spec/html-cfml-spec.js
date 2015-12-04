fdescribe('html-cfml grammar', function() {
    var grammar;

    beforeEach(function() {
        waitsForPromise(function() {
            return atom.packages.activatePackage('language-html');
        });

        waitsForPromise(function() {
            return atom.packages.activatePackage('language-cfml');
        });

        runs(function() {
            grammar = atom.grammars.grammarForScopeName('text.html.cfml');
        })
    });

    it('parses the grammar', function() {
        expect(grammar).toBeTruthy();
        expect(grammar.scopeName).toBe('text.html.cfml');
    });

    describe('populating a select list', function() {
        it('should tokenize correctly', function() {
            var tokens = grammar.tokenizeLines([
                '<cfoutput>',
                '<select id="countries" name="countries">',
                '    <cfloop array="#variables.countries#" index="country">',
                '        <option value="#country.id#">#country.name#</option>',
                '    </cfloop>',
                '</select>',
                '</cfoutput>'
            ].join('\n'));

            expect(tokens[0][0]).toEqual({ value: '<', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'punctuation.definition.tag.cfml'] });
            expect(tokens[0][1]).toEqual({ value: 'cfoutput', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'entity.name.tag.cfml'] });
            expect(tokens[0][2]).toEqual({ value: '>', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'punctuation.definition.tag.cfml'] });

            expect(tokens[1][0]).toEqual({ value: '<', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'punctuation.definition.tag.begin.html'] });
            expect(tokens[1][1]).toEqual({ value: 'select', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'entity.name.tag.inline.any.html'] });
            expect(tokens[1][2]).toEqual({ value: ' ', scopes: ['text.html.cfml', 'meta.tag.inline.any.html'] });
            expect(tokens[1][3]).toEqual({ value: 'id', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'meta.attribute-with-value.id.html', 'entity.other.attribute-name.id.html'] });
            expect(tokens[1][4]).toEqual({ value: '=', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'meta.attribute-with-value.id.html', 'punctuation.separator.key-value.html'] });
            expect(tokens[1][5]).toEqual({ value: '"', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'meta.attribute-with-value.id.html', 'string.quoted.double.html', 'punctuation.definition.string.begin.html'] });
            expect(tokens[1][6]).toEqual({ value: 'countries', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'meta.attribute-with-value.id.html', 'string.quoted.double.html', 'meta.toc-list.id.html'] });
            expect(tokens[1][7]).toEqual({ value: '"', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'meta.attribute-with-value.id.html', 'string.quoted.double.html', 'punctuation.definition.string.end.html'] });
            expect(tokens[1][8]).toEqual({ value: ' ', scopes: ['text.html.cfml', 'meta.tag.inline.any.html'] });
            expect(tokens[1][9]).toEqual({ value: 'name', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'entity.other.attribute-name.html'] });
            expect(tokens[1][10]).toEqual({ value: '=', scopes: ['text.html.cfml', 'meta.tag.inline.any.html'] });
            expect(tokens[1][11]).toEqual({ value: '"', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'punctuation.definition.string.begin.html'] });
            expect(tokens[1][12]).toEqual({ value: 'countries', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html'] });
            expect(tokens[1][13]).toEqual({ value: '"', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'punctuation.definition.string.end.html'] });
            expect(tokens[1][14]).toEqual({ value: '>', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'punctuation.definition.tag.end.html'] });

            expect(tokens[2][0]).toEqual({ value: '    ', scopes: ['text.html.cfml'] });
            expect(tokens[2][1]).toEqual({ value: '<', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'punctuation.definition.tag.cfml'] });
            expect(tokens[2][2]).toEqual({ value: 'cfloop', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'entity.name.tag.cfml'] });
            expect(tokens[2][3]).toEqual({ value: ' ', scopes: ['text.html.cfml', 'meta.tag.any.cfml'] });
            expect(tokens[2][4]).toEqual({ value: 'array', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'entity.other.attribute-name.cfml'] });
            expect(tokens[2][5]).toEqual({ value: '=', scopes: ['text.html.cfml', 'meta.tag.any.cfml'] });
            expect(tokens[2][6]).toEqual({ value: '"', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'string.quoted.double.cfml', 'punctuation.definition.string.begin.cfml'] });
            expect(tokens[2][7]).toEqual({ value: '#', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'string.quoted.double.cfml', 'source.embedded.cf', 'source.embedded.punctuation.section'] });
            expect(tokens[2][8]).toEqual({ value: 'variables', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'string.quoted.double.cfml', 'source.embedded.cf', 'entity.other.scope-name'] });
            expect(tokens[2][9]).toEqual({ value: '.', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'string.quoted.double.cfml', 'source.embedded.cf'] });
            expect(tokens[2][10]).toEqual({ value: 'countries', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'string.quoted.double.cfml', 'source.embedded.cf'] });
            expect(tokens[2][11]).toEqual({ value: '#', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'string.quoted.double.cfml', 'source.embedded.cf', 'source.embedded.punctuation.section'] });
            expect(tokens[2][12]).toEqual({ value: '"', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'string.quoted.double.cfml', 'punctuation.definition.string.end.cfml'] });
            expect(tokens[2][13]).toEqual({ value: ' ', scopes: ['text.html.cfml', 'meta.tag.any.cfml'] });
            expect(tokens[2][14]).toEqual({ value: 'index', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'entity.other.attribute-name.cfml'] });
            expect(tokens[2][15]).toEqual({ value: '=', scopes: ['text.html.cfml', 'meta.tag.any.cfml'] });
            expect(tokens[2][16]).toEqual({ value: '"', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'string.quoted.double.cfml', 'punctuation.definition.string.begin.cfml'] });
            expect(tokens[2][17]).toEqual({ value: 'country', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'string.quoted.double.cfml'] });
            expect(tokens[2][18]).toEqual({ value: '"', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'string.quoted.double.cfml', 'punctuation.definition.string.end.cfml'] });
            expect(tokens[2][19]).toEqual({ value: '>', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'punctuation.definition.tag.cfml'] });

            expect(tokens[3][0]).toEqual({ value: '        ', scopes: ['text.html.cfml'] });
            expect(tokens[3][1]).toEqual({ value: '<', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'punctuation.definition.tag.begin.html'] });
            expect(tokens[3][2]).toEqual({ value: 'option', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'entity.name.tag.inline.any.html'] });
            expect(tokens[3][3]).toEqual({ value: ' ', scopes: ['text.html.cfml', 'meta.tag.inline.any.html'] });
            expect(tokens[3][4]).toEqual({ value: 'value', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'entity.other.attribute-name.html'] });
            expect(tokens[3][5]).toEqual({ value: '=', scopes: ['text.html.cfml', 'meta.tag.inline.any.html'] });
            expect(tokens[3][6]).toEqual({ value: '"', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'punctuation.definition.string.begin.html'] });
            expect(tokens[3][7]).toEqual({ value: '#', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'source.embedded.cf', 'source.embedded.punctuation.section'] });
            expect(tokens[3][8]).toEqual({ value: 'country.id', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'source.embedded.cf'] });
            expect(tokens[3][9]).toEqual({ value: '#', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'source.embedded.cf', 'source.embedded.punctuation.section'] });
            expect(tokens[3][10]).toEqual({ value: '"', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'punctuation.definition.string.end.html'] });
            expect(tokens[3][11]).toEqual({ value: '>', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'punctuation.definition.tag.end.html'] });
            expect(tokens[3][12]).toEqual({ value: '#', scopes: ['text.html.cfml', 'source.embedded.cf', 'source.embedded.punctuation.section'] });
            expect(tokens[3][13]).toEqual({ value: 'country.name', scopes: ['text.html.cfml', 'source.embedded.cf'] });
            expect(tokens[3][14]).toEqual({ value: '#', scopes: ['text.html.cfml', 'source.embedded.cf', 'source.embedded.punctuation.section'] });
            expect(tokens[3][15]).toEqual({ value: '</', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'punctuation.definition.tag.begin.html'] });
            expect(tokens[3][16]).toEqual({ value: 'option', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'entity.name.tag.inline.any.html'] });
            expect(tokens[3][17]).toEqual({ value: '>', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'punctuation.definition.tag.end.html'] });

            expect(tokens[4][0]).toEqual({ value: '    ', scopes: ['text.html.cfml'] });
            expect(tokens[4][1]).toEqual({ value: '</', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'punctuation.definition.tag.cfml'] });
            expect(tokens[4][2]).toEqual({ value: 'cfloop', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'entity.name.tag.cfml'] });
            expect(tokens[4][3]).toEqual({ value: '>', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'punctuation.definition.tag.cfml'] });

            expect(tokens[5][0]).toEqual({ value: '</', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'punctuation.definition.tag.begin.html'] });
            expect(tokens[5][1]).toEqual({ value: 'select', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'entity.name.tag.inline.any.html'] });
            expect(tokens[5][2]).toEqual({ value: '>', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'punctuation.definition.tag.end.html'] });

            expect(tokens[6][0]).toEqual({ value: '</', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'punctuation.definition.tag.cfml'] });
            expect(tokens[6][1]).toEqual({ value: 'cfoutput', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'entity.name.tag.cfml'] });
            expect(tokens[6][2]).toEqual({ value: '>', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'punctuation.definition.tag.cfml'] });
        });
    });

    describe('tokenizing cfcomments', function() {
        it('should tokenize cfcomments correctly', function() {
            var tokens = grammar.tokenizeLines('<!--- cfcomment goes here --->');

            expect(tokens[0][0]).toEqual({ value: '<!---', scopes: ['text.html.cfml', 'comment.line.cfml'] });
            expect(tokens[0][1]).toEqual({ value: ' cfcomment goes here ', scopes: ['text.html.cfml', 'comment.line.cfml'] });
            expect(tokens[0][2]).toEqual({ value: '--->', scopes: ['text.html.cfml', 'comment.line.cfml'] });
        });

        it('should tokenize cfcomments embedded in html tags correctly', function() {
            var tokens = grammar.tokenizeLines('<input type="text" name="credit_card_number" <!--- embedded cfcomment ---> />');

            expect(tokens[0][0]).toEqual({ value: '<', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'punctuation.definition.tag.begin.html'] });
            expect(tokens[0][1]).toEqual({ value: 'input', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'entity.name.tag.inline.any.html'] });
            expect(tokens[0][2]).toEqual({ value: ' ', scopes: ['text.html.cfml', 'meta.tag.inline.any.html'] });
            expect(tokens[0][3]).toEqual({ value: 'type', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'entity.other.attribute-name.html'] });
            expect(tokens[0][4]).toEqual({ value: '=', scopes: ['text.html.cfml', 'meta.tag.inline.any.html'] });
            expect(tokens[0][5]).toEqual({ value: '"', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'punctuation.definition.string.begin.html'] });
            expect(tokens[0][6]).toEqual({ value: 'text', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html'] });
            expect(tokens[0][7]).toEqual({ value: '"', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'punctuation.definition.string.end.html'] });
            expect(tokens[0][8]).toEqual({ value: ' ', scopes: ['text.html.cfml', 'meta.tag.inline.any.html'] });
            expect(tokens[0][9]).toEqual({ value: 'name', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'entity.other.attribute-name.html'] });
            expect(tokens[0][10]).toEqual({ value: '=', scopes: ['text.html.cfml', 'meta.tag.inline.any.html'] });
            expect(tokens[0][11]).toEqual({ value: '"', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'punctuation.definition.string.begin.html'] });
            expect(tokens[0][12]).toEqual({ value: 'credit_card_number', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html'] });
            expect(tokens[0][13]).toEqual({ value: '"', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'punctuation.definition.string.end.html'] });
            expect(tokens[0][14]).toEqual({ value: ' ', scopes: ['text.html.cfml', 'meta.tag.inline.any.html'] });
            expect(tokens[0][15]).toEqual({ value: '<!---', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'comment.line.cfml'] });
            expect(tokens[0][16]).toEqual({ value: ' embedded cfcomment ', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'comment.line.cfml'] });
            expect(tokens[0][17]).toEqual({ value: '--->', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'comment.line.cfml'] });
            expect(tokens[0][18]).toEqual({ value: ' />', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'punctuation.definition.tag.end.html'] });
        });

        it('should not highlight hash signs in cfcomments', function() {
            var tokens = grammar.tokenizeLines('<input type="text" name="credit_card_number" <!--- #rc.name# should not be tokenized ---> />');

            expect(tokens[0][0]).toEqual({ value: '<', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'punctuation.definition.tag.begin.html'] });
            expect(tokens[0][1]).toEqual({ value: 'input', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'entity.name.tag.inline.any.html'] });
            expect(tokens[0][2]).toEqual({ value: ' ', scopes: ['text.html.cfml', 'meta.tag.inline.any.html'] });
            expect(tokens[0][3]).toEqual({ value: 'type', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'entity.other.attribute-name.html'] });
            expect(tokens[0][4]).toEqual({ value: '=', scopes: ['text.html.cfml', 'meta.tag.inline.any.html'] });
            expect(tokens[0][5]).toEqual({ value: '"', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'punctuation.definition.string.begin.html'] });
            expect(tokens[0][6]).toEqual({ value: 'text', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html'] });
            expect(tokens[0][7]).toEqual({ value: '"', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'punctuation.definition.string.end.html'] });
            expect(tokens[0][8]).toEqual({ value: ' ', scopes: ['text.html.cfml', 'meta.tag.inline.any.html'] });
            expect(tokens[0][9]).toEqual({ value: 'name', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'entity.other.attribute-name.html'] });
            expect(tokens[0][10]).toEqual({ value: '=', scopes: ['text.html.cfml', 'meta.tag.inline.any.html'] });
            expect(tokens[0][11]).toEqual({ value: '"', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'punctuation.definition.string.begin.html'] });
            expect(tokens[0][12]).toEqual({ value: 'credit_card_number', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html'] });
            expect(tokens[0][13]).toEqual({ value: '"', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'punctuation.definition.string.end.html'] });
            expect(tokens[0][14]).toEqual({ value: ' ', scopes: ['text.html.cfml', 'meta.tag.inline.any.html'] });
            expect(tokens[0][15]).toEqual({ value: '<!---', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'comment.line.cfml'] });
            expect(tokens[0][16]).toEqual({ value: ' #rc.name# should not be tokenized ', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'comment.line.cfml'] });
            expect(tokens[0][17]).toEqual({ value: '--->', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'comment.line.cfml'] });
            expect(tokens[0][18]).toEqual({ value: ' />', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'punctuation.definition.tag.end.html'] });
        });
    });

    describe('tokenization in strings', function() {

        it('should tokenize embedded cf in strings', function() {
            var tokens = grammar.tokenizeLines('<cfoutput><a href="index.cfm?action=shopping.product-details.main&amp;details=#_.detail#">#variables.white_papers[_.detail][2]#</a></cfoutput>');

            expect(tokens[0][0]).toEqual({ value: '<', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'punctuation.definition.tag.cfml'] });
            expect(tokens[0][1]).toEqual({ value: 'cfoutput', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'entity.name.tag.cfml'] });
            expect(tokens[0][2]).toEqual({ value: '>', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'punctuation.definition.tag.cfml'] });
            expect(tokens[0][3]).toEqual({ value: '<', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'punctuation.definition.tag.begin.html'] });
            expect(tokens[0][4]).toEqual({ value: 'a', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'entity.name.tag.inline.any.html'] });
            expect(tokens[0][5]).toEqual({ value: ' ', scopes: ['text.html.cfml', 'meta.tag.inline.any.html'] });
            expect(tokens[0][6]).toEqual({ value: 'href', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'entity.other.attribute-name.html'] });
            expect(tokens[0][7]).toEqual({ value: '=', scopes: ['text.html.cfml', 'meta.tag.inline.any.html'] });
            expect(tokens[0][8]).toEqual({ value: '"', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'punctuation.definition.string.begin.html'] });
            expect(tokens[0][9]).toEqual({ value: 'index.cfm?action=shopping.product-details.main', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html'] });
            expect(tokens[0][10]).toEqual({ value: '&', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'constant.character.entity.html', 'punctuation.definition.entity.html'] });
            expect(tokens[0][11]).toEqual({ value: 'amp', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'constant.character.entity.html'] });
            expect(tokens[0][12]).toEqual({ value: ';', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'constant.character.entity.html', 'punctuation.definition.entity.html'] });
            expect(tokens[0][13]).toEqual({ value: 'details=', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html'] });
            expect(tokens[0][14]).toEqual({ value: '#', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'source.embedded.cf', 'source.embedded.punctuation.section'] });
            expect(tokens[0][15]).toEqual({ value: '_.detail', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'source.embedded.cf'] });
            expect(tokens[0][16]).toEqual({ value: '#', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'source.embedded.cf', 'source.embedded.punctuation.section'] });
            expect(tokens[0][17]).toEqual({ value: '"', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'string.quoted.double.html', 'punctuation.definition.string.end.html'] });
            expect(tokens[0][18]).toEqual({ value: '>', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'punctuation.definition.tag.end.html'] });
            expect(tokens[0][19]).toEqual({ value: '#', scopes: ['text.html.cfml', 'source.embedded.cf', 'source.embedded.punctuation.section'] });
            expect(tokens[0][20]).toEqual({ value: 'variables', scopes: ['text.html.cfml', 'source.embedded.cf', 'entity.other.scope-name'] });
            expect(tokens[0][21]).toEqual({ value: '.', scopes: ['text.html.cfml', 'source.embedded.cf'] });
            expect(tokens[0][22]).toEqual({ value: 'white_papers[_.detail][2]', scopes: ['text.html.cfml', 'source.embedded.cf'] });
            expect(tokens[0][23]).toEqual({ value: '#', scopes: ['text.html.cfml', 'source.embedded.cf', 'source.embedded.punctuation.section'] });
            expect(tokens[0][24]).toEqual({ value: '</', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'punctuation.definition.tag.begin.html'] });
            expect(tokens[0][25]).toEqual({ value: 'a', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'entity.name.tag.inline.any.html'] });
            expect(tokens[0][26]).toEqual({ value: '>', scopes: ['text.html.cfml', 'meta.tag.inline.any.html', 'punctuation.definition.tag.end.html'] });
            expect(tokens[0][27]).toEqual({ value: '</', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'punctuation.definition.tag.cfml'] });
            expect(tokens[0][28]).toEqual({ value: 'cfoutput', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'entity.name.tag.cfml'] });
            expect(tokens[0][29]).toEqual({ value: '>', scopes: ['text.html.cfml', 'meta.tag.any.cfml', 'punctuation.definition.tag.cfml'] });
        });

        it('should not tokenize embedded cf that is not surrounded by a <cfoutput> tag', function() {
            // TODO
        });
    });

});
