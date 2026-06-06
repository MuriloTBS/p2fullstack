@extends('layout')

@section('content')
    <div class="card shadow-sm">
        <div class="card-header">Editar Categoria</div>
        <div class="card-body">
            <form action="{{ route('categorias.update', $categoria->id) }}" method="POST">
                @csrf
                @method('PUT')
                <div class="mb-3">
                    <label class="form-label">Nome</label>
                    <input type="text" name="nome" class="form-control" value="{{ $categoria->nome }}" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Descrição</label>
                    <textarea name="descricao" class="form-control">{{ $categoria->descricao }}</textarea>
                </div>
                <button type="submit" class="btn btn-primary">Atualizar</button>
                <a href="{{ route('categorias.index') }}" class="btn btn-secondary">Voltar</a>
            </form>
        </div>
    </div>
@endsection