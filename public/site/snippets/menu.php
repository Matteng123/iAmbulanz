
<nav class="Menu" role="navigation">
  <?php
    $mainitems = $pages->filterBy('ispart', 'main');
    if($mainitems and $mainitems->count()):
  ?>
  <ul class="Menu-body">
    <?php foreach($mainitems as $p): ?>
    <li>
      <a <?php e($p->isOpen(), ' class="active"') ?> href="<?php echo $p->url() ?>"><span><?php echo $p->title()->html() ?></span></a>
    </li>
    <?php endforeach ?>
  </ul>
<?php endif ?>
</nav>
