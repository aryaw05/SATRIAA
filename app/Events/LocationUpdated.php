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

    public array $location_list;

    public function __construct(array $location_list)
    {
        $this->location_list = $location_list;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('location-updated.'),
        ];
    }

    public function broadcastWith(): array
    {
        return [
        'data' => $this->location_list
        ];
    }

        public function broadcastAs()
    {
        return 'bus.location.updated'; 
    }


}
