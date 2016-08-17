  <footer class="Footer cf" role="contentinfo">
    <div class="Footer-body">
      <div class="Footer-leftbar">
        <div class="Footer-navigation">
          <div class="Footer-navigation-col">
              <?php
                $metaitems = $pages->filterBy('ispart', 'meta');
                if($metaitems and $metaitems->count()):
              ?>
              <ul>
                <?php foreach($metaitems as $p): ?>
                <li>
                  <a <?php e($p->isOpen(), ' class="active"') ?> href="<?php echo $p->url() ?>"><?php echo $p->title()->html() ?></a>
                </li>
                <?php endforeach ?>
              </ul>
              <?php endif ?>

            </div>
          <div class="Footer-navigation-col">
            <?php
              $footeritems = $pages->filterBy('ispart', 'footer');
              if($footeritems and $footeritems->count()):
            ?>
            <ul>
              <?php foreach($footeritems as $p): ?>
              <li>
                <a <?php e($p->isOpen(), ' class="active"') ?> href="<?php echo $p->url() ?>"><?php echo $p->title()->html() ?></a>
              </li>
              <?php endforeach ?>
            </ul>
            <?php endif ?>
          </div>
          <div class="Footer-navigation-col">
            <?php
              $landingitems = $pages->filterBy('ispart', 'landing');
              if($landingitems and $landingitems->count()):
            ?>
            <ul>
              <?php foreach($landingitems as $p): ?>
              <li>
                <a <?php e($p->isOpen(), ' class="active"') ?> href="<?php echo $p->url() ?>"><?php echo $p->title()->html() ?></a>
              </li>
              <?php endforeach ?>
            </ul>
            <?php endif ?>
          </div>
        </div>
      </div>
      <div class="Footer-rightbar">
        <div class="Footer-box">
          <p>Handy defekt? Jetzt anrufen:</p>
          <a href="tel:<?php echo $site->tel()->html() ?>"><?php echo $site->tel()->html() ?></a><br/>
          <a class="Footer-box-button" href="<?php echo $site->find($site->tool())->url(); ?>"><span>Online-Termin machen</span></a>
        </div>
      </div>
      <div class="Footer-copyright">
        <?php echo $site->copyright()->kirbytext() ?> <div class="fb-like" data-href="https://www.facebook.com/iAmbulanz" data-layout="button_count" data-action="like" data-size="large" data-show-faces="true" data-share="false"></div>
      </div>
    </div>
  </footer>
  <?php echo js('assets/js/loader.js') ?>
  <div class="preloader">
    <div class="curtain">
      <div class="loader">
        <div class="loader-inner"></div>
      </div>
    </div>
  </div>
</body>
</html>
