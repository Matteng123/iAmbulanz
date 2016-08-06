	<?php
	$sliderimages = $section->images();
	if($sliderimages and $sliderimages->count()): ?>
	<div class="Carousel">
		<div class="Carousel-body">
			<?php foreach($sliderimages as $item): ?>
			<div class="item">
				<div class="Carousel-content" style="background-image:url(<?php echo $item->url() ?>)">
					<img src="/assets/images/slider.png" alt="<?php echo html($item->title()) ?>">
				</div>
				<div class="Carousel-layer" >
					<h1><?php echo html($item->headline()) ?></h1>
					<p><?php echo html($item->subline()) ?></p>
					<?php if(!$item->button()->isEmpty()): ?>
						<a class="Button" href="<?php echo html($item->link()) ?>"><span><?php echo html($item->button()) ?></span></a>
					<?php endif; ?>
				</div>
			</div>
			<?php endforeach ?>
		</div>
	</div>
	<?php endif ?>
