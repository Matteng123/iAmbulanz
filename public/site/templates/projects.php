<?php snippet('header') ?>
<?php snippet('view-start') ?>

  <main class="main" role="main">

    <div class="text">
      <h1><?php echo $page->title()->html() ?></h1>
      <?php echo $page->text()->kirbytext() ?>
    </div>

    <hr>

    <?php snippet('projects') ?>

  </main>
<?php snippet('view-end') ?>
<?php snippet('footer') ?>