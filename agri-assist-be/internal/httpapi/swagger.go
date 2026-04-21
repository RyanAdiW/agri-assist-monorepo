package httpapi

import (
	"embed"
	"html/template"
	"io/fs"
	"net/http"

	"github.com/labstack/echo/v4"
)

//go:embed docs/*
var swaggerAssets embed.FS

var swaggerIndexTemplate = template.Must(template.New("swagger-index").Parse(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Agri-Assist API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css">
    <style>
      body {
        margin: 0;
        background: #f6f7f9;
      }
      .topbar {
        display: none;
      }
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.onload = function () {
        window.ui = SwaggerUIBundle({
          url: "{{.SpecURL}}",
          dom_id: "#swagger-ui",
          deepLinking: true,
          displayRequestDuration: true,
          presets: [
            SwaggerUIBundle.presets.apis
          ],
          layout: "BaseLayout"
        });
      };
    </script>
  </body>
</html>`))

func (h *Handler) SwaggerRedirect(c echo.Context) error {
	return c.Redirect(http.StatusTemporaryRedirect, "/swagger/index.html")
}

func (h *Handler) SwaggerUI(c echo.Context) error {
	c.Response().Header().Set(echo.HeaderContentType, "text/html; charset=utf-8")
	return swaggerIndexTemplate.Execute(c.Response(), map[string]string{
		"SpecURL": "/swagger/openapi.yaml",
	})
}

func (h *Handler) SwaggerSpec(c echo.Context) error {
	specFile, err := fs.ReadFile(swaggerAssets, "docs/openapi.yaml")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, errorResponse{Error: "swagger spec unavailable"})
	}

	return c.Blob(http.StatusOK, "application/yaml; charset=utf-8", specFile)
}
