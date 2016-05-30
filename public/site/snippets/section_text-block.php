<?php
	$type = $section->type()
?>
<div class="TextBlock TextBlock--<?php echo $type ?><?php if(!$section->line()->isEmpty() ) { echo " TextBlock--border".$section->line(); } ?>">
	<div class="TextBlock-body<?php if( $section->margin()->isTrue() ) { echo " TextBlock-body--margin"; } ?>">
		<?php if($type == "center"): ?>
			<div>
					<h2><?php echo $section->headline()->html() ?></h2>
					<?php echo $section->copy()->kirbytext() ?>
			</div>
		<?php endif; ?>
		<?php if($type == "list"): ?>
			<div>
					<h2><?php echo $section->headline()->html() ?></h2>
			</div>
			<div>
					<?php echo $section->copy()->kirbytext() ?>
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
					<?php echo $section->copy()->kirbytext() ?>
			</div>
		<?php endif; ?>
		<?php if($type == "image-right"): ?>
			<div>
					<?php if(!$section->headline()->isEmpty()): ?>
						<h2><?php echo $section->headline()->html() ?></h2>
					<?php endif; ?>
					<?php echo $section->copy()->kirbytext() ?>
			</div>
			<div>
					<img src="<?php echo $section->image()->url() ?>" />
			</div>
		<?php endif; ?>
	</div>
</div>
