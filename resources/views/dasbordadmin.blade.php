<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dashboard Pengelola Bus</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 font-sans">

  <!-- Header -->
  <header class="bg-white shadow p-4 flex justify-between items-center">
    <h1 class="text-xl font-bold">Dashboard Pengelola Bus</h1>
    <form method="POST" action="/logout">
      @csrf
      <button type="submit" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Keluar</button>
    </form>
  </header>

  <!-- Konten -->
  <main class="p-6">
    <!-- Selamat Datang -->
    <div class="mb-6">
      <h2 class="text-2xl font-semibold">Selamat datang, {{ Auth::user()->username }}</h2>
      <p class="text-gray-600">Anda login sebagai admin.</p>
    </div>

    <!-- Tombol Tambah Kernet -->
    <div class="mb-6">
      <a href="{{ route('addKernet') }}" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Tambah Kernet</a>
    </div>

    <!-- Statistik -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-sm text-gray-500">Total Bus</h2>
        <p class="text-2xl font-bold">25</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-sm text-gray-500">Supir Aktif</h2>
        <p class="text-2xl font-bold">18</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-sm text-gray-500">Jadwal Hari Ini</h2>
        <p class="text-2xl font-bold">12</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-sm text-gray-500">Rute Beroperasi</h2>
        <p class="text-2xl font-bold">7</p>
      </div>
    </div>

    <!-- Tabel Jadwal Bus -->
    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <h3 class="text-lg font-semibold mb-3">Jadwal Keberangkatan Hari Ini</h3>
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-50">
            <th class="border-b p-2">No Bus</th>
            <th class="border-b p-2">Rute</th>
            <th class="border-b p-2">Supir</th>
            <th class="border-b p-2">Waktu Berangkat</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-50">
            <td class="border-b p-2">B-01</td>
            <td class="border-b p-2">Jakarta - Bandung</td>
            <td class="border-b p-2">Pak Andi</td>
            <td class="border-b p-2">08:00</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="border-b p-2">B-02</td>
            <td class="border-b p-2">Bandung - Surabaya</td>
            <td class="border-b p-2">Pak Budi</td>
            <td class="border-b p-2">09:30</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="border-b p-2">B-03</td>
            <td class="border-b p-2">Jakarta - Yogyakarta</td>
            <td class="border-b p-2">Pak Slamet</td>
            <td class="border-b p-2">11:00</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>

</body>
</html>
