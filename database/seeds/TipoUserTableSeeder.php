<?php

use Illuminate\Database\Seeder;
use App\TipoUsuario;

class TipoUserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TipoUsuario::insert([
            [
                'name' => 'Administrador'
            ],
            [
                'name' => 'Usuario de Sistema'
            ]
        ]);
    }
}
