
<?php
header('Content-Type:application/json');

@$id = $_REQUEST['id'];
if(empty($id))
{
    echo '[]';
    return;
}

$output = [];

require('init.php');

$sql = "SELECT did,name,price,img_lg,detail,material FROM kf_dish WHERE did=$id";
$result = mysqli_query($conn,$sql);

$row = mysqli_fetch_assoc($result);
if(empty($row))
{
    echo '[]';
}
else
{
    $output[] = $row;
    echo json_encode($output);
}

?>