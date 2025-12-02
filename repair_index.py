
import os

file_path = 'c:/Users/Adamn/.gemini/antigravity/scratch/fluinty-redesign/index.html'

new_content = """    <section id="pricing" class="py-24 bg-gray-50">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-display font-bold mb-6 text-text-main">Pakiety Wdrożeniowe</h2>
                <p class="text-text-muted max-w-2xl mx-auto">Inwestycja, która zwraca się w 1-2
                    miesiące.</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <!-- Starter -->
                <div
                    class="p-8 rounded-3xl bg-white border border-gray-100 shadow-soft hover:border-primary/50 transition-all">
                    <h3 class="text-xl font-bold mb-2 text-text-main">START</h3>
                    <div class="text-3xl font-bold text-accent-text mb-6">od 1000 PLN <span
                            class="text-sm text-text-muted font-normal">/msc</span></div>
                    <p class="text-sm text-base mb-6">Dla małych firm, pierwsza automatyzacja.
                    </p>
                    <ul class="space-y-3 text-sm text-base mb-8">
                        <li class="flex gap-2"><i data-lucide="check" class="w-4 h-4 text-primary"></i> 1 wybrany proces
                        </li>
                        <li class="flex gap-2"><i data-lucide="check" class="w-4 h-4 text-primary"></i> Konfiguracja i
                            start</li>
                        <li class="flex gap-2"><i data-lucide="check" class="w-4 h-4 text-primary"></i> Monitoring 24/7
                        </li>
                        <li class="flex gap-2"><i data-lucide="check" class="w-4 h-4 text-primary"></i> Szkolenie
                            zespołu</li>
                    </ul>
                    <a href="#contact"
                        class="block w-full py-3 rounded-xl border border-gray-200 text-text-main text-center hover:bg-gray-50 transition-colors">Wybieram
                        Start</a>
                </div>

                <!-- Growth (Featured) -->
                <div
                    class="p-8 rounded-3xl bg-primary/10 border border-primary/50 relative transform md:-translate-y-4">
                    <div
                        class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider flex justify-center items-center text-center whitespace-nowrap">
                        Najczęściej Wybierany</div>
                    <h3 class="text-xl font-bold mb-2 text-main">WZROST</h3>
                    <div class="text-3xl font-bold text-primary-text mb-6">od 3000 PLN <span
                            class="text-sm text-text-muted font-normal">/msc</span></div>
                    <p class="text-sm text-muted mb-6">Kompleksowa automatyzacja dla rosnących
                        firm.</p>
                    <ul class="space-y-3 text-sm text-base mb-8">
                        <li class="flex gap-2"><i data-lucide="check" class="w-4 h-4 text-primary"></i> Integracja wielu
                            systemów</li>
                        <li class="flex gap-2"><i data-lucide="check" class="w-4 h-4 text-primary"></i> Złożone procesy
                        </li>
                        <li class="flex gap-2"><i data-lucide="check" class="w-4 h-4 text-primary"></i> Zaawansowana
                            analityka</li>
                        <li class="flex gap-2"><i data-lucide="check" class="w-4 h-4 text-primary"></i> Priorytetowe
                            wsparcie</li>
                    </ul>
                    <a href="#contact"
                        class="block w-full py-3 rounded-xl bg-white text-primary-text font-bold text-center hover:bg-gray-50 transition-colors shadow-lg">Wybieram
                        Wzrost</a>
                </div>

                <!-- Enterprise -->
                <div
                    class="p-8 rounded-3xl bg-white border border-gray-100 shadow-soft hover:border-accent/50 transition-all">
                    <h3 class="text-xl font-bold mb-2 text-text-main">ENTERPRISE</h3>
                    <div class="text-3xl font-bold text-accent-text mb-6">od 7000 PLN <span
                            class="text-sm text-base font-normal">/msc</span></div>
                    <p class="text-sm text-text-muted mb-6">Dedykowane rozwiązania dla wymagań.</p>
                    <ul class="space-y-3 text-sm text-base mb-8">
                        <li class="flex gap-2"><i data-lucide="check" class="w-4 h-4 text-accent"></i> Unikalna
                            architektura</li>
                        <li class="flex gap-2"><i data-lucide="check" class="w-4 h-4 text-accent"></i> Pełna integracja
                            custom</li>
                        <li class="flex gap-2"><i data-lucide="check" class="w-4 h-4 text-accent"></i> Dedykowany
                            opiekun</li>
                        <li class="flex gap-2"><i data-lucide="check" class="w-4 h-4 text-accent"></i> Wsparcie
                            strategiczne</li>
                    </ul>
                    <a href="#contact"
                        class="block w-full py-3 rounded-xl border border-gray-200 text-text-main text-center hover:bg-gray-50 transition-colors">Kontakt
                        Enterprise</a>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-24 bg-white">
        <div class="max-w-3xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-display font-bold mb-6 text-text-main">Pytania i Odpowiedzi</h2>
            </div>

            <div class="space-y-4">
                <details
                    class="group bg-white rounded-xl border border-gray-100 shadow-soft open:bg-gray-50 transition-all">
                    <summary
                        class="flex justify-between items-center p-6 cursor-pointer list-none font-medium text-text-main">
                        <span>Jak szybko możemy wystartować?</span>
                        <span class="transition-transform group-open:rotate-180"><i
                                data-lucide="chevron-down"></i></span>
                    </summary>
                    <div class="px-6 pb-6 text-text-muted text-sm leading-relaxed">
                        Pierwszą automatyzację możemy uruchomić w ciągu 2-4 tygodni. W pakiecie START efekty zobaczysz
                        już w pierwszym miesiącu.
                    </div>
                </details>

                <details
                    class="group bg-white rounded-xl border border-gray-100 shadow-soft open:bg-gray-50 transition-all">
                    <summary
                        class="flex justify-between items-center p-6 cursor-pointer list-none font-medium text-text-main">
                        <span>Czy muszę zmieniać moje obecne systemy?</span>
                        <span class="transition-transform group-open:rotate-180"><i
                                data-lucide="chevron-down"></i></span>
                    </summary>
                    <div class="px-6 pb-6 text-text-muted text-sm leading-relaxed">
                        Absolutnie nie! Nasze rozwiązania integrują się z Twoimi obecnymi narzędziami (Gmail, CRM,
                        Excel, itp.) bez konieczności rewolucji infrastrukturalnej.
                    </div>
                </details>

                <details
                    class="group bg-white rounded-xl border border-gray-100 shadow-soft open:bg-gray-50 transition-all">
                    <summary
                        class="flex justify-between items-center p-6 cursor-pointer list-none font-medium text-text-main">
                        <span>Kiedy zobaczę zwrot z inwestycji (ROI)?</span>
                        <span class="transition-transform group-open:rotate-180"><i
                                data-lucide="chevron-down"></i></span>
                    </summary>
                    <div class="px-6 pb-6 text-text-muted text-sm leading-relaxed">
                        Większość klientów osiąga zwrot w ciągu 1-2 miesięcy. Jeśli automatyzacja zaoszczędzi Ci 40h
                        miesięcznie, to przy stawce 50 PLN/h masz 2000 PLN oszczędności od razu.
                    </div>
                </details>

                <details
                    class="group bg-white rounded-xl border border-gray-100 shadow-soft open:bg-gray-50 transition-all">
                    <summary
                        class="flex justify-between items-center p-6 cursor-pointer list-none font-medium text-text-main">
                        <span>Czy to bezpieczne? Co jeśli nie zadziała?</span>
                        <span class="transition-transform group-open:rotate-180"><i
                                data-lucide="chevron-down"></i></span>
                    </summary>
                    <div class="px-6 pb-6 text-text-muted text-sm leading-relaxed">
                        Zaczynamy od prototypu. Nie płacisz za pełne wdrożenie, dopóki nie zobaczysz, że to działa.
                        Oferujemy też 30-dniową gwarancję satysfakcji.
                    </div>
                </details>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-24 bg-surface/50 border-t border-gray-100">
        <div class="max-w-4xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-display font-bold mb-6 text-text-main">Rozpocznij Transformację
                </h2>
                <p class="text-text-muted max-w-2xl mx-auto">Wypełnij formularz, a skontaktujemy się z Tobą w ciągu 24h
                    z
                    pomysłem na automatyzację.</p>
            </div>

            <button type="button" onclick="openModal()"
                class="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
                Otwórz Formularz Kontaktowy
            </button>
        </div>
    </section>

    <!-- Contact Modal -->
    <div id="contact-modal" class="fixed inset-0 z-[100] hidden opacity-0 transition-opacity duration-300"
        aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onclick="closeModal()"></div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">

                <!-- Modal Panel -->
                <div
                    class="relative transform overflow-hidden rounded-3xl bg-white border border-gray-100 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">

                    <!-- Close Button -->
                    <button onclick="closeModal()"
                        class="absolute top-4 right-4 text-gray-400 hover:text-text-main transition-colors p-2 z-10">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>

                    <div class="p-8 md:p-10">
                        <div class="text-center mb-8">
                            <h3 class="text-2xl md:text-3xl font-display font-bold mb-2" id="modal-title">Odbierz
                                Darmową Strategię Automatyzacji</h3>
                            <p class="text-gray-400">W 15 minut zidentyfikujemy procesy, które kradną Twój czas i
                                pieniądze. Otrzymasz gotowy plan działania - bez żadnych zobowiązań.</p>
                        </div>

                        <form action="https://api.web3forms.com/submit" method="POST" class="space-y-6">
                            <input type="hidden" name="access_key" value="fe91fdb3-2491-4463-8b53-77ab7adef895">
                            <input type="hidden" name="subject" value="Nowe zgłoszenie z Fluinty">
                            
                            <div class="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label for="modal-name" class="block text-sm font-medium text-text-main mb-2">Imię i
                                        Nazwisko</label>
                                    <input type="text" id="modal-name" name="name" required
                                        class="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:border-primary/50 transition-colors"
                                        placeholder="Jan Kowalski">
                                </div>
                                <div>
                                    <label for="modal-email" class="block text-sm font-medium text-text-main mb-2">Email
                                        Firmowy</label>
                                    <input type="email" id="modal-email" name="email" required
                                        class="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:border-primary/50 transition-colors"
                                        placeholder="jan@firma.pl">
                                </div>
                            </div>
                            <div>
                                <label for="modal-message" class="block text-sm font-medium text-text-main mb-2">O czym
                                    chcesz porozmawiać?</label>
                                <textarea id="modal-message" name="message" rows="4" required
                                    class="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:border-primary/50 transition-colors"
                                    placeholder="Opisz krótko swój proces..."></textarea>
                            </div>
                            <button type="submit"
                                class="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
                                Rezerwuję Darmową Konsultację
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-surface border-t border-white/5 py-12">
        <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div class="text-center md:text-left">
                <a href="#" class="text-2xl font-display font-bold tracking-tighter text-white">fluinty.</a>
                <p class="text-gray-500 text-sm mt-2">Automatyzacja przyszłości.</p>
            </div>
            <div class="flex gap-6">
                <a href="#" class="text-gray-400 hover:text-white transition-colors"><i data-lucide="linkedin"
                        class="w-5 h-5"></i></a>
                <a href="#" class="text-gray-400 hover:text-white transition-colors"><i data-lucide="twitter"
                        class="w-5 h-5"></i></a>
                <a href="#" class="text-gray-400 hover:text-white transition-colors"><i data-lucide="facebook"
                        class="w-5 h-5"></i></a>
            </div>
            <div class="text-gray-500 text-sm">
                &copy; 2025 Fluinty. Wszelkie prawa zastrzeżone.
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="js/main.js"></script>
    <script>
        lucide.createIcons();
    </script>
</body>

</html>"""

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the line with the Pricing section start
target_line_index = -1
for i, line in enumerate(lines):
    if '<section id="pricing" class="py-24 bg-gray-50">' in line:
        target_line_index = i
        break

if target_line_index != -1:
    # Keep everything before the target line
    # But we want to keep the <!-- Pricing Section --> comment if it exists before it
    # Actually, the new content includes the comment? No, I didn't include it in new_content string start.
    # Let's check lines[target_line_index-1]
    
    # We will just cut at target_line_index and append new_content
    # But we need to make sure we don't duplicate the comment if it's there.
    # The new_content starts with <section id="pricing"...
    
    # Wait, I want to replace from the comment if possible.
    # Lines 927 is <!-- Pricing Section -->
    # Lines 928 is <section ...>
    
    # If I cut at 928, I keep 927.
    # My new_content starts with <section ...>
    # So it should be fine.
    
    final_lines = lines[:target_line_index]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(final_lines)
        f.write(new_content)
    print("Successfully repaired index.html")
else:
    print("Could not find target line in index.html")
