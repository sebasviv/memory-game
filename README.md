# Memory Game

Aplicacion web hecha con React, TypeScript y Vite. El juego propone memorizar cartas de personajes de Rick and Morty, encontrar parejas y avanzar de ronda sumando puntos.

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Arrancar el proyecto en local

1. Instala las dependencias:

```bash
npm install
```

2. Crea un archivo `.env` en la raiz del proyecto con estas variables:

```env
VITE_CHARACTERS_API_URL=https://rickandmortyapi.com/api
VITE_LIMIT_PAGE_CHARACTERS=5
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

4. Abre en el navegador la URL que muestra Vite, normalmente:

```text
http://localhost:5173
```

## Scripts disponibles

- `npm run dev`: levanta la app en modo desarrollo.
- `npm run build`: genera la build de produccion.
- `npm run preview`: sirve la build generada localmente.
- `npm run lint`: ejecuta ESLint.

## Como entrar al juego

La app protege las rutas `/home` y `/game`, asi que primero debes autenticarte.

1. Entra en la pantalla de login.
2. Puedes iniciar sesion o registrarte.
3. La autenticacion es local: la app guarda un token falso y los datos del usuario en `localStorage`.
4. Despues del acceso, se redirige a la pantalla principal del juego.

## Como jugar

1. En la pantalla principal ajusta la configuracion de la partida:
	- `Cards totales`: cantidad total de cartas en la grilla. Va de 2 a 10 y siempre en numeros pares.
	- `Tiempo para memorizar`: tiempo configurable entre 1 y 10 segundos.
2. Pulsa `Jugar` para entrar a la partida.
3. Dentro del tablero, pulsa `Jugar!` para comenzar la ronda.
4. Cuando la partida empieza, las cartas se cargan y luego quedan listas para que intentes encontrar parejas.
5. Selecciona dos cartas:
	- Si coinciden, ganas `100` puntos y esa pareja se elimina del tablero.
	- Si no coinciden, se suma `1` intento fallido.
6. Cuando eliminas todas las cartas, aparece el boton `Siguiente ronda` para continuar.
7. Puedes pulsar `Terminar juego!` en cualquier momento para abrir el modal de resultados.
8. Desde el modal puedes volver a empezar con `Play again`.

## Reglas y comportamiento actual

- Cada ronda genera personajes aleatorios desde la API de Rick and Morty.
- El tablero siempre se arma con parejas duplicadas y mezcladas.
- La puntuacion aumenta solo al acertar parejas.
- Los intentos cuentan solo cuando eliges una pareja incorrecta.
- Si recargas la pagina y sigues teniendo sesion en `localStorage`, la app mantiene el acceso.

## Dependencias externas

El juego consume datos desde la API publica de Rick and Morty, por lo que necesitas conexion a internet para cargar los personajes.
