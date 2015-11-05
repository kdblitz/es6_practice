'use strict';
import 'babel-polyfill';
import MapView from './models/MapView';
import MarkersView from './models/MarkersView';

const kmap = new MapView('maps').initMap({zoom:5});
const markerList = new MarkersView(kmap).regenerateList();
