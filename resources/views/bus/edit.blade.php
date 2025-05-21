<h2>Edit Bus</h2>

@if ($errors->any())
    <div style="color:red;">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<form action="{{ route('bus.update', $bus->id_bus) }}" method="POST">
    @csrf
    @method('PUT')

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

    <button type="submit">Update</button>
</form>
