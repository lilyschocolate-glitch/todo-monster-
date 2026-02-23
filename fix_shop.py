
import sys

def patch_file(filename, old_text, new_text):
    with open(filename, 'r') as f:
        content = f.read()
    if old_text in content:
        new_content = content.replace(old_text, new_text)
        with open(filename, 'w') as f:
            f.write(new_content)
        print(f"Patched {filename}")
    else:
        print(f"Failed to find target in {filename}")
        # Try a more relaxed match by stripping whitespace
        lines = content.splitlines()
        old_lines = old_text.strip().splitlines()
        found = False
        for i in range(len(lines) - len(old_lines) + 1):
            match = True
            for j in range(len(old_lines)):
                if old_lines[j].strip() != lines[i+j].strip():
                    match = False
                    break
            if match:
                print(f"Found relaxed match at line {i+1}")
                lines[i:i+len(old_lines)] = new_text.splitlines()
                with open(filename, 'w') as f:
                    f.write('\\n'.join(lines) + '\\n')
                found = True
                break
        if not found:
            sys.exit(1)

# Style.css patches
old_item = """  .shop-item {
    flex-direction: column !important;
    align-items: center !important;
    text-align: center;
    padding: 16px 12px !important;
    width: 100% !important;
    gap: 12px;
  }"""
new_item = """  .shop-item {
    flex-direction: column !important;
    align-items: center !important;
    text-align: center;
    padding: 16px !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    gap: 8px;
  }"""

old_name = """  .shop-item-name {
    font-size: 0.95rem !important;
  }"""
new_name = """  .shop-item-name {
    font-size: 0.95rem !important;
    white-space: normal !important;
    word-break: break-all !important;
    width: 100%;
  }"""

old_detail = """  .shop-item-detail {
    font-size: 0.75rem !important;
    padding: 0 10px;
  }"""
new_detail = """  .shop-item-detail {
    font-size: 0.70rem !important;
    padding: 0 4px;
    white-space: normal !important;
    word-break: break-all !important;
    line-height: 1.3 !important;
    width: 100%;
  }"""

patch_file('style.css', old_item, new_item)
patch_file('style.css', old_name, new_name)
patch_file('style.css', old_detail, new_detail)

# Index.html patch
old_v = '<link rel="stylesheet" href="style.css?v=10">'
new_v = '<link rel="stylesheet" href="style.css?v=11">'
patch_file('index.html', old_v, new_v)
