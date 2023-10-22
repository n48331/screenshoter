from flask import Flask, request, render_template, redirect, url_for, send_from_directory,Response
import os
import io
import zipfile
from selenium import webdriver
from PIL import Image
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.options import Options
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import shutil
from time import sleep
from selenium.webdriver.support.ui import WebDriverWait
progress_log_message = "Upload zip file"

def generate_logs(data):
    log =  data
    yield f"data: {log}\n\n"

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    

    if request.method == 'POST':
        uploaded_file = request.files['zip_file']
        if uploaded_file and uploaded_file.filename.endswith(".zip"):
            zip_filename = os.path.join("uploads", uploaded_file.filename)
            uploaded_file.save(zip_filename)
            
            
            process_zip(zip_filename)
            return redirect(url_for('download', filename='screenshots.pdf'))
    global progress_log_message
    progress_log_message = "Upload zip file"
    return render_template('upload.html')




@app.route('/progress_logs')
def progress_logs():
    return Response(generate_logs(progress_log_message), content_type='text/event-stream')

@app.route('/download/<filename>')
def download(filename):
    return send_from_directory('', filename, as_attachment=True)

def process_zip(zip_file_path):
    global progress_log_message
    progress_log_message = "Processing ZIP file..."
    current_file_path = os.path.dirname(os.path.abspath(__file__))
    root_directory = os.path.join(current_file_path, 'uploads')
    output_directory = os.path.join(current_file_path, 'screenshots')

    extract_zip_file(zip_file_path, root_directory)

    capture_screenshots_in_directory(root_directory, output_directory)

    image_files = [os.path.join(output_directory, file) for file in os.listdir(output_directory) if file.endswith('.jpg')]
    pdf_output_file = os.path.join(current_file_path, 'screenshots.pdf')

    convert_images_to_pdf(image_files, pdf_output_file)

    delete_unwanted_files(root_directory)
    shutil.rmtree(output_directory)


def extract_zip_file(zip_file_path, extraction_directory):
    global progress_log_message
    sleep(.5)
    progress_log_message = 'Extracting zip................'
    with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
        zip_ref.extractall(extraction_directory)
    progress_log_message ='Extraction Complete!!!'

def capture_div_screenshot(browser, url, output_file, target_width=2048, target_height=1536):
    try:
        browser.get(f'file:///{url}')
        body_element = browser.find_element(By.TAG_NAME, 'body')
        div_element = body_element.find_element(By.CSS_SELECTOR, 'div:first-child')
        div_screenshot = div_element.screenshot_as_png
        image = Image.open(io.BytesIO(div_screenshot))
        image = image.resize((target_width, target_height), Image.Resampling.LANCZOS)
        image = image.convert("RGB")
        image.save(output_file, "JPEG")
        popup_trigger_elements = div_element.find_elements(By.CSS_SELECTOR, '[data-role="popup-trigger"]')
        
        for index, popup_trigger_element in enumerate(popup_trigger_elements):
            popup_trigger_element.click()
            wait = WebDriverWait(browser, 10)
            popup_id = popup_trigger_element.get_attribute("data-popup-target")
            # popup_element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, f'[data-popup-target="{popup_trigger_element.get_attribute("data-popup-target")}"]')))
            popup_screenshot = div_element.screenshot_as_png
            global progress_log_message
            progress_log_message =f"Took SS of {index+1}"
            image = Image.open(io.BytesIO(popup_screenshot))
            image = image.resize((target_width, target_height), Image.Resampling.LANCZOS)
            image = image.convert("RGB")
            output_ss = f"{output_file.split('.')[0]}_popup{index+1}.jpg"
            image.save(output_ss, "JPEG")
            close_element = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, f'{popup_id} [data-role="popup-close"]')))
            close_element.click()
    except Exception as e:
        progress_log_message = f"An error occurred: {e}"


def capture_screenshots_in_directory(root_directory, output_directory):
    global progress_log_message
    progress_log_message = 'Extracting images from HTML................'
    options = Options()
    options.headless = True  
    browser = webdriver.Firefox(options=options)
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    for root, _, files in os.walk(root_directory):
        for file in files:
            if file.endswith(".html") and "shared" not in root:  # Exclude directories with the name 'shared'
                html_file_path = os.path.join(root, file)
                output_file = os.path.join(output_directory, file.replace('.html', '_screenshot.jpg'))
                capture_div_screenshot(browser, html_file_path, output_file)
                progress_log_message = f'processed {file}'

    sleep(.5)
    browser.quit()
    progress_log_message = 'Extraction Complete!!!!'

    sleep(.5)
    browser.quit()  
    progress_log_message ='Extraction Complete!!!!'
def convert_images_to_pdf(image_files, output_pdf):
    global progress_log_message
    progress_log_message ='Converting images to PDF...............'
    sleep(.5)
    c = canvas.Canvas(output_pdf, pagesize=letter)
    sorted_image_files = sorted(image_files) 
    progress_log_message =sorted_image_files
    for image_filename in sorted_image_files:
        img = Image.open(image_filename)
        c.setPageSize((img.width, img.height))
        c.drawImage(image_filename, 0, 0, img.width, img.height)
        c.showPage()
    c.save()
    progress_log_message ='Successfully Converted!!!!'
    sleep(.5)
def delete_unwanted_files(folder_to_clean):
    global progress_log_message
    progress_log_message ='Clearing Server..............'
    sleep(.5)
    if os.path.exists(folder_to_clean) and os.path.isdir(folder_to_clean):
        items = os.listdir(folder_to_clean)
        for item in items:
            item_path = os.path.join(folder_to_clean, item)
            try:
                if os.path.isdir(item_path):
                    shutil.rmtree(item_path)
                    progress_log_message =f"Deleted folder: {item_path}"
                else:
                    os.remove(item_path)
                    progress_log_message =f"Deleted file: {item_path}"
            except Exception as e:
                progress_log_message =f"Error deleting {item}: {e}"
    else:
        progress_log_message =f"Parent folder '{folder_to_clean}' does not exist or is not a directory"
    progress_log_message ='Server Cleaned!!!'
    sleep(1)
    progress_log_message = "Process Complete"
    sleep(1)


if __name__ == '__main__':
    if not os.path.exists("uploads"):
        os.makedirs("uploads")
    app.run(debug=True)
