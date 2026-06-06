#!/bin/sh
set -e

echo "Aguardando banco de dados MySQL..."
until php -r "
    try {
        new PDO(
            'mysql:host=' . getenv('DB_HOST') . ';port=' . getenv('DB_PORT') . ';dbname=' . getenv('DB_DATABASE'),
            getenv('DB_USERNAME'),
            getenv('DB_PASSWORD')
        );
        exit(0);
    } catch (Exception \$e) {
        exit(1);
    }
" 2>/dev/null; do
    echo "  MySQL não disponível ainda, aguardando 2s..."
    sleep 2
done

echo "MySQL pronto!"

php artisan config:clear
php artisan migrate --force
php artisan db:seed --force

echo "Iniciando Apache..."
exec apache2-foreground
