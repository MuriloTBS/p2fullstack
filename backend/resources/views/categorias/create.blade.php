@extends('layout')

@section('content')
    <div class="card shadow-sm">
        <div class="card-header">Nova Categoria</div>
        <div class="card-body">
            <form action="{{ route('categorias.store') }}" method="POST">
                @csrf
                <div class="mb-3">
                    <label class="form-label">Nome</label>
                    <input type="text" name="nome" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Descrição</label>
                    <textarea name="descricao" class="form-control"></textarea>
                </div>
                <button type="submit" class="btn btn-success">Salvar</button>
                <a href="{{ route('categorias.index') }}" class="btn btn-secondary">Voltar</a>
            </form>
        </div>
    </div>
@endsection