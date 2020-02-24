# Keirón Test: Angel Maturana

# Introducción
Proyecto para Keirón el cual consiste en crear una mesa de ayuda con las siguientes indicaciones:

> - Debes crear una app en React + Laravel + MySql (como te comente, puedes usar la que prefieras) en la cual se pueda registrar y logear
> usuario (sin recuperación de contraseña) y en la que existan dos
> perfiles de usuario: Administrador y Usuario.  
> - El perfil administrador solo tiene una tabla para gestionar tickets (Crud) en donde se los puede asignar a usuarios.  
> - El perfil de usuario solo posee una lista de tickets asignados a el y un boton para pedirlos (setear el ticket_pedido).  
> - El login de usuarios debe discriminar y redireccionar según su perfil.  
> - Debes subir el proyecto a git y enviarnos las instrucciones para levantar el proyecto (incluye el script de SQL en el proyecto).  
> - El proyecto cuenta con 3 Tablas:  
> 1. usuarios: id, id_tipouser, nombre, mail, pass  
> 2. ticket: id , id_user , ticket_pedido  
> 3. tipo_usuario: id, nombre

## Comenzando!

A continuación se presentarán los pasos a realizar para poder instalar y ejecutar el proyecto.

### Requerimientos

Necesitas tener instalado lo siguiente:

    PHP >= 7.1.3
    PHP Extensions: mbstring, json, xml, OpenSSL
    Nodejs >= 10.16.*
 
 ### Instalación
 Descargar el proyecto y dentro de la carpeta ejecutar y seguir los siguientes pasos:

 1. Ejecutar: npm install
 2. Ejecutar: composer install
 3. Ir a mysql y crear una base de datos llamada "keiron".
 4. Configurar la conexión a la base de datos en "/config/database.php" en la sección de mysql.
 5. Ejecutar: php artisan migrate
 6. Finalmente ejecutar: php artisan db:seed

Con esto se instalarán las dependencias requeridas para ejecutar correctamente el proyecto al igual que los datos de prueba en la base de datos (seeders).

### Ejecución
Para iniciar la aplicación debemos ingresar en la consola:

    php artisan serv
Esto levantará el servidor en local desde el puerto 8080. El acceso desde navegador sería:

    http://localhost:8000

Se nos llevará a la página principal de la aplicación. Desde el panel superior podemos ingresar al sistema o registrarnos en él.

## Testing

Para realizar las pruebas correspondientes tenemos dos accesos con los que podemos ingresar:

 1. user: admin@keiron.cl - password: secret - Perfil Administrador.
 2. user: user1@keiron.cl - password: secret - Perfil Usuario.
 3. user: user2@keiron.cl - password: secret - Perfil Usuario.

Todos los usuarios nuevos que se registren quedarán como "Perfil Usuario".

## Componentes y tecnologías utilizadas

 - Lenguaje: PHP
 - Framework PHP: [Laravel v6.2](https://laravel.com/docs/6.x)
 - Framework Javascript: [React](https://es.reactjs.org/docs/getting-started.html)
 - Framework UI: [Material-UI](https://material-ui.com/getting-started/installation/)
