<?php
	$devices = $site->Devices()->toStructure();
	// Kategorien filtern: ("iPhone", "Samsung Galaxy S")
	$categorys = array();
	foreach($devices as $device) {
		$cat = $device->category()->value();
		$categorys[] = $cat;
	}
	$categorys = array_unique ( $categorys );
?>

<div class="Tool-header">
	<h3><?php echo $page->step1subline() ?></h3>
	<h1><?php echo $page->step1headline() ?></h1>
</div>
<div class="Tool-buttonlist">
	<ul>
		<?php foreach($categorys as $category): ?>
				<li><a class="Tool-buttonlist-button" href="/<?php echo $page->uri() ?>/?page=2<?php echo getParamString($statusItems, 'device', $category); ?>"><span><?php echo $category; ?></span></a></li>
		<?php endforeach; ?>
	</ul>
</div>
