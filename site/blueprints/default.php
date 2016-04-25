<?php if(!defined('KIRBY')) exit ?>

title: Page
pages: true
files: true
fields:
  title:
    label: Title
    type:  text
  text:
    label: Text
    type: textarea
  ispart: 
    label: Navigation
    width: 1/2
    type: select
    default: meta 
    options: 
      main: Haupt
      meta: Meta
      footer: Footer