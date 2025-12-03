import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add favicon link after the meta description
favicon_link = '    <link rel="icon" type="image/png" href="assets/favicon.png">\n'

# Find the meta description and add favicon after it
pattern = r'(\s+content="Fluinty - Automatyzuj, Optymalizuj, Rozwijaj\. Przyszłość Twojego biznesu zaczyna się tutaj\.">)\n'
replacement = r'\1\n' + favicon_link

updated_content = re.sub(pattern, replacement, content, count=1)

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("Favicon added successfully!")
