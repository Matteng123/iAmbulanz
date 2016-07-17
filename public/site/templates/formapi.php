<?php

if(!get('author') or get('author') != 'iAmbulanz') notFound();

  $form = $site->page(get('uid'));
  $mailbody = $form->mailbody()->kt();
  $clientbody = $form->clientbody()->kt();

  foreach( $_POST as $mail_key => $mail_value ) {
    $mailbody = str_replace('%'.$mail_key.'%', $mail_value, $mailbody);
    $clientbody = str_replace('%'.$mail_key.'%', $mail_value, $clientbody);
  }

  $email = email(array(
  'to'      => $form->recipient(),
  'from'    => $form->sender(),
  'subject' => $form->mailsubject(),
  'body'    => $mailbody
  ));

  if(get('email') and !$form->clientbody()->isEmpty()){
    $emailcopy = email(array(
    'to'      => get('email'),
    'from'    => $form->sender(),
    'subject' => $form->mailsubject(),
    'body'    => $clientbody
    ));
    $emailcopy->send();
  }

  if($email->send()) {
    $json = array( "success" => "true",
            "message" => preg_replace( "/\r|\n/", "", $form->successmessage()->kt() )
    );
  } else {
    $json = array( "success" => "false",
            "message" => $email->error()
    );
  }

  echo json_encode($json, JSON_NUMERIC_CHECK);

?>
