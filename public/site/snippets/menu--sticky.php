
<nav class="Menu--sticky" role="navigation">
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
  <ul class="Topbar-body">
    <li><a class="Topbar-phone" href="tel:<?php echo $site->tel()->html() ?>"><?php echo $site->tel()->html() ?></a></li>
    <li><a class="Topbar-button" href=""><span>Online-Termin</span></a></li>
  </ul>
<?php endif ?>
</nav>
