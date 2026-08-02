# Portfolio IA

Portfolio académico histórico de proyectos de Inteligencia Artificial desarrollados por estudiantes a lo largo de distintas cohortes (2026, 2027, 2028...).

Sitio 100% estático: sin backend, sin base de datos, sin autenticación. Todo el contenido académico vive en archivos JSON versionados en este repositorio y se despliega gratuitamente en GitHub Pages.

## Objetivo

Mostrar, año a año, quiénes cursaron la materia, qué proyectos de IA construyeron, con qué tecnologías, y dónde consultar el código y las demos. El sitio está pensado para crecer indefinidamente: agregar una nueva cohorte es una tarea de **carga de datos**, no de programación — no hace falta tocar componentes, páginas ni rutas.

## Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (modo `strict`)
- [Vite 8](https://vite.dev/) como build tool
- [React Router](https://reactrouter.com/) para el ruteo
- CSS Modules + variables CSS nativas (sin frameworks de UI ni CSS-in-JS)
- [oxlint](https://oxc.rs/) para linting
- GitHub Actions + GitHub Pages para el deploy

Sin dependencias de UI adicionales: la interfaz completa (cards, badges, filtros, tema claro/oscuro, nav responsive) está implementada con CSS plano para mantener el proyecto simple y liviano.

## Estructura

```text
src/
├── components/     # Piezas de UI reutilizables (Header, ProjectCard, StudentCard, ...)
├── pages/          # Una carpeta por ruta (Home, Projects, StudentProfile, Year, ...)
├── data/           # Datos académicos (un JSON por año) + capa de agregación (index.ts)
├── types/          # Modelo de datos tipado (Student, Project, AcademicYearData...)
├── utils/          # Búsqueda, filtros, formateo de texto, colores de categoría
├── config/         # Configuración del sitio (nombre, link al repo) — no es dato académico
└── styles/         # Tokens de diseño (tema claro/oscuro) y estilos globales

public/             # Favicon, 404.html (fallback de rutas para GitHub Pages)
.github/workflows/  # Deploy automático a GitHub Pages
```

La separación es estricta: los componentes y páginas **solo renderizan** lo que reciben desde `src/data`. Ningún nombre de alumno, proyecto o tecnología está escrito dentro de un componente.

## Desarrollo local

Requiere Node.js 20+.

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Build

```bash
npm run build
```

Genera el sitio estático en `dist/`. También corre la verificación de tipos de TypeScript (`tsc -b`) antes de compilar.

```bash
npm run preview   # sirve dist/ localmente, tal como quedaría en producción
npm run lint      # oxlint
```

## Deploy

El deploy es automático vía GitHub Actions (`.github/workflows/deploy.yml`): cada push a `main` instala dependencias, corre `npm run build` y publica `dist/` en GitHub Pages.

Para activarlo la primera vez:

1. En el repositorio de GitHub: **Settings → Pages → Source → GitHub Actions**.
2. Hacer push a `main`. El workflow se encarga del resto.
3. El sitio queda disponible en `https://halexisgonzalez.github.io/portfolio-ia/`.

Si el repositorio se llama distinto a `portfolio-ia`, actualizar el `base` en [`vite.config.ts`](vite.config.ts) para que coincida.

> El proyecto no usa un dominio personalizado por defecto. Si más adelante configurás uno, el `base` de Vite puede volver a `/`.

## Agregar una nueva cohorte

Crear `src/data/2027.json` (mismo formato que [`src/data/2026.json`](src/data/2026.json)):

```json
{
  "year": 2027,
  "students": [],
  "projects": []
}
```

No hace falta crear páginas, rutas ni componentes nuevos: `src/data/index.ts` detecta automáticamente cualquier archivo `src/data/<año>.json` (vía `import.meta.glob`) y el resto del sitio (estadísticas, home, `/years`, filtros) se actualiza solo.

### Vincular el material académico de la cohorte

Si existe un repositorio de contenido versionado por tags (`v2026`, `v2027`, ...), se puede enlazar agregando `materialUrl` al archivo del año:

```json
{
  "year": 2027,
  "materialUrl": "https://github.com/tu-org/contenido-ia/releases/tag/v2027",
  "students": [],
  "projects": []
}
```

Cuando está presente, aparece un botón "Ver material" en la home y en la página de la cohorte.

## Agregar un estudiante

Dentro del `students` del año correspondiente:

```json
{
  "id": "ana-garcia",
  "name": "Ana García",
  "github": "https://github.com/ana-garcia",
  "linkedin": "https://www.linkedin.com/in/ana-garcia",
  "website": "https://anagarcia.dev",
  "bio": "Breve descripción del estudiante.",
  "projectIds": ["clasificador-de-plantas"]
}
```

Todos los campos salvo `id`, `name` y `projectIds` son opcionales. El `id` debe ser único en todo el sitio (se usa como slug en `/students/:id`) y en minúsculas, sin espacios ni acentos.

## Agregar un proyecto

Dentro del `projects` del año correspondiente:

```json
{
  "id": "clasificador-de-plantas",
  "name": "Clasificador de especies de plantas",
  "description": "Modelo de visión por computadora que identifica especies a partir de fotos de hojas.",
  "studentIds": ["ana-garcia"],
  "categories": ["Computer Vision"],
  "technologies": ["Python", "PyTorch", "OpenCV"],
  "repository": "https://github.com/ana-garcia/clasificador-de-plantas",
  "demo": "https://ana-garcia.github.io/clasificador-de-plantas/",
  "image": null,
  "featured": false
}
```

- No hace falta indicar `year` en el proyecto: se toma automáticamente del año del archivo (`2027.json` → todos sus proyectos son de 2027).
- `studentIds` puede tener más de un id (proyectos grupales).
- `categories` es una lista con una o más de: `Machine Learning`, `Deep Learning`, `Computer Vision`, `Natural Language Processing`, `Data Science`, `Robótica`, `Generative AI`, `Other`.
- `repository`, `demo` e `image` son opcionales: si no existen (o son `null`), la interfaz simplemente no muestra ese botón/imagen — no hace falta dejarlos vacíos.
- `featured: true` hace que el proyecto aparezca en la sección "Proyectos destacados" de la home.

## Datos de ejemplo

`src/data/2026.json` incluye estudiantes y proyectos ficticios, claramente identificados como "Demo" / "de Ejemplo". Reemplazalos por los datos reales de la cohorte, o directamente vaciá los arrays `students` y `projects` cuando tengas contenido real para cargar.
