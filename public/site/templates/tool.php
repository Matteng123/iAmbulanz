<?php

function getParams(){
  $params = "";
  if(get('device')){
    $params .= "&device=".get('device');
  }
  echo $params;
}

?>
<?php snippet('header') ?>
<?php snippet('view-start') ?>



  <main class="Application-main" role="main">

    <div class="Tool">
      <div class="Tool-navigation">
        <div class="Tool-logobar">

        </div>
        <div class="Tool-statusbar">
            <a href="/anfrage/?page=1"<?php getParams(); ?>""><span>1</span><span>Geräte</span></a>
            <a href="/anfrage/?page=2"<?php getParams(); ?>""><span>2</span>Modell</a>
            <a href="/anfrage/?page=3"<?php getParams(); ?>""><span>3</span>Farbe</a>
            <a href="/anfrage/?page=4"<?php getParams(); ?>""><span>4</span>Schaden</a>
            <a href="/anfrage/?page=5"<?php getParams(); ?>""><span>4</span>Preis</a>
            <a href="/anfrage/?page=6"<?php getParams(); ?>""><span>4</span>Unverbindliche Anfrage</a>
        </div>
      </div>
      <div class="Tool-body">
        <h1><?php echo $page->headline()->html() ?></h1>
        <?php snippet('blogelements', array('blog' => $page, 'index' => $index)) ?>
      </div>
    </div>

  </main>
<?php snippet('view-end') ?>
<?php snippet('footer') ?>
