<?php
	$devices = $site->Devices()->toStructure();
	// Kategorien filtern: ("iPhone", "Samsung Galaxy S")
	$categorys = array();
	$images = array();
	// Tabellen aufbauen
	$tables = array();
	foreach($devices as $device) {
		if($device->overview()){
			$cat = $device->category()->value();
			$categorys[] = $cat;
			$images[$cat] = $device->image()->uri();
			if(!array_key_exists( $cat , $tables )){
				$tables[$cat] = array();
			}
			array_push($tables[$cat], $device);
		}
	}
	$categorys = array_unique ( $categorys );
?>

<div class="Prices">
	<div class="Prices-body">
		<div class="Prices-text">
			<h2><?php echo $section->headline()->html() ?></h2>
		</div>
		<div class="Prices-tabs">
			<?php foreach($categorys as $item): ?>
				<div class="Prices-tab">
					<img src="<?php echo $site->contentURL().'/'.$images[$item]; ?>" />
					<div class="Prices-tab-link">
						<a class="Prices-button" href="#<?php echo str_replace(' ', '-', $item); ?>"><span><?php echo $item; ?></span></a>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
		<?php foreach($tables as $key => $value): ?>
		<div class="Prices-table" id="<?php echo str_replace(' ', '-', $key); ?>">
				<h3><?php echo $key; ?></h3>
				<div class="Prices-table-scroll">
					<table>
						<tr>
							<th>Modelle</th>
							<th>Display
								<div>
									<span></span>
									<p>Hilfetext für Display</p>
								</div>
							</th>
							<th>Kleinkompente
								<div>
									<span></span>
									<p>Hilfetext für Kleinkomponente</p>
								</div>
							</th>
							<th>Akku</th>
						</tr>
					<?php foreach($value as $device): ?>
							<?php
								$servicedisplay = (string)$device->service_display()->split($separator = ',')[0];
								$kleinkompente = (string)$device->service_smallpiece()->split($separator = ',')[0];
								$akku = (string)$device->service_akku()->split($separator = ',')[0];
							?>
							<tr>
								<td><?php echo $device->device() ?></td>
								<td><?php echo explode(':', $servicedisplay)[1] ?> €</td>
								<td><?php echo explode(':', $kleinkompente)[1] ?> €</td>
								<td><?php echo explode(':', $akku)[1] ?> €</td>
							</tr>
					<?php endforeach; ?>
					</table>
				</div>
		</div>
		<?php endforeach; ?>
	</div>
</div>
