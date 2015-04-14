# YiiLog
Adds time intervals to the YiiLog and adds a bar at the bottom of the screen to show how queries are taking up your pageload time.

When working with the Yii framework (< v2), the query log at the bottom of the screen can be quite difficult to keep track of. This UserScript will add time intervals to each entry (so you can see how long it takes between each step) and creates a bar at the bottom of the screen which can be used as a query timeline to visually see how long your queries are taking in relation to each other and the page as a whole.

Install using a UserScript manager like [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) or [Greasemonkey](https://addons.mozilla.org/en-us/firefox/addon/greasemonkey/). You will need to change the `@match` URL accordingly to match the site you are debugging.
