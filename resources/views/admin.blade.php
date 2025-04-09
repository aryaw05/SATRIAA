<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Halte - Laravel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 20px;
        }

        h1 {
            text-align: center;
            color: #333;
        }

        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            border-radius: 10px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th, td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ddd;
        }

        th {
            background-color: #4CAF50;
            color: white;
        }

        .form-group {
            margin-bottom: 15px;
        }

        input[type="text"] {
            width: 100%;
            padding: 8px;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        button {
            padding: 8px 12px;
            margin-top: 10px;
            margin-right: 5px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .btn-add {
            background-color: #4CAF50;
            color: white;
        }

        .btn-edit {
            background-color: #ffc107;
            color: white;
        }

        .btn-delete {
            background-color: #f44336;
            color: white;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>CRUD Halte</h1>

        <!-- Form Tambah Data -->
        <div class="form-group">
            <form action="{{ route('createHalte') }}" method="POST">
                @csrf
                <label>Nama Halte:</label>
                <input type="text" name="nama_halte" placeholder="Masukkan nama halte" required>
                <label>Lokasi Halte:</label>
                <input type="text" name="lokasi_lat" placeholder="Masukkan lat halte" required>
                <input type="text" name="lokasi_long" placeholder="Masukkan long halte" required>
                <button type="submit" class="btn-add">Tambah Halte</button>
            </form>
        </div>

        <!-- Tabel Data Halte -->
        <table>
            <tr>
                <th>No</th>
                <th>Nama Halte</th>
                <th colspan="2">Lokasi</th>
                <th>Aksi</th>
            </tr>
            <?php $no=0 ;?>
            @foreach($halte as $h)
            <tr>
                <td><?php echo ++$no ?></td>
                <td>{{ $h->nama_halte }}</td>
                <td>{{ $h->lokasi_lat }}</td>
                <td>{{ $h->lokasi_long }}</td>
                <td>
                <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editModal{{ $h->id_halte }}">Edit</button>
                    <form action="{{ url('deleteHalte', $h->id_halte) }}" method="POST" style="display:inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn-delete">Hapus</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </table>
        <div class="modal fade" id="editModal{{ $h->id_halte }}" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editModalLabel">Edit Halte</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form action="{{ url('/editHalte', $h->id_halte) }}" method="POST">
                            @csrf
                            @method('PUT')

                            <div class="mb-3">
                                <label class="form-label">Nama Halte</label>
                                <input type="text" name="nama_halte" class="form-control" value="{{ $h->nama_halte }}" required>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Latitude</label>
                                <input type="text" name="lokasi_lat" class="form-control" value="{{ $h->lokasi_lat }}" required>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Longitude</label>
                                <input type="text" name="lokasi_long" class="form-control" value="{{ $h->lokasi_long }}" required>
                            </div>

                            <button type="submit" class="btn btn-success">Update</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
@if($errors->any())
    <div class="alert alert-danger">
        <ul class="mb-0">
            @foreach($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

