<?php snippet('header') ?>
<?php snippet('view-start') ?>

  <main class="Application-main" role="main">
  <?php 
  	$mainimages = $page->images();
  	if($page->images() and $mainimages->count()): ?>
  	<div class="Application-carousel">
  		<?php foreach($mainimages as $i): ?>
  		<div class="item">
  			<div class="Application-carousel-content" style="background-image:url(<?php echo $i->url() ?>)">
  				<img src="/assets/images/slider.png" alt="<?php echo html($i->title()) ?>">
  			</div>
  			<div class="Application-carousel-layer" >
  				<h2><?php echo html($i->headline()) ?></h2>
  				<p><?php echo html($i->subline()) ?></p>
  				<a class="Application-button" href="<?php echo html($i->link()) ?>"><span><?php echo html($i->button()) ?></span></a>
  			</div>
  		</div>
  		<?php endforeach ?>
  	</div>
  	<?php endif ?>

    <div class="Location-teaser">
    	<div class="Location-teaser-body">
    		<div class="Location-teaser-text">
      			<h1><?php echo $page->headline1()->html() ?></h1>
      			<?php echo $page->text1()->kirbytext() ?>
      		</div>
      		<div class="Location-teaser-tab">
      			<?php 
      				$locations = $site->standorte()->toStructure();
      				if($locations and $locations->count()): ?>
      			<?php foreach($locations as $l): ?>
      				<p><?php echo html($l->title()) ?></p>
      				<p><?php echo html($l->street()) ?></p>
      				
      			<?php endforeach ?>
      			<?php endif ?>
      		</div>
      	</div>
    </div>

  </main>
<?php snippet('view-end') ?>
<?php snippet('footer') ?>