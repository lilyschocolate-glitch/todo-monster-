
import sys

def patch_file(filename, old_text, new_text):
    with open(filename, 'r') as f:
        content = f.read()
    if old_text in content:
        new_content = content.replace(old_text, new_text)
        with open(filename, 'w') as f:
            f.write(new_content)
        print(f"Patched {filename}")
        return True
    else:
        print(f"Exact match failed for {filename}")
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
                print(f"Found relaxed match in {filename} at line {i+1}")
                indent = lines[i][:len(lines[i]) - len(lines[i].lstrip())]
                new_lines = [(indent + line.lstrip() if line.strip() else '') for line in new_text.strip().splitlines()]
                lines[i:i+len(old_lines)] = new_lines
                with open(filename, 'w') as f:
                    f.write('\n'.join(lines) + '\n')
                found = True
                break
        return found

# 1. Overlay residue fix in index.html
# Replace all instances of closing modals with a call to a function that also clears overlay, 
# but easiest is to replace "classList.remove('show')" with a logic that includes overlay.
# We'll target the specific buttons.
idx_html = 'index.html'

# Backpack modal close
old_bp_close = 'onclick="document.getElementById(\'backpack-modal\').classList.remove(\'show\')"'
new_bp_close = 'onclick="closeAllModals()"'
patch_file(idx_html, old_bp_close, new_bp_close)

# Shop modal close
old_shop_close = 'onclick="document.getElementById(\'shop-modal\').classList.remove(\'show\')"'
new_shop_close = 'onclick="closeAllModals()"'
patch_file(idx_html, old_shop_close, new_shop_close)

# API key cancel (it already had close-modal-btn but let's be sure about the JS)
# share-modal and friend-modal closures are handled by JS IDs, so we'll check ui.js later.

# 2. UI.js closeAllModals check
# Already exists:
# function closeAllModals() {
#     document.getElementById('overlay').classList.remove('show');
#     document.querySelectorAll('.modal.show').forEach(m => m.classList.remove('show'));
# }
# This is perfect, so calling it from index.html is the right fix.

# 3. CSS Fixes (Centering, Textarea, Shop Width)
style_css = 'style.css'

# Centering for share-modal and friend-modal
old_modal_content = """  .modal-content {
    max-height: 70vh;
    overflow-y: auto;
  }"""
new_modal_content = """  .modal-content {
    max-height: 70vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .share-preview {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .share-text-area {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }"""

# Increase share textarea size
old_textarea = """  .share-text-area textarea {
    width: 100%;
    height: 80px;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    font-size: 0.8rem;
    resize: none;
    background: #f8fafc;
    margin-bottom: 8px;
  }"""
new_textarea = """  .share-text-area textarea {
    width: 100%;
    height: 120px;
    padding: 10px;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    font-size: 0.85rem;
    resize: none;
    background: #f8fafc;
    margin: 10px 0;
  }"""

# Shop width fix (padding-box)
# The issue: .shop-item had width: 100% which was literal, pushing out if parent has padding.
old_shop_item_mobile = """  .shop-item {
    flex-direction: column !important;
    align-items: center !important;
    text-align: center;
    padding: 16px !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    gap: 8px;
  }"""
new_shop_item_mobile = """  .shop-item {
    flex-direction: column !important;
    align-items: center !important;
    text-align: center;
    padding: 16px !important;
    width: auto !important; /* width: 100%をautoに戻してpadding内に収める回る/ */
    max-width: 100% !important;
    box-sizing: border-box !important;
    gap: 8px;
    margin: 0 4px; /* 左右にわずかな隙間を空けて枠と重ならないように回る/ */
  }"""

patch_file(style_css, old_modal_content, new_modal_content)
patch_file(style_css, old_textarea, new_textarea)
patch_file(style_css, old_shop_item_mobile, new_shop_item_mobile)

# v12 version bump
patch_file(idx_html, 'style.css?v=11', 'style.css?v=12')
