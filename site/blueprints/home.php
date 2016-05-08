<?php if(!defined('KIRBY')) exit ?>

title: Home
pages: false
fields:
  title:
    label: Title
    type:  text
  section1:
  	label: Standorte
  	type: headline
  	size:  large
  headline1:
    label: Überschrift
    type:  text
    size:  large
  text1:
    label: Text
    type:  textarea
    size:  large
  button1:
    label: Button Text
    type:  text
    width: 1/2
  link1:
    label: Button Link
    type: page
    width: 1/2
  section2:
  	label: Geräte
  	type: headline
  	size:  large
  headline2:
    label: Überschrift
    type:  text
    size:  large
  text2:
    label: Text
    type:  textarea
    size:  large
  section3:
    label: Vorteile
    type: headline
  benefits:
    label: Aufstellung
    type: structure
    modalsize: small
    entry: >
      {{headline}}<br />
      {{text}}
    fields:
      icon:
        label: Icon
        type: select
        options: 
          time: Zeit
          quality: Qualität
          security: Sicherheite
          price: Preis
      headline:
        label: Überschrift
        type: text
      text:
        label: Text
        type: textarea
files:
    type: image
    sortable: true
    fields:
      headline:
        label: Überschrift
        type: text
      subline:
        label: Text
        type: text
      button:
        label: Button Text
        type: text
      link:
        label: Link
        type: page