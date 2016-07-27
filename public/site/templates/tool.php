<?php

$statusItems = array(
  0 => array( 'page' => 1,
    'title' => 'Gerät',
    'param' => 'device' ),
  1 => array( 'page' => 2,
    'title' => 'Farbe',
    'param' => 'color' ),
  2 => array( 'page' => 3,
    'title' => 'Schaden',
    'param' => 'damage' ),
  3 => array( 'page' => 4,
    'title' => 'Preis',
    'param' => 'price' ),
  4 => array( 'page' => 5,
    'title' => 'Unverbindliche Anfrage',
    'param' => 'form' )
);

function getParams(){
  $params = "";
  if(get('device')){
    $params .= "&device=".get('device');
  }
  return $params;
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
            <ul>
              <?php foreach($statusItems as $key => $item) : ?>
                <li>
                  <?php if(($key == 0)||intval(get('page'))>$key) : ?>

                    <a class="<?php if($key == 0|| intval(get('page')) == $item['page']) echo 'active' ?>" href="/anfrage/?page=<?php echo $item['page']; echo getParams(); ?>"><span><?php echo $item['page']; ?></span><span><?php echo $item['title'] ?></span></a>
                  <?php else : ?>
                    <span><?php echo $item['page']; ?></span><span><?php echo $item['title'] ?></span>
                  <?php endif; ?>
                </li>
              <?php endforeach; ?>
            </ul>
            <!-- <a href="/anfrage/?page=1"<?php getParams(); ?>"">
              <span>1</span><span>Geräte<i><?php echo get('device') ?></i></span>
            </a>
            <a href="/anfrage/?page=2"<?php getParams(); ?>""><span>2</span><span>Modell<i></i></span></a>
            <a href="/anfrage/?page=3"<?php getParams(); ?>""><span>3</span><span>Farbe<i></i></span></a>
            <a href="/anfrage/?page=4"<?php getParams(); ?>""><span>4</span><span>Schaden<i></i></span></a>
            <a href="/anfrage/?page=5"<?php getParams(); ?>""><span>4</span><span>Preis<i></i></span></a>
            <a href="/anfrage/?page=6"<?php getParams(); ?>""><span>4</span><span>Unverbindliche Anfrage<i></i></span></a> -->
        </div>
      </div>
      <div class="Tool-body">
        <h1><?php echo $page->headline()->html() ?></h1>
        <!-- <?php snippet('blogelements', array('blog' => $page, 'index' => $index)) ?> -->
      </div>
    </div>

  </main>
<?php snippet('view-end') ?>
<?php snippet('footer') ?>
