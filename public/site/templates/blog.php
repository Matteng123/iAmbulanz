<?php snippet('header') ?>
<?php snippet('view-start') ?>

  <main class="Application-main" role="main">

    <div class="Blog">
      <div class="Blog-body">
        <h1><?php echo $page->headline()->html() ?></h1>
        <?php snippet('blogelements', array('blog' => $page, 'index' => get('page'))) ?>
      </div>
    </div>

  </main>
<?php snippet('view-end') ?>
<?php snippet('footer') ?>
