<?php
header('Content-Type:application/json');

$output = [];

@$start = $_REQUEST['start'];

$count = 8;
if(empty($start))
{
    $start = 0;
}

require('init.php');

$sql = "SELECT did,name,price,img_sm,applyer FROM e_car LIMIT $start,$count";
$result = mysqli_query($conn,$sql);

while(true)
{
    $row = mysqli_fetch_assoc($result);
    if(!$row)
    {
        break;
    }
    $output[] = $row;
}

echo json_encode($output);
?>