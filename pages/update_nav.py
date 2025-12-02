import re

# Navigation templates for each case study
navigations = {
    'case-study-eticod.html': {
        'prev': ('case-study-viivaa.html', 'Viivaa.de'),
        'next': ('case-study-art-tim.html', 'Art-Tim')
    },
    'case-study-art-tim.html': {
        'prev': ('case-study-eticod.html', 'Eticod'),
        'next': ('case-study-pups-choice.html', "Pup's Choice")
    },
    'case-study-pups-choice.html': {
        'prev': ('case-study-art-tim.html', 'Art-Tim'),
        'next': ('case-study-viivaa.html', 'Viivaa.de')
    },
    'case-study-viivaa.html': {
        'prev': ('case-study-pups-choice.html', "Pup's Choice"),
        'next': ('case-study-eticod.html', 'Eticod')
    }
}

nav_template = '''    <!-- Navigation -->
    <section class="py-24 border-t border-gray-200">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid md:grid-cols-2 gap-8">
                <!-- Previous -->
                <a href="{prev_url}"
                    class="group block p-8 rounded-3xl bg-white border border-gray-100 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all text-left">
                    <div class="text-sm text-gray-500 group-hover:text-primary mb-2 flex items-center gap-2 transition-colors">
                        <i data-lucide="arrow-left" class="w-4 h-4 group-hover:-translate-x-1 transition-transform text-primary"></i>
                        Poprzednia realizacja
                    </div>
                    <h3 class="text-2xl font-display font-bold text-gray-900 group-hover:text-primary transition-colors">{prev_name}</h3>
                </a>

                <!-- Next -->
                <a href="{next_url}"
                    class="group block p-8 rounded-3xl bg-white border border-gray-100 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all text-right">
                    <div class="text-sm text-gray-500 group-hover:text-primary mb-2 flex items-center gap-2 justify-end transition-colors">
                        Następna realizacja
                        <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform text-primary"></i>
                    </div>
                    <h3 class="text-2xl font-display font-bold text-gray-900 group-hover:text-primary transition-colors">{next_name}</h3>
                </a>
            </div>
        </div>
    </section>'''

for filename, nav in navigations.items():
    filepath = f'c:/Users/Adamn/.gemini/antigravity/scratch/fluinty-redesign/pages/{filename}'
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to match the entire Next Case Study section
   pattern = r'    <!-- Next Case Study -->.*?    </section>'
    
    # Create the new navigation section
    new_nav = nav_template.format(
        prev_url=nav['prev'][0],
        prev_name=nav['prev'][1],
        next_url=nav['next'][0],
        next_name=nav['next'][1]
    )
    
    # Replace
    new_content = re.sub(pattern, new_nav, content, flags=re.DOTALL)
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Updated {filename}")

print("All files updated successfully!")
