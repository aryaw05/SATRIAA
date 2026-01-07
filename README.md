# SATRIA TRACKER

**SATRIA** is a comprehensive web-based platform designed to modernize and streamline the management of bus transportation systems. By leveraging real-time data and a user-centric interface, SATRIA bridges the gap between transportation administrators, bus conductors (*kernets*), and passengers, ensuring efficient operations and improved service delivery.

## Project Overview

SATRIA is a platform dedicated to the city's free bus service. The core mission of this project is to tackle the persistent issue of service irregularity by implementing real-time bus tracking. This feature allows passengers to monitor precise bus locations, eliminating uncertainty and significantly saving valuable time for commuters.

## Key Features

### 1. Administrator Dashboard
A robust control panel for transport operators to manage core operational data:
- **Fleet Management**: Register and monitor bus fleets, tracking their operational status.
- **Schedule Management**: Create and modify bus departure and arrival schedules.
- **Personnel Management**: Manage user accounts for administrators and conductors (*kernets*).
- **Route & Stop Management**: Configure bus stops (*haltes*) and routes within the network.

### 2. Conductor (Kernet) Interface
A mobile-responsive interface designed for on-duty conductors:
- **Real-Time Status Updates**: Update bus operating status (e.g., On-Route, Resting, Maintenance).
- **Capacity Monitoring**: Report current seat occupancy levels (Full, Available seats) to the system.
- **Condition Reporting**: Logger for reporting physical issues or maintenance needs of the vehicle.
- **Location Tracking**: Continuous GPS location sharing to simple tracking and coordination.

### 3. Real-Time Integration
- **Live GPS Tracking**: Visual map interface powered by Leaflet to monitor bus movements.
- **Dynamic Updates**: Uses WebSockets to reflect status and capacity changes instantly across all dashboards without page reloads.

## Technology Stack

This project is built using modern web technologies to ensure performance, scalability, and a seamless user experience:

- **Backend**: [Laravel 12](https://laravel.com) - A robust PHP framework for secure and scalable API delivery.
- **Frontend**: [React](https://reactjs.org) via [Inertia.js](https://inertiajs.com) - Providing a modern, single-page application (SPA) detailed experience within a classic server-side routing paradigm.
- **Styling**: [TailwindCSS](https://tailwindcss.com) & [DaisyUI](https://daisyui.com) - For a sleek, responsive, and accessible user interface.
- **Real-Time Services**: [Laravel Reverb](https://laravel.com/docs/reverb) / WebSockets - For live data broadcasting.
- **Maps**: [Leaflet.js](https://leafletjs.com) - For interactive map components and location visualization.

## Installation & Setup

To set up the project locally, follow these steps:

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/aryaw05/SATRIAA.git
    cd SATRIAA
    ```

2.  **Install Dependencies**
    ```bash
    composer install
    npm install
    ```

3.  **Environment Configuration**
    Copy the example environment file and configure your database and database settings:
    ```bash
    cp .env.example .env
    ```

4.  **Generate Application Key**
    ```bash
    php artisan key:generate
    ```

5.  **Run Migrations**
    Set up the database tables:
    ```bash
    php artisan migrate
    ```

6.  **Start Development Server**
    Run the Laravel server and Vite for frontend assets:
    ```bash
    npm run dev
    ```

## License

This project is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).
