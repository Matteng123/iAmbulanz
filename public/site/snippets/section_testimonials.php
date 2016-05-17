	<?php
	$slideritems = $section->testimonials()->toStructure();
	if($slideritems and $slideritems->count()): ?>
	<div class="Carousel--testimonials">
		<div class="Carousel-header">
			<h2><?php echo $section->headline()->html() ?></h2>
		</div>
		<div class="Carousel-body">
			<?php foreach($slideritems as $item):
				$stars = $item->stars()->int();
				echo $stars;
			?>

			<div class="item">
				<div class="Carousel-content">
					<img src="/assets/images/slider.png">
				</div>
				<div class="Carousel-layer" >
					<div class="Carousel-layer-img">
						<img src="<?php echo $section->contentURL().'/'.$item->image(); ?>">
					</div>
					<div class="Carousel-layer-body">
						<span class="Carousel--testimonials-stars"><?php for($i=0; $i<$stars; $i++): ?>Stern<?php endfor; ?></span>
							<p>„<?php echo html($item->description()) ?>“<span><?php echo html($item->author()) ?></span></p>
					</div>
				</div>
			</div>
			<?php endforeach ?>
		</div>
	</div>
	<?php endif ?>
