from http.server import BaseHTTPRequestHandler
from datetime import datetime

class handler(BaseHTTPRequestHandler):

  def do_GET(self):
    content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
    post_data = self.rfile.read(content_length) # <--- Gets the data itself
    print("GET request,\nPath: {}\nHeaders:\n{}\n\nBody:\n{}\n".format(str(self.path), str(self.headers), post_data.decode('utf-8')))   
    self.send_response(200)
    self.send_header('Content-type', 'text/plain')
    self.end_headers()
    self.wfile.write(str(datetime.now().strftime('%Y-%m-%d %H:%M:%S')).encode())
    return
  
  def do_POST(self):
    content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
    post_data = self.rfile.read(content_length) # <--- Gets the data itself
    print("POST request,\nPath: {}\nHeaders:\n{}\n\nBody:\n{}\n".format(str(self.path), str(self.headers), post_data.decode('utf-8')))
    self.send_response(200)
    self.send_header('Content-type', 'text/html')
    self.end_headers()
    self.wfile.write("POST request for {}".format(self.path).encode('utf-8'))
    return
