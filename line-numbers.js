var _ = require('lodash');

var TABLE_NAME = 'hljs-ln table-striped',
    LINE_NAME = 'hljs-ln-line',
    CODE_BLOCK_NAME = 'hljs-ln-code',
    NUMBERS_BLOCK_NAME = 'hljs-ln-numbers',
    NUMBER_LINE_NAME = 'hljs-ln-n',
    DATA_ATTR_NAME = 'data-line-number';

function format(str, args) {
    return str.replace(/\{(\d+)\}/g, function(m, n) {
        return args[n] ? args[n] : m;
    });
};

function lineNumbersBlock(element, options) {
    if (typeof element !== 'object') {
        return;
    }

    // define options or set default
    options = options || {
        singleLine: true // enable plugin for code block with one line
    };

    // convert options
    const firstLineIndex = !!options.singleLine ? 0 : 1;

    const lines = getLines(element.innerHTML);
    if (lines.length > firstLineIndex) {
        let html = '';

        let i = 0;
        const l = lines.length;
        for (; i < l; i++) {
            html += format(
                '<tr><td class="{0}"><div class="{1} {2}" {3}="{5}"></div></td><td class="{4}"><div class="{1}">{6}</div></td></tr>',
                [
                    NUMBERS_BLOCK_NAME, LINE_NAME, NUMBER_LINE_NAME, DATA_ATTR_NAME, CODE_BLOCK_NAME,
                    i + 1,
                    lines[i].length > 0 ? lines[i] : ' '
                ]);
        }

        if (l > 6) {
            element.innerHTML = format('<button class="copy">Copy to clipboard</button><table class="{0}">{1}</table><button class="expand" data-lines="{2}">Expand ({2} lines)</button>', [ TABLE_NAME, html, l ]);
        } else {
            element.innerHTML = format('<button class="copy">Copy to clipboard</button><table class="{0}">{1}</table>', [ TABLE_NAME, html ]);
        }
        
    }
};

function getLines(text) {
    if (text.length === 0) {
        return [];
    }
    const lines = text.split(/\r\n|\r|\n/g);
    // if last line contains only carriage return remove it
    if (_.trim(_.last(lines)) === '') {
        lines.pop();
    }
    return lines;
};

exports.lineNumbersBlock = lineNumbersBlock;