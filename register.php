<?php
$conn = new mysqli("localhost", "root", "", "ad_rewards");
if ($conn->connect_error) die("Connection failed");

$username = $_POST['username'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $username, $email, $password);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo "Registration successful!";
} else {
    echo "Error: " . $conn->error;
}
$stmt->close();
$conn->close();
?>