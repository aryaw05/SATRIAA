<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LocationUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */

    public $busId;
    public $latitude;
    public $longitude;

    public function __construct( $busId, $latitude,  $longitude)
    {
        $this->busId = $busId;
        $this->latitude = $latitude;
        $this->longitude = $longitude;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('public-updates'),
        ];
    }
    public function broadcastWith(): array
    {
        return [
        'bus_id' => $this->busId,
        'latitude' => $this->latitude,
        'longitude' => $this->longitude,
        ];
    }

        public function broadcastAs()
    {
        return 'location.updated'; 
    }


}
