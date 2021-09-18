<?php
require 'connection.php';
print_r($conn);
$postdata = file_get_contents("php://input"); 

if(isset($postdata)&&!empty($postdata)){
    $request = json_decode($postdata);

    print_r($request);

    $name = $request->name;
    $email = $request->email;
    $password = $request->password;

    $sql = "INSERT INTO students (name,email,password) VALUES (
        '{$name}',
        '{$email}',
        '{$password}'
    )";

    if($conn->query($sql)===TRUE){
        echo "working";
        http_response_code(201);
    }else{
        echo "Error: " . $sql . "<br>" . $conn->error;
        http_response_code(422);
    }
} 