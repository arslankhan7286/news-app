# Base image
FROM php:8.1-apache

# Install required system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    zip \
    unzip \
    nodejs \
    npm

RUN docker-php-ext-install pdo_mysql

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set the working directory
WORKDIR /var/www/html

# Copy the composer files and install dependencies
COPY composer.json composer.lock ./

# Install Composer dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && composer install --no-scripts --no-autoloader

# Copy the rest of the application
COPY . .

# Generate the autoloader
RUN composer dump-autoload --optimize

# Create the vendor folder
RUN composer install

# Set up the environment
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Enable Apache modules
RUN a2enmod rewrite


# Set file permissions
RUN chown -R www-data:www-data /var/www/html/storage

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
