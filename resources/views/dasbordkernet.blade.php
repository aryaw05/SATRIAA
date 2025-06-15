<!DOCTYPE html>
<html>
<head>
    <title>Dashboard Kernet</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #f0f2f5; }
        h1 { color: #2c3e50; }
        .btn-logout {
            margin-top: 20px;
            padding: 10px 15px;
            background-color: #e74c3c;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h1>Selamat datang, Kernet!</h1>
    <p>Ini adalah halaman dashboard untuk petugas kernet bus.</p>

    <!-- Jika sudah buat route logout dan controller -->
    <form action="{{ route('logoutBus') }}" method="POST">
        @csrf
        <button type="submit" class="btn-logout">Logout</button>
    </form>
</body>
</html>
