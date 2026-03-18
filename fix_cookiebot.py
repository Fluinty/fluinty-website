import os
import glob

def fix_cookiebot(directory):
    html_files = glob.glob(os.path.join(directory, '**/*.html'), recursive=True)
    
    for filepath in html_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        modified = False
        
        # Check and replace Tailwind
        if '<script src="https://cdn.tailwindcss.com"></script>' in content:
            content = content.replace(
                '<script src="https://cdn.tailwindcss.com"></script>',
                '<script src="https://cdn.tailwindcss.com" data-cookieconsent="ignore"></script>'
            )
            modified = True
            
        # Check and replace Lucide
        if '<script src="https://unpkg.com/lucide@latest"></script>' in content:
            content = content.replace(
                '<script src="https://unpkg.com/lucide@latest"></script>',
                '<script src="https://unpkg.com/lucide@latest" data-cookieconsent="ignore"></script>'
            )
            modified = True
            
        # Write back if modified
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed Cookiebot block in {filepath}")

if __name__ == '__main__':
    fix_cookiebot('.')
    print("Done checking all files.")
