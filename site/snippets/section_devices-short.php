<?php
	$devices = $site->devices()->toStructure();
	$iphone = $devices->filterBy('device', 'iphone');
	$ipad = $devices->filterBy('device', 'ipad');
	$samsung = $devices->filterBy('device', 'samsung');
	$custom = $devices->filterBy('device', 'custom');
	$image = $section->image()->url();
	$hotspots = $section->image()->hotspots()->toStructure();
?>

<div class="Devices-teaser">
	<div class="Devices-teaser-body">
		<div class="Devices-teaser-text">
				<h2><?php echo $section->headline()->html() ?></h2>
				<?php echo $section->copy()->kirbytext() ?>
				<div class="Devices-teaser-items">
					<div class="Devices-teaser-list">
						<h3>iPhone</h3>
						<ul>
						<?php foreach($iphone as $item): ?>
							<li><?php echo $item->version() ?></li>
						<?php endforeach; ?>
						</ul>
					</div>
					<div class="Devices-teaser-list">
						<h3>iPad</h3>
						<ul>
						<?php foreach($ipad as $item): ?>
							<li><?php echo $item->version() ?></li>
						<?php endforeach; ?>
						</ul>
					</div>
					<div class="Devices-teaser-list">
						<h3>Samsung Galaxy</h3>
						<ul>
						<?php foreach($samsung as $item): ?>
							<li><?php echo $item->version() ?></li>
						<?php endforeach; ?>
						</ul>
					</div>
					<div class="Devices-teaser-list">
						<h3>Andere Geräte</h3>
						<ul>
						<?php foreach($custom as $item): ?>
							<li><?php echo $item->version() ?></li>
						<?php endforeach; ?>
						</ul>
					</div>
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
