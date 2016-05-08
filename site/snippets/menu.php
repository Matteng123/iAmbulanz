
<nav class="Menu" role="navigation">
  <?php 
    $mainitems = $pages->filterBy('ispart', 'main');
    if($mainitems and $mainitems->count()):
  ?>
  <ul class="Menu-body">
    <?php foreach($mainitems as $p): ?>
    <li>
      <a <?php e($p->isOpen(), ' class="active"') ?> href="<?php echo $p->url() ?>"><span><?php echo $p->title()->html() ?></span></a>

      <?php if($p->hasVisibleChildren()): ?>
      <ul class="Menu-submenu">
        <?php foreach($p->children()->visible() as $p): ?>
        <li>
          <a href="<?php echo $p->url() ?>"><?php echo $p->title()->html() ?></a>
        </li>
        <?php endforeach ?>
      </ul>
      <?php endif ?>

    </li>
    <?php endforeach ?>
  </ul>
<?php endif ?>
</nav>
