
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
        # Try a more relaxed match by stripping whitespace per line
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
                # Preserve indentation of the first line
                indent = lines[i][:len(lines[i]) - len(lines[i].lstrip())]
                new_lines = [(indent + line.lstrip() if line.strip() else '') for line in new_text.strip().splitlines()]
                lines[i:i+len(old_lines)] = new_lines
                with open(filename, 'w') as f:
                    f.write('\n'.join(lines) + '\n')
                found = True
                break
        return found

# 1. Background message
ui_js = 'src/ui.js'
old_msg = 'alert(`${item.name}に着せ替えました！`);'
new_msg = 'alert(`はこにわを${item.name}に着せ替えました！`);'
if not patch_file(ui_js, old_msg, new_msg):
    print(f"FAILED to patch {ui_js}")

# 2. Style.css blur remove
style_css = 'style.css'
old_blur = """  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  z-index: 900;"""
new_blur = """  background: rgba(15, 23, 42, 0.4);
  /* ぼかし（blur）を削除して閉じるときの不自然さを解消回る/ */
  z-index: 900;"""
if not patch_file(style_css, old_blur, new_blur):
    print(f"FAILED to patch {style_css}")

# 3. Index.html button design consistency
index_html = 'index.html'

# Friend modal buttons
old_friend_btns = """      <div class="modal-actions">
        <button id="friend-cancel-btn">やめる</button>
        <button id="friend-import-btn" class="primary-btn">追加する！</button>
      </div>"""
new_friend_btns = """      <div class="modal-actions">
        <button id="friend-cancel-btn" class="close-modal-btn">やめる</button>
        <button id="friend-import-btn" class="primary-modal-btn">追加する！</button>
      </div>"""
patch_file(index_html, old_friend_btns, new_friend_btns)

# Share modal copy button
old_share_copy = '<button id="copy-share-text-btn">本文をコピー</button>'
new_share_copy = '<button id="copy-share-text-btn" class="secondary-btn" style="margin-top: 8px;">本文をコピー</button>'
patch_file(index_html, old_share_copy, new_share_copy)

# Share modal bottom buttons
old_share_btns = """      <div class="modal-actions">
        <button id="share-close-btn">とじる</button>
        <a id="share-twitter-link" href="#" target="_blank" class="primary-btn twitter-btn">Xで投稿する</a>
      </div>"""
new_share_btns = """      <div class="modal-actions">
        <button id="share-close-btn" class="close-modal-btn">とじる</button>
        <a id="share-twitter-link" href="#" target="_blank" class="primary-modal-btn twitter-btn">Xで投稿する</a>
      </div>"""
patch_file(index_html, old_share_btns, new_share_btns)
