<?php
	$devices = $site->Devices()->toStructure();
	// Kategorien filtern:
	$categorys = array();
	$category = "";
	foreach($devices as $device) {
		if($device->overview()){
			$categorys[]=$device->category();
		}
	}
?>

<div class="Prices">
	<div class="Prices-body">
		<div class="Prices-text">
				<h2><?php echo $section->headline()->html() ?></h2>
		</div>
		<div class="Prices-tabs">
		<?php foreach($categorys as $item): ?>
			<?php if($category != $item): ?>
				<?php $category = $item; ?>
					<div class="Prices-tab">
							<a class="Prices-button" href="#<?php echo $category; ?>"><span><?php echo $category; ?></span></a>
					</div>
			<?php endif; ?>
		<?php endforeach; ?>
		</div>
	</div>
</div>
