  <footer class="footer cf" role="contentinfo">

    <div class="copyright">
      <?php echo $site->copyright()->kirbytext() ?>
    </div>

    <div class="leftbar">
    	<?php echo $site->company()->kirbytext() ?>
    	<?php echo $site->adress()->kirbytext() ?>
    	<?php echo $site->ust()->kirbytext() ?>

    </div>

  </footer>
  <?php echo js('assets/js/app.js') ?>
</body>
</html>