import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Update LinkedIn link
content = content.replace(
    '<a href="#" class="text-gray-400 hover:text-white transition-colors"><i data-lucide="linkedin"',
    '<a href="https://www.linkedin.com/company/fluinty/" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors"><i data-lucide="linkedin"'
)

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("LinkedIn link updated successfully!")
