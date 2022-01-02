import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class GeoMapService {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 0;
  lng = 0;
  zoom = 5
  apiUrl= environment.apiBaseUrl;
  constructor(private _http:HttpClient) {
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
   }
   async setCenterLatLong(lat,long){
     this.lat=lat;
     this.lng = long;
     this.map.flyTo({
            center: [lat,long],
            zoom: 6,
            bearing: 1,
            speed: 0.8, // make the flying slow
            curve: 0.5, // change the speed at which it zooms out

            // This can be any easing function: it takes a number between
            // 0 and 1 and returns another number between 0 and 1.
            easing: (t) => t,

            // this animation is considered essential with respect to prefers-reduced-motion
            essential: true
     })
   }
  options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams|{[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  }

  getGeoCodingFromAddress(area,city,state,country){
    return this._http.get("https://api.mapbox.com/geocoding/v5/mapbox.places/"+area+","+city+","+state+","+country+".json?limit=1&access_token=pk.eyJ1IjoidWRheWt1bWFyLTgzMjkiLCJhIjoiY2t2bWN0NDZmM29xMjMxcGdmcDh1bGQyMSJ9.WVNK0XbI0qTmNKzN8ALP_A")
  }

  getMap(){
    return this.map;
  }
  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
      antialias: true
    });

    this.map.on('load', () => {
      // Insert the layer beneath any symbol layer.
      const layers = this.map.getStyle().layers;
      const labelLayerId = layers.find(
      (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      this.map.addLayer(
      {
      'id': 'add-3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
      'fill-extrusion-color': '#aaa',

      'fill-extrusion-height': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'height']
      ],
      'fill-extrusion-base': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'min_height']
      ],
      'fill-extrusion-opacity': 0.6
      }
      },
      labelLayerId
      );
      });

    this.map.addControl(new mapboxgl.NavigationControl({ showCompass: true}));
  }
}
