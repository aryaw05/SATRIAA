<?php

namespace App\Observers;

use App\Events\updateKapasitasBusEvent;
use App\Models\Bus;

class BusObserver
{
    /**
     * Handle the Bus "created" event.
     */
    public function created(Bus $bus): void
    {
        //
    }

    /**
     * Handle the Bus "updated" event.
     */
    public function updated(Bus $bus): void
    {

    }

    /**
     * Handle the Bus "deleted" event.
     */
    public function deleted(Bus $bus): void
    {
        //
    }

    /**
     * Handle the Bus "restored" event.
     */
    public function restored(Bus $bus): void
    {
        //
    }

    /**
     * Handle the Bus "force deleted" event.
     */
    public function forceDeleted(Bus $bus): void
    {
        //
    }
}
