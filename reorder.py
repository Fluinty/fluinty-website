import os
import re

def reorder_cards(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find Bodtech card
    pattern_bodtech = r'(\s*<!-- Case Study Card: Bodtech -->\n\s*<div class="snap-center shrink-0 w-full md:w-\[calc\(50\%-1rem\)\]">\n\s*<a href="pages/case-study-bodtech\.html"..*?</a>\n\s*</div>)'
    match_bodtech = re.search(pattern_bodtech, content, re.DOTALL)
    
    if not match_bodtech:
        print(f"Bodtech card not found in {filepath}!")
        return

    bodtech_html = match_bodtech.group(1)
    
    # Remove Bodtech card from current location
    content = content.replace(bodtech_html, '')
    
    # We also need to fix the Bodtech image URL in the extracted HTML
    bodtech_html = bodtech_html.replace('https://images.unsplash.com/photo-1563820986506-69d659fd4bc5?auto=format&fit=crop&q=80&w=1000', 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1000')

    # Find the insertion point (before Pup's Choice)
    pattern_pups = r'(\s*<!-- Case Study Card 3: Pup\'s Choice -->)'
    
    match_pups = re.search(pattern_pups, content)
    if not match_pups:
        print(f"Pup's choice card not found in {filepath}!")
        return
        
    # Insert Bodtech just before Pup's Choice
    content = content.replace(match_pups.group(1), bodtech_html + match_pups.group(1))

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Successfully reordered and updated image in {filepath}")

reorder_cards('index.html')
reorder_cards('en/index.html')
