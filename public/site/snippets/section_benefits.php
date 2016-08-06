<?php
	$benefits = $section->benefits()->toStructure();
?>

<div class="Benefits">
	<div class="Benefits-body">
		<div class="Benefits-text">
				<h2><?php echo $section->headline()->html() ?></h2>
		</div>
		<?php if($benefits->count()): ?>
		<div class="Benefits-items">
			<ul><?php foreach($benefits as $item): ?><li>
					<span class="Benefits-items-icon Benefits-items-icon--<?php echo $item->icon(); ?>"></span>
					<h3><?php echo $item->headline(); ?></h3>
					<p><?php echo $item->description(); ?></p>
				</li><?php endforeach; ?></ul>
		</div>
		<?php endif; ?>
	</div>
</div>
