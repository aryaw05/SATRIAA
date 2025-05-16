<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  @if(Auth::check())
    Halo, {{ Auth::user()->name }}! Role kamu: {{ Auth::user()->role }}
  @endif

  <form method="POST" action="/logout">
    @csrf
    <button type="submit">Logout</button>
  </form>

</body>
</html>