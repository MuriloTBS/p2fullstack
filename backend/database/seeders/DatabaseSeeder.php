<?php

namespace Database\Seeders;

use App\Models\Categoria;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name'     => 'Administrador',
                'password' => Hash::make('password'),
                'role'     => 'admin',
            ]
        );

        User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name'     => 'Usuário Padrão',
                'password' => Hash::make('password'),
                'role'     => 'user',
            ]
        );

        $categorias = [
            ['nome' => 'Eletrônicos', 'descricao' => 'Dispositivos como smartphones, notebooks e acessórios.'],
            ['nome' => 'Livros',      'descricao' => 'Romances, técnicos, didáticos e biografias.'],
            ['nome' => 'Móveis',      'descricao' => 'Itens de decoração e mobiliário para escritório e casa.'],
            ['nome' => 'Vestuário',   'descricao' => 'Roupas masculinas, femininas e infantis.'],
            ['nome' => 'Alimentos',   'descricao' => 'Produtos perecíveis e não perecíveis.'],
        ];

        foreach ($categorias as $cat) {
            Categoria::firstOrCreate(['nome' => $cat['nome']], $cat);
        }
    }
}
