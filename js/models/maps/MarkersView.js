export default class MarkersView {
  constructor(markerList) {
    this.markerList = markerList;
  }

  createListItemAngularMaterial() {
    let $list = document.createElement('md-list-item');
    let $div = document.createElement('div');
    $div.className = "md-list-item-text";

    let $label = document.createElement('h3');
    $label.innerHTML = ':D';
    let $button = document.createElement('md-button');
    $button.className = 'md-fab md-mini md-warn';
    $button.appendChild(document.createTextNode('x'));

    $list.appendChild($div);
    $div.appendChild($label);
    $div.appendChild($button);
    return $list;
  }

  createListItemBootstrap() {
    let $list = document.createElement('div');
    $list.className = 'list-group-item';

    let $label = document.createElement('span');
    $label.innerHTML = ':D';
    let $button = document.createElement('button');
    $button.className = 'btn btn-danger btn-xs pull-right';
    $button.appendChild(document.createTextNode('x'));

    $list.appendChild($label);
    $list.appendChild($button);
    return $list;
  }

  createListItemMdl(marker) {
    let $list = document.createElement('li');
    $list.className = 'mdl-navigation__link';

    let $button = document.createElement('button');
    $button.className = 'mdl-button mdl-js-button pull-right mdl-js-ripple-effect';
    let $icon = document.createElement('i');
    $icon.className = 'material-icons';
    $icon.innerHTML = 'clear';
    $button.appendChild($icon);
    $button.addEventListener('click', () => {
      marker.remove();
    });

    $list.appendChild(document.createTextNode(marker.description));
    $list.appendChild($button);
    return $list;
  }

  regenerateList() {
    let markerList = document.querySelector('[hook="markerListView"]');
    markerList.innerHTML = '';
    for (let marker of this.markerList.markers.values()) {
      markerList.appendChild(this.createListItemMdl(marker));
    }
  }

  notify() {
    this.regenerateList();
  }
}
