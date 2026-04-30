1- PUBLIC  
Public foi separado em 4 partes:
a) Pack de Roupas Mask.
Nesse pack de roupas foi deixado as principais fotos que deixamos como global para ser usado em mais de um lugar.
b) Pack de Roupas MASK pt2.
Nesse pack deixamos mais arquivos de imagem que usamos conforme fizemos o site, deixando como global para seu uso em mais de uma página.
c) index.html
Deixamos os elementos html básicos que usamos nas páginas, evitando repetição.
~~~html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>MASK®</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
~~~
d) Manifest.json
~~~json
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
~~~
