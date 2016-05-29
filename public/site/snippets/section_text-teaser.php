

<div class="TextTeaser">
	<?php if(!$section->headline()->isEmpty()): ?>
		<div class="TextTeaser-headline">
			<h2><?php echo $section->headline()->html() ?></h2>
		</div>
	<?php endif; ?>
	<div class="TextTeaser-body">
		<div>
			<span class="TextTeaser-icon TextTeaser-icon--<?php echo $section->icon(); ?>"></span>
		</div>
		<div>
				<p><?php echo $section->copy()->html() ?></p>
				<?php if(!$section->button_text()->isEmpty()): ?>
					<a class="TextTeaser-button" href="<?php echo $section->button_url()->url(); ?>"><span><?php echo $section->button_text()->html(); ?></span></a>
				<?php endif; ?>
		</div>

	</div>
</div>
