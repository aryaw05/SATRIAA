<h2>Tambah Bus</h2>

{{-- Tampilkan pesan sukses --}}
@if (session('success'))
    <div style="color:green;">
        {{ session('success') }}
    </div>
@endif

{{-- Tampilkan error validasi --}}
@if ($errors->any())
    <div style="color:red;">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

{{-- Form input bus --}}
<form action="{{ route('bus.store') }}" method="POST">
    @csrf

    <label>Nomor Bus:</label><br>
    <input type="text" name="nomor_bus" value="{{ old('nomor_bus') }}"><br><br>

    <label>Rute:</label><br>
    <input type="text" name="rute" value="{{ old('rute') }}"><br><br>

    <label>Kapasitas Tempat Duduk:</label><br>
    <input type="number" name="kapasitas_tempat_duduk" value="{{ old('kapasitas_tempat_duduk') }}"><br><br>

    <label>Status:</label><br>
    <input type="text" name="status" value="{{ old('status') }}"><br><br>

    <label>Kondisi:</label><br>
    <input type="text" name="kondisi" value="{{ old('kondisi') }}"><br><br>

    <button type="submit">Simpan</button>
</form>
