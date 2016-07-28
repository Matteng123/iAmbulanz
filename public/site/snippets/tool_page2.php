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

<div class="Tool-header">
	<h1><?php echo $page->step2headline() ?></h1>
</div>
<div class="Tool-buttonlist">
		<ul>
		<?php foreach($filtered as $device): ?>
				<li><a class="Tool-buttonlist-button" href="/<?php echo $page->uri() ?>/?page=3<?php echo getParamString($statusItems, 'model', $device->device()); ?>"><span><?php echo $device->device(); ?></span></a></li>
		<?php endforeach; ?>
		</ul>
</div>
