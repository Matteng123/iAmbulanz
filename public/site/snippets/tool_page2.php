<?php
	$devices = $site->Devices()->toStructure();
	$filtered = array();
	foreach($devices as $device) {
			$target = $device->category()->value();
			if($target == get('device')){
				array_push($filtered, $device);
			}
	}
?>
<div class="Tool-body">
	<div class="Tool-header">
		<span>Schritt 2/6</span>
		<h1><?php echo $page->step2headline() ?></h1>
	</div>
	<div class="Tool-buttonlist Tool-buttonlist--grid">
			<ul><?php foreach($filtered as $device): ?><li><span><a class="Tool-buttonlist-button" href="/<?php echo $page->uri() ?>/?page=3<?php echo getParamString($statusItems, 'model', $device->device()); ?>"><span><?php echo $device->device(); ?></span></a></span></li><?php endforeach; ?></ul>
	</div>
</div>
