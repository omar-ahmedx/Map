mapboxgl.accessToken =
	"pk.eyJ1Ijoic2FyYTI0MCIsImEiOiJja2lxaDJzdzQwZHYwMzBsM3Rydmx0dmhtIn0.JQiCM00pzHLrDGlXXJATUg";
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/sara240/ckif1o9jo46sg19qrxkbo0qpt",
});

map.addControl(
	new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		mapboxgl: mapboxgl,
	})
);

map.addControl(new mapboxgl.ScaleControl(), "bottom-right");
map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

var filterGroup = document.getElementById("filter-group");
map.on("load", function () {
	let layers = map.getStyle().layers;
	for (i = 102; i < layers.length; i++) {
		let input = document.createElement("input");
		input.type = "checkbox";
		input.id = layers[i].id;
		input.checked = true;

		input.addEventListener("change", function (e) {
			map.setLayoutProperty(
				input.id,
				"visibility",
				e.target.checked ? "visible" : "none"
			);
		});
		filterGroup.appendChild(input);

		var label = document.createElement("label");
		label.setAttribute("for", layers[i].id);
		label.textContent = layers[i].id;
		filterGroup.appendChild(label);
	}
});
