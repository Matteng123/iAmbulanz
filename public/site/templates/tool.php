<?php

$statusItems = array(
  0 => array( 'page' => 1,
    'title' => 'Gerät',
    'param' => 'device' ),
  1 => array( 'page' => 2,
    'title' => 'Modell',
    'param' => 'model' ),
  2 => array( 'page' => 3,
    'title' => 'Farbe',
    'param' => 'color' ),
  3 => array( 'page' => 4,
    'title' => 'Schaden',
    'param' => 'damage' ),
  4 => array( 'page' => 5,
    'title' => 'Preis',
    'param' => 'price' ),
  5 => array( 'page' => 6,
    'title' => 'Unverbindliche Anfrage',
    'param' => 'form' )
);
$damages = array(
	0 => array(
		'title' => 'Bildschirm',
		'value' => 'service-display' ),
	1 => array(
		'title' => 'Akku',
		'value' => 'service_akku' ),
	2 => array(
		'title' => 'Andere Komponente',
		'value' => 'service-smallpiece' ),
	3 => array(
		'title' => 'Wasserschaden',
		'value' => 'service-waterdamage' ),
	4 => array(
		'title' => 'Schadenstyp unbekannt',
		'value' => 'service-unknown' )
);

function getParamString($source, $replaceKey = "", $replaceValue = ""){
  $params = "";

  foreach($source as $item){
    if($item['param'] == $replaceKey){
      $params .= "&".$item['param']."=".$replaceValue;
    }
    else if(get($item['param'])){
      $params .= "&".$item['param']."=".get($item['param']);
    }
  }

  return $params;
}

function arePrevoiusParamsSet($statusItems, $value = 0){
  $count = 0;
  if($value == 0) return false;
  foreach($statusItems as $key => $item){
    if(get($item['param']) && ($key < $value)){
      $count++;
    }
  }
  if($count == $value)
    return true;
  else
    return false;
}

$paramString = getParamString($statusItems);

?>
<?php snippet('header') ?>
<?php snippet('view-start') ?>

  <main class="Application-main" role="main">

    <div class="Tool">
      <div class="Tool-navigation">
        <div class="Tool-logobar">

        </div>
        <div class="Tool-statusbar">
            <div class="Tool-statusbar-carousel">
              <?php foreach($statusItems as $key => $item) : ?>
                <div class="item<?php if( get($item['param']) ){ echo ' isset'; } ?>">
                  <?php if(($key == 0)||(intval(get('page'))>$key)||(arePrevoiusParamsSet($statusItems, $key))) : ?>
                    <a data-page="<?php echo $item['page']; ?>" class="<?php if(($key == 0 && !get('page'))||(intval(get('page')) == $item['page'])){ echo 'active'; } ?>" href="/<?php echo $page->uri(); ?>/?page=<?php echo $item['page']; echo $paramString; ?>"><span><?php echo $item['page']; ?></span><span><?php echo $item['title'] ?><i><?php echo get($item['param']) ?></i></span></a>
                  <?php else : ?>
                    <span><?php echo $item['page']; ?></span><span><?php echo $item['title'] ?><i><?php echo get($item['param']) ?></i></span>
                  <?php endif; ?>
                </div>
              <?php endforeach; ?>
            </div>
        </div>
      </div>
      <?php
        if( (!get('page')) || (get('page') == 1) ) :
          snippet('tool_page1', array('statusItems' => $statusItems));
        else :
          snippet('tool_page'.get('page'), array('statusItems' => $statusItems, 'damages' => $damages));
        endif; ?>
    </div>

  </main>
<?php snippet('view-end') ?>
<?php snippet('footer') ?>
