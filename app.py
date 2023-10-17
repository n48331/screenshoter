from flask import Flask, request, render_template, redirect, url_for, send_from_directory
import os
import io
import zipfile
from selenium import webdriver
from PIL import Image
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import shutil

from io import StringIO
import sys

class PrintCapturingStream:
    def __init__(self):
        self.buffer = StringIO()

    def write(self, text):
        self.buffer.write(text)

    def get_output(self):
        return self.buffer.getvalue()

    def flush(self):
        pass


app = Flask(__name__)
print_capture_stream = PrintCapturingStream()
sys.stdout = print_capture_stream
@app.route('/', methods=['GET', 'POST'])
def index():

    if request.method == 'POST':
        uploaded_file = request.files['zip_file']
        if uploaded_file and uploaded_file.filename.endswith(".zip"):
            zip_filename = os.path.join("uploads", uploaded_file.filename)
            uploaded_file.save(zip_filename)
            process_zip(zip_filename)
            return redirect(url_for('download', filename='screenshots.pdf'))
    log_entries = print_capture_stream.get_output().splitlines()

    return render_template('upload.html',log_entries=log_entries)

@app.route('/download/<filename>')
def download(filename):
    return send_from_directory('', filename, as_attachment=True)
@app.route('/logs')
def view_logs():
    log_entries = print_capture_stream.get_output().splitlines()
    return render_template('logs.html', log_entries=log_entries)
def process_zip(zip_file_path):
    
    current_file_path = os.path.dirname(os.path.abspath(__file__))
    root_directory = os.path.join(current_file_path, 'uploads')
    div_id = 'wrapper'
    output_directory = os.path.join(current_file_path, 'screenshots')

    extract_zip_file(zip_file_path, root_directory)

    capture_screenshots_in_directory(root_directory, div_id, output_directory)

    image_files = [os.path.join(output_directory, file) for file in os.listdir(output_directory) if file.endswith('.jpg')]
    pdf_output_file = os.path.join(current_file_path, 'screenshots.pdf')

    convert_images_to_pdf(image_files, pdf_output_file)

    delete_unwanted_files(root_directory)
    shutil.rmtree(output_directory)


def extract_zip_file(zip_file_path, extraction_directory):
    print('Extracting zip................')
    with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
        zip_ref.extractall(extraction_directory)
    print('Extraction Complete!!!')

def capture_div_screenshot(browser, url, div_id, output_file, target_width=2048, target_height=1536):
    browser.get(f'file:///{url}')

    try:
        div_element = browser.find_element(By.CSS_SELECTOR, f'#{div_id}')
        div_screenshot = div_element.screenshot_as_png
        image = Image.open(io.BytesIO(div_screenshot))
        image = image.resize((target_width, target_height), Image.Resampling.LANCZOS)
        image = image.convert("RGB")
        image.save(output_file, "JPEG")
    except Exception as e:
        print(f"An error occurred: {e}")

def capture_screenshots_in_directory(root_directory, div_id, output_directory):
    print('Extracting images from HTML................')
    options = Options()
    options.headless = True  
    browser = webdriver.Firefox(options=options)
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    for root, _, files in os.walk(root_directory):
        for file in files:
            if file.endswith(".html"):
                html_file_path = os.path.join(root, file)
                output_file = os.path.join(output_directory, file.replace('.html', '_screenshot.jpg'))
                capture_div_screenshot(browser, html_file_path, div_id, output_file)
                print(f'processed {file}')

    browser.quit()  # Close the Firefox webdriver after processing all HTML files
    print('Extraction Complete!!!!')
def convert_images_to_pdf(image_files, output_pdf):
    print('Converting images to PDF...............')
    c = canvas.Canvas(output_pdf, pagesize=letter)
    for image_filename in image_files:
        img = Image.open(image_filename)
        c.setPageSize((img.width, img.height))
        c.drawImage(image_filename, 0, 0, img.width, img.height)
        c.showPage()
    c.save()
    print('Successfully Converted!!!!')
def delete_unwanted_files(folder_to_clean):
    print('Clearing Server..............')
    if os.path.exists(folder_to_clean) and os.path.isdir(folder_to_clean):
        items = os.listdir(folder_to_clean)
        for item in items:
            item_path = os.path.join(folder_to_clean, item)
            try:
                if os.path.isdir(item_path):
                    shutil.rmtree(item_path)
                    print(f"Deleted folder: {item_path}")
                else:
                    os.remove(item_path)
                    print(f"Deleted file: {item_path}")
            except Exception as e:
                print(f"Error deleting {item}: {e}")
    else:
        print(f"Parent folder '{folder_to_clean}' does not exist or is not a directory")
    print('Server Cleaned!!!')

if __name__ == '__main__':
    if not os.path.exists("uploads"):
        os.makedirs("uploads")
    app.run(debug=True)
