
<nav class="Topbar" role="navigation">
  <?php
    $metaitems = $pages->filterBy('ispart', 'meta');
    $toolpage = $site->find($site->tool())->url();
    if($metaitems and $metaitems->count()):
  ?>
  <div class="Topbar-body">
  <ul>
    <?php foreach($metaitems as $p): ?>
    <li>
      <a <?php e($p->isOpen(), ' class="active"') ?> href="<?php echo $p->url() ?>"><?php echo $p->title()->html() ?></a>
    </li>
    <?php endforeach ?>
  </ul>
  <ul>
    <li><a class="Topbar-phone" href="tel:<?php echo $site->tel()->html() ?>"><?php echo $site->tel()->html() ?></a></li>
    <li><a class="Topbar-button" href="<?php echo $toolpage; ?>"><span>Online-Termin</span></a></li>
  </ul>
<?php endif ?>
</nav>
