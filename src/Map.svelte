
	<script>
    import {LeafletMap, TileLayer} from 'svelte-leafletjs';
	import MapTrack from './MapTrack.svelte';
    import { mapCenter } from './store.js';

    let mapCenterValue;

    const unsubscribe = mapCenter.subscribe(value => {
        mapCenterValue = value;
    });

    const mapOptions = {
        center: [mapCenterValue[1], mapCenterValue[0]],
        zoom: 15,
    };

	const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

	const tileLayerOptions = {
        minZoom: 0,
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: "© OpenStreetMap contributors",
    };

    

    let leafletMap;
</script>

    <LeafletMap bind:this={leafletMap} options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
		<MapTrack/>
    </LeafletMap>
	
	
	