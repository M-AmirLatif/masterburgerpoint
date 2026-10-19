import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_og_image():
    W, H = 1200, 630
    
    # Base food photo
    base_img_path = "public/images/hero-food.jpg"
    if os.path.exists(base_img_path):
        base = Image.open(base_img_path).convert("RGBA")
        # Resize & crop to 1200x630
        aspect = base.width / base.height
        target_aspect = W / H
        if aspect > target_aspect:
            new_w = int(base.height * target_aspect)
            offset = (base.width - new_w) // 2
            base = base.crop((offset, 0, offset + new_w, base.height))
        else:
            new_h = int(base.width / target_aspect)
            offset = (base.height - new_h) // 2
            base = base.crop((0, offset, base.width, offset + new_h))
        base = base.resize((W, H), Image.Resampling.LANCZOS)
    else:
        base = Image.new("RGBA", (W, H), (35, 10, 10, 255))

    # Dark overlay gradient for readability on left
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    
    # Left-to-right gradient: dark burgundy on left, transparent on right
    for x in range(W):
        ratio = x / W
        if ratio < 0.55:
            alpha = int(235 - (ratio / 0.55) * 45) # 235 down to 190
        else:
            alpha = int(190 - ((ratio - 0.55) / 0.45) * 140) # 190 down to 50
        overlay_draw.line([(x, 0), (x, H)], fill=(25, 5, 5, alpha))

    # Composite base and overlay
    final_img = Image.alpha_composite(base, overlay)
    draw = ImageDraw.Draw(final_img)

    # Fonts
    font_bold = "C:/Windows/Fonts/ariblk.ttf"
    font_semi = "C:/Windows/Fonts/arialbd.ttf"
    font_regular = "C:/Windows/Fonts/arial.ttf"

    f_badge = ImageFont.truetype(font_bold, 20)
    f_title = ImageFont.truetype(font_bold, 58)
    f_urdu = ImageFont.truetype(font_bold, 28)
    f_tagline = ImageFont.truetype(font_semi, 24)
    f_bullets = ImageFont.truetype(font_semi, 22)
    f_footer_label = ImageFont.truetype(font_bold, 22)

    # 1. Top Badge Pill
    badge_x, badge_y = 60, 48
    badge_text = "KASUR'S OLDEST BURGER SHOP • RAILWAY ROAD"
    bbox = draw.textbbox((0, 0), badge_text, font=f_badge)
    bw, bh = bbox[2] - bbox[0], bbox[3] - bbox[1]
    pad_x, pad_y = 18, 10
    draw.rounded_rectangle(
        [badge_x, badge_y, badge_x + bw + pad_x * 2, badge_y + bh + pad_y * 2],
        radius=20,
        fill=(255, 194, 14, 255) # #FFC20E
    )
    draw.text((badge_x + pad_x, badge_y + pad_y - 2), badge_text, font=f_badge, fill=(115, 12, 12, 255))

    # 2. Big Title
    title_y = 115
    draw.text((60, title_y), "MASTER BURGER POINT", font=f_title, fill=(255, 255, 255, 255))

    # 3. Tagline
    tagline_y = 185
    draw.text((60, tagline_y), "Authentic Taste by Highly Experienced Master Cooks", font=f_tagline, fill=(255, 194, 14, 255))

    # 4. Bullet Points
    bullets = [
        "• Special Master Burger, Bun Plaster, Zinger & Beef Burgers",
        "• Fresh Chicken Shawarma, Paratha Rolls & Club Sandwiches",
        "• Crispy Injected Broast, Hot Wings & Loaded Fries",
        "• Open Daily 12:00 PM – 4:00 AM (Late Night Delivery)",
        "• Chandni Chowk, Railway Road, Kasur",
    ]
    bullet_y = 240
    for bullet in bullets:
        draw.text((62, bullet_y), bullet, font=f_bullets, fill=(245, 240, 235, 255))
        bullet_y += 42

    # 5. Bottom Action Bar Pill
    footer_y = 490
    bar_w = 660
    bar_h = 75
    draw.rounded_rectangle(
        [60, footer_y, 60 + bar_w, footer_y + bar_h],
        radius=18,
        fill=(139, 26, 26, 240),
        outline=(255, 194, 14, 200),
        width=3
    )
    draw.text((85, footer_y + 14), "Call / WhatsApp: 0301-6821483", font=f_footer_label, fill=(255, 255, 255, 255))
    draw.text((85, footer_y + 42), "Dine-In • Takeout • Delivery till 4 AM  |  4.1 Google Rating", font=ImageFont.truetype(font_semi, 18), fill=(255, 194, 14, 255))

    # Convert to RGB and save
    out_rgb = final_img.convert("RGB")
    
    targets = [
        "public/images/og-image.jpg",
        "src/app/opengraph-image.jpg",
        "src/app/twitter-image.jpg",
        "src/app/menu/opengraph-image.jpg",
        "src/app/menu/twitter-image.jpg",
    ]
    
    for t in targets:
        os.makedirs(os.path.dirname(t), exist_ok=True)
        out_rgb.save(t, "JPEG", quality=88, optimize=True)
        size_kb = os.path.getsize(t) / 1024
        print(f"Saved {t} ({size_kb:.1f} KB)")

if __name__ == "__main__":
    create_og_image()
