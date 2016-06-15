<?php
	$devices = $site->Devices()->toStructure();
	// Kategorien filtern: ("iPhone", "Samsung Galaxy S")
	$categorys = array();
	// Tabellen aufbauen
	$tables = array();
	foreach($devices as $device) {
		if($device->overview()){
			$cat = $device->category()->value();
			$categorys[] = $cat;
			if(!array_key_exists( $cat , $tables )){
				$tables[$cat] = array();
			}
			array_push($tables[$cat], $device);
		}
	}
	$categorys = array_unique ( $categorys );


	$image = $section->image()->url();
	$hotspots = $section->image()->hotspots()->toStructure();
?>

<div class="Devices-teaser">
	<div class="Devices-teaser-body">
		<div class="Devices-teaser-text">
				<h2><?php echo $section->headline()->html() ?></h2>
				<?php echo $section->copy()->kirbytext() ?>
				<div class="Devices-teaser-items">
					<?php foreach($categorys as $category): ?>
						<div class="Devices-teaser-list">
							<h3><?php echo $category; ?></h3>
							<ul>
							<?php foreach($tables[$category] as $device): ?>
								<?php if($device->overview()) : ?>
									<li><a class="Devices-teaser-list-button" href="#"><span><?php echo $device->device(); ?></span></a></li>
								<?php endif; ?>
							<?php endforeach; ?>
							</ul>
						</div>
					<?php endforeach; ?>
				</div>
		</div>
		<div class="Devices-teaser-image">
			<img src="<?php echo $image ?>" border="0" />
			<?php if($hotspots->count()): ?>
			<div class="Devices-teaser-hotspots">
				<?php foreach($hotspots as $spot): ?>
					<div class="Devices-teaser-hotspots-spot" style="left:<?php echo $spot->xpos() ?>%; top:<?php echo $spot->ypos() ?>%">
							<span></span>
							<div>
								<h5><?php echo $spot->title() ?></h5>
								<p><?php echo $spot->description() ?></p>
							</div>
					</div>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
		</div>
	</div>
</div>
