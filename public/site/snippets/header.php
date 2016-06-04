<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?></title>
  <meta name="description" content="<?php echo $site->description()->html() ?>">
  <meta name="keywords" content="<?php echo $site->keywords()->html() ?>">

  <?php echo css('assets/css/app.css') ?>
  <!-- <link type="text/css" rel="stylesheet" href="http://fast.fonts.net/cssapi/c05c1886-8820-4603-a8c9-c17649fa0874.css"> -->
  <script>
    (function(d) {
      var config = {
        kitId: 'pag6chy',
        scriptTimeout: 3000,
        async: true
      },
      h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
    })(document);
  </script>

</head>
<body>
  <header class="Header--sticky" role="banner">
    <div class="Header-body">
      <?php snippet('logo') ?>
      <?php snippet('menu--sticky') ?>
    </div>
  </header>
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
