
	<script>
    import {LeafletMap, TileLayer,Tooltip, Popup, Polyline} from 'svelte-leafletjs';
	import MapTrack from './MapTrack.svelte';
    const mapOptions = {
        center: [41.7684, 2.2539525],
        zoom: 12,
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
	
	
	