if (typeof (jQuery) !== 'undefined') {
    "use strict";

    // jQuery is used throughout rather than $ to avoid conflicts, particularly in WordPress sites.

    // Examples of how to call this method. The tracking_id parameter must be specified when using gtag.js:
    //
    // jQuery(function () { Escc.Statistics.TrackWithGoogleAnalytics(); });
    // jQuery(function () { Escc.Statistics.TrackWithGoogleAnalytics(
    //      { 
    //          tracking_id: 'UA-xxxxxxxx-x',
    //          domains: ['eastsussex.gov.uk', 'eastsussexcc.gov.uk']
    //      });
    // });
    var Escc = {
        Statistics: {
            TrackWithGoogleAnalytics: function (options) {
                // Allow option for specific domains to be treated as internal
                var defaultOptions = { domains: [] }
                options = jQuery.extend(defaultOptions, options);
                options.domains.push(document.location.host);

                var len = options.domains.length;
                for (var i = 0; i < len; i++) options.domains[i] = options.domains[i].toLowerCase();

                // Track clicks on links with these extensions using Google Analytics
                jQuery("a")
                    .filter(function () { return /(\.pdf|\.rtf|\.doc|\.docx|\.dot|\.dotx|\.xls|\.xlsx|\.xlt|\.xltx|\.csv|\.mp3|\.wmv|\.mov|\.xml|\.ashx|\.rss|\.ical|\.hcard|\.ppt|\.pptx|\.pps|\.ppsx|\.pot|\.potx)$/i.test(jQuery(this).attr('href')); })
                    .click(function () {
                        // Track as virtual page view from Oct 2011 (not as event, because that doesn't support goals or in-page analytics)
                        if (typeof (gtag) !== 'undefined' && options.tracking_id) {
                            gtag('config', options.tracking_id, {
                                'page_title': this.innerText,
                                'page_location': this.href.toLowerCase()
                            });
                        }
                        else if (typeof (ga) !== 'undefined') {
                            ga('send', 'pageview', this.href.toLowerCase());
                        }
                    });

                // Act on all external links
                jQuery("a[href^='http']").filter(function () {
                    // Selector only targets absolute links. Isolate domain using the slashes that must be there.
                    var href = this.getAttribute('href');
                    var pos = href.indexOf("/");
                    if (pos > -1 && href.length > pos + 2) href = href.substring(pos + 2);
                    pos = href.indexOf("/");
                    if (pos > -1) href = href.substring(0, pos);

                    // See whether one of the domains regarded as internal matches the current domain. Use .indexOf
                    // rather than exact match to allow for sub-domains to match as the same site.
                    var include = true;
                    for (var i = 0; i < options.domains.length; i++) {
                        include = include && (href.indexOf(options.domains[i]) == -1);
                    }
                    return include;
                })
                    .each(function () {
                        // Add rel="external"
                        var link = jQuery(this);
                        var rel = link.attr("rel");
                        if (typeof (rel) == 'undefined') rel = "";
                        if (!rel || rel.indexOf("external") == -1) {
                            rel = (rel && rel.length > 0) ? rel + " " : "";
                            rel += "external";
                            link.attr("rel", rel);
                        }
                    })
                    .click(function () {
                        // Track in Google Analytics
                        if (typeof (gtag) !== 'undefined') {
                            gtag('event', document.URL, {
                                'event_category': 'external links',
                                'event_label': this.href,
                                'value': 0
                            });
                        }
                        else if (typeof (ga) !== 'undefined') {
                            ga('send', 'event', 'external links', document.URL, this.href, 0);
                        }
                    });

                // Track mailto: links in Google Analytics
                // Include them with "external links" so that it's fewer clicks to see where a user went from a page. Can separate the types by filtering on "mailto" if needed.
                jQuery("a[href^='mailto:']").click(function () {
                    if (typeof (gtag) !== 'undefined') {
                        gtag('event', document.URL, {
                            'event_category': 'external links',
                            'event_label': this.href,
                            'value': 0
                        });
                    }
                    else if (typeof (ga) !== 'undefined') {
                        ga('send', 'event', 'external links', document.URL, this.href, 0);
                    }
                });
            }
        }
    }
}