<?php
// ContactUs API: inserts a new row into the contact table.
// Expects JSON (recommended) or form-encoded POST body.

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

if (($_SERVER["REQUEST_METHOD"] ?? "") === "OPTIONS") {
  http_response_code(200);
  exit;
}

function bad($message, $code = 400, $extra = null) {
  http_response_code($code);
  $payload = ["success" => false, "message" => $message];
  if ($extra !== null) $payload["error"] = $extra;
  echo json_encode($payload);
  exit;
}

if (($_SERVER["REQUEST_METHOD"] ?? "") !== "POST") {
  bad("Method not allowed", 405);
}

// IMPORTANT: Do not hardcode DB credentials in this file.
// Configure these environment variables on the server:
// - DB_HOST, DB_USER, DB_PASS, DB_NAME
$host = "208.109.43.124";
$user = "medhat";
$pass = "Admin123!@#";
$dbname = "contacts_web";

if ($host === "" || $user === "" || $dbname === "") {
  bad("Server DB env vars not set (DB_HOST/DB_USER/DB_PASS/DB_NAME)", 500);
}

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
  bad("Database connection failed", 500, $conn->connect_error);
}
$conn->set_charset("utf8mb4");

// Accept either JSON body or form-encoded body
$data = [];
$contentType = strtolower($_SERVER["CONTENT_TYPE"] ?? "");
if (strpos($contentType, "application/json") !== false) {
  $raw = file_get_contents("php://input");
  $json = json_decode($raw, true);
  if (is_array($json)) $data = $json;
} elseif (!empty($_POST)) {
  $data = $_POST;
}

// React form currently uses: from_email, subject (actually name), message
$name = trim((string)($data["name"] ?? $data["subject"] ?? ""));
$mail = trim((string)($data["mail"] ?? $data["from_email"] ?? $data["email"] ?? ""));
$message = trim((string)($data["message"] ?? ""));

if ($name === "" || $mail === "" || $message === "") {
  bad("Missing required fields", 422, [
    "required" => ["name (or subject)", "mail (or from_email)", "message"],
  ]);
}
if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
  bad("Invalid email address", 422);
}

// Insert row
$stmt = $conn->prepare("INSERT INTO arkan_contacts (Mail, Name, Message) VALUES (?, ?, ?)");
if (!$stmt) {
  bad("Failed to prepare statement", 500, $conn->error);
}
if (!$stmt->bind_param("sss", $name, $mail, $message)) {
  bad("Failed to bind parameters", 500, $stmt->error);
}
if (!$stmt->execute()) {
  bad("Failed to insert row", 500, $stmt->error);
}

echo json_encode([
  "success" => true,
  "message" => "Message saved",
  "id" => $stmt->insert_id ?? null,
]);
