<script lang="ts">
    import { supabase } from "./supabaseClient";
	import { onMount } from 'svelte';
	import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';


	let lng = 0;
	let lat = 0;
	let mode:"read"|"write";
	let trackName: string;

	onMount(() => {
			if (navigator.geolocation) {
				navigator.geolocation.watchPosition(displayLocationInfo, ()=>{console.log("ERROR");}, { enableHighAccuracy: false, timeout:60000, maximumAge: 0 });
		} else {
			alert("NO GEOLOCATION");
		}
		
		});


	const displayLocationInfo = (position: GeolocationPosition) =>{
		lng = position.coords.longitude;
		lat = position.coords.latitude;
		if(mode === "write"){
			console.log(lng, lat);
		}
		
	}

	const startWrite = async () => {
		trackName = uniqueNamesGenerator({
  			dictionaries: [adjectives, colors, animals],
			separator: "-"
		});
		
		
		const { data, error } = await supabase
			.rpc('addtrackpoint', {track_name: trackName, lon: lng, lat:lat})

		mode = "write";
		console.log("Writes", data);

	}
	
	const startRead = () => {
		mode = "read";
	}

	
</script>

<div class="container" style="padding: 50px 0 100px 0;">
	{#if mode==="read"}
	<div>READ</div>
	{:else if mode==="write"}
	<div>WRITE</div>
	{:else}
		<div>
			<input placeholder="track name">
			<button on:click|once={startRead}>Follow a track</button>
		</div>
		<div>
			<button on:click|once={startWrite}>Start a new track</button>
		</div>
	{/if}
</div>