---
name: Better Icons demo
description: This prompt is used to demonstrate the capabilities of GitHub MCP for automating tasks and interacting with GitHub repositories.
---

## Objetivo
Mejorar la interfaz de la aplicación añadiendo un header y reemplazando los iconos con emojis de Microsoft Fluent Emoji.

## Instrucciones (en orden):

1. **Ejecuta la aplicación**: Usa `fastapi dev` para iniciar la aplicación
2. **Abre en Simple Browser**: Una vez iniciada, abre la aplicación en el Simple Browser de VS Code para ver el estado actual
3. **Analiza la interfaz**: Examina los elementos de la UI, iconos actuales y secciones existentes
4. **Busca iconos en Fluent Emoji**: Usa la colección "Microsoft Emoji Fluent" de better-icons para encontrar emojis que reemplacen los iconos actuales
5. **Reemplaza los iconos**: 
   - Implementa los nuevos iconos en las secciones existentes
   - Añade un header con iconos apropiados
   - Usa better-icons (`mcp_better-icons-_sync_icon`) para integrar los emojis
6. **Verifica los cambios**: Actualiza el Simple Browser después de cada cambio para visualizar la mejora

## Prioridades
- Mantener la funcionalidad actual
- Asegurar una buena accesibilidad con los nuevos iconos
- Usar emojis del tipo "outline" o "fluent" para consistencia visual