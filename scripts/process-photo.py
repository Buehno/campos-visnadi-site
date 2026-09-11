"""
Remove o fundo da foto oficial do fundador e gera versões otimizadas.

Uso:  python scripts/process-photo.py "C:/caminho/foto-original.jpg"
Saída: public/brand/thiago-visnadi.png (recorte com alpha, até 900px de altura)
       public/brand/thiago-visnadi.webp

Requer: pip install "rembg[cpu]" pillow
"""
import sys
from pathlib import Path

from PIL import Image, ImageFilter
from rembg import new_session, remove

src = Path(sys.argv[1])
out_dir = Path(__file__).resolve().parents[1] / "public" / "brand"
out_dir.mkdir(parents=True, exist_ok=True)

img = Image.open(src).convert("RGB")
# Modelo específico para pessoas: preserva camisa branca sobre fundo claro.
cut = remove(img, session=new_session("u2net_human_seg"), alpha_matting=True,
             alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=12,
             alpha_matting_erode_size=8)

# Suaviza a borda do alpha e recorta ao conteúdo.
r, g, b, a = cut.split()
a = a.filter(ImageFilter.GaussianBlur(0.6))
cut = Image.merge("RGBA", (r, g, b, a))
cut = cut.crop(cut.getbbox())

max_h = 900
if cut.height > max_h:
    cut = cut.resize((round(cut.width * max_h / cut.height), max_h), Image.LANCZOS)

cut.save(out_dir / "thiago-visnadi.png", optimize=True)
cut.save(out_dir / "thiago-visnadi.webp", quality=88, method=6)
print("ok", cut.size)
