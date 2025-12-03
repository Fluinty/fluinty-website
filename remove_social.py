import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove Twitter link
content = re.sub(
    r'\s*<a href="#" class="text-gray-400 hover:text-white transition-colors"><i data-lucide="twitter"[^>]*></i></a>\r?\n?',
    '',
    content
)

# Remove Facebook link
content = re.sub(
    r'\s*<a href="#" class="text-gray-400 hover:text-white transition-colors"><i data-lucide="facebook"[^>]*></i></a>\r?\n?',
    '',
    content
)

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Twitter and Facebook links removed successfully!")
