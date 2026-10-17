"""Create web-sized copies without changing the original portfolio films.

Usage: python scripts/optimize-videos.py --ffmpeg /path/to/ffmpeg
Only standard-library Python and an FFmpeg build with libx264 are required.
"""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess

parser = argparse.ArgumentParser()
parser.add_argument('--ffmpeg', default='ffmpeg')
args = parser.parse_args()
media = Path(__file__).resolve().parent.parent / 'assets' / 'media'
manifest = {}
for name in ('canva', 'dongpeng', 'anton', 'young', 'october'):
    source = media / f'{name}.mp4'
    output = media / f'{name}-720p.mp4'
    print(f'Encoding {name}...', flush=True)
    subprocess.run([
        args.ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-i', str(source),
        '-map', '0:v:0', '-map', '0:a:0?',
        '-vf', "scale=w='min(1280,iw)':h='min(720,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2,setsar=1",
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '23',
        '-maxrate', '1400k', '-bufsize', '2800k', '-pix_fmt', 'yuv420p',
        '-g', '60', '-keyint_min', '30', '-c:a', 'aac', '-b:a', '96k',
        '-movflags', '+faststart', '-map_metadata', '-1', '-threads', '4', str(output)
    ], check=True)
    if output.stat().st_size >= source.stat().st_size:
        raise RuntimeError(f'{name}: optimized copy is not smaller than its source')
    hd = media / f'{name}-1080p.mp4'
    print(f'Encoding HD {name}...', flush=True)
    subprocess.run([
        args.ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-i', str(source),
        '-map', '0:v:0', '-map', '0:a:0?', '-c:v', 'libx264', '-preset', 'slow',
        '-crf', '20', '-maxrate', '3000k', '-bufsize', '6000k', '-pix_fmt', 'yuv420p',
        '-g', '60', '-keyint_min', '30', '-c:a', 'copy', '-movflags', '+faststart',
        '-map_metadata', '-1', '-threads', '4', str(hd)
    ], check=True)
    # Already efficient originals do not benefit from another encode.
    if hd.stat().st_size >= source.stat().st_size * 0.9:
        hd.unlink()
        hd = source
    manifest[name] = {
        'original': source.name, 'web': output.name,
        'originalBytes': source.stat().st_size, 'webBytes': output.stat().st_size,
        'hd': hd.name, 'hdBytes': hd.stat().st_size,
        'originalSha256': hashlib.sha256(source.read_bytes()).hexdigest(),
        'webSha256': hashlib.sha256(output.read_bytes()).hexdigest(),
    }
    print(json.dumps(manifest[name]), flush=True)
(media / 'video-variants.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
