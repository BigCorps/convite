"""
Recorta e trata a foto do casal para a paleta rose do convite.
Rodar de novo se voces trocarem a foto: basta apontar ORIGEM e ajustar RECORTE.
"""
from PIL import Image, ImageFilter
import numpy as np

ORIGEM = "/mnt/user-data/uploads/1786234565187_WhatsApp_Image_2026-08-08_at_21_14_43.jpeg"
DESTINO = "/home/claude/convite/public/foto.jpg"
RECORTE = (235, 455, 928, 1296)   # esquerda, topo, direita, base
LARGURA_FINAL = 880

im = Image.open(ORIGEM).convert("RGB").crop(RECORTE)
alt = round(im.height * LARGURA_FINAL / im.width)
im = im.resize((LARGURA_FINAL, alt), Image.LANCZOS)

# Suaviza o ruido do flash sem perder o desenho dos rostos
suave = im.filter(ImageFilter.GaussianBlur(1.1))
im = Image.blend(im, suave, 0.35)

x = np.asarray(im).astype(np.float32) / 255.0
luma = (0.2126 * x[..., 0] + 0.7152 * x[..., 1] + 0.0722 * x[..., 2])[..., None]

# 1. Dessatura: o verde e o azul do fundo perdem forca
x = luma + (x - luma) * 0.58

# 2. Balanco quente
x *= np.array([1.055, 1.000, 0.930], np.float32)

# 3. Sombras puxadas para o rose (efeito de filme, tira o preto duro)
rose = np.array([0.949, 0.871, 0.855], np.float32)
peso = 0.20 * np.power(1.0 - luma, 1.6)
x = x * (1 - peso) + rose * peso

# 4. Altas luzes puxadas para o creme
creme = np.array([1.000, 0.980, 0.962], np.float32)
peso = 0.12 * np.power(luma, 2.2)
x = x * (1 - peso) + creme * peso

# 5. Contraste suave em S
x = np.clip(x, 0, 1)
x = x + 0.10 * (x - 0.5) * (1 - np.abs(x - 0.5) * 2)

# 6. Vinheta discreta
h, w = x.shape[:2]
yy, xx = np.mgrid[0:h, 0:w]
r = np.sqrt(((xx - w / 2) / (w / 2)) ** 2 + ((yy - h / 2) / (h / 2)) ** 2)
x *= (1 - 0.16 * np.clip(r - 0.55, 0, None) ** 1.5)[..., None]

Image.fromarray((np.clip(x, 0, 1) * 255).astype(np.uint8)).save(
    DESTINO, quality=88, optimize=True, progressive=True
)
print("gravado:", DESTINO, Image.open(DESTINO).size)
