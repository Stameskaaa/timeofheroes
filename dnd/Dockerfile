# Базовый образ PHP-FPM
FROM php:8.2-fpm

# Установка системных зависимостей и расширений PHP
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libpq-dev \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql pgsql gd zip

# Установка Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Рабочая директория
WORKDIR /var/www/html

# Копируем только composer.json и composer.lock
COPY composer.json composer.lock ./

# Устанавливаем зависимости БЕЗ --no-dev (чтобы были все бибилиотеки)
RUN composer install --optimize-autoloader --no-scripts

# Копируем весь проект
COPY . .

# СОЗДАЕМ папки если их нет и устанавливаем права
RUN mkdir -p storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Запускаем post-autoload-dump скрипты вручную
RUN composer dump-autoload \
    && php artisan package:discover --ansi

# PHP-FPM запускается по умолчанию
CMD ["php-fpm"]