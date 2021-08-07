import { writable } from 'svelte/store';

export const track = writable({
    type: "LineString", 
    coordinates: [] as [number, number][]
});

export const mapCenter = writable([0, 0]);