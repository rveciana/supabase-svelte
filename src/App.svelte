<script lang="ts">
    import { supabase } from "./supabaseClient";
	import type { RealtimeSubscription } from '@supabase/supabase-js'
	import { onMount } from 'svelte';
	import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
	import Map from './Map.svelte';
	import { convertWkb } from './read-wkb';
	import { track } from './store.js';
	
	let lng = 0;
	let lat = 0;
	let mode:"read"|"write";
	let trackName: string;
    let mySubscription:RealtimeSubscription
		
	onMount(() => {
		
		if (navigator.geolocation) {
				navigator.geolocation.watchPosition(displayLocationInfo, ()=>{console.log("ERROR");}, { enableHighAccuracy: false, timeout:60000, maximumAge: 0 });
		} else {
			alert("NO GEOLOCATION");
		}


		});

	const displayLocationInfo = async  (position: GeolocationPosition) =>{
		lng = position.coords.longitude;
		lat = position.coords.latitude;
		if(mode === "write"){

			const {data}= await supabase
				.rpc('addtrackpoint', {track_name: trackName, lon: lng, lat:lat});
			console.log(lng, lat, "-->", data);
		}

	}

	const startWrite = async () => {
		trackName = uniqueNamesGenerator({
  			dictionaries: [adjectives, colors, animals],
			separator: "-"
		});


		const { data, error } = await supabase
			.rpc('addtrackpoint', {track_name: trackName, lon: lng, lat:lat});

		mode = "write";
		console.log("Writes", data);
		data.length>0 && track.set(data[0].geom);
	}

	const startRead = async () => {
		
		const { data, error } = await supabase
				.from('tracks')
				.select()
				.filter('name', 'eq', trackName);

		data.length>0 && track.set(data[0].geom);
		mode = "read";
		mySubscription = supabase
			.from(`tracks:name=eq.${trackName}`)
			.on('*', payload => {
				const newTrack = convertWkb(payload.new.geom);
				console.log('Change received!', newTrack);
				track.set(newTrack);
			})
			.subscribe();
	}




</script>

<div class="container" style="width: 100%; height: 100%;">
	{#if mode==="read"}
	<div>READ {trackName}</div>
	<Map/>
	{:else if mode==="write"}
	<div>WRITE {trackName}</div>
	<Map/>
	{:else}
		<div>
			<input placeholder="track name" bind:value={trackName}>
			<button on:click|once={startRead}>Follow a track</button>
		</div>
		<div>
			<button on:click|once={startWrite}>Start a new track</button>
		</div>
	{/if}
</div>