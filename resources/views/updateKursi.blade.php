<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Form Bus</title>
</head>
<body>
  <h2>Form Data Bus</h2>
  <form action="{{ route('update') }}" method="POST">
    @csrf
    <table border="1" cellpadding="8" cellspacing="0">
      <tr>
        <td><label for="id_bus">ID Bus</label></td>
        <td>
          <select name="id_bus" id="id_bus" required>
            <option value="">-- Pilih ID Bus --</option>
            <option value="1">Bus 1</option>
            <option value="2">Bus 2</option>
            <option value="3">Bus 3</option>
          </select>
        </td>
      </tr>
      <tr>
        <td><label for="tempat_duduk_tersedia">Tempat Duduk Tersedia</label></td>
        <td>
          <select name="tempat_duduk_tersedia" id="tempat_duduk_tersedia" required>
            <option value="">-- Pilih Presentase --</option>
            <option value="10">10%</option>
            <option value="25">25%</option>
            <option value="50">50%</option>
            <option value="75">75%</option>
            <option value="100">100%</option>
          </select>
        </td>
      </tr>
      <tr>
        <td colspan="2" align="center">
          <button type="submit">Simpan</button>
        </td>
      </tr>
    </table>
  </form>

  @foreach($kursi as $h)
    <tr border="1">
      <td>{{ $h->id_bus }}</td>
      <td>{{ $h->tempat_duduk_tersedia }}%</td>
    </tr>
  @endforeach
</body>
</html>
