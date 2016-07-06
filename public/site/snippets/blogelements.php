<?php foreach($blog->children()->visible()->slice($index*3, 3) as $blogelement): ?>
    <?php if(!$blogelement->motiv()->isEmpty()) : ?>
      <div class="Blog-element Blog-element--image">
          <div>
              <img src="<?php echo $blogelement->contentURL().'/'.$blogelement->motiv() ?>" alt="<?php echo $blogelement->title()->html() ?>" >
          </div>
          <div>
              <span><?php echo $blogelement->date('d/m/Y') ?></span>
              <h2><?php echo $blogelement->title()->html() ?></h2>
              <?php echo $blogelement->copy()->kirbytext() ?>
          </div>
      </div>
    <?php else : ?>
      <div class="Blog-element">
          <div>
              <span><?php echo $blogelement->date('d/m/Y') ?></span>
              <h2><?php echo $blogelement->title()->html() ?></h2>
              <?php echo $blogelement->copy()->kirbytext() ?>
          </div>
      </div>
    <?php endif; ?>
  <?php endforeach ?>
