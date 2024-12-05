<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(2)->create();
        Product::factory(10)->create();
        User::factory()->create([
            'name' => fake()->name(),
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
            'contact_number' => fake()->phoneNumber(),
            'role' => 'admin'
        ]);
    }
}
