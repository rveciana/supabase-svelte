<script>
    // https://medium.com/geekculture/using-stored-procedures-rpc-in-supabase-to-increment-a-like-counter-9c5b2293a65b
    import { geoEqualEarth, geoPath } from "d3-geo";
    import { onMount } from "svelte";
    import { feature } from "topojson";
    export let points;
    let data;
    const projection = geoEqualEarth();
    const path = geoPath().projection(projection);
  

    onMount(async function() {
      const response = await fetch(
        "https://gist.githubusercontent.com/rveciana/502db152b70cddfd554e9d48ee23e279/raw/cc51c1b46199994b123271c629541d417f2f7d86/world-110m.json"
      );
      const json = await response.json();
      const land = feature(json, json.objects.land);
      data = path(land);
      
    });
  </script>
  
  <style>
    svg {
      width: 960px;
      height: 500px;
    }
    .border {
      stroke: #444444;
      fill: #cccccc;
    }
  </style>
  
  <svg width="960" height="500">
    <path d={data} class="border" />
    {#each points.filter(d=>d.geom) as point}
        <circle r=10 cx={projection(point.geom.coordinates)[0]} cy={projection(point.geom.coordinates)[1]}/>
    {/each}
  </svg>