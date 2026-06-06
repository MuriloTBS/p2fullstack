<<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Array com dados fictícios mas realistas
        $categorias = [
            [
                'nome' => 'Eletrônicos',
                'descricao' => 'Dispositivos como smartphones, notebooks e acessórios.'
            ],
            [
                'nome' => 'Livros',
                'descricao' => 'Romances, técnicos, didáticos e biografias.'
            ],
            [
                'nome' => 'Móveis',
                'descricao' => 'Itens de decoração e mobiliário para escritório e casa.'
            ],
            [
                'nome' => 'Vestuário',
                'descricao' => 'Roupas masculinas, femininas e infantis.'
            ],
            [
                'nome' => 'Alimentos',
                'descricao' => 'Produtos perecíveis e não perecíveis.'
            ],
        ];

        // Loop para criar cada categoria usando o Model
        // O método create() aciona o Eloquent, preenchendo 'created_at' e 'updated_at' automaticamente
        foreach ($categorias as $categoria) {
            Categoria::create($categoria);
        }
    }
}