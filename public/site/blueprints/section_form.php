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
  error: form_text_error
  successmessage: form_text_success
  mailsubject: form_mail_subject
  mailbody: form_mail_body
  clientbody: form_mail_clientbody
  recipient: form_recipients
  sender: form_sender
  section: section
files: false
