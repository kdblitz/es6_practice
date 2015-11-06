'use strict';
import 'babel-polyfill';
import MapView from 'models/maps/MapView';
import MarkersView from 'models/maps/MarkersView';
import MarkerLocalStorage from 'models/persistence/MarkerLocalStorage';

const kmap = new MapView('maps').initMap({zoom:5});
const markerList = new MarkersView(kmap).regenerateList();

const markerStorage = new MarkerLocalStorage();
