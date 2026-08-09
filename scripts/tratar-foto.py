"""
Prepara a foto do casal para o convite.

A foto tem fundo claro que desvanece nas bordas. O cartao do convite usa
--marfim (#FFFCFA). Se o fundo da foto nao for exatamente essa cor, aparece um
retangulo fantasma. Este script desloca so os pixels de fundo ate a cor do
cartao, preservando o casal.
"""
from PIL import Image
import numpy as np

ORIGEM = "/mnt/user-data/uploads/foto.png"
DESTINO = "/home/claude/convite/public/foto.jpg"
PAPEL = np.array([250, 238, 233], np.float32)  # --marfim (cartao rose)
LARGURA_FINAL = 900

im = Image.open(ORIGEM).convert("RGB")
alt = round(im.height * LARGURA_FINAL / im.width)
im = im.resize((LARGURA_FINAL, alt), Image.LANCZOS)
x = np.asarray(im).astype(np.float32)

# Cor de fundo medida nos quatro cantos
cantos = np.concatenate([
    x[:30, :30].reshape(-1, 3), x[:30, -30:].reshape(-1, 3),
    x[-30:, :30].reshape(-1, 3), x[-30:, -30:].reshape(-1, 3),
])
fundo = np.median(cantos, axis=0)
print("fundo medido:", fundo.round(1), "-> alvo:", PAPEL)

# Peso: 1 onde e fundo puro, 0 onde e o casal. Baseado na distancia de cor.
dist = np.linalg.norm(x - fundo, axis=2)
peso = np.clip(1.0 - dist / 26.0, 0.0, 1.0)[..., None]

x = x + (PAPEL - fundo) * peso
Image.fromarray(np.clip(x, 0, 255).astype(np.uint8)).save(
    DESTINO, quality=94, subsampling=0, optimize=True, progressive=True
)

conf = np.asarray(Image.open(DESTINO)).astype(int)
print("canto apos ajuste:", conf[:20, :20].reshape(-1, 3).mean(0).round(1))
