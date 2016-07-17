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
          radio: C Einzelauswahl Radiobuttons
          checkbox: D Mehrfachauswahl Checkboxen
      values:
        label: Inhalte (Nur bei Auswahl C/D)
        type: tags
      variable:
        label: Variabelnamen
        type: text
        help: Der Variabelname 'email' wird als solches erkannt und erzeugt eine Kopie des Formulars an den Kunden
      required:
        label: Pflichtfeld
        type: toggle
        text: yes/no
        default: false
        width: 1/2
      error:
        label: Fehlermeldung falls Pflichtfeld
        type: text
        default: Bitte vervollständigen Sie Ihre Eingabe.
      size:
        label: Breite
        type: select
        width: 1/2
        options:
          full: Volle Breite
          half: Halbe Breite
  error:
    label: Fehlermeldung falls unvollständig
    type: textarea
    default: Bitte überprüfen Sie Ihre Eingaben.
  successmessage:
    label: Meldung nach erfolgreichem Versand
    type: textarea
    default: "**Vielen Dank für Ihre Anfrage. ** Wir melden uns zeitnah bei Ihnen. Ihr Team von iAmbulanz."
  mailsubject:
    label: Betreff für die E-Mail
    type: text
    default: ** E-Mail von iAmbulanz.de
  mailbody:
    label: Template für E-Mail an iAmbulanz
    type: textarea
  clientbody:
    label: Template für E-Mail an Kunden
    type: textarea
  recipient:
    label: Empfänger des Formulars
    type: text
    default: info@iAmbulanz.de
  sender:
    label: Absender des Formulars
    type: text
    default: no-reply@iAmbulanz.de
  section: section
files: false