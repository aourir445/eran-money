<?php
$conn = new mysqli("localhost", "root", "", "ad_rewards");
if ($conn->connect_error) die("Connection failed");

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($password, $user['password'])) {
    echo json_encode($user);
} else {
    echo "Invalid credentials";
}
$stmt->close();
$conn->close();
?>