<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Form Kondisi Bus</title>
</head>
<body>
  <h2>Form Kondisi Bus</h2>
  <form action="/updateKondisiBus" method="POST">
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
        <td><label for="kondisi">Tempat Duduk Tersedia</label></td>
        <td>
          <select name="kondisi" id="kondisi" required>
            <option value="">-- Pilih Kondisi --</option>
            <option value="Rusak">Rusak</option>
            <option value="Kendala">Kendala</option>
            <option value="Lancar">Lancar</option>
            
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

  @foreach($Bus as $h)
    <tr border="1">
      <td>{{ $h->id_bus }}</td>
      <td>{{ $h->kondisi }}%</td>
    </tr>
  @endforeach
</body>
</html>
