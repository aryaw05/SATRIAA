<?php

namespace App\Events;

use App\Models\Halte;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class HalteCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $halte;

    public function __construct(Halte $halte)
    {
        $this->halte = $halte;
    }

    public function broadcastOn()
    {
        return new Channel('haltes'); // Return Channel object, bukan array
    }

    // Tambahkan method berikut
    public function broadcastWith()
    {
        return [
            'halte' => $this->halte->toArray()
        ];
    }
}
