<?php
	$type = $section->type()
?>
<div class="TextBlock TextBlock--<?php echo $type ?>">
	<div class="TextBlock-body">
		<?php if($type == "center"): ?>
			<div>
					<h2><?php echo $section->headline()->html() ?></h2>
					<p><?php echo $section->copy()->html() ?></p>
			</div>
		<?php endif; ?>
		<?php if($type == "list"): ?>
			<div>
					<h2><?php echo $section->headline()->html() ?></h2>
			</div>
			<div>
					<p><?php echo $section->copy()->html() ?></p>
			</div>
		<?php endif; ?>
		<?php if($type == "image-left"): ?>
			<div>
					<img src="<?php echo $section->image()->url() ?>" />
			</div>
			<div>
					<?php if(!$section->headline()->isEmpty()): ?>
						<h2><?php echo $section->headline()->html() ?></h2>
					<?php endif; ?>
					<p><?php echo $section->copy()->html() ?></p>
			</div>
		<?php endif; ?>
		<?php if($type == "image-right"): ?>
			<div>
					<?php if(!$section->headline()->isEmpty()): ?>
						<h2><?php echo $section->headline()->html() ?></h2>
					<?php endif; ?>
					<p><?php echo $section->copy()->html() ?></p>
			</div>
			<div>
					<img src="<?php echo $section->image()->url() ?>" />
			</div>
		<?php endif; ?>
	</div>
</div>
