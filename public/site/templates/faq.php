<?php snippet('header') ?>
<?php snippet('view-start') ?>

  <main class="Application-main" role="main">
    <div class="Faqs">
    	<div class="Faqs-body Faqs-body--detail">
    		<div class="Faqs-text">
    				<h2><?php echo $page->parent()->title().'&nbsp;&nbsp;›&nbsp;&nbsp;'.$page->category()->html().'&nbsp;&nbsp;›&nbsp;&nbsp;'.$page->title()->html() ?></h2>
            <div><?php echo $page->copy_left()->kirbytext() ?></div>
            <div><?php echo $page->copy_right()->kirbytext() ?></div>
        </div>
        <a class="Faqs-button" href="<?php echo $page->parent()->url(); ?>"><span>Zurück zur Übersicht</span></a>
      </div>
    </div>
  </main>
<?php snippet('view-end') ?>
<?php snippet('footer') ?>
