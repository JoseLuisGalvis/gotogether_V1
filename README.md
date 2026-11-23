# GoTogether · Propuesta de dos flujos agénticos

**TP3 · Dos sentencias, dos soluciones**
Desarrollo de Sistemas Web · Front End · 2026 · 2.º cuatrimestre · IFTS 29

---

## 1. Grupo e integrante

| Dato | Detalle |
|---|---|
| Grupo | 35 · IFTS 29 |
| Integrante | José Luis Galvis Escobar · Sección 2 B |
| Modalidad | Grupo de una sola persona |
| Fecha de entrega | 26/11/2026 |

### Aporte concreto

Al ser un grupo de una sola persona, el integrante asumió todos los roles que pide la consigna:

| Rol | Qué hice |
|---|---|
| Coordinación de instrucciones al agente | Redacté los prompts de cada etapa y dirigí el trabajo sin editar código manualmente. |
| Revisión de sentencias y flujos | Desarmé R5 y R6 en fichas (sentencia → datos necesarios → condición → consecuencia) y verifiqué que cada diagrama las respetara. |
| Pruebas | Abrí la landing en desktop, probé los desplegables con clic y teclado, y recorrí un caso que cumple la condición y otro que no en cada flujo. |
| Publicación | Subí el proyecto a un repositorio y publiqué la landing en GitHub Pages y Vercel. |

---

## 2. Startup y bloque asignados

- **Startup:** GoTogether
- **Rubro:** Movilidad y comunidades
- **Objetivo:** propuesta para coordinar grupos de viaje en transporte público entre fans del K-pop.
- **Bloque:** Confirmación y disponibilidad
- **Código de sorteo:** S09-C
- **Origen:** la startup fue creada por estudiantes del IFTS 16. El Grupo 35 del IFTS 29 propone las soluciones.
- **Logo:** se usa el logo original asignado, completo y sin modificaciones (`assets/logo-gotogether.png`).

### Sentencias asignadas (redacción original)

**R5**
> Si el usuario confirma un grupo compatible, sus datos, identidad y edad están verificados, es mayor de edad o menor con autorización de su tutor y queda cupo al confirmar, el sistema reserva ese cupo y registra su incorporación. Todas las condiciones son necesarias para aplicar esta regla.

**R6**
> Si el grupo elegido pierde su cupo antes de completar la incorporación, el sistema informa el cambio y solicita elegir otra opción, sin asignar un grupo diferente automáticamente.

### Fichas de análisis

| | R5 | R6 |
|---|---|---|
| **Datos necesarios** | Grupo confirmado y su compatibilidad; verificación de datos, identidad y edad; edad; autorización del tutor si es menor; cupo al confirmar | Grupo elegido; estado de la incorporación; estado del cupo |
| **Condición** | Confirma grupo compatible **Y** datos, identidad y edad verificados **Y** (mayor de edad **O** menor con autorización del tutor) **Y** queda cupo. Todas son necesarias; el "o" aplica solo a la edad. | El grupo elegido pierde su cupo **Y** la incorporación todavía no se completó. |
| **Consecuencia** | Reserva el cupo y registra la incorporación. | Informa el cambio y solicita elegir otra opción, sin asignar un grupo diferente automáticamente. |

---

## 3. Las dos propuestas

### Propuesta 1 · Confirmación segura de grupo (R5)

Un futuro agente recibe la confirmación del usuario, consulta las verificaciones, la edad, la autorización del tutor y el cupo, y reserva e incorpora **solo si se cumplen todas las condiciones**. Beneficio: evita incorporaciones sin verificar o sin autorización del tutor, y evita cupos duplicados.

### Propuesta 2 · Aviso de cupo perdido: elegís vos (R6)

Un futuro agente vigila el cupo mientras la incorporación está en curso. Si el grupo elegido lo pierde, informa el cambio, muestra alternativas y espera la decisión del usuario. **Nunca asigna otro grupo automáticamente.** Beneficio: transparencia y control para el usuario.

### Decisiones del grupo (no definidas por las sentencias)

Estas alternativas son decisiones de diseño de la propuesta y están marcadas en la landing como "Decisión del grupo":

- **R5:** si falta una verificación o la autorización del tutor, no se reserva el cupo, se pide lo que falta y, ante inconsistencias, se deriva a revisión humana.
- **R6:** si no hay grupos alternativos, se informa, se ofrece ajustar la búsqueda y se permite pedir revisión humana.

### Casos límite

- **R5:** el cupo se agota justo al confirmar. Se vuelve a consultar el cupo en ese instante. Si ya no hay, no se reserva y se pasa al flujo de R6.
- **R6:** no hay grupos alternativos compatibles. No se asigna nada, se informa y se ofrece ajustar filtros o contactar a una persona.

### Casos de prueba recorridos

| Flujo | Caso | Resultado esperado |
|---|---|---|
| R5 | Mayor de edad, todo verificado, hay cupo | Reserva e incorpora |
| R5 | Menor con autorización, todo verificado, hay cupo | Reserva e incorpora |
| R5 | Menor sin autorización | No reserva (se solicita autorización) |
| R5 | Identidad sin verificar | No reserva |
| R5 | Todo correcto pero sin cupo | No reserva y pasa a R6 |
| R6 | El grupo pierde el cupo antes de completar | Informa y pide elegir, sin asignar |
| R6 | El grupo conserva el cupo | No se activa, la incorporación continúa |

---

## 4. Qué incluye la landing

- Presentación de la startup con su logo original completo, el equipo y el bloque asignado.
- Las dos sentencias con su redacción original y una propuesta para cada una.
- Dos diagramas SVG, uno por sentencia, con inicio, datos de entrada, decisiones, acciones y resultado, y los supuestos del grupo en borde punteado.
- Desplegables con los detalles de cada solución (datos, decisión, acción del agente, resultado, excepciones, intervención humana y supuestos), operables con clic y teclado.
- Navegación fija con scroll suave y resaltado de la sección activa.
- Simulador visual de casos que resalta el camino en cada diagrama (solo visual, sin lógica real ni backend).
- Modo claro y modo oscuro.

La landing **no integra IA**, no ejecuta agentes, no conecta APIs y no tiene backend. Los flujos son una propuesta explicada y dibujada.

---

## 5. Herramientas de IA utilizadas

La consigna pide distinguir la **aplicación** (el entorno de trabajo) del **modelo** (el que figura seleccionado dentro de ella).

| Aplicación | Versión de la aplicación | Modelo (tal como aparece) | Uso |
|---|---|---|---|
| Google Antigravity | 2.34.0 | [COMPLETAR: nombre del selector del agente, o "modelo no informado"] | Generación y modificación de todos los archivos del proyecto |

### Para qué se usó

El agente generó y modificó `index.html`, `styles.css`, `script.js` y este `README.md`. **No se editó código manualmente en ningún momento**: toda corrección se pidió al agente mediante instrucciones.

### Trabajo por etapas

| Etapa | Qué se pidió al agente |
|---|---|
| 0 · Contexto | Entender el TP, la startup, el bloque y conservar las sentencias sin modificar. |
| 1 · Estructura | Esqueleto semántico: encabezado, presentación, propuestas, diagramas, desplegables y pie. |
| 2 · Contenido | Textos de presentación, títulos y beneficios, y contenido de los desplegables con supuestos, casos límite e intervención humana. |
| 3 · Diagramas | Dos diagramas SVG con flechas, rótulos SÍ/NO y leyenda. |
| 4 · Interacción | Desplegables accesibles, botón para abrir y cerrar todos, navegación fija y simulador de casos. |
| 5 · Diseño | Estilo basado en la paleta del logo, jerarquía visual, contraste y lectura en desktop. |
| 6 · Auditoría | Revisión de fidelidad de sentencias, lógica de los diagramas, desbordes y teclado. |
| 7 · README | Esta documentación. |

---

## 6. Evidencia de iteración

Cada iteración registra la instrucción, el problema detectado al revisar, la mejora pedida y qué cambió.

### Iteraciones 1 a 3 · Primeras etapas

| | Detalle |
|---|---|
| **Instrucción inicial** | [COMPLETAR, ej.: "ETAPA 3: construí dos diagramas SVG para R5 y R6…"] |
| **Problema detectado** | [COMPLETAR] |
| **Mejora pedida** | [COMPLETAR] |
| **Qué cambió y por qué** | [COMPLETAR] |

(Duplicar la tabla si hubo más de una iteración en esta fase.)

### Iteración 4 · Ancla de navegación "Detalles"

| | Detalle |
|---|---|
| **Instrucción inicial** | Navegación fija con enlaces por anclas a Presentación, Propuestas, Diagramas y Detalles. |
| **Problema detectado** | Al hacer clic en "Detalles" la pantalla no quedaba donde comienzan los desplegables con las especificaciones. |
| **Mejora pedida** | Reposicionar el ancla `#detalles` justo antes de los desplegables (o en el primer bloque, `#detalles-r5`) y compensar el navbar fijo con `scroll-margin-top`. |
| **Qué cambió y por qué** | El clic en "Detalles" lleva exactamente al inicio de las especificaciones y el título no queda tapado por el navbar. |

### Iteración 5 · Contraste de los diagramas en modo oscuro

| | Detalle |
|---|---|
| **Instrucción inicial** | Diseño con paleta del logo y soporte de modo claro y oscuro. |
| **Problema detectado** | En modo oscuro, los conectores y flechas SVG usaban un violeta oscuro con poco contraste sobre el fondo. |
| **Mejora pedida** | Pasar los colores fijos a clases o variables CSS y aplicar lila brillante `#c084fc` a conectores, líneas y puntas de flecha solo en modo oscuro, sin tocar el modo claro. |
| **Qué cambió y por qué** | Los diagramas se leen con claridad en ambos temas, incluidas las ramas SÍ/NO y la rama punteada de decisión del grupo. |

### Iteración 6 · Simulador R5, Caso 1

| | Detalle |
|---|---|
| **Instrucción inicial** | Simulador visual de casos que resalta el camino en cada diagrama. |
| **Problema detectado** | El Caso 1 no dejaba claro si cubría solo a mayores de edad o también a menores con autorización. |
| **Mejora pedida** | Especificar en el botón y en el feedback que cubre "Mayor de edad" y "Menor con autorización del tutor", ambos con todo verificado y con cupo. |
| **Qué cambió y por qué** | Se elimina la duda sobre cómo se interpreta el "o" de R5: ambas situaciones cumplen la alternativa por edad y producen el mismo resultado (reserva y registra la incorporación). El diagrama y la sentencia no se modificaron. |

### Revisión propia

Al trabajar solo, la revisión consistió en contrastar cada diagrama y cada caso del simulador con la ficha de su sentencia. De esa revisión surgieron las iteraciones 4, 5 y 6, que mejoraron la navegación, la legibilidad en modo oscuro y la claridad de la interpretación del "o" de R5. [COMPLETAR: agregar aquí la auditoría de la Etapa 6 si encontró otros problemas.]

---

## 7. Cómo ejecutar el proyecto

No requiere instalación ni servidor.

1. Descargá o cloná el repositorio.
2. Abrí la carpeta del proyecto.
3. Hacé doble clic en `index.html`. Se abre en el navegador.

### Estructura

```
gotogether/
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    ├── logo-gotogether.png
    └── S09.webp
```

La revisión está pensada para **desktop**.

---

## 8. Enlaces

| Recurso | Enlace |
|---|---|
| Repositorio | [COMPLETAR: https://github.com/…] |
| Landing en GitHub Pages | [COMPLETAR: https://…github.io/…] |
| Landing en Vercel | [COMPLETAR: https://….vercel.app] |

---

## 9. Verificación de enlaces y funcionamiento

Comprobado desde una ventana de incógnito, sin sesión iniciada:

- [ ] El repositorio abre correctamente.
- [ ] La landing de GitHub Pages abre correctamente.
- [ ] La landing de Vercel abre correctamente.
- [ ] Ambos sitios muestran la versión final.
- [ ] El logo original de GoTogether se ve completo.
- [ ] Las sentencias R5 y R6 coinciden con el original.
- [ ] Los dos diagramas son legibles en modo claro y oscuro.
- [ ] Los desplegables abren y cierran con clic y teclado.
- [ ] El enlace "Detalles" del navbar lleva al inicio de los desplegables.
- [ ] No hay scroll horizontal en desktop.
- [ ] El enlace del README apunta a la versión final.

**Fecha de verificación:** 23/11/2026
