<?php
return [
    'default' => 'reverb',

    'servers' => [
        'reverb' => [
            'host' => env('REVERB_SERVER_HOST', '127.0.0.1'), // Ubah dari 0.0.0.0 ke 127.0.0.1
            'port' => env('REVERB_SERVER_PORT', 8080),
            'hostname' => env('REVERB_SERVER_HOSTNAME', 'localhost'), // 👈 Tambahkan ini
            'options' => [
                'tls' => [], // Nonaktifkan TLS untuk development
                'heartbeat_interval' => 30,
                'timeout' => 60,
            ],
            'max_request_size' => 10000,
            'pulse_ingest_interval' => 15, // ✅ tambahkan ini
            'telescope_ingest_interval' => 15, // bisa juga ditambahkan sekalian
            'scaling' => [
                'enabled' => false, // Nonaktifkan scaling jika tidak pakai Redis
            ],
        ],
    ],

    'apps' => [
        'provider' => 'config',
        'apps' => [
            [
                'key' => env('REVERB_APP_KEY', 'reverb_key_123'),
                'secret' => env('REVERB_APP_SECRET', 'reverb_secret_123'),
                'app_id' => env('REVERB_APP_ID', 'reverb_app_123'),
                'options' => [
                    'host' => env('REVERB_HOST', '127.0.0.1'),
                    'port' => env('REVERB_PORT', 8080),
                    'scheme' => 'http', // Pakai http untuk local
                    'useTLS' => false,
                ],
                'allowed_origins' => ['*'],
                'ping_interval' => 60,
                'max_message_size' => 10000,
            ],
        ],
    ],
];