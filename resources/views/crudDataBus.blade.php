<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>crud data bus</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
<div class="container">
    <h2 class="mb-4 mt-4">Manajemen Jadwal Bus</h2>

    {{-- Flash message --}}
    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif
    @error('waktu_tiba')
    <div class="text-danger">{{ $message }}</div>
    @enderror


    {{-- Form Create --}}
    <div class="card mb-4">
        <div class="card-header">Tambah Jadwal Bus</div>
        <div class="card-body">
            <form action="{{ route('store') }}" method="POST">
                @csrf
                <div class="row">
                    <div class="col-md-3">  
                        <label>Bus</label>
                        <select name="id_bus" class="form-control" required>
                            <option value="">Pilih Bus</option>
                            @foreach($buses as $bus)
                                <option value="{{ $bus->id_bus }}">{{ $bus->nama_bus }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label>Halte</label>
                        <select name="id_halte" class="form-control" required>
                            <option value="">Pilih Halte</option>
                            @foreach($haltes as $halte)
                                <option value="{{ $halte->id_halte }}">{{ $halte->nama_halte }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label>Waktu Berangkat</label>
                        <input type="time" name="waktu_berangkat" class="form-control" required>
                    </div>
                    <div class="col-md-3">
                        <label>Waktu Tiba</label>
                        <input type="time" name="waktu_tiba" class="form-control" required>
                    </div>
                </div>
                <button class="btn btn-primary mt-3">Tambah Jadwal</button>
            </form>
        </div>
    </div>

    {{-- Tabel Data Jadwal --}}
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>Bus</th>
                <th>Halte</th>
                <th>Waktu Berangkat</th>
                <th>Waktu Tiba</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($jadwal as $item)
            <tr>
                <td>{{ $item->id_jadwal }}</td>
                <td>{{ $item->bus->nama_bus ?? '-' }}</td>
                <td>{{ $item->halte->nama_halte ?? '-' }}</td>
                <td>{{ $item->waktu_berangkat }}</td>
                <td>{{ $item->waktu_tiba }}</td>
                <td>
                    <!-- Tombol Edit -->
                    <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editModal{{ $item->id_jadwal }}">Edit</button>

                    <!-- Tombol Hapus -->
                    <form action="{{ route('destroy', $item->id_jadwal) }}" method="POST" class="d-inline" onsubmit="return confirm('Yakin hapus?')">
                        @csrf
                        @method('DELETE')
                        <button class="btn btn-danger btn-sm">Hapus</button>
                    </form>
                </td>
            </tr>

            <!-- Modal Edit -->
            <div class="modal fade" id="editModal{{ $item->id_jadwal }}" tabindex="-1" aria-labelledby="editModalLabel{{ $item->id_jadwal }}" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <form action="{{ route('update', $item->id_jadwal) }}" method="POST">
                    @csrf
                    @method('PUT')
                    <div class="modal-header">
                      <h5 class="modal-title" id="editModalLabel{{ $item->id_jadwal }}">Edit Jadwal</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        <label class="form-label">Bus</label>
                        <select name="id_bus" class="form-control" required>
                          @foreach($buses as $bus)
                            <option value="{{ $bus->id_bus }}" {{ $item->id_bus == $bus->id_bus ? 'selected' : '' }}>
                              {{ $bus->nama_bus }}
                            </option>
                          @endforeach
                        </select>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Halte</label>
                        <select name="id_halte" class="form-control" required>
                          @foreach($haltes as $halte)
                            <option value="{{ $halte->id_halte }}" {{ $item->id_halte == $halte->id_halte ? 'selected' : '' }}>
                              {{ $halte->nama_halte }}
                            </option>
                          @endforeach
                        </select>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Waktu Berangkat</label>
                        <input type="time" name="waktu_berangkat" value="{{ $item->waktu_berangkat }}" class="form-control" required>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Waktu Tiba</label>
                          <input type="time" name="waktu_tiba" value="{{ $item->waktu_tiba }}" class="form-control" required>
                          @error('waktu_tiba')
                              <div class="text-danger">{{ $message }}</div>
                          @enderror
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                      <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            @endforeach
        </tbody>
    </table>
</div>
</body>
</html>
