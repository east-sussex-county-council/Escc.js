# Escc.js

A collection of JavaScript libraries and bookmarklets designed to be re-used across multiple East Sussex County Council websites.

## Escc.Statistics.js

This configuration helper for Google Analytics tracks clicks on document downloads as virtual page views, and tracks clicks on external links and mailto: links as events. It also helps to track multiple subdomains as a single website.

To enable this additional tracking on a new website, you need four elements loaded in the following order:

1. JQuery must be loaded before `Escc.Statistics.js`. Any version is suitable as only JQuery 1.0 functions are used.
2. Next, load your own copy of `Escc.Statistics.js`, which you can get from this project. This requires JQuery and must come after it.
3. Add the standard Google Analytics tracking code. This can be before or after JQuery and `Ecc.Statistics.js`, but must be before step 4.
4. Finally, call `Escc.Statistics.TrackWithGoogleAnalytics()` to add the extra tracking.

		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>

		<script src="https://hostname/js/Escc.Statistics.js"></script>
	
		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		
		  ga('create', 'UA-XXXXXXXX-X', 'auto');
		  ga('send', 'pageview');
		
		  $(function () { Escc.Statistics.TrackWithGoogleAnalytics(); });
		</script>

You can optionally pass a list of domains which will be regarded as internal, and not tracked as external links:

 		<script>
		  	$(function () { 
				Escc.Statistics.TrackWithGoogleAnalytics({ domains: ['eastsussex.gov.uk', 'eastsussexcc.gov.uk'] }); 
			});
		</script>


## Escc.DocumentsInNewWindow.js

A JavaScript library which causes documents in formats such as PDF and Word to open in a new browser window. Requires JQuery.

(`EsccWebTeam.UI.Navigation.js` is an older version of this, still in use.) 

## Escc.Statistics.SwitchTo*.js

These are bookmarklets for switching quickly from a web page to the Google Analytics reports for that page.