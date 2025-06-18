# Technical Test: Todo App

Tras instalar todas las dependencias y arrancar el proyecto siguiendo las instrucciones de Instructions.md

### Tasks

1. **Implement task completion status functionality**
   Tarea 1:
   . Al intentar marcar los checkbox de la lista de tareas se observa que hace una consulta al backend a una ruta que no existe.
   `127.0.0.1:55636 - "PATCH /todos/undefined HTTP/1.1" 404 Not Found`
   . Con lo cual fue necesario implementar la ruta y la función necesaria en el backend para que al seleccionar los checkboxs de la lista de tareas pueda hacer la petición correctamente al backend y este actualice correctamente el estado de la tarea correspondiente.
   . He actualizado el fichero `schemas.py` actualizando el modelo Todo, donde he añadido el campo id, para identificar la tarea que deseo actualizar su estado de completado. Podría haber creado un modelo nuevo para actualizar una tarea, un modelo llamado por ejemplo "TodoUpdate" donde sí utilice el id, y dejar intacto el modelo que se proporciona "Todo" sin id, pero he decidido usar el mismo modelo para todo.
   . He necesitado actualizar el fichero `todos.json` para añadir el campo id en cada tarea.
