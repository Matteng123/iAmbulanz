<?php if(!defined('KIRBY')) exit ?>

title: FAQ
pages: false
files:
  sortable: true
fields:
  title:
    label: Title
    type:  text
  year:
    label: Year
    type:  text
  text:
    label: Text
    type:  textarea
  tags:
    label: Tags
    type:  tags
  ispart:
    label: Navigation
    width: 1/2
    type: select
    default: meta 
    options: 
      main: Haupt
      meta: Meta
      footer: Footer