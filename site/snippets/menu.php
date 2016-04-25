
<nav role="navigation">
  <?php 
    $mainitems = $pages->filterBy('ispart', 'main');
    if($mainitems and $mainitems->count()):
  ?>
  <ul class="menu cf">
    <?php foreach($mainitems as $p): ?>
    <li>
      <a <?php e($p->isOpen(), ' class="active"') ?> href="<?php echo $p->url() ?>"><?php echo $p->title()->html() ?></a>

      <?php if($p->hasVisibleChildren()): ?>
      <ul class="submenu">
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
