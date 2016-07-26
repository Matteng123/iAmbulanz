<?php if(!defined('KIRBY')) exit ?>

title: Anfragetool
pages: false
fields:
  section1:
    label: Step Gerät
    type: headline
  step1headline:
    label: Headline
    type: text
  step1subline:
    label: Subline
    type: text
  section2:
    label: Step Modell
    type: headline
  step2headline:
    label: Headline
    type: text
  section3:
    label: Step Farbe
    type: headline
  step3headline:
    label: Headline
    type: text
  section4:
    label: Step Schaden
    type: headline
  step4headline:
    label: Headline
    type: text
  rabatt:
    label: Rabattinfo
    type: textarea
  rabatt-image:
    label: Rabbattbild
    type: select
    options: images
  section5:
    label: Step Preis
    type: headline
  step5headline:
    label: Headline
    type: text
  preisboxtext:
    label: Preisbox Text
    type: textarea
  section6:
    label: Step Anfrage
    type: headline
  step6headline:
    label: Headline
    type: text
  formluar:
    label: Formular Felder
    type: structure
    entry: >
      Feld: <strong>{{label}}</strong><br />
      Variable Name: <strong>{{variable}}</strong>
    modalsize: large
    fields:
      label: form_fields_label
      variable: form_fields_variable
      type: form_fields_type
      values: form_fields_values
      required: form_fields_required
      error: form_fields_error
      size: form_fields_size
      tab: form_fields_index
  error: form_text_error
  successmessage: form_text_success
  mailsubject: form_mail_subject
  mailbody: form_mail_body
  clientbody: form_mail_clientbody
  recipient: form_recipients
  sender: form_sender
  datenschutzheadline:
    label: Datenschutz Headline
    type: text
  datenschutztext:
    label: Datenschutz Text
    type: textarea
  section7:
    label: Per Post
    type: headline
  postheadline:
    label: Postbox Headline
    type: text
  posttext:
    label: Postbox Text
    type: textarea
    help: Nach dem Text folgt die zentrale Telefonnummer mit einem Button zur Startseite
  downloadheadline:
    label: Download Headline
    type: text
  downloadbutton:
    label: Download Button
    type: text
    help: Link geht auf erstes PDF in den Files
  section8:
    label: Sonstiges Gerät
    type: headline
  differentheadline:
    label: Sonstiges Gerät Headline
    type: text
  differenttext:
    label: Sonstiges Gerät Text
    type: textarea
  differentboxheadline:
    label: Sonstiges Gerät Headline in Box
    type: text
  differentboxtext:
    label: Sonstiges Gerät Text in Box
    type: textarea
  differentbutton:
    label: Sonstiges Gerät Button
    type: text
