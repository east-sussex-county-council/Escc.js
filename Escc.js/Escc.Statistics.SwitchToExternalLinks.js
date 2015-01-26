/*
Switch from Google Analytics report about an individual page or in-page analytics, to the list of external links tracked as events on the same page

IMPORTANT: This script is intended to be minified and used as a bookmarklet.
*/
javascript:void (function () {
    // Get shortcuts to relevant bits of current URL. URL decode it to normalise across browsers.
    var hash = decodeURIComponent(document.location.hash);

    // Get URL from querystring
    if (hash.indexOf('report/content-pages/') > -1 || hash.indexOf('report/inpage/') > -1) {
        
        // Strip off .pagePath:
        var pp = hash.indexOf('.pagePath');
        var page = hash.substring(pp + 10);
        
        // Strip off trailing /
        page = page.substring(0, page.length - 1);
        
        // Encode and use the page URL
        page = encodeURIComponent('http://www.eastsussex.gov.uk' + page);
        var url = 'https://www.google.com/analytics/web/#report/content-event-events/' + hash.substring(hash.indexOf('/', 8) + 1, pp) + '.eventCategory%3Aexternal%20links%2Canalytics.eventAction%3A' + page;

        // Strip off the active tab (eg navigation summary) if present
        var tab = url.indexOf('_r.tabId'); if (tab > -1) url = url.substring(0, tab - 3);

        // Redirect
        document.location.href = url;
    }
} ())