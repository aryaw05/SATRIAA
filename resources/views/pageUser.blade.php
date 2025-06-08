<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login Bus</title>
    </head>
    <body>
        @if(Auth::check())
        <p>
            Halo, {{ Auth::user()->name }}! Role kamu: {{ Auth::user()->role }}
        </p>
        <form method="POST" action="/logout">
            @csrf
            <button type="submit">Logout</button>
        </form>
        @endif

        <h1>SILAHKAN LOGIN UNTUK BUS</h1>

        @if ($errors->any())
        <div style="color: red">
            <ul>
                @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
        @endif

        <form action="/logBus" method="POST">
            @csrf
            <label for="id_bus">Pilih Bus:</label>
            <select name="id_bus" id="id_bus" required>
                <option value="">-- Pilih Bus --</option>
                @foreach($buses as $bus)
                <option value="{{ $bus->id_bus }}">
                    {{ $bus->nomor_bus }} - {{ $bus->rute }}
                </option>
                @endforeach
            </select>

            <br />

            <label for="password">Password Bus:</label>
            <input type="password" name="password" id="password" required />

            <br /><br />

            <button type="submit">Login ke Bus</button>
        </form>
    </body>
</html>
