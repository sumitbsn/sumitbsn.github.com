<?php

require './facebook.php';

$facebook = new Facebook(array(
'appId' => '',
'secret' => '',
'cookie' => true,
));

$user_profile = null;

$user = $facebook->getUser();
$loginUrl = $facebook->getLoginUrl(
array(
    'req_perms' => 'email,publish_stream,user_birthday,read_stream'
    ));

if($user) 
{
    $user_profile=$facebook->api('/me');
    echo "Welcome ".$user_profile['name'] .":";
        	
	echo "Your Profile Summary.<br />" ;


	echo "<pre>"; print_r($user_profile); echo "</pre>";

	
}
if (!$user) 
{
   echo "<script type=\"text/javascript\">\ntop.location.href = \"$loginUrl\";\n</script>";
}

?>

<html>
<title>FACEBOOK USER DETAILS</title>
</html>
