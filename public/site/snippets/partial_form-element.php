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
