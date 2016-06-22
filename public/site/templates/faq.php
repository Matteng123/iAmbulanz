<?php snippet('header') ?>
<?php snippet('view-start') ?>

  <main class="Application-main" role="main">
    <?php
      $faqs = $page->children();
      $faqsbycat = array();
      foreach($faqs as $faq) {
        $cat = $faq -> category() -> value();
        if(!array_key_exists( $cat , $faqsbycat )){
          $faqsbycat[$cat] = array();
        }
        array_push($faqsbycat[$cat], $faq);
      }
    ?>
    <div class="Faqs">
    	<div class="Faqs-body">
    		<div class="Faqs-text">
    				<h2><?php echo $page->title()->html() ?></h2>
        </div>
    		<div class="Faqs-lists">
          <?php foreach($faqsbycat as $cat => $faqs) : ?>
            <div>
              <h3><?php echo $cat ?></h3>
              <ul>
                <?php foreach($faqs as $items) : ?>
                  <li><a href="<?php echo $items->url() ?>"><?php echo $items->title()->html() ?></a></li>
                <?php endforeach; ?>
              <ul>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>

  </main>
<?php snippet('view-end') ?>
<?php snippet('footer') ?>
