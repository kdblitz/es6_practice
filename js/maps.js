'use strict';
import 'babel-polyfill';
import MapView from 'models/maps/MapView';
import MarkersView from 'models/maps/MarkersView';
import MarkerLocalStorage from 'models/persistence/MarkerLocalStorage';
import MarkerList from 'models/maps/MarkerList'

const markerList = new MarkerList();
const kmap = new MapView('maps', markerList).initMap({zoom:5});
const markersView = new MarkersView(markerList);
markerList.addChangeListener(markersView);
markersView.regenerateList();

const markerStorage = new MarkerLocalStorage();
kmap.loadData(markerStorage.loadData());
