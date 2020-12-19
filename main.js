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

		var item = document.createElement("div");
		var key = document.createElement("span");
		key.className = "legend-key";
		key.style.backgroundColor = layers[i].paint["circle-color"];

		var value = document.createElement("span");
		value.innerHTML = layers[i].id;
		item.appendChild(key);
		item.appendChild(value);
		legend.appendChild(item);
	}
});

map.on("click", function (e) {
	var features = map.queryRenderedFeatures(e.point, {
		layers: [
			"Malls",
			"Restaurants And Cafes",
			"Museum And Cultural Centers",
			"Show And Performance",
			"Sport",
			"Gallery",
			"Hotels",
			"Festival",
			"Games",
			"Educational And Art",
			"Diriyah Season",
			"Cinema",
		],
	});

	if (!features.length) {
		return;
	}

	var feature = features[0];
	console.log(feature.properties);
	let image, description, date, time, targetAud;
	if (feature.properties.Image == undefined || feature.properties.Image == "") {
		image = "";
	} else {
		image = `<img src=${feature.properties.Image} width="200px; height="200px">`;
	}

	if (
		feature.properties.Descriptio == undefined ||
		feature.properties.Descriptio == ""
	) {
		description = "";
	} else {
		description = `<p>${feature.properties.Descriptio}</p>`;
	}

	if (feature.properties.Date == undefined || feature.properties.Date == "") {
		date = "";
	} else {
		date = `<p>${feature.properties.date}</p>`;
	}

	if (feature.properties.Time == undefined || feature.properties.Time == "") {
		time = "";
	} else {
		time = `<p>${feature.properties.Time}</p>`;
	}

	if (
		feature.properties.Target_aud == undefined ||
		feature.properties.Target_aud == ""
	) {
		targetAud = "";
	} else {
		targetAud = `<p>${feature.properties.Target_aud}</p>`;
	}

	var popup = new mapboxgl.Popup({ offset: [0, 0] })
		.setLngLat(feature.geometry.coordinates)
		.setHTML(
			image +
				"<h3>" +
				feature.properties.Name +
				"</h3>" +
				description +
				time +
				targetAud +
				`<a href=${feature.properties.Website} target="_blank">` +
				"Website" +
				"</a>"
		)
		.addTo(map);
});

const legendSlider = document.querySelector("#legend-slider");
legendSlider.addEventListener("click", () => {
	const legend = document.querySelector("#legend");
	legend.classList.toggle("legend-slide");
	legendSlider.classList.toggle("slider-arrow");
});

const filterSlider = document.querySelector("#filter-slider");
filterSlider.addEventListener("click", () => {
	const filter = document.querySelector("#filter-group");
	filter.classList.toggle("filter-slide");
	filterSlider.classList.toggle("slider-arrow");
});
