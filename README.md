<h1 align="center"> Sistema para Club Campestre </h1>

Este repositorio contiene el frontend para el sistema para Club Campestre, donde se podrá gestionar los servicios que brinda como el de Piscina, Bungalows y Hospedaje. El frontend esta desarrollado con Angular 18.

Para ejecutar el proyecto de manera local, utilizamos el comando `ng serve`. Para poder visualizar la interfaz del proyecto, lo hacemos a través de la URL:
```bash
   http://localhost:4200
   ```

## 📸 Capturas
1️⃣ Configuración
- Método de Pago
  <img width="2559" height="1273" alt="1" src="https://github.com/user-attachments/assets/b8b215a4-e88b-4047-a258-2d8c3507e6ff" />
  Buscando por el nombre del método de pago:
  <img width="2553" height="1268" alt="2" src="https://github.com/user-attachments/assets/5d4f8708-070b-40bb-b5c8-0365bca0613c" />
  Agregando un método de pago:
  <img width="2558" height="1271" alt="3" src="https://github.com/user-attachments/assets/48406217-16fc-40b9-b16f-01651df2d07e" />
  Editando un método de pago:
  <img width="2558" height="1272" alt="4" src="https://github.com/user-attachments/assets/f46c24a7-3682-4880-8495-523edfbb579c" />
  Eliminando un método de pago:
  <img width="2559" height="1274" alt="5" src="https://github.com/user-attachments/assets/15205d93-879a-4bd8-9e6c-72fd54e596f9" />

2️⃣ Clientes
<img width="2559" height="1271" alt="6" src="https://github.com/user-attachments/assets/d9ff0fff-0f61-4959-89e1-f2fbf7d7bf51" />
Editando un cliente (teléfono):
<img width="2557" height="1270" alt="7" src="https://github.com/user-attachments/assets/1d748b79-da3b-42e8-b982-8f00a4efde83" />
Buscando por DNI:
<img width="2558" height="1271" alt="8" src="https://github.com/user-attachments/assets/c3d3813f-9b0f-40c9-9c88-4b295758ea29" />
Reporte de la lista de clientes en Excel:
<img width="810" height="324" alt="12" src="https://github.com/user-attachments/assets/44b3f872-a818-41c3-931b-3945feb395b1" />

3️⃣ Habitaciones
- Bungalows
  <img width="2559" height="1271" alt="9" src="https://github.com/user-attachments/assets/eed4ccd3-5aa8-415e-b75a-d1e100f6a0a6" />
  Filtrando solo los disponbles:
  <img width="2559" height="1273" alt="10" src="https://github.com/user-attachments/assets/8288e0d3-f5dd-48b2-a56f-183e6a038274" />
  Filtrando los no disponibles:
  <img width="2555" height="1271" alt="11" src="https://github.com/user-attachments/assets/b27aee01-9a81-4657-b561-43c3e5cef427" />
  Buscando por código:
  <img width="2559" height="1273" alt="12" src="https://github.com/user-attachments/assets/23274398-1f72-4fe5-a073-3a70355d1fb5" />
  Agregando un nuevo bungalow:
  <img width="2559" height="1266" alt="13" src="https://github.com/user-attachments/assets/dd541a38-d36b-402d-b506-6a6a1d81cee2" />
  Editando un bungalow:
  <img width="2559" height="1267" alt="14" src="https://github.com/user-attachments/assets/3cf3895b-95be-4e86-8abb-4b0fa9025ac2" />

- Hospedajes
  <img width="2557" height="1271" alt="15" src="https://github.com/user-attachments/assets/0a9807ef-bce9-48cf-aaed-186220574f2c" />
  Filtrando solo los disponbles:
  <img width="2558" height="1271" alt="16" src="https://github.com/user-attachments/assets/6b24141d-ff5a-4cf9-ae23-aeab5e407d46" />
  Filtrando los no disponibles:
  <img width="2554" height="1268" alt="17" src="https://github.com/user-attachments/assets/958fa534-d930-4bdc-bbf3-09b8d71954b0" />
  Buscando por código:
  <img width="2559" height="1272" alt="18" src="https://github.com/user-attachments/assets/6d49f35a-8106-4b25-bb61-6b9e9beaa79f" />
  Agregando una nueva habitación:
  <img width="2558" height="1269" alt="19" src="https://github.com/user-attachments/assets/444d1158-151f-4c95-976f-b6f31dd67140" />
  Editando una habitación:
  <img width="2559" height="1269" alt="20" src="https://github.com/user-attachments/assets/433efed0-9f86-49d1-8977-11acd4ce8cdb" />

4️⃣ Reserva
- Servicio Bungalow
- Servicio Hospedaje
- Servicio Piscina

## ⚙️ Principales Funcionalidades
- Gestión del servicio de piscina
- Gestión del servicio de bungalows
- Gestión del servicio de hospedajes
- Filtros los servicios de bungalows y hospedajes(Por fecha Registro, entre fechas, por método de pago, DNI del cliente)
- Reporte en PDF y Excel para cada filtro generado
- Configurar el método de pago
- Búsqueda automática de clientes por DNI
- Registro automático de los clientes
- Reporte en excel de la lista de los clientes
- Tiene implementado un botón para interactuar con el cliente por WhatsApp
- Paginación incluida

## 🛠️ Tecnologias Utilizadas
- Angular 18 – Framework principal para construir la aplicación.
- Apollo Angular (GraphQL) – Para consultar datos de forma eficiente desde el frontend mediante GraphQL.
- SweetAlert 2 – Para mostrar alertas y mensajes personalizados.
- Font Awesome – Para iconografía moderna y personalizable.
- Google Fonts – Para personalización de tipografías y estilos

## 🌐 Backend para la aplicación
   ```bash
   https://github.com/LuisOrihuela08/sistema-club-backend.git
   ```

## 👨‍💻 Autor
Luis Orihuela Orozco | 
FullStack Developer - 2025
