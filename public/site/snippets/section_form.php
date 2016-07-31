<?php
	$fields = $section->formluar()->toStructure();
?>

<div class="Form Form--grey">
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
			<?php foreach($fields as $field) :  ?><?php snippet('partial_form-element', array( 'field' => $field )); ?><?php endforeach; ?>
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
