<?php
	$fields = $page->formluar()->toStructure();
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
					<span>
						<h6>Analyse &amp; Reparatur</h6>
						<h5>55 €</h5>
					</span>
					<span>
						<h6>Service <?php echo get('price') ?></h6>
						<h5>+ 30 €</h5>
					</span>
					<span class="Tool-leftbar-pricebox-price">
						<h6>Gesamtkosten</h6>
						<h5>85 €</h5>
					</span>
					<span>
						<h6>Dauer ca.</h6>
						<h5>30 - 60 Min.</h5>
					</span>
				</div>
				<p><?php echo $page->preisboxtext()->html() ?></p>
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

	</div>
</div>
