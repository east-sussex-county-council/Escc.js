# Escc.js

A collection of JavaScript libraries and bookmarklets designed to be re-used across multiple East Sussex County Council websites.

[Chutzpah Test Adapter for the Test Explorer](https://marketplace.visualstudio.com/items?itemName=vs-publisher-2795.ChutzpahTestAdapterfortheTestExplorer) needs to be installed in Visual Studio to run the unit tests.

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

## cascading-content.js

When an element needs to appear specific parts of a website, `cascading-content.js` can be used to implement cascade and inherit rules to control where it is used. For example:

	if (typeof (jQuery) !== 'undefined' && typeof (cascadingContentFilter) !== 'undefined') {
	
        $.ajax({ dataType: "json", url: "https://example.org/get-some-data" }).done(function (data) {

            // Note: Must filter inheritance before cascade. If an ancestor of the current page 
			// blocks inheritance it needs to be considered when deciding how far up the tree 
			// to inherit, before it potentially gets removed if it blocks cascade as well.
            // 
            // eg
            // --- [has cascading alert]
            //     --- [has alert with no cascade, no inherit]
            //         --- [allows inherit, but should not inherit top-level alert]
            // 
            var cascade = cascadingContentFilter();
            data = cascade.filterByUrl(data, window.location.pathname);
            data = cascade.filterByInherit(data, window.location.pathname);
            data = cascade.filterByCascade(data, window.location.pathname);
            data = cascade.filterIfBlank(data, function (item) { return !$.trim(item.ExampleProperty); });

            if (data.length) {
                // display the content
            }
        });
	}

## embed-youtube.js

Include this library on a page to convert the following markup into an embedded YouTube video that resizes responsively within its parent element. This is a useful way to insert embedded videos using a rich text editor such as [TinyMCE](https://www.tinymce.com/).

	<span class="embed"><a href="https://www.youtube.com/watch?v=GRCSZIX81U4">Watch video</a></span>

or

	<a class="embed" href="https://www.youtube.com/watch?v=GRCSZIX81U4">Watch video</a>

You can also configure the following options by setting them as `data*` attributes anywhere on the page:

 * **data-video-width="int"**     - sets a fixed width for videos on the page
 * **data-video-height="int"**    - sets a fixed height for videos on the page
 * **data-video-max-width="int"** - updates the maximum width for videos (default 600px)
 * **data-video-resize="bool"**   - if set to false, disables responsive resizing of video

## Escc.GoogleMaps.js

This package includes `google-maps.min.js` and `embed-google-maps.min.js`.

Include `google-maps.min.js` on a page to gain access to a selection of utility functions on a global `esccGoogleMaps` object which help when working with the Google Maps API.

Include `embed-google-maps.min.js` as well to automatically transform links like this into an embedded Google Map:

	<span class="embed">
		<a href="https://maps.google.co.uk/maps/ms?msid=213884658669219615993.00050357ac950f9508213&amp;msa=0&amp;ll=50.93301,0.796337&amp;spn=0.025343,0.066047">Embedded map</a>
	</span>

or

	<a class="embed" href="https://maps.google.co.uk/maps/ms?msid=213884658669219615993.00050357ac950f9508213&amp;msa=0&amp;ll=50.93301,0.796337&amp;spn=0.025343,0.066047">Embedded map</a>

This requires you to set the Google Maps API key in a `data-google-maps-api-key` attribute somewhere on the page. Alternatively the API key can come from elsewhere if you call the embed function separately:

	function embedMaps(apiKeyFromSomewhere) {
		if (esccGoogleMaps) {
			esccGoogleMaps.loadGoogleMapsApi({ apiKey: apiKeyFromSomewhere, callback: "esccEmbedLinkedGoogleMap" });
		}
	}