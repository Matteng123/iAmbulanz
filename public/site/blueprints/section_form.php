<?php if(!defined('KIRBY')) exit ?>

title: Inhaltsbereich Formular
pages: false
preview: parent
fields:
  title:
    label: Title
    type:  text
  headline: headline
  copy: copy
  formluar:
    label: Formular Felder
    type: structure
    entry: >
      Feld: <strong>{{label}}</strong><br />
      Type: {{type}}
    modalsize: large
    fields:
      label:
        label: Bezeichner
        type: text
      type:
        label: Feldtyp
        type: select
        options:
          input: A Einzeilige Eingabe
          textarea: B Mehrzeilige Eingabe
          gender: C Auswahl Anrede
          radio: D Einzelauswahl Radiobuttons
          checkbox: E Mehrfachauswahl Checkboxen
      values:
        label: Inhalte (Nur bei Auswahl D/E)
        type: tags
      variable:
        label: Variabelnamen
        type: text
      required:
        label: Pflichtfeld
        type: toggle
        text: yes/no
        default: false
        width: 1/2
      size:
        label: Breite
        type: select
        width: 1/2
        options:
          full: Volle Breite
          half: Halbe Breite
  section: section
files: false
