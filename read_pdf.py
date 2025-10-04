import PyPDF2
import sys

def extract_pdf_text(pdf_path):
    """Extrae el texto de un archivo PDF"""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            
            print(f"📄 PDF: {pdf_path}")
            print(f"📊 Número de páginas: {len(pdf_reader.pages)}")
            print("=" * 80)
            
            # Extraer texto de las primeras 3 páginas para obtener información clave
            for i in range(min(3, len(pdf_reader.pages))):
                page = pdf_reader.pages[i]
                text = page.extract_text()
                
                print(f"\n--- PÁGINA {i+1} ---")
                print(text[:2000])  # Primeros 2000 caracteres
                if len(text) > 2000:
                    print("\n[... contenido truncado ...]")
                print("-" * 50)
                
    except Exception as e:
        print(f"❌ Error al leer el PDF: {e}")

if __name__ == "__main__":
    pdf_file = "2504.12946v2 (1).pdf"
    extract_pdf_text(pdf_file)