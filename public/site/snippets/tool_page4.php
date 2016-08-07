<div class="Tool-body">
  <div class="Tool-header">
    <span>Schritt 4/6</span>
  	<h1><?php echo $page->step4headline() ?></h1>
  </div>
  <div class="Tool-buttonlist Tool-buttonlist--grid">
  		<ul><?php foreach($damages as $damage): ?><li><span><a class="Tool-buttonlist-button" href="/<?php echo $page->uri() ?>/?page=5<?php echo getParamString($statusItems, 'damage', $damage['title']); ?>"><span><?php echo $damage['title']; ?></span>
        <?php if(array_key_exists('help',$damage)): ?><div>
        <span></span>
        <p><?php echo $damage['help']; ?></p>
      </div>
      <?php endif; ?></a></span></li><?php endforeach; ?></ul>
  </div>
</div>
<div class="Tool-bottom">
  <div class="Tool-bottom-body">
    <div>
        <?php echo $page->rabattimage()->toFile()->html() ?>
    </div>
    <div>
        <?php echo $page->rabatt()->kt() ?>
    </div>
  </div>
</div>
