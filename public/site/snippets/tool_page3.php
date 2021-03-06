<?php
	$devices = $site->Devices()->toStructure();
	$filtered = array();
	foreach($devices as $device) {
			$target = $device->device();
			if($target == get('model')){
				$colors = $device->versions()->split($separator = ',');
				foreach($colors as $color){
					if(count(explode(':', (string)$color)) > 1){
						array_push($filtered, explode(':', (string)$color)[1]);
					}else{
						array_push($filtered, $color);
					}
				}
			}
	}
?>
<div class="Tool-body">
	<div class="Tool-header">
		<span>Schritt 3/6</span>
		<h1><?php echo $page->step3headline() ?></h1>
	</div>
	<div class="Tool-buttonlist Tool-buttonlist--grid">
			<ul><?php foreach($filtered as $color): ?><li><span><a class="Tool-buttonlist-button" href="/<?php echo $page->uri() ?>/?page=4<?php echo getParamString($statusItems, 'color', $color); ?>"><span><?php echo $color; ?></span></a></span></li><?php endforeach; ?></ul>
	</div>
</div>
