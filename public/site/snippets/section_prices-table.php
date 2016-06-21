<?php
	$services = $section->services()->toStructure();
?>

<div class="Prices">
	<?php if(!$section->headline()->isEmpty()) :  ?>
		<div class="Prices-text">
			<h2><?php echo $section->headline()->html() ?></h2>
		</div>
	<?php endif ?>
	<div class="Prices-body<?php if( $section->margin()->isTrue() ) { echo " Prices-body--margin"; } ?>">
		<div class="Prices-table">

			<div class="Prices-table-scroll">
				<table>
					<tr>
						<th><?php echo $section->services_label()->html(); ?></th>
						<th>Erklärung</th>
						<th>Preis</th>
					</tr>
				<?php foreach($services as $service): ?>
						<tr>
							<td><?php echo $service->title()->html(); ?></td>
							<td><?php echo $service->description()->html(); ?></td>
							<td><?php echo $service->price()->html(); ?></td>
						</tr>
				<?php endforeach; ?>
				</table>
			</div>
		</div>
	</div>
</div>
