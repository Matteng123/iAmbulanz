<?php
	$services = $page->services()->toStructure();
?>

<div class="Tool-leftbar">

</div>
<div class="Tool-rightbar">
	<h1><?php echo $page->step5headline() ?></h1>
	<?php if($services->count()): ?>
		<div class="Services-items">
			<?php foreach($services as $item): ?>
				<div class="Services-items-box">
					<div>
						<span class="Services-items-icon Services-items-icon--<?php echo $item->icon(); ?>"></span>
					</div>
					<div>
						<p><strong><?php echo $item->headline(); ?> | <?php echo $item->time(); ?></strong><br>
						<?php echo $item->description(); ?></p>
						<h6><span>Anleitung:</span></h6>
						<?php snippet('partial_guide-'.$item->icon()); ?>
					</div>
					<div>
						<a class="Services-button" href="<?php echo $item->button_url()->url(); ?>"><span><?php echo $item->button_text()->html(); ?></span></a>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	<?php endif; ?>
</div>
