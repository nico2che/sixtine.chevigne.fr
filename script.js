(function() {
    const intervalLetter = 100;
    const intervalWord = 1000;

    const spans = document.getElementsByClassName('write-effect');
    for (const span of spans) {
        const words = span.textContent.split(',');
        span.textContent = words[0];
        // start writeWord at words #1, #0 is already displayed
        setTimeout(writeWord, intervalWord, span, words, 1);
    }

    function writeWord(span, words, index) {
        removeWord(span, function() {
            addWord(span, words[index].split(''), function() {
                const nextIndex = index === words.length - 1 ? 0 : index + 1;
                setTimeout(writeWord, intervalWord, span, words, nextIndex)
            })
        });
    }

    function removeWord(span, callback) {
        span.textContent = span.textContent.slice(0, -1);
        if (span.textContent.length) {
            return setTimeout(removeWord, intervalLetter, span, callback);
        }
        if (callback) {
            callback();
        }
    }

    function addWord(span, wordArray, callback) {
        if (!wordArray.length) {
            if (callback) {
                callback();
            }
            return;
        }
        span.textContent = span.textContent + wordArray.shift();
        if (span.textContent.length) {
            return setTimeout(addWord, intervalLetter, span, wordArray, callback);
        }
    }
})();