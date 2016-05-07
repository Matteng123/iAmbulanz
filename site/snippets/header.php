<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?></title>
  <meta name="description" content="<?php echo $site->description()->html() ?>">
  <meta name="keywords" content="<?php echo $site->keywords()->html() ?>">

  <?php echo css('assets/css/app.css') ?>
  <link type="text/css" rel="stylesheet" href="http://fast.fonts.net/cssapi/c05c1886-8820-4603-a8c9-c17649fa0874.css">

</head>
<body>

  <header class="Header" role="banner">
    <?php snippet('logo') ?>
    <div class="Header-body">
      <?php snippet('topbar') ?>
      <?php snippet('menu') ?>
    </div>
    <span class="Header-toggle">
      <span></span>
    </span>
  </header>