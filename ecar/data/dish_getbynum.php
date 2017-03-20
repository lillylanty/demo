
<?php

header('Content-Type:application/json');

$output = [];

@$start = $_REQUEST['start'];

$count = 5;
if(empty($start))
{
    $start = 0;
}

$conn = mysqli_connect('127.0.0.1','root','','people');
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "SELECT * FROM peopleData LIMIT $start,$count";
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