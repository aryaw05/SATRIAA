<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DataHalteEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    

    public $namaBus ;
    public $namaHalte;
    public $waktuBerangkat;
    public $waktuTiba;
    public function __construct( $namaBus, $namaHalte, $waktuBerangkat, $waktuTiba)
    {
        $this->namaBus = $namaBus;
        $this->namaHalte = $namaHalte;
        $this->waktuBerangkat = $waktuBerangkat;
        $this->waktuTiba = $waktuTiba;
    }


    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('data-halte'),
        ];
    }
    public function broadcastWith(): array
    {
        return [
            'namaBus' => $this->namaBus,
            'namaHalte' => $this->namaHalte,
            'waktuBerangkat' => $this->waktuBerangkat,
            'waktuTiba' => $this->waktuTiba,
        ];
    }
    public function broadcastAs()
    {
        return 'data.halte.updated'; 
    }   
}
