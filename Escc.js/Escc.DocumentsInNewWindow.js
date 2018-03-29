// not on public library computer
if (typeof (jQuery) != 'undefined' && navigator.userAgent.indexOf("ESCC Libraries") == -1)
{
    // Polyfill for old IE version detection. This is a cut-down version of the $.browser code removed in JQuery 1.9.0, made available at https://gist.github.com/adeelejaz/4714079
    (function (jQuery, window, undefined) {
        "use strict";

        var matched, browser;

        jQuery.uaMatch = function (ua) {
            ua = ua.toLowerCase();

            var match = /(msie) ([\w.]+)/.exec(ua) || [];

            return {
                browser: match[1] || "",
                version: match[2] || "0"
            };
        };

        // Don't clobber any existing jQuery.browser in case it's different
        if (!jQuery.browser) {
            matched = jQuery.uaMatch(window.navigator.userAgent);
            browser = {};

            if (matched.browser) {
                browser[matched.browser] = true;
                browser.version = matched.version;
            }

            jQuery.browser = browser;
        }

    })(jQuery, window);

    $(function ()
    {
        // IE <=6 uses plugins for all the formats; others only for PDF
        var iePlugins = ($.browser.msie && parseInt($.browser.version, 10) <= 6);

        // IE <=7 puts the icon at the right edge of the block box, not the inline box, which is wrong when a link wraps.
        // IE8 needs same technique because the alternative sometimes isn't applied successfully.
        var ieWrapBug = ($.browser.msie && parseInt($.browser.version, 10) <= 8);

        // Ensure these extensions open in a new window
        $("a")
        .filter(function () { return /(\.pdf|\.rtf|\.doc|\.docx|\.dot|\.dotx|\.xls|\.xlsx|\.xlt|\.xltx|\.csv|\.ppt|\.pptx|\.pps|\.ppsx|\.pot|\.potx)$/i.test($(this).attr('href')); })
        .each(function ()
        {
            var link = $(this);

            // Check whether link has been set to display: block. JQuery.css('display') gets this reliably, where this.style.display doesn't.
            // If it's a block link, apply the icon to the last word so that it stays within the block, rather than around the
            // link which puts the icon after the block on a new line.
            var blockLink = (link.css('display') == 'block');

            if (!ieWrapBug && !blockLink)
            {
                // Add a span *around* the link so that the new window icon isn't underlined in Firefox
                link.wrap('<span class="new-window">');
            }
            else
            {
                // For IE 6/7/8 and display: block links add the span around the last word so that the icon wraps with that word

                // Start by trimming the link text, and removing any tags from the end so that the last word *is* a word
                var trimmed = $.trim(link.html());
                var tagsAtEnd = '';
                while (trimmed.substring(trimmed.length - 1) == ">")
                {
                    var pos = trimmed.lastIndexOf("<");
                    if (pos == -1) break;
                    tagsAtEnd = trimmed.substring(pos) + tagsAtEnd;
                    trimmed = trimmed.substring(0, pos);
                }

                // Now wrap the tag around the last word. Include > in the match in case the last word follows a tag with no space between.
                var lastWord = trimmed.split(/[> -]/);
                lastWord = lastWord[lastWord.length - 1];
                trimmed = trimmed.substr(0, trimmed.length - lastWord.length) + '<span class="new-window">' + trimmed.substr(trimmed.length - lastWord.length) + '</span>';

                // Finally, add the end tags back on
                link.html(trimmed + tagsAtEnd);
            }

            // ...and add an audible warning of the change of context
            link.append('<span class="aural sr-only"> (opens new window)</span>');

            // ...and make it open a new window if it wouldn't already do that
            var href = this.getAttribute('href').toLowerCase();
            var pos = href.lastIndexOf(".");
            var ext = (pos == -1) ? "" : href.substr(pos);

            if (iePlugins || ext == ".pdf")
            {
                link.click(function (e) { e.preventDefault(); window.open(this.getAttribute('href'), 'doc', 'toolbar=no,location=no,directories=no,status=no,menubar=yes,scrollbars=no,resizable=yes'); });
            }
        });
    });
}