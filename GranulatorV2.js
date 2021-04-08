/* -------------------------------------------
   Granulizer
   -------------------------------------------
 */

studio.menu.addMenuItem({
	name: "GranulizerV2.2",
	isEnabled: function () { var event = studio.window.browserCurrent(); return event && event.isOfExactType("Event"); },

	execute: function () {
		console.log("Start GranulizerV2.1");
		var seconds = studio.system.getNumber("Length of audio in seconds", "1");
		var NumMarkers = studio.system.getNumber("numbers of markers int", "1");
		var percentage = studio.system.getNumber("Percentage chance of transition", "50");
		var event = studio.window.browserCurrent();
		var markerTrack = event.markerTracks[0];
		var spacing = (seconds - 0.01) / (NumMarkers - 1);
		var position = 0;

		for (var i = 0; i < NumMarkers; i++) {
			var name = "Random" + i.toString();
			console.log(name);
			var namedMarker = markerTrack.addNamedMarker(name, position);
			position += spacing;

			var transitionPosition = Math.random() * seconds;
			var transitionMarker = markerTrack.addTransitionMarker(transitionPosition, namedMarker);
			console.log(transitionMarker.toString);
			//for (var item in transitionMarker.properties)
			//{
			//	console.log(item);
			//}
			//console.log(transitionMarker.relationships);
			transitionMarker.triggerProbabilityEnabled = true;
			transitionMarker.triggerProbability = percentage;

			if (i == 0) {
				var transitionMarker = markerTrack.addTransitionMarker(seconds, namedMarker);
            }
		}
		
	}
});