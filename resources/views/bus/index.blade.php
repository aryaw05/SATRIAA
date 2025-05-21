<h2>Data Bus</h2>

{{-- Tampilkan pesan sukses jika ada --}}
@if(session('success'))
    <div style="color: green;">
        {{ session('success') }}
    </div>
@endif

{{-- Tombol Tambah Bus --}}
<a href="{{ route('bus.create') }}">+ Tambah Bus</a>

<table  action="{{ route('bus.index') }}" method="POST border="1" cellpadding="8" cellspacing="0">
    <tr>
        <th>ID Bus</th>
        <th>Nomor Bus</th>
        <th>Rute</th>
        <th>Kapasitas Tempat Duduk</th>
        <th>Status</th>
        <th>Kondisi</th>
        <th>Aksi</th>
    </tr>

    @foreach($buses as $bus)
    <tr>
        <td>{{ $bus->id }}</td> {{-- pakai "id" kalau kamu pakai Laravel default primary key --}}
        <td>{{ $bus->nomor_bus }}</td>
        <td>{{ $bus->rute }}</td>
        <td>{{ $bus->kapasitas_tempat_duduk }}</td>
        <td>{{ $bus->status }}</td>
        <td>{{ $bus->kondisi }}</td>
        <td>
            <a href="{{ route('bus.edit', $bus) }}">Edit</a>

                <form action="{{ route('bus.destroy', $bus) }}" method="POST" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" onclick="return confirm('Hapus data bus ini?')">Hapus</button>
                </form>

        </td>
    </tr>
    @endforeach
</table>
