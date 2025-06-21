<!DOCTYPE html>
<html>
<head>
    <title>Halaman Admin</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #2c3e50; }
        .btn {
            display: inline-block; padding: 10px 15px; background: #3490dc; color: white; text-decoration: none; border-radius: 4px; cursor: pointer;
            border: none; font-size: 16px;
        }
        /* Modal styles */
        .modal {
            display: none; 
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background-color: rgba(0,0,0,0.5); 
            justify-content: center; align-items: center;
            z-index: 9999;
        }
        .modal-content {
            background: white; padding: 20px; border-radius: 6px; width: 320px; box-sizing: border-box;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        .close {
            float: right; cursor: pointer; font-weight: bold; font-size: 20px;
        }
        label, input {
            display: block; width: 100%; margin-top: 10px;
            box-sizing: border-box;
        }
        input[type="submit"] {
            margin-top: 15px; background: #28a745; color: white; border: none; padding: 10px; cursor: pointer;
            border-radius: 4px;
            font-size: 16px;
        }
        .error-message {
            color: red; font-size: 14px; margin-top: 5px;
        }
        .success-message {
            color: green; font-size: 14px; margin-top: 5px;
        }
    </style>
</head>
<body>
    <h1>Selamat datang di Halaman Admin</h1>

    <button class="btn" id="btnOpenModal">Buat Akun Kernet</button>

    <!-- Modal Form -->
    <div class="modal" id="modalForm">
        <div class="modal-content">
            <span class="close" id="btnCloseModal">&times;</span>
            <h3>Form Buat Akun Kernet</h3>

            @if(session('success'))
                <div class="success-message">{{ session('success') }}</div>
            @endif

            @if(session('error'))
                <div class="error-message">{{ session('error') }}</div>
            @endif

            <form method="POST" action="/admin/kernet/store">
                @csrf
                <label for="nama">Nama Kernet:</label>
                <input type="text" name="nama" id="nama" value="{{ old('nama') }}" required>
                @error('nama')
                    <div class="error-message">{{ $message }}</div>
                @enderror

                <label for="username">Username Kernet:</label>
                <input type="text" name="username" id="username" value="{{ old('username') }}" required>
                @error('username')
                    <div class="error-message">{{ $message }}</div>
                @enderror

                <label for="password">Password:</label>
                <input type="password" name="password" id="password" required>
                @error('password')
                    <div class="error-message">{{ $message }}</div>
                @enderror

                <input type="submit" value="Simpan Akun">
            </form>
        </div>
    </div>

    <script>
        const btnOpen = document.getElementById('btnOpenModal');
        const btnClose = document.getElementById('btnCloseModal');
        const modal = document.getElementById('modalForm');

        btnOpen.onclick = () => {
            modal.style.display = 'flex';
        }
        btnClose.onclick = () => {
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }

        // Jika ada error dari validasi, otomatis buka modal
        @if ($errors->any() || session('error'))
            modal.style.display = 'flex';
        @endif
    </script>
</body>
</html>
