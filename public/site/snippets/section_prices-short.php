<?php
	$devices = $site->Devices()->yaml();
?>

<div class="Prices">
	<div class="Prices-body">
		<?php print_r($devices); ?>
	</div>
</div>
