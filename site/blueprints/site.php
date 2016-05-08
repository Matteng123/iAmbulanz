<?php if(!defined('KIRBY')) exit ?>

title: Site
pages: 
  template: 
    - default
    - faq
    - landing
    - service
    - about
    - locations
    - prices
    - contact
fields:
  section1:
    label: Firmendaten
    type: headline
  company:
    label: Unternehmen
    type:  text
  adress:
    label: Adresse
    type:  textarea
  ust:
    label: USt-IdNr.
    type:  text
  tel:
    label: Telefon
    type:  tel
    width: 1/2
  email:
    label: E-Mail
    type:  email
    width: 1/2
  section2:
    label: Büros
    type: headline
  standorte:
    label: Standorte
    type: structure
    modalsize: large
    entry: >
      {{title}}<br />
      {{street}} · {{zip}} {{city}}<br />
      Mo. - Fr. {{timesweek}} · Sa. {{timesweeken}}<br>
      Telefon: {{tel}} · Mobil: {{mobil}} · E-Mail: {{email}}
    fields:
      title:
        label: Titel
        type: text
      street:
        label: Strasse
        type: text
      zip:
        label: PLZ
        type: text
        width: 1/2
      city:
        label: Stadt
        type: text
        width: 1/2
      lat:
        label: Lat-Koordinaten
        type: text
        width: 1/2
      long:
        label: Long-Koordinaten
        type: text
        width: 1/2
      htimes:
        label: Öffnungszeiten
        type: headline
      timesweek:
        label: Mo-Fr.
        type: text
      timesweeken:
        label: Sa.
        type: text
      hcontact:
        label: Kontaktdaten
        type: headline
      tel:
        label: Telefon
        type: tel
      mobil:
        label: Mobil
        type: tel
      email:
        label: E-mail
        type: email
  section3:
    label: Geräte
    type: headline
  devices:
    label: Geräteaufstellung
    type: structure
    style: table
    fields:
      device:
        label: Device Typ
        type: select
        options: 
          iphone: iPhone
          ipad: iPad
          samsunggalaxy: Samsung Galaxy
          custom: Andere Geräte
      version:
        label: Device Version
        type: text
  section0:
    label: Meta Angaben
    type: headline
  title:
    label: Title
    type:  text
  author:
    label: Author
    type:  text
  description:
    label: Description
    type:  textarea
  keywords:
    label: Keywords
    type: tags
  copyright:
    label: Copyright
    type: textarea
