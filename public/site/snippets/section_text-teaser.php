

<div class="Text-Teaser">
	<div class="Text-Teaser-body">
		<div>
			<span class="Text-Teaser-icon Text-Teaser-icon--<?php echo $item->icon(); ?>"></span>
		</div>
		<div>
				<h2><?php echo $section->headline()->html() ?></h2>
				<p><?php echo $section->copy()->html() ?></p>
				<?php if(!$item->button()->isEmpty()): ?>
					<a class="Text-Teaser-button" href="<?php echo $item->button_url()->url(); ?>"><span><?php echo $item->button_text()->html(); ?></span></a>
		</div>

	</div>
</div>
