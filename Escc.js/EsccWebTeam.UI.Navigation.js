/**
* Define a namespace hierarchy for our JavaScript
*/
var EsccWebTeam = { UI: { Navigation:
{
    /**
    * Open documents in new window
    */
    OpenDocumentsInNewWindows: function()
    {
        if (document.getElementsByTagName)
        {
            // new window for these file extensions
            var popupExts;
            var isOldIE = ((navigator.userAgent.indexOf("MSIE 5") > -1) || (navigator.userAgent.indexOf("MSIE 6") > -1));
            popupExts = new Array(".pdf", ".rtf", ".doc", ".xls", ".csv");

            var links = document.getElementsByTagName("a");
            var href;
            var title;
            var rel;
            for (var i = 0; i < links.length; i++)
            {
                href = links[i].getAttribute('href');
                if (href)
                {
                    for (var j = 0; j < popupExts.length; j++)
                    {
                        if (href.substring(href.length - popupExts[j].length, href.length) == popupExts[j])
                        {
                            title = links[i].getAttribute('title');
                            links[i].setAttribute('title', (title && title.length > 0) ? 'New window: ' + title : "New window: View '" + links[i].innerHTML.replace(/(<.+?>)/gi, '') + "' in " + popupExts[j].toUpperCase() + ' format');
                            rel = links[i].getAttribute('rel');
                            links[i].setAttribute('rel', rel ? rel + ' document' : 'document');

                            // IE<=6 uses plugins for all the formats; others only for PDF
                            if (isOldIE || popupExts[j] == ".pdf") links[i].onclick = EsccWebTeam.UI.Navigation.DocumentWindowLink_Click;
                        }
                    }
                }
            }
        }
    },

    /*
    * Open applications in new windows. Run this after OpenDocumentsInNewWindows if using both.
    */
    OpenAppsInNewWindows: function()
    {
        if (document.getElementsByTagName)
        {
            var links = document.getElementsByTagName('a');
            var numLinks = links.length;
            var rel;
            var regAppRel = /\bapplication\b/;
            var regAppClass = /\bms-rteCustom-application\b/;
            var regDoc = /\bdocument\b/;
            for (var i = 0; i < numLinks; i++)
            {
                rel = links[i].getAttribute('rel');
                if (rel && regAppRel.exec(rel) && !regDoc.exec(rel))
                {
                    links[i].setAttribute('title', 'Open application in new window: ' + links[i].innerHTML.replace(/(<.+?>)/gi, ''))
                    links[i].onclick = EsccWebTeam.UI.Navigation.AppWindowLink_Click;
                }
                else if (links[i].className && regAppClass.exec(links[i].className) && !regDoc.exec(rel))
                {
                    links[i].setAttribute('title', 'Open application in new window: ' + links[i].innerHTML.replace(/(<.+?>)/gi, ''))
                    links[i].onclick = EsccWebTeam.UI.Navigation.AppMinimalWindowLink_Click;
                }
            }
        }
    },

    // Open link in new window without controls
    DocumentWindowLink_Click: function(e)
    {
        window.open(this.getAttribute('href'), 'doc', 'toolbar=no,location=no,directories=no,status=no,menubar=yes,scrollbars=no,resizable=yes');
        return false;
    },

    // Open link in new window with current controls
    AppWindowLink_Click: function(e)
    {
        window.open(this.getAttribute('href'), 'app', '');
        return false;
    },

    // Open link in new window with minimal controls
    AppMinimalWindowLink_Click: function(e)
    {
        window.open(this.getAttribute('href'), 'appMinimal', 'status=yes,resizable=yes,scrollbars=yes,top=0,left=0,height=' + (screen.availHeight * 0.9) + ',width=' + (screen.availWidth * 0.95));
        return false;
    }
}}
};