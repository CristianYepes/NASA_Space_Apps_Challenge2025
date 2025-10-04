import PyPDF2
import sys

def extract_pdf_text(pdf_path):
    """Extrae el texto completo de un archivo PDF"""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            
            print(f"📄 PDF: {pdf_path}")
            print(f"📊 Número de páginas: {len(pdf_reader.pages)}")
            print("=" * 80)
            
            # Extraer texto de las primeras 5 páginas
            full_text = ""
            for i in range(min(5, len(pdf_reader.pages))):
                page = pdf_reader.pages[i]
                text = page.extract_text()
                full_text += f"\n--- PÁGINA {i+1} ---\n"
                full_text += text
                full_text += "\n" + "-" * 50 + "\n"
            
            # Mostrar el texto completo
            print(full_text)
            
            # Buscar información clave
            print("\n🔍 INFORMACIÓN CLAVE DETECTADA:")
            if "exoplanet" in full_text.lower():
                print("✅ Documento sobre exoplanetas")
            if "jwst" in full_text.lower():
                print("✅ Relacionado con el telescopio James Webb (JWST)")
            if "biosignature" in full_text.lower():
                print("✅ Menciona bioseñales")
            if "habitable" in full_text.lower():
                print("✅ Discute habitabilidad")
                
    except Exception as e:
        print(f"❌ Error al leer el PDF: {e}")

if __name__ == "__main__":
    pdf_file = "2504.12946v2 (1).pdf"
    extract_pdf_text(pdf_file)