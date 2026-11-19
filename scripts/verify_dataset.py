import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ts = (ROOT / "src" / "data" / "ski2023-mental-health.ts").read_text(encoding="utf-8")
svg = (ROOT / "src" / "data" / "indonesia-38-map-paths.ts").read_text(encoding="utf-8")
verified = json.loads((ROOT / "scripts" / "bab5_verified.json").read_text(encoding="utf-8"))

svg_codes = re.findall(r"^\s{2}([A-Z]{2}):\s*\{", svg, flags=re.M)
assert len(svg_codes) == 38, f"Expected 38 SVG paths, got {len(svg_codes)}"

ts_codes = re.findall(r'"code":\s*"([A-Z]{2})"', ts)
assert len(ts_codes) == 39, f"Expected 39 province codes (38 + ID), got {len(ts_codes)}"
assert set(svg_codes) == (set(ts_codes) - {"ID"}), "SVG codes mismatch TS province codes!"

catalog_ids = re.findall(r'id:\s*"(t[^"]+)"', ts)
assert len(catalog_ids) == 15, f"Expected 15 tables in catalog, got {len(catalog_ids)}"

for k in ["t5.1", "t5.2", "t5.3", "t4.65", "t5.4", "t5.5", "t5.6", "t5.7", "t5.8", "t5.9", "t5.10", "t5.11", "t5.12", "t5.13", "t5.14"]:
    assert k in catalog_ids, f"Missing table {k}"

print("VERIFICATION PASSED:")
print(f"- SVG Province Paths: {len(svg_codes)} (100% match with 38 provinces)")
print(f"- TS Province Records: {len(ts_codes)} (38 provinces + INDONESIA)")
print(f"- Official Tables in Catalog: {len(catalog_ids)} -> {', '.join(catalog_ids)}")
print(f"- Verified PDF JSON counts: t5_1={len(verified['t5_1'])}, t5_5={len(verified['t5_5'])}, t5_13={len(verified['t5_13'])}, t5_14={len(verified['t5_14'])}")
