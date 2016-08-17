<?php
	$devices = $site->Devices()->toStructure();
	// Kategorien filtern: ("iPhone", "Samsung Galaxy S")
	$categorys = array();
	// Tabellen aufbauen
	$tables = array();
	$maxdevices = 0;
	foreach($devices as $device) {
		if($device->overview()->isTrue()){
			$cat = $device->category()->value();
			$categorys[] = $cat;
			$images[$cat] = $device->image()->uri();
			if(!array_key_exists( $cat , $tables )){
				$tables[$cat] = array();
			}
			array_push($tables[$cat], $device);
			if(count($tables[$cat]) > $maxdevices) {
				$maxdevices = count($tables[$cat]);
			}
		}
	}
	$categorys = array_unique ( $categorys );
	$toolpage = $site->find($site->tool())->url();

?>

<div class="Devices-carousel">
	<div class="Devices-carousel-body">
		<div class="Devices-carousel-text">
			<h2><?php echo $section->headline()->html() ?></h2>
		</div>
		<div class="Devices-carousel-wrapper">
			<?php foreach($categorys as $category):
				$damagelist = array();
			?>
			<div class="item">
					<div class="Devices-carousel-item">
						<h3><?php echo $category; ?></h3>
						<div>
							<img src="<?php echo $site->contentURL().'/'.$images[$category]; ?>" />
						</div>
						<h3>Modelle:</h3>
						<ul>
							<?php $countcurrent = 0; ?>
							<?php foreach($tables[$category] as $device):
								$countcurrent++;
								$servicedisplay = $device->service_display()->split($separator = ',');
								foreach($servicedisplay as $damage){
									array_push($damagelist, explode(':', (string)$damage)[0]);
								}
								$kleinkompente = $device->service_smallpiece()->split($separator = ',');
								foreach($kleinkompente as $damage){
									array_push($damagelist, explode(':', (string)$damage)[0]);
								}
								$akku = $device->service_akku()->split($separator = ',');
								foreach($akku as $damage){
									array_push($damagelist, explode(':', (string)$damage)[0]);
								}
							?>
								<li><?php echo $device->device(); ?></li>
							<?php endforeach; ?>
							<?php if($countcurrent < $maxdevices) :
								for ($i = $countcurrent; $i < $maxdevices; $i++) : ?>
    								<li class="hideMobile">&nbsp;</li>

								<?php endfor; ?>
							<?php endif; ?>
						</ul>
						<h3>Defekte:</h3>
						<?php $damagelist = array_unique ( $damagelist ); ?>
						<ul>
							<?php foreach($damagelist as $damage): ?>
									<li><?php echo $damage; ?></li>
							<?php endforeach; ?>
						</ul>
						<span>
							<a class="Devices-carousel-button" href="<?php echo $toolpage; ?>/?page=2&device=<?php echo $category; ?>"><span>Preis berechnen</span></a>
						</span>
					</div>
			</div>
			<?php endforeach; ?>
		</div>
	</div>
</div>
