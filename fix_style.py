
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
        return False

style_css = 'style.css'

# Relaxed match for .modal-content
with open(style_css, 'r') as f:
    content = f.read()

if '.modal-content {' in content:
    # We'll use a more surgical replace for modal-content
    # Find the block
    start = content.find('.modal-content {')
    end = content.find('}', start) + 1
    block = content[start:end]
    new_block = block.replace('}', '  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n}')
    content = content.replace(block, new_block)
    print("Injected flex to .modal-content")

# Specifically fix the share text area height
if '.share-text-area textarea {' in content:
    start = content.find('.share-text-area textarea {')
    end = content.find('}', start) + 1
    block = content[start:end]
    # Replace height: 80px or whatever it is
    import re
    new_block = re.sub(r'height:\s*\d+px;', 'height: 140px;', block)
    new_block = re.sub(r'font-size:\s*[\d.]+rem;', 'font-size: 0.85rem;', new_block)
    content = content.replace(block, new_block)
    print("Expanded share textarea height")

# Center content within share-modal and friend-modal
content += "\n\n/* Final Polishing Fixes */\n.share-preview, .share-text-area, .modal-content > * {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n"

with open(style_css, 'w') as f:
    f.write(content)
