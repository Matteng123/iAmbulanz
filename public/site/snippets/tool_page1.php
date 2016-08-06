<?php
	$devices = $site->Devices()->toStructure();
	// Kategorien filtern: ("iPhone", "Samsung Galaxy S")
	$categorys = array();
	foreach($devices as $device) {
		$cat = $device->category()->value();
		$images[$cat] = $device->image()->uri();
		$categorys[] = $cat;
	}
	$categorys = array_unique ( $categorys );
?>
<div class="Tool-body">
	<div class="Tool-header">
		<span>Schritt 1/6</span>
		<h3><?php echo $page->step1subline() ?></h3>
		<h1><?php echo $page->step1headline() ?></h1>
	</div>
	<div class="Tool-buttonlist">
		<ul>
			<?php foreach($categorys as $category): ?>
					<li>
						<span>
							<img src="<?php echo $site->contentURL().'/'.$images[$category]; ?>" />
							<a class="Tool-buttonlist-button" href="/<?php echo $page->uri() ?>/?page=2<?php echo getParamString($statusItems, 'device', $category); ?>"><span><?php echo $category; ?></span></a>
						</span>
					</li>
			<?php endforeach; ?>
					<li>
							<span>
								<img src="<?php echo $site->contentURL().'/device-unknown.png'; ?>" />
								<a class="Tool-buttonlist-button" href="/<?php echo $page->uri() ?>/?page=5<?php echo getParamString($statusItems, 'device', 'unknown'); ?>"><span><?php echo $category; ?></span></a>
							</span>
					</li>
		</ul>
	</div>
</div>
