<?php

//if(!r::is_ajax()) notFound();

$locations = $site->standorte()->toStructure();
$features = array();

foreach($locations as $location) {
  $features[] = array(
    'type'  => 'Feature',
    'geometry' => array(
      'type' => 'Point',
      'coordinates' => array((string)$location->lat(), (string)$location->long())
    ),
    'properties' => array(
      'title' => '',
      'icon' => 'standort',
      'headline' => html($location->title()),
      'description' => '<p>'.html($location->street()).'<br/>'.html($location->zip()).'&nbsp;'.html($location->city()).'</p><strong>Kontakt:</strong><table><tr><td>Telefon:&nbsp;&nbsp;</td><td>'.$location->tel().'</td></tr><tr><td>Mobil:</td><td>'.$location->mobil().'</td></tr><tr><td>E-Mail:</td><td><a href="mailto:'.$location->email().'">› '.html($location->email()).'</a></td></tr></table><strong>Öffnungszeiten:</strong><table><tr><td>Mo. - Fr.:&nbsp;&nbsp;</td><td>'.$location->timesweek().'</td></tr><tr><td>Sa.: </td><td>'.$location->timesweeken().'</td></tr></table>'
    )
  );
}
$json = array(
  'type' => 'FeatureCollection',
  'features' => $features
);

header('Content-type: application/json; charset=utf-8');
echo json_encode($json, JSON_NUMERIC_CHECK);

?>
