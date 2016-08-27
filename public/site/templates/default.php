<?php snippet('header') ?>
<?php snippet('view-start') ?>

  <main class="Application-main" role="main">

    <?php

      if($page->isErrorPage()){
        ?>
        <div class="TextBlock TextBlock--center">
        	<div class="TextBlock-body">
            <div>
                <h2><?php echo $page->title() ?></h2>
                <?php echo $page->text()->kt() ?>
            </div>
          </div>
        </div>
      <?php
      } else {
        $sections = $page->children();
  			foreach($sections as $section):
  					if($section->section()):
  							snippet($section->intendedTemplate(), array('section' => $section));
  					endif;
  			endforeach;

      }
		?>
  </main>
<?php snippet('view-end') ?>
<?php snippet('footer') ?>
