<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tambah Kernet</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 font-sans">

  <!-- Header -->
  <header class="bg-white shadow p-4">
    <h1 class="text-xl font-bold">Tambah Kernet</h1>
  </header>

  <!-- Konten -->
  <main class="p-6">
    <!-- Form Tambah Kernet -->
    <form method="POST" action="{{ route('storeKernet') }}">
      @csrf
      <div class="mb-4">
        <label for="nama" class="block text-sm font-semibold">Nama</label>
        <input type="text" name="nama" id="nama" class="w-full p-2 border border-gray-300 rounded mt-1" required>
      </div>

      <div class="mb-4">
        <label for="alamat" class="block text-sm font-semibold">Alamat</label>
        <input type="text" name="alamat" id="alamat" class="w-full p-2 border border-gray-300 rounded mt-1" required>
      </div>

      <div class="mb-4">
        <label for="telepon" class="block text-sm font-semibold">Telepon</label>
        <input type="text" name="telepon" id="telepon" class="w-full p-2 border border-gray-300 rounded mt-1" required>
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Tambah Kernet</button>
    </form>
  </main>

</body>
</html>
