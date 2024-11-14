<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if(app()->environment('production')) {
            $this->call([
                ProductionSeeder::class
            ]);
        }
        else {
            $this->call([
                DevSeeder::class
            ]);
        }
    }
}
