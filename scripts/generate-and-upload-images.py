#!/usr/bin/env python3
"""
为所有产品生成AI图片，上传到R2，并更新D1数据库
使用智谱AI CogView生成，wrangler上传R2
"""

import os
import sys
import json
import subprocess
import time
import requests
from pathlib import Path

API_KEY = "191453d683e54255b23b84b23510a51d.AOUKFGPLaNHvlHGK"
GENERATE_URL = "https://open.bigmodel.cn/api/paas/v4/images/generations"
R2_BUCKET = "leoeon-images"
PUBLIC_URL = "https://pub-6e105bae4ec2412aa6f2943c5b2746dc.r2.dev"
DB_NAME = "leoeon-katana-db"

PRODUCTS = [
    {
        "id": 1,
        "slug": "demon-slayer-tanjiro-katana",
        "prompt": "A beautiful anime-style replica katana inspired by Demon Slayer Tanjiro, black Nichirin blade with red sun pattern, displayed on dark velvet stand, professional product photography, studio lighting, e-commerce product shot, clean dark background",
    },
    {
        "id": 2,
        "slug": "kill-bill-hattori-hanzo",
        "prompt": "A sleek Japanese katana replica inspired by Kill Bill movie Hattori Hanzo style, ornate golden handle wrap and circular tsuba guard, displayed on dark wooden stand, professional product photography, studio lighting, e-commerce product shot",
    },
    {
        "id": 3,
        "slug": "traditional-handmade-katana",
        "prompt": "An authentic traditional handmade Japanese katana with genuine hamon pattern on blade, ray skin handle, silk wrap, displayed on dark background, professional product photography, studio lighting, e-commerce product shot",
    },
    {
        "id": 4,
        "slug": "one-piece-zoro-wado",
        "prompt": "An anime-style replica katana inspired by One Piece Roronoa Zoro Wado Ichimonji, white handle and white sheath, displayed on dark stand, professional product photography, studio lighting, e-commerce product shot",
    },
    {
        "id": 5,
        "slug": "last-samurai-battle-ready",
        "prompt": "A battle-ready katana inspired by The Last Samurai movie, traditional tsuba guard, displayed on dark background, professional product photography, studio lighting, e-commerce product shot",
    },
    {
        "id": 6,
        "slug": "mini-katana-letter-opener",
        "prompt": "A miniature decorative katana letter opener with detailed craftsmanship, small size, displayed on dark wooden desk, professional product photography, studio lighting, e-commerce product shot",
    },
    {
        "id": 7,
        "slug": "bleach-ichigo-zangetsu",
        "prompt": "An anime-style replica katana inspired by Bleach Ichigo Zangetsu, large cleaver-style blade, black handle, displayed on dark stand, professional product photography, studio lighting, e-commerce product shot",
    },
    {
        "id": 8,
        "slug": "hand-forged-t10-steel-katana",
        "prompt": "A premium hand-forged T10 steel katana with clay-tempered hamon, genuine ray skin handle, traditional Japanese craftsmanship, displayed on dark background, professional product photography, studio lighting, e-commerce product shot",
    },
]

def generate_image(prompt: str):
    """调用智谱AI生成图片，返回下载URL"""
    resp = requests.post(
        GENERATE_URL,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": "cogview-3-plus",
            "prompt": prompt,
        },
        timeout=120,
    )
    resp.raise_for_status()
    data = resp.json()
    return data["data"][0]["url"]

def download_image(url: str, path: str):
    """下载图片到本地"""
    r = requests.get(url, timeout=60)
    r.raise_for_status()
    with open(path, "wb") as f:
        f.write(r.content)
    return path

def upload_to_r2(local_path: str, r2_key: str):
    """使用wrangler上传文件到R2"""
    cmd = [
        "npx", "wrangler", "r2", "object", "put",
        f"{R2_BUCKET}/{r2_key}",
        "--file", local_path,
        "--content-type", "image/jpeg",
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, cwd=Path(__file__).parent.parent)
    if result.returncode != 0:
        raise RuntimeError(f"R2 upload failed: {result.stderr}")
    return f"{PUBLIC_URL}/{r2_key}"

def update_db(product_id: int, image_url: str):
    """更新D1数据库中的产品图片URL"""
    sql = f"UPDATE products SET image = '{image_url}' WHERE id = {product_id};"
    cmd = [
        "npx", "wrangler", "d1", "execute", DB_NAME,
        "--remote", "--command", sql,
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, cwd=Path(__file__).parent.parent)
    if result.returncode != 0:
        raise RuntimeError(f"DB update failed: {result.stderr}")

def main():
    temp_dir = Path(__file__).parent.parent / "temp-product-images"
    temp_dir.mkdir(exist_ok=True)

    for p in PRODUCTS:
        print(f"\n[{p['id']}/{len(PRODUCTS)}] {p['slug']}")
        try:
            print("  Generating...")
            url = generate_image(p["prompt"])
            print(f"  URL: {url[:80]}...")

            local_path = str(temp_dir / f"{p['slug']}.jpg")
            print(f"  Downloading -> {local_path}")
            download_image(url, local_path)

            r2_key = f"products/{p['slug']}.jpg"
            print(f"  Uploading to R2 -> {r2_key}")
            public_url = upload_to_r2(local_path, r2_key)
            print(f"  Public URL: {public_url}")

            print(f"  Updating DB id={p['id']}")
            update_db(p["id"], public_url)

            print("  Done!")
            time.sleep(2)  # 避免API限流
        except Exception as e:
            print(f"  ERROR: {e}")
            continue

    print("\nAll done!")

if __name__ == "__main__":
    main()
