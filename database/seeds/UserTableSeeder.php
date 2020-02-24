<?php

use Illuminate\Database\Seeder;
use App\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::insert([
            [
                'name' => 'Administrador de Sistema',
                'email' => 'admin@keiron.cl',
                'password' => Hash::make('secret'),
                'tipo_user_id' => 1,
            ],
            [
                'name' => 'Usuario de Sistema 1',
                'email' => 'user1@keiron.cl',
                'password' => Hash::make('secret'),
                'tipo_user_id' => 2,
            ],
            [
                'name' => 'Usuario de Sistema 2',
                'email' => 'user2@keiron.cl',
                'password' => Hash::make('secret'),
                'tipo_user_id' => 2,
            ]
        ]);
    }
}
