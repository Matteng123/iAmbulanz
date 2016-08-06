<?php
	$services = $page->services()->toStructure();
	$price = getPriceforDamage($site);
?>
<div class="Tool-body">
	<div class="Tool-header">
    <span>Schritt 5/6</span>
  	<h1><?php echo $page->step5headline() ?></h1>
  </div>
	<div class="Tool-leftbar">
		<div class="Tool-leftbar-pricebox">
				<h4>Vorraussichtliche</h4>
				<h3>Reparaturkosten</h4>
				<div>
					<span class="Tool-leftbar-pricebox-price">

						<?php if($price == 0) : ?>
							<h6>Leider ist kein Preis ermittelbar</h6>
						<?php else : ?>
							<h6>Reparaturkosten</h6>
							<h5><?php echo $price+$page->analyseprice()->value() ?> €</h5>
						<?php endif; ?>
					</span>
				</div>
				<p>
					<?php if($price == 0) : ?>
						<?php if(get('device') == 'Anderes') :  ?>
								<?php echo $page->unknownboxtext()->html() ?>
							<?php else : ?>
								<?php echo $page->nopriceboxtext()->html() ?>
							<?php endif; ?>
					<?php else : ?>
						<?php echo $page->priceboxtext()->html() ?>
					<?php endif; ?>
				</p>
		</div>
	</div>
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
							<a class="Services-button" href="/<?php echo $page->uri() ?>/?page=6<?php echo getParamString($statusItems, 'price', $item->type()); ?>"><span><?php echo $item->button_text()->html(); ?></span></a>
						</div>
					</div>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>

</div>
