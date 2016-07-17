<?php
	$fields = $section->formluar()->toStructure();
?>

<div class="Form">
	<div class="Form-body">
		<?php if(!$section->headline()->isEmpty()) :  ?>
			<div class="Form-text">
				<h2><?php echo $section->headline()->html() ?></h2>
				<?php echo $section->copy()->kirbytext() ?>
			</div>
		<?php endif ?>
		<form id="<?php echo $section->uid() ?>" data-url="<?php echo $section->uri() ?>">
			<p class="Form-errormessage"><?php echo $section->error() ?></p>
			<div class="Form-sentmessage">
				<div></div>
			</div>
			<?php foreach($fields as $field) :  ?>
				<div class="Form-element Form-element--<?php echo $field->size() ?>">
					<label for="<?php echo $field->variable() ?>"><?php echo $field->label()->text(); if($field->required()->isTrue()){ echo " *"; }?></label>
					<?php if($field->type() == "input") : ?>
							<div>
								<input title="<?php echo $field->label() ?>" type="text" name="<?php echo $field->variable() ?>" placeholder="<?php echo $field->required()->isTrue() ? 'Bitte angeben' : 'Optional'; ?>" <?php if($field->required()->isTrue()){ echo 'required'; } ?>/>
							</div>
					<?php elseif($field->type() == "textarea") : ?>
						<div>
							<textarea title="<?php echo $field->label() ?>" type="text" name="<?php echo $field->variable() ?>" placeholder="<?php echo $field->required()->isTrue() ? 'Bitte angeben' : 'Optional'; ?>" <?php if($field->required()->isTrue()){ echo 'required'; } ?>/></textarea>
						</div>
					<?php elseif($field->type() == "radio" or $field->type() == "checkbox") : ?>
						<div class="Form-field Form-field--<?php echo $field->type(); ?>">
							<?php foreach($field->values()->split(',') as $value) : ?>
								<div>
									<input type="<?php echo $field->type() ?>" name="<?php echo $field->variable() ?>" value="<?php echo $value ?>" <?php if($field->required()->isTrue()){ echo 'required'; } ?>><span><?php echo $value ?></span>
								</div>
							<?php endforeach; ?>
						</div>
					<?php endif; ?>
					<p class="Form-errormessage"><?php echo $field->error()->kirbytex() ?></p>
				</div>
			<?php endforeach; ?>
			<div class="emailvalidation">
        <label for="emailvalidation">Email Validation</label>
        <input title="emailvalidation" type="emailvalidation" name="emailvalidation" placeholder=""/>
		  </div>
			<div class="Form-element Form-element--full">
        <span>*) Pflichtfelder</span>
        <button title="Absenden" name="submit" type="submit" id="submit"><span>Absenden</span></button>
      </div>
		</form>
	</div>
</div>
