<script>
    import {Tooltip, Polyline} from 'svelte-leafletjs';
    import { track } from './store.js';

    let trackValue;

	const unsubscribe = track.subscribe(value => {
		trackValue = value;
	});
</script>

<Polyline latLngs={trackValue.coordinates.map(d=>[d[1],d[0]])} color="#000000">
    <Tooltip>Resorts World Sentosa to Vivo City</Tooltip>
</Polyline>
