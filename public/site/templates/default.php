<?php snippet('header') ?>
<?php snippet('view-start') ?>

  <main class="Application-main" role="main">

    <?php
			$sections = $page->children();
			foreach($sections as $section):
					if($section->section()):
							snippet($section->intendedTemplate(), array('section' => $section));
					endif;
			endforeach;
		?>
  </main>
<?php snippet('view-end') ?>
<?php snippet('footer') ?>
