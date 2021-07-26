<script>
    import Map from "./Map.svelte";
    import { supabase } from "./supabaseClient";

	let geometries=[];
	let newPointName;
	let newPointLon;
	let newPointLat;
	let loading = false;

	$: areValuesValid = !!newPointName && !isNaN(newPointLat) && !isNaN(newPointLon);

	async function getData() {
	const { data, error } = await supabase
		.from('geometries')
		.select();
	if(data){
		geometries = data;
	}
	}

    

	const handleSubmit = async () => {

		if(areValuesValid){
			try {
			loading = true
			
			const { data: dataInsert, error } = await supabase.rpc('addgeomerty', {location_name: newPointName, lon: newPointLon, lat:newPointLat})
			geometries = [...geometries, ...dataInsert]
			
			if (error) throw error


		} catch (error) {

			console.log(error, error.error_description || error.message)
		} finally {
			loading = false
		}
		}	
	

	}
</script>

<div class="container" style="padding: 50px 0 100px 0;" use:getData>

	{#each geometries as { id, location_name, geom }, i}
		<div>{id}-{location_name}-{geom && geom.coordinates}</div>
	{/each}

	<Map points={geometries}/>

	<form class="row flex flex-center" on:submit|preventDefault={handleSubmit}>
		<div class="col-6 form-widget">
		  <p class="description">Add a new point to the map</p>
		  <div>
			<input
			  class="inputField"
			  type="name"
			  placeholder="Name"
			  bind:value={newPointName}
			/>
			<input
			  class="inputField"
			  type="number"
			  step="0.01"
			  placeholder="Longitude"
			  bind:value={newPointLon}
			/>
			<input
			  class="inputField"
			  type="number"
			  step="0.01"
			  placeholder="Latitude"
			  bind:value={newPointLat}
			/>

		  </div>
		  <div>
			<input type="submit" class='button block' value={loading ? "Loading" : areValuesValid ? "Upload point" : "Enter valid values"} disabled={loading || !areValuesValid} />
		  </div>
		</div>
	  </form>

</div>