<!DOCTYPE html>
<html>
<head>
    <title>Daftar Akun Kernet</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        th {
            background-color: #3490dc;
            color: white;
        }
    </style>
</head>
<body>
    <h1>Daftar Akun Kernet</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Username</th>
                <th>Role</th>
                <th>Dibuat</th>
            </tr>
        </thead>
        <tbody>
            @foreach($kernet as $user)
                <tr>
                    <td>{{ $user->id_user }}</td>
                    <td>{{ $user->nama }}</td>
                    <td>{{ $user->username }}</td>
                    <td>{{ $user->role }}</td>
                    <td>{{ $user->created_at }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
