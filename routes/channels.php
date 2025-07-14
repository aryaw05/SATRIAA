<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('public-updates', function () {
    return true;
});

Broadcast::channel('data-halte', function () {
    return true;
});


Broadcast::channel('data-kepadatan-bus', function () {
    // You can add logic here to check if the user has access to this bus data
    // For example, you might check if the user is an admin or has a specific role
    // For now, we'll just return true to allow access to the channel
    // In a real application, you would implement proper authorization logic here
    return true; // Allow access for demonstration purposes
});
