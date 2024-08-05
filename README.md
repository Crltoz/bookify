<h1 align="center">
  <br>
  <a href="https://github.com/Crltoz/bookify"><img src="https://i.imgur.com/7bHfocQ.png" alt="Bookify"></a>
  <br>
  <br>
</h1>

<h4 align="center">Bookify. Explora, reserva y disfruta.</h4>

<p align="center">
  <a href="https://nodejs.org/en/download">
    <img alt="Node.js" src="https://img.shields.io/badge/node_js-v16-orange">
  </a>
  <a href="https://spring.io/projects/spring-boot">
     <img src="https://img.shields.io/badge/java-spring-boot" alt="Java-SpringBoot">
  </a>
</p>

<p align="center">
  <a href="#overview">Overview</a>
  •
  <a href="#requerimientos">Requerimientos</a>
  •
  <a href="#environment-variables">Environment-Variables</a>
  •
  <a href="#license">License</a>
</p>

# ▶️ Overview

Este proyecto es el desafío final del curso "Professional Developer" de Digital House, impulsada también por Globant, Mercado Libre.
La aplicación web utiliza Java con la dependencia de Spring Boot para el backend, ReactJS para el frontend y MongoDB como base de datos.
La idea es desarrollar un "Online Booking", donde se pueden reservar habitaciones. Yo decidí llamar a este 'Bookify'.
Es de código abierto, así que cualquiera puede realizar forks y modificarlo a su gusto. También puede servir para una base de otra aplicación
que estén desarrollando.

<a href="https://bookify.website">Demo</a>


**🛠️ Features:**

- Registro y autenticación de usuarios.
    - Los usuarios guardados tienen la contraseña hasheada a una lista de bytes para más seguridad, la aplicación nunca sabrá la contraseña de sus usuarios.
    - JWT para mantener sesión iniciada. Esta no contiene datos sensibles. Se usa en cada request también para verificar que realmente se esté logueado y si tiene permisos especiales.
    - La JWT de sesión expira para evitar que alguien intentara obtener el secret key con fuerza bruta (imposible igualmente sin una computadora cuántica)
    - El registro envía una confirmación al email. Esta confirmación es un link con un JWT que confirmará tu usuario y ya podrás loguear.
    - El JWT del registro utiliza otro secretKey, ya que al no expirar "podría usarse" fuerza bruta. Aunque es simplemente para más seguridad.
    - Si intentas registrarte con una cuenta que tiene un email sin confirmar, re-enviará el email y notificará al usuario.
    - Asignación de permiso administrativo, éste es reactivo. Esto quiere decir que si nos asignar administrador estando en la página, se cambiará nuestro JWT y actualizará el menú por el uso de websockets.
    - Modificación de datos (nombre, apellido, contraseña)
    - Email de notificación al cambiar contraseña.
    - Añadir productos a favoritos.
- Registro y modificación de productos/categorías.
    - Los administradores podrán crear, modificar y eliminar productos (título, descripción, imágenes, categoría, características, políticas de uso)
    - También podrán crear, modificar y eliminar categorías (título, descripción, imagen)
    - Todas las modificaciones/creaciones/eliminaciones (productos y categorías) son reactivos a los usuarios, gracias a los websockets.
    - Compartir productos por redes sociales, también se adjunta imagen, título y descripción en Twitter/Facebook por medio de las cards.
- Página reactiva a diferentes resoluciones/mobile.
- Búsqueda principal por fecha y lugar.
    - Autocomplet con las ciudades y países disponibles.
    - Calendario para seleccionar fechas.
- Reserva de productos
    - Calendario doble donde se puede seleccionar las fechas para reservar.
    - Luego de la reserva, se puede realizar una review.
    - La página principal del producto tiene también las opiniones de los usuarios y sus comentarios.
    - Valoración general en base a todas las reseñas, además es reactiva a las reseñas que se vayan creando en tiempo real.
    - Se puede añadir un producto a tu wishlist y acceder a ella desde el menú de usuario.
    - Botón de Whatsapp para comunicarse directamente con el dueño del producto.
    - Email de información luego de realizar la reserva satisfactoriamente.
    - Historial de reservas donde se ordenan por fecha de ingreso (Check-in)

# 📷 Media

Un poco de imágenes del proyecto.

<img src="https://github.com/user-attachments/assets/59972abc-880d-4985-88b2-bf53e3cdd6a7" width="1200">

<img src="https://github.com/user-attachments/assets/97ed6ea1-90ab-48ae-a08e-17e05a9699f5" width="400" />

![Captura de pantalla 2024-08-01 211242](https://github.com/user-attachments/assets/d85fc37b-610a-4cd3-824e-023cc22e3724)

<img src="https://github.com/user-attachments/assets/822c586b-53da-4869-8b9d-726e5ddfc012" width="400" />

<img src="https://github.com/user-attachments/assets/f3956a0f-86cd-4f21-892d-4a30f1fa5607" width="600" />

<img src="https://github.com/user-attachments/assets/f620319e-6ad1-42fc-8d49-746d8f092c9d" width="400" />

<img src="https://github.com/user-attachments/assets/a90bd237-9ff7-467d-871f-761f1f531342" width="400" />

# 🗒️Requerimientos

- NodeJS (v16 or higher) - <a href="https://nodejs.org/en/download">Download</a>
- MongoDB (I recommend to install Mongo Compass also) - <a href="https://www.mongodb.com/docs/manual/installation/">Download</a>
- Java 17 - <a href="https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html">Download</a>

# ⚠️ Environment-Variables

Para que el proyecto funcione, deberás setear todas las variables de entorno en el archivo `.env` que debe estar en el mismo directorio que encontrarás el `.env.example`

`.env`
```.env
MONGO_DATABASE=""
MONGO_USER=""
MONGO_PASSWORD=""
MONGO_CLUSTER=""
JWT_SECRET_KEY=""
JWT_SECONDARY_SECRET_KEY=""
MAIL_USERNAME=""
MAIL_PASSWORD=""
MAIL_HOST=""
MAIL_PORT=
URL=""
```

### MONGO_DATABASE, MONGO_USER, MONGO_PASSWORD, MONGO_CLUSTER

Acá deberás ingresar todos los datos de autenticación de la base de datos de Mongo que estés utilizando.

### JWT_SECRET_KEY

Este es el `secretKey` principal con el que se firman los JWT de los usuarios autentificados. Asegurate que sea largo y complicado, puedes usar un generador de contraseñas. Nadie debe tener acceso a él.

### JWT_SECONDARY_SECRET_KEY

Este es el `secretKey` secundario, usado para la firma de los JWT que son enviados para confirmar los emails de los usuarios registrados. Igual que el anterior, recomiendo usar un generador de contraseñas.

### MAIL_USERNAME, MAIL_PASSWORD, MAIL_HOST, MAIL_PORT

Estos son los datos con los que se autentificará por SMPT al proveedor de emails que estés usando. Aquí se enviarán los emails de registro y cambio de contraseñas.

### URL

Esta es la URL que se usará para generar links, como por ejemplo la de confirmación de email, cards de productos, etc. Idealmente la de producción.

<hr>

# 🧾 License

Released under the [MIT](https://github.com/Crltoz/bookify/blob/main/LICENSE) license.
