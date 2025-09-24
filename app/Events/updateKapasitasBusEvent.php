<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class updateKapasitasBusEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public array $bus_list;
    public function __construct( array $bus_list)
    {
        $this->bus_list = $bus_list;
    }



    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('data-kepadatan-bus.'),
        ];
    }
    public function broadcastWith(): array
    {
        return [
            'data' => $this->bus_list,  
        ];
    }

    public function broadcastAs()
    {
        return 'kepadatan.updated'; 
    }
}
