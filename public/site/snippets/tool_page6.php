<?php
	$fields = $page->formluar()->toStructure();
	$price = getPriceforDamage($site);
	$services = $page->services()->toStructure();
	foreach ($services as $key => $service) {
		if($service->type()==get('price')){
			$serviceprice = $service->price()->value();
			$servicetime = $service->time()->html();
		}
	}
?>
<div class="Tool-body">
	<div class="Tool-header">
    <span>Schritt 6/6</span>
  	<h1><?php echo $page->step6headline() ?></h1>
  </div>
	<div class="Tool-leftbar">
		<div class="Tool-leftbar-pricebox">
				<h4>Vorraussichtliche</h4>
				<h3>Reparaturkosten</h4>
				<div>
					<?php if($price == 0) : ?>
						<span>
							<h6>Leider ist kein Preis ermittelbar</h6>
						</span>
					<?php else : ?>
						<span>
							<h6>Analyse &amp; Reparatur</h6>
							<h5><?php echo $price+$page->analyseprice()->value() ?> €</h5>
						</span>
						<span>
							<h6>Service <?php echo get('price') ?></h6>
							<h5>+ <?php echo $serviceprice; ?> €</h5>
						</span>
						<span class="Tool-leftbar-pricebox-price">
							<h6>Gesamtkosten</h6>
							<h5><?php echo $price+$page->analyseprice()->value()+$serviceprice ?> €</h5>
						</span>
						<span>
							<h6>Dauer ca.</h6>
							<h5><?php echo $servicetime; ?></h5>
						</span>
					<?php endif; ?>
				</div>
				<?php if($price == 0) : ?>
					<?php if(get('device') == 'Anderes') :  ?>
							<?php echo $page->unknownboxtext()->kriby() ?>
						<?php else : ?>
							<?php echo $page->nopriceboxtext()->kriby() ?>
						<?php endif; ?>
				<?php else : ?>
					<?php echo $page->priceboxtext()->kriby() ?>
				<?php endif; ?>
		</div>
		<div class="Tool-leftbar-rabattbox">
			<div>
	        <?php echo $page->rabattimage()->toFile()->html() ?>
	    </div>
	    <div>
	        <?php echo $page->rabatt()->kirby() ?>
	    </div>
		</div>
	</div>
	<div class="Tool-rightbar">
		<div class="Form">
				<form id="<?php echo $page->uid() ?>" data-url="<?php echo $page->uri() ?>">
					<p class="Form-errormessage"><?php echo $page->error() ?></p>
					<div class="Form-sentmessage">
						<div></div>
					</div>
						<div class="Tool-form-leftbar">
							<?php foreach($fields as $field) : ?>
								<?php if($field->required()->isTrue()) : ?>
									<?php snippet('partial_form-element', array( 'field' => $field )); ?>
								<?php endif; ?>
							<?php endforeach; ?>
						</div>
						<div class="Tool-form-rightbar">
							<div class="Form-element"><h3>Diese Angaben sind optional: </h3></div>
								<?php foreach($fields as $field) :  ?>
									<?php if(!$field->required()->isTrue()) : ?>
										<?php snippet('partial_form-element', array( 'field' => $field )); ?>
									<?php endif; ?>
								<?php endforeach; ?>
						</div>
						<?php foreach($statusItems as $item) :  ?>
								<input type="hidden" name="<?php echo $item['param']; ?>" value="<?php echo get($item['param']) ?>" />
						<?php endforeach; ?>
					<div class="emailvalidation">
		        <label for="emailvalidation">Email Validation</label>
		        <input title="emailvalidation" type="emailvalidation" name="emailvalidation" placeholder=""/>
				  </div>
					<div class="Form-element Form-element--full submit">
		        <span>*) Pflichtfelder</span>
		        <button title="Absenden" name="submit" type="submit" id="submit"><span>Absenden</span></button>
		      </div>
				</form>
		</div>
		<div class="Tool-rightbar-legal">
				<h4><?php echo $page->datenschutzheadline()->html() ?></h4>
				<p><?php echo $page->datenschutztext()->html() ?></p>
		</div>
	</div>
</div>
