  <footer class="Footer cf" role="contentinfo">
    <div class="Footer-body">
      <div class="Footer-leftbar">
      	<?php echo $site->company()->kirbytext() ?>
        <br/>
      	<?php echo $site->adress()->kirbytext() ?>
        <br/>
        <table>
          <tr>
            <td>USt-IdNr.</td>
            <td><?php echo $site->ust()->kirbytext() ?></td>
          </tr>
          <tr>
            <td>Tel: </td>
            <td><?php echo $site->tel()->html() ?></td>
          </tr>
          <tr>
            <td>E-Mail: </td>
            <td><a href="mailto:<?php echo $site->email()->html() ?>">› <?php echo $site->email()->html() ?></a></td>
          </tr>
      	</table>

        <br>
      </div>
      <div class="Footer-centerbar">
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
          <a href="tel:<?php echo $site->tel()->html() ?>"><?php echo $site->tel()->html() ?></a>
          <p>oder:</p>
          <a class="Footer-box-button" href="<?php echo $site->find($site->tool())->url(); ?>"><span>Online-Termin machen</span></a>
        </div>
      </div>
      <div class="Footer-copyright">
        <?php echo $site->copyright()->kirbytext() ?>
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
