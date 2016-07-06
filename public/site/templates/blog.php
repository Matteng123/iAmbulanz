<?php
  $index = get('page') == '' ? 0 : get('page');
  if($page->children()->visible()->slice($index*3, 3)->count() == 0){
    go('blog');
  };
?>
<?php snippet('header') ?>
<?php snippet('view-start') ?>

  <main class="Application-main" role="main">

    <div class="Blog">
      <div class="Blog-body">
        <h1><?php echo $page->headline()->html() ?></h1>
        <?php snippet('blogelements', array('blog' => $page, 'index' => $index)) ?>
      </div>
      <div class="Blog-navigation">
        <div><?php if($index >= 1) : ?><a class="Button" href="<?php echo $page->url(); ?><?php if($index-1 > 0) : ?>?page=<?php echo $index-1; ?><?php endif; ?>"><span>Vorherige Seite</span></a><?php endif; ?></div>
        <div></div>
        <div><?php if($page->children()->visible()->slice(($index+1)*3, 3)->count() > 0) : ?><a class="Button" href="<?php echo $page->url() ?>?page=<?php echo $index+1; ?>"><span>Nächste Seite</span></a><?php endif; ?></div>
      </div>
    </div>

  </main>
<?php snippet('view-end') ?>
<?php snippet('footer') ?>
