<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Dashboard Bus</h1>

@if ($bus)
    <p><strong>Nomor Bus:</strong> {{ $bus->nomor_bus }}</p>
    <p><strong>Rute:</strong> {{ $bus->rute }}</p>
    <p><strong>Status:</strong> {{ $bus->status }}</p>
    <p><strong>Kondisi:</strong> {{ $bus->kondisi }}</p>

    <!-- Kamu bisa tambahkan form update kondisi atau tracking di sini -->
@else
    <p>Data bus tidak ditemukan.</p>
@endif

<form method="POST" action="/logoutBus">
    @csrf
    <button type="submit">Logout</button>
</form>

</body>
</html>