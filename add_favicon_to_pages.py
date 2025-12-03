import os

# List of case study HTML files
case_studies = [
    'pages/case-study-art-tim.html',
    'pages/case-study-eticod.html',
    'pages/case-study-pups-choice.html',
    'pages/case-study-viivaa.html'
]

favicon_link = '    <link rel="icon" type="image/png" href="../assets/favicon.png">\n'

for file_path in case_studies:
    # Read the file
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if favicon already exists
    if 'favicon.png' in content:
        print(f"{file_path}: Favicon already exists, skipping...")
        continue
    
    # Add favicon after the title tag
    if '</title>' in content:
        updated_content = content.replace('</title>\n', '</title>\n' + favicon_link)
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        print(f"{file_path}: Favicon added!")
    else:
        print(f"{file_path}: Could not find </title> tag")

print("\nAll case study pages updated!")
