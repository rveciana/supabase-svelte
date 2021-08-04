import {from, readDoubleBE, readDoubleLE, readUInt32LE, readUInt32BE} from 'bops'
export const convertWkb = (wkb:string) => {
    const buffer = from(wkb, "hex");
    const isBigEndian = wkb.substring(0,2) === '00';
    const epsg = isBigEndian ? readUInt32BE(buffer, 5) : readUInt32LE(buffer, 5);

    const numberOfPoints = (wkb.length - 26)/32;
    const coordinates = [];


    for(let i = 0; i < numberOfPoints; i++){
        coordinates.push([readDoubleLE(buffer, 13 + i * 16), readDoubleLE(buffer, 13 + 8 + i * 16)]);
    }

    const geoJSON =  {
        type: "LineString", 
        coordinates: coordinates
    }
  
    return geoJSON;
}

		
