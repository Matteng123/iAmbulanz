<?php if(!defined('KIRBY')) exit ?>

title: Inhaltsbereich Slider
pages: false
preview: parent
fields:
  title:
    label: Title
    type:  text
  info:
    label: Bilderslider
    type: info
    text: >
      Der Bilderslider bedient sich der hinzugefügten Dateien. Überschrift und Text zu den Bildern werden am Bild selbst eingepflegt.
files:
    type: image
    sortable: true
    fields:
      headline: headline
      subline:
        label: Text
        type: text
      button:
        label: Button Text
        type: text
      link:
        label: Link
        type: page
