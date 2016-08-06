<?php if(!defined('KIRBY')) exit ?>

title: Inhaltsbereich Geräte Kurz
pages: false
preview: parent
fields:
  title: title
  headline: headline
  copy: copy
  image: image_select
  info:
    label: Geräte
    type: info
    text: >
      Die Geräte werden in den allgemeinen Einstellungen seitenübergreifen gepflegt.
  section: section
files:
    type: image
    sortable: true
    fields:
      hotspots:
        label: Hotspots
        type: structure
        modalsize: large
        entry: >
          {{title}}<br />
          {{description}}
        fields:
          title: title
          description: description
          xpos:
            label: X-Position
            type: number
            width: 1/2
          ypos:
              label: Y-Position
              type: number
              width: 1/2
          label: Position
              type: info
              text: >
                Die Position wird in % verwendet. 0/0 ist die obere-linke Ecke des Bildes.
