import http.server
import socketserver
import webbrowser
import threading
import time
import os
import socket
import sys
import subprocess
import tempfile
import shutil

def find_free_port():
    s = socket.socket()
    s.bind(('', 0))
    port = s.getsockname()[1]
    s.close()
    return port

PORT = find_free_port()

if getattr(sys, 'frozen', False):
    BASE_DIR = os.path.dirname(sys.executable)
else:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

os.chdir(BASE_DIR)

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

httpd = socketserver.TCPServer(("", PORT), QuietHandler)
server_thread = threading.Thread(target=httpd.serve_forever)
server_thread.daemon = True
server_thread.start()

time.sleep(1)

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

# Use a temporary user-data directory so this process owns the browser instance
# and we can detect when the window is closed.
profile_dir = tempfile.mkdtemp(prefix="edge-profile-")

proc = None
try:
    proc = subprocess.Popen([
        edge_path,
        f"--user-data-dir={profile_dir}",
        f"--app=http://localhost:{PORT}/japanese_test.html",
        "--window-size=1200,800"
    ])

    # Wait for the browser process. When the user closes the app window,
    # this process will exit and we can shut down the server.
    proc.wait()
except Exception:
    # If launching fails, ensure we still shutdown the server and clean up.
    pass
finally:
    try:
        httpd.shutdown()
    except Exception:
        pass
    try:
        httpd.server_close()
    except Exception:
        pass
    shutil.rmtree(profile_dir, ignore_errors=True)
